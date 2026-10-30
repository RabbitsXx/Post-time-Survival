/* ===== farm9: THE LAST HARVEST sets (world 1280x720, seen through the 450x800 window).  LOC.farm variants: yard | field | porch | barn
   dusk-to-night family farm: red barn + silo + windmill + hay bales + fence, a corn field that rustles, the farmhouse porch with its lantern and the old radio. ===== */
const FARM_INK='#1a1208';

function fCloud(g,x,y,w,c,o){const q=G(g,{style:'filter:blur(7px)',opacity:o||.5});for(let i=0;i<5;i++)E('ellipse',{cx:x+(i-2)*w*.2,cy:y+(i%2?-1:1)*w*.04,rx:w*.2,ry:w*.07+(i===2?w*.04:0),fill:c},q);return q}
function fShadow(g,x,y,rx){E('ellipse',{cx:x,cy:y,rx,ry:rx*.14,fill:'#1a0d05',opacity:.38,style:'filter:blur(3px)'},g)}
function fStars(g,n,y1){for(let i=0;i<n;i++)C(g,rnd(i+40)*1380-40,rnd(i+7)*y1,1+rnd(i+9)*1.3,'#fff',{opacity:.2+rnd(i+13)*.55})}
function fHills(g){P(g,'M-100,450 Q120,370 380,430 T760,400 T1100,440 T1380,410 L1380,640 L-100,640Z','#1b1a30');P(g,'M-100,500 Q200,440 520,490 T1000,470 T1380,500 L1380,640 L-100,640Z','#14172a');
 for(let i=0;i<22;i++){const x=i*66+rnd(i)*30,h=26+rnd(i+3)*30;P(g,`M${x},500 L${x+14},${500-h} L${x+28},500Z`,'#0d1322')}}
function fMoon(g,x,y){C(g,x,y,150,'url(#gLamp)',{opacity:.25});C(g,x,y,36,'#f4eed2');C(g,x-10,y-6,7,'#e2dcbd',{opacity:.7});C(g,x+11,y+9,5,'#e2dcbd',{opacity:.7})}
function fCorn(g,x,y,h,seed,dark){const c=dark?'#2a4018':'#3f6226',c2=dark?'#35521f':'#55802f';
 L(g,x,y,x,y-h,c,Math.max(3,h/38));
 for(let k=0;k<4;k++){const ly=y-h*.22-k*h*.2,s=(k%2?1:-1),w=h*.2;P(g,`M${x},${ly} q${s*w*.6},${-w*.45} ${s*w},${w*.06} q${-s*w*.5},${w*.1} ${-s*w},${-w*.1}Z`,c2)}
 if(!dark&&seed%3===0)P(g,`M${x},${y-h*.55} q${h*.05},${-h*.06} ${h*.07},${-h*.2} q${-h*.08},${h*.06} ${-h*.07},${h*.2}Z`,'#d9b24a');
 P(g,`M${x},${y-h} q${-h*.05},${-h*.1} ${h*.02},${-h*.18} q${h*.04},${h*.08} ${-h*.02},${h*.18}Z`,'#c9a24a',{opacity:dark?.6:1})}
