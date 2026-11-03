# PosttimeLowPoly — style bible (style inspiration only; no topics/scripts/titles/assets copied)

Research: vidIQ channel list of @LowPolyShorts (top 50 Shorts by views) + vidIQ scene walkthroughs of 3 clips
("A Cow With A Window" 25s, "Lemon Juice Bank Robbery" 30s, "He Wore Upside-Down Glasses For 124 Days" 33s). 30+5 credits used.

## What the reference does (observations)
- Length 25-50 s (best performers 25-41 s; 1 min clips exist but rank lower). ~2.5-2.9 words/s, i.e. 65-85 words per clip. Almost no silence.
- Titles: 3-7 words, deadpan, noun-phrase or "He/She + odd verb": "A Cow With A Window", "Lemon Juice Bank Robbery", "Why You Shouldn't ...". No clickbait punctuation.
- Hook: the weirdest fact stated in the first sentence, over a shot that already shows it (no intro, no "did you know").
- Structure: [weird premise] -> [straight-faced escalation, one beat per clause] -> [one punchline or an uncomfortable true twist] -> [one-line "why/so what"]. Jokes come from deadpan understatement and from the visual doing the dumb thing literally (face painted yellow, cow with a window). One voice-switched punchline line is allowed.
- Shots: 1-2.5 s average, a cut on nearly every clause. Mix: deadpan frontal close-up, wide demo shot, POV/inside-the-thing shot (camera inside the cow looking out), CCTV/diagram effect shots for "evidence". Camera is simple: static, slow push, 180 degree roll; no handheld.
- Look: PS1/early-PC low-poly, unfiltered low-res textures, saturated primaries, flat-ish light, simple environments (barn, bank lobby, street), characters = blocky rigid bodies with a fixed painted face. Occasional post effects only when they carry meaning (scanlines for CCTV, invert for "invisible").
- Narrator: one clear adult male/neutral voice, documentary-matter-of-fact, quick, slightly dry. Not hype.
- Captions: bold rounded sans, yellow fill + thick black outline, lower third (inside safe zone), 1-3 words pop-in synced to speech.
- Audio: light bouncy synth bed under voice, ducked; tactile cartoon foley on every action (snap, squelch, whoosh, thud), static click on CCTV cuts.
- Branding is diegetic and rare (name appears as a prop in the story, small watermark ~5 s in).

## Our version (PosttimeLowPoly) — decisions
- Format 1080x1920, 30 fps, 28-42 s (science/body) or ~50 s (history), 100-140 words, target 3.2-4.0 w/s, a new shot every 2-4 s (bursts ~1 s, explanation shots 4-6 s). Numbers corrected 2026-10-31 from the verified clip analysis below.
- Every clip = ONE true, source-checked fact/story. Source note per clip in `topics/<id>.md`. Keep claims narrow ("roughly", "according to ..."); no medical advice stated as fact; no real private individuals; no defamation of living people.
- Title 3-7 words, Title Case, deadpan. Cover: one big object/animal face, <=5 words, nothing in bottom 300 px, text inside centre square (COVER_GUIDE.md).
- Look: reuse free3d three.js PS1 renderer (NearestFilter textures, low res, fog, hard light) but with 3D low-poly primitives for animals/people/props (not 2D billboards). Palette per clip: 3 saturated hues + sky/ground; high-key daylight.
- Characters: capsule/box bodies, big blocky heads, painted-face texture (eyes, brows, mouth) swapped per shot for expression; animals from boxes/wedges. Idle bob + simple limb swing; heavy use of camera + cuts instead of complex animation.
- Voice: Google Chirp3-HD male (Charon/Fenrir class), rate ~1.05, plus one goofier second voice for the punchline when needed. Captions: yellow Bold, outline, 1-3 words, lower third at ~y 1250-1450 (above bottom 300 px).
- Audio: bed from score.py (bouncy), SFX from SFXLIB, loudnorm -14 LUFS, TP <= -1.5.
- No "AI generated" label. No copying of their topics: forbidden list kept in TOPICS.md ("already covered by reference": cow window, upside-down glasses, lemon juice robbery, meat shower, honey man, fake bus stop, paperclip->house, Toy Story 2, dolphins/pufferfish, etc.).
- QC gate per clip: contact sheet of every shot, framing/occlusion, numeric loudness+peak, caption proof, cover proof. Fix before sending.

## Verified against 7 clips (vidIQ scene walkthroughs, 2026-10-31)
Clips: LowPolyShorts "Why You Should Get A Cast" (16M), "The Ganzfeld Effect" (26M); PolySoldier "This MiG Flew Into NATO With No Pilot" (1M, 11.5K views/h), "They Buried The Kamikaze Who Hit Them" (923K); 3D Poly Films "The Bizarre Biology Of The Dive Reflex"; Internet Bias "IT TAKES MUSCLES FOR WHAT?" (6.2M, stick figure, not low-poly); our own The Pig War v3.
Confirmed (seen in several clips): shot 1 shows what sentence 1 says; one picture per clause, literal or exaggerated (brain with huge eyes, cow in VR goggles); diagram/X-ray/map shots alternate with character shots; yellow call-out labels with arrows, date stamps, big number pop-ups; a recurring character (red jacket + jeans on LowPolyShorts, suit + shades on 3D Poly Films); the ending is a picture (twist reveal, fourth-wall stare, absurd demo), not a moral; foley on every action; branding is a small watermark ~6-17 s in; "If you <weird thing>, ..." opening and a "You see," pivot in the science clips.
Corrected numbers: words/s 3.6-4.3 in the references (Cast 4.1, Ganzfeld 4.0, Kamikaze 4.2, MiG 4.3, Dive Reflex 3.6), Pig War v3 3.2; shot length 2-4 s with 1 s bursts and 4-6 s explanation shots; history clips ~50-56 s, science clips 28-42 s.
Weak spots found in Pig War v3: three RPG text boxes in <4 s (slow readers lose the $10/$100 joke), one shot with no character (0:03-0:04), no recurring character on screen.
Limits: summaries came from vidIQ's video analysis, not frame-by-frame viewing; n = 7.
