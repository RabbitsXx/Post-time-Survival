#!/usr/bin/env python3
"""python3 cover_tickle.py  -> topics/tickle.cover.jpg   composes the 'hero fills the frame' cover from out/tickle_cover/face (laughing Poly) + out/tickle_cover/glove (green-screen glove)."""
import os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
H=os.path.dirname(os.path.abspath(__file__));F=H+'/../fonts/RobotoCondensed-Bold.ttf';Q=H+'/out/tickle_cover'
W,Hh=1080,1920;BG=(122,58,224)
face=Image.open(Q+'/face/00015.jpg').convert('RGB');gl=Image.open(Q+'/glove/00015.jpg').convert('RGBA')
im=Image.new('RGB',(W,Hh),BG);im.paste(face,(0,250))
# key out the green background of the glove pass, crop to the glove
px=gl.load()
for y in range(gl.size[1]):
    for x in range(gl.size[0]):
        r,g,b,a=px[x,y]
        if g>150 and r<120 and b<120:px[x,y]=(0,0,0,0)
gl=gl.crop(gl.getbbox());s=1050/gl.size[1];gl=gl.resize((int(gl.size[0]*s),1050),Image.NEAREST).rotate(24,expand=True,resample=Image.BICUBIC)
sh=Image.new('RGBA',gl.size,(0,0,0,0));sh.putalpha(gl.split()[3].point(lambda v:int(v*.5)));sh=sh.filter(ImageFilter.GaussianBlur(10))
base=im.convert('RGBA');gx,gy=560,1010;base.paste(sh,(gx+14,gy+14),sh);base.paste(gl,(gx,gy),gl);im=base
def tl(txt,f,fill,sw,stroke=(0,0,0,255)):
    b=f.getbbox(txt,stroke_width=sw);L=Image.new('RGBA',(b[2]-b[0]+40,b[3]-b[1]+40),(0,0,0,0));ImageDraw.Draw(L).text((20-b[0],20-b[1]),txt,font=f,fill=fill,stroke_width=sw,stroke_fill=stroke);return L
def drop(L,off=10,blur=6):
    s=Image.new('RGBA',L.size,(0,0,0,0));s.putalpha(L.split()[3].point(lambda v:int(v*.55)));s=s.filter(ImageFilter.GaussianBlur(blur));o=Image.new('RGBA',(L.size[0]+2*off,L.size[1]+2*off),(0,0,0,0));o.paste(s,(off,off),s);o.paste(L,(0,0),L);return o
def put(L,cx,cy,rot=0):
    L=drop(L.rotate(rot,expand=True,resample=Image.BICUBIC));im.paste(L,(cx-L.size[0]//2,cy-L.size[1]//2),L)
f1=ImageFont.truetype(F,176);put(tl("CAN'T TICKLE",f1,(255,226,31,255),16),W//2,170,-3)
f2=ImageFont.truetype(F,150);t=tl("YOURSELF?",f2,(255,255,255,255),12);bw,bh=t.size[0]+60,t.size[1]+10;ban=Image.new('RGBA',(bw,bh),(0,0,0,0));d=ImageDraw.Draw(ban);d.rectangle([0,0,bw-1,bh-1],fill=(196,32,42,255),outline=(0,0,0,255),width=8);ban.paste(t,(30,5),t);put(ban,W//2,345,-3)
fh=ImageFont.truetype(F,120);put(tl("HA HA HA!!",fh,(255,226,31,255),12),770,560,8)
im.convert('RGB').save(H+'/topics/tickle.cover.jpg',quality=92);print(os.path.getsize(H+'/topics/tickle.cover.jpg')//1024,'KB')
