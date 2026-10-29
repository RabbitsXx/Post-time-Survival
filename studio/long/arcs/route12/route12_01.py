from buslib import *
from formats import *
P=Part(1,'THE STAIRS','9:40 PM','ECHO STATION',series='THE LAST BUS: ROUTE 12',of=10,say='the Last Bus, Route twelve');BEATS=P.BEATS;TITLE=P.TITLE
D=dict(th_series='รถเมล์คันสุดท้าย เส้นทาง 12',th_topic='บันได',out='station',pov='station',
 hook=[('dante',"Fun fact. Zombies can't climb stairs.","ข้อมูลสนุกๆ: ซอมบี้ปีนบันไดไม่ได้")],
 doubt=[('priya',"Dante. That's a movie, not biology.","แดนเต นั่นมันหนัง ไม่ใช่ชีววิทยา")],
 a_icon='stairs',a_t='STAIRS = SAFE',b_icon='doors',b_t='ONE EXIT = TRAP',
 debate=[('dante',"Stairs are the perfect defense.","บันไดคือแนวป้องกันที่สมบูรณ์แบบ"),('priya',"Stairs are one exit. With a horde at the bottom.","บันไดคือทางออกเดียว แล้วมีฝูงซอมบี้รออยู่ข้างล่าง")],concede=[('dante',"...Okay. That's a trap.","...โอเค มันคือกับดัก")],
 setup=[('rosa',"Echo Station. Four floors. Zombies at every door.","สถานีเอคโค่ สี่ชั้น ซอมบี้อยู่ทุกประตู")],
 partner='marcus',attempt=[('dante',"Marcus. Take the stairs. I'll... supervise.","มาร์คัส ขึ้นบันไดไป ผมจะ... คุมงานเอง"),('marcus',"Why is it always me?","ทำไมต้องเป็นผมทุกที?")],
 failer='marcus',fail=[('marcus',"They're climbing! They're climbing!","มันปีนขึ้นมา! มันปีนขึ้นมา!"),('dante',"...Huh. That's new.","...เอ๊ะ ใหม่เลยนะเนี่ย")],sticker='THEY CLIMB!',
 gary=[('teddy',"Gary says zombies have legs. Legs do stairs.","แกรี่บอกว่าซอมบี้มีขา ขาก็เดินบันไดได้")],
 tip_say=[('priya',"Real rule. If it can walk, it can climb. Always have two exits.","กฎจริงๆ: ถ้าเดินได้ ก็ปีนได้ ต้องมีทางออกสองทางเสมอ")],tip_icon='doors',tip_t1='ALWAYS HAVE',tip_t2='TWO EXITS',
 gag=[('steve',"Excuse me. Where are the stairs?","ขอโทษครับ บันไดอยู่ไหน?"),('rosa',"No stairs, Steve.","ไม่มีบันไดหรอก สตีฟ")],
 punch=[('marcus',"I climbed four floors for a movie.","ผมวิ่งขึ้นสี่ชั้นเพราะหนังเรื่องเดียว"),('june',"You climbed beautifully, dear.","หนูปีนได้สวยมากเลยจ้ะ")],
 clue=(['SAFE ZONE 12','ETA: 9 STOPS','ROUTE 12: NOT ON MAP'],[('bus',"Safe Zone twelve, nine stops. Route twelve is not on any map. Cozy!","เซฟโซนสิบสอง อีกเก้าป้าย เส้นทางสิบสองไม่อยู่ในแผนที่ใดๆ อบอุ่นจัง!")]),
 nxt='the mall',th_nxt='ห้างสรรพสินค้า',quip='',th_quip='')
TH=myth_part(P,D)
META=dict(hook="Zombies Can't Climb Stairs? Here's Why That's A Trap",premise="12 strangers. 1 bus. 10 zombie myths, tested by the worst possible passengers.",
 body="Dante is sure zombies can't climb stairs. Priya has questions. A station, four floors and one very unlucky security guard prove who is right.\nReal tip: never hide where there is only one exit.",
 nxt='the mall',ask="What is the worst zombie-movie 'rule' you have ever heard? Tell me in the comments.",
 tt="Zombies can't climb stairs? 🪜🧟 Dante is VERY sure. Marcus is about to find out.",ig="Zombies can't climb stairs? 🪜 Dante is very sure. Marcus is about to find out. Real tip inside.",
 pin="What is the worst zombie-movie 'rule' you have ever heard? 👇 Next stop: the mall.",
 tags="the last bus, last bus route 12, zombie myths, zombie myths busted, zombie survival tips, zombie apocalypse animation, funny zombie animation, zombie comedy, zombie shorts, apocalypse story, post time survival, zombie story, animated zombie series, survival tips, movie logic, zombie facts, apocalypse humor, bus apocalypse, animated comedy, zombie survival")
COVER=dict(beat=0,frac=.6,main="ZOMBIES CAN'T|CLIMB STAIRS?",box="MYTH #1 · BUSTED")
