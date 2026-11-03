ID='axolotl';TITLE='The Axolotl That Never Grows Up';SOURCE='Wikipedia "Axolotl"';DATE='2026-11-03'
DESC="The axolotl is a salamander from the lakes of Mexico that reaches sexual maturity without metamorphosis, so adults keep their external gills and stay in the water. It can regenerate limbs, gills and parts of its eyes and brain, so scientists use it in research. In the wild it is critically endangered. Source: Wikipedia, Axolotl."
TAGS=['axolotl','mexico','salamander','regeneration','endangered','animals','shorts','true story','science']
PINNED="Wild axolotls are critically endangered, with an estimated 50 to 1,000 adults left, but there is a large captive population. Do you have one? 🦎 Tell me below 👇"
PROPS="""function axo(){const g=new THREE.Group();const m=M(0xf0b8c8);const b=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),m);b.scale.set(2.0,.55,.7);b.position.y=.4;g.add(b);const h=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),m);h.scale.set(1.1,.7,1.1);h.position.set(1.0,.45,0);g.add(h);for(const z of[-.22,.22])box(.08,.08,.06,M(0x111111),1.35,.6,z,h.parent);const sm=box(.3,.03,.03,M(0x8a3a4a),1.4,.4,0,g);for(const z of[-1,1])for(let i=0;i<3;i++){const gl=cone(.05,.5,4,M(0xe8506a),.85,.55+i*.2,z*(.38+i*.05),g);gl.rotation.x=z*(1.0+i*.15)}for(const x of[-.5,.5])for(const z of[-1,1])box(.28,.08,.14,m,x,.15,z*.4,g);const tl=box(1.4,.3,.08,m,-1.9,.35,0,g);S.add(g);g.userData.tl=tl;ACT.push(g);return g}
const AX=axo();
function arm(){const g=new THREE.Group();const m=M(0xf0b8c8);box(.12,.7,.12,m,0,.35,0,g);for(const x of[-.08,0,.08])box(.04,.2,.04,m,x,.8,0,g);S.add(g);ACT.push(g);return g}
const ARM=arm();
function lake(){const g=new THREE.Group();const w=new THREE.Mesh(new THREE.CircleGeometry(4,16),new THREE.MeshBasicMaterial({color:0x4aa0c0,transparent:true,opacity:.7}));w.rotation.x=-Math.PI/2;w.position.y=.03;g.add(w);S.add(g);ACT.push(g);return g}
const LK=lake();
const SCI=stgPerson('#f4f4f4','#3a3a4a','#2a1c14','#e8b894');stgHat(SCI,'cap',0xf4f4f4);
const A1=stgSign('NEVER','GROWS UP','#f4e8c0','#8a1a6a',1.6),A2=stgSign('MEXICO','XOCHIMILCO','#f4e8c0','#2a6a2a',1.7),A3=stgSign('REGROWS','LIMBS','#f4e8c0','#8a1a2a',1.6),A4=stgSign('EYES &','BRAIN PARTS','#f4e8c0','#2a2a6a',1.7),A5=stgSign('CRITICALLY','ENDANGERED','#f4e8c0','#8a1a2a',1.9),A6=stgSign('LARGE CAPTIVE','POPULATION','#f4e8c0','#2a6a2a',2.0)"""
SHOTS={
'hook':"{env:'sea',props:[[AX,0,0,2.4,1.3,-.5,(g,u)=>{g.userData.tl.rotation.y=Math.sin(u*4)*.4}]],tag:['THIS ANIMAL','NEVER GROWS UP']}",
's2':"{env:'sea',props:[[AX,0,0,2.4,1.4,-.4]],signs:[[A1,0,3.2,1.0,.9,.2]]}",
's3':"{env:'sand',props:[[LK,0,0,2.4,1.2,0],[AX,0,.1,2.4,.9,-.4]],signs:[[A2,0,3.5,1.0,.9,.2]]}",
's4':"{env:'sea',props:[[AX,0,0,2.4,1.4,-.5,(g,u)=>{g.rotation.x=Math.sin(u*3)*.05}]],stamp:'KEEPS GILLS',sc:'#8a1a6a',stampAt:.4}",
's5':"{env:'lab',props:[[ARM,-1.0,0,2.2,1.5,0,(g,u)=>{g.scale.y=.4+Math.min(1,u*.5)*1.1}],[ARM,1.0,0,2.2,1.5,0]],signs:[[A3,0,3.2,1.0,.9,.2]]}",
's6':"{env:'lab',who:[[SCI,-.9,1.8,.5,'happy','cheer']],props:[[AX,1.0,0,2.2,.9,-.5]],signs:[[A4,0,3.4,1.0,.9,.4]]}",
's7':"{env:'sand',props:[[LK,0,0,2.4,1.2,0],[AX,0,.1,2.4,.9,-.4]],signs:[[A5,0,3.4,1.0,.9,.2]]}",
's8':"{env:'lab',props:[[AX,-1.0,0,2.2,.8,-.4],[AX,1.0,0,2.2,.8,.4]],signs:[[A6,0,3.2,1.0,.9,.2]]}"}
LINES=[
("This smiling salamander is an axolotl, and it never really grows up.",['hook'],"OK | \"It is neotenic, reaching sexual maturity without undergoing metamorphosis\""),
("It reaches adulthood without changing its body the way most salamanders do.",['s2'],"OK | \"reaching sexual maturity without undergoing metamorphosis\""),
("It comes from lakes in Mexico, like Xochimilco.",['s3'],"OK | \"known to inhabit the smaller lakes of Xochimilco and Chalco\""),
("Adults stay in the water and keep their feathery external gills.",['s4'],"OK | \"adults remain fully aquatic with obvious external gills\""),
("It can regenerate limbs.",['s5'],"OK | \"unusual ability to regenerate body parts, including limbs, gills\""),
("Even parts of its eyes and brain, so scientists study it a lot.",['s6'],"OK | \"parts of their eyes and brains\"; \"used extensively in scientific research\""),
("In the wild, it is critically endangered.",['s7'],"OK | \"assessed as critically endangered by the IUCN\""),
("But there is a large captive population in labs and tanks.",['s8'],"OK | \"There currently exists a large captive population of axolotls\""),
]
COVER=("THE ANIMAL","THAT NEVER","GROWS UP","{env:'sea',props:[[AX,0,0,2.4,1.7,-.5]],cam:[0,1.6,5.4,0,.9,2.0,52]}")
