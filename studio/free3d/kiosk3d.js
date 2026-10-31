// ===== low-poly 3D customers + first-person vendor hands for the MIDNIGHT SKEWERS set =====
const P3={},P3CFG={
 auntie3:{skin:'#c89468',shirt:'#d8508a',pants:'#4a3a5a',hair:'bun',hc:'#2a1a14',glasses:1,w:1.18,h:.92},
 lad3:{skin:'#c8946a',shirt:'#3a9a4a',pants:'#22262e',hair:'cap',hc:'#2a6ab0',w:.9,h:.98},
 uncle3:{skin:'#b88458',shirt:'#8a8a5a',pants:'#3a3a3a',hair:'bald',hc:'#000',stache:1,w:1.22,h:1.0},
 girl3:{skin:'#e8c4a0',shirt:'#e8c82a',pants:'#d8b81a',hair:'messy',hc:'#1a1a1a',w:.8,h:.82},
 zom3:{skin:'#8aa878',shirt:'#6a4a3a',pants:'#2a3a4a',hair:'spiky',hc:'#2a3a22',zombie:1,w:1.0,h:1.0}};
function faceTex(cfg){const c=document.createElement('canvas');c.width=c.height=128;const t=new THREE.CanvasTexture(c);t.minFilter=t.magFilter=THREE.NearestFilter;return {c,t,cur:''}}
function drawFace(F,cfg,expr){if(F.cur===expr)return;F.cur=expr;const x=F.c.getContext('2d');x.fillStyle=cfg.skin;x.fillRect(0,0,128,128);x.lineWidth=5;x.strokeStyle='#1a1008';x.lineJoin=x.lineCap='round';
 const eye=(cx,cy,r,p)=>{x.fillStyle=cfg.zombie?'#d8e8a8':'#fff';x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.stroke();x.fillStyle='#1a1008';x.beginPath();x.arc(cx+1,cy+1,p,0,7);x.fill()};
 const sc=expr==='shock'?1.25:1;if(cfg.zombie){x.fillStyle='rgba(30,10,30,.6)';x.beginPath();x.arc(42,52,22,0,7);x.arc(86,52,22,0,7);x.fill()}
 eye(42,52,15*sc,6*(expr==='shock'?.7:1));eye(86,52,15*sc,6*(expr==='shock'?.7:1));
 x.beginPath();if(expr==='worried'||cfg.zombie){x.moveTo(26,34);x.lineTo(56,28);x.moveTo(72,28);x.lineTo(102,34)}else{x.moveTo(26,30);x.lineTo(58,28);x.moveTo(70,28);x.lineTo(102,30)}x.stroke();
 if(cfg.stache){x.fillStyle='#2a1a10';x.beginPath();x.ellipse(64,86,26,9,0,0,7);x.fill()}
 if(cfg.zombie){x.fillStyle='#4a0808';x.beginPath();x.ellipse(64,98,26,16,0,0,7);x.fill();x.stroke();x.fillStyle='#e8e8c8';for(let i=0;i<5;i++)x.fillRect(42+i*9,86,6,9)}
 else if(expr==='smile'){x.beginPath();x.arc(64,86,20,.2,Math.PI-.2);x.stroke()}
 else if(expr==='shock'){x.fillStyle='#4a1010';x.beginPath();x.ellipse(64,98,12,16,0,0,7);x.fill();x.stroke()}
 else{x.beginPath();x.moveTo(48,98);x.lineTo(80,98);x.stroke()}
 if(cfg.glasses){x.lineWidth=4;x.beginPath();x.arc(42,52,22,0,7);x.arc(86,52,22,0,7);x.moveTo(64,52);x.lineTo(64,52);x.stroke()}
 F.t.needsUpdate=true}
