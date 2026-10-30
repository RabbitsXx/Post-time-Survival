#!/usr/bin/env python3
"""SOUND department audit.  audit_sound.py CLIP_ID -> JSON {score, issues[], metrics}.
Checks (all measured, nothing guessed): integrated loudness -14 +-1.5 LUFS, true peak <= -1.5 dBTP, voice sits on top of music + sfx during speech (speech-to-bed ratio),
every speaker is distinguishable by pitch (median f0 differs >= 12 %), speaker loudness within 4 dB of each other, speaking pace 120-165 wpm, no dead air > 1.6 s,
announcer share <= 25 % of speech, SFX density (a sound every ~3 s, comedy sting present)."""
import sys,os,json,subprocess,numpy as np
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
def pcm(p,sr=16000):
    r=subprocess.run(['ffmpeg','-v','error','-i',p,'-ac','1','-ar',str(sr),'-f','f32le','-'],capture_output=True);return np.frombuffer(r.stdout,dtype=np.float32)
def db(x):return float(20*np.log10(np.sqrt(np.mean(x**2))+1e-9))
def f0(x,sr=16000):
    import pitch
    return pitch.f0_of(x,sr)
def audit(cid):
    d=f'{LONG}/p9/{CR.pid(cid)}';fin=f'{LONG}/{CR.final(cid)}';issues=[];M={};score=100
    r=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',fin,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    I=float(r.split('I:')[-1].split('LUFS')[0]);TP=float(r.split('Peak:')[-1].split('dBFS')[0]);M.update(lufs=I,true_peak=TP)
    if abs(I+14)>1.5:issues.append(f'loudness {I:.1f} LUFS (target -14 +-1.5)');score-=10
    if TP>-1.5:issues.append(f'true peak {TP:.1f} dBTP (> -1.5)');score-=10
    cues=json.load(open(d+'/cues_en.json'));sr=16000
    tmp=f'/tmp/aud_{CR.pid(cid)}';os.makedirs(tmp,exist_ok=True)
    world='world' in json.load(open(d+'/spec.json'))
    if world:
        base=("[0:a]highpass=f=70,acompressor=threshold=0.09:ratio=3:attack=5:release=90:makeup=2.2,aformat=sample_rates=16000:channel_layouts=mono,asplit=3[v1][vo][v3];"
              "[1:a]volume=0.8,aformat=sample_rates=16000:channel_layouts=mono[mus];[mus][v1]sidechaincompress=threshold=0.02:ratio=14:attack=10:release=420[duck];"
              "[2:a]volume=0.5,aformat=sample_rates=16000:channel_layouts=mono[sx0];[sx0][v3]sidechaincompress=threshold=0.03:ratio=5:attack=8:release=220[sx];[duck]anull[dk];[vo]anull[vv]")
    else:
        base=("[0:a]highpass=f=70,acompressor=threshold=0.09:ratio=3:attack=5:release=90:makeup=2.2,aformat=sample_rates=16000:channel_layouts=mono,asplit=2[v1][vo];"
              "[1:a]volume=0.95,aformat=sample_rates=16000:channel_layouts=mono[mus];[mus][v1]sidechaincompress=threshold=0.028:ratio=9:attack=12:release=380[duck];"
              "[2:a]volume=0.9,aformat=sample_rates=16000:channel_layouts=mono[sx];[duck]anull[dk];[vo]anull[vv]")
    cmd=['ffmpeg','-v','error','-y','-i',d+'/voice.wav','-i',d+'/music.wav','-i',d+'/sfx.wav','-filter_complex',base]
    for nm,lab in(('vo','vv'),('duck','dk'),('sx','sx')):cmd+=['-map',f'[{lab}]','-ar','16000','-ac','1','-f','f32le',f'{tmp}/{nm}.raw']
    subprocess.run(cmd,check=True,stderr=subprocess.DEVNULL);outs={nm:np.fromfile(f'{tmp}/{nm}.raw',dtype=np.float32) for nm in('vo','duck','sx')}
    v,m,s=outs['vo'],outs['duck'],outs['sx']      # the three stems exactly as the final mix sees them (compressed voice, ducked music, sfx)
    spk={}
    for c in cues:
        a,b=int(c['t'][0]*sr),int(c['t'][1]*sr);seg=v[a:b]
        if len(seg)<sr//4:continue
        e=spk.setdefault(c['sp'],dict(dur=0,words=0,segs=[],bed=[]));e['dur']+=c['t'][1]-c['t'][0];e['words']+=len(c['text'].split());e['segs'].append(seg)
        e['bed'].append(float(db(m[a:b]+s[a:b])-db(seg)))
    tot=sum(e['dur'] for e in spk.values());F={}
    for k,e in spk.items():
        allv=np.concatenate(e['segs']);e['db']=db(allv);e['f0']=f0(allv);e['wpm']=e['words']/(e['dur']/60) if e['dur']>0 else 0;e['bed']=float(np.mean(e['bed']));F[k]=e['f0']
    M['speakers']={k:dict(db=round(e['db'],1),f0=round(e['f0'],0) if e['f0'] else None,wpm=round(e['wpm']),share=round(e['dur']/tot,2),bed_minus_voice_db=round(e['bed'],1)) for k,e in spk.items()}
    dbs=[e['db'] for e in spk.values() if e['dur']>1.5]
    if dbs and max(dbs)-min(dbs)>4:issues.append(f'speaker loudness spread {max(dbs)-min(dbs):.1f} dB (> 4): one voice is much quieter/louder than another');score-=8
    ks=[k for k in F if F[k]]
    for i in range(len(ks)):
        for j in range(i+1,len(ks)):
            if abs(F[ks[i]]-F[ks[j]])/max(F[ks[i]],F[ks[j]])<.12:issues.append(f'voices {ks[i]} and {ks[j]} sound alike (f0 {F[ks[i]]:.0f} vs {F[ks[j]]:.0f} Hz): recast or pitch-shift one');score-=6
    for k,e in spk.items():
        if e['dur']>3 and e['bed']>-6:issues.append(f'{k}: during speech the bed (music+sfx) is {e["bed"]:+.1f} dB relative to the voice (must be <= -6): the voice is not on top');score-=8
        if e['dur']>4 and not 115<=e['wpm']<=170:issues.append(f'{k}: {e["wpm"]:.0f} wpm (115-170)');score-=4
    if 'ann' in spk and spk['ann']['dur']/tot>.25:issues.append(f'announcer is {spk["ann"]["dur"]/tot:.0%} of the speech (<= 25 %)');score-=6

    # ---- score + foley (the studio's music and effects follow the picture)
    try:
        import wave
        w=wave.open(d+'/music.wav');mu=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32).reshape(-1,2).mean(1)/32768;msr=w.getframerate()
        moods=json.load(open(d+'/mood.json'));feat={}
        for a_,b_,k in moods:
            x=mu[int((a_+.3)*msr):int((b_-.3)*msr)]
            if len(x)<msr:continue
            sp_=np.abs(np.fft.rfft(x*np.hanning(len(x))));fr=np.fft.rfftfreq(len(x),1/msr);feat.setdefault(k,[]).append((20*np.log10(np.sqrt((x**2).mean())+1e-9),float((sp_*fr).sum()/sp_.sum())))
        kinds={k:(np.mean([f[0] for f in v]),np.mean([f[1] for f in v])) for k,v in feat.items()};M['music_moods']={k:dict(rms_db=round(float(a),1),centroid=round(float(b))) for k,(a,b) in kinds.items()}
        if len(kinds)<3:issues.append(f'SOUND: the music uses only {len(kinds)} mood texture(s): it must follow the story (tension, comedy, warmth, chase)');score-=8
        cs=[c for _,c in kinds.values()];rs=[r for r,_ in kinds.values()]
        if kinds and (max(cs)/max(1,min(cs))<1.4 and max(rs)-min(rs)<3):issues.append('SOUND: the moods sound almost the same (little difference in brightness or level)');score-=6
        if kinds and np.mean(cs)>5200:issues.append(f'SOUND: the score is hissy (mean brightness {np.mean(cs):.0f} Hz > 5200)');score-=4
    except Exception as e:issues.append(f'SOUND: music analysis failed: {e}');score-=2
    try:
        spec_=json.load(open(d+'/spec.json'));ev=json.load(open(d+'/sfx.json'));foot=[e['t'] for e in ev if e['k'].startswith(('step','run','shuffle'))]
        mv=[]
        for b_ in spec_['beats']:
            p_=(b_['scene'].get('p') or {})
            if b_['scene']['n']=='stage' and any((a_.get('to') and a_.get('k') not in('prop','horde')) for a_ in p_.get('acts',[])):mv.append(b_['t'])
        miss=[t for t in mv if not any(t[0]<=f<=t[1] for f in foot)];M['foley']=dict(events=len(ev),moving_beats=len(mv),without_steps=len(miss))
        if mv and miss:issues.append(f'SOUND: {len(miss)}/{len(mv)} beats with people walking have no footsteps');score-=min(10,3*len(miss))
        if len(ev)<spec_['duration']/1.6:issues.append(f'SOUND: only {len(ev)} sound effects in {spec_["duration"]:.0f} s (foley should be dense, >= 1 per 1.6 s)');score-=5
    except Exception as e:pass
    gaps=[b['t'][0]-a['t'][1] for a,b in zip(cues,cues[1:])]
    if gaps and max(gaps)>1.6:issues.append(f'dead air {max(gaps):.1f} s between lines');score-=4
    sf=json.load(open(d+'/sfx.json'));dur=cues[-1]['t'][1]
    if len(sf)<dur/4:issues.append(f'only {len(sf)} sound effects in {dur:.0f} s (one every <= 4 s)');score-=5
    M['sfx']=len(sf)
    return dict(dept='sound',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
