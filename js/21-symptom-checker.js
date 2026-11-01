/* Women & Families 2026.10.31-r19 | js/21-symptom-checker.js
   Phase 2: Enhanced interactive symptom checker
   - Multi-step stage-aware questioning
   - Green / amber / red severity triage mapped to RCOG/NICE
   - Bilingual (en/ar) throughout
   - Classic script: shares global scope. Loaded after 20-search.js.
   ------------------------------------------------------------------ */
'use strict';

/* ── Severity levels ─────────────────────────────────────────────── */
const SEV = {
  RED:   'red',
  AMBER: 'amber',
  GREEN: 'green'
};

/* ── Symptom database ────────────────────────────────────────────── */
/* Each entry: id, enLabel, arLabel, stages[], severity, guidance{en,ar}, action{en,ar} */
const SYMPTOMS = [
  /* ── RED: seek emergency help now ──────────────────────────────── */
  {id:'heavy-bleed',    sev:SEV.RED,
   en:'Heavy bleeding — soaking a pad in under an hour',
   ar:'نزيف غزير — يبلل الفوطة الصحية خلال أقل من ساعة',
   stages:['pregnant','breastfeeding','postpartum','planning','fertility','general'],
   guidance:{
     en:'Heavy bleeding in pregnancy or after birth can be a serious emergency. Go to A&E or call 999 immediately.',
     ar:'النزيف الغزير أثناء الحمل أو بعد الولادة قد يكون حالة طارئة خطيرة. توجّهي إلى الطوارئ أو اتصلي بالإسعاف فوراً.'},
   action:{en:'Call 999 or go to A&E now',ar:'اتصلي بـ 999 أو اذهبي للطوارئ الآن'}},

  {id:'chest-pain',     sev:SEV.RED,
   en:'Chest pain or difficulty breathing',
   ar:'ألم في الصدر أو صعوبة في التنفس',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Chest pain or breathlessness in pregnancy or postpartum can indicate a serious condition such as a pulmonary embolism. Seek emergency care immediately.',
     ar:'ألم الصدر أو ضيق التنفس أثناء الحمل أو بعده قد يشير إلى حالة خطيرة كانسداد رئوي. اطلبي الرعاية الطارئة فوراً.'},
   action:{en:'Call 999 or go to A&E now',ar:'اتصلي بـ 999 أو اذهبي للطوارئ الآن'}},

  {id:'fits',           sev:SEV.RED,
   en:'Fits, seizures, or loss of consciousness',
   ar:'تشنجات أو فقدان الوعي',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Seizures in pregnancy may indicate eclampsia, a life-threatening emergency. Call 999 immediately.',
     ar:'التشنجات أثناء الحمل قد تشير إلى تسمم الحمل التشنجي (إيكلامبسيا) وهو طارئ مهدد للحياة. اتصلي بـ 999 فوراً.'},
   action:{en:'Call 999 immediately',ar:'اتصلي بـ 999 فوراً'}},

  {id:'severe-headache',sev:SEV.RED,
   en:'Sudden severe headache with vision changes or swelling',
   ar:'صداع شديد مفاجئ مع اضطراب الرؤية أو التورم',
   stages:['pregnant','postpartum'],
   guidance:{
     en:'A sudden severe headache with visual disturbance or facial/hand swelling in pregnancy or postpartum may indicate pre-eclampsia. Seek emergency help now.',
     ar:'الصداع الشديد المفاجئ مع اضطراب الرؤية أو تورم الوجه واليدين في الحمل أو بعده قد يشير إلى تسمم الحمل. اطلبي المساعدة الطارئة الآن.'},
   action:{en:'Call 999 or go to A&E now',ar:'اتصلي بـ 999 أو اذهبي للطوارئ الآن'}},

  {id:'no-movement',    sev:SEV.RED,
   en:'No fetal movements felt after 28 weeks',
   ar:'عدم الإحساس بحركة الجنين بعد الأسبوع 28',
   stages:['pregnant'],
   guidance:{
     en:'Reduced or absent fetal movement after 28 weeks should always be assessed same day. Do not wait until your next appointment.',
     ar:'يجب تقييم تراجع أو غياب حركة الجنين بعد الأسبوع 28 في نفس اليوم. لا تنتظري حتى موعدك القادم.'},
   action:{en:'Call your midwife or maternity unit now',ar:'اتصلي بمولّدتكِ أو وحدة الولادة الآن'}},

  {id:'waters-early',   sev:SEV.RED,
   en:'Waters breaking before 37 weeks',
   ar:'انقباض أو تسرب السائل الأمنيوسي قبل الأسبوع 37',
   stages:['pregnant'],
   guidance:{
     en:'If your membranes rupture before 37 weeks (preterm prelabour rupture of membranes), go to the maternity unit immediately.',
     ar:'إذا انكسر كيس الماء قبل الأسبوع 37، توجّهي إلى وحدة الولادة فوراً.'},
   action:{en:'Go to the maternity unit now',ar:'توجّهي لوحدة الولادة فوراً'}},

  /* ── AMBER: contact your midwife/GP today ───────────────────────── */
  {id:'high-temp',      sev:SEV.AMBER,
   en:'Fever over 38°C (100.4°F)',
   ar:'ارتفاع الحرارة فوق 38 درجة مئوية',
   stages:['pregnant','breastfeeding','postpartum','general'],
   guidance:{
     en:'A fever in pregnancy or after birth needs same-day assessment. It may indicate infection. Contact your midwife, GP, or 111.',
     ar:'الحمى أثناء الحمل أو بعد الولادة تستدعي تقييماً في نفس اليوم وقد تشير إلى عدوى. تواصلي مع مولّدتكِ أو طبيبتكِ.'},
   action:{en:'Contact your midwife, GP, or call 111',ar:'تواصلي مع مولّدتكِ أو طبيبتكِ أو اتصلي بـ 111'}},

  {id:'painful-urination',sev:SEV.AMBER,
   en:'Burning or pain when urinating',
   ar:'حرقة أو ألم عند التبول',
   stages:['pregnant','general','planning','fertility'],
   guidance:{
     en:'A urinary tract infection in pregnancy needs prompt treatment to prevent it spreading to the kidneys. Contact your GP or midwife today.',
     ar:'عدوى المسالك البولية أثناء الحمل تحتاج علاجاً سريعاً لمنع انتشارها للكلى. تواصلي مع طبيبتكِ أو مولّدتكِ اليوم.'},
   action:{en:'Contact your GP or midwife today',ar:'تواصلي مع طبيبتكِ أو مولّدتكِ اليوم'}},

  {id:'reduced-movement',sev:SEV.AMBER,
   en:'Baby moving less than usual (under 28 weeks)',
   ar:'تراجع حركة الجنين (قبل الأسبوع 28)',
   stages:['pregnant'],
   guidance:{
     en:'Any concern about fetal movement should be reported to your midwife or maternity unit. Do not wait.',
     ar:'أي قلق بشأن حركة الجنين يجب إبلاغ مولّدتكِ أو وحدة الولادة به. لا تنتظري.'},
   action:{en:'Contact your midwife or maternity unit',ar:'تواصلي مع مولّدتكِ أو وحدة الولادة'}},

  {id:'pv-discharge',   sev:SEV.AMBER,
   en:'Unusual vaginal discharge — smelly, coloured, or itchy',
   ar:'إفرازات مهبلية غير عادية — ذات رائحة أو لون أو حكة',
   stages:['pregnant','general','planning','fertility'],
   guidance:{
     en:'Changes in vaginal discharge may indicate infection, including sexually transmitted infections, which can affect pregnancy. Your GP or sexual health clinic can arrange tests.',
     ar:'تغير الإفرازات المهبلية قد يشير إلى عدوى بما فيها الأمراض المنقولة جنسياً التي تؤثر على الحمل. يمكن لطبيبتكِ إجراء الفحوصات.'},
   action:{en:'Contact your GP or sexual health clinic',ar:'تواصلي مع طبيبتكِ أو عيادة الصحة الجنسية'}},

  {id:'mood-low',       sev:SEV.AMBER,
   en:'Persistent low mood, anxiety, or feeling unable to cope',
   ar:'مزاج منخفض مستمر أو قلق أو شعور بعدم القدرة على التحمل',
   stages:['postpartum','pregnant','general'],
   guidance:{
     en:'Postnatal depression and perinatal anxiety are common and treatable. You deserve support. Speak to your GP, midwife, or health visitor as soon as possible.',
     ar:'الاكتئاب بعد الولادة والقلق المحيط بالولادة شائعان وقابلان للعلاج. تستحقين الدعم. تحدثي مع طبيبتكِ أو مولّدتكِ في أقرب وقت.'},
   action:{en:'Speak to your GP or midwife',ar:'تحدثي مع طبيبتكِ أو مولّدتكِ'}},

  {id:'swollen-leg',    sev:SEV.AMBER,
   en:'One leg swollen, red, or painful',
   ar:'تورم أو احمرار أو ألم في ساق واحدة',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Swelling or pain in one leg can be a sign of deep vein thrombosis (DVT), which is more common in pregnancy. Seek same-day assessment.',
     ar:'تورم أو ألم في ساق واحدة قد يشير إلى تجلط الأوردة العميقة وهو أكثر شيوعاً في الحمل. اطلبي التقييم في نفس اليوم.'},
   action:{en:'Contact your GP or go to urgent care today',ar:'تواصلي مع طبيبتكِ أو اذهبي لعيادة الطوارئ اليوم'}},

  {id:'period-pain-severe',sev:SEV.AMBER,
   en:'Severe period pain not relieved by usual painkillers',
   ar:'آلام دورة شهرية شديدة لا تستجيب للمسكنات العادية',
   stages:['general','planning','fertility'],
   guidance:{
     en:'Severe dysmenorrhoea may indicate endometriosis or another underlying condition. A GP can refer you for investigation.',
     ar:'آلام الدورة الشديدة قد تشير إلى بطانة الرحم المهاجرة أو حالة أخرى كامنة. يمكن لطبيبتكِ إحالتكِ للفحص.'},
   action:{en:'Book an appointment with your GP',ar:'احجزي موعداً مع طبيبتكِ'}},

  {id:'irregular-periods',sev:SEV.AMBER,
   en:'Periods that have become very irregular or have stopped',
   ar:'دورات شهرية صارت غير منتظمة جداً أو توقفت',
   stages:['general','planning','fertility'],
   guidance:{
     en:'Irregular or absent periods can have many causes, including PCOS, thyroid conditions, and stress. A GP can arrange a blood test.',
     ar:'عدم انتظام الدورة أو توقفها له أسباب عديدة منها تكيس المبايض ومشاكل الغدة الدرقية والتوتر. يمكن لطبيبتكِ طلب فحص دم.'},
   action:{en:'Book an appointment with your GP',ar:'احجزي موعداً مع طبيبتكِ'}},

  /* ── GREEN: self-care with monitoring ───────────────────────────── */
  {id:'nausea',         sev:SEV.GREEN,
   en:'Nausea and vomiting (morning sickness)',
   ar:'الغثيان والقيء (غثيان الصباح)',
   stages:['pregnant','planning'],
   guidance:{
     en:'Mild to moderate nausea is very common in early pregnancy. Small frequent meals, ginger, and rest can help. If you cannot keep fluids down for 24 hours, contact your midwife.',
     ar:'الغثيان المعتدل شائع جداً في بداية الحمل. الوجبات الصغيرة المتكررة والزنجبيل والراحة تساعد. إذا لم تستطيعي الاحتفاظ بالسوائل لـ 24 ساعة، تواصلي مع مولّدتكِ.'},
   action:{en:'Self-care — contact midwife if symptoms worsen',ar:'رعاية ذاتية — تواصلي مع المولّدة إذا تفاقمت الأعراض'}},

  {id:'back-pain',      sev:SEV.GREEN,
   en:'Mild to moderate back pain',
   ar:'ألم ظهر خفيف إلى متوسط',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Pelvic girdle pain and lower back pain are very common in pregnancy. Gentle exercise, correct posture, and physiotherapy can help. Mention it at your next appointment.',
     ar:'ألم حزام الحوض وآلام أسفل الظهر شائعة جداً في الحمل. التمارين الخفيفة والوضعية الصحيحة والعلاج الطبيعي يساعدون. اذكريها في موعدك القادم.'},
   action:{en:'Mention at your next appointment',ar:'اذكريها في موعدك القادم'}},

  {id:'fatigue',        sev:SEV.GREEN,
   en:'Tiredness and fatigue',
   ar:'التعب والإرهاق',
   stages:['pregnant','postpartum','breastfeeding','general'],
   guidance:{
     en:'Fatigue is normal in pregnancy and postpartum. Rest when you can, accept help, and stay hydrated. If fatigue is severe or accompanied by breathlessness, see your GP.',
     ar:'التعب طبيعي في الحمل وما بعد الولادة. ارتاحي عندما تستطيعين واقبلي المساعدة وحافظي على الترطيب. إذا كان التعب شديداً أو مصحوباً بضيق تنفس، راجعي طبيبتكِ.'},
   action:{en:'Rest and self-care',ar:'الراحة والرعاية الذاتية'}},

  {id:'heartburn',      sev:SEV.GREEN,
   en:'Heartburn and indigestion',
   ar:'حرقة المعدة وعسر الهضم',
   stages:['pregnant','general'],
   guidance:{
     en:'Heartburn is very common in pregnancy due to hormonal changes. Eat small meals, avoid lying down after eating, and ask your pharmacist about safe antacids.',
     ar:'حرقة المعدة شائعة جداً في الحمل بسبب التغيرات الهرمونية. تناولي وجبات صغيرة وتجنبي الاستلقاء بعد الأكل واسألي الصيدلاني عن مضادات الحموضة الآمنة.'},
   action:{en:'Self-care — ask your pharmacist',ar:'رعاية ذاتية — اسألي الصيدلاني'}},

  {id:'constipation',   sev:SEV.GREEN,
   en:'Constipation',
   ar:'الإمساك',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Constipation is very common in pregnancy. Increase fibre, drink more water, and stay active. Speak to your pharmacist about safe laxatives if it persists.',
     ar:'الإمساك شائع جداً في الحمل. زيدي الألياف والماء وابقي نشيطة. تحدثي مع الصيدلاني عن ملينات آمنة إذا استمر.'},
   action:{en:'Self-care and dietary changes',ar:'رعاية ذاتية وتغيير النظام الغذائي'}},

  {id:'breast-changes', sev:SEV.GREEN,
   en:'Breast tenderness or changes',
   ar:'حساسية الثدي أو تغيراته',
   stages:['pregnant','breastfeeding','general','planning'],
   guidance:{
     en:'Breast tenderness is normal in early pregnancy. Any new lump, dimpling, nipple inversion, or skin change should always be checked by a GP.',
     ar:'حساسية الثدي طبيعية في بداية الحمل. أي كتلة جديدة أو تجعد أو انقلاب الحلمة أو تغير في الجلد يجب دائماً فحصه من قِبل طبيبتكِ.'},
   action:{en:'Mention at next appointment — see GP for lumps',ar:'اذكريها في موعدك — راجعي الطبيبة للكتل'}},

  {id:'pelvic-floor',   sev:SEV.GREEN,
   en:'Leaking urine or pelvic floor weakness',
   ar:'تسرب البول أو ضعف عضلات قاع الحوض',
   stages:['postpartum','pregnant','general'],
   guidance:{
     en:'Stress urinary incontinence is very common after childbirth. Pelvic floor exercises (Kegels) can significantly improve symptoms. Ask your midwife or GP for a referral to physiotherapy.',
     ar:'سلس البول الجهدي شائع جداً بعد الولادة. تمارين قاع الحوض تحسّن الأعراض بشكل ملحوظ. اطلبي من مولّدتكِ أو طبيبتكِ إحالتكِ للعلاج الطبيعي.'},
   action:{en:'Start pelvic floor exercises — ask for physiotherapy',ar:'ابدئي تمارين قاع الحوض — اطلبي الإحالة للعلاج الطبيعي'}}
];

