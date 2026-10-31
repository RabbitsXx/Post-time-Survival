const LW=540,LH=960,GY=700,OUT='#1a1210';
function grad(c,x,y,w,h,stops,vert=1){const g=vert?c.createLinearGradient(0,y,0,y+h):c.createLinearGradient(x,0,x+w,0);stops.forEach(s=>g.addColorStop(s[0],s[1]));c.fillStyle=g;c.fillRect(x,y,w,h)}
function rect(c,x,y,w,h,f,s,lw=4,r=0){c.fillStyle=f;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();if(s){c.strokeStyle=s;c.lineWidth=lw;c.stroke()}}
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t*t*(3-2*t);
function rnd(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)}
let SPEC=null;const ST={line:5,slim:1,head:1};
window.setSpec=s=>{SPEC=s;Object.assign(ST,s.style||{})};
// ---------- characters ----------
const CH={
 okafor:{skin:'#8a5a3c',shirt:'#6a4a8a',pants:'#3a3a44',shoe:'#1e1a18',hair:'bald',beard:'#9a9a9a',glasses:1,h:1.0,w:1.08},
 bea:{skin:'#e0b898',shirt:'#d8607a',pants:'#4a3a3a',shoe:'#efe9e0',hair:'bun',hc:'#d8d8d8',glasses:1,h:.86,w:1.15},
 theo:{skin:'#c89870',shirt:'#2a9a6a',pants:'#2a2e44',shoe:'#efe9e0',hair:'messy',hc:'#2a1a10',headset:1,h:.88,w:.92},
 priya:{skin:'#b98060',shirt:'#3a8ac8',pants:'#2a2e44',shoe:'#e8e8e8',hair:'pony',hc:'#1a120c',h:.96,w:.95},
 dunn:{skin:'#d0a07c',shirt:'#b8402a',pants:'#2a2a30',shoe:'#2a2420',hair:'bandana',hc:'#c8a060',beard:'#a86a3a',h:1.04,w:1.12},
 z_robe:{z:1,skin:'#9ab58a',shirt:'#c8b0d8',pants:'#6a5a7a',hair:'bald',h:1.0,w:1.05},
 z_postman:{z:1,skin:'#a0b890',shirt:'#5a6a8a',pants:'#3a3f4d',hair:'cap',hc:'#2a3a5a',h:1.02,w:1.0},
 z_jogger:{z:1,skin:'#98b488',shirt:'#e87a5a',pants:'#3a3a3e',hair:'pony',hc:'#4a2a1a',h:.94,w:.95},
 z_suit:{z:1,skin:'#9cb08a',shirt:'#4a4a54',pants:'#2a2a30',hair:'slick',hc:'#2a2a2a',h:1.06,w:1.0},
 z_pyjama:{z:1,skin:'#9ab88e',shirt:'#a8c8e8',pants:'#5a7aa8',hair:'messy',hc:'#5a4a3a',h:.9,w:.95}
};

function limb(c,x,y,a1,l1,a2,l2,w,col){const ex=x+Math.sin(a1)*l1,ey=y+Math.cos(a1)*l1,a=a1+a2,hx=ex+Math.sin(a)*l2,hy=ey+Math.cos(a)*l2;
 c.lineCap='round';c.lineJoin='round';for(const [lw,cc] of [[w+ST.line*1.6,OUT],[w,col]]){c.strokeStyle=cc;c.lineWidth=lw;c.beginPath();c.moveTo(x,y);c.lineTo(ex,ey);c.lineTo(hx,hy);c.stroke()}return {ex,ey,hx,hy,a}}
function blob(c,x,y,w,h,r,fill){c.fillStyle=fill;c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();c.stroke()}
function circ(c,x,y,r,fill,lw=ST.line){c.fillStyle=fill;c.strokeStyle=OUT;c.lineWidth=lw;c.beginPath();c.arc(x,y,r,0,7);c.fill();if(lw)c.stroke()}
const D=Math.PI/180;
function drawProp(c,k,x,y,ang){c.save();c.translate(x,y);c.rotate(ang);
 if(k==='pan'){c.strokeStyle=OUT;c.lineWidth=11;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(0,52);c.stroke();c.strokeStyle='#6a5a4a';c.lineWidth=ST.line;c.beginPath();c.moveTo(0,0);c.lineTo(0,52);c.stroke();circ(c,0,76,26,'#4a4a52',5);circ(c,0,76,17,'#2e2e34',0)}
 else if(k==='wrench'){c.strokeStyle=OUT;c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(0,62);c.stroke();c.strokeStyle='#b9bcc2';c.lineWidth=7;c.beginPath();c.moveTo(0,0);c.lineTo(0,62);c.stroke();c.fillStyle='#b9bcc2';c.strokeStyle=OUT;c.lineWidth=4;c.beginPath();c.moveTo(-14,62);c.lineTo(-14,86);c.lineTo(-5,86);c.lineTo(-5,74);c.lineTo(5,74);c.lineTo(5,86);c.lineTo(14,86);c.lineTo(14,62);c.closePath();c.fill();c.stroke()}
 else if(k==='flash'){blob(c,-8,0,16,46,5,'#3a3a44');blob(c,-12,40,24,18,5,'#ffd870')}
 else if(k==='keys'){circ(c,0,10,9,'none',4);blob(c,-6,18,12,22,3,'#d9ad3a')}
 else if(k==='console'){blob(c,-24,0,48,30,6,'#2a2a38');c.fillStyle='#7aff9a';c.fillRect(-16,5,32,16)}
 else if(k==='clip'){blob(c,-18,0,36,48,4,'#c8a870');blob(c,-13,8,26,34,2,'#fffbe8')}
 else if(k==='mirror'){c.strokeStyle=OUT;c.lineWidth=9;c.beginPath();c.moveTo(0,0);c.lineTo(0,26);c.stroke();circ(c,0,50,24,'#dff3ff',5)}
 c.restore()}
function face(c,ch,P,t,R){ // head in profile, facing +x ; head centre (0,0) r=R
 const e=P.expr||'calm',blink=((t*0.8+R)%4)>3.85?0.15:1;
 const open=P.mouth||0;
 if(ch.z){ // zombie face
  c.fillStyle='#ffe9a0';c.strokeStyle=OUT;c.lineWidth=3;c.beginPath();c.ellipse(R*.36,-R*.08,R*.2,R*.2,0,0,7);c.fill();c.stroke();circ(c,R*.42,-R*.08,R*.07,'#a0201a',0);
  c.strokeStyle=OUT;c.lineWidth=4;c.beginPath();c.moveTo(R*.1,-R*.38);c.lineTo(R*.6,-R*.22);c.stroke();
  const mo=.35+open*.5;c.fillStyle='#3a0a0a';c.beginPath();c.ellipse(R*.4,R*.4,R*.26,R*.22*mo*1.6,0,0,7);c.fill();c.stroke();c.fillStyle='#f4f0d8';c.fillRect(R*.25,R*.4-R*.2*mo*1.6,R*.1,R*.1);c.fillRect(R*.44,R*.4-R*.2*mo*1.6,R*.1,R*.1);return}
 const ex=R*.38,ey=-R*.08;
 if(ch.mini){c.fillStyle=OUT;c.beginPath();c.arc(ex,ey,R*.1*(e==='scared'?1.5:1)*blink+.5,0,7);c.fill();c.strokeStyle=OUT;c.lineWidth=ST.line*.55;c.lineCap='round';c.beginPath();const by=ey-R*.3;if(e==='angry'){c.moveTo(ex-R*.2,by-R*.06);c.lineTo(ex+R*.2,by+R*.1)}else if(e==='worried'||e==='scared'||e==='sad'){c.moveTo(ex-R*.2,by+R*.08);c.lineTo(ex+R*.2,by-R*.08)}else{c.moveTo(ex-R*.2,by);c.lineTo(ex+R*.2,by)}c.stroke();c.beginPath();if(open>.12){c.ellipse(R*.55,R*.46,R*.1,R*.05+open*R*.12,0,0,7);c.fillStyle='#3a1010';c.fill()}else if(e==='smile'){c.arc(R*.55,R*.36,R*.14,.2,2.8)}else{c.moveTo(R*.42,R*.46);c.lineTo(R*.7,R*.44)}c.stroke();if(ch.beard){c.fillStyle=ch.beard;c.beginPath();c.moveTo(R*.2,R*.3);c.quadraticCurveTo(R*.4,R*1.1,R*.8,R*.5);c.lineTo(R*.76,R*.3);c.quadraticCurveTo(R*.5,R*.55,R*.25,R*.26);c.fill()}return}
 const sc={worried:.95,scared:1.35,shock:1.35,angry:.85,smile:.9,tired:.55,smug:.7,calm:1}[e]||1;
 c.fillStyle='#fff';c.strokeStyle=OUT;c.lineWidth=3;c.beginPath();c.ellipse(ex,ey,R*.17,R*.19*sc*blink,0,0,7);c.fill();c.stroke();
 const lk=P.look||0;circ(c,ex+R*.05+lk*R*.05,ey,R*.08*(e==='scared'?.7:1),OUT,0);
 c.strokeStyle=OUT;c.lineWidth=ST.line;c.lineCap='round';c.beginPath();
 const by=ey-R*.32;
 if(e==='angry'){c.moveTo(ex-R*.2,by-R*.1);c.lineTo(ex+R*.22,by+R*.12)}else if(e==='worried'||e==='scared'){c.moveTo(ex-R*.2,by+R*.1);c.lineTo(ex+R*.22,by-R*.1)}else if(e==='smug'){c.moveTo(ex-R*.2,by+R*.02);c.lineTo(ex+R*.22,by-R*.02)}else{c.moveTo(ex-R*.2,by);c.lineTo(ex+R*.22,by-R*.04)}c.stroke();
 // nose
 c.fillStyle=ch.skin;c.strokeStyle=OUT;c.lineWidth=4;c.beginPath();c.moveTo(R*.86,R*.02);c.quadraticCurveTo(R*1.12,R*.12,R*.86,R*.22);c.fill();c.stroke();
 // mouth
 const my=R*.5;c.strokeStyle=OUT;c.lineWidth=ST.line;
 if(open>.12||e==='shock'){c.fillStyle='#4a1414';c.beginPath();c.ellipse(R*.58,my,R*.15+open*R*.05,R*.07+open*R*.2,0,0,7);c.fill();c.stroke()}
 else if(e==='smile'||e==='smug'){c.beginPath();c.arc(R*.55,my-R*.12,R*.2,.15,Math.PI*.7);c.stroke()}
 else if(e==='worried'||e==='scared'||e==='tired'){c.beginPath();c.moveTo(R*.4,my+R*.05);c.quadraticCurveTo(R*.58,my-R*.08,R*.76,my+R*.04);c.stroke()}
 else{c.beginPath();c.moveTo(R*.4,my);c.lineTo(R*.76,my-R*.02);c.stroke()}
 if(ch.glasses){c.strokeStyle=OUT;c.lineWidth=4;c.beginPath();c.arc(ex,ey,R*.25,0,7);c.stroke();c.beginPath();c.moveTo(ex-R*.25,ey);c.lineTo(-R*.6,ey-R*.05);c.stroke()}
 if(ch.beard){c.fillStyle=ch.beard;c.strokeStyle=OUT;c.lineWidth=4;c.beginPath();c.moveTo(R*.15,R*.3);c.quadraticCurveTo(R*.4,R*1.25,R*.82,R*.52);c.lineTo(R*.78,R*.34);c.quadraticCurveTo(R*.55,R*.62,R*.2,R*.28);c.fill();c.stroke()}}
