# OB-GYN PHARMA Women & Families: Master Plan and Three-Agent Work Division

Prepared 3 November 2026 · Baseline: release r22/r23, live at public.ob-gyn-pharma.com · Items
marked (verify) were not confirmed against a primary source.

## 1. How to use this document

Sections 2 to 5 are the shared picture: where the project really is, what to keep from the
earlier plan, and the rules every agent follows. Section 6 holds one self-contained brief per
agent, each with a starter prompt to paste into that agent's session. Sections 7 to 11 cover
human-only tasks, the calendar, decisions, risks and release gates.

The goal: a lifelong, private women's health companion that women trust, in English and
Arabic first, with credible institutional partners. The plan assumes a small team and no
guaranteed funding.

## 2. Where the project is today

**Live and tested (r22, with Agent 1's week-0 CI/privacy-guard setup merged as of this
writing)**

- 24 JavaScript modules and 118 pages in English and Arabic (right-to-left), 42 guides and 12
  chapters, with static crawlable pages and a sitemap.
- Home search across guides, tools and pages; symptom checker (red, amber, green) with a
  country picker for emergency numbers; privacy page; reminders and milestones (UK schedule,
  labelled); insights (cycle, pregnancy progress, symptom heatmap); install prompt; offline
  use.
- No accounts. The app makes no network requests of its own and sets no cookies. Saving on
  the device is optional. Backups are encrypted with a passphrase of at least 12 characters.
- `tools/check.mjs` now includes a privacy guard that automatically fails any change which
  adds a network call, an unapproved storage key, or a third-party resource. This is enforced
  on GitHub via `.github/workflows/check.yml` plus a branch-protection ruleset on `main`.

**Not built yet**

Personal passport records (profile, allergies, medicines, conditions, procedures), document
vault, personal emergency card, FHIR export, app lock, encryption of saved data on the device
(it is plain local storage today), accounts or sync, native apps, other languages,
country-specific clinical guidance beyond emergency numbers, per-guide sources with reviewer
and review date, independent security and accessibility audits, user testing, any pilot.

**Unknown, founder to confirm:** whether a for-profit company is registered in Egypt, who
owns the IP, whether the GitHub repository is public, who the named clinical reviewers are.

**Do not claim until evidence exists:** clinically validated; WHO or UNICEF endorsed or
aligned; WCAG compliant; secure or encrypted storage; GDPR or HIPAA compliant; health
passport.

## 3. Verdict on the earlier plan

| Idea in the earlier plan | Verdict | Why |
|---|---|---|
| Passport first, personal emergency card, local-first privacy, country separate from language, clinical governance, staged expansion, three partner tracks, never sell data | Keep | Sound, and consistent with what is built. |
| Rebuild in Next.js, React Native and PostgreSQL | Drop for now | You have a working PWA. A rewrite costs months and adds no user value. Evolve it; wrap it for stores later. |
| Cloud accounts and sync early (Supabase) | Defer | Egyptian law treats health data as sensitive and sets licence and cross-border rules (verify with a local lawyer). Optional end-to-end encrypted backup only after legal and security review. |
| Emergency card shared through a server link | Change | Put the data inside the QR code. It works offline and no server holds health data. |
| Automatic OCR of lab reports | Later | Local-only, always user-confirmed, original file kept. |
| FDA pregnancy letter categories A, B, C, D, X | Drop | The FDA retired them in 2015. Use sourced narrative information. |
| Approach WHO first | Reverse | University and UNFPA Egypt first; WHO last, and never say endorsed without written permission. |
| 24-week build from scratch | Replace | Much of the companion already exists. See the calendar in section 8. |
| WCAG 2.2 AA and OWASP targets | Keep | Claim them only after audits. |

## 4. What the Instagram numbers do and do not tell us

Reported figures: the five top posts are all pregnancy drug-safety topics (clindamycin for
GBS about 2.1K views, codeine about 1.4K, stopping all medicines about 1.1K, cephalexin about
353, cefazolin about 348).

- Five posts and view counts are a hint, not demand. The audience may be clinicians,
  pharmacists and students, not the women the app serves.
- Before deciding anything, export audience age, gender, country and follower versus
  non-follower reach from Meta Business Suite.
- If professionals are the audience, a professional drug-safety reference is a possible
  second product with higher clinical and regulatory risk. Keep dosing advice out of the
  consumer app.
- Titles such as "strictly banned" overstate. Codeine restrictions are specific
  (breastfeeding, ultra-rapid metabolisers, children). Every post needs a source and a named
  reviewer, and no absolute claims.
