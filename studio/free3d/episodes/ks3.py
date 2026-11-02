"""MIDNIGHT SKEWERS - NIGHT 3 (~75 s).  Rule of the night: COUNT THEM. The camera and the window must show the same number of people, otherwise close the shutter.
Built from NIGHT_LESSONS.md (second-by-second plan).  python build_rc.py episodes/ks3.py --w 1080 --h 1920 --clean   then   python lint_ep.py out/ks3.spec.json"""
import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import build as BD
import ks2 as K                                   # shared helpers + the audio add-ons (installed once on import)
from batch import HOLD,TURN,SF,L,WM,KX,KZ,_F,_G,_M,_B
from ks2 import P,TK,MO,POW,G,CARDSHOT,Z0,_MF
for _k in ('man','granny','kid'):
    if _k in BD.VOICES:BD.VOICES[_k]=(BD.VOICES[_k][0],round(BD.VOICES[_k][1]*1.2,3))
BD.VOICES.setdefault('granny',('en-US-Chirp3-HD-Gacrux',1.15));BD.VOICES.setdefault('kid',('en-US-Chirp3-HD-Puck',1.3))
BD.NAMES.update({'granny':'GRANNY','kid':'KID','man':'MAN'});BD.NAMECOL.update({'granny':'#d8a8ff','kid':'#ffe070','man':'#d0d090'})

_LO=([KX+.05,1.72,KZ+.45],[KX+.05,1.0,KZ+1.9])                 # leaning over the counter, looking down at the pavement
_MH=([KX+1.12,1.5,KZ+.2],[KX+2.12,1.5,KZ+.2])                      # whole monitor in frame
_BK=([KX,1.62,KZ-.7],[KX+.1,1.55,KZ-3.0])                      # turned round: the back of the stall
CCTV_W=[[KX+2.0,2.45,KZ+1.5],[KX-.35,.95,KZ+2.8],84]                # CAM 01 widened so the window AND the pavement behind it are both in the picture
INSIDE=[[KX+.4,2.35,KZ+1.05],[KX-.15,1.55,KZ-.6],58]               # CAM 02: the awning camera turned to look into the stall
INFACE=[[KX-.1,2.62,KZ+.2],[KX-.5,2.6,KZ-.85],50]            # CAM 02, 1 m from the tall one's face
def PC(who,x,z,**k):return {**P(who,x,z),'nocam':False,**k}                 # a person the CCTV can see (P() hides people from it by default)
def CH(who,x,**k):return PC(who,x,Z0,**k)                       # someone standing at the window
def WALK(who,x0,x1,**k):return PC(who,x0,Z0+.35,to=[KX+x1,KZ+Z0],t0=k.pop('t0',0),t1=k.pop('t1',1.7),**k)
KID=lambda **k:{**dict(who='boy',pos=[KX+.05,KZ+Z0+.05],expr='smile',hs=1.3,**WM),'nocam':False,**k}
TALL_B=lambda **k:{**dict(who='tall',pos=[KX-.75,KZ+Z0+1.2],expr='creep',face=[KX,KZ],still=True,noShadow=True,camonly=True,hs=1.2),**k}       # behind the old woman (camera only)
VEND_C=dict(who='vendor3',pos=[KX,KZ-.1],face=[KX,KZ+6],expr='calm',still=True,noShadow=True,camonly=True)
TALL_IN=dict(who='tall',pos=[KX-.5,KZ-.85],expr='creep',face=[KX+.4,KZ+1.05],lean=.12,still=True,noShadow=True,camonly=True,hs=1.15)
CNT=lambda cam,win,t0=.5,txt=None:dict(k='count',x=.5,y=.145,cam=cam,win=win,t0=t0,t1=60,s=1.0,txt=txt)
FEET=lambda n,t0=.15,dt=.38:[[t0+i*dt,'foot'] for i in range(n)]
TITLE=dict(l1='',l3='',fs=72)

