/* ===== scenes16: stage (location + actors + props + game HUD) ===== */
const LIB={};
LIB.blank=(Z,p)=>{R(Z.far,-100,-100,1500,900,'#06070b');return ()=>{}};

/* ---------- props (drawn at origin, pointing up unless noted) ---------- */
const PROP={
 bat:(g,o)=>{blob(g,'M-6,0 L6,0 L10,-120 Q10,-134 0,-134 Q-10,-134 -10,-120Z','#c99a5a','#241810');R(g,-7,4,14,16,'#241810',{rx:4})},
 pole:(g,o)=>{L(g,0,10,0,-250,'#7a5a36',8);L(g,0,-250,16,-262,'#7a5a36',8);L(g,0,10,0,-250,'#a47a4a',3)},
 broom:(g,o)=>{L(g,0,10,0,-210,'#8a6a40',7);P(g,'M-16,-210 L16,-210 L26,-250 L-26,-250Z','#d9b44a',{stroke:'#241810','stroke-width':3})},
 backpack:(g,o)=>{const k=o.k||1;blob(g,`M-34,0 Q-40,-70 -20,-84 Q0,-92 20,-84 Q40,-70 34,0Z`,o.col||'#b45a2a','#241810');R(g,-20,-58,40,34,'#8a3e1a',{rx:6,stroke:'#241810','stroke-width':3});R(g,-8,-96,16,10,'#241810',{rx:4})},
 bagfat:(g,o)=>{blob(g,'M-70,0 Q-92,-90 -50,-130 Q0,-170 50,-130 Q92,-90 70,0Z',o.col||'#7a4a2a','#241810');for(const [x,y] of [[-40,-70],[10,-90],[40,-50],[-10,-40]])C(g,x,y,12,['#e04a4a','#4a8ae0','#ffd23a','#3ac06a'][(x+y)&3],{stroke:'#241810','stroke-width':2});R(g,-14,-176,28,14,'#241810',{rx:5})},
 can:(g,o)=>{R(g,-12,-30,24,30,'#c9d1d8',{rx:4,stroke:'#241810','stroke-width':2.5});R(g,-12,-22,24,8,o.col||'#d9302a')},
 chair:(g,o)=>{R(g,-26,-60,52,8,'#6a4a2c',{rx:3,stroke:'#241810','stroke-width':2.5});L(g,-22,-52,-26,0,'#6a4a2c',7);L(g,22,-52,26,0,'#6a4a2c',7);L(g,-24,-60,-24,-118,'#6a4a2c',7);L(g,24,-60,24,-118,'#6a4a2c',7);R(g,-26,-126,52,14,'#6a4a2c',{rx:3,stroke:'#241810','stroke-width':2.5})},
 cone:(g,o)=>{P(g,'M-20,0 L-6,-62 L6,-62 L20,0Z','#ff7a1c',{stroke:'#241810','stroke-width':3,'stroke-linejoin':'round'});R(g,-12,-36,24,9,'#fff');R(g,-26,-3,52,8,'#ff7a1c',{rx:3,stroke:'#241810','stroke-width':2.5})},
 whistle:(g,o)=>{R(g,-16,-8,32,16,'#d0d6dc',{rx:6,stroke:'#241810','stroke-width':2.5});C(g,-10,0,5,'#241810');R(g,12,-5,12,10,'#d0d6dc',{rx:3})},
 flash:(g,o)=>{R(g,-9,-50,18,50,'#e8c24a',{rx:5,stroke:'#241810','stroke-width':2.5});R(g,-13,-62,26,16,'#6a6e76',{rx:4,stroke:'#241810','stroke-width':2.5})},
 radio:(g,o)=>{R(g,-18,-70,36,70,'#2c3038',{rx:8,stroke:'#241810','stroke-width':2.5});L(g,10,-70,14,-110,'#2c3038',5);R(g,-12,-60,24,18,'#9fe8a0',{rx:3});for(let i=0;i<3;i++)C(g,-8+i*8,-26,3,'#8a8f98')},
 clip:(g,o)=>{R(g,-26,-70,52,70,'#c9a86a',{rx:4,stroke:'#241810','stroke-width':2.5});R(g,-20,-62,40,56,'#f6f2e4');for(let i=0;i<4;i++)L(g,-14,-50+i*10,14,-50+i*10,'#9a9a9a',2);R(g,-10,-76,20,10,'#6a6e76',{rx:3})},
 rope:(g,o)=>{for(let i=0;i<5;i++)E('ellipse',{cx:0,cy:-8-i*5,rx:24-i*2,ry:9,fill:'none',stroke:'#c9a86a','stroke-width':5},g)},
 mirror:(g,o)=>{C(g,0,-24,22,'#cfe8f5',{stroke:'#241810','stroke-width':3});P(g,'M-10,-34 L2,-42 L-6,-26Z','#fff',{opacity:.9})},
 crate:(g,o)=>{R(g,-44,-80,88,80,'#9a6a3c',{stroke:'#241810','stroke-width':3});L(g,-44,-80,44,0,'#6a4524',5);L(g,44,-80,-44,0,'#6a4524',5)},
 box:(g,o)=>{R(g,-36,-60,72,60,'#c9a86a',{stroke:'#241810','stroke-width':3});R(g,-36,-60,72,10,'#a98a4a')},
 ration:(g,o)=>{R(g,-30,-40,60,40,'#2a6a3a',{rx:5,stroke:'#241810','stroke-width':2.5});T(g,0,-14,'MRE',16,'#fff')},
 water:(g,o)=>{R(g,-14,-54,28,54,'#8fd0f0',{rx:8,stroke:'#241810','stroke-width':2.5,opacity:.9});R(g,-8,-64,16,12,'#2a6ad0',{rx:3})},
 tv:(g,o)=>{R(g,-60,-90,120,84,'#16181e',{rx:6,stroke:'#241810','stroke-width':3});R(g,-52,-82,104,68,'#6ad0ff');R(g,-22,-6,44,10,'#16181e')},
 stuff:(g,o)=>{R(g,-24,-40,48,40,'#7a8a9a',{stroke:'#241810','stroke-width':2.5});C(g,0,-20,10,'#4a5a6a')},
 sofa:(g,o)=>{R(g,-90,-60,180,50,pk(o,'#7a3a3a','#e0605a'),{rx:12,stroke:'#241810','stroke-width':3});R(g,-100,-84,200,34,pk(o,'#8a4444','#f07a74'),{rx:14,stroke:'#241810','stroke-width':3});R(g,-84,-10,10,14,'#241810');R(g,74,-10,10,14,'#241810')},
 plant:(g,o)=>{R(g,-26,-44,52,44,'#a8643a',{rx:6,stroke:'#241810','stroke-width':3});for(const [dx,dy,r] of [[-18,-52,-30],[0,-70,0],[18,-52,30],[-8,-60,-14],[10,-60,14]])P(g,`M0,-44 Q${dx*1.6},${dy-30} ${dx*2.2},${dy-60}`,null,{stroke:'#2f8a3a','stroke-width':13,fill:'none','stroke-linecap':'round'})},
 plank:(g,o)=>{R(g,-80,-10,160,20,'#a47a4a',{stroke:'#241810','stroke-width':3});L(g,-60,0,-52,0,'#6a4524',3)},
};
function mkProp(g,o){const q=G(g,{});const fn=PROP[o.t];if(fn)fn(q,o);A(q,{transform:`translate(${o.x||0} ${o.y||0}) rotate(${o.rot||0}) scale(${(o.flip?-1:1)*(o.s||1)} ${o.s||1})`});return q}

