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
def render_cover_frame(path,variant='A'):
    if variant=='A':   # calm face + the dead right behind her shoulder
        cam=[[7.5,1.5,Z],[10.2,1.35,Z]];fov=29
        chars=[dict(who='z2',pos=[11.6,Z+.9],expr='calm'),dict(who='z1',pos=[10.55,Z+.38],expr='calm'),dict(who='mimi',pos=[10.2,Z],expr='smile')]
    elif variant=='C':  # same as B, pulled back so the faces sit under the badge row (reference proportions)
        cam=[[6.6,1.5,Z],[10.0,1.45,Z]];fov=42
        chars=[dict(who='z1',pos=[11.2,Z-.9],expr='calm'),dict(who='mimi',pos=[10.7,Z-.4],expr='smile'),dict(who='gus',pos=[9.6,Z+.15],expr='shock',act='scared')]
    else:              # fear vs calm: Gus screams, Mimi smiles behind him
        cam=[[7.0,1.5,Z],[10.0,1.35,Z]];fov=30
        chars=[dict(who='z1',pos=[11.2,Z-.9],expr='calm'),dict(who='mimi',pos=[10.7,Z-.4],expr='smile'),dict(who='gus',pos=[9.6,Z+.15],expr='shock',act='scared')]
    sp=dict(series='REMAIN CALM',title='COVER',part=1,of=3,dur=2,shots=[dict(t0=0,t1=2,cam=[cam[0],cam[1],cam[0],cam[1]],fov=fov,chars=chars,lines=[],place='',grade='calm',noUI=True)])
    p=R+'/spec_rc_cover.json';json.dump(sp,open(p,'w'));d=R+'/out/rc_cover';os.makedirs(d,exist_ok=True)
    subprocess.check_call(['node',R+'/render_store3.js',p,d,'10','11','1080','1920','&2d'],cwd=R);os.replace(d+'/00010.jpg',path)
def cover(base,ref=False):
    if ref:return cover_ref(base)
    # layout rules (shorts research): faces + words inside the centre square (y 420-1500) and out of the bottom ~300px; <=5 words; big outlined type; high contrast
    from PIL import ImageEnhance
    img=Image.open(base).convert('RGB').resize((1080,1920));img=ImageEnhance.Contrast(img).enhance(1.25);img=ImageEnhance.Color(img).enhance(1.25);img=ImageEnhance.Brightness(img).enhance(1.12)
    ov=Image.new('RGBA',(1080,1920),(0,0,0,0));d=ImageDraw.Draw(ov)
    for y in range(0,380):d.line([(0,y),(1080,y)],fill=(5,8,18,int(200*(1-y/380))))
    for y in range(1150,1920):d.line([(0,y),(1080,y)],fill=(5,8,18,int(235*min(1,(y-1150)/420))))
    img=Image.alpha_composite(img.convert('RGBA'),ov).convert('RGB');d=ImageDraw.Draw(img)
    f_cap=ImageFont.truetype(FONT,58);f_part=ImageFont.truetype(FONT,150);f_big=ImageFont.truetype(FONT,185);f_pill=ImageFont.truetype(FONT,60)
    d.rounded_rectangle((50,70,50+520,70+104),radius=52,fill=(8,10,20),outline=(242,194,48),width=8);d.text((310,122),'REMAIN CALM',font=f_cap,fill=(255,255,255),anchor='mm')
    outlined(d,(1040,150),'PART 1',f_part,(242,194,48),w=12,anchor='rm')
    outlined(d,(540,1205),'THE DEAD',f_big,(255,255,255),w=14);outlined(d,(540,1385),'SMELL FEAR',f_big,(242,194,48),w=14)
    d.rounded_rectangle((220,1525,860,1625),radius=50,fill=(216,52,44),outline=(255,255,255),width=6);d.text((540,1576),'12 SHOPPERS · 1 NIGHT',font=f_pill,fill=(255,255,255),anchor='mm')
    return img
def preview(img,path):
    sq=img.crop((0,420,1080,1500)).resize((480,480));full=img.resize((270,480));small=img.resize((135,240));strip=img.crop((337,0,743,1920)).resize((203,960)).resize((135,640))
    sh=Image.new('RGB',(270+480+135+135+50,640),(30,30,30));x=10
    for im in(full,sq,small,strip):sh.paste(im,(x,10));x+=im.size[0]+10
    sh.save(path,quality=90)
