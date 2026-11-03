(()=>{
function rec(){const g=new THREE.Group();const d=cyl(.9,.9,.05,24,M(0xe8c030),0,0,0,g);cyl(.25,.25,.06,16,M(0xb89020),0,0,0,g);for(const r of[.45,.6,.75])cyl(r,r,.055,24,M(0xd0a828),0,0,0,g);d.rotation.x=0;g.rotation.x=Math.PI/2;const o=new THREE.Group();o.add(g);S.add(o);ACT.push(o);return o}
const RC=rec();
function probe(){const g=new THREE.Group();const dish=new THREE.Mesh(new THREE.SphereGeometry(1.0,12,8,0,Math.PI*2,0,Math.PI/2.6),M(0xe8e8ee));dish.rotation.x=-Math.PI/2;dish.position.z=.2;g.add(dish);box(.5,.4,.5,M(0x8a8a90),0,0,-.1,g);cyl(.03,.03,2.0,4,M(0x4a4a50),1.1,0,-.2,g).rotation.z=Math.PI/2;cyl(.03,.03,1.6,4,M(0x4a4a50),0,-.9,-.2,g);box(.35,.35,.1,M(0xe8c030),0,-.25,-.3,g);S.add(g);ACT.push(g);return g}
const PR=probe();
function stars(){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xffffff});for(let i=0;i<40;i++){const s=new THREE.Mesh(new THREE.IcosahedronGeometry(.05+(i%3)*.02,0),m);s.position.set((Math.sin(i*12.9)*.5)*14,(Math.cos(i*7.3)*.5)*8+2.5,-2-((i*5)%6));g.add(s)}S.add(g);ACT.push(g);return g}
const STR=stars();
const SAG=stgPerson('#3a4a8a','#2a2a3a','#4a3a2a','#efc2a2',{stache:'#4a3a2a'});stgHat(SAG,'helmet',0x3a4a8a);
const V1=stgSign('LAUNCHED','1977','#f4e8c0','#2a2a6a',1.6),V2=stgSign('55 LANGUAGES','OF GREETINGS','#f4e8c0','#2a6a2a',2.0),V3=stgSign('116 IMAGES','OF EARTH','#f4e8c0','#8a5a10',1.8),V4=stgSign('SURF, WIND,','WHALES','#f4e8c0','#2a6a8a',1.9),V5=stgSign('BACH TO','CHUCK BERRY','#f4e8c0','#8a1a2a',1.8),V6=stgSign('1 HOUR OF','BRAINWAVES','#f4e8c0','#8a1a6a',1.9),V7=stgSign('GLIESE 445','IN 40,000 YRS','#f4e8c0','#2a2a6a',2.1)
const spin=(g,u)=>{g.rotation.y=u*1.2}
const SH={hook:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.6,0,spin]],tag:['A MESSAGE','FLYING THROUGH SPACE']}),
s2:stgShot({env:'night',props:[[STR,0,0,0,1,0],[PR,0,1.8,2.2,1.2,.4]],signs:[[V1,0,4.0,1.0,.9,.2]]}),
s3:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.5,0,spin]],who:[[SAG,-1.5,1.4,.4,'neutral','point']],signs:[[V2,0,4.2,1.0,.9,.2]]}),
s4:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.5,0,spin]],signs:[[V3,0,3.9,1.0,.9,.2]]}),
s5:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.5,0,spin]],signs:[[V4,0,3.9,1.0,.9,.2]]}),
s6:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.5,0,spin]],signs:[[V5,0,3.9,1.0,.9,.2]]}),
s7:stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.6,2.4,1.5,0,spin]],signs:[[V6,0,3.9,1.0,.9,.2]]}),
s8:stgShot({env:'night',props:[[STR,0,0,0,1,0],[PR,0,1.8,2.2,1.2,.4,(g,u)=>{g.position.x=-u*.15}]],signs:[[V7,0,4.0,1.0,.9,.2]]})};
for(const k in SH)SHOTS['voyager_'+k]=SH[k];
SHOTS['voyagercover']=stgShot({env:'night',props:[[STR,0,0,0,1,0],[RC,0,1.7,2.4,1.9,0]],cam:[0,2.0,5.8,0,1.6,1.8,54]});
})();