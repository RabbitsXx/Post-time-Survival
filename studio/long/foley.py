#!/usr/bin/env python3
"""foley.py p9/<clip> : the foley department.  Reads the built spec and adds a sound for every visible action (written into sfx.json before audio9 renders it):
 footsteps (walk 2.2 / run 4 per second, surface by place: tile / stair / gravel / wood, panned to where the person is on screen), zombie shuffles + groans when a zombie enters,
 effort grunts and scrapes when people push, sticker impacts (SHOVE! BANG! THUD! PUSH! FLASH! SQUAWK! ...), props that move (a sofa falling, a helicopter), held items that rattle / jingle while their owner walks,
 cards (keys jingle, lock chain, paper flap for rule cards), elevator ding + doors when the display changes, cloth rustle on turns, camera-shake thumps.
Events carry pan (-1..1) and gain g; anything the script already placed within 0.35 s is not doubled."""
import sys,os,json,random
R=os.path.dirname(os.path.abspath(__file__))
STICK={'SHOVE':[('hit',0,1.0),('grunt',0,.8)],'BANG':[('glass_thump',0,1.0)],'THUD':[('thud_wood',0,1.0)],'PUSH':[('grunt',0,.9),('scrape',.15,.8)],'FLASH':[('flash_ting',0,1.0)],
 'SQUAWK':[('squawk',0,1.0)],'MAYDAY':[('squawk',0,1.0),('squawk',.7,.8)],'PIP NO':[('squawk',0,.9)],'PAN PLAN':[('clang',0,.9)],'1':[('flash_ting',0,1.0)],'2':[('flash_ting',0,1.0)],'3':[('flash_ting',0,1.0)]}
