#!/usr/bin/env python3
"""pitchlint.py PITCH.md : a pitch must be complete and strong before any production file is created (SHOWRUNNER.md).
Checks: every template field present and not a placeholder; share line <= 20 words; >= 3 poster moments, >= 4 fights, a solo set piece and an end question for each of 3 parts;
the tip must say where it wins; rubric total >= 32/45; no banned cliches; the hero has WANT, FLAW and SIGNATURE FIGHT.  Exit 1 on any failure."""
import sys,re
t=open(sys.argv[1]).read();bad=[];low=t.lower()
def has(f):return re.search(r'\*\*'+re.escape(f)+r'[^*]*\*\*',t,re.I) is not None
need=['Share line','WHAT IF','Audience feeling map','Hero','Other characters','Antagonist','World','Running gag','Hook plan','Real survival tip','Part 1','Part 2','Part 3','Music idea','Title + thumbnail','Rubric scores','Why this beats']
for f in need:
    if not has(f):bad.append(f'missing field: {f}')
m=re.search(r'\*\*Share line[^*]*\*\*\s*(.+)',t,re.I)
if m:
    n=len(m.group(1).split())
    if n>20 or n<5:bad.append(f'share line has {n} words (5-20)')
if '<' in t and re.search(r'<[a-z ]{3,}>',t.split('**Share line')[-1]):bad.append('placeholder text <...> left in the pitch')
for p in('1','2','3'):
    seg=re.search(r'\*\*Part '+p+r'\b.*?(?=\*\*Part '+str(int(p)+1)+r'\b|\*\*Music idea|\Z)',t,re.S|re.I)
    if not seg:bad.append(f'part {p} section missing');continue
    s=seg.group(0).lower()
    if s.count('poster')<1 or len(re.findall(r'\n\s*[-*\d]',seg.group(0)))<6:bad.append(f'part {p}: needs poster moments (3) and a detailed beat list')
    fights=len(re.findall(r'fight',s))
    if fights<4:bad.append(f'part {p}: only {fights} mentions of a fight (need >= 4 fights)')
    for w in('solo','alone'):
        if w in s:break
    else:bad.append(f'part {p}: no solo set piece (someone ALONE)')
    if 'end question' not in s:bad.append(f'part {p}: no END QUESTION')
hp=re.search(r'\*\*Hook plan.*?(?=\n\*\*[A-Z]|\Z)',t,re.S|re.I)
if hp:
    h=hp.group(0).lower()
    for w in('you','number','twist','loop'):
        if w not in h:bad.append(f'hook plan lacks {w.upper()} (see HOOK_FORMULA.md)')
hero=re.search(r'\*\*Hero.*?(?=\*\*Other characters)',t,re.S|re.I)
if hero:
    h=hero.group(0).lower()
    for w in('want','flaw','signature','catchphrase'):
        if w not in h:bad.append(f'hero lacks {w.upper()}')
tip=re.search(r'\*\*Real survival tip.*?(?=\*\*Part 1)',t,re.S|re.I)
if tip and not re.search(r'win|decid|saves|solv',tip.group(0).lower()):bad.append('the tip does not say how it WINS the story (it must decide the climax)')
sc=re.search(r'Total\s*[:=]?\s*(\d+)\s*/\s*45',t,re.I)
if not sc or int(sc.group(1))<32:bad.append('rubric total missing or < 32/45')
for c in('we need to get to the roof','gather supplies','safe zone','last hope of humanity','patient zero','the virus'):
    if c in low:bad.append(f'cliche: "{c}"')
if bad:print('PITCH FAIL');[print(' -',b) for b in bad];sys.exit(1)
print('PITCH PASS')
