# Clinical Governance Framework
## Women's Health Companion — v0.1 Draft
**Prepared by:** Agent 2 (Content & Localisation Lead)
**Date:** 2026-11-07
**Status:** DRAFT — not in effect until signed by founder and at least one named clinical reviewer
**Next review due:** six months from sign-off date

---

## 1. Purpose

This framework defines how clinical content in the Women's Health Companion app is created, reviewed, approved, updated, retired, and corrected. It applies to every piece of information the app shows a user, from an emergency telephone number to a vaccine recommendation.

The framework does not replace clinical judgment. It is the minimum process the team commits to so that users can trust what they read.

---

## 2. Scope

This framework covers:

- **Country data files** — emergency numbers, antenatal schedules, vaccination recommendations, supplement guidance, helplines (schema v0.1 and later, `out/clinical/countries/`).
- **Passport fields** — labels, help text, and safety-copy blocks shown during data entry (`out/clinical/passport-field-spec-v0.1.md`).
- **Medicine information** — any in-app statement about a medicine being used in pregnancy or while breastfeeding, governed first by the Medicine Information Policy (`out/clinical/medicine-information-policy-v0.1.md`) and second by this framework where the two overlap.
- **UI-facing strings** — symptom-checker prompts, alert messages, section introductions, and any other text a user reads that relates to their health.
- **Arabic (and future-language) translations** — all clinical content in every language, not just English.

This framework does **not** cover app store descriptions, marketing copy, investor materials, or internal team communications.

---

## 3. Roles

| Role | Responsibilities | Who holds it now |
|---|---|---|
| **Content Author** | Drafts new content; sources every claim; logs evidence level and sourceIds; flags conflicts; raises change requests for Agent 1 | Agent 2 |
| **Clinical Reviewer** | Verifies clinical accuracy; corrects Arabic text; supplies information the author could not find; signs the `review` block in each country item | Named clinician(s) — **not yet appointed** |
| **Pharmacist Reviewer** | Reviews all medicine-related content against the Medicine Information Policy; signs the medicine policy itself | Named pharmacist — **not yet appointed** |
| **Arabic Clinical Reviewer** | Native clinical Arabic speaker; reviews all `content.ar` fields before sign-off | Named reviewer — **not yet appointed** |
| **Founder / Product Owner** | Makes product decisions the clinical team cannot (e.g. which emergency number to show as primary when sources conflict); approves this framework; can override display decisions but not clinical fact | Founder |
| **Agent 1 (Engineering Lead)** | Implements validated content; confirms schema changes; processes change requests | Agent 1 |

**Minimum to go live in any country:** the country file must have at least one item with `evidence: confirmed` and `review.status: reviewed`, signed by a named Clinical Reviewer.

---

## 4. Content Risk Tiers

Not all content carries the same risk if wrong. Review requirements scale accordingly.

| Tier | Description | Examples | Required evidence | Required reviewers |
|---|---|---|---|---|
| **T1 — Life-critical** | A wrong value could directly harm a user in an emergency | Emergency telephone numbers | `confirmed` (≥ 2 independent sources) | Clinical Reviewer + Founder sign-off |
| **T2 — Clinical recommendation** | Guidance on vaccines, supplements, medicines, antenatal schedule | Tdap weeks, folic acid dose, iron | `confirmed` preferred; `single-source` allowed only if reviewer explicitly approves and notes why a second source is unavailable | Clinical Reviewer (Pharmacist Reviewer for medicines) |
| **T3 — Contextual information** | Background, links to services, general health information | Regulator name, helpline description | `single-source` acceptable | Clinical Reviewer |
| **T4 — Structural / UI** | Labels, section headings, safety-copy blocks, field descriptions | Passport field labels, section titles | No evidence field; editorial review | Content Author + Founder |

---

## 5. Evidence Standards

Evidence levels follow the taxonomy used in the country file schema:

| Level | Definition | Display to user? |
|---|---|---|
| `confirmed` | ≥ 2 independent, authoritative sources agree | Yes, if `review.status: reviewed` |
| `single-source` | Only one authoritative source found | Yes, if Tier T3; T2 only with named-reviewer override; never T1 |
| `conflict` | Two or more sources disagree materially | No — must be resolved before display |
| `reference-only` | Only a WHO or international guideline found; no country-specific source | No — shown only as placeholder; reviewer must supply country-specific source or explicitly approve WHO fallback |
| `not-found` | No authoritative source found | No |

