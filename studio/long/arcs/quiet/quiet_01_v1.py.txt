from worldlib import *
W=World('worlds/quiet.json');P=W.part(1,'HOUR ZERO',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='an exterminator hears screaming above his hotel basement and tells the viewer never to go up',goal='cross 240 km in 72 hours to dig up the weapons he buried',obstacle='a hotel full of first-hour zombies and a promise never to kill again',twist='the cache alert on his phone proves someone has already opened the box that only he can open',payoff='who opened the cache?')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
def gear(sc,item,dx=52,dy=-24,s=1.0):
    p=sc.p['ren'];return [dict(k='prop',t=item,x=p['x']+(-dx if p['flip'] else dx),y=p['y']+dy,s=s,flip=p['flip'])]
# ======== KITCHEN ========
K=Scene(W,'kitchen',x=640,y=470,z=.66)
K.put('ren',520,expr='calm')
P.B(S([('ren',"If you hear screaming above you, don't go up.","ถ้าได้ยินเสียงกรีดร้องจากชั้นบน อย่าขึ้นไป")]),K.shot(extra=gear(K,'sprayer')),mood='creep',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands in a dark hotel kitchen holding a pest sprayer and talks straight to us','hotel basement kitchen, steel table and pipes','wide shot, one man with a sprayer, hazard lamp','Why is he warning us about the floor above?'))
P.open();TH.append("เดอะ ไควเอท แฮนด์ ตอนที่หนึ่งจากสิบ: ชั่วโมงศูนย์ อีกสองร้อยสี่สิบกิโลเมตร")
BEATS[-1]['intent']=I('Dispatch radio','The pest-control dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card with the series name','What is this broadcast about?')
K.p['ren']['expr']='smile'
P.B(S([('ren',"Job fourteen. Six rats. Easy money.","งานที่สิบสี่ หนูหกตัว ง่ายนิดเดียว")]),K.shot(moves={'ren':(600,'walk')},extra=gear(K,'sprayer'),vx=620),mood='comic',cam='drift',sfx=[('click',.3),('rimshot',.9)],
 intent=I('Ren','Ren sprays a cloud of mist along the floor as he creeps between the shelves','hotel kitchen, between shelves and table','side view, spray cloud, he walks right','Is it really only rats?'))
K.p['ren']['face']='back'
P.B(S([('ren',"Screaming. Above me. Rats don't scream.","เสียงกรีดร้อง เหนือหัวฉัน หนูไม่ร้อง")]),K.shot(expr={'ren':'worried'},face={'ren':'backhead'},z=.9),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('horde',.6)],
 intent=I('Ren','Ren freezes and slowly looks up at the ceiling pipes as a thud shakes the dust loose','hotel kitchen, ceiling and pipes','back view, head turned up, dust motes','What is up there?'))
K.p['ren']['face']='front'
K.zput('cook',1010,seed=4,sc=1.0)
P.B(S([('ren',"Listen first. Look second.","ฟังก่อน มองทีหลัง")]),K.shot(zmoves={'cook':(800,True)},expr={'ren':'scared'},extra=gear(K,'sprayer')),mood='creep',cam='push_in',sfx=[('creak',.1),('horde',.4)],
 intent=I('Ren, zombie cook','The kitchen door bursts open and a zombie cook in a stained apron shuffles toward Ren','hotel kitchen, steel door at the right','Ren backs one step, the cook walks in from the right','Can Ren stay quiet and win?'))
K.p['ren']['x']=640
sh,fx=strike(K,'ren','cook','WHACK!',held='sprayer',knock=70,z=.8)
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[('stab',.15),('boing',.3)],pause=.2,
 intent=I('Ren, zombie cook','Ren hits the cook in the jaw with the sprayer tank, WHACK!','hotel kitchen, in front of the steel table','punch pose, sprayer swing, impact sticker','Will one hit be enough?'))
sh,fx=strike(K,'ren','cook','BONK!',held='wrench',knock=60,z=.8)
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',sfx=[('stab',.1)],pause=.2,
 intent=I('Ren, zombie cook','Ren drops the sprayer, grabs a pipe wrench from the table and bonks the cook','hotel kitchen, steel table','wrench swing, BONK! sticker','Is the cook still standing?'))
sh,fx=strike(K,'ren','cook','SMASH!',held='wrench',knock=90,z=.8)
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',sfx=[('stab',.1),('boing',.4)],pause=.2,
 intent=I('Ren, zombie cook','Ren finishes with a clean overhead wrench strike and the cook drops','hotel kitchen, in front of the steel table','overhead swing, SMASH! sticker, zombie falls','Did he just say that out loud?'))
