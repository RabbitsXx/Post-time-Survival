#!/usr/bin/env python3
"""Generate the MIDNIGHT SKEWERS sound effects with the ElevenLabs sound-generation API (text -> new audio, not recorded samples).
python eleven_sfx.py            # make every missing effect
python eleven_sfx.py bonk snap  # (re)make only these (delete the file first to force)
Key: ELEVENLABS_API_KEY in the environment or in ../post.env (never committed). Output: out/eleven/<name>.wav (44.1 kHz mono, peak-normalised)."""
import os,sys,subprocess,requests
R=os.path.dirname(os.path.abspath(__file__));OUT=R+'/out/eleven';os.makedirs(OUT,exist_ok=True)
def key():
    k=os.environ.get('ELEVENLABS_API_KEY')
    if k:return k
    return [l.split('=',1)[1].strip() for l in open(R+'/../post.env') if l.startswith('ELEVENLABS_API_KEY=')][0]
# name: (prompt, seconds)   -- every name is referenced by an sfx cue in the episodes
SFX={
 'honk':("clown bicycle horn, two quick squeaky honks, comedic",1.0),
 'bonk':("cartoon wooden stick whacking a head, short comedic bonk impact",.8),
 'squeak':("rubber squeaky toy squeak, short",.6),
 'foot':("single footstep on damp pavement at night, close, dry",.5),
 'ping':("old shop order bell ping, single small metal bell",.8),
 'chime':("coin dropped on a metal counter, small cash register cha-ching",1.0),
 'click':("small mechanical button click on a metal panel",.5),
 'whoosh':("quick soft whoosh of an arm moving through air",.6),
 'rattle':("metal food tray with skewers rattling and sliding on a counter",1.1),
 'creak':("old wooden counter creaking under heavy weight",1.4),
 'groan':("big heavy man groaning while struggling to squeeze through a window",1.4),
 'stomp':("one heavy boot stomp thud on concrete, big man",.8),
 'boing':("cartoon spring boing, comedic",.9),
 'snap':("thick wooden stick snapping in half, sharp crack",.7),
 'heart':("two slow deep heartbeat thumps, tense",1.0),
 'sting':("short horror orchestral sting hit, low and ominous",1.6),
 'slam':("heavy metal roller shutter slamming down and locking, loud",2.0),
 'bang':("heavy fists banging on a metal roller shutter from outside, menacing",2.2),
 'scrape':("long thin fingernails scraping slowly along corrugated metal shutter, creepy",2.0),
 'honkdie':("sad clown horn, one deflating wah honk, comedic",1.2),
 'pour':("pouring iced tea into a plastic cup with ice cubes, short",1.5),
 'unhook':("wooden stick lifted off two metal wall hooks, clunk",.8),
 'ambience':("quiet night street ambience, distant city hum, faint electrical buzz of a neon sign, a few crickets, no voices",22.0),
}
def make(name):
    p=OUT+'/'+name+'.wav'
    if os.path.exists(p):return p
    txt,sec=SFX[name]
    r=requests.post('https://api.elevenlabs.io/v1/sound-generation',headers={'xi-api-key':key()},json={'text':txt,'duration_seconds':sec,'prompt_influence':.6},timeout=180)
    if r.status_code!=200:raise SystemExit(f'{name}: HTTP {r.status_code} {r.text[:200]}')
    mp=OUT+'/'+name+'.mp3';open(mp,'wb').write(r.content)
    af='silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,dynaudnorm=f=60:g=5' if name!='ambience' else 'anull'
    subprocess.check_call(['ffmpeg','-y','-loglevel','error','-i',mp,'-af',af,'-ar','44100','-ac','1','-c:a','pcm_s16le',p]);return p
if __name__=='__main__':
    names=sys.argv[1:] or list(SFX)
    for n in names:print(n,make(n))
