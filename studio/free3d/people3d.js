// ===== v5 people: proper human proportions, plaid shirt / dress textures, ink outline (channel line-art look) =====
for(const k in P3CFG)delete P3CFG[k];
Object.assign(P3CFG,{
 man:{skin:'#d6a27c',top:{t:'plaid',a:'#6a4a2a',b:'#2a1a10'},pants:'#8a7a58',shoes:'#e8e8e8',hair:'short',hc:'#2a1c14',w:1.14,h:1.02,sleeve:.34,male:1,stubble:1},
 woman:{skin:'#e2b896',top:{t:'dress',a:'#c4552a',b:'#8a3014'},pants:'#e8e8e8',shoes:'#3a2a20',hair:'long',hc:'#3a2418',w:.84,h:.95,dress:1,sleeve:.3,fem:1,lash:1,lips:'#c42a3c',ring:1},
 womanZ:{skin:'#8aa878',top:{t:'dress',a:'#c4552a',b:'#8a3014'},pants:'#e8e8e8',shoes:'#3a2a20',hair:'long',hc:'#1a2a18',w:.84,h:.95,dress:1,sleeve:.3,zombie:1,fem:1,lash:1,lips:'#c42a3c'},
 manB:{skin:'#c89468',top:{t:'plaid',a:'#4a6a4a',b:'#1a2a1a'},pants:'#5e5a44',shoes:'#e8e8e8',hair:'short',hc:'#1a1410',w:1.2,h:1.03,sleeve:.34,male:1,beard:1},
 vendor3:{skin:'#d6a27c',top:{t:'solid',a:'#2a9a5a'},pants:'#2a2e38',shoes:'#1a1a1a',hair:'short',hc:'#1a1410',w:1.1,h:1,sleeve:.34,male:1,stubble:1},
 womanR:{skin:'#e2b896',top:{t:'dress',a:'#e8c82a',b:'#b89a14'},pants:'#e8e8e8',shoes:'#2a2a2a',hair:'long',hc:'#14100c',w:.84,h:.97,dress:1,sleeve:.3,fem:1,lash:1,lips:'#8a1a2a',ring:1},
 granny:{skin:'#e8cdb4',top:{t:'dress',a:'#7a4a8a',b:'#4a2a5a'},pants:'#e8e8e8',shoes:'#3a2a20',hair:'bun',hc:'#d4d4d8',w:.9,h:.86,dress:1,sleeve:.3,fem:1,glasses:1,lips:'#b4524a'},
 boy:{skin:'#e8b890',top:{t:'solid',a:'#d83a3a'},pants:'#3a5aa8',shoes:'#e8e8e8',hair:'short',hc:'#2a1a10',w:.82,h:.74,sleeve:.3,crop:1},
 shade2:{skin:'#e8e8ee',top:{t:'dress',a:'#dcdce4',b:'#b8b8c4'},pants:'#e8e8e8',shoes:'#9a9aa6',hair:'long',hc:'#050505',w:.84,h:1.12,dress:1,sleeve:.3,fem:1,lash:1},
 shade3:{skin:'#e8e8ee',top:{t:'solid',a:'#c8c8d2'},pants:'#a8a8b4',shoes:'#9a9aa6',hair:'short',hc:'#050505',w:1.2,h:1.18,sleeve:.34,male:1},
 shade4:{skin:'#e8e8ee',top:{t:'solid',a:'#d4d4dc'},pants:'#b0b0bc',shoes:'#9a9aa6',hair:'short',hc:'#050505',w:.82,h:.78,sleeve:.3,crop:1},
 clown:{skin:'#f6f2ec',top:{t:'plaid',a:'#8a3ad8',b:'#f2c230'},pants:'#f2c230',shoes:'#e82a2a',hair:'afro',hc:'#ff6a2a',w:1.05,h:1.0,sleeve:.34,male:1,clown:1,ruff:1},
 punk:{skin:'#e0b090',top:{t:'solid',a:'#16161c'},pants:'#2a2a38',shoes:'#c8c8c8',hair:'mohawk',hc:'#ff3aa0',w:1.1,h:1.04,sleeve:.34,male:1,stubble:1},
 brute:{skin:'#d89a88',top:{t:'solid',a:'#e0dccc'},pants:'#5a6a3a',shoes:'#2a2018',hair:'short',hc:'#3a2018',w:1.55,h:1.18,sleeve:.34,male:1,crop:1,beard:1},
 tall:{skin:'#e8e8ee',top:{t:'solid',a:'#d8d8e2'},pants:'#b8b8c6',shoes:'#9a9aa6',hair:'short',hc:'#050505',w:.95,h:1.55,sleeve:.34,crop:1},
 shade:{skin:'#e8e8ee',top:{t:'solid',a:'#dcdce4'},pants:'#b8b8c4',shoes:'#9a9aa6',hair:'short',hc:'#050505',w:1.0,h:1.28,sleeve:.34,crop:1},
 kid:{skin:'#e8c4a0',top:{t:'solid',a:'#e8c82a'},pants:'#3a5aa8',shoes:'#c82a2a',hair:'long',hc:'#1a1a1a',w:.8,h:.7,sleeve:.3}});