**Source authority hierarchy (descending):**

1. Official government health authority for the specific country (e.g. MOH, NHRA, PHCC)
2. National hospital authority for the specific country (e.g. HMC Qatar, MOH Bahrain circular)
3. Official government travel authority for another country giving emergency numbers (FCDO, Smartraveller)
4. WHO or internationally recognised clinical body (CDC, ACOG, RCOG) — international guideline only
5. Peer-reviewed journal article — requires explicit reviewer approval
6. Third-party summary of an official source (e.g. a news article citing a MOH press release) — single-source at best; reviewer must confirm against original

Sources expire after **12 months from the date accessed** unless a new check confirms no change. Expired sources trigger a re-check; content is not removed until the re-check returns a material change.

---

## 6. Display Rules

The app must enforce both conditions before showing clinical content to a user:

1. `evidence` is `confirmed` **AND**
2. `review.status` is `reviewed`

This is a code-level rule (see Change Request CR-8). Content that fails either condition must not appear, even as a fallback.

**Exception — T4 structural content:** not gated by the evidence/review fields. It is controlled editorially by the Content Author and Founder.

---

## 7. Review Process

### 7.1 New content

1. Content Author drafts item; sets `review.status: unreviewed`.
2. Content Author delivers a reviewer workbook (`.xlsx`) or the JSON file directly.
3. Clinical Reviewer (or Pharmacist Reviewer for medicines) checks:
   - Is the English text clinically accurate?
   - Is the Arabic text clinically accurate and in natural, non-literal Arabic?
   - Is the evidence level correctly assigned?
   - Is any `reviewerMustSupply` field answered?
4. Reviewer fills in yellow columns in the workbook (approved / corrected AR / name / date).
5. Content Author updates the JSON: sets `review.status: reviewed`, `review.reviewer` (full name), `review.date` (ISO date).
6. Content Author sends updated file to Agent 1 for deployment.

### 7.2 Conflict resolution

When a `conflict` item is flagged:
1. Content Author documents both source values and their URLs in the `notes` field.
2. Clinical Reviewer determines which value is clinically correct for the country.
3. Founder decides if the conflict is also a product decision (e.g. which number to surface as primary).
4. The resolved item is re-evidenced: if one source is now discounted, the item is re-classified (`confirmed` if the remaining sources agree, `single-source` if only one authoritative source remains).

Current open conflicts: **SA-EMG-01** (Saudi Arabia emergency number: 911 vs 997 as primary). Awaiting founder decision.

### 7.3 Updates triggered by guideline changes

Any team member who becomes aware of a guideline change (e.g. a new vaccine added, a dose changed) must raise it with the Content Author within 5 working days. The Content Author then:
1. Verifies the change against the official source.
2. Updates the JSON item and resets `review.status: unreviewed`.
3. Fast-tracks for Clinical Reviewer sign-off (target: 10 working days).
4. Flags to Agent 1 if the app currently shows the old value (Tier T1 or T2 — expedite).

---

## 8. Expiry Schedule

| Content type | Maximum age before re-check |
|---|---|
| Emergency numbers (T1) | 12 months |
| Vaccine recommendations in pregnancy (T2) | 12 months |
| Childhood immunisation schedule (T2) | 12 months |
| Supplement doses (T2) | 24 months |
| Medicine information (T2) | 12 months (per Medicine Information Policy §8) |
| Helplines and services (T3) | 12 months |
| Passport field labels and safety copy (T4) | At each major schema version change |
| This framework itself | 6 months from sign-off |

A re-check does not automatically reset the `lastChecked` field. It resets only if the checker confirms the content is still current. If a material change is found, the item goes back to `review.status: unreviewed`.

---

## 9. Country-Specific Rules

**UK content is UK-only.** Items in `gb.json` must not be used as fallbacks for other countries, even as `reference-only`. Where the app needs a fallback, it must cite WHO or the specific country's regulator.

**Arabic text:** Arabic translations are drafted by Agent 2 (non-clinical) and must be verified by the Arabic Clinical Reviewer before `review.status` is set to `reviewed`. The `arabicNote` field in every country file records that no native clinical reviewer has yet signed off.

