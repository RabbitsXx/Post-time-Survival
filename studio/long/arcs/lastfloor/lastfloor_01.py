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
def fl(n):return [dict(t='floorsign',x=700,y=190,s=1.1,label=str(n))]
EL=lambda lab='G',open_=False:[dict(t='elevator',x=330,y=600,s=1.5,open=open_,label=lab)]
LOB=dict(x=620,y=470,z=.62)
# 1 HOOK  who: Zara + zombie courier | where: lobby, elevator open
ST=dict(x=640,y=450,z=.7);RF=dict(x=640,y=470,z=.7)
ELV=lambda lab='G',op=False:[dict(t='elevator',x=330,y=600,s=1.5,open=op,label=lab)]
# ============ LOBBY (one Scene keeps everybody's place from shot to shot) ============
L=Scene(W,'lobby',x=620,y=470,z=.62)
L.put('zara',700,expr='shock').zput('courier',420,seed=2,sc=1.0,held='pizza')
P.B(S([('zara',"I ordered a pizza. I did NOT order that.","ฉันสั่งพิซซ่า ไม่ได้สั่งอันนั้น")]),L.shot(add=ELV('G',True)),mood='creep',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Zara, zombie courier','Zara freezes as a zombie courier steps out of the elevator and holds out a pizza box','lobby, elevator doors open at the left','wide shot, the pizza box is held toward her','Will the zombie hand over the pizza?'))
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่หนึ่งจากสาม: ล็อบบี้")
BEATS[-1]['intent']=I('Tower intercom','The intercom screen lights up and announces the series, part and topic','lobby intercom panel','green terminal card with the series name','What is this building announcing?')
P.B(S([('zara',"Nope. Nope. Nope.","ไม่ ไม่ ไม่เอา")]),L.shot(moves={'zara':(770,'run')},zmoves={'courier':540},expr={'zara':'scared'},add=ELV('G',True)),mood='chase',cam='push_in',sfx=[('boing',.1)],
 intent=I('Zara, zombie courier','Zara runs away to the right while the courier shuffles after her','lobby, between the elevator and the stair door','Zara runs (side view), the courier walks after her','Where can she run?'))
L.put('bell',800,expr='angry')
P.B(S([('bell',"Zara! Behind me!","ซาร่า! มาข้างหลังฉัน!")]),L.shot(moves={'bell':(700,'walk')},zmoves={'courier':(575,False)},expr={'zara':'scared'},add=ELV('G',True)),mood='creep',cam='push_in',sfx=[('horde',.2)],
 intent=I('Bell, Zara, zombie courier','Bell steps out of the stair door and strides toward the courier, Zara cowers behind him','lobby, stair door at the right','Bell walks left across the shot, Zara stands still at the right','Can the old super stop a zombie?'))
L.p['bell']['flip']=True
P.B(S([('bell',"Elevators beep and open. Zombies love that.","ลิฟต์ติ๊งแล้วเปิด ซอมบี้ชอบนัก")]),L.shot(pose={'bell':'reach'},face={'bell':'side'},zmoves={'courier':(400,False)},add=ELV('G',True)),mood='creep',fx=[sticker(.2,'SHOVE!',x=225,y=150,rot=-6,size=60,c='#ffcf6a',dur=1.2)],sfx=[('stab',.1),('boing',.6)],
 intent=I('Bell, Zara, zombie courier','Bell shoves the courier backwards into the elevator','lobby, in front of the open elevator','Bell pushes with both arms, the courier is thrown back to the elevator door','Is he really gone?'))
L.zout('courier');L.p['bell']['flip']=False;L.p['bell']['expr']='calm'
P.B(S([('bell',"Ding. Going down. Basement.","ติ๊ง ลงชั้นใต้ดิน")]),L.shot(add=ELV('B',False),expr={'bell':'smile'}),mood='comic',sfx=[('click',.2),('rimshot',.9)],
 intent=I('Bell, Zara','The elevator doors have closed and its display now says B for basement; Bell dusts off his hands','lobby, closed elevator with display B','the display letter changed from G to B','What else is coming up that elevator?'))
P.B(S([('bell',"Evac helicopter. Roof. Six a.m.","เฮลิคอปเตอร์อพยพ ดาดฟ้า หกโมงเช้า")]),card('macro',obj='walkie',label='ROOF',sub='6 AM',bg=dict(loc='w_lastfloor',v='lobby',z=1.7,x=620,y=430)),mood='warm',sfx=[('radio',0)],
 intent=I('Bell','Bell lifts his walkie-talkie; its screen shows ROOF 6 AM','lobby, close-up of the walkie-talkie','macro card of the radio with the message on its screen','Can they climb twelve floors before six?'))
P.B(S([('zara',"Twelve floors. In the dark.","สิบสองชั้น ในความมืด"),('bell',"Then we start now.","งั้นเริ่มเดี๋ยวนี้")]),L.shot(moves={'bell':(775,'run'),'zara':(810,'run')},expr={'zara':'scared'},add=ELV('B',False)),mood='chase',cam='push_in',fx=[sticker(.4,'BANG!',x=300,y=170,rot=6,size=56,c='#ffcf6a',dur=1.0),shake(.4,5,.5)],sfx=[('horde',.1),('stab',.5)],
 intent=I('Bell, Zara','Zombies slam the glass front door while Bell and Zara run for the red stair door','lobby, glass door at the right, stair door in the middle','both run to the stair door, BANG! on the glass','Will the glass hold?'))
# ============ STAIRS: floor 1 -> 2 ============
S1=Scene(W,'stair',x=600,y=450,z=.7,add=fl(2))
S1.put('bell',stp(0)[0]-40,stp(0)[1]+40,expr='calm').put('zara',stp(0)[0]-90,stp(0)[1]+50,expr='worried')
P.B(S([('bell',"Zombies hate stairs. No hands for the rail.","ซอมบี้เกลียดบันได ไม่มีมือจับราว")]),S1.shot(moves={'bell':(stp(4)[0],'walk',stp(4)[1]),'zara':(stp(3)[0],'walk',stp(3)[1])}),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Bell, Zara','Bell and Zara come through the stair door and climb the first flight','stair, floor 2 sign on the wall','side view, both walk up the diagonal steps','Is the stairwell really safer?'))
# ============ HALL, floor 2 ============
P.B(S([('zara',"Floor two. Every door is open.","ชั้นสอง ทุกประตูเปิดอยู่")]),W.lane('hall',W.crowd(5,-120,120,6,13,seed=11)+[W.at('bell',-70,2.3,'worried',view='back'),W.at('zara',70,2.4,'scared',view='back')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.2)],
 intent=I('Bell, Zara','They stand with their backs to us at the start of a long hall of open doors; zombies are far down at the end','hall on floor 2, 2.5D corridor of doors','back views of both, zombies tiny at the vanishing point','Will the zombies notice them?'))
P.B(S([('bell',"Close them. One by one.","ปิดมัน ทีละบาน")]),card('macro',obj='lock',bg=dict(loc='w_lastfloor',v='stair',z=1.7,x=640,y=430)),mood='warm',sfx=[('click',.3),('bell',.8)],
 intent=I('Bell','Bell clicks a fire-door lock shut behind them','stair, close-up of the lock','macro card of the padlock and chain, click sound','Is one lock enough?'))
# ============ STAIRS, floor 3 landing: Omar ============
S2=Scene(W,'stair',x=700,y=450,z=.7,add=fl(3))
S2.put('bell',470,expr='calm').put('zara',590,expr='worried')
DOOR3=dict(k='prop',t='door',x=940,y=600,s=1.3)
P.B(S([('omar',"Don't hurt me! I'm a chef!","อย่าทำร้ายผม! ผมเป็นเชฟ")]),S2.shot(extra=[DOOR3,W.person('omar','scared',940,FOOT,view='front',pose='panic')]),mood='comic',sfx=[('creak',.1),('boing',.7)],
 intent=I('Omar, Zara, Bell','Omar flings his flat door open and waves a frying pan at them','stair, floor 3 landing, door at the right','panic pose, pan raised, door open','Can a chef fight zombies?'))
S2.put('omar',940,expr='smile')
P.B(S([('omar',"I brought my pan.","ผมเอากระทะมาด้วย"),('zara',"A pan is not a plan.","กระทะไม่ใช่แผน")]),S2.shot(moves={'omar':(800,'walk')},vx=680,z=.85,expr={'zara':'angry'},extra=[DOOR3]),mood='comic',sfx=[('rimshot',.9)],
 intent=I('Omar, Zara','Omar walks toward them lifting the pan proudly while Zara rolls her eyes','stair, floor 3 landing','medium shot of the group at the landing','Does the pan do anything useful?'))
S2.hold('omar','cage',ox=62,oy=-120,sc=1.0)
P.B(S([('omar',"Also, meet Pip. Mrs. Lin's parrot.","และนี่พิพ นกแก้วของคุณนายลิน")]),S2.shot(moves={'omar':(690,'walk')},expr={'omar':'grin'},extra=[DOOR3]),mood='comic',sfx=[('boing',.1)],
 intent=I('Omar, Bell, Zara','Omar walks over carrying a birdcage with a parrot inside','stair, floor 3 landing','Omar carries the cage across the shot toward the others','What will the parrot do?'))
P.B(S([('pip',"Open the door! Open the door!","เปิดประตู! เปิดประตู!"),('bell',"Pip. Not that sentence.","พิพ ไม่ใช่ประโยคนั้น")]),S2.shot(vx=680,z=1.1,expr={'bell':'angry'},extra=[DOOR3]),mood='comic',fx=[sticker(.2,'SQUAWK!',x=225,y=170,rot=-6,size=56,c='#ffe14a',dur=1.5)],sfx=[('boing',.1)],
 intent=I('Bell, Omar, Pip','The parrot squawks and Bell winces beside Omar and the cage','stair, floor 3 landing, closer shot','medium shot, sticker SQUAWK!','Who else heard that?'))
S2.zput('z1',250,seed=9).zput('z2',340,seed=12).zput('z3',170,seed=15)
S2.p['zara']['face']='backhead'
P.B(S([('zara',"Something is climbing after us.","มีอะไรกำลังไต่ตามเรามา")]),S2.shot(zmoves={'z1':420,'z2':490,'z3':330},expr={'zara':'scared','omar':'scared','bell':'scared'},extra=[DOOR3]),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('horde',.5)],
 intent=I('Zara, Omar, Bell','Zara turns her back and looks left where zombies shuffle in from the stairwell','stair, floor 3 landing, zombies at the left','Zara turns around, three zombies advance from the left edge','How close are they?'))
P.close('the stairs');TH.append("ตอนที่หนึ่งจากสาม เดอะลาสต์ฟลอร์ ต่อไป: บันได ติดตามตอนที่สอง")
BEATS[-1]['intent']=I('Tower intercom','The intercom announces what comes next','lobby intercom panel','green terminal card','What happens next?')
META=W.meta(hook='A Zombie Delivers Pizza To The Elevator! 12 Floors To Survive',premise='Twelve floors. One stairwell. A pizza zombie, a chef with a pan and a parrot.',
 body='The super and a teen must climb a zombie-filled tower to the roof before the 6 a.m. rescue helicopter. Real tip: never take the elevator, use the stairs and lock the fire doors behind you.',nxt='the stairs',ask='Which floor would YOU stop on? Tell me in the comments.',
 tags='the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy',
 tt='A zombie delivered pizza to the elevator. 🍕🧟 12 floors, one parrot, one pan.',ig='A zombie delivered pizza to the elevator. 🍕 12 floors, one parrot, one pan. Real survival tip inside.',pin='Which floor would YOU stop on? 👇 Next: the stairs.')
COVER=dict(beat=0,frac=.55,main='ZOMBIE PIZZA|DELIVERY',box='THE LOBBY')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports()
