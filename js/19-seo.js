/* Women & Families 2026.10.31-r18 | js/19-seo.js
   Search-engine support: real URLs for guide links, per-page browser titles.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* The app navigates with #hash routes, which search engines ignore. Each guide, chapter
   and hub also exists as a real static page (see tools/build-pages.mjs). Here every
   in-app link to such a page gets its real address as href (crawlers can follow it,
   "copy link" and "open in new tab" give a shareable URL), while a normal click still
   navigates inside the app instantly. */
(function(){
  const app=document.getElementById('app');
  if(!app)return;
  const topicIds=new Set(lifeTopics.map(t=>t.id));
  const chapterIds=new Set(chapters.map(c=>c[0]));
  const ROOT_TITLE='Women & Families \u2014 Your health companion';

  function urlFor(route,lang){
    const pre=lang==='ar'?'ar-':'';
    if(route.startsWith('topic-')&&topicIds.has(route.slice(6)))return '/'+pre+'guide-'+route.slice(6);
    if(route.startsWith('chapter-')&&chapterIds.has(route.slice(8)))return '/'+pre+'chapter-'+route.slice(8);
    if(route==='learn'||route==='index')return '/'+pre+'guides';
    if(route==='urgent')return '/'+pre+'urgent-help';
    return null;
  }

  function decorate(){
    const lang=state.lang==='ar'?'ar':'en';
    app.querySelectorAll('a[href^="#"]').forEach(a=>{
      const route=a.getAttribute('href').slice(1);
      const url=urlFor(route,lang);
      if(!url)return;
      a.setAttribute('href',url);
      a.setAttribute('data-spa-route',route);
    });
  }

  function syncTitle(){
    const h1=app.querySelector('h1');
    /* Arabic home is a real page (ar-home.html) with an Arabic title; English home keeps the site title. */
    const isContent=/^(topic-|chapter-|learn$|index$|urgent$)/.test(page)||(page==='home'&&state.lang==='ar');
    /* English chapter pages get "(all guides)" so they never share a title with the guide of the same name. */
    const qual=page.startsWith('chapter-')&&state.lang!=='ar'?' (all guides)':'';
    const want=isContent&&h1&&h1.textContent.trim()?h1.textContent.trim()+qual+' \u2014 Women & Families':ROOT_TITLE;
    if(document.title!==want)document.title=want;
  }

  let queued=false;
  const sync=()=>{queued=false;decorate();syncTitle();};
  new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(sync);}}).observe(app,{childList:true,subtree:true});
  sync();

  document.addEventListener('click',e=>{
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const a=e.target.closest&&e.target.closest('a[data-spa-route]');
    if(!a)return;
    e.preventDefault();
    const route=a.getAttribute('data-spa-route');
    if(location.hash.slice(1)===route)navigate(route);else location.hash=route;
  });
})();
