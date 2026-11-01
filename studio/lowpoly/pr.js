// Clip: Why Your Fingers Wrinkle.  Sets/props for the topic: bathroom (tub, foam, duck, faucet, mat, soap, wet-floor cone), giant wrinkling hands, brain with sunglasses, marble tray, tire, bandage.
const PRTILE=ctex(32,32,(x,w,h)=>{x.fillStyle='#bfe6ee';x.fillRect(0,0,w,h);x.fillStyle='#8fc4d0';x.fillRect(0,0,w,1);x.fillRect(0,0,1,h);x.fillStyle='#d8f2f6';x.fillRect(2,2,10,10);x.fillRect(18,18,10,10)},[14,6]);
const PRFLOOR=ctex(32,32,(x,w,h)=>{x.fillStyle='#f4f1ea';x.fillRect(0,0,w,h);x.fillStyle='#e8b8c4';x.fillRect(0,0,16,16);x.fillRect(16,16,16,16)},[12,12]);
const PRROOM=(()=>{const g=tkRoom(PRTILE,PRFLOOR,0x6aa8b8);
 const tub=new THREE.Group();box(3.4,.95,1.5,M(0xf6f8fa),0,.475,0,tub);box(3.0,.05,1.2,new THREE.MeshBasicMaterial({color:0x7ad8ff,transparent:true,opacity:.85}),0,.82,0,tub);
 for(let i=0;i<10;i++){const f=new THREE.Mesh(new THREE.IcosahedronGeometry(.1+.06*rn(i),0),new THREE.MeshBasicMaterial({color:0xffffff}));f.position.set(-1.2+rn(i+3)*2.4,.88,-.4+rn(i+7)*.8);tub.add(f)}
 const duck=new THREE.Group();const db=new THREE.Mesh(new THREE.IcosahedronGeometry(.18,0),M(0xffd83a));db.scale.set(1,.8,1.25);duck.add(db);const dh=new THREE.Mesh(new THREE.IcosahedronGeometry(.11,0),M(0xffd83a));dh.position.set(0,.18,.14);duck.add(dh);const bk=cone(.05,.1,4,M(0xff8a2a),0,.17,.27,duck);bk.rotation.x=Math.PI/2;duck.position.set(-1.1,.95,.2);tub.add(duck);
 tub.position.set(0,0,-1.8);g.add(tub);
 const fa=new THREE.Group();cyl(.07,.07,.5,6,tkMetal,0,.25,0,fa);const sp=cyl(.05,.05,.4,6,tkMetal,0,.5,.2,fa);sp.rotation.x=Math.PI/2;fa.position.set(1.3,1.1,-2.8);g.add(fa);
 box(1.7,.04,1.0,M(0x4ab0a8),0,.02,.5,g);
 const cn=cone(.25,.65,6,M(0xffd83a),1.6,.33,.8,g);box(.3,.08,.3,M(0xffffff),1.6,.35,.8,g);
 g.userData.tub=tub;return g})();
const PRSOAP=box(.32,.12,.22,M(0xf6f2c8),0,.06,0);S.add(PRSOAP);ACT.push(PRSOAP);
// hands: wrinkles grow with wr (0..1); finger material turns pale; optional vessels inside
function prHand(){const g=new THREE.Group();const skin=new THREE.MeshLambertMaterial({color:0xe8b894,flatShading:true,map:NZ});const rid=M(0xc08a70);const U={ridges:[],vess:[],skin};g.userData=U;
 box(.52,.56,.2,skin,0,.28,0,g);
 const fx=[-.2,-.07,.06,.19],fl=[.34,.42,.4,.32];fx.forEach((x,i)=>{for(let j=0;j<3;j++){const L=fl[i]/3,y=.56+j*L+L/2;box(.1,L*.98,.12,skin,x,y,0,g);const r=box(.108,.014,.128,rid,x,y,0,g);r.userData.base=1;U.ridges.push(r);const r2=box(.108,.014,.128,rid,x,y+L*.36,0,g);U.ridges.push(r2);if(j===1){const v=cyl(.018,.018,L*3,5,M(0xd02040),x,.56+fl[i]/2,0,g);v.visible=false;U.vess.push(v)}}});
 const th=new THREE.Group();for(let j=0;j<2;j++){box(.11,.17,.12,skin,0,.09+j*.17,0,th);const r=box(.118,.014,.128,rid,0,.09+j*.17,0,th);U.ridges.push(r)}th.position.set(.34,.2,0);th.rotation.z=-.7;g.add(th);
 S.add(g);ACT.push(g);return g}
