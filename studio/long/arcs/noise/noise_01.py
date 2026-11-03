from worldlib import *
W=World('worlds/noise.json');P=W.part(1,'QUIET HOURS',of=3);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='a building where nobody may speak while the dead listen',goal='survive the first night in total silence',obstacle='a loud neighbour, a noisy console and three zombies at the door',twist='the fire alarm panel starts to blink',payoff='what happens when the alarm rings?')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
def SC(loc,**p):
    s=Scene(W,loc,x=640,y=470,z=.7)
    for who,v in p.items():
        x,e=(v if isinstance(v,tuple) else (v,'calm'));s.put(who,x,expr=e,sc=W.sc(who))
    return s
ITEM=dict(okafor='wrench',bea='pan',priya='flashlight',theo=None)
def hold(sc,who):
    p=sc.p[who];it=ITEM.get(who)
    if not it:return []
    sg=-1 if p['flip'] else 1;c=p['sc']
    return [dict(k='prop',t=it,x=p['x']+sg*(24 if p['face']=='side' else 30)*c,y=p['y']-132*c,s=c*.55,rot=sg*172,flip=False)]
def B(sc,who,en,th,what,why,where='',expr=None,z=1.05,vx=None,mood='warm',sfx=None,cam='drift',moves=None,hide=(),**k):
    loc=sc.loc;ex=dict(expr or {})
    kw=dict(expr=ex,z=z,hide=hide)
    if moves:kw['moves']=moves
    if vx is not None:kw['vx']=vx
    ext=[]
    for w2 in sc.p:
        if w2 not in hide and ITEM.get(w2) and w2==who:ext+=hold(sc,w2)
    P.B(S([(who,en,th)]),sc.shot(extra=ext,**kw),mood=mood,cam=cam,sfx=sfx or [],intent=I(W.cast[who]['name'] if who in W.cast else 'Intercom',what,LAB[loc]+(', '+where if where else ''),'two-person framing, the speaker talking',why),**k)
LAB={'lobby':'building lobby','hallway':'apartment hallway','kitchen':'Bea kitchen','basement':'boiler basement','roof':'building roof','street':'city street'}
def FIGHT(sc,hero,zs,words,held):
    for i,(var,x) in enumerate(zs):
        sc.zput('z%d'%(i+1),x,var=var)
        sh,fx=strike(sc,hero,'z%d'%(i+1),words[i],held=held)
        P.B([],sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,intent=I(W.cast[hero]['name'],'%s hits the zombie, %s'%(W.cast[hero]['name'],words[i]),LAB[sc.loc]+', in the middle of the fight','side swing with an impact sticker, the zombie falls','What happens next?'))
