#!/usr/bin/env python3
"""cutcheck.py N : how strong is the picture change at every planned cut (mean abs diff of 2 frames across the boundary, 0-255)."""
import sys,json,subprocess,numpy as np,os
N=int(sys.argv[1]);R=os.path.dirname(os.path.abspath(__file__));spec=json.load(open(f'{R}/p{N}/spec.json'))
fr=subprocess.run(['ffmpeg','-v','error','-i',f'{R}/p{N}/final.mp4','-vf','scale=72:128,format=gray','-f','rawvideo','-'],capture_output=True).stdout
n=len(fr)//(72*128);v=np.frombuffer(fr[:n*72*128],dtype=np.uint8).reshape(n,72*128).astype(np.float32)
for i,b in enumerate(spec['beats'][1:],1):
    f=int(round(b['t'][0]*30));d=np.abs(v[min(f+2,n-1)]-v[max(f-3,0)]).mean()
    pv=spec['beats'][i-1]['scene'];cu=b['scene']
    print(f"b{i:02d}->b{i+1:02d} {b['t'][0]:5.1f}s diff={d:5.1f} {'  <-- WEAK' if d<14 else ''}  {pv['n']}/{pv['p'].get('kind','')} -> {cu['n']}/{cu['p'].get('kind','')}")
