// THE WHISKY WAR (Hans Island, Canada vs Denmark).  Models: rocky Arctic island with snow cap, ice floes, Canadian + Danish flags, parka soldier / navy soldier, whisky + schnapps bottles, welcome signs, map slabs, pastry counter, civil servant.
const HFC=ctex(96,64,(x,w,h)=>{x.fillStyle='#d8202c';x.fillRect(0,0,w*.25,h);x.fillRect(w*.75,0,w*.25,h);x.fillStyle='#fff';x.fillRect(w*.25,0,w*.5,h);x.fillStyle='#d8202c';x.beginPath();x.moveTo(w/2,8);x.lineTo(w/2+6,22);x.lineTo(w/2+16,18);x.lineTo(w/2+10,34);x.lineTo(w/2+18,38);x.lineTo(w/2+2,46);x.lineTo(w/2+2,58);x.lineTo(w/2-2,58);x.lineTo(w/2-2,46);x.lineTo(w/2-18,38);x.lineTo(w/2-10,34);x.lineTo(w/2-16,18);x.lineTo(w/2-6,22);x.closePath();x.fill()});
const HFD=ctex(96,64,(x,w,h)=>{x.fillStyle='#c4202a';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.fillRect(26,0,10,h);x.fillRect(0,26,w,10)});
function hFlag(tx){const g=new THREE.Group();cyl(.03,.03,1.5,5,M(0xdddddd),0,.75,0,g);const f=flagMesh(tx,.9,.6);f.position.set(.46,1.2,0);g.add(f);g.userData.f=f;S.add(g);ACT.push(g);return g}
const HFLC=hFlag(HFC),HFLD=hFlag(HFD);
const HISLE=(()=>{const g=new THREE.Group();const rk=new THREE.MeshLambertMaterial({color:0x8a8a92,flatShading:true});const m=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),rk);m.scale.set(1.25,.55,1);m.position.y=-.1;g.add(m);const sn=new THREE.Mesh(new THREE.IcosahedronGeometry(1.35,1),M(0xf4f8ff));sn.scale.set(1.1,.45,.9);sn.position.set(.2,.55,-.2);g.add(sn);
 for(let i=0;i<7;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.3+rn(i)*.3,0),rk);b.position.set((rn(i+3)-.5)*5,.05,(rn(i+8)-.5)*3.2);b.scale.y=.7;g.add(b)}S.add(g);ACT.push(g);return g})();