function fBale(g,x,y,r){C(g,x,y-r,r,'#d6ad48',{stroke:FARM_INK,'stroke-width':3});for(let i=1;i<4;i++)E('path',{d:`M${x-r*.9},${y-r+i*0} a${r*i/4},${r*i/4} 0 1 1 ${r*i/2},0`,fill:'none',stroke:'#a8832a','stroke-width':2.2},g);C(g,x,y-r,r*.18,'#a8832a')}
function fPost(g,x,y,h){R(g,x,y-h,10,h,'#5c4630',{stroke:FARM_INK,'stroke-width':2})}
function fLantern(g,x,y,glow){C(g,x,y+14,glow,'url(#gLamp)',{opacity:.6});L(g,x,y-40,x,y,'#2a2218',3);R(g,x-11,y,22,32,'#ffd98a',{rx:5,stroke:FARM_INK,'stroke-width':3});R(g,x-14,y-6,28,8,'#2a2218',{rx:3});R(g,x-14,y+30,28,7,'#2a2218',{rx:3});L(g,x,y+4,x,y+28,'#b8741a',3)}
function fBarn(g,x,y,p){ // x = left edge, y = ground line
 R(g,x,y-250,380,250,'#9b2f27',{stroke:FARM_INK,'stroke-width':4});for(let i=1;i<19;i++)L(g,x+i*20,y-250,x+i*20,y,'#7e241e',2);
 P(g,`M${x-26},${y-244} L${x+60},${y-340} L${x+190},${y-392} L${x+320},${y-340} L${x+406},${y-244}Z`,'#5e1a17',{stroke:FARM_INK,'stroke-width':4,'stroke-linejoin':'round'});
 R(g,x+135,y-330,110,84,'#241209',{rx:3,stroke:'#f2ead6','stroke-width':6});R(g,x+143,y-322,94,68,'#ffe08a',{opacity:.9});C(g,x+190,y-290,110,'url(#gLamp)',{opacity:.55});L(g,x+190,y-330,x+190,y-246,'#f2ead6',5);
 R(g,x+105,y-170,170,170,'#7a241e',{stroke:'#f2ead6','stroke-width':7});L(g,x+105,y-170,x+275,y,'#f2ead6',7);L(g,x+275,y-170,x+105,y,'#f2ead6',7);L(g,x+190,y-170,x+190,y,'#f2ead6',7);
 if(p&&p.ajar){R(g,x+192,y-168,80,166,'#1a0e06');P(g,`M${x+192},${y-168} L${x+272},${y-168} L${x+272},${y} L${x+192},${y}Z`,'url(#gCone)',{opacity:.55});R(g,x+262,y-168,12,166,'#7a241e',{stroke:'#f2ead6','stroke-width':4});C(g,x+232,y-90,70,'url(#gLamp)',{opacity:.5})}
 R(g,x+25,y-140,48,64,'#241209',{stroke:'#f2ead6','stroke-width':5});R(g,x+305,y-140,48,64,'#241209',{stroke:'#f2ead6','stroke-width':5})}
function fSilo(g,x,y){R(g,x,y-380,90,380,'#aab2bb',{stroke:FARM_INK,'stroke-width':4});for(let i=1;i<9;i++)R(g,x,y-380+i*42,90,5,'#8b939c');P(g,`M${x-4},${y-378} Q${x+45},${y-470} ${x+94},${y-378}Z`,'#7d868f',{stroke:FARM_INK,'stroke-width':4});R(g,x+36,y-392,18,22,'#7d868f');
 R(g,x+14,y-380,10,380,'#fff',{opacity:.16})}
function fWindmill(g,x,y){const t=G(g,{});P(t,`M${x-34},${y} L${x-6},${y-250} L${x+6},${y-250} L${x+34},${y}Z`,'#3b3f4f',{stroke:FARM_INK,'stroke-width':3});for(let k=1;k<5;k++)L(t,x-34+k*6.4,y-k*52,x+34-k*6.4,y-k*52,'#2a2e3c',3);
 const b=G(g,{transform:`translate(${x} ${y-256})`});for(let k=0;k<4;k++){const r=G(b,{transform:`rotate(${k*90})`});P(r,'M0,0 L10,-8 L12,-96 L-4,-100 L-8,-8Z','#d7dbe3',{stroke:FARM_INK,'stroke-width':2.4})}C(b,0,0,10,'#c0392b',{stroke:FARM_INK,'stroke-width':3});return b}
