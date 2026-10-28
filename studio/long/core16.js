/* ===== core16: runtime for the 16:9 long-form engine =====
   beat = {t:[t0,t1], scene:{n,p}, cam, skin:'real'|'game', caps:[{t:[a,b],h,sp}], fx:[{k,at,dur,...}]}
   renderFrame(f) is ASYNC (game beats are rasterised at 384x216 and shown with image-rendering:pixelated). */
const FPS=30,W16=1280,H16=720;
const BEATS=SPEC.beats;
defs();defsLong();
const $=id=>document.getElementById(id);
const LAY={far:$('far'),mid:$('mid'),near:$('near'),hud:$('hud')};
const FAC={far:.22,mid:1,near:1.5,hud:0},BASE={far:1.07,mid:1.045,near:1.06,hud:1};
const STAGE=$('stage'),SV=$('sv'),PIX=$('pix'),FXG=$('fxg'),CAPG=$('capg');
let curIdx=-1,upd=null,fxs=[],FRAME=0,capKey=null,capEl=null;
function mouth(who){const s=SPEC.mouth&&SPEC.mouth[who];if(!s)return 0;const c=s.charCodeAt(FRAME);return c>=48?(c-48)/9:0}

/* ---- camera ---- */
function camera(kind,u,bt){let dx=0,dy=0,s=1,rot=0,blur=0;const e=u;
 switch(kind){
  case 'static':break;
  case 'push_in':s=1+.06*e;break; case 'pull_out':s=1.07-.07*e;break;
  case 'dolly':s=1+.13*e;break; case 'dolly_out':s=1.13-.13*e;break;
  case 'pan_l':dx=lerp(-26,26,e);s=1.02;break; case 'pan_r':dx=lerp(26,-26,e);s=1.02;break;
  case 'tilt_up':dy=lerp(-14,14,e);s=1.02;break; case 'tilt_down':dy=lerp(14,-14,e);s=1.02;break;
  case 'drift':dx=Math.sin(e*Math.PI)*12;dy=Math.cos(e*2.2)*5;s=1.02+.015*e;break;
  case 'hand':dx=Math.sin(bt*1.7)*5+Math.sin(bt*4.1)*2;dy=Math.cos(bt*1.3)*4+Math.sin(bt*3.3)*1.5;rot=Math.sin(bt*.9)*.25;s=1.035+.02*e;break;   // handheld (real life)
  case 'whip':{const k=Math.max(0,1-bt/.3);dx=90*k*k;blur=5*k;s=1.02+.03*e;break}
  case 'punch':s=1+.03*Math.max(0,1-bt/.3);break;
 }return {dx,dy,s,rot,blur}}
/* fx that move the camera: shake {at,dur,amp}, zoom {at,dur,to,cx,cy,hold|back} */
function fxCam(b,bt){let dx=0,dy=0,zs=1,zx=640,zy=360,rot=0;
 for(const f of b.fx||[]){
  if(f.k==='shake'){const lt=bt-f.at;if(lt>=0&&lt<f.dur){const d=1-lt/f.dur;dx+=Math.sin(lt*70)*f.amp*d;dy+=Math.cos(lt*57)*f.amp*.7*d;rot+=Math.sin(lt*43)*f.amp*.03*d}}
  else if(f.k==='zoom'){const lt=bt-f.at;if(lt>=0){const k=eo(lt/Math.max(.05,f.dur||.14));let z=1+(f.to-1)*k;
    if(f.back!=null&&lt>f.hold){z=1+(f.to-1)*(1-eo((lt-f.hold)/f.back))}zs*=z;zx=f.cx==null?640:f.cx;zy=f.cy==null?360:f.cy}}
 }return {dx,dy,zs,zx,zy,rot}}
const freezeAt=b=>{for(const f of b.fx||[])if(f.k==='freeze')return f.at;return null};

/* ---- scene build / fx build ---- */
function build(i){for(const k in LAY)LAY[k].innerHTML='';FXG.innerHTML='';const b=BEATS[i];
 const Z={};for(const k in LAY)Z[k]=LAY[k];Z.skin=b.skin||'real';
 const sc=b.scene||{n:'blank',p:{}};const fn=LIB[sc.n]||LIB.blank;upd=fn(Z,Object.assign({skin:Z.skin},sc.p||{}));
 fxs=[];for(const f of b.fx||[]){const mk=FX[f.k];if(mk){const g=G(FXG,{});const o=mk(g,f);if(o)fxs.push({f,g,o})}}}

