#!/usr/bin/env python3
"""package_rc.py : cover (Last Bus layout, also embedded as first 4 frames), EN/TH srt, metadata draft -> releases/remaincalm/rc1/   (does NOT post anything)"""
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');FONT=REPO+'/studio/fonts/RobotoCondensed-Bold.ttf'
sys.path.insert(0,R)
Z=-0.6
def outlined(d,xy,text,font,fill,stroke=(10,8,6),w=10,anchor='mm'):d.text(xy,text,font=font,fill=fill,stroke_width=w,stroke_fill=stroke,anchor=anchor)
def srt_time(t):
    h=int(t//3600);m=int(t%3600//60);s=t%60;return f'{h:02d}:{m:02d}:{int(s):02d},{int((s-int(s))*1000):03d}'
def srt(spec,th=None):
    out=[];i=1
    for sh in spec['shots']:
        for L in sh['lines']:
            out.append(f"{i}\n{srt_time(L['t0'])} --> {srt_time(L['t1'])}\n{(th.get(L['en']) or L['en']) if th else L['en']}\n");i+=1
    return '\n'.join(out)
def render_cover_frame(path):
    sp=dict(series='REMAIN CALM',title='COVER',part=1,of=3,dur=2,shots=[dict(t0=0,t1=2,cam=[[5.0,1.45,Z],[10.0,1.25,Z],[5.0,1.45,Z],[10.0,1.25,Z]],fov=40,chars=[dict(who='gus',pos=[9.0,Z-.7],expr='scared',act='scared'),dict(who='mimi',pos=[10.1,Z+.15],expr='smile'),dict(who='z1',pos=[10.9,Z-.45],expr='calm'),dict(who='teddy',pos=[11.1,Z+.75],expr='smile'),dict(who='z2',pos=[12.6,Z-.1],expr='calm')],lines=[],place='',grade='calm',noUI=True)])
    p=R+'/spec_rc_cover.json';json.dump(sp,open(p,'w'));d=R+'/out/rc_cover';os.makedirs(d,exist_ok=True)
    subprocess.check_call(['node',R+'/render_store3.js',p,d,'10','11','1080','1920','&2d'],cwd=R);os.replace(d+'/00010.jpg',path)
def cover(base):
    img=Image.open(base).convert('RGB').resize((1080,1920));ov=Image.new('RGBA',(1080,1920),(0,0,0,0));d=ImageDraw.Draw(ov)
    for y in range(0,520):d.line([(0,y),(1080,y)],fill=(5,8,18,int(190*(1-y/520))))
    for y in range(1240,1920):d.line([(0,y),(1080,y)],fill=(5,8,18,int(225*((y-1240)/680))))
    img=Image.alpha_composite(img.convert('RGBA'),ov).convert('RGB');d=ImageDraw.Draw(img)
    f_cap=ImageFont.truetype(FONT,58);f_part=ImageFont.truetype(FONT,150);f_big=ImageFont.truetype(FONT,190);f_pill=ImageFont.truetype(FONT,62)
    d.rounded_rectangle((50,70,50+520,70+104),radius=52,fill=(8,10,20),outline=(242,194,48),width=8);d.text((310,122),'REMAIN CALM',font=f_cap,fill=(255,255,255),anchor='mm')
    outlined(d,(1040,150),'PART 1',f_part,(242,194,48),w=12,anchor='rm')
    outlined(d,(540,1440),'THE DEAD',f_big,(255,255,255),w=14);outlined(d,(540,1640),'SMELL FEAR',f_big,(242,194,48),w=14)
    d.rounded_rectangle((200,1735,880,1840),radius=52,fill=(216,52,44),outline=(255,255,255),width=6);d.text((540,1788),'12 SHOPPERS · 1 NIGHT',font=f_pill,fill=(255,255,255),anchor='mm')
    return img
def main():
    ep=json.load(open(R+'/out/rc1.spec.json'));th=json.load(open(R+'/thai_rc1.json'));frames=R+'/out/rc1_frames'
    rel='releases/remaincalm/rc1';od=f'{REPO}/{rel}';os.makedirs(od,exist_ok=True)
    base=R+'/out/rc_cover_base.jpg';render_cover_frame(base);img=cover(base);img.save(f'{od}/cover_9x16.jpg',quality=92)
    for i in range(4):img.save(f'{frames}/{i:05d}.jpg',quality=93)
    open(f'{od}/captions_en.srt','w').write(srt(ep));open(f'{od}/captions_th.srt','w').write(srt(ep,th))
    meta=dict(id='rc1',title='REMAIN CALM Part 1: The Dead Smell Fear | What if zombies could smell fear?',hook='What if the dead could smell fear?',
     description="What if the dead could smell fear?\n\nAt FRESHWAY 24H, a cashier whose smile never breaks has one night to teach a jumpy security guard to stay calm — before the dead find him.\n\nReal tip: slow breathing (in for 4, out for 6) lowers your heart rate and helps you stay calm when startled.\n\nPart 1 of 3 · REMAIN CALM\nWould you stay calm? Tell me below.",
     tags=['remain calm','what if','zombie apocalypse','survival','animated short','zombie short film','horror comedy','what if zombies','apocalypse survival','supermarket zombie'],next='BOX BREATHING (Part 2)',
     status='built, NOT posted')
    json.dump(meta,open(f'{od}/meta.json','w'),indent=1,ensure_ascii=False)
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',frames+'/%05d.jpg','-i',R+'/out/rc1.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-movflags','+faststart','-shortest',f'{od}/rc1_part1.mp4'])
    print('packaged',od)
if __name__=='__main__':main()
