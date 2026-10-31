#!/usr/bin/env python3
"""LEGAL / BRAND-SAFETY audit.  audit_brand.py CLIP_ID.  A channel that posts every hour cannot carry a trademark, a real person or an unsafe claim.
FAIL on: a real brand / franchise / celebrity name in dialogue, captions, titles, descriptions, or in the text of any prop / sign that appears in the clip;
         real phone numbers / emails / URLs on screen;  survival advice that is dangerous (drink seawater, run engines indoors, ...)."""
import sys,os,json,re
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
BRANDS="hot pocket,coca cola,coca-cola,pepsi,nike,adidas,mcdonald,burger king,kfc,starbucks,google,apple,iphone,android,samsung,uber,netflix,disney,marvel,pixar,nintendo,pokemon,minecraft,fortnite,walking dead,resident evil,call of duty,tiktok,instagram,facebook,youtube,amazon,walmart,ikea,lego,spiderman,batman,superman,star wars,harry potter,taylor swift,elon musk,trump,biden".split(',')
UNSAFE=['drink seawater','drink sea water','drink urine','run the engine indoors','light a fire inside','bleach','eat unknown mushrooms','drink from the river without']
def audit(cid):
    issues=[];score=100;d=f'{LONG}/p9/{CR.pid(cid)}';spec=json.load(open(d+'/spec.json'));m=CR.meta(cid)
    text=' '.join([' '.join(c['text'] for c in json.load(open(d+'/cues_en.json'))),m['yt_title'],m['yt_desc'],m['tt'],m['ig']]).lower()
    # text drawn by the props / items that appear in the clip
    used=set()
    for b in spec['beats']:
        p=b['scene'].get('p') or {}
        for a in p.get('acts',[]):
            if a.get('k')=='prop':used.add(a.get('t'))
        for it in p.get('add',[]) or []:used.add(it.get('t'))
    srcs=''
    for f in sorted(os.listdir(LONG)):
        if f.endswith('.js'):srcs+=open(f'{LONG}/{f}').read()+'\n'
    for u in used:
        for mm in re.finditer(r'\b'+re.escape(str(u))+r':\(g,o\)=>\{(.{0,900})',srcs,re.S):text+=' '+mm.group(1).lower()
    for bnd in BRANDS:
        if re.search(r'\b'+re.escape(bnd)+r'\b',text):issues.append(f'LEGAL: real brand / franchise "{bnd}" appears in dialogue, copy or a prop text: replace it with a generic name');score-=30
    for u in UNSAFE:
        if u in text:issues.append(f'SAFETY: dangerous advice "{u}"');score-=40
    if re.search(r'https?://|www\.|\b\d{3}[- ]\d{3,4}[- ]\d{4}\b|@\w+\.\w+',text):issues.append('LEGAL: URL / phone number / e-mail found in copy or on a prop');score-=20
    return dict(dept='legal-brand',score=max(0,score),issues=issues,metrics=dict(props=sorted(str(x) for x in used)))
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
