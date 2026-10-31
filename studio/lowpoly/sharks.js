// Clip 3: Sharks Are Older Than Trees (loaded after wombat.js; extends SHOTS)
const SEABG=ctex(2,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a86c8');g.addColorStop(1,'#0c3a6a');x.fillStyle=g;x.fillRect(0,0,w,h)});
const SANDS=ctex(64,64,(x,w,h)=>{x.fillStyle='#b8a878';x.fillRect(0,0,w,h);for(let i=0;i<300;i++){x.fillStyle=['#a89868','#c8b888','#988858'][i%3];x.fillRect(rn(i)*w,rn(i+9)*h,2,2)}},[26,26]);
function sharkModel(){const g=new THREE.Group();const P={g};const gray=fab('#6f8398',{seed:31,noise:.14}),white=fab('#e8eef2',{seed:32,noise:.06});
 const gm=new THREE.MeshLambertMaterial({map:gray,flatShading:true}),wm=new THREE.MeshLambertMaterial({map:white,flatShading:true});
 const body=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),gm);body.scale.set(.62,.56,2.0);g.add(body);
 const belly=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8,0,Math.PI*2,Math.PI*.55,Math.PI*.45),wm);belly.scale.set(.62,.56,2.0);g.add(belly);
 const snout=cone(.29,.7,8,gm,0,0,1.05,g);snout.rotation.x=Math.PI/2;snout.scale.set(1,1,.8);
 const dorsal=cone(.24,.7,3,gm,0,.62,.1,g);dorsal.scale.set(.3,1,1.4);dorsal.rotation.x=-.25;
 P.tail=new THREE.Group();P.tail.position.set(0,0,-.95);g.add(P.tail);const t1=cone(.2,.9,3,gm,0,.35,-.35,P.tail);t1.rotation.x=-.9;t1.scale.set(.25,1,1.2);const t2=cone(.15,.6,3,gm,0,-.25,-.25,P.tail);t2.rotation.x=.9;t2.scale.set(.25,1,1.2);
 for(const sx of[-1,1]){const f=cone(.18,.7,3,gm,sx*.38,-.18,.35,g);f.rotation.z=-sx*1.2;f.rotation.x=.4;f.scale.set(.25,1,1.1);
  box(.07,.07,.03,new THREE.MeshBasicMaterial({color:0xf4f4f4}),sx*.205,.12,.6,g);box(.04,.05,.03,new THREE.MeshBasicMaterial({color:0x111111}),sx*.205,.12,.62,g);
  for(let i=0;i<3;i++)box(.012,.14,.02,new THREE.MeshBasicMaterial({color:0x2a3340}),sx*.31,0,.1-i*.08,g)}
 box(.34,.03,.04,new THREE.MeshBasicMaterial({color:0x222a33}),0,-.14,.9,g);
 P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.set(0,ry,0)};P.swim=t=>{P.tail.rotation.y=Math.sin(t*5)*.35;g.rotation.z=Math.sin(t*2.5)*.04};S.add(g);ACT.push(g);return P}
const SHK=[sharkModel(),sharkModel(),sharkModel()];
function firstTree(){const g=new THREE.Group();const bark=fab('#7a5a34',{seed:41,noise:.2}),lf=fab('#4aa04a',{seed:42,noise:.2});const bm=new THREE.MeshLambertMaterial({map:bark,flatShading:true}),lm=new THREE.MeshLambertMaterial({map:lf,flatShading:true});
 cone(.55,.7,8,bm,0,.3,0,g);cyl(.2,.3,2.6,8,bm,0,1.4,0,g);
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const br=new THREE.Group();br.position.set(0,2.7,0);br.rotation.y=a;g.add(br);const arm=cyl(.035,.05,1.3,5,bm,0,0,0,br);arm.position.set(.55,.35,0);arm.rotation.z=-1.1;
  for(let j=0;j<4;j++){const fr=cone(.1,.45,4,lm,.35+j*.22,.45+j*.12-j*j*.04,0,br);fr.rotation.z=-1.4}
  const tip=cone(.22,.55,5,lm,1.05,.38,0,br);tip.rotation.z=-1.6}
 const root=new THREE.Group();root.add(g);S.add(root);ACT.push(root);return {root,g}}
