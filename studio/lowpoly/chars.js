// PS1-style characters: real proportions, tapered limbs, painted dithered textures (reference: low-poly man with pixel-dither shirt/jeans)
const ACT=[];
function hexRGB(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function shade(h,f){const c=hexRGB(h).map(v=>Math.max(0,Math.min(255,Math.round(v*f))));return 'rgb('+c.join(',')+')'}
// dithered fabric / skin texture
const FAB={};
function fab(col,o={}){const k=col+JSON.stringify(o);if(FAB[k])return FAB[k];
 return FAB[k]=ctex(o.w||32,o.h||32,(x,w,h)=>{
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const g=1-.22*(j/h)*(o.grad??1);const n=(rn(i*7+j*131+(o.seed||0))-.5)*(o.noise??.16);const dith=((i+j)%2?.04:-.04);x.fillStyle=shade(col,g+n+dith);x.fillRect(i,j,1,1)}
  if(o.draw)o.draw(x,w,h)})}
// head texture (equirect 256x128, face centred at x=64)
const FC={};
function faceTex(st,skin,hair,o={}){const k=st+skin+hair+(o.stubble?1:0)+(o.brow||'');if(FC[k])return FC[k];
 return FC[k]=ctex(256,128,(x,w,h)=>{
  const px=(c,a,b,ww=1,hh=1)=>{x.fillStyle=c;x.fillRect(a,b,ww,hh)};
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const n=(rn(i*3+j*91)-.5)*.1,g=1-.18*Math.abs(j-60)/68;px(shade(skin,g+n+((i+j)%2?.03:-.03)),i,j)}
  // hair: back/sides + fringe
  const hc=hair;for(let j=0;j<h;j++)for(let i=0;i<w;i++){const fr=(i>30&&i<98);const lim=fr?(26+Math.floor(rn(i*5)*8)):66;const side=(i<22||i>106);if(j<lim&&(!fr||j<lim)&&!(fr&&false)){if(fr||side||i>=100||i<30)px(shade(hc,.8+rn(i*13+j*7)*.4+((i+j)%2?.06:-.06)),i,j)}}
  for(let j=66;j<100;j++)for(let i=128;i<256;i++){if(j<84&&(i>150)){px(shade(hc,.75+rn(i*13+j*7)*.35),i,j)}}
  const K='#1a1210',lip=shade(skin,.62);
  const ex=[53,75];
  const eye=(cx,wd,ht,dx=0,dy=0)=>{px('#f4efe6',cx-wd/2,56-ht/2,wd,ht);px('#4a3524',cx-2+dx,56-2+dy,4,4);px('#0a0a0a',cx-1+dx,56-1+dy,2,2);px('rgba(40,20,10,.55)',cx-wd/2,56-ht/2-1,wd,1)};
  const brow=(cx,a,b,l=11)=>{x.strokeStyle=shade(hair,.7);x.lineWidth=2.2;x.beginPath();x.moveTo(cx-l/2,a);x.lineTo(cx+l/2,b);x.stroke()};
  const mouth=(pts,c=K)=>{x.strokeStyle=c;x.lineWidth=2;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()};
  // nose shading
  px(shade(skin,.72),60,64,2,6);px(shade(skin,.72),67,64,2,6);px(shade(skin,.55),61,70,2,1);px(shade(skin,.55),66,70,2,1);
  if(st==='neutral'){eye(ex[0],10,6);eye(ex[1],10,6);brow(ex[0],47,47);brow(ex[1],47,47);mouth([[55,84],[73,84]],lip)}
  else if(st==='angry'){eye(ex[0],9,4,1,1);eye(ex[1],9,4,-1,1);brow(ex[0],44,50);brow(ex[1],50,44);px(shade(skin,.7),58,50,12,1);mouth([[53,88],[58,82],[70,82],[75,88]],K);px('#f4efe6',59,83,10,2)}
  else if(st==='shock'){eye(ex[0],12,10);eye(ex[1],12,10);brow(ex[0],41,39);brow(ex[1],39,41);px('#2a0a0a',60,80,8,10);px('#c04a4a',62,86,4,3)}
  else if(st==='smug'){eye(ex[0],10,5,2,1);eye(ex[1],10,5,2,1);px(shade(skin,.9),ex[0]-5,53,10,3);px(shade(skin,.9),ex[1]-5,53,10,3);brow(ex[0],46,47);brow(ex[1],45,43);mouth([[56,84],[68,84],[75,79]],lip)}
  else if(st==='sweat'){eye(ex[0],11,8);eye(ex[1],11,8);brow(ex[0],44,48);brow(ex[1],48,44);mouth([[54,86],[58,82],[64,86],[70,82],[75,86]],K);px('#6ac4ff',92,48,3,6);px('#6ac4ff',34,60,3,5)}
  else if(st==='bored'){eye(ex[0],10,6);eye(ex[1],10,6);px(shade(skin,.88),ex[0]-5,53,10,3);px(shade(skin,.88),ex[1]-5,53,10,3);brow(ex[0],48,48);brow(ex[1],48,48);mouth([[57,86],[71,86]],lip)}
  else if(st==='happy'){eye(ex[0],10,6);eye(ex[1],10,6);brow(ex[0],46,45);brow(ex[1],45,46);mouth([[53,80],[58,87],[70,87],[75,80]],K);px('#f4efe6',59,83,10,2)}
  if(o.stubble)for(let i=0;i<110;i++){px(shade(skin,.6),36+rn(i)*56,76+rn(i+9)*26,1,1)}
 })}