function hair(c,ch,R,back){const hc=ch.hc||'#222';c.fillStyle=hc;c.strokeStyle=OUT;c.lineWidth=ST.line;
 const h=ch.hair;
 if(back){ if(h==='pony'){c.beginPath();c.moveTo(-R*.7,-R*.2);c.quadraticCurveTo(-R*1.7,R*.1,-R*1.2,R*1.05);c.quadraticCurveTo(-R*.9,R*.5,-R*.5,R*.2);c.fill();c.stroke()}else if(h==='bun'){circ(c,-R*.5,-R*.95,R*.38,hc)}return}
 if(h==='bald'||h==='cap'&&false){return}
 if(h==='messy'){c.beginPath();c.moveTo(-R*.95,-R*.05);for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6;c.lineTo(Math.cos(a)*R*1.18,Math.sin(a)*R*1.25-(i%2?R*.12:0))}c.lineTo(R*.8,-R*.38);c.lineTo(-R*.1,-R*.45);c.closePath();c.fill();c.stroke()}
 else if(h==='cap'){c.fillStyle=hc;c.beginPath();c.arc(0,-R*.1,R*1.05,Math.PI,0);c.lineTo(R*1.5,-R*.2);c.lineTo(R*.9,-R*.05);c.lineTo(-R*1.05,-R*.05);c.fill();c.stroke()}
 else if(h==='slick'){c.beginPath();c.arc(0,-R*.1,R*1.04,Math.PI*1.02,Math.PI*1.98);c.lineTo(R*.6,-R*.55);c.lineTo(-R*.9,-R*.3);c.fill();c.stroke()}
 else if(h==='bandana'){c.fillStyle='#c8372a';c.beginPath();c.moveTo(-R*1.02,-R*.35);c.lineTo(R*1.0,-R*.5);c.lineTo(R*1.0,-R*.18);c.lineTo(-R*1.02,-R*.08);c.closePath();c.fill();c.stroke();c.fillStyle=hc;c.beginPath();c.arc(0,-R*.2,R*1.0,Math.PI*1.02,Math.PI*1.2);c.lineTo(-R*.4,-R*.6);c.fill()}
 else{c.beginPath();c.arc(0,-R*.1,R*1.05,Math.PI*1.0,Math.PI*1.95);c.lineTo(R*.7,-R*.5);c.lineTo(-R*.2,-R*.6);c.fill();c.stroke()}
 if(h==='bun'){}}
function drawChar(c,A,P,t){ // A: actor def, P: pose
 const ch=CH[A.who];const S=P.s;c.save();c.translate(P.x,P.y);c.scale(P.face*S*ch.h,S*ch.h);
 // shadow
 c.save();c.scale(1,.2);c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.arc(0,0,70*ch.w,0,7);c.fill();c.restore();
 const rot=(P.rot||0)*D;
 c.rotate(rot);
 const bob=P.bob||0;c.translate(0,bob);
 const lean=(P.lean||0)*D;
 // legs
 const hipY=-108,lw=22*ST.slim;
 const lA=P.legA||[0,0],lB=P.legB||[0,0];
 // far leg
 limb(c,-6,hipY,lA[0]*D,52,lB[0]*D,52,lw,ch.pants);
 const fr=limb(c,-6,hipY,lA[0]*D,52,lB[0]*D,52,lw,ch.pants);
 blob(c,fr.hx-12,fr.hy-8,34,16,7,ch.shoe||'#222');
 // far arm
 c.save();c.translate(0,hipY);c.rotate(lean);
 const sh=[0,-92];
 const far=P.armF||[10,10];
 limb(c,sh[0]-2,sh[1],far[0]*D,44,far[1]*D,42,18*ST.slim,ch.skin);limb(c,sh[0]-2,sh[1],far[0]*D,44,far[1]*D,0.001,18*ST.slim,ch.shirt);
 // back hair
 // torso
 c.fillStyle=ch.shirt;c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.roundRect(-30*ch.w*ST.slim,-96,60*ch.w*ST.slim,98,[24,24,12,12]);c.fill();c.stroke();
 if(ch.z){c.strokeStyle=OUT;c.lineWidth=3;c.beginPath();c.moveTo(-18,-40);c.lineTo(-6,-30);c.lineTo(-16,-20);c.stroke();c.fillStyle='rgba(120,20,20,.55)';c.fillRect(6,-60,14,12)}
 // head
 const R=38*ST.head,hx=P.hx||0;c.save();c.translate(8+hx,-134);c.rotate((P.tilt||0)*D);
 hair(c,ch,R,true);circ(c,0,0,R,ch.skin);
 face(c,ch,P,t,R);hair(c,ch,R,false);
 if(ch.headset){c.strokeStyle='#222';c.lineWidth=7;c.beginPath();c.arc(0,-6,R*1.03,Math.PI*1.05,Math.PI*1.9);c.stroke();circ(c,-R*.2,R*.05,R*.28,'#3a3a44',4);c.strokeStyle='#222';c.lineWidth=4;c.beginPath();c.moveTo(-R*.2,R*.3);c.quadraticCurveTo(R*.4,R*.8,R*.55,R*.55);c.stroke()}
 c.restore();
 // near arm + prop
 const near=P.armN||[10,10];const na=limb(c,0,-92,near[0]*D,44,near[1]*D,42,18*ST.slim,ch.shirt);
 limb(c,0,-92,near[0]*D,44,near[1]*D,0.001,18*ST.slim,ch.shirt);
 limb(c,na.ex,na.ey,(near[0]+near[1])*D,2,0,0.001,18*ST.slim,ch.skin);circ(c,na.hx,na.hy,10*ST.slim,ch.skin,ST.line*.8);
 if(P.prop){drawProp(c,P.prop,na.hx,na.hy,na.a+Math.PI+(P.propRot||0)*D)}
 c.restore();
 // near leg
 const nl=limb(c,6,hipY,-lA[1]*D,52,-lB[1]*D,52,lw,ch.pants);blob(c,nl.hx-12,nl.hy-8,34,16,7,ch.shoe||'#222');
 c.restore()}
