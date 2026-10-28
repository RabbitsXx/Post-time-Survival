"""tiny Buffer GraphQL client shared by publish.py / post_status.py (token from env BUFFER_TOKEN or post.env: Buffer_API_POST_TIME)"""
import os,json,requests
R=os.path.dirname(os.path.abspath(__file__))
def token():
    t=os.environ.get('BUFFER_TOKEN')
    if t:return t
    for p in (R+'/../post.env',R+'/post.env'):
        if os.path.exists(p):
            for l in open(p):
                if l.startswith('Buffer_API_POST_TIME='):return l.split('=',1)[1].strip().strip('"').replace('\r','')
    raise SystemExit('no Buffer token: set BUFFER_TOKEN or put Buffer_API_POST_TIME=... in post.env (never commit it)')
def gql(query,variables=None,timeout=150):
    r=requests.post('https://api.buffer.com',headers={'Authorization':f'Bearer {token()}','Content-Type':'application/json'},json=dict(query=query,variables=variables or {}),timeout=timeout);return r.json()
CREATE="""mutation($input: CreatePostInput!){ createPost(input:$input){ __typename
 ... on PostActionSuccess { post { id status dueAt } }
 ... on InvalidInputError { message } ... on UnexpectedError { message } ... on RestProxyError { message }
 ... on LimitReachedError { message } ... on UnauthorizedError { message } ... on NotFoundError { message } } }"""
STATUS='query($id:PostId!){post(input:{id:$id}){id status error{message} externalLink sentAt dueAt}}'
def status(pid):
    j=gql(STATUS,{'id':pid});return (j.get('data') or {}).get('post') or {'status':'?','error':{'message':json.dumps(j)[:120]}}
