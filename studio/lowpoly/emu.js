// THE EMU WAR (Western Australia, 1932).  Models: emu (long neck, shaggy body, googly eyes), Lewis gun with pan magazine, army truck, tank with an emu head in the hatch, slouch-hat soldiers, wheat field, ammo crates, bar chart.
function emuModel(o={}){const g=new THREE.Group(),P={g};
 const feM=new THREE.MeshLambertMaterial({map:fab(o.col||'#8b7258',{seed:11,noise:.34,grad:.5}),flatShading:true});
 const body=new THREE.Mesh(new THREE.IcosahedronGeometry(.5,1),feM);body.scale.set(.8,.82,1.2);body.position.set(0,1.05,-.05);g.add(body);
 for(let i=0;i<16;i++){const a=i/16*6.28,t=new THREE.Mesh(new THREE.IcosahedronGeometry(.17,0),feM);t.position.set(Math.cos(a)*.38,1.0+Math.sin(i*1.7)*.26,Math.sin(a)*.55-.05);t.scale.set(1,.7,1.3);t.rotation.set(i,i*2,0);g.add(t)}
 const bu=new THREE.Mesh(new THREE.IcosahedronGeometry(.3,1),feM);bu.position.set(0,1.0,-.55);g.add(bu);
 P.legs=[-.17,.17].map(x=>{const p=new THREE.Group();p.position.set(x,.95,-.02);g.add(p);const lm=M(0x7d6f60);cyl(.05,.04,.5,6,lm,0,-.25,0,p);const sh=cyl(.035,.03,.5,6,lm,0,-.7,.05,p);sh.rotation.x=-.12;
  for(let j=-1;j<=1;j++){const toe=box(.05,.04,.22,M(0x3a3028),j*.07,-.94,.12,p);toe.rotation.y=j*.35}return p});
 P.neck=new THREE.Group();P.neck.position.set(0,1.28,.4);g.add(P.neck);
 const nm=new THREE.MeshLambertMaterial({map:fab(o.neck||'#8a9cac',{seed:12,noise:.12}),flatShading:true});
 cyl(.055,.07,.5,7,nm,0,.25,0,P.neck);P.neck2=new THREE.Group();P.neck2.position.set(0,.5,0);P.neck.add(P.neck2);cyl(.045,.055,.45,7,nm,0,.22,0,P.neck2);
 P.head=new THREE.Group();P.head.position.set(0,.47,0);P.neck2.add(P.head);
 const hm=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),nm);hm.scale.set(1,.9,1.15);P.head.add(hm);
 const beak=cone(.055,.2,5,M(0x3a3430),0,-.02,.17,P.head);beak.rotation.x=Math.PI/2;beak.scale.set(1.3,1,.6);
 P.pupils=[];P.lids=[];
 for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.06,1),M(0xffffff));e.position.set(sx*.085,.05,.08);P.head.add(e);const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.032,0),M(0x111111));p.position.set(sx*.085,.05,.135);P.head.add(p);P.pupils.push(p);const lid=box(.14,.05,.1,nm,sx*.085,.085,.1,P.head);lid.visible=false;P.lids.push(lid)}
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.7,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);P.bl=bl;
 P.smug=v=>{P.lids.forEach(l=>l.visible=!!v)};
 P.rest=()=>{P.legs.forEach(l=>l.rotation.set(0,0,0));P.neck.rotation.set(.25,0,0);P.neck2.rotation.set(-.45,0,0);P.head.rotation.set(0,0,0);g.rotation.set(0,0,0);g.position.y=0;g.scale.setScalar(1);P.smug(0);P.pupils.forEach((p,i)=>{p.position.x=(i?1:-1)*.085;p.position.y=.05})};
 P.run=(t,sp,am)=>{sp=sp||13;am=am||.9;P.legs[0].rotation.x=Math.sin(t*sp)*am;P.legs[1].rotation.x=-Math.sin(t*sp)*am;g.position.y=Math.abs(Math.sin(t*sp))*.12;P.neck.rotation.x=.25+Math.sin(t*sp*2)*.08;P.neck2.rotation.x=-.45-Math.sin(t*sp*2)*.1};
 P.eat=(t)=>{P.neck.rotation.x=1.05+Math.sin(t*9)*.08;P.neck2.rotation.x=.3};
 P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.y=ry};
 S.add(g);ACT.push(g);return P}
