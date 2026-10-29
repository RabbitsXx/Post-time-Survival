"""media.py : where Buffer fetches the videos from, WITHOUT filling the main branch with 15 MB files.
A ring of 4 orphan branches  media-0 .. media-3  (posting day number mod 4).  Each holds only the clips of one posting day (media/<name>.mp4 + the 9:16 cover) and a marker media/DAY.
When a day needs a branch that still holds an older day (4 days ago, long since posted) the branch is REPLACED by a fresh orphan commit (force push): the old 15 MB blobs become unreachable and
GitHub drops them, so the repo does not grow (branch deletion is blocked by this environment's git proxy; force pushes are allowed).  Buffer reads
https://raw.githubusercontent.com/RabbitsXx/Post-time-Survival/media-N/media/<name>.mp4 at post time.  The repo must stay PUBLIC (Buffer cannot log in to GitHub)."""
import os,sys,subprocess,tempfile,shutil,requests
REPO_URL=os.environ.get('MEDIA_REPO_URL','https://github.com/RabbitsXx/Post-time-Survival')
RAW='https://raw.githubusercontent.com/RabbitsXx/Post-time-Survival/'   # (MEDIA_REPO_URL=/path/to/bare.git makes the offline tests use a local repo)
def sh(*a,cwd=None,ok=False):
    p=subprocess.run(a,cwd=cwd,capture_output=True,text=True)
    if p.returncode and not ok:raise SystemExit(f'{" ".join(a[:3])} failed: {(p.stderr or p.stdout).strip()[:300]}')
    return p
import datetime as dt
def branch(day):return 'media-%d'%(dt.date.fromisoformat(day).toordinal()%4)
def url(day,name):return f'{RAW}{branch(day)}/media/{name}'
def upload(day,files):
    """files = {name: local_path}; returns {name: url}; retries the push 4 times (network)"""
    b=branch(day);w=tempfile.mkdtemp(prefix='media_')
    try:
        sh('git','init','-q',cwd=w);sh('git','remote','add','origin',REPO_URL,cwd=w);sh('git','config','user.email','autopilot@posttimesurvival.invalid',cwd=w);sh('git','config','user.name','autopilot',cwd=w)
        f=sh('git','fetch','-q','--depth','1','origin',b,cwd=w,ok=True);force=False
        if f.returncode==0:
            sh('git','checkout','-q','-B',b,'FETCH_HEAD',cwd=w);mk=w+'/media/DAY'
            if not(os.path.exists(mk) and open(mk).read().strip()==day):   # the branch still holds an older day: start it afresh
                sh('git','checkout','-q','--orphan','tmp-new',cwd=w);sh('git','rm','-rq','--cached','.',cwd=w,ok=True);shutil.rmtree(w+'/media',ignore_errors=True);force=True
        else:sh('git','checkout','-q','--orphan',b,cwd=w)
        os.makedirs(w+'/media',exist_ok=True);open(w+'/media/DAY','w').write(day+'\n')
        for n,p in files.items():shutil.copy(p,f'{w}/media/{n}')
        sh('git','add','media',cwd=w);changed=sh('git','diff','--cached','--quiet',cwd=w,ok=True).returncode!=0
        if changed:sh('git','commit','-q','-m',f'media {day}: '+', '.join(files),cwd=w)
        import time
        for d in((0,2,4,8,16) if changed else ()):
            time.sleep(d);p=sh('git','push','-q',*(['-f'] if force else []),'origin','HEAD:refs/heads/'+b,cwd=w,ok=True)
            if p.returncode==0:break
        else:
            if changed:raise SystemExit('push of media branch failed: '+p.stderr.strip()[:200])
    finally:shutil.rmtree(w,ignore_errors=True)
    out={}
    if os.environ.get('MEDIA_REPO_URL'):return {n:url(day,n) for n in files}
    for n,p in files.items():
        u=url(day,n);H={'Accept-Encoding':'identity'};h=requests.head(u,allow_redirects=True,timeout=60,headers=H)
        for _ in range(5):
            if h.status_code==200:break
            import time;time.sleep(5);h=requests.head(u,allow_redirects=True,timeout=60,headers=H)
        if h.status_code!=200 or int(h.headers.get('content-length',-1))!=os.path.getsize(p):raise SystemExit(f'{u} -> HTTP {h.status_code}, size {h.headers.get("content-length")} != {os.path.getsize(p)}')
        out[n]=u
    return out
if __name__=='__main__':   # python3 media.py test  : round trip with a tiny file
    if sys.argv[1:]==['test']:
        t=tempfile.mktemp(suffix='.txt');open(t,'w').write('autopilot media test\n');print(upload('2000-01-01',{'t.txt':t}))
