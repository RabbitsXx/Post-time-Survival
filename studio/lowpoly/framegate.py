#!/usr/bin/env python3
"""python3 framegate.py CLIP.py   FRAME GATE: renders key frames of every shot, applies layout rules, builds review sheets. Exit 1 = a FAIL: do NOT render the video.
Rules (1080x1920): F1 no overlay (label / stamp / dialogue / caption) over a face (>15 % of the face box); F2 label and stamp must not overlap; F3 a person may not be cut by the frame edge (>40 % FAIL, >15 % WARN);
F4 overlays inside the frame; F5 hook: shot 1 must visibly change between 0.03 and 0.9 of its length; F6 every shot should show a person or a declared place (WARN).  The human review of the sheets is still required."""
import sys,os,json,subprocess,importlib.util
H=os.path.dirname(os.path.abspath(__file__))
def ov(a,b):
    x=max(0,min(a[2],b[2])-max(a[0],b[0]));y=max(0,min(a[3],b[3])-max(a[1],b[1]));return x*y
def main():
    clip=sys.argv[1];sp=importlib.util.spec_from_file_location('ep',clip);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);name=m.EP['id']
    O=f'{H}/out/{name}/gate';os.makedirs(O,exist_ok=True)
    spec=f'{H}/out/{name}/spec.json'
    if not os.path.exists(spec):subprocess.check_call([sys.executable,H+'/build_clip.py',clip,'--spec'],cwd=H)
    subprocess.check_call(['node',H+'/gate.js',spec,O],cwd=H)
    R=json.load(open(O+'/gate.json'));fails=[];warns=[]
    from PIL import Image,ImageChops,ImageStat
    for r in R:
        tag=f"shot {r['shot']} {r['id']} t={r['t']}s"
        inf=r['info'];D=inf['dom'];rects={k:[v['x0'],v['y0'],v['x1'],v['y1']] for k,v in D.items() if v}
        for k,v in rects.items():
            tol=70 if k=='cap' else 4
            if v[0]<-tol or v[2]>1080+tol or v[1]<-tol or v[3]>1920+tol:fails.append(f'{tag}: F4 {k} runs outside the frame')
        if 'tag' in rects and 'stamp' in rects and ov(rects['tag'],rects['stamp'])>0:fails.append(f'{tag}: F2 label and stamp overlap')
        for p in inf['people']:
            fb=p['face'];fa=max(1,(fb[2]-fb[0])*(fb[3]-fb[1]));bb=p['bbox'];w=bb[2]-bb[0]
            if w<40:continue
            for k,v in rects.items():
                if ov(fb,v)/fa>.15 and p['headOK']:fails.append(f'{tag}: F1 {k} "{D[k]["text"]}" covers a face ({ov(fb,v)/fa:.0%})')
            outw=max(0,-bb[0])+max(0,bb[2]-1080)
            if outw/w>.40:fails.append(f'{tag}: F3 a person is cut by the frame edge ({outw/w:.0%})')
            elif outw/w>.15:warns.append(f'{tag}: F3 a person is partly cut by the frame edge ({outw/w:.0%})')
        if not inf['people'] and r['id'] not in getattr(m,'PLACE_SHOTS',[]):warns.append(f'{tag}: F6 no person in the shot (ok only for a place/map/prop shot)')
    # F5 hook motion
    s0=[r for r in R if r['shot']==0]
    if len(s0)>=2:
        a=Image.open(f"{O}/{s0[0]['file']}").convert('L').resize((108,192));b=Image.open(f"{O}/{s0[-1]['file']}").convert('L').resize((108,192))
        diff=ImageStat.Stat(ImageChops.difference(a,b)).mean[0]
        (fails if diff<6 else warns if diff<10 else []).append(f'hook: F5 shot 1 changes little between its first and last key frame (mean diff {diff:.1f})') if diff<10 else None
        print(f'hook motion diff {diff:.1f} (>=10 good)')
    # review sheets
    shots={}
    for r in R:shots.setdefault(r['shot'],[]).append(r)
    W,Hh=216,384;rows=[]
    for si in sorted(shots):
        row=Image.new('RGB',(W*5,Hh),(20,20,20))
        for i,r in enumerate(shots[si]):row.paste(Image.open(f"{O}/{r['file']}").resize((W,Hh)),(i*W,0))
        rows.append(row)
    for part in range(0,len(rows),3):
        sh=Image.new('RGB',(W*5,Hh*len(rows[part:part+3])))
        for i,rw in enumerate(rows[part:part+3]):sh.paste(rw,(0,i*Hh))
        sh.save(f'{O}/review_{part//3}.png')
    print('review sheets:',sorted(f for f in os.listdir(O) if f.startswith('review')))
    for f in fails:print('FAIL',f)
    for w in warns:print('WARN',w)
    print('FRAME GATE:','FAIL' if fails else 'PASS',f'({len(fails)} fail, {len(warns)} warn)')
    sys.exit(1 if fails else 0)
main()
