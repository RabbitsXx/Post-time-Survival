/* ===== locs9: THE LAST BUS sets (world 1280x720, seen through the 450x800 window).
   LOC.bus  : the inside of the bus as a cut-away: a long bench along the far wall (passengers face the camera), windows above it (night scenery scrolls), driver's cab at the right end.
   LOC.ext  : outside, side view (the bus drives left to right), variants terminal | road | tunnel | station | diner | bridge | toll | pier
   LOC.pov  : through the windshield (road ahead), variants road | tunnel | bridge | toll | pier | station
   Seat order along the bench (x): see SEAT in buslib.py.  Hip line of a seated passenger = BH (the bench board hides everything below). ===== */
const BH=548,BFLOOR=664,BTOP=150;
const NIGHTSKY='#0a1224';
function adPanel(g,x,y,w,h,bg,fg,l1,l2){R(g,x,y,w,h,bg,{rx:3,stroke:'#0008','stroke-width':2});T(g,x+w/2,y+(l2?h*.42:h*.66),l1,l2?15:17,fg,{'font-family':RCF,'font-weight':700,'letter-spacing':1});if(l2)T(g,x+w/2,y+h*.82,l2,11,fg,{'font-family':RCF,'font-weight':700,opacity:.85})}
/* scrolling scenery drawn into group g; returns update(t,speed) */
function scenery(g,kind,p){const W=1900,Y0=205,Y1=412;const q=G(g,{});
 const sky=kind==='pier'?'url(#gSkyDawn)':kind==='tunnel'?'#07090e':'url(#gSkyNight)';R(g,-100,Y0-6,1480,Y1-Y0+14,sky);
 if(kind!=='tunnel'&&kind!=='pier'){for(let i=0;i<46;i++)C(g,rnd(i)*1380-40,Y0+rnd(i+3)*110,1+rnd(i+7)*1.4,'#fff',{opacity:.25+rnd(i+9)*.6})}
 if(kind==='pier'){C(g,640,Y0+170,60,'#ffd9a0',{opacity:.9});R(g,-100,Y0+120,1480,100,'#2f6a86');for(let i=0;i<16;i++)R(g,rnd(i)*1280,Y0+130+rnd(i+2)*70,60+rnd(i)*80,2,'#bfe8f5',{opacity:.5})}
 const items=[];
 const add=(fn,x,w)=>{const e=G(q,{});fn(e);items.push({e,x,w})};
 if(kind==='city'||kind==='terminal'){for(let i=0;i<14;i++){const x=i*140+rnd(i)*40,w=70+rnd(i+1)*60,h=110+rnd(i+4)*150;add(e=>{R(e,0,Y1-h,w,h,'#0b101c');for(let k=0;k<h/22;k++)for(let j=0;j<w/18;j++)if(rnd(i*31+k*7+j)>.72)R(e,6+j*18,Y1-h+8+k*22,9,11,'#ffcf6a',{opacity:.85});if(rnd(i+11)>.6){C(e,w/2,Y1-h-14,26,'url(#gFire)',{opacity:.8})}},x,w)}}
 else if(kind==='road'||kind==='diner'){for(let i=0;i<30;i++){const x=i*66+rnd(i)*30,h=70+rnd(i+2)*90;add(e=>{P(e,`M0,${Y1} L18,${Y1-h} L36,${Y1}Z`,'#06100e');P(e,`M-6,${Y1-h*.45} L18,${Y1-h*1.05} L42,${Y1-h*.45}Z`,'#071612')},x,40)}
  for(let i=0;i<8;i++)add(e=>{R(e,0,Y1-34,4,34,'#cfd4da',{opacity:.7});R(e,-1,Y1-30,6,6,'#ff4a2a')},i*250,6)}
 else if(kind==='tunnel'){for(let i=0;i<12;i++)add(e=>{R(e,0,Y0,60,14,'#ffb060',{opacity:.95});C(e,30,Y0+10,60,'url(#gLamp)',{opacity:.5});R(e,0,Y0+50,4,Y1-Y0-50,'#161a24');},i*180,60);
  for(let i=0;i<30;i++)add(e=>{R(e,0,Y1-30,40,2,'#2a2f3a',{opacity:.8})},i*62,40)}
 else if(kind==='station'){add(e=>{R(e,0,Y1-210,10,210,'#2a2c34');R(e,-70,Y1-250,150,60,'#f4f4f6',{rx:6,stroke:'#0008','stroke-width':3});T(e,5,Y1-208,'FUEL',34,'#e0463a',{'font-family':RCF,'font-weight':700,'letter-spacing':4});R(e,-150,Y1-120,300,10,'#3a3d48');for(const x of[-100,-20,60])R(e,x,Y1-110,26,100,'#cf2a24',{rx:4,stroke:'#1a1a22','stroke-width':3});C(e,5,Y1-220,180,'url(#gNeon)',{opacity:.45})},0,300);
  for(let i=0;i<10;i++)add(e=>{R(e,0,Y1-40,50,40,'#12151e',{rx:4})},620+i*150,50)}
 else if(kind==='bridge'){for(let i=0;i<10;i++)add(e=>{R(e,0,Y0-10,12,Y1-Y0+10,'#2b3240');L(e,6,Y0,150,Y1,'#2b3240',6);L(e,150,Y0,6,Y1,'#2b3240',6)},i*190,150);R(g,-100,Y1-26,1480,26,'#0e1624')}
 else if(kind==='toll'){for(let i=0;i<9;i++)add(e=>{P(e,'M0,0 L14,-46 L28,0Z','#ff7a1c');R(e,6,-26,16,7,'#fff');if(i%3===0){R(e,40,-52,36,52,'#3a3a40',{rx:3});C(e,58,-58,40,'url(#gFire)',{opacity:.85})}},i*210,80),items[items.length-1].e.setAttribute('data-y',Y1)}
 // place items on the baseline (toll uses data-y)
 for(const it of items){const y=it.e.getAttribute('data-y');if(y)it.e.setAttribute('transform','translate(0 '+y+')')}
 return (t,speed)=>{const off=(t*speed)%W;items.forEach(it=>{let x=((it.x-off)%W+W)%W-200;const y=it.e.getAttribute('data-y');A(it.e,{transform:`translate(${x} ${y||0})`})})}}

