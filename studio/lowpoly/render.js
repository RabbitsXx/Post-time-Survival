// node render.js spec.json outdir a b [step]   |   node render.js spec.json outdir t1,t2,... --t
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const srv=http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const x=path.extname(f);r.writeHead(200,{'content-type':{'.js':'text/javascript','.html':'text/html; charset=utf-8','.ttf':'font/ttf'}[x]||'application/octet-stream'});r.end(d)})}).listen(0,async()=>{
const port=srv.address().port;const [spec,out,a,b,step]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await br.newPage({viewport:{width:+(process.env.VW||1080),height:+(process.env.VH||1920)}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(['error','warning'].includes(m.type())&&!/deprecated/.test(m.text()))console.log('CON',m.text().slice(0,200))});
await p.goto('http://localhost:'+port+'/lowpoly/scene.html?w='+(process.env.VW||1080)+'&h='+(process.env.VH||1920),{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>window.setSpec&&window.fontsReady,null,{timeout:180000});await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
let frames;if(b==='--t')frames=a.split(',').map(t=>Math.round(parseFloat(t)*30));else{frames=[];for(let f=+a;f<+b;f+=(+step||1))frames.push(f)}
for(const f of frames){await p.evaluate(f=>window.renderAt(f),f);await p.screenshot({path:out+'/'+String(f).padStart(5,'0')+'.jpg',type:'jpeg',quality:92})}
await br.close();srv.close()});
