# Production pipeline (studio stages and gates). Nothing moves to the next stage without its gate.

| stage | what happens | artefacts | gate (automatic) |
|---|---|---|---|
| 1 Development | idea round, pitch, bible (cast, world, tip with source, music idea) | `IDEA_ROUND.md`, `PITCH.md`, `worlds/<id>.json` | `pitchlint.py` pass; newness gate |
| 2 Pre-production | beat sheets, model sheets, colour script, storyboard + timing (animatic), shot grammar | scripts with storyboard lines, `bible/model_sheet_*.png`, storyboard sheet | `storylint.py` + `shotlint.py`; model sheets generated |
| 3 Production | voices cast + levelled, render at 1080x1920, foley, score | `p9/<clip>/`, frames | continuity lint during spec; renders deterministic |
| 4 Post | final mix, captions, picture lock, EN/TH subtitles, cover embedded as frame 0 | `final9_<clip>.mp4`, `release9/<clip>/` | `audit_sound`, `audit_editorial`, `audit_visual` |
| 5 QC | technical check of the final file + legal | QC report | `qc_final.py` + `audit_brand.py` (hard) |
| 6 Delivery | package, plan on the stream (1 part / h, 3 h topic break) | `releases/`, `state/queue.json` | complete topics only |
| 7 Post-launch | review, backlog, lessons, dashboard | `scorecards/`, `BACKLOG.md`, `DASHBOARD.md` | ratchet raises the bars |