/* ---- captions (overlay, always crisp) ---- */
const CAPST={dex:{fill:'#fff',y:'#ffd23a',r:'#ff4a3a',stroke:'#000'},game:{fill:'#7dffb0',y:'#ffe066',r:'#ff6b5a',stroke:'#02170c'},maya:{fill:'#ffe3f1',y:'#ffd23a',r:'#ff4a3a',stroke:'#2a0a1a'},sys:{fill:'#fff',y:'#ffd23a',r:'#ff4a3a',stroke:'#000'}};
function capHTML(h){const out=[];let col=null;for(const part of h.split(/(<\/?[ry]>)/)){if(part==='<r>')col='r';else if(part==='<y>')col='y';else if(part==='</r>'||part==='</y>')col=null;else if(part)out.push([part,col])}return out}
function drawCap(t,b){
 const c=(b.caps||[]).find(c=>t>=c.t[0]&&t<c.t[1]);const key=c?c.h+'|'+c.t[0]:null;
 if(key!==capKey){capKey=key;CAPG.innerHTML='';capEl=null;
  if(c){const st=CAPST[c.sp||'dex']||CAPST.dex;const g=G(CAPG,{});capEl=g;g._t0=c.t[0];
   const FS=c.sp==='game'?44:54;const parts=capHTML(c.h);
   const txt=E('text',{x:0,y:0,'font-family':c.sp==='game'?'JetBrains Mono, DejaVu Sans Mono, monospace':'RC, Roboto Condensed, Inter, sans-serif','font-weight':c.sp==='game'?800:700,'font-size':FS,'text-anchor':'middle','letter-spacing':c.sp==='game'?1:2,'stroke-linejoin':'round','paint-order':'stroke fill'},g);
   parts.forEach(([s,col],j)=>{const ts=E('tspan',{fill:col?st[col]:st.fill,stroke:st.stroke,'stroke-width':c.sp==='game'?7:11},txt);ts.textContent=(j?'':'')+s});
   // fit width
   const bb=txt.getBBox();const mw=1120;const k=bb.width>mw?mw/bb.width:1;g._k=k;
   if(c.sp==='game'){const r=R(g,bb.x-22,bb.y-8,bb.width+44,bb.height+16,'rgba(2,23,12,.78)',{rx:8,stroke:'#7dffb0','stroke-width':3});g.insertBefore(r,txt)}}}
 if(capEl){const p=clamp((t-capEl._t0)/.14);const k=capEl._k*(.86+.14*eb(p));A(capEl,{opacity:clamp((t-capEl._t0)/.06),transform:`translate(640 ${CAPY}) scale(${k})`})}}
const CAPY=648;

/* ---- game skin: rasterise the svg at 384x216 + posterise + ordered dither ---- */
const PW=384,PH=216,PLV=7,BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const pctx=PIX.getContext('2d',{willReadFrequently:true});
async function pixelate(){
 const xml=new XMLSerializer().serializeToString(SV);
 const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml);await img.decode();
 pctx.imageSmoothingEnabled=true;pctx.clearRect(0,0,PW,PH);pctx.drawImage(img,0,0,PW,PH);
 const d=pctx.getImageData(0,0,PW,PH),a=d.data,L=PLV-1,st=255/L;
 for(let y=0;y<PH;y++)for(let x=0;x<PW;x++){const i=(y*PW+x)*4,th=(BAY[(y&3)*4+(x&3)]/16-.5)*.34;
  for(let c=0;c<3;c++){const v=a[i+c]/st+th;a[i+c]=Math.max(0,Math.min(L,Math.round(v)))*st}}
 pctx.putImageData(d,0,0)}

window.renderFrame=async function(f){
 FRAME=f;const t=f/FPS;let i=0;for(let k=0;k<BEATS.length;k++){if(t>=BEATS[k].t[0]-1e-6)i=k}
 if(i!==curIdx){build(i);curIdx=i}
 const b=BEATS[i],bt0=t-b.t[0],dur=b.t[1]-b.t[0];let bt=bt0;const fz=freezeAt(b);if(fz!=null&&bt0>=fz)bt=fz;
 FRAME=Math.round((b.t[0]+bt)*FPS);
 const u=clamp(bt/dur),c=camera(b.cam||'static',u,bt),fc=fxCam(b,bt0);
 for(const k in LAY){const fa=FAC[k],sc=BASE[k]*(1+(c.s-1)*fa);
  LAY[k].setAttribute('transform',`translate(${fc.zx} ${fc.zy}) scale(${k==='hud'?1:fc.zs}) translate(${-fc.zx} ${-fc.zy}) translate(640 360) translate(${(c.dx+fc.dx)*fa} ${(c.dy+fc.dy)*fa}) rotate(${(c.rot+fc.rot)*fa}) scale(${sc}) translate(-640 -360)`)}
 const game=b.skin==='game';
 let flt=game?'':'saturate(.82) contrast(1.06)';
 if(c.blur>.5)flt+=` blur(${c.blur}px)`;
 if(fz!=null&&bt0>=fz)flt+=' grayscale(1) contrast(1.25) brightness(1.05)';
 for(const f of b.fx||[])if(f.k==='died'&&bt0>=f.at)flt+=` grayscale(${clamp((bt0-f.at)/.6)*.9}) brightness(${1-.35*clamp((bt0-f.at)/.6)})`;
 SV.style.visibility='visible';SV.style.filter=flt;
 upd(u,t,bt);
 for(const x of fxs){const lt=bt0-x.f.at;const vis=lt>=0&&lt<=(x.f.dur==null?1e9:x.f.dur);x.g.style.display=vis?'':'none';if(vis)x.o(lt,bt0,u)}
 drawCap(t,b);
 STAGE.className=game?'game':'real';
 document.documentElement.style.background=b.transparent?'transparent':'#000';document.body.style.background=b.transparent?'transparent':'#000';STAGE.style.background=b.transparent?'transparent':'#000';
 if(game){await pixelate();PIX.style.display='block';SV.style.visibility='hidden'}else{PIX.style.display='none';SV.style.visibility='visible'}
};
window.renderFrame(0);
