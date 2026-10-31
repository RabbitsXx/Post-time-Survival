// ===== roadside night street around the skewer stall: shophouses, shutters, signs, scooters, poles, wires, and a real stall interior =====
function facadeTex(i){const c=document.createElement('canvas');c.width=256;c.height=512;const x=c.getContext('2d');const r=k=>{const v=Math.sin(i*91.7+k*12.9)*43758.5;return v-Math.floor(v)};
 const walls=['#6a5a4a','#4a5a6a','#7a6a5a','#5a4a54','#58645a','#6a4a42'];x.fillStyle=walls[i%walls.length];x.fillRect(0,0,256,512);
 for(let k=0;k<60;k++){x.fillStyle='rgba(0,0,0,.07)';x.fillRect(r(k)*256,r(k+7)*512,3+r(k+3)*20,2)}
 // upper floors: windows (some lit), balconies, AC units
 for(let f=0;f<3;f++){const y=40+f*104;x.fillStyle='rgba(0,0,0,.3)';x.fillRect(0,y+88,256,6);for(let w=0;w<2;w++){const wx=30+w*116,lit=r(f*5+w+i)>.45;x.fillStyle='#1a1a1a';x.fillRect(wx-4,y-4,88,76);x.fillStyle=lit?(r(f+w+i*3)>.5?'#f0c870':'#9ad0c0'):'#0e1620';x.fillRect(wx,y,80,68);x.fillStyle='#1a1a1a';x.fillRect(wx+38,y,4,68);x.fillRect(wx,y+30,80,3);
   x.fillStyle='#b8bcc0';if(r(f*3+w+i*7)>.55)x.fillRect(wx+20,y+72,44,16);
   x.strokeStyle='#222';x.lineWidth=3;x.beginPath();x.moveTo(wx-6,y+88);x.lineTo(wx+86,y+88);x.stroke()}}
 // ground floor: rolled shutter + lit sign band
 x.fillStyle='#8a8e92';x.fillRect(20,372,216,132);for(let y=376;y<504;y+=8){x.fillStyle='rgba(0,0,0,.25)';x.fillRect(20,y,216,2)}x.fillStyle='rgba(255,255,255,.08)';x.fillRect(20,372,216,10);
 const names=['NOODLES','PHARMACY','GOLD','MOTEL','MINI MART','TAILOR'],cols=['#c8301a','#1a8a5a','#c8a020','#7a2a9a','#1a6ac8','#c85a1a'];
 x.fillStyle=cols[i%6];x.fillRect(10,326,236,40);x.fillStyle='#fff';x.font='900 30px "Roboto Condensed",Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(names[i%6],128,347);
 // one shop open with a warm doorway
 if(i%3===1){x.fillStyle='#ffcf80';x.fillRect(60,372,136,132);x.fillStyle='#5a3a20';x.fillRect(70,430,116,74);x.fillStyle='#fff';x.font='700 18px Arial';x.fillText('OPEN',128,395)}
 const t=new THREE.CanvasTexture(c);t.minFilter=t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;return t}
function scooter(x,z,ry,col){const g=new THREE.Group();const M=c=>MC(c,.5,.3);
 const add=(m,px,py,pz)=>{m.position.set(px,py,pz);g.add(m);return m};
 add(new THREE.Mesh(new THREE.BoxGeometry(.42,.3,1.1),M(col)),0,.55,0);add(new THREE.Mesh(new THREE.BoxGeometry(.4,.1,.7),M(0x222222)),0,.76,-.2);add(new THREE.Mesh(new THREE.BoxGeometry(.5,.1,.1),M(0x222222)),0,1.05,.62);add(new THREE.Mesh(new THREE.BoxGeometry(.06,.5,.06),M(0x222222)),0,.8,.6);
 for(const zz of[-.62,.66]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.12,12),M(0x151515));w.rotation.z=Math.PI/2;add(w,0,.24,zz)}
 add(new THREE.Mesh(new THREE.BoxGeometry(.18,.12,.06),new THREE.MeshBasicMaterial({color:0xfff0c0,fog:false})),0,.9,.68);
 g.position.set(x,0,z);g.rotation.y=ry;S.add(g)}
