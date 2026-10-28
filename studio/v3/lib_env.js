/* ===== scene library (environment scenes). Each: LIB[name]=(Z,p)=>upd(u,t,bt). Z={far,mid,near,hud} ===== */
const LIB={};
function defsLib(){document.getElementById('defs').insertAdjacentHTML('beforeend',`
 <linearGradient id="gDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fb8"/><stop offset=".6" stop-color="#8fc4e0"/><stop offset="1" stop-color="#e6f1ea"/></linearGradient>
 <linearGradient id="gDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".45" stop-color="#b86a8a"/><stop offset=".8" stop-color="#ffa65c"/><stop offset="1" stop-color="#ffd9a0"/></linearGradient>
 <linearGradient id="gStorm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1412"/><stop offset=".5" stop-color="#27403c"/><stop offset="1" stop-color="#4a6a60"/></linearGradient>
 <linearGradient id="gSeaDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a9ab8"/><stop offset="1" stop-color="#0f4a6a"/></linearGradient>
 <linearGradient id="gSeaDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a7a"/><stop offset=".3" stop-color="#5a5a8a"/><stop offset="1" stop-color="#0c1a36"/></linearGradient>
 <linearGradient id="gSeaStorm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f7a6e"/><stop offset=".4" stop-color="#1e3a38"/><stop offset="1" stop-color="#050d0c"/></linearGradient>
 <linearGradient id="gSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead9a6"/><stop offset="1" stop-color="#b89c62"/></linearGradient>
 <linearGradient id="gWoodDock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a44"/><stop offset="1" stop-color="#3a2a1a"/></linearGradient>`)}
const SKY={day:'gDay',dawn:'gDawn',dusk:'gSunset',night:'gNight',storm:'gStorm'},SEA={day:'gSeaDay',dawn:'gSeaDawn',dusk:'gSeaDusk',night:'gSeaNight',storm:'gSeaStorm'};
function skyFor(f,time){const g=G(f);R(g,-300,-300,1320,1880,'url(#'+(SKY[time]||'gNight')+')');let st=null,cl=null;
 if(time==='night'||time==='dusk')st=stars(g,time==='night'?110:50,520,7);
 if(time==='night')moon(g,560,200,50,true);
 if(time==='dawn'||time==='day')sunDisc(g,time==='dawn'?200:520,time==='dawn'?620:200,time==='dawn'?80:60);
 cl=clouds(g,time==='storm'?100:230,time==='storm'?9:5,time==='storm'?'#1d2c2a':(time==='day'?'#ffffff':(time==='dawn'?'#e0808a':'#8a4a68')),3);
 return {upd(t){st&&twinkle(st,t);driftClouds(cl,t)}}}
function rainFx(g,n){const a=[];for(let i=0;i<n;i++)a.push(L(g,0,0,-14,40,'#cfe6ff',1.6,{opacity:.4}));return a}
function updRain(a,t,sp){a.forEach((l,i)=>{const x=((rnd(i)*900+t*120*(sp||1))%900)-90,y=((rnd(i+5)*1400+t*1500*(sp||1))%1400)-60;A(l,{x1:x,y1:y,x2:x-14,y2:y+40})})}
function flashFx(g){return R(g,-300,-300,1320,1880,'#eaf4ff',{opacity:0})}
function updFlash(r,t,on){if(!on){A(r,{opacity:0});return}const v=Math.sin(t*5.3)*Math.sin(t*1.9+1);A(r,{opacity:v>.94?(v-.94)*1.2:0})}
function flames(g,x,y,w,n,seed){const a=[];for(let i=0;i<n;i++){const e=P(g,'M0,0 Q-14,-30 0,-70 Q14,-30 0,0Z',i%2?'#ffb02a':'#ff5a1a',{opacity:.9});a.push([e,x+(rnd(i+seed)-.5)*w,y,i])}return a}
function updFlames(a,t,k){a.forEach(([e,x,y,i])=>{const s=(.6+.5*Math.abs(Math.sin(t*9+i*2)))*(k==null?1:k);A(e,{transform:`translate(${x} ${y}) scale(${s*1.3} ${s*(1.2+Math.sin(t*13+i))})`})})}

