# Scorecard lastfloor_01  (2026-10-30 05:44 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 100 | 70 | PASS |
| art | 70 | 70 | PASS |
| sound | 66 | 60 | PASS |
| editorial | 58 | 70 | **FIX** |
| marketing | 94 | 75 | PASS |
| legal | 100 | 95 | PASS |

## art
* ART: the bottom fifth of the picture is a flat black band in 6/13 scene beats (the set stops at y=720 of the 800 px window): extend floors / ground / walls below the horizon
* ART: two locations have almost the same colour world (distance 9 < 14): give each place its own colour key
* LAYOUT: 4 person(s) cut by the frame edge, e.g. [(8, 'bell', 14), (8, 'zara', -22), (11, 'omar', 444), (12, 'bell', 3)]: reframe or move them inside x 40-410

## sound
* speaker loudness spread 4.5 dB (> 4): one voice is much quieter/louder than another
* voices ann and omar sound alike (f0 150 vs 145 Hz): recast or pitch-shift one
* zara: during speech the bed (music+sfx) is -3.9 dB relative to the voice (must be <= -6): the voice is not on top
* zara: 187 wpm (115-170)
* ann: during speech the bed (music+sfx) is -3.4 dB relative to the voice (must be <= -6): the voice is not on top

## editorial
* EDITORIAL: 6 caption chunk(s) stop on a dangling word, e.g. ['I ORDERED A', 'THIS IS', 'THEN WE', 'A PAN IS']: break captions at phrase boundaries
* EDITORIAL: 9 caption(s) on screen < 0.6 s [('THIS IS', 0.48), ('PART ONE', 0.54), ('THEN WE', 0.43)]
* EDITORIAL: 4 caption(s) read faster than 17 characters/s [('OPEN THE DOOR!', 24.8), ('OPEN THE DOOR!', 20.4), ('SOMETHING', 22.1)]
* EDITORIAL: announcer card beat 1 is 6.0 s (> 4 s) of a static screen: shorten the announcement or animate the card

## marketing
* MARKETING: YouTube title is 86 chars (> 70): it will be cut on phones
