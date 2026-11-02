"""cast test: man / woman side by side (not for release). python build_rc.py episodes/cast.py --w 540 --h 960 --clean --stills mid"""
import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from batch import HOLD,SF,WM,KX,KZ,_F,_FC,_FC2
P=lambda who,x,**k:{**dict(who=who,pos=[KX+x,KZ+2.6],expr='smile',tilt=0),**WM,**k}
CL=([KX,1.65,KZ-.7],[KX,1.5,KZ+2.8])
shots=[
 SF(HOLD(([KX,1.7,KZ+.2],[KX,1.4,KZ+2.8])),[],'BOTH',2.0,[P('man',-.45),P('woman',.45)],fov=60),
 SF(HOLD(_FC),[],'MAN',2.0,[P('man',.1)]),
 SF(HOLD(_FC2),[],'WOMAN',2.0,[P('woman',-.1)]),
 SF(HOLD(_FC),[],'MANB BIG',2.0,[P('manB',.1,hs=1.9)]),
 SF(HOLD(_FC2),[],'WOMAN BIG',2.0,[P('woman',-.1,hs=1.9)]),
]
for s in shots:s['typed']=True
EP=dict(id='cast',series='MIDNIGHT SKEWERS',title='CAST',part=0,of=0,shots=shots,safe=True,th={},blip=False)
