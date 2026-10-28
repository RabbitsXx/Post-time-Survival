/* ===== scene library part 2: lamp, panels, props, cards, timers, characters, radar, map, waveform ===== */
function lens2(g,cx,cy,rx,ry){const q=G(g,{});E('ellipse',{cx,cy,rx,ry,fill:'#0b1830',stroke:'#7a6a3a','stroke-width':12},q);const rs=[];for(let i=0;i<9;i++)rs.push(E('ellipse',{cx,cy,rx:rx*(.92-i*.095),ry:ry*(.92-i*.095),fill:'none',stroke:'#c9b36a','stroke-width':4,opacity:.55},q));
 for(let i=-5;i<=5;i++)L(q,cx+i*rx*.17,cy-ry*.96,cx+i*rx*.15,cy+ry*.96,'#c9b36a',2,{opacity:.3});const bulb=C(q,cx,cy,rx*.24,'#3a3a40');return {q,rs,bulb}}
function darkBg(f){R(f,-300,-300,1320,1880,'#070d1a');C(f,360,420,560,'url(#gGlow)',{opacity:.14});R(f,-300,1000,1320,600,'#10121a');for(let i=0;i<8;i++)R(f,-300,1030+i*58,1320,3,'#06080d',{opacity:.9});R(f,-300,1000,1320,5,'#2a2f3c',{opacity:.8})}
const MKB=(f,c1,c2)=>R(f,-300,-300,1320,1880,'url(#gWarmRoom)');

LIB.lampClose=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});darkBg(f);
 const st=p.state||'on',rx=st==='backup'?190:230,ry=st==='backup'?280:330;
 const glow=C(f,360,500,420,'url(#gGlow)',{opacity:0});const rays=G(f,{transform:'translate(360 500)'});for(let a=0;a<2;a++)P(rays,'M0,0 L1100,-80 L1100,80Z','url(#gBeam)',{transform:`rotate(${a*180})`,opacity:0});
 const ln=lens2(m,360,500,rx,ry);const hot=E('ellipse',{cx:360,cy:500,rx,ry,fill:'#fff6c8',opacity:0},m);
 R(m,-300,940,1320,500,'#0a1020');R(m,120,890,480,60,'#7a6a3a');
 let wr=null;if(st==='manual'){wr=G(m,{transform:'translate(540 900)'});C(wr,0,0,70,'none',{stroke:'#aaa','stroke-width':12});for(let i=0;i<6;i++)L(wr,0,0,Math.cos(i*Math.PI/3)*70,Math.sin(i*Math.PI/3)*70,'#aaa',8);
  if(p.wrench){const w=G(m,{transform:'translate(220 880) rotate(-35)'});R(w,-90,-12,180,24,'#9aa0aa',{rx:10});C(w,-90,0,30,'none',{stroke:'#9aa0aa','stroke-width':16})}}
 let bat=null;if(st==='backup'){bat=G(m);R(bat,60,860,160,120,'#1c2a20',{rx:10,stroke:'#3fa35f','stroke-width':4});C(bat,100,900,10,'#3dff7a');T(bat,150,962,'BACKUP',22,'#9fe6b0',{'font-weight':800})}
 const rain=st==='backup'?rainFx(n,70):null;
 return (u,t,bt)=>{let on=st==='on'||st==='manual'?1:0;if(st==='dying')on=clamp(1-bt/1.6)*(.8+.2*Math.sin(t*9));if(st==='backup')on=.8*(.75+.25*Math.sin(t*7))*clamp(bt/.5+.2);if(p.dim)on*=.5;
  A(hot,{opacity:on*.55});A(glow,{opacity:on});A(rays.children[0],{opacity:on});A(rays.children[1],{opacity:on});A(rays,{transform:`translate(360 500) rotate(${t*(st==='manual'?40:170)})`});
  lens2&&ln.rs.forEach(r=>A(r,{stroke:on>.3?'#fff0a8':'#c9b36a',opacity:.4+on*.5}));A(ln.bulb,{fill:on>.3?'#fffbe0':'#3a3a40'});
  if(wr)A(wr,{transform:`translate(540 900) rotate(${t*120})`});if(rain)updRain(rain,t,1.4)}};

