"""buslib.py : shot vocabulary of THE LAST BUS (on top of zlib9).  World 1280x720, window 450x800, bench along the far wall, driver's cab at the right end.
 bus(view_x, ...)        inside, wide / medium / close-up by view.z       ext(...)  outside      pov(...)  through the windshield
 crew(...)               the 11 passengers seated on the bench with default expressions (override per beat)"""
from zlib9 import *
SEATX={'benny':100,'amara':198,'lena':296,'park':394,'vic':492,'june':590,'dante':688,'marcus':786,'walt':884,'teddy':982,'priya':1064}
SC={'rosa':.84,'walt':.82,'benny':.86,'amara':.82,'lena':.78,'park':.82,'vic':.82,'june':.74,'marcus':.88,'dante':.82,'teddy':.64,'priya':.82}
SX={'marcus':1.22}
DEF={'rosa':'tired','walt':'sleep','benny':'worried','amara':'tired','lena':'deadpan','park':'worried','vic':'grin','june':'smug','marcus':'scared','dante':'smug','teddy':'smile','priya':'calm'}
BH=548
NAMES=dict(rosa='ROSA',priya='PRIYA',marcus='MARCUS',teddy='TEDDY',june='JUNE',vic='VIC',lena='LENA',benny='BENNY',park='MR. PARK',dante='DANTE',amara='AMARA',walt='WALT',bus='BUS-E',steve='STEVE',slim='SLIM',dex='COACH DEX',maya='MAYA')
def pax(who,expr=None,talk=False,**k):
    s=SC[who];y=BH+140*s+k.pop('dy',0)
    if who=='teddy':y=634
    a=dict(k=who,view='front',pose=k.pop('pose','stand'),expr=expr or DEF[who],x=k.pop('x',SEATX.get(who,1064)),y=y,s=s,talk=who if talk else False,bob=1.1,ph=SEATX.get(who,1064)*.013)
    if who in SX:a['sx']=SX[who]
    if k.pop('stand',False):a.update(layer='near',y=776,s=SC[who]*1.2,x=a['x'])
    if who=='walt':a['snore']=True
    a.update(k);return a
def crew(ex=None,talk=None,only=None,skip=(),**over):
    """the seated passengers.  ex={'dante':'angry'}  talk='dante' or ['dante','june']  only=[...]  over={'park':dict(sweat=1)}"""
    ex=ex or {};tk=list(SEATX) if talk is True else ([talk] if isinstance(talk,str) else (talk or []))
    out=[]
    for w in (only or SEATX):
        if w in skip:continue
        o=dict(over.get(w,{}));e=o.pop('expr',ex.get(w));out.append(pax(w,e,talk=w in tk,**o))
    return out
def rosa(expr='calm',talk=False,sweat=0,red=0,wound=False,pale=0,x=1196,**k):
    a=dict(k='rosa',view='side',pose='hold',expr=expr,x=x,y=664,s=.84,talk='rosa' if talk else False,sweat=sweat,red=red,pale=pale,wound=wound,bob=1.0);a.update(k);return a
def wheel(x=1262,y=560):return prop('wheel',x,y,1)
def bus(x,acts=None,z=1.0,y=540,out='city',**p):
    """inside the bus; x = window centre in the world (about 100..1300), z = zoom"""
    p.update(out=out);return stage('bus',acts or [],tag=p.pop('tag',None),**p),dict(x=x,y=y,z=z)
def ext(v='road',acts=None,x=640,y=540,z=1.0,**p):
    p['v']=v;return stage('ext',acts or [],**p),dict(x=x,y=y,z=z)
def pov(v='road',acts=None,x=640,y=420,z=1.0,**p):
    p['v']=v;return stage('pov',acts or [],**p),dict(x=x,y=y,z=z)

