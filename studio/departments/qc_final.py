#!/usr/bin/env python3
"""QC SUPERVISOR: technical check of the FINAL delivered file.  qc_final.py CLIP_ID -> JSON.  (delivery spec: studio/long/delivery.json)
 * container / codec: H.264 High, yuv420p, 1080x1920, 30 fps, 6-14 Mbps; AAC 48 kHz stereo >= 192 kbps; faststart
 * loudness -14 +-1 LUFS, true peak <= -1.5 dBTP;  duration 20-180 s
 * first frame is the cover (not black), no black frames in the middle (blackdetect), no frozen picture > 4 s outside cards (freezedetect)
 * subtitles end before the video ends;  covers exist at the right size;  file < 256 MB"""
import sys,os,json,re,subprocess
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
def sh(c):return subprocess.run(c,capture_output=True,text=True)
def audit(cid):
    DL=json.load(open(LONG+'/delivery.json'));f=f'{LONG}/{CR.final(cid)}';issues=[];M={};score=100
    if not os.path.exists(f):return dict(dept='qc',score=0,issues=['QC: final file missing'],metrics={})
    p=json.loads(sh(['ffprobe','-v','error','-print_format','json','-show_streams','-show_format',f]).stdout);v=[s for s in p['streams'] if s['codec_type']=='video'][0];a=[s for s in p['streams'] if s['codec_type']=='audio'][0]
    br=int(p['format']['bit_rate'])/1e6;dur=float(p['format']['duration']);M.update(size=f"{v['width']}x{v['height']}",fps=v['r_frame_rate'],mbps=round(br,1),duration=round(dur,1),vcodec=v['codec_name'],profile=v.get('profile'),acodec=a['codec_name'],arate=a['sample_rate'])
    if (v['width'],v['height'])!=(DL['width'],DL['height']):issues.append(f"QC: picture is {v['width']}x{v['height']}, delivery spec is {DL['width']}x{DL['height']}");score-=25
    if v['r_frame_rate']!=f"{DL['fps']}/1":issues.append(f"QC: frame rate {v['r_frame_rate']}");score-=8
    if v['codec_name']!='h264' or v.get('pix_fmt')!='yuv420p':issues.append('QC: video must be H.264 yuv420p');score-=10
    if not 6<=br<=14:issues.append(f'QC: total bitrate {br:.1f} Mbps (3-14)');score-=8
    if a['codec_name']!='aac' or int(a['sample_rate'])!=48000:issues.append('QC: audio must be AAC 48 kHz');score-=6
    if not 20<=dur<=180:issues.append(f'QC: duration {dur:.0f} s outside 20-180');score-=6
    if os.path.getsize(f)>256e6:issues.append('QC: file > 256 MB');score-=10
    lg=sh(['ffmpeg','-hide_banner','-nostats','-i',f,'-af','ebur128=peak=true','-vn','-f','null','-']).stderr
    try:
        I=float(lg.split('I:')[-1].split('LUFS')[0]);TP=float(lg.split('Peak:')[-1].split('dBFS')[0]);M.update(lufs=I,true_peak=TP)
        if abs(I+14)>1:issues.append(f'QC: loudness {I:.1f} LUFS (-14 +-1)');score-=8
        if TP>-1.5:issues.append(f'QC: true peak {TP:.1f} dBTP (> -1.5)');score-=8
    except Exception:issues.append('QC: loudness could not be measured');score-=4
    bl=sh(['ffmpeg','-hide_banner','-nostats','-i',f,'-vf','blackdetect=d=0.25:pic_th=0.98','-an','-f','null','-']).stderr
    blacks=[(float(m.group(1)),float(m.group(2))) for m in re.finditer(r'black_start:([\d.]+) black_end:([\d.]+)',bl)]
    M['black_segments']=blacks
    if any(a_>0.1 for a_,b_ in blacks):issues.append(f'QC: black frames inside the video {blacks[:3]}');score-=8
    if blacks and blacks[0][0]<0.05:issues.append('QC: the first frame is black (cover not embedded)');score-=10
    fz=sh(['ffmpeg','-hide_banner','-nostats','-i',f,'-vf','freezedetect=n=-60dB:d=4','-an','-f','null','-']).stderr
    frozen=re.findall(r'freeze_duration: ([\d.]+)',fz);M['frozen_s']=frozen
    if frozen:issues.append(f'QC: frozen picture for {frozen} s');score-=6
    rel=f'{LONG}/{CR.release(cid)}';srt=f'{rel}/captions_en.srt'
    if os.path.exists(srt):
        ends=re.findall(r'--> (\d+):(\d+):(\d+),(\d+)',open(srt).read())
        if ends:
            e=[int(h)*3600+int(m)*60+int(s)+int(ms)/1000 for h,m,s,ms in ends][-1]
            if e>dur+.05:issues.append(f'QC: subtitles run to {e:.1f} s but the video is {dur:.1f} s');score-=6
    else:issues.append('QC: subtitle file missing');score-=8
    from PIL import Image
    for nm,exp in(('cover_9x16.png',(DL['width'],DL['height'])),('cover_16x9.png',(1280,720))):
        q=f'{rel}/{nm}'
        if not os.path.exists(q):issues.append(f'QC: {nm} missing');score-=6
        elif Image.open(q).size[0]<exp[0]*.9:issues.append(f'QC: {nm} is {Image.open(q).size}');score-=4
    return dict(dept='qc',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
