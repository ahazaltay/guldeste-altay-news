# Güldeste Altay - Bağımsız Gazetecilik Çalışmaları Portfolyosu

Güldeste Altay'ın bağımsız gazetecilik çalışmalarını, araştırmalarını, röportajlarını, köşe yazılarını ve saha belgeselini tek bir modern çatı altında toplayan premium, tek sayfa (SPA) web portfolyo uygulaması.

---

## 🌟 Özellikler (Features)

*   **📰 Dinamik Anasayfa (Landing Page):** 
    *   **Manşet Haberler (Carousel):** Seçilmiş 4 adet zamansız, derinliği olan röportaj ve haberin otomatik döndüğü akıcı slayt alanı.
    *   **Öne Çıkan Belgesel Kartı:** Saha belgeseline yönlendiren, canlı oynatma animasyonuna sahip vurgulu kart tasarımı.
    *   **Son Haberler:** En güncel 6 haberin listelendiği bento tarzı ızgara (grid) düzeni.
*   **📂 Haber Arşivi:** Tüm haberlerin listelendiği, başlık ve içerik içinde anlık harf eşleştirmesiyle çalışan **Anlık Arama (Instant Search)** entegreli arşiv sayfası.
*   **✍️ Köşe Yazıları:** Felsefi, toplumsal ve güncel fikir yazılarının derlendiği bağımsız köşe yazıları akışı.
*   **🎥 Özel Belgesel Sayfası:** *"Bu Lokanta Evsizlere Sıcak Yuva Oluyor"* saha belgeseli için geliştirilmiş, oynatma, duraklatma, süre takibi, ses seviyesi ayarı ve tam ekran modlarını destekleyen **Özel HTML5 Video Oynatıcısı**.
*   **👤 Hakkımda:** Gazetecinin eğitimi, vizyonu ve çalışma sahaları hakkında bilgi veren estetik biyografi katmanı.
*   **✉️ İletişim Formu:** Float-label girdilere ve başarılı gönderim geri bildirimine sahip modern iletişim kanalı.
*   **🌓 Karanlık/Aydınlık Tema:** Göz yormayan, fildişi/sıcak kağıt tonlarında aydınlık tema ile grafit antrasit tonlarında premium karanlık tema arasında anlık, yumuşak geçiş imkanı.
*   **📱 Tam Duyarlı (Responsive) Tasarım:** Mobil, tablet ve masaüstü cihazların tamamında kusursuz dergi mizanpajı (CSS Grid & Flexbox).
*   **🔗 Paylaşılabilir Derin Linkler (Deep Linking):** Her haber detayına özel URL hash yapısı (örn: `site-adresi.com/#article/14`). Paylaşılan link doğrudan ilgili haberin detay drawer'ını açar.

---

## 🛠️ Kullanılan Teknolojiler (Tech Stack)

Proje, maksimum hız, sıfır harici kütüphane bağımlılığı ve temiz kod standartları için tamamen yerel web teknolojileriyle yazılmıştır:

*   **HTML5:** Semantik etiketler, özel video oynatıcı yapısı ve erişilebilirlik (ARIA) standartları.
*   **CSS3 (Vanilla):** CSS Custom Properties (tema değişkenleri), donanım ivmeli (hardware-accelerated) yumuşak geçişler, responsive medya sorguları.
*   **Modern JavaScript (ES6+):** Vanilla SPA hash-routing, dinamik DOM manipülasyonu, anlık arama algoritmaları, özel HTML5 video kontrolleri ve form yönetimi.
*   **Fontlar:** Başlıklar için entelektüel *Cormorant Garamond / Playfair Display* (Serif), gövde metinleri için yüksek okunabilirliğe sahip *Inter* (Sans-serif).

---

## 📂 Dosya Yapısı (File Structure)

```text
guldeste-altay-news/
├── index.html     # SPA Ana İskeleti ve Sayfa Bölümleri
├── styles.css     # Özelleştirilmiş Tema Değişkenleri, Grid Sistemleri ve Animasyonlar
├── app.js         # Navigasyon, Arama, Slider ve Video Oynatıcı Kontrol Mantığı
├── data.js        # Makalelerin, Görsellerin ve Video Kaynağının Yer Aldığı Veri Tabanı
└── README.md      # Proje Dokümantasyonu
```

---

## 🚀 Çalıştırma ve Yayınlama (Running & Deployment)

### Yerel Çalıştırma
Herhangi bir yerel sunucu (localhost), veritabanı veya `npm install` kurulumu gerektirmez:
1.  Bu depoyu bilgisayarınıza indirin.
2.  `index.html` dosyasına çift tıklayarak tarayıcınızda (Chrome, Edge, Safari, Firefox vb.) anında açın.

### Canlıya Yayınlama (Deployment)
Proje tamamen statik dosyalardan oluştuğu için ücretsiz hosting servislerinde saniyeler içinde yayınlanabilir:
*   **GitHub Pages:** Deponuzun ayarlarından (Settings > Pages) yayına alabilirsiniz.
*   **Vercel / Netlify:** Klasörü sürükleyip bırakarak doğrudan canlı adrese dönüştürebilirsiniz.
