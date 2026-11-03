// STAGE KIT: declarative shots for fast clip production. Used by files made with mkclip.py (each clip file is wrapped in an IIFE, so names never collide).
const STGENV={field:[0xbfe0f6,0x6aaa4a],hill:[0xbfe0f6,0x7aba5a],sand:[0xd8ecf8,0xe0c890],snow:[0xd8e8f4,0xeef4fa],room:[0xe8dcc0,0xc8b890],hall:[0x2a2230,0x6a4a2a],street:[0xbfe0f6,0x9a9aa0],sea:[0x9ad0f0,0x2a6ab0],night:[0x141a30,0x3a4a3a],lab:[0xe8eef4,0xd8e0e8],dusk:[0xf0c8a0,0x8a7a5a],paper:[0xf4ecd8,0xe8dcc0],red:[0xe8b8b0,0x9a5a4a]};
const STGFL={};
function stgEnv(n){const e=STGENV[n||'field'];kitEnv(e[0],1.25,e[0]);let f=STGFL[e[1]];if(!f){f=kitFloor(e[1],60,60);STGFL[e[1]]=f}show(f)}
const STGPOSE={idle:()=>{},cheer:(P,u)=>{P.arms[1].rotation.set(-2.6+Math.sin(u*6)*.2,0,.3)},both:(P,u)=>{P.arms[0].rotation.set(-2.6+Math.sin(u*7)*.25,0,-.3);P.arms[1].rotation.set(-2.6-Math.sin(u*7)*.25,0,.3)},panic:(P,u)=>{P.arms[0].rotation.set(-2.5,0,-.3);P.arms[1].rotation.set(-2.5,0,.3);P.g.position.y=Math.abs(Math.sin(u*9))*.06},point:(P)=>{P.arms[1].rotation.set(-1.5,0,-.3)},hold:(P,u)=>{P.arms[0].rotation.set(-1.3,0,.2);P.arms[1].rotation.set(-1.3,0,-.2)},fight:(P,u)=>{P.arms[0].rotation.set(-1.4+Math.sin(u*9)*.3,0,.2);P.arms[1].rotation.set(-1.4-Math.sin(u*9)*.3,0,-.2);P.g.position.x+=Math.sin(u*30)*.01},shrug:(P,u)=>{P.arms[0].rotation.set(-.9,0,-.5);P.arms[1].rotation.set(-.9,0,.5);P.head.rotation.z=Math.sin(u*3)*.1},sad:(P,u)=>{P.head.rotation.x=.4;P.arms[0].rotation.set(-.2,0,0);P.arms[1].rotation.set(-.2,0,0)},salute:(P)=>{P.arms[1].rotation.set(-2.5,0,.4)},walk:(P,u)=>{if(P.walk)P.walk(u,6,.5)},run:(P,u)=>{if(P.walk)P.walk(u,12,.9)},think:(P,u)=>{P.arms[1].rotation.set(-2.2,0,-.5);P.head.rotation.z=Math.sin(u*2)*.08}};
function stgShot(c){return(u,d,k)=>{stgEnv(c.env);(c.who||[]).forEach(w=>{const P=w[0];show(P);if(P.rest)P.rest();if(P.face&&w[4])P.face(w[4]);if(P.at)P.at(w[1],w[6]||0,w[2],w[3]||0);if(w[7])(P.g||P).scale.setScalar(w[7]);const f=STGPOSE[w[5]||'idle'];if(f&&P.arms)f(P,u+(w[8]||0))});
 (c.props||[]).forEach(p=>{const G=p[0].g||p[0];show(G);G.position.set(p[1],p[2],p[3]);G.scale.setScalar(p[4]||1);G.rotation.set(0,p[5]||0,0);if(p[6])p[6](G,u,d,k)});
 (c.signs||[]).forEach(s=>{const at=s[5]||0;const G=s[0];if(u>=at){show(G);G.position.set(s[1],s[2],s[3]);G.scale.setScalar((s[4]||.7)*1.15*kitPop(u,at+.1,.12,8))}});
 if(c.tag)window.TAG(c.tag[0],c.tag[1],c.tag[2]||'#ffd83a');
 if(c.stamp)window.STAMP={on:1,u:u-(c.stampAt==null?.4:c.stampAt),text:c.stamp,c:c.sc||'#c4202a',rot:-4};
 const m=c.cam||[0,2.0,6.4,0,1.4,1.7,56];const mv=c.move||.5;camTo([m[0],m[1],m[2]],[m[0],m[1],m[2]-mv],[m[3],m[4],m[5]],[m[3],m[4],m[5]],k,m[6]);
 if(c.extra)c.extra(u,d,k)}}
// quick builders
function stgPerson(coat,pants,hair,skin,o){return person(Object.assign({coat,pants,hair,skin,boots:1,belt:1},o||{}))}
function stgHat(P,type,col){const c=new THREE.Group();const m=M(col==null?0x1a1a1e:col);
 if(type==='top'){cyl(.17,.19,.34,10,m,0,.36,0,c);cyl(.26,.26,.03,12,m,0,.17,0,c)}
 else if(type==='slouch'){cyl(.36,.36,.025,14,m,0,.13,0,c);cyl(.17,.19,.15,12,m,0,.22,0,c)}
 else if(type==='cap'){cyl(.2,.22,.12,10,m,0,.17,0,c);box(.34,.03,.2,m,0,.11,.2,c)}
 else if(type==='helmet'){const d=new THREE.Mesh(new THREE.SphereGeometry(.23,12,8,0,Math.PI*2,0,Math.PI/2),m);d.position.y=.07;c.add(d);cyl(.28,.28,.02,14,m,0,.08,0,c)}
 else if(type==='crown'){cyl(.2,.22,.14,8,m,0,.17,0,c);for(let i=0;i<5;i++)cone(.05,.14,4,m,Math.cos(i*1.26)*.18,.3,Math.sin(i*1.26)*.18,c)}
 else if(type==='chef'){cyl(.17,.2,.34,10,m,0,.38,0,c)}
 else if(type==='straw'){cyl(.3,.3,.03,10,m,0,.11,0,c);cyl(.17,.19,.17,10,m,0,.2,0,c)}
 else if(type==='bandana'){box(.4,.06,.4,m,0,.12,0,c)}
 c.position.y=-.02;P.head.add(c);return c}
function stgSign(a,b,bg,fg,w){const s=kitSign2(a,b||'',bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s}
function stgBlock(w,h,d,col){const g=new THREE.Group();box(w,h,d,M(col),0,h/2,0,g);S.add(g);ACT.push(g);return g}
function stgBall(r,col){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),M(col)));g.children[0].position.y=r;S.add(g);ACT.push(g);return g}
function stgGroup(){const g=new THREE.Group();S.add(g);ACT.push(g);return g}
