#!/usr/bin/env python3
"""REMAIN CALM builder (store3.html, 2D cast on 3D PS1 set).  python3 build_rc.py episodes/rc1.py [--w 1080 --h 1920] [--stills t1,t2] [--workers 4]"""
import sys,os,json,subprocess,time,importlib.util,wave
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R+'/../free');sys.path.insert(0,R)
import numpy as np
import build as B
from build import tts,rd,FPS,SR,NAMES,NAMECOL,VOICES,SFXLIB
import score
OUT=R+'/out';os.makedirs(OUT,exist_ok=True)
VOICES.update({'mimi':('en-US-Chirp3-HD-Kore',1.0),'gus':('en-US-Chirp3-HD-Fenrir',1.08),'teddy':('en-US-Chirp3-HD-Puck',1.18),'vance':('en-US-Chirp3-HD-Charon',.93),'rosa':('en-US-Chirp3-HD-Vindemiatrix',1.05),'pa':('en-US-Chirp3-HD-Leda',.92),'machine':('en-US-Chirp3-HD-Leda',.95),'watch':('en-US-Chirp3-HD-Aoede',1.05),'zombie':('en-US-Chirp3-HD-Algenib',.62),'nana':('en-US-Chirp3-HD-Gacrux',.88),'bo':('en-US-Chirp3-HD-Charon',1.12),'vendor':('en-US-Chirp3-HD-Charon',.88),'auntie':('en-US-Chirp3-HD-Aoede',.95),'lad':('en-US-Chirp3-HD-Puck',1.05),'uncle':('en-US-Chirp3-HD-Fenrir',.9),'girl':('en-US-Chirp3-HD-Leda',1.05),'man':('en-US-Chirp3-HD-Fenrir',.95),'woman':('en-US-Chirp3-HD-Aoede',1.0)})
NAMES.update({'mimi':'MIMI','gus':'GUS','teddy':'TEDDY','vance':'DR. VANCE','rosa':'ROSA','pa':'STORE PA','machine':'SELF-CHECKOUT','watch':'SMARTWATCH','zombie':'ZOMBIE','nana':'NANA PIM','bo':'BO','vendor':'YOU','auntie':'AUNTIE','lad':'LAD','uncle':'UNCLE','girl':'GIRL','man':'MAN','woman':'WOMAN'})
NAMECOL.update({'mimi':'#7affc0','gus':'#9ad0ff','teddy':'#ff9a8a','vance':'#ffd98a','rosa':'#d8a8ff','pa':'#8aff9a','machine':'#8aff9a','watch':'#ffe070','zombie':'#9aff6a','nana':'#7fe0e0','bo':'#ffb070','vendor':'#ffffff','auntie':'#ff9ac8','lad':'#9ad0ff','uncle':'#d0d090','girl':'#ffe070','man':'#d0d090','woman':'#ff9a7a'})
def _env(n,a=.005,d=.06):
    t=np.arange(n)/SR;return np.minimum(t/a,1)*np.exp(-t/d)
def S_beep():
    n=int(.09*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*1400*t)*.5*np.minimum(1,(n-np.arange(n))/300)).astype(np.float32)
def S_cry():
    d=2.4;n=int(d*SR);t=np.arange(n)/SR;f=520+120*np.sin(2*np.pi*5.5*t)+60*np.sin(2*np.pi*.9*t);ph=2*np.pi*np.cumsum(f)/SR
    y=sum(np.sin(ph*k)/k for k in (1,2,3,4,5))*.25;burst=((np.sin(2*np.pi*1.25*t)>-.2)*1.0).astype(np.float32);burst=np.convolve(burst,np.ones(900)/900,'same');y=y*burst*np.minimum(t/.05,1)*np.minimum((d-t)/.2,1)
    return (y*.9).astype(np.float32)
def S_heart():
    n=int(1.2*SR);t=np.arange(n)/SR;y=np.zeros(n,dtype=np.float32)
    for t0,a in((0,1),(.28,.7)):
        i=int(t0*SR);m=int(.12*SR);tt=np.arange(m)/SR;y[i:i+m]+=np.sin(2*np.pi*55*tt)*np.exp(-tt*28)*a
    return y*.9
def S_sizzle():
    n=int(2.6*SR);t=np.arange(n)/SR;x=np.random.RandomState(7).randn(n).astype(np.float32);x=np.diff(x,prepend=0);crack=(np.random.RandomState(9).rand(n)>.9994).astype(np.float32);crack=np.convolve(crack,np.hanning(180),'same')*3
    return ((x*.28+crack*.5)*np.minimum(t/.1,1)*np.minimum((2.6-t)/.5,1)).astype(np.float32)*.9
