/* Women & Families 2026.10.31-r18 | js/16-boot.js
   hashchange router start, first navigate(), modelContext tools.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js. */
'use strict';

/* TRANSLATIONS-END */
/* Static guide pages (guide-*.html, ar-*.html) set window.__PRERENDER = {route, lang}. On the main page it is undefined, so behaviour is unchanged. */
const entryRoute=()=>location.hash.slice(1)||(window.__PRERENDER&&window.__PRERENDER.route)||'';
if(window.__PRERENDER&&(window.__PRERENDER.lang==='ar'||window.__PRERENDER.lang==='en'))state.lang=window.__PRERENDER.lang;
window.addEventListener('hashchange',()=>{navigate(entryRoute());$('#toast').hidden=true;});navigate(entryRoute()||'home');document.getElementById('preview-message').hidden=true;
if(document.modelContext&&typeof document.modelContext.registerTool==='function'){
 const lifecycle=new AbortController();
 try{Promise.resolve(document.modelContext.registerTool({name:'open_companion_screen',title:'Open companion screen',description:'Navigate to a guide or calculator screen. Does not calculate, save, or change health information.',inputSchema:{type:'object',properties:{screen:{type:'string',enum:['home','tools','examples','pregnancy','checker','plan','prep','fertility','contraception','breastfeeding','postpartum','bag','learn','languages','calc-bmi','calc-cycle','calc-postpartum','calc-appointment']}},required:['screen'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const allowed=['home','tools','examples','pregnancy','checker','plan','prep','fertility','contraception','breastfeeding','postpartum','bag','learn','languages','calc-bmi','calc-cycle','calc-postpartum','calc-appointment'];if(!input||typeof input!=='object'||Object.keys(input).length!==1||!allowed.includes(input.screen))throw Error('Invalid screen');history.pushState(null,'','#'+input.screen);navigate(input.screen);return {screen:page};}},{signal:lifecycle.signal})).catch(()=>{});}catch(e){}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
