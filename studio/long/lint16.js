// lint16.js [spec] : layout lint on the real 16:9 engine (before/after the render).  CROP / EDGE / BAND / OVERLAP for scene texts, CROP / EDGE / BAND for fx texts.
//   frame 1280x720, caption band y 596-684 (captions are centred at y 648).  Samples every beat at 12 %, 50 % and 92 % of its length.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const name=process.argv[2]||'spec';const spec=JSON.parse(fs.readFileSync(`p/${name}.json`));
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file://'+process.cwd()+'/engine.html?spec='+name);await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.fonts.load('56px RC'));
 const issues=[];
 for(let i=0;i<spec.beats.length;i++){const bt=spec.beats[i];const seen=new Set();
  for(const u of [.12,.5,.92]){const f=Math.round((bt.t[0]+(bt.t[1]-bt.t[0])*u)*30);
   await p.evaluate(f=>window.renderFrame(f),Math.round(bt.t[0]*30)+1);await p.evaluate(f=>window.renderFrame(f),f);
   const T=await p.evaluate(()=>{const out=[];const stage=document.getElementById('stage').getBoundingClientRect();
    const scan=(root,kind)=>root.querySelectorAll('text').forEach(el=>{const txt=el.textContent.trim();if(!txt)return;let op=1,n=el;
      while(n&&n.id!==root.id){const o=n.getAttribute&&n.getAttribute('opacity');if(o!=null)op*=parseFloat(o);if(n.style&&n.style.opacity)op*=parseFloat(n.style.opacity);if(n.style&&n.style.display==='none')op=0;n=n.parentNode}
      if(op<.25||el.getAttribute('data-slide'))return;const r=el.getBoundingClientRect();if(r.width<2)return;if(kind==='cap'&&false)return;out.push({kind,t:txt,x0:r.left-stage.left,x1:r.right-stage.left,y0:r.top-stage.top,y1:r.bottom-stage.top})});
    scan(document.getElementById('sv'),'scene');scan(document.getElementById('fxg'),'fx');scan(document.getElementById('capg'),'cap');return out});
   const add=(k,msg)=>{const key=k+msg;if(!seen.has(key)){seen.add(key);issues.push({beat:i,scene:bt.scene.n+'/'+(bt.scene.p.kind||bt.scene.p.loc||''),level:k,msg})}};
   T.forEach(a=>{
     if(a.x1<=0||a.x0>=1280||a.y1<=0||a.y0>=720)return;
     if(a.kind==='cap'){if(a.x0<30||a.x1>1250)add('CROP',`caption "${a.t.slice(0,30)}" is too wide (x ${a.x0.toFixed(0)}..${a.x1.toFixed(0)})`);return}
     if(a.x0<-1||a.x1>1281||a.y0<-1||a.y1>721)add('CROP',`${a.kind} "${a.t}" is cut by the frame (x ${a.x0.toFixed(0)}..${a.x1.toFixed(0)}, y ${a.y0.toFixed(0)}..${a.y1.toFixed(0)})`);
     else if(a.x0<24||a.x1>1256||a.y0<12)add('EDGE',`${a.kind} "${a.t}" is within 24 px of the edge (x ${a.x0.toFixed(0)}..${a.x1.toFixed(0)}, y ${a.y0.toFixed(0)}..${a.y1.toFixed(0)})`);
     const ov=Math.min(a.y1,684)-Math.max(a.y0,596);if(ov>0.35*(a.y1-a.y0)&&a.t.length>2)add('BAND',`${a.kind} "${a.t}" sits in the caption band (y ${a.y0.toFixed(0)}..${a.y1.toFixed(0)})`)});
   const S=T.filter(a=>a.kind==='scene'&&a.t.length>1);
   for(let x=0;x<S.length;x++)for(let y=x+1;y<S.length;y++){const a=S[x],c=S[y];const w=Math.min(a.x1,c.x1)-Math.max(a.x0,c.x0),h=Math.min(a.y1,c.y1)-Math.max(a.y0,c.y0);
     if(w>0&&h>0&&w*h>0.3*Math.min((a.x1-a.x0)*(a.y1-a.y0),(c.x1-c.x0)*(c.y1-c.y0)))add('OVERLAP',`"${a.t}" overlaps "${c.t}"`)}}}
 await b.close();
 const order={CROP:0,OVERLAP:1,BAND:2,EDGE:3};issues.sort((a,b)=>a.beat-b.beat||order[a.level]-order[b.level]);
 issues.forEach(x=>console.log(`[${x.level.padEnd(7)}] b${String(x.beat).padStart(3,'0')} ${x.scene.padEnd(14)} ${x.msg}`));
 const n=l=>issues.filter(x=>x.level===l).length;console.log(`lint16: ${n('CROP')} CROP, ${n('OVERLAP')} OVERLAP, ${n('BAND')} BAND, ${n('EDGE')} EDGE`);
 process.exit(n('CROP')+n('OVERLAP')?1:0)})();
