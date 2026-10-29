#!/usr/bin/env python3
"""kit9.py [N ...] : release folder for THE LAST BUS parts -> release9/partN/ : the.mp4 (after cover embed), captions_en.srt, captions_th.srt, cover_9x16.png, cover_16x9.png, PUBLISH.md
 The EN/TH subtitles carry the speaker's name (CC is for people who cannot hear who is talking)."""
import sys,os,json,shutil
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R);sys.path.insert(0,S+'/ser')
import th_bus,meta_lb
def ts(t):h=int(t//3600);m=int(t%3600//60);s=t%60;return f'{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}'
def wrap(txt,n):
    if len(txt)<=n:return txt
    ws=txt.split(' ');lines=['']
    for w in ws:
        if len(lines[-1])+len(w)+1>n and lines[-1]:lines.append(w)
        else:lines[-1]=(lines[-1]+' '+w).strip()
    if len(lines)>2:return '\n'.join([' '.join(ws[:len(ws)//2]),' '.join(ws[len(ws)//2:])])
    return '\n'.join(lines)
def thwrap(txt,n):      # Thai has no spaces between words in a clause but the script uses spaces between phrases: wrap at spaces
    return wrap(txt,n)
def srt(path,cues,texts,names,width):
    with open(path,'w',encoding='utf-8') as f:
        for i,(c,t) in enumerate(zip(cues,texts),1):
            a,b=c['t'];lab=names.get(c['sp'],'');f.write(f"{i}\n{ts(a)} --> {ts(min(b,a+7.5))}\n{wrap((lab+': ' if lab else '')+t,width)}\n\n")
def main():
    ns=[int(x) for x in sys.argv[1:]] or range(1,11)
    for n in ns:
        d=f'{R}/release9/part{n}';os.makedirs(d,exist_ok=True)
        cues=json.load(open(f'{R}/p9/part{n}/cues_en.json'));th=th_bus.TH[n]
        assert len(cues)==len(th),(n,len(cues),len(th))
        srt(f'{d}/captions_en.srt',cues,[c['text'] for c in cues],th_bus.NAMES_EN,42);srt(f'{d}/captions_th.srt',cues,th,th_bus.NAMES_TH,38)
        for k in('9x16','16x9'):
            src=f'{R}/covers9/cover_{n}_{k}.png'
            if os.path.exists(src):shutil.copy(src,f'{d}/cover_{k}.png')
        m=meta_lb.M[n]
        open(f'{d}/PUBLISH.md','w').write(f"""# THE LAST BUS - Part {n} of 10 - publish kit

**YouTube title** ({len(m['yt_title'])} chars)
`{m['yt_title']}`

**YouTube description**
```
{m['yt_desc']}
```

**Tags** (paste in Studio > Details > Show more > Tags; Buffer has no tags field)
```
{meta_lb.YT_TAGS}
```

**TikTok caption**
```
{m['tt']}
```

**Instagram caption**
```
{m['ig']}
```

**Pinned comment**
```
{m['pin']}
```

**Settings**: audience "No, it's not made for kids"; altered/synthetic content: YES (AI voices + generated animation); category Entertainment; language English;
upload `captions_en.srt` (English) and `captions_th.srt` (Thai) under Subtitles; thumbnail `cover_9x16.png` (Shorts) / `cover_16x9.png`; add to the playlist THE LAST BUS.
""")
        print('kit',n,d)
    open(f'{R}/release9/youtube_tags_lastbus.md','w').write(f"# YouTube tags to paste for THE LAST BUS (all 10 parts)\nStudio > Content > tick the videos > Edit > Add to tags\n\n```\n{meta_lb.YT_TAGS}\n```\n")
main()