function pigFaceTex(st){const k='pig'+st;if(FC[k])return FC[k];
 return FC[k]=ctex(256,128,(x,w,h)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++){x.fillStyle=shade('#f2a2b6',1-.14*Math.abs(j-60)/68+(rn(i*3+j*91)-.5)*.1+((i+j)%2?.03:-.03));x.fillRect(i,j,1,1)}
  x.strokeStyle='#1a1210';x.lineWidth=3;
  if(st==='pigalive'){for(const cx of[42,86]){x.fillStyle='#1a1210';x.fillRect(cx-3,50,6,7);x.fillStyle='#fff';x.fillRect(cx-3,50,2,2)}}
  else if(st==='pigdead'){for(const cx of[42,86]){x.beginPath();x.moveTo(cx-5,48);x.lineTo(cx+5,60);x.moveTo(cx+5,48);x.lineTo(cx-5,60);x.stroke()}}
  else if(st==='pigghost'){for(const cx of[42,86]){x.beginPath();x.moveTo(cx-5,58);x.lineTo(cx,50);x.lineTo(cx+5,58);x.stroke()}}
  else {for(const cx of[42,86]){x.beginPath();x.moveTo(cx-5,54);x.lineTo(cx+5,54);x.stroke()}}
 })}
function limb(rt,rb,h,seg,tex,y){const g=new THREE.CylinderGeometry(rt,rb,h,seg);const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({map:tex,flatShading:true}));m.position.y=y;return m}
function person(o){const g=new THREE.Group();const skin=o.skin||'#e8b894';const hair=o.hair||'#4a3020';const P={g,skin,hair};
 const coatT=fab(o.coat,{seed:1,draw:o.torsoDraw?(x,w,h)=>o.torsoDraw(x,w,h):null,w:64,h:32});const sleeveT=fab(o.sleeve||o.coat,{seed:2});const pantT=fab(o.pants,{seed:3,noise:.2});const skinT=fab(skin,{seed:4,noise:.08});
 // torso (front at u=.5)
 const tg=new THREE.CylinderGeometry(.27,.21,.66,8);tg.rotateY(Math.PI);const torso=new THREE.Mesh(tg,new THREE.MeshLambertMaterial({map:coatT,flatShading:true}));torso.scale.set(1.15,1,.66);torso.position.y=1.18;g.add(torso);
 const hips=new THREE.Mesh(new THREE.CylinderGeometry(.21,.2,.2,8),new THREE.MeshLambertMaterial({map:pantT,flatShading:true}));hips.scale.set(1.15,1,.7);hips.position.y=.88;g.add(hips);
 if(o.belt){const b=new THREE.Mesh(new THREE.CylinderGeometry(.216,.216,.06,8),M(0x2a1a10));b.scale.set(1.15,1,.7);b.position.y=.93;g.add(b)}
 g.add(limb(.07,.09,.12,6,skinT,1.55));
 // legs
 P.legs=[-.12,.12].map(x=>{const p=new THREE.Group();p.position.set(x,.93,0);g.add(p);p.add(limb(.105,.085,.45,6,pantT,-.22));p.add(limb(.08,.058,.42,6,pantT,-.66));const sh=box(.13,.09,.3,M(0x1c1c20),0,-.9,.05,p);return p});
 // arms
 P.arms=[-.34,.34].map(x=>{const p=new THREE.Group();p.position.set(x,1.47,0);g.add(p);const sl=o.shortSleeve?skinT:sleeveT;p.add(limb(.075,.065,.34,6,sleeveT,-.17));const f=limb(.06,.045,.32,6,o.shortSleeve?skinT:sleeveT,-.5);p.add(f);const hd=new THREE.Mesh(new THREE.IcosahedronGeometry(.055,0),new THREE.MeshLambertMaterial({map:skinT,flatShading:true}));hd.scale.set(1,1.3,.8);hd.position.y=-.7;p.add(hd);return p});
 // head
 P.head=new THREE.Group();P.head.position.set(0,1.76,0);g.add(P.head);
 P.fm=new THREE.MeshLambertMaterial({map:faceTex('neutral',skin,hair,o),flatShading:false});
 const hg=new THREE.SphereGeometry(.17,12,9);const hm=new THREE.Mesh(hg,P.fm);hm.scale.set(.92,1.12,1.0);P.head.add(hm);
 if(o.hairCap){const hm2=new THREE.MeshLambertMaterial({map:fab(hair,{seed:9,noise:.32,w:32,h:32}),flatShading:true});const hc=new THREE.Mesh(new THREE.SphereGeometry(.186,10,7,0,Math.PI*2,0,1.0),hm2);hc.scale.set(.97,1.14,1.08);hc.position.set(0,.012,-.014);P.head.add(hc);const bk=new THREE.Mesh(new THREE.SphereGeometry(.176,10,7,0,Math.PI*2,0,1.9),hm2);bk.scale.set(.96,1.1,1.0);bk.position.set(0,.005,-.03);P.head.add(bk);const tf=box(.16,.07,.09,hm2,.02,.205,.11,P.head);tf.rotation.set(-.35,0,.15);const tf2=box(.12,.06,.08,hm2,-.07,.19,.13,P.head);tf2.rotation.set(-.3,0,-.2)}
 const nose=cone(.032,.07,4,new THREE.MeshLambertMaterial({map:skinT,flatShading:true}),0,-.015,.175,P.head);nose.rotation.x=Math.PI/2;nose.rotation.y=Math.PI/4;
 for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.04,0),new THREE.MeshLambertMaterial({map:skinT,flatShading:true}));e.scale.set(.4,1,.7);e.position.set(sx*.16,-.01,-.01);P.head.add(e)}
 const h=o.hat;const dark=M(0x16161a);
 if(h==='straw'){cyl(.3,.3,.03,10,M(0xe8c860),0,.11,0,P.head);cyl(.17,.19,.17,10,M(0xe8c860),0,.2,0,P.head);cyl(.19,.19,.04,10,M(0x9a3020),0,.15,0,P.head)}
 if(h==='shako'){cyl(.15,.17,.3,8,dark,0,.3,0,P.head);cyl(.2,.2,.03,8,dark,0,.15,.04,P.head);box(.05,.2,.05,M(0xffffff),0,.5,0,P.head);box(.2,.04,.02,M(0xf0d040),0,.28,.16,P.head)}
 if(h==='kepi'){cyl(.18,.2,.13,8,M(0x1c2c5c),0,.17,0,P.head);box(.3,.02,.14,dark,0,.12,.2,P.head)}
 if(h==='pickel'){cyl(.185,.2,.12,8,dark,0,.15,0,P.head);cone(.15,.2,4,dark,0,.29,0,P.head);cyl(.012,.012,.12,5,M(0xf0d040),0,.43,0,P.head);box(.1,.08,.02,M(0xf0d040),0,.16,.19,P.head)}
 if(o.stache)box(.2,.05,.05,M(o.stache),0,-.07,.17,P.head);
 if(o.beard)box(.22,.1,.12,M(o.beard),0,-.14,.12,P.head);
 if(o.gun){const gg=new THREE.Group();gg.position.set(.16,1.4,.3);g.add(gg);cyl(.018,.018,1.2,6,M(0x2a2a2e),0,0,.35,gg).rotation.x=Math.PI/2;box(.07,.12,.4,M(0x6a3a18),0,-.03,-.2,gg);P.gun=gg}
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.5,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);
 P.face=s=>{P.fm.map=faceTex(s,skin,hair,o)};
 P.walk=(t,sp=7,am=.7)=>{P.legs[0].rotation.x=Math.sin(t*sp)*am;P.legs[1].rotation.x=-Math.sin(t*sp)*am;P.arms[0].rotation.x=-Math.sin(t*sp)*am*.8;P.arms[1].rotation.x=Math.sin(t*sp)*am*.8;P.g.position.y=Math.abs(Math.sin(t*sp))*.06};
 P.rest=()=>{P.legs.forEach(l=>l.rotation.set(0,0,0));P.arms.forEach(a=>a.rotation.set(0,0,0));P.head.rotation.set(0,0,0);P.g.position.y=0;P.g.rotation.set(0,0,0)};
 P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.y=ry};
 S.add(g);ACT.push(g);return P}

