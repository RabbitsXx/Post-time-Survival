#!/usr/bin/env python3
"""studio_review.py CLIP_ID [CLIP_ID ...] [--gate]   run every department audit on a finished clip, write a scorecard, update the KPI history and the improvement backlog.
Departments: story (storylint + newness), art-layout-animation, sound, editorial, marketing, legal-brand.  Thresholds live in thresholds.json and RATCHET UP by themselves:
when the last 5 reviewed clips all beat a department's bar by >= 6 points, the bar rises by 2 (never above 92), so the studio keeps getting stricter as it gets better.
--gate : exit 1 when any department is below its bar (the daily run must fix the clip, not publish it)."""
import sys,os,json,subprocess,datetime as dt,importlib
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,R);sys.path.insert(0,LONG)
TH=R+'/thresholds.json';HIST=R+'/kpi/history.jsonl'
DEPTS=['story','art','sound','editorial','marketing','legal','direction','writing','qc']
def thresholds():
    if os.path.exists(TH):return json.load(open(TH))
    t=dict(story=70,art=70,sound=60,editorial=70,marketing=75,legal=95,direction=65,writing=65,qc=85);json.dump(t,open(TH,'w'),indent=1);return t
def story(cid):
    iss=[];sc=100
    for nm,cmd in(('storylint',['python3','storylint.py',cid]),('newness',['python3','newness.py',cid])):
        p=subprocess.run(cmd,cwd=LONG,capture_output=True,text=True)
        for l in p.stdout.splitlines():
            if '[FAIL]' in l:iss.append(f'STORY/{nm}: '+l.split('[FAIL]')[1].strip()[:200]);sc-=12
            if '[WARN]' in l and nm=='storylint':iss.append(f'STORY/{nm}(warn): '+l.split('[WARN]')[1].strip()[:200]);sc-=3
    return dict(dept='story',score=max(0,sc),issues=iss,metrics={})
def run(cid):
    out={};import audit_visual,audit_sound,audit_editorial,audit_publish,audit_brand,shotlint,dialoguelint,qc_final
    out['story']=story(cid)
    for k,mod in(('art',audit_visual),('sound',audit_sound),('editorial',audit_editorial),('marketing',audit_publish),('legal',audit_brand),('direction',shotlint),('writing',dialoguelint),('qc',qc_final)):
        try:out[k]=mod.audit(cid)
        except Exception as e:out[k]=dict(dept=k,score=0,issues=[f'AUDIT CRASHED: {e}'],metrics={})
    return out
def ratchet():
    if not os.path.exists(HIST):return
    rows=[json.loads(l) for l in open(HIST) if l.strip()];last={}
    for r in rows:last.setdefault(r['clip'],r)
    recent=list(last.values())[-5:];t=thresholds();ch=[]
    if len(recent)<5:return
    for d in DEPTS:
        if all(r['scores'].get(d,0)>=t[d]+6 for r in recent) and t[d]<92:t[d]+=2;ch.append(d)
    if ch:json.dump(t,open(TH,'w'),indent=1);print('RATCHET: raised the bar for',ch,'->',{d:t[d] for d in ch})
def card(cid,o,t):
    L=[f'# Scorecard {cid}  ({dt.datetime.utcnow().strftime("%Y-%m-%d %H:%M")} UTC)','','| department | score | bar | verdict |','|---|---:|---:|---|']
    for d in DEPTS:L.append(f"| {d} | {o[d]['score']} | {t[d]} | {'PASS' if o[d]['score']>=t[d] else '**FIX**'} |")
    for d in DEPTS:
        if o[d]['issues']:
            L+=['',f'## {d}']+['* '+i for i in o[d]['issues']]
    return '\n'.join(L)+'\n'
def main():
    a=[x for x in sys.argv[1:] if not x.startswith('--')];gate='--gate' in sys.argv;t=thresholds();bad=0
    os.makedirs(R+'/scorecards',exist_ok=True);os.makedirs(R+'/kpi',exist_ok=True)
    for cid in a:
        o=run(cid);open(f'{R}/scorecards/{cid}.md','w').write(card(cid,o,t));json.dump(o,open(f'{R}/scorecards/{cid}.json','w'),indent=1,ensure_ascii=False)
        row=dict(clip=cid,at=dt.datetime.utcnow().isoformat(),scores={d:o[d]['score'] for d in DEPTS},issues={d:o[d]['issues'] for d in DEPTS})
        open(HIST,'a').write(json.dumps(row,ensure_ascii=False)+'\n')
        fix=[d for d in DEPTS if o[d]['score']<t[d]];print(cid,{d:o[d]['score'] for d in DEPTS},'FIX:' ,fix or 'none');bad+=bool(fix)
    ratchet();import improve;improve.backlog()
    if gate and bad:sys.exit(1)
if __name__=='__main__':main()