/* ---------------- lhWide ---------------- */
LIB.lhWide=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const time=p.time||'night';
 const sky=skyFor(f,time);const zoom=p.zoom;
 const hy=zoom==='near'?700:(zoom==='far'?560:640);
 R(m,-300,hy,1320,900,'url(#'+SEA[time]+')');
 if(time!=='storm')R(m,-300,hy-2,1320,3,time==='day'?'#fff':'#ffcf9a',{opacity:.5});
 const wv=waves(m,hy+16,18,time==='day'?'#ffffff':'#9bc4ff',3);
 const lx=zoom==='near'?440:(zoom==='far'?540:500),lb=hy+(zoom==='near'?150:92),lh=zoom==='near'?640:(zoom==='far'?250:420);
 // distant mainland on the left with crowd specks
 const farland=G(m);P(farland,`M-300,${hy+2} L-300,${hy-26} Q-100,${hy-44} 60,${hy-22} Q160,${hy-8} 240,${hy+2}Z`,time==='day'?'#5a7a6a':'#0b0a14');
 const sandG=G(m);const tide=p.tide;
 if(tide==='low'||tide==='mid'){const w1=tide==='low'?1:.55;
  const y0=hy+(zoom==='far'?26:44),yb=lb-8;
  P(sandG,`M-60,${y0} L${lx-110},${yb-8} L${lx-90},${yb+10} L-60,${y0+(zoom==='far'?14:30)}Z`,'url(#gSand)',{opacity:w1});
  P(sandG,`M-60,${y0+4} L${lx-110},${yb-5} L${lx-100},${yb-1} L-60,${y0+10}Z`,'#fff',{opacity:.25*w1});
  for(let i=0;i<8;i++){const q=i/8;L(sandG,lerp(-40,lx-120,q),lerp(y0+8,yb,q),lerp(-20,lx-110,q),lerp(y0+10,yb+4,q),'#8a7040',2,{opacity:.4*w1})}}
 const rk=G(m);rock(rk,lx,lb-10,zoom==='near'?420:300);
 const lamp=lighthouse(m,lx,lb,lh,{lit:!!p.lit&&!p.dark});
 const ly=lb-lh-lh*.11;
 // beam
 let bm=null;if(p.lit&&p.beam&&!p.dark){C(m,lx,ly,lh*.45,'url(#gGlow)');bm=G(m,{});const w=P(bm,'M0,0 L1500,-120 L1500,120Z','url(#gBeam)',{opacity:.55})}
 // fire + smoke at the sand neck
 let fl=null,sm=null;const fx=lx-118,fy=lb-8;
 if(p.fire){fl=flames(m,fx,fy,70,8,3);C(m,fx,fy-30,70,'url(#gFire)',{opacity:.8})}
 if(p.smoke){sm=smokeCols(m,fx-10,fx+10,fy-20,2,'#1a1a1f',.8)}
 // crowd walking the sandbar
 let zs=[];if(p.crowdOn==='sand'&&(tide==='low'||tide==='mid')){for(let i=0;i<22;i++){const z=zombie(m,0,0,.28+.12*rnd(i),i);zs.push([z,i])}}
 if(p.crowdOn==='shore'){for(let i=0;i<14;i++){const z=zombie(m,-20+i*22,hy-6,.3,i);updZombie(z,0,1,0)}}
 // bodies in the water (storm)
 let bd=[];if(p.bodies){const k=p.bodies*5;for(let i=0;i<k;i++){const g=G(m);P(g,'M-14,0 Q-10,-18 0,-20 Q10,-18 14,0Z','#0a0f0e');C(g,0,-10,2.6,'#ff2a2a');C(g,7,-10,2.6,'#ff2a2a');bd.push([g,i])}}
 // boats on the horizon
 let bt=[];if(p.boats){for(let i=0;i<5;i++){const g=G(m);P(g,'M-30,0 L30,0 L22,12 L-22,12Z','#0a0a12');C(g,0,-10,3,'#ffd27a');C(g,0,-10,16,'url(#gGlow)',{opacity:.8});bt.push([g,i])}}
 // dark / storm overlays
 const dk=p.dark?R(m,-300,-300,1320,1880,'#02040a',{opacity:.86}):null;
 let rain=null,fl2=null;if(p.rain||time==='storm'){rain=rainFx(n,90);fl2=flashFx(n)}
 const wv2=time==='storm'?waves(m,hy+10,26,'#cfe6ff',9):null;
 return (u,t,bt0)=>{sky.upd(t);updWaves(wv,t);if(wv2)updWaves(wv2,t*1.8);
  if(bm){const a=p.swing?lerp(-6,34,ease(clamp((bt0)/1.6))):Math.sin(t*1.2)*7;A(bm,{transform:`translate(${lx} ${ly}) rotate(${a})`})}
  if(fl)updFlames(fl,t,p.fire&&p.dim?.4:1);if(sm)updSmoke(sm,t,520);
  zs.forEach(([z,i])=>{const pr=((t*.035+rnd(i))%1);const x=lerp(-40,lx-130,pr),y=lerp(hy+(zoom==='far'?30:48),lb-6,pr);const s=lerp(.35,.2,pr);updZombie(z,t,1,0);A(z.z,{transform:`translate(${x} ${y}) scale(${s})`})});
  bd.forEach(([g,i])=>{const pr=(t*.05+rnd(i))%1;A(g,{transform:`translate(${lerp(60,lx-90,pr)+Math.sin(t*2+i)*8} ${hy+90+rnd(i+2)*120+Math.sin(t*3+i)*6}) scale(${1.2+rnd(i+4)})`})});
  bt.forEach(([g,i])=>A(g,{transform:`translate(${200+i*140+Math.sin(t+i)*10} ${hy+30+i*22+Math.sin(t*1.5+i)*3}) scale(${.8+i*.12})`}));
  if(rain)updRain(rain,t,1.4);if(fl2)updFlash(fl2,t,p.lightning||time==='storm'&&p.rain)}};

