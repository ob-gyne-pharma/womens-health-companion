/* Women & Families 2026.11.04-r23 | js/26-passport.js
   Personal health passport: encrypted local records (profile, allergies, medicines,
   conditions, procedures, pregnancies, investigations, family history) and an offline
   emergency card built from them.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js.

   PRIVACY, in plain terms (keep this true — it is what FACTSHEET.md and the privacy page say):
   - Passport data never leaves this device. This file makes no network request.
   - It is stored in IndexedDB (database 'wf-passport-v1'), encrypted with AES-GCM. The key
     is derived from a passphrase the woman chooses (PBKDF2-SHA256, 210000 iterations) — we
     never store the passphrase itself, only a random salt alongside the ciphertext.
   - If she forgets her passphrase, the data cannot be recovered. There is no "reset
     password" — that would require storing something that unlocks it without her, which
     would defeat the point of encrypting it. This is stated to her before she sets it.
   - "App lock": once a passphrase is set, the passport re-locks after 5 minutes of
     inactivity, when the tab is hidden, or on reload — she must re-enter it each time.
   - Nothing here is a clinician-verified record. Every entry is labelled with its source
     (entered by her, or marked reviewed only if she says a clinician told her so) and nothing
     in this file upgrades that label on its own. */
'use strict';

/* ---------- 1. Encryption (AES-GCM, key from a passphrase via PBKDF2) -------------------- */

const PASSPORT_DB = 'wf-passport-v1';
const PBKDF2_ITERATIONS = 210000;
const LOCK_AFTER_MS = 5 * 60 * 1000;

function cryptoAvailable() {
  return !!(window.crypto && window.crypto.subtle && window.indexedDB);
}

function openPassportDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(PASSPORT_DB, 1);
    req.onupgradeneeded = () => { req.result.createObjectStore('blob'); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function idbGet(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blob', 'readonly').objectStore('blob').get(key);
    tx.onsuccess = () => resolve(tx.result);
    tx.onerror = () => reject(tx.error);
  });
}
function idbPut(db, key, val) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blob', 'readwrite').objectStore('blob').put(val, key);
    tx.onsuccess = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
function idbDelete(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blob', 'readwrite').objectStore('blob').delete(key);
    tx.onsuccess = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deriveKey(passphrase, saltBytes) {
  const enc = new TextEncoder();
  const base = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  );
}
async function encryptPassport(obj, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const pt = new TextEncoder().encode(JSON.stringify(obj));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pt);
  return { v: 1, salt: Array.from(salt), iv: Array.from(iv), ct: Array.from(new Uint8Array(ct)) };
}
async function decryptPassport(blob, passphrase) {
  const salt = new Uint8Array(blob.salt), iv = new Uint8Array(blob.iv), ct = new Uint8Array(blob.ct);
  const key = await deriveKey(passphrase, salt);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);   /* throws on wrong passphrase or tampering (GCM auth tag) */
  return JSON.parse(new TextDecoder().decode(pt));
}

/* ---------- 2. In-memory session (never written to disk unencrypted) --------------------- */

let ppUnlocked = null;      /* decrypted passport object, or null when locked */
let ppPassphrase = null;    /* held only in memory while unlocked, to re-encrypt on save */
let ppLockTimer = null;
let ppHasData = null;       /* cached: does an encrypted blob already exist? null = not checked yet */

function emptyPassport() {
  return { profile: {}, records: [] };   /* records: [{id, category, fields:{...}, source, approxDate, notes, createdAt, updatedAt}] */
}

function ppLock() {
  ppUnlocked = null;
  ppPassphrase = null;
  if (ppLockTimer) { clearTimeout(ppLockTimer); ppLockTimer = null; }
  if (page === 'passport' || page === 'emergency-card') navigate('passport');
}
function ppArmAutoLock() {
  if (ppLockTimer) clearTimeout(ppLockTimer);
  ppLockTimer = setTimeout(ppLock, LOCK_AFTER_MS);
}
document.addEventListener('visibilitychange', () => { if (document.hidden && ppUnlocked) ppLock(); });
['click', 'keydown', 'input'].forEach(evt => document.addEventListener(evt, () => { if (ppUnlocked) ppArmAutoLock(); }, { passive: true }));

