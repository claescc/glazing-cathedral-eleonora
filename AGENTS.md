# Project instructions

## Critical: production website is the source of truth

User-confirmed project rule, 2026-10-05.

- Canonical production website: https://ceramicscathedral.com/ (the user-facing www.ceramicscathedral.com address redirects here).
- For every task concerning this project's current UI, content, behaviour, accessibility or deployment, inspect the actual production website first and use its live state as the baseline.
- Local builds, repository files, previews and the separate ChatGPT Sites version are not evidence of what is currently in production. Explicitly distinguish source findings from reproduced production findings.
- Do not substitute https://ceramics-cathedral-eleonora.claes-cc.chatgpt.site for the production website or interpret its login wall as a production-site issue.
- The user owns the domain through Spaceship. Repository delivery documentation identifies GitHub Pages as the website deployment path from `main`; successful `pages build and deployment` runs were observed on 2026-10-05. Preserve this existing delivery path and CNAME. Do not deploy via ChatGPT Sites as a substitute.
- After publishing any change, verify it on the canonical production website before reporting it as live.
- If production access or deployment verification is blocked, report that limitation explicitly; do not claim production inspection or successful publication.

These instructions apply to all pages and all work in this repository.

## Keep only necessary project resources

User-confirmed scope, 2026-10-05:

- There is one production website (https://ceramicscathedral.com/) and one authoritative Git repository (claescc/glazing-cathedral-eleonora).
- Retain the repository, source assets, documentation and tools required to build, test, debug and publish that production website.
- Local builds and test environments are permitted only as development tools; clearly identify them as non-production.
- Do not create or maintain an additional hosted copy merely as an alternative production target.
- Existing ChatGPT Sites hosting metadata does not authorize publishing to that separate Site. Treat it as legacy until dependency checks establish whether it is needed for development tooling.
- Remove redundant copies and obsolete configuration only after verifying that required source assets, production deployment and development tooling do not depend on them. Do not report cleanup as complete if a hosted copy could not be deleted.

## Fix requests include complete delivery

User-approved workflow, 2026-10-05:

- A request such as "fix dit", "fix this", or "pas dit aan", including a production screenshot, authorizes the complete scoped correction: inspect production, reproduce the issue where possible, edit the repository source, run relevant tests and preview checks, regenerate derived files, commit, push `main`, allow the existing GitHub Pages deployment, then verify the result on https://ceramicscathedral.com/.
- Do not ask the user to repeat requests for testing, preview, commit, push or publication. Do not stop after proposing a fix or making a local-only commit when delivery is authorized.
- Follow README.md's existing release checks: `node build-static.mjs` and `node tools/check-site.mjs`, plus targeted checks relevant to the change. Verify the GitHub Pages deployment run and the live affected page before claiming completion.
- Use local previews as development tooling; show a preview when visual review is useful or the user requests it. A separate UAT environment is not required by default. Do not introduce a preview approval gate for an already authorized straightforward fix.
- Ask only when a material ambiguity, destructive action or genuine access/approval requirement blocks the requested correction. Report the specific blocker and the actual delivery state.
- Scheduled monitoring retains its narrower scope: automatically correct only small, clear issues; record larger issues for later discussion.
- Do not build a second deployment pipeline merely because a standard fix request is made. Inspect and reuse the existing pipeline.
