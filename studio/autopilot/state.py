"""state.py : the autopilot's memory, one JSON file in the repo (state/queue.json).  Every run: pull, change, commit, push (keep it small)."""
import json,os
R=os.path.dirname(os.path.abspath(__file__));F=R+'/state/queue.json';os.makedirs(R+'/state',exist_ok=True)
def load():
    try:return json.load(open(F))
    except Exception:return dict(clips=[])
def save(s):
    tmp=F+'.tmp';json.dump(s,open(tmp,'w'),indent=1,ensure_ascii=False);os.replace(tmp,F)
def find(s,cid):
    for c in s['clips']:
        if c['id']==cid:return c
def taken_slots(s):
    return [c['due'] for c in s['clips'] if c.get('due')]
