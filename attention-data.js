exploreHubs.attention={names:['Dikkat','Attention'],cover:'ball',parts:['odd','same','drawing','sceneCount','shadow','coding','halfWhole','maze','associations']};
Object.assign(exploreParts,{
 odd:{names:['Farklı olanı bul','Find the different one'],hint:['Benzer resimler arasında farkı seç','Choose the different picture'],levels:3},
 same:{names:['Aynısını bul','Find the same one'],hint:['Örnek resmin aynısını seç','Match the example'],levels:3},
 drawing:{names:['Noktalar ve yanına çiz','Join dots and copy'],hint:['Noktaları birleştir, yanına çiz','Join the dots, then draw beside it'],levels:3},
 sceneCount:{names:['Büyük resimde say','Count in the big picture'],hint:['Karışık resimde isteneni say','Find and count the requested objects'],levels:3},
 shadow:{names:['Gölge eşleme','Match the shadow'],hint:['Bu gölge hangi resme ait?','Which picture matches this shadow?'],levels:3},
 coding:{names:['Şekil kodlama','Shape coding'],hint:['Örneklere bak, eksik kodu tamamla','Use the examples to complete the code'],levels:3},
 halfWhole:{names:['Yarım–bütün','Part and whole'],hint:['Yarım resmin bütününü veya eksik parçasını bul','Find the whole picture or missing half'],levels:3},
 maze:{names:['Kuşu yuvasına götür','Guide the bird home'],hint:['Labirentte açık yolu takip et','Follow the open maze path'],levels:3},
 associations:{names:['İlişkili olanı bul','Find what goes together'],hint:['Birlikte kullanılan nesneleri eşle','Match objects used together'],levels:3}
});
for(const id of exploreHubs.attention.parts)exploreBanks[id]=[];
// Different-one questions have exactly one visual outlier, never two equally valid choices.
[['apple','banana'],['cat','dog'],['car','bus'],['circle','triangle'],['red','blue'],['yellow','green'],['opBig','opSmall'],['opLong','opShort'],['shirt','shoes'],['star','heart'],['ball','car'],['bird','cat']].forEach(([common,different],index)=>{
 const stage=Math.floor(index/4)+1,size=stage===1?3:stage===2?4:6;
 const q=addExplore('odd',stage,['Hangisi diğerlerinden farklı?','Which one is different?'],null,[eo('different',words[different]?.[0]||'Farklı resim',words[different]?.[1]||'Different picture',different),...Array.from({length:size-1},(_,i)=>eo('same-'+i,words[common]?.[0]||'Diğer resim',words[common]?.[1]||'Other picture',common))]);q.allOptions=true;
});
[['apple',['banana','pear','orange']],['car',['bus','truck','plane']],['cat',['dog','bird','rabbit']],['ball',['book','glass','plate']],['grapes',['cherries','strawberry','banana']],['tshirt',['coat','socks','hat']],['tree',['flower','cloud','house']],['hand',['foot','eye','ear']],['triangle',['square','circle','star']],['pencil',['comb','spoon','key']],['goat',['cow','sheep','horse']],['train',['tram','metro','bus']]].forEach(([id,others],index)=>addExplore('same',Math.floor(index/4)+1,['Örnek resmin aynısı hangisi?','Which picture is the same as the example?'],id,[id,...others].map(wordOption)));
const crowdPositions=Array.from({length:16},(_,index)=>({x:4+(index%4)*24+(index%3)*1.2,y:3+Math.floor(index/4)*24+((index+1)%3)*1.3}));
[['cat',2],['car',3],['apple',1],['bird',4],['dog',4],['ball',5],['cat',3],['car',6],['bird',6],['apple',7],['dog',8],['ball',5]].forEach(([id,n],index)=>{
 const stage=Math.floor(index/4)+1,otherIds=['cat','car','apple','bird','dog','ball'].filter(key=>key!==id),extra=stage===1?2:stage===2?4:6;
 const objects=[...Array(n).fill(id),...Array.from({length:extra},(_,i)=>otherIds[i%otherIds.length])];
 // Stable arrangement across retries; the scene never changes after an answer.
 const mixed=objects.map((value,i)=>({value,key:(i*7+index*3)%19})).sort((a,b)=>a.key-b.key).map((entry,i)=>({id:entry.value,...crowdPositions[i]}));
 const numbers=[n,...[n+1,n-1,n+2,n-2].filter(x=>x>=0&&x<=10)].slice(0,4);
 addExplore('sceneCount',stage,['Resimde kaç '+words[id][0].toLocaleLowerCase('tr')+' var?','How many '+({cat:'cats',car:'cars',apple:'apples',bird:'birds',dog:'dogs',ball:'balls'})[id]+' are in the picture?'],{type:'crowd',objects:mixed},numbers.map(value=>eo('count-'+value,...countNames[value],{type:'number',number:value})));
});
const shadowItems=['circle','triangle','apple','banana','square','heart','car','cat','orange','pear','dog','bus'];
shadowItems.forEach((id,index)=>addExplore('shadow',Math.floor(index/4)+1,['Bu gölge hangi resme ait?','Which picture matches this shadow?'],{type:'shadow',id},[id,...shadowItems.filter(key=>key!==id).slice(0,3)].map(key=>eo(key,...words[key],{type:'vector',id:key}))));
for(let stage=1;stage<=3;stage++)for(let index=0;index<4;index++){
 const keys=['circle','triangle','square','star'].slice(0,stage+1),targetLength=stage===1?1:stage===2?2:3;
 const sequence=Array.from({length:targetLength},(_,i)=>keys[(index+i)%keys.length]),missing=index%targetLength,correct=keys.indexOf(sequence[missing])+1;
 const rules=keys.map((shape,i)=>({shape,code:i+1}));
 addExplore('coding',stage,['Soru işaretinin yerine hangi kod gelmeli?','Which code belongs in the question mark?'],{type:'coding',rules,examples:[keys[0],keys[1],keys[2]||keys[0]],sequence,missing},[correct,...rules.map(rule=>rule.code).filter(value=>value!==correct)].map(value=>eo('code-'+value,...countNames[value],{type:'number',number:value})));
}
const halfItems=['circle','square','triangle','heart','apple','banana','orange','pear','car','bus','cat','dog'];
halfItems.forEach((id,index)=>{
 const stage=Math.floor(index/4)+1,others=halfItems.filter(key=>key!==id).slice(stage===3?4:0,(stage===3?4:0)+3);
 const q=addExplore('halfWhole',stage,stage===3?['Hangi parça resmi tamamlar?','Which piece completes the picture?']:['Yarım resmin bütünü hangisi?','Which whole picture matches this half?'],{type:'half',id,side:'left'},[id,...others].map(key=>eo(key,...words[key],stage===3?{type:'half',id:key,side:'right'}:{type:'vector',id:key})));
 q.revealAfter={type:'vector',id};
});
// New everyday objects also join the ordinary category games in later levels.
Object.assign(words,{toothpaste:['Diş macunu','Toothpaste'],sharpener:['Kalemtıraş','Pencil sharpener'],lock:['Kilit','Lock'],umbrella:['Şemsiye','Umbrella'],wateringCan:['Sulama kabı','Watering can']});
const associationIds=['toothbrush','toothpaste','pencil','sharpener','lock','key','shoes','socks','plate','spoon','umbrella','rain','bed','pillow','flower','wateringCan'];
pictureAtlases.associations=associationIds;
extendTopic('daily',['toothpaste','sharpener','lock','umbrella','wateringCan'],['Birlikte kullanılan eşyalar','Objects used together']);
const associationLinks=[['toothbrush','toothpaste'],['pencil','sharpener'],['lock','key'],['shoes','socks'],['plate','spoon'],['rain','umbrella'],['bed','pillow'],['flower','wateringCan'],['toothpaste','toothbrush'],['sharpener','pencil'],['key','lock'],['pillow','bed']];
associationLinks.forEach(([source,target],index)=>{
 const distractors=['lock','shoes','flower','pillow','sharpener','toothpaste','spoon','umbrella'].filter(id=>id!==source&&id!==target&&!(source==='flower'&&id==='umbrella')).slice(0,3);
 addExplore('associations',Math.floor(index/4)+1,source==='rain'?['Yağmur yağınca hangisini kullanırız?','What do we use when it rains?']:[words[source][0]+' ile hangisi birlikte kullanılır?','What goes together with '+words[source][1].toLowerCase()+'?'],{type:'association',id:source},[target,...distractors].map(id=>eo(id,...words[id],{type:'association',id})));
});
