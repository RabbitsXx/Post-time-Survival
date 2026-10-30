from worldlib import *
W=World('worlds/lastfloor.json');P=W.part(1,'THE LOBBY',of=2);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
CAGE=lambda x:dict(k='prop',t='crate',x=x,y=590,s=.9)
P.B(S([('zara',"The elevator just opened by itself.","ลิฟต์เพิ่งเปิดเองเลย")]),W.cuf('zara','worried',v='lobby'),mood='creep',fx=[P.announce()],sfx=[('stab',.3)])
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่หนึ่งจากสอง: ล็อบบี้")
P.B(S([('bell',"Nobody touch it. We go up. Zombies hate stairs.","ห้ามใครแตะ เราขึ้นข้างบน ซอมบี้เกลียดบันได")]),W.cuf('bell','angry',v='lobby'),mood='creep',sfx=[('click',.2)])
P.B(S([('omar',"I live on floor twelve. With my frying pan.","ผมอยู่ชั้นสิบสอง กับกระทะของผม"),('zara',"Your pan is not a plan.","กระทะไม่ใช่แผน")]),W.duo('omar','zara','smile','angry',v='lobby'),mood='comic',sfx=[('boing','e-0.5')])
P.B(S([('bell',"They're at the front door.","พวกมันอยู่หน้าประตู")]),W.set('street',[W.horde(7,260,1020,y=640,seed=4),W.person('bell','scared',640,view='back',headView='side',flip=True)],x=640,y=450,z=.95),mood='creep',cam='push_in',sfx=[('horde',.2)])
P.B(S([('pip',"Open the door! Open the door!","เปิดประตู! เปิดประตู!"),('zara',"Who brought the parrot?!","ใครเอานกแก้วมา?!")]),W.duo('zara','omar','shock','scared',v='lobby',extra=[dict(k='prop',t='crate',x=820,y=590,s=.7)]),mood='comic',fx=[sticker(.2,'SQUAWK!',x=225,y=170,rot=-6,size=56,c='#ffe14a',dur=1.5)],sfx=[('boing',.1)])
P.B(S([('bell',"Mrs. Lin's parrot. Mrs. Lin is... upstairs.","นกแก้วของคุณนายลิน คุณนายลินอยู่... ข้างบน")]),W.cuf('bell','calm',v='lobby'),mood='sad',sfx=[('swell',0)])
P.B(S([('bell',"Fire doors. We lock every one behind us.","ประตูกันไฟ เราล็อกทุกบานที่ผ่านไป")]),card('macro',obj='lock',bg=dict(loc='w_lastfloor',v='stair',z=1.6,x=640,y=430)),mood='warm',sfx=[('click',.2),('bell',.5)])
P.B(S([('omar',"Floor three. Hello? Neighbours?","ชั้นสาม สวัสดี? เพื่อนบ้าน?")]),W.lane('hall',W.crowd(5,-120,120,5,12,seed=11)+[W.at('omar',-100,2.0,'worried'),W.at('zara',90,2.2,'scared')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.2)])
P.B(S([('zara',"Why is every door open?","ทำไมทุกประตูเปิดอยู่?")]),W.cuf('zara','scared',v='stair'),mood='creep',sfx=[('stab',.3)])
P.B(S([('bell',"Because nobody locked them.","เพราะไม่มีใครล็อก"),('omar',"Oh.","อ๋อ")]),W.duo('bell','omar','angry','shock',v='stair'),mood='comic',sfx=[('rimshot',.8)])
P.B(S([('bell',"Rule one. Go up. Seal the door behind you.","กฎข้อแรก ขึ้นข้างบน ปิดประตูข้างหลัง")]),card('rulecard',n=1,head='TOWER RULE',lines=['GO UP','SEAL THE DOOR','BEHIND YOU'],bg=dict(loc='w_lastfloor',v='stair',z=1.6,x=640,y=430)),mood='warm',sfx=[('bell',0)])
P.B(S([('zara',"Something is following us.","มีอะไรตามเรามา")]),W.set('stair',[W.person('zara','scared',560,view='back',headView='side',seq=turn((0,'front'),(.9,'back','side'))),W.person('omar','scared',760,pose='stand')],x=640,y=450,z=1.15),mood='creep',cam='push_in',sfx=[('heartbeat',.2)])
P.B(S([('pip',"Open the door!","เปิดประตู!"),('bell',"Pip. No.","พิพ ไม่")]),W.cuf('bell','angry',v='stair'),mood='comic',fx=[sticker(.15,'PIP NO!',x=225,y=170,rot=5,size=52,c='#ffe14a',dur=1.4)],sfx=[('boing',.2)])
P.B(S([('ann',"Alder Tower. The elevator is now on floor... zero. Something is inside it.","อัลเดอร์ทาวเวอร์ ลิฟต์อยู่ชั้น... ศูนย์ มีบางอย่างอยู่ข้างใน")]),W.lane('hall',W.crowd(8,-100,100,3.0,10,seed=21),x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('stab',.3),('horde',.5)])
P.close('the roof');TH.append("ตอนที่หนึ่งจากสอง เดอะลาสต์ฟลอร์ ต่อไป: ดาดฟ้า ติดตามตอนที่สอง")
META=W.meta(hook="Don't Touch The Elevator! A Tower, A Parrot And One Frying Pan",premise="Twelve floors. One stairwell. And a parrot that repeats the worst possible line.",
 body="The super, a teen, a night chef and a very loud parrot climb a zombie-filled apartment tower. Real tip: go up and lock the fire doors behind you.",nxt='the roof',ask="Which floor would YOU run to? Tell me in the comments.",
 tags="the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy",
 tt="Don't touch the elevator. 🏢🧟 A super, a teen, a chef and a very loud parrot.",ig="Don't touch the elevator. 🏢 A super, a teen, a chef and a very loud parrot. Real survival tip inside.",pin="Which floor would YOU run to? 👇 Next: the roof.")
COVER=dict(beat=5,frac=.5,main="DON'T TOUCH|THE ELEVATOR",box="PART 1 · THE LAST FLOOR")
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports()
