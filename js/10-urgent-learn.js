/* Women & Families 2026.11.01-r21 | js/10-urgent-learn.js
   Urgent signs, pregnancy lifecycle, learn pages.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* AUDIT-START */
// Shared source of urgent guidance. Both the urgent screen and maternal guide use this.
const urgentSigns=[
 ['Chest pain, serious breathing difficulty, collapse or fainting.','ألم الصدر أو صعوبة التنفس الشديدة أو الانهيار أو الإغماء.'],
 ['Severe or worsening abdominal pain; heavy bleeding, especially with weakness or faintness.','ألم بطن شديد أو متفاقم؛ نزف غزير خصوصًا مع الضعف أو الدوخة.'],
 ['In pregnancy or after birth: persistent severe headache, vision changes, fever, or marked swelling of the face or hands.','أثناء الحمل أو بعد الولادة: صداع شديد مستمر أو تغير النظر أو حرارة أو تورم واضح بالوجه أو اليدين.'],
 ['One-sided painful or swollen leg or arm; severe vomiting or inability to keep fluids down.','ألم أو تورم بطرف واحد؛ قيء شديد أو عدم القدرة على الاحتفاظ بالسوائل.'],
 ['Vaginal bleeding or fluid leaking in pregnancy, or baby movements that slow or stop.','نزف مهبلي أو تسرب سائل أثناء الحمل، أو انخفاض حركة الجنين أو توقفها.'],
 ['Thoughts of harming yourself or your baby: seek urgent professional support. If anyone is in immediate danger, get emergency help now.','أفكار إيذاء نفسك أو طفلك: اطلبي دعمًا مهنيًا عاجلًا. عند وجود خطر فوري على أي شخص اطلبي الطوارئ الآن.']
];
function urgentBlock(){return '<section class="notice caution shared-urgent"><h2>'+T('Urgent symptoms: act now','أعراض عاجلة: تصرّفي الآن')+'</h2><ul>'+urgentSigns.map(x=>'<li>'+T(...x)+'</li>').join('')+'</ul><p>'+T('Contact emergency or maternity care promptly. Do not wait for an app result or your next appointment. Mention any pregnancy within the past year. This list is not exhaustive; seek care if something feels seriously wrong.','تواصلي سريعًا مع الطوارئ أو قسم الولادة. لا تنتظري نتيجة التطبيق أو الموعد المقبل. اذكري أي حمل خلال السنة الماضية. القائمة ليست شاملة؛ اطلبي الرعاية إذا شعرتِ بوجود مشكلة خطيرة.')+'</p><a href="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" target="_blank" rel="noopener">CDC — '+T('Maternal warning signs (internet)','علامات الخطر للأمهات (إنترنت)')+'</a></section>';}
/* Emergency numbers. The app never guesses a country from the language: the user chooses.
   Sources: several independent public lists agree on these (Wikipedia "List of emergency telephone numbers", national
   government travel tables). Countries whose sources disagree (Kuwait, Jordan, Lebanon, Iraq) are deliberately NOT listed.
   Re-verify against official government sources before relying on or extending this list. */