function prWrinkle(h,w){const U=h.userData;U.ridges.forEach(r=>r.scale.set(1,1+w*3,1));U.skin.color.set(w<.01?0xe8b894:new THREE.Color(0xe8b894).lerp(new THREE.Color(0xe4cdd0),w))}
const PRH1=prHand(),PRH2=prHand();
// brain with sunglasses (the culprit)
const PRSUN=(()=>{const g=new THREE.Group();for(const sx of[-1,1])box(.34,.2,.05,M(0x111111),sx*.5,.4,.95,g);box(.2,.05,.05,M(0x111111),0,.44,.95,g);g.visible=false;TKBRAIN.add(g);return g})();
// marbles + tray table
const PRTAB=(()=>{const g=new THREE.Group();box(2.6,.08,1.3,tkMetal,0,1.0,0,g);for(const sx of[-1,1])for(const sz of[-1,1])box(.08,1.0,.08,tkDark,sx*1.2,.5,sz*.55,g);S.add(g);ACT.push(g);return g})();
const PRMAR=[...Array(6)].map((_,i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.085,0),new THREE.MeshBasicMaterial({color:[0x5ab8ff,0xff6a8a,0x7affc0][i%3]}));S.add(m);ACT.push(m);return m});
// tire with treads on a wet road
const PRTIRE=(()=>{const g=new THREE.Group();const t=new THREE.Mesh(new THREE.TorusGeometry(.5,.22,6,14),M(0x2a2a30));g.add(t);for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const b=box(.14,.1,.34,M(0x15151a),Math.cos(a)*.72,Math.sin(a)*.72,0,g);b.rotation.z=a}cyl(.2,.2,.2,8,tkMetal,0,0,0,g).rotation.x=Math.PI/2;g.userData.t=t;S.add(g);ACT.push(g);return g})();
const PRRAIN=[...Array(18)].map((_,i)=>{const m=box(.02,.22,.02,new THREE.MeshBasicMaterial({color:0x9ad8ff}));S.add(m);ACT.push(m);return m});
function prRain(u,x0=-2,x1=2){PRRAIN.forEach((m,i)=>{const a=(u*2.2+i*.37)%1;m.visible=true;m.position.set(x0+(x1-x0)*rn(i+2),3.2-a*3.1,-.4+rn(i+9)*1.4)})}
const PRROAD=box(9,.04,3,M(0x3a3e48),0,.02,0);S.add(PRROAD);ACT.push(PRROAD);
// bulging eyes + forehead wrinkles for the raisin gag
const PREYE=(()=>{const a=[];for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.12,1),M(0xffffff));e.position.set(sx*.13,.05,.3);POLY.head.add(e);const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.045,0),M(0x111111));p.position.set(sx*.13,.05,.41);POLY.head.add(p);e.visible=p.visible=false;a.push(e,p)}for(let i=0;i<4;i++){const w=box(.4,.015,.04,M(0x7a4a30),0,.17+i*.045,.27,POLY.head);w.visible=false;a.push(w)}return a})();
const _prhide=hideAll;hideAll=function(){_prhide();PRROOM.children.forEach(c=>c.visible=true);POLY.head.scale.set(1,1,1);PREYE.forEach(m=>m.visible=false);PRSUN.visible=false;[PRH1,PRH2].forEach(h=>{h.scale.setScalar(1);h.rotation.set(0,0,0);h.userData.vess.forEach(v=>v.visible=false);h.userData.skin.transparent=false;h.userData.skin.opacity=1;prWrinkle(h,0)});PRMAR.forEach(m=>m.visible=false);TKBRAIN.scale.setScalar(1)};
function prEnv(){tkOff();S.background=new THREE.Color(0xcfeef4);S.fog.color.set(0xcfeef4);HEMI.intensity=1.25;show(PRROOM)}
const PSH={
p_hook:(u,d,k)=>{prEnv();show(POLY,PRH1);POLY.rest();POLY.at(0,.2,-1.75,0);POLY.face('neutral');POLY.arms[1].rotation.set(-2.6,0,-.2);const w=cl((u-.3)/(d*.7));PRH1.position.set(.7,1.55,-1.0);PRH1.scale.setScalar(.75);prWrinkle(PRH1,w);window.TAG('YOUR NERVOUS SYSTEM','DOES IT ON PURPOSE','#ffb84a');camTo([0,1.8,5.4],[0,1.8,5.0],[0,1.95,-1.2],[0,1.95,-1.2],k,42)},
p_nerve:(u,d,k)=>{prEnv();show(PRH1,TKBRAIN);const w=cl(u/(d*.8));prWrinkle(PRH1,w);PRH1.position.set(-.45,.4,0);PRH1.scale.setScalar(1.25);PRH1.userData.skin.transparent=true;PRH1.userData.skin.opacity=.5;PRH1.userData.vess.forEach(v=>{v.visible=true;v.scale.x=1-.7*w;v.scale.z=1-.7*w});TKBRAIN.position.set(.8,2.5,-.3);TKBRAIN.scale.setScalar(.3);TKBRAIN.rotation.set(0,-.4,0);PRSUN.visible=true;tkSig(a=>[.8-1.2*a,2.5-1.8*a,-.2],u/Math.max(.5,d)*1.1,5);window.TAG('BLOOD VESSELS','SQUEEZED','#ff6a8a');camTo([0,1.6,5.6],[0,1.6,5.3],[0,1.4,0],[0,1.4,0],k,42)},
p_nerve2:(u,d,k)=>{prEnv();show(PRH1,PRH2);prWrinkle(PRH1,1);prWrinkle(PRH2,0);PRH1.position.set(-.55,.3,0);PRH1.scale.setScalar(1.1);PRH2.position.set(.55,.3,0);PRH2.scale.setScalar(1.1);window.TAG('NERVE DAMAGE','NO WRINKLES','#7ad0ff');camTo([0,1.1,5.0],[0,1.1,4.7],[0,.9,0],[0,.9,0],k,42)},
p_tread:(u,d,k)=>{tkOff();S.background=new THREE.Color(0x8aa0b8);S.fog.color.set(0x8aa0b8);HEMI.intensity=1.15;ground.visible=false;show(PRROAD,PRTIRE,PRH1);prRain(u);const x=lerp(1.9,1.3,k);PRTIRE.position.set(x,.72,0);PRTIRE.rotation.set(0,0,-u*5);prWrinkle(PRH1,1);PRH1.position.set(-1.0,.5,0);PRH1.scale.setScalar(1.2);window.TAG('LIKE TIRE TREADS','MAYBE','#ffb84a');camTo([0,1.2,6.4],[0,1.2,6.4],[0,1.0,0],[0,1.0,0],0,42)},
p_marble:(u,d,k)=>{prEnv();show(PRTAB,PRH1,PRH2);const a=ease(cl(k*1.8)),b=ease(cl((k-.45)*2));prWrinkle(PRH1,1);prWrinkle(PRH2,0);PRMAR.forEach((m,i)=>{m.visible=true;m.position.set(-.9+i*.36,1.13,((i%2)-.5)*.5)});
 // both hands grab, both marbles slip out
 PRH1.position.set(-.55,lerp(2.1,1.12,a),.1);PRH2.position.set(.55,lerp(2.1,1.12,a),.1);PRH1.scale.setScalar(.95);PRH2.scale.setScalar(.95);PRH1.rotation.z=.2;PRH2.rotation.z=-.2;
 const s=cl((k-.55)*3);if(s>0){PRMAR[1].position.set(-.55+s*1.4,1.13+Math.sin(s*Math.PI)*.8,.1+s*1.2);PRMAR[4].position.set(.55-s*1.4,1.13+Math.sin(s*Math.PI)*.8,.1+s*1.2)}window.TAG('GRIP TEST','BOTH FUMBLE','#ff8a8a');camTo([0,1.9,5.6],[0,1.9,5.3],[0,1.3,0],[0,1.3,0],k,45)},
p_raisin:(u,d,k)=>{prEnv();show(POLY,PRH1);POLY.rest();POLY.at(0,.2,-1.7,0);POLY.face('shock');const sq=Math.sin(u*14)*.05;POLY.head.scale.set(1.55+sq,.78-sq,1.1);PREYE.forEach(m=>m.visible=true);prWrinkle(PRH1,1);PRH1.position.set(.7,1.2,-.3);PRH1.scale.setScalar(1.3);POLY.arms[1].rotation.set(-2.6,0,-.2);camTo([0,1.65,3.3],[0,1.65,2.9],[0,1.55,-1.0],[0,1.55,-1.0],k,40)},
p_slip:(u,d,k)=>{prEnv();show(POLY,PRSOAP);const f=cl((k-.5)/.3),fe=ease(f);POLY.rest();const x=lerp(-.9,.15,cl(k/.5));POLY.at(x+fe*.5,fe>0?Math.sin(f*Math.PI)*.5:0,.6,.9);POLY.g.rotation.z=-fe*1.45;POLY.face(f>0?'shock':'bored');if(f>0){POLY.arms[0].rotation.set(-.6,0,-1.4*Math.sin(u*30));POLY.arms[1].rotation.set(-.6,0,1.4*Math.sin(u*30))}PRSOAP.position.set(.35+fe*.9,.06+Math.sin(f*Math.PI)*.4,.9);PRSOAP.rotation.y=fe*5;window.TAG(f>0?'THEN WE INVENTED':'EVOLUTION GAVE US','GRIP'.replace('GRIP',f>0?'SOAP':'GRIP'),f>0?'#7affc0':'#ffb84a');camTo([0,1.1,4.3],[0,1.1,4.3],[.1,1.55,.6],[.1,1.55,.6],0,44)}
};
Object.assign(SHOTS,PSH);
// cover: stretched shocked Poly in the tub, giant wrinkled hand in front (hero), blurred bathroom behind
function prCoverPose(){show(POLY,PRH1);POLY.rest();POLY.at(-.15,.2,-1.7,.1);POLY.face('shock');POLY.head.scale.set(1.5,.8,1.1);PREYE.forEach(m=>m.visible=true);POLY.arms[1].rotation.set(-2.6,0,-.2);prWrinkle(PRH1,1);PRH1.position.set(.45,1.1,.2);PRH1.scale.setScalar(1.15);PRH1.rotation.z=-.1}
Object.assign(SHOTS,{prcover:(u,d,k)=>{prEnv();camTo([0,1.9,4.6],[0,1.9,4.6],[0,1.75,-.6],[0,1.75,-.6],0,40)},
 prcoverc:(u,d,k)=>{tkOff();S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.25;show(PRROOM);PRROOM.children.forEach(c=>c.visible=(c===PRROOM.userData.tub));prCoverPose();camTo([0,1.9,4.6],[0,1.9,4.6],[0,1.75,-.6],[0,1.75,-.6],0,40)}});
