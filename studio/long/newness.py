#!/usr/bin/env python3
"""newness.py CLIP_ID [--record] | --md | --list
Owner rule 2026-10-29: the library (engine, rig, icons, SFX, formats) may be reused, but every topic must bring NEW things that follow from the topic.
A clip module declares  NEW = dict(world, setting, structure, announcer, announcer_voice, palette, locs, cast, props, devices, gags, tips, tied_to_topic[, part_new, library_used])
and this gate compares it with register.json (every world made so far) and with the built spec (p9/<id>/spec.json) when it exists.
  FAIL  a declared-new item already belongs to another world, a minimum is not met, a speaker / location / device in the spec is not declared,
        or part 2+ adds nothing new compared with the earlier parts of the same world
  --record  after the owner approves a pilot: write the world + this part into register.json (and WORLD_REGISTER.md)
Exit 0 only when every check passes."""
import sys,os,json,collections
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import clipreg as CR
REG=R+'/register.json';MD=R+'/WORLD_REGISTER.md'
GENERIC={'series','sticker','text','end','list','stat','phone','board','zoom','shake','alert','rulecard','macro','areamap'}   # library devices: never count as "new"
SCALAR=['world','setting','structure','announcer','palette']
LISTS=['cast','locs','props','devices','gags','tips']
def load():return json.load(open(REG))
def norm(x):return str(x).strip().lower()
def base(x):return norm(x).split(':')[0]
def others(reg,wid):return [w for w in reg['worlds'] if w['id']!=wid]
def spec_of(cid):
    p=f'{R}/p9/{CR.pid(cid)}/spec.json'
    return json.load(open(p)) if os.path.exists(p) else None
def facts(spec):
    """what the built clip really uses: stage locations, card kinds, fx kinds, speakers"""
    locs=set();devs=set();sp=set();stage=0;newstage=0
    for b in spec['beats']:
        sc=b['scene'];p=sc.get('p') or {}
        if sc['n']=='stage':locs.add(f"{p.get('loc')}:{p.get('v')}" if p.get('v') else str(p.get('loc')))
        elif isinstance(p,dict) and p.get('kind'):devs.add(p['kind'])
        for f in b.get('fx',[]):devs.add(f['k'])
        for c in b.get('caps',[]):
            if c.get('sp'):sp.add(c['sp'])
    return dict(locs=locs,devs=devs-GENERIC,sp=sp)
def check(cid):
    reg=load();m=CR.module(cid);N=getattr(m,'NEW',None);out=[];bad=0
    def rec(ok,msg):
        nonlocal bad
        out.append(('[PASS] ' if ok else '[FAIL] ')+msg);bad+=0 if ok else 1
    if not N:rec(False,'no NEW declaration in the clip file: a topic must say what is new (see newness.py)');return out,1
    miss=[k for k in SCALAR+LISTS+['announcer_voice','tied_to_topic'] if k not in N]
    if miss:rec(False,'NEW lacks: '+', '.join(miss));return out,1
    wid=N['world'];O=others(reg,wid);R_=reg['rules']
    rec(len(N['tied_to_topic'])>=R_['tied_to_topic_min_chars'],f"new things are tied to the topic ({len(N['tied_to_topic'])} chars): {N['tied_to_topic'][:90]}")
    for k in SCALAR:
        clash=[w['id'] for w in O if norm(w.get(k,''))==norm(N[k])]
        rec(not clash,f"{k} is new: '{N[k][:60]}'"+(f" (same as world {clash})" if clash else ''))
    PL=json.load(open(R+'/props.json'))['items'];tags={norm(t) for t in N.get('setting_tags',[])}
    for pr in N.get('props_reused',[]):
        ok=norm(pr) in PL and (tags&{norm(t) for t in PL[norm(pr)]['fit']} or 'any' in PL[norm(pr)]['fit'])
        rec(bool(ok),f"reused prop '{pr}' exists in the prop library and fits this setting (tags {sorted(tags)}; fit {PL.get(norm(pr),{}).get('fit')})")
    for k in LISTS:
        mine=[norm(x) for x in N[k]];fn=base if k=='locs' else norm
        used={fn(x):w['id'] for w in O for x in w.get(k,[])} if k!='props' else {fn(x):w['id'] for w in O for x in w.get(k,[]) if norm(x) not in PL}   # library props may be reused (see props.json)
        clash=[f"{x} (world {used[fn(x)]})" for x in N[k] if fn(x) in used]
        rec(not clash,f"{k} not used by another world ({len(mine)}): {', '.join(N[k])[:90]}"+(f"  CLASH: {clash}" if clash else ''))
        mn=R_['min_new'].get(k)
        if mn:rec(len(mine)>=mn,f"at least {mn} new {k} (has {len(mine)})")
    w0=next((w for w in reg['worlds'] if w['id']==wid),None);P=CR.series(cid)['part'] if not CR.legacy(cid) else 1
    if P>1 and w0:
        seen=set(norm(x) for x in w0.get('parts_log',{}).get('all',[]))
        pn=[norm(x) for x in N.get('part_new',[])];fresh=[x for x in pn if x not in seen]
        rec(len(fresh)>=2,f"part {P} adds >=2 things not in earlier parts (new: {fresh})")
    elif P>1:rec(False,f"world '{wid}' is not in register.json: record part 1 first (newness.py <part1> --record)")
    s=spec_of(cid)
    if s:
        F=facts(s);decl=set(norm(x) for x in N['locs']);dl=decl|set(base(x) for x in N['locs'])
        undeclared=[l for l in F['locs'] if norm(l) not in decl and base(l) not in decl]
        rec(not undeclared,f"every stage location in the clip is a declared new one ({sorted(F['locs'])})")
        allowed=set(norm(x) for x in N['cast'])|{norm(N['announcer_voice'])}
        stray=[x for x in F['sp'] if norm(x) not in allowed]
        rec(not stray,f"every speaker is declared new cast or the announcer ({sorted(F['sp'])})"+(f" STRAY: {stray}" if stray else ''))
        oc={norm(x) for w in O for x in w.get('cast',[])}
        rec(not [x for x in F['sp'] if norm(x) in oc],'no speaker belongs to another world')
        dd=set(norm(x) for x in N['devices']);fd={norm(x) for x in F['devs']}
        rec(dd<=fd,f"declared devices are really used ({sorted(dd)} in {sorted(fd)})")
        rec(not (fd-dd)&{norm(x) for w in O for x in w.get('devices',[])},'no card/fx device of another world is used')
        sb=[b for b in s['beats'] if b['scene']['n']=='stage']
        nb=sum(1 for b in sb if norm((b['scene']['p'].get('loc') or ''))in dl or f"{b['scene']['p'].get('loc')}:{b['scene']['p'].get('v')}".lower() in decl)
        rec(nb>=.9*len(sb),f"{nb}/{len(sb)} stage beats happen in the new location(s)")
    else:out.append('[WARN] no built spec yet: speakers/locations/devices are checked again after the spec step')
    if N.get('library_used'):out.append('[INFO] library ingredients reused (allowed): '+', '.join(N['library_used']))
    return out,bad
