// ===== FRESHWAY set dressing: real-looking shelves with facings & price tags, carts, baskets, checkout, freezers, ceiling clutter, wear, apocalypse dressing =====
function ctex(w,h,draw,rep){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.anisotropy=1;return t}
const PAL=['#d8342c','#f0b82a','#2a9a4a','#2a6ad0','#e86c24','#7a3aa8','#f2efe4','#e0508a','#2ab8a8','#8a5a32','#1a1a1e'];
const CATS=[
 {name:'CEREAL · BREAKFAST',col:'#d8802a'},{name:'CANNED GOODS',col:'#b83a2a'},{name:'SNACKS · CHIPS',col:'#d8b020'},{name:'DRINKS · SODA',col:'#2a6ad0'},
 {name:'PASTA · RICE',col:'#8a5a32'},{name:'BAKING · SUGAR',col:'#c04a8a'},{name:'COFFEE · TEA',col:'#5a3a22'},{name:'CLEANING',col:'#2aa08a'},{name:'PET FOOD',col:'#7a3aa8'},{name:'WATER · JUICE',col:'#3a8ad0'}];
function pc(i){return PAL[Math.floor(rnd(i)*PAL.length)]}
function drawProd(x,type,px,base,w,h,c1,c2){
 if(type===0){x.fillStyle=c1;x.fillRect(px,base-h,w,h);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(px+2,base-h,3,h);x.fillStyle='#f4f0e4';x.fillRect(px,base-h*.7,w,h*.38);x.fillStyle=c2;x.fillRect(px+2,base-h*.6,w-4,3);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(px,base-h,w,2)}
 else if(type===1){x.fillStyle=c1;x.fillRect(px,base-h,w,h);x.fillStyle=c2;x.fillRect(px+2,base-h*.8,w-4,h*.45);x.fillStyle='#fff';x.beginPath();x.arc(px+w/2,base-h*.58,w*.2,0,7);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.fillRect(px+w-3,base-h,3,h)}
 else if(type===2){x.fillStyle=c1;x.fillRect(px+w*.3,base-h,w*.4,h*.3);x.fillRect(px,base-h*.72,w,h*.72);x.fillStyle='#111';x.fillRect(px+w*.3,base-h-3,w*.4,4);x.fillStyle='#f4f0e4';x.fillRect(px+2,base-h*.5,w-4,h*.3);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(px+2,base-h*.7,2,h*.65)}
 else if(type===3){x.fillStyle=c1;x.beginPath();x.moveTo(px+2,base);x.lineTo(px,base-h*.85);x.lineTo(px+w*.25,base-h);x.lineTo(px+w*.5,base-h*.88);x.lineTo(px+w*.75,base-h);x.lineTo(px+w,base-h*.85);x.lineTo(px+w-2,base);x.closePath();x.fill();x.fillStyle='#f4f0e4';x.fillRect(px+3,base-h*.65,w-6,h*.3);x.fillStyle=c2;x.fillRect(px+5,base-h*.58,w-10,3)}
 else{x.fillStyle=c1;x.fillRect(px,base-h*.8,w,h*.8);x.fillStyle=c2;x.beginPath();x.moveTo(px,base-h*.8);x.lineTo(px+w/2,base-h);x.lineTo(px+w,base-h*.8);x.fill();x.fillStyle='#f4f0e4';x.fillRect(px+2,base-h*.55,w-4,h*.25)}}
function shelfSeg(seed,cat,raid){return ctex(512,320,(x,w,h)=>{x.fillStyle='#4a4e52';x.fillRect(0,0,w,h);const L=5,hd=26,lh=(h-hd)/L;
 x.fillStyle=cat.col;x.fillRect(0,0,w,hd);x.fillStyle='#fff';x.font='900 19px "Roboto Condensed",Arial';x.textBaseline='middle';x.fillText(cat.name,10,14);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,hd-3,w,3);
 for(let r=0;r<L;r++){const y0=hd+r*lh,base=y0+lh-7;const type=Math.floor(rnd(seed+r*17)*5);x.fillStyle='rgba(0,0,0,.28)';x.fillRect(0,y0,w,lh-7);
  let px=3,i=0;while(px<w-14){const grp=3+Math.floor(rnd(seed+r*41+i)*5);const c1=pc(seed+r*13+i*3),c2=pc(seed+r*29+i*5+1);const gone=rnd(seed+r*7+i*11)<(raid?.4:.08);const tw=type===0?15:type===1?24:type===2?13:type===3?20:17,th=lh*(type===1?.8:type===3?.55:.58)*(.9+rnd(seed+i)*.15);
   const gx=px;for(let k=0;k<grp&&px<w-14;k++){if(!gone||k<1)drawProd(x,type===4?Math.floor(rnd(seed+r+i)*2)*4:type,px,base,tw,th,c1,c2);px+=tw+1}
   x.fillStyle='#f4d02a';x.fillRect(gx,base+1,Math.min(14,px-gx),5);x.fillStyle='#222';x.fillRect(gx+2,base+3,8,1);px+=2;i++}
  x.fillStyle='#b9bec2';x.fillRect(0,base,w,7);x.fillStyle='#7a7f84';x.fillRect(0,base+5,w,2)}
 x.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<40;i++)x.fillRect(rnd(seed+i)*w,rnd(seed+i+9)*h,30,1)})}
