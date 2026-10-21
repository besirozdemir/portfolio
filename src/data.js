// ✏️ Tüm içerik burada. Sadece bu dosyayı düzenlemen yeterli.

export const profile = {
  first: 'Beşir',
  last: 'ÖZDEMİR',            // <- soyadını yaz
  title: 'Mechanical Engineer',
}

export const socials = {
  youtube: 'https://www.youtube.com/@KANAL_ADIN',
  github: 'https://github.com/besirozdemir',
  linkedin: 'https://www.linkedin.com/in/beshir/',
  mail: 'mailto:besirozdemir28@gmail.com',
}

export const rocket = {
  name: 'Roket Projesi',
  stages: [
    { title: 'Tasarım', text: 'Gövde, kanatçık ve burun konisi SolidWorks’te modellendi; ağırlık merkezi ve basınç merkezi hesaplarıyla kararlılık sağlandı.' },
    { title: 'İtki', text: 'Motor seçimi ve itki eğrisi analiz edildi. Yanma, nozul ve yapısal yükler Ansys ve MATLAB ile doğrulandı.' },
    { title: 'Uçuş', text: 'Rampa çıkışından apogee’ye kadar tüm uçuş profili simüle edildi ve test uçuşuyla karşılaştırıldı.' },
  ],
}

// youtubeId: videonun linkindeki kod (youtube.com/watch?v=BURASI). Boşsa kanal linki açılır.
export const cadItems = [
  { title: 'Krank Mili', tool: 'SolidWorks', text: 'Dört silindirli motor için krank mili ve denge ağırlıkları.', youtubeId: '' },
  { title: 'Planet Dişli Grubu', tool: 'SolidWorks', text: 'Tek kademe planet dişli seti, montaj animasyonlu.', youtubeId: '' },
  { title: 'Roket Burun Konisi', tool: 'SolidWorks · Ansys', text: 'Aerodinamik profil ve CFD sonuçları.', youtubeId: '' },
  { title: 'Turbo Kompresör', tool: 'SolidWorks', text: 'Kompresör çarkı ve gövde montajı.', youtubeId: '' },
  { title: 'Isı Eşanjörü', tool: 'SolidWorks · Ansys', text: 'Kabuk-boru eşanjör ve ısıl analiz.', youtubeId: '' },
  { title: 'Robot Kol Mafsalı', tool: 'SolidWorks', text: 'Altı eksenli kolun bilek mafsalı.', youtubeId: '' },
]

export const experiences = [
  { date: '2025', role: 'Stajyer Mühendis', place: 'Şirket Adı', text: 'Üretim hattında CAD revizyonları ve teknik resim çalışmaları yaptım.' },
  { date: '2024', role: 'Roket Takımı Üyesi', place: 'Üniversite Takımı', text: 'Gövde tasarımı ve yapısal analizlerden sorumlu oldum.' },
  { date: '2023', role: 'Bağımsız Tasarım Projeleri', place: 'YouTube', text: 'CAD modellerini ve simülasyonları kanalımda paylaşmaya başladım.' },
]

export const skills = [
  { name: 'SolidWorks', text: 'Parça, montaj ve teknik resim', icon: 'Box', cls: 'col-span-2 row-span-2' },
  { name: 'Ansys', text: 'Yapısal ve akış analizi', icon: 'Activity', cls: 'col-span-2' },
  { name: 'MATLAB', text: 'Sayısal çözüm ve simülasyon', icon: 'Sigma', cls: 'col-span-1' },
  { name: 'Termodinamik', text: 'Çevrimler ve ısı geçişi', icon: 'Flame', cls: 'col-span-1' },
  { name: 'İmalat Usulleri', text: 'Talaşlı imalat, döküm, kaynak', icon: 'Wrench', cls: 'col-span-2' },
  { name: 'İlgi Alanları', text: 'Roketçilik, motorlar, mekanizmalar', icon: 'Rocket', cls: 'col-span-2' },
]
