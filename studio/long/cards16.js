/* ===== cards16: full-screen cards (title, level, A/B, rule, stat, sponsor, loading, inventory, scale, score, end, text) ===== */
const RCF='RC, Roboto Condensed, Inter, sans-serif',MONO='JetBrains Mono, DejaVu Sans Mono, monospace';
const BT=(g,x,y,s,size,fill,o)=>T(g,x,y,s,size,fill,Object.assign({'font-family':RCF,'font-weight':700,'stroke-linejoin':'round','paint-order':'stroke fill'},o||{}));
const fitText=(el,maxW)=>{const bb=el.getBBox();if(bb.width>maxW){const k=maxW/bb.width;const cx=el.getAttribute('text-anchor')==='start'?bb.x:bb.x+bb.width/2,cy=bb.y+bb.height/2;el.setAttribute('transform',`translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`);el._fit=k}return el};
const slam=(bt,t0,dur)=>{const k=eb(clamp((bt-(t0||0))/(dur||.3)));return {k,op:clamp((bt-(t0||0))/.08)}};
const stripes=(g,x,y,w,h,c1,c2,sz)=>{R(g,x,y,w,h,c1);const cp=uid2('cp');const cl=E('clipPath',{id:cp},g);R(cl,x,y,w,h,'#fff');const q=G(g,{'clip-path':`url(#${cp})`});for(let i=-h;i<w+h;i+=sz*2)P(q,`M${x+i},${y+h} l${sz},0 l${h},${-h} l${-sz},0Z`,c2);return q};