function fFirefly(g,n){const o=[];for(let i=0;i<n;i++){const q=G(g,{});C(q,0,0,12,'url(#gLamp)',{opacity:.55});C(q,0,0,2.6,'#f4ff9a');o.push({q,x:rnd(i+5)*1280,y:380+rnd(i+9)*230,ph:rnd(i+2)*6.28,sp:.4+rnd(i+11)*.6})}return t=>o.forEach(f=>A(f.q,{transform:`translate(${f.x+Math.sin(t*f.sp+f.ph)*34} ${f.y+Math.cos(t*f.sp*1.3+f.ph)*18})`,opacity:.35+.65*Math.max(0,Math.sin(t*1.7+f.ph*3))}))}
LOC.farm=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'yard';let upd=[];
 const night=p.sky||'url(#gSkySoft)';
 if(v==='porch'||v==='barn'){}
 else{R(f,-100,-100,1480,760,night);fStars(f,36,220);fMoon(f,p.moonx||980,p.moony||120);fCloud(f,260,170,520,'#ffc9a8',.38);fCloud(f,860,250,620,'#e79a9a',.34);fCloud(f,1150,120,420,'#ffd9b8',.3);fHills(f);R(f,-100,380,1480,160,'url(#gHaze)');A(f,{style:'filter:blur(3.2px)'})}
 if(v==='yard'){
  R(m,-100,590,1480,300,'#2a2118');P(m,'M360,720 L560,590 L760,590 L1040,720Z','#3b2f20');for(let i=0;i<26;i++)R(m,rnd(i)*1380-40,600+rnd(i+3)*110,30+rnd(i+1)*60,3,'#3a2e1d',{opacity:.7});
  const far=G(m,{style:'filter:blur(1.8px)'});const wm=fWindmill(far,1130,590);fBarn(far,70,590,p);fSilo(far,500,590);R(m,-100,560,1480,40,'url(#gHaze)',{opacity:.55});R(m,-100,600,1480,130,'url(#gGroundShade)');
  for(let i=0;i<9;i++)fPost(m,640+i*80,604,74);R(m,620,540,760,7,'#6a5438',{stroke:FARM_INK,'stroke-width':1.6});R(m,620,566,760,7,'#6a5438',{stroke:FARM_INK,'stroke-width':1.6});
  fBale(m,980,602,34);fBale(m,1052,602,34);fBale(m,1016,534,30);
  const lp=G(m);R(lp,758,360,10,240,'#3a3226');R(lp,730,352,66,12,'#2a2218',{rx:5});C(lp,763,372,150,'url(#gLamp)',{opacity:.45});P(lp,'M740,364 L786,364 L810,598 L716,598Z','url(#gCone)',{opacity:.12});C(lp,763,366,9,'#fff3c0');
  const ff=fFirefly(G(m),16);upd.push((u,t)=>{A(wm,{transform:`translate(1130 334) rotate(${t*38})`});ff(t)})}
 if(v==='field'){
  R(m,-100,540,1480,300,'#1e1a12');
  for(let band=0;band<3;band++){const yb=[560,610,670][band],h=[120,190,290][band],gap=[22,34,50][band],cnt=[60,40,26][band];for(let i=0;i<cnt;i++)fCorn(m,i*gap+(band*11)%gap-20+rnd(i+band*50)*8,yb+rnd(i+band*9)*10,h*(.85+rnd(i+band*4)*.3),i+band,band===0)}
  const sway=G(n);if(p.fg!==false){for(let i=0;i<72;i++)fCorn(sway,i*18.5-20+rnd(i+70)*6,735+rnd(i+80)*8,p.fgh||200+rnd(i+90)*40,i,false)}else{for(let i=0;i<7;i++)fCorn(sway,-30+i*26,730,300,i,false);for(let i=0;i<7;i++)fCorn(sway,1330-i*26,730,300,i+9,false)}
  const ff=fFirefly(G(m),10);upd.push((u,t)=>{ff(t);A(sway,{transform:`translate(${Math.sin(t*1.3)*3} 0)`})})}
 if(v==='porch'){
  R(f,-100,-100,1480,820,'#2f3d4e');for(let i=0;i<48;i++)R(f,i*30-20,-100,3,820,'#273241');R(f,-100,-100,1480,820,'url(#gWallShade)',{opacity:.9});A(f,{style:'filter:blur(3px)'});
  R(m,-100,-20,1480,76,'#1b212b');R(m,-100,52,1480,10,'#10141b');
  R(m,380,230,210,170,'#ffd98a',{stroke:'#e9e2cd','stroke-width':9,rx:3});L(m,485,230,485,400,'#e9e2cd',6);L(m,380,315,590,315,'#e9e2cd',6);P(m,'M388,236 L470,236 L420,300Z','#c0505a',{opacity:.55});P(m,'M582,236 L500,236 L550,300Z','#c0505a',{opacity:.55});C(m,485,320,230,'url(#gLamp)',{opacity:.4});
  R(m,800,180,170,420,'#6f3d2b',{stroke:'#e9e2cd','stroke-width':8,rx:3});R(m,818,198,134,160,'#ffd98a',{opacity:.35});for(let i=0;i<9;i++){L(m,820,206+i*16,950,206+i*16,'#3a2418',1.4)}R(m,930,390,12,18,'#d9b24a',{rx:5});
  fLantern(m,690,150,170);
  R(m,-100,600,1480,160,'#5b4631',{stroke:FARM_INK,'stroke-width':3});for(let i=0;i<14;i++)L(m,-100,606+i*12,1380,606+i*12,'#3f3022',2);R(m,-100,596,1480,10,'#6b5238');
  R(m,-100,520,1480,8,'#e9e2cd',{opacity:.9});for(let i=0;i<16;i++)R(m,i*90,520,8,80,'#e9e2cd',{opacity:.9});
  const ff=fFirefly(G(m),6);upd.push((u,t)=>ff(t))}
 if(v==='barn'){
  R(f,-100,-100,1480,820,'#241508');for(let i=0;i<64;i++)R(f,i*22-20,-100,2,820,'#150d05');
  for(let i=0;i<6;i++){P(f,`M${110+i*220},-100 L${150+i*220},-100 L${390+i*220},700 L${300+i*220},700Z`,'#ffe7a8',{opacity:.1})}
  R(m,-100,590,1480,220,'#3a2a16');for(let i=0;i<30;i++)L(m,-100+i*50,590,-100+i*50-30,800,'#2a1d0e',3);
  for(const [x,y,r] of[[130,596,50],[250,596,38],[1010,596,52],[1130,596,40],[1180,540,34]])fBale(m,x,y,r);
  R(m,760,300,30,300,'#4a3520');R(m,880,300,30,300,'#4a3520');R(m,760,300,150,18,'#4a3520');
  R(m,300,380,320,16,'#5a4228');for(let i=0;i<6;i++)R(m,310+i*52,396,10,200,'#5a4228');
  fLantern(m,640,160,190);const ff=fFirefly(G(m),8);upd.push((u,t)=>ff(t))}
 return (u,t,bt)=>upd.forEach(fn=>fn(u,t,bt))};

