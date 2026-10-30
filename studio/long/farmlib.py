"""farmlib.py : THE LAST HARVEST (a family farm: all-new world, all-new cast).  World 1280x720, window 450x800 (see locs9/farm9.js).
 farm(v,...)  yard | field | porch | barn      person(who,...)  a standing character      cuf(who,...)  close-up      duo(a,b,...)  two-shot      FarmPart  one episode (the farm radio announces it)
 cast: ruth (the grandmother) eli (12, inventor) junie (7, talks to the corn) hank (the hired hand, huge, gentle)   announcer: radio (Hollow Creek Farm Radio)"""
from zlib9 import *
from zlib9 import hz as _hz
import re
NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten']
VOICES=dict(ruth=('en-US-Chirp3-HD-Sulafat',.9),eli=('en-US-Chirp3-HD-Orus',1.0),junie=('en-US-Chirp3-HD-Aoede',1.0),hank=('en-US-Chirp3-HD-Alnilam',.88),radio=('en-US-Chirp3-HD-Enceladus',1.06))
FILT=dict(eli='asetrate=44100*1.13,aresample=44100,volume=1.05',junie='asetrate=44100*1.3,aresample=44100,volume=1.05',hank='asetrate=44100*0.95,aresample=44100',
 ruth='asetrate=44100*0.97,aresample=44100',radio='highpass=f=420,lowpass=f=3200,acompressor=threshold=-24dB:ratio=6,aecho=0.8:0.45:45:0.2,volume=1.25')
def _sp(label,fill,mono=False):return dict(label=label,fill=fill,stroke='#000' if not mono else '#2a1608',mono=mono)
SPEAKERS=dict(ruth=_sp('RUTH','#ffb36b'),eli=_sp('ELI','#8fe0a8'),junie=_sp('JUNIE','#ffd23a'),hank=_sp('HANK','#a6e07a'),radio=_sp('FARM RADIO','#f6e2a8',True))
ALL_WORDS=True
NAMES_EN=dict(ruth='Ruth',eli='Eli',junie='Junie',hank='Hank',radio='Radio');NAMES_TH=dict(ruth='รูธ',eli='เอลี',junie='จูนี่',hank='แฮงก์',radio='วิทยุ')
SC=dict(ruth=.86,eli=.74,junie=.6,hank=.98)
def hz(n,x0,x1,y=590,s=.9,**k):
    k.setdefault('human',True);return _hz(n,x0,x1,y=y,s=s,**k)
def lane(X,z):
    """2.5D lane (farm v='lane'): lateral offset X (world px at z=1), depth z (1 near .. 15 far) -> dict(x,y,s) for person()/prop()/hz"""
    return dict(x=640+X/z,y=398+(720-398)/z,s=1.0/z)
def at(who,X,z,expr='calm',**k):
    L=lane(X,z);return person(who,expr,L['x'],L['y'],SC[who]*1.0/z*1.5,**k)
def crowd(n,X0,X1,z0,z1,seed=3,**k):
    """n zombies spread in depth between z0 (near) and z1 (far) and laterally X0..X1"""
    out=[]
    for i in range(n):
        t=i/max(1,n-1);z=z0+(z1-z0)*((i*0.618)%1);X=X0+(X1-X0)*t;L=lane(X,z);out.append(hz(1,L['x'],L['x'],y=L['y'],s=2.7/z,seed=seed+i*7,jit=0,yj=0,**k))
    return sorted(out,key=lambda a:a['y'])
FOOT=640
def person(who,expr='calm',x=640,y=FOOT,s=None,talk=False,pose='stand',**k):
    a=dict(k=who,view='front',pose=pose,expr=expr,x=x,y=y,s=s or SC[who],talk=who if talk else False,bob=1.1,ph=x*.011,shadow=1,rim='rgba(255,190,120,.55)')
    if who=='hank':a['sx']=1.18
    a.update(k);return a
def farm(v,acts=None,x=640,y=480,z=1.0,**p):
    p['v']=v;return stage('farm',acts or [],**p),dict(x=x,y=y,z=z)
def _cy(z,hy,head):return head+(400-hy)/(z*1.045)
def cuf(who,expr,v='porch',x=640,z=1.9,hy=250,dx=0,extra=None,**p):
    """close-up on one standing person"""
    s=SC[who];a=person(who,expr,x,FOOT,s,talk=True);head=FOOT-297*s
    return farm(v,[a]+(extra or []),x=x+dx,y=_cy(z,hy,head),z=z,**p)
def duo(a,b,ea='calm',eb='calm',v='porch',xa=560,xb=730,z=1.45,hy=270,extra=None,**p):
    sa,sb=SC[a],SC[b];acts=[person(a,ea,xa,FOOT,sa,talk=True),person(b,eb,xb,FOOT,sb,talk=True)]+(extra or [])
    head=FOOT-297*(sa+sb)/2;return farm(v,acts,x=(xa+xb)/2,y=_cy(z,hy,head),z=z,**p)
def trio(ex=None,v='porch',z=1.1,hy=300,extra=None,order=('ruth','hank','eli','junie'),x0=470,gap=115,**p):
    ex=ex or {};acts=[person(w,ex.get(w,'calm'),x0+i*gap,FOOT,talk=True) for i,w in enumerate(order)]+(extra or [])
    return farm(v,acts,x=x0+gap*(len(order)-1)/2,y=_cy(z,hy,FOOT-297*.8),z=z,**p)
class FarmPart(Script):
    """one night of THE LAST HARVEST; the farm radio opens and closes it (standing rule: series, part and topic said out loud and shown), the night line shows the clock"""
    def __init__(s,n,topic,time,place,of=3,series='THE LAST HARVEST',say='The Last Harvest',accent='#ffcf6a'):
        Script.__init__(s,f'{series} - PART {n}: {topic}',series,n,of,topic,accent);s.time=time;s.place=place;s.say=say
    def B(s,say,shot,fx=None,time=None,place=None,**k):
        fx=list(fx or [])
        if isinstance(shot,tuple):
            sc,view=shot;fx.append(dict(k='nightline',at=0,stop=s.part,of=s.of,time=time or s.time,place=place or s.place));return s.beat(say,sc,view=view,fx=fx,**k)
        return s.beat(say,shot,fx=fx,**k)
    def radio_open(s,**k):
        return s.B([('radio',f"Evening, Hollow Creek. This is {s.say}. Part {NUMW[s.part]} of {NUMW[s.of]}: {s.topic.lower()}.")],card('radio',mode='open',part=s.part,of=s.of,title=s.topic.upper(),time=s.time),mood='idle',sfx=[('radio',0)],**k)
    def radio_close(s,nxt=None,**k):
        if s.part<s.of:t=f"Part {NUMW[s.part]} of {NUMW[s.of]}, {s.say}. Next night: {nxt.lower()}. Follow for part {NUMW[s.part+1]}.";c=card('radio',mode='close',part=s.part,of=s.of,next=(nxt or '').upper(),time=s.time)
        else:t=f"Part {NUMW[s.of]} of {NUMW[s.of]}, the end of {s.say}. Follow for the next series.";c=card('farmend',part=s.part,of=s.of)
        return s.B([('radio',t)],c,mood='idle' if s.part<s.of else 'sad',nofade=s.part>=s.of,sfx=[('radio',0)],**k)
