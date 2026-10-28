/* ===== THE LAST SUNRISE — scene library 3: props (sobj), info cards (scard), character scenes (schar), close-ups (sface) ===== */
function woodBg(f){R(f,-300,-300,1320,1880,'url(#gWood)');for(let i=0;i<10;i++)R(f,-300,i*150-30,1320,6,'#2e1a0c',{opacity:.55});C(f,360,500,420,'url(#gGlow)',{opacity:.22})}
function consoleBg(f){R(f,-300,-300,1320,1880,'#070d1a');C(f,360,420,520,'url(#gGlow)',{opacity:.12});R(f,-300,900,1320,600,'#0c1018')}
function icon(g,k,x,y,s,col){const q=G(g,{transform:`translate(${x} ${y}) scale(${s||1})`});
 if(k==='coat'){P(q,'M-26,-34 L-8,-40 L8,-40 L26,-34 L34,10 L22,14 L20,40 L-20,40 L-22,14 L-34,10Z',col||'#cf3a33',{stroke:'#1a0f0a','stroke-width':3,'stroke-linejoin':'round'});L(q,0,-38,0,40,'#7a1a18',3)}
 if(k==='radio'){R(q,-34,-24,68,50,'#4a5058',{rx:8,stroke:'#1a1d20','stroke-width':3});C(q,10,0,14,'#222');R(q,-26,-14,28,16,'#9fe8b0',{rx:3});L(q,22,-24,36,-46,'#aaa',3)}
 if(k==='jar'){R(q,-22,-34,44,64,'#dfeff5',{rx:10,opacity:.8,stroke:'#1a2a30','stroke-width':3});R(q,-24,-42,48,12,'#8a5a30',{rx:4});for(let i=0;i<9;i++)C(q,-12+(i%3)*12,-6+Math.floor(i/3)*12,3.4,['#e0a030','#6ab04a','#c05a3a'][i%3])}
 if(k==='paw'){E('ellipse',{cx:0,cy:8,rx:18,ry:15,fill:col||'#d98b3a'},q);for(const [a,b] of[[-18,-12],[-6,-22],[8,-22],[20,-12]])E('ellipse',{cx:a,cy:b,rx:6,ry:8,fill:col||'#d98b3a'},q)}
 if(k==='bulb'){C(q,0,-8,24,'#fff2a8',{stroke:'#2a2a30','stroke-width':3});R(q,-12,14,24,18,'#9a9aa4',{rx:4,stroke:'#2a2a30','stroke-width':3});L(q,-8,38,8,38,'#2a2a30',4)}
 if(k==='flame'){P(q,'M0,-44 Q22,-18 20,6 Q16,30 0,32 Q-16,30 -20,6 Q-22,-14 -6,-26 Q-6,-10 4,-8 Q8,-26 0,-44Z','#ff7a2a',{stroke:'#3a1408','stroke-width':3});P(q,'M0,-12 Q10,2 8,14 Q4,24 0,24 Q-6,22 -8,12 Q-8,0 0,-12Z','#ffd27a')}
 if(k==='drop'){P(q,'M0,-44 Q26,-8 22,12 Q16,34 0,34 Q-16,34 -22,12 Q-26,-8 0,-44Z','#4ab8f0',{stroke:'#0e2a44','stroke-width':3});P(q,'M-8,2 Q-8,16 2,22','none',{stroke:'#cfefff','stroke-width':4,'stroke-linecap':'round'})}
 if(k==='log'){C(q,0,0,22,'#a8703c',{stroke:'#2a1a0c','stroke-width':3});C(q,0,0,13,'none',{stroke:'#6a4220','stroke-width':3});C(q,0,0,5,'none',{stroke:'#6a4220','stroke-width':3})}
 if(k==='bag'){P(q,'M-26,34 L-30,-20 Q-30,-34 -12,-36 L12,-36 Q30,-34 30,-20 L26,34Z','#c9a46a',{stroke:'#2a1a0c','stroke-width':3});L(q,-14,-30,14,-30,'#6a4a22',4);T(q,0,12,'FOOD',16,'#4a3418',{'font-weight':900})}
 return q}
function checkMark(g,x,y,col){const q=G(g,{opacity:0});C(q,x,y,26,col||PAL.green);P(q,`M${x-12},${y} L${x-3},${y+10} L${x+14},${y-10}`,'none',{stroke:'#fff','stroke-width':7,'stroke-linecap':'round','stroke-linejoin':'round'});return q}
function crossMark(g,x,y){const q=G(g,{opacity:0});C(q,x,y,26,'#e83e36');L(q,x-11,y-11,x+11,y+11,'#fff',7);L(q,x+11,y-11,x-11,y+11,'#fff',7);return q}

