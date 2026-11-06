# A2-3 · Fix list v1: UK-only content, outdated or unsupported items, reviewer decisions

**Prepared by:** Agent 2 (clinical content & localization) · **Date:** 5 Nov 2026 · **App release:** r22 (repo commit `1aae5bd`)

**How to read this.** I am not a clinician. Where I say something "looks inconsistent" I point to the exact text and, where I could, to the source I read. Every item that is a clinical judgement is marked **Reviewer decision**: it waits for a named clinical reviewer, and nobody has been named yet. I changed nothing in the app. Code changes go to Agent 1 through `change-requests-for-agent-1.md`.

**Priorities.** **P1** = could affect what a woman does in an emergency, so look first. **P2** = UK-only content shown without saying so, or a claim stronger than its source. **P3** = wording, source and consistency hygiene.

## Decisions recorded by the founder (5 Nov 2026)

| Item | Decision | Effect |
|---|---|---|
| F-12 | Remove the unverified "112" notes (UAE, Qatar) | Approved. Goes to Agent 1 as CR-1. |
| F-12 | Add Kuwait, Jordan, Lebanon | Approved. CR-1. FACTSHEET count becomes 12. |
| F-01, F-02 | **Both**: label the UK schedule now, and add a country setting later | Approved. CR-2 has two stages. The country setting needs the A2-6 country files first. |
| F-18 | English footer should say review is pending, like the Arabic one | Approved. CR-7. Wording only; the "pending" statement stays until a reviewer is named. |
| Reviewers | Mostly friends and colleagues | Recorded. Each reviewer goes on the new **Reviewers** sheet of the register, with role, qualification and scope. See the note below. |

**What counts as a review (friends and colleagues are fine, with limits).** A reviewer counts only for what their role covers. A pharmacist reviews medicine wording. A licensed obstetrician or gynaecologist reviews clinical content. An Arabic-speaking non-clinician can review language, but not medicine. "Clinical review" is recorded only for a licensed clinician. Outside parties such as WHO, UNICEF, UNFPA or investors should be told exactly who reviewed what, by name and role. Say "reviewed by [name], [role]", not "clinically reviewed", unless that is true of the whole content.

## Summary

| ID | Pri | Item | Who acts |
|---|---|---|---|
| F-03 | P1 | No checker item for *reduced* baby movement after 28 weeks | Clinical reviewer |
| F-04 | P1 | Self-harm thoughts have no visible emergency step in the checker | Clinical reviewer, Agent 1 |
| F-05 | P1 | Urgent page and checker give different urgency for the same symptoms | Clinical reviewer |
| F-06 | P1 | New breast lump sits in a GREEN item with action "mention at next appointment" | Clinical reviewer |
| F-12 | P1 | Two unverified "112 works" notes on emergency numbers | Founder / reviewer, Agent 1 |
| F-01 | P2 | Antenatal schedule is UK practice, applied to every user | Founder, Agent 1, Agent 2 (A2-6) |
| F-02 | P2 | Postpartum schedule and vaccine timings are UK-specific | Clinical reviewer, Agent 2 (A2-6) |
| F-07 | P2 | Vitamin D wording is stronger than its NHS source and uses UK seasons | Clinical reviewer |
| F-13 | P2 | Checker assumes a midwife / maternity-unit care model | Clinical reviewer |
| F-08 | P2 | 24 of 42 guides cite one NHS link and no source list; three different "checked" dates | Agent 2, Agent 1 |
| F-17 | P2 | Medicine demo exists in the app but not in FACTSHEET; two names for it | Agent 1 |
| F-18 | P2 | Footer says "review pending" in Arabic but not in English | Founder, Agent 1 |
| F-09 | P3 | Checker says "safe antacids" and "safe laxatives" | Agent 2 (A2-7), Agent 1 |
| F-10 | P3 | Week-36 fetal milestone wording is confusing | Clinical reviewer |
| F-11 | P3 | Arabic terms to confirm: scan, membrane sweep, "6-week check", health visitor | Arabic clinical reviewer |
| F-14 | P3 | Contraception figures are typical-use but not labelled or sourced | Agent 2 |
| F-15 | P3 | Fetal milestones have no recorded source | Agent 2 |
| F-16 | P3 | Source links not link-checked; NICE NG201 currency not confirmed | Agent 2 |
| F-19 | P3 | Same boilerplate sentences repeated across 10 guides | Founder (content decision) |