function pigModel(){const g=new THREE.Group();const root=new THREE.Group();root.position.y=.55;root.add(g);g.position.y=-.55;const P={root,g};
 const pinkT=fab('#f2a2b6',{seed:5,noise:.1}),darkT=fab('#d97890',{seed:6,noise:.1});P.mats=[];
 const bm=new THREE.MeshLambertMaterial({map:pinkT,flatShading:true});P.mats.push(bm);
 const body=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),bm);body.scale.set(.72,.68,1.12);body.position.y=.62;g.add(body);
 P.legs=[[-.22,.4],[.22,.4],[-.22,-.4],[.22,-.4]].map(([x,z])=>{const p=new THREE.Group();p.position.set(x,.36,z);g.add(p);const dm=new THREE.MeshLambertMaterial({map:darkT,flatShading:true});P.mats.push(dm);p.add(limb(.085,.065,.3,6,darkT,-.15));p.add(box(.1,.06,.12,M(0x3a2a2a),0,-.31,.02));return p});
 P.head=new THREE.Group();P.head.position.set(0,.7,.62);g.add(P.head);
 P.fm=new THREE.MeshLambertMaterial({map:pigFaceTex('pigalive')});const hm=new THREE.Mesh(new THREE.SphereGeometry(.27,10,8),P.fm);hm.scale.set(1,.95,.95);P.head.add(hm);
 const sn=cyl(.12,.13,.16,8,new THREE.MeshLambertMaterial({map:darkT,flatShading:true}),0,-.06,.27,P.head);sn.rotation.x=Math.PI/2;
 box(.04,.05,.02,M(0x5a1020),-.05,-.06,.36,P.head);box(.04,.05,.02,M(0x5a1020),.05,-.06,.36,P.head);
 for(const sx of[-1,1]){const e=cone(.11,.2,3,new THREE.MeshLambertMaterial({map:darkT,flatShading:true}),sx*.19,.24,-.02,P.head);e.rotation.z=-sx*.7;e.rotation.x=.3}
 const tail=new THREE.Mesh(new THREE.TorusGeometry(.08,.03,5,7),M(0xd97890));tail.position.set(0,.8,-.6);g.add(tail);
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.8,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);P.bl=bl;
 P.state=s=>{P.fm.map=pigFaceTex(s)};
 P.at=(x,z,ry)=>{root.position.set(x,.55,z);root.rotation.set(0,ry,0)};
 S.add(root);ACT.push(root);return P}