function makePerson(cfg){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c}),sk=M(cfg.skin),sh=M(cfg.shirt),pa=M(cfg.pants);
 const bx=(w,h,d,m,x,y,z,par)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(par||g).add(o);return o};
 const body=new THREE.Group();g.add(body);const torso=bx(.52*cfg.w,.64,.3,sh,0,1.12,0,body);
 const legs=[];for(const s of[-1,1]){const p=new THREE.Group();p.position.set(s*.13*cfg.w,.8,0);body.add(p);bx(.18,.8,.2,pa,0,-.4,0,p);bx(.2,.1,.3,M('#16161a'),0,-.82,.05,p);legs.push(p)}
 const arms=[];for(const s of[-1,1]){const p=new THREE.Group();p.position.set(s*(.3*cfg.w+.1),1.4,0);body.add(p);bx(.14,.34,.14,sh,0,-.17,0,p);bx(.12,.3,.12,sk,0,-.49,0,p);bx(.14,.12,.14,sk,0,-.69,0,p);arms.push(p)}
 const head=new THREE.Group();head.position.set(0,1.62,0);body.add(head);const F=faceTex(cfg);const fm=new THREE.MeshLambertMaterial({map:F.t});
 const hb=new THREE.Mesh(new THREE.BoxGeometry(.44,.44,.42),[sk,sk,sk,sk,fm,M(cfg.hair==='bald'||cfg.zombie?cfg.skin:cfg.hc)]);hb.position.y=.24;head.add(hb);
 if(cfg.hair==='bun'){bx(.46,.14,.44,M(cfg.hc),0,.5,0,head);bx(.2,.18,.2,M(cfg.hc),0,.6,-.05,head)}
 else if(cfg.hair==='cap'){bx(.48,.16,.46,M(cfg.hc),0,.5,0,head);bx(.4,.05,.26,M(cfg.hc),0,.46,.3,head);bx(.5,.3,.12,M(cfg.hc),0,.36,-.24,head)}
 else if(cfg.hair==='messy'){bx(.46,.12,.46,M(cfg.hc),0,.5,0,head);bx(.5,.3,.12,M(cfg.hc),0,.36,-.24,head);bx(.1,.16,.1,M(cfg.hc),.2,.6,0,head)}
 else if(cfg.hair==='spiky'){for(let i=-2;i<=2;i++)bx(.08,.2+Math.abs(i)%2*.08,.08,M(cfg.hc),i*.09,.55,0,head);bx(.5,.3,.12,M(cfg.hc),0,.36,-.24,head)}
 g.scale.setScalar(cfg.h);g.userData={dyn:1,parts:{body,torso,legs,arms,head,F,cfg}};
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.45*cfg.w,14),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.45,depthWrite:false}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;bl.userData.dyn=1;g.userData.blob=bl;
 drawFace(F,cfg,'smile');g.visible=false;bl.visible=false;S.add(g);S.add(bl);return g}
// first-person hands + items
const HANDS={g:new THREE.Group(),arm:[],hand:[],items:{}};
function buildHands(){const skin=new THREE.MeshLambertMaterial({color:'#c8946a'}),sleeve=new THREE.MeshLambertMaterial({color:'#2a9a5a'});
 for(let i=0;i<2;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(.085,.085,1),sleeve),h=new THREE.Group();const palm=new THREE.Mesh(new THREE.BoxGeometry(.13,.05,.15),skin);h.add(palm);for(let f=0;f<4;f++){const fi=new THREE.Mesh(new THREE.BoxGeometry(.025,.03,.09),skin);fi.position.set(-.045+f*.03,0,-.1);h.add(fi)}const th=new THREE.Mesh(new THREE.BoxGeometry(.04,.03,.07),skin);th.position.set(.08*(i?-1:1),0,-.03);h.add(th);HANDS.g.add(a);HANDS.g.add(h);HANDS.arm.push(a);HANDS.hand.push(h)}
 const M=c=>new THREE.MeshLambertMaterial({color:c});
 const sk=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.34,5),M('#c8a86a'));st.rotation.x=Math.PI/2;sk.add(st);for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.05,.04,.06),M(i%2?'#7a3a1a':'#8a4a22'));m.position.z=-.08+i*.075;sk.add(m)}sk.position.set(0,.02,-.12);sk.scale.setScalar(2.4);
 const cup=new THREE.Group();const cm=new THREE.Mesh(new THREE.CylinderGeometry(.045,.035,.13,8),new THREE.MeshLambertMaterial({color:'#d8801a',transparent:true,opacity:.9}));cup.add(cm);const sr=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,.12,4),M('#d8342a'));sr.position.set(.015,.1,0);sr.rotation.z=-.2;cup.add(sr);cup.position.set(0,.06,-.06);cup.scale.setScalar(1.5);
 const coin=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.006,10),new THREE.MeshBasicMaterial({color:0xf0c030}));coin.rotation.x=Math.PI/2;coin.position.set(0,.04,-.08);coin.scale.setScalar(2.4);
 const hd=new THREE.Group();const bun=new THREE.Mesh(new THREE.BoxGeometry(.05,.045,.2),M('#e0b060'));hd.add(bun);const sg=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.23,6),M('#c8382a'));sg.rotation.x=Math.PI/2;sg.position.y=.03;hd.add(sg);const mu=new THREE.Mesh(new THREE.BoxGeometry(.012,.006,.18),M('#f0d020'));mu.position.y=.056;hd.add(mu);hd.position.set(0,.0,-.1);hd.scale.setScalar(1.3);
 const cola=cup.clone();cola.traverse(o=>{if(o.isMesh&&o.geometry.type==='CylinderGeometry'&&o.material.transparent)o.material=new THREE.MeshLambertMaterial({color:'#5a1a10'})});
 HANDS.items={skewer:sk,tea:cup,coin,hotdog:hd,cola};for(const k in HANDS.items){HANDS.items[k].visible=false;HANDS.hand[1].add(HANDS.items[k])}
 HANDS.g.userData={dyn:1};HANDS.g.visible=false;S.add(HANDS.g)}
