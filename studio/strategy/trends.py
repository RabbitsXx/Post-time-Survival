#!/usr/bin/env python3
"""trends.py : what is working RIGHT NOW in our niche?  YouTube Data API (API key): most viewed recent Shorts for niche queries -> titles, length, tags, views/day.
Writes trends/<date>.json and TRENDS.md (top patterns: title words, numbers in titles, '?' titles, typical duration).  Costs ~100 quota per query (limit-aware, 6 queries).
The cloud session should ALSO use WebSearch for off-YouTube buzz (new zombie games / films / memes, TikTok formats) and write the findings into STRATEGY.md."""
import sys,os,json,re,datetime as dt,urllib.request,urllib.parse,collections
R=os.path.dirname(os.path.abspath(__file__));A=R+'/../autopilot';sys.path.insert(0,A);sys.path.insert(0,os.path.abspath(R+'/../ser'))
import yt_api as Y
Q=['zombie apocalypse animation shorts','stickman zombie survival','zombie survival tips shorts','animated zombie story series','zombie apocalypse funny animation','survival shorts story']
def get(u):
    with urllib.request.urlopen(u,timeout=20) as r:return json.load(r)
def iso_s(d):
    m=re.match(r'PT(?:(\d+)M)?(?:(\d+)S)?',d or '');return int(m.group(1) or 0)*60+int(m.group(2) or 0) if m else 0
def run():
    k=Y._env('youtube_api');
    if not(k and k.startswith('AIza')):print('trends: no API key in this session');return
    since=(dt.datetime.now(dt.timezone.utc)-dt.timedelta(days=21)).strftime('%Y-%m-%dT00:00:00Z');seen={};used=0
    for q in Q:
        try:
            j=get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&order=viewCount&maxResults=25&publishedAfter=%s&q=%s&key=%s'%(since,urllib.parse.quote(q),k));used+=100
            ids=[i['id']['videoId'] for i in j.get('items',[])]
            if not ids:continue
            v=get('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=%s&key=%s'%(','.join(ids),k));used+=1
            for it in v.get('items',[]):
                age=max(1,(dt.datetime.now(dt.timezone.utc)-dt.datetime.fromisoformat(it['snippet']['publishedAt'].replace('Z','+00:00'))).total_seconds()/86400);views=int(it['statistics'].get('viewCount',0))
                seen[it['id']]=dict(id=it['id'],title=it['snippet']['title'],channel=it['snippet']['channelTitle'],views=views,per_day=round(views/age),secs=iso_s(it['contentDetails']['duration']),tags=it['snippet'].get('tags',[])[:12],q=q)
        except Exception as e:print('query failed',q,type(e).__name__)
    top=sorted(seen.values(),key=lambda x:-x['per_day'])[:40]
    os.makedirs(R+'/trends',exist_ok=True);json.dump(dict(at=dt.date.today().isoformat(),quota_used=used,top=top),open(R+f'/trends/{dt.date.today().isoformat()}.json','w'),indent=1,ensure_ascii=False)
    W=collections.Counter(w for t in top for w in re.findall(r"[a-z']{4,}",t['title'].lower()) if w not in('shorts','animation','zombie','zombies','apocalypse','story'))
    L=['# TRENDS (niche, last 21 days, Shorts ranked by views per day)','',f'quota used {used}','','| views/day | secs | channel | title |','|---:|---:|---|---|']+[f"| {t['per_day']} | {t['secs']} | {t['channel'][:22]} | {t['title'][:80]} |" for t in top[:20]]
    if top:
        num=sum(bool(re.search(r'\d',t['title'])) for t in top)/len(top);q=sum('?' in t['title'] for t in top)/len(top)
        L+=['',f"* titles with a number: {num:.0%}; with a question: {q:.0%}; median length {sorted(t['secs'] for t in top)[len(top)//2]} s",'* common words: '+', '.join(f'{w}({n})' for w,n in W.most_common(15))]
    open(R+'/TRENDS.md','w').write('\n'.join(L)+'\n');print('\n'.join(L[:8]))
if __name__=='__main__':
    try:run()
    except Exception as e:print('trends failed:',type(e).__name__,str(e)[:120])
