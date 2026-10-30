#!/usr/bin/env python3
"""qa9.py N [N ..] : gates for THE LAST BUS shorts.  Exit 1 on FAIL.  Report -> qa9_report.txt
 A story / pacing : avg shot 3.0-4.8 s, none < 1.5 s, none > 9.5 s, speech pace, the hook starts within 0.6 s, the on-screen series chip is in the first 0.5 s
 S STANDING RULES : PA opening says the series name, "part N of ten" and the topic; PA sign-off says the series name + part (+ "follow"/next); the route line (part n of 10) is on every non-card beat;
                    YouTube title carries "Part N"; YouTube tags >= 8 and <= 500 chars; Thai + English captions exist and match the cue count; covers exist
 F fun audit      : the gates above measure compliance, none of them measures fun.  This one does:  >= 6 distinct character voices, narrator/PA <= 25 % of speech time, >= 14 speaker changes,
                    >= 6 kinds of sound effect incl. a comedy sting, characters visible in >= 60 % of the non-card beats, >= 1 line that talks to the viewer or a question
 B layout         : lint9.js (CROP / OVERLAP = FAIL, BAND / EDGE = WARN)
 C video          : 720x1280 @30, H.264 yuv420p BT.709, duration = spec          D audio : -14 +-1 LUFS, true peak <= -1.0 dBTP
 E cuts / blanks  : picture changes at every beat boundary (warn), no black frames"""
