from worldlib import *
W=World('worlds/lastfloor.json');P=W.part(1,'THE LOBBY',of=3);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='a zombie delivery courier steps out of the lobby elevator holding a pizza',goal='climb twelve floors to the roof before the 6 a.m. rescue helicopter leaves',obstacle='zombies at the glass door, open doors full of zombies on floor two',twist='Bell shoves the courier into the elevator and sends it to the basement, then the group discovers a chef with a pan and a very loud parrot',payoff='something is climbing the stairwell after them')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
FOOT=640
def stp(i):return (360+i*64+32,650-(i+1)*46)   # stairs item: x=360,y=650, 8 steps of run 64 / rise 46
def climb(who,expr,a=0,b=6,sc=.6):
    p0,p1=stp(a),stp(b);return W.person(who,expr,p0[0],p0[1],sc,view='side',pose='walk',anim='walk',to=(p1[0],p1[1]))
def fl(n):return [dict(t='floorsign',x=780,y=200,s=1.1,label=str(n))]
EL=lambda lab='G',open_=False:[dict(t='elevator',x=330,y=600,s=1.5,open=open_,label=lab)]
LOB=dict(x=620,y=470,z=.62)
# 1 HOOK  who: Zara + zombie courier | where: lobby, elevator open
ST=dict(x=640,y=450,z=.7);RF=dict(x=640,y=470,z=.7)
P.B(S([('zara',"I ordered a pizza. I did NOT order that.","ฉันสั่งพิซซ่า ไม่ได้สั่งอันนั้น")]),W.set('lobby',[W.hz(1,390,390,y=FOOT,sc=1.0,seed=2),dict(k='prop',t='pizza',x=470,y=500,s=1.6,rot=-8),W.person('zara','shock',700,pose='stand')],add=EL('G',True),**LOB),mood='creep',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Zara, zombie courier','Zara freezes as a zombie courier steps out of the elevator and holds out a pizza box','lobby, elevator doors open at the left','wide shot, the pizza box is big and held toward her','Will the zombie hand over the pizza?'))
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่หนึ่งจากสาม: ล็อบบี้")
BEATS[-1]['intent']=I('Tower intercom','The intercom screen lights up and announces the series, part and topic','lobby intercom panel','green terminal card with the series name','What is this building announcing?')
P.B(S([('zara',"Nope. Nope. Nope.","ไม่ ไม่ ไม่เอา")]),W.set('lobby',[W.hz(1,520,520,y=FOOT,sc=1.0,seed=2),W.person('zara','shock',700,pose='panic')],add=EL('G',True),**LOB),mood='comic',cam='push_in',sfx=[('boing',.1)],
 intent=I('Zara','Zara throws her hands up and backs away from the courier','lobby, in front of the open elevator','panic pose, the zombie shuffles after her','Where can she run?'))
P.B(S([('bell',"Zara! Behind me!","ซาร่า! มาข้างหลังฉัน!")]),W.set('lobby',[W.hz(1,520,520,y=FOOT,sc=1.0,seed=2),W.person('zara','scared',760),W.person('bell','angry',930,view='side',flip=True,pose='walk',anim='walk',to=(640,FOOT))],add=EL('G',True),**LOB),mood='creep',cam='push_in',fx=[sticker(.3,'SHOVE!',x=225,y=150,rot=-6,size=60,c='#ffcf6a',dur=1.2)],sfx=[('horde',.2)],
 intent=I('Bell, Zara','Bell runs in from the stair door and charges the zombie courier','lobby, between the stair door and the elevator','Bell walks across the shot, sticker SHOVE!','Can the old super stop a zombie?'))
P.B(S([('bell',"Elevators beep and open. Zombies love that.","ลิฟต์ติ๊งแล้วเปิด ซอมบี้ชอบนัก")]),W.set('lobby',[W.person('zara','shock',760),W.person('bell','calm',640,pose='stand')],add=EL('B',False),**LOB),mood='comic',sfx=[('click',.2),('rimshot',.9)],
 intent=I('Bell, Zara','Bell has shoved the courier inside and the doors close; the display now says B for basement','lobby, closed elevator with display B','the display letter changes from G to B','What else is coming up that elevator?'))
P.B(S([('bell',"Evac helicopter. Roof. Six a.m.","เฮลิคอปเตอร์อพยพ ดาดฟ้า หกโมงเช้า")]),card('macro',obj='walkie',label='ROOF',sub='6 AM',bg=dict(loc='w_lastfloor',v='lobby',z=1.7,x=620,y=430)),mood='warm',sfx=[('radio',0)],
 intent=I('Bell','Bell lifts his walkie-talkie; its screen shows ROOF 6 AM','lobby, close-up of the walkie-talkie','macro card of the radio with the message on its screen','Can they climb twelve floors before six?'))
P.B(S([('zara',"Twelve floors. In the dark.","สิบสองชั้น ในความมืด"),('bell',"Then we start now.","งั้นเริ่มเดี๋ยวนี้")]),W.set('lobby',[W.hz(6,880,990,y=FOOT,sc=1.0,seed=7),W.person('zara','scared',560),W.person('bell','angry',700,view='side',pose='reach')],x=620,y=470,z=.62,add=EL('B',False)),mood='creep',cam='push_in',sfx=[('horde',.1),('stab',.6)],
 intent=I('Bell, Zara','Bell points at the stair door while zombies pile up against the glass front door','lobby, glass front door on the right','Bell points, zombie crowd behind the glass','Will the glass hold?'))
P.B(S([('bell',"Zombies hate stairs. No hands for the rail.","ซอมบี้เกลียดบันได ไม่มีมือจับราว")]),W.set('stair',[climb('bell','calm',0,3,.62),climb('zara','worried',0,2,.55)],x=640,y=450,z=.7,add=fl(2)),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Bell, Zara','Bell and Zara climb the first flight of stairs','stair, floor 2 sign on the wall','side view, both walk up the diagonal steps','Is the stairwell really safer?'))
P.B(S([('zara',"Floor two. Every door is open.","ชั้นสอง ทุกประตูเปิดอยู่")]),W.lane('hall',W.crowd(5,-120,120,6,13,seed=11)+[W.at('zara',-110,2.2,'scared'),W.at('bell',80,2.4,'worried')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.2)],
 intent=I('Zara, Bell','They stop in a long hall of open doors; zombies are far down at the end','hall on floor 2, 2.5D corridor of doors','camera travels forward, zombies tiny at the vanishing point','Will the zombies notice them?'))
P.B(S([('bell',"Close them. One by one.","ปิดมัน ทีละบาน")]),card('macro',obj='lock',bg=dict(loc='w_lastfloor',v='stair',z=1.7,x=640,y=430)),mood='warm',sfx=[('click',.3),('bell',.8)],
 intent=I('Bell','Bell clicks a fire-door lock shut behind them','stair, close-up of the lock','macro card of the padlock and chain, click sound','Is one lock enough?'))
P.B(S([('omar',"Don't hurt me! I'm a chef!","อย่าทำร้ายผม! ผมเป็นเชฟ")]),W.set('stair',[dict(k='prop',t='door',x=1130,y=600,s=1.5),W.person('omar','scared',1010,view='front',pose='panic'),W.person('zara','shock',600),W.person('bell','calm',460)],x=640,y=450,z=.7,add=fl(3)),mood='comic',sfx=[('creak',.1),('boing',.7)],
 intent=I('Omar, Zara, Bell','Omar flings his flat open and waves a frying pan at them','stair, floor 3 door at the right','panic pose, pan raised, door open','Can a chef fight zombies?'))
P.B(S([('omar',"I brought my pan.","ผมเอากระทะมาด้วย"),('zara',"A pan is not a plan.","กระทะไม่ใช่แผน")]),W.duo('omar','zara','smile','angry',v='stair',add=fl(3),extra=[dict(k='prop',t='pan',x=480,y=470,s=.9,rot=-30)]),mood='comic',sfx=[('rimshot',.9)],
 intent=I('Omar, Zara','Omar lifts the pan proudly while Zara rolls her eyes','stair, floor 3','two-shot, the pan is big in the frame','Does the pan do anything useful?'))
P.B(S([('omar',"Also, meet Pip. Mrs. Lin's parrot.","และนี่พิพ นกแก้วของคุณนายลิน")]),W.set('stair',W.hold(W.person('omar','grin',860),'cage',dx=70,dy=-110,sc=1.1)+[W.person('bell','angry',640),W.person('zara','worried',470)],x=640,y=450,z=.7,add=fl(3)),mood='comic',sfx=[('boing',.1)],
 intent=I('Omar, Bell, Zara','Omar carries a birdcage with a parrot inside','stair, floor 3','cage held next to Omar','What will the parrot do?'))
P.B(S([('pip',"Open the door! Open the door!","เปิดประตู! เปิดประตู!"),('bell',"Pip. Not that sentence.","พิพ ไม่ใช่ประโยคนั้น")]),W.cuf('bell','angry',v='stair',extra=[dict(k='prop',t='cage',x=860,y=640,s=1.3)],add=fl(3)),mood='comic',fx=[sticker(.2,'SQUAWK!',x=225,y=170,rot=-6,size=56,c='#ffe14a',dur=1.5)],sfx=[('boing',.1)],
 intent=I('Bell, Pip','The parrot squawks and Bell winces beside the cage','stair, close on Bell and the cage','close-up, sticker SQUAWK!','Who else heard that?'))
P.B(S([('zara',"Something is climbing after us.","มีอะไรกำลังไต่ตามเรามา")]),W.set('stair',[W.hz(4,320,520,y=620,sc=1.0,seed=9),W.person('zara','scared',760,view='back',headView='side',seq=turn((0,'front'),(.7,'back','side'))),W.person('omar','scared',900),W.person('bell','scared',1010)],x=640,y=450,z=.7,add=fl(3)),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('horde',.5)],
 intent=I('Zara, Omar, Bell','Zara turns her back and looks down the stairwell where zombies climb toward them','stair, floor 3, looking down the steps','Zara turns from front to back view, zombies rise on the left','How close are they?'))
P.close('the stairs');TH.append("ตอนที่หนึ่งจากสาม เดอะลาสต์ฟลอร์ ต่อไป: บันได ติดตามตอนที่สอง")
BEATS[-1]['intent']=I('Tower intercom','The intercom announces what comes next','lobby intercom panel','green terminal card','What happens next?')
META=W.meta(hook='A Zombie Delivers Pizza To The Elevator! 12 Floors To Survive',premise='Twelve floors. One stairwell. A pizza zombie, a chef with a pan and a parrot.',
 body='The super and a teen must climb a zombie-filled tower to the roof before the 6 a.m. rescue helicopter. Real tip: never take the elevator, use the stairs and lock the fire doors behind you.',nxt='the stairs',ask='Which floor would YOU stop on? Tell me in the comments.',
 tags='the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy',
 tt='A zombie delivered pizza to the elevator. 🍕🧟 12 floors, one parrot, one pan.',ig='A zombie delivered pizza to the elevator. 🍕 12 floors, one parrot, one pan. Real survival tip inside.',pin='Which floor would YOU stop on? 👇 Next: the stairs.')
COVER=dict(beat=0,frac=.55,main='ZOMBIE PIZZA|DELIVERY',box='PART 1 · THE LAST FLOOR')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports()
