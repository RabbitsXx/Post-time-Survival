// Clip: Why You Can't Tickle Yourself (loaded after scene.html main script; extends SHOTS).  Source note: topics/tickle.md
const tkWhite=M(0xf2f2ee),tkMetal=M(0x8a909c),tkDark=M(0x3a3f4a);
const TKVOL=person({coat:'#f2f2f2',pants:'#555a66',hair:'#2a1c14',skin:'#d8a07c'});
const TKHAND=(()=>{const g=new THREE.Group();box(.5,.5,.4,tkWhite,0,0,0,g);g.userData.f=[-.18,-.06,.06,.18].map((y,i)=>{const f=box(.1,.1,.46+(i===1?.1:0),tkWhite,0,y,-.4,g);return f});box(.14,.14,.36,tkWhite,.3,-.12,-.1,g);box(.3,.4,.5,M(0x3a6a8a),0,0,.4,g);S.add(g);ACT.push(g);return g})();
const TKFEATHER=(()=>{const g=new THREE.Group();cyl(.015,.015,.42,5,M(0xe8e0c8),0,-.2,0,g);for(const s of[-1,1]){const b=box(.16,.3,.02,M(0xf4f0e0),s*.07,-.32,0,g);b.rotation.z=s*.35}POLY.arms[1].add(g);g.position.set(0,-.95,.05);g.visible=false;return g})();
const TKBRAIN=(()=>{const g=new THREE.Group();const pk=M(0xe89aa8),pk2=M(0xd47a8c);for(const s of[-1,1]){const h=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,1),pk);h.scale.set(.9,.85,1.15);h.position.set(s*.42,.2,0);g.add(h)}
 g.userData.cb=new THREE.Mesh(new THREE.IcosahedronGeometry(.34,1),new THREE.MeshBasicMaterial({color:0xffc24a}));g.userData.cb.position.set(0,-.42,-.72);g.add(g.userData.cb);
 const st=cyl(.12,.1,.5,6,pk2,0,-.62,-.1,g);S.add(g);ACT.push(g);return g})();
const TKSIG=[...Array(5)].map(()=>{const m=box(.16,.16,.16,new THREE.MeshBasicMaterial({color:0x7affc0}));S.add(m);ACT.push(m);return m});
const TKTOUCH=new THREE.Mesh(new THREE.IcosahedronGeometry(.2,0),new THREE.MeshBasicMaterial({color:0xff6a6a}));S.add(TKTOUCH);ACT.push(TKTOUCH);

