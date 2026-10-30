/* ===== chars16: the cast of HOW TO SURVIVE (same outlined flat style as the keeper rig) =====
   Coach Dex (guru), Steve (NPC zombie), Maya (his daughter), Respawn (dog, dog16.js), horde silhouettes */
let _uid2=0;const uid2=p=>p+(++_uid2);
function defsLong(){document.getElementById('defs').insertAdjacentHTML('beforeend',`
 <linearGradient id="gLens" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8fcf"/><stop offset=".55" stop-color="#173a63"/><stop offset="1" stop-color="#0a1a30"/></linearGradient>
 <linearGradient id="gSkyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58b6ff"/><stop offset="1" stop-color="#bfe8ff"/></linearGradient>
 <linearGradient id="gSkyReal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d7f8f"/><stop offset="1" stop-color="#c9c4b4"/></linearGradient>
 <linearGradient id="gSkyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2552"/><stop offset=".55" stop-color="#b4535a"/><stop offset="1" stop-color="#f3a35a"/></linearGradient>
 <linearGradient id="gSkyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04060f"/><stop offset="1" stop-color="#14264a"/></linearGradient>
 <linearGradient id="gSkyDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a7a"/><stop offset=".5" stop-color="#e48a6a"/><stop offset="1" stop-color="#ffd9a0"/></linearGradient>
 <linearGradient id="gFloorShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
 <linearGradient id="gWallShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".35" stop-color="#000" stop-opacity="0"/></linearGradient>
 <radialGradient id="gSpot"><stop offset="0" stop-color="#fff6d8" stop-opacity=".85"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
 <radialGradient id="gNeon"><stop offset="0" stop-color="#ff3da0" stop-opacity=".55"/><stop offset="1" stop-color="#ff3da0" stop-opacity="0"/></radialGradient>
 <radialGradient id="gLamp"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>
 <linearGradient id="gCone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6c8" stop-opacity=".75"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>
 <linearGradient id="gSkySoft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3a6e"/><stop offset=".45" stop-color="#c2677a"/><stop offset=".8" stop-color="#f1a477"/><stop offset="1" stop-color="#f8d3a0"/></linearGradient>
 <linearGradient id="gHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6bf92" stop-opacity="0"/><stop offset=".6" stop-color="#f6bf92" stop-opacity=".42"/><stop offset="1" stop-color="#f6bf92" stop-opacity="0"/></linearGradient>
 <linearGradient id="gGroundShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1606" stop-opacity="0"/><stop offset="1" stop-color="#2a1606" stop-opacity=".4"/></linearGradient>
 <linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b87a6"/><stop offset="1" stop-color="#1a3550"/></linearGradient>`)}

/* ---------- palettes ---------- */
KWHO.dex=Object.assign({},KBASE,{skin:'#d9a373',skinS:'#b17d52',coat:'#ff7a1c',coatS:'#c4560a',sleeve:'#4d5260',pants:'#3a3d46',boot:'#17171b',hat:'#17171b',cuff:'#17171b',ink:'#241810',eye:'#1a120c'});
KWHO.steve=Object.assign({},KBASE,{skin:'#93b87e',skinS:'#6f955e',coat:'#e9e6da',coatS:'#b9b5a4',pants:'#5a5560',boot:'#2a2326',ink:'#1b2316',eye:'#1a120c'});
KWHO.maya=Object.assign({},KBASE,{skin:'#e8bd94',skinS:'#c99a70',coat:'#ffd23a',coatS:'#c79a10',pants:'#3a5fa8',boot:'#d8452a',ink:'#2a1c13'});
KWHO.npc=Object.assign({},KBASE,{skin:'#e1b48c',skinS:'#bf8f67',coat:'#5b7fa6',coatS:'#3f5f84',pants:'#3a3f4d',boot:'#1c1b20'});
KWHO.npc2=Object.assign({},KBASE,{skin:'#b57d58',skinS:'#8f5d3d',coat:'#a64c4c',coatS:'#7a3333',pants:'#2f3340',boot:'#1c1b20'});

