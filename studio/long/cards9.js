/* ===== cards9: vertical full-screen cards (WINDOW coordinates 450x800; the engine shows window (225,400) for a card beat).
   Key content stays in y 96-456 (above the caption band y 464-576, below the platform top bar).  Reuses ICON/BT/fitText/slam/stripes/icon from cards16. ===== */
const BGV=(f,c)=>R(f,-20,-20,490,840,c);
Object.assign(ICON,{
 phone:(g,c)=>{R(g,-34,-66,68,132,'#15171c',{rx:12,stroke:'#0b0d12','stroke-width':5});R(g,-28,-54,56,102,'#7fd3ff',{rx:5});R(g,-12,-60,24,4,'#0b0d12',{rx:2});C(g,0,56,5,'#0b0d12');T(g,0,6,'9%',26,'#e0463a',{'font-family':RCF,'font-weight':700})},
 group:(g,c)=>{for(const [x,y,k] of [[-44,14,'#ffd23a'],[44,14,'#7dffb0'],[0,-6,'#ff7a1c']]){C(g,x,y-28,17,k,{stroke:'#0b0d12','stroke-width':4});P(g,`M${x-26},${y+46} Q${x-26},${y-4} ${x},${y-4} Q${x+26},${y-4} ${x+26},${y+46}Z`,k,{stroke:'#0b0d12','stroke-width':4})}},
 map:(g,c)=>{P(g,'M-62,52 L-62,-40 L-22,-52 L22,-40 L62,-52 L62,40 L22,52 L-22,40Z','#e9dfc0',{stroke:'#0b0d12','stroke-width':5,'stroke-linejoin':'round'});P(g,'M-44,20 Q-20,-30 6,-4 T44,-26',null,{fill:'none',stroke:'#e0463a','stroke-width':6,'stroke-dasharray':'8 8'});T(g,38,-14,'X',34,'#e0463a')},
 whistle:(g,c)=>{R(g,-46,-16,70,40,'#d0d6dc',{rx:16,stroke:'#0b0d12','stroke-width':5});R(g,20,-8,34,24,'#d0d6dc',{rx:6,stroke:'#0b0d12','stroke-width':4});C(g,-24,4,9,'#0b0d12');for(let i=0;i<3;i++)L(g,56+i*10,-24+i*2,66+i*10,-34+i*2,'#ffd23a',5)},
 mirror:(g,c)=>{C(g,0,-6,48,'#cfe8f5',{stroke:'#0b0d12','stroke-width':6});P(g,'M-22,-30 L8,-48 L-14,-6Z','#fff',{opacity:.9});R(g,-8,40,16,36,'#7a5a36',{rx:4,stroke:'#0b0d12','stroke-width':4});for(let i=0;i<3;i++)L(g,60+i*8,-34+i*12,92+i*8,-44+i*12,'#ffd23a',5)},
 flare:(g,c)=>{R(g,-12,-30,24,86,'#e0463a',{rx:6,stroke:'#0b0d12','stroke-width':5});R(g,-12,-6,24,12,'#fff');P(g,'M0,-92 Q-24,-60 0,-36 Q24,-60 0,-92Z','#ff9a2a',{stroke:'#0b0d12','stroke-width':4});P(g,'M0,-76 Q-10,-58 0,-46 Q10,-58 0,-76Z','#fff3b0')},
 clock:(g,c)=>{C(g,0,0,58,'#f4f6fb',{stroke:'#0b0d12','stroke-width':7});for(let i=0;i<12;i++){const a=i*Math.PI/6;L(g,Math.sin(a)*46,-Math.cos(a)*46,Math.sin(a)*54,-Math.cos(a)*54,'#0b0d12',4)}L(g,0,0,0,-34,'#0b0d12',7);L(g,0,0,26,14,'#e0463a',6);C(g,0,0,6,'#0b0d12')},
 tent:(g,c)=>{P(g,'M-70,56 L0,-56 L70,56Z','#ff7a1c',{stroke:'#0b0d12','stroke-width':6,'stroke-linejoin':'round'});P(g,'M-18,56 L0,-8 L18,56Z','#3a2410');L(g,0,-56,0,-76,'#0b0d12',5)},
 bandage:(g,c)=>{R(g,-64,-22,128,44,'#f0c9a0',{rx:20,stroke:'#0b0d12','stroke-width':5});R(g,-22,-22,44,44,'#f7e1c6');for(const x of[-8,8])for(const y of[-8,8])C(g,x,y,2.6,'#c99a70')},
 gun:(g,c)=>{R(g,-60,-22,120,30,'#2b2e36',{rx:6,stroke:'#0b0d12','stroke-width':5});R(g,-16,6,28,54,'#2b2e36',{rx:6,stroke:'#0b0d12','stroke-width':5});R(g,52,-16,40,12,'#2b2e36')},
 sofa:(g,c)=>{R(g,-70,-10,140,46,'#a64c4c',{rx:14,stroke:'#0b0d12','stroke-width':5});R(g,-78,-44,156,46,'#c0605a',{rx:16,stroke:'#0b0d12','stroke-width':5});R(g,-60,34,10,16,'#0b0d12');R(g,50,34,10,16,'#0b0d12')},
 airplane:(g,c)=>{P(g,'M-60,10 L10,-6 L-8,-56 L10,-56 L50,-8 L72,-12 Q84,-12 84,0 Q84,12 72,12 L50,8 L10,56 L-8,56 L10,6 L-60,22Z','#cfd6de',{stroke:'#0b0d12','stroke-width':5,'stroke-linejoin':'round'})},
 sms:(g,c)=>{P(g,'M-66,-46 L66,-46 Q80,-46 80,-32 L80,16 Q80,30 66,30 L-8,30 L-40,58 L-34,30 L-66,30 Q-80,30 -80,16 L-80,-32 Q-80,-46 -66,-46Z','#7dffb0',{stroke:'#0b0d12','stroke-width':5,'stroke-linejoin':'round'});for(const x of[-30,0,30])C(g,x,-8,7,'#0b0d12')},
 helicopter:(g,c)=>ICON.heli(g,c)
});
const CARD9=(Z,name)=>{const f=G(Z.far),m=G(Z.mid);BGV(f,name==='rule'?'#f4ecd2':'#0b0d16');if(name!=='rule')R(f,-20,-20,490,840,'url(#gWallShade)');return {f,m}};

