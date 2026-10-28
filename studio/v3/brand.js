const {chromium}=require('playwright');const fs=require('fs');
const J={thumb916:[720,1280,1.5],thumb169:[1280,720,1],logo:[400,400,2],logo2:[400,400,2],cb916:[720,1280,1.5],cbp2:[720,1280,1.5],cbp3:[720,1280,1.5],cbp4:[720,1280,1.5],cbp5:[720,1280,1.5],cb169:[1280,720,1],banner:[1280,720,2]};
(async()=>{const b=await chromium.launch();fs.mkdirSync('brand',{recursive:true});
 for(const m of (process.argv.slice(2).length?process.argv.slice(2):Object.keys(J))){const [w,h,s]=J[m];
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:s});p.on('pageerror',e=>console.log(m,'ERR',e.message));
  await p.goto('file://'+process.cwd()+'/brand.html#'+m);await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>window.READY);await p.waitForTimeout(300);
  await p.screenshot({path:`brand/${m}.png`});await p.close();}
 await b.close()})();
