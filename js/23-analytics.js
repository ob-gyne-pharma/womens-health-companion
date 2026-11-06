/* Women & Families 2026.11.05-r24 | js/23-analytics.js
   "My health insights": cycle length trend, pregnancy progress and fetal milestones, postpartum timeline, symptom heatmap.
   Everything is drawn on the device from data the woman already entered. Nothing is sent anywhere, nothing is stored here.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* Fetal milestones. Sizes are [English, Arabic] pairs and are translated when drawn, NOT when this file loads,
   otherwise they would stay stuck in whichever language was active at load time. */
const FETAL_MILESTONES = [
  {week:4,  size:['Poppy seed','بذرة الخشخاش'],
   en:'Heart begins to form. Neural tube developing.',
   ar:'يبدأ تشكّل القلب. يتطور الأنبوب العصبي.'},
  {week:5,  size:['Sesame seed','بذرة السمسم'],
   en:'Heart beating. Brain and spinal cord forming.',
   ar:'القلب ينبض. يتشكّل الدماغ والنخاع الشوكي.'},
  {week:6,  size:['Lentil','عدسة'],
   en:'Facial features beginning. Arm and leg buds appear.',
   ar:'تبدأ ملامح الوجه. تظهر بدايات الذراعين والساقين.'},
  {week:7,  size:['Blueberry','توتة'],
   en:'Brain growing rapidly. Hands and feet forming.',
   ar:'الدماغ ينمو بسرعة. تتشكّل اليدان والقدمان.'},
  {week:8,  size:['Kidney bean','حبة فول'],
   en:'All major organs present. Fingers beginning.',
   ar:'جميع الأعضاء الرئيسية موجودة. تبدأ الأصابع.'},
  {week:9,  size:['Grape','عنبة'],
   en:'Baby can move, though you can\'t feel it yet.',
   ar:'يتحرك الجنين لكنكِ لا تشعرين به بعد.'},
  {week:10, size:['Strawberry','فراولة'],
   en:'Officially a foetus. Vital organs functioning.',
   ar:'يُصبح جنيناً رسمياً. الأعضاء الحيوية تعمل.'},
  {week:12, size:['Lime','ليمونة'],
   en:'Kidneys working. Reflexes developing.',
   ar:'الكلى تعمل. تتطور ردود الأفعال.'},
  {week:14, size:['Peach','خوخة'],
   en:'Can make facial expressions. Sucking reflex present.',
   ar:'يمكنه التعبير بوجهه. يوجد منعكس المص.'},
  {week:16, size:['Avocado','أفوكادو'],
   en:'Eyes moving behind closed lids. Hearing develops.',
   ar:'العيون تتحرك خلف الجفون. يتطور السمع.'},
  {week:18, size:['Sweet potato','بطاطا حلوة'],
   en:'May suck thumb. Unique fingerprints forming.',
   ar:'قد يمص إبهامه. تتشكّل بصمات الأصابع الفريدة.'},
  {week:20, size:['Banana','موزة'],
   en:'Halfway point. Can hear your voice.',
   ar:'منتصف الرحلة. يسمع صوتكِ.'},
  {week:22, size:['Papaya','بابايا'],
   en:'Rapid brain development. Sleep cycles established.',
   ar:'نمو سريع للدماغ. تتأسس دورات النوم.'},
  {week:24, size:['Corn cob','عرنوس ذرة'],
   en:'Lungs developing. Baby responds to sound and light.',
   ar:'الرئتان تتطوران. يستجيب للصوت والضوء.'},
  {week:26, size:['Head of lettuce','رأس خس'],
   en:'Eyes open for the first time. Breathing practice begins.',
   ar:'تفتح العينان لأول مرة. يبدأ تمرين التنفس.'},
  {week:28, size:['Aubergine','باذنجانة'],
   en:'Brain forming grooves. Fat layers building.',
   ar:'يتشكّل الدماغ بتلافيفه. تتراكم طبقات الدهون.'},
  {week:30, size:['Cabbage','ملفوف'],
   en:'Bone marrow making red blood cells. Lanugo fading.',
   ar:'نخاع العظام يصنع كريات الدم الحمراء. يتلاشى الزغب.'},
  {week:32, size:['Butternut squash','قرع العسل'],
   en:'Practising breathing and swallowing. Gaining weight rapidly.',
   ar:'يتدرب على التنفس والبلع. يكتسب وزناً بسرعة.'},
  {week:34, size:['Cantaloupe','شمام'],
   en:'Central nervous system maturing. Most organs ready.',
   ar:'يكتمل الجهاز العصبي المركزي. معظم الأعضاء جاهزة.'},
  {week:36, size:['Head of romaine','رأس خس روماني'],
   en:'Still before 37 weeks, when a pregnancy counts as early term. Usually head-down by now.',
   ar:'ما زال قبل الأسبوع 37، حين يُعدّ الحمل في المدة المبكرة. رأسه عادةً للأسفل الآن.'},
  {week:38, size:['Pumpkin','يقطينة'],
   en:'Early term. Full term begins at week 39. Lungs and brain nearly ready.',
   ar:'المدة المبكرة. تبدأ المدة الكاملة في الأسبوع 39. الرئتان والدماغ شبه جاهزين.'},
  {week:40, size:['Small watermelon','بطيخة صغيرة'],
   en:'Full term. Ready to meet the world.',
   ar:'المدة الكاملة. جاهز لمقابلة العالم.'},
  {week:42, size:['Large pumpkin','يقطينة كبيرة'],
   en:'Post-term. Induction of labour will be discussed.',
   ar:'تجاوز المدة. ستناقش تحريض الولادة.'}
];

