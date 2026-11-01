// node gate.js spec.json outdir  : renders 3 key frames per shot (start/mid/end) (+ extra hook frames for shot 1) and dumps gateInfo for each to outdir/gate.json
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const srv=http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const x=path.extname(f);r.writeHead(200,{'content-type':{'.js':'text/javascript','.html':'text/html; charset=utf-8','.ttf':'font/ttf'}[x]||'application/octet-stream'});r.end(d)})}).listen(0,async()=>{
const port=srv.address().port;const [spec,out]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const S=JSON.parse(fs.readFileSync(spec));
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await br.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:'+port+'/lowpoly/scene.html?w=1080&h=1920',{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>window.setSpec&&window.fontsReady,null,{timeout:180000});await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),S);
const res=[];
S.shots.forEach((sh,si)=>{});
for(let si=0;si<S.shots.length;si++){const sh=S.shots[si],d=sh.t1-sh.t0;const fr=si===0?[.03,.12,.25,.5,.9]:[.08,.5,.92];
 for(let k=0;k<fr.length;k++){const t=sh.t0+d*fr[k];const f=Math.round(t*30);const id=await p.evaluate(f=>window.renderAt(f),f);const info=await p.evaluate(()=>window.gateInfo());const file=`${String(si).padStart(2,'0')}_${id}_${k}.jpg`;await p.screenshot({path:out+'/'+file,type:'jpeg',quality:90});res.push({shot:si,id,k,t:+t.toFixed(2),file,info})}}
fs.writeFileSync(out+'/gate.json',JSON.stringify(res,null,1));await br.close();srv.close()});
