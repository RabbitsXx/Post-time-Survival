// Halloween clip: vampire bats share food. Night world, pumpkins, bats, Poly in a vampire costume.  (loaded last)
const BATFUR='#5a4636';
function batFace(st){const k='bat'+st;if(FC[k])return FC[k];
 return FC[k]=ctex(256,128,(x,w,h)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++){x.fillStyle=shade(BATFUR,1-.22*Math.abs(j-60)/68+(rn(i*3+j*91)-.5)*.18+((i+j)%2?.03:-.03));x.fillRect(i,j,1,1)}
  x.fillStyle='#e8a0a8';x.fillRect(56,66,16,10);x.fillStyle='#b8707a';x.fillRect(58,68,4,5);x.fillRect(66,68,4,5);
  x.strokeStyle='#120c0a';x.lineWidth=3;
  const eye=(cx,o)=>{x.fillStyle='#120c0a';x.fillRect(cx-4,46,8,9);x.fillStyle='#fff';x.fillRect(cx-4,46,3,3);if(o==='hungry'){x.strokeStyle='#120c0a';x.beginPath();x.moveTo(cx-8,38+(cx<64?-4:4));x.lineTo(cx+8,38+(cx<64?4:-4));x.stroke()}};
  if(st==='happy'){for(const cx of[40,88]){x.beginPath();x.moveTo(cx-6,54);x.lineTo(cx,46);x.lineTo(cx+6,54);x.stroke()}x.fillStyle='#fff';x.fillRect(54,82,4,5);x.fillRect(70,82,4,5);x.strokeStyle='#120c0a';x.beginPath();x.moveTo(52,80);x.lineTo(64,86);x.lineTo(76,80);x.stroke()}
  else if(st==='hungry'){eye(40,'hungry');eye(88,'hungry');x.strokeStyle='#120c0a';x.beginPath();x.moveTo(54,86);x.lineTo(74,86);x.stroke();x.fillStyle='#6ac4ff';x.fillRect(100,56,4,8)}
  else{eye(40);eye(88);x.fillStyle='#fff';x.fillRect(55,82,4,5);x.fillRect(69,82,4,5);x.strokeStyle='#120c0a';x.beginPath();x.moveTo(52,80);x.lineTo(76,80);x.stroke()}
 })}
function batModel(){const g=new THREE.Group();const P={g};const fur=fab(BATFUR,{seed:51,noise:.2}),furD=fab('#3e3026',{seed:52,noise:.2}),mem=fab('#6a5a78',{seed:53,noise:.12});
 const fm=new THREE.MeshLambertMaterial({map:fur,flatShading:true}),dm=new THREE.MeshLambertMaterial({map:furD,flatShading:true}),wm=new THREE.MeshLambertMaterial({map:mem,flatShading:true,side:THREE.DoubleSide});
 P.body=new THREE.Mesh(new THREE.SphereGeometry(.26,9,7),fm);P.body.scale.set(.8,1.05,.75);P.body.position.y=-.5;g.add(P.body);
 box(.06,.16,.06,dm,-.1,-.05,0,g);box(.06,.16,.06,dm,.1,-.05,0,g);box(.1,.04,.04,dm,0,.03,0,g);
 P.head=new THREE.Group();P.head.position.set(0,-1.02,0);g.add(P.head);P.fm=new THREE.MeshLambertMaterial({map:batFace('neutral')});const hm=new THREE.Mesh(new THREE.SphereGeometry(.26,10,8),P.fm);hm.scale.set(1.0,.92,.92);P.head.add(hm);
 for(const sx of[-1,1]){const e=cone(.13,.55,4,dm,sx*.27,.16,-.04,P.head);e.rotation.z=-sx*.95}
 P.wings=[-1,1].map(s=>{const pv=new THREE.Group();pv.position.set(s*.22,-.35,-.04);g.add(pv);const m=new THREE.Mesh(new THREE.ConeGeometry(.5,1.25,3),wm);m.scale.set(1,.55,.08);m.position.y=-.34;pv.add(m);pv.userData.s=s;pv.userData.m=m;return pv});
 P.wing=f=>P.wings.forEach(pv=>{const s=pv.userData.s;pv.rotation.z=s*lerp(.1,1.5,f);const m=pv.userData.m;m.scale.y=lerp(.55,1,f);m.position.y=-.62*m.scale.y});P.wing(0);
 P.state=s=>{P.fm.map=batFace(s)};P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.set(0,ry,0)};
 S.add(g);ACT.push(g);return P}
