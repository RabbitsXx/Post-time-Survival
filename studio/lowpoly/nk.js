// WHAT IF NORTH KOREA RULED THE WORLD: numbers-based explainer. Models: soldier (olive uniform, peaked cap, red badge), Earth globe, national flag on a pole, crowd of pawns (instanced), missiles, bar chart.
const NKOLIVE='#5d6b3a';
const NKSOL=person({coat:NKOLIVE,pants:'#4c5a30',hair:'#1a1210',skin:'#e2b48f',boots:1,belt:1,tails:0});
(()=>{const P=NKSOL,hd=P.head;const cap=new THREE.Group();cyl(.2,.215,.13,12,M(0x5d6b3a),0,.15,0,cap);const top=new THREE.Mesh(new THREE.CylinderGeometry(.25,.2,.05,12),M(0x6b7a44));top.position.y=.23;cap.add(top);box(.34,.025,.2,M(0x2a3018),0,.085,.2,cap);const bd=box(.07,.07,.02,M(0xc4202a),0,.17,.21,cap);bd.rotation.z=.78;cap.position.y=.035;cap.rotation.x=-.08;hd.add(cap);
 for(const sx of[-1,1])box(.14,.04,.1,M(0xc4202a),sx*.3,1.52,0,P.g);for(let i=0;i<4;i++)box(.035,.035,.02,M(0xe8c040),0,1.12+i*.12,.2,P.g)})();
// Earth
const NKEARTH=(()=>{const t=ctex(512,256,(x,w,h)=>{x.fillStyle='#2b78d0';x.fillRect(0,0,w,h);x.fillStyle='#3a8be0';for(let i=0;i<40;i++)x.fillRect(rn(i)*w,rn(i+5)*h,40,2);
 const poly=(pts,c)=>{x.fillStyle=c;x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill()};
 poly([[60,50],[110,35],[160,45],[185,70],[170,95],[150,115],[130,125],[115,110],[95,95],[70,80]],'#4aa04a');
 poly([[140,130],[175,125],[195,150],[185,185],[165,215],[150,200],[145,165]],'#4a9a44');
 poly([[250,55],[290,40],[350,35],[430,45],[470,65],[450,90],[420,105],[390,125],[355,115],[330,100],[300,95],[275,85],[255,75]],'#5aa84a');
 poly([[255,100],[300,95],[325,115],[320,150],[300,185],[280,185],[265,150],[250,120]],'#c8b060');
 poly([[415,160],[455,155],[470,175],[450,195],[420,190]],'#d8a850');
 poly([[210,25],[240,20],[235,45],[215,45]],'#f4f4f4');x.fillStyle='#f4f4f4';x.fillRect(0,0,w,10);x.fillRect(0,246,w,10)});
 const m=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),new THREE.MeshLambertMaterial({map:t,flatShading:false}));const g=new THREE.Group();g.add(m);g.userData.m=m;S.add(g);ACT.push(g);return g})();
