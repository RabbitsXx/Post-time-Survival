/* ===== THE LAST SUNRISE — scene library 1: shared pieces, dog, people, space, sky, town, thermometer, power grid ===== */
let _uid=0;const uid=p=>p+(++_uid);
const mixc=(a,b,k)=>{const A_=hex2(a),B_=hex2(b);return col2(A_.map((v,i)=>v+(B_[i]-v)*clamp(k)))};
function defsSun(){document.getElementById('defs').insertAdjacentHTML('beforeend',`
 <linearGradient id="gDeadSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#010208"/><stop offset=".6" stop-color="#070d1f"/><stop offset="1" stop-color="#14223c"/></linearGradient>
 <linearGradient id="gColdSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02050e"/><stop offset=".55" stop-color="#0b1a34"/><stop offset="1" stop-color="#2a4a70"/></linearGradient>
 <linearGradient id="gSnowGnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3d6ea"/><stop offset=".45" stop-color="#7592b8"/><stop offset="1" stop-color="#1b2a46"/></linearGradient>
 <linearGradient id="gCaveBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120a0e"/><stop offset=".6" stop-color="#2a1612"/><stop offset="1" stop-color="#3b2014"/></linearGradient>
 <radialGradient id="gLantern"><stop offset="0" stop-color="#ffd890" stop-opacity=".95"/><stop offset=".35" stop-color="#ff9a3a" stop-opacity=".45"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gGrow"><stop offset="0" stop-color="#ff8ae0" stop-opacity=".85"/><stop offset=".45" stop-color="#b24ae0" stop-opacity=".38"/><stop offset="1" stop-color="#6a2adf" stop-opacity="0"/></radialGradient>
 <linearGradient id="gGrowCone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc2f2" stop-opacity=".6"/><stop offset="1" stop-color="#ffc2f2" stop-opacity="0"/></linearGradient>
 <radialGradient id="gSteam"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".6" stop-color="#eaf4ff" stop-opacity=".3"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
 <radialGradient id="gSunHalo"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".3" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gEmberHalo"><stop offset="0" stop-color="#ff4a1a" stop-opacity=".5"/><stop offset="1" stop-color="#7a1010" stop-opacity="0"/></radialGradient>
 <linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63e6d4"/><stop offset="1" stop-color="#17808f"/></linearGradient>
 <linearGradient id="gDawnCave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1040"/><stop offset=".5" stop-color="#a0406a"/><stop offset="1" stop-color="#ffb066"/></linearGradient>
 <linearGradient id="gIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6f1fa"/><stop offset=".5" stop-color="#7fb8d0"/><stop offset="1" stop-color="#27506e"/></linearGradient>
 <linearGradient id="gDayHill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f8a62"/><stop offset="1" stop-color="#2f5a3c"/></linearGradient>`)}

/* ---------- small shared pieces ---------- */
function chip(g,txt,x,y,fill,o){o=o||{};const w=Math.max(180,txt.length*19+60),q=G(g,{opacity:0});R(q,x-w/2,y-26,w,52,fill,{rx:26,stroke:'#fff','stroke-width':3});T(q,x,y+9,txt,26,o.tc||'#fff',{'letter-spacing':1.2});
 return u=>{const k=eb(u);A(q,{opacity:clamp(u*4),transform:`translate(${x} ${y}) scale(${.8+.2*k}) translate(${-x} ${-y})`})}}
function ruleCard2(g,x,y,num,txt){const q=G(g,{opacity:0});const words=txt.split(' ');let l1=txt,l2='';
 if(txt.length>15){const mid=txt.length/2;let best=0,bd=1e9,pos=0;words.forEach((w,i)=>{pos+=w.length+1;if(i<words.length-1){const d=Math.abs(pos-mid);if(d<bd){bd=d;best=i}}});l1=words.slice(0,best+1).join(' ');l2=words.slice(best+1).join(' ')}
 const two=!!l2,H=two?196:150;R(q,x-290,y,580,H,'#f7f3e6',{rx:18,stroke:'#cfc7a8','stroke-width':3});R(q,x-290,y,170,46,PAL.red,{rx:14});T(q,x-205,y+33,'RULE #'+num,28,'#fff',{'letter-spacing':2});
 const fs=Math.min(48,Math.floor(430/(Math.max(l1.length,l2.length)*.62)));
 if(two){T(q,x-20,y+100,l1,fs,'#1b1710');T(q,x-20,y+100+fs+6,l2,fs,'#1b1710')}else T(q,x-20,y+106,l1,fs,'#1b1710');
 P(q,`M${x+250},${y+16} L${x+276},${y+60} L${x+224},${y+60}Z`,PAL.yel,{stroke:'#1b1710','stroke-width':4,'stroke-linejoin':'round'});T(q,x+250,y+54,'!',26,'#1b1710');
 return u=>{const k=eb(u);A(q,{opacity:clamp(u*4),transform:`translate(0 ${(1-k)*80})`})}}
