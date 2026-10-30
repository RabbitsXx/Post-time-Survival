from worldlib import *
W=World('worlds/quiet.json');P=W.part(9,'THE BROKER',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='if a stranger knows your old name run', goal='reach the cache before Marlow', obstacle='Marlow holding Noor and a horde he controls', twist='Marlow does not want the weapons he wants the name', payoff='how many moves does Ren have left?')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
def gear(sc,item,dx=34,dy=-96,s=.72):
    p=sc.p['ren'];sg=-1 if p['flip'] else 1;sc_=p['sc']
    if item=='wrench':return [dict(k='prop',t=item,x=p['x']+sg*(24 if p['face']=='side' else 30)*sc_,y=p['y']-132*sc_,s=sc_*.55,rot=sg*172,flip=False)]
    return [dict(k='prop',t=item,x=p['x']+sg*52*sc_/.72,y=p['y']-24,s=.72,flip=p['flip'])]
def gear_walk(sc,item,x1):
    p=sc.p['ren'];sg=1 if x1>p['x'] else -1;c=p['sc']
    return [dict(k='prop',t=item,x=p['x']+sg*24*c,y=p['y']-132*c,s=c*.55,rot=sg*172,flip=False,to=(x1+sg*24*c,p['y']-132*c))]
def cu(expr,v,**k):return W.cuf('ren',expr,v=v,**k)

S1=Scene(W,'street',x=640,y=470,z=.7);S1.put('ren',300,expr='calm',sc=.72)
P.B(S([('ren','If a stranger knows your old name, run.','ถ้าคนแปลกหน้ารู้ชื่อเก่าของคุณ จงวิ่ง')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone on the dark road, a stranger far away watching him','city street','extra wide shot, Ren tiny with a wrench','Who is the stranger?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่เก้าจากสิบ: โบรกเกอร์')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour sixty-six. Twenty-one kilometres.','ชั่วโมงที่หกสิบหก ยี่สิบเอ็ดกิโลเมตร')]),card('chain',title='HOUR SIXTY-SIX',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='21',l='21 KM LEFT'),dict(i='66',l='HOUR SIXTY-SIX'),dict(i='M',l='MARLOW WAITS')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 21 km left, hour sixty-six, Marlow waiting','rule card','chain card with three labelled steps','Who is waiting?'))
S2=Scene(W,'street',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','A road. A message. Come alone.','ถนน ข้อความ มาคนเดียว')]),S2.shot(moves={'ren':(640,'walk')},extra=gear_walk(S2,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks down the road reading a message on his phone','city street, a walk','side view walk, wrench hanging in his hand','Who sent it?'))
S3=Scene(W,'field',x=640,y=470,z=.7);S3.put('ren',300,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=300
P.B(S([('ren','Walk alone. That is the deal.','เดินไปคนเดียว นั่นคือข้อตกลง')]),S3.shot(moves={'ren':(640,'walk')},extra=gear_walk(S3,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks alone through the field toward a figure under a tree','open field, a walk','side view walk, wrench hanging in his hand','Where is Noor?'))
S3.put('marlow',920,expr='smug',sc=.7,face='front')
P.B(S([('marlow','Hello, Quiet. I have your girl and your name.','สวัสดี ไควเอท ฉันมีเด็กของนายและชื่อของนาย')]),S3.shot(expr={'marlow':'smug'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Marlow','Marlow smiles under a tree, polite and cold','open field, a conversation','mid shot, the speaker talking','What does he want?'))
P.B(S([('marlow','I do not want the weapons. I want the name nobody remembers.','ฉันไม่ต้องการอาวุธ ฉันต้องการชื่อที่ไม่มีใครจำได้')]),S3.shot(expr={'marlow':'calm'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Marlow','Marlow explains, Noor tied beside him','open field, a conversation','mid shot, the speaker talking','What name?'))
P.B(S([('ren','His horde. Three. Close.','ฝูงของเขา สามตัว ใกล้มาก')]),W.pov('field',[('suit',690,700,'side'),('hoodie',770,640,'side'),('porter',830,590,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: three zombies marching on command, one big, two far','open field, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','Can he break through?'))
S3.zput('z1',700,var='suit')
sh,fx=strike(S3,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','open field, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S3.zput('z2',800,var='hoodie')
sh,fx=strike(S3,'ren','z2','BONK!',held='wrench')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','open field, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S3.zput('z3',860,var='porter')
sh,fx=strike(S3,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','open field, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S3.p['ren']['flip']=False
S3.p['ren']['flip']=False
P.B(S([('ren','Hands up. Wrench down. Walk.','ยกมือ วางประแจ เดิน')]),S3.shot(extra=gear(S3,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren lowers the wrench and raises his hands','open field, close-up of Ren','close-up, steady eyes','Will Marlow keep the deal?'))
S3.p['ren']['flip']=False
P.B(S([('ren','I missed. First time in six years.','ฉันพลาด ครั้งแรกในรอบหกปี')]),S3.shot(extra=gear(S3,'wrench'),expr={'ren':'scared'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren stares at his empty hand, the wrench knocked away','open field, close-up of Ren','close-up, steady eyes','How many moves are left?'))
P.B(S([('ren','Never bargain with the last card in their hand.','อย่าต่อรองเมื่ออีกฝ่ายถือไพ่ใบสุดท้าย')]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='field',z=1.8,x=640,y=430),nodes=[dict(i='1',l='NEVER BARGAIN'),dict(i='2',l='THEY HOLD YOUR LAST CARD'),dict(i='3',l='WALK AWAY')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: never bargain, they hold your last card, walk away','rule card','chain card with three labelled steps','What is Ren last move?'))
S4=Scene(W,'farm',x=640,y=470,z=.7);S4.put('ren',300,expr='calm',sc=.72)
S4.p['ren']['flip']=False;S4.p['ren']['x']=300
P.B(S([('ren','Twenty-one kilometres. One move left.','ยี่สิบเอ็ดกิโลเมตร เหลือท่าเดียว')]),S4.shot(moves={'ren':(700,'walk')},extra=gear_walk(S4,'wrench',700),z=.78,vx=560),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks toward the farm without his wrench','Harrow Farm, a walk','side view walk, wrench hanging in his hand','Can he win with one move?'))
P.close('the quiet hand');TH.append('ตอนที่เก้าจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: ตอนจบ ติดตามตอนที่สิบ')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='A Stranger Knows Your Old Name: RUN',premise='An exterminator who swore never to kill again faces the broker who made him, with a kid held hostage.',
 body='Part 9 of 10: the broker. Real tip: never bargain when the other side already holds your last card.',nxt='the quiet hand',ask='Would YOU trade for her? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, the broker, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If a stranger knows your old name, run. 🧟 21 km to go.',ig='If a stranger knows your old name, run. 🧟 21 km to go. Real survival tip inside.',pin='How many moves are left? 👇 Next: the finale.')
COVER=dict(beat=8,frac=.5,main='21 KM|ONE NAME',box='THE BROKER')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['marlow-reveal', 'no-bargain-tip'])
