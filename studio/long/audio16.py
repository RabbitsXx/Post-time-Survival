#!/usr/bin/env python3
"""audio16.py : music (per-beat mood, crossfaded) + comedic SFX synthesised with numpy -> p/music.wav, p/sfx.wav (stereo 44.1k).
mix16() then ducks the music under the voice, adds the SFX, 2-pass loudnorm -14 LUFS, oversampled true-peak limiter, AAC 256k."""
import sys,os,json,wave,subprocess,re
import numpy as np
R=os.path.dirname(os.path.abspath(__file__));SR=44100
rng=np.random.default_rng(16)
def tt(d):return np.arange(int(d*SR))/SR
def noise(d):return rng.standard_normal(int(d*SR))
def fft_filter(x,lo=None,hi=None):
    X=np.fft.rfft(x);f=np.fft.rfftfreq(len(x),1/SR);m=np.ones_like(f)
    if lo:m*=1/(1+(lo/np.maximum(f,1e-3))**4)
    if hi:m*=1/(1+(f/hi)**4)
    return np.fft.irfft(X*m,len(x))
def env_ad(n,a=.005,d=.2,sus=0.0):
    t=np.arange(n)/SR;e=np.minimum(1,t/max(a,1e-4))*np.exp(-t/max(d,1e-4));return sus+(1-sus)*e
def fade(x,a=.004,r=.01):
    n=len(x);ai,ri=int(a*SR),int(r*SR);x=x.copy()
    if ai:x[:ai]*=np.linspace(0,1,min(ai,n))
    if ri:x[-ri:]*=np.linspace(1,0,min(ri,n))
    return x
def sine(f,d,ph=0):return np.sin(2*np.pi*f*tt(d)+ph)
def saw(f,d):t=tt(d);return 2*((t*f)%1)-1
def square(f,d,duty=.5):t=tt(d);return np.where((t*f)%1<duty,1.0,-1.0)
def tri(f,d):t=tt(d);return 2*np.abs(2*((t*f)%1)-1)-1
def sweep(f0,f1,d,exp=True):
    t=tt(d);f=f0*(f1/f0)**(t/d) if exp else f0+(f1-f0)*t/d;return np.sin(2*np.pi*np.cumsum(f)/SR)
def midi(n):return 440*2**((n-69)/12)

# ------------------------------------------------------------------ SFX
def s_ding():d=1.2;return fade((sine(1318.5,d)+.45*sine(2637,d)+.2*sine(3951,d))*env_ad(int(d*SR),.002,.35))*.6
def s_tick():return fade(sine(1500,.04)*env_ad(int(.04*SR),.001,.01)*.5+noise(.04)*.05)
def s_click():return fade(fft_filter(noise(.03),1500,6000)*env_ad(int(.03*SR),.0005,.006))*.7
def s_pop():d=.09;return fade(sweep(500,1300,d,False)*env_ad(int(d*SR),.002,.03))*.6
def s_boom():d=1.1;t=tt(d);x=sweep(80,32,d)*env_ad(int(d*SR),.002,.35)+fft_filter(noise(d),None,300)*env_ad(int(d*SR),.001,.08)*.8;return fade(x*1.1)
def s_whoosh():d=.55;t=tt(d);x=fft_filter(noise(d),500,3500);e=np.sin(np.pi*np.clip(t/d,0,1))**1.5;return fade(x*e*.7)
def s_scratch():d=.42;t=tt(d);x=fft_filter(noise(d),900,4500)*np.where((t*22)%1<.7,1,.3)*np.exp(-t/.3);x+=sweep(1800,400,d)*.25*np.exp(-t/.3);return fade(x*.8)
def s_whistle():d=.55;t=tt(d);f=2850+60*np.sin(2*np.pi*34*t);x=np.sin(2*np.pi*np.cumsum(f)/SR)*(0.7+0.3*np.sin(2*np.pi*38*t));x+=fft_filter(noise(d),2000,6000)*.25;return fade(x*np.minimum(1,t/.03)*np.exp(-t/.5)*.55)
def s_glitch():
    out=[];
    for i in range(9):
        d=rng.uniform(.015,.045);f=rng.choice([180,420,900,1700,3100]);w=np.round(sine(f,d)*2)/2;out.append(w*rng.uniform(.3,.8))
        out.append(np.zeros(int(rng.uniform(.005,.02)*SR)))
    return fade(np.concatenate(out)*.7)
