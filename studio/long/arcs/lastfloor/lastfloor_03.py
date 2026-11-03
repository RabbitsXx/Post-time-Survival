from worldlib import *
W=World('worlds/lastfloor.json');P=W.part(3,'THE ROOF',of=3);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='the steel roof door on floor twelve is locked',goal='open it and signal the 6 a.m. helicopter before the zombies break in',obstacle='forty keys, zombies one flight behind, a door that bends',twist='the key labelled ROOF was on the ring all along and the frying pan becomes the signal mirror',payoff='three flashes bring the helicopter and the parrot yells MAYDAY at the pilot')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
FOOT=640
def stp(i):return (360+i*64+32,650-(i+1)*46)   # stairs item: x=360,y=650, 8 steps of run 64 / rise 46
def climb(who,expr,a=0,b=6,sc=.6):
    p0,p1=stp(a),stp(b);return W.person(who,expr,p0[0],p0[1],sc,view='side',pose='walk',anim='walk',to=(p1[0],p1[1]))
def fl(n):return [dict(t='floorsign',x=830,y=190,s=1.1,label=str(n))]
EL=lambda lab='G',open_=False:[dict(t='elevator',x=330,y=600,s=1.5,open=open_,label=lab)]
LOB=dict(x=620,y=470,z=.62)
# 1 HOOK  who: Zara + zombie courier | where: lobby, elevator open
ST=dict(x=640,y=450,z=.7);RF=dict(x=640,y=470,z=.7)
LANDY=282
RDOOR=dict(k='prop',t='door',x=1060,y=LANDY,s=1.15,c='#6a6a78')
# ---------- floor 12 landing: the locked roof door ----------
U=Scene(W,'stair',x=800,y=450,z=.7,add=fl(12))
U.put('bell',990,y=LANDY,expr='shock').put('lin',930,y=LANDY,expr='worried').put('omar',870,y=LANDY,expr='scared').put('zara',815,y=LANDY,expr='scared')
P.B(S([('bell',"Floor twelve. The roof door. Locked.","ชั้นสิบสอง ประตูดาดฟ้า ล็อกอยู่")]),U.shot(pose={'bell':'reach'},face={'bell':'side'},extra=[RDOOR]),mood='creep',fx=[P.announce()],sfx=[('stab',.2)],
 intent=I('Bell, Mrs. Lin, Omar, Zara','Bell yanks the steel roof door on the top landing and it will not move','stair, floor 12 landing, grey roof door at the right','Bell pulls the handle in side view, the others wait behind him','How will they open it?'))
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่สามจากสาม: ดาดฟ้า")
BEATS[-1]['intent']=I('Tower intercom','The intercom screen announces part three: the roof','lobby intercom panel','green terminal card','Will they reach the roof?')
U.hold('bell','keys',ox=50,oy=-175,sc=1.1);U.p['bell']['face']='front'
P.B(S([('bell',"Forty keys. One opens the roof.","สี่สิบกุญแจ มีดอกเดียวที่เปิดดาดฟ้า")]),U.shot(expr={'bell':'worried'},extra=[RDOOR]),mood='creep',sfx=[('click',.1),('click',.4),('click',.8)],
 intent=I('Bell, Mrs. Lin, Omar, Zara','Bell holds up a huge key ring and starts trying key after key','stair, floor 12 landing, steel roof door','keys held up big next to Bell','Which key is it?'))
