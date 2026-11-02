// CLEOPATRA vs THE MOON LANDING.  Models: Great Pyramid (stepped, with blocks), Cleopatra (gold headband + uraeus, white dress), Apollo lander + astronaut + flag, timeline road, tape measure with counters, pyramid workers.
function pyramid(){const g=new THREE.Group();const sd=M(0xd8b878);for(let i=0;i<8;i++){const w=4.4-i*.5;box(w,.45,w,M([0xd8b878,0xc8a868,0xe0c088][i%3]),0,.22+i*.45,0,g)}cone(.4,.6,4,M(0xf0c850),0,3.9,0,g).rotation.y=Math.PI/4;S.add(g);ACT.push(g);return g}
const CPYR=pyramid();
const CCLEO=person({coat:'#f4f0e4',pants:'#f4f0e4',hair:'#0a0a10',hairCap:1,skin:'#d9a27c',boots:0,shortSleeve:1});(()=>{const P=CCLEO;const hb=cyl(.205,.205,.06,12,M(0xf0c030),0,.12,0,P.head);const u=cone(.05,.12,4,M(0xf0c030),0,.19,.2,P.head);const col=cyl(.21,.25,.12,12,M(0xf0c030),0,1.55,0,P.g);const sk=cyl(.3,.5,.9,12,M(0xf4f0e4),0,.5,0,P.g);const bl=box(.5,.08,.04,M(0xf0c030),0,.92,.28,P.g)})();
const CAST=person({coat:'#f0f0f4',pants:'#f0f0f4',hair:'#e8e8ec',skin:'#f0f0f4',boots:1,belt:1});(()=>{const P=CAST;const hel=new THREE.Mesh(new THREE.SphereGeometry(.27,12,9),new THREE.MeshLambertMaterial({color:0xc8e0f0,transparent:true,opacity:.55,flatShading:true}));hel.position.y=.0;P.head.add(hel);box(.5,.55,.25,M(0xdcdce2),0,1.25,-.28,P.g)})();
const CLAND=(()=>{const g=new THREE.Group();const gold=M(0xd8a830),sil=M(0xb8b8c0);box(1.5,.9,1.5,gold,0,1.5,0,g);box(1.1,.6,1.1,sil,0,2.2,0,g);for(const [x,z] of[[-1,-1],[1,-1],[1,1],[-1,1]]){const l=cyl(.04,.05,1.4,5,sil,x*.95,.7,z*.95,g);l.rotation.z=x*.35;l.rotation.x=-z*.35;box(.35,.05,.35,sil,x*1.2,.03,z*1.2,g)}
 const f=flagMesh(ctex(48,32,(x,w,h)=>{for(let i=0;i<7;i++){x.fillStyle=i%2?'#fff':'#d8202c';x.fillRect(0,i*h/7,w,h/7+1)}x.fillStyle='#1c2e8a';x.fillRect(0,0,w*.42,h*.55)}),.9,.6);const pole=cyl(.02,.02,1.6,5,M(0xdddddd),2.0,.8,0,g);f.position.set(2.45,1.3,0);g.add(f);g.userData.flag=f;S.add(g);ACT.push(g);return g})();