# ---------------- voices (Google Chirp3-HD), filters, caption colours ----------------
VOICES=dict(raider=('en-US-Chirp3-HD-Iapetus',1.0),benny2=('en-US-Chirp3-HD-Sadachbia',1.0),rosa=('en-US-Chirp3-HD-Gacrux',.95),priya=('en-US-Chirp3-HD-Kore',1.0),marcus=('en-US-Chirp3-HD-Charon',1.0),teddy=('en-US-Chirp3-HD-Puck',1.0),
 june=('en-US-Chirp3-HD-Vindemiatrix',.92),vic=('en-US-Chirp3-HD-Achird',1.06),lena=('en-US-Chirp3-HD-Callirrhoe',.95),benny=('en-US-Chirp3-HD-Sadachbia',1.0),
 park=('en-US-Chirp3-HD-Rasalgethi',.95),dante=('en-US-Chirp3-HD-Algieba',1.0),amara=('en-US-Chirp3-HD-Erinome',.95),walt=('en-US-Chirp3-HD-Sadaltager',.8),
 bus=('en-US-Chirp3-HD-Pulcherrima',1.06),buswh=('en-US-Chirp3-HD-Pulcherrima',.9),steve=('en-US-Chirp3-HD-Umbriel',.75),slim=('en-US-Chirp3-HD-Zubenelgenubi',.9),radio=('en-US-Chirp3-HD-Schedar',.95),
 dex=('en-US-Chirp3-HD-Fenrir',1.0),maya=('en-US-Chirp3-HD-Leda',1.0))
FILT=dict(buswh='highpass=f=700,lowpass=f=3600,aecho=0.8:0.5:60:0.3,volume=.5',bus='highpass=f=380,lowpass=f=3600,aecho=0.8:0.55:38:0.28,volume=1.1',teddy='asetrate=44100*1.26,aresample=44100,volume=1.05',
 benny='lowpass=f=1500,highpass=f=160,volume=1.5',radio='highpass=f=450,lowpass=f=3000,acompressor=threshold=-24dB:ratio=6,volume=1.3',
 walt='asetrate=44100*0.94,aresample=44100',steve='asetrate=44100*0.80,aresample=44100,lowpass=f=2600,volume=1.1')
def _sp(label,fill,mono=False):return dict(label=label,fill=fill,stroke='#000' if not mono else '#02170c',mono=mono)
SPEAKERS=dict(rosa=_sp('ROSA','#ffb36b'),priya=_sp('PRIYA','#7ff0e0'),marcus=_sp('MARCUS','#a6e07a'),teddy=_sp('TEDDY','#8ce0ff'),june=_sp('JUNE','#d9b3ff'),vic=_sp('VIC','#ff8a80'),
 lena=_sp('LENA','#ff9bf0'),benny=_sp('BENNY','#ffffff'),benny2=_sp('BENNY','#ffffff'),raider=_sp('RAIDER','#ffa070'),park=_sp('MR. PARK','#a0c4ff'),dante=_sp('DANTE','#d4e157'),amara=_sp('AMARA','#ff9ec7'),walt=_sp('WALT','#e0c0a0'),
 bus=_sp('BUS-E','#7dffb0',True),buswh=_sp('BUS-E (whisper)','#7dffb0',True),steve=_sp('STEVE','#d9f5c4'),slim=_sp('SLIM','#ff6b5a'),radio=_sp('RADIO','#ffe066'),dex=_sp('COACH DEX','#ffd23a'),maya=_sp('MAYA','#ffe3f1'))
ALL_WORDS=True
NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']

class Part(Script):
    """one episode: P=Part(3,'THE LAST DROP','10:02 PM','GHOST GAS STATION');  P.B(say,shot,fx=[],sfx=[],...)  shot = bus()/ext()/pov() tuple or a card() dict.
    Every non-card beat gets the route line (stop n of 10, clock, place) - the part number is always on screen."""
    def __init__(s,n,topic,time,place,series='THE LAST BUS',of=10,say=None,accent='#ffb020'):
        """series = the name shown on screen (an arc of the bus universe may be 'THE LAST BUS: ROUTE 12'); say = how BUS-E says it ('the Last Bus, Route twelve'); of = number of parts in this arc"""
        Script.__init__(s,f'{series} - PART {n}: {topic}',series,n,of,topic,accent);s.time=time;s.place=place;s.say=say or ('the Last Bus' if series=='THE LAST BUS' else series.title())
    def pa_open(s,extra=None,**k):
        """BUS-E opens every part: series name + part n of N + topic (standing rule: said out loud within 8 s, and the same words are on the card)"""
        return s.B([('bus',f"Ding dong! This is {s.say}. Part {NUMW[s.part]} of {NUMW[s.of]}: {s.topic.lower()}.")],card('pa',mode='open',part=s.part,of=s.of,title=s.topic.upper(),time=s.time),mood='idle',sfx=[('chime',0)],**k)
    def pa_close(s,nxt=None,quip='',**k):
        """BUS-E signs off: series + part + next stop + follow (the last part of an arc says: follow for the next series)"""
        if s.part<s.of:t=f"Part {NUMW[s.part]} of {NUMW[s.of]}, {s.say}. Next: {nxt.lower()}. Follow for part {NUMW[s.part+1]}. {quip}".strip();c=card('pa',mode='close',part=s.part,of=s.of,next=(nxt or '').upper(),time=s.time)
        else:t=f"Part {NUMW[s.of]} of {NUMW[s.of]}, the end of {s.say}. Follow for the next series.";c=card('finale')
        return s.B([('bus',t)],c,mood='idle' if s.part<s.of else 'sad',nofade=s.part>=s.of,sfx=[('chime',0)],**k)
    def B(s,say,shot,fx=None,time=None,place=None,**k):
        fx=list(fx or [])
        if isinstance(shot,tuple):
            sc,view=shot;fx.append(dict(k='route',at=0,stop=s.part,of=s.of,time=time or s.time,place=place or s.place));return s.beat(say,sc,view=view,fx=fx,**k)
        return s.beat(say,shot,fx=fx,**k)

