// VASA: a top-heavy warship.  Models: Vasa (hull, two gun decks, three masts, gold stern, sails, tilt), sea with wind lines, King Gustavus-type crown guy, admiral, 30 runners, museum hall.
function vasaModel(){const g=new THREE.Group(),P={g};const hull=M(0x7a4a22),gold=M(0xd8a830),dk=M(0x5a3818);const body=new THREE.Group();g.add(body);P.body=body;
 box(2.0,1.0,6.0,hull,0,.6,0,body);box(2.2,.18,6.2,gold,0,1.1,0,body);box(2.2,.18,6.2,gold,0,.45,0,body);for(let i=0;i<5;i++)for(const sx of[-1,1])box(.1,.3,.35,M(0x1a1a1a),sx*1.02,.8,-2+i*1.0,body);
 box(2.0,1.6,1.8,hull,0,1.6,-2.2,body);box(2.2,.2,2.0,gold,0,2.5,-2.2,body);for(let i=0;i<3;i++)box(.3,.5,.1,gold,-.6+i*.6,2.1,-3.12,body);
 box(1.8,.5,2.0,hull,0,1.35,2.2,body);cone(.3,1.2,6,gold,0,1.2,3.5,body).rotation.x=Math.PI/2;
 for(const [z,h] of[[-1.5,4.4],[0,5.2],[1.4,4.0]]){cyl(.1,.12,h,6,dk,0,1.2+h/2,z,body);box(2.4,1.8,.06,M(0xf4ecd0),0,1.8+h*.55,z,body);box(1.7,1.3,.06,M(0xf4ecd0),0,1.8+h*.9,z,body)}
 P.rest=()=>{body.rotation.set(0,0,0);g.rotation.set(0,0,0);g.position.set(0,0,0);g.scale.setScalar(1)};S.add(g);ACT.push(g);return P}
