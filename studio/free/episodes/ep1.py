import sys,os;sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build import *
Z=lambda var,x0,x1,dur=3,face=-1:A('z_'+var,x0,face=face,path=[[0,x0,GY],[dur,x1,GY]],z=True)
def fight(bg,att,zvar,word,prop,ax=520,zx0=900,zx1=720,hit_t=1.35,expr='angry',extra=None,dur=2.6):
    a=A(att,ax,face=1,expr=expr);z=A('z_'+zvar,zx0,face=-1,path=[[0,zx0,GY],[hit_t,zx1,GY]],z=True)
    fx=[];sfx=[[0.1,'groan']];HIT(att,'z',hit_t,word,prop,a['acts'],z['acts'],fx,sfx)
    sh=Shot(bg,cx=(ax+zx1)/2+20,cy=560,z=1.0,min=dur,actors=[a,z]+(extra or []),fx=fx,sfx=sfx,pad=0);return sh
shots=[]
S=shots.append
S(Shot('street',cx=480,cy=560,z=.82,cx2=520,min=3,tint='rgba(255,140,60,.06)',actors=[A('okafor',330,face=1,expr='calm'),Z('robe',780,700,4),Z('postman',930,870,4),Z('jogger',1050,990,4)],lines=[say('okafor',"The dead hear everything. So in this building, nobody speaks.","คนตายได้ยินทุกอย่าง ดังนั้นในตึกนี้ ห้ามใครพูด")],sfx=[[0.4,'sting'],[1.0,'groan']],fadeIn=False))
S(Shot('lobby',min=3.2,card=dict(bg='#f1d9a8',fg='#3a1a08',top='BUILDING 4 INTERCOM',big=['QUIET','HOURS'],sub='PART 1 OF 3'),lines=[say('ann',"Noise Complaint. Part one of three. Quiet hours.","น้อยส์ คอมเพลนท์ ตอนที่หนึ่งจากสาม ชั่วโมงเงียบ")],sfx=[[0,'chime']]))
S(Shot('lobby',cx=700,cy=560,z=.92,cx2=730,min=2.6,actors=[A('okafor',660,face=1,expr='calm',hold='clip')],props=[],lines=[say('okafor',"Quiet hours. Always. Signed, management.","ชั่วโมงเงียบ ตลอดเวลา ลงชื่อ ผู้จัดการ")],sfx=[[1.2,'click']]))
S(Shot('hallway',cx=760,cy=560,z=.95,min=2.6,actors=[A('theo',770,face=-1,expr='smile',hold='console')],lines=[say('theo',"Zombies outside. This is clearly a tutorial level.","ซอมบี้ข้างนอก นี่มันด่านสอนเล่นชัดๆ")]))
S(Shot('hallway',cx=700,cy=560,z=.95,cx2=860,min=3.4,actors=[A('okafor',520,face=1,expr='angry',path=[[0,520,GY],[2.4,520,GY],[3.6,900,GY]],acts=[[0.4,2.0,'shush']]),A('theo',740,face=-1,expr='worried',path=[[0,740,GY],[2.7,740,GY],[3.9,1000,GY]],hold='console')],lines=[say('okafor',"Theodore. This is not a game. Follow me. Silently.","ธีโอดอร์ นี่ไม่ใช่เกม ตามมา เงียบๆ")]))
S(Shot('kitchen',cx=640,cy=560,z=.72,min=2.6,actors=[A('okafor',260,face=1,expr='worried',acts=[[0.9,2.4,'shush']]),A('priya',420,face=1,expr='tired'),A('bea',690,face=-1,expr='angry',acts=[[0.2,1.0,'point']]),A('theo',900,face=-1,expr='worried')],lines=[say('bea',"WHO WANTS SOUP?!","ใครอยากกินซุปบ้าง")],fx=[[0.9,'sticker','SHHH!',270,300]],sfx=[[0.7,'click']]))
S(Shot('kitchen',cx=560,cy=560,z=1.0,min=3.2,actors=[A('priya',440,face=1,expr='smug',acts=[[0.5,2.4,'shrug']]),A('bea',680,face=-1,expr='calm')],lines=[say('priya',"Medical fact. Bea is deaf in one ear and loud in the other.","ข้อเท็จจริงทางการแพทย์ บีหูหนวกข้างหนึ่ง และดังอีกข้าง")]))
S(Shot('kitchen',cx=520,cy=560,z=1.0,min=3.6,actors=[A('okafor',400,face=1,expr='angry',hold='clip'),A('bea',640,face=-1,expr='angry',acts=[[1.5,3.0,'point']])],lines=[say('okafor',"Rule one. Whisper. Rule two. No kettles. Rule three. No Beatrice.","ข้อหนึ่ง กระซิบ ข้อสอง ห้ามกาน้ำ ข้อสาม ห้ามบี")]))
S(Shot('kitchen',cx=600,cy=560,z=1.1,min=3.2,actors=[A('okafor',380,face=1,expr='scared',acts=[[0.6,3.0,'shush']]),A('theo',640,face=-1,expr='scared',hold='console',acts=[[0.2,3.2,'scared']])],lines=[say('theo',"Sorry. It has a startup sound. It will not turn off.","ขอโทษ มันมีเสียงเปิดเครื่อง ปิดไม่ได้")],sfx=[[0.05,'jingle'],[0.7,'sting']],fx=[[0.05,'flash',.2]]))
S(Shot('lobby',cx=760,cy=560,z=.8,min=3.0,tint='rgba(20,20,60,.12)',actors=[A('okafor',440,face=1,expr='scared'),Z('robe',880,850,3),Z('postman',1010,990,3),Z('suit',1150,1130,3)],lines=[say('okafor',"They heard it.","พวกมันได้ยินแล้ว")],sfx=[[0.2,'sting'],[0.9,'groan'],[1.6,'groan']]))
S(fight('hallway','okafor','robe','BONK!','wrench',ax=520,zx0=950,zx1=700,hit_t=1.5))
S(fight('hallway','bea','postman','CLANG!','pan',ax=520,zx0=950,zx1=700,hit_t=1.5))
S(fight('hallway','priya','suit','THUNK!','flash',ax=520,zx0=950,zx1=700,hit_t=1.5,expr='calm'))
S(Shot('hallway',cx=640,cy=560,z=.95,min=3.0,actors=[A('okafor',360,face=1,expr='angry'),A('bea',560,face=1,expr='smile',acts=[[0.3,1.4,'shrug']]),A('priya',760,face=-1,expr='tired')],lines=[say('bea',"GOOD JOB EVERYONE!","ทำได้ดีมากทุกคน")],sfx=[[1.5,'exhale']]))
S(Shot('kitchen',cx=600,cy=560,z=.95,min=3.6,actors=[A('priya',520,face=1,expr='calm'),A('bea',700,face=-1,expr='calm'),A('okafor',320,face=1,expr='tired'),A('theo',880,face=-1,expr='worried')],lines=[say('priya',"Real tip. Noise is the only thing they follow. Stay quiet together.","เคล็ดลับจริง เสียงคือสิ่งเดียวที่พวกมันตาม เงียบไปด้วยกัน")]))
S(Shot('lobby',cx=700,cy=560,z=1.05,cx2=720,min=3.2,tint='rgba(60,0,0,.1)',actors=[A('okafor',640,face=1,expr='scared')],lines=[say('okafor',"No. Not the alarm. Anything but the fire alarm.","ไม่นะ ไม่ใช่สัญญาณเตือนไฟ อะไรก็ได้ยกเว้นอย่างนั้น")],fx=[[1.0,'red',2.0]],sfx=[[0.3,'sting'],[1.4,'bell']]))
S(Shot('lobby',min=3.4,card=dict(bg='#f1d9a8',fg='#3a1a08',top='NEXT',big=['THE','FIRE ALARM'],sub='PART 2 OF 3'),lines=[say('ann',"Part one of three, Noise Complaint. Next: the fire alarm.","ตอนที่หนึ่งจากสาม ต่อไป สัญญาณเตือนไฟ")],sfx=[[0,'chime']]))
EP=dict(id='noise_01',series='NOISE COMPLAINT',title='QUIET HOURS',part=1,of=3,shots=shots)
