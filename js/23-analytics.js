/* Women & Families 2026.10.31-r19 | js/23-analytics.js
   Phase 4: Cycle analytics, pregnancy progress & fetal milestones
   - Cycle length trend sparkline (pure SVG, no library)
   - Symptom frequency heatmap (last 3 months)
   - Pregnancy progress bar + week-by-week fetal milestones
   - Postpartum recovery timeline
   - All bilingual en/ar, all data from existing state
   - Accessible: all visuals have text equivalents
   ------------------------------------------------------------------ */
'use strict';

/* ── Fetal milestone data (weeks 4–42) ──────────────────────────── */
/* size: comparison object, en/ar: key development */
const FETAL_MILESTONES = [
  {week:4,  size:T('Poppy seed','بذرة الخشخاش'),
   en:'Heart begins to form. Neural tube developing.',
   ar:'يبدأ تشكّل القلب. يتطور الأنبوب العصبي.'},
  {week:5,  size:T('Sesame seed','بذرة السمسم'),
   en:'Heart beating. Brain and spinal cord forming.',
   ar:'القلب ينبض. يتشكّل الدماغ والنخاع الشوكي.'},
  {week:6,  size:T('Lentil','عدسة'),
   en:'Facial features beginning. Arm and leg buds appear.',
   ar:'تبدأ ملامح الوجه. تظهر بدايات الذراعين والساقين.'},
  {week:7,  size:T('Blueberry','توتة'),
   en:'Brain growing rapidly. Hands and feet forming.',
   ar:'الدماغ ينمو بسرعة. تتشكّل اليدان والقدمان.'},
  {week:8,  size:T('Kidney bean','حبة فول'),
   en:'All major organs present. Fingers beginning.',
   ar:'جميع الأعضاء الرئيسية موجودة. تبدأ الأصابع.'},
  {week:9,  size:T('Grape','عنبة'),
   en:'Baby can move, though you can\'t feel it yet.',
   ar:'يتحرك الجنين لكنكِ لا تشعرين به بعد.'},
  {week:10, size:T('Strawberry','فراولة'),
   en:'Officially a foetus. Vital organs functioning.',
   ar:'يُصبح جنيناً رسمياً. الأعضاء الحيوية تعمل.'},
  {week:12, size:T('Lime','ليمونة'),
   en:'Kidneys working. Reflexes developing.',
   ar:'الكلى تعمل. تتطور ردود الأفعال.'},
  {week:14, size:T('Peach','خوخة'),
   en:'Can make facial expressions. Sucking reflex present.',
   ar:'يمكنه التعبير بوجهه. ظهر نفلس المص.'},
  {week:16, size:T('Avocado','أفوكادو'),
   en:'Eyes moving behind closed lids. Hearing develops.',
   ar:'العيون تتحرك خلف الجفون. يتطور السمع.'},
  {week:18, size:T('Sweet potato','بطاطا حلوة'),
   en:'May suck thumb. Unique fingerprints forming.',
   ar:'قد يمص إبهامه. تتشكّل بصمات الأصابع الفريدة.'},
  {week:20, size:T('Banana','موزة'),
   en:'Halfway point. Can hear your voice.',
   ar:'منتصف الرحلة. يسمع صوتكِ.'},
  {week:22, size:T('Papaya','بابايا'),
   en:'Rapid brain development. Sleep cycles established.',
   ar:'نمو سريع للدماغ. تتأسس دورات النوم.'},
  {week:24, size:T('Corn cob','عرنوس ذرة'),
   en:'Lungs developing. Baby responds to sound and light.',
   ar:'الرئتان تتطوران. يستجيب للصوت والضوء.'},
  {week:26, size:T('Head of lettuce','رأس خس'),
   en:'Eyes open for the first time. Breathing practice begins.',
   ar:'تفتح العينان لأول مرة. يبدأ تمرين التنفس.'},
  {week:28, size:T('Aubergine','باذنجانة'),
   en:'Brain forming grooves. Fat layers building.',
   ar:'يتشكّل الدماغ بتلافيفه. تتراكم طبقات الدهون.'},
  {week:30, size:T('Cabbage','ملفوف'),
   en:'Bone marrow making red blood cells. Lanugo fading.',
   ar:'نخاع العظام يصنع كريات الدم الحمراء. يتلاشى الزغب.'},
  {week:32, size:T('Butternut squash','قرع العسل'),
   en:'Practising breathing and swallowing. Gaining weight rapidly.',
   ar:'يتدرب على التنفس والبلع. يكتسب وزناً بسرعة.'},
  {week:34, size:T('Cantaloupe','شمام'),
   en:'Central nervous system maturing. Most organs ready.',
   ar:'يكتمل الجهاز العصبي المركزي. معظم الأعضاء جاهزة.'},
  {week:36, size:T('Head of romaine','رأس خس روماني'),
   en:'Baby considered early term. Usually head-down by now.',
   ar:'يُعدّ الجنين في بداية المدة. عادةً رأسه للأسفل الآن.'},
  {week:38, size:T('Pumpkin','يقطينة'),
   en:'Full term in two weeks. Lungs and brain fully ready.',
   ar:'المدة الكاملة بعد أسبوعين. الرئتان والدماغ مكتملان.'},
  {week:40, size:T('Small watermelon','بطيخة صغيرة'),
   en:'Full term. Ready to meet the world.',
   ar:'المدة الكاملة. جاهز لمقابلة العالم.'},
  {week:42, size:T('Pumpkin','يقطينة كبيرة'),
   en:'Post-term. Induction of labour will be discussed.',
   ar:'تجاوز المدة. ستناقش تحريض الولادة.'},
];