/* ---------- icons (centred on 0,0, about 150 px) ---------- */
const ICON={
 elevator:(g,c)=>{R(g,-52,-70,104,140,'#cfd6de',{rx:6,stroke:'#0b0d12','stroke-width':5});R(g,-46,-64,45,128,'#9aa4b0');R(g,1,-64,45,128,'#b6bec8');P(g,'M62,-30 l12,-18 l12,18Z','#ffd23a');P(g,'M62,10 l12,18 l12,-18Z','#ffd23a')},
 stairs:(g,c)=>{P(g,'M-70,64 L-70,34 L-36,34 L-36,4 L-2,4 L-2,-26 L32,-26 L32,-56 L68,-56 L68,64Z','#cfd6de',{stroke:'#0b0d12','stroke-width':5,'stroke-linejoin':'round'});P(g,'M-60,-20 L-20,-60 L-20,-40 L10,-40 L10,-70',null,{fill:'none',stroke:'#ffd23a','stroke-width':0})},
 sprint:(g,c)=>{C(g,10,-56,15,'#ffd23a',{stroke:'#0b0d12','stroke-width':4});L(g,6,-40,-10,6,'#ffd23a',11);L(g,-10,6,24,34,'#ffd23a',11);L(g,24,34,8,64,'#ffd23a',11);L(g,-10,6,-40,30,'#ffd23a',11);L(g,-40,30,-62,12,'#ffd23a',11);L(g,6,-30,40,-14,'#ffd23a',10);L(g,6,-30,-24,-44,'#ffd23a',10);for(let i=0;i<3;i++)L(g,-86,-40+i*22,-60,-40+i*22,'#fff',5,{opacity:.7})},
 walk:(g,c)=>{C(g,0,-56,15,'#7dffb0',{stroke:'#0b0d12','stroke-width':4});L(g,0,-40,0,12,'#7dffb0',11);L(g,0,12,14,64,'#7dffb0',11);L(g,0,12,-14,64,'#7dffb0',11);L(g,0,-30,22,-4,'#7dffb0',10);L(g,0,-30,-22,-4,'#7dffb0',10);for(const x of[-50,50])E('ellipse',{cx:x,cy:66,rx:14,ry:6,fill:'#fff',opacity:.5},g)},
 closet:(g,c)=>{R(g,-56,-72,112,144,'#9a6a3c',{rx:6,stroke:'#0b0d12','stroke-width':5});L(g,0,-72,0,72,'#0b0d12',4);C(g,-10,0,4,'#ffd23a');C(g,10,0,4,'#ffd23a');R(g,-46,-62,38,60,'#b07a46');R(g,8,-62,38,60,'#b07a46')},
 doors:(g,c)=>{for(const x of[-46,46]){R(g,x-34,-70,68,140,'#9a6a3c',{rx:5,stroke:'#0b0d12','stroke-width':5});C(g,x+(x<0?18:-18),6,5,'#ffd23a')}P(g,'M-26,-90 h-20 l10,-14Z','#7dffb0');P(g,'M26,-90 h20 l-10,-14Z','#7dffb0')},
 bat:(g,c)=>{g.appendChild(G(g,{}));const q=G(g,{transform:'rotate(40)'});blob(q,'M-9,60 L9,60 L14,-52 Q14,-72 0,-72 Q-14,-72 -14,-52Z','#c99a5a','#0b0d12');R(q,-9,56,18,22,'#0b0d12',{rx:5})},
 doorclose:(g,c)=>{R(g,-46,-74,92,148,'#9a6a3c',{rx:6,stroke:'#0b0d12','stroke-width':5});R(g,-30,-4,60,46,'#ffd23a',{rx:6,stroke:'#0b0d12','stroke-width':4});E('path',{d:'M-16,-4 L-16,-26 Q0,-44 16,-26 L16,-4',fill:'none',stroke:'#0b0d12','stroke-width':6},g);C(g,0,18,6,'#0b0d12')},
 loot:(g,c)=>{blob(g,'M-62,70 Q-86,-20 -44,-62 Q0,-100 44,-62 Q86,-20 62,70Z','#b45a2a','#0b0d12');for(const [x,y,k] of[[-30,-20,0],[16,-34,1],[34,6,2],[-6,20,3],[-40,34,4],[10,-4,5]])R(g,x-14,y-14,28,28,['#e04a4a','#4a8ae0','#ffd23a','#3ac06a','#a84ae0','#e08a2a'][k],{rx:5,stroke:'#0b0d12','stroke-width':3});T(g,0,94,'99+',30,'#ff5a4a',{stroke:'#0b0d12','stroke-width':5,'paint-order':'stroke fill'})},
 bag:(g,c)=>{blob(g,'M-36,68 Q-44,-10 -20,-40 Q0,-52 20,-40 Q44,-10 36,68Z','#b45a2a','#0b0d12');R(g,-20,-4,40,34,'#8a3e1a',{rx:6,stroke:'#0b0d12','stroke-width':3});R(g,-10,-56,20,14,'#0b0d12',{rx:5});T(g,0,94,'10 KG',28,'#7dffb0',{stroke:'#0b0d12','stroke-width':5,'paint-order':'stroke fill'})},
 bed:(g,c)=>{R(g,-70,0,140,36,'#8a8aa0',{rx:6,stroke:'#0b0d12','stroke-width':4});R(g,-70,-30,34,34,'#e8e8f0',{rx:8,stroke:'#0b0d12','stroke-width':4});T(g,30,-30,'Z',40,'#9ff2ff',{stroke:'#0b0d12','stroke-width':5,'paint-order':'stroke fill'});T(g,58,-56,'Z',30,'#9ff2ff',{stroke:'#0b0d12','stroke-width':4,'paint-order':'stroke fill'})},
 cans:(g,c)=>{L(g,-70,-30,70,-30,'#c9a86a',3);for(const x of[-50,-16,18,52])R(g,x-12,-28,24,34,'#c9d1d8',{rx:4,stroke:'#0b0d12','stroke-width':3});T(g,0,66,'ALARM',26,'#ffd23a',{stroke:'#0b0d12','stroke-width':5,'paint-order':'stroke fill'})},
 jam:(g,c)=>{for(const [x,y,k] of[[-44,-20,'#e04a4a'],[44,-20,'#4a8ae0'],[-44,36,'#ffd23a'],[44,36,'#3ac06a']]){R(g,x-34,y-16,68,32,k,{rx:8,stroke:'#0b0d12','stroke-width':4});C(g,x-18,y+18,8,'#0b0d12');C(g,x+18,y+18,8,'#0b0d12')}},
 rail:(g,c)=>{L(g,-34,70,-8,-70,'#cfd6de',8);L(g,34,70,8,-70,'#cfd6de',8);for(let i=0;i<5;i++){const y=60-i*28;L(g,-34+i*5.4-8,y,34-i*5.4+8,y,'#9a6a3c',6)}C(g,56,-54,14,'#ff2a2a');},
 heli:(g,c)=>{R(g,-56,-18,100,40,'#cfd6de',{rx:18,stroke:'#0b0d12','stroke-width':4});L(g,40,-6,90,-14,'#cfd6de',8);L(g,-80,-34,70,-34,'#0b0d12',6);L(g,-4,-34,-4,-18,'#0b0d12',5);R(g,-46,-10,34,22,'#9ec9e0',{rx:6});L(g,-30,36,30,36,'#0b0d12',5)},
 boat:(g,c)=>{P(g,'M-70,10 L70,10 L50,46 L-50,46Z','#f1ece0',{stroke:'#0b0d12','stroke-width':4,'stroke-linejoin':'round'});R(g,-20,-30,50,40,'#e8e4da',{rx:4,stroke:'#0b0d12','stroke-width':4});L(g,46,10,46,-50,'#0b0d12',4);P(g,'M46,-50 L76,6 L46,6Z','#fff',{stroke:'#0b0d12','stroke-width':3});for(let i=0;i<3;i++)L(g,-80+i*60,62,-50+i*60,62,'#6ad0ff',5,{opacity:.7})},
 skull:(g,c)=>skullIcon(g,0,0,4.2,c||'#fff'),
 check:(g,c)=>{C(g,0,0,60,'#2fb85a',{stroke:'#0b0d12','stroke-width':5});E('path',{d:'M-30,2 L-8,26 L32,-22',fill:'none',stroke:'#fff','stroke-width':14,'stroke-linecap':'round','stroke-linejoin':'round'},g)},
 cross:(g,c)=>{C(g,0,0,60,'#e0463a',{stroke:'#0b0d12','stroke-width':5});L(g,-26,-26,26,26,'#fff',14);L(g,26,-26,-26,26,'#fff',14)},
 ear:(g,c)=>{E('path',{d:'M-20,50 Q-60,40 -56,-10 Q-52,-60 0,-62 Q54,-60 52,-12 Q50,16 20,30 Q8,40 12,56',fill:'#e8c9a0',stroke:'#0b0d12','stroke-width':5},g);E('path',{d:'M-12,-30 Q8,-44 22,-22 Q28,-2 6,6',fill:'none',stroke:'#0b0d12','stroke-width':5,'stroke-linecap':'round'},g)},
 water:(g,c)=>{P(g,'M0,-70 Q-52,0 -40,34 Q-26,66 0,66 Q26,66 40,34 Q52,0 0,-70Z','#6ad0ff',{stroke:'#0b0d12','stroke-width':5});P(g,'M-14,10 Q-12,38 8,44',null,{fill:'none',stroke:'#fff','stroke-width':0});},
 food:(g,c)=>{R(g,-34,-48,68,96,'#c9d1d8',{rx:10,stroke:'#0b0d12','stroke-width':5});R(g,-34,-20,68,34,'#d9302a');T(g,0,6,'FOOD',20,'#fff',{'font-family':RCF})},
 aid:(g,c)=>{R(g,-56,-40,112,80,'#f4f4f6',{rx:12,stroke:'#0b0d12','stroke-width':5});R(g,-8,-30,16,60,'#e0463a');R(g,-30,-8,60,16,'#e0463a');R(g,-14,-52,28,14,'#0b0d12',{rx:5})},
 battery:(g,c)=>{R(g,-44,-30,88,60,'#3a3f48',{rx:10,stroke:'#0b0d12','stroke-width':5});R(g,44,-14,12,28,'#3a3f48',{rx:3});R(g,-36,-22,50,44,'#7dffb0',{rx:5});P(g,'M6,-30 L-10,4 L2,4 L-6,30 L22,-6 L8,-6Z','#ffd23a',{stroke:'#0b0d12','stroke-width':3,'stroke-linejoin':'round'})},
 lamp:(g,c)=>{C(g,0,-8,40,'#ffd23a',{stroke:'#0b0d12','stroke-width':5});R(g,-18,28,36,22,'#9aa0aa',{rx:4,stroke:'#0b0d12','stroke-width':4});for(let a=-60;a<=60;a+=30)L(g,Math.sin(a*Math.PI/180)*52,-8-Math.cos(a*Math.PI/180)*52,Math.sin(a*Math.PI/180)*74,-8-Math.cos(a*Math.PI/180)*74,'#ffd23a',6)}
};
function icon(g,k,x,y,s,col){const q=G(g,{transform:`translate(${x} ${y}) scale(${s||1})`});if(ICON[k])ICON[k](q,col);return q}

