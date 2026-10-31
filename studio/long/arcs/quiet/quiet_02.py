from worldlib import *
W=World('worlds/quiet.json');P=W.part(2,'THE VAN',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='the viewer is warned that stopped traffic means you are already late',goal='drive the company van out of the city',obstacle='14 cars, 1 exit and a horde that follows sound',twist='the dead end saves him: zombies do not follow an engine that is off',payoff='who is knocking from the back of the other van?')
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

VAN=lambda x,y=620,s=1.7,c='#e8e6dc',fl=False:dict(k='prop',t='car',x=x,y=y,s=s,c=c,flip=fl)
# ---- 0 street: night, a white company van ----
St=Scene(W,'street',x=640,y=470,z=.7);St.put('ren',360,expr='calm',sc=.7)
P.B(S([('ren',"If traffic stops, you are already late.","ถ้ารถเริ่มติด แปลว่าคุณช้าไปแล้ว")]),St.shot(extra=gear(St,'wrench')+[VAN(900)],z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands by the white Vale and Son van on the dark street, smoke behind him','city street at night, a parked van','wide shot, van at the right, Ren small at the left','Why is he already late?'))
P.open();TH.append("เดอะ ไควเอท แฮนด์ ตอนที่สองจากสิบ: รถตู้")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is in the van?')
St.p['ren']['flip']=False
P.B(S([('ren',"Two hundred twenty-six kilometres to go.","เหลืออีกสองร้อยยี่สิบหกกิโลเมตร")]),St.shot(moves={'ren':(760,'walk')},extra=gear_walk(St,'wrench',760)+[VAN(960)],z=.72,vx=700),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks to the van door','city street, van at the right','side view walk toward the van','What is the road like?'))
J=W.lane('jam',[dict(W.at('ren',0,2.0,'worried',view='back',bob=3.0,bobSp=5.0),to=(W.lane_pos(0,3.6)['x'],W.lane_pos(0,3.6)['y']),sto=1.0)],z=1.0)
P.B(S([('ren',"Fourteen cars. One exit.","สิบสี่คัน ทางออกเดียว")]),J,mood='creep',cam='push_in',sfx=[('horde',.3)],
 intent=I('Ren','Ren stands at the front of a gridlocked road: cars shrink toward the barricade far away','traffic jam, gridlocked road, one-point perspective','back view of Ren, cars on both sides shrinking toward a far barricade','How does he get through?'))
P.B(S([('ren',"Stop. Count the exits.","หยุด นับทางออก")]),card('chain',title='THE TRAP',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='14',l='14 CARS'),dict(i='1',l='1 EXIT'),dict(i='!',l='ENGINE NOISE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A diagram shows 14 cars, 1 exit, and the engine noise that calls the horde','rule card','chain card with three labelled steps','What is the answer?'))
# ---- the road: first fights ----
R1=Scene(W,'street',x=640,y=470,z=.66);R1.put('ren',420,expr='worried',sc=.72)
P.B(S([('ren',"Do not honk. Never honk.","ห้ามบีบแตร ห้ามเด็ดขาด")]),W.pov('street',[('suit',690,690,'side'),('hoodie',770,600,'side')],hands='wrench',x=640,y=440,z=1.35,extra=[VAN(1000,s=1.2)]),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, two zombies','Through Ren eyes: two zombies weave between the stopped cars, one close and one far','gridlocked street, seen from Ren eyes','first-person: wrench in his fist, a big zombie near, a small one far','Will he stay silent?'))
R1.zput('z1',640,var='suit')
sh,fx=strike(R1,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie one','Ren swings the wrench into the nearest zombie by the van, THWACK!','gridlocked street, beside the van','side swing, THWACK! sticker','Did the others hear?'))
R1.zput('z2',760,var='hoodie')
sh,fx=strike(R1,'ren','z2','BONK!',held='wrench')
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie two','A second zombie lunges from behind a car; Ren bonks it','gridlocked street','closer, swing, BONK! sticker','One more?'))
R1.zput('z3',830,var='porter')
sh,fx=strike(R1,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie three','Ren finishes the third with an overhead strike, SMASH!','gridlocked street','overhead swing, SMASH! sticker','Is the road clear?'))
R1.p['ren']['flip']=False
P.B(S([('ren',"A jam is a trap with doors.","รถติดคือกับดักที่มีประตู")]),R1.shot(extra=gear(R1,'wrench'),expr={'ren':'calm'},z=1.25,vy=410),mood='warm',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren breathes out, wrench hanging, the van behind him','gridlocked street, close-up of Ren','close-up, steady eyes','What does he hear?'))
P.B(S([('ann',"Cache opened. Cache opened. Cache opened.","ถูกเปิดแล้ว ถูกเปิดแล้ว ถูกเปิดแล้ว")]),card('macro',obj='radio',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),s=.8),mood='creep',sfx=[('radio',0),('stab',.6)],
 intent=I('Old van radio','The van radio repeats the same line again and again: cache opened','street, macro of the van radio','macro card of the radio','Who is sending it?'))
# ---- the horde hears the engine ----
St2=Scene(W,'street',x=640,y=470,z=.7);St2.put('ren',540,expr='worried',sc=.72,face='back')
P.B(S([('ren',"The engine turns over. The horde turns with it.","เครื่องติด ฝูงก็หันตาม")]),St2.shot(extra=[VAN(900)],z=1.0,vy=430,vx=640),mood='chase',cam='push_in',sfx=[('horde',.1),('stab',.5)],
 intent=I('Ren','The engine rumbles and the horde turns toward the sound','gridlocked street','mid shot, Ren back view, van behind','Can he outrun it?'))
P.B(S([('ren',"One thing a horde cannot follow. A dead engine.","สิ่งเดียวที่ฝูงตามไม่ได้ เครื่องที่ดับแล้ว")]),W.pov('street',[('suit',690,700,'side'),('dress',760,640,'side'),('hoodie',810,590,'side'),('porter',840,560,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, a horde','Through Ren eyes: the horde stands stock still, the engine silent, big near and tiny far','street, seen from Ren eyes','first-person: four zombies at four distances, all frozen','Does silence really save him?'))
P.B(S([('ren',"The dead end saves me.","ทางตันช่วยฉันไว้")]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='1',l='ENGINE OFF'),dict(i='2',l='NO NOISE'),dict(i='3',l='NO HORDE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: engine off, no noise, no horde','tip card','chain card with three steps','What is that sound?'))
St3=Scene(W,'gas',x=640,y=470,z=.7);St3.put('ren',300,expr='worried',sc=.72)
P.B(S([('ren',"Day one. Two hundred twenty-six to go.","วันแรก เหลืออีกสองร้อยยี่สิบหก")]),St3.shot(moves={'ren':(760,'walk')},extra=gear_walk(St3,'wrench',760)+[VAN(980)],z=.8,vx=720),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks along the stopped cars, wrench in hand, toward the far end','gas station at night, pumps and a lamp','side view walk, parked cars','What is knocking?'))
P.B(S([('ren',"Then a knock. From the back of the other van.","แล้วก็มีเสียงเคาะ จากท้ายรถตู้อีกคัน")]),W.pov('gas',[],hands='wrench',x=640,y=440,z=1.35,extra=[VAN(820,s=1.9,c='#3a6a8a')]),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('creak',.5)],
 intent=I('First-person view, the other van','Through Ren eyes: three slow knocks come from the back of a blue van','gas station, seen from Ren eyes','first-person: wrench in his fist, a blue van ahead','Who is knocking?'))
P.close('the kid on the roof');TH.append("ตอนที่สองจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: เด็กบนหลังคา ติดตามตอนที่สาม")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='Traffic Stops? You Are Dead',premise='An exterminator who swore never to kill again must get the company van out of a gridlocked city.',
 body='Part 2 of 10: the van. Real tip: a stopped engine makes no noise, so turn it off and the horde cannot follow it.',nxt='the kid on the roof',ask='Would YOU honk the horn or turn the engine off? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, traffic jam, car survival, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If traffic stops, you are already late. 🧟 14 cars, 1 exit.',ig='If traffic stops, you are already late. 🧟 14 cars, 1 exit. Real survival tip inside.',pin='Honk or engine off? 👇 Next: the kid on the roof.')
COVER=dict(beat=5,frac=.5,main='14 CARS|1 EXIT',box='THE VAN')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['van-radio-loop','engine-off-tip'])