SFXLIB.update({'beep':S_beep,'cry':S_cry,'heart':S_heart,'sizzle':S_sizzle})
BLIP=False
BL={'man':(196,'sq',.056),'woman':(440,'tri',.054),'vendor':(110,'tri',.062),'auntie':(392,'sq',.052),'lad':(294,'sq',.055),'girl':(523,'sine',.05),'uncle':(147,'saw',.066),'zombie':(82,'saw',.09),'nana':(330,'tri',.07),'bo':(247,'sq',.05),'mimi':(349,'tri',.055),'gus':(165,'sq',.06),'teddy':(494,'sq',.045),'narrator':(196,'tri',.06)}
def blip_wav(text,who):
    """Undertale-style speech: one short blip per letter, pitch by character, silence on spaces and longer on punctuation; the subtitles carry the meaning."""
    import hashlib,wave
    f,kind,step=BL.get(who,(262,'sq',.058));h=hashlib.md5(('blip3'+text+who).encode()).hexdigest()[:12];p=f'{R}/tts/blip_{h}.wav'
    if os.path.exists(p):return p
    os.makedirs(R+'/tts',exist_ok=True);rng=np.random.RandomState(int(h[:6],16));out=[]
    def tone(fr,dur):
        n=int(dur*SR);t=np.arange(n)/SR;ph=2*np.pi*fr*t
        w=np.sign(np.sin(ph))*.6 if kind=='sq' else (2*np.abs(2*((fr*t)%1)-1)-1) if kind=='tri' else (2*((fr*t)%1)-1)*.7 if kind=='saw' else np.sin(ph+.6*np.sin(2*np.pi*9*t))
        env=np.minimum(t/.004,1)*np.exp(-t/(dur*.55));return (w*env).astype(np.float32)
    for ch in text:
        if ch.isalpha():
            fr=f*(1+(.14 if ch.lower() in 'aeiou' else 0)+(rng.rand()-.5)*.16);b=tone(fr,.05);out.append(np.concatenate([b,np.zeros(max(0,int(step*SR)-len(b)),dtype=np.float32)]))
        elif ch==' ':out.append(np.zeros(int(.035*SR),dtype=np.float32))
        elif ch in '.!?':out.append(np.zeros(int(.2*SR),dtype=np.float32))
        elif ch in ',;:':out.append(np.zeros(int(.11*SR),dtype=np.float32))
    y=np.concatenate(out) if out else np.zeros(int(.2*SR),dtype=np.float32);y=np.concatenate([y,np.zeros(int(.12*SR),dtype=np.float32)])
    w=wave.open(p,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(y*.55,-1,1)*32767).astype(np.int16).tobytes());w.close();return p
def voice(text,who):
    if BLIP:return blip_wav(text,who)
    p=tts(text,who)
    if who not in('pa','machine','watch'):return p
    q=p.replace('.wav','.pa.wav')
    if not os.path.exists(q):subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',p,'-af','highpass=f=380,lowpass=f=3400,acompressor=threshold=-20dB:ratio=5,aecho=0.6:0.5:70:0.25,volume=1.2','-ac','1',q])
    return q
def build_spec(ep):
    t=0;shots=[];lines_all=[];sfx_all=[];cues=[]
    for sh in ep['shots']:
        wavs=[]
        for ln in sh['lines']:
            p=voice(ln[1],ln[0]);x,sr=rd(p);wavs.append((ln,p,len(x)/sr))
        lead=sh.get('lead',.25)
        dur=sum(d for _,_,d in wavs)+.28*max(0,len(wavs)-1)+sh.get('pad',.3)+(lead if wavs else 0);dur=max(dur,sh.get('min',2.4));t0=t;t1=t+dur;cur=t0+lead;LN=[]
        for ln,p,d in wavs:
            LN.append(dict(t0=cur,t1=cur+d,en=ln[1],name=NAMES[ln[0]],c=NAMECOL[ln[0]],who=ln[0],wav=p));cur+=d+.28
        sfx_all+=[[t0+s[0],s[1]] for s in sh.get('sfx',[])]
        for c in sh.get('cues',[]):cues.append(dict(c,t=t0+c['t']))
        o={k:v for k,v in sh.items() if k not in('lines','sfx','min','pad','cues','lead')};o.update(t0=t0,t1=t1,lines=[{k:v for k,v in L.items() if k!='wav'} for L in LN]);shots.append(o);lines_all+=LN;t=t1
    return dict(series=ep['series'],title=ep['title'],part=ep['part'],of=ep['of'],shots=shots,dur=t+.5),lines_all,sfx_all,cues
def render(spec,fd,w,h,workers=4):
    os.makedirs(fd,exist_ok=True);sp=R+'/spec_%s.json'%os.path.basename(fd);json.dump(spec,open(sp,'w'))
    n=int(round(spec['dur']*FPS));k=(n+workers-1)//workers;ps=[]
    for i in range(workers):
        a,b=i*k,min(n,(i+1)*k)
        if a<b:ps.append(subprocess.Popen(['node',R+'/render_store3.js',sp,fd,str(a),str(b),str(w),str(h),'&2d'],cwd=R))
    for p in ps:
        if p.wait():raise SystemExit('render failed')
    return n
