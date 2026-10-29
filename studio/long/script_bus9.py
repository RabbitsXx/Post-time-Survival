from buslib import *
P=Part(9,'THE GLOVE','4:47 AM','MILE 20');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
def withpriya(ex='worried',z=1.4,**k):
    acts=[rosa('sad',talk=True,sweat=1,red=.8,pale=.3,wound=True,tear=True),prop('wheel',1238,500),pax('priya',ex,talk=True,stand=True,x=1075,y=790)]
    return bus(1180,acts,z=z,y=cy(z,260),out='road',**k)
P.B([('priya',"Rosa. Take off the glove.")],withpriya('worried',1.3),mood='sad',cam='push_in',fx=[P.announce()],sfx=[('heartbeat',0),('brake',.2)])
P.B([('bus',"Ding dong! This is the Last Bus. Part nine of ten: the glove.")],card('pa',mode='open',part=9,of=10,title='THE GLOVE',time='4:47 AM'),mood='idle',sfx=[('chime',0)])
P.B([('rosa',"Seven-fifty. The garage. I counted. Ten hours.")],card('arm',time='7:50 PM',left='10 HOURS',sub='NOW 4:47 AM · 1 HOUR LEFT'),mood='sad',sfx=[('zip',.2),('stab',1.2),('heartbeat',2.0)])
P.B([('dante',"I knew it! I knew it!"),('marcus',"Rosa?!")],bus(640,crew(ex=ALLW('shock'),talk=True,skip=('dante',))+[steve(460,y=419,view='front',pose='zombie',s=.62,layer='far',held=dict(t='ticket',ox=70,oy=-190,rot=0,s=1.3)),prop('sign',560,419,.9,layer='far',txt='BUS STOP')]+[pax('dante','angry',talk=True,stand=True,x=560,y=790,pose='finger')],z=1.0,y=cy(1.0,300),out='road'),mood='chase',cam='push_in',sfx=[('stab',0),('gasp',.3)])
P.B([('priya',"Why didn't you tell us?"),('rosa',"You'd have put me off at the first stop. And then, who drives?")],withpriya('sad',1.7),mood='sad',sfx=[('sigh','e-0.5')])
P.B([('dante',"She's infected! We leave her here!")],bus(640,crew(ex=ALLW('shock'),talk=True,skip=('dante',))+[pax('dante','angry',talk=True,stand=True,x=560,y=790,pose='finger')],z=1.35,y=cy(1.35,300),out='road'),mood='creep')
P.B([('marcus',"She drove us through a tunnel and a toll, with a fever. I'm not leaving her.")],cu('marcus','angry',z=1.8,out='road'),mood='sad',cam='push_in')
P.B([('june',"Sit down, Dante."),('park',"She could have left us anywhere.")],wide(500,1.3,ex={'june':'angry','park':'sad','vic':'worried'},out='road'),mood='sad')
P.B([('benny',"Cluck... I mean, she stays."),('amara',"Please.")],two('benny','amara',ex={'benny':'sad','amara':'cry'},z=1.5,amara=dict(sling=True,tear=True),benny=dict(tear=True)),mood='sad')
P.B([('teddy',"Rosa, you can't turn. Gary won't allow it.")],cu('teddy','cry',z=1.8,teddy=dict(tear=True)),mood='sad',sfx=[('sigh','e-0.6')])
P.B([('priya',"Everyone who wants Rosa to stay. Hands up."),('dante',"...Fine.")],bus(640,crew(ex=ALLW('smile'),talk=True,**{w:dict(pose='cheer') for w in SEATX}),z=1.0,y=cy(1.0,260),out='road'),mood='warm',sfx=[('cheer',.9)])
P.B([('rosa',"Thirty-eight minutes. I need a driver for the last mile. Marcus.")],withpriya('worried',1.7,),mood='sad')
P.B([('marcus',"I can't."),('rosa',"You climbed a bridge for a dinosaur."),('teddy',"Gary says yes.")],two('marcus','teddy',ex={'marcus':'worried','teddy':'smile'},z=1.3),mood='warm',sfx=[('sigh','e-0.5')])
P.B([('bus',"Rosa. I will keep the dome light on for you.")],card('pa',mode='text',lines=['DOME LIGHT','STAYS ON','FOR ROSA'],time='4:55 AM'),mood='sad',sfx=[('chime',0)])
P.B([('bus',"Part nine of ten, The Last Bus. Next: Pier 8. Follow for the final part.")],card('pa',mode='close',part=9,of=10,next='PIER 8',time='5:48 AM'),mood='sad',sfx=[('chime',0)])
