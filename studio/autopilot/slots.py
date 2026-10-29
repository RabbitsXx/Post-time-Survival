"""slots.py : the posting grid.  10 slots a day, 2 h apart, first at 10:00 Thailand time (10:00, 12:00 ... 04:00 next day).
next_slots(n, taken) -> the next n free slots (UTC datetimes) that are at least min_lead_minutes away."""
import json,os,datetime as dt
R=os.path.dirname(os.path.abspath(__file__));CFG=json.load(open(R+'/config.json'))
def _grid(day_local):
    h,m=map(int,CFG['first_slot_local'].split(':'));tz=dt.timedelta(hours=CFG['slot_tz_offset_hours'])
    t0=dt.datetime(day_local.year,day_local.month,day_local.day,h,m)-tz   # naive UTC
    return [t0+dt.timedelta(minutes=CFG['step_minutes']*k) for k in range(CFG['clips_per_day'])]
def next_slots(n,taken=(),now=None):
    now=now or dt.datetime.now(dt.timezone.utc).replace(tzinfo=None);lead=now+dt.timedelta(minutes=CFG['min_lead_minutes'])
    nb=CFG.get('not_before_utc');lead=max(lead,dt.datetime.fromisoformat(nb.replace('Z',''))) if nb else lead
    tk={dt.datetime.fromisoformat(t.replace('Z','')).replace(tzinfo=None) if isinstance(t,str) else t.replace(tzinfo=None) for t in taken}
    out=[];d=(now+dt.timedelta(hours=CFG['slot_tz_offset_hours'])).date()-dt.timedelta(days=1)
    while len(out)<n:
        for s in _grid(d):
            if s>=lead and s not in tk and s not in out:out.append(s)
            if len(out)>=n:break
        d+=dt.timedelta(days=1)
    return out
iso=lambda t:t.strftime('%Y-%m-%dT%H:%M:00.000Z')
if __name__=='__main__':
    import sys;n=int(sys.argv[1]) if len(sys.argv)>1 else 10
    for s in next_slots(n):print(iso(s),'=',(s+dt.timedelta(hours=CFG['slot_tz_offset_hours'])).strftime('%a %d %b %H:%M'),'Thailand')