function clothTex(top){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle=top.a;x.fillRect(0,0,128,128);
 if(top.t==='plaid'){x.fillStyle=top.b;x.globalAlpha=.5;for(let i=0;i<128;i+=32){x.fillRect(i,0,12,128);x.fillRect(0,i,128,12)}x.globalAlpha=.85;x.fillRect(0,0,128,3);x.fillRect(0,0,3,128);x.globalAlpha=.25;x.fillStyle='#f4ead0';for(let i=16;i<128;i+=32){x.fillRect(i,0,2,128);x.fillRect(0,i,128,2)}}
 else if(top.t==='dress'){x.fillStyle=top.b;x.globalAlpha=.3;for(let i=0;i<128;i+=32)x.fillRect(0,i+22,128,5);x.globalAlpha=.35;x.fillStyle='#f4d8b0';for(let k=0;k<60;k++){x.beginPath();x.arc((k*37)%128,(k*61)%128,2,0,7);x.fill()}}
 x.globalAlpha=.08;x.fillStyle='#000';for(let i=0;i<500;i++)x.fillRect((i*53)%128,(i*29)%128,1,1);
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=t.minFilter=THREE.LinearFilter;t.generateMipmaps=false;t.encoding=THREE.sRGBEncoding;return t}
function inkOutline(g,k){const ol=new THREE.MeshBasicMaterial({color:0x0a0806,side:THREE.BackSide,fog:true});const list=[];g.traverse(o=>{if(o.isMesh&&!o.userData.noOL&&!o.userData.noInk)list.push(o)});
 list.forEach(m=>{const o=new THREE.Mesh(m.geometry,ol);o.position.copy(m.position);o.rotation.copy(m.rotation);o.scale.copy(m.scale).multiplyScalar(k||1.04);o.userData.noOL=1;m.parent.add(o)})}