- Funnel: each post links to one reviewed, sourced guide page that already exists as a
  static page.

## 5. Shared strategy and rules

### 5.1 Positioning

Today: a private, bilingual women's health information and self-tracking companion that
works offline, with no accounts. Target: a lifelong passport and companion. The word
"passport" appears in public material only after it is built.

### 5.2 Privacy contract

1. Nothing a woman enters leaves her device without her explicit action.
2. No accounts, advertising, trackers or analytics unless opt-in, free of health data, and
   the privacy page is updated first.
3. Never sell identifiable data; never use reproductive information for targeting.
4. Emergency access and basic export are never paid features.
5. The privacy page is a specification: any change to data handling updates it in the same
   change.

### 5.3 Architecture decisions

- **ADR-1** Evolve the existing vanilla JavaScript PWA (classic scripts, start-up file
  last). No rewrite before a pilot.
- **ADR-2** Local-first. No server holds health data until a legal opinion and a security
  review exist.
- **ADR-3** Passport storage: IndexedDB with Web Crypto AES-GCM; key from a passphrase using
  high-iteration PBKDF2; app lock; request persistent storage. Browsers can clear a website's
  saved data (Safari may after about a week without visits unless installed, verify), so
  backup prompts are mandatory.
- **ADR-4** Records use FHIR R4-aligned field names. Every record carries a source (user
  entered, from a document, clinician verified) and allows an approximate date.
- **ADR-5** Emergency card: offline, fields chosen by the woman, last-updated shown, QR
  holds the data itself.
- **ADR-6** Content is data: guides, country configuration and translations live in
  versioned data files with sources, reviewer and review date, so clinical work never edits
  JavaScript.
- **ADR-7** Country is not language: one configuration file per country (emergency numbers,
  screening references, local resources, legal notes).
- **ADR-8** Stores: Android through a Trusted Web Activity first. An iOS wrapper only when
  it adds native value (biometrics, local notifications), because Apple can reject thin
  wrappers. A PWA cannot fire background reminders without a push service.
- **ADR-9** Imports (for example FHIR import) are out of version 1: they add attack
  surface.

### 5.4 Roadmap

| Phase | When | Outcome |
|---|---|---|
| P0 | 3 to 10 Nov | Guard rails, honesty fixes, UNICEF decision |
| P1 | 10 Nov to 8 Dec | Passport MVP: encrypted local records, emergency card, export |
| P2 | 8 Dec to 5 Jan | Documents, timeline, FHIR export, sources on all guides, accessibility audit, first user tests |
| P3 | Jan to Feb 2027 | Security review, performance, Play Store listing, pilot protocol to ethics |
| P4 | Mar 2027 onward | Pilot, more languages, partner programmes, optional encrypted sync after legal review |

Dates are estimates and depend on founder time and reviewer availability.

## 6. Division of work

### 6.1 Who owns what

| Agent | Role | Owns | Must not touch |
|---|---|---|---|
| Agent 1 | Builder and release manager | js/, index.html, sw.js, tools/, .github/, FACTSHEET.md | Clinical wording without Agent 2 sign-off; funding documents |
| Agent 2 | Clinical content and localization | data/ (content register, countries, translations), clinical governance documents | JavaScript, index.html, release numbers |
| Agent 3 | Partnerships, funding and growth | Private workspace: dossier, applications, outreach, pilot protocol, content calendar | The website repository, any product claim not in FACTSHEET.md |

### 6.2 Coordination protocol

1. GitHub main is the single source of truth. Only Agent 1 merges and numbers releases.
   Nobody sends a zip of the whole site.
2. Agents 2 and 3 deliver data files through a pull request or issue, or documents in the
   private workspace.
3. Every session starts by reading STATUS.md and FACTSHEET.md from the repo.
4. Changing another agent's area requires a written change request (a GitHub issue).
5. FACTSHEET.md, kept by Agent 1, is the only allowed source of product claims for Agents 2
   and 3.
6. Funding, legal and institutional documents never go in the website repository: everything
   in it is public.
7. A change that alters data handling updates the privacy page and the privacy check in the
   same change.
8. Clinical content: source, named reviewer and date, or it stays labelled as unreviewed.
9. Weekly founder review of STATUS.md.

### 6.3 Agent 1: Builder and release manager

**Mission:** turn the current app into the passport and keep every release safe.

