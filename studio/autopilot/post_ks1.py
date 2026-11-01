#!/usr/bin/env python3
"""post_ks1.py [--dry-run] : post MIDNIGHT SKEWERS Night 1 (ks1) now on YT/TT/IG via Buffer (owner command 2026-11-01). No AI label. English captions only."""
import sys,os,time,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,slots,post_clip as PC
dry='--dry-run' in sys.argv
CID='ks1_n1';od='releases/remaincalm/batch1/ks1'
TITLE="One of My Customers Isn't Human… Can You Spot Them? (Night 1)"
TAGS='midnight skewers, night shift horror, spot the anomaly, anomaly horror game, creepy short, horror short, scary animation, 3d animation horror, cctv horror, street food horror, one rule horror, can you spot it, scary stories, shorts horror, post time survival'
DESC=("Night shift at a roadside skewer stall. One rule: the camera shows what's wrong.\n\nTwo customers tonight. One of them isn't human — can you spot them before I do?\n\n"
 "Night 2 is coming. Comment who you think it will be.\n\nMIDNIGHT SKEWERS is an original animated horror series by Post Time Survival. Fiction.\n\n#shorts #horror #anomaly #nightshift #creepy #spottheanomaly #3danimation")
TT="Two customers. One isn't human. Can you spot them before I do? 👀 #horror #anomaly #nightshift #creepy #fyp"
IG="Two customers. One isn't human. Can you spot them before I do? 👀 #horror #anomaly #nightshift #creepy #reels #3danimation"
s=ST.load();c=ST.find(s,CID)
due=slots.iso(dt.datetime.utcnow()+dt.timedelta(minutes=13))
if not c:
    c=dict(id=CID,series='MIDNIGHT SKEWERS',part=1,of=1,topic="Night 1: The Camera Shows What's Wrong",yt_title=TITLE,yt_desc=DESC,tt=TT,ig=IG,
      pin='Who do you think it will be on Night 2? Comment below.',tags=TAGS,playlist='MIDNIGHT SKEWERS',video=f'{od}/ks1.mp4',thumb=f'{od}/cover_9x16.jpg',
      caps_en=f'{od}/captions_en.srt',status='ready',done={'th':True},due=due)
    if not dry:s['clips'].append(c);ST.save(s)
assert len(c['yt_title'])<=100
print(CID,due,len(c['yt_title']),'chars title; tags',len(c['tags'].split(',')))
if dry:
    print(PC.schedule(s,CID,True,True) if c.get('status')=='ready' else 'not ready');raise SystemExit
if c.get('status')=='scheduled':print('already scheduled');raise SystemExit
print(PC.schedule(s,CID,False,True))
