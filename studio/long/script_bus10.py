from buslib import *
P=Part(10,'PIER 8','5:48 AM','PIER 8');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
RUN=lambda who,x0,x1,y=665,s=.8,spd=4.2,**k:dict(k=who,view='side',pose='run',anim='run',x=x0,y=y,s=s,to=[x1,y],spd=spd,**k)
P.B([('rosa',"Marcus. Hands at ten and two. Breathe. And don't stop for anything.")],cabdrive('scared',z=1.3),mood='sad',cam='push_in',fx=[P.announce()],sfx=[('heartbeat',0),('engstart',.2)])
P.B([('bus',"Ding dong! This is the Last Bus. Part ten of ten: Pier 8.")],card('pa',mode='open',part=10,of=10,title='PIER 8',time='5:48 AM'),mood='idle',sfx=[('chime',0)])
P.B([('marcus',"Which pedal is the brake?"),('rosa',"The big one."),('marcus',"They're both big!")],cabdrive('shock',z=1.35,L=dict(sway=4)),mood='chase',fx=[shake('s2',7,.6)],sfx=[('brake','s2+0.1'),('boing','e-0.4')])
P.B([('priya',"The ferry leaves in twelve minutes.")],pov('pier',speed=1.2,gauge=False,horde=dict(n=10,x0=420,x1=860)),mood='chase',fx=[dict(k='counter',at=.1,dur=3.5,x=225,y=190,txt='FERRY 6:00 AM',size=34,c='#ffd23a',rise=0)],sfx=[('horn',.5),('riser',.2)])
P.B([('dex',"Over here! Three whistle blasts, that's us!"),('maya',"Dad, are those the survivors?"),('dex',"Maya, not now!")],ext('pier',[dict(k='dex',view='front',pose='wave',expr='smile',x=760,y=640,s=.95,talk='dex'),prop('whistle',820,430,1.5,rot=20)],bus=False,x=720,y=470,z=1.1),mood='comic',
    fx=[dict(k='pip',at='s1',dur=2.0,who='maya',x=270,y=98)],sfx=[('whistle',.2),('whistle',.9),('whistle',1.6),('radio','s1')])
P.B([('rosa',"Horn. Aim it at the end of the pier."),('marcus',"You can aim a horn?"),('rosa',"Everything can be aimed.")],cabdrive('worried',z=1.35),mood='chase',sfx=[('hornlong','e-1.3')])
P.B([],ext('pier',[hz(10,300,640,y=655,s=.9,to=520)],bx=140,bto=1000,bs=.85,x=720,y=470,roadSp=1300,scroll=700),dur=3.2,mood='chase',cam='whip',sfx=[('hornlong',0),('horde',.3),('crack',1.9),('cheer',2.4)])
P.B([('dante',"He is heavy!"),('walt',"Mmm. Five more minutes.")],ext('pier',[RUN('marcus',300,780,s=.85,spd=3.2),RUN('dante',200,690,s=.8,spd=3.2,talk='dante'),RUN('priya',380,900,spd=4.4),RUN('teddy',150,650,s=.55,spd=4.6),RUN('vic',100,560,spd=4.4),RUN('june',40,420,s=.7,spd=3.0),RUN('lena',60,500,spd=4.2),RUN('benny',20,470,s=.85,spd=4.0)],bus=False,x=640,y=470,z=1.0),mood='comic',sfx=[('footsteps',0),('cluck',1.4),('boing','e-0.4')])
P.B([('priya',"Rosa, come with us."),('rosa',"Ten hours. I said I would get you here.")],cabdrive('sad',z=1.6,rex='smile',rtilt=-6),mood='sad',sfx=[('sigh','e-0.5')])
P.B([('teddy',"Come with us!"),('rosa',"Somebody has to turn off the lights.")],cabdrive('sad',z=1.35,rex='smile',rtilt=-6),mood='sad',sfx=[('swell',0)])
P.B([('steve',"I have a ticket."),('rosa',"...Welcome aboard."),('bus',"Thank you for riding the Last Bus.")],ext('pier',[steve(120,y=660,view='side',pose='zwalk',anim='zwalk',s=.9,to=[560,660],spd=1.9,talk='steve',held=dict(t='ticket',ox=120,oy=-250,rot=0,s=1.3))],bx=860,bto=860,bs=.85,x=640,y=470,z=1.0,roadSp=0,scroll=0),mood='sad',sfx=[('doorhiss','s1'),('chime','s2'),('swell',.2)])
P.B([('walt',"Did I miss something?")],loc('ext',[dict(k='walt',view='front',pose='stand',expr='calm',x=560,y=660,s=1.3,talk='walt')],x=560,y=480,z=1.2,v='pier',bus=False),mood='warm',sfx=[('rimshot','e-0.2'),('cheer',.3)])
P.B([('bus',"Part ten of ten, the end of The Last Bus. Follow for the next series.")],card('finale'),mood='sad',nofade=True,sfx=[('chime',0),('swell',.1)])
