"""MIDNIGHT SKEWERS pilot: 'game feel' test shot (white-glove hands, order ticket + money, big-head customer, CCTV gag).
python build_rc.py episodes/pilot.py --w 1080 --h 1920 --clean"""
import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import batch as B
from batch import HOLD,TURN,SF,L,WM,KX,KZ,_F,_G,_M,_FC
_C=lambda **k:{**dict(who='manB',pos=[KX+.1,KZ+2.6],expr='smile',hs=1.9,tilt=.35),**WM,**k}
TK=lambda d1,d2,t0=-1:dict(k='ticket',x=.54,y=.10,t0=t0,t1=40,id='#001',items=[dict(what='skewer',n=2,d=d1),dict(what='tea',n=1,d=d2)])
MO=lambda v0,v1=None,tm=None:dict(k='money',x=.54,y=.232,t0=-1,t1=40,v0=v0,v1=v0 if v1 is None else v1,tm=tm)
shots=[
 SF(HOLD(_F),[L('uncle',"Two skewers, one tea.")],'ORDER UP',2.6,[_C(tilt=[-.35,.35])],icons=[TK(None,None,.15),MO(0)],cues=[dict(t=0,type='bed',dur=16,level=.2)],sfx=[[.1,'click']]),
 SF(HOLD(_G),[L('vendor',"Coming up.")],'GRILL',2.4,[_C()],[dict(pose='grill',item='skewer',t0=.3,t1=2.1)],glove=True,icons=[TK(1.7,None),MO(0)],sfx=[[0,'whoosh'],[.3,'sizzle'],[1.7,'click']]),
 SF(HOLD(_F),[],'ICED TEA',2.0,[_C(tilt=[.35,-.2])],[dict(pose='pour',item='tea',t0=.2,t1=1.8)],glove=True,icons=[TK(0,1.5),MO(0)],sfx=[[.1,'whoosh'],[1.5,'click']]),
 SF(HOLD(_F),[L('uncle',"Keep the change.")],'SERVED',3.0,[_C(give=dict(t0=.5,t1=1.4))],[dict(pose='give',item='skewer',t0=0,t1=1.5),dict(pose='take',item='coin',t0=1.7,t1=2.8)],glove=True,icons=[TK(0,0),MO(0,15,1.8),dict(k='stampS',t0=2.0,t1=9,x=.5,y=.66,s=.85)],sfx=[[.3,'click'],[1.8,'chime']]),
 SF(TURN(_F,_M),[],'LOOKING AT CCTV',.5,[_C()],cctv=True,snap=True,sfx=[[.15,'click']],panic=.2),
 SF(HOLD(_M),[L('vendor',"He's not on the camera.",'whisper')],'CAMERA CHECK',2.6,[_C()],cctv=True,sfx=[[.2,'heart'],[1.3,'heart']],cues=[dict(t=0,type='dread',dur=8,level=.34),dict(t=0,type='gate',dur=1.2)],panic=.4),
 SF(TURN(_M,_F),[],'LOOKING BACK',.45,[_C(hs=1.9,tilt=0)],cctv=True,snap=True,panic=.5),
 SF(HOLD(_FC),[L('uncle',"Something wrong?",'low')],'THE GRIN',2.6,[dict(who='manB',pos=[KX+.1,KZ+2.6],expr='creep',hs=[1.9,2.7],tilt=[0,.5],**WM)],panic=.7,sfx=[[.1,'sting']],cues=[dict(t=.1,type='stinger',level=.8)]),
]
for s in shots:s['typed']=True
EP=dict(id='pilot',series='MIDNIGHT SKEWERS',title='PILOT',part=0,of=0,shots=shots,safe=True,th={},blip=False)
