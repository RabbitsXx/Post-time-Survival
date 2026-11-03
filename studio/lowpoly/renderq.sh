#!/bin/bash
# usage: renderq.sh id1 id2 ... -> renders sequentially (2 workers each), logs to out/<id>_build.log
cd "$(dirname "$0")"
for c in "$@"; do python3 build_clip.py $c.py --render --mix --workers 2 > out/${c}_build.log 2>&1; done
