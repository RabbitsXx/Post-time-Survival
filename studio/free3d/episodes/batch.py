import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from rc_common import *
SER='REMAIN CALM'
TILL=CAM([-4.4,1.4,7.4],[-7.2,1.2,13.4],[-4.6,1.4,8.0],[-7.2,1.2,13.4])
GUS=CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4])
FRONT=CAM([5.4,1.3,Z],[9.6,1.2,Z])
WIDE=CAM([12.0,1.5,Z+.2],[0,1.25,Z-.1],[11.4,1.5,Z+.2],[0,1.25,Z-.1])
CONC=CAM([4.0,1.6,3.0],[-1.0,1.2,12.0],[3.4,1.6,3.4],[-1.0,1.2,12.0])
QUEUE=CAM([-3.2,1.45,6.6],[-7.0,1.2,13.6],[-3.6,1.45,7.2],[-7.0,1.2,13.6])
PROF=CAM([9.1,1.3,1.45],[9.1,1.2,Z])
NT='FRESHWAY 24H · 3:07 AM'; AI='AISLE 9 · CANNED GOODS'; SC='SELF-CHECKOUT · LANE 2'; XL='EXPRESS LANE · 10 ITEMS OR FEWER'
EPS={}
def ep(k,title,shots):EPS[k]=dict(id=k,series=SER,title=title,part=0,of=0,shots=shots)
TL=lambda **k:dict(face=[CO,15.0],**k)
# g1 self-checkout
ep('g1','SELF-CHECKOUT',[
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'smile',**{'face':[CO,15.0]})],[L('machine',"Please scan your first item.")],SC,fov=34,min=2.4,sfx=[[.3,'beep']]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'worried',face=[CO,15.0]),ch('z1',CO-6.0,11.4,'calm',to=[CO-3.0,11.0],t0=0,t1=2.6,act='reach',face=[CO-3.0,11.0])],[L('machine',"Unexpected item in the bagging area.")],SC,fov=34,min=3.0,sfx=[[.2,'beep'],[.6,'foot'],[1.3,'foot'],[2.0,'foot']],cues=[dict(t=.5,type='tick')]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'shock',face=[CO,15.0]),ch('z1',CO-3.0,11.0,'calm',face=[CO,15.0])],[L('gus',"Mimi. It says there's an unexpected item."),L('mimi',"Sir, please wait for assistance.")],SC,fov=34,min=4.4),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'shock',face=[CO,15.0]),ch('z1',CO-3.0,11.0,'calm',face=[CO,15.0])],[L('gus',"He's... waiting?"),L('mimi',"Everyone waits for assistance.")],SC,fov=34,min=3.8,cues=[dict(t=2.6,type='stinger',level=.4)])])
# g2 express lane
ep('g2','EXPRESS LANE',[
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z2',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('zombie',"Eleven.")],XL,fov=34,min=2.4,sfx=[[0,'groan']]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z2',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('mimi',"Ten items or fewer, sir.")],XL,fov=34,min=2.6),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z2',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('zombie',"Please.")],XL,fov=34,min=2.0,sfx=[[0,'groan']]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z2',CO-1.6,11.0,'calm',to=[CO-5.6,11.4],t0=.8,t1=3.6,act='reach')],[L('mimi',"Lane four is open.")],XL,fov=34,min=4.4,sfx=[[1.2,'foot'],[1.9,'foot'],[2.6,'foot'],[3.2,'foot']])])
# g3 smartwatch
ZG=lambda x,z,t0=0:ch('z2',x,z,'calm',face=[6.4,Z])
ep('g3','SMARTWATCH',[
 S(GUS,[ch('gus',6.4,Z,'smile')],[L('gus',"I'm calm. I'm completely calm."),L('watch',"Heart rate: one sixty. Time to breathe.")],AI,fov=38,min=5.0,sfx=[[2.6,'beep']],cues=[dict(t=3.2,type='tick')]),
 S(GUS,[ch('gus',6.4,Z,'scared',act='scared'),ch('z2',8.4,Z-.4,'calm',face=[6.4,Z]),ch('z3',9.6,Z+.3,'calm',face=[6.4,Z])],[L('gus',"They're coming!"),L('watch',"You are not calm.")],AI,fov=44,grade='alarm',min=3.6,sfx=[[.6,'groan']]),
 S(GUS,[ch('gus',6.4,Z,'worried'),ch('z2',7.6,Z-.4,'calm',face=[6.4,Z])],[L('gus',"In... and out..."),L('watch',"Heart rate: seventy. Great job.")],AI,fov=40,grade='cold',min=5.0,sfx=[[1.2,'exhale']],cues=[dict(t=0,type='gate',dur=1.6)]),
 S(GUS,[ch('gus',6.4,Z,'smile'),ch('z2',7.6,Z-.4,'calm',face=[6.4,Z])],[L('watch',"Time to breathe.")],AI,fov=40,min=2.6,sfx=[[.1,'beep']],cues=[dict(t=0.6,type='stinger',level=.4)])])
