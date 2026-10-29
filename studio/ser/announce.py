"""announce.py : the standard way a part announces itself (STANDING RULE from the owner, 2026-10-29: every short says its series name, topic and part).
 * on screen, first 3 s: "SERIES NAME / PART n / N / TOPIC"  -> master2.html #sertag, switched on with announce=True in the part (or the series entry in series.py)
 * spoken, at the end (so the hook stays the first thing a new viewer hears):  signoff(...)  -> use it as the part's next_spoken
   e.g.  "Part two of five, The Last Sunrise. Next: the hot spring. Follow for part three."
Run `python3 ser/announce.py check SERIES` to lint every part of a series."""
import sys,os,re,importlib
R=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,R)
NUM=['zero','one','two','three','four','five','six','seven','eight','nine','ten']
def signoff(series_name,part,of,next_topic=None):
    nm=series_name.title().replace(' ','_').replace('_',' ')
    if part>=of:return f"Part {NUM[part]} of {NUM[of]}, the end of {nm}. Follow for the next series."
    return f"Part {NUM[part]} of {NUM[of]}, {nm}. Next: {next_topic.lower()}. Follow for part {NUM[part+1]}."
def check(key):
    import series as SR
    cfg=SR.SERIES[key];mod=importlib.import_module(cfg['parts']);bad=[]
    for N in cfg['ids']:
        P=mod.PARTS[N];k,pn=SR.of(N);tot=SR.total(k)
        if not (P.get('announce') or cfg.get('announce')):bad.append(f'part {pn}: announce is off (no on-screen name / part / topic)')
        if len(P['title'])>28:bad.append(f'part {pn}: topic "{P["title"]}" is long (> 28 chars, it will be squeezed)')
        sp=P['next_spoken'].lower();need=[NUM[pn]]
        if cfg['title'].lower() not in sp and not P.get('announce_spoken_ok'):bad.append(f'part {pn}: the sign-off does not say the series name "{cfg["title"].title()}": use announce.signoff()')
        if f'part {NUM[pn]}' not in sp and pn<tot:bad.append(f'part {pn}: the sign-off does not say "part {NUM[pn]}"')
    return bad
if __name__=='__main__' and len(sys.argv)>2 and sys.argv[1]=='check':
    b=check(sys.argv[2]);print('\n'.join(b) if b else 'announce ok');sys.exit(1 if b else 0)