async function ppExists() {
  if (ppHasData !== null) return ppHasData;
  if (!cryptoAvailable()) return (ppHasData = false);
  try { const db = await openPassportDB(); ppHasData = !!(await idbGet(db, 'passport')); }
  catch (e) { ppHasData = false; }
  return ppHasData;
}

async function ppCreate(passphrase) {
  const data = emptyPassport();
  const db = await openPassportDB();
  await idbPut(db, 'passport', await encryptPassport(data, passphrase));
  ppUnlocked = data; ppPassphrase = passphrase; ppHasData = true;
  ppArmAutoLock();
}
async function ppUnlock(passphrase) {
  const db = await openPassportDB();
  const blob = await idbGet(db, 'passport');
  if (!blob) throw new Error('no-passport');
  const data = await decryptPassport(blob, passphrase);   /* throws OperationError on wrong passphrase */
  ppUnlocked = data; ppPassphrase = passphrase;
  ppArmAutoLock();
  return data;
}
async function ppSave() {
  if (!ppUnlocked || !ppPassphrase) throw new Error('locked');
  const db = await openPassportDB();
  await idbPut(db, 'passport', await encryptPassport(ppUnlocked, ppPassphrase));
}
async function ppDeleteEverything() {
  ppLock();
  try { const db = await openPassportDB(); await idbDelete(db, 'passport'); } catch (e) {}
  ppHasData = false;
}

/* ---------- 3. Record schema (default fields — Agent 2 to review wording and sources) ---- */

const PP_CATEGORIES = {
  condition:  { en: 'Medical condition',    ar: 'حالة طبية',       fields: ['name', 'status', 'approxDate', 'notes'] },
  allergy:    { en: 'Allergy',              ar: 'حساسية',          fields: ['substance', 'reaction', 'severity', 'confirmed'] },
  medication: { en: 'Medicine',             ar: 'دواء',            fields: ['name', 'dose', 'frequency', 'startDate', 'stopDate', 'reason'] },
  pregnancy:  { en: 'Pregnancy',            ar: 'حمل',             fields: ['outcome', 'approxDate', 'notes'] },
  procedure:  { en: 'Procedure or surgery', ar: 'إجراء أو عملية',  fields: ['name', 'approxDate', 'hospital', 'notes'] },
  investigation: { en: 'Test or investigation', ar: 'فحص أو تحليل', fields: ['testName', 'approxDate', 'result', 'notes'] },
  family:     { en: 'Family history',       ar: 'تاريخ عائلي',     fields: ['condition', 'relation', 'approxAge'] }
};
const PP_FIELD_LABEL = {
  name: ['Name', 'الاسم'], status: ['Status', 'الحالة'], approxDate: ['Date (approximate is fine)', 'التاريخ (التقريبي مقبول)'],
  notes: ['Notes', 'ملاحظات'], substance: ['Substance', 'المادة'], reaction: ['Reaction', 'رد الفعل'], severity: ['Severity', 'الشدة'],
  confirmed: ['Confirmed by a clinician?', 'مؤكدة من طبيبة؟'], dose: ['Dose', 'الجرعة'], frequency: ['Frequency', 'التكرار'],
  startDate: ['Start date', 'تاريخ البدء'], stopDate: ['Stop date (leave blank if still taking it)', 'تاريخ التوقف (اتركيه فارغاً إذا ما زلتِ تتناولينه)'],
  reason: ['Reason', 'السبب'], outcome: ['Outcome', 'النتيجة'], hospital: ['Hospital or clinic', 'المستشفى أو العيادة'],
  testName: ['Test name', 'اسم الفحص'], result: ['Result', 'النتيجة'], condition: ['Condition', 'الحالة'],
  relation: ['Relation', 'صلة القرابة'], approxAge: ['Approximate age at diagnosis', 'العمر التقريبي عند التشخيص']
};
const esc1 = s => esc(s == null ? '' : s);

