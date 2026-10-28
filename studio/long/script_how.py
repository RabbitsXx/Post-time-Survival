"""HOW TO SURVIVE A ZOMBIE APOCALYPSE (Game vs Real Life) - the whole script as data.
Beat = dict(say=[(speaker, text)], scene={n,p}, skin, cam, fx=[...], sfx=[(name, at)], mood, dur, pause)
 speakers: dex (guru, Fenrir) | game (announcer, lo-fi) | maya (radio kid) | steve (grunts)
 text may carry <y>..</y> / <r>..</r> accents (captions only; stripped for TTS)
 fx 'at' / sfx at: seconds from beat start, or 'e-0.5' (from the end), or 's1+0.2' (from the start of sentence 1)."""
TITLE='HOW TO SURVIVE A ZOMBIE APOCALYPSE (Game vs Real Life)'
BEATS=[]
def beat(say=(),scene=None,skin='real',cam=None,fx=None,sfx=None,mood='tense',dur=None,pause=0.0,cap=None):
    b=dict(say=[(s,t) for s,t in say],scene=scene,skin=skin,cam=cam,fx=fx or [],sfx=sfx or [],mood=mood,dur=dur,pause=pause);BEATS.append(b);return b
def stage(loc,acts=None,v=None,skin='real',tag=None,hud=None,**p):
    d=dict(loc=loc,acts=acts or [],tag=tag);
    if v:d['v']=v
    if hud:d['hud']=hud
    d.update(p);return dict(n='stage',p=d)
def card(kind,**p):p['kind']=kind;return dict(n='card',p=p)
def dex(view='front',pose='stand',expr='cool',x=640,y=600,s=1.15,talk=True,**k):
    return dict(k='dex',view=view,pose=pose,expr=expr,x=x,y=y,s=s,talk='dex' if talk else False,**k)
def steve(x,y=600,view='side',pose='zwalk',s=1.1,**k):
    a=dict(k='steve',view=view,pose=pose,x=x,y=y,s=s);a.update(k);return a
def hz(n,x0,x1,y=590,s=.9,**k):
    a=dict(k='horde',n=n,x0=x0,x1=x1,y=y,s=s);a.update(k);return a
def dog(x,y=600,s=.8,pose='stand',**k):
    a=dict(k='dog',x=x,y=y,s=s,pose=pose);a.update(k);return a
def prop(t,x,y,s=1,**k):
    a=dict(k='prop',t=t,x=x,y=y,s=s);a.update(k);return a
def sticker(at,txt=None,x=640,y=200,rot=-6,size=96,c='#ffd23a',dur=1.3,ic=None,s=1):
    d=dict(k='sticker',at=at,x=x,y=y,rot=rot,size=size,c=c,dur=dur,s=s)
    if txt:d['txt']=txt
    if ic:d['ic']=ic
    return d
def zoom(at,to=1.18,cx=640,cy=300,dur=.14,hold=None,back=None):
    d=dict(k='zoom',at=at,to=to,cx=cx,cy=cy,dur=dur)
    if hold is not None:d['hold']=hold;d['back']=back or .3
    return d
def shake(at,amp=8,dur=.4):return dict(k='shake',at=at,amp=amp,dur=dur)
GAME_HUD=lambda n,lv:dict(deaths=n,lv=lv,hp=.9)

# ============================================================ COLD OPEN
beat([('dex','Would you survive a zombie apocalypse? Be honest.')],
     stage('street',[dex(x=560,pose='finger',expr='cool',s=1.2),hz(6,820,1180,y=590,s=.7,to=-60)],time='dusk',tag='REAL',horde=False),cam='hand',mood='funk',
     fx=[zoom('e-.5',1.08,cy=330,dur=.4)],sfx=[('whoosh',0.0)])
beat([('dex',"You've played every zombie game ever made. You're basically a <y>soldier</y>.")],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='thumb',expr='smug')]),cam='push_in',mood='funk',
     fx=[sticker('s0+1.6','LEGEND',x=330,y=230,rot=-9,size=104,c='#7dffb0',dur=1.6)])
beat([('dex','Headshots? Easy. Infinite ammo? Easy. <y>Respawn</y>? Always.')],
     stage('street',[dex(view='side',pose='hold2',expr='cool',x=420,y=600,s=1.1,held=dict(t='bat',ox=70,oy=-250,rot=14,s=1)),hz(5,760,1100,y=590,s=.85,to=-40)],time='day',skin='game',tag='GAME',hud=GAME_HUD(0,1),horde=False),skin='game',cam='static',mood='chip',
     fx=[dict(k='toast',at=.5,txt='ZOMBIE SLAYER',dur=2.6),dict(k='glitch',at=0,dur=.18)],sfx=[('pop',0.0),('achieve',.5)])
beat([('dex','But real life gives you <r>one life</r>, and no save button.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='stand',expr='sad')]),cam='push_in',mood='funk',
     fx=[sticker('s0+1.7',ic='skull',x=980,y=250,rot=8,s=.9,dur=1.8),zoom('s0+1.5',1.1,cy=330,dur=.35)],sfx=[('scratch',0.0)])
beat([('dex',"I'm <y>Coach Dex</y>, and I have survived fourteen zombie apocalypses.")],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='finger',expr='cool')]),cam='dolly',mood='funk',
     fx=[dict(k='chyron',at=.3,txt='COACH DEX  ·  SURVIVAL EXPERT*',dur=2.8,x=60,y=60)])