const TR1=firstTree(),TR2=firstTree();
// text sign (billboard)
const TXC=document.createElement('canvas');TXC.width=512;TXC.height=192;const TXX=TXC.getContext('2d');const TXT=new THREE.CanvasTexture(TXC);TXT.magFilter=TXT.minFilter=THREE.NearestFilter;TXT.generateMipmaps=false;TXT.colorSpace=THREE.SRGBColorSpace;
const TXS=new THREE.Mesh(new THREE.PlaneGeometry(4.4,1.65),new THREE.MeshBasicMaterial({map:TXT,transparent:true}));S.add(TXS);ACT.push(TXS);
function setTxt(l1,l2,col){TXX.clearRect(0,0,512,192);TXX.fillStyle='rgba(10,18,40,.82)';TXX.fillRect(8,8,496,176);TXX.strokeStyle='#fff';TXX.lineWidth=6;TXX.strokeRect(8,8,496,176);TXX.textAlign='center';TXX.fillStyle='#ffffff';let f1=46;TXX.font='bold '+f1+'px RC,Arial';while(TXX.measureText(l1).width>470&&f1>20){f1-=2;TXX.font='bold '+f1+'px RC,Arial'}TXX.fillText(l1,256,64);TXX.fillStyle=col||'#ffe21f';let f2=92;TXX.font='bold '+f2+'px RC,Arial';while(TXX.measureText(l2).width>470&&f2>24){f2-=2;TXX.font='bold '+f2+'px RC,Arial'}TXX.fillText(l2,256,152);TXT.needsUpdate=true}
function sign(x,y,z,l1,l2,col){setTxt(l1,l2,col);TXS.visible=true;TXS.position.set(x,y,z);TXS.lookAt(cam.position);TXS.scale.setScalar(.095*cam.position.distanceTo(TXS.position))}
const BUB=[...Array(16)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,0),new THREE.MeshBasicMaterial({color:0xcfe9ff,transparent:true,opacity:.7}));S.add(m);ACT.push(m);return m});
const WEED=[...Array(10)].map((_,i)=>{const m=cone(.15,1.2+rn(i)*.8,5,M(0x2f9a4a),(rn(i+3)-.5)*8,-3.4,-2-rn(i+7)*5);S.add(m);ACT.push(m);return m});
function bubbles(t,x0,y0,z0){BUB.forEach((b,i)=>{b.visible=true;const a=(t*.45+i*.19)%1;b.position.set(x0+Math.sin(i*2.3+t)*.6+(rn(i)-.5)*3,y0+a*3.5,z0+(rn(i+4)-.5)*3)})}
function sea(){PROPS.forEach(p=>p.visible=false);S.background=SEABG;S.fog.color.set(0x14507e);S.fog.near=3;S.fog.far=24;HEMI.intensity=1.0;ground.position.y=-3.5;ground.material.map=SANDS;ground.material.color.set(0xb8d0e8);ground.material.needsUpdate=true;water.visible=false;WEED.forEach(w=>w.visible=true)}
function beach(){PROPS.forEach(p=>p.visible=false);ground.material.map=SANDS;ground.material.color.set(0xffffff);ground.material.needsUpdate=true}
const _hide2=hideAll;hideAll=function(){_hide2();ground.position.y=0;water.visible=true;S.fog.near=45;S.fog.far=130;TXS.visible=false;SHK.forEach(s=>s.g.visible=false)};
const _camTo=camTo;camTo=function(...a){_camTo(...a);if(TXS.visible){TXS.lookAt(cam.position);TXS.scale.setScalar(.095*cam.position.distanceTo(TXS.position))}};
const SSH={
s_shark:(u,d,k)=>{sea();SHK[0].g.visible=true;SHK[0].at(lerp(3,-3,k),-1.6+Math.sin(u*1.7)*.15,0,-Math.PI/2);SHK[0].swim(u);bubbles(u,0,-3.2,-1);sign(0,.9,-1,'SHARKS: OVER','400 MILLION YRS');camTo([0,-1.5,5.4],[0,-1.5,5.4],[0,-1.2,0],[0,-1.2,0],0,48)},
s_poly:(u,d,k)=>{beach();show(POLY,TR2.root);POLY.rest();POLY.at(-.6,0,-26,0);POLY.face('neutral');POLY.arms[0].rotation.set(0,0,.05);POLY.arms[1].rotation.set(0,0,-.05);TR2.root.position.set(.7,0,-25.5);TR2.root.scale.setScalar(.38);const s0=SHK[0];s0.g.visible=true;s0.at(lerp(5,-5,k),-.72,-34,-Math.PI/2);s0.swim(u);camTo([0,1.55,-20.6],[0,1.55,-21.2],[0,1.35,-26],[0,1.35,-26],k,44)},
s_sea:(u,d,k)=>{sea();[[0,-.9,-1,-Math.PI/2,2.2],[1,-1.9,-3,Math.PI/2,1.7],[2,-1.4,-6,-Math.PI/2,1.3]].forEach(([i,y,z,ry,sp])=>{const s=SHK[i];s.g.visible=true;s.at(ry<0?lerp(5,-5,(u*sp*.18)%1):lerp(-5,5,(u*sp*.18)%1),y,z,ry);s.swim(u+i)});bubbles(u,0,-3.2,-2);camTo([0,-1.2,5.5],[0,-1.2,4.8],[0,-1.2,0],[0,-1.2,0],k,50)},
s_sign:(u,d,k)=>{sea();SHK[0].g.visible=true;SHK[0].at(lerp(-4,4,k),-2.0,-1.5,Math.PI/2);SHK[0].swim(u);const n=Math.round(lerp(0,420,ease(cl(k*1.15))));sign(0,0,0,'MILLION YEARS AGO','>'+n);bubbles(u,0,-3.2,-2);camTo([0,-.6,5.2],[0,-.6,5.2],[0,-.3,0],[0,-.3,0],0,48)},
s_tree1:(u,d,k)=>{beach();show(TR1.root,POLY);const gr=ease(cl(k*1.4));TR1.root.position.set(.6,0,-24);TR1.root.scale.setScalar(.15+gr*.9);const n=Math.round(lerp(0,385,ease(cl(k*1.2))));sign(-1.2,3.7,-23.5,'MILLION YEARS AGO',String(n));POLY.rest();POLY.at(-.9,0,-23.4,.4);POLY.face('bored');camTo([0,1.9,-17.5],[0,2.0,-18.5],[-.2,1.8,-24],[-.2,1.8,-24],k,48)},
s_poly2:(u,d,k)=>{beach();show(TR1.root,POLY);TR1.root.position.set(1.2,0,-24.4);TR1.root.scale.setScalar(1);POLY.rest();POLY.at(-.45,0,-24,.25);POLY.face('bored');POLY.head.rotation.set(-.15,0,.12*Math.sin(u*2));POLY.arms[1].rotation.set(-.4,0,-.5);camTo([0,1.7,-19.2],[0,1.75,-20],[.3,1.7,-24.2],[.3,1.75,-24.2],k,48)},
s_gap:(u,d,k)=>{beach();show(POLY);POLY.rest();POLY.at(0,0,-24.8,0);POLY.face(k>.6?'shock':'bored');POLY.head.rotation.y=Math.sin(u*2.2)*.7;for(let i=0;i<3;i++){const s=SHK[i];s.g.visible=true;s.at(lerp(i%2?6:-6,i%2?-6:6,((u*.2+i*.31)%1)),-.72,-33-i*3,i%2?-Math.PI/2:Math.PI/2);s.swim(u+i)}if(k>.45)sign(0,3.4,-25,'LAND','NO TREES','#ff7a7a');camTo([0,1.7,-19.5],[0,1.7,-20.3],[0,1.5,-26],[0,1.5,-26],k,52)},
s_palm:(u,d,k)=>{beach();show(TR1.root,POLY);TR1.root.position.set(.7,0,-24.4);TR1.root.scale.setScalar(1);TR1.g.rotation.y=u*.35;POLY.rest();POLY.at(-.75,0,-22.9,.35);POLY.face('shock');POLY.head.rotation.set(-.2,.1,0);camTo([0,2.3,-18],[0,2.6,-19],[0,2.2,-24],[0,2.5,-24],k,56)},
s_final:(u,d,k)=>{beach();show(TR1.root,POLY);TR1.root.position.set(1.0,0,-24.3);TR1.root.scale.setScalar(1);POLY.rest();POLY.at(-.5,0,-24,.3);POLY.face(k>.5?'smug':'neutral');POLY.arms[1].rotation.set(-1.2+Math.sin(u*8)*.2,0,-.2);const s=SHK[0];s.g.visible=true;s.at(lerp(5,-5,k),-.72,-33,-Math.PI/2);s.swim(u);camTo([0,1.7,-19],[0,1.75,-19.8],[.3,1.6,-24.2],[.3,1.65,-24.2],k,50)},
scover2:(u,d,k)=>{beach();show(POLY,TR2.root);POLY.rest();POLY.at(-.45,0,-26,.15);POLY.face('neutral');POLY.arms[0].rotation.set(0,0,.05);POLY.arms[1].rotation.set(0,0,-.05);TR2.root.position.set(.75,0,-25.6);TR2.root.scale.setScalar(.42);const s=SHK[0];s.g.visible=true;s.at(1.2,-.72,-31.5,-2.2);s.swim(.3);camTo([0,1.9,-20.4],[0,1.9,-20.4],[0,1.85,-26],[0,1.85,-26],0,40)},
scover:(u,d,k)=>{sea();const s=SHK[0];s.g.visible=true;s.at(.1,-1.4,1.6,0);s.swim(.4);camTo([0,-1.25,5.0],[0,-1.25,5.0],[0,-1.3,0],[0,-1.3,0],0,40)}
};
Object.assign(SHOTS,SSH);