// ======== FRONT-FACING CAST (The Last Bus style, improved) ========
CH.nell={f:1,skin:'#c98d6a',shirt:'#3f7d5c',acc:'#2a5a42',hair:'bun',hc:'#2a1a14',pants:'#3a3a40',vest:1,h:1};
CH.mayor={f:1,skin:'#e2b08e',shirt:'#8a2e2e',acc:'#c9a23a',hair:'bald',mustache:'#5a3a22',pants:'#3a3a40',sash:1,h:1.05,w:1.18};
CH.gran={f:1,skin:'#ecc9a8',shirt:'#8a5ab0',acc:'#6a3a90',hair:'whitebun',hc:'#f0f0f0',glasses:1,pants:'#4a3a50',h:.86,w:.96};
CH.timo={f:1,skin:'#d9a982',shirt:'#e0b030',acc:'#b88a20',hair:'cap',hc:'#c0392b',pants:'#2a3a5a',h:.8,w:.86};
CH.doc={f:1,skin:'#8a5a3c',shirt:'#e8e8ea',acc:'#3a6a8a',hair:'grey',hc:'#bdbdbd',glasses:1,beard:'#bdbdbd',pants:'#3a4a5a',h:1,w:1};
CH.hale={f:1,skin:'#d4a07c',shirt:'#6a6a3a',acc:'#4a4a2a',hair:'grey',hc:'#d8d8d8',shades:1,pants:'#3a3a34',h:1,w:1,cane:1};
function frontFace(c,ch,P,t,R){const e=P.expr||'calm',open=P.mouth||0,blink=((t*.7+(P.x||0)*.0137+R*.31)%4.2)>4.1?.1:1,lk=P.look||0;
 if(ch.z){const ex=R*.42,ey=-R*.06,er=R*.27;for(const sx of[-1,1]){c.fillStyle='#f4eec0';c.strokeStyle=OUT;c.lineWidth=ST.line*.9;c.beginPath();c.ellipse(sx*ex,ey,er,er*1.05,0,0,7);c.fill();c.stroke();c.fillStyle='#a8201a';c.beginPath();c.arc(sx*ex+(P.look||0)*er*.3,ey,er*.42,0,7);c.fill();c.fillStyle=OUT;c.beginPath();c.arc(sx*ex+(P.look||0)*er*.3,ey,er*.2,0,7);c.fill()}
  c.strokeStyle=OUT;c.lineWidth=ST.line*1.1;c.beginPath();c.moveTo(-ex-er,-R*.4);c.lineTo(-ex+er,-R*.3);c.moveTo(ex-er,-R*.3);c.lineTo(ex+er,-R*.4);c.stroke();
  c.fillStyle='#3a0a0a';c.beginPath();c.ellipse(0,R*.58,R*.3,R*.14+Math.abs(Math.sin(t*3+(P.x||0)))*R*.08,0,0,7);c.fill();c.stroke();c.fillStyle='#f0ecd0';for(let i=-2;i<=2;i++)c.fillRect(i*R*.1-R*.03,R*.5,R*.06,R*.07);return}
 const ex=R*.42,ey=-R*.06,er=R*.27;
 const big={scared:1.25,worried:1.05,shock:1.3,angry:.85,smile:.9,tired:.6,smug:.8,sad:.95,calm:1}[e]||1;
 for(const sx of [-1,1]){
  if(ch.shades){c.fillStyle='#14121a';c.beginPath();c.ellipse(sx*ex,ey,er*1.05,er*.8,0,0,7);c.fill();c.strokeStyle=OUT;c.lineWidth=ST.line;c.stroke();continue}
  c.fillStyle='#fff';c.strokeStyle=OUT;c.lineWidth=ST.line*.9;c.beginPath();c.ellipse(sx*ex,ey,er,er*1.12*big*blink,0,0,7);c.fill();c.stroke();
  if(blink>.5){c.fillStyle=OUT;c.beginPath();c.arc(sx*ex+lk*er*.45,ey+(e==='sad'?er*.2:0),er*.46*(e==='scared'?.7:1),0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(sx*ex+lk*er*.45+er*.14,ey-er*.12,er*.14,0,7);c.fill()}
  c.strokeStyle=OUT;c.lineWidth=ST.line*1.1;c.lineCap='round';c.beginPath();const by=ey-er*1.55;
  if(e==='angry'){c.moveTo(sx*ex+sx*-1*er*1.1,by-er*.3*sx*-1*0);c.moveTo(sx*ex-sx*er*1.05,by-er*.5);c.lineTo(sx*ex+sx*er*.9,by+er*.35)}
  else if(e==='worried'||e==='scared'||e==='sad'){c.moveTo(sx*ex-sx*er*1.0,by+er*.35);c.lineTo(sx*ex+sx*er*.9,by-er*.25)}
  else if(e==='smug'){c.moveTo(sx*ex-er,by+(sx>0?er*.2:0));c.lineTo(sx*ex+er,by+(sx>0?0:er*.2))}
  else{c.moveTo(sx*ex-er,by);c.lineTo(sx*ex+er,by-er*.12)}
  c.stroke()}
 if(ch.glasses){c.strokeStyle=OUT;c.lineWidth=ST.line*.9;for(const sx of[-1,1]){c.beginPath();c.arc(sx*ex,ey,er*1.3,0,7);c.stroke()}c.beginPath();c.moveTo(-ex+er*1.3,ey);c.lineTo(ex-er*1.3,ey);c.stroke()}
 // nose
 c.strokeStyle=OUT;c.fillStyle=ch.skin;c.lineWidth=ST.line*.8;c.beginPath();c.ellipse(0,R*.2,R*.1,R*.13,0,0,7);c.fill();c.stroke();
 if(ch.mustache){c.fillStyle=ch.mustache;c.strokeStyle=OUT;c.lineWidth=ST.line*.8;c.beginPath();c.moveTo(0,R*.32);c.quadraticCurveTo(-R*.45,R*.2,-R*.62,R*.5);c.quadraticCurveTo(-R*.3,R*.5,0,R*.44);c.quadraticCurveTo(R*.3,R*.5,R*.62,R*.5);c.quadraticCurveTo(R*.45,R*.2,0,R*.32);c.fill();c.stroke()}
 const my=R*.58;c.strokeStyle=OUT;c.lineWidth=ST.line*1.0;c.lineCap='round';
 if(open>.1){c.fillStyle='#5a1a1a';c.beginPath();c.ellipse(0,my+open*R*.06,R*.24+open*R*.08,R*.07+open*R*.22,0,0,7);c.fill();c.stroke();if(open>.3){c.fillStyle='#fff';c.fillRect(-R*.16,my-R*.05,R*.32,R*.07)}}
 else if(e==='smile'||e==='smug'){c.beginPath();c.arc(0,my-R*.14,R*.3,.2,Math.PI-.2);c.stroke()}
 else if(e==='worried'||e==='scared'||e==='sad'){c.beginPath();c.arc(0,my+R*.2,R*.25,Math.PI+.4,-.4);c.stroke()}
 else if(e==='angry'){c.beginPath();c.moveTo(-R*.24,my+R*.05);c.lineTo(R*.24,my-R*.02);c.stroke()}
 else{c.beginPath();c.moveTo(-R*.2,my);c.lineTo(R*.2,my);c.stroke()}
 if(ch.beard){c.fillStyle=ch.beard;c.strokeStyle=OUT;c.lineWidth=ST.line*.8;c.beginPath();c.moveTo(-R*.8,R*.15);c.quadraticCurveTo(-R*.6,R*1.15,0,R*1.15);c.quadraticCurveTo(R*.6,R*1.15,R*.8,R*.15);c.quadraticCurveTo(R*.5,R*.5,0,R*.42);c.quadraticCurveTo(-R*.5,R*.5,-R*.8,R*.15);c.fill();c.stroke()}}
function frontHair(c,ch,R,front){const hc=ch.hc||'#222',h=ch.hair;c.fillStyle=hc;c.strokeStyle=OUT;c.lineWidth=ST.line;
 if(!front){if(h==='bun'||h==='whitebun'){circ(c,0,-R*1.08,R*.42,hc,ST.line)}return}
 if(h==='bald'||!h)return;
 if(h==='cap'){c.beginPath();c.arc(0,-R*.3,R*1.02,Math.PI,0);c.lineTo(R*1.0,-R*.52);c.lineTo(-R*1.0,-R*.52);c.closePath();c.fill();c.stroke();c.fillStyle='#8a1f14';c.beginPath();c.moveTo(-R*1.08,-R*.55);c.lineTo(R*1.08,-R*.55);c.lineTo(R*1.18,-R*.4);c.lineTo(-R*1.18,-R*.4);c.closePath();c.fill();c.stroke();return}
 c.beginPath();c.arc(0,-R*.16,R*1.04,Math.PI*1.04,Math.PI*1.96);c.quadraticCurveTo(R*.5,-R*.62,0,-R*.7);c.quadraticCurveTo(-R*.5,-R*.62,-R*.98,-R*.3);c.fill();c.stroke()}
function drawFront(c,A,P,t){const ch=CH[A.who];if(ch.hr){drawHuman(c,A,P,t);return}if(ch.zr){drawRealZombie(c,A,P,t);return}const S=P.s;c.save();c.translate(P.x,P.y);c.scale(S*ch.h,S*ch.h);
 if(ch.carrot){c.save();c.scale(1,.2);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.arc(0,0,80,0,7);c.fill();c.restore();const sw=Math.sin(t*1.7+(P.x||0))*6;
  // arms (zombie reach)
  for(const sx of[-1,1]){c.save();c.translate(sx*58,-120);c.rotate(sx*(-1.2+Math.sin(t*2+sx)*.08));rect(c,-13,0,26,70,'#e8742a',OUT,ST.line,13);circ(c,0,76,15,'#9ab88a',ST.line);c.restore()}
  c.fillStyle='#e8742a';c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.moveTo(-64,-6);c.quadraticCurveTo(-92,-118,-40,-216);c.lineTo(40,-216);c.quadraticCurveTo(92,-118,64,-6);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(120,40,0,.5)';c.lineWidth=4;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-60+i*10,-60-i*40);c.lineTo(-20+i*3,-62-i*40);c.stroke()}
  // leafy top
  c.fillStyle='#3aa83a';for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*14,-210);c.quadraticCurveTo(i*34+sw,-290-Math.abs(i)*6,i*10+sw*.5,-300+Math.abs(i)*14);c.quadraticCurveTo(i*8,-250,i*14+10,-210);c.fill();c.stroke()}
  // zombie face poking out of the costume
  c.save();c.translate(0,-146);c.scale(.62,.62);realHead(c,5,t,.5+Math.abs(Math.sin(t*1.6))*.5,Math.sin(t*.7));c.restore();c.restore();return}
 c.save();c.scale(1,.2);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.arc(0,0,80*(ch.w||1),0,7);c.fill();c.restore();
 const bob=P.bob||0;c.translate(0,bob);const R=66*ST.head;const bw=64*(ch.w||1);
 // legs
 for(const sx of[-1,1]){rect(c,sx*bw*.35-16,-62,32,62,ch.pants,OUT,ST.line,10)}
 // arms
 const gest=(P.mouth||0)>.08?(.4+(P.mouth||0)*.6):0;
 for(const sx of[-1,1]){const lift=(P.armLift||0)*(sx>0?1:0.0)+gest*(sx>0?28:10)*(Math.sin(t*7+sx));
  c.save();c.translate(sx*(bw+4),-104);c.rotate(sx*(.18+lift*.012));rect(c,-15,0,30,76,ch.shirt,OUT,ST.line,15);circ(c,0,84,16,ch.skin,ST.line);c.restore()}
 // torso
 c.fillStyle=ch.shirt;c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.moveTo(-bw,-8);c.lineTo(-bw*.86,-112);c.quadraticCurveTo(0,-128,bw*.86,-112);c.lineTo(bw,-8);c.closePath();c.fill();c.stroke();
 if(ch.vest){c.fillStyle=ch.acc;c.beginPath();c.moveTo(-bw*.7,-112);c.lineTo(-bw*.15,-106);c.lineTo(-bw*.3,-16);c.lineTo(-bw*.9,-16);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(bw*.7,-112);c.lineTo(bw*.15,-106);c.lineTo(bw*.3,-16);c.lineTo(bw*.9,-16);c.closePath();c.fill();c.stroke();rect(c,-bw*.62,-70,bw*.4,22,'#e8dcc0',OUT,ST.line*.7,4)}
 if(ch.sash){c.strokeStyle=ch.acc;c.lineWidth=14;c.beginPath();c.moveTo(-bw*.7,-108);c.lineTo(bw*.7,-24);c.stroke()}
 // collar / neck
 rect(c,-14,-132,28,24,ch.skin,OUT,ST.line*.8,8);
 // head
 c.save();c.translate(0,-188+(P.tiltY||0));c.rotate((P.tilt||0)*D*.6);
 frontHair(c,ch,R,false);circ(c,0,0,R,ch.skin,ST.line);circ(c,-R,R*.1,R*.2,ch.skin,ST.line);circ(c,R,R*.1,R*.2,ch.skin,ST.line);circ(c,0,0,R,ch.skin,ST.line);
 c.fillStyle='rgba(255,255,255,.12)';c.beginPath();c.ellipse(-R*.38,-R*.42,R*.3,R*.16,-.6,0,7);c.fill();
 frontFace(c,ch,P,t,R);frontHair(c,ch,R,true);c.restore();
 if(ch.cane){c.strokeStyle=OUT;c.lineWidth=10;c.beginPath();c.moveTo(bw+40,-16);c.lineTo(bw+40,-150);c.stroke();c.strokeStyle='#e8e8e8';c.lineWidth=5;c.stroke()}
 if(P.prop&&P.prop!=='none'){drawProp(c,P.prop,(P.propX||bw+6),-20,P.propRot?P.propRot*D:0)}
 c.restore()}
