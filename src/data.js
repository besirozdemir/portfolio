// ✏️ Kişisel bilgiler burada. Galeri/proje/CV/fotoğraf → src/content klasörü (README.md'ye bak)

export const profile = {
  first: 'Beşir',
  last: 'ÖZDEMİR',            // <- adını/soyadını buradan düzelt
  title: 'Mechanical Engineer',
}

// Boş bırakılan link (youtube) tıklanamaz, "yakında" olarak görünür.
export const socials = {
  linkedin: 'https://www.linkedin.com/in/beshir/',
  github: 'https://github.com/besirozdemir',
  youtube: '',
  mail: '',
}

// start/end: 'YYYY-AA'. Sıralama otomatik (en yeni üstte).
export const experiences = [
  { start: '2021-10', end: '2022-08', role: 'Team Leader', team: 'HÜRKUŞ Roket Takımı', event: 'Teknofest Roket Yarışması · Lise Kategorisi', skills: ['CAD', 'Takım Liderliği'] },
  { start: '2022-03', end: '2022-08', role: 'Mechanical Leader', team: 'MAVERA UAV Team', event: 'Teknofest İHA Yarışması · Lise Kategorisi', skills: ['CAD', 'Teknik Resim'] },
  { start: '2021-05', end: '2024-07', role: 'Öğrenci', team: 'Deneyap Teknoloji Atölyeleri', event: 'Türkiye Teknoloji Takımı Vakfı', skills: ['CAD', 'Fusion 360'] },
  { start: '2020-10', end: '2021-11', role: 'CAD Designer', team: 'Tanyeli UAV Team', event: 'Teknofest İHA Yarışması · Lise Kategorisi', skills: ['CAD', 'SolidWorks'] },
  { start: '2020-01', end: '2020-10', role: 'CAD & Mechanical Leader', team: 'Şahkartallar UAV Team', event: 'TÜBİTAK 2020 İHA Yarışması', skills: ['CAD', 'SolidWorks'] },
  { start: '2019-02', end: '2019-04', role: 'Yarışmacı', team: '13. Uluslararası MEB Robot Yarışması', event: 'Mini Sumo Kategorisi', skills: [] },
]

// level: 1 Beginner · 2 Intermediate · 3 Advanced   (label ile yazıyı değiştirebilirsin)
export const tools = [
  { name: 'SolidWorks', level: 2, label: 'CSWA Certified' },
  { name: 'CATIA V5', level: 1 },
  { name: 'ANSYS Mechanical', level: 1 },
  { name: 'XFLR5', level: 1 },
  { name: 'MATLAB', level: 1 },
  { name: 'OpenRocket', level: 3 },
  { name: 'Python', level: 2 },
  { name: 'Microsoft Excel', level: 1 },
]

export const technical = [
  { label: 'FEA / Yapısal Analiz', icon: 'Layers' },
  { label: 'Aerodinamik Analiz', icon: 'Wind' },
  { label: 'İHA Yapısal Tasarımı', icon: 'Plane' },
  { label: 'Teknik Resim / GD&T', icon: 'Ruler' },
  { label: 'İmalat Yöntemleri', icon: 'Factory' },
  { label: 'Süreç Otomasyonu (Python)', icon: 'Code' },
]

export const languages = [
  { name: 'Türkçe', level: 'Ana dil', dots: 5 },
  { name: 'English', level: 'C1', dots: 4 },
]
