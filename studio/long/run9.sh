#!/bin/bash
# run9.sh N [N ...] : audio -> frames -> mix/encode for THE LAST BUS parts (cache makes re-runs cheap)
cd "$(dirname "$0")"
for N in "$@"; do
  echo "== part $N $(date +%H:%M:%S)"
  python3 audio9.py p9/part$N || exit 1
  python3 render9.py --spec p9/part$N/spec.json --out frames9_p$N || exit 1
  python3 finish9.py --p p9/part$N --frames frames9_p$N --out final9_p$N.mp4 || exit 1
done
echo "== done $(date +%H:%M:%S)"