---

## P1 · Safety and triage

### F-03 · No checker item for reduced movement after 28 weeks
- **What the app has.** RED "No fetal movements felt after 28 weeks" (action: contact midwife, doctor or maternity unit now). AMBER "Baby moving less than usual (under 28 weeks)". The red item's guidance mentions "reduced or absent" but says "assessed **same day**".
- **What I read.** RCOG patient information, "Your baby's movements in pregnancy" (read 4 Nov 2026): from 24 weeks, contact the midwife or maternity unit if movements are reduced. Over 28 weeks: "You must contact your midwife or local maternity unit **immediately**" and "must not wait until the next day".
- **Gap.** A woman at 32 weeks whose baby is moving *less* has no matching item: the red one says "no movements", the amber one says "under 28 weeks". Also "same day" is weaker than RCOG's "immediately".
- **Reviewer decision.** Add a red item for reduced movement after 28 weeks? Should the 24-28 week band be reflected? Reword "same day"? (App change needed: Agent 1.)

### F-04 · Self-harm thoughts have no visible emergency step in the checker
- **What the app has.** The amber item "Persistent low mood, anxiety…" says in its text: "If you have thoughts of harming yourself or your baby, treat this as an emergency and get help now." Its **action line** is only "Speak to your doctor or midwife". The Urgent page's last bullet says "seek urgent professional support" but gives no number.
- **Why it matters.** The most serious branch is inside paragraph text of a "contact your doctor" item.
- **Reviewer decision.** Separate red item for thoughts of self-harm or harming the baby? Which local crisis lines to show per country? Those numbers need two verified sources each (same rule as A2-4). I will research them if asked. (App change: Agent 1.)

### F-05 · Urgent page and checker disagree on urgency
| Symptom | Urgent page ("act now") | Checker |
|---|---|---|
| Vaginal bleeding in pregnancy | Listed as urgent | AMBER: "Contact your midwife or doctor **today**" |
| Fever in pregnancy or after birth | Listed (with headache, vision changes, swelling) | AMBER: same-day assessment |
| Inability to keep fluids down | Listed as urgent | GREEN nausea item: "If you cannot keep fluids down for **24 hours**, contact your midwife" |
- **Reviewer decision.** One consistent triage level per symptom, then Agent 1 aligns both places. It is possible the Urgent list is intentionally broader; if so, the app should say how the two relate.

### F-06 · New breast lump sits in a GREEN item
- **What the app has.** GREEN "Breast tenderness or changes". Guidance: "Any new lump, dimpling, nipple inversion, or skin change should always be checked by a doctor." Action: "Mention at next appointment — see a doctor for lumps".
- **Issue.** The text says "always be checked"; the green level and action line say "next appointment".
- **Reviewer decision.** Split lump / skin change into its own AMBER item, or keep as is with a clearer action.

### F-12 · Emergency-number notes (details in `emergency-numbers-verification-v1.md`)
- "112 from mobile phones" (UAE) and "112 also works" (Qatar) were not found on any official page I read. Recommendation: remove until sourced (CR-1).
- Kuwait, Jordan and Lebanon meet the two-source rule and can be added. Iraq cannot.

---

## P2 · UK-only content and claims stronger than their source

### F-01 · Antenatal schedule
- **What.** All 14 antenatal reminders (weeks 8 to 41) follow UK practice (code comment: "UK schedule (NICE NG201, NHS)"). Examples that differ between health systems: midwife-led appointments, a "sweep offered" at 40 weeks, "consultant review" at 41 weeks, anti-D timing, glucose test "if at risk" at 25 weeks.
- **What the app already does well.** The schedule panel is titled "(UK, NICE NG201)", and a footer says other countries follow different schedules and to follow your own midwife or doctor.
- **Gap.** The banner text a user sees on the home screen is built as "when: detail" with no UK label (code `remText` in `22-reminders.js`; Agent 1 to confirm on screen). A woman in Riyadh or Cairo could see "Midwife appointment — sweep offered if not in labour" as a personal reminder.
- **Decision for founder.** (a) Keep the UK schedule but label every banner "UK schedule", or (b) add a country setting and switch schedules, which needs the country files from A2-6 and code from Agent 1. Until one is chosen, the register marks all 14 rows "UK practice; not assessed elsewhere".

