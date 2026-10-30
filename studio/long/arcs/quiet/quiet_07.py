from worldlib import *
W=World('worlds/quiet.json');P=W.part(7,'THE TOWER',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='if you can see the top you cannot hear the ground', goal='climb the radio tower for the military broadcast', obstacle='forty floors of steel stairs and a narrow platform', twist='the evacuation signal is fake', payoff='who sent it?')
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
P.B(S([('ren','If you can see the top, you cannot hear the ground.','ถ้ามองเห็นยอด ก็จะไม่ได้ยินเสียงพื้น')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone at the foot of a huge radio tower','open field','extra wide shot, Ren tiny with a wrench','Why climb it?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่เจ็ดจากสิบ: หอคอย')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour forty. A broadcast says two hours.','ชั่วโมงที่สี่สิบ ประกาศบอกว่าสองชั่วโมง')]),card('chain',title='HOUR FORTY',bg=dict(loc='w_quiet',v='field',z=1.8,x=640,y=430),nodes=[dict(i='98',l='98 KM LEFT'),dict(i='40',l='HOUR FORTY'),dict(i='2H',l='EVACUATION IN 2 HOURS')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 98 km left, hour forty, evacuation in two hours','rule card','chain card with three labelled steps','Is the broadcast real?'))
S2=Scene(W,'tower',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','Forty floors. No elevator.','สี่สิบชั้น ไม่มีลิฟต์')]),S2.shot(moves={'ren':(640,'walk')},extra=gear_walk(S2,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks to the foot of the steel tower and grips the first rung','radio tower, a walk','side view walk, wrench hanging in his hand','Can he climb it all?'))
S2.p['ren']['flip']=False
P.B(S([('ren','Hand over hand. Never look down.','มือต่อมือ อย่ามองลง')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren climbs, wind whipping his coat, eyes forward','radio tower, close-up of Ren','close-up, steady eyes','What is waiting on the platform?'))
P.B(S([('ren','The platform. Narrow. Three of them.','ชานชาลาแคบ สามตัว')]),W.pov('tower',[('porter',690,700,'side'),('hoodie',770,630,'side'),('suit',830,580,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: three zombies on the narrow platform, the near one big','radio tower, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','Can he fight on a ledge?'))
S2.zput('z1',700,var='porter')
sh,fx=strike(S2,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','radio tower, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S2.zput('z2',800,var='hoodie')
sh,fx=strike(S2,'ren','z2','BONK!',held='wrench')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','radio tower, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S2.zput('z3',860,var='suit')
sh,fx=strike(S2,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','radio tower, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S2.p['ren']['flip']=False
S2.p['ren']['flip']=False;S2.p['ren']['x']=640
P.B(S([('ren','The top. A radio. A speaker.','ยอดหอคอย วิทยุ ลำโพง')]),S2.shot(moves={'ren':(900,'walk')},extra=gear_walk(S2,'wrench',900),z=.78,vx=830),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren steps along the top platform to the radio','radio tower, a walk','side view walk, wrench hanging in his hand','What does it say?'))
P.B(S([('ren','Evacuate. Two hours. Go to the coast.','อพยพ สองชั่วโมง ไปที่ชายฝั่ง')]),card('macro',obj='radio',label='EVACUATE',sub='2 HOURS',bg=dict(loc='w_quiet',v='tower',z=1.8,x=630,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','The tower radio crackles an evacuation order','radio tower, macro of the radio','macro card of the radio','Is it a trap?'))
S2.p['ren']['flip']=False
P.B(S([('ren','The wind is loud. Everything else is quiet.','ลมดัง แต่ทุกอย่างอื่นเงียบ')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren steadies himself on the platform, wind in his coat','radio tower, close-up of Ren','close-up, steady eyes','What did Noor find?'))
S2.put('noor',900,expr='worried',sc=.7,face='front')
P.B(S([('noor','Ren, it loops. Same words, every four seconds.','เรน มันวนซ้ำ คำเดิมทุกสี่วินาที')]),S2.shot(expr={'noor':'worried'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Noor','Noor leans over the rail and hears the broadcast repeat','radio tower, a conversation','mid shot, the speaker talking','What is wrong with the signal?'))
P.B(S([('noor','It is a trap, Ren. Nobody is coming.','มันคือกับดัก เรน ไม่มีใครมา')]),S2.shot(expr={'noor':'sad'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Noor','Noor hugs her arms, serious for once','radio tower, a conversation','mid shot, the speaker talking','Who made the trap?'))
P.B(S([('ren','High ground is safe for now. Not forever.','ที่สูงปลอดภัยแค่ตอนนี้ ไม่ใช่ตลอดไป')]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='tower',z=1.8,x=640,y=430),nodes=[dict(i='1',l='HIGH GROUND'),dict(i='2',l='SAFE FOR NOW'),dict(i='3',l='NEVER STAY')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: high ground, safe for now, never stay','rule card','chain card with three labelled steps','Who made the signal?'))
S3=Scene(W,'street',x=640,y=470,z=.7);S3.put('ren',420,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=420
P.B(S([('ren','Fake. Someone wants us at the coast.','ของปลอม มีคนอยากให้เราไปชายฝั่ง')]),S3.shot(moves={'ren':(860,'walk')},extra=gear_walk(S3,'wrench',860),z=.78,vx=700),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks away from the tower at dawn, Noor behind him','city street, a walk','side view walk, wrench hanging in his hand','Who sent it?'))
P.close('checkpoint nine');TH.append('ตอนที่เจ็ดจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: ด่านเก้า ติดตามตอนที่แปด')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Forty Floors Up: The Evacuation Signal Is FAKE',premise='An exterminator who swore never to kill again climbs a radio tower alone to catch the last military broadcast.',
 body='Part 7 of 10: the tower. Real tip: high ground is safe only for a while, never stay up there.',nxt='checkpoint nine',ask='Would YOU climb the tower? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, radio tower, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If you can see the top, you cannot hear the ground. 🧟 40 floors, 2 hours.',ig='If you can see the top, you cannot hear the ground. 🧟 40 floors, 2 hours. Real survival tip inside.',pin='Who sent the signal? 👇 Next: checkpoint nine.')
COVER=dict(beat=8,frac=.5,main='40 FLOORS|2 HOURS',box='THE TOWER')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['radio-tower-climb', 'high-ground-tip'])
