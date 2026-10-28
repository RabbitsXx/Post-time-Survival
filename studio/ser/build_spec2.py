#!/usr/bin/env python3
"""build_spec2.py N -> ser/pN/{spec.json,spec.js,voice.wav,cues_en.json}   (calm-pacing build)
Google Cloud TTS (Chirp3-HD Fenrir) -> trim -> NEVER sped up (slowed to 0.90 at most) -> breathing gaps 0.40-0.85 s
-> beat timing from real audio energy minima. Beats hold 1-3 caption chunks, so cuts stay rare while captions stay short."""
import sys,os,json,base64,hashlib,subprocess,wave,re,concurrent.futures as cf
import numpy as np,requests
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
N=int(sys.argv[1]);SRC=int(os.environ.get('PART_SRC',N))   # PART_SRC=13 builds folder pN from part 13's script (sandbox tests)
if SRC>=11:
    from parts_sun import PARTS;SERIES='THE LAST SUNRISE';PN=SRC-10   # internal ids 11..15 = THE LAST SUNRISE parts 1..5
else:
    from parts_v3 import PARTS;SERIES='THE LIGHTHOUSE';PN=SRC
P=PARTS[SRC]
ROOT=os.path.dirname(os.path.abspath(__file__));OUT=f'{ROOT}/'+os.environ.get('BUILD_OUT',f'p{N}');os.makedirs(OUT+'/tts',exist_ok=True)   # BUILD_OUT=p22 builds into a sandbox folder (tests)
def _key():
    if os.environ.get('GEMINI_API_KEY'):return os.environ['GEMINI_API_KEY']          # Google Cloud TTS key (header x-goog-api-key); keep it OUT of git
    return [l.split('=',1)[1].strip() for l in open(f'{ROOT}/../post.env') if l.startswith('GEMINI_API_KEY=')][0]
KEY=_key()
SR=44100;VOICE="en-US-Chirp3-HD-Fenrir"
LEAD,GAPMIN,GAPMAX,END=0.15,0.40,0.85,59.45
RATE=float(os.environ.get('RATE_START',P.get('rate',0.86)))   # starting native TTS speaking rate (natural prosody); the voice is never sped up or atempo-stretched. Auto-tuned below when the gaps/wpm fall outside the comfort band.

def tts(text,path,RATE):
    if os.path.exists(path) and os.path.getsize(path)>1000:return
    for a in range(6):
        r=requests.post("https://texttospeech.googleapis.com/v1/text:synthesize",headers={"x-goog-api-key":KEY},
          json={"input":{"text":text},"voice":{"languageCode":"en-US","name":VOICE},"audioConfig":{"audioEncoding":"LINEAR16","sampleRateHertz":24000,"speakingRate":RATE}},timeout=60)
        j=r.json()
        if "audioContent" in j:
            open(path,'wb').write(base64.b64decode(j["audioContent"]));return
        import time;time.sleep(2+a*2)
    raise SystemExit(f"TTS failed: {text} {j}")