/* ---- THE LAST HARVEST: lower-third (night n of N, clock, place) and the farm radio card ---- */
FX.nightline=(g,f)=>{const q=G(g,{});const n=f.of||3,x0=96,x1=354,y=632;
 R(q,x0-62,y-30,x1-x0+124,86,'rgba(10,8,6,.72)',{rx:14});L(q,x0,y,x1,y,'#4a4030',4);
 const dots=[];for(let i=0;i<n;i++){const x=n>1?lerp(x0,x1,i/(n-1)):225,cur=i===f.stop-1;dots.push(C(q,x,y,cur?9:5,i<=f.stop-1?'#ffcf6a':'#5a4e3a',{stroke:cur?'#fff':'none','stroke-width':2.5}))}
 const bx=n>1?lerp(x0,x1,(f.stop-1)/(n-1)):225;const mo=G(q,{transform:`translate(${bx} ${y-22})`});C(mo,0,0,9,'#f4eed2',{stroke:'#000','stroke-width':1.4});C(mo,4,-2,8,'rgba(10,8,6,1)');
 T(q,225,y+34,(f.time||'')+(f.place?'  ·  '+f.place:''),15,'#ffd98a',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 return (lt)=>{A(q,{opacity:clamp(lt/.3)});A(dots[f.stop-1],{r:9+1.6*Math.sin(lt*6)});A(mo,{transform:`translate(${bx} ${y-22+Math.sin(lt*8)})`})}};
/* the old tube radio: p.mode 'open' | 'close' | 'text'; p.part, p.of, p.title, p.next, p.lines, p.time */
CARD.radio=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-20,-20,490,840,'#1a120a');for(let i=0;i<40;i++)L(f,i*12-20,-20,i*12-20,820,'#150d06',3);R(f,-20,-20,490,840,'url(#gWallShade)');
 C(f,225,260,260,'url(#gLamp)',{opacity:.22});R(f,-20,560,490,260,'#3a2a18');
 const rad=G(m);R(rad,28,92,394,300,'#6a3f1f',{rx:30,stroke:'#241408','stroke-width':7});R(rad,40,104,370,276,'#7e4c26',{rx:24});
 R(rad,58,124,334,132,'#241408',{rx:12,stroke:'#c89a4a','stroke-width':4});R(rad,62,128,326,124,'#f6e2a8',{rx:10,opacity:.92});
 const open=p.mode!=='close',txt=p.mode==='text',LN=p.lines||[];const INK='#3a2208';
 const l1=T(rad,225,162,txt?LN[0]:open?'THE LAST HARVEST':'NEXT NIGHT',txt?30:22,INK,{'font-family':RCF,'font-weight':700,'letter-spacing':4});fitText(l1,300);
 const l2=T(rad,225,214,txt?LN[1]:open?`PART ${p.part} / ${p.of}`:(p.next||''),txt?38:open?48:34,'#a8332b',{'font-family':RCF,'font-weight':700,'letter-spacing':3});fitText(l2,300);
 const l3=T(rad,225,242,txt?LN[2]:open?(p.title||''):`PART ${p.part+1} / ${p.of}`,txt?26:20,INK,{'font-family':RCF,'font-weight':700,'letter-spacing':3});fitText(l3,300);
 for(let i=0;i<=10;i++)L(rad,74+i*30.8,128,74+i*30.8,i%5===0?146:138,INK,i%5===0?3:2);const needle=R(rad,150,126,4,24,'#c0392b',{rx:2});
 for(const cx of[110,340])C(rad,cx,330,34,'#2a1608',{stroke:'#c89a4a','stroke-width':4});L(rad,110,330,110,306,'#f4eed2',5);L(rad,340,330,350,310,'#f4eed2',5);
 R(rad,170,296,110,70,'#241408',{rx:8});const bars=[];for(let i=0;i<9;i++)bars.push(L(rad,184+i*11.5,304,184+i*11.5,358,'#6a3f1f',4));
 T(rad,225,412,'HOLLOW CREEK FARM RADIO  ·  AM 1120',15,'#e7c68a',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 const waves=[0,1,2].map(i=>E('path',{d:`M${52-i*14},${190-i*10} q${-8-i*3},${12+i*6} 0,${24+i*12}`,fill:'none',stroke:'#ffcf6a','stroke-width':4,'stroke-linecap':'round'},rad));
 return (u,t,bt)=>{const a=slam(bt,0,.25);[l1,l2,l3].forEach((e,i)=>A(e,{opacity:clamp((bt-.05-i*.12)/.1)}));const mo=mouth('radio');A(needle,{x:150+Math.sin(t*1.7)*40+mo*20});
  bars.forEach((b,i)=>A(b,{opacity:.4+.6*Math.abs(Math.sin(t*9+i)*mo)}));waves.forEach((w,i)=>A(w,{opacity:.15+.85*clamp(mo*1.6-i*.2)}));A(rad,{transform:`translate(${Math.sin(t*50)*mo*1.2} 0)`})}};