/* ── SVG sparkline generator ─────────────────────────────────────── */
function sparkline(values, opts) {
  opts = opts || {};
  var w = opts.width  || 200;
  var h = opts.height || 48;
  var colour = opts.colour || 'var(--green)';
  var fillColour = opts.fill || 'rgba(42,94,78,0.12)';
  var dotColour = opts.dot || colour;

  if (!values || values.length < 2) {
    return '<span style="font-size:12px;color:var(--muted)">' +
      T('Not enough data yet','لا توجد بيانات كافية بعد') + '</span>';
  }

  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  var range = max - min || 1;
  var n = values.length;
  var step = w / (n - 1);

  function px(i) { return Math.round(i * step); }
  function py(v) { return Math.round(h - ((v - min) / range) * (h - 8) - 4); }

  // Build polyline points
  var points = values.map(function(v, i) { return px(i) + ',' + py(v); }).join(' ');

  // Build fill path
  var fillPath = 'M' + px(0) + ',' + py(values[0]) + ' ' +
    values.map(function(v, i) { return 'L' + px(i) + ',' + py(v); }).join(' ') +
    ' L' + px(n-1) + ',' + h + ' L' + px(0) + ',' + h + ' Z';

  // Label last value
  var lastPx = px(n - 1);
  var lastPy = py(values[n - 1]);

  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" ' +
    'aria-hidden="true" style="overflow:visible;display:block">' +
    '<path d="' + fillPath + '" fill="' + fillColour + '" stroke="none"/>' +
    '<polyline points="' + points + '" fill="none" stroke="' + colour + '" ' +
      'stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    values.map(function(v, i) {
      return '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="3" fill="' + dotColour + '"/>';
    }).join('') +
    '<text x="' + (lastPx + 6) + '" y="' + (lastPy + 4) + '" ' +
      'font-size="11" fill="' + colour + '" font-weight="600">' +
      values[n-1] + T(' days',' أيام') + '</text>' +
    '</svg>';
}

