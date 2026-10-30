"""worldlib.py : the data-driven world kit (studio/long/world9.js draws it).  A topic = worlds/<id>.json (setting, palette, locations made of catalogue items, cast with palettes + voices,
announcer device, what is NEW) + arcs/<id>/<id>_NN.py (the beats).  Nothing else has to be drawn by hand, so a new world is data.

    W=World('worlds/<id>.json'); P=W.part(1,'TOPIC',of=3); BEATS=P.BEATS; TITLE=P.TITLE; TH=[]
    P.open(); P.B(say, shot, ...); P.close('next topic')
    shots: W.cuf(who,expr,v='key') | W.duo(a,b,...) | W.trio([...]) | W.set('key',[acts],x,y,z) | W.lane('key',[...]) ; acts: W.person(...), W.at(...), W.crowd(...), zlib9.prop/hz/sticker/card
    end of the clip file:   VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW = W.exports(part_new=[...])
Facing: person(view='front'|'side'|'back', flip=True, headView='side'), seq=turn(...) (pax9.js)."""
import json,os
from zlib9 import *
from zlib9 import hz as _hz
NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten']
FOOT=640;R=os.path.dirname(os.path.abspath(__file__))
def I(who,does,where,how,why):
    """the storyboard line of a beat: WHO is in it, what they DO (an action, not 'talks'), WHERE (a place the viewer can see), HOW it is shown (pose / prop / camera), WHY the viewer keeps watching (a question, a threat, a promise)"""
    return dict(who=who,does=does,where=where,how=how,why=why)
def flat(*xs):
    out=[]
    for x in xs:out+=flat(*x) if isinstance(x,list) else [x]
    return out
def turn(*steps):
    out=[]
    for st in steps:
        d=dict(at=st[0],view=st[1])
        if len(st)>2 and st[2]:d['headView']=st[2]
        if len(st)>3:d.update(st[3])
        out.append(d)
    return out
