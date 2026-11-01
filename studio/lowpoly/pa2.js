// THE PASTRY WAR scenes (uses the models in pa.js).  Hook rule: frame 0 is already mid-action (a cake in flight), a hit + camera jerk at ~0.9 s.
const PASOLD=person({coat:'#2c5aa0',pants:'#f2f2f2',hair:'#2a1c14',skin:'#d9a27c',hat:'kepi',belt:1});
const PASOLD2=person({coat:'#2c5aa0',pants:'#f2f2f2',hair:'#6a4220',skin:'#e0aa84',hat:'kepi',belt:1,stache:'#4a3020'});
function paSign(txt,bg,fg,w,h,fs){const t=ctex(128,48,(x,W,H)=>{x.fillStyle=bg;x.fillRect(0,0,W,H);x.strokeStyle='#2a1a10';x.lineWidth=4;x.strokeRect(2,2,W-4,H-4);x.fillStyle=fg;x.font='bold '+(fs||22)+'px RC,Arial';x.textAlign='center';x.fillText(txt,W/2,H/2+(fs||22)/3)});t.generateMipmaps=false;return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}))}
// pastry shop
const PASHOP=(()=>{const g=new THREE.Group();const wp=ctex(32,32,(x,w,h)=>{x.fillStyle='#f6dfa0';x.fillRect(0,0,w,h);x.fillStyle='#e8c870';for(let i=0;i<w;i+=8)x.fillRect(i,0,3,h)},[10,4]);const fl=ctex(32,32,(x,w,h)=>{x.fillStyle='#8a5a30';x.fillRect(0,0,w,h);x.fillStyle='#6a4220';for(let i=0;i<w;i+=8)x.fillRect(i,0,1,h)},[10,10]);
 box(18,.1,16,M(0xffffff,{map:fl}),0,-.05,2,g);box(18,8,.2,M(0xffffff,{map:wp}),0,4,-3.2,g);
 // counter + glass display with cakes
 box(3.6,1.0,.9,M(0x8a5a30),0,.5,-1.3,g);box(3.8,.08,1.0,M(0xe8dcc0),0,1.04,-1.3,g);const glass=box(3.4,.7,.8,new THREE.MeshBasicMaterial({color:0xbfe8ff,transparent:true,opacity:.22}),0,1.43,-1.3,g);g.userData.glass=glass;
 [-1.3,-.65,0,.65,1.3].forEach((x,i)=>{const c=paCake(['layer','eclair','tart','layer','tart'][i]);c.position.set(x,1.1,-1.3);c.scale.setScalar(1.3);g.add(c)});
 // shelves with loaves, sign, awning, lanterns
 for(const y of[1.6,2.4]){box(3.6,.06,.4,M(0x6a4220),0,y,-3.0,g);for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.17,0),M(0xc8883a));b.scale.set(1.5,.7,.8);b.position.set(-1.4+i*.55,y+.14,-3.0);g.add(b)}}
 const sg=paSign('PASTELERIA','#f2e2b0','#8a2a1a',2.6,.7,24);sg.position.set(0,3.5,-3.05);g.add(sg);
 for(let i=0;i<7;i++)box(.6,.4,.05,M(i%2?0xffffff:0xc4202a),-1.8+i*.6,4.3,-3.0,g);
 S.add(g);ACT.push(g);return g})();