function lewisGun(){const g=new THREE.Group();const dk=M(0x2a2a2e),wd=M(0x6a4a2a);
 const jk=cyl(.06,.06,.75,8,dk,0,0,.45,g);jk.rotation.x=Math.PI/2;const br=cyl(.028,.028,.5,6,dk,0,0,.98,g);br.rotation.x=Math.PI/2;box(.12,.14,.5,dk,0,0,.05,g);cyl(.22,.22,.09,14,M(0x3a3a3e),0,.16,.18,g);box(.08,.12,.42,wd,0,-.03,-.36,g);
 for(const sx of[-1,1]){const b=cyl(.012,.012,.5,4,dk,sx*.1,-.2,.7,g);b.rotation.z=sx*.4;b.rotation.x=.25}
 const fl=new THREE.Mesh(new THREE.IcosahedronGeometry(.16,0),new THREE.MeshBasicMaterial({color:0xffe060}));fl.scale.set(1,1,1.6);fl.position.set(0,0,1.3);fl.visible=false;g.add(fl);g.userData.flash=fl;
 g.scale.setScalar(.85);return g}
const EMU=[...Array(10)].map((_,i)=>emuModel({col:['#8b7258','#7d6650','#977c60','#85705a'][i%4]}));
function emuSoldier(o){const P=person(Object.assign({coat:'#a89a58',pants:'#8e804c',hair:'#4a3020',skin:'#dca47e',boots:1,belt:1},o||{}));kitSlouch(P,0x7a6a3a);return P}
const ESOL=[0,1,2].map(i=>{const P=emuSoldier({skin:['#dca47e','#e8b894','#d49a74'][i],hair:['#3a2418','#6a4220','#2a1c14'][i],stubble:i!==1});const L=lewisGun();P.g.add(L);P.lew=L;L.position.set(.05,1.3,.5);return P});
const EMAJ=emuSoldier({stache:'#5a4a38',skin:'#e8b894',hair:'#6a5238'});
const EFARM=[0,1].map(i=>{const P=person({coat:['#b0553a','#5a7a4a'][i],pants:'#3a5688',hat:'straw',belt:1,hair:'#6a4220',stubble:1,skin:'#dca47e'});return P});
function aimGun(P,on,flash){P.arms[0].rotation.set(on?-1.45:-.3,0,on?.12:0);P.arms[1].rotation.set(on?-1.5:-.3,0,on?-.1:0);P.lew.visible=true;P.lew.position.set(.05,1.3,on?.5:.3);P.lew.rotation.set(on?0:-1.1,0,0);P.lew.userData.flash.visible=!!flash}
// army truck (front +z)
const ETRUCK=(()=>{const g=new THREE.Group();const olive=M(0x586a3c),dk=M(0x2a2a2a);box(1.7,.3,3.6,M(0x3a3a2a),0,.55,0,g);
 const cab=box(1.7,1.2,1.2,olive,0,1.2,1.1,g);box(1.5,.5,.06,M(0xbfe8ff),0,1.5,1.72,g);box(1.72,.12,1.3,olive,0,1.84,1.1,g);
 box(1.7,.12,2.3,olive,0,.8,-.85,g);box(.1,.65,2.3,olive,.8,1.1,-.85,g);box(.1,.65,2.3,olive,-.8,1.1,-.85,g);box(1.7,.65,.1,olive,0,1.1,-1.95,g);
 for(const sx of[-1,1])for(const z of[1.1,-1.1]){const w=cyl(.42,.42,.28,10,dk,sx*.85,.42,z,g);w.rotation.z=Math.PI/2}
 for(const sx of[-1,1])box(.2,.2,.05,new THREE.MeshBasicMaterial({color:0xfff2a0}),sx*.5,.85,1.82,g);
 for(const sx of[-1,1]){const s=paSign('ARMY','#d8d0a0','#2a3a1a',.9,.4,24);s.position.set(sx*.87,1.25,1.1);s.rotation.y=sx*Math.PI/2;g.add(s)}
 S.add(g);ACT.push(g);return g})();
// tank with an emu in the hatch
const ETANK=(()=>{const g=new THREE.Group();const olive=M(0x586a3c),dk=M(0x2a2a2a),ol2=M(0x4a5a30);box(2.0,.9,3.2,olive,0,.9,0,g);
 for(const sx of[-1,1]){box(.55,.9,3.8,dk,sx*1.15,.55,0,g);for(let i=0;i<5;i++){const w=cyl(.3,.3,.12,8,M(0x5a5a5e),sx*1.45,.45,-1.4+i*.7,g);w.rotation.z=Math.PI/2}}
 const tur=cyl(.85,1.0,.9,10,ol2,0,1.75,0,g);const brl=cyl(.1,.1,2.2,7,dk,0,1.75,1.9,g);brl.rotation.x=Math.PI/2;cyl(.28,.28,.12,9,dk,0,2.2,-.2,g);
 g.userData={tur};S.add(g);ACT.push(g);return g})();