# g4 employee of the month
ep('g4','EMPLOYEE OF THE MONTH',[
 CARD('EMPLOYEE OF THE MONTH',['CAPTAIN CARROT','REASON: NEVER PANICS','PERK: ONE FREE CARROT'],L('pa',"This month's employee of the month: Captain Carrot, for never panicking."),min=6.4,sfx=[[.3,'chime'],[1.4,'click'],[2.6,'click'],[3.8,'click']]),
 S(TILL,[ch('carrot',CO+.9,14.6,'calm'),ch('mimi',CO+2.4,14.4,'smile'),ch('gus',CO+3.2,12.6,'worried',face=[CO+.9,14.6])],[L('gus',"I've worked here three years!"),L('mimi',"He's never run.")],'FRESHWAY 24H · BREAK ROOM NOTICE',fov=38,min=4.2,sfx=[[.4,'rattle']]),
 S(TILL,[ch('carrot',CO+.9,14.6,'calm')],[],'FRESHWAY 24H',fov=30,min=2.0,cues=[dict(t=0.2,type='motif',detune=.3,level=.2)])])
# g5 fire drill
ep('g5','FIRE DRILL',[
 S(WIDE,[ch('mimi',9.4,Z-.6,'smile',face=[-12,Z]),ch('gus',8.0,Z+.5,'worried',face=[-12,Z]),ch('teddy',6.8,Z-.2,'smile',face=[-12,Z]),ch('z2',2.0,Z+.1,'calm'),ch('z3',-.6,Z-.7,'calm'),ch('z4',-3.0,Z+.5,'calm')],[L('pa',"This is a fire drill. Please remain calm.")],AI,fov=46,min=4.2,sfx=[[0,'alarm']],cues=[dict(t=0,type='tick')]),
 S(CONC,[ch('z3',-2.4,6.6,'calm',to=[-.4,12.0],t0=0,t1=4.6,act='reach'),ch('z4',-3.4,5.4,'calm',to=[-.8,11.0],t0=.3,t1=4.8,act='reach'),ch('mimi',1.2,4.2,'smile',to=[.2,9.2],t0=.4,t1=5.0,act='walk'),ch('gus',2.2,3.2,'worried',to=[.8,8.0],t0=.6,t1=5.0,act='walk')],[L('pa',"Please proceed to the nearest exit in a single file.")],'CONCOURSE',fov=48,min=5.2,sfx=[[.6,'foot'],[1.4,'foot'],[2.2,'foot'],[3.0,'foot'],[3.8,'foot']]),
 S(FRONT,[ch('mimi',9.4,Z,'smile'),ch('gus',8.2,Z+.3,'shock')],[L('gus',"Why are they in front?"),L('mimi',"They're very good at drills.")],AI,fov=42,min=4.4)])
# g6 manager
ep('g6','THE MANAGER',[
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('zombie',"Manager.")],'CUSTOMER SERVICE',fov=34,min=2.2,sfx=[[0,'groan']]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('mimi',"I'm the manager.")],'CUSTOMER SERVICE',fov=34,min=2.2),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-1.6,11.0,'calm',face=[CO,15.0])],[],'CUSTOMER SERVICE',fov=30,grade='dead',min=2.6,cues=[dict(t=0,type='gate',dur=2.4),dict(t=.3,type='tick'),dict(t=1.4,type='tick')]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-1.6,11.0,'calm',face=[CO,15.0])],[L('mimi',"Six years of customer service.")],'CUSTOMER SERVICE',fov=34,min=3.0),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-1.6,11.0,'calm',to=[CO-5.6,11.4],t0=1.0,t1=3.2,act='reach')],[L('zombie',"One star.")],'CUSTOMER SERVICE',fov=34,min=4.0,sfx=[[1.4,'foot'],[2.1,'foot'],[2.8,'foot']])])
# g7 Teddy
ep('g7','IS THIS A GAME?',[
 S(GUS,[ch('teddy',6.4,Z,'smile',prop='can'),ch('z2',8.0,Z-.3,'calm',face=[6.4,Z])],[L('teddy',"Is this a game?")],AI,fov=40,min=2.6,sfx=[[.2,'groan']]),
 S(GUS,[ch('teddy',6.4,Z,'smile',prop='can'),ch('z2',7.6,Z-.3,'calm',face=[6.4,Z])],[L('teddy',"Want a juice box?"),L('gus',"Teddy, don't feed him!")],AI,fov=40,min=4.0),
 S(GUS,[ch('teddy',6.4,Z,'smile',prop='can'),ch('z2',7.2,Z-.3,'calm',face=[6.4,Z])],[L('teddy',"He said thanks.")],AI,fov=36,min=2.4,sfx=[[.6,'groan']]),
 S(GUS,[ch('gus',6.4,Z,'shock',act='scared')],[L('gus',"He did NOT say thanks!")],AI,fov=36,grade='alarm',min=2.6,cues=[dict(t=0,type='stinger',level=.5)])])
