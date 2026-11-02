// THE WAR OF THE BUCKET (1325, Bologna vs Modena).  Models: giant oak bucket, medieval soldiers (pot helmets, tabard cross), pawn armies 32:7 (instanced), city wall + gate, stone well with rope, castle keep, Ghirlandina-style tower, opera stage.
const BCR=(x,w,h)=>{x.fillStyle='#f4f0e4';x.fillRect(w/2-3,2,6,h-4);x.fillRect(w/2-10,9,20,5)};
function bsol(col,i){const P=person({coat:col,torsoDraw:BCR,pants:i%2?'#3a3a44':'#6a5a4a',hair:['#3a2418','#6a4220','#2a1c14'][i%3],skin:['#dca47e','#e8b894','#d49a74'][i%3],boots:1,belt:1,stubble:i%2});kitPot(P,0x8a8a94);return P}
const BMOD=[0,1,2,3,4,5].map(i=>bsol('#2a5ac8',i)),BBOL=[0,1,2,3,4,5].map(i=>bsol('#c4302a',i));
const BBKT=kitBucket();
const BRED=kitCrowd(330,[0xc4302a,0xd8503a,0xb02820],.17),BBLU=kitCrowd(80,[0x2a5ac8,0x3a6ad8,0x2050b8],.17);
(()=>{let n=0;for(let r=0;r<22;r++)for(let c=0;c<15;c++){if(n>=330)break;BRED.userData.place(n++,c*.16,0,r*.16)}BRED.userData.done();n=0;for(let r=0;r<13;r++)for(let c=0;c<6;c++){if(n>=80)break;BBLU.userData.place(n++,c*.16,0,r*.16)}BBLU.userData.done()})();
const BWALL=(()=>{const g=new THREE.Group();const st=M(0x9a9aa0);box(9,2.4,.7,st,0,1.2,0,g);for(let i=-4;i<=4;i++)box(.5,.4,.75,st,i*1.0,2.6,0,g);box(1.6,1.7,.8,M(0x2a2018),0,.85,.05,g);const ar=cyl(.8,.8,.8,10,M(0x2a2018),0,1.7,.05,g);ar.rotation.x=Math.PI/2;ar.scale.set(1,1,1);
 const s=paSign('BOLOGNA','#c4302a','#ffffff',2.2,.7,24);s.position.set(0,3.4,.4);g.add(s);cyl(.04,.04,1,5,M(0x3a2a1a),0,3.0,0,g);S.add(g);ACT.push(g);return g})();
const BWELL=(()=>{const g=new THREE.Group();cyl(.7,.75,.7,10,M(0x9a9aa0),0,.35,0,g);cyl(.55,.55,.04,10,M(0x1a2a3a),0,.7,0,g);for(const sx of[-1,1])box(.1,1.5,.1,M(0x6a4a2a),sx*.7,1.25,0,g);box(1.6,.1,.12,M(0x6a4a2a),0,2.0,0,g);const roof=cone(1.2,.6,4,M(0x9a3a2a),0,2.4,0,g);roof.rotation.y=Math.PI/4;
 g.userData.rope=cyl(.012,.012,1,4,M(0xc8b080),0,1.4,0,g);S.add(g);ACT.push(g);return g})();
const BCASTLE=(()=>{const g=new THREE.Group();const st=M(0xa8a8b0);box(2.6,2.8,2.6,st,0,1.4,0,g);for(const [x,z] of[[-1.4,-1.4],[1.4,-1.4],[-1.4,1.4],[1.4,1.4]]){cyl(.45,.5,3.4,8,st,x,1.7,z,g);cone(.55,.8,8,M(0x9a3a2a),x,3.8,z,g)}
 for(let i=-1;i<=1;i++)box(.5,.4,.3,st,i*.9,3.0,1.3,g);box(.7,1.2,.1,M(0x2a2018),0,.6,1.33,g);cyl(.04,.04,1.6,5,M(0x3a2a1a),0,3.6,0,g);const fl=flagMesh(ctex(48,32,(x,w,h)=>{x.fillStyle='#2a5ac8';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.fillRect(0,h/2-3,w,6);x.fillRect(w/2-3,0,6,h)}),1.1,.7);fl.position.set(.55,4.2,0);g.add(fl);g.userData.flag=fl;
 const s=paSign('MONTEVEGLIO','#2a4a8a','#ffffff',2.8,.7,17);s.position.set(0,2.15,1.34);g.add(s);S.add(g);ACT.push(g);return g})();