shots=[
 # ===== HOOK: the whole rule in three beats, no talking =====
 SF(HOLD(_MH),[],'HOOK 1',1.4,[CH('granny',-.05,expr='smile'),TALL_B()],cctv=True,cctvCam=CCTV_W,intro=dict(TITLE,l1='MIDNIGHT SKEWERS',l2='CAMERA: TWO',t0=0,t1=1.4),sfx=[[.1,'heart'],[.7,'heart']],cues=[dict(t=0,type='riser',dur=4.2,level=.3)],panic=.5,lead=0,pad=0),
 SF(HOLD(_F),[],'HOOK 2',1.3,[CH('granny',-.05,expr='smile'),TALL_B()],intro=dict(TITLE,l2='WINDOW: ONE',t0=0,t1=1.3),sfx=[[.1,'ping']],lead=0,pad=0),
 SF(HOLD(_B),[],'HOOK 3',1.6,[CH('granny',-.05,expr='smile'),TALL_B()],[dict(pose='press',t0=.2,t1=1.1)],cctv=True,cctvCam=CCTV_W,shutter=[0,1],intro=dict(TITLE,l2='CLOSE IT',l3='NIGHT 3',t0=0,t1=1.6),sfx=[[.45,'click'],[.7,'slam'],[1.15,'bang']],knocks=[1.15],kamp=1.0,panic=.6,lead=0,pad=0,**G),
 # ===== RULES: <= 5.5 s =====
 CARDSHOT(dict(type='rules',top='THE RULE',items=['COUNT THEM','CAMERA = WINDOW','IF NOT: CLOSE IT']),
          [L('vendor',"Night three. Count them."),L('vendor',"Camera must match window."),L('vendor',"If not, close it.")],4.2,[[.3,'click'],[1.7,'click'],[3.2,'click']]),
 # ===== CUSTOMER 1: a normal one, so the loop is learned =====
 SF(HOLD(_F),[L('man',"Two skewers, please.")],'CUSTOMER 1',3.8,[WALK('man',4.4,.1)],lead=2.0,icons=[TK(1,[('skewer',2,None)],2.1),MO(0)],sfx=FEET(5)+[[2.0,'ping']]),
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[CH('man',.1)],cctv=True,cctvCam=CCTV_W,snap=True,icons=[MO(0)],sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"One at the window. One on camera. Good.")],'COUNT 1',3.2,[CH('man',.1)],cctv=True,cctvCam=CCTV_W,icons=[MO(0),CNT(1,1,.3)],sfx=[[.3,'ping']]),
 SF(TURN(_M,_G),[],'TO THE GRILL',.7,[CH('man',.1)],icons=[MO(0)],sfx=[[.1,'whoosh']]),
 SF(HOLD(_G),[L('vendor',"Coming up.")],'COOKING',2.4,[CH('man',.1)],[dict(pose='grill',item='skewer',t0=.3,t1=2.2)],icons=[TK(1,[('skewer',2,2.0)]),MO(0)],sfx=[[0,'whoosh'],[.3,'sizzle'],[1.4,'sizzle'],[2.1,'click']],**G),
 SF(TURN(_G,_F),[],'BACK TO THE WINDOW',.7,[CH('man',.1,give=dict(t0=.2,t1=.7))],[dict(pose='give',item='skewer',t0=.1,t1=.7)],icons=[TK(1,[('skewer',2,0)]),MO(0)],sfx=[[.1,'whoosh']],**G),
 SF(HOLD(_F),[L('man',"Thanks. Keep the change.")],'SERVED',2.7,[CH('man',.1,give=dict(t0=0,t1=.6))],[dict(pose='give',item='skewer',t0=0,t1=.8),dict(pose='take',item='coin',t0=1.2,t1=2.4)],icons=[TK(1,[('skewer',2,0)]),MO(0,10,1.6),dict(k='stampS',t0=1.7,t1=9,x=.5,y=.56,s=.8)],sfx=[[.3,'click'],[1.6,'chime']],**G),
 # ===== CUSTOMER 2: one at the window, two on the camera -> close =====
 SF(HOLD(_F),[L('granny',"The usual, dear.")],'CUSTOMER 2',3.6,[WALK('granny',-4.6,-.05,t1=1.8),TALL_B()],lead=2.05,icons=[TK(2,[('skewer',1,None),('tea',1,None)],2.3),MO(10)],sfx=FEET(5,.1,.37)+[[2.1,'ping']]),
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[CH('granny',-.05),TALL_B()],cctv=True,cctvCam=CCTV_W,snap=True,sfx=[[.1,'click']],panic=.3),
 SF(HOLD(_M),[L('vendor',"Two on camera. One at the window.",'whisper')],'COUNT 2',3.2,[CH('granny',-.05),TALL_B()],cctv=True,cctvCam=CCTV_W,icons=[MO(10),CNT(2,1,.4)],panic=.5,sfx=[[.3,'heart'],[1.3,'heart']],cues=[dict(t=0,type='gate',dur=1.0),dict(t=.1,type='dread',dur=10,level=.3)]),
 SF(TURN(_M,_F),[],'BACK TO THE WINDOW',.5,[CH('granny',-.05)],cctv=True,cctvCam=CCTV_W,snap=True,panic=.5),
 SF(HOLD(_F),[L('vendor',"Ma'am. Who is standing behind you?"),L('granny',"Behind me, dear?")],'WHO IS BEHIND',5.0,[CH('granny',-.05,headYaw=[0,-1.15])],icons=[MO(10),CNT(2,1,.1)],panic=.4,sfx=[[2.4,'creak']]),
 SF(TURN(_F,_B),[],'TO THE BUTTON',.6,[CH('granny',-.05,expr='smile')],snap=True,panic=.5,sfx=[[.1,'whoosh']]),
 SF(HOLD(_B),[L('vendor',"Count says no, ma'am.")],'CLOSING',2.5,[CH('granny',-.05,expr='smile'),TALL_B()],[dict(pose='press',t0=.9,t1=1.7)],cctv=True,cctvCam=CCTV_W,shutter=[0,1],panic=.5,sfx=[[1.2,'click'],[1.5,'slam']],cues=[dict(t=1.5,type='stinger',level=.6)],**G),
 SF(HOLD(_F),[L('granny',"...Rude.",'whisper')],'POLITE KNOCKS',2.1,[],shutter=1,knocks=[.9,1.5],kamp=.3,icons=[],sfx=[[.85,'bang'],[1.45,'bang']],panic=.3),
 SF(HOLD(_F),[L('vendor',"...That wasn't her.",'whisper')],'THE HEAVY KNOCK',2.1,[],shutter=1,flicker=True,knocks=[.35],kamp=1.5,sfx=[[.3,'bang'],[.35,'sting']],cues=[dict(t=.3,type='stinger',level=.8)],panic=.7),
 # ===== CUSTOMER 3: two at the window, three on the camera ... a kid =====
 SF(HOLD(_F),[],'SHUTTER UP',1.3,[WALK('manB',4.8,.5,t0=.1,t1=1.3),WALK('womanR',5.5,-.4,t0=.1,t1=1.3),{**dict(who='boy',pos=[KX+5.3,KZ+Z0+.4],to=[KX+.05,KZ+Z0+.05],t0=.1,t1=1.3,expr='smile',camonly=True,hs=1.3,**WM),'nocam':False}],shutter=[1,0],sfx=FEET(3,.1,.35)+[[.05,'creak']]),
 SF(HOLD(_F),[L('man',"Three skewers."),L('woman',"Two for us. One for the little one.")],'CUSTOMER 3',4.4,[CH('manB',.5,expr='smile'),CH('womanR',-.4,expr='smile'),KID(camonly=True)],lead=.3,icons=[TK(3,[('skewer',3,None)],.4),MO(10)],sfx=[[.35,'ping']]),
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[CH('manB',.5),CH('womanR',-.4),KID()],cctv=True,cctvCam=CCTV_W,snap=True,sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"Three on camera. TWO at the window.",'panic')],'COUNT 3',3.2,[CH('manB',.5),CH('womanR',-.4),KID()],cctv=True,cctvCam=CCTV_W,icons=[MO(10),CNT(3,2,.3)],panic=.6,sfx=[[.2,'heart'],[1.0,'heart']]),
 SF(TURN(_M,_LO),[],'LEANING OVER',.8,[CH('manB',.5),CH('womanR',-.4),KID()],snap=True,panic=.4,sfx=[[.1,'whoosh'],[.4,'creak']]),
 SF(HOLD(_LO),[L('vendor',"...Oh. A kid."),L('kid',"Hi!")],'A KID',2.8,[CH('manB',.5),CH('womanR',-.4),KID()],icons=[MO(10),CNT(3,3,.2)],sfx=[[1.5,'ping']]),
 SF(TURN(_LO,_F),[],'BACK UP',.6,[CH('manB',.5),CH('womanR',-.4),KID()],sfx=[[.1,'whoosh']]),
 SF(HOLD(_F),[L('kid',"Thanks!")],'SERVED 3',2.8,[CH('manB',.5,give=dict(t0=0,t1=.6)),CH('womanR',-.4),KID()],[dict(pose='give',item='skewer',t0=.1,t1=1.1),dict(pose='take',item='coin',t0=1.5,t1=2.6)],icons=[TK(3,[('skewer',3,0)]),MO(10,40,1.9),dict(k='stampS',t0=2.0,t1=9,x=.5,y=.56,s=.8)],sfx=[[.4,'click'],[1.9,'chime']],**G),
 # ===== FINALE: the camera is pointed at the wrong place =====
 SF(HOLD(_F),[L('vendor',"Three rules. Zero problems.")],'QUIET',2.7,[PC('womanR',-3.4,Z0+1.4,to=[KX+3.6,KZ+Z0+1.4],t0=.1,t1=3.0,expr='calm')],icons=[MO(40)],sfx=FEET(7,.2,.4)),
 SF(TURN(_F,_M),[],'HABIT CHECK',.5,[],cctv=True,snap=True,cctvCam=INSIDE,cctvLabel='CAM 02 · INSIDE STALL',icons=[MO(40)],sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"One. Two.",'whisper'),L('vendor',"Two... in here?",'panic')],'COUNT 4',4.4,[VEND_C,TALL_IN],cctv=True,cctvCam=INSIDE,cctvLabel='CAM 02 · INSIDE STALL',icons=[MO(40),CNT(2,1,.3,'CAMERA 2   YOU 1')],panic=.8,sfx=[[.3,'heart'],[1.2,'heart'],[2.2,'sting']],cues=[dict(t=0,type='gate',dur=1.0),dict(t=.2,type='dread',dur=8,level=.35)]),
 SF(TURN(_M,_BK),[],'TURNING AROUND',.9,[VEND_C,TALL_IN],snap=True,panic=.8,sfx=[[.1,'whoosh'],[.4,'foot']]),
 SF(HOLD(_BK),[L('vendor',"...There's nobody.",'whisper')],'NOBODY',2.0,[VEND_C,TALL_IN],panic=.6,sfx=[[.3,'heart']]),
 SF(TURN(_BK,_MF),[],'TO THE MONITOR',.8,[VEND_C,TALL_IN],cctv=True,snap=True,cctvCam=INSIDE,cctvLabel='CAM 02 · INSIDE STALL',panic=.8,sfx=[[.1,'whoosh']]),
 SF(HOLD(_MF),[L('tall',"Count again.",'low')],'THE FACE',3.2,[VEND_C,TALL_IN],cctv=True,cctvCam=INFACE,cctvLabel='CAM 02 · INSIDE STALL',flash=[0,.25,.8,'#d8ffe8'],lead=.8,panic=1.0,scare=True,sfx=[[0,'sting'],[.05,'heart']],cues=[dict(t=0,type='stinger',level=.95)]),
 CARDSHOT(dict(type='rules',top='NEXT NIGHT',items=['NIGHT 4','COUNT YOURSELF','NOBODY LEAVES']),L('vendor',"Night four. Count yourself.",'whisper'),3.6,[[.3,'click'],[1.0,'click'],[1.7,'click']]),
]
for s in shots:s['typed']=True
EP=dict(id='ks3',series='MIDNIGHT SKEWERS',title='NIGHT 3',part=0,of=0,shots=shots,safe=True,th={},blip=False)