def s_rewind():d=.85;t=tt(d);f=2600*np.exp(-t*1.4)+300;f*=1+.04*np.sin(2*np.pi*14*t);x=np.sin(2*np.pi*np.cumsum(f)/SR)*.4+saw(120,d)*.15;x+=fft_filter(noise(d),2500,9000)*.35*(0.5+0.5*np.sin(2*np.pi*30*t));return fade(x*np.minimum(1,t/.02)*np.exp(-t/1.2)*.8,.01,.05)
def s_achieve():
    out=np.zeros(int(1.2*SR));
    for i,n in enumerate([72,76,79,84]):
        x=(tri(midi(n),.35)+.4*sine(midi(n+12),.35))*env_ad(int(.35*SR),.002,.15);j=int(i*.09*SR);out[j:j+len(x)]+=x*.5
    return fade(out*.8)
def s_levelup():
    out=np.zeros(int(1.0*SR))
    for i,n in enumerate([72,76,79,84,88]):
        x=square(midi(n),.28,.25)*env_ad(int(.28*SR),.002,.12);j=int(i*.07*SR);out[j:j+len(x)]+=x*.28
    return fade(out)
def s_coin():
    a=square(midi(83),.07,.5)*env_ad(int(.07*SR),.001,.05);b=square(midi(88),.3,.5)*env_ad(int(.3*SR),.001,.12);return fade(np.concatenate([a,b])*.3)
def s_trombone():
    notes=[(58,.34),(57,.34),(56,.34),(55,1.1)];out=[];
    for k,(n,d) in enumerate(notes):
        t=tt(d);f=midi(n)*(1+(0.012*np.sin(2*np.pi*5.5*t) if k==3 else 0));ph=np.cumsum(f)/SR*2*np.pi
        op=np.minimum(1,t/(.06 if k<3 else .12));x=sum(np.sin(h*ph)/h*np.exp(-h/(2+7*op)) for h in range(1,13))
        x*=np.minimum(1,t/.03)*(0.55+0.45*np.sin(np.pi*np.minimum(1,t/(d*1.0)))) *np.where(t>d-.05,np.maximum(0,(d-t)/.05),1);out.append(x*.55)
    return fade(np.concatenate(out),.005,.05)
def s_radio():d=.16;x=fft_filter(noise(d),1000,3200)*env_ad(int(d*SR),.001,.05);b=sine(1180,.07)*.3;y=np.concatenate([x,np.zeros(int(.02*SR)),b*env_ad(len(b),.001,.04)]);return fade(y*.7)
def s_groan():d=1.0;t=tt(d);f=100-26*(t/d)+3*np.sin(2*np.pi*6*t);ph=np.cumsum(f)/SR*2*np.pi;x=sum(np.sin(h*ph)/h*np.exp(-h/6) for h in range(1,16));x=fft_filter(x,None,1100)*(1+.4*np.sin(2*np.pi*9*t))+fft_filter(noise(d),200,900)*.25;return fade(x*np.minimum(1,t/.12)*np.exp(-(t/d)**2*2.5)*.8,.01,.1)
def s_elevmusic():
    out=np.zeros(int(3.2*SR));ch=[[60,64,67,71],[62,65,69,72],[59,62,67,71],[60,64,67,72]];
    for b,c in enumerate(ch):
        for k,n in enumerate(c):
            x=(sine(midi(n+12),.5)+.3*sine(midi(n+24),.5))*env_ad(int(.5*SR),.004,.18);j=int((b*.8+k*.1)*SR);out[j:j+len(x)]+=x*.18
    return fade(out)
