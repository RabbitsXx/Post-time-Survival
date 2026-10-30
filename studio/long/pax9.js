/* ===== pax9: the cast of THE LAST BUS (palettes, heads, body decorations, actor).  Head-local coordinates: centre (0,0), r=32 (like dexHead / steveHead).
   One head function for everybody: hair/hat styles, glasses, beards, expressions, lip-sync (_mouth) and "state" overlays (sweat, red eyes, pallor) that the clue
   system of the story uses:  o.sweat 0..1, o.red 0..1 (bloodshot), o.pale 0..1, o.expr.  Views: front (acting) and side (+x, driving/running). ===== */
const PAXH={};
function defPax(who,pal,def){KWHO[who]=Object.assign({},KBASE,pal);PAXH[who]=def}
defPax('rosa',{skin:'#c98e62',skinS:'#a56d44',coat:'#2f6fa8',coatS:'#1f4f7e',pants:'#2b2f3a',boot:'#17171b',ink:'#241810',scarf:'#e8e2cf',hand:'#2b2d34'},{hair:'bun',hc:'#9a9aa4',brow:'thick',bags:1});
defPax('priya',{skin:'#b5764f',skinS:'#8e5636',coat:'#2aa59a',coatS:'#1d7a72',pants:'#2aa59a',boot:'#f4f4f6',ink:'#241810'},{hair:'pony',hc:'#17131c',steth:1});
defPax('marcus',{skin:'#7a4d33',skinS:'#5d3822',coat:'#4f7040',coatS:'#364d2a',pants:'#2b2d36',boot:'#17171b',ink:'#1e130c'},{hair:'bald',stache:'#1e130c',brow:'thick'});
defPax('teddy',{skin:'#eec6a0',skinS:'#cf9f78',coat:'#ffd23a',coatS:'#c9a010',pants:'#3a5fa8',boot:'#d8452a',ink:'#2a1c13'},{hair:'hood',hc:'#ffd23a',kid:1});
defPax('june',{skin:'#f1d6bd',skinS:'#d7b394',coat:'#8a5cc0',coatS:'#6a3f9e',pants:'#5a4a6a',boot:'#3a2a2a',ink:'#2a1c13'},{hair:'curls',hc:'#f4f4f8',glasses:'round'});
defPax('vic',{skin:'#e1b48c',skinS:'#bf8f67',coat:'#e0463a',coatS:'#a8281f',pants:'#2a3a5a',boot:'#f4f4f6',ink:'#241810'},{hair:'cap',hc:'#c93028',goatee:'#3a2a1e'});
defPax('lena',{skin:'#f3dccb',skinS:'#d8b9a4',coat:'#23232e',coatS:'#14141c',pants:'#2a2a34',boot:'#101016',ink:'#14101a'},{hair:'bob',hc:'#14101a',streak:'#b04ae0',phones:1});
defPax('benny',{skin:'#f4f4f6',skinS:'#d6d6dc',coat:'#f4f4f6',coatS:'#d0d0d8',pants:'#f4f4f6',boot:'#ff9a1c',ink:'#2a1c13',hand:'#ffd23a'},{hair:'chicken'});
defPax('park',{skin:'#d9a373',skinS:'#b17d52',coat:'#5a6272',coatS:'#3f4654',pants:'#3f4654',boot:'#17171b',ink:'#241810'},{hair:'slick',hc:'#14100c',glasses:'rect'});
defPax('dante',{skin:'#c99468',skinS:'#a9764d',coat:'#5b6b3a',coatS:'#434f2a',pants:'#4a4a3a',boot:'#26262c',ink:'#241810',pack:'#3a3a2a'},{hair:'beanie',hc:'#2c2c34',goggles:1,beard:'#3a2a1e'});
defPax('amara',{skin:'#8d5a3b',skinS:'#6e4128',coat:'#3a6fd0',coatS:'#2a4f98',pants:'#2a2d3a',boot:'#c9a86a',ink:'#1e130c'},{hair:'wrap',hc:'#e0a02a'});
defPax('walt',{skin:'#e6c3a0',skinS:'#c79f7c',coat:'#7a5a3a',coatS:'#5a3f26',pants:'#4a4a52',boot:'#26262c',ink:'#241810'},{hair:'bald',hc:'#f0f0f4',stache:'#f0f0f4',flatcap:'#6a5a46'});

