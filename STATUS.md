# STATUS — read this first

This file is the handoff packet between sessions and between the three agents. Whoever ends
a session updates it. Whoever starts one reads it before doing anything else.

---

## Current state

- **Live release:** r22 (commit `f27d844`), at https://public.ob-gyn-pharma.com
- **Agent 1 setup commit (this delivery):** adds `.github/workflows/check.yml`,
  the privacy guard in `tools/check.mjs`, `FACTSHEET.md`, `README.md`, `CONTRIBUTING.md`,
  and this file. Not yet merged to the real repository — see "Next step", below.
- **Next release number:** r23 (not started)

## What changed since the last packet

**5 Nov 2026 — Agent 1: processed Agent 2's week-0 handoff (CR-1, CR-2 stage 1, CR-5, CR-6, CR-7)**

Agent 2 delivered A2-1 to A2-4 as files (`content-register-v1.xlsx`, `fix-list-v1.md`,
`emergency-numbers-verification-v1.md`, `change-requests-for-agent-1.md`) plus 7 change
requests. Per `CONTRIBUTING.md`, Agent 2 made no code changes — this entry is Agent 1
applying the approved ones.

- **CR-1 (approved 5 Nov):** emergency numbers go from 9 to 12 countries — added Kuwait
  (112), Jordan (911), Lebanon (140, Red Cross ambulance); dropped the unverified "112 also
  works from mobile" notes on UAE and Qatar (only the UK's, which has 2 independent
  sources, is kept). Iraq stays off the list — sources conflict. The new Arabic wording for
  Kuwait/Jordan/Lebanon is Agent 2's own draft, **not yet reviewed by a native speaker**.
- **CR-2 stage 1 (approved 5 Nov):** reminder banners for the antenatal/postpartum
  schedule and the supplement reminders are now prefixed "UK schedule:" / "جدول المملكة
  المتحدة:" in both the home banner and the Reminders page list. A personal appointment
  (the woman's own entry) is correctly NOT labelled — verified by test. Stage 2 (a country
  setting) waits on Agent 2's A2-6 country files, and per Agent 2's privacy note, storing
  that choice needs a privacy-page and FACTSHEET update first — not done here.
- **CR-3 (schema proposed, not implemented):** see "CR-3 schema proposal" below. No guide
  content was touched — Agent 2 explicitly asked not to, since the real reviewer dates
  aren't ready yet.
- **CR-4 (symptom-checker content):** correctly NOT implemented — blocked on a named
  clinical reviewer, per Agent 2's own request.
- **CR-5:** `FACTSHEET.md` updated — emergency-number count (9→12) with a note on its
  verification status; added the previously-missing "medicine information demo" entry
  (Agent 2's F-17: it existed in the app but wasn't in this file at all, and was called two
  different things in two places — fixed here).
- **CR-6:** added a `clinical/` folder with Agent 2's 4 files. Confirmed `tools/check.mjs`
  doesn't object to it (that was an explicit ask in CR-6) — tested directly, no errors.
- **CR-7 (approved 5 Nov):** English footer now says "Clinical and Arabic review pending" —
  matching what the Arabic footer already said. Verified in both languages.
- **One gap in the handoff:** CR-6 lists `arabic-review-pack-since-r16.xlsx` (A2-2) as a
  file being added, but it was not in the zip Agent 1 received — only 4 of the 5 files
  listed. Not chased further; flagged for the founder/Agent 2 to resend.
- **Tested:** 21 checks specific to CR-1/2/7 (all 12 country numbers, both dropped notes,
  UK label present/absent in the right places, both languages), plus the full existing
  regression suite (118 pages, navigation, symptom checker, reminders/insights, passport,
  install banner, offline, 4 screen sizes, search) — all pass. A full r23-vs-r24 diff across
  every route and 4 saved-data states shows only the `urgent` page's `#app` content
  changed, exactly as expected from CR-1 (footer text isn't inside `#app`, so CR-7 doesn't
  show in that diff tool, but was verified directly).

### CR-3 schema proposal (for Agent 2 to fill, not yet wired into any guide)

```js
// Per guide, in addition to the existing title/body/url fields:
sources: [[label, url], ...],   // already used by 18 of 42 guides; unchanged
reviewedBy: '',                 // e.g. 'Dr X, consultant obstetrician' -- empty = unreviewed
reviewedOn: '',                 // ISO date 'YYYY-MM-DD' -- empty = unreviewed
```
Display rule: if both `reviewedBy` and `reviewedOn` are empty, show "Clinical and Arabic
review pending" (matching the footer wording from CR-7) instead of a date. The three
different static "checked" strings Agent 2 found (`js/01-core.js`, `js/04-tools.js`,
`js/05-life-topics.js`, `js/13-feedback-backup.js` — 7 call sites in total) all need to
read from this field once Agent 2 supplies real values; none were touched in r24.

**4 Nov 2026 — Agent 1, A1-6/A1-7/A1-8/A1-9 (passport storage + first record screens + emergency card + export)**

- New `js/26-passport.js`. `js/25-boot.js` renamed to `js/27-boot.js` (passport module loads
  before boot, which must stay last).
