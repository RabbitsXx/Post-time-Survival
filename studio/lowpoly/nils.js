// SIR NILS OLAV (Edinburgh Zoo king penguin, Norwegian King's Guard).  Models: king penguin in uniform (cap, epaulettes, medals), guardsmen (tall black caps), rank staircase with signs, zoo enclosure, sword, old officer.
function pengModel(o={}){const g=new THREE.Group(),P={g};const bk=new THREE.MeshLambertMaterial({color:0x1a1a24,flatShading:true}),wh=new THREE.MeshLambertMaterial({color:0xf4f4f0,flatShading:true}),or=new THREE.MeshLambertMaterial({color:0xf0a020,flatShading:true});
 const body=new THREE.Mesh(new THREE.SphereGeometry(.45,12,10),bk);body.scale.set(.95,1.4,.85);body.position.y=.72;g.add(body);
 const belly=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),wh);belly.scale.set(.82,1.3,.7);belly.position.set(0,.7,.17);g.add(belly);
 const chest=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),new THREE.MeshLambertMaterial({color:0xf4c040,flatShading:true}));chest.scale.set(.9,.7,.5);chest.position.set(0,1.02,.3);g.add(chest);
 P.head=new THREE.Group();P.head.position.set(0,1.5,.04);g.add(P.head);const hd=new THREE.Mesh(new THREE.SphereGeometry(.24,12,9),bk);P.head.add(hd);
 for(const sx of[-1,1]){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.1,0),or);c.scale.set(.8,1.2,.6);c.position.set(sx*.19,-.02,.08);P.head.add(c)}
 const bkk=cone(.04,.34,5,M(0x2a2a2a),0,-.05,.3,P.head);bkk.rotation.x=Math.PI/2;const bko=cone(.035,.16,5,or,0,-.06,.4,P.head);bko.rotation.x=Math.PI/2;
 P.pup=[];for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.055,1),M(0xffffff));e.position.set(sx*.11,.07,.19);P.head.add(e);const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.027,0),M(0x111111));p.position.set(sx*.11,.07,.24);P.head.add(p);P.pup.push(p)}
 P.fl=[-1,1].map(sx=>{const f=new THREE.Group();f.position.set(sx*.42,1.05,0);g.add(f);const m=new THREE.Mesh(new THREE.SphereGeometry(.22,8,6),bk);m.scale.set(.25,1.5,.6);m.position.y=-.28;f.add(m);return f});
 P.ft=[-1,1].map(sx=>{const f=new THREE.Group();f.position.set(sx*.17,.1,.12);g.add(f);const m=box(.2,.08,.34,or,0,0,.05,f);return f});
 // uniform
 const cap=new THREE.Group();cyl(.23,.26,.14,10,M(0x1c1c20),0,.25,0,cap);cyl(.27,.27,.03,10,M(0x1c1c20),0,.18,.02,cap);box(.1,.08,.02,M(0xf0c030),0,.2,.26,cap);cap.rotation.x=-.12;P.head.add(cap);
 for(const sx of[-1,1]){const e=box(.2,.04,.12,M(0xf0c030),sx*.36,1.32,0,g);e.rotation.z=sx*.3;const f=box(.05,.05,.05,M(0xc4202a),sx*.38,1.34,0,g)}
 P.medals=[0,1,2,3].map(i=>{const m=box(.07,.07,.02,M([0xf0c030,0xc4202a,0x2a5ac8,0xf0c030][i]),.12+i*.08,.98+(i%2)*.04,.5,g);return m});
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.6,10),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.28}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;g.add(bl);
 P.rest=()=>{P.fl.forEach((f,i)=>f.rotation.set(0,0,(i?-1:1)*.15));P.head.rotation.set(0,0,0);g.rotation.set(0,0,0);g.position.y=0;P.ft.forEach(f=>f.rotation.set(0,0,0));g.scale.setScalar(1.05)};
 P.waddle=(t,sp)=>{sp=sp||8;g.rotation.z=Math.sin(t*sp)*.12;g.position.y=Math.abs(Math.sin(t*sp))*.05;P.ft[0].rotation.x=Math.sin(t*sp)*.4;P.ft[1].rotation.x=-Math.sin(t*sp)*.4;P.fl[0].rotation.z=.15+Math.sin(t*sp)*.15;P.fl[1].rotation.z=-.15+Math.sin(t*sp)*.15};
 P.at=(x,y,z,ry)=>{g.position.set(x,y,z);g.rotation.y=ry};S.add(g);ACT.push(g);return P}
