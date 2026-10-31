
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,out,a,b]=process.argv.slice(2);const br=await chromium.launch();const p=await br.newPage({viewport:{width:540,height:960},deviceScaleFactor:1});
await p.goto('file://'+process.env.FREE+'/engine.html');await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
for(let f=+a;f<+b;f++){const d=await p.evaluate(f=>window.renderFrame(f),f);fs.writeFileSync(out+'/'+String(f).padStart(5,'0')+'.jpg',Buffer.from(d,'base64'))}
await br.close()})();
