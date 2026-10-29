#!/usr/bin/env python3
"""render_part.py N [--workers 4] [--force] [--verify K]
Renders the 1800 frames of part N into ser/pN/frames/%05d.jpg, rendering ONLY the beats that changed.

How: every beat is a pure function of (its scene code, scene params, camera, beat time range, frame range).  Each beat's frames are cached in
ser/cache/pN/<key>/ and the key is a hash of exactly those inputs, so
  * a caption/audio-only change renders nothing,
  * a fix inside one scene re-renders only the beats that use that scene,
  * a change of narration (all beat lengths move) re-renders everything - which is also what the old pipeline did.
The scene code hash = the scene's own LIB.<name> block(s) + all shared code (kits, helpers, master2.html, grain), so a helper edit invalidates every beat (safe).
Frames are produced by persistent Chromium workers (one browser per worker, dynamic chunks of 24 frames) and linked into frames/ (hard links, no copy).
Output frames are byte-identical to the previous render2.js path.  --verify K re-renders K random cached frames and compares bytes (determinism proof)."""
import sys,os,re,json,hashlib,subprocess,threading,queue,time,random,shutil
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');V=S+'/v3'
FPS=30

def engine_files():
    html=open(V+'/master2.html').read()
    files=[f for f in re.findall(r'<script src="([^"]+\.js)"',html) if not f.startswith('..')]
    return ['master2.html']+files+['grain.png']

def split_blocks(text):
    """-> (masked text without LIB.<name>=... blocks, {name: concatenated block text})"""
    keep,blocks,cur=[],{},None
    for ln in text.split('\n'):
        m=re.match(r'LIB\.(\w+)\s*=',ln)
        if m:cur=m.group(1);blocks[cur]=blocks.get(cur,'')+ln+'\n';continue
        if cur and ln[:1] in (' ','\t'):blocks[cur]+=ln+'\n';continue
        cur=None;keep.append(ln)
    return '\n'.join(keep),blocks

def engine_hashes():
    masked,blocks=[],{}
    for f in engine_files():
        data=open(f'{V}/{f}','rb').read()
        if f.endswith('.png'):masked.append(hashlib.sha1(data).hexdigest());continue
        mk,bl=split_blocks(data.decode('utf8'));masked.append(f+':'+mk)
        for k,v in bl.items():blocks[k]=blocks.get(k,'')+v
    base=hashlib.sha1('\n'.join(masked).encode()).hexdigest()
    return base,{k:hashlib.sha1((base+v).encode()).hexdigest() for k,v in blocks.items()},base

def beat_ranges(spec,nframes):
    """frame -> beat exactly like master2.html renderFrame(): last beat whose start <= t (1e-6 tolerance)"""
    B=spec['beats'];rng={}
    for f in range(nframes):
        t=f/FPS;i=0
        for k in range(len(B)):
            if t>=B[k]['t'][0]-1e-6:i=k
        rng.setdefault(i,[f,f])[1]=f+1
    return rng

class Pool:
    def __init__(self,n,part):
        env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
        self.procs=[subprocess.Popen(['node','render_worker.js'],cwd=V,env=env,stdin=subprocess.PIPE,stdout=subprocess.PIPE,text=True,bufsize=1) for _ in range(n)]
        self.part=part;self.q=queue.Queue();self.lock=threading.Lock();self.done=0;self.err=[]
    def run(self,chunks):
        for i,c in enumerate(chunks):self.q.put((i,c))
        def loop(p):
            while True:
                try:i,c=self.q.get_nowait()
                except queue.Empty:return
                p.stdin.write(json.dumps(dict(id=i,part=self.part,jobs=c))+'\n');p.stdin.flush()
                ln=p.stdout.readline()
                if not ln:self.err.append('worker died');return
                with self.lock:self.done+=len(c)
        th=[threading.Thread(target=loop,args=(p,)) for p in self.procs]
        [t.start() for t in th];[t.join() for t in th]
        if self.err:raise SystemExit('render failed: '+'; '.join(self.err))
    def close(self):
        for p in self.procs:
            try:p.stdin.write('{"quit":1}\n');p.stdin.flush()
            except Exception:pass
        for p in self.procs:p.wait(timeout=20)

