(()=>{
function shrimp(){const g=new THREE.Group();const m=M(0xe8703a);const b=new THREE.Mesh(new THREE.SphereGeometry(.4,10,8),m);b.scale.set(1.8,.7,.7);b.position.y=.4;g.add(b);const c1=box(.9,.25,.25,m,.95,.55,.15,g);const c2=new THREE.Mesh(new THREE.SphereGeometry(.28,8,6),M(0xd05a28));c2.scale.set(1.5,1,.8);c2.position.set(1.3,.6,.15);g.add(c2);for(const z of[-.15,.15])box(.1,.1,.1,M(0x111111),.62,.7,z,g);for(let i=0;i<3;i++)box(.04,.3,.04,M(0xe8905a),-.3+i*.3,.12,.15,g);box(.7,.12,.3,m,-.9,.4,0,g);S.add(g);ACT.push(g);return g}
const SHR=shrimp();
function bubbles(){const g=new THREE.Group();for(let i=0;i<9;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.14+(i%3)*.05,0),new THREE.MeshBasicMaterial({color:0xcfeaff,transparent:true,opacity:.6}));b.position.set(Math.cos(i*1.3)*.5,Math.sin(i*2.1)*.4,Math.sin(i*1.7)*.3);g.add(b)}S.add(g);ACT.push(g);return g}
const BUB=bubbles();
function fish(c){const g=new THREE.Group();const m=M(c||0x3a8ad0);const b=new THREE.Mesh(new THREE.SphereGeometry(.5,9,7),m);b.scale.set(1.5,.8,.5);b.position.y=.5;g.add(b);cone(.3,.5,4,m,-.85,.5,0,g).rotation.z=-Math.PI/2;box(.1,.1,.06,M(0x111111),.5,.6,.22,g);S.add(g);ACT.push(g);return g}
const FSH=fish(0x3a8ad0);
function jar(){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xcfe8f0,transparent:true,opacity:.5});cyl(.3,.3,.7,10,m,0,.35,0,g);cyl(.2,.2,.08,8,M(0x8a8a8a),0,.74,0,g);S.add(g);ACT.push(g);return g}
const JAR=jar();
const SON=stgPerson('#2a4a6a','#2a2a3a','#2a1c14','#e8b894');stgHat(SON,'cap',0x2a4a6a);
const P1=stgSign('PISTOL','SHRIMP','#f4e8c0','#8a1a2a',1.5),P2=stgSign('1 BIG','CLAW','#f4e8c0','#2a2a6a',1.4),P3=stgSign('SNAP!','BUBBLE WAVE','#f4e8c0','#8a1a2a',1.8),P4=stgSign('STUNS','BIGGER FISH','#f4e8c0','#2a6a2a',1.8),P5=stgSign('SONAR','JAMMED','#f4e8c0','#2a2a6a',1.5),P6=stgSign('EYE HOOD','HELMET?','#f4e8c0','#2a2a6a',1.6)
const SH={hook:stgShot({env:'sea',props:[[SHR,-.4,0,2.4,1.1,-.2,(g,u)=>{g.rotation.z=Math.sin(u*10)*.05}],[BUB,1.3,.8,2.0,1.2,0,(g,u)=>{g.scale.setScalar(.6+((u*1.5)%1)*1.0)}]],tag:['THIS SHRIMP SNAPS','SO HARD IT STUNS FISH']}),
s2:stgShot({env:'sea',props:[[SHR,0,0,2.4,1.4,-.4]],signs:[[P1,0,3.3,1.0,.9,.2]]}),
s3:stgShot({env:'sea',props:[[SHR,-.2,0,2.4,1.5,-.3]],signs:[[P2,0,3.4,1.0,.8,.2]],cam:[0,1.4,5.0,0,.8,2.0,50]}),
s4:stgShot({env:'sea',props:[[SHR,-.8,0,2.4,1.2,-.3],[BUB,.8,.9,2.0,1.6,0,(g,u)=>{g.scale.setScalar(.5+((u*1.6)%1)*1.4)}]],signs:[[P3,.4,3.6,1.0,.9,.3]]}),
s5:stgShot({env:'sea',props:[[SHR,-1.2,0,2.4,1.0,-.3],[FSH,1.1,.7,2.0,1.1,.2,(g,u)=>{g.rotation.z=Math.sin(u*9)*.2}]],stamp:'STUNNED',sc:'#8a1a2a',stampAt:.6}),
s6:stgShot({env:'lab',props:[[JAR,-.6,0,2.3,2.0,0,(g,u)=>{g.rotation.z=Math.sin(u*20)*.1*Math.min(1,u)}],[BUB,.8,.7,2.3,1.0,0]],who:[[SON,.9,1.9,-.4,'shock','panic']],signs:[[P4,0,3.4,1.0,.8,.5]]}),
s7:stgShot({env:'sea',props:[[SHR,-1.0,0,2.2,.9,-.3],[SHR,1.0,0,2.2,.9,.3],[BUB,0,1.0,2.0,1.4,0]],signs:[[P5,0,3.6,1.0,.8,.3]]}),
s9:stgShot({env:'sea',props:[[SHR,0,0,2.4,1.4,-.3]],signs:[[P6,0,3.3,1.0,.9,.2]]}),
x8:stgShot({env:'sea',props:[[SHR,0,0,2.4,1.5,-.3]],stamp:'TINY, LOUD',sc:'#2a2a6a',stampAt:.4})};
for(const k in SH)SHOTS['pshrimp_'+k]=SH[k];
SHOTS['pshrimpcover']=stgShot({env:'sea',props:[[SHR,-.5,0,2.4,1.6,-.3],[BUB,1.3,1.0,2.0,1.8,0]],cam:[0,1.6,5.4,0,1.0,2.0,52]});
})();