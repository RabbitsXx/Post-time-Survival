#!/usr/bin/env python3
"""package_fb.py [night1 night2 night3] : Facebook-ready files for MIDNIGHT SKEWERS Nights 1-3 -> releases/remaincalm/batch1/fb_<night>/
  <night>.mp4  1080x1920, H.264/AAC, first 4 frames = the cover, -14 LUFS, true peak <= -1.8 dBFS
  cover_9x16.jpg (+ cover_preview.jpg), captions_en.srt, POST_TEXT.md (caption + hashtags)
Does NOT post anything.  No text on the video or in the post copy mentions that a clip was rebuilt."""
import sys,os,json,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import package_rc as P
from package_rc import R,REPO,FONT,outlined
from PIL import Image,ImageDraw,ImageFont
# night: (episode id, key shot place, pill, headline line 1, headline line 2, caption, hashtags)
CFG={
 'night1':('n1fb','HOOK 2','NIGHT 1','ON','CAMERA?',
   "Two customers. One isn't human. The rule: real customers show on camera. Can you spot them before I do? 👀",
   '#horror #horrorstory #animation #creepy #nightshift #cctv #midnightskewers #reels'),
 'night2':('ks2','TUG OF WAR','NIGHT 2','BREAK','A RULE',
   "3 rules. 1 stick. And something that doesn't care about either. Which rule would YOU have broken? 👇",
   '#horror #horrorcomedy #animation #creepy #nightshift #cctv #midnightskewers #reels'),
 'night3':('ks3','THE FACE','NIGHT 3','COUNT','THEM',
   "The camera and the window must show the same number of people. If not, close the shutter. Did you count right? 👀",
   '#horror #horrorstory #animation #creepy #nightshift #cctv #midnightskewers #reels'),
}
def one(key):
    k,place,pill,l1,l2,cap,tags=CFG[key];od=f'{REPO}/releases/remaincalm/batch1/fb_{key}';os.makedirs(od,exist_ok=True)
    ep=json.load(open(R+f'/out/{k}.spec.json'));frames=R+f'/out/{k}_frames'
    sh=dict([x for x in ep['shots'] if x.get('place')==place][0]);sh.update(noUI=True,lines=[],icons=[],flash=None,typed=False,sfx=[],cues=[])
    sp=dict(series=ep['series'],title='COVER',part=0,of=0,dur=2,shots=[dict(sh,t0=0,t1=2)])
    p=R+f'/spec_{k}_fbcover.json';json.dump(sp,open(p,'w'));d=R+f'/out/{k}_fbcover';os.makedirs(d,exist_ok=True)
    subprocess.check_call(['node',R+'/render_store3.js',p,d,'24','25','1080','1920','&2d&clean&nocull'],cwd=R)
    img=Image.open(d+'/00024.jpg').convert('RGB').resize((1080,1920))
    ov=Image.new('RGBA',(1080,1920),(0,0,0,0));od_=ImageDraw.Draw(ov)
    for y in range(1050,1920):od_.line([(0,y),(1080,y)],fill=(5,8,18,int(215*min(1,(y-1050)/340))))
    for y in range(0,360):od_.line([(0,y),(1080,y)],fill=(5,8,18,int(150*(1-y/360))))
    img=Image.alpha_composite(img.convert('RGBA'),ov).convert('RGB');dr=ImageDraw.Draw(img)
    fp=ImageFont.truetype(FONT,60);fb=ImageFont.truetype(FONT,200)
    dr.rounded_rectangle((190,120,890,224),radius=52,fill=(8,10,20),outline=(242,194,48),width=7);dr.text((540,172),f'MIDNIGHT SKEWERS · {pill}',font=ImageFont.truetype(FONT,46),fill=(255,255,255),anchor='mm')
    outlined(dr,(540,1340),l1,fb,(255,255,255),w=14);outlined(dr,(540,1540),l2,fb,(242,194,48),w=14)
    cov=f'{od}/cover_9x16.jpg';img.save(cov,quality=93);img.resize((540,960)).save(f'{od}/cover_preview.jpg',quality=88)
    open(f'{od}/captions_en.srt','w',encoding='utf8').write(P.srt(ep))
    wav0=R+f'/out/{k}.wav';wav=R+f'/out/{k}_fbmaster.wav'
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',wav0,'-af','acompressor=threshold=-21dB:ratio=3.2:attack=5:release=90:makeup=4,alimiter=limit=0.72:attack=3:release=60:level=disabled','-ar','44100','-ac','1',wav])
    m=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
    j=json.loads(m[m.rindex('{'):m.rindex('}')+1])
    af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit=0.78:level=disabled"
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-loop','1','-framerate','30','-t','0.1334','-i',cov,'-framerate','30','-start_number','4','-i',frames+'/%05d.jpg','-i',wav,
      '-filter_complex','[0:v]scale=1080:1920,setsar=1,format=yuv420p[a];[1:v]scale=1080:1920,setsar=1,format=yuv420p[b];[a][b]concat=n=2:v=1:a=0[v]','-map','[v]','-map','2:a',
      '-c:v','libx264','-preset','slow','-crf','21','-maxrate','5M','-bufsize','10M','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af',af,'-movflags','+faststart','-shortest',f'{od}/{key}.mp4'])
    open(f'{od}/POST_TEXT.md','w',encoding='utf8').write(f"# MIDNIGHT SKEWERS · {pill} (Facebook)\n\n## Caption (paste as the Reel description)\n{cap}\n\n{tags}\n\n## Files\n{key}.mp4 · cover_9x16.jpg · captions_en.srt\n")
    print('packaged',key,od)
if __name__=='__main__':
    for key in (sys.argv[1:] or list(CFG)):one(key)