// poses: hand targets in camera space (x right, y up, -z forward)
const POSE={idle:[[-.26,-.34,-.55],[.26,-.34,-.55]],grill:[[-.42,-.36,-.95],[-.18,-.42,-.8]],give:[[-.26,-.34,-.55],[.04,-.22,-.95]],take:[[-.26,-.34,-.55],[.12,-.2,-.7]],refuse:[[-.22,-.06,-.85],[.22,-.06,-.85]],pour:[[-.26,-.34,-.55],[.3,-.08,-.75]]};
function updateHands(sh,t,lt,cam){const hs=sh.hands;if(!hs||!hs.length){HANDS.g.visible=false;return}HANDS.g.visible=true;HANDS.g.position.copy(cam.position);HANDS.g.quaternion.copy(cam.quaternion);HANDS.g.updateMatrixWorld(true);
 let cur=null;for(const s of hs)if(lt>=s.t0&&lt<s.t1){cur=s;break}
 let a=POSE.idle,b=POSE.idle,k=0,item=null;if(cur){const m=Math.max(.001,cur.t1-cur.t0),u=(lt-cur.t0)/m;const up=Math.min(1,u/.3),dn=Math.min(1,(1-u)/.3);k=Math.min(up,dn);k=k*k*(3-2*k);b=POSE[cur.pose]||POSE.idle;item=cur.item||null}
 const bob=Math.sin(t*1.6)*.004;
 for(let i=0;i<2;i++){const p0=POSE.idle[i],p1=b[i];const tx=p0[0]+(p1[0]-p0[0])*k,ty=p0[1]+(p1[1]-p0[1])*k+bob,tz=p0[2]+(p1[2]-p0[2])*k;const sx=i?.3:-.3,sy=-.55,sz=.05;const dx=tx-sx,dy=ty-sy,dz=tz-sz,L=Math.hypot(dx,dy,dz);
  const arm=HANDS.arm[i];arm.position.set((sx+tx)/2,(sy+ty)/2,(sz+tz)/2);arm.scale.z=L;arm.lookAt(HANDS.g.localToWorld(new THREE.Vector3(tx,ty,tz)));
  const h=HANDS.hand[i];h.position.set(tx,ty,tz);h.rotation.set(i?-.25:-.1,0,0)}
 for(const key in HANDS.items)HANDS.items[key].visible=!!(item&&key===item&&k>.05)}
function update3D(sh,t,lt,dur,cam){for(const k in P3){P3[k].visible=false;P3[k].userData.blob.visible=false}
 for(const c of (sh.p3||[])){const g=P3[c.who];if(!g)continue;g.visible=true;const pr=g.userData.parts;let x=c.pos[0],z=c.pos[1],mv=false;
  if(c.to){const uu=Math.min(1,Math.max(0,(lt-(c.t0||0))/Math.max(.01,(c.t1||dur)-(c.t0||0))));const e=uu*uu*(3-2*uu);x=c.pos[0]+(c.to[0]-c.pos[0])*e;z=c.pos[1]+(c.to[1]-c.pos[1])*e;mv=uu>0&&uu<1}
  g.position.set(x,0,z);let yaw;if(mv&&c.to)yaw=Math.atan2(c.to[0]-c.pos[0],c.to[1]-c.pos[1]);else if(c.face)yaw=Math.atan2(c.face[0]-x,c.face[1]-z);else yaw=Math.atan2(cam.position.x-x,cam.position.z-z);g.rotation.y=yaw;
  const w=mv?Math.sin(t*7.5):0,br=c.still?0:Math.sin(t*1.8+x)*.012;pr.legs[0].rotation.x=w*.6;pr.legs[1].rotation.x=-w*.6;pr.arms[0].rotation.x=-w*.5;pr.arms[1].rotation.x=w*.5;
  pr.body.position.y=mv?Math.abs(w)*.04:0;pr.torso.scale.y=1+br*1.5;pr.body.rotation.z=c.still?0:Math.sin(t*.9+x)*.01;
  pr.head.rotation.x=0;pr.head.rotation.y=0;
  // hand-over: right arm reaches to the vendor
  const gv=c.give;if(gv&&lt>=gv.t0&&lt<gv.t1){const u=(lt-gv.t0)/(gv.t1-gv.t0),kk=Math.sin(Math.min(1,u)*Math.PI);pr.arms[1].rotation.x=-1.35*Math.min(1,kk*1.4)}
  const gs=c.gesture;if(gs&&lt>=gs.t0&&lt<gs.t1){const u=(lt-gs.t0)/(gs.t1-gs.t0);pr.arms[0].rotation.x=-2.4*Math.min(1,Math.sin(u*Math.PI)*1.5);pr.arms[0].rotation.z=.2}
  drawFace(pr.F,pr.cfg,c.expr||'calm');const bl=g.userData.blob;bl.visible=!c.noShadow;bl.position.set(x,.02,z)}}
function buildPeople3D(){for(const k in P3CFG)P3[k]=makePerson(P3CFG[k]);buildHands()}
