"""Buffer client for the PosttimeLowPoly account (token BUFFER_TOKEN2 from env or .secrets.env, never committed)."""
import os,json,requests
R=os.path.dirname(os.path.abspath(__file__))
def token():
    t=os.environ.get('BUFFER_TOKEN2')
    if t:return t
    for l in open(R+'/.secrets.env'):
        if l.startswith('BUFFER_TOKEN2='):return l.split('=',1)[1].strip()
    raise SystemExit('no BUFFER_TOKEN2')
def gql(q,v=None):
    r=requests.post('https://api.buffer.com',headers={'Authorization':'Bearer '+token(),'Content-Type':'application/json'},json=dict(query=q,variables=v or {}),timeout=60);return r.json()
if __name__=='__main__':
    j=gql('query{account{organizations{id name}}}');print(json.dumps(j)[:600])
    orgs=(((j.get('data') or {}).get('account') or {}).get('organizations')) or []
    for o in orgs:
        k=gql('query($i:OrganizationId!){channels(input:{organizationId:$i}){id name service displayName}}',{'i':o['id']});print(o['name'],json.dumps(k)[:1500])
