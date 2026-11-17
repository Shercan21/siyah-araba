// Ek gerçek ses kayıtları. effects.js değişmeden kalır; bu dosya yalnızca yeni kayıtları tanıtır.
// Kayıtlar 3–4 saniyeye kısaltılmış ve ses düzeyi dengelenmiştir. Kaynaklar: credits.html
const extraRecordings=["cow", "sheep", "duck", "hen", "horse", "donkey", "goat", "dozer", "ship", "bicycle", "excavator", "ambulance", "firetruck", "police", "truck", "tractor", "motorcycle"];
extraRecordings.forEach(id=>{recordings[id]=id;delete imitations[id];const i=representativeEffects.indexOf(id);if(i>=0)representativeEffects.splice(i,1)});
