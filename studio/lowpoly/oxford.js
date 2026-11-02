// OXFORD vs THE AZTECS.  Models: Oxford college (stone, towers, windows, arch), Aztec temple (stepped twin-shrine), student Poly with mortarboard, Aztec warrior-priest, timeline floor, year counter signs, Spanish helmet sign.
function aztecTemple(){const g=new THREE.Group();for(let i=0;i<5;i++){const w=4.4-i*.7;box(w,.5,w,M([0xc8a878,0xb89868,0xd0b080][i%3]),0,.25+i*.5,0,g)}for(const sx of[-1,1]){box(.8,.9,.9,M(0xe8d8b8),sx*.6,3.0,0,g);box(.9,.15,1.0,M(sx<0?0x2a6ac8:0xc4402a),sx*.6,3.5,0,g)}
 const st=box(1.0,2.6,.15,M(0xd8c8a8),0,1.3,2.2,g);st.rotation.x=-.65;st.position.set(0,1.2,2.3);S.add(g);ACT.push(g);return g}
const OXAZ=aztecTemple();
function oxCollege(){const g=new THREE.Group();const st=M(0xd8c890);box(5.0,3.2,2.2,st,0,1.6,0,g);box(1.2,5.2,1.2,st,-2.1,2.6,.3,g);box(1.2,5.2,1.2,st,2.1,2.6,.3,g);for(const sx of[-1,1]){cone(.9,1.2,4,M(0x6a7a8a),sx*2.1,5.8,.3,g).rotation.y=Math.PI/4;for(let i=0;i<3;i++)box(.3,.6,.05,M(0x2a3a5a),sx*2.1,1.8+i*1.2,.95,g)}
 box(1.4,2.0,.1,M(0x3a2a1a),0,1.0,1.12,g);for(let i=-2;i<=2;i++){if(i===0)continue;for(let j=0;j<2;j++)box(.5,.8,.05,M(0x2a3a5a),i*.8,.9+j*1.3,1.12,g)}for(let i=-5;i<=5;i++)box(.35,.3,.3,st,i*.45,3.35,1.0,g);S.add(g);ACT.push(g);return g}