LOC.bus=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const gm=p.skin==='game';
 const out=p.out||'city';const sc=scenery(f,out,p);
 // ---- wall with window gaps (windows k=0..6 : x 60+196k .. +170)
 const wall=pk(p,'#4a5a70','#5a6ac0'),wall2=pk(p,'#34425a','#4a58a8');
 R(m,-100,412,1480,400,wall2);R(m,-100,BTOP-80,1480,60,'#0b0e14');                     // below the windows / above the header
 const wins=[];for(let k=0;k<7;k++)wins.push(60+196*k);
 // pillars between windows + header + sill
 R(m,-100,BTOP-60,1480,215-BTOP+60,wall);R(m,-100,412,1480,BH-412+40,wall2);R(m,-100,412,1480,8,'#10151e',{opacity:.6});
 for(let k=-1;k<7;k++)R(m,wins[0]+196*k+170,205,26,212,wall);
 // window frames
 for(const x of wins)R(m,x,205,170,212,'none',{stroke:'#0c1018','stroke-width':6,rx:6});
 // ceiling ads + dome lights
 const ads=[['NOT DYING™','NOW WITH FEWER BITES','#f4f6fb','#0b1a3a'],['CLUCK-A-LOT','CHICKEN SO GOOD IT RUNS','#e83a3a','#fff'],['MIND YOUR HEAD','(AND YOUR BRAINS)','#ffd23a','#111'],['SOFA SALE','50% OFF EVERYTHING','#2a8a5a','#fff'],['LAWYER?','CALL 1-800-ZOMBIE','#3a5fa8','#fff'],['BUS 47','LAST DEPARTURE','#1a1a22','#ffd23a']];
 ads.forEach((a,i)=>adPanel(m,90+i*196,164,150,38,a[2],a[3],a[0],a[1]));
 const domes=[];for(let k=0;k<6;k++){const x=wins[k]+85;R(m,x-50,BTOP-8,100,12,'#1a1d24',{rx:5});domes.push(R(m,x-44,BTOP+3,88,8,pk(p,'#fff4d0','#ffffff'),{rx:3,opacity:.95}))}
 // light pools on the passengers (soft)
 const glow=[];for(let k=0;k<6;k++)glow.push(C(m,wins[k]+85,BTOP+6,190,'url(#gSpot)',{opacity:.18}));
 // bench back (vinyl) behind the passengers
 R(m,40,455,1040,105,pk(p,'#3b2a3a','#7a5ac0'),{rx:14});R(m,40,455,1040,10,pk(p,'#54405a','#9a7ae0'),{rx:5,opacity:.8});
 // ---- driver's cab (right end): partition glass, windshield onto the road, dash, steering wheel
 R(m,1112,150,14,520,'#10151e');R(m,1126,205,6,300,'#9ec9e0',{opacity:.25});
 R(m,1105,150,330,560,'#080b12');                                                     // cab interior
 const wsx=1290;P(m,`M${wsx},210 L1440,196 L1440,520 L${wsx},470Z`,'url(#gSkyNight)');R(m,wsx,470,160,200,'#0d1018');
 const road=[];for(let i=0;i<5;i++)road.push(P(m,'M0,0',null,{fill:'#d8d2a0',opacity:.8}));
 const cone=P(m,`M${wsx},330 L${wsx+360},210 L${wsx+360},520Z`,'url(#gCone)',{opacity:.35});
 R(m,1105,470,330,12,'#161a24');R(m,1105,482,330,200,'#0c0f16');
 // rear-view mirror + route LED + dash
 R(m,1120,236,56,24,'#1a1d24',{rx:5,stroke:'#0008','stroke-width':2});const mir=R(m,1124,240,48,16,'#7ea6c0',{rx:3,opacity:.8});
 R(m,1130,164,230,34,'#07080c',{rx:5});const led=T(m,1245,189,'',22,'#ffb020',{'font-family':MONO,'font-weight':800,'letter-spacing':2});
 // ---- near layer: bench front board, poles, straps, floor
 R(n,-100,BH,1232,BFLOOR-BH,pk(p,'#241a2a','#4a3a8a'));R(n,-100,BH,1232,12,pk(p,'#3a2a44','#6a58c0'));R(n,-100,BH+12,1232,5,'#000',{opacity:.35});
 R(n,1132,BH+36,340,200,'#0e1118');R(n,1132,BH+36,340,8,'#2a2f3c');R(n,1146,BH+50,60,26,'#141822',{rx:5});
 R(n,-100,BFLOOR,1480,400,'#06070b');R(n,-100,BFLOOR,1480,5,'#ffd23a',{opacity:.55});
 const poles=[247,639,1031];poles.forEach(x=>{R(n,x-5,BTOP,10,BFLOOR-BTOP,'#ffc61a',{rx:4});R(n,x-3,BTOP,3,BFLOOR-BTOP,'#fff3b0',{opacity:.6})});
 R(n,-100,BTOP+4,1232,10,'#ffc61a',{opacity:.9});
 const straps=[];for(let i=0;i<11;i++){const x=70+i*98;const s=G(n,{});L(s,x,BTOP+10,x,BTOP+54,'#2a2a30',3);E('ellipse',{cx:x,cy:BTOP+64,rx:10,ry:14,fill:'none',stroke:'#e8e8f0','stroke-width':4},s);straps.push({s,x})}
 const dk=R(n,-100,-100,1480,1000,'#02040a',{opacity:0});
 return (u,t,bt)=>{
  sc(t,p.speed==null?160:p.speed);A(dk,{fill:p.dome==='red'?'#6a0a0a':'#02040a',opacity:p.dome==='off'?.62:p.dome==='dim'?.3:p.dome==='red'?.42:0});
  const fl=p.dome==='flicker',off=p.dome==='off',red=p.dome==='red';
  domes.forEach((d,i)=>{let o=.95;if(fl)o=Math.sin(t*(9+i*2.3)+i)>-.15?.95:.1;if(off)o=.06;if(p.dome==='dim')o=.45;A(d,{opacity:o,fill:red?'#ff4a3a':pk(p,'#fff4d0','#ffffff')});A(glow[i],{opacity:(off?.02:fl?(Math.sin(t*(9+i*2.3)+i)>-.15?.2:.02):.18)*(red?1.6:1)})});
  straps.forEach(o=>A(o.s,{transform:`rotate(${Math.sin(t*1.7+o.x)*3 + (p.sway||0)*Math.sin(t*5+o.x)} ${o.x} ${BTOP+10})`}));
  // road ahead in the windshield
  const sp=(p.speed==null?160:p.speed)/160;road.forEach((r,i)=>{const k=((t*.9*sp+i/5)%1);const z=k*k;const y=330+z*150,w=2+z*26,xx=wsx+ (1-z)*0+z*120;A(r,{d:`M${wsx+170-w*.5+z*40},${y} l${w},0 l${w*1.6},${8+z*20} l${-w*1.6},0Z`,opacity:.15+z*.8})});
  A(cone,{opacity:p.lights===false?0:.35});
  led.textContent=p.led||'';
  if(p.hot)A(f,{opacity:1})}};

