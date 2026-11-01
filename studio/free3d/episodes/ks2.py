"""MIDNIGHT SKEWERS - NIGHT 2, one continuous night (~65 s). Three stall rules (pay first / hands off the tray / breakers get the stick).
Normal customers and passers-by come first; the clown steals the tray and the vendor walks to the rack for THE STICK; the big guy gets wedged in the window.
python build_rc.py episodes/ks2.py --w 1080 --h 1920 --clean"""
import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import build as BD
from batch import HOLD,TURN,SF,L,WM,KX,KZ,_F,_G,_M,_B
import audio_extra as AX

SR=BD.SR
def S_honk():
    n=int(.55*SR);t=np.arange(n)/SR;y=np.zeros(n)
    for t0,f in((0,330),(.24,360)):
        m=(t>=t0)&(t<t0+.2);tt=t[m]-t0;y[m]+=(np.sign(np.sin(2*np.pi*f*tt))*.3+np.sin(2*np.pi*f*2*tt)*.2)*np.minimum(tt/.01,1)*np.minimum((.2-tt)/.03,1)
    return y.astype(np.float32)
def S_bonk():
    n=int(.5*SR);t=np.arange(n)/SR;return ((np.sin(2*np.pi*(190-260*t)*t)*np.exp(-t*13)*.9+np.sin(2*np.pi*940*t)*np.exp(-t*22)*.3+np.random.RandomState(3).randn(n)*np.exp(-t*70)*.3)).astype(np.float32)
def S_stomp():
    n=int(.5*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*(60-30*t)*t)*np.exp(-t*8)*1.0+np.random.RandomState(4).randn(n)*np.exp(-t*60)*.35).astype(np.float32)
def S_boing():
    n=int(.5*SR);t=np.arange(n)/SR;f=160+820*(t/.5)**.55+30*np.sin(2*np.pi*14*t);ph=2*np.pi*np.cumsum(f)/SR
    return ((np.sin(ph)*.45+np.sign(np.sin(ph))*.08)*np.minimum(t/.01,1)*np.exp(-t/.28)).astype(np.float32)
def S_ping():
    n=int(.6*SR);t=np.arange(n)/SR;return ((np.sin(2*np.pi*1320*t)+.5*np.sin(2*np.pi*1980*t))*.3*np.exp(-t/.18)).astype(np.float32)
def S_crunch():
    n=int(.5*SR);t=np.arange(n)/SR;r=np.random.RandomState(12).randn(n);y=np.zeros(n)
    for t0 in(0,.13,.27):
        m=(t>=t0)&(t<t0+.1);y[m]+=r[m]*np.exp(-(t[m]-t0)*45)*.6
    return y.astype(np.float32)
def S_snap():
    n=int(.4*SR);t=np.arange(n)/SR;return (np.random.RandomState(9).randn(n)*np.exp(-t*90)*.8+np.sin(2*np.pi*1500*t)*np.exp(-t*60)*.4).astype(np.float32)
BD.SFXLIB.update({'honk':S_honk,'bonk':S_bonk,'stomp':S_stomp,'boing':S_boing,'ping':S_ping,'crunch':S_crunch,'snap':S_snap})
BD.VOICES.update({'clown':('en-US-Chirp3-HD-Zephyr',1.15),'brute':('en-US-Chirp3-HD-Umbriel',.78)})
SPEECH_RATE=1.2                           # owner request: 20% faster speech
for _k in ('vendor','woman','clown','brute'):
    if _k in BD.VOICES:BD.VOICES[_k]=(BD.VOICES[_k][0],round(BD.VOICES[_k][1]*SPEECH_RATE,3))
BD.VOICES['tall']=('en-US-Chirp3-HD-Enceladus',.82)
BD.NAMES.update({'clown':'CLOWN','brute':'BIG GUY','tall':'IT'})
BD.NAMECOL['tall']='#c8c8ee'
BD.NAMECOL.update({'clown':'#ff9a4a','brute':'#c8e87a'})