/* ---------------- sea close-ups ---------------- */
LIB.sea=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const k=p.kind||'night';
 const time=k==='storm'?'storm':(k==='boatdot'?'day':(k==='ebb'?'dawn':'night'));
 const sky=skyFor(f,time);const hy=k==='ankle'?420:(k==='storm'?520:600);
 R(m,-300,hy,1320,900,'url(#'+SEA[time]+')');
 const wv=waves(m,hy+16,k==='storm'?30:20,time==='day'?'#fff':'#9bc4ff',5);
 let sd=null;if(k==='ebb'){sd=G(m);for(let i=0;i<5;i++)P(sd,`M${-100+i*260},${hy+120+i*40} q130,-26 260,0 l0,70 l-260,0Z`,'url(#gSand)',{opacity:.95})}
 let ank=null;if(k==='ankle'){R(m,-300,hy+260,1320,700,'#3a8aa0',{opacity:.7});ank=G(m);for(const x of[240,470]){limb(ank,[[x,hy+120],[x+4,hy+330]],54,'#05040a',null);P(ank,`M${x-34},${hy+330} q34,-24 76,0 l0,30 l-76,0Z`,'#05040a')}
  for(let i=0;i<6;i++)E('ellipse',{cx:240+(i%3)*120,cy:hy+372+i*10,rx:80+i*14,ry:10,fill:'none',stroke:'#fff',opacity:.4},m)}
 let bt=null,smk=null;if(k==='boatdot'){bt=G(m);P(bt,'M-18,0 L18,0 L12,8 L-12,8Z','#14141c');R(bt,-6,-12,12,12,'#14141c');smk=smokeCols(f,120,200,hy-4,1,'#2a2a30',.5)}
 const rain=k==='storm'?rainFx(n,110):null,fl=k==='storm'?flashFx(n):null;
 let bm=null,bd=[];if(k==='storm'&&p.beam){bm=G(m,{transform:`translate(640 ${hy-190}) rotate(172)`});P(bm,'M0,0 L1300,-170 L1300,170Z','url(#gBeam)',{opacity:.5})}
 if(k==='storm'&&p.bodies){const nb=p.bodies*5;for(let i=0;i<nb;i++){const g=G(m);const sc=.5+rnd(i+6)*.45;const z=zombie(g,0,0,sc,i);updZombie(z,0,1,0);P(g,'M-60,-14 q20,-14 40,0 t40,0 t40,0 t40,0 l0,60 l-160,0Z','#1e3a38',{opacity:.92,transform:`scale(${1/sc*sc}) `});bd.push([g,i,sc])}}
 const sh=(k==='night'||k==='quiet')?shimmer(m,420,hy+14,16,'#cfe6ff',180):null;
 return (u,t,bt0)=>{sky.upd(t);updWaves(wv,t*(k==='storm'?2:1));if(sh)updShimmer(sh,t);
  if(sd)A(sd,{transform:`translate(0 ${-u*30})`});
  if(bt){A(bt,{transform:`translate(${520-u*60} ${hy+4}) scale(${1+u*.6})`})}if(smk)updSmoke(smk,t,160);
  if(rain){updRain(rain,t,1.6);updFlash(fl,t,true)}if(bm)A(bm,{transform:`translate(640 ${hy-190}) rotate(${172+Math.sin(t*1.1)*10})`});
  bd.forEach(([g,i,sc])=>{const pr=(t*.05+rnd(i))%1;A(g,{transform:`translate(${lerp(-60,760,pr)} ${hy+70+rnd(i+1)*190+Math.sin(t*2+i)*8})`})});
  if(ank)A(ank,{transform:`translate(0 ${Math.sin(t*2)*3})`})}};