def s_powerdown():d=1.3;t=tt(d);x=sweep(260,28,d)*np.exp(-t/.8)*.6+fft_filter(noise(d),None,900)*.2*np.exp(-t/.5);spk=(rng.random(len(t))>.9995)*rng.uniform(.3,1,len(t));x+=fft_filter(spk,2000,9000)*3*np.exp(-t/.6);return fade(x*.8,.005,.1)
def s_doorslam():d=.7;x=sweep(110,45,d)*env_ad(int(d*SR),.001,.12)+fft_filter(noise(d),None,1500)*env_ad(int(d*SR),.0005,.05)*.9+fft_filter(noise(d),2500,8000)*env_ad(int(d*SR),.0003,.02)*.3;return fade(x*.9)
def s_bang():d=.3;return fade((sweep(160,60,d)*env_ad(int(d*SR),.001,.07)+fft_filter(noise(d),None,900)*env_ad(int(d*SR),.0005,.04)*.7)*.85)
def s_thud():d=.4;return fade((sweep(100,40,d)*env_ad(int(d*SR),.001,.1)+fft_filter(noise(d),None,500)*env_ad(int(d*SR),.0005,.05)*.5)*.9)
def s_knock():
    one=lambda:fft_filter(noise(.09),300,1400)*env_ad(int(.09*SR),.0005,.018)*1.4+sine(210,.09)*env_ad(int(.09*SR),.0005,.02)*.7
    return fade(np.concatenate([one(),np.zeros(int(.12*SR)),one()])*.8)
def s_footsteps():
    out=np.zeros(int(3.0*SR))
    for i in range(7):
        x=(fft_filter(noise(.12),None,600)*env_ad(int(.12*SR),.001,.035)+sweep(90,50,.12)*env_ad(int(.12*SR),.001,.05)*.6);j=int(i*.42*SR);out[j:j+len(x)]+=x*.6
    return fade(out)
def s_buzz():d=.45;return fade(square(140,d)*.35*(0.7+0.3*np.sin(2*np.pi*40*tt(d)))*np.minimum(1,np.maximum(0,(d-tt(d))/.04)))
def s_stamp():d=.45;return fade((sweep(120,50,d)*env_ad(int(d*SR),.001,.09)+fft_filter(noise(d),700,4000)*env_ad(int(d*SR),.0003,.03)*.6)*.95)
def s_alarm():
    d=2.4;t=tt(d);f=np.where((t*3.2)%1<.5,880,640)*1.0;x=square(1,d)*0;ph=np.cumsum(f)/SR*2*np.pi;x=np.sign(np.sin(ph))*.22+np.sin(ph)*.18;return fade(x*np.minimum(1,t/.03)*np.minimum(1,(d-t)/.15),.005,.1)
def s_hit():d=.2;return fade((fft_filter(noise(d),200,3000)*env_ad(int(d*SR),.0005,.04)*1.1+sweep(180,70,d)*env_ad(int(d*SR),.001,.06)*.7)*.85)
def s_crack():d=.25;return fade((fft_filter(noise(d),1200,9000)*env_ad(int(d*SR),.0003,.025)*1.2+fft_filter(noise(d),200,900)*env_ad(int(d*SR),.0005,.06)*.5)*.85)
def s_clank():
    d=.55;t=tt(d);x=sum(a*np.sin(2*np.pi*f*t)*np.exp(-t/dd) for f,a,dd in [(520,1,.18),(1313,.7,.12),(2050,.5,.08),(3320,.3,.05)])+fft_filter(noise(d),2000,8000)*np.exp(-t/.02)*.4;return fade(x*.35)
def s_cans():
    out=np.zeros(int(1.0*SR))
    for i in range(9):
        c=s_clank()[:int(.22*SR)]*rng.uniform(.4,1);j=int(rng.uniform(0,.6)*SR);out[j:j+len(c)]+=c
    return fade(out)
