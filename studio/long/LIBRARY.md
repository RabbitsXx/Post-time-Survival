# Library vs new (owner rule 2026-10-29)

The owner allows a **library** of reusable ingredients, but a topic that is built from the library alone is rejected.
Every topic must ALSO bring new things that follow from its subject. `newness.py` (run first by `autopilot/build_clip.py`) enforces this against `register.json` / `WORLD_REGISTER.md`.

## Reusable (the library - the viewer does not see these as "the same story")
* engine: 9:16 renderer, camera moves, captions, series chip, frame cache, QA gates, cover/subtitle/publish kit, finish9 audio chain
* body rig and poses (`pax9.js`: stand/run/zwalk), hair styles, `DECO` body decorations, expressions
* SFX base, icons, generic cards (text, list, stat, phone, end), stickers, zoom/shake/horde helpers
* script DSL and part helpers (`zlib9`, `FarmPart`/`Part` pattern)

## Must be NEW for every topic (declared in the clip's `NEW = dict(...)`, checked against every earlier world)
| item | minimum | rule |
|---|---|---|
| world / setting | 1 | different place and time, not a re-skin |
| locations | 2 | new location drawings (or new variants of a new location) |
| cast | 3 | new names, new faces/palettes/voices; nobody from another world speaks |
| props | 2 | things that belong to this topic |
| devices (announcer + card/FX kinds) | 1 | a new way the video talks to the viewer (not BUS-E, not the farm radio) |
| story structure | 1 | countdown, investigation, one-take chase, found recordings ... never the same shape twice in a row |
| signature gag | 1 | new running joke |
| real survival tip | 1 | a tip not already taught by another world |
| palette / mood | 1 | different colour world |
| `tied_to_topic` | 60+ chars | say how those new things follow from the chosen subject |

Part 2+ of a topic must add at least two more new things (`part_new`) that no earlier part of that world used (new place variant, prop, gag, device state).
Spec check: every stage location, speaker and card/FX kind that really appears in the video must be one of the declared new ones; 90 % of stage beats must happen in the new locations.

## Workflow
1. Pick the topic, look at `WORLD_REGISTER.md`, choose a world/cast/structure that clashes with nothing.
2. Add the new drawings/characters/devices (like `farm9.js`, `farmcast9.js`, `farmlib.py`), write the clip and its `NEW` block.
3. `python3 newness.py <clip id>` (or build_clip: it runs before and after the spec step); show the pilot to the owner.
4. After approval: `python3 newness.py <clip id> --record` to log the world and part in the register.

## Facing and turning (library, all cast with a pax head)
* `person(who, view='front'|'side'|'back', flip=True)`: front, profile (side faces right, `flip=True` faces left), or seen from behind.
* `headView='side'` (+ `headFlip=True`) on a body view lets a character glance over a shoulder (`view='back', headView='side'`) or look sideways while the body faces us.
* `turn((0,'front'),(1.0,'back'))`: pass as `seq=turn(...)` to make a character turn during a beat; front<->back goes through a quick side step. Extra tuple items: head view, dict(flip=..., headFlip=...).