/* ---------------- crowd (silhouettes) ---------------- */
LIB.crowd=(Z,p)=>{
 // the horde on the far shore, all ABOVE the caption band; the lighthouse beam sweeps over them
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});
 const sky=skyFor(f,'night');const hy=600;
 R(m,-300,hy,1320,900,'url(#gSeaNight)');
 P(m,`M-300,${hy+36} L-300,${hy-8} Q120,${hy-34} 330,${hy-10} Q560,${hy-38} 1020,${hy-8} L1020,${hy+36}Z`,'#0d0a14');
 let bm=null;if(p.beam){bm=G(m,{transform:'translate(680 130) rotate(152)'});P(bm,'M0,0 L1500,-210 L1500,210Z','url(#gBeam)',{opacity:.5});C(m,680,130,90,'url(#gGlow)')}
 const ref=[];for(let i=0;i<34;i++)ref.push(C(m,rnd(i)*720,hy+60+rnd(i+9)*190,2.6,'#ff3a3a',{opacity:.22}));
 const rows=[[hy+2,.44,24],[hy+26,.56,18],[hy+54,.7,12]];
 const zs=[];let k=0;rows.forEach(([y,s,nn])=>{for(let i=0;i<nn;i++){zs.push(zombie(m,(i+.5)*(760/nn)-20+(rnd(k)-.5)*30,y+rnd(k+3)*8,s,k));k++}});
 return (u,t,bt)=>{sky.upd(t);
  zs.forEach((z,i)=>{const e=clamp((bt-.1-rnd(i)*.5)/.3);updZombie(z,t,e,p.walking?4:2);
   if(p.following){const dx=-u*150*(p.following===2?1:.5);A(z.z,{transform:`translate(${z.x+dx+Math.sin(t*1.6+z.seed)*3} ${z.y-Math.abs(Math.sin(t*4+i))*3}) scale(${z.s})`})}});
  ref.forEach((c,i)=>A(c,{opacity:.12+.2*Math.abs(Math.sin(t*2+i))}));
  if(bm)A(bm,{transform:`translate(680 130) rotate(${p.following?lerp(152,176,u):152+Math.sin(t*.9)*6})`})}};

/* ---------------- dark / blackout ---------------- */
LIB.dark=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid);R(f,-300,-300,1320,1880,'#02040a');
 const stars1=stars(f,40,700,31);const eyes=[];
 if(p.eyes){for(let i=0;i<6;i++){const g=G(m);C(g,0,0,26,'url(#gRed)');C(g,-8,0,4,'#ff2a2a');C(g,8,0,4,'#ff2a2a');eyes.push([g,i])}}
 const lights=[];if(p.engine){for(let i=0;i<5;i++){const g=G(m);C(g,0,0,20,'url(#gGlow)',{opacity:.8});C(g,0,0,4,'#ffd27a');lights.push([g,i])}}
 const fl=p.flash?R(m,-300,-300,1320,1880,'#cfe6ff',{opacity:0}):null;
 return (u,t,bt)=>{twinkle(stars1,t);eyes.forEach(([g,i])=>A(g,{transform:`translate(${100+i*110} ${700+rnd(i)*200})`,opacity:Math.sin(t*2+i)>.2?1:.1}));
  lights.forEach(([g,i])=>A(g,{transform:`translate(${90+i*140+Math.sin(t+i)*14} ${660+i*40})`,opacity:.5+.5*Math.sin(t*3+i)}));
  if(fl)A(fl,{opacity:bt<.12?(1-bt/.12)*.5:0})}};

/* ---------------- boats / dock / pov ---------------- */
function boatShape(g,x,y,s,col){const q=G(g,{transform:`translate(${x} ${y}) scale(${s})`});
 P(q,'M-90,0 L90,0 L70,32 L-74,32Z',col||'#1a1a22');R(q,-30,-40,56,40,col||'#1a1a22');R(q,-4,-110,6,70,col||'#1a1a22');L(q,-4,-108,70,-20,col||'#1a1a22',3);
 R(q,-20,-30,18,16,'#9ac8e8',{opacity:.55});return q}
