// Dinleme köşesi: ek masallar, hikâyeler, tekerlemeler ve ninniler.
// Mevcut 4 parça olduğu gibi kalır; bu dosya yenilerini sona ekler ve türe göre ayırır.
// Metinlerdeki "Eyüp" adı, girişte seçilen isimle otomatik değişir (personalize).
// Sayfa: [[Türkçe, İngilizce], resim]
const STORY_TYPES=['tale','tale','rhyme','lullaby'];
stories.forEach((s,i)=>{if(!s.type)s.type=STORY_TYPES[i]||'tale'});
const K={tale:['Masal','Tale'],story:['Hikâye','Story'],rhyme:['Tekerleme','Rhyme'],lullaby:['Ninni · sakin okuma','Lullaby · spoken softly']};
stories.push(
// ---------- MASALLAR ----------
{type:'tale',kind:K.tale,title:['Kaplumbağa ile Tavşan','The Tortoise and the Hare'],art:'turtle',pages:[
[['Bir varmış bir yokmuş. Tavşan çok hızlı koşarmış. Kaplumbağa ise yavaş yavaş yürürmüş. Bir gün yarışmaya karar vermişler.','Once upon a time, the hare ran very fast and the tortoise walked slowly. One day they decided to race.'],'rabbit'],
[['Tavşan hop hop koşmuş, çok öne geçmiş. “Biraz uyuyayım,” demiş ve ağacın altında uyuyakalmış.','The hare hopped far ahead. “I’ll take a little nap,” he said, and fell asleep under a tree.'],'tree'],
[['Kaplumbağa hiç durmamış. Adım adım, yavaş yavaş yürümeye devam etmiş.','The tortoise never stopped. Step by step, slowly, slowly, he kept walking.'],'turtle'],
[['Tavşan uyandığında kaplumbağa çoktan varmış! Eyüp, yavaş ama vazgeçmeden giden kazanır. Masalımız bitti.','When the hare woke up, the tortoise had already won! Eyüp, slow and steady wins. The end.'],'turtle']]},
{type:'tale',kind:K.tale,title:['Küçük İtfaiye','The Little Fire Truck'],art:'firetruck',pages:[
[['Bir varmış bir yokmuş, kasabada kıpkırmızı küçük bir itfaiye arabası varmış.','Once upon a time, a little red fire truck lived in a small town.'],'firetruck'],
[['Bir gün küçük bir kedi ağaca tırmanmış ama inememiş. “Miyav, miyav!” diye seslenmiş.','One day a little cat climbed a tree but could not get down. “Meow, meow!” it cried.'],'cat'],
[['İtfaiye hemen gelmiş. Merdivenini yavaş yavaş uzatmış. Kedi dikkatlice aşağı inmiş.','The fire truck came right away. It stretched its ladder slowly, slowly. The cat climbed down carefully.'],'tree'],
[['Herkes alkışlamış. Kedi “Teşekkürler!” demiş. Eyüp, yardım etmek ne güzel, değil mi? Masalımız bitti.','Everyone clapped. The cat said, “Thank you!” Eyüp, helping is lovely, isn’t it? The end.'],'cat']]},
{type:'tale',kind:K.tale,title:['Kuş ile Üzüm Salkımı','The Bird and the Grapes'],art:'grapes',pages:[
[['Küçük bir kuş bahçede uçuyormuş. Yukarıda mor mor bir üzüm salkımı görmüş.','A little bird was flying in the garden. High above, it saw a bunch of purple grapes.'],'bird'],
[['Kanatlarını çırpmış, çırpmış ama üzüme yetişememiş. Biraz üzülmüş.','It flapped and flapped, but could not reach the grapes. It felt a little sad.'],'grapes'],
[['O sırada kaz gelmiş. “Gel, birlikte deneyelim,” demiş. Kaz uzun boynuyla dalı aşağı çekmiş.','Just then the goose came. “Let’s try together,” it said. The goose pulled the branch down with its long neck.'],'goose'],
[['Kuş ile kaz üzümleri paylaşmışlar. “Mmm, ne tatlı!” Eyüp, yardım istemek de güzeldir. Masalımız bitti.','The bird and the goose shared the grapes. “Mmm, so sweet!” Eyüp, asking for help is good too. The end.'],'bird']]},
{type:'tale',kind:K.tale,title:['Güneş ile Bulut','The Sun and the Cloud'],art:'sun',pages:[
[['Gökyüzünde güler yüzlü bir güneş varmış. Her sabah dünyayı ısıtırmış.','There was a smiling sun in the sky. Every morning it warmed the world.'],'sun'],
[['Bir gün gri bir bulut gelmiş. “Ben de bir şey yapmak istiyorum,” demiş.','One day a grey cloud came along. “I want to do something too,” it said.'],'cloud'],
[['Bulut yağmur yağdırmış: pıt pıt pıt. Çiçekler suyunu içmiş, ağaçlar yeşermiş.','The cloud made rain: pitter, patter. The flowers drank, and the trees turned green.'],'rain'],
[['Sonra güneş yeniden gülümsemiş ve gökyüzünde kocaman bir gökkuşağı çıkmış! Eyüp, herkesin bir görevi var. Masalımız bitti.','Then the sun smiled again and a big rainbow appeared! Eyüp, everyone has a job to do. The end.'],'rainbow']]},
{type:'tale',kind:K.tale,title:['Balık Pırıl','Sparkle the Fish'],art:'fish',pages:[
[['Masmavi denizde Pırıl adında küçük bir balık yaşarmış. Pullarında güneş parlarmış.','In the blue sea lived a little fish named Sparkle. The sun shone on its scales.'],'fish'],
[['Bir gün denizde büyük bir gemi görmüş. “Düüüt!” diye ses çıkarıyormuş.','One day it saw a big ship on the sea. “Toot!” went the ship.'],'ship'],
[['Pırıl korkmuş ama kaplumbağa yanına gelmiş: “Korkma, gemi bizi selamlıyor.”','Sparkle was scared, but the turtle swam over: “Don’t be afraid, the ship is saying hello.”'],'turtle'],
[['Pırıl da yüzgecini sallamış. Sonra kaplumbağayla birlikte dalgalarda oynamışlar. Masalımız bitti.','Sparkle waved its fin. Then it played in the waves with the turtle. The end.'],'sea']]},
{type:'tale',kind:K.tale,title:['Eşek ile Keçi','The Donkey and the Goat'],art:'donkey',pages:[
[['Dağ köyünde bir eşek ile bir keçi yaşarmış. İkisi de çok inatçıymış.','In a mountain village lived a donkey and a goat. Both were very stubborn.'],'mountain'],
[['Bir gün dar bir köprüde karşılaşmışlar. “Önce ben geçeceğim!” demiş eşek. “Hayır, ben!” demiş keçi.','One day they met on a narrow bridge. “I’ll go first!” said the donkey. “No, me!” said the goat.'],'river'],
[['Biraz düşünmüşler. Keçi “Sen büyüksün, önce sen geç,” demiş. Eşek gülümsemiş.','They thought for a moment. The goat said, “You’re bigger, you go first.” The donkey smiled.'],'goat'],
[['Eşek geçmiş, sonra keçi geçmiş. İkisi de nehrin karşısına varmış. Eyüp, sırayla olunca herkes kazanır. Masalımız bitti.','The donkey crossed, then the goat. Both reached the other side. Eyüp, taking turns helps everyone. The end.'],'donkey']]},
{type:'tale',kind:K.tale,title:['Zürafanın Uzun Boynu','The Giraffe’s Long Neck'],art:'giraffe',pages:[
[['Uzun boylu bir zürafa varmış. Bazen boynunun çok uzun olmasından utanırmış.','There was a tall giraffe. Sometimes it felt shy about its very long neck.'],'giraffe'],
[['Bir gün küçük kuşun yuvası ağacın en tepesinden düşecekmiş. Kuş “Yardım edin!” diye ötmüş.','One day the little bird’s nest was about to fall from the top of a tree. “Help!” sang the bird.'],'bird'],
[['Zürafa boynunu uzatmış ve yuvayı dalın üstüne geri koymuş. Zebra alkışlamış.','The giraffe stretched its neck and put the nest back on the branch. The zebra cheered.'],'tree'],
[['O günden sonra zürafa boynunu çok sevmiş. Eyüp, her birimiz kendimize özeliz. Masalımız bitti.','From that day on, the giraffe loved its neck. Eyüp, each of us is special. The end.'],'zebra']]},
{type:'tale',kind:K.tale,title:['Kuzunun Kayıp Çanı','Lamb’s Lost Bell'],art:'sheep',pages:[
[['Küçük kuzunun boynunda minik bir çan varmış: çın çın! Bir sabah çan kaybolmuş.','Little lamb wore a tiny bell: ding ding! One morning, the bell was gone.'],'sheep'],
[['Kuzu ineğe sormuş: “Çanımı gördün mü?” İnek “Möö, ben görmedim,” demiş.','Lamb asked the cow, “Have you seen my bell?” The cow said, “Moo, I haven’t.”'],'cow'],
[['Ördeğe sormuş, ata sormuş… Sonra köpek koklaya koklaya çiçeklerin arasında çanı bulmuş!','Lamb asked the duck, then the horse… Then the dog sniffed and sniffed and found the bell among the flowers!'],'dog'],
[['Çın çın! Kuzu çok sevinmiş. “Teşekkür ederim dostlarım!” Eyüp, birlikte arayınca bulunur. Masalımız bitti.','Ding ding! Lamb was so happy. “Thank you, friends!” Eyüp, when we look together, we find it. The end.'],'flower']]},
// ---------- HİKÂYELER ----------
{type:'story',kind:K.story,title:['Siyah Araba Çiftlikte','Black Car at the Farm'],art:'tractor',pages:[
[['Siyah araba bugün çiftliğe gitti. Kapıda traktör onu bekliyordu.','Today the black car went to the farm. The tractor was waiting at the gate.'],'car'],
[['İnek “Möö!” dedi. Kuzu “Mee!” dedi. Tavuk da “Gıt gıt gıdak!” diye seslendi.','The cow said, “Moo!” The lamb said, “Baa!” The hen called, “Cluck cluck!”'],'cow'],
[['Ördekler gölette yüzüyordu. At koşup selam verdi. Eşek de kulaklarını salladı.','Ducks were swimming in the pond. The horse ran over to say hello. The donkey wiggled its ears.'],'duck'],
[['Akşam olunca siyah araba eve döndü. “Yarın yine geleceğim!” dedi. Eyüp, sen hangi hayvanı sevdin?','In the evening, the black car drove home. “I’ll come again tomorrow!” Eyüp, which animal did you like?'],'tractor']]},
{type:'story',kind:K.story,title:['Pazar Alışverişi','Shopping at the Market'],art:'watermelon',pages:[
[['Eyüp annesiyle pazara gitti. Tezgâhlar rengârenkti.','Eyüp went to the market with Mum. The stalls were full of colours.'],'mother'],
[['Kırmızı domatesler, yeşil salatalıklar, mor patlıcanlar vardı.','There were red tomatoes, green cucumbers and purple eggplants.'],'eggplant'],
[['Sarı muzları, turuncu portakalları sepete koydular. Bir de kocaman bir karpuz aldılar.','They put yellow bananas and oranges in the basket. They also bought a big watermelon.'],'watermelon'],
[['Eve gelince meyveleri yıkadılar. Eyüp bir çilek yedi. “Mmm, çok tatlı!” dedi.','At home they washed the fruit. Eyüp ate a strawberry. “Mmm, so sweet!” he said.'],'strawberry']]},
{type:'story',kind:K.story,title:['Gemiyle Gezinti','A Boat Trip'],art:'ship',pages:[
[['Eyüp ile babası limana geldiler. Beyaz gemi düdüğünü çaldı: “Düüüt!”','Eyüp and Dad came to the harbour. The white ship blew its horn: “Toot!”'],'father'],
[['Gemiye bindiler. Kuşlar etraflarında uçuşuyordu. Deniz masmaviydi.','They got on the ship. Birds flew all around them. The sea was bright blue.'],'ship'],
[['Suda balıklar zıplıyordu. Uzakta bir kaplumbağa yüzüyordu.','Fish were jumping in the water. Far away, a turtle was swimming.'],'fish'],
[['Kıyıya varınca Eyüp “Bir daha binelim!” dedi. Babası gülümsedi: “Elbette, yine geliriz.”','When they reached the shore, Eyüp said, “Let’s ride again!” Dad smiled. “Of course, we’ll come again.”'],'sea']]},
{type:'story',kind:K.story,title:['Şehirde Araçlar','Vehicles in the City'],art:'bus',pages:[
[['Sabah oldu, şehir uyandı. Otobüs durağa geldi, insanlar bindi.','Morning came and the city woke up. The bus came to the stop and people got on.'],'bus'],
[['Kocaman kamyon yük taşıyordu. Bir motosiklet vın diye yanından geçti.','A big truck was carrying a load. A motorcycle zoomed past.'],'truck'],
[['Uzaktan bir siren sesi geldi: “Viu viu!” Ambulans yol istedi. Herkes kenara çekildi.','A siren sounded: “Wee-woo!” The ambulance needed the road. Everyone pulled over.'],'ambulance'],
[['Polis arabası trafiğe yardım etti. Eyüp, şehirde herkes birbirine yardım eder.','The police car helped the traffic. Eyüp, in the city everyone helps each other.'],'police']]},
{type:'story',kind:K.story,title:['Uçakla Büyükanneye','Flying to Grandma'],art:'plane',pages:[
[['Eyüp bugün ilk kez uçağa bindi. Uçak hızlandı, hızlandı ve havalandı!','Today Eyüp took a plane for the first time. It went faster and faster and took off!'],'plane'],
[['Pencereden bulutlara baktı. Aşağıda dağlar ve nehirler minicik görünüyordu.','He looked at the clouds. Below, mountains and rivers looked tiny.'],'cloud'],
[['Yanından bir helikopter geçti. Eyüp ona el salladı.','A helicopter flew by. Eyüp waved to it.'],'helicopter'],
[['Uçak yavaşça indi. Büyükannesi onu kapıda bekliyordu. “Hoş geldin Eyüp!”','The plane landed gently. Grandma was waiting at the gate. “Welcome, Eyüp!”'],'grandmotherP']]},
{type:'story',kind:K.story,title:['İnşaat Alanında','At the Building Site'],art:'excavator',pages:[
[['Bugün yeni bir oyun parkı yapılıyor. Kepçe toprağı kazıyor: hart hurt!','Today a new playground is being built. The excavator digs the ground: scoop, scoop!'],'excavator'],
[['Buldozer toprağı itiyor, düzlüyor. Vınnn, vınnn!','The bulldozer pushes the earth and makes it flat. Vroom, vroom!'],'dozer'],
[['Kamyon kumu getiriyor. Herkes dikkatle, yavaş yavaş çalışıyor.','The truck brings the sand. Everyone works carefully, slowly.'],'truck'],
[['Akşam olunca park hazır! Salıncaklar, kaydıraklar… Eyüp, haydi kaymaya!','By evening the playground is ready! Swings and slides… Eyüp, let’s go down the slide!'],'playground']]},
{type:'story',kind:K.story,title:['Günaydın Eyüp','Good Morning, Eyüp'],art:'toothbrush',pages:[
[['Güneş doğdu. Eyüp gözlerini açtı ve gerindi. “Günaydın!”','The sun came up. Eyüp opened his eyes and stretched. “Good morning!”'],'sun'],
[['Önce sabunla ellerini ve yüzünü yıkadı. Sonra havluyla kuruladı.','First he washed his hands and face with soap. Then he dried them with a towel.'],'soap'],
[['Diş fırçasıyla dişlerini fırçaladı: sağa sola, yukarı aşağı. Sonra saçlarını taradı.','He brushed his teeth: left and right, up and down. Then he combed his hair.'],'toothbrush'],
[['Kahvaltı masasına oturdu. Tabağında peynir, domates ve salatalık vardı. Afiyet olsun Eyüp!','He sat down for breakfast. On his plate were cheese, tomato and cucumber. Enjoy, Eyüp!'],'plate']]},
{type:'story',kind:K.story,title:['Giyinelim, Dışarı Çıkalım','Let’s Get Dressed'],art:'coat',pages:[
[['Dışarıda hava serin. Eyüp, haydi giyinelim!','It’s chilly outside. Eyüp, let’s get dressed!'],'tshirt'],
[['Önce tişört, sonra pantolon. Şimdi de çoraplar: biri sağ ayağa, biri sol ayağa.','First the T-shirt, then the trousers. Now the socks: one on the right foot, one on the left.'],'socks'],
[['Ayakkabıları giydik. Montu da giydik. Başımıza şapkamızı taktık.','We put on our shoes. We put on our coat. We put our hat on our head.'],'shoes'],
[['Ellerimiz üşümesin diye eldivenleri de taktık. Hazırız! Haydi parka!','We put on gloves so our hands stay warm. Ready! Let’s go to the park!'],'gloves']]},
{type:'story',kind:K.story,title:['Büyükannemin Bahçesi','Grandma’s Garden'],art:'flower',pages:[
[['Eyüp büyükannesine gitti. Büyükannesinin bahçesi çiçeklerle doluydu.','Eyüp visited Grandma. Her garden was full of flowers.'],'grandmotherM'],
[['Elma ağacından kırmızı elmalar topladılar. Sepet doldu.','They picked red apples from the apple tree. The basket was full.'],'apple'],
[['Toprağı kazıp havuç çıkardılar. Havuçlar turuncu ve uzundu.','They dug in the soil and pulled out carrots. The carrots were orange and long.'],'carrot'],
[['Dedesi de geldi. Hep birlikte ağacın gölgesinde oturdular. Ne güzel bir gündü!','Grandpa came too. They all sat in the shade of the tree. What a lovely day!'],'grandfather']]},
{type:'story',kind:K.story,title:['Yağmurlu Gün','A Rainy Day'],art:'rain',pages:[
[['Gökyüzünde bulutlar toplandı. Pıt pıt pıt… Yağmur başladı!','Clouds gathered in the sky. Pitter patter… It started to rain!'],'cloud'],
[['Eyüp montunu ve şapkasını giydi. Annesiyle birlikte su birikintilerine baktılar.','Eyüp put on his coat and hat. He and Mum looked at the puddles.'],'rain'],
[['Ördekler yağmurdan çok mutluydu. “Vak vak!” diye yüzüyorlardı.','The ducks loved the rain. “Quack quack!” they said as they swam.'],'duck'],
[['Yağmur durdu, güneş çıktı. Gökyüzünde rengârenk bir gökkuşağı belirdi!','The rain stopped and the sun came out. A colourful rainbow appeared in the sky!'],'rainbow']]},
{type:'story',kind:K.story,title:['Okulda Bir Gün','A Day at School'],art:'school',pages:[
[['Eyüp bugün ablası ile okulu görmeye gitti. Okulun bahçesi kocamandı.','Today Eyüp went with his big sister to see the school. The schoolyard was huge.'],'school'],
[['Çocuklar oyun parkında oynuyordu. Kaydıraktan kayıyor, salıncakta sallanıyorlardı.','Children were playing in the playground. They slid down the slide and swung on the swings.'],'playground'],
[['Eyüp’e bir top attılar. Eyüp topu yakaladı ve geri attı. Herkes güldü.','They threw a ball to Eyüp. He caught it and threw it back. Everyone laughed.'],'ball'],
[['Eve dönerken Eyüp “Ben de büyüyünce okula gideceğim!” dedi. Ablası gülümsedi.','On the way home Eyüp said, “When I grow up, I’ll go to school too!” His sister smiled.'],'sister']]},
// ---------- TEKERLEMELER ----------
{type:'rhyme',kind:K.rhyme,title:['Fış Fış Kayıkçı','Splish Splash Boatman'],art:'ship',pages:[
[['Fış fış kayıkçı,\nKaptan Eyüp kayıkçı.\nKürekleri çekelim,\nDenize açılalım.','Splish splash, little boat,\nCaptain Eyüp, row and float.\nPull the oars and off we go,\nOut to sea, nice and slow.'],'ship'],
[['Balık atlar suya,\nKuş uçar havaya.\nFış fış, fış fış,\nHaydi dönelim kıyıya!','A fish jumps in the sea,\nA bird flies up so free.\nSplish splash, splish splash,\nBack to shore with me!'],'fish']]},
{type:'rhyme',kind:K.rhyme,title:['Siyah Araba Düt Düt','Black Car Beep Beep'],art:'car',pages:[
[['Siyah araba düt düt,\nYolda gider tıpış tıpış.\nSağa döner, sola döner,\nEyüp’ü parka götürür.','Black car, beep beep,\nDriving down the street.\nTurn to the right, turn to the left,\nOff to the park, how sweet.'],'car'],
[['Kırmızı ışık, dur!\nSarı ışık, bekle!\nYeşil ışık, haydi git,\nVın vın vın, eğlence!','Red light, stop!\nYellow light, wait!\nGreen light, off we go,\nVroom vroom, isn’t it great!'],'car']]},
{type:'rhyme',kind:K.rhyme,title:['Çiftlik Tekerlemesi','Farm Rhyme'],art:'cow',pages:[
[['İnek der ki möö möö,\nKuzu der ki mee mee.\nTavuk der gıt gıdak,\nGünaydın Eyüp, günaydın!','The cow says moo moo,\nThe lamb says baa baa.\nThe hen says cluck cluck,\nGood morning, Eyüp, hurrah!'],'cow'],
[['Ördek der ki vak vak,\nKedi der ki miyav.\nKöpek der ki hav hav,\nHaydi Eyüp, sen de söyle!','The duck says quack quack,\nThe cat says meow.\nThe dog says woof woof,\nNow Eyüp, you say it now!'],'duck']]},
{type:'rhyme',kind:K.rhyme,title:['Sayı Tekerlemesi','Counting Rhyme'],art:'apple',pages:[
[['Bir, iki, üç,\nElma topla güç güç.\nDört, beş, altı,\nSepet doldu tatlı.','One, two, three,\nApples from the tree.\nFour, five, six,\nA basket full of picks.'],'apple'],
[['Yedi, sekiz, dokuz,\nKuşlar öter boş boş.\nOn dedik bitti,\nEyüp saymayı bildi!','Seven, eight, nine,\nThe birds all sing so fine.\nTen, and we’re done,\nEyüp counted every one!'],'bird']]},
{type:'rhyme',kind:K.rhyme,title:['Ellerimi Yıkarım','I Wash My Hands'],art:'soap',pages:[
[['Şırıl şırıl akar su,\nEllerimi yıkarım.\nSabunu köpürtürüm,\nPırıl pırıl olurum.','Splish splash, water flows,\nI wash my hands just so.\nBubbles, bubbles, round and round,\nClean and shiny, here I go.'],'soap'],
[['Ön yüz, arka yüz,\nParmak arası tek tek.\nDurula durula,\nHavluyla kurula!','Front and back, one by one,\nBetween the fingers, every one.\nRinse it off and dry it too,\nNow my hands are good as new!'],'towel']]},
{type:'rhyme',kind:K.rhyme,title:['Otobüs Geliyor','Here Comes the Bus'],art:'bus',pages:[
[['Otobüsün tekeri döner döner,\nDöner döner, döner döner.\nOtobüsün tekeri döner döner,\nŞehrin içinde.','The wheels on the bus go round and round,\nRound and round, round and round.\nThe wheels on the bus go round and round,\nAll through the town.'],'bus'],
[['Otobüsün kornası düt düt düt,\nDüt düt düt, düt düt düt.\nOtobüsün kornası düt düt düt,\nŞehrin içinde.','The horn on the bus goes beep beep beep,\nBeep beep beep, beep beep beep.\nThe horn on the bus goes beep beep beep,\nAll through the town.'],'bus']]},
{type:'rhyme',kind:K.rhyme,title:['Vücudumu Tanıyorum','My Body Rhyme'],art:'hand',pages:[
[['İki gözüm görür,\nİki kulağım duyar.\nBurnum çiçek koklar,\nAğzım şarkı söyler.','Two eyes to see,\nTwo ears to hear.\nMy nose smells flowers,\nMy mouth sings clear.'],'eye'],
[['İki elim alkışlar,\nİki ayağım zıplar.\nKollarımı açarım,\nEyüp’ü kucaklarım!','Two hands to clap,\nTwo feet to hop.\nI open my arms wide,\nA big hug, never stop!'],'hand']]},
// ---------- NİNNİLER ----------
{type:'lullaby',kind:K.lullaby,title:['Dandini Dandini','Dandini Dandini'],art:'moon',pages:[
[['Dandini dandini dastana,\nDanalar girmiş bostana.\nKov bostancı danayı,\nYemesin lahanayı.','Dandini dandini, hush now, dear,\nThe calves are in the garden here.\nShoo them off, the gardener said,\nLeave the cabbage, off to bed.'],'cow'],
[['Dandini dandini, ninni,\nUyusun da büyüsün, ninni.\nTıpış tıpış yürüsün, ninni,\nGözlerini yumsun, ninni.','Dandini, dandini, little one,\nSleep now, the day is done.\nSleep and grow, my dear, ninni,\nClose your eyes now, ninni.'],'moon']]},
{type:'lullaby',kind:K.lullaby,title:['Hayvanlar Uyuyor','The Animals Are Sleeping'],art:'moon',pages:[
[['Kedi kıvrıldı minderde,\nKöpek yattı kulübede.\nKuzu annesine sokuldu,\nUyku vakti geldi şimdi.','The cat curled up on the chair,\nThe dog lies in his doghouse there.\nThe lamb snuggles close to mum,\nSleepy time has finally come.'],'cat'],
[['Kuşlar yuvaya döndü,\nAy gökyüzüne yükseldi.\nSen de yum gözlerini,\nİyi uykular Eyüp, ninni.','The birds are home in their nest,\nThe moon rises, time to rest.\nNow you close your eyes so tight,\nSleep well, Eyüp, good night.'],'moon']]},
{type:'lullaby',kind:K.lullaby,title:['Deniz Ninnisi','Sea Lullaby'],art:'sea',pages:[
[['Dalgalar gelir usul usul,\nSahile vurur yavaş yavaş.\nGemi limanda uyuyor,\nEyüp de uyusun yavaş.','The waves come in, soft and slow,\nTo the shore they gently go.\nThe ship sleeps beside the quay,\nSleep now, Eyüp, peacefully.'],'sea'],
[['Balıklar yuvaya döndü,\nKaplumbağa ninni söyledi.\nAy denize yansıdı,\nİyi geceler dedi.','The fish have gone back home to rest,\nThe turtle sings a lullaby best.\nThe moon shines on the sea so bright,\nAnd softly whispers, “Good night.”'],'moon']]},
{type:'lullaby',kind:K.lullaby,title:['Uyu Yavrum','Sleep, My Little One'],art:'moon',pages:[
[['Uyu yavrum uyu, ninni,\nGözlerin yumulsun, ninni.\nYastığın yumuşacık,\nRüyaların tatlı olsun, ninni.','Sleep, my little one, ninni,\nClose your eyes now, ninni.\nYour pillow is soft and deep,\nSweet dreams as you sleep, ninni.'],'mother'],
[['Annen burada, baban burada,\nHerkes seni seviyor.\nSabah olunca güneş doğar,\nSeninle oynamak istiyor.','Mum is here and Dad is too,\nEveryone is loving you.\nIn the morning, sun will rise,\nAnd play with you when you open your eyes.'],'father']]},
{type:'lullaby',kind:K.lullaby,title:['Yıldızlar Parlıyor','The Stars Are Shining'],art:'moon',pages:[
[['Gökyüzünde ay doğdu,\nYıldızlar göz kırptı.\nAğaçlar sallandı yavaş,\nRüzgâr ninni okudu.','The moon is rising in the sky,\nThe little stars all wink goodbye.\nThe trees sway slowly to and fro,\nThe wind sings softly, soft and low.'],'moon'],
[['Siyah araba garajda,\nOyuncaklar yerinde.\nBugün çok güzel oynadık,\nŞimdi uyku vakti, ninni.','The black car rests inside its shed,\nThe toys are tucked away in bed.\nWe played so nicely all day long,\nNow sleep, my dear, to this soft song.'],'car']]}
);
let storyFilter='all';
const KINDS=[['all',['Hepsi','All']],['tale',['Masallar','Tales']],['story',['Hikâyeler','Stories']],['rhyme',['Tekerlemeler','Rhymes']],['lullaby',['Ninniler','Lullabies']]];
const KTINT={tale:'#f6e9de',story:'#e5edee',rhyme:'#eaf0dc',lullaby:'#e8e6f0'};
storyHome=function(){cancelSpeech();screen='stories';chrome();const L=a=>a[tr()?0:1];const list=stories.map((s,i)=>[s,i]).filter(([s])=>storyFilter==='all'||s.type===storyFilter);$('#app').innerHTML=`<div class="game-top"><button class="quiet" id="back">← ${t('Ana sayfa','Home')}</button><span class="tag">${t('Sakin bir mola','A quiet moment')}</span></div><section class="question"><div class="eyebrow">${t('DİNLEME KÖŞESİ','STORY CORNER')}</div><h1>${personalize(t('Eyüp, ne dinleyelim?','Eyüp, what shall we listen to?'))}</h1><p class="setting-note">${t('Bir resim seç. Dinlemeye sen başla, istediğin zaman durdur.','Pick a picture. Start when you’re ready and stop whenever you like.')}</p></section><div class="story-filters" role="tablist">${KINDS.map(([k,v])=>`<button class="story-chip ${storyFilter===k?'on':''}" data-filter="${k}" role="tab" aria-selected="${storyFilter===k}">${L(v)} · ${k==='all'?stories.length:stories.filter(s=>s.type===k).length}</button>`).join('')}</div><div class="categories">${list.map(([s,i])=>`<button class="category" style="--tint:${KTINT[s.type]||'#e5edee'}" data-story="${i}"><div class="art">${art(s.art)}</div><h3>${personalize(L(s.title))}</h3><p>${L(s.kind)}</p></button>`).join('')}</div>`;$('#back').onclick=home;document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{storyFilter=b.dataset.filter;storyHome()});document.querySelectorAll('[data-story]').forEach(b=>b.onclick=()=>{storyIndex=Number(b.dataset.story);storyPage=0;readStory()})};
const readStoryBase=readStory;
readStory=function(){readStoryBase();const h=document.querySelector('.story h1');if(h)h.textContent=personalize(h.textContent)};
