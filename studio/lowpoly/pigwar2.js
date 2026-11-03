// The Pig War v2: faster cutting, POV / top-down / low-angle shots, Poly plays the farmer.  (loaded after sharks.js)
const POLYF=person({coat:'#2f8070',shortSleeve:1,pants:'#2d5f9a',hat:'straw',stubble:1,skin:'#e8b894',gun:true,hair:'#4a3020'});
const ARRT=ctex(64,80,(x,w,h)=>{x.fillStyle='#f6f1d8';x.fillRect(0,0,w,h);x.strokeStyle='#8a8a70';x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);x.fillStyle='#c4202a';x.font='bold 17px RC,Arial';x.textAlign='center';x.fillText('WARRANT',w/2,26);x.font='bold 21px RC,Arial';x.fillText('ARREST',w/2,52);x.fillRect(10,60,44,3)});
const ARRM=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.9),new THREE.MeshBasicMaterial({map:ARRT,side:THREE.DoubleSide}));S.add(ARRM);ACT.push(ARRM);
const MAPU=[...Array(14)].map((_,i)=>{const m=box(.9,.5,.9,M(i<6?0x1f3a8a:(i<11?0xc4202a:0x6b3f1e)));S.add(m);ACT.push(m);return m});
const MAPPIG=box(1.2,.6,1.2,M(0xf5a3b8));S.add(MAPPIG);ACT.push(MAPPIG);
const FA={x:3.8,z:3.2,ry:-2.27};
function farmerPose(){POLYF.rest();POLYF.at(FA.x,0,FA.z,FA.ry);POLYF.gun.visible=true}
const PW={
pw_chew:(u,d,k)=>SHOTS.munch(u,d,k),
pw_aim:(u,d,k)=>{showGarden();show(POLYF,pig);pig.at(.5,.5,.4);pig.state('pigalive');pig.head.rotation.x=.4+Math.sin(u*10)*.3;farmerPose();POLYF.face('angry');POLYF.arms[0].rotation.x=-1.4;POLYF.arms[1].rotation.x=-1.5;camTo([2.4,.5,1.7],[3.3,.95,2.6],[3.8,1.8,3.2],[3.8,1.8,3.2],k,34)},
pw_bang:(u,d,k)=>{const tb=.22;showGarden();show(POLYF,pig);farmerPose();POLYF.face(u>tb+.1?'shock':'angry');const a=cl((u-tb)/.55),rc=u>tb?Math.max(0,1-(u-tb)/.4)*.35:0;POLYF.arms[0].rotation.x=-1.4+rc;POLYF.arms[1].rotation.x=-1.5+rc;pig.state(u>tb?'pigdead':'pigalive');pig.at(.5,.5,.4);pig.head.rotation.x=.4+Math.sin(u*10)*.3*(u>tb?0:1);
 if(u>tb){pig.root.position.y=.55+Math.sin(Math.PI*a)*1.5;pig.root.rotation.z=Math.PI*a;pig.legs.forEach((l,i)=>l.rotation.x=Math.sin(u*14+i)*.5*(1-a));pig.head.rotation.x=0}
 FLASH=u>tb?Math.max(0,1-(u-tb)/.1):0;SHAKE=u>tb&&u<tb+.3?.25*(1-(u-tb)/.3):0;if(u>tb)puffs(FA.x-.77*1.5,1.5,FA.z-.64*1.5,u,tb);camTo([2,1.9,11.5],[2.4,1.8,10.5],[2.3,.9,1.8],[2.3,.9,1.8],k,55)},
pw_pov:(u,d,k)=>{showGarden();show(POLYF);farmerPose();POLYF.face('angry');POLYF.arms[0].rotation.x=-1.4;POLYF.arms[1].rotation.x=-1.5;const bob=Math.sin(u*14)*.05;const t=ease(k);const tilt=ease(cl((k-.62)/.3));
 cabbages[10+Math.floor(k*4)].visible=false;cam.position.set(lerp(-3.4,2.2,t),.5+bob,-.4);cam.fov=62;cam.updateProjectionMatrix();cam.lookAt(lerp(6,3.8,tilt),lerp(.55,1.8,tilt),lerp(-.4,3.2,tilt))},
pw_flag:(u,d,k)=>SHOTS.pigflag(u,d,k),
pw_officer:(u,d,k)=>{show(OFF);OFF.rest();OFF.at(0,0,0,0);OFF.face('angry');OFF.head.rotation.set(.12*Math.sin(u*14),.08*Math.sin(u*9),0);OFF.arms[0].rotation.set(-1.0,0,0);camTo([0,2.0,1.9],[0,1.95,1.15],[0,1.85,0],[0,1.85,0],k,34)},
pw_slam:(u,d,k)=>{show(tableG);tableG.position.set(0,0,0);pap.visible=true;mark.visible=false;stamp.visible=false;const tH=.38;const a=cl(u/tH);ARRM.visible=true;ARRM.position.set(.1,lerp(3.2,1.12,a*a),.1);ARRM.rotation.set(-Math.PI/2+(1-a)*.5,0,(1-a)*.8);if(u>tH){SHAKE=Math.max(0,.3*(1-(u-tH)/.25));FLASH=Math.max(0,.6-(u-tH)/.1)}camTo([.1,5.4,2.4],[.1,5.0,2.1],[.1,1.1,.1],[.1,1.1,.1],k,40)},
pw_gulp:(u,d,k)=>{show(POLYF,OFF);POLYF.rest();POLYF.gun.visible=false;POLYF.at(0,0,0,0);POLYF.face('sweat');POLYF.head.rotation.x=.1+Math.sin(u*18)*.03;OFF.rest();OFF.at(1.1,0,.6,-1.2);OFF.face('angry');OFF.arms[0].rotation.x=-1.5;sweatDrops(POLYF,u);camTo([.2,1.95,2.4],[.1,1.9,1.5],[0,1.85,0],[0,1.85,0],k,34)},
pw_boots:(u,d,k)=>{for(let i=0;i<3;i++){const P=US[i];show(P);P.rest();P.at((i-1)*.9,0,lerp(-7,.2,k)-i*.25,0);P.face('neutral');P.walk(u,6,.5);P.gun.visible=true}camTo([0,.2,3.2],[0,.2,2.3],[0,.55,0],[0,.55,0],k,48)},
pw_marchwide:(u,d,k)=>SHOTS.flagplant(u,d,k),
pw_bow:(u,d,k)=>{const s=SH[0];s.visible=true;s.position.set(lerp(2,-1,k),-.1+Math.sin(u*3)*.12,lerp(-44,-30,k));s.rotation.set(0,0,Math.sin(u*2)*.05);waveFlag(s.userData.flag,u);CAPT.g.visible=false;camTo([0,.1,-20],[0,.4,-21],[0,2.2,-35],[0,2.4,-35],k,60)},
pw_captain:(u,d,k)=>SHOTS.cannon(u,d,k),
pw_map:(u,d,k)=>{MAPPIG.visible=true;MAPPIG.position.set(0,.5,0);MAPPIG.scale.setScalar(1.6);const e=ease(k);for(let i=0;i<14;i++){const m=MAPU[i];m.visible=true;m.scale.setScalar(1.8);let sx,sz,tx,tz;if(i<6){sx=-12;sz=-9+i*3.2;tx=-3.2;tz=-3+i*1.2}else if(i<11){sx=12;sz=-9+(i-6)*4;tx=3.2;tz=-3+(i-6)*1.5}else{sx=-9+(i-11)*6;sz=-19;tx=-2+(i-11)*2.2;tz=-6}m.position.set(lerp(sx,tx,e),.6,lerp(sz,tz,e))}sign(0,2,-16,'SAN JUAN ISLAND','1859',null,.034);camTo([0,45,14],[0,40,12],[0,0,0],[0,0,0],0,50)},
pw_standoff:(u,d,k)=>SHOTS.standoff(u,d,k),
pw_pigcu:(u,d,k)=>SHOTS.pigcu(u,d,k),
pw_glare:(u,d,k)=>SHOTS.glare(u,d,k),
pw_peace:(u,d,k)=>SHOTS.peace(u,d,k),
pw_years:(u,d,k)=>SHOTS.years(u,d,k),
pw_kaiser:(u,d,k)=>SHOTS.kaiser(u,d,k),
pw_grave:(u,d,k)=>SHOTS.grave(u,d,k),
pw_ghost:(u,d,k)=>{SHOTS.ghost(u,d,k);show(POLYF);POLYF.rest();POLYF.gun.visible=false;POLYF.at(-.55,0,2.0,.3);POLYF.face(k<.45?'shock':'neutral');POLYF.head.rotation.set(-.35,0,0);}
};
Object.assign(SHOTS,PW);
