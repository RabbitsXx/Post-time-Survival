/* ===== fx9: vertical overrides of the fx with fixed positions (WINDOW coordinates 450x800). sticker/stamp/ring/popup/keycap/like/counter come from fx16 (explicit x,y in the script) ===== */
const VW9=450,VH9=800;
FX.toast=(g,f)=>{const q=G(g,{});const w=372,h=80;R(q,0,0,w,h,'rgba(14,16,30,.94)',{rx:14,stroke:'#ffd23a','stroke-width':3});
 const tr=G(q,{transform:'translate(44 40) scale(.8)'});C(tr,0,0,32,'#ffd23a',{stroke:'#111','stroke-width':3});P(tr,'M-16,-14 h32 v10 q0,16 -16,20 q-16,-4 -16,-20Z','#111');
 T(q,214,32,'ACHIEVEMENT UNLOCKED',15,'#ffd23a',{'font-family':MONO,'font-weight':800,'letter-spacing':1,'data-slide':1});const tx=T(q,214,64,f.txt,26,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':1,'data-slide':1});fitText(tx,250);
 return (lt)=>{const dur=f.dur||3;const k=eo(clamp(lt/.3))*(1-clamp((lt-(dur-.3))/.3));A(q,{transform:`translate(${(VW9-w)/2} ${(f.y==null?100:f.y)-(1-k)*140})`})}};
FX.died=(g,f)=>{const q=G(g,{});R(q,0,190,VW9,190,'rgba(0,0,0,.74)');const tx=T(q,225,320,'YOU DIED',92,'#b01818',{'font-family':'DejaVu Serif, Georgia, serif','font-weight':700,'letter-spacing':6});fitText(tx,400);
 T(q,225,360,'DEATH #'+(f.n||1),20,'#c9c9d0',{'font-family':MONO,'font-weight':700,'letter-spacing':6});
 return (lt)=>{const k=clamp(lt/.6);A(q,{opacity:k});A(tx,{opacity:1})}};
FX.flash=(g,f)=>{const r=R(g,0,0,VW9,VH9,f.c||'#fff');return (lt)=>A(r,{opacity:(f.a||.9)*(1-clamp(lt/(f.dur||.2)))})};
FX.fade=(g,f)=>{const r=R(g,0,0,VW9,VH9,f.c||'#000');return (lt,bt,u)=>{const d=f.dur||.6;A(r,{opacity:f.out?clamp(lt/d):1-clamp(lt/d)})}};
FX.redvig=(g,f)=>{const r=R(g,0,0,VW9,VH9,'url(#gRedV)');const d=document.getElementById('ovdefs');if(!d.querySelector('#gRedV'))d.insertAdjacentHTML('beforeend','<radialGradient id="gRedV" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#e01010" stop-opacity="0"/><stop offset="1" stop-color="#e01010" stop-opacity=".85"/></radialGradient>');
 return (lt)=>A(r,{opacity:.55+.4*Math.sin(lt*10)})};
FX.glitch=(g,f)=>{const q=G(g,{style:'mix-blend-mode:screen'});const bars=[];for(let i=0;i<12;i++)bars.push(R(q,0,0,10,10,'#0ff'));
 return (lt)=>{bars.forEach((b,i)=>{const on=fxrnd(i,1)>.35;A(b,{opacity:on?.55:0,x:fxrnd(i,2)*340-60,y:fxrnd(i,3)*780,width:80+fxrnd(i,4)*340,height:3+fxrnd(i,5)*22,fill:['#00ffff','#ff00aa','#ffffff','#ffff00'][i%4]})})}};
FX.vhs=(g,f)=>{const q=G(g,{});R(q,0,0,VW9,VH9,'rgba(40,60,200,.18)');for(let y=0;y<VH9;y+=5)R(q,0,y,VW9,2,'#000',{opacity:.22});
 const band=R(q,0,0,VW9,50,'rgba(255,255,255,.14)');const lab=T(q,24,140,'◀◀ REWIND',34,'#fff',{'font-family':MONO,'font-weight':800,'letter-spacing':2,'text-anchor':'start',stroke:'#000','stroke-width':5,'paint-order':'stroke fill'});
 const tc=T(q,426,108,'',22,'#fff',{'font-family':MONO,'text-anchor':'end','font-weight':700,stroke:'#000','stroke-width':4,'paint-order':'stroke fill'});
 return (lt)=>{A(band,{y:((lt*700)%800)-60});A(lab,{opacity:Math.sin(lt*14)>-.3?1:.2});const sec=Math.max(0,(f.from==null?42:f.from)-lt*60);tc.textContent='00:'+String(Math.floor(sec/60)).padStart(2,'0')+':'+String(Math.floor(sec%60)).padStart(2,'0')}};
FX.bars=(g,f)=>{const a=R(g,0,0,VW9,0,'#000'),b=R(g,0,VH9,VW9,0,'#000');return (lt)=>{const k=eo(clamp(lt/.35))*(f.h||50);A(a,{height:k});A(b,{y:VH9-k,height:k})}};
FX.speed=(g,f)=>{const q=G(g,{});const ls=[];for(let i=0;i<46;i++)ls.push(P(q,'M0,0',null,{fill:'#fff',opacity:.5}));
 return (lt)=>{ls.forEach((l,i)=>{const a=(i/46)*Math.PI*2+fxrnd(i,1)*.1,r0=150+fxrnd(i,2)*110,r1=620,w=.02+fxrnd(i,3)*.03;A(l,{d:`M${225+Math.cos(a-w)*r1},${330+Math.sin(a-w)*r1} L${225+Math.cos(a)*r0},${330+Math.sin(a)*r0} L${225+Math.cos(a+w)*r1},${330+Math.sin(a+w)*r1}Z`,opacity:.2+.4*fxrnd(i,Math.floor(lt*20))})})}};
FX.chyron=(g,f)=>{const q=G(g,{});const w=f.w||330;R(q,0,0,w,40,'rgba(10,10,14,.9)');R(q,0,0,10,40,'#e0463a');const tx=T(q,24,28,f.txt,20,'#fff',{'font-family':RCF,'font-weight':700,'text-anchor':'start','letter-spacing':1.5});fitText(tx,w-34);
 return (lt)=>{const k=eo(clamp(lt/.3));A(q,{transform:`translate(${f.x==null?16:f.x} ${f.y==null?100:f.y}) translate(${(1-k)*-(w+30)} 0)`})}};
FX.pip=(g,f)=>{const q=G(g,{});const x=f.x==null?16:f.x,y=f.y==null?98:f.y,w=170,h=170;R(q,x,y,w,h,'#11131a',{rx:12,stroke:'#fff','stroke-width':3});
 const cp=uid2('pc');const cl=E('clipPath',{id:cp},q);R(cl,x+7,y+7,w-14,h-44,'#fff',{rx:8});const sc=G(q,{'clip-path':`url(#${cp})`});R(sc,x+7,y+7,w-14,h-44,'#3a4a8a');R(sc,x+7,y+90,w-14,50,'#2a3466');
 const hd=G(sc,{transform:`translate(${x+w/2} ${y+96}) scale(1.45)`});const mh=mayaHead(hd,KWHO.maya,{view:'front',expr:'smile'});
 const mo=E('ellipse',{cx:0,cy:23,rx:7,ry:1,fill:'#5a1a1a',stroke:'#2a1c13','stroke-width':2},mh);
 for(let yy=y+7;yy<y+h-37;yy+=4)R(sc,x+7,yy,w-14,1.3,'#000',{opacity:.22});
 T(q,x+w/2+8,y+h-12,f.name||'MAYA · RADIO',15,'#9fe8a0',{'font-family':MONO,'font-weight':800,'letter-spacing':1});C(q,x+18,y+h-17,4,'#ff2a2a');
 return (lt)=>{const k=eb(clamp(lt/.25));A(q,{opacity:clamp(lt/.05),transform:`translate(${(1-k)*-200} 0)`});const m=mouth(f.who||'maya');A(mo,{ry:Math.max(1,1+8*m),cy:21+3*m});A(sc,{opacity:.85+.15*Math.sin(lt*30)})}};
FX.freezetext=(g,f)=>{const t=T(g,225,300,f.txt||'',48,'#fff',{'font-family':INTER,'font-weight':900,stroke:'#000','stroke-width':10,'paint-order':'stroke fill','stroke-linejoin':'round'});return (lt)=>A(t,{opacity:clamp(lt/.1)})};
/* the series announcement (STANDING RULE): series name / PART n / N / topic, in the first seconds, inside the platform safe zone (window y 96-196) */
FX.series=(g,f)=>{const q=G(g,{});const w=330,h=104;R(q,5,7,w,h,'#000',{rx:16,opacity:.4});R(q,0,0,w,h,'rgba(8,12,24,.93)',{rx:16,stroke:f.c||'#ffd23a','stroke-width':3.5});
 const nm=T(q,w/2,26,f.name,15,f.c||'#ffd23a',{'font-family':RCF,'font-weight':700,'letter-spacing':2.5});fitText(nm,w-30);
 const pt=BT(q,w/2,66,'PART '+f.part+' / '+f.of,40,'#fff',{stroke:'#000','stroke-width':6,'letter-spacing':3});
 const tp=T(q,w/2,92,f.topic,19,'#cfe4ff',{'font-family':RCF,'font-weight':700,'letter-spacing':2});fitText(tp,w-30);
 return (lt)=>{const d=f.dur||3.1;const a=clamp(lt/.25)*(1-clamp((lt-(d-.3))/.3));A(q,{opacity:a,transform:`translate(${(VW9-w)/2} ${f.y==null?96:f.y}) translate(0 ${(1-eo(clamp(lt/.35)))*-18})`})}};
/* the route line along the bottom (window y 640): 10 stops, the current one lit, the clock and the place under it.  Visible on every non-card beat (STANDING RULE: the part number is always on screen). */
FX.route=(g,f)=>{const q=G(g,{});const n=f.of||10,x0=52,x1=398,y=632;
 R(q,x0-30,y-30,x1-x0+60,86,'rgba(6,8,14,.72)',{rx:14});L(q,x0,y,x1,y,'#3a3f52',4);const done=L(q,x0,y,x0+(x1-x0)*(f.stop-1)/(n-1),y,'#ffb020',4);
 const dots=[];for(let i=0;i<n;i++){const x=lerp(x0,x1,i/(n-1)),cur=i===f.stop-1;dots.push(C(q,x,y,cur?9:(i<f.stop-1?5:4),i<=f.stop-1?'#ffb020':'#4a4f66',{stroke:cur?'#fff':'none','stroke-width':2.5}))}
 const bx=lerp(x0,x1,(f.stop-1)/(n-1));const bus=G(q,{transform:`translate(${bx} ${y-20})`});R(bus,-13,-9,26,13,'#ffb020',{rx:4,stroke:'#000','stroke-width':1.5});R(bus,-10,-6,6,5,'#2a3a52');R(bus,-2,-6,6,5,'#2a3a52');R(bus,6,-6,5,5,'#2a3a52');C(bus,-7,5,3,'#111');C(bus,7,5,3,'#111');
 T(q,225,y+34,(f.time||'')+(f.place?'  ·  '+f.place:''),15,'#ffd86a',{'font-family':MONO,'font-weight':800,'letter-spacing':1.5});
 return (lt)=>{A(q,{opacity:clamp(lt/.3)});A(dots[f.stop-1],{r:9+1.6*Math.sin(lt*6)});A(bus,{transform:`translate(${bx} ${y-20+Math.sin(lt*10)*1})`})}};

/* flashlight beam: {x,y} origin in window coordinates, a0->a1 degrees (0 = up, 90 = right), len */
FX.beam=(g,f)=>{const q=G(g,{style:'mix-blend-mode:screen'});const p_=P(q,'M0,0',null,{fill:'#fffbe0',opacity:.5});const gl=C(q,0,0,18,'#fff',{opacity:.9});
 return (lt)=>{const k=clamp(lt/(f.dur||1.2));const a=lerp(f.a0==null?-30:f.a0,f.a1==null?30:f.a1,k)*Math.PI/180,w=.2,L_=f.len||520;const x=f.x,y=f.y;
  const p1=[x+Math.sin(a-w)*L_,y-Math.cos(a-w)*L_],p2=[x+Math.sin(a+w)*L_,y-Math.cos(a+w)*L_];A(p_,{d:`M${x},${y} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]}Z`,opacity:.42*clamp(lt/.1)});A(gl,{cx:x,cy:y,opacity:.9*clamp(lt/.1)})}};
FX.caption=(g,f)=>{const t=T(g,f.x,f.y,f.txt,f.size||40,f.c||'#fff',{'font-family':RCF,'font-weight':700,stroke:'#000','stroke-width':(f.size||40)*.2,'paint-order':'stroke fill','letter-spacing':f.ls||2});return (lt)=>{const k=eb(clamp(lt/.18));A(t,{opacity:clamp(lt/.06),transform:`translate(${f.x} ${f.y}) scale(${k}) translate(${-f.x} ${-f.y})`})}};
