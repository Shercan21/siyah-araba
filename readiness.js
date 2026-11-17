// All screens share one image readiness and speech rule.
const readyPictures = new Map();
let visualGeneration = 0, visualBusy = true, pendingVisualSpeech = null;
const speakBeforePictures = speak;
speak = function(text){if(visualBusy){pendingVisualSpeech=text;return}speakBeforePictures(text)};
const cancelBeforePictures = cancelSpeech;
cancelSpeech = function(){pendingVisualSpeech=null;cancelBeforePictures()};
function loadPicture(url, priority='high') {
  if(readyPictures.has(url))return readyPictures.get(url);
  const task=new Promise((resolve,reject)=>{
    const picture=new Image();picture.fetchPriority=priority;picture.decoding='async';
    const timeout=setTimeout(()=>{picture.onload=picture.onerror=null;picture.src='';reject(new Error('image timeout'))},15000);
    picture.onerror=()=>{clearTimeout(timeout);reject(new Error('image unavailable'))};
    picture.onload=async()=>{clearTimeout(timeout);try{if(picture.decode)await picture.decode();resolve()}catch{reject(new Error('image decode failed'))}};
    picture.src=url;
  });
  readyPictures.set(url,task);
  task.catch(()=>{if(readyPictures.get(url)===task)readyPictures.delete(url)});
  return task;
}
function screenPictureUrls(){
  const urls=new Set();
  document.querySelectorAll('#app .picturebook, #app img[src]').forEach(element=>{
    if(element.closest('.hidden'))return;
    const image=element.tagName==='IMG'?element.getAttribute('src'):
      element.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
    if(image)urls.add(new URL(image,location.href).href);
  });
  return [...urls];
}
function finishPictures(generation){
  if(generation!==visualGeneration)return;
  const app=document.querySelector('#app');app.classList.remove('visual-wait');app.removeAttribute('aria-busy');
  document.querySelector('#visualLoading')?.remove();visualBusy=false;
  const text=pendingVisualSpeech;pendingVisualSpeech=null;if(text)speakBeforePictures(text);
}
function preparePictures(){
  const generation=++visualGeneration,app=document.querySelector('#app'),urls=screenPictureUrls();
  document.querySelector('#visualLoading')?.remove();
  if(!urls.length){finishPictures(generation);return}
  visualBusy=true;app.classList.add('visual-wait');app.setAttribute('aria-busy','true');
  app.insertAdjacentHTML('afterbegin',`<section id="visualLoading" class="visual-loading" role="status"><h2>${t('Resimler hazırlanıyor…','Getting pictures ready…')}</h2><p>${t('Birlikte biraz bekleyelim.','Let’s wait a moment together.')}</p></section>`);
  Promise.all(urls.map(url=>loadPicture(url))).then(()=>finishPictures(generation)).catch(()=>{
    if(generation!==visualGeneration)return;
    pendingVisualSpeech=null;
    document.querySelector('#visualLoading').innerHTML=`<h2>${t('Resimler henüz hazır değil.','The pictures are not ready yet.')}</h2><p>${t('Bağlantıyı kontrol edip tekrar deneyebilirsiniz.','Check the connection and try again.')}</p><button class="primary" id="visualRetry">${t('Tekrar dene','Try again')}</button><button class="quiet" id="visualHome">${t('Ana sayfa','Home')}</button>`;
    document.querySelector('#visualRetry').onclick=preparePictures;document.querySelector('#visualHome').onclick=home;
  });
}
function withPictures(render){return function(...args){
  visualBusy=true;pendingVisualSpeech=null;
  document.querySelector('#app').classList.remove('visual-wait');
  const result=render.apply(this,args);preparePictures();return result;
}}
home=withPictures(home);lessonMenu=withPictures(lessonMenu);showLesson=withPictures(showLesson);
renderQuestion=withPictures(renderQuestion);renderPuzzle=withPictures(renderPuzzle);complete=withPictures(complete);
storyHome=withPictures(storyHome);readStory=withPictures(readStory);talkHome=withPictures(talkHome);
dialogue=withPictures(dialogue);profileEntry=withPictures(profileEntry);needsHome=withPictures(needsHome);
sentenceHome=withPictures(sentenceHome);
// Rebind the initial screen's click handlers to the shared renderer as well.
if(screen==='home')home();else if(screen==='profile')profileEntry();else preparePictures();
