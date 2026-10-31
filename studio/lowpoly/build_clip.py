#!/usr/bin/env python3
"""python3 build_clip.py pigwar.py [--spec] [--sheet] [--render] [--mix] [--workers 3]   (steps combine; none = all)"""
import sys,os,json,subprocess,importlib.util,wave,re,time
H=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,H+'/../free')
import numpy as np
import build as B
from build import SR,noise,lp,SFXLIB,rd
B.VOICES.update({'narr':('en-US-Chirp3-HD-Charon',1.12),'narr2':('en-US-Chirp3-HD-Charon',.92)})
def sine(f,t):return np.sin(2*np.pi*f*t)
def S_gun():
    n=int(1.1*SR);t=np.arange(n)/SR;return (lp(noise(n,3),4000)*np.exp(-t/.05)*1.2+sine(70*np.exp(-t*4)+40,t)*np.exp(-t/.25)*.9+lp(noise(n,4),700)*np.exp(-t/.35)*.35).astype(np.float32)
def S_squeal():
    n=int(.55*SR);t=np.arange(n)/SR;f=700+900*np.sin(np.pi*np.minimum(t/.45,1))+60*np.sin(2*np.pi*30*t);ph=2*np.pi*np.cumsum(f)/SR;return ((2*((ph/(2*np.pi))%1)-1)*.25*np.exp(-t/.3)+np.sin(ph)*.2).astype(np.float32)
def S_oink():
    n=int(.4*SR);t=np.arange(n)/SR;f=150+90*np.sin(np.pi*t/.4)-60*t;ph=2*np.pi*np.cumsum(f)/SR;y=(2*((ph/(2*np.pi))%1)-1)*np.sin(np.pi*t/.4)**.6;return (lp(y,900)*.9+lp(noise(n,8),1500)*.12*np.sin(np.pi*t/.4)).astype(np.float32)
def S_plink():
    n=int(.25*SR);t=np.arange(n)/SR;return (sine(1650,t)*np.exp(-t/.07)*.4+sine(2480,t)*np.exp(-t/.05)*.2).astype(np.float32)
def S_munch():
    n=int(.2*SR);t=np.arange(n)/SR;return (lp(noise(n,13),1400)*np.exp(-t/.04)*1.0+sine(180,t)*np.exp(-t/.05)*.3).astype(np.float32)
def S_fly():
    n=int(1.2*SR);t=np.arange(n)/SR;return (sine(190,t)*(.5+.5*sine(35,t))*.12*np.minimum(t/.1,1)*np.minimum((1.2-t)/.2,1)).astype(np.float32)
def S_tick():
    n=int(.06*SR);t=np.arange(n)/SR;return (sine(1200,t)*np.exp(-t/.012)*.35+noise(n,5)*np.exp(-t/.004)*.2).astype(np.float32)
def S_stamp():
    n=int(.5*SR);t=np.arange(n)/SR;return (sine(85,t)*np.exp(-t/.09)*1.0+lp(noise(n,6),900)*np.exp(-t/.05)*.9+noise(n,7)*np.exp(-t/.006)*.4).astype(np.float32)
def S_bugle():
    notes=[(392,.32),(392,.32),(523,.9),(659,.9)];out=[];
    for f,d in notes:
        n=int(d*SR);t=np.arange(n)/SR;y=sum(np.sin(2*np.pi*f*k*t)/k for k in(1,2,3,4))*.16*np.minimum(t/.03,1)*np.minimum((d-t)/.12,1);out.append(y)
    return np.concatenate(out).astype(np.float32)
def S_slide():
    n=int(.7*SR);t=np.arange(n)/SR;f=1500*np.exp(-t*2.2)+250;ph=2*np.pi*np.cumsum(f)/SR;return (np.sin(ph)*.3*np.minimum((.7-t)/.1,1)).astype(np.float32)
def S_riser():
    n=int(2.0*SR);t=np.arange(n)/SR;f=180+t**2*500;ph=2*np.pi*np.cumsum(f)/SR;return (np.sin(ph)*.18*(t/2)**1.5).astype(np.float32)
