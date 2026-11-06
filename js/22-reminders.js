/* Women & Families 2026.11.05-r24 | js/22-reminders.js
   Reminders and milestones: appointment alerts, antenatal and postpartum milestones, supplement reminders.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* Privacy rules for this file (the privacy page promises them):
   - Nothing is sent anywhere. Reminders are worked out on the device from data the woman already entered.
   - Her "dismissed" choices are kept in memory. They are written to localStorage ONLY while device saving is on,
     and they are removed when device saving is off or "Delete my plan" is used. The ids name her stage
     (for example the week-20 scan), so they must never be stored without her consent.
   - Reminder text is built with esc(): appointment titles come from the user (or from a restored backup). */

const REM_KEY = 'wf-reminders-v1';
const REM = { ANTENATAL: 'antenatal', POSTPARTUM: 'postpartum', APPOINTMENT: 'appointment', SUPPLEMENT: 'supplement' };

/* UK schedule (NICE NG201, NHS). Other countries follow different schedules: the page says so. */
const ANTENATAL_SCHEDULE = [
  {week:8,  en:'Booking appointment — blood tests, dating scan referral',
            ar:'موعد التسجيل — فحوصات الدم وإحالة لمسح التاريخ'},
  {week:10, en:'Down syndrome and other screening: the combined test is usually offered at about 11–14 weeks',
            ar:'فحص متلازمة داون وغيره: يُعرض الفحص المدمج عادةً بين الأسبوعين 11 و14 تقريباً'},
  {week:12, en:'Dating scan (nuchal translucency ultrasound)',
            ar:'مسح الأسبوع 12 (قياس الشفافية القفوية)'},
  {week:16, en:'Midwife appointment — results review, iron check. The whooping cough vaccine can be given from about now.',
            ar:'موعد المولّدة — مراجعة النتائج وفحص الحديد. يمكن إعطاء تطعيم السعال الديكي من هذا الوقت تقريباً.'},
  {week:20, en:'Anomaly scan (20-week structural ultrasound)',
            ar:'مسح الأسبوع 20 (فحص التشوهات الهيكلية)'},
  {week:24, en:'Midwife appointment — fundal height, blood pressure',
            ar:'موعد المولّدة — قياس الرحم وضغط الدم'},
  {week:25, en:'Glucose tolerance test if at risk of gestational diabetes',
            ar:'اختبار تحمل الغلوكوز إذا كنتِ في خطر سكري الحمل'},
  {week:28, en:'Anti-D if Rh negative · fetal movement awareness',
            ar:'حقنة Anti-D إذا كانت فصيلة دمكِ سالبة · انتبهي لحركة الجنين'},
  {week:31, en:'Midwife appointment — blood pressure, urinalysis',
            ar:'موعد المولّدة — ضغط الدم وتحليل البول'},
  {week:34, en:'Midwife appointment — whooping cough vaccine if you have not had it yet (best between 16 and 32 weeks, still possible until labour)',
            ar:'موعد المولّدة — تطعيم السعال الديكي إن لم تأخذيه بعد (الأفضل بين الأسبوعين 16 و32، ويمكن حتى الولادة)'},
  {week:36, en:'Midwife appointment — baby position check, birth plan discussion',
            ar:'موعد المولّدة — وضع الجنين ومناقشة خطة الولادة'},
  {week:38, en:'Midwife appointment — signs of labour discussion',
            ar:'موعد المولّدة — مناقشة علامات الولادة'},
  {week:40, en:'Midwife appointment — sweep offered if not in labour',
            ar:'موعد المولّدة — عرض الكنس إذا لم تبدأ الولادة'},
  {week:41, en:'Consultant review — induction of labour discussion',
            ar:'مراجعة الاستشاري — مناقشة تحريض الولادة'}
];

