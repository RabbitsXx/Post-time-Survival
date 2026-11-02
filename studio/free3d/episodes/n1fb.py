"""MIDNIGHT SKEWERS - NIGHT 1, rebuilt with the Night 2 / Night 3 engine for Facebook Reels (~60 s).  Same story as the first Night 1:
real customers show on the CCTV, the second one does not -> refuse -> shutter -> something at the shutter.  Lessons applied: NIGHT_LESSONS.md.
(The on-screen text and the post copy never say it is a rebuild.)   python build_rc.py episodes/n1fb.py --w 1080 --h 1920 --clean ; python lint_ep.py out/n1fb.spec.json"""
import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import build as BD
import ks3 as K3
from batch import HOLD,TURN,SF,L,WM,KX,KZ,_F,_G,_M,_B,_FC2
from ks2 import P,TK,MO,POW,G,CARDSHOT,Z0
from ks3 import PC,CH,WALK,CNT,CCTV_W,FEET,TITLE,_MH

def WOMAN(x=-.1,z=Z0,**k):return P('woman',x,z,**{**dict(expr='calm'),**k})              # the anomaly: P() makes her invisible to the CCTV (nocam)
NO=lambda t0=.4:CNT(0,1,t0,'ON CAMERA: NO')
YES=lambda t0=.3:CNT(1,1,t0,'ON CAMERA: YES')

