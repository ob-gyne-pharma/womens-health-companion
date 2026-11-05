# OB-GYN PHARMA — Women & Families: Fact Sheet

Version 1 · 3 November 2026 · Covers release r22, live at https://public.ob-gyn-pharma.com

**Rule for every agent and every outreach document: do not state a capability, number or
claim about this product that is not in this file. If something is true but not listed here,
add it to this file first (with the test that proves it), then use it. This file is the only
thing Agent 2 and Agent 3 may quote from when describing the product to anyone outside the
team.**

When this file is updated, note the date and what changed at the bottom.

---

## 1. What it is, in one sentence

A free, bilingual (English / Arabic) website that works as an installable app, giving women
information and self-tracking tools across every life stage — from first periods through
pregnancy, postpartum, contraception and menopause — with nothing sent to any server.

**Call it:** a women's health information and self-tracking companion.
**Do not yet call it:** a health passport, a medical record system, a diagnostic tool, or
clinically validated. Those become true only when the features and evidence in section 6 exist.

## 2. What it does today (verified against the live code, 3 Nov 2026)

- 42 health guides and 12 life-stage chapters, in English and Arabic, right-to-left layout.
- A symptom checker with 23 entries sorted into red (7), amber (9) and green (7) triage
  levels, based on RCOG, NICE and NHS guidance (not yet independently reviewed — see §6).
- An emergency-numbers panel for 9 countries/regions (Egypt, Saudi Arabia, UAE, Qatar,
  Bahrain, Oman, UK, EU, US/Canada), chosen by the woman — never guessed from app language.
- A whole-app search covering every guide, tool and page in both languages.
- Reminders and milestones (UK antenatal and postpartum schedule, clearly labelled as UK
  guidance), and a "My health insights" page (cycle-length trend, pregnancy week progress,
  postpartum timeline, a 90-day symptom heatmap) — all computed from the woman's own entries,
  on her own device.
- A privacy page describing current behaviour (§3).
- Works offline once visited once; installable as an app on Android and iPhone, with an
  in-app install prompt that never appears on the two emergency pages.
- 118 static pages total (including the 42 guides and 12 chapters above, in both languages),
  each individually addressable and listed in a sitemap, built from the live app so the text
  matches what the app shows.

## 3. Privacy and data handling (verified against the live code)

- The app makes **no network request of its own kind** while running — confirmed by code
  review and an automated check that runs on every change (tools/check.mjs; see §9).
- It sets **no cookies** and loads **no third-party scripts, fonts or trackers**.
- Saving anything between visits is **off by default** and is the woman's explicit choice.
  When it's off, nothing is written to the device.
- When saving is on, data is stored in the browser's local storage — **not encrypted today**.
  Anyone who can open that browser on that device could read it. This is stated on the privacy
  page and must stay true of whatever this file says, in both directions.
- A backup/restore feature exists, protected by a passphrase of at least 12 characters, for
  moving data to a new device.
- There is a dormant feedback-sending function in the code, wired to a blank endpoint. It
  sends nothing while blank. If it is ever turned on, the privacy page and this file must be
  updated first, and that change is gated (see §9).

## 3a. My health passport (added r23, 4 Nov 2026 — not yet independently reviewed)

A new, separate feature at `#passport`. It lets a woman record, on this device only:
conditions, allergies, medicines, procedures, pregnancies, investigations and family
history — plus a profile and an emergency card built from whichever of those she chooses to
include.

- Stored in IndexedDB, **encrypted with AES-GCM** (256-bit), with the key derived from a
  passphrase she chooses via PBKDF2-SHA256 (210,000 iterations). We never see or store the
  passphrase itself.
- **There is no password reset.** If she forgets the passphrase, the data cannot be
  recovered — this is stated to her before she sets it up, not buried in a policy.
- Auto-locks after 5 minutes idle, when the tab is hidden, or on reload.
- Export is a local JSON download only (FHIR-R4-shaped field names, not a certified FHIR
  export) — nothing is transmitted.
- Every record shows "entered by you" — nothing is auto-upgraded to "clinician verified."
- **Not yet done:** document/photo attachments, an independent encryption/security review,
  a security audit of this specific feature, usability testing with real women, default
  field wording reviewed by a clinician (the field labels are a first draft, pending Agent 2
  sign-off per the Master Plan). Do not describe this as "clinically validated" or
  "professionally reviewed" until that review has happened and is on record.

