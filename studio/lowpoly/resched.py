#!/usr/bin/env python3
"""python3 resched.py CLIP_ID ISO_UTC   move a scheduled Buffer post: delete the old post (id from posted.json) and create it again at the new time with post_lp.py."""
import sys,json,subprocess
sys.path.insert(0,'.')
import buffer2 as B
cid,at=sys.argv[1:3];PJ='posted.json';d=json.load(open(PJ))
Q="""mutation($input: DeletePostInput!){ deletePost(input:$input){ __typename ... on DeletePostSuccess { id } ... on VoidMutationError { message } } }"""
r=B.gql(Q,dict(input=dict(id=d[cid]['id'])));print(json.dumps(r)[:300])
x=((r.get('data') or {}).get('deletePost')) or {}
if x.get('__typename')!='DeletePostSuccess':raise SystemExit('delete failed: '+json.dumps(r)[:300])
old=d.pop(cid);d[cid+'_old_'+old['id'][-4:]]=old;json.dump(d,open(PJ,'w'),indent=1)
subprocess.check_call([sys.executable,'post_lp.py',cid,'--at',at])
