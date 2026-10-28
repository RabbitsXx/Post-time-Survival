const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const part=process.argv[2];const out=process.argv[3];const only=process.argv.slice(4).map(Number);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file://'+process.cwd()+'/master2.html?part='+part);
 const spec=JSON.parse(fs.readFileSync(`../ser/p${part}/spec.json`));fs.mkdirSync(out,{recursive:true});
 for(let bi=0;bi<spec.beats.length;bi++){if(only.length&&!only.includes(bi))continue;const b0=spec.beats[bi];
  const t=b0.t[0]+(b0.t[1]-b0.t[0])*0.6,f=Math.round(t*30);
  try{await p.evaluate(f=>window.renderFrame(f),Math.round(b0.t[0]*30)+1);await p.evaluate(f=>window.renderFrame(f),f);}catch(e){console.log('ERR beat',bi+1,b0.scene.n,JSON.stringify(b0.scene.p),String(e).slice(0,160))}
  await p.screenshot({path:`${out}/b${String(bi+1).padStart(2,'0')}.jpg`,type:'jpeg',quality:80});}
 await b.close()})();
