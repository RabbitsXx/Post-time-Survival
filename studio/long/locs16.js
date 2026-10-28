/* ===== locs16: location backdrops (1280x720). Each LOC.name(Z,p) draws far/mid/near, returns update(u,t,bt).
   p.skin = 'real' | 'game' picks the palette; same geometry in both skins. Characters stand at y~585, captions own y>=610. */
const LOC={};
const FLOORY=560;
const pk=(p,r,g)=>p.skin==='game'?g:r;
const mix=(a,b,k)=>{const x=hex2(a),y=hex2(b);return col2(x.map((v,i)=>v+(y[i]-v)*k))};
function ground(g,y,fill,shade){R(g,-100,y,1480,900-y,fill);R(g,-100,y,1480,160,'url(#gFloorShade)',{opacity:shade==null?.6:shade})}
function bldg(g,x,y,w,h,fill,win,seed,o){o=o||{};R(g,x,y-h,w,h,fill);R(g,x,y-h,w,6,mix(fill,'#000000',.25));
 const cw=o.cw||16,ch=o.ch||22,gx=o.gx||10,gy=o.gy||14;
 for(let r=0;r*(ch+gy)+20<h-20;r++)for(let c=0;c*(cw+gx)+14<w-14;c++){const lit=rnd(seed+r*13+c*7)>(o.dark==null?.72:o.dark);R(g,x+14+c*(cw+gx),y-h+20+r*(ch+gy),cw,ch,lit?(o.lit||'#ffd27a'):win,{opacity:lit?.95:.7})}}
function skylineFar(g,y,fill,seed,n){let x=-60;for(let i=0;x<1340;i++){const w=70+rnd(seed+i)*90,h=120+rnd(seed+i+9)*230;R(g,x,y-h,w,h,fill);if(rnd(seed+i+3)>.6)R(g,x+w*.4,y-h-26,5,26,fill);x+=w+rnd(seed+i+5)*8}}
function carS(g,x,y,s,col,o){o=o||{};const q=G(g,{transform:`translate(${x} ${y}) scale(${(o.flip?-1:1)*s} ${s})`});
 E('ellipse',{cx:0,cy:2,rx:92,ry:8,fill:'#000',opacity:.3},q);
 P(q,'M-90,-14 L-90,-44 Q-84,-52 -56,-56 L-34,-86 Q-30,-92 -20,-92 L44,-92 Q56,-92 62,-84 L80,-56 Q92,-52 92,-40 L92,-14Z',col,{stroke:'#1a1a22','stroke-width':3,'stroke-linejoin':'round'});
 P(q,'M-30,-82 L-48,-58 L-10,-58 L-10,-82Z M0,-82 L0,-58 L60,-58 L44,-82Z','#9ec9e0',{opacity:.85,stroke:'#1a1a22','stroke-width':2});
 for(const cx of[-52,54]){C(q,cx,-12,19,'#15151a');C(q,cx,-12,9,'#9a9aa6')}
 if(o.lights)for(const dx of[88]){E('ellipse',{cx:dx,cy:-34,rx:7,ry:5,fill:'#fff6c8'},q);P(q,'M92,-36 L330,-90 L330,10Z','url(#gCone)',{opacity:.6})}
 return q}
function lampPost(g,x,y,h,on){R(g,x-3,y-h,6,h,'#2a2c34');R(g,x-3,y-h,40,5,'#2a2c34');const l=C(g,x+34,y-h+10,9,on?'#fff3b0':'#6a6c74');if(on)C(g,x+34,y-h+10,70,'url(#gLamp)',{opacity:.55});return l}
function sign(g,x,y,w,h,txt,bg,fg,fs,o){o=o||{};R(g,x-w/2,y-h/2,w,h,bg,{rx:o.rx==null?6:o.rx,stroke:o.stroke||'#0006','stroke-width':3});return T(g,x,y+(fs||28)*.36,txt,fs||28,fg,Object.assign({'letter-spacing':2},o.t||{}))}
function neonText(g,x,y,txt,fs,col,o){C(g,x,y-fs*.3,fs*txt.length*.42,'url(#gNeon)',{opacity:.7});T(g,x,y,txt,fs,'#fff',Object.assign({stroke:col,'stroke-width':fs*.12,'paint-order':'stroke fill','letter-spacing':6},o||{}));}