const CWORK=[0,1,2].map(i=>person({coat:['#c8a070','#b89060','#d8b080'][i],pants:'#e8e0d0',hair:'#1a1210',skin:'#d49a74',boots:0,shortSleeve:1}));
const CBLOCK=box(.9,.7,.9,M(0xd8b878),0,0,0);S.add(CBLOCK);ACT.push(CBLOCK);
const CROAD=(()=>{const g=new THREE.Group();box(40,.1,14,M(0xd8c898),-10,-.06,0,g);box(14,.1,14,M(0xc8c8cc),14,-.06,0,g);for(let i=0;i<12;i++){const r=new THREE.Mesh(new THREE.IcosahedronGeometry(.3+rn(i)*.3,0),M(0xa8a8b0));r.position.set(8+rn(i+3)*12,.1,-4+rn(i+7)*8);r.scale.y=.5;g.add(r)}S.add(g);ACT.push(g);return g})();
const CTAPE=(()=>{const g=new THREE.Group();const t=box(1,.14,.06,M(0xf0c030),.5,0,0,g);g.userData.t=t;for(let i=0;i<10;i++)box(.04,.2,.07,M(0x222222),i*.1+.05,0,0,g);S.add(g);ACT.push(g);return g})();
function tape(x0,x1,y,z,col){CTAPE.visible=true;const L=Math.abs(x1-x0);CTAPE.userData.t.scale.x=Math.max(.01,L);CTAPE.userData.t.position.x=Math.min(x0,x1)+L/2;CTAPE.userData.t.material.color.setHex(col||0xf0c030);CTAPE.position.set(0,y,z);CTAPE.children.forEach((c,i)=>{if(i>0)c.visible=false})}
const CSIGN=(t1,t2,bg,fg)=>{const s=kitSign2(t1,t2,bg,fg,1.7,.8,17);S.add(s);ACT.push(s);return s};
const CS1=CSIGN('PYRAMID','~2600 BC','#f4e8c0','#2a2a2a'),CS2=CSIGN('CLEOPATRA','30 BC','#f4e8c0','#8a1a2a'),CS3=CSIGN('MOON LANDING','1969','#f4e8c0','#2a2a6a');
const _ch=hideAll;hideAll=function(){_ch();CTAPE.userData.t.scale.x=1};
function cEnv(){kitEnv(0x9fd8ff,1.3,0xe6f2fa);show(CROAD)}
function cP(P,face){P.rest();P.face(face)}
const CH={
c_hook:(u,d,k)=>{cEnv();show(CPYR,CCLEO,CLAND,CAST,CS1,CS2,CS3);const pw=-2.15,lw=1.7;CPYR.position.set(pw,0,-1.0);CPYR.scale.setScalar(.8);CLAND.position.set(lw,0,-1.0);CLAND.scale.setScalar(.7);CAST.rest();CAST.at(lw-.1,0,.6,-.4);CAST.face('happy');CAST.arms[1].rotation.set(-2.5+Math.sin(u*6)*.2,0,.3);waveFlag(CLAND.userData.flag,u);
 cP(CCLEO,'smug');CCLEO.at(0,0,.8,0);CCLEO.arms[0].rotation.set(-.2,0,-.9);CCLEO.arms[1].rotation.set(-.2,0,.9);CCLEO.head.rotation.z=Math.sin(u*2)*.06;
 const g=ease(cl(u/.8));tape(lerp(0,pw,g),lerp(0,lw,g),1.0,1.1,0xf0c030);CS1.position.set(pw,3.9,-.4);CS1.scale.setScalar(.8);CS3.position.set(lw,3.4,-.4);CS3.scale.setScalar(.8);CS2.position.set(0,2.8,.8);CS2.scale.setScalar(.8);
 camTo([0,1.9,9.4],[0,1.9,8.8],[0,1.6,-.5],[0,1.6,-.5],k,60)},
c_pyr:(u,d,k)=>{cEnv();show(CPYR,CBLOCK,...CWORK);CPYR.position.set(0,0,-2.0);CPYR.scale.setScalar(.8);CWORK.forEach((P,i)=>{cP(P,'sweat');P.at(-1.3+i*1.0,0,1.2,.2);P.arms[0].rotation.set(-1.4,0,.2);P.arms[1].rotation.set(-1.4,0,-.2);P.walk(u+i,5,.2);P.g.position.y=Math.abs(Math.sin(u*5+i))*.03});CBLOCK.position.set(0,.55,2.0);
 window.TAG('GREAT PYRAMID','BUILT ~2600 BC','#ffd83a');camTo([0,2.0,7.6],[0,2.0,7.0],[0,1.5,0],[0,1.5,0],k,58)},
c_cleo:(u,d,k)=>{cEnv();show(CCLEO,CS2,CPYR);CPYR.position.set(-2.4,0,-3.0);CPYR.scale.setScalar(.7);cP(CCLEO,'smug');CCLEO.at(.3,0,1.2,-.15);CCLEO.arms[0].rotation.set(-.3,0,.3);CCLEO.arms[1].rotation.set(-1.0,0,-.3);CCLEO.head.rotation.z=Math.sin(u*2)*.05;CS2.position.set(1.0,2.0,1.3);CS2.scale.setScalar(.8*kitPop(u,.2,.12,8));window.STAMP={on:1,u:u-.3,text:'REIGNED 51-30 BC',c:'#8a1a2a',rot:-4};camTo([0,1.9,6.2],[0,1.9,5.7],[0,1.5,1.2],[0,1.5,1.2],k,56)},
c_gap1:(u,d,k)=>{cEnv();show(CPYR,CCLEO,CS1,CS2);CPYR.position.set(-2.3,0,-1.0);CPYR.scale.setScalar(.7);cP(CCLEO,'neutral');CCLEO.at(1.8,0,.6,-.4);const g=ease(cl(u/(d*.7)));tape(-2.3+0.0,lerp(-2.3,1.5,g),.9,.9,0xf0c030);
 CS1.position.set(-2.3,3.3,-.2);CS1.scale.setScalar(.7);CS2.position.set(1.8,2.8,.6);CS2.scale.setScalar(.7);window.STAMP={on:1,u:u-.1,text:Math.round(2570*g)+' YEARS',c:'#c4202a',rot:-4};camTo([0,2.0,9.0],[0,2.0,8.5],[-.3,1.5,0],[-.3,1.5,0],k,58)},
c_gap2:(u,d,k)=>{cEnv();show(CLAND,CAST,CCLEO,CS2,CS3);CLAND.position.set(1.7,0,-1.0);CLAND.scale.setScalar(.6);waveFlag(CLAND.userData.flag,u);CAST.rest();CAST.at(.7,0,.7,-.3);CAST.face('happy');CAST.arms[1].rotation.set(-2.5+Math.sin(u*6)*.2,0,.3);cP(CCLEO,'neutral');CCLEO.at(-1.6,0,.6,.4);
 const g=ease(cl(u/(d*.7)));tape(-1.6,lerp(-1.6,1.2,g),.9,.9,0x7ad0ff);CS2.position.set(-1.6,2.8,.6);CS2.scale.setScalar(.7);CS3.position.set(1.7,3.4,-.2);CS3.scale.setScalar(.7);window.STAMP={on:1,u:u-.1,text:Math.round(1999*g)+' YEARS',c:'#2a4aa0',rot:-4};camTo([0,2.0,8.4],[0,2.0,7.9],[0,1.5,0],[0,1.5,0],k,58)},
c_end:(u,d,k)=>{cEnv();show(CPYR,CCLEO);CPYR.position.set(0,0,-3.0);CPYR.scale.setScalar(.9);cP(CCLEO,'shock');CCLEO.at(0,0,1.8,Math.PI-.1);CCLEO.arms[1].rotation.set(-2.2,0,-.2);CCLEO.arms[0].rotation.set(-1.0,0,.2);CCLEO.head.rotation.x=-.15;CCLEO.head.rotation.y=Math.sin(u*1.5)*.2;
 window.STAMP={on:1,u:u-.4,text:'ANCIENT TO HER TOO',c:'#8a1a2a',rot:-4};camTo([0,2.0,6.0],[0,2.0,5.5],[0,1.5,0],[0,1.5,0],k,56)}
};
Object.assign(SHOTS,CH);
Object.assign(SHOTS,{ccover:(u,d,k)=>{CH.c_hook(.9,3.5,.25);window.TAGS={on:0}}});