/* ---------- the bus seen from outside (side view, heading right) ---------- */
function busExt(g,o){o=o||{};const q=G(g,{});const col=o.col||'#ffb020';
 E('ellipse',{cx:0,cy:2,rx:300,ry:12,fill:'#000',opacity:.4},q);
 P(q,'M-290,-40 L-290,-190 Q-290,-214 -262,-214 L236,-214 Q276,-214 290,-176 L300,-90 L300,-40Z',col,{stroke:'#1a1a22','stroke-width':4,'stroke-linejoin':'round'});
 R(q,-290,-74,590,10,'#e0902a');R(q,-290,-50,590,8,'#c97a1c');
 // windows (lit) with passenger heads
 const cols=['#e0463a','#2aa59a','#ffd23a','#8a5cc0','#3a6fd0','#4f7040','#f4f4f6','#ff8a1c'];
 for(let i=0;i<7;i++){const x=-262+i*70;R(q,x,-190,58,70,'#ffe9a8',{rx:6,stroke:'#1a1a22','stroke-width':3});if(!o.empty&&i<6){C(q,x+29,-148,12,cols[i],{stroke:'#1a1a22','stroke-width':2});R(q,x+14,-136,30,16,cols[(i+3)%8],{rx:6})}}
 P(q,'M232,-196 L284,-190 L292,-120 L232,-120Z','#2a3a52',{stroke:'#1a1a22','stroke-width':3,'stroke-linejoin':'round'});     // windshield
 R(q,150,-206,100,16,'#07080c',{rx:3});T(q,200,-193,o.sign||'47 · PIER 8',13,'#ffb020',{'font-family':MONO,'font-weight':800});
 R(q,-250,-232,120,20,'#cfd6de',{rx:5,stroke:'#1a1a22','stroke-width':3});                                                       // roof AC
 for(const cx of[-190,170]){C(q,cx,-30,38,'#15151a');C(q,cx,-30,19,'#9a9aa6');C(q,cx,-30,7,'#4a4a56')}
 if(o.lights!==false){C(q,296,-70,9,'#fff6c8');P(q,'M300,-72 L640,-150 L640,10Z','url(#gCone)',{opacity:.55})}
 C(q,-292,-60,6,'#ff3a2a');
 if(o.dents){P(q,'M-120,-110 l30,10 l-8,20 l-30,-8Z','#7a5a20',{opacity:.6});for(let i=0;i<4;i++)P(q,`M${-60+i*12},-150 q4,22 -2,44`,null,{fill:'none',stroke:'#7a0f0f','stroke-width':3,opacity:.75,'stroke-linecap':'round'})}
 return q}
