// Clip: Octopus (three hearts).  Sets/props that belong to the topic: sea floor, seaweed, coral, rocks, light rays, bubbles, octopus with 3 heart icons, Poly in a dive mask + tank, a vial of blue blood.
const OCSAND=ctex(64,64,(x,w,h)=>{x.fillStyle='#e3cf94';x.fillRect(0,0,w,h);for(let i=0;i<260;i++){x.fillStyle=['#d4bd7e','#efdca4','#c8b070'][i%3];x.fillRect(rn(i)*w,rn(i+9)*h,2,2)}x.fillStyle='rgba(120,100,60,.25)';for(let j=6;j<h;j+=14)x.fillRect(0,j,w,2)},[22,22]);
const OCSEA=ctex(2,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2e9ad8');g.addColorStop(.6,'#126aa8');g.addColorStop(1,'#08406e');x.fillStyle=g;x.fillRect(0,0,w,h)});
const OCDECOR=(()=>{const g=new THREE.Group();
 for(const [x,z,s,c] of[[-2.1,-1.6,1,0x7a8090],[2.3,-2.1,1.25,0x6a7284],[.9,-3.2,1.6,0x7a8090],[-1.0,-3.4,1.2,0x6a7284],[3.2,-.5,.8,0x7a8090]]){const r=new THREE.Mesh(new THREE.IcosahedronGeometry(.55*s,0),M(c));r.scale.set(1,.7,.9);r.position.set(x,.25*s,z);g.add(r)}
 g.userData.weed=[];for(let i=0;i<9;i++){const w=new THREE.Group();const col=i%2?0x2f9a52:0x3fb064;for(let j=0;j<6;j++){const seg=box(.16-.012*j,.34,.1,M(col),0,.17+j*.32,0,w);seg.userData.j=j}w.position.set(-3+i*.8+rn(i)*.3,0,-2.6-rn(i+3)*1.2);w.userData.ph=i;g.add(w);g.userData.weed.push(w)}
 for(const [x,z,c] of[[1.6,-1.3,0xff6a8a],[-1.5,-2.2,0xffa04a],[2.6,-1.4,0xe05ad8]]){const cg=new THREE.Group();for(let i=0;i<5;i++){const k=cone(.1,.55+.15*i%3,5,M(c),(i-2)*.12,.3,(i%2)*.1,cg);k.rotation.z=(i-2)*.22}cg.position.set(x,0,z);g.add(cg)}
 for(let i=0;i<4;i++){const ray=box(.6,16,.05,new THREE.MeshBasicMaterial({color:0xcff4ff,transparent:true,opacity:.07}),-3+i*2.2,7,-4.2,g);ray.rotation.z=.32}
 S.add(g);ACT.push(g);return g})();
const OCBUB=[...Array(16)].map((_,i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.06+.05*rn(i),0),new THREE.MeshBasicMaterial({color:0xdff6ff,transparent:true,opacity:.7}));S.add(m);ACT.push(m);return m});
function ocBubbles(x,y,z,u,spread=.25,rate=1.2){OCBUB.forEach((m,i)=>{const a=((u*rate+i/OCBUB.length)%1);m.visible=true;m.position.set(x+Math.sin(i*2.3+u*3)*spread*a,y+a*2.4,z+Math.cos(i*1.7)*spread*.5)})}
// octopus
const OCCOL=0xe5663a,OCCOL2=0xc84a28;
const OCT=(()=>{const g=new THREE.Group();const B=new THREE.Group();g.add(B);
 const mant=new THREE.Mesh(new THREE.IcosahedronGeometry(.52,1),M(OCCOL));mant.scale.set(1,1.18,1);B.add(mant);const cap=new THREE.Mesh(new THREE.IcosahedronGeometry(.36,1),M(OCCOL2));cap.position.set(0,.3,-.1);cap.scale.set(1,.9,1);B.add(cap);
 const eyes=[];for(const sx of[-1,1]){const e=box(.2,.2,.08,M(0xffffff),sx*.26,.1,.45,B);const p=box(.09,.12,.05,M(0x111111),sx*.26,.09,.5,B);const lid=box(.22,.11,.1,M(OCCOL),sx*.26,.2,.49,B);lid.visible=false;eyes.push(lid)}
 const hs=new THREE.Shape();hs.moveTo(0,-.5);hs.bezierCurveTo(-.9,.1,-.5,.8,0,.35);hs.bezierCurveTo(.5,.8,.9,.1,0,-.5);const hg=new THREE.ExtrudeGeometry(hs,{depth:.18,bevelEnabled:false});hg.center();
 const hearts=[[0,-.28,.62,.3],[-.4,-.02,.5,.2],[.4,-.02,.5,.2]].map(([x,y,z,sc],i)=>{const m=new THREE.Mesh(hg,new THREE.MeshBasicMaterial({color:0xff3a5a}));m.scale.setScalar(sc*1.15);m.position.set(x,y,z);m.userData.base=sc*1.15;m.userData.i=i;B.add(m);return m});
 const tent=[...Array(8)].map((_,i)=>[...Array(7)].map((_,j)=>{const sz=.17*(1-.68*j/6);const m=box(sz,sz,sz,M(j%2?OCCOL:OCCOL2));g.add(m);return m}));
 g.userData={B,mant,eyes,hearts,tent};S.add(g);ACT.push(g);return g})();
