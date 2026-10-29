// snapbeats9.js SPEC OUTDIR f1 f2 ...   (9:16 engine: frames -> OUTDIR/<frame>.png at 720x1280)
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,out,...fr]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:450,height:800},deviceScaleFactor:1.6});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
 await p.goto('file://'+process.cwd()+'/engine9.html?spec='+spec+(process.env.CLEAN?'&clean=1':''));await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.fonts.load('56px RC'));
 for(const f of fr){await p.evaluate(f=>window.renderFrame(f),Math.max(0,+f-1));await p.evaluate(f=>window.renderFrame(f),+f);await p.screenshot({path:`${out}/${f}.png`})}
 await b.close()})();
