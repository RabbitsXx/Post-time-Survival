from buslib import *
P=Part(6,'THE BRIEFCASE','1:15 AM','SUNNY SIDE DINER');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
def aisle(ex=None,park=None,priya=None,x=640,z=1.1,out='road',**L):
    skip=tuple(w for w,v in (('park',park),('priya',priya)) if v)
    acts=crew(ex=ex,talk=True,skip=skip)
    if park:acts.append(pax('park',park.pop('expr','worried'),talk=True,stand=True,x=park.pop('x',700),**park))
    if priya:acts.append(pax('priya',priya.pop('expr','calm'),talk=True,stand=True,x=priya.pop('x',560),**priya))
    return bus(x,acts,z=z,y=cy(z,300),out=out,**L)
FALL=dict(at=.05,dur=.5,rot=86,dy=70,dx=40)
def slump(extra=None):
    return dict(park=dict(expr='wince',sweat=1,pale=.8,tremble=1.5,tilt=16))
P.B([('dante',"He's turning! Get him off the bus!")],bus(560,crew(ex=ALLW('shock'),talk=True,skip=('dante',),park=dict(expr='wince',sweat=1,pale=.8,tremble=1.5,tilt=16))+[pax('dante','angry',talk=True,stand=True,x=520,pose='finger',y=790)],z=1.05,y=cy(1.05,300)),mood='chase',cam='push_in',fx=[P.announce()],sfx=[('stab',0),('thud',.3)])
P.B([('bus',"Ding dong! This is the Last Bus. Part six of ten: the briefcase.")],card('pa',mode='open',part=6,of=10,title='THE BRIEFCASE',time='1:15 AM'),mood='idle',sfx=[('chime',0)])
P.B([('priya',"Wait. Sweating. Shaking. Confused."),('marcus',"That's the symptom list!")],bus(700,crew(ex={'marcus':'scared','dante':'angry'},talk=True,skip=('priya',),park=dict(expr='wince',sweat=1,pale=.8,tremble=1.2,tilt=14))+[pax('priya','worried',talk=True,stand=True,x=560,y=790)],z=1.35,y=cy(1.35,300)),mood='creep')
P.B([('priya',"Look-alikes.")],card('lookalike'),mood='idle',dur=3.6,sfx=[('ping',.5),('ping',.72),('ping',1.05),('ping',1.27),('ping',1.6),('ping',1.82)])
P.B([('priya',"Insulin. He's diabetic. His blood sugar crashed."),('park',"I told you... it's private.")],cu('priya','worried',z=1.6,extra=[prop('briefcase',930,560,1.6),prop('pen',990,560,1.4,rot=18)]),mood='creep',sfx=[('click',.2)])
P.B([('priya',"He needs fifteen grams of sugar. Fast."),('teddy',"I have a gummy bear!"),('priya',"That's two grams.")],two('priya','teddy',ex={'priya':'worried','teddy':'smile'},z=1.5),mood='comic',sfx=[('rimshot','e-0.2')])
P.B([('rosa',"Diner. Forty meters. Vending machine. Two minutes.")],ext('diner',[hz(4,120,380,y=650,s=.9)],bx=520,bto=640,bs=.8,x=700,y=470,ease=True),mood='creep',sfx=[('brake',.3)])
P.B([('dante',"I'm in!"),('vic',"Chat, we're going in!"),('marcus',"Why am I always in?")],wide(740,1.35,ex={'dante':'smug','vic':'grin','marcus':'scared'},out='diner'),mood='comic',sfx=[('boing','e-0.4')])
P.B([('vic',"Chat, don't blink!")],ext('diner',[dict(k='marcus',view='side',pose='run',anim='run',x=420,y=655,s=.85,to=[860,655],spd=4.6),dict(k='dante',view='side',pose='run',anim='run',x=330,y=655,s=.8,to=[780,655],spd=4.4),dict(k='vic',view='side',pose='run',anim='run',x=260,y=655,s=.8,to=[700,655],spd=4.2,talk='vic'),hz(5,80,300,y=655,s=.9,to=250)],bx=130,bto=130,bs=.8,x=640,y=470),mood='chase',sfx=[('footsteps',0),('doorhiss','e-1.0')])
P.B([('steve',"Table for one."),('marcus',"Is that Steve?"),('dante',"Steve gets everywhere.")],
    loc('dinerin',[steve(560,y=575,view='front',pose='zombie',s=.95,talk='steve',held=dict(t='newspaper',ox=0,oy=-230,rot=0,s=1.3)),hz(3,150,340,y=575,s=.85),
      dict(k='marcus',view='side',pose='walk',anim='walk',x=640,y=665,s=.88,to=[820,665],spd=2.6,talk='marcus',tremble=.5),dict(k='dante',view='side',pose='walk',anim='walk',x=540,y=665,s=.82,to=[720,665],spd=2.6,talk='dante')],x=640,y=500),
    mood='comic',sfx=[('groan',0),('sneak',.8),('rimshot','e-0.3')])
