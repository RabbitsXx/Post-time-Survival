// snapcover.js PART BEAT_INDEX FRACTION OUT.png  -> 1080x1920 still of one beat (scale 1.5)
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [part,bi,fr,out]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5]];
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1.5});p.on('pageerror',e=>console.log('PAGEERR',e.message));await p.addInitScript('window.COVER=true');
 await p.goto('file://'+process.cwd()+'/master2.html?part='+part);
 const spec=JSON.parse(fs.readFileSync(`../ser/p${part}/spec.json`));const b0=spec.beats[bi];
 const f0=Math.round(b0.t[0]*30)+1,f1=Math.round((b0.t[0]+(b0.t[1]-b0.t[0])*fr)*30);
 await p.evaluate(f=>window.renderFrame(f),f0);
 for(let f=f0;f<=f1;f+=3)await p.evaluate(f=>window.renderFrame(f),f);
 await p.evaluate(f=>window.renderFrame(f),f1);
 await p.evaluate(()=>{document.getElementById('hud').style.display='none'});
 await p.screenshot({path:out});await b.close()})();
