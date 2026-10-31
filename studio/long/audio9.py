#!/usr/bin/env python3
"""audio9.py : sound of THE LAST BUS.  Builds on audio16 (numpy synthesis): ~30 new SFX (bus, creatures, comedy, scares) and 5 new moods that all carry the engine rumble:
   idle (engine + soft pad)  creep (engine + heartbeat drone)  comic (engine + pizzicato groove)  chase (engine + fast drums + stabs)  sad (engine low + slow piano + pad)
 python3 audio9.py p9/part1  ->  music.wav, sfx.wav next to spec.json   (the old moods funk/chip/tense/calm/warm still work)"""
import sys,os,json,wave
import numpy as np
import audio16 as A
from audio16 import *
R=os.path.dirname(os.path.abspath(__file__))
rg=np.random.default_rng(9)
def formant(x,f1,f2,q=1.0):return fft_filter(x,f1*.6,f1*1.5)*1.0+fft_filter(x,f2*.7,f2*1.4)*.7
def glide(pts,d):
    t=tt(d);xs=np.linspace(0,d,len(pts));return np.interp(t,xs,pts)
def voiced(f,d,harm=14):
    ph=np.cumsum(f)/SR*2*np.pi;return sum(np.sin(h*ph)/h for h in range(1,harm))
# ------------------------------------------------------------------ bus
def s_chime():                      # PA ding-dong
    out=np.zeros(int(1.9*SR))
    for k,(f,t0) in enumerate([(659.3,0),(523.3,.55)]):
        d=1.2;t=tt(d);x=(np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*2.01*t)*np.exp(-t/.25)+.2*np.sin(2*np.pi*f*3.02*t)*np.exp(-t/.15))*np.exp(-t/.5);j=int(t0*SR);out[j:j+len(x)]+=x*.6
    return fade(out,.002,.1)
def s_doorhiss():
    d=1.0;t=tt(d);x=fft_filter(noise(d),2200,9000)*np.exp(-t/.28)*.9;x[:int(.05*SR)]*=np.linspace(0,1,int(.05*SR));th=sweep(90,55,.2)*env_ad(int(.2*SR),.001,.06)*.7;x[int(.35*SR):int(.35*SR)+len(th)]+=th;return fade(x*.9,.002,.1)
def s_horn():
    d=.8;t=tt(d);x=(saw(311,d)+saw(392,d)+.5*saw(466,d))*.25;x=fft_filter(x,150,2600);return fade(np.tanh(x*2.4)*.55*np.minimum(1,t/.02)*np.minimum(1,(d-t)/.08),.004,.06)
def s_hornlong():
    d=2.6;t=tt(d);x=(saw(311,d)+saw(392,d)+.5*saw(466,d))*.25;x=fft_filter(x,150,2600);return fade(np.tanh(x*2.6)*.6*np.minimum(1,t/.02)*np.minimum(1,(d-t)/.25),.004,.1)
def s_brake():
    d=1.0;t=tt(d);f=glide([3000,2300,1700],d);x=np.sin(np.cumsum(f)/SR*2*np.pi)*.35+fft_filter(noise(d),1500,7000)*.3;return fade(x*np.exp(-t/.7)*np.minimum(1,t/.03),.005,.15)
def s_crank():                      # starter motor: rrr-rrr-rrr
    out=np.zeros(int(2.2*SR))
    for k in range(3):
        d=.5;t=tt(d);x=square(46+k*3,d,.35)*.35*(0.6+0.4*np.sin(2*np.pi*17*t));x=fft_filter(x,None,500)+fft_filter(noise(d),100,700)*.2;x*=np.minimum(1,t/.04)*np.minimum(1,(d-t)/.1);j=int(k*.72*SR);out[j:j+len(x)]+=x
    return fade(out)
def s_engfail():                    # click-click-click (dead battery)
    out=np.zeros(int(1.6*SR))
    for k in range(4):
        c=fft_filter(noise(.05),700,5000)*env_ad(int(.05*SR),.0004,.01)*1.2+sine(180,.05)*env_ad(int(.05*SR),.0004,.012)*.5;j=int((k*.3+ (k>2)*.1)*SR);out[j:j+len(c)]+=c*(1-k*.12)
    return fade(out*.9)
