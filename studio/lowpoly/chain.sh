#!/bin/bash
# usage: chain.sh id1 id2 ... -> finish.py (gate+cover) then queue render, for each id, sequentially; log to out/chain.log
cd "$(dirname "$0")"
for c in "$@"; do echo "== $c" >> out/chain.log; python3 finish.py $c --render >> out/chain.log 2>&1; done
echo CHAIN_DONE >> out/chain.log