// ---------- sets and props that belong to the topic ----------
const mat=(map,c=0xffffff)=>M(c,{map});
const TKWOOD=ctex(64,64,(x,w,h)=>{x.fillStyle='#b07a48';x.fillRect(0,0,w,h);for(let i=0;i<8;i++){x.fillStyle=i%2?'#a06c3c':'#bc8450';x.fillRect(0,i*8,w,7);x.fillStyle='#7a4e28';x.fillRect(0,i*8+7,w,1)}},[10,10]);
const TKPAPER=ctex(32,32,(x,w,h)=>{x.fillStyle='#f1d6a4';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=8){x.fillStyle='#e6c48a';x.fillRect(i,0,4,h)}x.fillStyle='#d9a96a';for(let j=4;j<h;j+=16)for(let i=2;i<w;i+=8)x.fillRect(i,j,2,2)},[12,5]);
const TKTILE=ctex(32,32,(x,w,h)=>{x.fillStyle='#e8eef2';x.fillRect(0,0,w,h);x.fillStyle='#b9c6d0';x.fillRect(0,0,w,1);x.fillRect(0,0,1,h);x.fillStyle='#dfe7ec';x.fillRect(2,2,12,12);x.fillRect(18,18,12,12)},[14,6]);
const TKCHECK=ctex(32,32,(x,w,h)=>{x.fillStyle='#cfd6dc';x.fillRect(0,0,w,h);x.fillStyle='#b4bcc4';x.fillRect(0,0,16,16);x.fillRect(16,16,16,16)},[12,12]);
const TKGRIDT=ctex(32,32,(x,w,h)=>{x.fillStyle='#0a1432';x.fillRect(0,0,w,h);x.fillStyle='#2a8fff';x.fillRect(0,0,w,1);x.fillRect(0,0,1,h)},[24,24]);
function tkRoom(wallTex,floorTex,trim){const g=new THREE.Group();box(26,.1,26,mat(floorTex),0,-.05,2,g);box(26,9,.2,mat(wallTex),0,4.5,-3,g);box(26,.3,.14,M(trim),0,.15,-2.88,g);box(.2,9,12,mat(wallTex),-6.5,4.5,3,g);box(.2,9,12,mat(wallTex),6.5,4.5,3,g);S.add(g);ACT.push(g);return g}
// living room: sofa, rug, lamp, window, pictures, plant, side table with mug
const TKHOME=(()=>{const g=tkRoom(TKPAPER,TKWOOD,0x6a4a30);
 const rug=box(4.2,.04,2.6,M(0xb8443c),0,.02,.2,g);box(3.6,.05,2.0,M(0xe8c27a),0,.03,.2,g);box(2.6,.06,1.2,M(0xb8443c),0,.04,.2,g);
 const sofa=new THREE.Group();box(3.8,.75,1.3,M(0x3f6f8f),0,.38,0,sofa);box(3.8,1.1,.4,M(0x3a6584),0,.95,-.5,sofa);for(const sx of[-1,1])box(.4,.95,1.3,M(0x35607f),sx*1.95,.5,0,sofa);for(const sx of[-1,1])box(1.15,.22,1.0,M(0x4a7fa2),sx*.6,.86,.12,sofa);const cu=box(.55,.55,.2,M(0xe8b84a),-1.2,1.1,.0,sofa);cu.rotation.z=.4;sofa.position.set(0,0,-1.9);g.add(sofa);
 const lamp=new THREE.Group();cyl(.05,.05,2.6,6,tkDark,0,1.3,0,lamp);cyl(.3,.3,.08,8,tkDark,0,.04,0,lamp);const sh=cyl(.28,.5,.6,8,new THREE.MeshBasicMaterial({color:0xffe9a8}),0,2.7,0,lamp);const gl=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,1),new THREE.MeshBasicMaterial({color:0xfff2c0,transparent:true,opacity:.18}));gl.position.y=2.7;lamp.add(gl);lamp.position.set(-1.55,0,-2.0);g.add(lamp);
 const win=new THREE.Group();box(1.6,1.9,.12,M(0xf4ecd8),0,0,0,win);box(1.35,1.65,.06,new THREE.MeshBasicMaterial({color:0x9fd8ff}),0,0,.05,win);box(.08,1.65,.08,M(0xf4ecd8),0,0,.08,win);box(1.35,.08,.08,M(0xf4ecd8),0,0,.08,win);box(.4,.3,.04,new THREE.MeshBasicMaterial({color:0xffffff}),.3,.4,.07,win);win.position.set(.35,3.2,-2.88);g.add(win);
 for(const [x,y,w,h,c] of[[-1.15,3.4,.55,.7,0xe0705a],[-1.15,2.55,.4,.4,0x6ab87a],[1.4,2.4,.5,.6,0xe8c24a]]){box(w+.1,h+.1,.08,M(0x6a4a30),x,y,-2.88,g);box(w,h,.05,new THREE.MeshBasicMaterial({color:c}),x,y,-2.84,g)}
 const plant=new THREE.Group();cyl(.28,.22,.45,7,M(0xb8683c),0,.22,0,plant);for(let i=0;i<6;i++){const l=cone(.12,.9,4,M(0x3aa046),Math.cos(i)*.2,.85,Math.sin(i)*.2,plant);l.rotation.z=Math.cos(i)*.35;l.rotation.x=Math.sin(i)*.35}plant.position.set(1.5,0,-2.2);g.add(plant);
 const tb=new THREE.Group();box(.8,.08,.8,M(0x8a5a30),0,.7,0,tb);for(const sx of[-1,1])for(const sz of[-1,1])box(.07,.7,.07,M(0x6a4326),sx*.33,.35,sz*.33,tb);cyl(.1,.09,.18,8,M(0xf2f2ee),.1,.83,0,tb);tb.position.set(1.4,0,-1.0);g.add(tb);return g})();