/* Same week rule as the rest of the app: round((280 - days to due date) / 7). */
function insGestWeek() {
  if (!state.edd) return null;
  const edd = parse(state.edd);
  if (!Number.isFinite(edd)) return null;
  return Math.round((280 - Math.round((edd - today()) / DAY)) / 7);
}

/* ── SVG sparkline ───────────────────────────────────────────────── */
function sparkline(values, opts) {
  opts = opts || {};
  const w = opts.width || 200, h = opts.height || 48;
  const colour = opts.colour || '#2a5e4e';
  if (!values || values.length < 2) {
    return '<span class="small">' + esc(T('Not enough data yet', 'لا توجد بيانات كافية بعد')) + '</span>';
  }
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values), range = max - min || 1;
  const n = values.length, step = (w - 40) / (n - 1);
  const px = i => Math.round(i * step);
  const py = v => Math.round(h - ((v - min) / range) * (h - 8) - 4);
  const pts = values.map((v, i) => px(i) + ',' + py(v)).join(' ');
  const fill = 'M' + px(0) + ',' + py(values[0]) + ' ' + values.map((v, i) => 'L' + px(i) + ',' + py(v)).join(' ') +
               ' L' + px(n - 1) + ',' + h + ' L' + px(0) + ',' + h + ' Z';
  return '<svg class="ins-spark" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" aria-hidden="true" focusable="false">' +
    '<path d="' + fill + '" fill="rgba(42,94,78,0.12)" stroke="none"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + colour + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    values.map((v, i) => '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3" fill="' + colour + '"/>').join('') +
    '<text x="' + (px(n - 1) + 6) + '" y="' + (py(values[n - 1]) + 4) + '" font-size="12" fill="' + colour + '" font-weight="600">' +
    esc(values[n - 1] + ' ' + T('days', 'أيام')) + '</text></svg>';
}

/* ── Symptom heatmap, last 90 days ───────────────────────────────── */
function symptomHeatmap() {
  const entries = diaryEntries();
  if (!entries.length) {
    return '<p class="empty">' + esc(T('Log symptoms in your diary to see patterns here.', 'سجّلي الأعراض في يومياتكِ لرؤية الأنماط هنا.')) + '</p>';
  }
  const byDate = {};
  entries.forEach(function(e) { if (e && e.date) (byDate[e.date] = byDate[e.date] || []).push(e); });
  const cells = [];
  let daysWithEntries = 0;
  for (let i = 89; i >= 0; i--) {
    const ds = iso(today() - i * DAY);                 /* local calendar day, same format the diary uses */
    const day = byDate[ds] || [];
    const intensity = !day.length ? 0 : day.some(e => e.impact === 'major') ? 3 : day.some(e => e.impact === 'some') ? 2 : 1;
    if (day.length) daysWithEntries++;
    cells.push({ date: ds, intensity: intensity, count: day.length });
  }
  const colours = ['#eef4ea', '#b5d4a8', '#6aad7c', '#1f4a3c'];
  let html = '<div class="ins-legend"><span>' + esc(T('Less', 'أقل')) + '</span>' +
    colours.map(c => '<span class="ins-swatch" style="background:' + c + '"></span>').join('') +
    '<span>' + esc(T('More', 'أكثر')) + '</span></div>';
  html += '<div class="ins-heat" role="img" aria-label="' + esc(T('Symptom activity over the last 90 days', 'نشاط الأعراض خلال آخر 90 يوماً')) + ': ' +
    esc(daysWithEntries + ' ' + T('days with entries', 'يوماً فيها إدخالات')) + '">';
  for (let w = 0; w < 13; w++) {
    html += '<div class="ins-week">';
    for (let d = 0; d < 7; d++) {
      const c = cells[w * 7 + d];
      if (!c) { html += '<span></span>'; continue; }   /* 13 x 7 = 91 squares, 90 days of data */
      html += '<span title="' + esc(c.date + (c.count ? ' (' + c.count + ' ' + T('entries', 'إدخالات') + ')' : '')) + '" style="background:' + colours[c.intensity] + '"></span>';
    }
    html += '</div>';
  }
  html += '</div><p class="small">' + esc(daysWithEntries + ' ' + T('days with entries in the last 90 days.', 'يوماً فيها إدخالات خلال آخر 90 يوماً.')) + '</p>';
  return html;
}