/* ---------- A / B choice (A on top, B below) ---------- */
CARD.ab=(Z,p)=>{const {f,m}=CARD9(Z,'ab');
 const mk=(side,o,y0,col,tag,gm)=>{const q=G(m);const w=400,h=160,x=25;
  R(q,x,y0,w,h,gm?'#16205a':'#1b1b20',{rx:20,stroke:col,'stroke-width':6});
  if(gm){for(let yy=y0+10;yy<y0+h;yy+=20)L(q,x+8,yy,x+w-8,yy,'#2a3a8a',2)}
  R(q,x+14,y0+14,52,52,col,{rx:12});BT(q,x+40,y0+56,side,46,'#111',{'paint-order':'normal'});
  const ch=G(q);R(ch,x+w-168,y0+14,154,30,gm?'#7dffb0':'#e0463a',{rx:15});T(ch,x+w-91,y0+35,tag,14,gm?'#06220f':'#fff',{'font-family':MONO,'font-weight':800,'letter-spacing':1});
  icon(q,o.icon,x+86,y0+h/2+24,.8);const tx=BT(q,x+w-122,y0+h-30,o.t,40,'#fff',{stroke:'#000','stroke-width':7});fitText(tx,226);
  let rs=null;if(o.res){rs=icon(q,o.res,x+w-40,y0+h/2+8,.42);A(rs,{opacity:0})}
  return {q,rs}};
 const A_=mk('A',p.a,102,'#ffd23a','GAME BRAIN',true),B_=mk('B',p.b,284,'#7dffb0','REAL LIFE',false);
 const vs=G(m);C(vs,225,273,28,'#e0463a',{stroke:'#fff','stroke-width':4});BT(vs,225,285,'VS',28,'#fff',{'paint-order':'normal'});
 return (u,t,bt)=>{const a=slam(bt,0,.3),b=slam(bt,.15,.3);A(A_.q,{transform:`translate(${(1-a.k)*-460} 0)`,opacity:a.op});A(B_.q,{transform:`translate(${(1-b.k)*460} 0)`,opacity:b.op});A(vs,{opacity:slam(bt,.3,.2).op,transform:`translate(225 273) scale(${.4+.6*eb(clamp((bt-.3)/.25))}) translate(-225 -273)`});
  if(p.pick){for(const z of[A_,B_])if(z.rs)A(z.rs,{opacity:clamp((bt-.6)/.15)});const w=p.pick==='a'?A_:B_,l=p.pick==='a'?B_:A_;A(l.q,{opacity:.32});A(w.q,{transform:`translate(0 ${-3*Math.sin(bt*8)})`})}}};

/* ---------- rule card ---------- */
CARD.rule=(Z,p)=>{const {f,m}=CARD9(Z,'rule');stripes(f,-20,-20,490,840,'#f4ecd2','#efe4c0',34);
 stripes(f,-20,-20,490,86,'#ffd23a','#111',26);stripes(f,-20,462,490,30,'#ffd23a','#111',16);
 const c=G(m);R(c,25,108,400,340,'#fffdf4',{rx:18,stroke:'#111','stroke-width':6});
 R(c,25,108,190,56,'#d9302a',{rx:18});BT(c,120,150,'RULE #'+p.n,36,'#fff',{'paint-order':'normal','letter-spacing':2});
 if(p.icon)icon(c,p.icon,225,252,1.0);
 fitText(BT(c,225,372,p.t1,54,'#111',{'paint-order':'normal'}),372);fitText(BT(c,225,430,p.t2,54,'#d9302a',{'paint-order':'normal'}),372);
 return (u,t,bt)=>{const a=slam(bt,0,.28);A(c,{opacity:a.op,transform:`translate(225 280) scale(${lerp(1.5,1,a.k)}) rotate(${lerp(-5,0,a.k)}) translate(-225 -280)`})}};

/* ---------- plain text card: p.lines, p.size ---------- */
CARD.text=(Z,p)=>{const {f,m}=CARD9(Z,'text');if(p.bg){R(f,-20,-20,490,840,p.bg)}
 const ls=(p.lines||[p.t]),sz=p.size||84;const els=ls.map((s,i)=>{const e=BT(m,225,270+i*sz*1.05-(ls.length-1)*sz*.52,s,sz,i===0?(p.c||'#fff'):(p.c2||p.c||'#fff'),{stroke:'#000','stroke-width':sz*.12,'letter-spacing':2});fitText(e,390);return e});
 return (u,t,bt)=>{els.forEach((e,i)=>{const a=slam(bt,i*.25,.28);A(e,{opacity:a.op})})}};

