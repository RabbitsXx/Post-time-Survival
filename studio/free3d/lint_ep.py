#!/usr/bin/env python3
"""lint_ep.py out/<ep>.spec.json [--max-len 80] : guards for the mistakes listed in NIGHT_LESSONS.md. Exit 1 when something is wrong.
SPEECH_BEFORE_ARRIVAL  a line starts before a walking customer reached the window
DEAD_AIR               a shot longer than 1.2 s without actors, hands, CCTV picture, card, icons or a ticket
TEXT_SIZE / TEXT_LEN   headline (intro) sizes must be the same everywhere, <= 12 characters
CARD_LONG              a card longer than 5.5 s
HEAD_SCALE             a close head (hs) above 1.4 unless the shot is marked scare=True
LENGTH                 total length above the budget"""
import sys,json
a=[x for x in sys.argv[1:] if not x.startswith('--')];spec=json.load(open(a[0],encoding='utf8'))
mx=float(sys.argv[sys.argv.index('--max-len')+1]) if '--max-len' in sys.argv else 80
bad=[];sizes=set()
for i,s in enumerate(spec['shots'],1):
    nm=f"#{i} {s.get('place') or 'CARD'}";dur=s['t1']-s['t0']
    if s.get('card'):
        if dur>5.6:bad.append(f'CARD_LONG {nm}: {dur:.1f}s')
        continue
    for c in s.get('p3',[]):
        if c.get('to') and not c.get('camonly') and abs(c['to'][0]-100)<.8:      # walking TO the window (x = KX = 100); leaving customers may talk
            arr=s['t0']+c.get('t1',dur)
            for L in s['lines']:
                if L['t0']<arr-.05 and L['who'] not in('vendor','narrator'):bad.append(f"SPEECH_BEFORE_ARRIVAL {nm}: '{L['en'][:24]}' at {L['t0']-s['t0']:.2f}s, arrives {c.get('t1',dur):.2f}s")
        hs=c.get('hs');hs=max(hs) if isinstance(hs,list) else hs
        if hs and hs>1.4 and not s.get('scare') and not c.get('camonly'):bad.append(f"HEAD_SCALE {nm}: hs {hs}")
    busy=bool(s.get('p3') or s.get('hands') or s.get('cctv') or s.get('icons') or s.get('inset') or s.get('shutter'))
    if dur>1.2 and not busy:bad.append(f'DEAD_AIR {nm}: {dur:.1f}s with nothing in it')
    I=s.get('intro')
    if I:
        sizes.add(I.get('fs',118))
        for k in('l1','l2','l3'):
            if k=='l2' and len(I.get(k,''))>12:bad.append(f"TEXT_LEN {nm}: '{I.get(k)}' ({len(I.get(k))} chars)")
if len(sizes)>1:bad.append(f'TEXT_SIZE headline sizes differ: {sorted(sizes)}')
if spec['dur']>mx:bad.append(f"LENGTH {spec['dur']:.1f}s > {mx:.0f}s")
print(f"{a[0]}: {len(spec['shots'])} shots, {spec['dur']:.1f}s, avg {spec['dur']/len(spec['shots']):.2f}s")
for b in bad:print(' !',b)
print('LINT PASS' if not bad else f'LINT FAIL ({len(bad)})');sys.exit(1 if bad else 0)
