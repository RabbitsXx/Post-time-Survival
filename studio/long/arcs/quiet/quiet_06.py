from worldlib import *
W=World('worlds/quiet.json');P=W.part(6,"GUS'S LIST",of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='never trust a cry for help in a silent place', goal='find Gus who vanished in the night', obstacle='six armed men and a list with Ren name on it', twist='Ren name is crossed out on Marlow list', payoff='who crossed it out?')
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
P.B(S([('ren','If someone begs for help in a silent place, stop.','ถ้ามีคนร้องขอความช่วยเหลือในที่เงียบ ให้หยุด')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone in a dark field, a faint cry far away','open field','extra wide shot, Ren tiny with a wrench','Who is crying?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่หกจากสิบ: รายชื่อของกัส')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour twenty-eight. Gus is gone.','ชั่วโมงที่ยี่สิบแปด กัสหายไป')]),card('chain',title='HOUR TWENTY-EIGHT',bg=dict(loc='w_quiet',v='field',z=1.8,x=640,y=430),nodes=[dict(i='131',l='131 KM LEFT'),dict(i='28',l='HOUR TWENTY-EIGHT'),dict(i='G',l='GUS IS GONE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 131 km left, hour twenty-eight, Gus missing','rule card','chain card with three labelled steps','Where did Gus go?'))
S2=Scene(W,'field',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','Footprints. One set. Dragged.','รอยเท้า ชุดเดียว ถูกลาก')]),S2.shot(moves={'ren':(700,'walk')},extra=gear_walk(S2,'wrench',700),z=.78,vx=560),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren follows drag marks across the dark field alone','open field, a walk','side view walk, wrench hanging in his hand','Where do they lead?'))
S2.p['ren']['flip']=False
P.B(S([('ren','The marks end at an RV park.','รอยจบที่ลานรถบ้าน')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren crouches and reads the marks in the dirt','open field, close-up of Ren','close-up, steady eyes','What waits in the RV park?'))
S3=Scene(W,'rv',x=640,y=470,z=.7);S3.put('ren',300,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=300
P.B(S([('ren','The RV park. Lights off. Doors open.','ลานรถบ้าน ไฟดับ ประตูเปิดอยู่')]),S3.shot(moves={'ren':(640,'walk')},extra=gear_walk(S3,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks into the dark RV park alone','RV park, a walk','side view walk, wrench hanging in his hand','Who is inside the RVs?'))
P.B(S([('ren','Six men. Three are not men.','หกคน สามคนไม่ใช่คน')]),W.pov('rv',[('suit',690,700,'side'),('hoodie',760,640,'side'),('porter',820,590,'side'),('dress',860,560,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: figures between the RVs, the near ones big, the far ones small','RV park, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','How many can he stop?'))
S3.zput('z1',700,var='suit')
sh,fx=strike(S3,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','RV park, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S3.zput('z2',800,var='hoodie')
sh,fx=strike(S3,'ren','z2','BONK!',held='wrench')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','RV park, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S3.zput('z3',860,var='porter')
sh,fx=strike(S3,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','RV park, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S3.p['ren']['flip']=False
P.B(S([('marlow','You came alone. Of course you did.','มาคนเดียวสินะ แน่นอนอยู่แล้ว')]),card('macro',obj='phone',label='UNKNOWN',sub='LIVE',bg=dict(loc='w_quiet',v='rv',z=1.8,x=630,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','A phone voice from the RV: Marlow, calm and polite','RV park, macro of the phone','macro card of the phone','Who is on the phone?'))
S3.put('gus',900,expr='sad',sc=.7,face='front')
P.B(S([('gus','Ren. I had to. Six names. He holds my daughter.','เรน ผมต้องทำ หกชื่อ เขาจับลูกสาวผมไว้')]),S3.shot(expr={'gus':'sad'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Gus','Gus tied to a chair holds out a paper list, shaking','RV park, a conversation','mid shot, the speaker talking','What is on the list?'))
P.B(S([('ren','Six names. Three crossed out. Mine is one.','หกชื่อ ขีดฆ่าสามชื่อ ชื่อฉันก็อยู่ด้วย')]),card('chain',title='THE LIST',bg=dict(loc='w_quiet',v='rv',z=1.8,x=640,y=430),nodes=[dict(i='6',l='SIX NAMES'),dict(i='3',l='THREE CROSSED OUT'),dict(i='R',l='REN IS ONE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','The list shows six names, three crossed out, and Ren among them','rule card','chain card with three labelled steps','Who crossed it out?'))
S4=Scene(W,'rv',x=640,y=470,z=.7);S4.put('ren',640,expr='calm',sc=.72)
S4.p['ren']['flip']=False;S4.p['ren']['x']=640
P.B(S([('ren','Gus. A chair. A list.','กัส เก้าอี้ รายชื่อ')]),S4.shot(moves={'ren':(900,'walk')},extra=gear_walk(S4,'wrench',900),z=.78,vx=830),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks to the chair where Gus is tied','RV park, a walk','side view walk, wrench hanging in his hand','Is it a trap?'))
S4.p['ren']['flip']=False
P.B(S([('ren','Cut the rope. Quietly. Count three.','ตัดเชือก เงียบๆ นับสาม')]),S4.shot(extra=gear(S4,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren cuts the ropes without a sound','RV park, close-up of Ren','close-up, steady eyes','Can they leave unseen?'))
S5=Scene(W,'street',x=640,y=470,z=.7);S5.put('ren',420,expr='calm',sc=.72)
S5.p['ren']['flip']=False;S5.p['ren']['x']=420
P.B(S([('ren','One hundred thirty-one. Walk. Do not run.','หนึ่งร้อยสามสิบเอ็ด เดิน อย่าวิ่ง')]),S5.shot(moves={'ren':(860,'walk')},extra=gear_walk(S5,'wrench',860),z=.78,vx=700),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren and Gus leave the RV park along the street','city street, a walk','side view walk, wrench hanging in his hand','Whose hand crossed out his name?'))
P.close('the tower');TH.append('ตอนที่หกจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: หอคอย ติดตามตอนที่เจ็ด')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Never Answer This Cry For Help',premise='An exterminator who swore never to kill again tracks a missing man to an RV park where his own name is on a list.',
 body='Part 6 of 10: Gus list. Real tip: never rush toward a cry for help in a place that is otherwise silent.',nxt='the tower',ask='Would YOU follow the voice? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, rv park, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If someone begs for help in a silent place... 🧟 6 names, 3 crossed out.',ig='If someone begs for help in a silent place... 🧟 6 names, 3 crossed out. Real survival tip inside.',pin='Whose name is crossed out? 👇 Next: the tower.')
COVER=dict(beat=8,frac=.5,main='6 NAMES|3 CROSSED OUT',box="GUS'S LIST")
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['rv-park-list', 'silent-cry-tip'])
