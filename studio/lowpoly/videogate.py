#!/usr/bin/env python3
"""python3 videogate.py CLIP_ID   VIDEO GATE (after the frame gate passed and the video was rendered): duration, loudness, true-peak, black frames, frozen start, first frame = cover, audio present.  Exit 1 on FAIL."""
import sys,os,subprocess,re,json
H=os.path.dirname(os.path.abspath(__file__));cid=sys.argv[1];V=f'{H}/out/{cid}/{cid}.mp4';C=f'{H}/out/{cid}/cover.jpg'
fails=[];warns=[]
def run(*a):return subprocess.run(a,capture_output=True,text=True)
d=float(run('ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',V).stdout or 0)
print(f'duration {d:.1f}s')
if d<22 or d>45:fails.append(f'duration {d:.1f}s outside 22-45 s (Shorts sweet spot 25-41 s)')
elif d>41:warns.append(f'duration {d:.1f}s above 41 s')
r=run('ffmpeg','-hide_banner','-nostats','-i',V,'-af','ebur128=peak=true','-f','null','-').stderr
li=re.findall(r'I:\s+(-?[\d.]+) LUFS',r);pk=re.findall(r'Peak:\s+(-?[\d.]+) dBFS',r)
lufs=float(li[-1]) if li else None;peak=float(pk[-1]) if pk else None;print('loudness',lufs,'LUFS  peak',peak,'dBFS')
if lufs is None:fails.append('no audio')
else:
    if not -16.5<=lufs<=-12.5:fails.append(f'loudness {lufs} LUFS outside -16.5..-12.5 (target -14)')
    if peak is not None and peak>-1.0:fails.append(f'peak {peak} dBFS above -1.0')
bd=run('ffmpeg','-hide_banner','-nostats','-i',V,'-vf','blackdetect=d=0.2:pix_th=0.10','-an','-f','null','-').stderr
if 'black_start' in bd:fails.append('black frames: '+', '.join(re.findall(r'black_start:([\d.]+)',bd)[:5]))
fz=run('ffmpeg','-hide_banner','-nostats','-i',V,'-vf','freezedetect=n=-60dB:d=1.5','-an','-f','null','-').stderr
fr=re.findall(r'freeze_start: ([\d.]+)',fz)
if fr:warns.append('frozen picture for >1.5 s from '+', '.join(fr[:5])+' s (ok only for a deliberate hold)')
if os.path.exists(C):
    t='/tmp/vg_first.png';run('ffmpeg','-y','-v','error','-i',V,'-frames:v','1','-vf','scale=108:192',t)
    from PIL import Image,ImageChops,ImageStat
    a=Image.open(t).convert('RGB');b=Image.open(C).convert('RGB').resize((108,192));diff=ImageStat.Stat(ImageChops.difference(a,b)).mean[0]
    print(f'first frame vs cover diff {diff:.1f}')
    if diff>14:fails.append(f'first frame is not the cover (diff {diff:.1f})')
else:warns.append('no cover.jpg next to the video')
for f in fails:print('FAIL',f)
for w in warns:print('WARN',w)
print('VIDEO GATE:','FAIL' if fails else 'PASS')
sys.exit(1 if fails else 0)
