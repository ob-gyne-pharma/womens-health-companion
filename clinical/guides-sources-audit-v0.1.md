# Guides Sources Audit — v0.1
**Repo:** womens-health-companion r22 (commit 1aae5bd)
**Checked:** 2026-11-07
**Prepared by:** Agent 2

---

## 1. What was checked

The `guideDepth` object in r22 contains 42 topic guides. Each guide was inspected for:
- Whether a `sources` field exists
- How many source URLs are present
- Whether a `lastReviewed` or `lastChecked` date field exists
- Whether any existing source URLs have quality or applicability concerns

The 42 guides cover 12 chapters across the full reproductive life course.

---

## 2. Summary findings

| Item | Count |
|---|---|
| Total topic guides | 42 |
| Guides with at least one source | 18 (43%) |
| Guides with no sources at all | **24 (57%)** |
| Guides with a `lastReviewed` date | **0 (100% gap)** |
| Total existing source URLs | 39 |
| Existing source URLs flagged for review | 2 |

**The single largest gap is the absence of any `lastReviewed` date on any guide.** This is a schema issue — the field does not exist — and is captured as CR-11 below.

---

## 3. Guides with no sources (24)

| Guide | Proposed sources |
|---|---|
| `bone-health` | NHS osteoporosis; NICE CG146 |
| `breast` | NHS breast pain; NHS breast lump |
| `cysts` | NHS ovarian cysts |
| `discharge` | NHS vaginal discharge |
| `ectopic` | NHS ectopic pregnancy |
| `emergency-contraception` | NHS emergency contraception |
| `endometriosis` | NHS endometriosis; NICE NG73 |
| `examination` | NHS cervical screening; NHS colposcopy |
| `fibroids` | NHS fibroids |
| `first-period` | NHS periods |
| `heavy-periods` | NHS heavy periods; NICE NG88 |
| `hpv` | NHS HPV vaccine; NHS HPV infection |
| `labour` | NHS labour and birth; NHS signs of labour |
| `menopause-treatment` | NHS menopause treatment; NICE NG23 |
| `missed-periods` | NHS stopped or missed periods |
| `pcos` | NHS PCOS; NICE NG13 |
| `pelvic-floor` | NHS pelvic floor exercises; NICE CG171 |
| `period-pain` | NHS period pain |
| `pms` | NHS PMS; RCOG: managing PMS |
| `postmenopausal-bleeding` | NHS post-menopausal bleeding |
| `postnatal-mood` | NHS postnatal depression; NICE CG192 |
| `pregnancy-loss` | NHS miscarriage; Tommy's miscarriage |
| `sti` | NHS STIs; BASHH guidelines |
| `uti` | NHS UTI |

Proposed URLs are listed in the reviewer workbook (`guides-sources-audit-v0.1.xlsx`), yellow columns. Each proposed URL must be verified live and approved by a named reviewer before it can be added to the app.

---

## 4. Flags on existing sources

### F-23 — `pregnancy-conditions`: trust-specific URL
**Guide:** `pregnancy-conditions`
**Flagged URL:** `https://www.salisbury.nhs.uk/wards-departments/departments/maternity/planning-for-pregnancy/existing-health-conditions/`
**Issue:** Salisbury NHS Foundation Trust is one local trust. Its guidance may differ from national NICE or NHS England standards. Users outside Salisbury (all MENA users) should not be directed to a local trust page as the authoritative source.
**Proposed replacement:** NICE NG3 — Diabetes in pregnancy (`https://www.nice.org.uk/guidance/ng3`) or RCOG Green-top Guideline for the relevant condition, plus the existing `nhs.uk/pregnancy/keeping-well/medicines/` already in the same guide's sources.
**Add to fix list:** Yes — F-23.

### F-24 — `pregnancy-care`: US-only guideline (ACOG)
**Guide:** `pregnancy-care`
**Flagged URL:** `https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date` (2017)
**Issue:** ACOG is the American College of Obstetricians and Gynecologists — a US body. The due-date dating method described is consistent with NICE (which uses FIGO/ISUOG ultrasound dating), but the citation should be from a source appropriate to the app's user base. The 2017 date may also be stale.
**Proposed replacement:** NICE NG201 (Antenatal care, 2021): `https://www.nice.org.uk/guidance/ng201` — section on dating scans.
**Add to fix list:** Yes — F-24.

---

## 5. Universal gap: `lastReviewed` date

**None of the 42 guides has a last-reviewed date.** The governance framework (§8) requires all clinical content to have a `lastReviewed` date and to be re-checked within 12–24 months. This field does not currently exist in the guide data schema.

**Change request raised:** CR-11 (see below).

---

## 6. Change request CR-11 — Add `lastReviewed` to guide schema

> **CR-11**
> **Raised by:** Agent 2, 2026-11-07
> **To:** Agent 1
>
> Request: Add a `lastReviewed` object to the guide data schema (or as a parallel metadata file) so that each guide can carry:
> ```json
> {
>   "lastReviewed": "2026-11-07",
>   "reviewer": "Dr [name]",
>   "nextReviewDue": "2027-11-07"
> }
> ```
> This is required by the Clinical Governance Framework (§8) before any guide can be considered governed.
> The field should be surfaced in the app as a "Last reviewed: [month year]" line, consistent with the NHS pattern.
> This does not need to block the current release, but no guide should be marked clinically governed without it.

---

## 7. Next steps

1. **Reviewer to verify proposed URLs** — open `guides-sources-audit-v0.1.xlsx`, check each proposed URL is live and appropriate, fill in yellow columns.
2. **Fix F-23 and F-24** — replace Salisbury Trust URL and ACOG URL. Add to fix list and raise with Agent 1.
3. **Agent 1 to implement CR-11** — add `lastReviewed` to schema.
4. **Once CR-11 is confirmed**, Agent 2 can populate `lastReviewed` dates for the 18 guides that have existing sources (using the source-access date as a provisional date pending reviewer sign-off).
5. **Weeks 5–8 remaining tasks:** symptom-checker validation matrix, Arabic glossary, two-level explanations.

---

*End of document.*
