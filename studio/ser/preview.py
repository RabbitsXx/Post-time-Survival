#!/usr/bin/env python3
"""preview.py N [first_beat last_beat]  -> chk/prevN_k.png
Fast visual check WITHOUT rendering the clip: one still per beat (engine snapshot) + the REAL caption/gradient overlay
from finish_clip.py, with the caption band (58-72 % height) marked, so "text covers the picture" is visible at a glance."""
import sys,os,json,subprocess,importlib.util,tempfile
import numpy as np
from PIL import Image,ImageDraw
N=int(sys.argv[1]);R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');V=S+'/v3'
spec=json.load(open(f'{R}/p{N}/spec.json'));beats=spec['beats']
lo=int(sys.argv[2]) if len(sys.argv)>2 else 1;hi=int(sys.argv[3]) if len(sys.argv)>3 else len(beats)
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
out=f'{S}/chk/prev{N}';os.makedirs(out,exist_ok=True)
subprocess.run(['node','snap2.js',str(N),out],cwd=V,env=env,check=True,capture_output=True)
# still-picture master with the real beat timing
lst=f'{out}/list.txt'
with open(lst,'w') as f:
    for i,b in enumerate(beats):
        d=(beats[i+1]['t'][0] if i+1<len(beats) else 60.0)-b['t'][0]
        f.write(f"file 'b{i+1:02d}.jpg'\nduration {max(d,0.04):.3f}\n")
    f.write(f"file 'b{len(beats):02d}.jpg'\n")
vid=f'{out}/still_master.mp4'
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',lst,'-vf','fps=30,scale=720:1280,format=yuv420p','-t','60','-c:v','libx264','-preset','ultrafast','-crf','22','-an',vid],check=True)
sp=importlib.util.spec_from_file_location('fc',S+'/zip2/story-chain-short/scripts/finish_clip.py');fc=importlib.util.module_from_spec(sp);sp.loader.exec_module(fc)
font=fc.find_font(S+'/fonts/RobotoCondensed-Bold.ttf',' '.join(c['text'] for b in beats for c in b['captions']))
# sample each beat 0.45 s after its LAST caption starts (so every caption chunk of a long beat is checked via its own frame)
want={}
for i,b in enumerate(beats):
    if not (lo<=i+1<=hi):continue
    caps=list(enumerate(b['captions'])) or [(0,None)]
    if os.environ.get('ONE'):caps=[caps[min(1,len(caps)-1)]]
    for k,c in caps:
        t=(c['t'][0]+0.45) if c else b['t'][0]+0.5
        want[int(round(t*30))]=(i+1,k)
frames={}
for i,fr in fc.compose(spec,fc.decode(vid,1800),font,0.28,True):
    if i in want:frames[i]=fr
    if i>=max(want):break
tiles=[]
for fi in sorted(frames):
    bi,k=want[fi];im=Image.fromarray(frames[fi]).convert('RGB').resize((324,576))
    d=ImageDraw.Draw(im);y0,y1=int(576*.58),int(576*.72)
    [d.polygon(p,fill=(255,0,255)) for p in ([(0,y0),(9,y0),(0,y0+7)],[(0,y1),(9,y1),(0,y1-7)],[(324,y0),(315,y0),(324,y0+7)],[(324,y1),(315,y1),(324,y1-7)])]  # magenta corner marks = caption band (not in the video)
    d.rectangle([0,0,70,13],fill=(0,0,0));d.text((3,1),f"b{bi}.{k+1} {beats[bi-1]['scene']['n']}",fill=(255,255,0));tiles.append(im)
per=8;paths=[]
for g in range(0,len(tiles),per):
    chunk=tiles[g:g+per];sh=Image.new('RGB',(4*326,2*578),(15,15,15))
    for j,im in enumerate(chunk):sh.paste(im,((j%4)*326,(j//4)*578))
    p=f'{S}/chk/prev{N}_{g//per+1}.png';sh.save(p);paths.append(p)
print('\n'.join(paths))
