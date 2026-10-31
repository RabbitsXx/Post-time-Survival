// Pig War v3: Undertale-style character speech (blips + text box), depth props (decor.js)
const GRIF=person({hairCap:1,coat:'#6a4a2a',shortSleeve:0,pants:'#3a3a44',hair:'#b0603a',stache:'#b0603a',belt:1,skin:'#e8b894'});
window.ACTORS={farmer:POLYF,owner:GRIF,officer:OFF,kaiser:KAI,pig:ghost,poly:POLY};
const PW3={
pw3_farmer:(u,d,k)=>{showGarden();show(POLYF,GRIF);POLYF.rest();POLYF.gun.visible=false;POLYF.at(0,0,0,0);POLYF.face(k<.6?'sweat':'neutral');POLYF.arms[0].rotation.x=-.2;GRIF.rest();GRIF.at(1.3,0,.2,-1.3);GRIF.face('angry');camTo([-.3,1.9,2.6],[.1,1.9,2.0],[.05,1.85,0],[.05,1.85,0],k,34)},
pw3_owner:(u,d,k)=>{showGarden();show(GRIF,POLYF);GRIF.rest();GRIF.at(0,0,0,0);GRIF.face('angry');GRIF.head.rotation.set(.05*Math.sin(u*9),.06*Math.sin(u*7),0);GRIF.arms[0].rotation.set(-1.2,0,-.3);POLYF.rest();POLYF.gun.visible=false;POLYF.at(-1.4,0,.3,1.2);POLYF.face('sweat');camTo([.2,1.95,2.5],[-.1,1.9,1.9],[0,1.85,0],[0,1.85,0],k,34)},
pw3_deal:(u,d,k)=>{showGarden();show(GRIF,POLYF,pig);pig.state('pigdead');pig.at(0,.4,2.4);pig.root.position.y=.55;pig.root.rotation.z=Math.PI;pig.legs.forEach(l=>l.rotation.x=0);pig.head.rotation.x=0;GRIF.rest();GRIF.at(-1.4,0,.3,.9);GRIF.face('angry');POLYF.rest();POLYF.gun.visible=false;POLYF.at(1.4,0,.3,-.9);POLYF.face('sweat');camTo([0,1.5,6.2],[0,1.5,5.4],[0,1.1,.8],[0,1.1,.8],k,46)}
};
PW3.pwcover=(u,d,k)=>{clouds.forEach(c=>{c.position.set(0,-50,0)});showGarden();show(POLYF,pig);pig.at(.3,1.0,-.2);pig.state('pigalive');pig.root.rotation.z=0;pig.head.rotation.x=-.1;stick.visible=true;waveFlag(pigFlag,.7);POLYF.rest();POLYF.at(-.62,0,-.5,.35);POLYF.gun.visible=false;POLYF.face('shock');POLYF.arms[0].rotation.set(-.2,0,-.15);POLYF.arms[1].rotation.set(-.2,0,.15);POLYF.head.rotation.set(-.05,.1,0);camTo([0,.95,4.6],[0,.95,4.6],[0,1.6,0],[0,1.6,0],0,50)};
PW3.pw_ghost2=(u,d,k)=>SHOTS.pw_ghost(u,d,.6+k*.4);
Object.assign(SHOTS,PW3);
