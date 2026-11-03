ID='jelly';TITLE='The Jellyfish That Can Reverse Its Age';SOURCE='Wikipedia "Turritopsis dohrnii"';DATE='2026-11-03'
DESC="Turritopsis dohrnii, the immortal jellyfish, can revert to the polyp stage after reaching sexual maturity when stressed, hurt, sick or old. In theory this can go on indefinitely, so it is called biologically immortal, but in practice most individuals still die from predation or disease. It is an important target of aging research. Source: Wikipedia, Turritopsis dohrnii."
TAGS=['immortal jellyfish','turritopsis dohrnii','biologically immortal','ocean','animals','shorts','true story','science','aging']
PINNED="Important: 'immortal' here means it can reset its life cycle in theory. In nature most of them still get eaten or die of disease. Would you reset your age? 🪼 Tell me below 👇"
PROPS="""function jfish(c){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:c||0xc8e8ff,transparent:true,opacity:.75});const d=new THREE.Mesh(new THREE.SphereGeometry(.6,12,8,0,Math.PI*2,0,Math.PI/2),m);d.position.y=.7;g.add(d);for(let i=0;i<6;i++){const a=i/6*6.283;const t=cyl(.02,.02,.9,4,new THREE.MeshBasicMaterial({color:0xe8f4ff}),Math.cos(a)*.4,.25,Math.sin(a)*.4,g)}const co=new THREE.Mesh(new THREE.SphereGeometry(.18,8,6),M(0xe86a4a));co.position.y=.75;g.add(co);S.add(g);ACT.push(g);return g}
const JF=jfish(),JF2=jfish(0xffd8f0);
function polyp(){const g=new THREE.Group();cyl(.04,.05,.5,5,M(0xd8a8c8),0,.25,0,g);for(let i=0;i<5;i++){const a=i/5*6.283;cyl(.01,.015,.25,3,M(0xe8c0d8),Math.cos(a)*.06,.6,Math.sin(a)*.06,g).rotation.z=Math.cos(a)*.5}const b=new THREE.Mesh(new THREE.SphereGeometry(.07,6,5),M(0xe8b0c8));b.position.y=.5;g.add(b);S.add(g);ACT.push(g);return g}
const PO=[polyp(),polyp(),polyp(),polyp()];
const J1=stgSign('IMMORTAL','JELLYFISH','#f4e8c0','#2a2a8a',1.7),J2=stgSign('BACK TO','BABY STAGE','#f4e8c0','#8a1a6a',1.8),J3=stgSign('STRESSED,','SICK OR OLD','#f4e8c0','#8a1a2a',1.9),J4=stgSign('IN THEORY','FOREVER','#f4e8c0','#2a6a2a',1.7),J5=stgSign('IN PRACTICE','STILL DIES','#f4e8c0','#8a1a2a',1.9)
const bob=(g,u)=>{g.position.y+=Math.sin(u*2.5)*.12}"""
SHOTS={
'hook':"{env:'sea',props:[[JF,0,.5,2.4,1.6,0,bob]],tag:['THIS JELLYFISH','CAN RESET ITS AGE']}",
's2':"{env:'sea',props:[[JF,0,.5,2.4,1.5,0,bob]],signs:[[J1,0,3.6,1.0,.9,.2]]}",
's3':"{env:'sea',props:[[JF,-.9,.5,2.4,1.3,0,bob],[PO[0],.9,0,2.2,2.0,0]],signs:[[J2,0,3.7,1.0,.9,.2]]}",
's4':"{env:'sea',props:[[JF,0,.5,2.4,1.5,0,(g,u)=>{g.position.y+=Math.sin(u*2.5)*.12;g.scale.setScalar(1.5*Math.max(.3,1-u*.18))}]],signs:[[J3,0,3.7,1.0,.9,.2]]}",
's5':"{env:'sea',props:[[PO[0],-1.2,0,2.2,1.8,0],[PO[1],-.4,0,2.0,1.8,0],[PO[2],.4,0,2.0,1.8,0],[PO[3],1.2,0,2.2,1.8,0]],stamp:'NEW COLONY',sc:'#8a1a6a',stampAt:.5}",
's6':"{env:'sea',props:[[JF,0,.5,2.4,1.5,0,bob]],signs:[[J4,0,3.6,1.0,.9,.2]]}",
's7':"{env:'sea',props:[[JF,-1.0,.5,2.4,1.1,0,bob],[JF2,1.0,.5,2.4,1.1,0,bob]],signs:[[J5,0,3.6,1.0,.9,.2]]}",
's8':"{env:'lab',props:[[JF,0,.4,2.4,1.5,0,bob]],stamp:'AGING RESEARCH',sc:'#2a2a6a',stampAt:.4}"}
LINES=[
("This jellyfish can turn back into a baby.",['hook'],"OK | \"capable of completely reverting to a sexually immature, sedentary polyps colonial stage after having reached sexual maturity\""),
("It is called Turritopsis dohrnii, the immortal jellyfish.",['s2'],"OK | \"commonly known as the immortal jellyfish\""),
("After becoming an adult, it can revert to a polyp, a younger stage.",['s3'],"OK | \"reverting to a sexually immature, sedentary polyps colonial stage after having reached sexual maturity\""),
("It does that when it is stressed, hurt, sick, or old.",['s4'],"OK | \"exposed to environmental stress, physical assault, or is sick or old, it can revert to the polyp stage\""),
("The polyp then forms a new colony.",['s5'],"OK | \"forming a new polyp colony\""),
("In theory, this can go on forever, so it is called biologically immortal.",['s6'],"OK | \"Theoretically, this process can go on indefinitely, effectively rendering the jellyfish biologically immortal\""),
("But in practice, most of them still get eaten or die from disease.",['s7'],"OK | \"most Turritopsis dohrnii are likely to succumb to predation or disease in the medusa stage\""),
("That is why scientists study it for aging research.",['s8'],"OK | \"an important target of basic biological aging and pharmaceutical research\""),
]
COVER=("THE JELLYFISH","THAT RESETS","ITS AGE","{env:'sea',props:[[JF,-.3,.5,2.4,1.8,0],[PO[0],1.2,0,2.2,2.0,0]],cam:[0,1.8,5.6,0,1.2,2.0,52]}")
