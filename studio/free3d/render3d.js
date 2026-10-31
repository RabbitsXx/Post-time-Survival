const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [out,a,b,w,h]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:+w||540,height:+h||960}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text())});
await p.goto('file://'+process.cwd()+'/scene3d.html?w='+(w||540)+'&h='+(h||960));
for(let f=+a;f<+b;f++){const d=await p.evaluate(f=>window.renderAt(f/30),f);fs.writeFileSync(out+'/'+String(f).padStart(5,'0')+'.jpg',Buffer.from(d,'base64'))}
await br.close()})();
