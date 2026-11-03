// worker9.js : persistent frame renderer for the 16:9 engine.  stdin: {"id":1,"spec":"spec","dsf":1.5,"jobs":[[frame,"/abs/out.jpg"],...]}  |  {"quit":1}
const {chromium}=require('playwright');const fs=require('fs');const readline=require('readline');
let browser=null,page=null,cdp=null,cur=null,CLIP=null;
async function ensure(spec,dsf){
  const k=spec+'|'+dsf;if(cur===k)return;
  if(!browser)browser=await chromium.launch();
  if(page)await page.close();
  page=await browser.newPage({viewport:{width:450,height:800},deviceScaleFactor:1});CLIP={x:0,y:0,width:450,height:800,scale:dsf};
  page.on('pageerror',e=>process.stderr.write('PAGEERR '+e.message+'\n'));
  await page.goto('file://'+process.cwd()+'/engine9.html?spec='+spec);cdp=await page.context().newCDPSession(page);cur=k;
  await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>document.fonts.load('56px RC'));
  for(let i=0;i<2;i++){await page.evaluate(()=>window.renderFrame(0));await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:92,optimizeForSpeed:true,clip:CLIP})}
}
let chain=Promise.resolve();
readline.createInterface({input:process.stdin}).on('line',line=>{
  chain=chain.then(async()=>{
    const j=JSON.parse(line);if(j.quit){if(browser)await browser.close();process.exit(0)}
    const t0=Date.now();await ensure(j.spec,j.dsf);
    let prevH=null,prevP=null;
    for(const [f,path] of j.jobs){
      // identical scene state as the previous frame (static holds): reuse its picture, skip the expensive screenshot
      const h=await page.evaluate(f=>{window.renderFrame(f);const t=document.documentElement.outerHTML;let a=5381,b=52711;for(let i=0;i<t.length;i++){const c=t.charCodeAt(i);a=((a<<5)+a+c)|0;b=((b<<5)+b^c)|0}return a+':'+b+':'+t.length},f);
      if(h===prevH&&prevP){fs.copyFileSync(prevP,path);prevP=path;continue}
      await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
      const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:92,optimizeForSpeed:true,clip:CLIP});
      fs.writeFileSync(path+'.tmp',Buffer.from(r.data,'base64'));fs.renameSync(path+'.tmp',path);prevH=h;prevP=path}
    process.stdout.write(JSON.stringify({id:j.id,n:j.jobs.length,ms:Date.now()-t0})+'\n');
  }).catch(e=>{process.stderr.write('WORKER ERROR '+e.stack+'\n');process.exit(1)});
});