function snowFx(g,n,seed){const a=[];for(let i=0;i<n;i++)a.push(C(g,0,0,1.3+rnd(i+(seed||0))*2.8,'#fff',{opacity:.5+rnd(i+(seed||0)+3)*.45}));return a}
function updSnow(a,t,sp,wind,H){H=H||1320;a.forEach((c,i)=>{const s=(.55+rnd(i+11))*(sp||1);const y=((rnd(i)*H+t*70*s)%(H+60))-30;const x=((((rnd(i+5)*840+t*(wind==null?16:wind)*s+Math.sin(t*.8+i)*14)%860)+860)%860)-70;A(c,{cx:x,cy:y})})}
function steamCol(g,x,y,n,w,col){const a=[];for(let i=0;i<n;i++)a.push([C(g,0,0,20,col||'url(#gSteam)'),i]);return {a,x,y,w}}
function updSteam(S,t,h,sp){S.a.forEach(([c,i])=>{const p=((t*(sp||.12)+i/S.a.length)%1);A(c,{cx:S.x+Math.sin(p*6+i*1.7)*S.w*(.3+p),cy:S.y-p*h,r:18+p*S.w*1.2,opacity:.85*Math.sin(Math.PI*clamp(p))*(.5+.5*rnd(i))})})}
function person(g,x,y,s,col,o){o=o||{};const q=G(g,{transform:`translate(${x} ${y}) scale(${s*(o.flip?-1:1)} ${s})`});
 if(o.sit){limb(q,[[-12,-26],[22,-26],[26,0]],13,col);limb(q,[[0,-30],[0,-84]],30,col);C(q,0,-106,16,col);limb(q,[[-12,-78],[-20,-52],[8,-40]],10,col);limb(q,[[12,-78],[22,-52],[8,-40]],10,col);return q}
 limb(q,[[-9,-60],[-11,-28],[-11,0]],12,col);limb(q,[[9,-60],[11,-28],[11,0]],12,col);limb(q,[[0,-64],[0,-112]],30,col);C(q,0,-134,16,col);
 if(o.up){limb(q,[[-14,-108],[-30,-132],[-24,-160]],10,col);limb(q,[[14,-108],[30,-132],[24,-160]],10,col)}
 else if(o.carry){limb(q,[[-14,-108],[-26,-84],[-6,-70]],10,col);limb(q,[[14,-108],[26,-84],[6,-70]],10,col)}
 else{limb(q,[[-14,-108],[-22,-80],[-20,-56]],10,col);limb(q,[[14,-108],[22,-80],[20,-56]],10,col)}
 if(o.hood)P(q,'M-16,-136 Q0,-162 16,-136 Q8,-124 0,-122 Q-8,-124 -16,-136Z',col);
 return q}
function personWithLight(g,x,y,s,col,rim){const q=person(g,x,y,s,col);if(rim){A(q,{filter:'none'})}return q}

