ID='microwave';TITLE='The Melted Candy Bar';SOURCE='Wikipedia "Microwave oven"';DATE='2026-11-03'
DESC="Engineer Percy Spencer is generally credited with developing the first commercial microwave oven, the Raytheon Radarange, first sold in 1947. While working on a radar set at Raytheon he noticed the microwaves melted a candy bar in his pocket. The first food he cooked on purpose was popcorn; the second was an egg that exploded. Source: Wikipedia, Microwave oven."
TAGS=['microwave oven','percy spencer','raytheon','radarange','invention','weird history','history shorts','true story','science']
PINNED="Wikipedia says Spencer is 'generally credited' with the invention, and the candy bar story is the famous one. What's your favorite accidental invention? 🍿 Tell me below 👇"
PROPS="""function candy(){const g=new THREE.Group();box(.7,.14,.3,M(0x5a3a22),0,.1,0,g);box(.74,.15,.06,M(0xc4202a),0,.1,.12,g);for(let i=0;i<4;i++)box(.01,.15,.3,M(0x3a2414),-.27+i*.18,.1,0,g);S.add(g);ACT.push(g);return g}
const CD=candy();
function mwo(){const g=new THREE.Group();box(2.0,1.2,1.4,M(0xd8d8dc),0,.6,0,g);box(1.3,.9,.05,M(0x1a1a22),-.2,.62,.72,g);const gl=box(1.1,.7,.04,M(0xf0d878),-.2,.62,.75,g);g.userData.gl=gl;box(.4,.9,.05,M(0x6a6a72),.7,.62,.72,g);for(let i=0;i<3;i++)cyl(.05,.05,.06,6,M(0x2a2a2a),.7,.4+i*.25,.76,g).rotation.x=Math.PI/2;S.add(g);ACT.push(g);return g}
const MW=mwo();
function corn(){const g=new THREE.Group();for(let i=0;i<14;i++){const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.1+.03*(i%3),0),M(i%3?0xf8f0d0:0xf0e0a0));p.position.set(Math.sin(i*2.1)*.5,.1+(i%5)*.12,Math.cos(i*1.7)*.4);g.add(p)}S.add(g);ACT.push(g);return g}
const PC=corn();
function egg(){const g=new THREE.Group();const e=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M(0xf4ecd8));e.scale.y=1.3;e.position.y=.4;g.add(e);S.add(g);ACT.push(g);return g}
const EG=egg();
const SP=stgPerson('#d8d8e0','#3a3a4a','#6a5a4a','#efc2a2');stgHat(SP,'helmet',0xc8c8d0);
const W1=stgSign('PERCY','SPENCER','#f4e8c0','#2a2a6a',1.6),W2=stgSign('RADAR','AT RAYTHEON','#f4e8c0','#8a1a2a',1.9),W3=stgSign('POPCORN','FIRST','#f4e8c0','#2a6a2a',1.6),W4=stgSign('EGG','EXPLODED','#f4e8c0','#8a1a2a',1.6),W5=stgSign('RADARANGE','1947','#f4e8c0','#2a2a6a',1.8),W6=stgSign('COUNTERTOP','1967 $495','#f4e8c0','#2a6a2a',1.9)"""
SHOTS={
'hook':"{env:'lab',props:[[CD,0,1.6,2.2,2.0,0,(g,u)=>{g.rotation.z=Math.sin(u*3)*.08;g.scale.y=1.0*Math.max(.4,1-u*.12)}]],tag:['A MELTED CANDY BAR','LED TO THE MICROWAVE']}",
's2':"{env:'lab',who:[[SP,0,1.8,0,'neutral','think']],signs:[[W1,.2,3.2,1.2,.9,.2]]}",
's3':"{env:'lab',who:[[SP,-.9,1.8,.5,'neutral','hold']],props:[[MW,.9,0,2.0,.9,-.5]],signs:[[W2,0,3.5,1.0,.9,.2]]}",
's4':"{env:'lab',who:[[SP,0,1.8,0,'shock','point']],props:[[CD,.9,1.2,2.4,1.3,.4]],stamp:'MELTED!',sc:'#8a1a2a',stampAt:.5}",
's5':"{env:'lab',props:[[MW,0,0,2.0,1.1,0],[PC,0,.4,2.4,.9,0,(g,u)=>{g.position.y=.4+Math.abs(Math.sin(u*9))*.25}]],signs:[[W3,0,3.0,1.0,.8,.2]]}",
's6':"{env:'lab',who:[[SP,.9,1.8,-.4,'shock','panic']],props:[[EG,-.8,.3,2.2,1.4,0,(g,u)=>{g.scale.setScalar(1.4*kitPop(u,.8,.4,5))}]],signs:[[W4,0,3.6,1.0,.8,.8]]}",
's7':"{env:'lab',props:[[MW,0,0,2.0,1.3,0]],signs:[[W5,0,3.0,1.0,.8,.2]]}",
's8':"{env:'room',props:[[MW,0,0,2.0,1.1,0]],who:[[SP,-1.3,1.7,.5,'happy','cheer']],signs:[[W6,.3,3.2,1.0,.8,.2]]}"}
LINES=[
("The microwave oven may have started with a melted candy bar.",['hook'],"OK (hedged) | \"he noticed that microwaves from an active radar set he was working on started to melt a candy bar he had in his pocket\"; \"generally credited\""),
("American engineer Percy Spencer is generally credited with developing it.",['s2'],"OK | \"Percy Spencer is generally credited with developing and patenting the world's first commercial microwave oven\""),
("He worked at Raytheon, on a radar set.",['s3'],"OK | \"While employed at Raytheon, he noticed that microwaves from an active radar set he was working on\""),
("The microwaves started to melt a candy bar in his pocket.",['s4'],"OK | \"started to melt a candy bar he had in his pocket\""),
("The first food he cooked on purpose was popcorn.",['s5'],"OK | \"The first food deliberately cooked by Spencer was popcorn\""),
("The second was an egg, which exploded in the face of one of the experimenters.",['s6'],"OK | \"the second was an egg, which exploded in the face of one of the experimenters\""),
("Raytheon sold the first commercial one, the Radarange, in 1947.",['s7'],"OK | \"the Raytheon 'Radarange', which was first sold in 1947\""),
("A countertop model came in 1967, for four hundred ninety-five dollars.",['s8'],"OK | \"countertop microwave oven was introduced in 1967 by the Amana Corporation\"; \"first popular home model, the countertop Radarange, at a price of US$495\""),
]
COVER=("A MELTED","CANDY BAR","MADE THE MICROWAVE","{env:'lab',props:[[CD,.8,1.3,2.4,1.9,.3]],who:[[SP,-.8,1.6,.5,'shock','point']],cam:[0,2.0,5.8,0,1.3,1.8,54]}")
