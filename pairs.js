miniNames.pairs=['Kapalı kartlar','Memory pairs'];
let pairDeck=[],pairFlipped=[],pairMatched=[],pairEpoch=0,pairSaved=false,pairTimer=null;
function stopPairTimer(){if(pairTimer!==null)clearTimeout(pairTimer);pairTimer=null}
function startPairs(id){
  stopPairTimer();cancelSpeech();pairEpoch++;miniKind='pairs';category=groups.find(group=>group.id===id);
  const count=Math.min((Number(prefs.pairCardCount)===10?10:8)/2,activeItems().length);
  const chosen=shuffle(activeItems()).slice(0,count);
  pairDeck=shuffle(chosen.flatMap(id=>[id,id]));pairFlipped=[];pairMatched=[];pairSaved=false;
  renderPairs();revealGameStart();speak(namePrefix()+t('iki kart aç. Aynı resimleri bulalım.','turn over two cards. Let’s find the same pictures.'));
}
const startMiniBeforePairs=startMini;startMini=function(id,kind){if(kind==='pairs')startPairs(id);else startMiniBeforePairs(id,kind)};
const menuBeforePairs=lessonMenu;lessonMenu=function(id){stopPairTimer();menuBeforePairs(id);$('.mini-menu').insertAdjacentHTML('beforeend',`<button class="category" data-mini="pairs" style="--tint:#e6eaf0"><div class="art">${art(category.cover)}</div><h3>${miniTitle('pairs')}</h3><p>${t('İki kart aç, aynı resimleri bul.','Turn over two cards and find the pairs.')}</p></button>`);document.querySelector('[data-mini="pairs"]').onclick=()=>startPairs(id)};
const homeBeforePairs=home;home=function(){stopPairTimer();homeBeforePairs()};
function renderPairs(){
  screen='pairs';chrome();const done=pairMatched.length===pairDeck.length,total=pairDeck.length/2;
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="pairsBack">← ${t('Oyunlar','Games')}</button><span class="tag">${miniTitle('pairs')} · ${pairMatched.length/2} / ${total}</span></div><section class="question"><h1>${done?t('Aferin Eyüp! Hepsini buldun.','Well done, Eyüp! You found them all.'):t('İki kart açalım.','Let’s turn over two cards.')}</h1><p>${t('Aynı resimler eşleşince yerleri boşalır. Süre sınırı yok.','Matched pictures disappear. There is no time limit.')}</p>${pairDeck.length<(Number(prefs.pairCardCount)===10?10:8)?`<p class="setting-note">${t('Bu seviyedeki farklı resim sayısına göre','Using the distinct pictures in this level:')} ${pairDeck.length} ${t('kart. Daha çok kart için ebeveyn bir sonraki seviyeyi seçebilir.','cards. A parent can choose the next level for more cards.')}</p>`:''}</section><div class="pair-board">${pairDeck.map((id,index)=>{const matched=pairMatched.includes(index),open=pairFlipped.includes(index);return `<button class="pair-card ${open?'open':''} ${matched?'matched':''}" data-pair="${index}" ${matched||open||pairFlipped.length===2?'disabled':''} ${matched?'aria-hidden="true"':''} aria-label="${matched?t('Eşleşti','Matched'):open?label(id):t('Kapalı kart','Face-down card')+' '+(index+1)}"><span class="pair-back" aria-hidden="true">✦</span><span class="art pair-front" aria-hidden="true">${art(id)}</span></button>`}).join('')}</div><div class="actions">${done?`<button class="primary" id="pairsAgain">${t('Yine oyna','Play again')}</button>`:pairFlipped.length===2?`<button class="quiet" id="pairsClose">${t('Kartları kapat','Close the cards')}</button>`:''}</div>`;
  $('#pairsBack').onclick=()=>lessonMenu(category.id);document.querySelectorAll('[data-pair]').forEach(button=>button.onclick=()=>flipPair(Number(button.dataset.pair)));
  if(done)$('#pairsAgain').onclick=()=>startPairs(category.id);if($('#pairsClose'))$('#pairsClose').onclick=closePairMismatch;
}
function closePairMismatch(){stopPairTimer();if(screen!=='pairs')return;pairFlipped=[];renderPairs()}
function flipPair(index){
  if(screen!=='pairs'||pairFlipped.length===2||pairMatched.includes(index)||pairFlipped.includes(index)||!Number.isInteger(index)||index<0||index>=pairDeck.length)return;
  pairFlipped.push(index);
  if(pairFlipped.length===2){
    if(pairDeck[pairFlipped[0]]===pairDeck[pairFlipped[1]]){
      pairMatched.push(...pairFlipped);pairFlipped=[];
      const done=pairMatched.length===pairDeck.length;
      if(done&&!pairSaved){pairSaved=true;const stats=miniStats('pairs');stats.sessions++;stats.rounds++;stats.solved+=pairDeck.length/2;save()}
      renderPairs();speak(done?t('Aferin Eyüp! Hepsini buldun.','Well done, Eyüp! You found them all.'):t('Aynı resimleri buldun!','You found the same pictures!'));
    }else{
      renderPairs();const epoch=pairEpoch;pairTimer=setTimeout(()=>{pairTimer=null;if(epoch!==pairEpoch)return;if(screen==='pairs')closePairMismatch();else pairFlipped=[]},1500);
    }
  }else{renderPairs();speak(label(pairDeck[index]))}
}
function addPairSettings(){
  $('#settingsBody').insertAdjacentHTML('beforeend',`<section class="level-card"><h3>${miniTitle('pairs')}</h3><label for="pairCardCount">${t('Kart sayısı','Number of cards')}</label><select id="pairCardCount"><option value="8">${t('8 kart · 4 çift','8 cards · 4 pairs')}</option><option value="10">${t('10 kart · 5 çift','10 cards · 5 pairs')}</option></select><p class="setting-note">${t('Yalnızca seçili seviyenin nesneleri kullanılır. Yeterli farklı resim yoksa daha az kart açılır.','Only pictures from the selected level are used. Fewer distinct pictures mean fewer cards.')}</p></section>`);
  $('#pairCardCount').value=String(Number(prefs.pairCardCount)===10?10:8);$('#pairCardCount').onchange=()=>{prefs.pairCardCount=Number($('#pairCardCount').value);save()};
}
const settingsBeforePairs=settings;settings=function(){settingsBeforePairs();addPairSettings()};
const levelsBeforePairs=levelPanel;levelPanel=function(){levelsBeforePairs();addPairSettings()};
const languageBeforePairs=$('#language').onclick;$('#language').onclick=()=>{if(screen==='pairs'){cancelSpeech();lang=tr()?'en':'tr';save();renderPairs()}else languageBeforePairs()};