/* ---------- props & diagrams ---------- */
LIB.sobj=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const k=p.kind;let upd=()=>{};
 if(k==='sensor'){consoleBg(f);
  R(m,50,200,620,470,'#0d1522',{rx:28,stroke:'#46557d','stroke-width':8});T(m,360,262,'SOLAR SENSOR',36,'#9fb4e0',{'letter-spacing':5,'font-weight':800});
  R(m,80,290,560,300,'#050a12',{rx:18,stroke:'#1c2a44','stroke-width':4});const num=T(m,330,470,'1000',170,'#3dff7a',{'font-family':'DejaVu Sans Mono, monospace','font-weight':700});T(m,360,552,'WATTS PER SQUARE METER',24,'#6f86b0',{'letter-spacing':3,'font-weight':800});
  const bar=R(m,100,610,520,16,'#3dff7a',{rx:8});R(m,100,610,520,16,'none',{rx:8,stroke:'#46557d','stroke-width':3});const sun=G(m,{transform:'translate(590 330)'});C(sun,0,0,30,'#ffd27a');for(let i=0;i<8;i++)L(sun,Math.cos(i*Math.PI/4)*40,Math.sin(i*Math.PI/4)*40,Math.cos(i*Math.PI/4)*54,Math.sin(i*Math.PI/4)*54,'#ffd27a',5);
  const ck=chip(Z.hud,p.clock||'12:08 PM',360,96,'#12304a');
  upd=(u,t,bt)=>{const v=Math.round(1000*(1-eo(clamp((bt-.5)/1.3))));num.textContent=String(v);const c=v>40?'#3dff7a':'#ff5a4a';A(num,{fill:c});A(bar,{width:520*v/1000,fill:c});A(sun,{opacity:Math.max(.12,v/1000)});ck(clamp(bt/.3))}}
 if(k==='probe'){R(f,-300,-300,1320,1880,'#0a0e18');
  R(m,60,200,600,560,'#2a1a14',{rx:10});for(let i=0;i<12;i++)P(m,`M60,${200+i*48+rnd(i)*20} q150,${rnd(i+3)*24-12} 300,0 t300,0`,'none',{stroke:'#1a0f0a','stroke-width':3,opacity:.6});
  const heat=R(m,60,200,600,560,'url(#gWarmGlowV)',{rx:10,opacity:.0});R(m,60,200,600,46,'#dcebfa',{rx:10});R(m,60,230,600,24,'#b9d3ee',{opacity:.7});
  const rows=[[0,'0 FT',-4,'#6ad0ff',284],[10,'10 FT',6,'#9fe0ff',386],[20,'20 FT',17,'#ffd27a',488],[40,'40 FT',38,'#ff7a3a',620]];const el=[];
  L(m,200,270,200,740,'#8a8f98',8);L(m,200,270,200,740,'#d8dde4',3);
  rows.forEach(([d,lb,v,c,y],i)=>{const g=G(m,{opacity:0});T(g,92,y+8,lb,24,'#e9d9b8',{'text-anchor':'start','font-weight':800,'letter-spacing':1});C(g,200,y,13,c,{stroke:'#fff','stroke-width':3});const pr=R(g,300,y-30,300,60,'#0b0f18',{rx:30,stroke:c,'stroke-width':4});const tv=T(g,450,y+16,'',46,c,{'font-family':'DejaVu Sans Mono, monospace','font-weight':700});el.push({g,tv,v,y})});
  const ck=chip(Z.hud,'GROUND SENSOR',360,96,'#12304a');
  upd=(u,t,bt)=>{ck(clamp(bt/.3));A(heat,{opacity:clamp((bt-1.4)/1.2)*.9});el.forEach((e,i)=>{const a=clamp((bt-.25-i*.4)/.3);A(e.g,{opacity:a});e.tv.textContent=(e.v<0?'−':'')+Math.abs(Math.round(e.v*clamp((bt-.25-i*.4)/.7)))+'°C'})}}
 if(k==='core'){R(f,-300,-300,1320,1880,'#04060d');C(f,360,430,520,'url(#gEmberHalo)',{opacity:.7});
  const CX=360,CY=430;C(m,CX,CY,262,'#2a1a14',{stroke:'#0a0604','stroke-width':6});C(m,CX,CY,244,'#8a2a14');C(m,CX,CY,170,'#e0561a');C(m,CX,CY,104,'#ffc24a');const core=C(m,CX,CY,60,'#fff4c8');
  const snow=P(m,`M${CX-120},${CY-232} Q${CX},${CY-290} ${CX+120},${CY-232} Q${CX},${CY-262} ${CX-120},${CY-232}Z`,'#eef6ff');
  T(m,CX,CY+10,'CORE',32,'#6a2a08',{'letter-spacing':5,'font-weight':900});T(m,CX,CY+48,'5,000°C',34,'#3a1204',{'font-weight':900});
  const arr=[];for(let i=0;i<10;i++)arr.push(P(m,'M-12,0 L0,-18 L12,0 L0,-6Z','#ffd27a',{opacity:.9}));
  const pr=[];for(let i=0;i<3;i++)pr.push(C(m,CX,CY,60,'none',{stroke:'#ffe9a8','stroke-width':4}));
  upd=(u,t,bt)=>{arr.forEach((a,i)=>{const ang=i/10*Math.PI*2+.3,ph=((t*.5+i/10)%1);const r=lerp(70,236,ph);A(a,{transform:`translate(${CX+Math.cos(ang)*r} ${CY+Math.sin(ang)*r}) rotate(${ang*180/Math.PI+90})`,opacity:Math.sin(Math.PI*ph)*.9})});pr.forEach((c,i)=>{const ph=((t*.6+i/3)%1);A(c,{r:lerp(60,258,ph),opacity:(1-ph)*.55})});A(core,{r:58+Math.sin(t*3)*3})}}
 if(k==='seedJar'){woodBg(f);
  const jar=G(m,{transform:'translate(360 390)'});R(jar,-96,-150,192,290,'#dfeff5',{rx:34,opacity:.55,stroke:'#1a2a30','stroke-width':6});R(jar,-100,-176,200,44,'#8a5a30',{rx:10,stroke:'#2a1a0c','stroke-width':5});
  for(let i=0;i<40;i++)E('ellipse',{cx:-70+rnd(i)*140,cy:-90+rnd(i+3)*210,rx:8,ry:5,fill:['#e0a030','#6ab04a','#c05a3a','#e8dcc0'][i%4],transform:`rotate(${rnd(i+9)*180} 0 0)`},jar);
  R(jar,-70,-20,140,70,'#f2e6c8',{rx:8,stroke:'#6a5a3a','stroke-width':3});T(jar,0,28,'SEEDS',44,'#3a2a14',{'letter-spacing':3});
  const gl=C(m,360,390,300,'url(#gGlow)',{opacity:.35});
  const hand=G(m);tube(hand,[[360,900],[360,700]],120,'#dba577','#2a1c13');E('ellipse',{cx:360,cy:620,rx:84,ry:60,fill:'#dba577',stroke:'#2a1c13','stroke-width':4},hand);
  [[300,[[306,590],[296,546],[318,512]]],[330,[[336,580],[330,530],[346,498]]],[362,[[368,578],[368,528],[372,496]]],[394,[[398,584],[408,536],[402,506]]]].forEach(([x,pts])=>tube(hand,pts,26,'#dba577','#2a1c13'));
  tube(hand,[[286,640],[250,598],[262,552]],26,'#dba577','#2a1c13');
  upd=(u,t,bt)=>{A(jar,{transform:`translate(360 ${390+Math.sin(t*1.6)*5}) rotate(${Math.sin(t*1.2)*1.5})`});A(gl,{opacity:.3+.1*Math.sin(t*2)})}}
 if(k==='sprout'){R(f,-300,-300,1320,1880,'#0b0710');C(f,360,380,440,'url(#gGrow)',{opacity:.5});P(m,'M190,76 L530,76 L660,610 L60,610Z','url(#gGrowCone)',{opacity:.75});
  R(m,130,36,460,34,'#d8d0e0',{rx:16,stroke:'#2a2a30','stroke-width':5});for(let i=0;i<8;i++)C(m,172+i*54,53,9,'#ffe2f8');
  P(m,'M190,660 L530,660 L504,790 L216,790Z','#b8603a',{stroke:'#2a1208','stroke-width':5});R(m,176,640,368,34,'#c8703f',{rx:8,stroke:'#2a1208','stroke-width':5});R(m,194,642,332,14,'#2a1a10',{rx:6});
  const st=G(m,{transform:'translate(360 646)'});const stem=P(st,'M0,0 L0,-1','none',{stroke:'#3a9a3a','stroke-width':15,'stroke-linecap':'round'});
  const lf=G(st);const l1=E('ellipse',{cx:-38,cy:-8,rx:42,ry:20,fill:'#5ed05a',stroke:'#1c5a28','stroke-width':4,transform:'rotate(-28 0 0)'},lf);const l2=E('ellipse',{cx:38,cy:-8,rx:42,ry:20,fill:'#6ee066',stroke:'#1c5a28','stroke-width':4,transform:'rotate(28 0 0)'},lf);
  const mo=[];for(let i=0;i<14;i++)mo.push(C(m,0,0,2.4+rnd(i)*2.6,'#ffc2f2'));
  const ck=chip(Z.hud,p.chip||'DAY 4',360,96,'#4a1a5a');
  upd=(u,t,bt)=>{ck(clamp(bt/.3));const g=ease(clamp((bt-.25)/2.0));const h=lerp(4,240,g);A(stem,{d:`M0,0 Q${Math.sin(t*1.3)*4},${-h/2} 0,${-h}`});A(lf,{transform:`translate(0 ${-h}) scale(${.1+.9*g}) rotate(${Math.sin(t*1.3)*3})`});
   mo.forEach((c,i)=>{const q=((t*.18+rnd(i))%1);A(c,{cx:150+rnd(i+3)*420+Math.sin(t+i)*10,cy:620-q*520,opacity:Math.sin(Math.PI*q)*.8})})}}
 if(k==='bowl'){woodBg(f);
  P(m,'M150,500 Q360,420 570,500 Q560,690 360,730 Q160,690 150,500Z','#e9dcc0',{stroke:'#4a3418','stroke-width':6});E('ellipse',{cx:360,cy:500,rx:210,ry:56,fill:'#f4ead2',stroke:'#4a3418','stroke-width':6},m);E('ellipse',{cx:360,cy:506,rx:186,ry:42,fill:'#2f6a34'},m);
  for(let i=0;i<26;i++){const x=200+rnd(i)*320,y=480+rnd(i+4)*44;const a=-50+rnd(i+9)*100;const g=G(m,{transform:`translate(${x} ${y}) rotate(${a})`});L(g,0,0,0,-34,'#3a9a3a',5);E('ellipse',{cx:-9,cy:-36,rx:11,ry:6,fill:'#6ee066',stroke:'#1c5a28','stroke-width':2.4},g);E('ellipse',{cx:9,cy:-38,rx:11,ry:6,fill:'#5ed05a',stroke:'#1c5a28','stroke-width':2.4},g)}
  R(m,560,560,150,18,'#9aa0aa',{rx:9,stroke:'#2a2a30','stroke-width':3});E('ellipse',{cx:722,cy:569,rx:30,ry:20,fill:'#9aa0aa',stroke:'#2a2a30','stroke-width':3},m);
  const stm=steamCol(m,360,470,10,40);
  const ck=chip(Z.hud,p.chip||'FIRST MEAL',360,96,'#1f6a34');
  upd=(u,t,bt)=>{ck(clamp(bt/.3));updSteam(stm,t,200,.14)}}
 if(k==='lamp'){darkBg(f);R(m,60,210,600,22,'#2a2a30',{rx:6});for(let i=0;i<2;i++){R(m,150+i*320,232,10,30,'#2a2a30')}
  const bar=G(m);R(bar,110,262,500,60,'#d8d0e0',{rx:16,stroke:'#2a2a30','stroke-width':5});for(let i=0;i<10;i++)C(bar,150+i*48,292,12,'#3a3a44');
  const cord=P(m,'M360,322 Q360,420 300,480 Q250,540 330,590','none',{stroke:'#16161c','stroke-width':9,'stroke-linecap':'round'});
  const plug=G(m,{transform:'translate(330 596) rotate(18)'});R(plug,-26,0,52,52,'#2a2a30',{rx:8});L(plug,-12,52,-12,86,'#c0c4ca',7);L(plug,12,52,12,86,'#c0c4ca',7);
  R(m,500,520,120,150,'#c8c2b0',{rx:14,stroke:'#6a6450','stroke-width':4});R(m,534,556,16,40,'#2a2a30');R(m,568,556,16,40,'#2a2a30');
  const x=G(m,{opacity:0});C(x,560,420,50,'#b3151c',{stroke:'#fff','stroke-width':5});T(x,560,440,'×',70,'#fff');
  const ck=chip(Z.hud,'NO POWER',360,96,'#b3151c');
  upd=(u,t,bt)=>{ck(clamp(bt/.3));A(x,{opacity:clamp((bt-.5)/.3)});A(plug,{transform:`translate(${330+Math.sin(t*1.2)*3} ${596}) rotate(${18+Math.sin(t*1.2)*3})`})}}
 if(k==='alternator'){R(f,-300,-300,1320,1880,'url(#gWarmRoom)');R(f,-300,880,1320,600,'#1a0e08');C(f,360,500,420,'url(#gGlow)',{opacity:.3});
  const g=G(m,{transform:'translate(360 470)'});R(g,-190,-120,300,240,'#7a8794',{rx:60,stroke:'#1a1f26','stroke-width':6});R(g,-40,-130,40,260,'#566270',{rx:10});for(let i=0;i<7;i++)R(g,-150+i*34,-110,16,40,'#2a323c',{rx:5});for(let i=0;i<7;i++)R(g,-150+i*34,70,16,40,'#2a323c',{rx:5});
  R(g,-250,-30,70,60,'#9aa6b2',{rx:10,stroke:'#1a1f26','stroke-width':5});const pul=G(g,{transform:'translate(-250 0)'});E('ellipse',{cx:0,cy:0,rx:30,ry:76,fill:'#aab4be',stroke:'#1a1f26','stroke-width':6},pul);for(let i=0;i<3;i++)L(pul,0,-60+i*60,0,-60+i*60,'#1a1f26',2);
  R(g,110,-80,50,50,'#c9a64a',{rx:8});R(g,110,30,50,50,'#c0c4ca',{rx:8});P(g,'M160,-55 Q230,-70 250,-140','none',{stroke:'#d33',  'stroke-width':10,'stroke-linecap':'round'});P(g,'M160,55 Q240,70 250,150','none',{stroke:'#222','stroke-width':10,'stroke-linecap':'round'});
  const ck=callout(Z.hud,360,96,'a','CAR ALTERNATOR',420);
  upd=(u,t,bt)=>{ck(clamp(bt/.35));A(g,{transform:`translate(360 ${470+Math.sin(t*1.5)*3})`})}}
 if(k==='turbine'||k==='turbine2'){R(f,-300,-300,1320,1880,'url(#gCaveBg)');for(let i=0;i<10;i++)P(f,`M${i*86-30},-40 L${i*86+30},-40 L${i*86},${60+rnd(i)*100}Z`,'#0c0708');
  R(m,-300,720,1320,700,'#1d110d');
  // vent pipe + steam
  R(m,106,560,60,170,'#5a626c',{rx:8,stroke:'#14181c','stroke-width':5});R(m,96,548,80,22,'#7a828c',{rx:6});const jet=steamCol(m,136,540,12,34);
  // fan
  const fan=G(m,{transform:'translate(136 380)'});C(fan,0,0,92,'none',{stroke:'#3a4048','stroke-width':6});for(let i=0;i<6;i++)P(fan,'M0,0 Q24,-40 8,-82 Q-10,-50 0,0Z','#c9ced6',{stroke:'#14181c','stroke-width':3,transform:`rotate(${i*60})`});C(fan,0,0,12,'#14181c');
  // belt + alternator
  L(m,136,380,400,500,'#14181c',9);L(m,136,380,400,500,'#3a3a40',4,{'stroke-dasharray':'6 6'});
  const alt=G(m,{transform:'translate(470 500)'});R(alt,-70,-50,150,100,'#7a8794',{rx:30,stroke:'#14181c','stroke-width':5});for(let i=0;i<5;i++)R(alt,-52+i*24,-40,10,24,'#2a323c',{rx:3});const ap=C(alt,-72,0,26,'#aab4be',{stroke:'#14181c','stroke-width':5});
  // wire + bulb
  P(m,'M540,490 Q620,470 600,300','none',{stroke:'#d33','stroke-width':6,'stroke-linecap':'round'});const bulb=G(m,{transform:'translate(600 262)'});const hl=C(bulb,0,0,120,'url(#gLantern)',{opacity:0});C(bulb,0,0,28,'#fff2a8',{stroke:'#2a2a30','stroke-width':3});R(bulb,-12,26,24,22,'#9a9aa4',{rx:4});
  T(m,136,660,'1 STEAM',26,'#ffd27a',{'font-weight':900,'letter-spacing':2});T(m,160,236,'2 FAN',26,'#ffd27a',{'font-weight':900,'letter-spacing':2});T(m,470,590,'3 POWER',26,'#ffd27a',{'font-weight':900,'letter-spacing':2});
  upd=(u,t,bt)=>{updSteam(jet,t,150,.22);const sp=(p.slow?260:900)*(p.fast?1.6:1);A(fan,{transform:`translate(136 380) rotate(${t*sp})`});A(ap,{opacity:1});A(hl,{opacity:clamp((bt-.5)/.6)*(.8+.15*Math.sin(t*5))})}}
 if(k==='vent'){const SURF=400;R(f,-300,-300,1320,1880,'#050a14');stars(f,40,300,12);
  const clog=Array.isArray(p.clog)?p.clog:[p.clog||0,p.clog||0];
  P(m,`M-20,${SURF} L740,${SURF} L740,780 L-20,780Z`,'#2e1c15');for(let i=0;i<16;i++)P(m,`M${-20+rnd(i)*700},${SURF+20+rnd(i+3)*400} l${30+rnd(i)*60},${rnd(i+5)*24-12}`,'none',{stroke:'#170c08','stroke-width':3,opacity:.65});
  R(m,-20,SURF-26,760,32,'#dcebfa',{rx:10});R(m,-20,SURF,760,8,'#9db6d4',{opacity:.7});
  const heat=R(m,-20,560,760,220,'url(#gWarmGlowV)',{opacity:.9});
  let wp=null;if(p.labels){wp=G(m);E('ellipse',{cx:140,cy:690,rx:92,ry:46,fill:'url(#gWater)',stroke:'#0e4a52','stroke-width':4},wp);T(wp,140,700,'WATER',26,'#04323a',{'font-weight':900,'letter-spacing':2});T(m,604,690,'HEAT',30,'#ffd27a',{'font-weight':900,'letter-spacing':2,stroke:'#000','stroke-width':6,'paint-order':'stroke fill'});T(m,604,726,'38°C',34,'#ffd27a',{'font-weight':900,stroke:'#000','stroke-width':6,'paint-order':'stroke fill'})}
  const wall=P(m,'M0,0','#0b0507');const crust=P(m,'M0,0','#eef0ea',{stroke:'#9aa0a8','stroke-width':3});const glow=P(m,'M0,0','url(#gWarmGlowV)',{opacity:.8});
  const stm=steamCol(m,360,SURF-10,24,34);const stm2=steamCol(m,360,740,18,30);
  const gauge=G(Z.hud,{opacity:0});C(gauge,590,168,78,'#0b1020',{stroke:'#46557d','stroke-width':6});P(gauge,'M538,196 A58,58 0 0 1 642,196','none',{stroke:'#2a3e66','stroke-width':14,'stroke-linecap':'round'});const gar=P(gauge,'M538,196 A58,58 0 0 1 642,196','none',{stroke:'#3dff7a','stroke-width':14,'stroke-linecap':'round',pathLength:1,'stroke-dasharray':'1 1'});const gn=T(gauge,590,186,'100%',34,'#fff',{'font-family':'DejaVu Sans Mono, monospace'});T(gauge,590,128,'STEAM',16,'#9fb4e0',{'letter-spacing':3,'font-weight':800});T(gauge,590,146,'PRESSURE',16,'#9fb4e0',{'letter-spacing':3,'font-weight':800});
  let tm=null,rodE=null;if(p.team){const SY=SURF-6;tm=G(m);keeper(tm,{who:'mara',view:'side',pose:'reach',x:292,y:SY,s:.78,mood:'night',pack:0,noShadow:true});keeper(tm,{who:'cole',view:'side',pose:'reach',x:428,y:SY,s:.78,mood:'night',flip:true,noShadow:true});
   rodE=G(m);R(rodE,352,150,16,330,'#c9ced6',{rx:6,stroke:'#14181c','stroke-width':3});P(rodE,'M352,480 L368,480 L360,510Z','#c9ced6',{stroke:'#14181c','stroke-width':3})}
  const showG=p.labels||p.team?false:true;
  upd=(u,t,bt)=>{const c=lerp(clog[0],clog[1],ease(clamp(bt/1.8)));const W=100,ww=lerp(4,66,c),op=W-ww;
   A(wall,{d:`M${360-W-60},780 L${360-W-6},${SURF+2} L${360+W+6},${SURF+2} L${360+W+60},780Z`});
   A(glow,{d:`M${360-op},780 L${360-op+4},${SURF+8} L${360+op-4},${SURF+8} L${360+op},780Z`});
   A(crust,{d:`M${360-W-60},780 L${360-W-6},${SURF+2} L${360-op+4},${SURF+8} L${360-op},780Z M${360+W+60},780 L${360+W+6},${SURF+2} L${360+op-4},${SURF+8} L${360+op},780Z`});
   const burst=p.burst?clamp((bt-.15)/.9):0;const open=clamp(1-c*.8);
   updSteam(stm,t,lerp(120,150,open)+burst*330,.12);updSteam(stm2,t,360,.16);
   stm.a.forEach(([cc,i])=>A(cc,{opacity:parseFloat(cc.getAttribute('opacity')||0)*(open*(1+burst*.5))}));stm2.a.forEach(([cc,i])=>A(cc,{opacity:parseFloat(cc.getAttribute('opacity')||0)*open*.8}));
   if(burst)stm.a.forEach(([cc,i])=>A(cc,{r:parseFloat(cc.getAttribute('r'))*(1+burst*1.6)}));
   if(rodE)A(rodE,{transform:`translate(0 ${eo(clamp((bt-.3)/1.2))*34})`});const pc=Math.round(100*(1-c*.62));if(showG){A(gauge,{opacity:clamp(bt/.3)});A(gar,{'stroke-dashoffset':1-pc/100,stroke:pc>70?'#3dff7a':(pc>45?'#ffca28':'#ff5a4a')});gn.textContent=pc+'%'}}}
 if(k==='rod'){R(f,-300,-300,1320,1880,'#0a0e18');for(let i=-6;i<20;i++)L(f,i*60,-300,i*60,1580,'#1d3a66',1.5,{opacity:.12,'stroke-linecap':'butt'});
  person(m,140,720,2.2,'#5a6a82',{});T(m,140,760,'6 FT',26,'#9fb4e0',{'font-weight':800,'letter-spacing':2});
  const rod=R(m,300,280,22,440,'#c9ced6',{rx:6,stroke:'#14181c','stroke-width':4});P(m,'M300,720 L322,720 L311,752Z','#c9ced6',{stroke:'#14181c','stroke-width':3});
  L(m,390,280,390,720,'#ffd27a',4);L(m,376,280,404,280,'#ffd27a',4);L(m,376,720,404,720,'#ffd27a',4);T(m,448,516,'8 FT',54,'#ffd27a',{'font-weight':900,stroke:'#000','stroke-width':8,'paint-order':'stroke fill'});
  R(m,520,640,170,100,'#3a2418',{rx:8});R(m,520,596,170,50,'#eef0ea',{rx:8,stroke:'#8a8f98','stroke-width':3});T(m,605,632,'CRUST',24,'#3a3a40',{'font-weight':900,'letter-spacing':2});T(m,605,708,'2 FT',46,'#ff9a5a',{'font-weight':900});
  upd=(u,t,bt)=>A(rod,{y:280+Math.sin(t*2)*2})}
 if(k==='sled'){woodBg(f);
  const door=G(m,{transform:'translate(150 480)'});R(door,-84,-190,168,380,'#8a5a30',{rx:8,stroke:'#2a1a0c','stroke-width':6});for(const [x,y,w,h] of[[-60,-166,52,130],[8,-166,52,130],[-60,-20,52,160],[8,-20,52,160]])R(door,x,y,w,h,'#a8703c',{rx:5,stroke:'#6a4220','stroke-width':3});C(door,62,0,11,'#e6c070',{stroke:'#2a1a0c','stroke-width':3});
  P(m,'M262,480 L350,480 L350,462 L420,500 L350,538 L350,520 L262,520Z','#ffca28',{stroke:'#000','stroke-width':4});
  const sl=G(m,{transform:'translate(480 540)'});P(sl,'M-150,-6 L130,-6 L170,-34 L170,-18 L140,12 L-150,12Z','#8a5a30',{stroke:'#2a1a0c','stroke-width':5});for(let i=0;i<4;i++)R(sl,-140+i*66,-2,56,10,'#a8703c',{rx:3});C(sl,100,0,5,'#e6c070');
  R(sl,-110,-70,110,64,'#5a6a4a',{rx:12,stroke:'#2a1a0c','stroke-width':4});R(sl,-90,-84,40,18,'#8a5a30',{rx:5});P(sl,'M170,-26 Q200,-40 216,-84','none',{stroke:'#d9c9a0','stroke-width':5,'stroke-linecap':'round'});
  const ck=callout(Z.hud,360,96,'s','1 DOOR = 1 SLED',420);
  upd=(u,t,bt)=>{ck(clamp(bt/.35));A(sl,{transform:`translate(480 ${540+Math.sin(t*1.5)*3})`})}}
 if(k==='foot'){R(f,-300,-300,1320,1880,'#0a1020');C(f,360,480,420,'url(#gCyan)',{opacity:.3});
  const g=G(m,{transform:'translate(360 520) rotate(14) scale(2)'});tube(g,[[0,260],[0,120]],92,'#9a3a30','#2a1c13');R(g,-52,108,104,20,'#e6dcc4',{rx:8,stroke:'#2a1c13','stroke-width':3});
  P(g,'M-44,-30 Q-60,-86 -40,-116 L42,-116 Q64,-86 50,-30 Q38,10 42,54 Q46,104 14,122 Q-22,128 -40,100 Q-56,56 -38,12 Q-52,-8 -44,-30Z','#dba577',{stroke:'#2a1c13','stroke-width':3});
  [[-34,-124,16,'#eef4fa'],[-10,-134,13,'#e4eef8'],[11,-134,12,'#dfeaf6'],[29,-128,11,'#dba577'],[44,-116,9.5,'#dba577']].forEach(([x,y,r,c])=>C(g,x,y,r,c,{stroke:'#2a1c13','stroke-width':3}));
  for(let i=0;i<8;i++)C(g,-40+i*12,-150+rnd(i)*14,2.6,'#bfe8ff',{opacity:.85});
  const pl=chip(Z.hud,'FROSTBITE',360,96,'#1a6a9a');
  upd=(u,t,bt)=>{pl(clamp(bt/.3));A(g,{transform:`translate(360 ${520+Math.sin(t*1.6)*3}) rotate(14) scale(2)`})}}
 if(k==='warm'){R(f,-300,-300,1320,1880,'url(#gColdSky)');C(f,360,560,480,'url(#gLantern)',{opacity:.55});R(f,-300,700,1320,700,'url(#gSnowGnd)');
  const dg=dog(m,{x:260,y:760,s:2.5,pose:'lie',noShadow:false});
  const ft=G(m,{transform:'translate(330 560) rotate(-14)'});P(ft,'M-70,-26 Q-70,-50 -30,-50 L40,-44 Q76,-40 76,-10 Q74,22 36,24 L-44,24 Q-70,20 -70,-26Z','#9a3a30',{stroke:'#2a1c13','stroke-width':4});R(ft,-84,-62,34,58,'#b84a3a',{rx:8,stroke:'#2a1c13','stroke-width':4});L(ft,-80,-44,-52,-44,'#e6dcc4',5);
  const hearts=[];for(let i=0;i<4;i++)hearts.push(P(m,'M0,6 C-14,-8 -14,-22 0,-14 C14,-22 14,-8 0,6Z','#ff6a7a'));
  const pl=chip(Z.hud,'WARM',360,96,'#9a3a1a');
  upd=(u,t,bt)=>{dogMove(dg,t,0);pl(clamp(bt/.3));hearts.forEach((h,i)=>{const q=((t*.5+i/4)%1);A(h,{transform:`translate(${300+i*34+Math.sin(t*2+i)*6} ${440-q*140}) scale(${.8+q*.6})`,opacity:Math.sin(Math.PI*q)*.9})})}}
 return (u,t,bt)=>upd(u,t,bt)};

