#!/bin/bash
cd /home/user/Post-time-Survival/studio/free3d
T=(2026-10-30T20:18:00 2026-10-30T21:48:00 2026-10-30T23:18:00 2026-10-31T00:48:00 2026-10-31T02:18:00 2026-10-31T03:48:00 2026-10-31T05:18:00)
IDS=(harvest_01 harvest_02 harvest_03 signal_01 signal_02 signal_03 signal_04)
for i in 0 1 2 3 4 5 6; do id=${IDS[$i]}
  until grep -q "^$id: packaged" /tmp/claude-0/well.status 2>/dev/null; do sleep 15; done
  python3 post3d.py $id --at ${T[$i]} >> /tmp/claude-0/sched.log 2>&1; echo "$id scheduled ${T[$i]}" >> /tmp/claude-0/sched.status
done
