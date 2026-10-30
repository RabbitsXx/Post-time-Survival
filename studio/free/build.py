#!/usr/bin/env python3
"""free studio: independent pipeline (own engine + TTS + synthesized sound).  python3 build.py EP_FILE [--stills t1,t2,..]"""
import sys,os,json,math,subprocess,base64,hashlib,time,wave,struct,requests,importlib.util
import numpy as np
R=os.path.dirname(os.path.abspath(__file__));FPS=30;GY=700
OUT=R+'/out';os.makedirs(OUT,exist_ok=True);os.makedirs(R+'/tts',exist_ok=True)
VOICES={'okafor':('en-US-Chirp3-HD-Rasalgethi',.92),'bea':('en-US-Chirp3-HD-Gacrux',1.0),'theo':('en-US-Chirp3-HD-Puck',1.08),'priya':('en-US-Chirp3-HD-Vindemiatrix',.95),'dunn':('en-US-Chirp3-HD-Orus',.95),'ann':('en-US-Chirp3-HD-Achird',1.0),'narrator':('en-US-Chirp3-HD-Algenib',.9),'radio':('en-US-Chirp3-HD-Leda',.95),'keeper':('en-US-Chirp3-HD-Algenib',.9),'nell':('en-US-Chirp3-HD-Vindemiatrix',.95),'mayor':('en-US-Chirp3-HD-Rasalgethi',.92),'gran':('en-US-Chirp3-HD-Gacrux',.9),'timo':('en-US-Chirp3-HD-Puck',1.05),'doc':('en-US-Chirp3-HD-Charon',.95),'hale':('en-US-Chirp3-HD-Orus',.88)}
NAMECOL={'okafor':'#c9a8ff','bea':'#ff9ab8','theo':'#7affc0','priya':'#9ad0ff','dunn':'#ffa878','ann':'#ffd98a','narrator':'#ffffff','radio':'#8aff9a','keeper':'#ffffff','nell':'#7affc0','mayor':'#ff9a8a','gran':'#d8a8ff','timo':'#ffe070','doc':'#9ad0ff','hale':'#ffc890'}
NAMES={'okafor':'OKAFOR','bea':'BEA','theo':'THEO','priya':'PRIYA','dunn':'DUNN','ann':'INTERCOM','narrator':'','radio':'RADIO','keeper':'TOM','nell':'NELL','mayor':'MAYOR','gran':'GRAN ODA','timo':'TIMO','doc':'DOC','hale':'HALE'}
def key():
    k=os.environ.get('GEMINI_API_KEY')
    if k:return k
    return [l.split('=',1)[1].strip() for l in open(R+'/../post.env') if l.startswith('GEMINI_API_KEY=')][0]
def tts(text,who):
    v,rate=VOICES[who];h=hashlib.md5((text+v+str(rate)).encode()).hexdigest()[:12];p=f'{R}/tts/{h}.wav'
    if os.path.exists(p) and os.path.getsize(p)>1000:return p
    for a in range(6):
        r=requests.post('https://texttospeech.googleapis.com/v1/text:synthesize',headers={'x-goog-api-key':key()},json={'input':{'text':text},'voice':{'languageCode':'en-US','name':v},'audioConfig':{'audioEncoding':'LINEAR16','sampleRateHertz':24000,'speakingRate':rate}},timeout=90);j=r.json()
        if 'audioContent' in j:
            raw=p+'.raw.wav';open(raw,'wb').write(base64.b64decode(j['audioContent']))
            f='silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,aresample=44100'
            if who=='radio':f+=',highpass=f=420,lowpass=f=2900,acrusher=bits=9:mix=.25:mode=log,volume=1.4'
            if who=='ann':f+=',highpass=f=300,lowpass=f=3200,acompressor=threshold=-20dB:ratio=5'
            subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',raw,'-af',f,'-ac','1',p]);os.remove(raw);return p
        time.sleep(2+a*2)
    raise SystemExit('TTS failed '+text)
def rd(p):
    w=wave.open(p);n=w.getnframes();x=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768;return x,w.getframerate()