CH.biscuit={dog:1,h:1,w:1};
function drawDog(c,A,P,t){c.save();c.translate(P.x,P.y);c.scale(P.s*(P.face||1),P.s);c.save();c.scale(1,.2);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.arc(0,0,70,0,7);c.fill();c.restore();
 const b=Math.sin(t*3)*2,sick=A.expr==='sad';
 for(const x of[-34,-14,28,48]){rect(c,x-8,-46,16,46,'#f4f1ea',OUT,ST.line,7)}
 c.fillStyle='#1b1b20';c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.ellipse(0,-70+b,70,38,0,0,7);c.fill();c.stroke();c.fillStyle='#f4f1ea';c.beginPath();c.ellipse(38,-62+b,22,26,0,0,7);c.fill();
 c.fillStyle='#1b1b20';c.beginPath();c.ellipse(-72,-84+b,34,10,-.3+Math.sin(t*5)*.1,0,7);c.fill();c.stroke();
 c.save();c.translate(62,-110+b+(sick?18:0));c.fillStyle='#1b1b20';c.beginPath();c.ellipse(0,0,36,32,0,0,7);c.fill();c.stroke();c.fillStyle='#f4f1ea';c.beginPath();c.ellipse(8,10,22,20,0,0,7);c.fill();
 c.fillStyle='#1b1b20';c.beginPath();c.ellipse(-22,-30,12,24,-.5,0,7);c.fill();c.stroke();c.beginPath();c.ellipse(18,-32,12,24,.4,0,7);c.fill();c.stroke();
 circ(c,26,2,6,OUT,0);circ(c,0,-8,6,'#fff',2);circ(c,0,-8,3,OUT,0);circ(c,16,-8,6,'#fff',2);circ(c,16,-8,3,OUT,0);c.restore();c.restore()}

// ---------- poses ----------
function evalActor(A,t,mouthEnv){
 // path: [[t,x,y],..]
 const pth=A.path;let x=pth[0][1],y=pth[0][2],v=0;
 for(let i=0;i<pth.length-1;i++){const a=pth[i],b=pth[i+1];if(t>=a[0]&&t<=b[0]){const k=(t-a[0])/Math.max(1e-6,b[0]-a[0]);const e=b[3]==='ease'?ease(k):k;x=lerp(a[1],b[1],e);y=lerp(a[2],b[2],e);v=(b[1]-a[1])/Math.max(1e-6,b[0]-a[0]);break}else if(t>b[0]){x=b[1];y=b[2]}}
 const base=A.z?1.0:1.0;const s=(1+(y-GY)/GY*.4)*1.7*(A.sc||1);
 const walking=Math.abs(v)>8;const P={x,y,s,face:A.face,expr:A.expr||'calm',look:A.look||0,mouth:mouthEnv||0,prop:A.prop,bob:0,lean:0,tilt:0,legA:[0,0],legB:[0,0],armF:[8,8],armN:[8,10]};
 if(v!==0&&walking)P.face=v>0?1:-1;
 if(A.faceKeys){for(const f of A.faceKeys){if(t>=f[0])P.face=f[1]}}
 const ph=(A.z?1.6:2.3)*x/60;
 if(walking){const sw=Math.sin(ph*Math.PI);const amp=A.z?22:34;P.legA=[sw*amp,0];P.legB=[Math.max(0,-sw*40),0];P.legA=[sw*amp,Math.max(0,-sw)*28];P.legB=[-sw*amp,Math.max(0,sw)*28];
  P.legA=[sw*amp,Math.max(0,-sw*40)];P.legB=[-sw*amp,Math.max(0,sw*40)];
  P.bob=-Math.abs(Math.cos(ph*Math.PI))*(A.z?3:6);P.armN=[-sw*amp*.9+6,14];P.armF=[sw*amp*.9+6,14];P.lean=A.z?10:4}
 else{P.bob=Math.sin(t*2.2+x)*2.2;P.armN=[6+Math.sin(t*1.6+x)*3,10];P.armF=[4,10]}
 if(A.z){P.lean=14;P.armN=[82+Math.sin(t*2+x)*7,-8];P.armF=[76+Math.sin(t*2.3+x)*7,-6];P.tilt=10+Math.sin(t*1.2+x)*5;if(!walking)P.bob=Math.sin(t*1.5+x)*3}
 // talk gestures
 if(mouthEnv>.08&&!walking&&!A.z){P.armN=[30+mouthEnv*40,40+Math.sin(t*9)*10];P.tilt=Math.sin(t*5)*3}
 // acts
 for(const a of (A.acts||[])){const [t0,t1,k,pa]=a;if(t<t0)continue;const u=clamp((t-t0)/Math.max(1e-6,t1-t0)),inside=t<=t1;
  if(k==='swing'){ // windup .0-.45  strike .45-.62 follow .62-1
   const w=pa&&pa.prop;if(w)P.prop=w;let up,fo;
   if(u<.45){const k2=ease(u/.45);up=lerp(8,165,k2);fo=lerp(10,-20,k2);P.lean=lerp(0,-14,k2)}else if(u<.62){const k2=(u-.45)/.17;up=lerp(165,35,k2);fo=lerp(-20,25,k2);P.lean=lerp(-14,22,k2)}else{const k2=ease((u-.62)/.38);up=lerp(35,20,k2);fo=lerp(25,12,k2);P.lean=lerp(22,10,k2)}
   P.armN=[up,fo];P.armF=[up*.5,10];P.propRot=0;P.mouth=Math.max(P.mouth,.4)}
  else if(k==='shush'){if(inside||t>t1){P.armN=[150,-130];P.propRot=0}}
  else if(k==='point'){P.armN=[88,2]}
  else if(k==='shrug'){P.armN=[40,50];P.armF=[40,50];P.bob-=4}
  else if(k==='scared'){if(inside){P.armN=[120+Math.sin(t*30)*6,30];P.armF=[120,30];P.lean=-8;P.bob+=Math.sin(t*40)*1.5}}
  else if(k==='fall'){const k2=ease(clamp(u*1.6));P.rot=(P.face>0?-1:1)*-88*k2*(pa&&pa.dir||1)*(A.fallDir||1);P.y+=0;P.armN=[130*k2,20];P.armF=[110*k2,20]}
  else if(k==='flinch'){if(inside){P.lean=-18*Math.sin(u*Math.PI);P.x-=P.face*10*Math.sin(u*Math.PI)}}
  else if(k==='nod'){if(inside)P.tilt+=Math.sin(u*Math.PI*2)*8}
  else if(k==='hold'){P.prop=pa.prop}
  else if(k==='drop'){}
 }
 if(A.hold&&!P.prop)P.prop=A.hold;
 return P}

ST.line=4.5;

