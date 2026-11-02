#!/usr/bin/env python3
"""post_ks3.py [--now] : MIDNIGHT SKEWERS Night 3 (ks3, part 3) on YouTube + TikTok + Instagram.
--now (owner command 2026-11-02 "โพสเลย"): post immediately. YouTube is uploaded (tags, cover, EN captions, playlist) and made public at once;
TikTok and Instagram go through Buffer and are switched from scheduled to shareNow (edited in place, no duplicates).
No AI label (config ai_generated_flag=false). English only. Secrets come from the environment / ENV_FILE and are never printed."""
import sys,os,time,json,datetime as dt,requests
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,slots,post_clip as PC,buffer_api as B,yt_api as Y,media
now='--now' in sys.argv
CID='ks3_n3';od='releases/remaincalm/batch1/fb_night3'
TITLE="Night 3: Count Them… Does Your Count Match?"
TAGS='midnight skewers, night 3, count them, night shift horror, cctv horror, anomaly horror game, creepy short, horror short, scary animation, 3d animation horror, street food horror, scary stories, shorts horror, post time survival'
DESC=("Night three at the roadside skewer stall. One rule: the camera and the window must show the same number of people. If not, close the shutter.\n\n"
 "Count them before the stall does.\n\nMIDNIGHT SKEWERS is an original animated horror series by Post Time Survival. Fiction.\n\n#shorts #horror #nightshift #cctv #creepy #3danimation")
TT="The camera and the window must match. Did you count right? 👀 Night 3 #horror #nightshift #creepy #cctv #fyp"
IG="The camera and the window must match. Did you count right? 👀 Night 3 of Midnight Skewers #horror #nightshift #creepy #cctv #reels #3danimation"
EDIT="""mutation($input: EditPostInput!){ editPost(input:$input){ __typename
 ... on PostActionSuccess { post { id status dueAt } }
 ... on InvalidInputError { message } ... on UnexpectedError { message } ... on RestProxyError { message }
 ... on LimitReachedError { message } ... on UnauthorizedError { message } ... on NotFoundError { message } } }"""
assert len(TITLE)<=100
s=ST.load();c=ST.find(s,CID)
if c and c.get('status') in ('scheduled','finished'):raise SystemExit(f'{CID} already {c["status"]}')
if not c:
    due=slots.iso(dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)+dt.timedelta(minutes=13))
    c=dict(id=CID,series='MIDNIGHT SKEWERS',part=3,of=3,topic="Night 3: Count Them",yt_title=TITLE,yt_desc=DESC,tt=TT,ig=IG,
      pin='How many did you count? Tell me in the comments. Night 4 is coming.',tags=TAGS,playlist='MIDNIGHT SKEWERS',video=f'{od}/night3.mp4',thumb=f'{od}/cover_9x16.jpg',
      caps_en=f'{od}/captions_en.srt',status='ready',done={'th':True},due=due)
    s['clips'].append(c);ST.save(s)
print(CID,'tags',len(c['tags'].split(',')),'title',len(c['yt_title']),'chars')
due,posts=PC.schedule(s,CID,False)                     # uploads the media, creates the Buffer posts, uploads to YouTube (private until made public below)
c=ST.find(ST.load(),CID);print('scheduled step done:',c.get('status'),c.get('yt_video_id'),c.get('posts'))
if now:
    url=media.url(c['media_day'],os.path.basename(c['video']))
    for k in('tt','ig'):
        inp=dict(id=c['posts'][k],mode='shareNow',schedulingType='automatic',text=c[k],assets=[dict(video=dict(url=url,metadata=dict(thumbnailOffset=50)))],
                 metadata=dict(tiktok=dict(isAiGenerated=False)) if k=='tt' else dict(instagram=dict(type='reel',shouldShareToFeed=True,isAiGenerated=False)))
        r=B.gql(EDIT,dict(input=inp));x=(r.get('data') or {}).get('editPost') or {}
        print('shareNow',k,x.get('__typename'),(x.get('post') or {}).get('status') or x.get('message'))
    Y.spend(50,Y.LIMIT);h={'Authorization':'Bearer '+Y.token(),'Content-Type':'application/json'}
    r=requests.put('https://www.googleapis.com/youtube/v3/videos?part=status',headers=h,data=json.dumps(dict(id=c['yt_video_id'],status=dict(privacyStatus='public',selfDeclaredMadeForKids=False))),timeout=60)
    print('youtube public',r.status_code,'' if r.status_code<300 else r.text[:200])
    c['due']=time.strftime('%Y-%m-%dT%H:%M:00.000Z',time.gmtime());c['posted_now']=True;ST.save(s)
    t0=time.time();res={}
    while time.time()-t0<300:
        res={k:B.status(pid) for k,pid in c['posts'].items()}
        if all(x.get('status') in('sent','error') for x in res.values()):break
        time.sleep(8)
    for k,x in res.items():print('buffer',k,x.get('status'),'sentAt',x.get('sentAt'),'link',x.get('externalLink'),'err',(x.get('error') or {}).get('message'))
    v=requests.get('https://www.googleapis.com/youtube/v3/videos',params=dict(part='status',id=c['yt_video_id']),headers=h,timeout=60).json()['items'][0]['status']
    print('youtube',v.get('privacyStatus'),'publishAt',v.get('publishAt'),'synthetic',v.get('containsSyntheticMedia'))