const CARD={};
LIB.card=(Z,p)=>CARD[p.kind||'text'](Z,p);

/* ---------- title card ---------- */
CARD.title=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-100,-100,1480,900,'#0a0b10');
 // left = game world, right = real life
 const lg=P(f,'M-100,-100 L760,-100 L600,820 L-100,820Z','#3a4aa8');
 for(let y=0;y<760;y+=24)for(let x=-80;x<760;x+=24)if(((x+y)/24)%2===0)R(f,x,y,24,24,'#4658c4',{opacity:.5});
 const rg=P(f,'M760,-100 L1380,-100 L1380,820 L600,820Z','#15161c');
 R(f,700,0,600,720,'url(#gRed)',{opacity:.4});
 const dz=horde(f,{n:6,x0:820,x1:1240,y:640,s:1.5,seed:12,jit:40,col:'#05040a'});
 P(f,'M760,-100 L600,820',null,{});E('path',{d:'M760,-100 L600,820',stroke:'#ffd23a','stroke-width':10,fill:'none'},f);
 const tl=G(m);
 const dex=actor(m,{k:'dex',view:'front',pose:'hips',expr:'cool',x:170,y:790,s:1.25,bob:2});
 const st=actor(m,{k:'steve',view:'front',pose:'zombie',x:1110,y:790,s:1.25,bob:3,ph:1});
 const l1=BT(tl,640,214,'HOW TO SURVIVE',150,'#fff',{stroke:'#000','stroke-width':22}),l2=BT(tl,640,318,'A ZOMBIE APOCALYPSE',84,'#ff3a2a',{stroke:'#000','stroke-width':16,'letter-spacing':3});
 const bd=G(tl);R(bd,430,372,420,72,'#ffd23a',{rx:36,stroke:'#000','stroke-width':6});BT(bd,640,426,'GAME  vs  REAL LIFE',44,'#111',{'letter-spacing':3,'paint-order':'normal'});
 const vs=G(tl);C(vs,640,396,0,'#e0463a');
 return (u,t,bt)=>{const a=slam(bt,0,.35),b=slam(bt,.25,.3);A(l1,{opacity:a.op,transform:`translate(640 200) scale(${lerp(2.3,1,a.k)}) translate(-640 -200)`});A(l2,{opacity:slam(bt,.2,.3).op,transform:`translate(640 300) scale(${lerp(2,1,slam(bt,.2,.3).k)}) translate(-640 -300)`});
  A(bd,{opacity:b.op,transform:`translate(640 396) scale(${lerp(.4,1,b.k)}) translate(-640 -396)`});dex.upd(u,t,bt);st.upd(u,t,bt);dz.upd(u,t,bt);
  A(tl,{transform:`translate(${bt<.45?Math.sin(bt*90)*5*(1-bt/.45):0} 0)`})}};

