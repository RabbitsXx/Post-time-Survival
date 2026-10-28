/* ===== story-chain master kit: helpers, elements, HUD ===== */
const NS='http://www.w3.org/2000/svg';
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,x)=>a+(b-a)*x;
const ease=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eo=x=>1-Math.pow(1-clamp(x),3);
const eb=x=>{x=clamp(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function rnd(n){let x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function E(tag,a,p){const e=document.createElementNS(NS,tag);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function A(e,a){for(const k in a)e.setAttribute(k,a[k]);return e}
function G(p,a){return E('g',a||{},p)}
function R(p,x,y,w,h,fill,o){return E('rect',Object.assign({x,y,width:w,height:h,fill},o||{}),p)}
function C(p,cx,cy,r,fill,o){return E('circle',Object.assign({cx,cy,r,fill},o||{}),p)}
function P(p,d,fill,o){return E('path',Object.assign({d,fill},o||{}),p)}
function T(p,x,y,str,size,fill,o){const t=E('text',Object.assign({x,y,'font-size':size,fill,'font-weight':900,'text-anchor':'middle','font-family':'Inter, DejaVu Sans, sans-serif'},o||{}),p);t.textContent=str;return t}
function L(p,x1,y1,x2,y2,stroke,w,o){return E('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w,'stroke-linecap':'round'},o||{}),p)}
const BIG=(p,fill)=>R(p,-300,-300,1320,1880,fill);

/* palette */
const PAL={ink:'#0a0e1a',navy:'#0d1b36',teal:'#1f6f78',cream:'#f2ead8',ochre:'#e0903a',warm:'#ffb347',red:'#e83e36',yel:'#ffca28',green:'#2fae5a',paper:'#f4ecd2'};

/* ---------- gradients ---------- */
function defs(){
 document.getElementById('defs').innerHTML=`
 <linearGradient id="gSunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1040"/><stop offset=".4" stop-color="#6a2c78"/><stop offset=".7" stop-color="#e35a55"/><stop offset=".9" stop-color="#ffa14a"/><stop offset="1" stop-color="#ffd58a"/></linearGradient>
 <linearGradient id="gBurn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b0a12"/><stop offset=".45" stop-color="#6e1d1a"/><stop offset=".8" stop-color="#e2582a"/><stop offset="1" stop-color="#ffb45a"/></linearGradient>
 <linearGradient id="gDuskTeal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1a3c"/><stop offset=".55" stop-color="#2a4f7a"/><stop offset=".85" stop-color="#e79a63"/><stop offset="1" stop-color="#ffc98a"/></linearGradient>
 <linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".6" stop-color="#091a3a"/><stop offset="1" stop-color="#1b3a63"/></linearGradient>
 <linearGradient id="gSeaDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a24a66"/><stop offset=".25" stop-color="#43285e"/><stop offset="1" stop-color="#0a0a1e"/></linearGradient>
 <linearGradient id="gSeaNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12305a"/><stop offset="1" stop-color="#030610"/></linearGradient>
 <linearGradient id="gSeaDeep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8fb0"/><stop offset=".5" stop-color="#0f4c78"/><stop offset="1" stop-color="#051a33"/></linearGradient>
 <radialGradient id="gRadar" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#0c5070"/><stop offset=".6" stop-color="#06283c"/><stop offset="1" stop-color="#020b14"/></radialGradient>
 <linearGradient id="gBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff8d0" stop-opacity=".95"/><stop offset=".5" stop-color="#ffeaa0" stop-opacity=".4"/><stop offset="1" stop-color="#ffeaa0" stop-opacity="0"/></linearGradient>
 <linearGradient id="gSweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3dffb0" stop-opacity=".5"/><stop offset="1" stop-color="#3dffb0" stop-opacity="0"/></linearGradient>
 <radialGradient id="gGlow"><stop offset="0" stop-color="#fff4c0"/><stop offset=".35" stop-color="#ffd46a" stop-opacity=".55"/><stop offset="1" stop-color="#ff9a2a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gFire"><stop offset="0" stop-color="#ffd27a" stop-opacity=".95"/><stop offset=".4" stop-color="#ff6a2a" stop-opacity=".5"/><stop offset="1" stop-color="#ff3a1a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gRed"><stop offset="0" stop-color="#ff2a2a" stop-opacity=".9"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gCyan"><stop offset="0" stop-color="#6ae6ff" stop-opacity=".7"/><stop offset="1" stop-color="#6ae6ff" stop-opacity="0"/></radialGradient>
 <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3c"/><stop offset="1" stop-color="#4a2c18"/></linearGradient>
 <linearGradient id="gDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0f1c"/><stop offset="1" stop-color="#05070d"/></linearGradient>
 <linearGradient id="gWarmRoom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2416"/><stop offset="1" stop-color="#1a0f08"/></linearGradient>
 <linearGradient id="gMoonSea" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe6ff" stop-opacity="0"/><stop offset=".5" stop-color="#cfe6ff" stop-opacity=".75"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></linearGradient>
 <filter id="b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id="b6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
 <filter id="b10" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
 <filter id="b24" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="24"/></filter>`;
}

/* ---------- atmosphere ---------- */
function stars(g,n,maxY,seed){const a=[];for(let i=0;i<n;i++)a.push(C(g,rnd(i+seed)*1100-190,rnd(i+seed+99)*maxY,.8+rnd(i+seed+5)*1.6,'#fff',{opacity:.7}));return a}
function twinkle(a,t){a.forEach((c,i)=>A(c,{opacity:.25+.75*Math.abs(Math.sin(t*(1+rnd(i)*2)+i))}))}
function clouds(g,y0,n,fill,seed){const a=[];for(let i=0;i<n;i++){const e=E('ellipse',{rx:130+rnd(i+seed)*150,ry:11+rnd(i+seed+3)*10,fill,opacity:.55},g);a.push([e,y0+i*46+rnd(i+seed+7)*20,rnd(i+seed+9)*1100,18+rnd(i)*26])}return a}
function driftClouds(a,t){a.forEach(([e,y,x0,sp])=>A(e,{cx:((x0+t*sp)%1300)-200,cy:y}))}
function moon(g,x,y,r,phase){C(g,x,y,r*2.6,'#9bc4ff',{opacity:.2,filter:'url(#b24)'});C(g,x,y,r,'#f3f1e6');if(phase)C(g,x+r*.42,y-r*.14,r*.95,'#0a1a38')}
function sunDisc(g,x,y,r){C(g,x,y,r*2.8,'#ff9a4a',{opacity:.38,filter:'url(#b24)'});C(g,x,y,r,'#ffd9a0')}
function smokeCols(g,x0,x1,yBase,n,fill,op){const a=[];for(let c=0;c<n;c++){const x=lerp(x0,x1,c/(n-1||1))+rnd(c)*30;for(let k=0;k<8;k++)a.push([C(g,0,0,14,fill||'#2a1622',{opacity:op||.6}),x,c,k,yBase])}return a}
function updSmoke(a,t,h){a.forEach(([c,x,ci,k,yb])=>{const p=((t*.08+k/8+ci*.17)%1);A(c,{cx:x+Math.sin(p*5+ci)*20+p*50,cy:yb-p*(h||320),r:12+p*46,opacity:.6*(1-p)*clamp(p*5)})})}
function skyline(g,x0,x1,yBase,seed,o){o=o||{};const fires=[];E('rect',{x:x0,y:yBase-20,width:x1-x0,height:400,fill:o.fill||'#150b20'},g);
 for(let x=x0,i=0;x<x1;i++){const w=20+rnd(seed+i)*34,h=(o.minH||30)+rnd(seed+i+11)*(o.maxH||120);R(g,x,yBase-h,w,h+30,o.fill||'#150b20');
  if(o.win)for(let r=0;r<h/18;r++)for(let c=0;c<w/12;c++)if(rnd(seed+i*31+r*7+c)>.72)R(g,x+3+c*12,yBase-h+6+r*18,6,8,'#ffb04a',{opacity:.8});
  if(o.fires&&rnd(seed+i+40)>.5)fires.push([C(g,x+w/2,yBase-h,10+rnd(i)*14,'url(#gFire)'),i]);x+=w+rnd(i+seed+2)*4}
 return fires}
function flick(a,t){a.forEach(([c,i])=>A(c,{opacity:.55+.45*Math.sin(t*9+i*3)*Math.sin(t*5.3+i)}))}
function sea(g,y,fill,h){R(g,-200,y,1120,h||900,fill)}
function waves(g,y0,n,col,seed){const a=[];for(let i=0;i<n;i++)a.push([R(g,0,0,100+rnd(i+seed)*180,2.5,col,{rx:1.2,opacity:.2}),rnd(i+seed+3),y0+i*Math.max(14,(1280-y0)/n)]);return a}
function updWaves(a,t){a.forEach(([r,ph,y],i)=>A(r,{x:((ph*1000+t*(12+i*1.5))%1300)-250,y:y+((t*6)%14)}))}
function shimmer(g,cx,y0,n,col,maxW){const a=[];for(let i=0;i<n;i++)a.push(R(g,0,y0+i*9,10,3.4,col,{rx:1.7,opacity:.7-i*.02}));return a.map((r,i)=>({r,i,cx,y:y0+i*9,mw:maxW*(1-i/n*.5)}))}
function updShimmer(a,t){a.forEach(({r,i,cx,y,mw})=>{const w=mw*(.5+.5*Math.sin(t*3+i*1.7))+8;A(r,{x:cx-w/2+Math.sin(t*2+i)*8,y,width:w})})}
function embers(g,n,col){const a=[];for(let i=0;i<n;i++)a.push(C(g,0,0,1.5+rnd(i)*2.4,col||'#ffb04a'));return a}
function updEmbers(a,t,x0,x1,yBase,h){a.forEach((e,i)=>{const p=(t*.14+rnd(i))%1;A(e,{cx:lerp(x0,x1,rnd(i+7))+Math.sin(p*9+i)*14,cy:yBase-p*h,opacity:(1-p)*.9})})}

/* ---------- lighthouse / rock ---------- */
function rock(g,x,y,w,fill){P(g,`M${x-w/2},${y+100} L${x-w/2+50},${y+10} L${x-60},${y-14} L${x+70},${y-10} L${x+w/2-30},${y+50} L${x+w/2},${y+100}Z`,fill||'#171229');P(g,`M${x-60},${y-14} L${x+70},${y-10} L${x+w/2-30},${y+50} L${x+20},${y+8}Z`,'#2c2342',{opacity:.9})}
function lighthouse(g,x,yb,h,o){o=o||{};const wb=h*.1,wt=h*.062,bands=7,yt=yb-h;const a=o.band||'#2d5a80',b=o.base||'#f1ece0';const out={};
 for(let i=0;i<bands;i++){const y0=yb-h*i/bands,y1=yb-h*(i+1)/bands,w0=lerp(wb,wt,i/bands),w1=lerp(wb,wt,(i+1)/bands);P(g,`M${x-w0},${y0} L${x+w0},${y0} L${x+w1},${y1} L${x-w1},${y1}Z`,i%2?a:b)}
 P(g,`M${x+wb*.12},${yb} L${x+wb},${yb} L${x+wt},${yt} L${x+wt*.1},${yt}Z`,'#0b0a24',{opacity:o.shade||.35});
 R(g,x-wt-h*.03,yt-h*.015,(wt+h*.03)*2,h*.02,'#26223a');
 for(let i=0;i<8;i++)R(g,x-wt-h*.025+i*((wt+h*.025)*2)/7,yt-h*.06,h*.006,h*.05,'#26223a');
 R(g,x-wt-h*.03,yt-h*.065,(wt+h*.03)*2,h*.008,'#26223a');
 out.lant=R(g,x-wt*.8,yt-h*.15,wt*1.6,h*.085,o.lit?'#fff2a8':'#2b3a58');
 R(g,x-wt*.8,yt-h*.15,wt*1.6,h*.085,'none',{stroke:'#1c1830','stroke-width':h*.008});R(g,x-h*.004,yt-h*.15,h*.008,h*.085,'#1c1830');
 P(g,`M${x-wt},${yt-h*.15} L${x},${yt-h*.215} L${x+wt},${yt-h*.15}Z`,'#2a2f4a');C(g,x,yt-h*.22,h*.009,'#1c1830');
 R(g,x-wb*.2,yb-h*.075,wb*.4,h*.06,'#3b2a3f',{rx:3});
 out.x=x;out.y=yt-h*.11;return out}

/* ---------- characters (stick-figure family: round head, thick limbs, hardhat) ---------- */
function limb(g,pts,w,col){const d='M'+pts.map(p=>p.join(',')).join(' L');return E('path',{d,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},g)}
const POSES={
 stand:{lA:[[-24,-148],[-34,-110],[-30,-76]],rA:[[24,-148],[34,-110],[30,-76]]},
 binoc:{lA:[[-24,-148],[-36,-170],[-9,-181]],rA:[[24,-148],[36,-170],[9,-181]],binoc:1},
 panic:{lA:[[-24,-148],[-44,-176],[-20,-204]],rA:[[24,-148],[44,-176],[20,-204]]},
 cross:{lA:[[-24,-148],[-36,-118],[8,-124]],rA:[[24,-148],[36,-118],[-8,-130]]},
 point:{lA:[[-24,-148],[-34,-110],[-30,-76]],rA:[[24,-148],[58,-158],[96,-164]]},
 reach:{lA:[[-24,-148],[-34,-110],[-30,-76]],rA:[[24,-148],[50,-132],[80,-120]]},
 hold:{lA:[[-24,-148],[-34,-110],[-12,-100]],rA:[[24,-148],[40,-120],[12,-104]]}};
function hero(g,o){o=o||{};const col=o.col||'#06090f',rim=o.rim||null,pose=POSES[o.pose||'stand'];const x=o.x||360,y=o.y||900,s=o.s||1,fl=o.flip?-1:1;
 const gg=G(g,{transform:`translate(${x} ${y}) scale(${s*fl} ${s})`});
 const draw=(dx,dy,c,wm)=>{const q=G(gg,{transform:`translate(${dx} ${dy})`});
  limb(q,[[-14,-90],[-20,-46],[-22,0]],15*wm,c);limb(q,[[14,-90],[20,-46],[22,0]],15*wm,c);
  limb(q,[[0,-92],[0,-150]],34*wm,c);
  limb(q,pose.lA,12*wm,c);limb(q,pose.rA,12*wm,c);
  C(q,0,-176,22*(wm>1?1.04:1),c);
  if(!o.noHat){P(q,'M-27,-182 Q0,-214 27,-182Z',o.hat||'#e0b020');R(q,-31,-184,62,8,o.hat||'#e0b020',{rx:3})}
  if(o.pack)R(q,-44,-150,24,52,c,{rx:6});
  if(pose.binoc){R(q,-20,-186,17,16,c,{rx:4});R(q,3,-186,17,16,c,{rx:4})}
 };
 if(rim){draw(-2.5,-2,rim,1.04)}
 draw(0,0,col,1);return gg}

/* ---------- zombies (silhouettes with red eyes) ---------- */
function zombie(g,x,y,s,seed){const col='#05040a',z=G(g,{});const body=G(z,{});
 limb(body,[[-9,-60],[-12,-28],[-12,0]],11,col);limb(body,[[9,-60],[12,-28],[14,0]],11,col);
 limb(body,[[0,-62],[3,-102]],26,col);limb(body,[[-12,-98],[-40,-96],[-62,-92]],9,col);limb(body,[[12,-98],[40,-94],[62,-88]],9,col);
 const head=G(body,{});C(head,3,-122,15,col);
 const e1=C(head,-1,-124,3.2,'#ff2a2a',{opacity:0}),e2=C(head,8,-124,3.2,'#ff2a2a',{opacity:0}),gl=C(head,3,-124,17,'url(#gRed)',{opacity:0});
 const o={z,body,head,e1,e2,gl,x,y,s,seed};A(z,{transform:`translate(${x} ${y}) scale(${s})`});return o}
function updZombie(o,t,eyes,sway){const sw=Math.sin(t*1.6+o.seed)*(sway==null?3:sway);
 A(o.z,{transform:`translate(${o.x+sw} ${o.y}) scale(${o.s})`});A(o.head,{transform:`rotate(${Math.sin(t*2.3+o.seed)*4+(eyes?-8:12)} 3 -108)`});
 A(o.e1,{opacity:eyes});A(o.e2,{opacity:eyes});A(o.gl,{opacity:eyes})}

/* ---------- HUD components (kept out of caption zone y 730-910) ---------- */
function pop(g,u,fromY){const k=eb(u);A(g,{opacity:clamp(u*3),transform:`translate(0 ${(1-k)*(fromY==null?18:fromY)})`})}
function dayStamp(g,x,y){const q=G(g,{});
 R(q,x-150,y,300,52,PAL.red,{rx:8});T(q,x,y+39,'OUTBREAK',34,'#fff',{'letter-spacing':6});
 T(q,x,y+168,'DAY 1',130,'#fff',{stroke:'#000','stroke-width':10,'paint-order':'stroke fill'});
 R(q,x-92,y+196,184,46,'#000',{rx:23,opacity:.75,stroke:PAL.yel,'stroke-width':2});T(q,x,y+229,'6:42 PM',28,PAL.yel,{'font-family':'DejaVu Sans Mono, monospace'});
 return u=>{const k=eb((u-.0)/.28);A(q,{opacity:clamp(u*10),transform:`translate(${x} ${y+70}) scale(${lerp(2.2,1,k)}) translate(${-x} ${-y-70})`})}}
function pill(g,txt,x,y,fill,o){o=o||{};const w=txt.length*17+44,q=G(g,{opacity:0});
 let ln=null;if(o.to){ln=L(q,x,y+25,o.to[0],o.to[1],'#fff',3.5,{'stroke-dasharray':'400','stroke-dashoffset':'400'})}
 R(q,x-w/2,y-26,w,52,fill,{rx:26,stroke:'#fff','stroke-width':3});T(q,x,y+10,txt,28,o.tc||'#fff',{'letter-spacing':1.5});
 return u=>{const k=eb(u);A(q,{opacity:clamp(u*4),transform:`translate(${x} ${y}) scale(${.8+.2*k}) translate(${-x} ${-y})`});if(ln)A(ln,{'stroke-dashoffset':400*(1-eo(u*1.4))})}}
function ruleCard(g,x,y,num,txt){const q=G(g,{opacity:0});R(q,x-290,y,580,150,'#f7f3e6',{rx:18,stroke:'#cfc7a8','stroke-width':3});
 R(q,x-290,y,170,46,PAL.red,{rx:14});T(q,x-205,y+33,'RULE #'+num,28,'#fff',{'letter-spacing':2});
 T(q,x-30,y+106,txt,44,'#1b1710');
 P(q,`M${x+250},${y+16} L${x+276},${y+60} L${x+224},${y+60}Z`,PAL.yel,{stroke:'#1b1710','stroke-width':4,'stroke-linejoin':'round'});T(q,x+250,y+54,'!',26,'#1b1710');
 return u=>{const k=eb(u);A(q,{opacity:clamp(u*4),transform:`translate(0 ${(1-k)*80})`})}}
function meterCard(g,x,y,icon,label,val,unit,delta,tcount){const q=G(g,{opacity:0});
 R(q,x-250,y,500,210,'#f7f3e6',{rx:22,stroke:'#cfc7a8','stroke-width':3});
 C(q,x-186,y+105,46,'#1d1d22');
 if(icon==='food'){P(q,`M${x-212},${y+98} Q${x-186},${y+138} ${x-160},${y+98}Z`,'#fff');R(q,x-216,y+93,60,7,'#fff',{rx:3})}
 if(icon==='water'){P(q,`M${x-186},${y+68} Q${x-158},${y+104} ${x-170},${y+122} Q${x-186},${y+138} ${x-202},${y+122} Q${x-214},${y+104} ${x-186},${y+68}Z`,'#5ec8ff')}
 if(icon==='fuel'){R(q,x-210,y+82,48,42,'#ffca28',{rx:5});R(q,x-204,y+72,16,12,'#ffca28');R(q,x-198,y+98,26,7,'#7a5a00')}
 T(q,x-120,y+58,label,26,'#6b5f45',{'text-anchor':'start','letter-spacing':2});
 const num=T(q,x-120,y+140,'0',84,'#1f1a10',{'text-anchor':'start'});const un=T(q,x+0,y+140,unit,32,'#6b5f45',{'text-anchor':'start'});
 R(q,x+130,y+22,100,38,PAL.green,{rx:19});T(q,x+180,y+49,delta,24,'#fff');
 return u=>{const k=eb(u*2.5);A(q,{opacity:clamp(u*6),transform:`translate(0 ${(1-k)*60})`});const v=Math.round(val*eo(clamp((u-.1)/.7)));num.textContent=String(v);A(un,{x:x-120+num.getComputedTextLength()+12})}}
function timerChip(g,x,y,getText){const q=G(g,{opacity:0});R(q,x-180,y,360,66,'#0b0f18',{rx:33,stroke:'#ff5a4a','stroke-width':3});
 C(q,x-142,y+33,18,'none',{stroke:'#ff5a4a','stroke-width':4});L(q,x-142,y+33,x-142,y+22,'#ff5a4a',4);L(q,x-142,y+33,x-134,y+38,'#ff5a4a',4);
 const t=T(q,x+22,y+44,'',30,'#ff5a4a',{'font-family':'DejaVu Sans Mono, monospace','font-weight':700});
 return (u,tt)=>{pop({setAttribute:(k,v)=>q.setAttribute(k,v)},clamp(u*4));t.textContent=getText(u,tt)}}
function callout(g,x,y,icon,txt,w){const q=G(g,{opacity:0});w=w||300;R(q,x-w/2,y,w,60,'#0b1630',{rx:14,stroke:'#6ae6ff','stroke-width':2.5});C(q,x-w/2+30,y+30,15,PAL.yel);T(q,x+16,y+40,txt,26,'#fff',{'font-weight':800});
 return u=>{const k=eb(u);A(q,{opacity:clamp(u*4),transform:`translate(${(1-k)*30} 0)`})}}
function checklist(g,x,y,vals,progress){/* returns update(u,t) ; progress(u)->[p0,p1,p2,stamp] */
 const q=G(g,{});R(q,x-300,y+10,600,620,'#000',{rx:24,opacity:.35,filter:'url(#b10)'});
 R(q,x-300,y,600,620,'#f2e8c8',{rx:24,stroke:'#bfae80','stroke-width':3});R(q,x-80,y-26,160,52,'#a89466',{rx:12});
 T(q,x,y+62,'SUPPLIES — DAY 1',38,'#2a2418',{'letter-spacing':3});L(q,x-250,y+84,x+250,y+84,'#2a2418',3,{'stroke-linecap':'butt'});
 const rows=[['DRY FOOD','DAYS','food'],['FRESH WATER','GAL','water'],['DIESEL FUEL','GAL','fuel']].map((r,i)=>{const yy=y+108+i*136;
  C(q,x-232,yy+52,34,'#1d1d22');
  if(i==0){P(q,`M${x-254},${yy+48} Q${x-232},${yy+80} ${x-210},${yy+48}Z`,'#fff')}if(i==1){P(q,`M${x-232},${yy+26} Q${x-210},${yy+52} ${x-220},${yy+68} Q${x-232},${yy+78} ${x-244},${yy+68} Q${x-254},${yy+52} ${x-232},${yy+26}Z`,'#5ec8ff')}if(i==2){R(q,x-252,yy+36,38,34,'#ffca28',{rx:4})}
  T(q,x-182,yy+30,r[0],22,'#6b5f45',{'text-anchor':'start','letter-spacing':2,'font-weight':800});
  const num=T(q,x-182,yy+92,'--',64,'#1f1a10',{'text-anchor':'start'});const un=T(q,x-100,yy+92,r[1],26,'#6b5f45',{'text-anchor':'start'});
  const dots=[];for(let d=0;d<12;d++)dots.push(C(q,x+20+d*17,yy+38,5.5,'#cfc29a'));
  const chk=G(q,{opacity:0});C(chk,x+244,yy+62,24,PAL.green);P(chk,`M${x+232},${yy+62} L${x+241},${yy+72} L${x+258},${yy+51}`,'none',{stroke:'#fff','stroke-width':6,'stroke-linecap':'round','stroke-linejoin':'round'});
  return {num,un,dots,chk,v:vals[i]}});
 const stamp=G(q,{opacity:0});R(stamp,-190,-56,380,112,'none',{stroke:'#d11f2a','stroke-width':9,rx:12});R(stamp,-178,-44,356,88,'none',{stroke:'#d11f2a','stroke-width':3,rx:8});T(stamp,0,24,'6+ MONTHS',66,'#d11f2a',{'letter-spacing':4});
 return (u,t)=>{const pr=progress(u);rows.forEach((r,i)=>{const p=pr[i];r.num.textContent=p>0?String(Math.round(r.v*eo(p))):'--';A(r.un,{x:x-182+(p>0?r.num.getComputedTextLength():36)+12});
   r.dots.forEach((d,k)=>A(d,{fill:k<Math.round(p*12)&&p>0?'#3fa35f':'#cfc29a'}));A(r.chk,{opacity:clamp((p-.92)*12)})});
   const s=pr[3];const sc=lerp(3.2,1,eo(clamp(s*4)));A(stamp,{opacity:s>0?1:0,transform:`translate(${x+(s>0&&s<.3?Math.sin(s*220)*(1-s/.3)*10:0)} ${y+562}) rotate(-11) scale(${sc})`})}}
function notepad(g,x,y,title,scribbles){title=title||'SUPPLIES — DAY 1';const q=G(g,{opacity:0});R(q,x-290,y+12,580,560,'#000',{rx:12,opacity:.35,filter:'url(#b10)'});R(q,x-290,y,580,560,'#f7f3e6',{rx:10});
 for(let i=0;i<10;i++)L(q,x-270,y+120+i*44,x+270,y+120+i*44,'#7aa6d6',2,{'stroke-linecap':'butt'});L(q,x-210,y,x-210,y+560,'#e08a8a',2.5,{'stroke-linecap':'butt'});
 R(q,x-90,y-18,180,40,'#d9c890',{rx:4,opacity:.9,transform:`rotate(-3 ${x} ${y})`});
 T(q,x,y+84,title,40,'#223',{'letter-spacing':2});
 const sc=[];for(let i=0;i<(scribbles===false?0:4);i++){const yy=y+160+i*88;sc.push(P(q,`M${x-190},${yy} q20,-26 40,0 t40,0 t40,0 t40,0 t40,0 t30,0`,'none',{stroke:'#2a3a5a','stroke-width':5,'stroke-linecap':'round','stroke-dasharray':'700','stroke-dashoffset':'700'}));C(q,x-230,yy-4,8,'none',{stroke:'#2a3a5a','stroke-width':4})}
 return u=>{const k=eb(u*3);A(q,{opacity:clamp(u*6),transform:`translate(0 ${(1-k)*80}) rotate(${(1-k)*-3} ${x} ${y})`});sc.forEach((s,i)=>A(s,{'stroke-dashoffset':700*(1-eo(clamp((u-.1-i*.15)/.35)))}))}}
function endHud(){return null}
