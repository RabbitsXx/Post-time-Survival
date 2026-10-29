from buslib import *
P=Part(2,'THE TUNNEL','9:07 PM','RIDGEWAY TUNNEL');BEATS=P.BEATS;TITLE=P.TITLE
ALLW=lambda e:{w:e for w in SEATX}
# 0 hook: the mouth of the tunnel, engine dying
P.B([('rosa',"Engine off. Nobody make a sound.")],pov('tunnel',speed=.7,horde=dict(n=6,x0=520,x1=760)),mood='creep',cam='push_in',fx=[P.announce()],sfx=[('powerdown',.3)])
P.B([('bus',"Ding dong! This is the Last Bus. Part two of ten: the tunnel.")],card('pa',mode='open',part=2,of=10,title='THE TUNNEL',time='9:07 PM'),mood='idle',sfx=[('chime',0)])
P.B([('rosa',"Eight hundred meters. All downhill. We coast.")],cab('calm',z=1.25,sweat=.5,zom=3,L=dict(dome='dim')),mood='creep')
P.B([('priya',"In a tunnel, every sound echoes. So whisper, like it's a library.")],cu('priya','worried',z=1.7,out='tunnel',L=dict(dome='dim')),mood='creep')
# the silent coast
P.B([],wide(540,1.0,ex=ALLW('worried'),out='tunnel',L=dict(dome='off',speed=120),extra=[outside(5,60,560,to=-90)]),dur=2.6,mood='creep',cam='push_in',sfx=[('heartbeat',.2),('horde',.4)])
# first noise: Walt
P.B([],cu('walt','sleep',z=1.9,out='tunnel',L=dict(dome='dim'),walt=dict(snore=True)),dur=2.5,mood='creep',sfx=[('snore',.1)],fx=[sticker(.5,'ZZZ',x=270,y=150,rot=-8,size=52,c='#cfe4ff',dur=1.9)])
P.B([('dante',"Somebody shut him up!"),('priya',"He's asleep. Not infected.")],wide(840,1.15,ex={'dante':'angry','priya':'tired','walt':'sleep'},out='tunnel',L=dict(dome='dim')),mood='comic')
P.B([('marcus',"Sir? Sir. Sir!"),('walt',"Five more minutes, Margaret.")],two('marcus','walt',ex={'marcus':'scared','walt':'sleep'},z=1.5,out='tunnel',L=dict(dome='dim')),mood='comic',sfx=[('boing','e-0.5')])
# second noise: the baby
P.B([('amara',"Shh, shh, shh. Please, baby. Shh.")],cu('amara','worried',z=1.9,out='tunnel',L=dict(dome='dim'),amara=dict(sling=True,tremble=.8)),mood='creep',sfx=[('baby',.2)])
# third: Vic's phone
P.B([('vic',"Chat. Not now!"),('lena',"I'll hold it.")],wide(394,1.45,ex={'vic':'shock','lena':'deadpan','park':'worried'},out='tunnel',L=dict(dome='dim')),mood='comic',sfx=[('ping',.1)])
# zombies at the glass
P.B([('teddy',"Gary says that one has a hat."),('rosa',"Gary. Quiet.")],cu('teddy','scared',z=1.8,out='tunnel',L=dict(dome='off'),extra=[outside(2,860,1000,to=-20,s=.9)]),mood='creep',sfx=[('slap',.1),('slap',1.2)])
# Dante's flashlight
P.B([('dante',"Don't panic. I have a tactical flashlight."),('priya',"Light is a loudspeaker!")],wide(880,1.0,ex={'dante':'smug','priya':'angry','marcus':'scared'},out='tunnel',L=dict(dome='off'),extra=[outside(4,600,1000,to=60)]),mood='creep',
    fx=[dict(k='beam',at=.2,dur=2.2,x=170,y=330,a0=-10,a1=75,len=620),shake('s1',5,.3)],sfx=[('click',.2),('stab','s1')])
# BUS-E blows it
P.B([('bus',"Attention passengers! We are now entering the Ridgeway Tunnel!")],card('pa',mode='text',lines=['ATTENTION!','NOW ENTERING','RIDGEWAY TUNNEL'],time='LOUD'),mood='creep',sfx=[('chime',0),('horde',.8)])
P.B([('marcus',"BUS-E!"),('priya',"BUS-E!"),('rosa',"BUS-E.")],wide(800,1.0,ex=ALLW('shock'),out='tunnel',L=dict(dome='off')),mood='comic',sfx=[('stab',0)])
P.B([('buswh',"Whisper mode activated.")],card('pa',mode='text',lines=['WHISPER','MODE','ACTIVATED'],time='SHH'),mood='comic',sfx=[('rimshot','e-0.4')])
# the exit... and the engine will not start
P.B([('priya',"There. The exit. We made it.")],pov('tunnel',[steve(640,y=392,view='front',pose='zombie',s=.2,held=dict(t='ticket',ox=70,oy=-190,rot=0,s=1.4))],speed=1.5,gauge=False),mood='idle',cam='push_in')
P.B([('rosa',"..."),('rosa',"No.")],cab('tired',z=1.5,sweat=.9,out='road'),mood='creep',sfx=[('crank',0),('engfail',1.6)])
P.B([('priya',"How much fuel do we have?"),('rosa',"Not enough.")],pov('road',speed=0,fuel=0,wipe=False),mood='creep',sfx=[('stab','s1+0.3')])
P.B([('bus',"Part two of ten, The Last Bus. Next stop: the last drop. Follow for part three. Fuel level: please don't ask.")],card('pa',mode='close',part=2,of=10,next='THE LAST DROP',time='10:02 PM'),mood='idle',sfx=[('chime',0)])
