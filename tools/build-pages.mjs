// Generates the static, crawlable pages (guide-*.html, chapter-*.html, guides.html,
// urgent-help.html and their ar-* twins), sitemap.xml and robots.txt.
//
//   node tools/build-pages.mjs
//
// How it works: it opens the real app in a headless browser, once per page and language,
// takes the content the app renders, and puts it into the shell of index.html with its own
// title, description, canonical address, language alternates and structured data.
// So the static page and the live app always show the same text.
//
// Dev tool only (needs `npm i playwright` once). Re-run it after ANY change to guide text,
// translations, release number or script list, then run `node tools/check.mjs`.
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://public.ob-gyn-pharma.com';
const BRAND = 'Women & Families';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(process.env.PLAYWRIGHT_PATH || 'playwright'); }

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, n = 155) => {
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 80)).replace(/[\s,;:.\u060C\u061B-]+$/, '') + '\u2026';
};
function replaceOnce(html, re, to, label) {
  const m = html.match(new RegExp(re.source, re.flags.replace('g', '')));
  if (!m) throw new Error('build-pages: pattern not found in index.html: ' + label);
  if ((html.match(new RegExp(re.source, 'g')) || []).length !== 1) throw new Error('build-pages: pattern matched more than once: ' + label);
  return html.replace(re, () => to);
}

