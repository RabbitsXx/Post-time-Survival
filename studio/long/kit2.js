/* ===== original protagonist: the keeper (stick-figure family; round head, thin tube limbs, outline, half-lidded dot eyes) =====
   Design bible (ours): mustard oilskin slicker, deep-teal trousers, black rubber boots, orange knit beanie with cream cuff,
   grey stubble. Not any existing character. */
const KBASE={skin:'#efcfae',skinS:'#d3a982',coat:'#d8a032',coatS:'#a9741a',pants:'#2f5d57',boot:'#1c1b20',hat:'#d85f2a',cuff:'#f2ead6',ink:'#2a1c13',pack:'#6b4a2a',eye:'#1a120c'};
function hex2(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function col2(a){return '#'+a.map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('')}
const KWREN=Object.assign({},KBASE,{coat:'#3f8a96',coatS:'#2a5d68',pants:'#3d3d4a',hat:'#2a1c13',cuff:'#2a1c13',pack:'#5a4a3a'});
const KMARA=Object.assign({},KBASE,{skin:'#dba577',skinS:'#b98258',coat:'#cf3a33',coatS:'#8e231f',pants:'#2f3a4e',hat:'#454c5c',cuff:'#e6dcc4',pack:'#6b4a2a',scarf:'#efe3c2'});
const KPIP=Object.assign({},KBASE,{skin:'#e8bd94',skinS:'#c99a70',coat:'#2f86d0',coatS:'#1f5c94',pants:'#58456e',hat:'#f2c230',cuff:'#2f86d0',pack:'#6b4a2a',scarf:'#f2c230'});
const KCOLE=Object.assign({},KBASE,{skin:'#c99468',skinS:'#a9764d',coat:'#566c3a',coatS:'#3a4a28',pants:'#2b2b30',hat:'#26262c',cuff:'#26262c',pack:'#4a3a2a'});
const KWHO={wren:KWREN,mara:KMARA,pip:KPIP,cole:KCOLE};
function palette(mood,who){const KB=KWHO[who]||KBASE;const m={day:[1,1,1],warm:[1.05,.95,.82],night:[.42,.52,.78],red:[.7,.34,.32],cyan:[.38,.6,.7]}[mood]||[1,1,1];const o={};for(const k in KB){o[k]=k==='ink'?(mood==='night'?'#0a0e18':KB[k]):col2(hex2(KB[k]).map((v,i)=>v*m[i]))}return o}
function tube(g,pts,w,fill,ink){const d='M'+pts.map(p=>p.join(',')).join(' L');if(ink)E('path',{d,fill:'none',stroke:ink,'stroke-width':w+5,'stroke-linecap':'round','stroke-linejoin':'round'},g);return E('path',{d,fill:'none',stroke:fill,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},g)}
function blob(g,d,fill,ink){return E('path',{d,fill,stroke:ink||'none','stroke-width':ink?3:0,'stroke-linejoin':'round'},g)}

/* pose tables: [hip,knee,ankle] legs, [shoulder,elbow,hand] arms; coordinates in local units, feet at y=0, facing +x for 'side' */
const SIDE={
 stand:{lean:0,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[12,-188],[24,-132]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[-10,-190],[-6,-134]]}},
 walk:{lean:4,n:{l:[[2,-140],[26,-76],[30,-14]],a:[[2,-250],[-12,-196],[-30,-150]]},f:{l:[[-2,-140],[-20,-72],[-34,-14]],a:[[-2,-250],[22,-200],[40,-160]]}},
 reach:{lean:8,n:{l:[[2,-140],[10,-72],[6,-14]],a:[[2,-250],[46,-244],[92,-236]]},f:{l:[[-2,-140],[-12,-72],[-14,-14]],a:[[-2,-250],[-8,-190],[0,-136]]}},
 binoc:{lean:-2,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[30,-226],[44,-292]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[22,-222],[40,-290]]},binoc:1},
 cross:{lean:0,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[22,-210],[-8,-222]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[-16,-212],[16,-228]]}},
 panic:{lean:-6,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[34,-290],[16,-326]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[26,-286],[6,-328]]}},
 row:{lean:12,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[36,-206],[74,-178]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[30,-208],[66,-184]]}},
 dig:{lean:26,n:{l:[[2,-140],[8,-72],[6,-14]],a:[[2,-250],[40,-186],[66,-118]]},f:{l:[[-2,-140],[-10,-72],[-12,-14]],a:[[-2,-250],[30,-190],[52,-122]]}},
 hold:{lean:3,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[22,-196],[44,-196]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[-4,-190],[10,-190]]}}};
