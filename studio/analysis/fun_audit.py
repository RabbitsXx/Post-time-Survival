#!/usr/bin/env python3
"""fun_audit.py : measures what the QA gates never measured - language, roles, picture, motion, sound - for the shipped shorts and the long video (benchmark)."""
import json,re,os,subprocess,statistics as st,collections,wave,sys
import numpy as np
S=os.path.abspath(os.path.dirname(__file__)+'/..')
EMO=set('fear scream screams cry cries shake shakes tremble heart blood scared afraid panic dark cold burn burns burning pain hurt die dies dead alone trust lie lies secret love hope miss sorry run runs hide hides silence whisper shout breath tears smell sweat hungry thirsty bite bites bitten scar kill killed lost free fall falls falling crack cracks freeze freezes frozen fire storm teeth hand eyes'.split())
BANTER=set('oh ha wow ahem uh hey okay wait really seriously please dad sorry nope whoa yikes oops huh honestly basically literally actually fine sure right'.split())
NUM=set('one two three four five six seven eight nine ten eleven twelve thirteen fifteen seventeen twenty thirty forty fifty hundred thousand thousands minus'.split())
def words(t):return re.findall(r"[A-Za-z']+|\d+",t)
def text_stats(sents):
    ws=[words(s) for s in sents];n=sum(map(len,ws));L=[len(w) for w in ws if w]
    flat=[x.lower() for w in ws for x in w]
    caps=set()
    for s in sents:
        toks=re.findall(r"[A-Za-z']+",s)
        for i,t in enumerate(toks):
            if i>0 and t[0].isupper() and t!='I' and not t.isupper():caps.add(t)
    return dict(sentences=len(L),words=n,mean_len=round(st.mean(L),1),sd_len=round(st.pstdev(L),1),
      numbers=round(100*sum(1 for x in flat if x.isdigit() or x in NUM)/n,1),emo=round(100*sum(1 for x in flat if x in EMO)/n,1),
      banter=round(100*sum(1 for x in flat if x in BANTER)/n,1),you=round(100*sum(1 for x in flat if x in('you','your'))/n,1),
      contractions=round(100*sum(1 for x in flat if "'" in x)/n,1),questions=sum(1 for s in sents if '?' in s),excl=sum(1 for s in sents if '!' in s),names=sorted(caps))
def motion(path,ss=0,t=60):
    cmd=['ffmpeg','-v','error','-ss',str(ss),'-i',path,'-t',str(t),'-vf','fps=10,scale=72:128:flags=area,format=gray','-f','rawvideo','-']
    raw=subprocess.run(cmd,capture_output=True).stdout;fr=np.frombuffer(raw,np.uint8).reshape(-1,72*128).astype(np.float32)
    d=np.abs(np.diff(fr,axis=0)).mean(1)
    return dict(mean=round(float(d.mean()),2),med=round(float(np.median(d)),2),still=round(float((d<.35).mean()*100),0),spikes_per_min=round(float((d>6).sum()/(len(fr)/10/60)),1))
def motion_wide(path,ss=0,t=60):
    cmd=['ffmpeg','-v','error','-ss',str(ss),'-i',path,'-t',str(t),'-vf','fps=10,scale=128:72:flags=area,format=gray','-f','rawvideo','-']
    raw=subprocess.run(cmd,capture_output=True).stdout;fr=np.frombuffer(raw,np.uint8).reshape(-1,128*72).astype(np.float32)
    d=np.abs(np.diff(fr,axis=0)).mean(1)
    return dict(mean=round(float(d.mean()),2),med=round(float(np.median(d)),2),still=round(float((d<.35).mean()*100),0),spikes_per_min=round(float((d>6).sum()/(len(fr)/10/60)),1))
def audio(path,ss=0,t=60):
    lg=subprocess.run(['ffmpeg','-hide_banner','-ss',str(ss),'-t',str(t),'-i',path,'-af','ebur128','-vn','-f','null','-'],capture_output=True,text=True).stderr
    lra=float(re.findall(r'LRA:\s+([\d.]+) LU',lg)[-1])
    return lra
def voice_gaps(wavp,dur=None):
    w=wave.open(wavp);n=w.getnframes();sr=w.getframerate();a=np.frombuffer(w.readframes(n),np.int16).astype(np.float32)/32768
    if w.getnchannels()>1:a=a.reshape(-1,w.getnchannels()).mean(1)
    h=int(sr*.05);m=len(a)//h;rms=np.sqrt((a[:m*h].reshape(m,h)**2).mean(1)+1e-12);sil=rms<10**(-48/20)
    runs=[];c=0
    for x in sil:
        if x:c+=1
        elif c:runs.append(c*.05);c=0
    return dict(silence=round(float(sil.mean()*100),0),long_pauses=sum(1 for r in runs if r>=.7),longest=round(max(runs+[0]),1))
rows={}
CH={'char':{'schar','sface','heroFull','heroFace'}}
for N in [2,3,4,5,11,12,13,14,15]:
    d=f'{S}/ser/p{N}';sp=json.load(open(f'{d}/spec.json'));cues=json.load(open(f'{d}/cues_en.json'))
    sents=[]
    cur=''
    for a,b,t in cues:sents.append(t)
    # cues are caption-sized fragments: merge into sentences
    txt=' '.join(sents);sent=[s.strip() for s in re.split(r'(?<=[.!?])\s+',txt) if s.strip()]
    ts=text_stats(sent);B=sp['beats']
    roles=collections.Counter(b['role'] for b in B)
    charscenes=sum(1 for b in B if b['scene']['n'] in ('schar','sface','heroFull','heroFace'))
    dur=sp['duration']
    r=dict(series='LH' if N<11 else 'SUN',dur=round(dur),text=ts,roles=dict(roles),char_share=round(100*charscenes/len(B)),sfx_per_min=round(sum(len(b['sfx']) for b in B)/dur*60,1),
           motion=motion(f'{d}/final.mp4',0,dur),lra=audio(f'{d}/final.mp4',0,dur),gaps=voice_gaps(f'{d}/voice.wav'))
    rows[f'p{N}']=r;print(N,json.dumps(r)[:400],file=sys.stderr)
# long-video benchmark: Dex + others, whole script text, first minute motion, mid-minute motion
L=f'{S}/long';cu=json.load(open(f'{L}/p/cues_en.json'));sf=json.load(open(f'{L}/p/sfx.json'));sp=json.load(open(f'{L}/p/spec.json'))
sent=[c['text'] for c in cu];spk=collections.Counter(c['sp'] for c in cu)
fx=collections.Counter(f['k'] for b in sp['beats'] for f in b.get('fx',[]))
rows['long']=dict(dur=round(sp['duration']),text=text_stats(sent),speakers=dict(spk),sfx_per_min=round(len(sf)/sp['duration']*60,1),fx_per_min=round(sum(fx.values())/sp['duration']*60,1),
   motion_first=motion_wide(f'{L}/final.mp4',0,60),motion_mid=motion_wide(f'{L}/final.mp4',200,60),lra=audio(f'{L}/final.mp4',0,600),gaps=voice_gaps(f'{L}/p/voice.wav'))
json.dump(rows,open(f'{S}/analysis/fun_audit.json','w'),indent=1)
print('done')