/* ── Symptom heatmap (last 90 days) ─────────────────────────────── */
function symptomHeatmap() {
  var entries = diaryEntries();
  if (!entries.length) {
    return '<p class="empty">' +
      T('Log symptoms in your diary to see patterns here.',
        'سجّلي الأعراض في يومياتكِ لرؤية الأنماط هنا.') + '</p>';
  }

  // Last 90 days
  var today = new Date();
  var cells = [];
  for (var i = 89; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().slice(0, 10);
    var dayEntries = entries.filter(function(e) { return e.date === dateStr; });
    var intensity = dayEntries.length === 0 ? 0
                  : dayEntries.some(function(e) { return e.impact === 'major'; }) ? 3
                  : dayEntries.some(function(e) { return e.impact === 'some'; })  ? 2
                  : 1;
    cells.push({ date: dateStr, intensity: intensity, count: dayEntries.length });
  }

  // Build grid — 13 weeks × 7 days
  var colours = ['#eef4ea', '#b5d4a8', '#6aad7c', '#2a5e4e'];
  var html = '<div style="margin:12px 0">';
  html += '<div style="display:flex;gap:4px;align-items:center;margin-bottom:8px;font-size:12px;color:var(--muted)">';
  html += '<span>' + T('Less','أقل') + '</span>';
  colours.forEach(function(c) {
    html += '<span style="width:14px;height:14px;background:' + c + ';border-radius:3px;display:inline-block"></span>';
  });
  html += '<span>' + T('More','أكثر') + '</span></div>';

  html += '<div style="display:grid;grid-template-columns:repeat(13,1fr);gap:3px;" role="img" aria-label="' +
    T('Symptom activity over the last 90 days','نشاط الأعراض خلال آخر 90 يوماً') + '">';
  // Group into weeks
  for (var w = 0; w < 13; w++) {
    html += '<div style="display:flex;flex-direction:column;gap:3px">';
    for (var d = 0; d < 7; d++) {
      var idx = w * 7 + d;
      if (idx >= cells.length) { html += '<span></span>'; continue; }
      var cell = cells[idx];
      var bg = colours[cell.intensity];
      var title = cell.date + (cell.count ? ' (' + cell.count + ' ' + T('entries','إدخالات') + ')' : '');
      html += '<span title="' + title + '" style="width:100%;padding-top:100%;border-radius:3px;' +
        'background:' + bg + ';display:block"></span>';
    }
    html += '</div>';
  }
  html += '</div></div>';
  return html;
}

/* ── Cycle analytics panel ───────────────────────────────────────── */
function cycleAnalytics() {
  var cycles = (state.cycles || []).slice().sort();
  var lengths = [];
  for (var i = 1; i < cycles.length; i++) {
    var diff = Math.round((new Date(cycles[i]) - new Date(cycles[i-1])) / 86400000);
    if (diff >= 21 && diff <= 60) lengths.push(diff);
  }

  var html = '<div class="panel" style="margin-bottom:20px">';
  html += '<h3 style="margin-bottom:16px">' +
    T('Cycle length trend','اتجاه طول الدورة') + '</h3>';

  if (lengths.length >= 2) {
    var avg = Math.round(lengths.reduce(function(a,b){return a+b;},0) / lengths.length);
    var min = Math.min.apply(null, lengths);
    var max = Math.max.apply(null, lengths);
    var last = lengths[lengths.length - 1];
    var regular = (max - min) <= 7;

    // Stats row
    html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">';
    [
      [T('Average','المتوسط'), avg + T(' days',' أيام')],
      [T('Last cycle','آخر دورة'),  last + T(' days',' أيام')],
      [T('Range','المدى'), min + '–' + max + T(' days',' أيام')],
      [T('Pattern','النمط'), regular ? T('Regular','منتظمة') : T('Irregular','غير منتظمة')]
    ].forEach(function(pair) {
      html += '<div style="text-align:center;padding:12px 8px;background:var(--soft);border-radius:var(--r-md)">' +
        '<span style="display:block;font-size:22px;font-weight:700;color:var(--green)">' + pair[1] + '</span>' +
        '<span style="font-size:12px;color:var(--muted)">' + pair[0] + '</span>' +
        '</div>';
    });
    html += '</div>';

    // Sparkline
    html += '<div style="margin-bottom:8px">' +
      sparkline(lengths, {width:280, height:52}) + '</div>';

    // Screen-reader text fallback
    html += '<p class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">' +
      T('Cycle lengths: ','أطوال الدورة: ') + lengths.join(', ') + T(' days','أيام') + '</p>';

    // Regularity note
    if (!regular) {
      html += '<div class="notice caution" style="font-size:13px;margin-top:12px">' +
        T('Your cycle varies by more than 7 days. This is common but worth discussing with your GP, especially if you are trying to conceive.',
          'تتفاوت دورتكِ بأكثر من 7 أيام. هذا شائع لكن يستحق مناقشته مع طبيبتكِ، خاصةً إذا كنتِ تحاولين الحمل.') +
      '</div>';
    }
  } else {
    html += '<p class="empty" style="font-size:14px">' +
      T('Log at least 2 cycle start dates in your diary to see your cycle trend.',
        'سجّلي تاريخَي بداية دورة على الأقل في يومياتكِ لرؤية اتجاه دورتكِ.') + '</p>';
  }

  html += '</div>';
  return html;
}