defPax('benny2',{},{hair:'messy',hc:'#3a2a1e',glasses:'round',skin:'#f0cfa8',skinS:'#d4aa82',bags:0});
defPax('slim',{skin:'#d2a679',skinS:'#b0805a',coat:'#5a3a2a',coatS:'#3f281c',pants:'#2b2d36',boot:'#17171b',ink:'#241810'},{hair:'bandana',hc:'#c0302a',scar:1,gold:1,beard:'#2a1c14',brow:'thick'});
defPax('raider',{skin:'#c79a70',skinS:'#a37750',coat:'#4a4a3a',coatS:'#33332a',pants:'#2b2d36',boot:'#17171b',ink:'#241810'},{hair:'bandana',hc:'#303a2a',brow:'thick'});
const PEXP={ // eye type, brow [x1,y1,x2,y2] for the +x brow (mirrored for -x), resting mouth
 calm:{eye:'norm',br:[5,-12,19,-13],mo:'flat'},    smile:{eye:'norm',br:[5,-13,19,-14],mo:'smile'}, grin:{eye:'happy',br:[5,-15,19,-17],mo:'grin'},
 worried:{eye:'wide',br:[5,-19,19,-10],mo:'wavy'}, shock:{eye:'wide2',br:[5,-22,19,-24],mo:'o'},      sad:{eye:'norm',br:[5,-11,19,-18],mo:'frown'},
 angry:{eye:'norm',br:[5,-18,19,-9],mo:'grit'},    smug:{eye:'half',br:[5,-14,19,-14],mo:'smirk'},     tired:{eye:'half',br:[5,-10,19,-11],mo:'flat'},
 sleep:{eye:'closed',br:[5,-12,19,-12],mo:'snore'}, wince:{eye:'closed',br:[5,-15,19,-9],mo:'grit'},   deadpan:{eye:'half',br:[5,-12,19,-12],mo:'flat'},
 scared:{eye:'wide',br:[5,-20,19,-11],mo:'grit'},   cry:{eye:'wide',br:[5,-18,19,-9],mo:'frown'}};
const MOUTH={flat:'M-8,28 L8,28',smile:'M-10,26 Q0,34 10,26',grin:'M-11,25 Q0,38 11,25 Z',wavy:'M-9,29 Q-4,25 0,29 T9,29',frown:'M-9,31 Q0,24 9,31',grit:'M-9,27 L9,27',smirk:'M-9,29 Q2,30 11,24',o:'M0,0',snore:'M-5,28 Q0,32 5,28'};
function pEyes(q,ex,P,o,ink){const look=o.look||0;const red=o.red||0;q._lids=[];
 for(const s of[-1,1]){const cx=s*12,e=G(q,{});
  if(ex.eye==='closed'){E('path',{d:`M${cx-7},3 Q${cx},8 ${cx+7},3`,fill:'none',stroke:ink,'stroke-width':3,'stroke-linecap':'round'},e);continue}
  if(ex.eye==='happy'){E('path',{d:`M${cx-7},5 Q${cx},-4 ${cx+7},5`,fill:'none',stroke:ink,'stroke-width':3.2,'stroke-linecap':'round'},e);continue}
  const r=ex.eye==='wide'?7.2:ex.eye==='wide2'?8.6:5.8;if(!q._lids)q._lids=[];q._lids.push({cx,r,e});C(e,cx,2,r,red>0?`rgb(255,${Math.round(255-130*red)},${Math.round(255-150*red)})`:'#fff',{stroke:ink,'stroke-width':2});
  if(red>0)for(let k=0;k<4;k++){const a=k*1.7+s;L(e,cx+Math.cos(a)*r*.95,2+Math.sin(a)*r*.95,cx+Math.cos(a)*r*.45,2+Math.sin(a)*r*.45,'#d02020',1.2*red+.4,{opacity:.9})}
  C(e,cx+look,3,ex.eye==='wide2'?2.4:ex.eye==='wide'?3.2:2.9,P.eye);C(e,cx+look+1.4,1.2,1,'#fff');
  if(ex.eye==='half'){R(e,cx-8,-6,16,8.4,P.skin)&&L(e,cx-7,2.4,cx+7,2.4,ink,3)}}
}
function pBrows(q,ex,D,ink){const b=ex.br,w=D.brow==='thick'?6:4.6;L(q,-b[0],b[1],-b[2],b[3],D.hc&&D.hair!=='bald'&&D.hair!=='bun'&&D.hair!=='curls'?ink:ink,w);L(q,b[0],b[1],b[2],b[3],ink,w)}
function pMouth(q,ex,m,ink){const g=G(q,{});const cl=E('path',{d:MOUTH[ex.mo]||MOUTH.flat,fill:ex.mo==='grin'?'#fff':'none',stroke:ink,'stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'},g);
 const opn=G(g,{display:'none'});E('ellipse',{cx:0,cy:29,rx:8,ry:2,fill:'#4a1414',stroke:ink,'stroke-width':2.2},opn);const tg=R(opn,-6,26,12,3,'#fff',{rx:1.5});
 return mm=>{const mo=ex.mo==='o'?Math.max(mm,.55):mm;if(mo>.07){A(cl,{d:'M0,0'});A(opn,{display:'inline'});const ry=2+9*mo,rx=6.5+4*mo;const c=opn.firstChild;A(c,{cy:28+ry*.35,rx,ry});A(tg,{y:28+ry*.35-ry+.6,x:-rx*.78,width:rx*1.56,height:Math.min(3.6,ry*.7)})}else{A(opn,{display:'none'});A(cl,{d:MOUTH[ex.mo]||MOUTH.flat})}}}
