// ===== 3D TOON CHARACTERS (thick black outline, big heads, cel shading) — The Last Bus look, in real 3D =====
const GM=(()=>{const d=new Uint8Array([70,150,255]);const t=new THREE.DataTexture(d,3,1,THREE.RedFormat);t.minFilter=t.magFilter=THREE.NearestFilter;t.needsUpdate=true;return t})();
const OUTM=new THREE.MeshBasicMaterial({color:0x120a08,side:THREE.BackSide});
const toon=(c)=>new THREE.MeshToonMaterial({color:c,gradientMap:GM,fog:false});
function part(geo,color,k=.075,cast=true){const m=new THREE.Mesh(geo,typeof color==='number'||typeof color==='string'?toon(color):color);m.castShadow=cast;if(k){const o=new THREE.Mesh(geo,OUTM);o.scale.setScalar(1+k);m.add(o)}return m}
const sph=(r,w=24,h=18)=>new THREE.SphereGeometry(r,w,h),cap=(r,l)=>new THREE.CapsuleGeometry(r,l,6,14);
function toonPerson(cfg){const S=cfg.s||1,g=new THREE.Group(),W=cfg.w||1;const skin=cfg.skin;const U={};g.userData=U;U.cfg=cfg;
 const hip=new THREE.Group();hip.position.y=.50*S;g.add(hip);U.hip=hip;
 U.legs=[];for(const sx of[-1,1]){const lg=new THREE.Group();lg.position.set(sx*.105*S*W,0,0);const th=part(cap(.075*S,.30*S),cfg.pants);th.position.y=-.19*S;lg.add(th);const sh=part(sph(.085*S),cfg.shoe||0x222222);sh.scale.set(1,.62,1.55);sh.position.set(0,-.43*S,.05*S);lg.add(sh);hip.add(lg);U.legs.push(lg)}
 const torso=new THREE.Group();torso.position.y=.02*S;hip.add(torso);U.torso=torso;
 const body=part(cap(.165*S*W,.26*S),cfg.shirt);body.position.y=.22*S;body.scale.z=.85;torso.add(body);
 if(cfg.vest){const v=part(cap(.172*S*W,.2*S),cfg.vest,.06);v.position.y=.2*S;v.scale.set(1,1,.9);torso.add(v)}
 if(cfg.tag){const tg=part(new THREE.BoxGeometry(.07*S,.04*S,.01*S),0xf4f0e0,.2);tg.position.set(-.08*S*W,.3*S,.145*S*W);torso.add(tg)}
 if(cfg.badge){const b=part(sph(.03*S,10,8),0xe8c030,.2);b.position.set(-.1*S*W,.34*S,.14*S*W);torso.add(b)}
 // arms
 U.arms=[];for(const sx of[-1,1]){const sh=new THREE.Group();sh.position.set(sx*(.2*S*W),.40*S,0);const ua=part(cap(.052*S,.13*S),cfg.sleeve==='short'?skin:cfg.shirt);ua.position.y=-.11*S;sh.add(ua);if(cfg.sleeve==='short'){const sl=part(cap(.058*S,.05*S),cfg.shirt,.08);sl.position.y=-.04*S;sh.add(sl)}
  const el=new THREE.Group();el.position.y=-.23*S;sh.add(el);const fa=part(cap(.046*S,.12*S),skin);fa.position.y=-.1*S;el.add(fa);const hd=part(sph(.062*S),skin);hd.position.y=-.24*S;el.add(hd);torso.add(sh);U.arms.push({sh,el,hd})}
 // head
 const head=new THREE.Group();head.position.y=.62*S;torso.add(head);U.head=head;
 const nk=part(cap(.05*S,.04*S),skin,.08);nk.position.y=-.2*S;head.add(nk);
 const sk=part(sph(.31*S,32,24),skin,.05);sk.scale.set(1,.95,.96);sk.position.y=.02*S;head.add(sk);
 for(const sx of[-1,1]){const ear=part(sph(.06*S),skin,.1);ear.position.set(sx*.3*S,0,0);ear.scale.z=.5;head.add(ear)}
 U.eyes=[];for(const sx of[-1,1]){const eg=new THREE.Group();eg.position.set(sx*.115*S,.04*S,.255*S);const ew=part(sph(.092*S,20,14),0xffffff,.13);ew.scale.set(1,1.08,.55);eg.add(ew);const pu=new THREE.Mesh(sph(.042*S,14,10),new THREE.MeshBasicMaterial({color:0x0a0606}));pu.position.set(0,0,.045*S);eg.add(pu);const hl=new THREE.Mesh(sph(.014*S,8,6),new THREE.MeshBasicMaterial({color:0xffffff}));hl.position.set(-.014*S,.016*S,.075*S);eg.add(hl);head.add(eg);U.eyes.push({eg,ew,pu})}
 U.brows=[];for(const sx of[-1,1]){const br=part(new THREE.BoxGeometry(.13*S,.032*S,.02*S),cfg.hc||0x2a1a10,.2);br.position.set(sx*.115*S,.15*S,.28*S);head.add(br);U.brows.push(br)}
 const nose=part(sph(.04*S,12,10),skin,.12);nose.position.set(0,-.03*S,.3*S);nose.scale.z=.8;head.add(nose);
 // mouths
 U.mSmile=part(new THREE.TorusGeometry(.075*S,.014*S,8,18,Math.PI),0x2a0e0e,0,false);U.mSmile.position.set(0,-.12*S,.27*S);U.mSmile.rotation.z=Math.PI;head.add(U.mSmile);
 U.mFlat=part(new THREE.BoxGeometry(.12*S,.018*S,.02*S),0x2a0e0e,0,false);U.mFlat.position.set(0,-.14*S,.28*S);head.add(U.mFlat);
 U.mOpen=part(sph(.065*S,16,12),0x3a0a0e,.12,false);U.mOpen.scale.set(1.15,1,.5);U.mOpen.position.set(0,-.15*S,.27*S);head.add(U.mOpen);
 const teeth=part(new THREE.BoxGeometry(.09*S,.025*S,.012*S),0xf6f2e6,.0,false);teeth.position.set(0,.03*S,.06*S);U.mOpen.add(teeth);
 U.mFrown=part(new THREE.TorusGeometry(.065*S,.014*S,8,18,Math.PI),0x2a0e0e,0,false);U.mFrown.position.set(0,-.17*S,.27*S);head.add(U.mFrown);
 // hair / hats
 const hc=cfg.hc||0x2a1a10;if(cfg.hair==='bun'){const h=part(sph(.34*S,28,18,0,Math.PI*2,0,Math.PI*.47),hc,.05);h.position.set(0,.04*S,-.05*S);h.rotation.x=-.42;head.add(h);const bun=part(sph(.12*S),hc,.08);bun.position.set(0,.3*S,-.22*S);head.add(bun)}
 else if(cfg.hair==='cap'){const h=part(sph(.34*S,28,18,0,Math.PI*2,0,Math.PI*.46),hc,.05);h.position.set(0,.07*S,-.04*S);h.rotation.x=-.3;head.add(h);const br=part(new THREE.CylinderGeometry(.27*S,.31*S,.03*S,20,1,false,-.9,1.8),hc,.07);br.position.set(0,.2*S,.2*S);br.rotation.x=.2;br.scale.set(1,1,1.25);head.add(br);const bd=part(sph(.04*S,10,8),0xe8c030,.2);bd.position.set(0,.29*S,.25*S);head.add(bd)}
 else if(cfg.hair==='messy'){const h=part(sph(.335*S,28,18,0,Math.PI*2,0,Math.PI*.44),hc,.05);h.position.set(0,.07*S,-.05*S);h.rotation.x=-.32;head.add(h);for(let i=0;i<6;i++){const tf=part(new THREE.ConeGeometry(.06*S,.14*S,8),hc,.1);const a=i*1.05;tf.position.set(Math.cos(a)*.2*S,.34*S,Math.sin(a)*.15*S-.05*S);tf.rotation.z=-Math.cos(a)*.6;head.add(tf)}}
 else if(cfg.hair==='grey'){const h=part(sph(.335*S,28,18,0,Math.PI*2,0,Math.PI*.44),hc,.05);h.position.set(0,.06*S,-.05*S);h.rotation.x=-.32;head.add(h)}
 if(cfg.stache){const st=part(sph(.07*S,12,8),cfg.stache,.1);st.scale.set(1.7,.55,.6);st.position.set(0,-.085*S,.3*S);head.add(st)}
 if(cfg.beard){const bd=part(sph(.22*S,18,12,0,Math.PI*2,Math.PI*.35,Math.PI*.5),cfg.beard,.06);bd.position.set(0,-.02*S,.06*S);bd.scale.set(1,1,.9);head.add(bd)}
 if(cfg.glasses){for(const sx of[-1,1]){const gl=part(new THREE.TorusGeometry(.1*S,.014*S,8,20),0x181410,.1);gl.position.set(sx*.115*S,.04*S,.29*S);head.add(gl)}const br=part(new THREE.BoxGeometry(.06*S,.012*S,.012*S),0x181410,.1);br.position.set(0,.05*S,.3*S);head.add(br)}
 g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
function toonZombie(cfg){const g=toonPerson(Object.assign({skin:0x8c9c84,shirt:0x3a3c44,pants:0x24262c,shoe:0x14120e,hair:'none',s:1.12,w:.78},cfg||{}));const U=g.userData,S=U.cfg.s||1;U.isZ=true;
 U.head.scale.set(.82,1.18,.88);U.head.position.y=.64*S;
 // hollow cheeks + dark mottling
 for(const sx of[-1,1]){const ch=part(sph(.1*S,10,8),0x4a5646,.0,false);ch.scale.set(.8,1.2,.4);ch.position.set(sx*.17*S,-.08*S,.22*S);U.head.add(ch)}
 const mot=part(sph(.1*S,10,8),0x5a4a52,.0,false);mot.scale.set(1.3,.7,.3);mot.position.set(-.1*S,.16*S,.27*S);U.head.add(mot);
 for(const e of U.eyes){e.ew.material=toon(0xe6e0b4);e.ew.scale.set(.8,.9,.5);e.pu.material=new THREE.MeshBasicMaterial({color:0xc01810});e.pu.scale.setScalar(.7);const so=new THREE.Mesh(sph(.14*S,14,10),new THREE.MeshBasicMaterial({color:0x080404}));so.scale.set(1.05,1.1,.5);so.position.set(0,.005*S,-.02*S);e.eg.add(so);e.eg.position.z-=.005*S}
 U.brows.forEach(b=>{b.scale.set(1.2,1.4,1);b.position.y=.17*S;b.material=toon(0x1a1a14)});
 // wide dark mouth, long jaw, teeth rows
 U.mOpen.material=toon(0x3a0608);U.mOpen.scale.set(1.5,1.9,.7);U.mOpen.position.y=-.17*S;
 for(let i=-3;i<=3;i++){const tt=part(new THREE.ConeGeometry(.013*S,.05*S,5),0xe8dfb4,.1,false);tt.position.set(i*.02*S,.04*S,.04*S);tt.rotation.x=Math.PI;U.mOpen.add(tt);const tb=part(new THREE.ConeGeometry(.012*S,.04*S,5),0xe0d6a8,.1,false);tb.position.set(i*.02*S,-.045*S,.04*S);U.mOpen.add(tb)}
 const jaw=part(sph(.1*S,10,8),0x6a7a60,.06,false);jaw.scale.set(1,.7,.9);jaw.position.set(0,-.27*S,.2*S);U.head.add(jaw);U.jaw=jaw;
 // blood from mouth + neck bite + torso stains
 const bl=part(sph(.04*S,8,6),0x8a0c10,.0,false);bl.scale.set(1,3.2,.4);bl.position.set(.07*S,-.3*S,.27*S);U.head.add(bl);const bl3=bl.clone();bl3.position.set(-.1*S,-.28*S,.26*S);bl3.scale.set(.8,2.4,.4);U.head.add(bl3);
 const neck=part(sph(.07*S,8,6),0x9a1418,.08,false);neck.scale.set(1.3,.9,.5);neck.position.set(.08*S,-.18*S,.1*S);U.head.add(neck);
 const bl2=part(sph(.12*S,10,8),0x6a0a0e,.0,false);bl2.scale.set(1.2,1.4,.25);bl2.position.set(.04*S,.28*S,.16*S);U.torso.add(bl2);const bl4=part(sph(.08*S,8,6),0x7a0c10,.0,false);bl4.scale.set(1,1.3,.25);bl4.position.set(-.1*S,.12*S,.16*S);U.torso.add(bl4);
 // torn shirt flaps
 for(let i=0;i<3;i++){const fl=part(new THREE.ConeGeometry(.04*S,.12*S,4),cfg&&cfg.shirt||0x3a3c44,.1,false);fl.position.set((i-1)*.08*S,.02*S,.14*S);fl.rotation.x=Math.PI;U.torso.add(fl)}
 // sparse hair strands
 for(let i=0;i<5;i++){const st=part(new THREE.CylinderGeometry(.004*S,.003*S,.14*S,4),0x1a1610,.0,false);st.position.set((i-2)*.07*S,.32*S,-.02*S);st.rotation.z=(i-2)*.25;U.head.add(st)}
 // long arms / claw hands
 U.arms.forEach(a=>{a.sh.scale.set(1,1.18,1);a.hd.scale.set(.8,1.5,.8)});
 return g}
// ===== animation =====
function setExpr(U,e,open){const S=U.cfg.s||1;const set=(sm,fl,op,fr)=>{U.mSmile.visible=sm;U.mFlat.visible=fl;U.mOpen.visible=op;U.mFrown.visible=fr};
 const cfg={calm:[.0,.0,1],smile:[.3,0,1.0],scared:[.45,-.1,1.35],shock:[.5,-.15,1.4],worried:[-.35,0,1.1],angry:[.55,0,.8],sad:[-.4,0,.95],smug:[.2,.2,.8],tired:[0,0,.7]}[e]||[0,0,1];
 U.brows.forEach((b,i)=>{const sx=i?1:-1;b.rotation.z=sx*-cfg[0]*(e==='angry'?-1:1)*(e==='angry'?1:-1)*.0+(e==='angry'?sx*.45:e==='scared'||e==='shock'||e==='worried'||e==='sad'?-sx*.4:0);b.position.y=(.15+(e==='scared'||e==='shock'?.05:e==='angry'?-.02:e==='tired'?-.03:0))*S;if(e==='smug'&&i)b.position.y+=.03*S});
 const eo=cfg[2];U.eyes.forEach(ev=>{ev.eg.scale.set(1,eo,1)});
 if(open>.12||e==='shock'||e==='scared'&&open>.05)set(false,false,true,false);else if(e==='smile'||e==='smug')set(true,false,false,false);else if(e==='worried'||e==='sad')set(false,false,false,true);else set(false,true,false,false);
 const o=Math.max(open,e==='shock'?.6:0);U.mOpen.scale.y=(U.isZ?1.2:.8)+o*1.1;U.mOpen.position.y=-.15*S-o*.02*S;if(U.mSmile.visible&&e==='smug')U.mSmile.rotation.z=Math.PI*.9}
function animPerson(g,t,st){const U=g.userData,S=U.cfg.s||1,ph=(st.seed||0)*1.7;const act=st.act||'idle',sp=st.speaking;
 const br=Math.sin(t*1.7+ph);U.torso.scale.y=1+br*.012;U.head.rotation.set(0,0,0);U.head.position.y=.62*S+br*.004*S;
 U.legs.forEach(l=>l.rotation.set(0,0,0));U.arms.forEach(a=>{a.sh.rotation.set(0,0,0);a.el.rotation.set(0,0,0)});U.hip.position.y=.50*S;U.hip.rotation.set(0,0,0);U.torso.rotation.set(0,0,0);
 const idle=()=>{U.arms[0].sh.rotation.z=.12+Math.sin(t*1.2+ph)*.03;U.arms[1].sh.rotation.z=-.12-Math.sin(t*1.2+ph)*.03;U.arms[0].el.rotation.x=-.15;U.arms[1].el.rotation.x=-.15};
 idle();
 if(act==='walk'||act==='run'){const f=act==='run'?9:5.5,a=act==='run'?.7:.45;const w=Math.sin(t*f+ph);U.legs[0].rotation.x=w*a;U.legs[1].rotation.x=-w*a;U.arms[0].sh.rotation.x=-w*a*.9;U.arms[1].sh.rotation.x=w*a*.9;U.hip.position.y=.50*S+Math.abs(Math.cos(t*f+ph))*.035*S;U.torso.rotation.x=act==='run'?.2:.04}
 else if(act==='scared'){const sh=Math.sin(t*38+ph)*.012*S;U.arms[0].sh.rotation.set(-.9,0,.5);U.arms[1].sh.rotation.set(-.9,0,-.5);U.arms[0].el.rotation.x=-1.5;U.arms[1].el.rotation.x=-1.5;g.position.x+=sh;U.torso.rotation.x=-.12}
 else if(act==='reach'){U.arms[0].sh.rotation.set(-1.55,0,.18);U.arms[1].sh.rotation.set(-1.25,0,-.22);U.arms[0].el.rotation.x=-.05;U.arms[1].el.rotation.x=-.3;U.torso.rotation.x=.34;U.head.rotation.x=.1;const w=Math.sin(t*2.2+ph);U.legs[0].rotation.x=w*.28;U.legs[1].rotation.x=-w*.28}
 else if(act==='point'){U.arms[1].sh.rotation.set(-1.4,0,-.1);U.arms[1].el.rotation.x=-.05}
 else if(act==='shush'){U.arms[1].sh.rotation.set(-1.1,0,-.2);U.arms[1].el.rotation.x=-1.9}
 else if(act==='hands'){U.arms[0].sh.rotation.set(-.6,0,.7);U.arms[1].sh.rotation.set(-.6,0,-.7);U.arms[0].el.rotation.x=-.9;U.arms[1].el.rotation.x=-.9}
 if(sp&&act==='idle'){U.arms[1].sh.rotation.set(-.55+Math.sin(t*4.2+ph)*.18,0,-.25);U.arms[1].el.rotation.x=-1.1+Math.sin(t*5.1+ph)*.25;U.head.rotation.x=Math.sin(t*3.3+ph)*.05;U.head.rotation.y=Math.sin(t*1.9+ph)*.1}
 if(st.look)U.head.rotation.y+=st.look*.35;
 if(U.isZ){U.head.rotation.z=Math.sin(t*1.1+ph)*.22;U.head.rotation.x=-.05+Math.sin(t*.7+ph)*.05;U.torso.rotation.z=Math.sin(t*.9+ph)*.06}
 const open=sp?Math.abs(Math.sin(t*11+ph))*(.55+.45*Math.sin(t*2.7+ph)):(U.isZ?(.35+Math.abs(Math.sin(t*1.6+ph))*.5):0);setExpr(U,st.expr||'calm',open);if(U.jaw){U.jaw.position.y=(-.27-open*.1)*S;U.jaw.rotation.x=open*.4}}
const TCAST={
 mimi:()=>toonPerson({s:1.0,w:.95,skin:0xe8b898,shirt:0x2fa86a,pants:0x2a2e3a,shoe:0x1a1a1a,hair:'bun',hc:0x8a3a22,tag:1,sleeve:'short'}),
 gus:()=>toonPerson({s:1.12,w:1.3,skin:0xc8946a,shirt:0x2a3a5a,pants:0x1a2030,shoe:0x0e0e12,hair:'cap',hc:0x1a2a4a,stache:0x2a1c12,badge:1,sleeve:'short'}),
 teddy:()=>toonPerson({s:.72,w:.85,skin:0xe8bc94,shirt:0xe84a4a,pants:0x2a3a6a,shoe:0xf0f0f0,hair:'messy',hc:0x5a3418}),
 vance:()=>toonPerson({s:1.05,w:1.0,skin:0x8a5a3c,shirt:0xb89a62,pants:0x3a4a5a,shoe:0x2a2018,hair:'grey',hc:0xa8a8a8,beard:0xa8a8a8,glasses:1}),
 rosa:()=>toonPerson({s:1.0,w:1.0,skin:0xc8906a,shirt:0x8a4aa8,pants:0x3a3040,shoe:0x222222,hair:'bun',hc:0x2a1a14}),
 z1:()=>toonZombie({shirt:0x3a3c44,hair:'messy',hc:0x2a2418}),
 z2:()=>toonZombie({s:1.08,shirt:0x4a3030,pants:0x2a2a30,hair:'grey',hc:0x44403a}),
 z3:()=>toonZombie({s:.96,shirt:0x2c4050,hair:'none'}),
 z4:()=>toonZombie({s:1.15,shirt:0x424a30,pants:0x30302a,hair:'cap',hc:0x1a2a1a})};
