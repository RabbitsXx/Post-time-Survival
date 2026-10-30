# THE LAST FERRY : story plan v2 (3 parts, four solo missions + a radio)

> v2 after owner feedback: v1 was a planning story with a crowd in every shot. v2 has no briefing scene (one card only), at least 4 fights per part, and the heroes are mostly ALONE: each has a solo mission, they talk over walkie-talkies (voice only) and meet again only at the end of part 3.

**Logline.** A car ferry is crossing a wide bay when the dead start to walk. The only lifeboat key is in the locked captain's cabin and the only people left to get it are a retired captain, a nervous teen engineer, a food-truck owner and a tourist who films everything. They plan a heist on their own ship. Everything goes wrong, a seagull makes it worse, and the real survival tip (cold-water shock: float, do not swim) is what finally saves them.

**Why it is different from the last three topics (newness gate).**
| item | THE LAST FERRY | already used |
|---|---|---|
| setting | a car ferry crossing a bay in full daylight | farm at dusk, bus at night, tower at night |
| structure | RELAY OF SOLO MISSIONS: four heroes alone, linked by walkie, the key is the baton | countdown, myth-buster serial, ascent |
| announcer device | the captain's log: handwritten pages, ink writing itself, ship's horn between entries (`ferry_ann`) | farm radio, BUS-E, tower intercom |
| signature gag | Gary the gull steals one object per part and always returns it at the worst moment (`gull-steals-the-key`) | polka scarecrow, steve with ticket, parrot line |
| real tip | cold-water shock: life jacket first, then float on your back for 60-90 seconds before doing anything else; never swim for shore | sound leads them, stairs vs elevator, seal the fire doors, signal in threes |
| palette | sunlit teal sea, ferry white, safety orange | dusk gold, sodium orange, storm navy |
| cast | Captain Mags, Dev, Nina, Hugo (+ Gary the gull as a sound / prop) | ruth/eli/junie/hank, bus passengers, bell/zara/omar/lin/pip |