const BTOWER=(()=>{const g=new THREE.Group();const br=M(0xb8704a),wh=M(0xe8e2d4);box(1.8,6.5,1.8,br,0,3.25,0,g);for(let y=1;y<6.5;y+=1.2)box(1.86,.08,1.86,M(0x8a4a2a),0,y,0,g);box(1.9,.3,1.9,wh,0,6.65,0,g);const up=cyl(.8,.9,1.6,8,wh,0,7.6,0,g);const sp=cone(.9,1.8,8,M(0x4a8a6a),0,9.3,0,g);
 box(.9,1.1,.1,M(0x1a1008),0,3.0,.93,g);const bk=kitBucket();bk.parent&&bk.parent.remove(bk);bk.scale.setScalar(.7);bk.position.set(0,2.6,1.15);g.add(bk);g.userData.bk=bk;
 const s=paSign('MODENA','#2a5ac8','#ffffff',1.6,.55,24);s.position.set(0,1.2,.95);g.add(s);S.add(g);ACT.push(g);return g})();
const BSTAGE=(()=>{const g=new THREE.Group();box(14,.2,10,M(0x7a4a22),0,-.1,0,g);box(14,6,.3,M(0x3a0a14),0,3,-3.2,g);for(let i=-3;i<=3;i++)box(.9,6,.5,M(i%2?0x8a1a2a:0x6a0a1a),i*1.9,3,-3.0,g);box(14,.9,.5,M(0x8a1a2a),0,5.6,-2.9,g);
 const sp=new THREE.Mesh(new THREE.ConeGeometry(1.6,5,14,1,true),new THREE.MeshBasicMaterial({color:0xfff2a0,transparent:true,opacity:.2,side:THREE.DoubleSide}));sp.position.set(0,2.5,0);g.add(sp);
 const s=paSign('THE STOLEN BUCKET','#2a0a14','#ffd83a',3.4,.9,12);s.position.set(-1.0,3.4,-2.6);g.add(s);S.add(g);ACT.push(g);return g})();
const BFIELD=(()=>{const g=new THREE.Group();box(60,.1,50,M(0x6aa850),0,-.06,-8,g);for(let i=0;i<6;i++){const x=-24+i*9+rn(i)*3,h=3+rn(i+4)*2;g.add(cone(8,h,6,M([0x7a9a6a,0x6a8a5a,0x8aaa78][i%3]),x,h/2-.2,-26))}
 for(let i=0;i<10;i++){const t=new THREE.Group();cyl(.1,.14,1.8,5,M(0x6a4a2a),0,.9,0,t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,0),M(0x3a8a3a));c.position.y=2.3;t.add(c);t.position.set(-12+i*2.8,0,-14-rn(i)*3);g.add(t)}
 S.add(g);ACT.push(g);return g})();