function ocPose(mode,t,x,z,ry,o={}){const U=OCT.userData;OCT.position.set(x,0,z);OCT.rotation.set(0,ry,0);U.B.position.y=({float:.9,swim:.8,crawl:.5,limp:.32})[mode]+(mode==='float'?Math.sin(t*2)*.05:0);U.B.rotation.set(mode==='swim'?-.5:0,0,mode==='limp'?.18:0);
 U.eyes.forEach(l=>l.visible=!!o.tired);
 U.tent.forEach((T,i)=>{const a=i/8*Math.PI*2+.2;T.forEach((m,j)=>{const s=(j+1)/T.length;let px,py,pz;
  if(mode==='swim'){const sp=(i-3.5)*.09;px=sp*(.4+s)+Math.sin(t*9+i+j)*.025;py=.62-s*.12+Math.sin(t*7+j)*.03;pz=-.25-s*1.55}
  else if(mode==='crawl'){px=Math.cos(a)*(.32+s*1.05)+Math.sin(t*5+j+i)*.05;pz=Math.sin(a)*(.32+s*1.05)+Math.cos(t*5+j)*.05;py=.1+Math.abs(Math.sin(t*4+j*.9+i))*.07+(1-s)*.2}
  else if(mode==='limp'){px=Math.cos(a)*(.3+s*1.0);pz=Math.sin(a)*(.3+s*1.0);py=.07+(1-s)*.14}
  else{px=Math.cos(a)*(.3+s*.45)+Math.sin(t*2+j)*.05;pz=Math.sin(a)*(.3+s*.45);py=.62-s*.55+Math.sin(t*2.5+i+j*.6)*.05}
  m.position.set(px,py,pz)})});
 U.hearts.forEach(h=>{const stop=o.stopped&&h.userData.i===0;const hl=o.hl&&o.hl.includes(h.userData.i);h.visible=!o.noHearts;h.material.color.set(stop?0x6a6a7a:hl?0xffe14a:0xff3a5a);const pul=stop?1:1+.16*Math.sin(t*9+h.userData.i*1.3);h.scale.setScalar(h.userData.base*pul*(hl?1.25:1))})}
// diver Poly: mask + tank
const OCDIVE=(()=>{const a=[];const mask=box(.44,.15,.06,new THREE.MeshBasicMaterial({color:0x9af0ff,transparent:true,opacity:.28}),0,.05,.285,POLY.head);const strap=box(.46,.05,.3,tkDark,0,.13,.02,POLY.head);const tank=cyl(.14,.14,.75,8,M(0xe8c040),0,1.25,-.3,POLY.g);const t2=cyl(.14,.14,.75,8,M(0xe8c040),.26,1.25,-.3,POLY.g);const noz=box(.08,.18,.08,tkMetal,0,1.7,-.3,POLY.g);[mask,strap,tank,t2,noz].forEach(m=>{m.visible=false;a.push(m)});return a})();
const OCVIAL=(()=>{const g=new THREE.Group();cyl(.14,.14,.5,8,new THREE.MeshBasicMaterial({color:0xcff4ff,transparent:true,opacity:.35}),0,0,0,g);cyl(.115,.115,.34,8,new THREE.MeshBasicMaterial({color:0x2a7aff}),0,-.07,0,g);cyl(.16,.16,.08,8,M(0x8a5028),0,.28,0,g);const coin=cyl(.22,.22,.04,10,M(0xc87a3a),.45,.1,0,g);coin.rotation.x=1.1;S.add(g);ACT.push(g);return g})();
const _ochide=hideAll;hideAll=function(){_ochide();ground.material.map=grassT;ground.material.needsUpdate=true;OCDIVE.forEach(m=>m.visible=false);OCT.userData.hearts.forEach(h=>h.visible=true)};
function ocEnv(t){ground.material.map=OCSAND;ground.material.needsUpdate=true;ground.visible=true;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);S.background=OCSEA;S.fog.color.set(0x126aa8);S.fog.near=4;S.fog.far=34;HEMI.intensity=1.15;show(OCDECOR);
 OCDECOR.userData.weed.forEach(w=>w.children.forEach((s,j)=>{s.position.x=Math.sin(t*1.6+w.userData.ph+j*.5)*.05*j}))}