def s_engstart():
    d=2.4;t=tt(d);cr=s_crank()[:int(1.0*SR)];x=np.zeros(int(d*SR));x[:len(cr)]=cr*.8
    rp=np.clip((t-.9)/.5,0,1);f=glide([30,70,38,34],d)*np.where(t>.9,1,0);body=fft_filter(voiced(np.maximum(f,1e-3),d,9),None,420)*.7*rp*(0.8+0.2*np.sin(2*np.pi*13*t))
    return fade(x+body*np.minimum(1,np.maximum(0,(d-t)/.4)),.005,.2)
def s_glass():
    d=1.2;t=tt(d);x=fft_filter(noise(d),2500,12000)*np.exp(-t/.09)*1.1
    for i in range(14):
        b=sine(rg.uniform(2400,6200),.18)*env_ad(int(.18*SR),.0005,.05);j=int(rg.uniform(.02,.7)*SR);x[j:j+len(b)]+=b*rg.uniform(.15,.4)
    return fade(x*.8,.001,.1)
def s_slap():                       # a hand slaps the window
    d=.35;t=tt(d);x=fft_filter(noise(d),200,1600)*env_ad(int(d*SR),.0004,.03)*1.2+sweep(150,70,d)*env_ad(int(d*SR),.001,.06)*.7+sine(1900,d)*env_ad(int(d*SR),.0005,.08)*.12;return fade(x*.9)
def s_clunk():
    d=.5;t=tt(d);x=sweep(120,60,d)*env_ad(int(d*SR),.001,.1)*.8+s_clank()[:int(d*SR)]*.6;return fade(x*.9)
def s_creak():
    d=1.4;t=tt(d);f=glide([260,310,240,360,280],d)*(1+.02*np.sin(2*np.pi*23*t));x=fft_filter(voiced(f,d,10),400,2200)*.35*np.sin(np.pi*t/d)**.6;x+=fft_filter(noise(d),800,3000)*.08;return fade(x,.05,.1)
def s_gurgle():
    d=1.3;t=tt(d);x=np.zeros(int(d*SR))
    for i in range(22):
        f=rg.uniform(220,520);b=sweep(f,f*rg.uniform(1.3,2),.07)*env_ad(int(.07*SR),.002,.03);j=int(rg.uniform(0,d-.1)*SR);x[j:j+len(b)]+=b*rg.uniform(.15,.35)
    return fade(x+fft_filter(noise(d),300,1800)*.06,.02,.1)
def s_boing():
    d=.7;t=tt(d);f=520*np.exp(-t*1.4)+180+60*np.sin(2*np.pi*14*t)*np.exp(-t*3);return fade(np.sin(np.cumsum(f)/SR*2*np.pi)*np.exp(-t/.28)*.6,.003,.05)
def s_rimshot():
    d=.7;t=tt(d);sn=snare(1.0)[:int(.2*SR)];tom=sweep(190,110,.25)*env_ad(int(.25*SR),.001,.08)*.8;cy=fft_filter(noise(d),5000,None)*np.exp(-t/.25)*.5
    x=np.zeros(int(d*SR));x[:len(sn)]+=sn*.8;j=int(.22*SR);x[j:j+len(tom)]+=tom;j=int(.46*SR);x[j:]+=cy[:len(x)-j];return fade(x*.8,.002,.1)
def s_stab():                       # horror string stab
    d=1.1;t=tt(d);x=sum(np.sin(2*np.pi*f*t+3*np.sin(2*np.pi*5*t)*.3) for f in(466,493,740,784,1245,1318))*.14;x+=fft_filter(noise(d),1500,7000)*.12*np.exp(-t/.1);return fade(x*np.exp(-t/.45)*np.minimum(1,t/.008),.002,.15)
def s_riser():
    d=2.2;t=tt(d);x=fft_filter(noise(d),300,8000)*(t/d)**2*.7+np.sin(np.cumsum(200*(1+6*(t/d)**2)/1)/SR*2*np.pi)*.18*(t/d);return fade(x*.8,.02,.05)