function pTears(q,o){if(!o.tear)return;for(const x of[-17,17]){P(q,`M${x},12 q-4,10 0,16 q4,-6 0,-16Z`,'#9fe0ff',{stroke:'#2a6a9a','stroke-width':1.2,opacity:.95})}}
function pSweat(q,o){const s=o.sweat||0;if(s<=0)return;const n=Math.ceil(s*4);for(let i=0;i<n;i++){const x=[-26,24,-20,30][i],y=[-14,-20,-30,-2][i];P(q,`M${x},${y} q-5,9 0,14 q5,-5 0,-14Z`,'#8fd8ff',{stroke:'#2a6a9a','stroke-width':1.2,opacity:.95})}}
function pPale(q,o){if(o.pale>0)C(q,0,2,31,'#9ec2a0',{opacity:.38*o.pale})}

/* ---- hair / hat, back layer (drawn before the head disc) and front layer ---- */
function pHairBack(q,D,P,v,ink){const h=D.hair,c=D.hc||'#222';
 if(h==='bun'){C(q,v==='side'?-26:0,-34,15,c,{stroke:ink,'stroke-width':3});if(v==='front')blob(q,'M-33,-4 Q-36,-34 0,-36 Q36,-34 33,-4Z',c,ink)}
 else if(h==='pony'){blob(q,v==='side'?'M-26,-8 Q-62,-4 -58,36 Q-44,18 -26,16Z':'M-34,-6 Q-44,26 -30,40 Q-26,20 -26,0Z',c,ink)}
 else if(h==='curls'){for(let i=0;i<13;i++){const a=Math.PI*(1+i/12);C(q,Math.cos(a)*34,Math.sin(a)*30-6+ (i%2?3:0),11,c,{stroke:ink,'stroke-width':2.2})}}
 else if(h==='bob'){blob(q,'M-35,-6 Q-42,30 -28,38 L-24,10Z',c,ink);blob(q,'M35,-6 Q42,30 28,38 L24,10Z',c,ink)}
 else if(h==='wrap'){C(q,0,-28,26,c,{stroke:ink,'stroke-width':3});for(let i=-2;i<=2;i++)E('path',{d:`M${i*9},-50 q4,10 -3,18`,fill:'none',stroke:'#fff3b0','stroke-width':2.2,opacity:.8},q);C(q,-8,-54,7,c,{stroke:ink,'stroke-width':2.4})}
 else if(h==='hood'){blob(q,'M-40,8 Q-44,-52 0,-54 Q44,-52 40,8 Q36,34 0,36 Q-36,34 -40,8Z',c,ink)}
 else if(h==='bald'&&D.hc){blob(q,'M-33,-2 Q-37,18 -30,26 Q-30,6 -28,-2Z',D.hc,ink);blob(q,'M33,-2 Q37,18 30,26 Q30,6 28,-2Z',D.hc,ink)}}
function pHairFront(q,D,P,v,ink){const h=D.hair,c=D.hc||'#222';const top=v==='side'?-6:-8;
 if(h==='bun'||h==='pony'){blob(q,v==='side'?'M-33,-2 C-40,-44 34,-48 33,-8 Q20,-26 0,-22 Q-22,-20 -30,6Z':'M-33,-4 C-38,-46 38,-46 33,-4 Q20,-26 0,-24 Q-20,-26 -33,-4Z',c,ink)}
 else if(h==='bob'){blob(q,'M-34,2 C-40,-46 40,-46 34,2 Q22,-18 8,-20 Q-4,-6 -18,-18 Q-28,-14 -34,2Z',c,ink);if(D.streak)blob(q,'M-6,-22 Q-10,-8 -14,6 L-8,6 Q-2,-6 2,-21Z',D.streak)}
 else if(h==='slick'){blob(q,'M-33,0 C-38,-46 38,-46 33,0 Q24,-22 6,-26 Q-14,-26 -33,0Z',c,ink)}
 else if(h==='curls'){for(let i=0;i<9;i++){const a=Math.PI*(1.1+i/10.5);C(q,Math.cos(a)*29,Math.sin(a)*26-12,9.5,c,{stroke:ink,'stroke-width':2})}}
 else if(h==='cap'){blob(q,v==='side'?'M-34,-2 C-38,-44 36,-46 34,-4 Z':'M-34,-4 C-38,-44 38,-44 34,-4 Q0,-10 -34,-4Z',c,ink);if(v==='front')blob(q,'M-26,-4 Q0,-18 26,-4 Q0,-12 -26,-4Z','#8e1f1a');else blob(q,'M-4,-6 Q22,-8 40,-2 Q20,2 -4,0Z','#8e1f1a',ink)}
 else if(h==='beanie'){blob(q,'M-34,-2 C-40,-52 40,-52 34,-2 Z',c,ink);E('rect',{x:-35,y:-12,width:70,height:13,rx:6,fill:'#3d3d48',stroke:ink,'stroke-width':3},q);C(q,0,-52,7,'#3d3d48',{stroke:ink,'stroke-width':2.6})}
 else if(h==='hood'){blob(q,'M-34,-2 C-38,-48 38,-48 34,-2 Q18,-22 0,-22 Q-18,-22 -34,-2Z',c,ink);L(q,-24,26,-22,50,'#fff',2.4);L(q,24,26,22,50,'#fff',2.4);C(q,-22,52,3.6,'#fff');C(q,22,52,3.6,'#fff')}
 else if(h==='messy'){blob(q,'M-33,0 C-40,-40 -24,-50 -12,-44 L-6,-58 L2,-44 L12,-56 L16,-42 C34,-50 40,-30 33,0 Q20,-20 0,-22 Q-20,-20 -33,0Z',c,ink)}
 else if(h==='bandana'){blob(q,'M-34,-2 C-38,-40 38,-40 34,-2 Q20,-16 0,-14 Q-20,-16 -34,-2Z',c,ink);blob(q,'M30,-8 l16,-4 l-4,12 l8,6 l-18,0Z',c,ink);for(let i=-2;i<=2;i++)C(q,i*10,-16,1.8,'#fff',{opacity:.8})}
 else if(h==='bald'&&D.flatcap){blob(q,'M-34,-4 C-36,-34 36,-34 34,-4 Q0,-12 -34,-4Z',D.flatcap,ink);blob(q,'M-6,-8 Q18,-2 38,-6 L34,-1 Q10,6 -6,0Z',D.flatcap,ink)}
 else if(h==='bald'&&!D.hc){/* bald */}}
