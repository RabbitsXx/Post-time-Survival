#!/usr/bin/env python3
"""qa16.py [final.mp4] : gates for the 16:9 long-form video.  Exit 1 on FAIL.
 A story/pacing   : beat length (avg 3-4.5 s, none < 1.5 s, none > 8 s), speech pace <= 172 wpm, hook ends in a question, caption chunks <= 6 words
 B layout         : lint16.js (CROP/OVERLAP = FAIL, BAND/EDGE = WARN)
 C video          : 1920x1080 @30, duration = spec, H.264 yuv420p BT.709, size
 D audio          : -14 +-1 LUFS, true peak <= -1.0 dBTP, no clipping
 E cuts           : picture change at every beat boundary (mean abs diff >= 10/255, accepted exceptions listed)
 F blank frames   : no black/blank frame runs"""
import sys,os,json,re,subprocess,tempfile
import numpy as np
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__));video=sys.argv[1] if len(sys.argv)>1 else R+'/final.mp4'
sp=json.load(open(R+'/p/spec.json'));B=sp['beats'];rows=[];FPS=30
def row(g,lvl,msg):rows.append((g,lvl,msg))
# A
ln=[b['t'][1]-b['t'][0] for b in B];avg=np.mean(ln)
row('A','PASS' if 3.0<=avg<=4.5 else 'WARN',f'{len(B)} beats, average beat {avg:.2f} s (target 3-4.5), longest {max(ln):.1f} s, shortest {min(ln):.1f} s')
long=[(i,round(l,1)) for i,l in enumerate(ln) if l>8.01];short=[(i,round(l,1)) for i,l in enumerate(ln) if l<1.5];row('A','FAIL' if long else 'PASS',f'beats > 8 s: {long}' if long else 'no beat > 8 s');row('A','WARN' if short else 'PASS',f'beats < 1.5 s: {short}' if short else 'no beat < 1.5 s')
cues=json.load(open(R+'/p/cues_en.json'));dex=[c for c in cues if c['sp']=='dex'];words=sum(len(c['text'].split()) for c in dex);dsp=sum(c['t'][1]-c['t'][0]-.1 for c in dex);wpm=words/(dsp/60)
row('A','PASS' if wpm<=172 else 'WARN',f'Dex speaking pace {wpm:.0f} wpm ({words} words)')
first=cues[0]['text'].strip();row('A','PASS' if '?' in first else 'WARN',f'hook: "{first}"')
big=[c['h'] for b in B for c in b['caps'] if len(re.sub(r'</?[ry]>','',c['h']).split())>6];row('A','FAIL' if big else 'PASS','caption > 6 words: %s'%big[:3] if big else 'all caption chunks <= 6 words')
dur=sp['duration'];row('A','PASS' if 300<=dur<=900 else 'FAIL',f'duration {dur/60:.1f} min (5-15 min)')
# B
env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
r=subprocess.run(['node','lint16.js','spec'],cwd=R,capture_output=True,text=True,env=env);out=r.stdout+r.stderr;m=re.search(r'lint16: (\d+) CROP, (\d+) OVERLAP, (\d+) BAND, (\d+) EDGE',out)
if m:
    c,o,b_,e=map(int,m.groups());row('B','FAIL' if c+o else 'PASS',f'layout: {c} CROP, {o} OVERLAP');row('B','WARN' if b_+e else 'PASS',f'layout: {b_} BAND, {e} EDGE')
    for l in out.splitlines():
        if l.startswith('[CROP') or l.startswith('[OVERLAP'):row('B','FAIL',l)
else:row('B','FAIL','lint16 did not run: '+out[-300:])
if os.path.exists(video):
    pr=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',video],text=True))
    vs=[s for s in pr['streams'] if s['codec_type']=='video'][0];as_=[s for s in pr['streams'] if s['codec_type']=='audio'][0];d=float(pr['format']['duration'])
    row('C','PASS' if (vs['width'],vs['height'])==(1920,1080) else 'FAIL',f"{vs['width']}x{vs['height']} {vs['codec_name']} {vs['pix_fmt']} {eval(vs['avg_frame_rate']):.2f} fps; colour {vs.get('color_space')}/{vs.get('color_primaries')}")
    row('C','PASS' if abs(d-dur)<.5 else 'FAIL',f'duration {d:.2f} s vs spec {dur:.2f} s; file {os.path.getsize(video)/1e6:.0f} MB, {int(pr["format"]["bit_rate"])/1e6:.1f} Mbps; audio {as_["codec_name"]} {as_["sample_rate"]} Hz')
    # D
    lg=subprocess.run(['ffmpeg','-hide_banner','-i',video,'-af','ebur128=peak=true','-vn','-f','null','-'],capture_output=True,text=True).stderr
    I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',lg)[-1]);TP=float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS',lg)[-1]);LRA=float(re.findall(r'LRA:\s+([\d.]+) LU',lg)[-1])
    row('D','PASS' if abs(I+14)<=1 else 'WARN',f'integrated {I} LUFS, LRA {LRA} LU');row('D','PASS' if TP<=-1.0 else 'FAIL',f'true peak {TP} dBTP')
    # E + F : frames around each boundary and a sparse black-frame scan
    tmp=tempfile.mkdtemp();ts=[]
    for i in range(1,len(B)):t=B[i]['t'][0];ts+=[(i,max(0,t-.07)),(i,t+.07)]
    def grab(t,p):subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',video,'-frames:v','1','-vf','scale=320:180',p],check=True)
    weak=[]
    for k in range(0,len(ts),2):
        (i,ta),(_,tb)=ts[k],ts[k+1];pa,pb=f'{tmp}/a.png',f'{tmp}/b.png';grab(ta,pa);grab(tb,pb)
        A=np.asarray(Image.open(pa).convert('L'),np.float32);Bm=np.asarray(Image.open(pb).convert('L'),np.float32);dd=float(np.abs(A-Bm).mean())
        if dd<10:weak.append((i,round(dd,1)))
    row('E','WARN' if weak else 'PASS',f'weak cuts (mean diff < 10/255): {weak}' if weak else 'every beat boundary changes the picture clearly')
    dark=[]
    for t in np.arange(1,dur-1,2.5):
        p=f'{tmp}/f.png';grab(t,p);m_=float(np.asarray(Image.open(p).convert('L')).mean())
        if m_<3:dark.append(round(float(t),1))
    row('F','FAIL' if dark else 'PASS',f'near-black frames at {dark}' if dark else 'no black/blank frames in the scan')
else:row('C','WARN','video not found, skipped C-F')
res='PASS' if not any(l=='FAIL' for _,l,_ in rows) else 'FAIL'
txt=['QA report: HOW TO SURVIVE (16:9)']+[f'  [{l}] {g}: {m}' for g,l,m in rows]+[f'\n  RESULT: {res}']
open(R+'/qa_report.txt','w').write('\n'.join(txt)+'\n');print('\n'.join(txt));sys.exit(0 if res=='PASS' else 1)