K.zout('cook');K.p['ren']['flip']=False;K.p['ren']['expr']='calm'
P.B(S([('ren',"Three moves. That is all anyone needs.","สามท่า เท่านี้ก็พอแล้ว")]),K.shot(extra=gear(K,'wrench'),vx=640),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren shakes out his wrist, wrench hanging, calm after the fight','hotel kitchen, the cook lying out of frame','medium shot, relaxed shoulders','What is he hiding?'))
P.B(S([('ren',"Cache opened? Nobody can open that but me.","คลังเปิดแล้วเหรอ ไม่มีใครเปิดได้นอกจากฉัน")]),card('alert',bg=dict(loc='w_quiet',v='kitchen',z=1.7,x=640,y=430),title='HARROW FARM',lines=['CACHE OPENED'],tag='UNKNOWN SENDER'),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','His phone buzzes with a message from his old farm: the cache is open','kitchen, phone alert card','phone card over a blurred kitchen','Who opened the box only he can open?'))
P.B(S([('ren',"Seventy-two hours. Two hundred forty kilometres.","เจ็ดสิบสองชั่วโมง สองร้อยสี่สิบกิโลเมตร")]),card('macro',obj='walkie',label='240 KM',sub='72 H',bg=dict(loc='w_quiet',v='kitchen',z=1.7,x=620,y=430)),mood='warm',sfx=[('radio',0)],
 intent=I('Ren','Ren reads the distance and the clock on his old dispatch radio','kitchen, close-up of the radio','macro card, 240 KM and 72 H on the radio screen','Can he make it in time?'))
# ======== SERVICE CORRIDOR (2.5D) ========
P.B(S([('ren',"Twenty doors. Don't touch any of them.","ประตูยี่สิบบาน อย่าแตะสักบาน")]),W.lane('service',W.crowd(4,-100,100,6,13,seed=21)+[W.at('ren',0,2.4,'worried',view='back')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.2),('heartbeat',.5)],
 intent=I('Ren','Ren walks away from us down a long service corridor, tiny zombies at the far end','hotel service corridor, 2.5D lane of doors','back view of Ren, zombies at the vanishing point','Will the zombies hear him?'))
# ======== STAIRS ========
def stp(i):return (360+i*64+32,650-(i+1)*46)
S1=Scene(W,'stair',x=600,y=450,z=.7)
S1.put('ren',stp(0)[0]-40,stp(0)[1]+40,expr='calm',sc=.6)
P.B(S([('ren',"Never take the elevator on day one.","อย่าใช้ลิฟต์ในวันแรก")]),S1.shot(moves={'ren':(stp(5)[0],'walk',stp(5)[1])},extra=[dict(k='prop',t='sprayer',x=stp(5)[0]+40,y=stp(5)[1]-10,s=.8,to=(stp(5)[0]+40,stp(5)[1]-10))]),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren climbs the back stairs quietly, one hand on the rail','back stairs, diagonal flight','side view, slow climb','What waits at the top?'))
# ======== LOBBY ========
Lb=Scene(W,'lobby',x=620,y=470,z=.66)
Lb.put('ren',560,expr='worried').zput('z1',700,seed=31).zput('z2',900,seed=32).zput('z3',1010,seed=33)
P.B(S([('ren',"Three of them. But they cannot see. They only hear.","ตัวสามตัว แต่พวกมันมองไม่เห็น ได้ยินเท่านั้น")]),Lb.shot(extra=gear(Lb,'wrench'),face={'ren':'front'}),mood='creep',cam='push_in',sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('Ren, three zombies','Ren peeks out into the lobby where three zombies wander blindly near the glass doors','hotel lobby, sofa at the left, glass doors at the right','wide shot, Ren small at the left, zombies at the right','Can he slip past?'))
sh,fx=strike(Lb,'ren','z1','THWACK!',held='wrench',knock=60,z=.85)
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',sfx=[('stab',.1)],pause=.2,
 intent=I('Ren, zombie one','Ren steps out of the shadows and thwacks the nearest zombie','hotel lobby, in front of the sofa','side swing, THWACK! sticker','Did the others hear it?'))
Lb.zout('z1','z2').zput('z2',700,seed=32)
sh,fx=strike(Lb,'ren','z2','BONK!',held='wrench',knock=60,z=.85)
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',sfx=[('stab',.1)],pause=.2,
 intent=I('Ren, zombie two','The second zombie lurches at him; Ren sidesteps and bonks it','hotel lobby, centre','sidestep and swing, BONK! sticker','One more?'))
Lb.zout('z2','z3').zput('z3',700,seed=33)
sh,fx=strike(Lb,'ren','z3','SMASH!',held='wrench',knock=80,z=.85)
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',sfx=[('stab',.1),('boing',.4)],pause=.2,
 intent=I('Ren, zombie three','Ren finishes the last zombie in front of the glass doors, SMASH!','hotel lobby, glass doors','overhead swing, SMASH! sticker','Is the lobby finally clear?'))
Lb.zout('z3')
# ======== STREET ========
St=Scene(W,'street',x=640,y=470,z=.7)
St.put('ren',300,expr='worried',sc=.7)
St.zput('far1',1000,seed=41,sc=.6).zput('far2',1080,seed=42,sc=.6)
P.B(S([('ren',"I swore I would never kill again. These are not people. Are they?","ฉันสาบานว่าจะไม่ฆ่าอีก พวกนี้ไม่ใช่คน ใช่ไหม")]),St.shot(moves={'ren':(520,'walk')},zmoves={'far1':980,'far2':1060},extra=gear(St,'wrench')),mood='creep',cam='push_in',fx=[],sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('Ren','Ren steps onto the burning city street, wrench in hand, and stops at the first horde in the distance','city street at night, cars and a barricade','wide shot, Ren small, a horde far ahead','Will he break his promise?'))
P.close('the van');TH.append("ตอนที่หนึ่งจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: รถตู้ ติดตามตอนที่สอง")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Retired Assassin vs First Hour Zombies: 240 KM To Go!',premise='An exterminator who swore never to kill again has 72 hours to reach his buried weapons.',
 body='Part 1 of 10: the first hour of the outbreak. Real tip: zombies follow sound, so listen before you look and stay silent.',nxt='the van',ask='Would YOU go up or stay in the basement? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, outbreak, exterminator, survival tips, action animation, zombie fight, stickman, apocalypse story, animated series',
 tt='If you hear screaming above you, DON\'T go up. 🧟 240 km, 72 hours.',ig='If you hear screaming above you, DON\'T go up. 🧟 240 km, 72 hours. Real survival tip inside.',pin='Would YOU go up? 👇 Next: the van.')
COVER=dict(beat=5,frac=.5,main='240 KM|72 HOURS',box='HOUR ZERO')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports()