const BATS=[...Array(9)].map(()=>batModel());
// vampire Poly (costume)
const POLYV=person({hairCap:1,coat:'#17171d',torsoDraw:(x,w,h)=>{x.fillStyle='#ecece8';x.beginPath();x.moveTo(24,0);x.lineTo(40,0);x.lineTo(32,18);x.closePath();x.fill();x.fillStyle='#c4202a';x.fillRect(30,12,4,12)},shortSleeve:0,pants:'#17171d',hair:'#14141a',stubble:1,skin:'#e6c8b4'});
{const cape=new THREE.Mesh(new THREE.BoxGeometry(.95,1.35,.05),new THREE.MeshLambertMaterial({color:0x8a1020,flatShading:true,side:THREE.DoubleSide}));cape.position.set(0,1.0,-.27);cape.rotation.x=.12;POLYV.g.add(cape);POLYV.cape=cape;
 for(const sx of[-1,1]){const c=box(.3,.55,.05,M(0x17171d),sx*.27,1.7,-.12,POLYV.g);c.rotation.z=-sx*.3;c.rotation.x=-.2;const f=cone(.016,.07,3,new THREE.MeshBasicMaterial({color:0xffffff}),sx*.045,-.115,.175,POLYV.head);f.rotation.x=Math.PI}}
window.ACTORS.poly=POLYV;
// pumpkins
function pumpkinTex(){return ctex(256,128,(x,w,h)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++){x.fillStyle=shade('#e8761a',1-.2*Math.abs(j-60)/68+(rn(i*3+j*91)-.5)*.14+((i+j)%2?.03:-.03));x.fillRect(i,j,1,1)}
  x.fillStyle='#ffe070';x.beginPath();x.moveTo(38,44);x.lineTo(54,44);x.lineTo(46,58);x.fill();x.beginPath();x.moveTo(74,44);x.lineTo(90,44);x.lineTo(82,58);x.fill();x.beginPath();x.moveTo(40,76);x.lineTo(46,70);x.lineTo(52,78);x.lineTo(58,70);x.lineTo(64,78);x.lineTo(70,70);x.lineTo(76,78);x.lineTo(82,70);x.lineTo(88,76);x.lineTo(80,90);x.lineTo(48,90);x.fill()})}
