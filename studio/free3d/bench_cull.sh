cd /home/user/Post-time-Survival/studio/free3d
for mode in "&2d&nocull" "&2d"; do echo "mode $mode"; timeout 300 node bench_rc.js spec_rc1_frames.json 1080 1920 "$mode" 2>&1 | tail -1; done