const BGRASS=kitTufts(900,-10,10,-10,6,[0x5a9a40,0x6aaa4a,0x4a8a38],.3,3);
const BX=(()=>{const g=new THREE.Group();for(const s of[-1,1]){const b=box(2.0,.28,.1,M(0xc4202a),0,0,0,g);b.rotation.z=s*Math.PI/4;b.position.z=.02}g.scale.setScalar(.01);S.add(g);ACT.push(g);return g})();
const BSIGN1=kitPost('STOLEN BUCKET','#f4e8c0','#2a2a2a',2.0,.7,14,.9),BSIGN2=kitPost('CASTLE TAKEN','#f4e8c0','#2a6a2a',2.0,.7,14,.9);
const _bkh=hideAll;hideAll=function(){_bkh();BRED.userData.setN(0);BBLU.userData.setN(0);BBKT.rotation.set(0,0,0);BBKT.scale.setScalar(1);BX.scale.setScalar(.01);BTOWER.userData.bk.visible=true};
function bEnv(){kitEnv(0xa8d8f0,1.25,0xdfeedd);show(BFIELD,BGRASS)}
function bPose(P,face,arms){P.rest();P.face(face);if(arms){P.arms[0].rotation.set(arms[0],0,arms[1]);P.arms[1].rotation.set(arms[2],0,arms[3])}}
const BH={
b_hook:(u,d,k)=>{bEnv();show(BBKT,BMOD[0],BBOL[0],BRED,BBLU);const hit=.85;const f=ease(cl(u/hit));const tug=u>hit?Math.sin((u-hit)*5.5)*.22*Math.min(1,(u-hit)*3):0;BBKT.position.set(tug,0,1.7);BBKT.scale.setScalar(1.3);BBKT.rotation.z=u>hit?Math.sin((u-hit)*22)*.15*Math.exp(-(u-hit)*3)-tug*.4:0;
 BRED.userData.setN(330);BBLU.userData.setN(80);BRED.position.set(-1.0,0,-6);BBLU.position.set(-4.2,0,-6);
 const a=BMOD[0],b=BBOL[0];const z=lerp(-2.6,1.7,f);const bump=u>hit?Math.min(.3,(u-hit)*1.2):0;bPose(a,'angry');a.at(-1.15+(1-f)*.15-bump*.1+tug,0,z,0);a.walk(u<hit?u:0,11,.7);bPose(b,'angry');b.at(1.15-(1-f)*.15+bump*.1+tug,0,z,0);b.walk(u<hit?u+.5:0,11,.7);
 a.arms[0].rotation.set(-1.4,0,.5);a.arms[1].rotation.set(-1.4,0,.5);b.arms[0].rotation.set(-1.4,0,-.5);b.arms[1].rotation.set(-1.4,0,-.5);
 if(u>hit)SHAKE=.05*Math.exp(-(u-hit)*5);window.TAG('1325 ITALY','BUCKET WAR','#ffd83a');camTo([0,1.55,7.6],[0,1.55,7.2],[0,1.3,.5],[0,1.3,.5],k,58)},
b_armies:(u,d,k)=>{bEnv();show(BRED,BBLU);const g=ease(cl(u/(d*.7)));BRED.userData.setN(330*g);BBLU.userData.setN(80*g);BRED.position.set(-2.3,0,-1.4);BBLU.position.set(1.0,0,-1.4);BRED.rotation.y=0;
 
 window.TAG('BOLOGNA 32,000','MODENA 7,000','#ffd83a');window.STAMP={on:1,u:u-d*.55,text:'ODDS 4.6 TO 1',c:'#c4202a',rot:-6};camTo([0,6.6,8.0],[0,6.2,7.4],[0,.2,0],[0,.2,0],k,50)},
b_rout:(u,d,k)=>{bEnv();show(BWALL);BWALL.position.set(-1.3,0,-3.0);const L=[0,1,2];L.forEach(i=>{const a=BBOL[i],b=BMOD[i];show(a,b);const z=-1.0+i*.7,x0=1.0-u*.38-i*.12;bPose(a,'shock');a.at(x0-.2,0,z,-Math.PI/2+.3);a.walk(u+i,12,.8);a.arms[0].rotation.set(-2.5+Math.sin(u*12+i)*.3,0,-.3);a.arms[1].rotation.set(-2.5-Math.sin(u*12+i)*.3,0,.3);
  bPose(b,'happy');b.at(x0+1.0,0,z+.15,-Math.PI/2+.1);b.walk(u+i,11,.8);b.arms[1].rotation.set(-2.7,0,.3);b.arms[0].rotation.set(-.4,0,-.1)});
 window.TAG('BOLOGNA RUNS','HOME','#ff9a5a');window.STAMP={on:1,u:u-.5,text:'MODENA WINS',c:'#2a5ac8',rot:-6};camTo([.2,1.8,7.0],[-.1,1.8,6.6],[-.2,1.4,-1.0],[-.3,1.4,-1.0],k,56)},
b_well:(u,d,k)=>{bEnv();show(BWELL,BWALL,BBKT,BMOD[0],BBOL[0]);BWALL.position.set(.6,0,-3.6);BWELL.position.set(-.7,0,-.2);const lift=ease(cl((u-.3)/1.3));const by=lerp(.5,1.7,lift);BBKT.scale.setScalar(.6);BBKT.position.set(-.7,by-.3,-.2);const r=BWELL.userData.rope;r.scale.y=Math.max(.01,2.1-by);r.position.y=1.9-(2.1-by)/2;
 const a=BMOD[0];bPose(a,'smug');a.at(-1.5,0,.9,.9);a.arms[0].rotation.set(-1.0-lift*.6,0,.3);a.arms[1].rotation.set(-1.0-lift*.6,0,-.3);a.g.position.y=Math.abs(Math.sin(u*9))*.03*(1-lift);
 const b=BBOL[0];bPose(b,'shock');b.at(1.25,0,.6,-1.0);b.arms[1].rotation.set(-1.6,0,-.2);b.head.rotation.z=Math.sin(u*8)*.1;b.arms[0].rotation.set(-.2,0,-.1);
 window.TAG('THE TROPHY','A BUCKET','#ffd83a');camTo([-.2,1.8,6.8],[-.2,1.7,6.2],[-.2,1.2,0],[-.2,1.2,0],k,56)},
b_myth:(u,d,k)=>{bEnv();show(BSIGN1,BMOD[1]);BSIGN1.position.set(-.55,0,0);BSIGN1.scale.setScalar(1.1);show(BX);const t=ease(cl((u-.5)/.3));BX.position.set(-.55,1.33,.3);BX.scale.setScalar(Math.max(.01,.85*t));
 const a=BMOD[1];bPose(a,'smug');a.at(1.15,0,.9,-.5);a.arms[1].rotation.set(-1.5,0,-.3);a.head.rotation.z=Math.sin(u*3)*.1;
 window.TAG('THE MYTH','"STOLEN BUCKET"','#ff9a5a');camTo([.2,1.9,6.6],[.1,1.8,6.0],[.2,1.5,0],[.2,1.5,0],k,54)},
b_castle:(u,d,k)=>{bEnv();show(BCASTLE,BMOD[2],BMOD[3]);BCASTLE.position.set(0,0,-.6);waveFlag(BCASTLE.userData.flag,u);BCASTLE.scale.setScalar(.8);
 [[BMOD[2],-1.25],[BMOD[3],1.25]].forEach(([p,x],i)=>{bPose(p,'happy');p.at(x,0,1.4,x<0?.7:-.7);p.arms[1].rotation.set(-2.7+Math.sin(u*9+i)*.3,0,.3*(x<0?1:-1));p.arms[0].rotation.set(-.3,0,0);p.g.position.y=Math.abs(Math.sin(u*8+i))*.1});
 window.TAG('THE REAL TRIGGER','A CASTLE','#7ad0ff');camTo([0,2.6,8.4],[0,2.5,7.8],[0,2.2,0],[0,2.2,0],k,58)},
b_tower:(u,d,k)=>{bEnv();show(BTOWER);BTOWER.position.set(0,0,0);BTOWER.rotation.y=0;BTOWER.userData.bk.rotation.y=u*.8;const pan=ease(k);window.TAG('MODENA KEPT IT','IN THE TOWER','#7ad0ff');camTo([0,1.6,7.0],[0,5.2,9.5],[0,2.4,0],[0,5.2,0],k,54)},
b_end:(u,d,k)=>{kitEnv(0x1a0a10,1.0,0x1a0a10);show(BSTAGE,BMOD[0],BBKT);const a=BMOD[0];bPose(a,'happy');a.at(0,0,.2,0);a.arms[0].rotation.set(-1.6,0,-.5);a.arms[1].rotation.set(-1.6,0,.5);a.head.rotation.x=-.25+Math.sin(u*3)*.05;a.g.position.y=Math.abs(Math.sin(u*5))*.03;
 BBKT.scale.setScalar(.8);BBKT.position.set(0,.85,.85);BBKT.rotation.z=0;window.STAMP={on:1,u:u-.5,text:'OPERA 1772',c:'#8a1a2a',rot:-6};camTo([0,1.8,6.4],[0,1.8,5.8],[0,2.0,-.5],[0,2.0,-.5],k,54)}
};
Object.assign(SHOTS,BH);
Object.assign(SHOTS,{bcover:(u,d,k)=>{bEnv();show(BBKT,BMOD[0],BBOL[0]);BBKT.position.set(0,0,0);BBKT.scale.setScalar(1.2);BBKT.rotation.z=-.08;const a=BMOD[0],b=BBOL[0];bPose(a,'angry');a.at(-1.0,0,.1,.6);a.arms[0].rotation.set(-1.5,0,.3);a.arms[1].rotation.set(-1.5,0,.3);bPose(b,'angry');b.at(1.0,0,.1,-.6);b.arms[0].rotation.set(-1.5,0,-.3);b.arms[1].rotation.set(-1.5,0,-.3);camTo([0,1.5,4.9],[0,1.5,4.9],[0,1.25,0],[0,1.25,0],0,56)}});