const OXC=oxCollege();
const OXSTU=person({coat:'#1a1a3a',pants:'#3a3a4a',hair:'#6a4220',skin:'#e8b894',boots:1,belt:1,tails:1});(()=>{const P=OXSTU;box(.4,.04,.4,M(0x111111),0,.2,0,P.head);cyl(.17,.19,.1,10,M(0x111111),0,.15,0,P.head);box(.02,.2,.02,M(0xf0c030),.2,.15,.1,P.head).rotation.z=.3})();
const OXAZP=person({coat:'#c4402a',pants:'#e8d8b8',hair:'#1a1210',skin:'#c8946a',boots:0,shortSleeve:1});(()=>{const P=OXAZP;for(let i=0;i<7;i++){const f=cone(.05,.5,4,M([0x2aa86a,0x2a6ac8,0xf0c030][i%3]),(i-3)*.07,.4,-.05,P.head);f.rotation.z=(i-3)*.18}cyl(.21,.21,.07,10,M(0xf0c030),0,.13,0,P.head)})();
const OXFL=(()=>{const g=new THREE.Group();box(50,.1,20,M(0x8a9a6a),0,-.06,0,g);S.add(g);ACT.push(g);return g})();
const OXSN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.6,.8,17);S.add(s);ACT.push(s);return s};
const OXS1=OXSN('OXFORD','TEACHING 1096','#f4e8c0','#2a2a6a',1.9),OXS2=OXSN('TENOCHTITLAN','FOUNDED 1325','#f4e8c0','#8a2a1a',2.2),OXS3=OXSN('AZTEC EMPIRE','FORMED 1428','#f4e8c0','#8a2a1a',2.0),OXS4=OXSN('1521','CONQUERED','#f4e8c0','#2a2a2a',1.5);
const OXBAR=(()=>{const g=new THREE.Group();const a=box(1,.3,.5,M(0x2a4a8a),0,0,0,g);const b=box(1,.3,.5,M(0xc4402a),0,0,0,g);g.userData={a,b};S.add(g);ACT.push(g);return g})();
const _oxh=hideAll;hideAll=function(){_oxh()};
function oxEnv(){kitEnv(0xa8d8f0,1.3,0xdceef8);show(OXFL)}
function oxP(P,face,l,r){P.rest();P.face(face);if(l)P.arms[0].rotation.set(l[0],0,l[1]);if(r)P.arms[1].rotation.set(r[0],0,r[1])}
const OXH={
x_hook:(u,d,k)=>{oxEnv();show(OXC,OXAZ,OXSTU,OXAZP);OXC.position.set(-2.0,0,-1.0);OXC.scale.setScalar(.6);OXAZ.position.set(2.2,0,-1.0);OXAZ.scale.setScalar(.6);oxP(OXSTU,'smug',[-.3,.2],[-2.5+Math.sin(u*6)*.2,.3]);OXSTU.at(-.8,0,1.4,.3);oxP(OXAZP,'shock',[-1.0,0],[-1.0,0]);OXAZP.at(.9,0,1.4,-.3);OXAZP.head.rotation.z=Math.sin(u*5)*.08;
 window.TAG('OXFORD IS OLDER','THAN THE AZTECS','#ffd83a');camTo([0,1.8,6.4],[0,1.8,5.9],[0,1.4,0],[0,1.4,0],k,58)},
x_oxf:(u,d,k)=>{oxEnv();show(OXC,OXSTU,OXS1);OXC.position.set(0,0,-1.0);OXC.scale.setScalar(.7);oxP(OXSTU,'happy',[-.3,.2],[-1.0,-.3]);OXSTU.at(.0,0,1.6,0);OXS1.position.set(0,4.6,.6);OXS1.scale.setScalar(1.0*kitPop(u,.2,.12,8));camTo([0,2.4,7.0],[0,2.4,6.4],[0,2.0,0],[0,2.0,0],k,56)},
x_ten:(u,d,k)=>{oxEnv();show(OXAZ,OXAZP,OXS2);OXAZ.position.set(0,0,-1.8);OXAZ.scale.setScalar(.75);oxP(OXAZP,'happy',[-.3,.2],[-2.6+Math.sin(u*6)*.2,-.3]);OXAZP.at(0,0,1.5,0);OXS2.position.set(0,4.2,.2);OXS2.scale.setScalar(1.0*kitPop(u,.2,.12,8));camTo([0,2.2,7.0],[0,2.2,6.4],[0,1.8,0],[0,1.8,0],k,56)},
x_emp:(u,d,k)=>{oxEnv();show(OXAZ,OXAZP,OXS3);OXAZ.position.set(0,0,-1.8);OXAZ.scale.setScalar(.75);oxP(OXAZP,'smug',[-1.2,.5],[-1.2,-.5]);OXAZP.at(0,0,1.5,0);OXAZP.g.position.y=Math.abs(Math.sin(u*5))*.05;OXS3.position.set(0,4.2,.2);OXS3.scale.setScalar(1.0*kitPop(u,.2,.12,8));camTo([0,2.2,7.0],[0,2.2,6.4],[0,1.8,0],[0,1.8,0],k,56)},
x_gap:(u,d,k)=>{oxEnv();show(OXC,OXAZ,OXSTU,OXAZP,OXBAR);OXC.position.set(-2.1,0,-1.0);OXC.scale.setScalar(.5);OXAZ.position.set(2.2,0,-1.0);OXAZ.scale.setScalar(.5);oxP(OXSTU,'smug');OXSTU.at(-1.2,0,1.4,.3);oxP(OXAZP,'neutral');OXAZP.at(1.2,0,1.4,-.3);
 const g=ease(cl(u/(d*.7)));OXBAR.userData.a.scale.x=Math.max(.01,g*2.0);OXBAR.userData.a.position.x=-1.2+g*1.0;OXBAR.position.set(0,.4,2.4);OXBAR.userData.b.visible=false;window.STAMP={on:1,u:1,text:Math.round(332*g)+' YEARS',c:'#2a4aa0',rot:-4};window.TAG('OXFORD TO THE EMPIRE','OVER 300 YEARS','#7ad0ff');camTo([0,2.0,6.6],[0,2.0,6.0],[0,1.2,0],[0,1.2,0],k,58)},
x_end:(u,d,k)=>{oxEnv();show(OXC,OXSTU);OXC.position.set(0,0,-1.0);OXC.scale.setScalar(.7);oxP(OXSTU,'smug',[-1.0,.5],[-1.0,-.5]);OXSTU.at(0,0,1.6,0);OXSTU.head.rotation.z=Math.sin(u*3)*.06;window.STAMP={on:1,u:u-.4,text:'AZTECS FELL 1521',c:'#8a2a1a',rot:-5};camTo([0,2.2,6.8],[0,2.2,6.2],[0,1.9,0],[0,1.9,0],k,56)}
};
Object.assign(SHOTS,OXH);
Object.assign(SHOTS,{oxcover:(u,d,k)=>{oxEnv();show(OXC,OXAZ,OXSTU,OXAZP);OXC.position.set(-2.0,0,-.6);OXC.scale.setScalar(.65);OXAZ.position.set(2.1,0,-.6);OXAZ.scale.setScalar(.65);oxP(OXSTU,'smug',[-.3,.2],[-2.5,.3]);OXSTU.at(-.85,0,1.7,.3);oxP(OXAZP,'shock',[-1.0,0],[-1.0,0]);OXAZP.at(.85,0,1.7,-.3);camTo([0,2.0,6.6],[0,2.0,6.6],[0,2.4,0],[0,2.4,0],0,56)}});
