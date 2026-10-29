#!/usr/bin/env python3
"""seed_lastbus.py scheduled_lastbus.json : put THE LAST BUS (already scheduled with Buffer) into the autopilot state so its YouTube chores are done automatically."""
import sys,json,os
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,meta_lb as M
rows=json.load(open(sys.argv[1]));s=ST.load();have={c['id'] for c in s['clips']}
for n in range(1,11):
    cid=f'lb{n:02d}'
    if cid in have:continue
    posts={r['ch']:r['resp']['data']['createPost']['post']['id'] for r in rows if r['part']==n};due=[r['due'] for r in rows if r['part']==n][0]
    d=f'releases/last-bus/part{n}/'
    s['clips'].append(dict(id=cid,series='THE LAST BUS',part=n,of=10,yt_title=M.M[n]['yt_title'],due=due,status='scheduled',posts=posts,tags=M.YT_TAGS.strip(),playlist='THE LAST BUS',
        video=d+f'the-last-bus_part{n}.mp4',thumb=d+'thumbnail_9x16.png',caps_en=d+'captions_en.srt',caps_th=d+'captions_th.srt',done={}))
ST.save(s);print(len(s['clips']),'clips in state')
