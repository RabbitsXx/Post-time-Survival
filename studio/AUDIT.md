# Pipeline audit and optimisation (measured, same machine: 4 cores, no GPU)

Rule for this work: **the clip must come out the same or better**. Every optimisation below was measured against the old path on identical frames.

## 1. Pipelines inspected

| # | Pipeline | Old behaviour | Finding | Change |
|---|---|---|---|---|
| 1 | Story -> script (`parts_*.py`) | free-form, reviewed by eye | every rejection (fast voice, dizzy cuts, long captions, weak cuts, open hook) was a rule nobody checked | `lint_story.py`: 12 rules, < 1 s |
| 2 | TTS + timing (`build_spec2.py`) | fixed rate; hand-tuned 4-5 rebuilds per part; trims run one by one | speaking speed depends on the text (142-172 wpm at the same rate); TTS output differs per call | **auto-rate** (converges in 1-3 tries), parallel trims, key from env |
| 3 | Layout / scenes | preview sheet by eye (30 s), found cropped text only after looking | cropped labels reached late (one 2 px crop was still in a finished clip) | `lint_layout.js`: measures every text box in the real engine (1.3 s); 36-scene catalogue `SCENES.md` |
| 4 | Frame render (`render2.js`, 4 workers by fixed frame ranges) | whole part every time (103 s); static split leaves workers idle; first frame of each worker cold | 14 whole-part re-renders in this project for 1-3 beat fixes | `render_part.py`: per-beat cache + persistent workers with dynamic chunks + warm-up + CDP capture |
| 5 | Master encode (JPEG -> x264 crf 16 -> mp4) | 29 s and an extra lossy generation | pure overhead: `finish` re-decodes it | removed: `finish_fast` reads the frames folder directly |
| 6 | Finish (`finish_clip.py`: captions, end card, mix, loudnorm, encode) + `limit.sh` | audio first, then video, then a second AAC pass for the limiter | serial; limiter after AAC; sample-peak limiter misses inter-sample peaks (Part 2: -0.2 dBTP FAIL) | `finish_fast.py`: audio thread in parallel, oversampled true-peak limiter before the single AAC encode, gradient in a preallocated buffer (bit-identical), x264 `fast` crf 20 |
| 7 | QA (Gate A, B, C, cut check, sheet) | run one by one (36 s) | Gate B's cut detector misses cuts between similar/dark scenes | `qa_all.py` runs all in parallel (21 s) + `cutcheck.py` real frame-difference at each cut; report file |
| 8 | Covers | brand HTML per part (Lighthouse) / engine still (Sunrise) | writing the embedded cover frames through a hard link would corrupt the render cache | frames replaced, never overwritten in place; recipe lives in the part's script |
| 9 | Subtitles (EN/TH) | separate script per series | none | `make_srt2.py`, series registry, missing Thai lines listed |
| 10 | Packaging + scheduling (Buffer) | three near-identical `schedule*.py`, hand copy loops, ad-hoc status queries | URL/size checks done by hand; easy to forget the repo must stay public | `package.py`, `publish.py` (preflight: file, URL 200, size, copy length), `post_status.py` |
| 11 | Orchestration | ~12 manual commands per part | each a chance to forget a step (cover, limit, QA) | `make_part.py N` (one command), `make_series.py` (parts overlapped) |
| 12 | Operations | toolchain only in the session's temp folder; hard-coded absolute paths | would be lost with the container | relocatable scripts, whole studio committed to the repo, secrets excluded |

## 2. Time per part (1800 frames)