shots=[
 # ===== HOOK (no talking): the whole premise in three beats =====
 SF(HOLD(_MH),[],'HOOK 1',1.4,[WOMAN(expr='smile')],cctv=True,cctvCam=CCTV_W,intro=dict(TITLE,l1='MIDNIGHT SKEWERS',l2='ON CAMERA?',t0=0,t1=1.4),sfx=[[.1,'heart'],[.7,'heart']],cues=[dict(t=0,type='riser',dur=4.2,level=.3)],panic=.4,lead=0,pad=0),
 SF(HOLD(_FC2),[],'HOOK 2',1.3,[WOMAN(expr='creep',tilt=[0,-.45])],intro=dict(TITLE,l2='NOBODY.',t0=0,t1=1.3),sfx=[[.1,'sting']],cues=[dict(t=.1,type='stinger',level=.7)],panic=.5,lead=0,pad=0),
 SF(HOLD(_B),[],'HOOK 3',1.6,[WOMAN(expr='zomb',lean=.3)],[dict(pose='press',t0=.2,t1=1.1)],cctv=True,cctvCam=CCTV_W,shutter=[0,1],intro=dict(TITLE,l2='REFUSE HER',l3='NIGHT 1',t0=0,t1=1.6),sfx=[[.45,'click'],[.7,'slam'],[1.15,'bang']],knocks=[1.15],kamp=1.0,panic=.6,lead=0,pad=0,**G),
 # ===== the rule: <= 5 s =====
 CARDSHOT(dict(type='rules',top='NIGHT SHIFT RULES',items=['SHOW ON CAMERA','SERVE THEM','REFUSE THE REST']),
          [L('vendor',"Night one. Real customers show on camera."),L('vendor',"Serve them."),L('vendor',"Refuse the rest.")],4.4,[[.3,'click'],[2.0,'click'],[3.0,'click']]),
 # ===== customer 1: real (on camera) =====
 SF(HOLD(_F),[L('man',"Ten skewers. Cook them until they stop talking.")],'CUSTOMER 1',4.6,[WALK('man',4.4,.1)],lead=2.0,icons=[TK(1,[('skewer',10,None)],2.1),MO(0)],sfx=FEET(5)+[[2.0,'ping']]),
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[CH('man',.1)],cctv=True,cctvCam=CCTV_W,snap=True,icons=[MO(0)],sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"He's on camera. Good.")],'CHECK 1',2.4,[CH('man',.1)],cctv=True,cctvCam=CCTV_W,icons=[MO(0),YES()],sfx=[[.3,'ping']]),
 SF(TURN(_M,_G),[],'TO THE GRILL',.7,[CH('man',.1)],icons=[MO(0)],sfx=[[.1,'whoosh']]),
 SF(HOLD(_G),[L('vendor',"Ten. Coming up.")],'COOKING',2.6,[CH('man',.1)],[dict(pose='grill',item='skewer',t0=.3,t1=2.4)],icons=[TK(1,[('skewer',10,2.2)]),MO(0)],sfx=[[0,'whoosh'],[.3,'sizzle'],[1.5,'sizzle'],[2.3,'click']],**G),
 SF(TURN(_G,_F),[],'BACK TO THE WINDOW',.7,[CH('man',.1,give=dict(t0=.2,t1=.7))],[dict(pose='give',item='skewer',t0=.1,t1=.7)],icons=[TK(1,[('skewer',10,0)]),MO(0)],sfx=[[.1,'whoosh']],**G),
 SF(HOLD(_F),[L('man',"Payment."),L('vendor',"...That's a leaf."),L('man',"Very valuable.")],'PAYMENT',4.4,[CH('man',.1,give=dict(t0=0,t1=.7))],[dict(pose='give',item='skewer',t0=0,t1=.8),dict(pose='take',item='leaf',t0=1.3,t1=3.0)],icons=[TK(1,[('skewer',10,0)]),MO(0),dict(k='stampS',t0=3.3,t1=9,x=.5,y=.56,s=.8)],sfx=[[.3,'click'],[3.3,'chime']],**G),
 # ===== customer 1 leaves, customer 2 arrives (nobody speaks before arriving) =====
 SF(HOLD(_F),[],'THE NEXT ONE',3.0,[PC('man',.1,Z0,to=[KX+4.9,KZ+Z0+.35],t0=0,t1=2.2,expr='smile'),WOMAN(-4.6,Z0+.35,to=[KX-.1,KZ+Z0],t0=.4,t1=2.7)],icons=[MO(0)],sfx=FEET(7,.1,.38)),
 SF(HOLD(_FC2),[L('woman',"Iced tea. Less sugar. Less... you.")],'CUSTOMER 2',3.6,[WOMAN(expr='smile',tilt=[0,-.4])],lead=.35,icons=[TK(2,[('tea',1,None)],.5),MO(0)],cues=[dict(t=0,type='tick')],sfx=[[.4,'ping']],glitch=[0,.4]),
 # ===== the check: nobody on camera =====
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[WOMAN(expr='creep',tilt=-.45)],cctv=True,cctvCam=CCTV_W,snap=True,icons=[MO(0)],sfx=[[.1,'click']]),
 SF(HOLD(_M),[L('vendor',"...No. No no no.",'panic')],'CHECK 2',2.8,[WOMAN(expr='creep',tilt=-.45)],cctv=True,cctvCam=CCTV_W,icons=[MO(0),NO(.3)],panic=.7,sfx=[[.2,'heart'],[1.2,'heart']],cues=[dict(t=0,type='gate',dur=1.2),dict(t=.1,type='dread',dur=14,level=.32)]),
 SF(TURN(_M,_F),[],'LOOKING BACK',.45,[WOMAN(expr='creep',tilt=-.45)],cctv=True,cctvCam=CCTV_W,snap=True,panic=.8),
 SF(HOLD(_F),[L('vendor',"Refuse! REFUSE!",'panic')],'REFUSED',3.0,[WOMAN(expr='zomb',lean=[.1,.35],headX=[0,.25])],[dict(pose='refuse',t0=.1,t1=2.8)],icons=[dict(k='stampR',t0=.9,t1=9,x=.5,y=.7,s=.85),NO(.1)],sfx=[[.1,'sting'],[.2,'groan']],cues=[dict(t=.1,type='stinger',level=.8)],panic=.8,**G),
 # ===== the shutter =====
 SF(TURN(_F,_B),[],'TO THE BUTTON',.6,[WOMAN(expr='zomb',lean=.35)],snap=True,panic=.8,sfx=[[.1,'whoosh']]),
 SF(HOLD(_B),[L('vendor',"Close it! Close it!",'panic')],'CLOSING',2.2,[WOMAN(expr='zomb',lean=.35)],[dict(pose='press',t0=.4,t1=1.3)],cctv=True,cctvCam=CCTV_W,shutter=[0,1],panic=.9,sfx=[[.7,'click'],[1.0,'slam']],cues=[dict(t=1.0,type='stinger',level=.6)],**G),
 SF(HOLD(_F),[L('vendor',"Don't open it.",'whisper')],'AT THE SHUTTER',3.6,[],shutter=1,flicker=True,knocks=[.3,.9,1.5,1.9,2.2,2.5],kamp=1.2,panic=.8,sfx=[[.25,'bang'],[.85,'bang'],[1.45,'scrape'],[2.4,'bang']],cues=[dict(t=0,type='riser',dur=3.6,level=.3)]),
 SF(TURN(_F,_M),[],'TO THE MONITOR',.5,[],cctv=True,cctvCam=CCTV_W,snap=True,shutter=1,flicker=True,sfx=[[.1,'click']],panic=.8),
 SF(HOLD(_M),[L('vendor',"Nothing. There's nothing there.")],'CHECK 3',2.6,[WOMAN(expr='zomb',lean=.2)],cctv=True,cctvCam=CCTV_W,shutter=1,icons=[NO(.2)],knocks=[.3,.7,1.1,1.5,1.9],kamp=.6,panic=.9,sfx=[[.25,'bang'],[.65,'bang'],[1.05,'bang'],[1.45,'bang'],[1.85,'bang']]),
 SF(TURN(_M,_F),[],'LOOKING BACK',.4,[],cctv=True,cctvCam=CCTV_W,snap=True,shutter=1,panic=.8),
 SF(HOLD(_F),[L('vendor',"...Gone.",'whisper')],'SILENCE',3.2,[],shutter=1,panic=.4,cues=[dict(t=0,type='gate',dur=3.0)],sfx=[[.9,'foot'],[1.5,'foot'],[2.1,'foot']]),
 CARDSHOT(dict(type='rules',top='NEXT NIGHT',items=['NIGHT 2','3 CUSTOMERS','SPOT THEM FIRST']),L('vendor',"Night two. Can you spot them before I do?"),3.4,[[.3,'click'],[1.0,'click'],[1.7,'click']]),
]
for s in shots:s['typed']=True
EP=dict(id='n1fb',series='MIDNIGHT SKEWERS',title='NIGHT 1',part=0,of=0,shots=shots,safe=True,th={},blip=False)