SFXLIB.update(gun=S_gun,squeal=S_squeal,oink=S_oink,plink=S_plink,munch=S_munch,fly=S_fly,tick=S_tick,stamp=S_stamp,bugle=S_bugle,slide=S_slide,riser=S_riser)
def bed(dur):
    bpm=116;sp=60/bpm;n=int((dur+1)*SR);out=np.zeros(n,dtype=np.float32);ch=[(130.8,164.8,196),(98,123.5,146.8),(110,130.8,164.8),(87.3,110,130.8)]
    def put(y,t0):
        i=int(t0*SR);k=min(len(y),n-i)
        if k>0:out[i:i+k]+=y[:k]
    for b in range(int(dur/sp)+2):
        t0=b*sp;c=ch[(b//4)%4];t=np.arange(int(.35*SR))/SR
        if b%2==0:put((sine(c[0],t)*np.exp(-t/.16)+sine(c[0]*2,t)*np.exp(-t/.08)*.3)*.9,t0)
        else:
            for f in c:put(sine(f*2,t)*np.exp(-t/.07)*.22,t0)
        th=np.arange(int(.05*SR))/SR;put(noise(len(th),b+1)*np.exp(-th/.01)*.12,t0+sp/2)
    return out
LIM='acompressor=threshold=0.1:ratio=3:attack=5:release=90:makeup=2,alimiter=limit=0.45:attack=3:release=60:level=disabled'
def wr(path,y):
    w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes());w.close()
def chunks(text,t0,t1,groups=None):
    ws=text.split();wt=[len(w)+1.5 for w in ws];tot=sum(wt);acc=0;t=[];
    for w,x in zip(ws,wt):t.append((t0+(t1-t0)*acc/tot,t0+(t1-t0)*(acc+x)/tot));acc+=x
    if groups:
        assert ' '.join(groups).split()==ws,(groups,ws)
        out=[];i=0
        for g in groups:
            n=len(g.split());out.append(dict(t0=t[i][0],t1=t[i+n-1][1],text=re.sub(r'[,.]$','',g)));i+=n
        for a,b2 in zip(out,out[1:]):a['t1']=b2['t0']
        return out
    out=[];cur=[]
    for i,w in enumerate(ws):
        cur.append(i)
        if len(cur)>=3 or re.search(r'[,.!?]$',w) or i==len(ws)-1:
            out.append(dict(t0=t[cur[0]][0],t1=t[cur[-1]][1],text=re.sub(r'[,.]$','',' '.join(ws[j] for j in cur))));cur=[]
    STOP={'a','an','the','to','of','and','at','over','in','his','her','it','was','were','who'}
    for i in range(len(out)-1):
        w=out[i]['text'].split()
        if len(w)>1 and w[-1].lower() in STOP and not re.search(r'[.!?]$',w[-1]) and len((out[i+1]['text']).split())<3:
            out[i+1]['text']=w[-1]+' '+out[i+1]['text'];out[i]['text']=' '.join(w[:-1]);out[i]['t1']=out[i+1]['t0']=out[i]['t1']-(out[i]['t1']-out[i]['t0'])/len(w)
    m=[]
    for c in out:
        if m and len(c['text'].split())==1 and len(m[-1]['text'].split())<3 and not re.search(r'[.!?]$',m[-1]['text']):m[-1]['text']+=' '+c['text'];m[-1]['t1']=c['t1']
        else:m.append(c)
    out=m
    for a,b in zip(out,out[1:]):a['t1']=b['t0']
    return out
def main():
    a=sys.argv[1:];sp=importlib.util.spec_from_file_location('ep',a[0]);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);EP=m.EP
    steps=[x for x in('--spec','--sheet','--render','--mix') if x in a] or ['--spec','--sheet','--render','--mix'];wk=int(a[a.index('--workers')+1]) if '--workers' in a else 3
    name=EP['id'];O=H+'/out/'+name;os.makedirs(O,exist_ok=True);FR=O+'/frames'
    t=0;shots=[];caps=[];vo=[];slots={}
    for L in EP['lines']:
        p=B.tts(L['t'],L['v']);x,sr=rd(p);d=len(x)/sr;lead=.15;slot=lead+d+L.get('pad',.3);v0=t+lead;vo.append((v0,p))
        caps+=chunks(L['t'],v0,v0+d,L.get('c'));acc=0
        for sid,fr in L['shots']:shots.append(dict(id=sid,t0=t+slot*acc,t1=t+slot*(acc+fr)));slots[sid]=(t+slot*acc,t+slot*(acc+fr));acc+=fr
        t+=slot
    dur=t+.3;shots[-1]['t1']=dur;spec=dict(shots=shots,caps=caps,dur=dur);json.dump(spec,open(O+'/spec.json','w'),indent=0)
    words=sum(len(L['t'].split()) for L in EP['lines']);print(f'{name}: {dur:.1f}s, {len(shots)} shots (avg {dur/len(shots):.2f}s), {words} words = {words/dur:.2f} w/s')
    if '--sheet' in steps:
        d2=O+'/mid';subprocess.run(['rm','-rf',d2]);ts=','.join(f'{(s["t0"]+s["t1"])/2:.3f}' for s in shots);subprocess.check_call(['node',H+'/render.js',O+'/spec.json',d2,ts,'--t'])
        from PIL import Image
        fs=sorted(os.listdir(d2));Wd,Hd=270,480;cols=6;rows=(len(fs)+cols-1)//cols;S=Image.new('RGB',(Wd*cols,Hd*rows))
        for i,f in enumerate(fs):S.paste(Image.open(d2+'/'+f).resize((Wd,Hd)),((i%cols)*Wd,(i//cols)*Hd))
        S.save(O+'/contact.jpg');print('sheet',O+'/contact.jpg')
    if '--render' in steps:
        subprocess.run(['rm','-rf',FR]);os.makedirs(FR);n=int(dur*30)+1;k=(n+wk-1)//wk;t0=time.time();ps=[subprocess.Popen(['node',H+'/render.js',O+'/spec.json',FR,str(i*k),str(min(n,(i+1)*k))]) for i in range(wk)]
        for p in ps:
            if p.wait():raise SystemExit('render failed')
        print(f'rendered {n} frames in {time.time()-t0:.0f}s')
    if '--mix' in steps:
        n=int(dur*SR)+SR;V=np.zeros(n,dtype=np.float32);X=np.zeros(n,dtype=np.float32)
        for t0,p in vo:
            x,_=rd(p);i=int(t0*SR);V[i:i+len(x)]+=x[:n-i]
        cache={}
        for e in EP['sfx']:
            sid,off,nm=e[:3];rep=e[3] if len(e)>3 else 1;gap=e[4] if len(e)>4 else 0;s0,s1=slots[sid]
            if isinstance(off,str):off=float(off[1:])*(s1-s0)
            if isinstance(gap,str):gap=float(gap[1:])*(s1-s0)
            if nm not in cache:cache[nm]=SFXLIB[nm]()
            y=cache[nm]
            for r in range(rep):
                tt=s0+off+r*gap
                if tt>=s1-.02 and r>0:break
                i=int(tt*SR);k=max(0,min(len(y),n-i));X[i:i+k]+=y[:k]*.7
        Mu=bed(dur)[:n];env=np.convolve(np.abs(V),np.ones(2205)/2205,'same');duck=1-np.clip(env*7,0,.6)
        out=V*1.0+X*.55+Mu*.16*duck;out/=max(1e-6,np.abs(out).max())/.9;wr(O+'/mix.wav',out)
        import shutil
        if os.path.exists(O+'/cover.jpg'):
            for i in range(4):shutil.copy(O+'/cover.jpg',FR+'/%05d.jpg'%i)
        r=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',O+'/mix.wav','-af',LIM+',loudnorm=I=-14:TP=-2.4:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
        J=json.loads(r[r.rindex('{'):r.rindex('}')+1]);LN=LIM+',loudnorm=I=-14:TP=-2.4:LRA=11:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true'%(J['input_i'],J['input_tp'],J['input_lra'],J['input_thresh'],J['target_offset'])
        subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',FR+'/%05d.jpg','-i',O+'/mix.wav','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af',LN,'-movflags','+faststart','-shortest',O+f'/{name}.mp4'])
        print('DONE',O+f'/{name}.mp4')
main()