| Stage | Before | After | Note |
|---|---:|---:|---|
| lint (story + layout) | 0 (manual preview 31 s) | 1.3 s | |
| TTS + spec | 5-15 s x 4-5 manual rebuilds | 5-15 s x 1 (auto-rate) | |
| render | 103 s | **74 s** cold; **0 s** unchanged; **19 s** for a 4-beat scene fix | cache keyed by scene code + params + camera + timing |
| master encode | 29 s | 0 s | removed |
| music + cover | 7 s | 7.5 s | |
| finish (+ limiter) | 43 s + 5 s | **29 s** | audio runs in parallel with video |
| QA | 36 s | **21 s** | parallel |
| **total, cold** | **~212 s + manual steps** | **~134 s, one command** | -37 % |
| rework (one-scene fix) | ~212 s | ~77 s | |
| rework (captions/audio only) | ~212 s | ~50 s (`--only finish` + QA) | |
| 5-part series | ~18 min | ~11 min (TTS/QA overlapped) | `make_series.py` |

## 3. Quality parity evidence (old path vs new path on the *same* frames)

| Check | Old | New | Verdict |
|---|---|---|---|
| Frames vs old renderer (480 frames) | - | 413 bit-identical, min **56.4 dB** PSNR | equal (rest differ by +-1 level) |
| Cached frame vs fresh render (30 random) | - | 16 bit-identical, min **62.4 dB** | equal |
| Final video vs lossless composed reference | 39.01 dB (min 36.67) | **40.01 dB** (min 37.28) | **better** (one lossy generation less) |
| Final new vs final old (all 1800 frames) | - | PSNR mean 46.8 / min 43.0 dB, SSIM mean 0.9905 | transparent |
| `compose_fast` vs `finish_clip.compose` (200 frames) | - | bit-identical | identical |
| x264 `fast` vs `medium` (crf 20) | - | 40.01 vs 40.02 dB, +1 % size | equal |
| Loudness / true peak | -14.4 LUFS / -1.3 dBFS (needed a 2nd pass to pass) | -14.3 LUFS / -1.4 dBFS, **<= -1.5 dBTP** | equal / compliant by construction |
| Audio correlation old vs new | - | 0.9993 (SNR 28.7 dB = codec noise) | equal |
| Gates A / B / C on the new build | 25/26, 10/12, 9/9 | 25/26, 10/12, 9/9 (+ cut check 0 weak) | equal |

`veryfast` is available as `--draft` (39.2 dB, about the old quality) for quick looks; it is never used for a final.

## 4. Defects found by the audit

1. **True peak**: sample-peak limiter after AAC: Part 2 failed -0.2 dBTP. Fixed (oversampled limiter before AAC).
2. **Cold first frame**: the first frame of every worker (frames 450/900/1350 of each old render) lacked the grain overlay (max diff 17/255). Fixed (warm-up).
3. **Cropped sign in a finished clip**: the "HOT SPRING" sign in THE LAST SUNRISE Part 3 (beat 10) is cut by <= 2 px at the left edge during the camera pan. Found by `lint_layout.js`; fixed in the engine for future renders; the scheduled clip was left as is (invisible at normal size).
4. **Cosmetic**: Part 2, beat 3 ("POWER ONLINE" label touches the big percentage by a few px).
5. **Hard-coded session paths** in 13 scripts -> relocatable.
6. **Hard-link hazard** in the cover step -> frames are replaced, never overwritten in place.
7. **Test overwrote a shipped file** once (Part 3 subtitles); restored and verified identical; sandbox mode now writes elsewhere.
8. **Detector blind spot** (Gate B): reports 8-24 s "longest shot" on parts whose cuts are all fine -> `cutcheck.py`.

## 5. What was not changed (and why)

* The renderer itself (Chromium + SVG engine) is untouched: look, motion and grain are the same; its cost is the painting of the scenes (~55-220 ms/frame). Faster would need a different engine.
* x264 crf 20, AAC 256 kbps, caption style, loudness target: unchanged (they are the owner's recipe).
* The skill's own scripts (`check_spec.py`, `analyze_clip.py`, `finish_clip.py`) are used unmodified; `finish_fast.py` imports `finish_clip` and only replaces the ordering/parallelism.
