#!/usr/bin/env python3
"""sheet9.py SPEC [--at .55] [--beats a-b] : one frame per beat of the 9:16 engine -> sheets9/SPEC_NN.png (6 per row)"""
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
R=os.path.dirname(os.path.abspath(__file__));a=sys.argv[1:];spec=a[0];g=lambda k,d:a[a.index(k)+1] if k in a else d
at=float(g('--at','.55'));B=json.load(open(f'{R}/p9/{spec}/spec.json'))['beats']
lo,_,hi=g('--beats','0-%d'%(len(B)-1)).partition('-');lo=int(lo);hi=int(hi or lo);idx=list(range(lo,hi+1))
frs=[int(round((B[i]['t'][0]+(B[i]['t'][1]-B[i]['t'][0])*at)*30)) for i in idx]
out=f'{R}/shots9/{spec}';os.makedirs(out,exist_ok=True)
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
subprocess.check_call(['node','snapbeats9.js',f'{spec}/spec',out]+[str(f) for f in frs],cwd=R,env=env)
os.makedirs(f'{R}/sheets9',exist_ok=True);per=6;fnt=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
tw,th=270,480
for s in range(0,len(idx),per*2):
    part=idx[s:s+per*2];W=Image.new('RGB',(per*(tw+6),2*(th+6)),(15,15,15))
    for k,i in enumerate(part):
        im=Image.open(f'{out}/{frs[idx.index(i)]}.png').convert('RGB').resize((tw,th),Image.LANCZOS);d=ImageDraw.Draw(im);d.rectangle((0,0,92,20),fill=(0,0,0));d.text((4,2),f'b{i} {B[i]["t"][0]:.0f}s',fill=(255,255,0),font=fnt)
        W.paste(im,((k%per)*(tw+6),(k//per)*(th+6)))
    W.save(f'{R}/sheets9/{spec}_{idx[s]:03d}.png')
print('sheets in',R+'/sheets9')
