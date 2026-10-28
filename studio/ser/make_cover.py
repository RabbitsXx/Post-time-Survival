#!/usr/bin/env python3
"""make_cover.py N : designed cover for Part N (9:16 + 16:9) and embed it as the first 4 frames of the master frames dir."""
import sys,os,json,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import cover
from PIL import Image
S=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
N=int(sys.argv[1]);D=f'{S}/ser/p{N}';spec=json.load(open(f'{D}/spec.json'))
CFG={
 2:dict(pick=lambda b:b['scene']['n']=='crowd' and b['scene']['p'].get('walking') and b['scene']['p'].get('onSand'),main="THE WALL|BROKE",accent=1,box="AT LOW TIDE"),
 3:dict(pick=lambda b:b['scene']['n']=='fire' and b['scene']['p'].get('wall') and not b['scene']['p'].get('dim'),main="200 GALLONS|OF FIRE",accent=0,box="TO STOP THEM"),
 4:dict(pick=lambda b:b['scene']['n']=='heroFace' and b['scene']['p'].get('who')=='wren' and b['scene']['p'].get('mood')=='red',main="SHE HAS|A FEVER",accent=1,box="ONE CUT COULD KILL"),
 5:dict(pick=lambda b:b['scene']['n']=='crowd' and b['scene']['p'].get('following')==2,main="THE LAST|LIGHT",accent=1,box="400 ZOMBIES. ONE LAMP."),
}[N]
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g']).decode().strip())
subprocess.check_call(['node','brand.js',f'cbp{N}'],cwd=f'{S}/v3',env=env)
base=f'{S}/v3/brand/cbp{N}.png'
idx=0
c916=f'{D}/cover_{N}_9x16.png';c169=f'{D}/cover_{N}_16x9.png'
cover.make(base,c916,'916',f'PART {N}',CFG['main'],CFG['box'],CFG['accent'])
cover.make169_from916(c916 if False else base,c169,f'PART {N}',CFG['main'],CFG['box'],CFG['accent'])
print('cover base', base)
fr=f'{D}/frames'
if os.path.isdir(fr):
    im=Image.open(c916).convert('RGB').resize((720,1280),Image.LANCZOS)
    for f in range(4):
        pth=f'{fr}/{f:05d}.jpg'
        if os.path.lexists(pth):os.unlink(pth)      # frames are hard links into the render cache: replace, never overwrite in place
        im.save(pth,quality=93)
    print('embedded cover in first 4 frames')
