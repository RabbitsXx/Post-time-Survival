/* ===== farmcast9: the cast of THE LAST HARVEST (new faces, new hats) on top of pax9's head / body system ===== */
defPax('ruth',{skin:'#d9a67e',skinS:'#b98258',coat:'#a8332b',coatS:'#7e231d',pants:'#355c8a',boot:'#4a3524',ink:'#241810'},{hair:'straw',hc:'#d9b868',bun:'#d4d4dc',brow:'thick',bags:1});
defPax('eli',{skin:'#e9be98',skinS:'#c99a74',coat:'#3f7f5a',coatS:'#2c5a40',pants:'#4a4f66',boot:'#e8e2cf',ink:'#241810'},{hair:'messy',hc:'#4a2f1a',goggles:1,kid:1});
defPax('junie',{skin:'#f0cfae',skinS:'#d1a984',coat:'#f0c23a',coatS:'#c89c14',pants:'#a8332b',boot:'#7a4a2a',ink:'#241810'},{hair:'pigtails',hc:'#b8641f',kid:1});
defPax('hank',{skin:'#d9a07a',skinS:'#b8785a',coat:'#55704a',coatS:'#3b5233',pants:'#3a3f4d',boot:'#2a2118',ink:'#241810'},{hair:'seedcap',hc:'#2f6f3f',beard:'#6a3f1a',brow:'thick'});
(function(){const _b=pHairBack,_f=pHairFront;
 pHairBack=function(q,D,P,v,ink){const h=D.hair,c=D.hc||'#222';
  if(h==='straw'){C(q,v==='side'?-26:0,-30,13,D.bun||'#ddd',{stroke:ink,'stroke-width':3});return}
  if(h==='pigtails'){if(v==='front'){for(const s of[-1,1]){blob(q,`M${s*33},-6 Q${s*58},4 ${s*52},44 Q${s*40},30 ${s*30},8Z`,c,ink);C(q,s*40,10,5,'#e0463a',{stroke:ink,'stroke-width':2})}}else blob(q,'M-26,-6 Q-58,6 -52,44 Q-38,30 -26,8Z',c,ink);return}
  return _b(q,D,P,v,ink)};
 pHairFront=function(q,D,P,v,ink){const h=D.hair,c=D.hc||'#222';
  if(h==='straw'){blob(q,'M-30,-6 C-34,-46 34,-46 30,-6 Q0,-12 -30,-6Z',c,ink);E('ellipse',{cx:0,cy:-8,rx:v==='side'?44:52,ry:10,fill:c,stroke:ink,'stroke-width':3},q);R(q,-31,-20,62,8,'#a8332b',{stroke:ink,'stroke-width':2});
   for(let i=-4;i<=4;i++)L(q,i*10,-8,i*10+2,-2,'#b8963e',1.6);return}
  if(h==='pigtails'){blob(q,'M-33,-2 C-38,-46 38,-46 33,-2 Q22,-20 6,-20 Q-4,-6 -18,-18 Q-28,-14 -33,-2Z',c,ink);return}
  if(h==='seedcap'){blob(q,v==='side'?'M-34,-2 C-38,-46 36,-48 34,-4 Z':'M-34,-4 C-38,-46 38,-46 34,-4 Q0,-10 -34,-4Z',c,ink);if(v==='front'){blob(q,'M-28,-4 Q0,-20 28,-4 Q0,-12 -28,-4Z','#ffd23a',ink);R(q,-12,-34,24,12,'#ffd23a',{rx:3,stroke:ink,'stroke-width':1.6});T(q,0,-25,'SEED',9,'#2f6f3f',{'font-family':'RC, Inter, sans-serif','font-weight':700})}else blob(q,'M-4,-6 Q22,-8 40,-2 Q20,2 -4,0Z','#ffd23a',ink);return}
  return _f(q,D,P,v,ink)}})();
Object.assign(DECO,{
 ruth:(g,T,P,v)=>{if(v==='front'){R(g,-26,-236,52,98,'#355c8a',{rx:6,stroke:'#241810','stroke-width':2.4});R(g,-14,-214,28,22,'#2a4a72',{rx:3});L(g,-26,-250,-18,-236,'#355c8a',7);L(g,26,-250,18,-236,'#355c8a',7);C(g,-18,-236,3.6,'#ffd23a');C(g,18,-236,3.6,'#ffd23a')}},
 eli:(g,T,P,v)=>{if(v==='front'){R(g,-30,-196,60,36,'#2c5a40',{rx:8,opacity:.9,stroke:'#241810','stroke-width':2});L(g,-8,-250,-8,-228,'#e8e2cf',2.4);L(g,8,-250,8,-228,'#e8e2cf',2.4)}},
 junie:(g,T,P,v)=>{if(v==='front'){for(let i=0;i<5;i++)C(g,-18+i*9,-150-Math.sin(i)*2,3.4,'#fff',{opacity:.85});L(g,-30,-250,-20,-210,'#c89c14',6);L(g,30,-250,20,-210,'#c89c14',6)}},
 hank:(g,T,P,v)=>{R(g,v==='side'?-20:-32,-232,v==='side'?38:64,100,'#3b5233',{rx:6,stroke:'#241810','stroke-width':2.4,opacity:.9});if(v==='front')for(const y of[-210,-186,-162])R(g,-20,y,40,6,'#2a3a25',{rx:2})}});
