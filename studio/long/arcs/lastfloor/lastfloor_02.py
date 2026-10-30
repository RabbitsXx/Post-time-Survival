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
def fl(n):return [dict(t='floorsign',x=700,y=190,s=1.1,label=str(n))]
EL=lambda lab='G',open_=False:[dict(t='elevator',x=330,y=600,s=1.5,open=open_,label=lab)]
LOB=dict(x=620,y=470,z=.62)
# 1 HOOK  who: Zara + zombie courier | where: lobby, elevator open
ST=dict(x=640,y=450,z=.7);RF=dict(x=640,y=470,z=.7)
LANDX=(930,1000);LANDY=282          # top landing of the flight: floor level of the next floor
SOFA=lambda:dict(k='prop',t='sofa',x=stp(5)[0],y=stp(5)[1]+8,s=.8)
REDDOOR=dict(k='prop',t='door',x=1000,y=LANDY,s=1.1,c='#a8332b')
# ---------- hall, floor 4: Mrs. Lin ----------
P.B(S([('omar',"Floor four. Mrs. Lin lives here.","ชั้นสี่ คุณนายลินอยู่ที่นี่")]),W.lane('hall',[W.at('omar',-90,2.1,'worried',view='back'),W.at('zara',70,2.3,'scared',view='back'),W.at('bell',-10,2.9,'scared',view='back')],x=640,y=430,z=1.0),mood='creep',cam='travel',fx=[P.announce()],sfx=[('creak',.3)],
 intent=I('Omar, Zara, Bell','The group tiptoes down the hall on floor four toward a glowing door, seen from behind','hall on floor 4, door at the end','back views walking away down the corridor','Is Mrs. Lin still alive?'))
P.open();TH.append("ประกาศถึงชาวตึกอัลเดอร์ นี่คือเดอะลาสต์ฟลอร์ ตอนที่สองจากสาม: บันได")
BEATS[-1]['intent']=I('Tower intercom','The intercom screen announces part two: the stairs','lobby intercom panel','green terminal card','What waits on the stairs?')
P.B(S([('lin',"Pip! There you are! Who locked my stairs?","พิพ! อยู่นี่เอง ใครล็อกบันไดฉัน?")]),W.lane('hall',[W.at('lin',0,3.6,'angry',pose='reach'),W.at('omar',-90,2.1,'smile',view='back'),W.at('zara',70,2.3,'shock',view='back')],x=640,y=430,z=1.0),mood='comic',sfx=[('boing',.2)],
 intent=I('Mrs. Lin, Omar, Zara','Mrs. Lin storms out of her flat with a bat, furious about the locked stairs, and the group freezes','hall on floor 4, her door at the end','she walks into frame, pose reach with the bat','Will she join them or fight them?'))
# ---------- stairs: they all go back to the landing ----------
S4=Scene(W,'stair',x=640,y=450,z=.7,add=fl(4))
S4.put('bell',470,expr='calm').put('lin',590,expr='angry').put('omar',700,expr='worried').put('zara',810,expr='calm')
P.B(S([('bell',"I did. Rule one.","ฉันเอง กฎข้อแรก"),('lin',"...Fair.","...ก็แฟร์")]),S4.shot(expr={'lin':'calm'}),mood='comic',sfx=[('rimshot',.8)],
 intent=I('Bell, Mrs. Lin, Omar, Zara','On the floor-four landing Bell and Mrs. Lin stare each other down, then she lowers the bat','stair, floor 4 landing','wide shot, four people in a row, Lin lowers the bat','What is rule one?'))
P.B(S([('bell',"Go up. Seal the door behind you.","ขึ้นข้างบน ปิดประตูข้างหลัง")]),card('rulecard',n=1,head='TOWER RULE',lines=['GO UP','SEAL THE DOOR','BEHIND YOU'],bg=dict(loc='w_lastfloor',v='stair',z=1.6,x=640,y=430)),mood='warm',sfx=[('bell',0)],
 intent=I('Bell','Bell states rule one; the card shows GO UP, SEAL THE DOOR BEHIND YOU','stair, rule card hung on the wall','paper tag over the blurred stairwell','Will they be able to follow it?'))
# ---------- the flight: sofa on step 5 ----------
S5=Scene(W,'stair',x=700,y=450,z=.7,add=fl(5))
for who,k,ex in (('lin',0,'calm'),('zara',1,'calm'),('omar',2,'worried'),('bell',3,'calm')):S5.put(who,stp(k)[0],stp(k)[1],expr=ex)
P.B(S([('omar',"Floor four, five, six... that's a lot of floors.","ชั้นสี่ ห้า หก... ชั้นเยอะจัง"),('zara',"Keep climbing. Don't count.","เดินต่อ อย่านับ")]),S5.shot(moves={'lin':(stp(1)[0],'walk',stp(1)[1]),'zara':(stp(2)[0],'walk',stp(2)[1]),'omar':(stp(3)[0],'walk',stp(3)[1]),'bell':(stp(4)[0],'walk',stp(4)[1])},extra=[SOFA()]),mood='comic',cam='drift',sfx=[('sigh',.3),('rimshot',1.6)],
 intent=I('Omar, Zara, Mrs. Lin, Bell','Four climbers walk up the stairs in a line toward a big red sofa lying across the steps','stair, floor 5 sign, sofa on step 5','side view, all four climb, the sofa is ahead of them','Is Omar going to make it all the way?'))
