from buslib import *
P=Part(3,'THE LAST DROP','10:02 PM','GHOST GAS STATION');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
P.B([('rosa',"Six miles of fuel. Eight miles to the highway.")],pov('road',speed=.5,fuel=0,gauge=True,wipe=False),mood='creep',cam='push_in',fx=[P.announce()],sfx=[('riser',0)])
P.B([('bus',"Ding dong! This is the Last Bus. Part three of ten: the last drop.")],card('pa',mode='open',part=3,of=10,title='THE LAST DROP',time='10:02 PM'),mood='idle',sfx=[('chime',0)])
P.B([('rosa',"A ghost station. Pumps are dead. Nobody gets off.")],ext('station',[hz(5,300,560,y=640,s=.9,to=40),steve(1010,y=640,view='front',pose='zombie',s=.9,talk='steve')],bx=300,bto=640,bs=.8,x=640,y=470,ease=True,roadSp=200,scroll=120),mood='creep',sfx=[('brake','s0+1.2')])
P.B([('dante',"Relax. In every game, there's a gas can behind the station."),('priya',"This is not a game.")],wide(850,1.2,ex={'dante':'smug','priya':'angry'},out='station'),mood='comic')
P.B([('priya',"That truck has a full tank. We siphon it."),('marcus',"Why is everyone looking at me?"),('priya',"You're tall.")],wide(925,1.25,ex={'priya':'calm','marcus':'scared','dante':'smug'},out='station',marcus=dict(tremble=1.2)),mood='comic',sfx=[('boing','s1+1.2')])
P.B([('priya',"Rule: never use your mouth. Hose in the tank. Can lower down. Gravity does the rest.")],card('siphon'),mood='idle',sfx=[('pop',.5),('click',1.2),('gurgle',2.0)])
P.B([('benny',"I did track in high school. And zombies love chicken."),('priya',"That's not how that works.")],cu('benny','worried',z=1.9,out='station',L=dict(dome='dim')),mood='comic',sfx=[('cluck',.2)])
P.B([('benny',"Cluck, cluck, cluck!")],ext('station',[dict(k='benny',view='side',pose='run',anim='run',x=900,y=650,s=.9,flip=True,to=[200,650],spd=4.6,talk='benny'),hz(6,960,1180,y=640,s=.9,to=-760,flip=True),steve(1100,y=650,view='side',pose='zwalk',anim='zwalk',s=.9,flip=True,to=[1000,650],spd=1.8)],bx=1250,bto=1250,bs=.7,x=640,y=470,bus=False),mood='chase',sfx=[('doorhiss',0),('cluck',.5),('groan',.6),('cluck',1.6)])
P.B([('marcus',"It's filling. It's filling. It's... diesel in my mouth!"),('priya',"I said never use your mouth!")],
    ext('station',[dict(k='marcus',view='side',pose='dig',x=1130,y=650,s=.85,talk='marcus',tremble=.8),dict(k='priya',view='side',pose='stand',x=1350,y=650,s=.8,flip=True,talk='priya'),prop('jerry',1230,650,1.4),prop('hose',1150,455,1,d='M0,0 C30,-30 70,-10 70,100')],bx=420,bto=420,bs=.8,x=1210,y=520),mood='comic',sfx=[('gurgle',.1),('rimshot','e-0.3')])
P.B([('rosa',"Hurry. Please hurry.")],cab('tired',z=2.0,sweat=.8,hy=300,x=1215),mood='creep',fx=[dict(k='counter',at=.1,dur=3.0,x=225,y=190,txt='FUEL 31 / 40 L',size=36,c='#ffd23a',rise=0)],sfx=[('heartbeat',.2),('ratchet',.6)])
P.B([('rosa',"Come on. Come on.")],cab('worried',z=1.5,sweat=.8,out='road'),mood='creep',sfx=[('crank',0),('engstart',1.0),('cheer',2.2)])
P.B([('dante',"Go go go!")],wide(880,1.1,ex=ALLW('shock'),out='station',L=dict(speed=300)),mood='chase',dur=2.0,sfx=[('doorhiss',0),('horn',.8)],cam='whip')
P.B([('teddy',"Where's Benny?"),('rosa',"We don't go back."),('teddy',"Gary says we GO BACK!")],cu('teddy','cry',z=1.8,out='road',L=dict(speed=260)),mood='sad',sfx=[('cluck',.3),('sigh',2.4)])
P.B([('bus',"Part three of ten, The Last Bus. Next stop: the chicken. Follow for part four.")],card('pa',mode='close',part=3,of=10,next='THE CHICKEN',time='10:41 PM'),mood='idle',sfx=[('chime',0)])