/* ---------- extra poses ---------- */
Object.assign(SIDE,{
 walk2:{lean:4,n:{l:[[-2,-140],[-20,-72],[-34,-14]],a:[[2,-250],[22,-200],[40,-160]]},f:{l:[[2,-140],[26,-76],[30,-14]],a:[[-2,-250],[-12,-196],[-30,-150]]}},
 run:{lean:14,n:{l:[[2,-140],[44,-100],[30,-34]],a:[[2,-250],[-26,-216],[-52,-244]]},f:{l:[[-2,-140],[-34,-94],[-62,-52]],a:[[-2,-250],[36,-216],[62,-252]]}},
 run2:{lean:14,n:{l:[[-2,-140],[-34,-94],[-62,-52]],a:[[2,-250],[36,-216],[62,-252]]},f:{l:[[2,-140],[44,-100],[30,-34]],a:[[-2,-250],[-26,-216],[-52,-244]]}},
 point:{lean:4,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[52,-258],[104,-262]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[-10,-190],[-6,-134]]}},
 zombie:{lean:10,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[54,-248],[106,-244]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[52,-238],[102,-234]]}},
 zwalk:{lean:12,n:{l:[[2,-140],[24,-74],[26,-14]],a:[[2,-250],[54,-248],[106,-244]]},f:{l:[[-2,-140],[-16,-72],[-28,-14]],a:[[-2,-250],[52,-238],[102,-234]]}},
 zwalk2:{lean:12,n:{l:[[-2,-140],[-16,-72],[-28,-14]],a:[[2,-250],[54,-248],[106,-244]]},f:{l:[[2,-140],[24,-74],[26,-14]],a:[[-2,-250],[52,-238],[102,-234]]}},
 wave:{lean:0,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[26,-292],[30,-346]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[-10,-190],[-6,-134]]}},
 sneak:{lean:22,n:{l:[[2,-120],[30,-66],[10,-14]],a:[[2,-232],[24,-186],[44,-164]]},f:{l:[[-2,-120],[-16,-64],[-26,-14]],a:[[-2,-232],[10,-186],[22,-160]]}},
 hold2:{lean:2,n:{l:[[2,-140],[6,-72],[4,-14]],a:[[2,-250],[34,-222],[70,-250]]},f:{l:[[-2,-140],[-8,-72],[-10,-14]],a:[[-2,-250],[26,-224],[60,-252]]}}   // two hands up front (bat / pole)
});
Object.assign(FRONT,{
 finger:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[66,-262],[70,-324]]},
 shrug:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-64,-216],[-88,-232]],ra:[[30,-248],[64,-216],[88,-232]]},
 hips:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-66,-200],[-30,-166]],ra:[[30,-248],[66,-200],[30,-166]]},
 thumb:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[60,-232],[66,-276]]},
 wave:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[78,-262],[84,-320]]},
 facepalm:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-40,-190],[-38,-134]],ra:[[30,-248],[56,-300],[8,-318]]},
 zombie:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-36,-210],[-30,-166]],ra:[[30,-248],[36,-210],[30,-166]]},
 cheer:{l:[[-14,-140],[-16,-72],[-16,-14]],r:[[14,-140],[16,-72],[16,-14]],la:[[-30,-248],[-70,-292],[-80,-346]],ra:[[30,-248],[70,-292],[80,-346]]}
});

/* ---------- heads ---------- */
const _khead=khead;
khead=function(g,P,o){if(o.who==='dex')return dexHead(g,P,o);if(o.who==='steve')return steveHead(g,P,o);if(o.who==='maya')return mayaHead(g,P,o);return _khead(g,P,o)};
const DEXEX={ /* shades, brows [x1,y1,x2,y2 for the +x brow; mirrored], eye, resting mouth */
 cool:{sh:1,br:[6,-17,20,-18],eye:'norm',mo:'smile'},   up:{sh:0,br:[6,-16,20,-18],eye:'norm',mo:'smile'},
 smug:{sh:1,br:[6,-19,20,-15],eye:'norm',mo:'smirk',br2:[6,-14,20,-16]},
 shock:{sh:0,br:[6,-24,20,-26],eye:'wide',mo:'o'},   sad:{sh:0,br:[6,-12,20,-18],eye:'norm',mo:'frown'},
 angry:{sh:0,br:[6,-16,20,-9],eye:'norm',mo:'grit'},  tired:{sh:0,br:[6,-12,20,-12],eye:'half',mo:'flat'},
 smile:{sh:0,br:[6,-17,20,-19],eye:'happy',mo:'grin'}, wink:{sh:0,br:[6,-17,20,-19],eye:'wink',mo:'grin'},
 stare:{sh:0,br:[6,-15,20,-15],eye:'wide',mo:'flat'}};
