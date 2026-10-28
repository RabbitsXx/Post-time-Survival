#!/usr/bin/env python3
"""make_part.py N [--draft] [--force-render] [--skip-lint] [--no-qa] [--verify K] [--only spec|render|finish|qa]
ONE command from script to finished clip.  Steps (each timed):
  1 lint story   static rules from every rejection so far (<1 s)            -> stops on ERROR
  2 build        TTS (auto-tuned speaking rate) + timing + spec + cues       -> ser/pN/{spec.json,voice.wav,cues_en.json,pacing.json}
  3 lint layout  real-engine check: text cropped / overlapping / in the caption band -> stops on CROP/OVERLAP
  4 render       only the beats that changed (per-beat cache), 4 persistent Chromium workers
  5 cover        designed cover embedded as frames 0-3 + 9:16 / 16:9 files
  6 music        scene-driven bed
  7 finish       captions, end card, voice+music+sfx, 2-pass loudnorm, true-peak limiter, x264 crf 20 'fast' + AAC (parallel audio/video)
  8 qa           Gate A + B + C + cut strength + contact sheet in parallel     -> ser/pN/qa_report.txt, chk/sheetN.png
--draft = x264 veryfast and no QA (quick look while iterating).   Quality of a normal run is >= the old pipeline (see studio/AUDIT.md)."""
import sys,os,subprocess,time,json
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R)
import series
def sh(cmd,cwd=S,env=None):
    r=subprocess.run(cmd,cwd=cwd,capture_output=True,text=True,env=dict(os.environ,**(env or {})));return r.returncode,(r.stdout+r.stderr)
def main():
    a=sys.argv[1:];N=int(a[0]);draft='--draft' in a;force='--force-render' in a;nolint='--skip-lint' in a;noqa='--no-qa' in a or draft
    verify=a[a.index('--verify')+1] if '--verify' in a else None;only=a[a.index('--only')+1] if '--only' in a else None
    SRC=int(os.environ.get('PART_SRC',N));key,pn=series.of(SRC);cfg=series.SERIES[key];D=f'{R}/p{N}';T=[];t_all=time.time()
    npm=subprocess.check_output(['npm','root','-g'],text=True).strip()
    def step(name,fn):
        t=time.time();ok,out=fn();dt=time.time()-t;T.append((name,dt,ok))
        last=[l for l in out.strip().splitlines() if l.strip()][-1:]
        print(f'  {"ok " if ok else "FAIL"} {name:12s}{dt:6.1f}s  {last[0][:110] if last else ""}',flush=True)
        if not ok:print(out[-2500:]);sys.exit(1)
        return out
    wrap=lambda f:(lambda:(lambda r:(r[0]==0,r[1]))(f()))
    print(f'make_part {key} part {pn} (id {N}){"  [DRAFT]" if draft else ""}')
    if only in(None,'spec'):
        if not nolint:
            step('lint story',wrap(lambda:sh(['python3',f'{R}/lint_story.py',str(N)])))
        step('build',wrap(lambda:sh(['python3',f'{R}/build_spec2.py',str(N)])))
        if not nolint:
            step('lint layout',wrap(lambda:sh(['node','lint_layout.js',str(N)],cwd=S+'/v3',env=dict(NODE_PATH=npm))))
    if only in(None,'render'):
        step('render',wrap(lambda:sh(['python3',f'{R}/render_part.py',str(N)]+(['--force'] if force else [])+(['--verify',verify] if verify else []))))
        step('cover',wrap(lambda:sh(['python3','-I',f'{R}/{cfg["cover"]}',str(N)],env=dict(NODE_PATH=npm))))
        step('music',wrap(lambda:sh(['python3','-I',f'{R}/{cfg["music"]}',str(N)])))
    if only in(None,'finish'):
        step('finish',wrap(lambda:sh(['python3',f'{R}/finish_fast.py','--spec',f'{D}/spec.json','--video',f'{D}/frames','--voice',f'{D}/voice.wav','--music',f'{D}/music.wav',
                                      '--font',f'{S}/fonts/RobotoCondensed-Bold.ttf','--preset','veryfast' if draft else 'fast','--out',f'{D}/final.mp4'])))
    if only in(None,'finish') and 'PART_SRC' not in os.environ:
        step('subtitles',wrap(lambda:sh(['python3',f'{R}/make_srt2.py',str(N)])))
    if only in(None,'qa') and not noqa:
        rc,out=sh(['python3',f'{R}/qa_all.py',str(N)]);T.append(('qa',0,rc==0));print(out.rstrip())
    print(f'  total {time.time()-t_all:.0f}s   ->  {D}/final.mp4')
main()