LIB.boat=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});
 const time=(p.many||p.dock)?'night':'day';const sky=skyFor(f,time);const hy=560;
 R(m,-300,hy,1320,900,'url(#'+SEA[time]+')');const wv=waves(m,hy+16,20,time==='day'?'#fff':'#9bc4ff',2);
 let main=null,man=null;
 if(!p.many){const sc=p.far?.45:(p.near?1.9:1);const by=p.far?hy+14:(p.near?hy+330:hy+150);main=boatShape(m,360,by,sc,'#2a2a34');
  if(p.near||p.mid){man=G(m);const x=360-30*sc,y=by-40*sc;limb(man,[[0,0],[0,-70]],12,'#2f6a76',null);C(man,0,-82,12,'#efcfae',{stroke:'#2a1c13','stroke-width':3});limb(man,[[0,-60],[26,-100]],8,'#2f6a76',null);R(man,16,-122,26,22,'#fff',{rx:4});A(man,{transform:`translate(${x} ${y}) scale(${sc*1.5})`})}}
 const many=[];if(p.many){for(let i=0;i<(p.near?4:9);i++){const q=boatShape(m,0,0,p.near?.9:.45,'#0a0a12');C(q,0,-100,6,'#ffd27a');C(q,0,-100,34,'url(#gGlow)',{opacity:.9});many.push([q,i])}}
 let tow=null;if(p.tow){tow=G(m);boatShape(tow,0,0,.5,'#14141c');boatShape(tow,-360,-8,.8,'#2a2a34');L(tow,-300,-14,-60,-14,'#d9c9a0',3)}
 const rock1=p.dock?(rock(m,640,hy+30,300),lighthouse(m,620,hy+36,300,{lit:true})):null;
 return (u,t,bt)=>{sky.upd(t);updWaves(wv,t);if(main)A(main,{transform:`translate(${360+(p.far?lerp(-40,30,u):p.mid?lerp(-30,20,u):0)+Math.sin(t*1.2)*6} ${(p.far?hy+14:(p.near?hy+330:hy+150))+Math.sin(t*1.7)*5}) scale(${p.far?.45:(p.near?1.9:1)}) rotate(${Math.sin(t*1.1)*1.5})`});
  many.forEach(([q,i])=>A(q,{transform:`translate(${p.dock?lerp(60+i*60,520,clamp(u*1.2)):(60+i*140)+Math.sin(t+i)*12} ${hy+20+i*(p.near?60:24)+Math.sin(t*1.4+i)*4}) scale(${p.near?.9:.45})`}));
  if(tow)A(tow,{transform:`translate(${520-u*100} ${hy+150+Math.sin(t*1.6)*4})`})}};
LIB.dock=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const time=p.night?'night':'day';const sky=skyFor(f,time);const hy=520;
 R(m,-300,hy,1320,900,'url(#'+SEA[time]+')');const wv=waves(m,hy+16,18,time==='day'?'#fff':'#9bc4ff',4);
 // dock planks in perspective
 P(m,'M120,1280 L600,1280 L470,640 L250,640Z','url(#gWoodDock)');for(let i=0;i<14;i++){const y=640+i*i*3.3+i*6;L(m,lerp(250,120,(y-640)/640),y,lerp(470,600,(y-640)/640),y,'#1a1008',3)}
 for(const x of[250,470])R(m,x-8,600,16,70,'#2a1a0c');
 if(p.boat)boatShape(m,640,640,.5,'#1a1a24');
 let lamp=null;if(p.night){lamp=C(m,360,640,200,'url(#gGlow)',{opacity:.6});R(m,352,560,8,90,'#2a1a0c');C(m,356,552,14,'#ffd27a')}
 return (u,t)=>{sky.upd(t);updWaves(wv,t);if(lamp)A(lamp,{opacity:.5+.1*Math.sin(t*6)})}};
LIB.pov=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid);const sky=skyFor(f,'day');R(m,-300,520,1320,900,'url(#gSeaDay)');const wv=waves(m,540,22,'#fff',6);
 const bt=boatShape(m,360,640,1.7,'#2a2a34');const pr=G(m,{transform:'translate(330 560) scale(2.1)'});limb(pr,[[0,0],[0,-70]],12,'#2f6a76',null);C(pr,0,-82,12,'#efcfae',{stroke:'#2a1c13','stroke-width':3});const arm=G(pr);limb(arm,[[0,-60],[26,-100]],8,'#2f6a76',null);R(arm,16,-122,28,22,'#fff',{rx:4});
 // binocular mask
 const mk=E('path',{d:'M-300,-300 H1020 V1580 H-300Z M180,640 a180,180 0 1,0 360,0 a180,180 0 1,0 -360,0Z M540,640 a180,180 0 1,0 360,0 a180,180 0 1,0 -360,0Z',fill:'#000','fill-rule':'evenodd'},Z.hud);
 const ring=E('ellipse',{cx:360,cy:640,rx:178,ry:178,fill:'none',stroke:'#2a2a2a','stroke-width':8},Z.hud);
 L(Z.hud,360,490,360,790,'#fff',1.5,{opacity:.4});L(Z.hud,210,640,510,640,'#fff',1.5,{opacity:.4});
 return (u,t)=>{sky.upd(t);updWaves(wv,t);A(arm,{transform:`rotate(${p.wave?Math.sin(t*7)*22:0} 0 -60)`});A(m,{transform:`translate(${Math.sin(t*.8)*8} ${Math.cos(t*1.1)*6})`})}};

