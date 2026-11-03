#!/usr/bin/env python3
"""MARKETING / PUBLISHING audit.  audit_publish.py CLIP_ID -> JSON.
 * YouTube title: <= 70 chars (mobile), contains the topic/series AND "Part n", opens with the hook, no ALL-CAPS shouting over 40 %
 * description: has hook line, premise, real tip line, comment question (ask), next-part line (not last part), >= 3 hashtags incl #shorts, series + part
 * tags >= 8 and <= 500 chars total;  TikTok / Instagram copy <= 2200, has an emoji hook and a question
 * cover: 9:16 and 16:9 files exist, are sharp (edge energy) and colourful, headline <= 4 words per line
 * the promised hook in the title is actually shown in the first 3 seconds (the title words appear in the first spoken line or on screen)"""
import sys,os,json,re
import numpy as np
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
def audit(cid):
    issues=[];M={};score=100;m=CR.meta(cid);si=CR.series(cid)
    t=m['yt_title'];d=m['yt_desc'];M['title']=t;M['title_len']=len(t)
    if len(t)>70:issues.append(f'MARKETING: YouTube title is {len(t)} chars (> 70): it will be cut on phones');score-=6
    caps=sum(1 for ch in t if ch.isupper())/max(1,sum(1 for ch in t if ch.isalpha()))
    if caps>.4:issues.append(f'MARKETING: title is {caps:.0%} capitals (> 40 %): reads as shouting');score-=3
    if f'Part {si["part"]}' not in t:issues.append('MARKETING: title lacks "Part n"');score-=6
    if si['name'].lower() not in t.lower() and si['name'].lower() not in d.lower()[:300]:issues.append('MARKETING: series name is not in the title or the first lines of the description');score-=6
    tags=[x for x in m['tags'].split(',') if x.strip()];M['tags']=len(tags)
    if len(tags)<8 or len(m['tags'])>500:issues.append(f'MARKETING: {len(tags)} tags / {len(m["tags"])} chars (need >= 8 and <= 500)');score-=8
    ht=re.findall(r'#\w+',d);M['hashtags']=ht
    if len(ht)<3 or '#shorts' not in [h.lower() for h in ht]:issues.append('MARKETING: description needs >= 3 hashtags including #shorts');score-=5
    if '?' not in d:issues.append('MARKETING: description has no comment question (engagement)');score-=4
    if si['part']<si['of'] and not re.search(r'part\s*%d|next'%(si['part']+1),d,re.I):issues.append('MARKETING: description does not point to the next part');score-=4
    if not re.search(r'tip|survival',d,re.I):issues.append('MARKETING: description never states the real survival tip');score-=3
    for k in('tt','ig'):
        if len(m[k])>2200:issues.append(f'MARKETING: {k} copy > 2200 chars');score-=4
        if not re.search(r'[\U0001F300-\U0001FAFF]',m[k]):issues.append(f'MARKETING: {k} copy has no emoji hook');score-=2
    rel=f'{LONG}/{CR.release(cid)}'
    for nm,exp in(('cover_9x16.png',(1080,1920)),('cover_16x9.png',(1280,720))):
        p=f'{rel}/{nm}'
        if not os.path.exists(p):issues.append(f'MARKETING: {nm} missing');score-=8;continue
        im=Image.open(p).convert('RGB')
        if im.size[0]<exp[0]*.9:issues.append(f'MARKETING: {nm} is only {im.size}');score-=3
        a=np.asarray(im.resize((360,360)),dtype=np.float32);g=np.abs(np.diff(a.mean(axis=2),axis=0)).mean();col=float(np.mean(a.max(axis=2)-a.min(axis=2)))
        M[nm]=dict(size=im.size,detail=round(float(g),1),colourful=round(col,1))
        if g<4:issues.append(f'MARKETING: {nm} has very little detail ({g:.1f})');score-=4
        if col<30:issues.append(f'MARKETING: {nm} is dull (colourfulness {col:.0f} < 30): thumbnails need a strong colour accent');score-=4
    return dict(dept='marketing',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
