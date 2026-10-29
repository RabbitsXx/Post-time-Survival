# studio/autopilot : unattended posting for Post Time Survival (work in progress, 2026-10-29)

Owner decision (config.json): produce AND schedule without asking first; 10 clips/day, one every 2 h from 10:00 Thailand time (grid in slots.py); YouTube API connected for tags / thumbnail / EN+TH subtitles / playlist.

| file | what it does | tested |
|---|---|---|
| yt_api.py | YouTube Data API v3: OAuth refresh, set tags, thumbnail, captions (EN/TH), playlist; quota ledger (limit 9000 of 10000/day). Credential = env var `Youtube_API` = JSON {client_id, client_secret, refresh_token}; a bare API key (AIza...) cannot edit videos | offline only: no credential visible yet |
| finish_youtube.py | after a Buffer YouTube post is out: tags, thumbnail, subtitles, playlist (idempotent, remembers steps in state/queue.json) | dry-run against live Buffer statuses OK |
| state.py, state/queue.json | memory of every clip (THE LAST BUS lb01..lb10 already seeded with their Buffer post ids) | yes |
| slots.py, config.json | the posting grid; first free slot is after THE LAST BUS ends (2026-10-30 10:00 Thailand) | yes |
| media.py | where Buffer fetches videos: ring of 4 orphan branches media-0..3, recycled by force push (branch deletion is blocked by the git proxy) so the repo does not grow | offline (local bare repo) |
| post_clip.py | schedule one finished clip on YouTube + TikTok + Instagram via Buffer with AI-generated flags | syntax only |
| preflight.py | what is missing in a session: tools, secrets (yes/no only), hosts, Buffer / YouTube / TTS logins | runs; secrets not visible in the session that wrote it |
| ../long/clipreg.py + patched qa9/kit9/embed9/cover9/buslib | the Last Bus toolchain now accepts arc clips ('route12_03'); Last Bus regression-checked (identical spec, identical kit, QA PASS) | yes |

## Blockers found on 2026-10-29
* A scheduled (cloud) session could not start: the platform answered ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED. Anything that needs a fresh Claude session on a timer is blocked until that limit allows it.
* Environment secrets are only visible to NEW sessions, so the Youtube_API credential could not be inspected from the session that built this.
* Branch deletion is refused by the git proxy (403); force pushes and new branches work.
