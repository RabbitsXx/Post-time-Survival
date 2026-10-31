#!/usr/bin/env python3
"""rerender.py EP_FILE SHOT_IDX[,IDX..] : re-render only some shots of a built episode (overlay/card fixes), then re-encode the mp4"""
import sys,os,json,subprocess,importlib.util
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import build3d as B
a=sys.argv[1:];sp=importlib.util.spec_from_file_location('ep',a[0]);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);ep=m.EP;idx=[int(x) for x in a[1].split(',')]
spec,lines,sfx=B.build_spec(ep);name=ep['id'];json.dump(spec,open(B.OUT+f'/{name}.spec.json','w'))
fd=B.OUT+f'/{name}_frames';p=R+f'/spec_{name}_r.json';json.dump(spec,open(p,'w'))
ps=[]
for i in idx:
    sh=spec['shots'][i];f0=int(round(sh['t0']*30));f1=min(int(round(sh['t1']*30)),int(round(spec['dur']*30)));k=max(1,(f1-f0+3)//4)
    for w in range(4):
        x0,x1=f0+w*k,min(f1,f0+(w+1)*k)
        if x0<x1:ps.append(subprocess.Popen(['node',R+'/render_well.js',p,fd,str(x0),str(x1),'1080','1920'],cwd=R))
for q in ps:
    if q.wait():raise SystemExit('render failed')
subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',fd+'/%05d.jpg','-i',B.OUT+f'/{name}.wav','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest','-movflags','+faststart',B.OUT+f'/{name}.mp4'])
print('re-rendered',name,idx)
