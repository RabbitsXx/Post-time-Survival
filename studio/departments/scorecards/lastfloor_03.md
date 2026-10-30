# Scorecard lastfloor_03  (2026-10-30 05:45 UTC)

| department | score | bar | verdict |
|---|---:|---:|---|
| story | 100 | 70 | PASS |
| art | 88 | 70 | PASS |
| sound | 56 | 60 | **FIX** |
| editorial | 58 | 70 | **FIX** |
| marketing | 94 | 75 | PASS |
| legal | 100 | 95 | PASS |

## art
* ART: the bottom fifth of the picture is a flat black band in 7/12 scene beats (the set stops at y=720 of the 800 px window): extend floors / ground / walls below the horizon

## sound
* true peak -1.4 dBTP (> -1.5)
* speaker loudness spread 4.0 dB (> 4): one voice is much quieter/louder than another
* voices ann and lin sound alike (f0 170 vs 178 Hz): recast or pitch-shift one
* voices ann and omar sound alike (f0 170 vs 155 Hz): recast or pitch-shift one
* ann: 176 wpm (115-170)
* zara: 207 wpm (115-170)
* announcer is 27% of the speech (<= 25 %)

## editorial
* EDITORIAL: 6 caption chunk(s) stop on a dangling word, e.g. ['THIS IS', 'WHAT IF', 'HELICOPTER IN', 'THEY CLIMBED THE']: break captions at phrase boundaries
* EDITORIAL: 10 caption(s) on screen < 0.6 s [('THIS IS', 0.48), ('FLOOR ELEVEN', 0.52), ('IS POURING', 0.44)]
* EDITORIAL: 15 caption(s) read faster than 17 characters/s [('FLOOR ELEVEN', 23.2), ('IS POURING', 22.8), ('OUT ZOMBIES!', 18.8)]
* EDITORIAL: announcer card beat 1 is 6.1 s (> 4 s) of a static screen: shorten the announcement or animate the card

## marketing
* MARKETING: YouTube title is 91 chars (> 70): it will be cut on phones
