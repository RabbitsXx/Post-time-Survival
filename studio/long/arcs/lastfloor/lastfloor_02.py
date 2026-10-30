from worldlib import *
W=World('worlds/lastfloor.json');P=W.part(2,'THE ROOF',of=2);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
P.B(S([('bell',"Roof door sealed. We made it. Almost.","ล็อกประตูดาดฟ้าแล้ว เรามาถึงแล้ว เกือบ")]),W.cuf('bell','calm',v='roof'),mood='warm',fx=[P.announce()],sfx=[('click',.2)])
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่สองจากสอง: ดาดฟ้า")
P.B(S([('omar',"Twelve floors. My legs filed a complaint.","สิบสองชั้น ขาผมยื่นเรื่องร้องเรียนแล้ว")]),W.set('roof',[W.person('omar','worried',560),W.person('zara','calm',760,view='side',flip=True),W.person('bell','calm',930,view='back',headView='side')],x=640,y=470,z=.9),mood='comic',sfx=[('sigh','e-0.5')])
P.B(S([('zara',"Now what?","แล้วไงต่อ?"),('bell',"Now we signal. Three of anything.","ตอนนี้เราส่งสัญญาณ สามครั้งของอะไรก็ได้")]),W.duo('zara','bell','scared','calm',v='roof'),mood='warm',sfx=[('swell',0)])
P.B(S([('bell',"Three flashes. Pause. Repeat.","สามครั้ง หยุด ซ้ำ")]),card('macro',obj='lantern',bg=dict(loc='w_lastfloor',v='roof',z=1.7,x=640,y=430)),mood='warm',sfx=[('click',.2),('click',.6),('click',1.0)])
P.B(S([('omar',"My pan is a mirror.","กระทะผมเป็นกระจก"),('zara',"Your pan is a plan?!","กระทะคือแผนเหรอ?!")]),W.duo('omar','zara','grin','shock',v='roof'),mood='comic',fx=[sticker(.2,'PAN PLAN!',x=225,y=170,rot=-6,size=54,c='#ffcf6a',dur=1.5)],sfx=[('boing',.2),('rimshot',1.4)])
P.B(S([('bell',"Rule two. Signal in threes.","กฎข้อสอง ส่งสัญญาณสามครั้ง")]),card('rulecard',n=2,head='TOWER RULE',lines=['SIGNAL','IN THREES','FLASH FLASH FLASH'],bg=dict(loc='w_lastfloor',v='roof',z=1.6,x=640,y=430)),mood='warm',sfx=[('bell',0)])
P.B(S([('bell',"The fire door. It's holding. Please keep holding.","ประตูกันไฟ ยังทนอยู่ ขอให้ทนต่อไป")]),W.set('roof',[W.person('bell','scared',640,view='back',pose='stand'),W.person('zara','scared',470),W.person('omar','scared',810)],x=640,y=470,z=.95),mood='creep',cam='push_in',sfx=[('heartbeat',.2),('stab',.8)])
P.B(S([('pip',"Mayday! Mayday! Open the door!","เมย์เดย์! เมย์เดย์! เปิดประตู!")]),W.cuf('omar','shock',v='roof',extra=[dict(k='prop',t='crate',x=700,y=640,s=.7)]),mood='comic',fx=[sticker(.15,'MAYDAY!',x=225,y=170,rot=5,size=58,c='#ffe14a',dur=1.6)],sfx=[('boing',.1)])
P.B(S([('omar',"I taught him that. Yesterday.","ผมสอนมัน เมื่อวาน")]),W.cuf('omar','smile',v='roof'),mood='comic',sfx=[('rimshot',.6)])
P.B(S([('zara',"Look. Lights in the sky.","ดูสิ แสงบนฟ้า")]),W.set('roof',[W.person('zara','shock',540,view='back',headView='side'),W.person('omar','shock',700,view='back'),dict(k='prop',t='heli',x=980,y=210,s=1.1)],x=640,y=470,z=.95),mood='warm',cam='crane_up',sfx=[('swell',0)])
P.B(S([('ann',"Alder Tower. Rescue helicopter, landing on the roof. Everyone lives. Even the parrot.","อัลเดอร์ทาวเวอร์ เฮลิคอปเตอร์กู้ภัยกำลังลงจอดบนดาดฟ้า ทุกคนรอด แม้แต่นกแก้ว")]),W.set('roof',[W.person('bell','smile',470),W.person('zara','smile',640),W.person('omar','smile',810),dict(k='prop',t='heli',x=640,y=190,s=1.5)],x=640,y=470,z=.95),mood='warm',sfx=[('swell',0)])
P.close();TH.append("ตอนที่สองจากสอง จบเดอะลาสต์ฟลอร์ ติดตามซีรีส์ถัดไป")
META=W.meta(hook="Three Flashes Saved Us On The Roof! A Parrot Yells MAYDAY",premise="The tower is sealed. The roof door is shaking. One chef, one teen, one super, one parrot.",
 body="Finale of THE LAST FLOOR. The survivors reach the roof, signal for rescue in threes, and the parrot finally says the right line. Real tip: three of anything (flashes, fires, whistle blasts) is the international distress signal.",nxt='',ask="What would YOU use to signal for help? Tell me in the comments.",
 tags="the last floor, zombie apartment, zombie apocalypse animation, zombie story, zombie rescue, signal for help, distress signal, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, rooftop, survival tips, apocalypse story, animated comedy",
 tt="Three flashes. 🚁🧟 The roof, the rescue and a parrot yelling MAYDAY.",ig="Three flashes. 🚁 The finale: the roof, the rescue and a parrot yelling MAYDAY. Real survival tip inside.",pin="What would YOU use to signal for help? 👇")
COVER=dict(beat=8,frac=.5,main="PARROT YELLS|MAYDAY",box="PART 2 · THE LAST FLOOR")
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['roof','roof-tank','signal-in-threes','pan-mirror'])
