from buslib import *
P=Part(4,'THE CHICKEN','10:41 PM','ROUTE 9');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
def aisle(ex=None,benny=None,priya=None,x=640,z=1.1,out='road',talk=True,**L):
    acts=crew(ex=ex,talk=talk,skip=('benny','priya') if (benny or priya) else ())
    if benny:acts.append(pax('benny',benny.pop('expr','scared'),talk=True,stand=True,x=benny.pop('x',720),**benny))
    if priya:acts.append(pax('priya',priya.pop('expr','calm'),talk=True,stand=True,x=priya.pop('x',560),**priya))
    return bus(x,acts,z=z,y=cy(z,300),out=out,**L)
# 0 hook: the chicken runs for his life
P.B([('benny',"Let me in! They're right behind me!")],
    ext('road',[dict(k='benny',view='side',pose='run',anim='run',x=760,y=660,s=.95,talk='benny',spd=4.8),hz(7,60,360,y=650,s=.95,to=120),steve(30,y=660,view='side',pose='zwalk',anim='zwalk',s=.9,to=[120,660],spd=2.0)],bx=1000,bto=1000,bs=.8,x=640,y=470,roadSp=1100,scroll=500),
    cam='hand',mood='chase',fx=[P.announce()],sfx=[('horde',0),('cluck',.3),('cluck',1.3)])
P.B([('bus',"Ding dong! This is the Last Bus. Part four of ten: the chicken.")],card('pa',mode='open',part=4,of=10,title='THE CHICKEN',time='10:41 PM'),mood='idle',sfx=[('chime',0)])
P.B([('rosa',"Rule one. Nobody gets on.")],cab('worried',z=1.35,sweat=.7,zom=3,out='road'),mood='creep',sfx=[('brake',.3)])
P.B([('teddy',"He's not nobody! He's Benny!")],cu('teddy','cry',z=1.8),mood='sad')
P.B([('rosa',"Fine. Chicken exception.")],cab('angry',z=1.35,sweat=.7,out='road'),mood='comic',sfx=[('doorhiss',.9),('thud',1.5),('cluck',1.6)])
# the aisle: the stain
P.B([('marcus',"He's bleeding!"),('dante',"Bitten! Chicken guy! I called it!")],aisle(ex=ALLW('shock')|{'dante':'angry'},benny=dict(expr='scared',stain=True),z=1.0),mood='chase',cam='push_in',sfx=[('stab',0),('boing','s1+0.5')])
P.B([('benny',"No, no! It's not what it looks like!")],aisle(ex=ALLW('shock'),benny=dict(expr='scared',stain=True),z=1.3,x=700),mood='chase')
P.B([('priya',"Nobody move. Let me see."),('priya',"Hmm. Sweet. Tomato. A little vinegar.")],aisle(ex={'dante':'angry','marcus':'scared'},benny=dict(expr='scared',stain=True,x=720),priya=dict(expr='calm',x=560),z=1.5,x=640),mood='comic',sfx=[('sneak',.3)])
P.B([('dante',"It's blood!"),('priya',"It's ketchup.")],aisle(ex={'dante':'angry','marcus':'scared'},benny=dict(expr='worried',stain=True,x=720),priya=dict(expr='deadpan',x=560),z=1.45,x=700),mood='comic',sfx=[('rimshot','e-0.2')])
P.B([('benny',"Three packets. They burst when I ran."),('marcus',"Why do you carry ketchup in a chicken suit?"),('benny',"It's a work thing.")],aisle(ex={'marcus':'smug'},benny=dict(expr='worried',stain=True,x=720),z=1.3,x=680),mood='comic',sfx=[('splat',.1)])
P.B([('priya',"Take the head off. I need to see your neck."),('benny',"I can't. My manager will fire me.")],aisle(ex={'priya':'calm'},benny=dict(expr='sad',stain=True,x=720),priya=dict(expr='deadpan',x=560),z=1.45,x=640),mood='comic')
P.B([('priya',"Your manager is a zombie by now."),('benny',"...That's fair.")],aisle(ex={'priya':'calm'},benny=dict(expr='sad',stain=True,x=720),priya=dict(expr='smug',x=560),z=1.45,x=640),mood='comic',sfx=[('rimshot','e-0.3')])
P.B([('benny2',"I'm Benny. I'm nineteen. It's my third shift.")],aisle(ex=ALLW('smile'),benny=dict(expr='sad',stain=True,x=720,bare=True),z=1.6,x=720),mood='sad',sfx=[('zip',.1),('sigh','e-0.6')])
P.B([('priya',"No bite. No fever. Just a lot of sauce."),('amara',"Aww.")],two('priya','amara',ex={'priya':'smile','amara':'smile'},z=1.0,hy=260,amara=dict(sling=True)) if False else cu('priya','smile',z=1.6),mood='warm')
P.B([('bus',"Fun fact: the driver's seat is thirty-nine degrees. The heater is off. Cozy!")],card('pa',mode='text',lines=['SEAT 1 · DRIVER','39.2°C','HEATER: OFF'],time='SENSOR'),mood='idle',sfx=[('ping',.2),('ping',1.5)])
P.B([('rosa',"Hot flash."),('priya',"...Right.")],cab('tired',z=1.45,sweat=1.0,red=.2,out='road'),mood='creep',sfx=[('heartbeat',.2)])
P.B([('dante',"Statistically, one of us is lying.")],card('board',status=dict(benny='clear'),foot='WHO IS LYING?'),mood='creep',sfx=[('stab',.3)])
P.B([('bus',"Part four of ten, The Last Bus. Next: the sleeve check. Follow for part five. Wash your wings.")],card('pa',mode='close',part=4,of=10,next='THE SLEEVE CHECK',time='11:48 PM'),mood='idle',sfx=[('chime',0)])
