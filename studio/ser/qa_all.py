#!/usr/bin/env python3
"""qa_all.py N : Gate A (check_spec) + Gate B (analyze_clip) + Gate C (pacing) + cut-strength + contact sheet, all in parallel (~20 s instead of ~40 s).
Writes ser/pN/qa_report.txt.  Exit 1 only on a REAL failure: the two checks that encode the skill's "avg shot <= 2 s" rule are accepted by design
(the owner asked for a cut every 3-4 s) and Gate B's 'longest shot' WARN is cross-checked with the cut-strength test."""
import sys,os,re,subprocess,concurrent.futures as cf,time
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..')
GATES=os.environ.get('STORY_CHAIN_SCRIPTS',S+'/zip2/story-chain-short/scripts')
N=int(sys.argv[1]);D=f'{R}/p{N}'
ACCEPT=('avg shot length','avg beat length')
jobs={'A spec':['python3',f'{GATES}/check_spec.py',f'{D}/spec.json'],
      'B video':['python3',f'{GATES}/analyze_clip.py',f'{D}/final.mp4','--spec',f'{D}/spec.json'],
      'C pacing':['python3','-I',f'{R}/pacing_check.py',str(N)],
      'D cuts':['python3',f'{R}/cutcheck.py',str(N)],
      'sheet':['python3','-I',f'{R}/sheet.py',str(N)]}
def run(k):
    t=time.time();r=subprocess.run(jobs[k],capture_output=True,text=True);return k,r.stdout+r.stderr,time.time()-t
t0=time.time()
with cf.ThreadPoolExecutor(5) as ex:res={k:(o,dt) for k,o,dt in ex.map(run,jobs)}
rows=[];real=[];notes=[]
for k in('A spec','B video','C pacing','D cuts'):
    for ln in res[k][0].splitlines():
        m=re.match(r'\[(PASS|WARN|FAIL)\]\s+(.*)',ln)
        if m:
            lvl,txt=m.groups();rows.append((k,lvl,txt))
            if lvl=='FAIL' and not any(a in txt for a in ACCEPT):real.append(f'{k}: {txt}')
        elif k=='D cuts' and 'WEAK' in ln:real.append(f'D cuts: {ln.strip()}');rows.append((k,'FAIL',ln.strip()))
out=[f'QA report p{N}  ({time.time()-t0:.0f}s wall, gates ran in parallel)\n']
for k in('A spec','B video','C pacing','D cuts'):
    p=sum(1 for r in rows if r[0]==k and r[1]=='PASS');w=sum(1 for r in rows if r[0]==k and r[1]=='WARN');f=sum(1 for r in rows if r[0]==k and r[1]=='FAIL')
    out.append(f'  {k:9s} {p} pass, {w} warn, {f} fail')
    for r in rows:
        if r[0]==k and r[1]!='PASS':out.append(f'      [{r[1]}] {r[2]}'+('   (accepted by design)' if any(a in r[2] for a in ACCEPT) else ''))
out.append('\n  RESULT: '+('PASS' if not real else 'FAIL'))
for r in real:out.append('   - '+r)
open(f'{D}/qa_report.txt','w').write('\n'.join(out)+'\n\n--- raw output ---\n'+'\n'.join(f'## {k}\n{res[k][0]}' for k in res))
print('\n'.join(out));sys.exit(1 if real else 0)