function pFaceExtras(q,D,P,v,ink,ex){
 if(D.bags){for(const s of[-1,1])E('path',{d:`M${s*5},10 Q${s*12},15 ${s*19},10`,fill:'none',stroke:P.skinS,'stroke-width':2.6,'stroke-linecap':'round'},q)}
 if(D.glasses){const sq=D.glasses==='rect';for(const s of[-1,1]){if(sq)R(q,s*12-9,-5,18,13,'none',{rx:3,stroke:'#2a2a30','stroke-width':2.6});else C(q,s*12,2,10,'none',{stroke:'#b0782a','stroke-width':2.6})}L(q,-3,2,3,2,sq?'#2a2a30':'#b0782a',2.4)}
 if(D.goggles){const g=G(q,{});R(g,-30,-26,60,12,'#3a3a46',{rx:5,stroke:ink,'stroke-width':2.4});for(const s of[-1,1]){C(g,s*14,-20,8.5,'#ffd23a',{stroke:ink,'stroke-width':2.2});C(g,s*14-2,-22,2.6,'#fff',{opacity:.8})}}
 if(D.scar){L(q,-22,-18,-8,8,'#a8433a',3.2);L(q,-26,-8,-14,-12,'#a8433a',2.6)}
 if(D.stache){blob(q,'M-17,17 Q-8,10 0,15 Q8,10 17,17 Q9,23 0,19 Q-9,23 -17,17Z',D.stache,ink)}
 if(D.beard){blob(q,'M-30,10 Q-34,40 0,46 Q34,40 30,10 Q24,26 12,26 Q0,22 -12,26 Q-24,26 -30,10Z',D.beard,ink)}
 if(D.goatee){blob(q,'M-9,30 Q0,48 9,30 Q0,36 -9,30Z',D.goatee,ink)}
 if(D.phones){const hp=G(q,{});E('path',{d:'M-34,2 Q-36,-50 0,-52 Q36,-50 34,2',fill:'none',stroke:'#1a1a22','stroke-width':6,'stroke-linecap':'round'},hp);for(const s of[-1,1]){R(hp,s*34-6,-8,12,24,'#2a2a36',{rx:5,stroke:ink,'stroke-width':2});R(hp,s*34-3,-4,6,16,'#b04ae0',{rx:3})}}}
function chickenHead(g,P,o,v,ink){ // the mascot head: big white head, red comb, orange beak with a moving lower half
 const q=G(g,{transform:'scale(1.04)'});const mouthEls={};
 const body=C(q,0,-2,38,'#fafafc',{stroke:ink,'stroke-width':3.4});
 for(const [x,y,r] of[[-14,-46,11],[0,-52,13],[14,-46,11]])C(q,x,y,r,'#e83a3a',{stroke:ink,'stroke-width':3});
 if(v==='side'){C(q,-8,-2,38,'#fafafc',{stroke:ink,'stroke-width':0});C(q,14,0,13,'#fff',{stroke:ink,'stroke-width':2.6});C(q,17,1,5,'#1a120c');C(q,19,-1,1.8,'#fff');
  const bk=G(q,{});P_(bk,'M30,-6 L66,6 L30,12Z','#ffb020');const lo=P_(bk,'M30,12 L60,12 L30,22Z','#ff9a10');mouthEls.lo=lo;P_(q,'M22,26 Q26,40 18,42 Q14,34 18,26Z','#e83a3a');
 }else{for(const s of[-1,1]){C(q,s*14,-4,13,'#fff',{stroke:ink,'stroke-width':2.6});C(q,s*14+(o.look||0),-2,5.4,'#1a120c');C(q,s*14+(o.look||0)+1.8,-4,1.8,'#fff')}
  L(q,-24,-20,-6,-17,ink,3.6);L(q,6,-17,24,-20,ink,3.6);
  P_(q,'M-12,8 L12,8 L0,22Z','#ffb020');const lo=P_(q,'M-10,22 L10,22 L0,32Z','#ff9a10');mouthEls.lo=lo;P_(q,'M-6,34 Q0,52 6,34Z','#e83a3a');
  for(const s of[-1,1])C(q,s*30,6,6.4,'#fafafc',{stroke:ink,'stroke-width':2.4})}
 q._mouth=m=>{if(mouthEls.lo)A(mouthEls.lo,{transform:`translate(0 ${m*7})`})};return q}