/* ── Pregnancy progress bar + milestone ─────────────────────────── */
function pregnancyProgress() {
  if (!state.edd) {
    return '<div class="panel" style="margin-bottom:20px">' +
      '<h3>' + T('Pregnancy progress','تقدم الحمل') + '</h3>' +
      '<p class="empty" style="font-size:14px">' +
      T('Enter your due date in the Pregnancy calculator to see your weekly progress.',
        'أدخلي تاريخ الولادة في حاسبة الحمل لرؤية تقدمكِ الأسبوعي.') +
      '</p></div>';
  }

  var today = new Date(); today.setHours(0,0,0,0);
  var edd = new Date(state.edd); edd.setHours(0,0,0,0);
  var daysLeft = Math.round((edd - today) / 86400000);
  var currentWeek = Math.max(1, Math.min(42, Math.round((280 - daysLeft) / 7)));
  var pct = Math.min(100, Math.max(0, Math.round((currentWeek / 40) * 100)));

  // Find milestone for current week (nearest)
  var milestone = FETAL_MILESTONES.reduce(function(best, m) {
    return Math.abs(m.week - currentWeek) < Math.abs(best.week - currentWeek) ? m : best;
  }, FETAL_MILESTONES[0]);

  // Trimester
  var trimester = currentWeek <= 12 ? T('First trimester','الثلث الأول')
                : currentWeek <= 26 ? T('Second trimester','الثلث الثاني')
                : T('Third trimester','الثلث الثالث');

  var html = '<div class="panel" style="margin-bottom:20px">';
  html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">';
  html += '<div><h3 style="margin:0 0 4px">' +
    T('Week ','الأسبوع ') + currentWeek + T(' of your pregnancy',' من حملكِ') + '</h3>' +
    '<span style="font-size:13px;color:var(--muted)">' + trimester + '</span></div>';
  html += '<div style="text-align:center;padding:10px 14px;background:var(--green);color:#fff;border-radius:var(--r-md)">' +
    '<span style="display:block;font-size:20px;font-weight:700">' +
    (daysLeft > 0 ? daysLeft : 0) + '</span>' +
    '<span style="font-size:11px;opacity:.88">' + T('days to go','يوم متبقٍ') + '</span>' +
    '</div>';
  html += '</div>';

  // Progress bar — divided into 3 trimesters
  html += '<div style="margin-bottom:20px">' +
    '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:4px">' +
    '<span>' + T('Week 1','الأسبوع 1') + '</span><span>' + T('Week 40','الأسبوع 40') + '</span></div>' +
    '<div style="height:10px;background:#dde8d9;border-radius:8px;overflow:hidden;position:relative">' +
    '<div style="height:100%;width:' + pct + '%;' +
      'background:linear-gradient(90deg,#6b8f71,#2a5e4e);' +
      'border-radius:8px;transition:width .4s ease"></div>' +
    // Trimester markers
    '<div style="position:absolute;top:0;left:30%;width:1px;height:100%;background:rgba(255,255,255,.5)"></div>' +
    '<div style="position:absolute;top:0;left:65%;width:1px;height:100%;background:rgba(255,255,255,.5)"></div>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:3px">' +
    '<span>T1</span><span style="margin-left:25%">T2</span><span>T3</span>' +
    '</div></div>';

  // Fetal milestone card
  html += '<div style="background:linear-gradient(135deg,var(--soft),#e8f4e0);' +
    'border-radius:var(--r-lg);padding:16px;display:flex;gap:14px;align-items:flex-start">' +
    '<div style="font-size:36px;flex-shrink:0" aria-hidden="true">🫘</div>' +
    '<div>' +
    '<div style="font-size:11px;font-weight:700;color:var(--green);letter-spacing:.08em;' +
      'text-transform:uppercase;margin-bottom:4px">' +
      T('Around week ','حول الأسبوع ') + milestone.week + ' · ' + milestone.size + '</div>' +
    '<p style="font-size:14px;line-height:1.6;margin:0;color:var(--ink)">' +
      T(milestone.en, milestone.ar) + '</p>' +
    '</div></div>';

  html += '</div>';
  return html;
}