const PALEG=(()=>{const g=new THREE.Group();const st=fab('#f4f2ec',{seed:3,noise:.12});const th=limb(.1,.085,.55,7,st,0.0);th.position.y=.0;g.add(th);const sh=limb(.085,.065,.5,7,st,-.5);g.add(sh);box(.3,.17,.2,PADARK,0,-.82,.08,g);box(.1,.2,.2,M(0x3a2a1a),0,-.84,-.05,g);S.add(g);ACT.push(g);return g})();
const PACAKE=paCake('layer');PACAKE.scale.setScalar(1.6);S.add(PACAKE);ACT.push(PACAKE);
const PASPLAT=(()=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.17,1),new THREE.MeshBasicMaterial({color:0xfff6f0}));m.scale.set(1.3,1,.4);g.add(m);for(let i=0;i<6;i++){const d=new THREE.Mesh(new THREE.IcosahedronGeometry(.05,0),new THREE.MeshBasicMaterial({color:i%2?0xf29ab4:0xfff6f0}));d.position.set((i-2.5)*.1,-.12-i%3*.05,.05);g.add(d)}g.visible=false;S.add(g);ACT.push(g);return g})();
const PABALL=[...Array(6)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.2,0),M(0x1a1a1e));S.add(m);ACT.push(m);return m});
const PABILL=(()=>{const g=new THREE.Group();const p=paSign('60,000 PESOS','#fff8e0','#a01818',1.3,.9,20);g.add(p);g.visible=false;POLY.g.add(g);return g})();
const PACOINS=(()=>{const g=new THREE.Group();box(1.6,.7,1.0,M(0x6a3a18),0,.35,0,g);box(1.6,.5,.12,M(0x6a3a18),0,.95,-.45,g).rotation.x=-.4;for(let i=0;i<40;i++){const c=cyl(.12,.12,.04,8,PAGOLD,(rn(i)-.5)*1.3,.72+Math.floor(i/10)*.04,(rn(i+9)-.5)*.8,g);c.rotation.z=(rn(i+3)-.5)*.5}S.add(g);ACT.push(g);return g})();
const PAUJ=flagMesh(UJ,1.1,.75);PAUJ.visible=false;S.add(PAUJ);ACT.push(PAUJ);
const _pa2hide=hideAll;hideAll=function(){_pa2hide();PACOFFIN.scale.setScalar(1);PASPLAT.visible=false;PABILL.visible=false;PASANTA.g.scale.setScalar(1)};
function paSea(){ground.visible=false;water.visible=true;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=true);S.background=SKY;S.fog.color.set(HOR);HEMI.intensity=1.15}
function paBeach(){paSea();ground.visible=true;ground.material.map=OCSAND;ground.material.needsUpdate=true}
function paBall(i,from,to,a,hgt){const e=cl(a);PABALL[i].visible=a>0&&a<1;PABALL[i].position.set(lerp(from[0],to[0],e),lerp(from[1],to[1],e)+Math.sin(e*Math.PI)*hgt,lerp(from[2],to[2],e))}
const PAS={
pa_smash:(u,d,k)=>{show(PASHOP,PACHEF,PASOLD,PASOLD2,PACAKE);PASHOP.visible=true;S.background=new THREE.Color(0xf6dfa0);S.fog.color.set(0xf6dfa0);ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);HEMI.intensity=1.25;
 PACHEF.rest();PACHEF.at(-.5,0,-1.95,.12);PASOLD.rest();PASOLD.at(.6,0,-.6,-1.2);PASOLD2.rest();PASOLD2.at(-1.5,0,-.3,1.1);
 const t=u/Math.max(.3,d);const fl=cl((u-.05)/.7),hit=u>.75;PASOLD.arms[1].rotation.set(-2.0+Math.min(1,u/.6)*1.0,0,0);PASOLD.face('angry');PASOLD2.face('angry');PASOLD2.arms[0].rotation.set(-1.8+Math.sin(u*10)*.3,0,0);
 if(!hit){PACAKE.visible=true;PACAKE.position.set(lerp(.55,-.5,fl),lerp(1.6,1.75,fl)+Math.sin(fl*Math.PI)*.5,lerp(-.4,-1.7,fl));PACAKE.rotation.set(fl*9,fl*6,0);PACHEF.face('shock');PACHEF.arms[0].rotation.set(-.4,0,-1.2);PACHEF.arms[1].rotation.set(-.4,0,1.2)}
 else{PACAKE.visible=false;PASPLAT.visible=true;PASPLAT.position.set(-.5,1.76,-1.66);PASPLAT.scale.setScalar(.8);PACHEF.face('angry');PACHEF.arms[0].rotation.set(-.4,0,-1.6);PACHEF.arms[1].rotation.set(-.4,0,1.6);SHAKE=u<1.15?.12:0}
 camTo([.05,1.65,3.2],[.05,1.62,2.9],[0,1.55,-1.2],[0,1.55,-1.2],k,40)},