/* ---------------- fire wall, ledge, tide diagram ---------------- */
LIB.fire=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const sky=skyFor(f,'dusk');const hy=560;
 R(m,-300,hy,1320,900,'url(#gSand)');R(m,-300,hy,1320,900,'#2a1608',{opacity:.55});
 const wv=waves(f,hy-4,6,'#ffd9a0',1);
 const fl=flames(m,360,hy+190,640,p.out?4:26,5);C(m,360,hy+120,420,'url(#gFire)',{opacity:p.out?.2:.6});
 const sm=smokeCols(m,100,620,hy+120,5,'#15151a',.8);
 const zs=[];for(let i=0;i<12;i++)zs.push(zombie(m,40+i*58,hy+70+rnd(i)*20,.55,i));
 return (u,t,bt)=>{sky.upd(t);updFlames(fl,t,p.out?.3:(p.dim?.5:1));updSmoke(sm,t,520);zs.forEach((z,i)=>updZombie(z,t,1,2))}};
LIB.ledge=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const sky=skyFor(f,'storm');
 R(m,-300,520,1320,900,'url(#gSeaStorm)');const wv=waves(m,540,24,'#cfe6ff',7);
 const up=G(m,{transform:'translate(0 -210)'});            // whole ledge set lifted ~210px
 lighthouse(up,590,800,480,{});                             // the tower the chain protects
 P(up,'M-100,1500 L-100,800 Q200,720 420,780 Q620,740 820,820 L820,1500Z','#0d1512');P(up,'M-100,800 Q200,720 420,780 Q620,740 820,820 L820,850 Q600,790 420,830 Q200,770 -100,860Z','#27332e');
 for(let i=0;i<7;i++)R(up,-100+i*140,900+(i%2)*60,110,10,'#1a2420',{rx:5,opacity:.8});
 const hand=G(up,{transform:'translate(300 780)'});limb(hand,[[0,200],[10,120],[4,50]],40,'#07090a',null);for(let i=0;i<4;i++)limb(hand,[[-20+i*14,50],[-24+i*14,10]],12,'#07090a',null);
 const chain=G(up);if(p.chain){for(let i=0;i<14;i++)E('ellipse',{cx:40+i*52,cy:830+Math.sin(i*.7)*14,rx:24,ry:14,fill:'none',stroke:'#8a8a92','stroke-width':8},chain);const lk=G(chain,{transform:'translate(360 850)'});R(lk,-26,-8,52,44,'#c9a64a',{rx:7});P(lk,'M-14,-8 v-18 a14,14 0 0 1 28,0 v18','none',{stroke:'#c9a64a','stroke-width':8})}
 const eyes=G(up);C(eyes,330,740,40,'url(#gRed)',{opacity:.9});C(eyes,318,740,5,'#ff2a2a');C(eyes,342,740,5,'#ff2a2a');
 const rain=rainFx(n,100),fl=flashFx(n);
 return (u,t,bt)=>{sky.upd(t);updWaves(wv,t*2);updRain(rain,t,1.6);updFlash(fl,t,true);
  const h=p.hand===0?0:(p.hand==2?1:clamp(bt/.4));A(hand,{transform:`translate(${300+(p.hand==2?Math.sin(t*5)*10:0)} ${780+lerp(220,0,eo(h))+(p.slip?bt*220:0)})`,opacity:p.hand===0?0:1});A(eyes,{opacity:p.hand?h:0});
  A(chain,{transform:`translate(${p.strain?Math.sin(t*16)*5:0} 0)`,opacity:p.chain?1:0})}};
