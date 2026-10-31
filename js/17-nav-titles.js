/* Women & Families 2026.10.31-r18 | js/17-nav-titles.js
   Hash to page-title map and route enhancements (own closure).
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

// ── Search bar (r14) ────────────────────────────────────────────────
(function(){
  // Map of hash → display title (English + Arabic) for all navigable topics
  const SEARCH_INDEX = [
    {hash:'home',       en:'Home',                         ar:'الرئيسية'},
    {hash:'pregnancy',  en:'My Pregnancy',                 ar:'رحلة حملي'},
    {hash:'checker',    en:'Medicine checker',             ar:'فاحص الأدوية'},
    {hash:'plan',       en:'My health plan',               ar:'خطتي الصحية'},
    {hash:'contraception',en:'Contraception',              ar:'منع الحمل'},
    {hash:'prep',       en:'Preparing for pregnancy',      ar:'الاستعداد للحمل'},
    {hash:'fertility',  en:'Trying to conceive',           ar:'الاستعداد للإنجاب'},
    {hash:'breastfeeding',en:'Breastfeeding',              ar:'أرضع'},
    {hash:'postpartum', en:'After birth',                  ar:'بعد الولادة'},
    {hash:'calc-bmi',   en:'BMI calculator',               ar:'حاسبة مؤشر كتلة الجسم'},
    {hash:'calc-cycle', en:'Cycle calculator',             ar:'حاسبة الدورة'},
    {hash:'calc-postpartum',en:'Postpartum calculator',    ar:'حاسبة ما بعد الولادة'},
    {hash:'calc-appointment',en:'Appointment planner',     ar:'مخطط المواعيد'},
    {hash:'tools',      en:'All tools',                    ar:'كل الأدوات'},
    {hash:'bag',        en:'My medicines bag',             ar:'حقيبة أدويتي'},
    {hash:'diary',      en:'My diary',                     ar:'يومياتي'},
    {hash:'urgent',     en:'Urgent help — when to seek help', ar:'متى تطلبين المساعدة'},
    {hash:'topic-first-period',    en:'First period',              ar:'أول دورة شهرية'},
    {hash:'topic-period-pain',     en:'Period pain',               ar:'آلام الدورة'},
    {hash:'topic-heavy-periods',   en:'Heavy periods',             ar:'الدورة الغزيرة'},
    {hash:'topic-missed-periods',  en:'Missed periods',            ar:'غياب الدورة'},
    {hash:'topic-pms',             en:'PMS — premenstrual syndrome',ar:'متلازمة ما قبل الحيض'},
    {hash:'topic-pcos',            en:'PCOS — polycystic ovary syndrome',ar:'تكيس المبايض'},
    {hash:'topic-endometriosis',   en:'Endometriosis',             ar:'بطانة الرحم المهاجرة'},
    {hash:'topic-fibroids',        en:'Fibroids',                  ar:'الأورام الليفية'},
    {hash:'topic-cysts',           en:'Ovarian cysts',             ar:'أكياس المبيض'},
    {hash:'topic-discharge',       en:'Vaginal discharge',         ar:'الإفرازات المهبلية'},
    {hash:'topic-uti',             en:'Urinary tract infections',  ar:'التهابات المسالك البولية'},
    {hash:'topic-sti',             en:'STIs — sexually transmitted infections',ar:'الأمراض المنقولة جنسياً'},
    {hash:'topic-emergency-contraception',en:'Emergency contraception',ar:'منع الحمل الطارئ'},
    {hash:'topic-screening',       en:'Cervical screening (smear test)',ar:'فحص عنق الرحم'},
    {hash:'topic-hpv',             en:'HPV and the vaccine',        ar:'فيروس HPV واللقاح'},
    {hash:'topic-breast',          en:'Breast awareness',           ar:'الوعي بصحة الثدي'},
    {hash:'topic-pelvic-floor',    en:'Pelvic floor',               ar:'قاع الحوض'},
    {hash:'topic-pregnancy-loss',  en:'Pregnancy loss and miscarriage',ar:'فقدان الحمل والإجهاض'},
    {hash:'topic-ectopic',         en:'Ectopic pregnancy',          ar:'الحمل خارج الرحم'},
    {hash:'topic-labour',          en:'Labour and birth',           ar:'المخاض والولادة'},
    {hash:'topic-postnatal-mood',  en:'Postnatal mood and mental health',ar:'المزاج والصحة النفسية بعد الولادة'},
    {hash:'topic-perimenopause',   en:'Perimenopause',              ar:'قبل انقطاع الطمث'},
    {hash:'topic-menopause-treatment',en:'Menopause treatment (HRT)',ar:'علاج انقطاع الطمث'},
    {hash:'topic-postmenopausal-bleeding',en:'Postmenopausal bleeding',ar:'النزيف بعد انقطاع الطمث'},
    {hash:'topic-bone-health',     en:'Bone health and osteoporosis',ar:'صحة العظام وهشاشتها'},
    {hash:'topic-examination',     en:'Gynaecological examination',  ar:'الفحص النسائي'},
    {hash:'topic-fertility-assessment',en:'Fertility assessment',    ar:'تقييم الخصوبة'},
    {hash:'topic-pregnancy-conditions',en:'Pregnancy conditions (GDM, pre-eclampsia)',ar:'حالات الحمل (سكري، تسمم)'},
    {hash:'topic-feeding-problems',en:'Feeding problems and support',ar:'مشاكل الرضاعة ودعمها'},
    {hash:'topic-pain-sex',        en:'Pain during sex',            ar:'الألم أثناء العلاقة الزوجية'},
    {hash:'topic-maternal-warning',en:'Maternal warning signs',      ar:'علامات التحذير الأمومية'},
    {hash:'topic-bloating',        en:'Bloating and pelvic pressure',ar:'الانتفاخ والضغط الحوضي'},
    {hash:'topic-period-care',     en:'Period care products',        ar:'منتجات العناية بالدورة'},
    {hash:'topic-prepare-care',    en:'Preparing for pregnancy — care',ar:'الاستعداد للحمل — الرعاية'},
    {hash:'topic-pregnancy-care',  en:'Pregnancy care and antenatal',ar:'رعاية الحمل وما قبل الولادة'},
    {hash:'topic-recovery-care',   en:'Recovery and postnatal care', ar:'التعافي والرعاية ما بعد الولادة'},
    {hash:'topic-menopause-care',  en:'Menopause care and lifestyle',ar:'رعاية انقطاع الطمث ونمط الحياة'},
    {hash:'topic-pregnancy-options',en:'Pregnancy options and decisions',ar:'خيارات الحمل والقرارات'},
    {hash:'topic-safety-support',  en:'Safety and domestic support', ar:'السلامة والدعم المنزلي'},
    {hash:'topic-fertility-treatment',en:'Fertility treatment (IVF)',ar:'علاج الخصوبة (أطفال الأنابيب)'},
    {hash:'topic-pregnancy-complications',en:'Pregnancy complications',ar:'مضاعفات الحمل'},
    {hash:'topic-cancer-support',  en:'Gynaecological cancer support',ar:'دعم سرطان الأمراض النسائية'}
  ];

  let focused = -1; // keyboard focus index in results

  function runSearch(query) {
    const resultsEl = document.getElementById('home-search-results');
    const clearBtn  = document.getElementById('home-search-clear');
    if (!resultsEl) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsEl.hidden = true;
      resultsEl.style.display = 'none';
      resultsEl.innerHTML = '';
      if (clearBtn) clearBtn.hidden = true;
      focused = -1;
      return;
    }
    if (clearBtn) clearBtn.hidden = false;

    const isArabic = /[\u0600-\u06FF]/.test(q);
    const matches = SEARCH_INDEX.filter(item => {
      const enMatch = item.en.toLowerCase().includes(q);
      const arMatch = item.ar.includes(q);
      return enMatch || arMatch;
    }).slice(0, 7);

    focused = -1;
    if (matches.length === 0) {
      resultsEl.hidden = false;
      resultsEl.style.display = 'block';
      resultsEl.innerHTML = '<div style="padding:14px 16px;font-size:14px;color:var(--muted);">' +
        (isArabic ? 'لا توجد نتائج مطابقة.' : 'No matching topics found.') + '</div>';
      return;
    }

    resultsEl.hidden = false;
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = matches.map((item, i) => {
      const lang = document.documentElement.lang || 'en';
      var a = '<a role="option" tabindex="-1"' +
        ' data-hash="' + item.hash + '"' +
        ' href="#' + item.hash + '"' +
        ' class="search-result-item"' +
        ' style="display:block;padding:12px 16px;font-size:14px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line);">' +
        '<span style="font-weight:500;">' + primary + '</span>' +
        '<br><span style="font-size:12px;color:var(--muted);">' + secondary + '</span>' +
        '</a>';
      return a;
    }).join('');
  }

  function moveFocus(dir) {
    const resultsEl = document.getElementById('home-search-results');
    if (!resultsEl || resultsEl.hidden) return;
    const items = resultsEl.querySelectorAll('a[role=option]');
    if (!items.length) return;
    if (dir === 'down') focused = Math.min(focused + 1, items.length - 1);
    if (dir === 'up')   focused = Math.max(focused - 1, -1);
    if (focused === -1) {
      document.getElementById('home-search-input').focus();
    } else {
      items[focused].focus();
      items.forEach((el,i) => el.style.background = i === focused ? 'var(--soft)' : '');
    }
  }

  document.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'home-search-input') {
      runSearch(e.target.value);
    }
  });

  document.addEventListener('keydown', function(e) {
    const inp = document.getElementById('home-search-input');
    const res = document.getElementById('home-search-results');
    if (!inp || !res || res.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus('down'); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); moveFocus('up'); }
    if (e.key === 'Escape')    { inp.value = ''; runSearch(''); inp.focus(); }
  });

  document.addEventListener('click', function(e) {
    // Search result item navigation
    var hashItem = e.target.closest('[data-hash]');
    if (hashItem && hashItem.classList.contains('search-result-item')) {
      var inp = document.getElementById('home-search-input');
      var res = document.getElementById('home-search-results');
      if (inp) inp.value = '';
      if (res) { res.hidden = true; res.style.display = 'none'; }
      return;
    }
    var searchInp = document.getElementById('home-search-input');
    var searchRes = document.getElementById('home-search-results');
    var searchBar = document.getElementById('search-bar-container');
    if (searchInp && searchRes && searchBar && !searchBar.contains(e.target)) {
      searchRes.hidden = true;
      searchRes.style.display = 'none';
    }
    if (e.target && e.target.id === 'home-search-clear') {
      if (searchInp) { searchInp.value = ''; searchInp.focus(); }
      runSearch('');
    }
  });
})();
