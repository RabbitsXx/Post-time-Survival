import os,signal,sys
me={os.getpid(),os.getppid()}
for p in os.listdir('/proc'):
    if not p.isdigit() or int(p) in me:continue
    try:c=open(f'/proc/{p}/cmdline','rb').read().replace(b'\0',b' ').decode()
    except:continue
    if c.startswith(('python3 build_clip.py','node /','./renderq','/bin/bash ./renderq')) and sys.argv[1] in c:
        os.kill(int(p),signal.SIGKILL);print('killed',p,c[:60])