# ---------------- DSL ----------------
class Actor(dict):pass
def A(who,x,y=GY,face=1,expr='calm',path=None,acts=None,prop=None,hold=None,fall=None,z=False,sc=1.0):
    a=dict(who=who,face=face,expr=expr,path=path or [[0,x,y],[99,x,y]],acts=acts or [],prop=prop,hold=hold,z=z,sc=sc);a['mouthKey']=None if z else who;return a
def WALK(x0,x1,dur,y=GY,t0=0):return [[0,x0,y],[t0,x0,y],[t0+dur,x1,y]]
class Shot:
    def __init__(s,bg,cx=640,cy=560,z=.8,cx2=None,cy2=None,z2=None,min=2.0,place='',tint=None,actors=None,lines=None,fx=None,props=None,card=None,sfx=None,pad=.35,fadeIn=True):
        s.place=place;s.bg=bg;s.cam=[[0,cx,cy,z],[99,cx if cx2 is None else cx2,cy if cy2 is None else cy2,z if z2 is None else z2]];s.min=min;s.tint=tint;s.actors=actors or [];s.lines=lines or [];s.fx=fx or [];s.props=props or [];s.card=card;s.sfx=sfx or [];s.pad=pad;s.fadeIn=fadeIn
def say(who,en,th):return (who,en,th)
def HIT(att,tar,t,word,prop,att_acts,tar_acts,fx,sfx,kill=True,dirx=1):
    att_acts.append([t-.45,t+.3,'swing',dict(prop=prop)]);tar_acts.append([t+.02,t+.3,'flinch']);
    if kill:tar_acts.append([t+.3,t+.8,'fall',dict()])
    fx+= [[t,'sticker',word,270,330],[t,'shake',.3,5]];sfx+=[[t,'hit_'+('pan' if prop=='pan' else 'metal' if prop in('wrench','flash') else 'soft')],[t+.05,'groan_hurt'],[t+.4,'bodyfall']] if kill else [[t,'hit_soft'],[t+.05,'groan_hurt']]
def build_spec(ep):
    t=0;shots=[];mouth={};lines_all=[];sfx_all=[];ts=[]
    for sh in ep['shots']:
        wavs=[];tl=.25
        for ln in sh.lines:
            p=tts(ln[1],ln[0]);x,sr=rd(p);wavs.append((ln,p,len(x)/sr));
        dur=sum(d for _,_,d in wavs)+.3*max(0,len(wavs)-1)+sh.pad+(.25 if wavs else 0)
        dur=max(dur,sh.min*ep.get('minscale',1.0));t0=t;t1=t+dur;cur=t0+.25;LN=[]
        for ln,p,d in wavs:
            LN.append(dict(t0=cur,t1=cur+d,en=ln[1],name=NAMES[ln[0]],c=NAMECOL[ln[0]],who=ln[0],wav=p));cur+=d+.3
        for L in LN:
            x,sr=rd(L['wav']);env=[];n=int(round((L['t1']-L['t0'])*FPS))
            arr=mouth.setdefault(L['who'],[0.0]*(int((t1+60)*FPS)))
            for i in range(n):
                seg=x[int(i/FPS*sr):int((i+1)/FPS*sr)+1];v=float(np.sqrt(np.mean(seg**2))) if len(seg) else 0;fi=int(L['t0']*FPS)+i
                if fi<len(arr):arr[fi]=min(1.0,v*7)
        sfx_all+=[[t0+s[0],s[1]] for s in sh.sfx]
        cam=[[c[0] if c[0]<99 else dur]+c[1:] for c in sh.cam]
        shots.append(dict(place=getattr(sh,'place',''),t0=t0,t1=t1,bg=sh.bg,cam=cam,actors=sh.actors,lines=LN,fx=sh.fx,props=sh.props,tint=sh.tint,card=sh.card,fadeIn=sh.fadeIn));lines_all+=LN;t=t1
    spec=dict(series=ep['series'],title=ep['title'],part=ep['part'],of=ep['of'],style=ep.get('style',{}),shots=shots,mouth={k:[round(v,2) for v in a] for k,a in mouth.items()},dur=t+.6)
    return spec,lines_all,sfx_all