/* ---------- Ember, the dog (side view, faces +x). pose: stand | walk | sit | lie ---------- */
function dog(g,o){o=o||{};const SIL=!!o.sil;const s=o.s||1,fl=o.flip?-1:1,col=SIL?'#05070c':(o.col||'#d98b3a'),colS=SIL?'#05070c':'#a7622a',cream=SIL?'#05070c':'#f6ead3',ink=SIL?'#05070c':'#2a1c13',pose=o.pose||'stand';
 const root=G(g,{});A(root,{transform:`translate(${o.x||0} ${o.y||0}) scale(${s*fl} ${s})`});root._b={x:o.x||0,y:o.y||0,s,fl};
 if(!o.noShadow)E('ellipse',{cx:0,cy:2,rx:64,ry:7,fill:'#000',opacity:.28},root);
 const D={root,legs:[],tail:null,head:null,pose};
 const paw=(q,x,y)=>E('ellipse',{cx:x+4,cy:y-2,rx:12,ry:7.5,fill:o.boots?'#d9302a':cream,stroke:ink,'stroke-width':2.4},q);
 const leg=(hx,hy,fill,w,ph)=>{const q=G(root,{});tube(q,[[hx,hy],[hx+2,hy+28],[hx+3,-6]],w,fill,ink);paw(q,hx+2,0);if(o.boots){R(q,hx-8,-26,22,20,'#d9302a',{rx:5,stroke:ink,'stroke-width':2.4});R(q,hx-9,-27,24,7,'#f3e6cf',{rx:3,stroke:ink,'stroke-width':2})}D.legs.push({q,hx,hy,ph});return q};
 const headAt=(hx,hy)=>{const h=G(root,{});
  C(h,hx,hy,27,col,{stroke:ink,'stroke-width':3});
  blob(h,`M${hx+14},${hy+2} Q${hx+34},${hy-8} ${hx+46},${hy+2} Q${hx+50},${hy+16} ${hx+34},${hy+20} Q${hx+16},${hy+22} ${hx+12},${hy+12}Z`,cream,ink);
  C(h,hx+46,hy+2,5.2,ink);
  E('ellipse',{cx:hx+8,cy:hy-7,rx:4.6,ry:5.2,fill:ink},h);C(h,hx+9.6,hy-8.8,1.6,'#fff');
  L(h,hx+2,hy-18,hx+16,hy-21,ink,2.8);
  E('path',{d:`M${hx+26},${hy+16} Q${hx+34},${hy+22} ${hx+42},${hy+15}`,fill:'none',stroke:ink,'stroke-width':2.4,'stroke-linecap':'round'},h);
  blob(h,`M${hx-6},${hy-22} Q${hx-30},${hy-14} ${hx-22},${hy+20} Q${hx-6},${hy+14} ${hx+2},${hy-12}Z`,colS,ink);
  if(o.tongue)E('ellipse',{cx:hx+34,cy:hy+24,rx:6,ry:9,fill:'#f07a8a',stroke:ink,'stroke-width':2},h);
  return h};
 if(pose==='lie'){
  const tl=G(root,{});tube(tl,[[-58,-26],[-92,-30],[-98,-56]],13,col,ink);D.tail=tl;D.tp=[-58,-26];
  blob(root,'M-66,-26 Q-62,-62 -12,-64 Q40,-66 62,-40 Q66,-10 40,-4 L-40,-4 Q-66,-6 -66,-26Z',col,ink);
  E('ellipse',{cx:-30,cy:-36,rx:34,ry:22,fill:colS,opacity:.45},root);
  D.head=headAt(66,-36);
  E('ellipse',{cx:98,cy:-8,rx:17,ry:8,fill:cream,stroke:ink,'stroke-width':2.4},root);E('ellipse',{cx:70,cy:-5,rx:17,ry:8,fill:cream,stroke:ink,'stroke-width':2.4},root);
  return D}
 if(pose==='sit'){
  const tl=G(root,{});tube(tl,[[-44,-6],[-76,-8],[-86,-30]],13,col,ink);D.tail=tl;D.tp=[-44,-6];
  const b=G(root,{transform:'rotate(-36 -34 -10)'});
  const q0=G(b);tube(q0,[[28,-52],[30,-26],[30,-6]],15,colS,ink);
  blob(b,'M-60,-70 Q-58,-100 -20,-102 L30,-102 Q64,-98 66,-66 Q64,-34 30,-32 L-30,-32 Q-60,-36 -60,-70Z',col,ink);
  E('ellipse',{cx:46,cy:-62,rx:20,ry:26,fill:cream},b);
  const q1=G(b);tube(q1,[[34,-50],[36,-26],[37,-6]],15,col,ink);E('ellipse',{cx:41,cy:-3,rx:12,ry:7.5,fill:cream,stroke:ink,'stroke-width':2.4},q1);
  D.head=null;const hh=G(b);hh.appendChild(headAt(76,-112));
  E('ellipse',{cx:-34,cy:-22,rx:32,ry:26,fill:col,stroke:ink,'stroke-width':3},root);E('ellipse',{cx:-8,cy:-4,rx:17,ry:7.5,fill:cream,stroke:ink,'stroke-width':2.4},root);
  return D}
 // stand / walk
 const tl=G(root,{});tube(tl,[[0,0],[-24,-12],[-32,-40]],13,col,ink);A(tl,{transform:'translate(-58 -78)'});D.tail=tl;D.tp=[-58,-78];
 leg(28,-52,colS,15,0);leg(-34,-54,colS,16,Math.PI);
 blob(root,'M-62,-70 Q-60,-100 -20,-102 L30,-102 Q64,-98 66,-66 Q64,-34 30,-32 L-30,-32 Q-62,-36 -62,-70Z',col,ink);
 E('ellipse',{cx:-6,cy:-78,rx:46,ry:16,fill:colS,opacity:.35},root);
 E('ellipse',{cx:46,cy:-62,rx:20,ry:26,fill:cream},root);
 leg(34,-50,col,15,Math.PI);leg(-38,-52,col,16,0);
 tube(root,[[58,-96],[76,-98]],22,col,null);
 D.head=headAt(80,-112);
 E('path',{d:'M58,-90 Q70,-80 86,-90',fill:'none',stroke:SIL?'#05070c':'#d9302a','stroke-width':7,'stroke-linecap':'round'},root);
 return D}
