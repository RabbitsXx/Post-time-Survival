/* ===== scenes9: vertical overrides (HUD / mode tag in WINDOW coordinates 450x800) + extra props ===== */
function hudGame(g,h){const q=G(g,{});const MONO_='JetBrains Mono, DejaVu Sans Mono, monospace';
 R(q,16,148,196,46,'rgba(8,10,28,.84)',{rx:8,stroke:'#7dffb0','stroke-width':3});skullIcon(q,44,171,.95,'#fff');
 T(q,134,181,'DEATHS  '+(h.deaths||0),22,'#ffe066',{'font-family':MONO_,'font-weight':800,'text-anchor':'middle'});
 if(h.lv!=null){R(q,318,98,116,44,'rgba(8,10,28,.84)',{rx:8,stroke:'#7dffb0','stroke-width':3});T(q,376,130,'LV '+h.lv,24,'#7dffb0',{'font-family':MONO_,'font-weight':800})}
 if(h.hp!=null){R(q,16,200,196,16,'rgba(8,10,28,.84)',{rx:5,stroke:'#fff','stroke-width':2});R(q,20,204,188*h.hp,8,h.hp>.4?'#3ac06a':'#e0463a',{rx:3})}
 return q}
function modeTag(g,kind,o){const q=G(g,{});const MONO_='JetBrains Mono, DejaVu Sans Mono, monospace';
 if(kind==='REAL'){R(q,16,98,168,42,'rgba(10,10,12,.74)',{rx:8});C(q,38,119,8,'#ff2a2a');T(q,114,128,'B · REAL LIFE',20,'#fff',{'font-family':'RC, Inter, sans-serif','letter-spacing':2,'font-weight':700})}
 else if(kind==='GAME'){R(q,16,98,168,42,'rgba(8,10,28,.88)',{rx:8,stroke:'#7dffb0','stroke-width':3});T(q,100,126,'A · GAME BRAIN',17,'#7dffb0',{'font-family':MONO_,'font-weight':800,'letter-spacing':1})}
 return q}
