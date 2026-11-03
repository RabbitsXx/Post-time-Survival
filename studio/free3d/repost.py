#!/usr/bin/env python3
"""repost.py CLIP_ID ISO_UTC : delete the pending Buffer posts of a clip and schedule it again (after the mp4 was fixed)"""
import sys,os,json,subprocess
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..')
sys.path.insert(0,REPO+'/studio/autopilot');sys.path.insert(0,REPO+'/studio/ser')
import state as ST,buffer_api as B
cid,at=sys.argv[1:3];s=ST.load();c=ST.find(s,cid)
for k,i in (c.get('posts') or {}).items():
    r=B.gql('mutation($input: DeletePostInput!){ deletePost(input:$input){ __typename } }',dict(input=dict(id=i)));print(cid,k,r['data']['deletePost']['__typename'])
c['posts']={};c['status']='ready';ST.save(s)
subprocess.check_call(['python3',R+'/post3d.py',cid,'--at',at],cwd=R)
