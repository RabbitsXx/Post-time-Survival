// ===== v5 people: proper human proportions, plaid shirt / dress textures, ink outline (channel line-art look) =====
for(const k in P3CFG)delete P3CFG[k];
Object.assign(P3CFG,{
 man:{skin:'#d6a27c',top:{t:'plaid',a:'#6a4a2a',b:'#2a1a10'},pants:'#cdbd96',shoes:'#e8e8e8',hair:'short',hc:'#2a1c14',w:1,h:1,sleeve:.34},
 woman:{skin:'#e2b896',top:{t:'dress',a:'#c4552a',b:'#8a3014'},pants:'#e8e8e8',shoes:'#3a2a20',hair:'long',hc:'#3a2418',w:.92,h:.95,dress:1,sleeve:.3},
 womanZ:{skin:'#8aa878',top:{t:'dress',a:'#c4552a',b:'#8a3014'},pants:'#e8e8e8',shoes:'#3a2a20',hair:'long',hc:'#1a2a18',w:.92,h:.95,dress:1,sleeve:.3,zombie:1},
 manB:{skin:'#c89468',top:{t:'plaid',a:'#4a6a4a',b:'#1a2a1a'},pants:'#8a8466',shoes:'#e8e8e8',hair:'short',hc:'#1a1410',w:1.04,h:1.02,sleeve:.34},
 kid:{skin:'#e8c4a0',top:{t:'solid',a:'#e8c82a'},pants:'#3a5aa8',shoes:'#c82a2a',hair:'long',hc:'#1a1a1a',w:.8,h:.7,sleeve:.3}});
function clothTex(top){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle=top.a;x.fillRect(0,0,64,64);
 if(top.t==='plaid'){x.fillStyle=top.b;x.globalAlpha=.55;for(let i=0;i<64;i+=16){x.fillRect(i,0,6,64);x.fillRect(0,i,64,6)}x.globalAlpha=.9;x.fillRect(0,0,64,2);x.fillRect(0,0,2,64);x.globalAlpha=.3;x.fillStyle='#f4ead0';for(let i=8;i<64;i+=16){x.fillRect(i,0,2,64)}}
 else if(top.t==='dress'){x.fillStyle=top.b;x.globalAlpha=.5;for(let i=0;i<64;i+=16)x.fillRect(0,i+12,64,3);x.globalAlpha=.25;x.fillStyle='#ffd9a0';for(let i=0;i<64;i+=8)x.fillRect(i,0,1,64)}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;return t}
function inkOutline(g,k){const ol=new THREE.MeshBasicMaterial({color:0x0a0806,side:THREE.BackSide,fog:true});const list=[];g.traverse(o=>{if(o.isMesh&&!o.userData.noOL)list.push(o)});
 list.forEach(m=>{const o=new THREE.Mesh(m.geometry,ol);o.position.copy(m.position);o.rotation.copy(m.rotation);o.scale.copy(m.scale).multiplyScalar(k||1.07);o.userData.noOL=1;m.parent.add(o)})}
function makePerson(cfg){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c}),sk=M(cfg.skin);
 const ct=clothTex(cfg.top),sh=new THREE.MeshLambertMaterial({map:ct}),pa=M(cfg.pants);ct.repeat.set(2,1.5);
 const add=(geo,m,x,y,z,par,rot)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);if(rot)o.rotation.set(rot[0],rot[1],rot[2]);(par||g).add(o);return o};
 const B=(w,h,d)=>new THREE.BoxGeometry(w,h,d),C=(a,b,h,s)=>new THREE.CylinderGeometry(a,b,h,s||8);
 const body=new THREE.Group();g.add(body);
 const torso=add(C(.2,.17,.62,8),sh,0,1.12,0,body);torso.scale.set(1.2*cfg.w,1,.72);
 const legs=[];for(const s of[-1,1]){const p=new THREE.Group();p.position.set(s*.1*cfg.w,.82,0);body.add(p);
  if(cfg.dress){add(C(.062,.05,.46,7),sk,0,-.23,0,p);add(C(.05,.045,.36,7),M('#f2f2ee'),0,-.62,0,p)}else add(C(.085,.062,.8,8),pa,0,-.4,0,p);
  add(B(.1,.07,.22),M(cfg.shoes),0,-.84,.045,p);legs.push(p)}
 if(cfg.dress){const sk2=add(C(.19,.37,.52,12),sh,0,.56,0,body);sk2.scale.set(cfg.w,1,.9)}
 add(C(.05,.05,.1,6),sk,0,1.46,0,body);
 const arms=[];for(const s of[-1,1]){const p=new THREE.Group();p.position.set(s*(.27*cfg.w+.06),1.38,0);body.add(p);
  add(C(.065,.058,cfg.sleeve,7),sh,0,-cfg.sleeve/2,0,p);const fl=.62-cfg.sleeve-.1;add(C(.05,.042,fl,6),sk,0,-cfg.sleeve-fl/2,0,p);add(B(.07,.1,.045),sk,0,-cfg.sleeve-fl-.04,0,p);arms.push(p)}
 const head=new THREE.Group();head.position.set(0,1.5,0);body.add(head);const F=faceTex(cfg);const fm=new THREE.MeshLambertMaterial({map:F.t});
 const hm=M(cfg.zombie?cfg.skin:cfg.skin);const hb=add(B(.33,.37,.34),[hm,hm,hm,hm,fm,hm],0,.2,0,head);
 add(B(.05,.07,.05),sk,0,.17,.2,head);add(B(.03,.08,.06),sk,.18,.2,0,head);add(B(.03,.08,.06),sk,-.18,.2,0,head);
 const hc=M(cfg.hc);
 add(B(.36,.09,.38),hc,0,.41,0,head);add(B(.36,.07,.05),hc,0,.37,.18,head);
 if(cfg.hair==='long'){add(B(.38,.62,.1),hc,0,.12,-.18,head);add(B(.06,.46,.22),hc,.19,.1,-.04,head);add(B(.06,.46,.22),hc,-.19,.1,-.04,head)}
 else{add(B(.36,.3,.08),hc,0,.26,-.18,head);add(B(.04,.12,.2),hc,.18,.3,-.02,head);add(B(.04,.12,.2),hc,-.18,.3,-.02,head)}
 inkOutline(g,1.06);
 g.scale.setScalar(cfg.h);g.userData={dyn:1,parts:{body,torso,legs,arms,head,F,cfg}};
 const bl=new THREE.Mesh(new THREE.CircleGeometry(.45*cfg.w,14),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.45,depthWrite:false}));bl.rotation.x=-Math.PI/2;bl.position.y=.02;bl.userData.dyn=1;g.userData.blob=bl;
 drawFace(F,cfg,'smile');g.visible=false;bl.visible=false;S.add(g);S.add(bl);return g}