/* ---------- info cards ---------- */
LIB.scard=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const k=p.kind;let upd=()=>{};
 if(k==='rule'){darkBg(f);const N=p.n;const rc=ruleCard2(Z.hud,360,90,N,p.text);
  const art=G(m,{transform:'translate(0 44)'});
  if(N===1){const cx=360,cy=500;C(art,cx,cy,196,'#f4ecd2',{stroke:'#1b1710','stroke-width':10});for(let i=0;i<12;i++){const a=i*Math.PI/6;L(art,cx+Math.sin(a)*168,cy-Math.cos(a)*168,cx+Math.sin(a)*184,cy-Math.cos(a)*184,'#1b1710',i%3==0?8:4)}
   const hand=G(art,{transform:`translate(${cx} ${cy})`});const h1=L(hand,0,0,0,-120,'#e83e36',12);const h2=L(hand,0,0,0,-80,'#1b1710',16);icon(art,'flame',cx,cy+12,2.4);upd=(u,t,bt)=>{A(h1,{transform:`rotate(${t*60})`});A(h2,{transform:`rotate(${t*5})`})}}
  if(N===2){C(art,200,500,110,'#9fd8ff',{stroke:'#0e2a44','stroke-width':6});for(let i=0;i<3;i++)L(art,200+Math.cos(i*Math.PI/3)*80,500+Math.sin(i*Math.PI/3)*80,200-Math.cos(i*Math.PI/3)*80,500-Math.sin(i*Math.PI/3)*80,'#fff',8);
   icon(art,'flame',540,500,3.4);const ar=P(art,'M300,500 L420,500','none',{stroke:'#ffca28','stroke-width':14,'stroke-linecap':'round','stroke-dasharray':'26 18'});P(art,'M410,462 L470,500 L410,538Z','#ffca28');upd=(u,t)=>A(ar,{'stroke-dashoffset':-t*60})}
  if(N===3){const g=G(art,{transform:'translate(360 520) scale(2.1)'});P(g,'M-60,-90 Q-60,-120 -30,-120 L20,-120 Q34,-120 34,-90 L34,-44 Q90,-30 100,14 Q104,44 70,44 L-60,44Z','#3a3040',{stroke:'#1a0f0a','stroke-width':4});R(g,-64,38,172,18,'#14101a',{rx:6});L(g,-30,-110,20,-110,'#6a5a7a',5);for(let i=0;i<3;i++)L(g,-40+i*20,-60+i*0,-40+i*20,-40,'#6a5a7a',4);
   const cl=G(art,{transform:'translate(560 330)'});C(cl,0,0,66,'#f4ecd2',{stroke:'#1b1710','stroke-width':7});L(cl,0,0,0,-40,'#e83e36',7);L(cl,0,0,26,10,'#1b1710',7);T(cl,0,100,'EVERY HOUR',22,'#fff',{'font-weight':900,'letter-spacing':2})}
  if(N===4){person(art,230,700,3.2,'#c9ced6',{});person(art,520,700,3.2,'#c9ced6',{flip:true});R(art,200,430,330,18,'#9aa0aa',{rx:9,stroke:'#14181c','stroke-width':4})}
  upd=((old)=>(u,t,bt)=>{old(u,t,bt);rc(clamp(bt/.35))})(upd)}
 if(k==='pack'){woodBg(f);const q=G(Z.hud);R(q,70,130,580,560,'#f2e8c8',{rx:24,stroke:'#bfae80','stroke-width':3});R(q,280,100,160,52,'#a89466',{rx:12});T(q,360,206,'GO BAG',50,'#2a2418',{'letter-spacing':6});L(q,110,226,610,226,'#2a2418',3,{'stroke-linecap':'butt'});
  const rows=[['coat','A WARM COAT',360],['radio','HAND RADIO',500],['jar','JAR OF SEEDS',640]].map(([ic,lb,y],i)=>{const yy=250+i*140;icon(q,ic,150,yy+54,1.7);T(q,222,yy+68,lb,42,'#1f1a10',{'text-anchor':'start','font-weight':900});const ck=checkMark(q,580,yy+54);const bx=R(q,556,yy+30,48,48,'none',{rx:8,stroke:'#6b5f45','stroke-width':4});return {ck,bx}});
  upd=(u,t,bt)=>{rows.forEach((r,i)=>{const a=clamp((bt-.35-i*.55)/.2);A(r.ck,{opacity:a,transform:`translate(0 0)`})})}}
 if(k==='meter'){woodBg(f);const art=G(m);
  const q=G(Z.hud,{opacity:0});R(q,70,110,580,230,'#f7f3e6',{rx:24,stroke:p.warn?'#e83e36':'#cfc7a8','stroke-width':p.warn?7:3});C(q,160,225,52,'#1d1d22');icon(q,p.icon||'log',160,228,1.5);T(q,240,170,p.label,28,'#6b5f45',{'text-anchor':'start','letter-spacing':3,'font-weight':800});
  const num=T(q,240,282,String(p.from),100,p.warn?'#c2181a':'#1f1a10',{'text-anchor':'start'});const un=T(q,400,282,p.unit,36,'#6b5f45',{'text-anchor':'start'});
  const N=21,logs=[];if(p.art==='wood'){let k0=0;for(let r=0;r<6;r++)for(let c=0;c<6-r;c++){logs.push(icon(art,'log',360+(c-(5-r)/2)*58,660-r*50,1.25));k0++}}
  if(p.art==='food'){for(let i=0;i<9;i++)logs.push(icon(art,'bag',140+(i%5)*110+(i>=5?55:0),i>=5?540:650,1.9))}
  upd=(u,t,bt)=>{const a=eb(clamp(bt/.4));A(q,{opacity:clamp(bt*5),transform:`translate(0 ${(1-a)*50})`});const v=lerp(p.from,p.to,eo(clamp((bt-.25)/1.1)));num.textContent=String(Math.round(v));A(un,{x:240+num.getComputedTextLength()+14});
   const keep=Math.round(logs.length*clamp(v/p.from));logs.forEach((l,i)=>A(l,{opacity:i<keep?1:.12}))}}
 if(k==='foodgap'){consoleBg(f);const x0=80,W=560;const t25=W,t9=W*9/25;
  T(m,x0,250,'FOOD LEFT',30,'#9fb4e0',{'text-anchor':'start','letter-spacing':4,'font-weight':800});R(m,x0,270,W,70,'#0d1522',{rx:14});const b1=R(m,x0,270,0,70,'#3dff7a',{rx:14});const n1=T(m,x0+t9-16,322,'9 DAYS',38,'#04230f',{'text-anchor':'end','font-weight':900});
  T(m,x0,430,'RADISH GROWS IN',30,'#9fb4e0',{'text-anchor':'start','letter-spacing':4,'font-weight':800});R(m,x0,450,W,70,'#0d1522',{rx:14});const b2=R(m,x0,450,0,70,'#c05a8a',{rx:14});const n2=T(m,x0+W-16,502,'25 DAYS',38,'#fff',{'text-anchor':'end','font-weight':900});
  const gp=G(m,{opacity:0});R(gp,x0+t9,550,t25-t9,22,'#e83e36',{rx:11});L(gp,x0+t9,540,x0+t9,584,'#e83e36',5);L(gp,x0+t25,540,x0+t25,584,'#e83e36',5);T(gp,x0+(t9+t25)/2,640,'16-DAY GAP',54,'#ff5a4a',{'font-weight':900,stroke:'#000','stroke-width':8,'paint-order':'stroke fill','letter-spacing':2});
  const show=p.show||'both';
  upd=(u,t,bt)=>{A(b1,{width:t9*eo(clamp(bt/.7))});A(n1,{opacity:clamp((bt-.6)/.2)});const a2=show==='both'?eo(clamp((bt-.1)/.9)):0;A(b2,{width:W*a2});A(n2,{opacity:show==='both'?clamp((bt-.8)/.2):0});A(gp,{opacity:show==='both'?clamp((bt-1.2)/.3)*(.8+.2*Math.sin(t*5)):0})}}
 if(k==='needs'){consoleBg(f);const cols=[['flame','HEAT',140,'#ff7a2a'],['drop','WATER',360,'#4ab8f0'],['bulb','LIGHT',580,'#ffd27a']];const mk=p.marks||[0,0,0];const ms=[],cg=[];
  cols.forEach(([ic,lb,x,c],i)=>{const g=G(m,{opacity:0});C(g,x,440,84,'#0d1522',{stroke:c,'stroke-width':6});icon(g,ic,x,444,2.2);T(g,x,586,lb,36,'#e9d9b8',{'font-weight':900,'letter-spacing':3});cg.push(g);
   const okk=checkMark(m,x,310,PAL.green),bad=crossMark(m,x,310);ms.push([okk,bad,i])});
  const ck=chip(Z.hud,'PLANTS NEED 3 THINGS',360,96,'#12304a');
  upd=(u,t,bt)=>{ck(clamp(bt/.3));cg.forEach((g,i)=>A(g,{opacity:clamp((bt-.15-i*.55)/.25)}));ms.forEach(([okk,bad,i])=>{const v=mk[i];const a=clamp((bt-.5-i*.45)/.2);A(okk,{opacity:v===1?a:0});A(bad,{opacity:v===-1?a*(.7+.3*Math.sin(t*6)):0})})}}
 if(k==='map'){R(f,-300,-300,1320,1880,'#0a2336');for(let i=0;i<9;i++)P(f,`M-100,${300+i*70} Q150,${240+i*70+rnd(i)*60} 360,${320+i*70} T820,${300+i*70}`,'none',{stroke:'#2a5a7a','stroke-width':2,opacity:.5});
  P(m,'M420,262 L510,222 L590,272 L550,342 L450,332Z','#274a64',{stroke:'#8ee6b0','stroke-width':3});P(m,'M120,620 L220,560 L330,600 L300,690 L170,700Z','#274a64',{stroke:'#8ee6b0','stroke-width':3});
  C(m,200,650,18,'#3dff7a',{stroke:'#fff','stroke-width':4});T(m,200,700,'PINE RIDGE STATION',24,'#cfe6d0',{'font-weight':800,'letter-spacing':2});
  C(m,500,290,22,'#ff7a2a',{stroke:'#fff','stroke-width':4});C(m,500,290,48,'url(#gLantern)',{opacity:.7});T(m,500,212,'EAGLE HOT SPRING',24,'#ffd27a',{'font-weight':800,'letter-spacing':2});
  const rt=P(m,'M214,640 Q330,600 300,520 T450,420 T496,312','none',{stroke:'#ffca28','stroke-width':8,'stroke-dasharray':'20 16','stroke-linecap':'round'});
  T(m,440,580,'12 MI',70,'#ffca28',{'font-weight':900,stroke:'#000','stroke-width':8,'paint-order':'stroke fill'});
  const ck=chip(Z.hud,p.chip||'ONE WARM PLACE',360,96,'#173a52');
  upd=(u,t,bt)=>{A(rt,{'stroke-dashoffset':-t*50});ck(clamp(bt/.3))}}
 if(k==='count'){R(f,-300,-300,1320,1880,'#050912');C(f,360,420,420,'url(#gGlow)',{opacity:.2});
  const ring=C(m,360,430,200,'none',{stroke:'#ffca28','stroke-width':14,pathLength:1,'stroke-dasharray':'1 1'});const nm=T(m,360,520,'3',330,'#fff',{'font-family':'DejaVu Sans Mono, monospace','font-weight':700,stroke:'#000','stroke-width':14,'paint-order':'stroke fill'});
  upd=(u,t,bt)=>{const s=Math.floor(bt/.72);const txt=s>=3?'PUSH':String(3-s);nm.textContent=txt;A(nm,{'font-size':txt==='PUSH'?150:330,fill:txt==='PUSH'?'#ff5a4a':'#fff'});const ph=(bt%.72)/.72;A(ring,{'stroke-dashoffset':ph,stroke:txt==='PUSH'?'#ff5a4a':'#ffca28',transform:`rotate(-90 360 430)`})}}
 return (u,t,bt)=>upd(u,t,bt)};