const VAS=vasaModel();
const VASSEA=(()=>{const g=new THREE.Group();box(80,.1,60,M(0x3a7ac0),0,-.5,0,g);S.add(g);ACT.push(g);return g})();
const VASLN=[...Array(6)].map(()=>{const m=box(1.4,.04,.04,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8}),0,0,0);m.visible=false;S.add(m);ACT.push(m);return m});
function vasP(o){return person(Object.assign({boots:1,belt:1,tails:1},o))}
const VASKING=vasP({coat:'#1c2a8a',pants:'#c4202a',hair:'#c8a050',skin:'#efc2a2',stache:'#c8a050',beard:'#c8a050'});(()=>{const c=new THREE.Group();cyl(.2,.22,.14,8,M(0xf0c030),0,.17,0,c);for(let i=0;i<5;i++)cone(.05,.14,4,M(0xf0c030),Math.cos(i*1.26)*.18,.3,Math.sin(i*1.26)*.18,c);VASKING.head.add(c)})();
const VASADM=vasP({coat:'#2a2a3a',pants:'#5a5a62',hair:'#e8e8e8',skin:'#e8b894',beard:'#e8e8e8'});(()=>{const c=new THREE.Group();cyl(.2,.22,.12,10,M(0x1a1a1e),0,.17,0,c);box(.34,.03,.2,M(0x1a1a1e),0,.11,.2,c);VASADM.head.add(c)})();
const VASRUN=kitCrowd(30,[0x8a5a30,0x5a6a3a,0x3a5a8a],.17);(()=>{for(let i=0;i<30;i++)VASRUN.userData.place(i,(i%10-4.5)*.3,0,(Math.floor(i/10)-1)*.3);VASRUN.userData.done()})();
const VASWOOD=(()=>{const g=new THREE.Group();box(40,.1,20,M(0x8a6a44),0,-.06,0,g);box(40,6,.3,M(0x5a4a3a),0,3,-5,g);S.add(g);ACT.push(g);return g})();
const VASN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s};
const VAS1=VASN('10 AUGUST 1628','MAIDEN VOYAGE','#f4e8c0','#8a1a2a',2.2),VAS2=VASN('TOP-HEAVY','','#f4e8c0','#2a2a2a',1.8),VAS3=VASN('333 YEARS','UNDERWATER','#f4e8c0','#2a2a6a',2.0),VAS4=VASN('RAISED','1961','#f4e8c0','#2a6a3a',1.6);
const _vash2=hideAll;hideAll=function(){_vash2();VAS.rest();VASRUN.userData.setN(0);VASLN.forEach(m=>m.visible=false)};
function vasEnv(){kitEnv(0xbfe0f6,1.3,0xdceef8);show(VASSEA)}
function vasPose(P,face,l,r){P.rest();P.face(face);if(l)P.arms[0].rotation.set(l[0],0,l[1]);if(r)P.arms[1].rotation.set(r[0],0,r[1])}
const VASH={
v_hook:(u,d,k)=>{vasEnv();show(VAS);VAS.at=(x,y,z,ry)=>{VAS.g.position.set(x,y,z);VAS.g.rotation.y=ry};VAS.at(0,0,0,Math.PI/2);VAS.g.scale.setScalar(.6);const t=ease(cl((u-.3)/(d*.7)));VAS.body.rotation.z=t*.5;VAS.g.position.y=-t*.9;VASLN.forEach((m,i)=>{m.visible=true;m.position.set(-2+((u*7+i*.6)%4),2.6+i*.4,2.0)});window.TAG('A WARSHIP SANK','MINUTES INTO ITS TRIP','#ffd83a');camTo([0,2.6,13.2],[0,2.6,12.6],[0,2.0,0],[0,2.0,0],k,58)},
v_arm:(u,d,k)=>{vasEnv();show(VAS);VAS.at=(x,y,z,ry)=>{VAS.g.position.set(x,y,z);VAS.g.rotation.y=ry};VAS.at(0,0,0,Math.PI/2.3);VAS.g.scale.setScalar(.6);window.STAMP={on:1,u:u-.7,text:'MANY GUNS',c:'#8a1a2a',rot:-4};camTo([0,2.6,13.2],[0,2.6,12.6],[0,2.0,0],[0,2.0,0],k,58)},
v_top:(u,d,k)=>{vasEnv();show(VAS);VAS.g.position.set(0,0,0);VAS.g.rotation.y=Math.PI/2.4;VAS.g.scale.setScalar(.6);VAS.body.rotation.z=Math.sin(u*2)*.12;window.STAMP={on:1,u:u-.6,text:'TOO HEAVY',c:'#c4202a',rot:-4};camTo([0,2.6,13.2],[0,2.6,12.6],[0,2.0,0],[0,2.0,0],k,58)},
v_test:(u,d,k)=>{kitEnv(0xe8dcc0,1.2,0xe8dcc0);show(VASWOOD,VASRUN,VASADM);VASRUN.userData.setN(30);VASRUN.position.set(Math.sin(u*3)*1.4,0,.5);VASRUN.scale.setScalar(1.2);vasPose(VASADM,'shock',[-2.5,0],[-2.5,0]);VASADM.at(-.8,0,1.8,.5);VASADM.g.position.y=Math.abs(Math.sin(u*9))*.05;window.TAG('30 MEN RAN','ACROSS THE DECK','#ffd83a');camTo([0,2.0,6.8],[0,2.0,6.3],[0,1.0,.8],[0,1.0,.8],k,56)},
v_king:(u,d,k)=>{kitEnv(0xe8dcc0,1.2,0xe8dcc0);show(VASWOOD,VASKING);vasPose(VASKING,'angry',[-.3,0],[-1.5,-.3]);VASKING.at(0,0,1.8,0);VASKING.arms[1].rotation.set(-1.5+Math.sin(u*8)*.2,0,-.3);window.TAG('THE KING','WAS IMPATIENT','#ff9a5a');camTo([0,1.9,5.8],[0,1.9,5.3],[0,1.4,1.8],[0,1.4,1.8],k,56)},
v_sink:(u,d,k)=>{vasEnv();show(VAS);VAS.g.position.set(0,0,0);VAS.g.rotation.y=Math.PI/2.2;VAS.g.scale.setScalar(.6);const t=ease(cl(u/(d*.85)));VAS.body.rotation.z=t*.55;VAS.g.position.y=-t*1.2;VASLN.forEach((m,i)=>{m.visible=true;m.position.set(-2+((u*8+i*.6)%4),2.4+i*.4,2.0)});window.STAMP={on:1,u:u-d*.5,text:'A FEW MINUTES',c:'#c4202a',rot:-4};camTo([0,2.6,13.2],[0,2.6,12.6],[0,2.0,0],[0,2.0,0],k,58)},
v_raise:(u,d,k)=>{vasEnv();show(VAS);VAS.g.position.set(0,-.2+ease(cl(u/(d*.8)))*.3,0);VAS.g.rotation.y=Math.PI/2.3;VAS.g.scale.setScalar(.6);window.STAMP={on:1,u:u-d*.55,text:'RAISED 1961',c:'#2a6a3a',rot:-4};camTo([0,2.6,13.2],[0,2.6,12.6],[0,2.0,0],[0,2.0,0],k,58)}
};
Object.assign(SHOTS,VASH);
Object.assign(SHOTS,{vsacover:(u,d,k)=>{vasEnv();show(VAS);VAS.g.position.set(0,-.6,0);VAS.g.rotation.y=Math.PI/2.4;VAS.g.scale.setScalar(.7);VAS.body.rotation.z=.35;camTo([0,2.6,12.0],[0,2.6,12.0],[0,2.0,0],[0,2.0,0],0,58)}});