const EMERGENCY_NUMBERS=[
  ['eg',['Egypt','مصر'],'123',['Police 122','الشرطة 122']],
  ['sa',['Saudi Arabia','السعودية'],'997',['Unified emergency number 911','رقم الطوارئ الموحد 911']],
  ['ae',['United Arab Emirates','الإمارات'],'998',['Police 999 · 112 from mobile phones','الشرطة 999 · 112 من الهواتف المحمولة']],
  ['qa',['Qatar','قطر'],'999',['112 also works from mobile phones','يعمل 112 أيضاً من الهواتف المحمولة']],
  ['bh',['Bahrain','البحرين'],'999',['','']],
  ['om',['Oman','عُمان'],'9999',['','']],
  ['gb',['United Kingdom','المملكة المتحدة'],'999',['112 also works','يعمل 112 أيضاً']],
  ['eu',['European Union','الاتحاد الأوروبي'],'112',['','']],
  ['us',['United States and Canada','الولايات المتحدة وكندا'],'911',['','']]
];
let emergencyChoice='';
function emergencyResult(){
  const c=EMERGENCY_NUMBERS.find(x=>x[0]===emergencyChoice),l=state.lang==='ar'?1:0;
  if(!c)return esc(T('If your country is not listed, call your local emergency number. In many countries 112 also works from a mobile phone.','إذا لم يكن بلدك في القائمة، اتصلي برقم الطوارئ المحلي. في كثير من البلدان يعمل الرقم 112 أيضاً من الهاتف المحمول.'));
  return '<span class="em-num" dir="ltr">'+esc(c[2])+'</span> <span>'+esc(T('Ambulance and emergency medical help','الإسعاف والمساعدة الطبية الطارئة'))+'</span>'+(c[3][l]?'<span class="em-note">'+esc(c[3][l])+'</span>':'');
}
function emergencyBox(){
  const l=state.lang==='ar'?1:0;
  return '<section class="emergency-box" aria-labelledby="em-title"><h2 id="em-title">'+esc(T('In an emergency, call now','في حالة الطوارئ، اتصلي فوراً'))+'</h2>'
  +'<label for="em-country">'+esc(T('Choose your country to see its emergency number','اختاري بلدك لعرض رقم الطوارئ فيه'))+'</label>'
  +'<select id="em-country"><option value="">'+esc(T('Choose your country','اختاري بلدك'))+'</option>'+EMERGENCY_NUMBERS.map(c=>'<option value="'+c[0]+'"'+(c[0]===emergencyChoice?' selected':'')+'>'+esc(c[1][l])+'</option>').join('')+'</select>'
  +'<p id="em-result" class="em-result" aria-live="polite">'+emergencyResult()+'</p>'
  +'<details class="em-list"><summary>'+esc(T('See all numbers','عرض كل الأرقام'))+'</summary><ul>'+EMERGENCY_NUMBERS.map(c=>'<li>'+esc(c[1][l])+': <strong dir="ltr">'+esc(c[2])+'</strong></li>').join('')+'</ul></details>'
  +'<p class="em-small">'+esc(T('Numbers can change. We do not guess your country from your language.','قد تتغير الأرقام. لا نخمّن بلدك من لغة التطبيق.'))+'</p></section>';
}
function emergencyCards(){
  return '<div class="em-cards"><a class="em-card" href="#symptoms"><strong>'+esc(T('Symptom checker','فاحص الأعراض'))+'</strong><span>'+esc(T('Red · Amber · Green','أحمر · برتقالي · أخضر'))+'</span></a>'
  +'<a class="em-card" href="#checker"><strong>'+esc(T('Medicine checker','فاحص الأدوية'))+'</strong><span>'+esc(T('Medicines in pregnancy and breastfeeding','الأدوية في الحمل والرضاعة'))+'</span></a></div>';
}
document.addEventListener('change',e=>{
  if(e.target&&e.target.id==='em-country'){
    emergencyChoice=e.target.value;
    const r=document.getElementById('em-result');
    if(r)r.innerHTML=emergencyResult();
  }
});
function urgentPage(){return head(T('When to get help','متى أطلب المساعدة؟'),T('Use your local emergency service. No emergency number has been inferred from your language.','استخدمي خدمة الطوارئ المحلية. لا نحدد رقم الطوارئ من لغة التطبيق.'))+emergencyBox()+emergencyCards()+urgentBlock()+'<div class="actions">'+link(T('Bleeding after menopause','نزف بعد انقطاع الطمث'),'topic-postmenopausal-bleeding','secondary')+link(T('A new breast lump','كتلة جديدة بالثدي'),'topic-breast','secondary')+link(T('Safety and support','السلامة والدعم'),'topic-safety-support','secondary')+'</div>';}
const archived=()=>Array.isArray(state.pregnancyArchive)?state.pregnancyArchive:[];
function dueSummary(){if(exampleSession)return exampleResult?'<div id="pregnancy-result" tabindex="-1" role="status"><h2>'+T('Example result','نتيجة المثال')+'</h2><p>'+date(exampleResult.due)+'</p><p>'+numberText(Math.floor(exampleResult.days/7))+' + '+numberText(exampleResult.days%7)+' '+T('weeks + days','أسابيع + أيام')+'</p></div>':'<div id="pregnancy-result" tabindex="-1" role="status"><p>'+T('Calculate the example to see its result.','احسبي المثال لعرض نتيجته.')+'</p></div>';if(!state.edd)return '<p class="empty">'+T('No active pregnancy estimate. Calculate below when you want to start a pregnancy plan.','لا يوجد تقدير حمل نشط. احسبي عندما ترغبين في بدء خطة حمل.')+'</p>';const d=parse(state.edd),days=Math.round(280-(d-today())/DAY);if(!Number.isFinite(days)||days<0||days>301)return '<p class="notice caution">'+T('This saved estimate is outside the supported pregnancy range. Check the date with your team or archive the pregnancy below. No current pregnancy week is displayed.','التقدير المحفوظ خارج نطاق الحمل المدعوم. تحققي من التاريخ مع الفريق أو أرشفي الحمل أدناه. لا نعرض أسبوع حمل حاليًا.')+'</p>';return '<div id="pregnancy-result" tabindex="-1" role="status">'+(pregnancyInputsChanged()?previousPregnancyNotice():'')+legacyDueSummary()+'</div>';}
function lifecyclePanel(){return '<section class="panel spaced"><h2>'+T('Manage this pregnancy','إدارة هذا الحمل')+'</h2><p>'+T('Closing a pregnancy stops its counter. Your questions and booked appointments remain in My plan; review them separately. No one is notified.','إغلاق الحمل يوقف عداده. تبقى الأسئلة والمواعيد في خطتي؛ راجعيها بشكل منفصل. لا يُرسل إشعار لأي جهة.')+'</p>'+(state.edd?'<details><summary>'+T('Pregnancy ended / baby born','انتهى الحمل / وُلد الطفل')+'</summary><div class="formgrid">'+field('pregnancyEndDate',T('Date pregnancy ended','تاريخ انتهاء الحمل'),'date')+select('pregnancyOutcome',T('Next support (optional)','الدعم التالي (اختياري)'),[['private',T('Prefer not to say','أفضل عدم ذكر السبب')],['birth',T('After birth','بعد الولادة')],['loss',T('Pregnancy loss / ended pregnancy','فقد الحمل / انتهاء الحمل')]],'private')+'</div><p>'+T('Confirm only when this pregnancy has ended. This stores an archive on this device only if you enabled saving.','أكّدي فقط بعد انتهاء هذا الحمل. تُحفظ الأرشفة على الجهاز فقط عند تفعيل الحفظ.')+'</p>'+button(T('Confirm and archive this pregnancy','تأكيد وأرشفة هذا الحمل'),'archive-pregnancy','secondary')+'<p id="archive-error" role="alert"></p></details>':'')+'<h3>'+T('Previous pregnancies','حالات الحمل السابقة')+'</h3>'+(archived().length?'<ul>'+archived().map(x=>'<li>'+T('Closed: ','أُغلق: ')+date(parse(x.ended))+T(' · Previous estimated due date: ',' · موعد الولادة التقديري السابق: ')+date(parse(x.edd))+'</li>').join('')+'</ul>':'<p>'+T('No archived pregnancies.','لا توجد حالات حمل مؤرشفة.')+'</p>')+'</section>';}
function archivePregnancy(){const n=parse(state.forms.pregnancyEndDate),d=parse(state.edd);if(exampleSession||!Number.isFinite(d)||!state.edd||!Number.isFinite(n)||n>today()||n<d-280*DAY)throw Error(T('Enter an end date within this pregnancy and not in the future. Check the saved estimate if the dates do not fit.','أدخلي تاريخ انتهاء خلال هذا الحمل وليس في المستقبل. تحققي من التقدير المحفوظ إن لم تتوافق التواريخ.'));const outcome=['private','birth','loss'].includes(state.forms.pregnancyOutcome)?state.forms.pregnancyOutcome:'private';state.pregnancyArchive=[...archived(),{edd:state.edd,method:state.method,ended:iso(n),outcome}];state.edd='';state.method='';state.dueResult=null;for(const k of ['datevalue','pregnancyEndDate','pregnancyOutcome','parity','care'])delete state.forms[k];if(outcome==='birth'){state.forms.birthDate=iso(n);state.stage='postpartum';}else state.stage='prep';save();return outcome;}
function pregnancy(){const body=legacyPregnancy();return exampleSession?body.replace('<div class="split spaced">',sampleBanner()+'<div class="split spaced">').replace(T('Calculate and update my timeline','احسبي وحدّثي جدولي'),T('Calculate practice example','احسبي مثال التجربة')):body+lifecyclePanel()+(archived().length?archiveTools():'');}
function timeline(){if(exampleSession){if(!exampleResult)return '<p>'+T('Example milestones appear after calculating.','تظهر مراحل المثال بعد الحساب.')+'</p>';const own=state.edd;state.edd=iso(exampleResult.due);try{return legacyTimeline();}finally{state.edd=own;}}if(state.edd){const days=Math.round(280-(parse(state.edd)-today())/DAY);if(!Number.isFinite(days)||days<0||days>301)return '<p class="notice">'+T('Dated milestones are paused until you correct or close this pregnancy.','توقفت المراحل المؤرخة حتى تصحيح هذا الحمل أو إغلاقه.')+'</p>';}return legacyTimeline();}
function reviewMetadata(){return '<details class="panel spaced"><summary>'+T('About this information','حول هذه المعلومات')+'</summary><dl><dt>'+T('Editorial update','التحديث التحريري')+'</dt><dd>'+T('4 October 2026','٤ أكتوبر ٢٠٢٦')+'</dd><dt>'+T('Clinical reviewer','المراجع الطبي')+'</dt><dd>'+T('Not assigned — approval pending','لم يُعيّن — الاعتماد قيد الانتظار')+'</dd><dt>'+T('Arabic language review','المراجعة اللغوية العربية')+'</dt><dd>'+T('Pending','قيد الانتظار')+'</dd><dt>'+T('Next editorial review target','الموعد المستهدف للمراجعة التحريرية')+'</dt><dd>'+T('4 January 2027','٤ يناير ٢٠٢٧')+' · '+T('earlier for reported errors','أبكر عند الإبلاغ عن أخطاء')+'</dd><dt>'+T('Country applicability','النطاق الجغرافي')+'</dt><dd>'+T('General education. No country edition has been clinically approved.','تثقيف عام. لا توجد نسخة بلد معتمدة طبيًا.')+'</dd></dl><p>'+T('Sources are linked below each guide. Publication is not clinical approval. Updates and corrections require another content review.','المصادر مرتبطة بكل دليل. النشر لا يعني الاعتماد الطبي. التحديثات والتصحيحات تحتاج مراجعة محتوى أخرى.')+'</p>'+link(T('Report a content problem','الإبلاغ عن مشكلة بالمحتوى'),'feedback','secondary')+'</details>';}
function topicPage(id){let html=expandedTopicPage(id);if(id==='maternal-warning')html=html.replace(/<section class="notice caution deep-help">[\s\S]*?<\/section>/,urgentBlock());else if(['pregnancy-care','recovery-care','pregnancy-complications'].includes(id))html+=urgentBlock();return html+extraSupport(id)+reviewMetadata();}
function learn(){return topicIndex();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action="archive-pregnancy"]');if(!b)return;try{const outcome=archivePregnancy();render();toast(T('Pregnancy archived.','تمت أرشفة الحمل.'));if(outcome==='birth')location.hash='postpartum';else if(outcome==='loss')location.hash='topic-pregnancy-loss';}catch(err){$('#archive-error').textContent=err.message;}});

function lifeHome(){return legacyLifeHomeR4()+'<section class="panel spaced"><h2>'+T('Step-by-step care pathways','مسارات الرعاية خطوة بخطوة')+'</h2><div class="cards">'+newGuides.filter(x=>x.sections).map(x=>'<article><h3>'+T(...x.title)+'</h3>'+link(T('Explore the pathway','استكشفي المسار'),'topic-'+x.id,'secondary')+'</article>').join('')+'</div></section>';}