/* ---------- 4. UI: unlock / create passphrase gate ---------------------------------------- */

function ppGate(targetRoute) {
  return new Promise(resolve => {
    const box = document.createElement('div');
    box.id = 'pp-gate';
    box.className = 'install-modal';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'pp-gate-title');
    const existing = ppHasData;   /* resolved before calling this */
    box.innerHTML = '<div class="install-sheet pp-sheet" dir="' + (state.lang === 'ar' ? 'rtl' : 'ltr') + '">' +
      '<h2 id="pp-gate-title">' + esc1(existing ? T('Unlock your passport', 'افتحي خطتكِ الصحية') : T('Set up your health passport', 'إعداد خطتكِ الصحية')) + '</h2>' +
      (existing ? '<p class="small">' + esc1(T('Enter your passphrase.', 'أدخلي عبارة المرور.')) + '</p>'
                : '<p class="small">' + esc1(T('Choose a passphrase of at least 12 characters. It encrypts everything you save here, on this device. If you forget it, this data cannot be recovered — there is no reset.', 'اختاري عبارة مرور لا تقل عن 12 حرفاً. تُشفّر كل ما تحفظينه هنا على هذا الجهاز. إذا نسيتِها، لا يمكن استرجاع هذه البيانات — لا توجد إعادة تعيين.')) + '</p>') +
      '<input type="password" id="pp-pass" autocomplete="' + (existing ? 'current-password' : 'new-password') + '" minlength="12" class="pp-input" aria-label="' + esc1(T('Passphrase', 'عبارة المرور')) + '">' +
      (existing ? '' : '<input type="password" id="pp-pass2" autocomplete="new-password" minlength="12" class="pp-input" aria-label="' + esc1(T('Confirm passphrase', 'تأكيد عبارة المرور')) + '" placeholder="' + esc1(T('Confirm passphrase', 'تأكيد عبارة المرور')) + '">') +
      '<p id="pp-gate-err" class="pp-err" role="alert" hidden></p>' +
      '<button type="button" id="pp-gate-go" class="install-go install-wide">' + esc1(existing ? T('Unlock', 'فتح') : T('Create passport', 'إنشاء الخطة')) + '</button>' +
      '<button type="button" id="pp-gate-cancel" class="install-later install-wide">' + esc1(T('Cancel', 'إلغاء')) + '</button>' +
      '</div>';
    document.body.appendChild(box);
    const input = document.getElementById('pp-pass');
    input.focus();
    const err = (msg) => { const e = document.getElementById('pp-gate-err'); if (e) { e.textContent = msg; e.hidden = false; } };
    const close = (ok) => { box.remove(); resolve(ok); };
    const go = async () => {
      const p1 = document.getElementById('pp-pass').value;
      if (existing) {
        if (!p1) { err(T('Enter your passphrase.', 'أدخلي عبارة المرور.')); return; }
        try { await ppUnlock(p1); close(true); }
        catch (e) { err(T('That passphrase is not correct.', 'عبارة المرور غير صحيحة.')); document.getElementById('pp-pass').value = ''; document.getElementById('pp-pass').focus(); }
      } else {
        const p2 = document.getElementById('pp-pass2').value;
        if (p1.length < 12) { err(T('Use at least 12 characters.', 'استخدمي 12 حرفاً على الأقل.')); return; }
        if (p1 !== p2) { err(T('The two entries do not match.', 'الإدخالان غير متطابقين.')); return; }
        try { await ppCreate(p1); close(true); }
        catch (e) { err(T('Could not set up the passport on this device.', 'تعذّر إعداد الخطة على هذا الجهاز.')); }
      }
    };
    document.getElementById('pp-gate-go').addEventListener('click', go);
    document.getElementById('pp-gate-cancel').addEventListener('click', () => close(false));
    box.addEventListener('keydown', e => { if (e.key === 'Enter') go(); if (e.key === 'Escape') close(false); });
  });
}