function dogMove(D,t,sp){sp=sp==null?0:sp;const b=D.root._b;const bob=D.pose==='walk'?Math.abs(Math.sin(t*sp*1.0))*-3:Math.sin(t*1.4)*1.2;
 A(D.root,{transform:`translate(${b.x} ${b.y+bob}) scale(${b.s*b.fl} ${b.s})`});
 D.legs.forEach(l=>A(l.q,{transform:`rotate(${D.pose==='walk'?Math.sin(t*sp+l.ph)*24:0} ${l.hx} ${l.hy})`}));
 if(D.tail&&D.tp)A(D.tail,{transform:`translate(${D.tp[0]} ${D.tp[1]}) rotate(${Math.sin(t*(D.pose==='lie'?1.2:6))*(D.pose==='lie'?5:16)})`})}

/* ---------- space: the dead sun, the last light flying to Earth ---------- */
LIB.spaceViz=(Z,p)=>{
 const f=G(Z.far),m0=G(Z.mid),n=G(Z.near);const k=p.kind||'dark';const m=p.view==='earth'?G(m0,{transform:'translate(-300 -470) scale(1.5)'}):m0;
 R(f,-300,-300,1320,1880,'url(#gDeadSky)');const st=stars(f,100,1100,17);
 const CV=!!window.COVER;const SX=96,SY=270,SR=184,EX=CV?560:572,EY=CV?500:612,ER=CV?120:98;
 const dx=EX-SX,dy=EY-SY,dl=Math.hypot(dx,dy),ux=dx/dl,uy=dy/dl;
 const x0=SX+ux*SR,y0=SY+uy*SR,x1=EX-ux*ER,y1=EY-uy*ER;
 C(m,SX,SY,SR*1.8,'url(#gEmberHalo)');C(m,SX,SY,SR,'#0b0508');
 const rim=C(m,SX,SY,SR,'none',{stroke:'#ff5a2a','stroke-width':7,opacity:.7});
 const crk=P(m,`M${SX+40},${SY-160} l-26,58 l32,36 l-24,52 l28,44`,'none',{stroke:'#ff6a2a','stroke-width':4,'stroke-linejoin':'round','stroke-linecap':'round',opacity:.8});
 if(!CV)T(m,SX+96,SY+14,'THE SUN',32,'#a98a86',{'letter-spacing':4});
 L(m,x0,y0,x1,y1,'#6a86b0',2.5,{'stroke-dasharray':'3 11',opacity:.55});
 const mx=(x0+x1)/2,my=(y0+y1)/2,ang=Math.atan2(dy,dx)*180/Math.PI;
 const EV=p.view==='earth';const lab=T(m,0,0,(CV||EV)?'':'93 MILLION MILES',30,'#9fb4e0',{'letter-spacing':3,'font-weight':800});A(lab,{transform:`translate(${mx-uy*46} ${my+ux*46}) rotate(${ang})`});
 // Earth
 const eg=G(m);const cid=uid('ec');const cp=E('clipPath',{id:cid},eg);C(cp,EX,EY,ER,'#fff');
 C(eg,EX,EY,ER*1.4,'#6ec6ff',{opacity:.2,filter:'url(#b10)'});C(eg,EX,EY,ER,'#2a68b0');
 const cont=G(eg,{'clip-path':`url(#${cid})`});
 P(cont,`M${EX-64},${EY-30} Q${EX-34},${EY-74} ${EX+8},${EY-52} Q${EX+40},${EY-20} ${EX+12},${EY+10} Q${EX-10},${EY+42} ${EX-44},${EY+20}Z`,'#4ea45e');
 P(cont,`M${EX+30},${EY+18} Q${EX+60},${EY+4} ${EX+72},${EY+30} Q${EX+54},${EY+62} ${EX+26},${EY+48}Z`,'#7fa24a');
 P(cont,`M${EX-34},${EY-84} Q${EX},${EY-96} ${EX+34},${EY-84} L${EX+30},${EY-70} Q${EX},${EY-80} ${EX-30},${EY-70}Z`,'#f1f6fa');
 const lit=C(cont,EX-ux*ER*.45,EY-uy*ER*.45,ER*1.0,'url(#gSunHalo)',{opacity:.8});
 const nite=C(cont,EX+ux*ER*1.25,EY+uy*ER*1.25,ER*1.4,'#02040a',{opacity:.58});
 const blk=C(cont,EX,EY,ER,'#02040a',{opacity:0});
 C(eg,EX,EY,ER,'none',{stroke:'#8fd0ff','stroke-width':3,opacity:.55});
 if(!CV)T(m,EX,EY+ER+44,'EARTH',34,'#9fb4e0',{'letter-spacing':4});
 // the last light: a short train of photons, nothing behind it
 const ph=[];for(let i=0;i<9;i++)ph.push({g:C(m,0,0,20,'url(#gSunHalo)'),c:C(m,0,0,7.5,'#fff3c0')});
 const tag=G(m,CV?{display:'none'}:{});R(tag,-96,-24,192,44,'#0b1226',{rx:22,stroke:'#ffd27a','stroke-width':3});T(tag,0,8,'LAST LIGHT',24,'#ffd27a',{'letter-spacing':2});
 const tc=p.count?timerChip(Z.hud,360,90,(u)=>{const s=Math.round(lerp(p.count[0],p.count[1],clamp(u)));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}):null;
 return (u,t,bt)=>{twinkle(st,t);
  A(rim,{opacity:lerp(.8,.25,u)});A(crk,{opacity:.4+.4*(1-u)});
  const head=k==='dark'?lerp(.02,.40,u):(k==='travel'?lerp(.40,.8,u):lerp(.72,1.02,clamp(u*1.1)));
  ph.forEach((d,i)=>{const pos=head-i*.052;const vis=pos>=0&&pos<=1?1:0;const px=lerp(x0,x1,clamp(pos)),py=lerp(y0,y1,clamp(pos));A(d.c,{cx:px,cy:py,opacity:vis});A(d.g,{cx:px,cy:py,opacity:vis*.9})});
  const hp=clamp(head);A(tag,{transform:`translate(${lerp(x0,x1,hp)+(EV?-1:1)*uy*96+(EV?70:24)} ${lerp(y0,y1,hp)-(EV?-1:1)*ux*96-6})`,opacity:(k==='arrive'&&u>.75)?0:1});
  if(k==='arrive'){const d=clamp((u-.78)/.22);A(lit,{opacity:.8*(1-d)});A(blk,{opacity:.88*d})}
  if(tc)tc(clamp(bt/.3),t)}};

