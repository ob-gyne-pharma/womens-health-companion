# A2-4 · Emergency numbers: verification report v1

**Prepared by:** Agent 2 (clinical content & localization) · **Checked:** 4 Nov 2026 · **App release:** r22 (`EMERGENCY_NUMBERS` in `js/10-urgent-learn.js`)
**Status of every number below:** *unreviewed by a named human.* The checks below are Agent 2 reading official pages. That is evidence for a reviewer, not a review.

## Result in one paragraph

None of the 9 numbers the app shows was found to be wrong. Each is confirmed by at least one official page. Six (Egypt, UAE, Qatar, Bahrain, Oman, UK) are confirmed by two or more separate sources. The other three (Saudi Arabia, EU, US/Canada) rest on one official page per number, which is thinner. Two notes the app attaches to numbers could **not** be confirmed anywhere I looked: "112 from mobile phones" for the UAE and "112 also works" for Qatar. Three of the four candidate countries meet the two-source rule and can be added: **Kuwait (112), Jordan (911), Lebanon (140 for ambulance, 112 for police)**. **Iraq does not meet it** and stays off the list. Three decisions need a human (see "Decisions needed").

## A. The nine numbers already in the app

| Country | App shows | Verdict | Sources read (all 4 Nov 2026) |
|---|---|---|---|
| Egypt | **123** (note: police 122) | Confirmed | GOV.UK FCDO "Getting help – Egypt": ambulance 123, police 122, fire 180, tourist police 126. MENA state news agency refers to "the 123 hotline" (undated). *Weakness: no Egyptian health-ministry or ambulance-authority page found.* |
| Saudi Arabia | **997** (note: unified 911) | Both numbers appear in government sources | Saudi Red Crescent Authority contact page: "Ambulances – 997". FCDO: "911 (ambulance, fire, police)"; "call 112" if you have no Saudi SIM. my.gov.sa lists a "Unified Emergency Number" without digits. |
| UAE | **998** (note: police 999; 112 from mobiles) | 998 and 999 confirmed; **112 note unverified** | u.ae "Handling emergencies": police 999, ambulance 998, fire 997. FCDO: ambulance 998, fire 997, police 999. Saudi MOFA embassy page: "Ambulance: 998 or 999". None mentions 112. |
| Qatar | **999** (note: 112 also works from mobiles) | 999 confirmed; **112 note unverified** | Hamad Medical Corporation: "In a life-threatening emergency, call 999 immediately." FCDO: "999 (ambulance, fire, police)". Neither mentions 112. |
| Bahrain | **999** | Confirmed | Bahrain national portal, Medical Emergencies: "To request an ambulance, call toll-free number 999 from any phone in the Kingdom." FCDO: "999 (ambulance, fire, police)". |
| Oman | **9999** | Confirmed | Royal Oman Police contact page: "Emergency 9999". FCDO: "9999 (ambulance, fire, police)". Oman Observer, 9 Aug 2017: ROP clarified that 9999, not 112, is the number. |
| United Kingdom | **999** (note: 112 also works) | Confirmed (both) | NHS "When to call 999". GOV.UK "999 and 112: the UK's national emergency numbers": 112 can be used in the UK. |
| European Union | **112** | Confirmed | European Commission digital-strategy page: 112 is the single European emergency number, working alongside national numbers. |
| US and Canada | **911** | Confirmed | 911.gov (US): "dial 911". Parks Canada (Government of Canada): "Call 911 for police, fire or ambulance." *Weakness: the Canadian source is a parks page. The FCC page would not load.* |

## B. Candidate additions (rule: at least two independent sources)

"Independent" here means separate publishers (different governments or agencies). Travel-advice teams may draw on similar background material, so treat this as the practical standard, not a guarantee.

| Country | Number | Meets the rule? | Sources read |
|---|---|---|---|
| **Kuwait** | **112** (all services) | **Yes, 3 sources** | GOV.UK FCDO: "Telephone: 112 (ambulance, fire, police)". Government of Canada travel advice: "Dial 112 for emergency assistance." Australian Smartraveller: "Call 112 or go to a hospital" for medical emergencies; 112 for all services. *Kuwait's own e.gov.kw emergency page failed to load twice, so no Kuwaiti source was read.* |
| **Jordan** | **911** | **Yes, 3 sources** | Public Security Directorate (Jordan): "Emergency Hot Line 911". FCDO: "911 (ambulance, fire, police)". Jordan government portal lists 911 for emergency medical services and also 193 ambulance, 191 police, 199 fire. |
| **Lebanon** | **140** (ambulance, Lebanese Red Cross); police 112 | **Yes, 4 sources** | Lebanese Red Cross: 140 is the national medical emergency hotline. FCDO: ambulance 140, fire 175, police 112. National News Agency (Lebanon): 112 Internal Security Forces, 125 Civil Defense, 140 Red Cross, 175 Beirut Fire Dept. Danish MFA: ambulance 140, police 112, fire 175. |
| **Iraq** | – | **No, only 1 source** | FCDO lists ambulance 122, fire 115, police 911. Government of Canada says "There is no centralized number to reach emergency services." Australian Smartraveller gives no numbers. The sources conflict, so Iraq is **not added**. A second official source (Iraqi Ministry of Health, or WHO Iraq) or an Iraqi reviewer is needed. |

## C. Decisions (taken by the founder, 5 Nov 2026)

1. **Unverified "112" notes (UAE, Qatar): remove.** Approved. Goes to Agent 1 as CR-1. They can be restored if a UAE or Qatari government source is found.
2. **Saudi Arabia: which number leads.** Not yet decided by a reviewer. The ambulance authority says 997; the UK government says 911 for everything. The app shows 997 with 911 as a note, which is defensible. A Saudi reviewer should confirm.
3. **Add Kuwait (112), Jordan (911), Lebanon (140; police 112): approved.** That makes 12 countries, so `FACTSHEET.md` §2 ("9 countries/regions") must change in the same pull request (FACTSHEET §8). The Arabic wording of the new notes still needs a native reviewer before release.

## D. What I did not do

- I did not edit any code. The number table is in JavaScript, so the change goes to Agent 1 as **CR-1** in `change-requests-for-agent-1.md`, with ready-to-paste rows.
- Numbers change. I recommend re-checking every six months, and whenever a government announces a change.
- I could not reach Kuwait's government emergency page, the FCC page, or any Egyptian health-ministry page. Those are the gaps a human or a later pass should close.