# ---------------- sound ----------------
SR=44100
def noise(n,seed=1):return np.random.RandomState(seed).randn(n).astype(np.float32)
def env(n,a=.005,d=.2):
    t=np.arange(n)/SR;return np.minimum(t/a,1)*np.exp(-t/d)
def lp(x,fc):
    a=math.exp(-2*math.pi*fc/SR);y=np.zeros_like(x);s=0.0
    for i in range(len(x)):s=a*s+(1-a)*x[i];y[i]=s
    return y
def S_hit_pan(): n=int(.5*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*620*t)*np.exp(-t/.12)*.6+np.sin(2*math.pi*930*t)*np.exp(-t/.08)*.3+noise(n)*np.exp(-t/.01)*.5)
def S_hit_metal(): n=int(.4*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*410*t)*np.exp(-t/.09)*.5+np.sin(2*math.pi*1130*t)*np.exp(-t/.05)*.3+noise(n,2)*np.exp(-t/.012)*.6)
def S_hit_soft(): n=int(.3*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*90*t)*np.exp(-t/.07)*.9+lp(noise(n,3),700)*np.exp(-t/.05)*1.2)
def S_bodyfall(): n=int(.5*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*60*t)*np.exp(-t/.12)*.9+lp(noise(n,4),400)*np.exp(-t/.1)*1.1)
def S_groan(f0=95,dur=.9,seed=5):
    n=int(dur*SR);t=np.arange(n)/SR;f=f0*(1+.18*np.sin(2*math.pi*5.5*t))*(1-.25*t/dur);ph=2*math.pi*np.cumsum(f)/SR
    x=sum(np.sin(ph*k)*(1/k)**.8 for k in range(1,9));x=x*(np.sin(2*math.pi*4*t)*.25+.75);x=x*np.minimum(t/.12,1)*np.minimum((dur-t)/.2,1)
    return lp(x.astype(np.float32),1400)*.6+lp(noise(n,seed),900)*.15*np.minimum(t/.1,1)
def S_groan_hurt():return S_groan(120,.55,7)
def S_alarm(dur=1.0):
    n=int(dur*SR);t=np.arange(n)/SR;f=np.where((t*4)%1<.5,960,780);ph=2*math.pi*np.cumsum(f)/SR;return np.sign(np.sin(ph)).astype(np.float32)*.25+np.sin(ph)*.25
def S_bell():n=int(.9*SR);t=np.arange(n)/SR;return sum(np.sin(2*math.pi*f*t)*a for f,a in((880,.5),(1320,.3),(2200,.15)))*np.exp(-t/.35)
def S_sting():n=int(1.2*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*155*t)+np.sin(2*math.pi*164*t))*.35*np.exp(-t/.5)+np.sin(2*math.pi*620*t)*.1*np.exp(-t/.3)
def S_creak():n=int(.8*SR);t=np.arange(n)/SR;f=300+120*np.sin(2*math.pi*9*t)*np.exp(-t/.4);ph=2*math.pi*np.cumsum(f)/SR;return (np.sign(np.sin(ph))*.18+np.sin(ph)*.1)*np.minimum(t/.1,1)*np.minimum((.8-t)/.2,1)
def S_heart():n=int(1.0*SR);t=np.arange(n)/SR;x=np.zeros(n,dtype=np.float32)
def S_thump(): return S_hit_soft()*.8
def S_jingle():n=int(1.1*SR);t=np.arange(n)/SR;o=np.zeros(n,dtype=np.float32)
def tone(f,t0,d,a=.35):
    n=int(d*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*f*t)+.4*np.sin(2*math.pi*2*f*t))*a*np.exp(-t/(d*.6))*np.minimum(t/.005,1)