const FRONT={
 stand:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[40,-190],[38,-134]]},
 panic:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-62,-290],[-30,-330]],ra:[[30,-248],[62,-290],[30,-330]]},
 cross:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-205],[8,-218]],ra:[[30,-248],[40,-208],[-8,-226]]},
 binoc:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-52,-290],[-14,-300]],ra:[[30,-248],[52,-290],[14,-300]],binoc:1},
 reach:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[70,-290],[96,-340]]}};

function kface(g,P,o){/* head-local coordinates, centre (0,0) r=32. view: side(+x) | front | back. expr: calm|worried|tired */
 const ex=o.expr||'calm',ink=P.ink;
 if(o.view==='side'){
  E('path',{d:'M-8,0 Q-16,8 -9,15',fill:'none',stroke:ink,'stroke-width':2.8,'stroke-linecap':'round'},g);
  blob(g,'M28,0 Q44,10 30,16 Q29,10 28,4Z',P.skin,ink);
  if(ex==='worried'){C(g,14,2,5.4,'#fff',{stroke:ink,'stroke-width':2});C(g,15.5,2,2.8,P.eye);L(g,6,-12,20,-8,ink,3);L(g,16,24,26,23,ink,3);
  }else{E('ellipse',{cx:14,cy:3,rx:4.2,ry:4.6,fill:P.eye},g);E('path',{d:'M8,0 L21,-1',stroke:ink,'stroke-width':3.2,'stroke-linecap':'round',fill:'none'},g);L(g,8,-9,21,ex==='tired'?-5:-10,ink,2.8);L(g,14,22,26,ex==='tired'?24:21,ink,2.8)}
  for(let i=0;i<9;i++)C(g,4+i*3.2,24+Math.sin(i)*1.5,1.1,P.skinS)
 }else if(o.view==='front'){
  C(g,-33,6,6,P.skin,{stroke:ink,'stroke-width':2.5});C(g,33,6,6,P.skin,{stroke:ink,'stroke-width':2.5});
  if(ex==='awe'||ex==='smile'||ex==='grim'){
   for(const s of [-1,1]){
    if(ex==='awe'){C(g,s*12,2,7.6,'#fff',{stroke:ink,'stroke-width':2});C(g,s*12,2,3.9,P.eye);C(g,s*12+1.8,0,1.4,'#fff');L(g,s*5,-17,s*19,-19,ink,3)}
    else if(ex==='smile'){E('path',{d:`M${s*12-7},5 Q${s*12},-5 ${s*12+7},5`,fill:'none',stroke:ink,'stroke-width':3.3,'stroke-linecap':'round'},g);L(g,s*6,-12,s*19,-13,ink,2.8)}
    else{E('ellipse',{cx:s*12,cy:4,rx:4.2,ry:4.4,fill:P.eye},g);L(g,s*4,-8,s*20,-13+(s<0?0:0)+ (s>0?5:-5)*0,ink,3.4);E('path',{d:`M${s*12-7},-1 L${s*12+7},-1`,stroke:ink,'stroke-width':3,'stroke-linecap':'round'},g)}}
   E('path',{d:'M0,6 Q5,14 0,17',fill:'none',stroke:ink,'stroke-width':2.4,'stroke-linecap':'round'},g);
   if(ex==='awe')E('ellipse',{cx:0,cy:27,rx:6.5,ry:7.6,fill:ink},g);
   else if(ex==='smile')E('path',{d:'M-12,22 Q0,35 12,22',fill:'none',stroke:ink,'stroke-width':3.2,'stroke-linecap':'round'},g);
   else L(g,-9,26,9,26,ink,3.2);
   return}
  for(const s of [-1,1]){if(ex==='worried'){C(g,s*12,2,5.8,'#fff',{stroke:ink,'stroke-width':2});C(g,s*12,3,2.9,P.eye);L(g,s*5,-12,s*19,-12-s*(-3),ink,3)}else{E('ellipse',{cx:s*12,cy:3,rx:4.2,ry:4.6,fill:P.eye},g);E('path',{d:`M${s*12-7},0 L${s*12+7},0`,stroke:ink,'stroke-width':3.2,'stroke-linecap':'round'},g);L(g,s*6,-9,s*19,-10+(ex==='tired'?3:0),ink,2.8)}}
  E('path',{d:'M0,6 Q5,14 0,17',fill:'none',stroke:ink,'stroke-width':2.4,'stroke-linecap':'round'},g);
  if(ex==='worried'){E('ellipse',{cx:0,cy:24,rx:6,ry:4.4,fill:ink},g)}else L(g,-8,24,8,24,ink,2.8);
  for(let i=0;i<11;i++)C(g,-16+i*3.2,28+Math.sin(i*2)*1.5,1.1,P.skinS)
 }
}
function khead(g,P,o){/* returns group at origin; draws skull + beanie + face */
 const q=G(g,{});C(q,0,0,32,P.skin,{stroke:P.ink,'stroke-width':3});
 if(o.view==='back'){C(q,-31,8,6,P.skin,{stroke:P.ink,'stroke-width':2.5});C(q,31,8,6,P.skin,{stroke:P.ink,'stroke-width':2.5});blob(q,'M-26,4 Q0,34 26,4 L26,22 Q0,40 -26,22Z',P.skinS);}
 else kface(q,P,o);
 const top=o.view==='back'?4:-8;
 if(o.who==='wren'){
  if(o.view==='side')blob(q,'M-33,0 C-42,-46 34,-50 33,-6 L26,-10 Q8,-32 -12,-22 Q-26,-14 -30,8Z',P.hat,P.ink);
  else if(o.view==='back')C(q,0,-2,33,P.hat,{stroke:P.ink,'stroke-width':3});
  else blob(q,'M-33,2 C-40,-48 40,-48 33,2 Q22,-26 0,-28 Q-22,-26 -33,2Z',P.hat,P.ink);
  C(q,o.view==='side'?-30:0,o.view==='side'?-34:-48,14,P.hat,{stroke:P.ink,'stroke-width':3});
 }else{
 blob(q,`M-33,${top} C-38,-48 38,-48 33,${top} Z`,P.hat,P.ink);
 E('rect',{x:-35,y:top-6,width:70,height:15,rx:7,fill:P.cuff,stroke:P.ink,'stroke-width':3},q);
 for(let i=-3;i<=3;i++)L(q,i*9,top-4,i*9,top+6,'#d3c6a6',2);
 C(q,0,-46,8,P.cuff,{stroke:P.ink,'stroke-width':3});}
 if(o.who==='mara'){const hc='#4a2c1a';
  if(o.view==='side')blob(q,'M-30,-2 Q-56,4 -52,40 Q-44,24 -30,20Z',hc,P.ink);
  else if(o.view==='back')blob(q,'M-26,2 Q0,40 26,2 L28,30 Q0,50 -28,30Z',hc,P.ink);
  else{blob(q,'M-33,-2 Q-43,16 -33,32 Q-27,14 -26,2Z',hc,P.ink);blob(q,'M33,-2 Q43,16 33,32 Q27,14 26,2Z',hc,P.ink)}}
 if(o.who==='cole'&&o.view!=='back'){const bc='#3a2a1e';
  if(o.view==='side')blob(q,'M4,12 Q32,50 34,16 Q22,26 10,14Z',bc,P.ink);else blob(q,'M-27,12 Q0,66 27,12 Q0,36 -27,12Z',bc,P.ink)}
 return q}
