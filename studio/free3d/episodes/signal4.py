import sys,os;sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build3d import *
sh=[];A=sh.append
N=lambda en:say('narrator',en)
A(NGT([ch('timo',-.4,2.2,'shock')],[N("If someone answers your signal, stay where they can find you.")],'DAY 16 · 8:00 PM · THE RIDGE',min=4.6,sfx=[[0.4,'sting']]))
A(TITLE('THE|SIGNAL','THE REPLY',4,4,"The Signal. Part four of four. The reply."))
A(NGT([ch('nell',-.8,2.0,'worried'),ch('timo',1.0,2.4,'worried')],[say('timo',"Headlights. Three of them."),say('nell',"Stay quiet. Stay put.")],'DAY 16 · 8:20 PM · THE RIDGE',min=5.4,sfx=[[0.3,'foot']]))
A(C(dict(type='macro',obj='radio',label='CH 9',top='INCOMING',live=1,note=['GRID SIX FOUR.']),[say('radio',"Hollis Ford, this is Convoy Nine. We see your three flashes. Hold position.")],min=6.4,sfx=[[0,'static']]))
A(SQW([ch('nell',-.8,2.2,'smile'),ch('timo',1.0,2.6,'shock'),ch('doc',2.6,3.0,'smile')],[say('timo',"They saw us!"),say('nell',"They saw our light.")],'DAY 17 · 6:00 AM · THE VILLAGE',min=5.0))
A(C(dict(type='rules',top='WHEN YOU ARE FOUND',items=['STAY WHERE YOU SIGNALLED','KEEP YOUR SUPPLIES TOGETHER','LEAVE A NOTE IF YOU MOVE']),[N("Stay where you signalled. Keep your supplies together. Leave a note if you move.")],min=6.2,sfx=[[0.3,'click'],[0.9,'click'],[1.5,'click']]))
A(SQW([ch('mayor',-1.2,2.2,'worried'),ch('gran',.6,2.6,'smug'),ch('hale',2.2,3.0,'calm',face=-1)],[say('mayor',"Who are these people?"),say('gran',"Anyone who sees a light and comes anyway.")],'DAY 17 · 10:00 AM · THE VILLAGE',min=6.0))
A(NGT([ch('nell',-.8,2.0,'smile'),ch('timo',.9,2.4,'smile')],[N("Forty-one people. One village. And now, a road out.")],'DAY 17 · 9:00 PM · THE WELL',min=5.4,sfx=[[0.4,'chime']]))
A(C(dict(type='title',bg='#0b1224',bg2='#05080f',fg='#ffd98a',top='THE END',big=['FOLLOW FOR','THE NEXT STORY'],sub='THE SIGNAL · PART 4 OF 4',lamp=1),[N("The Signal. Part four of four. Follow for the next story.")],min=4.4,sfx=[[0,'chime']]))
EP=dict(id='signal_04',series='THE SIGNAL',title='THE REPLY',part=4,of=4,shots=sh,minscale=.9)
