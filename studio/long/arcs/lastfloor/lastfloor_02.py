from worldlib import *
W=World('worlds/lastfloor.json');P=W.part(2,'THE STAIRS',of=3);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='Mrs. Lin lives on floor four and nobody knows if she is alive',goal='keep climbing: floors five to twelve',obstacle='a sofa jammed across the stairs on floor five, and a locked red door on floor six',twist='the sofa becomes a weapon and Mrs. Lin has to lock her zombie sister Dot in',payoff='a chase through the floor-eight hall ends at the foot of the last flight')
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
P.B(S([('omar',"Floor four. Mrs. Lin lives here.","ชั้นสี่ คุณนายลินอยู่ที่นี่")]),W.lane('hall',[W.at('omar',-90,2.1,'worried'),W.at('zara',70,2.3,'scared'),W.at('bell',-10,2.9,'scared')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('creak',.3)],fx=[P.announce()],
 intent=I('Omar, Zara, Bell','The group tiptoes down the hall on floor four toward a glowing door','hall on floor 4, door at the end','camera travels down the corridor','Is Mrs. Lin still alive?'))
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่สองจากสาม: บันได")
BEATS[-1]['intent']=I('Tower intercom','The intercom screen lights up and announces the series, part and topic','lobby intercom panel','green terminal card with the series name','What is this building announcing?')
P.B(S([('lin',"Pip! There you are! Who locked my stairs?","พิพ! อยู่นี่เอง ใครล็อกบันไดฉัน?")]),W.lane('hall',[W.at('lin',0,3.6,'angry',pose='reach'),W.at('omar',-110,2.0,'smile'),W.at('zara',100,2.2,'shock')],x=640,y=430,z=1.0),mood='comic',sfx=[('boing',.2)],
 intent=I('Mrs. Lin, Omar, Zara','Mrs. Lin storms out of her flat with a bat, furious about the locked stairs','hall on floor 4, her door at the end','she walks into frame, pose reach with the bat','Will she join them or fight them?'))
P.B(S([('omar',"Floor four, five, six... this is a lot of floors.","ชั้นสี่ ห้า หก... ชั้นเยอะจัง"),('zara',"Keep climbing. Don't count.","เดินต่อ อย่านับ")]),W.set('stair',[climb('omar','worried',0,5,.62),climb('zara','calm',0,4,.58),climb('lin','calm',0,3,.6)],add=fl(4),**ST),mood='comic',cam='drift',sfx=[('sigh',.3),('rimshot',1.6)],
 intent=I('Omar, Zara, Mrs. Lin','Omar, Zara and Mrs. Lin climb the stairs in a line, Omar puffing behind','stair, floor 4 sign','side view, three climbers on the diagonal steps','Is Omar going to make it all the way?'))
P.B(S([('bell',"I did. Rule one.","ฉันเอง กฎข้อแรก"),('lin',"...Fair.","...ก็แฟร์")]),W.duo('bell','lin','calm','calm',v='stair',add=fl(4)),mood='comic',sfx=[('rimshot',.8)],
 intent=I('Bell, Mrs. Lin','Bell and Mrs. Lin stare each other down, then she lowers the bat','stair, floor 4','two-shot, bat lowers','What is rule one?'))
P.B(S([('bell',"Go up. Seal the door behind you.","ขึ้นข้างบน ปิดประตูข้างหลัง")]),card('rulecard',n=1,head='TOWER RULE',lines=['GO UP','SEAL THE DOOR','BEHIND YOU'],bg=dict(loc='w_lastfloor',v='stair',z=1.6,x=640,y=430)),mood='warm',sfx=[('bell',0)],
 intent=I('Bell','Bell states rule one; the card shows GO UP, SEAL THE DOOR BEHIND YOU','stair, rule card hung on the wall','paper tag over the blurred stairwell','Will they be able to follow it?'))
P.B(S([('zara',"Floor five. The stairs are blocked!","ชั้นห้า บันไดถูกกั้นไว้!")]),W.set('stair',[dict(k='prop',t='sofa',x=712,y=392,s=.85),W.person('zara','shock',470,pose='panic'),W.person('omar','worried',560),W.person('bell','worried',650),W.person('lin','worried',730)],x=640,y=450,z=.7,add=fl(5)),mood='creep',sfx=[('stab',.2)],
 intent=I('Zara, Omar, Bell, Mrs. Lin','All four stop dead below a big red sofa jammed across the stairs','stair, floor 5, sofa on the steps','wide shot, Zara throws her hands up','How do they get past a sofa?'))
P.B(S([('bell',"Push! Everyone push!","ดัน! ทุกคนช่วยกันดัน!")]),W.set('stair',[W.hz(5,300,520,y=640,sc=1.0,seed=13),dict(k='prop',t='sofa',x=712,y=392,s=.85),W.person('bell','angry',648,420,.6,view='side',pose='reach'),W.person('omar','angry',584,466,.62,view='side',pose='reach'),W.person('zara','angry',520,512,.55,view='side',pose='reach')],x=640,y=450,z=.7,add=fl(5)),mood='creep',cam='push_in',fx=[sticker(.2,'PUSH!',x=225,y=150,rot=-6,size=60,c='#ffcf6a',dur=1.4)],sfx=[('horde',.1),('swell',.3)],
 intent=I('Bell, Omar, Zara','Three of them shove the sofa while zombies climb up behind','stair, floor 5','side-view pushing pose, sticker PUSH!, zombies on the left','Will the sofa move in time?'))
P.B(S([('zara',"...Direct hit.","...โดนเต็มๆ")]),W.set('stair',[W.hz(3,260,420,y=640,sc=1.0,seed=14),W.person('zara','grin',700,pose='stand'),W.person('omar','shock',800),W.person('bell','shock',900)],x=640,y=450,z=.7,add=fl(5)),mood='comic',sfx=[('boing',.1),('rimshot',.8)],
 intent=I('Zara, Omar, Bell','The sofa has tumbled down the stairs; Zara watches it flatten the zombies','stair, floor 5, steps now clear','zombies on the left are squashed, the group grins','What waits on floor six?'))
P.B(S([('lin',"That's my sister's flat. She says never open it.","นั่นห้องของพี่สาวฉัน เธอบอกว่าห้ามเปิด"),('pip',"Open the door!","เปิดประตู!")]),W.set('stair',[dict(k='prop',t='door',x=900,y=600,s=1.5,c='#a8332b'),W.person('lin','worried',560),W.person('omar','scared',660),W.person('zara','scared',760),W.person('bell','scared',470)],x=640,y=450,z=.7,add=fl(6)+[dict(t='poster',x=900,y=470,s=.8,label='NO')]),mood='creep',cam='push_in',fx=[sticker(.2,'PIP NO!',x=225,y=150,rot=5,size=52,c='#ffe14a',dur=1.3)],sfx=[('stab',.2),('heartbeat',.6)],
 intent=I('Mrs. Lin, Omar, Zara, Bell','They reach floor six; a red door marked NO stands in front of them as the parrot squawks','stair, floor 6, red door','camera pushes in on the red door','What is behind the red door?'))
P.B(S([('lin',"Dot, you're not well.","ด็อต เธอไม่สบาย")]),W.set('flat',[W.hz(1,860,860,y=FOOT,sc=1.0,seed=21),dict(k='prop',t='crate',x=620,y=600,s=1.0),dict(k='prop',t='crate',x=700,y=600,s=.8),W.person('lin','worried',440,view='side',pose='stand'),W.person('omar','shock',330,view='side')],x=620,y=470,z=.62),mood='comic',sfx=[('creak',.1),('rimshot',1.2)],
 intent=I('Mrs. Lin, Omar, Dot the zombie','The door swings open on a messy flat; Dot the zombie sits there in a party hat holding a casserole','flat on floor 6, junk piled everywhere','wide shot of the flat, Dot at the right with a casserole','Will Dot attack?'))
P.B(S([('bell',"Leave her. Lock the door.","ทิ้งเธอไว้ ล็อกประตู")]),W.set('flat',[W.hz(1,760,760,y=FOOT,sc=1.0,seed=21),W.person('bell','angry',460,view='side',pose='reach'),W.person('lin','worried',360,view='side')],x=620,y=470,z=.62),mood='creep',cam='push_in',sfx=[('stab',.2)],
 intent=I('Bell, Mrs. Lin, Dot','Dot gets up with the casserole and shuffles toward them; Bell reaches for the door handle','flat on floor 6','Dot walks into the shot, Bell grabs the door','Will they get the door shut in time?'))
P.B(S([('lin',"Goodbye, Dot. Click.","ลาก่อน ด็อต คลิก")]),card('macro',obj='lock',bg=dict(loc='w_lastfloor',v='stair',z=1.7,x=640,y=430)),mood='sad',sfx=[('click',.5),('swell',0)],
 intent=I('Mrs. Lin','Mrs. Lin turns the key and locks her sister in','stair, close-up of the lock','macro card of the padlock, click and a sad swell','Is this the only way to keep Dot safe?'))
P.B(S([('zara',"They're gaining. Floor seven.","พวกมันตามทัน ชั้นเจ็ด")]),W.set('stair',[W.hz(4,320,520,y=620,sc=1.0,seed=31),climb('zara','scared',0,4,.6),climb('omar','scared',0,3,.62),climb('bell','worried',0,5,.62)],add=fl(7),**ST),mood='creep',cam='push_in',sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('Zara, Omar, Bell','The group runs up the stairs while zombies climb after them','stair, floor 7 sign','side view climbing, zombies close on the left','Will they outrun them?'))
P.B(S([('omar',"Twelve floors. My legs filed a complaint.","สิบสองชั้น ขาผมยื่นเรื่องร้องเรียนแล้ว")]),W.set('stair',[W.person('omar','worried',700,view='side',pose='walk',anim='walk',to=(780,340)),W.person('zara','calm',560,view='side',pose='walk',anim='walk',to=(640,420))],add=fl(9),**ST),mood='comic',sfx=[('sigh',.4),('rimshot',1.8)],
 intent=I('Omar, Zara','Omar wheezes up the stairs, Zara jogs ahead','stair, floor 9 sign','two figures climbing, Omar slower','Will Omar make it?'))
P.B(S([('bell',"Shortcut! Through the floor eight hall!","ทางลัด! ผ่านโถงชั้นแปด!")]),W.lane('hall',W.crowd(6,-90,90,4,11,seed=61)+[W.at('bell',-100,1.9,'angry',pose='reach'),W.at('lin',100,2.0,'scared'),W.at('zara',-10,2.4,'scared')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('horde',.1),('stab',.5)],
 intent=I('Bell, Mrs. Lin, Zara','The group sprints through a hall on floor eight with a pack of zombies at the far end','hall on floor 8, 2.5D corridor','camera travels fast toward the end of the corridor','Is the shortcut a trap?'))
P.close('the roof');TH.append("ตอนที่สองจากสาม เดอะลาสต์ฟลอร์ ต่อไป: ดาดฟ้า ติดตามตอนที่สาม")
BEATS[-1]['intent']=I('Tower intercom','The intercom announces what comes next','lobby intercom panel','green terminal card','What happens next?')
META=W.meta(hook='Never Open The Red Door! A Sofa Smashes The Zombies',premise='A sofa, a sister and a red door that says NO.',
 body='Part 2 of THE LAST FLOOR: the climb gets harder. A sofa blocks the stairs, Mrs. Lin has to lock her zombie sister in, and the zombies are one flight behind. Real tip: block and seal doors behind you, and keep moving up.',nxt='the roof',ask='Would YOU have opened the red door? Tell me in the comments.',
 tags='the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy',
 tt='Never open the red door. 🚪🧟 A sofa, a sister and 12 floors.',ig='Never open the red door. 🚪 A sofa, a sister and 12 floors. Real survival tip inside.',pin='Would YOU open the red door? 👇 Next: the roof.')
COVER=dict(beat=6,frac=.55,main="DON'T OPEN|THE RED DOOR",box='PART 2 · THE LAST FLOOR')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['mrs-lin','sofa-barricade','dot-the-zombie'])
