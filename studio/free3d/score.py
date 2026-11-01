"""REMAIN CALM score: a calm music-box lullaby motif that detunes with danger, room tone with flicker, fake-out tick, stinger, silence gate.
cues: [{t, type:'motif'|'tick'|'stinger'|'riser'|'hum'|'gate', dur, detune, level}]  ->  float32 mono wav
"""
import numpy as np, wave, sys, json
SR=44100
def _t(d): return np.arange(int(d*SR))/SR
def bell(f,d=1.6,det=0.0):
    t=_t(d);y=np.zeros_like(t)
    for k,(m,a) in enumerate([(1,1),(2.76,.35),(5.4,.15),(8.9,.06)]):
        y+=a*np.sin(2*np.pi*f*m*(1+det*(k*.003+.001))*t)*np.exp(-t*(2.2+k*1.5))
    return y*np.minimum(1,t*400)
NOTES={'A4':440.0,'C5':523.25,'E5':659.25,'D#5':622.25,'G4':392.0}
def motif(det=0.0,level=.3):
    seq=[('E5',0),('C5',.42),('A4',.84),('G4',1.26),('A4',1.68),('C5',2.1),('E5',2.52)]
    out=np.zeros(int(4.5*SR))
    for i,(n,t0) in enumerate(seq):
        f=NOTES[n]*(2**(det*((i%3)-1)*.4/12))
        y=bell(f,1.8,det);o=int(t0*SR);out[o:o+len(y)]+=y[:len(out)-o]*level
    return out
def hum(d,level=.05,flick=True):
    t=_t(d);n=np.random.RandomState(3).randn(len(t))
    b=np.convolve(n,np.ones(400)/400,'same')*8
    y=np.sin(2*np.pi*100*t)*.5+np.sin(2*np.pi*200*t)*.2+b*.25
    if flick:y*=1-.35*(np.sin(2*np.pi*.37*t)>.93)*np.random.RandomState(5).rand(len(t))
    return y*level
def tick(level=.25):
    t=_t(.12);return np.sin(2*np.pi*1800*t)*np.exp(-t*70)*level
def riser(d=1.4,level=.35):
    t=_t(d);f=200+t**2*1800;ph=2*np.pi*np.cumsum(f)/SR;n=np.random.RandomState(9).randn(len(t))
    return (np.sin(ph)*.5+n*.25*(t/d))*(t/d)**2*level
def stinger(level=.7):
    t=_t(1.6);y=np.sin(2*np.pi*(55*np.exp(-t*3))*t*3)*np.exp(-t*2.2)*.9
    for f in [311,466,740,1109]:y+=.25*np.sin(2*np.pi*f*t)*np.exp(-t*4)
    y+=np.random.RandomState(1).randn(len(t))*np.exp(-t*30)*.5
    return y*level

def bed(d,level=.18):
    """calm night-market bed: warm pad chords (Am - F - C - G) + soft plucked arpeggio, ~84 bpm"""
    t=_t(d);y=np.zeros_like(t);bar=60/84*4
    chords=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]]
    for i in range(int(d/bar)+1):
        t0=i*bar;ch=chords[i%4];o=int(t0*SR);n=min(int(bar*SR),len(y)-o)
        if n<=0:break
        tt=np.arange(n)/SR;env=np.minimum(1,tt*3)*np.minimum(1,(bar-tt)*3)
        for f in ch:y[o:o+n]+=np.sin(2*np.pi*f*tt)*.5*env*.18+np.sin(2*np.pi*f*2.005*tt)*.2*env*.08
        for k in range(8):
            f=ch[k%3]*2;b0=o+int(k*bar/8*SR);m=min(int(.5*SR),len(y)-b0)
            if m<=0:break
            q=np.arange(m)/SR;y[b0:b0+m]+=np.sin(2*np.pi*f*q)*np.exp(-q*7)*.16*(1.0 if k%2==0 else .6)
    y*=np.minimum(1,np.minimum(t*1.5,(d-t)*1.2));return y*level
def dread(d,level=.3):
    """horror bed: detuned low cluster with slow swell, tritone whine, accelerating heartbeat"""
    t=_t(d);sw=.6+.4*np.sin(2*np.pi*t/9)
    y=(np.sin(2*np.pi*55*t)*.5+np.sin(2*np.pi*58.3*t)*.4+np.sin(2*np.pi*77.8*t)*.25+np.sin(2*np.pi*(1318+25*np.sin(t*.7))*t)*.025*(t/d))*sw
    n=np.random.RandomState(4).randn(len(t));y+=np.convolve(n,np.ones(60)/60,'same')*.9*(.3+.7*t/d)
    bt=0.0;i=0
    while bt<d-.3:
        for dt,a in((0,1.0),(.24,.65)):
            o=int((bt+dt)*SR);m=min(int(.25*SR),len(y)-o)
            if m>0:q=np.arange(m)/SR;y[o:o+m]+=np.sin(2*np.pi*58*q*(1-.5*q))*np.exp(-q*16)*1.1*a*(.5+.5*bt/d)
        bt+=60/(78+60*bt/d)
    return y*level
def build(cues,dur):
    out=np.zeros(int(dur*SR))
    def put(y,t0):
        o=int(t0*SR)
        if o<0 or o>=len(out):return
        n=min(len(y),len(out)-o);out[o:o+n]+=y[:n]
    gates=[]
    for c in cues:
        ty=c['type'];t0=c['t']
        if ty=='motif':put(motif(c.get('detune',0),c.get('level',.3)),t0)
        elif ty=='tick':put(tick(c.get('level',.25)),t0)
        elif ty=='riser':put(riser(c.get('dur',1.4),c.get('level',.35)),t0)
        elif ty=='stinger':put(stinger(c.get('level',.7)),t0)
        elif ty=='hum':put(hum(c.get('dur',dur-t0),c.get('level',.05)),t0)
        elif ty=='bed':put(bed(c.get('dur',dur-t0),c.get('level',.18)),t0)
        elif ty=='dread':put(dread(c.get('dur',dur-t0),c.get('level',.3)),t0)
        elif ty=='gate':gates.append((t0,t0+c.get('dur',1.0)))
    for a,b in gates:  # silence before the reveal: duck everything except what comes after
        i0,i1=int(a*SR),int(b*SR);f=np.ones(len(out));f[i0:i1]=.02;f=np.convolve(f,np.ones(900)/900,'same');out*=f
    pk=np.abs(out).max()
    if pk>.95:out*=.95/pk
    return out.astype(np.float32)
def write(path,y):
    with wave.open(path,'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes())
if __name__=='__main__':
    cues=[{'t':0,'type':'hum','level':.05},{'t':1,'type':'motif','detune':0,'level':.25},{'t':9,'type':'motif','detune':.6,'level':.25},{'t':14,'type':'tick'},{'t':15.2,'type':'gate','dur':1.6},{'t':15.0,'type':'riser','dur':1.2},{'t':17,'type':'stinger'}]
    y=build(cues,20);write(sys.argv[1] if len(sys.argv)>1 else 'out/score_demo.wav',y)
    r=[float(np.sqrt((y[i*SR:(i+1)*SR]**2).mean())) for i in range(20)];print('peak',float(np.abs(y).max()),'rms/s',[round(x,3) for x in r])