LIB.panel=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});darkBg(f);const k=p.kind;
 const box=G(m);R(box,70,170,580,640,'#0f1520',{rx:22,stroke:'#46557d','stroke-width':8});
 let upd=()=>{};
 if(k==='override'){T(box,360,250,'LAMP OVERRIDE',44,'#9fb4e0',{'letter-spacing':4});C(box,360,470,110,'#1a2236',{stroke:'#7a6a3a','stroke-width':10});R(box,350,420,20,100,'#000',{rx:6});C(box,360,430,22,'#000');
  const led=C(box,140,260,12,'#ff3030');const pl=pill(Z.hud,'LOCKED',360,880,'#b3151c');upd=(u,t,bt)=>{A(led,{opacity:Math.sin(t*10)>0?1:.25});pl(clamp((bt-.1)/.3))}}
 if(k==='breaker'){T(box,360,250,'MAIN BREAKER',44,'#9fb4e0',{'letter-spacing':4});const sw=[];for(let r=0;r<2;r++)for(let i=0;i<6;i++){const x=150+i*84,y=360+r*150;R(box,x-22,y-50,44,100,'#1a2236',{rx:8});sw.push(R(box,x-16,y-44,32,44,'#c9ccd4',{rx:6}))}
  const lever=G(box,{transform:'translate(360 660)'});R(lever,-60,-30,120,60,'#1a2236',{rx:12});const lv=R(lever,-24,-100,48,110,'#d33',{rx:10});
  const wl=p.flood?R(box,70,810,580,0,'#2f9ad8',{opacity:.6}):null;
  upd=(u,t,bt)=>{const fl=p.flip?clamp((bt-.45)/.25):0;A(lv,{transform:`translate(0 ${fl*100}) `,fill:fl>.5?'#3a3a40':'#d33'});if(wl){const h=lerp(60,260,clamp(bt/1.4));A(wl,{y:810-h,height:h})}
   const fm=p.flood===2?1:0;if(p.flood){const flick=Math.sin(t*20)>.6?1:.2;A(box,{opacity:.85+.15*flick})}}}
 if(k==='battery'){T(box,360,250,'BACKUP BATTERY',44,'#9fb4e0',{'letter-spacing':3});const cells=[];for(let i=0;i<4;i++){R(box,110+i*128,340,100,280,'#1c2a20',{rx:10,stroke:'#3fa35f','stroke-width':4});cells.push(R(box,120+i*128,350,80,0,'#3dff7a',{rx:6,opacity:.9}))}
  const led=C(box,360,700,16,'#ff3030');upd=(u,t,bt)=>{const on=p.on?1:clamp((bt-.4)/.2);cells.forEach((c,i)=>{const h=on*(150+40*i);A(c,{y:610-h,height:h})});A(led,{fill:on>.5?'#3dff7a':'#ff3030',opacity:on>.5?1:(Math.sin(t*12)>0?1:.3)})}}
 R(n,-60,1000,200,400,'#02030a');
 return (u,t,bt)=>upd(u,t,bt)};

