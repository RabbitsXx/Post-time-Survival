#!/usr/bin/env python3
"""finish9.py [--frames frames] [--out final.mp4] [--preset medium] [--crf 18] [--dsf-size 1920x1080]
frames (JPEG 1920x1080 @30) + voice.wav + music.wav + sfx.wav -> final.mp4 (H.264 BT.709, AAC 256k, faststart).
Audio: voice (HP 70 Hz, compressor) ; music ducked by sidechain from the voice ; SFX on top ; 2-pass loudnorm -14 LUFS ; oversampled true-peak limiter ; one AAC generation."""
import sys,os,json,re,subprocess,threading,tempfile
R=os.path.dirname(os.path.abspath(__file__));FPS=30
LIMIT="aresample=176400,alimiter=limit=0.78:attack=3:release=40:level=false,aresample=48000"
def ff(a,capture=True):
    r=subprocess.run(['ffmpeg','-hide_banner','-y']+a,capture_output=True,text=True)
    if r.returncode:sys.exit('ffmpeg failed: '+r.stderr[-1500:])
    return r.stderr
def audio_chain(P,dur,out_m4a,tmp,err):
    try:
        graph=("[0:a]highpass=f=70,acompressor=threshold=0.09:ratio=3:attack=5:release=90:makeup=2.2,aformat=sample_rates=44100:channel_layouts=stereo,asplit=2[v1][v2];"
               "[1:a]volume=0.95,aformat=sample_rates=44100:channel_layouts=stereo[mus];"
               "[mus][v1]sidechaincompress=threshold=0.028:ratio=9:attack=12:release=380[duck];"
               "[2:a]volume=0.9,aformat=sample_rates=44100:channel_layouts=stereo[sx];"
               "[duck][sx][v2]amix=inputs=3:normalize=0:duration=longest[mix]")
        mixed=f'{tmp}/mixed.wav'
        ff(['-i',f'{P}/voice.wav','-i',f'{P}/music.wav','-i',f'{P}/sfx.wav','-filter_complex',graph,'-map','[mix]','-t',str(dur),'-ar','44100','-ac','2',mixed])
        log=ff(['-i',mixed,'-af','loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json','-f','null','-'])
        m=json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}',log,re.S).group(0))
        af=("loudnorm=I=-14:TP=-1.5:LRA=9:measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:measured_thresh={input_thresh}:offset={target_offset}:linear=true").format(**m)
        ff(['-i',mixed,'-af',af+','+LIMIT,'-c:a','aac','-b:a','256k','-ar','48000','-t',str(dur),out_m4a])
    except BaseException as e:err.append(e)
def main():
    a=sys.argv[1:];g=lambda k,d:a[a.index(k)+1] if k in a else d
    P=f'{R}/'+g('--p','p9/part1');frames=f'{R}/'+g('--frames','frames9');out=g('--out',f'{R}/final9.mp4');preset=g('--preset','medium');crf=g('--crf','18')
    spec=json.load(open(f'{P}/spec.json'));dur=spec['duration'];nfr=int(round(dur*FPS))
    with tempfile.TemporaryDirectory() as tmp:
        m4a=f'{tmp}/a.m4a';err=[];th=threading.Thread(target=audio_chain,args=(P,dur,m4a,tmp,err));th.start()
        vid=f'{tmp}/v.mp4'
        vf='scale=720:1280:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p'
        r=subprocess.run(['ffmpeg','-hide_banner','-y','-framerate',str(FPS),'-i',f'{frames}/%05d.jpg','-frames:v',str(nfr),'-vf',vf,'-c:v','libx264','-preset',preset,'-crf',crf,'-g','60','-bf','2',
                          '-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-an',vid],capture_output=True,text=True)
        if r.returncode:sys.exit('video encode failed: '+r.stderr[-1500:])
        th.join()
        if err:sys.exit(f'audio chain failed: {err[0]}')
        ff(['-i',vid,'-i',m4a,'-map','0:v','-map','1:a','-c','copy','-t',str(dur),'-movflags','+faststart',out])
    print('wrote',out,round(os.path.getsize(out)/1e6,1),'MB')
if __name__=='__main__':main()
