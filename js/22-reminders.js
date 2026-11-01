/* Women & Families 2026.10.31-r19 | js/22-reminders.js
   Phase 3: In-app milestone reminders & appointment alerts
   - No push notifications needed — checked at app open, stored in localStorage
   - Pregnancy week milestones (antenatal schedule: NICE NG201)
   - Postpartum milestones (6-week check, 8-week vaccine, etc.)
   - Appointment "due soon" alerts (24h and 1-week ahead)
   - Medication / supplement reminders (folic acid, vitamin D)
   - All bilingual en/ar
   - Renders a dismissible banner at top of app when due
   ------------------------------------------------------------------ */
'use strict';

/* ── Storage key ─────────────────────────────────────────────────── */
const REM_KEY = 'wf-reminders-v1';

/* ── Reminder types ──────────────────────────────────────────────── */
const REM = {
  ANTENATAL:   'antenatal',
  POSTPARTUM:  'postpartum',
  APPOINTMENT: 'appointment',
  SUPPLEMENT:  'supplement',
  MILESTONE:   'milestone'
};

/* ── Pregnancy antenatal schedule (NICE NG201 / NHS) ───────────────
   weeks: the recommended week for each contact
   Each item: { week, en, ar, type }                                  */
const ANTENATAL_SCHEDULE = [
  {week:8,  en:'Booking appointment — blood tests, dating scan referral',
            ar:'موعد التسجيل — فحوصات الدم وإحالة لمسح التاريخ'},
  {week:10, en:'Down syndrome & chromosomal screening window (10–14 weeks)',
            ar:'نافذة فحص متلازمة داون (10–14 أسبوعاً)'},
  {week:12, en:'Dating scan (nuchal translucency ultrasound)',
            ar:'مسح الأسبوع 12 (قياس الشفافية القفوية)'},
  {week:16, en:'Midwife appointment — results review, iron check',
            ar:'موعد المولّدة — مراجعة النتائج وفحص الحديد'},
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
  {week:34, en:'Midwife appointment — whooping cough vaccine window',
            ar:'موعد المولّدة — نافذة تطعيم السعال الديكي'},
  {week:36, en:'Midwife appointment — baby position check, birth plan discussion',
            ar:'موعد المولّدة — وضع الجنين ومناقشة خطة الولادة'},
  {week:38, en:'Midwife appointment — signs of labour discussion',
            ar:'موعد المولّدة — مناقشة علامات الولادة'},
  {week:40, en:'Midwife appointment — sweep offered if not in labour',
            ar:'موعد المولّدة — عرض الكنس إذا لم تبدأ الولادة'},
  {week:41, en:'Consultant review — induction of labour discussion',
            ar:'مراجعة الاستشاري — مناقشة تحريض الولادة'},
];

/* ── Postpartum schedule (NICE PH11, NHS schedule) ─────────────── */
const POSTPARTUM_SCHEDULE = [
  {days:1,   en:'First midwife home visit — feeding, wound check',
             ar:'أول زيارة منزلية للمولّدة — الرضاعة وفحص الجرح'},
  {days:3,   en:'Newborn blood spot (heel prick) test',
             ar:'فحص نقطة الدم للمولود (وخز الكعب)'},
  {days:5,   en:'Midwife visit — jaundice check, weight, feeding',
             ar:'زيارة المولّدة — فحص اليرقان والوزن والرضاعة'},
  {days:10,  en:'Midwife care may transfer to health visitor',
             ar:'قد تنتقل الرعاية من المولّدة إلى المرشدة الصحية'},
  {days:14,  en:'Health visitor first visit — Edinburgh postnatal depression score',
             ar:'أول زيارة للمرشدة الصحية — مقياس ادنبره لاكتئاب ما بعد الولادة'},
  {days:28,  en:'8-week baby vaccines due (booking reminder)',
             ar:'تذكير بحجز تطعيمات الطفل في الأسبوع الثامن'},
  {days:42,  en:'6-week postnatal check — your GP and your baby\'s check',
             ar:'الفحص السداسي بعد الولادة — فحصكِ وفحص طفلكِ عند الطبيب'},
  {days:56,  en:'8-week baby vaccines (first immunisations)',
             ar:'تطعيمات الطفل في الأسبوع الثامن (التطعيمات الأولى)'},
  {days:84,  en:'12-week baby vaccines — second round',
             ar:'تطعيمات الطفل في الأسبوع 12 — الجولة الثانية'},
  {days:112, en:'16-week baby vaccines — third round',
             ar:'تطعيمات الطفل في الأسبوع 16 — الجولة الثالثة'},
];

