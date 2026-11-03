#!/usr/bin/env python3
"""sync.py : commit + push safely when several unattended sessions work in parallel on the same branch.
Usage: python3 studio/autopilot/sync.py "commit message"
Merges origin/<branch>; a conflict in state/queue.json is resolved by UNION of clips (same id: the entry with more progress wins: due / posts / status), any other conflict stops with a message (fix by hand, never discard others' work).  Retries the push 4 times."""
import subprocess,sys,json,os,time
REPO=subprocess.check_output(['git','rev-parse','--show-toplevel'],text=True).strip();os.chdir(REPO)
BR=subprocess.check_output(['git','rev-parse','--abbrev-ref','HEAD'],text=True).strip();Q='studio/autopilot/state/queue.json'
def sh(*a,**k):return subprocess.run(a,capture_output=True,text=True,**k)
RANK={'dropped':0,'ready':1,'scheduled':2,'finished':3,'partial':2}
def score(c):return (RANK.get(c.get('status'),1),bool(c.get('due')),len(c.get('posts',{})),len(c.get('done',{})))
def resolve_queue():
    o=json.loads(sh('git','show',':2:'+Q).stdout);t=json.loads(sh('git','show',':3:'+Q).stdout);by={c['id']:c for c in o['clips']}
    for c in t['clips']:
        if c['id'] not in by or score(c)>score(by[c['id']]):by[c['id']]=c
    o['clips']=sorted(by.values(),key=lambda c:(c.get('series',''),c.get('part',0)));json.dump(o,open(Q,'w'),indent=1);sh('git','add',Q)
msg=sys.argv[1] if len(sys.argv)>1 else 'autopilot sync'
sh('git','add','-A');sh('git','commit','-qm',msg+'\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>')
for i in range(4):
    sh('git','fetch','origin',BR);m=sh('git','merge','--no-edit','origin/'+BR)
    if m.returncode:
        bad=[l for l in sh('git','diff','--name-only','--diff-filter=U').stdout.split() if l]
        if bad==[Q]:resolve_queue();sh('git','commit','-qm','merge: union of queue state')
        else:print('CONFLICT in',bad,'- resolve by hand (keep both sides)');sys.exit(1)
    p=sh('git','push','-u','origin',BR)
    if p.returncode==0:print('pushed');sys.exit(0)
    time.sleep(2*2**i)
print('push failed',p.stderr[-200:]);sys.exit(1)
