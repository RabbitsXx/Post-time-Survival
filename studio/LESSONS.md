# Lessons learned (THE LIGHTHOUSE 2-5 rework + THE LAST SUNRISE 1-5)

Every rule below comes from something that was rejected, broke, or cost a re-render. Each one now has an automatic guard (the "Guard" column), so it is not left to memory.

## 1. Story and pacing

| Rule | Why (what went wrong) | Guard |
|---|---|---|
| A cut about every 3-4 s: 15-17 beats per 60 s, avg shot 3.0-4.2 s, none < 1.9 s, none > 5.8 s | First Parts 2-5 cut every 0.4-2 s: "dizzy". Owner: "อย่าตัดภาพบ่อยเกินไปโดยไม่จำเป็น เอาเป็นทุก 3-4 วิพอ" | Gate C `pacing_check.py` |
| One beat = one sentence, 2-3 caption chunks | Many tiny beats = flicker | `lint_story.py` |
| 105-128 spoken words per part (incl. the "Part N. ... Follow" teaser), 6-9 words per beat | > 140 words forces fast speech; < 100 leaves dead air at the end | `lint_story.py` (error > 140) |
| No two full sentences in one beat; use commas | The TTS pauses ~0.6-0.8 s after every full stop, so "Day three. Snow falls in the dark." became a 5.4 s shot | `lint_story.py` warns |
| Captions <= 5 words, one accent colour, UPPER CASE | Gate A, readability | `lint_story.py` |
| The hook ends open (a question or an unfinished line) | Gate A "hook leaves a question open" | `lint_story.py` warns |
| Problem -> solution -> new problem; every part ends on a cliffhanger + next-part hook | Skill recipe; keeps people for the next part | Gate A + `lint_story.py` |
| Concrete props for every line (a door that becomes a sled, an alternator, a bowl of sprouts), numbers, rule cards, a companion (the dog) | The reference clip is fun because every sentence is *shown*, never abstract | review of the contact sheet |
| Never put the same scene twice in a row, and avoid 4 beats using only 2 scene types | A scene restart reads as "no cut" (Gate B's detector misses it too) or as a jump back | `lint_story.py` + `cutcheck.py` |
| Check the premise for plausibility before building scenes | "A probe near the sun warns Earth 8 minutes early" is physically impossible (nothing outruns light). Caught while writing, not after rendering | author's checklist |

## 2. Narration (TTS)

* Voice: Google Cloud TTS `en-US-Chirp3-HD-Fenrir`; native `speakingRate` 0.78-0.88; **never speed up or atempo** the audio.
* The speed depends on the *text* (short punchy words read faster): the same rate gave 142 wpm in one part and 172 wpm in another. **Auto-rate** (`build_spec2.py`) now tunes the rate so that gaps land in 0.55-0.78 s and talking speed <= 158 wpm (it converged in 2 tries; by hand it took 4-5).
* The TTS is not deterministic between calls: two syntheses of the same text differ by a few hundred ms. Cache by hash (done) and **never re-synthesize a part you have already approved** unless the text changed.
* Sentence boundaries for cuts are placed at the audio's energy minima; a cut needs >= 1.0 s since the previous cut, a caption change >= 0.5 s.

## 3. Layout (what the viewer actually sees)

* Frame 720x1280, but the engine zooms the layers ~1.1x, so **live content must stay inside x 40-680**; anything wider gets cropped (we shipped "−17°C" cut at the right edge in a draft, "EAGLE HOT SPRING" cut at the left, "LAST LIGHT" clipped).
* Captions sit at 64 % height (band y 742-922). Faces, props and labels go **above y 740**; the lower third is for ground/foreground only. Silhouette crowds may overlap the band.
* Long labels overflow their pills: size the pill from the text length (`chip()`), keep chips <= 20 characters.
* Close-up face scenes: never let a scarf/collar shape read as a "bib"; check the contact sheet at real size.
* **Guard: `lint_layout.js`** measures every `<text>` box in the real engine at 12 %, 50 % and 92 % of each beat and reports CROP / OVERLAP / BAND / EDGE before any render (10 s). It found a real 2 px crop that had slipped through into a published-ready clip.

## 4. Engine and scene authoring

* A scene is `LIB.name=(Z,p)=>{ ...build once...; return (u,t,bt)=>{ ...update... } }`; the update must be a pure function of `(u,t,bt)`. Frames can then be rendered in any order, in any worker, and cached.
* Chromium promotes animated layers after a few frames, so the same frame can differ by +-1 level on a few pixels depending on history (about 14 % of frames). It is invisible (>= 56 dB PSNR) but means "byte-identical" is the wrong test; use PSNR >= 50 dB.
* The first screenshot of a fresh page lacks the grain overlay (max diff 17/255 on a few pixels). Workers now burn a warm-up frame.
* Cost per frame is dominated by SVG painting (blur filters, hundreds of pine/window paths): `trek` ~200 ms, `sunSky` ~180 ms, `town` ~200 ms vs `scard`/`thermo` ~55 ms. Reuse cheap scenes where the picture allows it; do not add full-layer filters.
* Palette for a new series: define per-character palettes in `kit2.js` (`KWHO`), reuse the keeper rig; keep one companion character on screen as often as the story allows.

## 5. Audio mastering

* The audio chain: bed (sfx) + music + voice with sidechain ducking -> 2-pass loudnorm -14 LUFS -> **true-peak** limiter (4x oversampled) -> AAC once.
* A sample-peak limiter is not enough: Part 2 measured -0.2 dBTP after AAC although its samples peaked at -1.7 dB (inter-sample peaks, the TTS file itself is near full scale). The limiter now oversamples to 176.4 kHz before limiting; result -1.4 to -1.6 dBTP on every part.
* One AAC generation instead of two (the old chain re-encoded the audio in a separate `limit.sh` step).

## 6. QA

* Three gates + one check, all in `qa_all.py` (parallel, ~20 s): A `check_spec`, B `analyze_clip`, C `pacing_check` (our viewer-comfort gate), D `cutcheck` (picture change at every cut).
* Two results are *accepted by design*: Gate A "avg beat length <= 2 s" and Gate B "avg shot length <= 2 s" encode the skill's reference clip (1.4 s cuts); the owner asked for 3-4 s.
* Gate B's cut detector under-counts cuts between similar/dark scenes (it reports 8-24 s "longest shot"). `cutcheck.py` measures the real frame difference at each planned cut and flags < 14/255.
* Always look at the contact sheet of the *real* video (`chk/sheetN.png`), not only at the previews.

## 7. Operations and publishing

* Post to YouTube + TikTok + Instagram **together**; covers on every platform. IG/TikTok take the cover from the embedded first frames via `thumbnailOffset 50 ms`; Buffer cannot set a YouTube thumbnail, so those are uploaded by hand (files provided).
* Buffer fetches the video from `raw.githubusercontent.com/.../<commit sha>/...`: the **repo must stay public until the last scheduled post has gone out**. `publish.py` checks every URL (HTTP 200, same size) before it schedules anything.
* Schedule, do not post, until the owner has watched the clips; scheduled posts can be deleted.
* After each scheduled time, verify with `post_status.py scheduled_<series>.json` (one command instead of hand-written queries); re-create a failed post with `publish.py ... --parts N --now-first`.
* **Persist the toolchain**: the working folder of a cloud session is ephemeral. The whole studio (engine, scripts, scene catalogue, docs) is committed under `studio/` in the repo. Secrets (`post.env`: TTS key, Buffer token; OAuth files) are never committed.
* Never test on shipped parts: `PART_SRC=13 python3 ser/make_part.py 23` builds a sandbox folder from part 13's script and writes no deliverable (a test of mine once overwrote a shipped subtitle file; it was restored and verified byte-identical, and the script now refuses to).

## 8. Incidents -> guards

| Incident | Cause | Guard now |
|---|---|---|
| Narration too fast, cuts too frequent | no numeric pacing target | Gate C + lint_story |
| Text covering the picture, cropped labels | no layout check | lint_layout.js, contact sheet |
| True peak -0.2 dBTP on Part 2 | sample-peak limiter after AAC | oversampled limiter before AAC |
| Part 5 captions > 5 words | manual review only | lint_story |
| Mis-labelled infographics ("40 FT" on a 12 ft scene, "DAY 1" on a tide chart) | copy-pasted card text | reviewed per beat in the sheet; params are named, not free text |
| 4-5 hand rebuilds to find a speaking rate | rate depends on the text | auto-rate |
| Whole part re-rendered (100 s) for a 1-scene fix, 14 times in this project | no per-beat cache | `render_part.py` cache (19 s for a 4-beat fix, 0 s when nothing changed) |
| Dark scene -> dark scene read as "no cut" | detector blind spot | `cutcheck.py`, lint_story same-scene rule |
| Toolchain would be lost with the container | scripts only in the temp folder | `studio/` in the repo |
