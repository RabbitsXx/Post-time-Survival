#!/usr/bin/env python3
"""package_clip.py ID [ID ...] : a built clip (QA passed) -> repo files (EN/TH subtitles + a small JPEG cover under releases/<arc>/<id>/) and a state entry with status 'ready'.
The video itself stays in the toolchain folder (LONG_DIR) until post_clip.py puts it on a media branch for Buffer.  Idempotent."""
import sys,os,shutil,json
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');LONG=os.environ.get('LONG_DIR',REPO+'/studio/long')
sys.path.insert(0,R);sys.path.insert(0,LONG)
import state as ST,clipreg as CR
from PIL import Image
s=ST.load()
for cid in sys.argv[1:]:
    if ST.find(s,cid):print(cid,'already in state');continue
    si=CR.series(cid);m=CR.meta(cid);arc=cid.rsplit('_',1)[0];rel=f'releases/{arc}/{cid}';d=os.path.join(REPO,rel);os.makedirs(d,exist_ok=True)
    src=f'{LONG}/{CR.release(cid)}'
    for f in('captions_en.srt','captions_th.srt','PUBLISH.md'):shutil.copy(f'{src}/{f}',f'{d}/{f}')
    Image.open(f'{src}/cover_9x16.png').convert('RGB').save(f'{d}/cover_9x16.jpg',quality=90)
    Image.open(f'{src}/cover_16x9.png').convert('RGB').save(f'{d}/cover_16x9.jpg',quality=90)
    video=f'{LONG}/{CR.final(cid)}'
    assert os.path.exists(video),video
    s['clips'].append(dict(id=cid,series=si['name'],part=si['part'],of=si['of'],topic=CR.module(cid).P.topic,yt_title=m['yt_title'],yt_desc=m['yt_desc'],tt=m['tt'],ig=m['ig'],pin=m['pin'],tags=m['tags'],
        playlist=si['name'],video=video,thumb=rel+'/cover_9x16.jpg',caps_en=rel+'/captions_en.srt',caps_th=rel+'/captions_th.srt',status='ready',done={}))
    print(cid,'ready')
ST.save(s)
