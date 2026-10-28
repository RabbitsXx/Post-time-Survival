/* ===== thumbs16: foreground layers for the thumbnails (transparent background; composited in PIL over game / real backgrounds) ===== */
const TXT=(g,x,y,s,size,fill,o)=>T(g,x,y,s,size,fill,Object.assign({'font-family':RCF,'font-weight':700,'stroke-linejoin':'round','paint-order':'stroke fill'},o||{}));
LIB.thFG1=(Z,p)=>{const m=G(Z.mid),n=G(Z.near);
 // GAME / REAL words, VS badge
 const gm=TXT(n,250,172,'GAME',158,'#ffe14a',{stroke:'#000','stroke-width':24,'font-family':MONO,'font-weight':800,'letter-spacing':-4});A(gm,{transform:'rotate(-4 250 172)'});
 const rl=TXT(n,1030,172,'REAL',172,'#ff3a2a',{stroke:'#000','stroke-width':24,'letter-spacing':2});A(rl,{transform:'rotate(4 1030 172)'});
 const vs=G(n);C(vs,640,96,56,'#fff',{stroke:'#000','stroke-width':9});TXT(vs,640,121,'VS',70,'#e0120a',{stroke:'none','paint-order':'normal'});
 // Dex big
 const dx=actor(m,{k:'dex',view:'front',pose:'finger',expr:'shock',x:640,y:1230,s:3.1,bob:0,noShadow:true});
 // band
 const bd=G(n);R(bd,0,596,1280,124,'#d9170f');R(bd,0,596,1280,10,'#fff');TXT(bd,640,692,'HOW TO SURVIVE ZOMBIES',92,'#fff',{stroke:'#000','stroke-width':14,'letter-spacing':3});
 // death counter chip (game side)
 const ch=G(n);R(ch,40,440,300,66,'rgba(8,10,28,.88)',{rx:10,stroke:'#7dffb0','stroke-width':5});skullIcon(ch,86,474,1.4,'#fff');T(ch,222,488,'DEATHS: 8',32,'#ffe066',{'font-family':MONO,'font-weight':800});
 const rc=G(n);R(rc,1000,450,240,56,'rgba(10,10,12,.8)',{rx:10});C(rc,1036,478,10,'#ff2a2a');T(rc,1130,490,'REAL LIFE',28,'#fff',{'font-family':RCF,'font-weight':700,'letter-spacing':3});
 return (u,t,bt)=>{dx.upd(0,0,0)}};
LIB.thFG2=(Z,p)=>{const m=G(Z.mid),n=G(Z.near);
 const a=G(n);R(a,40,40,150,150,'#ffd23a',{rx:24,stroke:'#000','stroke-width':10});TXT(a,115,160,'A',140,'#111',{'paint-order':'normal'});
 const b=G(n);R(b,1090,40,150,150,'#7dffb0',{rx:24,stroke:'#000','stroke-width':10});TXT(b,1165,160,'B',140,'#111',{'paint-order':'normal'});
 const dx=actor(m,{k:'dex',view:'front',pose:'shrug',expr:'smug',x:640,y:1230,s:3.1,bob:0,noShadow:true});
 const q=G(n);TXT(q,930,330,'?',300,'#ffe14a',{stroke:'#000','stroke-width':26});A(q,{transform:'rotate(12 930 330)'});const q2=G(n);TXT(q2,350,330,'?',300,'#ffe14a',{stroke:'#000','stroke-width':26});A(q2,{transform:'rotate(-12 350 330)'});
 const bd=G(n);R(bd,0,580,1280,140,'#d9170f');R(bd,0,580,1280,10,'#fff');TXT(bd,640,682,'ONLY ONE SURVIVES',112,'#fff',{stroke:'#000','stroke-width':16,'letter-spacing':3});
 const vs=G(n);C(vs,640,60,44,'#fff',{stroke:'#000','stroke-width':8});TXT(vs,640,80,'VS',54,'#e0120a',{stroke:'none','paint-order':'normal'});
 return ()=>{dx.upd(0,0,0)}};
LIB.thFG3=(Z,p)=>{const f=G(Z.far),m=G(Z.mid),n=G(Z.near);
 const dx=actor(m,{k:'dex',view:'front',pose:'facepalm',expr:'tired',x:400,y:1340,s:3.0,bob:0,noShadow:true,shades:0});
 const st=actor(m,{k:'steve',view:'front',pose:'zombie',x:1000,y:1340,s:3.0,bob:0,noShadow:true});
 const band=G(f);R(band,0,110,1280,210,'rgba(0,0,0,.8)');
 const yd=T(band,640,282,'YOU DIED',178,'#d01818',{'font-family':'DejaVu Serif, Georgia, serif','font-weight':700,'letter-spacing':10,stroke:'#400',  'stroke-width':8,'paint-order':'stroke fill'});
 const d=G(n);R(d,0,590,1280,130,'#111');R(d,0,590,1280,8,'#ffd23a');TXT(d,640,682,'HOW TO NOT DIE',104,'#ffd23a',{stroke:'#000','stroke-width':14,'letter-spacing':4});
 const sk=G(n);skullIcon(sk,1150,100,3.2,'#fff');T(sk,1150,168,'x8',60,'#ffe066',{'font-family':MONO,'font-weight':800,stroke:'#000','stroke-width':8,'paint-order':'stroke fill'});
 return ()=>{dx.upd(0,0,0);st.upd(0,0,0)}};