const POSTPARTUM_SCHEDULE = [
  {days:1,   en:'First midwife home visit — feeding, wound check',
             ar:'أول زيارة منزلية للمولّدة — الرضاعة وفحص الجرح'},
  {days:3,   en:'Newborn blood spot (heel prick) test',
             ar:'فحص نقطة الدم للمولود (وخز الكعب)'},
  {days:5,   en:'Midwife visit — jaundice check, weight, feeding',
             ar:'زيارة المولّدة — فحص اليرقان والوزن والرضاعة'},
  {days:10,  en:'Midwife care may pass to a health visitor (UK)',
             ar:'قد تنتقل الرعاية من المولّدة إلى المرشدة الصحية (المملكة المتحدة)'},
  {days:14,  en:'Health visitor first visit (UK) — postnatal mood check',
             ar:'أول زيارة للمرشدة الصحية (المملكة المتحدة) — فحص المزاج بعد الولادة'},
  {days:28,  en:'Booking reminder: baby\'s first routine vaccines (UK: 8 weeks — your country\'s schedule may differ)',
             ar:'تذكير بحجز أول تطعيمات روتينية للطفل (المملكة المتحدة: الأسبوع 8 — قد يختلف جدول بلدكِ)'},
  {days:42,  en:'6-week postnatal check — your check and your baby\'s check with a doctor',
             ar:'الفحص السداسي بعد الولادة — فحصكِ وفحص طفلكِ عند الطبيب'},
  {days:56,  en:'Baby\'s first routine vaccines (UK: 8 weeks — your country\'s schedule may differ)',
             ar:'أول تطعيمات روتينية للطفل (المملكة المتحدة: الأسبوع 8 — قد يختلف جدول بلدكِ)'},
  {days:84,  en:'Baby\'s second round of vaccines (UK: 12 weeks — your country\'s schedule may differ)',
             ar:'الجولة الثانية من تطعيمات الطفل (المملكة المتحدة: الأسبوع 12 — قد يختلف جدول بلدكِ)'},
  {days:112, en:'Baby\'s third round of vaccines (UK: 16 weeks — your country\'s schedule may differ)',
             ar:'الجولة الثالثة من تطعيمات الطفل (المملكة المتحدة: الأسبوع 16 — قد يختلف جدول بلدكِ)'}
];

const SUPPLEMENT_REMINDERS = {
  prep: [
    {id:'folic', en:'Take 400 mcg folic acid daily — start 3 months before conception. Your doctor may advise a different dose.',
                 ar:'تناولي 400 ميكروغرام حمض الفوليك يومياً — ابدئي قبل 3 أشهر من الحمل. قد تنصحكِ طبيبتكِ بجرعة مختلفة.'},
    {id:'vitd',  en:'Consider vitamin D 10 mcg daily, especially autumn/winter',
                 ar:'فكّري في تناول فيتامين د 10 ميكروغرام يومياً، خاصة في الخريف والشتاء'}
  ],
  pregnancy: [
    {id:'folic-preg', en:'Continue folic acid 400 mcg daily until week 12. Your doctor may advise a different dose.',
                      ar:'استمري في تناول حمض الفوليك 400 ميكروغرام حتى الأسبوع 12. قد تنصحكِ طبيبتكِ بجرعة مختلفة.'},
    {id:'vitd-preg',  en:'Take vitamin D 10 mcg daily throughout pregnancy',
                      ar:'تناولي فيتامين د 10 ميكروغرام يومياً طوال الحمل'}
  ],
  breastfeeding: [
    {id:'vitd-bf', en:'Continue vitamin D 10 mcg daily while breastfeeding',
                   ar:'استمري في تناول فيتامين د 10 ميكروغرام أثناء الرضاعة'}
  ]
};

/* ── Dismissed reminders: memory first, disk only with consent ───── */
let remDismissed = null;

function remLoad() {
  if (remDismissed) return remDismissed;
  remDismissed = {};
  if (state.save === true) {
    try {
      const o = JSON.parse(localStorage.getItem(REM_KEY) || '{}');
      if (o && typeof o === 'object' && !Array.isArray(o)) {
        Object.keys(o).forEach(function(k) {
          if (/^[a-z0-9-]{1,80}$/i.test(k) && typeof o[k] === 'number') remDismissed[k] = o[k];
        });
      }
    } catch (e) { /* unreadable: start empty */ }
  }
  return remDismissed;
}

function remPersist() {
  try {
    if (state.save === true) localStorage.setItem(REM_KEY, JSON.stringify(remDismissed || {}));
    else localStorage.removeItem(REM_KEY);
  } catch (e) { /* storage unavailable: the choice still holds for this visit */ }
}

function remDismiss(id) {
  const d = remLoad();
  d[id] = Date.now();
  remPersist();
  remMount(true);
  if (page === 'reminders' && typeof render === 'function') render();
}

function remClearDismissed() {
  remDismissed = {};
  remPersist();
  remMount(true);
  if (typeof render === 'function') render();
}

