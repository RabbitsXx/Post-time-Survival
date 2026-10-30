"""clipreg.py : one place that knows where everything of a clip lives, so qa9 / kit9 / embed9 / cover9 / build_clip work for both
  * THE LAST BUS parts 1..10 (legacy int ids: p9/partN, frames9_pN, final9_pN.mp4, release9/partN, script_busN, th_bus, meta_lb) and
  * autopilot clips (string ids '<arc>_<nn>' e.g. 'route12_03': p9/route12_03, frames9_route12_03, final9_route12_03.mp4, release9/route12_03, script arcs/route12/route12_03.py).
An autopilot clip file defines (on top of the usual BEATS/TITLE):  P (the buslib.Part),  TH = [Thai line per cue],  META = dict(...),  COVER = dict(beat,frac,main,box).  See arcs/README.md."""
import os,sys,importlib.util
R=os.path.dirname(os.path.abspath(__file__));S=os.path.abspath(R+'/..');sys.path.insert(0,R);sys.path.insert(0,S+'/ser')
NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']
def legacy(n):return isinstance(n,int) or str(n).isdigit()
def pid(n):return f'part{int(n)}' if legacy(n) else str(n)
def frames(n):return f'frames9_p{int(n)}' if legacy(n) else f'frames9_{n}'
def final(n):return f'final9_p{int(n)}.mp4' if legacy(n) else f'final9_{n}.mp4'
def release(n):return f'release9/{pid(n)}'
def cover(n,k):return f'covers9/cover_{n}_{k}.png'
def script(n):
    if legacy(n):return f'script_bus{int(n)}'
    return f'arcs/{str(n).rsplit("_",1)[0]}/{n}'
_mods={}
def module(n):
    if n not in _mods:
        sp=importlib.util.spec_from_file_location('clip_'+str(n).replace('/','_'),f'{R}/{script(n)}.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);_mods[n]=m
    return _mods[n]
def series(n):
    """dict(name, part, of, say)"""
    if legacy(n):return dict(name='THE LAST BUS',part=int(n),of=10,say='the Last Bus')
    P=module(n).P;return dict(name=P.series,part=P.part,of=P.of,say=P.say)
def th(n):
    if legacy(n):import th_bus;return th_bus.TH[int(n)]
    return module(n).TH
def names(n):
    """(English, Thai) speaker names for the subtitles"""
    import th_bus
    if legacy(n):return th_bus.NAMES_EN,th_bus.NAMES_TH
    m=module(n);return getattr(m,'NAMES_EN',th_bus.NAMES_EN),getattr(m,'NAMES_TH',th_bus.NAMES_TH)
def tags(n):
    if legacy(n):import meta_lb;return meta_lb.YT_TAGS
    return module(n).META['tags']
CAST=("THE PASSENGERS: Rosa (driver) · Priya (ER nurse) · Marcus (aggressively cautious) · Teddy (age 9, with Gary the dinosaur) · June (78, bottomless handbag) · "
      "Vic (live-streamer) · Lena (hoodie, secrets) · Benny (chicken suit) · Mr. Park (briefcase) · Dante (has seen every zombie movie) · Amara (and baby) · Walt (sound asleep). And BUS-E, the bus's very cheerful PA system.")
def meta(n):
    """dict(yt_title, yt_desc, tt, ig, pin, tags)"""
    if legacy(n):
        import meta_lb;m=dict(meta_lb.M[int(n)]);m['tags']=meta_lb.YT_TAGS;return m
    M=module(n).META;s=series(n);nm=s['name'];p=s['part'];of=s['of'];fin=p>=of;nxt=M.get('nxt','')
    sfx=f" | {nm.title() if nm.isupper() else nm} Part {p}"+(' Finale' if fin else '');hook=M['hook'].strip()
    if len(hook)+len(sfx)>70:            # marketing: <= 70 characters so phones do not cut the title; shorten the hook at a word boundary
        cut=hook[:70-len(sfx)-1].rsplit(' ',1)[0].rstrip(' ,;:-—!?')
        hook=cut+('!' if M['hook'].rstrip().endswith('!') else '')
    title=hook+sfx
    hs=lambda base:base+(' #'+nm.lower().replace(':','').replace(' ','') if M.get('hash_series',True) else '')
    desc=(f"{nm} — Part {p} of {of}, from Post Time Survival\n{M['premise']}\n\n{M['body']}\n\n"+(f"🔔 Part {p+1} next: {nxt}.\n" if not fin else f"🔔 That's the end of {nm}. A new series is coming.\n")
          +f"\n{M['ask']}\n"+("Where was Steve (the polite zombie with the ticket) in this part? Tell me in the comments.\n" if M.get('steve',True) else '')+"\n"+(M.get('cast',CAST)+"\n\n" if M.get('cast',CAST) else '')
          +f"Fiction and comedy. Voices are AI-generated; the animation is original.\nWatch the whole series in order: {nm}, Parts 1-{of}, from Post Time Survival.\n\n"+hs('#shorts #zombie #zombieapocalypse #animation '+M.get('hashtag','#survival')))
    tt=f"{M['tt']} Part {p} of {of}.\n"+hs('#zombie #zombieapocalypse #animatedstory #fyp')
    ig=f"{M['ig']} Part {p} of {of}"+(f" — Part {p+1} next." if not fin else " — the finale.")+"\n"+hs('#zombie #zombieapocalypse #animation #animatedstory #reels')
    return dict(yt_title=title,yt_desc=desc,tt=tt,ig=ig,pin=M['pin'],tags=M['tags'])
def cover_cfg(n):
    """(beat, fraction, main, box, accent)"""
    if legacy(n):import cover9;return cover9.CFG[int(n)]
    c=module(n).COVER;return (c.get('beat',0),c.get('frac',.5),c['main'],c['box'],1)