// neuroscience lab: fMRI scanner, scan monitor, whiteboard, ceiling light, clock
const TKLABROOM=(()=>{const g=tkRoom(TKTILE,TKCHECK,0x8a96a2);
 const sc=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(.95,.42,6,12),M(0xdfe6ec));ring.position.y=1.5;sc.add(ring);const hole=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.9,12),new THREE.MeshBasicMaterial({color:0x10141c}));hole.rotation.x=Math.PI/2;hole.position.set(0,1.5,.0);sc.add(hole);box(1.7,.3,.9,M(0x8a96a2),0,.15,0,sc);box(.7,.12,2.6,M(0xf2f2ee),0,.85,1.1,sc);box(.12,.7,.12,M(0x8a96a2),0,.5,1.9,sc);for(const a of[-.8,.8])box(.05,.05,.05,new THREE.MeshBasicMaterial({color:a<0?0x7affc0:0xff6a6a}),a,2.5,.45,sc);sc.position.set(-1.35,0,-1.9);g.add(sc);
 const scr=ctex(64,48,(x,w,h)=>{x.fillStyle='#07101e';x.fillRect(0,0,w,h);const cx=22,cy=24;x.fillStyle='#4a5a78';x.beginPath();x.ellipse(cx,cy,17,14,0,0,7);x.fill();x.fillStyle='#ff6a3a';x.fillRect(cx-6,cy-5,6,5);x.fillStyle='#ffd23a';x.fillRect(cx-4,cy-3,3,3);x.fillStyle='#7affc0';x.fillRect(cx+4,cy+3,4,3);x.fillStyle='#4a5a78';x.beginPath();x.ellipse(50,24,9,8,0,0,7);x.fill();x.fillStyle='#ff6a3a';x.fillRect(48,21,5,4)});
 const mon=new THREE.Group();box(1.25,.9,.1,tkDark,0,0,0,mon);box(1.1,.75,.05,new THREE.MeshBasicMaterial({map:scr}),0,0,.06,mon);box(.18,.5,.1,tkMetal,0,-.62,0,mon);box(.6,.06,.4,tkDark,0,-.88,.1,mon);mon.position.set(1.3,1.45,-2.35);g.add(mon);const dsk=box(1.8,.1,.9,M(0xdcdcdc),1.3,.95,-2.35,g);box(.1,.95,.1,tkMetal,.5,.47,-2.1,g);box(.1,.95,.1,tkMetal,2.1,.47,-2.1,g);
 const wb=ctex(64,40,(x,w,h)=>{x.fillStyle='#f6f8fa';x.fillRect(0,0,w,h);x.strokeStyle='#8a96a2';x.lineWidth=2;x.strokeRect(1,1,w-2,h-2);x.fillStyle='#2a5fd0';x.font='bold 12px RC,Arial';x.fillText('1998',5,14);x.fillStyle='#d03a3a';x.fillRect(6,22,16,3);x.fillStyle='#2a5fd0';x.fillRect(6,28,36,3);x.fillStyle='#2a8a4a';x.beginPath();x.arc(48,26,7,0,7);x.stroke();x.fillRect(40,8,18,2);x.fillRect(40,12,12,2)});
 box(2.5,1.5,.08,tkMetal,0,3.6,-2.9,g);box(2.35,1.35,.06,new THREE.MeshBasicMaterial({map:wb}),0,3.6,-2.85,g);
 box(2.0,.12,.9,new THREE.MeshBasicMaterial({color:0xffffff}),0,6.1,-1.2,g);
 const clk=cyl(.28,.28,.06,10,new THREE.MeshBasicMaterial({color:0xffffff}),-1.3,4.4,-2.88,g);clk.rotation.x=Math.PI/2;box(.04,.22,.02,tkDark,-1.3,4.48,-2.84,g);box(.16,.04,.02,tkDark,-1.22,4.4,-2.84,g);return g})();
