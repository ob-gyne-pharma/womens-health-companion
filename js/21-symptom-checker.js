/* Women & Families 2026.11.08-r25 | js/21-symptom-checker.js
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
     en:'Heavy bleeding in pregnancy or after birth can be a serious emergency. Call emergency services or go to the nearest emergency department immediately.',
     ar:'النزيف الغزير أثناء الحمل أو بعد الولادة قد يكون حالة طارئة خطيرة. توجّهي إلى الطوارئ أو اتصلي بالإسعاف فوراً.'},
   action:{en:'Call emergency services or go to the nearest emergency department now',ar:'اتصلي بالإسعاف أو توجّهي إلى أقرب قسم طوارئ الآن'}},

  {id:'chest-pain',     sev:SEV.RED,
   en:'Chest pain or difficulty breathing',
   ar:'ألم في الصدر أو صعوبة في التنفس',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Chest pain or breathlessness in pregnancy or postpartum can indicate a serious condition such as a pulmonary embolism. Seek emergency care immediately.',
     ar:'ألم الصدر أو ضيق التنفس أثناء الحمل أو بعده قد يشير إلى حالة خطيرة كانسداد رئوي. اطلبي الرعاية الطارئة فوراً.'},
   action:{en:'Call emergency services or go to the nearest emergency department now',ar:'اتصلي بالإسعاف أو توجّهي إلى أقرب قسم طوارئ الآن'}},

  {id:'fits',           sev:SEV.RED,
   en:'Fits, seizures, or loss of consciousness',
   ar:'تشنجات أو فقدان الوعي',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Seizures in pregnancy may indicate eclampsia, a life-threatening emergency. Call emergency services immediately.',
     ar:'التشنجات أثناء الحمل قد تشير إلى تسمم الحمل التشنجي (إيكلامبسيا) وهو طارئ مهدد للحياة. اتصلي بالإسعاف فوراً.'},
   action:{en:'Call emergency services immediately',ar:'اتصلي بالإسعاف فوراً'}},

  {id:'severe-headache',sev:SEV.RED,
   en:'Sudden severe headache with vision changes or swelling',
   ar:'صداع شديد مفاجئ مع اضطراب الرؤية أو التورم',
   stages:['pregnant','postpartum'],
   guidance:{
     en:'A sudden severe headache with visual disturbance or facial/hand swelling in pregnancy or postpartum may indicate pre-eclampsia. Seek emergency help now.',
     ar:'الصداع الشديد المفاجئ مع اضطراب الرؤية أو تورم الوجه واليدين في الحمل أو بعده قد يشير إلى تسمم الحمل. اطلبي المساعدة الطارئة الآن.'},
   action:{en:'Call emergency services or go to the nearest emergency department now',ar:'اتصلي بالإسعاف أو توجّهي إلى أقرب قسم طوارئ الآن'}},

  {id:'no-movement',    sev:SEV.RED,
   en:'No fetal movements felt after 28 weeks',
   ar:'عدم الإحساس بحركة الجنين بعد الأسبوع 28',
   stages:['pregnant'],
   guidance:{
     en:'Reduced or absent fetal movement after 28 weeks should always be assessed same day. Do not wait until your next appointment.',
     ar:'يجب تقييم تراجع أو غياب حركة الجنين بعد الأسبوع 28 في نفس اليوم. لا تنتظري حتى موعدك القادم.'},
   action:{en:'Contact your midwife, doctor or maternity unit now',ar:'تواصلي مع مولّدتكِ أو طبيبتكِ أو وحدة الولادة الآن'}},

  {id:'waters-early',   sev:SEV.RED,
   en:'Waters breaking before 37 weeks',
   ar:'تسرب السائل الأمنيوسي أو انفجار كيس الماء قبل الأسبوع 37',
   stages:['pregnant'],
   guidance:{
     en:'If your membranes rupture before 37 weeks (preterm prelabour rupture of membranes), go to the maternity unit immediately.',
     ar:'إذا انكسر كيس الماء قبل الأسبوع 37، توجّهي إلى وحدة الولادة فوراً.'},
   action:{en:'Go to the maternity unit or hospital now',ar:'توجّهي إلى وحدة الولادة أو المستشفى فوراً'}},

  {id:'severe-abdo-pain',sev:SEV.RED,
   en:'Severe abdominal or pelvic pain',
   ar:'ألم شديد في البطن أو الحوض',
   stages:['pregnant','postpartum','planning','fertility','general'],
   guidance:{
     en:'Severe abdominal or pelvic pain, especially with bleeding, dizziness, fainting or pain at the tip of the shoulder, can be a sign of a serious problem such as an ectopic pregnancy or placental abruption. Seek emergency care now.',
     ar:'الألم الشديد في البطن أو الحوض، خاصة إذا صاحبه نزيف أو دوار أو إغماء أو ألم في طرف الكتف، قد يدل على مشكلة خطيرة مثل الحمل خارج الرحم أو انفصال المشيمة. اطلبي الرعاية الطارئة الآن.'},
   action:{en:'Call emergency services or go to the nearest emergency department now',ar:'اتصلي بالإسعاف أو توجّهي إلى أقرب قسم طوارئ الآن'}},

  /* ── AMBER: contact your midwife or doctor today ────────────────── */
  {id:'bleeding-pregnant',sev:SEV.AMBER,
   en:'Any vaginal bleeding during pregnancy',
   ar:'أي نزيف مهبلي أثناء الحمل',
   stages:['pregnant'],
   guidance:{
     en:'Any bleeding in pregnancy, even light spotting, should be assessed by a midwife or doctor the same day. If the bleeding is heavy or you have severe pain, treat it as an emergency.',
     ar:'أي نزيف أثناء الحمل، حتى لو كان بقعاً خفيفة، يستدعي تقييماً من المولّدة أو الطبيبة في اليوم نفسه. وإذا كان النزيف غزيراً أو صاحبه ألم شديد فاعتبريه حالة طارئة.'},
   action:{en:'Contact your midwife or doctor today',ar:'تواصلي مع مولّدتكِ أو طبيبتكِ اليوم'}},

  {id:'high-temp',      sev:SEV.AMBER,
   en:'Fever over 38°C (100.4°F)',
   ar:'ارتفاع الحرارة فوق 38 درجة مئوية',
   stages:['pregnant','breastfeeding','postpartum','general'],
   guidance:{
     en:'A fever in pregnancy or after birth needs same-day assessment. It may indicate infection. Contact your midwife or doctor.',
     ar:'الحمى أثناء الحمل أو بعد الولادة تستدعي تقييماً في نفس اليوم وقد تشير إلى عدوى. تواصلي مع مولّدتكِ أو طبيبتكِ.'},
   action:{en:'Contact your midwife or doctor today',ar:'تواصلي مع مولّدتكِ أو طبيبتكِ اليوم'}},

  {id:'painful-urination',sev:SEV.AMBER,
   en:'Burning or pain when urinating',
   ar:'حرقة أو ألم عند التبول',
   stages:['pregnant','general','planning','fertility'],
   guidance:{
     en:'A urinary tract infection in pregnancy needs prompt treatment to prevent it spreading to the kidneys. Contact your doctor or midwife today.',
     ar:'عدوى المسالك البولية أثناء الحمل تحتاج علاجاً سريعاً لمنع انتشارها للكلى. تواصلي مع طبيبتكِ أو مولّدتكِ اليوم.'},
   action:{en:'Contact your doctor or midwife today',ar:'تواصلي مع طبيبتكِ أو مولّدتكِ اليوم'}},

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
     en:'Changes in vaginal discharge may indicate infection, including sexually transmitted infections, which can affect pregnancy. A doctor or sexual health clinic can arrange tests.',
     ar:'تغير الإفرازات المهبلية قد يشير إلى عدوى بما فيها الأمراض المنقولة جنسياً التي تؤثر على الحمل. يمكن لطبيبتكِ إجراء الفحوصات.'},
   action:{en:'Contact your doctor or a sexual health clinic',ar:'تواصلي مع طبيبتكِ أو عيادة الصحة الجنسية'}},

  {id:'mood-low',       sev:SEV.AMBER,
   en:'Persistent low mood, anxiety, or feeling unable to cope',
   ar:'مزاج منخفض مستمر أو قلق أو شعور بعدم القدرة على التحمل',
   stages:['postpartum','pregnant','general'],
   guidance:{
     en:'Postnatal depression and perinatal anxiety are common and treatable. You deserve support. Speak to your doctor or midwife as soon as possible. If you have thoughts of harming yourself or your baby, treat this as an emergency and get help now.',
     ar:'الاكتئاب بعد الولادة والقلق المحيط بالولادة شائعان وقابلان للعلاج. تستحقين الدعم. تحدثي مع طبيبتكِ أو مولّدتكِ في أقرب وقت. وإذا راودتكِ أفكار بإيذاء نفسكِ أو طفلكِ، فاعتبري ذلك حالة طارئة واطلبي المساعدة فوراً.'},
   action:{en:'Speak to your doctor or midwife',ar:'تحدثي مع طبيبتكِ أو مولّدتكِ'}},

  {id:'swollen-leg',    sev:SEV.AMBER,
   en:'One leg swollen, red, or painful',
   ar:'تورم أو احمرار أو ألم في ساق واحدة',
   stages:['pregnant','postpartum','general'],
   guidance:{
     en:'Swelling or pain in one leg can be a sign of deep vein thrombosis (DVT), which is more common in pregnancy. Seek same-day assessment.',
     ar:'تورم أو ألم في ساق واحدة قد يشير إلى تجلط الأوردة العميقة وهو أكثر شيوعاً في الحمل. اطلبي التقييم في نفس اليوم.'},
   action:{en:'Contact your doctor or go to urgent care today',ar:'تواصلي مع طبيبتكِ أو اذهبي لعيادة الطوارئ اليوم'}},

  {id:'period-pain-severe',sev:SEV.AMBER,
   en:'Severe period pain not relieved by usual painkillers',
   ar:'آلام دورة شهرية شديدة لا تستجيب للمسكنات العادية',
   stages:['general','planning','fertility'],
   guidance:{
     en:'Severe dysmenorrhoea may indicate endometriosis or another underlying condition. A doctor can refer you for investigation.',
     ar:'آلام الدورة الشديدة قد تشير إلى بطانة الرحم المهاجرة أو حالة أخرى كامنة. يمكن لطبيبتكِ إحالتكِ للفحص.'},
   action:{en:'Book an appointment with your doctor',ar:'احجزي موعداً مع طبيبتكِ'}},

  {id:'irregular-periods',sev:SEV.AMBER,
   en:'Periods that have become very irregular or have stopped',
   ar:'دورات شهرية صارت غير منتظمة جداً أو توقفت',
   stages:['general','planning','fertility'],
   guidance:{
     en:'Irregular or absent periods can have many causes, including PCOS, thyroid conditions, and stress. A doctor can arrange a blood test.',
     ar:'عدم انتظام الدورة أو توقفها له أسباب عديدة منها تكيس المبايض ومشاكل الغدة الدرقية والتوتر. يمكن لطبيبتكِ طلب فحص دم.'},
   action:{en:'Book an appointment with your doctor',ar:'احجزي موعداً مع طبيبتكِ'}},

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
     en:'Fatigue is normal in pregnancy and postpartum. Rest when you can, accept help, and stay hydrated. If fatigue is severe or accompanied by breathlessness, see your doctor.',
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
     en:'Breast tenderness is normal in early pregnancy. Any new lump, dimpling, nipple inversion, or skin change should always be checked by a doctor.',
     ar:'حساسية الثدي طبيعية في بداية الحمل. أي كتلة جديدة أو تجعد أو انقلاب الحلمة أو تغير في الجلد يجب دائماً فحصه من قِبل طبيبتكِ.'},
   action:{en:'Mention at next appointment — see a doctor for lumps',ar:'اذكريها في موعدك — راجعي الطبيبة للكتل'}},

  {id:'pelvic-floor',   sev:SEV.GREEN,
   en:'Leaking urine or pelvic floor weakness',
   ar:'تسرب البول أو ضعف عضلات قاع الحوض',
   stages:['postpartum','pregnant','general'],
   guidance:{
     en:'Stress urinary incontinence is very common after childbirth. Pelvic floor exercises (Kegels) can significantly improve symptoms. Ask your midwife or doctor for a referral to physiotherapy.',
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
  return T(en, ar);
}

const SC_LABEL = {
  red:   ['Seek emergency help now','اطلبي المساعدة الطارئة الآن'],
  amber: ['Contact your doctor today','تواصلي مع طبيبتكِ اليوم'],
  green: ['Self-care with monitoring','رعاية ذاتية مع المتابعة']
};
const SC_GROUP = {
  red:   ['Seek emergency help now','اطلبي المساعدة الطارئة الآن'],
  amber: ['Contact your doctor or midwife today','تواصلي مع طبيبتكِ أو مولّدتكِ اليوم'],
  green: ['Self-care — monitor and seek help if worsening','رعاية ذاتية — راقبي واطلبي المساعدة إذا تفاقم الأمر']
};

/* One card per symptom. A real <button> gives keyboard use (Enter / Space) for free, and links inside the card keep working. */
function symptomRow(s) {
  const b = SC_LABEL[s.sev];
  return '<div class="sc-symptom">' +
    '<button type="button" class="sc-toggle" aria-expanded="false" aria-controls="sc-d-' + s.id + '">' +
      '<span>' + esc(scT(s.en, s.ar)) + '</span><span class="sc-chevron" aria-hidden="true">›</span></button>' +
    '<div class="sc-detail" id="sc-d-' + s.id + '" hidden>' +
      '<span class="sc-badge">' + esc(scT(b[0], b[1])) + '</span>' +
      '<p>' + esc(scT(s.guidance.en, s.guidance.ar)) + '</p>' +
      '<p class="sc-action">' + esc(scT(s.action.en, s.action.ar)) + '</p>' +
      (s.sev === SEV.RED ? '<a class="sc-more" href="#urgent">' + esc(scT('Emergency numbers', 'أرقام الطوارئ')) + '</a>' : '') +
    '</div></div>';
}

/* ── Main symptom checker render ─────────────────────────────────── */
function symptomChecker() {
  const stageKey = STAGE_KEYS[state.stage] || 'general';
  const list = SYMPTOMS.filter(s => s.stages.includes(stageKey) || s.stages.includes('general'));
  const stageLabel = {
    pregnant:      scT('Pregnancy','الحمل'),
    postpartum:    scT('After birth','بعد الولادة'),
    breastfeeding: scT('Breastfeeding','الرضاعة'),
    fertility:     scT('Trying to conceive','الاستعداد للإنجاب'),
    planning:      scT('Planning pregnancy','التخطيط للحمل'),
    general:       scT('General health','الصحة العامة')
  }[stageKey] || scT('General health','الصحة العامة');

  const group = sev => {
    const items = list.filter(s => s.sev === sev);
    if (!items.length) return '';
    const g = SC_GROUP[sev];
    return '<section class="sc-group sc-' + sev + '"><h2><span class="sc-dot" aria-hidden="true"></span>' + esc(scT(g[0], g[1])) + '</h2>' +
      items.map(symptomRow).join('') + '</section>';
  };

  return head(scT('Symptom checker','فاحص الأعراض'),
              scT('See which symptoms need urgent care and which can be managed at home.','اعرفي أي الأعراض تحتاج رعاية عاجلة وأيها يمكن التعامل معه في المنزل.')) +
    emergencyBox() +
    '<div class="notice caution sc-disclaimer"><strong>' +
      esc(scT('This is a general reference tool, not a personal diagnosis.','هذه أداة مرجعية عامة وليست تشخيصاً شخصياً.')) + '</strong> ' +
      esc(scT('The list is not complete. If you are worried, or your symptom is not listed, contact a doctor or midwife. In an emergency, call your local emergency number.',
              'القائمة غير كاملة. إذا كنتِ قلقة أو لم يكن عرضكِ مذكوراً، تواصلي مع طبيبة أو مولّدة. وفي الطوارئ اتصلي برقم الطوارئ المحلي.')) +
    '</div>' +
    '<p class="sc-stage"><span class="sc-pill">' + esc(scT('Showing for: ','تظهر لـ: ')) + esc(stageLabel) + '</span> ' +
      '<a href="#home">' + esc(scT('Change stage','تغيير المرحلة')) + '</a></p>' +
    group('red') + group('amber') + group('green') +
    '<div class="notice small">' +
      esc(scT('Informed by guidance from RCOG, NICE and the NHS. Guidance and services differ by country. This tool does not replace clinical assessment.',
              'استناداً إلى إرشادات RCOG وNICE وNHS. تختلف الإرشادات والخدمات من بلد إلى آخر. هذه الأداة لا تحل محل التقييم السريري.')) +
    '</div>';
}

/* ── Card open / close (delegated, so it survives page redraws) ──── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest && e.target.closest('.sc-toggle');
  if (!btn) return;
  const detail = document.getElementById(btn.getAttribute('aria-controls'));
  if (!detail) return;
  const open = !detail.hidden;
  detail.hidden = open;
  btn.setAttribute('aria-expanded', String(!open));
});
