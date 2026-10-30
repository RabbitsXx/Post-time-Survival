/* ===== world9: data-driven worlds.  SPEC.world = {id,time,pal:{sky:[3],ground,ink,glow,hills,wall,floor},locs:{key:{kind:'out'|'in'|'lane',items:[...],...}},cast:{id:{pal,hair,...}},ann:{style,name,sub}}
   Registers per world: LOC['w_<id>'] (sets: out = side-on 2D, in = room, lane = 2.5D perspective), CARD['<id>_ann'] (the world's announcer device), and every cast member (defPax).
   Items {t,x,y,s,c,c2,w,h,label,z(0 far/blurred,1 mid,2 near/blurred)}; y = ground line (default 600). ===== */
(function(){const W=window.SPEC&&SPEC.world;if(!W)return;
{const bf=document.getElementById('bfade');if(bf)bf.style.background='linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.32) 50%,rgba(0,0,0,.6) 100%)';const vg=document.getElementById('vig');if(vg)vg.style.opacity='.55'}
const INK=(W.pal&&W.pal.ink)||'#1a1208',GL=(W.pal&&W.pal.glow)||'#ffd98a',S=(g,o)=>Object.assign({stroke:INK,'stroke-width':3,'stroke-linejoin':'round'},o||{});
const sh=(c,a)=>c; const rr=(n)=>rnd(n);
/* ---- cast ---- */
for(const id in (W.cast||{})){const c=W.cast[id];defPax(id,Object.assign({ink:'#241810',boot:'#2a2118',skinS:'#c99a74'},c.pal||{}),Object.assign({},c.look||{}))}
/* ---- item catalogue: draw(g,o) with the ground point at (0,0), facing the viewer ---- */
const IT={
 building:(g,o)=>{const w=o.w||180,h=o.h||300,c=o.c||'#4a5068';R(g,-w/2,-h,w,h,c,S());R(g,-w/2-6,-h-10,w+12,14,o.c2||'#2f3345',S());const rows=Math.floor(h/58),cols=Math.max(2,Math.floor(w/52));for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){const lit=rr(r*7+k*3+(o.x||0))<(o.lit==null?.35:o.lit);R(g,-w/2+14+k*(w-28)/cols,-h+22+r*58,(w-28)/cols-10,34,lit?GL:'#1d2233',{rx:2,opacity:lit?.95:.9})}R(g,-18,-52,36,52,'#1d2233',S())},
 house:(g,o)=>{const w=o.w||200,h=o.h||130;R(g,-w/2,-h,w,h,o.c||'#b98a5a',S());P(g,`M${-w/2-14},${-h} L0,${-h-80} L${w/2+14},${-h}Z`,o.c2||'#6a2e26',S());R(g,-18,-64,36,64,'#3a2418',S());R(g,w/2-70,-96,44,40,GL,S());R(g,-w/2+26,-96,44,40,GL,S())},
 tree:(g,o)=>{const h=o.h||240;R(g,-8,-h*.5,16,h*.5,'#4a3520',S({'stroke-width':2.5}));C(g,0,-h*.66,h*.34,o.c||'#2f5a34',S());C(g,-h*.2,-h*.52,h*.22,o.c2||'#3a6a3c',S({'stroke-width':0}));C(g,h*.18,-h*.78,h*.2,o.c2||'#3a6a3c',S({'stroke-width':0}))},
 pine:(g,o)=>{const h=o.h||260;R(g,-6,-30,12,30,'#4a3520');for(let i=0;i<4;i++)P(g,`M${-70+i*10},${-30-i*h*.2} L0,${-h*.4-i*h*.2-30} L${70-i*10},${-30-i*h*.2}Z`,o.c||'#1f4a36',S({'stroke-width':2.5}))},
 lamp:(g,o)=>{const h=o.h||260;R(g,-5,-h,10,h,'#3a3a44',S({'stroke-width':2}));R(g,-34,-h-6,68,12,'#2a2a34',S({'stroke-width':2.5}));C(g,0,-h+4,o.r||150,'url(#gLamp)',{opacity:.45});C(g,0,-h+2,8,'#fff3c0')},
 crate:(g,o)=>{const w=o.w||80;R(g,-w/2,-w,w,w,o.c||'#a67c46',S());L(g,-w/2,-w,w/2,0,'#6a4a26',4);L(g,w/2,-w,-w/2,0,'#6a4a26',4)},
 barrel:(g,o)=>{R(g,-30,-76,60,76,o.c||'#5a6a7a',S({rx:10}));L(g,-30,-52,30,-52,'#2a343e',4);L(g,-30,-24,30,-24,'#2a343e',4)},
 car:(g,o)=>{const c=o.c||'#9a3a3a';P(g,'M-110,-30 L-100,-70 L-60,-76 L-34,-112 L50,-112 L84,-76 L112,-66 L116,-30Z',c,S());P(g,'M-28,-104 L-52,-76 L-10,-76 L-10,-104Z M2,-104 L2,-76 L76,-76 L46,-104Z','#9fc3d8',S({'stroke-width':2.4}));for(const x of[-68,72]){C(g,x,-24,24,'#1a1a20',S());C(g,x,-24,10,'#8a8a94')}},
 sign:(g,o)=>{R(g,-5,-150,10,150,'#4a3a2a');R(g,-60,-190,120,64,o.c||'#e8e2cf',S());const t=T(g,0,-148,o.label||'',26,INK,{'font-family':RCF,'font-weight':700});fitText(t,104)},
 door:(g,o)=>{R(g,-44,-150,88,150,o.c||'#6a4a30',S());R(g,-30,-136,60,50,'#4a3220',{rx:3});C(g,28,-74,5,'#d9b24a')},
 window:(g,o)=>{R(g,-40,-96,80,96,o.lit===false?'#1d2233':GL,S());L(g,0,-96,0,0,INK,3);L(g,-40,-48,40,-48,INK,3);if(o.lit!==false)C(g,0,-48,110,'url(#gLamp)',{opacity:.35})},
 fence:(g,o)=>{const w=o.w||300;for(let x=0;x<=w;x+=50)R(g,x-w/2-4,-76,8,76,'#6a5438',S({'stroke-width':2}));L(g,-w/2,-58,w/2,-58,'#7a6244',6);L(g,-w/2,-30,w/2,-30,'#7a6244',6)},
 shelf:(g,o)=>{const w=o.w||200;R(g,-w/2,-220,w,220,'#5a4a38',S());for(let r=0;r<3;r++){L(g,-w/2,-150+r*-0,w/2,-150,'#3a2c1e',3);}L(g,-w/2,-146,w/2,-146,'#3a2c1e',5);L(g,-w/2,-74,w/2,-74,'#3a2c1e',5);for(let i=0;i<5;i++){R(g,-w/2+12+i*(w-24)/5,-146-30,(w-24)/5-6,30,['#c0504a','#4a7ab0','#d9b24a','#5a9a5a','#9a6ab0'][i%5],S({'stroke-width':1.8}));R(g,-w/2+12+i*(w-24)/5,-74-30,(w-24)/5-6,30,['#d9b24a','#c0504a','#5a9a5a','#4a7ab0','#9a6ab0'][i%5],S({'stroke-width':1.8}))}},
 table:(g,o)=>{const w=o.w||180;R(g,-w/2,-84,w,12,o.c||'#7a5a38',S());R(g,-w/2+10,-72,10,72,'#5a4028');R(g,w/2-20,-72,10,72,'#5a4028')},
 bed:(g,o)=>{R(g,-90,-40,180,40,'#5a4a38',S());R(g,-86,-62,172,28,o.c||'#7aa0b8',S());R(g,-86,-74,50,18,'#f0ece0',S({'stroke-width':2.4},{rx:6}))},
 tent:(g,o)=>{P(g,'M-90,0 L0,-120 L90,0Z',o.c||'#c8803a',S());P(g,'M-22,0 L0,-52 L22,0Z','#2a1a0e')},
 tower:(g,o)=>{const h=o.h||360;P(g,`M-40,0 L-12,${-h} L12,${-h} L40,0Z`,'none',S({'stroke-width':4}));for(let k=1;k<7;k++)L(g,-40+k*5.3,-k*h/7,40-k*5.3,-k*h/7,INK,3);R(g,-34,-h-40,68,40,o.c||'#7a8a9a',S());C(g,0,-h-18,6,'#ff4a3a')},
 hill:(g,o)=>{P(g,`M${-(o.w||500)/2},0 Q0,${-(o.h||180)*2} ${(o.w||500)/2},0Z`,o.c||'#2a2f44',{})},
 rock:(g,o)=>{P(g,'M-50,0 L-38,-40 L-6,-58 L30,-44 L52,0Z',o.c||'#6a6a74',S())},
 stairs:(g,o)=>{const n=o.n||8,rn=o.run||64,rs=o.rise||46,W2=n*rn;
  const bk=G(g,{opacity:.55});for(let i=0;i<n;i++)R(bk,W2+150-(i+1)*rn*.7,-n*rs-14-(i+1)*rs*.8,(i+1)*rn*.7,(i+1)*rs*.8,'#5a5a66',S({'stroke-width':2}));
  R(g,W2-4,-n*rs-14,200,16,'#8a8478',S());L(g,W2-4,-n*rs-14,W2+196,-n*rs-14,'#e0b83a',4);
  let d=`M0,0 L0,-${rs}`;for(let i=0;i<n;i++)d+=` L${i*rn},${-(i+1)*rs} L${(i+1)*rn},${-(i+1)*rs}`;d+=` L${n*rn},0Z`;
  P(g,d,'#7a7468',S());
  for(let i=0;i<n;i++){R(g,i*rn,-(i+1)*rs,rn,12,'#c9c3b4',S({'stroke-width':2.4}));R(g,i*rn,-(i+1)*rs,rn,4,'#e0b83a');if(i>0)L(g,i*rn,-(i+1)*rs+12,i*rn,-i*rs,'#5a5448',2.4)}
  P(g,`M0,0 L${W2},0 L${W2},${-n*rs} Z`,'#14141c',{opacity:.28});
  const hy=-110;L(g,0,hy,W2,-n*rs+hy,'#e4e8ee',8);L(g,0,hy-4,W2,-n*rs+hy-4,'#aab2bb',2);for(let i=0;i<=n;i++){const x=i*rn,y=-i*rs;L(g,x,y-(i?rs:0),x,y+hy,'#aab2bb',4)}
  R(g,-8,hy-6,14,hy*-1+6,'#aab2bb',S({'stroke-width':2.4}));R(g,W2-6,-n*rs+hy-6,14,-hy+6,'#aab2bb',S({'stroke-width':2.4}))}, ladder:(g,o)=>{const h=o.h||260;L(g,-22,0,-22,-h,'#8a6a3a',7);L(g,22,0,22,-h,'#8a6a3a',7);for(let y=20;y<h;y+=34)L(g,-22,-y,22,-y,'#8a6a3a',5)},
 rubble:(g,o)=>{for(let i=0;i<9;i++)P(g,`M${-90+i*22},0 L${-80+i*22},${-24-rr(i)*40} L${-60+i*22},0Z`,['#6a6a74','#5a5a64','#7a6a5a'][i%3],S({'stroke-width':2}))},
 bush:(g,o)=>{for(let i=0;i<4;i++)C(g,-40+i*27,-26-(i%2)*10,28,o.c||'#2f5a34',S({'stroke-width':2.4}))},
 cabinet:(g,o)=>{R(g,-50,-170,100,170,o.c||'#7a8a8a',S());L(g,0,-170,0,0,INK,3);C(g,-8,-90,4,'#2a2a2a');C(g,8,-90,4,'#2a2a2a')},
 poster:(g,o)=>{R(g,-54,-130,108,130,o.c||'#e8e2cf',S({'stroke-width':2.4}));const t=T(g,0,-70,o.label||'',22,'#a8332b',{'font-family':RCF,'font-weight':700});fitText(t,92)},
 glow:(g,o)=>{C(g,0,0,o.r||200,'url(#gLamp)',{opacity:o.a||.5})},
 pipe:(g,o)=>{const w=o.w||320;R(g,-w/2,-60,w,22,o.c||'#7a7a84',S({'stroke-width':2.4}));for(let x=-w/2+30;x<w/2;x+=90)R(g,x,-66,10,34,'#5a5a64')},
 tank:(g,o)=>{R(g,-60,-150,120,150,o.c||'#8a9aa8',S({rx:30}));L(g,-60,-110,60,-110,'#5a6a78',3);L(g,-60,-60,60,-60,'#5a6a78',3)},
 generator:(g,o)=>{R(g,-70,-90,140,90,o.c||'#c8a030',S());for(let i=0;i<5;i++)L(g,-50+i*22,-76,-50+i*22,-24,'#7a5a10',4);C(g,50,-70,7,'#e0463a')},
 flag:(g,o)=>{L(g,0,0,0,-240,'#8a8a94',6);P(g,'M0,-236 L90,-212 L0,-186Z',o.c||'#c0392b',S({'stroke-width':2.4}))},
 rails:(g,o)=>{const w=o.w||900;R(g,-w/2,-10,w,8,'#6a6a74');for(let x=-w/2;x<w/2;x+=40)R(g,x,-4,22,10,'#4a3a2a')},
 bus:(g,o)=>{R(g,-150,-120,300,100,o.c||'#d9a030',S());for(let i=0;i<5;i++)R(g,-136+i*56,-104,44,36,'#9fc3d8',S({'stroke-width':2}));for(const x of[-96,96])C(g,x,-20,26,'#1a1a20',S())},
 boat:(g,o)=>{P(g,'M-120,-30 L120,-30 L90,10 L-90,10Z',o.c||'#8a5a3a',S());L(g,0,-30,0,-180,'#5a4a3a',6);P(g,'M6,-176 L90,-60 L6,-60Z','#e8e2cf',S({'stroke-width':2.4}))},
 cart:(g,o)=>{R(g,-50,-70,100,44,o.c||'#aab2bb',S({'stroke-width':2.4}));for(const x of[-34,34])C(g,x,-14,12,'#1a1a20');L(g,50,-70,76,-110,'#aab2bb',5)},
 elevator:(g,o)=>{R(g,-70,-210,140,210,'#8a96a4',S());R(g,-60,-200,57,200,o.open?'#ffe9a8':'#aab4c0',S({'stroke-width':2.4}));R(g,3,-200,57,200,o.open?'#ffe9a8':'#aab4c0',S({'stroke-width':2.4}));if(o.open)C(g,0,-100,200,'url(#gLamp)',{opacity:.5});R(g,-30,-250,60,34,'#0a0e12',S({'stroke-width':2.4}));T(g,0,-224,o.label||'G',26,'#ff5a4a',{'font-family':MONO,'font-weight':800});C(g,88,-110,8,'#e0463a',S({'stroke-width':2}))},
 floorsign:(g,o)=>{R(g,-52,-120,104,120,'#e8e2cf',S());T(g,0,-44,String(o.label||'1'),84,'#a8332b',{'font-family':RCF,'font-weight':700});T(g,0,-100,'FLOOR',18,'#3a2c1e',{'font-family':RCF,'font-weight':700,'letter-spacing':3})},
 sofa:(g,o)=>{R(g,-100,-50,200,50,o.c||'#a64c4c',S());R(g,-100,-110,200,64,o.c2||'#c0605a',S());R(g,-116,-80,30,80,o.c||'#a64c4c',S());R(g,86,-80,30,80,o.c||'#a64c4c',S())},
 pizza:(g,o)=>{R(g,-34,-12,68,12,'#d9b878',S({'stroke-width':2.4}));T(g,0,-3,'PIZZA',9,'#a8332b',{'font-family':RCF,'font-weight':700})},
 cage:(g,o)=>{L(g,0,-170,0,-120,'#8a8a94',3);R(g,-40,-120,80,100,'none',S({'stroke-width':3,stroke:'#cfd6de'}));for(let i=-30;i<=30;i+=15)L(g,i,-120,i,-20,'#cfd6de',2.4);R(g,-44,-24,88,8,'#8a8a94');C(g,0,-60,18,'#5ac85a',S({'stroke-width':2.4}));P(g,'M12,-58 L30,-52 L12,-48Z','#ffb020',S({'stroke-width':1.8}));C(g,5,-66,3.4,'#fff');C(g,6,-66,1.6,'#000');P(g,'M-16,-50 Q-40,-30 -14,-18Z','#2f9a4a',S({'stroke-width':2}))},
 glassdoor:(g,o)=>{const w=o.w||240,h=o.h||210;R(g,-w/2,-h,w,h,'#10202e',S({'stroke-width':5}));R(g,-w/2+8,-h+8,w-16,h-16,'#1c3a50',{opacity:.9});C(g,0,-h*.5,160,'url(#gLamp)',{opacity:.35});if(o.crowd!==false)for(let i=0;i<5;i++){const x=-w/2+30+i*(w-60)/4;E('ellipse',{cx:x,cy:-h+60,rx:11,ry:13,fill:'#06090e'},g);P(g,`M${x-16},-6 L${x-10},${-h+78} L${x+10},${-h+78} L${x+16},-6Z`,'#06090e');C(g,x-4,-h+58,2.2,'#ff3a2a');C(g,x+4,-h+58,2.2,'#ff3a2a')}L(g,0,-h,0,0,'#cfd6de',5);R(g,-w/2,-30,w,30,'#0a0e14')},
 rail:(g,o)=>{const w=o.w||320,h=o.h||300;L(g,0,0,w,-h,'#8a8a94',7);for(let i=0;i<=6;i++){const x=i*w/6,y=-i*h/6;L(g,x,y,x,y+60,'#6a6a74',4)}},
 skyline:(g,o)=>{for(let i=0;i<14;i++){const w=70+rr(i)*60,h=140+rr(i+9)*300,x=i*95-120;R(g,x,-h,w,h,i%2?'#141c34':'#1a2440');for(let r=0;r<Math.floor(h/36);r++)for(let k=0;k<Math.floor(w/26);k++)if(rr(i*13+r*5+k)<.28)R(g,x+8+k*24,-h+10+r*36,12,16,GL,{opacity:.8})}},
 keys:(g,o)=>{C(g,0,-30,22,'none',{stroke:'#aab2bb','stroke-width':7});for(let i=0;i<6;i++){const q=G(g,{transform:`rotate(${-60+i*24} 0 -30)`});R(q,-5,-62,10,44,['#d4a62a','#aab2bb','#c0504a','#4a7ab0'][i%4],S({'stroke-width':2.4}));C(q,0,-52,3,'#241408')}},
 pan:(g,o)=>{C(g,0,-60,48,'#2a2a30',S());C(g,0,-60,36,'#c8ccd4');P(g,'M-14,-80 L10,-74 L-6,-52Z','#fff',{opacity:.7});R(g,44,-68,96,16,'#2a2a30',S({'stroke-width':2.4}))},
 mrslin:(g,o)=>{},
 heli:(g,o)=>{R(g,-70,-40,140,56,o.c||'#4a5a6a',S());P(g,'M70,-30 L190,-26 L190,-14 L70,-6Z','#3a4a5a',S({'stroke-width':2.4}));R(g,-52,-34,60,30,'#9fc3d8',S({'stroke-width':2}));L(g,-100,-62,100,-62,'#2a2a34',6);L(g,0,-62,0,-40,'#2a2a34',6);L(g,-60,24,60,24,'#2a2a34',5);P(g,'M-30,18 L-150,300 L110,300Z','url(#gCone)',{opacity:.4})},
 barricade:(g,o)=>{const w=o.w||260;for(let i=0;i<5;i++){const a=(i%2?1:-1)*14;L(g,-w/2+i*w/4,0,-w/2+i*w/4+a,-110,'#7a5a38',14)}L(g,-w/2,-60,w/2,-70,'#5a4028',12)}
};
Object.keys(IT).forEach(k=>{if(!PROP[k])PROP[k]=(g,o)=>IT[k](g,o)});
function item(g,it){const f=IT[it.t];if(!f)return;const q=G(g,{transform:`translate(${it.x||0} ${it.y==null?600:it.y}) scale(${(it.flip?-1:1)*(it.s||1)} ${it.s||1})`});f(q,it);return q}
const P_=W.pal||{};
function skyDraw(f,L){const sk=P_.sky||['#3d3a6e','#c2677a','#f1a477'];const id='gW_'+W.id;document.getElementById('defs').insertAdjacentHTML('beforeend',`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sk[0]}"/><stop offset=".55" stop-color="${sk[1]}"/><stop offset="1" stop-color="${sk[2]}"/></linearGradient>`);
 R(f,-200,-100,1680,900,`url(#${id})`);if(W.time==='night'||W.time==='dusk'||W.stars)fStars(f,40,230);if(W.moon!==false&&W.time!=='day')fMoon(f,L.moonx||930,L.moony||130);
 if(W.clouds!==false){fCloud(f,260,170,520,P_.cloud||'#ffc9a8',.36);fCloud(f,940,240,620,P_.cloud2||'#e79a9a',.3)}
 if(W.sun)C(f,L.sunx||920,L.suny||190,60,'#fff3c0',{opacity:.9})}
function lanePos(vpx,vpy,gy){return {x:(X,z)=>vpx+X/z,y:z=>vpy+(gy-vpy)/z}}
LOC['w_'+W.id]=(Z,p)=>{const LC=(W.locs||{})[p.v||Object.keys(W.locs)[0]]||{};const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const upd=[];const kind=LC.kind||'out';
 const layers=[G(f),G(m),G(n)];
 if(kind==='in'){R(f,-200,-100,1680,900,LC.wall||P_.wall||'#3a3530');for(let i=0;i<64;i++)R(f,i*24-60,-100,2,900,'rgba(0,0,0,.18)');R(f,-200,590,1680,300,LC.floor||P_.floor||'#2a2420');L(f,-200,590,1480,590,'rgba(0,0,0,.4)',4);
  if(LC.light!==false)P(f,'M520,-100 L760,-100 L980,640 L300,640Z','url(#gCone)',{opacity:.12});R(f,-200,-100,1680,900,'url(#gWallShade)',{opacity:.8});A(f,{style:'filter:blur(2.4px)'})}
 else if(kind==='lane'){const LP=lanePos(640,LC.vpy||398,720),vpy=LC.vpy||398;if(LC.indoor){R(f,-200,-100,1680,900,LC.wall||P_.wall||'#2a2f38');P(f,`M-200,-100 L1480,-100 L1480,40 L${640+120},${vpy-40} L${640-120},${vpy-40} L-200,40Z`,'#14171d');R(f,-200,vpy-60,1680,120,'url(#gWallShade)',{opacity:.5});A(f,{style:'filter:blur(2px)'})}else{skyDraw(f,LC);P(f,'M-200,404 Q100,340 380,396 T800,376 T1200,398 T1500,384 L1500,420 L-200,420Z',P_.hills||'#2a2744');R(f,-200,360,1680,70,'url(#gHaze)');A(f,{style:'filter:blur(3px)'})}
  R(m,-200,vpy-2,1680,500,LC.ground||P_.ground||'#33281a');R(m,-200,vpy-2,1680,500,'url(#gGroundShade)',{opacity:.7});
  if(LC.end)item(G(m,{style:'filter:blur(1.6px)'}),Object.assign({x:640,y:vpy+2,s:.3},LC.end));R(m,-200,vpy-6,1680,18,'url(#gHaze)',{opacity:.8});
  const rw=LC.road||360;P(m,`M${634},${vpy} L${646},${vpy} L${640+rw},780 L${640-rw},780Z`,LC.roadc||'#5a4630');
  const zs=[];for(let z=15;z>=1.15;z/=1.22)zs.push(z);
  for(const z of zs){for(const sd of(LC.sides||[])){const k=1/z,X=sd.x*(sd.side||1),x=LP.x(X,z),y=LP.y(z);if(x<-160||x>1440)continue;const itm=Object.assign({},sd.item,{x,y,s:(sd.item.s||1)*k*(sd.scale||1)});if(sd.jit)itm.y+=rr(z*9+sd.x)*sd.jit*k;item(m,itm)}}
  const nr=G(n,{style:'filter:blur(6px)'});for(const q of(LC.fg||[]))item(nr,q);upd.push((u,t)=>A(nr,{transform:`translate(${Math.sin(t*1.2)*5} 0)`}))}
 else{skyDraw(f,LC);P(f,'M-200,470 Q100,380 380,450 T800,420 T1200,450 T1500,420 L1500,640 L-200,640Z',P_.hills||'#2a2744');R(f,-200,400,1680,160,'url(#gHaze)');A(f,{style:'filter:blur(3.2px)'});
  R(m,-200,LC.gy||590,1680,300,LC.ground||P_.ground||'#2a2118');R(m,-200,(LC.gy||590)+10,1680,140,'url(#gGroundShade)')}
 for(const it of((LC.items||[]).concat(p.add||[]))){const z=it.z==null?1:it.z;const tgt=kind==='lane'?(z===2?n:m):(z===0?f:z===2?n:m);let q;if(z===0&&kind!=='lane'){q=item(G(f,{style:'filter:blur(2px)'}),it)}else if(z===2){q=item(G(n,{style:'filter:blur(5px)'}),it)}else q=item(tgt,it)}
 if(LC.fog)R(m,-200,300,1680,320,'url(#gHaze)',{opacity:LC.fog});
 if(LC.fireflies!==false&&kind!=='in'){const ff=fFirefly(G(m),LC.ff||8);upd.push((u,t)=>ff(t))}
 return (u,t,bt)=>upd.forEach(fn=>fn(u,t,bt))};

/* ---- the world's route line (standing rule: series + part progress on every non-card beat): FX['<id>_route'] {stop,of,label} ---- */
FX[W.id+'_route']=(g,f)=>{const q=G(g,{});const n=f.of||2,x0=96,x1=354,y=632;R(q,x0-62,y-30,x1-x0+124,86,'rgba(8,10,14,.72)',{rx:14});L(q,x0,y,x1,y,'#3a4450',4);
 const dots=[];for(let i=0;i<n;i++){const x=n>1?lerp(x0,x1,i/(n-1)):225,cur=i===f.stop-1;dots.push(C(q,x,y,cur?9:5,i<=f.stop-1?((W.accent)||'#7dffb0'):'#4a5560',{stroke:cur?'#fff':'none','stroke-width':2.5}))}
 T(q,225,y+34,(f.label||'').toUpperCase(),15,'#cfe8da',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 return (lt)=>{A(q,{opacity:clamp(lt/.3)});A(dots[f.stop-1],{r:9+1.6*Math.sin(lt*6)})}};
/* ---- the world's announcer device: a themed broadcast panel; p.mode open|close, p.part,p.of,p.title,p.next ---- */
const AN=W.ann||{};CARD[W.id+'_ann']=(Z,p)=>{const f=G(Z.far),m=G(Z.mid);R(f,-20,-20,490,840,AN.bg||'#0a0e12');for(let i=0;i<60;i++)R(f,rnd(i)*450,rnd(i+9)*820,2,2,'#fff',{opacity:.15+rnd(i+3)*.4});R(f,-20,-20,490,840,'url(#gWallShade)');
 const col=AN.c||'#7dffb0',scr=G(m);R(scr,30,120,390,300,'#06100a',{rx:18,stroke:AN.frame||'#3a4a40','stroke-width':8});R(scr,40,130,370,280,AN.screen||'#0a1a10',{rx:12});
 for(let y=140;y<400;y+=6)L(scr,44,y,406,y,'rgba(0,0,0,.25)',1.4);T(scr,225,168,AN.name||W.id.toUpperCase(),22,col,{'font-family':MONO,'font-weight':800,'letter-spacing':4});L(scr,60,184,390,184,col,2,{opacity:.6});
 if(p.mode==='end'){const e1=T(scr,225,236,'THE END',64,col,{'font-family':MONO,'font-weight':800,'letter-spacing':4});const e2=T(scr,225,296,(W.series||'').toUpperCase(),26,'#fff',{'font-family':MONO,'font-weight':800});fitText(e2,330);const e3=T(scr,225,350,`PART ${p.part} / ${p.of}`,20,col,{'font-family':MONO,'font-weight':800,'letter-spacing':3});R(m,70,470,310,52,'#a8332b',{rx:26});T(m,225,505,'FOLLOW FOR THE NEXT SERIES',20,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':2});return (u,t,bt)=>{[e1,e2,e3].forEach((e,i)=>A(e,{opacity:clamp((bt-.05-i*.15)/.12)}))}}
 const open=p.mode!=='close';const l1=T(scr,225,250,open?`PART ${p.part} / ${p.of}`:'NEXT',open?56:30,col,{'font-family':MONO,'font-weight':800,'letter-spacing':3});fitText(l1,320);
 const l2=T(scr,225,312,open?(p.title||''):(p.next||''),open?34:40,'#fff',{'font-family':MONO,'font-weight':800});fitText(l2,330);const l3=T(scr,225,372,open?(AN.sub||'TRANSMISSION'):`PART ${p.part+1} / ${p.of}`,18,col,{'font-family':MONO,'font-weight':800,'letter-spacing':3});
 const bars=[];for(let i=0;i<14;i++)bars.push(R(m,40+i*26,452,18,6,col,{rx:3}));T(m,225,100,AN.tag||'',15,'#9ab0a0',{'font-family':MONO,'font-weight':800,'letter-spacing':2});
 return (u,t,bt)=>{const mo=mouth('ann');bars.forEach((b,i)=>A(b,{height:6+34*Math.abs(Math.sin(t*9+i*.7))*mo,y:458-34*Math.abs(Math.sin(t*9+i*.7))*mo,opacity:.3+.7*mo}));[l1,l2,l3].forEach((e,i)=>A(e,{opacity:clamp((bt-.05-i*.12)/.1)}));A(scr,{transform:`translate(${Math.sin(t*40)*mo*1.2} 0)`})}};
})();
