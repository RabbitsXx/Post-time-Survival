#!/usr/bin/env python3
"""make_series.py ID [ID ...] [--draft] : several parts in one go, with the waiting overlapped.
  phase 1 (parallel)   lint story + TTS/spec + layout lint for every part       (network/IO bound)
  phase 2 (sequential) render -> cover -> music -> finish -> subtitles per part  (all CPU cores per render)
  QA of part k runs in the background while part k+1 renders
Prints one summary table at the end."""
import sys,os,subprocess,json,time,concurrent.futures as cf
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..')
a=sys.argv[1:];ids=[int(x) for x in a if x.isdigit()];draft='--draft' in a
mp=lambda N,*x:subprocess.run(['python3',f'{R}/make_part.py',str(N),*x],capture_output=True,text=True,cwd=S)
t0=time.time()
print(f'phase 1: lint + build + layout lint for {ids} (parallel)')
with cf.ThreadPoolExecutor(3) as ex:res=dict(zip(ids,ex.map(lambda N:mp(N,'--only','spec'),ids)))
for N,r in res.items():
    if r.returncode:print(f'part id {N} FAILED in phase 1:\n{r.stdout[-1800:]}{r.stderr[-600:]}');sys.exit(1)
print(f'  done in {time.time()-t0:.0f}s')
qa=cf.ThreadPoolExecutor(1);fut={}
for N in ids:
    t=time.time()
    for part in('render','finish'):
        r=mp(N,'--only',part,*(['--draft'] if draft else []))
        if r.returncode:print(f'part id {N} FAILED at {part}:\n{r.stdout[-2000:]}{r.stderr[-600:]}');sys.exit(1)
    print(f'  part id {N}: rendered + finished in {time.time()-t:.0f}s')
    if not draft:fut[N]=qa.submit(lambda N=N:subprocess.run(['python3',f'{R}/qa_all.py',str(N)],capture_output=True,text=True,cwd=S))
rows=[]
for N,f in fut.items():
    r=f.result();res_line=[l for l in r.stdout.splitlines() if 'RESULT' in l];rows.append((N,res_line[0].strip() if res_line else 'no result'))
print('\n=== summary ===')
for N in ids:
    pj=json.load(open(f'{R}/p{N}/pacing.json'));spec=json.load(open(f'{R}/p{N}/spec.json'));nb=len(spec['beats'])-1
    print(f"  id {N}: {nb} beats, {pj['wpm_speech']} wpm talking / {pj['wpm_overall']} overall, rate {pj['rate']}, gap {pj['gap']:.2f}s   QA: {dict(rows).get(N,'(draft: skipped)')}")
print(f'total {time.time()-t0:.0f}s')