SURF={'in':'tile','lane':'tile','out':'gravel'}
def main():
    out=sys.argv[1];sp=json.load(open(f'{R}/{out}/spec.json'));B=sp['beats'];ev=json.load(open(f'{R}/{out}/sfx.json'));W=sp.get('world') or {};rnd=random.Random(42)
    if not W:print('foley: no data-driven world in this spec, skipped');return
    new=[];last_horde=False;last_elev=None
    def pan(x,v):
        vx=v.get('x',640);vx=vx[0] if isinstance(vx,list) else vx;z=v.get('z',1)
        return max(-.8,min(.8,(x-vx)*z*1.045/260))
    def add(k,t,p=0.0,g=1.0):
        if any(abs(e['t']-t)<.35 and e['k'].split('_')[0]==k.split('_')[0] for e in ev+new):return
        new.append(dict(k=k,t=round(t,3),pan=round(p,2),g=round(g,2)))
    for bi,b in enumerate(B):
        t0,t1=b['t'];D=t1-t0;sc=b['scene'];p=sc.get('p') or {};v=b.get('view') or {}
        for f in b.get('fx',[]):
            if f.get('k')=='sticker' and f.get('txt'):
                key=f['txt'].strip('!').upper()
                for k,dt_,g in STICK.get(key,[]):add(k,t0+float(f.get('at',0))+dt_,0,g)
            if f.get('k')=='shake':add('thud_wood',t0+float(f.get('at',0)),0,.5)
        if sc['n']=='card':
            kind=p.get('kind')
            if kind=='macro':
                o=p.get('obj')
                if o=='keys':add('keys',t0+.1,0,1.0);add('keys',t0+.7,0,.7)
                if o=='lock':add('lock_chain',t0+.1,0,1.0)
                if o=='walkie':add('radio',t0+.05,0,1.0)
            if kind=='rulecard':add('paper',t0+.05,0,1.0);add('bell',t0+.45,0,.6)
            last_horde=False;continue
        loc=p.get('v');kind=((W.get('locs') or {}).get(loc) or {}).get('kind','in');surf=SURF.get(kind,'tile')
        if loc in('stair',):surf='stair'
        if loc in('flat',):surf='wood'
        hordes=[a for a in p.get('acts',[]) if a.get('k')=='horde' or str(a.get('k')).startswith('z_')];props=[a for a in p.get('acts',[]) if a.get('k')=='prop']
        if hordes and not last_horde:
            add('groan',t0+.15,pan(hordes[0].get('x0',hordes[0].get('x',640)),v),.8)
            if sum(h.get('n',1) for h in hordes)>=3:add('horde',t0+.25,0,.6)
        for h in hordes:
            if h.get('to'):
                n=max(2,int(D/.8))
                for i in range(n):add('shuffle_'+'abc'[i%3],t0+.2+i*.8,pan(h.get('x0',h.get('x',640)),v),.7)
        last_horde=bool(hordes)
        for a in p.get('acts',[]):
            if a.get('k') in('prop','horde','dog','sticker') or str(a.get('k')).startswith('z_') or a.get('x') is None:continue
            who=a['k'];mv=a.get('to') and abs(a['to'][0]-a['x'])+abs((a['to'][1] if a['to'][1] is not None else a['y'])-a['y'])>40
            if mv:
                run=a.get('anim')=='run';rate=4.0 if run else 2.2;n=max(2,int(D*rate*.9))
                for i in range(n):
                    tt_=t0+.08+i/rate;
                    if tt_<t1:add(('run_' if run else 'step_')+surf+'_'+'abc'[i%3],tt_,pan(a['x']+(a['to'][0]-a['x'])*i/max(1,n),v),.9 if not run else 1.0)
                if a.get('held'):
                    for i in range(0,n,2):add('rattle' if a['held'].get('t')=='cage' else ('keys' if a['held'].get('t')=='keys' else 'clang'),t0+.1+i/rate,pan(a['x'],v),.25)
            if a.get('seq'):
                for st in a['seq'][1:]:add('rustle',t0+float(st.get('at',0)),pan(a['x'],v),.5)
            if a.get('pose')=='reach' and a.get('view')=='side' and any(f.get('k')=='sticker' and 'PUSH' in str(f.get('txt','')) for f in b.get('fx',[])):
                add('grunt',t0+.1+rnd.random()*.3,pan(a['x'],v),.6)
        # fights: whoosh before the swing, hit at the impact (by weapon), the zombie's pained groan, the fall and the thump on the floor
        for a in p.get('acts',[]):
            sq=a.get('seq') or []
            if any(str(st.get('pose'))=='windup' for st in sq):
                w=[float(st['at']) for st in sq if st.get('pose')=='punch'];wt=w[0] if w else .5;pn=pan(a['x'],v)
                wp=[q for q in props if q.get('keys')];kind='wrench_hit' if any(q.get('t')=='wrench' for q in wp) else 'punch_hit'
                add('swing',t0+max(0,wt-.14),pn,.9);add(kind,t0+wt+.12,pn,1.0)
        for a in p.get('acts',[]):
            fl=a.get('fall')
            if str(a.get('k')).startswith('z_') and fl and fl.get('dur',0)>.05:
                at=float(fl['at']);pn=pan(a['x'],v);add('zhurt_'+'abc'[int(a['x'])%3],t0+at+.04,pn,1.0);add('body_fall',t0+at+.36,pn,1.0)
        zs=[a for a in p.get('acts',[]) if str(a.get('k')).startswith('z_') and not a.get('fall') and a.get('pose')!='stand' or (str(a.get('k')).startswith('z_') and a.get('view')=='back' and not a.get('fall'))]
        for i,a in enumerate(zs[:3]):
            add('zmoan_'+'abc'[(i+int(t0))%3],t0+.2+i*.55,pan(a['x'],v),.8)
            if a.get('to'):
                for j in range(max(2,int(D/.8))):add('shuffle_'+'abc'[j%3],t0+.2+j*.8,pan(a['x'],v),.7)
        for pr in props:
            if pr.get('to') and pr.get('t')=='sofa':add('sofa_fall',t0+.05,0,.9);add('thud_wood',t0+max(.4,D*.55),0,1.0)
            if pr.get('t')=='heli':
                for k in range(0,int(D)+1,3):add('heli',t0+k,0,.35)
        # elevator display / doors
        el=[it for it in (p.get('add') or []) if it.get('t')=='elevator']
        if el:
            sig=(el[0].get('label'),bool(el[0].get('open')))
            if last_elev is not None and sig!=last_elev:add('ding',t0+.05,-.3,.8);add('elev_door',t0+.2,-.3,.9)
            last_elev=sig
    json.dump(ev+new,open(f'{R}/{out}/sfx.json','w'))
    print(f'foley: {len(new)} events added ({len(ev)} scripted)')
if __name__=='__main__':main()