/* ---------- level card with the route to Maya ---------- */
CARD.level=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);R(f,-100,-100,1480,900,'#0b0d16');
 stripes(f,-100,-100,1480,100,'#ffd23a','#111',34);stripes(f,-100,700,1480,40,'#ffd23a','#111',20);
 R(f,0,20,1280,0,'#000');
 R(f,-100,60,1480,500,'#0b0d16');R(f,-100,60,1480,500,'url(#gWallShade)');
 // pixel stars
 for(let i=0;i<70;i++)R(f,rnd(i)*1280,70+rnd(i+9)*480,3,3,'#fff',{opacity:.2+rnd(i+3)*.5});
 const lv=BT(m,640,225,'LEVEL '+p.lv,160,'#ffd23a',{stroke:'#000','stroke-width':20,'letter-spacing':4});
 const nm=fitText(BT(m,640,350,p.name,88,'#fff',{stroke:'#000','stroke-width':14,'letter-spacing':3}),1000);
 const day=G(m);R(day,540,372,200,46,'#e0463a',{rx:23,stroke:'#000','stroke-width':4});BT(day,640,406,'DAY '+p.lv,34,'#fff',{'letter-spacing':4,'paint-order':'normal'});
 // route
 const rt=G(m);const x0=170,x1=1110,y=516;L(rt,x0,y,x1,y,'#3a3f66',14);const pr=L(rt,x0,y,x0,y,'#7dffb0',14);
 for(let i=0;i<=8;i++)C(rt,lerp(x0,x1,i/8),y,i===8?0:7,i<p.lv?'#7dffb0':'#555a86');
 icon(rt,'boat',x1+36,y-34,.62);const km=T(rt,640,y+56,'',30,'#9ff2ff',{'font-family':MONO,'font-weight':800,'letter-spacing':2});
 const hd=G(rt);const dexh=actor(hd,{k:'dex',view:'front',pose:'stand',expr:'cool',x:0,y:0,s:.29,noShadow:true,bob:0});
 const pa=(p.lv-1)/8,pb=p.lv/8;
 return (u,t,bt)=>{const a=slam(bt,0,.3);A(lv,{opacity:a.op,transform:`translate(640 190) scale(${lerp(2.2,1,a.k)}) translate(-640 -190)`});A(nm,{opacity:slam(bt,.18,.25).op,transform:`translate(0 ${(1-slam(bt,.18,.25).k)*40})`});A(day,{opacity:slam(bt,.3,.2).op});
  const k=ease(clamp((bt-.5)/1.1)),pg=lerp(pa,pb,k),px=lerp(x0,x1,pg);A(pr,{x2:px});A(hd,{transform:`translate(${px} ${y-12})`});dexh.upd(u,t,bt);
  km.textContent=`${Math.round(lerp(80*(1-pa),80*(1-pb),k))} KM TO PIER 8 · MAYA`}};