/* ── Cycle length ────────────────────────────────────────────────── */
function cycleAnalytics() {
  const dates = (Array.isArray(state.cycles) ? state.cycles : []).map(parse).filter(Number.isFinite).sort((a, b) => a - b);
  const gaps = [];
  for (let i = 1; i < dates.length; i++) gaps.push(Math.round((dates[i] - dates[i - 1]) / DAY));
  const lengths = gaps.filter(g => g >= 21 && g <= 60);
  const outside = gaps.filter(g => g < 21 || g > 35).length;     /* usual cycle: 21 to 35 days */

  let html = '<section class="panel spaced"><h2>' + esc(T('Cycle length trend', 'اتجاه طول الدورة')) + '</h2>';
  if (lengths.length >= 2) {
    const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
    const min = Math.min.apply(null, lengths), max = Math.max.apply(null, lengths);
    const regular = (max - min) <= 7;
    html += '<div class="ins-stats">' + [
      [T('Average', 'المتوسط'), avg + ' ' + T('days', 'أيام')],
      [T('Last cycle', 'آخر دورة'), lengths[lengths.length - 1] + ' ' + T('days', 'أيام')],
      [T('Range', 'المدى'), min + '–' + max + ' ' + T('days', 'أيام')],
      [T('Pattern', 'النمط'), regular ? T('Regular', 'منتظمة') : T('Irregular', 'غير منتظمة')]
    ].map(p => '<div class="ins-stat"><strong>' + esc(p[1]) + '</strong><span>' + esc(p[0]) + '</span></div>').join('') + '</div>';
    html += '<div class="ins-sparkwrap">' + sparkline(lengths, { width: 300, height: 52 }) + '</div>';
    html += '<p class="sr">' + esc(T('Cycle lengths: ', 'أطوال الدورة: ') + lengths.join(', ') + ' ' + T('days', 'أيام')) + '</p>';
    if (!regular) {
      html += '<div class="notice caution small">' + esc(T('Your cycle length varies by more than 7 days. This is common but worth discussing with a doctor, especially if you are trying to conceive.',
        'يتفاوت طول دورتكِ بأكثر من 7 أيام. هذا شائع لكن يستحق مناقشته مع طبيبة، خاصةً إذا كنتِ تحاولين الحمل.')) + '</div>';
    }
  } else if (gaps.length) {
    html += '<p class="empty">' + esc(T('Your logged dates are too far apart or too close together to chart.', 'التواريخ المسجّلة متباعدة جداً أو متقاربة جداً بحيث لا يمكن رسمها.')) + '</p>';
  } else {
    html += '<p class="empty">' + esc(T('Log at least 2 cycle start dates in your diary to see your cycle trend.', 'سجّلي تاريخَي بداية دورة على الأقل في يومياتكِ لرؤية اتجاه دورتكِ.')) + '</p>';
  }
  if (outside > 0) {   /* never let a long or short gap pass silently just because it was left out of the chart */
    html += '<div class="notice caution small">' + esc(T('Some gaps between your logged dates are shorter than 21 or longer than 35 days. Cycles usually last 21 to 35 days, so please discuss this with a doctor.',
      'بعض الفترات بين التواريخ المسجّلة أقصر من 21 يوماً أو أطول من 35 يوماً. تستمر الدورة عادةً بين 21 و35 يوماً، لذا ناقشي ذلك مع طبيبة.')) + '</div>';
  }
  return html + '</section>';
}

