// VENUS: a spin takes longer than a year.  Models: Venus (cloud-swirl texture, flag marker), Sun, orbit ring, surface with rocks + cloud deck, astronaut Poly (reuses CAST), flying calendar pages, W/E signposts.
const VTEX=ctex(256,128,(x,w,h)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++){const b=.5+.5*Math.sin(j*.35+Math.sin(i*.05+j*.1)*2);const n=rn(i*3+j*17)*.08;const r=Math.round(214+b*30+n*30),g=Math.round(170+b*34+n*30),bl=Math.round(90+b*26+n*20);x.fillStyle='rgb('+r+','+g+','+bl+')';x.fillRect(i,j,1,1)}});
const VPLAN=(()=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),new THREE.MeshLambertMaterial({map:VTEX}));g.add(m);const pole=cyl(.03,.03,.7,5,M(0xffffff),1.3,0,0,g);pole.rotation.z=Math.PI/2;const f=flagMesh(ctex(48,32,(x,w,h)=>{x.fillStyle='#2a4aa0';x.fillRect(0,0,w,h);x.fillStyle='#ffd83a';x.font='bold 26px RC,Arial';x.textAlign='center';x.fillText('V',w/2,h/2+9)}),.55,.38);f.position.set(1.55,.2,0);f.rotation.y=Math.PI/2;f.scale.setScalar(.7);g.add(f);g.userData={m,f,pole};S.add(g);ACT.push(g);return g})();
const VRING=(()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(2.6,.02,4,60),new THREE.MeshBasicMaterial({color:0x7a8aa0}));m.rotation.x=Math.PI/2;S.add(m);ACT.push(m);return m})();
const VFLOOR=(()=>{const g=new THREE.Group();box(60,.1,40,M(0xa86a3a),0,-.06,0,g);for(let i=0;i<14;i++){const r=new THREE.Mesh(new THREE.IcosahedronGeometry(.4+rn(i)*.7,0),M([0x8a5a30,0x7a4a28,0x9a6a3c][i%3]));r.position.set((rn(i+3)-.5)*14,.2,-2-rn(i+7)*8);r.scale.y=.6;g.add(r)}
 const cd=box(60,.3,40,new THREE.MeshBasicMaterial({color:0xe8c880,transparent:true,opacity:.92}),0,6.5,-6,g);S.add(g);ACT.push(g);return g})();
