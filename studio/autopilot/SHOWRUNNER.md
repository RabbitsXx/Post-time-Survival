# SHOWRUNNER.md : how the channel THINKS about content (read this before DAILY.md, before any file is created)

## The mindset change (2026-10-30)
Until now the studio started from **machinery**: "a new world, a new structure label, a new announcer device, a new gag slug, a real tip, three parts" and then filled the boxes.
The result passed every gate and was still a planning story with a crowd in every shot and no fighting. **Gates measure; they do not invent.** Content starts from a **person watching a phone** and a feeling, never from a checklist.

1. **Audience first.** The viewer is scrolling at 11 pm. In the first second they decide. Everything is judged by one question: *would they send this to a friend, and what would they say?* Write that sentence (the **share line**, <= 20 words) before anything else. If it is boring, the topic is dead.
2. **Emotion per second.** Plan the feeling, not the plot: curiosity -> fear -> laugh -> awe -> "oh no" -> relief. A scene with no feeling is cut.
3. **Situation, then character, then structure.** Start with an irresistible WHAT IF ("what if an 82-year-old ex-javelin champion had to defend her bungalow alone?"). Then who the person is when it gets hard. Structure labels (countdown, heist, ascent) are a consequence, never the idea.
4. **Set pieces before outlines.** Design the 3 best **poster moments** (images you could put on a poster and people would click) per part. The story is the road between them. A part without a poster moment is not made yet.
5. **Show, never plan.** No briefing scenes. People are defined by what they DO under pressure. Every beat is an action, a choice or a reaction. Planning is one card, once.
6. **Alone is where stories are.** The most tense, funny and moving scenes are one person, one problem. A group is a reward at the end of the part, not the default. Voices on a phone or radio keep the dialogue alive without bodies.
7. **Fights are the product.** This is zombie entertainment. Each hero has a **signature way to fight** (a tool, a trick, a flaw) and each fight has a beginning, a mistake, a reversal and a joke. Cartoon violence, zero gore.
8. **The gag has three beats.** Set-up, repeat, twist the third time. A running joke that is only repeated is a tic.
9. **The tip is earned.** The real survival fact must be the thing that wins the climax (not a card read out). If you can remove the tip and the ending still works, rewrite it.
10. **Every part ends on a question, not a cliff.** The viewer must know exactly what they are waiting for ("will the scooter make it up the hill?"). Part 2 and 3 open on the answer, with a surprise.
11. **Pace = a pattern interrupt every 3-4 seconds.** New information, new place, new threat, new joke. Static talk is the enemy; two people talking in one frame for more than 4 s is a failure.
12. **Kill the cliche list.** Nobody says "we need to get to the roof". No generic "gather supplies". If a line could be in any zombie film, rewrite it with this character's voice.
13. **Make something someone would rewatch.** One moment per part that is worth a second look (a perfect gag, a clever kill, a beautiful image).
14. **Learn.** Every review (scorecards, comments, watch time when available) updates `studio/LESSONS.md`; wins become reusable bits (a fight move, a gag shape, a transition).

## Order of work (never skip a step, never reorder)
1. **Idea round**: 12 WHAT IFs, each with a share line, scored on the rubric (`PITCH_TEMPLATE.md`). Keep the top 1; write why the others lost.
2. **Pitch** (one page, `arcs/<id>/PITCH.md`) written from the template and checked by `python3 studio/autopilot/pitchlint.py arcs/<id>/PITCH.md`. A topic without a passing pitch does not get a world file.
3. **Beat sheet** per part (the poster moments first).
4. Only then: world data, scripts, build, review (DAILY.md).

## What each department asks of the pitch
Art: 3 poster moments per part with a clear silhouette. Animation: each fight move named. Sound: a musical idea (key, tempo, a theme for the hero). Editorial: where the pattern interrupts are. Marketing: the share line becomes the title. Legal: no real brands or people.
