/* ===== THE LAST SUNRISE — scene library 2: trek, hot spring, garden, final valley ===== */
document.getElementById('defs').insertAdjacentHTML('beforeend','');
function defsSun2(){document.getElementById('defs').insertAdjacentHTML('beforeend',`
 <linearGradient id="gWarmGlowV" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".75"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></linearGradient>
 <linearGradient id="gMtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9dbee"/><stop offset=".28" stop-color="#4f6f9c"/><stop offset=".75" stop-color="#13213a"/></linearGradient>
 <linearGradient id="gMtn2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9db6d4"/><stop offset=".3" stop-color="#34507c"/><stop offset=".8" stop-color="#0d182c"/></linearGradient>
 <linearGradient id="gRockWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1012"/><stop offset="1" stop-color="#3c2216"/></linearGradient>`)}

/* periodic ridge (period 720) so parallax scrolling is seamless */
function ridge(g,HY,y0,amp,fill,ph){let d=`M-720,${HY+60}`;for(let x=-720;x<=1440;x+=18){const k=x/720*Math.PI*2;const y=y0-amp*(.55+.3*Math.sin(k+ph)+.2*Math.sin(2*k+2+ph)+.12*Math.sin(3*k+4)+.06*Math.sin(5*k+ph));d+=` L${x},${y.toFixed(1)}`}d+=` L1440,${HY+60}Z`;return P(g,d,fill)}
function pineRow(g,y,h,col,snowCol,period){const o=G(g);for(let i=0;i<60;i++){const x=-720+i*36+(rnd(i%20)-.5)*14,hh=h*(.7+.5*rnd(i%20+3));
  for(let t=0;t<3;t++){const w=(26-t*6)*hh/h,yy=y-hh*(t*.3);P(o,`M${x-w},${yy} L${x},${yy-hh*.5} L${x+w},${yy}Z`,col)}
  P(o,`M${x-5},${y-hh*.78} L${x},${y-hh*.98} L${x+5},${y-hh*.78}Z`,snowCol,{opacity:.55})}return o}
function windFx(g,n){const a=[];for(let i=0;i<n;i++)a.push(L(g,0,0,60,0,'#dcecff',1.6,{opacity:.28}));return a}
function updWind(a,t,sp){a.forEach((l,i)=>{const len=50+rnd(i+3)*90;const x=(((rnd(i)*900-t*(500+rnd(i+1)*500)*(sp||1))%1000)+1000)%1000-140;const y=80+rnd(i+7)*820;A(l,{x1:x,y1:y,x2:x+len,y2:y+len*.05,opacity:.12+.22*rnd(i+9)})})}
function crackLines(g,cx,cy,n,seed){const a=[];for(let i=0;i<n;i++){const ang=-Math.PI*.9+rnd(i+seed)*Math.PI*.8,len=160+rnd(i+seed+2)*240;let d=`M${cx},${cy}`,x=cx,y=cy;for(let k=1;k<=5;k++){x+=Math.cos(ang)*len/5*(1+(rnd(i*7+k)-.5)*.5)+((rnd(i*3+k)-.5)*34);y+=Math.sin(ang)*len/5*.42+((rnd(i*5+k)-.5)*10);d+=` L${x.toFixed(1)},${y.toFixed(1)}`}
  a.push(P(g,d,'none',{stroke:'#f4fbff','stroke-width':3+rnd(i)*2,'stroke-linecap':'round','stroke-linejoin':'round',pathLength:1,'stroke-dasharray':'1 1','stroke-dashoffset':1}))}return a}