LOC.ext=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'road';let ub=null;
 const night=v==='pier'?'url(#gSkyDawn)':'url(#gSkyNight)';R(f,-100,-100,1480,760,v==='tunnel'?'#07090e':night);
 if(v!=='tunnel'&&v!=='pier')for(let i=0;i<70;i++)C(f,rnd(i)*1380-40,rnd(i+3)*330,1+rnd(i+7)*1.4,'#fff',{opacity:.25+rnd(i+9)*.6});
 if(v!=='tunnel'&&v!=='pier')C(f,1080,120,34,'#e8edf5',{opacity:.9});
 const scn=G(m);const sc=scenery(scn,v==='terminal'?'city':v==='diner'?'road':v,p);
 // the scenery band is drawn for the interior windows (y 205-412): here it just provides a distant skyline, lifted
 A(scn,{transform:'translate(0 -40)'});
 const gy=v==='bridge'?560:600;R(m,-100,gy,1480,300,v==='bridge'?'#0e1624':v==='tunnel'?'#0b0d12':'#12151e');R(m,-100,gy,1480,14,'#2a2f3c');
 const dash=[];for(let k=0;k<10;k++)dash.push(R(m,0,gy+70,80,7,'#e8e0a0',{opacity:.7}));
 if(v==='tunnel'){R(m,-100,60,1480,150,'#0a0d14');for(let i=0;i<9;i++)R(m,i*170,100,70,10,'#ffb060',{opacity:.9,id:''});R(m,-100,gy-4,1480,6,'#ffb060',{opacity:.4})}
 if(v==='station'){busStation(m,p)} if(v==='diner')busDiner(m,p); if(v==='toll')busToll(m,p); if(v==='terminal')busTerminal(m,p); if(v==='bridge')ub=busBridge(m,p); if(v==='pier')busPier(m,p);
 let b=null;if(p.bus!==false){b=busExt(G(m),Object.assign({},p.busO||{}))}
 return (u,t,bt)=>{sc(t,p.scroll==null?150:p.scroll);if(ub)ub(u,t,bt);const bx=p.bx==null?640:p.bx;const to=p.bto==null?bx:p.bto;const x=lerp(bx,to,p.ease?ease(u):u);
  if(b)A(b,{transform:`translate(${x} ${gy+56+(p.by||0)+Math.sin(t*14)*(p.rumble==null?1.2:p.rumble)}) scale(${p.bs||.9} ${p.bs||.9})`});
  const sp=(p.roadSp==null?420:p.roadSp);dash.forEach((d,i)=>A(d,{x:(((i*140-(t*sp))%1400)+1400)%1400-100}));}};