/* ---- props ---- */
function benchBg(f){R(f,-300,-300,1320,1880,'url(#gWarmRoom)');C(f,360,520,400,'url(#gGlow)',{opacity:.35});R(f,-300,880,1320,600,'#2a1a10');for(let i=0;i<6;i++)L(f,-300,900+i*70,1020,900+i*70,'#1a0e08',3,{'stroke-linecap':'butt'})}
LIB.prop=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});benchBg(f);const k=p.kind;let upd=()=>{};
 if(k==='key'){R(m,140,260,440,520,'#4a3420',{rx:16,stroke:'#2a1a0c','stroke-width':8});for(let i=0;i<4;i++){C(m,230+i*90,360,10,'#222');if(i<3){P(m,'M0,0 l0,60 l-14,0 l0,-20 l-14,0 l0,-14 l14,0Z','#c9a64a',{transform:`translate(${230+i*90} 370)`})}}
  P(m,'M0,0 l0,60 l-14,0 l0,-20 l-14,0 l0,-14 l14,0Z','none',{stroke:'#ff5a4a','stroke-width':4,'stroke-dasharray':'8 6',transform:'translate(500 370)'});T(m,360,560,'LAMP KEY',40,'#e9d9a8',{'letter-spacing':4});T(m,500,470,'?',90,'#ff5a4a')}
 if(k==='radio'){R(m,110,330,500,360,'#3a3f44',{rx:26,stroke:'#1a1d20','stroke-width':8});R(m,150,370,300,160,'#0e1417',{rx:10});C(m,520,430,44,'#222');C(m,520,560,34,'#222');const bars=[];for(let i=0;i<22;i++)bars.push(R(m,160+i*13,520,8,0,'#3dff7a',{rx:2}));
  const an=L(m,560,330,640,130,'#aaa',6);const tx=T(m,300,420,p.dead?'NO SIGNAL':(p.coords?'41.88 N  70.11 W':'ON AIR'),34,p.dead?'#555':'#3dff7a',{'font-family':'DejaVu Sans Mono, monospace'});
  upd=(u,t,bt)=>{bars.forEach((b,i)=>{const h=p.dead?0:(p.wave?8+60*Math.abs(Math.sin(t*5+i*.7)*Math.sin(t*1.9+i)):0);A(b,{y:520-h,height:h})})}}
 if(k==='drums'){const d=[];for(let i=0;i<3;i++){const g=G(m);R(g,-60,-120,120,240,['#c9892a','#2f7a4a','#8a3a2a'][i],{rx:18,stroke:'#1a1a1a','stroke-width':6});for(const y of[-60,60])R(g,-60,y-6,120,12,'#00000055');T(g,0,10,'DIESEL',26,'#fff',{'font-weight':800});d.push(g)}
  upd=(u,t,bt)=>d.forEach((g,i)=>{const r=p.roll?u*220:0;A(g,{transform:`translate(${200+i*160+(p.roll?-r:0)} ${600+i*40}) rotate(${p.roll?-r*.9:0})`})})}
 if(k==='trench'){P(m,'M-100,520 L820,520 L820,1000 L-100,1000Z','url(#gSand)');P(m,'M200,520 L520,520 L460,760 L260,760Z','#6a5030');const fuel=P(m,'M232,640 L488,640 L460,760 L260,760Z','#d9a02a',{opacity:.9});R(m,150,470,60,50,'#9a8050');R(m,520,470,60,50,'#9a8050');T(m,360,430,'KNEE DEEP',36,'#fff',{'font-weight':800,stroke:'#000','stroke-width':6,'paint-order':'stroke fill'});upd=(u,t,bt)=>A(fuel,{opacity:.6+.3*Math.sin(t*4)})}
 if(k==='chain'){const ch=[];for(let i=0;i<10;i++)ch.push(E('ellipse',{cx:60+i*66,cy:560+(i%2?0:0),rx:40,ry:20,fill:'none',stroke:'#7a7a80','stroke-width':14,transform:`rotate(${i%2?90:0} ${60+i*66} 560)`},m));
  const lk=G(m,{transform:'translate(360 700)'});R(lk,-60,-10,120,100,'#c9a64a',{rx:12});const sh=P(lk,'M-34,-10 v-40 a34,34 0 0 1 68,0 v40','none',{stroke:'#c9a64a','stroke-width':16});upd=(u,t,bt)=>{A(lk,{opacity:p.lock?clamp((bt-.4)/.2):0});A(sh,{transform:`translate(0 ${p.lock?-30*(1-clamp((bt-.5)/.2)):0})`})}}
 if(k==='rope'){for(let i=0;i<7;i++)E('ellipse',{cx:360,cy:540+i*3,rx:200-i*14,ry:90-i*6,fill:'none',stroke:'#c9b080','stroke-width':18},m);L(m,520,500,700,330,'#c9b080',14);T(m,360,800,'ROPE + FLARE',38,'#e9d9a8',{'letter-spacing':3})}
 if(k==='engine'){R(m,260,260,200,280,p.dead?'#3a3a40':'#ffca28',{rx:26,stroke:'#111','stroke-width':8});R(m,330,540,60,260,'#222');P(m,'M320,780 L400,780 L430,880 L290,880Z','#333');const sm=smokeCols(m,350,370,260,1,'#444',.6);
  T(m,360,420,'OUTBOARD',28,'#ddd',{'font-weight':800});C(m,360,350,22,'#111');upd=(u,t)=>updSmoke(sm,t,160)}
 if(k==='hand'){const hand=G(m,{transform:'translate(360 470)'});limb(hand,[[0,260],[0,100]],120,'#efcfae','#2a1c13');for(let i=0;i<4;i++)limb(hand,[[-46+i*30,100],[-52+i*32,-60]],26,'#efcfae','#2a1c13');limb(hand,[[-96,140],[-150,10]],26,'#efcfae','#2a1c13');
  const w=p.wound||0;const cut=G(hand);if(w){P(cut,'M-22,112 l16,22 l-14,10 l22,26 l-8,12 l20,18',"none",{stroke:w===3?'#fff':'#c02a2a','stroke-width':w===3?44:9,'stroke-linecap':'round','stroke-linejoin':'round'});if(w===2){C(cut,0,150,70,'#7a2a4a',{opacity:.55,filter:'url(#b6)'});P(cut,'M-22,112 l16,22 l-14,10 l22,26 l-8,12 l20,18','none',{stroke:'#2a1020','stroke-width':26,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.75});for(let i=0;i<3;i++)P(cut,`M${-34+i*30},${126+i*8} l14,50`,'none',{stroke:'#4a1a3a','stroke-width':4,opacity:.6})}
   if(w===3){for(let i=-2;i<=2;i++)L(cut,-30,150+i*10,30,150+i*10,'#cfd6dc',3)}}upd=(u,t)=>A(hand,{transform:`translate(360 ${470+Math.sin(t*2)*4}) rotate(${p.wound?0:Math.sin(t*14)*2})`})}
 if(k==='arm'){const arm=G(m,{transform:'translate(360 600)'});limb(arm,[[-260,0],[260,0]],100,'#efcfae','#2a1c13');if(p.scan){const sc=R(m,160,380,400,6,'#3dffb0',{opacity:.8,filter:'url(#b3)'});upd=(u,t)=>A(sc,{y:380+((t*160)%440)})}}
 if(k==='pill'){R(m,260,420,200,360,'#d9a02a',{rx:26});R(m,260,420,200,70,'#fff',{rx:20});T(m,360,640,'RX',70,'#4a2a00');const pl=E('ellipse',{cx:360,cy:850,rx:44,ry:22,fill:'#fff',stroke:'#aaa','stroke-width':4},m);upd=(u,t)=>A(pl,{cy:850-Math.abs(Math.sin(t*3))*10})}
 if(k==='cup'){R(m,250,420,220,260,'#9aa0aa',{rx:26,stroke:'#555','stroke-width':8});R(m,262,450,196,60,'#4aa0d0',{opacity:.9});E('path',{d:'M470,480 q80,0 80,60 q0,60 -80,60',fill:'none',stroke:'#9aa0aa','stroke-width':22},m)}
 if(k==='generator'){const gg=G(m,{transform:'translate(0 -110)'});R(gg,100,380,520,340,p.dead?'#3a3a40':'#c2362e',{rx:30,stroke:'#111','stroke-width':8});R(gg,140,430,200,150,'#14171b',{rx:14});C(gg,500,520,56,'#222');C(gg,420,640,12,p.dead?'#222':'#3dff7a');T(gg,360,415,'GENERATOR',40,'#fff',{'letter-spacing':5});P(gg,'M300,470 l-30,60 l30,0 l-14,50 l54,-72 l-32,0 l22,-38Z','#ffca28',{opacity:p.dead?.25:1});const wl=R(m,0,640,720,0,'#2f9ad8',{opacity:.75});upd=(u,t,bt)=>{const h=lerp(0,430,clamp(bt/2.4));A(wl,{y:870-h,height:h+500})}}
 return (u,t,bt)=>upd(u,t,bt)};

