/* ===== lowpoly9: THE PIG WAR (Post Time LowPoly).  1859, San Juan Island, between American and British claims.
   Every set is a faceted triangle mesh (low-poly look): lpMesh() shades each triangle a little differently.
   LOC.low variants: garden | strait | camp | cabin.  Devices: FX.dateline (date + WAR METER), CARD.telegraph, CARD.lowend.  Props: pig, potatoes, flag_us, flag_uk, cannon. ===== */
const LP_INK='#1d2733';
function lpShade(h,k){const n=parseInt(h.slice(1),16),c=[n>>16&255,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*k))));return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')}
function lpTri(g,a,b,c,col,k){return P(g,`M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]}Z`,lpShade(col,k),{stroke:lpShade(col,k),'stroke-width':.8,'stroke-linejoin':'round'})}
/* faceted band: ridge function top(x) down to yBot, `rows` rows of triangles */
function lpMesh(g,x0,x1,top,yBot,col,seed,cols,rows,amp){cols=cols||16;rows=rows||3;amp=amp||.28;const V=[];
 for(let r=0;r<=rows;r++){V.push([]);for(let i=0;i<=cols;i++){const x=lerp(x0,x1,i/cols),y0=top(x),y=lerp(y0,yBot,r/rows),j=(r>0&&r<rows)?(rnd(seed+i*7+r*13)-.5)*(yBot-y0)/rows*.7:0;V[r].push([x+(r?(rnd(seed+i+r*3)-.5)*6:0),y+j])}}
 for(let r=0;r<rows;r++)for(let i=0;i<cols;i++){const a=V[r][i],b=V[r][i+1],c=V[r+1][i],d=V[r+1][i+1],f=(i+r)%2;
  if(f){lpTri(g,a,b,c,col,1-amp/2+rnd(seed+i*3+r)*amp);lpTri(g,b,d,c,col,1-amp/2+rnd(seed+i*5+r+9)*amp)}
  else{lpTri(g,a,b,d,col,1-amp/2+rnd(seed+i*3+r+4)*amp);lpTri(g,a,d,c,col,1-amp/2+rnd(seed+i*5+r+2)*amp)}}}
function lpPeak(g,x,y,w,h,col,seed){ // faceted mountain: lit left, shadow right
 const t=[x,y-h],l=[x-w/2,y],r=[x+w/2,y],m=[x+(rnd(seed)-.5)*w*.2,y-h*.38],ml=[x-w*.22,y-h*.35],mr=[x+w*.2,y-h*.4];
 lpTri(g,t,l,ml,col,1.18);lpTri(g,t,ml,m,col,1.02);lpTri(g,t,m,mr,col,.8);lpTri(g,t,mr,r,col,.66);lpTri(g,l,ml,[x-w*.1,y],col,.95);lpTri(g,ml,m,[x-w*.1,y],col,.82);lpTri(g,m,mr,[x+w*.1,y],col,.7);lpTri(g,mr,r,[x+w*.1,y],col,.58);
 lpTri(g,t,[x-w*.12,y-h*.78],[x+w*.1,y-h*.8],'#f4f7fb',1.0);lpTri(g,t,[x+w*.1,y-h*.8],[x+w*.02,y-h*.7],'#cfd8e6',1.0)}
function lpTree(g,x,y,h,col){R(g,x-3,y-h*.18,6,h*.18,'#5a3d28');for(let k=0;k<3;k++){const w=h*(.46-k*.1),yy=y-h*.14-k*h*.27;lpTri(g,[x,yy-h*.4],[x-w,yy],[x,yy],col,1.15-k*.06);lpTri(g,[x,yy-h*.4],[x,yy],[x+w,yy],col,.72-k*.02)}}
function lpSky(g,c1,c2){R(g,-100,-100,1480,820,c1);for(let i=0;i<8;i++)R(g,-100,-100+i*100,1480,100,lpShade(c2,.86+i*.03),{opacity:.55})}
function lpCloud(g,x,y,s,col){const t=[[-60,0],[-30,-26],[10,-34],[46,-18],[70,0]];for(let i=0;i<t.length-1;i++)lpTri(g,[x+t[i][0]*s,y+t[i][1]*s],[x+t[i+1][0]*s,y+t[i+1][1]*s],[x+(t[i][0]+t[i+1][0])/2*s,y],col||'#ffffff',.92+i*.04)}
function lpHouse(g,x,y,w,h,wall,roof){lpTri(g,[x,y],[x+w,y],[x,y-h],wall,1.08);lpTri(g,[x+w,y],[x+w,y-h],[x,y-h],wall,.9);const rx=x-10,rw=w+20;lpTri(g,[rx,y-h],[rx+rw/2,y-h-h*.55],[rx+rw,y-h],roof,.95);lpTri(g,[rx+rw/2,y-h-h*.55],[rx+rw,y-h],[rx+rw/2,y-h],roof,.7);
 R(g,x+w*.4,y-h*.55,w*.2,h*.55,'#2a1f16');R(g,x+w*.12,y-h*.7,w*.18,h*.22,'#ffe7a8');R(g,x+w*.7,y-h*.7,w*.18,h*.22,'#ffe7a8')}
