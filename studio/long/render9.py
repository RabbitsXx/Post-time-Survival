#!/usr/bin/env python3
"""render9.py [--spec p/spec.json] [--out frames] [--dsf 1.5] [--workers 4] [--beats 0-20,33] [--trust] [--force]
Per-beat frame cache (like studio/render_part.py): key = beat spec + frame range + dsf + mouth data of the beat + engine hash.
--trust : reuse cached beats even if the engine code changed (use only when the edit cannot touch them).  --beats limits the render to those beats."""
import sys,os,re,json,hashlib,subprocess,threading,queue,time,shutil
R=os.path.dirname(os.path.abspath(__file__));FPS=30
FILES=['engine9.html','kit.js','kit9.js','dog16.js','chars16.js','pax9.js','locs16.js','scenes16.js','scenes9.js','locs9.js','cards16.js','cards9.js','fx16.js','fx9.js','core9.js','grain.png','RobotoCondensed-Bold.ttf']
def engine_hash():
    h=hashlib.sha1()
    for f in FILES:h.update(open(f'{R}/{f}','rb').read())
    return h.hexdigest()[:12]
def parse_beats(s,n):
    if not s:return set(range(n))
    out=set()
    for p in s.split(','):
        a,_,b=p.partition('-');out|=set(range(int(a),int(b or a)+1))
    return out
class Pool:
    def __init__(self,n,spec,dsf):
        env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
        self.p=[subprocess.Popen(['node','worker9.js'],cwd=R,env=env,stdin=subprocess.PIPE,stdout=subprocess.PIPE,text=True,bufsize=1) for _ in range(n)]
        self.spec=spec;self.dsf=dsf;self.q=queue.Queue();self.done=0;self.lock=threading.Lock();self.err=[];self.total=0
    def run(self,chunks):
        self.total=sum(len(c) for c in chunks)
        for i,c in enumerate(chunks):self.q.put((i,c))
        def loop(p):
            while True:
                try:i,c=self.q.get_nowait()
                except queue.Empty:return
                p.stdin.write(json.dumps(dict(id=i,spec=self.spec,dsf=self.dsf,jobs=c))+'\n');p.stdin.flush()
                ln=p.stdout.readline()
                if not ln:self.err.append('worker died');return
                with self.lock:
                    self.done+=len(c)
                    if self.done%480<len(c):print(f'  {self.done}/{self.total} frames',flush=True)
        th=[threading.Thread(target=loop,args=(p,)) for p in self.p];[t.start() for t in th];[t.join() for t in th]
        if self.err:raise SystemExit('render failed: '+'; '.join(self.err))
    def close(self):
        for p in self.p:
            try:p.stdin.write('{"quit":1}\n');p.stdin.flush()
            except Exception:pass
        for p in self.p:p.wait(timeout=30)
def main():
    a=sys.argv[1:];g=lambda k,d:a[a.index(k)+1] if k in a else d
    specf=g('--spec','p9/part1/spec.json');spec_name=specf[len('p9/'):-len('.json')];dsf=float(g('--dsf','1.6'));W=int(g('--workers',os.cpu_count() or 4))    # spec_name e.g. part1/spec -> engine9.html?spec=part1/spec
    out=g('--out','frames9');trust='--trust' in a;force='--force' in a;redo=parse_beats(g('--redo',''),0) if '--redo' in a else set()
    sp=json.load(open(f'{R}/{specf}'));mouth=json.load(open(f'{R}/'+specf.replace('.json','.mouth.json')))
    B=sp['beats'];nfr=int(round(sp['duration']*FPS));eh=engine_hash();want=parse_beats(g('--beats',''),len(B))
    cache=f'{R}/cache9/{dsf}';os.makedirs(cache,exist_ok=True)
    rng={}
    for f in range(nfr):
        t=f/FPS;i=0
        for k in range(len(B)):
            if t>=B[k]['t'][0]-1e-6:i=k
        rng.setdefault(i,[f,f])[1]=f+1
    plan=[];keys=set()
    for i,(f0,f1) in sorted(rng.items()):
        m={k:v[f0:f1] for k,v in mouth.items()}
        key=hashlib.sha1(json.dumps(dict(v=1,b=B[i],f=[f0,f1],d=dsf,m=m),sort_keys=True).encode()).hexdigest()[:20];keys.add(key)
        d=f'{cache}/{key}';have=len([x for x in os.listdir(d) if x.endswith('.jpg')]) if os.path.isdir(d) else 0
        stale=os.path.isfile(f'{d}/engine.sha') and open(f'{d}/engine.sha').read()!=eh and not trust
        ok=have==f1-f0 and not stale and not force and i not in redo
        plan.append((i,key,d,f0,f1,ok))
    todo=[p for p in plan if not p[5] and p[0] in want];t0=time.time();chunks=[]
    for i,key,d,f0,f1,_ in todo:
        if (force or i in redo) and os.path.isdir(d):shutil.rmtree(d)
        stale_dir=os.path.isfile(f'{d}/engine.sha') and open(f'{d}/engine.sha').read()!=eh and not trust
        if stale_dir:shutil.rmtree(d)
        os.makedirs(d,exist_ok=True);open(f'{d}/engine.sha','w').write(eh)
        fr=[(f,f'{d}/{f:05d}.jpg') for f in range(f0,f1) if not os.path.exists(f'{d}/{f:05d}.jpg')];chunks+=[fr[k:k+16] for k in range(0,len(fr),16)]
    chunks.sort(key=lambda c:-len(c));n=sum(len(c) for c in chunks)
    if chunks:
        pool=Pool(min(W,len(chunks)),spec_name,dsf);pool.run(chunks);pool.close()
    fd=f'{R}/{out}';os.makedirs(fd,exist_ok=True)
    if want==set(range(len(B))):
        for e in os.scandir(fd):
            if e.is_file():os.unlink(e.path)
        for i,key,d,f0,f1,_ in plan:
            for f in range(f0,f1):
                try:os.link(f'{d}/{f:05d}.jpg',f'{fd}/{f:05d}.jpg')
                except OSError:shutil.copyfile(f'{d}/{f:05d}.jpg',f'{fd}/{f:05d}.jpg')
        for e in os.scandir(cache):
            if e.is_dir() and e.name not in keys:shutil.rmtree(e.path)
    print(f'render9: {nfr} frames @dsf {dsf}, rendered {n} in {time.time()-t0:.0f}s ({len(todo)}/{len(plan)} beats), {nfr-n if want==set(range(len(B))) else 0} cached')
if __name__=='__main__':main()
