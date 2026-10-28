#!/usr/bin/env python3
"""cover.py  — viral-style cover from a base picture.
python3 cover.py BASE.png OUT.png ASPECT(916|169) "PART 1" "SAFEST|PLACE" "HAS ONE PROBLEM" [accent_word_index]"""
import sys
from PIL import Image,ImageDraw,ImageFont,ImageFilter
import os
FONT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','fonts','RobotoCondensed-Bold.ttf')
YEL=(255,202,40);RED=(222,38,32);WHITE=(255,255,255);BLK=(0,0,0)
def F(sz):return ImageFont.truetype(FONT,sz)
def fit(txt,maxw,start):
    sz=start
    while F(sz).getlength(txt)>maxw and sz>20:sz-=2
    return sz
def outlined(d,xy,txt,sz,fill,anchor='la',sw=None):
    sw=sw or max(6,sz//11)
    d.text(xy,txt,font=F(sz),fill=fill,stroke_width=sw,stroke_fill=BLK,anchor=anchor)
def shadowbox(img,box,fill,radius,outline=None):
    sh=Image.new('RGBA',img.size,(0,0,0,0));ImageDraw.Draw(sh).rounded_rectangle([box[0]+0,box[1]+10,box[2],box[3]+10],radius,fill=(0,0,0,150))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8)))
    d=ImageDraw.Draw(img);d.rounded_rectangle(box,radius,fill=fill,outline=outline,width=6 if outline else 0)
def make(base,out,aspect,part,main,box,accent=0,tag="THE LIGHTHOUSE"):
    im=Image.open(base).convert('RGBA')
    # contrast / saturation pop + vignette
    from PIL import ImageEnhance
    rgb=im.convert('RGB');rgb=ImageEnhance.Contrast(rgb).enhance(1.12);rgb=ImageEnhance.Color(rgb).enhance(1.1);im=rgb.convert('RGBA')
    W,H=im.size
    vg=Image.new('L',(W,H),0);ImageDraw.Draw(vg).ellipse([-W*.25,-H*.15,W*1.25,H*1.15],fill=255);vg=vg.filter(ImageFilter.GaussianBlur(W//5))
    dark=Image.new('RGBA',(W,H),(0,0,0,110));im=Image.composite(im,Image.alpha_composite(im,dark),vg)
    d=ImageDraw.Draw(im)
    lines=main.split('|')
    if aspect=='916':
        # SAFE ZONE: everything lives in the central 23%..77% of the height (= a 1:1 square), so 2:3 / 3:4 / 1:1 crops never cut text
        m=int(W*.06);y0=int(H*.232);yb=int(H*.768)
        tsz=int(W*.042);tw=F(tsz).getlength(tag)+int(W*.06);th=int(tsz*1.9)
        shadowbox(im,[m,y0,m+tw,y0+th],(8,12,24,235),24,outline=YEL);d=ImageDraw.Draw(im)
        d.text((m+tw/2,y0+th/2),tag,font=F(tsz),fill=WHITE,anchor='mm')
        psz=int(W*.135);outlined(d,(W-m,y0+th/2+4),part,psz,YEL,'rm')
        bsz=fit(box,W-2*m-70,int(W*.10));bw=F(bsz).getlength(box)+70;bh=int(bsz*1.35)
        msz=[fit(ln,W-2*m,int(W*.165)) for ln in lines]
        block=sum(int(z*1.0) for z in msz)+18+bh
        y=yb-block
        for i,ln in enumerate(lines):
            outlined(d,(W/2,y),ln,msz[i],YEL if i==accent else WHITE,'ma');y+=int(msz[i]*1.0)
        shadowbox(im,[W/2-bw/2,y+18,W/2+bw/2,y+18+bh],RED,28,outline=WHITE);d=ImageDraw.Draw(im)
        d.text((W/2,y+18+bh/2+3),box,font=F(bsz),fill=WHITE,anchor='mm')
    else:  # 16:9, text left, hero right
        m=int(H*.09);lw=int(W*.56)
        tsz=int(H*.052);tw=F(tsz).getlength(tag)+int(H*.08);th=int(tsz*1.9)
        shadowbox(im,[m,m,m+tw,m+th],(8,12,24,235),22,outline=YEL);d=ImageDraw.Draw(im)
        d.text((m+tw/2,m+th/2),tag,font=F(tsz),fill=WHITE,anchor='mm')
        psz=int(H*.15);outlined(d,(m+tw+24,m-4),part,psz,YEL,'la')
        bsz=fit(box,lw-m-60,int(H*.10));bw=F(bsz).getlength(box)+60;bh=int(bsz*1.35)
        msz=[fit(ln,lw-m,int(H*.20)) for ln in lines]
        block=sum(int(z*1.0) for z in msz)+16+bh
        y=H-m-block
        for i,ln in enumerate(lines):
            outlined(d,(m,y),ln,msz[i],YEL if i==accent else WHITE,'la');y+=int(msz[i]*1.0)
        shadowbox(im,[m,y+16,m+bw,y+16+bh],RED,22,outline=WHITE);d=ImageDraw.Draw(im)
        d.text((m+bw/2,y+16+bh/2+3),box,font=F(bsz),fill=WHITE,anchor='mm')
    im.convert('RGB').save(out,quality=95)
def make169_from916(base916,out,part,main,box,accent=0,tag="THE LIGHTHOUSE"):
    src=Image.open(base916).convert('RGB');W,H=1280,720
    bg=src.resize((W,int(W*src.height/src.width))).crop((0,(int(W*src.height/src.width)-H)//2,W,(int(W*src.height/src.width)-H)//2+H)).filter(ImageFilter.GaussianBlur(24))
    from PIL import ImageEnhance
    bg=ImageEnhance.Brightness(bg).enhance(.55)
    fr=src.resize((int(H*src.width/src.height),H));bg.paste(fr,(W-fr.width-20,0))
    tmp=out+'.tmp.png';bg.save(tmp);make(tmp,out,'169',part,main,box,accent,tag)
if __name__=='__main__':
    a=sys.argv;make(a[1],a[2],a[3],a[4],a[5],a[6],int(a[7]) if len(a)>7 else 0)