/* ---------- stat bars (up to 3 rows): p.title, p.rows=[{l,v,sub,suf,pre,c}] ---------- */
CARD.stat=(Z,p)=>{const {f,m}=CARD9(Z,'stat');
 BT(m,225,134,p.title,40,'#fff',{stroke:'#000','stroke-width':7,'letter-spacing':3});
 const mx=Math.max(...p.rows.map(r=>r.v)),bars=[];
 p.rows.forEach((r,i)=>{const y=186+i*88,q=G(m);const lab=BT(q,30,y-4,r.l,28,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':5});fitText(lab,230);
  R(q,30,y+4,390,46,'#1c2038',{rx:10});const bar=R(q,30,y+4,10,46,r.c||['#7dffb0','#ffd23a','#ff6a5a'][i%3],{rx:10});const num=BT(q,410,y+40,'0',30,'#fff',{'text-anchor':'end',stroke:'#000','stroke-width':5});bars.push({bar,num,r})});
 return (u,t,bt)=>{bars.forEach((b,i)=>{const k=ease(clamp((bt-.15-i*.3)/.7));A(b.bar,{width:Math.max(10,390*(b.r.v/mx)*k)});b.num.textContent=(b.r.pre||'')+Math.round(b.r.v*k)+(b.r.suf||'')})}};

/* ---------- item list (icons in a column, up to 3) ---------- */
CARD.list=(Z,p)=>{const {f,m}=CARD9(Z,'list');BT(m,225,130,p.title,38,'#fff',{stroke:'#000','stroke-width':7,'letter-spacing':3});const els=[];
 p.items.forEach((it,i)=>{const y=156+i*100,q=G(m);R(q,25,y,400,88,'#161a2e',{rx:16,stroke:it.c||'#7dffb0','stroke-width':4});icon(q,it.icon,86,y+44,.46);
  const l=BT(q,150,y+40,it.l,32,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':6});fitText(l,262);if(it.s){const s=BT(q,150,y+72,it.s,20,it.c||'#7dffb0',{'text-anchor':'start','paint-order':'normal'});fitText(s,262)}els.push(q)});
 return (u,t,bt)=>{els.forEach((q,i)=>{const k=eb(clamp((bt-.35-i*.35)/.3));A(q,{opacity:clamp((bt-.35-i*.35)/.08),transform:`translate(${(1-k)*60} 0)`})})}};

/* ---------- phone UI: p.pct, p.rows=[{l,on}] (battery tips) ---------- */
CARD.phone=(Z,p)=>{const {f,m}=CARD9(Z,'phone');
 const ph=G(m);R(ph,95,98,260,356,'#101218',{rx:30,stroke:'#cfd6de','stroke-width':6});R(ph,106,112,238,328,'#0e1c3a',{rx:20});R(ph,198,106,54,8,'#0b0d12',{rx:4});
 const pc=BT(ph,225,176,'',52,'#e0463a',{stroke:'#000','stroke-width':7});R(ph,150,194,150,22,'#1c2038',{rx:8,stroke:'#fff','stroke-width':3});const fill=R(ph,154,198,10,14,'#e0463a',{rx:5});
 const rows=[];(p.rows||[]).forEach((r,i)=>{const y=236+i*66,q=G(ph);R(q,116,y,218,54,'#16224a',{rx:12});T(q,128,y+34,r.l,19,'#fff',{'font-family':RCF,'font-weight':700,'text-anchor':'start','letter-spacing':1});const sw=R(q,278,y+14,44,26,'#3a3f66',{rx:13});const kn=C(q,291,y+27,10,'#9aa0c0');rows.push({q,sw,kn,r,i})});
 return (u,t,bt)=>{const k=ease(clamp(bt/Math.max(.6,p.dur||1)));const pct=Math.round(lerp(p.from_==null?9:p.from_,p.to==null?9:p.to,k));pc.textContent=pct+'%';A(pc,{fill:pct<=15?'#ff5a4a':'#7dffb0'});A(fill,{width:Math.max(10,142*pct/100),fill:pct<=15?'#e0463a':'#3ac06a'});
  rows.forEach(o=>{const on=o.r.on&&bt>.35+o.i*.45;A(o.sw,{fill:on?'#3ac06a':'#3a3f66'});A(o.kn,{cx:on?309:291,fill:on?'#fff':'#9aa0c0'})});
  A(ph,{transform:`translate(0 ${Math.sin(bt*2)*2})`})}};

/* ---------- end card: p.series, p.part, p.of, p.next (topic) ---------- */
CARD.end=(Z,p)=>{const {f,m}=CARD9(Z,'end');for(let i=0;i<50;i++)R(f,rnd(i)*450,rnd(i+9)*470,3,3,'#fff',{opacity:.2+rnd(i+3)*.5});
 const last=p.part>=p.of;
 const nm=BT(m,225,124,p.series,24,'#ffd23a',{stroke:'#000','stroke-width':5,'letter-spacing':3});fitText(nm,390);
 const hd=BT(m,225,196,last?'THE END':'PART '+p.part+' / '+p.of+' DONE',last?72:54,'#fff',{stroke:'#000','stroke-width':9,'letter-spacing':2});fitText(hd,390);
 const nx=G(m);R(nx,214,236,212,150,'#161a2e',{rx:16,stroke:'#7dffb0','stroke-width':4,'stroke-dasharray':'14 8'});
 BT(nx,320,270,last?'NEXT UP':'NEXT:',22,'#9fd0ff',{'paint-order':'normal','letter-spacing':4});const tp=BT(nx,320,320,last?(p.nextLines&&p.nextLines[0]||'FULL GUIDE'):(p.next||'').split('|')[0],40,'#fff',{stroke:'#000','stroke-width':7});fitText(tp,190);
 const tp2=BT(nx,320,364,last?(p.nextLines&&p.nextLines[1]||'ON THE CHANNEL'):(p.next||'').split('|')[1]||'',40,'#ffd23a',{stroke:'#000','stroke-width':7});fitText(tp2,190);
 const sb=G(m);R(sb,120,404,210,46,'#e0463a',{rx:23});BT(sb,225,438,'FOLLOW',30,'#fff',{'paint-order':'normal','letter-spacing':3});
 const dex=actor(m,{k:'dex',view:'front',pose:'wave',expr:'smile',x:112,y:392,s:.5});const stv=actor(m,{k:'steve',view:'front',pose:'zombie',x:60,y:392,s:.34,ph:2});
 return (u,t,bt)=>{A(sb,{transform:`translate(225 427) scale(${1+.05*Math.sin(t*5)}) translate(-225 -427)`});dex.upd(u,t,bt);stv.upd(u,t,bt)}};

/* ======================= THE LAST BUS cards ======================= */
const AMB='#ffb020';
function ledGrid(g,x,y,w,h){const d=document.getElementById('defs');if(!d.querySelector('#ledGrid'))d.insertAdjacentHTML('beforeend','<pattern id="ledGrid" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="none"/><rect x="4" width="1.4" height="5" fill="#000" opacity=".75"/><rect y="4" width="5" height="1.4" fill="#000" opacity=".75"/></pattern>');R(g,x,y,w,h,'url(#ledGrid)')}
/* BUS-E's PA: p.mode 'open' | 'close' ; p.part, p.of, p.title, p.next (title of the next stop), p.time */
CARD.pa=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);BGV(f,'#07090e');R(f,-20,-20,490,840,'url(#gWallShade)');
 // ceiling strip + speaker grille
 R(f,-20,-20,490,110,'#10141c');for(let i=0;i<6;i++)R(f,30+i*68,40,50,10,'#fff4d0',{rx:4,opacity:.9});
 const panel=G(m);R(panel,25,118,400,250,'#050608',{rx:16,stroke:'#2a2e38','stroke-width':6});R(panel,32,125,386,236,'#0a0b0e',{rx:12});
 const open=p.mode!=='close',txt=p.mode==='text',LN=p.lines||[];
 const l1=T(panel,225,166,txt?LN[0]:open?'THE LAST BUS':'NEXT STOP',txt?40:26,AMB,{'font-family':MONO,'font-weight':800,'letter-spacing':5});fitText(l1,372);
 const l2=T(panel,225,246,txt?LN[1]:open?`PART ${p.part} / ${p.of}`:(p.next||''),txt?48:open?58:42,'#ffd86a',{'font-family':MONO,'font-weight':800,'letter-spacing':3});fitText(l2,372);
 const l3=T(panel,225,306,txt?LN[2]:open?(p.title||''):`PART ${p.part+1} / ${p.of}`,txt?40:30,AMB,{'font-family':MONO,'font-weight':800,'letter-spacing':3});fitText(l3,372);
 const l4=T(panel,225,344,p.time||'',20,'#ff7a3a',{'font-family':MONO,'font-weight':700,'letter-spacing':4});
 for(const e of[l1,l2,l3,l4])e.setAttribute('filter','');ledGrid(panel,32,125,386,236);
 const glow=R(panel,32,125,386,236,'url(#gAmb)',{opacity:.0});
 // speaker grille with waves
 const sp=G(m);R(sp,160,400,130,40,'#1a1e28',{rx:10,stroke:'#2a2e38','stroke-width':3});for(let i=0;i<8;i++)L(sp,175+i*14,408,175+i*14,432,'#0a0b0e',4);
 const waves=[0,1,2].map(i=>E('path',{d:`M${300+i*16},${406-i*6} q${10+i*4},${14+i*6} 0,${28+i*12}`,fill:'none',stroke:AMB,'stroke-width':4,'stroke-linecap':'round'},sp));
 const waves2=[0,1,2].map(i=>E('path',{d:`M${150-i*16},${406-i*6} q${-10-i*4},${14+i*6} 0,${28+i*12}`,fill:'none',stroke:AMB,'stroke-width':4,'stroke-linecap':'round'},sp));
 const fol=G(m);if(!open){R(fol,100,448,250,0,'none')}
 return (u,t,bt)=>{const a=slam(bt,0,.25);[l1,l2,l3,l4].forEach((e,i)=>A(e,{opacity:clamp((bt-.05-i*.12)/.1)*(.92+.08*Math.sin(t*30))}));
  const mo=Math.max(mouth('bus'),mouth('buswh'));waves.concat(waves2).forEach((w,i)=>A(w,{opacity:.15+.85*clamp(mo*1.6-i%3*.18)}));A(sp,{transform:`translate(0 ${Math.sin(t*40)*mo*1.2})`})}};
/* the three rules, one by one: p.rules=[...3 strings], p.at=[t1,t2,t3] */
CARD.rules=(Z,p)=>{const {f,m}=CARD9(Z,'rules');R(f,-20,-20,490,840,'#0b0d12');stripes(f,-20,-20,490,60,'#ffd23a','#111',22);
 BT(m,225,98,p.title||'THE RULES OF THE BUS',30,'#fff',{stroke:'#000','stroke-width':6,'letter-spacing':3});const tiles=[];
 (p.rules||[]).forEach((r,i)=>{const y=118+i*108,q=G(m);R(q,25,y,400,94,'#f4f4f6',{rx:14,stroke:'#111','stroke-width':5});R(q,25,y,84,94,'#d9302a',{rx:14});BT(q,67,y+66,String(i+1),60,'#fff',{'paint-order':'normal'});
  const l1=BT(q,270,y+(r.length>1?40:58),r[0],34,'#111',{'paint-order':'normal'});fitText(l1,290);if(r[1]){const l2=BT(q,270,y+78,r[1],34,'#d9302a',{'paint-order':'normal'});fitText(l2,290)}tiles.push(q)});
 const at=p.at||[.3,1.7,3.1];
 return (u,t,bt)=>{tiles.forEach((q,i)=>{const k=eb(clamp((bt-at[i])/.22));A(q,{opacity:clamp((bt-at[i])/.06),transform:`translate(${(1-k)*-70} 0) rotate(${(1-k)*-4} 225 ${118+i*108+40})`})})}};
/* the symptom list: p.items=[{l,ic}] */
CARD.symptoms=(Z,p)=>{const {f,m}=CARD9(Z,'symptoms');R(f,-20,-20,490,840,'#0a1016');stripes(f,-20,-20,490,50,'#2ec4b6','#0a1016',20);
 BT(m,225,92,p.title||'BITE SYMPTOMS',34,'#7ff0e0',{stroke:'#000','stroke-width':6,'letter-spacing':4});BT(m,225,122,p.sub||'TURNS YOU IN ABOUT 10 HOURS',18,'#cfe4ff',{'paint-order':'normal','letter-spacing':3});
 const SY={fever:(g)=>{R(g,-6,-30,12,52,'#f4f4f6',{rx:6,stroke:'#111','stroke-width':3});C(g,0,26,12,'#e0463a',{stroke:'#111','stroke-width':3});R(g,-3,-8,6,34,'#e0463a')},
  sweat:(g)=>{P(g,'M0,-30 Q-24,6 -14,22 Q0,34 14,22 Q24,6 0,-30Z','#6ad0ff',{stroke:'#111','stroke-width':3})},
  shake:(g)=>{for(const d of[-9,0,9])E('path',{d:`M${d-10},-28 L${d-10},22 Q${d-10},34 ${d},34 Q${d+10},34 ${d+10},22 L${d+10},-28`,fill:'none',stroke:'#f0c9a0','stroke-width':7,'stroke-linecap':'round',opacity:d===0?1:.35},g)},
  confused:(g)=>{T(g,0,18,'?',64,'#ffd23a',{stroke:'#111','stroke-width':6,'paint-order':'stroke fill','font-family':INTER})},
  eyes:(g)=>{E('ellipse',{cx:0,cy:0,rx:30,ry:18,fill:'#fff',stroke:'#111','stroke-width':3},g);C(g,0,0,10,'#d02020');for(let i=0;i<6;i++){const a=i*1.05;L(g,Math.cos(a)*28,Math.sin(a)*16,Math.cos(a)*14,Math.sin(a)*8,'#d02020',2)}}};
 const rows=[];(p.items||[]).forEach((it,i)=>{const y=148+i*60,q=G(m);R(q,25,y,400,52,'#141c26',{rx:12,stroke:'#2ec4b6','stroke-width':3});const ic=G(q,{transform:`translate(66 ${y+27}) scale(.52)`});(SY[it.ic]||SY.fever)(ic);BT(q,112,y+37,it.l,28,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':5});
  const tk=G(q,{});C(tk,392,y+26,17,'none',{stroke:'#7ff0e0','stroke-width':3});const ck=E('path',{d:`M${383},${y+26} l7,8 l13,-16`,fill:'none',stroke:'#7dffb0','stroke-width':5,'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':40,'stroke-dashoffset':40},q);rows.push({q,ck,i})});
 const at=p.at||[.4,.9,1.4,1.9,2.4];
 return (u,t,bt)=>{rows.forEach(o=>{const k=eb(clamp((bt-at[o.i])/.25));A(o.q,{opacity:clamp((bt-at[o.i])/.07),transform:`translate(${(1-k)*80} 0)`});A(o.ck,{'stroke-dashoffset':40*(1-clamp((bt-at[o.i]-.2)/.25))})})}};
/* suspect board: p.faces=['benny',...] (order) p.status={who:'clear'|'sus'|'main'} p.title */
CARD.board=(Z,p)=>{const {f,m}=CARD9(Z,'board');R(f,-20,-20,490,840,'#2a1e14');for(let i=0;i<40;i++)R(f,rnd(i)*450,rnd(i+9)*800,3,3,'#1a120c',{opacity:.35});
 BT(m,225,104,p.title||'WHO IS INFECTED?',38,'#ffd23a',{stroke:'#000','stroke-width':7,'letter-spacing':3});
 const faces=p.faces||['rosa','priya','marcus','teddy','june','vic','lena','benny','park','dante','amara','walt'];const st=p.status||{};const cells=[];
 faces.forEach((w,i)=>{const col=i%3,row=Math.floor(i/3);const x=32+col*132,y=122+row*74;const q=G(m);
  R(q,x+4,y+4,118,68,'#000',{rx:4,opacity:.35});R(q,x,y,118,68,'#f6f2e4',{rx:4,stroke:'#111','stroke-width':2.5});
  const hd=G(q,{transform:`translate(${x+34} ${y+36}) scale(.56)`});if(PAXH[w])khead(hd,palette('day',w),{who:w,view:'front',expr:st[w]==='main'?'worried':'calm'});
  const nm=T(q,x+86,y+30,(SPEAKERS_NAMES[w]||w).toUpperCase(),13,'#111',{'font-family':RCF,'font-weight':700,'letter-spacing':1});fitText(nm,56);
  const tg=G(q,{});const s=st[w];
  if(s==='clear'){R(tg,x+58,y+38,56,22,'#2fb85a',{rx:6});T(tg,x+86,y+54,'CLEAR',13,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':1})}
  else if(s==='sus'){R(tg,x+58,y+38,56,22,'#e0463a',{rx:6});T(tg,x+86,y+54,'SUSPECT',12,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':1})}
  else if(s==='main'){R(q,x-3,y-3,124,74,'none',{rx:6,stroke:'#e0463a','stroke-width':5});R(tg,x+58,y+38,56,22,'#111',{rx:6});T(tg,x+86,y+54,'?',16,'#ffd23a',{'font-family':RCF,'font-weight':700})}
  else {T(tg,x+86,y+54,'?',18,'#8a7a5a',{'font-family':RCF,'font-weight':700})}
  cells.push({q,i,rot:(rnd(i*3)-.5)*5})});
 const ft=BT(m,225,448,p.foot||'COMMENT YOUR GUESS',24,'#fff',{stroke:'#000','stroke-width':5,'letter-spacing':3});
 return (u,t,bt)=>{cells.forEach(o=>{const k=eb(clamp((bt-.1-o.i*.07)/.25));A(o.q,{opacity:clamp((bt-.1-o.i*.07)/.07),transform:`translate(0 ${(1-k)*-40}) rotate(${o.rot*k} ${32+(o.i%3)*132+59} ${122+Math.floor(o.i/3)*74+34})`})});A(ft,{opacity:.7+.3*Math.sin(bt*6)})}};
const SPEAKERS_NAMES={park:'PARK',amara:'AMARA',marcus:'MARCUS',priya:'PRIYA',teddy:'TEDDY',june:'JUNE',vic:'VIC',lena:'LENA',benny:'BENNY',dante:'DANTE',walt:'WALT',rosa:'ROSA'};

/* rear-view mirror close-up: only the eyes show (p.who, p.expr, p.red, p.sweat) */
CARD.mirror=(Z,p)=>{const {f,m}=CARD9(Z,'mirror');R(f,-20,-20,490,840,'#07090e');R(f,-20,-20,490,200,'#0d1118');
 const W=400,H=130,x=25,y=190;R(m,x-10,y-10,W+20,H+20,'#1a1d24',{rx:22,stroke:'#2a2d36','stroke-width':5});
 const cp=uid2('mc');const cl=E('clipPath',{id:cp},m);R(cl,x,y,W,H,'#fff',{rx:14});const sc=G(m,{'clip-path':`url(#${cp})`});R(sc,x,y,W,H,'#18202c');
 for(let i=0;i<6;i++)R(sc,x+20+i*66,y+10,40,90,'#222c3a',{opacity:.6});R(sc,x,y+H-26,W,26,'#10151e');
 const hd=G(sc,{transform:`translate(${x+W/2} ${y+H/2+26}) scale(3.1)`});const P_=palette('night',p.who||'rosa');const h=khead(hd,P_,{who:p.who||'rosa',view:'front',expr:p.expr||'tired',red:p.red||0,sweat:p.sweat||0,pale:p.pale||0});
 R(sc,x,y,W,H,'rgba(80,120,170,.16)');R(sc,x,y,W,H,'url(#gWallShade)');const glint=R(sc,x,y,40,H,'rgba(255,255,255,.12)');
 const tx=BT(m,225,y+H+60,p.label||'',22,'#cfe4ff',{'paint-order':'normal','letter-spacing':4});
 return (u,t,bt)=>{A(sc,{transform:`translate(${Math.sin(t*2.3)*2} ${Math.sin(t*3.7)*1.5})`});A(glint,{x:x+((t*80)%460)-60});const mo=mouth(p.talk||'rosa');h._mouth&&h._mouth(mo)}};
/* siphon diagram: tank (high) -> hose -> can (low); the mouth is crossed out. p.title */
CARD.siphon=(Z,p)=>{const {f,m}=CARD9(Z,'siphon');R(f,-20,-20,490,840,'#0c1218');stripes(f,-20,-20,490,40,'#ffd23a','#111',18);
 BT(m,225,92,p.title||'HOW TO SIPHON',34,'#fff',{stroke:'#000','stroke-width':6,'letter-spacing':3});
 R(m,40,130,200,90,'#3a8ad0',{rx:16,stroke:'#0b0d12','stroke-width':5});T(m,140,184,'TRUCK TANK',20,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':2});
 const fill=R(m,46,176,188,38,'#e8c24a',{rx:10,opacity:.85});
 E('path',{d:'M200,220 C200,290 330,250 330,346',fill:'none',stroke:'#1a1a20','stroke-width':10,'stroke-linecap':'round'},m);E('path',{d:'M200,220 C200,290 330,250 330,346',fill:'none',stroke:'#4a4a56','stroke-width':3,'stroke-linecap':'round'},m);
 const can=G(m,{transform:'translate(330 404)'});R(can,-44,-62,88,62,'#d9302a',{rx:8,stroke:'#0b0d12','stroke-width':4});T(can,0,-24,'CAN',20,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 const drops=[0,1,2,3].map(i=>P(m,'M0,-8 Q-6,2 0,8 Q6,2 0,-8Z','#e8c24a',{stroke:'#8a6a10','stroke-width':1.5}));
 const arr=T(m,110,300,'↓ LOWER',22,'#7ff0e0',{'font-family':MONO,'font-weight':800,'letter-spacing':2});
 const mouth=G(m,{transform:'translate(70 372)'});C(mouth,0,0,34,'#e8c9a0',{stroke:'#0b0d12','stroke-width':4});E('path',{d:'M-16,6 Q0,24 16,6',fill:'none',stroke:'#0b0d12','stroke-width':5},mouth);C(mouth,-10,-8,3,'#0b0d12');C(mouth,10,-8,3,'#0b0d12');
 const x=G(m,{transform:'translate(70 372)'});L(x,-44,-44,44,44,'#e0463a',10);L(x,44,-44,-44,44,'#e0463a',10);
 const nt=BT(m,225,452,'NEVER USE YOUR MOUTH',26,'#ff6a5a',{stroke:'#000','stroke-width':6,'letter-spacing':2});fitText(nt,390);
 return (u,t,bt)=>{const a=slam(bt,.5,.25);A(mouth,{opacity:a.op});A(x,{opacity:slam(bt,1.0,.2).op,transform:`translate(70 372) scale(${lerp(2.2,1,slam(bt,1.0,.2).k)})`});A(nt,{opacity:slam(bt,1.4,.2).op});A(arr,{opacity:.6+.4*Math.sin(bt*6)});
  drops.forEach((d,i)=>{const k=((bt*.9+i/4)%1);const y=lerp(290,340,k);A(d,{transform:`translate(${lerp(318,330,k)} ${y}) scale(1)`,opacity:bt>.3?1-k*.3:0})});A(fill,{width:188*(1-clamp((bt-.4)/4)*.6)})}};
/* bite vs scratch (what Priya looks for): left = two curved rows of punctures, right = parallel lines */
CARD.bitevs=(Z,p)=>{const {f,m}=CARD9(Z,'bitevs');R(f,-20,-20,490,840,'#0a1016');stripes(f,-20,-20,490,40,'#2ec4b6','#0a1016',18);
 BT(m,225,92,'BITE OR SCRATCH?',34,'#7ff0e0',{stroke:'#000','stroke-width':6,'letter-spacing':3});
 const mk=(x,col,lab,bite)=>{const q=G(m);R(q,x,118,196,290,'#141c26',{rx:16,stroke:col,'stroke-width':4});const skin=R(q,x+18,160,160,170,'#e8c4a0',{rx:30});
  if(bite){for(const dy of[-1,1]){const pts=[];for(let i=0;i<7;i++){const a=-Math.PI*.15+i/6*Math.PI*.3+Math.PI/2;const cx=x+98+Math.cos(a)*72*(dy),cy=245+Math.sin(a)*72*(dy)*1.0;pts.push([cx,cy])}pts.forEach(([cx,cy])=>{C(q,cx,cy+dy*0,5,'#b01818');C(q,cx,cy,2.2,'#600808')})}}
  else{for(let i=0;i<3;i++)E('path',{d:`M${x+58+i*40},176 q10,70 -4,140`,fill:'none',stroke:'#c4443a','stroke-width':5,'stroke-linecap':'round'},q)}
  BT(q,x+98,384,lab,30,col,{stroke:'#000','stroke-width':5,'letter-spacing':2});return q};
 const a=mk(24,'#ff6a5a','BITE',true),b=mk(230,'#7dffb0','SCRATCH',false);
 const note=BT(m,225,436,p.note||'TWO CURVED ROWS = TEETH',20,'#cfe4ff',{'paint-order':'normal','letter-spacing':2});fitText(note,390);
 return (u,t,bt)=>{const k1=eb(clamp((bt-.1)/.3)),k2=eb(clamp((bt-1.2)/.3));A(a,{opacity:clamp((bt-.1)/.08),transform:`translate(${(1-k1)*-60} 0)`});A(b,{opacity:clamp((bt-1.2)/.08),transform:`translate(${(1-k2)*60} 0)`})}};

/* same symptoms, different cause (two columns with ticks) */
CARD.lookalike=(Z,p)=>{const {f,m}=CARD9(Z,'lookalike');R(f,-20,-20,490,840,'#0a1016');stripes(f,-20,-20,490,40,'#ffd23a','#111',18);
 BT(m,225,92,p.title||'SAME SYMPTOMS?',34,'#fff',{stroke:'#000','stroke-width':6,'letter-spacing':3});
 const cols=[[26,p.a||'THE BITE','#ff6a5a'],[238,p.b||'LOW SUGAR','#7dffb0']];const tiles=[];
 cols.forEach(([x,lab,col])=>{const q=G(m);R(q,x,114,186,322,'#141c26',{rx:16,stroke:col,'stroke-width':4});BT(q,x+93,152,lab,28,col,{stroke:'#000','stroke-width':5,'letter-spacing':2});tiles.push(q)});
 const rows=p.items||[['SWEATING','sweat'],['SHAKING','shake'],['CONFUSION','confused']];const marks=[];
 rows.forEach(([l,ic],i)=>{const y=172+i*84;cols.forEach(([x,,col],j)=>{const q=G(m);R(q,x+12,y,162,70,'#0e141c',{rx:10});const g=G(q,{transform:`translate(${x+40} ${y+36}) scale(.42)`});(({sweat:()=>P(g,'M0,-30 Q-24,6 -14,22 Q0,34 14,22 Q24,6 0,-30Z','#6ad0ff',{stroke:'#111','stroke-width':3}),shake:()=>{for(const d of[-9,0,9])E('path',{d:`M${d-10},-28 L${d-10},22 Q${d-10},34 ${d},34 Q${d+10},34 ${d+10},22 L${d+10},-28`,fill:'none',stroke:'#f0c9a0','stroke-width':7,'stroke-linecap':'round',opacity:d===0?1:.35},g)},confused:()=>T(g,0,18,'?',64,'#ffd23a',{stroke:'#111','stroke-width':6,'paint-order':'stroke fill','font-family':INTER})})[ic]||(()=>{}))();
   const lt=BT(q,x+112,y+44,l,17,'#fff',{stroke:'#000','stroke-width':4});fitText(lt,100);const ck=E('path',{d:`M${x+140},${y+14} l9,11 l16,-20`,fill:'none',stroke:col,'stroke-width':6,'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':50,'stroke-dashoffset':50},q);marks.push({ck,i,j})})});
 const foot=BT(m,225,462,p.foot||'SAME SYMPTOMS. DIFFERENT CAUSE.',22,'#ffd23a',{stroke:'#000','stroke-width':5,'letter-spacing':2});fitText(foot,396);
 return (u,t,bt)=>{marks.forEach(o=>{const at=.5+o.i*.55+o.j*.22;A(o.ck,{'stroke-dashoffset':50*(1-clamp((bt-at)/.25))})});A(foot,{opacity:clamp((bt-2.4)/.2)})}};

/* the forearm: bandage off, black veins creeping toward the elbow.  p.time (e.g. '7:50 PM'), p.left ('9 H 58 M') */
CARD.arm=(Z,p)=>{const {f,m}=CARD9(Z,'arm');R(f,-20,-20,490,840,'#0a0c12');R(f,-20,-20,490,840,'url(#gWallShade)');
 const arm=G(m);R(arm,86,190,300,104,'#c98e62',{rx:50,stroke:'#241810','stroke-width':6});R(arm,96,198,280,30,'#dca878',{rx:15,opacity:.5});
 // fist at the left, uniform sleeve at the right
 const fist=G(m);R(fist,20,196,86,92,'#c98e62',{rx:30,stroke:'#241810','stroke-width':6});for(let i=0;i<4;i++)L(fist,36+i*17,206,36+i*17,236,'#241810',3.4);R(arm,372,184,78,116,'#2f6fa8',{rx:10,stroke:'#241810','stroke-width':6});R(arm,372,184,22,116,'#1f4f7e');
 const wound=G(m,{transform:'translate(200 242)'});for(const dy of[-1,1])for(let i=0;i<6;i++){const a=(-.5+i/5)*1.0;C(wound,Math.sin(a)*30+0,dy*(16+Math.cos(a)*10),4,'#a8231c');C(wound,Math.sin(a)*30,dy*(16+Math.cos(a)*10),1.8,'#4a0808')}
 const veins=[];for(let k=0;k<7;k++){const y0=246+(k-3)*13;const d=`M200,${242+(k-3)*6} C${230+k*6},${y0-26+k*3} ${270+k*8},${y0+22-k*4} ${320+k*8},${y0+(k%2?-10:10)} S${360+k*3},${y0} 372,${y0+(k-3)*3}`;
  const e=E('path',{d,fill:'none',stroke:'#241035','stroke-width':3.6-Math.abs(k-3)*.3,'stroke-linecap':'round','stroke-dasharray':400,'stroke-dashoffset':400,opacity:.95},m);veins.push(e)}
 const glove=G(m,{transform:'translate(70 380) rotate(-20)'});P(glove,'M0,0 q-10,-30 14,-40 q30,-6 40,24 q4,24 -16,30 Z','#2b2d34',{stroke:'#0b0d12','stroke-width':4});for(let i=0;i<4;i++)R(glove,10+i*10,-60+i*2,8,28,'#2b2d34',{rx:4,stroke:'#0b0d12','stroke-width':3});
 const bd=G(m);P(bd,'M140,192 q60,-6 120,0 l0,100 q-60,6 -120,0Z','#f2e6c8',{stroke:'#241810','stroke-width':4});for(let i=0;i<5;i++)L(bd,160+i*20,192,160+i*20,292,'#d8c8a0',3);C(bd,200,242,10,'#a8231c',{opacity:.8})
 const t1=BT(m,225,130,p.time||'7:50 PM',60,'#ffd23a',{stroke:'#000','stroke-width':8,'font-family':MONO,'letter-spacing':4});const t2=BT(m,225,170,'THE GARAGE',28,'#fff',{stroke:'#000','stroke-width':6,'letter-spacing':4});
 const cl=BT(m,225,352,p.left||'10 HOURS',40,'#ff6a5a',{stroke:'#000','stroke-width':7,'font-family':MONO,'letter-spacing':3});const cl2=BT(m,225,388,p.sub||'NOW: 4:47 AM · 1 HOUR LEFT',20,'#cfe4ff',{'paint-order':'normal','letter-spacing':2});fitText(cl2,390);
 return (u,t,bt)=>{const peel=ease(clamp((bt-.3)/.9));A(bd,{transform:`translate(${-peel*210} ${peel*-30}) rotate(${-peel*40} 200 242)`,opacity:1-clamp((peel-.7)/.3)});veins.forEach((e,i)=>A(e,{'stroke-dashoffset':400*(1-clamp((bt-1.0-i*.08)/1.6))}));
  A(glove,{transform:`translate(70 ${380+Math.sin(bt*2)*3}) rotate(-20)`});A(t1,{opacity:slam(bt,.1,.25).op});A(t2,{opacity:slam(bt,.3,.25).op});A(cl,{opacity:slam(bt,1.8,.25).op,transform:`translate(225 352) scale(${lerp(1.5,1,slam(bt,1.8,.25).k)}) translate(-225 -352)`});A(cl2,{opacity:slam(bt,2.2,.2).op})}};
/* finale card: THE END */
CARD.finale=(Z,p)=>{const {f,m}=CARD9(Z,'finale');R(f,-20,-20,490,840,'#0a0c12');R(f,-20,-20,490,420,'url(#gSkyDawn)');for(let i=0;i<30;i++)R(f,rnd(i)*450,rnd(i+9)*200,3,3,'#fff',{opacity:.3+rnd(i+3)*.5});
 R(f,-20,330,490,200,'#1e3a52');const bus=G(m);busExt(bus,{lights:true,empty:true});A(bus,{transform:'translate(225 400) scale(.46)'});
 const t=BT(m,225,130,'THE END',76,'#fff',{stroke:'#000','stroke-width':11,'letter-spacing':4});const s=BT(m,225,176,'THE LAST BUS · PART 10 / 10',20,'#ffd23a',{'paint-order':'normal','letter-spacing':3});fitText(s,390);
 const fol=G(m);R(fol,95,412,260,40,'#e0463a',{rx:20});BT(fol,225,441,'FOLLOW FOR THE NEXT SERIES',17,'#fff',{'paint-order':'normal','letter-spacing':2});
 return (u,t_,bt)=>{A(t,{opacity:slam(bt,0,.4).op,transform:`translate(225 112) scale(${lerp(1.6,1,slam(bt,0,.4).k)}) translate(-225 -112)`});A(bus,{transform:`translate(${225+Math.sin(bt*3)*1} ${400+Math.sin(bt*14)*.6}) scale(.46)`});A(fol,{transform:`translate(225 432) scale(${1+.04*Math.sin(bt*5)}) translate(-225 -432)`})}};
