// WOJTEK, THE SOLDIER BEAR.  Models: standing bear (side cap, corporal stripes), ammo crates / shells, beer bottle, cigarette, ship "NO PETS" sign, Italian hillside, zoo gate, soldiers.
function bearModel(){const g=new THREE.Group(),P={g};const fur=new THREE.MeshLambertMaterial({map:fab('#7a4a2a',{seed:31,noise:.3}),flatShading:true}),tan=new THREE.MeshLambertMaterial({color:0xb88a5a,flatShading:true}),bk=M(0x111111);
 const body=new THREE.Mesh(new THREE.SphereGeometry(.55,12,10),fur);body.scale.set(1,1.2,.9);body.position.y=1.05;g.add(body);const bel=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),tan);bel.scale.set(.85,1.1,.6);bel.position.set(0,1.0,.28);g.add(bel);
 P.head=new THREE.Group();P.head.position.set(0,1.9,.08);g.add(P.head);P.head.add(new THREE.Mesh(new THREE.SphereGeometry(.32,12,9),fur));const sn=new THREE.Mesh(new THREE.SphereGeometry(.17,8,6),tan);sn.scale.set(1,.8,1.2);sn.position.set(0,-.08,.3);P.head.add(sn);const ns=new THREE.Mesh(new THREE.IcosahedronGeometry(.06,0),bk);ns.position.set(0,-.02,.45);P.head.add(ns);
 for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.28*.4,8,6),fur);e.position.set(sx*.24,.27,-.02);P.head.add(e);const ey=new THREE.Mesh(new THREE.IcosahedronGeometry(.05,1),M(0xffffff));ey.position.set(sx*.13,.1,.26);P.head.add(ey);const pu=new THREE.Mesh(new THREE.IcosahedronGeometry(.027,0),bk);pu.position.set(sx*.13,.1,.31);P.head.add(pu)}
 const cap=box(.3,.12,.5,M(0x5a6a3a),0,.33,0,P.head);cap.rotation.z=.2;
 P.arms=[-1,1].map(sx=>{const a=new THREE.Group();a.position.set(sx*.52,1.45,.05);g.add(a);const m=new THREE.Mesh(new THREE.CylinderGeometry(.15,.12,.62,8),fur);m.position.y=-.3;a.add(m);const p=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),fur);p.position.y=-.64;a.add(p);return a});
 P.legs=[-1,1].map(sx=>{const l=new THREE.Group();l.position.set(sx*.25,.62,0);g.add(l);const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.17,.5,8),fur);m.position.y=-.25;l.add(m);const f=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),fur);f.scale.set(1,.5,1.6);f.position.set(0,-.55,.1);l.add(f);return l});
 for(let i=0;i<2;i++)box(.22,.035,.02,M(0xf0d040),.38,1.5-i*.08,.45,g).rotation.z=-.4;
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.7,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);
 P.rest=()=>{P.arms.forEach((a,i)=>a.rotation.set(0,0,(i?-1:1)*.1));P.legs.forEach(l=>l.rotation.set(0,0,0));P.head.rotation.set(0,0,0);g.rotation.set(0,0,0);g.position.y=0;g.scale.setScalar(1)};
 P.walk=(t,sp)=>{sp=sp||7;P.legs[0].rotation.x=Math.sin(t*sp)*.6;P.legs[1].rotation.x=-Math.sin(t*sp)*.6;g.position.y=Math.abs(Math.sin(t*sp))*.05;g.rotation.z=Math.sin(t*sp)*.05};
 P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.y=ry};S.add(g);ACT.push(g);return P}