/* ---- cards ---- */
function meter2(g,x,y,icon,label,from,to,unit,warn){const q=G(g,{opacity:0});R(q,x-270,y,540,220,'#f7f3e6',{rx:22,stroke:warn?'#e83e36':'#cfc7a8','stroke-width':warn?6:3});C(q,x-200,y+110,48,'#1d1d22');
 if(icon==='fuel'){R(q,x-224,y+88,48,44,'#ffca28',{rx:5});R(q,x-218,y+78,16,12,'#ffca28')}if(icon==='med'){R(q,x-224,y+84,48,52,'#fff',{rx:6});R(q,x-206,y+92,12,36,'#e83e36');R(q,x-218,y+104,36,12,'#e83e36')}
 T(q,x-130,y+60,label,26,'#6b5f45',{'text-anchor':'start','letter-spacing':2});const num=T(q,x-130,y+150,String(from),88,warn?'#c2181a':'#1f1a10',{'text-anchor':'start'});const un=T(q,x+10,y+150,unit,32,'#6b5f45',{'text-anchor':'start'});
 return u=>{const k=eb(u*2.5);A(q,{opacity:clamp(u*6),transform:`translate(0 ${(1-k)*60})`});const v=Math.round(lerp(from,to,eo(clamp((u-.25)/.5))));num.textContent=String(v);A(un,{x:x-130+num.getComputedTextLength()+12})}}
LIB.card=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const k=p.kind;let upd=()=>{};
 const wood=()=>{R(f,-300,-300,1320,1880,'url(#gWood)');for(let i=0;i<10;i++)R(f,-300,i*150-30,1320,6,'#2e1a0c',{opacity:.55});const pe=G(m,{transform:'rotate(-10 200 1090)'});R(pe,70,1080,300,18,'#e3b94a',{rx:9});P(pe,'M70,1080 l-40,9 l40,9Z','#e8c9a0');P(pe,'M42,1086 l-12,3 l12,3Z','#222');R(pe,330,1080,40,18,'#d94a4a',{rx:6});R(m,520,1030,120,130,'#8a9099',{rx:16,stroke:'#4a4f58','stroke-width':6});E('path',{d:'M640,1070 q56,0 56,40 q0,40 -56,40',fill:'none',stroke:'#8a9099','stroke-width':16},m);R(m,532,1040,96,26,'#3a2a1a',{rx:10,opacity:.9})};
 if(k==='fuel'){wood();const mc=meter2(Z.hud,360,90,'fuel','DIESEL FUEL',p.from||p.val,p.val,'GAL',p.warn);upd=(u,t,bt)=>mc(clamp(bt/1.4))}
 if(k==='meds'){wood();const mc=meter2(Z.hud,360,90,'med','ANTIBIOTICS',p.from||p.val,p.val,'DOSES',p.warn);upd=(u,t,bt)=>mc(clamp(bt/1.2))}
 if(k==='supplies'){wood();const v=p.vals||[180,500,800,12];const ck=checklist(Z.hud,360,70,[v[0],v[1],v[2]],u=>[1,1,1,0]);const hl=p.hl!=null?R(Z.hud,60,70+108+p.hl*136-6,600,128,'none',{rx:16,stroke:p.warn?'#e83e36':'#ffca28','stroke-width':8}):null;upd=(u,t,bt)=>{ck(1,t);if(hl)A(hl,{opacity:.5+.5*Math.sin(t*8)})}}
 if(k==='tideChart'){wood();const np=notepad(Z.hud,360,110,'TIDE CHART — TODAY',false);const gp=G(Z.hud);const ox=130,oy=520;P(gp,`M${ox},${oy-170} q70,-100 140,0 t140,170 t140,0`,'none',{stroke:'#2a3a5a','stroke-width':7,'stroke-linecap':'round'});L(gp,ox,oy,ox+420,oy,'#2a3a5a',3);const dot=C(gp,ox+280,oy,12,'#e83e36');
  const lb=T(gp,ox+280,oy+58,'LOW 5:47',34,'#223',{'font-weight':800});const hlc=C(gp,ox+280,oy,34,'none',{stroke:'#e83e36','stroke-width':5,opacity:0});upd=(u,t,bt)=>{np(clamp(bt/.9));A(gp,{opacity:clamp((bt-.5)/.3)});A(hlc,{opacity:p.hl?(.5+.5*Math.sin(t*9)):0})}}
 if(k==='rule1'||k==='rule3'){darkBg(f);const wall=G(m,{transform:'translate(0 -230)'});if(k==='rule1'){R(wall,60,640,600,300,'#2f9ad8',{rx:12,opacity:.9});for(let i=0;i<5;i++)L(wall,60,690+i*50,660,690+i*50,'#fff',2,{opacity:.4});P(wall,'M330,640 L360,740 L320,820 L370,940','none',{stroke:'#fff','stroke-width':8,'stroke-linejoin':'round'})}
  else{P(wall,'M120,940 L600,940 L540,700 L180,700Z','url(#gWoodDock)');R(wall,330,560,60,140,'#2a1a0c');T(wall,360,820,'DOCK',60,'#f2ead6',{'font-weight':900})}
  const rc=ruleCard(Z.hud,360,90,k==='rule1'?1:3,k==='rule1'?'WATER IS THE WALL':'CHECK FIRST');const stamp=k==='rule1'?G(Z.hud,{opacity:0}):null;if(stamp){R(stamp,-210,-60,420,120,'none',{stroke:'#e83e36','stroke-width':10,rx:14});T(stamp,0,28,'BROKEN',84,'#e83e36',{'letter-spacing':6})}
  upd=(u,t,bt)=>{rc(clamp(bt/.35));if(stamp){const s=clamp((bt-.5)/.2);A(stamp,{opacity:s,transform:`translate(360 350) rotate(-10) scale(${lerp(3,1,eo(s))})`})}}}
 if(k==='checklistBites'){wood();const q=G(Z.hud);R(q,60,110,600,620,'#f2e8c8',{rx:24,stroke:'#bfae80','stroke-width':3});T(q,360,190,'CHECK FOR BITES',44,'#2a2418',{'letter-spacing':3});const rows=['ARMS','LEGS','NECK','HANDS'],ticks=[];rows.forEach((r,i)=>{const y=260+i*110;T(q,120,y+28,r,48,'#1f1a10',{'text-anchor':'start'});const g=G(q,{opacity:0});C(g,580,y+14,34,i===3?'#e83e36':PAL.green);if(i<3)P(g,`M562,${y+14} L575,${y+28} L600,${y-4}`,'none',{stroke:'#fff','stroke-width':9,'stroke-linecap':'round'});else T(g,580,y+30,'!',60,'#fff');ticks.push(g)});
  upd=(u,t,bt)=>ticks.forEach((g,i)=>A(g,{opacity:i<3?clamp((bt-.15-i*.35)/.2):(p.state?clamp((bt-1.2)/.2):0)}))}
 if(k==='count'){R(f,-300,-300,1320,1880,'url(#gDark)');const zs=[];for(let i=0;i<18;i++){const z=zombie(m,40+i*40,860+(i%3)*50,.8,i);updZombie(z,0,1,0)}const q=G(Z.hud,{opacity:0});R(q,120,100,480,240,'#0b1020',{rx:28,stroke:'#e83e36','stroke-width':6});T(q,360,170,'ZOMBIES ON THE BEACH',28,'#9fb4e0',{'letter-spacing':2,'font-weight':800});const num=T(q,360,300,'0',150,'#fff',{'font-family':'DejaVu Sans Mono, monospace'});
  upd=(u,t,bt)=>{A(q,{opacity:clamp(bt*5)});num.textContent=String(Math.round((p.n||0)*eo(clamp(bt/1.0))))}}
 return (u,t,bt)=>upd(u,t,bt)};

