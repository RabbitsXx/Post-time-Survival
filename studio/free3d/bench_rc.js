const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const srv=http.createServer((q,r)=>{const f=path.join(path.resolve(process.cwd(),'..'),decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const x=path.extname(f);r.writeHead(200,{'content-type':{'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.ttf':'font/ttf'}[x]||'application/octet-stream'});r.end(d)})}).listen(0,async()=>{
const port=srv.address().port;const [spec,w,h,extra]=process.argv.slice(2);
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:+w,height:+h}});
await p.goto('http://localhost:'+port+'/free3d/store3.html?w='+w+'&h='+h+(extra||''));await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
const T=[];for(const f of[300,301,302,303,304,305,306,307]){const t0=Date.now();await p.evaluate(f=>window.renderAt(f),f);T.push(Date.now()-t0)}console.log(w+'x'+h,JSON.stringify(T));
await br.close();srv.close()});
