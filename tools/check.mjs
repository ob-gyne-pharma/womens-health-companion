// Pre-push check for Women & Families.   Run from the repo root:   node tools/check.mjs
// Exits 0 only if everything is consistent. Needs Node 18+, no installs.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const fail = (m) => problems.push(m);
const read = (p) => readFileSync(join(root, p), 'utf8');

// 1. Every JS file must pass Node's syntax check on its own.
const jsFiles = readdirSync(join(root, 'js')).filter((f) => f.endsWith('.js')).sort();
for (const f of [...jsFiles.map((f) => 'js/' + f), 'sw.js']) {
  const r = spawnSync(process.execPath, ['--check', join(root, f)], { encoding: 'utf8' });
  if (r.status !== 0) fail(`SYNTAX  ${f}\n${(r.stderr || '').split('\n').slice(0, 6).join('\n')}`);
}

// 2. Release string must be identical in index.html meta, sw.js and the JS constant.
const html = read('index.html');
const sw = read('sw.js');
const metaRelease = (html.match(/name="app-release" content="([^"]+)"/) || [])[1];
const swRelease = (sw.match(/const RELEASE='([^']+)'/) || [])[1];
const jsRelease = (read('js/07-review-offline.js').match(/const REVIEW_RELEASE = '([^']+)'/) || [])[1];
if (!metaRelease) fail('RELEASE index.html has no app-release meta tag');
if (swRelease !== metaRelease) fail(`RELEASE sw.js (${swRelease}) != index.html meta (${metaRelease})`);
if (jsRelease !== metaRelease) fail(`RELEASE REVIEW_RELEASE in js/07-review-offline.js (${jsRelease}) != meta (${metaRelease}). Offline status breaks if these differ.`);

