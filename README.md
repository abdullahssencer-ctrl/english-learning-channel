# English Learning Channel 🎓

Modern, responsive ve kullanıcı dostu İngilizce öğrenme platformu. 85 hikaye, 5 dil seviyesi (A1-C2), quiz sistemi ve flashcards ile etkili öğrenme deneyimi.

## ✨ Özellikler

### 🎯 Öğrenme Sistemi
- **85 Hikaye**: Başlangıçtan ileri seviyeye kadar kademeli ilerleme
- **5 Dil Seviyesi**: A1, A2, B1, C1, C2 (CEFR standartlarına uygun)
- **Quiz Sistemi**: Her seviye için kapsamlı değerlendirme sınavları
- **Flashcards**: 600+ kelime kartı ile kelime öğrenme
- **Gramer Odaklı**: Her hikaye belirli gramer konularına odaklanır

### 🎨 Modern UI/UX
- **Responsive Tasarım**: Masaüstü, tablet ve mobil uyumlu
- **Dark Mode**: Göz yormayan gece modu
- **Animasyonlar**: Akıcı geçişler ve etkileşimler
- **Modern Renk Paleti**: Güncel tasarım trendleri

### 🔧 Teknik Özellikler
- **React 18**: Modern React özellikleri
- **Vite**: Hızlı build ve hot module replacement
- **Supabase**: Backend-as-a-service (authentication, database)
- **Tailwind CSS**: Utility-first CSS framework
- **Lazy Loading**: Performans optimizasyonu
- **PWA Hazır**: Progressive Web App desteği

### 🎮 Gamification
- **İlerleme Takibi**: Detaylı öğrenme istatistikleri
- **Rozet Sistemi**: Başarı rozetleri ve motivasyon
- **Günlük Hedefler**: Sıralı öğrenme sistemi
- **Streak Takibi**: Günlük seri hesaplama

### 🆕 Yeni Özellikler
- **VoiceReader**: Text-to-Speech ile sesli okuma
- **QuickProgress**: Hızlı ilerleme göstergesi
- **Mobil Menü**: Responsive hamburger menü
- **Cache Mekanizması**: Performans optimizasyonu

## 🚀 Hızlı Başlangıç

### Geliştirme Ortamı

```bash
# Projeyi klonlayın
git clone https://github.com/YOUR_USERNAME/english-learning-channel.git
cd english-learning-channel

# Dependencies yükle
npm install

# Environment variables oluştur
cp .env.example .env
# .env dosyasını Supabase bilgilerinizle doldurun

# Development server başlat
npm run dev
```

### Production Build

```bash
# Build oluştur
npm run build

# Preview server başlat
npm run preview
```

## 📋 Gereksinimler

- Node.js 16+ 
- npm veya yarn
- Supabase hesabı (ücretsiz)
- Modern web tarayıcısı

## 🗄️ Veritabanı Kurulumu

1. Supabase projesi oluşturun
2. `supabase_setup.sql` dosyasını SQL Editor'da çalıştırın
3. Environment variables'ı ayarlayın
4. Authentication provider'ları configure edin

## 🌐 Deployment

### Vercel'e Deploy

```bash
# GitHub'a push
git add .
git commit -m "Ready for deployment"
git push origin main

# Vercel dashboard'dan import edin
# Environment variables'ı ayarlayın
# Deploy başlatın
```

Detaylı deployment talimatları için [DEPLOYMENT.md](DEPLOYMENT.md) dosyasına bakın.

## 📁 Proje Yapısı

```
english-learning-channel/
├── src/
│   ├── components/       # React bileşenleri
│   ├── data/           # İçerik verileri (hikayeler, quizler)
│   ├── supabase/       # Supabase entegrasyonu
│   ├── lib/            # Utility fonksiyonları
│   └── index.css       # Global stiller
├── public/             # Statik dosyalar
├── dist/              # Build output
└── package.json       # Proje konfigürasyonu
```

## 🎨 Kullanılan Teknolojiler

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication)
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📝 İçerik Yapısı

- **85 Hikaye**: Her biri birbirinin devamı
- **Seviye Bazlı**: Beginner (1-28), Intermediate (29-56), Advanced (57-85)
- **Quiz Sistemleri**: Her seviye için 50 soruluk sınavlar
- **Flashcards**: A1-C2 seviyeleri için kelime kartları

## 🔧 Development

### Yeni Bileşen Ekleme

```bash
# Yeni bileşen oluştur
# src/components/YeniBilesen.jsx

# App.jsx'e import et
import YeniBilesen from './components/YeniBilesen';
```

### İçerik Güncelleme

İçerik dosyaları `src/data/` klasöründe bulunur:
- `stories.js` - Hikaye verileri
- `quiz.js` - Quiz verileri
- `flashcardsFromExcel.js` - Kelime kartları

## 🐛 Hata Raporlama

Sorun bildirmek için:
1. GitHub Issues kullanın
2. Hata detaylarını paylaşın
3. Ekran görüntüsü ekleyin
4. Tarayıcı ve OS bilgisi verin

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Takım

- **Geliştirme**: Abdullah Sencer
- **İçerik**: İngilizce eğitim materyalleri
- **Tasarım**: Modern UI/UX prensipleri

## 📧 İletişim

- Email: abdullahsencer@yandex.com
- Instagram: @a1_a2_ingilizce
- Telegram: @asencer

## 🙏 Teşekkürler

- Supabase ekibi
- Vercel ekibi
- React topluluğu
- Tailwind CSS ekibi

## 🚀 Roadmap

- [ ] Video içerik entegrasyonu
- [ ] Ses kaydı özelliği
- [ ] Sosyal paylaşım
- [ ] Leaderboard sistemi
- [ ] AI destekli öğrenme
- [ ] Mobil app (React Native)

## 📊 İstatistikler

- **Toplam Hikaye**: 85
- **Toplam Quiz**: 5 (her seviye için)
- **Toplam Kelime**: 600+
- **Dil Seviyeleri**: 5 (A1-C2)
- **Rozetler**: 15+

---

**Happy Learning! 🎓**