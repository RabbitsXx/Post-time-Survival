# Post Time Survival Studio: the departments

The channel is run like a small animation studio. Every department has (1) a standard written down, (2) an automatic audit that MEASURES it on every finished clip, (3) a bar the clip must clear,
(4) a place where its recurring problems are collected and fixed at the cause. Nobody has to supervise: `studio_review.py` runs after every build, `improve.py` turns the findings into
`BACKLOG.md`, and the next run fixes the toolchain first, then makes new episodes. Bars rise by themselves when the studio keeps beating them (see `thresholds.json`).

| department | owns | standard | audit | bar |
|---|---|---|---|---|
| Story (writers' room) | premise, arc, jokes, the real survival tip, stakes, cliffhangers, newness (new world / cast / device / gag / tip) | `studio/autopilot/DAILY.md` + `studio/long/LIBRARY.md`; storyboard line on every beat | `long/storylint.py`, `long/newness.py` | story |
| Layout & Storyboard | shot design, continuity, screen direction, framing, scale of people vs sets | `Scene` tracker in `worldlib.py`; wide establishing shot first; nobody cut by the frame | `audit_visual.py` (layout part) + continuity lint | art |
| Art (backgrounds, props, characters, colour, light) | locations, catalogue props, colour key per place, lighting | every place has its own colour key; no black bands; readable silhouettes | `audit_visual.py` (art part) | art |
| Animation | motion, acting, turns, walk / run, secondary motion | people move on screen in >= 60 % of the shots; no frozen shot > 3 s | `audit_visual.py` (static shots) | art |
| Sound | voices, SFX, music, mix | voice always on top (bed <= -6 dB under speech), every speaker distinguishable, levelled lines, -14 LUFS, true peak <= -1.5 | `audit_sound.py` | sound |
| Editorial | cuts, captions, subtitles EN/TH, pacing | captions break at phrase boundaries, >= 0.6 s on screen, <= 17 chars/s, announcer card <= 4 s | `audit_editorial.py` | editorial |
| Marketing & Publishing | titles, covers, descriptions, tags, schedule | title <= 70 chars, "Part n", 3+ hashtags incl #shorts, question, next-part line, colourful cover | `audit_publish.py` | marketing |
| Legal & Brand safety | trademarks, real people, unsafe advice, URLs | no real brand anywhere (dialogue, props, signs, copy); no dangerous survival advice | `audit_brand.py` | legal |
| Producer (showrunner) | schedule, backlog, budget, the stream | 1 part / hour, 3 h break per topic, queue 24 h ahead | `autopilot/daily.py`, `improve.py` | n/a |

## The loop (runs every 4 hours, unattended)
1. `daily.py status` -> `BACKLOG.md` first: fix the top 1-2 items AT THE CAUSE (engine, library, template, audit), re-review the golden clips (`lastfloor_01..03`) to prove nothing regressed.
2. Make the topics the stream needs (3 parts each). `daily.py build` = newness -> storylint -> voices -> render -> master -> cover -> QA -> `studio_review.py` (hard bars: legal >= 95, story >= 80; the rest are recorded and ratchet).
3. `daily.py publish` (complete topics only), `daily.py report`, commit, push.
4. If a department keeps failing the same check in 3 clips, the audit item is never "accepted": the cause gets fixed or the audit gets a better measurement (write why in `studio/LESSONS.md`).

## Adding a check
Write the measurement as code in the department's `audit_*.py` (numbers, not opinions), give it a score cost, run `python3 studio_review.py <clip>` on the golden clips, commit.
