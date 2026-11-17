// Communication is freely available; these choices are never scored as tests.
pictureAtlases.needsScenes = ['needFood','needWater','needToilet','needRest','needHelp','needQuiet','needHurt','needCar','needApple','needHug','needOutside','needNo','needColdScene','needHotScene','needAgain','needDone'];
pictureAtlases.bodyNeeds = ['needPee','needPoo','needBelly','needHead','needEar','needTooth','needThroat','needHand','needFoot','needUnwell','needCold','needHot','feelScared','feelSad','feelHappy','feelAngry'];
const needsCards = {
 needFood:['Acıktım.','I am hungry.'], needWater:['Su istiyorum.','I want water.'], needPee:['Çişim geldi.','I need to pee.'], needPoo:['Kakam geldi.','I need to poo.'], needBelly:['Karnım ağrıyor.','My tummy hurts.'], needHelp:['Yardım et.','Help me.'], needRest:['Mola istiyorum.','I want a break.'], needNo:['İstemiyorum.','I do not want it.'],
 needToilet:['Tuvalete gitmek istiyorum.','I need to go to the toilet.'], needQuiet:['Sessizlik istiyorum.','I want quiet.'], needHurt:['Bir yerim acıyor.','Something hurts.'], needCar:['Arabayı istiyorum.','I want the car.'], needApple:['Elma istiyorum.','I want an apple.'], needHug:['Sarılmak istiyorum.','I want a hug.'], needOutside:['Dışarı çıkmak istiyorum.','I want to go outside.'], needAgain:['Bir daha istiyorum.','I want more.'], needDone:['Bitti.','I am finished.'],
 needHead:['Başım ağrıyor.','My head hurts.'],needEar:['Kulağım ağrıyor.','My ear hurts.'],needTooth:['Dişim ağrıyor.','My tooth hurts.'],needThroat:['Boğazım ağrıyor.','My throat hurts.'],needHand:['Elim acıyor.','My hand hurts.'],needFoot:['Ayağım acıyor.','My foot hurts.'],needUnwell:['İyi değilim.','I do not feel well.'],needCold:['Üşüdüm.','I feel cold.'],needHot:['Sıcakladım.','I feel hot.'],feelScared:['Korktum.','I feel scared.'],feelSad:['Üzgünüm.','I feel sad.'],feelHappy:['Mutluyum.','I feel happy.'],feelAngry:['Kızgınım.','I feel angry.']
};
const needTabs = {
 basic: ['İhtiyacım var','I need something',['needFood','needWater','needPee','needPoo','needBelly','needHelp','needRest','needNo']],
 more: ['Başka istekler','More requests',['needToilet','needQuiet','needCar','needApple','needHug','needOutside','needAgain','needDone']],
 pain: ['Bir yerim ağrıyor','Something hurts',['needBelly','needHead','needEar','needTooth','needThroat','needHand','needFoot','needHurt','needUnwell']],
 feelings: ['Nasıl hissediyorum?','How do I feel?',['feelHappy','feelSad','feelScared','feelAngry','needCold','needHot']]
};
let needsTab='basic', lastNeed=null, sentenceItem=null, sentencePartsDone=0;
const sentenceObjects = [
 {id:'glass',noun:['Su','Water'],request:['su','water'],polite:['su','some water'],detail:['bir bardak su','a glass of water']},
 {id:'car',noun:['Araba','Car'],request:['araba','a car'],polite:['arabayı','the car'],detail:['siyah araba','a black car']},
 {id:'apple',noun:['Elma','Apple'],request:['elma','an apple'],polite:['elmayı','the apple'],detail:['kırmızı elma','a red apple']},
 {id:'ball',noun:['Top','Ball'],request:['top','a ball'],polite:['topu','the ball'],detail:['bir top','a ball']},
 {id:'banana',noun:['Muz','Banana'],request:['muz','a banana'],polite:['muzu','the banana'],detail:['sarı muz','a yellow banana']},
 {id:'book',noun:['Kitap','Book'],request:['kitap','a book'],polite:['kitabı','the book'],detail:['bir kitap','a book']},
 {id:'needHelp',noun:['Yardım','Help'],request:['yardım','help'],polite:['yardım','help'],detail:['biraz yardım','some help']},
 {id:'needRest',noun:['Mola','Break'],request:['mola','a break'],polite:['mola','a break'],detail:['biraz mola','a short break']}
];
const sentenceLevelNames = [['Tek kelime','One word'],['İki kelime','Request phrase'],['Kısa cümle','A short sentence'],['Ayrıntı ekle','Add a detail'],['Günlük rica','An everyday request']];
function sentenceLevel(){return Math.max(1,Math.min(5,Number(topicState('sentences').level)||1))}
function needsHome(tab='basic') {
  cancelSpeech(); screen='needs'; needsTab=needTabs[tab]?tab:'basic'; chrome();
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="needsBack">← ${t('Ana sayfa','Home')}</button><button class="quiet" id="openSentences">${t('Birlikte cümle kuralım →','Build a sentence →')}</button></div><section class="question"><h1>${namePrefix()}${t('ne söylemek istersin?','what would you like to say?')}</h1><p>${t('Bir resme dokun. Ekran senin için söylesin.','Tap a picture. The screen will speak for you.')}</p></section><div class="needs-tabs">${Object.entries(needTabs).map(([id,tab])=>`<button class="quiet ${needsTab===id?'active':''}" data-needs-tab="${id}" aria-pressed="${needsTab===id}">${tab[tr()?0:1]}</button>`).join('')}</div><section class="needs-message" aria-live="polite"><p id="needsMessage">${lastNeed?t(...needsCards[lastNeed]):t('Seni dinliyorum.','I am listening.')}</p><button class="quiet" id="needRepeat" ${lastNeed?'':'disabled'}>${t('Tekrar söyle','Say it again')}</button><button class="quiet" id="needStop">${t('Sesi durdur','Stop speaking')}</button></section><div class="needs-grid">${needTabs[needsTab][2].map(id=>`<button class="need-card" data-need="${id}"><div class="art">${art(id)}</div><span>${t(...needsCards[id])}</span></button>`).join('')}</div>`;
  $('#needsBack').onclick=home;$('#openSentences').onclick=()=>sentenceHome();$('#needStop').onclick=cancelSpeech;
  $('#needRepeat').onclick=()=>{if(lastNeed)speak(t(...needsCards[lastNeed]))};
  document.querySelectorAll('[data-needs-tab]').forEach(button=>button.onclick=()=>needsHome(button.dataset.needsTab));
  document.querySelectorAll('[data-need]').forEach(button=>button.onclick=()=>sayNeed(button.dataset.need));
  revealGameStart();
}
function sayNeed(id){if(!needsCards[id])return;lastNeed=id;$('#needsMessage').textContent=t(...needsCards[id]);$('#needRepeat').disabled=false;speak(t(...needsCards[id]))}
function sentenceParts(item,level=sentenceLevel()) {
  const i=tr()?0:1;
  if(level===1)return [item.noun[i]];
  if(level===2)return tr()?[item.request[0],'istiyorum.']:['I want',item.request[1]+'.'];
  if(level===3)return tr()?['Ben',item.request[0],'istiyorum.']:['I', 'want',item.request[1]+'.'];
  if(level===4)return tr()?[item.detail[0],'istiyorum.']:['I want',item.detail[1]+'.'];
  if(item.id==='needHelp')return tr()?['Anne,','bana','yardım eder misin?']:['Mom,','can you','help me?'];
  if(item.id==='needRest')return tr()?['Anne,','biraz','mola verebilir miyim?']:['Mom,','can I','have a break?'];
  return tr()?['Anne,','bana',item.polite[0],'verir misin?']:['Mom,','can you give me',item.polite[1]+'?'];
}
function sentenceHome(reset=true){
  cancelSpeech();screen='sentences';if(reset){sentenceItem=null;sentencePartsDone=0}chrome();
  const level=sentenceLevel();
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="sentenceBack">← ${t('İsteklerim','My needs')}</button><span class="tag">${t('Seviye','Level')} ${level} · ${t(...sentenceLevelNames[level-1])}</span></div><section class="question"><h1>${t('Birlikte söyleyelim.','Let’s say it together.')}</h1><p>${t('Bir resim seç. Sonra kelime kartlarına sırayla dokun.','Choose a picture, then tap the word cards in order.')}</p><p class="setting-note">${t('Konuşmak zorunda değilsin. Yalnızca dinleyebilir veya resimleri seçebilirsin.','You do not have to speak. You can listen or choose pictures.')}</p></section><div class="sentence-objects">${sentenceObjects.map(item=>`<button class="need-card ${sentenceItem===item.id?'active':''}" data-sentence-object="${item.id}" aria-pressed="${sentenceItem===item.id}"><div class="art">${art(item.id)}</div><span>${t(...item.noun)}</span></button>`).join('')}</div><section id="sentenceBuild" class="sentence-build" aria-live="polite"></section>`;
  $('#sentenceBack').onclick=()=>needsHome(needsTab);
  document.querySelectorAll('[data-sentence-object]').forEach(button=>button.onclick=()=>{sentenceItem=button.dataset.sentenceObject;sentencePartsDone=level===1?1:0;sentenceHome(false);if(level===1)speak(t(...sentenceObjects.find(item=>item.id===sentenceItem).noun))});
  renderSentenceBuild();revealGameStart();
}
function renderSentenceBuild(){
  const item=sentenceObjects.find(item=>item.id===sentenceItem);if(!item){$('#sentenceBuild').innerHTML=`<p>${t('Bir resim seçelim.','Let’s choose a picture.')}</p>`;return}
  const parts=sentenceParts(item),complete=sentencePartsDone>=parts.length;
  $('#sentenceBuild').innerHTML=`<p class="sentence-result">${sentencePartsDone?parts.slice(0,sentencePartsDone).join(' '):t('Kartlara dokunalım.','Let’s tap the cards.')}</p><div class="word-cards">${parts.map((part,index)=>`<button class="primary word-card" data-word-part="${index}" ${index===sentencePartsDone?'':'disabled'}>${part}</button>`).join('')}</div><div class="actions"><button class="primary" id="sentenceSpeak" ${complete?'':'disabled'}>${t('Cümlemi söyle','Say my sentence')}</button><button class="quiet" id="sentenceModel">${t('Örneği dinle','Hear the example')}</button><button class="quiet" id="sentenceClear">${t('Yeniden kur','Build again')}</button></div>`;
  document.querySelectorAll('[data-word-part]').forEach(button=>button.onclick=()=>{sentencePartsDone++;renderSentenceBuild();speak(parts.slice(0,sentencePartsDone).join(' '))});
  $('#sentenceSpeak').onclick=()=>speak(parts.join(' '));$('#sentenceModel').onclick=()=>speak(parts.join(' '));$('#sentenceClear').onclick=()=>{cancelSpeech();sentencePartsDone=0;renderSentenceBuild()};
}
function addSentenceSettings(){
  $('#settingsBody').insertAdjacentHTML('beforeend',`<section class="level-card"><h3>${t('Kelime → cümle','Word → sentence')}</h3><p class="setting-note">${t('İhtiyaç kartları her zaman tek dokunuşla açıktır. Bu seçim yalnızca cümle çalışmasının seviyesidir. Otomatik yükselmez, sesli tekrar istenmez ve yanıtlar puanlanmaz.','Needs cards are always available with one tap. This sets only the sentence practice level. There is no automatic advancement, required repetition or scoring.')}</p><label for="sentenceLevel">${t('Cümle seviyesi','Sentence level')}</label><select id="sentenceLevel">${sentenceLevelNames.map((pair,index)=>`<option value="${index+1}" ${sentenceLevel()===index+1?'selected':''}>${index+1} · ${t(...pair)}</option>`).join('')}</select></section>`);
  $('#sentenceLevel').onchange=()=>{topicState('sentences').level=Number($('#sentenceLevel').value);save()};
}
const settingsBeforeNeeds=settings;settings=function(){settingsBeforeNeeds();addSentenceSettings()};
const levelsBeforeNeeds=levelPanel;levelPanel=function(){levelsBeforeNeeds();addSentenceSettings()};
const homeBeforeNeeds=home;home=function(){homeBeforeNeeds();$('.section-title').insertAdjacentHTML('beforebegin',`<section class="needs-entry"><button class="primary" id="needsEntry">${t('İsteklerim · söylemek istiyorum','My needs · I want to say something')}</button><button class="quiet" id="sentencesEntry">${t('Kelime → cümle','Word → sentence')}</button></section>`);$('#needsEntry').onclick=()=>needsHome();$('#sentencesEntry').onclick=()=>sentenceHome()};
document.querySelector('header nav').insertAdjacentHTML('afterbegin',`<button class="quiet" id="quickNeeds">${t('İsteklerim','My needs')}</button>`);
$('#quickNeeds').onclick=()=>{if($('#settings').open)$('#settings').close();needsHome()};
const languageBeforeNeeds=$('#language').onclick;
$('#language').onclick=()=>{if(screen==='needs'||screen==='sentences'){const current=screen;cancelSpeech();lang=tr()?'en':'tr';save();if(current==='needs')needsHome(needsTab);else{sentencePartsDone=0;sentenceHome(false)}}else languageBeforeNeeds();$('#quickNeeds').textContent=t('İsteklerim','My needs')};