/* ---------- STUDIO: Coach Dex's hideout / recording room ---------- */
LOC.studio=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const gm=p.skin==='game';
 R(f,-100,-100,1480,860,pk(p,'#2b2f3d','#3b4a8a'));R(f,-100,-100,1480,860,'url(#gWallShade)');
 for(let x=-40;x<1320;x+=80)R(f,x,0,3,FLOORY,'#000',{opacity:.14});            // wall panels
 ground(f,FLOORY+30,pk(p,'#3a3023','#5a4636'));R(f,-100,FLOORY,1480,34,pk(p,'#171a22','#2a2f55'));
 // neon sign
 const sg=G(m);neonText(sg,640,126,'HOW TO SURVIVE',48,'#ff2f92');T(sg,640,160,'GAME  vs  REAL LIFE',19,'#9ff2ff',{'letter-spacing':9,'font-weight':800});
 // shelves with survival junk
 for(const sx of[130,1090]){R(m,sx-110,250,220,8,'#5b4129');R(m,sx-110,380,220,8,'#5b4129');
  R(m,sx-90,214,30,36,'#c9d1d8',{rx:4});R(m,sx-90,206,30,8,'#d9302a');                       // can
  R(m,sx-40,222,16,28,'#e8c24a',{rx:3});C(m,sx-32,216,8,'#fff3b0');                          // flashlight
  R(m,sx+10,226,44,24,'#2a6a3a',{rx:4});T(m,sx+32,244,'MRE',14,'#fff');                       // ration
  P(m,`M${sx+70},250 l16,-40 l16,40Z`,'#ff7a1c',{stroke:'#241810','stroke-width':3});          // cone
  C(m,sx-60,350,22,'#ffd23a',{stroke:'#241810','stroke-width':3});R(m,sx-84,350,48,28,'#ffd23a');C(m,sx-60,350,22,'#ffd23a');   // helmet
  R(m,sx-16,334,70,46,'#3d4a58',{rx:5});T(m,sx+19,364,'FIRST AID',12,'#fff');
  P(m,`M${sx+66},380 l10,-34 l10,34Z`,'#f2c230');}
 // poster
 R(m,540,250,200,0,'#000');                                                                    // (placeholder keeps z-order stable)
 // floor lamp glow
 C(m,1010,330,300,'url(#gSpot)',{opacity:.28});
 // desk + mic (near)
 R(n,300,610,680,120,pk(p,'#2a1f16','#4a3322'));R(n,300,606,680,10,pk(p,'#6a4a2c','#8a6440'));
 // ring light + camera hint on the left
 return (u,t,bt)=>{}};

