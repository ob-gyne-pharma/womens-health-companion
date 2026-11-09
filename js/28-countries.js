/* Women & Families | js/28-countries.js — GENERATED FILE, do not hand-edit.
   Source: clinical/countries/*.json. Regenerate with: node tools/build-countries.mjs
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js.

   Per-country emergency, antenatal, vaccination, supplement and helpline information,
   gathered and sourced by Agent 2 (clinical content & localization). ALL of it is draft
   and unreviewed as of this build — see each country's top-level "status" field and
   clinical/clinical-governance-framework-v0.1.md.
   Sections in use: emergency, antenatal, postnatal, vaccination, supplements, helplines,
   medicines.

   THE DISPLAY GATE (Clinical Governance Framework §6, binding — do not work around it):
   an item may be shown to a user only when evidence === 'confirmed' AND
   review.status === 'reviewed'. Both conditions, always, with no exceptions for T1
   (life-critical) content. Use confirmedCountryItems() below rather than reading
   COUNTRY_DATA directly, so this rule cannot be accidentally bypassed by new code. */
'use strict';

const COUNTRY_DATA = {
  "ae": {
    "schemaVersion": "0.1",
    "country": {
      "code": "AE",
      "name": {
        "en": "United Arab Emirates",
        "ar": "الإمارات العربية المتحدة"
      }
    },
    "lastChecked": "2026-11-07",
    "status": "draft: unreviewed",
    "arabicNote": "All Arabic text is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "GOV-AE",
        "publisher": "UAE Government portal (beta.government.ae)",
        "title": "Handling emergencies",
        "url": "https://beta.government.ae/information-and-services/justice-safety-and-the-law/handling-emergencies",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government portal",
        "caveat": "Read 7 Nov 2026. Official UAE government site. Ambulance 998, police 999, fire 997."
      },
      {
        "id": "FCDO-AE",
        "publisher": "UK FCDO",
        "title": "Foreign travel advice: UAE, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/getting-help",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read in A2-4 (4 Nov 2026). Ambulance 998, fire 997, police 999. Saudi MOFA embassy page also says 998/999."
      },
      {
        "id": "DOH-AE",
        "publisher": "Abu Dhabi Department of Health",
        "title": "Abu Dhabi Public Health Centre – RSV maternal immunisation",
        "url": "https://pro.campus.sanofi/ae/respiratory-syncytial-virus/articles/rsv-prevention-guidelines-in-uae",
        "date": "2026",
        "accessed": "2026-11-07",
        "kind": "government health authority (via Sanofi professional page)",
        "caveat": "Specific gestational weeks for maternal RSV vaccine not stated. Covers infant monoclonal antibody programme."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-07",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy."
      }
    ],
    "items": [
      {
        "id": "AE-EMG-01",
        "section": "emergency",
        "topic": "ambulance",
        "content": {
          "en": "Ambulance: 998. Police: 999. Fire (Civil Defence): 997. All work from anywhere in the UAE.",
          "ar": "الإسعاف: 998. الشرطة: 999. الإطفاء: 997. تعمل من أي مكان في الإمارات."
        },
        "evidence": "confirmed",
        "sourceIds": [
          "GOV-AE",
          "FCDO-AE"
        ],
        "notes": "Official UAE portal and FCDO agree: 998 ambulance, 999 police, 997 fire. 112 notes removed per founder decision (A2-4 CR-1). App already shows 998 — consistent.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "AE-VAC-01",
        "section": "vaccination",
        "topic": "RSV vaccine in pregnancy",
        "content": {
          "en": "The UAE has an RSV vaccination programme for pregnant women. Abu Dhabi and Dubai health authorities refer to maternal RSV vaccination, but specific gestational weeks were not confirmed from an official page in this pass.",
          "ar": "يوجد في الإمارات برنامج لتطعيم الحوامل ضد فيروس RSV. أشارت سلطتا أبوظبي ودبي الصحيتان إليه دون تحديد أسابيع رسمية في الصفحات المقروءة."
        },
        "evidence": "single-source",
        "sourceIds": [
          "DOH-AE"
        ],
        "notes": "Professional-facing Sanofi page cites Abu Dhabi Public Health Centre and Dubai Health Authority guidelines. Direct MOH URL for gestational weeks not found.",
        "reviewerMustSupply": "UAE obstetrician or MOH maternal vaccine circular to confirm weeks.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "AE-ANC-01",
        "section": "antenatal",
        "topic": "antenatal schedule",
        "content": {
          "en": "No official UAE Ministry of Health antenatal appointment schedule was found in this pass. WHO recommends a minimum of eight contacts.",
          "ar": "لم نجد جدول مواعيد رسمي من وزارة الصحة الإماراتية. منظمة الصحة العالمية توصي بما لا يقل عن 8 زيارات."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "The National (2013 article) refers to an Abu Dhabi antenatal programme but the article is 10+ years old.",
        "reviewerMustSupply": "UAE obstetrician or HAAD/MOH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "AE-SUP-01",
        "section": "supplements",
        "topic": "folic acid in pregnancy",
        "content": {
          "en": "No UAE Ministry of Health specific folic acid dose recommendation was found in this pass. WHO recommends 400 mcg daily.",
          "ar": "لم نجد توصية بجرعة محددة من وزارة الصحة الإماراتية. منظمة الصحة العالمية توصي بـ 400 ميكروغرام يوميًا."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "WHO reference only.",
        "reviewerMustSupply": "UAE pharmacist or MOH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "AE-MED-01",
        "section": "medicines",
        "topic": "drug regulator",
        "content": {
          "en": "The UAE Ministry of Health and Prevention (mohap.gov.ae) and the Abu Dhabi Department of Health (doh.gov.ae) regulate medicines. Their pregnancy/breastfeeding information pages were not read in this pass.",
          "ar": "وزارة الصحة ووقاية المجتمع الإماراتية ودائرة الصحة أبوظبي تنظمان الأدوية. لم تُقرأ صفحاتهما في هذه المرحلة."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist to supply the regulator pages to use.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "bh": {
    "schemaVersion": "0.1",
    "country": {
      "code": "BH",
      "name": {
        "en": "Bahrain",
        "ar": "البحرين"
      }
    },
    "lastChecked": "2026-11-07",
    "status": "draft: unreviewed",
    "arabicNote": "All Arabic text is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "MOH-BH-EMG",
        "publisher": "Bahrain national portal (bahrain.bh)",
        "title": "National portal – Medical Emergencies",
        "url": "https://www.bahrain.bh",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government portal",
        "caveat": "Read in A2-4 (4 Nov 2026). 999 toll-free from any phone."
      },
      {
        "id": "FCDO-BH",
        "publisher": "UK FCDO",
        "title": "Foreign travel advice: Bahrain, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/bahrain/getting-help",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read in A2-4. 999 ambulance, fire, police."
      },
      {
        "id": "MOH-BH-VAC",
        "publisher": "Bahrain Ministry of Health",
        "title": "Recommended Immunization Schedule for the Kingdom of Bahrain",
        "url": "https://www.moh.gov.bh/Content/Upload/File/638771217724743135-Recommended-Immunization-Schedule-for-the-Kingdom-of-Bahrain.pdf",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government immunization schedule",
        "caveat": "Read 7 Nov 2026. Childhood schedule confirmed from official MOH document. Tdap listed for adolescents and as replacement for Td in reproductive-age women; seasonal flu for pregnant women listed as \"at risk\"."
      },
      {
        "id": "NHRA-BH",
        "publisher": "Bahrain National Health Regulatory Authority",
        "title": "Circular No. 12 2022 – Tdap vaccine for pregnant women",
        "url": "https://nhra.bh/AR/MediaHandler/ImageHandler/documents/Announcements/Announcement2022_Circular No. (12) 2022_To All private Healthcare Facilities_Tdap Vaccine to Pregnant_20220321.pdf",
        "date": "2022-03-21",
        "accessed": "2026-11-07",
        "kind": "government health regulator",
        "caveat": "Read 7 Nov 2026. Directed private facilities to give Tdap to pregnant women eligible for Td \"until further notice.\" Gestational weeks not stated in the circular."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-07",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy."
      }
    ],
    "items": [
      {
        "id": "BH-EMG-01",
        "section": "emergency",
        "topic": "ambulance, fire and police",
        "content": {
          "en": "Emergency: 999 (ambulance, fire and police), toll-free from any phone in Bahrain.",
          "ar": "الطوارئ: 999 (الإسعاف والإطفاء والشرطة)، مجانًا من أي هاتف في البحرين."
        },
        "evidence": "confirmed",
        "sourceIds": [
          "MOH-BH-EMG",
          "FCDO-BH"
        ],
        "notes": "Bahrain national portal and FCDO both confirm 999. App already shows 999 — consistent.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-VAC-01",
        "section": "vaccination",
        "topic": "Tdap in pregnancy",
        "content": {
          "en": "Bahrain directed private health facilities to give pregnant women Tdap in place of Td (2022 circular, still in effect). Gestational weeks not stated in the circular.",
          "ar": "وجّهت البحرين المرافق الصحية الخاصة لإعطاء الحوامل لقاح Tdap بدلًا من Td (تعميم 2022). لم تُحدَّد الأسابيع في التعميم."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHRA-BH"
        ],
        "notes": "Circular gives Tdap as substitute for Td without specifying weeks. International standard is 27-36 weeks but this was not stated in the Bahrain document read.",
        "reviewerMustSupply": "Updated NHRA or MOH circular confirming weeks and whether still in effect.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-VAC-02",
        "section": "vaccination",
        "topic": "flu vaccine in pregnancy",
        "content": {
          "en": "Bahrain MOH immunization schedule lists influenza vaccine as recommended each season for pregnant women (at-risk category).",
          "ar": "يُدرج جدول التطعيمات البحريني لقاح الإنفلونزا ضمن التوصيات الموسمية للحوامل (فئة عالية الخطورة)."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOH-BH-VAC"
        ],
        "notes": "From the official MOH immunization schedule document, confirmed from gov source.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-VAC-03",
        "section": "vaccination",
        "topic": "routine childhood schedule",
        "content": {
          "en": "Bahrain routine schedule (from official MOH document): hepatitis B at birth; hexavalent, PCV, rotavirus at 2, 4, 6 months; MMR and varicella at 12 months; hepatitis A at 15 months; boosters at 18 months; varicella dose 2 at 3 years; DTaP-IPV booster at 4-5 years.",
          "ar": "جدول التطعيمات الروتيني في البحرين (من وثيقة وزارة الصحة): هيباتيتس B عند الولادة؛ السداسي و PCV والروتا في الشهر 2 و4 و6؛ MMR والجدري في الشهر 12؛ هيباتيتس A في الشهر 15؛ جرعات منشطة في الشهر 18؛ جرعة ثانية من جدري الماء في السنة 3."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOH-BH-VAC"
        ],
        "notes": "From official MOH document – single source as the FCDO/WHO do not detail the childhood schedule. Needs a Bahraini clinician to verify currency.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-ANC-01",
        "section": "antenatal",
        "topic": "antenatal schedule",
        "content": {
          "en": "No official Bahrain Ministry of Health antenatal appointment schedule was found in this pass. WHO recommends a minimum of eight contacts.",
          "ar": "لم نجد جدول مواعيد رسمي من وزارة الصحة البحرينية. منظمة الصحة العالمية توصي بما لا يقل عن 8 زيارات."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "",
        "reviewerMustSupply": "Bahraini obstetrician or MOH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-SUP-01",
        "section": "supplements",
        "topic": "folic acid and iron in pregnancy",
        "content": {
          "en": "No Bahrain Ministry of Health specific supplement dose was found in this pass. WHO recommends folic acid 400 mcg and iron 30-60 mg daily.",
          "ar": "لم نجد توصية بحرينية بجرعة محددة. منظمة الصحة العالمية توصي بحمض الفوليك 400 ميكروغرام والحديد 30-60 ملغ يوميًا."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "WHO reference only.",
        "reviewerMustSupply": "Bahraini pharmacist or MOH page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "BH-MED-01",
        "section": "medicines",
        "topic": "drug regulator",
        "content": {
          "en": "The National Health Regulatory Authority (NHRA, nhra.bh) regulates medicines in Bahrain. Its pregnancy/breastfeeding pages were not read in this pass.",
          "ar": "هيئة الرقابة على الرعاية الصحية (NHRA) تنظم الأدوية في البحرين. لم تُقرأ صفحاتها في هذه المرحلة."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist to supply NHRA pages.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "eg": {
    "schemaVersion": "0.1",
    "country": {
      "code": "EG",
      "name": {
        "en": "Egypt",
        "ar": "مصر"
      }
    },
    "lastChecked": "2026-11-06",
    "status": "pilot draft: unreviewed",
    "arabicNote": "All Arabic text in this file is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "FCDO-EG",
        "publisher": "UK Foreign, Commonwealth & Development Office",
        "title": "Foreign travel advice: Egypt, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/egypt/getting-help",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "government travel advice",
        "caveat": "A foreign government, not an Egyptian source."
      },
      {
        "id": "MENA-123",
        "publisher": "Middle East News Agency (Egypt state news agency)",
        "title": "Article referring to the 123 hotline",
        "url": "https://www.mena.org.eg/en/news/dbcall/table/textnews/id/11191656",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "state news agency",
        "caveat": "Undated."
      },
      {
        "id": "EMRO-IMM",
        "publisher": "WHO Eastern Mediterranean Regional Office",
        "title": "Prevention: immunization schedule (table for several countries, Arabic page)",
        "url": "https://www.emro.who.int/ar/child-health/strategy-adaptation/prevention-immunization-schedule.html",
        "date": "n/d",
        "accessed": "2026-11-06",
        "kind": "regional WHO page",
        "caveat": "Undated table; may be out of date."
      },
      {
        "id": "ET-VAX",
        "publisher": "Egypt Today, citing Ministry of Health and Population reports",
        "title": "How Egypt succeeded in containing infectious diseases after vaccinating more than 99% of children",
        "url": "https://www.egypttoday.com/Article/1/146982/How-Egypt-succeeded-in-containing-infectious-diseases-after-vaccinating-more",
        "date": "2026-05-07",
        "accessed": "2026-11-06",
        "kind": "news report citing the ministry",
        "caveat": "News report, not the ministry schedule itself. Names BCG and hepatitis B as birth doses; lists no full schedule."
      },
      {
        "id": "EKB-VAX",
        "publisher": "Egyptian journal article (journals.ekb.eg), no ministry document cited",
        "title": "Paper listing \"required compulsory vaccines in Egypt\"",
        "url": "https://journals.ekb.eg/article_265617_44615fb7c6757669be94e5c1ae4cf626.pdf",
        "date": "n/d",
        "accessed": "2026-11-06",
        "kind": "journal article",
        "caveat": "No source or year given for the schedule."
      },
      {
        "id": "ET-MH",
        "publisher": "Egypt Today, citing the Ministry of Health",
        "title": "Egypt allocates 2 hotlines for psychological support during Covid-19",
        "url": "https://www.egypttoday.com/Article/1/83220/Egypt-allocates-2-hotlines-for-psychological-support-during-Covid-19",
        "date": "2020-03-31",
        "accessed": "2026-11-06",
        "kind": "news report",
        "caveat": "Pandemic-era announcement; current status unknown."
      },
      {
        "id": "EI-MH",
        "publisher": "Egypt Independent, citing the Health Ministry",
        "title": "Egypt provides phone services to give psychological support under coronavirus outbreak",
        "url": "https://www.egyptindependent.com/egypt-provides-phone-services-to-give-psychological-support-under-coronavirus-outbreak/",
        "date": "2020-03-31",
        "accessed": "2026-11-06",
        "kind": "news report",
        "caveat": "Pandemic-era announcement; says nothing about whether the lines still operate."
      },
      {
        "id": "UNODC-NCW",
        "publisher": "UN Office on Drugs and Crime (Regional Office for the Middle East and North Africa)",
        "title": "Interview with the head of the complaints office, National Council for Women",
        "url": "https://unodc.org/romena/en/Stories/2020/December/egypt_-on-the-other-side-of-the-hotline---interview-with-the-head-of-complaints-office-at-the-national-council-for-women-ncw.html",
        "date": "2020-12-07",
        "accessed": "2026-11-06",
        "kind": "UN agency page",
        "caveat": "One source; 2020."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO (copy of the executive summary hosted by AIDS Data Hub)",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-06",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy of the WHO document."
      },
      {
        "id": "NHS-VITD",
        "publisher": "NHS (UK)",
        "title": "Vitamins and supplements in pregnancy",
        "url": "https://www.nhs.uk/best-start-in-life/pregnancy/vitamins-and-supplements-in-pregnancy/",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "UK national health service page",
        "caveat": "UK guidance; says \"consider\" 10 micrograms vitamin D between October and March; folic acid 400 micrograms, ideally from 3 months before conception until week 12."
      }
    ],
    "items": [
      {
        "id": "EG-EMG-01",
        "section": "emergency",
        "topic": "ambulance",
        "content": {
          "en": "Ambulance: 123",
          "ar": "الإسعاف: 123"
        },
        "evidence": "confirmed",
        "sourceIds": [
          "FCDO-EG",
          "MENA-123"
        ],
        "notes": "Also verified in the 4 Nov emergency-numbers report. Neither source is an Egyptian health ministry or ambulance-authority page.",
        "reviewerMustSupply": "A first-hand Egyptian source (ministry or ambulance organisation).",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-EMG-02",
        "section": "emergency",
        "topic": "police",
        "content": {
          "en": "Police: 122",
          "ar": "الشرطة: 122"
        },
        "evidence": "single-source",
        "sourceIds": [
          "FCDO-EG"
        ],
        "notes": "FCDO lists ambulance 123, police 122, fire 180, tourist police 126.",
        "reviewerMustSupply": "A second source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-ANC-01",
        "section": "antenatal",
        "topic": "national visit schedule",
        "content": {
          "en": "No Egyptian national antenatal schedule was found. WHO recommends a minimum of eight contacts.",
          "ar": "لم أجد جدولًا وطنيًا مصريًا لمتابعة الحمل. توصي منظمة الصحة العالمية بثماني زيارات على الأقل."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "The UK schedule in the app (NICE NG201) is not Egypt policy. Do not present WHO as Egypt policy.",
        "reviewerMustSupply": "The Ministry of Health and Population antenatal-care protocol or guideline.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-ANC-02",
        "section": "antenatal",
        "topic": "who to contact",
        "content": {
          "en": "Not found: whether women usually see an obstetrician-gynaecologist directly or go first to a primary-care unit.",
          "ar": "لم أجد: هل تراجع النساء طبيب النساء والتوليد مباشرة أم وحدة الرعاية الأولية أولًا."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Matters because the checker says \"midwife or maternity unit\" (fix list F-13).",
        "reviewerMustSupply": "A local clinician reviewer to describe the usual pathway, with a ministry source if possible.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-VAX-01",
        "section": "vaccination",
        "topic": "in pregnancy",
        "content": {
          "en": "WHO recommends tetanus toxoid vaccination for all pregnant women. The Egyptian national schedule for pregnancy was not found.",
          "ar": "توصي منظمة الصحة العالمية بتطعيم التيتانوس لجميع الحوامل. لم أجد الجدول الوطني المصري للحمل."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "",
        "reviewerMustSupply": "Ministry schedule for pregnant women.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-VAX-02",
        "section": "vaccination",
        "topic": "child: birth doses",
        "content": {
          "en": "Sources disagree on birth doses. A ministry-cited news report and a journal paper say BCG and hepatitis B are given at birth; a WHO regional table shows hepatitis B at 2 months and BCG \"birth to 3 months\".",
          "ar": "تختلف المصادر في جرعات الولادة. يذكر تقرير صحفي ينقل عن الوزارة ومقال علمي أن BCG والتهاب الكبد B يُعطيان عند الولادة، بينما يظهر جدول لمنظمة الصحة العالمية التهاب الكبد B عند الشهرين."
        },
        "evidence": "conflict",
        "sourceIds": [
          "ET-VAX",
          "EKB-VAX",
          "EMRO-IMM"
        ],
        "notes": "The WHO regional table is undated and may be old. Do not publish any Egyptian child schedule until a ministry document is supplied.",
        "reviewerMustSupply": "The current Ministry of Health and Population national immunization schedule (official document).",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-VAX-03",
        "section": "vaccination",
        "topic": "child: later doses",
        "content": {
          "en": "Sources disagree on later doses: the WHO regional table shows measles at 9 months and MMR at 18 months; the journal paper shows MMR at 12 months and 18 months, plus Hib and vitamin A.",
          "ar": "تختلف المصادر في الجرعات اللاحقة: يذكر جدول منظمة الصحة العالمية الحصبة عند 9 أشهر والحصبة والنكاف والحصبة الألمانية عند 18 شهرًا، بينما يذكر المقال العلمي الحصبة والنكاف والحصبة الألمانية عند 12 شهرًا وعند 18 شهرًا، إضافة إلى لقاح Hib وفيتامين أ."
        },
        "evidence": "conflict",
        "sourceIds": [
          "EMRO-IMM",
          "EKB-VAX"
        ],
        "notes": "Same action as EG-VAX-02.",
        "reviewerMustSupply": "Same document as EG-VAX-02.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-SUP-01",
        "section": "supplements",
        "topic": "iron and folic acid",
        "content": {
          "en": "WHO recommends daily oral iron (30 to 60 mg) with 400 micrograms of folic acid in pregnancy. An Egyptian national recommendation was not found.",
          "ar": "توصي منظمة الصحة العالمية بالحديد (30 إلى 60 ملغ) مع 400 ميكروغرام من حمض الفوليك يوميًا أثناء الحمل. لم أجد توصية وطنية مصرية."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "The app's folic acid reminders follow the NHS (400 micrograms; ideally from 3 months before conception). The app has no iron reminder.",
        "reviewerMustSupply": "Ministry or society recommendation for Egypt.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-SUP-02",
        "section": "supplements",
        "topic": "vitamin D",
        "content": {
          "en": "Authorities differ. WHO (2016) does not recommend vitamin D supplements in pregnancy for improving outcomes. The NHS says to consider 10 micrograms between October and March. No Egyptian recommendation was found.",
          "ar": "تختلف الجهات. لا توصي منظمة الصحة العالمية (2016) بمكملات فيتامين د أثناء الحمل لتحسين النتائج، بينما تقول هيئة الخدمات الصحية الوطنية البريطانية (NHS) إنه يمكن التفكير في 10 ميكروغرامات بين أكتوبر ومارس. لم أجد توصية مصرية."
        },
        "evidence": "conflict",
        "sourceIds": [
          "WHO-ANC",
          "NHS-VITD"
        ],
        "notes": "The NHS statement was read on 4 Nov 2026 (see fix list F-07). This is why the app's vitamin D wording needs a local decision.",
        "reviewerMustSupply": "A local obstetric or pharmacy reviewer decision, with a national source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-HLP-01",
        "section": "helplines",
        "topic": "mental health",
        "content": {
          "en": "Candidate only: 08008880700 (and 0220816831), announced by the Ministry of Health in March 2020. Not confirmed as current. Do not show to users yet.",
          "ar": "مرشح فقط: 08008880700 (و0220816831)، أعلنتها وزارة الصحة في مارس 2020. لم يُتأكد أنها ما زالت تعمل. لا تُعرض للمستخدمات بعد."
        },
        "evidence": "single-source",
        "sourceIds": [
          "ET-MH",
          "EI-MH"
        ],
        "notes": "Two news reports, but both are the same March 2020 announcement, not independent confirmations, and neither says the lines still work. No official or recent page found.",
        "reviewerMustSupply": "A current ministry page, or a reviewer who has called it and noted the date and hours.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-HLP-02",
        "section": "helplines",
        "topic": "violence against women",
        "content": {
          "en": "Candidate only: 15115, the complaints hotline of the National Council for Women (UNODC page, December 2020). Not confirmed as current.",
          "ar": "مرشح فقط: 15115، الخط الساخن لمكتب شكاوى المجلس القومي للمرأة (صفحة مكتب الأمم المتحدة المعني بالمخدرات والجريمة، ديسمبر 2020). لم يُتأكد أنه ما زال يعمل."
        },
        "evidence": "single-source",
        "sourceIds": [
          "UNODC-NCW"
        ],
        "notes": "Other pages in my search results mention 15115 (Ahram, Egypt Today, Egyptian Streets) but I could not read them.",
        "reviewerMustSupply": "A second, current source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "EG-REG-01",
        "section": "medicines",
        "topic": "regulator and medicine information",
        "content": {
          "en": "Not researched in this pass (Egyptian Drug Authority).",
          "ar": "لم يُبحث في هذه المرحلة (هيئة الدواء المصرية)."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist reviewer to name the regulator pages to use.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "gb": {
    "schemaVersion": "0.1",
    "country": {
      "code": "GB",
      "name": {
        "en": "United Kingdom",
        "ar": "المملكة المتحدة"
      }
    },
    "lastChecked": "2026-11-06",
    "status": "pilot draft: unreviewed",
    "arabicNote": "All Arabic text in this file is an Agent 2 draft. No native clinical reviewer has seen it.",
    "scopeNote": "Mostly England (NHS). Scotland, Wales and Northern Ireland schedules can differ and were not checked.",
    "sources": [
      {
        "id": "GOV-999",
        "publisher": "UK Government (GOV.UK)",
        "title": "999 and 112: the UK's national emergency numbers",
        "url": "https://gov.uk/guidance/999-and-112-the-uks-national-emergency-numbers",
        "date": "n/d",
        "accessed": "2026-11-06",
        "kind": "government guidance",
        "caveat": "Read on 4 Nov 2026."
      },
      {
        "id": "NHS-MH",
        "publisher": "NHS (UK)",
        "title": "Where to get urgent help for mental health",
        "url": "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/",
        "date": "page reviewed 2026-10-23",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Next review due 2029-10-23. Has no postnatal-specific text."
      },
      {
        "id": "NHS-ANC",
        "publisher": "NHS (UK)",
        "title": "Your antenatal appointments",
        "url": "https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-appointments/",
        "date": "page reviewed 2026-04-17",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "England-focused. Next review due 2029-04-17."
      },
      {
        "id": "NHS-VAC-PREG",
        "publisher": "NHS (UK)",
        "title": "Vaccinations in pregnancy",
        "url": "https://www.nhs.uk/pregnancy/keeping-well/vaccinations/",
        "date": "page reviewed 2023-01-18",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Stated next review due 2026-01-18 has passed, though page metadata shows a later modified date (2026-10-02). Treat as needing a re-check."
      },
      {
        "id": "NHS-BSP",
        "publisher": "NHS (UK)",
        "title": "Newborn blood spot test FAQs",
        "url": "https://www.nhs.uk/conditions/pregnancy-and-baby/newborn-blood-spot-faqs/",
        "date": "page reviewed 2024-09-05",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Next review due 2027-09-05."
      },
      {
        "id": "NHS-PNC",
        "publisher": "NHS (UK)",
        "title": "Your 6-week postnatal check",
        "url": "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
        "date": "page reviewed 2026-10-09",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Next review due 2029-10-09."
      },
      {
        "id": "NHS-VAC",
        "publisher": "NHS (UK)",
        "title": "NHS vaccinations and when to have them",
        "url": "https://www.nhs.uk/conditions/vaccinations/NHS-vaccinations-and-when-to-have-them/",
        "date": "page reviewed 2023-08-09",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Stated next review due 2026-08-09 has passed; metadata shows modified 2026-09-01. Schedule has changed recently (MMRV). Re-check."
      },
      {
        "id": "NHS-VITD",
        "publisher": "NHS (UK)",
        "title": "Vitamins and supplements in pregnancy",
        "url": "https://www.nhs.uk/best-start-in-life/pregnancy/vitamins-and-supplements-in-pregnancy/",
        "date": "n/d",
        "accessed": "2026-11-06",
        "kind": "UK national health service page",
        "caveat": "Says \"consider\" vitamin D 10 micrograms October to March; folic acid 400 micrograms ideally from 3 months before conception until week 12."
      },
      {
        "id": "UKTIS",
        "publisher": "UK Teratology Information Service (via National Poisons Information Service)",
        "title": "Medicines in Pregnancy (public summaries and BUMPS leaflets)",
        "url": "https://www.medicinesinpregnancy.org/",
        "date": "n/d",
        "accessed": "2026-11-06",
        "kind": "UK specialist service",
        "caveat": "Full monographs are on TOXBASE (professionals only)."
      }
    ],
    "items": [
      {
        "id": "UK-EMG-01",
        "section": "emergency",
        "topic": "ambulance, police, fire",
        "content": {
          "en": "Emergency: 999",
          "ar": "الطوارئ: 999"
        },
        "evidence": "confirmed",
        "sourceIds": [
          "GOV-999",
          "NHS-MH"
        ],
        "notes": "GOV.UK names 999 as the national emergency number; the NHS page says call 999 if life is at risk.",
        "reviewerMustSupply": "",
        "appItems": "EMERGENCY_NUMBERS: uk",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-EMG-02",
        "section": "emergency",
        "topic": "112 also works",
        "content": {
          "en": "112 also works in the UK",
          "ar": "الرقم 112 يعمل أيضًا في المملكة المتحدة"
        },
        "evidence": "single-source",
        "sourceIds": [
          "GOV-999"
        ],
        "notes": "Earlier 4 Nov report also read GOV.UK only for this note.",
        "reviewerMustSupply": "A second UK source.",
        "appItems": "EMERGENCY_NUMBERS: uk note",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-01",
        "section": "antenatal",
        "topic": "booking appointment",
        "content": {
          "en": "First midwife appointment at 8 to 12 weeks.",
          "ar": "أول موعد مع القابلة بين الأسبوع 8 و12."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App says \"Week 8\". Within the range but narrower than the source.",
        "reviewerMustSupply": "NICE guideline (second source) and a UK midwife.",
        "appItems": "R-A01",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-02",
        "section": "antenatal",
        "topic": "dating scan",
        "content": {
          "en": "11 to 14 week scan: checks due date and development; screening for Down's, Edwards' and Patau's syndromes can be offered, and it is her choice.",
          "ar": "فحص بالموجات فوق الصوتية بين الأسبوع 11 و14: يحدد موعد الولادة ويتحقق من النمو. يمكن عرض فحص متلازمة داون وإدواردز وباتو، والقرار لكِ."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App R-A02 and R-A03 (week 10 and week 12) match the 11 to 14 week window only loosely.",
        "reviewerMustSupply": "",
        "appItems": "R-A02, R-A03",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-03",
        "section": "antenatal",
        "topic": "16-week appointment",
        "content": {
          "en": "16 week appointment: previous screening results, blood pressure and urine tests.",
          "ar": "موعد الأسبوع 16: نتائج الفحوص السابقة وقياس ضغط الدم وفحص البول."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App R-A04 adds an \"iron check\". The NHS page as read does not mention it: unverified.",
        "reviewerMustSupply": "Source for the iron check, or remove it.",
        "appItems": "R-A04",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-04",
        "section": "antenatal",
        "topic": "20-week scan",
        "content": {
          "en": "18 to 21 week scan (screening scan): checks the baby's development.",
          "ar": "فحص بين الأسبوع 18 و21: يتحقق من نمو الطفل."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App says week 20: inside the range.",
        "reviewerMustSupply": "",
        "appItems": "R-A05",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-05",
        "section": "antenatal",
        "topic": "glucose test",
        "content": {
          "en": "Gestational diabetes test, only if she has a higher chance of it, between 24 and 28 weeks.",
          "ar": "فحص سكري الحمل، فقط إذا كان احتمال الإصابة أعلى، بين الأسبوع 24 و28."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App says week 25: inside the range.",
        "reviewerMustSupply": "",
        "appItems": "R-A07",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-06",
        "section": "antenatal",
        "topic": "appointment pattern depends on whether it is a first baby",
        "content": {
          "en": "At least 10 appointments for a first baby and at least 7 if she has had a baby before. Weeks 25, 31, 40 and 41 are listed for first babies.",
          "ar": "عدد المواعيد 10 على الأقل في الحمل الأول و7 على الأقل إذا سبقت لها ولادة. المواعيد في الأسابيع 25 و31 و40 و41 مخصصة للحمل الأول."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "DIFFERENCE FROM APP: the app shows weeks 24, 31, 40 and 41 for everyone and week 24 where the NHS says 25. The app does not ask whether it is a first baby.",
        "reviewerMustSupply": "A UK midwife; NICE guideline.",
        "appItems": "R-A06, R-A09, R-A13, R-A14",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-07",
        "section": "antenatal",
        "topic": "28-week appointment",
        "content": {
          "en": "28 week appointment: blood test and, if the baby is at risk, an injection for rhesus disease.",
          "ar": "موعد الأسبوع 28: فحص دم، وحقنة للوقاية من مرض الريسوس إذا كان الطفل معرضًا للخطر."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App R-A08 also says \"fetal movement awareness\" at 28 weeks. On this page, discussing movements is listed at 25 weeks. Reduced-movement advice is a separate safety item (fix-list F-03).",
        "reviewerMustSupply": "",
        "appItems": "R-A08",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-08",
        "section": "antenatal",
        "topic": "34, 36, 38 weeks",
        "content": {
          "en": "34 week appointment (birth preparation, blood pressure, urine). 36 weeks: baby's position checked by feeling the bump. 38 weeks: position check and options if still pregnant after 40 weeks.",
          "ar": "موعد الأسبوع 34 (التحضير للولادة وضغط الدم والبول). الأسبوع 36: فحص وضع الجنين بالجس. الأسبوع 38: فحص الوضع ومناقشة الخيارات إذا استمر الحمل بعد 40 أسبوعًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App R-A10 to R-A12 broadly match. The app's \"week 36 baby position check, birth plan discussion\" and week-38 \"signs of labour\" differ slightly in wording (fix-list F-10).",
        "reviewerMustSupply": "",
        "appItems": "R-A10, R-A11, R-A12",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-ANC-09",
        "section": "antenatal",
        "topic": "41-week appointment",
        "content": {
          "en": "41 week appointment: options if still pregnant after 41 weeks.",
          "ar": "موعد الأسبوع 41: مناقشة الخيارات إذا استمر الحمل بعد 41 أسبوعًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-ANC"
        ],
        "notes": "App says \"Consultant review\". The NHS page as read does not name a consultant. Also the app says a sweep is offered at week 40; not stated on this page.",
        "reviewerMustSupply": "A UK midwife; NICE induction guidance.",
        "appItems": "R-A13, R-A14",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-VAC-01",
        "section": "vaccination",
        "topic": "whooping cough in pregnancy",
        "content": {
          "en": "Whooping cough vaccine: usually at 20 weeks, can be had from 16 weeks, and should be had before 32 weeks. If missed, it can still be given later.",
          "ar": "لقاح السعال الديكي: يُعطى عادة في الأسبوع 20 ويمكن من الأسبوع 16، ويُفضّل قبل الأسبوع 32. إذا فاتك يمكن إعطاؤه لاحقًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-VAC-PREG"
        ],
        "notes": "App R-A10 says \"still possible until labour\". The page as read says \"later\" for whooping cough; \"up until labour\" appears for RSV. Treat \"until labour\" as unverified. Page review date has lapsed.",
        "reviewerMustSupply": "A UK midwife; UKHSA/Green Book as second source.",
        "appItems": "R-A04, R-A10",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-VAC-02",
        "section": "vaccination",
        "topic": "RSV vaccine in pregnancy",
        "content": {
          "en": "RSV vaccine: offered around the 28-week appointment; can be given later if needed, up until labour.",
          "ar": "لقاح الفيروس المخلوي التنفسي: يُعرض في موعد الأسبوع 28 تقريبًا، ويمكن إعطاؤه لاحقًا عند الحاجة حتى بدء المخاض."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-VAC-PREG"
        ],
        "notes": "MISSING FROM APP: no RSV item exists in the reminders. Page review date has lapsed; confirm current policy.",
        "reviewerMustSupply": "UKHSA programme page; a UK midwife.",
        "appItems": "(none)",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-PNC-01",
        "section": "postnatal",
        "topic": "newborn blood spot test",
        "content": {
          "en": "Newborn blood spot (heel prick) test is normally done when the baby is 5 days old; sometimes earlier or later.",
          "ar": "يُجرى فحص بقعة الدم (وخز الكعب) عادة عندما يبلغ الطفل 5 أيام، وأحيانًا أبكر أو أبعد."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-BSP"
        ],
        "notes": "DIFFERENCE FROM APP: R-P02 says Day 3.",
        "reviewerMustSupply": "Second source (UK National Screening Committee).",
        "appItems": "R-P02",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-PNC-02",
        "section": "postnatal",
        "topic": "6-week check",
        "content": {
          "en": "Mother's postnatal check 6 to 8 weeks after the birth. The baby should also be checked by a GP at around this time.",
          "ar": "فحص ما بعد الولادة للأم بعد 6 إلى 8 أسابيع من الولادة. ويُفحص الطفل أيضًا عند طبيب عام في هذا الوقت تقريبًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-PNC"
        ],
        "notes": "App R-P07 says Day 42 (6 weeks). Consistent, but the source gives a window.",
        "reviewerMustSupply": "",
        "appItems": "R-P07",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-VAC-03",
        "section": "vaccination",
        "topic": "baby routine vaccines 8, 12, 16 weeks",
        "content": {
          "en": "8 weeks: 6-in-1 (1st), rotavirus (1st), MenB (1st). 12 weeks: 6-in-1 (2nd), MenB (2nd), rotavirus (2nd). 16 weeks: 6-in-1 (3rd), pneumococcal (1st).",
          "ar": "عمر 8 أسابيع: السداسي (الجرعة 1) والروتا (1) والمكورات السحائية ب (1). عمر 12 أسبوعًا: السداسي (2) والمكورات السحائية ب (2) والروتا (2). عمر 16 أسبوعًا: السداسي (3) والمكورات الرئوية (1)."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-VAC"
        ],
        "notes": "Timing matches app R-P08 to R-P10. The app already labels these as UK. Page review date has lapsed and the schedule changed recently, so re-check before use. Arabic term for 6-in-1 is on the Arabic reviewer list (F-11).",
        "reviewerMustSupply": "UKHSA Green Book or immunisation schedule PDF as second source.",
        "appItems": "R-P06, R-P08, R-P09, R-P10",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-SUP-01",
        "section": "supplements",
        "topic": "folic acid",
        "content": {
          "en": "Folic acid 400 micrograms a day, ideally from 3 months before conception until week 12 of pregnancy.",
          "ar": "حمض الفوليك 400 ميكروغرام يوميًا، ويُفضّل من 3 أشهر قبل الحمل حتى الأسبوع 12 من الحمل."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-VITD"
        ],
        "notes": "Matches app R-S01 and R-S03. App adds \"your doctor may advise a different dose\": good.",
        "reviewerMustSupply": "Second source (NICE or DHSC).",
        "appItems": "R-S01, R-S03",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-SUP-02",
        "section": "supplements",
        "topic": "vitamin D",
        "content": {
          "en": "The NHS says to consider vitamin D 10 micrograms a day between October and March. WHO does not recommend routine vitamin D supplements in pregnancy.",
          "ar": "تقول هيئة الصحة البريطانية (NHS) إنه يمكن النظر في فيتامين د 10 ميكروغرام يوميًا بين أكتوبر ومارس. ولا توصي منظمة الصحة العالمية بمكملات فيتامين د الروتينية في الحمل."
        },
        "evidence": "conflict",
        "sourceIds": [
          "NHS-VITD"
        ],
        "notes": "DIFFERENCE FROM APP: R-S04 says \"throughout pregnancy\" and R-S02/R-S05 say daily without the October to March qualifier (fix-list F-07). The WHO position is from the Egypt pilot (WHO-ANC); not re-read here. Also see policy A2-7.",
        "reviewerMustSupply": "Pharmacist and UK midwife to decide wording.",
        "appItems": "R-S02, R-S04, R-S05",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-HLP-01",
        "section": "helplines",
        "topic": "mental health urgent help",
        "content": {
          "en": "NHS: call 111 and choose the mental health option. Samaritans: 116 123, any time. If life is at risk, call 999 or go to A&E.",
          "ar": "هيئة الصحة البريطانية: اتصلي بالرقم 111 واختاري خيار الصحة النفسية. منظمة سامريتانز: 116 123 في أي وقت. إذا كانت الحياة في خطر اتصلي بـ 999 أو توجهي إلى الطوارئ."
        },
        "evidence": "single-source",
        "sourceIds": [
          "NHS-MH"
        ],
        "notes": "Candidate for the self-harm safety item (fix-list F-04). The page has no postnatal-specific text. These are UK numbers: do not show to users in other countries.",
        "reviewerMustSupply": "Second source; a UK perinatal mental-health service.",
        "appItems": "F-04",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "UK-MED-01",
        "section": "medicines",
        "topic": "where UK pregnancy medicine information comes from",
        "content": {
          "en": "UKTIS publishes public summaries and leaflets on medicines in pregnancy (medicinesinpregnancy.org). Full monographs are for professionals.",
          "ar": "تنشر خدمة UKTIS ملخصات ونشرات عامة عن الأدوية أثناء الحمل. والمراجع الكاملة مخصصة للمهنيين."
        },
        "evidence": "single-source",
        "sourceIds": [
          "UKTIS"
        ],
        "notes": "Reference for policy A2-7, not a statement about any medicine. UK service.",
        "reviewerMustSupply": "Pharmacist to confirm as a tier-2 source.",
        "appItems": "A2-7 section 3",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "kw": {
    "schemaVersion": "0.1",
    "country": {
      "code": "KW",
      "name": {
        "en": "Kuwait",
        "ar": "الكويت"
      }
    },
    "lastChecked": "2026-11-06",
    "status": "pilot draft: unreviewed",
    "arabicNote": "All Arabic text in this file is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "FCDO-KW",
        "publisher": "UK Foreign, Commonwealth & Development Office",
        "title": "Foreign travel advice: Kuwait, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/kuwait/getting-help",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "government travel advice",
        "caveat": "A foreign government, not a Kuwaiti source."
      },
      {
        "id": "GC-KW",
        "publisher": "Government of Canada",
        "title": "Travel advice and advisories for Kuwait",
        "url": "https://travel.gc.ca/destinations/kuwait",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "government travel advice",
        "caveat": "A foreign government."
      },
      {
        "id": "SMART-KW",
        "publisher": "Australian Government (Smartraveller)",
        "title": "Kuwait travel advice",
        "url": "https://www.smartraveller.gov.au/destinations/middle-east/kuwait",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "government travel advice",
        "caveat": "A foreign government."
      },
      {
        "id": "AT-VAX-2024",
        "publisher": "Arab Times (reporting a decision by the Kuwait Minister of Health)",
        "title": "Health ministry issues new guidance on child vaccinations",
        "url": "https://arabtimesonline.com/news/health-ministry-issues-new-guidance-on-child-vaccinations",
        "date": "2024-04-02",
        "accessed": "2026-11-06",
        "kind": "news report of a ministerial decision",
        "caveat": "Reports changes to the schedule, with the full schedule slated from January 2025. Not the ministry document."
      },
      {
        "id": "AT-VAX-2025",
        "publisher": "Arab Times, citing the Ministry of Health",
        "title": "Immunization programs remain a cornerstone of public health in Kuwait",
        "url": "https://www.arabtimesonline.com/news/immunization-programs-remain-a-cornerstone-of-public-health-in-kuwait-moh",
        "date": "2025-04-23",
        "accessed": "2026-11-06",
        "kind": "news report",
        "caveat": "Says schedules are regularly updated; lists no schedule."
      },
      {
        "id": "EMRO-KW-MH",
        "publisher": "WHO Eastern Mediterranean Regional Office",
        "title": "Kuwait launches novel initiatives to improve access to mental health care during the COVID-19 pandemic",
        "url": "https://www.emro.who.int/mnh/news/kuwait-launches-novel-initiatives-to-improve-access-to-mental-health-care-during-the-covid-19-pandemic.html",
        "date": "n/d (pandemic era)",
        "accessed": "2026-11-06",
        "kind": "regional WHO page",
        "caveat": "No date shown; hours stated daily 9:00 to 17:00."
      },
      {
        "id": "KT-MH-2020",
        "publisher": "Kuwait Times",
        "title": "COVID-19 and mental health hotlines",
        "url": "https://kuwaittimes.com/covid-19-and-mental-health-hotlines/",
        "date": "2020-08-29",
        "accessed": "2026-11-06",
        "kind": "news report",
        "caveat": "Pandemic-era list; hours stated 8:00 to 17:00."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO (copy of the executive summary hosted by AIDS Data Hub)",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-06",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy of the WHO document."
      },
      {
        "id": "NHS-VITD",
        "publisher": "NHS (UK)",
        "title": "Vitamins and supplements in pregnancy",
        "url": "https://www.nhs.uk/best-start-in-life/pregnancy/vitamins-and-supplements-in-pregnancy/",
        "date": "n/d",
        "accessed": "2026-11-04",
        "kind": "UK national health service page",
        "caveat": "UK guidance; says \"consider\" 10 micrograms vitamin D between October and March; folic acid 400 micrograms, ideally from 3 months before conception until week 12."
      }
    ],
    "items": [
      {
        "id": "KW-EMG-01",
        "section": "emergency",
        "topic": "all services",
        "content": {
          "en": "Emergency (ambulance, fire and police): 112",
          "ar": "الطوارئ (الإسعاف والإطفاء والشرطة): 112"
        },
        "evidence": "confirmed",
        "sourceIds": [
          "FCDO-KW",
          "GC-KW",
          "SMART-KW"
        ],
        "notes": "Verified 4 Nov 2026 (see the emergency-numbers report). Kuwait's own government page would not load, so no Kuwaiti source was read.",
        "reviewerMustSupply": "A Kuwaiti government source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-ANC-01",
        "section": "antenatal",
        "topic": "national visit schedule",
        "content": {
          "en": "No Kuwaiti national antenatal schedule was found. WHO recommends a minimum of eight contacts.",
          "ar": "لم أجد جدولًا وطنيًا كويتيًا لمتابعة الحمل. توصي منظمة الصحة العالمية بثماني زيارات على الأقل."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "A Kuwait Times piece (7 Apr 2025) says maternal and child health programmes are being developed, but gives no schedule.",
        "reviewerMustSupply": "The Ministry of Health antenatal-care guideline or primary-care protocol.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-ANC-02",
        "section": "antenatal",
        "topic": "who to contact",
        "content": {
          "en": "Not found: how antenatal care is organised (primary health centre, hospital clinic, private).",
          "ar": "لم أجد: كيف تُنظَّم متابعة الحمل (مركز رعاية أولية أو عيادة مستشفى أو قطاع خاص)."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Matters because the checker says \"midwife or maternity unit\" (fix list F-13).",
        "reviewerMustSupply": "A local clinician reviewer to describe the usual pathway.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-VAX-01",
        "section": "vaccination",
        "topic": "in pregnancy",
        "content": {
          "en": "A report of a 2024 ministerial decision says Tdap replaces tetanus toxoid for pregnant women, with the full updated schedule from January 2025. The week of pregnancy was not stated.",
          "ar": "يذكر تقرير عن قرار وزاري صدر عام 2024 أن لقاح Tdap يحل محل لقاح التيتانوس للحوامل، مع الجدول المحدث كاملًا اعتبارًا من يناير 2025. لم يُذكر أسبوع الحمل."
        },
        "evidence": "single-source",
        "sourceIds": [
          "AT-VAX-2024"
        ],
        "notes": "News report of a decision, not the ministry text. The UK offers pertussis vaccine at a set gestation; do not copy the UK timing for Kuwait.",
        "reviewerMustSupply": "The Ministry of Health schedule for pregnant women, including timing.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-VAX-02",
        "section": "vaccination",
        "topic": "child schedule (changes reported)",
        "content": {
          "en": "The same report says: hexavalent vaccine at 2, 4, 6 and 18 months (replacing pentavalent); MMRV at age 2; DTaP at 3.5 years; Tdap at 10 to 12 and 16 to 18 years. Birth doses and the rest of the schedule were not found.",
          "ar": "يذكر التقرير نفسه: اللقاح السداسي عند 2 و4 و6 و18 شهرًا (بدلًا من الخماسي)، واللقاح الرباعي الفيروسي MMRV عند سنتين، وDTaP عند 3.5 سنة، وTdap عند 10 إلى 12 سنة وعند 16 إلى 18 سنة. لم أجد جرعات الولادة ولا بقية الجدول."
        },
        "evidence": "single-source",
        "sourceIds": [
          "AT-VAX-2024",
          "AT-VAX-2025"
        ],
        "notes": "Only the changes were reported, not a full schedule. A 2025 article confirms schedules are \"regularly updated\".",
        "reviewerMustSupply": "The current Ministry of Health national immunization schedule (official document).",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-SUP-01",
        "section": "supplements",
        "topic": "iron, folic acid, vitamin D",
        "content": {
          "en": "No Kuwaiti national recommendation was found. WHO: iron 30 to 60 mg with folic acid 400 micrograms daily; vitamin D not recommended routinely (2016). The NHS says to consider vitamin D 10 micrograms from October to March.",
          "ar": "لم أجد توصية وطنية كويتية. منظمة الصحة العالمية: حديد 30 إلى 60 ملغ مع حمض الفوليك 400 ميكروغرام يوميًا؛ ولا تُوصى بفيتامين د روتينيًا (2016). وتقول هيئة الخدمات الصحية الوطنية البريطانية (NHS) إنه يمكن التفكير في 10 ميكروغرامات من أكتوبر إلى مارس."
        },
        "evidence": "conflict",
        "sourceIds": [
          "WHO-ANC",
          "NHS-VITD"
        ],
        "notes": "See fix list F-07.",
        "reviewerMustSupply": "A local obstetric or pharmacy reviewer decision, with a national source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-HLP-01",
        "section": "helplines",
        "topic": "mental health",
        "content": {
          "en": "Candidate only: Kuwait Center for Mental Health hotline +965 2462 1770, daily 9:00 (or 8:00) to 17:00. This is not a 24-hour emergency line and its current status is not confirmed. Do not show to users yet.",
          "ar": "مرشح فقط: الخط الساخن لمركز الكويت للصحة النفسية +965 2462 1770، يوميًا من 9:00 (أو 8:00) إلى 17:00. ليس خط طوارئ على مدار الساعة ولم يُتأكد أنه ما زال يعمل. لا يُعرض للمستخدمات بعد."
        },
        "evidence": "single-source",
        "sourceIds": [
          "EMRO-KW-MH",
          "KT-MH-2020"
        ],
        "notes": "The two sources agree on the number but both are pandemic-era and give limited hours. Treated as one source until a current page is found.",
        "reviewerMustSupply": "A current ministry page, or a reviewer who has called it and noted the hours.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-HLP-02",
        "section": "helplines",
        "topic": "violence against women",
        "content": {
          "en": "Not found: no official hotline source was read.",
          "ar": "لم أجد: لم أقرأ أي مصدر رسمي لخط ساخن."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Search results were news reports on domestic violence figures and an aggregator site; none was a primary source.",
        "reviewerMustSupply": "A Kuwaiti reviewer to name the official service and number, with a source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "KW-REG-01",
        "section": "medicines",
        "topic": "regulator and medicine information",
        "content": {
          "en": "Not researched in this pass (Ministry of Health drug control).",
          "ar": "لم يُبحث في هذه المرحلة (الرقابة الدوائية في وزارة الصحة)."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist reviewer to name the regulator pages to use.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "om": {
    "schemaVersion": "0.1",
    "country": {
      "code": "OM",
      "name": {
        "en": "Oman",
        "ar": "عُمان"
      }
    },
    "lastChecked": "2026-11-07",
    "status": "draft: unreviewed",
    "arabicNote": "All Arabic text is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "ROP-OM",
        "publisher": "Royal Oman Police",
        "title": "Emergency: 9999",
        "url": "https://rop.gov.om",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "national police authority",
        "caveat": "Read in A2-4 (4 Nov 2026)."
      },
      {
        "id": "FCDO-OM",
        "publisher": "UK FCDO",
        "title": "Foreign travel advice: Oman, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/oman/getting-help",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read in A2-4. 9999 for ambulance, fire, police."
      },
      {
        "id": "GOV-OM",
        "publisher": "Government of Oman portal (gov.om)",
        "title": "Emergency numbers",
        "url": "https://gov.om/en/emergency-numbers1",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government portal",
        "caveat": "Read 7 Nov 2026. 9999 as footer emergency; hospital numbers listed separately. Police not shown."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-07",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy."
      }
    ],
    "items": [
      {
        "id": "OM-EMG-01",
        "section": "emergency",
        "topic": "ambulance, fire and police",
        "content": {
          "en": "Emergency: 9999 (ambulance, fire and police).",
          "ar": "الطوارئ: 9999 (الإسعاف والإطفاء والشرطة)."
        },
        "evidence": "confirmed",
        "sourceIds": [
          "ROP-OM",
          "FCDO-OM"
        ],
        "notes": "Confirmed by ROP and FCDO in A2-4. GOV.OM portal also shows 9999 as general emergency. App already shows 9999 — consistent.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "OM-VAC-01",
        "section": "vaccination",
        "topic": "vaccination in pregnancy",
        "content": {
          "en": "No Oman Ministry of Health specific pregnancy vaccination schedule was found in this pass. Oman gave COVID vaccines to pregnant women (2021). International recommendation: Tdap in every pregnancy (27-36 weeks); flu annually.",
          "ar": "لم نجد جدول تطعيم الحوامل الرسمي من وزارة الصحة العُمانية. تُوصي المعايير الدولية بـ Tdap في كل حمل (27-36 أسبوعًا) والإنفلونزا سنويًا."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "Only COVID vaccine in pregnancy sources found (2021); no routine Tdap or RSV maternal guidance page found.",
        "reviewerMustSupply": "Omani obstetrician or MOH maternal vaccine page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "OM-ANC-01",
        "section": "antenatal",
        "topic": "antenatal schedule",
        "content": {
          "en": "No Oman Ministry of Health antenatal appointment schedule was found in this pass. WHO recommends a minimum of eight contacts.",
          "ar": "لم نجد جدول مواعيد رسمي من وزارة الصحة العُمانية. منظمة الصحة العالمية توصي بما لا يقل عن 8 زيارات."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "",
        "reviewerMustSupply": "Omani obstetrician or MOH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "OM-SUP-01",
        "section": "supplements",
        "topic": "folic acid and iron in pregnancy",
        "content": {
          "en": "No Oman Ministry of Health specific supplement recommendation was found in this pass. WHO recommends folic acid 400 mcg and iron 30-60 mg daily.",
          "ar": "لم نجد توصية عُمانية بجرعة محددة. منظمة الصحة العالمية توصي بحمض الفوليك 400 ميكروغرام والحديد 30-60 ملغ يوميًا."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "WHO reference only.",
        "reviewerMustSupply": "Omani pharmacist or MOH page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "OM-MED-01",
        "section": "medicines",
        "topic": "drug regulator",
        "content": {
          "en": "The Oman Pharmacy and Drug Directorate (Ministry of Health) regulates medicines. Its pregnancy/breastfeeding information pages were not read in this pass.",
          "ar": "مديرية الصيدلة والدواء (وزارة الصحة العُمانية) تنظم الأدوية. لم تُقرأ صفحاتها في هذه المرحلة."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist to supply MOH pages.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "qa": {
    "schemaVersion": "0.1",
    "country": {
      "code": "QA",
      "name": {
        "en": "Qatar",
        "ar": "قطر"
      }
    },
    "lastChecked": "2026-11-07",
    "status": "draft: unreviewed",
    "arabicNote": "All Arabic text is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "HMC-QA",
        "publisher": "Hamad Medical Corporation",
        "title": "In a life-threatening emergency, call 999 immediately",
        "url": "https://hamad.qa/EN/Hospitals-and-services/Obstetrics-and-Gynaecology-Services",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "national hospital authority",
        "caveat": "Read in A2-4 (4 Nov 2026)."
      },
      {
        "id": "FCDO-QA",
        "publisher": "UK FCDO",
        "title": "Foreign travel advice: Qatar, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/qatar/getting-help",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read in A2-4 (4 Nov 2026). 999 for ambulance, fire, police."
      },
      {
        "id": "PHCC-QA",
        "publisher": "Qatar Primary Health Care Corporation (via qatarliving.com)",
        "title": "PHCC urges pregnant women to take RSV and Tdap vaccines",
        "url": "https://www.qatarliving.com/en/article/phcc-urges-pregnant-women-to-take-rsv-and-tdap-vaccines-to-protect-newborns",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "national health authority (reported by qatarliving.com)",
        "caveat": "Read 7 Nov 2026. RSV: 28-36 weeks. Tdap: 27-36 weeks. Not the original PHCC press release; a third-party summary."
      },
      {
        "id": "MOPH-VAC",
        "publisher": "Qatar Ministry of Public Health / PHCC (via dohaguides.com)",
        "title": "Vaccination schedule for children in Qatar",
        "url": "https://www.dohaguides.com/vaccination-schedule-for-children-in-qatar",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "national health authority (reported by dohaguides.com)",
        "caveat": "Read 7 Nov 2026. Not the original MOPH document; a third-party summary citing MOPH and PHCC."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-07",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy."
      }
    ],
    "items": [
      {
        "id": "QA-EMG-01",
        "section": "emergency",
        "topic": "ambulance, fire and police",
        "content": {
          "en": "Emergency: 999 (ambulance, fire and police).",
          "ar": "الطوارئ: 999 (الإسعاف والإطفاء والشرطة)."
        },
        "evidence": "confirmed",
        "sourceIds": [
          "HMC-QA",
          "FCDO-QA"
        ],
        "notes": "Confirmed by HMC and FCDO. 112 note removed per founder decision (A2-4 CR-1). App already shows 999 — consistent.",
        "reviewerMustSupply": "",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-VAC-01",
        "section": "vaccination",
        "topic": "Tdap in pregnancy",
        "content": {
          "en": "Qatar recommends Tdap (tetanus, diphtheria, whooping cough) vaccine in every pregnancy. Preferred window: 27 to 36 weeks.",
          "ar": "تُوصي قطر بلقاح Tdap (الكزاز والدفتيريا والسعال الديكي) في كل حمل. النافذة المفضلة: 27 إلى 36 أسبوعًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "PHCC-QA"
        ],
        "notes": "Source is a qatarliving.com summary of a PHCC statement, not the original PHCC circular.",
        "reviewerMustSupply": "Original PHCC or MOPH circular as a second source.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-VAC-02",
        "section": "vaccination",
        "topic": "RSV vaccine in pregnancy",
        "content": {
          "en": "Qatar recommends the RSV vaccine for pregnant women between 28 and 36 weeks of pregnancy.",
          "ar": "تُوصي قطر بلقاح RSV للحوامل بين الأسبوع 28 والأسبوع 36."
        },
        "evidence": "single-source",
        "sourceIds": [
          "PHCC-QA"
        ],
        "notes": "Same qatarliving.com source as Tdap item. Original PHCC circular not read.",
        "reviewerMustSupply": "Original PHCC or MOPH document.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-VAC-03",
        "section": "vaccination",
        "topic": "routine childhood schedule",
        "content": {
          "en": "Qatar routine schedule (citing MOPH/PHCC): BCG and hepatitis B at birth; hexavalent, PCV, rotavirus at 2 and 4 months; OPV, penta, PCV at 6 months; MMR, varicella at 12 months; boosters at 18 months and 4-6 years.",
          "ar": "الجدول الروتيني في قطر: BCG وهيباتيتس B عند الولادة؛ السداسي و PCV والروتا في الشهرين 2 و4؛ OPV والخماسي و PCV في الشهر 6؛ MMR والجدري في الشهر 12؛ جرعات منشطة في الشهر 18 وبين 4-6 سنوات."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOPH-VAC"
        ],
        "notes": "Third-party summary; not the official MOPH schedule document.",
        "reviewerMustSupply": "Original MOPH vaccination schedule document.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-ANC-01",
        "section": "antenatal",
        "topic": "antenatal care",
        "content": {
          "en": "Antenatal care in Qatar is provided through PHCC (primary care) and Hamad Medical Corporation (hospital). No official appointment schedule was found in this pass. WHO recommends a minimum of eight contacts.",
          "ar": "الرعاية السابقة للولادة في قطر تقدمها مؤسسة الرعاية الصحية الأولية ومؤسسة حمد الطبية. لم نجد جدول مواعيد رسمي. توصي منظمة الصحة العالمية بما لا يقل عن 8 زيارات."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "Hamad.qa maternity pages exist but specific schedule not found in open pages read.",
        "reviewerMustSupply": "Qatar obstetrician or PHCC/HMC antenatal care guide.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-SUP-01",
        "section": "supplements",
        "topic": "folic acid in pregnancy",
        "content": {
          "en": "No Qatar-specific folic acid dose recommendation was found in this pass. WHO recommends 400 mcg daily.",
          "ar": "لم نجد توصية قطرية بجرعة محددة. منظمة الصحة العالمية توصي بـ 400 ميكروغرام يوميًا."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "WHO reference only.",
        "reviewerMustSupply": "Qatar pharmacist or MOPH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "QA-MED-01",
        "section": "medicines",
        "topic": "drug regulator",
        "content": {
          "en": "The Qatar Ministry of Public Health (moph.gov.qa) regulates medicines. Its pregnancy/breastfeeding information pages were not read in this pass.",
          "ar": "وزارة الصحة العامة القطرية (moph.gov.qa) تنظم الأدوية. لم تُقرأ صفحاتها في هذه المرحلة."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist to supply MOPH pages.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  },
  "sa": {
    "schemaVersion": "0.1",
    "country": {
      "code": "SA",
      "name": {
        "en": "Saudi Arabia",
        "ar": "المملكة العربية السعودية"
      }
    },
    "lastChecked": "2026-11-07",
    "status": "draft: unreviewed",
    "arabicNote": "All Arabic text is an Agent 2 draft. No native clinical reviewer has seen it.",
    "sources": [
      {
        "id": "FCDO-SA",
        "publisher": "UK FCDO",
        "title": "Foreign travel advice: Saudi Arabia, Getting help",
        "url": "https://www.gov.uk/foreign-travel-advice/saudi-arabia/getting-help",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read 7 Nov 2026. Says 911 for ambulance, fire, police; \"call 112 if you don't have a Saudi SIM.\""
      },
      {
        "id": "AUS-SA",
        "publisher": "Australian Government Smartraveller",
        "title": "Saudi Arabia travel advice – Emergency services",
        "url": "https://www.smartraveller.gov.au/destinations/middle-east/saudi-arabia",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "government travel advice",
        "caveat": "Read 7 Nov 2026. Lists 997 ambulance, 999 police, 998 fire, 911 as general emergency."
      },
      {
        "id": "MOH-SA",
        "publisher": "Saudi Ministry of Health (news page)",
        "title": "MOH Continues Its Awareness Efforts for Healthy and Safe Pregnancy",
        "url": "https://www.moh.gov.sa/en/ministry/mediacenter/news/pages/news-2019-09-03-003.aspx",
        "date": "2019-09-03",
        "accessed": "2026-11-07",
        "kind": "government health authority",
        "caveat": "2019 page; folic acid mentioned without dose; vitamin D mentioned without dose; iron-rich foods but no supplement."
      },
      {
        "id": "SFDA",
        "publisher": "Saudi Food and Drug Authority",
        "title": "sfda.gov.sa",
        "url": "https://www.sfda.gov.sa",
        "date": "n/d",
        "accessed": "2026-11-07",
        "kind": "drug regulator",
        "caveat": "Not read in this pass. The SFDA is the medicines regulator; it was not reachable during this check."
      },
      {
        "id": "WHO-ANC",
        "publisher": "WHO",
        "title": "WHO recommendations on antenatal care for a positive pregnancy experience: executive summary (2016)",
        "url": "https://new.aidsdatahub.org/sites/default/files/resource/who-recommendations-antenatal-care-positive-pregnancy-experience-executive-summary.pdf",
        "date": "2016",
        "accessed": "2026-11-07",
        "kind": "international guideline",
        "caveat": "Read through a third-party copy."
      }
    ],
    "items": [
      {
        "id": "SA-EMG-01",
        "section": "emergency",
        "topic": "ambulance and all emergency services",
        "content": {
          "en": "Ambulance, fire and police: 911 (unified). No Saudi SIM: call 112.",
          "ar": "الإسعاف والإطفاء والشرطة: 911 (موحد). بدون شريحة سعودية: اتصلي بـ 112."
        },
        "evidence": "confirmed",
        "sourceIds": [
          "FCDO-SA",
          "AUS-SA"
        ],
        "notes": "FCDO says 911 for ambulance/fire/police plus 112 for no-SIM. Smartraveller lists 997 ambulance, 999 police, 998 fire AND 911 general. App currently shows 997 with 911 as note (open founder decision). Both numbers well-evidenced. Recommend showing 911 as the primary unified number and 997 as the ambulance-specific note, pending founder decision.",
        "reviewerMustSupply": "Founder to decide: 911 primary or 997 primary. A Saudi reviewer to confirm.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-VAC-01",
        "section": "vaccination",
        "topic": "Tdap in pregnancy",
        "content": {
          "en": "Tdap vaccine is recommended in pregnancy in Saudi Arabia. The preferred window is 27 to 36 weeks (based on international guidance widely cited in the region; Saudi MOH specific timing not read).",
          "ar": "لقاح الكزاز والدفتيريا والسعال الديكي (Tdap) موصى به في الحمل في المملكة العربية السعودية. النافذة المفضلة 27 إلى 36 أسبوعًا."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOH-SA"
        ],
        "notes": "Saudi MOH 2019 page does not give Tdap weeks. 27-36 weeks is from international consensus (CDC, ACOG) and is used in Bahrain and Qatar. A Saudi MOH vaccine page or SRCA guidance is needed.",
        "reviewerMustSupply": "Saudi immunologist or MOH vaccine schedule page to confirm weeks and whether Tdap is routine or recommended.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-SUP-01",
        "section": "supplements",
        "topic": "folic acid in pregnancy",
        "content": {
          "en": "The Saudi Ministry of Health advises folic acid from when planning a pregnancy until week 12. No specific dose was found on the page read.",
          "ar": "توصي وزارة الصحة السعودية بحمض الفوليك من مرحلة التخطيط للحمل حتى الأسبوع 12. لم نجد جرعة محددة في الصفحة المقروءة."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOH-SA"
        ],
        "notes": "2019 page; dose not stated. WHO recommends 400 mcg daily (WHO-ANC).",
        "reviewerMustSupply": "Saudi MOH or SFDA current leaflet for the dose.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-SUP-02",
        "section": "supplements",
        "topic": "iron in pregnancy",
        "content": {
          "en": "The Saudi Ministry of Health recommends iron-rich foods to prevent anemia. No iron supplement dose was found on the MOH page read.",
          "ar": "توصي وزارة الصحة السعودية بتناول أطعمة غنية بالحديد. لم يُذكر مكمل الحديد بجرعة محددة في الصفحة المقروءة."
        },
        "evidence": "single-source",
        "sourceIds": [
          "MOH-SA"
        ],
        "notes": "WHO recommends 30-60 mg daily (WHO-ANC). MOH page does not give a supplement dose.",
        "reviewerMustSupply": "Saudi MOH or pharmacist to confirm supplement recommendation.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-ANC-01",
        "section": "antenatal",
        "topic": "antenatal schedule",
        "content": {
          "en": "No Saudi Ministry of Health antenatal appointment schedule was found in this pass. WHO recommends a minimum of eight contacts during pregnancy.",
          "ar": "لم نجد جدول مواعيد الرعاية السابقة للولادة من وزارة الصحة السعودية. منظمة الصحة العالمية توصي بما لا يقل عن 8 زيارات."
        },
        "evidence": "reference-only",
        "sourceIds": [
          "WHO-ANC"
        ],
        "notes": "No MOH schedule found; research articles confirm antenatal care is widespread but do not give an official appointment schedule.",
        "reviewerMustSupply": "Saudi obstetrician or MOH maternal health page.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-MED-01",
        "section": "medicines",
        "topic": "drug regulator",
        "content": {
          "en": "The Saudi Food and Drug Authority (SFDA, sfda.gov.sa) is the medicines regulator. Its pages were not read in this pass.",
          "ar": "الهيئة السعودية للغذاء والدواء (SFDA) هي الجهة التنظيمية للأدوية. لم تُقرأ صفحاتها في هذه المرحلة."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "Needed for A2-7.",
        "reviewerMustSupply": "Pharmacist to supply the SFDA pregnancy/breastfeeding information pages to use.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      },
      {
        "id": "SA-HLP-01",
        "section": "helplines",
        "topic": "mental health / crisis",
        "content": {
          "en": "No official mental health or women's helpline for Saudi Arabia was found with two independent sources in this pass.",
          "ar": "لم نجد خطًا ساخنًا رسميًا للصحة النفسية أو دعم المرأة بمصدرين مستقلين."
        },
        "evidence": "not-found",
        "sourceIds": [],
        "notes": "therapyroute.com lists a crisis line but is not an official source.",
        "reviewerMustSupply": "A Saudi reviewer to name the official service.",
        "review": {
          "status": "unreviewed",
          "reviewer": null,
          "date": null
        }
      }
    ]
  }
};

/* Returns only items that pass the display gate above, optionally narrowed to one section
   ('emergency' | 'antenatal' | 'vaccination' | 'supplements' | 'helplines' | 'medicines').
   Returns [] for an unknown country or when nothing currently qualifies — which, today,
   is every country: there are no named clinical reviewers yet (Clinical Governance
   Framework §12, CGF-01/02/03), so this intentionally returns nothing anywhere. */
function confirmedCountryItems(countryCode, section) {
  const c = COUNTRY_DATA[(countryCode || '').toLowerCase()];
  if (!c || !Array.isArray(c.items)) return [];
  return c.items.filter(function (it) {
    return it.evidence === 'confirmed' && it.review && it.review.status === 'reviewed' && (!section || it.section === section);
  });
}

/* True only if at least one item for this country currently passes the gate — lets future
   UI decide whether to offer a "your country" view at all before building it out in full. */
function countryHasConfirmedContent(countryCode) {
  return confirmedCountryItems(countryCode).length > 0;
}