const remSafeId = s => String(s).replace(/[^a-z0-9-]/gi, '').slice(0, 80);

/* ── Work out what is due (same data and logic as before, with safe dates) ── */
function remGestWeek() {
  /* same rule as the rest of the app: round((280 - days to due date) / 7) */
  if (!state.edd) return null;
  const edd = parse(state.edd);
  if (!Number.isFinite(edd)) return null;
  return Math.round((280 - Math.round((edd - today()) / DAY)) / 7);
}

function calcReminders() {
  const dismissed = remLoad();
  const stage = state.stage || 'pregnancy';
  const t0 = today();
  const out = [];

  /* 1. Booked appointments in the next 7 days */
  (Array.isArray(state.appointments) ? state.appointments : []).forEach(function(appt) {
    const d = parse(appt && appt.date);
    if (!Number.isFinite(d)) return;
    const daysUntil = Math.round((d - t0) / DAY);
    if (daysUntil < 0 || daysUntil > 7) return;
    const id = remSafeId('appt-' + (appt.id || appt.date) + '-' + daysUntil);
    if (dismissed[id]) return;
    const title = String(appt.title || '').slice(0, 120);
    out.push({
      id: id, type: REM.APPOINTMENT, priority: daysUntil === 0 ? 1 : 2, today: daysUntil === 0,
      when: [daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : 'In ' + daysUntil + ' days',
             daysUntil === 0 ? 'اليوم' : daysUntil === 1 ? 'غداً' : 'بعد ' + daysUntil + ' أيام'],
      detail: [title, title],
      private: ['You have an appointment coming up.', 'لديكِ موعد قريب.'],
      action: ['Open my plan', 'افتحي خطتي'], hash: 'plan'
    });
  });

  /* 2. Antenatal milestones: only when she has entered a due date */
  const wk = (stage === 'pregnancy') ? remGestWeek() : null;
  if (wk !== null) {
    ANTENATAL_SCHEDULE.forEach(function(m) {
      const ahead = m.week - wk;
      if (ahead < 0 || ahead > 2) return;
      const id = 'antenatal-wk' + m.week;
      if (dismissed[id]) return;
      out.push({
        id: id, type: REM.ANTENATAL, priority: ahead === 0 ? 1 : 3,
        when: [ahead === 0 ? 'This week (week ' + m.week + ')' : 'Next week (week ' + m.week + ')',
               ahead === 0 ? 'هذا الأسبوع (الأسبوع ' + m.week + ')' : 'الأسبوع القادم (الأسبوع ' + m.week + ')'],
        detail: [m.en, m.ar],
        private: ['You have a health milestone coming up.', 'لديكِ معلم صحي قادم.'],
        action: ['My pregnancy', 'رحلة حملي'], hash: 'pregnancy'
      });
    });
  }

  /* 3. Postpartum milestones: only when she has entered a birth date */
  const birth = (state.forms && state.forms.birthdate) ? parse(state.forms.birthdate) : NaN;
  if ((stage === 'postpartum' || stage === 'breastfeeding') && Number.isFinite(birth)) {
    const daysPP = Math.round((t0 - birth) / DAY);
    POSTPARTUM_SCHEDULE.forEach(function(m) {
      const ahead = m.days - daysPP;
      if (ahead < 0 || ahead > 14) return;
      const id = 'postpartum-d' + m.days;
      if (dismissed[id]) return;
      out.push({
        id: id, type: REM.POSTPARTUM, priority: ahead === 0 ? 1 : 3,
        when: [ahead === 0 ? 'Today' : ahead === 1 ? 'Tomorrow' : 'In ' + ahead + ' days',
               ahead === 0 ? 'اليوم' : ahead === 1 ? 'غداً' : 'بعد ' + ahead + ' أيام'],
        detail: [m.en, m.ar],
        private: ['You have a health milestone coming up.', 'لديكِ معلم صحي قادم.'],
        action: ['After birth guides', 'أدلة ما بعد الولادة'], hash: 'postpartum'
      });
    });
  }

  /* 4. Supplements: never assumed. Only when her own entries show the stage
        (a due date, a birth date, or "preparing for pregnancy" chosen). */
  let suppKey = null;
  if (stage === 'prep') suppKey = 'prep';
  else if (stage === 'pregnancy' && wk !== null) suppKey = 'pregnancy';
  else if (stage === 'breastfeeding' && Number.isFinite(birth)) suppKey = 'breastfeeding';
  (SUPPLEMENT_REMINDERS[suppKey] || []).forEach(function(s) {
    const id = 'supp-' + s.id;
    if (dismissed[id]) return;
    out.push({
      id: id, type: REM.SUPPLEMENT, priority: 4,
      when: ['', ''], detail: [s.en, s.ar],
      private: ['You have a health reminder.', 'لديكِ تذكير صحي.'],
      action: ['Medicine checker', 'فاحص الأدوية'], hash: 'checker'
    });
  });

  out.sort(function(a, b) { return a.priority - b.priority; });
  return out;
}

