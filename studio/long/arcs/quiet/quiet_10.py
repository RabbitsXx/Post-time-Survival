from worldlib import *
W=World('worlds/quiet.json');P=W.part(10,'THE QUIET HAND',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='if you finish with one move was it ever a fight', goal='open the cache at Harrow Farm', obstacle='Marlow and his horde in the barn', twist='the cache was empty from the start because Ren emptied it himself', payoff='what did Mara find?')
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

S1=Scene(W,'field',x=640,y=470,z=.7);S1.put('ren',300,expr='calm',sc=.72)
P.B(S([('ren','If you finish with one move, was it ever a fight?','ถ้าจบด้วยท่าเดียว มันเคยเป็นการต่อสู้ไหม')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone at the gate of Harrow Farm at sunrise','open field','extra wide shot, Ren tiny with a wrench','What is in the cache?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่สิบจากสิบ: เดอะ ไควเอท แฮนด์')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour seventy-two. Zero kilometres.','ชั่วโมงที่เจ็ดสิบสอง ศูนย์กิโลเมตร')]),card('chain',title='HOUR SEVENTY-TWO',bg=dict(loc='w_quiet',v='field',z=1.8,x=640,y=430),nodes=[dict(i='0',l='0 KM LEFT'),dict(i='72',l='HOUR SEVENTY-TWO'),dict(i='C',l='THE CACHE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 0 km left, hour seventy-two, the cache','rule card','chain card with three labelled steps','What will he find?'))
S2=Scene(W,'field',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','Harrow Farm. I can see the barn.','ฮาร์โรว์ฟาร์ม เห็นโรงนาแล้ว')]),S2.shot(moves={'ren':(640,'walk')},extra=gear_walk(S2,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks through the field toward the farm','open field, a walk','side view walk, wrench hanging in his hand','What waits at home?'))
S3=Scene(W,'farm',x=640,y=470,z=.7);S3.put('ren',300,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=300
P.B(S([('ren','Harrow Farm. Home.','ฮาร์โรว์ฟาร์ม บ้าน')]),S3.shot(moves={'ren':(640,'walk')},extra=gear_walk(S3,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks alone through the farm gate toward the barn','Harrow Farm, a walk','side view walk, wrench hanging in his hand','Who is inside?'))
S4=Scene(W,'barn',x=640,y=470,z=.7);S4.put('ren',300,expr='calm',sc=.72)
S4.p['ren']['flip']=False;S4.p['ren']['x']=300
P.B(S([('ren','The barn. Third board from the wall.','โรงนา ไม้กระดานแผ่นที่สามจากผนัง')]),S4.shot(moves={'ren':(640,'walk')},extra=gear_walk(S4,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks into the dark barn and counts the boards','barn, a walk','side view walk, wrench hanging in his hand','Is the cache still there?'))
S4.p['ren']['flip']=False
P.B(S([('ren','I buried it myself. Under the third board.','ฉันฝังเองกับมือ ใต้ไม้กระดานแผ่นที่สาม')]),S4.shot(extra=gear(S4,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren kneels in the barn and lifts the third board','barn, close-up of Ren','close-up, steady eyes','What is under the floor?'))
P.B(S([('ren','The cache. Open. Empty.','คลัง เปิดอยู่ ว่างเปล่า')]),card('macro',obj='lock',bg=dict(loc='w_quiet',v='barn',z=1.8,x=630,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','The cache box lies open and empty','barn, macro of the lock','macro card of the lock','Who emptied it?'))
P.B(S([('ren',"Marlow's horde. Three in the barn.",'ฝูงของมาร์โลว์ สามตัวในโรงนา')]),W.pov('barn',[('suit',690,700,'side'),('hoodie',770,640,'side'),('porter',830,590,'side')],hands='sprayer',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: three zombies in the barn, the sprayer in his fist','barn, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','Can the sprayer be enough?'))
S4.zput('z1',700,var='suit')
sh,fx=strike(S4,'ren','z1','THWACK!',held='sprayer')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','barn, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S4.zput('z2',800,var='hoodie')
sh,fx=strike(S4,'ren','z2','BONK!',held='sprayer')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','barn, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S4.zput('z3',860,var='porter')
sh,fx=strike(S4,'ren','z3','SMASH!',held='sprayer')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','barn, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S4.p['ren']['flip']=False
S4.put('marlow',920,expr='scared',sc=.7,face='front')
P.B(S([('marlow','You emptied it years ago. You were never going to take them.','นายเอาออกไปตั้งนานแล้ว นายไม่เคยตั้งใจจะหยิบมัน')]),S4.shot(expr={'marlow':'scared'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Marlow','Marlow realises, face falling, as Ren stands calm','barn, a conversation','mid shot, the speaker talking','Why was it empty?'))
P.B(S([('ren','Use what is around you first. Then what you hid.','ใช้ของรอบตัวก่อน แล้วค่อยใช้ของที่ซ่อนไว้')]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='barn',z=1.8,x=640,y=430),nodes=[dict(i='1',l='USE WHAT IS AROUND'),dict(i='2',l='THEN WHAT YOU HID'),dict(i='3',l='PREPARED NOT ARMED')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: use what is around you first, then what you hid','rule card','chain card with three labelled steps','What does Mara find?'))
S3.put('noor',900,expr='smile',sc=.7,face='front')
P.B(S([('noor','Ren! The door. There is a girl.','เรน ประตูนั่น มีเด็กผู้หญิง')]),S3.shot(expr={'noor':'smile'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Noor','Noor points at the farmhouse door opening slowly','Harrow Farm, a conversation','mid shot, the speaker talking','Who is she?'))
S3.p['ren']['flip']=False
P.B(S([('ren','Three moves. That is all anyone needs.','สามท่า เท่านี้ก็พอแล้ว')]),S3.shot(extra=gear(S3,'wrench'),expr={'ren':'smile'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren smiles at last, the wrench gone, hands open','Harrow Farm, close-up of Ren','close-up, steady eyes','Is the war finally over?'))
P.close(None);TH.append('ตอนที่สิบจากสิบ เดอะ ไควเอท แฮนด์: จบ ติดตามซีรีส์ใหม่')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Finish In One Move: Was It A Fight?',premise='An exterminator who swore never to kill again finally opens the cache he buried and chooses what to take.',
 body='Part 10 of 10: the quiet hand. Real tip: use what is around you before you reach for what you hid.',nxt=None,ask='Would YOU have taken the weapons? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, series finale, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If you finish with one move, was it ever a fight? 🧟 0 km, 72 hours.',ig='If you finish with one move, was it ever a fight? 🧟 0 km, 72 hours. Real survival tip inside.',pin='What did Mara find? 👇 Follow for the next series.')
COVER=dict(beat=8,frac=.5,main='0 KM|72 HOURS',box='THE QUIET HAND')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['empty-cache-twist', 'use-what-is-around-tip'])
