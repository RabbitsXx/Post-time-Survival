#!/usr/bin/env python3
"""build16.py : script_how.py -> TTS (cached) -> timeline -> p/spec.js (engine), p/spec.json, voice.wav, sfx.json, mood.json, cues_en.json
Beat timing comes from the real speech: each beat = lead + sentences (+0.22 s between) + tail; silent beats use 'dur'."""
import sys,os,re,json,base64,hashlib,subprocess,wave,importlib.util,concurrent.futures as cf
import numpy as np,requests
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..')
SR=44100;FPS=30
VOICES={'dex':('en-US-Chirp3-HD-Fenrir',float(os.environ.get('DEX_RATE',1.0))),'game':('en-US-Chirp3-HD-Algenib',0.92),'maya':('en-US-Chirp3-HD-Leda',1.0),'steve':('en-US-Chirp3-HD-Umbriel',0.75)}
LEAD,GAP,TAIL=0.08,0.22,0.34
def _key():
    if os.environ.get('GEMINI_API_KEY'):return os.environ['GEMINI_API_KEY']
    return [l.split('=',1)[1].strip() for l in open(f'{S}/post.env') if l.startswith('GEMINI_API_KEY=')][0]
def load_script(name='script_how'):
    sp=importlib.util.spec_from_file_location(name,f'{R}/{name}.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
plain=lambda c:re.sub(r'</?[ry]>','',c)
def tts(text,voice,rate,path,key):
    if os.path.exists(path) and os.path.getsize(path)>1000:return
    import time
    for a in range(6):
        r=requests.post('https://texttospeech.googleapis.com/v1/text:synthesize',headers={'x-goog-api-key':key},
            json={'input':{'text':text},'voice':{'languageCode':'en-US','name':voice},'audioConfig':{'audioEncoding':'LINEAR16','sampleRateHertz':24000,'speakingRate':rate}},timeout=90)
        j=r.json()
        if 'audioContent' in j:open(path,'wb').write(base64.b64decode(j['audioContent']));return
        time.sleep(2+a*2)
    raise SystemExit(f'TTS failed: {text} {j}')
def trim(src,dst,extra=''):
    f='silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,aresample=44100'+extra
    subprocess.check_call(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',src,'-af',f,'-ac','1',dst])
def rd(f):
    w=wave.open(f);n=w.getnframes();a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768;return a.reshape(-1,w.getnchannels()).mean(1)
def wr(path,x,sr=SR):
    x=np.clip(x,-1,1);w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype(np.int16).tobytes());w.close()
# speaker post filters (applied once per sentence)
FILT={'game':'highpass=f=260,lowpass=f=3600,acrusher=bits=9:mix=.55:mode=log:aa=1,volume=1.15',
      'maya_radio':'highpass=f=420,lowpass=f=3200,acompressor=threshold=-26dB:ratio=6,volume=1.25',
      'steve':'asetrate=44100*0.80,aresample=44100,lowpass=f=2600,volume=1.1'}

# ---- caption chunking: <=5 words / <=30 chars, break after punctuation when possible; accents survive the split
def tokens(cap):
    out,col,glue=[],None,False
    for part in re.split(r'(</?[ry]>)',cap):
        if part in('<r>','<y>'):col=part[1]
        elif part in('</r>','</y>'):col=None
        elif part:
            ws=part.split()
            if not ws:glue=False;continue
            if out and not part[0].isspace() and glue:out[-1]=(out[-1][0]+ws[0],out[-1][1]);ws=ws[1:]
            out+=[(w,col) for w in ws];glue=not part[-1].isspace()
    return out
def fmt(ws):
    groups=[]
    for w,c in ws:
        if groups and groups[-1][0]==c:groups[-1][1].append(w)
        else:groups.append([c,[w]])
    return ' '.join((f'<{c}>'+' '.join(g)+f'</{c}>') if c else ' '.join(g) for c,g in groups)
STOP={'a','an','the','and','or','but','to','of','in','on','at','for','with','by','from','as','is','are','was','you','your','it','that','this','not','no','i','we','they','he','she','his','her','its','then','than','so','if','do','does','can','will','just'}
def chunk(cap,maxw=None,maxc=None):
    maxw=maxw or int(os.environ.get('CAP_MAXW',5));maxc=maxc or int(os.environ.get('CAP_MAXC',30))   # shorts: CAP_MAXW=3 CAP_MAXC=17
    ws=tokens(cap);n=len(ws)
    if n<=maxw and sum(len(w)+1 for w,_ in ws)<=maxc+4:return [ws]
    best=None  # dynamic split into k balanced pieces, prefer breaking after punctuation
    def cost(parts):
        c=0
        for p in parts:
            L=sum(len(w)+1 for w,_ in p);c+=abs(len(p)-n/len(parts))*2+max(0,L-maxc)*3+max(0,len(p)-maxw)*40
        return c
    import itertools
    for k in range(2,min(max(5,-(-n//maxw)+1),n,7)+1):
        for cuts in itertools.combinations(range(1,n),k-1):
            idx=[0,*cuts,n];parts=[ws[idx[i]:idx[i+1]] for i in range(k)]
            c=cost(parts)+sum(7 for p in parts if len(p)==1)-sum(5 for p in parts[:-1] if p[-1][0][-1] in ',.:;?!')+sum(7 for p in parts[:-1] if p[-1][0].lower().strip(',.:;?!') in STOP)+k*3
            if best is None or c<best[0]:best=(c,parts)
        if best and best[0]<20:break
    return best[1]
def rt(v,starts,dur):
    if isinstance(v,(int,float)):return float(v)
    m=re.match(r'^([se])(\d*)\s*([+-]\s*\d*\.?\d+)?$',str(v).replace(' ',''))
    if not m:raise SystemExit(f'bad time {v}')
    kind,k,off=m.groups();off=float(off) if off else 0.0
    ki=int(k or 0)
    if kind=='s' and ki>=len(starts):print(f'  WARN time {v}: beat has {len(starts)} sentence(s)');ki=len(starts)-1
    return (dur if kind=='e' else starts[ki])+off

def main():
    name=sys.argv[1] if len(sys.argv)>1 else 'script_how';out=sys.argv[2] if len(sys.argv)>2 else 'p'
    M=load_script(name);OUT=f'{R}/{out}';os.makedirs(OUT,exist_ok=True);os.makedirs(f'{R}/tts',exist_ok=True);key=_key()
    VOICES.update(getattr(M,'VOICES',{}));FILT.update(getattr(M,'FILT',{}))      # scripts with a bigger cast (THE LAST BUS) bring their own voices / filters
    SPK=sorted({sp for b in M.BEATS for sp,_ in b['say']})
    jobs={}
    for bi,b in enumerate(M.BEATS):
        radio=any(f.get('k')=='pip' for f in b['fx'])
        for si,(sp,tx) in enumerate(b['say']):
            spk=sp+('_radio' if (sp=='maya' and radio) else '')
            vname,rate=VOICES[sp][:2];txt=plain(tx).replace('™','').replace('*','')
            h=hashlib.md5(f'{vname}|{rate}|{txt}'.encode()).hexdigest()[:16]
            jobs[(bi,si)]=dict(sp=sp,spk=spk,text=txt,raw=f'{R}/tts/{h}.wav',trim=f'{R}/tts/{h}_{spk}.wav',vname=vname,rate=rate)
    with cf.ThreadPoolExecutor(6) as ex:
        list(ex.map(lambda j:tts(j['text'],j['vname'],j['rate'],j['raw'],key),jobs.values()))
    for j in jobs.values():
        if not os.path.exists(j['trim']):trim(j['raw'],j['trim'],(','+FILT[j['spk']]) if j['spk'] in FILT else '')
    # ---- timeline
    t=0.0;beats=[];voice_events=[];sfx=[];moods=[];cues=[];words=0;wsum=0.0
    for bi,b in enumerate(M.BEATS):
        t0=t;cur=LEAD if b['say'] else 0.0;sents=[]
        for si,(sp,tx) in enumerate(b['say']):
            j=jobs[(bi,si)];a=rd(j['trim']);d=len(a)/SR
            sents.append(dict(sp=sp,spk=j['spk'],t0=cur,t1=cur+d,cap=tx,audio=a,text=j['text']));cur+=d+(GAP if si<len(b['say'])-1 else 0)
            if sp==getattr(M,'PACE_SPEAKER','dex') or getattr(M,'ALL_WORDS',False):words+=len(j['text'].split());wsum+=d
        dur=max(cur+(TAIL if b['say'] else 0.0)+b['pause'],b['dur'] or 0,1.6)
        starts=[s['t0'] for s in sents]or[0.0]
        # captions
        caps=[]
        for s in sents:
            ch=chunk(s['cap']);wts=[sum(len(w)+1 for w,_ in c)+ (3 if c[-1][0][-1] in ',.:;?!' else 0) for c in ch];tot=sum(wts);a0=s['t0'];span=s['t1']-s['t0']+0.10;x=a0
            for c,w in zip(ch,wts):
                dd=span*w/tot;caps.append(dict(t=[round(t0+x,3),round(t0+x+dd,3)],h=fmt(c).upper() if False else fmt([(w_.upper(),col) for w_,col in c]),sp=(s['sp'] if s['sp'] in ('game','maya','steve') or getattr(M,'SPEAKERS',None) else 'dex')));x+=dd
            cues.append(dict(t=[round(t0+s['t0'],3),round(t0+s['t1']+.1,3)],text=plain(s['cap']),sp=s['sp']))
            voice_events.append(dict(t=t0+s['t0'],a=s['audio'],sp=s['sp'],spk=s['spk']))
        # captions stay until the next chunk begins (no flicker between chunks of one sentence), but never cross the beat end
        for i in range(len(caps)-1):
            if caps[i+1]['t'][0]-caps[i]['t'][1]<.5:caps[i]['t'][1]=caps[i+1]['t'][0]
        fx=[]
        for f in b['fx']:
            g=dict(f)
            if 'from_' in g:g['from']=g.pop('from_')
            if 'at' in g:g['at']=round(rt(g['at'],starts,dur),3)
            if 'dur' in g and isinstance(g['dur'],str):g['dur']=round(rt(g['dur'],starts,dur)-g['at'],3)
            if 'tick' in g and isinstance(g['tick'],str):g['tick']=round(rt(g['tick'],starts,dur)-g['at'],3)
            if g.get('k') in('zoom','shake') and 'at' in g:pass
            fx.append(g)
        for nm,at in b['sfx']:sfx.append(dict(k=nm,t=round(t0+rt(at,starts,dur),3)))
        sc=b['scene']
        if sc and isinstance(sc.get('p',{}).get('at'),list):sc=dict(sc,p=dict(sc['p'],at=[round(rt(v,starts,dur),3) for v in sc['p']['at']]))      # card reveals timed to the speech
        cam=b['cam'] or ('static' if (b['skin']=='game' or sc['n']=='card') else 'hand')
        bd=dict(t=[round(t0,3),round(t0+dur,3)],scene=sc,skin=b['skin'],cam=cam,caps=caps,fx=fx,mood=b['mood'],i=bi)
        if b.get('view'):bd['view']=b['view']        # 9:16 engine: window onto the 1280x720 world
        if b.get('nofade'):bd['nofade']=True
        if b.get('intent'):bd['intent']=b['intent']      # storyboard: who / does / where / how / why watch (storylint.py)
        beats.append(bd)
        moods.append((round(t0,3),round(t0+dur,3),b['mood']));t=t0+dur
    # frame-quantise beat boundaries so the engine and the audio agree
    q=lambda x:round(x*FPS)/FPS
    prev=0.0
    for bt in beats:
        bt['t']=[round(q(bt['t'][0]),4),round(q(bt['t'][1]),4)]
    total=beats[-1]['t'][1];nfr=int(round(total*FPS))
    # ---- lip-sync envelopes per speaker (digit 0-9 per frame)
    env={k:np.zeros(nfr+4) for k in sorted(set(('dex','game','maya','steve'))|set(SPK))}
    voice=np.zeros(int((total+1)*SR),np.float32)
    for ev in voice_events:
        a=ev['a'];i0=int(round(ev['t']*SR));voice[i0:i0+len(a)]+=a[:len(voice)-i0]
        w=SR//FPS;n=len(a)//w;rms=np.sqrt(np.array([np.mean(a[k*w:(k+1)*w]**2) for k in range(n)])+1e-12)
        if len(rms)==0:continue
        v=np.clip(rms/(np.percentile(rms,92)+1e-9),0,1)**0.8;v=np.convolve(v,[.25,.5,.25],'same');f0=int(round(ev['t']*FPS))
        for k in range(n):
            if f0+k<len(env[ev['sp']]):env[ev['sp']][f0+k]=max(env[ev['sp']][f0+k],v[k] if v[k]>.12 else 0)
    mouth={k:''.join(str(int(round(min(1,x)*9))) for x in v[:nfr+2]) for k,v in env.items()}
    wr(f'{OUT}/voice.wav',voice/(max(1e-6,np.abs(voice).max())/.95) if np.abs(voice).max()>.95 else voice)
    spec=dict(title=M.TITLE,duration=round(total,3),fps=FPS,beats=beats,mouth=mouth)
    if getattr(M,'SPEAKERS',None):spec['speakers']=M.SPEAKERS
    if getattr(M,'WORLD',None):spec['world']=M.WORLD      # data-driven world (worldlib / world9.js)
    json.dump(dict(spec,mouth=None),open(f'{OUT}/spec.json','w'),ensure_ascii=False,indent=0)
    json.dump({k:[int(c) for c in v] for k,v in mouth.items()},open(f'{OUT}/spec.mouth.json','w'))
    open(f'{OUT}/spec.js','w').write('var SPEC='+json.dumps(spec,ensure_ascii=False)+';')
    json.dump(sfx,open(f'{OUT}/sfx.json','w'));json.dump(moods,open(f'{OUT}/mood.json','w'));json.dump(cues,open(f'{OUT}/cues_en.json','w'),ensure_ascii=False,indent=1)
    wpm=words/(wsum/60) if wsum else 0
    ln=[b['t'][1]-b['t'][0] for b in beats]
    print(f'build16: {len(beats)} beats, {total:.1f} s ({total/60:.1f} min), {words} guru words, speaking pace {wpm:.0f} wpm; beat length avg {np.mean(ln):.2f} s, min {min(ln):.2f}, max {max(ln):.2f}; {len(sfx)} sfx')
    long=[(i,round(l,1)) for i,l in enumerate(ln) if l>6.0];print('beats > 6 s:',long)
if __name__=='__main__':main()