/* ── Pregnancy progress ──────────────────────────────────────────── */
function pregnancyProgress() {
  const wk0 = insGestWeek();
  if (wk0 === null) {
    return '<section class="panel spaced"><h2>' + esc(T('Pregnancy progress', 'تقدم الحمل')) + '</h2><p class="empty">' +
      esc(T('Enter your due date in the Pregnancy calculator to see your weekly progress.', 'أدخلي تاريخ الولادة في حاسبة الحمل لرؤية تقدمكِ الأسبوعي.')) + '</p></section>';
  }
  const currentWeek = Math.max(1, Math.min(42, wk0));
  const daysLeft = Math.round((parse(state.edd) - today()) / DAY);
  const pct = Math.min(100, Math.max(0, Math.round((currentWeek / 40) * 100)));
  const milestone = FETAL_MILESTONES.reduce((best, m) => Math.abs(m.week - currentWeek) < Math.abs(best.week - currentWeek) ? m : best, FETAL_MILESTONES[0]);
  /* trimesters as the NHS defines them: weeks 1-12, 13-27, 28 onwards */
  const trimester = currentWeek <= 12 ? T('First trimester', 'الثلث الأول') : currentWeek <= 27 ? T('Second trimester', 'الثلث الثاني') : T('Third trimester', 'الثلث الثالث');
  const l = state.lang === 'ar' ? 1 : 0;

  return '<section class="panel spaced"><div class="ins-head"><div><h2>' + esc(T('Week ', 'الأسبوع ') + currentWeek + T(' of your pregnancy', ' من حملكِ')) + '</h2>' +
    '<span class="small">' + esc(trimester) + '</span></div>' +
    '<div class="ins-days"><strong>' + (daysLeft > 0 ? daysLeft : 0) + '</strong><span>' + esc(T('days to go', 'يوماً متبقياً')) + '</span></div></div>' +
    '<div class="ins-bar" role="img" aria-label="' + esc(T('Week ', 'الأسبوع ') + currentWeek + ' / 40 — ' + trimester) + '">' +
      '<div class="ins-bar-fill" style="width:' + pct + '%"></div>' +
      '<span class="ins-bar-mark" style="inset-inline-start:30%"></span><span class="ins-bar-mark" style="inset-inline-start:67.5%"></span></div>' +
    '<div class="ins-bar-labels"><span>T1</span><span>T2</span><span>T3</span></div>' +
    '<div class="ins-fetal"><span class="ins-fetal-icon" aria-hidden="true">🌱</span><div>' +
      '<strong>' + esc(T('Around week ', 'حول الأسبوع ') + milestone.week + ' · ' + milestone.size[l]) + '</strong>' +
      '<p>' + esc(l ? milestone.ar : milestone.en) + '</p></div></div></section>';
}

/* ── Postpartum recovery timeline ────────────────────────────────── */
function postpartumTimeline() {
  const birth = (state.forms && state.forms.birthdate) ? parse(state.forms.birthdate) : NaN;
  if (!Number.isFinite(birth)) {
    return '<section class="panel spaced"><h2>' + esc(T('Recovery timeline', 'جدول التعافي')) + '</h2><p class="empty">' +
      esc(T('Log your birth date in the Pregnancy section to see your recovery timeline.', 'سجّلي تاريخ الولادة في قسم الحمل لرؤية جدول تعافيكِ.')) + '</p></section>';
  }
  const days = Math.max(0, Math.round((today() - birth) / DAY));
  const l = state.lang === 'ar' ? 1 : 0;
  const phases = [
    {days:7,   label:['First week','الأسبوع الأول'],
     en:'Rest, skin-to-skin, feeding rhythm. Some bleeding (lochia) is normal, but heavy bleeding is not: get help straight away.',
     ar:'الراحة، التلامس الجلدي، إيقاع الرضاعة. بعض النزيف (النفاس) طبيعي، لكن النزيف الغزير غير طبيعي: اطلبي المساعدة فوراً.'},
    {days:14,  label:['Weeks 1–2','الأسبوعان 1–2'],
     en:'Healing continues. Baby blues common days 3–5. Check-in visits with your midwife.',
     ar:'التعافي مستمر. كآبة الأيام 3–5 شائعة. زيارات متابعة مع المولّدة.'},
    {days:42,  label:['Weeks 2–6','الأسابيع 2–6'],
     en:'Gradual return to activity. Watch for postnatal depression signs.',
     ar:'عودة تدريجية للنشاط. انتبهي لعلامات اكتئاب ما بعد الولادة.'},
    {days:84,  label:['Weeks 6–12','الأسابيع 6–12'],
     en:'6-week check with a doctor. Pelvic floor exercises. Sleep still disrupted.',
     ar:'الفحص السداسي عند الطبيب. تمارين قاع الحوض. النوم لا يزال متقطعاً.'},
    {days:365, label:['Months 3–12','الأشهر 3–12'],
     en:'Physical recovery largely complete. Emotional adjustment continues.',
     ar:'التعافي الجسدي مكتمل إلى حد بعيد. التكيف العاطفي مستمر.'}
  ];
  const activeIdx = phases.findIndex(p => days < p.days);
  return '<section class="panel spaced"><div class="ins-head"><h2>' + esc(T('Recovery timeline', 'جدول التعافي')) + '</h2>' +
    '<div class="ins-days"><strong>' + Math.floor(days / 7) + '</strong><span>' + esc(T('weeks since birth', 'أسابيع من الولادة')) + '</span></div></div>' +
    phases.map(function(p, i) {
      const done = days >= p.days, active = i === activeIdx;
      return '<div class="ins-phase' + (done ? ' is-done' : '') + (active ? ' is-active' : '') + '"><span class="ins-phase-dot" aria-hidden="true">' + (done ? '✓' : '') + '</span><div><strong>' +
        esc(p.label[l] + (active ? ' ← ' + T('You are here', 'أنتِ هنا') : '')) + '</strong><p>' + esc(l ? p.ar : p.en) + '</p></div></div>';
    }).join('') + '</section>';
}

