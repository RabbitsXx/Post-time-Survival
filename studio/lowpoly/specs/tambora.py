ID='tambora';TITLE='The Year Without a Summer';SOURCE='Wikipedia "Year Without a Summer"';DATE='2026-11-03'
DESC="1816 is known as the Year Without a Summer. Severe climate abnormalities caused crop failures and food shortages across the Northern Hemisphere. Evidence suggests it was mainly a volcanic winter caused by the April 1815 eruption of Mount Tambora in the Dutch East Indies, modern Indonesia. Source: Wikipedia, Year Without a Summer."
TAGS=['year without a summer','1816','mount tambora','volcano','climate','weird history','history shorts','true story','science']
PINNED="Tambora erupted in 1815 and the cold hit in 1816. Did you learn about this at school? 🌋 Tell me below 👇"
PROPS="""function volc(){const g=new THREE.Group();cone(2.2,3.0,9,M(0x5a4a3a),0,1.5,0,g);cone(.9,.5,9,M(0xe8501a),0,3.0,0,g);S.add(g);ACT.push(g);return g}
const VO=volc();
function ash(){const g=new THREE.Group();for(let i=0;i<10;i++){const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.5+(i%3)*.2,0),new THREE.MeshBasicMaterial({color:0x4a4a52,transparent:true,opacity:.75}));p.position.set(Math.sin(i*2.7)*1.6,i*.22,Math.cos(i*1.9)*.6);g.add(p)}S.add(g);ACT.push(g);return g}
const AS=ash();
function cloud(){const g=new THREE.Group();for(let i=0;i<7;i++){const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,0),new THREE.MeshBasicMaterial({color:0x6a6a74}));p.position.set((i-3)*.9,Math.sin(i*2)*.3,Math.cos(i)*.3);g.add(p)}S.add(g);ACT.push(g);return g}
const CL=cloud();
function crop(){const g=new THREE.Group();for(let i=0;i<5;i++)cyl(.02,.02,.5,4,M(0x6a5a3a),-.5+i*.25,.2,0,g).rotation.z=(i-2)*.25;S.add(g);ACT.push(g);return g}
const CR=[crop(),crop(),crop()];
const FAR=stgPerson('#8a5a3a','#3a4a6a','#3a2418','#d49a74');stgHat(FAR,'straw',0xe8c860);
const Y1=stgSign('1816','NO SUMMER','#f4e8c0','#2a2a8a',1.6),Y2=stgSign('MT TAMBORA','APRIL 1815','#f4e8c0','#8a1a2a',1.9),Y3=stgSign('VOLCANIC','WINTER','#f4e8c0','#2a2a6a',1.7),Y4=stgSign('COLDEST','SUMMER ON RECORD','#f4e8c0','#2a6a8a',2.1),Y5=stgSign('CROPS','FAILED','#f4e8c0','#8a1a2a',1.5),Y6=stgSign('FROST IN','AUGUST','#f4e8c0','#2a6a8a',1.6),Y7=stgSign('FAMINE &','TYPHUS','#f4e8c0','#8a1a2a',1.6)"""
SHOTS={
'hook':"{env:'snow',who:[[FAR,0,1.8,0,'sad','sad']],props:[[CL,0,4.0,0,1.2,0]],tag:['1816:','THE YEAR WITHOUT A SUMMER']}",
's2':"{env:'dusk',props:[[VO,0,0,0,1.0,0],[AS,0,3.4,0,1.0,0,(g,u)=>{g.scale.setScalar(.7+u*.15)}]],signs:[[Y2,0,5.4,1.0,1.0,.2]],cam:[0,2.6,9.0,0,2.2,0,58]}",
's3':"{env:'dusk',props:[[VO,0,0,0,1.0,0],[AS,0,3.4,0,1.2,0]],signs:[[Y3,0,5.4,1.0,1.0,.2]],cam:[0,2.6,9.0,0,2.2,0,58]}",
's4':"{env:'snow',who:[[FAR,0,1.8,0,'sad','sad']],props:[[CL,0,4.0,0,1.2,0]],signs:[[Y4,.2,3.5,1.2,.9,.2]]}",
's5':"{env:'field',who:[[FAR,0,1.8,0,'shock','shrug']],props:[[CR[0],-1.4,0,2.0,1.3,0],[CR[1],0,0,2.6,1.3,0],[CR[2],1.4,0,2.0,1.3,0]],signs:[[Y5,0,3.4,1.0,.8,.3]]}",
's6':"{env:'snow',who:[[FAR,-.9,1.8,.5,'sad','sad']],signs:[[Y6,.5,3.4,1.0,.8,.3]]}",
's7':"{env:'snow',who:[[FAR,0,1.8,0,'sad','shrug']],stamp:'FAMINE',sc:'#8a1a2a',stampAt:.4}",
's8':"{env:'snow',who:[[FAR,0,1.8,0,'sweat','shrug']],props:[[CL,0,4.0,0,1.2,0]],stamp:'COLD 1816',sc:'#2a6a8a',stampAt:.3}"}
LINES=[
("In 1816, summer basically did not happen.",['hook'],"OK | \"The year 1816 is known as the Year Without a Summer\""),
("It is blamed mainly on a volcano, Mount Tambora, which erupted in April 1815.",['s2'],"OK (hedged) | \"Evidence suggests ... predominantly a volcanic winter event caused by the massive eruption of Mount Tambora ... in April 1815\""),
("The ash created what scientists call a volcanic winter.",['s3'],"OK | \"volcanic winter\""),
("Summer temperatures in Europe were the coldest on record between 1766 and 2000.",['s4'],"OK | \"coldest of any on record between 1766 and 2000\""),
("Crops failed, causing major food shortages across the Northern Hemisphere.",['s5'],"OK | \"crop failures and major food shortages across the Northern Hemisphere\""),
("There was even frost in August.",['s6'],"OK | \"frost in August\""),
("Food riots and famine became common in places like Britain and France.",['s7'],"OK | \"food riots and famine becoming common\""),
("Major typhus epidemics followed in parts of Europe between 1816 and 1819.",['s8'],"OK | \"Between 1816 and 1819, major typhus epidemics occurred in parts of Europe\""),
]
COVER=("THE YEAR","WITHOUT A","SUMMER","{env:'dusk',props:[[VO,0,0,0,1.0,0],[AS,0,3.4,0,1.3,0]],cam:[0,2.6,9.0,0,2.2,0,58]}")