/* CR-2 stage 1 (Agent 2, approved by founder 5 Nov 2026): the antenatal, postpartum and
   supplement schedules are UK practice (NICE NG201 / NHS); banner text built only from
   "when: detail" had no label saying so, unlike the schedule panel on the Reminders page,
   which already says "(UK, NICE NG201)". A country setting (CR-2 stage 2) is the real fix
   and needs the A2-6 country files; this is the interim label. */
const UK_SCHEDULE_TYPES = [REM.ANTENATAL, REM.POSTPARTUM, REM.SUPPLEMENT];
const remText = r => {
  const l = state.lang === 'ar' ? 1 : 0;
  const ukTag = UK_SCHEDULE_TYPES.indexOf(r.type) >= 0 ? T('UK schedule: ', 'جدول المملكة المتحدة: ') : '';
  if (state.homePrivate) return ukTag + r.private[l];   /* respects "Hide personal details on Home" */
  return ukTag + (r.when[l] ? r.when[l] + ': ' : '') + r.detail[l];
};

/* ── Banner at the top of the app (not sticky, so it never covers the header) ── */
function remBannerHtml(r) {
  const l = state.lang === 'ar' ? 1 : 0;
  return '<div class="rem-banner" role="status" data-type="' + (r.today ? 'today' : r.type) + '">' +
    '<span class="rem-text">' + esc(remText(r)) + '</span>' +
    '<a class="rem-action" href="#' + r.hash + '">' + esc(r.action[l]) + '</a>' +
    '<button type="button" class="rem-dismiss" data-rem-dismiss="' + esc(r.id) + '" aria-label="' + esc(T('Dismiss', 'رفض')) + '">×</button>' +
    '</div>';
}

let remSig = '';
function remMount(force) {
  /* with device saving off, nothing about reminders may remain on disk (also cleans up older leftovers) */
  if (state.save !== true) { try { localStorage.removeItem(REM_KEY); } catch (e) {} }
  const main = document.querySelector('main');
  if (!main || !main.parentNode) return;
  const list = (page === 'reminders') ? [] : calcReminders().slice(0, 2);   /* the Reminders page lists everything itself */
  const html = list.map(remBannerHtml).join('');
  const sig = state.lang + '|' + (state.homePrivate ? 'p' : 'o') + '|' + html;
  let box = document.getElementById('rem-container');
  if (!force && box && sig === remSig) return;
  remSig = sig;
  if (!html) { if (box) box.parentNode.removeChild(box); return; }
  if (!box) {
    box = document.createElement('div');
    box.id = 'rem-container';
    box.className = 'rem-container';
    main.parentNode.insertBefore(box, main);
  }
  box.innerHTML = html;
}

