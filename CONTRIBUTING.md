# Contributing — read this at the start of every session

This repo has had problems from parallel work before r22: two sessions each called their
release "r20", one push overwrote the other's files, and a broken build was pushed once
because a command chain didn't stop on failure. These rules exist to stop that happening
again.

## The one rule that matters most

**Only Agent 1 merges to `main` and assigns the release number.** If you are Agent 2 or
Agent 3, or a new session standing in for Agent 1, and you're about to run `git push origin
main` with a zip someone sent you — stop. Open a pull request instead, or hand the files to
Agent 1 with a plain description of what changed and why. The automated check
(`.github/workflows/check.yml`) runs on pull requests too, so you'll see before merging
whether it's safe.

## Start of every session

1. Read `STATUS.md` in full.
2. Read `FACTSHEET.md` if you'll describe the product to anyone, or touch anything in §2–§4
   of it.
3. Confirm you're working from the latest `main` — `git pull` or re-download the repo. Don't
   resume from a zip someone sent you earlier in the conversation; it may already be stale.

## Making a change

- **Agent 1:** small, tested commits. Run `node tools/check.mjs` before every push — it must
  print `✓ OK`. If you changed guide content, the symptom checker, or the script list, also
  run `node tools/build-pages.mjs` before checking. Bump the release number (in `index.html`,
  `sw.js`, and the `REVIEW_RELEASE` constant in `js/07-review-offline.js`) together, never one
  without the others — `check.mjs` catches this if you forget.
- **Agent 2:** work in content/translation files only. If a change needs new JavaScript
  (a new page, a new field), write up what's needed and hand it to Agent 1 as a change
  request — don't edit `js/` directly.
- **Agent 3:** work entirely outside this repository. If you need a new fact added to
  `FACTSHEET.md` to make an application or outreach document honest, ask Agent 1 — don't
  invent the wording yourself.

## Never

- Never run a deploy command chain that doesn't stop on the first failure. Always structure
  it as `step1 && step2 && step3`, never `step1; step2; step3` — a semicolon lets every later
  step run even if an earlier one failed.
- Never push a zip's `index.html`/`sw.js`/`js/` wholesale over the current repo without first
  running `node tools/check.mjs` inside the zip's own folder and reading what it says.
- Never add a `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, a new `localStorage` key,
  or a script/style/image tag pointing outside our own domain, without first updating
  `FACTSHEET.md` §3/§4 and the privacy page in the same change. `tools/check.mjs` will block
  it otherwise — that block is intentional, not a bug to work around.
- Never claim a capability, audit, review, or partnership in outreach material that isn't in
  `FACTSHEET.md`.

## End of every session

Update `STATUS.md` with: what changed, what was tested, what's still open, and who owns the
next step. Use the Handoff Packet format in the Master Plan, Appendix A.
