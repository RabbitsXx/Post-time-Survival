// ===== RIGGED CAST: Mixamo "Xbot" skeleton + mesh (three.js examples), painted as clothed people, toon + inverted-hull outline, my toon faces on the head bone =====
const RIG={};
async function loadRig(){RIG.g=await new GLTFLoader().loadAsync('models/Xbot.glb');RIG.clips={};RIG.g.animations.forEach(a=>RIG.clips[a.name]=a)}
const _v=new THREE.Vector3(),_v2=new THREE.Vector3(),_q=new THREE.Quaternion(),_q2=new THREE.Quaternion(),_q3=new THREE.Quaternion(),_m=new THREE.Matrix4();
const OUTR=(th)=>{const m=new THREE.MeshBasicMaterial({color:0x120a08,side:THREE.BackSide});m.onBeforeCompile=sh=>{sh.uniforms.uTh={value:th};sh.vertexShader='uniform float uTh;\n'+sh.vertexShader.replace('#include <skinning_vertex>','#include <skinning_vertex>\n vec3 oN=normalize(normal);\n#ifdef USE_SKINNING\n mat4 skM=skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW;skM=bindMatrixInverse*skM*bindMatrix;oN=normalize((skM*vec4(oN,0.)).xyz);\n#endif\n transformed += oN*uTh;')};return m};
function paintRig(geo,bones,cfg){const pos=geo.attributes.position,si=geo.attributes.skinIndex,sw=geo.attributes.skinWeight,n=pos.count,col=new Float32Array(n*3);
 const C=(h)=>new THREE.Color(h);const skin=C(cfg.skin),shirt=C(cfg.shirt),pants=C(cfg.pants),shoe=C(cfg.shoe||0x1a1a1a),coat=cfg.coat?C(cfg.coat):null,blood=C(0x5a080c),tagc=C(0xf2eee0);
 const blobs=cfg.blood||[];
 for(let i=0;i<n;i++){let bi=si.getX(i),bw=sw.getX(i);for(let k=1;k<4;k++){const w=[sw.getX,sw.getY,sw.getZ,sw.getW][k].call(sw,i);if(w>bw){bw=w;bi=[si.getX,si.getY,si.getZ,si.getW][k].call(si,i)}}
  const B=bones[bi].name.replace('mixamorig','');const x=Math.abs(pos.getX(i)),y=pos.getY(i),z=pos.getZ(i);let c=skin;
  if(/^(Head|Neck|HeadTop|LeftEye|RightEye)/.test(B))c=skin;
  else if(/Hand/.test(B))c=skin;
  else if(/ForeArm/.test(B))c=cfg.sleeve==='long'?shirt:skin;
  else if(/Arm$|Shoulder/.test(B))c=(x<.3||cfg.sleeve==='long')?shirt:skin;
  else if(/Spine/.test(B))c=y>1.455?skin:shirt;
  else if(B==='Hips')c=y>1.065?shirt:(coat&&y>.7?coat:pants);
  else if(/UpLeg|Leg$/.test(B))c=(coat&&y>.62)?coat:pants;
  else if(/Foot|Toe/.test(B))c=y<.105?shoe:pants;
  if(cfg.tag&&B.startsWith('Spine')&&Math.abs(pos.getX(i)-.09)<.03&&Math.abs(y-1.36)<.016&&z>0)c=tagc;
  let r=c.r,g=c.g,b=c.b;for(const bl of blobs){const d=Math.hypot(pos.getX(i)-bl[0],y-bl[1],z-bl[2]);if(d<bl[3]){const t=1-d/bl[3];const f=Math.min(1,t*1.8);r+=(blood.r-r)*f;g+=(blood.g-g)*f;b+=(blood.b-b)*f}}
  col[i*3]=r;col[i*3+1]=g;col[i*3+2]=b}
 geo.setAttribute('color',new THREE.BufferAttribute(col,3))}