### F-02 · Postpartum schedule
- **What.** Health-visitor visits (days 10 and 14), the "newborn blood spot" test (day 3), and routine vaccines at 8, 12 and 16 weeks are UK-specific. The day-10 and day-14 items and the four vaccine items (days 28 to 112) already say "UK" or "your country's schedule may differ"; the items on days 1, 3, 5 and 42 do not.
- **Also.** The schedule as written has no routine birth-dose vaccines. Other countries' schedules may include some. I have not checked any particular country's schedule, so I am not saying what the correct entries would be.
- **Reviewer decision per country.** Needs each ministry of health's published schedule (A2-6).

### F-07 · Vitamin D wording is stronger than its source
- **What I read.** NHS "Vitamins and supplements in pregnancy" (read 4 Nov 2026): "you should **consider** taking a daily vitamin D supplement containing 10mcg **between October and March**." Folic acid: 400 mcg daily, "ideally for 3 months before" trying and until the end of week 12.
- **What the app says.** Folic acid text matches. Vitamin D: "Consider… especially autumn/winter" (planning), "**Take** vitamin D 10 mcg daily **throughout pregnancy**", "**Continue** … while breastfeeding".
- **Issue.** Two of three vitamin D lines are firmer than the page, and the seasonal framing reflects UK sunlight. Local guidance in the Gulf and Egypt may differ; I did not research it.
- **Reviewer decision.** Pharmacist or obstetric reviewer per country.

### F-13 · Midwife / maternity-unit model
- 24 strings use "midwife" and several checker items send the user to a "midwife or maternity unit" (examples: no-movement, waters-early, bleeding, reduced-movement). In many of the countries the app targets, women usually see an obstetrician directly. The checker's code header and `FACTSHEET.md` name RCOG, NICE and NHS as its basis, so this is consistent with its stated basis, but not with the whole audience.
- **Decision.** Either keep it and state the UK basis on the checker page, or introduce country-specific "who to contact" wording (A2-6).

### F-08 · Sources and "checked" dates
- **24 of 42 guides** have only one guide-level NHS link and no named source list: first-period, period-pain, heavy-periods, missed-periods, pms, pcos, endometriosis, fibroids, cysts, discharge, uti, sti, emergency-contraception, hpv, breast, pelvic-floor, pregnancy-loss, ectopic, labour, postnatal-mood, menopause-treatment, postmenopausal-bleeding, bone-health, examination.
- **37 of 42 guides** rely on NHS links only. Only 5 include a non-UK source (WHO, CDC or ACOG).
- **Three different "checked" dates are shown to users:** "Accessed 2 Oct 2026", "Source checked 3 Oct 2026", "Sources checked 4 October 2026". None names who checked. Under the project rule (source, named reviewer, date) these are claims without a reviewer. I cannot tell which is correct.
- **Action.** Weeks 5 to 8 of my brief add sources and a last-reviewed date to all 42 guides. Agent 1 will need a place in the data for them. Agent 2 writes the content; the code change is a request (CR-3).

### F-17 · Medicine demo
- The app contains a "Medicine information demo" (two examples: amoxicillin and ibuprofen). `FACTSHEET.md` §2 does not mention it. The home-page card calls it "Medicine checker", the page itself "Medicine information demo".
- The wording inside is cautious ("Source summary — not personal clearance", "A missing result does not mean it is safe"). The ibuprofen text says to avoid it in pregnancy "unless a doctor or pharmacist advises it".
- **Actions.** Agent 1: add it to FACTSHEET §2 or §4 and use one name. Agent 2: include it in the A2-7 medicine policy and the v2 register. It needs the pharmacist reviewer.

### F-18 · Footer wording differs by language
- English footer: "Women & Families · For education and planning · No live care service". Arabic footer: "نموذج للمراجعة · بانتظار المراجعة الطبية واللغوية · لا توجد رعاية مباشرة" (review prototype, awaiting medical and linguistic review, no live care).
- The English footer does not say review is pending; the Arabic one does. Other strings in both languages do say it (for example "Clinical and Arabic review pending"). `STATUS.md` says to leave the wording alone until a reviewer is named, so I have not touched it. **Founder decision:** should the English footer carry the same words?

