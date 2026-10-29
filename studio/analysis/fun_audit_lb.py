#!/usr/bin/env python3
"""fun_audit_lb.py N.. : the same measurements as fun_audit.py (language, voices, roles, picture, sound) for THE LAST BUS, next to the old shorts."""
import json,re,os,sys,collections,statistics as st
import numpy as np
S=os.path.abspath(os.path.dirname(__file__)+'/..');sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import fun_audit as F
rows={}
for n in [int(x) for x in sys.argv[1:]] or range(1,11):
    d=f'{S}/long/p9/part{n}';cues=json.load(open(f'{d}/cues_en.json'));sp=json.load(open(f'{d}/spec.json'));B=sp['beats'];dur=sp['duration']
    sents=[c['text'] for c in cues];ts=F.text_stats(sents);spk=collections.Counter(c['sp'] for c in cues)
    sf=json.load(open(f'{d}/sfx.json'));video=f'{S}/long/final9_p{n}.mp4'
    nc=[b for b in B if b['scene']['n']!='card']
    r=dict(dur=round(dur),text=ts,speakers=len([k for k in spk if k not in('bus','buswh')]),turns=sum(1 for a,b in zip(cues,cues[1:]) if a['sp']!=b['sp']),sfx_kinds=len({s['k'] for s in sf}),sfx_per_min=round(len(sf)/dur*60,1),
           char_share=round(100*sum(1 for b in nc if b['scene']['n']=='stage' and (b['scene']['p'].get('loc') in('bus','dinerin') or b['scene']['p'].get('acts')))/max(1,len(nc))))
    if os.path.exists(video):r['motion']=F.motion(video,0,dur);r['lra']=F.audio(video,0,dur)
    r['gaps']=F.voice_gaps(f'{d}/voice.wav');rows[f'p{n}']=r;print(n,json.dumps(r)[:300],file=sys.stderr)
json.dump(rows,open(f'{S}/analysis/fun_audit_lb.json','w'),indent=1)
sh=list(rows.values());avg=lambda f:round(st.mean(f(v) for v in sh),1)
old=json.load(open(f'{S}/analysis/fun_audit.json'));oldsh=[v for k,v in old.items() if k!='long'];oavg=lambda f:round(st.mean(f(v) for v in oldsh),1)
print('\n metric                         THE LAST BUS   old shorts (9 clips)')
for lab,f,g in[('"you"/viewer address per 100w',lambda v:v['text']['you'],lambda v:v['text']['you']),('banter words per 100w',lambda v:v['text']['banter'],lambda v:v['text']['banter']),('questions per clip',lambda v:v['text']['questions'],lambda v:v['text']['questions']),
 ('mean sentence length (words)',lambda v:v['text']['mean_len'],lambda v:v['text']['mean_len']),('sentence length SD',lambda v:v['text']['sd_len'],lambda v:v['text']['sd_len']),('numbers per 100w',lambda v:v['text']['numbers'],lambda v:v['text']['numbers']),
 ('sfx per minute',lambda v:v['sfx_per_min'],lambda v:v['sfx_per_min']),('longest pause (s)',lambda v:v['gaps']['longest'],lambda v:v['gaps']['longest']),('character on screen %',lambda v:v['char_share'],lambda v:v['char_share'])]:
    print(f' {lab:32s} {avg(f):>8}      {oavg(g):>8}')
print(' distinct character voices         ',avg(lambda v:v['speakers']),'          1 (narrator)');print(' speaker changes per clip          ',avg(lambda v:v['turns']),'          0');print(' kinds of sfx per clip             ',avg(lambda v:v['sfx_kinds']),'          6 in all 9 clips')
if all('lra' in v for v in sh):print(' loudness range (LRA)              ',avg(lambda v:v['lra']),'          3.0')