/* ---------- A / B choice ---------- */
CARD.ab=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');R(f,-100,-100,1480,900,'url(#gWallShade)');
 const mk=(side,o,x,col,tag,gm)=>{const q=G(m);const w=560,y0=100,h=470;
  const bg=R(q,x,y0,w,h,gm?'#16205a':'#1b1b20',{rx:22,stroke:col,'stroke-width':8});
  if(gm){for(let yy=y0+12;yy<y0+h;yy+=24)L(q,x+10,yy,x+w-10,yy,'#2a3a8a',2)}
  R(q,x+24,y0+20,86,86,col,{rx:14});BT(q,x+67,y0+88,side,80,'#111',{'paint-order':'normal'});
  const ch=G(q);R(ch,x+w-232,y0+26,208,42,gm?'#7dffb0':'#e0463a',{rx:21});T(ch,x+w-128,y0+55,tag,19,gm?'#06220f':'#fff',{'font-family':MONO,'font-weight':800,'letter-spacing':1});
  icon(q,o.icon,x+w/2,y0+h/2-14,1.7);fitText(BT(q,x+w/2,y0+h-34,o.t,64,'#fff',{stroke:'#000','stroke-width':10}),w-60);
  let rs=null;if(o.res){rs=icon(q,o.res,x+w-70,y0+h/2-14,1.0);A(rs,{opacity:0})}
  return {q,bg,rs}};
 const A_=mk('A',p.a,70,'#ffd23a','GAME BRAIN',true),B_=mk('B',p.b,650,'#7dffb0','REAL LIFE',false);
 const vs=G(m);C(vs,640,335,44,'#e0463a',{stroke:'#fff','stroke-width':5});BT(vs,640,352,'VS',46,'#fff',{'paint-order':'normal'});
 const top=BT(m,640,76,'PICK ONE',44,'#fff',{stroke:'#000','stroke-width':8,'letter-spacing':6});
 const cd=T(m,640,340,'',0,'#fff');
 const mark=G(m);
 return (u,t,bt)=>{const a=slam(bt,0,.3),b=slam(bt,.15,.3);A(A_.q,{transform:`translate(${(1-a.k)*-600} 0)`,opacity:a.op});A(B_.q,{transform:`translate(${(1-b.k)*600} 0)`,opacity:b.op});A(vs,{opacity:slam(bt,.3,.2).op,transform:`translate(640 335) scale(${slam(bt,.3,.3).k}) translate(-640 -335)`});
  if(p.pick){for(const z of[A_,B_])if(z.rs)A(z.rs,{opacity:clamp((bt-.6)/.15),transform:z.rs.getAttribute('transform')+` scale(${eb(clamp((bt-.6)/.25))})`});const w=p.pick==='a'?A_:B_,l=p.pick==='a'?B_:A_;A(l.q,{opacity:.32});A(w.q,{transform:`translate(0 ${-6*Math.sin(bt*6)})`})}
  if(p.timer){const k=Math.max(0,3-Math.floor(bt*1.1));A(top,{opacity:1})}}};

/* ---------- rule card ---------- */
CARD.rule=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);stripes(f,-100,-100,1480,900,'#f4ecd2','#efe4c0',40);R(f,-100,-100,1480,900,'rgba(0,0,0,.06)');
 stripes(f,-100,-100,1480,64,'#ffd23a','#111',32);stripes(f,-100,704,1480,40,'#ffd23a','#111',20);
 const c=G(m);R(c,110,150,1060,380,'#fffdf4',{rx:20,stroke:'#111','stroke-width':8});
 R(c,110,150,320,76,'#d9302a',{rx:20});BT(c,270,206,'RULE #'+p.n,56,'#fff',{'paint-order':'normal','letter-spacing':3});
 if(p.icon)icon(c,p.icon,1030,350,1.5);
 const maxW=p.icon?690:960;const cx0=p.icon?540:640;fitText(BT(c,cx0,330,p.t1,104,'#111',{'paint-order':'normal'}),maxW);fitText(BT(c,cx0,450,p.t2,104,'#d9302a',{'paint-order':'normal'}),maxW);
 const st=G(m);C(st,0,0,0,'none');
 return (u,t,bt)=>{const a=slam(bt,0,.28);A(c,{opacity:a.op,transform:`translate(640 340) scale(${lerp(1.55,1,a.k)}) rotate(${lerp(-5,0,a.k)}) translate(-640 -340)`})}};

