from worldlib import *
W=World('worlds/quiet.json');P=W.part(8,'CHECKPOINT 9',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='if a road is closed find the pipe', goal='get past the military checkpoint without firing a shot', obstacle='infected soldiers and a commander paid by Marlow', twist='the checkpoint commander works for Marlow', payoff='did Marlow reach the cache first?')
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

S1=Scene(W,'check',x=640,y=470,z=.7);S1.put('ren',300,expr='calm',sc=.72)
P.B(S([('ren','If a road is closed, find the pipe.','ถ้าถนนปิด ให้หาท่อ')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone at checkpoint nine, a barrier and a crowd of soldiers ahead','checkpoint nine','extra wide shot, Ren tiny with a wrench','Is there a way round?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่แปดจากสิบ: ด่านเก้า')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour fifty-two. Nine gates. One pipe.','ชั่วโมงที่ห้าสิบสอง เก้าประตู ท่อเดียว')]),card('chain',title='HOUR FIFTY-TWO',bg=dict(loc='w_quiet',v='check',z=1.8,x=640,y=430),nodes=[dict(i='64',l='64 KM LEFT'),dict(i='9',l='NINE GATES'),dict(i='1',l='ONE PIPE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 64 km left, nine gates, one pipe','rule card','chain card with three labelled steps','Which way does he go?'))
S2=Scene(W,'check',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','Do not walk up to a crowd.','อย่าเดินเข้าหาฝูงชน')]),S2.shot(moves={'ren':(640,'walk')},extra=gear_walk(S2,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks along the barrier toward a rusty drain opening','checkpoint nine, a walk','side view walk, wrench hanging in his hand','What is in the crowd?'))
S2.p['ren']['flip']=False
P.B(S([('ren','Nine gates. Nine ways to be loud.','เก้าประตู เก้าทางที่จะทำเสียงดัง')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren studies the gates and the crowd with narrowed eyes','checkpoint nine, close-up of Ren','close-up, steady eyes','Where is the quiet way?'))
P.B(S([('ren','Soldiers. Infected. Three at the gate.','ทหารติดเชื้อ สามนายที่ประตู')]),W.pov('check',[('suit',690,700,'side'),('porter',770,640,'side'),('hoodie',830,585,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: infected soldiers at the gate, near one big, far ones small','checkpoint nine, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','Can he slip past?'))
S2.zput('z1',700,var='suit')
sh,fx=strike(S2,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','checkpoint nine, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S2.zput('z2',800,var='porter')
sh,fx=strike(S2,'ren','z2','BONK!',held='wrench')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','checkpoint nine, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S2.zput('z3',860,var='hoodie')
sh,fx=strike(S2,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','checkpoint nine, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S2.p['ren']['flip']=False
S2.p['ren']['flip']=False
P.B(S([('ren','The pipe. Rust. Dark. Quiet.','ท่อ สนิม มืด เงียบ')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren looks at the rusty drain opening','checkpoint nine, close-up of Ren','close-up, steady eyes','Is there room to crawl?'))
P.B(S([('ren','Three hundred metres. On my knees.','สามร้อยเมตร คลานไป')]),W.lane('drain',[dict(W.at('ren',0,2.0,'worried',view='back',bob=3.0,bobSp=5.0),to=(W.lane_pos(0,3.8)['x'],W.lane_pos(0,3.8)['y']),sto=1.0)],z=1.0),mood='creep',cam='push_in',sfx=[('horde',.3)],
 intent=I('Ren','Ren crawls into the storm drain, the walls closing toward a point of light','storm drain, one-point perspective','back view of Ren, the lane shrinking to a vanishing point','How long is the pipe?'))
P.B(S([('ren','A closed road still has a back door.','ถนนปิดก็ยังมีประตูหลัง')]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='drain',z=1.8,x=640,y=430),nodes=[dict(i='1',l='ROAD CLOSED'),dict(i='2',l='FIND THE PIPE'),dict(i='3',l='GO AROUND')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: road closed, find the pipe, go around','rule card','chain card with three labelled steps','What is on the other side?'))
S3=Scene(W,'field',x=640,y=470,z=.7);S3.put('ren',300,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=300
P.B(S([('ren','Daylight. Mud. Silence.','แสงวัน โคลน เงียบสงบ')]),S3.shot(moves={'ren':(640,'walk')},extra=gear_walk(S3,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren and Noor climb out of the drain into the open field','open field, a walk','side view walk, wrench hanging in his hand','Are they alone?'))
S3.put('noor',900,expr='smile',sc=.7,face='front')
P.B(S([('noor','Pipe first. I told you. Shortcuts are my thing.','ท่อก่อนไง บอกแล้ว ทางลัดคือของถนัดหนู')]),S3.shot(expr={'noor':'smile'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Noor','Noor climbs out of the drain grinning, mud on her face','open field, a conversation','mid shot, the speaker talking','Who else is out here?'))
P.B(S([('marlow','Commander Hale says hello, Ren. He is mine.','ผู้บัญชาการเฮลฝากสวัสดี เขาเป็นคนของฉัน')]),card('macro',obj='phone',label='UNKNOWN',sub='LIVE',bg=dict(loc='w_quiet',v='field',z=1.8,x=630,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','Marlow on the phone: the checkpoint commander works for him','open field, macro of the phone','macro card of the phone','Has Marlow reached the cache first?'))
S4=Scene(W,'field',x=640,y=470,z=.7);S4.put('ren',420,expr='calm',sc=.72)
S4.p['ren']['flip']=False;S4.p['ren']['x']=420
P.B(S([('ren','Sixty-four to go.','เหลืออีกหกสิบสี่')]),S4.shot(moves={'ren':(860,'walk')},extra=gear_walk(S4,'wrench',860),z=.78,vx=700),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks into the field with Noor at his side','open field, a walk','side view walk, wrench hanging in his hand','What is waiting at the cache?'))
P.close('the broker');TH.append('ตอนที่แปดจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: โบรกเกอร์ ติดตามตอนที่เก้า')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Road Closed? Find The Pipe',premise='An exterminator who swore never to kill again must cross a military checkpoint without firing a single shot.',
 body='Part 8 of 10: checkpoint nine. Real tip: avoid noisy crowds, look for a way around instead of through.',nxt='the broker',ask='Would YOU cross the checkpoint or crawl the pipe? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, checkpoint, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If a road is closed, find the pipe. 🧟 9 gates, 300 m of drain.',ig='If a road is closed, find the pipe. 🧟 9 gates, 300 m of drain. Real survival tip inside.',pin='Who is the commander? 👇 Next: the broker.')
COVER=dict(beat=8,frac=.5,main='9 GATES|1 PIPE',box='CHECKPOINT 9')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['storm-drain-crawl', 'road-closed-tip'])