/* ---------- the walk through the blizzard ---------- */
LIB.trek=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const mode=p.mode||'walk';const HY=mode==='ice'?560:610;
 R(f,-300,-300,1320,1880,'url(#gColdSky)');const st=stars(f,70,420,13);
 const mt1=G(f);ridge(mt1,HY,HY-150,210,'url(#gMtn)',1);const mt2=G(f);ridge(mt2,HY,HY-70,130,'url(#gMtn2)',3.2);
 let plume=null,glow=null,sc=null;
 if(mode==='steam'){sc=G(m);glow=C(sc,560,HY+4,210,'url(#gLantern)',{opacity:.9});plume=steamCol(sc,560,HY+8,22,46);R(sc,520,HY-3,80,14,'#2a1a14',{rx:6})}
 const pines=G(f);pineRow(pines,HY+18,86,'#0a1626','#cfe2f6');
 const gnd=mode==='ice'?R(m,-300,HY,1320,900,'url(#gIce)'):R(m,-300,HY,1320,900,'url(#gSnowGnd)');
 if(mode==='ice')P(m,`M-300,${HY} L-300,${HY-26} Q0,${HY-44} 200,${HY-22} Q420,${HY-40} 700,${HY-18} L1020,${HY-30} L1020,${HY}Z`,'#0a1626');
 const rip=[];for(let i=0;i<26;i++)rip.push([R(m,0,0,40+rnd(i)*120,3,mode==='ice'?'#ffffff':'#e8f2ff',{rx:1.5,opacity:.25}),rnd(i+5),HY+14+i*15+(i*i%11)]);
 // sled (an old door) dragged on a rope, then Mara, then Ember
 const hx=mode==='steam'?200:(p.lie?70:300),hy=mode==='ice'?700:(mode==='steam'?690:720),hs=mode==='steam'?1.12:1.5;
 let sled=null,rope=null;const sg=G(m);
 if(!p.lie){sled=G(sg,{});R(sled,-120,-14,150,18,'#8a5a30',{rx:5,stroke:'#2a1a0c','stroke-width':3});for(let i=0;i<3;i++)R(sled,-110+i*46,-10,38,10,'#a8703c',{rx:3});C(sled,-14,-6,3.6,'#e6c070');R(sled,-100,-44,86,32,'#5a6a4a',{rx:8,stroke:'#2a1a0c','stroke-width':3});R(sled,-86,-52,30,12,'#8a5a30',{rx:4});rope=L(sg,0,0,0,0,'#d9c9a0',3.5)}
 let hero;
 if(p.lie){const w=G(m,{transform:`translate(${hx} ${hy-14}) rotate(90)`});hero=keeper(w,{who:'mara',view:'side',pose:'reach',x:.01,y:.01,s:hs*.88,mood:'night',pack:1,noShadow:true});hero._lie=true;R(m,hx-40,hy-4,440,10,'#000',{opacity:.2,rx:5})}
 else hero=keeper(m,{who:'mara',view:'side',pose:'walk',x:hx,y:hy,s:hs,mood:'night',pack:1});
 const dg=dog(m,{x:mode==='steam'?340:(p.lie?600:520),y:mode==='ice'?(p.lie?690:700):(mode==='steam'?698:732),s:mode==='steam'?.95:(p.lie?1.0:1.28),pose:'walk',tongue:false});
 const puffs=[];for(let i=0;i<5;i++)puffs.push(C(m,0,0,6,'#eaf4ff'));
 const wf=windFx(n,38),sf=snowFx(n,p.mode==='steam'?60:110,6);
 let cr=null,pl=null,cp=null;
 if(mode==='ice'){cr=p.crack?crackLines(m,hx+60,hy+30,7,4):[];if(p.crack){pl=chip(Z.hud,'ICE: 4 INCHES THICK',360,96,'#12304a');cp=null}}
 R(n,-300,930,1320,500,'#070b14',{opacity:.55});
 const fr=p.frost?G(Z.hud):null;if(fr){for(let i=0;i<16;i++){const a=i/16*Math.PI*2;C(fr,360+Math.cos(a)*470,640+Math.sin(a)*640,120+rnd(i)*120,'#dff0ff',{opacity:.2*p.frost,filter:'url(#b24)'})}}
 const sp=mode==='steam'?26:44;
 return (u,t,bt)=>{twinkle(st,t);
  A(mt1,{transform:`translate(${-((t*sp*.12)%720)} 0)`});A(mt2,{transform:`translate(${-((t*sp*.3)%720)} 0)`});A(pines,{transform:`translate(${-((t*sp*.8)%720)} 0)`});
  if(!p.lie)rip.forEach(([r,ph,y],i)=>A(r,{x:(((ph*1000-t*sp*(1.8+(y-HY)/120))%1100)+1100)%1100-160,y}));
  if(plume){updSteam(plume,t,560,.1);A(sc,{transform:`translate(560 ${HY}) scale(${1+.0*u}) translate(-560 ${-HY})`});A(glow,{opacity:.75+.15*Math.sin(t*2)})}
  const step=t*7.2;
  if(!p.lie){kmove(hero,t,0,1);const b=hero._b;A(hero,{transform:`translate(${hx} ${hy+Math.abs(Math.sin(step))*-4}) scale(${b.s} ${b.s})`});
   if(sled){const sx=hx-132*hs/1.5,sy=hy+8;A(sg,{transform:`translate(${sx} ${sy})`});A(rope,{x1:sx>0?132*hs/1.5-18:0,y1:-6,x2:132*hs/1.5+30*hs/1.5,y2:-150*hs/1.5})}}
  else kmove(hero,t,0,0);
  dogMove(dg,t,p.lie?0:step*.9);
  puffs.forEach((c,i)=>{const q=((t*.8+i/5)%1);A(c,{cx:hx+(p.lie?hs*330:hs*62)+q*34,cy:(p.lie?hy-20:hy-hs*296)-q*26+(p.lie?0:0),r:4+q*14,opacity:.5*(1-q)})});
  updWind(wf,t,p.mode==='steam'?.6:1);updSnow(sf,t,1.6,-60);
  if(cr)cr.forEach((c,i)=>A(c,{'stroke-dashoffset':1-eo(clamp((bt-.15-i*.07)/.5))}));if(pl)pl(clamp((bt-.3)/.3))}};

