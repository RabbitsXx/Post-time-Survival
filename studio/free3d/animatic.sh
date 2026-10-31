#!/bin/sh
# silent animatic: ./animatic.sh spec.json out_dir [fps=6] [w=360] [h=640]   (2D mode)
SPEC=$1; OUT=$2; FPS=${3:-6}; W=${4:-360}; H=${5:-640}
DUR=$(python3 -c "import json;print(int(json.load(open('$SPEC'))['dur']*30))")
rm -rf $OUT; STEP=$((30/FPS)) node render_store3.js $SPEC $OUT 0 $DUR $W $H "&2d" && \
ffmpeg -y -loglevel error -framerate $FPS -pattern_type glob -i "$OUT/*.jpg" -vf "scale=${W}:${H}:flags=neighbor" -pix_fmt yuv420p $OUT.mp4 && echo "animatic: $OUT.mp4"
