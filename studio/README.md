# studio - the Post Time Survival clip factory

Script -> narration -> animated scenes -> finished 60 s vertical clip -> QA -> covers/subtitles -> scheduled on YouTube + TikTok + Instagram.

```
parts_<series>.py  (the story)  ──►  make_part.py N  ──►  ser/pN/final.mp4  ──►  package.py  ──►  git push  ──►  publish.py  ──►  post_status.py
                                     │ lint story  lint layout  render(cache)  cover  music  finish  subtitles  QA │
```

## Requirements
ffmpeg, python3 (numpy, Pillow, requests), node + a global `playwright` with Chromium (`npm i -g playwright`), the story-chain skill scripts
(`check_spec.py`, `analyze_clip.py`, `finish_clip.py`) in `zip2/story-chain-short/scripts/` or `STORY_CHAIN_SCRIPTS=/path`.
Secrets (never commit): `post.env` next to `ser/` with `GEMINI_API_KEY=` (Google Cloud TTS) and `Buffer_API_POST_TIME=`, or the env vars `GEMINI_API_KEY`, `BUFFER_TOKEN`.

## Everyday commands (run from this folder)
```bash
python3 ser/make_part.py 13                 # one part, script to final.mp4 + QA report (about 2 min)
python3 ser/make_part.py 13 --draft         # quick look: x264 veryfast, no QA
python3 ser/make_part.py 13 --only finish   # captions/audio changed, pictures did not (about 30 s)
python3 ser/make_series.py 11 12 13 14 15   # several parts, TTS and QA overlapped with the renders
python3 ser/lint_story.py 13                # script rules only (< 1 s)
node v3/lint_layout.js 13                   # run inside v3/: cropped / overlapping text (needs ser/p13/spec.json)
python3 ser/qa_all.py 13                    # all gates in parallel -> ser/p13/qa_report.txt, chk/sheet13.png
python3 ser/package.py sunrise              # finals + covers + subtitles -> repo releases/ + PUBLISH_KIT.md
python3 ser/publish.py sunrise --sha <commit> --start 2026-10-28T20:50:00Z --dry-run   # then without --dry-run
python3 ser/post_status.py ser/scheduled_sunrise.json
```
Sandbox: `PART_SRC=13 python3 ser/make_part.py 23` builds folder `p23` from part 13's script and never writes a deliverable.

## New series
1. `ser/series.py`: add an entry (own id block, e.g. 21-25) + `parts_<name>.py`, `meta_<name>.py`, `th_<name>.py`.
2. Write the script from the menu in `SCENES.md` (regenerate with `python3 ser/scene_catalog.py`); add scenes in new `v3/lib_<name>N.js` files and list them in `v3/master2.html` (+ `defs...()` call). Characters: palettes in `v3/kit2.js` (`KWHO`).
3. Put the cover recipe in the part dict (`cover=dict(beat=..,fr=..,main="LINE1|LINE2",accent=1,box="...")`).
4. `python3 ser/make_part.py <id>` until the QA report says PASS and the contact sheet looks right.

## Rules that are enforced for you
See `LESSONS.md` (why) and `AUDIT.md` (what was measured). Short version: a cut every 3-4 s, 105-128 words, calm voice (auto-rate), nothing cropped or under the caption band, true-peak <= -1.5 dBTP, covers on every platform, repo public until the last post is out.

## 16:9 long-form
`long/` is the factory for 5-15 minute 1920x1080 videos with several voices, lip-sync, a pixel-art game skin and meme editing (first use: HOW TO SURVIVE A ZOMBIE APOCALYPSE). See `long/README.md`.

## Standing rule: YouTube tags
Every video gets YouTube tags. Buffer cannot set them, so `publish.py` checks `YT_TAGS` in the series meta (>= 8 tags, <= 500 chars), refuses to schedule without it and writes `ser/youtube_tags_<series>.md` to paste in Studio after the post.
