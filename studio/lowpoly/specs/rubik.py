ID='rubik';TITLE='He Could Not Solve His Own Cube';SOURCE='Wikipedia "Rubik\'s Cube"';DATE='2026-11-03'
DESC="Ernő Rubik, a Hungarian sculptor and professor of architecture, invented the Rubik's Cube in 1974. It was originally called the Magic Cube. According to later recollections, it took him about a month of trial and error to solve his own creation. It was released internationally in 1980 and was inducted into the US National Toy Hall of Fame in 2014. Source: Wikipedia, Rubik's Cube."
TAGS=['rubiks cube','erno rubik','hungary','puzzle','1974','invention','shorts','true story','history shorts']
PINNED="Fastest solve you've ever done? Mine would take about a month 😅 Tell me below 👇"
PROPS="""function cube(){const g=new THREE.Group();const cols=[0xc4202a,0xf08a20,0xf4f4f4,0xf0d020,0x2a8a3a,0x2a4ac8];const k=new THREE.Group();for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){const c=new THREE.Group();c.position.set(x*.36,y*.36,z*.36);box(.34,.34,.34,M(0x181818),0,0,0,c);if(x==1)box(.02,.28,.28,M(cols[0]),.17,0,0,c);if(x==-1)box(.02,.28,.28,M(cols[1]),-.17,0,0,c);if(y==1)box(.28,.02,.28,M(cols[2]),0,.17,0,c);if(y==-1)box(.28,.02,.28,M(cols[3]),0,-.17,0,c);if(z==1)box(.28,.28,.02,M(cols[4]),0,0,.17,c);if(z==-1)box(.28,.28,.02,M(cols[5]),0,0,-.17,c);k.add(c)}k.position.y=.55;g.add(k);g.userData.k=k;S.add(g);ACT.push(g);return g}
const CB=cube();
const ERN=stgPerson('#8a6a4a','#3a3a4a','#4a3a2a','#efc2a2',{stache:'#4a3a2a'});
const R1=stgSign('ERNŐ RUBIK','HUNGARY 1974','#f4e8c0','#2a2a6a',1.9),R2=stgSign('MAGIC','CUBE','#f4e8c0','#8a1a6a',1.5),R3=stgSign('ABOUT A','MONTH','#f4e8c0','#8a1a2a',1.5),R4=stgSign('INTERNATIONAL','RELEASE 1980','#f4e8c0','#2a6a2a',2.0),R5=stgSign('TOY HALL','OF FAME 2014','#f4e8c0','#8a5a10',1.9)
const tw=(g,u)=>{g.userData.k.rotation.y=u*1.1;g.userData.k.rotation.x=.4}"""
SHOTS={
'hook':"{env:'room',props:[[CB,0,1.0,2.4,3.2,0,tw]],tag:['HE INVENTED A PUZZLE','THEN COULDN\\'T SOLVE IT']}",
's2':"{env:'room',who:[[ERN,-.9,1.8,.5,'happy','hold']],props:[[CB,.9,1.1,2.0,1.6,0,tw]],signs:[[R1,0,3.6,1.0,.8,.2]]}",
's3':"{env:'room',props:[[CB,0,1.0,2.4,3.0,0,tw]],signs:[[R2,0,4.0,1.0,.9,.2]]}",
's4':"{env:'room',who:[[ERN,-.9,1.8,.5,'shock','shrug']],props:[[CB,.9,1.1,2.0,1.6,0,(g,u)=>{g.userData.k.rotation.set(u*3,u*4,0)}]],stamp:'SCRAMBLED',sc:'#8a1a6a',stampAt:.4}",
's5':"{env:'room',who:[[ERN,0,1.8,0,'sweat','think']],props:[[CB,1.4,1.2,1.6,1.2,0,tw]],signs:[[R3,-.4,3.5,1.0,.8,.2]]}",
's6':"{env:'room',who:[[ERN,0,1.8,0,'happy','cheer']],props:[[CB,-1.4,1.2,1.6,1.2,0,tw]],stamp:'SOLVED!',sc:'#2a6a2a',stampAt:.5}",
's7':"{env:'street',props:[[CB,0,1.0,2.4,3.0,0,tw]],signs:[[R4,0,4.1,1.0,.9,.2]]}",
's8':"{env:'hall',props:[[CB,0,1.0,2.4,2.8,0,tw]],signs:[[R5,0,4.0,1.0,.9,.2]]}"}
LINES=[
("He built a puzzle, and then he could not solve it.",['hook'],"OK | \"it took him about a month of trial and error to solve his own creation\""),
("Ernő Rubik, a Hungarian sculptor and professor of architecture, invented the Rubik's Cube in 1974.",['s2'],"OK | \"invented in 1974 by Hungarian sculptor and professor of architecture Ernő Rubik\""),
("It was first called the Magic Cube.",['s3'],"OK | \"Originally called the Magic Cube\""),
("He did not realise it was a puzzle until he scrambled it.",['s4'],"OK | \"only became apparent after he scrambled his newly constructed Cube for the first time\""),
("According to later recollections, it took him about a month to solve it.",['s5'],"OK | \"According to later recollections, it took him about a month of trial and error\""),
("It was released internationally in 1980.",['s7'],"OK | \"The cube was released internationally in 1980\""),
("The Magic Cube was renamed after its inventor that year.",['s6'],"OK | \"the Magic Cube was renamed after its inventor in 1980\""),
("In 2014, it entered the National Toy Hall of Fame in the United States.",['s8'],"OK | \"inducted into the US National Toy Hall of Fame in 2014\""),
]
COVER=("HE COULD NOT","SOLVE HIS OWN","CUBE","{env:'room',props:[[CB,.9,1.1,2.2,2.2,0,(g,u)=>{g.userData.k.rotation.set(.4,.6,0)}]],who:[[ERN,-.9,1.6,.5,'sweat','think']],cam:[0,2.0,5.8,0,1.4,1.8,54]}")