Object.assign(PROP,{
 scarecrow:(g,o)=>{const q=G(g,{});L(q,0,0,0,-190,'#6a4a2a',9);L(q,-62,-136,62,-136,'#6a4a2a',8);
  P(q,'M-40,-150 L40,-150 L34,-82 L-34,-82Z','#a8332b',{stroke:'#241810','stroke-width':3});for(let i=0;i<4;i++)L(q,-34+i*22,-150,-34+i*22,-82,'#7e231d',2);
  C(q,0,-176,24,'#d6b878',{stroke:'#241810','stroke-width':3});C(q,-8,-180,3.4,'#241810');C(q,8,-180,3.4,'#241810');L(q,-8,-166,8,-166,'#241810',2.6);for(let i=-2;i<=2;i++)L(q,i*8,-86,i*8+2,-66,'#d9b24a',3);
  E('ellipse',{cx:0,cy:-196,rx:44,ry:8,fill:'#d9b868',stroke:'#241810','stroke-width':3},q);P(q,'M-26,-196 C-26,-228 26,-228 26,-196Z','#d9b868',{stroke:'#241810','stroke-width':3});
  if(o.radio!==false){R(q,-18,-130,36,24,'#6a3f1f',{rx:4,stroke:'#241810','stroke-width':2.4});C(q,-8,-118,6,'#2a1608');R(q,2,-124,12,6,'#f6e2a8');for(let i=0;i<3;i++)L(q,-12+i*6,-134,-10+i*6,-146,'#c89a4a',2)}
  return q},
 pitchfork:(g,o)=>{L(g,0,0,0,-120,'#8a6a3a',7);L(g,-14,-120,14,-120,'#aab2bb',6);for(const x of[-14,0,14])L(g,x,-120,x,-150,'#aab2bb',5)},
 bucket:(g,o)=>{P(g,'M-18,-30 L18,-30 L14,0 L-14,0Z','#9aa3ad',{stroke:'#241810','stroke-width':2.6});E('path',{d:'M-16,-30 Q0,-52 16,-30',fill:'none',stroke:'#241810','stroke-width':3},g)}});
CARD.farmend=(Z,p)=>{const {f,m}=CARD9(Z,'farmend');R(f,-20,-20,490,840,'#0a0a14');R(f,-20,-20,490,470,'url(#gSkyDusk)');fStars(f,40,200);C(f,330,150,26,'#f4eed2');
 P(f,'M-20,420 Q120,360 240,410 T470,400 L470,470 L-20,470Z','#14172a');R(f,-20,440,490,360,'#1e1a12');
 fBarn(G(m,{transform:'translate(40 600) scale(.4) translate(-40 -600)'}),40,600);fSilo(G(m,{transform:'translate(200 600) scale(.4) translate(-200 -600)'}),200,600);
 const c=G(m);BT(c,225,215,'THE END',92,'#fff',{stroke:'#000','stroke-width':10,'letter-spacing':4});T(c,225,262,`THE LAST HARVEST · PART ${p.part} / ${p.of}`,20,'#ffcf6a',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 R(c,60,640,330,52,'#a8332b',{rx:26});T(c,225,676,'FOLLOW FOR THE NEXT SERIES',22,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':2});
 return (u,t,bt)=>{const a=slam(bt,0,.3);A(c,{opacity:a.op})}};
