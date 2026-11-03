const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [q,f0]=process.argv.slice(2);const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/well.html?w=1080&h=1920&'+q);await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync('spec_well_01_s.json')));
await p.evaluate(f=>window.renderAt(f),+f0);const t0=Date.now();for(let i=0;i<6;i++)await p.evaluate(f=>window.renderAt(f),+f0+i);console.log(JSON.stringify(await p.evaluate(()=>window.__T)));console.log(q,'frame',f0,((Date.now()-t0)/6).toFixed(0),'ms');await br.close()})();
