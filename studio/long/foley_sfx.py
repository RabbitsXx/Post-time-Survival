"""foley_sfx.py : synthesized foley for the data-driven worlds (registered into audio16.SFX by audio9).  Variants _a/_b/_c exist for repeated sounds (footsteps never repeat identically)."""
import numpy as np
import audio16 as A
from audio16 import tt,noise,fft_filter,env_ad,fade,sine,sweep,saw,square,SR
def _rs(seed):return np.random.RandomState(seed)
def _n(d,r):return r.randn(int(d*SR))
def step(surface,seed,run=False):
    r=_rs(seed);d=.16;n=int(d*SR);t=np.arange(n)/SR;j=1+.12*(r.rand()-.5)
    if surface=='tile':x=fft_filter(_n(d,r),1800*j,6500)*np.exp(-t/.018)*.55+sweep(120*j,60,d)*np.exp(-t/.035)*.55
    elif surface=='stair':x=fft_filter(_n(d,r),700*j,3200)*np.exp(-t/.03)*.5+sweep(170*j,85,d)*np.exp(-t/.05)*.7+sine(330*j,d)*np.exp(-t/.06)*.12   # hollow concrete / metal nosing
    elif surface=='gravel':x=fft_filter(_n(d,r),500,5000)*(np.exp(-t/.05)*.5)*(0.6+0.4*np.sign(np.sin(2*np.pi*70*t*j)))+sweep(90,55,d)*np.exp(-t/.04)*.35
    elif surface=='wood':x=fft_filter(_n(d,r),400*j,2400)*np.exp(-t/.025)*.5+sweep(140*j,70,d)*np.exp(-t/.05)*.65
    else:x=fft_filter(_n(d,r),600,3000)*np.exp(-t/.03)*.5
    if run:x=x*1.35
    return fade(x*.9,.0005,.03)
def shuffle(seed):                          # zombie foot drag
    r=_rs(seed);d=.45;t=tt(d);x=fft_filter(_n(d,r),250,1800)*np.exp(-((t-.12)/.12)**2)*.5+fft_filter(_n(d,r),80,400)*np.exp(-((t-.3)/.1)**2)*.35
    return fade(x,.01,.1)
def grunt():                                # short low effort sound ("hnh")
    d=.38;t=tt(d);f=135-30*t/d;ph=np.cumsum(f)/SR*2*np.pi;x=sum(np.sin(h*ph)/h for h in range(1,9));x=fft_filter(x,120,1200)*np.exp(-((t-.12)/.14)**2)*.5+fft_filter(noise(d),300,1500)*np.exp(-((t-.1)/.1)**2)*.12
    return fade(x,.01,.08)
def scrape():                               # heavy object dragged on concrete
    d=.9;t=tt(d);x=fft_filter(noise(d),120,1200)*(0.55+0.45*np.sin(2*np.pi*9*t))*np.minimum(1,t/.05)*np.minimum(1,(d-t)/.15)*.55+sweep(70,55,d)*.25
    return fade(x,.02,.1)
def keys():
    d=.9;x=np.zeros(int(d*SR));r=_rs(3)
    for i in range(11):
        f=r.uniform(2800,5200);b=sine(f,.16)*np.exp(-tt(.16)/.04)*.4+sine(f*2.31,.16)*np.exp(-tt(.16)/.025)*.2;j=int(r.uniform(0,.6)*SR);x[j:j+len(b)]+=b[:len(x)-j]
    return fade(x*.8,.002,.1)
def clang():
    d=1.1;t=tt(d);x=(sine(520,d)+.7*sine(1180,d)+.5*sine(1810,d)+.3*sine(2650,d))*np.exp(-t/.28)*.4+fft_filter(noise(d),2500,9000)*np.exp(-t/.02)*.5
    return fade(x,.0005,.1)
def rattle():
    d=.6;x=np.zeros(int(d*SR));r=_rs(5)
    for i in range(9):
        b=fft_filter(r.randn(int(.03*SR)),1500,7000)*np.exp(-tt(.03)/.008)*.5+sine(r.uniform(900,2200),.03)*np.exp(-tt(.03)/.01)*.2;j=int(r.uniform(0,d-.05)*SR);x[j:j+len(b)]+=b
    return fade(x,.003,.05)