/* ---------- Eagle Hot Spring ---------- */
LIB.spring=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const k=p.kind||'pool';
 if(k==='mouth'||k==='door'){
  R(f,-300,-300,1320,1880,'url(#gColdSky)');const st=stars(f,60,360,19);
  const mt=G(f);ridge(mt,600,440,230,'url(#gMtn)',2);
  R(m,-300,610,1320,800,'url(#gSnowGnd)');
  // the rock face with the cave mouth
  P(m,'M180,640 L170,420 Q190,250 340,210 Q520,190 620,300 Q700,380 700,640Z','#1a1c28');P(m,'M170,420 Q190,250 340,210 Q520,190 620,300 L560,300 Q480,250 360,262 Q250,290 230,420Z','#cfe0f2',{opacity:.55});
  const arch='M300,640 L300,430 Q300,340 410,340 Q520,340 520,430 L520,640Z';P(m,arch,'#06070c');
  const gl=C(m,410,520,240,'url(#gLantern)',{opacity:.95});P(m,'M318,640 L318,440 Q318,362 410,362 Q502,362 502,440 L502,640Z','url(#gLantern)',{opacity:.5});
  const stm=steamCol(m,410,420,20,58);
  // wooden sign
  R(m,148,470,14,170,'#4a2e18');const sg=G(m,{transform:'rotate(-5 155 470)'});R(sg,70,408,170,92,'#8a5a30',{rx:6,stroke:'#2a1a0c','stroke-width':4});T(sg,155,447,'EAGLE',26,'#f2e6c8',{'letter-spacing':2});T(sg,155,480,'HOT SPRING',24,'#f2e6c8',{'letter-spacing':1});P(sg,'M72,410 Q155,394 238,410 L238,418 L72,418Z','#f4fbff',{opacity:.9});
  let mara=null,dg=null,wb=null,cole=null;
  if(k==='door'){mara=keeper(m,{who:'mara',view:'back',pose:'stand',x:262,y:735,s:1.2,mood:'night',pack:1});dg=dog(m,{x:176,y:742,s:1.0,pose:'stand'});
   cole=keeper(m,{who:'cole',view:'front',pose:'cross',x:410,y:660,s:1.34,mood:'warm'});
   wb=G(m,{transform:'translate(392 520) rotate(-20)'});R(wb,-8,-96,16,150,'#7a8088',{rx:7,stroke:'#1a1a1a','stroke-width':3});P(wb,'M-22,-96 l0,-34 l12,-12 l8,12 l8,-12 l12,12 l0,34Z','#7a8088',{stroke:'#1a1a1a','stroke-width':3})}
  else{mara=keeper(m,{who:'mara',view:'side',pose:'walk',x:270,y:730,s:1.2,mood:'warm',pack:1});dg=dog(m,{x:390,y:738,s:1.0,pose:'walk'})}
  R(n,-300,930,1320,500,'#070b14',{opacity:.55});const sf=snowFx(n,70,8);
  return (u,t,bt)=>{twinkle(st,t);A(gl,{opacity:.85+.1*Math.sin(t*2.4)});updSteam(stm,t,330,.09);updSnow(sf,t,1.3,22);
   if(k==='mouth'){kmove(mara,t,0,0);const b=mara._b;A(mara,{transform:`translate(${270+u*80} ${730+Math.abs(Math.sin(t*7))*-3}) scale(${b.s} ${b.s})`});dg.root._b.x=390+u*80;dogMove(dg,t,7*t)}
   else{kmove(mara,t,1,1.3);kmove(cole,t,1,1.2);dogMove(dg,t,0)}}}
 // ---- interior
 R(f,-300,-300,1320,1880,'url(#gCaveBg)');
 for(let i=0;i<10;i++)P(f,`M${i*86-30},-40 L${i*86+30},-40 L${i*86},${100+rnd(i)*150}Z`,'#0c0708');
 const cm=G(f);P(cm,'M520,-40 L760,-40 L760,320 Q690,300 650,200 Q600,110 520,-40Z','#0b1a30');const snow=snowFx(cm,26,4);
 const lns=[];[[120,150],[560,190],[330,110]].forEach(([x,y],i)=>{L(m,x,-40,x,y,'#2a1a12',3);R(m,x-12,y,24,30,'#3a2a1a',{rx:5});lns.push(C(m,x,y+14,150,'url(#gLantern)',{opacity:.85}));C(m,x,y+16,7,'#ffe6a8')});
 // rock walls left/right
 P(m,'M-300,-40 L120,-40 Q60,200 90,420 Q40,560 -300,640Z','#0e0809');P(m,'M820,-40 L760,-40 Q780,300 700,460 Q760,560 820,640Z','#0e0809');
 // pool
 R(m,-300,560,1320,900,'#241410');
 const pool=P(m,'M60,610 Q60,540 200,530 Q360,512 520,534 Q670,548 660,620 Q650,700 480,716 Q300,736 150,704 Q60,676 60,610Z','url(#gWater)');
 P(m,'M60,610 Q60,540 200,530 Q360,512 520,534 Q670,548 660,620 Q650,700 480,716 Q300,736 150,704 Q60,676 60,610Z','none',{stroke:'#8a5a3a','stroke-width':14});
 const ripl=[];for(let i=0;i<9;i++)ripl.push(R(m,0,0,60+rnd(i)*80,2.5,'#eafffa',{rx:1.2,opacity:.4}));
 const ppl=[];const npl=p.people||0;for(let i=0;i<npl;i++){const x=90+(i%12)*50+rnd(i)*14,row=Math.floor(i/12);ppl.push(person(m,x,560+row*38+(i%2)*10,.5+row*.05,i%3?'#07090d':'#14181f',{sit:i%2==0}))}
 const stm=steamCol(m,360,600,26,70);
 const stm2=steamCol(m,200,590,14,46);
 let tg=null;if(p.temp){tg=chip(Z.hud,p.temp,360,96,'#0f5a6a')}
 let cnt=null;if(p.count){const q=G(Z.hud,{opacity:0});R(q,190,140,340,170,'#0b1020',{rx:26,stroke:'#ffca28','stroke-width':5});const nn=T(q,360,246,p.count,110,'#fff',{'font-family':'DejaVu Sans Mono, monospace'});T(q,360,290,p.countLabel||'PEOPLE',26,'#ffca28',{'letter-spacing':4,'font-weight':800});cnt=u=>A(q,{opacity:clamp(u*6)})}
 R(n,-300,930,1320,500,'#0a0605',{opacity:.6});
 return (u,t,bt)=>{updSnow(snow,t,.6,8,420);lns.forEach((l,i)=>A(l,{opacity:.8+.1*Math.sin(t*2.2+i*2)}));
  ripl.forEach((r,i)=>A(r,{x:100+((rnd(i)*500+t*14*(1+i*.1))%520),y:560+i*18+Math.sin(t*1.7+i)*3}));
  updSteam(stm,t,300,.07);updSteam(stm2,t,250,.06);if(tg)tg(clamp(bt/.3));if(cnt)cnt(clamp(bt/.3))}};