def s_swell():
    d=3.0;t=tt(d);x=sum(np.sin(2*np.pi*f*t) for f in(220,277,330,440))*.12*np.sin(np.pi*t/d)**2;x+=fft_filter(noise(d),200,2000)*.04*(t/d);return fade(x,.2,.3)
def s_gasp():
    d=.45;t=tt(d);x=fft_filter(noise(d),500,3500)*np.sin(np.pi*np.minimum(1,t/d)*.9)**1.5*.9;return fade(x,.02,.06)
def s_sigh():
    d=.9;t=tt(d);x=fft_filter(noise(d),300,2600)*np.sin(np.pi*t/d)**1.2*.5;return fade(x,.05,.15)
def s_heartbeat():
    out=np.zeros(int(1.8*SR))
    for k in range(2):
        for j,(f,g) in enumerate([(62,1),(50,.75)]):
            d=.22;x=sweep(f*1.4,f,d)*env_ad(int(d*SR),.002,.07)*g;i=int((k*.85+j*.16)*SR);out[i:i+len(x)]+=x*.9
    return fade(out*.9,.003,.05)
def s_snore():
    d=2.3;t=tt(d);inh=np.exp(-((t-.55)/.35)**2);exh=np.exp(-((t-1.45)/.4)**2)
    r=fft_filter(voiced(glide([62,50,58,46],d)*(1+.06*np.sin(2*np.pi*31*t)),d,9),None,500)*(inh*.7+exh*1.0)*(0.6+0.4*np.sin(2*np.pi*26*t))
    n_=fft_filter(noise(d),120,900)*(inh*.5+exh*.7);return fade((r+n_*.5)*.7,.05,.2)
def s_cluck():
    out=np.zeros(int(1.2*SR))
    for i,(t0,f0) in enumerate([(0,720),(.2,640),(.4,600),(.78,520)]):
        d=.11;t=tt(d);f=f0*np.exp(-t*3);x=formant(voiced(f,d,10),900,1700)*env_ad(int(d*SR),.003,.045)*.5;j=int(t0*SR);out[j:j+len(x)]+=x
    return fade(out*.9)
def s_meow():
    d=.75;t=tt(d);f=glide([420,820,900,620,480],d);x=voiced(f,d,12);x=(fft_filter(x,500,1400)+.6*fft_filter(x,1800,3400))*np.sin(np.pi*np.minimum(1,t/d))**.8;return fade(x*.5,.02,.08)
def s_baby():
    out=np.zeros(int(2.2*SR))
    for k in range(3):
        d=.6;t=tt(d);f=glide([480,690,640,520],d)*(1+.03*np.sin(2*np.pi*6*t));x=voiced(f,d,14);x=fft_filter(x,350,2600)*np.minimum(1,t/.04)*np.minimum(1,(d-t)/.12)*.5;j=int(k*.7*SR);out[j:j+len(x)]+=x
    return fade(out,.01,.1)
def s_horde():
    d=3.0;x=np.zeros(int(d*SR))
    for i in range(7):
        g=s_groan();g=g[:int(min(len(g),1.0*SR))]*rg.uniform(.3,.7);j=int(rg.uniform(0,2.0)*SR);x[j:j+len(g)]+=g[:len(x)-j]
    return fade(x*.8,.1,.3)
def s_ping():
    d=.5;t=tt(d);return fade((sine(1568,d)+.5*sine(2093,d))*np.exp(-t/.12)*.35,.002,.05)
def s_sneak():
    out=np.zeros(int(1.4*SR))
    for k in range(5):
        x=fft_filter(noise(.07),300,1800)*env_ad(int(.07*SR),.001,.02)*.8;j=int(k*.27*SR);out[j:j+len(x)]+=x
    return fade(out*.7)
def s_whisper():
    d=.8;t=tt(d);x=fft_filter(noise(d),2500,7500)*(0.5+0.5*np.sin(2*np.pi*3*t))*np.sin(np.pi*t/d)*.3;return fade(x)
def s_zip():
    d=.4;t=tt(d);x=sweep(500,2600,d,False)*.12*(0.6+0.4*np.sign(np.sin(2*np.pi*60*t)))+fft_filter(noise(d),2000,8000)*.1;return fade(x*np.minimum(1,t/.02),.005,.05)