/* ---------- 5. Record list + form (one generic renderer for every category) --------------- */

let ppEditing = null;   /* {category, id|null} while a form is open */

function ppFieldInput(cat, field, value) {
  const label = PP_FIELD_LABEL[field] ? PP_FIELD_LABEL[field][state.lang === 'ar' ? 1 : 0] : field;
  const id = 'pp-f-' + field;
  if (field === 'confirmed') {
    return '<label class="pp-check"><input type="checkbox" id="' + id + '"' + (value ? ' checked' : '') + '> ' + esc1(label) + '</label>';
  }
  if (field === 'status') {
    const opts = [['current', T('Current', 'حالية')], ['resolved', T('Resolved', 'منتهية')], ['uncertain', T('Not sure', 'غير متأكدة')]];
    return '<label for="' + id + '">' + esc1(label) + '</label><select id="' + id + '">' +
      opts.map(o => '<option value="' + o[0] + '"' + (value === o[0] ? ' selected' : '') + '>' + esc1(o[1]) + '</option>').join('') + '</select>';
  }
  if (field === 'severity') {
    const opts = [['', T('Not sure', 'غير متأكدة')], ['mild', T('Mild', 'خفيفة')], ['moderate', T('Moderate', 'متوسطة')], ['severe', T('Severe', 'شديدة')]];
    return '<label for="' + id + '">' + esc1(label) + '</label><select id="' + id + '">' +
      opts.map(o => '<option value="' + o[0] + '"' + ((value || '') === o[0] ? ' selected' : '') + '>' + esc1(o[1]) + '</option>').join('') + '</select>';
  }
  if (/Date$/.test(field)) return '<label for="' + id + '">' + esc1(label) + '</label><input type="text" id="' + id + '" value="' + esc1(value) + '" placeholder="' + esc1(T('e.g. 2021 or March 2021 — exact date not required', 'مثال: 2021 أو مارس 2021 — لا حاجة لتاريخ دقيق')) + '">';
  if (field === 'notes' || field === 'result') return '<label for="' + id + '">' + esc1(label) + '</label><textarea id="' + id + '" rows="3">' + esc1(value) + '</textarea>';
  return '<label for="' + id + '">' + esc1(label) + '</label><input type="text" id="' + id + '" value="' + esc1(value) + '">';
}

function ppFormHtml(category, record) {
  const cat = PP_CATEGORIES[category];
  const fields = record ? record.fields : {};
  return '<section class="panel spaced pp-form"><h2>' + esc1(T(record ? 'Edit' : 'Add', record ? 'تعديل' : 'إضافة') + ' — ' + cat[state.lang === 'ar' ? 1 : 0]) + '</h2>' +
    '<form id="pp-record-form">' +
    cat.fields.map(f => '<div class="pp-field">' + ppFieldInput(category, f, fields[f]) + '</div>').join('') +
    '<p class="small">' + esc1(T('Entered by you. This is not a clinician-verified record unless you say so above.', 'مُدخلة منكِ. هذه ليست بيانات موثّقة من طبيبة ما لم تذكري ذلك أعلاه.')) + '</p>' +
    '<div class="pp-form-actions"><button type="submit" class="install-go">' + esc1(T('Save', 'حفظ')) + '</button>' +
    '<button type="button" class="install-later" data-pp-cancel>' + esc1(T('Cancel', 'إلغاء')) + '</button></div>' +
    '</form></section>';
}

