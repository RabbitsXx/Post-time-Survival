#!/usr/bin/env python3
"""STORY EDITOR audit: the table read.  dialoguelint.py CLIP_ID -> JSON.
 * line length: mean 5-11 words, no line over 14;  no speaker talks 3 lines in a row;  no two lines start with the same word in a row
 * voices: characters must not sound interchangeable: their mean word length / punctuation habits must differ (spread >= 0.25 letters) and each has a catchphrase use if the world defines one
 * exposition: banned filler ("as you know", "we need to get to", "let me explain"); reading grade <= 6 (punchy)"""
import sys,os,json,re,statistics as st
R=os.path.dirname(os.path.abspath(__file__));LONG=os.path.abspath(R+'/../long');sys.path.insert(0,LONG)
import clipreg as CR
BAN=['as you know','we need to get to','let me explain','in order to','we have to find a way','what do we do now','i have a bad feeling','this is not a drill']
def syll(w):return max(1,len(re.findall(r'[aeiouy]+',w.lower())))
def audit(cid):
    d=f'{LONG}/p9/{CR.pid(cid)}';cues=[c for c in json.load(open(d+'/cues_en.json')) if c['sp']!='ann'];S=json.load(open(d+'/spec.json'));issues=[];M={};score=100
    W=S.get('world') or {};cast=W.get('cast',{})
    lens=[len(c['text'].split()) for c in cues];M['mean_words']=round(st.mean(lens),1) if lens else 0
    if lens and not 4<=st.mean(lens)<=11:issues.append(f'WRITING: mean line length {st.mean(lens):.1f} words (4-11)');score-=6
    if lens and max(lens)>14:issues.append(f'WRITING: a line has {max(lens)} words (> 14): cut it');score-=5
    run=1
    for a,b in zip(cues,cues[1:]):
        run=run+1 if a['sp']==b['sp'] else 1
        if run>=3:issues.append(f'WRITING: {a["sp"]} talks 3 lines in a row: break it with a reaction or action');score-=4;break
    for a,b in zip(cues,cues[1:]):
        if a['text'].split()[0].lower()==b['text'].split()[0].lower() and a['sp']!=b['sp'] and len(a['text'].split())>2:issues.append(f'WRITING: two lines in a row start with "{a["text"].split()[0]}"');score-=2;break
    # hook formula (autopilot/HOOK_FORMULA.md): YOU, NUMBER, TWIST, OPEN LOOP
    if cues:
        op=' '.join(c['text'] for c in cues[:3]).lower();allt=' '.join(c['text'] for c in cues).lower()
        if not re.search(r"\b(you|your|you're)\b",op):issues.append('HOOK: opening lines never speak to the viewer ("if you ...")');score-=5
        if not re.search(r'\d|\b(one|two|three|four|five|six|seven|ten|twenty|hundred|thousand|first|last)\b',op):issues.append('HOOK: no number in the opening lines');score-=4
        if not re.search(r"\b(but|except|wait|turns out|never|not the|was a lie|actually)\b",allt):issues.append('HOOK: no twist / reversal wording anywhere');score-=5
        m=re.search(r'part (\d)',(S.get('title') or '')+' '+str(S.get('part','')),re.I);pn=int(m.group(1)) if m else 0
        if pn in(1,2) and '?' not in cues[-1]['text'] and '...' not in cues[-1]['text'] and '…' not in cues[-1]['text']:issues.append('HOOK: part ends without an open loop (question / unfinished thought)');score-=6
    feat={}
    for c in cues:
        ws=re.findall(r"[A-Za-z']+",c['text']);f=feat.setdefault(c['sp'],dict(wl=[],ex=0,q=0,n=0))
        f['wl']+=[len(w) for w in ws];f['ex']+=c['text'].count('!');f['q']+=c['text'].count('?');f['n']+=1
    ml={k:st.mean(v['wl']) for k,v in feat.items() if v['n']>=2 and v['wl']};M['word_length']={k:round(v,2) for k,v in ml.items()}
    if len(ml)>=3 and max(ml.values())-min(ml.values())<.25:issues.append('WRITING: everybody talks the same way (word length spread < 0.25): give each character a distinct register');score-=8
    for k,c in cast.items():
        cp=c.get('catch')
        if cp and not any(cp.lower() in x['text'].lower() for x in cues if x['sp']==k):issues.append(f'WRITING: {k} never says the catchphrase "{cp}"');score-=3
    txt=' '.join(c['text'] for c in cues).lower()
    for b in BAN:
        if b in txt:issues.append(f'WRITING: filler / cliche "{b}"');score-=5
    words=re.findall(r"[A-Za-z']+",txt);sent=max(1,len(re.findall(r'[.!?]+',txt)))
    if words:
        g=0.39*len(words)/sent+11.8*sum(syll(w) for w in words)/len(words)-15.59;M['reading_grade']=round(g,1)
        if g>6:issues.append(f'WRITING: reading grade {g:.1f} (> 6): shorter, punchier words');score-=4
    return dict(dept='writing',score=max(0,score),issues=issues,metrics=M)
if __name__=='__main__':print(json.dumps(audit(sys.argv[1]),indent=1,ensure_ascii=False))
