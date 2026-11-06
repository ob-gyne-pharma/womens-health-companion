/* Women & Families 2026.11.05-r24 | js/20-search.js
   Whole-app search on the home page: guides, tools and sections, English and Arabic.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* The search box markup is globalSearchBox() in 14-home-more.js. This file only adds behaviour,
   through document-level event handlers, so it keeps working however often the home page is redrawn. */
(function(){
  const AR=/[\u0600-\u06FF]/;
  const lang=()=>state.lang==='ar'?1:0;
  const byId=id=>document.getElementById(id);

  /* Spelling-tolerant text: lower case, no Arabic diacritics or tatweel, alef/ya/ta-marbuta variants merged,
     punctuation removed. "ألم", "الم" and "الألم" all match each other. */
  const norm=s=>String(s==null?'':s).toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g,'')
    .replace(/[\u0623\u0625\u0622\u0671]/g,'\u0627')
    .replace(/\u0649/g,'\u064A').replace(/\u0629/g,'\u0647')
    .replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  /* Light stemming so "periods" finds "period" and "الحمل" finds "حمل". Applied to the query and the index alike. */
  const stem=w=>AR.test(w)
    ?(w.length>4&&w.startsWith('\u0627\u0644')?w.slice(2):w)
    :(w.length>3&&w.endsWith('s')&&!w.endsWith('ss')?w.slice(0,-1):w);
  const toWords=s=>norm(s).split(' ').filter(Boolean).map(stem);
  const field=(w,text)=>({w,words:toWords(text)});
  const flat=v=>Array.isArray(v)?v.map(flat).join(' '):typeof v==='string'?v:v&&typeof v==='object'?Object.values(v).map(flat).join(' '):'';

  /* Everyday words people actually type, mapped to the guide that answers them. */
  const SYN={
    'period-pain':['period pain painful periods cramps cramping dysmenorrhoea dysmenorrhea','تقلصات مغص'],
    'heavy-periods':['menorrhagia flooding clots soaking','غزارة'],
    'missed-periods':['late period no period amenorrhoea irregular','تاخر'],
    'pcos':['polycystic ovaries ovary irregular acne hair','تكيس'],
    'discharge':['thrush itching smell vaginal itch','افرازات'],
    'uti':['cystitis burning urine bladder wee','التهاب المسالك'],
    'sti':['std sexually transmitted chlamydia gonorrhoea herpes','عدوى'],
    'emergency-contraception':['morning after pill plan b unprotected sex','حبوب الطوارئ'],
    'labour':['contractions waters breaking giving birth','مخاض'],
    'perimenopause':['hot flushes hot flashes night sweats','هبات'],
    'menopause-treatment':['hrt hormone replacement hot flushes hot flashes','هبات'],
    'postnatal-mood':['depression baby blues anxiety low mood','اكتئاب'],
    'pregnancy-loss':['miscarriage bleeding early pregnancy','اجهاض'],
    'ectopic':['tubal pregnancy one sided pain','خارج الرحم'],
    'bone-health':['osteoporosis calcium vitamin d fracture','هشاشه'],
    'screening':['smear cervical cancer pap test','مسحه'],
    'breast':['lump mammogram nipple','كتله'],
    'feeding-problems':['breastfeeding nursing latch milk supply mastitis sore nipples',''],
    'pelvic-floor':['incontinence leaking prolapse','سلس'],
    'pain-sex':['dyspareunia painful intercourse sex hurts','جماع']
  };
  const TYPES={guide:['Guide','دليل'],tool:['Tool','أداة'],help:['Urgent','عاجل'],section:['Section','قسم']};

  /* Tools and sections: [route, kind, [English, Arabic], extra English words, extra Arabic words]. Names are the ones the app already uses. */
  const PAGES=[
    ['urgent','help',['Urgent help \u2014 when to seek help','متى تطلبين المساعدة'],'emergency urgent severe heavy bleeding faint fever chest pain danger warning signs reduced movements 999 911 ambulance','طوارئ عاجل نزيف شديد الم شديد حمى اغماء خطر'],
    ['checker','tool',['Medicine checker','فاحص الأدوية'],'medicine medication drug tablets pills safe pregnancy breastfeeding paracetamol ibuprofen antibiotic','دواء ادوية حبوب حمل رضاعه'],
    ['plan','tool',['My health plan','خطتي الصحية'],'plan summary questions appointment notes print share','خطه ملخص اسئله موعد'],
    ['diary','tool',['My diary','يومياتي'],'diary log symptoms track record notes journal','مذكرات سجل اعراض'],
    ['bag','tool',['My medicines bag','حقيبة أدويتي'],'medicines list medication bag pills','ادويه'],
    ['tools','tool',['All tools','كل الأدوات'],'calculators tools','حاسبات ادوات'],
    ['calc-bmi','tool',['BMI calculator','حاسبة مؤشر كتلة الجسم'],'weight height body mass index','وزن طول كتله'],
    ['calc-cycle','tool',['Cycle calculator','حاسبة الدورة'],'period ovulation fertile window next period due date cycle length','تبويض خصوبه موعد الدوره'],
    ['calc-postpartum','tool',['Postpartum calculator','حاسبة ما بعد الولادة'],'after birth recovery weeks','نفاس'],
    ['calc-appointment','tool',['Appointment planner','مخطط المواعيد'],'visit doctor clinic booking schedule','زياره'],
    ['pregnancy','section',['My Pregnancy','رحلة حملي'],'pregnant due date weeks trimester antenatal scan baby','حامل موعد الولاده اسابيع ثلث جنين'],
    ['prep','section',['Preparing for pregnancy','الاستعداد للحمل'],'preconception folic acid planning before pregnancy','حمض الفوليك تخطيط'],
    ['fertility','section',['Trying to conceive','الاستعداد للإنجاب'],'fertile ovulation conceive infertility trying baby','تبويض خصوبه انجاب'],
    ['breastfeeding','section',['Breastfeeding','أرضع'],'nursing milk latch feeding baby','رضاعه لبن'],
    ['postpartum','section',['After birth','بعد الولادة'],'postnatal newborn recovery baby blues stitches','نفاس مولود'],
    ['contraception','section',['Contraception','منع الحمل'],'birth control pill iud coil implant condom injection family planning','حبوب لولب عازل حقنه تنظيم الاسره'],
    ['passport','tool',['My health passport','خطتي الصحية'],'passport records allergies medicines medications conditions procedures pregnancies investigations family history emergency card encrypted','خطتي الصحية سجلات حساسية ادوية حالات اجراءات حمل فحوصات تاريخ عائلي بطاقة طوارئ مشفر'],
    ['symptoms','tool',['Symptom checker','فاحص الأعراض'],'symptoms symptom checker triage red amber green when to worry should i see a doctor fever bleeding headache pain','اعراض فحص فرز احمر برتقالي اخضر متى اقلق'],
    ['reminders','tool',['Reminders & milestones','التذكيرات والمعالم'],'reminders reminder milestones appointments scan antenatal schedule vaccine folic acid vitamin d','تذكيرات معالم مواعيد موعد'],
    ['insights','tool',['My health insights','رؤى صحتي'],'insights charts cycle length trend pregnancy progress week fetal development baby size symptom heatmap recovery timeline','رؤى رسوم دورة طول الدورة تقدم الحمل نمو الجنين'],
    ['privacy','section',['Privacy & your data','الخصوصية وبياناتك'],'privacy private data safe security tracking cookies delete my data stored on device backup','خصوصيه بيانات امان حذف بياناتي'],
    ['journey','section',['Journey','رحلتي'],'stages life chapters','مراحل']
  ];

  let DOCS=null,active=-1;

  function build(){
    const docs=[];
    const concernsOf=id=>concerns.filter(c=>c[3]&&c[3].includes(id)).map(c=>c[1]+' '+c[2]).join(' ');
    const chaptersOf=id=>chapters.filter(c=>c[4].includes('topic-'+id)).map(c=>c[1]+' '+c[2]).join(' ');
    lifeTopics.forEach(t=>{
      const syn=SYN[t.id]||['',''];
      docs.push({route:'topic-'+t.id,type:'guide',title:t.title,snip:t.body,boost:0,phr:norm(t.title.join(' ')+' '+syn.join(' ')),f:[
        field(10,t.title.join(' ')),
        field(6,syn.join(' ')),
        field(4,concernsOf(t.id)+' '+chaptersOf(t.id)),
        field(3,t.body.join(' ')),
        field(2,t.track.join(' ')+' '+t.help.join(' ')),
        field(1,flat(guideDepth[t.id]))
      ]});
    });
    PAGES.forEach(p=>docs.push({route:p[0],type:p[1],title:p[2],snip:null,boost:p[0]==='urgent'?6:0,
      phr:norm(p[2].join(' ')+' '+p[3]),f:[field(10,p[2].join(' ')),field(5,p[3]+' '+p[4])]}));
    /* the symptom checker is found by the symptoms it lists, in both languages */
    const symDoc=docs.find(d=>d.route==='symptoms');
    if(symDoc&&typeof SYMPTOMS!=='undefined'){
      symDoc.f.push(field(6,SYMPTOMS.map(s=>s.en+' '+s.ar).join(' ')),field(2,SYMPTOMS.map(s=>s.guidance.en+' '+s.guidance.ar).join(' ')));
    }
    return docs;
  }

  /* Every typed word must match (word start counts most, anywhere inside a longer word counts less). */
  function search(q){
    const tokens=toWords(q);
    if(!tokens.length)return [];
    const qn=' '+norm(q)+' ',multi=tokens.length>1;
    if(!DOCS)DOCS=build();
    const out=[];
    for(const d of DOCS){
      let total=0,ok=true;
      for(const tk of tokens){
        let best=0;
        for(const f of d.f){
          for(const w of f.words){
            if(w.startsWith(tk)){const s=f.w*(w===tk?1.2:1);if(s>best)best=s;}
            else if(tk.length>=4&&w.includes(tk)){const s=f.w*0.55;if(s>best)best=s;}
          }
        }
        if(!best){ok=false;break;}
        total+=best;
      }
      /* an exact multi-word phrase ("period pain", "baby blues") in a title or everyday-words list is the best possible match */
      if(ok)out.push({d,score:total+d.boost+(multi&&(' '+d.phr+' ').includes(qn)?7:0)});
    }
    out.sort((a,b)=>b.score-a.score||a.d.title[lang()].length-b.d.title[lang()].length);
    return out;
  }

  const snippet=d=>{
    if(!d.snip)return '';
    const s=String(d.snip[lang()]||'').replace(/\s+/g,' ').trim();
    return s.length>110?s.slice(0,107).replace(/\s+\S*$/,'')+'\u2026':s;
  };

  function hide(){
    const box=byId('gsearch-results'),inp=byId('gsearch-input');
    if(box){box.hidden=true;box.innerHTML='';}
    if(inp){inp.setAttribute('aria-expanded','false');inp.removeAttribute('aria-activedescendant');}
    active=-1;
  }

  function show(html,statusText){
    const box=byId('gsearch-results'),inp=byId('gsearch-input'),st=byId('gsearch-status');
    if(!box)return;
    box.innerHTML=html;box.hidden=false;
    if(inp)inp.setAttribute('aria-expanded','true');
    if(st)st.textContent=statusText;
    active=-1;
  }

  function run(q){
    const inp=byId('gsearch-input'),clear=byId('gsearch-clear');
    if(!inp)return;
    if(clear)clear.hidden=!q;
    if(q.trim().length<2){hide();return;}
    const res=search(q);
    if(!res.length){
      show('<div class="gs-empty">'+esc(T('No match yet. Try a shorter or simpler word.','لا توجد نتيجة بعد. جرّبي كلمة أقصر أو أبسط.'))+' '
        +esc(T('A missing result does not mean your symptom is harmless.','عدم ظهور نتيجة لا يعني أن العرض غير خطير.'))
        +'<br><a href="#learn">'+esc(T('Explore all guides','استكشفي كل الأدلة'))+'</a> \u00b7 <a href="#urgent">'+esc(T('Need urgent help?','تحتاجين مساعدة عاجلة؟'))+'</a></div>',
        T('No results','لا توجد نتائج'));
      return;
    }
    const top=res.slice(0,8);
    let html=top.map((r,i)=>{
      const k=TYPES[r.d.type],sn=snippet(r.d);
      return '<a role="option" id="gs-opt-'+i+'" aria-selected="false" class="gs-item'+(r.d.type==='help'?' gs-urgent':'')+'" href="#'+r.d.route+'">'
        +'<span class="gs-type">'+esc(T(k[0],k[1]))+'</span><span class="gs-title">'+esc(r.d.title[lang()])+'</span>'
        +(sn?'<span class="gs-snip">'+esc(sn)+'</span>':'')+'</a>';
    }).join('');
    if(res.length>top.length)html+='<div class="gs-more"><a href="#learn" data-gs-all>'+esc(T('Explore all guides','استكشفي كل الأدلة'))+'</a></div>';
    show(html,T(res.length+' results available','عدد النتائج: '+res.length));
  }

  function mark(items){
    const inp=byId('gsearch-input');
    items.forEach((el,i)=>{el.classList.toggle('is-active',i===active);el.setAttribute('aria-selected',i===active?'true':'false');});
    if(inp){if(active>=0)inp.setAttribute('aria-activedescendant',items[active].id);else inp.removeAttribute('aria-activedescendant');}
    if(active>=0)items[active].scrollIntoView({block:'nearest'});
  }

  document.addEventListener('input',e=>{
    if(e.target&&e.target.id==='gsearch-input')run(e.target.value);
  });

  document.addEventListener('focusin',e=>{
    if(e.target&&e.target.id==='gsearch-input'){
      if(!DOCS)DOCS=build();
      if(e.target.value.trim().length>=2)run(e.target.value);
    }
  });

  document.addEventListener('keydown',e=>{
    const inp=byId('gsearch-input');
    if(!inp||e.target!==inp)return;
    const items=[...document.querySelectorAll('#gsearch-results a.gs-item')];
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      if(!items.length)return;
      e.preventDefault();
      active=e.key==='ArrowDown'?(active+1)%items.length:(active<=0?items.length-1:active-1);
      mark(items);
    }else if(e.key==='Enter'){
      const target=items[active>=0?active:0];
      if(target){e.preventDefault();target.click();}
    }else if(e.key==='Escape'){
      if(inp.value){inp.value='';run('');}
    }
  });

  document.addEventListener('click',e=>{
    const el=e.target&&e.target.closest?e.target:null;
    if(!el)return;
    if(el.closest('#gsearch-clear')){
      const inp=byId('gsearch-input');
      if(inp){inp.value='';run('');inp.focus();}
      return;
    }
    if(el.closest('[data-gs-all]')){
      const inp=byId('gsearch-input');
      if(inp)guideQuery=inp.value.trim();
      return;
    }
    const box=byId('gsearch');
    if(box&&!box.contains(el))hide();
  });
})();