**Week 0 (done/in progress)**
- A1-1 Continuous check: GitHub Actions runs tools/check.mjs on every push and pull
  request. Branch protection on main requires it to pass.
- A1-2 Privacy guard added to check.mjs.
- A1-3 FACTSHEET.md v1.
- A1-4 Repository readiness: README, this file, CONTRIBUTING, STATUS.
- A1-5 Honesty fixes once the founder supplies reviewer name and date; replace the
  "prototype, approval pending" footer; Cloudflare analytics check.

**Weeks 1 to 4 (P1)**
- A1-6 Storage layer: IndexedDB plus Web Crypto, migration from current localStorage, app
  lock, quick exit, persistent storage request.
- A1-7 Passport screens: profile, allergies, medicines, conditions, procedures, pregnancies
  and births, investigations (no files yet), family history. Optional fields, "I do not
  remember the date", source label, English, Arabic, right-to-left.
- A1-8 Emergency card: field selection, offline, last-updated, print layout, self-contained
  QR.
- A1-9 Export: JSON, FHIR R4 Bundle (export only), printable summary.

**Weeks 5 to 8 (P2):** document vault with size limits and encryption; timeline; sources,
reviewer and review date shown from the content register; country selector reading
data/countries; accessibility audit (axe, keyboard, TalkBack, VoiceOver) and fixes.

**Weeks 9 to 12 (P3):** security headers and a content security policy; ASVS level 1
self-assessment and booking of an external test; bundling and minifying; Android TWA; demo
mode with fictional data for institutions.

**Starter prompt:** You are Agent 1, builder and release manager for OB-GYN PHARMA Women &
Families. Read STATUS.md, FACTSHEET.md and section 5 of this plan. Work only from the latest
GitHub main. Keep the privacy contract. Deliver one tested release at a time, running
tools/check.mjs and the browser tests before every handoff. Do not change clinical wording
without Agent 2 sign-off.

### 6.4 Agent 2: Clinical content and localization

**Mission:** make every statement traceable, reviewed and right for the woman's country.

**Week 0**
- A2-1 Content register v1 (one row per guide, symptom checker item and reminder): claim,
  source, country applicability, status (unreviewed or reviewed), reviewer, date.
- A2-2 Arabic review pack: a spreadsheet of every English and Arabic string added since
  r16, side by side, for human reviewers.
- A2-3 Fix list: UK-only content, outdated items, and items needing a reviewer decision.
- A2-4 Re-verify the nine emergency numbers against official sources; add Kuwait, Jordan,
  Lebanon and Iraq only with at least two independent sources.

**Weeks 1 to 4**
- A2-5 Passport field specification with plain-language explanations and clinical safety
  copy in English and Arabic.
- A2-6 Country files for Egypt, Saudi Arabia, UAE, Qatar, Bahrain, Oman and the UK.
- A2-7 Medicine information policy: no unconditional "safe" or "unsafe"; named sources for
  pregnancy and breastfeeding (for example LactMed, UK Teratology Information Service,
  verify); pharmacist reviewer.
- A2-8 Clinical governance framework and review procedure (institutional document 4).

**Weeks 5 to 8:** sources and last-reviewed date on all 42 guides; symptom checker
validation matrix against NICE, RCOG and WHO guidance, including missing red flags; Arabic
glossary; two-level explanations (simple and clinical); French and Spanish glossary
preparation.

**Weeks 9 to 12:** translation pipeline (spreadsheet in and out, imported by Agent 1);
medical-device regulatory screening memo for an expert; three sourced guide pages per week
matched to the best social posts.

**Starter prompt:** You are Agent 2, clinical content and localization lead. You edit only
data files and clinical documents, never JavaScript. Every claim needs a source, a named
human reviewer and a date, otherwise label it unreviewed. Treat UK guidance as UK guidance,
not universal. Start with A2-1 to A2-4 and ask Agent 1 for any code change through a change
request.

### 6.5 Agent 3: Partnerships, funding and growth

**Mission:** open doors honestly, without claims the product cannot support.

**Week 0**
- A3-1 UNICEF Femtech Ventures go or no-go memo. Confirm the deadline on UNICEF's own page:
  the live form says 11 November 2026, 11:59 PM CET; some sites say 4 November (verify).
  Requirements: private for-profit company registered in a programme country (Egypt is
  listed), open source or willing, working prototype, mandatory repository link, written
  answers, results of testing, 2-minute video of the real team and the real product. Fit
  risk: the call favours frontier technology; this app is rule-based. Apply only if the
  company exists and open-sourcing is accepted.