**Guidance specific to one part of a country** (e.g. Abu Dhabi vs Dubai in the UAE, England vs Scotland in the UK) must be labelled explicitly in `notes`. The app must not show it as applying to the whole country unless a reviewer confirms the whole-country applicability.

---

## 10. Incident Management

An **incident** is any clinical content error that has reached a user (i.e. the item was `confirmed` and `reviewed` and was visible in a production build).

### Severity levels

| Level | Definition | Response time |
|---|---|---|
| **P1 — Critical** | Wrong emergency number; a medicine contraindication missing or incorrect | Immediate — fix within 24 hours; notify all users who may have seen the content |
| **P2 — Serious** | Wrong vaccine week; wrong supplement dose | Fix within 5 working days; assess whether user notification is needed |
| **P3 — Minor** | Outdated helpline number; wrong regulator name | Fix within 30 days; no user notification unless the error was misleading |

### Incident steps

1. Person identifying the error raises it with the Content Author (email or in-app issue tracker).
2. Content Author verifies and classifies severity within 2 hours (P1) or 1 working day (P2/P3).
3. Content Author resets `review.status: unreviewed` on the affected item immediately.
4. Agent 1 removes the item from display (or flags it as hidden) pending correction.
5. Content Author sources the correct value, updates the JSON, and fast-tracks review.
6. Post-incident: Content Author adds a note to the fix list (`out/clinical/fix-list-v1.md`) recording what happened and what was changed.

---

## 11. Record Keeping

The authoritative record of what was reviewed, by whom, and when is the `review` block inside each JSON item:

```json
"review": {
  "status": "reviewed",
  "reviewer": "Dr Fatima Al-Rashidi",
  "date": "2026-11-15"
}
```

No item may be marked `reviewed` without a named, real reviewer and an ISO date.

The reviewer workbooks (`.xlsx`) are supplementary records for the reviewer's working notes and Arabic corrections. The JSON files are canonical.

The fix list (`fix-list-v1.md`) is the running log of known errors and corrections.

Change requests (`change-requests-for-agent-1.md`) are the log of product and engineering decisions raised by Agent 2.

---

## 12. Open Decisions (Founder to decide)

| Ref | Question | Blocking what |
|---|---|---|
| CGF-01 | Who are the named Clinical Reviewers for each country? | Nothing can be marked `reviewed`; nothing goes live |
| CGF-02 | Who is the named Pharmacist Reviewer? | Medicine policy cannot be signed; A2-7 not in effect |
| CGF-03 | Who is the Arabic Clinical Reviewer? | No Arabic content can be marked `reviewed` |
| CGF-04 | Saudi Arabia emergency: show 911 (unified) or 997 (ambulance) as primary? | SA-EMG-01 stays `conflict`; SA file stays draft |
| CGF-05 | Passport: include "Termination" (PG-05) in v1? | Passport spec stays incomplete |
| CGF-06 | Is the app intended to show `reference-only` (WHO fallback) content in countries where no local source exists, with a visible disclaimer? Or hide it entirely until a local source is confirmed? | Display rules for Oman, UAE, Saudi Arabia antenatal/supplement items |
| CGF-07 | What is the incident notification channel? Email, in-app message, both? | P1/P2 incident response procedure |

---

## 13. Relationship to Other Documents

| Document | Relationship |
|---|---|
| Medicine Information Policy v0.1 | Governs medicine content specifically; this framework applies on top for review workflow and expiry |
| Country files (schema v0.1) | The `review` block and `evidence` field implement the rules in §5 and §7 of this framework |
| Passport field spec v0.1 | T4 content; editorial review only; this framework covers the clinical safety-copy blocks (T2) |
| Fix list v1 | Running incident and defect log referenced in §10 |
| Change requests (CR-1–CR-10) | Engineering decisions needed to implement the display rules in §6 |

---

## Sign-off

This framework is not in effect until signed here:

| Role | Name | Signature | Date |
|---|---|---|---|
| Founder / Product Owner | | | |
| Clinical Reviewer | | | |
| Content Author | Agent 2 | (draft only) | 2026-11-07 |

---

*End of document.*
