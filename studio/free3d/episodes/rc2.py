import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from rc_common import *
T0='FRESHWAY 24H · 3:31 AM'; AI='AISLE 9 · CANNED GOODS'; FR='AISLE 9 · FRONT'
sh=[];A=sh.append
# 1 cold open on the cliffhanger: the dead have turned toward the baby and start to close in
A(S(CAM([12.0,1.5,Z+.2],[0,1.25,Z-.1],[11.4,1.5,Z+.2],[0,1.25,Z-.1]),[ch('rosa',8.6,Z+1.1,'scared',prop='baby',face=[-12,Z]),ch('gus',7.4,Z-1.0,'scared',face=[-12,Z]),ch('z2',3.2,Z+.1,'calm',to=[5.0,Z+.1],t0=0,t1=3.6,act='reach'),ch('z3',.8,Z-.7,'calm',to=[2.8,Z-.7],t0=0,t1=3.6,act='reach'),ch('z4',-1.6,Z+.6,'calm',to=[.4,Z+.6],t0=0,t1=3.6,act='reach')],[L('rosa',"He won't stop crying!")],T0,fov=46,grade='alarm',min=3.2,sfx=[[0,'cry'],[.8,'foot'],[1.6,'foot'],[2.4,'foot']],cues=[dict(t=0,type='stinger',level=.5),dict(t=.4,type='tick')]))
# 2 Mimi arrives
A(S(CAM([5.4,1.3,Z],[9.6,1.2,Z]),[ch('rosa',8.4,Z,'scared',prop='baby'),ch('mimi',11.4,Z,'smile',to=[9.6,Z],t0=0,t1=1.2,act='walk',face=[8,Z])],[L('mimi',"Rosa. Look at me.")],FR,fov=40,grade='alarm',min=2.2,sfx=[[0,'cry'],[.3,'foot'],[.7,'foot']]))
# 3 Gus panics
A(S(CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4]),[ch('gus',6.4,Z,'scared',act='scared')],[L('gus',"Do something! Smile at them!"),L('mimi',"A smile won't stop a crying baby. Breathing will.")],AI,fov=38,grade='alarm',min=4.4,sfx=[[0,'cry']]))
# 4 box breathing card
A(CARD('BOX BREATHING',['BREATHE IN · 4','HOLD · 4','BREATHE OUT · 4','HOLD · 4'],L('mimi',"Box breathing. In for four. Hold for four. Out for four. Hold for four."),min=7.2,sfx=[[.3,'click'],[1.9,'click'],[3.4,'click'],[4.9,'click']]))
# 5 the first one arrives and stops right in front of her; silence
A(S(CAM([9.4,1.3,1.5],[8.2,1.2,Z]),[ch('mimi',9.1,Z,'smile',face=[8.2,Z]),ch('rosa',8.2,Z,'scared',prop='baby',face=[7.3,Z]),ch('z2',7.2,Z,'calm',face=[8.2,Z])],[],FR,fov=58,grade='dead',min=3.6,cues=[dict(t=0,type='gate',dur=3.2),dict(t=.2,type='tick'),dict(t=1.4,type='tick'),dict(t=2.6,type='tick')],sfx=[[1.2,'foot']]))
# 6 Rosa breathes
A(S(CAM([5.5,1.3,Z-.2],[8.4,1.2,Z]),[ch('rosa',8.4,Z,'worried',prop='baby',face=[0,Z]),ch('mimi',9.3,Z-.3,'smile',face=[0,Z])],[L('mimi',"In... two, three, four. Hold. Now out, slowly.")],FR,fov=36,grade='cold',min=5.2,sfx=[[1.0,'exhale'],[3.6,'exhale']]))
# 7 the baby goes quiet
A(S(CAM([5.5,1.3,Z-.2],[8.4,1.2,Z]),[ch('rosa',8.4,Z,'smile',prop='baby',face=[0,Z]),ch('mimi',9.3,Z-.3,'smile',face=[0,Z])],[L('rosa',"He stopped. He stopped crying.")],FR,fov=36,grade='warm',min=2.8,cues=[dict(t=0,type='motif',detune=.3,level=.2)]))
# 8 the dead lose interest and drift away (silence)
A(S(CAM([12.0,1.5,Z+.2],[0,1.25,Z-.1],[11.4,1.5,Z+.2],[0,1.25,Z-.1]),[ch('rosa',8.6,Z+1.1,'smile',prop='baby',face=[-12,Z]),ch('mimi',9.6,Z-.9,'smile',face=[-12,Z]),ch('gus',7.4,Z-1.0,'worried',face=[-12,Z]),ch('z2',5.6,Z+.1,'calm',to=[-1.0,Z+.1],t0=.2,t1=4.4,act='reach'),ch('z3',3.6,Z-.7,'calm',to=[-3.4,Z-.7],t0=.2,t1=4.4,act='reach'),ch('z4',1.4,Z+.6,'calm',to=[-5.0,Z+.6],t0=.2,t1=4.4,act='reach')],[],AI,fov=46,grade='dead',min=4.4,sfx=[[.6,'foot'],[1.4,'foot'],[2.2,'foot'],[3.0,'foot']],cues=[dict(t=0,type='gate',dur=2.2)]))
# 9 Gus's turn, Carrot beside him: no flinch
A(S(CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4]),[ch('gus',6.4,Z,'worried')],[L('mimi',"Your turn, Gus."),L('gus',"In... two... three... four.")],AI,fov=38,min=4.0,sfx=[[2.0,'exhale']]))
A(S(CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4]),[ch('gus',6.4,Z,'smile'),ch('carrot',7.6,Z-.5,'calm')],[L('gus',"Hello, Carrot."),L('mimi',"Carrot doesn't breathe."),L('gus',"He's very good at it.")],AI,fov=44,min=4.6,sfx=[[.6,'rattle']]))
# 11 Vance: the lesson
A(S(CAM([-6.2,1.35,-9.6],[-6,1.1,-14],[-6.2,1.35,-9.9],[-6,1.1,-14]),[ch('vance',-6.0,-13.0,'calm',act='shush')],[L('vance',"Soldiers and surgeons use it. Calm is a skill. Skills can be taught.")],'FROZEN · DAIRY',fov=44,grade='cold',min=4.4,cues=[dict(t=0,type='motif',detune=.5,level=.2)]))
# 12 the problem: the exit is past the checkout, where the dead queue like customers
A(S(CAM([-3.2,1.45,6.6],[-7.0,1.2,13.6],[-3.6,1.45,7.2],[-7.0,1.2,13.6]),[ch('z1',CO+.2,12.2,'calm',face=[CO,15]),ch('z2',CO-.2,13.6,'calm',face=[CO,15]),ch('z3',CO+.3,15.0,'calm',face=[CO,16]),ch('z4',CO-1.6,12.8,'calm',face=[CO,15])],[L('pa',"Attention shoppers. Lane three is now open.")],'CHECKOUT · LANE 3',fov=46,grade='cold',min=3.8,sfx=[[0,'chime']],cues=[dict(t=0,type='tick')]))
A(S(CAM([5.4,1.3,Z],[9.6,1.2,Z]),[ch('mimi',9.4,Z,'smile'),ch('gus',8.2,Z+.3,'worried')],[L('mimi',"The doors are past the checkout."),L('gus',"Of course they are.")],FR,fov=42,grade='cold',min=3.6,cues=[dict(t=2.4,type='stinger',level=.6)]))
EP=dict(id='rc2',series=SER,title='BOX BREATHING',part=2,of=3,shots=sh)