// ===== REMAIN CALM cast =====
CH.mimi={f:1,skin:'#e8b896',shirt:'#2fa86a',acc:'#1f7a4a',hair:'bun',hc:'#7a2a1a',pants:'#2a2e3a',h:1,w:.95,tag:1};
CH.gus={f:1,skin:'#c8946a',shirt:'#2a3a5a',acc:'#1a2a4a',hair:'cap',hc:'#1a2a4a',mustache:'#3a2a1a',pants:'#1a2030',h:1.1,w:1.3};
CH.vance={f:1,skin:'#8a5a3c',shirt:'#b89a62',acc:'#8a7040',hair:'grey',hc:'#a8a8a8',glasses:1,beard:'#a8a8a8',pants:'#3a4a5a',h:1.0,w:1.0};
CH.teddy={f:1,skin:'#e0b088',shirt:'#e84a4a',acc:'#b02a2a',hair:'messy',hc:'#4a2a14',pants:'#2a3a6a',h:.72,w:.8};
CH.rosa={f:1,skin:'#c8906a',shirt:'#8a4aa8',acc:'#6a2a88',hair:'bun',hc:'#2a1a14',pants:'#3a3040',h:.95,w:1.0};
CH.lou={f:1,skin:'#d8a07a',shirt:'#d83a2a',acc:'#a82018',hair:'bald',mustache:'#3a2a1a',pants:'#2a2a30',h:1.15,w:1.45};
CH.pip={f:1,skin:'#e8c8a0',shirt:'#3ab8d8',acc:'#1a88a8',hair:'messy',hc:'#e84aa0',pants:'#2a2e44',h:.92,w:.9};
CH.kim={f:1,skin:'#e0b890',shirt:'#ececE4',acc:'#c8c8c0',hair:'slick',hc:'#1a1a1a',glasses:1,pants:'#2a3040',h:.95,w:1.0};
CH.carrot={f:1,z:1,carrot:1,skin:'#9ab88a',h:1.0,w:1.2};
// ===== REALISTIC, SCARY ZOMBIES (gritty illustrated, 2D sprite lit like the 3D set) =====
function vein(c,x,y,len,ang,seed){c.strokeStyle='rgba(90,40,90,.55)';c.lineWidth=1.6;c.beginPath();c.moveTo(x,y);let px=x,py=y,a=ang;for(let i=0;i<5;i++){a+=(rnd(seed+i)-.5)*1.1;px+=Math.cos(a)*len/5;py+=Math.sin(a)*len/5;c.lineTo(px,py)}c.stroke()}
function speck(c,cx,cy,rx,ry,n,seed,col){c.fillStyle=col;for(let i=0;i<n;i++){const a=rnd(seed+i)*6.283,r=Math.sqrt(rnd(seed+i*3+1));c.globalAlpha=.12+rnd(seed+i*5)*.25;c.beginPath();c.arc(cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r,.8+rnd(seed+i*7)*2.2,0,7);c.fill()}c.globalAlpha=1}
function realHead(c,seed,t,jaw,look){ // origin = head centre, ~ 52 wide x 66 tall
 c.save();const RX=47,RY=62;
 // neck
 let g=c.createLinearGradient(-20,0,20,0);g.addColorStop(0,'#3e4638');g.addColorStop(.5,'#72806a');g.addColorStop(1,'#4a5442');c.fillStyle=g;c.beginPath();c.moveTo(-22,40);c.lineTo(-17,92);c.lineTo(17,92);c.lineTo(22,40);c.closePath();c.fill();
 // jaw (lower, hangs open)
 const jd=8+jaw*20;g=c.createLinearGradient(0,30,0,70+jd);g.addColorStop(0,'#6a7862');g.addColorStop(1,'#3a4234');c.fillStyle=g;c.strokeStyle='rgba(0,0,0,.65)';c.lineWidth=2;c.beginPath();c.moveTo(-32,34);c.quadraticCurveTo(-30,64+jd,0,76+jd);c.quadraticCurveTo(30,64+jd,32,34);c.closePath();c.fill();c.stroke();
 // mouth interior
 g=c.createRadialGradient(0,42,2,0,46,36);g.addColorStop(0,'#120404');g.addColorStop(1,'#3a0c0c');c.fillStyle=g;c.beginPath();c.moveTo(-28,36);c.quadraticCurveTo(0,28,28,36);c.quadraticCurveTo(22,58+jd,0,60+jd);c.quadraticCurveTo(-22,58+jd,-28,36);c.fill();
 // lower teeth
 c.fillStyle='#c8b878';for(let i=-3;i<=3;i++){const h=5+rnd(seed+i+20)*6;c.fillRect(i*7-3,44+jd*.7-h*.2,5,h)}
 // skull / face
 g=c.createRadialGradient(-12,-18,6,0,0,70);g.addColorStop(0,'#92a082');g.addColorStop(.55,'#6c7a62');g.addColorStop(1,'#3a4434');c.fillStyle=g;c.strokeStyle='rgba(0,0,0,.7)';c.lineWidth=2.2;c.beginPath();c.ellipse(0,0,RX,RY,0,0,7);c.fill();c.stroke();
 // mottling + bruises
 speck(c,0,-4,RX*.95,RY*.95,90,seed,'#2a3224');speck(c,10,6,RX*.6,RY*.6,40,seed+50,'#6a3a58');
 c.fillStyle='rgba(60,18,40,.32)';c.beginPath();c.ellipse(-22,10,16,22,.3,0,7);c.fill();
 // hollow cheeks
 for(const sx of[-1,1]){g=c.createRadialGradient(sx*26,22,2,sx*26,22,26);g.addColorStop(0,'rgba(10,14,8,.62)');g.addColorStop(1,'rgba(10,14,8,0)');c.fillStyle=g;c.beginPath();c.ellipse(sx*26,22,24,30,0,0,7);c.fill()}
 // eye sockets
 for(const sx of[-1,1]){g=c.createRadialGradient(sx*19,-8,2,sx*19,-8,20);g.addColorStop(0,'#0c0606');g.addColorStop(.7,'rgba(20,10,12,.88)');g.addColorStop(1,'rgba(20,10,12,0)');c.fillStyle=g;c.beginPath();c.ellipse(sx*19,-8,19,17,0,0,7);c.fill()}
 // eyes: left clouded, right bloodshot
 c.fillStyle='#d8d4bc';c.beginPath();c.ellipse(-19,-8,9,8,0,0,7);c.fill();c.fillStyle='#9a9a98';c.beginPath();c.arc(-19+look*2,-8,4.2,0,7);c.fill();c.fillStyle='#1a1a1a';c.beginPath();c.arc(-19+look*2,-8,1.6,0,7);c.fill();
 c.fillStyle='#e8d8a0';c.beginPath();c.ellipse(19,-8,9.5,8.5,0,0,7);c.fill();c.strokeStyle='rgba(190,20,20,.8)';c.lineWidth=1.2;for(let i=0;i<9;i++){const a=i*.7+rnd(seed+i);c.beginPath();c.moveTo(19+Math.cos(a)*9,-8+Math.sin(a)*8);c.lineTo(19+Math.cos(a)*4,-8+Math.sin(a)*3.5);c.stroke()}c.fillStyle='#a01810';c.beginPath();c.arc(19+look*2,-8,4.6,0,7);c.fill();c.fillStyle='#050202';c.beginPath();c.arc(19+look*2,-8,2,0,7);c.fill();
 vein(c,-30,-14,26,.4,seed+3);vein(c,30,-12,24,2.6,seed+8);vein(c,-8,-34,22,1.6,seed+13);
 // brow ridge shadow
 c.strokeStyle='rgba(8,8,6,.7)';c.lineWidth=3;c.beginPath();c.moveTo(-30,-20);c.quadraticCurveTo(-18,-28,-6,-20);c.moveTo(6,-20);c.quadraticCurveTo(18,-28,30,-18);c.stroke();
 // nose: collapsed, dark slits
 c.fillStyle='rgba(10,6,6,.85)';c.beginPath();c.ellipse(-5,14,3,6,.3,0,7);c.fill();c.beginPath();c.ellipse(5,14,3,6,-.3,0,7);c.fill();c.strokeStyle='rgba(20,12,10,.7)';c.lineWidth=2;c.beginPath();c.moveTo(0,-2);c.lineTo(0,10);c.stroke();
 // upper lip + teeth
 c.fillStyle='#5a1a18';c.beginPath();c.moveTo(-30,30);c.quadraticCurveTo(0,20,30,30);c.quadraticCurveTo(0,38,-30,30);c.fill();c.fillStyle='#d6c884';for(let i=-4;i<=4;i++){const h=7+rnd(seed+i+40)*7;c.beginPath();c.moveTo(i*6.4-3,31);c.lineTo(i*6.4+3,31);c.lineTo(i*6.4+1.5,31+h);c.lineTo(i*6.4-2,31+h*.8);c.closePath();c.fill()}
 c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=1;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*6.4+3,31);c.lineTo(i*6.4+2,38);c.stroke()}
 // blood from mouth
 c.fillStyle='rgba(120,10,12,.9)';c.beginPath();c.moveTo(14,40);c.quadraticCurveTo(22,70+jd,16,100);c.quadraticCurveTo(12,70+jd,8,44);c.fill();c.beginPath();c.moveTo(-18,42);c.quadraticCurveTo(-24,64+jd,-20,84);c.quadraticCurveTo(-14,62+jd,-10,44);c.fill();
 // scalp: thin hair, exposed patch
 c.fillStyle='#2a2218';for(let i=0;i<14;i++){const a=Math.PI+i*.2-.4;c.beginPath();c.moveTo(Math.cos(a)*40,Math.sin(a)*54-6);c.quadraticCurveTo(Math.cos(a)*52,Math.sin(a)*64+10,Math.cos(a)*44+(rnd(seed+i)-.5)*8,Math.sin(a)*50+26+rnd(seed+i+3)*10);c.quadraticCurveTo(Math.cos(a)*44,Math.sin(a)*52,Math.cos(a)*40,Math.sin(a)*54-6);c.fill()}
 c.fillStyle='#7a2a2a';c.beginPath();c.moveTo(8,-52);c.lineTo(26,-44);c.lineTo(20,-34);c.lineTo(10,-38);c.closePath();c.fill();c.fillStyle='rgba(200,120,110,.55)';c.beginPath();c.ellipse(16,-42,4,2,0,0,7);c.fill();
 c.restore()}
function drawRealZombie(c,A,P,t){const ch=CH[A.who],S=P.s*ch.h;c.save();c.translate(P.x,P.y);c.scale(S*1.02,S*1.02);const seed=ch.seed||1,ph=seed*1.7+(P.x||0)*.01;
 c.save();c.scale(1,.18);c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.arc(0,0,66,0,7);c.fill();c.restore();
 const sway=Math.sin(t*1.1+ph)*5,hunch=ch.hunch||10,tilt=Math.sin(t*.9+ph)*6+(ch.tilt||8);
 // legs
 for(const sx of[-1,1]){let g=c.createLinearGradient(sx*20-14,0,sx*20+14,0);g.addColorStop(0,'#1a1c22');g.addColorStop(.5,'#3a3e4a');g.addColorStop(1,'#14161c');c.fillStyle=g;c.strokeStyle='rgba(0,0,0,.7)';c.lineWidth=2;const kx=sx*(18+Math.sin(t*1.3+ph+sx)*3);c.beginPath();c.moveTo(sx*10-6,-104);c.lineTo(sx*10+12,-104);c.lineTo(kx+12,-44);c.lineTo(sx*26+10,-6);c.lineTo(sx*26-12,-6);c.lineTo(kx-10,-44);c.closePath();c.fill();c.stroke();c.fillStyle='#14100e';c.beginPath();c.ellipse(sx*26-1,-3,16,6,0,0,7);c.fill();
  c.strokeStyle='rgba(120,10,12,.6)';c.lineWidth=2;c.beginPath();c.moveTo(kx-6,-70);c.lineTo(kx+4,-52);c.stroke()}
 // torso + shirt
 c.save();c.translate(sway,-104);c.rotate(hunch*.01);
 let g=c.createLinearGradient(-36,0,36,0);g.addColorStop(0,ch.shirt0||'#2a2e34');g.addColorStop(.5,ch.shirt1||'#4a525c');g.addColorStop(1,ch.shirt0||'#2a2e34');c.fillStyle=g;c.strokeStyle='rgba(0,0,0,.75)';c.lineWidth=2.2;c.beginPath();c.moveTo(-34,-6);c.quadraticCurveTo(-42,-80,-30,-112);c.lineTo(30,-112);c.quadraticCurveTo(42,-80,34,-6);c.lineTo(22,4);c.lineTo(12,-4);c.lineTo(2,6);c.lineTo(-10,-3);c.lineTo(-22,5);c.closePath();c.fill();c.stroke();
 speck(c,0,-60,34,52,70,seed+90,'#0a0a0a');
 // tears + exposed skin + blood
 c.fillStyle='#6c7a62';c.beginPath();c.moveTo(-24,-70);c.lineTo(-6,-80);c.lineTo(-12,-52);c.lineTo(-28,-56);c.closePath();c.fill();c.fillStyle='#7a1214';c.beginPath();c.moveTo(-20,-72);c.lineTo(-8,-76);c.lineTo(-14,-58);c.lineTo(-24,-62);c.closePath();c.fill();
 g=c.createRadialGradient(14,-40,2,14,-40,26);g.addColorStop(0,'rgba(130,12,14,.95)');g.addColorStop(1,'rgba(130,12,14,0)');c.fillStyle=g;c.beginPath();c.ellipse(14,-40,24,30,0,0,7);c.fill();
 c.fillStyle='rgba(110,10,12,.85)';c.beginPath();c.moveTo(18,-18);c.lineTo(22,6);c.lineTo(15,-6);c.lineTo(12,-14);c.fill();
 c.restore();
 // arms: long, reaching
 for(const sx of[-1,1]){c.save();c.translate(sx*38+sway,-208);const a=(sx>0?.45:-.4)+Math.sin(t*1.8+ph+sx)*.1;c.rotate(a*sx*-1+ (sx>0?-.25:.25));
  g=c.createLinearGradient(-9,0,9,0);g.addColorStop(0,'#5a6652');g.addColorStop(1,'#7a8870');c.fillStyle=g;c.strokeStyle='rgba(0,0,0,.7)';c.lineWidth=2;c.beginPath();c.moveTo(-9,0);c.lineTo(9,0);c.lineTo(7,70);c.lineTo(-6,70);c.closePath();c.fill();c.stroke();
  c.fillStyle=ch.shirt0||'#2a2e34';c.beginPath();c.moveTo(-11,-2);c.lineTo(11,-2);c.lineTo(9,24);c.lineTo(2,18);c.lineTo(-3,28);c.lineTo(-9,20);c.closePath();c.fill();
  c.translate(0,70);c.rotate(-.35*sx+Math.sin(t*2.2+ph)*.12);g=c.createLinearGradient(-7,0,7,0);g.addColorStop(0,'#566048');g.addColorStop(1,'#7a8870');c.fillStyle=g;c.beginPath();c.moveTo(-7,0);c.lineTo(7,0);c.lineTo(5,62);c.lineTo(-4,62);c.closePath();c.fill();c.stroke();vein(c,0,6,40,1.5,seed+sx*7);
  // hand: long fingers
  c.translate(0,62);c.fillStyle='#6a7862';c.beginPath();c.ellipse(0,6,8,10,0,0,7);c.fill();c.stroke();for(let f=-2;f<=2;f++){c.strokeStyle='#5a6652';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(f*3.4,12);c.lineTo(f*5.4+Math.sin(t*3+f+ph)*2,28);c.lineTo(f*6.6+Math.sin(t*3+f+ph)*3,38);c.stroke();c.strokeStyle='#1a1410';c.lineWidth=2.2;c.beginPath();c.moveTo(f*6.4,36);c.lineTo(f*6.8+Math.sin(t*3+f+ph)*3,41);c.stroke()}
  c.restore()}
 // head
 c.save();c.translate(sway*1.4,-228);c.rotate(tilt*.0175);c.scale(.82,.82);realHead(c,seed,t,P.jaw==null?(.35+Math.abs(Math.sin(t*1.6+ph))*.65):P.jaw,P.look||Math.sin(t*.7+ph));c.restore();
 c.restore()}