LIB.tide=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});R(f,-300,-300,1320,1880,'#081a36');for(let i=-6;i<20;i++)L(f,i*60,-300,i*60,1580,'#3a78b0',1.5,{opacity:.12,'stroke-linecap':'butt'});for(let i=-6;i<30;i++)L(f,-300,i*60,1020,i*60,'#3a78b0',1.5,{opacity:.12,'stroke-linecap':'butt'});
 // cross-section: island (left), sea floor, mainland (right), water level
 P(m,'M-100,1500 L-100,420 L200,400 Q260,520 300,700 L420,820 L560,760 Q640,560 700,430 L820,420 L820,1500Z','#3a2a22');
 P(m,'M300,700 L420,820 L560,760Z','#e0c98a');   // the sand ridge
 const water=P(m,'M-100,360 H820 V1500 H-100Z','#2f9ad8',{opacity:.78});
 L(m,-100,360,820,360,'#fff',4,{opacity:.6,id:'wl'});
 lighthouse(m,80,420,160,{});
 const zs=[];for(let i=0;i<5;i++){const z=zombie(m,620+i*26,430,.5,i);updZombie(z,0,1,0);zs.push(z)}
 // tide gauge
 R(m,640,300,26,520,'#f2ead6',{rx:6,opacity:.9});for(let i=0;i<10;i++)L(m,640,320+i*50,666,320+i*50,'#222',3);
 const mark=P(m,'M630,0 L650,-14 L650,14Z','#ffca28');
 const ck=callout(Z.hud,360,120,'t',p.kind==='neck'?'40 FT WIDE · ANKLE DEEP':(p.rising?'TIDE RISING':'TIDE DROPPING'),500);
 return (u,t,bt)=>{const lvl=p.rising?lerp(700,360,ease(u)):(p.kind==='neck'?700:lerp(360,720,ease(u)));
  A(water,{d:`M-100,${lvl} H820 V1500 H-100Z`});A(mark,{transform:`translate(0 ${lvl})`});ck(clamp((bt-.15)/.3))}};

/* ---------------- causeway: view from the island across the water to the mainland ----------------
   p.lvl  number | [from,to]  how much sand is above water (0 = sea only, 1 = full path)
   p.crowd N zombies standing on the far shore; p.walkers N zombies walking the path, p.walk [s0,s1] their progress (0 shore .. 1 near)
   p.tag  top label; p.width  arrow label across the path; p.neck  path pinches near the island; p.trench / p.fire  the diesel trench; p.smoke  burnt-out smoke
   Everything that matters stays above y=730 (the caption band starts at ~740). */
