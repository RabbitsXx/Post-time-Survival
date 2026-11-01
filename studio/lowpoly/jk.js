// THE WAR OF JENKINS' EAR: models readable first (captain with bandaged ear, Spanish coast-guard officer, wigged MPs, giant ear, parliament, deck, banner).
const JKBROWN=M(0x6a3a1a),JKGOLD=M(0xe8c040);
function jkTricorn(col,trim,cock){const g=new THREE.Group();cyl(.16,.18,.1,8,M(col),0,.15,0,g);for(const a of[0,2.1,4.2]){const b=box(.34,.04,.2,M(col),Math.sin(a)*.17,.2,Math.cos(a)*.17,g);b.rotation.y=a;b.rotation.x=-.25;const t=box(.34,.02,.21,M(trim),Math.sin(a)*.17,.225,Math.cos(a)*.17,g);t.rotation.y=a;t.rotation.x=-.25}const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.045,0),M(cock));c.position.set(.12,.24,.14);g.add(c);return g}
function jkWig(){const g=new THREE.Group();g.scale.setScalar(1.2);g.position.y=.02;const w=new THREE.Mesh(new THREE.IcosahedronGeometry(.21,1),M(0xf2f0ea));w.scale.set(1.05,1.05,1.1);w.position.set(0,.05,-.01);g.add(w);for(const s of[-1,1])for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,0),M(0xf2f0ea));c.position.set(s*.2,-.05-i*.07,.02);g.add(c)}box(.08,.3,.06,M(0x1a1a22),0,-.12,-.2,g);return g}
const JKJEN=person({coat:'#7a4a22',pants:'#e8e0d0',hair:'#5a3a22',skin:'#d9a27c',beard:'#5a3a22'});
(()=>{const P=JKJEN;P.head.add(jkTricorn(0x2a2a2e,0xe8c040,0xc4202a));
 // bandage around the head over one ear + big knot
 const bd=cyl(.19,.19,.07,10,M(0xf4f0e4),0,.13,-.01,P.head);const knot=box(.1,.1,.08,M(0xf4f0e4),.2,.16,0,P.head);const pad=box(.06,.16,.12,M(0xf4f0e4),.19,-.03,.0,P.head);const chin=box(.04,.3,.05,M(0xf4f0e4),.18,.04,.02,P.head);P.bandage=[bd,knot,pad,chin];
 for(const sx of[-1,1])box(.34,.05,.14,JKGOLD,sx*.33,1.5,0,P.g);for(let i=0;i<4;i++)box(.03,.03,.02,JKGOLD,0,1.15+i*.12,.2,P.g)})();
const JKSP=person({coat:'#e8e4d8',pants:'#e8e4d8',hair:'#2a1c14',skin:'#d0976e',stache:'#2a1c14'});
(()=>{const P=JKSP;P.head.add(jkTricorn(0x16161a,0xe8e4d8,0xc4202a));box(.1,.7,.03,PARED,.0,1.18,.2,P.g).rotation.z=.6;
 for(const sx of[-1,1])box(.2,.4,.2,M(0x1f3f86),sx*.34,1.3,0,P.g);const sw=new THREE.Group();const bl=box(.05,.9,.025,M(0xd8dee6),0,.45,0,sw);bl.rotation.z=0;box(.2,.05,.05,JKGOLD,0,0,0,sw);P.sword=sw;P.arms[1].add(sw);sw.position.set(0,-.72,.1);sw.rotation.x=-.2})();
