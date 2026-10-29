# studio/long : the 16:9 long-form factory (HOW TO SURVIVE A ZOMBIE APOCALYPSE)

Same idea as `studio/` (HTML/SVG engine -> Chromium frames -> ffmpeg), re-built for **1920x1080, 5-15 minutes, several voices, lip-sync and meme editing**.

```
script_how.py   the whole script as data: beats = spoken lines + scene + skin + fx + sfx + music mood
build16.py      TTS (Google Chirp3-HD, cached) -> timeline from the real speech -> p/spec.js (engine), spec.json, voice.wav, sfx.json, mood.json, cues_en.json, lip-sync envelopes
engine.html     1280x720 stage: layers far/mid/near/hud (+ crisp overlay for fx and captions). kit.js/kit2.js (keeper rig), chars16.js (Coach Dex, Steve, Maya, horde), dog16.js (Respawn),
                locs16.js (9 locations), scenes16.js (stage = location + actors + props + game HUD), cards16.js (title/level/ab/rule/stat/sponsor/loading/inventory/scale/list/score/recap/end),
                fx16.js (stickers, YOU DIED, achievement toast, popup, keycap, like button, ring, vhs rewind, glitch, speed lines, PiP radio...), core16.js (camera, captions, game-skin rasteriser)
render16.py     per-beat frame cache + 4 persistent Chromium workers (worker16.js).  --dsf 1.5 = 1920x1080 (CDP clip scale), --beats a-b, --trust
audio16.py      music (5 moods, crossfaded per beat) + 34 comedic SFX, all numpy
finish16.py     mix (voice HP+compressor, music ducked by the voice, SFX), 2-pass loudnorm -14 LUFS, oversampled true-peak limiter, AAC; x264 crf 18, BT.709
lint16.js       layout lint on the real engine (CROP / OVERLAP / BAND / EDGE)       qa16.py  all gates
kit16.py        EN + TH subtitles, chapters, YouTube publish kit                    thumbs16.py  three cover variants (1920x1080 JPEG < 2 MB)
```

Run order: `python3 build16.py script_how p` -> `python3 audio16.py p` -> `python3 render16.py --dsf 1.5` -> `python3 finish16.py` -> `python3 qa16.py` -> `python3 kit16.py` -> `python3 thumbs16.py`.
Secrets: the TTS key comes from `GEMINI_API_KEY` (env) or `post.env` (never committed).

## Game vs real life is a rendering switch
`beat.skin = 'game'`: the SVG scene is rasterised at 384x216 in the page, posterised to 7 levels per channel with a 4x4 Bayer dither and shown with `image-rendering: pixelated`
(so every game beat is real pixel art, camera moves included), HUD (DEATHS counter, LV, HP) is part of the scene.  `skin = 'real'`: crisp vector, desaturated, graded, film grain, vignette, handheld camera.
Captions and meme overlays live in a separate crisp overlay in both skins.

## Lessons from this build
* `Page.captureScreenshot` through a raw CDP session ignores the context's deviceScaleFactor: pass `clip:{scale}` (1.5 -> 1920x1080).
* Serialising the SVG for the pixel pass copies `visibility:hidden` from the previous frame: reset it before rasterising (second game frame in a row came out black).
* `keeper()` uses `o.x||360`: x=0 is falsy, pass 0.01.
* Fit text with `getBBox()` and scale about the **anchor** (start-anchored text scaled about its centre slid out of the card).
* Sort render chunks by beat, not by size: a crash otherwise leaves every beat half-rendered and the cache useless.  render16 only renders missing frames now.
* Beat length comes from the speech (lead 0.08 + sentences + tail 0.34): one sentence per beat keeps the average cut at ~3.9 s; split any beat > 6 s into two shots.

---

# THE LAST BUS : the 9:16 story engine (v9)

Shorts are **Story**, long videos are questions / how-to.  THE LAST BUS (10 parts, 55-81 s each, 720x1280) is the first series built on the vertical dialogue engine in this folder.
Story bible, clock, cast, clue ledger and real survival tips: `LASTBUS_story_bible.md`.  Finished videos, EN + TH captions, covers and publish text: `releases/last-bus/partN/`.

```
buslib.py / zlib9.py   the script DSL (stage, cu/two/wide/cab/pov/ext, card, sticker, zoom, shake...) + the cast seating plan, voices and subtitle speaker names
script_bus1..10.py     one script per part: lines, shots, sfx, cards.  Every part opens with the series chip + BUS-E's spoken "Part n of 10: <topic>" and ends with the next stop
th_bus.py              Thai subtitle lines for all 10 parts
build16.py             (patched) multi-speaker TTS (Chirp3-HD, one voice + filter per character), per-speaker lip-sync envelopes, captions 3 words / 17 chars
audio9.py              music moods (idle/creep/comic/chase/sad, all with an engine rumble) + 37 SFX
engine9.html           vertical stage: world stays 1280x720, the frame is a 450x800 window (view x,y,z, pans); core9.js camera/captions, kit9.js (rig), pax9.js (12 passengers + BUS-E), locs9.js (bus cutaway, exteriors,
                       windshield POV, diner), scenes9.js (props), cards9.js (PA display, suspect board, siphon, bite-vs-scratch, finale...), fx9.js (series chip, route line, beam, chyron, died...)
render9.py / worker9.js  per-beat frame cache, 4 Chromium workers, CDP clip scale 1.6 -> 720x1280
finish9.py             mix + 2-pass loudnorm -14 LUFS, true-peak limiter, x264 crf 18 BT.709
embed9.py / cover9.py  covers: cover9.py draws them, embed9.py puts the cover into the first 4 frames (IG/TikTok take it from there)
lint9.js / qa9.py      layout lint on the real engine + gates A pacing, S standing rules, F fun audit, B lint, C/D/E video/audio/cuts, H cover embedded
kit9.py                release kit (captions, covers, PUBLISH.md, YouTube tags)       ../analysis/fun_audit*.py  the "why was it not fun" comparison
```

Run order for part N: `./run9.sh N` (audio -> frames -> mix) -> `python3 embed9.py N` -> `python3 qa9.py` -> `python3 kit9.py`.
Screen safe zones (frame y): top bar < 88, captions at y 524 (band 464-576), bottom UI > 690; cards force the view to the centre.

## Lessons from this build
* A "fun audit" beats guessing: count viewer address, banter, sentence-length spread, silence, SFX per minute, characters on screen, voices and speaker changes. The old shorts were narration over empty scenes (character on screen 14 %); the new series is 96 %.
* One voice + one filter per character (muffled for the mascot suit, PA filter for BUS-E) makes dialogue readable without labels; captions still carry a coloured speaker name.
* Give the mystery a clue ledger first (symptom list in Part 1, every clue Rosa shows is listed with its part number) so every part is a complete story *and* a step of the whole.
* Pre-produced series cannot react to votes or comments: ask for guesses to drive comments, never promise to change the story.