function keeper(g,o){o=o||{};const P=palette(o.mood||'day',o.who),dark=!!o.dark,ink=dark?null:P.ink;const view=o.view||'side';
 const F=dark?(o.col||'#06090f'):null;const clr=k=>dark?F:P[k];
 const root=G(g,{});const x=o.x||360,y=o.y||900,s=o.s||1,fl=o.flip?-1:1;
 A(root,{transform:`translate(${x} ${y}) scale(${s*fl} ${s})`});root._b={x,y,s,fl};
 // ground shadow
 if(!o.noShadow)E('ellipse',{cx:0,cy:2,rx:70,ry:9,fill:'#000',opacity:dark?0:.3},root);
 const draw=G(root,{});
 if(view==='side'){const T=SIDE[o.pose||'stand'];
  const leg=(g2,l)=>{tube(g2,l,23,clr('pants'),ink);const a=l[2];tube(g2,[[a[0],a[1]-2],[a[0],a[1]+8],[a[0]+22,a[1]+10]],19,clr('boot'),ink)};
  const arm=(g2,a)=>{tube(g2,a,15,clr(P.sleeve?'sleeve':'coat'),ink);C(g2,a[2][0],a[2][1],8.5,dark?F:P.skin,{stroke:ink||'none','stroke-width':2.5})};
  const dk=G(draw,{opacity:dark?1:.88});
  arm(G(dk,{}),T.f.a);leg(G(dk,{}),T.f.l);
  leg(G(draw,{}),T.n.l);
  const up=G(draw,{transform:`rotate(${T.lean} 0 -140)`});
  if(o.pack&&!dark){blob(up,'M-18,-250 Q-52,-240 -48,-170 Q-44,-150 -22,-150Z',P.pack,ink)}
  blob(up,'M-22,-258 Q0,-270 22,-258 Q28,-210 24,-176 L26,-136 Q0,-130 -26,-136 L-24,-176 Q-28,-210 -22,-258Z',clr('coat'),ink);
  if(!dark){L(up,2,-258,2,-140,P.coatS,2.5);blob(up,'M-6,-196 h20 v22 h-20Z','none',P.coatS);blob(up,'M-24,-250 Q0,-266 24,-250 L22,-240 Q0,-252 -22,-240Z',P.coatS)}
  tube(up,[[3,-268],[5,-262]],16,dark?F:P.skin,ink);
  if(P.scarf&&!dark){blob(up,'M-22,-266 Q2,-282 26,-266 L24,-250 Q2,-264 -20,-250Z',P.scarf,ink);blob(up,'M-18,-256 l-9,50 l17,-5 l7,-42Z',P.scarf,ink)}
  const hd=G(up,{transform:`translate(${5+(T.hx||0)} -298) rotate(${o.tilt||0})`});root._hd=khead(hd,P,{view:'side',expr:o.expr,who:o.who,mouth:o.mouth,shades:o.shades});
  if(dark){/* silhouette: recolour head parts */hd.querySelectorAll('*').forEach(e=>{if(e.getAttribute('fill')&&e.getAttribute('fill')!=='none')e.setAttribute('fill',F);e.setAttribute('stroke','none')});}
  arm(G(up,{}),T.n.a);
  if(T.binoc||T.n.binoc){const b=G(up,{transform:`translate(${T.n.a[2][0]+4} ${T.n.a[2][1]-4})`});R(b,-12,-14,34,22,dark?F:'#2b2b33',{rx:6,stroke:ink||'none','stroke-width':2.5})}
 }else{const T=FRONT[o.pose||'stand'];
  const leg=(g2,l)=>{tube(g2,l,23,clr('pants'),ink);const a=l[2];tube(g2,[[a[0],a[1]-2],[a[0],a[1]+8],[a[0]+(a[0]<0?-8:8),a[1]+10]],19,clr('boot'),ink)};
  const arm=(g2,a)=>{tube(g2,a,15,clr(P.sleeve?'sleeve':'coat'),ink);C(g2,a[2][0],a[2][1],8.5,dark?F:P.skin,{stroke:ink||'none','stroke-width':2.5})};
  leg(G(draw,{}),T.l);leg(G(draw,{}),T.r);
  if(o.pack&&view==='back'&&!dark)blob(draw,'M-30,-250 Q-44,-196 -30,-150 L30,-150 Q44,-196 30,-250Z',P.pack,ink);
  blob(draw,'M-34,-254 Q0,-270 34,-254 Q38,-210 32,-176 L34,-134 Q0,-126 -34,-134 L-32,-176 Q-38,-210 -34,-254Z',clr('coat'),ink);
  if(!dark){L(draw,0,-262,0,-134,P.coatS,2.5);blob(draw,'M-24,-258 Q0,-244 24,-258',"none",P.coatS)}
  tube(draw,[[0,-268],[0,-258]],16,dark?F:P.skin,ink);
  if(P.scarf&&!dark){blob(draw,'M-31,-266 Q0,-284 31,-266 L29,-248 Q0,-264 -29,-248Z',P.scarf,ink);blob(draw,'M10,-254 l5,52 l17,-6 l-9,-46Z',P.scarf,ink)}
  const hd=G(draw,{transform:`translate(0 -298) rotate(${o.tilt||0})`});root._hd=khead(hd,P,{view:view,expr:o.expr,who:o.who,mouth:o.mouth,shades:o.shades});
  if(dark){hd.querySelectorAll('*').forEach(e=>{if(e.getAttribute('fill')&&e.getAttribute('fill')!=='none')e.setAttribute('fill',F);e.setAttribute('stroke','none')})}
  arm(G(draw,{}),T.la);arm(G(draw,{}),T.ra);
  if(T.binoc){const b=G(draw,{transform:'translate(0 -300)'});R(b,-30,-12,60,24,dark?F:'#2b2b33',{rx:8,stroke:ink||'none','stroke-width':2.5})}
 }
 if(dark&&o.rim){/* rim: duplicate behind, coloured, offset */const cp=draw.cloneNode(true);cp.querySelectorAll('*').forEach(e=>{if(e.getAttribute('fill')&&e.getAttribute('fill')!=='none')e.setAttribute('fill',o.rim);if(e.getAttribute('stroke')&&e.getAttribute('stroke')!=='none')e.setAttribute('stroke',o.rim)});A(cp,{transform:`translate(${(o.rimDx==null?-3:o.rimDx)} -2)`});root.insertBefore(cp,draw)}
 return root}

