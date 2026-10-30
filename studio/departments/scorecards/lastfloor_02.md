# Scorecard lastfloor_02  (2026-10-30 05:45 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 100 | 70 | PASS |
| art | 82 | 70 | PASS |
| sound | 60 | 60 | PASS |
| editorial | 67 | 70 | **FIX** |
| marketing | 90 | 75 | PASS |
| legal | 100 | 95 | PASS |

## art
* ART: two locations have almost the same colour world (distance 10 < 14): give each place its own colour key
* LAYOUT: 4 person(s) cut by the frame edge, e.g. [(5, 'lin', 0), (10, 'bell', -15), (11, 'bell', -15), (13, 'lin', 0)]: reframe or move them inside x 40-410

## sound
* speaker loudness spread 4.8 dB (> 4): one voice is much quieter/louder than another
* voices ann and bell sound alike (f0 162 vs 162 Hz): recast or pitch-shift one
* voices lin and zara sound alike (f0 224 vs 213 Hz): recast or pitch-shift one
* omar: 106 wpm (115-170)
* ann: during speech the bed (music+sfx) is -3.6 dB relative to the voice (must be <= -6): the voice is not on top
* zara: during speech the bed (music+sfx) is -2.4 dB relative to the voice (must be <= -6): the voice is not on top

## editorial
* EDITORIAL: 2 caption chunk(s) stop on a dangling word, e.g. ['THIS IS', "SIX... THAT'S A"]: break captions at phrase boundaries
* EDITORIAL: 8 caption(s) on screen < 0.6 s [('THIS IS', 0.5), ('PART TWO', 0.56), ('I DID.', 0.59)]
* EDITORIAL: 5 caption(s) read faster than 17 characters/s [('KEEP CLIMBING.', 17.6), ('FLOOR FIVE.', 18.5), ('THE STAIRS', 22.9)]
* EDITORIAL: announcer card beat 1 is 6.2 s (> 4 s) of a static screen: shorten the announcement or animate the card
* EDITORIAL: scene beat 5 lasts 8.4 s (> 6.5 s)

## marketing
* MARKETING: YouTube title is 76 chars (> 70): it will be cut on phones
* MARKETING: cover_16x9.png is dull (colourfulness 29 < 30): thumbnails need a strong colour accent
