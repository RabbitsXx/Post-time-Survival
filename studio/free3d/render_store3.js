const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const srv=http.createServer((q,r)=>{const f=path.join(path.resolve(process.cwd(),'..'),decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const x=path.extname(f);r.writeHead(200,{'content-type':{'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css','.ttf':'font/ttf','.woff2':'font/woff2','.json':'application/json'}[x]||'application/octet-stream'});r.end(d)})}).listen(0,async()=>{
const port=srv.address().port;
(async()=>{const [spec,out,a,b,w,h,extra]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:+w,height:+h}});
p.on('requestfailed',r=>console.log('RF',r.url(),r.failure().errorText));p.on('response',r=>{if(r.status()>=400)console.log('HTTP',r.status(),r.url())});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text().slice(0,300))});
await p.goto('http://localhost:'+port+'/free3d/store3.html?w='+w+'&h='+h+(extra||''));await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
for(let f=+a;f<+b;f+=(+process.env.STEP||1)){const d=await p.evaluate(f=>window.renderAt(f),f);fs.writeFileSync(out+'/'+String(f).padStart(5,'0')+'.jpg',Buffer.from(d,'base64'))}
await br.close();srv.close()})()});