function lpTent(g,x,y,w,h,col){lpTri(g,[x-w/2,y],[x,y-h],[x,y],col,1.12);lpTri(g,[x,y-h],[x+w/2,y],[x,y],col,.78);lpTri(g,[x-w*.08,y],[x,y-h*.7],[x+w*.08,y],'#1b222c',1)}
function lpFlag(g,x,y,col,kind,t){const q=G(g,{});L(q,x,y,x,y-120,'#c9ced6',4);const w=[];
 if(kind==='us'){for(let i=0;i<6;i++)w.push(R(q,x,y-120+i*8,70,8,i%2?'#f4f4f4':'#c0392b'));R(q,x,y-120,32,32,'#2f4a8a');for(let i=0;i<6;i++)C(q,x+6+(i%3)*10,y-114+Math.floor(i/3)*12,2.2,'#fff')}
 else{R(q,x,y-120,70,48,'#2f4a8a');L(q,x,y-120,x+70,y-72,'#fff',9);L(q,x+70,y-120,x,y-72,'#fff',9);L(q,x,y-120,x+70,y-72,'#c0392b',4);L(q,x+70,y-120,x,y-72,'#c0392b',4);R(q,x+29,y-120,12,48,'#fff');R(q,x,y-102,70,12,'#fff');R(q,x+31,y-120,8,48,'#c0392b');R(q,x,y-100,70,8,'#c0392b')}
 return q}
function lpShip(g,x,y,s,col,flag){const q=G(g,{transform:`translate(${x} ${y}) scale(${s})`});lpTri(q,[-110,0],[110,0],[-80,40],'#5a3d28',.95);lpTri(q,[110,0],[80,40],[-80,40],'#5a3d28',.7);
 for(let k=0;k<3;k++){const mx=-60+k*60;L(q,mx,0,mx,-120+k*10,'#3b2a1c',4);lpTri(q,[mx,-114+k*10],[mx+44,-40],[mx,-40],'#f2ead6',1.1);lpTri(q,[mx,-114+k*10],[mx,-40],[mx-40,-40],'#f2ead6',.82)}
 for(let k=0;k<4;k++)R(q,-70+k*38,10,12,8,'#15100c');return q}
function lpTitleLine(g,x,y,txt,sz,col){return BT(g,x,y,txt,sz,col,{stroke:'#000','stroke-width':sz/6})}

