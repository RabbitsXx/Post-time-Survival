#!/usr/bin/env python3
"""package3d.py EP_ID : cover (embedded as first 4 frames) + EN/TH srt + queue entry for the poster.   (run after build3d)"""
import sys,os,json,subprocess,shutil
from PIL import Image,ImageDraw,ImageFont,ImageFilter
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..')
sys.path.insert(0,REPO+'/studio/autopilot');sys.path.insert(0,REPO+'/studio/ser')
FONT=REPO+'/studio/fonts/RobotoCondensed-Bold.ttf'
META=json.load(open(R+'/meta.json'))
def srt_time(t):
    h=int(t//3600);m=int(t%3600//60);s=t%60;return f'{h:02d}:{m:02d}:{int(s):02d},{int((s-int(s))*1000):03d}'
def srt(spec,key,th=None):
    out=[];i=1
    for sh in spec['shots']:
        for L in sh['lines']:
            txt=L['en'] if key=='en' else (th.get(L['en']) or L['en'])
            out.append(f"{i}\n{srt_time(L['t0'])} --> {srt_time(L['t1'])}\n{txt}\n");i+=1
    return '\n'.join(out)
def outlined(d,xy,text,font,fill,stroke=(10,8,6),w=10,anchor='mm'):
    d.text(xy,text,font=font,fill=fill,stroke_width=w,stroke_fill=stroke,anchor=anchor)
def cover(ep,m,frames):
    base=Image.open(f'{frames}/{int(m["cover_t"]*30):05d}.jpg').convert('RGB').resize((1080,1920))
    ov=Image.new('RGBA',(1080,1920),(0,0,0,0));d=ImageDraw.Draw(ov)
    for y in range(0,700):d.line([(0,y),(1080,y)],fill=(5,8,18,int(210*(1-y/700))))
    for y in range(1300,1920):d.line([(0,y),(1080,y)],fill=(5,8,18,int(220*((y-1300)/620))))
    img=Image.alpha_composite(base.convert('RGBA'),ov).convert('RGB');d=ImageDraw.Draw(img)
    f1=ImageFont.truetype(FONT,230);f2=ImageFont.truetype(FONT,92);f3=ImageFont.truetype(FONT,64)
    d.rounded_rectangle((60,90,60+620,90+96),radius=16,fill=(242,194,48));d.text((80,138),f"{ep['series']}  ·  PART {ep['part']} / {ep['of']}",font=f3,fill=(20,14,6),anchor='lm')
    lines=m['cover_big'].split('|');y=420
    for ln in lines:outlined(d,(540,y),ln,f1,(255,217,138),w=14);y+=250
    outlined(d,(540,y+30),m['cover_small'],f2,(255,255,255),w=9)
    return img
def main():
    cid=sys.argv[1];m=META[cid];ep=json.load(open(R+f'/out/{cid}.spec.json'))
    th=json.load(open(R+'/thai.json'));frames=R+f'/out/{cid}_frames'
    rel=f'releases/well/{cid}';os.makedirs(f'{REPO}/{rel}',exist_ok=True)
    img=cover(ep,m,frames);img.save(f'{REPO}/{rel}/cover_9x16.jpg',quality=92)
    for i in range(4):img.save(f'{frames}/{i:05d}.jpg',quality=93)           # IG / TikTok cover = the first frames
    open(f'{REPO}/{rel}/captions_en.srt','w').write(srt(ep,'en'));open(f'{REPO}/{rel}/captions_th.srt','w').write(srt(ep,'th',th))
    wav=R+f'/out/{cid}.wav';mp4=R+f'/out/{cid}.mp4'
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',frames+'/%05d.jpg','-i',wav,'-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest','-movflags','+faststart',mp4])
    print('packaged',cid,mp4)
if __name__=='__main__':main()