# i1 supermarket 3AM
ep('i1',"IF THE DEAD SMELL FEAR",[
 S(WIDE,[ch('gus',7.6,Z+.5,'smile',face=[-12,Z]),ch('z2',2.4,Z+.1,'calm'),ch('z3',.0,Z-.7,'calm'),ch('z4',-2.4,Z+.5,'calm')],[L('narrator',"If the zombie apocalypse starts while you're at the supermarket at three AM, do not run.")],NT,fov=46,min=5.6,sfx=[[0,'chime']],cues=[dict(t=0,type='motif',detune=0,level=.22)]),
 S(CAM([13,1.45,Z],[0,1.2,Z],[12.4,1.45,Z],[0,1.2,Z]),[ch('gus',3.5,Z,'shock',to=[9.5,Z],t0=.1,t1=1.9,act='run'),ch('z2',-1.2,Z+.1,'calm',to=[4.2,Z+.1],t0=.1,t1=2.0,act='run'),ch('z3',-3.6,Z-.6,'calm',to=[2.0,Z-.6],t0=.1,t1=2.0,act='run'),ch('z4',-5.4,Z+.5,'calm',to=[.6,Z+.5],t0=.1,t1=2.0,act='run')],[L('narrator',"They hunt fear. Running is fear in motion.")],AI,fov=50,grade='alarm',min=4.6,sfx=[[0,'groan'],[.3,'foot'],[.7,'foot'],[1.1,'foot']],cues=[dict(t=0,type='tick'),dict(t=.6,type='tick')]),
 S(PROF,[ch('mimi',9.4,Z,'smile',face=[8.85,Z]),ch('gus',8.85,Z,'scared',face=[9.4,Z]),ch('z2',6.6,Z+.8,'calm',to=[12.2,Z+.8],t0=0,t1=4.4,act='reach'),ch('z3',7.0,Z-1.0,'calm',to=[11.6,Z-1.0],t0=.4,t1=4.6,act='reach')],[L('narrator',"Walk. Slow your breathing. In for four. Out for six.")],FR if False else 'AISLE 9 · FRONT',fov=74,grade='dead',min=6.0,sfx=[[.4,'foot'],[1.0,'foot'],[1.6,'foot'],[2.2,'foot']],cues=[dict(t=0,type='gate',dur=3.4)]),
 CARD('IF THE DEAD SMELL FEAR',['FEAR = TARGET','CALM = INVISIBLE','NEVER RUN'],L('narrator',"Calm isn't a feeling. It's a skill you can practice."),min=5.4,sfx=[[.3,'click'],[1.9,'click'],[3.5,'click']])])