def s_bark():d=.2;t=tt(d);f=420*np.exp(-t*2.5)+210;ph=np.cumsum(f)/SR*2*np.pi;x=sum(np.sin(h*ph)/h for h in range(1,9));x=fft_filter(x,None,2200)+fft_filter(noise(d),400,2500)*.35;return fade(x*env_ad(int(d*SR),.004,.07)*.7)
def s_wheeze():d=1.3;t=tt(d);x=fft_filter(noise(d),700,3400)*(0.5+0.5*np.sin(2*np.pi*1.5*t-1))*.7+sweep(240,160,d)*.12;return fade(x*np.sin(np.pi*t/d)**.7*.8,.03,.1)
def s_zzz():d=2.6;t=tt(d);x=fft_filter(noise(d),80,500)*(0.5+0.5*np.sin(2*np.pi*.45*t-1.2))**2;return fade(x*.9,.1,.2)
def s_heli():d=3.0;t=tt(d);x=fft_filter(noise(d),None,300)*(0.5+0.5*np.sign(np.sin(2*np.pi*14*t))*.6+.4*np.sin(2*np.pi*14*t))+fft_filter(noise(d),200,1200)*.12;return fade(x*np.sin(np.pi*np.minimum(1,t/d))**.6*.7,.2,.5)
def _splash():
    d=.9;t=tt(d);x=fft_filter(noise(d),300,6000)*np.exp(-t/.22)*.9
    for i in range(5):
        b=sweep(rng.uniform(500,900),rng.uniform(1200,1800),.07)*env_ad(int(.07*SR),.002,.03);j=int(rng.uniform(.1,.6)*SR);x[j:j+len(b)]+=b*.25
    return fade(x*.9,.002,.08)
SFX={'ding':s_ding,'tick':s_tick,'click':s_click,'pop':s_pop,'boom':s_boom,'whoosh':s_whoosh,'scratch':s_scratch,'whistle':s_whistle,'glitch':s_glitch,'rewind':s_rewind,'achieve':s_achieve,'levelup':s_levelup,'coin':s_coin,'trombone':s_trombone,'radio':s_radio,'groan':s_groan,'elevmusic':s_elevmusic,'powerdown':s_powerdown,'doorslam':s_doorslam,'bang':s_bang,'thud':s_thud,'knock':s_knock,'footsteps':s_footsteps,'buzz':s_buzz,'stamp':s_stamp,'alarm':s_alarm,'hit':s_hit,'crack':s_crack,'clank':s_clank,'cans':s_cans,'bark':s_bark,'wheeze':s_wheeze,'zzz':s_zzz,'heli':s_heli,'splash':_splash}
GAIN={'ding':.8,'boom':1.0,'trombone':.9,'scratch':.85,'whoosh':.5,'pop':.7,'levelup':.55,'achieve':.7,'coin':.5,'elevmusic':.7,'heli':.5,'alarm':.45,'zzz':.45,'groan':.8,'rewind':.7,'glitch':.6,'whistle':.75,'tick':.7,'click':.8,'stamp':1.0,'doorslam':.95,'bang':.85,'cans':.7,'clank':.8,'powerdown':.8,'splash':.9,'radio':.7}

# ------------------------------------------------------------------ music
def put(buf,t,x,g=1.0,pan=0.0):
    i=int(t*SR)
    if i<0 or i>=buf.shape[1]:return
    j=min(buf.shape[1],i+len(x));x=x[:j-i]*g;buf[0,i:j]+=x*(1-max(0,pan)*.6);buf[1,i:j]+=x*(1+min(0,pan)*.6)
def kick(g=1):d=.28;return sweep(130,42,d)*env_ad(int(d*SR),.001,.09)*g
def snare(g=1):d=.2;return (fft_filter(noise(d),1200,7000)*env_ad(int(d*SR),.0005,.06)+sine(190,d)*env_ad(int(d*SR),.0005,.05)*.6)*g
def hat(g=1,o=False):d=.18 if o else .05;return fft_filter(noise(d),6000,None)*env_ad(int(d*SR),.0003,.12 if o else .018)*g
def bass_note(f,d,g=1):x=fft_filter(saw(f,d),None,520)*env_ad(int(d*SR),.004,d*.7,.2)*g;return fade(x,.003,.01)
def epiano(f,d,g=1):t=tt(d);x=(np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*2*f*t)*np.exp(-t/.15)+.15*np.sin(2*np.pi*3*f*t))*np.exp(-t/.4);return fade(x*g,.004,.02)
def pad_note(f,d,g=1):t=tt(d);x=(np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*1.003*t)+.25*np.sin(2*np.pi*2*f*t))*np.minimum(1,t/1.2)*np.minimum(1,(d-t)/1.5);return x*g
_PL={}
def pluck(f,d,g=1):
    k=(round(f,2),d)
    if k not in _PL:_PL[k]=_pluck(f,d)
    return _PL[k]*g
