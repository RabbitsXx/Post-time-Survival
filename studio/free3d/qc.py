import json,sys
from PIL import Image
S='/tmp/claude-0/-home-user-Post-time-Survival/9ae1e65c-5564-546a-9003-a2806c6e74d8/scratchpad/'
ks=sys.argv[1:]
rows=[]
for k in ks:
    sp=json.load(open(f'out/{k}.spec.json'));ims=[]
    for s in sp['shots']:
        for f in (.15,.6):
            i=int((s['t0']+(s['t1']-s['t0'])*f)*30);ims.append(Image.open(f'out/{k}_frames/{i:05d}.jpg').resize((162,288)))
    rows.append(ims)
W=max(len(r) for r in rows)
sh=Image.new('RGB',(W*164,len(rows)*292),(20,20,20))
for y,r in enumerate(rows):
    for x,im in enumerate(r):sh.paste(im,(x*164,y*292))
sh.save(S+'qc_'+'_'.join(ks)+'.jpg',quality=85)
