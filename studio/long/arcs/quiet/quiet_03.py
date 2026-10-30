from worldlib import *
W=World('worlds/quiet.json');P=W.part(3,'THE KID ON THE ROOF',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='a phone ring is a dinner bell for zombies',goal='find fuel at the dead gas station',obstacle='three zombies under the canopy and a kid who trusts nobody',twist='the kid on the roof lets the zombies trap themselves',payoff='how does a kid know the name The Quiet?')
def S(lines):
    for w,en,t in lines:TH.append(t)
    return [(w,en) for w,en,t in lines]
def gear(sc,item,dx=34,dy=-96,s=.72):
    p=sc.p['ren'];sg=-1 if p['flip'] else 1;sc_=p['sc']
    if item=='wrench':return [dict(k='prop',t=item,x=p['x']+sg*(24 if p['face']=='side' else 30)*sc_,y=p['y']-132*sc_,s=sc_*.55,rot=sg*172,flip=False)]
    return [dict(k='prop',t=item,x=p['x']+sg*52*sc_/.72,y=p['y']-24,s=.72,flip=p['flip'])]
def gear_walk(sc,item,x1):
    p=sc.p['ren'];sg=1 if x1>p['x'] else -1;c=p['sc']
    return [dict(k='prop',t=item,x=p['x']+sg*24*c,y=p['y']-132*c,s=c*.55,rot=sg*172,flip=False,to=(x1+sg*24*c,p['y']-132*c))]
def cu(expr,v,**k):return W.cuf('ren',expr,v=v,**k)

