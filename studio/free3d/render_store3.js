const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,out,a,b,w,h]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:+w,height:+h}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text())});
await p.goto('file://'+process.cwd()+'/store3.html?w='+w+'&h='+h);await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
for(let f=+a;f<+b;f++){const d=await p.evaluate(f=>window.renderAt(f),f);fs.writeFileSync(out+'/'+String(f).padStart(5,'0')+'.jpg',Buffer.from(d,'base64'))}
await br.close()})();