// zombie variants (scary)
CH.zr1={f:1,zr:1,seed:3,h:1.0,w:1,shirt0:'#2a2e34',shirt1:'#4a525c',hunch:12,tilt:10};
CH.zr2={f:1,zr:1,seed:7,h:1.04,w:1,shirt0:'#3a2424',shirt1:'#6a4a4a',hunch:16,tilt:-8};
CH.zr3={f:1,zr:1,seed:11,h:.96,w:1,shirt0:'#24303a',shirt1:'#4a6070',hunch:8,tilt:14};
CH.zr4={f:1,zr:1,seed:17,h:1.08,w:1,shirt0:'#303a24',shirt1:'#5a6a40',hunch:18,tilt:-12};
// ===== SEMI-REALISTIC HUMANS (7.5-head proportions, shaded, expressive) =====
function lg(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach(s=>g.addColorStop(s[0],s[1]));return g}
function rgrad(c,x,y,r0,r1,stops){const g=c.createRadialGradient(x,y,r0,x,y,r1);stops.forEach(s=>g.addColorStop(s[0],s[1]));return g}
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const f=k<0?0:255,p=Math.abs(k);r=Math.round(r+(f-r)*p);g=Math.round(g+(f-g)*p);b=Math.round(b+(f-b)*p);return 'rgb('+r+','+g+','+b+')'}
function humanHead(c,ch,P,t,u){ // origin = head centre; u = head height unit
 const e=P.expr||'calm',open=P.mouth||0,blink=((t*.63+(P.x||0)*.011)%4.4)>4.28?.12:1,look=P.look||0;
 const hw=u*.40,hh=u*.50,sk=ch.skin;
 const ex={scared:{op:1.35,br:[-5,-1],inn:-9,mo:'o'},shock:{op:1.4,br:[-6,-2],inn:-10,mo:'o'},worried:{op:1.05,br:[-2,2],inn:-6,mo:'frown'},angry:{op:.78,br:[3,6],inn:4,mo:'grit'},smile:{op:.85,br:[0,0],inn:0,mo:'smile'},sad:{op:.9,br:[-1,3],inn:-5,mo:'frown'},smug:{op:.72,br:[2,-2],inn:0,mo:'smirk'},tired:{op:.6,br:[1,2],inn:0,mo:'flat'},calm:{op:1,br:[0,0],inn:0,mo:'flat'}}[e]||{op:1,br:[0,0],inn:0,mo:'flat'};
 // neck shadow & ears
 c.fillStyle=shade(sk,-.12);c.beginPath();c.ellipse(-hw*.98,u*.04,u*.07,u*.12,0,0,7);c.ellipse(hw*.98,u*.04,u*.07,u*.12,0,0,7);c.fill();
 // head shape: skull + jaw
 c.fillStyle=rgrad(c,-hw*.35,-hh*.35,u*.05,hh*1.4,[[0,shade(sk,.22)],[.55,sk],[1,shade(sk,-.28)]]);c.strokeStyle='rgba(30,16,10,.55)';c.lineWidth=1.6;
 c.beginPath();c.moveTo(0,-hh);c.bezierCurveTo(hw*1.02,-hh,hw*1.04,-hh*.1,hw*.96,hh*.12);c.bezierCurveTo(hw*.9,hh*.6,hw*.5,hh*1.02,0,hh*1.03);c.bezierCurveTo(-hw*.5,hh*1.02,-hw*.9,hh*.6,-hw*.96,hh*.12);c.bezierCurveTo(-hw*1.04,-hh*.1,-hw*1.02,-hh,0,-hh);c.closePath();c.fill();c.stroke();
 // cheek blush + jaw shadow
 c.fillStyle='rgba(200,90,80,.10)';c.beginPath();c.ellipse(-hw*.55,hh*.28,u*.13,u*.09,0,0,7);c.ellipse(hw*.55,hh*.28,u*.13,u*.09,0,0,7);c.fill();
 
 // eyes
 const ey=-hh*.06,ed=hw*.5,ew=u*.115,eh=u*.075*ex.op*blink;
 for(const sx of[-1,1]){const x0=sx*ed;
  c.fillStyle='rgba(90,50,40,.10)';c.beginPath();c.ellipse(x0,ey-eh*.2,ew*1.3,eh*1.9,0,0,7);c.fill();                // socket shadow
  c.fillStyle='#f4f0ea';c.beginPath();c.moveTo(x0-ew,ey);c.quadraticCurveTo(x0,ey-eh*2.0,x0+ew,ey+eh*.1);c.quadraticCurveTo(x0,ey+eh*1.5,x0-ew,ey);c.closePath();c.fill();c.strokeStyle='rgba(20,10,8,.8)';c.lineWidth=1.3;c.stroke();
  if(blink>.4){const ix=x0+look*ew*.35,ir=Math.min(ew*.68,eh*1.5+1);c.save();c.beginPath();c.moveTo(x0-ew,ey);c.quadraticCurveTo(x0,ey-eh*2.0,x0+ew,ey+eh*.1);c.quadraticCurveTo(x0,ey+eh*1.5,x0-ew,ey);c.closePath();c.clip();
   c.fillStyle=rgrad(c,ix,ey,ir*.1,ir,[[0,ch.iris0||'#6a4a2a'],[.7,ch.iris||'#3a2a1a'],[1,'#120a06']]);c.beginPath();c.arc(ix,ey-eh*.05,ir,0,7);c.fill();c.fillStyle='#050302';c.beginPath();c.arc(ix,ey-eh*.05,ir*.42,0,7);c.fill();c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.arc(ix-ir*.3,ey-eh*.35,ir*.22,0,7);c.fill();c.restore()}
  // upper lid + lashes
  c.strokeStyle='rgba(30,16,12,.9)';c.lineWidth=1.8;c.beginPath();c.moveTo(x0-ew*1.05,ey+eh*.05);c.quadraticCurveTo(x0,ey-eh*2.1,x0+ew*1.05,ey+eh*.12);c.stroke();
  if(ch.lash){c.lineWidth=1.6;for(let i=0;i<4;i++){const a=-2.5+i*.35;c.beginPath();c.moveTo(x0+Math.cos(a)*ew*.9,ey+Math.sin(a)*eh*1.5);c.lineTo(x0+Math.cos(a)*ew*1.12,ey+Math.sin(a)*eh*2.2-1);c.stroke()}}
  // brows
  const bi=ex.inn,bo=ex.br[0],by=ey-u*.17;c.fillStyle=ch.hc||'#2a1a12';c.beginPath();const bx0=x0-sx*ew*1.15,bx1=x0+sx*ew*1.25;
  c.moveTo(x0-sx*ew*1.15,by+bi*.4);c.quadraticCurveTo(x0,by-u*.05+(bi+bo)*.2,x0+sx*ew*1.2,by+bo*.4+ex.br[1]*.3);c.lineTo(x0+sx*ew*1.2,by+bo*.4+ex.br[1]*.3+(ch.thick||u*.035));c.quadraticCurveTo(x0,by-u*.02+(bi+bo)*.2+(ch.thick||u*.035),x0-sx*ew*1.15,by+bi*.4+(ch.thick||u*.035));c.closePath();c.fill()}
 // nose
 c.strokeStyle='rgba(60,30,20,.5)';c.lineWidth=1.6;c.beginPath();c.moveTo(-u*.035,-hh*.05);c.quadraticCurveTo(-u*.055,hh*.22,-u*.07,hh*.3);c.moveTo(u*.035,-hh*.05);c.quadraticCurveTo(u*.055,hh*.22,u*.07,hh*.3);c.stroke();
 c.fillStyle=rgrad(c,-u*.02,hh*.26,u*.01,u*.1,[[0,shade(sk,.2)],[1,sk]]);c.beginPath();c.ellipse(0,hh*.28,u*.075,u*.055,0,0,7);c.fill();c.fillStyle='rgba(30,12,8,.7)';c.beginPath();c.ellipse(-u*.04,hh*.34,u*.02,u*.012,.3,0,7);c.ellipse(u*.04,hh*.34,u*.02,u*.012,-.3,0,7);c.fill();
 // mouth
 const my=hh*.62,mw=u*.16;const lipc=ch.lip||'#a85048';
 if(open>.12||ex.mo==='o'){const o=Math.max(open,ex.mo==='o'?.5:0);c.fillStyle='#2a0a0a';c.beginPath();c.moveTo(-mw,my);c.quadraticCurveTo(0,my-u*.04,mw,my);c.quadraticCurveTo(mw*.85,my+u*.05+o*u*.14,0,my+u*.06+o*u*.17);c.quadraticCurveTo(-mw*.85,my+u*.05+o*u*.14,-mw,my);c.fill();
  c.fillStyle='#f0ece4';c.beginPath();c.moveTo(-mw*.8,my+u*.005);c.quadraticCurveTo(0,my-u*.02,mw*.8,my+u*.005);c.lineTo(mw*.8,my+u*.03);c.quadraticCurveTo(0,my+u*.015,-mw*.8,my+u*.03);c.fill();c.fillStyle='#b04a50';c.beginPath();c.ellipse(0,my+u*.06+o*u*.1,mw*.5,u*.03+o*u*.03,0,0,7);c.fill();
  c.strokeStyle=lipc;c.lineWidth=3;c.beginPath();c.moveTo(-mw,my);c.quadraticCurveTo(0,my-u*.05,mw,my);c.stroke();c.beginPath();c.moveTo(-mw*.9,my+u*.01);c.quadraticCurveTo(0,my+u*.09+o*u*.18,mw*.9,my+u*.01);c.stroke()}
 else if(ex.mo==='smile'||ex.mo==='smirk'){const sm=ex.mo==='smile'?1:.6;c.fillStyle='#f4f0e8';c.beginPath();c.moveTo(-mw*.9,my-u*.01);c.quadraticCurveTo(0,my+u*.09*sm,mw*.9*(ex.mo==='smirk'?1.15:1),my-u*.03*sm);c.quadraticCurveTo(0,my-u*.02,-mw*.9,my-u*.01);c.fill();c.strokeStyle=lipc;c.lineWidth=3;c.beginPath();c.moveTo(-mw,my-u*.01);c.quadraticCurveTo(0,my+u*.11*sm,mw,my-u*.035*sm);c.stroke();c.strokeStyle='rgba(120,50,40,.5)';c.lineWidth=1.4;c.beginPath();c.moveTo(-mw*1.05,my-u*.01);c.lineTo(-mw*1.18,my-u*.04);c.moveTo(mw*1.05,my-u*.035);c.lineTo(mw*1.2,my-u*.07);c.stroke()}
 else if(ex.mo==='frown'){c.strokeStyle=lipc;c.lineWidth=3;c.beginPath();c.moveTo(-mw,my+u*.03);c.quadraticCurveTo(0,my-u*.04,mw,my+u*.03);c.stroke();c.fillStyle='rgba(160,70,64,.8)';c.beginPath();c.ellipse(0,my+u*.045,mw*.7,u*.018,0,0,7);c.fill()}
 else if(ex.mo==='grit'){c.fillStyle='#f0ece4';c.fillRect(-mw*.8,my-u*.02,mw*1.6,u*.06);c.strokeStyle='rgba(60,30,24,.6)';c.lineWidth=1;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*mw*.25,my-u*.02);c.lineTo(i*mw*.25,my+u*.04);c.stroke()}c.strokeStyle=lipc;c.lineWidth=3;c.strokeRect(-mw*.85,my-u*.03,mw*1.7,u*.075)}
 else{c.strokeStyle=lipc;c.lineWidth=3;c.beginPath();c.moveTo(-mw*.9,my);c.quadraticCurveTo(0,my+u*.012,mw*.9,my);c.stroke();c.fillStyle='rgba(170,80,70,.55)';c.beginPath();c.ellipse(0,my+u*.032,mw*.62,u*.02,0,0,7);c.fill()}
 // facial hair
 if(ch.stache){c.fillStyle=ch.stache;c.beginPath();c.moveTo(0,my-u*.075);c.quadraticCurveTo(-u*.17,my-u*.09,-u*.21,my-u*.01);c.quadraticCurveTo(-u*.1,my-u*.03,0,my-u*.04);c.quadraticCurveTo(u*.1,my-u*.03,u*.21,my-u*.01);c.quadraticCurveTo(u*.17,my-u*.09,0,my-u*.075);c.fill()}
 if(ch.beard){c.fillStyle=ch.beard;c.globalAlpha=.9;c.beginPath();c.moveTo(-hw*.95,hh*.2);c.bezierCurveTo(-hw*.9,hh*1.0,-hw*.3,hh*1.2,0,hh*1.2);c.bezierCurveTo(hw*.3,hh*1.2,hw*.9,hh*1.0,hw*.95,hh*.2);c.bezierCurveTo(hw*.6,hh*.55,hw*.3,hh*.5,0,hh*.52);c.bezierCurveTo(-hw*.3,hh*.5,-hw*.6,hh*.55,-hw*.95,hh*.2);c.fill();c.globalAlpha=1}
 if(ch.stubble){c.fillStyle=rgrad(c,0,hh*.7,u*.05,hh*.8,[[0,'rgba(30,20,14,.34)'],[1,'rgba(30,20,14,0)']]);c.beginPath();c.ellipse(0,hh*.7,hw*.85,hh*.4,0,0,7);c.fill()}
 // glasses
 if(ch.glasses){c.strokeStyle='rgba(20,14,10,.95)';c.lineWidth=2.4;for(const sx of[-1,1]){c.beginPath();c.ellipse(sx*ed,ey,ew*1.45,eh*1.5+u*.05,0,0,7);c.stroke();c.fillStyle='rgba(180,210,230,.12)';c.fill()}c.beginPath();c.moveTo(-ed+ew*1.45,ey);c.lineTo(ed-ew*1.45,ey);c.stroke()}
 // hair
 const hc=ch.hc||'#2a1a12';c.fillStyle=lg(c,0,-hh*1.2,0,hh*.2,[[0,shade(hc,.25)],[.6,hc],[1,shade(hc,-.3)]]);c.strokeStyle='rgba(0,0,0,.5)';c.lineWidth=1.4;
 const hs=ch.hair;
 if(hs==='bun'){c.beginPath();c.moveTo(-hw*1.05,hh*.05);c.bezierCurveTo(-hw*1.15,-hh*1.0,hw*1.15,-hh*1.1,hw*1.05,hh*.05);c.bezierCurveTo(hw*.8,-hh*.5,hw*.3,-hh*.78,-hw*.1,-hh*.72);c.bezierCurveTo(-hw*.5,-hh*.62,-hw*.85,-hh*.3,-hw*1.05,hh*.05);c.fill();c.stroke();c.beginPath();c.arc(-hw*.05,-hh*1.12,u*.2,0,7);c.fill();c.stroke();c.strokeStyle='rgba(255,230,200,.22)';c.lineWidth=2;c.beginPath();c.moveTo(-hw*.7,-hh*.62);c.quadraticCurveTo(0,-hh*1.0,hw*.7,-hh*.55);c.stroke()}
 else if(hs==='messy'){c.beginPath();c.moveTo(-hw*1.08,hh*.1);for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8;c.lineTo(Math.cos(a)*hw*1.2,Math.sin(a)*hh*1.18-(i%2?u*.07:0))}c.lineTo(hw*1.08,hh*.1);c.bezierCurveTo(hw*.8,-hh*.4,hw*.3,-hh*.55,-hw*.1,-hh*.5);c.bezierCurveTo(-hw*.6,-hh*.45,-hw*.95,-hh*.2,-hw*1.08,hh*.1);c.fill();c.stroke()}
 else if(hs==='cap'){c.fillStyle=lg(c,0,-hh*1.1,0,-hh*.1,[[0,shade(hc,.18)],[1,hc]]);c.beginPath();c.moveTo(-hw*1.08,-hh*.34);c.bezierCurveTo(-hw*1.1,-hh*1.2,hw*1.1,-hh*1.2,hw*1.08,-hh*.34);c.lineTo(hw*1.08,-hh*.3);c.lineTo(-hw*1.08,-hh*.3);c.closePath();c.fill();c.stroke();c.fillStyle=shade(hc,-.15);c.beginPath();c.moveTo(-hw*1.0,-hh*.32);c.lineTo(hw*1.0,-hh*.32);c.lineTo(hw*1.25,-hh*.22);c.quadraticCurveTo(0,-hh*.14,-hw*1.25,-hh*.22);c.closePath();c.fill();c.stroke();c.fillStyle='rgba(230,200,90,.95)';c.beginPath();c.arc(0,-hh*.78,u*.05,0,7);c.fill()}
 else if(hs==='grey'){c.beginPath();c.moveTo(-hw*1.04,hh*.02);c.bezierCurveTo(-hw*1.1,-hh*.95,hw*1.1,-hh*.95,hw*1.04,hh*.02);c.bezierCurveTo(hw*.85,-hh*.42,hw*.3,-hh*.6,-hw*.1,-hh*.55);c.bezierCurveTo(-hw*.6,-hh*.5,-hw*.9,-hh*.25,-hw*1.04,hh*.02);c.fill();c.stroke()}
}
function drawHuman(c,A,P,t){const ch=CH[A.who];const k=ch.hk||1,H=340*k,u=H/6.9;
 c.save();c.translate(P.x,P.y);c.scale(P.s*ch.h/1.34,P.s*ch.h/1.34);
 const ph=(P.x||0)*.01+(ch.seed||1);const breathe=Math.sin(t*1.7+ph)*1.4,sway=Math.sin(t*.9+ph)*2.2;
 c.save();c.scale(1,.16);c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.arc(0,0,u*1.5*(ch.w||1),0,7);c.fill();c.restore();
 const sw=u*1.18*(ch.w||1),hipw=u*.95*(ch.w||1),shY=-H*.79,hipY=-H*.49,waistY=-H*.64;
 // legs
 for(const sx of[-1,1]){const x0=sx*hipw*.5,x1=sx*hipw*.62,ya=-H*.03;c.fillStyle=lg(c,x0-u*.3,0,x0+u*.3,0,[[0,shade(ch.pants,-.25)],[.5,ch.pants],[1,shade(ch.pants,-.3)]]);c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=1.6;c.beginPath();c.moveTo(x0-u*.38,hipY);c.lineTo(x0+u*.38,hipY);c.lineTo(x1+u*.24,ya);c.lineTo(x1-u*.26,ya);c.closePath();c.fill();c.stroke();
  c.strokeStyle='rgba(0,0,0,.18)';c.beginPath();c.moveTo(x0,hipY+u*.5);c.lineTo(x1,ya-u*.6);c.stroke();
  c.fillStyle=lg(c,0,-u*.2,0,0,[[0,shade(ch.shoe||'#2a2420',.18)],[1,ch.shoe||'#2a2420']]);c.beginPath();c.moveTo(x1-u*.24,ya);c.lineTo(x1+u*.22,ya);c.quadraticCurveTo(x1+u*.34,0,x1+u*.3,u*.03);c.lineTo(x1-u*.34,u*.03);c.quadraticCurveTo(x1-u*.34,-u*.02,x1-u*.24,ya);c.fill();c.stroke()}
 // torso
 c.save();c.translate(sway,breathe);
 c.fillStyle=lg(c,-sw/2,0,sw/2,0,[[0,shade(ch.shirt,-.3)],[.35,ch.shirt],[.65,shade(ch.shirt,.12)],[1,shade(ch.shirt,-.34)]]);c.strokeStyle='rgba(0,0,0,.6)';c.lineWidth=1.8;
 c.beginPath();c.moveTo(-sw*.5,shY+u*.1);c.quadraticCurveTo(0,shY-u*.1,sw*.5,shY+u*.1);c.quadraticCurveTo(sw*.52,waistY,hipw*.58,hipY+u*.1);c.lineTo(-hipw*.58,hipY+u*.1);c.quadraticCurveTo(-sw*.52,waistY,-sw*.5,shY+u*.1);c.closePath();c.fill();c.stroke();
 c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=1.3;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-hipw*.3+i*u*.2,hipY-u*.3);c.quadraticCurveTo(-hipw*.2+i*u*.2,waistY+u*.4,-hipw*.34+i*u*.28,waistY-u*.2);c.stroke()}
 if(ch.vest){c.fillStyle=ch.vest;c.beginPath();c.moveTo(-sw*.4,shY+u*.12);c.lineTo(-u*.1,shY+u*.08);c.lineTo(-u*.16,hipY);c.lineTo(-hipw*.5,hipY);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(sw*.4,shY+u*.12);c.lineTo(u*.1,shY+u*.08);c.lineTo(u*.16,hipY);c.lineTo(hipw*.5,hipY);c.closePath();c.fill();c.stroke()}
 if(ch.tag){c.fillStyle='#f4f0e0';c.fillRect(-sw*.36,waistY-u*1.2,u*.5,u*.22);c.strokeStyle='#222';c.lineWidth=1;c.strokeRect(-sw*.36,waistY-u*1.2,u*.5,u*.22);c.fillStyle='#222';c.fillRect(-sw*.33,waistY-u*1.14,u*.3,u*.04)}
 if(ch.badge){c.fillStyle='#d8c050';c.beginPath();c.arc(-sw*.3,waistY-u*1.05,u*.1,0,7);c.fill();c.stroke()}
 // collar / neck
 c.fillStyle=lg(c,0,shY-u*.4,0,shY+u*.1,[[0,shade(ch.skin,-.2)],[1,ch.skin]]);c.strokeStyle='rgba(0,0,0,.45)';c.beginPath();c.moveTo(-u*.2,shY-u*.38);c.lineTo(-u*.22,shY+u*.1);c.lineTo(u*.22,shY+u*.1);c.lineTo(u*.2,shY-u*.38);c.closePath();c.fill();c.stroke();
 c.fillStyle=ch.shirt;c.beginPath();c.moveTo(-u*.28,shY+u*.02);c.lineTo(0,shY+u*.3);c.lineTo(u*.28,shY+u*.02);c.lineTo(u*.22,shY-u*.06);c.lineTo(0,shY+u*.14);c.lineTo(-u*.22,shY-u*.06);c.closePath();c.fill();c.stroke();
 // arms
 const talk=(P.mouth||0)>.06;for(const sx of[-1,1]){const side=sx>0?1:0;c.save();c.translate(sx*sw*.5,shY+u*.2);
  let a1=sx*.12,a2=-.35*sx*0-.15;if(side&&talk){a1=sx*.5+Math.sin(t*4.2)*.12;a2=-1.25+Math.sin(t*5.1)*.2}else{a1=sx*.1+Math.sin(t*1.3+ph+sx)*.03;a2=-.12}
  if((P.armLift||0)>0){a1=sx*.9;a2=-1.9}
  c.rotate(a1);const L1=H*.18,L2=H*.15;c.fillStyle=lg(c,-u*.2,0,u*.2,0,[[0,shade(ch.shirt,-.25)],[.5,ch.shirt],[1,shade(ch.shirt,-.3)]]);c.beginPath();c.moveTo(-u*.25,-u*.05);c.lineTo(u*.25,-u*.05);c.lineTo(u*.2,L1);c.lineTo(-u*.2,L1);c.closePath();c.fill();c.stroke();
  c.translate(0,L1);c.rotate(a2*sx);const sl=ch.sleeve==='short'?.3:1;c.fillStyle=ch.sleeve==='short'?lg(c,-u*.16,0,u*.16,0,[[0,shade(ch.skin,-.25)],[.5,ch.skin],[1,shade(ch.skin,-.3)]]):lg(c,-u*.16,0,u*.16,0,[[0,shade(ch.shirt,-.25)],[.5,ch.shirt],[1,shade(ch.shirt,-.3)]]);c.beginPath();c.moveTo(-u*.2,0);c.lineTo(u*.2,0);c.lineTo(u*.14,L2);c.lineTo(-u*.14,L2);c.closePath();c.fill();c.stroke();
  if(ch.sleeve==='short'){c.fillStyle=ch.shirt;c.beginPath();c.moveTo(-u*.2,-L1*.25);c.lineTo(u*.2,-L1*.25);c.lineTo(u*.17,u*.1);c.lineTo(-u*.17,u*.1);c.closePath();c.fill()}
  c.translate(0,L2);c.fillStyle=lg(c,-u*.12,0,u*.12,0,[[0,shade(ch.skin,-.18)],[.5,shade(ch.skin,.08)],[1,shade(ch.skin,-.22)]]);c.beginPath();c.moveTo(-u*.12,0);c.quadraticCurveTo(-u*.17,u*.22,-u*.1,u*.3);c.lineTo(u*.1,u*.3);c.quadraticCurveTo(u*.17,u*.22,u*.12,0);c.closePath();c.fill();c.stroke();
  for(let f=-1.5;f<=1.5;f++){const bend=Math.sin(t*2+f+ph)*.04+(P.armLift?.2:.1);c.save();c.translate(f*u*.065,u*.28);c.rotate(f*.06*sx+bend*sx);c.fillStyle=ch.skin;c.beginPath();c.roundRect(-u*.03,0,u*.06,u*.22,u*.03);c.fill();c.stroke();c.restore()}
  c.restore()}
 // head
 c.save();c.translate(sway*.6,shY-u*.72);c.rotate(((P.tilt||0)+Math.sin(t*.8+ph)*1.4)*.0175);c.scale(1.08,1.08);humanHead(c,ch,P,t,u);c.restore();
 c.restore();c.restore()}
