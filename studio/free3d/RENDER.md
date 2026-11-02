# Render guide (why it is slow, and what is already optimised)

## Why it is slow here
The cloud container has 4 CPU cores and no GPU, so Chromium emulates WebGL on the CPU (SwiftShader).
A 1080x1920 frame costs ~1.4 s; the 56 s clip = ~1,680 frames; motion-blurred whip-pan frames cost 7x.

## Built-in speed-ups
* **Shot-hash cache** (`out/<ep>_cache.json`): `python3 build_rc.py episodes/ks1.py --w 1080 --h 1920 --clean`
  only re-renders shots whose JSON (or the 3D/overlay code) changed. Editing one line of dialogue re-renders that shot only.
  `--no-cache` forces everything, `--mark-clean` records the current frames as up to date without rendering.
* **Dynamic work queue**: frames are cut into 36-frame chunks and handed to whichever of the 4 workers is free
  (before: 4 fixed slices, the slice with the blur-heavy shots finished last).
* **Frame review with stills** (`--stills t1,t2,...` at 360x640 / 540x960) before any full render.
* `--fast` (adds `&fast`): shadows off, for draft checks only.

## Use a GPU (expected 5-10x faster; not testable from this container)
On any machine with a GPU, Node.js, `npm i playwright`, ffmpeg and this repo:
```
GPU=1 python3 build_rc.py episodes/ks1.py --w 1080 --h 1920 --clean --workers 3
```
`GPU=1` removes the SwiftShader flags in `render_store3.js`. If Chromium does not pick the GPU, try
`GPU_ANGLE=vulkan` (Linux) or `GPU_ANGLE=d3d11` (Windows) / `metal` (macOS). Compare a few frames against the
CPU render before trusting colours/shadows.
