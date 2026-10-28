#!/usr/bin/env python3
"""sheet.py N [video] : contact sheet with one frame per beat (taken 0.5 s into the beat) -> chk/sheetN.png"""
import sys,json,subprocess,os
from PIL import Image,ImageDraw
N=int(sys.argv[1]);R=os.path.dirname(os.path.abspath(__file__));vid=sys.argv[2] if len(sys.argv)>2 else f'{R}/p{N}/final.mp4'
spec=json.load(open(f'{R}/p{N}/spec.json'));beats=spec['beats'];tiles=[]
for i,b in enumerate(beats):
    t=min(b['t'][0]+min(0.6,(b['t'][1]-b['t'][0])/2),59.9);f=f'/tmp/_s{i}.png'
    subprocess.check_call(['ffmpeg','-y','-v','error','-ss',f'{t:.3f}','-i',vid,'-frames:v','1','-vf','scale=216:384',f])
    im=Image.open(f).convert('RGB');d=ImageDraw.Draw(im);d.rectangle([0,0,52,14],fill=(0,0,0));d.text((3,2),f"{i+1} {b['t'][0]:.1f}s",fill=(255,255,0));tiles.append(im)
cols=8;rows=(len(tiles)+cols-1)//cols;W,H=216,384
sh=Image.new('RGB',(cols*W,rows*H),(15,15,15))
for i,im in enumerate(tiles):sh.paste(im,((i%cols)*W,(i//cols)*H))
os.makedirs(f'{R}/../chk',exist_ok=True);out=f'{R}/../chk/sheet{N}.png';sh.save(out);print(out,sh.size)