## Cast (voices cast by target pitch, see worldlib `f0`)
* **Captain Mags** (64, retired, still gives orders, wears a captain's hat two sizes too big) - f0 125 Hz, rate .9, "Nobody calls me ma'am. Call me Captain." Wants: to be in charge. Fear: nobody listens.
* **Dev** (19, deckhand / engineer in training, oversized wrench) - f0 215, fast talker, panics politely. Wants: to prove he can fix it.
* **Nina** (38, owns the food truck parked on the car deck, always carries a ladle) - f0 175, dry humour. Wants: her truck to survive.
* **Hugo** (45, tourist, huge camera, narrates for his vlog even now) - f0 150, "Subscribe, and also, run." Comic relief that becomes useful: his camera flash / zoom lens find the key.
* **Gary** the gull: no voice, screech + wings; steals a different object each part.
* **Announcer:** the Captain's Log (Mags reading her own log, pitched 90 Hz with page-turn and horn foley), says series, part and topic in the first 6 seconds and signs off with "next".

## World / locations (data in `worlds/ferry.json`)
| key | kind | look | used for |
|---|---|---|---|
| cardeck | lane (2.5D) | rows of cars + trucks converging, steel ceiling beams, open bow door with bright sea light at the end | the chase, the food truck, part 2 set piece |
| lounge | in | rows of seats, vending machine, windows with moving sea, orange tint | part 1 plan scene (all four together) |
| engine | in | pipes, generator, tank, red warning light, hot orange tint | part 2: Dev's job |
| bridge | in | ship's wheel, radar, locked captain's cabin door with brass lock | part 2 climax |
| topdeck | out | white rail, funnel, life rings, open sea to the horizon, gulls | part 1 opening, part 3 |
| lifeboat | out | davit, orange lifeboat hanging over the water | part 3 getaway |
New catalogue items to add (props.json with fit tags ship/sea/industrial): lifebuoy, ship wheel, wrench, lifeboat + davit, funnel, deck rail, porthole, anchor chain, food truck, camera, gull. Reused where they truly fit: car, pipe, tank, generator, crate, barrel, table, door, window, cabinet, tower (mast), boat (far ferry), skyline (far shore).

## Structure: the key is a baton, four solo missions
The ferry's lifeboat release key hangs in the captain's cabin. The crew is split across the ship when the dead rise. **Each hero is alone** in a different place and has to fight their own way toward the next hero, passing the key along like a baton (Mags -> Dev -> Nina -> Hugo -> the lifeboat). The only thing they share is a channel on the ship's walkie-talkies, which gives us voices without bodies, running jokes and fast cutting between solo scenes.

**Fight styles (each hero fights differently, each fight must read as an action)**
* **Captain Mags:** boat hook and fire extinguisher, calm, precise, ends fights in two moves ("Down.").
* **Dev:** huge wrench, panicky, wins by accident (steam valve, slipping on oil).
* **Nina:** ladle + frying pan from her truck, wild swings, kitchen sounds.
* **Hugo:** selfie stick / tripod and the camera flash that blinds zombies for two seconds, narrates his own fights for the vlog.
Fight beat = hero + zombie in one wide shot, a swing (pose punch / swing with the weapon held), an impact sticker (WHACK! CLANG! BONK! SMASH!), the zombie knocked back or down, a reaction line. No gore: cartoon knock-downs, zombies flop and fade.

## Part 1 : THE DECK (55-65 s) - four solo scenes, one card of planning
Arc: hook = a lone gull with a captain's hat; goal = get the key from the cabin; obstacle = the crew are zombies; twist = Hugo's camera flash works; payoff = the key falls off Mags' belt into the car deck.
1. [topdeck, WIDE then solo] **Hugo alone** films the sea; Gary the gull drops a captain's hat on his head. A zombie deckhand lurches in. **FIGHT 1:** Hugo swings the selfie stick (BONK!), then the camera flash stops the zombie dead; "That's the thumbnail."
2. Captain's Log card: "The Last Ferry. Part one of three: the deck."
3. [bridge, solo] **Mags alone** locks the bridge door; a zombie first mate rams it. **FIGHT 2:** boat hook through the door handles, shove, "Down." Walkie crackle: Dev's voice.
4. [areamap card, the ONLY planning beat] deck map with four pins and the key's route (the baton).
5. [engine, solo, dark] **Dev alone** hears the banging, sneaks along the pipes with his wrench held like a sword; stealth shot (back view, red light flicker); a zombie engineer rises behind him; he screams, swings blind. **FIGHT 3:** wrench CLANG on a pipe, zombie dazed, Dev runs.
6. [cardeck lane, solo] **Nina alone** in the food truck; zombie tourists rock it; she opens the serving hatch. **FIGHT 4:** ladle + frying pan WHACK-WHACK-CLANG through the hatch; "No. Refunds."
7. Mags on the radio: "Whoever reaches the cabin first gets the key." (stakes + deadline: the dock in 40 minutes.)
8. [bridge] Mags opens the cabin with a hairpin and takes the key; a zombie captain steps out of the cabin: **FIGHT 5:** extinguisher blast (white foam), Mags runs, the key falls off her belt and bounces down the stairs.
9. [cardeck lane] the key slides under Nina's truck; Gary lands on it (gag 1).
10. cliffhanger: the truck engine starts by itself.

## Part 2 : THE ENGINE (55-65 s) - the baton moves
Arc: hook = the truck is moving; goal = get the key from under the truck to the lifeboat deck; obstacle = every route is a fight; twist = Dev's blind luck (steam valve) opens the way; payoff = the key reaches Hugo, but he is cornered on the lifeboat rail.
1. [cardeck lane] **Nina alone** hangs from the moving truck's step, fights a zombie on the hood with the frying pan (**FIGHT 1**), brakes against a pillar; the truck stops, the key is under the front wheel.
2. Captain's Log card.
3. [engine] **Dev alone** is cornered by the zombie engineer: **FIGHT 2** wrench vs wrench, Dev slips on oil, the zombie slides into the steam valve (accident), PSSSHHH: the zombie is cooked (cartoon: flies out of frame). Dev: "I meant to do that."
4. [cardeck] Dev, still alone, runs the corridor of cars (2.5D chase) and trips the alarms; zombies pour toward the noise; he leaps onto a car roof (**FIGHT 3:** kicks a zombie off, BONK!).
5. radio banter: Hugo: "Is anybody else filming this?" Nina: "No." (gag)
6. [stairs] **Hugo alone** on the stairs with the key (Nina threw it up); three zombies climb; **FIGHT 4** tripod swing + camera flash; one falls, two keep coming; he backs onto the open deck.
7. [topdeck] Gary snatches the key from Hugo's hand; **chase**: Hugo runs along the rail after the gull, a zombie behind him (solo chase, 2.5D rail).
8. **Mags alone** on the bridge sees it through the window; she comes out with the boat hook: **FIGHT 5:** she vaults, hooks a zombie off the rail; "Down."
9. rule card: FERRY RULE #1: LIFE JACKET ON BEFORE YOU NEED IT; Mags tosses Hugo a jacket mid-fight (acted, not told).
10. cliffhanger: a zombie wave comes up from the car deck, the lifeboat is jammed.

## Part 3 : THE WATER (55-65 s) - the only time they are together
Arc: hook = Gary drops the key into the sea; goal = launch the lifeboat; obstacle = ten seconds of zombies; twist = jumping into the water is the right move; payoff = all four float, Gary returns the key.
1. [lifeboat] Gary drops the key; it spins and splashes (macro + foley).
2. [topdeck, solo] **Mags alone** holds the stairs against the wave with the boat hook and the extinguisher: **FIGHT 1-2** (hook, foam blast), then radio: "Everyone to the rail. We go in."
3. one by one the other three arrive at the rail (a reunion beat, 4 people, the only group shot of the part).
4. Dev: "It's freezing!" **cold-water shock card** (stat card with a 90 second timer): gasp, panic, swim = sink; float on your back 60-90 seconds. Mags: "Life jackets on. Float."
5. all four jump (high shot, splash), float on their backs, music turns warm; the zombies jump after them and sink.
6. [water, solo cuts] each hero alone in the water for a beat of silence: Hugo (camera floats), Nina (ladle floats), Dev (counts), Mags (calm).
7. **FIGHT 3:** one last zombie swimmer reaches Dev; Dev hits it with the wrench from the water (BONK!, splash).
8. Gary dives, comes up with the key in its beak, drops it into Nina's ladle.
9. Mags releases the lifeboat from the water with the key; they climb in.
10. closing: the mainland far away; Hugo: "Subscribe." Log: "The end. Follow for the next series."

## Staging / continuity plan (Scene tracker)
Each location has one fixed camera; people are placed once and move with `moves`, zombies with `zmoves`; every wide shot first, close-ups only after. Walking foley by surface: steel deck = `stair` clang, cars deck = `tile`, topdeck = `wood`, engine = `stair`. Lane shots keep the same vanishing point so the chase reads as one corridor.

## Score + sound plan
* Root D (nautical): idle = log pages and horn, comic = pizzicato heist theme (swing), creep = low drone + metal ticks, chase = 140 bpm with brass-like saws, warm = guitar arpeggio, sad = none, triumph = new `win` mood (major swell + gull).
* Room tones: topdeck = wind + waves + gulls; lounge = hum + distant banging; cardeck = echo + car alarm far; engine = thrum 60 Hz + clanking; bridge = radar ping + creak.
* Foley additions: gull screech/wing flap, wave wash, splash, horn, ratchet (lifeboat winch), car alarm, ladle clang.

## Department gates (must pass before packaging)
story >= 80 (storylint v2: someone ALONE in >= 30 % of scene beats, <= 35 % beats with 4+ people, >= 3 fight beats per part, wide first, zombies visible >= 4 beats, continuity), art >= 90 (no black bands, per-place colour key, nobody cut by the edge), sound >= 85, editorial >= 85, marketing >= 90, legal = 100 (no real brand: avoid ferry-company names, life-jacket brands, camera brands, truck logos).

## Build plan (about 2 hours of production time, mostly rendering)
1. `worlds/ferry.json` + 11 new catalogue items + `deckmap` areamap variant (30 min)
2. three scripts with intent lines and Scene continuity (45 min)
3. `daily.py build ferry` (3 x ~4 min render + review)
4. fix whatever the scorecards list, rebuild, hand over; stage plan: 3 clips at 1 h spacing after THE LAST FLOOR.

## Engine work needed BEFORE building (checklist; each item gets its own audit line)
1. **Fight helper** in `worldlib.Scene`: `fight(hero, zombie, weapon, hits=2)` = hero walks in, swings (pose punch/swing + weapon held), impact sticker, zombie knock-back along x and a fall/fade (cartoon, no gore).
2. **Zombie fall / KO animation** (`fall` on human zombies: rotate to the ground, shrink shadow, fade).
3. **Weapons catalogue** (held props): boat hook, wrench, ladle, frying pan, fire extinguisher (with foam puff), tripod/selfie stick, camera flash (screen flash).
4. **Walkie voices** (voice-only speaker with radio filter + static foley) so solo heroes can talk.
5. **Fight foley:** swing whoosh, weapon impact by material (metal clang, wood bonk, pan ring), zombie grunt, foam hiss, steam hiss.
6. **Water set** (topdeck / lifeboat / water surface with floating props) and the new catalogue props (lifebuoy, wheel, lifeboat, funnel, rail, porthole, food truck, camera, gull).
7. Re-cut THE LAST FLOOR with fights and solo scenes later (it currently fails the v2 rules: no real fights, always a crowd).