/* ---------- game HUD (part of the scene, so it is pixelated together with it) ---------- */
function skullIcon(g,x,y,s,col){const q=G(g,{transform:`translate(${x} ${y}) scale(${s})`});C(q,0,-4,13,col||'#fff');R(q,-8,6,16,10,col||'#fff',{rx:3});C(q,-5,-4,3.6,'#101018');C(q,5,-4,3.6,'#101018');R(q,-1.5,3,3,4,'#101018');return q}
function hudGame(g,h){const q=G(g,{});
 R(q,34,26,250,50,'rgba(8,10,28,.82)',{rx:8,stroke:'#7dffb0','stroke-width':3});skullIcon(q,66,52,1.05,'#fff');
 const dn=T(q,166,64,'DEATHS  '+(h.deaths||0),24,'#ffe066',{'font-family':'JetBrains Mono, DejaVu Sans Mono, monospace','font-weight':800,'text-anchor':'middle'});
 if(h.lv!=null){R(q,1046,26,200,50,'rgba(8,10,28,.82)',{rx:8,stroke:'#7dffb0','stroke-width':3});T(q,1146,62,'LV '+h.lv,26,'#7dffb0',{'font-family':'JetBrains Mono, DejaVu Sans Mono, monospace','font-weight':800})}
 if(h.hp!=null){R(q,34,84,250,16,'rgba(8,10,28,.82)',{rx:5,stroke:'#fff','stroke-width':2});const hb=R(q,38,88,242*h.hp,8,h.hp>.4?'#3ac06a':'#e0463a',{rx:3});q._hp=hb}
 return q}
