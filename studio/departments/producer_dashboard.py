#!/usr/bin/env python3
"""LINE PRODUCER: writes DASHBOARD.md : stream status, quality trend per department, throughput and cost (build minutes per clip), failures, backlog top 5."""
import os,json,datetime as dt,sys
R=os.path.dirname(os.path.abspath(__file__));A=os.path.abspath(R+'/../autopilot')
def main():
    L=[f'# Studio dashboard  ({dt.datetime.now(dt.timezone.utc):%Y-%m-%d %H:%M} UTC)','']
    cfg=json.load(open(A+'/config.json'));st=json.load(open(A+'/state/queue.json')) if os.path.exists(A+'/state/queue.json') else dict(clips=[])
    c={};[c.__setitem__(x['status'],c.get(x['status'],0)+1) for x in st['clips']]
    L+=[f"**Stream:** {cfg['schedule']['part_gap_minutes']} min between parts, {cfg['schedule']['topic_break_minutes']} min break after a topic, keep {cfg['schedule']['keep_ahead_hours']} h queued, publish_mode **{cfg.get('publish_mode')}**",f"**Clips by status:** {c}",'']
    hist=os.path.join(R,'kpi/history.jsonl');rows=[json.loads(l) for l in open(hist) if l.strip()] if os.path.exists(hist) else []
    last={};[last.__setitem__(r['clip'],r) for r in rows];rows=list(last.values())[-8:]
    if rows:
        ds=list(rows[0]['scores']);L+=['## Quality (latest review per clip)','','| clip | '+' | '.join(ds)+' |','|---|'+'---:|'*len(ds)]
        for r in rows:L.append(f"| {r['clip']} | "+' | '.join(str(r['scores'].get(d,'-')) for d in ds)+' |')
        L+=['','**Mean per department:** '+', '.join(f"{d} {sum(r['scores'].get(d,0) for r in rows)/len(rows):.0f}" for d in ds),'']
    bl=os.path.join(R,'build_log.jsonl')
    if os.path.exists(bl):
        b=[json.loads(l) for l in open(bl) if l.strip()][-12:];ok=[x for x in b if x.get('ok')]
        L+=['## Throughput','',f"last {len(b)} builds: {len(ok)} ok, {len(b)-len(ok)} failed; mean build time {sum(x['minutes'] for x in ok)/max(1,len(ok)):.1f} min per clip",'']
    if os.path.exists(R+'/BACKLOG.md'):
        L+=['## Backlog (top 5)','']+[l for l in open(R+'/BACKLOG.md').read().splitlines() if l.startswith('| ') and l[2].isdigit()][:5]
    open(R+'/DASHBOARD.md','w').write('\n'.join(L)+'\n');print('wrote DASHBOARD.md')
if __name__=='__main__':main()
