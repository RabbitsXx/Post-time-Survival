# cover shots for THE LAST BUS (one silent beat per part; clean mode hides captions / route / fx)
from buslib import *
Z=Script('COVERS','THE LAST BUS',0,10,'COVERS');BEATS=Z.BEATS;TITLE=Z.TITLE
ALLW=lambda e:{w:e for w in SEATX}
def C(shot,**k):
    sc,view=shot;return Z.beat([],sc,view=view,dur=1.0,**k)
RD=lambda x,y=655,s=.9,**k:dict(k='raider',view='front',pose='stand',expr='smug',x=x,y=y,s=s,bob=0,**k)
# 1 all of them stare
C(bus(690,crew(ex=ALLW('shock')|{'dante':'worried','walt':'sleep'},talk=False,park=dict(sweat=.8,pale=.4)),z=1.05,y=cy(1.05,330),out='city',dome='red'))
# 2 tunnel mouth, horde, the exit light
C(pov('tunnel',speed=0,horde=dict(n=12,x0=430,x1=850,s=.5)))
# 3 the chicken runs, horde behind
C(ext('station',[dict(k='benny',view='side',pose='run',anim='run',x=760,y=650,s=1.05,spd=4.8),hz(7,520,720,y=650,s=.95)],bus=False,x=700,y=362,z=1.15))
# 4 the chicken, bleeding (ketchup)
C(bus(640,crew(ex=ALLW('shock'),talk=False,skip=('benny',))+[pax('benny','scared',stand=True,x=640,stain=True,y=770)],z=1.3,y=cy(1.3,350,458),out='road',dome='red'))
# 5 Priya: sleeves up
C(bus(660,crew(ex=ALLW('worried'),talk=False,skip=('priya',))+[pax('priya','angry',stand=True,x=640,y=780,pose='finger')],z=1.35,y=cy(1.35,350,458),out='road'))
# 6 Park: sweating, shaking
C(bus(394,crew(ex={'park':'wince','vic':'shock','lena':'shock'},talk=False,park=dict(sweat=1,pale=.8,tremble=1.2,tilt=14)),z=1.9,y=cy(1.9,330),out='road',dome='red'))
# 7 the lever
C(loc('ext',[dict(k='marcus',view='side',pose='reach',x=600,y=545,s=.95),prop('lever',712,335,1.5)],x=650,y=330,z=1.45,v='bridge',bus=False,leaf=[-38,-38]))
# 8 Slim
C(loc('ext',[dict(k='slim',view='front',pose='stand',expr='smug',x=700,y=700,s=1.35,held=dict(t='bat',ox=-70,oy=-120,rot=-16,s=1.1)),RD(520,s=1.0),RD(880,s=1.0)],x=700,y=335,z=1.4,v='toll',bus=False))
# 9 Rosa takes off the glove
C(bus(1215,[rosa('sad',talk=False,sweat=1,red=.8,pale=.3,wound=True,tear=True),prop('wheel',1238,500)],z=2.0,y=cy(2.0,340,398),out='road',dome='red'))
# 10 the last mile
C(cabdrive('scared',z=1.35,hy=330,out='pier') if False else cabdrive('scared',z=1.35,hy=385))