- Storage: IndexedDB (`wf-passport-v1`), AES-GCM-256 encrypted, key from a passphrase via
  PBKDF2-SHA256 (210,000 iterations). The privacy guard in `tools/check.mjs` no longer
  blocks `indexedDB` — this was the one thing it was waiting on (see the guard's comment).
  **Nothing beyond that is checked automatically**: the encryption design itself needs a
  human security review before any pilot (per the Master Plan's pilot gate).
- Record categories: condition, allergy, medication, pregnancy, procedure, investigation,
  family history — generic form renderer, one schema per category in `PP_CATEGORIES`.
  Default field wording is a first draft; **Agent 2 needs to review and refine it**
  (Master Plan A2-5).
- App lock: 5-minute idle timeout, locks when the tab is hidden, locks on reload. No
  password reset, by design — stated to the woman before she sets a passphrase.
- Emergency card at `#emergency-card`: offline, built only from fields she explicitly
  ticks, nothing shown by default.
- Export: local JSON download, FHIR-shaped field names (not a certified FHIR Bundle —
  `FACTSHEET.md` is worded carefully here, don't round this up in outreach material).
- Privacy page (`js/14-home-more.js`) and `FACTSHEET.md` §3a updated in the same change.
- **Tested:** crypto round-trip, wrong-passphrase rejection, and tamper detection verified
  in isolation (Node's Web Crypto implementation) before writing the browser code, since
  this is the security-critical part. Full list of what's been checked is in the chat
  reply for this release — re-run that test suite before trusting a further change to this
  file.
- **Not tested:** no independent security review has happened (that's a human task, not
  something I can do from here). No usability testing with real women yet.

**3 Nov 2026 — Agent 1, week-0 setup (tasks A1-1 to A1-4 from the Master Plan)**

- `tools/check.mjs` gained a privacy guard: it now fails the build if the code calls a
  network API (`fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`), writes
  to `localStorage` under a key not on an explicit allow-list, uses `eval`/`document.write`,
  or loads any script/style/image/font from outside `public.ob-gyn-pharma.com`. One narrow,
  explicit exception: the existing dormant feedback-sender in `13-feedback-backup.js`, and
  only while its endpoint string is empty.
  - **Tested:** ran against the real r22 code (passes — `✓ OK`, "privacy guard clean"), and
    against 7 separate deliberately-broken copies, one per forbidden pattern (sendBeacon,
    XMLHttpRequest, WebSocket, eval, an unapproved storage key, a live fetch, a third-party
    script tag). All 7 were caught with a correct, specific message. See the Master Plan
    for how to reproduce this test.
- `.github/workflows/check.yml` added: runs `node tools/check.mjs` on every push and pull
  request to `main`. **Important — not yet verified end-to-end**: I validated the YAML
  parses correctly and the job steps are in the right order, but I have no way to run actual
  GitHub Actions from here. The first real push will be its real test. If it goes red for a
  reason unrelated to an actual problem, tell me and I'll fix the workflow file.
  - **This only blocks merges once branch protection is turned on** (Settings → Branches →
    add rule for `main` → require status check "check" to pass). That's a one-time manual
    step — see "Next step for the founder" below.
- `FACTSHEET.md` created: every number in it (42 guides, 12 chapters, 23 symptom-checker
  entries split 7 red/9 amber/7 green, 9 emergency-number countries, 118 static pages, 24
  script files) was re-counted directly from the live r22 source and the generated static
  pages, not carried over from memory or from earlier chat claims.
- `README.md`, `CONTRIBUTING.md`, this file: added.

## What's still open

- This commit has **not been pushed**. It needs to be merged into the real repository by
  whoever has push access (see "Next step", below) before any of it takes effect.
- Branch protection on `main` has not been turned on (can't be done from here — needs a
  human with repo admin access).
- The "prototype, approval pending" footer on the live site is still accurate — no clinical
  reviewer has been named yet. Do not change it until the founder supplies a name and date.
- Company registration status, IP ownership, and whether the GitHub repo should be public
  are unconfirmed — see Master Plan §9.
- UNICEF Femtech Ventures go/no-go (task A3-1) has not been done — this needs Agent 3 and a
  founder decision, and the deadline is close.

## Next step for the founder

1. Get these files into the real repository (see the chat reply for exact commands).
2. After pushing, in GitHub: Settings → Branches → add a protection rule for `main` →
   require the "check" status check before merging. This is what makes the guard binding
   rather than advisory.
3. Decide: is `js/13-feedback-backup.js`'s dormant feedback sender ever going to be turned
   on? If yes, that needs a privacy-page update and a FACTSHEET.md update before the guard's
   exception for it can be removed and tightened.

## Open decisions (see Master Plan §9 for full detail)

1. Egypt company registration status — unconfirmed.
2. Open-source scope — unconfirmed.
3. Make the GitHub repo public — unconfirmed.
4. First partner institutions — proposed default: a university OB-GYN department + UNFPA
   Egypt, not yet contacted.

---

*Template for the next entry — copy this, fill it in, and put it above this line:*

```
## YYYY-MM-DD — Agent N, [what you worked on]

- What changed:
- What was tested, and how:
- What's still open:
- Who owns the next step:
```
