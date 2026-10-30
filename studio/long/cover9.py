#!/usr/bin/env python3
"""cover9.py N [N..] : cover for THE LAST BUS part N (9:16 + 16:9) from a clean engine still; embeds the 9:16 cover as the first 4 frames (IG/TikTok take the cover from the first frame).
 python3 cover9.py --bases      renders only the clean base stills (for choosing)  |  python3 cover9.py 1 2 3 : full covers + embed"""
import sys,os,json,subprocess
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,S+'/ser')
import cover
import clipreg as CR
from PIL import Image
# (beat, fraction, main, box, accent line)
CFG={1:(0,.6,"ONE OF THEM|IS BITTEN","12 STRANGERS · 10 HOURS",1),
 2:(0,.9,"DON'T MAKE|A SOUND","800 METERS OF ZOMBIES",1),
 3:(7,.5,"SIX MILES|OF FUEL","AND ONE GIANT CHICKEN",1),
 4:(6,.5,"IS THE CHICKEN|BITTEN?","OR IS THAT KETCHUP?",1),
 5:(0,.6,"SLEEVES UP.|NOW.","SOMEONE IS LYING",1),
 6:(0,.6,"SWEATING.|SHAKING.","ZOMBIE... OR NOT?",1),
 7:(8,.5,"THE BRIDGE|IS UP","ONE BRAVE (SCARED) MAN",1),
 8:(0,.7,"TOLL:|EVERYTHING","GRANDMA HAS A PIE",1),
 9:(0,.5,"TAKE OFF|THE GLOVE","THE TRUTH",1),
 10:(0,.6,"THE LAST|MILE","FINALE · PIER 8",1)}
def base(n,out_dir):
    """clean engine still: THE LAST BUS parts use the dedicated cover shots (p9/covers), autopilot clips use a beat of their own spec (COVER=dict(beat,frac,main,box))"""
    bi,fr,*_=CR.cover_cfg(n)
    if CR.legacy(n):B=json.load(open(f'{R}/p9/covers/spec.json'))['beats'];b=B[int(n)-1];sn='covers/spec'
    else:B=json.load(open(f'{R}/p9/{n}/spec.json'))['beats'];b=B[bi];sn=f'{n}/spec'
    f=int(round((b['t'][0]+(b['t'][1]-b['t'][0])*fr)*30))
    env=dict(os.environ,NODE_PATH=subprocess.check_output(['npm','root','-g'],text=True).strip(),CLEAN='1')
    subprocess.check_call(['node','snapbeats9.js',sn,out_dir]+[str(f)],cwd=R,env=env)
    os.replace(f'{out_dir}/{f}.png',f'{out_dir}/base_{n}.png');return f'{out_dir}/base_{n}.png'
if __name__=='__main__':
    a=sys.argv[1:];os.makedirs(R+'/covers9',exist_ok=True)
    if a and a[0]=='--bases':
        for n in range(1,11):print(n,base(n,R+'/covers9/base'))
        sys.exit(0)
    for n in [int(x) if x.isdigit() else x for x in a]:
        bp=base(n,R+'/covers9/base');_,_,main,box,acc=CR.cover_cfg(n);si=CR.series(n)
        out9=f'{R}/'+CR.cover(n,'9x16');out169=f'{R}/'+CR.cover(n,'16x9')
        cover.make(bp,out9,'916',f"PART {si['part']}",main,box,acc,tag=si['name'],top=(not CR.legacy(n) and hasattr(CR.module(n),'WORLD')))
        cover.make169_from916(bp,out169,f"PART {si['part']}",main,box,acc,tag=si['name'],top=(not CR.legacy(n) and hasattr(CR.module(n),'WORLD')))
        print('cover',n,out9)