def mix_rc(spec,lines,sfx,cues,path):
    dur=spec['dur'];n=int(dur*SR)+SR;V=np.zeros(n,dtype=np.float32);M=np.zeros(n,dtype=np.float32)
    for L in lines:
        x,sr=rd(L['wav']);i=int(L['t0']*SR);k=max(0,min(len(x),n-i));V[i:i+k]+=x[:k]*(.85 if L['who']=='pa' else 1.0)
    cache={}
    for t,name in sfx:
        if name not in SFXLIB:print('missing sfx',name);continue
        if name not in cache:cache[name]=SFXLIB[name]()
        x=cache[name];i=int(t*SR);k=max(0,min(len(x),n-i));M[i:i+k]+=x[:k]*.6
    sc=score.build([dict(c) for c in cues]+[dict(t=0,type='hum',level=.05,dur=dur)],dur+.5)
    S=np.zeros(n,dtype=np.float32);S[:len(sc)]=sc[:n]
    envv=np.convolve(np.abs(V),np.ones(2205)/2205,'same');duck=1-np.clip(envv*6,0,.55)
    out=V+M+S*duck*.9
    pk=np.max(np.abs(out))+1e-6;out=out/pk*.92
    w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes());w.close()
def main():
    a=sys.argv[1:];sp=importlib.util.spec_from_file_location('ep',a[0]);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);ep=m.EP
    g=lambda k,d:int(a[a.index(k)+1]) if k in a else d
    w,h,workers=g('--w',1080),g('--h',1920),g('--workers',4)
    global BLIP;BLIP=bool(ep.get('blip'));spec,lines,sfx,cues=build_spec(ep);name=ep['id'];json.dump(dict(spec,cues=cues),open(OUT+f'/{name}.spec.json','w'))
    words=sum(len(L['en'].split()) for L in lines)
    print(f'{name}: {spec["dur"]:.1f}s, {len(spec["shots"])} shots (avg {spec["dur"]/len(spec["shots"]):.2f}s), {words} words = {words/spec["dur"]:.2f} w/s')
    if '--stills' in a:
        ts=[(x['t0']+x['t1'])/2 for x in spec['shots']] if a[a.index('--stills')+1]=='mid' else [float(x) for x in a[a.index('--stills')+1].split(',')];fd=OUT+f'/{name}_stills';import shutil;shutil.rmtree(fd,ignore_errors=True);os.makedirs(fd,exist_ok=True);p=R+f'/spec_{name}_s.json';json.dump(spec,open(p,'w'))
        for t in ts:subprocess.check_call(['node',R+'/render_store3.js',p,fd,str(int(t*FPS)),str(int(t*FPS)+1),str(w),str(h),'&2d'],cwd=R)
        print('stills',fd);return
    fd=OUT+f'/{name}_frames'
    if '--shots' in a:   # re-render only the listed shots (1-based) into the existing frames dir, then re-mux
        ids=[int(x) for x in a[a.index('--shots')+1].split(',')];sp_=R+f'/spec_{name}_frames.json';json.dump(spec,open(sp_,'w'));ps=[];t0=time.time()
        for i in ids:
            sh_=spec['shots'][i-1];f0,f1=int(round(sh_['t0']*FPS)),min(int(round(spec['dur']*FPS)),int(round(sh_['t1']*FPS))+1)
            ps.append(subprocess.Popen(['node',R+'/render_store3.js',sp_,fd,str(f0),str(f1),str(w),str(h),'&2d'],cwd=R))
            if len(ps)>=workers:[q.wait() for q in ps];ps=[]
        [q.wait() for q in ps];print(f're-rendered shots {ids} in {time.time()-t0:.0f}s')
        mix_rc(spec,lines,sfx,cues,OUT+f'/{name}.wav')
        subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',fd+'/%05d.jpg','-i',OUT+f'/{name}.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-movflags','+faststart','-shortest',OUT+f'/{name}.mp4']);print('DONE',OUT+f'/{name}.mp4');return
    if os.path.isdir(fd):
        for f in os.listdir(fd):os.remove(fd+'/'+f)
    t0=time.time();n=render(spec,fd,w,h,workers);print(f'rendered {n} frames in {time.time()-t0:.0f}s')
    mix_rc(spec,lines,sfx,cues,OUT+f'/{name}.wav')
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',fd+'/%05d.jpg','-i',OUT+f'/{name}.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-movflags','+faststart','-shortest',OUT+f'/{name}.mp4'])
    print('DONE',OUT+f'/{name}.mp4')
if __name__=='__main__':main()