P.B([('dante',"It takes cards only."),('marcus',"Then it takes fists.")],
    loc('dinerin',[dict(k='dante',view='side',pose='stand',x=980,y=665,s=.82,talk='dante'),dict(k='marcus',view='side',pose='punch',x=900,y=665,s=.9,talk='marcus')],x=1000,y=520,z=1.3),mood='comic',
    fx=[dict(k='flash',at='e-0.35',dur=.25,a=.8),shake('e-0.35',9,.4)],sfx=[('glass','e-0.35')])
P.B([('dante',"The can is stuck!"),('marcus',"Hold the machine.")],
    loc('dinerin',[dict(k='dante',view='side',pose='reach',x=990,y=665,s=.82,talk='dante',tremble=.6),dict(k='marcus',view='side',pose='reach',x=910,y=665,s=.9,talk='marcus',tremble=1.2),hz(3,150,340,y=575,s=.85,to=220)],x=1000,y=520,z=1.3),mood='chase',
    fx=[shake('s1+0.3',8,.6)],sfx=[('creak',0),('clunk','s1+0.7'),('groan',.5)])
P.B([('rosa',"Go go go!")],ext('diner',[dict(k='marcus',view='side',pose='run',anim='run',x=860,y=655,s=.85,to=[260,655],spd=4.6,flip=True),dict(k='dante',view='side',pose='run',anim='run',x=900,y=655,s=.8,to=[300,655],spd=4.4,flip=True,held=dict(t='soda',ox=60,oy=-190,rot=0,s=1.4)),hz(6,780,1040,y=655,s=.9,to=-520,flip=True)],bx=130,bto=130,bs=.8,x=640,y=470),mood='chase',sfx=[('horde',0),('doorhiss','e-0.8')],cam='hand')
P.B([('dante',"That was easy!"),('marcus',"That was not easy.")],wide(740,1.3,ex={'dante':'smug','marcus':'shock'},out='diner',dante=dict(sweat=1),marcus=dict(sweat=1)),mood='comic',sfx=[('rimshot','e-0.2')])
P.B([('park',"Orange juice?"),('priya',"Cola."),('park',"...Acceptable.")],cu('park','smile',z=1.7,extra=[prop('soda',410,520,1.6)]),mood='comic',sfx=[('pour',.3),('sigh','e-0.5')])
P.B([('park',"I have type one diabetes. I should have said. People get weird."),('priya',"In an apocalypse, say it.")],two('park','vic',ex={'park':'sad','vic':'calm'},z=1.2) if False else cu('park','sad',z=1.7),mood='warm')
P.B([('teddy',"Rosa's sweating too.")],cu('teddy','worried',z=1.8),mood='creep',sfx=[('heartbeat',.2)])
P.B([('priya',"Rosa?"),('rosa',"It's the engine. Sit down.")],cab('angry',z=1.45,sweat=1.0,red=.35,out='road'),mood='creep',sfx=[('stab','s1')])
P.B([('bus',"Part six of ten, The Last Bus. Next: the drawbridge. Follow for part seven. Panic is loud.")],card('pa',mode='close',part=6,of=10,next='THE DRAWBRIDGE',time='2:30 AM'),mood='idle',sfx=[('chime',0)])