const P_=(g,d,fill,o)=>P(g,d,fill,Object.assign({stroke:'#2a1c13','stroke-width':2.6,'stroke-linejoin':'round'},o||{}));


/* ---- back of the head (view 'back'): no face; hair / hat from behind ---- */
function paxBack(g,P,D,o,ink){const q=G(g,{transform:`scale(${D.hs||(D.kid?1.18:1.1)})`});const hc=D.hc||'#2a1e16',h=D.hair;
 for(const s of[-1,1])C(q,s*31,8,6.2,P.skin,{stroke:ink,'stroke-width':2.5});
 if(h==='pigtails'){for(const s of[-1,1]){blob(q,`M${s*30},-6 Q${s*58},4 ${s*52},46 Q${s*40},32 ${s*28},8Z`,hc,ink);C(q,s*38,10,5,'#e0463a',{stroke:ink,'stroke-width':2})}}
 const skull=h==='straw'?(D.bun||'#d4d4dc'):(h==='bald'&&!D.hc?P.skin:hc);
 C(q,0,0,32,skull,{stroke:ink,'stroke-width':3});for(const dx of[-12,0,12])L(q,dx,-2,dx+(dx?dx*.2:0),18,ink,1.6,{opacity:.18});
 if(h==='straw'){C(q,0,6,14,D.bun||'#d4d4dc',{stroke:ink,'stroke-width':2.4});E('ellipse',{cx:0,cy:-8,rx:50,ry:11,fill:hc,stroke:ink,'stroke-width':3},q);blob(q,'M-30,-8 C-34,-46 34,-46 30,-8Z',hc,ink);R(q,-31,-22,62,8,'#a8332b',{stroke:ink,'stroke-width':2})}
 else if(h==='seedcap'){blob(q,'M-34,2 C-40,-48 40,-48 34,2 Q0,-8 -34,2Z',hc,ink);R(q,-16,-8,32,9,'#ffd23a',{rx:3,stroke:ink,'stroke-width':1.8});L(q,-30,0,30,0,'#1e4f2c',2.4);C(q,0,-40,3.4,'#1e4f2c')}
 else if(h==='pigtails'){blob(q,'M-33,-2 C-38,-46 38,-46 33,-2 Q22,-16 0,-14 Q-22,-16 -33,-2Z',hc,ink)}
 else if(h==='messy'){blob(q,'M-33,0 C-40,-40 -24,-50 -12,-44 L-6,-58 L2,-44 L12,-56 L16,-42 C34,-50 40,-30 33,0 Q20,-8 0,-6 Q-20,-8 -33,0Z',hc,ink);if(D.goggles){R(q,-33,-24,66,8,'#3a3a46',{rx:4,stroke:ink,'stroke-width':2.2})}}
 else if(h==='beanie'){blob(q,'M-34,-2 C-40,-52 40,-52 34,-2Z','#2c2c34',ink);R(q,-35,-12,70,13,'#3d3d48',{rx:6,stroke:ink,'stroke-width':3})}
 else{blob(q,'M-33,-4 C-38,-44 38,-44 33,-4 Q0,10 -33,-4Z',hc,ink)}
 q._mouth=()=>{};return q}