def squawk():
    d=.55;t=tt(d);f=glide=1700*np.exp(-t*1.2)+700+160*np.sin(2*np.pi*38*t);ph=np.cumsum(f)/SR*2*np.pi;x=sum(np.sin(h*ph)/h**.7 for h in range(1,8));x=fft_filter(x,600,5200)*np.exp(-((t-.15)/.2)**2)*.55
    return fade(x,.004,.1)
def paper():
    d=.35;t=tt(d);x=fft_filter(noise(d),1500,8000)*np.exp(-((t-.1)/.08)**2)*.35+fft_filter(noise(d),300,900)*np.exp(-t/.05)*.2
    return fade(x,.004,.08)
def glass_thump():
    d=.4;t=tt(d);x=sweep(190,90,d)*np.exp(-t/.07)*.7+fft_filter(noise(d),700,4500)*np.exp(-t/.03)*.5+sine(2100,d)*np.exp(-t/.05)*.1
    return fade(x,.0008,.06)
def flash_ting():
    d=.7;t=tt(d);x=(sine(2637,d)+.5*sine(3951,d)+.3*sine(5274,d))*np.exp(-t/.16)*.35
    return fade(x,.001,.1)
def lock_chain():
    d=.9;x=np.zeros(int(d*SR));r=_rs(11)
    for i in range(7):
        b=fft_filter(r.randn(int(.05*SR)),1200,6500)*np.exp(-tt(.05)/.012)*.55+sine(r.uniform(1400,2600),.05)*np.exp(-tt(.05)/.02)*.2;j=int((.08*i+r.uniform(0,.03))*SR);x[j:j+len(b)]+=b
    c=fft_filter(noise(.06),700,5000)*np.exp(-tt(.06)/.012)*.9+sweep(260,110,.09)[:int(.06*SR)]*.6;j=int(.62*SR);x[j:j+len(c)]+=c
    return fade(x*.9,.002,.1)
def elev_door():
    d=1.3;t=tt(d);x=fft_filter(noise(d),200,1500)*np.sin(np.pi*np.minimum(1,t/1.0))**1.2*.3+sweep(110,70,.15)[:len(t)].mean()*0
    th=sweep(95,45,.2)*np.exp(-tt(.2)/.06)*.7;j=int(.95*SR);x[j:j+len(th)]+=th[:len(x)-j]
    return fade(x,.03,.1)
def thud_wood():
    d=.5;t=tt(d);x=sweep(120,45,d)*np.exp(-t/.09)*.9+fft_filter(noise(d),150,1200)*np.exp(-t/.03)*.6+sine(230,d)*np.exp(-t/.05)*.2
    return fade(x,.001,.08)
def sofa_fall():
    d=1.0;t=tt(d);x=fft_filter(noise(d),120,1600)*(0.4+0.6*np.sin(2*np.pi*11*t)**2)*np.minimum(1,t/.05)*.4;x+=sweep(160,60,d)*.2
    return fade(x,.02,.1)
def hit():
    d=.25;t=tt(d);x=fft_filter(noise(d),200,2500)*np.exp(-t/.035)*.8+sweep(140,60,d)*np.exp(-t/.05)*.7
    return fade(x,.0005,.04)
def register():
    for surf in('tile','stair','gravel','wood'):
        for v,seed in zip('abc',(1,2,3)):
            A.SFX[f'step_{surf}_{v}']=(lambda s=surf,sd=seed:step(s,sd));A.GAIN[f'step_{surf}_{v}']=.55
            A.SFX[f'run_{surf}_{v}']=(lambda s=surf,sd=seed+10:step(s,sd,True));A.GAIN[f'run_{surf}_{v}']=.65
    for v,seed in zip('abc',(4,5,6)):A.SFX[f'shuffle_{v}']=(lambda sd=seed:shuffle(sd));A.GAIN[f'shuffle_{v}']=.5
    for k,f,g in(('grunt',grunt,.7),('scrape',scrape,.6),('keys',keys,.55),('clang',clang,.6),('rattle',rattle,.5),('squawk',squawk,.7),('paper',paper,.6),('glass_thump',glass_thump,.8),('flash_ting',flash_ting,.5),('lock_chain',lock_chain,.65),('elev_door',elev_door,.6),('thud_wood',thud_wood,.9),('sofa_fall',sofa_fall,.6),('hit',hit,.8)):
        A.SFX[k]=f;A.GAIN[k]=g
register()
