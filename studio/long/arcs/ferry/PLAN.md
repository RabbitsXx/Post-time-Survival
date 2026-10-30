# THE LAST FERRY : story plan (3 parts, heist structure)

**Logline.** A car ferry is crossing a wide bay when the dead start to walk. The only lifeboat key is in the locked captain's cabin and the only people left to get it are a retired captain, a nervous teen engineer, a food-truck owner and a tourist who films everything. They plan a heist on their own ship. Everything goes wrong, a seagull makes it worse, and the real survival tip (cold-water shock: float, do not swim) is what finally saves them.

**Why it is different from the last three topics (newness gate).**
| item | THE LAST FERRY | already used |
|---|---|---|
| setting | a car ferry crossing a bay in full daylight | farm at dusk, bus at night, tower at night |
| structure | HEIST: part 1 the plan, part 2 the job (it goes wrong), part 3 the getaway | countdown, myth-buster serial, ascent |
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

## Part 1 : THE PLAN (55-65 s)
Arc: hook = the ferry is silent and the gull is carrying a dead man's hat; goal = the lifeboat key in the captain's cabin; obstacle = the cabin is on the other side of two decks of zombies; twist = Hugo's footage shows the route; payoff = the plan is made, and it is terrible.
1. [topdeck, wide] Hugo films the sea, a gull lands holding a captain's hat; "For the vlog: this is fine." (who: Hugo, Gary; why: where is the crew?)
2. Captain's Log card: "THE LAST FERRY, part one of three: the plan."
3. [lounge, wide] Mags, Dev, Nina, Hugo barricade the lounge doors; zombies bang on the glass (fixed positions, Scene tracker).
4. [macro] ship's brass key on a hook in the cabin, seen on Hugo's camera screen zoomed in: the goal and the clock (the ferry reaches the mainland in 40 minutes, the dock is full).
5. [areamap card] heist blueprint: deck map with 3 pins (CAR DECK, ENGINE, BRIDGE) and the route; Mags draws it with a marker (devices: new `deckmap` card kind per world).
6-8. [lounge, medium] roles: Dev = engine distraction (the horn), Nina = bait with the food truck, Hugo = eyes with the zoom lens, Mags = the key. Each role gets a one-line gag and a prop held up (wrench, ladle, camera, hat).
9. [rule card] FERRY RULE #1: LIFE JACKET ON BEFORE YOU NEED IT (tip part A: you will not have time to find one in the water).
10. everyone puts on an orange life jacket (acting beat: pose + rustle foley), Hugo's too small.
11. [lounge, wide] Mags counts "three, two, one" at the door; zombies wait outside; Gary steals the marker through the broken window (gag 1).
12. cliffhanger: the door opens and the car deck is full of zombies in tourist shirts. Log: "Next: the job."

## Part 2 : THE JOB (55-65 s)
Arc: hook = the plan starts perfectly; goal = reach the bridge; obstacle = car deck, engine room, locked cabin; twist = the plan only works because everything goes wrong in the right order; payoff = the cabin opens but the key is not on the hook (Gary has it).
1. [cardeck, lane] Nina's truck rolls forward as bait, ladle out; zombies follow (2.5D chase, crowd(), real motion).
2. [cardeck] Dev sneaks along the cars (back views, creeping), a car alarm goes off (his fault); music turns to chase.
3. [engine, wide] Dev reaches the horn lever, pulls it: the ship's horn blasts; zombies turn toward the sound (foley: horn, clang).
4. Nina's truck jams against a pillar; she improvises: opens the serving hatch, ladle versus a zombie in a chef hat (joke).
5. [lane] Hugo and Mags run to the bridge stairs; Hugo keeps filming ("this is my best take").
6. [bridge, wide] the locked cabin door with a brass lock; Mags uses a hairpin; she has done this before (twist on her backstory).
7. [macro lock] click; door opens; empty hook; Gary is on the roof rail with the key in its beak.
8. rule card: FERRY RULE #2: NEVER SWIM FOR SHORE (tip part B: the shore is farther than it looks).
9. [topdeck, wide] Gary flies to the lifeboat davit; the four chase along the rail.
10. cliffhanger: a zombie wave comes up the stairs behind them, the lifeboat is still locked in its davit.

## Part 3 : THE GETAWAY (55-65 s)
Arc: hook = Gary drops the key into the sea; goal = launch the lifeboat; obstacle = the key is gone and the zombies are 10 seconds away; twist = they jump in on purpose, wearing the life jackets, and use the cold-water-shock tip; payoff = they float on their backs, the lifeboat is released from below, and Gary hands over the key at last.
1. [lifeboat] Gary drops the key; it falls into the water (macro + splash foley).
2. [topdeck] the zombie wave arrives; Mags decides "We go in. Life jackets on, I said it first."
3. Dev: "It's freezing!" Mags explains cold-water shock: gasp, panic, swim for shore, sink; the right move is float on your back for 60-90 seconds (areamap / stat card with a 90 s timer: a real tip shown, not told).
4. all four jump (top view -> splash), everyone floats on their back, calm music turns warm; zombies fall in and sink (cartoon, no gore).
5. Hugo's camera floats; its flash lights the key sinking; Gary dives for it.
6. Gary surfaces with the key, drops it in Nina's ladle.
7. Mags unlocks the lifeboat from the water with the key through a release hatch; they climb in.
8. closing: the mainland far away; Hugo "Subscribe." Log: "The end. Follow for the next series."

## Staging / continuity plan (Scene tracker)
Each location has one fixed camera; people are placed once and move with `moves`, zombies with `zmoves`; every wide shot first, close-ups only after. Walking foley by surface: steel deck = `stair` clang, cars deck = `tile`, topdeck = `wood`, engine = `stair`. Lane shots keep the same vanishing point so the chase reads as one corridor.

## Score + sound plan
* Root D (nautical): idle = log pages and horn, comic = pizzicato heist theme (swing), creep = low drone + metal ticks, chase = 140 bpm with brass-like saws, warm = guitar arpeggio, sad = none, triumph = new `win` mood (major swell + gull).
* Room tones: topdeck = wind + waves + gulls; lounge = hum + distant banging; cardeck = echo + car alarm far; engine = thrum 60 Hz + clanking; bridge = radar ping + creak.
* Foley additions: gull screech/wing flap, wave wash, splash, horn, ratchet (lifeboat winch), car alarm, ladle clang.

## Department gates (must pass before packaging)
story >= 80 (storylint: 24+ shots, wide first, zombies visible >= 4 beats, continuity), art >= 90 (no black bands, per-place colour key, nobody cut by the edge), sound >= 85, editorial >= 85, marketing >= 90, legal = 100 (no real brand: avoid ferry-company names, life-jacket brands, camera brands, truck logos).

## Build plan (about 2 hours of production time, mostly rendering)
1. `worlds/ferry.json` + 11 new catalogue items + `deckmap` areamap variant (30 min)
2. three scripts with intent lines and Scene continuity (45 min)
3. `daily.py build ferry` (3 x ~4 min render + review)
4. fix whatever the scorecards list, rebuild, hand over; stage plan: 3 clips at 1 h spacing after THE LAST FLOOR.