LIB.timer=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});darkBg(f);
 const pn=G(m);R(pn,60,300,600,380,'#0b0f18',{rx:26,stroke:'#46557d','stroke-width':8});
 let upd=()=>{};
 if(p.temp){const k=p.temp;T(pn,360,376,'BODY TEMP',34,'#9fb4e0',{'letter-spacing':4,'font-weight':800});R(pn,160,430,60,200,'#1a2236',{rx:30});const merc=R(pn,168,440,44,180,'#e83e36',{rx:22});const val=T(pn,430,560,'104.6°F',76,k===3?'#3dff7a':'#ff5a4a',{'font-family':'DejaVu Sans Mono, monospace'});
  upd=(u,t,bt)=>{const v=k===1?103.1:(k===2?104.6:lerp(104.6,98.6,clamp(bt/1.4)));val.textContent=v.toFixed(1)+'°F';const h=clamp((v-96)/10)*170;A(merc,{y:620-h,height:h});A(merc,{fill:v<100?'#3dff7a':'#e83e36'})}}
 else{const lab=p.hours===24?'QUARANTINE':(p.hours?'LOW TIDE IN':(p.mins?'ARRIVAL IN':'DECISION'));T(pn,360,376,lab,34,'#9fb4e0',{'letter-spacing':5,'font-weight':800});const d=T(pn,360,560,'',p.hours?120:130,'#ff5a4a',{'font-family':'DejaVu Sans Mono, monospace'});
  upd=(u,t,bt)=>{let s;if(p.hours===24){s='24:00:00'}else if(p.hours){const r=Math.max(0,p.hours*3600-bt*420);s=String(Math.floor(r/3600)).padStart(2,'0')+':'+String(Math.floor(r%3600/60)).padStart(2,'0')+':'+String(Math.floor(r%60)).padStart(2,'0')}else if(p.mins){const r=Math.max(0,40*60-bt*180);s=String(Math.floor(r/60)).padStart(2,'0')+':'+String(Math.floor(r%60)).padStart(2,'0')}else{const r=Math.max(0,(p.secs||10)-bt*1.8);s='00:'+String(Math.floor(r)).padStart(2,'0')}d.textContent=s}}
 const tc=timerChip(Z.hud,360,90,(u,t)=>p.hours?(p.hours+' HOURS'):(p.mins?'40 MIN':(p.temp?'FEVER':(p.secs?(p.secs+' SEC'):'')))||'TIMER');
 return (u,t,bt)=>{upd(u,t,bt);tc(clamp(bt/.3),t)}};