# i3 checkout line
ep('i3',"IF THE DEAD SMELL FEAR · LINE",[
 S(QUEUE,[ch('gus',CO-1.6,11.0,'smile',face=[CO,15.0]),ch('z1',CO-1.6,9.8,'calm',face=[CO,15.0]),ch('z2',CO-1.7,8.8,'calm',face=[CO,15.0]),ch('z3',CO-1.5,7.8,'calm',face=[CO,15.0])],[L('narrator',"If the zombie apocalypse starts while you're in the checkout line, don't look back.")],'CHECKOUT · LANE 3',fov=46,min=5.4,cues=[dict(t=3.4,type='tick')]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'worried',face=[CO,15.0]),ch('z1',CO-1.6,9.6,'calm',face=[CO,15.0])],[L('mimi',"Did you find everything okay?"),L('gus',"There's... a line behind me.")],'CHECKOUT · LANE 3',fov=34,min=4.4),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'worried',face=[CO,15.0]),ch('z1',CO-1.6,9.6,'calm',face=[CO,15.0])],[L('mimi',"Smile. Breathe out. Don't turn around.")],'CHECKOUT · LANE 3',fov=34,grade='dead',min=4.0,cues=[dict(t=0,type='gate',dur=2.0)]),
 S(TILL,[ch('mimi',CO+.9,14.6,'smile'),ch('gus',CO-1.6,11.0,'smile',to=[CO+3.4,10.0],t0=.2,t1=2.0,act='walk',face=[CO,15.0]),ch('z1',CO-.4,11.2,'calm',face=[CO,15.0],to=[CO-1.6,11.0],t0=1.4,t1=2.4,act='walk')],[L('mimi',"Next."),L('narrator',"Pay. Smile. Walk out slowly.")],'CHECKOUT · LANE 3',fov=34,min=5.2,sfx=[[.2,'beep'],[1.2,'foot']])])

# ---- till clips re-staged: A = cashier angle (verified hook frame), B = customer angle (verified Teddy frame) ----
A=CAM([-5.0,1.45,9.8],[-6.0,1.5,14.6],[-5.1,1.45,10.4],[-6.0,1.5,14.6]);TILL=A;B=CAM([-4.6,1.25,12.4],[-5.6,1.15,9.0])
MI=lambda e='smile':ch('mimi',CO+.9,14.6,e)
FC=[-4.6,12.4]
cus=lambda w,e='smile',**k:ch(w,-5.6,9.2,e,face=FC,**k)
ep('g1','SELF-CHECKOUT',[
 S(A,[MI()],[L('machine',"Please scan your first item.")],SC,fov=23,min=2.4,sfx=[[.3,'beep']]),
 S(B,[cus('gus'),ch('z1',-9.6,9.4,'calm',to=[-6.4,9.3],t0=0,t1=2.4,act='reach',face=[-5.6,9.2])],[L('machine',"Unexpected item in the bagging area.")],SC,fov=36,min=3.0,sfx=[[.2,'beep'],[.6,'foot'],[1.3,'foot'],[2.0,'foot']],cues=[dict(t=.5,type='tick')]),
 S(B,[cus('gus','shock'),ch('z1',-6.15,9.4,'calm',face=[-5.6,9.2])],[L('gus',"Mimi. It says there's an unexpected item.")],SC,fov=36,min=3.2),
 S(A,[MI()],[L('mimi',"Sir, please wait for assistance.")],SC,fov=23,min=2.8),
 S(B,[cus('gus','shock'),ch('z1',-6.15,9.4,'calm',face=[-5.6,9.2])],[L('gus',"He's... waiting?")],SC,fov=36,min=2.2),
 S(A,[MI()],[L('mimi',"Everyone waits for assistance.")],SC,fov=23,min=3.2,cues=[dict(t=2.0,type='stinger',level=.4)])])
ep('g2','EXPRESS LANE',[
 S(B,[cus('z2','calm')],[L('zombie',"Eleven.")],XL,fov=36,min=2.4,sfx=[[0,'groan']]),
 S(A,[MI()],[L('mimi',"Ten items or fewer, sir.")],XL,fov=23,min=2.6),
 S(B,[cus('z2','calm')],[L('zombie',"Please.")],XL,fov=36,min=2.0,sfx=[[0,'groan']]),
 S(A,[MI()],[L('mimi',"Lane four is open.")],XL,fov=23,min=2.4),
 S(B,[ch('z2',-5.6,9.2,'calm',to=[-9.6,9.0],t0=.4,t1=3.0,act='reach',face=[-9.6,9.0])],[],XL,fov=36,min=3.4,sfx=[[.8,'foot'],[1.5,'foot'],[2.2,'foot']])])
ep('g6','THE MANAGER',[
 S(B,[cus('z1','calm')],[L('zombie',"Manager.")],'CUSTOMER SERVICE',fov=36,min=2.2,sfx=[[0,'groan']]),
 S(A,[MI()],[L('mimi',"I'm the manager.")],'CUSTOMER SERVICE',fov=23,min=2.2),
 S(B,[cus('z1','calm')],[],'CUSTOMER SERVICE',fov=32,grade='dead',min=2.6,cues=[dict(t=0,type='gate',dur=2.4),dict(t=.3,type='tick'),dict(t=1.4,type='tick')]),
 S(A,[MI()],[L('mimi',"Six years of customer service.")],'CUSTOMER SERVICE',fov=23,min=3.0),
 S(B,[ch('z1',-5.6,9.2,'calm',to=[-9.6,9.0],t0=1.2,t1=3.4,act='reach',face=[-9.6,9.0])],[L('zombie',"One star.")],'CUSTOMER SERVICE',fov=36,min=4.2,sfx=[[1.6,'foot'],[2.3,'foot'],[3.0,'foot']])])