def record(cid):
    reg=load();m=CR.module(cid);N=m.NEW;P=CR.series(cid)['part'] if not CR.legacy(cid) else 1
    w=next((w for w in reg['worlds'] if w['id']==N['world']),None)
    if not w:
        w=dict(id=N['world'],status='pilot',name=CR.series(cid)['name'],parts_log={'all':[]});reg['worlds'].append(w)
    for k in SCALAR+LISTS:
        if k in SCALAR:w[k]=N[k]
        else:w[k]=sorted(set(w.get(k,[]))|set(N[k]))
    log=w.setdefault('parts_log',{'all':[]});new=list(N.get('part_new',[]))+list(N['locs'])+list(N['props'])+list(N['gags'])
    log[str(P)]=new;log['all']=sorted(set(log['all'])|set(new))
    json.dump(reg,open(REG,'w'),indent=1,ensure_ascii=False);md();print('recorded',cid,'in register.json')
def md():
    reg=load();L=['# World register','',reg['rules']['owner_rule'],'','Library = reusable ingredients (engine, rig, icons, SFX, formats). Each world below is used by ONE topic; a new topic must differ in every column and add new things that follow from its subject.','',
     '| world | status | setting | cast | structure | announcer | palette | signature gag | real tips | new props / devices |','|---|---|---|---|---|---|---|---|---|---|']
    for w in reg['worlds']:L.append('| '+' | '.join([w['id'],w['status'],w.get('setting',''),', '.join(w.get('cast',[])) or '-',w.get('structure',''),w.get('announcer',''),w.get('palette',''),', '.join(w.get('gags',[])) or '-',', '.join(w.get('tips',[])) or '-',', '.join(w.get('props',[])+w.get('devices',[])) or '-'])+' |')
    open(MD,'w').write('\n'.join(L)+'\n')
if __name__=='__main__':
    a=sys.argv[1:]
    if not a:raise SystemExit(__doc__)
    if a[0]=='--md':md();print('wrote',MD);sys.exit(0)
    if a[0]=='--list':
        for w in load()['worlds']:print(f"{w['id']:10} {w['status']:7} {w.get('setting','')}")
        sys.exit(0)
    out,bad=check(a[0]);print('\n'.join(out));print('NEWNESS','FAIL' if bad else 'PASS')
    if a[1:]==['--record'] and not bad:record(a[0])
    sys.exit(1 if bad else 0)
