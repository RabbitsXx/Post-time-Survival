#!/bin/bash
# usage: fixpeak.sh ID [LIMIT]  -> true-peak limiter on the audio of out/ID/ID.mp4 (video copied)
f=out/$1/$1.mp4; ffmpeg -y -v error -i $f -c:v copy -af "alimiter=limit=${2:-0.72}:level=disabled:attack=2:release=40" -c:a aac -b:a 192k -movflags +faststart out/$1/tmp_fix.mp4 && mv out/$1/tmp_fix.mp4 $f
