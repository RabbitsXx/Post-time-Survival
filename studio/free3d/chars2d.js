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
 if(h==='cap'){c.beginPath();c.arc(0,-R*.18,R*1.02,Math.PI,0);c.lineTo(R*1.0,-R*.2);c.lineTo(-R*1.0,-R*.2);c.closePath();c.fill();c.stroke();c.fillStyle='#8a1f14';c.beginPath();c.moveTo(-R*.15,-R*.2);c.lineTo(R*1.35,-R*.12);c.lineTo(R*1.3,R*.02);c.lineTo(-R*.15,-R*.05);c.fill();c.stroke();return}
 c.beginPath();c.arc(0,-R*.16,R*1.04,Math.PI*1.04,Math.PI*1.96);c.quadraticCurveTo(R*.5,-R*.62,0,-R*.7);c.quadraticCurveTo(-R*.5,-R*.62,-R*.98,-R*.3);c.fill();c.stroke()}
function drawFront(c,A,P,t){const ch=CH[A.who];const S=P.s;c.save();c.translate(P.x,P.y);c.scale(S*ch.h,S*ch.h);
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