LOC.low=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const v=p.v||'garden';const upd=[];
 if(v==='garden'||v==='strait'||v==='camp'){const dusk=p.sky==='dusk';lpSky(f,dusk?'#f3a062':'#7fc3e8',dusk?'#d86a5a':'#bfe4f4');
  C(f,p.sunx||1000,p.suny||150,56,dusk?'#ffe2a8':'#fff6cf',{opacity:.95});C(f,p.sunx||1000,p.suny||150,120,'url(#gLamp)',{opacity:.3});
  const c1=G(f);lpCloud(c1,200,130,1.2);lpCloud(c1,620,90,.9);lpCloud(c1,1100,200,1);upd.push((u,t)=>A(c1,{transform:`translate(${Math.sin(t*.2)*14} 0)`}));
  lpPeak(f,230,470,520,330,'#6d7f98',3);lpPeak(f,640,470,640,420,'#7a8fab',8);lpPeak(f,1060,470,560,300,'#6a7c96',14);lpPeak(f,-10,480,380,240,'#8b9db3',22);lpPeak(f,1290,480,360,260,'#8b9db3',27)}
 if(v==='garden'){ // the potato patch: green hill, fence, rows, an island view
  lpMesh(m,-100,1380,x=>470+Math.sin(x*.006)*30,720,'#5da24a',31,22,4);lpMesh(m,-100,1380,x=>560+Math.sin(x*.01+1)*18,720,'#4a8b3a',51,22,3);
  for(let i=0;i<7;i++)lpTree(m,60+i*44,520+(i%2)*8,120+rnd(i)*40,'#2f7a4a');for(let i=0;i<5;i++)lpTree(m,1060+i*50,522+(i%2)*10,130+rnd(i+5)*40,'#2f7a4a');
  for(let r=0;r<5;r++)for(let i=0;i<14;i++){const x=300+i*46+r*10,y=600+r*22;lpTri(m,[x,y],[x+14,y],[x+7,y-16],'#3f8a35',1.1-r*.05);lpTri(m,[x+4,y-14],[x+14,y],[x+7,y-16],'#2f6f2a',1)}
  for(let i=0;i<9;i++){const x=560+i*74;R(m,x,598,8,50,'#8a6a45');L(m,x,610,x+74,610,'#a88858',4);L(m,x,630,x+74,630,'#a88858',4)}
  lpHouse(m,80,590,120,84,'#e8d9b8','#a8332b')}
 if(v==='strait'){ // water, ships on the horizon
  lpMesh(m,-100,1380,x=>470,720,'#2f7ea8',61,24,5,.34);const sh=[];for(const [x,y,s,c] of[[260,500,.7],[560,520,.9],[880,505,.8],[1100,525,1.0],[760,545,.55]])sh.push(lpShip(m,x,y,s));
  upd.push((u,t)=>sh.forEach((q,i)=>A(q,{transform:`translate(${[260,560,880,1100,760][i]} ${[500,520,505,525,545][i]+Math.sin(t*1.1+i)*4}) scale(${[.7,.9,.8,1,.55][i]}) rotate(${Math.sin(t*.9+i)*1.5})`})));
  lpMesh(n,-100,1380,x=>640,760,'#26668c',71,22,3,.3)}
 if(v==='camp'){ // American Camp: tents, flag, cannon, trench
  lpMesh(m,-100,1380,x=>520+Math.cos(x*.008)*20,720,'#6aa04a',81,22,4);
  for(const [x,y,w,h,c] of[[260,600,150,110,'#e7dcc2'],[480,615,170,120,'#d9cdb0'],[900,610,160,115,'#e7dcc2'],[1110,600,130,100,'#d9cdb0']])lpTent(m,x,y,w,h,c);
  const fl=lpFlag(m,700,600,'#c0392b','us');upd.push((u,t)=>A(fl,{transform:`skewY(${Math.sin(t*3)*2})`}));
  for(let i=0;i<6;i++)lpTree(m,-10+i*40,540,130,'#2f7a4a')}
 if(v==='cabin'){ // Lyman's cabin interior: wooden planks, window with the pig-sized hole, a lamp
  R(f,-100,-100,1480,820,'#4a3320');for(let i=0;i<20;i++)lpTri(f,[i*70-20,-100],[i*70+50,-100],[i*70+10,720],'#6a4a2e',.8+rnd(i)*.4);R(f,-100,-100,1480,820,'url(#gWallShade)',{opacity:.9});
  lpTri(m,[350,150],[640,150],[350,440],'#9fd0e8',1.1);lpTri(m,[640,150],[640,440],[350,440],'#9fd0e8',.85);L(m,495,150,495,440,'#3b2a1c',8);L(m,350,295,640,295,'#3b2a1c',8);
  R(m,-100,600,1480,160,'#5b4631');for(let i=0;i<14;i++)L(m,-100,606+i*12,1380,606+i*12,'#3f3022',2);
  R(m,820,330,150,270,'#6a4a2e',{stroke:LP_INK,'stroke-width':4});L(m,820,420,970,420,LP_INK,3);L(m,820,510,970,510,LP_INK,3);
  const lm=G(m);C(lm,740,205,120,'url(#gLamp)',{opacity:.5});lpTri(lm,[725,215],[755,215],[740,185],'#ffd98a',1.1);R(lm,727,215,26,34,'#ffe7a8')}
 return (u,t,bt)=>upd.forEach(fn=>fn(u,t,bt))};

