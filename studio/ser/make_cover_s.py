#!/usr/bin/env python3
"""make_cover_s.py N : cover for THE LAST SUNRISE part N-10 (9:16 + 16:9) from an engine still, embedded as the first 4 frames."""
import sys,os,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import cover
from PIL import Image
S=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
N=int(sys.argv[1]);SRC=int(os.environ.get('PART_SRC',N));D=f'{S}/ser/p{N}';PN=SRC-10
import importlib
PARTS=importlib.import_module('parts_sun').PARTS
CFG=PARTS[SRC].get('cover') or {11:dict(beat=0,fr=.8,main="THE SUN|WENT OUT",accent=1,box="8 MINUTES LEFT"),
     12:dict(beat=3,fr=.7,main="A TOWN|FREEZES",accent=1,box="IN JUST 7 DAYS"),
     13:dict(beat=8,fr=.7,main="THE ONLY|WARM PLACE",accent=1,box="12 MILES AWAY"),
     14:dict(beat=10,fr=.8,main="A GARDEN|IN THE DARK",accent=1,box="POWERED BY STEAM"),
     15:dict(beat=12,fr=.9,main="THE LAST|SUNRISE",accent=1,box="THE FINALE")}[SRC]
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g']).decode().strip())
base=f'{S}/v3/brand/cbs{N}.png'
subprocess.check_call(['node','snapcover.js',str(N),str(CFG['beat']),str(CFG['fr']),base],cwd=f'{S}/v3',env=env)
c916=f'{D}/cover_{N}_9x16.png';c169=f'{D}/cover_{N}_16x9.png'
cover.make(base,c916,'916',f'PART {PN}',CFG['main'],CFG['box'],CFG['accent'],tag="THE LAST SUNRISE")
cover.make169_from916(base,c169,f'PART {PN}',CFG['main'],CFG['box'],CFG['accent'],tag="THE LAST SUNRISE")
print('cover base',base)
fr=f'{D}/frames'
if os.path.isdir(fr):
    im=Image.open(c916).convert('RGB').resize((720,1280),Image.LANCZOS)
    for f in range(4):
        pth=f'{fr}/{f:05d}.jpg'
        if os.path.lexists(pth):os.unlink(pth)      # frames are hard links into the render cache: replace, never overwrite in place
        im.save(pth,quality=93)
    print('embedded cover in first 4 frames')
