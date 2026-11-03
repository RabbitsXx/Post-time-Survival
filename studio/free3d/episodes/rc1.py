import sys,os;sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SER='REMAIN CALM'
Z=-0.6                      # centre of aisle between rows (z -3.4 and 2.2)
def ch(who,x,z,expr='calm',**k):return dict(who=who,pos=[x,z],expr=expr,**k)
def L(who,en):return (who,en)
def S(cam,chars,lines=(),place='',fov=40,grade='calm',min=2.4,sfx=(),cues=(),pad=.3,lead=.25,**k):
    return dict(cam=cam,chars=list(chars),lines=list(lines),place=place,fov=fov,grade=grade,min=min,sfx=list(sfx),cues=list(cues),pad=pad,lead=lead,**k)
def CAM(a,b,c=None,d=None):return [a,b,c or a,d or b]
T0='FRESHWAY 24H · 2:47 AM'
sh=[];A=sh.append
CO=-7.0   # checkout lane x
# 1 HOOK: Mimi smiles at the till, a zombie shuffles past right behind her; nobody reacts
A(S(CAM([-5.2,1.4,8.0],[-6.0,1.2,14.6],[-5.3,1.4,8.7],[-6.0,1.2,14.6]),[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO-2.2,16.0,'calm',to=[CO+3.6,16.0],t0=0,t1=3.4,act='reach')],[L('mimi',"Thanks for shopping at Freshway. Have a nice day!")],T0,fov=34,min=3.6,sfx=[[.1,'beep'],[.4,'foot'],[1.0,'foot'],[1.6,'foot'],[2.2,'foot']],cues=[dict(t=0,type='motif',detune=0,level=.22)]))
# 2 Teddy reaction (front)
A(S(CAM([-4.6,1.25,12.4],[-5.6,1.15,9.0]),[ch('teddy',-5.6,9.2,'smile')],[L('teddy',"Cool costume, mister!")],T0,fov=36,min=2.2,sfx=[[0.2,'click']]))
# 3 PA + bomb under the table: zombies drift down the aisle toward Gus who has his back to them
A(S(CAM([12.5,1.5,Z],[-3,1.3,Z],[11.8,1.5,Z],[-3,1.3,Z]),[ch('gus',7.2,Z,'smile',face=[-12,Z]),ch('z2',-4.2,Z+.1,'calm',to=[-1.4,Z+.1],t0=0,t1=4,act='reach'),ch('z3',-6.8,Z-.7,'calm',to=[-4.0,Z-.7],t0=0,t1=4,act='reach'),ch('z4',-8.8,Z+.5,'calm',to=[-6.2,Z+.5],t0=0,t1=4,act='reach')],[L('pa',"Attention shoppers. Please remain calm, and enjoy your shopping.")],'AISLE 9 · CANNED GOODS',fov=48,min=4.0,sfx=[[0,'chime'],[1.8,'foot'],[2.6,'foot']],cues=[dict(t=3.0,type='tick')]))
# 4 Gus on his phone (front)
A(S(CAM([3.3,1.3,Z],[7.2,1.15,Z]),[ch('gus',7.2,Z,'smile',prop='phone',propSide=1)],[L('gus',"Ha! Raccoon in a hat.")],'AISLE 9 · CANNED GOODS',fov=38,min=2.4))
# 5 rule of three: Carrot sneaks up behind Gus
A(S(CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4]),[ch('gus',6.4,Z,'worried'),ch('carrot',8.6,Z-.5,'calm')],[L('gus',"Mimi says stay calm. I'm calm. I'm the calmest guy here.")],'AISLE 9 · CANNED GOODS',fov=44,min=3.4,sfx=[[1.0,'rattle']]))
A(S(CAM([10.8,1.4,Z],[3,1.2,Z]),[ch('gus',6.6,Z,'worried',face=[12,Z])],[L('gus',"Hello?")],'AISLE 9 · CANNED GOODS',fov=40,min=1.8))
A(S(CAM([3.4,1.3,Z+.3],[7.3,1.15,Z-.4]),[ch('gus',6.4,Z,'smile'),ch('carrot',7.6,Z-.5,'calm')],[L('gus',"See? Nothing. Everything's fine.")],'AISLE 9 · CANNED GOODS',fov=44,min=2.8,sfx=[[.8,'rattle']]))
A(S(CAM([10.8,1.4,Z],[3,1.2,Z]),[ch('gus',6.6,Z,'worried',face=[12,Z])],[L('gus',"Hello?")],'AISLE 9 · CANNED GOODS',fov=40,min=1.8))
# third time: Carrot is RIGHT there. silence.
A(S(CAM([8.9,1.35,Z-.2],[6.7,1.1,Z]),[ch('gus',5.9,Z,'calm',face=[12,Z]),ch('carrot',6.9,Z,'calm')],[],'AISLE 9 · CANNED GOODS',fov=34,min=2.6,cues=[dict(t=0,type='gate',dur=2.4),dict(t=.2,type='riser',dur=2.0,level=.3)]))
A(S(CAM([3.2,1.3,Z],[6.4,1.15,Z]),[ch('gus',6.4,Z,'shock',act='scared')],[L('gus',"AAAAAAAAH!")],'AISLE 9 · CANNED GOODS',fov=36,grade='alarm',min=1.8,lead=.05,sfx=[[0,'sting']],cues=[dict(t=0,type='stinger',level=.8)]))
# 11 zombies charge the fear
A(S(CAM([13,1.45,Z],[0,1.2,Z],[12.4,1.45,Z],[0,1.2,Z]),[ch('gus',3.5,Z,'shock',to=[9.5,Z],t0=.1,t1=1.9,act='run'),ch('z2',-1.2,Z+.1,'calm',to=[4.2,Z+.1],t0=.1,t1=2.0,act='run'),ch('z3',-3.6,Z-.6,'calm',to=[2.0,Z-.6],t0=.1,t1=2.0,act='run'),ch('z4',-5.4,Z+.5,'calm',to=[.6,Z+.5],t0=.1,t1=2.0,act='run')],[],'AISLE 9 · CANNED GOODS',fov=50,grade='alarm',min=2.0,lead=.0,sfx=[[0,'groan'],[.2,'foot'],[.5,'foot'],[.8,'foot'],[1.1,'foot']],cues=[dict(t=0,type='tick'),dict(t=.6,type='tick')]))
# 12 Mimi arrives at the aisle mouth and shouts the rule; Gus runs up behind
A(S(CAM([5.2,1.3,Z],[10.4,1.2,Z]),[ch('mimi',10.2,Z,'shock',act='hands'),ch('gus',6.4,Z+.4,'shock',to=[8.6,Z+.4],t0=0,t1=1.2,act='run',face=[12,Z])],[L('mimi',"Gus! Don't run! They can smell it!"),L('gus',"Smell WHAT?!")],'AISLE 9 · FRONT',fov=40,grade='alarm',min=3.0,sfx=[[.3,'click']]))
# 13 Mimi talks him down (profile two-shot)
A(S(CAM([9.1,1.3,1.45],[9.1,1.2,Z]),[ch('mimi',9.4,Z,'smile',face=[8.85,Z]),ch('gus',8.85,Z,'scared',face=[9.4,Z])],[L('mimi',"Look at me. Breathe in for four."),L('gus',"I can't, I can't!"),L('mimi',"Smile. Like it's your first day.")],'AISLE 9 · FRONT',fov=56,grade='cold',min=4.8,sfx=[[1.2,'exhale']]))
# 14 zombies arrive and pass the two of them (silence)
A(S(CAM([9.1,1.3,1.45],[9.1,1.2,Z]),[ch('mimi',9.4,Z,'smile',face=[8.85,Z]),ch('gus',8.85,Z,'scared',face=[9.4,Z]),ch('z2',6.6,Z+.8,'calm',to=[12.2,Z+.8],t0=0,t1=4.4,act='reach'),ch('z3',7.0,Z-1.0,'calm',to=[11.6,Z-1.0],t0=.4,t1=4.6,act='reach')],[],'AISLE 9 · FRONT',fov=74,grade='dead',min=4.4,sfx=[[.4,'foot'],[1.0,'foot'],[1.6,'foot'],[2.2,'foot'],[2.8,'foot'],[3.4,'foot']],cues=[dict(t=0,type='gate',dur=4.0),dict(t=.3,type='tick'),dict(t=1.5,type='tick'),dict(t=2.7,type='tick')]))
# 15 Vance explains
A(S(CAM([-6.2,1.35,-9.6],[-6,1.1,-14],[-6.2,1.35,-9.9],[-6,1.1,-14]),[ch('vance',-6.0,-13.0,'calm',act='shush')],[L('vance',"Fascinating. They don't hunt people. They hunt fear.")],'FROZEN · DAIRY',fov=44,grade='cold',min=3.6,cues=[dict(t=0,type='motif',detune=.5,level=.2)]))
# 16 rules card (store-policy voice)
A(dict(card=dict(type='rules',top='RULES OF THE NIGHT SHIFT',items=['FEAR = TARGET','CALM = INVISIBLE','NEVER RUN']),chars=[],cam=[[0,1,0],[0,1,0],[0,1,0],[0,1,0]],lines=[L('mimi',"Rule one: fear is a target. Rule two: calm is invisible. Rule three: no running.")],place='',min=5.4,sfx=[[.3,'click'],[1.9,'click'],[3.7,'click']],cues=[],pad=.4,lead=.25,fov=40,grade='calm'))
# 17 Teddy strolls through the dead
A(S(CAM([12.5,1.5,Z],[-2,1.2,Z],[11.8,1.5,Z],[-2,1.2,Z]),[ch('teddy',3.2,Z,'smile',prop='can',to=[-.2,Z],t0=.2,t1=3.6,act='walk'),ch('z2',-3.4,Z-.7,'calm',to=[-1.4,Z-.7],t0=0,t1=4,act='reach'),ch('z3',-1.0,Z+.8,'calm',to=[-3.2,Z+.8],t0=0,t1=4,act='reach')],[L('teddy',"Is this a game?"),L('gus',"He's walking through them!"),L('mimi',"He doesn't know he should be scared.")],'AISLE 9 · CANNED GOODS',fov=48,min=5.0,sfx=[[.5,'foot'],[1.1,'foot'],[1.7,'foot'],[2.3,'foot']]))
# 18 the smile
A(S(CAM([5.6,1.3,Z],[10.0,1.2,Z]),[ch('mimi',10.5,Z+.5,'smile'),ch('gus',9.3,Z-.5,'smile')],[L('gus',"How are you so calm?"),L('mimi',"Six years of customer service.")],'AISLE 9 · FRONT',fov=40,grade='warm',min=3.8))
# 19 Rosa bursts in with the baby
A(S(CAM([11.5,1.4,Z],[-1.5,1.2,Z],[10.9,1.4,Z],[-1.5,1.2,Z]),[ch('rosa',-9.0,Z,'scared',prop='baby',to=[-3.0,Z],t0=0,t1=2.2,act='walk')],[L('rosa',"Please! Somebody help us!")],'AISLE 9 · CANNED GOODS',fov=48,grade='alarm',min=3.2,sfx=[[0,'cry'],[.2,'foot']],cues=[dict(t=0,type='riser',dur=2.0,level=.3)]))
# 20 every head turns
A(S(CAM([9,1.35,Z],[-3,1.2,Z],[8.6,1.35,Z],[-3,1.2,Z]),[ch('z2',3.0,Z+.1,'calm',face=[9,Z]),ch('z3',.6,Z-.7,'calm',face=[9,Z]),ch('z4',-1.8,Z+.6,'calm',face=[9,Z])],[],'AISLE 9 · CANNED GOODS',fov=44,grade='dead',min=2.6,lead=.05,cues=[dict(t=0,type='gate',dur=1.4),dict(t=1.4,type='stinger',level=.9)],sfx=[[1.4,'sting'],[1.4,'groan']]))
# 21 payoff of the PA line
A(S(CAM([4.0,1.25,Z],[7.4,1.2,Z]),[ch('gus',6.9,Z+.25,'smile'),ch('rosa',8.3,Z-.45,'scared',prop='baby')],[L('gus',"Please... remain calm.")],'AISLE 9 · CANNED GOODS',fov=38,grade='cold',min=2.8,cues=[dict(t=0,type='motif',detune=.3,level=.2)]))
# 22 loop: same frame as the hook, a zombie now stands right behind her
A(S(CAM([-5.2,1.4,8.0],[-6.0,1.2,14.6],[-5.3,1.4,8.7],[-6.0,1.2,14.6]),[ch('mimi',CO+.9,14.6,'smile'),ch('z1',CO+1.8,15.7,'calm')],[L('mimi',"Have a nice day.")],T0,fov=34,min=2.6,pad=.9,cues=[dict(t=1.6,type='stinger',level=.6)]))
EP=dict(id='rc1',series=SER,title='THE DEAD SMELL FEAR',part=1,of=3,shots=sh)