/* ---------- the sky over the mountain town: bright -> sun fades -> black noon ---------- */
LIB.sunSky=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const st=Array.isArray(p.stage)?p.stage:[p.stage||0,p.stage||0];
 R(f,-300,-300,1320,1880,'url(#gDay)');
 const dusk=R(f,-300,-300,1320,1880,'url(#gBurn)',{opacity:0});const dk=R(f,-300,-300,1320,1880,'#01030a',{opacity:0});
 const sg=G(f,{opacity:0});stars(sg,110,600,9);
 const sun=G(f);C(sun,500,270,250,'url(#gSunHalo)');const disc=C(sun,500,270,70,'#fff4c8');const ring=C(sun,500,270,74,'none',{stroke:'#ff5a2a','stroke-width':5,opacity:0});
 const cl=clouds(f,180,5,'#ffffff',3);
 // hills + town
 const hills=P(m,'M-300,700 L-300,540 Q-120,470 80,540 Q250,430 430,520 Q600,430 780,520 L1020,560 L1020,700Z','#587a66');
 const hills2=P(m,'M-300,700 L-300,600 Q-60,560 160,610 Q360,560 560,612 Q760,570 1020,610 L1020,700Z','#355a44');
 const houses=[];for(let i=0,x=-20;x<760;i++){const w=46+rnd(i+1)*40,h=36+rnd(i+7)*60;const b=R(m,x,660-h,w,h+40,'#2b3a4a');const rf=P(m,`M${x-4},${660-h} L${x+w/2},${660-h-26} L${x+w+4},${660-h}Z`,'#46302a');const wins=[];for(let r=0;r<h/22;r++)for(let c=0;c<w/16;c++)if(rnd(i*13+r*5+c)>.45)wins.push(R(m,x+6+c*16,660-h+8+r*22,8,11,'#ffcf7a',{opacity:0}));houses.push({b,rf,wins,i});x+=w+3+rnd(i+3)*10}
 const spire=P(m,'M432,630 L432,520 L442,490 L452,520 L452,630Z','#2b3a4a');
 R(m,-300,690,1320,700,'#25303a');R(m,-300,690,1320,6,'#111a22',{opacity:.7});
 // streetlights
 const lamps=[];for(const x of[90,330,590]){R(m,x-4,560,8,140,'#111820');const g=C(m,x,556,70,'url(#gLantern)',{opacity:0});const b=C(m,x,556,9,'#3a3a40');lamps.push({g,b})}
 // people looking up
 const ppl=[];[150,214,282,420,486,552].forEach((x,i)=>{ppl.push(person(m,x,740,.62,'#0b0f18',{up:false}))});
 const sCol=(s)=>mixc('#587a66','#05080c',clamp(s/1.9));
 return (u,t,bt)=>{const s=lerp(st[0],st[1],ease(u));
  A(dusk,{opacity:clamp(s)*clamp(2-s)*.95});A(dk,{opacity:clamp((s-1.0)/0.9)});A(sg,{opacity:clamp((s-1.4)/.5)});
  const dOp=1-clamp((s-.7)/.9);A(disc,{r:70*(1-.35*clamp(s)),fill:mixc('#fff4c8','#ff6a2a',clamp(s*1.2)),opacity:dOp});A(sun.children[0],{opacity:dOp});A(ring,{opacity:clamp((s-.9)*3)*clamp((1.9-s)*2)});
  driftClouds(cl,t);cl.forEach(([e])=>A(e,{opacity:.55*(1-clamp(s/1.2))}));
  A(hills,{fill:sCol(s)});A(hills2,{fill:mixc('#355a44','#04070a',clamp(s/1.7))});
  houses.forEach(h=>{A(h.b,{fill:mixc('#2b3a4a','#0a0f16',clamp(s/1.7))});A(h.rf,{fill:mixc('#46302a','#0c0a0c',clamp(s/1.7))});h.wins.forEach((w,j)=>A(w,{opacity:clamp((s-1.45-rnd(h.i*3+j)*.4)*3)*.9}))});
  lamps.forEach(l=>{const on=clamp((s-1.5)*3);A(l.g,{opacity:on});A(l.b,{fill:on>.3?'#fff0b0':'#3a3a40'})});
  ppl.forEach((q,i)=>{const up=s>1.2;A(q,{opacity:1})})}};

