#!/usr/bin/env python3
"""ART + LAYOUT + ANIMATION audit.  audit_visual.py CLIP_ID -> JSON {score, issues[], metrics}.  Measured from the finished video frames and from the built spec.
 * dead black bands (bottom/top rows that stay black while the picture is not)      * too dark / too grey (murky) shots      * palette variety between locations
 * static shots (no pixel motion for > 3 s outside cards)                           * persons cut by the frame edge (spec geometry)
 * empty shots (very little detail in the picture)                                  * same face size jumping between neighbouring shots"""
import sys,os,json,subprocess,numpy as np
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
W,H=180,320
def frames(video,fps=2):
    r=subprocess.run(['ffmpeg','-v','error','-i',video,'-vf',f'fps={fps},scale={W}:{H}','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True)
    return np.frombuffer(r.stdout,dtype=np.uint8).reshape(-1,H,W,3).astype(np.float32)
def audit(cid):
    spec=json.load(open(f'{LONG}/p9/{CR.pid(cid)}/spec.json'));B=spec['beats'];F=frames(f'{LONG}/{CR.final(cid)}');issues=[];M={};score=100;fps=2
    luma=F.mean(axis=3)
    # dead bands: bottom 22 % of the frame (captions + route line live there) must not be a flat black slab in the picture beats
    bot=luma[:,int(H*.80):,:];top=luma[:,:int(H*.06),:]
    stage=[i for i,b in enumerate(B) if b['scene']['n']=='stage']
    fidx=lambda t:min(len(F)-1,int(t*fps))
    dead=[i for i in stage if bot[fidx((B[i]['t'][0]+B[i]['t'][1])/2)].mean()<14]
    M['dead_black_bottom_beats']=f'{len(dead)}/{len(stage)}'
    if stage and len(dead)/len(stage)>.2:issues.append(f'ART: the bottom fifth of the picture is a flat black band in {len(dead)}/{len(stage)} scene beats (the set stops at y=720 of the 800 px window): extend floors / ground / walls below the horizon');score-=12
    dark=[i for i in stage if luma[fidx((B[i]['t'][0]+B[i]['t'][1])/2)].mean()<42]
    M['dark_beats']=len(dark)
    if len(dark)>len(stage)*.35:issues.append(f'ART: {len(dark)}/{len(stage)} scene beats are very dark (mean luma < 42): raise key light / palette value');score-=8
    sat=[];
    for i in stage:
        f=F[fidx((B[i]['t'][0]+B[i]['t'][1])/2)];mx=f.max(axis=2);mn=f.min(axis=2);sat.append(float(np.mean((mx-mn)/(mx+1)))) 
    M['mean_saturation']=round(float(np.mean(sat)),3) if sat else None
    if sat and np.mean(sat)<.2:issues.append(f'ART: palette is murky (mean saturation {np.mean(sat):.2f} < 0.20): add colour accents per location');score-=8
    # palette variety per location
    byloc={}
    for i in stage:
        k=f"{B[i]['scene']['p'].get('loc')}:{B[i]['scene']['p'].get('v')}";f=F[fidx((B[i]['t'][0]+B[i]['t'][1])/2)];byloc.setdefault(k,[]).append(f.reshape(-1,3).mean(axis=0))
    cols={k:np.mean(v,axis=0) for k,v in byloc.items()}
    ks=list(cols);md=min([np.linalg.norm(cols[a]-cols[b]) for i,a in enumerate(ks) for b in ks[i+1:]] or [99])
    M['min_palette_distance']=round(float(md),1)
    if len(ks)>=3 and md<14:issues.append(f'ART: two locations have almost the same colour world (distance {md:.0f} < 14): give each place its own colour key');score-=6
    # static shots
    static=[]
    for i,b in enumerate(B):
        if b['scene']['n']!='stage':continue
        a,e=fidx(b['t'][0]),fidx(b['t'][1])
        if e-a>=4:
            mo=np.mean([np.abs(luma[j+1]-luma[j]).mean() for j in range(a,e-1)])
            if mo<.55:static.append((i,round(float(mo),2)))
    M['static_beats']=static
    if len(static)>len(stage)*.3:issues.append(f'ANIMATION: {len(static)} scene beats are almost frozen (pixel motion < 0.55): add secondary motion (breathing, blinking, lamp flicker, dust, cloth)');score-=8
    # people cut by the frame edge (geometry from the spec)
    cut=[]
    for i,b in enumerate(B):
        p=b['scene'].get('p') or {}
        if b['scene']['n']!='stage':continue
        v=b.get('view') or {};z=v.get('z',1);vx=v.get('x',640)
        vx=vx[0] if isinstance(vx,list) else vx
        for a in p.get('acts',[]):
            if a.get('k') in('prop','horde','dog','sticker') or a.get('x') is None:continue
            xs=[a['x']]+([a['to'][0]] if a.get('to') else [])
            for x in xs:
                sx=225+(x-vx)*z*1.045;hw=38*a.get('s',.7)*z*1.045*(a.get('sx',1))
                if sx-hw<-4 or sx+hw>454:cut.append((i,a['k'],round(sx)));break
    M['cut_by_edge']=cut
    if cut:issues.append(f'LAYOUT: {len(cut)} person(s) cut by the frame edge, e.g. {cut[:4]}: reframe or move them inside x 40-410');score-=min(15,3*len(cut))
    # face/figure size jumps between neighbouring stage beats
    jumps=[]
    for i in range(1,len(B)):
        a,b=B[i-1],B[i]
        if a['scene']['n']=='stage' and b['scene']['n']=='stage' and (a.get('view') or {}).get('z') and (b.get('view') or {}).get('z'):
            za,zb=a['view']['z'],b['view']['z']
            if max(za,zb)/min(za,zb)>2.4:jumps.append((i,round(za,2),round(zb,2)))
    M['zoom_jumps']=jumps
    if len(jumps)>3:issues.append(f'LAYOUT: {len(jumps)} hard cuts change the zoom by more than 2.4x (shot-size jumps feel like a different film): step wide -> medium -> close');score-=5
    # empty shots: low gradient energy in the centre
    emp=[]
    for i in stage:
        f=luma[fidx((B[i]['t'][0]+B[i]['t'][1])/2)][40:240,20:160];g=np.abs(np.diff(f,axis=0)).mean()+np.abs(np.diff(f,axis=1)).mean()
        if g<5.5:emp.append((i,round(float(g),1)))
    M['empty_beats']=emp
    if emp:issues.append(f'ART: {len(emp)} scene beats have almost no detail in the middle of the picture {emp[:4]}');score-=4
    return dict(dept='art-layout-animation',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
