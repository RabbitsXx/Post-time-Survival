(()=>{
function dog2(){const g=new THREE.Group();const m=M(0xe8e0d0),sp=M(0x6a4a30);box(.9,.45,.4,m,0,.55,0,g);box(.3,.2,.3,sp,0,.7,.1,g);box(.4,.38,.34,m,.55,.75,0,g);box(.12,.1,.14,M(0x2a1a10),.78,.7,0,g);box(.1,.2,.08,sp,.5,1.0,.14,g);box(.1,.2,.08,sp,.5,1.0,-.14,g);for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.IcosahedronGeometry(.05,1),M(0x111111));e.position.set(.72,.82,sx*.1);g.add(e)}for(const x of[-.3,.3])for(const z of[-.14,.14])box(.1,.35,.1,m,x,.18,z,g);const tl=box(.1,.2,.08,m,-.5,.75,0,g);g.userData.tl=tl;
const st=box(.7,.5,.02,M(0x4a6a3a),0,.62,.21,g);for(let i=0;i<3;i++)box(.1,.1,.03,M(0xf0c030),-.2+i*.2,.7,.23,g);const o=new THREE.Group();o.add(g);g.rotation.y=-Math.PI/2;o.userData=g.userData;S.add(o);ACT.push(o);return o}
const STB=dog2();
const CON=stgPerson('#7a8a5a','#6a7a4a','#3a2418','#e8b894');stgHat(CON,'helmet',0x5a6a3a);
const SGT=stgPerson('#7a8a5a','#6a7a4a','#6a4220','#dca47e',{stubble:1});stgHat(SGT,'helmet',0x5a6a3a);
const MUS=stgBlock(3,.3,1.6,0x6a6a72);
const D1=stgSign('YALE','1917','#f4e8c0','#2a2a6a',1.5),D2=stgSign('18 MONTHS','17 BATTLES','#f4e8c0','#2a2a6a',2.0),D3=stgSign('GAS ALERT','SAVED HIS UNIT','#f4e8c0','#8a1a2a',2.0),D4=stgSign('SERGEANT','STUBBY','#f4e8c0','#2a6a2a',1.9),D5=stgSign('SMITHSONIAN','MUSEUM','#f4e8c0','#2a2a6a',2.0)
const wag=(g,u)=>{g.userData.tl.rotation.z=Math.sin(u*14)*.6}
const SH={hook:stgShot({env:'field',props:[[STB,0,0,2.2,1.3,-.5,wag]],tag:['A STRAY DOG','BECAME A SERGEANT']}),
s2:stgShot({env:'field',props:[[STB,.8,0,2.4,1.3,-.6,wag]],who:[[SGT,-.9,1.8,.5,'happy','salute']],signs:[[D1,0,3.4,1.0,.9,.2]]}),
s3:stgShot({env:'street',props:[[STB,.8,0,2.4,1.3,-.6,wag]],who:[[CON,-.9,1.8,.5,'smug','hold']],stamp:'HIDDEN ON BOARD',sc:'#2a2a6a',stampAt:.5}),
s4:stgShot({env:'field',props:[[STB,0,0,2.2,1.3,-.4,wag]],signs:[[D2,0,3.4,1.0,.9,.2]]}),
s5:stgShot({env:'night',props:[[STB,0,0,2.2,1.3,-.4,wag]],who:[[CON,-.9,1.8,.5,'shock','panic']],signs:[[D3,.4,3.4,1.0,.9,.2]]}),
s6:stgShot({env:'field',props:[[STB,.8,0,2.4,1.3,-.6,wag]],who:[[SGT,-.9,1.8,.5,'happy','salute']],signs:[[D4,0,3.4,1.0,.9,.2]]}),
s7:stgShot({env:'hall',props:[[MUS,0,0,2.2,1.0,0],[STB,0,.3,2.2,1.3,-.2]],signs:[[D5,0,3.2,.8,.9,.2]]}),
s8:stgShot({env:'field',props:[[STB,0,0,2.2,1.3,-.4,wag]],stamp:'MOST DECORATED',sc:'#2a6a2a'})};
for(const k in SH)SHOTS['stubby_'+k]=SH[k];
SHOTS['stubbycover']=stgShot({env:'field',props:[[STB,0,0,2.0,1.3,-.3]],cam:[0,2.0,5.6,0,1.1,1.8,52]});
})();