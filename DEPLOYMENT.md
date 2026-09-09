# English Learning Channel - Deployment Guide

Bu rehber, English Learning Channel projesini Supabase ve Vercel ile yayınlamak için adım adım talimatlar içerir.

## 📋 Ön Hazırlık

- GitHub hesabı
- Supabase hesabı (ücretsiz plan yeterli)
- Vercel hesabı (ücretsiz plan yeterli)
- Node.js ve npm yüklü bilgisayar

## 🗄️ Supabase Kurulumu

### 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) sitesine gidin ve giriş yapın
2. "New Project" butonuna tıklayın
3. Proje bilgilerini girin:
   - **Name**: English Learning Channel
   - **Database Password**: Güçlü bir şifre belirleyin (not edin!)
   - **Region**: En yakın bölgeyi seçin (örn: Frankfurt)
4. "Create new project" butonuna tıklayın

### 2. Veritabanı Tablolarını Oluşturma

1. Supabase dashboard'da "SQL Editor" sekmesine gidin
2. "New query" butonuna tıklayın
3. `supabase_setup.sql` dosyasının içeriğini kopyalayıp yapıştırın
4. "Run" butonuna tıklayın

### 3. Environment Variables Alın

1. Supabase dashboard'da "Settings" > "API" sekmesine gidin
2. Aşağıdaki bilgileri not edin:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Authentication Ayarları

1. "Settings" > "Authentication" sekmesine gidin
2. "Providers" sekmesinden:
   - **Email**: Enabled olmalı
   - İsterseniz Google, GitHub gibi provider'ları da ekleyebilirsiniz
3. "URL Configuration" sekmesinden:
   - **Site URL**: `https://your-vercel-domain.vercel.app`
   - **Redirect URLs**: Aynı URL'yi ekleyin

## 🚀 Vercel Deployment

### 1. GitHub'a Push Etme

```bash
# Proje dizinine gidin
cd C:\Users\Sencer\CascadeProjects\oyun\english-learning-channel

# Git başlatma (henüz yapmadıysanız)
git init
git add .
git commit -m "Initial commit - English Learning Channel"

# GitHub repository oluşturun ve bu URL'yi kullanın
git remote add origin https://github.com/YOUR_USERNAME/english-learning-channel.git
git branch -M main
git push -u origin main
```

### 2. Vercel'e Bağlama

1. [Vercel](https://vercel.com) sitesine gidin ve GitHub ile giriş yapın
2. "Add New Project" butonuna tıklayın
3. GitHub repository listenizden `english-learning-channel`'ı seçin
4. Configure Project bölümünde:

**Build Settings:**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

**Environment Variables:**
Aşağıdaki değişkenleri ekleyin (Supabase'den aldığınız değerleri kullanın):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

5. "Deploy" butonuna tıklayın
6. Birkaç dakika içinde siteniz yayına girecek!

## 🔧 Son Ayarlar

### 1. Supabase Redirect URL Güncelleme

Vercel size bir domain verecek (örn: `english-learning.vercel.app`). Bu domain'i Supabase'e ekleyin:

1. Supabase dashboard > Settings > Authentication > URL Configuration
2. **Site URL**: Vercel domain'inizi girin
3. **Redirect URLs**: Aynı domain'i ekleyin

### 2. Custom Domain (İsteğe Bağlı)

Kendi domain'inizi kullanmak isterseniz:

1. Vercel dashboard > Settings > Domains
2. "Add Domain" butonuna tıklayın
3. Domain'inizi girin ve DNS ayarlarını yapın

## 🧪 Test Etme

### 1. Authentication Test

1. Yayınlanan siteye gidin
2. "Giriş" butonuna tıklayın
3. Kayıt olun ve giriş yapın
4. Dashboard'a erişebildiğinizi kontrol edin

### 2. Veritabanı Test

1. Bir hikaye okuyun
2. "Okundu olarak işaretle" butonuna tıklayın
3. Supabase dashboard > Table Editor > user_progress tablosunu kontrol edin
4. Verilerin kaydedildiğini doğrulayın

## 📝 Environment Variables

Prodüksiyon için `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🐛 Sorun Giderme

### Build Hataları

```bash
# Node modules temizle ve yeniden yükle
rm -rf node_modules package-lock.json
npm install

# Build'i yeniden dene
npm run build
```

### Supabase Bağlantı Hataları

1. API key'lerin doğru olduğundan emin olun
2. Supabase projesinin paused olmadığını kontrol edin
3. RLS politikalarının doğru ayarlandığını kontrol edin

### Authentication Hataları

1. Email provider'ın enabled olduğunu kontrol edin
2. Redirect URL'lerin doğru olduğunu doğrulayın
3. Site URL'lerin güncel olduğunu kontrol edin

## 🎯 Sonraki Adımlar

- ✅ Google Analytics ekleyin
- ✅ Error tracking (Sentry) ekleyin
- ✅ Custom domain kurun
- ✅ SEO optimizasyonu yapın
- ✅ PWA desteği ekleyin
- ✅ İçerik güncellemeleri yapın

## 📚 Ek Kaynaklar

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 💡 İpuçları

- Ücretsiz Supabase planı: 500MB database, 1GB bandwidth
- Ücretsiz Vercel planı: Sınırsız projeler, 100GB bandwidth
- Güncellemeler otomatik olarak deploy edilir
- Git push yaptığınızda Vercel otomatik build eder

## 🚀 Deployment Komutları

```bash
# Local test
npm run dev

# Production build
npm run build

# Production preview
npm run preview

# Git push
git add .
git commit -m "Update deployment"
git push origin main
```

Deployment hazır! 🎉