/* ---- cast: THE PIG WAR (1859).  New faces/hats on the shared pax rig. ---- */
defPax('lyman',{skin:'#e1b690',skinS:'#bf9068',coat:'#7a5a3a',coatS:'#583f27',pants:'#3c4a63',boot:'#3a2a1c',ink:'#241810'},{hair:'messy',hc:'#6a4a2a',beard:'#6a4a2a',brow:'thick'});
defPax('griffin',{skin:'#ecc3a2',skinS:'#c99a78',coat:'#2f5a45',coatS:'#1f4030',pants:'#4a4038',boot:'#2a2118',ink:'#241810'},{hair:'messy',hc:'#b8561f',beard:'#b8561f',brow:'thick'});
defPax('pickett',{skin:'#efcaa8',skinS:'#cfa07c',coat:'#2b4a8a',coatS:'#1d3463',pants:'#9fb4d8',boot:'#15100c',ink:'#241810'},{hair:'messy',hc:'#d9b24a',brow:'thick'});
defPax('baynes',{skin:'#e8c3a0',skinS:'#c79a76',coat:'#a8332b',coatS:'#7e231d',pants:'#f2ead6',boot:'#15100c',ink:'#241810'},{hair:'messy',hc:'#c9ced6',beard:'#c9ced6',brow:'thick',bags:1});
Object.assign(DECO,{
 lyman:(g,T,P,v)=>{if(v==='front'){lpTri(g,[-26,-236],[26,-236],[0,-170],'#9a7650',1);lpTri(g,[-26,-236],[0,-170],[-10,-140],'#6a4a2a',1);R(g,-34,-262,68,10,'#4a3320',{rx:3});}},
 griffin:(g,T,P,v)=>{if(v==='front'){lpTri(g,[-30,-230],[30,-230],[0,-160],'#3f7a5a',1);R(g,-14,-206,28,10,'#f2ead6',{rx:3});E('ellipse',{cx:0,cy:-266,rx:34,ry:7,fill:'#2a2118'},g)}},
 pickett:(g,T,P,v)=>{if(v==='front'){for(const y of[-220,-196,-172])C(g,0,y,3.4,'#ffd23a');L(g,-30,-236,30,-170,'#ffd23a',4);R(g,-30,-272,60,16,'#15233f',{rx:5,stroke:'#241810','stroke-width':2.4});R(g,-8,-268,16,8,'#ffd23a',{rx:2})}},
 baynes:(g,T,P,v)=>{if(v==='front'){lpTri(g,[-30,-236],[-8,-236],[-18,-206],'#ffd23a',1);lpTri(g,[30,-236],[8,-236],[18,-206],'#ffd23a',1);for(const y of[-210,-188,-166])C(g,0,y,3.4,'#ffd23a');P(g,'M-36,-272 Q0,-306 36,-272 L30,-258 Q0,-272 -30,-258Z','#15233f',{stroke:'#241810','stroke-width':2.4})}}});

/* ---- device: dateline lower-third with the WAR METER (0..1) ---- */
FX.dateline=(g,f)=>{const q=G(g,{});const x0=36,x1=414,y=628,lvl=f.level==null?0:f.level;
 R(q,x0-14,y-34,x1-x0+28,92,'rgba(16,26,40,.82)',{rx:10,stroke:'#9fd0e8','stroke-width':2});
 T(q,225,y-10,f.date||'',20,'#ffffff',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 T(q,225,y+10,f.place||'',14,'#9fd0e8',{'font-family':MONO,'font-weight':700,'letter-spacing':1.5});
 R(q,x0,y+24,x1-x0,12,'#2a3a50',{rx:6});const bar=R(q,x0,y+24,0.01,12,lvl>.66?'#e0463a':lvl>.33?'#f0b23a':'#7acb7a',{rx:6});
 T(q,x0,y+52,'WAR METER',11,'#9fd0e8',{'font-family':MONO,'font-weight':800,'letter-spacing':2});T(q,x1,y+52,'PIGS: 1',11,'#ffb3c1',{'font-family':MONO,'font-weight':800,'letter-spacing':2,'text-anchor':'end'});
 return (lt)=>{A(q,{opacity:clamp(lt/.3)});A(bar,{width:Math.max(.01,(x1-x0)*lvl*clamp(lt/.9))})}};
/* ---- device: the telegraph card (p.mode 'open' | 'close' | 'text') ---- */
CARD.telegraph=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-20,-20,490,840,'#14202e');lpMesh(f,-20,470,x=>560,820,'#1f3550',91,10,3,.4);
 C(f,225,260,260,'url(#gLamp)',{opacity:.2});
 const tp=G(m);R(tp,30,110,390,300,'#2b3d52',{rx:18,stroke:'#9fd0e8','stroke-width':4});R(tp,44,124,362,272,'#f2ead6',{rx:10});
 const open=p.mode!=='close',txt=p.mode==='text',LN=p.lines||[];const INK='#2a1f16';
 const l1=T(tp,225,170,txt?LN[0]:open?'POST TIME LOWPOLY':'NEXT DISPATCH',txt?30:22,INK,{'font-family':RCF,'font-weight':700,'letter-spacing':4});fitText(l1,320);
 const l2=T(tp,225,236,txt?LN[1]:open?`PART ${p.part} / ${p.of}`:(p.next||''),txt?40:open?52:34,'#a8332b',{'font-family':RCF,'font-weight':700,'letter-spacing':3});fitText(l2,320);
 const l3=T(tp,225,284,txt?LN[2]:open?(p.title||''):`PART ${p.part+1} / ${p.of}`,txt?26:22,INK,{'font-family':RCF,'font-weight':700,'letter-spacing':3});fitText(l3,320);
 const tape=[];for(let i=0;i<12;i++)tape.push(R(tp,60+i*29,318,18,6,INK,{rx:3}));
 T(tp,225,372,'TELEGRAPH · SAN JUAN ISLAND · 1859',13,'#6a5a4a',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 const key=G(m);R(key,150,480,150,24,'#6a4a2a',{rx:6});const arm=R(key,180,462,90,10,'#c9a24a',{rx:5});C(key,282,467,9,'#c9a24a');
 return (u,t,bt)=>{const a=slam(bt,0,.25);[l1,l2,l3].forEach((e,i)=>A(e,{opacity:clamp((bt-.05-i*.12)/.1)}));const mo=mouth('tele');tape.forEach((b,i)=>A(b,{opacity:.25+.75*Math.abs(Math.sin(t*14+i*1.7)*(.3+mo))}));A(arm,{y:462+(mo>.2?5:0)})}};