// cast
CH.mimi_hr={f:1,hr:1,seed:2,skin:'#e8b898',shirt:'#2fa86a',pants:'#2a2e3a',shoe:'#1a1a1a',hair:'bun',hc:'#8a3a22',iris:'#4a3a22',iris0:'#7a5a2a',lash:1,lip:'#b04a48',tag:1,h:1,w:.92,hk:.96,sleeve:'short'};
CH.gus_hr={f:1,hr:1,seed:5,skin:'#c8946a',shirt:'#2a3a5a',pants:'#1a2030',shoe:'#0e0e12',hair:'cap',hc:'#1a2a4a',iris:'#2a1a10',iris0:'#4a3a22',stache:'#2a1c12',stubble:1,thick:7,badge:1,h:1,w:1.28,hk:1.07,sleeve:'short'};
CH.teddy_hr={f:1,hr:1,seed:8,skin:'#e8bc94',shirt:'#e84a4a',pants:'#2a3a6a',shoe:'#f0f0f0',hair:'messy',hc:'#5a3418',iris:'#2a5a8a',iris0:'#4a8ac0',lip:'#c05a54',h:1,w:.82,hk:.72};
CH.vance_hr={f:1,hr:1,seed:11,skin:'#8a5a3c',shirt:'#b89a62',pants:'#3a4a5a',shoe:'#2a2018',hair:'grey',hc:'#a8a8a8',iris:'#2a1a10',iris0:'#4a3422',beard:'#a8a8a8',glasses:1,h:1,w:1.0,hk:1.0};