function dexHead(g,P,o){
 const q=G(g,{transform:'scale(1.16)'}),ink=P.ink,beard='#2b1d16';
 const ex=DEXEX[o.expr]||DEXEX.cool;const shades=o.shades!=null?o.shades:ex.sh;
 if(o.view==='back'){C(q,-31,8,6.5,P.skin,{stroke:ink,'stroke-width':2.5});C(q,31,8,6.5,P.skin,{stroke:ink,'stroke-width':2.5});C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
  E('path',{d:'M-30,10 Q0,44 30,10 L26,30 Q0,50 -26,30Z',fill:P.skinS},q);L(q,-34,-6,34,-6,'#d9a82a',3.4);return q}
 if(o.view==='side'){
  C(q,-4,6,6.5,P.skin,{stroke:ink,'stroke-width':2.5});C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
  E('path',{d:'M-14,-24 Q0,-31 14,-26',fill:'none',stroke:'#f6d9b8','stroke-width':4,'stroke-linecap':'round',opacity:.8},q);
  blob(q,'M32,2 Q46,12 32,18Z',P.skin,ink);                                        // nose
  blob(q,'M-26,6 Q-22,40 14,44 Q34,42 33,18 Q24,24 12,22 Q-6,18 -14,8Z',beard,ink);  // beard
  E('path',{d:'M14,30 Q22,33 29,29',fill:'none',stroke:'#e8a08a','stroke-width':2.6,'stroke-linecap':'round'},q);
  if(shades){blob(q,'M4,-8 L26,-8 Q30,-8 29,-3 Q27,10 16,11 Q6,10 4,-8Z','url(#gLens)','#d9a82a');L(q,-6,-6,4,-7,'#d9a82a',3)}
  else{C(q,16,2,5.8,'#fff',{stroke:ink,'stroke-width':2});C(q,18,2.5,2.8,P.eye);L(q,8,-12,24,-14,ink,4)}
  if(shades)L(q,8,-15,24,-16,ink,4);
  const mo=E('ellipse',{cx:24,cy:30,rx:5,ry:1,fill:'#4a1414',opacity:0},q);q._mouth=m=>A(mo,{opacity:m>.08?1:0,ry:1+7*m});return q}
 // front
 C(q,-33,6,6.5,P.skin,{stroke:ink,'stroke-width':2.5});C(q,33,6,6.5,P.skin,{stroke:ink,'stroke-width':2.5});
 C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
 E('path',{d:'M-19,-23 Q-6,-31 9,-28',fill:'none',stroke:'#f6d9b8','stroke-width':4,'stroke-linecap':'round',opacity:.8},q);
 // eyes / shades
 const eyes=G(q,{});
 const eye=(s)=>{const e=G(eyes,{});
  if(ex.eye==='happy'){E('path',{d:`M${s*12-7},4 Q${s*12},-5 ${s*12+7},4`,fill:'none',stroke:ink,'stroke-width':3.4,'stroke-linecap':'round'},e)}
  else if(ex.eye==='wink'&&s>0){L(e,s*12-7,2,s*12+7,2,ink,3.4)}
  else if(ex.eye==='half'){C(e,s*12,3,5.6,'#fff',{stroke:ink,'stroke-width':2});C(e,s*12,4,2.8,P.eye);R(e,s*12-7,-4,14,7,P.skin)&&L(e,s*12-7,3,s*12+7,3,ink,3)}
  else{const r=ex.eye==='wide'?8:5.8;C(e,s*12,2,r,'#fff',{stroke:ink,'stroke-width':2});C(e,s*12+(o.look||0),3,ex.eye==='wide'?3.6:2.9,P.eye);C(e,s*12+(o.look||0)+1.4,1.2,1.1,'#fff')}};
 eye(-1);eye(1);
 // brows (mirror)
 const b=ex.br,b2=ex.br2||ex.br;
 L(q,-b2[0],b2[1],-b2[2],b2[3],ink,5);L(q,b[0],b[1],b[2],b[3],ink,5);
 if(shades){const sg=G(q,{});
  for(const s of[-1,1]){blob(sg,`M${s*3},-9 L${s*27},-9 Q${s*31},-9 ${s*30},-4 Q${s*27},12 ${s*14},13 Q${s*4},12 ${s*3},-9Z`,'url(#gLens)','#d9a82a');
   E('path',{d:`M${s*8},-5 L${s*18},-5`,stroke:'#fff',opacity:.55,'stroke-width':2.4,'stroke-linecap':'round'},sg)}
  L(sg,-3,-5,3,-5,'#d9a82a',3);L(sg,-30,-6,-34,-5,'#d9a82a',3);L(sg,30,-6,34,-5,'#d9a82a',3)}
 else if(o.shades==null||o.shades===0){
  // shades pushed up on the forehead
  const up=G(q,{transform:'translate(0 -27) scale(.82)'});for(const s of[-1,1])blob(up,`M${s*3},-9 L${s*27},-9 Q${s*31},-9 ${s*30},-4 Q${s*27},12 ${s*14},13 Q${s*4},12 ${s*3},-9Z`,'url(#gLens)','#d9a82a');L(up,-3,-5,3,-5,'#d9a82a',3)}
 // nose, moustache, beard
 E('ellipse',{cx:0,cy:10,rx:5.4,ry:4.6,fill:P.skinS,stroke:ink,'stroke-width':2},q);
 blob(q,'M-31,4 Q-36,38 0,47 Q36,38 31,4 Q24,22 12,23 Q0,18 -12,23 Q-24,22 -31,4Z',beard,ink);
 blob(q,'M-15,17 Q-7,11 0,16 Q7,11 15,17 Q8,23 0,19 Q-8,23 -15,17Z','#1d130e');
 // mouth (updated per frame by _mouth)
 const mg=G(q,{});
 const closed=E('path',{d:'',fill:'none',stroke:'#e8a08a','stroke-width':3.2,'stroke-linecap':'round','stroke-linejoin':'round'},mg);
 const opn=G(mg,{});const cav=E('ellipse',{cx:0,cy:30,rx:9,ry:2,fill:'#4a1414'},opn);const teeth=R(opn,-7,27,14,3.5,'#fff',{rx:1.5});const tng=E('ellipse',{cx:0,cy:33,rx:5,ry:2.4,fill:'#e0707a'},opn);
 const shape={smile:'M-10,28 Q0,35 10,28',grin:'M-11,27 Q0,38 11,27 Z',smirk:'M-9,30 Q2,31 11,25',frown:'M-9,33 Q0,26 9,33',flat:'M-8,30 L8,30',grit:'M-9,29 L9,29',o:'M0,0'};
 q._mouth=m=>{const op=(ex.mo==='o'?Math.max(m,.6):m);
  if(op>.07){A(closed,{d:''});A(opn,{display:'inline'});const ry=2+9*op,rx=7+4*op;A(cav,{cy:29+ry*.3,rx,ry});A(teeth,{y:29+ry*.3-ry+.5,x:-rx*.8,width:rx*1.6,height:Math.min(3.8,ry*.7)});A(tng,{cy:29+ry*.3+ry*.55,rx:rx*.55,ry:Math.max(.8,ry*.35)})}
  else{A(opn,{display:'none'});A(closed,{d:shape[ex.mo]||shape.smile,fill:ex.mo==='grin'?'#fff':'none'})}};
 q._mouth(o.mouth||0);return q}

