// THE MAN WHO SOLD THE EIFFEL TOWER (Victor Lustig, 1925).  Models: low-poly Eiffel Tower (tapered legs, arches, platforms, spire), con man (fedora, stache, tie), scrap dealers (bowlers), mobster, money bags, SOLD sign, newspaper, hotel table.
function eiffel(){const g=new THREE.Group();const fe=M(0x6a5a48),fl=M(0x8a7a68);
 const leg=(x,z,y0,y1,r0,r1,xi,zi)=>{const L=Math.hypot(xi-x,y1-y0,zi-z);const m=cyl(r1,r0,L,4,fe,(x+xi)/2,(y0+y1)/2,(z+zi)/2,g);m.lookAt(xi,y1,zi);m.rotateX(Math.PI/2);m.rotation.order='YXZ';return m};
 const cs=[[1,1],[-1,1],[-1,-1],[1,-1]];
 cs.forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.14,.3,3.4,4),fe);m.position.set(a*1.35,1.7,b*1.35);m.rotation.z=a*Math.atan(.8/3.4);m.rotation.x=-b*Math.atan(.8/3.4);m.rotation.y=Math.PI/4;g.add(m)});
 box(3.0,.22,3.0,fl,0,3.45,0,g);box(3.2,.08,3.2,M(0x4a3a2a),0,3.6,0,g);
 cs.forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.08,.17,2.8,4),fe);m.position.set(a*.78,4.9,b*.78);m.rotation.z=a*Math.atan(.4/2.8);m.rotation.x=-b*Math.atan(.4/2.8);m.rotation.y=Math.PI/4;g.add(m)});
 box(1.5,.18,1.5,fl,0,6.35,0,g);const sp=cone(.45,2.6,4,fe,0,7.75,0,g);sp.rotation.y=Math.PI/4;cyl(.03,.03,1.2,4,fe,0,9.5,0,g);
 for(let i=0;i<4;i++){const a=i*Math.PI/2;const arc=new THREE.Mesh(new THREE.TorusGeometry(1.25,.09,4,10,Math.PI),fe);arc.position.set(Math.sin(a)*1.5,.15,Math.cos(a)*1.5);arc.rotation.y=a;g.add(arc)}
 for(const y of[1.5,2.7]){const w=1.3+(3.4-y)*.18;for(let i=0;i<4;i++){const a=i*Math.PI/2;box(w*1.9,.06,.06,fl,0,y,0,g).position.set(Math.sin(a)*w*.95,y,Math.cos(a)*w*.95);g.children[g.children.length-1].rotation.y=a+Math.PI/2}}
 for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;const x=box(.05,3.0,.05,fl,Math.cos(a)*.62,4.9,Math.sin(a)*.62,g);x.rotation.z=Math.cos(a)*.1;x.rotation.x=-Math.sin(a)*.1}
 S.add(g);ACT.push(g);return g}
