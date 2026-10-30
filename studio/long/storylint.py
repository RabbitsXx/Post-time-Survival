#!/usr/bin/env python3
"""storylint.py CLIP_ID : the story + clarity gate for data-driven worlds (owner feedback 2026-10-30: "the story is too short and the scenes make no sense").
Reads the built spec (p9/<id>/spec.json).  FAIL (exit 1) when:
  * the clip is shorter than 70 s or has fewer than 150 spoken words or fewer than 18 beats   (a part must tell a real story, not a sketch)
  * wide / establishing shots are < 35 % of the stage beats, or close-ups > 45 %                 (the viewer must SEE where we are and what happens)
  * a location is entered with a close-up (the first stage beat in each location must be wide)
  * zombies are visible in < 4 beats                                                              (the threat has to be on screen, not only talked about)
  * fewer than 3 different locations, or card beats > 30 %
WARN when no stage beat uses a moving/walking actor (anim/to/seq) or no 2.5D lane location."""
import sys,json,os
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import clipreg as CR
cid=sys.argv[1];S=json.load(open(f'{R}/p9/{CR.pid(cid)}/spec.json'));B=S['beats'];out=[];bad=0
def rec(ok,msg,warn=False):
    global bad
    out.append(('[PASS] ' if ok else ('[WARN] ' if warn else '[FAIL] '))+msg);bad+=0 if ok or warn else 1
words=sum(len(t.split()) for b in B for sp,t in [(c['sp'],' '.join(w for w in c['h'].replace('<y>','').replace('</y>','').replace('<r>','').replace('</r>','').split())) for c in b.get('caps',[])])
words=sum(len(str(x[1]).split()) for b in B for x in b.get('say',[])) or words
st=[b for b in B if b['scene']['n']=='stage'];cd=[b for b in B if b['scene']['n']=='card']
z=lambda b:(b.get('view') or {}).get('z',1)
wide=[b for b in st if z(b)<=1.05];close=[b for b in st if z(b)>=1.4]
OF=CR.series(cid)['of'];dmin,wmin,bmin=(70,150,18) if OF<=2 else (52,115,15)      # 3-part topics: each part may be shorter
rec(S['duration']>=dmin,f"duration {S['duration']:.0f} s (>= {dmin} s)");rec(words>=wmin,f'{words} spoken words (>= {wmin})');rec(len(B)>=bmin,f'{len(B)} beats (>= {bmin})')
rec(len(wide)/max(1,len(st))>=.35,f'wide/establishing shots {len(wide)}/{len(st)} (>= 35 %)');rec(len(close)/max(1,len(st))<=.45,f'close-ups {len(close)}/{len(st)} (<= 45 %)')
seen=set();bad_open=[]
for i,b in enumerate(B):
    if b['scene']['n']!='stage':continue
    loc=f"{b['scene']['p'].get('loc')}:{b['scene']['p'].get('v')}"
    if loc not in seen:
        seen.add(loc)
        if z(b)>1.05:bad_open.append((i,loc))
rec(not bad_open,'every location is entered with a wide establishing shot'+(f' (close-up first in: {bad_open})' if bad_open else ''))
zb=[i for i,b in enumerate(B) if any(a.get('k')=='horde' for a in (b['scene'].get('p') or {}).get('acts',[]))]
rec(len(zb)>=4,f'zombies visible in {len(zb)} beats (>= 4)');rec(len(seen)>=3,f'{len(seen)} locations (>= 3)');rec(len(cd)/max(1,len(B))<=.3,f'card beats {len(cd)}/{len(B)} (<= 30 %)')