const PUMT=pumpkinTex();const PUMPS=[...Array(8)].map(()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.5,12,9),new THREE.MeshBasicMaterial({map:PUMT}));b.scale.set(1.1,.85,1.1);b.position.y=.42;g.add(b);cone(.08,.3,5,M(0x4a7a2a),0,.88,0,g);S.add(g);ACT.push(g);return g});
// graveyard & cave props
const GRAVE=new THREE.Group();[[-3,-3],[3.4,-4],[-5,-7],[5.5,-8],[0,-9]].forEach(([x,z],i)=>{const st=new THREE.Group();box(.9,1.1,.2,M(0x8a8a94),0,.55,0,st);cyl(.45,.45,.2,8,M(0x8a8a94),0,1.1,0,st).rotation.x=Math.PI/2;st.position.set(x,0,z);st.rotation.y=(i-2)*.15;GRAVE.add(st)});
function deadTree(x,z,s){const g=new THREE.Group();const bm=M(0x2a2024);cyl(.12,.32,3.2,6,bm,0,1.6,0,g);for(let i=0;i<5;i++){const b=cyl(.03,.09,1.4,5,bm,0,2.4+i*.2,0,g);b.rotation.z=(i%2?1:-1)*(.8+rn(i)*.4);b.rotation.y=i*1.3;b.position.x=(i%2?.5:-.5)*.7}g.position.set(x,0,z);g.scale.setScalar(s);GRAVE.add(g)}
deadTree(-4.2,-5,1.2);deadTree(6,-5.5,1.0);deadTree(-8,-9,1.3);
S.add(GRAVE);ACT.push(GRAVE);
const CAVE=new THREE.Group();const rockM=M(0x5c5672);box(18,1.2,14,rockM,0,4.0,-3,CAVE);box(18,6,1,rockM,0,2,-9,CAVE);box(1,6,14,rockM,-6,2,-3,CAVE);box(1,6,14,rockM,6,2,-3,CAVE);for(let i=0;i<16;i++){cone(.1+rn(i)*.1,.3+rn(i+3)*.4,5,rockM,(rn(i+7)-.5)*11,3.3,-7+rn(i+9)*8,CAVE).rotation.x=Math.PI}S.add(CAVE);ACT.push(CAVE);
const FOGL=new THREE.PointLight(0xff9a3a,2.4,16);FOGL.position.set(0,2.0,2.4);S.add(FOGL);
function night(cave){PROPS.forEach(p=>p.visible=false);S.background=NIGHT;S.fog.color.set(0x16122e);S.fog.near=8;S.fog.far=46;HEMI.intensity=1.0;HEMI.color.set(0x8f93e0);ground.material.map=grassT;ground.material.color.set(0x3f5470);ground.material.needsUpdate=true;FOGL.visible=true;MOON.scale.setScalar(1);if(!cave){STARS.forEach(s=>s.visible=true);MOON.visible=true;MOON.position.set(-5,9,-26)}}
const _hide3=hideAll;hideAll=function(){_hide3();HEMI.color.set(0xffffff);FOGL.visible=false;BATS.forEach(b=>b.g.visible=false)};
function pumps(list){list.forEach(([x,z,s],i)=>{const g=PUMPS[i];g.visible=true;g.position.set(x,0,z);g.scale.setScalar(s||1);g.rotation.y=(rn(i)-.5)*.6})}
function mouthPos(B,off=.26){const a=B.g.rotation.y;return new THREE.Vector3(B.g.position.x+Math.sin(a)*off,B.g.position.y-1.12,B.g.position.z+Math.cos(a)*off)}
const BLD=[...Array(6)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.06,0),new THREE.MeshBasicMaterial({color:0xc4101c}));S.add(m);ACT.push(m);return m});
const HB={
h_hook:(u,d,k)=>{night();show(BATS[0].g,LOG);LOG.position.set(0,2.95,-.1);LOG.scale.set(.5,1.2,.5);const b=BATS[0];b.at(0,2.85,0,0);b.state('neutral');b.wing(0);MOON.position.set(2.2,4.2,-8);MOON.scale.setScalar(.45);camTo([0,1.6,3.6],[0,1.65,3.1],[0,1.7,0],[0,1.7,0],k,38)},
h_poly:(u,d,k)=>{night();show(POLYV,GRAVE);pumps([[-1.4,1.0,1],[1.5,.6,.9],[.6,-1.8,1.1]]);POLYV.rest();POLYV.at(0,0,0,0);POLYV.face('smug');POLYV.cape.rotation.x=.12+Math.sin(u*3)*.04;POLYV.arms[0].rotation.set(-.1,0,-.35);POLYV.arms[1].rotation.set(-.1,0,.35);camTo([0,1.5,6.0],[0,1.6,5.2],[0,1.5,0],[0,1.5,0],k,48)},
h_hungry:(u,d,k)=>{night(1);show(CAVE,BATS[0].g);const b=BATS[0];b.at(0,3.1,0,0);b.state('hungry');b.wing(0);b.g.rotation.z=Math.sin(u*2.4)*.05;const day=1+Math.min(2,Math.floor(k*3));TAG('WITHOUT FOOD','DAY '+day,'#ff7a7a');camTo([0,1.5,4.2],[0,1.4,3.7],[0,2.2,0],[0,2.2,0],k,50)},
h_weak:(u,d,k)=>{night(1);show(CAVE,BATS[0].g);const b=BATS[0];b.at(0,3.1,0,0);b.state('hungry');b.wing(0);b.g.rotation.z=Math.sin(u*1.6)*.07;b.head.rotation.x=.15+Math.sin(u*2)*.05;camTo([0,1.6,2.4],[0,1.65,1.9],[0,1.9,0],[0,1.9,0],k,38)},
h_roost:(u,d,k)=>{night(1);show(CAVE);pumps([[-2.6,1.2,1],[2.8,.8,.9]]);for(let i=0;i<7;i++){const b=BATS[i];b.g.visible=true;b.at(-3.4+i*1.15,3.1+(i%2)*.1,-1.0-(i%3)*.6,(i-3)*.12);b.state(i===3?'hungry':'neutral');b.wing(0)}camTo([0,1.3,7.2],[0,1.5,6.2],[0,2.4,-2],[0,2.5,-2],k,52)},
h_share:(u,d,k)=>{night(1);show(CAVE);const A=BATS[0],B=BATS[1];A.g.visible=B.g.visible=true;A.at(-.5,3.1,0,.8);B.at(.5,3.1,0,-.8);A.state('neutral');B.state(k>.5?'happy':'hungry');A.wing(0);B.wing(0);
 const p0=mouthPos(A),p1=mouthPos(B);BLD.forEach((m,i)=>{const a=cl((u*1.6-i*.12-.1)/.5);if(a<=0||a>=1){m.visible=false;return}m.visible=true;m.position.set(lerp(p0.x,p1.x,a),lerp(p0.y,p1.y,a)+Math.sin(a*Math.PI)*.12,lerp(p0.z,p1.z,a))});camTo([0,2.0,4.1],[0,2.05,3.6],[0,2.1,0],[0,2.1,0],k,36)},
h_family:(u,d,k)=>{night(1);show(CAVE);for(let i=0;i<3;i++){const b=BATS[i];b.g.visible=true;b.at(-1.4+i*1.4,3.1,-.2*i,(1-i)*.35);b.state(i===1?'hungry':'neutral');b.wing(0)}const A=BATS[0],B=BATS[1];TAG('NOT FAMILY','SHARING ANYWAY','#7affc0');const p0=mouthPos(A),p1=mouthPos(B);BLD.forEach((m,i)=>{const a=cl(((u*1.2+i*.2)%1.2)/.7);if(a<=0||a>=1){m.visible=false;return}m.visible=i<3;m.position.set(lerp(p0.x,p1.x,a),lerp(p0.y,p1.y,a)+Math.sin(a*Math.PI)*.1,lerp(p0.z,p1.z,a))});camTo([0,1.7,5.2],[0,1.8,4.6],[0,2.3,0],[0,2.3,0],k,48)},
h_tally:(u,d,k)=>{night(1);show(CAVE,BATS[0].g);const b=BATS[0];b.at(0,3.1,0,0);b.state('happy');b.wing(0);b.g.rotation.z=Math.sin(u*3)*.04;const n=1+Math.min(4,Math.floor(k*5));TAG('FAVORS OWED','+'+n,'#ffe21f');camTo([0,1.7,3.6],[0,1.8,3.1],[0,2.2,0],[0,2.2,0],k,48)},
h_notes:(u,d,k)=>{night(1);show(CAVE,POLYV);for(let i=0;i<4;i++){const b=BATS[i];b.g.visible=true;b.at(-2.3+i*1.5,3.1,-1.2,(i-1.5)*.2);b.state('happy');b.wing(0)}POLYV.rest();POLYV.at(0,0,1.0,0);POLYV.face('bored');POLYV.head.rotation.set(-.35,0,0);POLYV.arms[1].rotation.set(-.9+Math.sin(u*9)*.15,0,-.1);POLYV.cape.rotation.x=.12;camTo([0,1.4,5.6],[0,1.5,5.0],[0,1.7,0],[0,1.8,0],k,50)},
h_final:(u,d,k)=>{night(1);show(CAVE,POLYV);pumps([[-2.0,.8,1],[2.2,.6,1.1]]);const b=BATS[0];b.g.visible=true;b.at(1.15,3.1,.2,-.4);b.state('happy');b.wing(0);const c=BATS[1];c.g.visible=true;c.at(-1.7,3.1,-.4,.4);c.state('happy');c.wing(0);POLYV.rest();POLYV.at(-.1,0,.2,.1);POLYV.face(k>.6?'smug':'neutral');POLYV.arms[0].rotation.set(0,0,.05);POLYV.arms[1].rotation.set(0,0,-.05);POLYV.cape.rotation.x=.12;camTo([0,1.7,5.6],[0,1.75,4.9],[0,1.9,0],[0,1.9,0],k,50)},
h_candy:(u,d,k)=>{night(1);show(CAVE,POLYV);pumps([[1.0,1.2,.7],[-1.1,1.0,.6]]);const b=BATS[0];b.g.visible=true;b.at(1.1,3.1,.3,-.5);b.state('happy');b.wing(0);POLYV.rest();POLYV.at(-.2,0,.3,.2);POLYV.face('smug');POLYV.arms[1].rotation.set(-.9,0,-.1);POLYV.cape.rotation.x=.12;camTo([-.1,2.0,3.4],[-.05,1.95,3.0],[-.1,1.85,0],[-.1,1.85,0],k,34)}
};
HB.hcover=(u,d,k)=>{night();show(POLYV,GRAVE,BATS[0].g,LOG);pumps([[-1.0,.6,.8],[1.2,.9,.9]]);LOG.position.set(.15,3.7,-.2);LOG.scale.set(.5,1.4,.5);const b=BATS[0];b.at(.9,3.55,-.3,-.3);b.state('happy');b.wing(.35);POLYV.rest();POLYV.at(-.45,0,.3,.25);POLYV.face('smug');POLYV.arms[0].rotation.set(0,0,.05);POLYV.arms[1].rotation.set(0,0,-.05);MOON.position.set(2.0,7.5,-14);MOON.scale.setScalar(.9);camTo([0,1.7,5.4],[0,1.7,5.4],[.1,2.05,0],[.1,2.05,0],0,50)};
Object.assign(SHOTS,HB);