def S_jingle():
    o=np.zeros(int(1.2*SR),dtype=np.float32)
    for k,(f,t0) in enumerate([(784,0),(988,.12),(1175,.24),(1568,.36)]):
        x=tone(f,t0,.5);i=int(t0*SR);o[i:i+len(x)]+=x[:len(o)-i]
    return o
def S_whoosh():n=int(.5*SR);t=np.arange(n)/SR;return lp(noise(n,9),2500)*np.sin(np.pi*t/.5)*.6
def S_exhale():n=int(1.0*SR);t=np.arange(n)/SR;return lp(noise(n,11),1800)*np.sin(np.pi*t/1.0)*.25
def S_click():n=int(.1*SR);t=np.arange(n)/SR;return noise(n,12)*np.exp(-t/.01)*.5
def S_chime():return S_bell()*.7
def S_static():n=int(.9*SR);t=np.arange(n)/SR;g=(np.sin(t*37)>-.2).astype(np.float32);return lp(noise(n,21),3500)*.35*g*np.minimum(t/.05,1)*np.minimum((.9-t)/.2,1)
def S_gen():n=int(2.4*SR);t=np.arange(n)/SR;return (np.sin(2*math.pi*48*t)*.5+np.sin(2*math.pi*96*t+np.sin(t*40))*.25+lp(noise(n,22),180)*.8)*np.minimum(t/.3,1)*np.minimum((2.4-t)/.4,1)*.6
def S_wave():n=int(3.2*SR);t=np.arange(n)/SR;return lp(noise(n,23),900)*np.sin(np.pi*t/3.2)**2*.5
def S_lock():n=int(.5*SR);t=np.arange(n)/SR;x=noise(n,24)*np.exp(-t/.008)*.5;i=int(.18*SR);y=np.zeros(n,dtype=np.float32);y[:n]+=x;z=np.sin(2*math.pi*180*t)*np.exp(-t/.06)*.5;y[i:]+=z[:n-i];return y
def S_gull():n=int(.8*SR);t=np.arange(n)/SR;f=1500+700*np.sin(2*math.pi*3*t)*np.exp(-t/.4);ph=2*math.pi*np.cumsum(f)/SR;return np.sin(ph)*.2*np.exp(-t/.35)
def S_foot():n=int(.25*SR);t=np.arange(n)/SR;return lp(noise(n,25),600)*np.exp(-t/.05)*.6
SFXLIB={'static':S_static,'gen':S_gen,'wave':S_wave,'lock':S_lock,'gull':S_gull,'foot':S_foot,'hit_pan':S_hit_pan,'hit_metal':S_hit_metal,'hit_soft':S_hit_soft,'bodyfall':S_bodyfall,'groan':S_groan,'groan_hurt':S_groan_hurt,'alarm':S_alarm,'bell':S_bell,'sting':S_sting,'creak':S_creak,'jingle':S_jingle,'whoosh':S_whoosh,'exhale':S_exhale,'click':S_click,'thump':S_thump,'chime':S_chime}
def music(dur,mood=0):
    n=int(dur*SR);t=np.arange(n)/SR;x=np.zeros(n,dtype=np.float32)
    for f,a in((55,.5),(82.4,.3),(110,.2),(130.8,.12)):x+=np.sin(2*math.pi*f*t+np.sin(t*.3))*a
    pulse=(np.sin(2*math.pi*t*.9)>.92).astype(np.float32);x+=lp(noise(n,13),200)*.5*pulse*.5
    x*=.12*np.minimum(t/2,1)*np.minimum((dur-t)/1.5,1);wind=lp(noise(n,14),500)*(.06+.03*np.sin(t*.4));sea=lp(noise(n,15),700)*(.05+.05*np.sin(t*.5)**2);return x+wind+sea