const HSEA=(()=>{const g=new THREE.Group();box(80,.1,80,M(0x3a8ad0),0,-.5,0,g);for(let i=0;i<14;i++){const f=cyl(.8+rn(i)*.9,.9+rn(i)*.9,.25,7,M(0xeaf4ff),(rn(i+5)-.5)*16,-.4,(rn(i+9)-.7)*10,g);f.userData.ph=i}S.add(g);ACT.push(g);return g})();
const HMAP=(()=>{const g=new THREE.Group();const sn=M(0xeef4fa);box(1.3,.4,6,sn,-1.95,0,0,g);box(1.3,.4,6,sn,1.95,0,0,g);const a=paSign('CANADA','#d8202c','#ffffff',1.1,.4,24);a.position.set(-1.95,.9,.5);g.add(a);const b=paSign('GREENLAND','#c4202a','#ffffff',1.15,.4,16);b.position.set(1.95,.9,.5);g.add(b);S.add(g);ACT.push(g);return g})();
const HSOLC=person({coat:'#b02828',pants:'#2a2a3a',hair:'#4a3020',skin:'#e8b894',boots:1,belt:1,stubble:1});(()=>{const P=HSOLC;const h=new THREE.Group();cyl(.21,.23,.14,10,M(0x6a4a2a),0,.2,0,h);cyl(.27,.27,.06,10,M(0x7a5a3a),0,.13,0,h);h.position.y=-.02;P.head.add(h)})();
const HSOLD=person({coat:'#1c2a5c',pants:'#1c2a5c',hair:'#d8c898',skin:'#efc2a2',hat:'kepi',belt:1,stubble:0,stache:'#c8b070'});
const HCC=kitBottle(0xa06a20,'CC','#f4e8c0'),HSCH=kitBottle(0xcfe8e0,'GD','#f4f0e0');
const HSIGNC=kitSign2('WELCOME','TO CANADA','#d8202c','#ffffff',1.5,.8,20),HSIGND=kitSign2('WELCOME TO','DANISH ISLAND','#c4202a','#ffffff',1.7,.8,15);[HSIGNC,HSIGND].forEach(s=>{S.add(s);ACT.push(s)});
const HCOUNTER=(()=>{const g=new THREE.Group();box(4.2,1.0,1.0,M(0x8a5a30),0,.5,0,g);box(4.4,.1,1.1,M(0xe8dcc0),0,1.05,0,g);box(4.0,.9,.9,new THREE.MeshBasicMaterial({color:0xbfe8ff,transparent:true,opacity:.18}),0,1.55,0,g);
 for(let i=0;i<5;i++){const p=new THREE.Group();const d=new THREE.Mesh(new THREE.CylinderGeometry(.28,.3,.12,10),M(0xd8a040));p.add(d);const j=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.14,8),M(0xc4202a));j.position.y=.04;p.add(j);for(let k=0;k<4;k++){const r=box(.12,.12,.12,M(0xe8b858),Math.cos(k*1.57)*.2,.05,Math.sin(k*1.57)*.2,p);r.rotation.y=k}p.position.set(-1.6+i*.8,1.18,.0);g.add(p)}
 const s=kitSign2('DANISH PASTRIES','STILL ALLOWED','#f4e8c0','#2a6a2a',2.6,.9,14);s.position.set(0,2.6,.1);g.add(s);S.add(g);ACT.push(g);return g})();