LIB.causeway=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});
 const time=p.time||'dawn';const sky=skyFor(f,time);const HY=500,YB=1120,CX=360;
 const lv=Array.isArray(p.lvl)?p.lvl:[p.lvl==null?1:p.lvl,p.lvl==null?1:p.lvl];
 C(f,540,HY-6,300,'url(#gGlow)',{opacity:.55});C(f,540,HY-10,70,'#ffe6b0',{opacity:.95});
 R(m,-300,HY,1320,1000,'url(#'+SEA[time]+')');
 const glint=[];for(let i=0;i<30;i++)glint.push([R(m,0,0,50+rnd(i)*130,3,'#fff1c8',{rx:1.5,opacity:.28}),rnd(i+7),HY+8+i*17+(i*i%9)]);
 // mainland silhouette (the horde's side)
 P(m,`M-300,${HY+3} L-300,${HY-24} Q-120,${HY-44} 20,${HY-20} Q200,${HY-40} 360,${HY-16} Q520,${HY-46} 700,${HY-18} Q860,${HY-38} 1020,${HY-22} L1020,${HY+3}Z`,'#1d1526');
 for(let i=0;i<24;i++){const x=-40+i*36+rnd(i)*18,hh=12+rnd(i+3)*26;P(m,`M${x-9},${HY+1} L${x},${HY-hh-16} L${x+9},${HY+1}Z`,'#150f1c')}
 const wt0=62,wb0=480;
 const wAt=(y,k)=>{const v=clamp((y-HY)/(YB-HY));let w=lerp(wt0,wb0,v)*k;if(p.neck)w*=lerp(1,.34,Math.pow(clamp((v-.22)/.78),1.4));return w};
 const sandG=G(m);const path=P(sandG,'M0,0','url(#gSand)');const shade=P(sandG,'M0,0','#2a1608',{opacity:.22});
 const foamL=P(m,'M0,0','none',{stroke:'#fff7e0','stroke-width':4,opacity:.55,'stroke-linejoin':'round'}),foamR=P(m,'M0,0','none',{stroke:'#fff7e0','stroke-width':4,opacity:.55,'stroke-linejoin':'round'});
 const bands=[];for(let i=0;i<10;i++)bands.push(R(m,0,0,10,3,'#fff4d0',{rx:1.5,opacity:.4}));
 // diesel trench across the path
 let tr=null,fl=null,fg=null;const TY=690;
 if(p.trench){const w=wAt(TY,1);tr=G(m);P(tr,`M${CX-w/2-4},${TY} L${CX+w/2+4},${TY} L${CX+w/2+12},${TY+40} L${CX-w/2-12},${TY+40}Z`,'#2a1a0c');P(tr,`M${CX-w/2+10},${TY+8} L${CX+w/2-10},${TY+8} L${CX+w/2-4},${TY+32} L${CX-w/2+4},${TY+32}Z`,'#d9a02a',{opacity:.85});
  if(p.fire){fg=C(m,CX,TY+10,300,'url(#gFire)',{opacity:.6});fl=flames(m,CX,TY+22,w,20,3)}}
 // zombies: standing on the far shore + walkers on the path
 const zs=[];for(let i=0;i<(p.crowd||0);i++){const x=20+rnd(i)*680;zs.push({o:zombie(m,x,HY+4+rnd(i+2)*10,.26,i),kind:'s',x})}
 for(let i=0;i<(p.walkers||0);i++)zs.push({o:zombie(m,CX,HY+8,.2,100+i),kind:'w',off:(rnd(i+50)-.5)*.78,delay:(i/Math.max(1,(p.walkers||1)))*.42});
 const w0=(p.walk||[0,.5]);const SMAX=p.trench?.92:1;
 // labels
 const ck=p.tag?callout(Z.hud,CX,110,'t',p.tag,Math.max(300,p.tag.length*17+90)):null;
 let wl=null;if(p.width){wl=G(m,{opacity:0});const y=640,w=wAt(y,1);L(wl,CX-w/2,y,CX+w/2,y,'#fff',5);P(wl,`M${CX-w/2},${y} l22,-14 l0,28Z`,'#fff');P(wl,`M${CX+w/2},${y} l-22,-14 l0,28Z`,'#fff');T(wl,CX,y-26,p.width,46,'#fff',{stroke:'#000','stroke-width':8,'paint-order':'stroke fill','letter-spacing':2})}
 // burnt-out smoke
 const sm=p.smoke?smokeCols(m,90,150,HY+520,2,'#2a2a30',.7):null;
 R(n,-100,1120,920,300,'#0a0810');P(n,'M-100,1180 L-100,1060 Q100,1010 260,1080 Q420,1040 600,1090 Q740,1040 820,1070 L820,1180Z','#0a0810');
 return (u,t,bt)=>{sky.upd(t);
  const L=lerp(lv[0],lv[1],ease(u));
  glint.forEach(([r,ph,y])=>A(r,{x:((ph*1000+t*8*(1+(y-HY)/200))%1100)-150,y,opacity:.2+.15*Math.sin(t*2+ph*9)}));
  if(L<.02){A(sandG,{opacity:0});A(foamL,{opacity:0});A(foamR,{opacity:0});bands.forEach(b=>A(b,{opacity:0}))}
  else{A(sandG,{opacity:1});const yt=lerp(YB,HY+4,clamp(L*1.12)),k=clamp(.25+L*.95,0,1);const pts=[];const N=12;for(let i=0;i<=N;i++){const y=lerp(yt,YB,i/N);pts.push([y,wAt(y,k)/2])}
   const dl='M'+pts.map(([y,w])=>`${CX-w},${y}`).join(' L')+' L'+pts.slice().reverse().map(([y,w])=>`${CX+w},${y}`).join(' L')+'Z';A(path,{d:dl});A(shade,{d:dl});
   A(foamL,{d:'M'+pts.map(([y,w])=>`${CX-w},${y}`).join(' L'),opacity:.55});A(foamR,{d:'M'+pts.map(([y,w])=>`${CX+w},${y}`).join(' L'),opacity:.55});
   bands.forEach((b,i)=>{const y=HY+8+(YB-HY-8)*Math.pow((i+1)/11,1.9);const w=wAt(y,k);A(b,{x:CX-w*.42,width:w*.84,y,height:2+clamp((y-HY)/300)*3,opacity:y>yt+6?.38:0})})}
  zs.forEach((q,i)=>{const o=q.o;
   if(q.kind==='s'){o.x=q.x;o.y=HY+4+rnd(i+2)*10;o.s=.24+rnd(i)*.06}
   else{const s=clamp(lerp(w0[0],w0[1],clamp(u*1.05-q.delay))*SMAX);const y=HY+8+Math.pow(s,1.5)*(655-HY);o.y=y;o.s=.2+((y-HY)/(655-HY))*.66;o.x=CX+q.off*wAt(y,Math.max(.3,clamp(.25+L*.95)))*.8}
   updZombie(o,t,clamp((bt-.1-rnd(i)*.4)/.3),q.kind==='w'?3:1);if(p.sink&&q.kind==='w'){A(o.z,{opacity:clamp(L*2.5),transform:`translate(${o.x} ${o.y+(1-clamp(L*2.5))*30}) scale(${o.s})`})}});
  if(tr)A(tr,{opacity:p.sink?clamp(L*4):1});if(fl)updFlames(fl,t,1);if(fg)A(fg,{opacity:.45+.2*Math.sin(t*9)});
  if(ck)ck(clamp((bt-.15)/.3));if(wl)A(wl,{opacity:clamp((bt-.3)/.3)});if(sm)updSmoke(sm,t,420)}};
