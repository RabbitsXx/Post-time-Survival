#!/usr/bin/env python3
"""python3 post_lp.py CLIP_ID [--dry-run] [--at ISO_UTC]   post one finished clip to the PosttimeLowPoly YouTube channel via Buffer (BUFFER_TOKEN2).
Video is hosted on its own orphan branch `lowpoly-media` of the repo (NOT the media-N ring of the other channel). Needs out/<id>/<id>.mp4 + topics/<id>.meta.json (title, description, tags).
Buffer cannot set YouTube tags/playlist: tags are printed for manual entry in YouTube Studio. Records the Buffer post id in posted.json (never post a clip twice)."""
import os,sys,json,subprocess,tempfile,shutil,time,requests
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);import buffer2 as B
REPO_URL='https://github.com/RabbitsXx/Post-time-Survival';RAW='https://raw.githubusercontent.com/RabbitsXx/Post-time-Survival/lowpoly-media/media/'
CH=dict(l.strip().split('=',1) for l in open(R+'/channels.env') if '=' in l)
def sh(*a,cwd=None,ok=False):
    p=subprocess.run(a,cwd=cwd,capture_output=True,text=True)
    if p.returncode and not ok:raise SystemExit(f'{" ".join(a[:3])} failed: {(p.stderr or p.stdout).strip()[:300]}')
    return p
def host(files):
    w=tempfile.mkdtemp(prefix='lpmedia_')
    try:
        sh('git','init','-q',cwd=w);sh('git','remote','add','origin',REPO_URL,cwd=w);sh('git','config','user.email','lowpoly@posttimelowpoly.invalid',cwd=w);sh('git','config','user.name','posttimelowpoly',cwd=w)
        sh('git','checkout','-q','--orphan','lowpoly-media',cwd=w);os.makedirs(w+'/media')
        for n,p in files.items():shutil.copy(p,f'{w}/media/{n}')
        sh('git','add','media',cwd=w);sh('git','commit','-q','-m','lowpoly media: '+', '.join(files),cwd=w)
        for d in(0,2,4,8,16):
            time.sleep(d);p=sh('git','push','-q','-f','origin','HEAD:refs/heads/lowpoly-media',cwd=w,ok=True)
            if p.returncode==0:break
        else:raise SystemExit('push failed: '+p.stderr.strip()[:200])
    finally:shutil.rmtree(w,ignore_errors=True)
    out={}
    for n,p in files.items():
        u=RAW+n;H={'Accept-Encoding':'identity'}
        for _ in range(8):
            h=requests.head(u,allow_redirects=True,timeout=60,headers=H)
            if h.status_code==200 and int(h.headers.get('content-length',-1))==os.path.getsize(p):break
            time.sleep(5)
        else:raise SystemExit(f'{u} -> HTTP {h.status_code}, size {h.headers.get("content-length")} != {os.path.getsize(p)}')
        out[n]=u
    return out
def main():
    a=sys.argv[1:];cid=a[0];dry='--dry-run' in a;at=a[a.index('--at')+1] if '--at' in a else None
    m=json.load(open(f'{R}/topics/{cid}.meta.json'));vp=f'{R}/out/{cid}/{cid}.mp4'
    PJ=R+'/posted.json';posted=json.load(open(PJ)) if os.path.exists(PJ) else {}
    bad=[]
    if len(m['tags'])<8:bad.append('fewer than 8 tags')
    if len(m['title'])>100:bad.append('title > 100')
    if cid in posted:bad.append(f'{cid} already posted: {posted[cid]}')
    if not os.path.exists(vp):bad.append('video missing')
    if bad:raise SystemExit('PREFLIGHT FAILED: '+'; '.join(bad))
    print('TAGS (set in YouTube Studio):',', '.join(m['tags']))
    if dry:print('dry run ok');return
    url=host({cid+'.mp4':vp})[cid+'.mp4'];print('hosted',url)
    inp=dict(channelId=CH['YOUTUBE_CHANNEL_ID'],schedulingType='automatic',needsApproval=False,text=m['description'],assets=[dict(video=dict(url=url,metadata=dict(title=m['title'])))],
      metadata=dict(youtube=dict(title=m['title'],categoryId='27',privacy='public',madeForKids=False,notifySubscribers=True,embeddable=True,isAiGenerated=False)))
    if at:inp.update(mode='customScheduled',dueAt=at)
    else:inp.update(mode='shareNow')
    r=B.gql(B.CREATE if hasattr(B,'CREATE') else CREATE,dict(input=inp));x=(r.get('data') or {}).get('createPost') or {}
    if x.get('__typename')!='PostActionSuccess':raise SystemExit('Buffer failed: '+json.dumps(r)[:500])
    posted[cid]=dict(id=x['post']['id'],status=x['post'].get('status'),dueAt=x['post'].get('dueAt'),at=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()));json.dump(posted,open(PJ,'w'),indent=1);print('POSTED',posted[cid])
CREATE="""mutation($input: CreatePostInput!){ createPost(input:$input){ __typename
 ... on PostActionSuccess { post { id status dueAt } }
 ... on InvalidInputError { message } ... on UnexpectedError { message } ... on RestProxyError { message }
 ... on LimitReachedError { message } ... on UnauthorizedError { message } ... on NotFoundError { message } } }"""
B.CREATE=CREATE
main()
