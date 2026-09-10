# Supabase Database Setup Guide

## 📋 Supabase Dashboard'da Database Kurulumu

Supabase CLI Docker gerektirdiği için, database tablolarını manuel olarak oluşturacağız.

### Adım 1: Supabase Dashboard'a Gidin

1. https://supabase.com/dashboard/project/lqtefxclkvsucoswxifx adresine gidin
2. SQL Editor sekmesine tıklayın

### Adım 2: SQL Script'i Çalıştırın

Aşağıdaki SQL kodunu kopyalayıp SQL Editor'a yapıştırın ve "Run" butonuna tıklayın:

```sql
-- English Learning Channel - Supabase Database Setup
-- Bu script tüm gerekli tabloları ve politikaları oluşturur

-- 1. user_progress tablosu
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_stories INTEGER[] DEFAULT '{}',
  quiz_results JSONB DEFAULT '[]',
  learned_words TEXT[] DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. daily_progress tablosu
CREATE TABLE IF NOT EXISTS daily_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  stories_read INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 3. badges tablosu
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Indexler
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_progress_user_id ON daily_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_progress_date ON daily_progress(date);
CREATE INDEX IF NOT EXISTS idx_badges_user_id ON badges(user_id);

-- Row Level Security (RLS) Politikaları
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- user_progress RLS politikaları
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- daily_progress RLS politikaları
CREATE POLICY "Users can view own daily progress" ON daily_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily progress" ON daily_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily progress" ON daily_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- badges RLS politikaları
CREATE POLICY "Users can view own badges" ON badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger'lar
CREATE TRIGGER update_daily_progress_updated_at
  BEFORE UPDATE ON daily_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Adım 3: Tabloları Doğrulayın

1. Database Editor sekmesine gidin
2. Sol taraftaki menüden "Tables" seçeneğine tıklayın
3. Şu tabloların oluştuğunu doğrulayın:
   - ✅ user_progress
   - ✅ daily_progress
   - ✅ badges

### Adım 4: RLS (Row Level Security) Doğrulama

Her tabloda RLS'nin aktif olduğunu doğrulayın:
1. Tabloya tıklayın
2. "Policies" sekmesine gidin
3. Her tabloda 3 policy olduğunu kontrol edin (SELECT, INSERT, UPDATE)

## 🎯 Tablo Yapıları

### user_progress
- Kullanıcının genel ilerlemesi
- Tamamlanan hikayeler
- Quiz sonuçları
- Öğrenilen kelimeler

### daily_progress
- Günlük aktivite takibi
- Kaç hikaye okundu
- Kaç quiz yapıldı
- Kaç kelime öğrenildi

### badges
- Kullanıcı rozetleri
- Başarı rozetleri
- Ödül sistemi

## 🔒 Güvenlik

Tüm tablolarda Row Level Security (RLS) aktif:
- Kullanıcılar sadece kendi verilerini görebilir
- Kullanıcılar sadece kendi verilerini ekleyebilir/güncelleyebilir
- Veri güvenliği sağlanmış

## 📞 Sorun Yaşarsanız

Eğer SQL çalıştırırken hata alırsanız:
1. Tabloların zaten var olup olmadığını kontrol edin
2. Policy'lerin zaten oluşturulup oluşturulmadığını kontrol edin
- Hata mesajını bana bildirin