function steveHead(g,P,o){const q=G(g,{transform:'scale(1.08)'}),ink=P.ink,v=o.view;
 if(v==='side'){C(q,-4,6,6,P.skin,{stroke:ink,'stroke-width':2.5});C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});blob(q,'M31,2 Q43,10 31,17Z',P.skin,ink);
  C(q,13,0,7,'#f4f1d8',{stroke:ink,'stroke-width':2});C(q,15,1,2.4,'#1a120c');L(q,5,-11,22,-8,ink,3.4);
  blob(q,'M12,22 Q26,20 31,26 Q26,33 12,30Z','#3a1010',ink);R(q,20,22,4,5,'#f4f1d8');L(q,-14,12,-4,24,'#6f955e',2.4);
  blob(q,'M-20,-24 L-14,-44 L-8,-28 L0,-46 L6,-28 L14,-40 L16,-22Z','#4a3a2a',ink);return q}
 C(q,-33,6,6,P.skin,{stroke:ink,'stroke-width':2.5});C(q,33,6,6,P.skin,{stroke:ink,'stroke-width':2.5});C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
 blob(q,'M-22,-26 L-18,-46 L-9,-30 L-2,-48 L6,-30 L16,-44 L20,-24 Q0,-34 -22,-26Z','#4a3a2a',ink);
 E('ellipse',{cx:-12,cy:5,rx:11,ry:8,fill:'#6f955e',opacity:.4},q);E('ellipse',{cx:12,cy:5,rx:11,ry:8,fill:'#6f955e',opacity:.4},q);
 C(q,-12,2,8,'#f4f1d8',{stroke:ink,'stroke-width':2});C(q,-10,3,2.6,'#1a120c');
 C(q,12,2,6,'#f4f1d8',{stroke:ink,'stroke-width':2});C(q,13,1,2.2,'#1a120c');
 L(q,-20,-10,-5,-6,ink,3.6);L(q,6,-6,20,-12,ink,3.6);
 E('path',{d:'M0,5 Q5,13 0,17',fill:'none',stroke:ink,'stroke-width':2.4,'stroke-linecap':'round'},q);
 blob(q,'M-11,24 Q0,20 11,24 Q12,34 0,36 Q-12,34 -11,24Z','#3a1010',ink);R(q,-5,24,4.5,5,'#f4f1d8');R(q,2,24,4.5,5,'#f4f1d8');
 L(q,16,16,26,24,'#6f955e',2.4);L(q,20,14,22,26,'#6f955e',2.4);
 q._mouth=()=>{};return q}

