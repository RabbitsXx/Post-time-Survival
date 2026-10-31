# Studio roles: job descriptions and professional standards

A role exists only if it has (1) a craft standard from the animation / TV industry, (2) a deliverable, (3) a measurable test that runs automatically, (4) a sign-off gate, (5) a way to get better. "Audit" = the script that checks it; "Owner" = the part of the toolchain that must be fixed when the test fails.

## Development
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **Showrunner** | audience-first (SHOWRUNNER.md); owns taste and the final yes | idea round, pitch, series bible | `pitchlint.py` (>= 32/45, fields complete, no cliches) |
| **Head writer** | three-act per part, want / flaw / signature move per hero, set pieces first, rule of three for gags, every part ends on a question | beat sheet with storyboard line per beat | `storylint.py` (solo >= 30 %, group <= 35 %, >= 3 fights, wide-first, continuity, arc) |
| **Story editor / script doctor** | dialogue is voice-specific (no line could be anyone's), subtext, 6-9 words per line, no exposition dumps | table-read notes | `dialoguelint.py` (distinct voices, line length, adjacent same speaker, catchphrase use) |
| **Survival consultant** | the tip is TRUE, SAFE and decides the climax; cites a real-world source in the bible | tip card with source + safety note | `audit_brand.py` (dangerous-advice list) + pitch rule "the tip wins" |

## Pre-production
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **Director / storyboard artist** | film grammar: establishing wide first, shot-size ladder (wide > medium > close, no jumps > 2.4x), 180-degree rule, eyelines, cut on action, headroom, variety (no 4 same-size shots in a row) | storyboard sheet + timing (animatic) | `shotlint.py` (direction score) |
| **Art director** | one colour key per place (colour script), one memorable object per place, readable silhouettes, light direction, no dead areas | style guide + colour script strip | `audit_visual.py` (art) |
| **Character designer** | model sheets (front / side / back turnarounds + 6 expressions), consistent proportions across the cast, distinct silhouettes and palettes | `releases/<arc>/bible/model_sheet_<name>.png` | `model_sheet.py` (generated from the world data, reviewed by the same audits) |
| **Prop / set designer** | catalogue props with fit tags; scale consistent with people (a door = 1.4 x a person); reuse only where it fits | catalogue entries in `props.json` | `newness.py` prop-fit check |

## Production
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **Animator** | the 12 principles: anticipation, squash and stretch, follow-through, slow in / out, secondary action (breathing, blinks, cloth), appeal; every fight has wind-up, hit, reaction, joke | motion in every shot | `audit_visual.py` (animation), `storylint.py` (fight beats), fight helper |
| **Layout / camera** | continuous staging (`Scene` tracker), consistent scale, screen direction | shot positions | continuity lint, `shotlint.py` |
| **VFX** | impacts, steam, flash, dust: short, readable, in the frame's safe zone | stickers / FX kinds | foley + visual audit |
| **Technical director** | deterministic renders, frame cache, 1080x1920 delivery, per-clip build log, regression test on golden clips | engine + `build_clip.py` | golden clips must keep their scores |

## Audio
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **Voice director / casting** | each character at its own fundamental (target f0 table), pace 125-165 wpm, loudness matched | cast table with f0 / rate | `audit_sound.py`, `pitch.py` auto-casting |
| **Sound designer** | spotting session: every visible action has a sound (footsteps by surface, impacts by material, props, doors), room tone per place, panned to the picture | `foley.py` events | foley coverage check |
| **Composer** | a theme per hero, a texture per mood, stingers and risers at mood changes, intensity curve to the ending | `score.py` | music-variety + brightness checks |
| **Re-recording mixer** | voice always on top (bed <= -6 dB under speech), -14 LUFS, true peak <= -1.5 dBTP, no clipping | final mix | `audit_sound.py`, `qc_final.py` |

## Post
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **Editor** | a pattern interrupt every 3-4 s, captions break at phrase boundaries, >= 0.6 s, <= 17 chars/s, announcer card <= 4 s | picture lock | `audit_editorial.py` |
| **Finishing** | 1080x1920 / 30 fps / H.264 High 8-12 Mbps, cover embedded as frame 0, burned captions inside platform safe zones | master file | `qc_final.py` |
| **Localisation** | EN + TH subtitles, same cue count, Thai script present, reading speed | `captions_en.srt`, `captions_th.srt` | editorial audit |

## Quality control, legal, marketing, production management
| role | craft standard | deliverable | audit / gate |
|---|---|---|---|
| **QC supervisor** | technical checklist on the FINAL file (spec, loudness, black / frozen frames, first frame = cover, subtitle timing) | QC report | `qc_final.py` (hard gate) |
| **Legal / brand safety** | no real brand, person, URL, unsafe advice anywhere (dialogue, signs, props, copy) | clearance | `audit_brand.py` (hard gate >= 95) |
| **Marketing / packaging** | share line is the title (<= 70 chars incl. "Part n"), thumbnail with a face / action and strong colour, description with hook, tip, question, next-part link, #shorts | publish kit | `audit_publish.py` |
| **Community / analytics** | reads comments and (when the credentials exist) watch time / retention; turns findings into LESSONS and backlog items | weekly note | `improve.py` |
| **Line producer** | schedule (1 part / hour, 3 h topic break, 24 h ahead), cost per clip (build minutes), failure log | `DASHBOARD.md`, `build_log.jsonl` | `producer_dashboard.py` |
| **Pipeline TD** | everything above is code, reproducible by a fresh session; no manual step | `daily.py`, `studio_review.py` | `daily.py ready` |

## Standing improvement loop for every role
Each review appends to `kpi/history.jsonl`; `improve.py` ranks recurring failures into `BACKLOG.md`; the run FIRST fixes the top items at the cause, re-reviews the golden clips, and records what it learned in `studio/LESSONS.md`. Bars ratchet up by themselves (`thresholds.json`). A role never "accepts" a recurring warning.