P.B(S([('zara',"Floor eleven is pouring out zombies!","ชั้นสิบเอ็ดมีซอมบี้ทะลักออกมา!")]),W.lane('hall',W.crowd(7,-100,100,3.2,10,seed=71)+[W.at('zara',-90,2.0,'scared',view='back'),W.at('omar',90,2.2,'scared',view='back')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('horde',.1),('stab',.5)],
 intent=I('Zara, Omar','They look down the hall of floor eleven where a pack of zombies pours out of the doors','hall on floor 11, 2.5D corridor','camera pushes toward a crowd of zombies at the vanishing point','How long until they reach the roof door?'))
U.zput('z1',420,y=650,seed=41).zput('z2',500,y=650,seed=42).zput('z3',580,y=650,seed=43)
U.p['zara']['face']='backhead'
P.B(S([('zara',"They're one flight behind!","พวกมันตามหลังแค่หนึ่งชั้น!")]),U.shot(zmoves={'z1':500,'z2':580,'z3':660},extra=[RDOOR]),mood='creep',cam='push_in',sfx=[('horde',.1),('heartbeat',.3)],
 intent=I('Zara, Bell, Omar, Mrs. Lin','Zara looks back down the stairs and sees zombies climbing toward the landing','stair, floor 12 landing, zombies at the bottom of the flight','Zara turns her head, three zombies climb up the steps','Can Bell find the key in time?'))
U.p['zara']['face']='front';U.zout('z1','z2','z3')
P.B(S([('lin',"Try the key that says ROOF.","ลองดอกที่เขียนว่า ROOF"),('bell',"...That works.","...อันนั้นแหละ")]),U.shot(vx=960,vy=330,z=1.15,expr={'lin':'angry','bell':'shock'},extra=[RDOOR]),mood='comic',sfx=[('click',.5),('rimshot',1.1)],
 intent=I('Mrs. Lin, Bell','Mrs. Lin points at a tag on the ring; Bell stares at the key labelled ROOF','stair, floor 12 landing, closer shot','Lin points, Bell facepalms','Will the door open?'))
# ---------- the roof ----------
R=Scene(W,'roof',x=640,y=470,z=.62,add=[dict(t='ladder',x=130,y=640,s=1.0,h=260)])
HUT=dict(k='prop',t='door',x=420,y=620,s=1.1,c='#6a6a78')
R.put('omar',420,expr='scared').put('zara',410,expr='shock').put('lin',400,expr='scared').put('bell',390,expr='calm')
P.B(S([('omar',"Everybody out! Shut it!","ทุกคนออกไป! ปิดประตู!")]),R.shot(moves={'bell':(860,'run'),'lin':(780,'run'),'zara':(690,'run'),'omar':(580,'walk')},extra=[HUT]),mood='chase',cam='push_in',sfx=[('creak',.1),('bell',.6)],
 intent=I('Omar, Zara, Mrs. Lin, Bell','They burst out onto the roof at dawn, running away from the stairwell door','roof, skyline at dawn, stairwell door at the left','wide shot, four people run right, away from the door','Is the roof door strong enough?'))
R.p['lin']['expr']='calm'
P.B(S([('lin',"Bat through the handles. Done.","เอาไม้ตีเสียบที่จับ เรียบร้อย")]),R.shot(moves={'lin':(500,'walk')},extra=[HUT]),mood='creep',fx=[sticker(.8,'BANG!',x=225,y=150,rot=-6,size=56,c='#ffcf6a',dur=1.2)],sfx=[('stab',.8)],
 intent=I('Mrs. Lin, Omar, Zara, Bell','Mrs. Lin walks back and jams her bat through the door handles while the others watch','roof, stairwell door at the left','Lin walks to the door and wedges the bat, sticker BANG!','How long will the bat hold?'))
P.B(S([('zara',"What if the pilot never sees us?","ถ้านักบินไม่เห็นเราล่ะ?"),('bell',"Then we become impossible to miss.","งั้นเราก็ทำให้เขามองไม่พลาด")]),R.shot(expr={'zara':'worried','bell':'calm'},extra=[HUT]),mood='warm',sfx=[('swell',0)],
 intent=I('Zara, Bell, Mrs. Lin, Omar','Zara scans the empty dawn sky and Bell squares his shoulders','roof, empty sky above the skyline','wide shot, Zara looks up and Bell answers','How can four people on a roof be impossible to miss?'))
P.B(S([('bell',"Helicopter in five minutes. Signal in threes.","เฮลิคอปเตอร์มาในห้านาที ส่งสัญญาณเป็นสาม")]),card('macro',obj='walkie',label='SIGNAL',sub='3 x 3',bg=dict(loc='w_lastfloor',v='roof',z=1.7,x=640,y=430)),mood='warm',sfx=[('radio',0)],
 intent=I('Bell','Bell reads the rescue message on his walkie: signal in threes','roof, close-up of the walkie','macro card, screen shows SIGNAL 3 x 3','What can they signal with?'))
R.hold('omar','pan',ox=62,oy=-190,sc=.8)
P.B(S([('omar',"My pan is a mirror.","กระทะผมเป็นกระจก"),('zara',"Your pan IS a plan!","กระทะคือแผนจริงๆ!")]),R.shot(moves={'omar':(700,'walk')},expr={'omar':'grin','zara':'shock'},pose={'omar':'reach'},extra=[HUT]),mood='comic',fx=[sticker(.3,'FLASH!',x=225,y=150,rot=-6,size=60,c='#fff3c0',dur=.8),sticker(1.1,'FLASH!',x=300,y=190,rot=5,size=60,c='#fff3c0',dur=.8),sticker(1.9,'FLASH!',x=160,y=210,rot=-4,size=60,c='#fff3c0',dur=.8)],sfx=[('click',.3),('click',1.1),('click',1.9),('rimshot',2.4)],
 intent=I('Omar, Zara','Omar walks to the roof edge holding the pan like a mirror and flashes the sky three times; Zara realises it is a plan','roof, rooftop edge','pan held high, three FLASH! stickers one after another','Will the pilot see it?'))
P.B(S([('bell',"Rule two. Signal in threes.","กฎข้อสอง ส่งสัญญาณเป็นสาม")]),card('rulecard',n=2,head='TOWER RULE',lines=['SIGNAL','IN THREES','FLASH FLASH FLASH'],bg=dict(loc='w_lastfloor',v='roof',z=1.6,x=640,y=430)),mood='warm',sfx=[('bell',0)],
 intent=I('Bell','Bell states rule two; the card spells out three flashes','roof, rule card over the blurred rooftop','paper tag with SIGNAL IN THREES','Is anyone out there to see it?'))
R.zput('r1',150,y=640,seed=51).zput('r2',230,y=640,seed=52)
P.B(S([('zara',"They climbed the outside ladder!","พวกมันปีนบันไดด้านนอกขึ้นมา!")]),R.shot(zmoves={'r1':300,'r2':380},expr={'zara':'scared','omar':'scared','bell':'scared','lin':'scared'},pose={'omar':'reach'},face={'zara':'backhead'},extra=[HUT]),mood='chase',cam='push_in',fx=[shake(.2,6,.6)],sfx=[('stab',.1),('stab',.5),('heartbeat',.3)],
 intent=I('Zara, Omar, Mrs. Lin, Bell, two zombies','Two zombies pull themselves over the roof edge by the outside ladder and shuffle toward the group','roof, ladder at the left edge','Zara glances back, two zombies advance from the left, camera shakes','Will the helicopter come before they reach them?'))
P.B(S([('lin',"Listen. Rotor blades.","ฟังสิ ใบพัดเฮลิคอปเตอร์")]),R.shot(zmoves={'r1':420,'r2':500},face={'lin':'back','zara':'back','omar':'back','bell':'back'},expr={'lin':'shock','zara':'shock','omar':'shock','bell':'shock'},extra=[HUT,dict(k='prop',t='heli',x=1030,y=250,s=1.1,to=(900,230))]),mood='warm',cam='crane_up',sfx=[('swell',0)],
 intent=I('Mrs. Lin, Zara, Omar, Bell','All four turn their backs to us and stare as a helicopter rises over the skyline while the zombies close in','roof, sky with a helicopter','back views of all four, helicopter spotlight on the right','Will it land?'))
R.zout('r1','r2')
P.B(S([('pip',"Mayday! Mayday! Open the door!","เมย์เดย์! เมย์เดย์! เปิดประตู!"),('ann',"...Please stop saying that. We are landing.","...ช่วยหยุดพูดแบบนั้น เรากำลังลงจอด")]),R.shot(expr={'omar':'grin','bell':'smile','lin':'smile','zara':'smile'},extra=[HUT,dict(k='prop',t='heli',x=900,y=230,s=1.5,to=(760,200))]),mood='comic',fx=[sticker(.15,'MAYDAY!',x=225,y=150,rot=5,size=58,c='#ffe14a',dur=1.6)],sfx=[('boing',.1),('swell',1.0)],
 intent=I('Omar, Bell, Mrs. Lin, Zara, Pip','The helicopter lands over them while Pip squawks MAYDAY at the pilot','roof, helicopter hovering','all four smile, cage next to Omar, sticker MAYDAY!','Did they really make it?'))
P.close();TH.append("ตอนที่สามจากสาม จบเดอะลาสต์ฟลอร์ ติดตามซีรีส์ถัดไป")
BEATS[-1]['intent']=I('Tower intercom','The intercom shows THE END and invites viewers to follow','lobby intercom panel','green terminal end card','What will the next series be?')
META=W.meta(hook='Three Flashes Saved Us On The Roof! A Parrot Yells MAYDAY',premise='The roof door is locked and the zombies are one flight behind.',
 body='Finale of THE LAST FLOOR. The survivors find the roof key and signal the helicopter with a frying pan. Real tip: three of anything (flashes, fires, whistle blasts) is the international distress signal.',nxt='',ask='What would YOU use to signal for help? Tell me in the comments.',
 tags='the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy',
 tt='Three flashes. 🚁🧟 The roof, the rescue and a parrot yelling MAYDAY.',ig='Three flashes. 🚁 The finale: the roof, the rescue and a parrot yelling MAYDAY. Real survival tip inside.',pin='What would YOU use to signal for help? 👇')
COVER=dict(beat=9,frac=.55,main='A PAN SAVED|THE ROOF',box='THE ROOF')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['signal-in-threes','pan-mirror','key-roof','helicopter-rescue'])