/* ---- characters ---- */
const CBG={
 door:f=>{R(f,-300,-300,1320,1880,'#171421');R(f,120,180,480,860,'url(#gWarmRoom)');C(f,360,620,380,'url(#gGlow)',{opacity:.5});for(let i=0;i<4;i++){R(f,150,300+i*180,420,16,'#3a2a1c');for(let c=0;c<6;c++)R(f,164+c*68,300+i*180-60,46,60,['#c0562a','#d9a02a','#4a7a5a','#8a6a4a'][(c+i)%4],{rx:6})}R(f,-100,160,260,900,'#0a0812');R(f,560,160,260,900,'#0a0812');R(f,-200,1020,1120,400,'#0c0912')},
 night:f=>{const s=skyFor(f,'night');R(f,-300,700,1320,800,'url(#gSeaNight)');R(f,-300,980,1320,500,'#10192e');return s},
 beach:f=>{const s=skyFor(f,'dawn');R(f,-300,640,1320,900,'url(#gSeaDawn)');R(f,-300,860,1320,700,'url(#gSand)');return s},
 dock:f=>{const s=skyFor(f,'day');R(f,-300,560,1320,900,'url(#gSeaDay)');P(f,'M-100,1280 L820,1280 L820,900 L-100,900Z','url(#gWoodDock)');for(let i=0;i<6;i++)L(f,-100,920+i*60,820,920+i*60,'#1a1008',3);return s},
 boat:f=>{const s=skyFor(f,'day');R(f,-300,560,1320,900,'url(#gSeaDay)');P(f,'M-100,1000 L820,1000 L720,1280 L0,1280Z','#6a4a2a');R(f,-100,980,920,30,'#8a6a44');return s},
 storm:f=>{const s=skyFor(f,'storm');R(f,-300,640,1320,900,'url(#gSeaStorm)');R(f,-300,990,1320,500,'#10181a');return s},
 tower:f=>{R(f,-300,-300,1320,1880,'#0a1020');for(let i=0;i<9;i++)R(f,i*100-60,-300,12,1900,'#12203d');C(f,520,420,420,'url(#gGlow)',{opacity:.5});R(f,-300,1000,1320,400,'#0a1020')},
 radio:f=>{R(f,-300,-300,1320,1880,'url(#gWarmRoom)');C(f,520,520,340,'url(#gGlow)',{opacity:.4});R(f,-300,980,1320,500,'#1a0e08')}};
LIB.heroFull=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const bg=CBG[p.bg||'night'](f)||{upd(){}};
 const who=p.who||'marlow',view=p.view||'side',pose=p.pose||'stand';
 const P0=pose==='row'||pose==='dig'||pose==='walk'||pose==='reach'||pose==='hold'?pose:(pose==='sit'?'stand':pose);
 const floorY=p.bg==='dock'?1000:(p.bg==='boat'?1060:(p.bg==='beach'?1000:1040));
 let extra=null;
 if(pose==='dig'){extra=G(m);L(extra,360,floorY-140,200,floorY-20,'#7a5a3a',12);R(extra,150,floorY-30,80,50,'#aaa',{rx:6});P(extra,'M-100,1000 Q120,930 340,1000 L340,1100 L-100,1100Z','#c9ac6a')}
 const hr=keeper(m,{who,x:360,y:floorY,s:p.bg==='boat'?1.9:2.0,view,pose:P0,mood:p.mood||'night',pack:who==='marlow'&&view!=='front'?0:0,flip:!!p.flip,expr:p.expr});
 let fl=null;if(p.flare){fl=C(m,560,floorY-300,26,'#ff3a2a');C(m,560,floorY-300,110,'url(#gRed)',{opacity:.8})}
 let barrel=null;if(p.carry){barrel=G(m,{transform:`translate(520 ${floorY-120})`});R(barrel,-50,-90,100,180,'#c9892a',{rx:14,stroke:'#1a1a1a','stroke-width':5})}
 if(p.bg==='storm'||p.bg==='night'){}
 const rain=p.bg==='storm'?rainFx(n,90):null;
 R(n,-60,1090,200,400,'#02030a',{opacity:.9});
 return (u,t,bt)=>{bg.upd&&bg.upd(t);kmove(hr,t,2,pose==='row'?4:1.5);if(fl)A(fl,{r:22+Math.sin(t*24)*5});if(rain)updRain(rain,t,1.5)}};
LIB.heroFace=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const mood=p.mood||'night';
 R(f,-300,-300,1320,1880,mood==='red'?'#2a0608':(mood==='warm'?'url(#gWarmRoom)':'#07101e'));
 C(f,360,640,460,mood==='red'?'url(#gRed)':'url(#gGlow)',{opacity:mood==='red'?.6:.35});
 const HY=560;const hf=keeperClose(m,{who:p.who,x:360,y:HY,s:3.0,view:'front',expr:p.expr||'worried',mood:mood==='warm'?'warm':(mood==='red'?'red':'night')});
 let sw=[];if(p.sweat){for(let i=0;i<4;i++)sw.push(P(m,'M0,0 q10,16 0,26 q-10,-10 0,-26Z','#bfe8ff',{opacity:.8}))}
 R(n,-40,1100,260,400,'#02030a',{opacity:.9});
 return (u,t,bt)=>{A(hf.root,{transform:`translate(360 ${HY+Math.sin(t*1.6)*4}) scale(3 3)`});sw.forEach((s,i)=>A(s,{transform:`translate(${300+i*40} ${640+((t*70+i*50)%120)})`,opacity:.8-((t*70+i*50)%120)/150}))}};

