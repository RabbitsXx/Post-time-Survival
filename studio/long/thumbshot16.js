// thumbshot16.js SPEC DSF OUTDIR frame:name ...  -> PNG (transparent background when the beat is transparent)
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,dsf,out,...jobs]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:parseFloat(dsf)});p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file://'+process.cwd()+'/engine.html?spec='+spec);await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.fonts.load('56px RC'));
 for(const j of jobs){const [f,name]=j.split(':');await p.evaluate(f=>window.renderFrame(f),+f);await p.waitForTimeout(80);await p.screenshot({path:`${out}/${name}.png`,omitBackground:true})}
 await b.close()})();