/* ── Stage map: wizard stages → checker stage keys ──────────────── */
const STAGE_KEYS = {
  pregnancy:     'pregnant',
  postpartum:    'postpartum',
  breastfeeding: 'breastfeeding',
  fertility:     'fertility',
  prep:          'planning',
  perimenopause: 'general',
  contraception: 'general',
  cycle:         'general',
  general:       'general'
};

/* ── Helper: translate ───────────────────────────────────────────── */
function scT(en, ar) {
  return (typeof T === 'function') ? T(en, ar) : en;
}

/* ── Badge HTML ──────────────────────────────────────────────────── */
function sevBadge(sev) {
  const cfg = {
    red:   {bg:'#c0392b', label:scT('Seek emergency help now','اطلبي المساعدة الطارئة الآن')},
    amber: {bg:'#d35400', label:scT('Contact your doctor today','تواصلي مع طبيبتكِ اليوم')},
    green: {bg:'#27ae60', label:scT('Self-care with monitoring','رعاية ذاتية مع المتابعة')}
  };
  const c = cfg[sev] || cfg.green;
  return '<span style="display:inline-block;background:' + c.bg +
    ';color:#fff;font-size:12px;font-weight:700;padding:4px 12px;' +
    'border-radius:20px;letter-spacing:.04em;margin-bottom:12px;">' +
    c.label + '</span>';
}