/* ---------- the cave garden: planters, grow lamps, an artificial sunrise ---------- */
function plant(g,x,y,sz,col,seed){const q=G(g,{transform:`translate(${x} ${y}) scale(${sz})`});L(q,0,0,0,-34,'#3a7a3a',5);
 const nl=3+Math.floor(rnd(seed)*2);for(let i=0;i<nl;i++){const a=(i/(nl-1)-.5)*110,len=22+rnd(seed+i)*12;const lf=G(q,{transform:`translate(0 -${22+rnd(seed+i+3)*10}) rotate(${a})`});E('ellipse',{cx:0,cy:-len/2,rx:9,ry:len/2,fill:col||'#4ed05a',stroke:'#1c5a28','stroke-width':2.4},lf)}
 return q}
LIB.garden=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const stage=Array.isArray(p.stage)?p.stage:[p.stage||0,p.stage||0];const lamps=p.lamps==null?'on':p.lamps;
 R(f,-300,-300,1320,1880,'url(#gCaveBg)');const dawnBg=p.dawn!=null?R(f,-300,-300,1320,1880,'url(#gDawnCave)',{opacity:0}):null;for(let i=0;i<10;i++)P(f,`M${i*86-30},-40 L${i*86+30},-40 L${i*86},${60+rnd(i)*120}Z`,'#0c0708');
 const dawn=p.dawn!=null;
 const sunG=dawn?G(f):null;let sunDisc=null,sunHalo=null;if(dawn){sunHalo=C(sunG,360,420,520,'url(#gSunHalo)',{opacity:0});sunDisc=C(sunG,360,420,160,'#fff3c0',{opacity:0})}
 // back wall + pipe with steam
 R(m,-300,300,1320,420,'#1d110d',{opacity:.55});R(m,-60,96,840,18,'#6a5a4a');R(m,-60,96,840,5,'#a89a86',{opacity:.7});const stm=steamCol(m,600,100,10,30);
 // two shelves of planters
 const rows=[{y:392,xs:[96,210,324,438,552,630]},{y:612,xs:[70,170,270,370,470,570,650]}];const pl=[];
 rows.forEach((r,ri)=>{R(m,20,r.y,680,16,'#8a5a30');R(m,20,r.y+16,680,4,'#2a1a0c',{opacity:.6});R(m,36,r.y+16,12,70,'#6a4220');R(m,672,r.y+16,12,70,'#6a4220');
  R(m,30,r.y-26,660,30,'#5b3a22',{rx:6,stroke:'#1a0f08','stroke-width':3});R(m,38,r.y-24,644,10,'#2a1a10',{rx:4});
  r.xs.forEach((x,i)=>pl.push({g:plant(m,x,r.y-24,.01,['#4ed05a','#7ad04a','#3ab86a'][i%3],ri*10+i),x,y:r.y-24}))});
 // grow lamps
 const lg=[];rows.forEach((r,ri)=>{const ly=ri==0?150:r.y-176;R(m,50,ly-14,620,6,'#2a2a30');for(let i=0;i<3;i++){const x=130+i*230;L(m,x,ly-14,x,ly+6,'#2a2a30',3);R(m,x-58,ly+4,116,14,'#d8d0e0',{rx:7,stroke:'#2a2a30','stroke-width':3});
   const cone=P(m,`M${x-52},${ly+18} L${x+52},${ly+18} L${x+140},${r.y-26} L${x-140},${r.y-26}Z`,'url(#gGrowCone)',{opacity:0});const gl=C(m,x,ly+16,90,'url(#gGrow)',{opacity:0});lg.push({cone,gl,i,ri})}});
 let lan=null;if(lamps==='off'){L(m,360,100,360,282,'#2a1a12',3);R(m,344,282,32,40,'#3a2a1a',{rx:6});lan=C(m,360,300,300,'url(#gLantern)',{opacity:.8});C(m,360,302,9,'#ffe6a8')}
 const kid=p.kid?keeper(m,{who:'pip',view:'side',pose:'stand',x:620,y:748,s:1.08,mood:'warm',flip:true}):null;
 const wc=kid?G(m,{transform:'translate(560 706)'}):null;if(wc){R(wc,-22,-18,40,30,'#8a9099',{rx:6,stroke:'#2a2a30','stroke-width':3});P(wc,'M18,-8 L50,-26 L54,-20 L22,0Z','#8a9099',{stroke:'#2a2a30','stroke-width':2.5})}
 const ppl=[];if(p.crowd){for(let i=0;i<p.crowd;i++){const x=40+i*(640/p.crowd)+rnd(i)*20;ppl.push(person(m,x,780+(i%2)*8,.72+rnd(i+4)*.12,'#06080c',{up:i%4==0,flip:i%2}))}
  R(n,-300,700,1320,700,'#06080c',{opacity:.45})}
 const ck=p.chip?chip(Z.hud,p.chip,360,96,'#4a1a5a'):null;
 R(n,-300,930,1320,500,'#090507',{opacity:.55});
 return (u,t,bt)=>{updSteam(stm,t,150,.06);
  const g=ease(clamp(u));const st=lerp(stage[0],stage[1],g);
  let L0=lamps==='on'?1:(lamps==='dim'?.35+.08*Math.sin(t*2.6)+.06*Math.sin(t*1.1):(lamps==='off'?0:lamps));
  if(lamps==='ramp')L0=ease(clamp(bt/2.2));if(lamps==='blaze')L0=.4+.6*ease(clamp(bt/1.2));
  lg.forEach(l=>{A(l.cone,{opacity:L0*.85});A(l.gl,{opacity:L0*.9})});
  pl.forEach((q,i)=>{const s=st<=0?0.01:(st<1?lerp(.01,.55,st):(st<2?lerp(.55,1.1,st-1):lerp(1.1,1.35,clamp(st-2))));A(q.g,{transform:`translate(${q.x} ${q.y}) scale(${s*(.85+.3*rnd(i+3))})`,opacity:st<=0?(i%2?0:1):1})});
  if(dawn){const d=ease(clamp(bt/2.8));A(dawnBg,{opacity:d*.95});A(sunHalo,{opacity:d,cy:lerp(640,420,d)});A(sunDisc,{opacity:d,cy:lerp(660,430,d)});lg.forEach(l=>{A(l.cone,{opacity:L0*.85*(1-.55*d)});A(l.gl,{opacity:L0*.9*(1-.55*d)})});
   // plants tinted warm by the artificial sun is skipped for clarity
  }
  if(kid){kmove(kid,t,1.5,1.4)}if(lan)A(lan,{opacity:.75+.1*Math.sin(t*2.2)})
  if(ck)ck(clamp(bt/.3))}};

