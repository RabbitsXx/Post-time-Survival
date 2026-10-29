#!/usr/bin/env python3
"""package.py SERIES [--repo /path/to/repo] : copy the finished parts (video, covers, en/th subtitles) into the repo's releases/ folder (ready to commit)
and write PUBLISH_KIT.md (titles, descriptions, captions, tags).  Does not commit or post anything."""
import sys,os,shutil,importlib
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R)
import series
a=sys.argv[1:];key=a[0];cfg=series.SERIES[key];repo=a[a.index('--repo')+1] if '--repo' in a else '/home/user/Post-time-Survival'
MOD=importlib.import_module(cfg['meta']);M=MOD.M;TAGS=getattr(MOD,'YT_TAGS','').strip()
if not TAGS:sys.exit(f'no YT_TAGS in {cfg["meta"]}.py - every video needs YouTube tags (standing rule)')
kit=[f"# {cfg['title']} - publish kit (review copy)\n\n**YouTube tags (paste in Studio, {len(TAGS)} chars):**\n\n```\n{TAGS}\n```\n"]
for n,N in zip(range(1,99),cfg['ids']) if key!='lighthouse' else zip(range(2,99),cfg['ids']):
    rel=os.path.dirname(cfg['release'].format(n=n));d=f'{repo}/{rel}';os.makedirs(d,exist_ok=True)
    name=os.path.basename(cfg['release'].format(n=n))
    shutil.copy(f'{R}/p{N}/final.mp4',f'{d}/{name}');shutil.copy(f'{R}/p{N}/cover_{N}_9x16.png',f'{d}/thumbnail_9x16.png');shutil.copy(f'{R}/p{N}/cover_{N}_16x9.png',f'{d}/thumbnail_16x9.png')
    for l in('en','th'):
        src=f'{S}/deliver/{key}/captions/part{n}_{l}.srt'
        if os.path.exists(src):shutil.copy(src,f'{d}/captions_{l}.srt')
        else:print(f'  part {n}: no {l} subtitles yet (run make_srt2.py {N})')
    m=M.get(n)
    if m:kit.append(f"\n---\n## Part {n}\n**YouTube title:** {m['yt_title']}\n\n**YouTube description:**\n\n{m['yt_desc']}\n\n**TikTok:** {m['tt']}\n\n**Instagram:** {m['ig']}\n\n**Pinned comment:** {m['pin']}\n")
    print(f'  part {n}: {d}')
os.makedirs(f'{S}/deliver/{key}',exist_ok=True);open(f'{S}/deliver/{key}/PUBLISH_KIT.md','w').write(''.join(kit));print('kit written')
