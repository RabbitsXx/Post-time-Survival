#!/usr/bin/env python3
"""strategy.py : turn the numbers into decisions (STRATEGY_AUTO.md).  Reads kpi.jsonl (analytics) + trends/*.json + departments scorecards.
Rules are deliberately simple and explicit so the cloud session can overrule them with reasons in DECISIONS.md."""
import os,json,glob,statistics as st
R=os.path.dirname(os.path.abspath(__file__))
def last_kpi():
    rows=[json.loads(l) for l in open(R+'/kpi.jsonl') if l.strip()] if os.path.exists(R+'/kpi.jsonl') else []
    return rows[-1] if rows else None
def run():
    k=last_kpi();L=['# STRATEGY_AUTO (generated; the manager overrules it in DECISIONS.md with reasons)','']
    if not k or not k['rows']:L.append('* no live clip numbers yet: collect data before changing course (run analytics.py).')
    else:
        by={}
        for r in k['rows']:by.setdefault(r['series'],[]).append(r)
        for ser,rs in by.items():
            rs.sort(key=lambda r:r['part']);v=[r['views'] for r in rs]
            L.append(f"* {ser}: {len(rs)} live parts, views by part {v}, mean {st.mean(v):.0f}")
            if len(v)>=3 and v[0]>0:
                later=st.mean(v[2:])/v[0]
                if later<.15:L.append(f"  - RETENTION CLIFF: parts 3+ get {later:.0%} of part 1. Fix: a cliffhanger the viewer must resolve in the next part (open loop), part title in the hook line, post parts closer together, and keep a series to what the hook can carry.")
                elif later<.5:L.append(f"  - soft drop-off ({later:.0%} of part 1 on parts 3+): strengthen the last 5 s of each part and put the next part's number in the pinned comment.")
            lr=[r['likes']/max(1,r['views']) for r in rs]
            if st.mean(lr)<.02:L.append(f"  - like rate {st.mean(lr):.1%} (< 2 %): add an explicit emotional beat + a direct ask ('If you would go up, like') in the last line.")
        best=max(k['rows'],key=lambda r:r['views']);L.append(f"* best clip: {best['clip']} '{best['title'][:70]}' ({best['views']} views): copy its hook shape.")
    t=sorted(glob.glob(R+'/trends/*.json'))
    if t:
        T=json.load(open(t[-1]))['top'][:15];sec=sorted(x['secs'] for x in T)[len(T)//2]
        L+=['',f"* niche leaders (views/day): median length {sec}s; top titles: "+' | '.join(x['title'][:50] for x in T[:3])]
        L.append('* titles with a number do well: keep one in every title; "Day 1 / what nobody tells you" outbreak framing is trending (see TRENDS.md).')
    L+=['','## standing experiments','* every 5th clip test one change (title style, first-3-s hook, cover colour) and compare views vs the median of the last 10 (record in DECISIONS.md).']
    open(R+'/STRATEGY_AUTO.md','w').write('\n'.join(L)+'\n');print('\n'.join(L))
if __name__=='__main__':run()