const WJB=bearModel(),WJB2=bearModel();
function wjCrate(){const g=new THREE.Group();box(.7,.45,.45,M(0x8a6a38),0,.22,0,g);box(.72,.05,.47,M(0x5a4220),0,.46,0,g);for(const sx of[-1,1])box(.05,.45,.47,M(0x5a4220),sx*.2,.22,0,g);const sh=paSign('25 LB','#2a2a2a','#ffe060',.5,.2,16);sh.position.set(0,.22,.24);g.add(sh);S.add(g);ACT.push(g);return g}
const WJC=[wjCrate(),wjCrate(),wjCrate()];
function wjSold(i){const P=person({coat:'#5a6a3a',pants:'#5a6a3a',hair:['#3a2418','#6a4220','#d8c898'][i%3],skin:['#efc2a2','#e8b894','#dca47e'][i%3],boots:1,belt:1,stubble:i%2});const c=new THREE.Group();box(.3,.14,.5,M(0x4a5a2a),0,.18,0,c).rotation.z=.15;c.position.y=-.02;P.head.add(c);return P}
const WJS=[0,1,2].map(wjSold);
const WJBOY=person({coat:'#c8b898',pants:'#8a7a5a',hair:'#1a1210',skin:'#c8946a',boots:0,shortSleeve:1});WJBOY.g.scale.setScalar(.8);
const WJBEER=(()=>{const g=new THREE.Group();const m=new THREE.MeshLambertMaterial({color:0x6a3a10,flatShading:true});cyl(.09,.09,.28,8,m,0,.14,0,g);cyl(.04,.06,.14,8,m,0,.35,0,g);cyl(.045,.045,.03,8,M(0xe8c040),0,.43,0,g);S.add(g);ACT.push(g);return g})();
const WJCIG=box(.22,.03,.03,M(0xf4f0e0),0,0,0);S.add(WJCIG);ACT.push(WJCIG);
const WJSIGN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg,fg,w||1.6,.8,17);S.add(s);ACT.push(s);return s};
const WJS1=WJSIGN('NO PETS','ON BOARD','#f4e8c0','#8a1a2a'),WJS2=WJSIGN('PRIVATE','WOJTEK','#f4e8c0','#2a4a2a'),WJS3=WJSIGN('MONTE','CASSINO 1944','#f4e8c0','#2a2a2a'),WJS4=WJSIGN('EDINBURGH','ZOO','#f4e8c0','#2a6a3a');
const WJSTRIPE=(()=>{const g=new THREE.Group();for(let i=0;i<2;i++){const s=box(.4,.07,.03,M(0xf0d040),0,i*.12,0,g);s.rotation.z=-.35}S.add(g);ACT.push(g);return g})();
const WJFLOOR=(c)=>{const g=new THREE.Group();box(60,.1,40,M(c),0,-.06,0,g);S.add(g);ACT.push(g);return g};
const WJF1=WJFLOOR(0xc8b078),WJF2=WJFLOOR(0x7a9a5a),WJF3=WJFLOOR(0xa8a8a0);
const WJHILL=(()=>{const g=new THREE.Group();for(let i=0;i<6;i++){const h=3+rn(i)*2;g.add(cone(7,h,6,M([0x8a8a6a,0x7a7a5a][i%2]),-18+i*7,h/2-.2,-14))}S.add(g);ACT.push(g);return g})();
const _wjh=hideAll;hideAll=function(){_wjh();WJB.rest();WJB2.rest()};
function wjEnv(f,sky){kitEnv(sky||0xcfe6f6,1.25,sky||0xe6f2fa);show(f)}
function wP(P,face,l,r){P.rest();P.face(face);if(l)P.arms[0].rotation.set(l[0],0,l[1]);if(r)P.arms[1].rotation.set(r[0],0,r[1])}
function carry(B,u){B.arms.forEach((a,i)=>a.rotation.set(-1.4,0,(i?-1:1)*.1))}
const WJH={
w_hook:(u,d,k)=>{wjEnv(WJF2);show(WJHILL,WJB,WJC[0],WJS[0],WJS[1]);const B=WJB;B.rest();B.at(.2,0,1.6,0);carry(B);B.walk(u,8);B.head.rotation.x=.1;WJC[0].position.set(.2,1.0+Math.abs(Math.sin(u*8))*.05,2.2);WJC[0].scale.setScalar(1.3);
 wP(WJS[0],'shock');WJS[0].at(-1.25,0,1.0,.5);wP(WJS[1],'happy');WJS[1].at(1.3,0,.8,-.5);WJS[1].arms[1].rotation.set(-2.6+Math.sin(u*9)*.3,0,.3);window.TAG('A BEAR IN','THE ARMY','#ffd83a');camTo([0,1.8,7.4],[0,1.8,6.9],[0,1.3,1.4],[0,1.3,1.4],k,56)},
w_cub:(u,d,k)=>{wjEnv(WJF1,0xe8d8a8);show(WJB,WJBOY,WJS[0]);const B=WJB;B.rest();B.g.scale.setScalar(.4);B.at(-.05,0,1.8,.2);B.head.rotation.x=.2;B.walk(u,4);wP(WJBOY,'neutral',[-.3,0],[-1.2,-.2]);WJBOY.at(-.8,0,1.5,.5);wP(WJS[0],'happy');WJS[0].at(.85,0,1.5,-.5);WJS[0].arms[1].rotation.set(-1.3,0,-.3);
 window.STAMP={on:1,u:u-.4,text:'IRAN, 1942',c:'#8a5a1a',rot:-5};camTo([0,1.7,5.6],[0,1.7,5.2],[0,.9,1.5],[0,.9,1.5],k,56)},
w_beer:(u,d,k)=>{wjEnv(WJF2);show(WJB,WJBEER,WJCIG,WJS[2]);const B=WJB;B.rest();B.at(.3,0,1.5,-.15);B.arms[1].rotation.set(-2.4,0,-.1);B.arms[0].rotation.set(-.3,0,.1);B.head.rotation.x=-.3+Math.sin(u*3)*.1;WJBEER.position.set(.25,1.95,1.9);WJBEER.rotation.set(2.3,0,0);WJBEER.scale.setScalar(1.3);WJCIG.visible=true;WJCIG.position.set(.1,1.68,1.95);
 wP(WJS[2],'happy');WJS[2].at(-.95,0,1.3,.6);WJS[2].arms[1].rotation.set(-1.4,0,-.3);window.TAG('HIS FAVOURITE','BEER','#ffd83a');camTo([0,1.8,5.6],[0,1.8,5.2],[0,1.4,1.5],[0,1.4,1.5],k,56)},
w_draft:(u,d,k)=>{wjEnv(WJF3,0xbcd8e8);show(WJB,WJS1,WJS2,WJS[0]);WJS1.position.set(-.9,2.4,.6);WJS1.scale.setScalar(.85*kitPop(u,.1,.12,8));WJB.rest();WJB.at(.5,0,1.6,-.2);WJS2.position.set(.7,2.7,.6);WJS2.scale.setScalar(u>.9?.85*kitPop(u,.9,.14,8):.001);wP(WJS[0],'smug');WJS[0].at(-1.0,0,1.4,.6);WJS[0].arms[1].rotation.set(-1.5,0,-.3);window.STAMP={on:u>.9?1:0,u:u-.9,text:'ENLISTED',c:'#2a4a2a',rot:-5};camTo([0,1.9,6.0],[0,1.9,5.5],[0,1.3,1.5],[0,1.3,1.5],k,58)},
w_cass:(u,d,k)=>{wjEnv(WJF2);show(WJHILL,WJB,WJC[0],WJC[1],WJC[2],WJS3,WJSTRIPE);const B=WJB;B.rest();B.at(-.3,0,1.6,.3);carry(B);B.walk(u,7);WJC[0].position.set(-.15,1.0+Math.abs(Math.sin(u*7))*.05,2.2);WJC[0].scale.setScalar(1.3);WJC[1].position.set(1.2,0,1.2);WJC[2].position.set(1.7,0,.5);WJC[2].rotation.y=.4;WJS3.position.set(1.0,2.6,.4);WJS3.scale.setScalar(.8);
 const t=ease(cl((u-.5)/.4));WJSTRIPE.position.set(.1,1.6,2.1);WJSTRIPE.scale.setScalar(t>0?1.4*t:.001);window.STAMP={on:1,u:u-d*.55,text:'CORPORAL',c:'#2a4a2a',rot:-5};camTo([0,1.8,6.2],[0,1.8,5.7],[0,1.4,1.5],[0,1.4,1.5],k,56)},
w_zoo:(u,d,k)=>{wjEnv(WJF2);show(WJB,WJS4,WJCIG,WJS[0]);WJS4.position.set(0,3.0,0);WJS4.scale.setScalar(1);const B=WJB;B.rest();B.at(.3,0,1.8,-.1);B.head.rotation.x=-.2;B.arms[0].rotation.set(-1.0,0,.4);B.arms[1].rotation.set(-1.0,0,-.4);wP(WJS[0],'happy');WJS[0].at(-1.0,0,1.5,.5);WJS[0].arms[1].rotation.set(-2.4,0,-.3);
 const a=(u*1.1)%1;WJCIG.visible=true;WJCIG.position.set(lerp(-.9,.0,a),2.2+Math.sin(a*Math.PI)*.8-a*.6,1.7);WJCIG.rotation.z=a*9;camTo([0,2.0,6.4],[0,2.0,5.9],[0,1.4,1.5],[0,1.4,1.5],k,56)},
w_end:(u,d,k)=>{wjEnv(WJF2);show(WJB,WJSTRIPE);const B=WJB;B.rest();B.at(0,0,1.7,0);B.arms[1].rotation.set(-2.7+Math.sin(u*6)*.1,0,-.2);B.head.rotation.z=Math.sin(u*2)*.05;WJSTRIPE.position.set(.45,1.55,2.2);WJSTRIPE.scale.setScalar(1.3);window.TAG('RANK: CORPORAL','SPECIES: BEAR','#ffd83a');camTo([0,1.9,6.0],[0,1.9,5.5],[0,1.5,1.7],[0,1.5,1.7],k,56)}
};
Object.assign(SHOTS,WJH);
Object.assign(SHOTS,{wjcover:(u,d,k)=>{wjEnv(WJF2);show(WJHILL,WJB,WJC[0]);const B=WJB;B.rest();B.at(0,0,1.6,0);carry(B);B.head.rotation.x=.05;WJC[0].position.set(0,1.0,2.2);WJC[0].scale.setScalar(1.3);camTo([0,1.9,5.0],[0,1.9,5.0],[0,2.15,1.6],[0,2.15,1.6],0,56)}});
