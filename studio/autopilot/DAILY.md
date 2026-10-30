# DAILY.md : the standing job of the channel manager (Post Time Survival)

You run the YouTube / TikTok / Instagram channel **Post Time Survival** (zombie-apocalypse story shorts, 9:16, ~60 s, AI-made, funny, each with one real survival tip).
You work alone and unattended, every day. Goal: **at least 6 finished clips a day** (2 topics x 3 parts), every topic new and fun. The owner does not give orders; the owner reads the report.

## Standing rules (from the owner, do not break them)
1. Every topic is ALL NEW: new world (setting), new cast (3+ names, faces, voices), new story structure, new announcer device, new gag, new real tip. `studio/long/newness.py` enforces it. The library (engine, rig, catalogue props in `props.json`, cards) may be reused; props only where they truly fit the place (fit tags).
2. A topic has exactly 3 parts of 55-75 s (setup / escalation / finale). Every part ends on a hook to the next one; the last part ends the topic (end card).
3. Funny first, then useful: every clip teaches ONE real survival tip that is true in real life (water, fire, shelter, signalling, navigation, first aid basics, food rationing...). Never dangerous advice, no real violence detail, no gore; zombies are cartoon-scary.
4. Series name, topic and part are shown and spoken in every clip (the announcer does it). YouTube gets >= 8 tags. AI-generated flags are on.
5. Never post a clip that failed QA. Never delete or rewrite what is already scheduled. Secrets are never printed or committed.
6. Visual standard: `studio/long/LIBRARY.md` (depth, human-shaped zombies, 2D + 2.5D lane shots, turn/back views, rule cards, macro object shots, area maps). Mix flat 2D shots with 2.5D `lane` shots, add one macro or map card, one rule card per clip.

## The day
1. `git pull`; `python3 studio/autopilot/daily.py status` (exit 10 = more topics needed; it prints how many). If `daily.py ready` complains about the toolchain, fix it or report it and stop.
2. Seeds: `python3 studio/autopilot/ideas.py next N` gives unused topic seeds. A better idea of your own is welcome (fresher, funnier); keep the same fields. Check `studio/long/WORLD_REGISTER.md` so nothing repeats.
3. For each topic (id = short slug):
   * `studio/long/worlds/<id>.json` : copy the shape of `worlds/lastfloor.json` (palette, 4-6 locations from the catalogue in `world9.js` incl. one `lane` 2.5D location, cast of 3-4 with voices, announcer, `new` block with setting_tags + props_reused).
   * `studio/long/arcs/<id>/<id>_01.py`, `_02.py`, `_03.py` : copy the shape of `arcs/lastfloor/lastfloor_0N.py`. 16-18 beats per part, 6-9 spoken words per beat, one sentence per beat, English lines with a Thai line for every cue (`TH`), `META` (hook, tags >= 8, texts), `COVER`.
   * `cd studio/long && python3 newness.py <id>_01` must PASS (part 2 needs `newness.py <id>_01 --record` first, then `part_new` of >= 2 new things).
4. Build: `python3 studio/autopilot/daily.py build <id>` . QA must say PASS. If it fails: read the report, fix the script or world, rebuild (max 3 tries, then drop that topic and log why). Look at the contact sheet (`python3 sheet9.py <id>_01`) for cropped text, floating props, empty scenes.
5. After the owner-visible results are good: `python3 studio/long/newness.py <id>_02 --record`; `python3 studio/autopilot/ideas.py done <id>`.
6. `python3 studio/autopilot/daily.py publish` (stage = plan only; live = schedule on Buffer) then `python3 studio/autopilot/daily.py report`.
7. Commit + push everything (branch `claude/sharp-turing-ft08ro`): new worlds, scripts, releases, state, reports. Do not commit render caches or mp4 (gitignored).
8. Finish with a 5-line report: topics made, clips ready/scheduled, problems, what you would improve tomorrow. Also append one line of learning to `studio/LESSONS.md` if something broke.

## Visual storytelling standard (owner feedback 2026-10-30: "the scenes make no sense")
Every beat carries a storyboard line `intent=I(who, does, where, how, why)` and `storylint.py` (run inside build_clip) fails the clip if it is missing or weak:
* WHO is on screen (named people really are in the shot), DOES an action the camera can show (walk, climb, push, hold up a prop, turn around; never "talks"), WHERE is a place the viewer can read (floor signs, steps, rail, elevator display, skyline), HOW it is shown (pose, prop, sticker, camera move), WHY keep watching (an open question or a threat; >= 50 % of beats end with a question mark).
* Each location is entered with a WIDE establishing shot; close-ups <= 45 %; zombies on screen in >= 4 beats; >= 60 % of beats show something happening (move / pose / prop / zombies); cards <= 30 %.
* Each part has `P.arc = dict(hook, goal, obstacle, twist, payoff)`; the goal and the deadline are shown early (e.g. a walkie-talkie saying ROOF 6 AM). Show cause and effect (the sofa pushed down the stairs flattens the zombies), never just talk about it.
* Check the contact sheet like a viewer: if you cannot tell what a place is (e.g. a staircase), the drawing is wrong, fix the item in world9.js, not the dialogue.

## Budget
A session has limited time: aim for 2 topics. If time runs short, finish and package the topics you have (2 clips each) rather than leaving half-built ones.
