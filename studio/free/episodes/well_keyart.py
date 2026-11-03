import sys,os;sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build import *
shots=[];S=shots.append
STYLE=dict(line=4.5,slim=1,head=1,cap='speaker',strip=True)
P1='DAY 9 · 6:40 AM · HOLLIS FORD'
S(Shot('square',cx=640,cy=520,z=.82,min=3.2,place=P1,actors=[A('gran',300,sc=.62,expr='calm'),A('timo',470,sc=.5,expr='worried'),A('biscuit',600,sc=.7,expr='sad'),A('nell',860,sc=.7,expr='worried'),A('mayor',1040,sc=.72,expr='angry')],lines=[say('narrator',"Hollis Ford. Forty-one people. One well.","")]))
S(Shot('workshop',cx=620,cy=520,z=1.0,min=3.2,place='DAY 9 · 6:52 AM · NELL\'S WORKSHOP',actors=[A('nell',600,sc=1.05,expr='worried')],lines=[say('nell',"Six people. Same morning. Same water.","")]))
S(Shot('barn',cx=640,cy=540,z=.95,min=3.2,place='DAY 9 · 7:15 AM · THE BARN',actors=[A('mayor',420,sc=.8,expr='angry'),A('doc',650,sc=.8,expr='calm'),A('nell',880,sc=.8,expr='worried')],lines=[say('mayor',"Sick ones stay in the barn. Nobody opens it.","")]))
S(Shot('square',cx=640,cy=540,z=.95,min=3.2,place='DAY 9 · 8:30 AM · THE WELL QUEUE',actors=[A('mayor',360,sc=.75,expr='angry'),A('nell',640,sc=.75,expr='angry'),A('gran',880,sc=.62,expr='smug'),A('timo',1050,sc=.55,expr='scared')],lines=[say('nell',"Do not drink that.","")]))
S(Shot('square',min=3.4,card=dict(type='macro',obj='strip',top='THE STRIP DOES NOT LIE',big='E. COLI: PRESENT'),lines=[say('narrator',"The strip does not lie.","")]))
S(Shot('square',min=4.4,card=dict(type='rules',top='A BITE OR BAD WATER?',items=['A BITE HITS ONE PERSON','BAD WATER HITS EVERYONE','LOOK FOR A WOUND FIRST']),lines=[say('narrator',"A bite hits one. Bad water hits everyone.","")]))
S(Shot('square',cx=640,cy=540,z=1.05,min=3.2,place='DAY 9 · 11:00 AM · UNDER THE TREE',actors=[A('timo',520,sc=.95,expr='sad'),A('biscuit',760,sc=.8,expr='sad')],lines=[say('timo',"There was a dead rat. I tried to get it out.","")]))
S(Shot('wellnight',cx=640,cy=560,z=.85,min=3.2,place='DAY 9 · 2:10 AM · THE WELL',actors=[A('nell',470,sc=.8,expr='worried',prop='flash')],lines=[say('nell',"Someone opened this well last night.","")]))
EP=dict(id='well_keyart',series='THE WELL',title='KEY ART',part=1,of=3,shots=shots,style=STYLE)