function paxHead(g,P,o){
 let D=PAXH[o.who];if(o.who==='benny'&&o.bare)D=PAXH.benny2;
 if(D.skin)P=Object.assign({},P,{skin:D.skin,skinS:D.skinS||P.skinS});const ink=P.ink,v=o.view||'front';
 if(D.hair==='chicken')return chickenHead(g,P,o,v,ink);
 if(v==='back')return paxBack(g,P,D,o,ink);
 const q=G(g,{transform:`scale(${D.kid?1.18:1.1})`});const ex=PEXP[o.expr||'calm']||PEXP.calm;
 pHairBack(q,D,P,v,ink);
 if(v==='side'){
  C(q,-4,6,6.4,P.skin,{stroke:ink,'stroke-width':2.5});C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});blob(q,'M30,2 Q45,12 31,18Z',P.skin,ink);
  if(ex.eye==='closed')E('path',{d:'M8,4 Q15,8 22,4',fill:'none',stroke:ink,'stroke-width':3,'stroke-linecap':'round'},q);
  else{C(q,15,2,ex.eye==='wide'||ex.eye==='wide2'?7:5.6,'#fff',{stroke:ink,'stroke-width':2});C(q,17,3,2.8,P.eye);if(ex.eye==='half')R(q,6,-6,18,7.6,P.skin)&&L(q,7,2.4,23,2.4,ink,3)}
  L(q,8,-12,24,ex.br[3]>ex.br[1]?-8:-14,ink,4.4);
  const mo=E('ellipse',{cx:24,cy:28,rx:5,ry:1,fill:'#4a1414',opacity:0},q);E('path',{d:'M16,28 Q22,31 28,27',fill:'none',stroke:ink,'stroke-width':2.8,'stroke-linecap':'round'},q);
  pHairFront(q,D,P,v,ink);pFaceExtras(q,Object.assign({},D,{stache:null,beard:D.beard,goggles:D.goggles}),P,v,ink,ex);pSweat(q,o);pPale(q,o);if(o.tear)P_(q,'M20,12 q-4,10 0,16 q4,-6 0,-16Z','#9fe0ff',{stroke:'#2a6a9a','stroke-width':1.2});
  q._mouth=m=>A(mo,{opacity:m>.08?1:0,ry:1+6*m});return q}
 for(const s of[-1,1])C(q,s*33,6,6.4,P.skin,{stroke:ink,'stroke-width':2.5});
 C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
 pPale(q,o);pEyes(q,ex,P,o,ink);
 const lids=(q._lids||[]).map(l=>E('ellipse',{cx:l.cx,cy:2,rx:l.r+1.3,ry:l.r+1.3,fill:P.skin,stroke:ink,'stroke-width':2,opacity:0},q));q._blink=(t,ph)=>{const b=((t*.8+ph)%3.4)<.13;lids.forEach(l=>A(l,{opacity:b?1:0}))};pBrows(q,ex,D,ink);
 E('ellipse',{cx:0,cy:10,rx:5,ry:4.4,fill:P.skinS,stroke:ink,'stroke-width':2},q);
 if(o.blush)for(const s of[-1,1])C(q,s*20,14,6,'#ff7a7a',{opacity:.35});
 pFaceExtras(q,D,P,v,ink,ex);
 const mf=pMouth(q,ex,0,ink);pHairFront(q,D,P,v,ink);pSweat(q,o);pTears(q,o);
 if(D.flatcap&&ex.eye==='closed'){}
 q._mouth=mf;mf(o.mouth||0);return q}
(function(){const _kh=khead;khead=function(g,P,o){if(PAXH[o.who])return paxHead(g,P,o);return _kh(g,P,o)}})();

/* ---- body decorations (called by keeper after the torso/arms are drawn): vest, tie, stethoscope, bandage ... ---- */
const DECO={
 rosa:(g,T,P,v)=>{ // hi-vis vest with a reflective stripe + ID badge ; bandage on the forearm when o.wound
  const vest=v==='side'?'M-22,-256 Q0,-268 22,-256 Q26,-210 24,-170 L24,-140 L-24,-140 L-24,-170 Q-26,-210 -22,-256Z':'M-34,-252 Q0,-266 34,-252 L34,-136 Q0,-130 -34,-136Z';
  blob(g,vest,'#ff8a1c','#241810');L(g,v==='side'?-22:-30,-212,v==='side'?24:30,-212,'#f4f4f6',6);L(g,v==='side'?-22:-30,-186,v==='side'?24:30,-186,'#f4f4f6',6);R(g,v==='side'?6:10,-236,14,10,'#fff',{rx:2,stroke:'#241810','stroke-width':1.4})},
 priya:(g,T,P,v)=>{if(v==='front'){E('path',{d:'M-14,-262 Q-16,-210 0,-196 Q16,-210 14,-262',fill:'none',stroke:'#2a2a30','stroke-width':3},g);C(g,0,-194,6,'#9aa0aa',{stroke:'#2a2a30','stroke-width':2})}},
 park:(g,T,P,v)=>{if(v==='front'){P_(g,'M-8,-262 L0,-250 L8,-262 L6,-230 L0,-222 L-6,-230Z','#c0392b')}},
 teddy:(g,T,P,v)=>{},
 june:(g,T,P,v)=>{if(v==='front'){for(const y of[-230,-205,-180])C(g,0,y,3,'#f1d6bd',{stroke:'#241810','stroke-width':1.4})}},
 lena:(g,T,P,v)=>{},
 dante:(g,T,P,v)=>{R(g,v==='side'?-18:-30,-232,36,22,'#3a4224',{rx:4,stroke:'#241810','stroke-width':2.4});R(g,v==='side'?-18:-30,-202,36,22,'#3a4224',{rx:4,stroke:'#241810','stroke-width':2.4})},
 marcus:(g,T,P,v)=>{R(g,v==='side'?4:12,-236,22,12,'#e8e8f0',{rx:2,stroke:'#241810','stroke-width':1.6});T9(g,v==='side'?15:23,-227,'SEC',8,'#1e1e28')},
 vic:(g,T,P,v)=>{},amara:(g,T,P,v,o)=>{},walt:(g,T,P,v)=>{},benny:(g,T,P,v)=>{
  if(v==='front'){for(const [x,y] of[[-20,-220],[10,-200],[-4,-170],[22,-232]])P_(g,`M${x},${y} q6,-8 12,0 q-4,10 -12,0Z`,'#f0f0f6',{opacity:.9,'stroke-width':1.6})}}};
