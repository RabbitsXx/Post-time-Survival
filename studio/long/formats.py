"""formats.py : story templates for the autopilot.  A template turns one dict of CONTENT (lines, a myth, a tip, a joke) into the beats of a part, using only shots that are proven
in THE LAST BUS (cu / two / wide / pov / cards), so every clip has the same, checked picture quality and only the writing changes.
Every spoken line is a tuple (speaker, English, Thai): one tuple = one subtitle cue; the Thai goes straight into captions_th.srt.

myth_part(P, d) -> TH list      'MYTH BUSTER' part: Dante states a movie-logic belief, Priya doubts it, the A/B card shows GAME BRAIN vs REAL LIFE, the bus tests it,
                                it fails, Teddy/Gary says the true thing out loud, the rule card gives the real tip, Steve turns up, a punchline, BUS-E drops a clue for the next stop.
fields of d (all required unless marked ?):
  hook    [(who,en,th)...]        1-2 lines, wide shot of the bus: the belief.  who in SEATX/rosa/bus...
  doubt   [(who,en,th)]           Priya (or June) is not buying it
  a_icon,a_t,b_icon,b_t           A/B card: A = the movie-logic idea, B = what is really true  (icons: stairs elevator sprint walk closet doors bat bag bed cans jam rail heli boat skull ear water food aid battery lamp phone group map whistle mirror flare clock tent bandage gun sofa airplane loot; texts <= 12 chars)
  debate  [(who,en,th)...]        2-3 lines over the A/B card
  pov     road|tunnel|bridge|toll|pier|station   windshield view for the set-up      out  road|city|tunnel|station|diner|bridge|toll|pier  scenery in the windows
  setup   [(who,en,th)]           Rosa (or Marcus) says what the bus is facing
  attempt [(who,en,th)...]  partner  (a passenger key)   the plan is tried (two-shot Dante + partner)
  fail    [(who,en,th)...]  failer   (key)  sticker?  it goes wrong
  gary    [(who,en,th)]           Teddy says the true thing
  tip_say [(who,en,th)...]  tip_icon  tip_t1  tip_t2 (<= 16 chars each)   Priya gives the real tip over the RULE card
  gag     [(who,en,th)...]        Steve (ticket) at the windshield + one line
  concede [(who,en,th)]?          Dante gives in (close-up)
  punch   [(who,en,th)...]  punch_ex?=[expr1,expr2]  one close-up per line; the joke that ends the scene
  clue    (lines3, [(who,en,th)])   BUS-E's sensor card (3 short lines) + what BUS-E says, accidentally giving a clue to the arc
  nxt     the next part's topic (for BUS-E's sign-off)      th_nxt  Thai       quip?  last words of the sign-off (English)  th_quip?
  th_series  Thai series name ('รถเมล์คันสุดท้าย เส้นทาง 12')   th_topic  Thai topic"""
from buslib import *
THN=['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า','สิบ','สิบเอ็ด','สิบสอง','สิบสาม','สิบสี่','สิบห้า','สิบหก','สิบเจ็ด','สิบแปด','สิบเก้า','ยี่สิบ']
def myth_part(P,d):
    th=[];out=d.get('out','road')
    def L(lines):
        for w,en,t in lines:th.append(t)
        return [(w,en) for w,en,t in lines]
    ex0=dict(dante='smug',priya='deadpan',marcus='worried');ex0.update(d.get('ex',{}))
    P.B(L(d['hook']),wide(690,1.12,ex=ex0,out=out,L=dict(dome='dim')),mood='comic',fx=[P.announce()],sfx=[('ping',.1)])
    P.pa_open();th.append(f"ดิ๊งด่อง! นี่คือ{d['th_series']} ตอนที่{THN[P.part]}จาก{THN[P.of]}: {d['th_topic']}")
    P.B(L(d['doubt']),cu(d.get('doubter','priya'),'deadpan',z=1.7,out=out),mood='comic')
    P.B(L(d['debate']),card('ab',a=dict(icon=d['a_icon'],t=d['a_t'],res='cross'),b=dict(icon=d['b_icon'],t=d['b_t'],res='check'),pick='b'),mood='comic',sfx=[('stab',.3),('chime','e-0.6')])
    if d.get('concede'):P.B(L(d['concede']),cu('dante','sad',z=1.8,out=out),mood='comic',sfx=[('sigh',.2)])
    P.B(L(d['setup']),pov(d.get('pov','road'),speed=1.0,horde=dict(n=8,x0=480,x1=800)),mood='creep',cam='push_in',sfx=[('horde',.3)])
    pt=d.get('partner','marcus')
    P.B(L(d['attempt']),two('dante',pt,ex={'dante':'grin',pt:'scared'},z=1.5,out=out),mood='chase',sfx=[(d.get('sfx1','click'),.2)])
    fl=d.get('failer','dante')
    P.B(L(d['fail']),cu(fl,'shock',z=1.8,out=out),mood='comic',sfx=[('boing','e-0.5')],fx=[sticker(.35,d.get('sticker','NOPE.'),x=270,y=165,rot=-8,size=54,c='#ff6a5a',dur=1.4)])
    P.B(L(d['gary']),cu('teddy','smile',z=1.8,out=out),mood='comic')
    P.B(L(d['tip_say']),card('rule',n=P.part,icon=d['tip_icon'],t1=d['tip_t1'],t2=d['tip_t2']),mood='idle',sfx=[('chime',0)])
    P.B(L(d['gag']),pov(d.get('pov','road'),[steve(640,y=392,view='front',pose='zombie',s=.2,held=dict(t='ticket',ox=70,oy=-190,rot=0,s=1.4))],speed=1.5,gauge=False),mood='comic',sfx=[('rimshot','e-0.4')])
    for i,ln in enumerate(d['punch']):    # one shot per punchline: each speaker gets a close-up
        P.B(L([ln]),cu(ln[0],d.get('punch_ex',['worried','smug'])[min(i,1)],z=1.8,out=out),mood='comic',sfx=[('cheer',.3)] if i==len(d['punch'])-1 else [])
    lines3,spoken=d['clue']
    P.B(L(spoken),card('pa',mode='text',lines=lines3,time='SENSOR'),mood='creep',sfx=[('ping',.1),('stab','e-0.4')])
    P.pa_close(d.get('nxt'),d.get('quip',''),nxt_time=d.get('nxt_time'))
    if P.part<P.of:th.append(f"ตอนที่{THN[P.part]}จาก{THN[P.of]} {d['th_series']} ป้ายต่อไป {d['th_nxt']} ติดตามตอนที่{THN[P.part+1]} {d.get('th_quip','')}".strip())
    else:th.append(f"ตอนที่{THN[P.of]}จาก{THN[P.of]} จบเรื่อง{d['th_series']} ติดตามซีรีส์ใหม่")
    return th
