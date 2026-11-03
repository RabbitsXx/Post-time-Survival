"""lowlib.py : THE PIG WAR (Post Time LowPoly): the real 1859 San Juan Island standoff told as faceted low-poly animation.  World 1280x720, window 450x800 (see lowpoly9.js).
 low(v,...)  garden | strait | camp | cabin      person/cuf/duo   as in farmlib      LowPart  one episode (the telegraph announces it; the dateline shows date + WAR METER)
 cast: lyman (American farmer, shot the pig) griffin (Irish herdsman, Hudson's Bay Co., owned the pig) pickett (US captain, 66 soldiers) baynes (British rear admiral, refuses to fight)   announcer: tele (the telegraph)"""
from zlib9 import *
NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten']
VOICES=dict(lyman=('en-US-Chirp3-HD-Charon',.95),griffin=('en-US-Chirp3-HD-Fenrir',1.0),pickett=('en-US-Chirp3-HD-Puck',1.08),baynes=('en-US-Chirp3-HD-Algenib',.9),tele=('en-US-Chirp3-HD-Enceladus',1.1))
FILT=dict(lyman='asetrate=44100*0.96,aresample=44100',griffin='asetrate=44100*1.02,aresample=44100',pickett='asetrate=44100*1.08,aresample=44100,volume=1.05',
 baynes='asetrate=44100*0.93,aresample=44100',tele='highpass=f=500,lowpass=f=3000,acompressor=threshold=-24dB:ratio=6,aecho=0.8:0.4:35:0.2,volume=1.25')
def _sp(label,fill,mono=False):return dict(label=label,fill=fill,stroke='#000' if not mono else '#10202e',mono=mono)
SPEAKERS=dict(lyman=_sp('LYMAN','#e8b36b'),griffin=_sp('GRIFFIN','#8fe0a8'),pickett=_sp('PICKETT','#8fb4ff'),baynes=_sp('BAYNES','#ff8f86'),tele=_sp('TELEGRAPH','#bfe4f4',True))
ALL_WORDS=True
NAMES_EN=dict(lyman='Lyman',griffin='Griffin',pickett='Pickett',baynes='Baynes',tele='Telegraph');NAMES_TH=dict(lyman='ไลแมน',griffin='กริฟฟิน',pickett='พิกเกตต์',baynes='เบย์นส์',tele='โทรเลข')
SC=dict(lyman=.92,griffin=.9,pickett=.8,baynes=.9)
FOOT=640
def person(who,expr='calm',x=640,y=FOOT,s=None,talk=False,pose='stand',**k):
    a=dict(k=who,view='front',pose=pose,expr=expr,x=x,y=y,s=s or SC[who],talk=who if talk else False,bob=1.1,ph=x*.011);a.update(k);return a
def low(v,acts=None,x=640,y=480,z=1.0,**p):
    p['v']=v;return stage('low',acts or [],**p),dict(x=x,y=y,z=z)
def _cy(z,hy,head):return head+(400-hy)/(z*1.045)
def cuf(who,expr,v='garden',x=640,z=1.9,hy=250,dx=0,extra=None,**p):
    s=SC[who];a=person(who,expr,x,FOOT,s,talk=True);head=FOOT-297*s
    return low(v,[a]+(extra or []),x=x+dx,y=_cy(z,hy,head),z=z,**p)
def duo(a,b,ea='calm',eb='calm',v='garden',xa=560,xb=730,z=1.45,hy=270,extra=None,**p):
    sa,sb=SC[a],SC[b];acts=[person(a,ea,xa,FOOT,sa,talk=True),person(b,eb,xb,FOOT,sb,talk=True)]+(extra or [])
    head=FOOT-297*(sa+sb)/2;return low(v,acts,x=(xa+xb)/2,y=_cy(z,hy,head),z=z,**p)
class LowPart(Script):
    """one episode of THE PIG WAR; the telegraph opens and closes it (series, part and topic said and shown); the dateline shows the date and the WAR METER"""
    def __init__(s,n,topic,date,place,of=3,series='THE PIG WAR',say='The Pig War',accent='#ffb3c1'):
        Script.__init__(s,f'{series} - PART {n}: {topic}',series,n,of,topic,accent);s.date=date;s.place=place;s.say=say
    def B(s,say,shot,fx=None,level=0.0,date=None,place=None,**k):
        fx=list(fx or [])
        if isinstance(shot,tuple):
            sc,view=shot;fx.append(dict(k='dateline',at=0,date=date or s.date,place=place or s.place,level=level));return s.beat(say,sc,view=view,fx=fx,**k)
        return s.beat(say,shot,fx=fx,**k)
    def tele_open(s,**k):
        return s.B([('tele',f"Post Time Lowpoly. {s.say}. Part {NUMW[s.part]} of {NUMW[s.of]}: {s.topic.lower()}.")],card('telegraph',mode='open',part=s.part,of=s.of,title=s.topic.upper()),mood='idle',sfx=[('radio',0)],**k)
    def tele_close(s,nxt=None,**k):
        if s.part<s.of:t=f"Part {NUMW[s.part]} of {NUMW[s.of]}, {s.say}. Next dispatch: {nxt.lower()}. Follow for part {NUMW[s.part+1]}.";c=card('telegraph',mode='close',part=s.part,of=s.of,next=(nxt or '').upper())
        else:t=f"Part {NUMW[s.of]} of {NUMW[s.of]}, the end of {s.say}. Follow for the next story.";c=card('lowend',part=s.part,of=s.of)
        return s.B([('tele',t)],c,mood='idle' if s.part<s.of else 'sad',nofade=s.part>=s.of,sfx=[('radio',0)],**k)