const JKMP=[0,1,2,3].map(i=>{const P=person({coat:['#2a2a32','#3a2a2a','#26323a','#2a2a32'][i],pants:'#e8e0d0',hair:'#e8e4dc',skin:['#e8b894','#dca47e','#efc2a2','#e0aa84'][i],stache:i===1?'#999':undefined});P.head.add(jkWig());return P});
function jkEar(){const g=new THREE.Group();const o=new THREE.Shape();o.moveTo(0,-.55);o.bezierCurveTo(.25,-.62,.34,-.38,.3,-.2);o.bezierCurveTo(.55,-.1,.6,.45,.22,.62);o.bezierCurveTo(-.1,.78,-.48,.52,-.42,.16);o.bezierCurveTo(-.46,-.12,-.22,-.3,-.1,-.3);o.closePath();
 const og=new THREE.ExtrudeGeometry(o,{depth:.14,bevelEnabled:false});og.center();const outer=new THREE.Mesh(og,new THREE.MeshLambertMaterial({color:0xf4b898,flatShading:true}));g.add(outer);
 const i=new THREE.Shape();i.moveTo(.02,-.1);i.bezierCurveTo(.3,-.05,.34,.38,.14,.46);i.bezierCurveTo(-.08,.54,-.28,.36,-.24,.14);i.bezierCurveTo(-.2,-.02,-.08,-.08,.02,-.1);const ig=new THREE.ExtrudeGeometry(i,{depth:.08,bevelEnabled:false});ig.center();const inner=new THREE.Mesh(ig,new THREE.MeshLambertMaterial({color:0xd08a68,flatShading:true}));inner.position.set(.02,.06,.1);g.add(inner);
 const c=new THREE.Shape();c.moveTo(0,0);c.bezierCurveTo(.12,.02,.14,.2,.04,.28);c.bezierCurveTo(-.04,.3,-.12,.2,-.08,.08);c.bezierCurveTo(-.06,.02,-.02,0,0,0);const cg=new THREE.ExtrudeGeometry(c,{depth:.06,bevelEnabled:false});cg.center();const curl=new THREE.Mesh(cg,new THREE.MeshLambertMaterial({color:0xb87050,flatShading:true}));curl.position.set(.04,.12,.16);g.add(curl);
 g.scale.setScalar(1.1);return g}
const JKEAR=jkEar();S.add(JKEAR);ACT.push(JKEAR);
const JKFLAGES=ctex(48,32,(x,w,h)=>{x.fillStyle='#f4f4ee';x.fillRect(0,0,w,h);x.strokeStyle='#c4202a';x.lineWidth=5;x.beginPath();x.moveTo(0,0);x.lineTo(w,h);x.moveTo(w,0);x.lineTo(0,h);x.stroke()});
// ship deck set
const JKDECK=(()=>{const g=new THREE.Group();const pl=ctex(32,32,(x,w,h)=>{x.fillStyle='#a8773c';x.fillRect(0,0,w,h);x.fillStyle='#7a5226';for(let i=0;i<w;i+=8)x.fillRect(i,0,1,h)},[8,8]);box(14,.2,9,M(0xffffff,{map:pl}),0,-.1,0,g);box(14,.9,.2,M(0x6a4220),0,.45,-3.2,g);for(let i=0;i<8;i++)box(.12,.9,.12,M(0x6a4220),-6+i*1.7,.45,-3.2,g);
 cyl(.18,.22,7,8,M(0x5a3a1a),-2,3.5,-1,g);cyl(.04,.04,2.5,5,M(0x5a3a1a),3.6,1.2,-3,g);
 const fl=flagMesh(UJ,1.3,.85);fl.position.set(4.3,2.2,-3);g.add(fl);for(let i=0;i<5;i++){const b=box(.5,.5,.5,M(0x8a5a2a),2+i*.55,.25,-2.4,g);b.rotation.y=i}
 S.add(g);ACT.push(g);return g})();