P.B(S([('zara',"Floor five. The stairs are blocked!","ชั้นห้า บันไดถูกกั้นไว้!")]),S5.shot(expr={'zara':'shock','omar':'shock','bell':'worried','lin':'worried'},pose={'zara':'panic'},face={'zara':'front','omar':'front','bell':'front','lin':'front'},extra=[SOFA()]),mood='creep',sfx=[('stab',.2)],
 intent=I('Zara, Omar, Bell, Mrs. Lin','All four stop dead on the steps below the sofa jammed across the stairs','stair, floor 5, sofa on the steps','wide shot, Zara throws her hands up','How do they get past a sofa?'))
S5.zput('z1',250,seed=13).zput('z2',350,seed=14).zput('z3',450,seed=16)
P.B(S([('bell',"Push! Everyone push!","ดัน! ทุกคนช่วยกันดัน!")]),S5.shot(zmoves={'z1':330,'z2':430,'z3':520},expr={'bell':'angry','omar':'angry','zara':'angry'},pose={'bell':'reach','omar':'reach','zara':'reach'},face={'bell':'side','omar':'side','zara':'side','lin':'side'},extra=[SOFA()]),mood='creep',cam='push_in',fx=[sticker(.2,'PUSH!',x=225,y=150,rot=-6,size=60,c='#ffcf6a',dur=1.4)],sfx=[('horde',.1),('swell',.3)],
 intent=I('Bell, Omar, Zara, Mrs. Lin','Three of them shove the sofa while zombies climb up the stairs behind them','stair, floor 5','side-view pushing pose, sticker PUSH!, zombies rising from the left','Will the sofa move in time?'))
S5.zout('z2')
P.B(S([('zara',"...Direct hit.","...โดนเต็มๆ")]),S5.shot(zmoves={'z1':420,'z3':440},expr={'zara':'grin','omar':'shock','bell':'shock','lin':'smile'},extra=[dict(k='prop',t='sofa',x=stp(5)[0],y=stp(5)[1]+8,s=.8,to=(430,640),spin=-380)]),mood='comic',fx=[sticker(.9,'THUD!',x=150,y=300,rot=-8,size=54,c='#ffcf6a',dur=1.0)],sfx=[('boing',.4),('rimshot',1.2)],
 intent=I('Zara, Omar, Bell, Mrs. Lin','The sofa tumbles down the stairs and flattens the zombies; the climbers grin','stair, floor 5, the sofa falls to the bottom','the sofa spins down the steps onto the zombies, sticker THUD!','What waits on floor six?'))
S5.zout('z1','z3')
S6=S5;S6.add=fl(6)
P.B(S([('lin',"That's my sister's flat. She says never open it.","นั่นห้องของพี่สาวฉัน เธอบอกว่าห้ามเปิด")]),S6.shot(moves={'bell':(LANDX[0],'walk',LANDY),'omar':(LANDX[0]-60,'walk',LANDY),'zara':(LANDX[0]-120,'walk',LANDY),'lin':(LANDX[0]-180,'walk',LANDY)},extra=[REDDOOR,dict(k='prop',t='poster',x=1000,y=LANDY-110,s=.55,label='NO')]),mood='creep',cam='push_in',sfx=[('stab',.2),('heartbeat',.6)],
 intent=I('Mrs. Lin, Omar, Zara, Bell','They climb onto the floor-six landing where a red door marked NO waits','stair, floor 6 landing, red door at the right','everyone walks up the last steps toward the red door','What is behind the red door?'))
# ---------- flat of floor 6: Dot ----------
F=Scene(W,'flat',x=620,y=470,z=.62)
F.put('lin',440,expr='worried').put('omar',340,expr='shock').put('bell',250,expr='scared').zput('dot',860,seed=21,sc=1.0,held='crate')
P.B(S([('lin',"Dot, you're not well.","ด็อต เธอไม่สบาย")]),F.shot(extra=[dict(k='prop',t='crate',x=640,y=600,s=.9),dict(k='prop',t='barrel',x=720,y=600,s=.8)],pose={'lin':'stand'}),mood='comic',sfx=[('creak',.1),('rimshot',1.2)],
 intent=I('Mrs. Lin, Omar, Bell, Dot the zombie','The door swings open on a messy flat; Dot the zombie stands in a party hat holding a casserole','flat on floor 6, junk piled everywhere','wide shot of the flat, Dot at the right with a casserole','Will Dot attack?'))
P.B(S([('bell',"Leave her. Lock the door.","ทิ้งเธอไว้ ล็อกประตู")]),F.shot(zmoves={'dot':(700,True)},moves={'bell':(300,'walk')},expr={'bell':'angry'},extra=[dict(k='prop',t='crate',x=640,y=600,s=.9),dict(k='prop',t='barrel',x=720,y=600,s=.8)]),mood='creep',cam='push_in',sfx=[('stab',.2)],
 intent=I('Bell, Mrs. Lin, Omar, Dot','Dot shuffles toward them with the casserole while Bell reaches for the door handle','flat on floor 6','Dot walks into the shot, Bell grabs the door','Will they get the door shut in time?'))
