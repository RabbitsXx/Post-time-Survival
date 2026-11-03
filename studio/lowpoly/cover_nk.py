#!/usr/bin/env python3
"""python3 cover_tickle.py  -> topics/nk.cover.jpg   composes the 'hero fills the frame' cover from out/tickle_cover/face (laughing Poly) + out/tickle_cover/glove (green-screen glove)."""
import os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
H=os.path.dirname(os.path.abspath(__file__));F=H+'/../fonts/RobotoCondensed-Bold.ttf';Q=H+'/out/tickle_cover'
W,Hh=1080,1920;BG=(122,58,224)
face=Image.open(Q+'/nbg/00015.jpg').convert('RGB');gl=None
from PIL import ImageEnhance
chr_=Image.open(Q+'/nch/00015.jpg').convert('RGB')
bg=ImageEnhance.Brightness(face.filter(ImageFilter.GaussianBlur(18))).enhance(.82)
mk=Image.new('L',(W,Hh),0);cp=chr_.load();mp=mk.load()
for y in range(Hh):
    for x in range(W):
        r,g,b=cp[x,y]
        if not(g>150 and r<130 and b<130):mp[x,y]=255
mk=mk.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.8))
im=bg.copy();im.paste(chr_,(0,0),mk)
base=im.convert('RGBA');im=base
def tl(txt,f,fill,sw,stroke=(0,0,0,255)):
    b=f.getbbox(txt,stroke_width=sw);L=Image.new('RGBA',(b[2]-b[0]+40,b[3]-b[1]+40),(0,0,0,0));ImageDraw.Draw(L).text((20-b[0],20-b[1]),txt,font=f,fill=fill,stroke_width=sw,stroke_fill=stroke);return L
def drop(L,off=10,blur=6):
    s=Image.new('RGBA',L.size,(0,0,0,0));s.putalpha(L.split()[3].point(lambda v:int(v*.55)));s=s.filter(ImageFilter.GaussianBlur(blur));o=Image.new('RGBA',(L.size[0]+2*off,L.size[1]+2*off),(0,0,0,0));o.paste(s,(off,off),s);o.paste(L,(0,0),L);return o
def put(L,cx,cy,rot=0):
    L=drop(L.rotate(rot,expand=True,resample=Image.BICUBIC));im.paste(L,(cx-L.size[0]//2,cy-L.size[1]//2),L)
f1=ImageFont.truetype(F,140);put(tl('WHAT IF',f1,(255,226,31,255),16),W//2,300,-3)
f2=ImageFont.truetype(F,104);t=tl("NORTH KOREA RULED?",f2,(255,255,255,255),12);bw,bh=t.size[0]+60,t.size[1]+10;ban=Image.new('RGBA',(bw,bh),(0,0,0,0));d=ImageDraw.Draw(ban);d.rectangle([0,0,bw-1,bh-1],fill=(196,32,42,255),outline=(0,0,0,255),width=8);ban.paste(t,(30,5),t);put(ban,W//2,505,-3)
fh=ImageFont.truetype(F,96);put(tl('DO THE MATH',fh,(255,226,31,255),12),540,1560,-4)
im.convert('RGB').save(H+'/topics/nk.cover.jpg',quality=92);print(os.path.getsize(H+'/topics/nk.cover.jpg')//1024,'KB')