function mayaHead(g,P,o){const q=G(g,{transform:'scale(1.0)'}),ink=P.ink,hair='#4a2c1a',v=o.view;
 for(const s of[-1,1]){blob(q,`M${s*28},-8 Q${s*58},-6 ${s*52},34 Q${s*40},22 ${s*30},14Z`,hair,ink);C(q,s*38,-6,6,'#e0463a',{stroke:ink,'stroke-width':2})}
 C(q,0,0,32,P.skin,{stroke:ink,'stroke-width':3});
 blob(q,'M-33,-4 Q-36,-44 0,-44 Q36,-44 33,-4 Q20,-26 0,-24 Q-20,-26 -33,-4Z',hair,ink);
 if(v==='back'){C(q,0,-2,33,hair,{stroke:ink,'stroke-width':3});return q}
 const ex=o.expr||'smile';
 for(const s of[-1,1]){C(q,s*12,4,6.6,'#fff',{stroke:ink,'stroke-width':2});C(q,s*12+(o.look||0),5,3.6,P.eye);C(q,s*12+1.4,3,1.3,'#fff');L(q,s*5,-8,s*19,-10-(ex==='sad'?-s*-2:0),ink,2.6);C(q,s*20,16,5,'#f19a8a',{opacity:.55})}
 E('path',{d:'M0,9 Q3,13 0,15',fill:'none',stroke:ink,'stroke-width':2.2,'stroke-linecap':'round'},q);
 E('path',{d:ex==='sad'?'M-7,26 Q0,21 7,26':'M-8,22 Q0,32 8,22',fill:'none',stroke:ink,'stroke-width':2.8,'stroke-linecap':'round'},q);
 q._mouth=()=>{};return q}

