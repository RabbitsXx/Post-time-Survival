#!/usr/bin/env python3
"""3D-set + 2D-characters episode builder. python3 build3d.py EP.py [--w 1080] [--h 1920] [--stills t1,t2]"""
import sys,os,json,subprocess,time,importlib.util
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R+'/../free')
import numpy as np
from build import tts,rd,mix,FPS,NAMES,NAMECOL,VOICES
OUT=R+'/out';os.makedirs(OUT,exist_ok=True)
def S3(env,cam,chars,lines=(),place='',min=3.0,fx=None,sfx=None,fov=38,zombies=True,pad=.35):return dict(kind='3d',env=env,cam=cam,chars=chars,lines=list(lines),place=place,min=min,fx=fx or [],sfx=sfx or [],fov=fov,zombies=zombies,pad=pad)
def C(card,lines=(),min=3.0,sfx=None,pad=.35):return dict(kind='card',card=card,lines=list(lines),min=min,sfx=sfx or [],pad=pad)
def ch(who,x,z,expr='calm',**k):return dict(who=who,pos=[x,z],expr=expr,**k)
def say(who,en,th=''):return (who,en,th)
def build_spec(ep):
    t=0;shots=[];mouth={};lines_all=[];sfx_all=[]
    for sh in ep['shots']:
        wavs=[]
        for ln in sh['lines']:
            p=tts(ln[1],ln[0]);x,sr=rd(p);wavs.append((ln,p,len(x)/sr))
        dur=sum(d for _,_,d in wavs)+.3*max(0,len(wavs)-1)+sh['pad']+(.25 if wavs else 0);dur=max(dur,sh['min']*ep.get('minscale',1));t0=t;t1=t+dur;cur=t0+.25;LN=[]
        for ln,p,d in wavs:
            LN.append(dict(t0=cur,t1=cur+d,en=ln[1],name=NAMES[ln[0]],c=NAMECOL[ln[0]],who=ln[0],wav=p));cur+=d+.3
        sfx_all+=[[t0+s[0],s[1]] for s in sh['sfx']]
        o={k:v for k,v in sh.items() if k not in('lines','sfx','min','pad')};o.update(t0=t0,t1=t1,lines=[{k:v for k,v in L.items() if k!='wav'} for L in LN]);shots.append(o);lines_all+=LN;t=t1
    return dict(series=ep['series'],title=ep['title'],part=ep['part'],of=ep['of'],shots=shots,dur=t+.4),lines_all,sfx_all
def render(spec,fd,w,h,workers=4):
    os.makedirs(fd,exist_ok=True);json.dump(spec,open(R+'/spec_%s.json'%os.path.basename(fd),'w'))
    sp=R+'/spec_%s.json'%os.path.basename(fd);n=int(round(spec['dur']*FPS));k=(n+workers-1)//workers;ps=[]
    for i in range(workers):
        a,b=i*k,min(n,(i+1)*k)
        if a<b:ps.append(subprocess.Popen(['node',R+'/render_well.js',sp,fd,str(a),str(b),str(w),str(h)],cwd=R))
    for p in ps:
        if p.wait():raise SystemExit('render failed')
    return n
def main():
    a=sys.argv[1:];sp=importlib.util.spec_from_file_location('ep',a[0]);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);ep=m.EP
    w=int(a[a.index('--w')+1]) if '--w' in a else 1080;h=int(a[a.index('--h')+1]) if '--h' in a else 1920
    spec,lines,sfx=build_spec(ep);name=ep['id'];json.dump(spec,open(OUT+f'/{name}.spec.json','w'))
    print(f'{name}: {spec["dur"]:.1f}s, {len(spec["shots"])} shots, {sum(len(L["en"].split()) for L in lines)} words')
    if '--stills' in a:
        ts=[float(x) for x in a[a.index('--stills')+1].split(',')];fd=OUT+f'/{name}_stills';os.makedirs(fd,exist_ok=True);p=R+f'/spec_{name}_s.json';json.dump(spec,open(p,'w'))
        for t in ts:subprocess.check_call(['node',R+'/render_well.js',p,fd,str(int(t*FPS)),str(int(t*FPS)+1),str(w),str(h)],cwd=R)
        print('stills',fd);return
    fd=OUT+f'/{name}_frames'
    if os.path.isdir(fd):
        for f in os.listdir(fd):os.remove(fd+'/'+f)
    t0=time.time();n=render(spec,fd,w,h);print(f'rendered {n} frames in {time.time()-t0:.0f}s')
    mix(spec,lines,sfx,OUT+f'/{name}.wav')
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',fd+'/%05d.jpg','-i',OUT+f'/{name}.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest','-movflags','+faststart',OUT+f'/{name}.mp4'])
    print('DONE',OUT+f'/{name}.mp4')
if __name__=='__main__':main()
