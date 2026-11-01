"""Audio add-ons for the vertical shorts builder (build_rc.py):
  * ElevenLabs sound effects (made by eleven_sfx.py into out/eleven/*.wav) replace the synthetic SFX of the same name
  * a music bed + a night-street ambience are mixed under the voices (ducked)
Music source order: out/eleven/music.(wav|mp3) if present (e.g. made with the ElevenLabs Music API on a paid plan) else a built-in
procedural placeholder score, so the clip is never silent.
Use from an episode file:  import audio_extra as AX ; AX.install(BD, music_gain=.3)"""
import os,sys,subprocess,wave
import numpy as np
R=os.path.dirname(os.path.abspath(__file__));EL=R+'/out/eleven'
GAIN={'foot':.7,'click':.8,'ping':.6,'whoosh':.6,'chime':.8,'heart':.9,'sting':.8,'slam':1.0,'bang':1.0}
def _load(p,sr):
    if p.endswith('.wav'):
        w=wave.open(p);n=w.getnframes();x=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768;rate=w.getframerate()
    else:
        tmp=p+'.tmp.wav';subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',p,'-ar',str(sr),'-ac','1','-c:a','pcm_s16le',tmp]);w=wave.open(tmp);n=w.getnframes();x=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768;os.remove(tmp);rate=sr
    return x
def sfx_override(BD):
    got=[]
    for f in sorted(os.listdir(EL)) if os.path.isdir(EL) else []:
        n,ext=os.path.splitext(f)
        if ext!='.wav' or n in('ambience','music'):continue
        p=EL+'/'+f;g=GAIN.get(n,.9)
        BD.SFXLIB[n]=(lambda p=p,g=g:(_load(p,BD.SR)*g).astype(np.float32));got.append(n)
    return got
# ---------- placeholder score: pizzicato bass + off-beat plucks + low pad (A minor, 96 bpm) ----------
def _pluck(f,d,sr,bright=1.0):
    n=int(d*sr);t=np.arange(n)/sr;y=(np.sin(2*np.pi*f*t)+.5*bright*np.sin(4*np.pi*f*t)+.25*bright*np.sin(6*np.pi*f*t))*np.exp(-t*6.5)
    return (y*np.minimum(t/.004,1)).astype(np.float32)
