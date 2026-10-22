# İçerik Rehberi

Sitedeki her şey bu klasörden okunur. Kod yazmana gerek yok.
Dosyaları ekle/değiştir, sonra `npm run deploy` çalıştır, site güncellenir.

## 1) 3D Galeri: gallery/<program>/<parça-adı>/
```
gallery/
  solidworks/
    krank-mili/
      info.json      (zorunlu)  başlık, açıklama, youtube linki
      thumb.mp4      (önerilir) kapak videosu, sessiz döngü (.webm de olur)
      thumb.jpg      (ops.)     kapak görseli; video yüklenene kadar görünür, video yoksa tek başına kullanılır
      model.glb      (önerilir) tarayıcıda döndürülen 3D model
      source.sldprt  (ops.)     indirilebilir orijinal CAD dosyası (source.zip, source.step ...)
  catia/
  inventor/
```
- Yeni program (ör. Fusion 360)? `gallery/fusion360/` klasörü aç, içine parça klasörleri koy. Filtre otomatik oluşur.
- info.json örneği:
  { "title": "Krank Mili", "text": "Kısa açıklama", "youtube": "https://youtu.be/XXXXXXXXXXX", "date": "2026-03-01" }
- ÖNEMLİ: Tarayıcı .sldprt / .CATPart dosyasını gösteremez. Parçayı GLB'ye çevirmen gerekir
  (SolidWorks'te glTF/GLB olarak kaydet, ya da STEP dosyasını Blender veya online dönüştürücüyle GLB yap).
  Orijinal CAD dosyasını `source.*` adıyla koyarsan ziyaretçiler indirebilir.
- GLB dosyalarını mümkünse 10 MB altında tut (GitHub dosya sınırı 100 MB).
- Video notu: H.264 kodlu .mp4 kullan (HEVC/H.265 Chrome'da oynamaz). 720p, 5-8 sn, 1-3 MB ideal.
- "ornek-" ile başlayan klasörler örnektir, silebilirsin.

## 2) Projeler: projects/<sıra>-<ad>/
```
projects/
  01-roket/
    info.json   başlık, özet, status, progress, github, tags, visual
    cover.jpg   (visual: "image" ise kullanılır)
```
- Sıralama klasör adının başındaki numaraya göre: 01-, 02-, 03- ...
- Yeni proje = yeni klasör. Kaydırma animasyonu proje sayısına göre kendini ayarlar.
- status: "in-progress" | "completed" | "planned"      progress: 0-100
- visual: "rocket" | "piston" | "image" (image = cover.jpg gösterilir)

## 3) Profil fotoğrafı: profile/photo.jpg   (yoksa gösterilmez)
## 4) CV: cv/ klasörüne tek bir PDF koy (adı önemli değil). Güncellemek için dosyayı değiştir.