const NPENG=pengModel(),NPENG2=pengModel();const NTAGM=paSign('NILS OLAV','#f4e8c0','#2a2a2a',.7,.24,14);NTAGM.position.set(0,.95,.62);NPENG.g.add(NTAGM);NTAGM.visible=false;
function nguard(i){const P=person({coat:'#1f3a2a',pants:'#1f3a2a',hair:['#3a2418','#6a4220','#d8c898'][i%3],skin:['#efc2a2','#e8b894','#f3cdb0'][i%3],boots:1,belt:1,stubble:i%2});const c=new THREE.Group();cyl(.17,.2,.4,10,M(0x1a1a1e),0,.38,0,c);cyl(.23,.23,.04,10,M(0x1a1a1e),0,.17,0,c);box(.1,.1,.02,M(0xf0c030),0,.2,.2,c);c.position.y=-.02;P.head.add(c);box(.5,.06,.04,M(0xf0c030),0,1.3,.21,P.g);return P}
const NGD=[0,1,2,3,4].map(nguard);
const NOLD=person({coat:'#1f3a2a',pants:'#1f3a2a',hair:'#e8e8e8',skin:'#e8b894',boots:1,belt:1,beard:'#e8e8e8'});(()=>{const c=new THREE.Group();cyl(.2,.22,.12,10,M(0x1a1a1e),0,.18,0,c);box(.34,.03,.2,M(0x1a1a1e),0,.12,.2,c);NOLD.head.add(c)})();
const NZOO=(()=>{const g=new THREE.Group();box(40,.1,24,M(0xe4ecf4),0,-.06,0,g);box(12,.06,5,M(0x4aa0e0),0,.0,-5.5,g);for(let i=0;i<9;i++)box(.1,1.0,.1,M(0x8a6a44),-8+i*2,.5,-9,g);box(16,.08,.08,M(0x8a6a44),0,.9,-9,g);box(16,.08,.08,M(0x8a6a44),0,.5,-9,g);
 for(let i=0;i<5;i++){const r=new THREE.Mesh(new THREE.IcosahedronGeometry(.6+rn(i)*.5,0),M(0x8a8a92));r.position.set(-6+i*3,.2,-3.4-rn(i+2));r.scale.y=.7;g.add(r)}
 const s=paSign('EDINBURGH ZOO','#2a6a3a','#ffffff',3.0,.8,15);s.position.set(0,2.4,-8.9);g.add(s);cyl(.06,.06,2.4,5,M(0x6a4a2a),-1.4,1.2,-8.95,g);cyl(.06,.06,2.4,5,M(0x6a4a2a),1.4,1.2,-8.95,g);S.add(g);ACT.push(g);return g})();