def cover_ref(base,part='PART 1',l1='THE DEAD',l2='SMELL FEAR',pill='12 SHOPPERS · 1 NIGHT'):
    # proportions copied from the owner's reference (THE LAST SUNRISE): badge row at y~490, 2-line headline y 985-1300, big red pill y 1330-1475, bottom ~420px empty
    from PIL import ImageEnhance
    img=Image.open(base).convert('RGB').resize((1080,1920));img=ImageEnhance.Contrast(img).enhance(1.2);img=ImageEnhance.Color(img).enhance(1.2);img=ImageEnhance.Brightness(img).enhance(1.1)
    ov=Image.new('RGBA',(1080,1920),(0,0,0,0));d=ImageDraw.Draw(ov)
    for y in range(1020,1920):d.line([(0,y),(1080,y)],fill=(5,8,18,int(235*min(1,(y-1020)/330))))
    img=Image.alpha_composite(img.convert('RGBA'),ov).convert('RGB');d=ImageDraw.Draw(img)
    f_cap=ImageFont.truetype(FONT,52);f_part=ImageFont.truetype(FONT,168);f_big=ImageFont.truetype(FONT,176);f_pill=ImageFont.truetype(FONT,74)
    d.rounded_rectangle((65,447,65+415,447+82),radius=22,fill=(8,10,20),outline=(242,194,48),width=6);d.text((272,488),'REMAIN CALM',font=f_cap,fill=(255,255,255),anchor='mm')
    outlined(d,(1005,490),part,f_part,(242,194,48),w=12,anchor='rm')
    outlined(d,(540,1058),l1,f_big,(255,255,255),w=14);outlined(d,(540,1240),l2,f_big,(242,194,48),w=14)
    d.rounded_rectangle((142,1330,938,1475),radius=30,fill=(216,40,36),outline=(255,255,255),width=6);d.text((540,1403),pill,font=f_pill,fill=(255,255,255),anchor='mm')
    return img
def main():
    ep=json.load(open(R+'/out/rc1.spec.json'));th=json.load(open(R+'/thai_rc1.json'));frames=R+'/out/rc1_frames'
    rel='releases/remaincalm/rc1';od=f'{REPO}/{rel}';os.makedirs(od,exist_ok=True)
    var=sys.argv[1] if len(sys.argv)>1 else 'A'
    for v in('A','B'):
        b=R+f'/out/rc_cover_base_{v}.jpg';render_cover_frame(b,v);im=cover(b);im.save(f'{od}/cover_9x16_{v}.jpg',quality=92);preview(im,f'{od}/cover_preview_{v}.jpg')
    img=Image.open(f'{od}/cover_9x16_{var}.jpg');img.save(f'{od}/cover_9x16.jpg',quality=92)
    for i in range(4):img.save(f'{frames}/{i:05d}.jpg',quality=93)
    open(f'{od}/captions_en.srt','w').write(srt(ep));open(f'{od}/captions_th.srt','w').write(srt(ep,th))
    meta=dict(id='rc1',title='REMAIN CALM Part 1: The Dead Smell Fear | What if zombies could smell fear?',hook='What if the dead could smell fear?',
     description="What if the dead could smell fear?\n\nAt FRESHWAY 24H, a cashier whose smile never breaks has one night to teach a jumpy security guard to stay calm — before the dead find him.\n\nReal tip: slow breathing (in for 4, out for 6) lowers your heart rate and helps you stay calm when startled.\n\nPart 1 of 3 · REMAIN CALM\nWould you stay calm? Tell me below.",
     tags=['remain calm','what if','zombie apocalypse','survival','animated short','zombie short film','horror comedy','what if zombies','apocalypse survival','supermarket zombie'],next='BOX BREATHING (Part 2)',
     status='built, NOT posted')
    json.dump(meta,open(f'{od}/meta.json','w'),indent=1,ensure_ascii=False)
    wav=R+'/out/rc1.wav'
    m=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
    j=json.loads(m[m.rindex('{'):m.rindex('}')+1])
    af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',frames+'/%05d.jpg','-i',wav,'-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af',af,'-movflags','+faststart','-shortest',f'{od}/rc1_part1.mp4'])
    print('packaged',od)
if __name__=='__main__':main()