// House of Commons
const JKHALL=(()=>{const g=new THREE.Group();const wd=ctex(32,32,(x,w,h)=>{x.fillStyle='#5a3a22';x.fillRect(0,0,w,h);x.fillStyle='#4a2e1a';for(let i=0;i<w;i+=8)x.fillRect(i,0,2,h);x.fillStyle='#6a4a2c';for(let j=4;j<h;j+=16)x.fillRect(0,j,w,1)},[8,5]);const fl=ctex(32,32,(x,w,h)=>{x.fillStyle='#d8d0c0';x.fillRect(0,0,w,h);x.fillStyle='#a89c88';x.fillRect(0,0,16,16);x.fillRect(16,16,16,16)},[12,12]);
 box(16,.1,14,M(0xffffff,{map:fl}),0,-.05,0,g);box(16,8,.2,M(0xffffff,{map:wd}),0,4,-3.4,g);
 for(const sx of[-1,1])for(let r=0;r<2;r++){box(2.4,.5+r*.35,.8,M(0x2a6a3a),sx*2.6,.25+r*.17,-1.2-r*.8+.4,g)}
 const sp=new THREE.Group();box(.9,.2,.7,M(0x4a2e1a),0,.1,0,sp);box(.8,1.7,.12,M(0x7a2a1a),0,1.0,-.3,sp);box(1.0,.14,.3,JKGOLD,0,1.9,-.3,sp);sp.position.set(0,0,-3.0);g.add(sp);
 const chan=new THREE.Group();cyl(.03,.03,1.2,5,tkMetal,0,0,0,chan);for(let i=0;i<5;i++){const a=i/5*6.28;box(.05,.28,.05,M(0xffe9a8),Math.cos(a)*.5,-.5,Math.sin(a)*.5,chan)}chan.position.set(0,7,-1);g.add(chan);
 S.add(g);ACT.push(g);return g})();
// Savannah reunion: banner + oak
const JKBANNER=(()=>{const g=new THREE.Group();const b=paSign("JENKINS' EAR DAY",'#f2e2b0','#8a2a1a',3.2,.8,13);b.position.set(0,.4,0);g.add(b);cyl(.05,.05,3,5,M(0x5a3a1a),-1.7,-.9,0,g);cyl(.05,.05,3,5,M(0x5a3a1a),1.7,-.9,0,g);S.add(g);ACT.push(g);return g})();
const JKTREE=(()=>{const g=new THREE.Group();cyl(.3,.45,3,8,M(0x4a3420),0,1.5,0,g);for(let i=0;i<6;i++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.3,0),M(0x3a7a3a));c.position.set((rn(i)-.5)*3,3.4+rn(i+3)*.8,(rn(i+7)-.5)*2);g.add(c);for(let j=0;j<3;j++)box(.04,.7,.04,M(0xa8a890),c.position.x+(j-1)*.3,2.7,c.position.z+.5,g)}S.add(g);ACT.push(g);return g})();
const JKBANNER2=(()=>{const g=new THREE.Group();const b=paSign('SAVANNAH, GEORGIA','#f2e2b0','#1f3f86',3.2,.8,12);b.position.set(0,.4,0);g.add(b);S.add(g);ACT.push(g);return g})();
const JKSIGNPOST=(()=>{const g=new THREE.Group();cyl(.07,.07,2.2,6,M(0x5a3a1a),0,1.1,0,g);const b1=paSign('SAVANNAH','#f2e2b0','#2a4a8a',1.5,.45,22);b1.position.set(.7,2.0,.04);g.add(b1);const b2=paSign('GEORGIA','#f2e2b0','#2a4a8a',1.5,.45,22);b2.position.set(.7,1.5,.04);g.add(b2);S.add(g);ACT.push(g);return g})();
const JKPED=(()=>{const g=new THREE.Group();cyl(.7,.8,.5,10,M(0xb8b8b0),0,.25,0,g);cyl(.5,.6,.4,10,M(0xa8a8a0),0,.7,0,g);const pl=paSign('THE EAR','#e8c040','#2a1a10',1.0,.3,16);pl.position.set(0,.55,.74);g.add(pl);S.add(g);ACT.push(g);return g})();
const JKEAR2=jkEar();JKEAR2.scale.setScalar(.5);JKEAR2.position.set(0,.5,0);JKMP[2].head.add(JKEAR2);JKEAR2.visible=false;
const _jkhide=hideAll;hideAll=function(){_jkhide();JKNAME1.visible=JKNAME2.visible=false;JKEAR2.visible=false;JKTREATY.visible=false;JKBANNER.scale.setScalar(1);JKJEN.bandage.forEach(m=>m.visible=true);PAFORT.userData.flag.material.map=PAFLAGMX;PASHIP.userData.flag.material.map=PAFLAGFR;PASHIP.scale.setScalar(1);JKSHIP.scale.setScalar(1);JKEAR.scale.setScalar(1)};