// ===== Last Bus proportions: small round head on a long, thin figure (head ~1/5 of height, legs ~55%), tube limbs, big shoes =====
function drawLB(c,A,P,t){const ch=CH[A.who];if(ch.z||ch.zr||ch.carrot||ch.hr||ch.dog){drawFront(c,A,P,t);return}
 const kid=(ch.h||1)<.8,S=P.s*(kid?1.18:ch.h||1),W=ch.w||1;c.save();c.translate(P.x,P.y);c.scale(S,S);
 const bw=36*W,L=kid?170:236,hipY=-(L+12),shY=hipY-96,R=(kid?62:54)*ST.head,bob=P.bob||0;c.translate(0,bob);
 const hy=shY-36-R*.95+(P.tiltY||0);
 if(ch.hair==='bun'||ch.hair==='whitebun'){c.save();c.translate(0,hy);frontHair(c,ch,R,false);c.restore()}
 // legs + big shoes
 for(const sx of[-1,1]){const lx=sx*bw*.36;rect(c,lx-12,hipY,24,L,ch.pants,OUT,ST.line,11);
  c.fillStyle=ch.shoe||'#2a2420';c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.ellipse(lx+sx*10,-13,34,16,0,Math.PI,0);c.lineTo(lx+sx*10+34,-2);c.quadraticCurveTo(lx+sx*10,6,lx+sx*10-34,-2);c.closePath();c.fill();c.stroke()}
 // torso
 c.fillStyle=ch.shirt;c.strokeStyle=OUT;c.lineWidth=ST.line;c.beginPath();c.moveTo(-bw*.86,hipY+4);c.lineTo(-bw,shY+8);c.quadraticCurveTo(0,shY-14,bw,shY+8);c.lineTo(bw*.86,hipY+4);c.closePath();c.fill();c.stroke();
 if(ch.tag){rect(c,-bw*.62,shY+26,22,13,'#f4f0e0',OUT,3,3)}
 if(ch.badge||ch.stache||ch.mustache){circ(c,-bw*.5,shY+30,8,'#e8c030',3)}
 // arms: thin tubes, skin forearm + sleeve
 const gest=(P.mouth||0)>.08?(.4+(P.mouth||0)*.6):0;
 for(const sx of[-1,1]){const lift=(P.armLift||0)*(sx>0?1:0)+gest*(sx>0?30:10)*(Math.sin(t*7+sx));
  c.save();c.translate(sx*(bw+4),shY+16);c.rotate(sx*(.1+lift*.015));rect(c,-8,0,16,138,ch.skin,OUT,ST.line,8);rect(c,-10,-4,20,52,ch.shirt,OUT,ST.line,9);circ(c,0,146,14,ch.skin,ST.line);c.restore()}
 // neck + head
 rect(c,-9,shY-34,18,34,ch.skin,OUT,ST.line*.8,6);
 c.save();c.translate(0,hy);c.rotate((P.tilt||0)*D*.6);
 frontHair(c,ch,R,false);circ(c,-R,R*.1,R*.2,ch.skin,ST.line);circ(c,R,R*.1,R*.2,ch.skin,ST.line);circ(c,0,0,R,ch.skin,ST.line);
 c.fillStyle='rgba(255,255,255,.12)';c.beginPath();c.ellipse(-R*.38,-R*.42,R*.3,R*.16,-.6,0,7);c.fill();
 frontFace(c,ch,P,t,R);frontHair(c,ch,R,true);c.restore();c.restore()}
