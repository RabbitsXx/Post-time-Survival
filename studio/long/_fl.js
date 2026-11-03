const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:450,height:800},deviceScaleFactor:1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/engine9.html?spec=quiet_01/spec');await p.waitForTimeout(1200);
const [f0,n,tag]=JSON.parse(process.argv[2]);fs.mkdirSync('/tmp/fl_'+tag,{recursive:true});
for(let i=0;i<n;i++){await p.evaluate(f=>window.renderFrame(f),f0+i);await p.screenshot({path:`/tmp/fl_${tag}/${String(i).padStart(3,'0')}.png`})}
await b.close()})();
