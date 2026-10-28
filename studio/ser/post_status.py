#!/usr/bin/env python3
"""post_status.py scheduled_x.json [--fix] : status of every scheduled/sent post (Buffer).  Exit 1 if any post FAILED/ERROR.
(--fix is deliberately not automatic: a failed post is re-created by hand with publish.py --parts N --now-first, after looking at the error.)"""
import sys,json,os,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import buffer_api as B
rows=json.load(open(sys.argv[1]));bad=0
for r in rows:
    pid=r['resp']['data']['createPost']['post']['id'];p=B.status(pid);err=(p.get('error') or {}).get('message') if isinstance(p.get('error'),dict) else p.get('error')
    if p.get('status') in('error','failed') or err:bad+=1
    print(f"part {r['part']} {r['ch']}  due {r['due'][5:16]}  {p.get('status','?'):10s} {p.get('externalLink') or ''} {('ERROR: '+str(err)) if err else ''}")
sys.exit(1 if bad else 0)