// animated map of the Atlantic: Britain, Spain, the Caribbean coast (Cartagena) and Georgia, with a route, pins and moving ships
function jkLabel(txt,col,w,h){const t=ctex(256,64,(x,W,H)=>{x.fillStyle='rgba(0,0,0,0)';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 44px RC,Arial';x.textAlign='center';x.strokeStyle='#1a1208';x.lineWidth=8;x.strokeText(txt,W/2,46);x.fillStyle=col;x.fillText(txt,W/2,46)});t.generateMipmaps=false;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true}));return m}
const JKMAP=(()=>{const g=new THREE.Group();const sea=ctex(32,32,(x,w,h)=>{x.fillStyle='#3f95d0';x.fillRect(0,0,w,h);x.fillStyle='#5aaee2';for(let i=0;i<24;i++)x.fillRect(rn(i)*w,rn(i+5)*h,6,1)},[14,18]);box(6.4,.16,9.2,M(0xffffff,{map:sea}),0,0,0,g);box(6.8,.12,9.6,M(0xc8a060),0,-.1,0,g);
 const land=(x,z,w,d,c=0x7aa850)=>{const b=box(w,.2,d,M(c),x,.14,z,g);return b};
 land(-1.5,-3.2,1.0,1.3,0x6aa04a);land(-1.15,-3.0,.5,.8,0x6aa04a);          // Britain
 land(-.5,-2.0,1.6,1.0,0xc8b060);land(-1.0,-1.6,.7,.6,0xc8b060);            // Spain
 land(2.4,-.6,1.2,3.6,0x7aa850);land(2.0,1.2,1.4,1.0,0x7aa850);               // North America (Georgia coast)
 land(.1,3.6,3.2,1.4,0x6a9a48);land(-1.0,2.6,.6,.6,0x6a9a48);                  // South America (Cartagena coast)
 for(const [x,z,w] of[[.6,1.4,.5],[1.2,.9,.4],[1.0,1.9,.35]])land(x,z,w,w*.7,0x8ab858);   // Caribbean islands
 const route=[];for(let i=0;i<22;i++){const a=i/21;const x=lerp(-1.4,.2,a)+Math.sin(a*Math.PI)*-.9,z=lerp(-2.6,2.7,a);const d=box(.17,.17,.17,M(0xffffff),x,.3,z,g);d.userData.a=a;route.push(d)}g.userData.route=route;
 const pins=[['BRITAIN',-1.5,-3.2,0xe03030],['SPAIN',-.5,-2.0,0xe8c040],['GEORGIA',2.2,.5,0x4a90e8],['CARTAGENA',.1,2.9,0xff6a3a]].map(([n,x,z,c])=>{const p=new THREE.Group();cone(.14,.5,5,M(c),0,.5,0,p).rotation.x=Math.PI;const bl=new THREE.Mesh(new THREE.IcosahedronGeometry(.17,0),M(c));bl.position.y=.85;p.add(bl);const lb=jkLabel(n,'#ffe14a',3.6,.9);lb.rotation.x=-Math.PI/2.2;lb.position.set(0,1.5,.35);p.add(lb);p.position.set(x,.2,z);g.add(p);return p});g.userData.pins=pins;
 const mini=(col,fl)=>{const m=new THREE.Group();box(.5,.14,.2,M(0x6a3f1e),0,.1,0,m);const sl=box(.04,.5,.3,M(0xf2ead6),0,.42,0,m);const f=box(.02,.14,.2,M(fl),0,.74,.04,m);return m};
 g.userData.sb=mini(0,0xc4202a);g.userData.ss=mini(0,0xf0d040);g.userData.sb.scale.setScalar(3.6);g.userData.ss.scale.setScalar(3.6);g.add(g.userData.sb,g.userData.ss);S.add(g);ACT.push(g);return g})();
function jkMapShot(u,d,k,stampText){tkOff();S.background=new THREE.Color(0xe8d9b0);S.fog.color.set(0xe8d9b0);HEMI.intensity=1.3;ground.visible=false;show(JKMAP);const U=JKMAP.userData;
 U.route.forEach(r=>{const on=cl((u*.5-r.userData.a*.9)*6);r.visible=on>0;r.scale.setScalar(.6+on*.6)});
 U.pins.forEach((p,i)=>{const t=u-(.25+i*.35);p.visible=t>0;const q=t>0?1+.6*Math.exp(-t*6)*Math.cos(t*16):0;p.scale.setScalar(Math.max(.01,q))});
 const f=cl(u/ d*1.05);const a=ease(f);const rx=(t)=>lerp(-1.4,.2,t)+Math.sin(t*Math.PI)*-.9,rz=(t)=>lerp(-2.6,2.7,t);U.sb.position.set(rx(a),.3+Math.sin(u*6)*.04,rz(a));U.sb.rotation.y=Math.atan2(rx(Math.min(1,a+.02))-rx(a),rz(Math.min(1,a+.02))-rz(a))+0;const b=cl(f*1.1);U.ss.position.set(lerp(-.4,.7,b),.3+Math.sin(u*6+2)*.04,lerp(-2.0,2.4,b));U.ss.rotation.y=.4;
 window.STAMP={on:1,u:u-.1,text:stampText,c:'#c4202a',rot:-8};camTo([0,22.5,6.0],[0,22.0,5.8],[0,0,2.5],[0,0,2.5],k,42)}
const JKSHIP=ship();
const JKNAME1=paSign('GUARDA COSTA','#f2e2b0','#8a2a1a',3.4,.8,18),JKNAME2=paSign('REBECCA','#f2e2b0','#1f3f86',2.6,.7,22);[JKNAME1,JKNAME2].forEach(m=>{m.visible=false;S.add(m);ACT.push(m)});
const JKTREATY=paSign('TREATY 1748','#f4e8c0','#2a1a10',1.0,.7,17);JKTREATY.visible=false;S.add(JKTREATY);ACT.push(JKTREATY);
function jkSea(){paSea()}
const JSH={
j_hook:(u,d,k)=>{show(JKDECK,JKJEN,JKSP,JKEAR);jkSea();ground.visible=false;water.visible=false;S.background=new THREE.Color(0x7fc3e8);S.fog.color.set(0x7fc3e8);
 JKJEN.rest();JKJEN.at(-.5,0,.2,.35);JKSP.rest();JKSP.at(.5,0,.1,-1.25);JKJEN.bandage.forEach(m=>m.visible=false);JKJEN.face(u>.55?'shock':'bored');JKSP.face('angry');
 const sw=cl(u/.55);JKSP.arms[1].rotation.set(-2.2+sw*1.7,0,-.3-sw*.5);const f=cl((u-.45)/1.0);
 if(f>0){JKEAR.visible=true;JKEAR.position.set(lerp(-.3,0,f),lerp(1.9,.55,f)+Math.sin(f*Math.PI)*1.5,lerp(.1,-.25,f));JKEAR.rotation.set(0,.15,f*8);JKEAR.scale.setScalar(.75+f*.3)}else JKEAR.visible=false;
 if(u>.55){JKJEN.arms[0].rotation.set(-.4,0,-1.2)}SHAKE=(u>.5&&u<.8)?.1:0;camTo([0,1.6,4.6],[0,1.55,4.35],[0,1.55,.1],[0,1.55,.1],k,42)},
j_ship:(u,d,k)=>{paSea();show(PASHIP,JKSHIP);PASHIP.userData.flag.material.map=JKFLAGES;PASHIP.scale.setScalar(.62);PASHIP.position.set(lerp(-3.2,-2.7,k),-.15+Math.sin(u*2)*.1,-11);PASHIP.rotation.set(0,.5,Math.sin(u*1.6)*.03);JKSHIP.userData.flag.material.map=UJ;JKSHIP.position.set(2.9,-.15+Math.sin(u*2+1)*.1,-12);JKSHIP.rotation.set(0,-.4,0);JKSHIP.scale.setScalar(.55);JKNAME1.visible=JKNAME2.visible=true;JKNAME1.position.set(-2.5,6.0,-8.0);JKNAME2.position.set(2.6,6.0,-8.0);window.TAG('ATLANTIC','OCEAN','#ffd83a');window.STAMP={on:1,u:u,text:'1731',c:'#c4202a',rot:-8};camTo([0,3.2,13],[0,3.2,13],[0,2.6,-12],[0,2.6,-12],0,44)},
j_parl:(u,d,k)=>{show(JKHALL,JKJEN,JKMP[0],JKMP[1]);tkOff();S.background=new THREE.Color(0x3a2a1a);S.fog.color.set(0x3a2a1a);HEMI.intensity=1.2;ground.visible=false;JKJEN.rest();JKJEN.at(0,0,.9,0);JKJEN.face('bored');JKJEN.arms[0].rotation.set(0,0,-.2);JKJEN.arms[1].rotation.set(0,0,.2);
 [[-.68,-.3,1.0],[.68,-.3,-1.0]].forEach(([x,z,ry],i)=>{const P=JKMP[i];P.rest();P.at(x,0,z+.4,ry);P.face('angry');P.arms[0].rotation.set(-1.25+Math.sin(u*9+i)*.25,0,-.15);P.arms[1].rotation.set(-1.25+Math.cos(u*9+i)*.25,0,.15)});window.TAG('LONDON','HOUSE OF COMMONS','#ffb84a');window.STAMP={on:1,u:u,text:'1738',c:'#c4202a',rot:-8};camTo([0,1.75,4.7],[0,1.75,4.7],[0,1.7,.2],[0,1.7,.2],0,44)},
j_war:(u,d,k)=>{jkMapShot(u,d,k,'WAR 1739')},
j_cart:(u,d,k)=>{paSea();show(PAFORT,JKSHIP);PAFORT.userData.flag.material.map=JKFLAGES;PAFORT.position.set(2.0,-.2,-8);PAFORT.rotation.y=-.35;JKSHIP.userData.flag.material.map=UJ;JKSHIP.scale.setScalar(.7);const sk=ease(cl((k-.35)/.65));JKSHIP.position.set(-3.4,-.15+Math.sin(u*2)*.1-sk*2.2,-5);JKSHIP.rotation.set(0,.9,Math.sin(u*1.2)*.07+sk*.55);
 for(let i=0;i<4;i++){const t=u*1.2-i*.4;paBall(i,[PAFORT.position.x-2.2,2.1,-7],[-4.0,1.2,-5],cl(t/.9),2.4)}puffs(PAFORT.position.x-1.2,2.4,-6.6,u,.2);puffs(-4.0,1.2,-4.6,u,.9);window.TAG('CARTAGENA','COLOMBIA TODAY','#ff8a8a');window.STAMP={on:1,u:u,text:'FAIL 1741',c:'#c4202a',rot:-8};camTo([0,3.0,8],[0,3.0,8],[0,1.6,-6],[0,1.6,-6],0,44)},
j_end:(u,d,k)=>{show(JKHALL,JKMP[0],JKMP[1],JKTREATY);tkOff();S.background=new THREE.Color(0x3a2a1a);S.fog.color.set(0x3a2a1a);HEMI.intensity=1.2;ground.visible=false;JKMP[0].rest();JKMP[0].at(-.5,0,0,.7);JKMP[1].rest();JKMP[1].at(.5,0,0,-.7);JKMP[0].face('bored');JKMP[1].face('smug');JKMP[0].arms[1].rotation.set(-1.4+Math.sin(u*8)*.1,0,0);JKTREATY.visible=true;JKTREATY.position.set(0,1.62,.35);window.TAG('TREATY OF','AIX-LA-CHAPELLE','#ffb84a');window.STAMP={on:1,u:u,text:'1748',c:'#2a6a3a',rot:-6};camTo([0,1.9,6.4],[0,1.9,6.4],[0,1.75,0],[0,1.75,0],0,42)},
j_sav:(u,d,k)=>{paSea();ground.visible=true;ground.material.map=grassT;ground.material.needsUpdate=true;water.visible=false;sandR.visible=false;show(JKBANNER,JKBANNER2,JKTREE,JKMP[2],JKMP[3],JKJEN);JKBANNER.position.set(0,3.0,-1.2);JKBANNER.scale.setScalar(.62);JKBANNER2.position.set(0,3.6,-1.2);JKBANNER2.scale.setScalar(.62);JKTREE.position.set(3.4,0,-3);JKJEN.rest();JKJEN.at(.05,0,.7,.1);JKJEN.face('smug');JKJEN.bandage.forEach(m=>m.visible=true);JKJEN.arms[1].rotation.set(-2.5+Math.sin(u*8)*.2,0,.2);
 JKMP[2].rest();JKMP[2].at(-.7,0,.3,.45);JKMP[2].face('smug');JKMP[3].rest();JKMP[3].at(.8,0,.5,-.45);JKMP[3].face('smug');JKEAR2.visible=true;JKEAR2.scale.setScalar(.5);camTo([0,1.9,5.6],[0,1.9,5.6],[0,1.5,0],[0,1.5,0],0,44)},
j_final:(u,d,k)=>{paSea();ground.visible=true;ground.material.map=grassT;ground.material.needsUpdate=true;water.visible=false;sandR.visible=false;show(JKPED,JKEAR,JKJEN);JKPED.position.set(0,0,0);JKPED.scale.setScalar(1.4);JKEAR.position.set(0,2.55,0);JKEAR.rotation.set(0,Math.sin(u*1.4)*.35,.1);JKEAR.scale.setScalar(2.0);JKJEN.rest();JKJEN.at(1.05,0,.9,-.7);JKJEN.face('bored');JKJEN.arms[1].rotation.set(-2.3,0,.2);camTo([0,2.4,7.8],[0,2.4,7.8],[0,.8,0],[0,.8,0],0,44)}
};
Object.assign(SHOTS,JSH);
// cover: the ear is the hero (front view, big), shocked Jenkins beside it, blurred deck
Object.assign(SHOTS,{jkcover:(u,d,k)=>{show(JKDECK);jkSea();ground.visible=false;water.visible=false;S.background=new THREE.Color(0x7fc3e8);S.fog.color.set(0x7fc3e8);camTo([0,1.85,4.0],[0,1.85,4.0],[0,1.95,0],[0,1.95,0],0,40)},
 jkcoverc:(u,d,k)=>{tkOff();S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.3;show(JKJEN,JKEAR);JKJEN.rest();JKJEN.at(.52,0,0,-.25);JKJEN.face('shock');JKJEN.arms[0].rotation.set(-.5,0,-1.2);JKJEN.arms[1].rotation.set(-.5,0,1.2);JKJEN.bandage.forEach(m=>m.visible=true);JKEAR.position.set(-.3,1.55,.7);JKEAR.rotation.set(0,.05,-.2);JKEAR.scale.setScalar(1.0);camTo([0,1.85,4.0],[0,1.85,4.0],[0,1.95,0],[0,1.95,0],0,40)}});