class World:
    def __init__(s,path):
        p=path if os.path.isabs(path) else os.path.join(R,path)
        s.spec=json.load(open(p));S=s.spec;s.id=S['id'];s.loc='w_'+s.id;s.cast=S['cast'];s.name=S['series'];s.say=S.get('say',S['series'].title())
        s.accent=S.get('accent','#ffd23a')
    # ---- actors ----
    def sc(s,who):return s.cast[who].get('scale',.8)
    def person(s,who,expr='calm',x=640,y=FOOT,sc=None,talk=False,pose='stand',**k):
        a=dict(k=who,view='front',pose=pose,expr=expr,x=x,y=y,s=(sc or s.sc(who)),talk=who if talk else False,bob=1.1,ph=x*.011,shadow=1,rim=s.spec['pal'].get('rim','rgba(255,190,120,.5)'))
        if s.cast[who].get('sx'):a['sx']=s.cast[who]['sx']
        a.update(k);return a
    def lane_pos(s,X,z,vpy=398):return dict(x=640+X/z,y=vpy+(720-vpy)/z,s=1.0/z)
    def at(s,who,X,z,expr='calm',**k):
        L=s.lane_pos(X,z);return s.person(who,expr,L['x'],L['y'],s.sc(who)*1.5/z,**k)
    def crowd(s,n,X0,X1,z0,z1,seed=3,**k):
        out=[]
        for i in range(n):
            t=i/max(1,n-1);z=z0+(z1-z0)*((i*0.618)%1);X=X0+(X1-X0)*t;L=s.lane_pos(X,z)
            out.append(_hz(1,L['x'],L['x'],y=L['y'],s=2.7/z,seed=seed+i*7,jit=0,yj=0,human=True,**k))
        return sorted(out,key=lambda a:a['y'])
    def hz(s,n,x0,x1,y=FOOT,sc=1.0,seed=5,**k):
        """n human zombies between x0..x1 at ground y; sc 1.0 = as tall as a cast member"""
        k.setdefault('jit',30);k.setdefault('yj',10)
        return _hz(n,x0,x1,y=y,s=1.6*sc,seed=seed,human=True,**k)
    def horde(s,n,x0,x1,y=650,sc=1.6,seed=5,**k):return _hz(n,x0,x1,y=y,s=sc,seed=seed,jit=50,human=True,**k)
    def hold(s,act,item,dx=46,dy=-120,sc=.5,**k):
        """a person holding a prop: returns [person, prop] (the prop follows the person when it walks)"""
        p=dict(k='prop',t=item,x=act['x']+dx*act['s']/.8,y=act['y']+dy*act['s']/.8,s=sc*act['s']/.8);p.update(k)
        if act.get('to'):p['to']=(act['to'][0]+dx*act['s']/.8,act['to'][1]+dy*act['s']/.8)
        return [act,p]
    # ---- shots (return (scene, view) for Part.B) ----
    def set(s,v,acts=None,x=640,y=480,z=1.0,**p):p['v']=v;return stage(s.loc,acts or [],**p),dict(x=x,y=y,z=z)
    lane=set
    def _cy(s,z,hy,head):return head+(400-hy)/(z*1.045)
    def cuf(s,who,expr,v=None,x=640,z=2.7,hy=250,dx=0,extra=None,**p):
        sc=s.sc(who);a=s.person(who,expr,x,FOOT,sc,talk=True,**{k:p.pop(k) for k in list(p) if k in('view','flip','headView','headFlip','seq')});head=FOOT-297*sc
        return s.set(v or s.default_loc(),[a]+(extra or []),x=x+dx,y=s._cy(z,hy,head),z=z,**p)
    def duo(s,a,b,ea='calm',eb='calm',v=None,xa=560,xb=730,z=2.0,hy=270,extra=None,**p):
        sa,sb=s.sc(a),s.sc(b);acts=[s.person(a,ea,xa,FOOT,sa,talk=True),s.person(b,eb,xb,FOOT,sb,talk=True,flip=True)]+(extra or []);head=FOOT-297*(sa+sb)/2
        return s.set(v or s.default_loc(),acts,x=(xa+xb)/2,y=s._cy(z,hy,head),z=z,**p)
    def trio(s,who,ex=None,v=None,z=1.5,hy=300,extra=None,x0=470,gap=115,**p):
        ex=ex or {};acts=[s.person(w,ex.get(w,'calm'),x0+i*gap,FOOT,talk=True) for i,w in enumerate(who)]+(extra or [])
        return s.set(v or s.default_loc(),acts,x=x0+gap*(len(who)-1)/2,y=s._cy(z,hy,FOOT-297*.8),z=z,**p)
    def default_loc(s):return next(iter(s.spec['locs']))
    def part(s,n,topic,of=3,time=''):return WorldPart(s,n,topic,of)
    # ---- exports for the clip file ----
    def exports(s,part_new=None):
        S=s.spec;V={};F={};SP={};NE={};NT={}
        for i,c in s.cast.items():
            V[i]=(c['voice'],c.get('rate',.95));F[i]=c.get('filt','');SP[i]=dict(label=c['name'].upper(),fill=c.get('cap','#ffd23a'),stroke='#000',mono=False);NE[i]=c['name'];NT[i]=c.get('th',c['name'])
        a=S['ann'];V['ann']=(a.get('voice','en-US-Chirp3-HD-Enceladus'),a.get('rate',1.0));F['ann']=a.get('filt','highpass=f=300,lowpass=f=3400,acompressor=threshold=-24dB:ratio=6,volume=1.2')
        SP['ann']=dict(label=a['name'].upper(),fill=a.get('c','#7dffb0'),stroke='#02170c',mono=True);NE['ann']=a['name'];NT['ann']=a.get('th',a['name'])
        N=S['new'];ne=dict(world=s.id,setting=N['setting'],structure=N['structure'],announcer=N['announcer'],announcer_voice='ann',palette=N['palette'],
            locs=[f'{s.loc}:{k}' for k in S['locs']],cast=list(s.cast),props=N['props'],devices=N['devices']+[s.id+'_ann',s.id+'_route'],gags=N['gags'],tips=N['tips'],tied_to_topic=N['tied_to_topic'],setting_tags=N.get('setting_tags',[]),props_reused=N.get('props_reused',[]),
            library_used=['pax rig','caption engine','SFX base','card helpers','finish9 audio chain','world9 catalogue'])
        if part_new:ne['part_new']=part_new
        return V,F,SP,NE,NT,True,S,ne
    def meta(s,hook,premise,body,nxt,ask,tags,tt,ig,pin,cast=''):
        return dict(hook=hook,premise=premise,body=body,nxt=nxt,ask=ask,steve=False,cast=cast or ', '.join(c['name'] for c in s.cast.values()),tt=tt,ig=ig,pin=pin,tags=tags)