/* ---------- character scenes ---------- */
LIB.schar=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const bg=p.bg||'station';let upd=()=>{};const FY=p.floor||722;const frost=[];let haze=null;
 if(bg==='station'){R(f,-300,-300,1320,1880,'#10182a');R(f,-300,FY,1320,700,'#1a1410');R(f,-300,FY,1320,6,'#2a2018');
  // window with the sky
  const sky=p.sky||'day';R(m,40,120,300,360,sky==='day'?'url(#gDay)':'#02040a',{rx:10,stroke:'#2a2a34','stroke-width':10});if(sky==='day'){C(m,250,230,38,'#fff4c8');C(m,250,230,90,'url(#gSunHalo)')}else{stars(m,26,440,3)}
  L(m,190,120,190,480,'#2a2a34',8);L(m,40,300,340,300,'#2a2a34',8);
  // monitors
  for(let i=0;i<3;i++){R(m,380+i*0,150+i*0,0,0,'#000')}
  [[380,150],[540,150],[380,300],[540,300]].forEach(([x,y],i)=>{R(m,x,y,140,120,'#06101c',{rx:8,stroke:'#46557d','stroke-width':5});const g=G(m);P(g,`M${x+12},${y+90} q20,-50 40,-20 t40,-30 t30,10`,'none',{stroke:i%2?'#3dff7a':'#6ae6ff','stroke-width':4})});
  R(m,360,470,330,24,'#4a3626',{rx:6});R(m,370,494,16,230,'#3a2a1c');R(m,664,494,16,230,'#3a2a1c');
  R(m,600,440,36,30,'#9aa0aa',{rx:6});
 }
 if(bg==='house'){R(f,-300,-300,1320,1880,'url(#gWarmRoom)');C(f,360,520,380,'url(#gLantern)',{opacity:.55});R(f,-300,FY,1320,700,'#1a0e08');R(f,-300,FY,1320,6,'#3a2414');
  // frosted window + candle
  if(!p.frost){R(m,470,170,190,250,'#0f1c30',{rx:8,stroke:'#3a2a1c','stroke-width':10});for(let i=0;i<7;i++)P(m,`M${480+i*24},420 l${6-i%3*4},-${50+rnd(i)*80} l8,${40+rnd(i)*20}Z`,'#dff0ff',{opacity:.55});L(m,565,170,565,420,'#3a2a1c',6)}
  else{R(m,400,150,260,340,'#0f1c30',{rx:10,stroke:'#3a2a1c','stroke-width':12});L(m,530,150,530,490,'#3a2a1c',7);L(m,400,320,660,320,'#3a2a1c',7);
   [[400,490],[660,490],[400,150],[660,150]].forEach(([cx,cy],ci)=>{for(let i=0;i<5;i++){const a=Math.atan2(320-cy,530-cx)+(rnd(ci*5+i)-.5)*1.1,len=80+rnd(ci*7+i)*110;let d=`M${cx},${cy}`,x=cx,y=cy;for(let k=1;k<=4;k++){x+=Math.cos(a)*len/4+(rnd(ci*9+i*3+k)-.5)*16;y+=Math.sin(a)*len/4+(rnd(ci*11+i*5+k)-.5)*16;d+=` L${x.toFixed(1)},${y.toFixed(1)}`}frost.push(P(m,d,'none',{stroke:'#eaf6ff','stroke-width':3.4,'stroke-linecap':'round',opacity:.85,pathLength:1,'stroke-dasharray':'1 1','stroke-dashoffset':1}))}});
   haze=R(m,400,150,260,340,'#dff0ff',{rx:10,opacity:0})}
  R(m,90,560,60,14,'#c9b080',{rx:4});R(m,114,520,12,40,'#f2e6c8');P(m,'M120,520 Q112,500 120,488 Q128,500 120,520Z','#ffd27a')}
 if(bg==='snow'){R(f,-300,-300,1320,1880,'url(#gColdSky)');stars(f,60,400,5);R(m,-300,610,1320,800,'url(#gSnowGnd)')}
 // characters
 const dgSpec=p.dog;let dg=null,hero=null,hero2=null;
 if(p.who){const sc=p.s||1.5;
  hero=keeper(m,{who:p.who,view:p.view||'side',pose:p.pose||'stand',x:p.x||420,y:FY,s:sc,mood:p.mood||'warm',expr:p.expr,flip:p.flip,pack:p.pack});
  if(p.hold==='wrench'){const w=G(hero,{transform:'translate(44 -196) rotate(-20)'});R(w,-6,-80,12,120,'#7a8088',{rx:5,stroke:'#1a1a1a','stroke-width':3})}}
 if(dgSpec)dg=dog(m,{x:p.dogX||250,y:FY+8,s:p.dogS||1.5,pose:dgSpec,flip:p.dogFlip,boots:p.boots});
 const hearts=[];if(p.hearts){for(let i=0;i<4;i++)hearts.push(P(m,'M0,6 C-14,-8 -14,-22 0,-14 C14,-22 14,-8 0,6Z','#ff6a7a'))}
 R(n,-300,930,1320,500,'#060810',{opacity:.55});
 const ck=p.chip?chip(Z.hud,p.chip,360,96,p.chipFill||'#12304a'):null;
 return (u,t,bt)=>{if(hero)kmove(hero,t,1.5,1.3);if(dg)dogMove(dg,t,0);frost.forEach((l,i)=>A(l,{'stroke-dashoffset':1-eo(clamp((bt-.1-i*.05)/1.6))}));if(haze)A(haze,{opacity:.3*eo(clamp(bt/3))});
  if(p.armTo&&hero){}
  hearts.forEach((h,i)=>{const q=((t*.5+i/4)%1);A(h,{transform:`translate(${360+i*30-45+Math.sin(t*2+i)*6} ${400-q*150}) scale(${.8+q*.6})`,opacity:Math.sin(Math.PI*q)*.9})});
  if(ck)ck(clamp(bt/.3))}};

