# MIDNIGHT SKEWERS: lessons from Night 2 -> rules for Night 3 (and later)

Every item below is something the owner rejected or that broke while making Night 2 (ks2). The right-hand column is the guard that now checks it
(`lint_ep.py` runs on the built spec: `python lint_ep.py out/ks3.spec.json`; "review" = looked at on the contact sheet before a full render).

## What went wrong in Night 2, in the order it happened
| # | Mistake (what the owner saw) | Cause | Rule now | Guard |
|---|---|---|---|---|
| 1 | Customers went through the counter; hands did not touch anything | people stood at the window plane, no contact between actors and props | Stand customers outside the counter (z = KZ+1.85). Anything an actor touches is a movable object, and the vendor's hands are placed ON that object every frame (tray `trayHold`). | review |
| 2 | "Looks rushed, a stream of troublemakers" | six rule-breakers in a row, no cause and effect, no calm | One idea per beat: rule -> check -> decision -> consequence. Start with a normal customer so the loop is learned. | review |
| 3 | Customer spoke before arriving at the window | speech started at shot start while the walk-in was still running | `lead` >= walk-in end + 0.25 s. | `lint_ep` SPEECH_BEFORE_ARRIVAL |
| 4 | Empty / near-empty shots (passer-by out of frame, 3 s of road) | long shots with nobody in them | Never > 1.2 s without an actor, hands, CCTV picture or a card. | `lint_ep` DEAD_AIR |
| 5 | Text sometimes big, sometimes small; thin letters on one sign | headline auto-shrank per string; textures drawn before the web font loaded | One headline size (fs 72), <= 12 characters, same size for the whole episode. Text textures are redrawn after the font loads. | `lint_ep` TEXT_SIZE, TEXT_LEN |
| 6 | Vendor "teleported" to the stick, then took 6 s to come back | no walk, slow reveal | Fetching an object = walk (>= 0.35 s per metre), grab, walk back, total <= 4 s. | review |
| 7 | Rules card read slowly (8 s) and nothing happened | one long card | Card <= 5.5 s, items appear with the spoken line. | `lint_ep` CARD_LONG |
| 8 | The last ghost reached into the stall, yet the shutter still closed | staging contradicted the logic | An enemy that can reach the vendor is stopped BEFORE it can: it stays outside the window until the shutter is down. | review |
| 9 | Heads/hair covered faces, huge heads on camera | `hs` too big, afro in front of the eyes | Close-up head scale <= 1.4 except a planned scare; check the face is visible. | `lint_ep` HEAD_SCALE |
| 10 | Face in the CCTV monitor was small and striped | CCTV camera was far from the ghost | A per-shot CCTV camera (`cctvCam`) 0.9 m from the face; full-screen face = the scare. | review |
| 11 | SFX as loud as speech, music too loud, ambience inaudible | one gain for everything | `audio_extra.py`: per-class levels, speech ducking, voice RMS match. Check the MIX REPORT numbers. | MIX REPORT |
| 12 | Length crept from 55 s to 106 s | every fix added a shot | Budget up front: <= 80 s, average shot 3-4 s, no beat longer than it needs. | `lint_ep` LENGTH |
| 13 | AI label was switched on by the posting code | default argument | `post_clip.py` follows `ai_generated_flag` (fixed). | code |
| 14 | Posted a clip whose cover/tags the owner could not find | Studio hides tags; Shorts hide custom covers | After posting, report where to see tags/cover, verify through the API. | post checklist |

## Night 3 (ks3) plan, second by second  (target 75 s)
Premise: the rule is COUNT THEM. The camera and the window must show the same number of people. If they differ, close the shutter.
Structure is new on purpose (not a copy of Night 2): one rule, four customers, each answers "what does the count say?"

| Time | Shot | What the viewer sees and hears |
|---|---|---|
| 0.0-1.4 | HOOK 1 | CCTV monitor fills the screen: an old woman at the window and a tall figure behind her. Text `CAMERA: TWO`. heartbeat |
| 1.4-2.7 | HOOK 2 | The window, same woman, alone. Text `WINDOW: ONE` |
| 2.7-4.2 | HOOK 3 | A glove slams CLOSE, the shutter drops, BANG. Text `CLOSE IT` + `NIGHT 3` |
| 4.2-9.4 | RULES | Card: COUNT THEM / CAMERA = WINDOW / IF NOT: CLOSE IT, each item appears on its spoken line (fast speech) |
| 9.4-13.4 | CUSTOMER 1 | A man walks to the window (1.7 s), then orders: "Two skewers, please." Ticket pops after he arrives. |
| 13.4-16.4 | COUNT 1 | Quick turn to the monitor: one figure. Vendor: "One at the window. One on camera. Good." |
| 16.4-19.0 | COOK | Glove grills two skewers, sizzle |
| 19.0-22.0 | SERVED | Glove hands the skewers over, man pays, SERVED stamp |
| 22.0-25.5 | CUSTOMER 2 | The old woman walks up (1.8 s), "The usual, dear." Nothing behind her at the window. |
| 25.5-29.0 | COUNT 2 | Monitor: she and a tall figure right behind her. Vendor whispers: "Two on camera. One at the window." |
| 29.0-34.0 | ASK | Window: vendor "Ma'am, who is behind you?" She turns her head, nothing there: "Behind me, dear?" |
| 34.0-36.8 | CLOSE | Quick turn to the button, glove presses, shutter drops. "Count says no." |
| 36.8-40.5 | KNOCK | Shutter closed. Muffled "...Rude." Two polite knocks, then one heavy knock that shakes the camera |
| 40.5-45.0 | CUSTOMER 3 | Shutter reopens (1 s). A couple walks up together: "Three skewers." / "Two for us, one for the little one." |
| 45.0-48.2 | COUNT 3 | Monitor: three figures. Window: two. Vendor panics: "Three on camera. TWO at the window." |
| 48.2-51.2 | LEAN OVER | Vendor leans over the counter. A small kid, hidden from the window view, waves. "...Oh. A kid." |
| 51.2-54.2 | SERVED 3 | Three skewers handed out, kid: "Thanks!" Relief laugh |
| 54.2-57.4 | QUIET | Empty street, vendor relaxes: "Three rules. Zero problems." (a passer-by crosses so the frame is never empty) |
| 57.4-61.0 | COUNT 4 | Habit check. The monitor now shows INSIDE the stall (label CAM 02): the vendor and a tall figure standing right behind him |
| 61.0-64.0 | COUNT 5 | Vendor counts out loud: "One... two. Two in the stall." |
| 64.0-66.6 | LOOK BACK | He turns around. Nothing there. "There's nobody." |
| 66.6-70.0 | THE FACE | Monitor again: the tall one has turned to the camera, face fills the whole screen. Flash, sting. Low voice: "Count again." |
| 70.0-74.5 | NEXT NIGHT | Card: NIGHT 4 / COUNT YOURSELF. Vendor whispers the line. |

Checks before a full render: contact sheet of EVERY shot, `lint_ep.py` clean, audio MIX REPORT sane, then full render, then package. Nothing is posted until the owner says so.
