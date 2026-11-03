import numpy as np,glob,sys
from PIL import Image
r=np.stack([np.asarray(Image.open(f).convert('L'),dtype=float) for f in sorted(glob.glob(f'/tmp/fl_{sys.argv[1]}/*.png'))])
for name,(y0,y1,x0,x1) in(('far-left',(0,430,0,90)),('top',(0,120,0,450))):
    seg=r[:,y0:y1,x0:x1];d=np.diff(seg,axis=0);s=np.sign(d)*(np.abs(d)>6);alt=((s[1:]*s[:-1])<0)
    print(sys.argv[1],name,'flip>=3x %',round((alt.sum(0)>=3).mean()*100,2),'mean|d|',round(np.abs(d).mean(),2))
