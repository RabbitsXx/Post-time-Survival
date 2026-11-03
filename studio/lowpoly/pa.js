// THE PASTRY WAR models (readable silhouettes first): General (gold + bicorne + peg leg), French sailor (stripes + pom-pom cap), pastry chef (toque + apron + tray of cakes), French frigate, stone fort, cannon, cakes, leg coffin.
const PAGOLD=M(0xe8c040),PADARK=M(0x16161a),PARED=M(0xc4202a),PAWHITE=M(0xf6f4ee),PAWOOD=M(0xb98a4a);
const paGoldDraw=(x,w,h)=>{x.fillStyle='#c4202a';x.beginPath();x.moveTo(16,0);x.lineTo(24,0);x.lineTo(50,32);x.lineTo(42,32);x.fill();x.fillStyle='#e8c040';for(let i=0;i<5;i++)x.fillRect(31,3+i*6,3,3);x.fillRect(6,1,9,5);x.fillRect(49,1,9,5);for(let i=0;i<4;i++){x.fillRect(7+i*2,6,1,3);x.fillRect(50+i*2,6,1,3)}x.fillStyle='#f4f4f4';x.fillRect(16,10,4,4);x.fillStyle='#e8c040';x.fillRect(17,11,2,2)};
const paStripes=(x,w,h)=>{x.fillStyle='#f4f4f4';for(let j=2;j<h;j+=6)x.fillRect(0,j,w,3)};
const PASANTA=person({coat:'#1f3f86',pants:'#f2f2f2',hair:'#2a1c14',skin:'#c99a74',stache:'#2a1c14',torsoDraw:paGoldDraw});
(()=>{const P=PASANTA,hd=P.head;
 // bicorne with plume
 const hat=new THREE.Group();cyl(.17,.19,.09,8,PADARK,0,.17,0,hat);for(const sx of[-1,1]){const w=box(.26,.2,.1,PADARK,sx*.2,.25,0,hat);w.rotation.z=-sx*.55;const t=box(.26,.03,.11,PAGOLD,sx*.2,.34,0,hat);t.rotation.z=-sx*.55}
 box(.1,.1,.05,PARED,0,.2,.19,hat);for(const [c,x] of[[0x2a9a4a,-.05],[0xf4f4f4,0],[0xc4202a,.05]])box(.045,.3,.03,M(c),x,.42,0,hat).rotation.z=x*3;hd.add(hat);
 // right leg is wood: hide shin + shoe, add peg with leather cup
 const L=P.legs[1];L.children[1].visible=false;L.children[2].visible=false;const peg=cyl(.045,.03,.5,6,PAWOOD,0,-.68,0,L);cyl(.1,.07,.14,7,M(0x6a3a18),0,-.5,0,L);box(.2,.03,.2,M(0x6a3a18),0,-.42,0,L);cyl(.05,.05,.05,6,PADARK,0,-.95,0,L);
 // gold epaulettes (readable from afar)
 for(const sx of[-1,1]){const e=box(.2,.05,.16,PAGOLD,sx*.33,1.5,0,P.g);for(let i=0;i<4;i++)box(.012,.07,.012,PAGOLD,sx*.33+(i-1.5)*.04,1.44,.08,P.g)}
 // sash tails + sword
 box(.1,.3,.04,PARED,.2,.82,.17,P.g);const sw=new THREE.Group();box(.04,.7,.03,M(0xc0c8d0),0,-.2,0,sw);box(.2,.04,.04,PAGOLD,0,.17,0,sw);sw.position.set(-.27,.95,.08);sw.rotation.z=.15;P.g.add(sw)})();
const PASAIL=person({coat:'#2a4c8c',pants:'#f2f2f2',hair:'#6a4220',skin:'#e0aa84',torsoDraw:paStripes});
(()=>{const P=PASAIL,hd=P.head;const cap=new THREE.Group();cyl(.2,.2,.07,10,M(0x1c2c5c),0,.13,0,cap);cyl(.15,.18,.05,10,M(0x1c2c5c),0,.19,0,cap);const pom=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,0),PARED);pom.position.set(0,.26,0);cap.add(pom);box(.4,.03,.03,M(0x1c2c5c),0,.12,.19,cap);hd.add(cap);
 box(.3,.07,.1,PARED,0,1.43,.15,P.g);box(.34,.04,.1,PAWHITE,0,.93,.16,P.g)})();