function riggedPerson(cfg){cfg=Object.assign({},cfg,{rigged:true});const S=cfg.s||1,W=cfg.w||1;const root=new THREE.Group(),U={};root.userData=U;U.cfg=cfg;U.rig=true;
 const sc=SkeletonUtils.clone(RIG.g.scene);root.add(sc);sc.updateMatrixWorld(true);U.sc=sc;
 const bone={};sc.traverse(o=>{if(o.isBone)bone[o.name.replace('mixamorig','')]=o});U.bone=bone;
 const th=.011/(S*.99);let skinned=[];
 sc.traverse(o=>{if(o.isSkinnedMesh)skinned.push(o)});
 for(const o of skinned){if(o.name==='Beta_Joints'){o.visible=false;continue}
  o.geometry=o.geometry.clone();paintRig(o.geometry,o.skeleton.bones,cfg);
  o.material=new THREE.MeshToonMaterial({vertexColors:true,gradientMap:GM});o.frustumCulled=false;
  const ol=new THREE.SkinnedMesh(o.geometry,OUTR(th));ol.bind(o.skeleton,o.bindMatrix);ol.frustumCulled=false;o.parent.add(ol)}
 // face mount on head bone (bind pose placement)
 const hb=bone.Head;const mount=new THREE.Group();U.hs=mount;
 const want=new THREE.Matrix4().compose(new THREE.Vector3(0,1.647,-.002),new THREE.Quaternion(),new THREE.Vector3(.34,.34,.34));const rel=new THREE.Matrix4().copy(hb.matrixWorld).invert().multiply(want);rel.decompose(mount.position,mount.quaternion,mount.scale);hb.add(mount);
 buildFace(U,cfg,mount,cfg.skin);
 if(cfg.headScale)hb.scale.setScalar(cfg.headScale);
 sc.scale.set(S*W,S,S*Math.min(1.1,W));
 U.mix=new THREE.AnimationMixer(sc);U.act={};for(const k of['idle','walk','run','sad_pose','sneak_pose','agree']){const c=RIG.clips[k];if(c){const a=U.mix.clipAction(c);a.play();a.setEffectiveWeight(0);U.act[k]=a}}
 root.traverse(o=>{o.layers.set(1)});
 return root}
const _AX=new THREE.Vector3(1,0,0),_AY=new THREE.Vector3(0,1,0),_AZ=new THREE.Vector3(0,0,1);
function rotBoneW(b,axisW,ang){b.parent.getWorldQuaternion(_q);b.getWorldQuaternion(_q2);_q3.setFromAxisAngle(axisW,ang);_q2.premultiply(_q3);b.quaternion.copy(_q.invert().multiply(_q2));b.updateMatrixWorld(true)}
function aimBone(b,child,dirChar,rq){b.updateWorldMatrix(true,false);b.getWorldPosition(_v);child.getWorldPosition(_v2);const cur=_v2.sub(_v).normalize();const tgt=dirChar.clone().normalize().applyQuaternion(rq);_q3.setFromUnitVectors(cur,tgt);b.getWorldQuaternion(_q2);_q2.premultiply(_q3);b.parent.getWorldQuaternion(_q);b.quaternion.copy(_q.invert().multiply(_q2));b.updateMatrixWorld(true)}
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
const ARMPOSE={
 idle:(sx,t)=>[V3(.12*sx,-1,-.02),V3(.1*sx,-.92,.3)],
 scared:(sx,t)=>[V3(.3*sx,-.5,.6),V3(-.2*sx,.8,.55)],
 reach:(sx,t)=>[V3(.14*sx,-.2,.97),V3(.07*sx,-.12+Math.sin(t*2)*.04,1)],
 hands:(sx,t)=>[V3(.42*sx,-.5,.6),V3(.12*sx,-.05,1)],
 hold:(sx,t)=>[V3(.2*sx,-.7,.5),V3(-.35*sx,-.2,1)]};