# ---------------- shot helpers ----------------
HEAD_Y=419     # world y of a seated passenger's head centre (s=.82)
def _cy(z,hy=250,head=HEAD_Y):return head+(400-hy)/(z*1.045)   # window centre y so that the head sits at window y=hy
def seatx(who):return SEATX[who]
def cu(who,expr=None,z=1.9,hy=250,out='road',extra=None,dx=0,ex=None,L=None,**over):
    """close-up on a seated passenger (neighbours show at the edges).  every actor lip-syncs only while its own voice speaks"""
    head=HEAD_Y if who!='teddy' else 470
    ex=dict(ex or {});
    if expr:ex[who]=expr
    return bus(SEATX[who]+dx,crew(ex=ex,talk=True,**over)+(extra or []),z=z,y=_cy(z,hy,head),out=out,**(L or {}))
def two(a,b,ex=None,z=1.35,out='road',hy=250,L=None,extra=None,**over):
    """two-shot between seats a and b"""
    return bus((SEATX[a]+SEATX[b])/2,crew(ex=ex,talk=True,**over)+(extra or []),z=z,y=_cy(z,hy),out=out,**(L or {}))
def wide(x=690,z=1.0,ex=None,out='road',hy=260,L=None,extra=None,**over):
    return bus(x,crew(ex=ex,talk=True,**over)+(extra or []),z=z,y=_cy(z,hy),out=out,**(L or {}))
def cab(ex='calm',z=1.25,hy=250,sweat=0,red=0,wound=False,pale=0,out='road',zom=0,x=1190,**k):
    """Rosa at the wheel (profile), windshield on the right.  zom = number of zombies seen through the windshield"""
    acts=[rosa(ex,talk=True,sweat=sweat,red=red,wound=wound,pale=pale),prop('wheel',1238,500)]
    if zom:acts.append(hz(zom,1330,1440,y=462,s=.3,seed=9,jit=34))
    return bus(x,acts,z=z,y=_cy(z,hy),out=out,**k)

def outside(n=5,x0=200,x1=900,to=-60,s=.8,y=419,seed=3,**k):
    """zombies seen through the windows of the bus (far layer, behind the wall)"""
    return hz(n,x0,x1,y=y,s=s,layer='far',to=to,seed=seed,jit=50,**k)
cy=_cy
def loc(name,acts=None,x=640,y=540,z=1.0,**p):
    """any other set: loc('dinerin',[...],x=560,y=500)"""
    return stage(name,acts or [],**p),dict(x=x,y=y,z=z)

def cabdrive(mex='scared',z=1.35,hy=250,sweat=0,rex='tired',out='road',L=None,rtilt=-12,**k):
    """Marcus at the wheel (profile), Rosa slumped on the bench next to the cab (front view) giving instructions"""
    acts=[dict(k='marcus',view='side',pose='drive',expr=mex,x=1196,y=664,s=.9,talk='marcus',sweat=sweat,tremble=1.3),prop('wheel',1238,520,1),
          pax('rosa',rex,talk=True,x=1062,y=663,s=.82,tilt=rtilt,sweat=1,red=.8,pale=.4,wound=True,dy=0)]
    return bus(1150,acts,z=z,y=cy(z,hy),out=out,**(L or {}),**k)