const PACHEF=person({coat:'#f6f4ee',pants:'#555a66',hair:'#2a1c14',skin:'#e8b894',stache:'#2a1c14'});
(()=>{const P=PACHEF,hd=P.head;const toque=new THREE.Group();cyl(.14,.15,.3,10,PAWHITE,0,.34,0,toque);const pf=new THREE.Mesh(new THREE.IcosahedronGeometry(.2,1),PAWHITE);pf.position.set(0,.56,0);pf.scale.set(1,.7,1);toque.add(pf);for(let i=0;i<5;i++)box(.015,.28,.01,M(0xdad6cc),-.1+i*.05,.34,.15,toque);toque.position.y=-.07;hd.add(toque);
 box(.52,.62,.03,PAWHITE,0,1.05,.2,P.g);box(.5,.03,.03,M(0xc0c0c0),0,1.4,.2,P.g);for(const sx of[-1,1])box(.28,.05,.17,PAWHITE,sx*.32,1.48,0,P.g);
 // tray in the right hand
 const tray=new THREE.Group();cyl(.34,.34,.03,12,M(0xc0c8d0),0,0,0,tray);P.tray=tray;P.arms[1].add(tray);tray.position.set(0,-.72,.2)})();
function paCake(kind){const g=new THREE.Group();
 if(kind==='layer'){cyl(.17,.17,.1,10,M(0xf29ab4),0,.05,0,g);cyl(.14,.14,.09,10,PAWHITE,0,.145,0,g);cyl(.1,.1,.08,10,M(0xf29ab4),0,.23,0,g);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.04,0),PARED);c.position.set(0,.3,0);g.add(c)}
 else if(kind==='eclair'){box(.32,.08,.1,M(0xd9a85a),0,.04,0,g);box(.32,.04,.11,M(0x5a3420),0,.1,0,g)}
 else{cyl(.16,.13,.07,10,M(0xd9a85a),0,.035,0,g);cyl(.13,.13,.04,10,PARED,0,.09,0,g);for(let i=0;i<4;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.03,0),M(0x7a2a8a));b.position.set(Math.cos(i*1.6)*.07,.13,Math.sin(i*1.6)*.07);g.add(b)}}
 return g}
(()=>{const kinds=['layer','eclair','tart','layer','tart'];kinds.forEach((k,i)=>{const c=paCake(k);c.position.set((i-2)*.14,.02,(i%2)*.1-.05);c.scale.setScalar(.65);PACHEF.tray.add(c)})})();
// cannon
function paCannon(){const g=new THREE.Group();const b=cyl(.12,.17,1.2,8,M(0x2a2a30),0,.55,0,g);b.rotation.x=Math.PI/2-.25;b.position.z=.15;box(.5,.18,1.0,M(0x7a4a22),0,.3,0,g);for(const sx of[-1,1]){const w=cyl(.3,.3,.07,10,M(0x5a3a18),sx*.3,.3,0,g);w.rotation.z=Math.PI/2}return g}
// stone fort (San Juan de Ulua)
const PAFLAGMX=ctex(48,32,(x,w,h)=>{x.fillStyle='#1a8a46';x.fillRect(0,0,16,h);x.fillStyle='#f4f4f0';x.fillRect(16,0,16,h);x.fillStyle='#c4202a';x.fillRect(32,0,16,h);x.fillStyle='#8a5a2a';x.beginPath();x.ellipse(24,17,4,4,0,0,7);x.fill();x.fillStyle='#2a8a3a';x.fillRect(20,21,8,2)});
const PAFLAGFR=ctex(48,32,(x,w,h)=>{x.fillStyle='#1f3f86';x.fillRect(0,0,16,h);x.fillStyle='#f4f4f0';x.fillRect(16,0,16,h);x.fillStyle='#c4202a';x.fillRect(32,0,16,h)});
const PAFORT=(()=>{const g=new THREE.Group();const st=M(0xa8a698),st2=M(0x8c8a7e);box(5.2,1.9,3.2,st,0,.95,0,g);for(let i=0;i<9;i++)box(.4,.4,.5,st2,-2.4+i*.6,2.1,1.5,g);for(const sx of[-1,1]){cyl(.7,.8,2.8,8,st2,sx*2.5,1.4,0,g);for(let i=0;i<6;i++){const a=i/6*Math.PI*2;box(.28,.35,.28,st,sx*2.5+Math.cos(a)*.62,3.0,Math.sin(a)*.62,g)}}
 for(let i=0;i<3;i++){const c=paCannon();c.position.set(-1.4+i*1.4,2.0,1.7);c.scale.setScalar(.9);g.add(c)}
 cyl(.04,.04,2.2,5,tkMetal,0,3.0,-.8,g);const fl=flagMesh(PAFLAGMX,1.2,.8);fl.position.set(.6,3.8,-.8);g.add(fl);g.userData.flag=fl;box(1.1,1.2,.1,M(0x3a2a1a),0,.6,1.65,g);S.add(g);ACT.push(g);return g})();