/* ---------- the frozen town street (flat storefront view) ---------- */
LIB.town=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const sn=p.snow==null?.6:p.snow,lights=p.lights||'dead',nf=p.fires||0;
 R(f,-300,-300,1320,1880,'url(#gColdSky)');const st=stars(f,80,520,21);
 const HY=560;
 // far mountains
 P(f,`M-300,${HY-40} L-300,420 L-120,330 L40,450 L220,300 L420,470 L600,340 L780,440 L1020,390 L1020,${HY-40}Z`,'#13223a');P(f,`M-120,330 L-60,382 L-18,368 L40,450 L-20,420Z M220,300 L270,366 L300,350 L420,470 L330,420Z M600,340 L650,396 L690,380 L780,440 L700,420Z`,'#b8d0e8',{opacity:.55});
 // buildings
 const lit=[];let x=-30;const B=[];for(let i=0;x<760;i++){const w=96+rnd(i+2)*70,h=190+rnd(i+9)*190;B.push([x,w,h,i]);x+=w+6}
 B.forEach(([x,w,h,i])=>{R(m,x,HY-h,w,h+40,['#18243a','#1d2a42','#14202f'][i%3]);
  for(let r=0;r<Math.floor(h/46);r++)for(let c=0;c<Math.floor(w/32);c++){const on=rnd(i*17+r*5+c)<(p.lit||0);const wn=R(m,x+10+c*32,HY-h+16+r*46,18,26,on?'#ffcf7a':'#0c1422',{opacity:on?.92:.9});if(on)lit.push([wn,i+r+c])}
  R(m,x-3,HY-h-8,w+6,12+sn*14,'#e9f2fb',{rx:6,opacity:.4+sn*.55});
  if(p.smoke&&i%3===1){}})
 R(m,-300,HY,1320,60,'#23324a');R(m,-300,HY,1320,5,'#4a6288',{opacity:.7});
 // street + snow banks
 R(m,-300,HY+55,1320,700,'#141d30');
 for(let i=0;i<12;i++)E('ellipse',{cx:i*70+rnd(i)*20,cy:HY+52+rnd(i+4)*10,rx:46+rnd(i)*40,ry:8+sn*20*rnd(i+3)+sn*6,fill:'#e4eefa',opacity:.35+sn*.55},m);
 // stalled cars (snow caps)
 if(p.cars!==0){[[150,HY+104,.9,'#6a3a44'],[560,HY+112,1.0,'#2e5a70']].forEach(([cx,cy,s,fill])=>{car(m,cx,cy,s,fill);P(m,`M${cx-50*s},${cy-90*s} Q${cx},${cy-110*s} ${cx+64*s},${cy-88*s} L${cx+50*s},${cy-96*s} Q${cx},${cy-100*s} ${cx-40*s},${cy-98*s}Z`,'#f1f7ff',{opacity:.35+sn*.6})})}
 // streetlights
 const lamps=[];[70,360,650].forEach((lx,i)=>{R(m,lx-5,HY-250,10,260,'#0b121e');R(m,lx-5,HY-256,46,8,'#0b121e');const g=C(m,lx+34,HY-244,120,'url(#gLantern)',{opacity:0});const b=C(m,lx+34,HY-246,10,'#2a2a30');lamps.push({g,b,i})});
 // barrel fires + people
 const fl=[];[[260,HY+88],[470,HY+92],[360,HY+84]].slice(0,nf).forEach(([fx,fy],i)=>{R(m,fx-22,fy-34,44,40,'#3a2a22',{rx:4});C(m,fx,fy-70,130,'url(#gFire)',{opacity:.55});fl.push(flames(m,fx,fy-30,34,6,i*5+2));
  [-1,1].forEach((sd,j)=>person(m,fx+sd*(64+j*6),fy+14,.5,'#05070c',{carry:true,flip:sd<0}))});
 if(p.people){for(let i=0;i<p.people;i++)person(m,70+i*(600/p.people),HY+128+(i%2)*14,.52,'#05070c',{up:i%3==0})}
 const sf=snowFx(n,Math.round(50+sn*110),2);R(n,-300,1000,1320,500,'#070b14',{opacity:.6});
 const fr=p.frost?G(Z.hud):null;if(fr){for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const cx=360+Math.cos(a)*470,cy=640+Math.sin(a)*640;C(fr,cx,cy,120+rnd(i)*120,'#dff0ff',{opacity:.16*p.frost,filter:'url(#b24)'})}}
 return (u,t,bt)=>{twinkle(st,t);updSnow(sf,t,1,12);
  lit.forEach(([w,i])=>A(w,{opacity:.78+.14*Math.sin(t*.9+i)}));
  lamps.forEach(l=>{let on=lights==='on'?1:(lights==='flicker'?(.55+.35*Math.sin(t*2.1+l.i*2)):0);if(lights==='dying')on=clamp(1-bt/1.8);A(l.g,{opacity:on});A(l.b,{fill:on>.3?'#fff0b0':'#2a2a30'})});
  fl.forEach(a=>updFlames(a,t,1))}};

