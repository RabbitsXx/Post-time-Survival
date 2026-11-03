"""zlib9.py : the shared DSL of the 9:16 shorts (ZOMBIE SURVIVAL SCHOOL).  Same beat format as script_how.py plus
   view = window onto the 1280x720 world (x,y = window centre in world coordinates, number or [from,to]; z = zoom) and nofade.
 speakers: dex (Fenrir) | game (announcer, lo-fi) | maya (radio kid) | steve (grunts)
 text may carry <y>..</y> / <r>..</r> accents (captions only; stripped for TTS)
 fx 'at' / sfx at: seconds from beat start, or 'e-0.5' (from the end), or 's1+0.2' (from the start of sentence 1).
 Geometry of the window: 450x800 (frame 720x1280 = x1.6).  Captions: y 464-576.  Platform top bar: y < 96.  Keep faces/props above y 456 (window) = frame 730."""
import re
class Script:
    def __init__(s,title,series,part,of,topic,accent='#ffd23a'):
        s.TITLE=title;s.BEATS=[];s.series=series;s.part=part;s.of=of;s.topic=topic;s.accent=accent
    def beat(s,say=(),scene=None,skin='real',cam=None,fx=None,sfx=None,mood='tense',dur=None,pause=0.0,view=None,nofade=False,intent=None):
        b=dict(say=[(a,t) for a,t in say],scene=scene,skin=skin,cam=cam,fx=fx or [],sfx=sfx or [],mood=mood,dur=dur,pause=pause)
        if view:b['view']=view
        if nofade:b['nofade']=True
        if intent:b['intent']=intent
        s.BEATS.append(b);return b
    def announce(s,at=.15,dur=3.1):
        return dict(k='series',at=at,dur=dur,name=s.series,part=s.part,of=s.of,topic=s.topic,c=s.accent)
def stage(loc,acts=None,v=None,skin='real',tag=None,hud=None,**p):
    d=dict(loc=loc,acts=acts or [],tag=tag)
    if v:d['v']=v
    if hud:d['hud']=hud
    d.update(p);return dict(n='stage',p=d)
def card(kind,**p):p['kind']=kind;return dict(n='card',p=p)
def dex(view='front',pose='stand',expr='cool',x=640,y=600,s=1.0,talk=True,**k):
    return dict(k='dex',view=view,pose=pose,expr=expr,x=x,y=y,s=s,talk='dex' if talk else False,**k)
def steve(x,y=600,view='side',pose='zwalk',s=1.0,**k):
    a=dict(k='steve',view=view,pose=pose,x=x,y=y,s=s);a.update(k);return a
def hz(n,x0,x1,y=590,s=.9,**k):
    a=dict(k='horde',n=n,x0=x0,x1=x1,y=y,s=s);a.update(k);return a
def dog(x,y=600,s=.8,pose='stand',**k):
    a=dict(k='dog',x=x,y=y,s=s,pose=pose);a.update(k);return a
def prop(t,x,y,s=1,**k):
    a=dict(k='prop',t=t,x=x,y=y,s=s);a.update(k);return a
def sticker(at,txt=None,x=225,y=200,rot=-6,size=60,c='#ffd23a',dur=1.3,ic=None,s=1):
    d=dict(k='sticker',at=at,x=x,y=y,rot=rot,size=size,c=c,dur=dur,s=s)
    if txt:d['txt']=txt
    if ic:d['ic']=ic
    return d
def zoom(at,to=1.18,cx=225,cy=300,dur=.14,hold=None,back=None):
    d=dict(k='zoom',at=at,to=to,cx=cx,cy=cy,dur=dur)
    if hold is not None:d['hold']=hold;d['back']=back or .3
    return d
def shake(at,amp=8,dur=.4):return dict(k='shake',at=at,amp=amp,dur=dur)
GAME_HUD=lambda n,lv=None,hp=.9:dict(deaths=n,lv=lv,hp=hp)