// French frigate: the pig-war ship with a tricolour
const PASHIP=ship();PASHIP.userData.flag.material.map=PAFLAGFR;PASHIP.userData.flag.visible=true;
// coffin with the leg
const PACOFFIN=(()=>{const g=new THREE.Group();box(1.5,.35,.6,M(0x4a2a18),0,.3,0,g);box(1.56,.06,.66,M(0x6a3a22),0,.5,0,g);for(const sx of[-1,1])box(.05,.35,.5,PAGOLD,sx*.55,.3,.31,g);
 const leg=new THREE.Group();const stock=fab('#f4f2ec',{seed:3,noise:.12});const th=limb(.1,.085,.55,7,stock,0);th.rotation.z=Math.PI/2;th.position.x=-.32;leg.add(th);const sh=limb(.085,.065,.5,7,stock,0);sh.rotation.z=Math.PI/2;sh.rotation.y=0;sh.position.set(.2,.0,0);leg.add(sh);const kn=new THREE.Mesh(new THREE.IcosahedronGeometry(.1,0),new THREE.MeshLambertMaterial({map:stock,flatShading:true}));kn.position.set(-.04,0,0);leg.add(kn);
 const bt=box(.36,.17,.2,PADARK,.55,-.02,0,leg);box(.12,.1,.2,PADARK,.43,.1,0,leg);box(.1,.2,.2,M(0x3a2a1a),.7,-.06,0,leg);box(.06,.19,.21,PAGOLD,.0,0,0,leg);leg.position.set(0,.66,0);leg.rotation.z=.1;g.add(leg);g.userData.leg=leg;
 const wr=new THREE.Group();for(let i=0;i<8;i++){const fl=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,0),M([0x1a8a46,0xf4f4f0,0xc4202a][i%3]));fl.position.set(-.55+i*.15,.58,.28);wr.add(fl)}g.add(wr);
 const f=box(1.5,.02,.5,new THREE.MeshBasicMaterial({color:0x1a8a46}),0,.505,0,g);box(.5,.02,.5,PAWHITE,0,.51,0,g);box(.5,.02,.5,PARED,.5,.505,0,g);
 for(const x of[-.9,.9]){cyl(.05,.05,.5,6,PAWHITE,x,.25,.1,g);box(.05,.08,.05,M(0xffb43a),x,.54,.1,g)}S.add(g);ACT.push(g);return g})();
function paSheetEnv(){tkOff();S.background=new THREE.Color(0xdfe9f2);S.fog.color.set(0xdfe9f2);HEMI.intensity=1.3;ground.visible=true;ground.material.map=null;ground.material.color.set(0xc9d3dc);ground.material.needsUpdate=true}
const _pahide=hideAll;hideAll=function(){_pahide();ground.material.color.set(0xffffff);ground.material.map=grassT;ground.material.needsUpdate=true};
const PAM=(id,fn)=>{SHOTS['m_'+id]=(u,d,k)=>{paSheetEnv();fn(u,d,k)}};
PAM('santa',(u,d,k)=>{show(PASANTA);PASANTA.rest();PASANTA.at(0,0,0,k*Math.PI*2);PASANTA.face('smug');camTo([0,1.1,4.0],[0,1.1,4.0],[0,.95,0],[0,.95,0],0,40)});
PAM('sailor',(u,d,k)=>{show(PASAIL);PASAIL.rest();PASAIL.at(0,0,0,k*Math.PI*2);PASAIL.face('neutral');camTo([0,1.1,4.0],[0,1.1,4.0],[0,.95,0],[0,.95,0],0,40)});
PAM('chef',(u,d,k)=>{show(PACHEF);PACHEF.rest();PACHEF.at(0,0,0,k*Math.PI*2);PACHEF.arms[1].rotation.set(-1.4,0,-.2);PACHEF.tray.rotation.x=1.4;PACHEF.face('shock');camTo([0,1.2,4.4],[0,1.2,4.4],[0,1.05,0],[0,1.05,0],0,40)});
PAM('ship',(u,d,k)=>{show(PASHIP);PASHIP.position.set(0,0,0);PASHIP.rotation.set(0,k*Math.PI*2,0);ground.visible=false;S.background=new THREE.Color(0x4aa0e0);camTo([0,6,34],[0,6,34],[0,4.5,0],[0,4.5,0],0,40)});
PAM('fort',(u,d,k)=>{show(PAFORT);PAFORT.rotation.y=k*Math.PI*2;camTo([0,3.4,15],[0,3.4,15],[0,1.9,0],[0,1.9,0],0,40)});
PAM('coffin',(u,d,k)=>{show(PACOFFIN);PACOFFIN.rotation.y=k*Math.PI*2;camTo([0,1.6,4.0],[0,1.6,4.0],[0,.55,0],[0,.55,0],0,40)});
