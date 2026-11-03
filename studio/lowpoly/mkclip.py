#!/usr/bin/env python3
"""python3 mkclip.py specs/<id>.py   -> writes <id>.js (IIFE + stage shots), <id>.py (episode), topics/<id>.md + .meta.json, registers scene.html, builds the spec (TTS).
Spec file defines: ID, TITLE, DESC, TAGS, PINNED, PROPS (JS), SHOTS (dict key -> JS config text), LINES=[(text, [shotkeys], source), ...], COVER=(L1,L2,L3,JS config), optional SFX={key:[(offset,sfx),...]}, PLACE=[keys]."""
import sys,os,json,re,subprocess
H=os.path.dirname(os.path.abspath(__file__));os.chdir(H)
ns={};exec(open(sys.argv[1]).read(),ns)
ID=ns['ID'];LINES=ns['LINES'];SH=ns['SHOTS']
js=['(()=>{',ns.get('PROPS','')]
js.append('const SH={'+',\n'.join(f'{k}:stgShot({v})' for k,v in SH.items())+'};')
js.append("for(const k in SH)SHOTS['%s_'+k]=SH[k];"%ID)
js.append("SHOTS['%scover']=stgShot(%s);"%(ID,ns['COVER'][3]))
js.append('})();')
open(f'{ID}.js','w').write('\n'.join(js))
lines=[];sfx=[];SFX=ns.get('SFX',{});used=[]
for i,(t,keys,src) in enumerate(LINES):
    last=i==len(LINES)-1
    shots=[(f'{ID}_{k}',1) for k in keys]
    for k in keys:
        sid=f'{ID}_{k}'
        if sid not in used:
            used.append(sid)
            if i==0:sfx.append((sid,.04,'whoosh'))
            for off,nm in SFX.get(k,[(.4,'pop')]):sfx.append((sid,off,nm))
    lines.append(dict(t=t,v='narr2' if last else 'narr',pad=.6 if last else .1,shots=shots))
if lines:sfx.append((used[-1],'%0.85','rimshot'))
place=[f'{ID}_{k}' for k in ns.get('PLACE',[])]
open(f'{ID}.py','w').write(f"EP=dict(id={ID!r},title={ns['TITLE']!r},\n lines={lines!r},\n sfx={sfx!r})\nPLACE_SHOTS={place!r}\n")
rows=['# %s - %s (source: %s, raw wikitext fetched %s)'%(ID,ns['TITLE'],ns.get('SOURCE','Wikipedia'),ns.get('DATE','2026-11')),'| # | line | status | source |','|---|---|---|---|']
for i,(t,keys,src) in enumerate(LINES,1):rows.append(f'| {i} | {t} | {src} |')
open(f'topics/{ID}.md','w').write('\n'.join(rows)+'\n')
json.dump(dict(title=ns['TITLE'],description=ns['DESC'],tags=['low poly shorts','low poly','lowpoly','low poly 3d animation','ps1 graphics','ps1 style','3d animation']+ns['TAGS']+['fun facts','educational shorts','posttime lowpoly'],pinned_comment=ns['PINNED']),open(f'topics/{ID}.meta.json','w'),indent=1,ensure_ascii=False)
h=open('scene.html').read()
for n in ('stage','%s'%ID):
    t=f'<script src="{n}.js"></script>'
    if t not in h:h=h.replace('<script src="gate_info.js"></script>',t+'\n<script src="gate_info.js"></script>')
open('scene.html','w').write(h)
print(subprocess.run([sys.executable,'build_clip.py',f'{ID}.py','--spec'],capture_output=True,text=True).stdout.strip().splitlines()[-1])
