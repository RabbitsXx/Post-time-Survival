# Scorecard quiet_01  (2026-10-30 10:11 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 97 | 70 | PASS |
| art | 94 | 70 | PASS |
| sound | 100 | 60 | PASS |
| editorial | 80 | 70 | PASS |
| marketing | 100 | 75 | PASS |
| legal | 100 | 95 | PASS |
| direction | 88 | 65 | PASS |
| writing | 96 | 65 | PASS |
| qc | 92 | 85 | PASS |

## story
* STORY/storylint(warn): a 2.5D lane location is used

## art
* ART: two locations have almost the same colour world (distance 12 < 14): give each place its own colour key

## editorial
* EDITORIAL: 1 caption chunk(s) stop on a dangling word, e.g. ['SCREAMING ABOVE YOU,']: break captions at phrase boundaries
* EDITORIAL: 5 caption(s) on screen < 0.6 s [('IF YOU HEAR', 0.51), ('TWO.', 0.58), ('THREE.', 0.57)]
* EDITORIAL: 4 caption(s) read faster than 17 characters/s [('IF YOU HEAR', 21.5), ('SCREAMING ABOVE YOU,', 19.5), ("DON'T GO UP.", 17.5)]

## direction
* DIRECTION: more than 3 shots of the same size in a row (beats [4, 5, 6, 7, 8]): vary wide / medium / close
* DIRECTION: the same picture (place + size) holds for 19.0 s (> 6.5 s): cut, move the camera or change the subject

## writing
* WRITING: ren talks 3 lines in a row: break it with a reaction or action

## qc
* QC: total bitrate 4.3 Mbps (3-14)