function busTerminal(g,p){R(g,-100,520,1480,80,'#2a2d38');for(let i=0;i<6;i++)R(g,i*220+40,420,10,100,'#1a1c24');R(g,40,380,360,40,'#e83a3a',{rx:4});T(g,220,410,'RIDGEWAY TERMINAL',26,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 for(let i=0;i<5;i++)lampPost(g,i*300+80,600,260,true)}
function busStation(g,p){R(g,780,330,360,26,'#f4f4f6',{rx:6,stroke:'#0008','stroke-width':3});for(const x of[820,1080])R(g,x,356,14,244,'#2a2c34');T(g,960,352,'LAST GAS',22,'#e0463a',{'font-family':RCF,'font-weight':700,'letter-spacing':4});
 for(const x of[900,1000]){R(g,x,470,34,130,'#cf2a24',{rx:5,stroke:'#1a1a22','stroke-width':3});R(g,x+6,480,22,26,'#9ec9e0')}
 C(g,960,350,260,'url(#gLamp)',{opacity:.25});R(g,80,420,200,180,'#1c2030',{stroke:'#0008','stroke-width':3});R(g,90,430,180,50,'#0f1220');T(g,180,468,'OPEN 24H',20,'#555',{'font-family':RCF,'font-weight':700});
 // the parked semi truck with the tank
 R(g,1120,420,360,120,'#3a5a7a',{rx:8,stroke:'#0d1018','stroke-width':4});R(g,1090,450,60,90,'#2a4560',{rx:6,stroke:'#0d1018','stroke-width':4});C(g,1180,560,26,'#15151a');C(g,1380,560,26,'#15151a');R(g,1240,520,110,46,'#9aa6b4',{rx:20,stroke:'#0d1018','stroke-width':3})}
function busDiner(g,p){R(g,760,380,420,220,'#2a3040',{stroke:'#0008','stroke-width':3});R(g,780,400,380,100,'#0f1626');R(g,760,350,420,34,'#e83a3a');T(g,970,376,'SUNNY SIDE DINER',24,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':3});C(g,970,360,230,'url(#gNeon)',{opacity:.3});
 R(g,800,420,60,80,'#c8d0dc',{rx:4,stroke:'#0008','stroke-width':3});R(g,806,428,48,44,'#2a6ad0',{opacity:.7});T(g,830,490,'SODA',12,'#fff',{'font-family':RCF,'font-weight':700})}
function busToll(g,p){R(g,860,330,24,270,'#3a3d48');R(g,860,330,320,18,'#ffd23a');for(let i=0;i<8;i++)P(g,`M${870+i*38},330 l20,0 l-20,18Z`,'#111');R(g,740,420,300,18,'#e0e0e8',{rx:4});for(let i=0;i<6;i++)R(g,750+i*50,420,25,18,'#e0463a');
 for(const x of[1180,1260]){R(g,x,500,44,100,'#3a3a40',{rx:4});C(g,x+22,490,44,'url(#gFire)',{opacity:.9})}
 R(g,1180,360,150,60,'#18222f',{rx:6});T(g,1255,400,'TOLL',32,'#ffd23a',{'font-family':RCF,'font-weight':700,'letter-spacing':4})}
function busBridge(g,p){for(let i=0;i<5;i++){R(g,100+i*120,300,12,260,'#2b3240');L(g,106+i*120,300,196+i*120,560,'#2b3240',6)}R(g,-100,300,800,12,'#2b3240');R(g,-100,545,800,16,'#3a4256');for(let i=0;i<8;i++)R(g,i*100,560,6,50,'#2a303c');
 R(g,-100,640,1480,200,'#0b1a2e');for(let i=0;i<16;i++)R(g,rnd(i)*1280,650+rnd(i+2)*60,80+rnd(i)*100,2,'#4a7aa0',{opacity:.4});
 // control tower (left of the gap) with ladder and the lever room
 R(g,560,250,110,310,'#2f3644',{stroke:'#0b0d12','stroke-width':4});R(g,574,264,82,62,'#ffd86a',{opacity:.85});R(g,574,264,82,62,'none',{stroke:'#0b0d12','stroke-width':4});T(g,615,360,'CONTROL',16,'#ffd23a',{'font-family':RCF,'font-weight':700,'letter-spacing':2});
 for(let i=0;i<13;i++)R(g,540,560-i*24,24,5,'#9aa0aa');L(g,540,560,540,250,'#9aa0aa',4);L(g,564,560,564,250,'#9aa0aa',4);
 const leaf=G(g,{});R(leaf,0,-10,520,20,'#3a4256');for(let i=0;i<9;i++)R(leaf,i*58,-10,28,20,'#ffd23a',{opacity:.35});R(leaf,0,-70,520,6,'#2b3240');for(let i=0;i<8;i++)R(leaf,i*72,-70,6,60,'#2b3240');
 return (u,t,bt)=>{const a=p.leaf?lerp(p.leaf[0],p.leaf[1],ease(u)):0;A(leaf,{transform:`translate(700 555) rotate(${a})`})}}
function busPier(g,p){R(g,-100,560,1480,300,'#1e3a52');R(g,0,540,1280,30,'#5a4a3a');for(let i=0;i<16;i++)R(g,i*90+10,570,12,70,'#3a2e24');R(g,700,300,420,230,'#e8eef5',{rx:14,stroke:'#1a1a22','stroke-width':4});for(let i=0;i<7;i++)R(g,730+i*55,340,36,36,'#2a6ad0',{rx:5});R(g,760,260,160,50,'#e0463a',{rx:6});T(g,840,296,'FERRY',30,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':4});R(g,880,230,40,40,'#cfd6de')}

/* ---------- through the windshield ---------- */
LOC.pov=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'road';
 const sky=v==='pier'?'url(#gSkyDawn)':'url(#gSkyNight)';R(f,-100,-100,1480,520,v==='tunnel'?'#05070c':sky);
 if(v!=='tunnel'&&v!=='pier')for(let i=0;i<60;i++)C(f,rnd(i)*1380-40,rnd(i+3)*280,1+rnd(i+7)*1.4,'#fff',{opacity:.25+rnd(i+9)*.6});
 const VPX=640,VPY=360;
 R(f,-100,VPY,1480,500,'#0d1018');
 // side scenery: trees or buildings or tunnel walls
 const side=[];if(v!=='tunnel')for(let s=-1;s<=1;s+=2)for(let i=0;i<8;i++){side.push({s,i,e:P(m,'M0,0',null,{fill:v==='bridge'?'#2b3240':'#06100e'})})}
 if(v==='tunnel'){P(m,`M-100,-100 L${VPX-90},${VPY-60} L${VPX+90},${VPY-60} L1380,-100Z`,'#161b26');P(m,`M-100,-100 L${VPX-90},${VPY-60} L${VPX-90},${VPY+30} L-100,820Z`,'#1c222f');P(m,`M1380,-100 L${VPX+90},${VPY-60} L${VPX+90},${VPY+30} L1380,820Z`,'#1c222f');
  for(let i=1;i<8;i++){const z=i/8,zz=z*z;L(m,VPX-90-zz*590,VPY-60-zz*540,VPX+90+zz*590,VPY-60-zz*540,'#0b0e14',2+zz*8)}}
 const roadP=P(m,`M${VPX-14},${VPY} L${VPX+14},${VPY} L${VPX+560},760 L${VPX-560},760Z`,'#1a1d26');
 const dash=[];for(let i=0;i<7;i++)dash.push(P(m,'M0,0',null,{fill:'#e8e0a0'}));
 const lamps=[];if(v==='tunnel')for(let i=0;i<7;i++)lamps.push(R(m,0,0,10,6,'#ffb060'));
 let extra=null;
 if(v==='tunnel'){C(m,VPX,VPY,26,'#cfe8ff',{opacity:.9});C(m,VPX,VPY,70,'url(#gLamp)',{opacity:.5})}
 if(v==='bridge'){R(m,VPX-300,VPY-4,600,8,'#ff4a2a',{opacity:.9});T(m,VPX,VPY-26,'BRIDGE UP',26,'#ff6a4a',{'font-family':MONO,'font-weight':800,'letter-spacing':3})}
 if(v==='toll'){R(m,VPX-130,VPY+20,260,10,'#e0e0e8');for(let i=0;i<5;i++)R(m,VPX-130+i*52,VPY+20,26,10,'#e0463a');C(m,VPX-190,VPY+30,40,'url(#gFire)',{opacity:.9});C(m,VPX+190,VPY+30,40,'url(#gFire)',{opacity:.9})}
 if(v==='pier'){R(m,VPX-260,VPY-40,520,50,'#e8eef5',{rx:10});R(m,0,VPY+8,1280,200,'#1e3a52',{opacity:.9})}
 const hz=p.horde?horde(m,Object.assign({n:6,x0:VPX-120,x1:VPX+120,y:VPY+70,s:.35,seed:4,jit:60,col:'#06050a',eye:null},p.horde)):null;
 // windshield frame + dash (near)
 P(n,'M-100,-100 L1380,-100 L1380,820 L-100,820 L-100,500 L120,470 L640,456 L1160,470 L1380,500Z','#07080c');
 R(n,-100,560,1480,300,'#0a0b10');R(n,-100,560,1480,6,'#1d2028');
 for(const x of[220,1060]){P(n,`M${x},470 L${x+30},-100 L${x+70},-100 L${x+40},470Z`,'#07080c')}
 const wipe=L(n,520,470,760,330,'#15171c',8);
 const mirror=R(n,560,40,160,46,'#14171e',{rx:8,stroke:'#2a2d36','stroke-width':3});R(n,566,46,148,34,'#6a8aa6',{rx:5,opacity:.5});
 const wheel=G(n,{transform:'translate(640 760)'});E('ellipse',{cx:0,cy:0,rx:210,ry:30,fill:'none',stroke:'#16181e','stroke-width':26},wheel);
 const fuel=G(n,{});R(fuel,820,590,150,70,'#0d1018',{rx:8,stroke:'#2a2d36','stroke-width':3});T(fuel,846,614,'E',22,'#ff4a2a',{'font-family':MONO,'font-weight':800});R(fuel,860,600,96,14,'#222733',{rx:4});const needle=R(fuel,860,600,6,14,'#ff4a2a',{rx:3});T(fuel,895,646,'FUEL',14,'#9aa0b0',{'font-family':MONO,'font-weight':800});
 return (u,t,bt)=>{const sp=p.speed==null?1:p.speed;
  side.forEach(o=>{const k=((t*.7*sp+o.i/8)%1);const z=k*k*k;const x=VPX+o.s*(40+z*620),h=20+z*420,w=10+z*70;
   if(v==='tunnel'){A(o.e,{x:x-(o.s>0?0:w),y:VPY-h*.5+z*40,width:w,height:h,opacity:.55})}else A(o.e,{d:`M${x},${VPY+z*120} l${-w*.4},${-h} l${w*.8},0Z`,opacity:.9})});
  dash.forEach((d,i)=>{const k=((t*.9*sp+i/7)%1);const z=k*k;const y=VPY+8+z*400,w=3+z*20,hh=4+z*44;A(d,{d:`M${VPX-w/2},${y} l${w},0 l${w*.7},${hh} l${-w*2.4},0Z`,opacity:.2+z})});
  lamps.forEach((l,i)=>{const k=((t*.9*sp+i/7)%1);const z=k*k;A(l,{x:VPX-40-z*300,y:VPY-60-z*220,width:20+z*140,height:6+z*20,opacity:.3+.7*z})});
  if(hz)hz.upd(u,t,bt);A(wipe,{x2:760-(p.wipe?Math.abs(Math.sin(t*3))*160:0),y2:330+(p.wipe?Math.abs(Math.sin(t*3))*80:0)});
  A(wheel,{transform:`translate(640 760) rotate(${Math.sin(t*.8)*(p.steer==null?3:p.steer)})`});
  A(needle,{x:860+(p.fuel==null?0:p.fuel)*90});A(fuel,{opacity:p.gauge===false?0:1});}};

/* ---------- inside the Sunny Side diner (dark): counter, stools, menu board, a vending machine on the right, zombie customers ---------- */
LOC.dinerin=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,860,'#0c1018');R(f,-100,-100,1480,860,'url(#gWallShade)');
 for(let i=0;i<7;i++)R(f,i*190-30,120,150,200,'#101826',{stroke:'#1a2434','stroke-width':4,rx:6});            // windows with the night outside
 R(f,40,150,330,90,'#14100a',{rx:6,stroke:'#3a2a1a','stroke-width':4});for(let i=0;i<5;i++)T(f,70,184+i*0,'',1,'#fff');T(f,205,196,'TODAY: SOUP OF THE DEAD',26,'#e8d8a8',{'font-family':RCF,'font-weight':700,'letter-spacing':2});T(f,205,226,'$3.99',22,'#ffd23a',{'font-family':RCF,'font-weight':700});
 const neon=T(f,640,120,'OPEN',54,'#ff4a4a',{'font-family':RCF,'font-weight':700,'letter-spacing':12});C(f,640,100,140,'url(#gNeon)',{opacity:.5});
 R(m,-100,470,1480,200,'#15181f');R(m,-100,470,1480,14,'#3a4252');R(m,-100,540,1480,10,'#0a0c12');
 for(let i=0;i<9;i++){R(m,60+i*130,500,10,110,'#2a2f3a');C(m,65+i*130,492,30,'#a8243a',{stroke:'#0b0d12','stroke-width':3})}
 // vending machine
 const vm=G(m);R(vm,980,250,210,420,'#c0302a',{rx:10,stroke:'#0b0d12','stroke-width':5});R(vm,996,270,140,290,'#0e1a2a',{rx:6,stroke:'#0b0d12','stroke-width':4});
 const cans=[['#d9302a','#f4f4f6'],['#2a6ad0','#f4f4f6'],['#2ab85a','#f4f4f6'],['#ffd23a','#222']];
 for(let r=0;r<4;r++)for(let c=0;c<4;c++){const x=1006+c*30,y=284+r*68;R(vm,x,y,22,44,cans[(r+c)%4][0],{rx:4,stroke:'#0b0d12','stroke-width':2});R(vm,x,y+14,22,10,cans[(r+c)%4][1])}
 R(vm,1146,280,32,100,'#1a1d24',{rx:4});for(let i=0;i<6;i++)C(vm,1162,298+i*14,4,i===2?'#ffd23a':'#8a8f98');R(vm,996,576,196,60,'#050608',{rx:4});T(vm,1088,266,'COLD DRINKS',14,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 return (u,t,bt)=>{A(neon,{opacity:Math.sin(t*7.3)>-.8?1:.2})}};