def mix(spec,lines,sfx,path):
    dur=spec['dur'];n=int(dur*SR)+SR;M=np.zeros(n,dtype=np.float32);V=np.zeros(n,dtype=np.float32)
    for L in lines:
        x,sr=rd(L['wav']);i=int(L['t0']*SR);V[i:i+len(x)]+=x[:max(0,min(len(x),n-i))]*(1.0 if L['who']!='ann' else .9)
    cache={}
    for t,name in sfx:
        if name not in SFXLIB:continue
        if name not in cache:cache[name]=SFXLIB[name]()
        x=cache[name];i=int(t*SR);M[i:i+len(x)]+=x[:max(0,min(len(x),n-i))]*(.55)
    # alarm episodes: long alarm bed
    for t0,t1 in spec.get('alarm',[]):
        a=S_alarm(t1-t0);i=int(t0*SR);M[i:i+len(a)]+=a[:max(0,min(len(a),n-i))]*.45
    mus=music(dur+1);bed=mus[:n]
    # duck bed under voice
    envv=np.convolve(np.abs(V),np.ones(2205)/2205,'same');duck=1-np.clip(envv*6,0,.6)
    out=V*1.0+M+bed*duck
    pk=np.max(np.abs(out))+1e-6;out=out/pk*.92
    w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes());w.close()
# ---------------- render ----------------
WORKER=r'''
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [spec,out,a,b]=process.argv.slice(2);const br=await chromium.launch();const p=await br.newPage({viewport:{width:540,height:960},deviceScaleFactor:1});
await p.goto('file://'+process.env.FREE+'/engine.html');await p.evaluate(()=>window.fontsReady);await p.evaluate(s=>window.setSpec(s),JSON.parse(fs.readFileSync(spec)));
for(let f=+a;f<+b;f++){const d=await p.evaluate(f=>window.renderFrame(f),f);fs.writeFileSync(out+'/'+String(f).padStart(5,'0')+'.jpg',Buffer.from(d,'base64'))}
await br.close()})();
'''
def render(spec,frames_dir,workers=4):
    os.makedirs(frames_dir,exist_ok=True);n=int(round(spec['dur']*FPS));json.dump(spec,open(R+'/spec.json','w'));open(R+'/_w.js','w').write(WORKER)
    env=dict(os.environ,FREE=R);procs=[];k=(n+workers-1)//workers
    try:env['NODE_PATH']=subprocess.check_output(['npm','root','-g'],text=True).strip()
    except Exception:pass
    for i in range(workers):
        a,b=i*k,min(n,(i+1)*k)
        if a<b:procs.append(subprocess.Popen(['node',R+'/_w.js',R+'/spec.json',frames_dir,str(a),str(b)],env=env))
    for p in procs:
        if p.wait():raise SystemExit('render worker failed')
    return n
def main():
    a=sys.argv[1:];epf=a[0]
    sp=importlib.util.spec_from_file_location('ep',epf);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
    ep=m.EP;name=ep['id']
    spec,lines,sfx=build_spec(ep);spec['alarm']=ep.get('alarm',[]);json.dump(spec,open(OUT+f'/{name}.spec.json','w'))
    print(f'{name}: {spec["dur"]:.1f}s, {len(spec["shots"])} shots, {sum(len(L["en"].split()) for L in lines)} spoken words')
    if '--stills' in a:
        ts=[float(x) for x in a[a.index('--stills')+1].split(',')];fd=OUT+f'/{name}_stills';os.makedirs(fd,exist_ok=True)
        json.dump(spec,open(R+'/spec.json','w'));open(R+'/_w.js','w').write(WORKER)
        for t in ts:subprocess.check_call(['node',R+'/_w.js',R+'/spec.json',fd,str(int(t*FPS)),str(int(t*FPS)+1)],env=dict(os.environ,FREE=R,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip()))
        print('stills in',fd);return
    fd=OUT+f'/{name}_frames';
    if os.path.isdir(fd):
        for f in os.listdir(fd):os.remove(fd+'/'+f)
    t0=time.time();n=render(spec,fd);print(f'rendered {n} frames in {time.time()-t0:.0f}s')
    mix(spec,lines,sfx,OUT+f'/{name}.wav')
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',fd+'/%05d.jpg','-i',OUT+f'/{name}.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest','-movflags','+faststart',OUT+f'/{name}.mp4'])
    print('DONE',OUT+f'/{name}.mp4')
if __name__=='__main__':main()
