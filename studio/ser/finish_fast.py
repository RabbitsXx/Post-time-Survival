#!/usr/bin/env python3
"""finish_fast.py - the same last-mile recipe as finish_clip.py (imports it; same captions, gradient, end card, audio bed, 2-pass loudnorm,
x264 medium crf 20, AAC), with the waiting removed:
  * reads the MJPEG master directly (no intermediate x264 generation: one lossy generation less, ~28 s less)
  * the audio chain (bed synth + mix + 2-pass loudnorm + TRUE-PEAK limiter + AAC) runs in a thread while the video composes/encodes
  * the true-peak limiter is part of the audio chain (oversampled 4x), so there is a single AAC generation and no separate limit step
  * the caption gradient is done in a preallocated float32 buffer (bit-identical result, half the time); one frame copy less in decode
Usage: finish_fast.py --spec spec.json --video <frames dir or master video> --voice voice.wav --music music.wav --font f.ttf --out final.mp4"""
import sys,os,json,argparse,threading,tempfile,subprocess
import numpy as np
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..')
sys.path.insert(0,os.environ.get('STORY_CHAIN_SCRIPTS',S+'/zip2/story-chain-short/scripts'))
import finish_clip as fc
W,H,FPS,SR=fc.W,fc.H,fc.FPS,fc.SR
LIMIT="aresample=176400,alimiter=limit=0.84:attack=3:release=40:level=false,aresample=44100"

def decode_fast(video,nframes):
    src=["-framerate",str(FPS),"-i",os.path.join(video,"%05d.jpg")] if os.path.isdir(video) else ["-i",video]   # a frames/ folder is read directly: no master file at all
    cmd=["ffmpeg","-v","error"]+src+["-vf",f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS}","-f","rawvideo","-pix_fmt","rgb24","-"]
    p=subprocess.Popen(cmd,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL);size=W*H*3;last=None;n=0
    try:
        while n<nframes:
            buf=p.stdout.read(size)
            if len(buf)<size:break
            last=buf;n+=1;yield np.frombuffer(buf,np.uint8).reshape(H,W,3).copy()
    finally:
        p.stdout.close();p.terminate();p.wait()
    while n<nframes:
        n+=1;yield (np.frombuffer(last,np.uint8).reshape(H,W,3).copy() if last is not None else np.zeros((H,W,3),np.uint8))

def compose_fast(spec,frames,font_path,gradient,endcard_on):
    """identical to finish_clip.compose; only the gradient multiply is done with an output buffer"""
    caps=sorted(((c["t"][0],c["t"][1],c["text"]) for b in spec["beats"] for c in b.get("captions",[])))
    imgs=[fc.render_caption(t,font_path) for _,_,t in caps]
    ec_img,ec_t0=None,None;last=spec["beats"][-1]
    if endcard_on and last.get("role")=="endcard" and spec.get("end_card"):
        ec_img,ec_t0=fc.render_endcard(spec["end_card"],font_path),last["t"][0];ec_arr=np.asarray(ec_img.convert("RGB"))
    mult=np.ones((H,1,1),np.float32);r0=int(H*0.50);mult[r0:,0,0]=np.linspace(1.0,1.0-gradient,H-r0);mr=mult[r0:]
    buf=np.empty((H-r0,W,3),np.float32);cy=int(fc.CAP_Y*H)
    for i,fr in enumerate(frames):
        t=i/FPS
        if ec_img is not None and t>=ec_t0:
            a=min(1.0,(t-ec_t0)/0.25);yield i,(fr.astype(np.float32)*(1-a)+ec_arr.astype(np.float32)*a).astype(np.uint8);continue
        if gradient>0:
            np.multiply(fr[r0:],mr,out=buf,dtype=np.float32);fr[r0:]=buf.astype(np.uint8)
        for k,(a0,a1,_) in enumerate(caps):
            if a0<=t<a1:
                p=(t-a0)/0.20;alpha=min(1.0,(t-a0)/0.08)
                if p>=1.0:fc.blend(fr,imgs[k],W/2,cy,1.0,1.0)
                else:fc.blend(fr,imgs[k],W/2,cy,0.80+0.20*fc.ease_out_back(p),alpha)
                break
        yield i,fr

def audio_chain(spec,voice,music,dur,out_m4a,tmp,err):
    try:
        bed=os.path.join(tmp,"bed.wav");fc.write_wav(bed,fc.synth(spec,True))
        fin=os.path.join(tmp,"final_audio.wav");fc.master_audio(bed,voice,music,dur,fin,tmp)
        fc.ff(["-i",fin,"-af",LIMIT,"-c:a","aac","-b:a","256k","-t",str(dur),out_m4a])
    except BaseException as e:err.append(e)

def main():
    ap=argparse.ArgumentParser();ap.add_argument("--spec",required=True);ap.add_argument("--out",required=True);ap.add_argument("--video");ap.add_argument("--voice");ap.add_argument("--music")
    ap.add_argument("--font");ap.add_argument("--gradient",type=float,default=0.28);ap.add_argument("--crf",type=int,default=20);ap.add_argument("--preset",default="medium")
    a=ap.parse_args();spec=json.load(open(a.spec,encoding="utf-8"));dur=spec["duration"];nframes=int(round(dur*FPS))
    alltext=" ".join(c["text"] for b in spec["beats"] for c in b.get("captions",[]))+json.dumps(spec.get("end_card",{}),ensure_ascii=False)
    font=fc.find_font(a.font,alltext)
    with tempfile.TemporaryDirectory() as tmp:
        m4a=os.path.join(tmp,"audio.m4a");vid=os.path.join(tmp,"video.mp4");err=[]
        th=threading.Thread(target=audio_chain,args=(spec,a.voice,a.music,dur,m4a,tmp,err));th.start()
        enc=subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-c:v","libx264","-preset",a.preset,"-crf",str(a.crf),"-pix_fmt","yuv420p","-an","-t",f"{dur}",vid],stdin=subprocess.PIPE)
        for i,fr in compose_fast(spec,decode_fast(a.video,nframes),font,a.gradient,True):enc.stdin.write(fr.tobytes())
        enc.stdin.close()
        if enc.wait():sys.exit("video encoder failed")
        th.join()
        if err:sys.exit(f"audio chain failed: {err[0]}")
        fc.ff(["-i",vid,"-i",m4a,"-map","0:v","-map","1:a","-c","copy","-t",f"{dur}","-movflags","+faststart",a.out])
    print(f"wrote {a.out}")
if __name__=="__main__":main()