/* extra props: drawn at the origin, pointing up */
Object.assign(PROP,{
 phone:(g,o)=>{R(g,-17,-58,34,58,'#15171c',{rx:6,stroke:'#241810','stroke-width':2.5});R(g,-14,-53,28,46,o.on===false?'#202430':(o.col||'#7fd3ff'),{rx:3});if(o.on!==false){C(g,0,-30,11,'#ffffff',{opacity:.25});R(g,-9,-44,18,4,'#fff',{opacity:.6,rx:2})}},
 flare:(g,o)=>{R(g,-5,-46,10,46,'#e0463a',{rx:3,stroke:'#241810','stroke-width':2});R(g,-5,-34,10,6,'#fff');if(o.lit!==false){C(g,0,-58,16,'url(#gFire)',{opacity:.95});C(g,0,-56,6,'#fff3b0')}},
 medkit:(g,o)=>{R(g,-26,-38,52,38,'#f4f4f6',{rx:6,stroke:'#241810','stroke-width':2.5});R(g,-4,-32,8,26,'#e0463a');R(g,-13,-23,26,8,'#e0463a');R(g,-8,-46,16,9,'#241810',{rx:3})},
 gauze:(g,o)=>{R(g,-18,-20,36,20,'#f2e6c8',{rx:4,stroke:'#241810','stroke-width':2.5});for(let i=0;i<3;i++)L(g,-10,-14+i*6,10,-14+i*6,'#c9b98f',2)},
 soap:(g,o)=>{R(g,-16,-18,32,18,'#9fe8ff',{rx:6,stroke:'#241810','stroke-width':2.5});C(g,-6,-26,4,'#fff',{opacity:.8});C(g,6,-32,3,'#fff',{opacity:.8})},
 map:(g,o)=>{P(g,'M-34,0 L-34,-52 L-12,-58 L12,-52 L34,-58 L34,-6 L12,0 L-12,-6Z','#e9dfc0',{stroke:'#241810','stroke-width':2.5,'stroke-linejoin':'round'});P(g,'M-24,-18 Q-8,-40 8,-24 T26,-36',null,{fill:'none',stroke:'#e0463a','stroke-width':3,'stroke-dasharray':'4 4'});T(g,16,-14,'X',16,'#e0463a')},
 sandwich:(g,o)=>{R(g,-24,-14,48,14,'#d9b06a',{rx:7,stroke:'#241810','stroke-width':2.5});R(g,-22,-22,44,8,'#7acb5a');R(g,-24,-32,48,14,'#d9b06a',{rx:7,stroke:'#241810','stroke-width':2.5})},
 watch:(g,o)=>{R(g,-8,-22,16,44,'#2c3038');C(g,0,0,18,'#e9edf2',{stroke:'#241810','stroke-width':3});L(g,0,0,0,-11,'#241810',3);L(g,0,0,8,4,'#e0463a',3)},
 gun:(g,o)=>{R(g,-30,-12,60,14,'#2b2e36',{rx:3,stroke:'#0b0d12','stroke-width':2.5});R(g,-6,0,14,26,'#2b2e36',{rx:3});R(g,26,-9,34,7,'#2b2e36')},
 sign:(g,o)=>{R(g,-2,-70,4,70,'#7a5a36');R(g,-46,-110,92,46,o.bg||'#fff',{rx:6,stroke:'#241810','stroke-width':3});T(g,0,-78,o.txt||'HI',22,o.fg||'#111',{'font-family':'RC, Inter, sans-serif','font-weight':700})},
});
Object.assign(PROP,{
 wheel:(g,o)=>{const q=G(g,{transform:'rotate(-18)'});E('ellipse',{cx:0,cy:0,rx:13,ry:52,fill:'none',stroke:'#14161c','stroke-width':9},q);E('ellipse',{cx:0,cy:0,rx:13,ry:52,fill:'none',stroke:'#3a3f4a','stroke-width':3},q);L(q,0,-50,0,50,'#14161c',5);C(q,0,0,10,'#2a2d36',{stroke:'#0b0d12','stroke-width':3})},
 cat:(g,o)=>{const q=G(g,{});E('ellipse',{cx:0,cy:-16,rx:22,ry:17,fill:o.col||'#f0a040',stroke:'#241810','stroke-width':3},q);C(q,0,-40,15,o.col||'#f0a040',{stroke:'#241810','stroke-width':3});P(q,'M-13,-50 l-3,-14 l11,8Z','#f0a040',{stroke:'#241810','stroke-width':2.4});P(q,'M13,-50 l3,-14 l-11,8Z','#f0a040',{stroke:'#241810','stroke-width':2.4});C(q,-5,-41,2.4,'#241810');C(q,5,-41,2.4,'#241810');P(q,'M0,-37 l-2,3 h4Z','#e08080')},
 cooler:(g,o)=>{R(g,-30,-34,60,34,'#3a8ad0',{rx:5,stroke:'#241810','stroke-width':2.5});R(g,-30,-40,60,10,'#f4f4f6',{rx:4,stroke:'#241810','stroke-width':2.5})},
 briefcase:(g,o)=>{R(g,-26,-30,52,30,'#5a3a22',{rx:4,stroke:'#241810','stroke-width':2.5});R(g,-8,-36,16,8,'none',{rx:3,stroke:'#241810','stroke-width':3});R(g,-4,-18,8,6,'#e8c24a')},
 pen:(g,o)=>{R(g,-5,-34,10,34,'#f4f4f6',{rx:3,stroke:'#241810','stroke-width':2});R(g,-5,-34,10,8,'#2a6ad0');L(g,0,0,0,10,'#cfd6de',2.4)},
 soda:(g,o)=>{R(g,-9,-34,18,34,'#d9302a',{rx:4,stroke:'#241810','stroke-width':2});R(g,-9,-22,18,8,'#fff')},
 horn:(g,o)=>{P(g,'M-16,-8 L10,-24 L10,12 L-16,0Z','#cfd6de',{stroke:'#241810','stroke-width':2.4});R(g,-24,-8,10,8,'#cfd6de')},
 pie:(g,o)=>{E('ellipse',{cx:0,cy:-8,rx:26,ry:12,fill:'#d9a24a',stroke:'#241810','stroke-width':2.5},g);E('ellipse',{cx:0,cy:-14,rx:22,ry:8,fill:'#e8b868'},g);for(const x of[-10,0,10])L(g,x,-18,x+4,-12,'#9a6a22',2.4)},
 lever:(g,o)=>{R(g,-14,-10,28,12,'#2a2d36',{rx:3});L(g,0,-6,o.up?16:-16,-48,'#cf2a24',8);C(g,o.up?16:-16,-48,9,'#ff4a3a',{stroke:'#241810','stroke-width':2.4})},
 gary:(g,o)=>{const q=G(g,{});P(q,'M-18,0 Q-24,-26 -8,-34 Q0,-52 14,-44 Q26,-44 26,-34 L34,-30 L26,-26 Q24,-6 14,0Z','#5ac05a',{stroke:'#241810','stroke-width':2.6,'stroke-linejoin':'round'});C(q,16,-38,2.4,'#241810');for(let i=0;i<3;i++)P(q,`M${-10+i*9},-34 l4,-8 l4,8Z`,'#3a9a3a')},
 bone:(g,o)=>{R(g,-12,-4,24,8,'#f4f4f6',{rx:4,stroke:'#241810','stroke-width':2});C(g,-14,-4,5,'#f4f4f6',{stroke:'#241810','stroke-width':2});C(g,14,-4,5,'#f4f4f6',{stroke:'#241810','stroke-width':2})},
});
Object.assign(PROP,{
 ticket:(g,o)=>{R(g,-20,-14,40,26,'#f4f0d8',{rx:3,stroke:'#241810','stroke-width':2});for(let i=0;i<3;i++)L(g,-12,-6+i*7,12,-6+i*7,'#9a8a5a',2);R(g,10,-14,6,26,'#e0463a')},
 sauce:(g,o)=>{R(g,-9,-14,18,28,'#d9302a',{rx:3,stroke:'#241810','stroke-width':2});R(g,-6,-6,12,8,'#fff');R(g,-9,-14,18,4,'#8e1f1a')},
 bulge:(g,o)=>{const q=G(g,{});E('ellipse',{cx:0,cy:0,rx:24,ry:15,fill:o.col||'#23232e',stroke:'#14101a','stroke-width':2.4},q);L(q,-16,-2,16,-2,'#14141c',2.2)},
 newspaper:(g,o)=>{R(g,-26,-20,52,40,'#e8e2cc',{rx:2,stroke:'#241810','stroke-width':2});for(let i=0;i<4;i++)L(g,-18,-10+i*8,18,-10+i*8,'#6a6450',2)},
});
Object.assign(PROP,{
 jerry:(g,o)=>{R(g,-20,-52,40,52,'#d9302a',{rx:6,stroke:'#241810','stroke-width':3});R(g,-8,-62,16,12,'#d9302a',{rx:3,stroke:'#241810','stroke-width':2.5});R(g,-12,-40,24,14,'#f4f4f6',{rx:3});T(g,0,-29,'DIESEL',8,'#111',{'font-family':'RC, Inter, sans-serif','font-weight':700});R(g,10,-70,8,16,'#241810',{rx:3})},
 hose:(g,o)=>{E('path',{d:o.d||'M0,0 C60,-80 120,-40 150,30',fill:'none',stroke:'#1a1a20','stroke-width':9,'stroke-linecap':'round'},g);E('path',{d:o.d||'M0,0 C60,-80 120,-40 150,30',fill:'none',stroke:'#4a4a56','stroke-width':3,'stroke-linecap':'round'},g)},
 barrier:(g,o)=>{R(g,-150,-8,300,16,'#e0e0e8',{rx:4,stroke:'#241810','stroke-width':2.5});for(let i=0;i<6;i++)R(g,-150+i*50,-8,25,16,'#e0463a');R(g,-6,-4,12,60,'#3a3d48')},
 tat:(g,o)=>{T(g,0,0,o.txt||'MOM',o.size||16,o.col||'#2a3a8a',{'font-family':'RC, Inter, sans-serif','font-weight':700,'letter-spacing':1.5,opacity:.9})},
});
Object.assign(PROP,{
 cables:(g,o)=>{const cs=['#f4f4f6','#2a6ad0','#e0463a','#ffd23a','#2ab85a','#111'];cs.forEach((c,i)=>E('path',{d:`M-14,${-34+i*13} q14,-7 28,0`,fill:'none',stroke:c,'stroke-width':4,'stroke-linecap':'round'},g));P(g,'M10,40 l6,-10 l6,10Z','#cfd6de',{stroke:'#241810','stroke-width':1.6})},
 pizza:(g,o)=>{R(g,-24,-14,48,30,'#c9a86a',{rx:4,stroke:'#241810','stroke-width':2.4});R(g,-24,-14,48,8,'#e8c88a',{rx:3});T(g,0,10,'HOT POCKET',8,'#7a3a1a',{'font-family':'RC, Inter, sans-serif','font-weight':700})},
 scratch:(g,o)=>{for(let i=0;i<3;i++)E('path',{d:`M${-12+i*10},-24 q4,24 -2,48`,fill:'none',stroke:'#c4443a','stroke-width':3.4,'stroke-linecap':'round'},g);for(let i=0;i<3;i++)E('path',{d:`M${-12+i*10},-24 q4,24 -2,48`,fill:'none',stroke:'#ff8a7a','stroke-width':1.2,'stroke-linecap':'round',opacity:.7},g)},
 mermaid:(g,o)=>{E('path',{d:'M0,-30 q-10,10 0,22 q10,10 0,26 q-6,6 -14,4 q6,-6 -2,-12 q-8,-10 4,-24 q6,-10 12,-16Z',fill:'#2a9a8a',stroke:'#14504a','stroke-width':1.6},g);T(g,0,30,'ELVIS 77',9,'#7a1a1a',{'font-family':'RC, Inter, sans-serif','font-weight':700})},
});
