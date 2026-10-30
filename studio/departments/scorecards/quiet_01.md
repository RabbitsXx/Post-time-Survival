# Scorecard quiet_01  (2026-10-30 12:33 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 97 | 70 | PASS |
| art | 79 | 70 | PASS |
| sound | 96 | 60 | PASS |
| editorial | 80 | 70 | PASS |
| marketing | 100 | 75 | PASS |
| legal | 100 | 95 | PASS |
| direction | 88 | 65 | PASS |
| writing | 96 | 65 | PASS |
| qc | 92 | 85 | PASS |

## story
* STORY/storylint(warn): a 2.5D lane location is used

## art
* ART: two locations have almost the same colour world (distance 10 < 14): give each place its own colour key
* LAYOUT: 6 person(s) cut by the frame edge, e.g. [(16, 'z_hoodie', 494), (18, 'z_dress', 478), (18, 'z_hoodie', 579), (19, 'z_hoodie', 685)]: reframe or move them inside x 40-410

## sound
* dead air 1.9 s between lines

## editorial
* EDITORIAL: 1 caption chunk(s) stop on a dangling word, e.g. ['SCREAMING ABOVE YOU,']: break captions at phrase boundaries
* EDITORIAL: 5 caption(s) on screen < 0.6 s [('IF YOU HEAR', 0.51), ('TWO.', 0.58), ('THREE.', 0.56)]
* EDITORIAL: 6 caption(s) read faster than 17 characters/s [('IF YOU HEAR', 21.4), ('SCREAMING ABOVE YOU,', 19.5), ("DON'T GO UP.", 17.5)]

## direction
* DIRECTION: more than 3 shots of the same size in a row (beats [9, 18, 19, 20, 21]): vary wide / medium / close
* DIRECTION: the same picture (place + size) holds for 10.4 s (> 6.5 s): cut, move the camera or change the subject

## writing
* WRITING: ren talks 3 lines in a row: break it with a reaction or action

## qc
* QC: total bitrate 4.5 Mbps (3-14)
