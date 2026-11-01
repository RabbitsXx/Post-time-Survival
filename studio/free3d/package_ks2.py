#!/usr/bin/env python3
"""package_ks2.py : package MIDNIGHT SKEWERS Night 2 (ks2) for posting -> releases/remaincalm/batch1/ks2/
text-free cover (the ghost's face filling the CCTV screen, no UI), the cover as the first 4 frames (IG/TikTok take their cover from them), English srt, two-pass loudnorm -14 LUFS / TP <= -1.5.
Does NOT post (see ../autopilot/post_ks2.py)."""
import sys,os,json,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import package_rc as P
from package_rc import R,REPO
K='ks2';od=f'{REPO}/releases/remaincalm/batch1/{K}';os.makedirs(od,exist_ok=True)
ep=json.load(open(R+f'/out/{K}.spec.json'));frames=R+f'/out/{K}_frames'
sh=dict([x for x in ep['shots'] if x.get('place')=='THE FACE'][0])
sh.update(noUI=True,lines=[],icons=[],flash=None,panic=.6,typed=False,sfx=[],cues=[])
sp=dict(series=ep['series'],title='COVER',part=0,of=0,dur=2,shots=[dict(sh,t0=0,t1=2)])
p=R+f'/spec_{K}_cover.json';json.dump(sp,open(p,'w'));d=R+f'/out/{K}_cover';os.makedirs(d,exist_ok=True)
subprocess.check_call(['node',R+'/render_store3.js',p,d,'20','21','1080','1920','&2d&clean&nocull'],cwd=R)
from PIL import Image
img=Image.open(d+'/00020.jpg').convert('RGB').resize((1080,1920));cov=f'{od}/cover_9x16.jpg';img.save(cov,quality=93);img.resize((540,960)).save(f'{od}/cover_preview.jpg',quality=88)
open(f'{od}/captions_en.srt','w',encoding='utf8').write(P.srt(ep))
wav0=R+f'/out/{K}.wav';wav=R+f'/out/{K}_master.wav'
subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',wav0,'-af','acompressor=threshold=-21dB:ratio=3.2:attack=5:release=90:makeup=4,alimiter=limit=0.72:attack=3:release=60:level=disabled','-ar','44100','-ac','1',wav])
m=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
j=json.loads(m[m.rindex('{'):m.rindex('}')+1])
af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit=0.78:level=disabled"
# cover (4 frames) + frames 4.. of the render, one audio track
subprocess.check_call(['ffmpeg','-y','-loglevel','error','-loop','1','-framerate','30','-t','0.1334','-i',cov,'-framerate','30','-start_number','4','-i',frames+'/%05d.jpg','-i',wav,
  '-filter_complex','[0:v]scale=1080:1920,setsar=1,format=yuv420p[a];[1:v]scale=1080:1920,setsar=1,format=yuv420p[b];[a][b]concat=n=2:v=1:a=0[v]','-map','[v]','-map','2:a',
  '-c:v','libx264','-preset','slow','-crf','21','-maxrate','5M','-bufsize','10M','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af',af,'-movflags','+faststart','-shortest',f'{od}/{K}.mp4'])
print('packaged',od)
