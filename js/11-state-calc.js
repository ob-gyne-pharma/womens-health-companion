/* Women & Families 2026.10.31-r17 | js/11-state-calc.js
   State restore/save, date calculators, plan/summary.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

// Release r6: recovery, explicit sample mode and validated numerical inputs.
function asciiDigits(v){return String(v??'').replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/٫/g,'.').replace(/٬/g,'').trim();}
function numericValue(v){const s=asciiDigits(v);return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):NaN;}
let exampleSession=null,exampleResult=null,toolPractice=null;
const toolExampleFields={bmi:['height','weight','bmiEligible'],cycle:['cycleFirst','cycleNext'],postpartum:['birthDate'],appointment:['countDate']};
const exampleFields=['datemode','datevalue','cyclelength','embryo','irregular','parity','care'];
function personalForms(){const f={...state.forms};if(exampleSession)for(const k of exampleFields){if(Object.prototype.hasOwnProperty.call(exampleSession,k))f[k]=exampleSession[k];else delete f[k];}if(toolPractice)for(const k of toolExampleFields[toolPractice.kind]){if(Object.prototype.hasOwnProperty.call(toolPractice.fields,k))f[k]=toolPractice.fields[k];else delete f[k];}return f;}
function save(){if(!state.save)return;try{const saved={...state,forms:personalForms()};const payload=JSON.stringify({version:1,state:saved});const usedKB=Math.round(payload.length/1024);if(usedKB>3500){toast(T('Your plan is getting large. Consider exporting before it reaches the device limit.','خطتك أصبحت كبيرة. فكّري في تصديرها قبل أن تصل للحد الأقصى.'));}localStorage.setItem(KEY,payload);storageRepair=false;}catch(e){state.save=false;toast(T('Saving failed. Keep this page open and export your plan before closing it.','تعذّر الحفظ. أبقي الصفحة مفتوحة وصدّري خطتك قبل إغلاقها.'));}}
function estimatePregnancy(f,now=today()){
 const mode=f.datemode||'lmp',n=parse(f.datevalue);if(!['lmp','edd','ivf'].includes(mode))throw Error(T('Choose a supported dating method.','اختاري طريقة حساب مدعومة.'));
 if(!Number.isFinite(n))throw Error(T('Enter a valid date.','أدخلي تاريخًا صحيحًا.'));
 let due;
 if(mode==='lmp'){if(f.irregular)throw Error(T('For irregular cycles, use a clinician-provided date.','للدورة غير المنتظمة استخدمي تاريخًا يحدده المختص.'));const cycle=f.cyclelength===''||f.cyclelength===undefined?28:numericValue(f.cyclelength);if(!Number.isInteger(cycle)||cycle<21||cycle>35)throw Error(T('Enter a regular cycle length of 21–35 days.','أدخلي طول دورة منتظمة بين ٢١ و٣٥ يومًا.'));if(n>now)throw Error(T('The last period cannot be in the future.','لا يمكن أن تكون آخر دورة في المستقبل.'));due=n+(280+cycle-28)*DAY;
 }else if(mode==='ivf'){const embryo=f.embryo===undefined||f.embryo===''?5:numericValue(f.embryo);if(![3,5].includes(embryo))throw Error(T('Choose a day-3 or day-5 embryo.','اختاري جنين اليوم الثالث أو الخامس.'));if(n>now)throw Error(T('Use a completed transfer date.','استخدمي تاريخ نقل تم بالفعل.'));due=n+(266-embryo)*DAY;}else due=n;
 const days=Math.round(280-(due-now)/DAY);if(!Number.isFinite(days)||days<0||days>301)throw Error(T('The date is outside the supported 0–43 week range. Check it with your maternity team.','التاريخ خارج نطاق صفر إلى ٤٣ أسبوعًا. تحققي منه مع فريق الرعاية.'));return {due,days,mode};
}
function calculate(){const r=estimatePregnancy(state.forms);if(exampleSession){exampleResult=r;return r;}state.edd=iso(r.due);state.method=r.mode;state.dueResult={days:r.days};save();return r;}
function loadExample(id){
 const pregnancyExample=['lmp28','lmp30','edd','ivf5','ivf3'].includes(id);
 if(!pregnancyExample&&!Object.prototype.hasOwnProperty.call(toolExampleFields,id))return;
 if(toolPractice||(!pregnancyExample&&exampleSession))exitExample();
 if(pregnancyExample){if(!exampleSession){exampleSession={};for(const k of exampleFields)if(Object.prototype.hasOwnProperty.call(state.forms,k))exampleSession[k]=state.forms[k];}exampleResult=null;}
 else{const fields={};for(const k of toolExampleFields[id])if(Object.prototype.hasOwnProperty.call(state.forms,k))fields[k]=state.forms[k];toolPractice={kind:id,fields};}
 legacyLoadExample(id);
 if(page===(pregnancyExample?'pregnancy':'calc-'+id))render();
}
function exitExample(){if(!exampleSession&&!toolPractice)return;state.forms=personalForms();exampleSession=null;exampleResult=null;toolPractice=null;toolResult=null;save();}
function toolPracticeBanner(){return '<section class="notice sample-banner"><h2>'+T('Practice example — your information is protected','مثال للتجربة — معلوماتك محفوظة')+'</h2><p>'+T('Example inputs and results are temporary. They are not saved as your personal information.','مدخلات المثال ونتائجه مؤقتة ولا تُحفظ كمعلوماتك الشخصية.')+'</p>'+button(T('Return to my information','العودة إلى معلوماتي'),'exit-example','secondary')+'</section>';}
function calcScreen(kind){const html=legacyCalcScreen(kind);return toolPractice?.kind===kind?html.replace('<section class="panel spaced">',toolPracticeBanner()+'<section class="panel spaced">'):html;}
function pregnancyInputsChanged(){if(exampleSession||!state.edd)return false;try{const r=estimatePregnancy(state.forms);return iso(r.due)!==state.edd||r.mode!==state.method;}catch(e){return true;}}
function previousPregnancyNotice(){return '<p class="notice caution" role="status">'+T('Inputs changed — calculate again. The result and timeline below use your previously calculated date; your saved plan has not changed.','تغيّرت المدخلات — أعيدي الحساب. تستخدم النتيجة والمراحل أدناه التاريخ المحسوب سابقًا؛ لم تتغيّر خطتك المحفوظة.')+'</p>';}
function refreshPregnancyResult(e){if(!exampleSession&&page==='pregnancy'&&exampleFields.includes(e.target.dataset.field)){const result=$('#pregnancy-result');if(result){const wrap=document.createElement('div');wrap.innerHTML=dueSummary();result.replaceWith(wrap.firstElementChild);}}}
document.addEventListener('input',refreshPregnancyResult);
document.addEventListener('change',refreshPregnancyResult);
function sampleBanner(){return '<section class="notice sample-banner"><h2>'+T('Practice example — your pregnancy plan is protected','مثال للتجربة — خطة حملك محفوظة')+'</h2><p>'+T('These inputs and results do not replace your saved due date. Return to your own dates to update your plan.','هذه المدخلات والنتائج لا تستبدل موعد ولادتك المحفوظ. عودي لتواريخك لتحديث خطتك.')+'</p>'+button(T('Return to my own dates','العودة إلى تواريخي'),'exit-example','secondary')+'</section>';}
function archiveTools(){return '<section class="panel spaced"><h2>'+T('Correct an archived pregnancy','تصحيح حمل مؤرشف')+'</h2><p>'+T('Reopen only if it was closed by mistake. An active pregnancy cannot be overwritten.','أعيدي الفتح فقط إذا أُغلق بالخطأ. لا يمكن استبدال حمل نشط.')+'</p>'+archived().map((x,i)=>'<details><summary>'+T('Pregnancy closed on ','حمل أُغلق في ')+date(parse(x.ended))+'</summary><p>'+T('Reopening removes this archive entry and restores its due-date estimate. Check your current care plan afterwards.','إعادة الفتح تزيل هذا الإدخال من الأرشيف وتعيد موعد الولادة التقديري. راجعي خطة رعايتك بعدها.')+'</p>'+button(T('Confirm reopening','تأكيد إعادة الفتح'),'restore-pregnancy','secondary','data-archive="'+i+'" '+(state.edd?'disabled':''))+'</details>').join('')+'<p id="restore-error" role="alert"></p></section>';}
function restorePregnancy(index){if(state.edd)throw Error(T('Close or correct the active pregnancy first.','أغلقي الحمل النشط أو صححيه أولًا.'));const item=archived()[index];if(!Number.isInteger(index)||!item)throw Error(T('Archive entry not found.','لم يوجد الإدخال المؤرشف.'));state.edd=item.edd;state.method=item.method;state.forms.datemode='edd';state.forms.datevalue=item.edd;if(item.outcome==='birth'&&state.forms.birthDate===item.ended)delete state.forms.birthDate;state.pregnancyArchive.splice(index,1);state.stage='pregnancy';save();}
function summary(){let text=legacySummary();if(archived().length){text+='\n\n'+T('Archived pregnancies (entered by me)','حالات حمل مؤرشفة (أدخلتُها بنفسي)');for(const a of archived())text+='\n'+T('Closed: ','أُغلق: ')+date(parse(a.ended))+T(' · Previous EDD: ',' · الموعد التقديري السابق: ')+date(parse(a.edd));}return text+personalJourneySummary();}
function plan(){return '<div class="actions">'+link(T('Encrypted backup & restore','نسخ احتياطي مشفّر واستعادة'),'backup','secondary')+'</div>'+legacyPlan().replace('<div class="split">',visitPreparation()+'<div class="split">')+(archived().length?lifecyclePanel()+archiveTools():'');}
function downloadPlan(){const u=URL.createObjectURL(new Blob([summary()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='my-private-health-plan.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),10000);toast(T('Private plan prepared. Store or share it only where you intend.','تم تجهيز الخطة الخاصة. احفظيها أو شاركيها فقط حيث ترغبين.'));}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;if(b.dataset.action==='exit-example'){exitExample();render();}if(b.dataset.action==='download-plan')downloadPlan();if(b.dataset.action==='restore-pregnancy'){try{restorePregnancy(Number(b.dataset.archive));render();toast(T('Pregnancy reopened. Please review its dates.','أُعيد فتح الحمل. راجعي تواريخه.'));}catch(err){$('#restore-error').textContent=err.message;}}});

function invalidatePracticeResult(e){if(exampleSession&&exampleFields.includes(e.target.dataset.field)){exampleResult=null;const output=$('#pregnancy-result');if(output)output.textContent=T('Inputs changed. Calculate the example again.','تغيرت المدخلات. أعيدي حساب المثال.');}}
document.addEventListener('input',invalidatePracticeResult);
document.addEventListener('change',invalidatePracticeResult);
document.addEventListener('click',e=>{const b=e.target.closest('[data-action="calculate"]');if(b&&!$('#calc-error')?.textContent){const output=$('#pregnancy-result');if(output){output.focus({preventScroll:true});output.scrollIntoView({block:'nearest'});}}});
