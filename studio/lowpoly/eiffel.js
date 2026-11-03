// EIFFEL TOWER leans away from the sun (thermal expansion) + tallest-structure record.  Uses eiffel() from lust.js. Models: tower, sun, heat waves, ruler, Chrysler Building, year signs.
const EIFT=eiffel();
const EIFSUN=(()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshBasicMaterial({color:0xffd83a})));for(let i=0;i<12;i++){const c=cone(.2,.7,4,new THREE.MeshBasicMaterial({color:0xffb030}),Math.cos(i*.5236)*1.25,Math.sin(i*.5236)*1.25,0,g);c.rotation.z=i*.5236-Math.PI/2}S.add(g);ACT.push(g);return g})();
const EIFHEAT=[...Array(6)].map(()=>{const m=box(.8,.05,.05,new THREE.MeshBasicMaterial({color:0xff9a4a,transparent:true,opacity:.7}),0,0,0);m.visible=false;S.add(m);ACT.push(m);return m});
const EIFCH=(()=>{const g=new THREE.Group();box(2.4,6,2.4,M(0xc8ccd4),0,3,0,g);for(let i=0;i<5;i++){const w=2.0-i*.3;box(w,.9,w,M(0xdde0e8),0,6.4+i*.8,0,g)}cone(.2,2.4,6,M(0xdde0e8),0,10.8,0,g);for(let i=0;i<8;i++)box(2.5,.1,2.5,M(0x8a8a92),0,.8+i*.7,0,g);S.add(g);ACT.push(g);return g})();
const EIFFL=(()=>{const g=new THREE.Group();box(60,.1,40,M(0x8a9a6a),0,-.06,0,g);S.add(g);ACT.push(g);return g})();
const EIFSN=(a,b,bg,fg,w)=>{const s=kitSign2(a,b,bg||'#f4e8c0',fg||'#2a2a2a',w||1.7,.8,17);S.add(s);ACT.push(s);return s};
const EIFS1=EIFSN('UP TO 18 CM','AWAY FROM THE SUN','#f4e8c0','#8a1a2a',2.4),EIFS2=EIFSN('41 YEARS','TALLEST','#f4e8c0','#2a2a6a',1.7),EIFS3=EIFSN('1930','CHRYSLER BUILDING','#f4e8c0','#2a2a2a',2.2);
const _eifh=hideAll;hideAll=function(){_eifh();EIFT.rotation.set(0,0,0);EIFT.scale.setScalar(1);EIFHEAT.forEach(m=>m.visible=false)};
function eiEnv(){kitEnv(0xbfe0f6,1.3,0xdceef8);show(EIFFL)}
const EIH={
e_hook:(u,d,k)=>{eiEnv();show(EIFT,EIFSUN);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);EIFT.rotation.z=-.12*Math.sin(Math.min(1,u/(d*.8))*Math.PI/2);EIFSUN.position.set(-4.2,4.2,-2);EIFSUN.scale.setScalar(.9);EIFSUN.rotation.z=u*.3;window.TAG('THE EIFFEL TOWER','LEANS AWAY FROM THE SUN','#ffd83a');camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_heat:(u,d,k)=>{eiEnv();show(EIFT,EIFSUN,...EIFHEAT);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);EIFSUN.position.set(-4.2,4.2,-2);EIFSUN.scale.setScalar(.9);EIFHEAT.forEach((m,i)=>{m.visible=true;const a=((u*1.2+i/6)%1);m.position.set(-3+a*2.0,4.6-a*2.4+i*.25,0);m.rotation.z=-.7});window.STAMP={on:1,u:u-.4,text:'HEATED METAL',c:'#c4202a',rot:-4};camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_exp:(u,d,k)=>{eiEnv();show(EIFT,EIFSUN);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);EIFSUN.position.set(-4.2,4.2,-2);EIFSUN.scale.setScalar(.9);window.TAG('THE METAL','EXPANDS','#ff9a5a');EIFT.rotation.z=-.12;camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_cm:(u,d,k)=>{eiEnv();show(EIFT,EIFSUN);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);EIFT.rotation.z=-.12*Math.abs(Math.sin(u*1.2));EIFSUN.position.set(-4.2,4.2,-2);EIFSUN.scale.setScalar(.9);window.STAMP={on:1,u:u-.4,text:'UP TO 18 CM',c:'#8a1a2a',rot:-4};camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_tall:(u,d,k)=>{eiEnv();show(EIFT);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);window.STAMP={on:1,u:u-.4,text:'TALLEST BY FAR',c:'#2a2a6a',rot:-4};camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_chr:(u,d,k)=>{eiEnv();show(EIFT,EIFCH);EIFT.position.set(-3.0,0,0);EIFT.scale.setScalar(.9);EIFCH.position.set(3.4,0,0);EIFCH.scale.setScalar(.8);window.STAMP={on:1,u:u-.4,text:'1930',c:'#2a2a6a',rot:-4};camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)},
e_end:(u,d,k)=>{eiEnv();show(EIFT);EIFT.position.set(0,0,0);EIFT.scale.setScalar(1.0);window.TAG('NOW 2ND TALLEST','IN FRANCE','#ffd83a');camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],k,60)}
};
Object.assign(SHOTS,EIH);
Object.assign(SHOTS,{eifcover:(u,d,k)=>{eiEnv();show(EIFT,EIFSUN);EIFT.position.set(0,0,0);EIFT.scale.setScalar(.85);EIFT.rotation.z=-.07;EIFSUN.position.set(-3.6,7.0,-1.5);EIFSUN.scale.setScalar(.9);camTo([0,3.6,12.0],[0,3.6,11.4],[0,3.2,0],[0,3.2,0],0,60)}});
