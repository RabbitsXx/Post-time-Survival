#!/usr/bin/env python3
"""python3 make_cover.py BASE.jpg OUT.jpg "MAIN TEXT" "BANNER TEXT"   Pig War cover style: yellow main line (tilted) over a red banner with a white line, upper third, subject below, bottom 300 px left clear."""
import sys,os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
H=os.path.dirname(os.path.abspath(__file__));F=H+'/../fonts/RobotoCondensed-Bold.ttf'
base,out,main,sub=sys.argv[1:5];im=Image.open(base).convert('RGB');W,Hh=im.size
def fit(txt,maxw,size):
    while True:
        f=ImageFont.truetype(F,size)
        if f.getlength(txt)<=maxw or size<40:return f
        size-=4
def layer(w,h):return Image.new('RGBA',(w,h),(0,0,0,0))
def text_layer(txt,f,fill,stroke,sw):
    b=f.getbbox(txt,stroke_width=sw);w,h=b[2]-b[0]+40,b[3]-b[1]+40;L=layer(w,h);d=ImageDraw.Draw(L);d.text((20-b[0],20-b[1]),txt,font=f,fill=fill,stroke_width=sw,stroke_fill=stroke);return L
def shadow(L,off=10,blur=6):
    s=Image.new('RGBA',L.size,(0,0,0,0));a=L.split()[3].point(lambda v:int(v*.55));s.putalpha(a);s=s.filter(ImageFilter.GaussianBlur(blur));o=layer(L.size[0]+off*2,L.size[1]+off*2);o.paste(s,(off,off),s);o.paste(L,(0,0),L);return o
a=text_layer(main,fit(main,900,200),(255,226,31,255),(0,0,0,255),16)
f2=fit(sub,760,170);b=text_layer(sub,f2,(255,255,255,255),(0,0,0,255),12)
pad=34;bw,bh=b.size[0]+pad*2,b.size[1]+pad;ban=layer(bw,bh);d=ImageDraw.Draw(ban);d.rectangle([0,0,bw-1,bh-1],fill=(196,32,42,255),outline=(0,0,0,255),width=8);ban.paste(b,(pad,pad//2),b)
cx=W//2;y0=int(Hh*.155)
ang=3
A=shadow(a.rotate(ang,expand=True,resample=Image.BICUBIC));Bn=shadow(ban.rotate(ang,expand=True,resample=Image.BICUBIC))
im=im.convert('RGBA');im.paste(A,(cx-A.size[0]//2,y0),A);im.paste(Bn,(cx-Bn.size[0]//2,y0+a.size[1]-30),Bn)
im.convert('RGB').save(out,quality=92);print(out,os.path.getsize(out)//1024,'KB')
