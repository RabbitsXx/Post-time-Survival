#!/usr/bin/env python3
"""embed9.py N|ID : the 9:16 cover becomes the first 4 frames of frames9_pN (IG / TikTok take the cover from the first frame: thumbnailOffset 50 ms), then finish9 re-encodes."""
import sys,os,subprocess
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
import clipreg as CR
for n in [int(x) if x.isdigit() else x for x in sys.argv[1:]]:
    cv=f'{R}/'+CR.cover(n,'9x16');fr=f'{R}/'+CR.frames(n)
    im=Image.open(cv).convert('RGB').resize((720,1280),Image.LANCZOS)
    for f in range(4):
        p=f'{fr}/{f:05d}.jpg'
        if os.path.lexists(p):os.unlink(p)          # frames are hard links into the render cache: replace, never overwrite in place
        im.save(p,quality=93)
    subprocess.check_call([sys.executable,f'{R}/finish9.py','--p',f'p9/{CR.pid(n)}','--frames',CR.frames(n),'--out',f'{R}/'+CR.final(n)])