async function ppSubmitForm(category, id) {
  const cat = PP_CATEGORIES[category];
  const fields = {};
  cat.fields.forEach(f => {
    const el = document.getElementById('pp-f-' + f);
    if (!el) return;
    fields[f] = el.type === 'checkbox' ? el.checked : el.value.trim();
  });
  const now = Date.now();
  if (id) {
    const rec = ppUnlocked.records.find(r => r.id === id);
    if (rec) { rec.fields = fields; rec.updatedAt = now; }
  } else {
    ppUnlocked.records.push({ id: 'r' + now + Math.random().toString(36).slice(2, 7), category, fields, source: 'user_entered', createdAt: now, updatedAt: now });
  }
  await ppSave();
  ppEditing = null;
  navigate('passport');
}

function ppRecordTitle(rec) {
  const cat = PP_CATEGORIES[rec.category];
  const primary = cat.fields[0];
  return rec.fields[primary] || cat[state.lang === 'ar' ? 1 : 0];
}

/* ---------- 6. Main passport page ---------------------------------------------------------- */

function passportPage() {
  if (!cryptoAvailable()) {
    return head(T('My health passport', 'خطتي الصحية'), '') + '<div class="notice">' +
      esc1(T('This device or browser does not support the secure storage this feature needs.', 'هذا الجهاز أو المتصفح لا يدعم التخزين الآمن الذي تحتاجه هذه الميزة.')) + '</div>';
  }
  if (!ppUnlocked) {
    /* rendered synchronously; the gate is opened by the click handler below once we know whether data exists */
    return head(T('My health passport', 'خطتي الصحية'), T('A private record of your health, encrypted on this device.', 'سجل صحي خاص، مُشفّر على هذا الجهاز.')) +
      '<section class="panel spaced pp-locked"><p>' + esc1(T('Your passport is locked.', 'خطتكِ مقفلة.')) + '</p>' +
      '<button type="button" class="install-go" id="pp-open">' + esc1(T('Unlock', 'فتح')) + '</button></section>' +
      '<div class="notice small">' + esc1(T('Nothing here is sent anywhere. It stays on this device, encrypted with a passphrase only you know.', 'لا شيء هنا يُرسل إلى أي جهة. يبقى على هذا الجهاز، مُشفّراً بعبارة مرور تعرفينها أنتِ فقط.')) + '</div>';
  }
  if (ppEditing) return ppFormHtml(ppEditing.category, ppEditing.id ? ppUnlocked.records.find(r => r.id === ppEditing.id) : null);

  const byCat = {};
  ppUnlocked.records.forEach(r => (byCat[r.category] = byCat[r.category] || []).push(r));
  let html = head(T('My health passport', 'خطتي الصحية'), T('A private record of your health, encrypted on this device.', 'سجل صحي خاص، مُشفّر على هذا الجهاز.'));
  html += '<section class="panel spaced"><div class="pp-row-flex"><a href="#emergency-card" class="install-go">' + esc1(T('Emergency card', 'بطاقة الطوارئ')) + '</a>' +
    '<button type="button" class="install-later" data-pp-lock>' + esc1(T('Lock now', 'قفل الآن')) + '</button></div></section>';
  Object.keys(PP_CATEGORIES).forEach(cat => {
    const items = byCat[cat] || [];
    const c = PP_CATEGORIES[cat];
    html += '<section class="panel spaced pp-section"><h2>' + esc1(c[state.lang === 'ar' ? 1 : 0]) + '</h2>';
    if (items.length) html += '<ul class="pp-list">' + items.map(r =>
      '<li><button type="button" class="pp-list-item" data-pp-edit="' + esc1(cat) + '|' + esc1(r.id) + '"><span>' + esc1(ppRecordTitle(r)) +
      '</span><span class="row-arrow" aria-hidden="true">›</span></button></li>').join('') + '</ul>';
    else html += '<p class="empty small">' + esc1(T('Nothing added yet.', 'لم تتم الإضافة بعد.')) + '</p>';
    html += '<button type="button" class="pp-add" data-pp-add="' + esc1(cat) + '">+ ' + esc1(T('Add', 'إضافة')) + '</button></section>';
  });
  html += '<section class="panel spaced"><h2>' + esc1(T('Export', 'تصدير')) + '</h2><p class="small">' +
    esc1(T('Download everything below as a FHIR-style file, for your own records or to bring to a clinician. It is not sent anywhere automatically.', 'نزّلي كل ما تحت بصيغة قريبة من FHIR لسجلاتكِ الخاصة أو لإحضارها لطبيبة. لا يُرسل تلقائياً إلى أي جهة.')) +
    '</p><button type="button" class="install-later" data-pp-export>' + esc1(T('Download JSON', 'تنزيل JSON')) + '</button></section>';
  html += '<div class="notice small">' + esc1(T('There is no "forgot passphrase" option. If you lose your passphrase, this data cannot be recovered.', 'لا يوجد خيار «نسيت عبارة المرور». إذا فقدتِها، لا يمكن استرجاع هذه البيانات.')) + '</div>';
  return html;
}

