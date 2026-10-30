from farmlib import *
P=FarmPart(1,'THE CORN','8:42 PM','HOLLOW CREEK');BEATS=P.BEATS;TITLE=P.TITLE
TH=[]
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
HORDE=lambda n,x0,x1,**k:hz(n,x0,x1,y=k.pop('y',650),s=k.pop('s',1.6),seed=k.pop('seed',5),jit=50,**k)
# 0 hook: the corn whispers
P.B(S([('junie',"Grandma. The corn is whispering again.","ยาย ข้าวโพดกระซิบอีกแล้ว")]),cuf('junie','worried',v='porch',z=1.7,hy=345),mood='creep',fx=[P.announce()],sfx=[('rustle',.2),('cricket',.4)])
# 1 the farm radio announces the series
P.radio_open();TH.append("สวัสดีตอนเย็นชาวฮอลโลว์ครีก นี่คือเก็บเกี่ยวครั้งสุดท้าย ตอนที่หนึ่งจากสาม: ข้าวโพด")
P.B(S([('ruth',"Corn doesn't whisper, Junie. Corn rustles.","ข้าวโพดไม่กระซิบหรอก จูนี่ มันแค่ส่งเสียงซู่ซ่า")]),cuf('ruth','calm',v='porch'),mood='warm',sfx=[('rustle',.1)])
P.B(S([('junie',"Then why did it say my name?","แล้วทำไมมันเรียกชื่อหนูล่ะ?")]),cuf('junie','scared',v='porch'),mood='creep',sfx=[('stab',.5)])
P.B(S([('hank',"Ma'am. The corn is walking.","คุณนายครับ ข้าวโพดมันเดินได้")]),farm('field',[HORDE(7,300,1000),person('hank','scared',500)],x=640,y=470,z=.95,fgh=120),mood='creep',cam='push_in',sfx=[('horde',.2)])
P.B(S([('ruth',"Hank. How many?","แฮงก์ กี่ตัว?"),('hank',"...All of them.","...ทั้งหมดเลยครับ")]),duo('ruth','hank','angry','scared',v='yard'),mood='creep',sfx=[('heartbeat',.2)])
P.B(S([('eli',"Nobody panic. I have a plan.","ใครอย่าตกใจ ผมมีแผน"),('eli',"It's called Scarecrow Two-Point-Oh.","เรียกว่า หุ่นไล่กาเวอร์ชันสองจุดศูนย์")]),cuf('eli','grin',v='yard'),mood='comic',sfx=[('click',.3)])
P.B(S([('ruth',"Where did you get my radio?","เอาวิทยุฉันมาจากไหน?"),('eli',"It's a loan. Mostly.","ยืมมาครับ ส่วนใหญ่น่ะ")]),farm('yard',[person('ruth','angry',470),prop('scarecrow',700,FOOT,1.0),person('eli','smile',900)],x=690,y=455,z=.7),mood='comic',sfx=[('boing','e-0.5')])
P.B(S([('hank',"Why am I carrying it?","ทำไมผมต้องเป็นคนแบก?"),('eli',"You're tall. And brave.","คุณตัวสูง แล้วก็กล้า"),('hank',"I am neither.","ผมไม่ใช่ทั้งสองอย่าง")]),cuf('hank','scared',v='yard'),mood='comic',sfx=[('sigh','e-0.4')])
P.B(S([('eli',"Three. Two. One. Polka.","สาม สอง หนึ่ง โพลก้า")]),farm('field',[HORDE(8,260,1020,to=40),prop('scarecrow',640,655,1.15)],x=640,y=470,z=.92,fgh=120),mood='comic',sfx=[('polka',.5),('rimshot','e-0.3')],fx=[sticker(1.0,'POLKA!',x=225,y=170,rot=-6,size=58,c='#ffcf6a',dur=1.6)])
P.B(S([('junie',"They're dancing.","พวกมันกำลังเต้นรำ")]),cuf('junie','shock',v='yard'),mood='comic',sfx=[('polka',.0)])
P.B(S([('eli',"...They're dancing?!","...พวกมันเต้นจริงเหรอ?!")]),cuf('eli','shock',v='yard'),mood='comic',sfx=[('boing',.2)])
P.B(S([('ruth',"Rule one. Sound leads them. So we lead the sound.","กฎข้อแรก เสียงนำทางพวกมัน เราก็เลยนำเสียงไปทางอื่น")]),card('rulecard',n=1,head='FARM RULE',lines=['SOUND','LEADS THEM','SO WE LEAD IT'],bg=dict(loc='farm',v='yard',z=1.6,x=500,y=430)),mood='warm',sfx=[('bell',0)])
P.B(S([('ruth',"Your grandfather planted this corn. We pick it. Every ear.","ปู่ของเด็กๆ ปลูกข้าวโพดนี้ไว้ เราจะเก็บมัน ทุกฝัก"),('hank',"Every ear.","ทุกฝักครับ")]),duo('ruth','hank','calm','smile',v='porch'),mood='sad',sfx=[('swell',0)])
P.B(S([('radio',"...Hollow Creek, if you can hear this: the barn door is open.","...ฮอลโลว์ครีก ถ้าได้ยินเสียงนี้ ประตูโรงนาเปิดอยู่")]),farm('yard',[],x=250,y=430,z=1.0,ajar=True),mood='creep',cam='push_in',sfx=[('stab',.2),('radio',0),('creak','e-1.2')])
P.radio_close('the barn');TH.append("ตอนที่หนึ่งจากสาม เก็บเกี่ยวครั้งสุดท้าย คืนต่อไป: โรงนา ติดตามตอนที่สอง")
META=dict(hook="The Corn Is Whispering. A Family Farm Fights Back With A Polka",premise="One family farm. Three nights until the last harvest. And something is walking in the corn.",
 body="Grandma Ruth, inventor Eli, little Junie and gentle giant Hank have three nights to pick the last corn crop. Tonight the corn whispers, the field starts to walk, and Eli's plan involves a scarecrow, a stolen radio and a polka.\nReal tip: sound leads them. So we lead the sound.",
 nxt='the barn',ask="What song would YOU use to lure the zombies away? Tell me in the comments.",steve=False,
 cast="THE FAMILY: Ruth (grandma, still the boss) · Eli (12, inventor, borrows things) · Junie (7, talks to the corn) · Hank (the hired hand, huge and gentle). And Hollow Creek Farm Radio.",
 tt="The corn is whispering. 🌽🧟 One family farm, one stolen radio, one very good polka.",ig="The corn is whispering. 🌽 One family farm, one stolen radio, one very good polka. Real survival tip inside.",
 pin="What song would YOU play to lure zombies away? 👇 Next night: the barn.",
 tags="the last harvest, zombie farm, zombie apocalypse farm, zombie apocalypse animation, zombie story, farm survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, apocalypse story, family survival, scarecrow, polka, corn field, zombie farm animation, survival tips, animated comedy")
COVER=dict(beat=4,frac=.55,main="THE CORN|IS WALKING",box="NIGHT 1 · THE LAST HARVEST")
NEW=dict(world='harvest',setting='a family farm at dusk, three nights before the last corn harvest',
 structure='countdown: three nights, one farm rule per night, cliffhanger to the next place on the farm',
 announcer='farm-radio',announcer_voice='radio',palette='dusk gold, corn green, barn red',
 locs=['farm:yard','farm:field','farm:porch','farm:barn'],cast=['ruth','eli','junie','hank'],
 props=['scarecrow','corn-rows','barn-door','radio'],devices=['radio','nightline'],gags=['polka-scarecrow-lures-zombies'],tips=['sound-leads-them'],
 tied_to_topic='Topic = a farm under siege at harvest time, so the world is a yard, a corn field, a porch and a barn; the props are a scarecrow and a stolen radio; the real tip is that sound leads zombies.',
 library_used=['pax body rig and hair styles (new heads/palettes)','caption engine','SFX base','card/zoom/shake helpers','finish9 audio chain'])
