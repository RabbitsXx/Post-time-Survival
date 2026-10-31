#!/bin/sh
# rigged humanoid GLBs from the three.js examples (Mixamo-sourced); used as base meshes for the toon+outline look
mkdir -p models && cd models
for n in Xbot Soldier Michelle; do [ -s $n.glb ] || curl -sSL -o $n.glb https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/models/gltf/$n.glb; done
[ -s RobotExpressive.glb ] || curl -sSL -o RobotExpressive.glb https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/models/gltf/RobotExpressive/RobotExpressive.glb