/* ---------- OFFICE: corridor with elevator + stairwell, elevator interior, stairwell ---------- */
LOC.office=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'floor';const gm=p.skin==='game';
 const wall=pk(p,'#8c8f94','#c9d8f2'),dark=pk(p,'#3a3f48','#506090'),floor=pk(p,'#4a4a50','#7a8aa8'),metal=pk(p,'#9aa1aa','#dbe6f5');
 let uf=()=>{};
 if(v==='floor'){
  R(f,-100,-100,1480,700,wall);R(f,-100,-100,1480,700,'url(#gWallShade)');ground(f,FLOORY,floor);
  for(let x=-40;x<1320;x+=140)R(f,x,FLOORY,4,200,'#000',{opacity:.18});
  R(f,-100,FLOORY-6,1480,10,dark);
  // ceiling lights
  const lights=[];for(let i=0;i<5;i++){const lx=140+i*250;R(f,lx-70,0,140,16,'#2a2d34');lights.push(R(f,lx-70,16,140,10,pk(p,'#fff6d0','#ffffff'),{opacity:.95}))}
  // elevator (left)
  const ex=300,ew=210,eh=320,ey=FLOORY-eh;R(m,ex-ew/2-14,ey-18,ew+28,eh+18,dark);R(m,ex-ew/2,ey,ew,eh,metal);
  const inside=R(m,ex-ew/2,ey,ew,eh,'#10131a');
  const dl=R(m,ex-ew/2,ey,ew/2,eh,metal,{stroke:'#0008','stroke-width':3}),dr=R(m,ex,ey,ew/2,eh,metal,{stroke:'#0008','stroke-width':3});
  const disp=R(m,ex-34,ey-62,68,34,'#050607',{rx:5});const dn=T(m,ex,ey-36,'9',28,'#ff3a2a',{'font-family':'JetBrains Mono, monospace'});
  const up=P(m,`M${ex+ew/2+34},${ey+110} l16,-26 l16,26Z`,'#ffd23a');const dwn=P(m,`M${ex+ew/2+34},${ey+138} l16,26 l16,-26Z`,'#ffd23a',{opacity:.4});
  // stairwell door (right)
  const sx=930,sw=170,sh=320,sy=FLOORY-sh;R(m,sx-sw/2-12,sy-14,sw+24,sh+14,dark);R(m,sx-sw/2,sy,sw,sh,pk(p,'#4d6b4a','#7ad07a'),{stroke:'#0009','stroke-width':3});
  R(m,sx-sw/2+18,sy+30,sw-36,90,pk(p,'#9ec9e0','#d8f4ff'),{opacity:.85});R(m,sx+sw/2-26,sy+170,10,34,'#d0d6dc',{rx:4});
  const ex2=sign(m,sx,sy-52,150,36,'STAIRS',pk(p,'#1c8a3a','#2bd05a'),'#fff',24);
  // exit running man icon (simple)
  // floor mark arrows
  P(m,`M${sx-20},${FLOORY+34} h40 l-20,-20Z`,'#ffd23a',{opacity:.5});
  uf=(u,t,bt)=>{const o=p.open==null?0:p.open;const k=ease(clamp((u-o)/.25));const op=p.state==='open'?1:p.state==='opening'?k:0;
   A(dl,{width:ew/2*(1-op)});A(dr,{x:ex+ew/2*op+0,width:ew/2*(1-op)});
   if(p.state==='zombies'){A(dl,{width:ew/2*.15});A(dr,{x:ex+ew/2*.85,width:ew/2*.15})}
   if(p.dark&&p.flicker)lights.forEach((l,i)=>A(l,{opacity:Math.sin(t*(11+i*3))>.2?.95:.05}));
   if(p.dark)A(f,{opacity:.55+.35*(Math.sin(t*9)>0?1:0)})};
 }else if(v==='elev'){ // inside the elevator, doors straight ahead
  R(f,-100,-100,1480,860,pk(p,'#6d6f76','#9fb0d0'));R(f,100,40,1080,600,pk(p,'#9097a0','#dbe6f5'),{stroke:'#0007','stroke-width':6});
  const ex=640,ew=520,eh=400,ey=160;R(f,-100,560,1480,200,pk(p,'#3a3b42','#6c7a9a'));
  const behind=R(m,ex-ew/2,ey,ew,eh,'#0b0d12');
  const hz=horde(m,{n:5,x0:ex-170,x1:ex+170,y:ey+eh-8,s:1.25,seed:p.seed||3,jit:30,yj:10,col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')});
  const dl=R(m,ex-ew/2,ey,ew/2,eh,pk(p,'#b9c0c9','#eaf2ff'),{stroke:'#0008','stroke-width':4}),dr=R(m,ex,ey,ew/2,eh,pk(p,'#b9c0c9','#eaf2ff'),{stroke:'#0008','stroke-width':4});
  const pn=R(m,ex+ew/2+40,ey+60,90,250,'#1b1d22',{rx:10});const disp=R(m,ex-44,ey-62,88,42,'#050607',{rx:6});const dn=T(m,ex,ey-30,'9',34,'#ff3a2a',{'font-family':'JetBrains Mono, monospace'});
  for(let i=0;i<6;i++)C(m,ex+ew/2+85,ey+90+i*34,10,i===0?'#ffd23a':'#8a8f98');
  const fl=p.floors||[9,9];
  uf=(u,t,bt)=>{const k=ease(clamp((u-(p.open==null?2:p.open))/.12));const op=p.state==='open'?1:(p.state==='opening'?k:0);
   A(dl,{width:ew/2*(1-op)});A(dr,{x:ex+ew/2*op,width:ew/2*(1-op)});
   const cur=Math.round(lerp(fl[0],fl[1],clamp(u/ (p.cd==null?.8:p.cd))));dn.textContent=p.dead?'--':String(cur);
   if(p.flicker)A(f,{opacity:Math.sin(t*17)>-.2?1:.25});hz.upd(u,t,bt)};
 }else if(v==='stairs'){ // stairwell, side view: flights zig-zag
  R(f,-100,-100,1480,860,pk(p,'#767a80','#b9c9ea'));R(f,-100,-100,1480,860,'url(#gWallShade)');
  for(let i=0;i<14;i++){const x=80+i*92,y=620-i*38;P(m,`M${x},${y} l92,-38 l0,${760-y} l-92,0Z`,pk(p,'#50545c','#8da0cc'),{stroke:'#0006','stroke-width':3});R(m,x,y,92,8,pk(p,'#8d929a','#dfe9ff'))}
  R(m,-100,640,1480,200,'#000',{opacity:.35});
  // railing
  for(let i=0;i<14;i++){const x=80+i*92,y=620-i*38-8;R(m,x-2,y-92,5,92,'#2a2d34');}
  E('path',{d:'M80,528 L1370,36',stroke:'#2a2d34','stroke-width':7,fill:'none'},m);
  const dnum=T(m,1080,p.nonum?-200:90,'FLOOR 9',34,pk(p,'#ffd23a','#ffe066'),{'font-family':'JetBrains Mono, monospace','letter-spacing':3});
  uf=(u,t,bt)=>{A(dnum,{opacity:.9})};
 }else if(v==='lobby'){ // glass lobby full of zombies seen from above/stairs
  R(f,-100,-100,1480,860,pk(p,'#3a4048','#aebfe0'));ground(f,FLOORY,pk(p,'#2b2d33','#7886a8'));
  for(let i=0;i<6;i++)R(m,60+i*200,70,150,470,pk(p,'#9ec9e0','#d8f4ff'),{opacity:.4,stroke:'#0008','stroke-width':6});
  const hz=horde(m,{n:p.n||9,x0:140,x1:1140,y:FLOORY+30,s:1.25,seed:7,jit:60,yj:60,to:p.drift||0,col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')});
  uf=(u,t,bt)=>hz.upd(u,t,bt)}
 return (u,t,bt)=>uf(u,t,bt)};

/* ---------- STREET ---------- */
LOC.street=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const gm=p.skin==='game';const v=p.v||'wide';const tm=p.time||'dusk';
 const sky=tm==='night'?'url(#gSkyNight)':tm==='dusk'?'url(#gSkyDusk)':gm?'url(#gSkyDay)':'url(#gSkyReal)';
 R(f,-100,-100,1480,700,sky);
 if(tm==='night'){stars(f,60,260,3)}
 skylineFar(f,FLOORY-20,pk(p,tm==='night'?'#0a1022':tm==='dusk'?'#3a2a4a':'#6c7b88','#8aa8e8'),11);
 // mid buildings
 const bc=pk(p,tm==='night'?'#141a2a':'#4a4650','#7a6ac8');let x=-30,i=0;while(x<1320){const w=150+rnd(i*3)*90,h=200+rnd(i*7+1)*170;bldg(m,x,FLOORY+6,w,h,mix(bc,'#000000',rnd(i)*.25),pk(p,'#1c2028','#3a3f7a'),i*11,{lit:'#ffd27a',dark:tm==='night'?.55:.8});x+=w+6+rnd(i)*10;i++}
 ground(m,FLOORY+10,pk(p,tm==='night'?'#1a1d24':'#34363c','#6a6f86'),.5);
 R(m,-100,FLOORY+10,1480,16,pk(p,'#585a62','#9aa0c0'));                                      // curb
 for(let k=0;k<10;k++)R(m,k*150-30+((p.road||0)%150),FLOORY+92,80,8,'#e8e0a0',{opacity:.7});
 // parked / crashed cars
 carS(m,170,FLOORY+30,.9,pk(p,'#8a3a3a','#e04a4a'));carS(m,1100,FLOORY+36,.95,pk(p,'#3a5a8a','#4a8ae0'),{flip:1});
 if(v==='edge'){R(n,-100,0,200,760,pk(p,'#2a2c32','#5a5f80'));R(n,1180,0,200,760,pk(p,'#2a2c32','#5a5f80'))}
 if(tm!=='day')lampPost(m,640,FLOORY+20,250,true);
 let hz=null;if(p.horde!==false){hz=horde(m,{n:p.n||8,x0:p.hx0==null?420:p.hx0,x1:p.hx1==null?860:p.hx1,y:FLOORY+44,s:p.hs||.85,seed:5,jit:50,to:p.hto==null?0:p.hto,col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')})}
 // dust / ash
 const ash=[];for(let k=0;k<22;k++)ash.push(C(n,0,0,1.6+rnd(k)*1.8,'#fff',{opacity:.4}));
 return (u,t,bt)=>{if(hz)hz.upd(u,t,bt);ash.forEach((c,k)=>A(c,{cx:((rnd(k)*1400+t*(14+rnd(k+4)*20))%1400)-60,cy:(rnd(k+9)*620+t*(10+rnd(k+3)*14))%640}))}};

/* ---------- HOME: apartment room with a wardrobe (closet), two doors, a window ---------- */
LOC.home=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'closet';const tm=p.time||'day';
 const wall=pk(p,tm==='night'?'#2a2c40':'#8a7a6a','#d8b8a0'),fl=pk(p,'#4a3524','#9a7048');
 R(f,-100,-100,1480,700,wall);for(let x=-40;x<1320;x+=64)R(f,x,0,26,FLOORY,'#000',{opacity:.06});R(f,-100,-100,1480,700,'url(#gWallShade)');
 ground(f,FLOORY,fl);R(f,-100,FLOORY-8,1480,14,pk(p,'#2a1c12','#6a4a30'));
 // window
 const wx=v==='two'?640:1010,wy=120;R(m,wx-110,wy,220,230,'#0006');R(m,wx-100,wy+10,200,210,tm==='night'?'#0a1430':pk(p,'#b8d4e8','#8fd0ff'));
 L(m,wx,wy+10,wx,wy+220,'#fff',6);L(m,wx-100,wy+115,wx+100,wy+115,'#fff',6);
 if(tm==='night'){stars(m,10,10,5);C(m,wx+40,wy+60,16,'#f3f1e6')}
 // curtains
 P(m,`M${wx-124},${wy-8} L${wx-90},${wy-8} L${wx-100},${wy+250} L${wx-124},${wy+250}Z`,pk(p,'#7a2a3a','#e06a7a'));P(m,`M${wx+124},${wy-8} L${wx+90},${wy-8} L${wx+100},${wy+250} L${wx+124},${wy+250}Z`,pk(p,'#7a2a3a','#e06a7a'));
 let uf=()=>{};
 if(v==='closet'){const cx=330,cw=300,ch=380,cy=FLOORY-ch;R(m,cx-cw/2,cy,cw,ch,pk(p,'#5a3a22','#b07a46'),{stroke:'#241810','stroke-width':4});
  const open=p.closet==='open';
  const dl=R(m,cx-cw/2+10,cy+10,cw/2-10,ch-20,pk(p,'#6a4628','#c08a52'),{stroke:'#241810','stroke-width':3}),dr=R(m,cx,cy+10,cw/2-10,ch-20,pk(p,'#6a4628','#c08a52'),{stroke:'#241810','stroke-width':3});
  R(m,cx-12,cy+ch*.5,6,30,'#e8c24a',{rx:2});R(m,cx+6,cy+ch*.5,6,30,'#e8c24a',{rx:2});
  const inside=open?R(m,cx-cw/2+10,cy+10,cw-20,ch-20,'#0b0809'):null;if(open){m.insertBefore(inside,dl);A(dl,{width:30});A(dr,{x:cx+cw/2-40,width:30})}
  p._closet={cx,cy,cw,ch};
  mkProp(m,{t:'sofa',x:900,y:FLOORY+34,s:1.1,skin:p.skin});
 }else if(v==='two'){for(const dx of[170,1110]){R(m,dx-70,FLOORY-300,140,300,'#0006');R(m,dx-62,FLOORY-292,124,292,pk(p,'#6a4628','#c08a52'),{stroke:'#241810','stroke-width':3});C(m,dx+(dx<640?40:-40),FLOORY-140,7,'#e8c24a');
   sign(m,dx,FLOORY-330,110,30,'EXIT',pk(p,'#1c8a3a','#2bd05a'),'#fff',18)}
  mkProp(m,{t:'sofa',x:640,y:FLOORY+36,s:1.2,skin:p.skin})}
 else if(v==='bed'){R(m,700,FLOORY-90,420,90,pk(p,'#8a8aa0','#b8c0e8'),{rx:10,stroke:'#241810','stroke-width':3});R(m,700,FLOORY-130,120,60,pk(p,'#e8e8f0','#fff'),{rx:14,stroke:'#241810','stroke-width':3})}
 // ember glow
 if(tm==='night')C(m,640,360,420,'url(#gLamp)',{opacity:.12});
 return (u,t,bt)=>uf(u,t,bt)};

/* ---------- HALL: doorway chokepoint (door leaf opens/closes), corridor beyond ---------- */
LOC.hall=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const gm=p.skin==='game';
 R(f,-100,-100,1480,700,pk(p,'#64666c','#b0c0e8'));R(f,-100,-100,1480,700,'url(#gWallShade)');ground(f,FLOORY,pk(p,'#3c3a38','#8896b8'));
 const dx=640,dw=230,dh=360,dy=FLOORY-dh;R(m,dx-dw/2-16,dy-16,dw+32,dh+16,pk(p,'#2a2220','#6a5a8a'));
 const beyond=R(m,dx-dw/2,dy,dw,dh,pk(p,'#141418','#1a1a30'));
 const hz=p.horde===false?null:horde(m,{n:p.n||6,x0:dx-70,x1:dx+70,y:FLOORY+12,s:.85,seed:9,jit:20,yj:10,to:p.hto||0,col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')});
 const leaf=R(m,dx-dw/2,dy,dw,dh,pk(p,'#7a5a3a','#c9985a'),{stroke:'#241810','stroke-width':4});const knob=C(m,dx+dw/2-24,FLOORY-170,9,'#e8c24a');
 R(m,dx-dw/2+22,dy+30,dw-44,110,'#0003');
 sign(m,dx,dy-48,140,34,'EXIT',pk(p,'#1c8a3a','#2bd05a'),'#fff',20);
 return (u,t,bt)=>{const dm=p.door||'closed';let k=dm==='open'?1:dm==='closed'?0:dm==='closing'?1-ease(clamp(u/.35)):dm==='opening'?ease(clamp(u/.35)):0;
  A(leaf,{width:dw*(1-k*.85),x:dx-dw/2});A(knob,{cx:dx-dw/2+dw*(1-k*.85)-24,opacity:1-k*.4});if(hz)hz.upd(u,t,bt);
  if(p.bang&&dm==='closed'){const s=Math.sin(t*22)>.6?3:0;A(leaf,{x:dx-dw/2+s})}}};

/* ---------- MARKET: supermarket aisle ---------- */
LOC.market=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,pk(p,'#8a8e92','#cfe0f8'));ground(f,FLOORY,pk(p,'#5a5c60','#9fb0d0'));
 for(let x=-60;x<1340;x+=120)R(f,x,0,4,FLOORY,'#000',{opacity:.12});
 for(let i=0;i<6;i++){const lx=100+i*220;R(f,lx-60,0,120,14,'#2a2d34');R(f,lx-60,14,120,8,'#fff',{opacity:.9})}
 sign(m,640,118,300,44,'SUPERMARKET',pk(p,'#d9302a','#ff5a4a'),'#fff',28);
 for(const sx of[-40,330,700,1070]){R(m,sx,230,250,330,pk(p,'#6a6c74','#a8b4d8'),{stroke:'#0008','stroke-width':3});
  for(let r=0;r<4;r++){R(m,sx,262+r*78,250,6,'#2a2d34');for(let c=0;c<7;c++){const col=['#e04a4a','#4a8ae0','#ffd23a','#3ac06a','#e08a2a','#a84ae0'][(r*3+c+sx)%6];R(m,sx+10+c*34,262+r*78-46,26,46,col,{rx:3,stroke:'#0007','stroke-width':1.5})}}}
 sign(m,330,196,190,34,'WATER & FOOD',pk(p,'#1c6a9a','#4aaaf0'),'#fff',18);sign(m,1070,196,190,34,'TVs & TOYS',pk(p,'#8a3a9a','#d08af0'),'#fff',18);
 return ()=>{}};

/* ---------- LOFT: night hideout with two exits and a tin-can alarm ---------- */
LOC.loft=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,pk(p,'#1a1c28','#3a3a70'));for(let r=0;r<12;r++)for(let c=0;c<24;c++)R(f,c*60-30+(r%2)*30,r*48,56,44,'#000',{opacity:.12,stroke:'#0008','stroke-width':2});
 ground(f,FLOORY,pk(p,'#24221f','#554a6a'));
 // window with moon
 R(m,960,110,180,200,'#05070d',{stroke:'#0009','stroke-width':8});R(m,968,118,164,184,'#0b1430');C(m,1060,180,26,'#f3f1e6');L(m,1050,118,1050,302,'#05070d',6);
 // exit 1: door left. exit 2: fire-escape ladder right
 R(m,150,FLOORY-290,150,290,'#05070d');R(m,158,FLOORY-282,134,282,pk(p,'#3a4a5a','#6a7aa0'),{stroke:'#0009','stroke-width':3});sign(m,225,FLOORY-318,100,28,'EXIT 1',pk(p,'#1c8a3a','#2bd05a'),'#fff',16);
 R(m,1070,FLOORY-300,12,300,'#6a6e76');R(m,1140,FLOORY-300,12,300,'#6a6e76');for(let i=0;i<9;i++)R(m,1070,FLOORY-280+i*30,82,6,'#6a6e76');sign(m,1111,FLOORY-336,100,28,'EXIT 2',pk(p,'#1c8a3a','#2bd05a'),'#fff',16);
 // lantern
 const lg=C(m,640,330,320,'url(#gLamp)',{opacity:.35});R(m,616,FLOORY-30,48,30,'#2a2d34',{rx:6});R(m,626,FLOORY-62,28,34,'#ffd27a',{rx:8,opacity:.95});
 // tin-can alarm line across the entrance
 if(p.cans!==false){L(m,170,FLOORY-60,520,FLOORY-60,'#c9a86a',2.5);for(const cx of[250,330,410,480])mkProp(m,{t:'can',x:cx,y:FLOORY-58,s:.9,col:'#d9302a'});}
 return (u,t,bt)=>{A(lg,{opacity:.3+.07*Math.sin(t*7)+.03*Math.sin(t*13)})}};

/* ---------- HIGHWAY: night traffic jam ---------- */
LOC.highway=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,'url(#gSkyNight)');stars(f,50,220,9);skylineFar(f,420,pk(p,'#0a1022','#2a3a7a'),21);
 ground(f,FLOORY-90,pk(p,'#17191f','#3a3f66'),.4);
 // lanes converging to a vanishing point
 const vp=[640,430];for(const x of[-300,160,640,1120,1580])L(m,x,760,lerp(x,vp[0],.82),lerp(760,vp[1],.82),'#e8e0a0',3,{opacity:.5,'stroke-dasharray':'14 14'});
 // cars in jam with lights
 const cars=[[190,520,.7],[470,500,.62],[760,500,.62],[1050,520,.7],[330,470,.46],[640,462,.44],[940,470,.46],[1180,466,.4],[120,458,.36]];
 cars.forEach(([x,y,s],i)=>{const q=carS(m,x,y,s,['#7a2a2a','#2a4a7a','#6a6a72','#3a6a4a','#8a6a2a'][i%5]);const h=C(m,x-70*s,y-34*s,34*s,'url(#gRed)',{opacity:.85});C(m,x+70*s,y-34*s,34*s,'url(#gRed)',{opacity:.85});})
 const hz=horde(m,{n:p.n||8,x0:300,x1:980,y:FLOORY+20,s:.7,seed:4,jit:60,yj:20,col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')});
 // horn flicker overlay of brake lights
 return (u,t,bt)=>{hz.upd(u,t,bt)}};

/* ---------- RAIL: tracks at night with a red signal lamp ---------- */
LOC.rail=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,'url(#gSkyNight)');stars(f,70,320,13);C(f,240,150,34,'#f3f1e6');C(f,240,150,90,'#9bc4ff',{opacity:.12});
 skylineFar(f,470,pk(p,'#0a1022','#2a3a7a'),31);ground(f,FLOORY-60,pk(p,'#16181d','#34385a'),.4);
 const vp=[640,470];
 for(const x0 of[420,860]){L(m,x0,760,lerp(x0,vp[0],.9),lerp(760,vp[1],.9),'#9aa0aa',7)}
 for(let i=0;i<16;i++){const k=i/15,y=lerp(480,760,k*k),w=lerp(60,520,k*k);R(m,640-w/2,y,w,lerp(3,16,k*k),'#3a2a1c')}
 const lampx=1010,lampy=FLOORY-40;R(m,lampx-4,lampy-190,8,190,'#2a2c34');R(m,lampx-18,lampy-230,36,54,'#16181d',{rx:6});const rl=C(m,lampx,lampy-212,12,'#ff2a2a');const rg=C(m,lampx,lampy-212,90,'url(#gRed)',{opacity:.7});
 const poles=[];for(const px of[150,380]){R(m,px-3,250,6,330,'#16181d');L(m,px-60,290,px+60,290,'#16181d',5)}
 return (u,t,bt)=>{const k=.55+.45*Math.sin(t*3);A(rg,{opacity:.4+.4*k});A(rl,{opacity:.6+.4*k})}};

