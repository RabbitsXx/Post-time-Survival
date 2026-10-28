#!/usr/bin/env python3
"""kit16.py : subtitles (EN + TH .srt), chapters, YouTube publish kit -> release/<name>/
 python3 kit16.py [outdir]"""
import sys,os,json,re,textwrap
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import th_how
out=sys.argv[1] if len(sys.argv)>1 else R+'/release';os.makedirs(out,exist_ok=True)
cues=json.load(open(R+'/p/cues_en.json'));sp=json.load(open(R+'/p/spec.json'));B=sp['beats']
assert len(cues)==len(th_how.TH),(len(cues),len(th_how.TH))
def ts(t):h=int(t//3600);m=int(t%3600//60);s=t%60;return f'{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}'
def wrap(txt,n):
    if len(txt)<=n:return txt
    ws=txt.split(' ');lines=[''];
    for w in ws:
        if len(lines[-1])+len(w)+1>n and lines[-1]:lines.append(w)
        else:lines[-1]=(lines[-1]+' '+w).strip()
    if len(lines)>2:return '\n'.join([' '.join(ws[:len(ws)//2]),' '.join(ws[len(ws)//2:])])
    return '\n'.join(lines)
LAB_EN={'game':'[Game] ','maya':'[Maya, on the radio] ','steve':'[Steve] ','dex':''};LAB_TH={'game':'[เกม] ','maya':'[มายา ทางวิทยุ] ','steve':'[สตีฟ] ','dex':''}
def srt(path,texts,lab,width):
    with open(path,'w',encoding='utf-8') as f:
        for i,(c,t) in enumerate(zip(cues,texts),1):
            a,b=c['t'];f.write(f"{i}\n{ts(a)} --> {ts(min(b,a+7.5))}\n{wrap(lab[c['sp']]+t,width)}\n\n")
srt(out+'/captions_en.srt',[c['text'] for c in cues],LAB_EN,42);srt(out+'/captions_th.srt',th_how.TH,LAB_TH,38)
# chapters from the level cards
ch=[(0,'The cold open: zombies, Steve and a sponsor')]
names=['The Building (elevator vs stairs)','The Street (sprint vs walk)','The Hideout (closet vs two exits)','The Fight (bat vs door)','The Loot (99 slots vs 10 kg)','The Night (save point vs alarm)','The Road (highway vs railway)','The Rescue (helicopter vs water)']
for b in B:
    p=b['scene'].get('p',{})
    if b['scene']['n']=='card' and p.get('kind')=='level':ch.append((b['t'][0],f"Level {p['lv']}: {names[p['lv']-1]}"))
fin=[c['t'][0] for c in cues if c['text'].startswith('Dad! You are late')][0]-.3
ch.append((fin,'The finale: Pier 8'))
def tc(t):t=int(t);return f'{t//60}:{t%60:02d}'
chap='\n'.join(f'{tc(t)} {n}' for t,n in ch)
title='HOW TO SURVIVE A ZOMBIE APOCALYPSE (Game vs Real Life)'
desc=f"""Would you survive a zombie apocalypse? Gamers say yes. Real life says: read this first.

Coach Dex (survival expert*) tests eight zombie situations twice: the video-game way (A) and the way that actually works (B). Eight choices. Eight deaths in the game. Zero in real life.

*Not an expert. Owns a very loud whistle.

CHAPTERS
{chap}

THE EIGHT RULES
1. Never enter a box with only one door.
2. Be boring.
3. Never hide where you cannot leave.
4. The best fight is the door you close.
5. Weight is a zombie too.
6. Sleep with an alarm and an exit.
7. Light is a loudspeaker.
8. Water is the wall.

Subtitles: English and Thai (CC).
Next video: how to survive a robot uprising (game vs real life). Subscribe so you do not miss it.

Fiction and comedy. The tips are common-sense safety ideas dressed up as a zombie story; this is not professional survival training.

#zombie #howtosurvive #gamevsreallife #zombieapocalypse #survival #animation #funny"""
tags=['how to survive a zombie apocalypse','zombie apocalypse','game vs real life','how to survive zombies','zombie survival guide','survival tips','zombie animation','funny animation','coach dex','steve the zombie','video game logic','game logic vs real life','zombie game vs reality','survival game vs real life','apocalypse survival','animated comedy','how to','storytime animation','zombie memes','what would you do zombie apocalypse']
pin="Which level would have killed YOU first? Elevator (1), sprinting (2), closet (3), baseball bat (4), 99-slot backpack (5), sleeping on the street (6), the highway (7) or waiting for the helicopter (8)? Tell me below. And Steve says hello. 🧟"
open(out+'/PUBLISH.md','w',encoding='utf-8').write(f"""# HOW TO SURVIVE A ZOMBIE APOCALYPSE (Game vs Real Life) - YouTube publish kit

**Title** ({len(title)} chars)
`{title}`

**Alternative titles (A/B test the thumbnail + title in Studio)**
- `Game Logic vs Real Life: How to Survive Zombies (8 Levels)`
- `I Died 8 Times So You Don't Have To (Zombie Survival Guide)`

**Thumbnail**: `thumbnail_1_game_vs_real.jpg` (main), `thumbnail_2_ab_quiz.jpg`, `thumbnail_3_you_died.jpg` (YouTube "Test & compare" if available). All 1920x1080 JPEG under 2 MB.

**Description**
```
{desc}
```

**Tags** (comma separated)
```
{', '.join(tags)}
```

**Pinned comment**
```
{pin}
```

**Settings**: audience "No, it's not made for kids"; altered/synthetic content: YES (AI voices + generated animation); category Entertainment; language English; upload `captions_en.srt` (English) and `captions_th.srt` (Thai) under Subtitles; add the end screen on the last 8 s (two video slots + subscribe: the end card leaves the space).
""")
json.dump(dict(title=title,description=desc,tags=tags,chapters=[(int(t),n) for t,n in ch],pinned_comment=pin),open(out+'/publish.json','w'),ensure_ascii=False,indent=1)
print('kit16: wrote',out,'chapters:',len(ch))
print(chap)
