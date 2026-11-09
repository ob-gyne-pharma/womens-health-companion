# A2-5 · Passport field specification v0.1 (DRAFT, unreviewed)

**Prepared by:** Agent 2 · **Date:** 6 Nov 2026 · **Status:** every field and every line of safety copy is *unreviewed*. The Arabic is an Agent 2 draft and needs a native Arabic speaker, and the clinical wording needs a licensed clinician.
**Product status (FACTSHEET §4, §6):** the passport does not exist yet. Do not describe it to anyone outside the team as built.
**Files:** `passport-field-spec-v0.1.xlsx` (53 fields + 12 safety-copy blocks, with review columns) and `passport-fields-v0.1.json` (same data, for Agent 1 to import).

## 1. Design rules

1. **Empty is not "none".** Allergies, medicines and conditions each have a status field (AL-00, MD-00, CD-00). The card may only say "no known allergies" if the woman chose it. "Not filled in yet" must look different.
2. **Self-reported, and labelled so.** Every screen and the emergency card say the information was typed by her and has not been checked by a doctor (SC-02, SC-08). The card shows "last updated".
3. **Her choice what goes on the emergency card.** Pregnancy history and conditions are off the card by default; contact details are off until filled.
4. **Not advice.** The medicine list records what she takes. It never says a medicine is suitable, never calculates a dose (MD-03, SC-04). Any interaction or dose alert would change the product's regulatory status and is out of scope until the A2 regulatory screening memo.
5. **No false security claims.** FACTSHEET §3: saved data is not encrypted today. Two storage wordings exist (SC-07A true today; SC-07B placeholder). Agent 1 must confirm which is true before release.
6. **Plain language.** Short sentences, no jargon, no abbreviations in labels. Arabic is written for the same reading level, not translated word for word.
7. **Excluded from v1:** national ID numbers, home address, insurer numbers, photographs, genetic data, partner details. Reason: they raise risk and are not needed for the stated purpose.

## 2. Sections and fields

| Section | Fields | IPS status |
|---|---|---|
| Profile and emergency contact | PF-01 to PF-09 | patient demographics |
| Allergies and intolerances | AL-00 to AL-07 | **required** in IPS |
| Medicines | MD-00 to MD-08 | **required** in IPS |
| Health conditions | CD-00 to CD-05 | **required** (problem list) |
| Vaccines | IM-01 to IM-05 | recommended |
| Operations and procedures | PR-01 to PR-04 | recommended |
| Pregnancy and births | PG-01 to PG-08 | optional (History of Pregnancy) |
| Document vault | DV-01 to DV-04 | not an IPS section; DocumentReference |

Full labels, plain-language help, choices, FHIR mapping and safety copy for each field are in the spreadsheet. Mapping targets are FHIR R4 elements as I understand the HL7 International Patient Summary; **mappings are unverified against a validator** and Agent 1 should check them when building the export.

## 3. Safety copy blocks (SC-01 to SC-11)

Listed in full in the `Safety_copy` sheet, EN and AR, with where each appears. Highest-risk ones: SC-03 (empty is not none), SC-04 (medicines not advice, never stop a prescribed medicine), SC-05 (severe reaction: call emergency number; the number comes only from a country-file item that is confirmed and reviewed), SC-07 (storage), SC-08 (card footer).

## 4. Questions for Agent 1 (change request CR-9)

1. Can the card show "last updated" and the status fields (AL-00, MD-00, CD-00) distinctly from empty?
2. Which of SC-07A or SC-07B matches the build at release? New localStorage keys must pass the privacy guard and update the privacy page and FACTSHEET in the same pull request.
3. Can fields use per-field "show on card" switches with the defaults in the spreadsheet?
4. File size and type limits for the vault (DV-04).
5. Will country (PF-04) be stored? That is a new storage key; it ties to CR-2.

## 5. Questions for people

- **Licensed clinician:** are the allergy severity wording, blood-group warning and pregnancy-outcome list appropriate? Is anything missing that an emergency doctor would need first (for example anticoagulant use, implanted devices, current pregnancy shown prominently)?
- **Arabic reviewer:** gender (feminine address is used), terms for miscarriage, stillbirth, termination, and tone on sensitive outcomes.
- **Founder:** legal position on recording termination or other sensitive outcomes in countries where this is restricted. I am not a lawyer; this needs advice before PG-05 ships, and the option of leaving "Termination" out of v1 is open.

## 6. Not done

No clinical or Arabic review. No FHIR validator run. No usability testing with women.