# ---- storyboard: who / does / where / how / why-watch on every beat (owner rule 2026-10-30: a visual story must answer who, doing what, where, how, and why keep watching) ----
import re
M=CR.module(cid);cast={k.lower() for k in (getattr(M,'WORLD',{}) or {}).get('cast',{})}
miss=[i for i,b in enumerate(B) if not all(len(str((b.get('intent') or {}).get(k,'')))>=(3 if k=='who' else 8) for k in('who','does','where','how','why'))]
rec(not miss,'every beat has a storyboard line (who / does / where / how / why)'+(f' - missing on beats {miss}' if miss else ''))
talky=[i for i,b in enumerate(B) if re.match(r'^\s*(talk|say|speak|explain|discuss|chat)',str((b.get('intent') or {}).get('does','')).lower())]
rec(not talky,"'does' is an action the camera can show, not 'talks'"+(f' - beats {talky}' if talky else ''))
def has_action(b):
    p=b['scene'].get('p') or {}
    if b['scene']['n']=='card':return True
    for a in p.get('acts') or []:
        if a.get('k')=='horde' or a.get('k')=='prop' or a.get('anim') or a.get('to') or a.get('seq') or a.get('pose','stand')!='stand' or a.get('view')=='back':return True
    return any(f.get('k')=='sticker' for f in b.get('fx',[]))
act=[i for i,b in enumerate(st) if has_action(b)]
rec(len(act)/max(1,len(st))>=.6,f'beats with something visibly happening (move / pose / prop / zombies) {len(act)}/{len(st)} (>= 60 %)')
q=sum(1 for b in B if str((b.get('intent') or {}).get('why','')).strip().endswith('?'))
rec(q/max(1,len(B))>=.5,f"'why watch' poses an open question on {q}/{len(B)} beats (>= 50 %)")
nopres=[]
for i,b in enumerate(B):
    if b['scene']['n']!='stage':continue
    who=str((b.get('intent') or {}).get('who','')).lower();acts={a.get('k') for a in (b['scene'].get('p') or {}).get('acts',[])}
    for n in cast:
        if re.search(r'\b'+re.escape(n)+r'\b',who) and n not in acts and n!='pip':nopres.append((i,n))
rec(not nopres,'every person named in "who" is on screen'+(f' - {nopres[:6]}' if nopres else ''))
wr=[i for i,b in enumerate(B) if b['scene']['n']=='stage' and str(b['scene']['p'].get('v','')).lower() not in str((b.get('intent') or {}).get('where','')).lower()]
rec(not wr,'"where" names the location that is drawn'+(f' - beats {wr[:8]}' if wr else ''))
arc=getattr(M.P,'arc',None) or {}
rec(all(len(str(arc.get(k,'')))>=8 for k in('hook','goal','obstacle','twist','payoff')),'the part has a story arc (hook, goal, obstacle, twist, payoff)')


# ---- continuity: a person who is in two consecutive shots of the same place (same camera) must start where he or she ended (no teleporting), and nobody swaps sides ----
jumps=[]
for i in range(1,len(B)):
    a,b=B[i-1],B[i]
    if a['scene']['n']!='stage' or b['scene']['n']!='stage':continue
    pa,pb=a['scene']['p'],b['scene']['p']
    if (pa.get('loc'),pa.get('v'))!=(pb.get('loc'),pb.get('v')):continue
    if (a.get('view') or {})!=(b.get('view') or {}):continue
    ea={x['k']:(x['to'][0] if x.get('to') else x['x']) for x in pa.get('acts',[]) if x.get('k') not in('prop','horde','dog','sticker')}
    sb={x['k']:x['x'] for x in pb.get('acts',[]) if x.get('k') not in('prop','horde','dog','sticker')}
    for k in ea:
        if k in sb and abs(ea[k]-sb[k])>70:jumps.append((i,k,round(ea[k]),round(sb[k])))
rec(not jumps,'continuity: people start each shot where they ended the last one in the same place'+(f' - jumps {jumps[:6]}' if jumps else ''))
mv=[1 for b in st for a in (b['scene']['p'].get('acts') or []) if a.get('anim') or a.get('to') or a.get('seq')]
rec(bool(mv),'actors move on screen (walk / turn)',warn=True)
rec(any((b['scene']['p'].get('v') or '')=='hall' or 'lane' in str(b['scene']['p'].get('v')) for b in st),'a 2.5D lane location is used',warn=True)
print('\n'.join(out));print('STORY PASS' if not bad else 'STORY FAIL');sys.exit(1 if bad else 0)
