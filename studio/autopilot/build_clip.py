#!/usr/bin/env python3
"""build_clip.py ID [--from STEP] : one clip, script -> finished video + cover + subtitles + publish text + QA.   ID = '<arc>_<nn>' (file studio/long/arcs/<arc>/<ID>.py, see clipreg.py)
Steps: spec (voices + timeline) -> audio -> render -> finish -> cover -> embed (cover = first 4 frames) -> kit (EN/TH srt, covers, PUBLISH.md) -> qa.   Exit 0 only when QA says PASS.
LONG_DIR=/path overrides the folder that holds the toolchain (default studio/long).  Needs GEMINI_API_KEY (voices) in the environment or in post.env next to studio/."""
import sys,os,subprocess,time
R=os.path.dirname(os.path.abspath(__file__));LONG=os.environ.get('LONG_DIR',os.path.abspath(R+'/../long'))
cid=sys.argv[1];frm=sys.argv[sys.argv.index('--from')+1] if '--from' in sys.argv else 'spec'
env=dict(os.environ,CAP_MAXW='3',CAP_MAXC='17')
try:env['NODE_PATH']=subprocess.check_output(['npm','root','-g'],text=True).strip()
except Exception:pass
py=sys.executable;arc=cid.rsplit('_',1)[0]
STEPS=[('spec',[py,'build16.py',f'arcs/{arc}/{cid}',f'p9/{cid}']),('audio',[py,'audio9.py',f'p9/{cid}']),
 ('render',[py,'render9.py','--spec',f'p9/{cid}/spec.json','--out',f'frames9_{cid}']),('finish',[py,'finish9.py','--p',f'p9/{cid}','--frames',f'frames9_{cid}','--out',f'final9_{cid}.mp4']),
 ('cover',[py,'cover9.py',cid]),('embed',[py,'embed9.py',cid]),('kit',[py,'kit9.py',cid]),('qa',[py,'qa9.py',cid])]
go=False
for name,cmd in STEPS:
    if name==frm:go=True
    if not go:continue
    t=time.time();p=subprocess.run(cmd,cwd=LONG,env=env,capture_output=True,text=True)
    tail=(p.stdout+p.stderr).strip().splitlines()[-4:]
    print(f'[{name}] {"ok" if p.returncode==0 else "FAILED"} {time.time()-t:.0f}s'+('' if p.returncode==0 and name!='qa' else '\n  '+'\n  '.join(tail)))
    if p.returncode:
        if name=='qa':print('\n'.join(l for l in (p.stdout).splitlines() if '[FAIL]' in l or '[WARN]' in l))
        sys.exit(1)
    if name=='qa':print('\n'.join(l for l in p.stdout.splitlines() if '[WARN]' in l))
print('CLIP READY:',f'{LONG}/final9_{cid}.mp4')
