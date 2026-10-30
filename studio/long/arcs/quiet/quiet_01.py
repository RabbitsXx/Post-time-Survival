from worldlib import *
W=World('worlds/quiet.json');P=W.part(1,'HOUR ZERO',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='an exterminator warns the viewer never to go up when there is screaming above, then hears it himself',goal='cross 240 km in 72 hours to dig up the weapons he buried',obstacle='a hotel full of first-hour zombies and a promise never to kill again',twist='his phone says the cache that only he can open has already been opened',payoff='who opened the cache?')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
def gear(sc,item,dx=34,dy=-96,s=.72):
    p=sc.p['ren'];sg=-1 if p['flip'] else 1
    if item=='wrench':return [dict(k='prop',t=item,x=p['x']+sg*dx,y=p['y']+dy,s=s,rot=sg*168,flip=False)]   # held at the side, jaw down
    return [dict(k='prop',t=item,x=p['x']+sg*52,y=p['y']-24,s=1.0,flip=p['flip'])]
def cu(expr,v,**k):return W.cuf('ren',expr,v=v,**k)
# ---- 0 street: wide, smoke on the skyline, a tiny man ----
St=Scene(W,'street',x=640,y=470,z=.7);St.put('ren',330,expr='calm',sc=.7)
P.B(S([('ren',"If you hear screaming above you, don't go up.","ถ้าได้ยินเสียงกรีดร้องจากชั้นบน อย่าขึ้นไป")]),St.shot(extra=gear(St,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands small on a night street as black smoke rises over the city behind him','city street at night, burning skyline','extra wide shot, smoke column, a tiny man with a wrench','Why must we never go up?'))
P.open();TH.append("เดอะ ไควเอท แฮนด์ ตอนที่หนึ่งจากสิบ: ชั่วโมงศูนย์ อีกสองร้อยสี่สิบกิโลเมตร")
BEATS[-1]['intent']=I('Dispatch radio','The pest-control dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this broadcast about?')
P.B(S([('ren',"Six hours earlier. Job fourteen.","หกชั่วโมงก่อน งานที่สิบสี่")]),card('macro',obj='sprayer',bg=dict(loc='w_quiet',v='kitchen',z=1.8,x=640,y=430),s=.75),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A pest sprayer fills the frame, the tool of his job','hotel kitchen, macro of the sprayer','macro card of the pest sprayer tank and wand','What kind of job is this?'))
K=Scene(W,'kitchen',x=640,y=470,z=.66)
K.put('ren',470,expr='smile')
P.B(S([('ren',"Six rats. Easy money.","หนูหกตัว งานง่ายๆ")]),K.shot(moves={'ren':(640,'walk')},extra=gear(K,'sprayer'),vx=600),mood='comic',cam='drift',sfx=[('click',.3),('rimshot',.9)],
 intent=I('Ren','Ren creeps through the hotel kitchen spraying a mist along the floor','hotel kitchen, shelves, steel table','side view, mist cloud, he walks right','Is it only rats?'))
P.B(S([('ren',"Then the screaming started.","แล้วเสียงกรีดร้องก็เริ่มขึ้น")]),K.shot(face={'ren':'backhead'},expr={'ren':'worried'},z=1.3,vy=400),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('horde',.6)],
 intent=I('Ren','Ren stops and looks up, dust falling on his face','hotel kitchen, close-up of Ren','close-up, eyes up, dust motes','What is up there?'))
P.B(S([('ren',"Above me. Rats do not scream.","เหนือหัวฉัน หนูไม่ร้อง")]),W.set('kitchen',[],x=640,y=250,z=1.6,add=[]),mood='creep',cam='push_in',sfx=[('creak',.1),('horde',.6)],
 intent=I('Ceiling pipes','Dust shakes off the ceiling pipes as a heavy thud lands above','hotel kitchen ceiling pipes','low angle on pipes and hanging lamp, dust','What made that sound?'))
K.zput('cook',900,var='cook')
P.B(S([('ren',"Listen first. Look second.","ฟังก่อน มองทีหลัง")]),W.pov('kitchen',[('cook',720,700,'side'),('hoodie',900,610,'side')],hands='sprayer',x=640,y=430,z=1.35),mood='creep',cam='hand',sfx=[('creak',.1)],
 intent=I('First-person view, zombie cook','Through Ren eyes: the kitchen door bursts open and a zombie cook shuffles toward us, a second zombie small and far behind him','hotel kitchen, seen from Ren eyes','first-person: his hands and the sprayer at the bottom, a big zombie close, a small one far','Can he stay quiet and win?'))
K.zout('hoodie')
K.shot(zmoves={'cook':(760,True)},expr={'ren':'scared'})   # keep the scene tracker in step: the cook ends at 760
sh,fx=strike(K,'ren','cook','WHACK!',held=None)
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie cook','Ren drives an elbow into the cook jaw, WHACK!','hotel kitchen, in front of the steel table','wind-up, elbow strike, the cook staggers and drops','Will one hit be enough?'))
K.zput('z2',520,var='hoodie',flip=False)
sh,fx=strike(K,'ren','z2','BONK!',held='wrench')
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie two','A second zombie lurches in; Ren grabs a wrench and bonks it, close and fast','hotel kitchen, steel table','closer angle, wrench swing, BONK! sticker','Is it still standing?'))
K.zput('z3',750,var='suit')
sh,fx=strike(K,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie three','Ren finishes the third with an overhead wrench strike, SMASH!','hotel kitchen, in front of the steel table','overhead swing, SMASH! sticker, zombie falls','Did he just count out loud?'))
K.p['ren']['flip']=False
P.B(S([('ren',"Three moves. That is all anyone needs.","สามท่า เท่านี้ก็พอแล้ว")]),K.shot(extra=gear(K,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren breathes out, calm, wrench hanging by his side','hotel kitchen, close-up of Ren','close-up, steady eyes, soft light','What is he hiding?'))
P.B(S([('ren',"Then my phone buzzed.","แล้วโทรศัพท์ก็สั่น")]),card('macro',obj='phone',label='HARROW FARM',sub='CACHE OPENED',bg=dict(loc='w_quiet',v='kitchen',z=1.8,x=620,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','His phone lights up: the cache at the farm is open','hotel kitchen, macro of the phone screen','macro card of a phone with an alert','Who opened the box only he can open?'))
P.B(S([('ren',"Nobody can open that cache but me.","ไม่มีใครเปิดคลังนั้นได้นอกจากฉัน")]),card('areamap',place='240 KM TO HARROW FARM',bg='#e8dcc0',ink='#4a3418',dot='#d4c49c',home=dict(x=225,y=620,l='HOTEL'),pins=[dict(x=290,y=190,l='HARROW',c='#c0392b')],rings=4),mood='creep',sfx=[('radio',0)],
 intent=I('Ren','A route map draws a line from the hotel to Harrow Farm, far away','map card, hotel at the bottom, farm at the top','map with a dashed route and radar rings','Can he cross that distance?'))
P.B(S([('ren',"Seventy-two hours. Two hundred forty kilometres.","เจ็ดสิบสองชั่วโมง สองร้อยสี่สิบกิโลเมตร")]),card('chain',title='HOUR ZERO',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='KM',l='240 KM LEFT'),dict(i='H',l='72 HOURS LEFT')]),mood='warm',sfx=[('radio',0)],
 intent=I('Ren','Two bars count up: 240 kilometres and 72 hours','stat card, KM LEFT and HOURS LEFT','animated bars filling with numbers','Can he make it in time?'))
P.B(S([('ren',"Twenty doors. Touch none.","ประตูยี่สิบบาน ห้ามแตะสักบาน")]),W.lane('service',[W.zat('hoodie',-150,5.5),W.zat('porter',130,7),W.zat('suit',-90,9),W.zat('dress',70,12)]+[W.at('ren',0,2.4,'worried',view='back')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.2),('heartbeat',.5)],
 intent=I('Ren','Ren walks away from us down a service corridor, tiny zombies at the far end','hotel service corridor, one-point perspective corridor, doors shrinking toward the far end','back view of Ren, four zombies at 6, 8, 11 and 13 units of depth, each smaller than the last','Will they hear him?'))
def stp(i):return (420+i*44+22,650-(i+1)*30)
S1=Scene(W,'stair',x=600,y=450,z=.7);S1.put('ren',stp(0)[0]-40,stp(0)[1]+40,expr='calm',sc=.6)
P.B(S([('ren',"Never take the elevator on day one.","อย่าใช้ลิฟต์ในวันแรก")]),S1.shot(moves={'ren':(stp(8)[0],'walk',stp(8)[1])}),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren climbs the back stairs quietly, one hand on the rail','back stairs, diagonal flight','side view, slow climb','What waits at the top?'))
Lb=Scene(W,'lobby',x=620,y=470,z=.66)
Lb.put('ren',560,expr='worried').zput('z1',690,var='porter',face='back').zput('z2',790,var='dress',face='back').zput('z3',860,var='hoodie',face='back')
P.B(S([('ren',"Three at the door. They cannot see.","สามตัวที่ประตู พวกมันมองไม่เห็น")]),Lb.shot(extra=gear(Lb,'wrench')),mood='creep',cam='push_in',sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('Ren, three zombies','Ren peeks into the lobby where three zombies wander blindly near the glass doors','hotel lobby, sofa at the left, glass doors at the right','wide shot, Ren small at the left, zombies right','Can he slip past?'))
P.B(S([('ren',"They only hear.","พวกมันได้ยินเท่านั้น")]),card('chain',title='THE RULE',bg=dict(loc='w_quiet',v='lobby',z=1.8,x=640,y=430),nodes=[dict(i='1',l='ANY NOISE'),dict(i='2',l='ZOMBIES HEAR IT'),dict(i='3',l='THEY COME')]),mood='creep',sfx=[('heartbeat',.1),('stab',.7)],
 intent=I('Ren','A three-step diagram shows the rule: noise, zombies hear it, they come','hotel lobby, rule diagram card','chain card with three labelled steps and arrows','Can he stay silent?'))
P.B(S([('ren',"One step at a time.","ทีละก้าว")]),W.pov('lobby',[('porter',620,700,'back'),('dress',800,620,'back'),('hoodie',930,570,'back')],hands='wrench',x=640,y=430,z=1.35),mood='creep',cam='hand',sfx=[('heartbeat',.1)],
 intent=I('First-person view, three zombies','Through Ren eyes: three zombies stand with their backs to us, the nearest big, the farthest small at the glass door','hotel lobby, seen from Ren eyes','first-person: wrench in his fist, three backs at three distances','Which one will turn first?'))
sh,fx=strike(Lb,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie one','Ren steps out of the shadows and thwacks the nearest zombie','hotel lobby, in front of the sofa','side swing, THWACK! sticker','Did the others hear it?'))
Lb.zout('z2').zput('z2',460,var='dress')
sh,fx=strike(Lb,'ren','z2','BONK!',held='wrench')
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie two','The second zombie lurches at him; Ren sidesteps and bonks it','hotel lobby, centre','closer, sidestep and swing, BONK! sticker','One more?'))
Lb.zout('z3').zput('z3',660,var='hoodie')
sh,fx=strike(Lb,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',sfx=[],pause=.2,dur=2.5,
 intent=I('Ren, zombie three','Ren finishes the last zombie in front of the glass doors, SMASH!','hotel lobby, glass doors','overhead swing, SMASH! sticker','Is the lobby finally clear?'))
P.B(S([('ren',"Day one. Two hundred thirty-nine to go.","วันแรก เหลืออีกสองร้อยสามสิบเก้า")]),W.set('street',[W.person('ren','worried',420,640,.7,view='side',pose='walk',anim='walk',to=(560,640))]+[dict(k='prop',t='wrench',x=454,y=544,s=.72,rot=168,to=(594,544))],x=640,y=470,z=.7),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren walks out into the burning street, wrench in hand','city street at night, fire glow behind the buildings','side view walk, skyline smoke, fire glow','What is waiting down the road?'))
St3=Scene(W,'street',x=640,y=470,z=.7);St3.put('ren',560,expr='sad',sc=.72,face='back')
P.B(S([('ren',"I swore I would never kill again.","ฉันสาบานว่าจะไม่ฆ่าอีก")]),St3.shot(z=1.2,vy=420,vx=600),mood='sad',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('Ren','Ren stares ahead, the fire reflecting in his eyes, remembering his promise','city street, close-up of Ren','close-up, warm fire light on his face','Will he keep that promise?'))
P.B(S([('ren',"These are not people. Are they?","พวกนี้ไม่ใช่คน ใช่ไหม")]),W.pov('street',[('suit',760,690,'side'),('dress',860,620,'side'),('porter',930,585,'side'),('hoodie',1010,565,'side')],hands='wrench',x=640,y=440,z=1.3),mood='creep',cam='hand',sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('First-person view, a horde','Through Ren eyes: a horde walks toward us down the street, the near one big, the far ones smaller and smaller','city street, seen from Ren eyes','first-person: his hands on the wrench, zombies at four distances','Will he break his promise?'))
P.close('the van');TH.append("ตอนที่หนึ่งจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: รถตู้ ติดตามตอนที่สอง")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Retired Assassin vs First Hour Zombies: 240 KM To Go!',premise='An exterminator who swore never to kill again has 72 hours to reach his buried weapons.',
 body='Part 1 of 10: the first hour of the outbreak. Real tip: zombies follow sound, so listen before you look and stay silent.',nxt='the van',ask='Would YOU go up or stay in the basement? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, outbreak, exterminator, survival tips, action animation, zombie fight, stickman, apocalypse story, animated series',
 tt='If you hear screaming above you, DON\'T go up. 🧟 240 km, 72 hours.',ig='If you hear screaming above you, DON\'T go up. 🧟 240 km, 72 hours. Real survival tip inside.',pin='Would YOU go up? 👇 Next: the van.')
COVER=dict(beat=6,frac=.5,main='240 KM|72 HOURS',box='HOUR ZERO')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['phone-macro','route-map'])
