(()=>{
const CAT=catModel();
const CAT2=catModel();
function crate(){const g=new THREE.Group();box(.9,.7,.9,M(0x8a6a38),0,.35,0,g);box(.92,.06,.92,M(0x5a4220),0,.72,0,g);for(const s of[-1,1])box(.05,.7,.92,M(0x5a4220),s*.3,.35,0,g);S.add(g);ACT.push(g);return g}
const CR=crate();
function chute(){const g=new THREE.Group();const d=new THREE.Mesh(new THREE.SphereGeometry(1.2,12,8,0,Math.PI*2,0,Math.PI/2),M(0xf4f4f4));d.position.y=1.6;g.add(d);for(const sx of[-1,1]){cyl(.015,.015,1.7,3,M(0xcccccc),sx*.8,.8,0,g).rotation.z=-sx*.5}box(.9,.7,.9,M(0x8a6a38),0,.35,0,g);S.add(g);ACT.push(g);return g}
const CH=chute();
function plane(){const g=new THREE.Group();const b=cyl(.5,.5,4,10,M(0xc8ccd4),0,0,0,g);b.rotation.z=Math.PI/2;cone(.5,1.2,10,M(0xc8ccd4),2.6,0,0,g).rotation.z=-Math.PI/2;box(.9,.08,4.4,M(0xb8bcc4),0,0,0,g);box(.7,.7,.08,M(0xb8bcc4),-1.8,.5,0,g);S.add(g);ACT.push(g);return g}
const PL=plane();
const RAT=(()=>{const g=new THREE.Group();const m=M(0x6a6a6a);const b=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),m);b.scale.set(1.4,.8,.8);b.position.y=.25;g.add(b);const h=new THREE.Mesh(new THREE.SphereGeometry(.15,8,6),m);h.position.set(.4,.25,0);g.add(h);box(.5,.03,.03,M(0xd8a0a0),-.6,.18,0,g);S.add(g);ACT.push(g);return g})();
const FRM=stgPerson('#c4a060','#5a6a8a','#3a2418','#c8946a');stgHat(FRM,'straw',0xe8c860);
const PIL=stgPerson('#1c2a5c','#1c2a5c','#6a4220','#efc2a2',{stache:'#6a4220'});stgHat(PIL,'cap',0x1c2a5c);
const K1=stgSign('BORNEO','1960','#f4e8c0','#2a2a6a',1.6),K2=stgSign('RATS EAT','THE CROPS','#f4e8c0','#8a1a2a',1.9),K3=stgSign('DDT?','NOT CONFIRMED','#f4e8c0','#2a2a2a',2.0),K4=stgSign('23 CATS','IN THE NEWS','#f4e8c0','#2a6a2a',1.8),K5=stgSign('14,000?','UNRELIABLE','#f4e8c0','#8a1a2a',1.8)
const fall=(g,u)=>{g.position.y=2.6-((u*.8)%1)*1.2;g.rotation.z=Math.sin(u*3)*.1}
const SH={hook:stgShot({env:'field',props:[[CH,0,1.0,1.6,1.2,0,fall],[CH,1.8,2.0,.8,.7,0,fall]],tag:['THE RAF DROPPED','CATS BY PARACHUTE'],move:2.2,cam:[0,2.2,7.0,0,1.8,1.6,56]}),
s2:stgShot({env:'sea',props:[[PL,0,3.2,-1.0,.8,.3]],signs:[[K1,0,5.0,1.0,.9,.2]],cam:[0,2.6,9.0,0,2.4,0,58]}),
s3:stgShot({env:'field',props:[[RAT,-1.0,0,2.2,1.6,.3],[RAT,1.0,0,2.0,1.6,-.5],[RAT,0,0,3.0,1.4,0]],who:[[FRM,0,1.4,0,'sad','sad']],signs:[[K2,0,3.6,1.0,.9,.2]]}),
s4:stgShot({env:'field',props:[[RAT,-1.0,0,2.4,1.4,.3]],who:[[FRM,.9,1.8,-.4,'sweat','shrug']],signs:[[K3,-.2,3.4,1.0,.9,.2]]}),
s5:stgShot({env:'room',props:[[PL,0,2.8,-1.0,.7,.3],[CR,1.2,.0,2.4,1.1,.4]],who:[[PIL,-1.0,1.8,.5,'happy','hold']]}),
s6:stgShot({env:'field',who:[[FRM,-.9,1.8,.5,'happy','cheer']],props:[[CAT,.9,0,2.0,1.1,-.5]],stamp:'A SUCCESS',sc:'#2a6a2a',stampAt:.5}),
s7:stgShot({env:'room',props:[[CAT,-.8,0,2.0,1.0,.4],[CAT2,.8,0,2.0,1.0,-.4]],signs:[[K4,0,3.2,1.0,.9,.2]]}),
s8:stgShot({env:'room',props:[[CAT,0,0,2.0,1.2,0]],signs:[[K5,0,3.2,1.0,.9,.2]]})};
for(const k in SH)SHOTS['catdrop_'+k]=SH[k];
SHOTS['catdropcover']=stgShot({env:'field',props:[[CH,0,.6,1.4,1.8,0]],cam:[0,2.4,5.6,0,2.2,1.4,54]});
})();