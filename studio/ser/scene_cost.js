// scene_cost.js PART : ms/frame (update + screenshot) for every beat of a part
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const part=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});
 await p.goto('file://'+process.cwd()+'/master2.html?part='+part);const spec=JSON.parse(fs.readFileSync(`../ser/p${part}/spec.json`));
 const out=[];for(let i=0;i<spec.beats.length;i++){const b0=spec.beats[i];const f0=Math.round(b0.t[0]*30)+2;const N=12;
  await p.evaluate(f=>window.renderFrame(f),f0);const t0=Date.now();
  for(let k=0;k<N;k++){await p.evaluate(f=>window.renderFrame(f),f0+k+1);await p.screenshot({type:'jpeg',quality:93});}
  out.push([i+1,b0.scene.n+'/'+(b0.scene.p.kind||b0.scene.p.mode||''),(Date.now()-t0)/N]);}
 out.forEach(r=>console.log(`b${String(r[0]).padStart(2,'0')} ${r[1].padEnd(18)} ${r[2].toFixed(0)} ms`));
 const tot=out.reduce((a,r)=>a+r[2]*Math.round((spec.beats[r[0]-1].t[1]-spec.beats[r[0]-1].t[0])*30),0);console.log('estimated single-worker total',(tot/1000).toFixed(0),'s');await b.close()})();