/* ---------- ROOF: helipad at sunset ---------- */
LOC.roof=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,'url(#gSkyDusk)');sunDisc(f,980,330,48);skylineFar(f,520,pk(p,'#2a1c3a','#7a5ab0'),41);
 ground(m,FLOORY+10,pk(p,'#4a4c52','#9aa0c0'),.5);R(m,-100,FLOORY,1480,14,pk(p,'#8a8c94','#d0d6f0'));
 // helipad
 E('ellipse',{cx:640,cy:FLOORY+64,rx:340,ry:62,fill:'none',stroke:'#ffd23a','stroke-width':8},m);T(m,640,FLOORY+88,'H',90,'#ffd23a',{'font-weight':900});
 // water tank + AC
 R(m,100,FLOORY-150,130,150,pk(p,'#6a4a3a','#b07a5a'),{stroke:'#241810','stroke-width':3});P(m,'M96,'+(FLOORY-150)+' L165,'+(FLOORY-190)+' L234,'+(FLOORY-150)+'Z','#3a2a22');
 R(m,1060,FLOORY-70,150,70,pk(p,'#8a8e94','#c8d0e8'),{stroke:'#241810','stroke-width':3});C(m,1100,FLOORY-36,22,'#3a3f48');C(m,1170,FLOORY-36,22,'#3a3f48');
 // helicopter (flies by param)
 const hel=G(m);R(hel,-70,-26,130,46,'#2a4a6a',{rx:20,stroke:'#0a1420','stroke-width':3});P(hel,'M54,-14 L150,-26 L150,-8 L54,4Z','#2a4a6a',{stroke:'#0a1420','stroke-width':3});R(hel,-50,-18,50,26,'#9ec9e0',{rx:8});L(hel,-4,-40,-4,-26,'#0a1420',5);const rot=R(hel,-110,-46,220,5,'#0a1420',{rx:2,opacity:.8});L(hel,-40,24,40,24,'#0a1420',4);
 return (u,t,bt)=>{const h=p.heli||{};const k=h.to?lerp(0,1,u):0;const x=h.from?lerp(h.from[0],h.to[0],k):1000,y=h.from?lerp(h.from[1],h.to[1],k):200;A(hel,{transform:`translate(${x} ${y}) scale(${h.s||1})`,opacity:h.hide?0:1});A(rot,{width:220*Math.abs(Math.cos(t*38))+10,x:-110+110*(1-Math.abs(Math.cos(t*38)))})}};