def fallback_music(dur,sr=44100):
    n=int((dur+1)*sr);y=np.zeros(n,dtype=np.float32);beat=60/96.;bars=int(dur/(beat*4))+2
    bass=[110,110,82.4,98]*2;mel=[None,440,None,523.3,None,659.3,None,523.3,None,440,None,392,None,330,None,392]
    for b in range(bars):
        for k in range(4):
            t0=(b*4+k)*beat;i=int(t0*sr);f=bass[(b*4+k)%8]*(1 if (b//4)%2==0 else 1.122)
            x=_pluck(f,.5,sr,.6)*.5;y[i:i+len(x)]+=x[:max(0,n-i)] if i<n else 0
            for h in(0,.5):
                m=mel[((b*4+k)*2+int(h*2))%16]
                if m and (b%2==1):
                    j=int((t0+h*beat)*sr);xx=_pluck(m,.22,sr,1.0)*.22
                    if j<n:y[j:j+len(xx)]+=xx[:n-j]
    t=np.arange(n)/sr;pad=np.zeros(n,dtype=np.float32)
    for f in(55.0,82.4,110.0*1.005,130.8):pad+=(2*((f*t)%1)-1).astype(np.float32)*.05
    k=int(sr*.004);pad=np.convolve(pad,np.ones(k)/k,'same')*(.6+.4*np.sin(2*np.pi*t/9.6))
    y+=pad
    return y[:int(dur*sr)+sr]
def ambience(dur,sr=44100):
    p=EL+'/ambience.wav'
    if not os.path.exists(p):return None
    a=_load(p,sr);a=a/(np.max(np.abs(a))+1e-6)*.5;n=int(dur*sr)+sr;out=np.zeros(n,dtype=np.float32);cf=int(sr*1.5);pos=0
    while pos<n:
        seg=a.copy();seg[:cf]*=np.linspace(0,1,cf);seg[-cf:]*=np.linspace(1,0,cf);m=min(len(seg),n-pos);out[pos:pos+m]+=seg[:m];pos+=len(a)-cf
    return out
def music(dur,sr=44100):
    for ext in('wav','mp3'):
        p=EL+'/music.'+ext
        if os.path.exists(p):
            m=_load(p,sr);n=int(dur*sr)+sr;out=np.zeros(n,dtype=np.float32);pos=0
            while pos<n:
                k=min(len(m),n-pos);out[pos:pos+k]=m[:k];pos+=len(m)
            return out,'ElevenLabs file'
    return fallback_music(dur,sr),'procedural placeholder'
# ---------- the mix ----------
# peak target per effect class (linear). Everything is first peak-normalised, then placed at its class level so loud things (impacts,
# the shutter) really are the loudest and foley (steps, clicks, pours) stays under the voices.
IMPACT={'bonk':.46,'snap':.44,'slam':.52,'bang':.46,'stomp':.4,'sting':.34}
COMIC={'honk':.28,'honkdie':.26,'squeak':.22,'boing':.24,'groan':.28,'heart':.3}
FOLEY={'foot':.11,'click':.14,'whoosh':.12,'pour':.15,'rattle':.18,'creak':.17,'unhook':.18,'scrape':.2,'ping':.16,'chime':.2}
DUCKED=set(FOLEY)|{'groan','creak'}          # these get quieter while someone speaks
VOICE_RMS={'whisper':.07,'panic':.115,'low':.095,'':.1}          # target RMS of the active part of a line
def _active_rms(x):
    a=np.abs(x);m=a>.02
    return float(np.sqrt(np.mean(x[m]**2))) if m.sum()>200 else float(np.sqrt(np.mean(x**2))+1e-6)
def _style(p):
    for st in('whisper','panic','low'):
        if '.'+st+'.' in p:return st
    return ''
def install(BD,music_gain=.3,amb_gain=.12):
    M=sys.modules['__main__'];names=sfx_override(BD);print('ElevenLabs SFX loaded:',len(names),'effects')
    SR=BD.SR
    def level(name):
        return IMPACT.get(name) or COMIC.get(name) or FOLEY.get(name) or .35
    def mix(spec,lines,sfx,cues,path):
        n=int(spec['dur']*SR)+SR;V=np.zeros(n,dtype=np.float32);rep=[]
        for L in lines:                                   # 1. voices, each brought to a consistent level
            x,sr=BD.rd(L['wav']);st=_style(L['wav']);g=VOICE_RMS[st]/_active_rms(x);g=min(g,6.0);i=int(L['t0']*SR);k=max(0,min(len(x),n-i));V[i:i+k]+=x[:k]*g
            rep.append((L['who'],st or 'normal',round(20*np.log10(_active_rms(x*g)+1e-9),1)))
        env=np.convolve(np.abs(V),np.ones(2205)/2205,'same');spk=np.clip(env*9,0,1)        # 0..1 "someone is talking"
        sm=np.convolve(spk,np.ones(SR//3)/(SR//3),'same');sm=np.clip(sm*1.6,0,1)
        F=np.zeros(n,dtype=np.float32);X=np.zeros(n,dtype=np.float32);cache={};rng=np.random.RandomState(4)   # 2. effects: F=foley (ducked), X=everything else
        for t,name in sfx:
            if name not in BD.SFXLIB:print('missing sfx',name);continue
            if name not in cache:
                x=BD.SFXLIB[name]();pk=np.max(np.abs(x))+1e-6;x=x/pk*level(name);k=min(len(x),int(.08*SR));x=x.copy();x[-k:]*=np.linspace(1,0,k);cache[name]=x
            x=cache[name]*(.85+.3*rng.rand());i=int(t*SR);k=max(0,min(len(x),n-i))
            (F if name in DUCKED else X)[i:i+k]+=x[:k]
        sc=M.score.build([dict(c) for c in cues]+[dict(t=0,type='hum',level=.04,dur=spec['dur'])],spec['dur']+.5);S=np.zeros(n,dtype=np.float32);S[:len(sc)]=sc[:n]
        mu,src=music(n/SR,SR);mu=mu[:n];am=ambience(n/SR,SR)
        musbus=mu*music_gain*(1-.55*sm)                  # 3. music sits low, dips under speech
        ambbus=(am[:n]*amb_gain*(1-.4*sm)) if am is not None else 0
        out=V*1.0+F*(1-.55*sm)+X+S*.55*(1-.5*sm)+musbus+ambbus
        pk=np.max(np.abs(out))+1e-6;out=out/pk*.92
        w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes());w.close()
        rms=lambda a:round(20*np.log10(np.sqrt(np.mean(a[:int(spec['dur']*SR)]**2))+1e-9)-20*np.log10(pk/.92),1)
        print('MIX REPORT  music:',src,'| ambience:','yes' if am is not None else 'no','| speech lines:',len(rep))
        print('  stem RMS (dBFS, relative to final): voice',rms(V),'| foley',rms(F),'| effects',rms(X),'| score',rms(S*.55),'| music',rms(musbus),'| ambience',rms(ambbus) if am is not None else '-')
        print('  voice line levels:',sorted(set((w_,s_,l_) for w_,s_,l_ in rep))[:12])
    M.mix_rc=mix