/* ---------- stat compare ---------- */
CARD.stat=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');R(f,-100,-100,1480,900,'url(#gWallShade)');
 BT(m,640,100,p.title,70,'#fff',{stroke:'#000','stroke-width':10,'letter-spacing':5});
 const mx=Math.max(p.a.v,p.b.v),bars=[];
 [[p.a,'#ffd23a',210],[p.b,'#7dffb0',390]].forEach(([r,col,y])=>{const q=G(m);BT(q,110,y-18,r.l,48,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':8});R(q,110,y,1000,76,'#1c2038',{rx:14});const bar=R(q,110,y,10,76,col,{rx:14});const num=BT(q,1170,y+62,'0',74,col,{'text-anchor':'end',stroke:'#000','stroke-width':10});
  if(r.sub)BT(q,130,y+53,r.sub,34,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':7});bars.push({bar,num,r,q})});
 return (u,t,bt)=>{bars.forEach((b,i)=>{const k=ease(clamp((bt-.15-i*.35)/.8));A(b.bar,{width:Math.max(10,1000*(b.r.v/mx)*k)});b.num.textContent=(b.r.pre||'')+Math.round(b.r.v*k)+(b.r.suf||'')})}};

/* ---------- sponsor (fake ad) ---------- */
CARD.sponsor=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#f4f6fb');for(let i=0;i<30;i++)C(f,rnd(i)*1280,rnd(i+9)*720,8+rnd(i+4)*40,'#dfe6f5',{opacity:.7});
 R(f,0,0,1280,92,'#0b1a3a');T(f,640,62,'SPONSORED',38,'#9fd0ff',{'font-family':RCF,'letter-spacing':14,'font-weight':700});
 const sh=G(m);P(sh,'M0,-120 L96,-84 L96,12 Q96,86 0,128 Q-96,86 -96,12 L-96,-84Z','#2a6ad0',{stroke:'#0b1a3a','stroke-width':8,'stroke-linejoin':'round'});P(sh,'M0,-96 L74,-68 L74,12 Q74,70 0,102 Z','#3d86f0');E('path',{d:'M-36,6 L-8,36 L40,-24',fill:'none',stroke:'#fff','stroke-width':20,'stroke-linecap':'round','stroke-linejoin':'round'},sh);
 const lg=BT(m,640,420,'NOT DYING™',150,'#0b1a3a',{'paint-order':'normal','letter-spacing':2});BT(m,640,500,'NOW WITH FEWER BITES',48,'#2a6ad0',{'paint-order':'normal','letter-spacing':6});
 T(m,640,560,'*Not a real product. Please don\'t ask.',24,'#6a7a9a',{'font-weight':600});
 return (u,t,bt)=>{A(sh,{transform:`translate(640 ${210+Math.sin(bt*3)*5}) scale(${.9+.1*eb(clamp(bt/.4))})`,opacity:clamp(bt*5)});A(lg,{opacity:slam(bt,.3,.2).op})}};

/* ---------- loading ---------- */
CARD.loading=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0a0c2a');for(let i=0;i<90;i++)R(f,rnd(i)*1280,rnd(i+9)*700,4,4,'#fff',{opacity:.15+rnd(i+3)*.6});
 const zi=G(m);zomb(zi,0,0,2.4,3,'#2a7a3a','#ffe14a');A(zi,{transform:'translate(1100 640)'});
 BT(m,640,220,'LOADING LEVEL '+p.lv+'...',92,'#7dffb0',{stroke:'#02170c','stroke-width':12,'font-family':MONO,'font-weight':800,'letter-spacing':2});
 R(m,160,290,960,46,'#101a44',{rx:8,stroke:'#7dffb0','stroke-width':5});const bar=R(m,168,298,0,30,'#7dffb0',{rx:4});
 const tip=T(m,640,420,'',34,'#fff',{'font-family':MONO,'font-weight':700});BT(m,640,380,'TIP:',34,'#ffe066',{'font-family':MONO,'paint-order':'normal'});
 return (u,t,bt)=>{const k=ease(clamp(bt/Math.max(.8,(p.fill||1.6))));A(bar,{width:944*k});const full=p.tip||'';tip.textContent=full.slice(0,Math.floor(clamp((bt-.15)/1.0)*full.length))}};

/* ---------- inventory (game) ---------- */
CARD.inventory=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#10143a');R(m,90,40,1100,490,'#1a2260',{rx:18,stroke:'#7dffb0','stroke-width':6});
 BT(m,640,100,'INVENTORY',54,'#7dffb0',{'font-family':MONO,'font-weight':800,'letter-spacing':4});
 const slots=[];const cols=['#e04a4a','#4a8ae0','#ffd23a','#3ac06a','#a84ae0','#e08a2a','#9aa6c0'];
 for(let r=0;r<5;r++)for(let c=0;c<12;c++){const x=130+c*86,y=130+r*78;R(m,x,y,72,68,'#0c1240',{rx:6,stroke:'#3a4aa8','stroke-width':3});const it=R(m,x+8,y+8,56,52,cols[(r*7+c*3)%7],{rx:6,opacity:0,stroke:'#0b0d12','stroke-width':3});slots.push(it)}
 const cnt=BT(m,1130,100,'0/99',42,'#ffe066',{'font-family':MONO,'text-anchor':'end','paint-order':'normal'});const w=BT(m,640,574,'WEIGHT: ∞ KG',38,'#7dffb0',{'font-family':MONO,'paint-order':'normal'});
 return (u,t,bt)=>{const n=Math.floor(clamp(bt/(p.fill||2.6))*60);slots.forEach((s,i)=>A(s,{opacity:i<n?1:0}));cnt.textContent=Math.min(99,Math.round(n*99/60))+'/99'}};

/* ---------- real weight gauge ---------- */
CARD.scale=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#14161c');R(f,-100,-100,1480,900,'url(#gWallShade)');
 const cx=640,cy=436,r=240;
 const arc=(a0,a1,col,w)=>E('path',{d:`M${cx+Math.cos(a0)*r},${cy+Math.sin(a0)*r} A${r},${r} 0 0 1 ${cx+Math.cos(a1)*r},${cy+Math.sin(a1)*r}`,fill:'none',stroke:col,'stroke-width':w||34,'stroke-linecap':'butt'},m);
 arc(Math.PI,Math.PI*1.34,'#3ac06a');arc(Math.PI*1.34,Math.PI*1.6,'#ffd23a');arc(Math.PI*1.6,Math.PI*2,'#e0463a');
 for(let i=0;i<=6;i++){const a=Math.PI+i/6*Math.PI;L(m,cx+Math.cos(a)*(r-28),cy+Math.sin(a)*(r-28),cx+Math.cos(a)*(r-50),cy+Math.sin(a)*(r-50),'#fff',5);T(m,cx+Math.cos(a)*(r-78),cy+Math.sin(a)*(r-78)+10,String(i*5),30,'#fff',{'font-family':RCF})}
 const nd=L(m,cx,cy,cx-r+60,cy,'#fff',10);C(m,cx,cy,18,'#fff');
 const rd=BT(m,640,530,'0 KG',100,'#7dffb0',{stroke:'#000','stroke-width':14});const lm=BT(m,640,88,p.title||'REAL LIFE: BACKPACK',48,'#fff',{stroke:'#000','stroke-width':8,'letter-spacing':3});
 const w=BT(m,640,146,'LIMIT: 10 KG',40,'#ffd23a',{stroke:'#000','stroke-width':7});const bag=icon(m,'loot',1090,360,.9);
 return (u,t,bt)=>{const k=ease(clamp(bt/(p.fill||2.2))),kg=lerp(p.from||0,p.to||24,k);const a=Math.PI+(clamp(kg,0,30)/30)*Math.PI;A(nd,{x2:cx+Math.cos(a)*(r-60),y2:cy+Math.sin(a)*(r-60)});rd.textContent=Math.round(kg)+' KG';A(rd,{fill:kg>10?'#ff5a4a':'#7dffb0'})}};

