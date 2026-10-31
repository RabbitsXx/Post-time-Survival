#!/usr/bin/env python3
"""post_batch1.py [--dry-run] : add the 10 REMAIN CALM shorts (batch1) to the queue and schedule them on YT/TT/IG via Buffer, 90 min apart from 2026-11-01 03:00Z (10:00 Thailand). Needs package_batch.py output."""
import sys,os,json,time,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R);sys.path.insert(0,R+'/../ser')
import state as ST,slots,post_clip as PC
dry='--dry-run' in sys.argv
BASE='remain calm, zombie apocalypse, zombie animation, zombie comedy, animated short, survival, supermarket zombie, what if zombies, post time survival, horror comedy, zombie short film, funny zombie'
T=lambda *a:', '.join(a)
M=[ # id, order, title, extra tags, tt/ig hook, description line
 ('i1','If the zombie apocalypse starts while you\'re at the supermarket at 3 AM… don\'t run','dont run zombie, slow breathing, how to stay calm','If the zombie apocalypse starts at 3 AM, do not run.','The dead hunt fear, not people. Real tip: slow your breathing (in 4, out 6) when you are startled.'),
 ('g1','POV: The self-checkout says "unexpected item in the bagging area" in a zombie apocalypse','self checkout, bagging area, pov','Unexpected item in the bagging area.','Please wait for assistance.'),
 ('g3','When your smartwatch says "Time to breathe" in a zombie apocalypse','smartwatch, heart rate, breathing','Heart rate: 160. Time to breathe.','Real tip: slow breathing lowers your heart rate.'),
 ('g2','POV: The express lane says 10 items or fewer in a zombie apocalypse','express lane, grocery, pov','Ten items or fewer, sir.','Lane four is open.'),
 ('i2','If the zombie apocalypse starts while you\'re holding a crying baby… do this','box breathing, crying baby, how to stay calm','Do not shush it. Breathe.','Real tip: box breathing is in 4, hold 4, out 4, hold 4.'),
 ('g6','When a zombie asks for the manager','manager, customer service, funny','Six years of customer service.','The manager is calm.'),
 ('g5','POV: Fire drill during a zombie apocalypse','fire drill, evacuation, pov','This is a drill. Please remain calm.','Single file, please.'),
 ('i4','If the zombie apocalypse starts while you\'re in the parking lot… don\'t run to your car','parking lot, dont run, how to stay calm','Calm gets you to the car. Fear gets you noticed.','Real tip: when you are startled, a long slow exhale helps you settle.'),
 ('i3','If the zombie apocalypse starts while you\'re in the checkout line… don\'t look back','checkout line, dont look back, queue','Pay. Smile. Walk out slowly.','Real tip: when you are scared, a slow exhale helps you calm down.'),
 ('g8','POV: You\'re locked out of the supermarket and a zombie asks if they\'re open','locked out, closed sign, pov','We\'re closed.','Sorry, sir. Please remain calm.')]
def main():
    s=ST.load();start=dt.datetime(2026,11,1,3,0);n=0
    for i,(k,title,xt,hook,desc) in enumerate(M):
        cid=f'rcb_{k}';od=f'releases/remaincalm/batch1/{k}';due=slots.iso(start+dt.timedelta(minutes=90*i))
        tags=BASE+', '+xt
        c=ST.find(s,cid)
        if not c:
            c=dict(id=cid,series='REMAIN CALM',part=0,of=0,topic=title.split('|')[0][:60],yt_title=title,
             yt_desc=f"REMAIN CALM · {title}\n\n{hook}\n\n{desc}\n\nFrom the supermarket of REMAIN CALM: the dead smell fear, so stay calm. Part 1 of the series is on the channel.\n\nWould you stay calm or run? Comment CALM or RUN.\n\nREMAIN CALM is an original animated survival comedy by Post Time Survival. Fiction.\n\n#zombie #zombieapocalypse #shorts #animation #remaincalm",
             tt=f"REMAIN CALM · {hook} Calm or run? 🧟 #zombie #zombiecomedy #remaincalm #fyp",ig=f"REMAIN CALM · {hook} Calm or run? 🧟 #zombie #zombiecomedy #animation #reels #remaincalm",
             pin='Would you stay calm or run? Comment CALM or RUN.',tags=tags,playlist='REMAIN CALM',video=f'{od}/{k}.mp4',thumb=f'{od}/cover_9x16.jpg',caps_en=f'{od}/captions_en.srt',caps_th=f'{od}/captions_en.srt',status='ready',done={},due=due)
            s['clips'].append(c);ST.save(s)
        if len(c['yt_title'])>100:raise SystemExit(f'{cid}: title {len(c["yt_title"])} > 100')
        if c.get('status')=='scheduled':print(cid,'already scheduled');continue
        print(cid,due,c['yt_title'][:70])
        if dry:continue
        PC.schedule(s,cid,False,True);n+=1;time.sleep(6)
    print('scheduled',n)
main()
