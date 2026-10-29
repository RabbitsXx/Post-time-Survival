#!/usr/bin/env python3
"""preflight.py : can THIS session run the autopilot?  Prints a report (never a secret value): tools, secrets present (yes/no), hosts reachable, Buffer / YouTube / TTS logins work, git push possible."""
import os,sys,json,shutil,subprocess,requests,importlib
R=os.path.dirname(os.path.abspath(__file__));REPO=os.path.abspath(R+'/../..');sys.path.insert(0,R);sys.path.insert(0,os.environ.get('SER_DIR',REPO+'/studio/ser'))
rep=[]
def ck(name,ok,detail=''):rep.append((name,bool(ok),detail));print(('OK   ' if ok else 'FAIL ')+name+(' - '+str(detail) if detail else ''))
for t in('ffmpeg','ffprobe','node','python3','git'):ck('tool '+t,shutil.which(t),shutil.which(t) or '')
ck('chromium (playwright)',os.path.exists('/opt/pw-browsers') and any(x.startswith('chromium') for x in os.listdir('/opt/pw-browsers')))
for m in('numpy','PIL','requests'):
    try:importlib.import_module(m);ck('python '+m,True)
    except Exception as e:ck('python '+m,False,e)
env=lambda k:any(x.lower()==k.lower() and os.environ[x].strip() for x in os.environ)
ck('secret BUFFER_TOKEN',env('BUFFER_TOKEN'),'needed to schedule posts');ck('secret GEMINI_API_KEY',env('GEMINI_API_KEY'),'needed for the voices (Google Chirp3-HD)');ck('secret Youtube_API',env('Youtube_API'),'needed for tags/thumbnail/subtitles/playlist')
for u in('https://api.buffer.com/','https://oauth2.googleapis.com/token','https://www.googleapis.com/youtube/v3/videos','https://texttospeech.googleapis.com/v1/voices','https://raw.githubusercontent.com/RabbitsXx/Post-time-Survival/main/README.md'):
    try:c=requests.get(u,timeout=20).status_code;ck('host '+u.split('/')[2],c<500,f'HTTP {c}')
    except Exception as e:ck('host '+u.split('/')[2],False,e)
try:
    import buffer_api as B;j=B.gql('{ __schema { queryType { name } } }');ck('Buffer login',bool((j.get('data') or {}).get('__schema')),'' if (j.get('data') or {}).get('__schema') else str(j)[:120])
except BaseException as e:ck('Buffer login',False,str(e)[:140])
try:
    import yt_api as Y;raw=Y._raw();kind='API key (AIza...)' if raw.startswith('AIza') else ('JSON' if raw.startswith('{') else 'other text');ck('Youtube_API format',kind=='JSON',kind+(' - a key cannot edit videos, OAuth refresh-token JSON is needed' if kind!='JSON' else ''))
    if kind=='JSON':
        ch=Y.channel();ck('YouTube login (OAuth refresh)',True,f"channel '{ch['title']}' ({ch['videos']} videos)")
        t=requests.get('https://oauth2.googleapis.com/tokeninfo',params=dict(access_token=Y.token()),timeout=30).json();sc=t.get('scope','');ck('YouTube scope allows editing',('auth/youtube' in sc and 'readonly' not in sc.replace('youtube.readonly','')) or 'youtube.force-ssl' in sc,sc.replace('https://www.googleapis.com/auth/',''))
except BaseException as e:ck('YouTube login',False,str(e)[:200])
try:
    k=os.environ.get('GEMINI_API_KEY') or [x for k,x in os.environ.items() if k.lower()=='gemini_api_key'][0]
    r=requests.post('https://texttospeech.googleapis.com/v1/text:synthesize',headers={'x-goog-api-key':k},json=dict(input=dict(text='Test.'),voice=dict(languageCode='en-US',name='en-US-Chirp3-HD-Fenrir'),audioConfig=dict(audioEncoding='MP3')),timeout=60);ck('TTS voice works',r.status_code==200,f'HTTP {r.status_code}')
except BaseException as e:ck('TTS voice works',False,'no key' if isinstance(e,(IndexError,KeyError)) else str(e)[:100])
p=subprocess.run(['git','-C',REPO,'ls-remote','--heads','origin','claude/happy-galileo-buqnkl'],capture_output=True,text=True,timeout=60);ck('git can reach origin',p.returncode==0 and 'happy-galileo' in p.stdout,p.stderr.strip()[:100])
bad=[n for n,o,_ in rep if not o];print('\nMISSING/FAILING:',bad or 'nothing - ready');json.dump([dict(check=n,ok=o,detail=d) for n,o,d in rep],open(R+'/state/preflight.json','w'),indent=1,default=str)