AX.install(BD,music_gain=.14,amb_gain=.25)
Z0=1.85                                   # standing just outside the counter edge (the window plane is KZ+1.1)
_T=([KX,1.62,KZ+.0],[KX,.74,KZ+1.8])         # looking down at the counter
_T2=([KX,1.9,KZ-.35],[KX,.95,KZ+1.5])        # a step back and higher: counter, tray, both pairs of hands and the clown's chest
_MZ=([KX+1.55,1.55,KZ-.25],[KX+2.12,1.5,KZ+.2])        # pushed in close to the CCTV monitor
_MF=([KX+1.52,1.52,KZ+.2],[KX+2.12,1.52,KZ+.2])        # the monitor fills the whole screen
FACECAM=[[KX+.85,2.73,KZ+2.43],[KX+.15,2.73,KZ+3.0],50]    # the CCTV camera, 0.9 m from the ghost's face
_R=([KX+.75,1.55,KZ-1.55],[KX+1.12,1.95,KZ-2.2])   # turned to the rack on the back wall
def P(who,x=.1,z=2.6,**k):return {**dict(who=who,pos=[KX+x,KZ+z],expr='smile'),**WM,**k}
def PASS(who,x0,x1,z,t0,t1):return P(who,x0,z,to=[KX+x1,KZ+z],t0=t0,t1=t1,expr='calm')
def TK(i,items,t0=-1):return dict(k='ticket',x=.54,y=.10,t0=t0,t1=40,id='#00%d'%i,items=[dict(what=w,n=n,d=d) for w,n,d in items])
def MO(v0,v1=None,tm=None):return dict(k='money',x=.54,y=.232,t0=-1,t1=40,v0=v0,v1=v0 if v1 is None else v1,tm=tm)
POW=lambda text,t0,x=.5,y=.4,**k:dict(k='pow',text=text,t0=t0,t1=t0+1.1,x=x,y=y,s=1.0,**k)
G=dict(glove=True)
def CARDSHOT(card,line,mn,sfx):return dict(card=card,chars=[],cam=[[0,1,0]]*4,lines=line if isinstance(line,list) else [line],place='',min=mn,sfx=sfx,cues=[],pad=.4,lead=.25,fov=40,grade='calm')
CREW=[P('shade',.1,2.2),P('shade2',-.55,2.5),P('shade3',.75,2.5),P('shade4',-1.15,2.9)]
ROW=[dict(who=w,pos=[KX+x,KZ+z],expr='creep',face=[KX,KZ],still=True,noShadow=True,camonly=True) for w,x,z in (('shade',1.2,3.4),('shade2',.5,4.0),('shade3',-.2,3.5),('shade4',-.9,4.1))]
TALL=lambda **k:P('tall',.1,Z0,**{**dict(hs=1.0,expr='creep'),**k})            # cannot be fought
TALL_C=lambda:dict(who='tall',pos=[KX+.1,KZ+2.4],expr='creep',face=[KX,KZ],still=True,noShadow=True,camonly=True)
CCTVCAM=[KX+2.0,KZ+1.5]
STARE=lambda **k:{**dict(who='tall',pos=[KX+.15,KZ+3.0],expr='creep',face=CCTVCAM,still=True,noShadow=True,camonly=True,hs=1.6),**k}   # turned to the camera, close
AWAY=lambda c,dx,dz:{**c,'to':[c['pos'][0]+dx,c['pos'][1]+dz],'t0':.3,'t1':3.0,'still':False}
def BACKC(d):return [{**c,'pos':[c['pos'][0],c['pos'][1]-d],'to':[c['pos'][0],c['pos'][1]-d-.2]} for c in BACK]   # the crowd a step closer (still outside the window)
BACK=[P('shade',-.9,3.4,expr='creep'),P('shade2',.9,3.7,expr='creep'),P('shade3',-.3,4.3,expr='creep'),P('shade4',.4,3.2,expr='creep')]   # the crowd behind it
def CL(**k):return P('clown',.1,Z0,**{**dict(hs=1.25),**k})                    # the clown at the window
def CT(**k):return P('clown',.1,Z0+.4,**{**dict(hs=1.25),**k})                  # clown standing back so his outstretched hands land on the tray
def BR(**k):return P('brute',.1,Z0,**{**dict(hs=1.2,expr='creep'),**k})       # the big guy at the window
def WO(**k):return P('woman',-.05,Z0,**k)                                       # a normal customer

