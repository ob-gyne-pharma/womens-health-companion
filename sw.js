'use strict';
const RELEASE='2026.10.30-r16';
const CACHE='wf-public-'+RELEASE;
const BASE=new URL('./',self.location.href);
const CORE=[
  './',
  './manifest.webmanifest',
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
