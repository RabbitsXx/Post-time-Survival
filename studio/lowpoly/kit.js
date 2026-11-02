// SHARED KIT for the batch-10 clips: environment helper, floor, tracers, dust trail, billboard marks (!, ?, ...), medal/hat helpers.
// Everything created here goes into ACT so hideAll() hides it every frame; each shot re-shows what it needs.
function kitEnv(bg,hemi,fogc){tkOff();ground.visible=false;S.background=new THREE.Color(bg);S.fog.color.set(fogc==null?bg:fogc);HEMI.intensity=hemi||1.2}
function kitFloor(color,w,d,o={}){const g=new THREE.Group();box(w||60,.1,d||60,M(color),0,-.06,0,g);
 if(o.stripe){for(let i=-6;i<=6;i++)box(w||60,.02,.5,M(o.stripe),0,0,i*(o.gap||3),g)}
 S.add(g);ACT.push(g);return g}
// tracers (bullets)
const KTR=[...Array(18)].map(()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.05,.05,.7),new THREE.MeshBasicMaterial({color:0xffe860}));m.visible=false;S.add(m);ACT.push(m);return m});
function kitTracers(u,t0,from,dir,n,rate,speed,life){KTR.forEach(m=>m.visible=false);for(let i=0;i<n&&i<KTR.length;i++){const t=u-t0-i/rate;if(t<0||t>(life||.55))continue;const m=KTR[i];m.visible=true;m.position.set(from[0]+dir[0]*speed*t,from[1]+dir[1]*speed*t,from[2]+dir[2]*speed*t);m.lookAt(m.position.x+dir[0],m.position.y+dir[1],m.position.z+dir[2])}}
// dust trail behind a moving emitter: emit(t)->[x,y,z]
const KDU=[...Array(16)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.3,0),new THREE.MeshBasicMaterial({color:0xe3cf9e,transparent:true,opacity:.7}));m.visible=false;S.add(m);ACT.push(m);return m});
function kitDust(emit,u,life,size){life=life||1.1;KDU.forEach((m,i)=>{const a=(u*1.2+i/KDU.length)%1;const t=u-a*life;if(t<0){m.visible=false;return}const p=emit(t);m.visible=true;m.position.set(p[0]+Math.sin(i*2.3)*.25,p[1]+a*.9,p[2]+Math.cos(i*1.7)*.25);m.scale.setScalar((size||1)*(.4+a*1.6));m.material.opacity=.7*(1-a)})}
// billboard marks: '!' '?' '...' etc.
const KMK={};function kitMark(txt,col,bg){const k=txt+col+bg;if(KMK[k])return KMK[k];const t=ctex(128,128,(x,w,h)=>{x.fillStyle=bg||'#ffffff';x.beginPath();x.arc(64,64,58,0,7);x.fill();x.lineWidth=8;x.strokeStyle='#111';x.stroke();x.fillStyle=col||'#c4202a';x.font='bold '+(txt.length>2?44:84)+'px RC,Arial';x.textAlign='center';x.fillText(txt,64,txt.length>2?78:90)});t.generateMipmaps=false;const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide}));m.visible=false;S.add(m);ACT.push(m);return KMK[k]=m}
function kitMarkAt(m,x,y,z,s,rot){m.visible=true;m.position.set(x,y,z);m.scale.setScalar(s);m.quaternion.copy(cam.quaternion);if(rot)m.rotation.z+=rot}
// sky puffs / generic pop scale: damped spring after t0
function kitPop(u,t0,a,b){const x=u-t0;if(x<0)return .001;return 1+(a==null?.25:a)*Math.exp(-x*(b||8))*Math.cos(x*22)}
// wheat / grass tufts (instanced) in a rectangle, avoiding nothing (low, below knees)
function kitTufts(n,x0,x1,z0,z1,cols,h,seed){const im=new THREE.InstancedMesh(new THREE.ConeGeometry((h||.5)*.13,h||.5,4),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),n);const m4=new THREE.Matrix4(),c=new THREE.Color();
 for(let i=0;i<n;i++){const x=x0+(x1-x0)*rn((seed||0)+i*3+1),z=z0+(z1-z0)*rn((seed||0)+i*5+2);m4.makeTranslation(x,(h||.5)/2,z);im.setMatrixAt(i,m4);c.set(cols[i%cols.length]);im.setColorAt(i,c)}
 im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;const g=new THREE.Group();g.add(im);S.add(g);ACT.push(g);return g}
