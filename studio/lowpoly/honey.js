(()=>{
function beeTree(){const g=new THREE.Group();cyl(.25,.32,2.2,7,M(0x6a4a2a),0,1.1,0,g);const f=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2,0),M(0x3a7a3a));f.position.y=2.9;g.add(f);box(.5,.6,.5,M(0xe8b830),.35,1.7,.3,g);cyl(.04,.04,.4,5,M(0x2a1a0a),.35,1.3,.3,g);S.add(g);ACT.push(g);return g}
const BT=beeTree(),BT2=beeTree();
function fork(){const g=new THREE.Group();cyl(.03,.03,1.8,5,M(0x8a6a3a),0,.9,0,g);for(const x of[-.12,0,.12])cyl(.015,.015,.4,4,M(0x6a6a70),x,1.9,0,g);box(.28,.03,.03,M(0x6a6a70),0,1.72,0,g);S.add(g);ACT.push(g);return g}
const FK=fork();
function hive(){const g=new THREE.Group();for(let i=0;i<4;i++)cyl(.4-i*.05,.45-i*.05,.2,9,M(0xe8b830),0,.1+i*.2,0,g);S.add(g);ACT.push(g);return g}
const HV=hive();
const IOW=stgPerson('#8a5a3a','#3a4a6a','#3a2418','#d49a74');stgHat(IOW,'straw',0xe8c860);
const MOS=stgPerson('#3a3a4a','#2a2a3a','#2a1c14','#e8b894',{stache:'#2a1c14'});stgHat(MOS,'slouch',0x2a2a30);
const GEN=stgPerson('#1c2a5c','#1c2a5c','#d8d8d8','#efc2a2');stgHat(GEN,'cap',0x1c2a5c);
const H1=stgSign('IOWA','vs MISSOURI','#f4e8c0','#8a1a2a',1.7),H2=stgSign('SAME','STRIP OF LAND','#f4e8c0','#2a2a6a',1.9),H3=stgSign('SHERIFF','JAILED','#f4e8c0','#8a1a2a',1.7),H4=stgSign('3 BEE','TREES','#f4e8c0','#8a5a10',1.6),H5=stgSign('NO ONE','KILLED','#f4e8c0','#2a6a2a',1.7),H6=stgSign('SUPREME','COURT 1849','#f4e8c0','#2a2a6a',1.9)
const SH={hook:stgShot({env:'field',props:[[BT,-1.2,0,1.0,1.0,0],[BT2,1.4,0,.4,.9,0],[HV,0,0,2.6,1.3,0,(g,u)=>{g.rotation.y=u*.8}]],tag:['IOWA & MISSOURI','FOUGHT THE HONEY WAR']}),
s2:stgShot({env:'field',who:[[IOW,-.9,1.8,.5,'angry','point'],[MOS,.9,1.8,-.5,'angry','point']],signs:[[H1,0,3.5,1.0,.8,.2]]}),
s3:stgShot({env:'paper',who:[[IOW,-.9,1.8,.5,'sweat','shrug'],[MOS,.9,1.8,-.5,'sweat','shrug']],signs:[[H2,0,3.3,1.0,.9,.2]]}),
s4:stgShot({env:'field',who:[[MOS,0,1.9,0,'smug','hold']],props:[[BT,1.8,0,0,.9,0]],signs:[[H3,-.2,3.4,1.0,.8,.5]]}),
s5:stgShot({env:'room',who:[[MOS,.9,1.9,-.4,'sad','sad']],props:[[FK,-.9,0,2.2,1.1,0]],stamp:'IN JAIL',sc:'#2a2a6a',stampAt:.5}),
s6:stgShot({env:'field',props:[[BT,-1.0,0,1.4,1.2,.2],[BT2,1.0,0,1.0,1.1,-.2],[HV,0,0,2.8,1.2,0]],signs:[[H4,0,4.2,1.0,.9,.2]]}),
s7:stgShot({env:'hill',who:[[IOW,-.9,1.8,.5,'angry','fight'],[MOS,.9,1.8,-.5,'angry','fight'],[GEN,0,3.6,0,'neutral','shrug']],signs:[[H5,0,3.6,1.0,.8,1.0]],cam:[0,2.2,7.0,0,1.4,1.7,58]}),
s8:stgShot({env:'hall',who:[[GEN,0,1.8,0,'smug','salute']],signs:[[H6,.2,3.1,1.2,.9,.2]]})};
for(const k in SH)SHOTS['honey_'+k]=SH[k];
SHOTS['honeycover']=stgShot({env:'field',props:[[BT,-1.0,0,1.8,1.2,0],[HV,.9,0,2.2,1.5,0]],who:[[IOW,-.1,1.4,.4,'angry','point']],cam:[0,2.0,5.8,0,1.3,1.8,54]});
})();