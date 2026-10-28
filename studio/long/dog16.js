/* Respawn the dog: extracted from lib_sun1.js (Ember) */
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