St=SC('street',okafor=(300,'calm'));St.zput('a',760,var='robe').zput('b',930,var='postman').zput('c',1040,var='jogger')
B(St,'okafor',"The dead hear everything. So in this building, nobody speaks.","คนตายได้ยินทุกอย่าง ดังนั้นในตึกนี้ ห้ามใครพูด",'Okafor stands in the doorway as three zombies shuffle down the street','Why is the building so quiet?','three zombies outside',z=.7,mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)])
P.open();TH.append("น้อยส์ คอมเพลนท์ ตอนที่หนึ่งจากสาม: ชั่วโมงเงียบ")
BEATS[-1]['intent']=I('Building intercom','The building intercom announces the series, part and topic','intercom card','paper intercom card','Who lives in this building?')
Lb=SC('lobby',okafor=(520,'calm'))
B(Lb,'okafor',"Quiet hours. Always. Signed, management.","ชั่วโมงเงียบ ตลอดเวลา ลงชื่อ ผู้จัดการ",'Okafor tapes a handwritten sign to the glass door','Is it a joke or a rule?','tapes a sign on the door',z=.7)
Hw=SC('hallway',theo=(540,'smile'))
B(Hw,'theo',"Zombies outside. Dad rules at home. This is a tutorial level.","ซอมบี้ข้างนอก กฎตึกข้างใน นี่คือด่านสอนเล่น",'Theo whispers into his headset as if narrating a game','Does he think this is a game?','Theo alone with a headset',z=.75,mood='comic',sfx=[('rimshot',.9)])
Hw2=SC('hallway',okafor=(300,'calm'),theo=(560,'smile'))
B(Hw2,'okafor',"Theodore. This is not a game. Follow me. Silently.","ธีโอดอร์ นี่ไม่ใช่เกม ตามมา เงียบๆ",'Okafor leads Theo down the hallway with a finger on his lips','Where is he taking him?','Okafor and Theo',z=.9,moves={'okafor':(760,'walk'),'theo':(640,'walk')})
Kt=SC('kitchen',okafor=(260,'calm'),priya=(430,'tired'),bea=(660,'angry'),theo=(880,'worried'))
B(Kt,'bea',"WHO WANTS SOUP?!","ใครอยากกินซุปบ้าง",'Bea shouts over a steaming pot while everyone dives to shush her','Will the zombies hear?','four neighbours around the stove',z=.7,mood='comic',sfx=[('rimshot',.8)],fx=[sticker(.3,'SHHH!',x=225,y=170,rot=-6,size=62,c='#ffcf6a',dur=.9)])
B(Kt,'priya',"Medical fact. Bea is deaf in one ear and loud in the other.","ข้อเท็จจริงทางการแพทย์ บีหูหนวกข้างหนึ่ง และดังอีกข้าง",'Priya deadpans while Bea stirs the pot','Can they keep her quiet?','Priya looks at the others',expr={'priya':'smug'},z=1.0)
B(Kt,'okafor',"Rule one. Whisper. Rule two. No kettles. Rule three. No Beatrice.","ข้อหนึ่ง กระซิบ ข้อสอง ห้ามกาน้ำ ข้อสาม ห้ามบี",'Okafor lists the rules holding a clipboard','Will they follow them?','Okafor with a clipboard',z=1.0)
B(Kt,'theo',"Sorry. It has a startup sound. It will not turn off.","ขอโทษ มันมีเสียงเปิดเครื่อง ปิดไม่ได้",'Theo hides his console which blares a cheerful jingle','What did that jingle just do?','Theo and his console',expr={'theo':'scared'},z=1.15,mood='creep',sfx=[('bell',0),('stab',.5)])
Lb2=SC('lobby',okafor=(420,'worried'));Lb2.zput('a',860,var='robe',face='back').zput('b',960,var='postman',face='back').zput('c',1040,var='suit',face='back')
B(Lb2,'okafor',"They heard it.","พวกมันได้ยินแล้ว",'Okafor watches three zombies turn their heads slowly toward the glass door','What now?','Okafor alone with three zombies at the door',expr={'okafor':'scared'},z=.9,mood='creep',sfx=[('heartbeat',.1),('horde',.5)])
Fh=SC('hallway',okafor=(280,'calm'),bea=(440,'angry'),priya=(600,'calm'))
FIGHT(Fh,'okafor',[('robe',860)],['BONK!'],'wrench')
FIGHT(Fh,'bea',[('postman',960)],['CLANG!'],'pan')
FIGHT(Fh,'priya',[('suit',1040)],['THUNK!'],'flashlight')
B(Fh,'bea',"GOOD JOB EVERYONE!","ทำได้ดีมากทุกคน",'Bea cheers at full volume as the others glare at her','Did anyone hear that?','everyone glares at Bea',expr={'bea':'smile','okafor':'angry'},z=.9,mood='comic',sfx=[('rimshot',.7)])
B(Kt,'priya',"Real tip. Noise is the only thing they follow. Stay quiet together.","เคล็ดลับจริง เสียงคือสิ่งเดียวที่พวกมันตาม เงียบไปด้วยกัน",'Priya sums it up with a tired smile at the table','Is it that simple?','Priya at the table',z=1.0)
Lb3=SC('lobby',okafor=(520,'worried'))
B(Lb3,'okafor',"No. Not the alarm. Anything but the fire alarm.","ไม่นะ ไม่ใช่สัญญาณเตือนไฟ อะไรก็ได้ยกเว้นอย่างนั้น",'Okafor stares at the fire alarm panel which begins to blink red','What happens if it rings?','Okafor alone in front of the red panel',expr={'okafor':'scared'},z=1.2,mood='creep',sfx=[('stab',.2),('heartbeat',.6)])
P.close('the fire alarm');TH.append("ตอนที่หนึ่งจากสาม น้อยส์ คอมเพลนท์ ต่อไป: สัญญาณเตือนไฟ")
BEATS[-1]['intent']=I('Building intercom','The intercom announces what comes next','intercom card','paper intercom card','What happens next?')

META=W.meta(hook='Nobody In This Building May Speak',premise='Four neighbours who feuded over noise for years must stay silent together on the first night of the outbreak.',body='Part 1 of 3: quiet hours. Real tip: zombies follow sound, so stay quiet together.',nxt='the fire alarm',ask='Which neighbour would get you killed first? Tell me in the comments.',
 tags='noise complaint, zombie apocalypse, zombie comedy, apartment zombie, funny zombie animation, zombie survival tips, landlord, neighbours, stay quiet, animated sitcom, post time survival, zombie story, survival tips, comedy animation',tt='Nobody in this building may speak. 🧟 Quiet hours. Always.',ig='Nobody in this building may speak. 🧟 Quiet hours. Always. Real survival tip inside.',pin='Who gets you killed first? 👇 Next: the fire alarm.')
COVER=dict(beat=5,frac=.5,main='QUIET|HOURS',box='QUIET HOURS')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['building-intercom', 'four-feuding-neighbours'])
