#!/usr/bin/env python3
"""Gate C - viewer-comfort check (added after the first Parts 2-5 were rejected: 'speaks too fast, cuts too often, dizzy,
text covers the picture').  python3 pacing_check.py N   -> exit 1 on any FAIL.
Targets follow the owner's instructions: a cut about every 3-4 s, no flashes, narration ~125 words/min overall with real pauses."""
import sys,os,json,subprocess
import numpy as np
N=int(sys.argv[1]);R=os.path.dirname(os.path.abspath(__file__));D=f'{R}/p{N}'
spec=json.load(open(f'{D}/spec.json'));pc=json.load(open(f'{D}/pacing.json'));rows=[]
def chk(name,ok,msg,level='FAIL'):rows.append(('PASS' if ok else level,name,msg))
beats=[b for b in spec['beats'] if b['role']!='endcard'];ln=[b['t'][1]-b['t'][0] for b in beats]
chk('narration speed (talking)',pc['wpm_speech']<=165,f"{pc['wpm_speech']} wpm while talking (want <= 165; rejected cut was 168-182); TTS rate {pc['rate']}, never sped up")
chk('narration density',pc['wpm_overall']<=140,f"{pc['wpm_overall']} wpm overall incl. pauses (want <= 140; the reference clip is ~125)")
chk('breathing room',0.35<=pc['gap']<=0.9,f"{pc['gap']:.2f}s between sentences (want 0.35-0.9)")
chk('average shot length',3.0<=sum(ln)/len(ln)<=4.2,f"{sum(ln)/len(ln):.2f}s (owner asked for a cut every 3-4 s)")
chk('shortest shot',min(ln)>=1.9,f'{min(ln):.2f}s (want >= 1.9; rejected cut had 0.38)')
chk('longest shot',max(ln)<=5.8,f'{max(ln):.2f}s (want <= 5.8)','WARN')
cutt=[b['t'][0] for b in beats[1:]]
win=max(sum(1 for c in cutt if t0<=c<t0+10) for t0 in np.arange(0,50,0.5))
chk('cut density',win<=4,f'max {win} cuts in any 10 s window (want <= 4)')
fr=subprocess.run(['ffmpeg','-v','error','-i',f'{D}/final.mp4','-vf','scale=90:160,format=gray','-f','rawvideo','-'],capture_output=True).stdout
n=len(fr)//(90*160);v=np.frombuffer(fr[:n*90*160],dtype=np.uint8).reshape(n,90*160).astype(np.float32)
lum=v.mean(1);endt=spec['beats'][-1]['t'][0]
# a FLASH is a brightness spike that falls back within ~8 frames (a normal cut changes brightness and stays there)
ev=[]
for i in range(6,len(lum)-9):
    if i/30>endt-0.1:break
    if lum[i]-lum[i-1]>14 and min(abs(lum[j]-lum[i-1]) for j in range(i+2,i+9))<7:ev.append(i)
chk('white flashes',len(ev)==0,f'{len(ev)} spikes'+(f' (first at {ev[0]/30:.2f}s)' if ev else ''))
mad=np.abs(np.diff(v,axis=0)).mean(1)
jol=[i for i in range(6,len(mad)) if mad[i]>38 and abs(i/30-endt)>0.25 and not any(abs(i/30-c)<0.1 for c in cutt)]
chk('mid-shot jolts',len(jol)==0,f'{len(jol)} frames with a whole-picture jump that is not a cut')
w_=max(len(r[1]) for r in rows)
for l,nm,msg in rows:print(f'[{l:4}] {nm:<{w_}}  {msg}')
bad=sum(1 for r in rows if r[0]=='FAIL');print(f"\n{sum(r[0]=='PASS' for r in rows)} pass, {sum(r[0]=='WARN' for r in rows)} warn, {bad} fail");sys.exit(1 if bad else 0)
