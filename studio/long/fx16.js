/* ===== fx16: meme / editing overlays. FX.name=(g,f)=>update(lt,bt,u). lt = seconds since f.at, bt = seconds since beat start.
   Overlays live in the crisp overlay svg (never pixelated, never moved by the scene camera). ===== */
var FX=window.FX||{};
const INTER='Inter, DejaVu Sans, sans-serif';
const fxrnd=(a,b)=>rnd(FRAME*7.13+a*3.1+b);
function stickerText(q,txt,size,c,tc){const lite=/^#f{3,6}$/i.test(c||'');
 T(q,5,7,txt,size,'#000',{'font-family':INTER,'font-weight':900,stroke:'#000','stroke-width':size*.3,'paint-order':'stroke fill','stroke-linejoin':'round',opacity:.45});
 T(q,0,0,txt,size,c||'#ffd23a',{'font-family':INTER,'font-weight':900,stroke:'#fff','stroke-width':size*.24,'paint-order':'stroke fill','stroke-linejoin':'round'})}
const SIC={
 skull:(q)=>{const g=G(q,{transform:'scale(3.1)'});skullIcon(g,0,0,1,'#fff');E('circle',{cx:0,cy:-4,r:15.5,fill:'none',stroke:'#000','stroke-width':1.6,opacity:.8},g)},
 thumb:(q)=>{const g=G(q,{transform:'scale(2.2)'});P(g,'M-14,-8 L-4,-8 L4,-34 Q16,-34 14,-18 L12,-8 L30,-8 Q40,-6 36,6 L32,30 Q30,38 22,38 L-14,38Z','#ffd23a',{stroke:'#fff','stroke-width':6,'paint-order':'stroke fill','stroke-linejoin':'round'});R(g,-34,-8,18,48,'#3a86f0',{rx:4,stroke:'#fff','stroke-width':6})},
 heart:(q)=>{const g=G(q,{transform:'scale(2.4)'});P(g,'M0,26 C-40,-4 -26,-34 -8,-28 C-2,-26 0,-20 0,-18 C0,-20 2,-26 8,-28 C26,-34 40,-4 0,26Z','#ff3a5a',{stroke:'#fff','stroke-width':5,'stroke-linejoin':'round'})},
 sweat:(q)=>{const g=G(q,{transform:'scale(2.6)'});P(g,'M0,-30 Q-22,6 -14,20 Q0,32 14,20 Q22,6 0,-30Z','#6ad0ff',{stroke:'#fff','stroke-width':5})},
 warn:(q)=>{const g=G(q,{transform:'scale(2.2)'});P(g,'M0,-34 L36,28 L-36,28Z','#ffd23a',{stroke:'#111','stroke-width':6,'stroke-linejoin':'round'});T(g,0,20,'!',44,'#111',{'font-family':INTER,'font-weight':900})},
 check:(q)=>icon(q,'check',0,0,1.4),cross:(q)=>icon(q,'cross',0,0,1.4)};
FX.sticker=(g,f)=>{const q=G(g,{});const w=G(q,{});const sz=(f.size||90);if(f.txt)stickerText(w,f.txt,sz,f.c,f.tc);if(f.ic&&SIC[f.ic])SIC[f.ic](w);
 return (lt,bt)=>{const dur=f.dur==null?2:f.dur;const pin=eb(clamp(lt/.2)),pout=f.dur==null?0:clamp((lt-(dur-.15))/.15);const sc=(pin*(1-pout))*(f.s||1)*(1+.04*Math.sin(lt*14));
  A(q,{opacity:clamp(lt/.05)*(1-pout),transform:`translate(${f.x} ${f.y}) rotate(${(f.rot||0)+Math.sin(lt*9)*1.4}) scale(${sc})`})}};
FX.stamp=(g,f)=>{const q=G(g,{});const sz=f.size||110;const c=f.c||'#e0463a';const bw=f.txt.length*sz*.62+60;
 R(q,-bw/2,-sz*.62,bw,sz*1.2,'none',{rx:12,stroke:c,'stroke-width':12});R(q,-bw/2+14,-sz*.62+14,bw-28,sz*1.2-28,'none',{rx:6,stroke:c,'stroke-width':4});
 T(q,0,sz*.3,f.txt,sz,c,{'font-family':INTER,'font-weight':900,'letter-spacing':4});
 return (lt)=>{const k=clamp(lt/.16);const s=lerp(2.6,1,eo(k));A(q,{opacity:clamp(lt/.05)*.92,transform:`translate(${f.x} ${f.y}) rotate(${f.rot==null?-8:f.rot}) scale(${s})`})}};
