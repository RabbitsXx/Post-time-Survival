#!/usr/bin/env python3
"""post_ks2.py [--dry-run] : post MIDNIGHT SKEWERS Night 2 (ks2) on YT/TT/IG (owner command 2026-11-01: "post it now, with cover and tags").
YouTube is uploaded natively (tags, cover, EN captions, playlist set at once, publishes itself at the due time); TikTok + Instagram go through Buffer.
No AI label (config ai_generated_flag=false). English only. Needs the owner's secrets in the environment / ENV_FILE (never printed)."""
import sys,os,time,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,slots,post_clip as PC
dry='--dry-run' in sys.argv
CID='ks2_n2';od='releases/remaincalm/batch1/ks2'
TITLE="Night 2: 3 Rules, 1 Stick… and Something Staring Into My Camera"
TAGS='midnight skewers, night 2, night shift horror, horror comedy, three rules horror, anomaly horror game, creepy short, horror short, scary animation, 3d animation horror, cctv horror, street food horror, scary stories, shorts horror, post time survival'
DESC=("Night 2 at the roadside skewer stall. Three rules: pay first, hands off the tray, breakers get the stick.\n\nMost customers are normal. The clown wants the tray. The big guy won't fit through the window. "
 "And one of them can't be fought at all — so you hit the shutter.\n\nWhich rule would you have broken? Comment below. Night 3 is coming.\n\n"
 "MIDNIGHT SKEWERS is an original animated horror-comedy series by Post Time Survival. Fiction.\n\n#shorts #horror #horrorcomedy #nightshift #creepy #cctv #3danimation")
TT="3 rules. 1 stick. And something that doesn't care about either. 👀 Night 2 #horror #horrorcomedy #nightshift #creepy #fyp"
IG="3 rules. 1 stick. And something that doesn't care about either. 👀 Night 2 of Midnight Skewers #horror #horrorcomedy #nightshift #creepy #reels #3danimation"
s=ST.load();c=ST.find(s,CID)
due=slots.iso(dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)+dt.timedelta(minutes=13))
if not c:
    c=dict(id=CID,series='MIDNIGHT SKEWERS',part=2,of=2,topic="Night 2: Three Rules and a Stick",yt_title=TITLE,yt_desc=DESC,tt=TT,ig=IG,
      pin='Which rule would YOU have broken? Comment below. Night 3 is coming.',tags=TAGS,playlist='MIDNIGHT SKEWERS',video=f'{od}/ks2.mp4',thumb=f'{od}/cover_9x16.jpg',
      caps_en=f'{od}/captions_en.srt',status='ready',done={'th':True},due=due)
    s['clips'].append(c)
    if not dry:ST.save(s)
assert len(c['yt_title'])<=100
print(CID,due,len(c['yt_title']),'chars title; tags',len(c['tags'].split(',')),'(',len(c['tags']),'chars )')
if dry:
    print(PC.schedule(s,CID,True) if c.get('status')=='ready' else 'not ready');raise SystemExit
if c.get('status') in('scheduled','finished'):print('already scheduled');raise SystemExit
print(PC.schedule(s,CID,False))