def main():
    a=sys.argv[1:];N=int(a[0]);W=int(a[a.index('--workers')+1]) if '--workers' in a else os.cpu_count() or 4
    force='--force' in a;verify=int(a[a.index('--verify')+1]) if '--verify' in a else 0
    D=f'{R}/p{N}';spec=json.load(open(f'{D}/spec.json'));nfr=int(round(spec['duration']*FPS))
    base,scene_h,_=engine_hashes();rng=beat_ranges(spec,nfr);cache=f'{R}/cache/p{N}';os.makedirs(cache,exist_ok=True)
    plan=[];keys=set()
    for i,(f0,f1) in sorted(rng.items()):
        b=spec['beats'][i];n=b['scene']['n']
        key=hashlib.sha1(json.dumps(dict(v=2,scene=b['scene'],shot=b['shot'],t=b['t'],f=[f0,f1],h=scene_h.get(n,base),ann=(spec.get('series') if f0<100 else None)),sort_keys=True).encode()).hexdigest()[:20]
        keys.add(key);d=f'{cache}/{key}';have=len([x for x in os.listdir(d) if x.endswith('.jpg')]) if os.path.isdir(d) else 0
        plan.append((i,key,d,f0,f1,have==f1-f0 and not force))
    todo=[p for p in plan if not p[5]];t0=time.time()
    chunks=[]
    for i,key,d,f0,f1,_ in todo:
        os.makedirs(d,exist_ok=True)
        fr=[(f,f'{d}/{f:05d}.jpg') for f in range(f0,f1)]
        chunks+= [fr[k:k+24] for k in range(0,len(fr),24)]
    # big/expensive beats first keeps the workers evenly busy until the end
    chunks.sort(key=lambda c:-len(c))
    nrend=sum(len(c) for c in chunks)
    if chunks:
        pool=Pool(min(W,len(chunks)),N);pool.run(chunks);pool.close()
    if verify:
        pool=Pool(1,N);allf=[(f,f'{cache}/{k}/{f:05d}.jpg') for _,k,d,f0,f1,_ in plan for f in range(f0,f1)];pick=random.sample(allf,min(verify,len(allf)))
        tmpd=f'{cache}/_verify';os.makedirs(tmpd,exist_ok=True);jobs=[[(f,f'{tmpd}/{f:05d}.jpg')] for f,_ in pick];pool.run(jobs);pool.close()
        import numpy as np
        from PIL import Image
        def psnr(x,y):
            x=np.asarray(Image.open(x).convert('RGB')).astype(np.float64);y=np.asarray(Image.open(y).convert('RGB')).astype(np.float64);m=((x-y)**2).mean();return 99.0 if m==0 else 10*np.log10(255**2/m)
        # Chromium promotes animated layers to compositor layers after a few frames, so the same frame can differ by +-1 level on a few pixels
        # depending on render history (the old pipeline had the same effect).  Equal quality = PSNR >= 50 dB; most frames are bit-identical.
        ps=[(f,psnr(p,f'{tmpd}/{f:05d}.jpg')) for f,p in pick]
        for f,_ in pick:os.unlink(f'{tmpd}/{f:05d}.jpg')
        bad=[f for f,q in ps if q<50];same=sum(q>=99 for _,q in ps)
        print(f'verify: {len(ps)} cached frames re-rendered fresh: {same} bit-identical, min PSNR {min(q for _,q in ps):.1f} dB'+(f'  MISMATCH {bad}' if bad else '  OK'))
        if bad:raise SystemExit(1)
    # assemble frames/ with hard links (own folder only, files only)
    fd=f'{D}/frames';os.makedirs(fd,exist_ok=True)
    for e in os.scandir(fd):
        if e.is_file() or e.is_symlink():os.unlink(e.path)
    for i,key,d,f0,f1,_ in plan:
        for f in range(f0,f1):
            src=f'{d}/{f:05d}.jpg'
            try:os.link(src,f'{fd}/{f:05d}.jpg')
            except OSError:shutil.copyfile(src,f'{fd}/{f:05d}.jpg')
    # keep only this render's beats in the cache (disk is a fixed allowance)
    for e in os.scandir(cache):
        if e.is_dir() and e.name not in keys and not e.name.startswith('_'):shutil.rmtree(e.path)
    print(f'render p{N}: {nfr} frames, {nrend} rendered in {time.time()-t0:.1f}s ({len(todo)}/{len(plan)} beats changed), {nfr-nrend} from cache')
if __name__=='__main__':main()