// 3. index.html must load every js/ file, in filename order, with ?v=<release>.
const tags = [...html.matchAll(/<script src="(js\/[^"?]+)\?v=([^"]+)"><\/script>/g)];
const loaded = tags.map((m) => m[1].replace('js/', ''));
if (JSON.stringify(loaded) !== JSON.stringify(jsFiles)) {
  fail(`ORDER   index.html script tags do not match js/ folder in filename order.\n  index.html: ${loaded.join(', ')}\n  js/ folder: ${jsFiles.join(', ')}`);
}
tags.forEach((m) => { if (m[2] !== metaRelease) fail(`VERSION index.html ${m[1]} has ?v=${m[2]}, expected ${metaRelease}`); });
if (/<script>\s*\(function\(\)\{/.test(html)) fail('INLINE  index.html still contains a large inline app script');

// 4. sw.js must precache every js/ file with the same ?v= (needed for offline use).
for (const f of jsFiles) {
  if (!sw.includes(`'./js/${f}?v=${metaRelease}'`)) fail(`SW      sw.js CORE is missing ./js/${f}?v=${metaRelease}`);
}

// 5. Files the service worker precaches must exist (icons are the usual miss).
for (const m of sw.matchAll(/'\.\/([^'?]+\.(?:png|jpg|webp|webmanifest|js))(?:\?v=[^']*)?'/g)) {
  if (!existsSync(join(root, m[1]))) fail(`MISSING sw.js precaches ./${m[1]} but the file is not in the repo. Service worker install will fail.`);
}

// 6. Generated static pages (guide-*.html etc.) must be current and consistent.
//    If this fails after a release bump or content change, run: node tools/build-pages.mjs
const SITE = 'https://public.ob-gyn-pharma.com';
const pageFiles = readdirSync(root).filter((f) => f.endsWith('.html') && f !== 'index.html').sort();
const scriptBlock = (h) => (h.match(/<script src="js\/[^"]+"><\/script>/g) || []).join('\n');
const sitemap = existsSync(join(root, 'sitemap.xml')) ? read('sitemap.xml') : '';
if (!sitemap) fail('SITEMAP sitemap.xml is missing. Run: node tools/build-pages.mjs');
if (!existsSync(join(root, 'robots.txt'))) fail('ROBOTS  robots.txt is missing. Run: node tools/build-pages.mjs');
const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const seenTitle = new Map(), seenDesc = new Map();
for (const f of pageFiles) {
  const name = f.replace(/\.html$/, '');
  const h = read(f);
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== `${SITE}/${name}`) fail(`PAGE    ${f}: canonical is ${canon}, expected ${SITE}/${name}`);
  if (!locs.has(`${SITE}/${name}`)) fail(`SITEMAP ${f} is not listed in sitemap.xml`);
  if (scriptBlock(h) !== scriptBlock(html)) fail(`STALE   ${f}: script list or ?v= differs from index.html. Run: node tools/build-pages.mjs`);
  if ((h.match(/name="app-release" content="([^"]+)"/) || [])[1] !== metaRelease) fail(`STALE   ${f}: release differs from index.html. Run: node tools/build-pages.mjs`);
  if (!/window\.__PRERENDER=\{"route":"[^"]+","lang":"(en|ar)"\}/.test(h)) fail(`PAGE    ${f}: missing window.__PRERENDER`);
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1], desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (seenTitle.has(title)) fail(`DUP     ${f} and ${seenTitle.get(title)} share the title "${title}"`); seenTitle.set(title, f);
  if (seenDesc.has(desc)) fail(`DUP     ${f} and ${seenDesc.get(desc)} share a description`); seenDesc.set(desc, f);
  for (const m of h.matchAll(/<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g)) {
    const t = m[1].replace(SITE + '/', '').replace(/^$/, 'index');
    if (!existsSync(join(root, t + '.html'))) fail(`HREFLANG ${f} points to ${m[1]} but ${t}.html does not exist`);
  }
  for (const m of h.matchAll(/<a [^>]*href="(\/[a-z][^"#]*)"/g)) {
    if (!existsSync(join(root, m[1].slice(1) + '.html'))) fail(`LINK    ${f} links to ${m[1]} but ${m[1].slice(1)}.html does not exist`);
  }
}
for (const l of locs) {
  const t = l === SITE + '/' ? 'index' : l.replace(SITE + '/', '');
  if (!existsSync(join(root, t + '.html'))) fail(`SITEMAP lists ${l} but ${t}.html does not exist`);
}

// 7. PRIVACY GUARD. The privacy page is a specification; this section enforces it.
//    If a change here is intentional, update the privacy page in the same change, then update the lists below.
//    Allowed: the three localStorage keys below, user-initiated sharing (navigator.share), the service worker's own fetches.
// Passport data lives in IndexedDB (database 'wf-passport-v1'), AES-GCM encrypted with a
// key derived from the woman's passphrase (PBKDF2, 210000 iterations). Nothing here is
// enforceable by static analysis — js/26-passport.js is the one file allowed to touch
// indexedDB, and any change to it needs a human security review, not just this check.
const ALLOWED_STORAGE_KEYS = new Set([
  'wf-companion-prototype-v1', // saved plan, only when device saving is on
  'wf-reminders-v1',           // dismissed reminders, only when device saving is on
  'wf-install-v1',             // one note: install prompt closed, snoozed or installed
]);
const ALLOWED_RESOURCE_HOSTS = new Set(['public.ob-gyn-pharma.com']);   // scripts, styles, images, fonts must come from our own origin
const FORBIDDEN_API = [
  [/\bsendBeacon\s*\(/, 'navigator.sendBeacon'],
  [/\bnew\s+XMLHttpRequest\b|\bXMLHttpRequest\s*\(/, 'XMLHttpRequest'],
  [/\bnew\s+WebSocket\s*\(/, 'WebSocket'],
  [/\bnew\s+EventSource\s*\(/, 'EventSource'],
  [/\bsessionStorage\b/, 'sessionStorage'],
  [/\bdocument\.cookie\b/, 'document.cookie'],
  [/\bdocument\.write\s*\(/, 'document.write'],
  [/\beval\s*\(|\bnew\s+Function\s*\(/, 'eval / new Function'],
  [/\bimportScripts\s*\(/, 'importScripts'],
];
const stripBlockComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
const stripLineComments = (t) => t.split('\n').map((l) => (/^\s*\/\//.test(l) ? '' : l)).join('\n');
const constMaps = {};                // per-file string constants whose name ends in KEY
for (const f of jsFiles) {
  const m = {};
  for (const x of read('js/' + f).matchAll(/\b([A-Z_]*KEY)\s*=\s*'([^']*)'/g)) m[x[1]] = x[2];
  constMaps[f] = m;
}
for (const f of jsFiles) {
  const code = stripLineComments(stripBlockComments(read('js/' + f)));
  for (const [re, name] of FORBIDDEN_API) if (re.test(code)) fail(`PRIVACY js/${f} uses ${name}. See the privacy page and the guard in tools/check.mjs.`);
  // fetch(): the only approved call is the dormant feedback sender, and only while its endpoint is empty
  if (/\bfetch\s*\(/.test(code)) {
    const dormant = f === '13-feedback-backup.js' && /const DIRECT_FEEDBACK_ENDPOINT\s*=\s*''/.test(code) && (code.match(/\bfetch\s*\(/g) || []).length === 1 && /fetch\(DIRECT_FEEDBACK_ENDPOINT/.test(code);
    if (!dormant) fail(`PRIVACY js/${f} calls fetch(). Only the feedback sender may, and only while DIRECT_FEEDBACK_ENDPOINT is an empty string. Enabling it sends users' words to a third party: update the privacy page, get sign-off, then change this guard.`);
  }
  // every localStorage call must use an approved key
  for (const x of code.matchAll(/\blocalStorage\.(?:getItem|setItem|removeItem)\(\s*([A-Za-z_]\w*|'[^']*')/g)) {
    const arg = x[1];
    const key = arg.startsWith("'") ? arg.slice(1, -1) : (constMaps[f][arg] ?? constMaps['01-core.js'][arg]);
    if (key === undefined) fail(`PRIVACY js/${f}: localStorage key ${arg} cannot be resolved. Use a constant ending in KEY with a string value.`);
    else if (!ALLOWED_STORAGE_KEYS.has(key)) fail(`PRIVACY js/${f}: localStorage key "${key}" is not approved. Update the privacy page, then add it to ALLOWED_STORAGE_KEYS in tools/check.mjs.`);
  }
  if (/\blocalStorage\.clear\(/.test(code)) fail(`PRIVACY js/${f} calls localStorage.clear(), which would also erase other sites' ... on shared origins; remove specific keys instead.`);
}
for (const f of ['index.html', ...pageFiles]) {
  const h = read(f);
  for (const m of h.matchAll(/<(script|img|iframe|source|video|audio|embed|link)\b[^>]*?\b(?:src|href)=["'](https?:)?\/\/([^/"']+)/gi)) {
    const tag = m[0];
    if (/^<link/i.test(tag) && !/rel=["']?(stylesheet|preload|prefetch|modulepreload|icon|apple-touch-icon|manifest)/i.test(tag)) continue; // canonical / alternate links are not resources
    if (!ALLOWED_RESOURCE_HOSTS.has(m[3])) fail(`PRIVACY ${f} loads a ${m[1]} from ${m[3]}. Third-party resources can track readers; host it on our own origin or update the guard.`);
  }
}

// 8. COUNTRY DATA (CR-8 / Clinical Governance Framework). js/28-countries.js is generated
//    from clinical/countries/*.json by tools/build-countries.mjs. This section re-validates
//    the same integrity rules independently (duplicate ids, valid evidence values, source
//    references, confirmed/not-found source-count rules, non-empty EN/AR, a reviewed item
//    always has a reviewer name and date) and confirms the generated file is not stale.
const COUNTRY_SECTIONS = ['emergency', 'antenatal', 'postnatal', 'vaccination', 'supplements', 'helplines', 'medicines'];
const countryDir = join(root, 'clinical', 'countries');
if (existsSync(countryDir)) {
  const countryFiles = readdirSync(countryDir).filter((f) => f.endsWith('.json')).sort();
  const rebuilt = {};
  for (const f of countryFiles) {
    const code = f.replace('.json', '');
    let d;
    try { d = JSON.parse(read(join('clinical', 'countries', f))); }
    catch (e) { fail(`COUNTRY  clinical/countries/${f} is not valid JSON (${e.message})`); continue; }
    const srcIds = new Set((d.sources || []).map((s) => s.id));
    const seen = new Set();
    for (const it of d.items || []) {
      const where = `clinical/countries/${f}: ${it.id}`;
      if (seen.has(it.id)) fail(`COUNTRY  ${where} is a duplicate item id`);
      seen.add(it.id);
      if (!['confirmed', 'single-source', 'conflict', 'reference-only', 'not-found'].includes(it.evidence)) fail(`COUNTRY  ${where} has an invalid evidence value "${it.evidence}"`);
      if (it.section && !COUNTRY_SECTIONS.includes(it.section)) fail(`COUNTRY  ${where} has an unrecognised section "${it.section}"`);
      for (const sid of it.sourceIds || []) if (!srcIds.has(sid)) fail(`COUNTRY  ${where} cites unknown source "${sid}"`);
      if (it.evidence === 'confirmed' && (it.sourceIds || []).length < 2) fail(`COUNTRY  ${where} is evidence=confirmed with fewer than 2 sources`);
      if (it.evidence === 'not-found' && (it.sourceIds || []).length !== 0) fail(`COUNTRY  ${where} is evidence=not-found but lists sources`);
      if (!it.content || !it.content.en || !it.content.en.trim()) fail(`COUNTRY  ${where} has empty English content`);
      if (!it.content || !it.content.ar || !it.content.ar.trim()) fail(`COUNTRY  ${where} has empty Arabic content`);
      const rv = it.review || {};
      if (rv.status === 'reviewed' && (!rv.reviewer || !rv.date)) fail(`COUNTRY  ${where} is marked reviewed but has no reviewer name or date (Clinical Governance Framework §11)`);
      if (rv.status !== 'reviewed' && rv.status !== 'unreviewed') fail(`COUNTRY  ${where} has an unrecognised review.status "${rv.status}"`);
    }
    rebuilt[code] = d;
  }
  if (!problems.some((p) => p.startsWith('COUNTRY'))) {
    const expected = JSON.stringify(rebuilt, null, 2);
    const generated = existsSync(join(root, 'js', '28-countries.js')) ? read('js/28-countries.js') : '';
    if (!generated) fail('COUNTRY  js/28-countries.js is missing. Run: node tools/build-countries.mjs');
    else if (!generated.includes(expected)) fail('COUNTRY  js/28-countries.js does not match clinical/countries/*.json. Run: node tools/build-countries.mjs');
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error('  - ' + p + '\n'));
  process.exit(1);
}
console.log(`✓ OK: ${jsFiles.length} js files pass syntax check; release ${metaRelease} consistent in index.html, sw.js and app code; script order and offline file list match; ${pageFiles.length} static pages current, unique and in the sitemap; privacy guard clean (no network calls, ${ALLOWED_STORAGE_KEYS.size} approved storage keys, no third-party resources); country data current and valid.`);