// ---- face: transparent painted patch on a curved piece of the head sphere ----
function faceTex(cfg){const c=document.createElement('canvas');c.width=c.height=256;const t=new THREE.CanvasTexture(c);t.minFilter=t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;t.encoding=THREE.sRGBEncoding;return {c,t,cur:''}}
function drawFace(F,cfg0,expr,blink){const key=expr+((blink&&expr!=='zomb'&&expr!=='creep')?'_b':'');if(F.cur===key)return;F.cur=key;blink=key.endsWith('_b');const x=F.c.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,256,256);x.save();x.scale(2,2);x.lineJoin=x.lineCap='round';
 if(expr==='zomb'||expr==='creep'){drawFaceHorror({c:F.c,t:F.t},cfg0,expr)}
 else{
  const sk=cfg0.skin,sh=expr==='shock',wr=expr==='worried',sm=expr==='smile';
  // soft cheek / nose-side shading
  let g=x.createRadialGradient(64,70,6,64,70,64);g.addColorStop(0,'rgba(255,240,225,.18)');g.addColorStop(1,'rgba(120,60,40,.0)');x.fillStyle=g;x.fillRect(0,0,128,128);
  x.fillStyle='rgba(215,110,100,.22)';x.beginPath();x.ellipse(30,78,12,7,0,0,7);x.ellipse(98,78,12,7,0,0,7);x.fill();
  if(cfg0.beard||cfg0.stubble){x.save();x.fillStyle=cfg0.beard?'rgba(30,18,12,.92)':'rgba(40,26,18,.34)';x.beginPath();x.moveTo(6,66);x.quadraticCurveTo(14,100,34,112);x.quadraticCurveTo(64,138,94,112);x.quadraticCurveTo(114,100,122,66);x.quadraticCurveTo(100,90,64,92);x.quadraticCurveTo(28,90,6,66);x.fill();if(!cfg0.beard){x.fillStyle='rgba(30,20,14,.45)';for(let i=0;i<70;i++){x.fillRect(16+((i*37)%96),80+((i*53)%40),1.6,1.6)}}x.restore()}
  // eyes
  const eye=(cx,cy,flip)=>{if(blink){x.strokeStyle='#1a0c08';x.lineWidth=3;x.beginPath();x.moveTo(cx-12,cy+1);x.quadraticCurveTo(cx,cy+7,cx+12,cy+1);x.stroke();if(cfg0.lash){x.lineWidth=1.4;for(let q=0;q<3;q++){x.beginPath();x.moveTo(cx-8+q*8,cy+5);x.lineTo(cx-9+q*8,cy+9);x.stroke()}}return}const r=sh?15:12;x.fillStyle='rgba(60,30,20,.25)';x.beginPath();x.ellipse(cx,cy+1,r+3,r-2,0,0,7);x.fill();
   x.fillStyle='#f6f2ea';x.beginPath();x.ellipse(cx,cy,r,r*(sh?1:.68),0,0,7);x.fill();
   const ir=sh?6.2:7.4;x.fillStyle=cfg0.eye||'#3a2414';x.beginPath();x.arc(cx+flip*1,cy,ir,0,7);x.fill();x.fillStyle='#0a0604';x.beginPath();x.arc(cx+flip*1,cy,ir*.5,0,7);x.fill();x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.arc(cx+flip*1+2.2,cy-2.4,1.9,0,7);x.fill();
   x.strokeStyle='#1a0c08';x.lineWidth=2.4;x.beginPath();x.ellipse(cx,cy,r,r*(sh?1:.68),0,Math.PI*1.05,Math.PI*1.95);x.stroke();
   if(cfg0.lash){x.lineWidth=1.6;for(let k=0;k<4;k++){x.beginPath();x.moveTo(cx-r+2+k*r*.6,cy-r*.55);x.lineTo(cx-r-1+k*r*.6,cy-r*.8);x.stroke()}}};
  eye(40,56,1);eye(88,56,-1);
  if(cfg0.glasses){x.strokeStyle='#2a2a30';x.lineWidth=3;x.beginPath();x.arc(40,56,19,0,7);x.arc(88,56,19,0,7);x.moveTo(59,54);x.lineTo(69,54);x.stroke()}
  // brows
  x.strokeStyle=cfg0.hc||'#2a1a10';x.lineWidth=cfg0.fem?3.2:cfg0.male?7.5:5;const by=sh?34:wr?38:40;
  x.beginPath();x.moveTo(22,by+(wr?-3:3));x.quadraticCurveTo(40,by-5,58,by+(wr?4:2));x.moveTo(70,by+(wr?4:2));x.quadraticCurveTo(88,by-5,106,by+(wr?-3:3));x.stroke();
  // nose shading
  x.strokeStyle='rgba(120,60,40,.45)';x.lineWidth=2.4;x.beginPath();x.moveTo(60,64);x.quadraticCurveTo(56,82,52,88);x.moveTo(68,64);x.quadraticCurveTo(72,82,76,88);x.stroke();x.fillStyle='rgba(60,25,20,.55)';x.beginPath();x.ellipse(57,90,3.2,2,0,0,7);x.ellipse(71,90,3.2,2,0,0,7);x.fill();
  // mouth
  const lip=cfg0.lips||'#b4524a';
  if(sm){x.fillStyle='#3a1210';x.beginPath();x.moveTo(40,100);x.quadraticCurveTo(64,126,88,100);x.quadraticCurveTo(64,106,40,100);x.fill();x.fillStyle='#f4efe6';x.beginPath();x.moveTo(46,101);x.quadraticCurveTo(64,107,82,101);x.quadraticCurveTo(64,113,46,101);x.fill();x.strokeStyle=lip;x.lineWidth=3.4;x.beginPath();x.moveTo(40,100);x.quadraticCurveTo(64,126,88,100);x.stroke()}
  else if(sh){x.fillStyle='#3a1210';x.beginPath();x.ellipse(64,106,9,13,0,0,7);x.fill();x.strokeStyle=lip;x.lineWidth=3;x.stroke()}
  else if(wr){x.strokeStyle=lip;x.lineWidth=4;x.beginPath();x.moveTo(46,108);x.quadraticCurveTo(64,98,82,108);x.stroke()}
  else{x.fillStyle=lip;x.beginPath();x.moveTo(46,104);x.quadraticCurveTo(56,98,64,101);x.quadraticCurveTo(72,98,82,104);x.quadraticCurveTo(64,112,46,104);x.fill();x.strokeStyle='rgba(40,10,10,.7)';x.lineWidth=1.6;x.beginPath();x.moveTo(46,104);x.quadraticCurveTo(64,107,82,104);x.stroke()}
  if(cfg0.stache){x.fillStyle='#2a1a10';x.beginPath();x.moveTo(40,96);x.quadraticCurveTo(64,88,88,96);x.quadraticCurveTo(64,102,40,96);x.fill()}
 }
 x.restore();
 // fade the patch edge into the head sphere
 x.globalCompositeOperation='destination-in';const m=x.createRadialGradient(128,128,70,128,128,128);m.addColorStop(0,'rgba(0,0,0,1)');m.addColorStop(.75,'rgba(0,0,0,1)');m.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=m;x.fillRect(0,0,256,256);x.globalCompositeOperation='source-over';
 F.t.needsUpdate=true}
