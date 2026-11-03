#!/bin/bash
cd /home/user/Post-time-Survival/studio/free3d
while pgrep -f run_all.sh >/dev/null; do sleep 10; done
for e in harvest1:harvest_01 harvest2:harvest_02 harvest3:harvest_03 signal1:signal_01 signal2:signal_02 signal3:signal_03 signal4:signal_04; do f=${e%%:*}; id=${e##*:}
  python3 build3d.py episodes/$f.py --w 1080 --h 1920 > /tmp/claude-0/$id.log 2>&1 && python3 package3d.py $id >> /tmp/claude-0/$id.log 2>&1; echo "$id: $(tail -1 /tmp/claude-0/$id.log)" >> /tmp/claude-0/well.status; done