const T9=(g,x,y,s,size,fill)=>T(g,x,y,s,size,fill,{'font-family':'RC, Inter, sans-serif','font-weight':700});
/* bandage / wound decoration for Rosa's left forearm (front view: right-hand side of the screen) */
function woundDeco(g,T,P,v){const a=v==='side'?T.n.a:T.la;const [e,h]=[a[1],a[2]];const mx=(e[0]+h[0])/2,my=(e[1]+h[1])/2;const ang=Math.atan2(h[1]-e[1],h[0]-e[0])*180/Math.PI;
 const q=G(g,{transform:`translate(${mx} ${my}) rotate(${ang})`});R(q,-13,-9,26,18,'#f2e6c8',{rx:4,stroke:'#241810','stroke-width':2});L(q,-5,-9,-5,9,'#d8c8a0',2);L(q,5,-9,5,9,'#d8c8a0',2);C(q,2,0,3.6,'#a8231c',{opacity:.85})}

/* ---- actor: like chars16.actor() with the options the bus story needs: o.deco, o.sx (bulk), o.sweat/red/pale state, o.mouth key ---- */
const _actor16=actor;
actor=function(g,o){
 if(!PAXH[o.k])return _actor16(g,o);
 const who=o.k,view=o.view||'front';const root=G(g,{});if(o.shadow)E('ellipse',{cx:0,cy:6,rx:78,ry:11,fill:'#1a0d05',opacity:.42,style:'filter:blur(3px)'},root);if(o.rim)root.style.filter=`drop-shadow(-2px -1px 0 ${o.rim})`;const base={x:o.x||0,y:o.y||0,s:o.s||1,fl:o.flip?-1:1,sx:o.sx||1};
 const dec=(gg,T,P,v)=>{if(DECO[who])DECO[who](gg,T,P,v,o);if(o.wound)woundDeco(gg,T,P,v);if(o.stain)P_(gg,v==='side'?'M-6,-200 q10,-8 16,2 q4,14 -8,18 q-14,-2 -8,-20Z':'M-6,-210 q14,-10 24,2 q6,18 -10,26 q-20,-4 -14,-28Z','#d9302a',{'stroke-width':1.4,opacity:.95});if(o.sling)slingDeco(gg,v);if(o.sleeveUp&&v==='front'){const a=o.sleeveUp==='R'?T.ra:T.la;tube(gg,[a[1],a[2]],15,P.skin,P.ink);C(gg,a[2][0],a[2][1],8.5,P.skin,{stroke:P.ink,'stroke-width':2.5})}};
 const mk=pose=>keeper(root,{who,view,pose,expr:o.expr,mood:o.mood,x:.01,y:.01,s:1,pack:o.pack,col:o.col,mouth:0,tilt:o.tilt,noShadow:true,deco:dec,sweat:o.sweat,red:o.red,pale:o.pale,look:o.look,blush:o.blush,bare:o.bare,tear:o.tear});
 const anim=o.anim||'none';const pp=ANIMPOSE[anim];
 /* o.seq = [{at,view,headView,flip,headFlip}] : the character turns during the beat (front <-> back goes through a quick side step) */
 let SQ=null;if(o.seq){const raw=o.seq.slice().sort((a,b)=>a.at-b.at),ex=[];raw.forEach((st,i)=>{const pv=i?raw[i-1].view||view:null,nv=st.view||view;if(pv&&((pv==='front'&&nv==='back')||(pv==='back'&&nv==='front')))ex.push({at:st.at-.14,view:'side',flip:st.flip,headView:'side',headFlip:st.headFlip});ex.push(st)});
  SQ=ex.map(st=>{const kv=Object.assign({},st);const r=G(root,{});const one=keeper(r,{who,view:st.view||view,pose:st.pose||o.pose||'stand',expr:o.expr,mood:o.mood,x:.01,y:.01,s:1,pack:o.pack,col:o.col,mouth:0,tilt:o.tilt,noShadow:true,deco:dec,sweat:o.sweat,red:o.red,pale:o.pale,look:o.look,blush:o.blush,bare:o.bare,tear:o.tear,headView:st.headView,headFlip:st.headFlip});
   A(r,{transform:`scale(${st.flip?-1:1} 1)`});return {at:st.at,g:r,hd:one._hd}})}
 const A1=SQ?SQ[0].g:mk(pp?pp[0]:(o.pose||'stand')),A2=pp&&!SQ?mk(pp[1]):null;
 const hds=SQ?SQ.map(q=>q.hd).filter(Boolean):[A1._hd,A2&&A2._hd].filter(Boolean);const spd=o.spd||(anim==='run'?4.4:anim==='zwalk'?1.8:2.8);
 return {root,upd(u,t,bt){
  const to=o.to,k=o.ease?ease(u):u;let x=base.x,y=base.y;if(to){x=lerp(base.x,to[0],k);y=lerp(base.y,to[1]!=null?to[1]:base.y,k)}
  let bob=0,rot=0,sx=1,sy=1;
  if(SQ){let ai=0;SQ.forEach((q,i)=>{if(bt>=q.at-1e-6)ai=i});SQ.forEach((q,i)=>A(q.g,{display:i===ai?'inline':'none'}))}
  if(pp&&!SQ){const ph=Math.floor(t*spd)%2;A(A1,{display:ph?'none':'inline'});A(A2,{display:ph?'inline':'none'});bob=-Math.abs(Math.sin(t*spd*Math.PI))*(anim==='run'?9:5)}
  else{bob=Math.sin(t*(o.bobSp||1.9)+(o.ph||0))*(o.bob==null?1.4:o.bob)}
  if(o.jump){const j=o.jump;const lt=bt-j.at;if(lt>0&&lt<j.dur){const p=lt/j.dur;bob-=Math.sin(p*Math.PI)*j.h}}
  if(o.fall){const f=o.fall;const lt=bt-f.at;if(lt>0){const p=clamp(lt/f.dur);rot=(f.rot||90)*p*p*(o.flip?-1:1);y+=(f.dy||0)*p*p;x+=(f.dx||0)*p}}
  if(o.shake){const lt=bt-o.shake.at;if(lt>0&&lt<o.shake.dur){x+=Math.sin(lt*60)*o.shake.amp}}
  if(o.tremble){x+=Math.sin(t*47+(o.ph||0))*o.tremble;y+=Math.cos(t*53)*o.tremble*.6}
  if(o.squash){const lt=bt-o.squash.at;if(lt>0&&lt<.25){const p=Math.sin(lt/.25*Math.PI);sy=1-.12*p;sx=1+.1*p}}
  if(o.snore){const br=Math.sin(t*2.2);sy*=1+.012*br;bob+=br*1.5}else{sy*=1+.010*Math.sin(t*2.3+(o.ph||0))}   // breathing
  A(root,{transform:`translate(${x} ${y+bob}) rotate(${rot}) scale(${base.s*base.fl*base.sx*sx} ${base.s*sy})`});
  const talk=o.talk===true?who:o.talk;const m=talk?mouth(talk):(o.mouth||0);hds.forEach(h=>{if(h&&h._mouth)h._mouth(m);if(h&&h._blink)h._blink(t,(o.ph||0)*3.1)})},root,A1,A2}};

