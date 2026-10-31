/* Women & Families 2026.10.31-r17 | js/05-life-topics.js
   Life-stage topics data, chapters, topic/urgent pages.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

const lifeTopics=[
  {
    "id": "first-period",
    "title": [
      "My first period",
      "دورتي الأولى"
    ],
    "body": [
      "Periods are part of growing up. Pads, period underwear, tampons and cups are different ways to manage bleeding; follow each product’s instructions. Ask a trusted adult or clinician for help choosing.",
      "الدورة جزء من النمو. الفوط وملابس الدورة والسدادات والكؤوس وسائل مختلفة للتعامل مع الدم؛ اتبعي تعليمات المنتج. اسألي شخصًا بالغًا موثوقًا أو مختصًا للمساعدة في الاختيار."
    ],
    "track": [
      "Record the first bleeding day and how you feel. Keep spare supplies.",
      "دوّني أول يوم للنزف وشعورك، واحتفظي بمستلزمات إضافية."
    ],
    "help": [
      "Ask for help if bleeding or pain disrupts school or daily activities.",
      "اطلبي المساعدة إذا عطّل النزف أو الألم المدرسة أو أنشطتك."
    ],
    "url": "https://www.nhs.uk/conditions/periods/"
  },
  {
    "id": "period-pain",
    "title": [
      "Painful periods",
      "آلام الدورة"
    ],
    "body": [
      "Cramps around a period are common. Gentle warmth and comfortable movement may help. Severe or worsening pain deserves assessment.",
      "التقلصات مع الدورة شائعة. قد تساعد الدفء المعتدل والحركة المريحة. الألم الشديد أو المتزايد يحتاج تقييمًا."
    ],
    "track": [
      "Note timing, severity, missed activities and whether pain occurs between periods.",
      "دوّني توقيت الألم وشدته والأنشطة المتأثرة ووجوده بين الدورات."
    ],
    "help": [
      "Seek urgent advice for severe pain that is worse than usual and not helped by usual pain relief.",
      "اطلبي نصيحة عاجلة لألم شديد أسوأ من المعتاد ولا يتحسن بالمسكن المعتاد."
    ],
    "url": "https://www.nhs.uk/symptoms/period-pain/"
  },
  {
    "id": "heavy-periods",
    "title": [
      "Heavy bleeding",
      "غزارة الدورة"
    ],
    "body": [
      "Bleeding that floods clothing, needs very frequent product changes or disrupts life can be treated. A clinician may check for anaemia and its cause.",
      "النزف الذي يلطّخ الملابس أو يتطلب تغيير المستلزمات كثيرًا أو يعطل الحياة يمكن علاجه. قد يفحص الطبيب فقر الدم وسبب النزف."
    ],
    "track": [
      "Note bleeding days, product changes, clots and tiredness.",
      "دوّني أيام النزف وتغيير المستلزمات والجلطات والتعب."
    ],
    "help": [
      "Book a review for persistent heavy periods or bleeding between periods or after sex.",
      "احجزي مراجعة لغزارة مستمرة أو نزف بين الدورات أو بعد الجماع."
    ],
    "url": "https://www.nhs.uk/conditions/heavy-periods/"
  },
  {
    "id": "missed-periods",
    "title": [
      "Late or missing periods",
      "تأخر الدورة أو غيابها"
    ],
    "body": [
      "Pregnancy, stress, contraception and hormonal conditions can affect periods. A calendar cannot tell which cause applies.",
      "قد تؤثر في الدورة عوامل مثل الحمل والتوتر ومنع الحمل والاضطرابات الهرمونية. لا يحدد التقويم السبب."
    ],
    "track": [
      "Record dates, contraception and other changes. Consider a pregnancy test if pregnancy is possible.",
      "دوّني التواريخ ووسيلة منع الحمل والتغيّرات الأخرى. فكري في اختبار الحمل إذا كان ممكنًا."
    ],
    "help": [
      "Arrange review if periods have not started by 15, or you miss three in a row. Seek earlier advice for concerning symptoms.",
      "راجعي المختص إذا لم تبدأ الدورة بحلول ١٥ سنة أو غابت ثلاث مرات متتالية، وأبكر عند أعراض مقلقة."
    ],
    "url": "https://www.nhs.uk/symptoms/missed-or-late-periods/"
  },
  {
    "id": "pms",
    "title": [
      "Mood and PMS",
      "المزاج وأعراض ما قبل الدورة"
    ],
    "body": [
      "Physical or emotional symptoms can appear before a period. Intense symptoms that affect daily life deserve support, not dismissal.",
      "قد تظهر أعراض جسدية أو نفسية قبل الدورة. الأعراض الشديدة المؤثرة في حياتك تستحق الدعم ولا ينبغي تجاهلها."
    ],
    "track": [
      "Keep a symptom diary across at least two cycles.",
      "احتفظي بسجل للأعراض خلال دورتين على الأقل."
    ],
    "help": [
      "Ask about treatment if symptoms affect relationships, study, sleep or work.",
      "اسألي عن العلاج إذا أثرت الأعراض في العلاقات أو الدراسة أو النوم أو العمل."
    ],
    "url": "https://www.nhs.uk/conditions/pre-menstrual-syndrome/"
  },
  {
    "id": "pcos",
    "title": [
      "PCOS and hormone concerns",
      "تكيس المبايض والاضطرابات الهرمونية"
    ],
    "body": [
      "This hormone-related condition can affect periods, hair growth and fertility. Symptoms alone do not establish a diagnosis.",
      "قد تؤثر هذه الحالة الهرمونية في الدورة ونمو الشعر والخصوبة. الأعراض وحدها لا تثبت التشخيص."
    ],
    "track": [
      "Bring your cycle history, skin or hair changes and current medicines.",
      "أحضري تاريخ الدورة وتغيّرات الجلد أو الشعر وأدويتك الحالية."
    ],
    "help": [
      "Ask for an assessment and a plan based on your symptoms and pregnancy preferences.",
      "اطلبي تقييمًا وخطة بحسب أعراضك ورغبتك في الحمل."
    ],
    "url": "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/"
  },
  {
    "id": "endometriosis",
    "title": [
      "Endometriosis",
      "بطانة الرحم المهاجرة"
    ],
    "body": [
      "Endometriosis can cause pelvic pain, painful periods and fertility difficulties. Pain affecting your life deserves assessment.",
      "قد تسبب بطانة الرحم المهاجرة ألم الحوض وآلام الدورة وصعوبة الإنجاب. الألم المؤثر في حياتك يستحق التقييم."
    ],
    "track": [
      "Record pain, cycle timing, bowel or bladder symptoms and effects on daily activities.",
      "دوّني الألم وتوقيته مع الدورة وأعراض الأمعاء أو المثانة وتأثيره في الأنشطة."
    ],
    "help": [
      "Ask what tests and treatment options fit your symptoms and goals.",
      "اسألي عن الفحوصات وخيارات العلاج المناسبة لأعراضك وأهدافك."
    ],
    "url": "https://www.nhs.uk/conditions/endometriosis/"
  },
  {
    "id": "fibroids",
    "title": [
      "Fibroids",
      "الأورام الليفية"
    ],
    "body": [
      "Fibroids are non-cancerous growths in or around the womb. Some cause heavy bleeding or pressure; others need no treatment.",
      "الأورام الليفية نموّ غير سرطاني في الرحم أو حوله. قد تسبب نزفًا غزيرًا أو ضغطًا، وبعضها لا يحتاج علاجًا."
    ],
    "track": [
      "Note bleeding, pressure, bladder symptoms and future pregnancy plans.",
      "دوّني النزف والضغط وأعراض المثانة وخطط الحمل المستقبلية."
    ],
    "help": [
      "Discuss symptoms and whether monitoring, medicines or a procedure is appropriate.",
      "ناقشي الأعراض ومدى مناسبة المتابعة أو الأدوية أو إجراء علاجي."
    ],
    "url": "https://www.nhs.uk/conditions/fibroids/"
  },
  {
    "id": "cysts",
    "title": [
      "Ovarian cysts",
      "أكياس المبيض"
    ],
    "body": [
      "Many ovarian cysts disappear without treatment. Decisions depend on symptoms, scan findings and whether you have reached menopause.",
      "تختفي أكياس مبيض كثيرة دون علاج. تعتمد القرارات على الأعراض والفحص بالموجات الصوتية والوصول لانقطاع الطمث."
    ],
    "track": [
      "Bring scan reports and describe pain or changes in symptoms.",
      "أحضري تقارير الفحص وصفي الألم وتغيّر الأعراض."
    ],
    "help": [
      "Sudden severe pelvic pain, especially with nausea or vomiting, needs urgent assessment.",
      "الألم المفاجئ الشديد بالحوض، خصوصًا مع الغثيان أو القيء، يحتاج تقييمًا عاجلًا."
    ],
    "url": "https://www.nhs.uk/conditions/ovarian-cyst/"
  },
  {
    "id": "discharge",
    "title": [
      "Discharge, itching and irritation",
      "الإفرازات والحكة والتهيج"
    ],
    "body": [
      "Some vaginal discharge is normal. Changes in smell, colour or texture, itching or pain can have several causes.",
      "بعض الإفرازات المهبلية طبيعي. تغير الرائحة أو اللون أو القوام أو وجود الحكة والألم له أسباب متعددة."
    ],
    "track": [
      "Note when changes started, associated pain and any products or treatments used.",
      "دوّني بداية التغيرات والألم المصاحب والمنتجات أو العلاجات المستخدمة."
    ],
    "help": [
      "Seek assessment for new changes, pelvic pain or bleeding. Do not assume every itch is thrush.",
      "اطلبي التقييم عند تغيرات جديدة أو ألم الحوض أو النزف. ليست كل حكة فطريات."
    ],
    "url": "https://www.nhs.uk/symptoms/vaginal-discharge/"
  },
  {
    "id": "uti",
    "title": [
      "Urinary symptoms",
      "الأعراض البولية"
    ],
    "body": [
      "Burning when passing urine, frequent urination and urgency can occur with a urinary infection. Other conditions can cause similar symptoms.",
      "قد يحدث الحرقان وكثرة التبول والإلحاح مع عدوى بولية، وقد تسبب حالات أخرى أعراضًا مشابهة."
    ],
    "track": [
      "Note symptoms, fever, back pain and whether you could be pregnant.",
      "دوّني الأعراض والحرارة وألم الظهر وإمكانية الحمل."
    ],
    "help": [
      "Get prompt advice if pregnant or if urinary symptoms come with fever, shivering or pain in the back.",
      "اطلبي نصيحة سريعة أثناء الحمل أو مع حرارة أو رعشة أو ألم الظهر."
    ],
    "url": "https://www.nhs.uk/conditions/urinary-tract-infections-utis/"
  },
  {
    "id": "sti",
    "title": [
      "Sexual health and testing",
      "الصحة الجنسية والفحوصات"
    ],
    "body": [
      "Sexually transmitted infections may have no symptoms. Testing is more useful than guessing from symptoms. Condoms reduce the risk of many infections.",
      "قد لا تسبب العدوى المنقولة جنسيًا أعراضًا. الفحص أنفع من التخمين بالأعراض. يقلل الواقي احتمال كثير من هذه العدوى."
    ],
    "track": [
      "Ask about confidential testing and when repeat tests may be needed.",
      "اسألي عن الفحص السري وموعد الحاجة لإعادة الفحص."
    ],
    "help": [
      "Seek advice after a possible exposure, or for sores, unusual discharge or pain.",
      "اطلبي النصيحة بعد تعرض محتمل أو عند تقرحات أو إفرازات غير معتادة أو ألم."
    ],
    "url": "https://www.nhs.uk/conditions/sexually-transmitted-infections-stis/"
  },
  {
    "id": "emergency-contraception",
    "title": [
      "Emergency contraception",
      "منع الحمل الطارئ"
    ],
    "body": [
      "Emergency contraception may help after unprotected sex or a contraceptive failure. The options have different time limits; earlier advice is better.",
      "قد يساعد منع الحمل الطارئ بعد جماع دون حماية أو فشل الوسيلة. تختلف حدود الوقت بين الخيارات؛ الأفضل طلب النصيحة مبكرًا."
    ],
    "track": [
      "Tell the clinician or pharmacist when it happened and which medicines you use.",
      "أخبري المختص أو الصيدلي بوقت حدوثه والأدوية المستخدمة."
    ],
    "help": [
      "Contact a qualified service promptly. Do not wait for your next period.",
      "تواصلي سريعًا مع جهة طبية مؤهلة ولا تنتظري الدورة التالية."
    ],
    "url": "https://www.nhs.uk/contraception/emergency-contraception/"
  },
  {
    "id": "screening",
    "title": [
      "Cervical screening",
      "فحص عنق الرحم"
    ],
    "body": [
      "Cervical screening helps prevent cervical cancer. Eligibility and intervals depend on your country and clinical history.",
      "يساعد فحص عنق الرحم في الوقاية من سرطان عنق الرحم. تختلف الأهلية والفواصل حسب البلد والتاريخ الطبي."
    ],
    "track": [
      "Keep previous results and ask your local clinic when you are due.",
      "احتفظي بالنتائج السابقة واسألي عيادتك المحلية عن موعد الفحص."
    ],
    "help": [
      "Ask about new bleeding or other symptoms separately; do not wait for a routine screening invitation.",
      "ناقشي النزف الجديد والأعراض الأخرى منفصلًا؛ لا تنتظري دعوة الفحص الروتيني."
    ],
    "url": "https://www.nhs.uk/tests-and-treatments/cervical-screening/"
  },
  {
    "id": "hpv",
    "title": [
      "HPV vaccination",
      "لقاح فيروس الورم الحليمي"
    ],
    "body": [
      "HPV vaccination reduces the risk of HPV-related disease, including cervical cancer. Vaccination does not replace cervical screening.",
      "يقلل لقاح فيروس الورم الحليمي خطر الأمراض المرتبطة به، ومنها سرطان عنق الرحم. لا يغني اللقاح عن فحص عنق الرحم."
    ],
    "track": [
      "Check your vaccination record.",
      "راجعي سجل التطعيمات."
    ],
    "help": [
      "Ask your local clinic about eligibility and the schedule appropriate for you.",
      "اسألي العيادة المحلية عن الأهلية والجدول المناسب لك."
    ],
    "url": "https://www.nhs.uk/vaccinations/hpv-vaccine/"
  },
  {
    "id": "breast",
    "title": [
      "Breast changes",
      "تغيّرات الثدي"
    ],
    "body": [
      "Most breast lumps are not cancer, but every new lump needs checking. Skin dimpling, a newly inverted nipple or bloodstained nipple discharge also need review.",
      "معظم كتل الثدي ليست سرطانًا، لكن كل كتلة جديدة تحتاج فحصًا. كذلك تنقّر الجلد أو انقلاب الحلمة حديثًا أو الإفراز الدموي يحتاج مراجعة."
    ],
    "track": [
      "Note where the change is and when you noticed it.",
      "دوّني موضع التغير ووقت ملاحظته."
    ],
    "help": [
      "Arrange a clinical assessment rather than diagnosing it yourself.",
      "رتّبي تقييمًا طبيًا بدل تشخيصه بنفسك."
    ],
    "url": "https://www.nhs.uk/symptoms/breast-lump/"
  },
  {
    "id": "pelvic-floor",
    "title": [
      "Pelvic floor and prolapse",
      "قاع الحوض والهبوط"
    ],
    "body": [
      "Vaginal heaviness, a bulge or urine leakage can occur with pelvic-floor problems. Treatments may include specialist physiotherapy, support devices or surgery.",
      "قد يحدث ثقل بالمهبل أو بروز أو تسرب البول مع مشاكل قاع الحوض. قد تشمل العلاجات العلاج الطبيعي المتخصص أو أجهزة الدعم أو الجراحة."
    ],
    "track": [
      "Describe bladder, bowel and pressure symptoms.",
      "صفي أعراض المثانة والأمعاء والضغط."
    ],
    "help": [
      "Ask for assessment and an individual plan rather than assuming symptoms must be accepted.",
      "اطلبي تقييمًا وخطة فردية بدل الاعتقاد بضرورة التعايش مع الأعراض."
    ],
    "url": "https://www.nhs.uk/conditions/pelvic-organ-prolapse/"
  },
  {
    "id": "pregnancy-loss",
    "title": [
      "Bleeding and pregnancy loss",
      "النزف وفقد الحمل"
    ],
    "body": [
      "Bleeding in pregnancy does not always mean miscarriage, but it needs medical advice. Pregnancy loss can require both physical care and emotional support.",
      "النزف أثناء الحمل لا يعني دائمًا الإجهاض، لكنه يحتاج نصيحة طبية. قد يتطلب فقد الحمل رعاية جسدية ودعمًا نفسيًا."
    ],
    "track": [
      "Tell the team your pregnancy dates, bleeding and pain.",
      "أخبري الفريق بعمر الحمل والنزف والألم."
    ],
    "help": [
      "Seek urgent maternity advice for bleeding; get emergency help for severe pain, heavy bleeding or faintness.",
      "اطلبي نصيحة عاجلة للنزف، ومساعدة طارئة عند ألم شديد أو نزف غزير أو شعور بالإغماء."
    ],
    "url": "https://www.nhs.uk/conditions/miscarriage/"
  },
  {
    "id": "ectopic",
    "title": [
      "Ectopic pregnancy warning signs",
      "علامات الحمل خارج الرحم"
    ],
    "body": [
      "An ectopic pregnancy is a pregnancy outside the womb. It can be life-threatening and cannot be diagnosed with an app.",
      "الحمل خارج الرحم هو حمل يقع خارج الرحم. قد يهدد الحياة ولا يمكن تشخيصه بالتطبيق."
    ],
    "track": [
      "Mention a possible pregnancy even if you have not had a positive test.",
      "اذكري إمكانية الحمل حتى لو لم يظهر اختبار إيجابي."
    ],
    "help": [
      "Possible pregnancy with one-sided pain, shoulder-tip pain or bleeding needs urgent advice. Severe pain, collapse or faintness needs emergency care.",
      "احتمال الحمل مع ألم بجانب واحد أو بطرف الكتف أو نزف يحتاج نصيحة عاجلة. الألم الشديد أو الانهيار أو الإغماء يحتاج طوارئ."
    ],
    "url": "https://www.nhs.uk/conditions/ectopic-pregnancy/"
  },
  {
    "id": "labour",
    "title": [
      "Preparing for labour",
      "الاستعداد للمخاض"
    ],
    "body": [
      "Labour may involve regular contractions, a show or waters breaking. Your maternity unit should give you its own contact and arrival instructions.",
      "قد يبدأ المخاض بتقلصات منتظمة أو نزول سدادة مخاطية أو نزول الماء. ينبغي أن يعطيك قسم الولادة تعليمات التواصل والحضور."
    ],
    "track": [
      "Keep your maternity contact and birth preferences ready.",
      "جهّزي وسيلة التواصل مع قسم الولادة وتفضيلات الولادة."
    ],
    "help": [
      "Contact maternity care urgently for waters breaking, vaginal bleeding, reduced movements or suspected labour before 37 weeks.",
      "تواصلي عاجلًا مع قسم الولادة عند نزول الماء أو النزف أو نقص الحركة أو الشك بمخاض قبل ٣٧ أسبوعًا."
    ],
    "url": "https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/"
  },
  {
    "id": "postnatal-mood",
    "title": [
      "Emotional wellbeing after birth",
      "الصحة النفسية بعد الولادة"
    ],
    "body": [
      "Postnatal depression is treatable. Persistent sadness, loss of enjoyment or difficulty coping deserve help; this is not a personal failure.",
      "اكتئاب ما بعد الولادة قابل للعلاج. الحزن المستمر أو فقد المتعة أو صعوبة التأقلم تستحق المساعدة، وليست فشلًا شخصيًا."
    ],
    "track": [
      "Tell someone you trust and your care team how you feel.",
      "أخبري شخصًا تثقين به وفريق الرعاية بشعورك."
    ],
    "help": [
      "Ask for help promptly. If you may harm yourself or your baby, get emergency help and stay with a trusted person.",
      "اطلبي المساعدة مبكرًا. إذا خشيت إيذاء نفسك أو طفلك، اطلبي الطوارئ وابقي مع شخص موثوق."
    ],
    "url": "https://www.nhs.uk/mental-health/conditions/postnatal-depression/"
  },
  {
    "id": "perimenopause",
    "title": [
      "Perimenopause",
      "مرحلة ما قبل انقطاع الطمث"
    ],
    "body": [
      "Hormonal changes can alter periods before they stop. Symptoms and timing vary. Changes should be discussed in the context of your health, not diagnosed by a calendar alone.",
      "قد تغيّر الهرمونات الدورة قبل توقفها. تختلف الأعراض والتوقيت. ناقشي التغيرات بحسب صحتك، ولا تعتمدي على التقويم وحده للتشخيص."
    ],
    "track": [
      "Record period changes and symptoms you want to discuss.",
      "دوّني تغيّرات الدورة والأعراض التي تريدين مناقشتها."
    ],
    "help": [
      "Book a review for troublesome symptoms or unexpectedly early changes.",
      "احجزي مراجعة للأعراض المزعجة أو التغيرات المبكرة غير المتوقعة."
    ],
    "url": "https://www.nhs.uk/conditions/menopause-and-perimenopause/"
  },
  {
    "id": "menopause-treatment",
    "title": [
      "Menopause treatment choices",
      "خيارات علاج أعراض انقطاع الطمث"
    ],
    "body": [
      "Hormonal and non-hormonal options can help menopause symptoms. The appropriate choice depends on your history, preferences and whether you have a womb.",
      "قد تساعد خيارات هرمونية وغير هرمونية في الأعراض. يعتمد الاختيار على تاريخك وتفضيلاتك ووجود الرحم."
    ],
    "track": [
      "Bring your symptoms, medicines and questions about benefits and risks.",
      "أحضري أعراضك وأدويتك وأسئلتك عن الفوائد والمخاطر."
    ],
    "help": [
      "Discuss treatment with a clinician. Herbal products are not automatically safe or effective.",
      "ناقشي العلاج مع المختص. المنتجات العشبية ليست آمنة أو فعالة تلقائيًا."
    ],
    "url": "https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/"
  },
  {
    "id": "postmenopausal-bleeding",
    "title": [
      "Bleeding after menopause",
      "النزف بعد انقطاع الطمث"
    ],
    "body": [
      "Bleeding after menopause needs assessment, even if it happens only once or is a small amount. Several causes are possible, including conditions that need prompt treatment.",
      "النزف بعد انقطاع الطمث يحتاج تقييمًا حتى لو حدث مرة واحدة أو كان قليلًا. له أسباب متعددة، منها حالات تحتاج علاجًا سريعًا."
    ],
    "track": [
      "Record the date, amount and any hormone treatment.",
      "دوّني التاريخ والكمية وأي علاج هرموني."
    ],
    "help": [
      "Arrange a medical appointment. Do not assume it is a period returning.",
      "رتّبي موعدًا طبيًا ولا تفترضي أنه عودة للدورة."
    ],
    "url": "https://www.nhs.uk/symptoms/post-menopausal-bleeding/"
  },
  {
    "id": "bone-health",
    "title": [
      "Bone health after menopause",
      "صحة العظام بعد انقطاع الطمث"
    ],
    "body": [
      "Bone loss can increase after menopause. Fracture risk also depends on medicines, previous fractures and other health factors.",
      "قد يزيد فقد العظم بعد انقطاع الطمث. يعتمد خطر الكسور أيضًا على الأدوية والكسور السابقة وعوامل صحية أخرى."
    ],
    "track": [
      "Bring your medicine list, fracture history and family history.",
      "أحضري قائمة الأدوية وتاريخ الكسور والتاريخ العائلي."
    ],
    "help": [
      "Ask whether you need a bone-health assessment and what exercise, nutrition or treatment suits you.",
      "اسألي عن الحاجة لتقييم العظام وما يناسبك من نشاط وتغذية أو علاج."
    ],
    "url": "https://www.nhs.uk/conditions/osteoporosis/"
  },
  {
    "id": "examination",
    "title": [
      "Your appointment and examination",
      "موعدك والفحص الطبي"
    ],
    "body": [
      "Ask what an examination or procedure involves, why it is recommended and what alternatives exist. Understanding and consent matter.",
      "اسألي عمّا يتضمنه الفحص أو الإجراء، وسبب التوصية به، والبدائل المتاحة. الفهم والموافقة مهمان."
    ],
    "track": [
      "Prepare questions and ask about privacy, a chaperone and communication needs.",
      "جهّزي أسئلتك واسألي عن الخصوصية والمرافق الطبي واحتياجات التواصل."
    ],
    "help": [
      "Tell the clinician if you are uncomfortable or want to pause. Local consent arrangements vary, especially for younger patients.",
      "أخبري المختص عند عدم الراحة أو الرغبة في التوقف. تختلف ترتيبات الموافقة محليًا، خصوصًا للصغيرات."
    ],
    "url": "https://www.nhs.uk/tests-and-treatments/consent-to-treatment/"
  }
];
const chapters=[
['growing','Growing up & first periods','النمو والدورة الأولى','01',['topic-first-period','topic-missed-periods','topic-examination','topic-hpv']],
['periods','Understanding my cycle','فهم دورتي','02',['topic-period-pain','topic-heavy-periods','topic-missed-periods','topic-pms','calc-cycle','fertility']],
['gyn','Everyday gynaecology','صحة النساء اليومية','03',['topic-pcos','topic-endometriosis','topic-fibroids','topic-cysts','topic-discharge','topic-uti']],
['sexual','Sexual health & contraception','الصحة الجنسية ومنع الحمل','04',['contraception','topic-emergency-contraception','topic-sti','topic-examination']],
['planning','Preparing for pregnancy','الاستعداد للحمل والإنجاب','05',['prep','fertility','calc-bmi','checker']],
['expecting','Pregnancy & my care','الحمل ومتابعتي','06',['pregnancy','checker','examples','topic-ectopic']],
['birth','Birth & pregnancy loss','الولادة وفقد الحمل','07',['topic-labour','bag','topic-pregnancy-loss','topic-ectopic']],
['after','After birth & feeding','بعد الولادة والرضاعة','08',['postpartum','breastfeeding','topic-postnatal-mood','calc-postpartum']],
['body','Breast & pelvic health','صحة الثدي والحوض','09',['topic-breast','topic-pelvic-floor','topic-uti']],
['transition','Perimenopause','ما قبل انقطاع الطمث','10',['topic-perimenopause','topic-menopause-treatment','topic-heavy-periods']],
['later','Menopause & beyond','انقطاع الطمث وما بعده','11',['topic-menopause-treatment','topic-postmenopausal-bleeding','topic-bone-health','topic-pelvic-floor']],
['prevention','Prevention & my appointments','الوقاية ومواعيدي','12',['topic-screening','topic-hpv','topic-examination','plan','calc-appointment']]
];
state.books=Array.isArray(state.books)?state.books:[];
function routeLabel(r){const t=lifeTopics.find(t=>'topic-'+t.id===r);if(t)return T(...t.title);const map={pregnancy:['Pregnancy dates & care journey','تواريخ الحمل ورحلة المتابعة'],fertility:['Cycle diary & fertility preparation','سجل الدورة والاستعداد للإنجاب'],prep:['Pre-pregnancy checklist','قائمة ما قبل الحمل'],contraception:['Compare contraception options','مقارنة وسائل منع الحمل'],postpartum:['Recovery after birth','التعافي بعد الولادة'],breastfeeding:['Breastfeeding support','دعم الرضاعة'],checker:['Medicine information demo','نموذج معلومات الدواء'],examples:['9 calculator examples','٩ أمثلة للحاسبات'],bag:['Hospital bag checklist','قائمة حقيبة الولادة'],plan:['My health plan','خطتي الصحية'],'calc-bmi':['Adult pre-pregnancy BMI','مؤشر الكتلة للبالغات قبل الحمل'],'calc-cycle':['Calculate cycle interval','حساب الفاصل بين الدورات'],'calc-postpartum':['Time since birth','الوقت منذ الولادة'],'calc-appointment':['Appointment countdown','العد التنازلي للموعد']};return map[r]?T(...map[r]):r;}
function chapterPage(id){const c=chapters.find(c=>c[0]===id);return head(T(c[1],c[2]),T('Choose a guide or tool. You can explore any chapter, at any age.','اختاري دليلًا أو أداة. يمكنك استكشاف أي مرحلة في أي عمر.'))+'<div class="cards spaced">'+c[4].map(r=>'<article class="panel"><h2>'+routeLabel(r)+'</h2><div class="actions">'+link(T('Open','افتحي'),r,'secondary')+'</div></article>').join('')+'</div><div class="actions">'+link(T('All topics','كل الموضوعات'),'index','secondary')+link(T('When to get help','متى أطلب المساعدة؟'),'urgent','secondary')+'</div>';}
function legacyTopicPage(id){const t=lifeTopics.find(t=>t.id===id);return head(T(...t.title),T('A short guide for understanding and preparing for care.','دليل مختصر للفهم والاستعداد للرعاية.'))+'<article class="panel spaced"><h2>'+T('What to know','ما الذي ينبغي معرفته؟')+'</h2><p>'+T(...t.body)+'</p><h2 class="spaced">'+T('What to note','ما الذي أدوّنه؟')+'</h2><p>'+T(...t.track)+'</p><div class="notice"><h3>'+T('Getting help','طلب المساعدة')+'</h3><p>'+T(...t.help)+'</p></div><div class="actions">'+button((state.books||[]).includes(id)?T('Saved guide','دليل محفوظ'):T('Save guide','احفظي الدليل'),'bookmark-topic','secondary','data-topic="'+id+'" aria-pressed="'+(state.books||[]).includes(id)+'"')+button(T('Add a question to my plan','أضيفي سؤالًا لخطتي'),'topic-question','primary','data-topic="'+id+'"')+'</div><div class="source"><a href="'+t.url+'" target="_blank" rel="noopener">'+T('NHS source — internet needed','مصدر NHS بالإنجليزية — يحتاج اتصالًا')+'</a><p>'+T('Source checked 3 Oct 2026. Summary and Arabic translation await clinical review. Local care pathways may differ.','تم التحقق من المصدر ٣ أكتوبر ٢٠٢٦. الملخص والترجمة العربية بانتظار المراجعة الطبية. قد تختلف مسارات الرعاية المحلية.')+'</p></div></article><div class="actions">'+link(T('All topics','كل الموضوعات'),'index','secondary')+link(T('When to get help','متى أطلب المساعدة؟'),'urgent','secondary')+'</div>';}
function legacyUrgentPage(){return '<div style="background:#c0392b;color:#fff;border-radius:14px;padding:18px 22px;margin-bottom:24px;display:flex;gap:14px;align-items:center"><span style="font-size:28px">🆘</span><div><strong style="font-size:16px">'+T('If you are in immediate danger — call emergency services now','إذا كنتِ في خطر فوري — اتصلي بخدمات الطوارئ الآن')+'</strong><p style="margin:4px 0 0;font-size:13px;opacity:.9">'+T('UK: 999 · UAE/KSA: 911 or 997 · International: local emergency number','المملكة المتحدة: 999 · الإمارات/السعودية: 997 أو 911 · دوليًا: رقم الطوارئ المحلي')+'</p></div></div>'+head(T('When to get help','متى أطلب المساعدة؟'),T('Do not wait for a calculator result when you are unwell. This list is not exhaustive.','لا تنتظري نتيجة الحاسبة إذا كنتِ متعبة. هذه القائمة ليست شاملة.'))+'<section class="panel spaced"><h2>'+T('Emergency help now','مساعدة طارئة الآن')+'</h2><p>'+T('Get emergency care for collapse, severe breathing difficulty, chest pain, or severe abdominal pain with faintness. Heavy bleeding with feeling faint also needs emergency care. Use your local emergency service.','اطلبي الطوارئ عند الانهيار أو صعوبة التنفس الشديدة أو ألم الصدر أو ألم البطن الشديد مع الشعور بالإغماء. كذلك النزف الغزير مع الدوخة أو الإغماء يستدعي الطوارئ. استخدمي خدمة الطوارئ المحلية.')+'</p><h2 class="spaced">'+T('During pregnancy or after birth','أثناء الحمل أو بعد الولادة')+'</h2><p>'+T('Seek immediate care for a severe persistent headache, vision changes, fever, severe pain, fluid leaking or bleeding, or reduced baby movements. Tell the team if you are pregnant or were pregnant within the last year.','اطلبي رعاية فورية عند صداع شديد مستمر أو تغيرات النظر أو حرارة أو ألم شديد أو تسرب سائل أو نزف أو نقص حركة الجنين. أخبري الفريق إذا كنتِ حاملًا أو كنتِ حاملًا خلال السنة الماضية.')+'</p><p class="source"><a href="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" target="_blank" rel="noopener">CDC — '+T('maternal warning signs (internet needed)','علامات الخطر للأمهات (يحتاج اتصالًا)')+'</a></p><h2 class="spaced">'+T('Do not ignore these changes','لا تتجاهلي هذه التغيرات')+'</h2><div class="actions">'+link(T('Bleeding after menopause','النزف بعد انقطاع الطمث'),'topic-postmenopausal-bleeding','secondary')+link(T('A new breast lump','كتلة جديدة بالثدي'),'topic-breast','secondary')+link(T('Possible ectopic pregnancy','احتمال الحمل خارج الرحم'),'topic-ectopic','secondary')+'</div></section>';}
document.addEventListener('input',e=>{if(e.target.id==='life-search'){const q=e.target.value.trim().toLocaleLowerCase();let n=0;document.querySelectorAll('[data-topic-search]').forEach(x=>{x.hidden=!x.dataset.topicSearch.toLocaleLowerCase().includes(q);if(!x.hidden)n++;});$('#life-empty').hidden=n>0;}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;if(a==='bookmark-topic'){state.books=state.books||[];const id=b.dataset.topic;state.books=(state.books||[]).includes(id)?state.books.filter(x=>x!==id):state.books.concat(id);save();render();}if(a==='topic-question'){const t=lifeTopics.find(t=>t.id===b.dataset.topic);state.questions.push(['What should I know or do about '+t.title[0]+'?','ما الذي ينبغي أن أعرفه أو أفعله بشأن '+t.title[1]+'؟']);save();toast(T('Question added to My plan.','أُضيف السؤال إلى خطتي.'));}if(a==='check-runtime')$('#runtime-result').textContent=T('Interactive mode is running: 6 × 7 = 42. Now test a calculator in Airplane Mode.','الوضع التفاعلي يعمل: ٦ × ٧ = ٤٢. جرّبي الآن حاسبة في نمط الطيران.');});
