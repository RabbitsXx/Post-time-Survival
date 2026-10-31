// Clip 2: Wombats Poop Cubes (loaded after scene.html main script; extends SHOTS)
const WFUR='#8c7a62';
function wombatFace(st){const k='wb'+st;if(FC[k])return FC[k];
 return FC[k]=ctex(256,128,(x,w,h)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++){x.fillStyle=shade(WFUR,1-.2*Math.abs(j-60)/68+(rn(i*3+j*91)-.5)*.16+((i+j)%2?.03:-.03));x.fillRect(i,j,1,1)}
  x.fillStyle='#3a2e28';x.fillRect(54,60,20,11);x.fillStyle='#1a1210';x.fillRect(57,63,4,4);x.fillRect(67,63,4,4);x.fillStyle='#1a1210';x.fillRect(58,80,12,2);
  x.strokeStyle='#1a1210';x.lineWidth=3;
  if(st==='proud'){for(const cx of[34,94]){x.beginPath();x.moveTo(cx-5,54);x.lineTo(cx,47);x.lineTo(cx+5,54);x.stroke()}}
  else if(st==='deadpan'){for(const cx of[34,94]){x.fillStyle='#1a1210';x.fillRect(cx-3,48,6,7);x.fillStyle='#fff';x.fillRect(cx-3,48,2,2);x.fillStyle=shade(WFUR,.8);x.fillRect(cx-5,45,10,4)}}
  else{for(const cx of[34,94]){x.fillStyle='#1a1210';x.fillRect(cx-3,48,6,7);x.fillStyle='#fff';x.fillRect(cx-3,48,2,2)}}
 })}
function wombatModel(){const g=new THREE.Group();const P={g};const fur=fab(WFUR,{seed:11,noise:.2}),furD=fab('#6e5f4c',{seed:12});
 const bm=new THREE.MeshLambertMaterial({map:fur,flatShading:true});const body=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),bm);body.scale.set(.66,.52,.88);body.position.y=.5;g.add(body);
 P.head=new THREE.Group();P.head.position.set(0,.55,.62);g.add(P.head);P.fm=new THREE.MeshLambertMaterial({map:wombatFace('neutral')});const hm=new THREE.Mesh(new THREE.SphereGeometry(.27,10,8),P.fm);hm.scale.set(1.05,.9,1);P.head.add(hm);
 for(const sx of[-1,1]){const e=cone(.075,.12,4,new THREE.MeshLambertMaterial({map:furD,flatShading:true}),sx*.19,.2,-.06,P.head);e.rotation.z=-sx*.3}
 P.legs=[[-.22,.35],[.22,.35],[-.22,-.3],[.22,-.3]].map(([x,z])=>{const p=new THREE.Group();p.position.set(x,.26,z);g.add(p);p.add(limb(.1,.09,.26,6,furD,-.13));return p});
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.75,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);
 P.state=s=>{P.fm.map=wombatFace(s)};P.at=(x,z,ry)=>{g.position.set(x,0,z);g.rotation.set(0,ry,0)};S.add(g);ACT.push(g);return P}
