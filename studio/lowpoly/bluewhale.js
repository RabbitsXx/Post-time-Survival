// BLUE WHALE HEART.  Models: blue whale (long body, tail flukes, eye, baleen throat grooves), big red heart with veins, bathroom scale showing 180 KG, tiny Poly for scale, ocean.
function whaleModel(){const g=new THREE.Group(),P={g};const bl=new THREE.MeshLambertMaterial({map:fab('#5a7a9a',{seed:81,noise:.2}),flatShading:true}),lt=new THREE.MeshLambertMaterial({color:0xb8c8d8,flatShading:true});
 const body=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),bl);body.scale.set(1.3,1,4.0);body.position.set(0,1.2,0);g.add(body);const bel=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),lt);bel.scale.set(1.1,.7,3.6);bel.position.set(0,.8,.1);g.add(bel);
 for(let i=0;i<7;i++)box(1.7,.03,.1,M(0x8a9aaa),0,.58,.6+i*.4,g);
 const tail=new THREE.Mesh(new THREE.ConeGeometry(.6,2.6,6),bl);tail.rotation.x=-Math.PI/2;tail.position.set(0,1.3,-4.4);g.add(tail);P.fl=[-1,1].map(sx=>{const f=box(1.8,.12,.9,bl,sx*.9,1.3,-6.0,g);f.rotation.y=sx*.4;return f});
 const eye=new THREE.Mesh(new THREE.IcosahedronGeometry(.16,1),M(0xffffff));eye.position.set(1.2,1.3,2.6);g.add(eye);const pu=new THREE.Mesh(new THREE.IcosahedronGeometry(.08,0),M(0x111111));pu.position.set(1.34,1.3,2.64);g.add(pu);const e2=eye.clone();e2.position.x=-1.2;g.add(e2);const p2=pu.clone();p2.position.x=-1.34;g.add(p2);
 box(.3,.1,.3,M(0x2a3a4a),0,2.2,3.2,g);
 P.rest=()=>{g.rotation.set(0,0,0);g.position.set(0,0,0);g.scale.setScalar(1)};P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.y=ry};S.add(g);ACT.push(g);return P}