/* ---------- thermometer card: big number + the week's graph ---------- */
const TEMPS=[15,6,-1,-7,-12,-15,-17];
LIB.thermo=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 R(f,-300,-300,1320,1880,'#050b16');C(f,360,380,520,'url(#gGlow)',{opacity:.12});
 const outside=p.kind==='outside';
 if(outside){P(m,'M-300,760 L-300,560 Q-120,500 60,560 Q240,470 420,550 Q600,480 780,560 L1020,540 L1020,760Z','#122036');P(m,'M-300,760 L-300,640 Q-60,600 200,650 Q420,600 640,650 Q800,620 1020,650 L1020,760Z','#c3d6ea',{opacity:.55});
  for(let i=0;i<8;i++)P(m,`M${60+i*90},700 l12,-60 l12,60Z`,'#0c1626')}
 // thermometer (left)
 const TX=84,TY0=170,TY1=470;R(m,TX-24,TY0,48,TY1-TY0+26,'#101a2c',{rx:24,stroke:'#46557d','stroke-width':5});C(m,TX,TY1+34,38,'#101a2c',{stroke:'#46557d','stroke-width':5});
 const merc=R(m,TX-11,TY0+10,22,TY1-TY0,'#ff5a3a',{rx:11});const bulb=C(m,TX,TY1+34,28,'#ff5a3a');
 for(let i=0;i<9;i++)L(m,TX+30,TY0+14+i*(TY1-TY0-20)/8,TX+44,TY0+14+i*(TY1-TY0-20)/8,'#6a7ea8',3);
 const lab=T(m,420,196,p.label||'TEMPERATURE',30,'#9fb4e0',{'letter-spacing':4,'font-weight':800});
 const num=T(m,400,400,'15°C',outside?200:190,'#ff9a5a',{'font-family':'Roboto Condensed, Inter, DejaVu Sans, sans-serif',stroke:'#000','stroke-width':10,'paint-order':'stroke fill'});
 // graph
 const gx0=140,gx1=650,gy0=520,gy1=720;const yT=v=>lerp(gy0+10,gy1-10,(20-v)/40),xD=d=>lerp(gx0,gx1,(d-1)/6);
 let gp=null,dot=null,dl=null;
 if(!outside){R(m,gx0-30,gy0-10,gx1-gx0+60,gy1-gy0+20,'#0b1424',{rx:16,opacity:.8});
  L(m,gx0-10,yT(0),gx1+10,yT(0),'#6ae6ff',2.5,{'stroke-dasharray':'8 8',opacity:.8});T(m,gx1-10,yT(0)-8,'FREEZING 0°',20,'#6ae6ff',{'text-anchor':'end','font-weight':800,'letter-spacing':2});
  const pts=TEMPS.map((v,i)=>[xD(i+1),yT(v)]);const d='M'+pts.map(q=>q.join(',')).join(' L');
  P(m,d,'none',{stroke:'#2a3e66','stroke-width':6,'stroke-linecap':'round','stroke-linejoin':'round'});
  gp=P(m,d,'none',{stroke:'#ff9a5a','stroke-width':8,'stroke-linecap':'round','stroke-linejoin':'round',pathLength:1,'stroke-dasharray':'1 1','stroke-dashoffset':1});
  dot=C(m,pts[0][0],pts[0][1],12,'#fff',{stroke:'#ff5a3a','stroke-width':5});dl=T(m,0,0,'DAY 1',26,'#fff',{'font-weight':800,stroke:'#000','stroke-width':5,'paint-order':'stroke fill'});p._pts=pts}
 const fro=p.from||1,to=p.to||fro;const tempAt=d=>{d=clamp(d,1,7);const i=Math.floor(d-1),fr=d-1-i;const a=TEMPS[Math.min(6,i)],b=TEMPS[Math.min(6,i+1)];return lerp(a,b,fr)};
 const ck=p.chip?chip(Z.hud,p.chip,360,96,'#12304a'):null;
 return (u,t,bt)=>{let d,v;
  if(outside){v=lerp(p.from==null?-40:p.from,p.to==null?-60:p.to,ease(clamp(bt/(p.dur||1.4))))}
  else{d=lerp(fro,to,ease(clamp(bt/(p.dur||1.6))));v=tempAt(d)}
  const vr=Math.round(v);num.textContent=(vr<0?'−'+Math.abs(vr):vr)+'°C';A(num,{'font-size':num.textContent.length>=5?150:(num.textContent.length==4?170:190)});
  A(num,{fill:mixc('#ff9a5a','#8fdcff',clamp((15-v)/24))});
  const h=clamp((v+60)/80)*(TY1-TY0-20)+10;A(merc,{y:TY1-h+10,height:h+14,fill:v<0?'#6ad0ff':'#ff5a3a'});A(bulb,{fill:v<0?'#6ad0ff':'#ff5a3a'});
  if(gp){const pr=clamp((d-1)/6);A(gp,{'stroke-dashoffset':1-pr,stroke:v<0?'#8fdcff':'#ff9a5a'});const x=xD(d),y=yT(v);A(dot,{cx:x,cy:y,stroke:v<0?'#6ad0ff':'#ff5a3a'});A(dl,{x:x-(d>5.5?40:0),y:y-24,'text-anchor':d>5.5?'end':'middle'});dl.textContent='DAY '+Math.round(d)}
  if(ck)ck(clamp(bt/.3))}};