def s_pour():
    d=1.6;t=tt(d);x=fft_filter(noise(d),700,5000)*(0.7+0.3*np.sin(2*np.pi*9*t))*.35*np.minimum(1,t/.1)*np.minimum(1,(d-t)/.2);return fade(x,.03,.1)
def s_ratchet():
    out=np.zeros(int(1.2*SR))
    for k in range(10):
        x=fft_filter(noise(.02),1200,7000)*env_ad(int(.02*SR),.0003,.005)*.8;j=int(k*.11*SR);out[j:j+len(x)]+=x
    return fade(out)
def s_bridge():
    d=3.2;t=tt(d);x=fft_filter(voiced(np.full_like(t,48)*(1+.05*np.sin(2*np.pi*3*t)),d,10),None,300)*.5+fft_filter(noise(d),100,900)*.15*(0.6+0.4*np.sin(2*np.pi*11*t));return fade(x*np.sin(np.pi*np.minimum(1,t/d))**.5,.15,.3)
def s_purr():
    d=1.4;t=tt(d);x=fft_filter(noise(d),30,300)*(0.5+0.5*np.sign(np.sin(2*np.pi*24*t)))*.4*np.sin(np.pi*t/d)**.5;return fade(x,.05,.15)
def s_lever():
    d=.5;x=s_clank()[:int(d*SR)]*.8+sweep(140,70,d)*env_ad(int(d*SR),.001,.1)*.6;return fade(x*.9)
def s_splat():
    d=.3;t=tt(d);x=fft_filter(noise(d),200,2500)*np.exp(-t/.06)+sweep(300,90,d)*np.exp(-t/.05)*.5;return fade(x*.8)
def s_cheer():
    d=1.2;x=np.zeros(int(d*SR))
    for i in range(8):
        f=rg.uniform(200,330);g=voiced(glide([f,f*1.25,f*1.1],.6),.6,10);g=fft_filter(g,400,3000)*np.sin(np.pi*tt(.6)/.6)*.2;j=int(rg.uniform(0,.5)*SR);x[j:j+len(g)]+=g
    return fade(x,.05,.2)
def s_rustle():
    d=1.4;n=np.random.RandomState(7).randn(int(d*SR));x=fft_filter(n,1800,7000)*(.5+.5*np.sin(2*np.pi*7*tt(d)))*np.sin(np.pi*tt(d)/d)*.35;return fade(x,.05,.3)
def s_cricket():
    d=1.6;x=np.zeros(int(d*SR))
    for k in range(6):
        for j in range(3):
            t0=int((k*.24+j*.045)*SR);n=int(.03*SR);w=np.sin(2*np.pi*4300*np.arange(n)/SR)*np.hanning(n)*.12;x[t0:t0+n]+=w[:max(0,len(x)-t0)]
    return fade(x,.02,.1)
def s_bell():
    d=1.8;t=tt(d);x=(np.sin(2*np.pi*880*t)+.6*np.sin(2*np.pi*1320*t)+.4*np.sin(2*np.pi*2110*t))*np.exp(-t*3.2)*.3;return fade(x,.005,.3)
def s_polka():
    d=3.0;x=np.zeros(int(d*SR));bpm=132;step=60/bpm
    for i in range(int(d/step)):
        t0=int(i*step*SR);n=int(.18*SR);tn=np.arange(n)/SR;f=[196,294][i%2]*(1 if i%4<2 else 1.122)
        w=(np.sign(np.sin(2*np.pi*f*tn))*.5+np.sin(2*np.pi*f*2*tn)*.3)*np.exp(-tn*14)*.25;x[t0:t0+n]+=w[:max(0,len(x)-t0)]
        if i%2==1:
            m=int(.1*SR);tm=np.arange(m)/SR;w2=(np.sign(np.sin(2*np.pi*392*tm))*.4+np.sin(2*np.pi*784*tm)*.3)*np.exp(-tm*18)*.2;x[t0:t0+m]+=w2[:max(0,len(x)-t0)]
    return fade(fft_filter(x,300,3400),.01,.1)
