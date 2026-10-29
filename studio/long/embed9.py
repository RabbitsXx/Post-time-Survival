#!/usr/bin/env python3
"""embed9.py N : the 9:16 cover becomes the first 4 frames of frames9_pN (IG / TikTok take the cover from the first frame: thumbnailOffset 50 ms), then finish9 re-encodes."""
import sys,os,subprocess
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__))
for n in [int(x) for x in sys.argv[1:]]:
    cv=f'{R}/covers9/cover_{n}_9x16.png';fr=f'{R}/frames9_p{n}'
    im=Image.open(cv).convert('RGB').resize((720,1280),Image.LANCZOS)
    for f in range(4):
        p=f'{fr}/{f:05d}.jpg'
        if os.path.lexists(p):os.unlink(p)          # frames are hard links into the render cache: replace, never overwrite in place
        im.save(p,quality=93)
    subprocess.check_call([sys.executable,f'{R}/finish9.py','--p',f'p9/part{n}','--frames',f'frames9_p{n}','--out',f'{R}/final9_p{n}.mp4'])