function buildStreet(){
 const S0=KZ;
 // ground: road with lane markings, near pavement, opposite pavement, kerbs, puddles
 const road=new THREE.Mesh(new THREE.PlaneGeometry(70,11),MC(0x14171c,.2,.3));road.rotation.x=-Math.PI/2;road.position.set(KX,.004,S0+11.1);S.add(road);
 for(let i=-14;i<14;i++)bx(1.4,.01,.14,MC(0xd8d8c0,.6),KX+i*2.6,.012,S0+11.1);
 const opav=new THREE.Mesh(new THREE.PlaneGeometry(70,4.6),MC(0x3a3e44,.8));opav.rotation.x=-Math.PI/2;opav.position.set(KX,.01,S0+17.2);S.add(opav);
 bx(70,.16,.2,MC(0x6a6e72,.8),KX,.08,S0+17.9);
 for(const [px,pz,pw,pd] of [[-3.2,8.0,1.6,.8],[2.6,10.2,2.2,.9],[5.5,7.4,1.2,.6]]){const pu=new THREE.Mesh(new THREE.PlaneGeometry(pw,pd),new THREE.MeshBasicMaterial({color:0x6a7a9a,transparent:true,opacity:.35,fog:true}));pu.rotation.x=-Math.PI/2;pu.position.set(KX+px,.02,S0+pz);S.add(pu)}
 // opposite shophouses, continuous row
 for(let i=-6;i<=6;i++){const h=9+((i*7)%3+3)%3*1.2,w=5;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:facadeTex(i+9),fog:true,color:0x4a5068}));m.position.set(KX+i*w,h/2,S0+19.4);m.rotation.y=Math.PI;S.add(m);
  bx(w,.3,.5,MC(0x2a2a2e,.9),KX+i*w,h+.1,S0+19.5);bx(w-.1,.12,1.1,MC(0x3a3a40,.8),KX+i*w,3.05,S0+18.9)}
 // far dark sky blocks behind roofs
 const sky=new THREE.Mesh(new THREE.PlaneGeometry(90,30),new THREE.MeshBasicMaterial({color:0x0a1426,fog:false}));sky.position.set(KX,12,S0+30);sky.rotation.y=Math.PI;S.add(sky);
 // street poles + overhead wires
 for(const px of[-9,-1.5,6.5,13]){cyl(.1,6.6,MC(0x2a2e32,.5,.5),KX+px,3.3,S0+15.2,0,0,S,8);bx(1.6,.1,.1,MC(0x2a2e32,.5,.5),KX+px,6.2,S0+15.2);const lp=new THREE.Mesh(new THREE.BoxGeometry(.4,.08,.3),new THREE.MeshBasicMaterial({color:0xffe6b0,fog:false}));lp.position.set(KX+px,6.0,S0+14.6);S.add(lp)}
 for(let k=0;k<3;k++)for(let i=0;i<3;i++){const x0=KX-9+i*7.5,x1=x0+7.5;for(let n=0;n<8;n++){const u=n/8,u2=(n+1)/8,y0=6.1-k*.12-Math.sin(u*Math.PI)*.4,y1=6.1-k*.12-Math.sin(u2*Math.PI)*.4;const seg=bx(7.5/8+.02,.02,.02,MC(0x0a0a0a),x0+(x1-x0)*(u+u2)/2,(y0+y1)/2,S0+15.2+k*.1);seg.rotation.z=Math.atan2(y1-y0,7.5/8)}}
 // parked scooters, bins, vending machine, bus-stop sign
 scooter(KX-5.6,S0+17.6,Math.PI/2+.2,0xc8301a);scooter(KX-4.4,S0+17.9,Math.PI/2-.1,0x2a5ab8);scooter(KX+6.8,S0+17.4,Math.PI/2,0xe8c82a);scooter(KX+3.4,S0+4.1,.2,0x3a8a4a);scooter(KX-6.6,S0+3.6,-.4,0xc8c8c8);
 cyl(.3,.9,MC(0x2a5a3a,.7),KX+5.2,.45,S0+3.4,0,0,S,10);cyl(.3,.9,MC(0x2a3a5a,.7),KX+5.9,.45,S0+3.4,0,0,S,10);
 bx(.9,1.9,.8,MC(0x1a3a8a,.6),KX-8.0,.95,S0+17.7);const vm=new THREE.Mesh(new THREE.PlaneGeometry(.7,1.2),new THREE.MeshBasicMaterial({map:shelfTex(31,5),fog:false}));vm.position.set(KX-8.0,1.1,S0+17.29);vm.rotation.y=Math.PI;S.add(vm);
 cyl(.04,2.6,MC(0x666a70,.5,.5),KX+9.5,1.3,S0+16.5,0,0,S,6);const bs=new THREE.Mesh(new THREE.PlaneGeometry(.6,.6),new THREE.MeshBasicMaterial({map:signTex('BUS','#1a6ac8','#fff',128,128,50),fog:true}));bs.position.set(KX+9.5,2.5,S0+16.45);bs.rotation.y=Math.PI;S.add(bs);
 // string bulbs along stall front (warm)
 for(let i=0;i<14;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.035,6,5),new THREE.MeshBasicMaterial({color:i%3?0xffd890:0xff9a60,fog:false}));b.position.set(KX-2.2+i*.34,2.62-Math.sin(i/13*Math.PI)*.18,KZ+1.45);S.add(b)}
 // ---- stall interior: back shelves with jars, hanging utensils, gas tank, cooler, stools, sacks, hanging bulb, tin roof ----
 const WD=MC(0x5a3e24,.9),DK=MC(0x2a2018,.9);
 bx(3.6,.08,.5,WD,KX,1.5,KZ-2.3);bx(3.6,.08,.5,WD,KX,2.1,KZ-2.3);
 for(let k=0;k<14;k++){const col=[0xc8a850,0x8a3a1a,0xe0e0d0,0x3a6a3a,0xb83020][k%5];cyl(.1,.22,MC(col,.6),KX-1.6+k*.25,1.65,KZ-2.3,0,0,S,8);cyl(.09,.2,MC(col,.6),KX-1.5+k*.25,2.25,KZ-2.3,0,0,S,8)}
 bx(3.4,.04,.04,DK,KX,2.5,KZ-2.2);for(let k=0;k<6;k++){bx(.05,.4,.03,MC(0x9a9a9a,.3,.7),KX-1.4+k*.55,2.25,KZ-2.2)}
 cyl(.22,.7,MC(0xc0302a,.5,.4),KX+1.7,.35,KZ-1.8,0,0,S,12);bx(.9,.55,.55,MC(0x2a6ab0,.6),KX+.8,.28,KZ-1.8);bx(.92,.06,.57,MC(0xe8e8e8,.5),KX+.8,.58,KZ-1.8);
 for(const sx of[-.6,.3]){cyl(.16,.3,MC(0xd83a2a,.6),KX+sx,.15,KZ-1.1,0,0,S,10)}
 for(let k=0;k<3;k++)bx(.5,.4,.3,MC(0xa88a58,.9),KX-1.9+k*.1,.2+k*.4,KZ-1.8);
 const sack=bx(.55,.6,.4,MC(0xd8c8a0,.9),KX-1.7,.3,KZ-1.1);
 const tin=new THREE.Mesh(new THREE.PlaneGeometry(4.6,3.4),MC(0x5a6a72,.5,.6));tin.rotation.x=Math.PI/2+.12;tin.position.set(KX,2.78,KZ-.7);S.add(tin);
 cyl(.01,.5,MC(0x111111),KX,2.55,KZ-.3,0,0,S,4);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),new THREE.MeshBasicMaterial({color:0xfff0c0,fog:false}));bulb.position.set(KX,2.28,KZ-.3);S.add(bulb);


 // ---- stall counter dressing: sized for a ~1 m wide portrait view at the counter ----
 const cy=1.055,cz=KZ+.82;
 // steel tray of raw skewers (centre) with a price card
 bx(.46,.03,.36,MC(0xc8ccd0,.25,.85),KX+.05,cy+.015,cz);
 for(let k=0;k<10;k++){bx(.008,.008,.34,MC(0xd8b878,.7),KX-.17+k*.038,cy+.045,cz);for(let m=0;m<3;m++)bx(.03,.022,.03,MC(m%2?0xd9908a:0xe8a49c,.75),KX-.17+k*.038,cy+.06,cz-.1+m*.1)}
 const pc=new THREE.Mesh(new THREE.PlaneGeometry(.2,.08),new THREE.MeshBasicMaterial({map:signTex('PORK 10','#f4ead0','#2a1810',256,100,56),fog:false}));pc.position.set(KX+.05,cy+.1,cz+.3);pc.rotation.set(0,Math.PI,0);S.add(pc);
 // sauce bottles with labels (left of tray)
 [['CHILI',0xc8201a],['SOY',0x2a1a10],['SWEET',0xe8a020]].forEach(([n,c],i)=>{const x=KX+.36+i*.06;cyl(.022,.13,MC(c,.4),x,cy+.065,cz+.12,0,0,S,8);cyl(.01,.03,MC(0xf0f0f0,.4),x,cy+.145,cz+.12,0,0,S,6)});
 // stainless tea dispenser with tap (far left, mostly out of frame)
 cyl(.16,.34,MC(0xd8e8f0,.2,.1),KX+1.1,1.22,KZ+.78,0,0,S,14);cyl(.165,.03,MC(0x2a6ab0,.5),KX+1.1,1.4,KZ+.78,0,0,S,14);bx(.04,.04,.08,MC(0xc8201a,.4),KX+1.1,1.1,KZ+.62);
 // cash tin + bell near the customer edge
 bx(.2,.07,.14,MC(0x3a3e44,.4,.5),KX-.38,cy+.035,cz+.25);bx(.16,.01,.1,MC(0xe8e0c0,.8),KX-.38,cy+.075,cz+.25);cyl(.04,.025,MC(0xd8b030,.3,.8),KX-.2,cy+.013,cz+.3,0,0,S,10);
 // stall name board on the pillar, outside the portrait view; small hanging neon
 const ms=new THREE.Mesh(new THREE.PlaneGeometry(1.3,.42),new THREE.MeshBasicMaterial({map:signTex('MIDNIGHT SKEWERS','#2a1810','#ffd070',768,256,84),fog:false}));ms.position.set(KX+1.35,2.35,KZ+1.1);ms.rotation.y=Math.PI;S.add(ms);
 const nb=new THREE.Mesh(new THREE.PlaneGeometry(.6,.2),new THREE.MeshBasicMaterial({map:signTex('OPEN','#1a0808','#ff5a4a',256,90,64),fog:false}));nb.position.set(KX-1.35,2.1,KZ+1.1);nb.rotation.y=Math.PI;S.add(nb);
 // plastic stools + folding table on the pavement
 for(const [sx,sz] of[[-2.6,3.4],[-3.2,4.1],[3.4,3.5]]){cyl(.17,.04,MC(0xd84a2a,.6),KX+sx,.4,KZ+sz,0,0,S,10);for(const a of[0,2.1,4.2])cyl(.015,.4,MC(0xaa3a1a,.6),KX+sx+Math.cos(a)*.1,.2,KZ+sz+Math.sin(a)*.1,0,0,S,5)}
 bx(.8,.04,.6,MC(0xc8c0a8,.7),KX-2.9,.75,KZ+3.8);for(const [dx,dz] of[[-.35,-.25],[.35,-.25],[-.35,.25],[.35,.25]])bx(.04,.75,.04,MC(0x6a6a6a,.5,.5),KX-2.9+dx,.37,KZ+3.8+dz);
 // street lamp glow pool + wet reflections
 const pool=new THREE.Mesh(new THREE.PlaneGeometry(7,5),new THREE.MeshBasicMaterial({map:ctex(128,96,(x,w,h)=>{const g=x.createRadialGradient(w/2,h/2,2,w/2,h/2,w/2);g.addColorStop(0,'rgba(255,230,170,.5)');g.addColorStop(1,'rgba(255,230,170,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}),transparent:true,depthWrite:false,fog:false}));pool.rotation.x=-Math.PI/2;pool.position.set(KX+1,.03,S0+9.5);S.add(pool);
 // lights (street warm / cold, shop bulb)
 const mk=(c,i,d,x,y,z)=>{const L=new THREE.PointLight(c,i,d,2);L.position.set(x,y,z);S.add(L);LIGHTS.push([x,y,z,c,i,d])};

 // ---- control panel on the stall's side wall: CCTV monitor + big red CLOSE button (the player turns to use these) ----
 const px=KX+2.12,pz=KZ+.2;bx(.08,.72,.78,MC(0x2a2e34,.5,.4),px+.04,1.4,pz);
 const cctv=ctex(256,192,(x,w,h)=>{x.fillStyle='#0a1a12';x.fillRect(0,0,w,h);x.fillStyle='#14301f';x.fillRect(6,22,w-12,h-60);for(let i=0;i<40;i++){x.fillStyle='rgba(120,255,160,.05)';x.fillRect(0,i*5,w,1)}
  x.fillStyle='#7aff9a';x.font='700 16px "Roboto Condensed",monospace';x.textAlign='left';x.fillText('CAM 01 · STALL FRONT',10,18);x.fillText('REC',w-44,18);x.fillStyle='#e83a2a';x.beginPath();x.arc(w-54,13,4,0,7);x.fill();
  const fig=(cx,col)=>{x.fillStyle=col;x.beginPath();x.moveTo(cx-10,150);x.lineTo(cx+10,150);x.lineTo(cx+16,112);x.lineTo(cx-16,112);x.fill();x.fillStyle='#d8b898';x.fillRect(cx-6,92,12,16);x.fillStyle='#3a2418';x.fillRect(cx-7,88,14,8)};fig(70,'#c4552a');fig(186,'#c4552a');
  x.fillStyle='#7aff9a';x.font='700 15px "Roboto Condensed",monospace';x.fillText('02:14',46,84);x.fillText('02:19',162,84);x.font='700 13px "Roboto Condensed",monospace';x.fillText('LEFT',50,168);x.fillText('ENTERS',156,168)});
 const mon=new THREE.Mesh(new THREE.PlaneGeometry(.64,.48),new THREE.MeshBasicMaterial({map:cctv,fog:false}));mon.position.set(px-.001,1.52,pz);mon.rotation.y=-Math.PI/2;S.add(mon);
 const btn=new THREE.Mesh(new THREE.CylinderGeometry(.075,.085,.05,16),MC(0xc8201a,.35,.1));btn.rotation.z=Math.PI/2;btn.position.set(px-.04,1.16,pz);S.add(btn);
 const bl=new THREE.Mesh(new THREE.PlaneGeometry(.3,.09),new THREE.MeshBasicMaterial({map:signTex('CLOSE','#16181c','#ffffff',256,80,54),fog:false}));bl.position.set(px-.001,1.05,pz);bl.rotation.y=-Math.PI/2;S.add(bl);
 mk(0x7aff9a,6,2.5,px-.5,1.5,pz);
 mk(0xffe0b0,30,12,KX-1.5,5.9,S0+14.6);mk(0xffe0b0,30,12,KX+6.5,5.9,S0+14.6);mk(0xffd8a0,22,9,KX,2.2,S0+3.0);mk(0xffc880,20,8,KX+2.5,2.3,S0+2.0);
}