CARD.lowend=(Z,p)=>{const {f,m}=CARD9(Z,'lowend');R(f,-20,-20,490,840,'#0e1824');lpSky(f,'#f3a062','#d86a5a');lpPeak(f,120,520,520,320,'#6d7f98',3);lpPeak(f,360,520,460,260,'#7a8fab',8);
 lpMesh(f,-20,470,x=>520,840,'#4a8b3a',33,10,3);const pg=G(m,{transform:'translate(225 650) scale(.9)'});PROP.pig(pg,{});
 const c=G(m);BT(c,225,190,'THE END',92,'#fff',{stroke:'#000','stroke-width':10,'letter-spacing':4});T(c,225,238,`THE PIG WAR · PART ${p.part} / ${p.of}`,20,'#ffd2dc',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 R(c,60,700,330,52,'#e0809a',{rx:26});T(c,225,736,'FOLLOW FOR THE NEXT STORY',22,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':2});
 return (u,t,bt)=>{const a=slam(bt,0,.3);A(c,{opacity:a.op})}};

/* ---- props ---- */
Object.assign(PROP,{
 pig:(g,o)=>{const q=G(g,{});const pk='#f2a1b4';
  lpTri(q,[-70,-70],[40,-86],[-60,-20],pk,1.15);lpTri(q,[40,-86],[70,-40],[-60,-20],pk,.95);lpTri(q,[70,-40],[40,-8],[-60,-20],pk,.78);lpTri(q,[-70,-70],[-60,-20],[-84,-40],pk,.88);
  lpTri(q,[40,-86],[84,-70],[70,-40],pk,1.05);lpTri(q,[84,-70],[100,-48],[70,-40],pk,.85);R(q,92,-62,14,20,'#e0809a',{rx:6});C(q,98,-56,2.2,'#7e3a50');C(q,98,-48,2.2,'#7e3a50');
  lpTri(q,[56,-88],[70,-108],[74,-84],'#e0809a',1);C(q,76,-74,4.2,LP_INK);for(const x of[-44,-14,22,48]){L(q,x,-22,x,0,'#e0809a',9)}
  const tl=P(q,'M-72,-62 q-16,-10 -8,-26 q10,10 4,-0',  'none',{stroke:'#e0809a','stroke-width':4,'stroke-linecap':'round'});return q},
 potatoes:(g,o)=>{for(let i=0;i<6;i++){const x=-40+i*16+(i%2)*6,y=-(i%2)*9;lpTri(g,[x-9,y],[x+9,y],[x,y-14],'#b98a54',1.1);lpTri(g,[x+9,y],[x,y-14],[x+3,y+2],'#8a6234',1)}},
 flag_us:(g,o)=>lpFlag(g,0,0,'#c0392b','us'),flag_uk:(g,o)=>lpFlag(g,0,0,'#2f4a8a','uk'),
 cannon:(g,o)=>{const q=G(g,{});lpTri(q,[-50,-26],[40,-40],[40,-18],'#46505e',1.1);lpTri(q,[-50,-26],[40,-18],[-50,-8],'#2c333d',1);C(q,-18,-6,22,'#6a4a2a',{stroke:LP_INK,'stroke-width':3});C(q,-18,-6,6,'#3b2a1c');return q}});
