#!/usr/bin/env python3
"""daily.py : the unattended daily run of the Post Time Survival channel.  The creative step (inventing a topic, writing its world + 2 scripts) is done by the Claude session that runs DAILY.md;
everything mechanical is here.
  daily.py status            what exists, what is scheduled, how many clips are still needed to keep >= clips_per_day for the next keep_ahead_hours
  daily.py build ARC [..]    build every clip of a topic (arcs/<arc>/<arc>_NN.py): newness gate -> voices -> render -> master -> cover -> QA ; package ready clips into state
  daily.py publish           plan (publish_mode 'stage') or schedule (publish_mode 'live') every ready clip on the posting grid
  daily.py report            write autopilot/reports/<date>.md (what was made, QA, slots, problems)
  daily.py ready             exit 0 when the pipeline is healthy (tools, secrets, grid) - preflight
Exit codes: 0 ok, 10 = more topics needed (status), 1 = failure."""
import sys,os,json,glob,subprocess,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');LONG=os.environ.get('LONG_DIR',REPO+'/studio/long');sys.path.insert(0,R)
import state as ST,slots
CFG=json.load(open(R+'/config.json'));py=sys.executable
def sh(cmd,cwd=R,env=None):
    p=subprocess.run(cmd,cwd=cwd,env=dict(os.environ,**(env or {})),capture_output=True,text=True);return p.returncode,(p.stdout+p.stderr)
def arcs_on_disk():
    out={}
    for f in sorted(glob.glob(LONG+'/arcs/*/*_[0-9][0-9].py')):
        arc=os.path.basename(os.path.dirname(f));out.setdefault(arc,[]).append(os.path.basename(f)[:-3])
    return out
def status():
    s=ST.load();now=dt.datetime.now(dt.timezone.utc).replace(tzinfo=None);horizon=now+dt.timedelta(hours=CFG['keep_ahead_hours'])
    cnt={};[cnt.__setitem__(c['status'],cnt.get(c['status'],0)+1) for c in s['clips']]
    queued=[c for c in s['clips'] if c.get('status') in('ready','scheduled','finished') and (not c.get('due') or dt.datetime.fromisoformat(c['due'].replace('Z',''))>now)]
    need=max(0,CFG['min_clips_per_day']*CFG['keep_ahead_hours']//24-len(queued))
    topics=-(-need//CFG['parts_per_topic']) if need else 0
    print(f"clips by status: {cnt}\nqueued (ready or scheduled in the future): {len(queued)}\nneeded to keep {CFG['min_clips_per_day']}/day over the next {CFG['keep_ahead_hours']} h: {need} clips = {topics} new topics ({CFG['parts_per_topic']} parts each)\npublish_mode: {CFG.get('publish_mode')}  paused: {CFG.get('paused')}")
    print('next slots:',', '.join((t+dt.timedelta(hours=CFG['slot_tz_offset_hours'])).strftime('%a %H:%M') for t in slots.next_slots(min(6,CFG['clips_per_day']),ST.taken_slots(s))),'(Thailand)')
    have=arcs_on_disk();built=[a for a in have if all(os.path.exists(f'{LONG}/final9_{c}.mp4') for c in have[a])]
    print('topics on disk:',{a:len(v) for a,v in have.items()},'| built:',built)
    return topics
def build(arcs):
    bad=0
    for arc in arcs:
        for cid in arcs_on_disk().get(arc,[]):
            if os.path.exists(f'{LONG}/final9_{cid}.mp4') and ST.find(ST.load(),cid):print(cid,'already built + packaged');continue
            if not os.path.exists(f'{LONG}/final9_{cid}.mp4'):
                rc,out=sh([py,R+'/build_clip.py',cid]);print(out.strip().splitlines()[-1] if out.strip() else '',f'[{cid}]')
                if rc:print(out[-1500:]);bad+=1;continue
            rc,out=sh([py,R+'/package_clip.py',cid]);print(out.strip())
            if rc:print(out[-800:]);bad+=1
    return bad
def publish():
    s=ST.load();mode=CFG.get('publish_mode','stage');ready=[c for c in s['clips'] if c['status']=='ready']
    if CFG.get('paused'):print('paused: nothing published');return 0
    taken=list(ST.taken_slots(s));plan=[]
    for c,slot in zip(ready,slots.next_slots(len(ready),taken)):
        plan.append((c['id'],slots.iso(slot),(slot+dt.timedelta(hours=CFG['slot_tz_offset_hours'])).strftime('%a %d %b %H:%M')))
    for cid,iso,loc in plan:print(f'{"POST" if mode=="live" else "stage"} {cid} -> {iso} ({loc} Thailand)')
    if mode!='live':print('publish_mode is "stage": nothing was posted. Set publish_mode to "live" in config.json to let the daily run schedule these.');return 0
    bad=0
    for cid,_,_ in plan:
        rc,out=sh([py,R+'/post_clip.py',cid]);print(out.strip()[-400:])
        if rc:bad+=1
    return bad
def report():
    s=ST.load();d=dt.date.today().isoformat();os.makedirs(R+'/reports',exist_ok=True);L=[f'# Daily report {d}','',f"publish_mode: {CFG.get('publish_mode')}",'','| clip | topic | part | status | due |','|---|---|---|---|---|']
    for c in s['clips'][-24:]:L.append(f"| {c['id']} | {c.get('topic','')} | {c.get('part','')}/{c.get('of','')} | {c['status']} | {c.get('due','-')} |")
    q=LONG+'/qa9_report.txt'
    if os.path.exists(q):L+=['','## Last QA report','```',open(q).read()[-1800:],'```']
    open(f'{R}/reports/{d}.md','w').write('\n'.join(L)+'\n');print('wrote reports/'+d+'.md')
if __name__=='__main__':
    a=sys.argv[1:] or ['status']
    if a[0]=='status':sys.exit(10 if status() else 0)
    elif a[0]=='build':sys.exit(1 if build(a[1:]) else 0)
    elif a[0]=='publish':sys.exit(1 if publish() else 0)
    elif a[0]=='report':report()
    elif a[0]=='ready':rc,out=sh([py,R+'/preflight.py']);print(out);sys.exit(0 if 'MISSING/FAILING: []' in out or 'MISSING/FAILING' not in out else 1)