/* ---------- DOCK: river pier at dawn, the boat ---------- */
LOC.dock=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,700,'url(#gSkyDawn)');sunDisc(f,640,430,60);
 skylineFar(f,420,pk(p,'#3a3358','#7a5ab0'),51);
 const wy=420;R(m,-100,wy,1480,350,'url(#gWater)');const rip=[];for(let i=0;i<14;i++)rip.push(R(m,0,wy+14+i*20,60+rnd(i)*90,3,'#fff',{rx:1.5,opacity:.25}));
 // boat
 const b=G(m);const bx=p.boatx==null?900:p.boatx;P(b,'M-190,0 L190,0 L150,56 L-150,56Z','#f1ece0',{stroke:'#241810','stroke-width':4,'stroke-linejoin':'round'});R(b,-190,-4,380,10,'#d9302a');R(b,-60,-80,150,80,'#e8e4da',{stroke:'#241810','stroke-width':4,rx:6});R(b,-44,-64,40,32,'#9ec9e0');R(b,6,-64,40,32,'#9ec9e0');L(b,120,0,120,-120,'#241810',5);P(b,'M120,-120 L190,-6 L120,-6Z','#fff',{stroke:'#241810','stroke-width':3});
 T(b,0,36,'PIER 8',24,'#241810',{'letter-spacing':4});
 // pier planks (near)
 R(n,-100,560,1480,260,pk(p,'#5a3f27','#a8763e'));for(let x=-60;x<1400;x+=110)R(n,x,560,5,260,'#000',{opacity:.3});R(n,-100,556,1480,10,pk(p,'#3a2a1c','#6a4828'));
 for(const px of[90,450,810,1170]){R(n,px-10,480,20,90,'#2a1c12');C(n,px,478,12,'#2a1c12')}
 const fog=[];for(let i=0;i<6;i++)fog.push(E('ellipse',{cx:0,cy:wy-10+i*10,rx:260,ry:26,fill:'#fff',opacity:.1},m));
 return (u,t,bt)=>{A(b,{transform:`translate(${bx} ${wy+10+Math.sin(t*1.3)*4}) rotate(${Math.sin(t*1.1)*.8}) scale(${p.boats||1})`});rip.forEach((r,i)=>A(r,{x:((rnd(i)*1300+t*(16+i))%1400)-100}));fog.forEach((e,i)=>A(e,{cx:((rnd(i+3)*1300+t*8)%1500)-100}))}};
