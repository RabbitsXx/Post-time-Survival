#!/usr/bin/env python3
"""finish_youtube.py [--dry-run] [--only ID] : for every clip whose YouTube post is out, do what Buffer cannot: tags, custom thumbnail, English + Thai subtitles, playlist.
Idempotent (each step is remembered in state/queue.json), quota-aware (yt_api.LIMIT), safe to run every hour.  Costs per clip about 950 quota units (tags 51, thumbnail 50, 2 subtitle files 800, playlist 51)."""
import sys,os,json
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');sys.path.insert(0,R);sys.path.insert(0,os.environ.get('SER_DIR',REPO+'/studio/ser'))
import state as ST,yt_api as Y,buffer_api as B
a=sys.argv[1:];dry='--dry-run' in a;only=a[a.index('--only')+1] if '--only' in a else None
STEPS=['tags','thumb','en','th','playlist']
def do(c,vid,step):
    p=lambda k:os.path.join(REPO,c[k])
    if step=='tags':Y.set_tags(vid,[t.strip() for t in c['tags'].split(',') if t.strip()])
    elif step=='thumb':Y.set_thumbnail(vid,p('thumb'))
    elif step=='en':Y.add_caption(vid,'en','English',p('caps_en'))
    elif step=='th':Y.add_caption(vid,'th','Thai (ไทย)',p('caps_th'))
    elif step=='playlist':
        pl=ST_PL.get(c['playlist']) or Y.playlist_id(c['playlist']);ST_PL[c['playlist']]=pl;Y.add_to_playlist(pl,vid)
ST_PL={}
s=ST.load();n_done=0
for c in s['clips']:
    if only and c['id']!=only:continue
    if c.get('status')=='finished' or not c.get('posts',{}).get('yt'):continue
    c.setdefault('done',{})
    if not c.get('yt_video_id'):
        st=B.status(c['posts']['yt']);
        if st.get('status')=='error':c['status']='yt_post_error';c['last_error']=(st.get('error') or {}).get('message');continue
        if st.get('status')!='sent':continue          # not out yet
        c['yt_video_id']=Y.video_id_from_url(st.get('externalLink'))
        if not c['yt_video_id']:c['last_error']='sent but no video id in '+str(st.get('externalLink'));continue
    vid=c['yt_video_id'];todo=[x for x in STEPS if not c['done'].get(x)]
    print(c['id'],vid,'todo:',todo or 'nothing')
    for step in todo:
        if dry:continue
        try:
            do(c,vid,step);c['done'][step]=True;c.pop('last_error',None);n_done+=1;ST.save(s)
        except SystemExit as e:
            c['last_error']=f'{step}: {e}';ST.save(s);print('  !',c['last_error'])
            if 'quota' in str(e).lower():print('quota reached, stopping');sys.exit(0 if not dry else 0)
            break
    if all(c['done'].get(x) for x in STEPS):c['status']='finished'
(None if dry else ST.save(s));print('steps done:',n_done,'| quota used today:',Y.quota_used(),'/',Y.LIMIT)
