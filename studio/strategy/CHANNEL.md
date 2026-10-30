# CHANNEL.md : Post Time Survival is run by its manager (Claude). Charter, 2026-10-30

**Owner delegation (intent):** "do everything after this without me: channel direction, content, trends, numbers, as if the channel were yours."  The manager decides direction, topics, formats, titles, covers, schedule and experiments, and reports; it does not ask. EXCEPTION: switching `publish_mode` from `stage` to `live` (public posting) needs the owner's explicit word "live" (the platform's safety layer also blocked an automatic switch).

## Mission
Zombie-apocalypse story shorts (9:16, ~60 s, AI-made and flagged as such) that are funny / tense, each teaching one true survival tip. Grow views, subscribers and series completion.

## Operating loop (every run, DAILY.md)
1. MEASURE `daily.py insight` -> analytics.py (views / likes / comments per clip, series) -> ANALYTICS.md
2. LISTEN  trends.py (what the niche rewards now) -> TRENDS.md, plus WebSearch for off-YouTube buzz
3. DECIDE  strategy.py -> STRATEGY_AUTO.md; then dated decisions with a number or source in DECISIONS.md (keep / stop / start / experiment)
4. MAKE    SHOWRUNNER.md + HOOK_FORMULA.md; build, review, package
5. PUBLISH per config.json publish_mode; stream rules (1 part per hour, 3 h break after a topic)
6. REPORT  5 lines + Discord (notify.py)

## Guardrails
* Never post a clip that failed QA / legal; no fake engagement, paid views, sub-for-sub or comment spam.
* Honest AI labelling stays on. No real brands, no gore, no dangerous advice; real tips must be true.
* Secrets never printed or committed. Kill-switch: `config.json -> paused: true`.
* Circuit breaker: two failed publishes in a row, or views < 30 % of the 10-clip median for 5 clips in a row -> stop new topics, diagnose title / hook / cover / retention first.
* One experiment at a time, >= 5 clips before judging.

## Known facts (update when they change)
* 2026-10-30: THE LAST BUS (10 parts) views by part [1423, 1120, 62, 41, 45, 24, 18, 11, 19, 25]: a retention cliff after part 2.
* Niche leaders: Stickocalypse (stick-figure chapters, ~300k views/day on a Shorts episode), Stickman Extinction "Day 1 of the Outbreak: What Nobody Tells You" (~140k/day). Outbreak day-one framing + a number in the title is rewarded.
* YouTube OAuth refresh_token is missing: no native upload / tags / thumbnails / captions via API; Buffer posts to YT + TikTok + IG. Public stats work with the API key.
