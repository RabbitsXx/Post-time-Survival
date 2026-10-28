// snapbeats16.js SPEC DSF OUTDIR f1 f2 ...   (frames -> OUTDIR/<frame>.jpg)
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,dsf,out,...fr]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:parseFloat(dsf)});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file://'+process.cwd()+'/engine.html?spec='+spec);await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.fonts.load('56px RC'));
 for(const f of fr){await p.evaluate(f=>window.renderFrame(f),+f);await p.screenshot({path:`${out}/${f}.jpg`,type:'jpeg',quality:85})}
 await b.close()})();
