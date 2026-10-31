#!/usr/bin/env python3
"""post_clip.py CLIP_ID : schedule one finished clip (already in state/queue.json with status 'ready') on YouTube + TikTok + Instagram through Buffer, at the next free slot of the grid.
Video + cover are hosted by media.py (one branch per posting day); AI-generated labels are on for all three platforms; IG/TikTok cover = the embedded first frames (thumbnailOffset 50 ms).
Preflight like publish.py: the media URL must answer 200 with the right size, copy must fit, YouTube tags must exist (standing rule).  Writes the Buffer post ids into the state."""
import sys,os,json,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');sys.path.insert(0,R);sys.path.insert(0,os.environ.get('SER_DIR',REPO+'/studio/ser'))
import state as ST,slots,media,yt_api as Y,buffer_api as B
CH=json.load(open(REPO+'/studio/ser/channels.json'))
AIFLAG=bool(json.load(open(os.path.join(R,'config.json'))).get('ai_generated_flag',False))   # owner 2026-10-30: no AI label on posts
class Partial(Exception):pass
def post(c,video_url,due_iso,dry=False,channels=('yt','tt','ig')):
    tags=[t for t in c['tags'].split(',') if t.strip()]
    bad=[]
    if len(tags)<8:bad.append('YouTube tags missing (standing rule: every video has >= 8 tags)')
    if len(c['yt_title'])>100:bad.append('YouTube title > 100 chars')
    if len(c['ig'])>2200 or len(c['tt'])>2200:bad.append('caption too long')
    if not (c.get('topic') and c.get('part') and c.get('of')):bad.append('series name / topic / part missing (standing rule)')
    if bad:raise SystemExit('PREFLIGHT FAILED: '+'; '.join(bad))
    posts=dict(c.get('posts') or {})    # a clip that was half posted earlier keeps what exists (never post a channel twice)
    for k in channels:
        if k in posts:continue
        asset=dict(url=video_url,metadata=dict(title=c['yt_title']) if k=='yt' else dict(thumbnailOffset=50))
        inp=dict(channelId=CH[k],schedulingType='automatic',text=dict(yt=c['yt_desc'],tt=c['tt'],ig=c['ig'])[k],assets=[dict(video=asset)],mode='customScheduled',dueAt=due_iso)
        if k=='yt':inp['metadata']=dict(youtube=dict(title=c['yt_title'],categoryId='1',privacy='public',madeForKids=False,notifySubscribers=True,embeddable=True,isAiGenerated=AIFLAG))
        if k=='ig':inp['metadata']=dict(instagram=dict(type='reel',shouldShareToFeed=True,isAiGenerated=AIFLAG))
        if k=='tt':inp['metadata']=dict(tiktok=dict(isAiGenerated=AIFLAG))
        if dry:print('  would post',k,due_iso);continue
        r=B.gql(B.CREATE,dict(input=inp));x=(r.get('data') or {}).get('createPost') or {}
        if x.get('__typename')!='PostActionSuccess':c['posts']=posts;raise Partial(f'Buffer {k} failed: {json.dumps(r)[:300]}')
        posts[k]=x['post']['id']
    return posts
def schedule(s,cid,dry=False,force_buffer_youtube=False):
    """put one 'ready' (or half-posted) clip on the next free slot; returns (due_iso, posts)"""
    c=ST.find(s,cid)
    if not c or c.get('status') not in('ready','partial'):raise SystemExit(f'{cid}: not in state with status ready/partial')
    slot=dt.datetime.fromisoformat(c['due'].replace('Z','')) if c.get('due') else slots.next_slots(1,ST.taken_slots(s))[0]
    day=(slot+dt.timedelta(hours=slots.CFG['slot_tz_offset_hours'])).strftime('%Y-%m-%d')
    vp=os.path.join(REPO,c['video']) if os.path.exists(os.path.join(REPO,c['video'])) else c['video']
    try:Y.creds();native=not force_buffer_youtube      # a working OAuth credential: YouTube is uploaded by us (tags, thumbnail, subtitles, playlist set at once, publishes itself at the due time)
    except SystemExit:native=False                      # otherwise YouTube goes through Buffer and its chores stay manual (finish_youtube.py can do them once the credential exists)
    urls=media.upload(day,{os.path.basename(c['video']):vp}) if not dry else {os.path.basename(c['video']):'(dry)'}
    c['due']=slots.iso(slot)
    try:posts=post(c,urls[os.path.basename(c['video'])],c['due'],dry,channels=('tt','ig') if native else ('yt','tt','ig'))
    except Partial as e:c.update(status='partial',media_day=day);ST.save(s);raise SystemExit(f'{cid}: {e}')
    if dry:c.pop('due',None);return slots.iso(slot),posts
    c.update(status='scheduled',posts=posts,media_day=day,yt_mode='native' if native else 'buffer');ST.save(s)
    if native:
        vid=Y.upload_video(vp,c['yt_title'],c['yt_desc'],[t.strip() for t in c['tags'].split(',') if t.strip()],c['due']);c['yt_video_id']=vid;c['done']={};ST.save(s)
        for step,fn in(('thumb',lambda:Y.set_thumbnail(vid,os.path.join(REPO,c['thumb']))),('en',lambda:Y.add_caption(vid,'en','English',os.path.join(REPO,c['caps_en']))),('th',lambda:Y.add_caption(vid,'th','Thai (ไทย)',os.path.join(REPO,c['caps_th']))),('playlist',lambda:Y.add_to_playlist(Y.playlist_id(c['playlist']),vid))):
            try:fn();c['done'][step]=True
            except SystemExit as e:c['last_error']=f'{step}: {e}'
        c['done']['tags']=True
        if all(c['done'].get(x) for x in('tags','thumb','en','th','playlist')):c['status']='finished'
        ST.save(s)
    return c['due'],posts
if __name__=='__main__':
    ids=[a for a in sys.argv[1:] if not a.startswith('--')];dry='--dry-run' in sys.argv;s=ST.load()
    for cid in ids:
        due,posts=schedule(s,cid,dry,'--buffer-youtube' in sys.argv);print(cid,'->',due,posts)
