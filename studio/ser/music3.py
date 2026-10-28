#!/usr/bin/env python3
"""music3.py N -> ser/pN/music.wav  (THE LAST SUNRISE bed: cold minor pad, wind, bubbling spring, hopeful plinks; Part 5 swells into major)"""
import sys,json,numpy as np,wave
import os
N=int(sys.argv[1]);R=os.path.join(os.path.dirname(os.path.abspath(__file__)),f'p{N}')
spec=json.load(open(f'{R}/spec.json'));B=spec['beats'];SR=44100;D=60.0;n=int(D*SR);t=np.arange(n)/SR
rng=np.random.default_rng(N*11+5);L=np.zeros(n);Rr=np.zeros(n)
def noise(m,lo,hi):
    x=np.fft.rfft(rng.standard_normal(m));f=np.linspace(0,1,len(x));x*=((f>=lo)&(f<=hi));y=np.fft.irfft(x,m);return y/(np.abs(y).max()+1e-9)
def put(sig,at,g=1.0,pan=0.0):
    i=int(at*SR)
    if i<0 or i>=n:return
    j=min(n,i+len(sig));s=sig[:j-i]*g;L[i:j]+=s*(1-max(0,pan));Rr[i:j]+=s*(1+min(0,pan))
def env(m,a=.05,r=.1):
    e=np.ones(m);ai,ri=int(a*SR),int(r*SR);e[:ai]=np.linspace(0,1,min(ai,m));e[-ri:]=np.linspace(1,0,min(ri,m));return e
end=B[-1]['t'][0]
final=(N==15)
# pad: A minor (A1 E2 C3), swelling; in the finale it brightens to A major (C#3) + an octave shimmer
lfo=.7+.3*np.sin(2*np.pi*t/9)
minor=(.5*np.sin(2*np.pi*55*t)+.34*np.sin(2*np.pi*82.41*t+.4)+.26*np.sin(2*np.pi*130.81*t+1.1))*lfo
major=(.5*np.sin(2*np.pi*55*t)+.34*np.sin(2*np.pi*82.41*t+.4)+.3*np.sin(2*np.pi*138.59*t+.8)+.18*np.sin(2*np.pi*220*t)+.12*np.sin(2*np.pi*277.18*t))*lfo
tens=np.interp(t,[0,15,30,45,end,60],[.10,.11,.12,.14,.16,.12])
if final:
    k=np.clip((t-(end-16))/10,0,1);pad=minor*(1-k)+major*k;tens=np.interp(t,[0,20,40,end-12,end,60],[.09,.10,.12,.15,.26,.14])
else:pad=minor
d=pad*tens;L+=d;Rr+=d*.5+d*.5*np.cos(t*.3)
def tick(at,g=.2,f=2200):
    m=int(.03*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*f*tt)*np.exp(-tt*120),at,g)
def plink(at,f,g=.12):
    m=int(.9*SR);tt=np.arange(m)/SR;put((np.sin(2*np.pi*f*tt)+.3*np.sin(2*np.pi*2*f*tt))*np.exp(-tt*4.5),at,g,rng.uniform(-.5,.5))
def bed(a,b,lo,hi,g,lfo_=.3):
    m=int((b-a)*SR)
    if m<=0:return
    s=noise(m,lo,hi)*env(m,.3,.4)*(0.7+0.3*np.sin(2*np.pi*lfo_*np.arange(m)/SR));put(s,a,g)
def bubble(at,g=.05):
    m=int(.12*SR);tt=np.arange(m)/SR;f=rng.uniform(300,700);put(np.sin(2*np.pi*(f+900*tt)*tt)*np.exp(-tt*28),at,g,rng.uniform(-.8,.8))
PENT=[220,247,277.2,329.6,370]
for b in B:
    a,e=b['t'];sc=b.get('scene',{}).get('n');p=b.get('scene',{}).get('p',{});kd=p.get('kind')
    if sc in('trek',):bed(a,e,.0,.09,.13 if p.get('mode')!='steam' else .09,.5)
    if sc in('town','sunSky','valley') or (sc=='thermo' and kd=='outside'):bed(a,e,.0,.06,.07,.3)
    if sc=='spaceViz':
        m=int((e-a)*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*np.cumsum(70+40*tt/(e-a))/SR)*env(m,.3,.4),a,.10)
    if sc in('spring',) or (sc=='trek' and p.get('mode')=='steam'):
        for k in np.arange(a+.1,e,.18):
            if rng.random()<.55:bubble(k)
        bed(a,e,.0,.04,.06,.2)
    if sc=='garden':
        lm=p.get('lamps','on')
        if lm in('on','blaze','ramp') or p.get('dawn') is not None:
            for k in np.arange(a+.2,e,.55):plink(k,PENT[int(rng.integers(0,5))]*(2 if final else 1),.10 if final else .07)
        if lm=='dim':
            for k in np.arange(a,e,.9):tick(k,.12,1100)
        if lm=='blaze':
            m=int(min(1.8,e-a)*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*np.cumsum(180+500*tt/1.8)/SR)*np.exp(-tt*.9),a,.10)
    if sc=='thermo' or (sc=='scard' and kd in('meter','foodgap')):
        for k in np.arange(a,e,.25):tick(k,.08)
    if sc=='scard' and kd=='count':
        for i in range(3):tick(a+i*.72,.35,1500)
        m=int(.5*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*80*tt)*np.exp(-tt*5),a+3*.72,.55)
    if sc=='sobj' and kd=='sensor':
        for k in np.arange(a+.3,e,.5):tick(k,.22,3000)
    if sc=='sobj' and kd=='vent' and p.get('burst'):
        m=int(1.8*SR);bed(a+.15,a+1.9,.01,.25,.35,.2)
    if sc=='sobj' and kd=='turbine':
        for k in np.arange(a,e,.12 if p.get('fast') else (.5 if p.get('slow') else .22)):tick(k,.07,420)
# gentle pulse that builds, then a riser into the end card
if not final:
    for k in np.arange(end-22,end,1.0):
        m=int(.3*SR);tt=np.arange(m)/SR;ph=2*np.pi*np.cumsum(90*np.exp(-tt*14)+42)/SR
        put(np.sin(ph)*np.exp(-tt*10),k,.18*(0.5+0.9*np.clip((k-(end-22))/22,0,1)))
m=int(min(1.6,D-end)*SR);tt=np.arange(m)/SR;put(np.sin(2*np.pi*np.cumsum(90*np.exp(-tt*3)+34)/SR)*np.exp(-tt*1.1),end,.5 if not final else .4)
fade=np.minimum(1,np.minimum(t/.3,(D-t)/.5));L*=fade;Rr*=fade
x=np.stack([L,Rr],1);x=x/(np.abs(x).max()+1e-9)*.9
w=wave.open(f'{R}/music.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype('<i2').tobytes());w.close();print('music ok',N)
