ID='petrich';TITLE='The War Of The Stray Dog';SOURCE='Wikipedia "Incident at Petrich"';DATE='2026-11-03'
DESC="In October 1925 Greece briefly invaded Bulgaria in the Incident at Petrich, sometimes called the War of the Stray Dog. In one version of events, it started on 18 October when a Greek soldier ran after his dog, which had strayed across the border, and was shot by a Bulgarian sentry; in the second, Greek claims say Bulgarian soldiers attacked a Greek outpost. Greece issued a 48-hour ultimatum demanding punishment, an apology and two million French francs, and on 22 October Greek troops occupied Petrich. The League of Nations ordered a cease-fire and withdrawal, and Greece paid 45,000 pounds in compensation.\n\nSource: Wikipedia, 'Incident at Petrich'. There were about 50 victims, mostly civilians, on the Bulgarian side.\n\nWhat's the strangest cause of a war you know? Tell us in the comments.\n\n#shorts #history #truestory #lowpoly"
TAGS=['war of the stray dog','incident at petrich','greece','bulgaria','1925','league of nations','weird history','history shorts','true story']
PINNED="There are two versions of how it began; the stray dog story is only one of them. What's the strangest cause of a war you know? Tell me below 👇"
PROPS="""function dog(){const g=new THREE.Group();const m=M(0x8a5a30);box(.8,.4,.35,m,0,.5,0,g);box(.3,.3,.3,m,.5,.7,0,g);box(.16,.08,.16,M(0x2a1a10),.7,.66,0,g);const e1=box(.1,.2,.06,M(0x5a3a1a),.45,.88,.12,g),e2=box(.1,.2,.06,M(0x5a3a1a),.45,.88,-.12,g);for(const x of[-.3,.3])for(const z of[-.12,.12])box(.1,.35,.1,m,x,.18,z,g);const tl=box(.4,.08,.08,m,-.55,.7,0,g);tl.rotation.z=.6;g.userData.tl=tl;const o=new THREE.Group();o.add(g);g.rotation.y=-Math.PI/2;o.userData=g.userData;S.add(o);ACT.push(o);return o}
const DOG=dog();
const GR=stgPerson('#2a5ac8','#f4f4f4','#2a1c14','#d49a74');stgHat(GR,'cap',0x2a5ac8);
const BG=stgPerson('#2a6a3a','#5a4a3a','#3a2418','#e8b894',{gun:true});stgHat(BG,'cap',0x2a4a2a);
const OFF=stgPerson('#1c2a5c','#1c2a5c','#d8d8d8','#efc2a2',{stache:'#d8d8d8'});stgHat(OFF,'slouch',0x1c2a5c);
const LG=stgPerson('#3a3a4a','#2a2a3a','#e8e8e8','#e8b894',{tails:1});stgHat(LG,'top',0x16161a);
const T1=stgSign('18 OCT 1925','BORDER','#f4e8c0','#8a1a2a',1.9),T2=stgSign('48 HOURS','2M FRANCS','#f4e8c0','#8a1a2a',1.9),T3=stgSign('PETRICH','22 OCT','#f4e8c0','#2a2a6a',1.7),T4=stgSign('LEAGUE OF','NATIONS','#f4e8c0','#2a2a6a',1.9),T5=stgSign('PAY','45,000 POUNDS','#f4e8c0','#2a6a2a',1.9)"""
SHOTS={
'hook':"{env:'hill',props:[[DOG,.3,0,2.4,1.2,-.5,(g,u)=>{g.userData.tl.rotation.z=.6+Math.sin(u*14)*.5}]],who:[[GR,-.9,1.4,.5,'shock','run']],tag:['GREECE INVADED BULGARIA','OVER A STRAY DOG?']}",
's2':"{env:'hill',props:[[DOG,.9,0,2.4,1.2,-.6,(g,u)=>{g.userData.tl.rotation.z=.6+Math.sin(u*14)*.5}]],who:[[GR,-.8,1.8,.5,'angry','point']],signs:[[T1,0,3.4,1.0,.8,.2]]}",
's3':"{env:'hill',who:[[GR,-.9,1.8,.5,'shock','panic'],[BG,.9,1.8,-.5,'neutral','hold']],stamp:'ONE VERSION',stampAt:.5}",
's4':"{env:'room',who:[[OFF,0,1.8,0,'angry','point']],signs:[[T2,.2,3.1,1.2,.9,.2]]}",
's5':"{env:'hill',who:[[GR,-.9,1.8,.5,'angry','walk'],[BG,.9,1.8,-.5,'sweat','shrug']],signs:[[T3,0,3.2,1.0,.9,.2]],cam:[0,2.2,7.0,0,1.4,1.7,58]}",
's6':"{env:'hall',who:[[LG,0,1.8,0,'smug','point']],signs:[[T4,.2,3.1,1.2,.9,.2]]}",
's7':"{env:'room',who:[[GR,-.8,1.8,.4,'sad','sad'],[LG,.8,1.8,-.4,'smug','hold']],signs:[[T5,0,3.3,1.0,.9,.2]]}",
's8':"{env:'room',who:[[GR,0,1.8,0,'angry','shrug']],stamp:'UNFAIR?',sc:'#2a2a6a'}"}
LINES=[
("In 1925, Greece invaded Bulgaria, and one story says it started with a stray dog.",['hook'],"OK (hedged) | \"Greek-Bulgarian crisis in 1925 ... brief invasion of Bulgaria by Greece\"; \"two versions of how the incident started\""),
("In that version, a Greek soldier ran after his dog, which strayed across the border.",['s2'],"OK | \"started on October 18, 1925, by a Greek soldier running after his dog, which had strayed across the border\""),
("A Bulgarian sentry shot the soldier.",['s3'],"OK | \"The border was guarded by Bulgarian sentries, one of whom shot the Greek soldier\""),
("Greece demanded a punishment, an apology, and two million French francs within forty-eight hours.",['s4'],"OK | \"ultimatum ... 48 hours to punish those responsible, an official apology, and two million French francs\""),
("On October twenty-second, Greek troops occupied the town of Petrich.",['s5'],"OK | \"On October 22, 1925, Greece sent soldiers into Bulgaria to occupy the town of Petrich\""),
("Bulgaria appealed to the League of Nations, which ordered a cease-fire.",['s6'],"OK | \"Bulgaria appealed to the League of Nations\"; \"ordered an immediate ceasefire\""),
("Greece withdrew and paid forty-five thousand pounds in compensation.",['s7'],"OK | \"final ruling included a ceasefire, the withdrawal of Greek troops ... payment of 45,000 pounds in compensation to Bulgaria\""),
("Greece complained it was treated more harshly than Italy had been in a similar case.",['s8'],"OK | \"Greece complained about the disparity between its treatment and Italy's treatment during the Corfu incident in 1923\""),
]
COVER=("A WAR OVER","A STRAY DOG?","GREECE VS BULGARIA","{env:'hill',props:[[DOG,.4,0,2.6,1.7,-.5]],who:[[GR,-.9,1.6,.5,'shock','run']],cam:[0,2.0,5.8,0,1.2,1.8,54]}")
