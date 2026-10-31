// ===== 24H MART night shift: fluorescent aisles, shelves, light-box poster, checkout counter (first-person at the till) =====
const MX=200,MZ=-60;
function buildMart(){
 const W0=14,Z0=MZ-2.6,Z1=MZ+16,CH=3.3,LEN=Z1-Z0,CZ=(Z0+Z1)/2;
 const tile=MS(TX.tile.clone(),.3,0xa8aeb8,{metalness:.05});tile.map.repeat.set(9,11);tile.map.needsUpdate=true;
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(W0,LEN),tile);fl.rotation.x=-Math.PI/2;fl.position.set(MX,0,CZ);S.add(fl);
 const wallM=MS(TX.wall,.9,0xf0c868);
 bx(.2,CH,LEN,wallM,MX-W0/2,CH/2,CZ);bx(.2,CH,LEN,wallM,MX+W0/2,CH/2,CZ);bx(W0,CH,.2,wallM,MX,CH/2,Z0);
 const ce=new THREE.Mesh(new THREE.PlaneGeometry(W0,LEN),MS(TX.ceil,.9));ce.rotation.x=Math.PI/2;ce.position.set(MX,CH,CZ);S.add(ce);
 // fluorescent tubes + housings
 for(let iz=0;iz<6;iz++)for(const ix of[-3.4,0,3.4]){const z=MZ+iz*3;bx(.34,.06,2.2,MC(0x555a5e,.6),MX+ix,CH-.04,z);const t=new THREE.Mesh(new THREE.BoxGeometry(.2,.05,2.0),new THREE.MeshBasicMaterial({color:0xfaffee,fog:false}));t.position.set(MX+ix,CH-.09,z);S.add(t)}
 // ducts + pipes
 bx(.7,.35,LEN,MC(0x9aa0a4,.6),MX-2.0,CH-.3,CZ);bx(.3,.3,LEN,MC(0x8a9094,.6),MX+1.7,CH-.28,CZ);
 // long gondolas down the middle aisle, product faces on the aisle side
 const steel=MC(0x24282e,.6,.3);
 for(const sd of[-1,1]){const gx=MX+sd*2.6;bx(.9,1.9,9.8,steel,gx,.95,MZ+9.7);bx(.94,.08,9.8,MC(0x2a2e34,.6),gx,1.94,MZ+9.7);
  for(let k=0;k<3;k++){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.15,1.75),new THREE.MeshBasicMaterial({map:shelfTex(k*17+(sd>0?5:0),5),fog:true}));m.position.set(gx-sd*.46,1.0,MZ+6.0+k*3.3);m.rotation.y=-sd*Math.PI/2;S.add(m)}
  const kk=bx(.9,1.0,.9,MC(0xe8742a,.8),gx,.5,MZ+4.2)}
 // wall shelving (far sides) + freezer doors on the right wall
 for(let k=0;k<4;k++){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.4,1.9),new THREE.MeshBasicMaterial({map:shelfTex(40+k*9,5),fog:true}));m.position.set(MX-W0/2+.12,1.05,MZ+4+k*3.6);m.rotation.y=Math.PI/2;S.add(m);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(3.4,1.9),new THREE.MeshBasicMaterial({map:shelfTex(70+k*5,4),fog:true}));f.position.set(MX+W0/2-.12,1.05,MZ+4+k*3.6);f.rotation.y=-Math.PI/2;S.add(f);
  const g=new THREE.Mesh(new THREE.PlaneGeometry(3.4,1.9),new THREE.MeshBasicMaterial({color:0xcfefff,transparent:true,opacity:.14,fog:true}));g.position.set(MX+W0/2-.14,1.05,MZ+4+k*3.6);g.rotation.y=-Math.PI/2;S.add(g)}
 // pillar with an end-of-season light box + magazine rack (like the reference)
 bx(.8,CH,.8,MC(0xc8b080,.9),MX-2.4,CH/2,MZ+3.9);
 const lb=ctex(256,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#ff9a2a');g.addColorStop(1,'#e8341a');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#fff3c8';x.textAlign='center';x.font='900 60px "Roboto Condensed",Arial';x.fillText('END OF',w/2,120);x.fillText('SEASON',w/2,185);x.font='900 110px "Roboto Condensed",Arial';x.fillText('SALE',w/2,290);x.font='900 30px "Roboto Condensed",Arial';x.fillText('UP TO 60% OFF',w/2,345)});
 const lbm=new THREE.Mesh(new THREE.PlaneGeometry(.95,1.4),new THREE.MeshBasicMaterial({map:lb,fog:false}));lbm.position.set(MX-2.4,1.7,MZ+3.48);lbm.rotation.y=Math.PI;S.add(lbm);
 bx(1.1,1.5,.08,MC(0x1a1a1a,.5),MX-2.4,1.7,MZ+3.45);
 bx(.9,1.4,.5,MC(0x3a4a6a,.6),MX+2.2,.7,MZ+3.8);const mag=new THREE.Mesh(new THREE.PlaneGeometry(.8,1.2),new THREE.MeshBasicMaterial({map:shelfTex(3,4),fog:true}));mag.position.set(MX+2.2,.8,MZ+3.54);mag.rotation.y=Math.PI;S.add(mag);
 // hanging MEGA SALE signs over the aisle
 for(let k=0;k<3;k++){const t=ctex(256,320,(x,w,h)=>{x.fillStyle='#f2c230';x.fillRect(0,0,w,h);x.fillStyle='#c8201a';x.fillRect(10,10,w-20,h-20);x.fillStyle='#fff';x.textAlign='center';x.font='900 40px "Roboto Condensed",Arial';x.fillText('ONE DAY',w/2,70);x.fillStyle='#f2c230';x.font='900 84px "Roboto Condensed",Arial';x.fillText('MEGA',w/2,170);x.fillText('SALE',w/2,250);x.fillStyle='#fff';x.font='900 26px "Roboto Condensed",Arial';x.fillText('UP TO 60% OFF',w/2,298)});
  for(const f of[0,Math.PI]){const m=new THREE.Mesh(new THREE.PlaneGeometry(.85,1.05),new THREE.MeshBasicMaterial({map:t,fog:true}));m.position.set(MX,2.55,MZ+6+k*3.6+(f?.02:0));m.rotation.y=f;S.add(m)}cyl(.01,.8,MC(0x222222),MX,3.0,MZ+6+k*3.6,0,0,S,4)}
 // WELCOME banner + glass door with night street at the far end
 const wl=new THREE.Mesh(new THREE.PlaneGeometry(3.4,.5),new THREE.MeshBasicMaterial({map:signTex('WELCOME','#c8201a','#ffffff',512,80,56),fog:false}));wl.position.set(MX,2.8,Z1-.15);wl.rotation.y=Math.PI;S.add(wl);
 const night=new THREE.Mesh(new THREE.PlaneGeometry(W0,CH),new THREE.MeshBasicMaterial({map:ctex(256,128,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1020');g.addColorStop(1,'#1c2a44');x.fillStyle=g;x.fillRect(0,0,w,h);for(let i=0;i<30;i++){x.fillStyle=i%3?'#ffd890':'#9ad0ff';x.fillRect((i*37)%w,50+((i*53)%60),2,2)}x.fillStyle='#e83a2a';x.fillRect(180,60,40,6)}),fog:false}));night.position.set(MX,CH/2,Z1);night.rotation.y=Math.PI;S.add(night);
 bx(.08,CH,.08,MC(0x888e94,.4,.5),MX-1.3,CH/2,Z1-.1);bx(.08,CH,.08,MC(0x888e94,.4,.5),MX+1.3,CH/2,Z1-.1);bx(2.6,.08,.08,MC(0x888e94,.4,.5),MX,CH-.1,Z1-.1);
 // checkout counter (we stand behind it)
 const cm=MC(0x3a4658,.7),ct=MC(0xdadcd8,.4,.2);
 bx(5.4,1.0,.55,cm,MX,.5,MZ+1.0);bx(5.6,.07,.9,ct,MX,1.02,MZ+1.0);bx(5.4,.12,.56,MC(0xe8302a,.6),MX,.9,MZ+1.0);
 bx(.5,.03,.5,MC(0x2a2e34,.4),MX+.5,1.07,MZ+.8);bx(.5,.28,.06,MC(0x1a1e24,.4),MX+.5,1.24,MZ+1.0);const scr=new THREE.Mesh(new THREE.PlaneGeometry(.4,.2),new THREE.MeshBasicMaterial({color:0x6aff9a,fog:false}));scr.position.set(MX+.5,1.26,MZ+.965);scr.rotation.y=Math.PI;S.add(scr);
 bx(.9,.04,.5,MC(0x16181c,.6),MX-.1,1.06,MZ+1.1);bx(.28,.18,.06,MC(0xe8e8e0,.4),MX+1.9,1.15,MZ+1.1);
 // candy rack at the front edge
 bx(.6,.55,.14,MC(0x2a2e34,.7),MX-2.3,1.3,MZ+1.35);const cn=new THREE.Mesh(new THREE.PlaneGeometry(.55,.5),new THREE.MeshBasicMaterial({map:shelfTex(9,3),fog:true}));cn.position.set(MX-2.3,1.3,MZ+1.27);cn.rotation.y=Math.PI;S.add(cn);
 // hot-dog roller grill (left on the counter)
 const gx=MX-1.4,gz=MZ+.65;bx(1.1,.14,.55,MC(0x8a9094,.3,.7),gx,1.12,gz);
 for(let i=0;i<5;i++){cyl(.035,.9,MC(0xb0b4b8,.25,.8),gx,1.22,gz-.2+i*.1,0,Math.PI/2,S,8);const h=cyl(.04,.7,MC(i%2?0xc8382a:0xd8603a,.6),gx+(i%3-1)*.05,1.265,gz-.2+i*.1,0,Math.PI/2,S,8)}
 const gg=new THREE.Mesh(new THREE.BoxGeometry(1.0,.34,.55),new THREE.MeshBasicMaterial({color:0xffd8a0,transparent:true,opacity:.12,fog:false}));gg.position.set(gx,1.38,gz);S.add(gg);
 const hl=new THREE.Mesh(new THREE.BoxGeometry(1.0,.04,.12),new THREE.MeshBasicMaterial({color:0xff8a30,fog:false}));hl.position.set(gx,1.52,gz-.1);S.add(hl);
 bx(.5,.02,.3,MC(0xe0e0dc,.5),gx+.6,1.07,gz+.15);for(let i=0;i<3;i++)bx(.14,.05,.05,MC(0xe8c888,.9),gx+.45+i*.12,1.1,gz+.15);
 // soda fountain (right on the counter)
 const fx=MX+1.5,fz=MZ+.75;bx(.55,.7,.4,MC(0xc8201a,.5),fx,1.4,fz);bx(.5,.18,.36,MC(0x2a2e34,.5),fx,1.2,fz);for(const s of[-.12,.12])cyl(.018,.12,MC(0xaaaaaa,.3,.8),fx+s,1.24,fz-.2,0,0,S,6);
 const lg=new THREE.Mesh(new THREE.PlaneGeometry(.45,.2),new THREE.MeshBasicMaterial({map:signTex('COLA','#2a1010','#ff5a4a',128,56,36),fog:false}));lg.position.set(fx,1.62,fz+.205);lg.rotation.y=Math.PI;S.add(lg);
 for(let i=0;i<3;i++)cyl(.045,.12,MC(0xf4f0e8,.7),fx+.45,1.12+i*.1,fz+.15,0,0,S,8);
 // behind the till: tobacco shelf + wall clock + security mirror
 bx(4.0,2.0,.3,MC(0x2a2e34,.7),MX,1.4,Z0+.3);const bs=new THREE.Mesh(new THREE.PlaneGeometry(3.8,1.7),new THREE.MeshBasicMaterial({map:shelfTex(21,5),fog:true}));bs.position.set(MX,1.4,Z0+.47);S.add(bs);
 const dm=new THREE.Mesh(new THREE.SphereGeometry(.28,10,6,0,Math.PI*2,0,Math.PI/2),MC(0x2a3a4a,.1,.9));dm.rotation.x=Math.PI;dm.position.set(MX+3,CH-.1,MZ+5);S.add(dm);
 // mop bucket + wet sign for atmosphere
 cyl(.18,.34,MC(0xe8c820,.6),MX+2.9,.17,MZ+2.2,0,0,S,8);const ws=signTex('WET FLOOR','#f2c230','#1a1a1a',256,320,52);for(const sz of[-1,1]){const p=new THREE.Mesh(new THREE.PlaneGeometry(.34,.58),new THREE.MeshBasicMaterial({map:ws,fog:true,side:THREE.DoubleSide}));p.position.set(MX-2.0,.3,MZ+4.6+sz*.12);p.rotation.x=-sz*.22;S.add(p)}
 // lights (white-green fluorescent, warm hotdog glow, red soda glow, cold from the door)
 const mk=(c,i,d,x,y,z)=>{const L=new THREE.PointLight(c,i,d,2);L.position.set(x,y,z);S.add(L);LIGHTS.push([x,y,z,c,i,d])};
 mk(0xf4ffe8,22,10,MX,CH-.4,MZ+.2);mk(0xf4ffe8,22,10,MX,CH-.4,MZ+3.2);mk(0xf4ffe8,26,11,MX,CH-.4,MZ+6.4);mk(0xf4ffe8,22,11,MX,CH-.4,MZ+10);mk(0xf4ffe8,20,10,MX,CH-.4,MZ+13);
 mk(0xff9a40,9,3.5,gx,1.5,gz);mk(0xff5a4a,6,3,fx,1.5,fz);mk(0xffb060,16,6,MX-2.4,1.7,MZ+3.2);
}