// the national flag (as a prop) on a pole
const NKFLAGT=ctex(96,48,(x,w,h)=>{x.fillStyle='#2a4aa0';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.fillRect(0,7,w,34);x.fillStyle='#c4202a';x.fillRect(0,10,w,28);x.fillStyle='#fff';x.beginPath();x.arc(34,24,12,0,7);x.fill();x.fillStyle='#c4202a';x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?4.2:11;x.lineTo(34+Math.cos(a)*r,24+Math.sin(a)*r)}x.fill()});
const NKFLAG=(()=>{const g=new THREE.Group();cyl(.03,.03,1.1,5,M(0xc9ced6),0,.55,0,g);const f=flagMesh(NKFLAGT,.7,.36);f.position.set(.37,.95,0);g.add(f);g.userData.f=f;S.add(g);ACT.push(g);return g})();
// crowd of pawns (instanced): body cone + head sphere
function nkCrowd(n,cols,sp,seedc){const body=new THREE.InstancedMesh(new THREE.ConeGeometry(.1,.22,7),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),n);const head=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.065,0),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),n);const m4=new THREE.Matrix4(),col=new THREE.Color();const pal=[0xe8605a,0x4a90e8,0xf0c23a,0x6ac86a,0xc87ae8,0xff9a4a,0x4ac8c8,0xf29ab4];
 for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols;const x=(c-(cols-1)/2)*sp+(rn(i+seedc)-.5)*sp*.4,z=r*sp+(rn(i+seedc+9)-.5)*sp*.4;m4.makeTranslation(x,.11,z);body.setMatrixAt(i,m4);m4.makeTranslation(x,.29,z);head.setMatrixAt(i,m4);col.set(pal[(i*7+seedc)%pal.length]);body.setColorAt(i,col);head.setColorAt(i,new THREE.Color(0xf0c8a0))}
 body.instanceMatrix.needsUpdate=true;head.instanceMatrix.needsUpdate=true;body.instanceColor.needsUpdate=true;head.instanceColor.needsUpdate=true;const g=new THREE.Group();g.add(body,head);S.add(g);ACT.push(g);return g}
