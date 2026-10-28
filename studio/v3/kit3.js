/* ===== polish kit: light shafts, dust, richer lighthouse, cars, painterly details ===== */
function defs3(){document.getElementById('defs').insertAdjacentHTML('beforeend',`
 <linearGradient id="gShaft" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff0c0" stop-opacity=".55"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></linearGradient>
 <linearGradient id="gShaftC" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe8ff" stop-opacity=".4"/><stop offset="1" stop-color="#bfe8ff" stop-opacity="0"/></linearGradient>
 <linearGradient id="gAsphalt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a52"/><stop offset="1" stop-color="#15131c"/></linearGradient>
 <linearGradient id="gTower" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0b0a24" stop-opacity=".5"/></linearGradient>
 <linearGradient id="gRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3050"/><stop offset="1" stop-color="#120d20"/></linearGradient>
 <filter id="b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2"/></filter>`)}
defs3();
function shaft(g,x,y,w,len,ang,gid,op){return P(g,`M0,0 L${len},${-w} L${len},${w}Z`,'url(#'+(gid||'gShaft')+')',{transform:`translate(${x} ${y}) rotate(${ang})`,opacity:op==null?1:op})}
function dust(g,n,x0,y0,x1,y1,col){const a=[];for(let i=0;i<n;i++)a.push(C(g,0,0,1.2+rnd(i+3)*2.2,col||'#fff3cf'));return {a,x0,y0,x1,y1}}
function updDust(d,t){d.a.forEach((c,i)=>{const p=(t*.05+rnd(i))%1;A(c,{cx:lerp(d.x0,d.x1,(rnd(i+9)+Math.sin(t*.7+i)*.03+p*.2)%1),cy:lerp(d.y0,d.y1,(rnd(i+5)+t*(.012+rnd(i)*.02))%1),opacity:.12+.5*Math.abs(Math.sin(t*1.3+i*2.1))*(rnd(i+1)>.4?1:.4)})})}
function car(g,x,y,s,fill,flip){const q=G(g,{transform:`translate(${x} ${y}) scale(${s*(flip?-1:1)} ${s})`});
 P(q,'M-92,0 L-92,-34 Q-90,-52 -60,-56 L-38,-86 Q-30,-96 -12,-96 L40,-96 Q58,-94 66,-76 L76,-56 Q96,-52 96,-30 L96,0Z',fill);
 P(q,'M-30,-82 L-14,-86 L-14,-58 L-48,-58Z M0,-86 L36,-86 L48,-58 L0,-58Z','#0c0a14',{opacity:.5});
 C(q,-52,0,22,'#07050b');C(q,56,0,22,'#07050b');C(q,-52,0,9,'#2a2a34');C(q,56,0,9,'#2a2a34');return q}
function lighthouse(g,x,yb,h,o){o=o||{};const wb=h*.1,wt=h*.062,bands=7,yt=yb-h;const a=o.band||'#3d6a8a',b=o.base||'#efe6d2';const out={};
 for(let i=0;i<bands;i++){const y0=yb-h*i/bands,y1=yb-h*(i+1)/bands,w0=lerp(wb,wt,i/bands),w1=lerp(wb,wt,(i+1)/bands);P(g,`M${x-w0},${y0} L${x+w0},${y0} L${x+w1},${y1} L${x-w1},${y1}Z`,i%2?a:b)}
 P(g,`M${x-wb},${yb} L${x+wb},${yb} L${x+wt},${yt} L${x-wt},${yt}Z`,'url(#gTower)');
 for(const f of [.2,.42,.64]){const w=lerp(wb,wt,f)*.2;R(g,x-w/2,yb-h*f-h*.03,w,h*.045,'#16142a',{rx:w/2});R(g,x-w/2+1,yb-h*f-h*.03,w-2,h*.012,'#ffd98a',{opacity:o.lit?.9:.35})}
 R(g,x-wt-h*.034,yt-h*.016,(wt+h*.034)*2,h*.022,'#2a2640');R(g,x-wt-h*.034,yt-h*.016,(wt+h*.034)*2,h*.006,'#54507a',{opacity:.7});
 for(let i=0;i<9;i++)R(g,x-wt-h*.03+i*((wt+h*.03)*2)/8,yt-h*.062,h*.005,h*.048,'#2a2640');R(g,x-wt-h*.034,yt-h*.066,(wt+h*.034)*2,h*.008,'#2a2640');
 out.lant=R(g,x-wt*.82,yt-h*.15,wt*1.64,h*.088,o.lit?'#fff2a8':'#2e3d5c');
 if(!o.lit){R(g,x-wt*.82,yt-h*.15,wt*.5,h*.088,'#fff',{opacity:.1})}
 R(g,x-wt*.82,yt-h*.15,wt*1.64,h*.088,'none',{stroke:'#1c1830','stroke-width':h*.008});R(g,x-h*.004,yt-h*.15,h*.008,h*.088,'#1c1830');
 P(g,`M${x-wt*1.1},${yt-h*.15} L${x},${yt-h*.222} L${x+wt*1.1},${yt-h*.15}Z`,'#2c3350');P(g,`M${x-wt*1.1},${yt-h*.15} L${x},${yt-h*.222} L${x},${yt-h*.15}Z`,'#fff',{opacity:.1});C(g,x,yt-h*.228,h*.009,'#1c1830');
 P(g,`M${x-wb*.24},${yb} L${x-wb*.24},${yb-h*.05} Q${x},${yb-h*.085} ${x+wb*.24},${yb-h*.05} L${x+wb*.24},${yb}Z`,'#3b2a3f');
 out.x=x;out.y=yt-h*.11;return out}
function rock(g,x,y,w,fill){P(g,`M${x-w/2},${y+110} L${x-w/2+40},${y+24} L${x-w/2+110},${y-6} L${x-60},${y-20} L${x+70},${y-16} L${x+w/2-70},${y+10} L${x+w/2-20},${y+56} L${x+w/2},${y+110}Z`,'url(#gRock)');
 P(g,`M${x-60},${y-20} L${x+70},${y-16} L${x+w/2-70},${y+10} L${x+30},${y+6}Z`,'#fff',{opacity:.1});P(g,`M${x-w/2+110},${y-6} L${x-60},${y-20} L${x-20},${y+30} L${x-w/2+60},${y+40}Z`,'#fff',{opacity:.05});
 for(let i=0;i<9;i++)L(g,x-w/2+60+rnd(i)*(w-120),y+10+rnd(i+3)*80,x-w/2+80+rnd(i)*(w-120),y+30+rnd(i+3)*80,'#000',2.5,{opacity:.25})}
function haze(g,y,h,col,op){R(g,-300,y,1320,h,col,{opacity:op||.25})}