const SEGS=[];for(let i=0;i<10;i++)SEGS.push(shelfSeg(i*37+5,CATS[i%CATS.length],i%3===1));
const BOARD=new THREE.MeshStandardMaterial({color:0xaab0b4,roughness:.5,metalness:.3});const BACKP=new THREE.MeshStandardMaterial({color:0x5a5e62,roughness:.8});
function gondolaSide(z,side,ri){const x0=-13,SEGW=3,N=8;
 for(let s=0;s<N;s++){const cx=x0+s*SEGW+SEGW/2;const tx=SEGS[(ri*3+s+(side>0?4:0))%SEGS.length];
  const pl=new THREE.Mesh(new THREE.PlaneGeometry(SEGW,2.0),new THREE.MeshStandardMaterial({map:tx,roughness:.7}));pl.position.set(cx,1.0,z+side*.47);pl.rotation.y=side>0?0:Math.PI;S.add(pl);
  for(let r=0;r<5;r++){const y=1.84-(r+1)*.368+.03;if(y<.02)continue;const b=new THREE.Mesh(new THREE.BoxGeometry(SEGW,.04,.62),BOARD);b.position.set(cx,y,z+side*.34);b.castShadow=true;b.receiveShadow=true;S.add(b)}}
 const back=new THREE.Mesh(new THREE.BoxGeometry(N*SEGW,2.0,.08),BACKP);back.position.set(x0+N*SEGW/2,1.0,z+side*.07);back.castShadow=true;S.add(back);
 const base=new THREE.Mesh(new THREE.BoxGeometry(N*SEGW,.12,.64),new THREE.MeshStandardMaterial({color:0x2a2e32,roughness:.9}));base.position.set(x0+N*SEGW/2,.06,z+side*.34);S.add(base)}

// ---------- generic helpers ----------
const MC=(c,r=.7,m=0,extra={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:r,metalness:m},extra));
function bx(w,h,d,mat,x,y,z,ry=0,cast=true,par=S){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.rotation.y=ry;m.castShadow=cast;m.receiveShadow=true;par.add(m);return m}
function cyl(r,h,mat,x,y,z,rx=0,rz=0,par=S,seg=10){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),mat);m.position.set(x,y,z);m.rotation.x=rx;m.rotation.z=rz;m.castShadow=true;par.add(m);return m}
function decal(tx,w,d,x,z,ry,op=1,y=.014){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:tx,transparent:true,opacity:op,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,fog:true}));m.rotation.x=-Math.PI/2;m.rotation.z=ry;m.position.set(x,y,z);S.add(m);return m}
function plane(tx,w,h,x,y,z,ry=0,basic=true,col=0xffffff){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),basic?new THREE.MeshBasicMaterial({map:tx,fog:true,transparent:true,color:col}):new THREE.MeshStandardMaterial({map:tx,roughness:.7}));m.position.set(x,y,z);m.rotation.y=ry;S.add(m);return m}
const WIRE=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='#c8ccd0';x.lineWidth=3;for(let i=0;i<=8;i++){x.beginPath();x.moveTo(i*w/8,0);x.lineTo(i*w/8,h);x.moveTo(0,i*h/8);x.lineTo(w,i*h/8);x.stroke()}});
const WIREM=new THREE.MeshBasicMaterial({map:WIRE,transparent:true,alphaTest:.4,side:THREE.DoubleSide,fog:true});
function cart(x,z,ry,tip,loaded){const g=new THREE.Group();const M=MC(0xb8bcc0,.4,.6),RED=MC(0xc02a24,.6);
 const bk=new THREE.Mesh(new THREE.BoxGeometry(.62,.36,.98),WIREM);bk.position.set(0,.62,0);g.add(bk);bx(.6,.03,.96,M,0,.44,0,0,false,g);bx(.58,.03,.9,M,0,.1,0,0,false,g);
 for(const sx of[-1,1]){bx(.03,.5,.03,M,sx*.29,.35,.44,0,false,g);bx(.03,.5,.03,M,sx*.29,.35,-.44,0,false,g);for(const sz of[-1,1]){cyl(.05,.04,MC(0x1a1a1a,.8),sx*.27,.05,sz*.4,0,Math.PI/2,g,8)}}
 cyl(.02,.66,M,0,1.08,-.5,0,Math.PI/2,g,6);cyl(.026,.4,RED,0,1.08,-.5,0,Math.PI/2,g,8);bx(.03,.46,.03,M,-.3,.88,-.48,0,false,g);bx(.03,.46,.03,M,.3,.88,-.48,0,false,g);
 if(loaded)for(let i=0;i<5;i++)bx(.14,.2,.1,MC(PAL[(i*3+2)%PAL.length],.8),(i-2)*.11,.6,.1*((i%2)-.5),i*.4);
 g.position.set(x,0,z);g.rotation.y=ry;if(tip){g.rotation.z=tip;g.position.y=.3;g.position.x+=.1}S.add(g);return g}
