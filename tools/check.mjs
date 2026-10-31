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
for (const m of sw.matchAll(/'\.\/([^'?]+\.(?:png|jpg|webmanifest|js))(?:\?v=[^']*)?'/g)) {
  if (!existsSync(join(root, m[1]))) fail(`MISSING sw.js precaches ./${m[1]} but the file is not in the repo. Service worker install will fail.`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error('  - ' + p + '\n'));
  process.exit(1);
}
console.log(`✓ OK: ${jsFiles.length} js files pass syntax check; release ${metaRelease} consistent in index.html, sw.js and app code; script order and offline file list match.`);
