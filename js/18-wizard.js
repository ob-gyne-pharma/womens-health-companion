/* Women & Families 2026.10.31-r18 | js/18-wizard.js
   Welcome wizard (own closure).
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

// ── End Search bar ───────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════
// Phase 1a — Welcome Wizard + Life-Stage Bar  (r16)
// ══════════════════════════════════════════════════════════════════
(function(){

  // ── Wizard strings (bilingual, self-contained) ──────────────────
  const WIZ = {
    en: {
      subtitle: 'Your trusted companion for every stage of your health journey.',
      question:  'Which phase of life best describes you right now?',
      labels:    {cycle:'Cycle & Fertility', pregnancy:'Pregnancy', postpartum:'After Birth', perimenopause:'Mature Health'},
      subs:      {cycle:'Tracking periods or trying to conceive', pregnancy:'Currently pregnant', postpartum:'Postpartum & newborn care', perimenopause:'Perimenopause & beyond'},
      choosePrompt: 'Choose a stage to get started',
      startBtn:  'Get started →',
      skip:      'Skip for now'
    },
    ar: {
      subtitle: 'رفيقتكِ الموثوقة في كل مرحلة من مراحل رحلتكِ الصحية.',
      question:  'أي مرحلة من مراحل الحياة تصفكِ الآن؟',
      labels:    {cycle:'الدورة والخصوبة', pregnancy:'الحمل', postpartum:'بعد الولادة', perimenopause:'الصحة الناضجة'},
      subs:      {cycle:'تتبّع الدورة أو الاستعداد للإنجاب', pregnancy:'أنتِ حامل حالياً', postpartum:'ما بعد الولادة ورعاية المولود', perimenopause:'ما قبل انقطاع الطمث وما بعده'},
      choosePrompt: 'اختاري مرحلة للبدء',
      startBtn:  'ابدئي →',
      skip:      'تخطّي الآن'
    }
  };

  // Stage → app stage mapping
  const WIZ_STAGE_MAP = {
    cycle: 'fertility',
    pregnancy: 'pregnancy',
    postpartum: 'postpartum',
    perimenopause: 'perimenopause'
  };

  let wizLang = state.lang || 'en';
  let wizSelected = null;

  function wizT(key, subkey) {
    const dict = WIZ[wizLang] || WIZ.en;
    return subkey ? (dict[key]?.[subkey] || WIZ.en[key]?.[subkey] || '') : (dict[key] || WIZ.en[key] || '');
  }

  function updateWizLang(lang) {
    wizLang = lang;
    const overlay = document.getElementById('wf-wizard-overlay');
    if (!overlay) return;
    const d = WIZ[lang] || WIZ.en;
    const el = id => document.getElementById(id);

    // Update lang buttons
    overlay.querySelectorAll('[data-wiz-lang]').forEach(b => {
      b.classList.toggle('active', b.dataset.wizLang === lang);
    });
    // Update text content
    if (el('wiz-subtitle'))   el('wiz-subtitle').textContent   = d.subtitle;
    if (el('wiz-question'))   el('wiz-question').textContent   = d.question;
    ['cycle','pregnancy','postpartum','perimenopause'].forEach(s => {
      if (el('wsl-'+s)) el('wsl-'+s).textContent = d.labels[s]   || '';
      if (el('wss-'+s)) el('wss-'+s).textContent = d.subs[s]     || '';
    });
    const startBtn = el('wiz-start-btn');
    const startText = el('wiz-start-text');
    if (startText) startText.textContent = wizSelected ? d.startBtn : d.choosePrompt;
    const skip = el('wiz-skip');
    if (skip) skip.textContent = d.skip;
    // Update dir
    const wizard = el('wf-wizard');
    if (wizard) wizard.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  function showWizard() {
    const overlay = document.getElementById('wf-wizard-overlay');
    if (!overlay) return;
    overlay.hidden = false;
    updateWizLang(state.lang || 'en');
    // Focus first stage button for a11y
    setTimeout(() => {
      const first = overlay.querySelector('[data-wiz-stage]');
      if (first) first.focus();
    }, 350);
  }

  function hideWizard() {
    const overlay = document.getElementById('wf-wizard-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeOut .2s ease forwards';
      setTimeout(() => { overlay.hidden = true; overlay.style.animation = ''; }, 200);
    }
  }

  function selectWizStage(stageId) {
    wizSelected = stageId;
    document.querySelectorAll('[data-wiz-stage]').forEach(b => {
      const selected = b.dataset.wizStage === stageId;
      b.setAttribute('aria-pressed', String(selected));
      b.classList.toggle('selected', selected);
    });
    const startBtn = document.getElementById('wiz-start-btn');
    const startText = document.getElementById('wiz-start-text');
    if (startBtn) { startBtn.disabled = false; startBtn.classList.add('ready'); }
    if (startText) startText.textContent = wizT('startBtn');
  }

  function completeWizard(stageId) {
    // Map wizard stage to app stage
    const appStage = WIZ_STAGE_MAP[stageId] || stageId;
    state.stage = appStage;
    state.wizardComplete = true;
    // Also update app lang to wizard lang if different
    if (wizLang !== state.lang) {
      state.lang = wizLang;
    }
    save();
    hideWizard();
    render();
  }

  function skipWizard() {
    state.wizardComplete = true;
    save();
    hideWizard();
  }

  // Check if wizard should show (first visit, wizard not yet completed)
  function maybeShowWizard() {
    // Don't show if returning user who completed it
    if (state.wizardComplete) return;
    // Don't show if they already have data (stage was explicitly set, have meds/diary/plan)
    const hasData = state.meds.length || state.appointments.length ||
                    state.cycles.length || state.questions.length ||
                    state.books.length;
    if (hasData) { state.wizardComplete = true; return; }
    // Show after a small delay so app feels loaded
    setTimeout(showWizard, 600);
  }

  // ── Wizard event listeners ───────────────────────────────────────
  document.addEventListener('click', function(e) {
    // Stage selection buttons
    const stageBtn = e.target.closest('[data-wiz-stage]');
    if (stageBtn) { selectWizStage(stageBtn.dataset.wizStage); return; }

    // Language switcher inside wizard
    const langBtn = e.target.closest('[data-wiz-lang]');
    if (langBtn) { updateWizLang(langBtn.dataset.wizLang); return; }

    // Start button
    if (e.target.closest('#wiz-start-btn') && wizSelected) {
      completeWizard(wizSelected); return;
    }

    // Skip button
    if (e.target.closest('#wiz-skip')) { skipWizard(); return; }

    // Click outside wizard to dismiss
    const overlay = document.getElementById('wf-wizard-overlay');
    if (overlay && !overlay.hidden && e.target === overlay) { skipWizard(); return; }

    // Life-stage bar chip click
    const lsChip = e.target.closest('[data-ls]');
    if (lsChip) {
      const stages = lsChip.dataset.stages ? lsChip.dataset.stages.split(',') : [lsChip.dataset.ls];
      state.stage = stages[0];
      save();
      render();
      return;
    }
  });

  // Escape key closes wizard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('wf-wizard-overlay');
      if (overlay && !overlay.hidden) { skipWizard(); }
    }
  });

  // Add fadeOut keyframe to document
  const fadeOutStyle = document.createElement('style');
  fadeOutStyle.textContent = '@keyframes fadeOut{from{opacity:1}to{opacity:0}}';
  document.head.appendChild(fadeOutStyle);

  // Run after a brief delay to let restoreState settle
  setTimeout(maybeShowWizard, 100);

})();
// ── End Phase 1a ─────────────────────────────────────────────────────
