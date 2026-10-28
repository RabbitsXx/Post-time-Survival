#!/usr/bin/env python3
"""thumbs16.py : three cover variants -> thumbs/thumb_{1,2,3}.png/.jpg (1920x1080, JPEG < 2 MB, also 1280x720)"""
import os,sys,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFilter,ImageEnhance
R=os.path.dirname(os.path.abspath(__file__));OUT=R+'/thumbs';os.makedirs(OUT,exist_ok=True)
def stage(loc,skin,acts=None,tag=None,**p):
    d=dict(loc=loc,acts=acts or [],**p);d.pop('hud',None)
    if skin=='game' and p.get('hud',True):d['hud']=dict(deaths=8,lv=1,hp=.8)
    return dict(n='stage',p=d)
Hz=lambda **k:dict(k='horde',**k)
beats=[
 # 0 game bg (street, green zombies), 1 real bg (street dusk, red eyes), fg1
 dict(scene=stage('street','game',[Hz(n=9,x0=60,x1=700,y=600,s=1.5,seed=3,jit=40)],time='day',horde=False),skin='game',cam='static'),
 dict(scene=stage('street','real',[Hz(n=9,x0=520,x1=1240,y=610,s=1.7,seed=8,jit=40)],time='dusk',horde=False),skin='real',cam='static'),
 dict(scene=dict(n='thFG1',p={}),skin='real',cam='static',transparent=True),
 # 3 game bg elevator/zombies, 4 real bg stairs, fg2
 dict(scene=stage('office','game',[],v='elev',state='open',open=0,floors=[3,3],hud=False),skin='game',cam='static'),
 dict(scene=stage('office','real',[],v='stairs',nonum=True),skin='real',cam='static'),
 dict(scene=dict(n='thFG2',p={}),skin='real',cam='static',transparent=True),
 # 6 game bg night street, fg3
 dict(scene=stage('street','game',[Hz(n=12,x0=40,x1=1240,y=610,s=1.6,seed=21,jit=60)],time='night',horde=False,hud=False),skin='game',cam='static'),
 dict(scene=dict(n='thFG3',p={}),skin='real',cam='static',transparent=True)]
for i,b in enumerate(beats):b.update(t=[i*2.0,i*2.0+2.0],caps=[],fx=[])
open(f'{R}/p/thumb.js','w').write('var SPEC='+json.dumps(dict(duration=len(beats)*2,beats=beats,mouth={}))+';')
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
subprocess.check_call(['node','thumbshot16.js','thumb','1.5',OUT+'/layers']+[f'{int((i*2+0.5)*30)}:L{i}' for i in range(len(beats))],cwd=R,env=env)
L=lambda i:Image.open(f'{OUT}/layers/L{i}.png').convert('RGBA')
W,H=1920,1080
def poly_mask(pts):
    m=Image.new('L',(W,H),0);ImageDraw.Draw(m).polygon([(x*1.5,y*1.5) for x,y in pts],fill=255);return m
def finish(im,name,glow=None):
    im=im.convert('RGB');im=ImageEnhance.Color(im).enhance(1.18);im=ImageEnhance.Contrast(im).enhance(1.10)
    # vignette
    v=Image.new('L',(W,H),0);d=ImageDraw.Draw(v);d.ellipse((-W*.25,-H*.35,W*1.25,H*1.35),fill=255);v=v.filter(ImageFilter.GaussianBlur(160));dark=Image.new('RGB',(W,H),(0,0,0));im=Image.composite(im,dark,v.point(lambda x:int(150+x*.41)))
    im=im.filter(ImageFilter.UnsharpMask(radius=2,percent=60,threshold=3))
    im.save(f'{OUT}/{name}.png');q=92
    while True:
        im.save(f'{OUT}/{name}.jpg',quality=q,optimize=True,subsampling=0)
        if os.path.getsize(f'{OUT}/{name}.jpg')<1.9e6 or q<70:break
        q-=4
    im.resize((1280,720),Image.LANCZOS).save(f'{OUT}/{name}_1280.jpg',quality=92,optimize=True)
    print(name,im.size,round(os.path.getsize(f'{OUT}/{name}.jpg')/1e3),'KB q',q)
# --- 1: split GAME | REAL
base=L(1).copy();g=L(0);m=poly_mask([(0,0),(740,0),(560,720),(0,720)]);base.paste(g,(0,0),m)
glow=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(glow);d.line([(740*1.5,0),(560*1.5,H)],fill=(255,225,40,255),width=22);glow2=glow.filter(ImageFilter.GaussianBlur(22));base=Image.alpha_composite(base,glow2);base=Image.alpha_composite(base,glow)
finish(Image.alpha_composite(base,L(2)),'thumb_1')
# --- 2: A (game elevator) | B (real stairs)
base=L(4).copy();g=L(3);m=poly_mask([(0,0),(660,0),(620,720),(0,720)]);base.paste(g,(0,0),m)
glow=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(glow);d.line([(660*1.5,0),(620*1.5,H)],fill=(255,255,255,255),width=16);base=Image.alpha_composite(base,glow)
finish(Image.alpha_composite(base,L(5)),'thumb_2')
# --- 3: YOU DIED
finish(Image.alpha_composite(L(6),L(7)),'thumb_3')