/* ── Supplement reminders ────────────────────────────────────────── */
const SUPPLEMENT_REMINDERS = {
  prep: [
    {id:'folic',   en:'Take 400 mcg folic acid daily — start 3 months before conception',
                   ar:'تناولي 400 ميكروغرام حمض الفوليك يومياً — ابدئي قبل 3 أشهر من الحمل'},
    {id:'vitd',    en:'Consider vitamin D 10 mcg daily, especially autumn/winter',
                   ar:'فكّري في تناول فيتامين د 10 ميكروغرام يومياً، خاصة في الخريف والشتاء'},
  ],
  pregnancy: [
    {id:'folic-preg', en:'Continue folic acid 400 mcg daily until week 12',
                      ar:'استمري في تناول حمض الفوليك 400 ميكروغرام حتى الأسبوع 12'},
    {id:'vitd-preg',  en:'Take vitamin D 10 mcg daily throughout pregnancy',
                      ar:'تناولي فيتامين د 10 ميكروغرام يومياً طوال الحمل'},
  ],
  breastfeeding: [
    {id:'vitd-bf',  en:'Continue vitamin D 10 mcg daily while breastfeeding',
                    ar:'استمري في تناول فيتامين د 10 ميكروغرام أثناء الرضاعة'},
  ]
};

