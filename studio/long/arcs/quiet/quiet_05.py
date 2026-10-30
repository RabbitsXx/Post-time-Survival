from worldlib import *
W=World('worlds/quiet.json');P=W.part(5,'92 PERCENT',of=10);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]
P.arc=dict(hook='a fever is not a bite, check one thing first', goal='find fever medicine for Noor in the dark hospital', obstacle='infected doctors and a locked fridge', twist='it was only a fever but Ren almost left her', payoff='how does Gus know Marlow?')
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

S1=Scene(W,'street',x=640,y=470,z=.7);S1.put('ren',300,expr='calm',sc=.72)
P.B(S([('ren','If you have a fever, check one thing first.','ถ้ามีไข้ ให้เช็กสิ่งเดียวก่อน')]),S1.shot(extra=gear(S1,'wrench'),z=.62),mood='creep',cam='drift',fx=[P.announce()],sfx=[('bell',0),('stab',.5)],
 intent=I('Ren','Ren stands in a dark street outside a small hospital, Noor asleep in the van behind him','city street','extra wide shot, Ren tiny with a wrench','Why is the fever dangerous?'))
P.open();TH.append('เดอะ ไควเอท แฮนด์ ตอนที่ห้าจากสิบ: เก้าสิบสองเปอร์เซ็นต์')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces the series, part and topic','dispatch radio card','amber terminal card','What is this episode about?')
P.B(S([('ren','Hour twenty. Noor burns with a fever.','ชั่วโมงที่ยี่สิบ นูร์ไข้ขึ้นสูง')]),card('chain',title='HOUR TWENTY',bg=dict(loc='w_quiet',v='street',z=1.8,x=640,y=430),nodes=[dict(i='148',l='148 KM LEFT'),dict(i='20',l='HOUR TWENTY'),dict(i='F',l='NOOR HAS A FEVER')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A counter shows 148 km left, hour twenty, Noor with a fever','rule card','chain card with three labelled steps','Is it a bite?'))
S2=Scene(W,'ward',x=640,y=470,z=.7);S2.put('ren',300,expr='calm',sc=.72)
S2.p['ren']['flip']=False;S2.p['ren']['x']=300
P.B(S([('ren','Pharmacy. Third door on the left.','ร้านยา ประตูที่สามทางซ้าย')]),S2.shot(moves={'ren':(640,'walk')},extra=gear_walk(S2,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks alone down the dark ward corridor','hospital ward, a walk','side view walk, wrench hanging in his hand','Is anyone still here?'))
S2.p['ren']['flip']=False
P.B(S([('ren','Listen first. Look second.','ฟังก่อน มองทีหลัง')]),S2.shot(extra=gear(S2,'wrench'),expr={'ren':'worried'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren stops and listens, head tilted','hospital ward, close-up of Ren','close-up, steady eyes','What is moving down the hall?'))
P.B(S([('ren','Doctors. Three. Slow.','หมอสามคน เดินช้า')]),W.pov('ward',[('suit',690,700,'side'),('porter',770,630,'side'),('dress',830,575,'side')],hands='wrench',x=640,y=440,z=1.35),mood='creep',cam='push_in',sfx=[('heartbeat',.1)],
 intent=I('First-person view, zombies','Through Ren eyes: three infected doctors shuffle toward us, one big, two small and far','hospital ward, seen from Ren eyes','first-person: wrench in his fist, zombies at several distances, near big and far small','Can he take three doctors?'))
S2.zput('z1',700,var='suit')
sh,fx=strike(S2,'ren','z1','THWACK!',held='wrench')
P.B(S([('ren','One.','หนึ่ง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 1','Ren swings and a zombie goes down, THWACK!','hospital ward, in the middle of the fight','side swing with an impact sticker, the zombie falls','Did the others hear?'))
S2.zput('z2',800,var='porter')
sh,fx=strike(S2,'ren','z2','BONK!',held='wrench')
P.B(S([('ren','Two.','สอง')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 2','Ren swings and a zombie goes down, BONK!','hospital ward, in the middle of the fight','side swing with an impact sticker, the zombie falls','One more?'))
S2.zput('z3',860,var='dress')
sh,fx=strike(S2,'ren','z3','SMASH!',held='wrench')
P.B(S([('ren','Three.','สาม')]),sh,fx=fx,mood='chase',cam='push_in',sfx=[],pause=.2,dur=2.0,
 intent=I('Ren, zombie 3','Ren swings and a zombie goes down, SMASH!','hospital ward, in the middle of the fight','side swing with an impact sticker, the zombie falls','Is it quiet again?'))
S2.p['ren']['flip']=False
S3=Scene(W,'stair',x=640,y=470,z=.7);S3.put('ren',300,expr='calm',sc=.72)
S3.p['ren']['flip']=False;S3.p['ren']['x']=300
P.B(S([('ren','Fridge door. Something is knocking.','ประตูตู้เย็น มีอะไรเคาะอยู่')]),S3.shot(moves={'ren':(640,'walk')},extra=gear_walk(S3,'wrench',640),z=.78,vx=530),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks to the steel fridge at the stair landing, a knock inside','back stairs, a walk','side view walk, wrench hanging in his hand','What is knocking?'))
S3.put('gus',900,expr='worried',sc=.7,face='front')
P.B(S([('gus','Ninety-two percent chance you will open this door.','เก้าสิบสองเปอร์เซ็นต์ที่คุณจะเปิดประตูนี้')]),S3.shot(expr={'gus':'worried'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Gus','Gus peers out from the fridge doorway, pale and exact','back stairs, a conversation','mid shot, the speaker talking','Who is this man?'))
P.B(S([('gus','I calculated every route out of here. Yours is ninety-two percent death.','ผมคำนวณทางหนีทุกทาง ทางของคุณมีโอกาสตายเก้าสิบสองเปอร์เซ็นต์')]),S3.shot(expr={'gus':'smug'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Gus','Gus counts the odds on his fingers','back stairs, a conversation','mid shot, the speaker talking','Will Gus come along?'))
P.B(S([('ren','Fever is not a bite. Check the skin first.','ไข้ไม่ใช่รอยกัด เช็กผิวหนังก่อน')]),card('chain',title='THE TIP',bg=dict(loc='w_quiet',v='ward',z=1.8,x=640,y=430),nodes=[dict(i='1',l='WASH THE WOUND'),dict(i='2',l='CHECK THE SKIN'),dict(i='3',l='THEN DECIDE')]),mood='warm',sfx=[('click',.2)],
 intent=I('Ren','A tip card: wash the wound, check the skin, then decide','rule card','chain card with three labelled steps','What did he find on Noor?'))
S4=Scene(W,'street',x=640,y=470,z=.7);S4.put('ren',360,expr='worried',sc=.72)
S4.p['ren']['flip']=False
P.B(S([('ren','I almost left her.','ฉันเกือบทิ้งเธอไว้')]),S4.shot(extra=gear(S4,'wrench'),expr={'ren':'sad'},z=1.25,vy=410),mood='creep',cam='drift',sfx=[('sigh',.2)],
 intent=I('Ren','Ren looks at the van where Noor sleeps, guilty','city street, close-up of Ren','close-up, steady eyes','Was it a bite?'))
S4.put('noor',300,expr='angry',sc=.7,face='front')
P.B(S([('noor','It was only a fever. You almost ran. I saw.','แค่ไข้เอง ลุงเกือบหนีแล้ว หนูเห็น')]),S4.shot(expr={'noor':'angry'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Noor','Noor sits up in the van window, tired, pointing at him','city street, a conversation','mid shot, the speaker talking','Will she forgive him?'))
S4.put('gus',900,expr='scared',sc=.7,face='front')
P.B(S([('gus','Marlow will know you reached the hospital. He always knows.','มาร์โลว์จะรู้ว่าคุณมาถึงโรงพยาบาลแล้ว เขารู้เสมอ')]),S4.shot(expr={'gus':'scared'},z=1.15,vy=450,vx=360),mood='creep',cam='push_in',sfx=[],
 intent=I('Gus','Gus stares at the dark road behind them, calm and afraid','city street, a conversation','mid shot, the speaker talking','Who is Marlow to Gus?'))
S4.p['ren']['flip']=False;S4.p['ren']['x']=500
P.B(S([('ren','One hundred forty-eight to go.','เหลืออีกหนึ่งร้อยสี่สิบแปด')]),S4.shot(moves={'ren':(900,'walk')},extra=gear_walk(S4,'wrench',900),z=.78,vx=760),mood='warm',cam='drift',sfx=[],
 intent=I('Ren','Ren walks on with the wrench, Noor and Gus behind him','city street, a walk','side view walk, wrench hanging in his hand','What does Gus know?'))
P.close('gus list');TH.append('ตอนที่ห้าจากสิบ เดอะ ไควเอท แฮนด์ ต่อไป: รายชื่อของกัส ติดตามตอนที่หก')
BEATS[-1]['intent']=I('Dispatch radio','The dispatch radio announces what comes next','dispatch radio card','amber terminal card','What happens next?')
META=W.meta(hook='A Fever Is NOT A Bite: Check This First',premise='An exterminator who swore never to kill again searches a dark hospital for fever medicine and finds a man locked in a fridge.',
 body='Part 5 of 10: 92 percent. Real tip: a fever is not a bite, wash the wound with clean water and check the skin before you decide.',nxt='gus list',ask='Would YOU have left her behind? Tell me in the comments.',
 tags='the quiet hand, zombie apocalypse, zombie animation, retired assassin, zombie story, zombie survival tips, animated zombie series, zombie shorts, post time survival, hospital survival, survival tips, action animation, zombie fight, stickman, apocalypse',
 tt='If you have a fever, check one thing first. 🧟 92 percent.',ig='If you have a fever, check one thing first. 🧟 92 percent. Real survival tip inside.',pin='Would you leave her? 👇 Next: Gus list.')
COVER=dict(beat=8,frac=.5,main='92 PERCENT|ONE CHECK',box='92 PERCENT')
VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports(part_new=['hospital-fridge-gus', 'fever-vs-bite-tip'])