/* ── The Reminders page (#reminders) ─────────────────────────────── */
function remindersPage() {
  const l = state.lang === 'ar' ? 1 : 0;
  const stage = state.stage || 'pregnancy';
  const list = calcReminders();
  const wk = (stage === 'pregnancy') ? remGestWeek() : null;
  const birth = (state.forms && state.forms.birthdate) ? parse(state.forms.birthdate) : NaN;
  const dismissedCount = Object.keys(remLoad()).length;

  let html = head(T('Reminders & milestones', 'التذكيرات والمعالم'),
                  T('Upcoming health milestones and appointment reminders based on your stage.', 'المعالم الصحية القادمة وتذكيرات المواعيد بناءً على مرحلتكِ.'));

  html += '<section class="panel spaced"><h2>' + esc(T('Due now or coming soon', 'مستحقة الآن أو قريباً')) + '</h2>';
  if (list.length) {
    html += list.map(function(r) {
      const ukTag = UK_SCHEDULE_TYPES.indexOf(r.type) >= 0 ? T('UK schedule: ', 'جدول المملكة المتحدة: ') : '';   /* CR-2 stage 1 */
      return '<div class="rem-row"><span class="rem-dot" data-type="' + (r.today ? 'today' : r.type) + '" aria-hidden="true"></span>' +
        '<span class="rem-row-text">' + esc(ukTag + (r.when[l] ? r.when[l] + ': ' : '') + r.detail[l]) + '</span>' +
        '<a class="rem-row-link" href="#' + r.hash + '">' + esc(r.action[l]) + '</a>' +
        '<button type="button" class="rem-row-btn" data-rem-dismiss="' + esc(r.id) + '">' + esc(T('Dismiss', 'رفض')) + '</button></div>';
    }).join('');
  } else {
    html += '<p class="empty">' + esc(T('No reminders due right now.', 'لا توجد تذكيرات مستحقة الآن.')) + '</p>';
    if (stage === 'pregnancy' && wk === null) {
      html += '<p class="small">' + esc(T('Add your due date in the pregnancy calculator to see antenatal milestones.', 'أضيفي تاريخ الولادة المتوقع في حاسبة الحمل لرؤية معالم الرعاية قبل الولادة.')) + '</p>';
    }
  }
  html += '</section>';

  if (stage === 'pregnancy') {
    html += '<details class="panel spaced rem-sched"><summary>' + esc(T('Antenatal care schedule (UK, NICE NG201)', 'جدول الرعاية قبل الولادة (المملكة المتحدة، NICE NG201)')) + '</summary>' +
      ANTENATAL_SCHEDULE.map(function(m) {
        const done = wk !== null && m.week < wk;
        return '<div class="rem-sched-row' + (done ? ' is-done' : '') + '"><span class="rem-sched-when">' + esc(done ? '✓' : T('Wk', 'أسبوع') + ' ' + m.week) + '</span><span>' + esc(m[l ? 'ar' : 'en']) + '</span></div>';
      }).join('') + '</details>';
  }
  if (stage === 'postpartum' || stage === 'breastfeeding') {
    html += '<details class="panel spaced rem-sched"><summary>' + esc(T('Postpartum care schedule (UK)', 'جدول رعاية ما بعد الولادة (المملكة المتحدة)')) + '</summary>' +
      POSTPARTUM_SCHEDULE.map(function(m) {
        return '<div class="rem-sched-row"><span class="rem-sched-when">' + esc(T('Day', 'يوم') + ' ' + m.days) + '</span><span>' + esc(m[l ? 'ar' : 'en']) + '</span></div>';
      }).join('') + '</details>';
  }

  if (dismissedCount > 0) {
    html += '<p class="small">' + esc(dismissedCount + ' ' + T('reminder(s) dismissed.', 'تذكير(ات) تم رفضها.')) +
      ' <button type="button" class="textbutton" data-rem-reset>' + esc(T('Reset dismissed reminders', 'إعادة تعيين التذكيرات المرفوضة')) + '</button></p>';
  }

  html += '<div class="notice small">' + esc(T(
    'Schedules follow UK guidance (NICE, NHS). Other countries follow different schedules, so always follow your own midwife or doctor. Timings are approximate. Reminders are worked out on your device and never sent anywhere.',
    'الجداول مبنية على إرشادات المملكة المتحدة (NICE وNHS). تختلف الجداول من بلد إلى آخر، فاتبعي دائماً مولّدتكِ أو طبيبتكِ. المواعيد تقريبية. تُحسب التذكيرات على جهازكِ ولا تُرسل إلى أي جهة.')) + '</div>';
  return html;
}

/* ── Wiring ──────────────────────────────────────────────────────── */
document.addEventListener('click', function(e) {
  const t = e.target && e.target.closest ? e.target : null;
  if (!t) return;
  const d = t.closest('[data-rem-dismiss]');
  if (d) { remDismiss(d.getAttribute('data-rem-dismiss')); return; }
  if (t.closest('[data-rem-reset]')) remClearDismissed();
});

/* Keep the banner right when the page, language or stage changes (the app redraws #app each time). */
(function() {
  const app = document.getElementById('app');
  if (!app) return;
  let queued = false;
  new MutationObserver(function() {
    if (queued) return;
    queued = true;
    queueMicrotask(function() { queued = false; remMount(false); });
  }).observe(app, { childList: true });
  remMount(false);
})();