NEW={'rustle':s_rustle,'cricket':s_cricket,'bell':s_bell,'polka':s_polka,'chime':s_chime,'doorhiss':s_doorhiss,'horn':s_horn,'hornlong':s_hornlong,'brake':s_brake,'crank':s_crank,'engfail':s_engfail,'engstart':s_engstart,'glass':s_glass,'slap':s_slap,'clunk':s_clunk,'creak':s_creak,'gurgle':s_gurgle,
 'boing':s_boing,'rimshot':s_rimshot,'stab':s_stab,'riser':s_riser,'swell':s_swell,'gasp':s_gasp,'sigh':s_sigh,'heartbeat':s_heartbeat,'snore':s_snore,'cluck':s_cluck,'meow':s_meow,'baby':s_baby,'horde':s_horde,'ping':s_ping,
 'sneak':s_sneak,'whisper':s_whisper,'zip':s_zip,'pour':s_pour,'ratchet':s_ratchet,'bridge':s_bridge,'purr':s_purr,'lever':s_lever,'splat':s_splat,'cheer':s_cheer}
GN={'rustle':.7,'cricket':.6,'bell':.7,'polka':.9,'chime':.7,'doorhiss':.7,'horn':.6,'hornlong':.55,'brake':.45,'crank':.7,'engfail':.8,'engstart':.8,'glass':.6,'slap':.9,'clunk':.8,'creak':.5,'gurgle':.6,'boing':.7,'rimshot':.7,'stab':.65,'riser':.6,'swell':.7,'gasp':.6,'sigh':.6,
 'heartbeat':.95,'snore':.8,'cluck':.8,'meow':.8,'baby':.7,'horde':.8,'ping':.7,'sneak':.8,'whisper':.8,'zip':.7,'pour':.7,'ratchet':.7,'bridge':.7,'purr':.9,'lever':.8,'splat':.8,'cheer':.7}
A.SFX.update(NEW);A.GAIN.update(GN)
import foley_sfx   # foley library for data-driven worlds (registers itself into audio16.SFX)
# ------------------------------------------------------------------ moods that carry the engine
def engine(total,level=1.0):
    n=int(total*SR);t=np.arange(n)/SR;rpm=1+.03*np.sin(2*np.pi*t/7)+.015*np.sin(2*np.pi*t/2.3)
    ph=np.cumsum(46*rpm)/SR*2*np.pi;x=(np.sin(ph)+.5*np.sin(2*ph)+.3*np.sin(3*ph)+.2*np.sin(4.5*ph))*(0.82+0.18*np.sin(2*np.pi*11.5*rpm*t))
    x=fft_filter(x,None,380)*.6+fft_filter(rg.standard_normal(n),30,180)*.5*(0.7+0.3*np.sin(2*np.pi*3.1*t))
    return x*level
