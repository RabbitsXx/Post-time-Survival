from worldlib import *
W=World('worlds/quiet.json');P=W.part(4,'THE TUNNEL',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='in the dark do not use your eyes',goal='cross 1.1 km of black rail tunnel alone while Noor waits at the far end',obstacle='zombies in the dark and a flashlight that gives him away',twist='the zombies in the tunnel are asleep',payoff='who woke them?')
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

G=Scene(W,'gas',x=640,y=470,z=.7);G.put('ren',300,expr='calm',sc=.7)
P.B(S([('ren',"If it is dark, do not use your eyes.","ถ้ามืด อย่าใช้ตา")]),G.shot(extra=gear(G,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands alone at the gas station while the black mouth of a tunnel waits far down the track','gas station at night, a rail line leading away','extra wide shot, Ren small, the tunnel far away','Why not use his eyes?'))
P.open();TH.append("เดอะ ไควเอท แฮนด์ ตอนที่สี่จากสิบ: อุโมงค์")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is in the tunnel?')
P.B(S([('ren',"Noor waits on the far side. One point one kilometres.","นูร์รออยู่อีกฝั่ง หนึ่งจุดหนึ่งกิโลเมตร")]),card('chain',title='THE TUNNEL',bg=dict(loc='w_quiet',v='gas',z=1.8,x=640,y=430),nodes=[dict(i='1.1',l='1.1 KM'),dict(i='0',l='NO LIGHT'),dict(i='N',l='NOOR WAITS')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A card shows 1.1 km, no light, and Noor waiting at the far side','stat card','chain card with three labelled steps','Can he cross it alone?'))
T=W.lane('tunnel',[dict(W.at('ren',0,2.0,'worried',view='back',bob=3.0,bobSp=5.0),to=(W.lane_pos(0,3.8)['x'],W.lane_pos(0,3.8)['y']),sto=1.0)],z=1.0)
P.B(S([('ren',"Into the black. Hand on the wall.","เข้าไปในความมืด มือแตะผนัง")]),T,mood='creep',cam='push_in',sfx=[('horde',.3),('creak',.6)],
 intent=I('Ren','Ren walks into the rail tunnel, the arch shrinking to a black dot ahead','rail tunnel, tunnel lane, one-point perspective','back view of Ren, rails and arch shrinking to black','What is in the dark?'))
St=Scene(W,'street',x=640,y=470,z=.7);St.put('ren',360,expr='worried',sc=.72)
P.B(S([('ren',"Never shine a torch straight ahead.","อย่าส่องไฟตรงไปข้างหน้า")]),St.shot(moves={'ren':(540,'walk')},extra=gear_walk(St,'wrench',540),z=.75,vx=620),mood='creep',cam='drift',sfx=[('creak',.3)],
 intent=I('Ren','Ren edges along the wall at the tunnel mouth, torch held low and off','city street at the tunnel mouth, dark arch behind him','side view walk, torch pointed at the floor','Who is listening?'))
P.B(S([('ren',"Three shapes. Between the rails.","สามเงา ระหว่างราง")]),W.pov('street',[('suit',690,700,'side'),('dress',780,630,'side'),('hoodie',835,575,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, three shapes','Through Ren eyes: three zombies stand in the dark, the near one big, the far ones small','city street at the tunnel mouth, seen from Ren eyes','first-person: wrench in his fist, three shapes at three distances','Are they awake?'))
St.zput('z1',700,var='suit')
sh,fx=strike(St,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren',"One.","หนึ่ง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie one','Ren swings the wrench at the nearest shape, THWACK!','city street at the tunnel mouth','side swing, THWACK! sticker','Did it wake the others?'))
St.zput('z2',810,var='hoodie')
sh,fx=strike(St,'ren','z2','BONK!',held='wrench')
P.B(S([('ren',"Two.","สอง")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie two','A second shape lunges from the dark; Ren bonks it','city street at the tunnel mouth','closer, swing, BONK! sticker','One more?'))
St.zput('z3',870,var='porter')
sh,fx=strike(St,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren',"Three.","สาม")]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie three','Ren finishes the third with an overhead strike, SMASH!','city street at the tunnel mouth','overhead swing, SMASH! sticker','Is the tunnel clear?'))
St.p['ren']['flip']=False
P.B(S([('ren',"They did not even flinch. Asleep.","พวกมันไม่ขยับเลย หลับอยู่")]),St.shot(extra=gear(St,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren stares at the fallen zombies, none of them stirred','city street, close-up of Ren','close-up, puzzled eyes','Why were they asleep?'))
P.B(S([('ren',"Torch low. Beam on the rail. Eyes shut.","ไฟต่ำ ส่องที่ราง หลับตาครึ่ง")]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='1',l='TORCH LOW'),dict(i='2',l='BEAM ON THE RAIL'),dict(i='3',l='LISTEN FIRST')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: torch low, beam on the rail, listen first','tip card','chain card with three steps','What did he hear?'))
St.p['ren']['flip']=False;St.p['ren']['x']=540
P.B(S([('ren',"Hour twelve. One hundred seventy-one to go.","ชั่วโมงที่สิบสอง เหลืออีกหนึ่งร้อยเจ็ดสิบเอ็ด")]),St.shot(moves={'ren':(1000,'walk')},extra=gear_walk(St,'wrench',1000),z=.8,vx=760),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks on past the fallen shapes into the dark, wrench in hand','city street at the tunnel mouth','side view walk past the bodies','What lies at the far end?'))
F=Scene(W,'field',x=640,y=470,z=.7);F.put('ren',280,expr='worried',sc=.72)
P.B(S([('ren',"Light at the far end. One point one kilometres done.","แสงที่ปลายอุโมงค์ ครบหนึ่งจุดหนึ่งกิโลเมตร")]),F.shot(moves={'ren':(560,'walk')},extra=gear_walk(F,'wrench',560),z=.8,vx=680),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks out of the tunnel into the open field, the rails glinting behind him','open field at dawn, tunnel behind him','side view walk, grass and rails','Where is Noor?'))
P.B(S([('ren',"Zombies do not sleep. Someone woke them.","ซอมบี้ไม่หลับ ต้องมีคนปลุกพวกมัน")]),W.pov('field',[],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1),('stab',.5)],
 intent=I('First-person view, the field','Through Ren eyes: the empty field, a distant sound from the tunnel behind him','open field, seen from Ren eyes','first-person: wrench in his fist, empty field ahead','Who woke them?'))
P.close('92 percent');TH.append("ตอนที่สี่จากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: เก้าสิบสองเปอร์เซ็นต์ ติดตามตอนที่ห้า")
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='1.1 KM Of Pitch Black: Never Use Your Eyes',premise='An exterminator who swore never to kill again crosses a black rail tunnel alone while a kid waits at the far end.',
 body='Part 4 of 10: the tunnel. Real tip: in the dark keep the torch low on the floor or wall, never straight ahead.',nxt='92 percent',ask='Would YOU walk into the tunnel? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, dark tunnel, flashlight tips, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If it is dark, do not use your eyes. 🧟 1.1 km tunnel.',ig='If it is dark, do not use your eyes. 🧟 1.1 km tunnel. Real survival tip inside.',pin='Would you go in? 👇 Next: 92 percent.')
COVER=dict(beat=4,frac=.5,main='1.1 KM|NO LIGHT',box='THE TUNNEL')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['dark-tunnel','torch-low-tip'])