shots=[
 # ================= HOOK: the three best beats first (no talking, just the promise) =================
 SF(HOLD(_F),[],'HOOK 1',1.5,[CL(lean=.5,reach=1)],[dict(pose='hold',t0=0,t1=1.4,osc=[0,0,.06,3.5,0]),dict(pose='hold',t0=0,t1=1.4,osc=[0,0,.06,3.5,1])],tray=[[0,0,.1,.3],[1.5,0,.12,.42]],trayShake=[0,1.5],intro=dict(l1='MIDNIGHT SKEWERS',l2='BREAK A RULE',l3='',fs=72,t0=0,t1=1.5),knocks=[.3,.7,1.1],kamp=.8,sfx=[[.05,'honk'],[.3,'rattle'],[.7,'rattle'],[1.1,'rattle']],cues=[dict(t=0,type='riser',dur=4.2,level=.32)],panic=.2,lead=0,pad=0,**G),
 SF(HOLD(_F),[],'HOOK 2',1.2,[CL(reach=[.5,0],lean=[0,-.15],expr='shock')],[dict(pose='carry',item='stick',rot=1.1,swing=[0,.25,1.1],t0=0,t1=1.2)],icons=[POW('BONK!',.32,.5,.42)],intro=dict(l1='',l2='GET THE STICK',l3='',fs=72,t0=0,t1=1.2),stickGone=True,tray=[[0,0,.22,1.0],[.3,0,.22,1.0],[.55,0,0,-.04],[.8,0,0,0],[1.2,0,0,0]],knocks=[.32],kamp=1.6,sfx=[[.32,'bonk'],[.45,'squeak']],lead=0,pad=0,**G),
 SF(HOLD(_F),[],'HOOK 3',1.5,[{**c,'expr':'creep','lean':[0,.1]} for c in CREW],[dict(pose='carry',item='stick',rot=1.1,t0=0,t1=1.5)],intro=dict(l1='MIDNIGHT SKEWERS',l2='NIGHT 2',l3='THREE RULES',fs=72,t0=0,t1=1.5),stickGone=True,panic=.8,sfx=[[.1,'sting']],cues=[dict(t=.1,type='stinger',level=.8)],lead=0,pad=0,**G),
 # ================= THE RULES =================
 CARDSHOT(dict(type='rules',top='STALL RULES',items=['PAY FIRST','HANDS OFF THE TRAY','BREAKERS GET THE STICK']),[L('vendor',"Three rules at my stall."),L('vendor',"One. Pay first."),L('vendor',"Two. Hands off the tray."),L('vendor',"Three. Breakers get the stick.")],3.4,[]),
 # ================= A QUIET START: normal people =================
 SF(HOLD(_F),[L('vendor',"Quiet so far.")],'NIGHT 2',4.0,[PASS('man',2.6,-2.6,3.4,.1,4.0)],icons=[MO(20)],sfx=[[.4,'foot'],[.9,'foot'],[1.4,'foot'],[1.9,'foot'],[2.4,'foot'],[2.9,'foot']]),
 SF(HOLD(_F),[L('woman',"Iced tea, please."),L('vendor',"Pay first.")],'A CUSTOMER',4.0,[P('woman',4.6,Z0+.3,to=[KX-.05,KZ+Z0],t0=0,t1=1.8)],lead=2.0,icons=[TK(1,[('tea',1,None)],2.1),MO(20)],sfx=[[.2,'foot'],[.7,'foot'],[1.2,'foot'],[2.0,'ping']]),
 SF(HOLD(_F),[L('woman',"Here you go.")],'PAYING FIRST',2.8,[WO(give=dict(t0=.2,t1=1.2))],[dict(pose='take',item='coin',t0=.3,t1=1.7)],icons=[TK(1,[('tea',1,None)]),MO(20,30,1.5)],sfx=[[1.5,'chime']],**G),
 SF(HOLD(_F),[L('vendor',"One iced tea."),L('woman',"Thanks. Good night.")],'SERVING',4.0,[WO(give=dict(t0=1.5,t1=2.4))],[dict(pose='pour',item='tea',t0=.2,t1=1.5),dict(pose='give',item='tea',t0=1.6,t1=2.8)],icons=[TK(1,[('tea',1,2.8)]),MO(30)],sfx=[[.25,'pour'],[1.7,'whoosh'],[2.6,'click']],**G),
 SF(HOLD(_F),[L('vendor',"Normal customers. I love them.")],'WALKING AWAY',3.6,[P('woman',-.05,Z0,to=[KX-5.2,KZ+Z0+.7],t0=.2,t1=3.4,still=False),PASS('manB',-2.6,2.6,3.3,.2,3.6)],icons=[MO(30)],sfx=[[.5,'foot'],[1.0,'foot'],[1.5,'foot'],[2.0,'foot'],[2.5,'foot']]),
 # ================= THE CLOWN BREAKS RULES 1 AND 2 =================
 SF(HOLD(_F),[L('clown',"Free skewers? HONK!"),L('vendor',"Pay first.")],'RULE BREAKER',4.0,[P('clown',4.4,Z0+.4,hs=1.4,to=[KX+.1,KZ+Z0],t0=.2,t1=1.7)],lead=2.0,icons=[MO(30)],sfx=[[.3,'foot'],[.7,'foot'],[1.1,'foot'],[1.7,'honk']]),
 SF(HOLD(_F),[L('clown',"The tray. HONK."),L('vendor',"Rule two! Hands OFF!",'panic')],'HE WANTS THE TRAY',3.8,[CT(lean=[0,.5],reach=[0,1],headX=[0,-.3])],icons=[MO(30)],sfx=[[.4,'creak']],panic=.15),
 SF(HOLD(_T2),[],'TUG OF WAR',2.8,[CT(lean=.5,reach=1,hs=1.1,headX=-.55)],[dict(pose='holdT',t0=.1,t1=9,nofade=True,osc=[0,0,.03,3.5,0]),dict(pose='holdT',t0=.1,t1=9,nofade=True,osc=[0,0,.03,3.5,1])],fov=58,trayHold=True,icons=[MO(30)],tray=[[0,0,0,0],[.5,0,.02,.06],[1.6,0,.04,.14],[2.8,0,.06,.2]],trayShake=[.4,2.8],knocks=[.5,1.2,1.9],kamp=.7,sfx=[[.1,'rattle'],[1.0,'rattle'],[1.9,'rattle']],panic=.2,**G),
 SF(TURN(_T2,_R),[L('vendor',"Rule three.",'whisper')],'TO THE RACK',1.3,[CL(lean=[.5,.05],reach=[1,.8])],icons=[MO(30)],tray=[[0,0,.06,.2],[.5,0,.2,.8],[1.3,0,.22,1.0]],sfx=[[.25,'foot'],[.6,'foot'],[.95,'foot']],panic=.25,**G),
 SF(HOLD(_R),[],'THE STICK',1.1,[],[dict(pose='reach',t0=.05,t1=1.05)],icons=[MO(30)],sfx=[[.5,'unhook']],panic=.25,**G),
 SF(TURN(_R,_F),[L('vendor',"Got it.")],'STICK IN HAND',1.3,[CL(lean=0,reach=[0,.5],hs=1.4)],[dict(pose='carry',item='stick',rot=1.1,t0=0,t1=1.7)],icons=[MO(30)],stickGone=True,tray=[[0,0,.22,1.0]],sfx=[[.25,'foot'],[.6,'foot'],[.95,'foot']],panic=.25,**G),
 SF(HOLD(_F),[L('vendor',"Rule three!",'panic')],'BONK',3.0,[CL(reach=[.5,0],lean=[0,-.15],expr='shock',hs=1.4)],[dict(pose='carry',item='stick',rot=1.1,swing=[.05,.5,1.6],t0=0,t1=3.0)],icons=[POW('BONK!',.56,.5,.42),MO(30)],stickGone=True,tray=[[0,0,.22,1.0],[.55,0,.22,1.0],[.9,0,0,-.04],[1.2,0,0,0],[3.0,0,0,0]],knocks=[.56],kamp=1.7,sfx=[[.56,'bonk'],[.68,'squeak'],[1.0,'rattle']],panic=.15,**G),
 SF(HOLD(_F),[L('clown',"...Honk.",'low')],'RUNNING AWAY',2.4,[P('clown',.1,Z0,hs=1.4,expr='worried',to=[KX+4.6,KZ+Z0+1.2],t0=.2,t1=1.9)],icons=[MO(30)],stickGone=True,sfx=[[.4,'foot'],[.7,'foot'],[1.0,'foot'],[1.3,'foot'],[1.6,'honkdie']]),
 # ================= THE BIG GUY: wedged in the window =================
 SF(HOLD(_F),[L('brute',"THIRTY.",'low'),L('vendor',"Pay first, sir.")],'THE BIG GUY',3.8,[P('brute',-4.2,Z0+.3,hs=1.2,expr='creep',to=[KX+.1,KZ+Z0],t0=0,t1=1.7)],[dict(pose='carry',item='stick',rot=1.1,t0=3.0,t1=4.8)],lead=2.0,icons=[TK(2,[('skewer',30,None)],2.1),MO(30)],stickGone=True,knocks=[.3,.8,1.3],kamp=.9,sfx=[[.2,'stomp'],[.7,'stomp'],[1.2,'stomp']],panic=.1,**G),
 SF(HOLD(_F),[L('brute',"I SAID. THIRTY.",'low'),L('vendor',"Sir, a window is not a door!",'panic')],'CLIMBING IN',3.6,[BR(lean=[.2,.5],reach=[.3,1])],[dict(pose='carry',item='stick',rot=1.1,t0=.1,t1=3.5)],icons=[TK(2,[('skewer',30,None)]),MO(30)],stickGone=True,knocks=[.7,1.4,2.1],kamp=.9,sfx=[[.6,'groan'],[1.4,'creak'],[2.0,'groan']],panic=.3,**G),
 SF(HOLD(_F),[L('vendor',"Sir. You're stuck.")],'STUCK',3.0,[BR(hs=[1.2,1.35],lean=.5,reach=1,wig=.08,wigf=9)],[dict(pose='carry',item='stick',rot=1.1,t0=.1,t1=2.9)],icons=[TK(2,[('skewer',30,None)]),MO(30)],stickGone=True,knocks=[.5,1.2,1.9],kamp=.7,sfx=[[.3,'groan'],[1.0,'creak'],[1.7,'groan']],panic=.3,**G),
 SF(HOLD(_F),[L('vendor',"Rule one.",'whisper'),L('brute',"...Thirty?",'panic')],'THE POKE',3.6,[BR(hs=1.35,lean=[.5,.05],reach=[1,.2],expr='shock',to=[KX+.1,KZ+Z0+1.6],t0=1.1,t1=2.6,backwards=True,face=[KX,KZ-6],glide=True)],[dict(pose='poke',item='stick',rot=.6,t0=.1,t1=3.4,osc=[0,0,.12,1.6,1])],icons=[POW('POKE!',.9,.5,.42,col='#8aff8a',tc='#0a3a1a'),MO(30)],stickGone=True,knocks=[1.0],kamp=1.4,sfx=[[.95,'bonk'],[1.2,'boing'],[2.4,'stomp']],panic=.15,**G),
 SF(HOLD(_F),[L('brute',"Fifteen bucks. Paid.",'low'),L('vendor',"Thank you, sir.")],'PAID',3.4,[P('brute',.1,Z0,hs=1.2,expr='smile',give=dict(t0=.2,t1=1.1))],[dict(pose='take',item='coin',t0=.4,t1=1.7)],icons=[MO(30,45,1.4),dict(k='stampS',t0=1.6,t1=9,x=.5,y=.54,s=.8)],stickGone=True,sfx=[[1.4,'chime']],**G),
 # ================= FINALE: the one you cannot fight -> the CLOSE button =================
 SF(TURN(_F,_M),[],'CAMERA',.6,ROW,cctv=True,panic=.5,stickGone=True,sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"Why are there FOUR of them?!",'panic')],'THEY ARE WAITING',3.0,ROW,cctv=True,panic=.7,stickGone=True,sfx=[[.2,'heart'],[1.1,'heart']],cues=[dict(t=0,type='gate',dur=1.0),dict(t=.2,type='stinger',level=.8)]),
 SF(TURN(_M,_F),[],'LOOKING BACK',.6,[],cctv=True,panic=.7,stickGone=True),
 SF(HOLD(_F),[L('vendor',"Rule three.",'whisper')],'THE TALL ONE',3.4,[TALL(tilt=[0,.3])]+BACK,[dict(pose='carry',item='stick',rot=1.1,t0=0,t1=3.3)],stickGone=True,panic=.7,sfx=[[.2,'heart'],[1.4,'heart'],[2.4,'creak']],cues=[dict(t=0,type='dread',dur=12,level=.35)],**G),
 SF(HOLD(_F),[L('vendor',"...It's broken.")],'IT DOES NOT WORK',3.2,[TALL(tilt=[.3,.3])]+BACK,[dict(pose='carry',item='stick',rot=1.1,swing=[.05,.5,1.6],t0=0,t1=1.2),dict(pose='carry',item='stump',rot=.9,t0=1.2,t1=3.1)],icons=[POW('...',.56,.5,.42,col='#c8c8d0',tc='#202028',fs=60)],stickGone=True,panic=.8,knocks=[.56],kamp=.8,sfx=[[.56,'bonk'],[.62,'snap']],**G),
 SF(HOLD(_F),[L('vendor',"Okay. Okay okay okay.",'panic')],'CLOSING IN',2.8,[TALL(lean=[0,.2],reach=[0,.35],tilt=[.3,.5])]+BACKC(1.0),[dict(pose='carry',item='stump',rot=.9,t0=0,t1=2.7)],stickGone=True,panic=.9,knocks=[.6,1.4,2.2],kamp=.7,sfx=[[.3,'groan'],[1.2,'creak'],[2.0,'sting']],cues=[dict(t=.2,type='stinger',level=.8)],**G),
 SF(TURN(_F,_B),[],'TO THE BUTTON',.7,[TALL(lean=.2,reach=.35,tilt=.5)]+BACKC(1.0),stickGone=True,panic=.9,snap=True,sfx=[[.1,'whoosh']]),
 SF(HOLD(_B),[L('vendor',"Close it! Close it!",'panic')],'CLOSING THE STALL',2.4,[TALL(lean=.2,reach=.35,tilt=.5)]+BACKC(1.0),[dict(pose='press',t0=.3,t1=1.2)],cctv=True,shutter=[0,1],stickGone=True,panic=.9,sfx=[[.55,'click'],[.9,'slam']],cues=[dict(t=.9,type='stinger',level=.7)],**G),
 SF(TURN(_B,_F),[],'THE SHUTTER',.7,[],snap=True,shutter=1,flicker=True,knocks=[.4],kamp=1.2,stickGone=True,sfx=[[.35,'bang']]),
 SF(HOLD(_F),[L('vendor',"Don't open it.",'whisper')],'SOMETHING AT THE SHUTTER',4.0,[],shutter=1,flicker=True,knocks=[.2,.9,1.6,2.2,2.8],kamp=1.2,stickGone=True,panic=.8,sfx=[[.15,'bang'],[1.5,'scrape'],[2.7,'bang']],cues=[dict(t=0,type='riser',dur=4.0,level=.3)]),
 SF(TURN(_F,_M),[],'CAMERA',.6,[TALL_C()]+ROW,cctv=True,shutter=1,flicker=True,stickGone=True,panic=.7,sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"They're still out there.",'whisper')],'STILL OUT THERE',3.2,[TALL_C()]+ROW,cctv=True,shutter=1,stickGone=True,panic=.8,sfx=[[.3,'heart'],[1.3,'heart']],cues=[dict(t=0,type='gate',dur=1.0)]),
 SF(HOLD(_M),[],'IT TURNS',1.6,[STARE()],cctv=True,shutter=1,stickGone=True,panic=.8,lead=0,pad=0,sfx=[[.2,'heart']]),
 SF(HOLD(_MF),[L('tall',"See you tomorrow.",'low')],'THE FACE',3.4,[STARE()],cctv=True,cctvCam=FACECAM,shutter=1,stickGone=True,lead=.9,panic=1.0,flash=[0,.25,.8,'#d8ffe8'],sfx=[[0,'sting'],[.05,'heart']],cues=[dict(t=0,type='stinger',level=.95)]),
 SF(HOLD(_M),[L('vendor',"...He's gone. Goodnight.",'whisper')],'WALKING AWAY',3.4,[AWAY(STARE(),5.5,5.0)]+[AWAY(c,5.0,4.2) for c in ROW],cctv=True,shutter=1,stickGone=True,panic=.5,sfx=[[.4,'foot'],[.9,'foot'],[1.4,'foot'],[1.9,'foot'],[2.4,'foot']]),
 CARDSHOT(dict(type='rules',top='NEXT NIGHT',items=['NIGHT 3',"SOME THINGS YOU DON'T FIGHT",'CLOSE THE SHUTTER']),L('vendor',"Night three. Some things you don't fight."),3.4,[[.3,'click'],[1.0,'click'],[1.7,'click']]),
]
for s in shots:s['typed']=True
EP=dict(id='ks2',series='MIDNIGHT SKEWERS',title='NIGHT 2',part=0,of=0,shots=shots,safe=True,th={},blip=False)