/* ---------- actor factory ---------- */
const ANIMPOSE={walk:['walk','walk2'],run:['run','run2'],zwalk:['zwalk','zwalk2']};
function actor(g,o){
 const who=o.k||'dex',view=o.view||'side';const dark=!!o.dark;
 const root=G(g,{});const base={x:o.x||0,y:o.y||0,s:o.s||1,fl:o.flip?-1:1};
 const mk=pose=>{const q=keeper(root,{who,view,pose,expr:o.expr,mood:o.mood,x:.01,y:.01,s:1,pack:o.pack,dark,col:o.col,rim:o.rim,shades:o.shades,mouth:0,tilt:o.tilt,noShadow:o.noShadow});return q};
 const anim=o.anim||'none';const pp=ANIMPOSE[anim];
 const A1=mk(pp?pp[0]:(o.pose||'stand')),A2=pp?mk(pp[1]):null;
 const hds=[A1._hd,A2&&A2._hd].filter(Boolean);
 const spd=o.spd||(anim==='run'?4.4:anim==='zwalk'?1.8:2.8);   // steps per second
 let extra=null;if(o.prop)extra=o.prop(A1,A2);
 return {root,upd(u,t,bt){
  const to=o.to,k=o.ease?ease(u):u;let x=base.x,y=base.y;if(to){x=lerp(base.x,to[0],k);y=lerp(base.y,to[1]!=null?to[1]:base.y,k)}
  let bob=0,rot=0,sx=1,sy=1;
  if(pp){const ph=Math.floor(t*spd)%2;A(A1,{display:ph?'none':'inline'});A(A2,{display:ph?'inline':'none'});bob=-Math.abs(Math.sin(t*spd*Math.PI))*(anim==='run'?9:5)}
  else{bob=Math.sin(t*1.9+(o.ph||0))*(o.bob==null?1.6:o.bob)}
  if(o.jump){const j=o.jump;const lt=bt-j.at;if(lt>0&&lt<j.dur){const p=lt/j.dur;bob-=Math.sin(p*Math.PI)*j.h}}
  if(o.fall){const f=o.fall;const lt=bt-f.at;if(lt>0){const p=clamp(lt/f.dur);rot=(f.rot||90)*p*p*(o.flip?-1:1);y+=(f.dy||0)*p*p;x+=(f.dx||0)*p}}
  if(o.shake){const lt=bt-o.shake.at;if(lt>0&&lt<o.shake.dur){x+=Math.sin(lt*60)*o.shake.amp}}
  if(o.squash){const lt=bt-o.squash.at;if(lt>0&&lt<.25){const p=Math.sin(lt/.25*Math.PI);sy=1-.12*p;sx=1+.1*p}}
  A(root,{transform:`translate(${x} ${y+bob}) rotate(${rot}) scale(${base.s*base.fl*sx} ${base.s*sy})`});
  const m=o.talk?mouth(o.talk===true?who:o.talk):(o.mouth||0);hds.forEach(h=>h&&h._mouth&&h._mouth(m));
  if(o.look!=null&&false){}
 },root,A1,A2}}

/* ---------- zombie silhouettes / crowd ---------- */
function zomb(g,x,y,s,seed,col,eye){col=col||'#05040a';const z=G(g,{});const body=G(z,{});
 limb(body,[[-9,-60],[-12,-28],[-12,0]],11,col);limb(body,[[9,-60],[12,-28],[14,0]],11,col);
 limb(body,[[0,-62],[3,-102]],26,col);limb(body,[[-12,-98],[-40,-96],[-62,-92]],9,col);limb(body,[[12,-98],[40,-94],[62,-88]],9,col);
 const head=G(body,{});C(head,3,-122,15,col);
 const e1=C(head,-1,-124,3.2,eye||'#ff2a2a',{opacity:1}),e2=C(head,8,-124,3.2,eye||'#ff2a2a',{opacity:1}),gl=C(head,3,-124,17,'url(#gRed)',{opacity:eye?0:.8});
 const o={z,body,head,e1,e2,gl,x,y,s,seed};A(z,{transform:`translate(${x} ${y}) scale(${s})`});return o}
function horde(g,o){/* {n,x0,x1,y,s,seed,col,eye,jit,to:dx} -> {upd} ; zombies drift toward -x (or +x with dir) */
 const n=o.n||6,zs=[];for(let i=0;i<n;i++){const k=n>1?i/(n-1):.5;const sd=(o.seed||0)+i*3.7;const x=lerp(o.x0,o.x1,k)+(rnd(sd)-.5)*(o.jit==null?40:o.jit);const y=o.y+(rnd(sd+1)-.5)*(o.yj==null?24:o.yj);
  zs.push({z:zomb(g,x,y,(o.s||1)*(.9+rnd(sd+2)*.25),sd,o.col,o.eye),x,y,sd})}
 return {upd(u,t,bt){const dx=(o.to||0)*u;zs.forEach(q=>{const sw=Math.sin(t*1.6+q.sd)*3,hop=Math.abs(Math.sin(t*3+q.sd))*-3;
   A(q.z.z,{transform:`translate(${q.x+dx+sw} ${q.y+hop}) scale(${q.z.s*(o.flip?-1:1)} ${q.z.s})`});A(q.z.head,{transform:`rotate(${Math.sin(t*2.3+q.sd)*4+8} 3 -108)`})})}}}