/* ── The insights page (#insights) ───────────────────────────────── */
function analyticsPage() {
  const stage = state.stage || 'pregnancy';
  const l = state.lang === 'ar' ? 1 : 0;
  let html = head(T('My health insights', 'رؤى صحتي'), T('Patterns and progress from your logged data.', 'الأنماط والتقدم من بياناتكِ المسجّلة.'));

  if (stage === 'pregnancy') html += pregnancyProgress();
  if (stage === 'postpartum' || stage === 'breastfeeding') html += postpartumTimeline();
  if (['fertility', 'prep', 'general', 'contraception', 'perimenopause'].indexOf(stage) >= 0) html += cycleAnalytics();

  const entries = diaryEntries();
  html += '<section class="panel spaced"><h2>' + esc(T('Symptom activity — last 90 days', 'نشاط الأعراض — آخر 90 يوماً')) + '</h2>' + symptomHeatmap();
  if (entries.length) html += '<p class="small"><a href="#diary">' + esc(T('Open diary →', 'افتح اليومية ←')) + '</a></p>';
  html += '</section>';

  if (stage === 'pregnancy') {
    const wk = insGestWeek();
    html += '<details class="panel spaced ins-table"><summary>' + esc(T('Week-by-week fetal development', 'نمو الجنين أسبوعاً بأسبوع')) + '</summary>' +
      FETAL_MILESTONES.map(function(m) {
        const past = wk !== null && m.week < wk, current = wk !== null && Math.abs(m.week - wk) <= 1;
        return '<div class="ins-row' + (past ? ' is-past' : '') + (current ? ' is-current' : '') + '"><span class="ins-row-week">' + esc(T('Wk ', 'أسبوع ') + m.week) +
          '</span><div><small>' + esc(m.size[l]) + '</small><p>' + esc(l ? m.ar : m.en) + '</p></div></div>';
      }).join('') + '</details>';
  }

  if (['pregnancy', 'postpartum', 'breastfeeding', 'fertility', 'prep', 'general', 'contraception', 'perimenopause'].indexOf(stage) < 0) {
    html += '<div class="notice">' + esc(T('Set your life stage on the home page to see personalised insights.', 'حدّدي مرحلتكِ الحياتية في الصفحة الرئيسية لرؤية رؤى مخصصة.')) + '</div>';
  }

  html += '<div class="notice small">' + esc(T(
    'General information based on public NHS and RCOG guidance. Every pregnancy is different, and sizes are only comparisons. Charts use your own logged data only — nothing is sent anywhere.',
    'معلومات عامة مبنية على إرشادات NHS وRCOG المنشورة. كل حمل مختلف، والأحجام مجرد مقارنات. تستخدم الرسوم البيانية بياناتكِ المسجّلة فقط — لا شيء يُرسل إلى أي جهة.')) + '</div>';
  return html;
}