/* ---------- final scoreboard ---------- */
CARD.score=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');P(f,'M-100,-100 L640,-100 L640,820 L-100,820Z','#16205a');P(f,'M640,-100 L1380,-100 L1380,820 L640,820Z','#1c1c22');
 BT(m,640,92,'FINAL SCORE',64,'#fff',{stroke:'#000','stroke-width':10,'letter-spacing':6});
 const L1=G(m),R1=G(m);BT(L1,320,190,'GAME',48,'#7dffb0',{'font-family':MONO,'font-weight':800});skullIcon(L1,320,330,4.6,'#fff');const n1=BT(L1,320,520,'0',170,'#ffe066',{stroke:'#000','stroke-width':14});
 BT(R1,960,190,'REAL LIFE',48,'#ff6a5a',{'letter-spacing':4});icon(R1,'check',960,320,1.3);const n2=BT(R1,960,520,'0',170,'#7dffb0',{stroke:'#000','stroke-width':14});BT(m,320,572,'DEATHS',38,'#9fd0ff',{'letter-spacing':6});BT(m,960,572,'DEATHS',38,'#9fd0ff',{'letter-spacing':6});
 return (u,t,bt)=>{const k=clamp((bt-.3)/1.2);n1.textContent=String(Math.round((p.game||8)*k));n2.textContent='0';A(n1,{transform:`translate(320 500) scale(${1+.15*Math.sin(k*Math.PI*8)*(1-k)}) translate(-320 -500)`})}};

