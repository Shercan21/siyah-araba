// Add vocabulary in small, parent-selected steps, from familiar to detailed.
const detailSets = {
 bodyDetails: [['head','Baş','Head'],['hair','Saç','Hair'],['eyebrow','Kaş','Eyebrow'],['eyelash','Kirpik','Eyelash'],['teeth','Diş','Teeth'],['tongue','Dil','Tongue'],['neck','Boyun','Neck'],['finger','Parmak','Finger'],['knee','Diz','Knee'],['elbow','Dirsek','Elbow'],['belly','Karın','Belly'],['backBody','Sırt','Back'],['forehead','Alın','Forehead'],['cheek','Yanak','Cheek'],['chin','Çene','Chin'],['nail','Tırnak','Fingernail']],
 dailyDetails: [['bed','Yatak','Bed'],['chair','Sandalye','Chair'],['table','Masa','Table'],['door','Kapı','Door'],['window','Pencere','Window'],['lamp','Lamba','Lamp'],['book','Kitap','Book'],['pencil','Kalem','Pencil'],['backpack','Çanta','Backpack'],['clock','Saat','Clock'],['key','Anahtar','Key'],['phone','Telefon','Phone'],['pillow','Yastık','Pillow'],['blanket','Battaniye','Blanket'],['bin','Çöp kutusu','Bin'],['washingMachine','Çamaşır makinesi','Washing machine']],
 clothesDetails: [['sweater','Kazak','Sweater'],['shorts','Şort','Shorts'],['dress','Elbise','Dress'],['pajamas','Pijama','Pajamas'],['boots','Bot','Boots'],['sandals','Sandalet','Sandals'],['scarf','Atkı','Scarf'],['raincoat','Yağmurluk','Raincoat'],['vest','Yelek','Vest'],['shirt','Gömlek','Shirt'],['belt','Kemer','Belt'],['slippers','Terlik','Slippers'],['swimShorts','Mayo','Swim shorts'],['cap','Kasket','Cap'],['hairclip','Toka','Hair clip'],['helmet','Kask','Helmet']],
 natureDetails: [['grass','Çimen','Grass'],['stone','Taş','Stone'],['sand','Kum','Sand'],['puddle','Su birikintisi','Puddle'],['garden','Bahçe','Garden'],['beach','Sahil','Beach'],['lake','Göl','Lake'],['waterfall','Şelale','Waterfall'],['bridge','Köprü','Bridge'],['road','Yol','Road'],['park','Park','Park'],['bush','Çalı','Bush'],['acorn','Palamut','Acorn'],['pinecone','Kozalak','Pine cone'],['wildMushroom','Ormandaki mantar','Forest mushroom'],['nest','Yuva','Nest']],
 peopleActions: [['baby','Bebek','Baby'],['youngerBrother','Erkek kardeş','Younger brother'],['youngerSister','Kız kardeş','Younger sister'],['cousin','Kuzen','Cousin'],['doctor','Doktor','Doctor'],['teacher','Öğretmen','Teacher'],['neighbor','Komşu','Neighbor'],['friend','Arkadaş','Friend'],['eat','Ye','Eat'],['drink','İç','Drink'],['wash','Ellerini yıka','Wash your hands'],['brush','Dişlerini fırçala','Brush your teeth'],['sleep','Uyu','Sleep'],['walk','Yürü','Walk'],['run','Koş','Run'],['tidy','Topla','Tidy up']]
};
for (const [sheet, entries] of Object.entries(detailSets)) {
  pictureAtlases[sheet] = entries.map(entry => entry[0]);
  for (const [id, turkish, english] of entries) words[id] = [turkish, english];
}
function setSteps(id, steps, titles) {
  curriculum[id] = steps;
  groups.find(group => group.id === id).items = steps.flat();
  expansionLevelLabels[id] = steps.map((_, index) => titles[Math.min(index, titles.length - 1)]);
}
const basic = ['Temel', 'Basic'], familiar = ['Günlük yaşam', 'Everyday life'], detail = ['Ayrıntılar', 'Details'];
setSteps('body', [['hand','foot','eye','nose'],['ear','mouth','head','hair'],['arm','leg','belly','backBody'],['finger','knee','neck','teeth'],['eyebrow','eyelash','tongue','elbow'],['forehead','cheek','chin','nail']], [basic,basic,familiar,familiar,detail,detail]);
setSteps('daily', [['glass','spoon','plate','ball'],['bed','chair','table','door'],['book','pencil','backpack','phone'],['toothbrush','comb','soap','towel'],['window','lamp','clock','key'],['pillow','blanket','bin','washingMachine']], [basic,basic,familiar,familiar,detail,detail]);
setSteps('clothes', [['shoes','socks','tshirt','trousers'],['coat','hat','sweater','pajamas'],['shorts','dress','skirt','gloves'],['boots','sandals','scarf','slippers'],['raincoat','vest','shirt','swimShorts'],['belt','cap','hairclip','helmet']], [basic,basic,familiar,familiar,detail,detail]);
setSteps('nature', [['tree','flower','sun','moon','cloud','house'],['rain','leaf','grass','stone'],['school','playground','road','park'],['garden','sand','puddle','sea'],['mountain','river','forest','snow'],['rainbow','beach','lake','bridge'],['bush','nest','pinecone','acorn'],['waterfall','wildMushroom']], [basic,basic,familiar,familiar,familiar,detail,detail,detail]);
setSteps('family', [['brother','sister','mother','father','grandmotherP','grandfather'],['uncleM','auntP','uncleP','auntM'],['grandmotherM','child','baby','youngerBrother'],['youngerSister','cousin','friend','neighbor'],['teacher','doctor']], [basic,familiar,familiar,detail,detail]);
groups.find(group => group.id === 'family').names = ['Ailem ve İnsanlar', 'Family and People'];
setSteps('actions', [['open','close','take','give'],['come','stop','sit','stand'],['eat','drink','sleep','walk'],['put','show','wash','brush'],['run','tidy']], [basic,basic,familiar,familiar,detail]);
const newColors = {gray:['Gri','Gray','#929599'],burgundy:['Bordo','Burgundy','#800020'],olive:['Zeytin yeşili','Olive green','#707d35'],gold:['Altın rengi','Gold','#cfad47'],silver:['Gümüş rengi','Silver','#bcc3cc'],mint:['Mint yeşili','Mint green','#9cdbb4'],coral:['Mercan','Coral','#f18472'],cream:['Krem','Cream','#fff0c9']};
for (const [id,[turkish,english]] of Object.entries(newColors)) words[id] = [turkish,english];
setSteps('colors', [['red','yellow','blue','green'],['orangeColor','purple','black','white'],['pink','brown','gray'],['turquoise','navy','lilac','beige'],['burgundy','olive','mint','cream'],['gold','silver','coral']], [basic,basic,familiar,detail,detail,detail]);
const numberWords = [['On bir','Eleven'],['On iki','Twelve'],['On üç','Thirteen'],['On dört','Fourteen'],['On beş','Fifteen'],['On altı','Sixteen'],['On yedi','Seventeen'],['On sekiz','Eighteen'],['On dokuz','Nineteen'],['Yirmi','Twenty']];
numberWords.forEach((pair,index) => words[String(index+11)] = pair);
setSteps('numbers', [['1','2','3'],['4','5'],['6','7'],['8','9','10'],['11','12','13'],['14','15','16'],['17','18','19','20']], [basic,basic,familiar,familiar,detail,detail,detail]);
const geometry = {pentagon:['Beşgen','Pentagon'],hexagon:['Altıgen','Hexagon'],octagon:['Sekizgen','Octagon'],trapezoid:['Yamuk','Trapezoid'],cube:['Küp','Cube'],sphere:['Küre','Sphere'],cylinder:['Silindir','Cylinder'],cone:['Koni','Cone']};
Object.assign(words,geometry);
setSteps('shapes', [['circle','square','triangle'],['rectangle','star','heart'],['oval','diamond'],['pentagon','hexagon','octagon','trapezoid'],['cube','sphere','cylinder','cone']], [basic,basic,familiar,detail,detail]);
// Reorder large collections so common objects come before specialist varieties.
function orderedSteps(topic, levels) {setSteps(topic,levels,levels.map((_,i) => i===0?basic:i<4?familiar:detail));}
orderedSteps('animals', [['hen','bird','horse','donkey','cat','dog','duck','cow','sheep'],['goat','goose','rabbit','fish'],['turtle','chick','turkey','butterfly'],['bee','ladybug','ant','snail'],['lion','tiger','elephant','monkey'],['bear','wolf','fox','squirrel'],['hedgehog','deer','zebra','giraffe'],['hippo','rhino','kangaroo','panda'],['koala','camel','polarBear','leopard'],['dolphin','whale','shark','octopus'],['crab','starfish','seal','penguin'],['pigeon','seagull','stork','parrot'],['owl','eagle','flamingo','peacock'],['worm','spider','frog','mouse'],['crocodile','snake','lizard']]);
orderedSteps('cars', [['car','bus','truck','tractor','plane','helicopter','ship','ambulance','firetruck','police'],['bicycle','motorcycle','train','taxi'],['schoolBus','minibus','ferry','pickup'],['excavator','dozer','garbageTruck','tram'],['metro','atv','mixer','crane'],['towTruck','sailboat','camper','jeep'],['raceCar','sportsCar','semiTruck','balloon'],['cargoShip','canoe','speedboat','fishingBoat'],['jetski','submarine','rocket','zeppelin'],['parachute','forklift','roller','harvester'],['carriage']]);
orderedSteps('fruit', [['apple','banana','orange','pear'],['strawberry','grapes','watermelon','cherries'],['mandarin','lemon','melon','peach'],['apricot','plum','pomegranate','fig'],['pineapple','kiwi','quince','dateFruit'],['blackberry','raspberry','mulberry','sourCherry']]);
orderedSteps('veg', [['carrot','tomato','pepper','potato'],['cucumber','onion','zucchini','corn'],['lettuce','spinach','peas','beans'],['broccoli','eggplant','cabbage','cauliflower'],['pumpkin','garlic','parsley','leek'],['radish','beetroot','artichoke','mushroom']]);
const artBeforeDetails = art;
art = function(id) {
  if (/^\d+$/.test(id)) return `<div class="number-art">${id}</div>`;
  if (newColors[id]) return wrap(`<rect x="40" y="20" width="120" height="120" rx="25" fill="${newColors[id][2]}" stroke="#9ba59b" stroke-width="2"/>`);
  const polygons={pentagon:'100,16 162,63 138,137 62,137 38,63',hexagon:'65,20 135,20 170,80 135,140 65,140 30,80',octagon:'70,18 130,18 162,50 162,110 130,142 70,142 38,110 38,50',trapezoid:'65,30 135,30 170,130 30,130'};
  if(polygons[id]) return wrap(`<polygon points="${polygons[id]}" fill="#91a5c7" stroke="#617a9a" stroke-width="3"/>`);
  const solids={cube:'<path d="M100 16L166 49L100 82L34 49Z" fill="#a7cbd3"/><path d="M34 49L100 82V147L34 114Z" fill="#72a4b4"/><path d="M100 82L166 49V114L100 147Z" fill="#4f849a"/>',sphere:'<defs><radialGradient id="sphere"><stop stop-color="#d4e9cf"/><stop offset="1" stop-color="#6a9b72"/></radialGradient></defs><circle cx="100" cy="80" r="62" fill="url(#sphere)"/>',cylinder:'<path d="M45 43V118C45 151 155 151 155 118V43" fill="#b6a3d0"/><ellipse cx="100" cy="43" rx="55" ry="21" fill="#d8cbe8"/>',cone:'<path d="M100 15L161 127Q100 163 39 127Z" fill="#e6b878"/><path d="M39 127Q100 153 161 127" fill="none" stroke="#bd8f51" stroke-width="3"/>'};
  return solids[id]?wrap(solids[id]):artBeforeDetails(id);
};
const teachingBeforeDetails = teachingSentence;
teachingSentence = function(id) {
  const commands={eat:['yemek ye.','eat your food.'],drink:['su iç.','drink water.'],wash:['ellerini yıka.','wash your hands.'],brush:['dişlerini fırçala.','brush your teeth.'],sleep:['uyu.','sleep.'],walk:['yürü.','walk.'],run:['koş.','run.'],tidy:['oyuncakları topla.','tidy up the toys.']};
  return category.id==='actions'&&commands[id]?namePrefix()+t(...commands[id]):teachingBeforeDetails(id);
};
dialogueLevels.push([
 {title:['Acıktım','I am hungry'],scene:'eat',a:['Eyüp, neye ihtiyacın var?','Eyüp, what do you need?'],b:['Acıktım. Yemek istiyorum.','I am hungry. I want food.']},
 {title:['Su istiyorum','I want water'],scene:'drink',a:['Eyüp, ne istiyorsun?','Eyüp, what would you like?'],b:['Su istiyorum.','I want water.']},
 {title:['Tuvalete gitmek istiyorum','I need the toilet'],scene:'house',a:['Eyüp, bir şey söylemek ister misin?','Eyüp, would you like to tell me something?'],b:['Tuvalete gitmek istiyorum.','I need to go to the toilet.']}
],[
 {title:['Çişim geldi','I need to pee'],scene:'needPee',a:['Eyüp, seni dinliyorum.','Eyüp, I am listening.'],b:['Çişim geldi.','I need to pee.']},
 {title:['Kakam geldi','I need to poo'],scene:'needPoo',a:['Eyüp, seni dinliyorum.','Eyüp, I am listening.'],b:['Kakam geldi.','I need to poo.']},
 {title:['Karnım ağrıyor','My tummy hurts'],scene:'needBelly',a:['Eyüp, nasıl hissediyorsun?','Eyüp, how do you feel?'],b:['Karnım ağrıyor.','My tummy hurts.']}
]);
curriculum.talk=dialogueLevels.map(level=>level.map((_,index)=>String(index)));