function ocDiver(x,z,ry,face){show(POLY);POLY.rest();POLY.at(x,0,z,ry);POLY.face(face||'bored');OCDIVE.forEach(m=>m.visible=true)}

// ---- gags: BRB sign on the stopped heart, sunglasses, headband, sweat, dumbbells ----
function ocSignTex(txt,bg,fg){const t=ctex(128,48,(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle='#222';x.lineWidth=4;x.strokeRect(2,2,w-4,h-4);x.fillStyle=fg;x.font='bold 20px RC,Arial';x.textAlign='center';x.fillText(txt,w/2,31)});t.generateMipmaps=false;return t}
const OCSIGN=(()=>{const g=new THREE.Group();const board=new THREE.Mesh(new THREE.PlaneGeometry(.62,.23),new THREE.MeshBasicMaterial({map:ocSignTex('BE RIGHT BACK','#ffe14a','#222'),side:THREE.DoubleSide}));board.position.y=-.2;g.add(board);box(.02,.2,.02,tkDark,-.24,-.02,0,g);box(.02,.2,.02,tkDark,.24,-.02,0,g);g.visible=false;OCT.userData.B.add(g);g.position.set(0,-.12,.74);return g})();
const OCSUN=(()=>{const g=new THREE.Group();for(const sx of[-1,1])box(.24,.14,.05,M(0x111111),sx*.26,.1,.53,g);box(.14,.04,.04,M(0x111111),0,.13,.53,g);g.visible=false;OCT.userData.B.add(g);return g})();
const OCBAND=(()=>{const g=new THREE.Group();const b=cyl(.545,.545,.1,12,M(0xe03030),0,.38,0,g);const kn=box(.12,.1,.1,M(0xe03030),.55,.38,0,g);const tail=box(.3,.05,.05,M(0xe03030),.7,.3,0,g);g.visible=false;OCT.userData.B.add(g);return g})();
const OCSWEAT=[...Array(4)].map(()=>{const m=box(.07,.12,.07,new THREE.MeshBasicMaterial({color:0x7ad8ff}));S.add(m);ACT.push(m);return m});
function ocSweat(x,y,z,u){OCSWEAT.forEach((m,i)=>{const a=(u*1.6+i/4)%1;m.visible=true;m.position.set(x+(i%2?.5:-.5)*(.3+a*.3),y-a*.5,z+.4)})}
function ocDumb(g,s=1){const a=cyl(.03,.03,.5,6,tkMetal,0,0,0,g);a.rotation.z=Math.PI/2;for(const sx of[-1,1]){const w=cyl(.11*s,.11*s,.1,8,tkDark,sx*.26,0,0,g);w.rotation.z=Math.PI/2}return g}
const OCDUMB=(()=>{const g=new THREE.Group();ocDumb(g);S.add(g);ACT.push(g);return g})();
const OCDUMBH=(()=>{const g=new THREE.Group();ocDumb(g);g.rotation.z=.15;POLY.arms[1].add(g);g.position.set(0,-.95,.05);g.visible=false;return g})();
const _ochide2=hideAll;hideAll=function(){_ochide2();OCSIGN.visible=false;OCSUN.visible=false;OCBAND.visible=false;OCDUMBH.visible=false};
const ocPop=(u,t0)=>u<t0?0:1+.55*Math.exp(-(u-t0)*7)*Math.cos((u-t0)*22);
const OSH={
o_hook:(u,d,k)=>{ocEnv(u);show(OCT);ocPose('float',u,.55,0,-.1);OCT.userData.hearts.forEach((h,i)=>{const t0=[.95,.7,1.2][i];h.scale.setScalar(h.userData.base*Math.max(.001,ocPop(u,t0)))});ocDiver(-.5,1.5,.5,'shock');window.TAG('OCTOPUS','3 HEARTS','#ff5a7a');ocBubbles(-.5,1.9,1.5,u,.12);camTo([0,1.35,4.6],[0,1.3,4.2],[0,.95,0],[0,.95,0],k,42)},
o_two:(u,d,k)=>{ocEnv(u);show(OCT);const first=k<.5;ocPose('float',u,0,0,0,{hl:first?[1,2]:[0]});window.TAG(first?'2 HEARTS':'1 HEART',first?'FOR THE GILLS':'FOR THE BODY',first?'#7ad0ff':'#ff5a7a');camTo([0,1.2,3.6],[0,1.15,3.2],[0,.9,0],[0,.9,0],k,40)},
o_swim:(u,d,k)=>{ocEnv(u);show(OCT);const x=lerp(2.6,-2.6,k);ocPose('swim',u,x,0,-Math.PI/2+.75,{stopped:true});OCSIGN.visible=true;OCSIGN.rotation.z=Math.sin(u*9)*.25;window.TAG('SWIMMING','BODY HEART: BRB','#ff6a6a');ocBubbles(x+.9,.9,0,u,.4,2);camTo([0,1.2,4.8],[0,1.2,4.8],[0,.9,0],[0,.9,0],0,42)},
o_swim2:(u,d,k)=>{ocEnv(u);show(OCT);const x=lerp(1.5,-1.5,k);ocPose('swim',u,x,0,-Math.PI/2+.75,{stopped:true});OCSIGN.visible=true;OCSIGN.rotation.z=Math.sin(u*9)*.25;ocBubbles(x+.9,.9,0,u,.4,2);window.TAG('BODY HEART','OUT TO LUNCH','#ffb84a');camTo([x*.3,1.2,4.0],[x*.3,1.2,4.0],[x,.85,0],[x,.85,0],0,40)},
o_tired:(u,d,k)=>{ocEnv(u);show(OCT);ocPose('limp',u,.2,0,-.2,{tired:true,noHearts:true});OCBAND.visible=true;ocSweat(.2,1.15,0,u);ocDiver(-1.2,1.0,.7,'bored');ocBubbles(-1.2,1.8,1.0,u,.12,.5);camTo([0,1.0,4.2],[0,.95,3.8],[0,.6,0],[0,.6,0],k,42)},
o_crawl:(u,d,k)=>{ocEnv(u);show(OCT);const x=lerp(-2.0,2.0,k);ocPose('crawl',u*1.2,x,.2,.7,{});OCSUN.visible=true;window.TAG('CRAWLING','SMOOTH','#7ad0ff');camTo([0,.8,5.0],[0,.75,4.7],[x*.5,.5,0],[x*.5,.5,0],0,42)},
o_blue:(u,d,k)=>{ocEnv(u);show(OCVIAL);ocDiver(-.2,0,.1,'smug');POLY.arms[1].rotation.set(-1.4,0,-.25);OCVIAL.position.set(.38,1.25,.55);OCVIAL.rotation.z=.2;window.TAG('BLUE BLOOD','RUNS ON COPPER','#7ad0ff');ocBubbles(-.2,1.9,0,u,.12,.6);camTo([0,1.6,3.7],[0,1.55,3.3],[.1,1.45,0],[.1,1.45,0],k,40)},
o_poly:(u,d,k)=>{ocEnv(u);ocDiver(0,0,.12,'bored');OCDUMBH.visible=true;POLY.arms[1].rotation.set(-1.45+Math.min(1,u/.9)*1.2,0,-.2);POLY.g.position.y=Math.sin(u*2)*.04;ocBubbles(0,1.8,0,u,.15,.8);camTo([0,1.5,3.4],[0,1.5,3.1],[0,1.25,0],[0,1.25,0],k,50)},
o_end:(u,d,k)=>{ocEnv(u);show(OCT);ocPose('limp',u,.55,0,-.35,{tired:true,noHearts:true});OCBAND.visible=true;show(OCDUMB);OCDUMB.position.set(-.1,.12,1.0);OCDUMB.rotation.set(0,.4,0);ocDiver(-.65,.3,.4,'bored');POLY.arms[1].rotation.set(-.3,0,-.15);POLY.g.rotation.z=-.0;ocBubbles(-.65,1.8,.3,u,.1,.5);camTo([0,1.25,5.6],[0,1.25,5.6],[0,.85,0],[0,.85,0],0,42)}
};
Object.assign(SHOTS,OSH);
// cover: octopus hero (three hearts, the body heart greyed) over the blurred sea; character pass on green for the mask
function ocCoverPose(){ocPose('float',0.4,0,0,0,{stopped:true});OCT.userData.B.position.y=.95;OCSIGN.visible=true;OCSUN.visible=true;OCBAND.visible=true;OCT.userData.tent.forEach((T,i)=>{const a=(i/8-.5)*2.6;T.forEach((m,j)=>{const s=(j+1)/T.length;m.position.set(Math.sin(a)*(.35+s*1.15),.55-s*.62+Math.sin(j*.9+i)*.05,Math.cos(a)*.25*s)})})}
Object.assign(SHOTS,{ocover:(u,d,k)=>{ocEnv(0);camTo([0,1.3,4.3],[0,1.3,4.3],[0,1.25,0],[0,1.25,0],0,40)},
 ocoverc:(u,d,k)=>{ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.15;show(OCT);ocCoverPose();camTo([0,1.3,4.3],[0,1.3,4.3],[0,1.25,0],[0,1.25,0],0,40)}});