---

## P3 · Wording and hygiene

### F-09 · "Safe" for medicines in the checker
- Heartburn: "ask your pharmacist about **safe** antacids". Constipation: "speak to your pharmacist about **safe** laxatives". The A2-7 policy will forbid unconditional "safe". Suggested neutral wording: "ask your pharmacist which antacids are suitable in pregnancy". Guides use "safe" in qualified or non-medicine ways ("not automatically safe or effective", "where you feel safe"); one use in `menopause-care` I did not fully read.

### F-10 · Week-36 milestone
- "Still before 37 weeks, when a pregnancy counts as early term." Early term is 37+0 to 38+6, so the sentence is hard to follow. Weeks 38 to 42 ("Early term… Full term begins at week 39", "Post-term") look consistent with the usual definitions. Reviewer to reword.

### F-11 · Arabic terms to confirm (native clinical reviewer)
- "Scan" rendered as **مسح** (e.g. "مسح الأسبوع 12", "إحالة لمسح التاريخ"). Of the 34 strings that mention a scan or ultrasound, 3 use مسح and 18 use تصوير. Possibly a literal rendering.
- "Sweep offered if not in labour" rendered **عرض الكنس**; looks like a literal rendering of "sweep".
- "6-week postnatal check" rendered **الفحص السداسي بعد الولادة**; "السداسي" suggests "six-part", and the number 6 disappears.
- "Health visitor" rendered **المرشدة الصحية**; a UK role with no obvious local equivalent.
- Terms with more than one rendering in use: *period* (الدورة 49 rows / الطمث 4 / الحيض 2), *pharmacist* (صيدلي / الصيدلاني), *midwife* (مولّدة / المولّدة). Counts are in the pack's `Terminology_watch` sheet. This seeds the glossary, not a decision.
- Also: the fever item shows "38°C (100.4°F)" in English and "38 درجة مئوية" in Arabic; the Fahrenheit value is dropped. That is probably intended; reviewer to confirm.

### F-14 · Contraception figures
- The app's figures (implant, IUS, IUD over 99%; injection 94%; pill 91%; condom 82%) match the **"Typical use"** column of the NHS page "How well contraception works at preventing pregnancy" (read 4 Nov 2026). The app does not say "typical use" and records no source. The pill row combines two methods under one figure; NHS gives 91% for both.

### F-15 · Fetal milestones
- 23 week-by-week statements and size comparisons have no recorded source. Needs a named source (and the week-36 fix above).

### F-16 · Link and currency checks not done
- 53 unique source URLs are cited by the guides. **I could not link-check them**: the workspace blocks the NHS site from the command line. I read a handful through the web-fetch tool (NHS vitamins, NHS contraception, RCOG baby movements) and they loaded. A full check is still open.
- The reminders cite "NICE NG201" without a version date. I did not confirm its current version.
- So **"outdated items" is only partly answered**: what I found is in F-07, F-08 and F-12. No claim of "up to date" should be made from this list.

### F-19 · Repeated boilerplate
- Eight sentences appear verbatim in 5 guides each, across 10 guides in total (the `*-care` pathway guides and pregnancy-options, safety-support, fertility-treatment, pregnancy-complications, cancer-support). Examples: "Use the urgent-help link for urgent symptoms. This pathway does not assess your symptoms." and "Bring your main question… Share sensitive details only where you feel safe." That is acceptable as a template, but it means those guides have little guide-specific content. **Founder decision:** keep, or schedule guide-specific rewrites.

---

## Checked and found consistent (so you do not re-check them)
- Folic acid 400 mcg, ideally from 3 months before, until week 12: matches the NHS page.
- Contraception effectiveness figures match NHS typical-use figures (F-14 is about labelling only).
- Nine emergency numbers: none found wrong (see the verification report).
- Counts in `FACTSHEET.md` §2 (42 guides, 12 chapters, 23 checker items, 7 red / 9 amber / 7 green) match the running app.

## Not covered yet (scope for v2)
Calculators, the symptom heatmap, the privacy page, the in-app search, and the 26 older guides' full depth text (only summaries are in the register).
