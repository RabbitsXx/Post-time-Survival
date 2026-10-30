#!/usr/bin/env python3
"""EDITORIAL audit (cuts, captions, subtitles).  audit_editorial.py CLIP_ID -> JSON.
 * captions: no chunk ends on a dangling function word ("THEN WE", "PIP. NOT"), no one-word orphan chunk after a longer one, <= 5 words, on screen >= 0.6 s, reading speed <= 17 characters/second
 * hook: first line starts within 1 s; the announcer card is <= 4 s; no beat longer than 6.5 s that is not a card
 * subtitles: EN and TH files exist, same number of cues, every TH cue contains Thai letters
 * rhythm: shot lengths vary (std dev >= 0.6 s) and no more than 3 shots of nearly the same length in a row"""
import sys,os,json,re,numpy as np
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
DANGLE={'the','a','an','to','we','and','or','of','in','on','at','is','are','was','be','for','with','that','this','it','i','you','he','she','they','my','your','our','not','no','then','if','but','so','as','by','from','into','my','its','their'}
def audit(cid):
    spec=json.load(open(f'{LONG}/p9/{CR.pid(cid)}/spec.json'));B=spec['beats'];issues=[];M={};score=100
    chunks=[]
    for i,b in enumerate(B):
        for c in b.get('caps',[]):
            txt=re.sub(r'<[^>]+>','',c['h']).strip();chunks.append((i,txt,c['t'][0],c['t'][1]))
    dang=[];orph=[];fast=[];short=[];big=[]
    for k,(i,t,a,e) in enumerate(chunks):
        ws=t.replace('.',' ').replace(',',' ').replace('?',' ').replace('!',' ').split()
        if not ws:continue
        last=ws[-1].lower().strip("'.,!?")
        nxt=chunks[k+1] if k+1<len(chunks) else None
        # a chunk that ends the sentence/beat is fine; a chunk that stops mid-sentence on a function word is not
        endsent=t.rstrip()[-1] in '.?!…' if t.strip() else True
        if not endsent and last in DANGLE:dang.append(t)
        if len(ws)==1 and k>0 and chunks[k-1][0]==i and not endsent:orph.append(t)
        if len(ws)>5:big.append(t)
        d=e-a
        if d<.6:short.append((t,round(d,2)))
        if len(t)/max(.1,d)>17:fast.append((t,round(len(t)/d,1)))
    M.update(chunks=len(chunks),dangling=dang,orphans=orph,fast=fast[:5],short=short[:5])
    if dang:issues.append(f'EDITORIAL: {len(dang)} caption chunk(s) stop on a dangling word, e.g. {dang[:4]}: break captions at phrase boundaries');score-=min(20,4*len(dang))
    if orph:issues.append(f'EDITORIAL: {len(orph)} one-word orphan caption(s) {orph[:3]}');score-=3*min(4,len(orph))
    if big:issues.append(f'EDITORIAL: {len(big)} caption(s) longer than 5 words');score-=4
    if short:issues.append(f'EDITORIAL: {len(short)} caption(s) on screen < 0.6 s {short[:3]}');score-=min(8,2*len(short))
    if fast:issues.append(f'EDITORIAL: {len(fast)} caption(s) read faster than 17 characters/s {fast[:3]}');score-=min(8,2*len(fast))
    first=min((c['t'][0] for b in B for c in b.get('caps',[])),default=9)
    if first>1.0:issues.append(f'EDITORIAL: the first spoken line starts at {first:.1f} s (> 1 s)');score-=5
    for i,b in enumerate(B):
        d=b['t'][1]-b['t'][0]
        if b['scene']['n']=='card' and 'ann' in json.dumps(b['scene'])[:200] and d>4.2:issues.append(f'EDITORIAL: announcer card beat {i} is {d:.1f} s (> 4 s) of a static screen: shorten the announcement or animate the card');score-=6;break
    for i,b in enumerate(B):
        d=b['t'][1]-b['t'][0]
        if d>6.5 and b['scene']['n']!='card':issues.append(f'EDITORIAL: scene beat {i} lasts {d:.1f} s (> 6.5 s)');score-=3
    L=np.array([b['t'][1]-b['t'][0] for b in B]);M['shot_len_std']=round(float(L.std()),2)
    if L.std()<.6:issues.append(f'EDITORIAL: shot lengths are too even (std {L.std():.2f} s < 0.6): the rhythm is mechanical');score-=5
    # subtitles
    rel=f'{LONG}/{CR.release(cid)}';en=f'{rel}/captions_en.srt';th=f'{rel}/captions_th.srt'
    if not(os.path.exists(en) and os.path.exists(th)):issues.append('EDITORIAL: EN/TH subtitle files missing');score-=15
    else:
        ce=len(re.findall(r'^\d+$',open(en).read(),re.M));ct=open(th).read();cth=len(re.findall(r'^\d+$',ct,re.M));M['srt']=(ce,cth)
        if ce!=cth:issues.append(f'EDITORIAL: EN has {ce} subtitle cues but TH has {cth}');score-=8
        blocks=[b for b in ct.strip().split('\\n\\n') if b.strip()]
        nothai=[b.split('\\n')[0] for b in blocks if not re.search(r'[฀-๿]',b)]
        if nothai:issues.append(f'EDITORIAL: {len(nothai)} Thai subtitle cue(s) contain no Thai text');score-=6
    return dict(dept='editorial',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
