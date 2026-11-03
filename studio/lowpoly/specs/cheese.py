ID='cheese';TITLE='People Chase A Cheese Down A Hill';SOURCE='Wikipedia "Cooper\'s Hill Cheese-Rolling and Wake"';DATE='2026-11-03'
DESC="The Cooper's Hill Cheese-Rolling and Wake is an annual event held on the Spring Bank Holiday at Cooper's Hill in Brockworth, Gloucestershire, England. A round of Double Gloucester cheese is rolled down a very steep hill (a slope of around 50 percent) and competitors race after it. The cheese has about a one-second head start and can reach high speeds, enough to knock over and injure a spectator. The first person over the finish line wins the cheese, even though it is never actually caught. Its earliest known written record is from 1836, and winners have come from many countries.\n\nSource: Wikipedia, \"Cooper's Hill Cheese-Rolling and Wake\".\n\nWould you chase the cheese? Tell us in the comments.\n\n#shorts #funfacts #england #cheese #lowpoly"
TAGS=['cheese rolling','coopers hill','gloucestershire','double gloucester','weird events','british traditions','fun facts','did you know']
PINNED="Nobody ever actually catches the cheese; the first person over the finish line wins it. Would you chase the cheese? Tell me below 👇"
PROPS="""function wheel(){const g=new THREE.Group();const c=cyl(.45,.45,.25,16,M(0xf0c040),0,.45,0,g);c.rotation.z=Math.PI/2;g.userData.c=c;S.add(g);ACT.push(g);return g}
const CHZ=wheel();
const RP=[0,1,2].map(i=>{const P=stgPerson(['#c4402a','#2a5ac8','#e8c030'][i],'#3a3a4a',['#3a2418','#6a4220','#2a1c14'][i],['#e8b894','#dca47e','#d49a74'][i]);return P});
const SPEC=stgPerson('#4a6a3a','#5a5a62','#d8d8d8','#e8b894');
const HL=stgBlock(8,.3,6,0x7aba5a);
const N1=stgSign('COOPER\\'S HILL','GLOUCESTERSHIRE','#f4e8c0','#2a2a6a',2.2),N2=stgSign('DOUBLE','GLOUCESTER','#f4e8c0','#8a6a1a',1.8),N3=stgSign('50% SLOPE','','#f4e8c0','#8a1a2a',1.7),N4=stgSign('NEVER','CAUGHT','#f4e8c0','#2a2a6a',1.6),N5=stgSign('1836','EARLIEST RECORD','#f4e8c0','#2a6a2a',1.9)
const roll=(g,u)=>{g.userData.c.rotation.x=u*9;g.position.x=-1.2+((u*.8)%1)*2.4}
const tumble=(P,u,i)=>{P.g.rotation.z=Math.sin(u*5+i)*.5;P.g.position.y=Math.abs(Math.sin(u*7+i))*.2}"""
SHOTS={
'hook':"{env:'hill',props:[[CHZ,0,0,2.4,1.5,0,roll]],who:[[RP[0],-.9,1.8,Math.PI/2,'shock','run']],tag:['CHASE A CHEESE','DOWN A HILL']}",
's2':"{env:'hill',props:[[CHZ,0,.0,2.4,1.5,0,roll]],signs:[[N1,0,3.5,1.0,.9,.2]]}",
's3':"{env:'room',props:[[CHZ,0,.6,2.2,2.0,0]],signs:[[N2,0,3.3,1.0,.9,.2]]}",
's4':"{env:'hill',props:[[CHZ,.4,0,2.4,1.2,0,roll]],who:[[RP[1],-.9,1.8,.5,'shock','panic']],signs:[[N3,0,3.4,1.0,.9,.2]]}",
's5':"{env:'hill',props:[[CHZ,.6,0,2.4,1.3,0,roll]],who:[[RP[0],-.9,1.8,Math.PI/2,'angry','run']],stamp:'1 SECOND HEAD START',stampAt:.9}",
's6':"{env:'hill',props:[[CHZ,-.6,0,2.4,1.3,0,roll]],who:[[SPEC,.9,1.8,-.4,'shock','panic']],stamp:'KNOCKS YOU OVER',stampAt:.9}",
's7':"{env:'hill',props:[[CHZ,0,0,2.4,1.4,0,roll]],who:[[RP[2],-.9,1.8,Math.PI/2,'happy','cheer']],signs:[[N4,0,3.5,1.0,.9,.2]]}",
's8':"{env:'hill',who:[[RP[2],0,1.8,0,'happy','both']],signs:[[N5,0,3.5,1.0,.9,.2]]}"}
LINES=[
("In England, people chase a wheel of cheese down a very steep hill.",['hook'],"OK | \"Participants race down the long hill chasing a wheel of Double Gloucester cheese\""),
("It happens every year at Cooper's Hill in Gloucestershire.",['s2'],"OK | \"annual event held on the Spring Bank Holiday at Cooper's Hill in Brockworth, Gloucestershire\""),
("The cheese is a round of Double Gloucester.",['s3'],"OK | same"),
("The hill has a slope of around fifty percent.",['s4'],"OK | \"has a slope of around 50 percent\""),
("The cheese gets about a one-second head start.",['s5'],"OK | \"it has around a one-second head start\""),
("It can reach high speeds, enough to knock over and injure a spectator.",['s6'],"OK | \"can reach high speeds, enough to knock over and injure a spectator\""),
("Nobody ever catches it. The first person over the finish line wins the cheese.",['s7'],"OK | \"The first person over the finish line ... wins the cheese, even though the cheese is never actually caught\""),
("Its earliest written record is from eighteen thirty-six.",['s8'],"OK | \"earliest known written attestation was in 1836\""),
]
COVER=("CHASE A","CHEESE","DOWN A HILL","{env:'hill',props:[[CHZ,0,0,2.2,2.1,0]],who:[[RP[0],-1.0,1.5,Math.PI/2-.3,'shock','run']],cam:[0,2.0,5.6,0,1.1,1.8,54]}")