FX.toast=(g,f)=>{const q=G(g,{});R(q,0,0,420,96,'rgba(14,16,30,.94)',{rx:14,stroke:'#ffd23a','stroke-width':3});
 const tr=G(q,{transform:'translate(52 48)'});C(tr,0,0,32,'#ffd23a',{stroke:'#111','stroke-width':3});P(tr,'M-16,-14 h32 v10 q0,16 -16,20 q-16,-4 -16,-20Z','#111');
 T(q,248,36,'ACHIEVEMENT UNLOCKED',18,'#ffd23a',{'font-family':MONO,'font-weight':800,'letter-spacing':1,'data-slide':1});T(q,248,70,f.txt,30,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':1,'data-slide':1});
 return (lt)=>{const dur=f.dur||3;const k=eo(clamp(lt/.3))*(1-clamp((lt-(dur-.3))/.3));A(q,{transform:`translate(${f.x==null?(1280-460+ (1-k)*480):f.x} ${f.y==null?34:f.y})`})}};
FX.died=(g,f)=>{const q=G(g,{});R(q,0,200,1280,300,'rgba(0,0,0,.72)');const tx=T(q,640,408,'YOU DIED',170,'#b01818',{'font-family':'DejaVu Serif, Georgia, serif','font-weight':700,'letter-spacing':14});
 const s2=T(q,640,470,'DEATH #'+(f.n||1),30,'#c9c9d0',{'font-family':MONO,'font-weight':700,'letter-spacing':8});
 return (lt)=>{const k=clamp(lt/.6);A(q,{opacity:k});A(tx,{transform:`translate(640 380) scale(${1+.07*clamp(lt/3)}) translate(-640 -380)`,opacity:1});}};
FX.flash=(g,f)=>{const r=R(g,0,0,1280,720,f.c||'#fff');return (lt)=>A(r,{opacity:(f.a||.9)*(1-clamp(lt/(f.dur||.2)))})};
FX.fade=(g,f)=>{const r=R(g,0,0,1280,720,f.c||'#000');return (lt,bt,u)=>{const d=f.dur||.6;A(r,{opacity:f.out?clamp(lt/d):1-clamp(lt/d)})}};
FX.redvig=(g,f)=>{const r=R(g,0,0,1280,720,'url(#gRedV)');const d=document.getElementById('ovdefs');if(!d.querySelector('#gRedV'))d.insertAdjacentHTML('beforeend','<radialGradient id="gRedV" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#e01010" stop-opacity="0"/><stop offset="1" stop-color="#e01010" stop-opacity=".75"/></radialGradient>');
 return (lt)=>A(r,{opacity:.55+.4*Math.sin(lt*10)})};
FX.glitch=(g,f)=>{const q=G(g,{style:'mix-blend-mode:screen'});const bars=[];for(let i=0;i<12;i++)bars.push(R(q,0,0,10,10,'#0ff'));
 return (lt)=>{bars.forEach((b,i)=>{const on=fxrnd(i,1)>.35;A(b,{opacity:on?.55:0,x:fxrnd(i,2)*900-100,y:fxrnd(i,3)*700,width:200+fxrnd(i,4)*900,height:4+fxrnd(i,5)*34,fill:['#00ffff','#ff00aa','#ffffff','#ffff00'][i%4]})})}};
FX.vhs=(g,f)=>{const q=G(g,{});const tint=R(q,0,0,1280,720,'rgba(40,60,200,.18)');const ln=[];for(let y=0;y<720;y+=6)ln.push(R(q,0,y,1280,2,'#000',{opacity:.22}));
 const band=R(q,0,0,1280,70,'rgba(255,255,255,.14)');const lab=T(q,60,130,'◀◀ REWIND',50,'#fff',{'font-family':MONO,'font-weight':800,'letter-spacing':3,'text-anchor':'start',stroke:'#000','stroke-width':6,'paint-order':'stroke fill'});
 const tc=T(q,1220,60,'',30,'#fff',{'font-family':MONO,'text-anchor':'end','font-weight':700,stroke:'#000','stroke-width':5,'paint-order':'stroke fill'});
 return (lt)=>{A(band,{y:((lt*900)%900)-100});A(lab,{opacity:Math.sin(lt*14)>-.3?1:.2});const sec=Math.max(0,(f.from==null?42:f.from)-lt*60);tc.textContent='00:'+String(Math.floor(sec/60)).padStart(2,'0')+':'+String(Math.floor(sec%60)).padStart(2,'0')}};
FX.bars=(g,f)=>{const a=R(g,0,0,1280,0,'#000'),b=R(g,0,720,1280,0,'#000');return (lt)=>{const k=eo(clamp(lt/.35))*(f.h||64);A(a,{height:k});A(b,{y:720-k,height:k})}};
FX.speed=(g,f)=>{const q=G(g,{});const ls=[];for(let i=0;i<46;i++)ls.push(P(q,'M0,0',null,{fill:'#fff',opacity:.5}));
 return (lt)=>{ls.forEach((l,i)=>{const a=(i/46)*Math.PI*2+fxrnd(i,1)*.1,r0=280+fxrnd(i,2)*160,r1=900,w=.02+fxrnd(i,3)*.03;A(l,{d:`M${640+Math.cos(a-w)*r1},${360+Math.sin(a-w)*r1} L${640+Math.cos(a)*r0},${360+Math.sin(a)*r0} L${640+Math.cos(a+w)*r1},${360+Math.sin(a+w)*r1}Z`,opacity:fxrnd(i,4)>.4?.55:0})})}};
FX.ring=(g,f)=>{const q=G(g,{});const c=f.c||'#ff3a2a';const e=E('ellipse',{cx:f.x,cy:f.y,rx:f.rx||f.r||70,ry:f.ry||f.r||70,fill:'none',stroke:c,'stroke-width':8,'stroke-dasharray':'1000','stroke-dashoffset':1000,transform:`rotate(-8 ${f.x} ${f.y})`},q);
 const lx=f.tx,ly=f.ty;let ar=null,tx=null;if(f.txt){tx=T(q,lx,ly,f.txt,f.fs||54,c,{'font-family':INTER,'font-weight':900,stroke:'#fff','stroke-width':(f.fs||54)*.22,'paint-order':'stroke fill','stroke-linejoin':'round',opacity:0});
  ar=P(q,`M${lx},${ly+(f.ay||14)} Q${(lx+f.x)/2},${(ly+f.y)/2+40} ${f.x+(f.ax||0)},${f.y-(f.ry||f.r||70)-6}`,'none',{stroke:c,'stroke-width':8,'stroke-linecap':'round','stroke-dasharray':'600','stroke-dashoffset':600})}
 return (lt)=>{A(e,{'stroke-dashoffset':1000*(1-eo(clamp(lt/.35)))});if(tx){A(tx,{opacity:clamp((lt-.2)/.1),transform:`translate(${lx} ${ly}) scale(${.6+.4*eb(clamp((lt-.2)/.2))}) translate(${-lx} ${-ly})`});A(ar,{'stroke-dashoffset':600*(1-eo(clamp((lt-.3)/.3)))})}}};
FX.popup=(g,f)=>{const q=G(g,{});const w=f.w||560,h=f.h||250;R(q,6,8,w,h,'#000',{opacity:.4,rx:6});R(q,0,0,w,h,'#e8e8ee',{rx:6,stroke:'#111','stroke-width':3});R(q,0,0,w,44,'#2a5ad0',{rx:6});R(q,0,30,w,14,'#2a5ad0');T(q,16,31,f.title||'Real_Life.exe',22,'#fff',{'font-family':INTER,'font-weight':700,'text-anchor':'start'});
 R(q,w-42,8,30,28,'#e0463a',{rx:4});T(q,w-27,30,'×',26,'#fff',{'font-family':INTER});
 const ic=G(q,{transform:'translate(60 120)'});C(ic,0,0,32,'#e0463a');T(ic,0,13,'×',44,'#fff',{'font-family':INTER,'font-weight':900});
 const lines=(f.msg||'has stopped working.').split('\n');lines.forEach((l,i)=>T(q,112,104+i*34,l,28,'#111',{'font-family':INTER,'font-weight':600,'text-anchor':'start'}));
 R(q,w/2-60,h-72,120,46,'#d0d0da',{rx:6,stroke:'#111','stroke-width':3});T(q,w/2,h-40,f.btn||'OK',26,'#111',{'font-family':INTER,'font-weight':700});
 return (lt)=>{const k=eb(clamp(lt/.2));A(q,{opacity:clamp(lt/.05),transform:`translate(${f.x-w/2} ${f.y-h/2}) translate(${w/2} ${h/2}) scale(${.7+.3*k}) translate(${-w/2} ${-h/2})`})}};
FX.keycap=(g,f)=>{const q=G(g,{});R(q,0,10,96,96,'#000',{rx:16,opacity:.5});R(q,0,0,96,96,'#f2f2f6',{rx:16,stroke:'#111','stroke-width':5});R(q,10,8,76,64,'#fff',{rx:10});T(q,48,70,f.key||'F',64,'#111',{'font-family':INTER,'font-weight':900});
 T(q,120,64,f.txt||'TO PAY RESPECTS',50,'#fff',{'font-family':INTER,'font-weight':900,'text-anchor':'start',stroke:'#000','stroke-width':10,'paint-order':'stroke fill','stroke-linejoin':'round'});
 return (lt)=>{const k=eb(clamp(lt/.2)),press=lt>.55&&lt<.75?6:0;A(q,{opacity:clamp(lt/.05),transform:`translate(${f.x} ${f.y+press}) scale(${k})`})}};
FX.like=(g,f)=>{const q=G(g,{});R(q,-190,-50,380,100,'rgba(30,30,34,.95)',{rx:50,stroke:'#fff','stroke-width':3});const th=G(q,{transform:'translate(-120 0) scale(.75)'});SIC.thumb(th);
 T(q,30,16,'LIKE',46,'#fff',{'font-family':INTER,'font-weight':900,'letter-spacing':3});
 const sp=E('circle',{cx:150,cy:0,r:16,fill:'none',stroke:'#ffd23a','stroke-width':6,'stroke-dasharray':'40 70'},q);const cn=T(q,0,92,'0',40,'#fff',{'font-family':MONO,'font-weight':800,stroke:'#000','stroke-width':6,'paint-order':'stroke fill'});
 return (lt)=>{const k=eb(clamp(lt/.25));A(q,{opacity:clamp(lt/.05),transform:`translate(${f.x} ${f.y}) scale(${k})`});A(sp,{transform:`rotate(${lt*420} 150 0)`});cn.textContent=lt>(f.tick||1e9)?'1':'0'}};
FX.chyron=(g,f)=>{const q=G(g,{});R(q,0,0,760,60,'rgba(10,10,14,.9)');R(q,0,0,14,60,'#e0463a');T(q,34,41,f.txt,30,'#fff',{'font-family':RCF,'font-weight':700,'text-anchor':'start','letter-spacing':2});
 return (lt)=>{const k=eo(clamp(lt/.3));A(q,{transform:`translate(${f.x==null?40:f.x} ${f.y==null?60:f.y}) translate(${(1-k)*-780} 0)`})}};
FX.pip=(g,f)=>{const q=G(g,{});const x=f.x==null?950:f.x,y=f.y==null?40:f.y;R(q,x,y,290,270,'#11131a',{rx:16,stroke:'#fff','stroke-width':4});
 const cp=uid2('pc');const cl=E('clipPath',{id:cp},q);R(cl,x+10,y+10,270,220,'#fff',{rx:10});const sc=G(q,{'clip-path':`url(#${cp})`});R(sc,x+10,y+10,270,220,'#3a4a8a');R(sc,x+10,y+150,270,80,'#2a3466');
 const hd=G(sc,{transform:`translate(${x+145} ${y+158}) scale(2.2)`});const mh=mayaHead(hd,KWHO.maya,{view:'front',expr:'smile'});
 const mo=E('ellipse',{cx:0,cy:23,rx:7,ry:1,fill:'#5a1a1a',stroke:'#2a1c13','stroke-width':2},mh);
 for(let yy=y+10;yy<y+230;yy+=5)R(sc,x+10,yy,270,1.6,'#000',{opacity:.22});
 T(q,x+145,y+256,f.name||'MAYA  ·  RADIO',22,'#9fe8a0',{'font-family':MONO,'font-weight':800,'letter-spacing':2});C(q,x+30,y+240,5,'#ff2a2a');
 return (lt)=>{const k=eb(clamp(lt/.25));A(q,{opacity:clamp(lt/.05),transform:`translate(${(1-k)*320} 0)`});const m=mouth(f.who||'maya');A(mo,{ry:Math.max(1,1+8*m),cy:21+3*m});A(sc,{opacity:.85+.15*Math.sin(lt*30)})}};
FX.counter=(g,f)=>{const q=G(g,{});const t=T(q,0,0,f.txt||'',f.size||60,f.c||'#ffe066',{'font-family':MONO,'font-weight':800,stroke:'#000','stroke-width':9,'paint-order':'stroke fill'});
 return (lt)=>{const k=eb(clamp(lt/.2));A(q,{opacity:clamp(lt/.05),transform:`translate(${f.x} ${f.y-lt*(f.rise||30)}) scale(${k})`})}};
FX.shake=()=>null;FX.zoom=()=>null;FX.freeze=()=>null;
FX.freezetext=(g,f)=>{const t=T(g,640,300,f.txt||'',60,'#fff',{'font-family':INTER,'font-weight':900,stroke:'#000','stroke-width':12,'paint-order':'stroke fill','stroke-linejoin':'round'});return (lt)=>A(t,{opacity:clamp(lt/.1)})};