// ---------- static server for the repo ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/index.html';
  try { const b = readFileSync(join(root, p)); res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end('not found'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// ---------- read the shell ----------
const shell = readFileSync(join(root, 'index.html'), 'utf8');
const release = (shell.match(/name="app-release" content="([^"]+)"/) || [])[1];
if (!release) throw new Error('build-pages: no app-release meta in index.html');

const browser = await playwright.chromium.launch();

// ---------- discover pages from the app's own data ----------
const probe = await (await browser.newContext({ serviceWorkers: 'block' })).newPage();
await probe.goto(base + '/', { waitUntil: 'load' });
await probe.waitForFunction(() => typeof lifeTopics !== 'undefined' && typeof chapters !== 'undefined');
const ids = await probe.evaluate(() => ({ topics: lifeTopics.map((t) => t.id), chapters: chapters.map((c) => c[0]) }));
await probe.context().close();

const specs = [];
for (const lang of ['en', 'ar']) {
  const pre = lang === 'ar' ? 'ar-' : '';
  if (lang === 'ar') specs.push({ lang, route: 'home', file: 'ar-home', type: 'WebPage' });
  specs.push({ lang, route: 'learn', file: pre + 'guides', type: 'WebPage' });
  specs.push({ lang, route: 'urgent', file: pre + 'urgent-help', type: 'MedicalWebPage' });
  ids.chapters.forEach((c) => specs.push({ lang, route: 'chapter-' + c, file: pre + 'chapter-' + c, type: 'WebPage' }));
  ids.topics.forEach((t) => specs.push({ lang, route: 'topic-' + t, file: pre + 'guide-' + t, type: 'MedicalWebPage' }));
}
const other = (file) => (file.startsWith('ar-') ? file.slice(3) : 'ar-' + file);
const enOf = (file) => (file === 'ar-home' ? 'index' : file.startsWith('ar-') ? file.slice(3) : file);
const arOf = (file) => (file === 'index' ? 'ar-home' : file.startsWith('ar-') ? file : 'ar-' + file);
const urlOf = (file) => (file === 'index' ? SITE + '/' : SITE + '/' + file);

// ---------- render each page with the real app ----------
const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 430, height: 900 } });
const errors = [];
for (const s of specs) {
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${s.file}: ${e.message}`));
  await page.addInitScript((pre) => { window.__PRERENDER = pre; }, { route: s.route, lang: s.lang });
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForSelector('#app h1');
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForTimeout(150);
  Object.assign(s, await page.evaluate(() => {
    const app = document.getElementById('app');
    const h1 = (app.querySelector('h1') || {}).textContent || '';
    const paras = [...app.querySelectorAll('p')].map((p) => p.textContent.replace(/\s+/g, ' ').trim()).filter((t) => t.length >= 60);
    const guides = [...new Set([...app.querySelectorAll('a[data-spa-route^="topic-"]')].map((a) => a.textContent.replace(/\s+/g, ' ').trim()))].filter(Boolean);
    return { html: app.innerHTML, h1: h1.trim(), para: paras[0] || '', guides, dir: document.documentElement.dir, hl: document.documentElement.lang };
  }));
  await page.close();
  if (s.hl !== s.lang) errors.push(`${s.file}: app language is ${s.hl}, expected ${s.lang}`);
}
await browser.close();
server.close();
if (errors.length) { console.error('build-pages: errors while rendering:\n  ' + errors.join('\n  ')); process.exit(1); }

// ---------- assemble pages ----------
const mainStart = shell.indexOf('<main id="app">');
const mainEnd = shell.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('build-pages: <main id="app"> not found');
const firstScript = shell.indexOf('<script src="js/01-core.js');
if (firstScript < 0) throw new Error('build-pages: first app <script> not found');

const baseDesc = (s) => (s.route.startsWith('chapter-') && s.guides.length ? `${s.h1}: ${s.guides.join(' \u00B7 ')}` : s.para || s.h1);
const shared = new Map();
for (const s of specs) { const k = `${s.lang}|${clip(baseDesc(s))}`; shared.set(k, (shared.get(k) || 0) + 1); }
const titles = new Map(), descs = new Map();
for (const s of specs) {
  const url = urlOf(s.file);
  // Same rule as syncTitle() in js/19-seo.js, so the title never changes when the app starts.
  const qual = s.route.startsWith('chapter-') && s.lang === 'en' ? ' (all guides)' : '';
  const title = `${s.h1}${qual} \u2014 ${BRAND}`;
  // Chapter pages are hubs with a generic intro, so they are described by the guides they list.
  // Where several pages open with the same sentence, each gets its own heading in front so no two descriptions match.
  const base = baseDesc(s);
  const desc = shared.get(`${s.lang}|${clip(base)}`) > 1 ? clip(`${s.h1}: ${base}`) : clip(base);
  if (titles.has(title)) throw new Error(`build-pages: ${s.file} and ${titles.get(title)} have the same title: ${title}`);
  if (descs.has(desc)) throw new Error(`build-pages: ${s.file} and ${descs.get(desc)} have the same description: ${desc}`);
  titles.set(title, s.file); descs.set(desc, s.file);

  let h = shell;
  h = replaceOnce(h, /<html lang="en" dir="ltr">/, `<html lang="${s.lang}" dir="${s.dir}">`, 'html tag');
  h = replaceOnce(h, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, 'title');
  h = replaceOnce(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`, 'description');
  h = replaceOnce(h, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`, 'canonical');
  h = replaceOnce(h, /(<link rel="alternate" hreflang="[^"]*" href="[^"]*">\s*){3}/,
    `<link rel="alternate" hreflang="en" href="${urlOf(enOf(s.file))}">\n<link rel="alternate" hreflang="ar" href="${urlOf(arOf(s.file))}">\n<link rel="alternate" hreflang="x-default" href="${urlOf(enOf(s.file))}">\n`, 'hreflang');
  h = replaceOnce(h, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`, 'og:url');
  h = replaceOnce(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`, 'og:title');
  h = replaceOnce(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`, 'og:description');
  h = replaceOnce(h, /<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${s.lang === 'ar' ? 'ar_AR' : 'en_GB'}">`, 'og:locale');
  h = replaceOnce(h, /<meta property="og:locale:alternate" content="[^"]*">/, `<meta property="og:locale:alternate" content="${s.lang === 'ar' ? 'en_GB' : 'ar_AR'}">`, 'og:locale:alternate');
  h = replaceOnce(h, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(title)}">`, 'twitter:title');
  h = replaceOnce(h, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`, 'twitter:description');
  const ld = {
    '@context': 'https://schema.org', '@type': s.type, name: s.h1, description: desc, url, inLanguage: s.lang,
    isPartOf: { '@type': 'WebSite', name: BRAND, url: SITE + '/' },
    publisher: { '@type': 'Organization', name: 'OB-GYN Pharma', url: 'https://www.ob-gyn-pharma.com/' },
  };
  h = replaceOnce(h, /<\/head>/, `<meta name="robots" content="index,follow,max-image-preview:large">\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`, 'head end');

  // body: rendered content in, heavy no-JS block out, route/language handed to the app
  const a = h.indexOf('<main id="app">');
  const b = h.indexOf('</main>', a);
  h = h.slice(0, a) + '<main id="app">' + s.html + h.slice(b);
  h = h.replace(/<noscript>[\s\S]*?<\/noscript>/g, (m) => (m.length > 100000 ? '' : m));
  const c = h.indexOf('<script src="js/01-core.js');
  h = h.slice(0, c) + `<script>window.__PRERENDER=${JSON.stringify({ route: s.route, lang: s.lang })};</script>\n` + h.slice(c);
  writeFileSync(join(root, s.file + '.html'), h);
}

// ---------- sitemap + robots ----------
const today = new Date().toISOString().slice(0, 10);
const entries = [{ file: 'index' }, ...specs.map((s) => ({ file: s.file }))];
const alt = (f) => `    <xhtml:link rel="alternate" hreflang="en" href="${urlOf(enOf(f))}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${urlOf(arOf(f))}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(enOf(f))}"/>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  entries.map((e) => `  <url>\n    <loc>${urlOf(e.file)}</loc>\n    <lastmod>${today}</lastmod>\n${alt(e.file)}\n  </url>`).join('\n') + '\n</urlset>\n';
writeFileSync(join(root, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`build-pages: wrote ${specs.length} pages (${specs.filter((s) => s.lang === 'en').length} English, ${specs.filter((s) => s.lang === 'ar').length} Arabic), sitemap.xml with ${entries.length} URLs, robots.txt. Release ${release}.`);
