"""score.py : the composer.  Music + room tone for the data-driven worlds, built from the spec so it follows the picture.
 * every beat has a mood (script: creep / comic / warm / idle / sad / chase) -> its own texture, key and tempo; moods crossfade (0.5 s) and a change INTO tension or chase gets a stinger + riser
 * the part has an intensity curve (it builds towards the cliffhanger / finale), and the music thins out under dialogue by the mix ducking
 * every location has its own room tone (lobby: fluorescent hum + air conditioning, stair: hollow air + drips, hall: HVAC + flicker, flat: fridge + clock, roof: wind + far city, street: far traffic)
Texture library (all synthesized):  creep = sub drone + heartbeat + string cluster swells + metal ticks | chase = 140 bpm drums + saw ostinato | comic = pizzicato walking bass + marimba pings
 warm = soft pad chords + guitar-like arpeggio + shaker | idle = intercom bleeps + pad | sad = slow piano + low strings."""
import numpy as np
import audio16 as A
from audio16 import *
rg=np.random.default_rng(21)
def gate(n,total,segs,pad=.5):
    e=np.zeros(n)
    for a,b in segs:
        i0,i1=int(max(0,a-pad*.6)*SR),int(min(total,b+pad*.6)*SR)
        if i1<=i0:continue
        seg=np.ones(i1-i0);r=min(int(pad*SR),len(seg)//2);seg[:r]=np.linspace(0,1,r);seg[-r:]=np.minimum(seg[-r:],np.linspace(1,0,r));e[i0:i1]=np.maximum(e[i0:i1],seg)
    return e
def room(kind,d):
    n=int(d*SR);t=np.arange(n)/SR
    if kind=='lobby':x=np.sin(2*np.pi*120*t)*.10+np.sin(2*np.pi*240*t)*.04+fft_filter(rg.standard_normal(n),40,300)*.05+np.sin(2*np.pi*7200*t)*.004
    elif kind=='stair':x=fft_filter(rg.standard_normal(n),60,900)*.05*(0.7+0.3*np.sin(2*np.pi*.13*t))+sum(np.sin(2*np.pi*f*t)*.01 for f in(82,123))
    elif kind=='hall':x=np.sin(2*np.pi*100*t)*.07+fft_filter(rg.standard_normal(n),50,500)*.05+np.sin(2*np.pi*60*t)*.03*(np.sin(2*np.pi*3.3*t)>.97)
    elif kind=='flat':x=np.sin(2*np.pi*60*t)*.07+np.sin(2*np.pi*180*t)*.025+fft_filter(rg.standard_normal(n),80,400)*.03
    elif kind=='roof':x=fft_filter(rg.standard_normal(n),150,1400)*.11*(0.6+0.4*np.sin(2*np.pi*.17*t+1))+fft_filter(rg.standard_normal(n),30,200)*.05
    elif kind=='street':x=fft_filter(rg.standard_normal(n),40,400)*.08*(0.7+0.3*np.sin(2*np.pi*.2*t))+fft_filter(rg.standard_normal(n),500,2500)*.015
    else:x=fft_filter(rg.standard_normal(n),50,600)*.04
    return x
def drip(tracks,a,b):
    k=a+rg.uniform(.5,2)
    while k<b:put(tracks,k,(sine(rg.uniform(900,1500),.25)*np.exp(-tt(.25)/.05)*.07),pan=rg.uniform(-.7,.7));k+=rg.uniform(2,5)
def pings(tracks,a,b,lo=1500,hi=2600,g=.08):
    k=a+1.0
    while k<b:put(tracks,k,sine(rg.choice(np.linspace(lo,hi,5)),1.4)*np.exp(-tt(1.4)/.4)*g,pan=rg.uniform(-.6,.6));k+=rg.uniform(2.5,4.5)
def gen(total,spec,moods):
    n=int(total*SR);W=spec.get('world') or {};root=(W.get('score') or {}).get('root',45)   # A2
    ints={};[ints.setdefault(m,[]).append((a,b)) for a,b,m in moods]
    tracks=np.zeros((2,n));layers={}
    def lay(name):
        if name not in layers:layers[name]=np.zeros((2,n))
        return layers[name]
    # ---------------- textures (each in its own layer, gated by its mood segments)
    for a,b in ints.get('creep',[]):
        L=lay('creep')
        for f,g_ in((midi(root),.55),(midi(root)*1.0595,.30),(midi(root+7)*1.0,.16)):
            x=fft_filter(saw(f,b-a+1.2),None,260)*g_*.5;put(L,a,x*np.minimum(1,np.arange(len(x))/SR/.5))
        k=a
        while k<b:put(L,k,kick(.5));put(L,k+.26,kick(.32));k+=.95
        k=a+.5
        while k<b:                                   # string cluster swell (minor second + tritone)
            for nt in(root+24,root+25,root+30):put(L,k,pad_note(midi(nt),2.4,.05),pan=(nt%3-1)*.4)
            k+=4.2
        k=a+.7
        while k<b:put(L,k,fft_filter(noise(.02),3000,9000)*env_ad(int(.02*SR),.0003,.006)*.5,pan=rg.uniform(-.7,.7));k+=rg.uniform(.9,1.8)
    for a,b in ints.get('chase',[]):
        L=lay('chase');sp=60/140/2;k=a;s=0;pent=[0,3,5,7,10]
        put(L,max(0,a-.9),fft_filter(noise(.9),400,9000)*(np.linspace(0,1,int(.9*SR))**2)*.35)        # riser into the chase
        while k<b:
            if s%8 in(0,3,4,6):put(L,k,kick(.85))
            if s%8 in(2,6):put(L,k,snare(.65))
            put(L,k,hat(.15 if s%2 else .09),pan=.25)
            note=root+12+pent[(s*3)%5]
            put(L,k,fft_filter(saw(midi(note),sp*1.7),None,1600)*env_ad(int(sp*1.7*SR),.002,.09)*.22,pan=-.2)
            if s%16==0:put(L,k,pad_note(midi(root+24),sp*8,.07))
            k+=sp;s+=1
    for a,b in ints.get('comic',[]):
        L=lay('comic');sp=60/104/2;k=a;i=0;line=[root+3,root+5,root+7,root+10,root+7,root+5,root+3,root+0];up=[root+27,root+31,root+34,root+36,root+34,root+31,root+27,root+24]
        while k<b:
            swing=sp*.14*(i%2)
            put(L,k+swing,pluck(midi(line[i%8]),.5,.46))
            if i%2:put(L,k+swing,pluck(midi(up[i%8]),.4,.16),pan=.3)
            if i%4==2:put(L,k,fft_filter(noise(.03),1500,4500)*env_ad(int(.03*SR),.0004,.008)*.18)
            k+=sp;i+=1
    for a,b in ints.get('warm',[]):
        L=lay('warm');prog=[[root+15,root+19,root+22],[root+12,root+16,root+19],[root+17,root+21,root+24],[root+14,root+19,root+23]];t=a;i=0
        while t<b+1:
            for nt in prog[i%4]:put(L,t,pad_note(midi(nt),4.6,.10),pan=(nt%3-1)*.3)
            for j,nt in enumerate(prog[i%4]*2):put(L,t+j*.5,pluck(midi(nt+12),.9,.20),pan=.15)
            t+=3.0;i+=1
        k=a
        while k<b:put(L,k,fft_filter(noise(.05),4000,8000)*env_ad(int(.05*SR),.001,.02)*.10);k+=.5
    for a,b in ints.get('idle',[]):
        L=lay('idle');t=a;mot=[root+27,root+31,root+34,root+31]
        for j,nt in enumerate(mot*8):
            if a+j*.35>b:break
            put(L,a+j*.35,sine(midi(nt),.18)*env_ad(int(.18*SR),.002,.07)*.12,pan=.2)
        put(L,a,pad_note(midi(root+12),max(2,b-a+.5),.10))
    for a,b in ints.get('sad',[]):
        L=lay('sad');t=a;j=0;arp=[root+24,root+27,root+31,root+27,root+22,root+26,root+29,root+26]
        put(L,a,pad_note(midi(root+12),b-a+1,.14))
        while t<b:put(L,t,pluck(midi(arp[j%8]),1.8,.24),pan=-.15);t+=.7;j+=1
    for nm,hi in(('comic',4600),('warm',4200),('idle',5200),('sad',4200),('chase',7000)):      # keep the score warm, not hissy
        if nm in layers:layers[nm][0]=fft_filter(layers[nm][0],None,hi);layers[nm][1]=fft_filter(layers[nm][1],None,hi)
    for nm,m in(('creep','creep'),('chase','chase'),('comic','comic'),('warm','warm'),('idle','idle'),('sad','sad')):
        if nm in layers:tracks+=layers[nm]*gate(n,total,ints.get(m,[]))*{'creep':.9,'chase':.8,'comic':.8,'warm':.85,'idle':.7,'sad':.9}[nm]
    # ---------------- stingers on a change into tension / chase
    prev=None
    for a,b,m in moods:
        if prev and m!=prev and m in('creep','chase'):put(tracks,a,A.SFX['boom']()*.45)
        prev=m
    # ---------------- room tone per location
    locs=[];last=None
    for bt in spec['beats']:
        p=bt['scene'].get('p') or {}
        if bt['scene']['n']=='stage':
            v=p.get('v');k=((W.get('locs') or {}).get(v) or {}).get('room') or v
            locs.append((bt['t'][0],bt['t'][1],k))
    by={}
    for a,b,k in locs:by.setdefault(k,[]).append((a,b))
    for k,segs in by.items():
        x=room(k,total);rt=np.stack([x,x*.96]);g=gate(n,total,segs,.4);tracks+=rt*g*.9
        if k=='stair':
            for a,b in segs:drip(tracks,a,b)
        if k in('hall','roof'):
            for a,b in segs:pings(tracks,a,b,300,700,.03)
    # ---------------- build: intensity rises across the part (cliffhanger / finale)
    tracks*=np.linspace(.82,1.12,n)[None,:]
    return tracks