/* ── Main symptom checker render ─────────────────────────────────── */
function symptomChecker() {
  const stageKey = STAGE_KEYS[state.stage] || 'general';

  // Filtered symptoms for this stage
  const stageSymptoms = SYMPTOMS.filter(s =>
    s.stages.includes(stageKey) || s.stages.includes('general')
  );

  const redSymptoms   = stageSymptoms.filter(s => s.sev === SEV.RED);
  const amberSymptoms = stageSymptoms.filter(s => s.sev === SEV.AMBER);
  const greenSymptoms = stageSymptoms.filter(s => s.sev === SEV.GREEN);

  const stageLabel = {
    pregnant:     scT('Pregnancy','الحمل'),
    postpartum:   scT('After birth','بعد الولادة'),
    breastfeeding:scT('Breastfeeding','الرضاعة'),
    fertility:    scT('Trying to conceive','الاستعداد للإنجاب'),
    planning:     scT('Planning pregnancy','التخطيط للحمل'),
    general:      scT('General health','الصحة العامة')
  }[stageKey] || scT('General health','الصحة العامة');

  function symptomRows(list) {
    return list.map(s =>
      '<div class="sc-symptom" data-sc-id="' + s.id + '" ' +
      'style="border:1px solid var(--line);border-radius:var(--r-md);' +
      'padding:14px 16px;margin-bottom:10px;cursor:pointer;' +
      'transition:box-shadow .15s ease,background .15s ease;" ' +
      'role="button" tabindex="0" ' +
      'aria-expanded="false" ' +
      'onmouseenter="this.style.background=\'var(--soft)\'" ' +
      'onmouseleave="this.style.background=\'\'">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">' +
      '<span style="font-size:15px;font-weight:500;">' + scT(s.en, s.ar) + '</span>' +
      '<span class="sc-chevron" style="font-size:18px;color:var(--muted);flex-shrink:0;' +
      'transition:transform .15s ease;">›</span>' +
      '</div>' +
      '<div class="sc-detail" hidden style="margin-top:12px;padding-top:12px;' +
      'border-top:1px solid var(--line);">' +
      sevBadge(s.sev) +
      '<p style="font-size:14px;color:var(--ink);line-height:1.65;margin:8px 0;">' +
        scT(s.guidance.en, s.guidance.ar) + '</p>' +
      '<a href="#urgent" style="display:inline-block;background:' +
        (s.sev === SEV.RED ? '#c0392b' : s.sev === SEV.AMBER ? '#d35400' : 'var(--green)') +
        ';color:#fff;padding:9px 16px;border-radius:24px;font-size:13px;' +
        'font-weight:600;text-decoration:none;margin-top:4px;">' +
        scT(s.action.en, s.action.ar) + '</a>' +
      '</div>' +
      '</div>'
    ).join('');
  }

  return '<div>' +
    // Clinical disclaimer
    '<div class="notice caution" style="margin-bottom:20px;">' +
      '<strong>' + scT('This is a general reference tool, not a personal diagnosis.',
        'هذه أداة مرجعية عامة وليست تشخيصاً شخصياً.') + '</strong> ' +
      scT('If you are unwell, always call your midwife, GP, or 111. For emergencies call 999.',
          'إذا كنتِ تشعرين بتوعك، اتصلي بمولّدتكِ أو طبيبتكِ أو 111. للطوارئ اتصلي بـ 999.') +
    '</div>' +

    // Stage pill
    '<div style="margin-bottom:20px;">' +
      '<span style="font-size:12px;background:var(--green);color:#fff;' +
        'padding:4px 12px;border-radius:16px;font-weight:600;">' +
        scT('Showing for: ','تظهر لـ: ') + stageLabel +
      '</span> ' +
      '<a href="#home" style="font-size:13px;color:var(--green);">' +
        scT('Change stage','تغيير المرحلة') + '</a>' +
    '</div>' +

    // RED section
    '<div style="margin-bottom:24px;">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">' +
        '<span style="width:12px;height:12px;border-radius:50%;' +
          'background:#c0392b;flex-shrink:0;display:inline-block;' +
          'box-shadow:0 0 0 3px #c0392b22;"></span>' +
        '<h3 style="font-size:15px;font-weight:700;color:#c0392b;margin:0;">' +
          scT('Seek emergency help now','اطلبي المساعدة الطارئة الآن') + '</h3>' +
      '</div>' +
      symptomRows(redSymptoms) +
    '</div>' +

    // AMBER section
    '<div style="margin-bottom:24px;">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">' +
        '<span style="width:12px;height:12px;border-radius:50%;' +
          'background:#d35400;flex-shrink:0;display:inline-block;' +
          'box-shadow:0 0 0 3px #d3540022;"></span>' +
        '<h3 style="font-size:15px;font-weight:700;color:#d35400;margin:0;">' +
          scT('Contact your doctor or midwife today','تواصلي مع طبيبتكِ أو مولّدتكِ اليوم') + '</h3>' +
      '</div>' +
      symptomRows(amberSymptoms) +
    '</div>' +

    // GREEN section
    '<div style="margin-bottom:24px;">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">' +
        '<span style="width:12px;height:12px;border-radius:50%;' +
          'background:#27ae60;flex-shrink:0;display:inline-block;' +
          'box-shadow:0 0 0 3px #27ae6022;"></span>' +
        '<h3 style="font-size:15px;font-weight:700;color:#27ae60;margin:0;">' +
          scT('Self-care — monitor and seek help if worsening','رعاية ذاتية — راقبي واطلبي المساعدة إذا تفاقم الأمر') + '</h3>' +
      '</div>' +
      symptomRows(greenSymptoms) +
    '</div>' +

    // Footer
    '<div class="notice" style="font-size:13px;">' +
      scT('Sources: RCOG Green-top Guidelines, NICE Clinical Knowledge Summaries, NHS Pregnancy information. This tool does not replace clinical assessment.',
          'المصادر: إرشادات RCOG، ملخصات NICE السريرية، معلومات الحمل من NHS. هذه الأداة لا تحل محل التقييم السريري.') +
    '</div>' +
  '</div>';
}

/* ── Accordion interaction (delegated) ──────────────────────────── */
document.addEventListener('click', function(e) {
  const row = e.target.closest('.sc-symptom');
  if (!row) return;
  const detail  = row.querySelector('.sc-detail');
  const chevron = row.querySelector('.sc-chevron');
  if (!detail) return;
  const open = !detail.hidden;
  detail.hidden = open;
  row.setAttribute('aria-expanded', String(!open));
  if (chevron) chevron.style.transform = open ? '' : 'rotate(90deg)';
});

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const row = e.target.closest('.sc-symptom');
  if (!row) return;
  e.preventDefault();
  row.click();
});
