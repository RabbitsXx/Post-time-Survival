"""pitch.py : robust fundamental-frequency estimate for speech (used by build16 to cast voices at a target pitch, and by departments/audit_sound.py to check them).
Autocorrelation on 40 ms windows (hop 10 ms), energy gate, clarity >= 0.55, parabolic refinement, median over every voiced frame."""
import numpy as np
def f0_of(x,sr,lo=65,hi=420):
    x=np.asarray(x,dtype=np.float32)
    if len(x)<sr//4:return None
    w=int(sr*.04);h=int(sr*.01);gate=0.12*np.sqrt(np.mean(x**2));out=[];win=np.hanning(w)
    kmin,kmax=int(sr/hi),min(w-2,int(sr/lo))
    for i in range(0,len(x)-w,h):
        s=x[i:i+w]
        if np.sqrt(np.mean(s**2))<max(gate,0.01):continue
        s=(s-s.mean())*win;n=1<<(2*w-1).bit_length();F=np.fft.rfft(s,n);ac=np.fft.irfft(F*np.conj(F))[:w];
        if ac[0]<=0:continue
        seg=ac[kmin:kmax];k=int(np.argmax(seg))+kmin
        if ac[k]/ac[0]<.55 or k<=kmin or k>=kmax-1:continue
        a,b,c=ac[k-1],ac[k],ac[k+1];d=a-2*b+c;sh=0.5*(a-c)/d if d else 0
        out.append(sr/(k+sh))
    return float(np.median(out)) if len(out)>=8 else None