const EFIELD=(()=>{const g=new THREE.Group();box(70,.1,60,M(0xcfa850),0,-.06,-10,g);
 for(let i=0;i<7;i++){const x=-34+i*11+rn(i)*4,h=3+rn(i+4)*2.5;g.add(cone(9+rn(i)*4,h,6,M([0xb8764a,0xa8683e,0xc4845a][i%3]),x,h/2-.2,-34-rn(i+1)*4))}
 const fence=new THREE.Group();for(let i=-8;i<=8;i++)box(.1,.9,.1,M(0x6a4a2a),i*1.4,.45,-14,fence);box(24,.07,.06,M(0x6a4a2a),0,.8,-14,fence);box(24,.07,.06,M(0x6a4a2a),0,.45,-14,fence);g.add(fence);
 const dam=new THREE.Mesh(new THREE.CircleGeometry(3.2,10),new THREE.MeshLambertMaterial({color:0x4a90c8}));dam.rotation.x=-Math.PI/2;dam.position.set(-9,.0,-6);g.add(dam);
 for(let i=0;i<4;i++){const t=new THREE.Group();cyl(.12,.16,2.2,5,M(0x6a4a2a),0,1.1,0,t);t.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.1,0),M(0x5a8a3a)));t.children[1].position.y=2.6;t.position.set(-14+i*9,0,-17);g.add(t)}
 S.add(g);ACT.push(g);return g})();
const EWHEAT=kitTufts(1700,-12,12,-13,8,[0xe6c860,0xdcb84e,0xf0d474,0xd2ac44],.4,7);
const ECRATES=(()=>{const g=new THREE.Group();const wd=M(0x8a6a38);for(const [x,y,z] of[[-.55,0,0],[.55,0,0],[0,.62,0]]){const c=box(1.0,.6,.7,wd,x,y+.3,z,g);box(1.02,.06,.72,M(0x5a4220),x,y+.58,z,g)}
 const s=paSign('10,000','#2a2a2a','#ffe060',.9,.4,30);s.position.set(0,.95,.37);g.add(s);S.add(g);ACT.push(g);return g})();
const EBARS=(()=>{const g=new THREE.Group();const b1=box(1.1,1,1.1,M(0xc89a2a),-.9,.5,0,g),b2=box(1.1,1,1.1,M(0x8a7a6a),.9,.5,0,g);const s1=paSign('9,860 BULLETS','#2a2a2a','#ffe060',1.7,.5,17),s2=paSign('986 EMUS','#8b7258','#ffffff',1.4,.5,20);g.add(s1,s2);g.userData={b1,b2,s1,s2};
 box(3.4,.1,1.5,M(0x555560),0,-.05,0,g);S.add(g);ACT.push(g);return g})();
