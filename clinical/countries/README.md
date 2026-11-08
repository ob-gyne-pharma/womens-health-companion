# Country files · pilot (Egypt, Kuwait) · schema v0.1

**Task A2-6 · Agent 2 · 6 Nov 2026.** Nothing here is reviewed. All Arabic is an Agent 2 draft.

## What the pilot found (plain version)

| | Egypt | Kuwait |
|---|---|---|
| Emergency number | 123 ambulance, confirmed by 2 sources | 112 for all services, confirmed by 3 sources |
| Antenatal schedule | **Not found.** Only WHO's "at least 8 contacts" | **Not found.** Same |
| Who a woman sees first | Not found | Not found |
| Pregnancy vaccines | WHO reference only | A news report of a 2024 ministry decision: Tdap replaces tetanus toxoid (timing not given) |
| Child vaccine schedule | **Sources disagree** (3 sources, 3 versions) | Changes reported (hexavalent, MMRV…), no full schedule, no birth doses |
| Vitamin D | **Authorities disagree**: WHO says not recommended routinely; NHS says "consider" Oct to Mar; no national source | Same |
| Mental-health helpline | Candidate only (2020 announcement) | Candidate only (2020, daytime hours only) |
| Violence-against-women helpline | Candidate only (UN page, 2020) | Not found |

**What this means.** The UK content in the app (midwife appointments, NICE schedule, NHS vitamin D wording) has **no Egyptian or Kuwaiti equivalent in the sources I could reach**. I could not replace it with national guidance. I could only say what is known, what conflicts, and what a reviewer has to supply. I will not fill the gaps with WHO or UK guidance presented as national policy.

**What a reviewer must supply (the shortest list that unblocks the rest):**
1. Egypt: the current Ministry of Health and Population antenatal protocol and national immunization schedule.
2. Kuwait: the Ministry of Health antenatal guideline and the 2025 immunization schedule document.
3. A named local obstetrician for each country to describe the usual care pathway, and to say who a woman contacts first.
4. For each helpline marked "candidate": a current official page, or someone who has called it and noted the date and hours.

Why the gaps: ministry sites for both countries either did not load, are not indexed by the search tool, or publish documents I could not reach. This is a limit of this pass, not proof the documents do not exist.

## Files

| File | What it is |
|---|---|
| `eg.json`, `kw.json` | The data. Source of truth. |
| `countries-pilot-review.xlsx` | The same data as a spreadsheet for reviewers (one sheet per country, plus Sources). Generated from the JSON; edit the JSON, not the sheet, for content changes. |

## Format (proposal for Agent 1 · CR-8)

```
{ schemaVersion, country{code,name{en,ar}}, lastChecked, status, arabicNote,
  sources[ {id, publisher, title, url, date, accessed, kind, caveat} ],
  items[ {id, section, topic, content{en,ar}, evidence, sourceIds[], notes,
          reviewerMustSupply, review{status, reviewer, date}} ] }
```

- `section` is one of: `emergency`, `antenatal`, `vaccination`, `supplements`, `helplines`, `medicines`.
- `evidence` is one of: `confirmed` (two or more independent sources agree), `single-source`, `conflict`, `reference-only` (international guidance, not national policy), `not-found`.
- `review.status` is `unreviewed` or `reviewed`. `reviewed` requires a named reviewer from the register's Reviewers sheet and a date.
- **Display rule for the app:** show an item to users only if `evidence` is `confirmed` **and** `review.status` is `reviewed`. Everything else is internal. (One exception for a decision by you: emergency numbers already live in the app and stay until Agent 1 applies CR-1.) Helplines marked "candidate" must never be shown.
- A validator ran on both files: unique IDs, valid evidence values, every source ID exists, `confirmed` needs two or more sources, `not-found` has none, all items start unreviewed, no empty English or Arabic.

**Questions for Agent 1** (so the format fits the code): can the app load a JSON file per country at build time? Where should the user's country choice live, given the privacy rules (CR-2 stage 2)? Do you want schedules (week-by-week reminders) in the same file, or a separate `schedule` block? I will add it once you answer.

## Next

Saudi Arabia, UAE, Qatar, Bahrain, Oman and the UK follow the same format. Given how thin official sources were here, I suggest doing them in this order: UK (sources are plentiful, and it makes the current content properly labelled), then Saudi Arabia, UAE, Qatar, Bahrain, Oman.

---

## Update 6 Nov 2026: United Kingdom added (`gb.json`)

20 items, 9 sources. Evidence: 1 confirmed (999), 18 single-source (NHS pages), 1 conflict (vitamin D, NHS vs WHO). England-focused; Scotland, Wales and Northern Ireland were not checked. Same format as `eg.json` and `kw.json` plus an `appItems` field linking each line to the app's reminder IDs, so a reviewer can see what would change. The UK file is the check of the app's current content, so it produced three new fix-list items (F-20 to F-22). Three NHS pages read had review dates that had lapsed (vaccination schedule, vaccinations in pregnancy): re-check before use. `uk-items.json` is the raw list of the app's 29 UK reminders used as the input.
