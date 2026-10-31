#!/bin/bash
cd /home/user/Post-time-Survival/studio/free3d
for n in 1 2 3; do python3 build3d.py episodes/well$n.py --w 1080 --h 1920 > /tmp/claude-0/well$n.log 2>&1 && python3 package3d.py well_0$n >> /tmp/claude-0/well$n.log 2>&1; echo "well$n: $(tail -1 /tmp/claude-0/well$n.log)" >> /tmp/claude-0/well.status; done
