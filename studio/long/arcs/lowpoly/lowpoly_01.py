from lowlib import *
P=LowPart(1,'ONE PIG','JUNE 15, 1859','SAN JUAN ISLAND');BEATS=P.BEATS;TITLE=P.TITLE
TH=[]
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
PIG=lambda x=980,s=.9:prop('pig',x,FOOT,s)
# 0 hook
P.B(S([('lyman',"Get out of my potatoes!","ออกไปจากมันฝรั่งของข้านะ!")]),low('garden',[person('lyman','angry',520,talk=True),PIG(860,1.0)],x=700,y=470,z=1.2),mood='creep',fx=[P.announce()],sfx=[('oink',.2),('stab',.5)],level=.05)
# 1 the telegraph announces the series
P.tele_open();TH.append("โพสต์ไทม์โลว์โพลี เดอะพิกวอร์ ตอนที่หนึ่งจากสาม: หมูหนึ่งตัว")
P.B(S([('tele',"Eighteen fifty-nine. One farmer. One big pig.","ปี 1859 ชาวนาหนึ่งคน หมูตัวใหญ่หนึ่งตัว")]),low('strait',[],x=640,y=470,z=1.0),mood='idle',sfx=[('tick',0)],level=.1)
P.B(S([('lyman',"It ate my whole potato patch.","มันกินสวนมันฝรั่งของข้าจนหมด")]),cuf('lyman','angry',v='garden',z=1.8),mood='comic',sfx=[('oink','e-0.3')],level=.15)
P.B(S([('lyman',"So I shot it.","ข้าก็เลยยิงมัน")]),cuf('lyman','shock',v='garden',z=2.0),mood='creep',sfx=[('stab',0),('rimshot',.7)],level=.25,fx=[sticker(.2,'BANG',x=225,y=170,rot=-6,size=70,c='#ffb3c1',dur=1.2)])
P.B(S([('griffin',"That was MY pig!","นั่นหมูของข้านะ!")]),cuf('griffin','angry',v='garden',z=1.8),mood='comic',sfx=[('gasp',0)],level=.35)
P.B(S([('lyman',"Ten dollars. Final offer.","สิบดอลลาร์ ข้อเสนอสุดท้าย"),('griffin',"One hundred.","หนึ่งร้อย")]),duo('lyman','griffin','calm','angry',v='garden'),mood='comic',sfx=[('boing','e-0.3')],level=.45)
P.B(S([('lyman',"Then arrest me.","งั้นก็จับข้าสิ")]),cuf('lyman','smile',v='cabin',z=1.8),mood='creep',sfx=[('heartbeat',0)],level=.55)
P.B(S([('griffin',"Oh, I will. Britain owns this island.","ข้าจะจับแน่ เกาะนี้เป็นของอังกฤษ"),('lyman',"America owns it.","เกาะนี้เป็นของอเมริกา")]),duo('griffin','lyman','angry','angry',v='garden'),mood='creep',sfx=[('stab',.6)],level=.65)
P.B(S([('pickett',"Sixty-six soldiers. Landing now.","ทหารหกสิบหกนาย ขึ้นฝั่งเดี๋ยวนี้")]),low('camp',[person('pickett','smile',640,talk=True)],x=640,y=470,z=1.1),mood='creep',sfx=[('horn',.2)],level=.8)
P.B(S([('tele',"One pig. Zero survivors. Hundreds of soldiers.","หมูหนึ่งตัว ไม่รอดเลย ทหารอีกหลายร้อย")]),card('text',lines=['ONE PIG','ALMOST','ONE WAR'],size=80,bg='#14202e',c='#ffb3c1',c2='#fff'),mood='sad',sfx=[('bell',0)],level=.9)
P.B(S([('tele',"What is the silliest reason you know of for a fight? Tell me below.","เหตุผลที่ตลกที่สุดที่ทำให้ทะเลาะกันที่คุณเคยได้ยิน คืออะไร? บอกเราในคอมเมนต์")]),card('text',lines=['SILLIEST REASON','FOR A FIGHT?','COMMENT BELOW'],size=62,bg='#14202e',c='#ffb3c1',c2='#fff'),mood='comic',sfx=[('ping',0)],level=.9)
P.tele_close('the standoff');TH.append("ตอนที่หนึ่งจากสาม เดอะพิกวอร์ ตอนต่อไป: การเผชิญหน้า ติดตามตอนที่สอง")
META=dict(hook="One Pig Almost Started A War (1859 True Story)",premise="In 1859 one farmer shot one pig and America and Britain nearly went to war.",
 body="In June 1859 on San Juan Island, American farmer Lyman Cutlar shot a pig that was eating his potatoes. The pig belonged to a British company manager. Ten dollars was offered, one hundred was demanded, and soldiers soon landed. It is called the Pig War. The pig was the only casualty.\\nSilliest reason for a fight you know? Comment below.",
 nxt='the standoff',ask="What is the silliest reason you know of for a fight? Tell me in the comments.",steve=False,
 cast="Lyman (the farmer) · Griffin (the pig's owner) · Capt. Pickett (US army) · Rear Adm. Baynes (Royal Navy). The story is a real event; dialogue is dramatised.",
 tt="One pig almost started a war. 🐖 True story, 1859.",ig="One pig almost started a war. 🐖 True story, 1859. Part 1 of 3.",
 pin="Silliest reason for a fight you've heard? 👇 Part 2: the standoff.",
 tags="the pig war, pig war 1859, san juan island, history shorts, true history, funny history, low poly, low poly animation, history animation, post time lowpoly, post time survival, shorts, history facts, strange history, american british history")
COVER=dict(beat=3,frac=.6,main="ONE PIG|ONE WAR?",box="1859 · THE PIG WAR")
NEW=dict(world='pigwar',setting='San Juan Island, June 1859: a disputed island between two empires',
 structure='escalation ladder: one pig, then a price dispute, then soldiers, then warships (WAR METER climbs each part)',
 announcer='telegraph',announcer_voice='tele',palette='low-poly sky blue, grass green, pig pink',
 locs=['low:garden','low:strait','low:camp','low:cabin'],cast=['lyman','griffin','pickett','baynes'],
 props=['pig','potatoes','cannon','flag-us-uk'],devices=['telegraph','dateline'],gags=['war-meter-and-pig-counter'],tips=['one-pig-is-not-worth-a-war'],
 tied_to_topic='Topic = the real 1859 Pig War, so the world is a potato garden, a strait of warships and an army camp; the props are a pig and two flags; the lesson is that the only casualty of that standoff was one pig.',
 library_used=['pax body rig (new faces/palettes)','caption engine','SFX base','card/zoom/shake helpers','finish9 audio chain'])