function basket(x,z,col,ry=0,y=0){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.42,.22,.3),new THREE.MeshStandardMaterial({color:col,roughness:.6}));b.position.y=.11;g.add(b);bx(.38,.02,.26,MC(0x101010),0,.22,0,0,false,g);cyl(.012,.4,MC(0xb0b4b8,.4,.6),0,.3,0,0,Math.PI/2,g,6);g.position.set(x,y,z);g.rotation.y=ry;S.add(g);return g}
function cans(x,z,n,sp=.3){for(let i=0;i<n;i++){const c=cyl(.033,.11,MC(PAL[Math.floor(rnd(i+x*9)*PAL.length)],.4,.3),x+(rnd(i*3+z)-.5)*sp,.055,z+(rnd(i*5+x)-.5)*sp,0,0,S,9);if(rnd(i+7)<.35){c.rotation.z=Math.PI/2;c.position.y=.033}}}
const BLOOD=ctex(256,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(110,8,12,.85)';x.beginPath();x.moveTo(10,64);x.bezierCurveTo(60,20,140,110,246,60);x.bezierCurveTo(150,100,70,90,10,70);x.fill();for(let i=0;i<14;i++){x.beginPath();x.arc(30+rnd(i)*190,30+rnd(i+3)*70,2+rnd(i+5)*5,0,7);x.fill()}});
const SPILL=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(64,64,4,64,64,60);g.addColorStop(0,'rgba(210,230,240,.55)');g.addColorStop(1,'rgba(210,230,240,0)');x.fillStyle=g;x.fillRect(0,0,w,h)});
const FOOT=ctex(64,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(90,10,14,.7)';for(let i=0;i<4;i++){x.beginPath();x.ellipse(i%2?42:22,20+i*28,8,15,0,0,7);x.fill()}});
const POSTERS=[['FRESH BAKED DAILY','#e8a43a','#3a1a08'],['ALL FRUIT 2 FOR 1','#2aa050','#ffffff'],['NIGHT SHIFT: STAY CALM','#2a5ab8','#ffffff'],['MEMBERS SAVE 20%','#c02a4a','#ffffff'],['BUY 3 GET 1 FREE','#f0c020','#1a1a1a']];
function posterTex(i){const p=POSTERS[i%POSTERS.length];return ctex(256,384,(x,w,h)=>{x.fillStyle=p[1];x.fillRect(0,0,w,h);x.fillStyle='rgba(255,255,255,.18)';x.beginPath();x.arc(w/2,h*.38,w*.34,0,7);x.fill();x.fillStyle=p[2];x.font='900 38px "Roboto Condensed",Arial';x.textAlign='center';const wd=p[0].split(' ');for(let k=0;k<wd.length;k++)x.fillText(wd[k],w/2,h*.72+k*40-(wd.length-2)*20);x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=6;x.strokeRect(3,3,w-6,h-6)})}
function banner(x,z,txt,col,ry=0){const t=signTex(txt,col,'#ffffff',512,200,92);for(const f of[0,Math.PI]){const m=new THREE.Mesh(new THREE.PlaneGeometry(2.2,.86),new THREE.MeshBasicMaterial({map:t,fog:true}));m.position.set(x,3.85,z);m.rotation.y=ry+f;S.add(m)}for(const sx of[-1,1])cyl(.008,.5,MC(0x222222),x+sx*1.0*Math.cos(ry),4.15,z-sx*1.0*Math.sin(ry),0,0,S,4)}

// ===== MIDNIGHT SKEWERS: a night-market food kiosk seen from the vendor's side (far from the store so both sets can live in one scene) =====
const KX=100,KZ=-60;
function buildKiosk(){
 const wood=ctex(256,256,(x,w,h)=>{x.fillStyle='#6a4a2c';x.fillRect(0,0,w,h);for(let i=0;i<22;i++){x.fillStyle=i%2?'rgba(0,0,0,.18)':'rgba(255,220,160,.07)';x.fillRect(0,i*12,w,6)}x.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<60;i++)x.fillRect(Math.random()*w,Math.random()*h,18,1)},[2,1]);
 const WM=new THREE.MeshStandardMaterial({map:wood,roughness:.85}),DK=MC(0x2a2018,.9);
 const awn=ctex(256,128,(x,w,h)=>{for(let i=0;i<10;i++){x.fillStyle=i%2?'#e8e0d0':'#c8342a';x.fillRect(i*w/10,0,w/10,h)}x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,h-10,w,10)});
 // floor + side walls + back
 bx(4.4,.1,3.6,MC(0x3a2c20,.9),KX,-.05,KZ-.8);bx(.12,2.7,3.6,WM,KX-2.2,1.35,KZ-.8);bx(.12,2.7,3.6,WM,KX+2.2,1.35,KZ-.8);bx(4.4,2.7,.12,WM,KX,1.35,KZ-2.55);
 // counter: front board + top
 bx(4.4,1.0,.5,WM,KX,.5,KZ+.9);bx(4.6,.07,.8,MC(0x9a6a3a,.6),KX,1.02,KZ+.95);
 // window frame posts and header
 bx(.14,1.6,.14,DK,KX-2.15,1.8,KZ+1.1);bx(.14,1.6,.14,DK,KX+2.15,1.8,KZ+1.1);bx(4.5,.18,.2,DK,KX,2.62,KZ+1.1);
 // striped awning (tilted forward)
 const am=new THREE.Mesh(new THREE.PlaneGeometry(4.8,1.5),new THREE.MeshStandardMaterial({map:awn,roughness:.9,side:THREE.DoubleSide}));am.position.set(KX,2.55,KZ+1.7);am.rotation.x=Math.PI/2-.28;S.add(am);
 // menu board hanging at the left of the window
 const menu=ctex(256,320,(x,w,h)=>{x.fillStyle='#1a1410';x.fillRect(0,0,w,h);x.strokeStyle='#d8a040';x.lineWidth=6;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#f0c860';x.font='900 30px "Roboto Condensed",Arial';x.textAlign='center';x.fillText('MIDNIGHT',w/2,48);x.fillText('SKEWERS',w/2,82);x.font='700 24px "Roboto Condensed",Arial';x.fillStyle='#f4ead0';x.textAlign='left';[['PORK','10'],['CHICKEN','10'],['STICKY RICE','5'],['FISH BALLS','8'],['ICED TEA','4']].forEach((r,i)=>{x.fillText(r[0],24,134+i*36);x.textAlign='right';x.fillText(r[1],w-24,134+i*36);x.textAlign='left'});x.fillStyle='#c8342a';x.font='900 20px "Roboto Condensed",Arial';x.textAlign='center';x.fillText('NO CREDIT · NO REFUNDS',w/2,306)});
 const mb=new THREE.Mesh(new THREE.PlaneGeometry(1.0,1.25),new THREE.MeshBasicMaterial({map:menu,fog:false}));mb.position.set(KX-1.45,1.75,KZ+1.0);mb.rotation.y=Math.PI;S.add(mb);
 // neon OPEN sign (hangs outside, glows red)
 const neon=new THREE.Mesh(new THREE.PlaneGeometry(.9,.36),new THREE.MeshBasicMaterial({map:signTex('OPEN','#2a0808','#ff4a3a',256,100,70),fog:false}));neon.position.set(KX+1.4,2.2,KZ+1.12);neon.rotation.y=Math.PI;S.add(neon);
 // grill with glowing coals (left inside) + skewers
 bx(1.1,.7,.7,DK,KX-1.4,.55,KZ+.2);const coals=new THREE.Mesh(new THREE.BoxGeometry(.95,.06,.5),new THREE.MeshBasicMaterial({color:0xff6a20,fog:false}));coals.position.set(KX-1.4,.92,KZ+.2);S.add(coals);
 for(let i=0;i<8;i++){bx(.03,.03,.7,MC(0x9a9a9a,.3,.6),KX-1.78+i*.1,1.0,KZ+.2);cyl(.05,.06,MC(0x7a3a1a,.7),KX-1.78+i*.1,1.0,KZ+.05,Math.PI/2,0,S,6);cyl(.05,.06,MC(0x8a4a22,.7),KX-1.78+i*.1,1.0,KZ+.2,Math.PI/2,0,S,6);cyl(.05,.06,MC(0x7a3a1a,.7),KX-1.78+i*.1,1.0,KZ+.35,Math.PI/2,0,S,6)}
 // sticky rice basket, tea jug, cash tin, bell on the counter
 cyl(.28,.22,MC(0xc8a850,.8),KX+.9,1.17,KZ+.7,0,0,S,10);cyl(.14,.42,MC(0xe0e0e0,.4,.3),KX+1.5,1.25,KZ+.65,0,0,S,10);bx(.35,.1,.25,MC(0x8a8a8a,.4,.5),KX-.3,1.1,KZ+.65);cyl(.07,.07,MC(0xd8b030,.3,.8),KX+.25,1.1,KZ+.75,0,0,S,10);
 // street outside: wet road, kerb, lamp post, far buildings
 const road=new THREE.Mesh(new THREE.PlaneGeometry(60,40),MC(0x15181c,.25,.2));road.rotation.x=-Math.PI/2;road.position.set(KX,-.01,KZ+22);S.add(road);
 const walk=new THREE.Mesh(new THREE.PlaneGeometry(60,4.6),MC(0x4a4e52,.8));walk.rotation.x=-Math.PI/2;walk.position.set(KX,.0,KZ+3.2);S.add(walk);bx(60,.16,.25,MC(0x7a7e82,.8),KX,.08,KZ+5.6);
 cyl(.06,5.4,MC(0x2a2e32,.5,.5),KX+3.6,2.7,KZ+4.6,0,0,S,8);bx(1.3,.07,.07,MC(0x2a2e32,.5,.5),KX+3.0,5.3,KZ+4.6);const lamp=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.3),new THREE.MeshBasicMaterial({color:0xcfe8ff,fog:false}));lamp.position.set(KX+2.5,5.25,KZ+4.6);S.add(lamp);
 for(let i=0;i<9;i++){const h=5+Math.sin(i*2.3)*3+4,w=5+Math.cos(i*1.7)*1.5+1.5,x=KX-36+i*9;bx(w,h,3,MC(0x0c1014,.9),x,h/2,KZ+30);for(let k=0;k<8;k++)if(Math.sin(i*7+k*3.1)>.1)bx(.6,.8,.05,new THREE.MeshBasicMaterial({color:0xd8c080,fog:true}),x+(Math.cos(k*5+i)-.0)*w*.35,2+k*1.1,KZ+28.45)}

 // atmosphere: strings of warm bulbs across the street, a haze glow behind the customer, a lit sign across the road, brighter pavement
 for(let r=0;r<2;r++)for(let i=0;i<13;i++){const x=KX-6+i,y=3.15+Math.sin(i*.5)*.18-r*.35,z=KZ+5.2+r*3.2;const b=new THREE.Mesh(new THREE.SphereGeometry(.09,6,5),new THREE.MeshBasicMaterial({color:i%3?0xffd890:0xff9a60,fog:false}));b.position.set(x,y,z);S.add(b)}
 const haze=new THREE.Mesh(new THREE.PlaneGeometry(10,5),new THREE.MeshBasicMaterial({map:ctex(256,128,(x,w,h)=>{const g=x.createRadialGradient(w/2,h*.55,4,w/2,h*.55,w*.5);g.addColorStop(0,'rgba(110,150,175,.2)');g.addColorStop(1,'rgba(120,170,200,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}),transparent:true,depthWrite:false,fog:false}));haze.position.set(KX+1.5,2.4,KZ+9);haze.rotation.y=Math.PI;S.add(haze);
 const pave=new THREE.Mesh(new THREE.PlaneGeometry(14,4.4),new THREE.MeshStandardMaterial({color:0x8a9096,roughness:.5,metalness:.1}));pave.rotation.x=-Math.PI/2;pave.position.set(KX,.012,KZ+3.4);S.add(pave);
 // lights: warm bulb inside, orange coals, red neon, cool street lamp (also used to tint the 2D characters)
 const mk=(c,i,d,x,y,z)=>{const L=new THREE.PointLight(c,i,d,2);L.position.set(x,y,z);S.add(L)};
 mk(0xffc880,20,9,KX,2.3,KZ-.3);mk(0xff7a30,10,5,KX-1.4,1.3,KZ+.3);mk(0xff4a3a,9,6,KX+1.4,2.1,KZ+1.5);mk(0xcfe8ff,48,16,KX+2.6,5.0,KZ+4.0);mk(0x9ab8ff,22,12,KX-1.0,2.6,KZ+4.5);
 LIGHTS.push([KX,2.3,KZ-.3,0xffc880,20,7],[KX-1.4,1.3,KZ+.3,0xff7a30,10,4],[KX+1.4,2.1,KZ+1.5,0xff4a3a,9,5],[KX+2.6,5.0,KZ+4.6,0xcfe8ff,26,12]);
}
function buildProps(){buildOutside();buildCheckout();buildCheckout2();buildKiosk();
 // aisle hanging signs (big, readable) over every aisle mouth
 [[-9,'AISLE 8','CEREAL · SNACKS'],[-3.4,'AISLE 9','CANNED · PASTA'],[2.2,'AISLE 10','DRINKS · CLEANING']].forEach(([z,a,b],i)=>{for(const xx of[8.2,-2]){const t=ctex(512,256,(x,w,h)=>{x.fillStyle='#17324a';x.fillRect(0,0,w,h);x.strokeStyle='#f2c230';x.lineWidth=10;x.strokeRect(6,6,w-12,h-12);x.fillStyle='#f2c230';x.font='900 120px "Roboto Condensed",Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(a,w/2,92);x.fillStyle='#fff';x.font='900 52px "Roboto Condensed",Arial';x.fillText(b,w/2,196)});for(const f of[0,Math.PI]){const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.2),new THREE.MeshBasicMaterial({map:t,fog:true}));m.position.set(xx,3.4,z);m.rotation.y=Math.PI/2+f;S.add(m)}for(const sz of[-1,1])cyl(.01,.9,MC(0x222222),xx,4.0,z+sz*.8,0,0,S,4)}});
 // end caps: promo can pyramids
 [[11.8,-3.4],[11.8,2.2],[11.8,-9]].forEach(([x,z],i)=>{bx(1.1,.7,1.1,MC(0x8a6a3a,.9),x,.35,z);for(let l=0;l<3;l++)for(let a=0;a<3-l;a++)for(let b=0;b<3-l;b++)cyl(.06,.12,MC(PAL[(a+b+l+i)%6],.4,.3),x-.3+a*.2+l*.1,.76+l*.12,z-.3+b*.2+l*.1,0,0,S,9);const pt=signTex(['2 FOR 1','BIG SALE','HALF PRICE'][i],'#d8342c','#ffffff',256,100,60);const pm=new THREE.Mesh(new THREE.PlaneGeometry(.9,.36),new THREE.MeshBasicMaterial({map:pt,fog:true}));pm.position.set(x+.56,1.1,z);pm.rotation.y=Math.PI/2;S.add(pm)});
 // carts & baskets (aisles sides / entrance)
 cart(7,-2.4,.35,0,true);cart(-4.6,1.0,.2,1.45);cart(2,-6.6,-.5,0,false);cart(-8,-5,1.2,0,true);cart(9.5,6,.2,0,false);cart(10.2,6.6,.25,0,false);cart(10.9,7.2,.3,0,false);
 basket(-1.8,-2.4,0xc0302a,.4);basket(4.2,1.2,0x2a5ab8,1.2);basket(-6,-6.5,0xc0302a,.2);basket(9,-7.5,0xc0302a,.5);for(let i=0;i<4;i++)basket(14,9,0xc0302a,0,i*.22);
 // scattered goods + mess
 cans(1.2,-2.5,7,.7);cans(5.5,-1.0,5,.5);cans(-3,-6.5,9,1);cans(8,-6,6,.8);cans(-2.2,.9,4,.4);
 for(let i=0;i<6;i++)bx(.2,.28,.07,MC(PAL[i],.8),-6+i*.4,.14,-.8+Math.sin(i*2)*.6,i*.9,false);
 decal(BLOOD,2.6,1.3,2.4,-1.3,.4,.9);decal(BLOOD,2.2,1.1,-1.5,-6.4,2.2,.85);decal(BLOOD,1.8,.9,8.5,-.1,-.3,.8);decal(FOOT,.6,1.8,1.5,-.2,1.2,.8);decal(FOOT,.6,1.8,-5,-5.5,.7,.8);
 decal(SPILL,1.8,1.8,-1.2,-2.2,0,.7,.012);decal(SPILL,1.4,1.4,6.6,-1.4,0,.6,.012);decal(SPILL,2.2,2.2,0.5,9,0,.55,.012);
 // wet floor sign
 const wf=new THREE.Group();const wfT=signTex('WET FLOOR','#f2c230','#1a1a1a',256,320,56);for(const sz of[-1,1]){const p=new THREE.Mesh(new THREE.PlaneGeometry(.34,.58),new THREE.MeshBasicMaterial({map:wfT,fog:true,side:THREE.DoubleSide}));p.position.set(0,.3,sz*.12);p.rotation.x=-sz*.22;wf.add(p)}wf.position.set(-1.6,0,1.2);wf.rotation.y=.5;S.add(wf);
 // posters + notice board + clock + extinguisher on back / side walls
 for(let i=0;i<4;i++)plane(posterTex(i),1.1,1.65,-11+i*3.6,2.2,-FD/2+.25);
 plane(posterTex(2),1.2,1.8,-FW/2+.25,2.0,-4,Math.PI/2);plane(posterTex(0),1.2,1.8,-FW/2+.25,2.0,4,Math.PI/2);plane(posterTex(1),1.2,1.8,FW/2-.25,2.0,-6,-Math.PI/2);plane(posterTex(4),1.2,1.8,FW/2-.25,2.0,2,-Math.PI/2);
 const clk=new THREE.Mesh(new THREE.CircleGeometry(.3,20),new THREE.MeshBasicMaterial({map:ctex(128,128,(x,w,h)=>{x.fillStyle='#f2f2ea';x.beginPath();x.arc(64,64,62,0,7);x.fill();x.strokeStyle='#111';x.lineWidth=6;x.stroke();x.lineWidth=5;x.beginPath();x.moveTo(64,64);x.lineTo(64,22);x.moveTo(64,64);x.lineTo(92,80);x.stroke();for(let i=0;i<12;i++){x.fillRect(64+Math.sin(i*.5236)*52-2,64-Math.cos(i*.5236)*52-2,4,4)}}),fog:true}));clk.position.set(8,3.7,-FD/2+.25);S.add(clk);
 cyl(.09,.5,MC(0xc02a24,.5),-FW/2+.5,1.0,-8,0,0,S,10);bx(.3,.3,.02,MC(0xc02a24,.5),-FW/2+.22,1.9,-8,Math.PI/2,false);
 // ceiling clutter: pipes, ducts, cameras, speakers, exit signs, banners
 for(let k=0;k<3;k++){cyl(.12,FW,MC(0x8a9094,.5,.5),0,4.12-k*.0,-12+k*10,0,Math.PI/2,S,10);bx(FW,.34,.5,MC(0x9aa0a4,.6,.3),0,4.18,-6+k*9+3)}
 for(let k=0;k<6;k++){const sx=-14+k*6,sz=(k%2?-5:6);bx(.16,.1,.16,MC(0x222222),sx,4.34,sz);const dm=new THREE.Mesh(new THREE.SphereGeometry(.14,10,6,0,Math.PI*2,0,Math.PI/2),MC(0x101418,.3,.5));dm.rotation.x=Math.PI;dm.position.set(sx,4.28,sz);S.add(dm)}
 for(let k=0;k<5;k++)bx(.22,.22,.22,MC(0xdadcda,.7),-12+k*6.5,4.2,-1+(k%2)*4);
 const exitT=signTex('EXIT','#0a7a3a','#ffffff',256,96,64);for(const [ex,ez,ry] of [[-FW/2+1,12,Math.PI/2],[FW/2-1,-10,-Math.PI/2],[0,-FD/2+.6,0]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(.9,.34),new THREE.MeshBasicMaterial({map:exitT,fog:false}));m.position.set(ex,3.8,ez);m.rotation.y=ry;S.add(m)}
 banner(-12,-6.2,'FRESH FOR LESS','#c02a24',Math.PI/2);banner(-12,.5,'NIGHT OWL DEALS','#2a5ab8',Math.PI/2);banner(12,8,'BAKERY · DELI','#d8802a',0);
 // convex security mirror + TV
 const mir=new THREE.Mesh(new THREE.SphereGeometry(.4,16,10,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xaac0c8,roughness:.05,metalness:.95}));mir.rotation.x=-Math.PI/2;mir.position.set(-FW/2+.4,3.6,6);mir.rotation.z=Math.PI/2;S.add(mir);
 // pallets + boxes by back wall
 for(let k=0;k<3;k++){bx(1.2,.14,1.0,MC(0x9a7a4a,.9),-17+k*1.4,.07,-FD/2+3.2);for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let l=0;l<3;l++)bx(.5,.4,.45,MC(0xa88a5a,.9),-17.3+k*1.4+a*.55,.34+l*.4,-FD/2+3+b*.5,.1*l);}
 // produce stand upgrade: tilted crates with veg
 for(let i=0;i<4;i++){const px=8+i*1.7;bx(1.4,.08,.9,MC(0x7a5a30,.9),px,.65,FD/2-9.2,0,true);for(let j=0;j<9;j++){const v=new THREE.Mesh(new THREE.SphereGeometry(.1,9,7),MC([0x3aa83a,0xe8302a,0xf2c230,0xe8742a][(i+j)%4],.5));v.scale.y=.9;v.position.set(px-.5+(j%5)*.25,.78,FD/2-9.2+(j<5?-.18:.18));S.add(v)}}
 // checkout dressing: conveyor, register, candy rack, bags
 for(let i=0;i<3;i++){const x=-12+i*5;bx(.7,.06,2.6,MC(0x1a1a1e,.9),x,.93,FD/2-5.4);bx(.5,.35,.5,MC(0x2a2e34,.4),x+.9,1.1,FD/2-3.5);bx(.4,.26,.04,new THREE.MeshBasicMaterial({color:0x2affb0,fog:true}),x+.9,1.3,FD/2-3.3);bx(.4,.7,.3,MC(0xd8342c,.6),x-.9,1.25,FD/2-6.6);for(let k=0;k<5;k++)bx(.18,.2,.1,MC(PAL[k],.7),x+(k-2)*.12-.0,.93+.13,FD/2-5.6+k*.2);bx(.05,.06,1.5,MC(0xc8ccd0,.3,.8),x-.45,1.0,FD/2-5.2)}
 // entrance: barricade planks + boards, shopping carts jammed, OPEN sign
 for(let i=0;i<5;i++)bx(.12,.5,2.6,MC(0x8a6a3a,.9),-1.5+i*.75,1.3+(i%2)*.2,FD/2-1.2,.15*(i-2),true);bx(.1,1.6,.1,MC(0x6a4a2a,.9),-1.5,.8,FD/2-1.3);bx(.1,1.6,.1,MC(0x6a4a2a,.9),1.5,.8,FD/2-1.3);
 cart(-2.6,FD/2-2.5,.9,0,false);cart(2.2,FD/2-2.8,-.7,1.4,false);
 const openT=ctex(256,128,(x,w,h)=>{x.fillStyle='#0a0a10';x.fillRect(0,0,w,h);x.strokeStyle='#ff3a2a';x.lineWidth=6;x.strokeRect(6,6,w-12,h-12);x.fillStyle='#ff4a3a';x.font='900 64px "Roboto Condensed",Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('OPEN 24H',w/2,h/2+4)});const op=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.6),new THREE.MeshBasicMaterial({map:openT,fog:false}));op.position.set(3.4,2.2,FD/2-.3);op.rotation.y=Math.PI;S.add(op);window.OPENSIGN=op;
 // freezer upgrades: frames, handles, cold glow, frost
 const FROST=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(220,240,255,0)');g.addColorStop(1,'rgba(220,240,255,.85)');x.fillStyle=g;x.fillRect(0,0,w,h);for(let i=0;i<260;i++){x.fillStyle='rgba(255,255,255,'+(.2+rnd(i)*.5)+')';x.fillRect(rnd(i+1)*w,h*.4+rnd(i+2)*h*.6,2,2)}});
 for(let i=0;i<8;i++){const x=-14+i*4;for(const sx of[-1,1])bx(.07,2.2,.1,MC(0x15181c,.4,.6),x+sx*1.68,1.25,-FD/2+1.5);bx(.07,2.2,.1,MC(0x15181c,.4,.6),x,1.25,-FD/2+1.5);bx(3.4,.07,.1,MC(0x15181c,.4,.6),x,2.36,-FD/2+1.5);cyl(.018,.7,MC(0xc8ccd0,.3,.8),x-.15,1.2,-FD/2+1.56,0,0,S,6);cyl(.018,.7,MC(0xc8ccd0,.3,.8),x+.15,1.2,-FD/2+1.56,0,0,S,6);plane(FROST,3.3,2.1,x,1.25,-FD/2+1.52,0,true);const gl=new THREE.Mesh(new THREE.PlaneGeometry(3.3,.12),new THREE.MeshBasicMaterial({color:0xbfe8ff,fog:false}));gl.position.set(x,2.28,-FD/2+1.55);S.add(gl)}
 const cold=new THREE.PointLight(0x7ac8ff,22,16,2);cold.position.set(-2,2.2,-FD/2+3);S.add(cold);const cold2=cold.clone();cold2.position.set(-10,2.2,-FD/2+3);S.add(cold2);
 // outside street glow
 const out=new THREE.PointLight(0x4a6aaa,10,20,2);out.position.set(0,2.5,FD/2+3);S.add(out);
 // radio on checkout 1
 bx(.28,.14,.1,MC(0x20242a,.5),-11.2,1.05,FD/2-3.4)}

function buildOutside(){const z0=FD/2;
 const road=new THREE.Mesh(new THREE.PlaneGeometry(120,40),MC(0x15181c,.9));road.rotation.x=-Math.PI/2;road.position.set(0,-.01,z0+20);S.add(road);
 const walk=new THREE.Mesh(new THREE.PlaneGeometry(120,5),MC(0x3a3e42,.9));walk.rotation.x=-Math.PI/2;walk.position.set(0,0,z0+2.5);S.add(walk);bx(120,.15,.3,MC(0x5a5e62,.9),0,.07,z0+5.1);
 for(let i=-6;i<=6;i++)bx(3,.01,.25,MC(0xdcd8c8,.9),i*8,.01,z0+16);
 // street lamp
 cyl(.07,6,MC(0x2a2e32,.5,.5),9,3,z0+6,0,0,S,8);bx(1.4,.08,.08,MC(0x2a2e32),8.4,6,z0+6);const lamp=new THREE.Mesh(new THREE.BoxGeometry(.5,.1,.3),new THREE.MeshBasicMaterial({color:0xffe0a8,fog:false}));lamp.position.set(7.8,5.92,z0+6);S.add(lamp);
 const pl=new THREE.PointLight(0xffd9a0,24,26,2);pl.position.set(7.8,5.5,z0+6.5);S.add(pl);window.STREET=pl;
 // parked car
 const car=new THREE.Group();bx(1.8,.6,4.2,MC(0x7a1a1a,.4,.4),0,.55,0,0,true,car);bx(1.5,.5,2.2,MC(0x101820,.1,.7),0,1.05,-.2,0,true,car);for(const sx of[-1,1])for(const sz of[-1,1])cyl(.34,.25,MC(0x0a0a0a,.9),sx*.92,.34,sz*1.3,0,Math.PI/2,car,10);for(const sx of[-1,1])bx(.3,.15,.05,new THREE.MeshBasicMaterial({color:0x8a8a70,fog:false}),sx*.6,.62,2.12,0,false,car);car.position.set(-6,0,z0+10);car.rotation.y=.12;S.add(car);
 // distant buildings with a few lit windows
 for(let i=0;i<9;i++){const h=6+rnd(i)*12,w=6+rnd(i+3)*5,x=-40+i*10;bx(w,h,4,MC(0x0c1012,.9),x,h/2,z0+42);for(let k=0;k<6;k++)if(rnd(i*7+k)<.35)bx(.7,.9,.05,new THREE.MeshBasicMaterial({color:0xd8c080,fog:true}),x+(rnd(k+i)-.5)*w*.7,2+rnd(k*3+i)*(h-3),z0+39.9,0,false)}
 // barricade inside the doors
 for(let i=0;i<6;i++){bx(3.4,.22,.06,MC(0x8a6a3a,.9),0+((i%2)-.5)*.3,.7+i*.42,z0-.7,(i%3-1)*.12)}
 bx(.18,3.0,.1,MC(0x6a4a2a,.9),-1.8,1.5,z0-.75);bx(.18,3.0,.1,MC(0x6a4a2a,.9),1.8,1.5,z0-.75);bx(.18,3.0,.1,MC(0x6a4a2a,.9),0,1.5,z0-.75)}

const LAMI=ctex(256,64,(x,w,h)=>{x.fillStyle='#e8ece8';x.fillRect(0,0,w,h);x.fillStyle='#1f7ad0';x.fillRect(0,h*.4,w,h*.22);x.fillStyle='#fff';x.font='900 20px "Roboto Condensed",Arial';x.textBaseline='middle';x.fillText('FRESHWAY',8,h*.51);x.fillStyle='rgba(0,0,0,.12)';for(let i=0;i<4;i++)x.fillRect(i*64,0,2,h)});
const CANDY=ctex(128,128,(x,w,h)=>{x.fillStyle='#303438';x.fillRect(0,0,w,h);for(let r=0;r<4;r++)for(let c=0;c<8;c++){x.fillStyle=PAL[(r*3+c)%PAL.length];x.fillRect(c*16+2,r*32+6,12,20)}x.fillStyle='#aab';for(let r=0;r<4;r++)x.fillRect(0,r*32+28,w,3)});
function buildCheckout(){for(let i=0;i<3;i++){const x=-12+i*5,z0=FD/2-5;
 for(const sx of[-1,1]){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.6,.9),new THREE.MeshStandardMaterial({map:LAMI,roughness:.5}));m.position.set(x+sx*.56,.46,z0);m.rotation.y=sx*Math.PI/2;S.add(m)}
 bx(1.22,.05,3.7,MC(0xf0f2f0,.3),x,.93,z0);bx(1.0,.5,.3,MC(0xc8ccd0,.4,.5),x,.2,z0-1.8);
 const cr=new THREE.Mesh(new THREE.PlaneGeometry(.5,1.3),new THREE.MeshBasicMaterial({map:CANDY,fog:true}));cr.position.set(x-.0,1.3,z0-1.95);cr.rotation.y=0;S.add(cr);
 bx(.04,1.9,.04,MC(0x888c90,.4,.7),x-.6,1.45,z0-1.9);bx(.04,1.9,.04,MC(0x888c90,.4,.7),x+.6,1.45,z0-1.9);
 for(let k=0;k<4;k++)bx(.2,.3,.02,new THREE.MeshBasicMaterial({color:0xf2f2e8,fog:true}),x+.7,1.2,z0+.2+k*.3,.2*k);}
 const ex=signTex('EXPRESS · 10 ITEMS','#1f7ad0','#ffffff',512,90,52);const em=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.42),new THREE.MeshBasicMaterial({map:ex,fog:true}));em.position.set(-2,3.2,FD/2-7);em.rotation.y=Math.PI;S.add(em)}

function buildCheckout2(){for(const lx of[-12,-7,-2]){const L=new THREE.PointLight(0xdff8ff,18,9,2);L.position.set(lx,3.2,13);S.add(L)}for(let i=0;i<3;i++){const x=-12+i*5,z0=FD/2-5;
 bx(.5,.04,.32,MC(0x1a1c20,.4),x+.3,.97,z0+1.3);bx(.34,.02,.2,new THREE.MeshBasicMaterial({color:0x9ad8ff,fog:true}),x+.3,1.0,z0+1.3);
 bx(.3,.22,.04,MC(0x20242a,.4),x-.2,1.13,z0+1.75,.3);bx(.26,.16,.02,new THREE.MeshBasicMaterial({color:i===1?0x2affb0:0x16a070,fog:true}),x-.2,1.14,z0+1.77,.3);
 for(let k=0;k<9;k++)bx(.62,.012,.04,MC(0x3a3e44,.5,.4),x,.965,z0-1.2+k*.3);
 bx(.04,.3,3.6,MC(0xc8ccd0,.3,.8),x+.45,1.1,z0);
 for(let k=0;k<3;k++)bx(.16,.22,.08,MC(0xf0f0e8,.9),x+.62,1.1,z0+.3+k*.25,.3*k);
 cyl(.03,2.2,MC(0x888c90,.4,.7),x,1.1,z0+1.8,0,0,S,6);const ln=new THREE.Mesh(new THREE.PlaneGeometry(.6,.4),new THREE.MeshBasicMaterial({map:signTex(String(i+1),(i===1?'#16a050':'#c02a24'),'#fff',128,86,60),fog:false}));ln.position.set(x,2.3,z0+1.8);S.add(ln);
 bx(.4,.3,.3,MC(0xe8ecf0,.5),x+.55,1.1,z0-.3);const sn=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.18,8),MC(0x2aa8e0,.5));sn.position.set(x+.55,1.35,z0-.3);S.add(sn)}}
