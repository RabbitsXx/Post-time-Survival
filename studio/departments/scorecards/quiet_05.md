# Scorecard quiet_05  (2026-10-30 16:44 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 97 | 72 | PASS |
| art | 85 | 70 | PASS |
| sound | 82 | 60 | PASS |
| editorial | 90 | 70 | PASS |
| marketing | 100 | 77 | PASS |
| legal | 100 | 95 | PASS |
| direction | 88 | 65 | PASS |
| writing | 91 | 65 | PASS |
| qc | 92 | 85 | PASS |

## story
* STORY/storylint(warn): a 2.5D lane location is used

## art
* LAYOUT: 9 person(s) cut by the frame edge, e.g. [(0, 'ren', 5), (5, 'z_dress', 493), (10, 'ren', 561), (10, 'gus', 874)]: reframe or move them inside x 40-410

## sound
* voices ren and ann sound alike (f0 132 vs 124 Hz): recast or pitch-shift one
* voices ren and gus sound alike (f0 132 vs 132 Hz): recast or pitch-shift one
* voices ann and gus sound alike (f0 124 vs 132 Hz): recast or pitch-shift one

## editorial
* EDITORIAL: 1 caption chunk(s) stop on a dangling word, e.g. ['FEVER IS NOT']: break captions at phrase boundaries
* EDITORIAL: 2 caption(s) on screen < 0.6 s [('TWO.', 0.56), ('THREE.', 0.57)]
* EDITORIAL: 1 caption(s) read faster than 17 characters/s [('ONE HUNDRED FORTY-EIGHT TO GO.', 17.9)]

## direction
* DIRECTION: more than 3 shots of the same size in a row (beats [9, 14, 15]): vary wide / medium / close
* DIRECTION: the same picture (place + size) holds for 11.8 s (> 6.5 s): cut, move the camera or change the subject

## writing
* WRITING: ren talks 3 lines in a row: break it with a reaction or action
* HOOK: no twist / reversal wording anywhere

## qc
* QC: total bitrate 4.3 Mbps (3-14)
