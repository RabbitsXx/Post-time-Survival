#!/usr/bin/env python3
"""python3 peek.py CLIP_ID shot:frac [shot:frac ...]  -> out/<id>/peek.png (montage of those frames, full-res render, overlays included). Fast composition check before the frame gate."""
import sys,os,json,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));cid=sys.argv[1];sp=json.load(open(f'{H}/out/{cid}/spec.json'))
ts=[];
for a in sys.argv[2:]:
    sid,fr=a.split(':');s=[x for x in sp['shots'] if x['id']==sid][0];ts.append(s['t0']+(s['t1']-s['t0'])*float(fr))
out=f'{H}/out/{cid}/peek';subprocess.run(['rm','-rf',out]);subprocess.check_call(['node',H+'/render.js',f'{H}/out/{cid}/spec.json',out,','.join(f'{t:.3f}' for t in ts),'--t'],cwd=H)
fs=sorted(os.listdir(out));W,Hh=324,576;cols=min(6,len(fs));rows=(len(fs)+cols-1)//cols;S=Image.new('RGB',(W*cols,Hh*rows))
byname={int(round(t*30)):f for t,f in zip(ts,[None]*len(ts))}
files=[f"{out}/{str(int(round(t*30))).zfill(5)}.jpg" for t in ts]
for i,f in enumerate(files):S.paste(Image.open(f).resize((W,Hh)),((i%cols)*W,(i//cols)*Hh))
S.save(f'{H}/out/{cid}/peek.png');print(f'{H}/out/{cid}/peek.png')
