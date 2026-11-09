// Converts clinical/countries/*.json into js/28-countries.js — a single, build-time-generated
// file with no runtime fetch (the privacy guard in check.mjs would reject one; this is how
// CR-8 asks for "build-time inclusion").
//
//   node tools/build-countries.mjs
//
// Re-run this whenever a file in clinical/countries/ changes, then run tools/check.mjs, which
// verifies the generated file is not stale and that every country file still passes the
// integrity rules from clinical/change-requests-for-agent-1.md (CR-8) and
// clinical/clinical-governance-framework-v0.1.md §5 (evidence levels, review block shape).
//
// IMPORTANT — the display gate (Clinical Governance Framework §6): a country item may be
// shown to a user only if evidence === 'confirmed' AND review.status === 'reviewed'. As of
// this build, zero items anywhere meet both conditions (every item in every file is
// "unreviewed" by design — see each file's top-level "status" field), so
// confirmedCountryItems() currently returns an empty array for every country. That is
// correct, not a bug: nothing from these files should reach a user yet.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'clinical', 'countries');
const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();

const problems = [];
const countries = {};
for (const f of files) {
  const code = f.replace('.json', '');
  let data;
  try { data = JSON.parse(readFileSync(join(dir, f), 'utf8')); }
  catch (e) { problems.push(`${f}: not valid JSON (${e.message})`); continue; }
  const srcIds = new Set((data.sources || []).map((s) => s.id));
  const seenIds = new Set();
  for (const it of data.items || []) {
    if (seenIds.has(it.id)) problems.push(`${f}: duplicate item id ${it.id}`);
    seenIds.add(it.id);
    if (!['confirmed', 'single-source', 'conflict', 'reference-only', 'not-found'].includes(it.evidence)) {
      problems.push(`${f}: ${it.id} has an invalid evidence value "${it.evidence}"`);
    }
    for (const sid of it.sourceIds || []) {
      if (!srcIds.has(sid)) problems.push(`${f}: ${it.id} cites unknown source "${sid}"`);
    }
    if (it.evidence === 'confirmed' && (it.sourceIds || []).length < 2) {
      problems.push(`${f}: ${it.id} is evidence=confirmed but has fewer than 2 sources`);
    }
    if (it.evidence === 'not-found' && (it.sourceIds || []).length !== 0) {
      problems.push(`${f}: ${it.id} is evidence=not-found but lists sources`);
    }
    if (!it.content || !it.content.en || !it.content.en.trim()) problems.push(`${f}: ${it.id} has empty English content`);
    if (!it.content || !it.content.ar || !it.content.ar.trim()) problems.push(`${f}: ${it.id} has empty Arabic content`);
    const rv = it.review || {};
    if (rv.status === 'reviewed' && (!rv.reviewer || !rv.date)) {
      problems.push(`${f}: ${it.id} is marked reviewed but is missing a reviewer name or date (Clinical Governance Framework §11)`);
    }
    if (rv.status !== 'reviewed' && rv.status !== 'unreviewed') {
      problems.push(`${f}: ${it.id} has an unrecognised review.status "${rv.status}"`);
    }
  }
  countries[code] = data;
}
if (problems.length) {
  console.error(`build-countries: ${problems.length} problem(s), nothing written:\n  ` + problems.join('\n  '));
  process.exit(1);
}

const header = `/* Women & Families | js/28-countries.js — GENERATED FILE, do not hand-edit.
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

const COUNTRY_DATA = ${JSON.stringify(countries, null, 2)};

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
`;

writeFileSync(join(root, 'js', '28-countries.js'), header);
const total = Object.values(countries).reduce((n, c) => n + (c.items || []).length, 0);
const passing = Object.keys(countries).reduce((n, cc) => n + confirmedCountryItemsLocal(countries[cc]).length, 0);
function confirmedCountryItemsLocal(c) {
  return (c.items || []).filter((it) => it.evidence === 'confirmed' && it.review && it.review.status === 'reviewed');
}
console.log(`build-countries: wrote js/28-countries.js from ${files.length} country files, ${total} items total, ${passing} currently pass the display gate (expected: 0, until a reviewer is named).`);
