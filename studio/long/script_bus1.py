from buslib import *
P=Part(1,'THE LAST DEPARTURE','8:00 PM','RIDGEWAY TERMINAL');BEATS=P.BEATS;TITLE=P.TITLE
sad=lambda **k:k
# ---- 0 HOOK (the part number is already on screen: announce chip) ----
P.B([('dante',"Fun fact. In every zombie movie, somebody on the bus is hiding a bite.")],
    wide(690,1.0,ex={w:'worried' for w in SEATX}|{'dante':'smug','walt':'sleep'},out='city'),cam='dolly',mood='creep',fx=[P.announce()],sfx=[('riser',0),('stab','e-0.7')])
# ---- 1 BUS-E opens: series, part, topic ----
P.B([('bus',"Ding dong! This is the Last Bus. Part one of ten: the last departure.")],card('pa',mode='open',part=1,of=10,title='THE LAST DEPARTURE',time='8:00 PM'),mood='idle',sfx=[('chime',0)])
# ---- 2 Rosa at the door ----
P.B([('rosa',"Doors close in ten seconds. Anyone not on, stays in this city.")],cab('angry',z=1.25,zom=7,out='city',sway=2),cam='hand',mood='creep',sfx=[('horde',0),('brake','e-1.0')])
# ---- 3 Steve and his ticket ----
P.B([('steve',"Waaait. I have a ticket."),('rosa',"Nobody gets on.")],
    ext('terminal',[steve(210,y=668,pose='zwalk',anim='zwalk',s=.95,to=[430,668],talk='steve',spd=2.4,held=dict(t='ticket',ox=120,oy=-250,rot=0,s=1.3))],bx=800,bto=800,bs=.8,y=470,x=560),mood='comic',sfx=[('groan',0),('doorslam','s1+0.5')])
# ---- 4 Teddy names the zombie ----
P.B([('teddy',"Bye, Steve!"),('priya',"Teddy. You can't name the zombie."),('teddy',"He looks like a Steve.")],two('teddy','priya',ex={'teddy':'grin','priya':'tired'},z=1.5,out='city',teddy=dict(pose='wave')),mood='comic')
# ---- 5 the three rules ----
P.B([('rosa',"Three rules."),('rosa',"Nobody gets on."),('rosa',"Nobody gets off."),('rosa',"And don't talk to the driver.")],
    card('rules',rules=[['NOBODY GETS ON'],['NOBODY GETS OFF'],["DON'T TALK","TO THE DRIVER"]],at=['s1','s2','s3']),mood='idle',sfx=[('stamp','s1'),('stamp','s2'),('stamp','s3')])
# ---- 6-8 Priya: the clock and the symptoms ----
P.B([('priya',"Listen. A bite turns you in about ten hours.")],cu('priya','worried',z=1.8),mood='creep',cam='push_in')
P.B([('priya',"First, a fever."),('priya',"Then sweating."),('priya',"Shaking."),('priya',"Confusion."),('priya',"And red eyes.")],
    card('symptoms',items=[dict(l='FEVER',ic='fever'),dict(l='SWEATING',ic='sweat'),dict(l='SHAKING',ic='shake'),dict(l='CONFUSION',ic='confused'),dict(l='RED EYES',ic='eyes')],at=['s0','s1','s2','s3','s4']),mood='creep',
    sfx=[('ping','s0+0.4'),('ping','s1+0.35'),('ping','s2+0.3'),('ping','s3+0.3'),('ping','s4+0.3')])
P.B([('priya',"If anyone's been bitten, tell us now. We can help.")],cu('priya','sad',z=1.6),mood='creep')
# ---- 9 silence ----
P.B([],wide(690,1.05,ex={w:'worried' for w in SEATX}|{'walt':'sleep'},out='city',park=dict(sweat=.6)),dur=2.1,cam='push_in',mood='creep',sfx=[('heartbeat',.15)])
# ---- 10-17 the denials ----
P.B([('marcus',"Not bitten! Scared. Different thing.")],cu('marcus','scared',z=1.9,marcus=dict(tremble=1.4)),mood='comic',sfx=[('boing','e-0.4')])
P.B([('june',"I've outlived two husbands, dear. Nobody's biting me.")],cu('june','smug',z=1.9),mood='comic',sfx=[('rimshot','e-0.1')])
P.B([('vic',"Chat, nobody's bitten. Drop a one if you agree.")],cu('vic','grin',z=1.9,extra=[prop('phone',640,520,1.5,rot=-14)]),mood='comic',fx=[sticker(.1,'● LIVE',x=330,y=170,rot=4,size=34,c='#ff4a4a',dur=2.6)],sfx=[('ping','s0+1.9')])
P.B([('lena',"Nope.")],cu('lena','deadpan',z=1.9,extra=[prop('bulge',ISEAT:=SEATX['lena'],545,1.1,sway=1)]),mood='creep',dur=1.9)
P.B([('benny',"Cluck... I mean, no. Sorry.")],cu('benny','worried',z=1.9),mood='comic',sfx=[('cluck',.15)])
P.B([('park',"I have a nine o'clock meeting.")],cu('park','worried',z=1.9,park=dict(sweat=1,pale=.35)),mood='creep',sfx=[('sigh','e-0.9')])
P.B([('dante',"Obviously not. I'd know. I've seen the movies.")],cu('dante','smug',z=1.9),mood='comic')
# ---- 18 Rosa in the mirror ----
P.B([('rosa',"Nobody's bitten. Sit down.")],card('mirror',who='rosa',expr='tired',sweat=.5,talk='rosa'),mood='creep',sfx=[('heartbeat',.1)])
# ---- 19-20 the bus leaves; BUS-E signs off (series name, part, next stop) ----
P.B([('bus',"Ten hours to Pier 8. Please keep arms, legs and brains inside the vehicle.")],ext('terminal',[hz(8,100,520,y=640,s=.9,to=-40),steve(240,y=660,pose='zwalk',anim='zwalk',s=.95,to=[330,660],spd=2.2)],bx=520,bto=1180,bs=.8,y=470,roadSp=900,scroll=500),cam='static',mood='idle',sfx=[('engstart',0),('horn','s0+3.6')])
P.B([('bus',"Part one of ten, The Last Bus. Next stop: the tunnel. Follow for part two, and please be very, very quiet.")],card('pa',mode='close',part=1,of=10,next='THE TUNNEL',time='9:07 PM'),mood='creep',sfx=[('chime',0),('whisper','e-1.2')])
