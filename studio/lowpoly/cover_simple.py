#!/usr/bin/env python3
"""python3 cover_simple.py CLIP_ID FRAME_T "LINE1" "LINE2" "LINE3"  -> topics/<id>.cover.jpg : takes the frame at FRAME_T s of the clip spec (no caption/labels), puts the same title layout as the other covers (safe zone)."""
import sys,os,subprocess,json
from PIL import Image,ImageDraw,ImageFont,ImageFilter
H=os.path.dirname(os.path.abspath(__file__));F=H+'/../fonts/RobotoCondensed-Bold.ttf'
cid,t,l1,l2,l3=sys.argv[1:6];shot=sys.argv[6] if len(sys.argv)>6 else None
spec=f'{H}/out/{cid}/spec.json';sp=json.load(open(spec));sp['caps']=[];sp['dlg']=[]
if shot:sp['shots']=[dict(id=shot,t0=0,t1=1)];sp['dur']=1;t='0.5'
tmp=f'{H}/out/{cid}/cover_spec.json';json.dump(sp,open(tmp,'w'))
out=f'{H}/out/{cid}/cover_raw';subprocess.run(['rm','-rf',out]);subprocess.check_call(['node',H+'/render.js',tmp,out,t,'--t'],cwd=H)
im=Image.open(out+'/'+sorted(os.listdir(out))[0]).convert('RGBA');W,Hh=im.size
def tl(txt,f,fill,sw):
    b=f.getbbox(txt,stroke_width=sw);L=Image.new('RGBA',(b[2]-b[0]+40,b[3]-b[1]+40),(0,0,0,0));ImageDraw.Draw(L).text((20-b[0],20-b[1]),txt,font=f,fill=fill,stroke_width=sw,stroke_fill=(0,0,0,255));return L
def drop(L,off=10,blur=6):
    s=Image.new('RGBA',L.size,(0,0,0,0));s.putalpha(L.split()[3].point(lambda v:int(v*.55)));s=s.filter(ImageFilter.GaussianBlur(blur));o=Image.new('RGBA',(L.size[0]+2*off,L.size[1]+2*off),(0,0,0,0));o.paste(s,(off,off),s);o.paste(L,(0,0),L);return o
def put(L,cx,cy,rot=0):
    L=drop(L.rotate(rot,expand=True,resample=Image.BICUBIC));im.paste(L,(cx-L.size[0]//2,cy-L.size[1]//2),L)
def fit(txt,maxw,size):
    while size>40:
        f=ImageFont.truetype(F,size)
        if f.getlength(txt)<=maxw:return f
        size-=4
    return ImageFont.truetype(F,size)
put(tl(l1,fit(l1,980,150),(255,226,31,255),16),W//2,300,-3)
t2=tl(l2,fit(l2,880,120),(255,255,255,255),12);bw,bh=t2.size[0]+60,t2.size[1]+10;ban=Image.new('RGBA',(bw,bh),(0,0,0,0));d=ImageDraw.Draw(ban);d.rectangle([0,0,bw-1,bh-1],fill=(196,32,42,255),outline=(0,0,0,255),width=8);ban.paste(t2,(30,5),t2);put(ban,W//2,500,-3)
put(tl(l3,fit(l3,900,96),(255,226,31,255),12),W//2,1560,-3)
o=f'{H}/topics/{cid}.cover.jpg';im.convert('RGB').save(o,quality=92);print(o,os.path.getsize(o)//1024,'KB')
