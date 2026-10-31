#!/usr/bin/env python3
"""analytics.py : how are we doing?  Public numbers only (an API key is enough, no OAuth): views / likes / comments of every posted clip + channel totals.
Video ids come from state/queue.json (yt_video_id) or, if missing, from the Buffer post status (externalLink).  Appends one row per run to kpi.jsonl and writes ANALYTICS.md.
Never raises, never prints secrets.  With OAuth later (refresh_token) retention / traffic sources can be added (YouTube Analytics API)."""
import sys,os,json,datetime as dt,urllib.request,urllib.parse
R=os.path.dirname(os.path.abspath(__file__));A=R+'/../autopilot';sys.path.insert(0,A);sys.path.insert(0,os.path.abspath(R+'/../ser'))
import state as ST,yt_api as Y
def key():
    k=Y._env('youtube_api','youtube_data_api_key','api_key')
    return k if k and k.startswith('AIza') else None
def get(url):
    with urllib.request.urlopen(url,timeout=20) as r:return json.load(r)
def video_ids(s):
    out={}
    for c in s['clips']:
        v=c.get('yt_video_id')
        if not v and c.get('posts',{}).get('yt'):
            try:
                import buffer_api as B;st=B.status(c['posts']['yt'])
                if st.get('status')=='sent':v=Y.video_id_from_url(st.get('externalLink'));c['yt_video_id']=v
            except Exception:pass
        if v:out[c['id']]=v
    return out
def deep():
    """retention per video from the YouTube Analytics API (needs OAuth scope yt-analytics.readonly in the Refresh_token); returns {video_id: dict} or {} with a note"""
    try:
        tk=Y.token()
        import requests
        r=requests.get('https://youtubeanalytics.googleapis.com/v2/reports',headers={'Authorization':'Bearer '+tk},params=dict(ids='channel==MINE',startDate='2026-10-01',endDate=dt.date.today().isoformat(),metrics='views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained',dimensions='video',sort='-views',maxResults=50),timeout=30)
        if r.status_code!=200:return {},'analytics API %s: %s'%(r.status_code,r.text[:160].replace(chr(10),' '))
        return {row[0]:dict(views=row[1],minutes=row[2],avg_secs=row[3],avg_pct=row[4],subs=row[5]) for row in r.json().get('rows',[])},''
    except BaseException as e:return {},'retention unavailable: '+type(e).__name__+' '+str(e)[:100]
def run():
    s=ST.load();k=key();rows=[];note=[]
    if not k:note.append('no YouTube API key visible in this session: analytics skipped')
    ids=video_ids(s) if k else {}
    ST.save(s)
    stats={}
    if k and ids:
        L=list(ids.values())
        for i in range(0,len(L),50):
            try:
                j=get('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=%s&key=%s'%(','.join(L[i:i+50]),k))
                for it in j.get('items',[]):stats[it['id']]=it
            except Exception as e:note.append('api error '+type(e).__name__)
    dp,dn=deep() if ids else ({},'')
    if dn:note.append(dn)
    for c in s['clips']:
        v=ids.get(c['id']);it=stats.get(v) if v else None
        if it:
            st=it['statistics'];rows.append(dict(clip=c['id'],series=c['series'],part=c['part'],views=int(st.get('viewCount',0)),likes=int(st.get('likeCount',0)),comments=int(st.get('commentCount',0)),**{k:dp.get(v,{}).get(k) for k in('avg_pct','avg_secs','subs')},published=it['snippet']['publishedAt'],title=it['snippet']['title']))
    tot=dict(at=dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'),clips_live=len(rows),views=sum(r['views'] for r in rows),likes=sum(r['likes'] for r in rows),comments=sum(r['comments'] for r in rows))
    open(R+'/kpi.jsonl','a').write(json.dumps(dict(tot,rows=rows))+'\n')
    L=['# ANALYTICS',f"updated {tot['at']}  |  live clips {tot['clips_live']}  |  views {tot['views']}  |  likes {tot['likes']}  |  comments {tot['comments']}",'']+['* '+n for n in note]
    if rows:
        L+=['','| clip | series | views | likes | comments | like rate | avg % viewed | avg secs |','|---|---|---:|---:|---:|---:|---:|---:|']
        for r in sorted(rows,key=lambda r:-r['views']):L.append(f"| {r['clip']} | {r['series']} p{r['part']} | {r['views']} | {r['likes']} | {r['comments']} | {r['likes']/max(1,r['views']):.1%} | {'' if r.get('avg_pct') is None else str(round(r['avg_pct']))+'%'} | {'' if r.get('avg_secs') is None else r['avg_secs']} |")
        by={}
        for r in rows:by.setdefault(r['series'],[]).append(r['views'])
        L+=['','## per series (mean views per clip)']+[f'* {k}: {sum(v)/len(v):.0f} ({len(v)} clips)' for k,v in sorted(by.items(),key=lambda x:-sum(x[1])/len(x[1]))]
    open(R+'/ANALYTICS.md','w').write('\n'.join(L)+'\n');print('\n'.join(L[:12]))
if __name__=='__main__':
    try:run()
    except Exception as e:print('analytics failed:',type(e).__name__,str(e)[:120])
