#!/usr/bin/env python3
"""sheet16.py [--dsf .5] [--beats a-b] [--at .55] : contact sheets (one frame per beat) of the real engine -> sheets/NN.png"""
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
R=os.path.dirname(os.path.abspath(__file__));a=sys.argv[1:];g=lambda k,d:a[a.index(k)+1] if k in a else d
dsf=g('--dsf','.5');at=float(g('--at','.55'));spec=g('--spec','spec');B=json.load(open(f'{R}/p/{spec}.json'))['beats']
lo,_,hi=g('--beats','0-%d'%(len(B)-1)).partition('-');lo=int(lo);hi=int(hi or lo)
idx=list(range(lo,hi+1));frs=[int(round((B[i]['t'][0]+(B[i]['t'][1]-B[i]['t'][0])*at)*30)) for i in idx]
out=f'{R}/shots';os.makedirs(out,exist_ok=True)
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
subprocess.check_call(['node','snapbeats16.js',spec,dsf,out]+[str(f) for f in frs],cwd=R,env=env)
os.makedirs(f'{R}/sheets',exist_ok=True);per=12;fnt=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
for s in range(0,len(idx),per):
    part=idx[s:s+per];W=Image.new('RGB',(4*480,3*288),(15,15,15))
    for k,i in enumerate(part):
        im=Image.open(f'{out}/{frs[idx.index(i)]}.jpg').convert('RGB').resize((480,270));d=ImageDraw.Draw(im);d.rectangle((0,0,96,22),fill=(0,0,0));d.text((4,2),f'b{i} {B[i]["t"][0]:.0f}s',fill=(255,255,0),font=fnt)
        W.paste(im,((k%4)*480,(k//4)*288))
    W.save(f'{R}/sheets/{idx[s]:03d}.png')
print('sheets in',R+'/sheets')
