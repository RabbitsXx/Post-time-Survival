"""yt_api.py : the part of YouTube that Buffer cannot do (tags, custom thumbnail, subtitles, playlist), through the YouTube Data API v3.
Credential: secrets Client_ID + Client_secret + Refresh_token, or one JSON in Youtube_API {"client_id":..,"client_secret":..,"refresh_token":..}.
A bare API key (AIza...) can only READ public data: it cannot edit a video, so it is rejected with a clear message.
Needs the scope  https://www.googleapis.com/auth/youtube  (manage the account).  Never print the credential."""
import os,json,time,datetime as dt,re,uuid,requests
R=os.path.dirname(os.path.abspath(__file__));STATE=R+'/state';os.makedirs(STATE,exist_ok=True)
COST=dict(list=1,update=50,insert=50,thumb=50,caption=400,upload=1600)   # quota units per call (Google's quota calculator; check it when the numbers matter)
class NoCredential(SystemExit):pass
_tok={}
def _env(*names):
    low=[n.lower() for n in names]
    for k,v in os.environ.items():
        if k.lower() in low and v.strip():return v.strip()
def creds():
    """Either one JSON in Youtube_API, or three separate secrets Client_ID + Client_secret + Refresh_token (any capitalisation; Youtube_refresh_token also accepted)"""
    cid,sec,rt=_env('client_id','youtube_client_id'),_env('client_secret','youtube_client_secret'),_env('refresh_token','youtube_refresh_token')
    raw=_env('youtube_api')
    if raw and raw.startswith('{'):
        try:j=json.loads(raw)
        except Exception:raise NoCredential('Youtube_API looks like JSON but does not parse')
        for k in('installed','web'):
            if isinstance(j.get(k),dict):j={**j[k],**{x:y for x,y in j.items() if x!=k}}
        cid,sec,rt=j.get('client_id') or cid,j.get('client_secret') or sec,j.get('refresh_token') or rt
    miss=[n for n,v in(('client_id',cid),('client_secret',sec),('refresh_token',rt)) if not v]
    if miss:
        hint=' (Youtube_API is a plain API key AIza..., which can only read public data)' if (raw or '').startswith('AIza') else ''
        raise NoCredential('missing '+', '.join(miss)+hint+'. A client id + secret alone cannot touch the channel: the owner must also authorise once (OAuth Playground, scope https://www.googleapis.com/auth/youtube) and store the Refresh token as secret Refresh_token')
    return dict(client_id=cid,client_secret=sec,refresh_token=rt)
def token():
    if _tok.get('exp',0)>time.time()+60:return _tok['t']
    c=creds();r=requests.post('https://oauth2.googleapis.com/token',data=dict(client_id=c['client_id'],client_secret=c['client_secret'],refresh_token=c['refresh_token'],grant_type='refresh_token'),timeout=60)
    j=r.json()
    if 'access_token' not in j:raise SystemExit('YouTube OAuth refresh failed: '+str(j.get('error'))+' - '+str(j.get('error_description','')) +'  (refresh tokens of an app in "Testing" expire after 7 days: publish the consent screen to "In production" and authorise again)')
    _tok.update(t=j['access_token'],exp=time.time()+int(j.get('expires_in',3000)));return _tok['t']
# ---- quota ledger (resets at midnight Pacific) --------------------------------------------------------------------------------------
def _day():
    try:
        from zoneinfo import ZoneInfo;return dt.datetime.now(ZoneInfo('America/Los_Angeles')).strftime('%Y-%m-%d')
    except Exception:return (dt.datetime.utcnow()-dt.timedelta(hours=8)).strftime('%Y-%m-%d')
def quota_used():
    try:j=json.load(open(STATE+'/yt_quota.json'));return j['used'] if j.get('day')==_day() else 0
    except Exception:return 0
def spend(units,limit):
    u=quota_used()
    if u+units>limit:raise SystemExit(f'YouTube quota guard: {u}+{units} would pass the daily limit {limit}; try again after midnight Pacific')
    json.dump(dict(day=_day(),used=u+units),open(STATE+'/yt_quota.json','w'))
LIMIT=int(os.environ.get('YT_QUOTA_LIMIT','9000'))
def call(method,url,kind,**kw):
    spend(COST[kind],LIMIT)
    h=kw.pop('headers',{});h['Authorization']='Bearer '+token()
    r=requests.request(method,url,headers=h,timeout=300,**kw)
    if r.status_code>=300:
        try:m=r.json()['error']['message']
        except Exception:m=r.text[:200]
        raise SystemExit(f'YouTube {method} {url.split("?")[0].rsplit("/",1)[-1]} -> HTTP {r.status_code}: {m}')
    return r.json() if r.content else {}