## 4. What it does NOT do today (do not claim these)

- No accounts, no login, no cloud storage, no sync across devices.
- No document upload or OCR of lab reports.
- No FHIR *import*, and the export is FHIR-shaped field names only, not a certified FHIR
  Bundle — don't call it "FHIR-compliant" without a real conformance check.
- No app-store listing (Android or iOS) — it is a installable web app only.
- No independent security audit.
- No independent accessibility audit (some contrast and keyboard checks have been done
  internally; this is not the same as a WCAG conformance audit).
- No user testing with real women.
- No pilot, published evaluation, or research results of any kind.
- No clinical reviewer is named publicly yet (the live site's footer currently says review
  is pending — see the open item in §7).
- No country-specific clinical guidance beyond the 9-country emergency-number list in §2 —
  the symptom checker and reminders currently describe UK practice.
- No languages beyond English and Arabic.
- No institutional, government or UN endorsement, partnership or review of any kind has
  happened yet.

## 5. Technical facts (for anyone assessing feasibility, e.g. a grant reviewer)

- Built as a Progressive Web App: plain HTML, CSS and JavaScript (24 script files, loaded in
  a fixed order — see the repository's tools/check.mjs, which enforces this order on every
  change), no framework, no build step to read the source.
- Hosted on Cloudflare; deployed from a GitHub repository.
- An automated check (tools/check.mjs) runs before every release and blocks it if: any script
  fails to parse, the release number is inconsistent across files, the script-loading order is
  wrong, a static page is stale or missing from the sitemap, two pages share a title, or (as of
  the privacy guard added 3 Nov 2026) the code uses a network API, an unapproved storage key,
  or loads a resource from outside our own domain.
- Total download size of the home page: approximately 480 KB first visit (confirmed by
  measurement under simulated slow-4G conditions); loads in roughly 2.5–3 seconds on a
  throttled budget-Android profile.

## 6. Roadmap commitments (for outreach — say "planned", never "built")

Planned in order: encrypted on-device passport records (profile, allergies, medicines,
conditions, procedures, pregnancies/births); a self-contained offline emergency card; FHIR R4
export; a document vault; sources and a named reviewer with a review date on every guide; an
independent accessibility audit; an independent security review; an Android app-store listing.
See the Master Plan document for the phased timeline. None of this exists yet.

## 7. Open items — true as of 3 November 2026

- The live site's "More" page footer still says content review is pending. This is accurate
  today: no reviewer has been named publicly. It should be corrected the moment a named
  clinical reviewer and a review date exist — not before.
- Company registration status (Egypt), IP ownership documentation, and whether the GitHub
  repository is public are not yet confirmed. Do not state a registration status to a funder
  until the founder confirms it in writing.
- The Instagram performance data referenced in planning documents (top posts on pregnancy
  drug-safety topics) has not been cross-checked against audience demographics. Do not use it
  to justify a content strategy until that check is done.

## 8. How to extend this file

Add a new fact only with a way to verify it (a code location, a test, or a document). Mark
anything not yet independently confirmed as "(internal claim, not externally verified)". If a
fact in this file becomes false because of a code change, Agent 1 fixes this file in the same
pull request as the code change — not after.

## 9. The privacy guard (how §3 and §4 stay true automatically)

`tools/check.mjs` contains a section (added 3 Nov 2026) that fails any change which: calls a
network API other than the one dormant, blank-endpoint exception noted in §3; writes to
`localStorage` under a key not on an explicit approved list; or loads a script, stylesheet,
image, font or other resource from a domain other than our own. This means §3 and §4 cannot
silently become false — a change that would falsify them fails automatically before it can be
merged, and the person making it is told exactly why and what to update first.

---

**Change log**
- 3 Nov 2026 — v1 created. All counts in §2 re-verified against the live r22 codebase and the
  118 generated static pages. Privacy guard added to tools/check.mjs and documented here.
- 4 Nov 2026 — r23: added §3a, the health passport (encrypted local records + emergency
  card). Updated §4 to drop "no encryption" and "no passport" now that they exist in a
  limited first form; narrowed the FHIR-export line to be accurate.