// generic hats (added to a person's head)
function kitSlouch(P,col){const c=new THREE.Group();const m=M(col||0x7a6a3a);cyl(.36,.36,.025,14,m,0,.13,0,c);cyl(.17,.19,.15,12,m,0,.22,0,c);cyl(.19,.19,.04,12,M(0x3a2a14),0,.16,0,c);const up=box(.3,.02,.2,m,-.33,.2,0,c);up.rotation.z=.6;c.position.y=-.02;P.head.add(c);return c}
function kitHelmet(P,col){const c=new THREE.Group();const m=M(col||0x5a6a3a);const d=new THREE.Mesh(new THREE.SphereGeometry(.23,12,8,0,Math.PI*2,0,Math.PI/2),m);d.scale.set(1.0,.9,1.05);d.position.y=.07;c.add(d);cyl(.3,.3,.02,14,m,0,.08,0,c);P.head.add(c);return c}
function kitMedal(col){const g=new THREE.Group();box(.07,.34,.02,M(0xc4202a),0,0,0,g);const d=cyl(.1,.1,.03,10,M(col||0xf0c030),0,-.24,.01,g);d.rotation.x=Math.PI/2;return g}
// a clean signboard on a post: returns group; sign face front +z
function kitPost(txt,bg,fg,w,h,fs,hgt){const g=new THREE.Group();cyl(.05,.05,hgt||1.4,6,M(0x6a4a2a),0,(hgt||1.4)/2,0,g);const s=paSign(txt,bg,fg,w,h,fs);s.position.set(0,(hgt||1.4)+h/2-.1,.06);g.add(s);box(w+.1,h+.1,.05,M(0x3a2a1a),0,(hgt||1.4)+h/2-.1,0,g);S.add(g);ACT.push(g);return g}

// instanced pawn crowd: kitCrowd(n, palette, headColor) -> group; set positions with crowd.userData.place(i,x,y,z) then crowd.userData.setN(n)
function kitCrowd(n,pal,bodyH){const bh=bodyH||.17;const body=new THREE.InstancedMesh(new THREE.ConeGeometry(.075,bh,6),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),n);const head=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.05,0),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),n);
 const m4=new THREE.Matrix4(),col=new THREE.Color();const g=new THREE.Group();g.add(body,head);body.count=head.count=0;
 g.userData={body,head,place(i,x,y,z){m4.makeTranslation(x,y+bh/2,z);body.setMatrixAt(i,m4);m4.makeTranslation(x,y+bh+.04,z);head.setMatrixAt(i,m4);col.set(pal[i%pal.length]);body.setColorAt(i,col);head.setColorAt(i,new THREE.Color(0xf0c8a0))},
  done(){body.instanceMatrix.needsUpdate=true;head.instanceMatrix.needsUpdate=true;body.instanceColor.needsUpdate=true;head.instanceColor.needsUpdate=true},setN(k){body.count=head.count=Math.max(0,Math.min(n,Math.floor(k)))}};
 S.add(g);ACT.push(g);return g}
function kitPot(P,col){const c=new THREE.Group();const m=M(col||0x8a8a94);const d=new THREE.Mesh(new THREE.SphereGeometry(.21,12,8,0,Math.PI*2,0,Math.PI/2),m);d.scale.set(1,.95,1.05);d.position.y=.06;c.add(d);cyl(.27,.27,.02,14,m,0,.07,0,c);P.head.add(c);return c}
function kitBucket(){const g=new THREE.Group();const wd=M(0x9a6a38);cyl(.5,.42,.7,12,wd,0,.35,0,g);for(const y of[.12,.38,.6])cyl(.52-(.6-y)*.12,.52-(.6-y)*.12,.06,12,M(0x3a3a40),0,y,0,g);
 const h=new THREE.Mesh(new THREE.TorusGeometry(.48,.03,5,14,Math.PI),M(0x3a3a40));h.position.y=.7;g.add(h);cyl(.46,.46,.02,12,M(0x2a1a0a),0,.69,0,g);S.add(g);ACT.push(g);return g}

function kitSign2(l1,l2,bg,fg,w,h,fs){const t=ctex(128,64,(x,W,H)=>{x.fillStyle=bg;x.fillRect(0,0,W,H);x.strokeStyle='#2a1a10';x.lineWidth=4;x.strokeRect(2,2,W-4,H-4);x.fillStyle=fg;x.font='bold '+(fs||22)+'px RC,Arial';x.textAlign='center';x.fillText(l1,W/2,H/2-4);x.fillText(l2,W/2,H/2+(fs||22)-2)});t.generateMipmaps=false;return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}))}
function kitBottle(col,lab,labcol){const g=new THREE.Group();const gm=new THREE.MeshLambertMaterial({color:col,flatShading:true});cyl(.11,.11,.42,9,gm,0,.21,0,g);cyl(.06,.11,.12,9,gm,0,.48,0,g);cyl(.04,.045,.18,8,gm,0,.63,0,g);cyl(.05,.05,.05,8,M(0xe8c040),0,.74,0,g);
 const l=new THREE.Mesh(new THREE.PlaneGeometry(.2,.2),new THREE.MeshBasicMaterial({map:ctex(32,32,(x,w,h)=>{x.fillStyle=labcol||'#f4f0e0';x.fillRect(0,0,w,h);x.fillStyle='#7a1a1a';x.font='bold 14px RC,Arial';x.textAlign='center';x.fillText(lab||'',w/2,h/2+5)})}));l.position.set(0,.22,.112);g.add(l);g.scale.setScalar(1.4);S.add(g);ACT.push(g);return g}