/* ---- radar / map / waveform / diagram ---- */
LIB.radar=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});const cx=360,cy=440,Rr=330;
 R(m,-300,-300,1320,1880,'url(#gRadar)');for(let i=-6;i<20;i++)L(m,i*60,-300,i*60,1580,'#1ec8ff',1.5,{opacity:.07,'stroke-linecap':'butt'});for(let i=-6;i<30;i++)L(m,-300,i*60,1020,i*60,'#1ec8ff',1.5,{opacity:.07,'stroke-linecap':'butt'});
 for(const k of[1,2,3,4,5])C(m,cx,cy,Rr*k/3.2,'none',{stroke:'#3dd6ff','stroke-opacity':.3,'stroke-width':2,'stroke-dasharray':'6 10'});
 // shore
 const sy=p.far?200:170;const shore=G(m);P(shore,`M-300,-300 L1020,-300 L1020,${sy} Q650,${sy+40} 590,${sy+14} Q520,${sy+52} 470,${sy+20} Q410,${sy+62} 360,${sy+26} Q300,${sy+54} 240,${sy+18} Q170,${sy+50} 110,${sy+16} Q50,${sy+44} -300,${sy+8}Z`,'#2c1015');
 const dots=[];for(let i=0;i<(p.dots?60:90);i++)dots.push([C(shore,0,0,2.6+rnd(i)*2.4,'#ff3a3a'),rnd(i+1)*900-90,sy-190+rnd(i+2)*180]);
 if(p.causeway){P(m,`M120,${sy+20} L${cx-50},${cy-70} L${cx-10},${cy-60} L170,${sy+30}Z`,'#ead9a6',{opacity:.9});T(m,200,sy+120,'CAUSEWAY',26,'#ead9a6',{'font-weight':800,'letter-spacing':3})}
 const sweep=G(m);for(let k=0;k<14;k++){const a0=-k*3.2*Math.PI/180,a1=a0-3.4*Math.PI/180;P(sweep,`M0,0 L${700*Math.cos(a0)},${700*Math.sin(a0)} L${700*Math.cos(a1)},${700*Math.sin(a1)}Z`,'#3dffb0',{opacity:.3*(1-k/14)})}L(sweep,0,0,700,0,'#7dffcc',3);
 // island
 C(m,cx,cy,88,'#1ec8ff',{opacity:.2,filter:'url(#b10)'});P(m,`M${cx-64},${cy-8} Q${cx-54},${cy-62} ${cx-4},${cy-64} Q${cx+54},${cy-72} ${cx+66},${cy-18} Q${cx+80},${cy+36} ${cx+26},${cy+58} Q${cx-28},${cy+74} ${cx-60},${cy+36}Z`,'#2f6b3f',{stroke:'#8ee6b0','stroke-width':4});C(m,cx,cy,9,'#fff');
 let bm=null;if(p.beam){bm=G(m,{});P(bm,'M0,0 L760,-150 L760,150Z','#fff2a8',{opacity:.32})}
 if(p.range){const r=Rr*.95;C(m,cx,cy,r,'none',{stroke:'#ffca28','stroke-width':4,'stroke-dasharray':'14 10'});T(m,cx+196,cy-r*.75,p.range+' MI',44,'#ffca28',{'font-weight':900,'letter-spacing':3,stroke:'#000','stroke-width':7,'paint-order':'stroke fill'})}
 let sm=null;if(p.smoke){sm=C(m,cx-50,cy-30,20,'#e83e36',{opacity:.8})}
 let blind=null;if(p.blind){blind=G(m);R(blind,-300,-300,1320,1880,'#03070c',{opacity:.9});for(let i=0;i<120;i++)R(blind,rnd(i)*720,rnd(i+3)*1280,40+rnd(i)*120,4,'#6a7a8a',{opacity:.3});T(blind,360,620,'NO SIGNAL',84,'#ff5a4a',{'font-weight':900,'letter-spacing':6})}
 let storm=null;if(p.storm){storm=G(m,{transform:`translate(${cx} ${cy-60})`});for(let a=0;a<4;a++)E('path',{d:'M0,0 Q120,-60 220,0 T300,160',fill:'none',stroke:'#8fe0c0','stroke-width':26,opacity:.45,transform:`rotate(${a*90})`},storm)}
 const boats=[];if(p.boats){for(let i=0;i<p.boats;i++){const g=G(m);C(g,0,0,9,'#ffca28');C(g,0,0,26,'none',{stroke:'#ffca28','stroke-width':2,opacity:.6});boats.push([g,i])}}
 const pl=p.range?pill(Z.hud,'LIGHT RANGE: '+p.range+' MI',360,1010,'#7a5a00'):null;
 const tl=T(Z.hud,360,1090,'',24,'#7de6ff',{'font-family':'DejaVu Sans Mono, monospace'});
 return (u,t,bt)=>{A(sweep,{transform:`translate(${cx} ${cy}) rotate(${(t*150)%360})`});dots.forEach(([c,x,y],i)=>{const lead=p.lead?-u*(p.far?280:120):0;A(c,{cx:x+Math.sin(t*3+i)*3+lead,cy:y+Math.cos(t*2.4+i*2)*3+(p.lead?u*90:0),opacity:.5+.5*Math.sin(t*5+i*1.3)})});
  if(bm)A(bm,{transform:`translate(${cx} ${cy}) rotate(${p.lead?lerp(-100,-10,u):-90+bt*60})`});if(sm)A(sm,{r:14+Math.abs(Math.sin(t*5))*12});
  if(storm)A(storm,{transform:`translate(${cx} ${cy-60}) rotate(${t*40})`});boats.forEach(([g,i])=>A(g,{transform:`translate(${100+i*50+Math.sin(t*.8+i)*30} ${760+(i%4)*60+Math.cos(t+i)*10})`}));
  if(pl)pl(clamp((bt-.15)/.3));tl.textContent=p.empty?'CONTACTS: 0':(p.storm?'WIND 70 MPH  PRESSURE FALLING':(p.blind?'':'SCAN 100%  SECTOR 7'))}};