/* ---------- end screen ---------- */
CARD.end=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');R(f,-100,-100,1480,900,'url(#gWallShade)');for(let i=0;i<60;i++)R(f,rnd(i)*1280,rnd(i+9)*720,3,3,'#fff',{opacity:.2+rnd(i+3)*.5});
 BT(m,640,100,'THANKS FOR WATCHING',62,'#fff',{stroke:'#000','stroke-width':9,'letter-spacing':4});
 for(const [x,lab] of[[330,'NEXT VIDEO'],[950,'MORE FROM US']]){R(m,x-250,150,500,282,'#16182a',{rx:18,stroke:'#7dffb0','stroke-width':5,'stroke-dasharray':'18 12'});BT(m,x,300,lab,38,'#9fd0ff',{'paint-order':'normal','letter-spacing':4})}
 const sb=G(m);R(sb,500,470,280,76,'#e0463a',{rx:38});BT(sb,640,524,'SUBSCRIBE',50,'#fff',{'paint-order':'normal','letter-spacing':4});
 const dex=actor(m,{k:'dex',view:'front',pose:'wave',expr:'smile',x:90,y:780,s:1.0});const stv=actor(m,{k:'steve',view:'front',pose:'zombie',x:1190,y:780,s:1.0,ph:2});
 return (u,t,bt)=>{A(sb,{transform:`translate(640 508) scale(${1+.05*Math.sin(t*5)}) translate(-640 -508)`});dex.upd(u,t,bt);stv.upd(u,t,bt)}};

/* ---------- plain text card ---------- */
CARD.text=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,p.bg||'#000');if(p.bg2)R(f,-100,-100,1480,900,'url(#gWallShade)');
 const ls=(p.lines||[p.t]);const els=ls.map((s,i)=>BT(m,640,330+i*(p.size||120)*1.05-(ls.length-1)*(p.size||120)*.52,s,p.size||120,i===0?(p.c||'#fff'):(p.c2||p.c||'#fff'),{stroke:'#000','stroke-width':(p.size||120)*.12,'letter-spacing':3}));
 return (u,t,bt)=>{els.forEach((e,i)=>{const a=slam(bt,i*.25,.28);A(e,{opacity:a.op,transform:`translate(640 360) scale(${lerp(p.pop||1.4,1,a.k)}) translate(-640 -360)`})})}};

/* ---------- item list (icons row) ---------- */
CARD.list=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');R(f,-100,-100,1480,900,'url(#gWallShade)');
 BT(m,640,110,p.title,76,'#fff',{stroke:'#000','stroke-width':12,'letter-spacing':5});const n=p.items.length,gap=1180/n,els=[];
 p.items.forEach((it,i)=>{const q=G(m);const cx=50+gap*(i+.5);R(q,cx-gap/2+10,200,gap-20,330,'#161a2e',{rx:20,stroke:'#7dffb0','stroke-width':5});icon(q,it.icon,cx,330,1.25);BT(q,cx,500,it.l,gap>200?44:36,'#fff',{stroke:'#000','stroke-width':8});els.push(q)});
 return (u,t,bt)=>{els.forEach((q,i)=>{const k=eb(clamp((bt-.6-i*.4)/.3));A(q,{opacity:clamp((bt-.6-i*.4)/.08),transform:`translate(0 ${(1-k)*50})`})})}};

/* ---------- recap of the rules ---------- */
CARD.recap=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-100,-100,1480,900,'#0b0d16');R(f,-100,-100,1480,900,'url(#gWallShade)');
 BT(m,640,82,p.title,52,'#ffd23a',{stroke:'#000','stroke-width':10,'letter-spacing':6});const els=[];
 p.items.forEach((s,i)=>{const col=i%2,row=Math.floor(i/2),x=60+col*600,y=122+row*116;const q=G(m);R(q,x,y,580,100,'#161a2e',{rx:16,stroke:'#3a4a8a','stroke-width':4});R(q,x+12,y+14,72,72,'#d9302a',{rx:14});BT(q,x+48,y+68,String(i+1),56,'#fff',{'paint-order':'normal'});
  const tx=fitText(BT(q,x+104,y+62,s,34,'#fff',{'text-anchor':'start',stroke:'#000','stroke-width':6}),460);els.push(q)});
 return (u,t,bt)=>{els.forEach((q,i)=>{const k=eb(clamp((bt-.5-i*.4)/.28));A(q,{opacity:clamp((bt-.5-i*.4)/.08),transform:`translate(${(i%2?1:-1)*(1-k)*80} 0)`})})}};
