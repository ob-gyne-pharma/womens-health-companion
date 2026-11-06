/* Women & Families 2026.11.05-r24 | js/24-install-banner.js
   Phase 5: a gentle "add to home screen" prompt, plus a manual "Install app" row on the More page.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* What this file does and does not do (the privacy page describes it):
   - Phones only (screen up to 720 px wide, where the bottom bar shows). Never on desktop, never once installed.
   - It waits 20 seconds on the page, shows at most one small card, and never covers urgent help or the symptom checker.
   - Android / Chrome: needs the browser's own install prompt (captured in 07-review-offline.js). iPhone / iPad: shows a how-to.
   - The only thing remembered is one small note in localStorage, "wf-install-v1": closed for good, snoozed until a date,
     or installed. No visit counts, no first-visit time, nothing about health. Nothing is sent anywhere. */
(function() {
  const KEY = 'wf-install-v1';
  const DELAY_MS = 20000;
  const SNOOZE_MS = 3 * 86400000;
  const QUIET_PAGES = ['urgent', 'symptoms'];          /* emergency pages: nothing may cover them */

  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isNarrow = () => window.matchMedia('(max-width: 720px)').matches;
  const hasPrompt = () => typeof installPrompt !== 'undefined' && !!installPrompt;   /* installPrompt is captured in 07-review-offline.js */

  /* One small note. New values are merged into it, never written over it. */
  function readNote() {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    } catch (e) { return {}; }
  }
  function writeNote(patch) {
    try { localStorage.setItem(KEY, JSON.stringify(Object.assign(readNote(), patch))); } catch (e) { /* storage blocked: it simply asks again next time */ }
  }

  let waited = false;                                   /* the 20 seconds have passed on this page load */
  let iosReturnFocus = null;

  function eligible() {
    if (isStandalone() || !isNarrow()) return false;
    const n = readNote();
    if (n.dismissed || n.installed) return false;
    if (n.snoozeUntil && Date.now() < n.snoozeUntil) return false;
    return isIOS() || hasPrompt();
  }
  function quietNow() {
    const wiz = document.getElementById('wf-wizard-overlay');
    return QUIET_PAGES.indexOf(page) >= 0 || (wiz && !wiz.hidden) || !!document.getElementById('install-ios');
  }

  const shareIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 15V3"/><path d="m8 7 4-4 4 4"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/></svg>';

  function bannerHtml() {
    const ios = isIOS();
    return '<div id="install-banner" class="install-banner" role="region" data-lang="' + esc(state.lang) + '" aria-label="' + esc(T('Install app', 'تثبيت التطبيق')) + '">' +
      '<div class="install-icon" aria-hidden="true">🌸</div>' +
      '<div class="install-body"><strong>' + esc(T('Add Women & Families to your home screen', 'أضيفي Women & Families إلى شاشتكِ الرئيسية')) + '</strong>' +
        '<span>' + esc(T('Open instantly, works offline, no account needed.', 'تفتح فوراً، تعمل دون إنترنت، ودون حساب.')) + '</span>' +
        (ios && !hasPrompt() ? '<span class="install-ios">' + esc(T('Tap the Share button', 'اضغطي على زر المشاركة')) + ' ' + shareIcon + ' ' + esc(T('then "Add to Home Screen"', 'ثم «إضافة إلى الشاشة الرئيسية»')) + '</span>' : '') +
      '</div>' +
      '<button type="button" class="install-x" data-install-close aria-label="' + esc(T('Close for good', 'إغلاق نهائي')) + '">×</button>' +
      '<div class="install-actions">' +
        '<button type="button" class="install-later" data-install-later>' + esc(T('Not now', 'ليس الآن')) + '</button>' +
        '<button type="button" class="install-go" data-install-go>' + esc(ios && !hasPrompt() ? T('How to install', 'كيفية التثبيت') : T('Install', 'تثبيت')) + '</button>' +
      '</div></div>';
  }

  function unmount() {
    const b = document.getElementById('install-banner');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  /* Decide, right now, whether the card should be on screen. Called when time passes, the page or language changes,
     or the browser hands us its install prompt. */
  function sync() {
    const b = document.getElementById('install-banner');
    if (!waited || !eligible() || quietNow()) { if (b) unmount(); return; }
    if (b && b.getAttribute('data-lang') === state.lang) return;
    if (b) unmount();
    const tmp = document.createElement('div');
    tmp.innerHTML = bannerHtml();
    document.body.appendChild(tmp.firstElementChild);
  }

  /* ── The iPhone / iPad how-to ────────────────────────────────────── */
  function closeIOS() {
    const m = document.getElementById('install-ios');
    if (m && m.parentNode) m.parentNode.removeChild(m);
    if (iosReturnFocus && iosReturnFocus.focus) { try { iosReturnFocus.focus(); } catch (e) {} }
    iosReturnFocus = null;
    sync();
  }
  function showIOS() {
    if (document.getElementById('install-ios')) return;
    iosReturnFocus = document.activeElement;
    const step = (n, title, sub) => '<div class="install-step"><span class="install-num" aria-hidden="true">' + n + '</span><div><strong>' + esc(title) + '</strong><span>' + esc(sub) + '</span></div></div>';
    const m = document.createElement('div');
    m.id = 'install-ios';
    m.className = 'install-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-labelledby', 'install-ios-title');
    m.innerHTML = '<div class="install-sheet" dir="' + (state.lang === 'ar' ? 'rtl' : 'ltr') + '">' +
      '<h2 id="install-ios-title">' + esc(T('Add to your home screen', 'أضيفي إلى شاشتكِ الرئيسية')) + '</h2>' +
      step(1, T('Tap the Share button', 'اضغطي على زر المشاركة'), T('The square with an arrow, at the bottom of Safari', 'المربع الذي فيه سهم، أسفل Safari')) +
      step(2, T('Scroll down and tap "Add to Home Screen"', 'اسحبي للأسفل واضغطي «إضافة إلى الشاشة الرئيسية»'), T('Look for the + icon in the share sheet', 'ابحثي عن أيقونة + في قائمة المشاركة')) +
      step(3, T('Tap "Add" to confirm', 'اضغطي «إضافة» للتأكيد'), T('The app will appear on your home screen like any other app.', 'سيظهر التطبيق على شاشتكِ مثل أي تطبيق آخر.')) +
      '<button type="button" id="install-ios-close" class="install-go install-wide">' + esc(T('Got it', 'فهمت')) + '</button></div>';
    document.body.appendChild(m);
    unmount();                                          /* the card steps aside while the guide is open */
    const btn = document.getElementById('install-ios-close');
    if (btn) btn.focus();
  }

  /* ── Installing ───────────────────────────────────────────────────── */
  async function install() {
    if (isStandalone()) { toast(T('The app is already installed on this device.', 'التطبيق مثبّت بالفعل على هذا الجهاز.')); return; }
    if (hasPrompt()) {
      const p = installPrompt;
      installPrompt = null;                             /* a browser prompt can be used once */
      try {
        await p.prompt();
        const choice = await p.userChoice;
        if (choice && choice.outcome === 'accepted') {
          writeNote({ installed: true });
          unmount();
          toast(T('App installed — open it from your home screen.', 'تم تثبيت التطبيق — افتحيه من شاشتكِ الرئيسية.'));
        } else {
          writeNote({ snoozeUntil: Date.now() + SNOOZE_MS });
          unmount();
        }
      } catch (e) { unmount(); }
      return;
    }
    if (isIOS()) { showIOS(); return; }
    toast(T('Open your browser menu and choose "Install app" or "Add to Home screen".', 'افتحي قائمة المتصفح واختاري «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».'));
  }

  /* ── Wiring (document-level, so it survives every page redraw) ───── */
  document.addEventListener('click', function(e) {
    const t = e.target && e.target.closest ? e.target : null;
    if (!t) return;
    if (t.closest('[data-install-close]')) { writeNote({ dismissed: true }); unmount(); return; }
    if (t.closest('[data-install-later]')) { writeNote({ snoozeUntil: Date.now() + SNOOZE_MS }); unmount(); return; }
    if (t.closest('[data-install-go]')) { install(); return; }
    const row = t.closest('[data-install-open]');
    if (row) { e.preventDefault(); install(); return; }
    if (t.closest('#install-ios-close') || t.id === 'install-ios') closeIOS();
  });

  document.addEventListener('keydown', function(e) {
    const m = document.getElementById('install-ios');
    if (!m) return;
    if (e.key === 'Escape') { e.preventDefault(); closeIOS(); }
    else if (e.key === 'Tab') { e.preventDefault(); const b = document.getElementById('install-ios-close'); if (b) b.focus(); }   /* one control: keep focus inside the dialog */
  });

  window.addEventListener('beforeinstallprompt', function() { if (waited) sync(); });   /* 07-review-offline.js has already stored the prompt */
  window.addEventListener('appinstalled', function() { writeNote({ installed: true }); unmount(); });

  /* Page, stage and language changes redraw #app: re-check every time (this is what hides the card on urgent help). */
  const app = document.getElementById('app');
  if (app) {
    let queued = false;
    new MutationObserver(function() {
      if (queued) return;
      queued = true;
      queueMicrotask(function() { queued = false; sync(); });
    }).observe(app, { childList: true });
  }

  if (!isStandalone()) setTimeout(function() { waited = true; sync(); }, DELAY_MS);
})();

/* The "Install app" row for the More page. It is a link-styled row that starts the install instead of changing page.
   Hidden once the app is installed. */
function installRow() {
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) return '';
  return '<a class="more-row" href="#more" data-install-open role="button"><span class="tile-icon">' + navIcon('tools') + '</span><span><strong>' +
    esc(T('Install app', 'تثبيت التطبيق')) + '</strong><small>' + esc(T('Add it to your home screen', 'أضيفيه إلى شاشتكِ الرئيسية')) +
    '</small></span><span class="row-arrow" aria-hidden="true">›</span></a>';
}