def trim(src,dst,tempo=1.0):
    f="silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.03,areverse,aresample=44100"
    if abs(tempo-1)>1e-3:f+=f",atempo={tempo:.4f}"
    subprocess.check_call(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',src,'-af',f,'-ac','1',dst])
def rd(f):
    w=wave.open(f);n=w.getnframes();a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768
    return a.reshape(-1,w.getnchannels()).mean(1)
def plain(c):return re.sub(r"</?[ry]>","",c)

# ---- split long caption chunks in two (captions change about every 1 s like the reference clip; the CUT rhythm is untouched)
import re as _re
def _tok(cap):
    out,col=[],None
    for part in _re.split(r"(</?[ry]>)",cap):
        if part in("<r>","<y>"):col=part[1]
        elif part in("</r>","</y>"):col=None
        else:out+=[(w,col) for w in part.split()]
    return out
def _fmt(ws):
    groups=[]
    for w,c in ws:
        if groups and groups[-1][0]==c:groups[-1][1].append(w)
        else:groups.append([c,[w]])
    return " ".join((f"<{c}>"+" ".join(g)+f"</{c}>") if c else " ".join(g) for c,g in groups)
_STOP={"a","an","the","at","of","to","in","on","for","and","but","or","his","her","their","its","is","are","was","that","this","with","by","from","as","so","he","she","they","it"}
def _best_split(cw):
    n=len(cw);best=None
    for k in range(1,n):
        w=cw[k-1][0];bare=_re.sub(r"[^\w']","",w).lower();punct=w[-1] in ".,?!:;"
        sc=abs(k-n/2)+(3 if (bare in _STOP and not punct) else 0)-(1.5 if punct else 0)
        if best is None or sc<best[0]:best=(sc,k,punct)
    return best[1],best[2]
def split_long(caps):
    out=[]
    for cap,sp in caps:
        cw=_tok(cap);sw=sp.split()
        if len(cw)>=4 and len(sw)>=4 and len(sp)>=21:
            k,punct=_best_split(cw);m=min(max(round(k*len(sw)/len(cw)),1),len(sw)-1)
            if punct:   # snap the spoken split to the nearest spoken punctuation so the caption change lands on the pause
                cand=[x for x in range(1,len(sw)) if sw[x-1][-1] in ".,?!:;"]
                if cand:m=min(cand,key=lambda x:abs(x-m))
            out+=[(_fmt(cw[:k]),' '.join(sw[:m])),(_fmt(cw[k:]),' '.join(sw[m:]))]
        else:out.append((cap,sp))
    return out
for _s in P['sentences']:
    for _b in _s:
        _nc=[];_g=[]
        for _ci,_c in enumerate(_b['caps']):
            for _part in split_long([_c]):_nc.append(_part);_g.append(_ci)
        _b['caps']=_nc;_b['gids']=_g
# ---- flatten authoring structure
beats_src=[];sent_chunks=[];sent_gids=[]   # sent_chunks[i] = list of (beat index, caption, spoken)
for s in P['sentences']:
    lst=[];gl=[]
    for b in s:
        beats_src.append(b);bi=len(beats_src)-1
        for (cap,sp),g in zip(b['caps'],b['gids']):
            assert len(plain(cap).split())<=5,f"caption >5 words: {cap}"
            lst.append((bi,cap,sp));gl.append((bi,g))
    sent_chunks.append(lst);sent_gids.append(gl)
sents=[" ".join(sp for _,_,sp in lst) for lst in sent_chunks]+[P['next_spoken']]

# ---- 1 TTS (+ auto-tune of the native speaking rate so a part lands in the comfort band without hand-tuning)
n=len(sents);words=sum(len(s.split()) for s in sents)
def synth_at(rate):
    paths=[f'{OUT}/tts/h_'+hashlib.md5((t+f'|r{rate}').encode()).hexdigest()[:12]+'.wav' for t in sents]
    with cf.ThreadPoolExecutor(6) as ex:list(ex.map(lambda a:tts(a[0],a[1],rate),zip(sents,paths)))
    def one(a):
        i,p=a;trim(p,f'{OUT}/tts/t{i:02d}.wav');return rd(f'{OUT}/tts/t{i:02d}.wav')
    with cf.ThreadPoolExecutor(6) as ex:raw=list(ex.map(one,enumerate(paths)))
    return raw,sum(len(a) for a in raw)/SR
GAP_TARGET,GAP_LO,GAP_HI,WPM_MAX=0.65,0.55,0.78,158
tries=[];rate=RATE
for it in range(4):
    raw,tot=synth_at(rate);gap_=(END-LEAD-tot)/(n-1);wpm=words/tot*60;tries.append((abs(gap_-GAP_TARGET)+(5 if wpm>WPM_MAX else 0),rate,raw,tot))
    if GAP_LO<=gap_<=GAP_HI and wpm<=WPM_MAX:break
    want=END-LEAD-(n-1)*GAP_TARGET
    if it>0 and wpm>WPM_MAX and gap_>GAP_HI:break            # cannot satisfy both: the script is too short for its pace -> keep the better try
    rate=round(min(0.95,max(0.74,rate*tot/want)),3)
    if abs(rate-tries[-1][1])<0.004:break
best=min(tries,key=lambda x:x[0]);_,RATE,raw,tot=best
print(f'auto-rate: tried {[round(t[1],3) for t in tries]} -> using {RATE}')
need=END-LEAD-(n-1)*GAPMIN;minTot=END-LEAD-(n-1)*GAPMAX
if tot>need:raise SystemExit(f'SCRIPT TOO LONG: natural speech {tot:.1f}s > {need:.1f}s available at 0.40s gaps even at the fastest rate - cut about {int((tot-need)*2.8)+1} words')
tempo=1.0
tot=sum(len(a) for a in raw)/SR
gap=min(GAPMAX,max(GAPMIN,(END-LEAD-tot)/(n-1)))
start=[];t=LEAD
for i in range(n):
    start.append(t);t+=len(raw[i])/SR+gap
vend=start[-1]+len(raw[-1])/SR
print(f'part {N}: sentences={n} words={words} speech={tot:.1f}s rate={RATE} gap={gap:.2f}s voice_end={vend:.2f}  speech-rate={words/tot*60:.0f} wpm, overall={words/vend*60:.0f} wpm')

def env(a,ms=30):
    k=int(SR*ms/1000);m=len(a)//k;return np.sqrt((a[:m*k].reshape(m,k)**2).mean(1)),k/SR
def split_times(i,frags,bis):
    """chunk boundaries at audio-energy minima; a CUT (beat boundary) needs >=1.0 s since the previous cut, a caption change >=0.5 s"""
    a=raw[i];d=len(a)/SR
    w=[len(s.replace(' ',''))+3*s.count(',')+4*s.count('.')+4*s.count('?') for s in frags]
    cum=np.cumsum(w)/sum(w);e,dt=env(a);out=[];prev=0.0
    for k,c in enumerate(cum[:-1]):
        mg=1.0 if bis[k]!=bis[k+1] else 0.5
        t0=c*d;lo_t=max(t0-.25,prev+mg);hi_t=min(t0+.25,d-0.5)
        if hi_t<lo_t:lo_t=hi_t=min(max(t0,prev+mg),d-0.5)
        lo,hi=max(0,int(lo_t/dt)),min(len(e)-1,int(hi_t/dt))
        j=lo+int(np.argmin(e[lo:hi+1]));out.append(start[i]+j*dt);prev=j*dt
    return out

SCENE_TYPE={"spaceViz":"diagram","sunSky":"wide","town":"wide","thermo":"card_on_surface","gridMap":"topdown_map","trek":"wide","spring":"wide","garden":"wide","valley":"wide","sunrise":"wide","sobj":"close_prop","scard":"card_on_surface","schar":"character","sface":"character","crowd":"silhouette","lhWide":"wide","lampClose":"close_prop","panel":"close_prop","prop":"close_prop","heroFull":"character","heroFace":"character",
 "radar":"topdown_map","map":"topdown_map","tide":"diagram","card":"card_on_surface","timer":"close_prop","sea":"wide","boat":"wide","dock":"wide","fire":"silhouette",
 "causeway":"wide","shed":"close_prop","dark":"silhouette","ledge":"close_prop","wave":"diagram","diagram":"diagram","pov":"pov"}
ALT={"silhouette":["wide","silhouette"],"wide":["pov","wide"],"close_prop":["diagram","close_prop"],"character":["silhouette","close_prop"],"card_on_surface":["diagram","card_on_surface"],"topdown_map":["diagram","topdown_map"],"diagram":["close_prop","diagram"],"pov":["wide","pov"]}
ROLE={"H":"hook","S":"setup","V":"solve","P":"problem","E":"escalate","F":"payoff","R":"rule","C":"cliff"}
CAMS=["push_in","pan_r","drift","tilt_down","pull_out","pan_l","tilt_up","parallax_orbit"]

flat=[]   # one entry per caption chunk, in time order
for ci,lst in enumerate(sent_chunks):
    bounds=[start[ci]]+split_times(ci,[sp for _,_,sp in lst],[bi for bi,_,_ in lst])
    for k,(bi,cap,sp) in enumerate(lst):
        flat.append(dict(clip=ci,cs=bounds[k],bi=bi,cap=cap,sp=sp,last=(k==len(lst)-1),gid=(ci,)+sent_gids[ci][k]))
NB=len(beats_src)
first_cs=[min(f['cs'] for f in flat if f['bi']==b) for b in range(NB)]
beats=[]
for b in range(NB):
    t0=0.0 if b==0 else round(first_cs[b]-0.04,3)
    t1=round((first_cs[b+1] if b+1<NB else start[-1])-0.04,3)
    src=beats_src[b];sps=[f['sp'] for f in flat if f['bi']==b]
    beats.append(dict(id=f"b{b+1:02d}",t=[t0,t1],role=ROLE[src['role']],info=" ".join(sps),
        shot=dict(type=('diagram' if src['scene']=='sobj' and src['params'].get('kind') in ('probe','core','turbine','vent','rod','sled') else SCENE_TYPE[src['scene']]),camera='drift',hud=src['hud']),sfx=src['sfx'],captions=[],scene=dict(n=src['scene'],p=src['params'])))
for i,f in enumerate(flat):
    ns=flat[i+1]['cs'] if i+1<len(flat) else start[-1]
    beats[f['bi']]['captions'].append(dict(t=[round(f['cs'],3),round(ns-0.03,3)],text=f['cap']))
# every caption must last >= 0.34 s: stretch it and push the next caption (and the cut) a little later when needed
allc=[(bi,c) for bi,b in enumerate(beats) for c in b['captions']]
for k in range(len(allc)-1):
    bi,c=allc[k];nbi,nc=allc[k+1]
    if c['t'][1]-c['t'][0]<0.34:
        c['t'][1]=round(c['t'][0]+0.34,3)
        if bi!=nbi and c['t'][1]>beats[bi]['t'][1]:
            beats[bi]['t'][1]=c['t'][1];beats[nbi]['t'][0]=c['t'][1]
    if nc['t'][0]<c['t'][1]+0.03:nc['t'][0]=round(c['t'][1]+0.03,3)
# role repair: a problem must be followed by solve/escalate/payoff/cliff/rule
FOLLOW={"solve","escalate","payoff","cliff","rule"}
beats[0]['role']='hook'
for i in range(len(beats)-1):
    if beats[i]['role']=='problem' and beats[i+1]['role'] not in FOLLOW: beats[i+1]['role']='escalate'
beats[-1]['role']='cliff'
seen={}
for b in beats:
    k=b['info'].lower();seen[k]=seen.get(k,0)+1
    if seen[k]>1:b['info']=b['info']+f" ({seen[k]})"
# variety: avoid three identical shot types in a row
for i in range(2,len(beats)):
    a,b2,c=beats[i-2]['shot']['type'],beats[i-1]['shot']['type'],beats[i]['shot']['type']
    if a==b2==c:
        for alt in ALT.get(c,[c]):
            if alt!=c:beats[i]['shot']['type']=alt;break
# cameras: gentle rotation; shake only on the first two problems, static_punch on rule stamps (max 2), soft whip into the end card
cam=0;sp_used=0;shakes=0
for i,b in enumerate(beats):
    c=CAMS[cam%len(CAMS)];cam+=1
    if b['role']=='problem' and shakes<2 and i>0:c='shake';shakes+=1
    if 'stamp' in b['sfx'] and sp_used<2:c='static_punch';sp_used+=1
    if i==len(beats)-1:c='whip'
    if i>0 and c==beats[i-1]['shot']['camera']:c=CAMS[cam%len(CAMS)];cam+=1
    b['shot']['camera']=c
beats.append(dict(id=f"b{len(beats)+1:02d}",t=[round(start[-1]-0.04,3),60.0],role="endcard",info=f"End card: "+P['series_hook'].lower(),
    shot=dict(type="endcard",camera="static_punch",hud=["end_card"]),sfx=["riser"],captions=[],scene=dict(n="endcard",p={})))
spec=dict(title=f"{SERIES} — Part {PN}: {P['title']}",series=dict(part=PN,next_hook=P['series_hook']),format=dict(w=720,h=1280,fps=30),duration=60.0,
  chain_note="problem -> solution -> new problem",beats=beats,end_card=P['end'])
json.dump(spec,open(f'{OUT}/spec.json','w'),indent=1);open(f'{OUT}/spec.js','w').write('window.SPEC='+json.dumps(spec)+';')
voice=np.zeros(int(60*SR),dtype=np.float32)
for i in range(n):
    s=int(start[i]*SR);voice[s:s+len(raw[i])]+=raw[i][:len(voice)-s]
w=wave.open(f'{OUT}/voice.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(voice,-1,1)*32767).astype(np.int16).tobytes());w.close()
cues=[];i=0
while i<len(flat):
    j=i
    while j+1<len(flat) and flat[j+1]['gid']==flat[i]['gid']:j+=1
    f=flat[j];end=(start[f['clip']]+len(raw[f['clip']])/SR+0.08) if f['last'] else flat[j+1]['cs']-0.03
    cues.append([round(flat[i]['cs'],2),round(end,2),' '.join(x['sp'] for x in flat[i:j+1])]);i=j+1
cues.append([round(start[-1],2),round(start[-1]+len(raw[-1])/SR+0.08,2),P['next_spoken']])
json.dump(cues,open(f'{OUT}/cues_en.json','w'),indent=1)
json.dump(dict(words=words,speech_s=round(tot,2),rate=RATE,gap=round(gap,3),voice_end=round(vend,2),wpm_speech=round(words/tot*60),wpm_overall=round(words/vend*60)),open(f'{OUT}/pacing.json','w'))
# ---- report
body=[b for b in beats if b['role']!='endcard'];ln=[b['t'][1]-b['t'][0] for b in body]
print(f"{len(beats)} beats incl. end card; content beats avg {sum(ln)/len(ln):.2f}s min {min(ln):.2f} max {max(ln):.2f}; spec avg {60/len(beats):.2f}s")
for b,l in zip(body,ln):
    flag="  <-- SHORT" if l<2.2 else ("  <-- LONG" if l>4.8 else "")
    print(f"  {b['id']} {b['t'][0]:6.2f} {l:4.2f}s {b['role']:8} {b['scene']['n']:9} {' | '.join(plain(c['text']) for c in b['captions'])}{flag}")