const NSTAIRS=(()=>{const g=new THREE.Group();const names=[['LANCE','CORPORAL'],['CORPORAL','1982'],['SERGEANT','1987'],['COLONEL','IN-CHIEF']];names.forEach((n,i)=>{box(1.0,.35*(i+1),1.4,M([0x8a8a92,0x7a7a84,0x6a6a76,0xc8a030][i]),-1.5+i*1.0,.175*(i+1),0,g);const s=kitSign2(n[0],n[1],'#f4e8c0','#2a2a2a',.95,.5,17);s.position.set(-1.5+i*1.0,.35*(i+1)+.4,.72);g.add(s)});S.add(g);ACT.push(g);return g})();
const NSWORD=(()=>{const g=new THREE.Group();box(.05,1.3,.02,M(0xdde4ec),0,.65,0,g);box(.34,.05,.05,M(0xf0c030),0,.02,0,g);box(.06,.2,.06,M(0x4a2a12),0,-.12,0,g);S.add(g);ACT.push(g);return g})();
const NFLASH=kitMark('*','#f0c030','#fffbe0');
const _nh=hideAll;hideAll=function(){_nh();NTAGM.visible=false;NPENG.rest();NPENG2.rest();NPENG2.g.scale.setScalar(1.05)};
function nEnv(){kitEnv(0xbfe0f6,1.3,0xe0f0fa);show(NZOO)}
function gPose(P,face,arms){P.rest();P.face(face);if(arms==='att'){P.arms[0].rotation.set(0,0,.05);P.arms[1].rotation.set(0,0,-.05)}else if(arms==='salute'){P.arms[1].rotation.set(-2.5,0,.4);P.arms[0].rotation.set(0,0,.05)}}
const NH={
n_hook:(u,d,k)=>{nEnv();show(NPENG,...NGD.slice(0,4));const P=NPENG;P.rest();P.at(lerp(-.9,.2,ease(cl(u/.9))),0,1.7,.6-ease(cl(u/.9))*.6);P.waddle(u,9);P.fl[1].rotation.z=-.15-.2;P.head.rotation.x=-.12;
 [[-1.4,-.4],[-.85,-1.8],[.9,-1.8],[1.45,-.4]].forEach(([x,z],i)=>{const G=NGD[i];const sal=u>.9;gPose(G,'neutral',sal?'salute':'att');G.at(x,0,z+.2,x<0?.3:-.3);if(sal){G.arms[1].rotation.set(-2.5-Math.sin(u*20)*.03,0,.4)}});
 window.TAG('SIR NILS OLAV','MAJOR GENERAL','#ffd83a');camTo([0,1.5,7.0],[0,1.5,6.4],[0,1.1,0],[0,1.1,0],k,56)},
n_adopt:(u,d,k)=>{nEnv();show(NPENG,NGD[0],NGD[1]);NPENG.rest();NPENG.at(0,0,1.6,0);NPENG.waddle(u,6);NPENG.g.rotation.z*=.4;NTAGM.visible=true;
 gPose(NGD[0],'happy','att');NGD[0].at(-1.1,0,1.0,.9);NGD[0].arms[1].rotation.set(-1.3,0,-.3);gPose(NGD[1],'happy','att');NGD[1].at(1.1,0,1.0,-.9);NGD[1].arms[0].rotation.set(-1.3,0,.3);
 window.STAMP={on:1,u:u-.3,text:'ADOPTED 1972',c:'#2a6a3a',rot:-5};camTo([0,1.6,6.2],[0,1.6,5.8],[0,1.0,1.4],[0,1.0,1.4],k,56)},
n_ranks:(u,d,k)=>{nEnv();show(NSTAIRS,NPENG);const seg=d/4.4;const step=Math.min(3,Math.floor(u/seg));const t=ease(cl((u-step*seg)/(seg*.55)));const fx=i=>-1.5+i*1.0,fy=i=>.35*(i+1)+.1;
 const x=step===0?fx(0):lerp(fx(step-1),fx(step),t),y=step===0?fy(0):lerp(fy(step-1),fy(step),t)+Math.sin(t*Math.PI)*.25;NPENG.rest();NPENG.g.scale.setScalar(.8);NPENG.at(x,y,.1,0);NPENG.waddle(u,10);
 window.TAG('PROMOTED','EVERY VISIT','#ffd83a');camTo([0,1.9,6.6],[0,1.9,6.2],[0,1.3,0],[0,1.3,0],k,64)},
n_knight:(u,d,k)=>{nEnv();show(NPENG,NSWORD,...NGD.slice(0,4));const P=NPENG;P.rest();P.at(0,0,1.6,0);P.g.scale.setScalar(1.05*(1-.08*Math.sin(Math.min(1,u/.4)*3)));P.head.rotation.x=.25;
 NGD.slice(0,4).forEach((G,i)=>{gPose(G,'neutral','att');G.at([-1.5,-.85,.85,1.5][i],0,[-.6,-1.8,-1.8,-.6][i],[.3,.1,-.1,-.3][i])});
 const tap=Math.sin(Math.min(1,u/(d*.5))*Math.PI);NSWORD.position.set(.55,1.55+tap*.2,1.7);NSWORD.rotation.set(0,0,1.0-tap*.3);NSWORD.scale.setScalar(1);
 if(u>d*.45){kitMarkAt(NFLASH,.2,2.5,1.7,.5+.2*Math.sin(u*14))}window.STAMP={on:1,u:u-.5,text:'KNIGHTED 2008',c:'#8a1a2a',rot:-5};camTo([0,1.6,6.4],[0,1.6,5.9],[0,1.1,1.0],[0,1.1,1.0],k,56)},
n_double:(u,d,k)=>{nEnv();show(NPENG,NPENG2);const a=NPENG,b=NPENG2;a.rest();b.rest();a.at(-.8,0,1.4,.3);b.at(.8,0,1.4,-.3);a.waddle(u,5);b.waddle(u+1,5);b.head.rotation.z=Math.sin(u*3)*.1;
 const s1=kitSign2('NILS I','1987','#f4e8c0','#2a2a2a',1.0,.55,18),s2=kitSign2('NILS II','NEAR-DOUBLE','#f4e8c0','#2a2a2a',1.3,.55,15);[s1,s2].forEach(s=>{S.add(s);ACT.push(s);s.position.set(0,0,0)});
 s1.position.set(-.8,2.35,1.4);s2.position.set(.8,2.35,1.4);camTo([0,1.7,6.0],[0,1.7,5.5],[0,1.1,1.4],[0,1.1,1.4],k,56)},
n_end:(u,d,k)=>{nEnv();show(NPENG,NOLD);const P=NPENG;P.rest();P.at(.55,0,1.5,-.3);P.head.rotation.x=-.1;P.fl[1].rotation.z=-.15-.3;NOLD.rest();NOLD.face('happy');NOLD.at(-.85,0,1.6,.6);NOLD.arms[1].rotation.set(-2.5,0,.4);NOLD.arms[0].rotation.set(0,0,.05);NOLD.head.rotation.z=Math.sin(u*2)*.05;
 window.STAMP={on:1,u:u-.4,text:'OUTRANKS HIM',c:'#c4202a',rot:-5};window.TAG('NAMED AFTER','A LIEUTENANT','#ffd83a');camTo([0,1.6,6.0],[0,1.6,5.5],[0,1.1,1.4],[0,1.1,1.4],k,56)}
};
Object.assign(SHOTS,NH);
Object.assign(SHOTS,{ncover:(u,d,k)=>{nEnv();show(NPENG,NGD[0],NGD[1]);NPENG.rest();NPENG.at(0,0,1.6,0);NPENG.g.scale.setScalar(1.45);NPENG.fl[1].rotation.z=-.5;NPENG.head.rotation.x=-.1;gPose(NGD[0],'neutral','salute');NGD[0].at(-1.4,0,.6,.4);gPose(NGD[1],'neutral','salute');NGD[1].at(1.4,0,.6,-.4);camTo([0,1.7,6.0],[0,1.7,6.0],[0,2.05,1.2],[0,2.05,1.2],0,56)}});