/* ---------- the power grid dying: city lights going out ---------- */
LIB.gridMap=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);R(f,-300,-300,1320,1880,'#04070e');
 for(let i=-6;i<20;i++)L(f,i*60,-300,i*60,1580,'#1d3a66',1.5,{opacity:.12,'stroke-linecap':'butt'});for(let i=-6;i<30;i++)L(f,-300,i*60,1020,i*60,'#1d3a66',1.5,{opacity:.12,'stroke-linecap':'butt'});
 // a blob continent
 const mg=G(m,{transform:'translate(72 56) scale(.8)'});P(mg,'M80,300 Q130,230 240,250 Q320,200 420,240 Q520,210 610,280 Q660,340 630,420 Q650,500 560,560 Q500,640 420,600 Q340,660 270,600 Q200,620 150,540 Q70,480 100,400Z','#0c1a2e',{stroke:'#274a7a','stroke-width':4});
 const ds=[];for(let i=0;i<260;i++){let x,y,tries=0;do{x=100+rnd(i*3+1)*520;y=240+rnd(i*3+2)*380;tries++}while(!inside(x,y)&&tries<9);ds.push([C(mg,x,y,2+rnd(i+5)*2.6,'#ffd27a'),x,i,x/720+rnd(i+9)*.25])}
 function inside(x,y){const cx=360,cy=420;return ((x-cx)/270)**2+((y-cy)/190)**2<1}
 T(m,360,150,'CITY LIGHTS',32,'#9fb4e0',{'letter-spacing':5,'font-weight':800});
 const num=T(Z.hud,360,724,'100%',120,'#ffd27a',{stroke:'#000','stroke-width':9,'paint-order':'stroke fill'});const sub=T(Z.hud,360,628,'POWER ONLINE',30,'#9fb4e0',{'letter-spacing':4,'font-weight':800});
 return (u,t,bt)=>{const w=ease(clamp(bt/2.6))*1.3-.1;let on=0;ds.forEach(([c,x,i,th])=>{const alive=w<th;if(alive)on++;A(c,{opacity:alive?.6+.4*Math.abs(Math.sin(t*2+i)):.07,fill:alive?'#ffd27a':'#334a6a'})});
  const pc=Math.round(100*on/ds.length);num.textContent=pc+'%';A(num,{fill:pc>50?'#ffd27a':(pc>15?'#ff9a5a':'#ff5a4a')})}};