function tagBadge(g,kind){const q=G(g,{});
 if(kind==='game'){R(q,34,26,0,0,'none');}
 return q}
function modeTag(g,kind,o){const q=G(g,{});const x=o&&o.x!=null?o.x:34,y=o&&o.y!=null?o.y:26;
 if(kind==='REAL'){R(q,x,y,196,44,'rgba(10,10,12,.72)',{rx:8});const dot=C(q,x+24,y+22,8,'#ff2a2a');T(q,x+112,y+31,'REAL LIFE',24,'#fff',{'font-family':'RC, Inter, sans-serif','letter-spacing':3,'font-weight':700});q._dot=dot}
 else if(kind==='GAME'){R(q,x,y,196,44,'rgba(8,10,28,.85)',{rx:8,stroke:'#7dffb0','stroke-width':3});T(q,x+98,y+31,'GAME MODE',22,'#7dffb0',{'font-family':'JetBrains Mono, DejaVu Sans Mono, monospace','font-weight':800,'letter-spacing':2})}
 return q}

/* ---------- STAGE ---------- */
function makeAct(Z,a,p){const layer=a.layer==='near'?Z.near:a.layer==='far'?Z.far:Z.mid;
 if(a.k==='dog'){const D=dog(layer,{x:a.x,y:a.y,s:a.s||1,flip:a.flip,pose:a.pose||'stand',boots:a.boots!==false,tongue:a.tongue,sil:a.sil});const b=D.root._b;
  return {upd(u,t,bt){const to=a.to;if(to){const k=a.ease?ease(u):u;b.x=lerp(a.x,to[0],k);b.y=lerp(a.y,to[1]!=null?to[1]:a.y,k)}dogMove(D,t,a.pose==='walk'?(a.spd||11):0)}}}
 if(a.k==='horde'){return horde(layer,Object.assign({col:pk(p,'#06050a','#2a7a3a'),eye:pk(p,null,'#ffe14a')},a))}
 if(a.k==='prop'){const q=mkProp(layer,a);return {upd(u,t,bt){if(a.to){const k=a.ease?ease(u):u;A(q,{transform:`translate(${lerp(a.x,a.to[0],k)} ${lerp(a.y,a.to[1]!=null?a.to[1]:a.y,k)}) rotate(${(a.rot||0)+(a.spin||0)*u}) scale(${(a.flip?-1:1)*(a.s||1)} ${a.s||1})`})}else if(a.spin||a.sway){A(q,{transform:`translate(${a.x} ${a.y}) rotate(${(a.rot||0)+(a.spin||0)*u+(a.sway||0)*Math.sin(bt*5)}) scale(${(a.flip?-1:1)*(a.s||1)} ${a.s||1})`})}}}}
 const o=Object.assign({mood:p.mood},a);const act=actor(layer,o);
 if(a.held){const h=a.held;const sc=a.s||1;const pq=mkProp(act.root,{t:h.t,x:h.ox,y:h.oy,rot:h.rot,s:h.s||1,flip:h.flip,col:h.col,skin:p.skin})}
 return act}
LIB.stage=(Z,p)=>{
 const loc=LOC[p.loc]||LOC.studio;const lu=loc(Z,p);
 const acts=(p.acts||[]).map(a=>makeAct(Z,a,p));
 let hud=null;if(p.skin==='game'&&p.hud){hud=hudGame(Z.hud,p.hud)}
 if(p.tag)modeTag(Z.hud,p.tag,p.tagPos||(p.tag==='GAME'?{x:542,y:26}:null));
 return (u,t,bt)=>{lu(u,t,bt);acts.forEach(a=>a.upd(u,t,bt))}};
