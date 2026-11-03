#!/usr/bin/env python3
"""python3 finish.py ID [--render]  : regenerate from specs/ID.py, frame gate, cover, optional queue render (renderq.sh)."""
import sys,os,subprocess
H=os.path.dirname(os.path.abspath(__file__));os.chdir(H)
ID=sys.argv[1];ns={};exec(open(f'specs/{ID}.py').read(),ns)
print(subprocess.run([sys.executable,'mkclip.py',f'specs/{ID}.py'],capture_output=True,text=True).stdout.strip().splitlines()[-1])
r=subprocess.run([sys.executable,'framegate.py',f'{ID}.py'],capture_output=True,text=True)
print('\n'.join(l[:120] for l in r.stdout.splitlines() if l.startswith(('FAIL','FRAME GATE','hook'))))
L1,L2,L3,_=ns['COVER']
r=subprocess.run([sys.executable,'cover_simple.py',ID,'0.5',L1,L2,L3,f'{ID}cover'],capture_output=True,text=True);print(r.stdout.strip()[-60:] or r.stderr[-200:])
subprocess.run(['cp',f'topics/{ID}.cover.jpg',f'out/{ID}/cover.jpg'])
if '--render' in sys.argv:subprocess.Popen(['./renderq.sh',ID],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,start_new_session=True);print('render queued')
