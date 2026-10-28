#!/usr/bin/env python3
"""music2.py N -> ser/pN/music.wav : generic dark bed + scene-driven textures, built from the spec."""
import sys,json,numpy as np,wave
import os
N=int(sys.argv[1]);R=os.path.join(os.path.dirname(os.path.abspath(__file__)),f'p{N}')
spec=json.load(open(f'{R}/spec.json'));B=spec['beats'];SR=44100;D=60.0;n=int(D*SR);t=np.arange(n)/SR
rng=np.random.default_rng(N*7+3);L=np.zeros(n);Rr=np.zeros(n)
def noise(m,lo,hi):
    x=np.fft.rfft(rng.standard_normal(m));f=np.linspace(0,1,len(x));x*=((f>=lo)&(f<=hi));y=np.fft.irfft(x,m);return y/(np.abs(y).max()+1e-9)
def put(sig,at,g=1.0,pan=0.0):
    i=int(at*SR)
    if i<0 or i>=n:return
    j=min(n,i+len(sig));s=sig[:j-i]*g;L[i:j]+=s*(1-max(0,pan));Rr[i:j]+=s*(1+min(0,pan))
def env(m,a=.05,r=.1):
    e=np.ones(m);ai,ri=int(a*SR),int(r*SR);e[:ai]=np.linspace(0,1,min(ai,m));e[-ri:]=np.linspace(1,0,min(ri,m));return e
end=B[-1]['t'][0];tens=np.interp(t,[0,15,30,45,end,60],[.09,.11,.13,.17,.22,.15])
pad=(.5*np.sin(2*np.pi*55*t)+.3*np.sin(2*np.pi*82.4*t+.4)+.2*np.sin(2*np.pi*110.3*t))*(.7+.3*np.sin(2*np.pi*t/7))
dis=(np.sin(2*np.pi*58.3*t)*.3+np.sin(2*np.pi*77.8*t)*.2)*np.clip((t-30)/10,0,1)*(.6+.4*np.sin(2*np.pi*t*5.5))
d=(pad+dis)*tens;L+=d;Rr+=d*.5+d*.5*np.cos(t*.3)
def ping(at,g=.16):
    m=int(.4*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*1500*tt)*np.exp(-tt*9),at,g);put(np.sin(2*np.pi*750*tt)*np.exp(-tt*6),at,g*.4)
def tick(at,g=.25):
    m=int(.03*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*2200*tt)*np.exp(-tt*120),at,g)
def bed(a,b,lo,hi,g,lfo=.3):
    m=int((b-a)*SR)
    if m<=0:return
    s=noise(m,lo,hi)*env(m,.3,.4)*(0.7+0.3*np.sin(2*np.pi*lfo*np.arange(m)/SR));put(s,a,g)
def groan(at,f0,dur,g):
    m=int(dur*SR);tt=np.arange(m)/SR;f=f0*(1-.25*tt/dur)+6*np.sin(2*np.pi*5*tt);ph=2*np.pi*np.cumsum(f)/SR
    saw=(2*((ph/(2*np.pi))%1)-1);b=saw*.6+noise(m,.01,.12)*.5;put(b*np.sin(np.pi*tt/dur)**1.5,at,g,rng.uniform(-.6,.6))
for i,b in enumerate(B):
    a,e=b['t'];sc=b.get('scene',{}).get('n');p=b.get('scene',{}).get('p',{})
    if sc in('lhWide','sea','boat','dock','tide'):bed(a,e,.0,.06,.07 if not p.get('storm') else .12,.4)
    if sc=='lhWide' and p.get('time')=='storm' or sc=='sea' and p.get('kind')=='storm' or sc=='ledge':
        bed(a,e,.02,.2,.10,.7)
        for k in np.arange(a+.2,e,1.3):put(noise(int(.7*SR),.0,.08)*np.hanning(int(.7*SR)),k,.12)
    if sc=='radar':
        for k in np.arange(a,e,1.2):ping(k)
    if sc=='timer' or sc=='card' and p.get('kind') in('fuel','meds','supplies','count'):
        for k in np.arange(a,e,1/(1 if sc=='timer' else 12)):tick(k,.22 if sc=='timer' else .12)
    if sc=='crowd' or sc=='fire':
        if p.get('eyes',1):
            for k in np.arange(a+.2,e,1.5):groan(k,rng.uniform(70,110),1.2,.14)
    if sc=='fire' or (sc=='lhWide' and p.get('fire')):
        for k in np.arange(a,e,.07):
            if rng.random()<.5:
                m=int(rng.uniform(.004,.02)*SR);put(rng.standard_normal(m)*np.exp(-np.arange(m)/m*6),k,.06,rng.uniform(-.8,.8))
    if sc=='lampClose' and p.get('state') in('on','manual','backup'):
        mm=int((e-a)*SR);put(np.sin(2*np.pi*60*np.arange(mm)/SR)*env(mm,.1,.1),a,.1)
    if sc=='dark':put(noise(int((e-a)*SR),.0,.04)*env(int((e-a)*SR),.1,.2),a,.1)
# heartbeat in the last third, growing; riser into the end card
for k in np.arange(end-24,end,0.9):
    for dd,g in [(0,.30),(.2,.2)]:
        m=int(.3*SR);tt=np.arange(m)/SR;ph=2*np.pi*np.cumsum(90*np.exp(-tt*14)+42)/SR
        put(np.sin(ph)*np.exp(-tt*10),k+dd,g*(0.5+0.9*np.clip((k-(end-24))/24,0,1)))
m=int(min(1.6,D-end)*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*np.cumsum(90*np.exp(-tt*3)+34)/SR)*np.exp(-tt*1.1),end,.6)
fade=np.minimum(1,np.minimum(t/.3,(D-t)/.5));L*=fade;Rr*=fade
x=np.stack([L,Rr],1);x=x/(np.abs(x).max()+1e-9)*.9
w=wave.open(f'{R}/music.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype('<i2').tobytes());w.close();print('music ok',N)
