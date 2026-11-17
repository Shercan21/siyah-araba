miniNames.basket=['Sepete koy / çıkar','In and out of the basket'];
let basketItems=[],basketInside=[],basketTarget=null,basketTaken=null,basketNamed=false;
const fruitObjectForms={apple:'elmayı',banana:'muzu',orange:'portakalı',pear:'armudu',strawberry:'çileği',grapes:'üzümü',watermelon:'karpuzu',cherries:'kirazı',melon:'kavunu',apricot:'kayısıyı',peach:'şeftaliyi',plum:'eriği',pineapple:'ananası',mandarin:'mandalinayı',lemon:'limonu',pomegranate:'narı',fig:'inciri',kiwi:'kiviyi',quince:'ayvayı',blackberry:'böğürtleni',raspberry:'ahududuyu',mulberry:'dutu',sourCherry:'vişneyi',dateFruit:'hurmayı'};
function basketInstruction(){
  if(basketTaken)return namePrefix()+t('bu ne?','what is this?');
  if(basketTarget)return namePrefix()+t(`${fruitObjectForms[basketTarget]} sepete koy.`,`put the ${label(basketTarget).toLowerCase()} in the basket.`);
  return namePrefix()+t('sepetten bir meyve çıkar.','take a fruit out of the basket.');
}
function chooseBasketTarget(){basketTarget=basketItems.find(id=>!basketInside.includes(id))||null}
function startBasket(){
  stopPairTimer();cancelSpeech();category=groups.find(group=>group.id==='fruit');miniKind='basket';
  basketItems=shuffle(activeItems()).slice(0,Math.min(choiceCount(),activeItems().length));
  basketInside=[];basketTaken=null;basketNamed=false;chooseBasketTarget();renderBasket();revealGameStart();speak(basketInstruction());
}
const menuBeforeBasket=lessonMenu;lessonMenu=function(id){menuBeforeBasket(id);if(id!=='fruit')return;
  $('.mini-menu').insertAdjacentHTML('beforeend',`<button class="category" id="basketMode" style="--tint:#f4e4cc"><div class="art">${art('apple')}</div><h3>${miniTitle('basket')}</h3><p>${t('Meyveyi sepete koy, çıkarınca adını söyleyelim.','Put fruit in, take it out, and name it together.')}</p></button>`);$('#basketMode').onclick=startBasket;
};
function basketAnswer(){const name=label(basketTaken).toLowerCase();return t('Bu '+label(basketTaken).toLocaleLowerCase('tr')+'.',['grapes','cherries'].includes(basketTaken)?'These are '+name+'.':'This is '+(/^[aeiou]/i.test(name)?'an ':'a ')+name+'.')}
function returnFruitToBasket(){if(!basketTaken)return;basketInside.push(basketTaken);continueBasket()}
function renderBasket(){
  screen='basket';chrome();
  $('#app').innerHTML=`<div class="game-top"><button class="quiet" id="basketBack">← ${t('Meyve oyunları','Fruit games')}</button><span class="tag">${miniTitle('basket')}</span><button class="quiet" id="basketRestart">${t('Yeniden başla','Start again')}</button></div>${basketTaken?`<section class="basket-question"><h1>${basketInstruction()}</h1><div class="art basket-big" role="img" aria-label="${t('Sepetten çıkan meyve','Fruit taken out of the basket')}">${art(basketTaken)}</div><p class="setting-note">${t('İstediğin kadar düşünebilirsin. Söyleyebilir, işaret edebilir veya dinleyebilirsin.','Take as long as you like. You can speak, point, or listen.')}</p><p class="basket-answer" aria-live="polite">${basketNamed?basketAnswer():''}</p><div class="actions"><button class="primary" id="basketName">${t('Adını dinle','Hear its name')}</button><button class="quiet" id="basketAsk">${t('Soruyu tekrar dinle','Hear the question again')}</button><button class="quiet" id="basketContinue">${t('Devam et','Continue')}</button><button class="quiet" id="basketPutBack">${t('Yeniden sepete koy','Put it back in the basket')}</button></div></section>`:`<section class="question"><h1>${basketInstruction()}</h1><button class="listen" id="basketListen">${t('Tekrar dinle','Listen again')}</button><p class="setting-note">${t('Meyveye dokun: sepete girsin. Sepetteki meyveye dokun: dışarı çıksın.','Tap a fruit to put it in. Tap a fruit in the basket to take it out.')}</p></section><div class="basket-tray" aria-label="${t('Sepetin dışındaki meyveler','Fruit outside the basket')}">${basketItems.filter(id=>!basketInside.includes(id)).map(id=>`<button class="basket-fruit" data-basket-put="${id}" aria-label="${label(id)}"><div class="art">${art(id)}</div><span>${label(id)}</span></button>`).join('')||`<p>${t('Meyveler sepette. Şimdi birini çıkaralım.','The fruit is in the basket. Let’s take one out.')}</p>`}</div><section class="basket-box" aria-label="${t('Meyve sepeti','Fruit basket')}"><div class="basket-handle" aria-hidden="true"></div><h2>${t('Sepet','Basket')}</h2><div class="basket-inside">${basketInside.map(id=>`<button class="basket-fruit" data-basket-take="${id}" aria-label="${label(id)} · ${t('sepetten çıkar','take out')} "><div class="art">${art(id)}</div></button>`).join('')||`<p>${t('Meyveleri buraya koyalım.','Let’s put the fruit here.')}</p>`}</div></section><p id="basketHint" class="setting-note" aria-live="polite"></p>`}`;
  $('#basketBack').onclick=()=>lessonMenu('fruit');$('#basketRestart').onclick=startBasket;
  if(basketTaken){$('#basketName').onclick=()=>{basketNamed=true;renderBasket();speak(basketAnswer())};$('#basketAsk').onclick=()=>speak(basketInstruction());$('#basketContinue').onclick=continueBasket;$('#basketPutBack').onclick=returnFruitToBasket}
  else{$('#basketListen').onclick=()=>speak(basketInstruction());document.querySelectorAll('[data-basket-put]').forEach(button=>button.onclick=()=>putInBasket(button.dataset.basketPut));document.querySelectorAll('[data-basket-take]').forEach(button=>button.onclick=()=>takeFromBasket(button.dataset.basketTake))}
}
function putInBasket(id){
  if(screen!=='basket'||basketTaken||!basketItems.includes(id)||basketInside.includes(id))return;
  if(id!==basketTarget){$('#basketHint').textContent=basketInstruction();speak(basketInstruction());return}
  basketInside.push(id);chooseBasketTarget();renderBasket();speak(basketInstruction());
}
function takeFromBasket(id){
  if(screen!=='basket'||basketTaken||!basketInside.includes(id))return;
  basketInside=basketInside.filter(item=>item!==id);basketTaken=id;basketNamed=false;chooseBasketTarget();renderBasket();revealGameStart();speak(basketInstruction());
}
function continueBasket(){basketTaken=null;basketNamed=false;chooseBasketTarget();renderBasket();revealGameStart();speak(basketInstruction())}
const languageBeforeBasket=$('#language').onclick;$('#language').onclick=()=>{if(screen==='basket'){cancelSpeech();lang=tr()?'en':'tr';save();renderBasket();speak(basketInstruction())}else languageBeforeBasket()};