// missile
function nkMissile(){const g=new THREE.Group();cyl(.1,.1,1.2,8,M(0xe8e8e0),0,.6,0,g);cone(.1,.34,8,M(0xc4202a),0,1.37,0,g);for(let i=0;i<3;i++){const f=box(.02,.28,.2,M(0x8a8f98),Math.cos(i*2.1)*.12,.2,Math.sin(i*2.1)*.12,g);f.rotation.y=-i*2.1}return g}
const NKMIS=(()=>{const g=new THREE.Group();for(let i=0;i<50;i++){const m=nkMissile();m.position.set(((i%10)-4.5)*.5,0,Math.floor(i/10)*-.55);g.add(m)}S.add(g);ACT.push(g);return g})();
// bar chart: tiny bar for North Korea, huge bar for the world
const NKCHART=(()=>{const g=new THREE.Group();box(5.2,.1,2.2,M(0xdcd4c0),0,-.05,0,g);const b1=box(.9,1,.9,M(0xc4202a),-1.1,.5,0,g);const b2=box(.9,1,.9,M(0x2a6ad0),1.1,.5,0,g);g.userData={b1,b2};const l1=jkLabel('NORTH KOREA','#ffd0d0',3.4,.85);g.add(l1);const l2=jkLabel('THE WORLD','#d0e0ff',3.4,.85);g.add(l2);g.userData.l1=l1;g.userData.l2=l2;S.add(g);ACT.push(g);return g})();
const NKSTAGE=(()=>{const g=new THREE.Group();box(40,.1,40,M(0x6aaa4a),0,-.06,0,g);S.add(g);ACT.push(g);return g})();
const NKCROWD320=nkCrowd(320,20,.28,3),NKCROWDW=nkCrowd(1200,60,.26,11);
const _nkhide=hideAll;hideAll=function(){_nkhide();NKSOL.g.scale.setScalar(1);NKEARTH.scale.setScalar(1)};
function nkEnv(sky){tkOff();ground.visible=false;S.background=new THREE.Color(sky||0xa8d8f0);S.fog.color.set(sky||0xa8d8f0);HEMI.intensity=1.25;show(NKSTAGE)}
PAM('nksol',(u,d,k)=>{show(NKSOL);NKSOL.rest();NKSOL.at(0,0,0,k*Math.PI*2);NKSOL.face('neutral');camTo([0,1.2,3.3],[0,1.2,3.3],[0,1.05,0],[0,1.05,0],0,36)});
PAM('nkglobe',(u,d,k)=>{show(NKEARTH,NKFLAG);NKEARTH.position.set(0,1.3,0);NKEARTH.scale.setScalar(1.0);NKEARTH.rotation.y=k*Math.PI*2+2.3;NKFLAG.position.set(.0,2.2,.2);NKFLAG.scale.setScalar(.55);camTo([0,1.5,6.2],[0,1.5,6.2],[0,1.4,0],[0,1.4,0],0,36)});
PAM('nkcrowd',(u,d,k)=>{show(NKCROWD320,NKSOL);NKCROWD320.position.set(0,0,-2);NKCROWD320.rotation.y=k*Math.PI*2;NKSOL.rest();NKSOL.at(0,0,2.4,0);camTo([0,5.5,7.5],[0,5.5,7.5],[0,.2,0],[0,.2,0],0,40)});
PAM('nkmis',(u,d,k)=>{show(NKMIS);NKMIS.position.set(0,0,0);NKMIS.rotation.y=k*Math.PI*2;camTo([0,2.6,6.5],[0,2.6,6.5],[0,.8,-1],[0,.8,-1],0,40)});
// ---------------- shots ----------------
const NSH={
n_hook:(u,d,k)=>{nkEnv();show(NKSOL,NKEARTH,NKFLAG);NKEARTH.position.set(1.15,1.95,-.9);NKEARTH.scale.setScalar(1.7);NKEARTH.rotation.y=2.4+u*.9;NKSOL.rest();NKSOL.at(-.55,0,.6,.5);NKSOL.face(u>.85?'shock':'smug');
 const f=cl(u/.85);const sx=-.55+.25,sy=1.45,sz=.6;const tx=.6,ty=2.6,tz=.7;NKFLAG.position.set(lerp(sx,tx,ease(f)),lerp(sy,ty,ease(f))+Math.sin(f*Math.PI)*.8,lerp(sz,tz,ease(f)));NKFLAG.rotation.z=u<.85?-1.0+f*.9:0;NKFLAG.scale.setScalar(.7);NKSOL.arms[1].rotation.set(-2.3+f*.7,0,.3);if(u>.85)SHAKE=.06;
 window.TAG('WHAT IF','NORTH KOREA','#ffd83a');camTo([.1,1.8,7.6],[.1,1.8,5.9],[.1,1.8,0],[.1,1.8,0],k,42)},
n_pop:(u,d,k)=>{nkEnv();show(NKCHART,NKSOL);const w=ease(cl(u/(d*.7)));const U=NKCHART.userData;U.b1.scale.set(1,.05,1);U.b1.position.y=.025;U.b2.scale.set(1,Math.max(.01,3.4*w),1);U.b2.position.y=1.7*w;U.l1.visible=false;U.l2.visible=false;show(NKFLAG,NKEARTH);NKFLAG.position.set(-.7+.4-.1,.05,.1);NKFLAG.rotation.z=0;NKFLAG.scale.setScalar(.9);NKEARTH.scale.setScalar(.5);NKEARTH.position.set(1.5,3.4*w+.65,0);NKEARTH.rotation.y=2.4+u;NKCHART.position.set(.4,0,0);
 NKSOL.rest();NKSOL.at(-1.25,0,1.9,.5);NKSOL.face(w>.9?'shock':'neutral');NKSOL.arms[1].rotation.set(-1.4,0,.3);window.TAG('POPULATION',w>.5?'26M VS 8.3B':'26M VS ...','#7ad0ff');window.STAMP={on:1,u:u-.1,text:'1 : 320',c:'#c4202a',rot:-7};camTo([-.1,3.6,10.8],[-.1,3.6,10.4],[-.1,2.1,0],[-.1,2.1,0],0,42)},
n_ratio:(u,d,k)=>{nkEnv();show(NKCROWD320,NKSOL);NKCROWD320.position.set(0,0,-4.8);NKSOL.rest();NKSOL.at(0,0,1.7,0);NKSOL.face('shock');NKSOL.arms[0].rotation.set(-.4,0,-.9+Math.sin(u*10)*.1);NKSOL.arms[1].rotation.set(-.4,0,.9-Math.sin(u*10)*.1);window.TAG('ONE SOLDIER','320 PEOPLE EACH','#ffb84a');window.STAMP={on:1,u:u-.1,text:'1 : 320',c:'#c4202a',rot:-7};camTo([0,3.1,6.6],[0,3.0,6.2],[0,.9,-1.6],[0,.9,-1.6],k,44)},
n_army:(u,d,k)=>{nkEnv();show(NKCROWDW,NKSOL);NKCROWDW.position.set(0,0,-6.2);NKSOL.rest();NKSOL.at(0,0,1.4,0);NKSOL.face('bored');NKSOL.arms[1].rotation.set(-2.5,0,.2);window.TAG('1.28M SOLDIERS','4TH LARGEST ARMY','#9affb0');window.STAMP={on:1,u:u-.1,text:'1 : 6,500',c:'#c4202a',rot:-7};camTo([0,2.8,5.6],[0,2.7,5.2],[0,.8,-2.4],[0,.8,-2.4],k,46)},
n_nuke:(u,d,k)=>{nkEnv();show(NKMIS,NKSOL,NKEARTH);NKMIS.position.set(.3,0,-1.4);NKEARTH.position.set(2.7,1.5,-5.0);NKEARTH.scale.setScalar(1.3);NKEARTH.rotation.y=2.4+u*.3;NKSOL.rest();NKSOL.at(-.5,0,2.3,.4);NKSOL.face('smug');NKSOL.arms[1].rotation.set(-1.5,0,.3);window.TAG('NUCLEAR WEAPONS','ABOUT 50 (ESTIMATE)','#ff8a8a');window.STAMP={on:1,u:u-.1,text:'1 : 166M',c:'#c4202a',rot:-7};camTo([0,2.9,8.2],[0,2.8,7.8],[.4,.9,-1.4],[.4,.9,-1.4],k,44)},
n_end:(u,d,k)=>{nkEnv();show(NKSOL,NKEARTH,NKFLAG);const f=ease(cl((u-.15)/(d*.55)));const sc=lerp(1,.62,f);NKSOL.rest();NKSOL.at(0,0,.4,0);NKSOL.g.scale.set(1,sc,1);NKSOL.face(f>.25?'shock':'smug');NKSOL.arms[0].rotation.set(-2.75,0,-.25);NKSOL.arms[1].rotation.set(-2.75,0,.25);NKSOL.g.position.x=Math.sin(u*40)*.025*f;
 NKEARTH.scale.setScalar(1.0);NKEARTH.position.set(0,2.0*sc+1.25,.35);NKEARTH.rotation.y=u*1.2;NKFLAG.position.set(0,NKEARTH.position.y+.92,.35);NKFLAG.rotation.z=.25*Math.sin(u*9);NKFLAG.scale.setScalar(.5);if(f>.95&&f<1.01)SHAKE=.06;window.TAG('VERDICT','TOO BIG','#ffd83a');camTo([0,2.4,7.2],[0,2.4,7.2],[0,1.55,0],[0,1.55,0],0,44)}
};
Object.assign(SHOTS,NSH);
// cover: huge soldier face (hero) holding the tiny flag, giant Earth behind (blurred), everything inside the safe zone
Object.assign(SHOTS,{nkcover:(u,d,k)=>{nkEnv();show(NKEARTH);NKEARTH.position.set(.4,1.9,-1.2);NKEARTH.scale.setScalar(1.8);NKEARTH.rotation.y=2.4;camTo([.05,1.85,3.9],[.05,1.85,3.9],[.05,1.85,0],[.05,1.85,0],0,40)},
 nkcoverc:(u,d,k)=>{tkOff();ground.visible=false;S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.25;show(NKSOL,NKFLAG);NKSOL.rest();NKSOL.at(-.1,0,.5,.1);NKSOL.face('shock');NKSOL.arms[1].rotation.set(-2.5,0,.3);NKFLAG.position.set(.42,1.3,.7);NKFLAG.rotation.z=-.15;NKFLAG.scale.setScalar(.85);camTo([.05,1.85,3.9],[.05,1.85,3.9],[.05,1.85,0],[.05,1.85,0],0,40)}});
