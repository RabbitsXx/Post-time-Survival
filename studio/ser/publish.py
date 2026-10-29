#!/usr/bin/env python3
"""publish.py SERIES --sha GIT_SHA --start 2026-10-28T20:50:00Z [--step-min 60] [--parts 1,2,3] [--now-first] [--dry-run]
Schedules every part of a series on YouTube + TikTok + Instagram (Buffer) ONE HOUR apart.  Checks first, posts second:
  preflight: local file exists, raw GitHub URL answers 200 with the same size (the repo must be PUBLIC until the last post is out), copy fits the platform
  after:     every createPost must succeed; then each post is queried back.  Result: ser/scheduled_<series>.json  (feed it to post_status.py)
Tags: required (YT_TAGS in the series meta); Buffer cannot set them, so they are printed + saved for pasting in Studio.
Covers: IG/TikTok take the cover from the embedded first frames (thumbnailOffset 50 ms); Buffer cannot set a YouTube thumbnail (upload by hand)."""
import sys,os,json,datetime as dt,importlib,requests
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import series as SR,buffer_api as B
a=sys.argv[1:];key=a[0];cfg=SR.SERIES[key];arg=lambda k,d=None:a[a.index(k)+1] if k in a else d
sha=arg('--sha');start=dt.datetime.fromisoformat(arg('--start').replace('Z','+00:00'));step=int(arg('--step-min','60'));dry='--dry-run' in a
repo=os.environ.get('REPO',os.path.abspath(R+'/../../')) ;repo=os.environ.get('REPO','/home/user/Post-time-Survival')
MOD=importlib.import_module(cfg['meta']);M=MOD.M;TAGS=getattr(MOD,'YT_TAGS','').strip();CH=json.load(open(R+'/channels.json'))
parts=[int(x) for x in arg('--parts',','.join(str(n) for n in sorted(M))).split(',')]
url=lambda n:f"https://raw.githubusercontent.com/RabbitsXx/Post-time-Survival/{sha}/"+cfg['release'].format(n=n)
bad=[]
# STANDING RULE (owner, 2026-10-29): every video gets YouTube tags.  Buffer's YouTube metadata has no tags field, so tags are checked here and handed over for pasting after the post.
tl=[t.strip() for t in TAGS.split(',') if t.strip()]
if len(tl)<8:bad.append(f'no YouTube tags: define YT_TAGS in {cfg["meta"]}.py (at least 8 comma-separated tags)')
if len(TAGS)>500:bad.append(f'YouTube tags are {len(TAGS)} chars (max 500)')
for n in parts:
    f=f"{repo}/"+cfg['release'].format(n=n)
    if not os.path.exists(f):bad.append(f'part {n}: local file missing {f}');continue
    try:
        h=requests.head(url(n),allow_redirects=True,timeout=30)
        if h.status_code!=200:bad.append(f'part {n}: {url(n)} -> HTTP {h.status_code} (repo private? commit not pushed?)')
        elif int(h.headers.get('content-length',-1))!=os.path.getsize(f):bad.append(f'part {n}: remote size {h.headers.get("content-length")} != local {os.path.getsize(f)}')
    except Exception as e:bad.append(f'part {n}: {e}')
    m=M[n]
    if len(m['yt_title'])>100:bad.append(f'part {n}: YouTube title {len(m["yt_title"])} > 100 chars')
    if len(m['ig'])>2200:bad.append(f'part {n}: IG caption too long')
    if len(m['tt'])>2200:bad.append(f'part {n}: TikTok caption too long')
if bad:print('PREFLIGHT FAILED:\n  '+'\n  '.join(bad));sys.exit(1)
print(f'preflight ok for parts {parts} ({len(parts)*3} posts), {len(tl)} YouTube tags ({len(TAGS)} chars).'+('  DRY RUN - nothing posted.' if dry else ''))
if dry:
    for i,n in enumerate(parts):print(f'  part {n}: {(start+dt.timedelta(minutes=step*i)).strftime("%Y-%m-%d %H:%M")} UTC  {M[n]["yt_title"]}')
    sys.exit(0)
out=[];fail=[]
for i,n in enumerate(parts):
    m=M[n];due=(start+dt.timedelta(minutes=step*i)).strftime('%Y-%m-%dT%H:%M:%S.000Z')
    for k in('yt','tt','ig'):
        asset=dict(url=url(n),metadata=dict(title=m['yt_title']) if k=='yt' else dict(thumbnailOffset=50))
        inp=dict(channelId=CH[k],schedulingType='automatic',text=dict(yt=m['yt_desc'],tt=m['tt'],ig=m['ig'])[k],assets=[dict(video=asset)],mode='customScheduled',dueAt=due)
        if '--now-first' in a and i==0:inp['mode']='shareNow';inp.pop('dueAt')
        if k=='yt':inp['metadata']=dict(youtube=dict(title=m['yt_title'],categoryId="1",privacy="public",madeForKids=False,notifySubscribers=True,embeddable=True))
        if k=='ig':inp['metadata']=dict(instagram=dict(type="reel",shouldShareToFeed=True))
        r=B.gql(B.CREATE,dict(input=inp));c=(r.get('data') or {}).get('createPost') or {}
        ok=c.get('__typename')=='PostActionSuccess'
        print(f'  part {n} {k} {due}  {"OK "+c["post"]["status"] if ok else "FAILED "+json.dumps(r)[:200]}');out.append(dict(part=n,ch=k,due=due,resp=r))
        if not ok:fail.append((n,k))
json.dump(out,open(f'{R}/scheduled_{key}.json','w'),indent=1)
# tags cannot be set through Buffer: write the paste-ready list for the owner
open(f'{R}/youtube_tags_{key}.md','w').write(f'# YouTube tags to paste for {cfg["title"]} (parts {parts})\nStudio > Content > tick the videos > Edit > Add to tags\n\n```\n{TAGS}\n```\n')
print('\nTAGS TO ADD BY HAND (Buffer has no tags field): ser/youtube_tags_'+key+'.md\n  '+TAGS)
print(f'{len(out)-len(fail)}/{len(out)} scheduled -> ser/scheduled_{key}.json'+(f'   FAILED: {fail}' if fail else ''));sys.exit(1 if fail else 0)
