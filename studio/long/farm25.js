/* ===== farm25: 2.5D for THE LAST HARVEST.  LOC.farm v='lane' = a dirt lane in one-point perspective (vanishing point VPX,VPY), corn rows and fence posts
   receding in depth, the barn at the end of the lane, blurred foreground stalks on the near layer (they slide faster than the world: real parallax).
   Mixed with the flat side-on sets (yard / porch / barn) that stay 2D.  Depth z: 1 = near plane (y=GY), larger = farther.  Python helper: farmlib.lane(X,z). ===== */
const LVPX=640,LVPY=398,LGY=720,lx=(X,z)=>LVPX+X/z,ly=z=>LVPY+(LGY-LVPY)/z;
const _farm=LOC.farm;
LOC.farm=(Z,p)=>{
 if(p.v!=='lane'){const up=_farm(Z,p);
  if(p.v==='yard'&&p.fgdepth!==false){const n=G(Z.near,{style:'filter:blur(5px)'});for(let i=0;i<9;i++){const x=(i<5?-40+i*45:1060+(i-5)*50)+rnd(i+3)*20;fCorn(n,x,760,230+rnd(i)*80,i,false)}
   const sw=n;return (u,t,bt)=>{up&&up(u,t,bt);A(sw,{transform:`translate(${Math.sin(t*1.1)*3} 0)`})}}
  return up}
 const f=G(Z.far),m=G(Z.mid),n=G(Z.near);const upd=[];
 R(f,-200,-100,1680,900,p.sky||'url(#gSkySoft)');fStars(f,30,200);fMoon(f,p.moonx||900,p.moony||150);fCloud(f,300,160,560,'#ffc9a8',.38);fCloud(f,980,230,640,'#e79a9a',.32);
 P(f,'M-200,404 Q100,330 380,392 T800,372 T1200,396 T1500,380 L1500,420 L-200,420Z','#2a2744');R(f,-200,360,1680,70,'url(#gHaze)');A(f,{style:'filter:blur(3px)'});
 R(m,-200,LVPY-2,1680,500,'#33281a');R(m,-200,LVPY-2,1680,500,'url(#gGroundShade)',{opacity:.7});
 const far=G(m,{style:'filter:blur(1.6px)'});const bs=.2;const bg=G(far,{transform:`translate(${LVPX-70} ${LVPY+2}) scale(${bs}) translate(-120 -600)`});fBarn(bg,70,600,p);fSilo(G(far,{transform:`translate(${LVPX+60} ${LVPY+2}) scale(${bs}) translate(-500 -600)`}),500,600);
 R(m,-200,LVPY-6,1680,18,'url(#gHaze)',{opacity:.8});
 P(m,`M${LVPX-6},${LVPY} L${LVPX+6},${LVPY} L${LVPX+360},780 L${LVPX-360},780Z`,'#5a4630');P(m,`M${LVPX-6},${LVPY} L${LVPX+6},${LVPY} L${LVPX+90},780 L${LVPX-90},780Z`,'#4a3a26',{opacity:.5});
 for(const sx of[-1,1]){for(const o of[-120,120]){L(m,LVPX+sx*o*0+o*.0,LVPY,LVPX+o*3.1,780,'#3a2c1a',6,{opacity:.55})}}
 const zs=[];for(let z=15;z>=1.15;z/=1.22)zs.push(z);
 for(const z of zs){const y=ly(z),k=1/z;
  for(const sx of[-1,1]){
   for(let r=0;r<4;r++){const X=sx*(430+r*120),x=lx(X,z);if(x<-120||x>1400)continue;fCorn(m,x,y,230*k*(r?1.05:1)*(.9+rnd(r*9+z)*.2),Math.floor(z*7+r),r>2)}
   const fx=lx(sx*350,z);R(m,fx-5*k,y-80*k,10*k,80*k,'#5c4630',{stroke:FARM_INK,'stroke-width':Math.max(1,2*k)});
  }
  if(z<6)R(m,lx(-350,z),y-62*k,lx(350,z)-lx(-350,z),0,'none')}
 for(const sx of[-1,1]){for(const yy of[.5,.28]){L(m,lx(sx*350,14),ly(14)-80/14*yy*2.2,lx(sx*350,1.15),ly(1.15)-80/1.15*yy*2.2,'#6a5438',3.2)}}
 const lamp=G(m);const lz=3.2,lxp=lx(-330,lz),lyp=ly(lz);R(lamp,lxp-4,lyp-230/lz,8,230/lz,'#3a3226');C(lamp,lxp,lyp-230/lz,150/lz*1.6,'url(#gLamp)',{opacity:.5});C(lamp,lxp,lyp-230/lz,6,'#fff3c0');
 const ff=fFirefly(G(m),12);upd.push((u,t)=>ff(t));
 const nr=G(n,{style:'filter:blur(6px)'});for(let i=0;i<5;i++){fCorn(nr,-60+i*34,790,360+rnd(i)*80,i,false);fCorn(nr,1340-i*34,790,360+rnd(i+5)*80,i+9,false)}
 upd.push((u,t)=>A(nr,{transform:`translate(${Math.sin(t*1.2)*5} 0)`}));
 return (u,t,bt)=>upd.forEach(fn=>fn(u,t,bt))};
