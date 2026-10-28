const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [part,a,b,dir]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5]];fs.mkdirSync(dir,{recursive:true});
 const br=await chromium.launch();const p=await br.newPage({viewport:{width:720,height:1280}});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+process.cwd()+'/master2.html?part='+part);
 for(let f=a;f<b;f++){await p.evaluate(f=>window.renderFrame(f),f);await p.screenshot({path:`${dir}/${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:93});}
 await br.close()})();