/* Amara's baby sling: the baby's head + hat peeks out (front view only) */
function slingDeco(g,v){if(v!=='front')return;blob(g,'M-30,-226 Q0,-204 30,-226 L24,-160 Q0,-146 -24,-160Z','#e8d8b8','#241810');const b=G(g,{transform:'translate(0 -212)'});C(b,0,0,15,'#8d5a3b',{stroke:'#241810','stroke-width':2.4});C(b,0,-9,11,'#ffd0e0',{stroke:'#241810','stroke-width':2});C(b,-5,2,2,'#241810');C(b,5,2,2,'#241810');C(b,0,9,3.4,'#ffd23a',{stroke:'#241810','stroke-width':1.6})}
Object.assign(FRONT,{
 flex:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[70,-232],[64,-298]]},
 flexL:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-70,-232],[-64,-298]],ra:[[30,-248],[40,-190],[38,-134]]},
 hands:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-60,-262],[-26,-300]],ra:[[30,-248],[60,-262],[26,-300]]}});
Object.assign(SIDE,{
 climb:{lean:6,n:{l:[[2,-140],[16,-100],[8,-40]],a:[[2,-250],[22,-300],[26,-350]]},f:{l:[[-2,-140],[-14,-72],[-10,-14]],a:[[-2,-250],[14,-330],[20,-380]]}},
 drive:{lean:2,n:{l:[[2,-140],[24,-96],[44,-40]],a:[[2,-250],[30,-206],[58,-196]]},f:{l:[[-2,-140],[22,-100],[40,-50]],a:[[-2,-250],[26,-210],[56,-200]]}},
 windup:{lean:-12,n:{l:[[2,-140],[14,-76],[8,-14]],a:[[2,-250],[-34,-262],[-62,-320]]},f:{l:[[-2,-140],[-18,-72],[-24,-14]],a:[[-2,-250],[-26,-236],[-48,-290]]}},
 follow:{lean:20,n:{l:[[2,-140],[24,-80],[14,-14]],a:[[2,-250],[56,-214],[96,-160]]},f:{l:[[-2,-140],[-20,-72],[-26,-14]],a:[[-2,-250],[-8,-196],[18,-150]]}},
 punch:{lean:12,n:{l:[[2,-140],[18,-76],[10,-14]],a:[[2,-250],[50,-248],[100,-250]]},f:{l:[[-2,-140],[-16,-72],[-20,-14]],a:[[-2,-250],[-20,-200],[-8,-160]]}}});
