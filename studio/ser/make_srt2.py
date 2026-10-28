#!/usr/bin/env python3
"""make_srt2.py N : English + Thai subtitle files for part N from its real voice timing (ser/pN/cues_en.json).
Thai lines come from the series' translation modules (th*.py: {english cue: thai}).  Missing translations are listed so they can be added (non-fatal)."""
import sys,os,json,importlib
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R)
import series
N=int(sys.argv[1]);key,pn=series.of(int(os.environ.get('PART_SRC',N)));cfg=series.SERIES[key]
T={}
for m in cfg['th']:T.update(getattr(importlib.import_module(m),{'th':'TH','th2':'TH2','th_sun':'TH3'}[m]))
OUT=f'{S}/deliver/{key}/captions'+('_sandbox' if 'PART_SRC' in os.environ else '');os.makedirs(OUT,exist_ok=True)   # sandbox builds never touch shipped files
cues=json.load(open(f'{R}/p{N}/cues_en.json'));miss=[c[2] for c in cues if c[2] not in T]
ts=lambda x:'{:02}:{:02}:{:02},{:03}'.format(*(lambda ms:(ms//3600000,ms//60000%60,ms//1000%60,ms%1000))(int(round(x*1000))))
for lang in('en','th'):
    if lang=='th' and miss:continue
    out=[]
    for i,(a,b,tx) in enumerate(cues):
        if i+1<len(cues):b=min(b,cues[i+1][0]-0.02)
        out.append(f'{i+1}\n{ts(a)} --> {ts(max(b,a+0.3))}\n{tx if lang=="en" else T[tx]}\n')
    open(f'{OUT}/part{pn}_{lang}.srt','w',encoding='utf-8').write('\n'.join(out))
print(f'srt part {pn}: {len(cues)} cues'+(f'  Thai MISSING for {len(miss)} cue(s): {miss}' if miss else '  en+th written'))