pa_bill:(u,d,k)=>{show(PASHOP,PACHEF);PASHOP.visible=true;S.background=new THREE.Color(0xf6dfa0);S.fog.color.set(0xf6dfa0);ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);HEMI.intensity=1.25;
 PACHEF.rest();PACHEF.at(0,0,-.4,0);PACHEF.face('angry');PACHEF.arms[1].rotation.set(-1.6,0,-.1);PACHEF.arms[0].rotation.set(-.3,0,-.9);const pf=PACHEF.arms[1];PABILL.visible=true;if(PABILL.parent!==pf){pf.add(PABILL)}PABILL.position.set(-.2,-.78,.12);PABILL.rotation.set(1.6,0,0);PABILL.scale.setScalar(.75);PACHEF.tray.visible=false;PACHEF.face('angry');camTo([.15,1.6,4.0],[.15,1.6,3.6],[.15,1.5,-.4],[.15,1.5,-.4],k,42)},
pa_fleet:(u,d,k)=>{paSea();show(PASHIP);PASHIP.position.set(lerp(-3,0,k),-.15+Math.sin(u*2)*.1,-12);PASHIP.rotation.set(0,-.35,Math.sin(u*1.6)*.03);
 for(let i=0;i<3;i++){const t=(u*1.4-i*.5);const a=cl(t/1.2);paBall(i,[PASHIP.position.x+2,1.4,-11],[8,1.0,-14],a,2.2)}puffs(PASHIP.position.x+2.2,1.5,-10.5,u,.3);window.TAG('FRANCE DEMANDS','600,000 PESOS','#ff8a8a');camTo([0,3.4,14],[0,3.4,14],[0,2.8,-12],[0,2.8,-12],0,44)},
pa_fort:(u,d,k)=>{paSea();show(PAFORT);PAFORT.position.set(0,-.2,-8);PAFORT.rotation.y=-.35;PAFORT.userData.flag.visible=true;for(let i=0;i<4;i++){const t=(u*1.3-i*.45);paBall(i,[-9,2.2,-5],[PAFORT.position.x+(i-1.5)*.9,2.0,-8],cl(t/.9),3.0)}
 const boom=cl((u*1.3-.45)/.9);if(boom>=1)puffs(PAFORT.position.x+(.5)*.9,2.4,-7,u,(.45+.9)/1.3);window.TAG('VERACRUZ','1838','#ffb84a');camTo([-.6,2.8,6.5],[-.6,2.8,6.5],[0,1.8,-8],[0,1.8,-8],0,42)},
pa_leg:(u,d,k)=>{paBeach();show(PASANTA,PALEG);PASANTA.rest();PASANTA.at(0,0,0,.25);PASANTA.face(u>.45?'shock':'smug');PASANTA.g.position.y=u>.45?Math.min(.35,(u-.45)*2):0;
 if(u>.4){const a=cl((u-.4)/.9);PALEG.visible=true;PALEG.position.set(lerp(.3,2.2,a),lerp(.9,.6,a)+Math.sin(a*Math.PI)*1.6,lerp(.2,1.4,a));PALEG.rotation.set(a*9,0,a*7)}else PALEG.visible=false;puffs(.35,.9,.2,u,.4);SHAKE=(u>.4&&u<.7)?.1:0;window.TAG('GENERAL SANTA ANNA','-1 LEG','#ff8a8a');camTo([.4,1.7,7.2],[.4,1.7,7.2],[.6,1.3,0],[.6,1.3,0],0,42)},
