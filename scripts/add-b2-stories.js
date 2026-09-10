const fs = require('fs');
const path = require('path');

const b2Stories = [
  {
    id: 57,
    title: "The New Arrival / Yeni Geliş",
    difficulty: "advanced",
    level: 57,
    duration: "5:00",
    description: "Time passed quickly. Having heard the mysterious rumors ten years after the opening, a researcher named Emma travelled to the village.",
    grammarFocus: "Participle Clauses (Zarf Kısaltmaları)",
    englishText: "Time passed quickly. Having heard the mysterious rumors ten years after the opening, a researcher named Emma travelled to the village. Walking slowly through the massive museum doors, she felt a strange, electric energy. Fascinated by the old, empty safe in the library, she took out her camera. Not knowing the whole story behind the missing gold, she asked to see Mr. Lane. 'Mr. Lane is retired now,' a voice said. The young man, now working as the general manager of the museum, welcomed her with a familiar smile.",
    turkishText: "Zaman hızla geçti. Açılıştan on yıl sonra gizemli söylentileri duymuş olan Emma adında bir araştırmacı, köye seyahat etti. Devasa müze kapılarından yavaşça içeri girerken, tuhaf, elektrikli bir enerji hissetti. Kütüphanedeki eski, boş kasadan büyülenen kadın, kamerasını çıkardı. Kayıp altının arkasındaki tüm hikayeyi bilmediği için, Mr. Lane'i görmeyi talep etti. 'Mr. Lane artık emekli,' dedi bir ses. Şu an müzenin genel müdürü olarak çalışan genç adam, onu tanıdık bir gülümsemeyle karşıladı.",
    vocabulary: ["having heard", "walking slowly", "fascinated by", "not knowing", "retired", "general manager"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 58,
    title: "The Village Legends / Köy Efsaneleri",
    difficulty: "advanced",
    level: 58,
    duration: "5:00",
    description: "Emma sat in the manager's office and opened her notes. It is said that the original owner of the house was a secret spy during the war.",
    grammarFocus: "Advanced / Impersonal Passives (Gelişmiş Edilgen Yapılar)",
    englishText: "Emma sat in the manager's office and opened her notes. It is said that the original owner of the house was a secret spy during the war. The lost gold is believed to have been hidden deep underground, but they only found a small chest to build the museum. Emma wants the final secret to be revealed today before she writes her book. The newly discovered diary needs to be examined carefully by an expert. When she walked out to the garden, everyone looked at her. Being watched by the curious villagers made her feel a little nervous.",
    turkishText: "Emma müdürün ofisinde oturdu ve notlarını açtı. Evin orijinal sahibinin savaş sırasında gizli bir casus olduğu söylenir. Kayıp altının yeraltının derinliklerine saklanmış olduğuna inanılıyor, ancak onlar müzeyi inşa etmek için sadece küçük bir sandık buldular. Emma, kitabını yazmadan önce son sırrın bugün açığa çıkarılmasını istiyor. Yeni keşfedilen günlüğün bir uzman tarafından dikkatlice incelenmesi gerekiyor. Bahçeye çıktığında herkes ona baktı. Meraklı köylüler tarafından izlenmek onu biraz gergin hissettirdi.",
    vocabulary: ["it is said that", "is believed to have been", "wants to be revealed", "needs to be examined", "being watched"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 59,
    title: "The Deadline / Son Gün",
    difficulty: "advanced",
    level: 59,
    duration: "5:00",
    description: "The village is preparing for a big celebration. By the end of this month, the museum will have been open for exactly ten years.",
    grammarFocus: "Future Perfect & Future Perfect Continuous (Gelecekte Bitmiş Zamanlar)",
    englishText: "The village is preparing for a big celebration. By the end of this month, the museum will have been open for exactly ten years. Emma is working day and night in the archive room. Emma will have read all the historical documents by tomorrow morning. Mr. Lane, who came to visit, knocked on the door. 'Will you have solved the puzzle by the time I leave for London?' asked Mr. Lane. If she doesn't stop, they will have been searching for the final hidden room for hours by midnight. The mystery will have completely disappeared by next year thanks to her research.",
    turkishText: "Köy büyük bir kutlama için hazırlanıyor. Bu ayın sonuna kadar, müze tam on yıldır açık olmuş olacak. Emma arşiv odasında gece gündüz çalışıyor. Emma yarına sabaha kadar tüm tarihi belgeleri okumuş olacak. Ziyarete gelen Mr. Lane kapıyı çaldı. 'Ben Londra'ya gitmek üzere ayrılana kadar bulmacayı çözmüş olacak mısın?' diye sordu Mr. Lane. Eğer durmazsa, gece yarısı olduğunda son gizli odayı saatlerdir arıyor olacaklar. Onun araştırması sayesinde gizem gelecek yıla kadar tamamen ortadan kaybolmuş olacak.",
    vocabulary: ["will have been open", "will have read", "will have solved", "will have been searching", "will have disappeared"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 60,
    title: "The Consequences / Sonuçlar",
    difficulty: "advanced",
    level: 60,
    duration: "5:00",
    description: "Sitting in the old music room, the young manager, Mr. Lane, and Emma looked at the past.",
    grammarFocus: "Mixed Conditionals (Karışık Şart Cümleleri)",
    englishText: "Sitting in the old music room, the young manager, Mr. Lane, and Emma looked at the past. 'If the grandfather hadn't left that old map, we wouldn't be standing here in this beautiful museum today,' the young manager said. 'And if Emma weren't so curious about history, she wouldn't have come to this quiet village,' added Mr. Lane. Emma sighed, holding an incomplete letter. 'We would know the whole truth right now if the final page hadn't been torn,' she said. She looked at the silver key on the table. If Mr. Lane didn't trust her completely, he wouldn't have given her the most important key of the house.",
    turkishText: "Eski müzik odasında oturan genç müdür, Mr. Lane ve Emma geçmişe baktılar. 'Eğer dede o eski haritayı bırakmamış olsaydı, bugün bu güzel müzede burada duruyor olmazdık,' dedi genç müdür. 'Ve eğer Emma tarihe karşı bu kadar meraklı olmasaydı, bu sessiz köye gelmemiş olurdu,' diye ekledi Mr. Lane. Emma eksik bir mektubu tutarak iç geçirdi. 'Eğer son sayfa yırtılmamış olsaydı, şu an tüm gerçeği biliyor olurduk,' dedi. Masadaki gümüş anahtara baktı. Eğer Mr. Lane ona tamamen güvenmiyor olsaydı, ona evin en önemli anahtarını vermezdi.",
    vocabulary: ["if the grandfather hadn't left", "wouldn't be standing", "if Emma weren't so curious", "wouldn't have come", "if the final page hadn't been torn", "would know", "if Mr. Lane didn't trust", "wouldn't have given"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 61,
    title: "Dramatic Moments / Dramatik Anlar",
    difficulty: "advanced",
    level: 61,
    duration: "5:00",
    description: "It was a stormy night in the archive room. Rarely have I seen such an interesting and complex document in my life.",
    grammarFocus: "Inversion (Devrik Cümleler - İleri Düzey Vurgu)",
    englishText: "It was a stormy night in the archive room. Rarely have I seen such an interesting and complex document in my life. Not only did she find the missing page of the diary, but she also translated the secret code. She trembled with excitement. Hardly had she opened the old book when the lights suddenly went out. The young manager rushed into the room holding a flashlight. 'Under no circumstances should you touch that fragile paper in the dark!' he warned. When the flashlight hit the secret message on the wall, they froze. Only then did they realize the true, priceless value of the house.",
    turkishText: "Arşiv odasında fırtına bir geceydi. Hayatımda nadiren bu kadar ilginç ve karmaşık bir belge gördüm. Sadece günlüğün kayıp sayfasını bulmakla kalmadı, aynı zamanda gizli kodu da çevirdi. Heyecanla titriyordu. O eski kitabı açar açmaz ışıklar aniden söndü. Genç müdür elinde bir el feneriyle odaya koştu. 'Hiçbir koşulda karanlıkta o kırılgan kağıda dokunmamalısın!' diye uyardı. El feneri duvardaki gizli mesaja vurduğunda donakaldılar. Evin gerçek, paha biçilemez değerini ancak o zaman anladılar.",
    vocabulary: ["rarely have I seen", "not only did she find", "hardly had she opened", "under no circumstances should", "only then did they realize"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 62,
    title: "Emphasizing the Truth / Gerçeği Vurgulamak",
    difficulty: "advanced",
    level: 62,
    duration: "5:00",
    description: "The storm passed, and the morning sun filled the museum. It was Emma who finally connected all the impossible clues together.",
    grammarFocus: "Cleft Sentences (Vurgu Cümleleri)",
    englishText: "The storm passed, and the morning sun filled the museum. It was Emma who finally connected all the impossible clues together. 'What they need is a magnifying glass to see this tiny signature,' she said. She pointed at the corner of the map. 'It was in 1910 that the house was originally built to protect the village library, not gold.' Mr. Lane smiled with a deep sense of peace. The reason why the safe was empty from the beginning is still unknown to the world, but they know the truth. The young manager looked at his old teacher and the amazing museum around them. It is the grandfather's legacy of knowledge, not the hidden gold, that truly keeps them together.",
    turkishText: "Fırtına geçti ve sabah güneşi müzeyi doldurdu. Tüm imkansız ipuçlarını sonunda bir araya getiren kişi Emma'ydı. 'Bu küçücük imzayı görmek için ihtiyaçları olan şey bir büyüteçtir,' dedi. Haritanın köşesini işaret etti. 'Evin altınları değil, köy kütüphanesini korumak için orijinal olarak inşa edildiği yıl 1910'du.' Mr. Lane derin bir huzur duygusuyla gülümsedi. Kasanın başından beri neden boş olduğunun sebebi dünya için hala bilinmiyor, ama onlar gerçeği biliyorlar. Genç müdür yaşlı öğretmenine ve etraflarındaki muhteşem müzeye baktı. Onları gerçekten bir arada tutan şey saklı altın değil, dedenin bilgi mirasıdır.",
    vocabulary: ["it was Emma who", "what they need is", "it was in 1910 that", "the reason why", "it is the grandfather's legacy"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 63,
    title: "The Overlooked Clue / Gözden Kaçan İpucu",
    difficulty: "advanced",
    level: 63,
    duration: "5:00",
    description: "The dusty archive room was silent, lit only by a small desk lamp. The young man looked at the translated pages with wide eyes.",
    grammarFocus: "Modals of Criticism & Regret (Should have / Could have)",
    englishText: "The dusty archive room was silent, lit only by a small desk lamp. The young man looked at the translated pages with wide eyes. 'We should have checked this diary years ago,' said the young man, feeling a bit frustrated. Emma gently touched the fragile cover of the book. 'You couldn't have known about the hidden pages,' Emma replied calmly. The young man sighed, thinking about all his past efforts. 'I needn't have wasted my time on the empty safe for months.' He looked at a picture of his old teacher on the wall. 'Mr. Lane ought to have told us about these strange symbols before he retired.' 'Don't blame him,' Emma said. 'He might not have noticed them himself in the dark.' The young man nodded slowly. 'Well, we could have asked him before he left for London. But now, we have to solve this alone.'",
    turkishText: "Tozlu arşiv odası sessizdi, sadece küçük bir masa lambasıyla aydınlanıyordu. Genç adam çevrilmiş sayfalara fal taşı gibi açılmış gözlerle baktı. 'Bu günlüğü yıllar önce kontrol etmeliydik,' dedi genç adam, biraz hüsrana uğramış hissederek. Emma kitabın kırılgan kapağına nazikçe dokundu. 'Gizli sayfalar hakkında bilgi sahibi olamazdın,' diye cevap verdi Emma sakince. Genç adam, geçmişteki tüm çabalarını düşünerek iç geçirdi. 'Aylarca boş kasa üzerinde zamanımı harcamama gerek yoktu.' Duvardaki eski öğretmeninin resmine baktı. 'Mr. Lane emekli olmadan önce bize bu garip semboller hakkında bilgi vermeliydi.' 'Onu suçlama,' dedi Emma. 'Karanlıkta kendisi de onları fark etmemiş olabilir.' Genç adam yavaşça başını salladı. 'Pekala, o Londra'ya ayrılmadan önce ona sorabilirdik. Ama şimdi, bunu tek başımıza çözmek zorundayız.",
    vocabulary: ["should have checked", "couldn't have known", "needn't have wasted", "ought to have told", "might not have noticed", "could have asked"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 64,
    title: "The New Rules / Yeni Kurallar",
    difficulty: "advanced",
    level: 64,
    duration: "5:00",
    description: "They spread all the documents across the large wooden table. The mystery was getting deeper and more dangerous.",
    grammarFocus: "Advanced Conditionals (Unless, In case, Provided that, As long as)",
    englishText: "They spread all the documents across the large wooden table. The mystery was getting deeper and more dangerous. 'We won't solve this complex code unless we work together,' Emma stated seriously. She opened her modern laptop. 'I will copy the fragile pages in case we lose the original book,' she explained. The young manager looked worried about the historical diary. 'You can take the book home, provided that you keep it safe in a locked box.' Emma agreed and pointed at the map. 'As long as we follow the grandfather's logic, we will definitely find the answer.' The young man crossed his arms and looked at the window. 'Suppose that this map points to another city; what will we do then?' 'Then we pack our bags,' Emma smiled bravely.",
    turkishText: "Tüm belgeleri büyük ahşap masanın üzerine yaydılar. Gizem giderek derinleşiyor ve daha tehlikeli bir hal alıyordu. 'Birlikte çalışmadıkça bu karmaşık kodu çözemeyeceğiz,' diye belirtti Emma ciddiyetle. Modern dizüstü bilgisayarını açtı. 'Orijinal kitabı kaybetmemiz ihtimaline karşı sayfaları kopyalayacağım,' diye açıkladı. Genç müdür tarihi günlük konusunda endişeli görünüyordu. 'Onu kilitli bir kutuda güvende tutman şartıyla kitabı eve götürebilirsin.' Emma kabul etti ve haritayı işaret etti. 'Dedenin mantığını takip ettiğimiz sürece, cevabı kesinlikle bulacağız.' Genç adam kollarını kavuşturdu ve pencereyi baktı. 'Diyelim ki bu harita başka bir şehri işaret ediyor; o zaman ne yapacağız?' 'O zaman çantalarimizi toplarız,' diye cesurca gülümsedi Emma.",
    vocabulary: ["unless we work together", "in case we lose", "provided that you keep", "as long as we follow", "suppose that"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 65,
    title: "The Grandfather's Mind / Dedemin Zihni",
    difficulty: "advanced",
    level: 65,
    duration: "5:00",
    description: "They held the diary up to the mirror to read the strange handwriting. 'I don't understand why he wrote these notes backwards,' the young man said, confused.",
    grammarFocus: "Noun Clauses (İsim Cümlecikleri)",
    englishText: "They held the diary up to the mirror to read the strange handwriting. 'I don't understand why he wrote these notes backwards,' the young man said, confused. Emma traced the lines with her pen. 'That he was a master engineer explains the mathematical structure of the text. He designed this book like a machine. What we need now is a dictionary of old symbols,' she added. The young man checked the coordinates on his phone. 'The problem is that the numbers don't match the coordinates of this village.' He looked around the room suspiciously. 'I wonder if he hid another compass somewhere else in the mansion.' 'Whoever finds this must be very clever and very patient,' Emma smiled.",
    turkishText: "Garip el yazısını okumak için günlüğü aynaya doğru tuttular. 'Bu notları neden tersten yazdığını anlamıyorum,' dedi genç adam, kafası karışmış bir halde. Emma satırların üzerinden kalemiyle geçti. 'Onun usta bir mühendis olması gerçeği, metnin matematiksel yapısını açıklıyor. Bu kitabı bir makine gibi tasarlamış. Şu an ihtiyacımız olan şey eski sembollerin bir sözlüğüdür,' diye ekledi. Genç adam telefonundan koordinatları kontrol etti. 'Sorun şu ki numaralar bu köyün koordinatlarıyla eşleşmiyor.' Şüpheyle odanın etrafına bakındı. 'Malikanede başka bir yere başka bir pusula saklayıp saklamadığını merak ediyorum.' 'Bunu bulan her kimse çok zeki ve çok sabırlı olmalı,' diye gülümsedi Emma.",
    vocabulary: ["why he wrote", "that he was a master engineer", "what we need now", "the problem is that", "if he hid", "whoever finds this"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 66,
    title: "The Room in Which We Stand / Durduğumuz Oda",
    difficulty: "advanced",
    level: 66,
    duration: "5:00",
    description: "They left the archive and walked to the grand library. The moonlight was shining through the tall windows.",
    grammarFocus: "Relative Clauses with Prepositions (Edatlı İlgi Cümlecikleri)",
    englishText: "They left the archive and walked to the grand library. The moonlight was shining through the tall windows. Emma opened the diary to a specific page. 'Look at the detailed drawing to which he attached this note.' The young man looked around the walls covered with books. 'The library is the room in which he spent most of his time after the war. The historian with whom I spoke yesterday mentioned a secret tunnel beneath the shelves.' The young man suddenly walked towards a heavy, wooden table in the corner. 'This is the exact desk under which we found the first key ten years ago!' A wave of nostalgia hit him. 'The reason for which he built this museum is finally clear; he wanted to protect the tunnel.'",
    turkishText: "Arşivi terk edip büyük kütüphaneye yürüdüler. Ay ışığı yüksek pencerelerden içeri parlıyordu. Emma günlüğü belirli bir sayfaya açtı. 'Bu notu iliştirdiği detaylı çizime bak.' Genç adam kitaplarla kaplı duvarlara bakındı. 'Kütüphane, savaştan sonra vaktinin çoğunu geçirdiği odadır. Dün kendisiyle konuştuğum tarihçi, rafların altındaki gizli bir tünelden bahsetti.' Genç adam aniden köşedeki ağır, ahşap bir masaya doğru yürüdü. 'Bu, on yıl önce altında ilk anahtarı bulduğumuz masanın ta kendisi!' Onu bir nostalji dalgası vurdu. 'Bu müzeyi inşa etmesinin ardındaki sebep sonunda netleşti; o tüneli korumak istemişti.",
    vocabulary: ["to which he attached", "in which he spent", "with whom I spoke", "under which we found", "the reason for which"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 67,
    title: "Pausing to Think / Düşünmek İçin Durmak",
    difficulty: "advanced",
    level: 67,
    duration: "5:00",
    description: "They stood in front of the massive bookshelf, looking at the carved wooden patterns. 'I remember seeing this geometry before,' the young man said, touching a triangle.",
    grammarFocus: "Gerund & Infinitive Meaning Differences (Anlam Değişikliği Yaratan Fiiller)",
    englishText: "They stood in front of the massive bookshelf, looking at the carved wooden patterns. 'I remember seeing this geometry before,' the young man said, touching a triangle. 'It matches the drawing in the diary.' Emma checked her watch; it was past midnight. 'Remember to lock the museum doors tonight before we go too deep,' Emma reminded him. The young man was pressing different wooden triangles, hoping for a click. 'We must stop trying random passwords on this antique wood,' Emma warned. They were exhausted and their minds were blurry. They stopped to drink some coffee and think about the mathematical logic. Looking at his cold coffee, the young man sighed. He regrets telling the villagers about the map so early; now everyone is watching us.",
    turkishText: "Oyma ahşap desenlere bakarak devasa kitaplığın önünde durdular. 'Bu geometriyi daha önce gördüğümü hatırlıyorum,' dedi genç adam, bir üçgene dokunarak. 'Günlükteki çizimle eşleşiyor.' Emma saatini kontrol etti; gece yarısını geçmişti. 'Çok derinlere inmeden önce bu gece müze kapılarını kilitlemeyi unutma,' diye hatırlattı Emma. Genç adam bir 'tık' sesi umuduyla farklı ahşap üçgenlere basıyordu. 'Bu antika ahşap üzerinde rastgele şifreler denemeyi bırakmalıyız,' diye uyardı Emma. Tükenmişlerdi ve zihinleri bulanıktı. Matematiksel mantık hakkında düşünmek ve biraz kahve içmek için durdular. Soğuk kahvesine bakan genç adam iç geçirdi. Harita hakkında köylülere bu kadar erken bilgi verdiğine pişmanlık duyuyor; şimdi herkes bizi izliyor.",
    vocabulary: ["remember seeing", "remember to lock", "stop trying", "regrets telling"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 68,
    title: "A Bold Move / Cesur Bir Hamle",
    difficulty: "advanced",
    level: 68,
    duration: "5:00",
    description: "The clock struck two in the morning. 'It's high time we broke the final code,' Emma declared, holding her notes.",
    grammarFocus: "Unreal Past & Subjunctives (Gerçek Dışı Geçmiş & Dilek Kipleri)",
    englishText: "The clock struck two in the morning. 'It's high time we broke the final code,' Emma declared, holding her notes. Outside, a dog started barking loudly. 'I would rather we worked in silence,' the young man whispered, closing the window. He approached the bookshelf with a new confidence. The young man acted as if he knew the answer to the universe. He pressed three triangles at the exact same time. 'If only Mr. Lane were here to see this modular design,' he smiled proudly. A deep, mechanical clicking sound echoed in the room. The heavy wooden panel unlatched slightly. 'I suggest that he open the secret panel slowly to avoid any traps,' Emma said nervously.",
    turkishText: "Saat sabahın ikisini vurdu. 'Son kodu kırmamızın tam zamanı,' diye ilan etti Emma, notlarını tutarak. Dışarıda bir köpek yüksek sesle havlamaya başladı. 'Sessizlik içinde çalışmamızı tercih ederim,' diye fısıldadı genç adam pencereyi kapatarak. Kitaplığa yeni bir özgüvenle yaklaştı. Genç adam evrenin cevabını biliyormuş gibi davrandı. Aynı anda üç üçgene birden bastı. 'Keşke bu modüler tasarımı görmek için Mr. Lane burada olsaydı,' diye gülümsedi gururla. Odada derin, mekanik bir tıklama sesi yankılandı. Ağır ahşap panel hafifçe aralandı. 'Herhangi bir tuzaktan kaçınmak için gizli paneli yavaşça açmasını öneriyorum,' dedi Emma gergin bir şekilde.",
    vocabulary: ["it's high time we broke", "would rather we worked", "acted as if", "if only Mr. Lane were", "suggest that he open"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 69,
    title: "The Final Mechanism / Son Mekanizma",
    difficulty: "advanced",
    level: 69,
    duration: "5:00",
    description: "When the panel moved, a stunning wall of bronze gears was revealed. 'The mechanism was so complex that it took hours to understand its purpose.'",
    grammarFocus: "Advanced Result Clauses (So... that / Such... that)",
    englishText: "When the panel moved, a stunning wall of bronze gears was revealed. 'The mechanism was so complex that it took hours to understand its purpose.' It was a masterpiece of hidden engineering. 'It was such a clever design that no one had noticed it for years.' The gears were connected to a large metal lock in the center. 'There were so many gears that Emma felt confused just looking at them.' The young man took out a small metal tool from his pocket. 'He worked so carefully that the gears clicked perfectly into place one by one.' The sun was about to rise. 'They had so little time that they couldn't make a single mistake.'",
    turkishText: "Panel hareket ettiğinde, bronz dişlilerden oluşan çarpıcı bir duvar ortaya çıktı. 'Mekanizma o kadar karmaşıktı ki amacını anlamak saatler sürdü.' Gizli mühendisliğin bir şaheseriydi. 'Öylesine zekice bir tasarımdı ki yıllarca kimse onu fark etmemişti.' Dişliler merkezdeki büyük metal bir kilide bağlıydı. 'O kadar çok dişli vardı ki Emma sadece onlara bakarken bile kafasının karıştığını hissetti.' Genç adam cebinden küçük metal bir alet çıkardı. 'O kadar dikkatli çalıştı ki dişliler tek tek mükemmel bir şekilde yerine oturdu.' Güneş doğmak üzereydi. 'O kadar az zamanları vardı ki tek bir hata bile yapamazlardı.",
    vocabulary: ["so complex that", "such a clever design that", "so many gears that", "so carefully that", "so little time that"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 70,
    title: "Step by Step / Adım Adım",
    difficulty: "advanced",
    level: 70,
    duration: "5:00",
    description: "With every turn of the tool, the heavy bookshelf moved an inch forward. 'The closer they got to the truth, the more excited they felt.'",
    grammarFocus: "Double Comparatives (İkili Karşılaştırmalar - Ne kadar ... o kadar ...)",
    englishText: "With every turn of the tool, the heavy bookshelf moved an inch forward. 'The closer they got to the truth, the more excited they felt.' The young man wiped the sweat from his forehead. 'The more complex the code is, the more logical the solution must be,' Emma whispered. He pushed the wooden frame with his shoulder. 'The harder you push the panel, the louder the noise gets,' he warned her. 'The less we speak, the faster we will finish this job,' Emma replied, helping him push. Behind the shelf, a cold, dark passage was waiting for them. 'The older the house, the deeper its secrets,' the young man smiled.",
    turkishText: "Aletin her dönüşüyle ağır kitaplık bir inç öne doğru hareket etti. 'Gerçeğe ne kadar yaklaşırlarsa, o kadar heyecanlı hissettiler.' Genç adam alnındaki teri sildi. 'Kod ne kadar karmaşıksa, çözüm o kadar mantıklı olmalıdır,' diye fısıldadı Emma. Ahşap çerçeveyi omzuyla itti. 'Panele ne kadar sert itersen, gürültü o kadar yükselir,' diye onu uyardı. 'Ne kadar az konuşursak, bu işi o kadar hızlı bitireceğiz,' diye cevap verdi Emma, itmesine yardım ederek. Rafın arkasında, soğuk, karanlık bir geçit onları bekliyordu. 'Ev ne kadar eskiyse, sırları o kadar derindir,' diye gülümsedi genç adam.",
    vocabulary: ["the closer... the more excited", "the more complex... the more logical", "the harder... the louder", "the less... the faster", "the older... the deeper"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 71,
    title: "Decoding the System / Sistemi Çözmek",
    difficulty: "advanced",
    level: 71,
    duration: "5:00",
    description: "They stood at the entrance of the passage, breathing heavily. 'We finally figured out the grandfather's brilliant system,' the young man smiled.",
    grammarFocus: "Phrasal Verbs (Deyimsel Fiiller)",
    englishText: "They stood at the entrance of the passage, breathing heavily. 'We finally figured out the grandfather's brilliant system,' the young man smiled. 'He broke down the giant puzzle into smaller pieces across the entire house.' Emma shined her flashlight into the opening. 'They looked into the dark tunnel behind the panel.' It wasn't a tunnel that went outside; it was a small, hidden vault. 'A small wooden box turned up in the dust on a stone shelf.' The young man hesitated for a second. 'Don't give up now; we are almost there,' Emma encouraged him. They had survived the test. 'They carried out the grandfather's instructions perfectly.'",
    turkishText: "Ağır ağır nefes alarak geçidin girişinde durdular. 'Sonunda dedenin zekice sistemini çözdük,' diye gülümsedi genç adam. 'Devasa bulmacayı tüm evin içine daha küçük parçalara ayırdı.' Emma el fenerini boşluğa tuttu. 'Panelin arkasındaki karanlık tünele baktılar.' Dışarı çıkan bir tünel değildi; küçük, gizli bir kasaydı. 'Taş bir rafın üzerindeki tozların içinde küçük ahşap bir kutu ortaya çıktı.' Genç adam bir saniye tereddüt etti. 'Şimdi pes etme; neredeyse vardık,' diyerek onu cesaretlendirdi Emma. Testten sağ çıkmışlardı. 'Dedenin talimatlarını kusursuzca yerine getirdiler.'",
    vocabulary: ["figured out", "broke down", "looked into", "turned up", "give up", "carried out"],
    videoId: "",
    thumbnail: ""
  },
  {
    id: 72,
    title: "A Piece of Cake / Çocuk Oyuncağı",
    difficulty: "advanced",
    level: 72,
    duration: "5:00",
    description: "The young man picked up the wooden box and blew the dust off. There was no lock on it. 'After all this time, opening the final box was a piece of cake.'",
    grammarFocus: "Idioms & Collocations (Deyimler & Eşdizimler)",
    englishText: "The young man picked up the wooden box and blew the dust off. There was no lock on it. 'After all this time, opening the final box was a piece of cake.' As the lid opened, 'They caught sight of an elegant, old pocket watch inside.' It wasn't filled with gold or diamonds; it was frozen at exactly 12:00. Beside it lay a note: Time is the only true treasure. 'The grandfather clearly had a mind of his own,' Emma laughed softly. The mystery wasn't about money; it was about bringing people together to solve it. The morning light fully entered the library. 'They decided to call it a day and rest their tired eyes.' Looking at the watch, 'Everything finally made perfect sense.' 'The young man and Emma saw eye to eye on the museum's bright future.'",
    turkishText: "Genç adam ahşap kutuyu aldı ve üzerindeki tozu üfledi. Üzerinde kilit yoktu. 'Bunca zamandan sonra, son kutuyu açmak çocuk oyuncağıydı.' Kapak açıldığında, 'İçeride zarif, eski bir cep saati gözlerine ilişti.' İçi altın veya elmasla dolu değildi; tam olarak 12:00'de donup kalmıştı. Yanında bir not duruyordu: Zaman, tek gerçek hazinedir. 'Dedenin açıkça kendine has bir düşünce yapısı vardı,' diye hafifçe güldü Emma. Gizem parayla ilgili değildi; onu çözmek için insanları bir araya getirmekle ilgiliydi. Sabah ışığı kütüphaneye tamamen girdi. 'Bugünlük bu kadar yeter deyip yorgun gözlerini dinlendirmeye karar verdiler.' Saate bakarken, 'Sonunda her şey tam anlamıyla mantıklı geldi.' 'Genç adam ve Emma müzenin parlak geleceği konusunda tamamen aynı fikirdeydiler.'",
    vocabulary: ["piece of cake", "caught sight of", "mind of his own", "call it a day", "made perfect sense", "saw eye to eye"],
    videoId: "",
    thumbnail: ""
  }
];

// Read the existing stories file
const storiesPath = path.join(__dirname, '../src/data/stories.js');
let storiesContent = fs.readFileSync(storiesPath, 'utf8');

// Convert B2 stories to JSON string format
const b2StoriesString = b2Stories.map(story => {
  return `  {
    id: ${story.id},
    title: "${story.title}",
    difficulty: "${story.difficulty}",
    level: ${story.level},
    duration: "${story.duration}",
    description: "${story.description.replace(/"/g, '\\"')}",
    grammarFocus: "${story.grammarFocus.replace(/"/g, '\\"')}",
    englishText: "${story.englishText.replace(/"/g, '\\"').replace(/\n/g, ' ')}",
    turkishText: "${story.turkishText.replace(/"/g, '\\"').replace(/\n/g, ' ')}",
    vocabulary: ${JSON.stringify(story.vocabulary)},
    videoId: "${story.videoId}",
    thumbnail: "${story.thumbnail}"
  }`;
}).join(',\n');

console.log('B2 stories converted successfully');
console.log('Stories to add:', b2Stories.length);
console.log('Stories:', b2StoriesString);