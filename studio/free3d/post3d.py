#!/usr/bin/env python3
"""post3d.py ID [ID..] --in MIN [--gap MIN] : put packaged clips on the queue and schedule them on YT/TikTok/IG (YouTube through Buffer; finish_youtube adds tags/thumb/captions later)"""
import sys,os,json,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..')
sys.path.insert(0,REPO+'/studio/autopilot');sys.path.insert(0,REPO+'/studio/ser')
import state as ST,slots,post_clip as PC
META=json.load(open(R+'/meta.json'))
def entry(cid,m,series,of,part,due):
    tags=m.get('tags') or "the well, zombie apocalypse, survival story, water purification, how to purify water, survival tips, zombie animation, animated survival, well water, post time survival, zombie story, emergency water, survival animation, prepper tips, apocalypse"
    nxt=f"\n▶ Next: Part {part+1}, {m['nxt']}. Follow so you do not miss it.\n" if m.get('nxt') else "\n▶ That is the end of this story. A new one is coming, follow so you do not miss it.\n"
    sl=series.lower().replace(' ','')
    desc=f"{series} · Part {part} of {of} · {m['topic']}\n\n{m['premise']}\n\n🧠 {m['tip']}\n{nxt}\n{m['ask']}\n\n{series} is an original animated survival story by Post Time Survival. Fiction.\n\n#zombie #zombieapocalypse #survival #animation #shorts #{sl}"
    return dict(id=cid,series=series,part=part,of=of,topic=m['topic'],yt_title=m['title'],yt_desc=desc,tt=f"{series} · Part {part}/{of} · {m['topic']}. {m['hook']} 🧟 #zombie #survival #{sl} #fyp",ig=f"{series} · Part {part}/{of} · {m['topic']}. {m['hook']} 🧟 Real survival tip inside. #zombie #survival #animation #reels #{sl}",pin=m['ask'],tags=tags,playlist=m.get('playlist',series),
        video=f'{R}/out/{cid}.mp4',thumb=f'releases/well/{cid}/cover_9x16.jpg',caps_en=f'releases/well/{cid}/captions_en.srt',caps_th=f'releases/well/{cid}/captions_th.srt',status='ready',done={},due=slots.iso(due))
def main():
    a=sys.argv[1:];ids=[x for i,x in enumerate(a) if not x.startswith('--') and not x.isdigit() and not (i>0 and a[i-1] in('--at','--in','--gap'))];mins=int(a[a.index('--in')+1]) if '--in' in a else 0;gap=int(a[a.index('--gap')+1]) if '--gap' in a else 6
    s=ST.load();base=dt.datetime.utcnow().replace(second=0,microsecond=0)
    for i,cid in enumerate(ids):
        m=META[cid];of=m.get('of',3);part=m.get('part',int(cid.split('_')[1]));series=m.get('series','THE WELL')
        due=dt.datetime.fromisoformat(a[a.index('--at')+1].replace('Z','')) if '--at' in a else base+dt.timedelta(minutes=mins+i*gap)
        if ST.find(s,cid):
            c=ST.find(s,cid);c.update(entry(cid,m,series,of,part,due))
        else:s['clips'].append(entry(cid,m,series,of,part,due))
        ST.save(s);due_iso,posts=PC.schedule(s,cid,False,True);print(cid,'->',due_iso,posts)
if __name__=='__main__':main()
