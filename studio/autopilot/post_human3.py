#!/usr/bin/env python3
"""post_human3.py [--dry-run] : schedule the 3 hand-written REMAIN CALM shorts (hm1..hm3) on YT/TT/IG via Buffer. First at 14:35Z 2026-10-31, then 90 min apart (owner: post 1 h after the request)."""
import sys,os,time,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,post_clip as PC
dry='--dry-run' in sys.argv
TAGS='remain calm, zombie apocalypse, zombie animation, zombie comedy, animated short, survival, supermarket zombie, what if zombies, post time survival, horror comedy, zombie short film, funny zombie, how to stay calm, pov, funny'
M=[('hm1',"Gus Stress-Eats During A Zombie Apocalypse","Gus got scared, so he ate Mimi's pudding. The dead can't smell fear on a man who is busy with dessert. Night-shift rule: keep eating.","Gus got scared, so he ate Mimi's pudding. Rule of the night shift: keep eating. 🧟🍮"),
 ('hm2',"A Zombie Leaves A One-Star Review","A zombie fills out a feedback form at Freshway. The complaint: the staff was too calm.","The complaint: the staff was too calm. One star. 🧟⭐"),
 ('hm3',"Rough Night?","Six years on the night shift. Mimi smiles for everyone who walks in, including the ones who can smell fear.","Not at all. 🧟")]
start=dt.datetime(2026,10,31,14,35)
s=ST.load()
for i,(k,title,desc,cap) in enumerate(M):
    cid=f'rch_{k}';od=f'releases/remaincalm/batch1/{k}';due=(start+dt.timedelta(minutes=90*i)).strftime('%Y-%m-%dT%H:%M:00.000Z')
    c=ST.find(s,cid)
    if not c:
        c=dict(id=cid,series='REMAIN CALM',part=1,of=1,topic=title,yt_title=title,
         yt_desc=f"{desc}\n\nFrom REMAIN CALM, a short animated series set in a 24-hour supermarket where the dead can smell fear. Voices are synthetic (text-to-speech).\n\nWould you stay calm? Tell me in the comments.\n\n#zombie #animation #shorts #remaincalm",
         tt=f"{cap} #zombie #animation #remaincalm",ig=f"{cap} #zombie #animation #reels #remaincalm",pin='Would you stay calm? Tell me below.',tags=TAGS,playlist='REMAIN CALM',
         video=f'{od}/{k}.mp4',thumb=f'{od}/cover_9x16.jpg',caps_en=f'{od}/captions_en.srt',caps_th=f'{od}/captions_en.srt',status='ready',done={},due=due)
        s['clips'].append(c);ST.save(s)
    c['due']=due
    print(cid,due,title)
    if dry or c.get('status')=='scheduled':continue
    PC.schedule(s,cid,False,True);time.sleep(5)
print('done')
