let exploreHub='questions',explorePart='what',exploreMode='learn',exploreQueue=[],exploreRound=0,exploreOptions=[],exploreLocked=false,exploreWrong=false,exploreHelped=false,exploreShowModel=false,exploreSaved=false,exploreVisualId=0;
function exploreLevel(part=explorePart){return Math.max(1,Math.min(exploreParts[part].levels,Number(topicState('explore_'+part).level)||1))}
function explorePool(part=explorePart){return exploreBanks[part].filter(item=>item.stage<=exploreLevel(part))}
function exploreCurrent(){return exploreBanks[explorePart].find(item=>item.id===exploreQueue[exploreRound])}
function exploreAnswerPool(item){
  if(!item.activity)return item.answers;
  const ids=[item.activity,...shuffle(explorePool().map(q=>q.activity).filter(id=>id!==item.activity))].slice(0,4);
  return ids.map(id=>eo(id,...activityLabels[id],id));
}
function exploreVisual(visual){
  if(!visual)return '';
  if(typeof visual==='string')return `<div class="art scene-art">${art(visual)}</div>`;
  if(visual.type==='number')return `<div class="number-art">${visual.number}</div>`;
  if(visual.type==='count')return `<div class="explore-count" aria-label="${visual.count} ${t('elma','apples')}">${Array.from({length:visual.count},()=>`<div class="art">${countingApple()}</div>`).join('')}</div>`;
  if(visual.type==='fill'){
    const clip='glass-'+(++exploreVisualId),height=visual.fill*120;
    return `<svg class="fill-glass" viewBox="0 0 140 180" role="img" aria-label="${t('Su bardağı','Water glass')}"><defs><clipPath id="${clip}"><path d="M25 20H115L102 157Q70 169 38 157Z"/></clipPath></defs><path d="M25 20H115L102 157Q70 169 38 157Z" fill="#eff8fa" stroke="#7796a1" stroke-width="4"/><rect x="20" y="${160-height}" width="100" height="${height}" fill="#70c1df" clip-path="url(#${clip})"/><path d="M25 20H115L102 157Q70 169 38 157Z" fill="none" stroke="#7796a1" stroke-width="4"/></svg>`;
  }
  if(visual.type==='position')return `<div class="location-scene loc-${visual.relation}" role="img" aria-label="${label(visual.obj)}"><div class="loc-anchor">${visual.anchor==='basket'?'<div class="loc-basket"></div>':`<div class="art">${art(visual.anchor)}</div>`}</div><div class="loc-object art">${art(visual.obj)}</div></div>`;
  return '';
}
function exploreHome(hub='questions'){
  stopPairTimer();cancelSpeech();exploreHub=exploreHubs[hub]?hub:'questions';screen='explore-home';chrome();const data=exploreHubs[exploreHub];
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="exploreBack">← ${t('Ana sayfa','Home')}</button></div><section class="question"><h1>${t(...data.names)}</h1><p>${t('Önce öğrenelim. Sonra resim seçebilir veya birlikte söyleyebiliriz.','First learn, then choose a picture or say it together.')}</p></section><div class="explore-part-grid">${data.parts.map(part=>`<button class="category" data-explore-part="${part}" style="--tint:#e7ede2"><h2>${t(...exploreParts[part].names)}</h2><p>${t(...exploreParts[part].hint)}</p><span class="tag">${t('Seviye','Level')} ${exploreLevel(part)}</span></button>`).join('')}</div>`;
  $('#exploreBack').onclick=home;document.querySelectorAll('[data-explore-part]').forEach(button=>button.onclick=()=>exploreMenu(button.dataset.explorePart));revealGameStart();
}
function exploreMenu(part){
  if(part==='drawing'){drawingHome(true);speak(namePrefix()+t('noktaları birleştirelim, yanına çizelim.','let’s join the dots and draw beside them.'));return}if(part==='maze'){mazeHome(true);speak(namePrefix()+t('kuşu yuvasına götürelim.','let’s guide the bird to its nest.'));return}
  cancelSpeech();explorePart=part;screen='explore-menu';chrome();const data=exploreParts[part];
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="exploreBack">← ${t(...exploreHubs[exploreHub].names)}</button><span class="tag">${t('Seviye','Level')} ${exploreLevel()}</span></div><section class="question"><h1>${t(...data.names)}</h1><p>${t(...data.hint)}</p><p class="setting-note">${t('Yeni içerikleri ebeveyn açar. Seviye kendiliğinden yükselmez.','A parent opens new content. Levels do not advance automatically.')}</p></section><div class="mini-menu">${[['learn','Öğren','Learn','Örneği birlikte dinleyelim.','Listen to the example.'],['find','Bul','Choose','Soruyu dinle, resmi seç.','Listen and choose a picture.'],['say','Birlikte söyle','Say together','İstersen söyle veya örneği dinle.','Speak if you like, or hear the example.']].map(([mode,a,b,c,d])=>`<button class="category" data-explore-mode="${mode}" style="--tint:#e7ede2"><h2>${t(a,b)}</h2><p>${t(c,d)}</p></button>`).join('')}</div>`;
  $('#exploreBack').onclick=()=>exploreHome(exploreHub);document.querySelectorAll('[data-explore-mode]').forEach(button=>button.onclick=()=>startExplore(part,button.dataset.exploreMode));revealGameStart();
}
function startExplore(part,mode){
  cancelSpeech();explorePart=part;exploreMode=mode;exploreQueue=shuffle(explorePool().map(item=>item.id)).slice(0,4);exploreRound=0;exploreSaved=false;newExploreQuestion();
}
function newExploreQuestion(){
  cancelSpeech();exploreLocked=false;exploreWrong=false;exploreHelped=false;exploreShowModel=false;
  const item=exploreCurrent(),count=item.allOptions?item.answers.length:explorePart==='opposites'?2:Math.min(4,exploreLevel()+1);
  exploreOptions=shuffle(exploreAnswerPool(item).slice(0,count));renderExploreTask();speakExploreQuestion();
}
function exploreQuestionText(){const item=exploreCurrent();return namePrefix()+(exploreMode==='say'&&item.activity?t('çocuk ne yapıyor?','what is the child doing?'):t(...item.question))}
function exploreModelText(){return t(...exploreAnswerPool(exploreCurrent())[0].text)}
function speakExploreQuestion(){const item=exploreCurrent();speak((item.context?t(...item.context)+' ':'')+exploreQuestionText()+(exploreMode==='learn'?' '+exploreModelText():''))}
function renderExploreTask(){
  screen='explore-task';chrome();const item=exploreCurrent(),correct=exploreAnswerPool(item)[0],learn=exploreMode==='learn',say=exploreMode==='say';
  const scene=item.scene||(say&&item.activity?correct.visual:null);
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="exploreBack">← ${t(...exploreParts[explorePart].names)}</button><span class="tag">${exploreRound+1} / ${exploreQueue.length} · ${t('Seviye','Level')} ${exploreLevel()}</span></div><section class="question"><div class="eyebrow">${t(...exploreParts[explorePart].names)}</div>${item.context?`<p class="explore-context">${t(...item.context)}</p>`:''}<h1>${exploreQuestionText()}</h1><button class="listen" id="exploreListen">${t('Tekrar dinle','Listen again')}</button></section>${scene?`<section class="explore-main">${exploreVisual(scene)}</section>`:''}${learn?`<section class="explore-teaching">${item.part==='opposites'?`<div class="explore-options">${item.answers.map(answer=>`<div class="explore-choice">${exploreVisual(answer.visual)}<p>${t(...answer.text)}</p></div>`).join('')}</div>`:`<div class="explore-choice">${exploreVisual(correct.visual)}<h2>${t(...correct.text)}</h2></div>`}<p>${t('Birlikte bakalım, birlikte dinleyelim.','Let’s look and listen together.')}</p></section>`:say?`<section class="explore-speaking">${!scene?`<div class="explore-options">${item.answers.map(answer=>`<div class="explore-choice">${exploreVisual(answer.visual)}</div>`).join('')}</div>`:''}<p>${t('Süre yok. Konuşabilir, işaret edebilir veya yalnızca dinleyebilirsin.','There is no timer. You can speak, point, or just listen.')}</p>${exploreShowModel?`<h2>${exploreModelText()}</h2>`:''}</section>`:`<div class="explore-options">${exploreOptions.map(answer=>`<button class="explore-choice ${exploreShowModel&&answer.id===correct.id?'model':''}" data-explore-answer="${answer.id}" ${exploreLocked?'disabled':''}>${exploreVisual(answer.visual)}<span>${t(...answer.text)}</span></button>`).join('')}</div>`}${item.revealAfter&&(exploreLocked||exploreShowModel)?`<section class="explore-main"><h2>${t('Tamamlanan resim','Completed picture')}</h2>${exploreVisual(item.revealAfter)}</section>`:''}<div class="feedback" id="exploreFeedback" aria-live="polite">${exploreLocked?`<p>${t('Aferin Eyüp! Buldun.','Well done, Eyüp! You found it.')}</p>`:''}</div><div class="actions">${!learn?`<button class="quiet" id="exploreModel">${t('Örneği dinle','Hear the example')}</button>`:''}${learn||say||exploreLocked?`<button class="primary" id="exploreNext">${t('Devam edelim →','Let’s continue →')}</button>`:''}</div>`;
  $('#exploreBack').onclick=()=>exploreMenu(explorePart);$('#exploreListen').onclick=speakExploreQuestion;
  document.querySelectorAll('[data-explore-answer]').forEach(button=>button.onclick=()=>answerExplore(button.dataset.exploreAnswer));
  if(!learn)$('#exploreModel').onclick=()=>{if(!say)exploreHelped=true;exploreShowModel=true;renderExploreTask();speak(exploreModelText())};
  if(learn||say||exploreLocked)$('#exploreNext').onclick=advanceExplore;
  revealGameStart();
}
function answerExplore(id){
  if(screen!=='explore-task'||exploreMode!=='find'||exploreLocked||!exploreOptions.some(answer=>answer.id===id))return;
  if(id!==exploreAnswerPool(exploreCurrent())[0].id){exploreWrong=true;$('#exploreFeedback').textContent=t('Bir daha bakalım.','Let’s look again.');speak(t('Bir daha bakalım. ','Let’s look again. ')+exploreQuestionText());return}
  exploreLocked=true;renderExploreTask();speak(t('Aferin Eyüp! ','Well done, Eyüp! ')+exploreModelText());
}
function recordExploreChoice(){
  const state=topicState('explore_'+explorePart);state.exerciseAnswers||={};const id=exploreCurrent().id,entry=state.exerciseAnswers[id]||={first:0,retry:0,helped:0,total:0};entry.total++;entry[exploreHelped?'helped':exploreWrong?'retry':'first']++;save();
}
function advanceExplore(){
  if(screen!=='explore-task'||exploreMode==='find'&&!exploreLocked)return;
  if(exploreMode==='find')recordExploreChoice();exploreRound++;
  if(exploreRound<exploreQueue.length)newExploreQuestion();else completeExplore();
}
function completeExplore(){
  cancelSpeech();screen='explore-done';if(exploreMode==='find'&&!exploreSaved){topicState('explore_'+explorePart).sessions++;exploreSaved=true;save()}
  $('#app').innerHTML=`<section class="complete"><h1>${t('Birlikte keşfettik.','We explored together.')}</h1><p>${t('İstersen mola verelim. Aynı seviyede kalıyoruz.','We can take a rest. We are staying at the same level.')}</p><div class="actions"><button class="primary" id="exploreAgain">${t('Yine oyna','Play again')}</button><button class="quiet" id="exploreOther">${t('Diğer çalışmalar','Other activities')}</button><button class="quiet" id="exploreFinish">${t('Ana sayfa','Home')}</button></div></section>`;
  $('#exploreAgain').onclick=()=>startExplore(explorePart,exploreMode);$('#exploreOther').onclick=()=>exploreHome(exploreHub);$('#exploreFinish').onclick=home;revealGameStart();
}
function addExploreSettings(){
  $('#settingsBody').insertAdjacentHTML('beforeend',`<section class="level-card"><h3>${t('Sorular, zıt kavramlar ve eylemler','Questions, opposites and activities')}</h3><p class="setting-note">${t('Her başlığın seviyesini ayrı seçin. Önce temel, sonra yeni kavramlar açılır. Öğren ve Birlikte söyle yanıtları puanlanmaz. Bul kayıtları yalnızca bu ekrandaki seçimleri gösterir; konuşma veya gerçek yaşam değerlendirmesi değildir.','Set each level separately. Basic content comes before new concepts. Learn and Say together are not scored. Choose records describe screen choices, not speech or real-life assessment.')}</p>${Object.entries(exploreParts).map(([id,part])=>{const state=topicState('explore_'+id),values=Object.values(state.exerciseAnswers||{}),total=values.reduce((n,v)=>n+v.total,0),first=values.reduce((n,v)=>n+v.first,0);return `<div class="explore-setting"><label for="explore-level-${id}">${t(...part.names)}</label><select id="explore-level-${id}" data-explore-level="${id}">${Array.from({length:part.levels},(_,index)=>`<option value="${index+1}" ${exploreLevel(id)===index+1?'selected':''}>${index+1} · ${index===0?t('Temel','Basic'):index===part.levels-1?t('Ayrıntı / karışık tekrar','Details / mixed practice'):t('Yeni örnekler','More examples')}</option>`).join('')}</select><small>${['drawing','maze'].includes(id)?t('Serbest çalışma · puanlanmaz','Free activity · not scored'):t('Bul: ilk seçim / tamamlanan soru','Choose: first choice / completed questions')+' '+first+' / '+total}</small></div>`}).join('')}</section>`);
  document.querySelectorAll('[data-explore-level]').forEach(select=>select.onchange=()=>{topicState('explore_'+select.dataset.exploreLevel).level=Number(select.value);save()});
}
const settingsBeforeExplore=settings;settings=function(){settingsBeforeExplore();addExploreSettings()};
const levelsBeforeExplore=levelPanel;levelPanel=function(){levelsBeforeExplore();addExploreSettings()};
const homeBeforeExplore=home;home=function(){homeBeforeExplore();$('.section-title').insertAdjacentHTML('beforebegin',`<section class="explore-entry"><h2>${t('Biraz daha keşfedelim','Let’s explore some more')}</h2><div class="mini-menu">${Object.entries(exploreHubs).map(([id,hub])=>`<button class="category" data-explore-hub="${id}" style="--tint:#e7ede2"><div class="art">${art(hub.cover)}</div><h3>${t(...hub.names)}</h3></button>`).join('')}</div></section>`);document.querySelectorAll('[data-explore-hub]').forEach(button=>button.onclick=()=>exploreHome(button.dataset.exploreHub))};
const languageBeforeExplore=$('#language').onclick;$('#language').onclick=()=>{
  if(screen.startsWith('explore-')){cancelSpeech();lang=tr()?'en':'tr';save();if(screen==='explore-home')exploreHome(exploreHub);else if(screen==='explore-menu')exploreMenu(explorePart);else if(screen==='explore-task')startExplore(explorePart,exploreMode);else if(screen==='explore-drawing')drawingHome();else if(screen==='explore-maze')mazeHome();else completeExplore()}else languageBeforeExplore();
};
