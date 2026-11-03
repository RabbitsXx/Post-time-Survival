// frame-gate support 2/2: window.gateInfo() reports where people and overlays are on the 1080x1920 canvas
(function(){const W=1080,H=1920;const vis=o=>{while(o){if(!o.visible)return false;o=o.parent}return true};
 const pr=v=>{const q=v.clone().project(cam);return [(q.x*.5+.5)*W,(-q.y*.5+.5)*H,q.z]};
 const dom=id=>{const e=document.getElementById(id);if(!e)return null;const cs=getComputedStyle(e);if(cs.display==='none'||+cs.opacity===0||!e.textContent.trim())return null;const r=e.getBoundingClientRect();return {x0:r.left,y0:r.top,x1:r.right,y1:r.bottom,text:e.textContent.trim().slice(0,40)}};
 window.gateInfo=function(){cam.updateMatrixWorld(true);const out={people:[],dom:{tag:dom('tag'),stamp:dom('stamp'),dlg:dom('dlg'),cap:dom('cap')}};
  (window.ALLP||[]).forEach((P,i)=>{if(!vis(P.g))return;const b=new THREE.Box3();[P.g.children[0],P.g.children[1],P.head].forEach(o=>{o.traverse(q=>{if(q.isMesh&&vis(q))b.expandByObject(q)})});if(b.isEmpty())return;   /* body box = torso + hips + head (+hat); arms and held items may leave the frame */
   const xs=[],ys=[];for(const x of[b.min.x,b.max.x])for(const y of[b.min.y,b.max.y])for(const z of[b.min.z,b.max.z]){const p=pr(new THREE.Vector3(x,y,z));if(p[2]<1){xs.push(p[0]);ys.push(p[1])}}if(!xs.length)return;
   const hp=new THREE.Vector3();P.head.getWorldPosition(hp);const c=pr(hp);const rt=new THREE.Vector3(1,0,0).applyQuaternion(cam.quaternion);const e=pr(hp.clone().add(rt.multiplyScalar(.2)));const r=Math.abs(e[0]-c[0]);
   out.people.push({i,bbox:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],face:[c[0]-r,c[1]-r*1.15,c[0]+r,c[1]+r*1.15],headOK:c[2]<1})});
  return out}})();