# ---- 0 street: the walk to the gas station ----
St=Scene(W,'street',x=640,y=470,z=.7);St.put('ren',320,expr='calm',sc=.7)
P.B(S([('ren',"If your phone rings now, you just rang a dinner bell.","ถ้าโทรศัพท์ดังตอนนี้ คุณเพิ่งตีระฆังเรียกอาหารเย็น")]),St.shot(extra=gear(St,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren walks alone down the dark empty road, a gas station glowing far ahead','city street at night, a road toward a gas station','extra wide shot, Ren tiny at the left','Why must the phone stay silent?'))
P.open();TH.append("เดอะ ไควเอท แฮนด์ ตอนที่สามจากสิบ: เด็กบนหลังคา")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','Who is on the roof?')
P.B(S([('ren',"Six hours in. The van is out of gas.","ผ่านไปหกชั่วโมง รถตู้น้ำมันหมด")]),card('chain',title='HOUR SIX',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='198',l='198 KM LEFT'),dict(i='6',l='HOUR SIX'),dict(i='0',l='FUEL EMPTY')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 198 km left, hour six, fuel empty','stat card','chain card with three labelled steps','Where does he find fuel?'))
G=Scene(W,'gas',x=640,y=470,z=.7);G.put('ren',300,expr='worried',sc=.72)
P.B(S([('ren',"A dead gas station. Pumps first.","ปั๊มร้าง ไปที่ตู้จ่ายก่อน")]),G.shot(moves={'ren':(520,'walk')},extra=gear_walk(G,'wrench',520),z=.75,vx=620),mood='creep',cam='drift',sfx=[('creak',.3)],
 intent=I('Ren','Ren steps under the dark gas station canopy, the lamp flickering','gas station at night, pumps and a lamp','side view walk toward the pumps','Is anyone here?'))
G.p['ren']['flip']=False
P.B(S([('ren',"Quiet. Even the lamp hums.","เงียบ แม้แต่โคมไฟยังหึ่ง")]),G.shot(face={'ren':'backhead'},expr={'ren':'worried'},z=1.3,vy=420),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('horde',.6)],
 intent=I('Ren','Ren stops and listens, head turned toward a sound under the canopy','gas station, close-up of Ren','close-up, listening, lamp glow','What is out there?'))
P.B(S([('ren',"Three. Under the canopy.","สามตัว ใต้หลังคาปั๊ม")]),W.pov('gas',[('suit',690,700,'side'),('dress',780,620,'side'),('hoodie',835,570,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('creak',.1)],
 intent=I('First-person view, three zombies','Through Ren eyes: three zombies shuffle under the canopy, the near one big, the far ones small','gas station canopy, seen from Ren eyes','first-person: wrench in his fist, three zombies at three distances','Can he take three?'))
G.zput('z1',700,var='suit')
sh,fx=strike(G,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie one','Ren swings the wrench at the nearest zombie by the pump, THWACK!','gas station, in front of the pumps','side swing, THWACK! sticker','Did the others hear?'))
G.zput('z2',820,var='hoodie')
sh,fx=strike(G,'ren','z2','BONK!',held='wrench')
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie two','A second zombie lunges from the shadow; Ren bonks it','gas station, under the canopy','closer, swing, BONK! sticker','One more?'))
G.zput('z3',880,var='porter')
sh,fx=strike(G,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie three','Ren finishes the third with an overhead strike, SMASH!','gas station, by the pump','overhead swing, SMASH! sticker','Is it quiet again?'))
G.p['ren']['flip']=False
P.B(S([('ren',"Pump seven. Empty.","ตู้เจ็ด ว่างเปล่า")]),G.shot(extra=gear(G,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren checks pump seven, the gauge reads zero','gas station, close-up of Ren at the pump','close-up, steady eyes','Then what is that sound?'))
P.B(S([('ren',"My phone is buzzing. Do not answer.","โทรศัพท์สั่น ห้ามรับ")]),card('macro',obj='phone',label='UNKNOWN',sub='RINGING',bg=dict(loc='w_quiet',v='gas',z=1.8,x=620,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Ren','His phone lights up with an unknown caller','gas station, macro of the phone screen','macro card of a ringing phone','Who is calling?'))
P.B(S([('ren',"Silent. Airplane mode. Now.","ปิดเสียง โหมดเครื่องบิน ตอนนี้")]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='gas',z=1.8,x=640,y=430),nodes=[dict(i='1',l='PHONE SILENT'),dict(i='2',l='NO RING'),dict(i='3',l='NO HORDE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: phone silent, no ring, no horde','tip card','chain card with three steps','Who else is here?'))
G2=Scene(W,'gas',x=640,y=470,z=.7);G2.put('ren',420,expr='worried',sc=.72,face='back');G2.put('noor',300,350,expr='angry',sc=.5,face='front')
P.B(S([('noor',"Hey. Mister. Up here.","เฮ้ ลุง ข้างบนนี่")]),G2.shot(z=1.1,vy=450,vx=360),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('Noor','Noor waves down from the roof of the store, scared and angry','gas station, the store roof','mid shot, Ren at the bottom, Noor on the roof above','Who is she?'))
P.B(S([('noor',"Five hours up here. Three of them down there.","ห้าชั่วโมงบนนี้ สามตัวข้างล่างนั่น")]),G2.shot(expr={'noor':'sad'},z=1.1,vy=450,vx=360),mood='sad',cam='push_in',sfx=[],
 intent=I('Noor','Noor says she has been stuck on the roof for five hours','gas station, the store roof','mid shot, Noor on the roof','Will she help him?'))
P.B(S([('noor',"I know a shortcut. You killed my guards. Deal?","ฉันรู้ทางลัด คุณฆ่ายามให้ฉัน ตกลงไหม")]),G2.shot(expr={'noor':'smile'},z=1.1,vy=450,vx=360),mood='warm',cam='push_in',sfx=[('click',.2)],
 intent=I('Noor','Noor offers a shortcut in exchange for a way down','gas station, the store roof','mid shot, Noor smiling on the roof','Can he trust her?'))
P.B(S([('ren',"Three moves. A deal.","สามท่า ตกลง")]),W.lane('tunnel',[dict(W.at('ren',0,2.0,'worried',view='back',bob=3.0,bobSp=5.0),to=(W.lane_pos(0,3.6)['x'],W.lane_pos(0,3.6)['y']),sto=1.0)],z=1.0),mood='creep',cam='push_in',sfx=[('horde',.3)],
 intent=I('Ren','Ren walks toward the black mouth of the rail tunnel Noor pointed to','tunnel, rail tunnel one-point perspective','back view of Ren, rails shrinking into a black tunnel','What is in the dark?'))
P.B(S([('noor',"Wait. How do you know the name The Quiet?","เดี๋ยว ทำไมลุงถึงรู้จักชื่อ เดอะ ไควเอท")]),G2.shot(expr={'noor':'worried'},z=1.1,vy=450,vx=360),mood='creep',cam='push_in',sfx=[('stab',.3),('heartbeat',.5)],
 intent=I('Noor','Noor asks him why the old name The Quiet is on her lips','gas station, the store roof','mid shot, Noor staring down','How does she know?'))
P.close('the tunnel');TH.append("ตอนที่สามจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: อุโมงค์ ติดตามตอนที่สี่")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Kid Stuck On A Roof 5 Hours: 3 Zombies Below',premise='An exterminator who swore never to kill again meets a kid on a roof who trades a shortcut for a way down.',
 body='Part 3 of 10: the kid on the roof. Real tip: silence your phone, a ring is a dinner bell for zombies.',nxt='the tunnel',ask='Would YOU trust the kid on the roof? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, gas station, silence your phone, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If your phone rings now, you just rang a dinner bell. 🧟 5 hours, 3 zombies.',ig='If your phone rings now, you just rang a dinner bell. 🧟 5 hours, 3 zombies. Real survival tip inside.',pin='Would you trust her? 👇 Next: the tunnel.')
COVER=dict(beat=7,frac=.5,main='5 HOURS|3 ZOMBIES',box='THE KID ON THE ROOF')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['noor-roof','phone-silent-tip'])