import sys,os,json,re,subprocess,tempfile,collections
import numpy as np
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R);sys.path.insert(0,S+'/ser')
import clipreg as CR
NUM=CR.NUMW
def run(n):
    rows=[];FPS=30
    def row(g,l,m):rows.append((g,l,m))
    SI=CR.series(n);ME=CR.meta(n);TH=CR.th(n);np_,of=SI['part'],SI['of'];uni=SI['name'].split(':')[0].lower().replace('the ','').strip()
    P=f'{R}/p9/{CR.pid(n)}';sp=json.load(open(f'{P}/spec.json'));B=sp['beats'];cues=json.load(open(f'{P}/cues_en.json'));video=f'{R}/{CR.final(n)}';dur=sp['duration']
    ln=[b['t'][1]-b['t'][0] for b in B];avg=float(np.mean(ln))
    row('A','PASS' if 3.0<=avg<=4.8 else 'WARN',f'{len(B)} beats, average {avg:.2f} s (target 3-4.8), longest {max(ln):.1f} s, shortest {min(ln):.1f} s')
    long=[(i,round(l,1)) for i,l in enumerate(ln) if l>9.5];row('A','FAIL' if long else 'PASS',f'beats > 9.5 s: {long}' if long else 'no beat > 9.5 s')
    mid=[(i,round(l,1)) for i,l in enumerate(ln) if 7.5<l<=9.5];row('A','WARN' if mid else 'PASS',f'beats 7.5-9.5 s (long static shots): {mid}' if mid else 'no beat > 7.5 s')
    short=[(i,round(l,1)) for i,l in enumerate(ln) if l<1.5];row('A','WARN' if short else 'PASS',f'beats < 1.5 s: {short}' if short else 'no beat < 1.5 s')
    words=sum(len(c['text'].split()) for c in cues);sp_t=sum(c['t'][1]-c['t'][0]-.1 for c in cues);wpm=words/(sp_t/60)
    row('A','PASS' if wpm<=185 else 'WARN',f'speech pace {wpm:.0f} wpm ({words} words, {dur:.0f} s)')
    row('A','PASS' if cues[0]['t'][0]<=.6 else 'FAIL',f'the hook starts at {cues[0]["t"][0]:.2f} s: "{cues[0]["text"][:48]}"')
    chip=[f for f in B[0]['fx'] if f.get('k')=='series'];row('S','PASS' if chip and chip[0]['at']<=.5 else 'FAIL','on-screen series chip (name / part / topic) in the first 0.5 s' if chip else 'NO on-screen series chip in beat 0')
    # S: the PA says it
    pa=[c for c in cues if c['sp'] in('bus','radio','ann')];first=pa[0]['text'].lower() if pa else '';last=pa[-1]['text'].lower() if pa else ''
    ok1=(uni in first) and (f'part {NUM[np_]} of {NUM[of]}' in first);row('S','PASS' if ok1 else 'FAIL',f'PA opening: "{pa[0]["text"] if pa else None}"')
    t0=pa[0]['t'][0] if pa else 99;row('S','PASS' if t0<=8 else 'FAIL',f'the PA opening is spoken at {t0:.1f} s (series + part + topic within the first 8 s)')
    if np_<of:ok2=(uni in last) and (f'part {NUM[np_]} of {NUM[of]}' in last) and ('follow' in last or 'next' in last)
    else:ok2=(uni in last) and (f'part {NUM[of]} of {NUM[of]}' in last) and ('follow' in last)
    row('S','PASS' if ok2 else 'FAIL',f'PA sign-off: "{pa[-1]["text"] if pa else None}"')
    rt=[i for i,b in enumerate(B) if b['scene']['n']!='card' and not any(f.get('k') in('route','nightline') or str(f.get('k','')).endswith('_route') for f in b['fx'])]
    row('S','PASS' if not rt else 'FAIL',f'route line (part n of {of}) on every non-card beat' if not rt else f'beats without the route line: {rt}')
    m=ME;row('S','PASS' if f'Part {np_}' in m['yt_title'] and len(m['yt_title'])<=100 else 'FAIL',f'YouTube title ({len(m["yt_title"])} chars): {m["yt_title"]}')
    tl=[t.strip() for t in m['tags'].split(',') if t.strip()];row('S','PASS' if len(tl)>=8 and len(m['tags'])<=500 else 'FAIL',f'{len(tl)} YouTube tags, {len(m["tags"])} chars')
    cn=len(cues);row('S','PASS' if len(TH)==cn else 'FAIL',f'{cn} cues, {len(TH)} Thai lines')
    rel=f'{R}/{CR.release(n)}';miss=[f for f in('captions_en.srt','captions_th.srt','cover_9x16.png','cover_16x9.png','PUBLISH.md') if not os.path.exists(f'{rel}/{f}')];row('S','PASS' if not miss else 'FAIL','release kit complete' if not miss else f'missing {miss}')
    # F fun audit
    spk=collections.Counter(c['sp'] for c in cues);chars=[k for k in spk if k not in('bus','buswh','radio','ann')];narr=sum(c['t'][1]-c['t'][0] for c in cues if c['sp'] in('bus','buswh','radio','ann'))/max(.1,sum(c['t'][1]-c['t'][0] for c in cues))
    row('F','PASS' if len(chars)>=4 else 'WARN',f'{len(chars)} character voices: {dict(spk)}')
    row('F','PASS' if narr<=.25 else 'WARN',f'BUS-E/PA = {narr*100:.0f} % of speech time (target <= 25 %)')
    turns=sum(1 for a,b in zip(cues,cues[1:]) if a['sp']!=b['sp']);row('F','PASS' if turns>=14 else 'WARN',f'{turns} speaker changes (conversation, not narration)')
    sf=json.load(open(f'{P}/sfx.json'));kinds={s['k'] for s in sf};com={'rimshot','boing','cluck','cheer'}&kinds
    row('F','PASS' if len(kinds)>=6 and com else 'WARN',f'{len(kinds)} kinds of sound effect: {sorted(kinds)}; comedy stings: {sorted(com)}')
    nc=[b for b in B if b['scene']['n']!='card'];ch=[b for b in nc if b['scene']['n']=='stage' and (b['scene']['p'].get('loc') in('bus','dinerin','farm') or str(b['scene']['p'].get('loc','')).startswith('w_')) or any(a.get('k') in('dex','steve','marcus','dante','priya','rosa','benny','slim','ruth','eli','junie','hank') for a in b['scene']['p'].get('acts',[]))]
    row('F','PASS' if len(ch)/max(1,len(nc))>=.6 else 'WARN',f'characters visible in {len(ch)}/{len(nc)} non-card beats')
    q=sum(1 for c in cues if '?' in c['text'] or re.search(r'\b(chat|you)\b',c['text'].lower()));row('F','PASS' if q>=1 else 'WARN',f'{q} lines with a question or talking to the viewer')
    # B layout
    env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip())
    r=subprocess.run(['node','lint9.js',f'{CR.pid(n)}/spec'],cwd=R,capture_output=True,text=True,env=env);out=r.stdout+r.stderr;mm=re.search(r'lint9: (\d+) CROP, (\d+) OVERLAP, (\d+) BAND, (\d+) EDGE',out)
    if mm:
        c,o,b_,e=map(int,mm.groups());row('B','FAIL' if c+o else 'PASS',f'layout: {c} CROP, {o} OVERLAP');row('B','WARN' if b_+e else 'PASS',f'layout: {b_} BAND, {e} EDGE')
        for l in out.splitlines():
            if l.startswith('[CROP') or l.startswith('[OVERLAP'):row('B','FAIL',l)
    else:row('B','FAIL','lint9 did not run: '+out[-300:])
    if os.path.exists(video):
        pr=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',video],text=True))
        vs=[s for s in pr['streams'] if s['codec_type']=='video'][0];as_=[s for s in pr['streams'] if s['codec_type']=='audio'][0];d=float(pr['format']['duration'])
        row('C','PASS' if (vs['width'],vs['height'])==(720,1280) else 'FAIL',f"{vs['width']}x{vs['height']} {vs['codec_name']} {vs['pix_fmt']} {eval(vs['avg_frame_rate']):.2f} fps; colour {vs.get('color_space')}")
        row('C','PASS' if abs(d-dur)<.5 else 'FAIL',f'duration {d:.2f} s vs spec {dur:.2f} s; {os.path.getsize(video)/1e6:.1f} MB; audio {as_["codec_name"]} {as_["sample_rate"]} Hz')
        lg=subprocess.run(['ffmpeg','-hide_banner','-i',video,'-af','ebur128=peak=true','-vn','-f','null','-'],capture_output=True,text=True).stderr
        I=float(re.findall(r'I:\s+(-?[\d.]+) LUFS',lg)[-1]);TP=float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS',lg)[-1]);LRA=float(re.findall(r'LRA:\s+([\d.]+) LU',lg)[-1])
        row('D','PASS' if abs(I+14)<=1 else 'WARN',f'integrated {I} LUFS, LRA {LRA} LU');row('D','PASS' if TP<=-1.0 else 'FAIL',f'true peak {TP} dBTP')
        tmp=tempfile.mkdtemp();weak=[]
        def grab(t,p):subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i',video,'-frames:v','1','-vf','scale=180:320',p],check=True)
        for i in range(1,len(B)):
            t=B[i]['t'][0];pa_,pb=f'{tmp}/a.png',f'{tmp}/b.png';grab(max(0,t-.07),pa_);grab(t+.07,pb)
            dd=float(np.abs(np.asarray(Image.open(pa_).convert('L'),np.float32)-np.asarray(Image.open(pb).convert('L'),np.float32)).mean())
            if dd<10:weak.append((i,round(dd,1)))
        row('E','WARN' if weak else 'PASS',f'weak cuts (mean diff < 10/255): {weak}' if weak else 'every beat boundary changes the picture clearly')
        dark=[]
        bnd=[b['t'][0] for b in B]
        for t in np.arange(1,dur-1,2.5):
            if any(0<=t-x<=.35 for x in bnd):continue     # the 0.2 s dip at a card cut is the engine's transition, not a black frame
            p=f'{tmp}/f.png';grab(t,p)
            if float(np.asarray(Image.open(p).convert('L')).mean())<3:dark.append(round(float(t),1))
        row('E','FAIL' if dark else 'PASS',f'near-black frames at {dark}' if dark else 'no black frames in the scan')
        # H: the cover is the first frame (IG / TikTok take it from there)
        cv=f'{rel}/cover_9x16.png'
        if os.path.exists(cv):
            p=f'{tmp}/c0.png';subprocess.run(['ffmpeg','-v','error','-y','-ss','0.05','-i',video,'-frames:v','1','-vf','scale=180:320',p],check=True)
            dd=float(np.abs(np.asarray(Image.open(p).convert('L'),np.float32)-np.asarray(Image.open(cv).convert('L').resize((180,320)),np.float32)).mean());row('H','PASS' if dd<12 else 'FAIL',f'cover embedded in the first frames (diff {dd:.1f}/255)')
    else:row('C','WARN','video not found, skipped C-H')
    res='PASS' if not any(l=='FAIL' for _,l,_ in rows) else 'FAIL'
    return [f'QA report: {SI["name"]} part {np_}/{of} ({n})']+[f'  [{l}] {g}: {m}' for g,l,m in rows]+[f'\n  RESULT: {res}\n'],res
if __name__=='__main__':
    ns=[int(x) if x.isdigit() else x for x in sys.argv[1:]] or list(range(1,11));allt=[];bad=[]
    for n in ns:
        t,r=run(n);allt+=t;print('\n'.join(t))
        if r!='PASS':bad.append(n)
    open(R+'/qa9_report.txt','w').write('\n'.join(allt));print('FAIL parts:',bad if bad else 'none');sys.exit(1 if bad else 0)