// diagram void: glowing grid floor + floating "neuron" cubes
const TKVOID=(()=>{const g=new THREE.Group();box(40,.05,40,mat(TKGRIDT),0,.2,0,g);g.userData.d=[...Array(14)].map((_,i)=>{const m=box(.09,.09,.09,new THREE.MeshBasicMaterial({color:i%2?0x2ac8ff:0xff6ac8}),(rn(i)-.5)*5,.6+rn(i+4)*3.2,-1.6-rn(i+9)*2.4,g);m.userData.b=m.position.y;return m});S.add(g);ACT.push(g);return g})();
const TKSKY=ctex(2,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#08102a');g.addColorStop(1,'#1a2c5a');x.fillStyle=g;x.fillRect(0,0,w,h)});
const TKLAB=new THREE.Group();box(3.4,.12,1.2,M(0xdcdcdc),0,1.0,0,TKLAB);for(const sx of[-1,1])for(const sz of[-1,1])box(.1,1.0,.1,tkMetal,sx*1.55,.5,sz*.5,TKLAB);S.add(TKLAB);ACT.push(TKLAB);
const TKROBOT=(()=>{const g=new THREE.Group();cyl(.28,.34,.3,8,tkDark,0,.15,0,g);const up=new THREE.Group();up.position.set(0,.3,0);g.add(up);box(.16,.5,.16,tkMetal,0,.25,0,up);const lo=new THREE.Group();lo.position.set(0,.5,0);up.add(lo);box(.14,.14,.9,tkMetal,0,0,.4,lo);const tip=new THREE.Mesh(new THREE.IcosahedronGeometry(.1,0),M(0xe8d070));tip.position.set(0,0,.9);lo.add(tip);g.userData={up,lo,tip};S.add(g);ACT.push(g);return g})();
function tkBar(x,col){const m=box(.7,1,.7,M(col),x,0,0);S.add(m);ACT.push(m);return m}
const TKB1=tkBar(-.8,0x4a90e8),TKB2=tkBar(.8,0xe84a4a);
function tkLabel(txt,col){const t=ctex(256,64,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.0)';x.fillRect(0,0,w,h);x.fillStyle=col;x.font='bold 44px RC,Arial';x.textAlign='center';x.fillText(txt,w/2,46)});t.generateMipmaps=false;const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.4),new THREE.MeshBasicMaterial({map:t,transparent:true}));S.add(m);ACT.push(m);return m}
const TKL1=tkLabel('YOURSELF','#9ad0ff'),TKL2=tkLabel('MACHINE','#ffb3a0');
function tkOff(){ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false)}
function tkBg(u){tkOff();S.background=TKSKY;S.fog.color.set(0x14224a);HEMI.intensity=.95;show(TKVOID);TKVOID.userData.d.forEach((m,i)=>{m.position.y=m.userData.b+Math.sin(u*2+i)*.12})}
function tkEnv(k){tkOff();HEMI.intensity=1.2;if(k==='home'){S.background=new THREE.Color(0xf1d6a4);S.fog.color.set(0xf1d6a4);show(TKHOME)}else{S.background=new THREE.Color(0xe8eef2);S.fog.color.set(0xe8eef2);show(TKLABROOM)}}
const _tkhide=hideAll;hideAll=function(){_tkhide();TKHAND.scale.setScalar(1);TKP2.g.rotation.z=0;ground.visible=true;water.visible=true;sandR.visible=true;clouds.forEach(c=>c.visible=true);TKFEATHER.visible=false;POLY.g.rotation.z=0};
function tkSig(path,u,n){TKSIG.forEach((m,i)=>{const a=cl(u*1.3-i*.12);if(a<=0||a>=1){m.visible=false;return}m.visible=true;const p=path(a);m.position.set(p[0],p[1],p[2]);m.rotation.set(a*6,a*5,0)})}
const TSH={
t_self:(u,d,k)=>{tkEnv('home');show(POLY);POLY.rest();POLY.at(0,0,0,.12);POLY.face('bored');POLY.arms[1].rotation.set(-1.0,0,-.5+Math.sin(u*16)*.1);camTo([0,1.7,4.6],[0,1.7,3.9],[0,1.55,0],[0,1.55,0],k,40)},
t_other:(u,d,k)=>{tkEnv('home');show(POLY,TKHAND);POLY.rest();POLY.at(0,0,0,.12);const a=cl(u*3);POLY.face(a>.4?'shock':'bored');POLY.g.rotation.z=a>.4?Math.sin(u*34)*.13:0;POLY.g.position.x=a>.4?Math.sin(u*40)*.06:0;POLY.arms[0].rotation.z=-.3;TKHAND.userData.f.forEach((f,i)=>f.rotation.x=Math.sin(u*34+i*1.3)*.3);TKHAND.rotation.y=Math.PI/2;TKHAND.position.set(1.15-.35*a+Math.sin(u*22)*.06,1.3,.15);camTo([0,1.7,4.6],[0,1.7,3.9],[.2,1.55,0],[.2,1.55,0],k,40)},
t_two:(u,d,k)=>{tkEnv('home');show(POLY,TKHAND);POLY.rest();POLY.at(0,0,0,.05);POLY.face('bored');POLY.arms[1].rotation.set(-1.0,0,-.5+Math.sin(u*16)*.1);TKHAND.userData.f.forEach((f,i)=>f.rotation.x=Math.sin(u*34+i*1.3)*.3);TKHAND.rotation.y=-Math.PI/2;TKHAND.position.set(-1.15+Math.sin(u*20)*.06,1.3,.15);camTo([0,1.8,5.2],[0,1.75,4.7],[0,1.5,0],[0,1.5,0],k,42)},
t_brain:(u,d,k)=>{tkBg(u);show(TKBRAIN);TKBRAIN.rotation.set(0,-.7+k*.5,0);TKBRAIN.position.set(0,1.4,0);const cb=TKBRAIN.userData.cb;cb.scale.setScalar(1+.18*Math.sin(u*9));window.TAG('CEREBELLUM','PREDICTS THE TOUCH','#ffc24a');camTo([0,1.6,7.4],[0,1.5,6.8],[0,1.3,0],[0,1.3,0],k,40)},
t_mute:(u,d,k)=>{tkBg(u);show(TKBRAIN,TKTOUCH);TKBRAIN.rotation.set(0,-.2+k*.4,0);TKBRAIN.position.set(0,1.4,0);TKBRAIN.userData.cb.scale.setScalar(1.15);const e=cl((u-.1)/(d*.8));
 tkSig(a=>[0,1.0+a*.9,-.7+a*1.4].map((v,i)=>i===1?v+1.0:i===2?v-.3:v),u/Math.max(.5,d)*1.0,5);const mute=cl((u/d-.45)*3);TKTOUCH.visible=true;TKTOUCH.position.set(0,2.35,.5);TKTOUCH.scale.setScalar(1.5-1.2*mute);TKTOUCH.material.color.set(mute>.5?0x777788:0xff6a6a);if(mute>.15)window.TAG('FEELING','MUTED','#9aa0b4');else window.TAG('COMMAND','COPIED','#7affc0');camTo([0,1.9,7.6],[0,1.8,7.0],[0,1.6,0],[0,1.6,0],k,40)},
t_lab:(u,d,k)=>{tkEnv('lab');show(TKLAB,TKVOL,TKROBOT);TKLAB.position.set(0,0,0);TKVOL.rest();TKVOL.at(-.4,0,-.9,0);TKVOL.face('neutral');TKVOL.arms[1].rotation.set(-1.25,0,.0);TKROBOT.position.set(.1,1.06,-.85);TKROBOT.rotation.y=0;TKROBOT.userData.lo.rotation.x=.45;camTo([1.4,2.0,5.2],[1.0,1.9,4.7],[.1,1.4,-.4],[.1,1.4,-.4],k,45)},
t_robot:(u,d,k)=>{tkEnv('lab');show(TKLAB,TKVOL,TKROBOT);TKLAB.position.set(0,0,0);TKVOL.rest();TKVOL.at(-.3,0,-.9,0);TKVOL.arms[1].rotation.set(-1.25,0,0);const p=Math.sin(u*9);TKROBOT.position.set(.1,1.06,-.85);TKROBOT.rotation.y=0;TKROBOT.userData.lo.rotation.x=.45+p*.07;TKVOL.face(u>.25?'shock':'neutral');if(u>.25)TKVOL.head.position.y=1.76+Math.abs(Math.sin(u*26))*.05;camTo([2.6,1.9,1.9],[2.3,1.85,1.7],[.1,1.5,-.2],[.1,1.5,-.2],k,40)},
t_meter:(u,d,k)=>{tkEnv('lab');const g1=.35*cl(u*2.2),g2=1.7*cl((u-.15)*1.6);[TKB1,TKB2].forEach(b=>b.visible=true);TKB1.scale.y=Math.max(.01,g1);TKB1.position.set(-.75,g1/2,0);TKB2.scale.y=Math.max(.01,g2);TKB2.position.set(.75,g2/2,0);TKL1.visible=TKL2.visible=true;TKL1.position.set(-.75,g1+.3,.4);TKL2.position.set(.75,g2+.3,.4);TKL1.scale.setScalar(.7);TKL2.scale.setScalar(.7);window.TAG('TICKLISHNESS',u>d*.45?'MACHINE WINS':'MEASURING','#ffb3a0');camTo([0,1.8,9.0],[0,1.75,8.6],[0,1.2,0],[0,1.3,0],k,42)},
t_brain2:(u,d,k)=>{tkBg(u);show(TKBRAIN);TKBRAIN.rotation.set(0,.3-k*.6,0);TKBRAIN.position.set(0,1.4,0);TKBRAIN.userData.cb.scale.setScalar(1+.1*Math.sin(u*7));window.TAG('YOUR BRAIN','FILTERS YOU OUT','#7affc0');camTo([1.4,1.3,7.2],[-.6,1.7,6.8],[0,1.3,0],[0,1.3,0],k,40)},
t_try:(u,d,k)=>{tkEnv('home');show(POLY);TKFEATHER.visible=true;POLY.rest();POLY.at(0,0,0,.1);POLY.face('bored');POLY.arms[1].rotation.set(-1.45+Math.sin(u*13)*.1,0,-.45);camTo([0,1.75,3.6],[0,1.8,3.2],[0,1.75,0],[0,1.75,0],k,38)},
t_stare:(u,d,k)=>{tkEnv('home');show(POLY);TKFEATHER.visible=true;POLY.rest();POLY.at(0,0,0,0);POLY.face('smug');POLY.arms[1].rotation.set(-1.5,0,-.12+Math.sin(u*5)*.04);camTo([0,1.78,2.9],[0,1.8,2.5],[0,1.75,0],[0,1.75,0],k,36)}
};
Object.assign(SHOTS,TSH);
// cover shot: deadpan Poly, feather at his own neck, the tickling glove hovering and getting ignored
Object.assign(SHOTS,{tcover:(u,d,k)=>{tkEnv('home');show(POLY,TKHAND);TKFEATHER.visible=true;POLY.rest();POLY.at(0,0,0,.1);POLY.face('bored');POLY.arms[1].rotation.set(-1.75,0,-.55);TKHAND.userData.f.forEach((f,i)=>f.rotation.x=-.25+i*.1);TKHAND.rotation.y=-Math.PI/2;TKHAND.position.set(-.8,1.45,.25);camTo([0,1.5,5.3],[0,1.5,5.3],[0,1.95,0],[0,1.95,0],0,40)}});
// ---- cover v2: the contrast that IS the story: deadpan self-tickle vs. laughing-out-loud tickled by someone else ----
const _tkFace=faceTex;
faceTex=function(st,skin,hair,o={}){if(st!=='laugh')return _tkFace(st,skin,hair,o);const k='laugh'+skin+hair+(o.stubble?1:0);if(FC[k])return FC[k];
 const base=_tkFace('neutral',skin,hair,o);const src=base.image;return FC[k]=ctex(256,128,(x,w,h)=>{x.drawImage(src,0,0);const sk=shade(skin,1.0);
  x.fillStyle=sk;x.fillRect(44,44,40,22);x.fillRect(48,76,32,18);
  x.strokeStyle='#1a1210';x.lineWidth=3;for(const cx of[53,75]){x.beginPath();x.arc(cx,57,5.5,Math.PI*1.1,Math.PI*1.9);x.stroke();x.strokeStyle='#1a1210';x.lineWidth=2.2;x.beginPath();x.moveTo(cx-5,45);x.lineTo(cx+5,43);x.stroke();x.lineWidth=3}
  x.fillStyle='#e87a8a';x.fillRect(46,64,7,4);x.fillRect(75,64,7,4);
  x.fillStyle='#2a0a10';x.beginPath();x.ellipse(64,85,9,7,0,0,7);x.fill();x.fillStyle='#f4efe6';x.fillRect(57,79,14,3);x.fillStyle='#d04a5a';x.fillRect(59,88,10,3);
  x.fillStyle='#5ab8ff';x.fillRect(46,58,2,6);x.fillRect(80,58,2,6)})};
const TKP2=person({hairCap:1,coat:'#2f8070',shortSleeve:1,pants:'#2d5f9a',hair:'#4a3020',stubble:1,skin:'#e8b894'});
const TKTEAR=[...Array(8)].map(()=>{const m=box(.06,.15,.06,new THREE.MeshBasicMaterial({color:0x5ab8ff}));S.add(m);ACT.push(m);return m});
Object.assign(SHOTS,{tcover2:(u,d,k)=>{tkEnv('home');show(POLY,TKP2,TKHAND);TKFEATHER.visible=true;
 POLY.rest();POLY.at(-.4,0,0,.3);POLY.face('bored');POLY.arms[1].rotation.set(-1.75,0,-.55);
 TKP2.rest();TKP2.at(.42,0,0,-.3);TKP2.face('laugh');TKP2.g.rotation.z=.08;TKP2.arms[0].rotation.set(-.2,0,-.95);TKP2.arms[1].rotation.set(-.2,0,.95);
 TKHAND.userData.f.forEach((f,i)=>f.rotation.x=-.2+i*.1);TKHAND.rotation.y=Math.PI/2;TKHAND.position.set(.8,1.3,1.5);
 [[.78,1.78,.3],[.86,1.66,.3],[.74,1.95,.3],[.6,2.04,.3],[.9,1.86,.3],[.7,1.58,.3]].forEach((p,i)=>{TKTEAR[i].visible=true;TKTEAR[i].scale.setScalar(.4);TKTEAR[i].position.set(p[0],p[1],p[2])});
 camTo([0,1.8,3.7],[0,1.8,3.7],[0,2.0,0],[0,2.0,0],0,40)}});
// ---- cover v3: ONE huge hero (the laughing face) on a vivid flat background; the tickling glove is rendered in its own pass (green screen) and composited big in the foreground by make_cover.py ----
Object.assign(SHOTS,{tcover3:(u,d,k)=>{tkEnv('home');show(TKP2);
 TKP2.rest();TKP2.at(.21,0,0,.18);TKP2.face('laugh');TKP2.g.rotation.z=.12;TKP2.arms[0].rotation.set(-.2,0,-.95);TKP2.arms[1].rotation.set(-.2,0,.95);
 camTo([0,1.7,1.55],[0,1.7,1.55],[0,1.84,0],[0,1.84,0],0,40);cam.rotateZ(.14)},
 tcover3c:(u,d,k)=>{tkOff();S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.2;show(TKP2);TKP2.rest();TKP2.at(.21,0,0,.18);TKP2.face('laugh');TKP2.g.rotation.z=.12;TKP2.arms[0].rotation.set(-.2,0,-.95);TKP2.arms[1].rotation.set(-.2,0,.95);camTo([0,1.7,1.55],[0,1.7,1.55],[0,1.84,0],[0,1.84,0],0,40);cam.rotateZ(.14)},
 tcover3g:(u,d,k)=>{tkOff();S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.5;show(TKHAND);TKHAND.userData.f.forEach((f,i)=>f.rotation.x=-.3+i*.14);TKHAND.rotation.set(Math.PI/2,0,.5);TKHAND.position.set(0,0,0);camTo([0,.1,3.4],[0,.1,3.4],[0,0,0],[0,0,0],0,40)}});