pa_peace:(u,d,k)=>{paBeach();show(PASANTA,PASAIL,PACOINS,PAUJ);PASAIL.rest();PASANTA.rest();PASAIL.at(-1.2,0,0,1.25);PASANTA.at(1.2,0,0,-1.25);PASAIL.arms[1].rotation.set(-1.5,0,0);PASANTA.arms[0].rotation.set(-1.5,0,0);PASAIL.face('smug');PASANTA.face('smug');
 PAUJ.visible=true;PAUJ.position.set(0,2.6,-.4);cyl(.03,.03,2.6,5,tkMetal,0,0,0,PAUJ);PACOINS.position.set(0,0,.9);PACOINS.scale.setScalar(.9);window.TAG('BRITAIN STEPS IN','MEXICO PAYS 600,000','#7ad0ff');camTo([0,1.9,8.4],[0,1.9,8.4],[0,1.2,0],[0,1.2,0],k,42)},
pa_funeral:(u,d,k)=>{paSea();ground.visible=true;ground.material.map=grassT;ground.material.needsUpdate=true;water.visible=false;sandR.visible=false;show(PACOFFIN,PASANTA,PASOLD,PASOLD2,PACAKE);PACOFFIN.position.set(0,0,.4);PACOFFIN.scale.setScalar(1.4);PACOFFIN.rotation.y=.2;PASANTA.rest();PASANTA.at(-1.5,0,.4,.6);PASANTA.arms[1].rotation.set(-2.6,0,.2);PASANTA.face('bored');
 PASOLD.rest();PASOLD.at(1.4,0,.3,-.7);PASOLD.face('bored');PASOLD.arms[0].rotation.set(-.6,0,-.2);PASOLD2.rest();PASOLD2.at(2.1,0,-.8,-.5);PASOLD2.face('bored');
 const st=box(.9,1.1,.2,M(0x9a9a92),.2,.55,-1.7);st.visible=true;
 puffs(3.2,1.2,-2,u,.2);if(k>.55){PACAKE.visible=true;PACAKE.position.set(-3.1,.5,1.3);PACAKE.rotation.set(0,0,.15);window.TAG('THE CAKES','0 MOURNERS','#ff8aa0')}else window.TAG('STATE FUNERAL','FOR ONE LEG','#7affc0');camTo([0,2.0,8.6],[0,2.0,8.6],[0,.9,0],[0,.9,0],0,46)}
};
Object.assign(SHOTS,PAS);
// cover: angry chef with a cake splat (hero) over the blurred shop
function paCoverChef(){show(PACHEF,PASPLAT);PACHEF.rest();PACHEF.at(0,0,0,0);PACHEF.face('angry');PACHEF.arms[0].rotation.set(-.5,0,-1.7);PACHEF.arms[1].rotation.set(-.5,0,1.7);PACHEF.tray.visible=false;PASPLAT.visible=true;PASPLAT.position.set(.1,1.8,.21);PASPLAT.scale.setScalar(.7)}
Object.assign(SHOTS,{pacover:(u,d,k)=>{show(PASHOP);S.background=new THREE.Color(0xf6dfa0);S.fog.color.set(0xf6dfa0);ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);HEMI.intensity=1.25;camTo([0,1.9,3.0],[0,1.9,3.0],[0,1.98,-1.3],[0,1.98,-1.3],0,40)},
 pacoverc:(u,d,k)=>{ground.visible=false;water.visible=false;sandR.visible=false;PROPS.forEach(p=>p.visible=false);clouds.forEach(c=>c.visible=false);S.background=new THREE.Color(0x00ff00);S.fog.color.set(0x00ff00);HEMI.intensity=1.25;paCoverChef();camTo([0,1.9,3.0],[0,1.9,3.0],[0,1.98,0],[0,1.98,0],0,40)}});