const EBUL=(()=>{const g=new THREE.Group();for(let i=0;i<10;i++){const b=new THREE.Group();cyl(.14,.14,.55,8,M(0xd8a82a),0,.27,0,b);cone(.14,.28,8,M(0xb87333),0,.69,0,b);cyl(.15,.15,.06,8,M(0x8a5a1a),0,.03,0,b);b.position.set((i%5-2)*.3,0,(Math.floor(i/5)-.5)*.36);g.add(b)}S.add(g);ACT.push(g);return g})();
const EPOST=kitPost('SEND GUNS','#f4e8c0','#8a2a1a',1.6,.8,22,1.2);
const EWIN=kitPost('WINNER','#ffd83a','#c4202a',1.6,.7,28,1.2);
const EMEDAL=kitMedal();EMEDAL.position.set(0,1.1,.5);EMU[0].g.add(EMEDAL);
const EEND_HAT=kitSlouch({head:EMU[0].head},0x7a6a3a);EEND_HAT.visible=false;EEND_HAT.scale.setScalar(.6);EEND_HAT.position.set(0,.17,0);EEND_HAT.rotation.z=.25;EMEDAL.visible=false;
const EHAT=kitSlouch({head:{add:o=>{S.add(o);ACT.push(o)}}},0x7a6a3a);
const _emh=hideAll;hideAll=function(){_emh();EMU.forEach(E=>{E.rest();E.neck.scale.set(1,1,1);E.head.scale.setScalar(1)});EBUL.children.forEach(b=>b.scale.setScalar(1));EBARS.userData.b1.visible=true;EBARS.userData.b2.visible=true;ESOL.forEach(P=>P.lew.userData.flash.visible=false);EEND_HAT.visible=false;EMEDAL.visible=false;ETANK.userData.tur.visible=true;EBARS.userData.b1.scale.y=1;EHAT.visible=false};
function eEnv(){kitEnv(0x9fd8ff,1.25,0xdfe8e0);show(EFIELD,EWHEAT)}
const EH={
e_hook:(u,d,k)=>{eEnv();const A=ESOL[0],E=EMU[0];show(A,E);A.rest();A.at(-1.45,0,0,Math.PI/2);A.face(u<.85?'angry':'shock');aimGun(A,1,Math.sin(u*45)>0&&u<.85);A.g.position.x+=Math.sin(u*40)*.012*(u<.85?1:0);
 const f=cl(u/.95);const zig=Math.sin(u*6)*.3*(1-f);E.at(lerp(3.4,.75,ease(f)),0,lerp(.3,2.4,f)+zig,lerp(-Math.PI/2,.12,ease(cl((u-.45)/.5))));E.run(u,14,1.0);E.smug(u>.75);E.neck.rotation.x=.4;
 if(u>.8){const j=cl((u-.8)/.5);E.g.position.y+=Math.sin(j*Math.PI)*.45;E.legs[0].rotation.x=-1.2;E.legs[1].rotation.x=1.2}
 kitTracers(u,0,[-.35,1.28,0],[1,0,0],14,30,30,.5);if(u<.9)SHAKE=.03;
 puffs(1.6,.2,-.3,u,.25);EHAT.visible=u>.85;if(u>.85){const a=u-.85;EHAT.position.set(-1.45+a*.3,1.9+a*2.0-a*a*4,0);EHAT.rotation.set(a*3,a*5,a*2)}
 if(u<.8)window.TAG('1932 AUSTRALIA','ARMY VS EMUS','#ffd83a');camTo([0,1.3,6.4],[0,1.3,6.0],[.1,1.4,0],[.1,1.4,.4],k,60)},
e_hook2:(u,d,k)=>{eEnv();const E=EMU[0];show(E,EHAT);E.rest();E.at(0,0,0,0);E.neck.rotation.x=.12;E.neck2.rotation.x=-.12;E.head.rotation.y=Math.sin(u*2.2)*.25;E.head.rotation.x=.12;E.smug(u>.5);E.neck.position.set(0,1.28,.4);
 const fall=cl((u-.1)/.35);EHAT.visible=true;EHAT.scale.setScalar(.95);EHAT.position.set(.0,lerp(3.4,2.17,fall*fall)+(fall>=1?Math.exp(-(u-.45)*9)*Math.sin((u-.45)*30)*.08:0),.52);EHAT.rotation.set(0,0,.2*(1-fall));if(fall>=1&&u<.8)SHAKE=.02;
 const q=kitMark('!','#c4202a','#fff');if(u>.5)kitMarkAt(q,-.62,2.0,.6,.42+.06*Math.sin(u*9));
 camTo([0,2.05,2.8],[0,2.1,2.5],[0,2.05,.5],[0,2.1,.5],k,46)},
e_farm:(u,d,k)=>{eEnv();show(EPOST);const F=EFARM;F.forEach(P=>show(P));[0,1,2,3,4].forEach(i=>{const E=EMU[i];show(E);const x=i<3?-1.3+i*1.3:-.65+(i-3)*1.3,z=i<3?.3:-1.3;E.at(x,0,z,Math.sin(i)*.6);E.eat(u+i*.7);E.legs[0].rotation.x=Math.sin(u*2+i)*.1});
 F[0].rest();F[0].at(-.95,0,2.6,.4);F[0].face('angry');F[0].arms[0].rotation.set(-2.6,0,-.2+Math.sin(u*14)*.12);F[0].arms[1].rotation.set(-2.5,0,.2);F[0].g.position.y=Math.abs(Math.sin(u*8))*.06;
 F[1].rest();F[1].at(.9,0,2.7,-.4);F[1].face('sweat');F[1].arms[1].rotation.set(-.4,0,.5);F[1].arms[0].rotation.set(-.2,0,0);F[1].head.rotation.z=Math.sin(u*3)*.1;
 EPOST.position.set(0,0,3.6);EPOST.scale.setScalar(.7);window.TAG('EMUS ON FARMLAND','20,000','#ff9a5a');camTo([0,3.9,7.8],[0,3.5,7.3],[0,.8,.5],[0,.8,.5],k,58)},
e_army:(u,d,k)=>{eEnv();show(ECRATES);const L=[[ESOL[0],-1.15],[EMAJ,0],[ESOL[1],1.15]];L.forEach(([P,x],i)=>{show(P);P.rest();P.at(x,0,0,0);P.face(i===1?'smug':'happy');P.g.position.y=Math.abs(Math.sin(u*6+i))*.03});
 EMAJ.arms[1].rotation.set(-1.9,0,-.2);EMAJ.arms[0].rotation.set(-.1,0,.1);ESOL[0].lew.visible=true;aimGun(ESOL[0],0);aimGun(ESOL[1],0);ESOL[0].arms[1].rotation.set(-.9,0,-.1);ESOL[1].arms[0].rotation.set(-.9,0,.1);ESOL[0].lew.position.set(.3,1.0,.35);ESOL[1].lew.position.set(-.3,1.0,.35);
 ECRATES.position.set(0,0,2.2);ECRATES.scale.setScalar(1.0);window.TAG('THE ARMY SENT','3 MEN  2 GUNS','#7ad0ff');window.STAMP={on:1,u:u-.4,text:'10,000 BULLETS',c:'#c4202a',rot:-6};camTo([0,1.6,6.6],[0,1.5,6.1],[0,1.4,.6],[0,1.4,.6],k,54)},
e_split:(u,d,k)=>{eEnv();const A=ESOL[0];show(A);A.rest();A.at(0,0,0,u*3.2);A.face('shock');aimGun(A,1,0);A.arms[0].rotation.x=-1.2;
 for(let i=0;i<7;i++){const E=EMU[i];show(E);const a=i/7*Math.PI*2+.4,r=1.2+Math.max(0,u-.15)*(1.1+i%3*.35);E.at(Math.cos(a)*r,0,Math.sin(a)*r,Math.atan2(Math.cos(a),Math.sin(a)));E.run(u+i,15,1.0);E.neck.rotation.x=.35}
 const q=kitMark('?','#c4202a','#fff');kitMarkAt(q,.75,2.5+Math.sin(u*6)*.08,0,.8);window.TAG('THE EMUS','SPLIT UP','#ffd83a');camTo([0,7.4,4.6],[0,7.0,4.3],[0,0,.2],[0,0,.2],k,56)},
e_truck:(u,d,k)=>{eEnv();const X=t=>-2.5+t*3.0;show(ETRUCK);const x=X(u);ETRUCK.scale.setScalar(.85);ETRUCK.position.set(x,Math.abs(Math.sin(u*23))*.1,0);ETRUCK.rotation.set(0,Math.PI/2,Math.sin(u*19)*.025);
 const G=ESOL[1];show(G);G.rest();G.at(x-.15,(.95+Math.abs(Math.sin(u*23))*.1)*.85,-.5,Math.PI/2);G.g.scale.setScalar(.85);G.face('shock');aimGun(G,1,Math.sin(u*40)>0);G.lew.rotation.x=-.5;G.g.position.y+=Math.sin(u*31)*.04;G.head.rotation.z=Math.sin(u*17)*.12;
 const E=EMU[0];show(E);const rel=lerp(-1.3,1.7,ease(cl((u-.15)/(d*.8))));const ex=x+rel;E.at(ex,0,1.5,Math.PI/2);E.g.scale.setScalar(1.1);E.run(u,15,1.0);E.smug(u>.7);E.head.rotation.y=u>.5?2.7:0;E.neck.rotation.x=.4;
 kitTracers(u,0,[x+.6,2.0,-.5],[.35,.9,.15],12,24,22,.7);kitDust(t=>[X(t)-1.7,.15,0],u,1.0,1.1);
 if(u>.7){const q=kitMark('...','#111','#fff');kitMarkAt(q,ex,2.8,1.5,.8)}
 window.TAG('GUN ON A TRUCK','TOO BUMPY','#ff9a5a');camTo([x+.2,1.9,8.8],[x+.2,1.9,8.8],[x+.2,1.6,0],[x+.2,1.6,0],0,52)},
e_tank:(u,d,k)=>{eEnv();show(ETANK,EMU[0],EMAJ);ETANK.position.set(.3,0,0);ETANK.rotation.y=-.45;const E=EMU[0];E.rest();E.g.position.set(.3,0,0);E.g.rotation.y=-.45;E.g.scale.setScalar(1.4);E.neck.scale.set(1.9,1,1.9);
 const pop=ease(cl((u-.25)/.5));E.neck.position.set(0,1.28+.3*pop,.3);E.neck.rotation.x=.1;E.neck2.rotation.x=-.05+Math.sin(u*3)*.06;E.head.rotation.y=Math.sin(u*2)*.5;E.smug(u>.9);E.head.rotation.x=.1;E.head.scale.setScalar(2.0);
 EMAJ.rest();EMAJ.at(-.55,1.5,-.1,.55);EMAJ.face('sweat');EMAJ.arms[0].rotation.set(-2.7,0,-.3);EMAJ.arms[1].rotation.set(-2.7,0,.3);EMAJ.head.rotation.z=Math.sin(u*7)*.08;
 window.STAMP={on:1,u:u-.3,text:'LIKE TANKS',c:'#c4202a',rot:-6};camTo([1.0,2.7,7.8],[.8,2.7,7.4],[.1,2.9,0],[.1,2.9,0],k,54)},
e_score:(u,d,k)=>{eEnv();show(EBUL,EBARS,EMU[1]);const B=EBARS.userData;B.b1.visible=false;B.b2.visible=false;
 EBUL.position.set(-.85,0,0);EBUL.children.forEach((b,i)=>{const t=cl((u-.15-i*.08)/.25);b.scale.setScalar(Math.max(.001,t));b.position.y=Math.sin(Math.PI*cl(t))*.25*(t<1?1:0)});
 const E=EMU[1];E.rest();E.at(.95,0,0,-.2);E.g.scale.setScalar(.8);E.smug(u>.9);E.neck.rotation.x=.15;E.neck2.rotation.x=-.2;const ep=ease(cl((u-.9)/.3));E.g.scale.setScalar(Math.max(.001,.8*ep));E.head.rotation.y=Math.sin(u*3)*.3;
 B.s1.position.set(-.85,1.45,.2);B.s2.position.set(.95,2.2,.2);EBARS.position.set(0,0,0);B.s1.scale.setScalar(.8);B.s2.scale.setScalar(.8);
 window.STAMP={on:1,u:u-d*.72,text:'10 PER EMU',c:'#c4202a',rot:-6};camTo([0,1.5,7.4],[0,1.5,7.0],[0,1.05,0],[0,1.05,0],k,54)},
e_end:(u,d,k)=>{eEnv();show(EWIN,EMU[0]);const E=EMU[0];E.rest();E.at(-.2,0,2.9,.1);E.g.rotation.y=.1;E.smug(1);E.neck.rotation.x=.12;E.neck2.rotation.x=-.2;EEND_HAT.visible=true;EMEDAL.visible=true;E.head.rotation.y=Math.sin(u*2)*.3;E.g.position.y=Math.abs(Math.sin(u*4))*.04;
 EWIN.position.set(.85,0,2.3);EWIN.rotation.y=-.2;EWIN.scale.setScalar(.7);for(let i=0;i<3;i++){const P=ESOL[i];show(P);P.rest();const z=-2.4-i*1.3-(u*.5);P.at(-1.3+i*.75,0,z,Math.PI);P.walk(u+i,5,.45);P.face('bored');P.head.rotation.x=.4;aimGun(P,0);P.lew.position.set(.28,.9,.1)}
 window.STAMP={on:1,u:u-.5,text:'EMUS WIN',c:'#2a8a3a',rot:-6};camTo([0,1.6,7.4],[0,1.6,7.0],[0,1.45,0],[0,1.45,0],k,54)}
};
Object.assign(SHOTS,EH);
Object.assign(SHOTS,{emucover:(u,d,k)=>{eEnv();const A=ESOL[0],E=EMU[0];show(A,E,EHAT);A.rest();A.at(-.95,0,3.3,Math.PI-.12);A.face('shock');aimGun(A,1,1);E.at(.55,0,.4,Math.PI-.25);E.rest();E.run(.35,14,.8);E.smug(1);E.neck.rotation.x=.42;kitTracers(.4,0,[-.95,1.3,2.1],[.14,0,-1],10,30,34,.6);EHAT.visible=true;EHAT.position.set(-1.4,2.7,2.9);EHAT.rotation.set(.6,.9,.5);
 camTo([-.9,1.7,5.7],[-.9,1.7,5.7],[.3,1.15,.8],[.3,1.15,.8],0,50)}});
