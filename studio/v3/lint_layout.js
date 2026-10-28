// lint_layout.js PART  : finds layout bugs from the real engine, before the render (about 10 s per part)
//   CROP   text partly outside the 720x1280 frame            (the "−17°C cut off", "EAGLE HOT SPRING cropped", "LAST LIGHT clipped" class)
//   EDGE   text closer than 20 px to an edge
//   BAND   text overlapping the caption band (y 742-922)       (captions will land on top of it)
//   OVERLAP two different texts covering each other           (labels on top of labels)
// Samples every beat at 12 %, 50 % and 92 % of its length so growing counters / animated labels are caught.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const part=process.argv[2];const spec=JSON.parse(fs.readFileSync(`../ser/p${part}/spec.json`));
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file://'+process.cwd()+'/master2.html?part='+part);await p.evaluate(()=>document.fonts.ready);
 const issues=[];
 for(let i=0;i<spec.beats.length;i++){const bt=spec.beats[i];if(bt.role==='endcard')continue;const seen=new Set();
  for(const u of [.12,.5,.92]){const f=Math.round((bt.t[0]+(bt.t[1]-bt.t[0])*u)*30);
   await p.evaluate(f=>window.renderFrame(f),Math.round(bt.t[0]*30)+1);await p.evaluate(f=>window.renderFrame(f),f);
   const T=await p.evaluate(()=>{const out=[];document.querySelectorAll('#sv text').forEach(el=>{const txt=el.textContent.trim();if(!txt)return;let op=1,n=el;
     while(n&&n.id!=='sv'){const o=n.getAttribute&&n.getAttribute('opacity');if(o!=null)op*=parseFloat(o);if(n.style&&n.style.opacity)op*=parseFloat(n.style.opacity);if(n.getAttribute&&n.getAttribute('display')==='none')op=0;n=n.parentNode}
     if(op<.25)return;const r=el.getBoundingClientRect();if(r.width<2)return;out.push({t:txt,x0:r.left,x1:r.right,y0:r.top,y1:r.bottom})});return out});
   const add=(k,msg)=>{const key=k+msg;if(!seen.has(key)){seen.add(key);issues.push({beat:i+1,scene:bt.scene.n+'/'+(bt.scene.p.kind||bt.scene.p.mode||bt.scene.p.bg||''),level:k,msg})}};
   T.forEach(a=>{
     if(a.x1<=0||a.x0>=720||a.y1<=0||a.y0>=1280)return;      // completely off-screen = not visible = harmless
     if(a.x0<-1||a.x1>721||a.y0<-1||a.y1>1281)add('CROP',`"${a.t}" is cut by the frame (x ${a.x0.toFixed(0)}..${a.x1.toFixed(0)}, y ${a.y0.toFixed(0)}..${a.y1.toFixed(0)})`);
     else if(a.x0<20||a.x1>700)add('EDGE',`"${a.t}" is within 20 px of the edge (x ${a.x0.toFixed(0)}..${a.x1.toFixed(0)})`);
     const ov=Math.min(a.y1,922)-Math.max(a.y0,742);if(ov>0.35*(a.y1-a.y0)&&a.t.length>1)add('BAND',`"${a.t}" sits in the caption band (y ${a.y0.toFixed(0)}..${a.y1.toFixed(0)})`)});
   for(let x=0;x<T.length;x++)for(let y=x+1;y<T.length;y++){const a=T[x],c=T[y];const w=Math.min(a.x1,c.x1)-Math.max(a.x0,c.x0),h=Math.min(a.y1,c.y1)-Math.max(a.y0,c.y0);
     if(w>0&&h>0&&w*h>0.3*Math.min((a.x1-a.x0)*(a.y1-a.y0),(c.x1-c.x0)*(c.y1-c.y0)))add('OVERLAP',`"${a.t}" overlaps "${c.t}"`)}}}
 await b.close();
 const order={CROP:0,OVERLAP:1,BAND:2,EDGE:3};issues.sort((a,b)=>a.beat-b.beat||order[a.level]-order[b.level]);
 issues.forEach(x=>console.log(`[${x.level.padEnd(7)}] b${String(x.beat).padStart(2,'0')} ${x.scene.padEnd(16)} ${x.msg}`));
 const bad=issues.filter(x=>x.level==='CROP'||x.level==='OVERLAP').length;
 console.log(`lint_layout p${part}: ${issues.filter(x=>x.level==='CROP').length} CROP, ${issues.filter(x=>x.level==='OVERLAP').length} OVERLAP, ${issues.filter(x=>x.level==='BAND').length} BAND, ${issues.filter(x=>x.level==='EDGE').length} EDGE`);
 process.exit(bad?1:0)})();