def _pluck(f,d,g=1):
    n=int(d*SR);p=int(SR/f);buf=rng.uniform(-1,1,p);out=np.zeros(n)
    for i in range(n):
        out[i]=buf[i%p];buf[i%p]=.5*(buf[i%p]+buf[(i+1)%p])*.996
    return fade(out*g,.002,.05)
def gen_music(total,moods):
    n=int(total*SR);tracks={}
    ints={}
    for a,b,m in moods:ints.setdefault(m,[]).append((a,b))
    act=lambda m,t:any(a-1.0<=t<=b+1.0 for a,b in ints.get(m,[]))
    # ---- funk, 108 bpm (E minor): kick/snare/hat + bass + e-piano stabs
    if 'funk' in ints:
        buf=np.zeros((2,n));bpm=108;sp=60/bpm/4;bars=int(total/(sp*16))+1
        bass=[(0,40),(3,40),(6,43),(8,40),(10,45),(12,43),(14,47)];ch=[[52,55,59,62],[57,61,64,67],[48,52,55,59],[50,54,57,60]]
        for bar in range(bars):
            t0=bar*sp*16
            if not act('funk',t0):continue
            for s in range(16):
                t=t0+s*sp
                if s in(0,10):put(buf,t,kick(.9))
                if s in(4,12):put(buf,t,snare(.55))
                put(buf,t,hat(.22 if s%2 else .12),pan=.2)
                if s==14:put(buf,t,hat(.18,True),pan=.2)
            for s,m in bass:put(buf,t0+s*sp,bass_note(midi(m-12),sp*1.8,.7))
            for s in(2,6,11):
                for n_ in ch[bar%4]:put(buf,t0+s*sp,epiano(midi(n_),.34,.17),pan=-.15)
        tracks['funk']=buf*.55
    # ---- chiptune, 140 bpm (A minor/F/C/G)
    if 'chip' in ints:
        buf=np.zeros((2,n));sp=60/140/4;bars=int(total/(sp*16))+1;prog=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];roots=[45,41,36,43]
        for bar in range(bars):
            t0=bar*sp*16
            if not act('chip',t0):continue
            ch=prog[bar%4]
            for s in range(16):
                t=t0+s*sp;nt=ch[s%3]+(12 if (s//3)%2 else 24)
                put(buf,t,square(midi(nt),sp*.9,.25)*env_ad(int(sp*.9*SR),.002,.07)*.16,pan=.25)
                if s%2==0:put(buf,t,tri(midi(roots[bar%4]),sp*1.8)*env_ad(int(sp*1.8*SR),.002,.12)*.34)
                if s in(0,8):put(buf,t,kick(.5))
                if s in(4,12):put(buf,t,fft_filter(noise(.1),1500,8000)*env_ad(int(.1*SR),.0005,.03)*.35)
                if s%2:put(buf,t,hat(.12),pan=-.2)
        tracks['chip']=buf*.5
    # ---- tense: drone + heartbeat + sparse pings
    if 'tense' in ints:
        buf=np.zeros((2,n));t=np.arange(n)/SR
        for f,g_ in((55,.5),(55.4,.4),(82.4,.18)):x=fft_filter(saw(f,total),None,260);buf[0]+=x*g_*.5;buf[1]+=x*g_*.5
        buf*= (0.75+0.25*np.sin(2*np.pi*t/9))
        k=0.0
        while k<total:
            if act('tense',k):put(buf,k,kick(.55));put(buf,k+.24,kick(.35))
            k+=1.05
        k=1.3
        while k<total:
            if act('tense',k):x=sine(rng.choice([1760,2093,2349]),1.6)*np.exp(-tt(1.6)/.5)*.12;put(buf,k,x,pan=rng.uniform(-.6,.6))
            k+=rng.uniform(3.5,6.5)
        tracks['tense']=buf*.6
    # ---- calm: pad + slow plucks
    if 'calm' in ints:
        buf=np.zeros((2,n));ch=[[48,55,64],[45,52,60],[53,60,65],[55,62,67]]
        for a,b,m in moods:
            if m!='calm':continue
            t=a;i=0
            while t<b+1:
                for nn in ch[i%4]:put(buf,t,pad_note(midi(nn),6.0,.10),pan=(nn%3-1)*.3)
                t+=4.0;i+=1
            t=a;j=0
            while t<b:
                put(buf,t,pluck(midi(ch[(j//4)%4][j%3]+24),1.4,.16),pan=.2);t+=.5;j+=1
        tracks['calm']=buf
    # ---- warm: major pad + gentle melody
    if 'warm' in ints:
        buf=np.zeros((2,n));ch=[[48,55,64],[43,50,59],[45,52,60],[41,48,57]]
        for a,b,m in moods:
            if m!='warm':continue
            t=a;i=0
            while t<b+1:
                for nn in ch[i%4]:put(buf,t,pad_note(midi(nn),5.0,.12),pan=(nn%3-1)*.3)
                t+=3.0;i+=1
            t=a;j=0;mel=[72,76,79,76,74,77,81,77]
            while t<b:
                put(buf,t,pluck(midi(mel[j%8]),1.2,.18),pan=-.2);t+=.75;j+=1
        tracks['warm']=buf
    # ---- crossfaded sum by mood
    mix=np.zeros((2,n));tt_=np.arange(n)/SR
    for m,buf in tracks.items():
        e=np.zeros(n)
        for a,b,mm in moods:
            if mm!=m:continue
            i0,i1=int(max(0,a-.4)*SR),int(min(total,b+.4)*SR);seg=np.ones(i1-i0);r=int(.5*SR)
            seg[:r]=np.linspace(0,1,min(r,len(seg)));seg[-r:]=np.minimum(seg[-r:],np.linspace(1,0,min(r,len(seg))))
            e[i0:i1]=np.maximum(e[i0:i1],seg)
        mix+=buf*e
    return mix

def main():
    out=sys.argv[1] if len(sys.argv)>1 else 'p'
    sp=json.load(open(f'{R}/{out}/spec.json'));total=sp['duration']+1.0
    moods=[tuple(m) for m in json.load(open(f'{R}/{out}/mood.json'))];ev=json.load(open(f'{R}/{out}/sfx.json'))
    mus=gen_music(total,moods)
    # SFX
    n=int(total*SR);sfx=np.zeros((2,n));cache={}
    for e in ev:
        if e['k'] not in SFX:print('unknown sfx',e['k']);continue
        if e['k'] not in cache:cache[e['k']]=SFX[e['k']]()
        x=cache[e['k']]*GAIN.get(e['k'],.8);put(sfx,e['t'],x)
    def wr(path,a):
        a=np.clip(a.T,-1,1);w=wave.open(path,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((a*32767).astype(np.int16).tobytes());w.close()
    nz=mus[mus!=0];mus=mus*(10**(-22/20)/np.sqrt(np.mean(nz**2)));mus=np.tanh(mus*1.2)/1.2   # music bus: about -22 dBFS RMS, soft-limited (voice sits ~-20 dBFS RMS)
    sfx=np.tanh(sfx*1.1)/1.1
    wr(f'{R}/{out}/music.wav',mus);wr(f'{R}/{out}/sfx.wav',sfx)
    print('audio16: music',round(float(np.abs(mus).max()),2),'sfx',round(float(np.abs(sfx).max()),2),'peak; events',len(ev),'kinds',len(cache))
if __name__=='__main__':main()
