'use strict';
const RELEASE='2026.10.31-r18';
const CACHE='wf-public-'+RELEASE;
const BASE=new URL('./',self.location.href);
const CORE=[
  './',
  './manifest.webmanifest',
  './js/01-core.js?v=2026.10.31-r18',
  './js/02-views-legacy.js?v=2026.10.31-r18',
  './js/03-i18n-base.js?v=2026.10.31-r18',
  './js/04-tools.js?v=2026.10.31-r18',
  './js/05-life-topics.js?v=2026.10.31-r18',
  './js/06-i18n-life.js?v=2026.10.31-r18',
  './js/07-review-offline.js?v=2026.10.31-r18',
  './js/08-guide-data.js?v=2026.10.31-r18',
  './js/09-guides.js?v=2026.10.31-r18',
  './js/10-urgent-learn.js?v=2026.10.31-r18',
  './js/11-state-calc.js?v=2026.10.31-r18',
  './js/12-journey-diary.js?v=2026.10.31-r18',
  './js/13-feedback-backup.js?v=2026.10.31-r18',
  './js/14-home-more.js?v=2026.10.31-r18',
  './js/15-i18n-late.js?v=2026.10.31-r18',
  './js/16-boot.js?v=2026.10.31-r18',
  './js/17-nav-titles.js?v=2026.10.31-r18',
  './js/18-wizard.js?v=2026.10.31-r18',
  './js/19-seo.js?v=2026.10.31-r18',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/mother.jpg',
  './images/pregnant.jpg',
  './images/meds.jpg',
  './images/consult.jpg'
].map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  try{
    for(const url of CORE){
      const response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin'}));
      if(!response.ok||response.redirected)throw Error('Offline download unavailable');
      if(url===BASE.href){const html=await response.clone().text();if(!html.includes('name="app-release" content="'+RELEASE+'"'))throw Error('Release mismatch');}
      await cache.put(url,response);
    }
    await cache.put(new URL('./offline-meta.json',BASE).href,new Response(JSON.stringify({release:RELEASE,savedAt:new Date().toISOString()}),{headers:{'Content-Type':'application/json'}}));
  }catch(error){await caches.delete(CACHE);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('wf-public-')&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==BASE.origin)return;
  const isAppPage=request.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===BASE.pathname+'index.html');
  if(isAppPage){event.respondWith((async()=>{
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4000);
    try{const response=await fetch(request,{signal:controller.signal});if(response.ok)return response;throw Error('Unavailable');}
    catch(error){const saved=await caches.match(BASE.href,{cacheName:CACHE});if(saved)return saved;return new Response('Offline copy unavailable. Reconnect and save the app again.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});}
    finally{clearTimeout(timer);}
  })());return;}
  if(CORE.includes(url.href)&&url.href!==BASE.href)event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(request))||fetch(request)));
});