/* ── Reminder storage helpers ────────────────────────────────────── */
function loadDismissed() {
  try {
    var raw = localStorage.getItem(REM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveDismissed(obj) {
  try { localStorage.setItem(REM_KEY, JSON.stringify(obj)); } catch (e) {}
}

function dismissReminder(id) {
  var d = loadDismissed();
  d[id] = Date.now();
  saveDismissed(d);
  var banner = document.getElementById('rem-banner-' + id);
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-8px)';
    setTimeout(function() { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 300);
  }
}

/* ── Core reminder calculation ────────────────────────────────────── */
function calcReminders() {
  var today = new Date();
  today.setHours(0,0,0,0);
  var reminders = [];
  var dismissed = loadDismissed();
  var stage = state.stage || 'pregnancy';

  /* ── 1. Upcoming booked appointments (next 7 days) ─────────────── */
  (state.appointments || []).forEach(function(appt) {
    var apptDate = new Date(appt.date);
    apptDate.setHours(0,0,0,0);
    var daysUntil = Math.round((apptDate - today) / 86400000);
    if (daysUntil < 0 || daysUntil > 7) return;
    var id = 'appt-' + (appt.id || appt.date) + '-' + daysUntil;
    if (dismissed[id]) return;

    var when = daysUntil === 0 ? T('Today','اليوم')
             : daysUntil === 1 ? T('Tomorrow','غداً')
             : T('In ','بعد ') + daysUntil + T(' days',' أيام');

    reminders.push({
      id: id,
      type: REM.APPOINTMENT,
      priority: daysUntil === 0 ? 1 : 2,
      en: when + ': ' + appt.title,
      ar: when + ': ' + appt.title,
      action: {en:'Open my plan',ar:'افتحي خطتي'},
      actionHash: 'plan',
      colour: daysUntil === 0 ? '#c0392b' : '#d35400'
    });
  });

  /* ── 2. Antenatal milestones (if pregnant with EDD) ────────────── */
  if (stage === 'pregnancy' && state.edd) {
    var edd = new Date(state.edd);
    edd.setHours(0,0,0,0);
    var daysToEdd = Math.round((edd - today) / 86400000);
    var currentWeek = Math.round((280 - daysToEdd) / 7);

    ANTENATAL_SCHEDULE.forEach(function(milestone) {
      var weeksUntil = milestone.week - currentWeek;
      if (weeksUntil < 0 || weeksUntil > 2) return; // show 2 weeks ahead
      var id = 'antenatal-wk' + milestone.week;
      if (dismissed[id]) return;

      var when = weeksUntil === 0 ? T('This week (week ','هذا الأسبوع (الأسبوع ') + milestone.week + ')'
               : T('Next week (week ','الأسبوع القادم (الأسبوع ') + milestone.week + ')';

      reminders.push({
        id: id,
        type: REM.ANTENATAL,
        priority: weeksUntil === 0 ? 1 : 3,
        en: when + ': ' + milestone.en,
        ar: when + ': ' + milestone.ar,
        action: {en:'My pregnancy',ar:'رحلة حملي'},
        actionHash: 'pregnancy',
        colour: '#2a5e4e'
      });
    });
  }

  /* ── 3. Postpartum milestones (if postpartum with birth date) ───── */
  if ((stage === 'postpartum' || stage === 'breastfeeding') && state.forms && state.forms.birthdate) {
    var birthDate = new Date(state.forms.birthdate);
    birthDate.setHours(0,0,0,0);
    var daysPostpartum = Math.round((today - birthDate) / 86400000);

    POSTPARTUM_SCHEDULE.forEach(function(milestone) {
      var daysUntil = milestone.days - daysPostpartum;
      if (daysUntil < 0 || daysUntil > 14) return; // show 2 weeks ahead
      var id = 'postpartum-d' + milestone.days;
      if (dismissed[id]) return;

      var when = daysUntil === 0 ? T('Today','اليوم')
               : daysUntil === 1 ? T('Tomorrow','غداً')
               : T('In ','بعد ') + daysUntil + T(' days',' أيام');

      reminders.push({
        id: id,
        type: REM.POSTPARTUM,
        priority: daysUntil === 0 ? 1 : 3,
        en: when + ': ' + milestone.en,
        ar: when + ': ' + milestone.ar,
        action: {en:'After birth guides',ar:'أدلة ما بعد الولادة'},
        actionHash: 'postpartum',
        colour: '#7a9e8a'
      });
    });
  }

  /* ── 4. Supplement reminders (stage-based, show once per session) ─ */
  var suppList = SUPPLEMENT_REMINDERS[stage] || [];
  suppList.forEach(function(supp) {
    var id = 'supp-' + supp.id;
    // Only show once — dismissed permanently
    if (dismissed[id]) return;
    reminders.push({
      id: id,
      type: REM.SUPPLEMENT,
      priority: 4,
      en: '💊 ' + supp.en,
      ar: '💊 ' + supp.ar,
      action: {en:'Medicine checker',ar:'فاحص الأدوية'},
      actionHash: 'checker',
      colour: '#7b6fa0'
    });
  });

  // Sort by priority (1 = most urgent)
  reminders.sort(function(a,b) { return a.priority - b.priority; });
  return reminders;
}

/* ── Reminder banner HTML ─────────────────────────────────────────── */
function reminderBannerHtml(rem) {
  var lang = state.lang || 'en';
  var text = lang === 'ar' ? rem.ar : rem.en;
  var actionLabel = lang === 'ar' ? rem.action.ar : rem.action.en;

  return '<div id="rem-banner-' + rem.id + '" role="alert" ' +
    'style="background:' + rem.colour + ';color:#fff;' +
    'padding:12px 16px;display:flex;gap:12px;align-items:center;' +
    'font-size:14px;line-height:1.5;' +
    'transition:opacity .3s ease,transform .3s ease;">' +
    '<span style="flex:1">' + text + '</span>' +
    '<a href="#' + rem.actionHash + '" ' +
      'style="background:rgba(255,255,255,.2);color:#fff;' +
      'padding:6px 12px;border-radius:20px;font-size:13px;' +
      'font-weight:600;text-decoration:none;white-space:nowrap;' +
      'flex-shrink:0">' + actionLabel + '</a>' +
    '<button onclick="dismissReminder(\'' + rem.id + '\')" ' +
      'aria-label="' + T('Dismiss','رفض') + '" ' +
      'style="background:none;border:none;color:rgba(255,255,255,.8);' +
      'font-size:22px;line-height:1;padding:0 4px;cursor:pointer;' +
      'flex-shrink:0">×</button>' +
    '</div>';
}

/* ── Mount reminders into the page ──────────────────────────────── */
function mountReminders() {
  // Remove any existing reminder container
  var existing = document.getElementById('rem-container');
  if (existing) existing.parentNode.removeChild(existing);

  var reminders = calcReminders();
  if (!reminders.length) return;

  // Show max 2 reminders at a time to avoid overwhelming the user
  var toShow = reminders.slice(0, 2);

  var container = document.createElement('div');
  container.id = 'rem-container';
  container.style.cssText = 'position:sticky;top:0;z-index:150;';
  container.innerHTML = toShow.map(reminderBannerHtml).join('');

  // Insert after the life-stage bar (before main)
  var main = document.querySelector('main') || document.querySelector('#app');
  if (main && main.parentNode) {
    main.parentNode.insertBefore(container, main);
  }
}

/* ── Reminders page (accessible via #reminders) ─────────────────── */
function remindersPage() {
  var reminders = calcReminders();
  var dismissed = loadDismissed();
  var stage = state.stage || 'pregnancy';

  // Count dismissed
  var dismissedCount = Object.keys(dismissed).length;

  var content = head(
    T('Reminders & milestones','التذكيرات والمعالم'),
    T('Upcoming health milestones and appointment reminders based on your stage.',
      'المعالم الصحية القادمة وتذكيرات المواعيد بناءً على مرحلتكِ.')
  );

  // Active reminders
  if (reminders.length) {
    content += '<div style="margin:20px 0">';
    content += '<h3 style="font-size:15px;margin-bottom:12px">' +
      T('Due now or coming soon','مستحقة الآن أو قريباً') + '</h3>';
    reminders.forEach(function(rem) {
      var lang = state.lang || 'en';
      var text = lang === 'ar' ? rem.ar : rem.en;
      content += '<div style="display:flex;gap:12px;align-items:flex-start;' +
        'padding:14px 0;border-bottom:1px solid var(--line)">' +
        '<span style="width:10px;height:10px;border-radius:50%;' +
          'background:' + rem.colour + ';flex-shrink:0;margin-top:5px;' +
          'box-shadow:0 0 0 3px ' + rem.colour + '22"></span>' +
        '<span style="flex:1;font-size:14px;line-height:1.6">' + text + '</span>' +
        '<button onclick="dismissReminder(\'' + rem.id + '\')" ' +
          'style="background:var(--soft);border:none;border-radius:12px;' +
          'padding:4px 10px;font-size:12px;color:var(--muted);cursor:pointer">' +
          T('Dismiss','رفض') + '</button>' +
        '</div>';
    });
    content += '</div>';
  } else {
    content += '<p class="empty">' +
      T('No reminders due right now.','لا توجد تذكيرات مستحقة الآن.') +
      '</p>';
  }

  // Antenatal schedule (if pregnant)
  if (stage === 'pregnancy') {
    content += '<details style="margin-top:24px"><summary>' +
      T('Antenatal care schedule (NICE NG201)','جدول الرعاية السابقة للولادة (NICE NG201)') +
      '</summary><div style="padding:12px 0">';
    var edd = state.edd;
    var today = new Date(); today.setHours(0,0,0,0);
    ANTENATAL_SCHEDULE.forEach(function(m) {
      var done = false;
      if (edd) {
        var eddDate = new Date(edd); eddDate.setHours(0,0,0,0);
        var currentWeek = Math.round((280 - Math.round((eddDate-today)/86400000)) / 7);
        done = m.week < currentWeek;
      }
      content += '<div style="display:flex;gap:12px;padding:10px 0;' +
        'border-bottom:1px solid var(--line);opacity:' + (done?'0.5':'1') + '">' +
        '<span style="font-size:12px;font-weight:700;color:var(--muted);' +
          'width:32px;flex-shrink:0;padding-top:2px">' +
          (done ? '✓' : T('Wk','أسبوع') + ' ' + m.week) + '</span>' +
        '<span style="font-size:14px;line-height:1.55">' +
          T(m.en, m.ar) + '</span>' +
        '</div>';
    });
    content += '</div></details>';
  }

  // Postpartum schedule
  if (stage === 'postpartum' || stage === 'breastfeeding') {
    content += '<details style="margin-top:24px"><summary>' +
      T('Postpartum care schedule','جدول رعاية ما بعد الولادة') +
      '</summary><div style="padding:12px 0">';
    POSTPARTUM_SCHEDULE.forEach(function(m) {
      content += '<div style="display:flex;gap:12px;padding:10px 0;' +
        'border-bottom:1px solid var(--line)">' +
        '<span style="font-size:12px;font-weight:700;color:var(--muted);' +
          'width:48px;flex-shrink:0;padding-top:2px">' +
          T('Day','يوم') + ' ' + m.days + '</span>' +
        '<span style="font-size:14px;line-height:1.55">' +
          T(m.en, m.ar) + '</span>' +
        '</div>';
    });
    content += '</div></details>';
  }

  // Dismissed count + clear
  if (dismissedCount > 0) {
    content += '<div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--line)">' +
      '<p style="font-size:13px;color:var(--muted)">' +
        dismissedCount + ' ' + T('reminder(s) dismissed.','تذكير(ات) تم رفضها.') +
      '</p>' +
      '<button onclick="clearDismissedReminders()" ' +
        'style="background:var(--soft);border:none;border-radius:20px;' +
        'padding:8px 16px;font-size:13px;cursor:pointer;margin-top:8px">' +
        T('Reset dismissed reminders','إعادة تعيين التذكيرات المرفوضة') +
      '</button>' +
    '</div>';
  }

  // NICE source note
  content += '<div class="notice" style="margin-top:24px;font-size:13px">' +
    T('Schedule based on NICE NG201 (antenatal care), NICE PH11, and NHS routine care pathways. Timings are approximate — always follow your midwife\'s or GP\'s advice.',
      'الجدول مبني على NICE NG201 (رعاية ما قبل الولادة) وNICE PH11 ومسارات الرعاية الروتينية في NHS. المواعيد تقريبية — اتبعي دائماً نصيحة مولّدتكِ أو طبيبتكِ.') +
  '</div>';

  return content;
}

/* ── Clear dismissed ─────────────────────────────────────────────── */
function clearDismissedReminders() {
  saveDismissed({});
  if (typeof render === 'function') render();
}

/* ── Hook into app boot ──────────────────────────────────────────── */
/* mountReminders() is called from render() — see wiring below */
document.addEventListener('DOMContentLoaded', function() {
  // Small delay so app renders first
  setTimeout(mountReminders, 800);
});