/* ── Postpartum recovery timeline ────────────────────────────────── */
function postpartumTimeline() {
  if (!state.forms || !state.forms.birthdate) {
    return '<div class="panel" style="margin-bottom:20px">' +
      '<h3>' + T('Recovery timeline','جدول التعافي') + '</h3>' +
      '<p class="empty" style="font-size:14px">' +
      T('Log your birth date in the Pregnancy section to see your recovery timeline.',
        'سجّلي تاريخ الولادة في قسم الحمل لرؤية جدول تعافيكِ.') +
      '</p></div>';
  }

  var today = new Date(); today.setHours(0,0,0,0);
  var birth = new Date(state.forms.birthdate); birth.setHours(0,0,0,0);
  var daysPostpartum = Math.max(0, Math.round((today - birth) / 86400000));
  var weeksPostpartum = Math.floor(daysPostpartum / 7);

  var phases = [
    {days:7,   label:T('First week','الأسبوع الأول'),
     en:'Rest, skin-to-skin, feeding rhythm. Bleeding (lochia) normal.',
     ar:'الراحة، التلامس الجلدي، إيقاع الرضاعة. النزيف (النفاس) طبيعي.'},
    {days:14,  label:T('Weeks 1–2','الأسبوعان 1–2'),
     en:'Healing continues. Baby blues common days 3–5. Midwife visits.',
     ar:'التعافي مستمر. كآبة الأيام 3–5 شائعة. زيارات المولّدة.'},
    {days:42,  label:T('Weeks 2–6','الأسابيع 2–6'),
     en:'Gradual return to activity. Watch for postnatal depression signs.',
     ar:'عودة تدريجية للنشاط. انتبهي لعلامات اكتئاب ما بعد الولادة.'},
    {days:84,  label:T('Weeks 6–12','الأسابيع 6–12'),
     en:'6-week GP check. Pelvic floor exercises. Sleep still disrupted.',
     ar:'الفحص السداسي عند الطبيب. تمارين قاع الحوض. النوم لا يزال متقطعاً.'},
    {days:365, label:T('Months 3–12','الأشهر 3–12'),
     en:'Physical recovery largely complete. Emotional adjustment continues.',
     ar:'التعافي الجسدي مكتمل إلى حد بعيد. التكيف العاطفي مستمر.'},
  ];

  var html = '<div class="panel" style="margin-bottom:20px">';
  html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
  html += '<h3 style="margin:0">' + T('Recovery timeline','جدول التعافي') + '</h3>';
  html += '<div style="text-align:center;padding:8px 14px;background:var(--soft);border-radius:var(--r-md)">' +
    '<span style="display:block;font-size:20px;font-weight:700;color:var(--green)">' + weeksPostpartum + '</span>' +
    '<span style="font-size:11px;color:var(--muted)">' + T('weeks since birth','أسابيع من الولادة') + '</span>' +
    '</div>';
  html += '</div>';

  html += '<div style="position:relative">';
  phases.forEach(function(phase) {
    var done = daysPostpartum >= phase.days;
    var current = !done && (daysPostpartum < phase.days);
    var isActive = phases.findIndex(function(p) { return daysPostpartum < p.days; }) === phases.indexOf(phase);
    html += '<div style="display:flex;gap:14px;padding:12px 0;' +
      'border-bottom:1px solid var(--line);opacity:' + (done ? '0.5' : '1') + '">' +
      '<div style="flex-shrink:0;width:24px;height:24px;border-radius:50%;margin-top:2px;' +
        'background:' + (done ? 'var(--green)' : isActive ? '#d35400' : 'var(--line)') + ';' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:#fff;font-size:12px;font-weight:700">' +
        (done ? '✓' : '') + '</div>' +
      '<div>' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:3px;' +
          'color:' + (isActive ? '#d35400' : 'var(--ink)') + '">' +
          phase.label + (isActive ? ' ← ' + T('You are here','أنتِ هنا') : '') + '</div>' +
        '<div style="font-size:13px;color:var(--muted);line-height:1.55">' +
          T(phase.en, phase.ar) + '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  html += '</div>';
  return html;
}

/* ── Main analytics page ─────────────────────────────────────────── */
function analyticsPage() {
  var stage = state.stage || 'pregnancy';

  var title = T('My health insights','رؤى صحتي');
  var subtitle = T('Patterns and progress from your logged data.',
                   'الأنماط والتقدم من بياناتكِ المسجّلة.');

  var content = head(title, subtitle);

  // Pregnancy: show progress bar + milestone
  if (stage === 'pregnancy') {
    content += pregnancyProgress();
  }

  // Postpartum: show recovery timeline
  if (stage === 'postpartum' || stage === 'breastfeeding') {
    content += postpartumTimeline();
  }

  // Cycle analytics: show for cycle-tracking stages
  if (['fertility', 'prep', 'general', 'contraception'].includes(stage) ||
      stage === 'perimenopause') {
    content += cycleAnalytics();
  }

  // Symptom heatmap: shown for all stages if diary data exists
  var entries = diaryEntries();
  content += '<div class="panel" style="margin-bottom:20px">';
  content += '<h3 style="margin-bottom:12px">' +
    T('Symptom activity — last 90 days','نشاط الأعراض — آخر 90 يوماً') + '</h3>';
  content += symptomHeatmap();
  if (entries.length) {
    content += '<p style="font-size:12px;color:var(--muted);margin-top:10px">' +
      entries.length + ' ' + T('diary entries total.','إدخال في المجموع.') +
      ' <a href="#diary" style="color:var(--green)">' +
      T('Open diary →','افتح اليومية ←') + '</a></p>';
  }
  content += '</div>';

  // Week-by-week fetal milestone table (pregnancy only)
  if (stage === 'pregnancy') {
    content += '<details style="margin-bottom:20px">';
    content += '<summary style="font-weight:600;font-size:15px;padding:14px 0">' +
      T('Week-by-week fetal development','نمو الجنين أسبوعاً بأسبوع') + '</summary>';
    content += '<div style="margin-top:12px">';
    var today2 = new Date(); today2.setHours(0,0,0,0);
    var edd2 = state.edd ? new Date(state.edd) : null;
    if (edd2) edd2.setHours(0,0,0,0);
    FETAL_MILESTONES.forEach(function(m) {
      var currentWeek2 = edd2
        ? Math.round((280 - Math.round((edd2-today2)/86400000)) / 7) : 0;
      var isPast = m.week < currentWeek2;
      var isCurrent = Math.abs(m.week - currentWeek2) <= 1;
      content += '<div style="display:flex;gap:12px;padding:12px 0;' +
        'border-bottom:1px solid var(--line);' +
        'opacity:' + (isPast ? '0.5' : '1') + ';' +
        'background:' + (isCurrent ? 'var(--soft)' : 'transparent') + ';' +
        'border-radius:' + (isCurrent ? 'var(--r-sm)' : '0') + ';' +
        'padding-inline:' + (isCurrent ? '10px' : '0') + '">' +
        '<span style="font-size:12px;font-weight:700;width:40px;flex-shrink:0;' +
          'padding-top:3px;color:' + (isCurrent ? 'var(--green)' : 'var(--muted)') + '">' +
          T('Wk ','أسبوع ') + m.week + '</span>' +
        '<div>' +
          '<div style="font-size:12px;color:var(--muted);margin-bottom:3px">' + m.size + '</div>' +
          '<div style="font-size:14px;line-height:1.55">' + T(m.en, m.ar) + '</div>' +
        '</div>' +
        '</div>';
    });
    content += '</div></details>';
  }

  // Empty state for stages with no specific data
  if (!['pregnancy','postpartum','breastfeeding','fertility','prep',
        'general','contraception','perimenopause'].includes(stage)) {
    content += '<div class="notice" style="margin-top:16px">' +
      T('Set your life stage on the home page to see personalised insights.',
        'حدّدي مرحلتكِ الحياتية في الصفحة الرئيسية لرؤية رؤى مخصصة.') +
      '</div>';
  }

  // Source note
  content += '<div class="source" style="margin-top:16px">' +
    T('Fetal development data: NHS, RCOG. Charts use your own logged data only — nothing is sent externally.',
      'بيانات نمو الجنين: NHS وRCOG. الرسوم البيانية تستخدم بياناتكِ المسجّلة فقط — لا شيء يُرسل خارجياً.') +
  '</div>';

  return content;
}
