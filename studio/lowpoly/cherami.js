(()=>{
function pigeon(){const g=new THREE.Group();const gr=M(0x8a8a98),dk=M(0x4a4a58),wh=M(0xe8e8f0);const b=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),gr);b.scale.set(1,.85,1.4);b.position.y=.9;g.add(b);const bl=new THREE.Mesh(new THREE.SphereGeometry(.36,10,8),wh);bl.scale.set(.9,.8,1);bl.position.set(0,.82,.35);g.add(bl);
const h=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),dk);h.position.set(0,1.38,.52);g.add(h);cone(.08,.3,4,M(0xf0c030),0,1.33,.86,g).rotation.x=Math.PI/2;
for(const sx of[-1,1]){const w=box(.7,.08,.7,dk,sx*.55,.98,-.1,g);w.rotation.z=sx*.3;g.userData['w'+sx]=w;const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,1),M(0xf08a20));e.position.set(sx*.14,1.45,.74);g.add(e);const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.035,0),M(0x111111));p.position.set(sx*.14,1.45,.8);g.add(p)}
box(.3,.05,.6,dk,0,.85,-.9,g);for(const sx of[-1,1])box(.04,.3,.04,M(0xe08a8a),sx*.15,.45,0,g);cyl(.1,.1,.2,6,M(0xc8c8d0),.25,.6,.2,g);S.add(g);ACT.push(g);return g}
const PIG=pigeon();
const SOL=[0,1,2].map(i=>{const P=stgPerson('#7a8a5a','#6a7a4a',['#3a2418','#6a4220','#2a1c14'][i],['#e8b894','#dca47e','#d49a74'][i]);stgHat(P,'helmet',0x5a6a3a);return P});
const MED=stgPerson('#f4f4f4','#3a3a4a','#4a3020','#e8b894');
const C1=stgSign('600 BIRDS','PIGEON SERVICE','#f4e8c0','#2a2a6a',2.0),C2=stgSign('LOST','BATTALION','#f4e8c0','#8a1a2a',1.8),C3=stgSign('25 MILES','25 MINUTES','#f4e8c0','#2a6a2a',1.9),C4=stgSign('CROIX DE','GUERRE','#f4e8c0','#2a2a6a',1.8),C5=stgSign('NOT A','DSC','#f4e8c0','#8a1a2a',1.5)
const flap=(g,u)=>{g.userData.w1.rotation.z=.3+Math.sin(u*14)*.6;g.userData['w-1'].rotation.z=-.3-Math.sin(u*14)*.6}
const SH={hook:stgShot({env:'field',props:[[PIG,0,1.0,2.2,1.1,0,flap]],tag:['A PIGEON','WAR HERO']}),
s2:stgShot({env:'field',props:[[PIG,0,0.0,2.4,1.1,0.5,flap]],signs:[[C1,0,3.8,1.0,.9,.2]]}),
s3:stgShot({env:'night',who:[[SOL[0],-.9,1.8,.4,'sweat','panic'],[SOL[1],.9,1.8,-.4,'sweat','panic']],signs:[[C2,0,3.3,1.0,.9,.2]]}),
s4:stgShot({env:'night',props:[[PIG,.2,1.0,2.3,1.1,0.3,flap]],stamp:'SHOT AND INJURED',sc:'#c4202a',stampAt:.5}),
s5:stgShot({env:'field',props:[[PIG,0,1.0,2.4,1.1,0,flap]],signs:[[C3,0,3.8,1.0,.9,.2]]}),
s6:stgShot({env:'room',who:[[MED,-.8,1.8,.4,'happy','hold'],[SOL[2],.8,1.8,-.4,'happy','cheer']],props:[[PIG,0,1.0,2.6,0.8,0.2]],cam:[0,2.0,6.6,0,1.4,1.8,58]}),
s7:stgShot({env:'hall',props:[[PIG,0,0.4,2.4,1.1,0.2]],signs:[[C4,0,3.4,1.0,.9,.2]]}),
s8:stgShot({env:'room',props:[[PIG,0,0.4,2.4,1.1,0.2]],signs:[[C5,0,3.3,1.0,.9,.2]]})};
for(const k in SH)SHOTS['cherami_'+k]=SH[k];
SHOTS['cheramicover']=stgShot({env:'field',props:[[PIG,0,1.0,2.0,1.1,0.3]],cam:[0,2.2,5.6,0,1.8,1.8,52]});
})();