API='https://www.googleapis.com/youtube/v3/';UP='https://www.googleapis.com/upload/youtube/v3/'
def channel():
    j=call('GET',API+'channels?part=snippet,statistics&mine=true','list');it=(j.get('items') or [None])[0]
    if not it:raise SystemExit('this credential has no YouTube channel (authorise with the Google account that owns the channel)')
    return dict(id=it['id'],title=it['snippet']['title'],videos=it['statistics'].get('videoCount'))
def video(vid):
    it=(call('GET',API+'videos?part=snippet,status&id='+vid,'list').get('items') or [None])[0]
    if not it:raise SystemExit(f'video {vid} not found on this channel')
    return it
def set_tags(vid,tags,description=None):
    v=video(vid);s=v['snippet'];body=dict(id=vid,snippet=dict(title=s['title'],description=description if description is not None else s.get('description',''),categoryId=s['categoryId'],tags=tags,**({'defaultLanguage':s['defaultLanguage']} if s.get('defaultLanguage') else {}),**({'defaultAudioLanguage':s['defaultAudioLanguage']} if s.get('defaultAudioLanguage') else {})))
    call('PUT',API+'videos?part=snippet','update',json=body)
def set_thumbnail(vid,path):
    b=open(path,'rb').read()
    if len(b)>2*1024*1024:   # YouTube limit 2 MB: re-encode as JPEG
        from PIL import Image;import io;im=Image.open(path).convert('RGB');o=io.BytesIO();im.save(o,'JPEG',quality=90);b=o.getvalue();ct='image/jpeg'
    else:ct='image/png' if path.lower().endswith('.png') else 'image/jpeg'
    call('POST',UP+f'thumbnails/set?videoId={vid}&uploadType=media','thumb',headers={'Content-Type':ct},data=b)
def add_caption(vid,lang,name,srt_path):
    meta=json.dumps(dict(snippet=dict(videoId=vid,language=lang,name=name,isDraft=False))).encode();srt=open(srt_path,'rb').read();bd='b'+uuid.uuid4().hex
    body=b'--'+bd.encode()+b'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+meta+b'\r\n--'+bd.encode()+b'\r\nContent-Type: application/octet-stream\r\n\r\n'+srt+b'\r\n--'+bd.encode()+b'--'
    call('POST',UP+'captions?part=snippet&uploadType=multipart','caption',headers={'Content-Type':f'multipart/related; boundary={bd}'},data=body)
def playlist_id(title,create=True,privacy='public'):
    j=call('GET',API+'playlists?part=snippet&mine=true&maxResults=50','list')
    for it in j.get('items',[]):
        if it['snippet']['title'].strip().lower()==title.strip().lower():return it['id']
    if not create:return None
    return call('POST',API+'playlists?part=snippet,status','insert',json=dict(snippet=dict(title=title,description=title+' - Post Time Survival'),status=dict(privacyStatus=privacy)))['id']
def add_to_playlist(pl,vid):
    call('POST',API+'playlistItems?part=snippet','insert',json=dict(snippet=dict(playlistId=pl,resourceId=dict(kind='youtube#video',videoId=vid))))
def video_id_from_url(u):
    m=re.search(r'(?:shorts/|watch\?v=|youtu\.be/)([A-Za-z0-9_-]{11})',u or '');return m.group(1) if m else None

def upload_video(path,title,description,tags,publish_at_iso=None,category='1',language='en',synthetic=True):
    """upload a finished clip as PRIVATE and let YouTube publish it by itself at publish_at_iso (UTC, 'YYYY-MM-DDTHH:MM:00.000Z'): no job is needed after the post.
    tags, description, title and the synthetic-content label are set in the same call.  Costs 1600 quota units (see COST).  Returns the video id."""
    spend(COST['upload'],LIMIT)
    st=dict(privacyStatus='private',selfDeclaredMadeForKids=False,containsSyntheticMedia=bool(synthetic))
    if publish_at_iso:st['publishAt']=publish_at_iso
    body=dict(snippet=dict(title=title,description=description,tags=tags,categoryId=category,defaultLanguage=language,defaultAudioLanguage=language),status=st)
    size=os.path.getsize(path);h={'Authorization':'Bearer '+token(),'Content-Type':'application/json; charset=UTF-8','X-Upload-Content-Length':str(size),'X-Upload-Content-Type':'video/mp4'}
    r=requests.post(UP+'videos?uploadType=resumable&part=snippet,status',headers=h,data=json.dumps(body).encode(),timeout=120)
    if r.status_code>=300:raise SystemExit(f'YouTube upload start -> HTTP {r.status_code}: {r.text[:300]}')
    loc=r.headers['Location']
    with open(path,'rb') as f:r=requests.put(loc,headers={'Content-Type':'video/mp4','Content-Length':str(size)},data=f,timeout=1800)
    if r.status_code>=300:raise SystemExit(f'YouTube upload -> HTTP {r.status_code}: {r.text[:300]}')
    return r.json()['id']