ep('i3',"IF THE DEAD SMELL FEAR · LINE",[
 S(B,[cus('gus'),ch('z1',-5.7,8.0,'calm',face=[-5.6,12.4]),ch('z2',-5.4,6.9,'calm',face=[-5.6,12.4]),ch('z3',-5.8,5.8,'calm',face=[-5.6,12.4])],[L('narrator',"If the zombie apocalypse starts while you're in the checkout line, don't look back.")],'CHECKOUT · LANE 3',fov=40,min=5.6,cues=[dict(t=3.6,type='tick')]),
 S(A,[MI()],[L('mimi',"Did you find everything okay?")],'CHECKOUT · LANE 3',fov=23,min=2.6),
 S(B,[cus('gus','worried'),ch('z1',-5.7,8.0,'calm',face=[-5.6,12.4])],[L('gus',"There's... a line behind me.")],'CHECKOUT · LANE 3',fov=36,min=2.6),
 S(A,[MI()],[L('mimi',"Smile. Breathe out. Don't turn around.")],'CHECKOUT · LANE 3',fov=23,grade='dead',min=3.6,cues=[dict(t=0,type='gate',dur=1.6)]),
 S(B,[ch('gus',-5.6,9.2,'smile',to=[-3.0,11.0],t0=.4,t1=2.4,act='walk',face=[-3.0,11.0]),ch('z1',-5.7,8.0,'calm',to=[-5.6,9.2],t0=1.6,t1=2.6,act='walk',face=[-5.6,12.4])],[L('mimi',"Next."),L('narrator',"Pay. Smile. Walk out slowly.")],'CHECKOUT · LANE 3',fov=36,min=5.0,sfx=[[.2,'beep'],[1.2,'foot']])])
EPS['g4']['shots'][1]=S(A,[ch('carrot',CO+.9,14.6,'calm'),ch('mimi',CO+2.2,15.2,'smile')],[L('gus',"I've worked here three years!"),L('mimi',"He's never run.")],'FRESHWAY 24H · BREAK ROOM NOTICE',fov=23,min=4.2,sfx=[[.4,'rattle']])

ep('i2',"IF THE DEAD SMELL FEAR · BABY",[
 S(CAM([5.5,1.3,Z-.2],[8.4,1.2,Z]),[ch('rosa',8.4,Z,'worried',prop='baby',face=[0,Z]),ch('mimi',9.3,Z-.3,'smile',face=[0,Z])],[L('narrator',"If the zombie apocalypse starts while you're holding a crying baby, do not shush it. Breathe.")],'AISLE 9 · FRONT',fov=36,grade='alarm',min=6.0,sfx=[[0,'cry']]),
 S(CAM([9.4,1.3,1.5],[8.2,1.2,Z]),[ch('mimi',9.1,Z,'smile',face=[8.2,Z]),ch('rosa',8.2,Z,'scared',prop='baby',face=[7.3,Z]),ch('z2',7.2,Z,'calm',face=[8.2,Z])],[L('narrator',"The dead smell fear. Slow breathing is how you hide it.")],'AISLE 9 · FRONT',fov=58,grade='dead',min=5.0,cues=[dict(t=0,type='gate',dur=2.6),dict(t=.3,type='tick'),dict(t=1.6,type='tick')]),
 CARD('BOX BREATHING',['BREATHE IN · 4','HOLD · 4','BREATHE OUT · 4','HOLD · 4'],L('narrator',"Box breathing. In for four. Hold four. Out for four. Hold four."),min=7.0,sfx=[[.3,'click'],[1.9,'click'],[3.4,'click'],[4.9,'click']]),
 S(CAM([5.5,1.3,Z-.2],[8.4,1.2,Z]),[ch('rosa',8.4,Z,'smile',prop='baby',face=[0,Z]),ch('mimi',9.3,Z-.3,'smile',face=[0,Z])],[L('narrator',"Slow breaths calm you. And often, the baby too.")],'AISLE 9 · FRONT',fov=36,grade='warm',min=4.4,sfx=[[.6,'exhale']],cues=[dict(t=0,type='motif',detune=.3,level=.2)])])