/* ---------- face close-ups ---------- */
LIB.sface=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const mood=p.mood||'night';
 R(f,-300,-300,1320,1880,mood==='warm'?'url(#gWarmRoom)':(p.bg==='dawn'?'url(#gDawnCave)':'#07101e'));
 C(f,360,600,480,p.glow==='gold'?'url(#gSunHalo)':'url(#gGlow)',{opacity:p.glow==='gold'?.9:.35});
 const HY=560;const hf=keeperClose(m,{who:p.who,x:360,y:HY,s:3.0,view:'front',expr:p.expr||'worried',mood:mood==='dawn'?'warm':mood});
 let fx=null;if(p.frost){fx=G(m);for(let i=0;i<9;i++)E('ellipse',{cx:(i<5?-1:1)*(34+rnd(i)*8)*3+360,cy:HY+(2+rnd(i+3)*6)*3,rx:5+rnd(i)*5,ry:3,fill:'#eaf6ff',opacity:.9},fx);
  for(let i=0;i<6;i++)E('ellipse',{cx:360+(i<3?-1:1)*(12*3+(i%3)*3),cy:HY+(9)*3,rx:9,ry:4,fill:'#eaf6ff',opacity:.9},fx);for(let i=0;i<5;i++)C(fx,330+i*15,HY+80+rnd(i)*20,2.4,'#fff')}
 const sp=[];if(p.sparkle){for(let i=0;i<14;i++)sp.push(P(m,'M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3Z','#ffe9a8'))}
 const sw=[];if(p.breath){for(let i=0;i<5;i++)sw.push(C(m,0,0,10,'#eaf4ff'))}
 R(n,-40,1100,260,400,'#02030a',{opacity:.9});
 return (u,t,bt)=>{A(hf.root,{transform:`translate(360 ${HY+Math.sin(t*1.6)*4}) scale(3 3)`});if(fx)A(fx,{transform:`translate(0 ${Math.sin(t*1.6)*4})`});
  sp.forEach((s,i)=>{const q=((t*.4+rnd(i))%1);A(s,{transform:`translate(${80+rnd(i+2)*560} ${250+rnd(i+5)*500}) scale(${.5+q})`,opacity:Math.sin(Math.PI*q)})});
  sw.forEach((c,i)=>{const q=((t*.7+i/5)%1);A(c,{cx:380+q*60,cy:700-q*30,r:8+q*26,opacity:.5*(1-q)})})}};

/* generic HUD wrappers: p.chip (pill) for every scene that does not draw its own, p.count (timer chip) for sunSky */
['town','sunSky','trek','spring','valley','sface'].forEach(nm=>{const fn=LIB[nm];LIB[nm]=(Z,p)=>{const upd=fn(Z,p);const ck=p.chip?chip(Z.hud,p.chip,360,96,p.chipFill||'#12304a'):null;
 const tc=(nm==='sunSky'&&p.count)?timerChip(Z.hud,360,90,(u)=>{const s=Math.round(lerp(p.count[0],p.count[1],clamp(u)));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}):null;
 return (u,t,bt)=>{upd(u,t,bt);if(ck)ck(clamp(bt/.3));if(tc)tc(clamp(bt/.3),t)}}});
