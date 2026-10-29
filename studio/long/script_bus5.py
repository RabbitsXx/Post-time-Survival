from buslib import *
P=Part(5,'THE SLEEVE CHECK','11:48 PM','HIGHWAY 9');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
def aisle(ex=None,priya=None,x=640,z=1.1,out='road',**L):
    acts=crew(ex=ex,talk=True,skip=('priya',) if priya else ())+[steve(600,y=419,view='front',pose='zombie',s=.62,layer='far',to=[560,419],held=dict(t='ticket',ox=70,oy=-190,rot=0,s=1.3))]
    if priya:acts.append(pax('priya',priya.pop('expr','calm'),talk=True,stand=True,x=priya.pop('x',560),**priya))
    return bus(x,acts,z=z,y=cy(z,300),out=out,**L)
P.B([('priya',"Everybody. Sleeves up. Now.")],aisle(ex=ALLW('worried'),priya=dict(expr='angry',x=640),z=1.0),mood='creep',cam='push_in',fx=[P.announce()],sfx=[('riser',0),('stab','e-0.4')])
P.B([('bus',"Ding dong! This is the Last Bus. Part five of ten: the sleeve check.")],card('pa',mode='open',part=5,of=10,title='THE SLEEVE CHECK',time='11:48 PM'),mood='idle',sfx=[('chime',0)])
P.B([('priya',"A bite shows on arms and legs. We check each other. Trust, but verify.")],aisle(ex={'priya':'calm'},priya=dict(expr='deadpan',x=700),z=1.7,x=700),mood='creep')
P.B([('dante',"I trust nobody."),('june',"Sleeves up? At my age, dear, that's a compliment.")],two('dante','june',ex={'dante':'angry','june':'smug'},z=1.5),mood='comic',sfx=[('rimshot','e-0.2')])
P.B([('marcus',"Don't ask about the tattoo.")],cu('marcus','worried',z=1.9,marcus=dict(pose='flexL',sleeveUp='L')),mood='comic',fx=[sticker(.4,'BORN TO BE MILD',x=250,y=140,rot=-6,size=28,c='#8ac0ff',dur=2.0)],sfx=[('boing','e-0.5')])
P.B([('june',"Graceland, nineteen seventy-seven. Nobody asks about seventy-seven.")],cu('june','grin',z=1.9,june=dict(pose='flex',sleeveUp='R')),mood='comic',fx=[sticker(.5,'♥ ELVIS 1977',x=220,y=140,rot=5,size=30,c='#ff9ec7',dur=2.4)],sfx=[('rimshot','e-0.2')])
P.B([('vic',"Chat, I'm clean. Also, I'm at one percent.")],cu('vic','grin',z=1.9,extra=[prop('cables',455,455,1.5)]),mood='comic',fx=[sticker(.4,'1% BATTERY',x=330,y=150,rot=-5,size=30,c='#ff8a80',dur=2.2)],sfx=[('ping',.2)])
P.B([('dante',"That's... my emergency pizza.")],cu('dante','shock',z=1.9,extra=[prop('pizza',700,520,1.5,to=[690,690],spin=40)]),mood='comic',sfx=[('thud',.9),('rimshot','e-0.2')])
P.B([('priya',"Sir. Sleeve."),('walt',"Not on the first date, Margaret.")],cu('walt','sleep',z=1.9,walt=dict(snore=True)),mood='comic',sfx=[('boing','e-0.5')])
P.B([('lena',"No."),('dante',"She's hiding something!")],two('lena','park',ex={'lena':'angry','park':'worried'},z=1.45,lena=dict(pose='stand')),mood='creep',sfx=[('stab','s1')])
P.B([('priya',"Lena. Sleeve."),('lena',"...Fine.")],cu('lena','sad',z=1.9,lena=dict(pose='flexL',sleeveUp='L'),extra=[prop('scratch',244,452,1.5)]),mood='creep',sfx=[('gasp',1.4)])
P.B([('dante',"Bite!")],wide(490,1.1,ex=ALLW('shock'),dante=dict(expr='angry')),mood='chase',dur=1.9,sfx=[('stab',0)],cam='whip')
P.B([('priya',"A bite is two curved rows of punctures. These are parallel lines. Scratches.")],card('bitevs'),mood='idle',sfx=[('pop',.2),('pop',1.3)])
P.B([('lena',"This is Mochi.")],cu('lena','smile',z=1.7,extra=[prop('cat',296,560,1.7,to=[296,520])]),mood='warm',sfx=[('meow',.5),('purr',1.0)])
P.B([('dante',"Pets aren't allowed!"),('lena',"Neither are zombies.")],wide(490,1.15,ex={'dante':'angry','lena':'smug','park':'worried'}),mood='comic',sfx=[('rimshot','e-0.2')])
P.B([('dante',"Driver too!"),('rosa',"Driver doesn't get checked. Driver drives."),('dante',"Convenient."),('rosa',"Convenient is how you reach Pier 8.")],cab('angry',z=1.35,sweat=.8,out='road'),mood='creep',sfx=[('heartbeat','s3')])
P.B([('priya',"Mr. Park. Sleeve."),('park',"My medicine is private. I don't feel...")],cu('park','worried',z=1.8,park=dict(sweat=1,pale=.5,tremble=1.0)),mood='creep',sfx=[('thud','e-0.4'),('stab','e-0.4')])
P.B([('bus',"Part five of ten, The Last Bus. Next: the briefcase. Follow for part six. Please do not faint.")],card('pa',mode='close',part=5,of=10,next='THE BRIEFCASE',time='1:15 AM'),mood='idle',sfx=[('chime',0)])