/* ---------- final shot: the valley at night, the spring's steam lit from below, a dead red dot where the sun was ---------- */
LIB.valley=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-300,-300,1320,1880,'url(#gDeadSky)');const st=stars(f,160,620,31);
 C(f,500,230,22,'url(#gEmberHalo)',{opacity:.9});const dot=C(f,500,230,5,'#c4301c',{opacity:.8});
 const mt=G(f);ridge(mt,620,480,260,'url(#gMtn)',.4);const mt2=G(f);ridge(mt2,640,540,170,'url(#gMtn2)',2.7);
 R(m,-300,640,1320,700,'url(#gSnowGnd)');P(m,'M-300,640 L-300,590 Q0,560 200,600 Q420,560 700,610 L1020,590 L1020,640Z','#0d1830');
 const pines=G(m);pineRow(pines,650,110,'#08111f','#cfe2f6');
 // the spring: warm glow and a steam plume, lit from below
 const gl=C(m,470,640,260,'url(#gLantern)',{opacity:.9});R(m,420,624,100,22,'#1a0e0a',{rx:10});C(m,470,632,16,'#ffe0a0');
 const stm=steamCol(m,470,632,26,64);
 // three tiny silhouettes looking up (Mara, Pip, Ember)
 const grp=G(m);person(grp,170,730,.9,'#05070c',{up:false});person(grp,222,736,.52,'#05070c',{});
 const dg=dog(grp,{x:282,y:738,s:.7,pose:'sit',noShadow:true,sil:true});
 R(n,-300,930,1320,500,'#050810',{opacity:.55});
 return (u,t,bt)=>{twinkle(st,t);updSteam(stm,t,420,.07);A(gl,{opacity:.8+.1*Math.sin(t*2)});A(dot,{opacity:.55+.25*Math.sin(t*.8)});dogMove(dg,t,0)}};

