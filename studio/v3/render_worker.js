// render_worker.js : persistent frame renderer (one Chromium, many jobs).  Run from the v3 folder.
//   stdin  : one JSON per line  {"id":1,"part":13,"jobs":[[frame,"/abs/out.jpg"],...]}   or {"quit":1}
//   stdout : {"id":1,"n":24,"ms":1234} per finished job
// Screenshots go through CDP Page.captureScreenshot(jpeg q93, optimizeForSpeed): byte-identical to page.screenshot() but ~10 % faster.
const {chromium}=require('playwright');const fs=require('fs');const readline=require('readline');
let browser=null,page=null,cdp=null,cur=null;
async function ensure(part){
  if(cur===part)return;
  if(!browser)browser=await chromium.launch();
  if(page)await page.close();
  page=await browser.newPage({viewport:{width:720,height:1280}});
  page.on('pageerror',e=>process.stderr.write('PAGEERR '+e.message+'\n'));
  await page.goto('file://'+process.cwd()+'/master2.html?part='+part);
  cdp=await page.context().newCDPSession(page);cur=part;
  // warm-up: the first screenshot of a fresh page lacks the grain overlay / font hinting (max diff 17/255 on a few pixels). Burn it so every frame is a 'warm' frame.
  await page.evaluate(()=>document.fonts.ready);
  for(let k=0;k<2;k++){await page.evaluate(()=>window.renderFrame(0));await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:93,optimizeForSpeed:true})}
}
let chain=Promise.resolve();
readline.createInterface({input:process.stdin}).on('line',line=>{
  chain=chain.then(async()=>{
    const j=JSON.parse(line);
    if(j.quit){if(browser)await browser.close();process.exit(0)}
    const t0=Date.now();await ensure(j.part);
    for(const [f,path] of j.jobs){
      await page.evaluate(f=>window.renderFrame(f),f);
      const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:93,optimizeForSpeed:true});
      fs.writeFileSync(path+'.tmp',Buffer.from(r.data,'base64'));fs.renameSync(path+'.tmp',path);   // atomic: a killed worker never leaves a half-written frame
    }
    process.stdout.write(JSON.stringify({id:j.id,n:j.jobs.length,ms:Date.now()-t0})+'\n');
  }).catch(e=>{process.stderr.write('WORKER ERROR '+e.stack+'\n');process.exit(1)});
});