beat([('dex','Okay, none. But I own a very <y>loud whistle</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='shrug',expr='smug')]),cam='static',mood='funk',
     fx=[sticker('s0+1.6','*',x=900,y=210,size=150,c='#ff5a4a',dur=1.2),shake('s0+2.3',6,.3)],sfx=[('whistle','s0+2.3')])
beat([('maya',"Dad. You tripped over a sofa yesterday.")],
     stage('studio',[dex(x=500,y=720,s=1.5,pose='stand',expr='stare',talk=False)]),cam='static',mood='funk',
     fx=[dict(k='pip',at=.05,who='maya',dur=3.2),sticker(.9,ic='sweat',x=620,y=250,rot=10,s=.8,dur=1.6)],sfx=[('radio',0.0)])
beat([('dex','That was a very <y>aggressive</y> sofa.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='finger',expr='angry')]),cam='punch',mood='funk',
     fx=[zoom(.1,1.14,cy=300,dur=.12,hold=3,back=.3)])
beat([('dex','This video is sponsored by <y>Not Dying</y>. Now with fewer bites.')],
     scene=card('sponsor'),cam='static',mood='funk',fx=[],sfx=[('ding',.3),('boom','e-.6')])
beat([('dex',"Not Dying is not a real product. <r>Please don't ask</r>.")],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='stand',expr='tired')]),cam='static',mood='funk',
     fx=[dict(k='popup',at=.3,x=900,y=300,title='Ad_Blocker.exe',msg='Nice try.',btn='OK',w=420,h=210,dur=2)],sfx=[('pop',.3)])
beat([('dex','Before we start, hit the <y>like button</y>. I will wait.')],
     stage('studio',[dex(x=500,y=720,s=1.5,pose='thumb',expr='smile'),steve(1330,y=640,view='side',pose='zwalk',anim='zwalk',s=1.3,flip=1,to=[820,640],layer='mid')]),cam='static',mood='funk',
     fx=[dict(k='like',at=.3,x=900,y=160,tick='e-.35',dur=3.4)],sfx=[('click','e-.35')])
beat([('dex','Oh. Hi, <y>Steve</y>.'),('steve','Uhhhhh.')],
     stage('studio',[dex(x=470,y=720,s=1.5,pose='wave',expr='up'),steve(820,y=640,view='front',pose='zombie',s=1.35)]),cam='static',mood='funk',
     fx=[zoom('s1',1.12,cx=820,cy=330,dur=.12,hold=2,back=.3)],sfx=[('groan','s1')])
beat([('dex','Steve is a zombie. He has no plan. <y>Today, you will</y>.')],
     stage('studio',[dex(x=470,y=720,s=1.5,pose='finger',expr='cool'),steve(900,y=640,view='front',pose='zombie',s=1.35)]),cam='pan_l',mood='funk')
beat([('dex','Eight zombie situations. Two choices in each one.')],
     scene=card('ab',a=dict(t='GAME WAY',icon='skull'),b=dict(t='REAL WAY',icon='check')),cam='static',mood='funk',sfx=[('whoosh',0.0)])
beat([('dex','Choice A is the <y>video game</y> way. Choice B is what <y>actually works</y>.')],
     scene=card('ab',a=dict(t='GAME WAY',icon='skull'),b=dict(t='REAL WAY',icon='check'),pick='b'),cam='static',mood='funk',sfx=[('ding','s0+.6')])
beat([('dex','I died eight times making this video. <y>Real me is fine</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='thumb',expr='smile')]),cam='push_in',mood='funk',
     fx=[dict(k='glitch',at=.3,dur=.2),dict(k='counter',at=.5,x=1010,y=330,txt='DEATHS: 8',size=64,dur=2.4,rise=0)],sfx=[('glitch',.3)])
beat([('dex',"Let's begin.")],scene=card('title'),cam='static',mood='funk',dur=2.4,sfx=[('boom',0.0)],
     fx=[shake(0,10,.4)])

# ============================================================ LEVEL 1: THE BUILDING
OFFICE=lambda **k:dict(loc='office',v='floor',**k)
beat([('game','Level one. The building.')],scene=card('level',lv=1,name='THE BUILDING'),skin='real',cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex',"Day one. You're on the ninth floor, and the lobby is <r>full of zombies</r>.")],
     stage('office',[dex(x=640,y=600,pose='finger',expr='up',s=1.15)],v='floor',tag='REAL'),cam='hand',mood='tense')
beat([('dex','Two ways down: an <y>elevator</y>, or a boring old <y>staircase</y>.')],
     stage('office',[dex(x=640,y=600,pose='shrug',expr='smug',s=1.15)],v='floor',tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+.9',x=300,y=330,rx=140,ry=190,txt='FAST',tx=300,ty=110,c='#ffd23a'),dict(k='ring',at='s0+2.2',x=930,y=330,rx=110,ry=190,txt='BORING',tx=940,ty=110,c='#ff6a5a')])
beat([('dex','A, elevator. B, stairs. <y>Pick one</y>.')],
     scene=card('ab',a=dict(t='ELEVATOR',icon='elevator'),b=dict(t='STAIRS',icon='stairs'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.2'),('tick','s0+1.7'),('tick','s0+2.2')])
beat([('dex','Game brain says <y>elevator</y>. It is fast, it is shiny, it has music.')],
     stage('office',[dex(view='side',anim='walk',x=520,y=600,s=1.1,to=[330,600])],v='floor',skin='game',tag='GAME',hud=GAME_HUD(0,1),state='opening',open=.8),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18)],sfx=[('pop',0.0),('elevmusic','s0')])
beat([('dex','Ding! Floor three. The doors open...')],
     stage('office',[dex(view='front',pose='stand',expr='smile',x=640,y=720,s=1.3,talk=False)],v='elev',skin='game',tag='GAME',hud=GAME_HUD(0,1),state='opening',open=.78,floors=[9,3],cd=.7),skin='game',cam='push_in',mood='chip',
     fx=[zoom('e-.7',1.16,cy=330,dur=.2),shake('e-.7',7,.4)],sfx=[('ding','e-.75'),('groan','e-.5')])
beat([('game','You died.')],
     stage('office',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.3,talk=False)],v='elev',skin='game',tag='GAME',hud=GAME_HUD(1,1),state='open',floors=[3,3]),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=1),dict(k='keycap',at='e-1.2',x=420,y=500,key='F',txt='TO PAY RESPECTS')],sfx=[('trombone',.2)],dur=3.2)
beat([('dex','In a game, that is a <y>loading screen</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='facepalm',expr='tired')]),cam='static',mood='funk',
     fx=[dict(k='vhs',at=0,dur=.9,from_=42)],sfx=[('rewind',0.0)])
beat([('dex','In real life, the <r>power dies</r> between floors.')],
     stage('office',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.3,talk=False)],v='elev',state='closed',dead=True,floors=[9,5],cd=.5,flicker=True,tag='REAL'),cam='hand',mood='tense',
     fx=[dict(k='redvig',at='s0+1.6',dur=3)],sfx=[('powerdown','s0+1.4')])
beat([('dex','Now you are stuck in a metal box with <r>one door</r>.')],
     stage('office',[hz(7,380,900,y=620,s=1.05,to=-50)],v='lobby',n=1,tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+1.5',x=640,y=480,rx=160,ry=130,txt='ONE DOOR',tx=640,ty=140,c='#ff3a2a')])
beat([('dex','And every zombie knows exactly <y>where it opens</y>.')],
     stage('office',[hz(9,300,1000,y=600,s=1.15,to=60)],v='lobby',n=1,tag='REAL'),cam='dolly',mood='tense',
     fx=[sticker('e-1.2','BRUH',x=1000,y=190,rot=7,size=120,c='#ffd23a',dur=1.2)],sfx=[('boom','e-1.2')])
beat([('dex','Choice B: the <y>stairs</y>. Boring, slow, and full of doors.')],
     stage('office',[dex(view='side',anim='walk',x=300,y=520,s=.9,to=[420,455],shades=0,expr='up')],v='stairs',tag='REAL'),cam='pan_r',mood='tense')
beat([('dex','Close every door behind you. Each one <y>costs them time</y>.')],
     stage('hall',[dex(view='side',pose='stand',x=470,y=600,s=1.1,expr='angry',shades=0),prop('chair',560,600,s=1.1,to=[760,600],rot=0)],door='closing',n=5,hto=-30,bang=True,tag='REAL'),cam='hand',mood='tense',
     fx=[shake('s0+1.2',8,.3)],sfx=[('doorslam','s0+1.1'),('bang','s0+1.8'),('bang','s0+2.3')])
beat([('dex','And stairs let you stop, turn around, or <y>change your mind</y>.')],
     stage('office',[dex(view='side',pose='stand',x=700,y=290,s=.9,expr='up',shades=0)],v='stairs',tag='REAL'),cam='drift',mood='tense')
beat([('dex','An elevator has one exit. A staircase has a door on <y>every floor</y>.')],
     scene=card('stat',title='EXITS',a=dict(l='ELEVATOR',v=1,sub='ONE DOOR'),b=dict(l='STAIRS',v=9,sub='A DOOR ON EVERY FLOOR')),cam='static',mood='funk',sfx=[('tick',.4),('ding',1.4)])
beat([('dex','Rule one: <y>never enter a box</y> with only one door.')],
     scene=card('rule',n=1,t1='NEVER ENTER A BOX',t2='WITH ONE DOOR',icon='doorclose'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve took the elevator. <y>We do not talk about Steve</y>.')],
     stage('office',[steve(300,y=600,view='front',pose='zombie',s=1.15,bob=1)],v='elev',skin='real',state='closed',dead=True,floors=[9,9],tag='REAL'),cam='static',mood='funk',
     fx=[sticker('s0+2.0','F',x=640,y=250,rot=-6,size=170,c='#ffffff',dur=1.4)],sfx=[('ding','s0+.2'),('trombone','s0+2.0')])

# ============================================================ LEVEL 2: THE STREET
beat([('game','Level two. The street.')],scene=card('level',lv=2,name='THE STREET'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex',"Day two. A hundred zombies on the road, and your <r>car is dead</r>.")],
     stage('street',[dex(x=420,y=600,pose='finger',expr='up',s=1.15),prop('crate',100,600,s=0.01),hz(9,780,1180,y=585,s=.7,to=-40)],time='dusk',tag='REAL',horde=False),cam='hand',mood='tense')
beat([('dex','They are slow, but they are everywhere. <y>Run, or walk</y>?')],
     stage('street',[dex(view='side',pose='stand',x=360,y=600,s=1.15,expr='stare'),hz(10,680,1220,y=588,s=.72,to=-30)],time='dusk',tag='REAL',horde=False),cam='push_in',mood='tense')
beat([('dex','A, sprint like a hero. B, walk like a <y>boring person</y>.')],
     scene=card('ab',a=dict(t='SPRINT',icon='sprint'),b=dict(t='WALK',icon='walk'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.6'),('tick','s0+2.1'),('tick','s0+2.6')])
beat([('dex','Game brain sprints. Stamina bar? <y>Infinite</y>.')],
     stage('street',[dex(view='side',anim='run',x=200,y=610,s=1.1,to=[900,610]),dog(120,y=620,s=.6,pose='walk',to=[820,620])],time='day',skin='game',tag='GAME',hud=GAME_HUD(1,2),horde=False,road=0),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18),dict(k='speed',at=.4,dur=3)],sfx=[('pop',0.0)])
beat([('dex','Legs? Also <y>infinite</y>.')],
     stage('street',[dex(view='side',anim='run',x=420,y=610,s=1.3,to=[760,610]),dog(220,y=620,s=.7,pose='walk',to=[620,620])],time='day',skin='game',tag='GAME',hud=GAME_HUD(1,2),horde=False,road=40),skin='game',cam='dolly',mood='chip',
     fx=[dict(k='speed',at=0,dur=3)],sfx=[('whoosh',0.0)])
beat([('dex','Sprinting means shouting. Every zombie in town <r>just heard you</r>.')],
     stage('street',[dex(view='side',anim='run',x=300,y=610,s=1.1,to=[560,610]),hz(5,880,1220,y=590,s=.9,to=-300),hz(4,-120,160,y=590,s=.9,to=300,flip=True)],time='day',skin='game',tag='GAME',hud=GAME_HUD(1,2),horde=False),skin='game',cam='static',mood='chip',
     fx=[dict(k='redvig',at='s0+1.2',dur=3),shake('s0+2.2',6,.4)],sfx=[('alarm','s0+1.2')])
beat([('game','You died. Again.')],
     stage('street',[dex(view='front',pose='panic',expr='shock',x=640,y=700,s=1.2,talk=False)],time='day',skin='game',tag='GAME',hud=GAME_HUD(2,2),horde=False),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=2)],sfx=[('trombone',.2)],dur=3.0)
beat([('dex','In real life, there is no <y>stamina bar</y>.')],
     stage('street',[dex(view='side',anim='run',x=200,y=610,s=1.1,to=[560,610],expr='cool'),hz(7,880,1220,y=588,s=.7,to=-120)],time='dusk',tag='REAL',horde=False),cam='hand',mood='tense',
     fx=[dict(k='vhs',at=0,dur=.8)],sfx=[('rewind',0.0)])
beat([('dex',"After four hundred meters, you're <y>done</y>.")],
     stage('street',[dex(view='side',anim='run',x=520,y=610,s=1.1,to=[760,610],expr='tired'),hz(7,880,1220,y=588,s=.7,to=-120)],time='dusk',tag='REAL',horde=False),cam='hand',mood='tense',
     fx=[sticker('s0+1.0',ic='sweat',x=780,y=250,rot=12,s=.9,dur=1.4)])
beat([('dex','And wheezing like a <y>broken vacuum cleaner</y> is not exactly stealth.')],
     stage('street',[dex(view='front',pose='shrug',expr='tired',x=520,y=680,s=1.2,shades=0),hz(8,820,1200,y=588,s=.8,to=-160)],time='dusk',tag='REAL',horde=False),cam='push_in',mood='tense',
     fx=[sticker('s0+1.6','HUFF',x=860,y=210,rot=-8,size=110,c='#ffd23a',dur=1.2),sticker('s0+2.3','PUFF',x=980,y=300,rot=6,size=90,c='#ffffff',dur=1.0)])
beat([('dex','Choice B: <y>walk</y>. Steady, quiet, along the wall.')],
     stage('street',[dex(view='side',anim='walk',x=100,y=590,s=1.05,to=[560,590],expr='cool'),hz(8,820,1200,y=520,s=.55,to=-60)],time='dusk',tag='REAL',v='edge',horde=False),cam='pan_r',mood='tense')
beat([('dex','Zombies hunt <y>noise and motion</y>. Be the most boring thing on the street.')],
     stage('street',[dex(view='side',anim='walk',x=250,y=590,s=1.05,to=[620,590],expr='cool'),hz(9,330,1000,y=520,s=.6,to=140)],time='dusk',tag='REAL',v='edge',horde=False),cam='hand',mood='tense',
     fx=[dict(k='ring',at='s0+2.0',x=450,y=340,rx=70,ry=110,txt='BORING',tx=470,ty=110,c='#7dffb0')])
beat([('dex','Walking, you can go for <y>hours</y>. Sprinting? About two minutes.')],
     stage('street',[dex(view='front',pose='finger',expr='smug',x=640,y=700,s=1.35)],time='dusk',tag='REAL',horde=False),cam='push_in',mood='funk')
beat([('dex','Sprint: two minutes. Walk: <y>all night</y>.')],
     scene=card('stat',title='HOW LONG YOU LAST',a=dict(l='SPRINT',v=2,suf=' MIN',sub=''),b=dict(l='WALK',v=300,suf=' MIN+',sub='')),cam='static',mood='funk',sfx=[('tick',.4),('ding',1.6)])
beat([('dex','Rule two: <y>be boring</y>.')],
     scene=card('rule',n=2,t1='BE BORING.',t2='BORING SURVIVES.',icon='walk'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve sprinted. Steve fell over. <y>Steve is fine</y>.')],
     stage('street',[steve(220,y=610,view='side',pose='zwalk',anim='zwalk',s=1.15,to=[720,610],fall=dict(at=1.9,dur=.4,rot=88,dy=20,dx=40))],time='dusk',tag='REAL',horde=False),cam='hand',mood='funk',
     fx=[sticker('s0+2.0','SKILL ISSUE',x=700,y=210,rot=-7,size=96,c='#ffffff',dur=1.8)],sfx=[('thud','s0+2.3')])

# ============================================================ LEVEL 3: THE HIDEOUT
beat([('game','Level three. The hideout.')],scene=card('level',lv=3,name='THE HIDEOUT'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex','Day three. An empty apartment. <y>Time to hide</y>.')],
     stage('home',[dex(view='front',pose='finger',expr='up',x=830,y=600,s=1.15)],v='closet',time='day',tag='REAL'),cam='hand',mood='tense')
beat([('dex','There is a closet right there. And a room with <y>two exits</y>.')],
     stage('home',[dex(view='front',pose='shrug',expr='smug',x=640,y=720,s=1.35)],v='two',time='day',tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+2.0',x=170,y=400,rx=90,ry=170,txt='EXIT',tx=250,ty=130,c='#7dffb0'),dict(k='ring',at='s0+2.5',x=1110,y=400,rx=90,ry=170,txt='EXIT',tx=1030,ty=130,c='#7dffb0')])
beat([('dex','Closet, or the room with two exits?')],
     scene=card('ab',a=dict(t='CLOSET',icon='closet'),b=dict(t='TWO EXITS',icon='doors'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.0'),('tick','s0+1.5'),('tick','s0+2.0')])
beat([('dex','Game brain loves closets. In games, enemies <y>never open them</y>.')],
     stage('home',[dex(view='front',pose='stand',expr='cool',x=640,y=700,s=1.1,talk=False)],v='closet',closet='open',time='day',skin='game',tag='GAME',hud=dict(deaths=2,lv=3,hp=.9)),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18),dict(k='counter',at=1.2,x=1000,y=190,txt='STEALTH: 100%',size=40,c='#7dffb0',dur=2.5,rise=0)],sfx=[('pop',0.0)])
beat([('dex','So you hide. And the zombie opens the door.')],
     stage('home',[dex(view='front',pose='stand',expr='shock',x=330,y=700,s=.0001,talk=False),steve(1120,y=600,view='side',pose='zwalk',anim='zwalk',s=1.1,flip=1,to=[480,600])],v='closet',closet='closed',time='day',skin='game',tag='GAME',hud=dict(deaths=2,lv=3,hp=.9)),skin='game',cam='static',mood='chip',
     fx=[shake('e-.5',6,.4)],sfx=[('footsteps','s0'),('doorslam','e-.4')])
beat([('game','You died. Continue? Nine. Eight. Seven.')],
     stage('home',[steve(330,y=600,view='front',pose='zombie',s=1.2)],v='closet',closet='open',time='day',skin='game',tag='GAME',hud=dict(deaths=3,lv=3,hp=0)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=3)],sfx=[('trombone',.2)],dur=4.6)
beat([('dex',"Real zombies don't read the rules. If they hear you, they <r>check everywhere</r>.")],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='finger',expr='shock')]),cam='dolly',mood='funk',
     fx=[dict(k='vhs',at=0,dur=.8),sticker('e-1.3','NOPE',x=1000,y=210,rot=8,size=130,c='#ff5a4a',dur=1.2)],sfx=[('rewind',0.0)])
beat([('dex','A closet is a <r>coffin with a door</r>. One way in, one way out, and they are standing in it.')],
     stage('home',[dex(view='front',pose='cross',expr='worried',x=330,y=700,s=1.1,talk=False,shades=0)],v='closet',closet='open',time='night',tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='redvig',at=1.5,dur=6)])
beat([('dex','Choice B: <y>two exits</y>. Zombie comes in one door, you go out the other.')],
     stage('home',[dex(view='side',anim='walk',x=520,y=600,s=1.05,to=[1050,600],expr='cool'),steve(100,y=600,view='side',pose='zwalk',anim='zwalk',s=1.05,to=[420,600])],v='two',time='day',tag='REAL'),cam='hand',mood='tense')
beat([('dex','Stay quiet, stay near the exits, and <y>listen</y>. Sound is your radar.')],
     stage('home',[dex(view='front',pose='stand',expr='stare',x=640,y=690,s=1.3,talk=False,look=3)],v='two',time='night',tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+1.8',x=720,y=280,rx=44,ry=56,txt='LISTEN',tx=860,ty=170,c='#ffd23a')])
beat([('dex','Hide where you can <y>leave</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.55,pose='finger',expr='cool')]),cam='dolly',mood='funk')
beat([('dex','If you cannot leave, you are not hiding. You are <r>waiting</r>.')],
     stage('studio',[dex(x=420,y=720,s=1.5,pose='shrug',expr='smug')]),cam='static',mood='funk',
     fx=[sticker('s0+2.4','WAITING...',x=900,y=330,rot=-5,size=90,c='#ffffff',dur=1.8)])
beat([('dex','Closet: <r>trapped</r>. Two exits: <y>alive</y>.')],
     scene=card('ab',a=dict(t='CLOSET',icon='closet',res='cross'),b=dict(t='TWO EXITS',icon='doors',res='check'),pick='b'),cam='static',mood='funk',sfx=[('buzz','s0+.7'),('ding','s0+1.7')])
beat([('dex','Rule three: <y>never hide</y> where you cannot leave.')],
     scene=card('rule',n=3,t1='NEVER HIDE WHERE',t2='YOU CANNOT LEAVE',icon='doors'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve is also hiding. Behind a <y>plant</y>. It is not working.')],
     stage('home',[steve(640,y=610,view='front',pose='zombie',s=1.25,bob=1),prop('plant',640,616,s=1.0)],v='two',time='day',tag='REAL'),cam='static',mood='funk',
     fx=[dict(k='ring',at='s0+2.2',x=640,y=380,rx=120,ry=210,txt='STEVE',tx=900,ty=190,c='#7dffb0')])

# ============================================================ LEVEL 4: THE FIGHT
beat([('game','Level four. The fight.')],scene=card('level',lv=4,name='THE FIGHT'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex','Day four. Six zombies, one doorway, and <y>one baseball bat</y>.')],
     stage('hall',[dex(view='side',pose='hold2',expr='angry',x=500,y=600,s=1.1,shades=0,held=dict(t='bat',ox=70,oy=-250,rot=14,s=1))],door='open',n=6,hto=-30,tag='REAL'),cam='hand',mood='tense')
beat([('dex','Every game says: fight them. Swing the bat. <y>Be the hero</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='cheer',expr='smug')]),cam='push_in',mood='funk')
beat([('dex','A, swing the bat. B, <y>close the door</y>.')],
     scene=card('ab',a=dict(t='SWING THE BAT',icon='bat'),b=dict(t='CLOSE THE DOOR',icon='doorclose'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.4'),('tick','s0+1.9'),('tick','s0+2.4')])
beat([('dex','Game brain swings. Combo times <y>five</y>.')],
     stage('hall',[dex(view='side',pose='hold2',expr='angry',x=470,y=600,s=1.1,shades=0,held=dict(t='bat',ox=70,oy=-250,rot=30,s=1))],door='open',n=6,hto=-10,skin='game',tag='GAME',hud=dict(deaths=3,lv=4,hp=1)),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18),dict(k='counter',at=1.0,x=980,y=200,txt='COMBO x5!',size=64,c='#ffd23a',dur=1.8),shake(1.0,6,.3)],sfx=[('pop',0.0),('hit',1.0),('hit',1.5),('hit',2.0)])
beat([('dex','Health <y>regenerates</y>. You are a legend.')],
     stage('hall',[dex(view='side',pose='hold2',expr='smug',x=470,y=600,s=1.15,shades=1,held=dict(t='bat',ox=70,oy=-250,rot=-14,s=1))],door='open',n=0,horde=False,skin='game',tag='GAME',hud=dict(deaths=3,lv=4,hp=1)),skin='game',cam='push_in',mood='chip',
     fx=[sticker('s0+1.7','LEGEND',x=860,y=230,rot=-6,size=104,c='#ffd23a',dur=1.8)],sfx=[('coin','s0+1.7')])
beat([('dex','Then the bat <r>breaks</r>, and nobody hands you a new one.')],
     stage('hall',[dex(view='side',pose='hold2',expr='shock',x=470,y=600,s=1.1,shades=0),hz(4,560,780,y=592,s=1.0,to=-60)],door='open',n=8,skin='game',tag='GAME',hud=dict(deaths=3,lv=4,hp=.25)),skin='game',cam='static',mood='chip',
     fx=[dict(k='popup',at='s0+1.4',x=800,y=290,title='Warning',msg='Your weapon broke.',btn='OK',w=440,h=210,dur=2.4),shake('s0+1.4',8,.4)],sfx=[('crack','s0+1.4')])
beat([('game','You died.')],
     stage('hall',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.25,talk=False)],door='open',n=10,skin='game',tag='GAME',hud=dict(deaths=4,lv=4,hp=0)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=4)],sfx=[('trombone',.2)],dur=3.0)
beat([('dex','Real fights have no health bar, no combo meter, and a bat is <y>just a stick</y>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='shrug',expr='tired')]),cam='static',mood='funk',
     fx=[dict(k='vhs',at=0,dur=.8)],sfx=[('rewind',0.0)])
beat([('dex','Six against one is not a fight. It is a <r>math problem</r>, and you lose.')],
     stage('hall',[dex(view='side',pose='hold2',expr='shock',x=520,y=600,s=1.1,shades=0,held=dict(t='bat',ox=70,oy=-250,rot=-20,s=1)),hz(5,640,860,y=594,s=1.0,to=-110)],door='open',n=9,hto=-90,tag='REAL'),cam='hand',mood='tense',
     fx=[dict(k='redvig',at='s0+1.4',dur=3)])
beat([('dex','Choice B: <y>close the door</y>. Lock it, wedge it, put a chair under the handle.')],
     stage('hall',[dex(view='side',pose='stand',x=520,y=600,s=1.1,expr='angry',shades=0),prop('chair',700,600,s=1.1)],door='closing',n=6,hto=-30,bang=True,tag='REAL'),cam='hand',mood='tense',
     fx=[shake('s0+.9',8,.3)],sfx=[('doorslam','s0+.9'),('bang','s0+2.0'),('bang','s0+2.6')])
beat([('dex','If one gets close, use something <y>long</y>: a pole, a broom, a mop.')],
     stage('hall',[dex(view='side',pose='point',expr='angry',x=470,y=600,s=1.1,shades=0,held=dict(t='broom',ox=104,oy=-262,rot=80,s=.9)),hz(1,760,760,y=594,s=1.0,to=-110)],door='open',n=1,hto=0,horde=False,tag='REAL'),cam='push_in',mood='tense')
beat([('dex','Distance is <y>armor</y>.')],
     stage('hall',[dex(view='side',pose='point',expr='cool',x=420,y=600,s=1.1,shades=0,held=dict(t='broom',ox=104,oy=-262,rot=80,s=.9)),hz(1,860,860,y=594,s=1.0)],door='open',n=1,horde=False,tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+.8',x=700,y=430,rx=220,ry=60,txt='2 METERS',tx=700,ty=330,c='#7dffb0')])
beat([('dex','At a doorway, they come <y>one at a time</y>. But walking away is better.')],
     stage('hall',[dex(view='side',anim='walk',x=700,y=600,s=1.1,to=[280,600],flip=True,shades=0,expr='cool')],door='closed',n=6,bang=True,tag='REAL'),cam='pan_l',mood='tense',sfx=[('bang','s0+.5'),('bang','s0+1.5')])
beat([('dex','Rule four: the best fight is the <y>door you close</y>.')],
     scene=card('rule',n=4,t1='THE BEST FIGHT IS',t2='THE DOOR YOU CLOSE',icon='doorclose'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve does not fight. Steve <y>knocks</y>. Politely.')],
     stage('hall',[steve(640,y=594,view='front',pose='wave',s=1.1)],door='open',n=1,horde=False,tag='REAL'),cam='push_in',mood='funk',
     fx=[sticker('s0+1.6','KNOCK KNOCK',x=640,y=180,rot=-4,size=80,c='#ffffff',dur=1.6)],sfx=[('knock','s0+1.6'),('knock','s0+2.0')])

# ============================================================ LEVEL 5: THE LOOT
beat([('game','Level five. The loot.')],scene=card('level',lv=5,name='THE LOOT'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex','Day five. A supermarket. <y>Untouched</y>. Every shelf is full.')],
     stage('market',[dex(view='front',pose='cheer',expr='smile',x=640,y=600,s=1.15)],tag='REAL'),cam='push_in',mood='tense')
beat([('dex','Games say: take everything. Your bag has <y>ninety-nine slots</y>.')],
     stage('market',[dex(view='front',pose='hips',expr='smug',x=640,y=600,s=1.15)],tag='REAL'),cam='static',mood='tense',
     fx=[sticker('s0+1.8','99',x=980,y=210,rot=8,size=150,c='#ffd23a',dur=1.5)])
beat([('dex','A, grab everything. B, carry <y>ten kilos</y>.')],
     scene=card('ab',a=dict(t='GRAB ALL',icon='loot'),b=dict(t='TEN KILOS',icon='bag'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.5'),('tick','s0+2.0'),('tick','s0+2.5')])
beat([('dex','Game brain fills every slot. Weight? <y>Infinite</y>. Backpack? Magic.')],
     scene=card('inventory',fill=2.6),skin='game',cam='static',mood='chip',sfx=[('pop',0.0),('coin','s0+.8'),('coin','s0+1.1'),('coin','s0+1.4'),('coin','s0+1.7'),('coin','s0+2.0')],
     fx=[dict(k='glitch',at=0,dur=.18)])
beat([('dex','Congratulations, you are carrying a whole supermarket. And you are <r>slower than Steve</r>.')],
     stage('market',[dex(view='side',anim='walk',x=200,y=600,s=1.1,to=[700,600],expr='tired',spd=1.7,prop=None),prop('bagfat',590,600,s=.9,to=[770,600])],skin='game',tag='GAME',hud=dict(deaths=4,lv=5,hp=.8)),skin='game',cam='static',mood='chip',
     fx=[dict(k='counter',at=.8,x=980,y=190,txt='SPEED -90%',size=50,c='#ff6a5a',dur=2.4,rise=0)],sfx=[('wheeze','s0+.4')])
beat([('game','You were overencumbered. You died.')],
     stage('market',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.25,talk=False),prop('bagfat',440,640,s=1.1)],skin='game',tag='GAME',hud=dict(deaths=5,lv=5,hp=0)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=5)],sfx=[('trombone',.2)],dur=3.4)
beat([('dex','In real life, a liter of water weighs a kilo. At twenty-four kilos, you <r>cannot run</r>.')],
     scene=card('scale',**{'from':2,'to':24,'fill':3.0,'title':'REAL LIFE: BACKPACK'}),cam='static',mood='tense',fx=[dict(k='vhs',at=0,dur=.7)],sfx=[('rewind',0.0),('tick','s0+1.2'),('tick','s0+1.6'),('tick','s0+2.0'),('buzz','e-1.0')])
beat([('dex','Cans clank. Bags tear. Every step is <r>loud</r>.')],
     stage('market',[dex(view='side',anim='walk',x=200,y=600,s=1.1,to=[760,600],expr='tired',spd=1.7),prop('bagfat',200,600,s=.8,to=[760,600])],tag='REAL'),cam='hand',mood='tense',
     fx=[sticker('s0+1.3','CLANK',x=320,y=220,rot=-8,size=110,c='#ffd23a',dur=1.0),sticker('s0+2.0','CLANK',x=860,y=250,rot=8,size=110,c='#ffffff',dur=1.0)],sfx=[('clank','s0+1.3'),('clank','s0+2.0')])
beat([('dex','Choice B: ten kilos. <y>Water, food, light, first aid, charger</y>.')],
     scene=card('list',title='THE FIVE THINGS',items=[dict(icon='water',l='WATER'),dict(icon='food',l='FOOD'),dict(icon='lamp',l='LIGHT'),dict(icon='aid',l='FIRST AID'),dict(icon='battery',l='CHARGER')]),cam='static',mood='funk',sfx=[('pop','s0+1.3'),('pop','s0+1.7'),('pop','s0+2.1'),('pop','s0+2.5'),('pop','s0+2.9')])
beat([('dex','Pick light things that keep you alive. <y>Leave the television</y>.')],
     stage('market',[dex(view='front',pose='finger',expr='smug',x=700,y=600,s=1.15),prop('tv',330,600,s=1.3)],tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+2.2',x=330,y=530,rx=110,ry=90,txt='NO',tx=330,ty=250,c='#ff3a2a')])
beat([('dex','Ten kilos. You can walk all day, and you can still <y>run when you must</y>.')],
     stage('market',[dex(view='side',anim='walk',x=100,y=600,s=1.1,to=[900,600],expr='cool',spd=3.2),prop('backpack',520,600,s=.0001)],tag='REAL'),cam='hand',mood='tense')
beat([('dex','Rule five: <y>weight is a zombie</y> too.')],
     scene=card('rule',n=5,t1='WEIGHT IS',t2='A ZOMBIE TOO',icon='bag'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve took the television. Steve <y>does not have electricity</y>.')],
     stage('market',[steve(300,y=610,view='side',pose='zwalk',anim='zwalk',s=1.15,to=[860,610]),prop('tv',420,600,s=1.2,to=[980,600])],tag='REAL'),cam='hand',mood='funk',
     fx=[sticker('s0+2.2','WHY',x=660,y=210,rot=-6,size=140,c='#ffd23a',dur=1.4)])

# ============================================================ LEVEL 6: THE NIGHT
beat([('game','Level six. The night.')],scene=card('level',lv=6,name='THE NIGHT'),cam='static',mood='calm',sfx=[('levelup',0.0)])
beat([('dex',"Day six. Night falls, and I have not slept in <y>two days</y>.")],
     stage('loft',[dex(view='front',pose='stand',expr='tired',x=640,y=600,s=1.15,shades=0),dog(980,y=605,s=.8,pose='lie')],tag='REAL',cans=False),cam='push_in',mood='calm')
beat([('dex','Games have save points. Lie down, press a button, and <y>everything is safe</y>.')],
     stage('hall',[dex(view='side',pose='stand',x=470,y=600,s=1.1,expr='smile',shades=1),prop('lamp',900,520,s=.0001)],door='open',horde=False,skin='game',tag='GAME',hud=dict(deaths=5,lv=6,hp=.5)),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18),dict(k='sticker',at='s0+1.8',txt='SAVE POINT',x=860,y=230,rot=-6,size=84,c='#7dffb0',dur=1.6)],sfx=[('pop',0.0),('coin','s0+1.8')])
beat([('dex','A, sleep anywhere. B, <y>sleep smart</y>.')],
     scene=card('ab',a=dict(t='SLEEP ANYWHERE',icon='bed'),b=dict(t='SLEEP SMART',icon='cans'),timer=True),cam='static',mood='calm',sfx=[('tick','s0+1.0'),('tick','s0+1.5'),('tick','s0+2.0')])
beat([('dex','Game brain sleeps on the street. Health refills by morning. <y>Probably</y>.')],
     stage('street',[dex(view='front',pose='stand',expr='tired',x=640,y=700,s=.0001,talk=False),prop('bed',640,596,s=.0001)],time='night',skin='game',tag='GAME',hud=dict(deaths=5,lv=6,hp=.5)),skin='game',cam='static',mood='chip',
     fx=[sticker('s0+1.0',ic=None,txt='ZZZ',x=640,y=260,rot=-6,size=140,c='#9ff2ff',dur=3.0)],sfx=[('zzz','s0+.4')])
beat([('game','You died in your sleep.')],
     stage('street',[hz(6,300,980,y=590,s=1.0,to=40)],time='night',skin='game',tag='GAME',hud=dict(deaths=6,lv=6,hp=0)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=6)],sfx=[('trombone',.2)],dur=3.2)
beat([('dex','Real sleep is not a save point. It is the <r>most dangerous</r> eight hours of your life.')],
     stage('loft',[dex(view='front',pose='stand',expr='tired',x=640,y=600,s=1.15,shades=0),dog(980,y=605,s=.8,pose='lie')],tag='REAL',cans=False),cam='push_in',mood='calm',
     fx=[dict(k='vhs',at=0,dur=.7)],sfx=[('rewind',0.0)])
beat([('maya','Dad? Did you sleep yet?'),('dex','Working on it, kiddo.')],
     stage('loft',[dex(view='front',pose='stand',expr='smile',x=640,y=600,s=1.15,shades=0),dog(980,y=605,s=.8,pose='lie')],tag='REAL',cans=False),cam='static',mood='calm',
     fx=[dict(k='pip',at=.05,who='maya',dur='e-0.3')],sfx=[('radio',0.0),('radio','s1-.1')])
beat([('dex','Choice B: sleep smart. <y>Two exits</y>, so you can always leave.')],
     stage('loft',[dex(view='side',pose='stand',x=640,y=600,s=1.1,shades=0,expr='cool')],tag='REAL',cans=False),cam='pan_r',mood='calm',
     fx=[dict(k='ring',at='s0+1.6',x=225,y=420,rx=90,ry=170,txt='EXIT 1',tx=330,ty=150,c='#7dffb0'),dict(k='ring',at='s0+2.4',x=1141,y=410,rx=80,ry=170,txt='EXIT 2',tx=1000,ty=150,c='#7dffb0')])
beat([('dex','A string of tin cans across the door.')],
     stage('loft',[dex(view='side',pose='stand',x=700,y=600,s=1.1,shades=0,expr='smile',flip=True)],tag='REAL',cans=True),cam='push_in',mood='calm',
     fx=[dict(k='ring',at='s0+1.8',x=340,y=540,rx=210,ry=50,txt='ALARM',tx=340,ty=420,c='#ffd23a')])
beat([('dex','Cheap, loud, and it <y>never falls asleep</y>.')],
     stage('loft',[dex(view='side',pose='stand',x=800,y=600,s=1.1,shades=0,expr='smile',flip=True)],tag='REAL',cans=True),cam='dolly',mood='calm',
     fx=[dict(k='ring',at='s0+.4',x=340,y=540,rx=210,ry=50,txt='ALARM',tx=340,ty=420,c='#ffd23a')])
beat([('dex','And a dog on watch. Respawn is on duty, and he works for <y>snacks</y>.')],
     stage('loft',[dex(view='side',pose='stand',x=450,y=600,s=1.1,shades=0,expr='tired'),dog(900,y=610,s=.85,pose='sit',tongue=True)],tag='REAL',cans=True),cam='static',mood='calm',
     fx=[sticker('s0+2.8','GOOD BOY',x=900,y=250,rot=-6,size=96,c='#7dffb0',dur=1.8)])
beat([('dex','Cans rattle. Dog barks. You are awake, and <y>already leaving</y>.')],
     stage('loft',[dex(view='side',anim='run',x=620,y=600,s=1.1,to=[1130,590],shades=0),dog(850,y=610,s=.85,pose='walk',to=[1060,610],tongue=True)],tag='REAL',cans=True),cam='hand',mood='tense',
     fx=[shake('s0+.2',6,.5),sticker('s0+.2','BARK',x=560,y=230,rot=-8,size=110,c='#ffd23a',dur=1.2)],sfx=[('cans','s0+.2'),('bark','s0+.3'),('bark','s0+.8')])
beat([('dex','Short naps, two exits, one alarm. <y>Sleep in pieces</y>.')],
     stage('loft',[dex(view='front',pose='stand',expr='smile',x=640,y=600,s=1.15,shades=0),dog(980,y=605,s=.8,pose='lie')],tag='REAL',cans=True),cam='push_in',mood='calm')
beat([('dex','Rule six: sleep with an <y>alarm</y> and an <y>exit</y>.')],
     scene=card('rule',n=6,t1='SLEEP WITH AN ALARM',t2='AND AN EXIT',icon='cans'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','We tested the alarm on Steve. <y>It works</y>.')],
     stage('loft',[steve(300,y=600,view='side',pose='zwalk',anim='zwalk',s=1.1,to=[560,600])],tag='REAL',cans=True),cam='static',mood='funk',
     fx=[shake('s0+1.5',8,.5),sticker('s0+1.8','10/10',x=700,y=230,rot=-8,size=140,c='#7dffb0',dur=1.6)],sfx=[('cans','s0+1.5')])

# ============================================================ LEVEL 7: THE ROAD
beat([('game','Level seven. The road.')],scene=card('level',lv=7,name='THE ROAD'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex','Day seven. The highway runs straight to the harbor. It is also a <r>parking lot</r>.')],
     stage('highway',[dex(view='side',pose='stand',x=300,y=600,s=1.2,expr='stare',shades=0)],tag='REAL'),cam='push_in',mood='tense')
beat([('dex','A, the highway. B, the <y>railway</y>.')],
     scene=card('ab',a=dict(t='THE HIGHWAY',icon='jam'),b=dict(t='THE RAILWAY',icon='rail'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.0'),('tick','s0+1.5'),('tick','s0+2.0')])
beat([('dex','Game brain follows the <y>glowing line</y> on the minimap. Straight down the highway. Easy.')],
     stage('highway',[dex(view='side',anim='run',x=100,y=620,s=1.1,to=[800,620],shades=1)],skin='game',tag='GAME',hud=dict(deaths=6,lv=7,hp=.9)),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18),dict(k='counter',at=.8,x=1000,y=190,txt='MINIMAP: ON',size=40,c='#7dffb0',dur=2.8,rise=0)],sfx=[('pop',0.0)])
beat([('dex','A thousand cars. A thousand hiding places.')],
     stage('highway',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.3,talk=False)],n=14,skin='game',tag='GAME',hud=dict(deaths=6,lv=7,hp=.4)),skin='game',cam='static',mood='chip',
     fx=[dict(k='redvig',at=.4,dur=3),shake(.4,8,.5)],sfx=[('alarm',.3)])
beat([('dex','And <r>every alarm</r> goes off.')],
     stage('highway',[dex(view='front',pose='panic',expr='shock',x=640,y=720,s=1.3,talk=False),hz(6,200,1080,y=600,s=1.0,to=40)],n=14,skin='game',tag='GAME',hud=dict(deaths=6,lv=7,hp=.3)),skin='game',cam='static',mood='chip',
     fx=[dict(k='redvig',at=0,dur=3),shake(0,9,.7)],sfx=[('alarm',0.0)])
beat([('game','You died. Again.')],
     stage('highway',[hz(7,300,980,y=600,s=1.0,to=30)],skin='game',tag='GAME',hud=dict(deaths=7,lv=7,hp=0)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=7)],sfx=[('trombone',.2)],dur=3.0)
beat([('dex','Real highways are traffic jams with <r>teeth</r>. Zombies hide behind every bumper.')],
     stage('highway',[dex(view='side',anim='walk',x=100,y=600,s=1.15,to=[560,600],expr='worried',shades=0),hz(8,640,1160,y=602,s=.95,to=-90)],n=14,tag='REAL'),cam='hand',mood='tense',
     fx=[dict(k='vhs',at=0,dur=.7),dict(k='redvig',at='s0+1.5',dur=3)],sfx=[('rewind',0.0)])
beat([('dex','Choice B: the <y>railway</y>.')],
     stage('rail',[dex(view='side',anim='walk',x=200,y=600,s=1.1,to=[640,600],expr='cool')],tag='REAL'),cam='pan_r',mood='tense')
beat([('dex','Open ground. Long sight lines. <y>Nothing to hide behind</y>.')],
     stage('rail',[dex(view='side',anim='walk',x=640,y=600,s=1.1,to=[900,600],expr='cool')],tag='REAL'),cam='drift',mood='tense')
beat([('dex','At night: no flashlight. <y>Light is a loudspeaker</y>. Let your eyes adjust.')],
     stage('rail',[dex(view='side',pose='stand',x=520,y=600,s=1.1,expr='cool'),prop('flash',620,596,s=.9,rot=0)],tag='REAL'),cam='push_in',mood='tense',
     fx=[dict(k='ring',at='s0+1.8',x=620,y=560,rx=50,ry=40,txt='OFF',tx=700,ty=420,c='#ff3a2a')])
beat([('dex','Follow the rails. They go where you are going, and <y>nobody parks on them</y>.')],
     stage('rail',[dex(view='side',anim='walk',x=120,y=600,s=1.1,to=[820,600],expr='smile'),dog(40,y=610,s=.65,pose='walk',to=[740,610])],tag='REAL'),cam='hand',mood='tense')
beat([('dex','The railway is longer. But <y>longer and alive</y> beats shorter and bitten.')],
     stage('studio',[dex(x=640,y=720,s=1.55,pose='thumb',expr='smug')]),cam='dolly',mood='funk')
beat([('dex','Rule seven: <y>light is a loudspeaker</y>.')],
     scene=card('rule',n=7,t1='LIGHT IS',t2='A LOUDSPEAKER',icon='lamp'),cam='static',mood='funk',sfx=[('stamp',0.0)])
beat([('dex','Steve found a flashlight. <y>Steve turned it on</y>. Steve was very visible.')],
     stage('rail',[steve(300,y=600,view='side',pose='zwalk',anim='zwalk',s=1.15,to=[740,600]),prop('flash',420,596,s=.9,to=[860,596])],tag='REAL'),cam='static',mood='funk',
     fx=[sticker('s0+2.4','LOOK AT ME',x=800,y=220,rot=7,size=100,c='#ffd23a',dur=1.6)])

# ============================================================ LEVEL 8: THE RESCUE
beat([('game','Level eight. The rescue.')],scene=card('level',lv=8,name='THE RESCUE'),cam='static',mood='chip',sfx=[('levelup',0.0)])
beat([('dex','Day eight. A <y>helicopter</y>! It is circling the city, and it can see me.')],
     stage('roof',[dex(view='front',pose='wave',expr='smile',x=440,y=600,s=1.15)],tag='REAL',heli=dict(from_=[1100,170],to=[860,210],s=1.0)),cam='hand',mood='tense',
     fx=[sticker('s0+1.0','!',x=800,y=170,rot=-8,size=180,c='#ffd23a',dur=1.2)],sfx=[('heli',0.0)])
beat([('dex','A, wait on the <y>roof</y>. B, run to the <y>dock</y>.')],
     scene=card('ab',a=dict(t='THE ROOFTOP',icon='heli'),b=dict(t='THE DOCK',icon='boat'),timer=True),cam='static',mood='funk',sfx=[('tick','s0+1.2'),('tick','s0+1.7'),('tick','s0+2.2')])
beat([('dex','Game brain waits on the <y>roof</y>.')],
     stage('roof',[dex(view='side',pose='stand',expr='smile',x=520,y=600,s=1.1)],skin='game',tag='GAME',hud=dict(deaths=7,lv=8,hp=.9),heli=dict(from_=[1100,170],to=[700,180],s=1.0)),skin='game',cam='static',mood='chip',
     fx=[dict(k='glitch',at=0,dur=.18)],sfx=[('pop',0.0),('heli',.3)])
beat([('dex','In games, the helicopter <y>always lands</y> at the last second.')],
     stage('roof',[dex(view='side',pose='wave',expr='smile',x=520,y=600,s=1.1)],skin='game',tag='GAME',hud=dict(deaths=7,lv=8,hp=.9),heli=dict(from_=[700,180],to=[640,330],s=1.15)),skin='game',cam='push_in',mood='chip',sfx=[('heli',0.0)])
beat([('dex','The helicopter flies away. The <r>zombies</r> arrive instead.')],
     stage('roof',[dex(view='front',pose='panic',expr='shock',x=500,y=700,s=1.25,talk=False),hz(6,900,1240,y=590,s=1.0,to=-200)],skin='game',tag='GAME',hud=dict(deaths=7,lv=8,hp=.4),heli=dict(from_=[700,180],to=[100,60],s=.7)),skin='game',cam='static',mood='chip',
     fx=[shake('s0+1.4',7,.4)],sfx=[('heli',0.0)])
beat([('game','You died. Final death.')],
     stage('roof',[hz(7,300,980,y=600,s=1.05,to=40)],skin='game',tag='GAME',hud=dict(deaths=8,lv=8,hp=0),heli=dict(hide=True)),skin='game',cam='static',mood='none',
     fx=[dict(k='died',at=.1,n=8)],sfx=[('trombone',.2),('trombone',1.4)],dur=3.4)
beat([('dex','In real life, helicopters are rare, and they do not land in a <r>zombie city</r>.')],
     stage('studio',[dex(x=640,y=720,s=1.5,pose='shrug',expr='sad')]),cam='static',mood='funk',
     fx=[dict(k='vhs',at=0,dur=.8)],sfx=[('rewind',0.0)])
beat([('dex','It flies away. Nobody sees a <y>waving man</y> in the dark.')],
     stage('roof',[dex(view='side',pose='panic',expr='worried',x=540,y=600,s=1.1,shades=0),hz(5,1000,1240,y=592,s=1.0,to=-160)],tag='REAL',heli=dict(from_=[900,200],to=[100,60],s=.6)),cam='hand',mood='tense',
     fx=[dict(k='redvig',at='s0+1.8',dur=4)])
beat([('dex','And the stairs behind you? <r>Full</r>.')],
     stage('roof',[dex(view='side',pose='panic',expr='shock',x=520,y=600,s=1.1,shades=0),hz(6,820,1220,y=592,s=1.05,to=-200)],tag='REAL',heli=dict(hide=True)),cam='hand',mood='tense',
     fx=[dict(k='redvig',at=.2,dur=4),shake('s0+1.2',7,.5)])
beat([('dex','Choice B: go where the boats are. <y>Water is a wall</y> zombies cannot cross.')],
     stage('dock',[dex(view='side',anim='run',x=100,y=600,s=1.1,to=[700,600],shades=0),dog(40,y=610,s=.7,pose='walk',to=[620,610])],tag='REAL',boatx=1000),cam='pan_r',mood='tense')
beat([('dex','And use a <y>signal mirror</y>. A flash of sunlight can be seen for miles.')],
     stage('dock',[dex(view='side',pose='point',expr='cool',x=700,y=600,s=1.1,shades=0,held=dict(t='mirror',ox=110,oy=-258,rot=0,s=1))],tag='REAL',boatx=1000),cam='push_in',mood='tense',
     fx=[dict(k='flash',at='s0+1.8',dur=.25,a=.7),dict(k='flash',at='s0+2.4',dur=.25,a=.7)],sfx=[('ding','s0+1.8'),('ding','s0+2.4')])
beat([('dex','Zombies cannot swim. <y>Steve checked</y>.')],
     stage('dock',[steve(300,y=600,view='side',pose='zwalk',anim='zwalk',s=1.15,to=[640,600],fall=dict(at=2.0,dur=.6,rot=80,dy=140,dx=120))],tag='REAL',boatx=1000),cam='static',mood='funk',
     fx=[sticker('s0+2.3','SPLASH',x=800,y=260,rot=-6,size=110,c='#6ad0ff',dur=1.4)],sfx=[('splash','s0+2.5')])
beat([('dex','A boat. A real one. With someone on the deck, <y>waving</y>.')],
     stage('dock',[dex(view='side',pose='stand',expr='shock',x=520,y=600,s=1.1,shades=0)],tag='REAL',boatx=880),cam='push_in',mood='warm',
     fx=[dict(k='zoom',at='e-1.0',to=1.18,cx=900,cy=400,dur=1.0)])
beat([('dex','Rule eight: <y>water is the wall</y>.')],
     scene=card('rule',n=8,t1='WATER IS',t2='THE WALL',icon='water'),cam='static',mood='funk',sfx=[('stamp',0.0)])

# ============================================================ FINALE
beat([('maya','Dad! You are late!')],
     stage('dock',[dex(view='side',pose='stand',expr='smile',x=560,y=600,s=1.1,shades=0,talk=False),dict(k='maya',view='front',pose='wave',expr='smile',x=860,y=455,s=.5,talk=False,bob=0)],tag=None,boatx=880),cam='push_in',mood='warm',
     fx=[sticker('s0+.2','DAD!',x=880,y=230,rot=-6,size=100,c='#ffd23a',dur=1.4)])
beat([('dex','Sorry, sweetheart! <y>Traffic</y>!')],
     stage('dock',[dex(view='side',anim='run',x=300,y=600,s=1.1,to=[640,600],shades=0,expr='smile'),dict(k='maya',view='front',pose='wave',expr='smile',x=860,y=455,s=.5,talk=False,bob=0)],tag=None,boatx=880),cam='hand',mood='warm')
beat([('maya','Did you take the stairs?'),('dex','I took the stairs.')],
     stage('dock',[dex(view='side',pose='stand',expr='smile',x=700,y=600,s=1.1,shades=0,talk=True),dict(k='maya',view='front',pose='cheer',expr='smile',x=860,y=455,s=.5,talk=False,bob=0),dog(520,y=610,s=.8,pose='stand',tongue=True)],tag=None,boatx=880),cam='drift',mood='warm',
     fx=[sticker('s1+.2',ic='heart',x=780,y=250,rot=-6,s=.9,dur=2.0)])
beat([('dex','Respawn! You made it too. Who is a <y>good boy</y>?')],
     stage('dock',[dex(view='side',pose='stand',expr='smile',x=640,y=600,s=1.1,shades=0),dog(800,y=610,s=.9,pose='stand',tongue=True)],tag=None,boatx=1050),cam='static',mood='warm')
beat([('dex','Oh, and Steve walked off the pier. <y>He cannot swim</y>.')],
     stage('dock',[steve(620,y=600,view='side',pose='zwalk',anim='zwalk',s=1.15,to=[1180,600],fall=dict(at=2.2,dur=.7,rot=90,dy=150,dx=60))],tag=None,boatx=300),cam='static',mood='funk',
     fx=[dict(k='keycap',at='s0+2.6',x=440,y=470,key='F',txt='FOR STEVE')],sfx=[('splash','s0+2.9')])
beat([('dex','Final score. Game: <r>eight deaths</r>. Real life: <y>zero</y>.')],
     scene=card('score',game=8),cam='static',mood='funk',sfx=[('tick',.5),('tick',.8),('tick',1.1),('tick',1.4),('ding',2.4)])
beat([('dex','Because in a game, you respawn. In real life, you <y>prepare</y>.')],
     stage('dock',[dex(view='front',pose='finger',expr='cool',x=640,y=700,s=1.35)],tag=None,boatx=1100),cam='dolly',mood='warm')
beat([('dex','Eight rules. Eight ways to <y>stay alive</y>.')],
     scene=card('recap',title='THE EIGHT RULES',items=['NEVER ENTER A BOX WITH ONE DOOR','BE BORING','NEVER HIDE WHERE YOU CANNOT LEAVE','THE BEST FIGHT IS THE DOOR YOU CLOSE','WEIGHT IS A ZOMBIE TOO','SLEEP WITH AN ALARM AND AN EXIT','LIGHT IS A LOUDSPEAKER','WATER IS THE WALL']),cam='static',mood='warm',dur=5.2,sfx=[('pop',.5),('pop',.95),('pop',1.4),('pop',1.85),('pop',2.3),('pop',2.75),('pop',3.2),('pop',3.65)])
beat([('dex','If you liked this, <y>subscribe</y>. If not, Steve says hello.')],
     stage('dock',[dex(view='front',pose='wave',expr='smile',x=420,y=700,s=1.3),dict(k='maya',view='front',pose='wave',expr='smile',x=860,y=455,s=.5,talk=False,bob=0)],tag=None,boatx=880),cam='push_in',mood='warm')
beat([('dex','Next time: how to survive a <y>robot uprising</y>. Game versus real life.')],
     scene=card('end'),cam='static',mood='warm',pause=1.0,dur=8.0)