P.B(S([('lin',"Goodbye, Dot. Click.","ลาก่อน ด็อต คลิก")]),card('macro',obj='lock',bg=dict(loc='w_lastfloor',v='stair',z=1.7,x=640,y=430)),mood='sad',sfx=[('click',.5),('swell',0)],
 intent=I('Mrs. Lin','Mrs. Lin turns the key and locks her sister in','stair, close-up of the lock','macro card of the padlock, click and a sad swell','Is this the only way to keep Dot safe?'))
# ---------- up again: floors 7-9 ----------
S7=Scene(W,'stair',x=700,y=450,z=.7,add=fl(7))
for who,k,ex in (('lin',0,'worried'),('zara',1,'scared'),('omar',2,'scared'),('bell',3,'worried')):S7.put(who,stp(k)[0],stp(k)[1],expr=ex)
S7.zput('z1',300,seed=31).zput('z2',380,seed=32).zput('z3',460,seed=33)
P.B(S([('zara',"They're gaining. Floor seven.","พวกมันตามทัน ชั้นเจ็ด")]),S7.shot(moves={'lin':(stp(2)[0],'run',stp(2)[1]),'zara':(stp(3)[0],'run',stp(3)[1]),'omar':(stp(4)[0],'run',stp(4)[1]),'bell':(stp(5)[0],'run',stp(5)[1])},zmoves={'z1':400,'z2':470,'z3':540}),mood='creep',cam='push_in',sfx=[('horde',.1),('heartbeat',.5)],
 intent=I('Zara, Omar, Bell, Mrs. Lin','The group sprints up the stairs while three zombies climb after them','stair, floor 7 sign','side view running, zombies close on the left','Will they outrun them?'))
S7.add=fl(9)
P.B(S([('omar',"Twelve floors. My legs filed a complaint.","สิบสองชั้น ขาผมยื่นเรื่องร้องเรียนแล้ว")]),S7.shot(moves={'lin':(LANDX[0]-180,'walk',LANDY),'zara':(LANDX[0]-120,'walk',LANDY),'bell':(LANDX[0],'walk',LANDY),'omar':(stp(6)[0],'walk',stp(6)[1])},zmoves={'z1':470,'z2':540,'z3':600}),mood='comic',sfx=[('sigh',.4),('rimshot',1.8)],
 intent=I('Omar, Zara, Bell, Mrs. Lin','Everyone but Omar reaches the landing; Omar wheezes up the last steps','stair, floor 9 sign','side view, Omar lags behind the others','Will Omar make it?'))
P.B(S([('bell',"Shortcut! Through the floor ten hall!","ทางลัด! ผ่านโถงชั้นสิบ!")]),W.lane('hall',W.crowd(6,-90,90,4,11,seed=61)+[W.at('bell',-100,1.9,'angry',pose='reach'),W.at('lin',100,2.0,'scared'),W.at('zara',-10,2.4,'scared')],x=640,y=430,z=1.0),mood='creep',cam='travel',sfx=[('horde',.1),('stab',.5)],
 intent=I('Bell, Mrs. Lin, Zara','The group sprints through a hall on floor ten with a pack of zombies at the far end','hall on floor 10, 2.5D corridor','camera travels fast toward the end of the corridor','Is the shortcut a trap?'))
P.close('the roof');TH.append("ตอนที่สองจากสาม เดอะลาสต์ฟลอร์ ต่อไป: ดาดฟ้า ติดตามตอนที่สาม")
BEATS[-1]['intent']=I('Tower intercom','The intercom announces what comes next','lobby intercom panel','green terminal card','What happens next?')
META=W.meta(hook='Never Open The Red Door! A Sofa Smashes The Zombies',premise='A sofa, a sister and a red door that says NO.',
 body='Part 2 of THE LAST FLOOR: the climb gets harder. A sofa blocks the stairs, Mrs. Lin has to lock her zombie sister in, and the zombies are one flight behind. Real tip: block and seal doors behind you, and keep moving up.',nxt='the roof',ask='Would YOU have opened the red door? Tell me in the comments.',
 tags='the last floor, zombie apartment, zombie apocalypse animation, zombie story, apartment survival, zombie survival tips, funny zombie animation, animated zombie series, zombie shorts, post time survival, zombie comedy, parrot, tower, stairwell, survival tips, apocalypse story, animated comedy',
 tt='Never open the red door. 🚪🧟 A sofa, a sister and 12 floors.',ig='Never open the red door. 🚪 A sofa, a sister and 12 floors. Real survival tip inside.',pin='Would YOU open the red door? 👇 Next: the roof.')
COVER=dict(beat=6,frac=.55,main="DON'T OPEN|THE RED DOOR",box='PART 2 · THE LAST FLOOR')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['mrs-lin','sofa-barricade','dot-the-zombie'])
