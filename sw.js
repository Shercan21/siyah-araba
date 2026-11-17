const CACHE='siyah-araba-v2';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('minik-kesifler-')||k.startsWith('siyah-araba-'))&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Prefer published updates online; keep a complete offline copy on this phone.
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok){await cache.put(event.request,response.clone());return response}return await cache.match(event.request)||response}catch(error){const cached=await cache.match(event.request);if(cached)return cached;throw error}})())});
