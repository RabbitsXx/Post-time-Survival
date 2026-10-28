// snap16.js SPEC DSF out1.png:frame out2.png:frame ...   (dev tool: single frames from the engine)
const {chromium}=require('playwright');
(async()=>{const [spec,dsf,...jobs]=process.argv.slice(2);const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:parseFloat(dsf)});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
 await p.goto('file://'+process.cwd()+'/engine.html?spec='+spec);await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.fonts.load('56px RC'));
 for(const j of jobs){const [out,f]=j.split(':');const t0=Date.now();await p.evaluate(f=>window.renderFrame(f),+f);await p.screenshot({path:out});console.log(out,Date.now()-t0,'ms')}
 await b.close()})();
