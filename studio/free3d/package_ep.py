#!/usr/bin/env python3
"""package_ep.py rc2|rc3 : cover (reference proportions) + first-4-frames embed + EN/TH srt + meta -> releases/remaincalm/<id>/ ; does NOT post"""
import sys,os,json,subprocess
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import package_rc as P
from package_rc import R,REPO,Z
from PIL import Image
EPS={
 'rc2':dict(n=2,topic='BOX BREATHING',l1='BREATHE',l2='IN A BOX',pill='IN 4 · HOLD 4 · OUT 4',
   cam=[[11.0,1.35,1.5],[8.2,1.2,Z]],fov=40,chars=[dict(who='z2',pos=[7.0,Z],expr='calm',face=[8.0,Z]),dict(who='rosa',pos=[8.2,Z],expr='worried',prop='baby',face=[12.0,1.5])],
   title='REMAIN CALM Part 2: Breathe In A Box | The Dead Smell Fear',
   desc="What if one slow breath could make you invisible to the dead?\n\nA baby is crying, the dead are closing in, and the only weapon at FRESHWAY 24H is box breathing: in for 4, hold for 4, out for 4, hold for 4.\n\n🧠 Real tip: box breathing is a slow-breathing pattern used to stay calm under stress. Try it for a minute next time you are nervous.\n\nPart 2 of 3 · REMAIN CALM\nWould you stay calm? Tell me below."),
 'rc3':dict(n=3,topic='THE LAST CUSTOMER',l1='THE LAST',l2='CUSTOMER',pill='ONE EXIT · 12 SHOPPERS',
   cam=[[.25,1.35,10.6],[.25,1.2,14.4]],fov=40,chars=[dict(who='mimi',pos=[-.3,14.4],expr='scared',face=[.8,14.4]),dict(who='gus',pos=[.8,14.4],expr='calm',face=[-.3,14.4])],
   title='REMAIN CALM Part 3: The Last Customer | Who Stays Calm?',
   desc="The doors are right there. So is everything else.\n\nMimi's smile finally cracks, and the guard who was the most afraid has to be the calm one.\n\n🧠 Real tip: the 5-4-3-2-1 grounding trick (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste) can help when panic hits.\n\nPart 3 of 3 · REMAIN CALM · the end\nWhat would you do? Tell me below."),
}
def main():
    k=sys.argv[1];E=EPS[k];n=E['n']
    ep=json.load(open(R+f'/out/{k}.spec.json'));th=json.load(open(R+f'/thai_{k}.json'));frames=R+f'/out/{k}_frames'
    od=f'{REPO}/releases/remaincalm/{k}';os.makedirs(od,exist_ok=True)
    sp=dict(series='REMAIN CALM',title='COVER',part=n,of=3,dur=2,shots=[dict(t0=0,t1=2,cam=[E['cam'][0],E['cam'][1],E['cam'][0],E['cam'][1]],fov=E['fov'],chars=E['chars'],lines=[],place='',grade='calm',noUI=True)])
    p=R+f'/spec_{k}_cover.json';json.dump(sp,open(p,'w'));d=R+f'/out/{k}_cover';os.makedirs(d,exist_ok=True)
    subprocess.check_call(['node',R+'/render_store3.js',p,d,'10','11','1080','1920','&2d'],cwd=R);base=R+f'/out/{k}_cover_base.jpg';os.replace(d+'/00010.jpg',base)
    img=P.cover_ref(base,f'PART {n}',E['l1'],E['l2'],E['pill']);img.save(f'{od}/cover_9x16.jpg',quality=92);P.preview(img,f'{od}/cover_preview.jpg')
    if '--cover-only' in sys.argv:return
    for i in range(4):img.save(f'{frames}/{i:05d}.jpg',quality=93)
    open(f'{od}/captions_en.srt','w').write(P.srt(ep));open(f'{od}/captions_th.srt','w').write(P.srt(ep,th))
    json.dump(dict(id=k,title=E['title'],description=E['desc'],status='built'),open(f'{od}/meta.json','w'),indent=1,ensure_ascii=False)
    wav=R+f'/out/{k}.wav'
    m=subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
    j=json.loads(m[m.rindex('{'):m.rindex('}')+1])
    af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',frames+'/%05d.jpg','-i',wav,'-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','192k','-af',af,'-movflags','+faststart','-shortest',f'{od}/{k}_part{n}.mp4'])
    print('packaged',od)
if __name__=='__main__':main()