// ---- body ----
function makePerson(cfg){const g=new THREE.Group(),L=c=>new THREE.MeshLambertMaterial({color:c}),sk=L(cfg.skin);
 const ct=clothTex(cfg.top),sh=new THREE.MeshLambertMaterial({map:ct}),pa=new THREE.MeshLambertMaterial({color:cfg.pants,map:ct===null?null:null});ct.repeat.set(2,2);
 const add=(geo,m,x,y,z,par,rot,sc)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);if(rot)o.rotation.set(rot[0],rot[1],rot[2]);if(sc)o.scale.set(sc[0],sc[1],sc[2]);(par||g).add(o);return o};
 const CAP=(r,l)=>new THREE.CapsuleGeometry(r,l,6,16),SPH=(r)=>new THREE.SphereGeometry(r,20,14),CYL=(a,b,h,s)=>new THREE.CylinderGeometry(a,b,h,s||18);
 const body=new THREE.Group();g.add(body);
 // anatomy: lathe torso (hips-waist-ribs-chest-shoulders), tapered limbs with joint spheres, trapezius, foot shapes
 const lathe=(pts,seg)=>new THREE.LatheGeometry(pts.map(q=>new THREE.Vector2(q[0],q[1])),seg||22);
 const limb=(r0,r1,len,bulge)=>{const pts=[];for(let i=0;i<=6;i++){const a=i/6*Math.PI/2;pts.push([r1*Math.sin(a),-len-r1*Math.cos(a)])}for(let i=1;i<=8;i++){const u=1-i/8;pts.push([r0+(r1-r0)*u+(bulge||0)*Math.sin(u*Math.PI)*r0,-u*len])}for(let i=1;i<=6;i++){const a=i/6*Math.PI/2;pts.push([r0*Math.cos(a),r0*Math.sin(a)])}return lathe(pts,18)};
 const W=cfg.w;
 const upper=add(lathe([[.001,.9],[.158,.92],[.165,.97],[.152,1.06],[.138,1.12],[.14,1.2],[.158,1.28],[.172,1.34],[.17,1.4],[.12,1.45],[.05,1.47],[.001,1.475]],24),sh,0,0,0,body,null,[1.2*W,1,.74]);const torso=upper;
 add(lathe([[.001,.84],[.14,.85],[.165,.9],[.168,.96],[.155,1.02],[.001,1.02]],24),cfg.dress?sh:L(cfg.pants),0,0,0,body,null,[1.2*W,1,.78]);
 add(limb(.052,.034,.1),sk,0,1.5,0,body,null,cfg.male?[1.45,1,1.45]:cfg.fem?[.82,1,.82]:null);add(SPH(.06),sh,.1,1.43,0,body,null,[1.5,.55,1.1]);add(SPH(.06),sh,-.1,1.43,0,body,null,[1.5,.55,1.1]);add(new THREE.TorusGeometry(.066,.014,8,20),sh,0,1.455,0,body,[Math.PI/2,0,0]);
 // legs: thigh -> knee -> calf (bulge) -> ankle -> shoe
 if(cfg.fem)add(new THREE.TorusGeometry(.14,.012,8,24),L('#4a1a14'),0,.99,0,body,[Math.PI/2,0,0],[1.2*W,.76,1]);
 if(cfg.ruff)add(new THREE.TorusGeometry(.1,.032,8,18),L('#f2c230'),0,1.455,0,body,[Math.PI/2,0,0]);
 const legs=[],shins=[];for(const s of[-1,1]){const hip=new THREE.Group();hip.position.set(s*.09*W,.9,0);body.add(hip);
  add(SPH(.085),cfg.dress?sk:L(cfg.pants),0,0,0,hip,null,[1,1.05,1]);
  add(limb(.083,.057,.44,.04),cfg.dress?sk:L(cfg.pants),0,0,0,hip);
  const knee=new THREE.Group();knee.position.set(0,-.46,0);hip.add(knee);add(SPH(.058),cfg.dress?sk:L(cfg.pants),0,0,0,knee);
  add(limb(.056,.034,.38,.22),cfg.dress?sk:L(cfg.pants),0,0,0,knee);if(cfg.dress)add(limb(.047,.036,.16,.05),L('#f2f2ee'),0,-.22,0,knee);
  add(SPH(.038),cfg.dress?sk:L(cfg.pants),0,-.395,0,knee);
  add(SPH(.05),L(cfg.shoes),0,-.43,.055,knee,null,[.95,.55,2.0]);add(SPH(.042),L(cfg.shoes),0,-.415,-.03,knee,null,[1,.9,1]);add(CYL(.048,.052,.02,14),L('#151515'),0,-.455,.05,knee,[Math.PI/2,0,0],[1,1.9,1]);
  legs.push(hip);shins.push(knee)}
 if(cfg.dress){const sk2=add(CYL(.17,.34,.56,32),sh,0,.6,0,body,null,[cfg.w,1,.92]);const pos=sk2.geometry.attributes.position;for(let i=0;i<pos.count;i++){const y=pos.getY(i);if(y<0){const a=Math.atan2(pos.getZ(i),pos.getX(i)),f=1+.045*Math.sin(a*9)*(-y/.28);pos.setX(i,pos.getX(i)*f);pos.setZ(i,pos.getZ(i)*f)}}pos.needsUpdate=true;sk2.geometry.computeVertexNormals()}
 // arms: deltoid -> upper arm -> elbow -> forearm -> wrist -> hand
 const arms=[],fores=[];for(const s of[-1,1]){const sho=new THREE.Group();sho.position.set(s*(.215*W+.05),1.385,0);body.add(sho);
  add(SPH(.06),sh,0,0,0,sho,null,[1,1.1,1]);add(limb(.056,.044,.28,.05),sh,0,0,0,sho);
  const el=new THREE.Group();el.position.set(0,-.29,0);sho.add(el);add(SPH(.043),sk,0,0,0,el);add(limb(.043,.03,.26,.1),sk,0,0,0,el);
  const hand=new THREE.Group();hand.position.set(0,-.285,0);el.add(hand);add(SPH(.032),sk,0,0,0,hand,null,[1,.9,.9]);add(SPH(.04),sk,0,-.05,0,hand,null,[1,1.3,.62]);
  for(let f=0;f<4;f++){const fl=[.045,.052,.048,.04][f];add(limb(.0105,.0075,fl),sk,(f-1.5)*.017,-.075,0,hand,[.12,0,0])}add(limb(.0125,.009,.04),sk,s*.036,-.04,.012,hand,[0,0,s*.8]);
  arms.push(sho);fores.push(el)}
 // head
 const head=new THREE.Group();head.position.set(0,1.5,0);body.add(head);const F=faceTex(cfg);
 const hm=L(cfg.zombie?'#76946c':cfg.skin);const HX=cfg.male?1.08:cfg.fem?.93:1;const hd=add(SPH(.125),hm,0,.165,0,head,null,[HX,1.2,1.07]);if(cfg.male)add(SPH(.07),hm,0,.065,.06,head,null,[1.3,.8,1]);
 add(SPH(.017),hm,0,.145,.138,head,null,[1,1.35,1.15]);add(SPH(.03),hm,.125,.17,0,head,null,[.5,1.2,.9]);add(SPH(.03),hm,-.125,.17,0,head,null,[.5,1.2,.9]);
 const fm=new THREE.MeshLambertMaterial({map:F.t,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
 const patch=new THREE.Mesh(new THREE.SphereGeometry(.1262,24,18,Math.PI/2-.95,1.9,.55,1.8),fm);patch.position.set(0,.17,0);patch.scale.set(HX,1.2,1.07);patch.userData.noOL=1;head.add(patch);
 const hc=L(cfg.hc);
 if(cfg.hair==='long'){add(SPH(.133),hc,0,.19,-.012,head,null,[1,1.18,1.06]);add(CAP(.1,.36),hc,0,-.02,-.075,head,null,[1.15,1,.55]);add(CAP(.03,.3),hc,.118,.0,.0,head);add(CAP(.03,.3),hc,-.118,.0,.0,head);add(SPH(.001),hc,0,0,0,head)}
 else if(cfg.hair==='afro'){add(SPH(.19),hc,0,.35,-.08,head,null,[1.12,.9,.92]);add(SPH(.065),hc,.17,.15,-.02,head);add(SPH(.065),hc,-.17,.15,-.02,head)}
 else if(cfg.hair==='mohawk'){add(SPH(.1315),L(cfg.skin),0,.2,-.03,head,null,[HX,1.0,1.0]);add(SPH(.06),hc,0,.35,-.03,head,null,[.38,1.5,1.7]);add(SPH(.05),hc,0,.3,-.13,head,null,[.38,1.3,1.2])}
 else if(cfg.hair==='bun'){add(SPH(.133),hc,0,.2,-.02,head,null,[1,1.1,1.04]);add(SPH(.062),hc,0,.34,-.07,head,null,[1,.9,1]);add(CAP(.025,.12),hc,.122,.1,0,head);add(CAP(.025,.12),hc,-.122,.1,0,head)}
 else if(cfg.male||cfg.crop){add(SPH(.1315),hc,0,.2,-.03,head,null,[HX,1.02,1.0]);add(CAP(.011,.05),hc,.126*HX,.12,.04,head);add(CAP(.011,.05),hc,-.126*HX,.12,.04,head)}
 else{add(SPH(.1315),hc,0,.19,-.035,head,null,[1,1.1,1.0]);add(CAP(.03,.1),hc,.12,.18,.0,head);add(CAP(.03,.1),hc,-.12,.18,.0,head)}
 if(cfg.clown)add(SPH(.034),L('#e82a2a'),0,.14,.143,head);
 if(cfg.ring){for(const sx of[-1,1]){add(SPH(.015),L('#f0c030'),sx*.128,.115,.005,head);add(SPH(.012),L('#f0c030'),sx*.128,.085,.005,head)}}
 inkOutline(g,1.035);
 g.scale.setScalar(cfg.h);g.userData={dyn:1,parts:{body,torso,legs,arms,head,F,cfg,hm,shins,fores,sk}};
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.45*cfg.w,14),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.45,depthWrite:false}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;bl.userData.dyn=1;g.userData.blob=bl;
 drawFace(F,cfg,'smile');g.visible=false;bl.visible=false;S.add(g);S.add(bl);return g}