- A3-2 If go: draft every answer within the limits, the video script and a budget, using
  only FACTSHEET.md.
- A3-3 Open-source decision brief for the lawyer: licence options for code, content
  licence, trademark, what stays commercial.
- A3-4 Instagram audience analysis template and Search Console and sitemap submission
  steps.

**Weeks 1 to 4:** partner tracker; English and Arabic one-pagers from FACTSHEET.md; outreach
drafts for two university OB-GYN departments, UNFPA Egypt, the UNFPA and e& innovation
challenge and TIEC (verify status and terms of each); ethics-ready pilot protocol v0 (aims,
sample, measures, consent, data minimisation, no real records in demonstrations).

**Weeks 5 to 8:** institutional documents 1, 2, 3, 6, 10, 11 and 12; budget; funding
calendar; content calendar linking posts to sourced guide pages; WhatsApp share kit.

**Weeks 9 to 12:** submit the pilot protocol with the university partner; WHO and EMRO
introduction only after a partner is on board and evidence exists.

**Starter prompt:** You are Agent 3, partnerships, funding and growth. Use only facts in
FACTSHEET.md; never write endorsed, validated, compliant or secure unless FACTSHEET.md says
so. Keep all documents in the private workspace, not the website repository. Start with A3-1
and report go or no-go.

## 7. Human-only tasks

- Confirm company status and engage a lawyer (IP assignment, open-source licence, Egyptian
  data-protection duties, trademark).
- Name the clinical lead and reviewers (OB-GYN, pharmacist, midwife, Arabic review) and give
  Agent 1 the reviewer name and date.
- Recruit five to ten women for usability sessions in the first fortnight, then 100 to 300
  for a pilot with ethics approval.
- Test on real devices: a low-end Android phone, iPhone Safari, TalkBack, VoiceOver.
- Export Meta Business Suite audience data; check Cloudflare for an injected analytics
  script.
- Record the video, send all outreach, sign agreements, submit to the ethics committee, hire
  the security tester.

## 8. Calendar

| Dates | Milestone |
|---|---|
| 3 to 10 Nov | P0 complete; UNICEF decision made |
| 11 Nov | UNICEF deadline per the live form (verify) |
| 10 Nov to 8 Dec | Passport MVP released |
| 8 Dec to 5 Jan | Documents, timeline, FHIR export, sources on all guides, first user tests |
| Jan to Feb 2027 | Security review, performance, Play Store listing, protocol to ethics |
| Mar to Aug 2027 | Pilot of 3 to 6 months |

## 9. Decisions needed from the founder

1. Is there a registered for-profit company in Egypt? Default: register a simple company;
   add a nonprofit partner later on legal advice.
2. Open-source scope. Default: code open under a licence the lawyer chooses; brand reserved;
   clinical content licence agreed with its reviewers.
3. Make the repository public. Default: yes, once it is checked for secrets and has a
   licence.
4. Analytics. Default: none.
5. Cloud sync. Default: not before legal and security review.
6. First partners. Default: an Egyptian university OB-GYN department and UNFPA Egypt.
7. Which tool runs each agent, and who holds repository access.

## 10. Risks

| Risk | Response |
|---|---|
| Overclaiming to institutions | FACTSHEET.md is the only source of claims |
| Parallel copies overwrite each other | One merge owner, protected main, STATUS.md handoff |
| Unreviewed clinical content live | Labels, content register, reviewer sign-off before any pilot |
| Egyptian data-protection and medical-device rules | Lawyer and regulatory memo before cloud, pilots or triage claims |
| Browser storage cleared, data lost | Persistent storage, backup prompts, encrypted backup |
| Too much scope for a small team | Gates in section 11; passport first |
| UNICEF fit weak | Honest go or no-go; other funders in parallel |
| Apple rejects a thin wrapper | Android first; iOS wrapper only with native features |
| Misinformation in posts | Source and reviewer on every post, no absolutes |

## 11. Gates and measures

**Release gate (every release):** tools/check.mjs and browser tests pass; privacy page
matches behaviour; new clinical or Arabic text reviewed or labelled.

**Pilot gate:** encrypted storage independently reviewed; no unresolved critical security or
clinical safety issue; accessibility audit done; ethics approval; named reviewers published.

**Pilot measures (proposed targets, not standards):** 85% save a first record unaided; 90%
retrieve it; 90% understand where data is stored; offline emergency card works in every
defined test; zero unresolved critical issues. Measure through moderated sessions and opt-in
surveys, not tracking.
