const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const srv=http.createServer((q,r)=>{const f=path.join(path.resolve(process.cwd(),'..'),decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const x=path.extname(f);r.writeHead(200,{'content-type':{'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.ttf':'font/ttf'}[x]||'application/octet-stream'});r.end(d)})}).listen(0,async()=>{
const port=srv.address().port;
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.goto('http://localhost:'+port+'/free3d/store3.html?w=1080&h=1920&2d');await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync('spec_rc1_frames.json')));
for(const f of[300,301,302,303,304]){const t0=Date.now();await p.evaluate(f=>window.renderAt(f),f);console.log('total',Date.now()-t0)}
console.log('pre,R,ps1post,drawLow,R2,drawR2,grade,ui,jpeg:',JSON.stringify((await p.evaluate(()=>window.PROF)).slice(-3).map(a=>a.map(x=>Math.round(x)))));
await br.close();srv.close()});
