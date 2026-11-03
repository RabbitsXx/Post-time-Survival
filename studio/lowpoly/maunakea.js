// MAUNA KEA vs EVEREST.  Models: two mountains (cone + snow cap), ocean plane (transparent) with seabed, measuring pole with height labels, surveyor Poly, sea-level line.
function mkMount(col,h,r,snow){const g=new THREE.Group();cone(r,h,8,M(col),0,h/2,0,g);if(snow){const sh=h*.18;cone(r*.18,sh,8,M(0xf4f8ff),0,h-sh/2,0,g)}S.add(g);ACT.push(g);return g}
const MKEV=mkMount(0x8a8a92,8.8,3.4,1),MKMK=mkMount(0x4a3a3a,9.3,5.2,0);box(9,.5,6,M(0x6a8a4a),0,-.2,0,MKEV);box(11,.2,7,M(0x6a8a4a),0,-.1,0,MKMK).position.y=5.0;
const MKSEA=(()=>{const g=new THREE.Group();box(50,3.2,16,new THREE.MeshBasicMaterial({color:0x3a8ad0,transparent:true,opacity:.5}),0,-1.6,0,g);box(50,.1,16,M(0x7a6a4a),0,-3.25,0,g);box(50,.06,16,new THREE.MeshBasicMaterial({color:0xcfe8ff,transparent:true,opacity:.8}),0,0,0,g);S.add(g);ACT.push(g);return g})();
const MKSURV=person({coat:'#e8a020',pants:'#3a3a4a',hair:'#4a3020',skin:'#e8b894',boots:1,belt:1,stubble:1});(()=>{const c=new THREE.Group();cyl(.2,.22,.12,10,M(0xf0d030),0,.16,0,c);MKSURV.head.add(c)})();
const MKPOLE=(()=>{const g=new THREE.Group();cyl(.05,.05,1,5,M(0xc4202a),0,.5,0,g);g.userData.p=g.children[0];S.add(g);ACT.push(g);return g})();
const MKSN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s};
const MKS1=MKSN('EVEREST','8,849 M ABOVE SEA','#f4e8c0','#2a2a6a',2.4),MKS2=MKSN('MAUNA KEA','9,330 M FROM SEABED','#f4e8c0','#8a1a2a',2.5);
const _mkh=hideAll;hideAll=function(){_mkh()};
function mkEnv(){kitEnv(0xbfe0f6,1.3,0xdceef8);show(MKSEA)}
const MKH={
m_hook:(u,d,k)=>{mkEnv();show(MKEV,MKMK);MKEV.position.set(-3.2,0,-1.5);MKEV.scale.setScalar(.6);MKMK.position.set(3.4,-3.06,-1.5);MKMK.scale.setScalar(.6);window.TAG('EVEREST ISN\'T','THE TALLEST?','#ffd83a');camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_ev:(u,d,k)=>{mkEnv();show(MKEV);MKEV.position.set(-2.4,0,-1.5);MKEV.scale.setScalar(.6);window.STAMP={on:1,u:u-.4,text:'ABOVE SEA LEVEL',c:'#2a2a6a',rot:-4};camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_mk:(u,d,k)=>{mkEnv();show(MKMK);MKMK.position.set(0,-3.06,-1.5);MKMK.scale.setScalar(.6);window.STAMP={on:1,u:u-.4,text:'SEABED',c:'#8a1a2a',rot:-4};camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_both:(u,d,k)=>{mkEnv();show(MKEV,MKMK);MKEV.position.set(-3.0,0,-1.5);MKEV.scale.setScalar(.6);MKMK.position.set(3.0,-3.06,-1.5);MKMK.scale.setScalar(.6);window.TAG('MEASURED FROM','THE OCEAN FLOOR','#7ad0ff');camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_tall:(u,d,k)=>{mkEnv();show(MKMK);MKMK.position.set(0,-3.06,-1.5);MKMK.scale.setScalar(.6);window.STAMP={on:1,u:u-.4,text:'TALLER?',c:'#c4202a',rot:-4};camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_hide:(u,d,k)=>{mkEnv();show(MKMK);MKMK.position.set(0,-3.06,-1.5);MKMK.scale.setScalar(.6);window.TAG('MOST OF IT','IS UNDERWATER','#7ad0ff');camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)},
m_end:(u,d,k)=>{mkEnv();show(MKEV,MKMK,MKSURV);MKEV.position.set(-3.0,0,-1.5);MKEV.scale.setScalar(.6);MKMK.position.set(3.0,-3.06,-1.5);MKMK.scale.setScalar(.6);MKSURV.rest();MKSURV.face('smug');MKSURV.at(0,.0,6.0,0);MKSURV.arms[1].rotation.set(-2.6+Math.sin(u*5)*.2,0,.3);window.TAG('IT DEPENDS WHERE','YOU START MEASURING','#ffd83a');camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],k,62)}
};
Object.assign(SHOTS,MKH);
Object.assign(SHOTS,{mkcover:(u,d,k)=>{mkEnv();show(MKEV,MKMK);MKEV.position.set(-3.0,0,-1.5);MKEV.scale.setScalar(.6);MKMK.position.set(3.0,-3.06,-1.5);MKMK.scale.setScalar(.6);camTo([0,1.6,16.0],[0,1.6,15.2],[0,.6,-1.5],[0,.6,-1.5],0,62)}});
