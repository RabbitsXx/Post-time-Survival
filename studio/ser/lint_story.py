#!/usr/bin/env python3
"""lint_story.py N : static checks of a part's script BEFORE any TTS/render (runs in < 1 s).  Each rule comes from a rejection or rework in this project.
Exit 1 on ERROR.  WARN = fix it unless you have a reason."""
import sys,os,re,importlib
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R)
N=int(sys.argv[1]);SRC=int(os.environ.get('PART_SRC',N));mod='parts_sun' if SRC>=11 else 'parts_v3'
P=importlib.import_module(mod).PARTS[SRC]
plain=lambda c:re.sub(r'</?[ry]>','',c)
# scenes that exist (scan the engine files) + their kinds are not validated, only the scene name
V=S+'/v3';scenes={'endcard'}
for f in os.listdir(V):
    if f.startswith(('lib_','kit')) and f.endswith('.js') and 'backup' not in f:
        scenes|=set(re.findall(r'^LIB\.(\w+)\s*=',open(f'{V}/{f}').read(),re.M))
errs,warns=[],[]
beats=[(si,b) for si,s in enumerate(P['sentences']) for b in s]
spoken=[" ".join(sp for b in s for _,sp in b['caps']) for s in P['sentences']]
words=sum(len(t.split()) for t in spoken)+len(P['next_spoken'].split())
n=len(P['sentences'])
if not 14<=n<=18:warns.append(f'{n} beats (a cut every ~3.5 s means 15-17 beats for 60 s)')
if words>140:errs.append(f'{words} words incl. teaser: too long for 60 s at a calm pace (target 105-128). Cut ~{words-128} words')
elif words<100:warns.append(f'{words} words: the voice will end early / gaps hit the 0.85 s cap (target 105-128)')
for i,(si,b) in enumerate(beats):
    tag=f'beat {i+1} ({b["scene"]})'
    if b['scene'] not in scenes:errs.append(f'{tag}: scene "{b["scene"]}" does not exist in the engine')
    sp=spoken[si];wc=len(sp.split())
    if wc>11:warns.append(f'{tag}: {wc} spoken words - the shot will run past ~4.5 s')
    if len(re.findall(r'[.!?]\s+[A-Z“"]',sp))>=1 and wc>=7:warns.append(f'{tag}: two sentences in one beat ("{sp[:40]}...") - the TTS pauses after every full stop and the shot gets long; use commas')
    for cap,_ in b['caps']:
        pc=plain(cap)
        if len(pc.split())>6:errs.append(f'{tag}: caption "{pc}" has {len(pc.split())} words (Gate A max 6; the build splits >=4-word captions in two)')
        elif len(pc.split())>5:warns.append(f'{tag}: caption "{pc}" has 6 words (will be auto-split into two chunks)')
        if cap.count('<r>')+cap.count('<y>')>1:warns.append(f'{tag}: caption "{pc}" has more than one accent colour')
        if cap.count('<r>')!=cap.count('</r>') or cap.count('<y>')!=cap.count('</y>'):errs.append(f'{tag}: unbalanced accent tags in "{cap}"')
        if pc!=pc.upper():warns.append(f'{tag}: caption not upper-case: "{pc}"')
    ch=b['params'].get('chip')
    if ch and len(ch)>20:warns.append(f'{tag}: chip "{ch}" is long (pill may overflow)')
# the hook leaves a question open (Gate A)
first=" ".join(plain(c) for c,_ in beats[0][1]['caps'])
if not first.rstrip().endswith('?'):warns.append(f'hook "{first}" does not end with a question (Gate A "hook leaves a question open")')
# weak cuts: neighbours with the same scene AND kind/mode look like one long shot (the cut detector misses them and the viewer sees no cut)
key=lambda b:(b['scene'],b['params'].get('kind') or b['params'].get('mode') or b['params'].get('bg') or '')
for i in range(1,len(beats)):
    a,b=beats[i-1][1],beats[i][1]
    if key(a)==key(b):warns.append(f'beats {i}-{i+1}: same scene "{key(a)}" back to back = no visible cut. Change the scene or the framing')
for i in range(3,len(beats)):
    w=[key(beats[j][1]) for j in range(i-3,i+1)]
    if len(set(w))<=2:warns.append(f'beats {i-2}-{i+1}: only {len(set(w))} scene types in 4 beats - monotone')
# problem -> consequence chain
for i in range(len(beats)-1):
    if beats[i][1]['role']=='P' and beats[i+1][1]['role'] in ('S','H'):warns.append(f'beat {i+1}: a PROBLEM must be followed by solve/escalate/payoff/cliff/rule')
if beats[-1][1]['role']!='C':warns.append('last beat should be the cliffhanger (role C)')
if not P.get('next_spoken') or not P.get('end'):errs.append('missing next_spoken / end card')
for l in errs:print('[ERROR]',l)
for l in warns:print('[WARN ]',l)
print(f'lint_story p{N}: {len(beats)} beats, {words} words (incl. teaser) -> {len(errs)} error(s), {len(warns)} warning(s)')
sys.exit(1 if errs else 0)