/* ---------- 7. Emergency card (offline, fields the woman has chosen) ---------------------- */

const PP_EC_KEY = 'ecFields';   /* which fields she chose, stored inside the encrypted passport itself — not a separate localStorage key */

function emergencyCardPage() {
  if (!ppUnlocked) return passportPage();
  const chosen = ppUnlocked[PP_EC_KEY] || {};
  const allergies = (ppUnlocked.records || []).filter(r => r.category === 'allergy');
  const meds = (ppUnlocked.records || []).filter(r => r.category === 'medication' && !r.fields.stopDate);
  const conditions = (ppUnlocked.records || []).filter(r => r.category === 'condition' && r.fields.status !== 'resolved');
  const p = ppUnlocked.profile || {};

  const rows = [
    ['allergies', T('Allergies', 'الحساسية'), allergies.map(a => a.fields.substance + (a.fields.severity ? ' (' + a.fields.severity + ')' : '')).join(', ') || T('None recorded', 'لا شيء مسجل')],
    ['medications', T('Current medicines', 'الأدوية الحالية'), meds.map(m => m.fields.name + (m.fields.dose ? ' ' + m.fields.dose : '')).join(', ') || T('None recorded', 'لا شيء مسجل')],
    ['conditions', T('Medical conditions', 'الحالات الطبية'), conditions.map(c => c.fields.name).join(', ') || T('None recorded', 'لا شيء مسجل')],
    ['blood', T('Blood group', 'فصيلة الدم'), p.bloodGroup || T('Not recorded', 'غير مسجلة')],
    ['pregnancy', T('Pregnancy status', 'حالة الحمل'), p.pregnancyStatus || T('Not disclosed', 'غير مُفصح عنها')],
    ['contact', T('Emergency contact', 'جهة اتصال الطوارئ'), p.emergencyContact || T('Not set', 'غير مُحددة')]
  ];
  let html = head(T('Emergency card', 'بطاقة الطوارئ'), T('Shown only if you choose to include it below.', 'تظهر فقط إذا اخترتِ إدراجها أدناه.'));
  html += '<section class="panel spaced pp-ec"><p class="small">' + esc1(T('Choose what appears on your emergency card:', 'اختاري ما يظهر في بطاقة الطوارئ:')) + '</p>';
  html += rows.map(r => '<label class="pp-check"><input type="checkbox" data-pp-ec="' + r[0] + '"' + (chosen[r[0]] ? ' checked' : '') + '> ' + esc1(r[1]) + '</label>').join('');
  html += '</section>';
  const visible = rows.filter(r => chosen[r[0]]);
  if (visible.length) {
    html += '<section class="panel spaced pp-ec-card" aria-label="' + esc1(T('Emergency card', 'بطاقة الطوارئ')) + '">' +
      visible.map(r => '<div class="pp-ec-row"><strong>' + esc1(r[1]) + '</strong><span>' + esc1(r[2]) + '</span></div>').join('') +
      '<p class="small">' + esc1(T('Last updated: ', 'آخر تحديث: ') + new Date().toLocaleDateString(state.lang === 'ar' ? 'ar' : 'en-GB')) + '</p>' +
      '<button type="button" class="install-later" data-pp-print>' + esc1(T('Print', 'طباعة')) + '</button></section>';
  } else {
    html += '<p class="empty small">' + esc1(T('Choose at least one item above to build your card.', 'اختاري عنصراً واحداً على الأقل أعلاه لبناء بطاقتكِ.')) + '</p>';
  }
  html += '<div class="notice small">' + esc1(T('This card works offline and shows only what you selected. It is never sent anywhere; sharing it (showing your screen, printing) is entirely up to you.', 'تعمل هذه البطاقة بدون إنترنت وتُظهر فقط ما اخترتِه. لا تُرسل أبداً إلى أي جهة؛ مشاركتها (عرض شاشتكِ، الطباعة) تعود إليكِ تماماً.')) + '</div>';
  return html;
}