/* ---------- the artificial sunrise, seen from the crowd ---------- */
LIB.sunrise=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-300,-300,1320,1880,'url(#gDawnCave)');
 const rays=G(f,{transform:'translate(360 560)'});for(let i=0;i<18;i++)P(rays,'M0,0 L-40,-1100 L40,-1100Z','#fff0c0',{opacity:.10,transform:`rotate(${i*20})`});
 const halo=C(f,360,560,560,'url(#gSunHalo)',{opacity:0});const disc=C(f,360,560,176,'#fff6d0',{opacity:0});
 // two rows of plants in silhouette, lit from behind
 const pl=G(m);[[610,0],[720,1]].forEach(([y,r])=>{R(pl,-40,y,800,24,'#120818');for(let i=0;i<9;i++){const x=20+i*84+(r?40:0);const g=G(pl,{transform:`translate(${x} ${y}) scale(${1.1+r*.15})`});L(g,0,0,0,-26,'#120818',8);E('ellipse',{cx:-15,cy:-34,rx:17,ry:11,fill:'#120818',transform:'rotate(-52 -15 -34)'},g);E('ellipse',{cx:15,cy:-34,rx:17,ry:11,fill:'#120818',transform:'rotate(52 15 -34)'},g);E('ellipse',{cx:0,cy:-42,rx:9,ry:16,fill:'#120818'},g)}});
 const ppl=[];for(let i=0;i<(p.crowd||10);i++){const x=30+i*(660/(p.crowd||10))+rnd(i)*16;ppl.push(person(m,x,836+(i%2)*10,.82+rnd(i+4)*.12,'#08040c',{up:i%3==0,flip:i%2}))}
 R(n,-300,930,1320,500,'#08040c',{opacity:.6});
 return (u,t,bt)=>{const d=ease(clamp(bt/3.0));A(halo,{opacity:d,cy:lerp(760,500,d)});A(disc,{opacity:d,cy:lerp(790,500,d)});A(rays,{transform:`translate(360 ${lerp(780,520,d)}) rotate(${t*3})`,opacity:d})}};
