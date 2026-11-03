#!/usr/bin/env python3
"""CHARACTER DESIGNER: model sheets from the world data.  model_sheet.py worlds/<id>.json  ->  releases/<arc>/bible/model_sheet_<name>.png  (+ one contact sheet of the whole cast)
Each sheet: turnaround (front / side / back at the true on-screen scale) and six expressions (calm, smile, angry, scared, shock, worried) on a neutral grey set.
These are generated from the same data the episodes use, so a character can never drift between episodes; the sheets are also what the art audit and the human reviewer compare against."""
import sys,os,json,subprocess,shutil
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');REPO=os.path.abspath(R+'/../..')
from PIL import Image,ImageDraw,ImageFont
EXPR=['calm','smile','angry','scared','shock','worried']
def main(path):
    W=json.load(open(path if os.path.isabs(path) else os.path.join(LONG,path)));wid=W['id']
    W['locs']['sheet']=dict(kind='in',wall='#cdd1d8',floor='#aeb3bb',items=[],light=False)
    tmp=f'/tmp/{wid}_sheet.json';json.dump(W,open(tmp,'w'));arc='_sheet_'+wid;ad=f'{LONG}/arcs/{arc}';os.makedirs(ad,exist_ok=True)
    cast=list(W['cast']);lines=["from worldlib import *",f"W=World({tmp!r});P=W.part(1,'SHEET',of=1);BEATS=P.BEATS;TITLE=P.TITLE;TH=[]"]
    for who in cast:
        lines.append(f"P.B([],W.set('sheet',[W.person({who!r},'calm',520,view='front'),W.person({who!r},'calm',640,view='side'),W.person({who!r},'calm',760,view='back')],x=640,y=510,z=1.35),dur=1.0)")
        for e in EXPR:lines.append(f"P.B([],W.cuf({who!r},{e!r},v='sheet',z=3.6),dur=1.0)")
    lines+=["META=dict(tags='x');COVER=dict(beat=0,frac=.5,main='A|B',box='x')","VOICES,FILT,SPEAKERS,NAMES_EN,NAMES_TH,ALL_WORDS,WORLD,NEW=W.exports()"]
    open(f'{ad}/{arc}_01.py','w').write('\n'.join(lines)+'\n')
    env=dict(os.environ)
    subprocess.check_call([sys.executable,'build16.py',f'arcs/{arc}/{arc}_01',f'p9/{arc}_01'],cwd=LONG,env=env,stdout=subprocess.DEVNULL)
    spec=json.load(open(f'{LONG}/p9/{arc}_01/spec.json'))['beats'];fr=[int((b['t'][0]+.5*(b['t'][1]-b['t'][0]))*30) for b in spec]
    env['NODE_PATH']=subprocess.check_output(['npm','root','-g'],text=True).strip();env['CLEAN']='1'
    out=f'{LONG}/shots9/{arc}';shutil.rmtree(out,ignore_errors=True)
    subprocess.check_call(['node','snapbeats9.js',f'{arc}_01/spec',out]+[str(f) for f in fr],cwd=LONG,env=env)
    dest=f'{REPO}/releases/{wid}/bible';os.makedirs(dest,exist_ok=True);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28);sheets=[]
    for k,who in enumerate(cast):
        base=k*7;fs=[Image.open(f'{out}/{fr[base+j]}.png').convert('RGB') for j in range(7)]
        w,h=fs[0].size;TW=1260
        turn=fs[0].crop((0,int(h*.22),w,int(h*.86)));turn=turn.resize((TW,int(turn.height*TW/w)))
        cw=TW//6;ex=[]
        for im in fs[1:]:
            c=im.crop((int(w*.18),int(h*.20),int(w*.82),int(h*.52)));ex.append(c.resize((cw,int(c.height*cw/c.width))))
        S=Image.new('RGB',(TW,60+turn.height+ex[0].height+10),(245,245,245));d=ImageDraw.Draw(S)
        d.text((14,10),f"{W['cast'][who]['name'].upper()}  ·  {W['series']}  ·  model sheet  ·  front / side / back + 6 expressions",fill=(20,20,20),font=font)
        S.paste(turn,(0,56))
        for i,im in enumerate(ex):S.paste(im,(i*cw,56+turn.height+4))
        p=f'{dest}/model_sheet_{who}.png';S.save(p);sheets.append(S);print('wrote',p)
    shutil.rmtree(ad,ignore_errors=True);shutil.rmtree(f'{LONG}/p9/{arc}_01',ignore_errors=True)
if __name__=='__main__':main(sys.argv[1])
