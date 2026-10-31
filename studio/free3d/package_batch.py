#!/usr/bin/env python3
"""package_batch.py [ids] : cover (reference proportions, no-UI render of the key shot) + embed as first 4 frames + EN srt + meta + loudnorm mux -> releases/remaincalm/batch1/<id>/ ; does NOT post"""
import sys,os,json,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import package_rc as P
from package_rc import R,REPO
# id: (key shot 1-based, line1, line2, pill)
CV={'g1':(3,'UNEXPECTED','ITEM','IN THE BAGGING AREA'),'g2':(1,'ELEVEN','ITEMS','EXPRESS LANE'),'g3':(2,'TIME TO','BREATHE','HEART RATE 160'),'g4':(2,'BEST','EMPLOYEE','NEVER PANICS'),
 'g5':(3,'FIRE','DRILL','SINGLE FILE PLEASE'),'g6':(1,'ASK FOR','THE MANAGER','SIX YEARS OF SERVICE'),'g7':(2,'IS THIS','A GAME?','JUICE BOX?'),'i1':(2,"DON'T",'RUN','3 AM SUPERMARKET'),
 'i2':(2,'CRYING','BABY','BREATHE INSTEAD'),'i3':(1,"DON'T LOOK",'BACK','THE LINE BEHIND YOU')}
NUM={k:i+1 for i,k in enumerate(['g1','g2','g3','g4','g5','g6','g7','i1','i2','i3'])}
def one(k):
    ep=json.load(open(R+f'/out/{k}.spec.json'));frames=R+f'/out/{k}_frames';od=f'{REPO}/releases/remaincalm/batch1/{k}';os.makedirs(od,exist_ok=True)
    si,l1,l2,pill=CV[k];sh=dict(ep['shots'][si-1]);t=(sh['t0']+sh['t1'])/2
    sh.update(noUI=True,lines=[]);sp=dict(series=ep['series'],title='COVER',part=0,of=0,dur=2,shots=[dict(sh,t0=0,t1=2)])
    # camera keyframes already relative; keep chars as authored (positions at shot start)
    p=R+f'/spec_{k}_cover.json';json.dump(sp,open(p,'w'));d=R+f'/out/{k}_cover';os.makedirs(d,exist_ok=True)
    subprocess.check_call(['node',R+'/render_store3.js',p,d,'20','21','1080','1920','&2d'],cwd=R);base=R+f'/out/{k}_cover_base.jpg';os.replace(d+'/00020.jpg',base)
    img=P.cover_ref(base,f'#{NUM[k]}',l1,l2,pill);img.save(f'{od}/cover_9x16.jpg',quality=92);P.preview(img,f'{od}/cover_preview.jpg')
    for i in range(4):img.save(f'{frames}/{i:05d}.jpg',quality=93)
    open(f'{od}/captions_en.srt','w').write(P.srt(ep))
    wav=R+f'/out/{k}.wav'
    m=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
    j=json.loads(m[m.rindex('{'):m.rindex('}')+1])
    af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',frames+'/%05d.jpg','-i',wav,'-c:v','libx264','-preset','medium','-crf','21','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','160k','-af',af,'-movflags','+faststart','-shortest',f'{od}/{k}.mp4'])
    print('packaged',k)
if __name__=='__main__':
    for k in (sys.argv[1:] or list(CV)):one(k)
