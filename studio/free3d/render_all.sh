#!/bin/bash
cd /home/user/Post-time-Survival/studio/free3d
rm -rf frames; mkdir -p frames
N=$((23*30)); K=$(( (N+3)/4 ))
for i in 0 1 2 3; do a=$((i*K)); b=$(( (i+1)*K )); [ $b -gt $N ] && b=$N; node render3d.js frames $a $b 540 960 & done; wait
ffmpeg -y -loglevel error -framerate 30 -i frames/%05d.jpg -c:v libx264 -crf 18 -pix_fmt yuv420p out_preview.mp4 && echo DONE
