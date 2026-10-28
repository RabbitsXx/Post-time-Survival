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
