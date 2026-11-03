import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from rc_common import *
T0='FRESHWAY 24H · 5:52 AM'; FR='AISLE 9 · FRONT'; CK='CHECKOUT · LANE 3'; DR='FRONT DOORS'
sh=[];A=sh.append
# 1 plan: walk, don't run
A(S(CAM([2.2,1.35,Z],[8.6,1.2,Z]),[ch('mimi',9.6,Z,'smile'),ch('gus',8.5,Z+.5,'calm'),ch('rosa',7.6,Z-.5,'calm',prop='baby'),ch('teddy',6.8,Z+.4,'smile',prop='can')],[L('mimi',"Single file. Slow steps. Nobody runs.")],T0,fov=46,grade='cold',min=3.4,cues=[dict(t=0,type='motif',detune=0,level=.22)]))
# 2 the line of survivors crosses the concourse toward the doors (dead scattered between)
A(S(CAM([4.0,1.6,3.0],[-1.0,1.2,12.0],[3.4,1.6,3.4],[-1.0,1.2,12.0]),[ch('mimi',.2,5.6,'smile',to=[-.6,10.4],t0=0,t1=4.6,act='walk'),ch('gus',1.0,4.2,'calm',to=[.1,9.0],t0=0,t1=4.6,act='walk'),ch('rosa',1.8,3.0,'calm',prop='baby',to=[.8,7.6],t0=0,t1=4.6,act='walk'),ch('z3',-4.4,8.8,'calm',to=[-3.6,9.4],t0=0,t1=4.6,act='reach'),ch('z4',3.6,9.8,'calm',to=[3.0,10.6],t0=0,t1=4.6,act='reach')],[L('gus',"In... two... three... four.")],'CONCOURSE',fov=48,grade='cold',min=4.6,sfx=[[.4,'foot'],[1.0,'foot'],[1.6,'foot'],[2.2,'foot'],[2.8,'foot'],[3.4,'foot']],cues=[dict(t=0,type='tick'),dict(t=2.4,type='tick')]))
# 3 Teddy sneezes
A(S(CAM([3.0,1.3,8.2],[-.6,1.2,10.6]),[ch('teddy',-.6,10.6,'worried',prop='can',face=[3.0,8.2]),ch('z3',-3.4,9.8,'calm',face=[-.6,10.6])],[L('teddy',"Ah... ah... ACHOO!")],'CONCOURSE',fov=36,min=2.6,sfx=[[1.4,'thump']],cues=[dict(t=1.4,type='stinger',level=.5)]))
# 4 the dead turn... sniff... and shrug it off
A(S(CAM([3.0,1.4,8.0],[-3.2,1.2,10.0]),[ch('z3',-3.0,9.8,'calm',face=[3.0,8.0]),ch('z4',-5.4,9.0,'calm',face=[3.0,8.0])],[L('mimi',"That's not fear. That's a sneeze.")],'CONCOURSE',fov=36,grade='dead',min=3.4,cues=[dict(t=0,type='gate',dur=2.0),dict(t=.2,type='tick')]))
# 5 the doors: carts jammed
A(S(CAM([0.0,1.4,11.0],[0.0,1.3,16.6]),[ch('gus',-.6,14.6,'worried',act='grab',face=[0,17]),ch('mimi',.8,14.8,'smile',act='grab',face=[0,17])],[L('gus',"Help me move them. Quietly.")],DR,fov=44,min=3.2,sfx=[[.8,'rattle'],[1.8,'rattle']]))
# 6 outside the glass: the dead on the street, Gus sees them
A(S(CAM([.8,1.35,12.4],[.8,1.2,15.2]),[ch('gus',.8,15.2,'scared',act='scared',face=[.8,10])],[L('gus',"There are so many of them.")],DR,fov=32,grade='alarm',min=2.8,sfx=[[0,'groan'],[1.2,'groan']],cues=[dict(t=0,type='riser',dur=2.0,level=.3)]))
# 7 Mimi's smile cracks
A(S(CAM([.8,1.35,12.8],[.8,1.2,15.0]),[ch('mimi',.8,15.0,'worried',face=[.8,12])],[L('mimi',"Gus... I can't stop shaking.")],DR,fov=30,grade='cold',min=3.2,cues=[dict(t=0,type='gate',dur=1.2)],sfx=[[.4,'heart']]))
# 8 Gus coaches Mimi (profile two-shot)
A(S(CAM([.45,1.3,10.8],[.45,1.2,14.4]),[ch('mimi',-.1,14.4,'scared',face=[.9,14.4]),ch('gus',1.0,14.4,'calm',face=[-.1,14.4])],[L('gus',"Look at me. In for four. Hold. Out for four.")],DR,fov=50,grade='cold',min=5.0,sfx=[[1.8,'exhale'],[4.0,'exhale']]))
# 9 5-4-3-2-1 grounding
A(S(CAM([.45,1.3,10.8],[.45,1.2,14.4]),[ch('mimi',-.1,14.4,'smile',face=[.9,14.4]),ch('gus',1.0,14.4,'calm',face=[-.1,14.4]),ch('carrot',2.6,15.6,'calm',face=[.45,11])],[L('gus',"Name five things you can see."),L('mimi',"You. Teddy. Rosa. The baby."),L('mimi',"And one very calm carrot.")],DR,fov=50,grade='warm',min=6.0,cues=[dict(t=0,type='motif',detune=.3,level=.2)]))
# 11 doors open: they walk out into the dawn (camera outside)
A(S(CAM([0.0,1.4,24.0],[0.0,1.3,17.4],[0.0,1.45,23.0],[0.0,1.3,17.4]),[ch('mimi',-.5,17.8,'smile',to=[-.7,21.0],t0=.2,t1=4.4,act='walk',face=[0,25]),ch('gus',.5,17.6,'smile',to=[.5,20.6],t0=.2,t1=4.4,act='walk',face=[0,25]),ch('rosa',-1.6,17.4,'smile',prop='baby',to=[-1.8,20.4],t0=.2,t1=4.4,act='walk',face=[0,25]),ch('teddy',1.6,17.4,'smile',prop='can',to=[1.8,20.2],t0=.2,t1=4.4,act='walk',face=[0,25])],[],'STREET · 6:04 AM',fov=44,grade='warm',min=4.8,sfx=[[0,'creak'],[.8,'foot'],[1.4,'foot'],[2.0,'foot'],[2.6,'foot']],cues=[dict(t=0,type='motif',detune=0,level=.25)]))
# 12 rules finale
A(CARD('RULES OF THE NIGHT SHIFT',['FEAR = TARGET','CALM = INVISIBLE','NEVER RUN','BREATHE IN A BOX'],L('gus',"Rule four: breathe in a box. And when you can, help someone else breathe."),min=7.0,sfx=[[.3,'click'],[1.5,'click'],[2.7,'click'],[3.9,'click']]))
# 13 coda: the till, the dead customer with a coupon
A(S(CAM([-5.2,1.4,8.0],[-6.0,1.2,14.6],[-5.3,1.4,8.7],[-6.0,1.2,14.6]),[ch('carrot',CO+.9,14.6,'calm'),ch('z1',CO-.2,15.8,'calm',face=[CO+.9,14.6])],[L('pa',"Thank you for shopping at Freshway. Have a nice day.")],'FRESHWAY 24H · 6:12 AM',fov=34,min=3.6,sfx=[[.1,'beep']],cues=[dict(t=2.6,type='stinger',level=.5)]))
EP=dict(id='rc3',series=SER,title='THE LAST CUSTOMER',part=3,of=3,shots=sh)
