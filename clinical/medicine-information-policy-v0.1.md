# A2-7 · Medicine information policy v0.1 (DRAFT for pharmacist sign-off)

**Prepared by:** Agent 2 · **Date:** 6 Nov 2026
**Status:** draft. Nothing here is in force until a named pharmacist signs it (section 9). Sources named were checked on the dates given; none replaces the pharmacist's own judgement.

## 1. Scope
Any text in the app, static pages, passport or outreach that says something about a medicine, supplement or herbal product in pregnancy, breastfeeding, trying to conceive, contraception or menopause.

## 2. Core rules
1. **No unconditional "safe" or "unsafe".** Pregnancy and breastfeeding information depends on the medicine, dose, timing, the woman's condition and the alternatives. Say what a named source says, for whom, and when it was checked.
2. **Absence of information is not safety.** "No data found" must never be shown as "no known risk".
3. **Never tell a woman to stop a prescribed medicine.** Untreated illness can harm her and the baby. Wording: "Do not stop a medicine your doctor prescribed without asking them."
4. **Always route to a person.** Every medicine statement ends with who to ask (pharmacist, doctor, midwife) and, where relevant, when to seek urgent care.
5. **No dose calculation or dose advice** anywhere in the app. Doses are only copied from a label or prescriber.
6. **Name the source and date, and the country.** UK guidance is labelled UK. Local regulator wording differs and wins for local licensing questions.
7. **Every entry has a named pharmacist reviewer and review date, and expires after 12 months** (earlier on a safety alert, withdrawal or label change). Past that, the entry is shown as "not reviewed" or removed.
8. **Brand names and local names:** only with a source. The same name can mean different ingredients in different countries.
9. **No interaction checking or personalised medicine suggestions.** That could make the app a medical device in some jurisdictions; deferred to the regulatory memo.

## 3. Approved source tiers (to be confirmed by the pharmacist)

| Tier | Source | What I verified (4 to 6 Nov 2026) | Limits |
|---|---|---|---|
| 1 | Product licence / label (SmPC, patient leaflet) from the country's regulator | Not verified: I did not reach SFDA, Egyptian Drug Authority or Kuwait MOH pages | Local regulator is the legal reference for that country |
| 2 | UK Teratology Information Service (UKTIS), run through the National Poisons Information Service; commissioned by UKHSA | Public summaries and BUMPS leaflets are on medicinesinpregnancy.org. Full monographs are on TOXBASE, restricted to professionals | UK service; the commissioning wording on older pages says PHE |
| 2 | LactMed (NCBI Bookshelf, NICHD) | Page states it is not a substitute for professional judgement. No last-updated date shown, so currency must be checked entry by entry | US-based; some drugs are not covered |
| 2 | NHS Specialist Pharmacy Service (SPS) pages on breastfeeding and pregnancy | Names UKDILAS, LactMed, e-lactancia, NHS Medicines A to Z, BNF (can be over-cautious), Hale, Briggs as the usual references | UK professional resource |
| 3 | NHS Medicines A to Z, NICE, RCOG patient information | Used elsewhere in the app already | UK; labelled UK |
| 3 | WHO recommendations (for example the 2016 antenatal care guidance) | Read; for example iron and folic acid wording, vitamin D not routine | Global reference; may differ from national guidance |

Not allowed as the only source: forums, social media, influencer posts, undated blogs, manufacturer marketing, or an AI model's output.

## 4. Wording templates

**Medicine in pregnancy or breastfeeding (English):**
"[Source, date checked] says: [what it says, in its own terms]. This depends on the dose, how long, and your health. Ask your pharmacist or doctor before you start, change or stop anything. Do not stop a medicine your doctor prescribed without asking them."

**Arabic (draft, needs native review):**
"تقول [المصدر، تاريخ المراجعة]: [ما يذكره المصدر]. يعتمد ذلك على الجرعة ومدة الاستخدام وحالتك الصحية. اسألي الصيدلي أو الطبيب قبل أن تبدئي أي دواء أو تغيّريه أو توقفيه. لا توقفي دواءً وصفه لك الطبيب دون استشارته."

**When there is no good information:** "We could not find reliable information on this medicine in pregnancy. This does not mean it is safe. Ask a pharmacist or doctor."

**Avoid:** "safe", "unsafe", "harmless", "you can take", "you must not take", "natural so it's fine", "approved" (unless naming the regulator and country).

**Before and after examples**

| Before (pattern) | After |
|---|---|
| "Safe antacids and laxatives" (fix-list F-09) | "Many women get heartburn or constipation in pregnancy. Ask a pharmacist which products suit you. [NHS page, date]." |
| Vitamin D stated as a flat recommendation (F-07) | "WHO does not recommend routine vitamin D supplements in pregnancy; the NHS (UK) advises considering one from October to March. Ask your midwife or doctor what is right for you." Both sources named, dated, labelled. |
| Any medicine demo giving a verdict | Replace the verdict with the template above or remove the demo until reviewed. |

## 5. Audit of existing content against this policy
Items already on the fix list that this policy affects: **F-09** (safe antacids/laxatives), **F-07** (vitamin D), and any medicine demo entries in the app (for example amoxicillin and ibuprofen). I have not yet re-read every medicine mention line by line against these rules. That audit is the first task once the pharmacist is named, and I will add findings to `fix-list-v1.md`.

## 6. Medicine entries: record format
Each entry in a future medicine data file: name (generic), country, population (pregnancy / breastfeeding / trying to conceive), source, source URL, date checked, summary in the source's terms, EN text, AR text, reviewer, review date, expiry date. Stored as data only; Agent 1 renders it. No entry is displayed unless reviewed and unexpired.

## 7. Review procedure
1. Agent 2 drafts from tier 1 to 3 sources and records them.
2. Pharmacist checks wording against the source and signs (name, role, registration where applicable, date).
3. Arabic reviewer checks language only; the pharmacist checks the Arabic medicine terms.
4. Entry goes live only when both are recorded in the register.
5. Re-review at 12 months, on a safety alert, or on a source update.

## 8. Reviewer note (founder said reviewers are mostly friends and colleagues)
A pharmacist can review medicine wording. A friend who is not a pharmacist can review readability only, and should be recorded that way. Public wording is "reviewed by [name], [role]", never "clinically validated".

## 9. Open decisions for the pharmacist and founder
1. Which sources are acceptable as tier 1 for each target country?
2. Is the 12-month expiry right?
3. May the app show any medicine-specific statement at all in v1, or only general guidance and "ask a pharmacist"? My recommendation is the second until entries are reviewed.
4. How to handle herbal products common in the region, where evidence is thin.
5. Whether the pharmacist is registered in a country whose guidance they are signing for.

**Sign-off:** Name ______ Role ______ Registration ______ Date ______