const LTOW=eiffel();
const LSOLD=(()=>{const g=new THREE.Group();const s=paSign('SOLD','#c4202a','#ffffff',1.9,.9,40);g.add(s);box(2.0,1.0,.06,M(0x3a1a1a),0,0,-.04,g);S.add(g);ACT.push(g);return g})();
function lperson(o){const P=person(Object.assign({boots:1,belt:1},o));return P}
const LUS=lperson({coat:'#2a2a3a',pants:'#3a3a4a',hair:'#2a1c14',skin:'#e8b894',stache:'#2a1c14'});(()=>{const P=LUS;const c=new THREE.Group();cyl(.19,.21,.17,10,M(0x1a1a22),0,.19,0,c);cyl(.3,.3,.025,12,M(0x1a1a22),0,.11,0,c);cyl(.2,.2,.04,10,M(0xc4202a),0,.14,0,c);P.head.add(c);box(.1,.06,.04,M(0xc4202a),0,1.45,.2,P.g)})();
const LDEAL=[0,1,2].map(i=>{const P=lperson({coat:['#6a5a3a','#5a4a3a','#7a6a4a'][i],pants:'#3a3a2a',hair:['#6a4220','#2a1c14','#c8c8c8'][i],skin:['#dca47e','#e8b894','#d49a74'][i],stache:i===1?'#2a1c14':undefined,beard:i===2?'#c8c8c8':undefined});const c=new THREE.Group();cyl(.17,.19,.16,10,M(0x1a1a1e),0,.2,0,c);const t=new THREE.Mesh(new THREE.SphereGeometry(.18,8,6,0,Math.PI*2,0,Math.PI/2),M(0x1a1a1e));t.position.y=.22;c.add(t);cyl(.24,.24,.02,10,M(0x1a1a1e),0,.12,0,c);P.head.add(c);return P});
const LCAP=lperson({coat:'#3a3a44',pants:'#2a2a34',hair:'#1a1210',skin:'#d49a74',torsoDraw:(x,w,h)=>{x.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<w;i+=6)x.fillRect(i,0,1,h)}});(()=>{const P=LCAP;const c=new THREE.Group();cyl(.2,.22,.14,10,M(0x2a2a30),0,.17,0,c);cyl(.28,.28,.025,12,M(0x2a2a30),0,.11,0,c);P.head.add(c);box(.18,.04,.04,M(0x8a4a2a),.1,-.1,.2,P.head)})();
function moneyBag(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),M(0xc8a860));b.scale.set(1,1.1,1);b.position.y=.3;g.add(b);cyl(.1,.14,.14,8,M(0xc8a860),0,.62,0,g);const s=paSign('F','#c8a860','#2a5a2a',.3,.3,30);s.position.set(0,.32,.28);g.add(s);S.add(g);ACT.push(g);return g}
const LBAG=moneyBag(),LBAG2=moneyBag();
function cashStack(n,col){const g=new THREE.Group();for(let i=0;i<n;i++)box(.5,.12,.3,M(col||0x4a9a4a),0,.06+i*.13,0,g);S.add(g);ACT.push(g);return g}
const LCASH1=cashStack(8),LCASH2=cashStack(2);
const LNEWS=kitSign2('EIFFEL TOWER','TOO COSTLY!','#f0e8d0','#222222',1.9,1.2,17);S.add(LNEWS);ACT.push(LNEWS);
const LMINI=eiffel();LMINI.scale.setScalar(.12);
const LHOTEL=(()=>{const g=new THREE.Group();box(14,.1,10,M(0x7a4a2a),0,-.06,0,g);box(14,6,.3,M(0xd8c098),0,3,-3.2,g);box(3.4,.1,1.8,M(0x5a3a1a),0,.95,0,g);for(const sx of[-1,1])for(const sz of[-1,1])box(.1,.9,.1,M(0x3a2a14),sx*1.6,.45,sz*.8,g);const w=box(1.6,2.0,.1,new THREE.MeshBasicMaterial({color:0xbfe8ff}),3.4,2.8,-3.0,g);const pic=paSign('HOTEL','#8a1a2a','#ffd83a',1.6,.5,24);pic.position.set(-3,3.6,-3.0);g.add(pic);S.add(g);ACT.push(g);return g})();
const LDOC=kitSign2('MINISTRY OF','POSTS (FAKE)','#f4f4e8','#2a2a6a',1.5,.8,13);S.add(LDOC);ACT.push(LDOC);
const LFLOOR=(()=>{const g=new THREE.Group();box(60,.1,40,M(0x8a9a7a),0,-.06,0,g);box(8,.06,40,M(0xb8a888),0,0,0,g);S.add(g);ACT.push(g);return g})();
const _lh=hideAll;hideAll=function(){_lh();LTOW.scale.setScalar(1);LSOLD.scale.setScalar(1);LTOW.rotation.set(0,0,0);LMINI.scale.setScalar(.12)};
function lEnv(){kitEnv(0xbfdcf0,1.3,0xe2eef8);show(LFLOOR)}
function lP(P,face){P.rest();P.face(face)}
const LH={
l_hook:(u,d,k)=>{lEnv();show(LTOW,LUS,LDEAL[0],LBAG,LSOLD);LTOW.position.set(0,0,-1.6);LTOW.scale.setScalar(.4);LTOW.rotation.y=.4;
 lP(LDEAL[0],'happy');LDEAL[0].at(-1.0,0,.9,.6);LDEAL[0].arms[1].rotation.set(-1.5+Math.sin(u*18)*.5,0,-.2);LDEAL[0].arms[0].rotation.set(-1.4,0,.2);
 lP(LUS,'smug');LUS.at(1.05,0,1.0,-.6);LUS.arms[1].rotation.set(-1.2,0,-.2);LUS.arms[0].rotation.set(-1.0,0,.2);LBAG.position.set(.55,1.05,1.0);LBAG.scale.setScalar(.9);
 const t=ease(cl((u-.85)/.12));LSOLD.scale.setScalar(.8);LSOLD.position.set(.1,lerp(4.4,2.0,t),-1.0);LSOLD.scale.setScalar(t>0?.8:.001);LSOLD.rotation.z=-.15;if(u>.9)SHAKE=.05*Math.exp(-(u-.9)*6);camTo([0,2.0,8.2],[0,2.0,7.6],[0,1.7,-.5],[0,1.7,-.5],k,56)},
l_news:(u,d,k)=>{lEnv();show(LUS,LNEWS);lP(LUS,'smug');LUS.at(-.4,0,1.2,.35);LUS.arms[0].rotation.set(-1.5,0,.5);LUS.arms[1].rotation.set(-1.5,0,-.5);LNEWS.position.set(.7,1.55,1.6);LNEWS.rotation.y=-.3;LNEWS.scale.setScalar(.72*kitPop(u,.2,.12,8));
 if(u>.6){const q=kitMark('!','#c4202a','#fff');kitMarkAt(q,-.4,2.65,1.2,.5+.07*Math.sin(u*8))}window.STAMP={on:1,u:u-.3,text:'PARIS, 1925',c:'#2a4aa0',rot:-5};camTo([0,1.9,5.6],[0,1.9,5.2],[0,1.4,1.2],[0,1.4,1.2],k,56)},
l_hotel:(u,d,k)=>{kitEnv(0xd8c098,1.15,0xd8c098);show(LHOTEL,LUS,LDOC,...LDEAL);LHOTEL.position.set(0,0,0);lP(LUS,'smug');LUS.at(0,0,-1.2,0);LUS.arms[1].rotation.set(-1.0,0,-.7);LUS.arms[0].rotation.set(-1.7,0,.2);LDOC.position.set(-.9,2.3,-.9);LDOC.scale.setScalar(kitPop(u,.2,.12,8));
 LDEAL.forEach((P,i)=>{lP(P,i===1?'neutral':'happy');P.at([-1.35,0,1.35][i],0,.8,[.5,0,-.5][i]);P.head.rotation.x=.12+Math.sin(u*2+i)*.05});window.TAG('FAKE OFFICIAL','SCRAP DEALERS','#ffd83a');camTo([0,2.1,6.6],[0,2.1,6.1],[0,1.5,0],[0,1.5,0],k,58)},
l_money:(u,d,k)=>{lEnv();show(LUS,LDEAL[1],LBAG,LCASH1);lP(LUS,'smug');LUS.at(.9,0,.8,-.5);LUS.arms[0].rotation.set(-1.5,0,.3);LUS.arms[1].rotation.set(-1.5,0,-.3);LUS.head.rotation.z=Math.sin(u*3)*.06;
 lP(LDEAL[1],'happy');LDEAL[1].at(-.9,0,.8,.5);const g=ease(cl(u/(d*.6)));LDEAL[1].arms[1].rotation.set(-1.4,0,-.2);LBAG.position.set(lerp(-.5,.15,g),1.35+Math.sin(g*Math.PI)*.3,.8);LBAG.scale.setScalar(.9);LCASH1.position.set(-1.7,0,1.8);LCASH1.scale.setScalar(.8);
 window.STAMP={on:1,u:u-.7,text:'~70,000 FRANCS',c:'#2a6a2a',rot:-5};window.TAG('ONE DEALER PAID','BRIBE INCLUDED','#7affc0');camTo([0,1.9,5.8],[0,1.9,5.4],[0,1.3,.8],[0,1.3,.8],k,56)},
l_again:(u,d,k)=>{lEnv();show(LUS,LDEAL[1],LMINI);lP(LDEAL[1],'sweat');LDEAL[1].at(-.95,0,.8,.5);LDEAL[1].arms[0].rotation.set(-2.6,0,-.4);LDEAL[1].arms[1].rotation.set(-2.6,0,.4);LDEAL[1].head.rotation.x=.4;LDEAL[1].g.position.x+=Math.sin(u*25)*.01;
 const x=lerp(1.2,.85,ease(cl(u/(d*.5))));lP(LUS,'smug');LUS.at(x,0,.9,-.8);LUS.walk(u<d*.5?u:0,8,.5);LUS.arms[1].rotation.set(-1.0,0,-.5);LMINI.position.set(x-.35,1.05,1.2);LMINI.scale.setScalar(.14);
 const q=kitMark('...','#111','#fff');if(u>d*.5)kitMarkAt(q,-1.1,2.45,.8,.55);window.TAG('TOO EMBARRASSED','TO CALL THE POLICE','#ff9a5a');camTo([0,1.9,5.8],[0,1.9,5.4],[0,1.3,.8],[0,1.3,.8],k,58)},
l_capone:(u,d,k)=>{lEnv();show(LUS,LCAP,LCASH1,LCASH2);lP(LCAP,u<d*.5?'neutral':'happy');LCAP.at(-.95,0,.8,.6);LCAP.arms[0].rotation.set(-1.4,0,.2);LCAP.arms[1].rotation.set(-1.4,0,-.2);lP(LUS,u<d*.5?'smug':'sweat');LUS.at(.95,0,.8,-.6);LUS.arms[1].rotation.set(-1.4,0,-.2);
 const a=ease(cl(u/(d*.4)));LCASH1.position.set(lerp(-.6,.1,a),lerp(1.6,1.2,a),.8);LCASH1.scale.setScalar(.6);LCASH2.position.set(.1,1.2,.8);LCASH2.scale.setScalar(u>d*.5?.7:.001);
 window.TAG('AL CAPONE','INVESTED $50,000','#ffd83a');window.STAMP={on:1,u:u-d*.6,text:'GOT $5,000',c:'#c4202a',rot:-5};camTo([0,1.9,5.6],[0,1.9,5.2],[0,1.3,.8],[0,1.3,.8],k,58)},
l_end:(u,d,k)=>{lEnv();show(LTOW,LUS,LSOLD);LTOW.position.set(0,0,-1.8);LTOW.scale.setScalar(.4);LTOW.rotation.y=.4;lP(LUS,'smug');LUS.at(0,0,1.2,0);LUS.arms[1].rotation.set(-2.6,0,.3);LUS.arms[0].rotation.set(-.4,0,-.2);LUS.head.rotation.z=Math.sin(u*3)*.05;
 LSOLD.scale.setScalar(.8);LSOLD.position.set(.1,2.1,-1.0);LSOLD.rotation.z=-.15;window.STAMP={on:1,u:u-.4,text:'SOLD TWICE?',c:'#c4202a',rot:-5};camTo([0,2.0,8.2],[0,2.0,7.6],[0,1.7,-.5],[0,1.7,-.5],k,56)}
};
Object.assign(SHOTS,LH);
Object.assign(SHOTS,{lcover:(u,d,k)=>{lEnv();show(LTOW,LUS,LSOLD,LBAG);LTOW.position.set(.9,0,-1.0);LTOW.scale.setScalar(.5);LTOW.rotation.y=.4;lP(LUS,'smug');LUS.at(-.7,0,1.8,.4);LUS.arms[0].rotation.set(-1.6,0,.4);LUS.arms[1].rotation.set(-1.6,0,-.2);LBAG.position.set(-.3,1.3,2.1);LSOLD.position.set(.9,2.6,.0);LSOLD.rotation.z=-.15;LSOLD.scale.setScalar(.9);camTo([0,2.1,7.4],[0,2.1,7.4],[0,2.1,0],[0,2.1,0],0,54)}});