class Scene:
    """continuity keeper for one location: remembers where every person / zombie stands, so the next shot starts where the last one ended.
    sc=Scene(W,'lobby',x=620,y=470,z=.62,add=[...]);  sc.put('zara',700,expr='shock');  sc.zput('courier',420,seed=2,held='pizza')
    sc.shot(moves={'bell':(640,'walk')},zmoves={'courier':540},expr={'zara':'scared'},extra=[...])  -> (scene, view) for Part.B
    A person who moves is drawn walking (side view, facing the way they go) and stands at the end point afterwards; a zombie drifts toward its new x during the beat."""
    def __init__(s,W,loc,x=620,y=470,z=.62,add=None):
        s.W=W;s.loc=loc;s.view=dict(x=x,y=y,z=z);s.add=add or [];s.p={};s.z={}
    def put(s,who,x,y=FOOT,expr='calm',sc=None,face='front',flip=False,pose='stand'):
        s.p[who]=dict(x=x,y=y,expr=expr,sc=sc or s.W.sc(who),face=face,flip=flip,pose=pose);return s
    def out(s,*who):
        for w in who:s.p.pop(w,None)
        return s
    def zput(s,name,x,y=FOOT,seed=3,sc=1.0,held=None,flip=False):
        s.z[name]=dict(x=x,y=y,seed=seed,sc=sc,held=held,flip=flip);return s
    def zout(s,*n):
        for k in n:s.z.pop(k,None)
        return s
    def shot(s,moves=None,zmoves=None,expr=None,pose=None,face=None,extra=None,add=None,z=None,hide=(),**kw):
        moves=moves or {};zmoves=zmoves or {};expr=expr or {};pose=pose or {};face=face or {};acts=[];after={}
        for who,st in s.p.items():
            if who in hide:continue
            e=expr.get(who,st['expr']);st['expr']=e;x0=st['x']
            if who in moves:
                m=moves[who];x1=m[0];anim=m[1] if len(m)>1 else 'walk';y1=m[2] if len(m)>2 else st['y']
                a=s.W.person(who,e,x0,st['y'],st['sc'],view='side',flip=x1<x0,pose='walk' if anim!='run' else 'run',anim=anim,to=(x1,y1))
                if st.get('held'):a['held']=st['held']
                st['x'],st['y']=x1,y1;st['face']='front';st['flip']=False
            else:
                v=face.get(who,st['face']);a=s.W.person(who,e,x0,st['y'],st['sc'],view=v if v in('front','side','back') else 'front',flip=st['flip'],pose=pose.get(who,st['pose']))
                if st.get('held'):a['held']=st['held']
                if v=='backhead':a=s.W.person(who,e,x0,st['y'],st['sc'],view='back',headView='side',flip=st['flip'])
            acts.append(a)
        for n,zb in s.z.items():
            zm=zmoves.get(n);fl=None
            if isinstance(zm,tuple):zm,fl=zm
            dx=(zm-zb['x']) if zm is not None else 0
            fv=fl if fl is not None else ((dx<0) if dx else zb['flip'])
            h=s.W.hz(1,zb['x'],zb['x'],y=zb['y'],sc=zb['sc'],seed=zb['seed'],to=dx,flip=fv,jit=0,yj=0);acts.append(h)
            if zb.get('held'):
                pr=dict(k='prop',t=zb['held'],x=zb['x']+(70 if not fv else -70),y=zb['y']-140,s=1.4)
                if dx:pr['to']=(pr['x']+dx,pr['y'])
                acts.append(pr)
            if dx:zb['x']+=dx
            zb['flip']=fv
        v=dict(s.view)
        if z:v['z']=z
        if kw.get('vx') is not None:v['x']=kw['vx']
        if kw.get('vy') is not None:v['y']=kw['vy']
        return s.W.set(s.loc,acts+(extra or []),add=(add if add is not None else s.add),**v)
    def hold(s,who,item,ox=60,oy=-130,sc=1.0):
        s.p[who]['held']=dict(t=item,ox=ox,oy=oy,s=sc);return s
class WorldPart(Script):
    def __init__(s,W,n,topic,of):
        Script.__init__(s,f'{W.name} - PART {n}: {topic}',W.name,n,of,topic,W.accent);s.W=W;s.say=W.say
    def B(s,say,shot,fx=None,**k):
        fx=list(fx or []);k.setdefault('pause',.35)    # a beat of air after each line so the story can be followed
        if isinstance(shot,tuple):
            sc,view=shot;lab=s.W.spec['locs'].get(sc['p'].get('v'),{}).get('label') or str(sc['p'].get('v','')).replace('-',' ')
            fx.append(dict(k=s.W.id+'_route',at=0,stop=s.part,of=s.of,label=f'{s.say}  ·  {lab}'));return s.beat(say,sc,view=view,fx=fx,**k)
        return s.beat(say,shot,fx=fx,**k)
    def open(s,**k):
        a=s.W.spec['ann'];return s.B([('ann',f"{a.get('hello','Attention.')} This is {s.say}. Part {NUMW[s.part]} of {NUMW[s.of]}: {s.topic.lower()}.")],card(s.W.id+'_ann',mode='open',part=s.part,of=s.of,title=s.topic.upper()),mood='idle',sfx=[('radio',0)],**k)
    def close(s,nxt=None,**k):
        if s.part<s.of:t=f"Part {NUMW[s.part]} of {NUMW[s.of]}, {s.say}. Next: {(nxt or '').lower()}. Follow for part {NUMW[s.part+1]}.";c=card(s.W.id+'_ann',mode='close',part=s.part,of=s.of,next=(nxt or '').upper())
        else:t=f"Part {NUMW[s.of]} of {NUMW[s.of]}, the end of {s.say}. Follow for the next series.";c=card(s.W.id+'_ann',mode='end',part=s.part,of=s.of)
        return s.B([('ann',t)],c,mood='idle' if s.part<s.of else 'sad',nofade=s.part>=s.of,sfx=[('radio',0)],**k)