/* ---------- 8. Wiring ----------------------------------------------------------------------- */

document.addEventListener('click', async e => {
  const t = e.target && e.target.closest ? e.target : null;
  if (!t) return;
  if (t.closest('#pp-open')) { await ppExists(); const ok = await ppGate(); if (ok) navigate('passport'); return; }
  if (t.closest('[data-pp-lock]')) { ppLock(); return; }
  const add = t.closest('[data-pp-add]');
  if (add) { ppEditing = { category: add.getAttribute('data-pp-add'), id: null }; navigate('passport'); return; }
  const edit = t.closest('[data-pp-edit]');
  if (edit) { const [cat, id] = edit.getAttribute('data-pp-edit').split('|'); ppEditing = { category: cat, id }; navigate('passport'); return; }
  if (t.closest('[data-pp-cancel]')) { ppEditing = null; navigate('passport'); return; }
  if (t.closest('[data-pp-export]')) {
    const blob = new Blob([JSON.stringify({ resourceType: 'Bundle', type: 'collection', exportedAt: new Date().toISOString(), profile: ppUnlocked.profile, entry: ppUnlocked.records }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'my-health-passport.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return;
  }
  if (t.closest('[data-pp-print]')) { window.print(); return; }
});

document.addEventListener('submit', async e => {
  if (e.target && e.target.id === 'pp-record-form') {
    e.preventDefault();
    await ppSubmitForm(ppEditing.category, ppEditing.id);
  }
});

document.addEventListener('change', async e => {
  const cb = e.target && e.target.closest ? e.target.closest('[data-pp-ec]') : null;
  if (!cb || !ppUnlocked) return;
  ppUnlocked[PP_EC_KEY] = ppUnlocked[PP_EC_KEY] || {};
  ppUnlocked[PP_EC_KEY][cb.getAttribute('data-pp-ec')] = cb.checked;
  await ppSave();
  if (page === 'emergency-card') navigate('emergency-card');
});

/* Arriving on #passport or #emergency-card while locked opens the gate automatically. */
let ppGateOpenInFlight = false;
async function ppMaybeGate() {
  if ((page !== 'passport' && page !== 'emergency-card') || ppUnlocked || ppGateOpenInFlight) return;
  if (document.getElementById('pp-gate')) return;
  ppGateOpenInFlight = true;
  await ppExists();
  const ok = await ppGate();
  ppGateOpenInFlight = false;
  if (ok) navigate(page);
}
(function () {
  const app = document.getElementById('app');
  if (!app) return;
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => { queued = false; ppMaybeGate(); });
  }).observe(app, { childList: true });
})();
