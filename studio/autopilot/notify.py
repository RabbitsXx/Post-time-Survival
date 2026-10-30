#!/usr/bin/env python3
"""notify.py "message" : post a progress line to the owner's Discord channel (owner 2026-10-30: always report progress while working).
Webhook comes from env DISCORD_WEBHOOK or autopilot/discord.env (gitignored; never print or commit it).  Never raises: reporting must not break a build.
Use from code:  import notify; notify.say('built quiet_01')"""
import os,sys,json,urllib.request
R=os.path.dirname(os.path.abspath(__file__))
def hook():
    h=os.environ.get('DISCORD_WEBHOOK')
    if h:return h
    try:
        for l in open(R+'/discord.env'):
            if l.startswith('DISCORD_WEBHOOK='):return l.split('=',1)[1].strip()
    except OSError:pass
def say(msg,title='Post Time Survival'):
    h=hook()
    if not h:return False
    try:
        req=urllib.request.Request(h,data=json.dumps(dict(username=title,content=str(msg)[:1900])).encode(),headers={'Content-Type':'application/json','User-Agent':'pts-autopilot'})
        urllib.request.urlopen(req,timeout=15).read();return True
    except Exception as e:
        print('notify failed:',type(e).__name__);return False
if __name__=='__main__':sys.exit(0 if say(' '.join(sys.argv[1:])) else 1)