const VPAGES=[...Array(10)].map((_,i)=>{const m=box(.4,.02,.3,M(0xf8f4e8),0,0,0);m.visible=false;S.add(m);ACT.push(m);return m});
const VSIGNW=kitPost('W','#f4e8c0','#2a2a2a',.6,.6,34,1.0),VSIGNE=kitPost('E','#f4e8c0','#2a2a2a',.6,.6,34,1.0);
const VSN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s};
const VCAL=VSN('DAY','243','#f4e8c0','#8a1a2a',1.2),VCLOUD=VSN('CLOUDS','BLOCK IT','#f4e8c0','#2a2a2a',1.6),VSUIT=VSN('CHECK-OUT','???','#f4e8c0','#2a2a6a',1.7);
const VSUITCASE=(()=>{const g=new THREE.Group();box(.6,.45,.2,M(0x8a3a2a),0,.25,0,g);box(.2,.05,.05,M(0x222222),0,.52,0,g);S.add(g);ACT.push(g);return g})();
const _vh=hideAll;hideAll=function(){_vh();VPLAN.scale.setScalar(1);VPLAN.rotation.set(0,0,0)};
function vSpace(){kitEnv(0x05060e,1.1,0x05060e);show(KSTAR)}
function vSurf(){kitEnv(0xd8a050,1.15,0xd8a050);show(VFLOOR)}
function vA(face,arms){const P=CAST;P.rest();P.face(face);if(arms==='shrug'){P.arms[0].rotation.set(-.9,0,-.5);P.arms[1].rotation.set(-.9,0,.5)}}
const VNH={
v_hook:(u,d,k)=>{vSurf();show(CAST,VCAL,...VPAGES);vA('shock');CAST.at(-.55,0,1.4,.2);CAST.arms[0].rotation.set(-2.3,0,.3);CAST.arms[1].rotation.set(-2.3,0,-.3);CAST.head.rotation.z=Math.sin(u*6)*.08;VCAL.position.set(1.05,1.9,2.0);VCAL.scale.setScalar(.8);
 VPAGES.forEach((m,i)=>{m.visible=true;const a=(u*1.6+i/10)%1;m.position.set(Math.sin(i*2.3)*1.6+Math.sin(a*6+i)*.3,1.2+a*2.6,1.4+Math.cos(i*1.7)*.8);m.rotation.set(a*9,a*7+i,a*5)});if(u<.5)SHAKE=.02;window.TAG('VENUS','DAY > YEAR','#ffd83a');camTo([0,1.7,6.0],[0,1.7,5.5],[0,1.4,1.4],[0,1.4,1.4],k,56)},
v_spin:(u,d,k)=>{vSpace();show(VPLAN);VPLAN.position.set(0,1.4,0);VPLAN.scale.setScalar(1.35);VPLAN.rotation.y=-Math.PI*.5-u*(Math.PI*2/d)*.7;
 const g=cl(u/(d*.9));window.STAMP={on:1,u:1,text:Math.round(243*g)+' DAYS',c:'#c4202a',rot:-4};window.TAG('ONE SPIN','TAKES 243 DAYS','#ff9a5a');camTo([0,1.7,6.2],[0,1.7,5.6],[0,1.4,0],[0,1.4,0],k,56)},
v_orbit:(u,d,k)=>{vSpace();show(TSUN,VPLAN,VRING);TSUN.position.set(0,0,0);TSUN.scale.setScalar(.8);const g=ease(cl(u/(d*.85)));const ang=g*Math.PI*2;VPLAN.scale.setScalar(.55);VPLAN.position.set(Math.cos(ang)*2.6,0,Math.sin(ang)*2.6);VRING.position.set(0,0,0);
 VPLAN.rotation.y=-g*Math.PI*2*(224.7/243);window.STAMP={on:1,u:1,text:Math.round(225*g)+' DAYS',c:'#2a4aa0',rot:-4};window.TAG('ONE ORBIT','TAKES 225 DAYS','#7ad0ff');if(g>=1){const q=kitMark('?','#c4202a','#fff');kitMarkAt(q,2.6,1.2,0,.6)}camTo([0,5.8,5.6],[0,5.4,5.2],[0,0,0],[0,0,0],k,52)},
v_west:(u,d,k)=>{vSurf();show(CAST,VSIGNW,VSIGNE,VCLOUD,TSUN);vA('happy');CAST.at(0,0,1.6,0);CAST.arms[1].rotation.set(-2.6+Math.sin(u*6)*.2,0,.3);VSIGNW.position.set(-1.7,0,.8);VSIGNE.position.set(1.7,0,.8);VSIGNW.scale.setScalar(.9);VSIGNE.scale.setScalar(.9);
 const g=ease(cl(u/(d*.7)));TSUN.position.set(-2.4,lerp(.2,2.2,g),-3.0);TSUN.scale.setScalar(.55);VCLOUD.position.set(.55,2.8,1.0);VCLOUD.scale.setScalar(.7*kitPop(u,.6,.12,8));window.TAG('THE SUN RISES','IN THE WEST','#ffd83a');camTo([0,1.8,6.4],[0,1.8,5.9],[0,1.5,0],[0,1.5,0],k,58)},
v_117:(u,d,k)=>{vSurf();show(CAST,TSUN);vA('bored');CAST.at(0,0,1.6,0);CAST.arms[1].rotation.set(-1.4,0,-.3);CAST.head.rotation.x=.25;const g=cl(u/(d*.85));TSUN.position.set(lerp(-2.0,2.0,g),lerp(2.0,.5,g)+Math.sin(g*Math.PI)*1.5,-3.0);TSUN.scale.setScalar(.5);
 window.STAMP={on:1,u:1,text:Math.round(117*g)+' DAYS',c:'#2a6a3a',rot:-4};window.TAG('SUNRISE TO','SUNRISE','#ffd83a');camTo([0,1.8,6.2],[0,1.8,5.7],[0,1.5,1.0],[0,1.5,1.0],k,58)},
v_end:(u,d,k)=>{vSurf();show(CAST,VSUIT,VSUITCASE);vA('sweat','shrug');CAST.at(-.2,0,1.6,.2);CAST.head.rotation.z=Math.sin(u*3)*.1;VSUITCASE.position.set(-1.0,0,1.9);VSUIT.position.set(.55,2.1,1.2);VSUIT.scale.setScalar(.7*kitPop(u,.2,.12,8));camTo([0,1.8,6.0],[0,1.8,5.5],[0,1.4,1.4],[0,1.4,1.4],k,56)}
};
Object.assign(SHOTS,VNH);
Object.assign(SHOTS,{vcover:(u,d,k)=>{VNH.v_hook(.3,3.5,.1);window.TAGS={on:0}}});
Object.assign(SHOTS,{vcover2:(u,d,k)=>{vSpace();show(VPLAN);VPLAN.position.set(0,1.0,0);VPLAN.scale.setScalar(1.5);VPLAN.rotation.y=-1.9;camTo([0,1.2,6.2],[0,1.2,6.2],[0,1.0,0],[0,1.0,0],0,56)}});
