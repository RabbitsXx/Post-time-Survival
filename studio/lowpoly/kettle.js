(()=>{
function ship(c){const g=new THREE.Group();box(3.2,.7,1.0,M(0x6a4a2a),0,.35,0,g);box(3.4,.1,1.1,M(0x4a3218),0,.75,0,g);cyl(.06,.06,2.6,5,M(0x4a3218),0,2.0,0,g);box(1.5,1.6,.05,M(c||0xf4f0e0),0,2.0,.05,g);S.add(g);ACT.push(g);return g}
const SH1=ship(0xf4f0e0),SH2=ship(0xe8d8a0);
function kettle(){const g=new THREE.Group();const m=M(0x3a3a40);const b=new THREE.Mesh(new THREE.SphereGeometry(.4,10,8),m);b.scale.y=.85;b.position.y=.4;g.add(b);const h=new THREE.Mesh(new THREE.TorusGeometry(.35,.03,5,12,Math.PI),m);h.position.y=.65;g.add(h);cyl(.12,.14,.06,8,M(0x2a2a2a),0,.76,0,g);S.add(g);ACT.push(g);return g}
const KT=kettle();
function cannon(){const g=new THREE.Group();const b=cyl(.14,.2,1.3,8,M(0x2a2a30),0,.5,0,g);b.rotation.z=Math.PI/2-.2;cyl(.22,.22,.1,8,M(0x4a3218),-.2,.2,.3,g).rotation.x=Math.PI/2;cyl(.22,.22,.1,8,M(0x4a3218),-.2,.2,-.3,g).rotation.x=Math.PI/2;S.add(g);ACT.push(g);return g}
const CN=cannon();
const EMP=stgPerson('#f4f4f4','#f4f4f4','#8a5a3a','#efc2a2');stgHat(EMP,'crown',0xe8c030);
const DUT=stgPerson('#d4701c','#2a2a4a','#e8c860','#efc2a2');stgHat(DUT,'cap',0x2a2a4a);
const CK=stgPerson('#f4f0e0','#6a5a4a','#3a2418','#d49a74');stgHat(CK,'chef',0xf4f4f4);
const E1=stgSign('SCHELDT','CLOSED SINCE 1585','#f4e8c0','#2a2a6a',2.0),E2=stgSign('3 SHIPS','FROM ANTWERP','#f4e8c0','#8a1a2a',1.8),E3=stgSign('8 OCT 1784','ONE SHOT','#f4e8c0','#8a1a2a',1.8),E4=stgSign('TREATY OF','FONTAINEBLEAU','#f4e8c0','#2a6a2a',2.0)
const SH={hook:stgShot({env:'sea',props:[[SH1,-1.4,0,1.2,.8,.4],[SH2,1.6,0,.2,.8,-.4],[KT,0,0,3.0,1.2,0,(g,u)=>{g.position.y=Math.abs(Math.sin(u*5))*.15}]],tag:['A WAR WITH ONE SHOT','IT HIT A SOUP KETTLE']}),
s2:stgShot({env:'hall',who:[[EMP,0,1.8,0,'angry','point']],signs:[[E1,.2,3.2,1.2,.9,.2]]}),
s3:stgShot({env:'sea',who:[[DUT,0,1.8,0,'smug','hold']],props:[[SH1,0,0,-1.0,.7,.2]],signs:[[E1,0,3.6,1.0,.8,.2]]}),
s4:stgShot({env:'sea',props:[[SH1,-1.2,0,1.2,.7,.3],[SH2,1.2,0,.4,.7,-.3]],signs:[[E2,0,4.2,1.0,.9,.2]]}),
s5:stgShot({env:'sea',who:[[DUT,.9,1.8,-.4,'angry','point']],props:[[CN,-.8,0,2.4,1.3,.5]],cam:[0,2.2,6.4,0,1.4,1.7,56]}),
s6:stgShot({env:'sea',props:[[KT,0,0,2.6,2.0,0,(g,u)=>{g.rotation.z=Math.sin(u*14)*.2*Math.max(0,1-u)}]],stamp:'THE ONLY SHOT',sc:'#8a1a2a',stampAt:.5}),
s7:stgShot({env:'room',who:[[CK,-.9,1.8,.5,'shock','panic']],props:[[KT,.9,0,2.0,1.4,0]],signs:[[E3,0,3.4,1.0,.8,.3]]}),
s8:stgShot({env:'hall',who:[[EMP,-.9,1.8,.4,'sad','sad'],[DUT,.9,1.8,-.4,'smug','salute']],signs:[[E4,0,3.4,1.0,.9,.2]]})};
for(const k in SH)SHOTS['kettle_'+k]=SH[k];
SHOTS['kettlecover']=stgShot({env:'sea',props:[[SH1,-1.6,0,0,.7,.4],[KT,.5,0,2.4,2.2,0]],who:[[CK,-.5,1.6,.2,'shock','panic']],cam:[0,2.0,5.8,0,1.2,1.8,54]});
})();