// Depth props for the historical island (Pig War). Everything goes into PROPS so the other biomes (outback/beach/sea) hide it.
function PR(m){S.add(m);PROPS.push(m);return m}
const gm=c=>M(c);
// distant hills and a snowy range beyond the water: gives the horizon layers
for(let i=0;i<18;i++){const a=i/18*Math.PI*2+rn(i)*.3,r=88+rn(i+5)*30;const h=10+rn(i+9)*18,rad=16+rn(i+13)*16;const c=[0x3f7a4a,0x4a8a58,0x5a8a7a,0x6a8aa0][i%4];const m=cone(rad,h,7,gm(c),Math.cos(a)*r,h/2-.4,Math.sin(a)*r);PR(m)}
for(let i=0;i<6;i++){const x=-110+i*44+rn(i)*12,z=-128-rn(i+3)*14,h=22+rn(i+7)*12;PR(cone(17,h,6,gm(0x8a9ab0),x,h/2-.4,z));PR(cone(6.4,h*.3,6,gm(0xf4f8ff),x,h*.85-.4,z))}
// bushes / rocks / grass tufts / flowers scattered in rings (never inside the garden or the 3 stage areas)
const free=(x,z)=>!(Math.abs(x)<4.6&&Math.abs(z)<3.6)&&!(Math.abs(x)<4.5&&z<-12&&z>-28);
for(let i=0;i<46;i++){const a=rn(i*3)*6.283,r=7+rn(i*3+1)*18,x=Math.cos(a)*r,z=Math.sin(a)*r;if(!free(x,z))continue;const s=.45+rn(i*3+2)*.6;const b=new THREE.Mesh(new THREE.IcosahedronGeometry(s,0),gm([0x2f8a3a,0x3a9a44,0x277a34][i%3]));b.position.set(x,s*.6,z);b.scale.y=.8;PR(b)}
for(let i=0;i<16;i++){const a=rn(i*5+50)*6.283,r=6+rn(i*5+51)*20,x=Math.cos(a)*r,z=Math.sin(a)*r;if(!free(x,z))continue;const s=.4+rn(i+60)*.8;const rk=new THREE.Mesh(new THREE.IcosahedronGeometry(s,0),gm(i%2?0x8a8a8e:0x76767c));rk.position.set(x,s*.45,z);rk.scale.set(1,.7,.9);rk.rotation.y=i;PR(rk)}
for(let i=0;i<150;i++){const a=rn(i*7+100)*6.283,r=2.5+rn(i*7+101)*24,x=Math.cos(a)*r,z=Math.sin(a)*r;if(!free(x,z))continue;const g=new THREE.Group();for(let j=0;j<3;j++){const c=cone(.07,.35+rn(i+j)*.3,4,gm([0x3f9a40,0x57b048,0x2f8a38][j]),(j-1)*.1,.2,(rn(i*j)-.5)*.1,g);c.rotation.z=(j-1)*.15}g.position.set(x,0,z);PR(g)}
for(let k=0;k<7;k++){const cx=[-6,-4,-11,8,12,-14,5][k],cz=[-4.5,-3,-6,-8,2,-5,6][k];for(let j=0;j<7;j++){const fl=box(.12,.12,.12,new THREE.MeshBasicMaterial({color:[0xff4a6a,0xffe040,0xffffff,0xff9ad0][j%4]}),cx+(rn(k*9+j)-.5)*1.6,.28,cz+(rn(k*9+j+3)-.5)*1.6);PR(fl);PR(cone(.03,.25,3,gm(0x3a9a40),fl.position.x,.12,fl.position.z))}}
// dirt path cabin -> garden
for(let i=0;i<9;i++){const d=new THREE.Mesh(new THREE.CircleGeometry(.95+rn(i)*.3,7),new THREE.MeshLambertMaterial({color:0x8a6a44}));d.rotation.x=-Math.PI/2;d.position.set(-7.5+i*.55+rn(i+4)*.4,.015,-6+i*.42);PR(d)}
// cabin yard: barrels, crates, haystack, fence, wagon
function barrel(x,z){const g=new THREE.Group();cyl(.34,.34,.8,10,gm(0x8a5a30),0,.4,0,g);for(const y of[.2,.6])cyl(.355,.355,.06,10,gm(0x3a3a40),0,y,0,g);g.position.set(x,0,z);PR(g)}
barrel(-6.6,-5.2);barrel(-6.0,-5.9);barrel(-6.9,-6.2);
function crate(x,y,z,s,r){const c=box(s,s,s,gm(0xb88a50),x,y+s/2,z);c.rotation.y=r;PR(c);const e=box(s*1.02,.06,s*1.02,gm(0x7a5a30),x,y+s/2,z);e.rotation.y=r;PR(e)}
crate(-5.0,0,-6.4,.7,.2);crate(-4.5,0,-5.6,.6,-.3);crate(-4.9,.7,-6.3,.5,.5);
const hay=new THREE.Group();cyl(.9,1.0,1.2,9,gm(0xd8b850),0,.6,0,hay);cone(1.0,1.0,9,gm(0xd8b850),0,1.7,0,hay);hay.position.set(-11.5,0,-3.2);PR(hay);
const hay2=hay.clone();hay2.position.set(-12.8,0,-1.8);hay2.scale.setScalar(.8);PR(hay2);
for(let i=0;i<9;i++){PR(box(.12,.9,.12,gm(0xa5703a),-13+i*.8,.45,-10.6));}PR(box(7,.08,.07,gm(0xa5703a),-9.6,.78,-10.6));PR(box(7,.08,.07,gm(0xa5703a),-9.6,.42,-10.6));
const wagon=new THREE.Group();box(2.4,.3,1.2,gm(0x8a5a30),0,.7,0,wagon);for(const sx of[-1,1]){box(2.4,.5,.08,gm(0x9a6a38),0,1.0,sx*.6,wagon);for(const sz of[-1,1]){const w=cyl(.45,.45,.1,10,gm(0x5a3a20),sx*.85,.45,sz*.65,wagon);w.rotation.x=Math.PI/2}}box(1.6,.06,.1,gm(0x6a4a28),1.9,.6,0,wagon);wagon.position.set(6.5,0,-8);wagon.rotation.y=.6;PR(wagon);
// windmill (animated)
const mill=new THREE.Group();cyl(1.1,1.7,5.5,8,gm(0xe8e0d0),0,2.75,0,mill);cone(1.6,1.6,8,gm(0xa23a2a),0,6.3,0,mill);box(.6,1.0,.1,gm(0x5a3a20),0,.5,1.62,mill);const blades=new THREE.Group();blades.position.set(0,5.4,1.9);mill.add(blades);for(let i=0;i<4;i++){const b=box(.4,3.2,.08,gm(0xf4eee0),0,1.6,0);const bg=new THREE.Group();bg.rotation.z=i*Math.PI/2;bg.add(b);blades.add(bg)}mill.position.set(13,0,-13);mill.rotation.y=-.5;PR(mill);ANIMS.push(t=>{blades.rotation.z=t*.9});
// dock + rowboat + lantern (beyond the sand ring)
const dock=new THREE.Group();for(let i=0;i<9;i++)box(2.2,.12,.7,gm(0x8a6a44),0,.05,-i*.72,dock);for(const sx of[-1,1])for(let i=0;i<4;i++)cyl(.1,.1,1.2,6,gm(0x5a3a20),sx*1.05,-.3,-i*1.8,dock);cyl(.05,.05,1.6,5,gm(0x4a3a2a),1.0,.9,-6.2,dock);const lamp=box(.2,.28,.2,new THREE.MeshBasicMaterial({color:0xffd070}),1.0,1.8,-6.2,dock);dock.add(lamp);dock.position.set(4.5,0,-27.5);PR(dock);
const boat=new THREE.Group();box(1.1,.35,2.4,gm(0x9a5a2a),0,.15,0,boat);const bw=cone(.55,1.1,4,gm(0x9a5a2a),0,.15,1.7,boat);bw.rotation.x=Math.PI/2;bw.rotation.y=Math.PI/4;bw.scale.set(1,1,.7);box(.9,.05,.4,gm(0x5a3a20),0,.38,.2,boat);boat.position.set(6.4,-.2,-31.5);PR(boat);ANIMS.push(t=>{boat.position.y=-.2+Math.sin(t*1.7)*.05;boat.rotation.z=Math.sin(t*1.3)*.05});
// chimney smoke (animated)
const smk=[...Array(6)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.3,0),new THREE.MeshBasicMaterial({color:0xe8e8e8,transparent:true,opacity:.6}));PR(m);return m});
ANIMS.push(t=>smk.forEach((m,i)=>{const a=(t*.35+i/6)%1;m.position.set(-8.06+a*1.4,3.6+a*3.2,-9.2+a*.4);m.scale.setScalar(.5+a*1.6);m.material.opacity=.6*(1-a)}));
// camp fires with flicker (US camp west, British camp east)
function campfire(x,z){const g=new THREE.Group();for(let i=0;i<5;i++){const l=cyl(.08,.08,.8,5,gm(0x5a3a20),0,.1,0,g);l.rotation.z=Math.PI/2.2;l.rotation.y=i*1.26}const fl=cone(.28,.8,5,new THREE.MeshBasicMaterial({color:0xff9a2a}),0,.5,0,g);const fl2=cone(.16,.5,5,new THREE.MeshBasicMaterial({color:0xffe070}),0,.45,0,g);g.position.set(x,0,z);PR(g);ANIMS.push(t=>{const f=1+Math.sin(t*17+x)*.18+Math.sin(t*29)*.1;fl.scale.set(1,f,1);fl2.scale.set(1,1+Math.sin(t*23)*.25,1)})}
campfire(-13.5,2.2);campfire(13.5,1.2);
// seagulls circling
const gulls=[...Array(4)].map((_,i)=>{const g=new THREE.Group();const b=box(.35,.12,.12,new THREE.MeshBasicMaterial({color:0xffffff}),0,0,0,g);const wl=box(.5,.04,.2,new THREE.MeshBasicMaterial({color:0xf0f0f0}),-.4,0,0,g),wr=box(.5,.04,.2,new THREE.MeshBasicMaterial({color:0xf0f0f0}),.4,0,0,g);g.userData={wl,wr,i};PR(g);return g});
ANIMS.push(t=>gulls.forEach(g=>{const i=g.userData.i,a=t*(.25+i*.04)+i*1.7,r=12+i*4;g.position.set(Math.cos(a)*r,9+i*1.2+Math.sin(t+i)*.4,Math.sin(a)*r-6);g.rotation.y=-a;const fl=Math.sin(t*8+i)*.5;g.userData.wl.rotation.z=fl;g.userData.wr.rotation.z=-fl}));