def gen_music9(total,moods):
    n=int(total*SR);new=[m for m in moods if m[2] in('idle','creep','comic','chase','sad')];old=[m for m in moods if m[2] not in('idle','creep','comic','chase','sad')]
    mix=A.gen_music(total,old) if old else np.zeros((2,n))
    ints={}
    for a,b,m in new:ints.setdefault(m,[]).append((a,b))
    if not new:return mix
    eng=engine(total,1.0);tt_=np.arange(n)/SR
    def gate(m,pad=.5):
        e=np.zeros(n)
        for a,b in ints.get(m,[]):
            i0,i1=int(max(0,a-.3)*SR),int(min(total,b+.3)*SR);seg=np.ones(i1-i0);r=int(pad*SR);seg[:r]=np.linspace(0,1,min(r,len(seg)));seg[-r:]=np.minimum(seg[-r:],np.linspace(1,0,min(r,len(seg))));e[i0:i1]=np.maximum(e[i0:i1],seg)
        return e
    tracks=np.zeros((2,n))
    for m,lvl in(('idle',.55),('creep',.6),('comic',.5),('chase',.5),('sad',.4)):
        if m in ints:
            g=gate(m);tracks[0]+=eng*g*lvl*.35;tracks[1]+=eng*g*lvl*.35
    # idle / sad : pads
    for m,ch,gain in(('idle',[[45,52,57],[43,50,55],[41,48,53],[43,50,59]],.11),('sad',[[45,52,60],[41,48,57],[43,50,59],[40,47,55]],.15)):
        for a,b in ints.get(m,[]):
            t=a;i=0
            while t<b+1:
                for nn_ in ch[i%4]:put(tracks,t,pad_note(midi(nn_),5.0,gain),pan=(nn_%3-1)*.3)
                t+=4.0;i+=1
            if m=='sad':
                t=a;j=0;arp=[57,60,64,60,55,59,62,59]
                while t<b:
                    put(tracks,t,pluck(midi(arp[j%8]+12),1.6,.20),pan=-.15);t+=.62;j+=1
    # creep : drone + heartbeat + sparse pings
    for a,b in ints.get('creep',[]):
        for f,g_ in((55,.5),(58.3,.35),(82.4,.15)):
            x=fft_filter(saw(f,b-a+1),None,240)*g_*.5;put(tracks,a,x*np.minimum(1,np.arange(len(x))/SR/.6))
        k=a
        while k<b:put(tracks,k,kick(.5));put(tracks,k+.24,kick(.32));k+=1.1
        k=a+1.0
        while k<b:put(tracks,k,sine(rg.choice([1760,2093,2349]),1.4)*np.exp(-tt(1.4)/.4)*.1,pan=rg.uniform(-.6,.6));k+=rg.uniform(3,5)
    # comic : pizzicato walking bass + clicks (E minor pentatonic), 100 bpm
    for a,b in ints.get('comic',[]):
        sp=60/100/2;k=a;i=0;line=[40,43,45,47,45,43,40,38];up=[64,67,69,71,74,71,69,67]
        while k<b:
            put(tracks,k,pluck(midi(line[i%8]+12),.5,.42));
            if i%2:put(tracks,k,pluck(midi(up[i%8]),.4,.14),pan=.25)
            if i%4==2:put(tracks,k,fft_filter(noise(.03),1500,6000)*env_ad(int(.03*SR),.0004,.008)*.5)
            k+=sp;i+=1
    # chase : 150 bpm kick/snare, saw stabs
    for a,b in ints.get('chase',[]):
        sp=60/150/4;k=a;s=0
        while k<b:
            if s%16 in(0,6,8,14):put(tracks,k,kick(.8))
            if s%16 in(4,12):put(tracks,k,snare(.6))
            put(tracks,k,hat(.14 if s%2 else .09),pan=.2)
            if s%16 in(0,3,6,10):put(tracks,k,fft_filter(saw(midi(52+(s//4)%3*3),sp*1.6),None,1800)*env_ad(int(sp*1.6*SR),.002,.1)*.22,pan=-.2)
            k+=sp;s+=1
    return mix+tracks
def main():
    out=sys.argv[1] if len(sys.argv)>1 else 'p9/part1'
    sp=json.load(open(f'{R}/{out}/spec.json'));total=sp['duration']+1.0
    moods=[tuple(m) for m in json.load(open(f'{R}/{out}/mood.json'))];ev=json.load(open(f'{R}/{out}/sfx.json'))
    if sp.get('world'):
        import score;mus=score.gen(total,sp,moods)      # data-driven worlds get their own score + room tone (no bus engine)
    else:mus=gen_music9(total,moods)
    n=int(total*SR);sfx=np.zeros((2,n));cache={}
    for e in ev:
        if e['k'] not in A.SFX:print('unknown sfx',e['k']);continue
        if e['k'] not in cache:cache[e['k']]=A.SFX[e['k']]()
        put(sfx,e['t'],cache[e['k']]*A.GAIN.get(e['k'],.8)*e.get('g',1.0),pan=e.get('pan',0))
    def wr(path,a):
        a=np.clip(a.T,-1,1);w=wave.open(path,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((a*32767).astype(np.int16).tobytes());w.close()
    nz=mus[mus!=0];mus=mus*(10**(-22/20)/np.sqrt(np.mean(nz**2)));mus=np.tanh(mus*1.2)/1.2
    sfx=np.tanh(sfx*1.1)/1.1
    wr(f'{R}/{out}/music.wav',mus);wr(f'{R}/{out}/sfx.wav',sfx)
    print('audio9: music peak',round(float(np.abs(mus).max()),2),'sfx peak',round(float(np.abs(sfx).max()),2),'events',len(ev),'kinds',len(cache))
if __name__=='__main__':main()