LIB.map=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near,{filter:'url(#b6)'});R(m,-300,-300,1320,1880,'#0a2840');for(let i=-6;i<20;i++)L(m,i*60,-300,i*60,1580,'#3a78b0',1.5,{opacity:.14,'stroke-linecap':'butt'});for(let i=-6;i<30;i++)L(m,-300,i*60,1020,i*60,'#3a78b0',1.5,{opacity:.14,'stroke-linecap':'butt'});
 P(m,'M-300,-300 L1020,-300 L1020,200 Q760,260 620,200 Q420,120 320,230 Q160,300 40,210 Q-100,150 -300,230Z','#2a3a2a',{stroke:'#8ee6b0','stroke-width':3});T(m,360,120,'MAINLAND',34,'#cfe6d0',{'letter-spacing':6,'font-weight':800});
 C(m,360,980,60,'#2f6b3f',{stroke:'#8ee6b0','stroke-width':4});C(m,360,980,10,'#fff');T(m,360,1070,'HIS ISLAND',26,'#cfe6d0',{'font-weight':800,'letter-spacing':3});
 const rt=P(m,'M360,940 Q300,700 420,480 T380,250','none',{stroke:'#ffca28','stroke-width':8,'stroke-dasharray':'20 16','stroke-linecap':'round'});T(m,520,640,'40 MI',54,'#ffca28',{'font-weight':900,stroke:'#000','stroke-width':6,'paint-order':'stroke fill'});
 const bts=[];if(p.hl||p.trap){for(let i=0;i<6;i++){const g=G(m);C(g,0,0,11,'#ffca28');T(g,0,40,'×',40,'#e83e36',{'font-weight':900});bts.push(g);A(g,{transform:`translate(${300+i*28+rnd(i)*20} ${760-i*72})`,opacity:0})}}
 const pl=pill(Z.hud,p.trap?'IT IS A TRAP':(p.hl?'SIX BOATS. NONE RETURNED':'SAFE ZONE?'),360,1180,p.trap?'#b3151c':'#173a52');
 return (u,t,bt)=>{A(rt,{'stroke-dashoffset':-t*50});bts.forEach((g,i)=>A(g,{opacity:clamp((bt-.1-i*.12)/.2)}));pl(clamp((bt-.2)/.3))}};
LIB.wave=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid,{transform:'translate(0 -120)'});R(f,-300,-300,1320,1880,'#050912');
 R(m,40,300,640,520,'#0b0f18',{rx:24,stroke:'#46557d','stroke-width':6});T(m,360,360,p.cough?'COUGH PATTERN':'AUDIO ANALYSER',30,'#9fb4e0',{'letter-spacing':4,'font-weight':800});
 const bars=[];for(let i=0;i<48;i++)bars.push(R(m,80+i*12,560,8,0,'#3dff7a',{rx:2}));
 const br=G(m,{opacity:0});R(br,70,420,260,280,'none',{rx:12,stroke:'#ffca28','stroke-width':5});R(br,390,420,260,280,'none',{rx:12,stroke:'#ffca28','stroke-width':5});T(br,200,740,'SAME',28,'#ffca28',{'font-weight':900});T(br,520,740,'SAME',28,'#ffca28',{'font-weight':900});
 const tc=timerChip(Z.hud,360,90,()=> p.human?'HUMAN: IRREGULAR':'REPEAT: 53 SEC');
 return (u,t,bt)=>{bars.forEach((b,i)=>{let h;if(p.loop===0)h=6+10*rnd(Math.floor(t*30)+i);else if(p.human)h=10+90*Math.abs(Math.sin(t*3+i*.37+rnd(Math.floor(t)+i)*3));else{const ph=(i%24);h=10+90*Math.abs(Math.sin(ph*.5)*Math.sin(ph*.17+1))*(p.loop?1:.6)}if(p.cough&&i>20&&i<26)h=120;A(b,{y:560-h,height:h*2,fill:(p.hl&&(i%24<24))?'#ffca28':'#3dff7a'})});A(br,{opacity:p.hl||p.loop===2?clamp((bt-.15)/.25):0});tc(clamp(bt/.3),t)}};
LIB.diagram=(Z,p)=>{
 const f=G(Z.far),m=G(Z.mid);R(f,-300,-300,1320,1880,'#081a36');for(let i=-6;i<20;i++)L(f,i*60,-300,i*60,1580,'#3a78b0',1.5,{opacity:.12,'stroke-linecap':'butt'});
 const hand=G(m,{transform:'translate(360 640)'});limb(hand,[[0,260],[0,100]],120,'#efcfae','#2a1c13');for(let i=0;i<4;i++)limb(hand,[[-46+i*30,100],[-52+i*32,-60]],26,'#efcfae','#2a1c13');
 const inf=C(hand,0,140,40,'#e83e36',{opacity:.55});const inf2=C(hand,0,140,40,'none',{stroke:'#e83e36','stroke-width':6});
 const ck=callout(Z.hud,360,150,'i','INFECTION SPREADING',480);
 return (u,t,bt)=>{const r=lerp(30,200,clamp(bt/1.4));A(inf,{r});A(inf2,{r:r+8});ck(clamp((bt-.2)/.3))}};