/* big expressive head + shoulders (close-up) — x,y = head centre, s = scale */
function keeperClose(g,o){const P=palette(o.mood||'day',o.who);const root=G(g,{});A(root,{transform:`translate(${o.x} ${o.y}) scale(${o.s*(o.flip?-1:1)} ${o.s})`});
 const ink=P.ink;blob(root,'M-120,330 Q-110,110 -40,60 L40,60 Q110,110 120,330Z',P.coat,ink);blob(root,'M-40,60 Q0,90 40,60 L34,84 Q0,112 -34,84Z',P.coatS);
 tube(root,[[0,30],[0,70]],26,P.skin,ink);
 if(P.scarf){blob(root,'M-46,46 Q0,78 46,46 Q54,70 44,92 Q0,116 -44,92 Q-54,70 -46,46Z',P.scarf,ink);blob(root,'M22,92 l12,66 l30,-9 l-12,-64Z',P.scarf,ink)}
 const hd=G(root,{transform:`rotate(${o.tilt||0})`});khead(hd,P,{view:o.view||'side',expr:o.expr,who:o.who});return {root,hd}}

function kmove(r,t,amp,sp){const b=r._b;A(r,{transform:`translate(${b.x} ${b.y+Math.sin(t*(sp||1.5))*(amp==null?2:amp)}) scale(${b.s*b.fl} ${b.s})`})}
