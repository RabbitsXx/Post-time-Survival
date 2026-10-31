#!/usr/bin/env python3
"""DIRECTOR audit: film grammar on the built spec.  shotlint.py CLIP_ID -> JSON {score, issues, metrics}
 * shot-size ladder: after an establishing wide the next shot in the same place is wide or medium, never straight to an extreme close-up (zoom ratio <= 2.4)
 * variety: no more than 3 consecutive scene beats of the same shot size
 * headroom / framing: in close-ups the head must be inside the frame with >= 5 % margin on top
 * 180-degree rule: in consecutive shots of the same place and camera, two people keep their left/right order unless one walked across
 * eyeline: the same character in consecutive close-ups must not flip direction without a reason (no 'ping-pong' flips)
 * pattern interrupts: a visibly new picture (location, size, subject or card) at least every 4.5 s"""
import sys,os,json
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
def size(b):
    z=(b.get('view') or {}).get('z',1)
    return 'wide' if z<=1.05 else ('medium' if z<1.6 else 'close')
def audit(cid):
    S=json.load(open(f'{LONG}/p9/{CR.pid(cid)}/spec.json'));B=S['beats'];issues=[];M={};score=100
    cast=set((S.get('world') or {}).get('cast',{}))
    st=[(i,b) for i,b in enumerate(B) if b['scene']['n']=='stage']
    sizes=[size(b) for _,b in st];M['sizes']=''.join(s[0] for s in sizes)
    run=1;bad=[]
    for k in range(1,len(sizes)):
        run=run+1 if sizes[k]==sizes[k-1] else 1
        if run>3:bad.append(st[k][0])
    if bad:issues.append(f'DIRECTION: more than 3 shots of the same size in a row (beats {bad[:5]}): vary wide / medium / close');score-=6
    # headroom
    head=[]
    for i,b in st:
        v=b.get('view') or {};z=v.get('z',1)
        if z<1.4:continue
        vy=v.get('y',470);vy=vy[0] if isinstance(vy,list) else vy
        for a in (b['scene'].get('p') or {}).get('acts',[]):
            if a.get('k') in cast and a.get('y') is not None:
                top=a['y']-297*a.get('s',.7)*1.1;sy=400+(top-vy)*z*1.045
                if sy<40:head.append((i,a['k'],round(sy)))
    M['headroom']=head
    if head:issues.append(f'DIRECTION: head cropped / no headroom in close-ups {head[:4]}');score-=min(12,4*len(head))
    # 180 rule
    swaps=[]
    for (i,a),(j,b) in zip(st,st[1:]):
        if j!=i+1:continue
        pa,pb=a['scene']['p'],b['scene']['p']
        if (pa.get('loc'),pa.get('v'))!=(pb.get('loc'),pb.get('v')) or (a.get('view') or {})!=(b.get('view') or {}):continue
        xa={x['k']:(x['to'][0] if x.get('to') else x['x']) for x in pa.get('acts',[]) if x.get('k') in cast};xb={x['k']:x['x'] for x in pb.get('acts',[]) if x.get('k') in cast}
        common=[k for k in xa if k in xb]
        for p in range(len(common)):
            for q in range(p+1,len(common)):
                u,w=common[p],common[q]
                if (xa[u]-xa[w])*(xb[u]-xb[w])<0 and not any(x.get('to') for x in pa.get('acts',[]) if x.get('k') in(u,w)):swaps.append((j,u,w))
    M['side_swaps']=swaps
    if swaps:issues.append(f'DIRECTION: 180-degree rule broken, people swap sides between shots {swaps[:4]}');score-=min(15,5*len(swaps))
    # eyeline ping-pong
    last={};pp=[]
    for i,b in st:
        if size(b)=='close':
            for a in (b['scene'].get('p') or {}).get('acts',[]):
                if a.get('k') in cast and a.get('talk'):
                    f=bool(a.get('flip'))
                    if a['k'] in last and last[a['k']][1]!=f and i-last[a['k']][0]<=2:pp.append((i,a['k']))
                    last[a['k']]=(i,f)
    M['eyeline_flips']=pp
    if pp:issues.append(f'DIRECTION: a speaker flips direction between close-ups with no reason {pp[:4]}: keep one screen side per character in a conversation');score-=min(8,3*len(pp))
    # pattern interrupts
    still=0;t_last=0;longest=0
    prev=None
    for b in B:
        key=(b['scene']['n'],str((b['scene'].get('p') or {}).get('v')),size(b) if b['scene']['n']=='stage' else b['scene'].get('p',{}).get('kind') or 'card')
        if key!=prev:t_last=b['t'][0]
        longest=max(longest,b['t'][1]-t_last);prev=key
    M['longest_same_picture_s']=round(longest,1)
    if longest>6.5:issues.append(f'DIRECTION: the same picture (place + size) holds for {longest:.1f} s (> 6.5 s): cut, move the camera or change the subject');score-=6
    return dict(dept='direction',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