const HCLERK=person({coat:'#4a4a5a',pants:'#3a3a4a',hair:'#8a6a3a',skin:'#e8b894',boots:1,belt:1,stache:'#6a4a2a'});
const HLEAF=kitMark('CA','#d8202c','#fff');
const _hh=hideAll;hideAll=function(){_hh();HSOLC.g.scale.setScalar(1);HSOLD.g.scale.setScalar(1)};
function hEnv(dark){kitEnv(dark||0xcfe6f6,1.3,0xe6f2fa);show(HSEA);HSEA.children.forEach((f,i)=>{if(f.userData&&f.userData.ph!=null)f.position.y=-.4+Math.sin(f.userData.ph+window.__t||0)*.04})}
function hPose(P,face,l,r){P.rest();P.face(face);if(l)P.arms[0].rotation.set(l[0],0,l[1]);if(r)P.arms[1].rotation.set(r[0],0,r[1])}
const HH={
h_hook:(u,d,k)=>{hEnv();show(HISLE,HFLC,HFLD,HSOLC,HSOLD,HCC,HSCH);HISLE.position.set(0,-.2,-1.2);HISLE.scale.setScalar(.8);
 const a=ease(cl(u/.5)),b=ease(cl((u-.4)/.5));hPose(HSOLC,'smug',[-.2,0],[-1.4,-.2]);HSOLC.at(-1.0,.35,.4,.5);HFLC.position.set(-.35,.55,-.1);HFLC.scale.setScalar(.9);waveFlag(HFLC.userData.f,u);HCC.position.set(-.6,.4+(1-a)*1.2,.55);HCC.scale.setScalar(1.4);
 hPose(HSOLD,u>.9?'angry':'neutral',[-.2,0],[-1.4,.2]);HSOLD.at(lerp(1.5,.95,b),.35,.5,-.5);HSOLD.walk(u,9,.5);if(u>.9)HSOLD.legs.forEach(l=>l.rotation.x=0);HFLD.position.set(.5,.55,-.1);HFLD.scale.setScalar(.9);waveFlag(HFLD.userData.f,u+1);HSCH.position.set(.65,.4+(1-b)*1.6,.65);HSCH.scale.setScalar(1.4);
 if(u>.95)SHAKE=.04*Math.exp(-(u-.95)*5);window.TAG('CANADA VS DENMARK','THE WHISKY WAR','#ffd83a');camTo([0,1.6,6.3],[0,1.6,5.8],[0,1.1,0],[0,1.1,0],k,58)},
h_map:(u,d,k)=>{hEnv();show(HMAP,HISLE);HMAP.position.set(0,.1,0);HISLE.position.set(0,.05,0);HISLE.scale.setScalar(.2);const s=kitSign2('HANS ISLAND','1.3 KM²','#f4e8c0','#2a2a2a',1.6,.8,17);S.add(s);ACT.push(s);s.visible=true;s.position.set(0,1.7,.2);s.quaternion.copy(cam.quaternion);
 window.TAG('THE ARCTIC','BARREN ROCK','#7ad0ff');window.STAMP={on:1,u:u-.4,text:'NOBODY LIVES HERE',c:'#2a4aa0',rot:-5};camTo([0,5.2,8.2],[0,4.2,6.6],[0,.3,0],[0,.3,0],k,52)},
h_signs:(u,d,k)=>{hEnv();show(HISLE,HFLC,HFLD,HSOLC,HSOLD,HCC,HSCH,HSIGNC,HSIGND);HISLE.position.set(0,-.2,-1.0);HISLE.scale.setScalar(.8);HFLC.position.set(-.75,.5,-.25);HFLD.position.set(.75,.5,-.25);waveFlag(HFLC.userData.f,u);waveFlag(HFLD.userData.f,u+1);
 hPose(HSOLC,'happy',[-.2,0],[-1.9,-.2]);HSOLC.at(-1.2,.3,.7,.6);HSOLD.rest();hPose(HSOLD,'happy',[-.2,0],[-1.9,.2]);HSOLD.at(1.2,.3,.7,-.6);
 const t=ease(cl((u-.3)/.5)),t2=ease(cl((u-1.2)/.5));HCC.position.set(-.85,.45,.8);HSCH.position.set(.85,.45,.8);HSIGNC.scale.setScalar(.72);HSIGND.scale.setScalar(.72);HSIGNC.position.set(-.5,lerp(-.5,1.2,t),.6);HSIGND.position.set(.5,lerp(-.5,1.2,t2),.6);HSIGNC.rotation.y=.1;HSIGND.rotation.y=-.1;HSOLC.arms[1].rotation.x=-1.9+Math.sin(u*8)*.15;HSOLD.arms[1].rotation.x=-1.9+Math.sin(u*8+1)*.15;
 camTo([0,1.8,6.4],[0,1.8,5.9],[0,1.2,0],[0,1.2,0],k,58)},
h_friend:(u,d,k)=>{hEnv();show(HISLE,HFLC,HFLD,HSOLC,HSOLD,HCC,HSCH);HISLE.position.set(0,-.2,-1.0);HISLE.scale.setScalar(.8);HFLC.position.set(-.8,.5,-.4);HFLD.position.set(.8,.5,-.4);waveFlag(HFLC.userData.f,u);waveFlag(HFLD.userData.f,u+1);
 const c=Math.max(0,Math.sin(u*7))*.12;hPose(HSOLC,'happy',[-1.0,0],[-1.7-c,-.25]);HSOLC.at(-.7,.3,1.0,.9);hPose(HSOLD,'happy',[-1.0,0],[-1.7-c,.25]);HSOLD.at(.7,.3,1.0,-.9);HSOLC.g.position.y=.3+Math.abs(Math.sin(u*7))*.03;HSOLD.g.position.y=.3+Math.abs(Math.sin(u*7))*.03;
 HCC.position.set(-.1,1.7+c,1.35);HCC.rotation.z=-.4;HSCH.position.set(.1,1.7+c,1.35);HSCH.rotation.z=.4;window.STAMP={on:1,u:u-.4,text:'FRIENDLIEST WAR',c:'#2a8a3a',rot:-4};window.TAG('A PASSIVE-AGGRESSIVE','BORDER DISPUTE','#ff9a5a');camTo([0,1.8,6.1],[0,1.8,5.6],[0,1.3,0],[0,1.3,0],k,58)},
h_pastry:(u,d,k)=>{kitEnv(0xe8dcc8,1.25,0xe8dcc8);show(HCOUNTER,HCLERK);const fl=kitFloor(0xb8a888,30,30);show(fl);HCOUNTER.position.set(0,0,-.4);hPose(HCLERK,'smug',[-.3,0],[-1.6,-.2]);HCLERK.at(-.9,0,1.3,.4);HCLERK.arms[1].rotation.x=-1.6+Math.sin(u*3)*.06;HCLERK.head.rotation.z=Math.sin(u*2)*.08;
 camTo([0,2.2,7.0],[0,2.1,6.5],[0,1.7,0],[0,1.7,0],k,56)},
h_split:(u,d,k)=>{hEnv();show(HISLE,HFLC,HFLD,HSOLC,HSOLD);HISLE.position.set(0,-.2,-1.0);HISLE.scale.setScalar(.85);HFLC.position.set(-1.0,.5,-.3);HFLD.position.set(1.0,.5,-.3);waveFlag(HFLC.userData.f,u);waveFlag(HFLD.userData.f,u+1);
 const sh=Math.sin(u*9)*.1;hPose(HSOLC,'happy',[-.2,0],[-1.5+sh,-.1]);HSOLC.at(-.55,.3,.9,1.2);hPose(HSOLD,'happy',[-.2,0],[-1.5-sh,.1]);HSOLD.at(.55,.3,.9,-1.2);
 const t=ease(cl((u-.2)/.6));const ln=box(.07,1.5*t,2.4,M(0xffffff),0,.7+.75*t,-1.0);S.add(ln);ACT.push(ln);
 window.STAMP={on:1,u:u-.7,text:'SPLIT IN HALF 2022',c:'#2a4aa0',rot:-4};window.TAG('AFTER 17 YEARS','OF TALKS','#7ad0ff');camTo([0,1.9,6.2],[0,1.9,5.7],[0,1.2,0],[0,1.2,0],k,58)},
h_end:(u,d,k)=>{hEnv();show(HISLE,HFLC,HFLD,HSOLC,HSOLD,HCC,HSCH);HISLE.position.set(0,-.2,-1.0);HISLE.scale.setScalar(.85);HFLC.position.set(-.55,.55,-.2);HFLD.position.set(.55,.55,-.2);waveFlag(HFLC.userData.f,u);waveFlag(HFLD.userData.f,u+1);
 const c=Math.max(0,Math.sin(u*6))*.12;hPose(HSOLC,'happy',[-.3,0],[-1.7-c,-.25]);HSOLC.at(-.8,.3,1.1,.8);hPose(HSOLD,'happy',[-.3,0],[-1.7-c,.25]);HSOLD.at(.8,.3,1.1,-.8);HCC.position.set(-.18,1.75+c,1.45);HCC.rotation.z=-.4;HSCH.position.set(.18,1.75+c,1.45);HSCH.rotation.z=.4;
 window.TAG('NOBODY FIRED A SHOT','CHEERS','#ffd83a');camTo([0,1.8,6.1],[0,1.8,5.6],[0,1.3,0],[0,1.3,0],k,58)}
};
Object.assign(SHOTS,HH);
Object.assign(SHOTS,{hcover:(u,d,k)=>{HH.h_end(.3,3,.1);window.TAGS={on:0};window.STAMP={on:0}}});