const BWH=whaleModel();
const BWHEART=(()=>{const g=new THREE.Group();const m=new THREE.MeshLambertMaterial({color:0xc02830,flatShading:true});const a=new THREE.Mesh(new THREE.SphereGeometry(.8,12,9),m);a.scale.set(1,1.1,.9);g.add(a);const b=new THREE.Mesh(new THREE.SphereGeometry(.55,10,8),m);b.position.set(-.3,.7,0);g.add(b);const c=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),m);c.position.set(.35,.7,0);g.add(c);cyl(.18,.18,.8,8,M(0x8a1a20),-.5,1.3,0,g);cyl(.16,.16,.7,8,M(0x4a5ac8),.5,1.25,0,g);g.userData.a=a;S.add(g);ACT.push(g);return g})();
const BWSC=(()=>{const g=new THREE.Group();box(2.6,.25,2.0,M(0xe8e8ec),0,.12,0,g);const d=paSign('180 KG','#1a1a22','#7aff7a',1.4,.5,30);d.position.set(0,.26,.9);d.rotation.x=-1.0;g.add(d);S.add(g);ACT.push(g);return g})();
const BWPOLY=person({coat:'#2f8070',shortSleeve:1,pants:'#2d5f9a',hair:'#4a3020',skin:'#e8b894',boots:1,stubble:1,hairCap:1});
const BWSEA=(()=>{const g=new THREE.Group();box(80,.1,60,M(0x2a6ab0),0,-.5,0,g);S.add(g);ACT.push(g);return g})();
const BWFL=(()=>{const g=new THREE.Group();box(40,.1,24,M(0xd8e0e8),0,-.06,0,g);S.add(g);ACT.push(g);return g})();
const BWSN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s};
const BWS1=BWSN('LARGEST ANIMAL','EVER KNOWN','#f4e8c0','#2a2a6a',2.2),BWS2=BWSN('LARGEST HEART','KNOWN: 180 KG','#f4e8c0','#8a1a2a',2.4);
const _bwh=hideAll;hideAll=function(){_bwh();BWH.rest();BWPOLY.g.scale.setScalar(1)};
function bwSea(){kitEnv(0x9ad0f0,1.3,0xbfe0f6);show(BWSEA)}
function bwLab(){kitEnv(0xe8eef4,1.25,0xe8eef4);show(BWFL)}
const BWHH={
w_hook:(u,d,k)=>{bwSea();show(BWH);BWH.rest();BWH.at(lerp(-3.2,1.2,ease(k)),Math.sin(u*2.2)*.18,0,Math.PI/2);BWH.g.scale.setScalar(1.15);window.TAG('THE LARGEST ANIMAL','EVER KNOWN','#ffd83a');camTo([0,2.6,10.4],[0,2.6,9.6],[0,1.2,0],[0,1.2,0],k,60)},
w_body:(u,d,k)=>{bwSea();show(BWH);BWH.rest();BWH.at(Math.sin(u*.5)*.3,Math.sin(u*1.4)*.1,0,Math.PI/2);BWH.g.scale.setScalar(1.15);window.STAMP={on:1,u:u-.4,text:'BLUE WHALE',c:'#2a4a8a',rot:-4};camTo([0,2.2,10.4],[0,2.2,9.6],[0,1.2,0],[0,1.2,0],k,60)},
w_fam:(u,d,k)=>{bwSea();show(BWH);BWH.rest();BWH.at(-Math.sin(u*.5)*.3,Math.sin(u*1.4)*.1,0,-Math.PI/2);BWH.g.scale.setScalar(1.15);window.STAMP={on:1,u:u-.5,text:'4 SUBSPECIES',c:'#2a4a8a',rot:-4};camTo([0,2.2,10.4],[0,2.2,9.6],[0,1.2,0],[0,1.2,0],k,60)},
w_heart:(u,d,k)=>{bwLab();show(BWHEART,BWSC);BWSC.position.set(0,0,1.0);BWHEART.position.set(0,1.1+Math.abs(Math.sin(u*5))*.04,1.0);const pulse=1+.06*Math.max(0,Math.sin(u*9));BWHEART.scale.setScalar(pulse*1.0);camTo([0,2.4,6.0],[0,2.4,5.5],[0,1.4,1.0],[0,1.4,1.0],k,56)},
w_scale:(u,d,k)=>{bwLab();show(BWHEART,BWSC,BWPOLY);BWSC.position.set(.6,0,1.0);BWHEART.position.set(.6,1.1,1.0);BWHEART.scale.setScalar(1.0);BWPOLY.rest();BWPOLY.face('shock');BWPOLY.at(-1.35,0,1.6,.5);BWPOLY.arms[1].rotation.set(-1.4,0,-.3);BWPOLY.arms[0].rotation.set(-.3,0,.1);window.STAMP={on:1,u:u-.4,text:'180 KG',c:'#c4202a',rot:-4};camTo([0,2.2,8.4],[0,2.2,7.9],[0,1.3,1.0],[0,1.3,1.0],k,58)},
w_one:(u,d,k)=>{bwLab();show(BWHEART,BWSC);BWSC.position.set(0,0,1.0);BWHEART.position.set(0,1.1,1.0);BWHEART.scale.setScalar(1.0);window.TAG('ONE STRANDED WHALE','ONE HEART','#ff9a5a');camTo([0,2.4,6.0],[0,2.4,5.5],[0,1.4,1.0],[0,1.4,1.0],k,56)},
w_col:(u,d,k)=>{bwSea();show(BWH);BWH.rest();BWH.at(0,0,0,Math.PI/2);BWH.g.scale.setScalar(1.15);window.TAG('GREY-BLUE ON TOP','LIGHTER BELOW','#7ad0ff');camTo([0,2.2,10.4],[0,2.2,9.6],[0,1.2,0],[0,1.2,0],k,60)},
w_end:(u,d,k)=>{bwLab();show(BWHEART,BWSC,BWPOLY);BWSC.position.set(.6,0,1.0);BWHEART.position.set(.6,1.1,1.0);BWPOLY.rest();BWPOLY.face('happy');BWPOLY.at(-1.35,0,1.6,.5);BWPOLY.arms[1].rotation.set(-2.6+Math.sin(u*6)*.2,0,.3);window.TAG('HOW MUCH HEART','DO YOU HAVE?','#ffd83a');camTo([0,2.2,8.4],[0,2.2,7.9],[0,1.3,1.0],[0,1.3,1.0],k,58)}
};
Object.assign(SHOTS,BWHH);
Object.assign(SHOTS,{bwcover:(u,d,k)=>{bwLab();show(BWHEART,BWSC,BWPOLY);BWSC.position.set(.7,0,1.0);BWHEART.position.set(.7,1.1,1.0);BWHEART.scale.setScalar(1.15);BWPOLY.rest();BWPOLY.face('shock');BWPOLY.at(-1.35,0,1.6,.5);BWPOLY.arms[1].rotation.set(-1.4,0,-.3);camTo([0,2.0,6.2],[0,2.0,6.2],[0,1.5,1.0],[0,1.5,1.0],0,58)}});