function animRigged(g,t,st){const U=g.userData,sc=U.sc,act=st.act||'idle',ph=(st.seed||0)*1.7;
 let clip='idle',ct=t+ph;if(act==='walk'||act==='run'){clip=act;ct=t}else if(U.isZ&&st.moving){clip='walk';ct=t*.55}
 for(const k in U.act)U.act[k].setEffectiveWeight(k===clip?1:0);U.mix.setTime(ct);sc.updateMatrixWorld(true);
 g.getWorldQuaternion(_q3);const rq=_q3.clone();const B=U.bone;const sp=st.speaking;
 const axX=_AX.clone().applyQuaternion(rq),axY=_AY.clone().applyQuaternion(rq),axZ=_AZ.clone().applyQuaternion(rq);
 // torso lean
 let lean=U.isZ?.42:act==='scared'?-.1:0;if(act==='run')lean=.22;
 if(lean){rotBoneW(B.Spine,axX,lean*.4);rotBoneW(B.Spine1,axX,lean*.35);rotBoneW(B.Spine2,axX,lean*.25)}
 if(U.isZ){rotBoneW(B.Spine1,axZ,Math.sin(t*.9+ph)*.07);rotBoneW(B.Neck,axX,-.3);rotBoneW(B.Head,axZ,.22+Math.sin(t*1.1+ph)*.1)}
 // arms
 let pose=null;if(act==='scared')pose='scared';else if(act==='reach')pose='reach';else if(act==='hands')pose='hands';else if(act==='idle'||act==='point'||act==='shush'){pose='idle'}
 if(pose){for(const sx of[1,-1]){const S=sx>0?'Left':'Right';let [u,f]=ARMPOSE[pose](sx,t);
   if(act==='point'&&sx<0){u=V3(-.12,-.05,1);f=V3(-.06,0,1)}
   if(act==='shush'&&sx<0){u=V3(-.25,-.5,.6);f=V3(.05,.85,.55)}
   if(sp&&act==='idle'&&sx<0){u=V3(-.3+Math.sin(t*4.2+ph)*.12,-.6,.55);f=V3(-.1+Math.sin(t*3.3+ph)*.12,.25+Math.sin(t*5.1+ph)*.2,1)}
   aimBone(B[S+'Arm'],B[S+'ForeArm'],u,rq);aimBone(B[S+'ForeArm'],B[S+'Hand'],f,rq)}}
 // head look
 if(st.look)rotBoneW(B.Head,axY,st.look*.35);if(sp&&act==='idle'){rotBoneW(B.Head,axY,Math.sin(t*1.9+ph)*.08);rotBoneW(B.Head,axX,Math.sin(t*3.3+ph)*.04)}
 const open=sp?Math.abs(Math.sin(t*11+ph))*(.55+.45*Math.sin(t*2.7+ph)):(U.isZ?(.35+Math.abs(Math.sin(t*1.6+ph))*.5):0);setExpr(U,st.expr||'calm',open);if(U.jaw){U.jaw.position.y=-.28-open*.1;U.jaw.rotation.x=open*.4}}

function riggedZombie(cfg){const g=riggedPerson(Object.assign({skin:0x7d8c76,shirt:0x3d6b45,pants:0x2a2a30,shoe:0x14120e,hair:'none',s:1.0,w:.95,tag:1,blood:[[.06,1.4,.09,.16],[-.08,1.28,.1,.1],[.1,1.52,.06,.1],[-.2,1.0,.05,.12]]},cfg||{}));const U=g.userData;U.isZ=true;zombieFace(U,U.hs);g.traverse(o=>o.layers.set(1));return g}
const RCAST={
 mimi:()=>riggedPerson({s:.94,w:.92,skin:0xe8b898,shirt:0x2fa86a,pants:0x2a2e3a,shoe:0x1a1a1a,hair:'bun',hc:0x8a3a22,tag:1,sleeve:'short'}),
 gus:()=>riggedPerson({s:1.03,w:1.22,skin:0xc8946a,shirt:0x2a3a5a,pants:0x1a2030,shoe:0x0e0e12,hair:'cap',hc:0x1a2a4a,stache:0x2a1c12,badge:1,sleeve:'short'}),
 teddy:()=>riggedPerson({s:.74,w:.9,headScale:1.3,skin:0xe8bc94,shirt:0xe84a4a,pants:0x2a3a6a,shoe:0xf0f0f0,hair:'messy',hc:0x5a3418,sleeve:'short'}),
 vance:()=>riggedPerson({s:1.0,w:1.0,skin:0x8a5a3c,shirt:0xe6e2d6,coat:0xe6e2d6,pants:0x3a4a5a,shoe:0x2a2018,hair:'grey',hc:0xa8a8a8,beard:0xa8a8a8,glasses:1,sleeve:'long'}),
 rosa:()=>riggedPerson({s:.96,w:.95,skin:0xc8906a,shirt:0x8a4aa8,pants:0x3a3040,shoe:0x222222,hair:'bun',hc:0x2a1a14,sleeve:'short'}),
 z1:()=>riggedZombie({shirt:0x3d6b45,hair:'messy',hc:0x2a2418,sleeve:'short'}),
 z2:()=>riggedZombie({s:1.05,w:1.1,shirt:0x6a4038,hair:'grey',hc:0x44403a,sleeve:'long'}),
 z3:()=>riggedZombie({s:.95,w:.9,shirt:0x34506a,hair:'none',sleeve:'short'}),
 z4:()=>riggedZombie({s:1.1,w:1.2,shirt:0x424a30,pants:0x30302a,hair:'cap',hc:0x1a2a1a,sleeve:'long'})};