const WB=wombatModel();
const SC=person({coat:'#f2f2f2',pants:'#555a66',hair:'#2a1c14',skin:'#d8a07c'});
// cubes
const CUBEM=M(0x8f6a3c);const CUBES=[...Array(80)].map(()=>{const c=box(.17,.17,.17,CUBEM);S.add(c);ACT.push(c);return c});
function cubeAt(i,x,y,z,ry=0){const c=CUBES[i];c.visible=true;c.position.set(x,y,z);c.rotation.set(0,ry,0)}
function wall(n,x0,z0,cols=4){for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols;cubeAt(i,x0+(c-(cols-1)/2)*.18+(r%2)*.09,.09+r*.17,z0,0)}}
// rocks, log
const ROCK=new THREE.Mesh(new THREE.IcosahedronGeometry(.7,0),M(0x8a8a8e));ROCK.scale.set(1,.7,.9);S.add(ROCK);ACT.push(ROCK);
const ROCK2=new THREE.Mesh(new THREE.IcosahedronGeometry(.5,0),M(0x7a7a80));S.add(ROCK2);ACT.push(ROCK2);
const LOG=cyl(.28,.28,2.4,8,M(0x7a5230),0,0,0);LOG.rotation.z=Math.PI/2;S.add(LOG);ACT.push(LOG);
// moon + stars
const MOON=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2,1),new THREE.MeshBasicMaterial({color:0xfff2b0}));S.add(MOON);ACT.push(MOON);
const STARS=[...Array(30)].map((_,i)=>{const m=box(.12,.12,.12,new THREE.MeshBasicMaterial({color:0xffffff}));m.position.set((rn(i)-.5)*30,6+rn(i+3)*14,-20-rn(i+5)*8);S.add(m);ACT.push(m);return m});
const NIGHT=ctex(2,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#05071c');g.addColorStop(1,'#1c2a5a');x.fillStyle=g;x.fillRect(0,0,w,h)});
// lab: table + gut
const LABG=new THREE.Group();box(3.4,.12,1.2,M(0xdcdcdc),0,1.0,0,LABG);for(const sx of[-1,1])for(const sz of[-1,1])box(.1,1.0,.1,M(0x888a90),sx*1.55,.5,sz*.5,LABG);S.add(LABG);ACT.push(LABG);
const GUTP=fab('#e07a8a',{seed:21,noise:.1}),GUTS=fab('#7a6a8a',{seed:22,noise:.1});const SEGS_=[];
for(let i=0;i<9;i++){const stiff=i%2===1;const m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.34,10),new THREE.MeshLambertMaterial({map:stiff?GUTS:GUTP,flatShading:true}));m.rotation.z=Math.PI/2;m.position.set(-1.28+i*.32,1.3,0);m.userData.stiff=stiff;LABG.add(m);SEGS_.push(m)}
function inflate(f){SEGS_.forEach(m=>{const r=m.userData.stiff?.17+.05*f:.17+.3*f;m.scale.set(r,1,r)})}
// cutaway gut (half tubes)
const CUTG=new THREE.Group();const cutM=new THREE.MeshLambertMaterial({color:0xe07a8a,side:THREE.DoubleSide,flatShading:true});const cutS=new THREE.MeshLambertMaterial({color:0x6a5a8a,side:THREE.DoubleSide,flatShading:true});
for(let i=0;i<10;i++){const stiff=i%2===1;const m=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.4,10,1,true,Math.PI/2,Math.PI),stiff?cutS:cutM);m.rotation.z=Math.PI/2;m.rotation.x=0;m.position.set(-2+i*.4,1.5,0);m.rotation.y=0;CUTG.add(m)}
S.add(CUTG);ACT.push(CUTG);const BLOB=new THREE.Mesh(new THREE.IcosahedronGeometry(.28,1),M(0x7a5a34));const BLOBC=box(.5,.5,.5,CUBEM);S.add(BLOB,BLOBC);ACT.push(BLOB,BLOBC);
const DUST=ctex(64,64,(x,w,h)=>{x.fillStyle='#d2a868';x.fillRect(0,0,w,h);for(let i=0;i<300;i++){x.fillStyle=['#c19a5c','#dcb878','#b98f52'][i%3];x.fillRect(rn(i)*w,rn(i+9)*h,2,2)}},[26,26]);
const _hide=hideAll;hideAll=function(){_hide();WB.g.scale.setScalar(1);ground.material.map=grassT;ground.material.needsUpdate=true};
function world(mode){ground.material.map=DUST;ground.material.needsUpdate=true;PROPS.forEach(p=>p.visible=false);ground.material.color.set(0xffffff);if(mode==='night'){S.background=NIGHT;S.fog.color.set(0x141c44);HEMI.intensity=.55;ground.material.color.set(0x6a7aa0)}}
const WSH={
w_front:(u,d,k)=>{world();show(WB);WB.at(0,.4,0);WB.state('deadpan');WB.legs.forEach((l,i)=>l.rotation.x=Math.sin(u*9+(i%2)*3)*.5);wall(10,-.9,1.5,4);camTo([0,.9,3.8],[0,.8,3.1],[-.1,.6,.4],[-.1,.6,.4],k,42)},
w_poly:(u,d,k)=>{world();show(WB,POLY);WB.at(.85,.4,.3);WB.state('deadpan');POLY.rest();POLY.at(-.35,0,.5,.1);POLY.face('neutral');wall(12,0,-1.9,6);camTo([0,1.7,5.2],[0,1.75,4.6],[.25,1.1,0],[.25,1.1,0],k,40)},
w_cubes:(u,d,k)=>{world();show(WB);WB.at(0,-1.2,.0);WB.state('deadpan');[[-.2,0],[0,0],[.2,0],[-.1,1],[.1,1],[0,2]].forEach(([x,r],i)=>cubeAt(i,x,.09+r*.17,.2,.1*i));const a=-.45+k*.9;camTo([Math.sin(a)*2.4,.7,.2+Math.cos(a)*2.4],[Math.sin(a)*2.4,.7,.2+Math.cos(a)*2.4],[0,.25,.2],[0,.25,.2],0,40)},
w_polycube:(u,d,k)=>{world();show(POLY);POLY.rest();POLY.at(0,0,0,0);POLY.face('bored');POLY.arms[1].rotation.set(-1.35,0,-.2);POLY.head.rotation.set(.25,Math.sin(u*2)*.2,0);const c=CUBES[0];c.visible=true;POLY.g.updateMatrixWorld(true);c.position.set(.34,1.3,.72);c.rotation.set(u*1.4,u*1.1,0);camTo([0,1.55,2.9],[0,1.55,2.5],[0,1.4,0],[0,1.4,0],k,40)},
w_lab:(u,d,k)=>{world();show(LABG,SC);LABG.position.set(0,0,0);inflate(.2+k*.3);SC.rest();SC.at(-.5,0,.9,.6);SC.face('neutral');SC.arms[1].rotation.set(-1.0+Math.sin(u*7)*.25,0,0);camTo([-.3,1.7,5.2],[0,1.7,4.6],[-.2,1.2,0],[0,1.2,0],k,45)},
w_inflate:(u,d,k)=>{world();show(LABG);LABG.position.set(0,0,0);inflate(.3+k*.7);camTo([-1.2,1.55,2.0],[-.5,1.5,1.9],[0,1.3,0],[0,1.3,0],k,45)},
w_gut:(u,d,k)=>{world();show(CUTG,BLOB,BLOBC);const x=-2+k*3.6;const sq=x>0.4;BLOB.visible=!sq;BLOBC.visible=sq;(sq?BLOBC:BLOB).position.set(x,1.5,0);BLOBC.rotation.set(0,0,0);CUTG.children.forEach((m,i)=>{const sc=1+.05*Math.sin(u*6+i)});camTo([0,1.9,4.2],[0,1.8,3.6],[-.3,1.45,0],[.3,1.45,0],k,45)},
w_pop:(u,d,k)=>{world();show(WB);WB.at(0,0,0);WB.g.rotation.y=Math.PI;WB.state('deadpan');for(let i=0;i<6;i++){const t0=i*.18;const a=cl((u-t0)/.35);if(a>0)cubeAt(i,(i%3-1)*.22,.09+Math.max(0,.5*(1-a)*(1-a)),.62+(i%2)*.25+Math.floor(i/3)*.1,i)}camTo([0,.8,3.4],[0,.8,3.0],[0,.4,.2],[0,.4,.2],k,42)},
w_rock:(u,d,k)=>{world();show(WB,ROCK);ROCK.position.set(.5,.35,0);WB.at(-.9,.2,.6);WB.state('proud');for(let i=0;i<3;i++){if(u>.2+i*.4)cubeAt(i,.4+i*.18-.18,.78+.0,0)}camTo([-.5,1.1,3.6],[-.3,1.0,3.0],[0,.5,0],[0,.5,0],k,40)},
w_log:(u,d,k)=>{world();show(WB,LOG,ROCK,ROCK2);LOG.position.set(-1.3,.28,-.8);ROCK.position.set(1.3,.35,-.6);ROCK2.position.set(0,.25,-1.8);WB.at(0,1.2,.2);WB.state('proud');cubeAt(0,-1.8,.65,-.8);cubeAt(1,-1.4,.65,-.8);cubeAt(2,1.3,.82,-.6);cubeAt(3,1.5,.82,-.6);cubeAt(4,0,.6,-1.8);camTo([0,1.5,5.2],[0,1.4,4.5],[0,.6,0],[0,.6,0],k,45)},
w_night:(u,d,k)=>{world('night');show(WB,MOON);WB.at(0,0,0);WB.g.rotation.y=Math.PI;WB.state('deadpan');STARS.forEach(s=>s.visible=true);MOON.position.set(3,8,-18);const n=Math.min(70,Math.floor(u*30));for(let i=0;i<n;i++)cubeAt(i,((i*37)%11-5)*.2,.09+Math.floor(i/33)*.17,.6+(i%6)*.2);camTo([0,1.5,4.2],[0,1.5,4.0],[0,.6,-.6],[0,.6,-.6],k,50)},
wcover:(u,d,k)=>{world();show(WB,POLY);POLY.rest();POLY.at(-.42,0,.3,.2);POLY.face('neutral');POLY.arms[0].rotation.set(0,0,.05);POLY.arms[1].rotation.set(0,0,-.05);WB.at(.62,-1.4,-.35);WB.g.scale.setScalar(1.35);WB.state('deadpan');wall(6,.1,-.5,3);camTo([0,2.0,5.6],[0,2.0,5.6],[0,2.0,0],[0,2.0,0],0,40)},
w_stack:(u,d,k)=>{world();show(WB,POLY);WB.at(1.05,.2,.5);WB.state('proud');POLY.rest();POLY.at(-.6,0,.5,.25);POLY.face(k>.55?'smug':'neutral');const n=Math.min(15,Math.floor(u*14));wall(n,.15,.3,5);POLY.arms[1].rotation.set(-.9+Math.sin(u*9)*.2,0,0);camTo([0,1.5,6.4],[0,1.45,5.9],[.25,.95,0],[.25,.95,0],k,42)}
};
Object.assign(SHOTS,WSH);
