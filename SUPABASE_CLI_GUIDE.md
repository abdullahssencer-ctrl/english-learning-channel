# VS Code Terminal ile Supabase SQL Çalıştırma Rehberi

Bu rehber, Visual Studio Code terminalinden Supabase CLI kullanarak SQL setup işlemlerini nasıl yapacağınızı gösterir.

## 🚀 Supabase CLI Kurulumu

### Windows için Kurulum

**Yöntem 1: npm ile (Önerilen)**
```bash
npm install -g supabase
```

**Yöntem 2: Scoop ile**
```bash
scoop bucket add supabase
scoop install supabase
```

**Yöntem 3: Chocolatey ile**
```bash
choco install supabase
```

### Kurulum Doğrulama

```bash
supabase --version
```

Eğer versiyon bilgisi görüyorsanız kurulum başarılıdır.

## 🔑 Supabase'e Login Olma

### 1. Supabase CLI ile Login

```bash
supabase login
```

Bu komut:
1. Tarayıcıyı açacak
2. Supabase giriş sayfasına yönlendirecek
3. Giriş yaptıktan sonra terminal'e geri dönecek

### 2. Projenizi Linkleme

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

**Project Ref'i bulmak için:**
1. Supabase dashboard'da projenizi açın
2. Settings > General sekmesine gidin
3. "Project Reference" kısmını kopyalayın (örn: `abc123xyz`)

**Örnek:**
```bash
supabase link --project-ref abc123xyz
```

## 📝 SQL Dosyasını Uzaktan Çalıştırma

### Yöntem 1: Doğrudan SQL Dosyasını Çalıştırma

```bash
cd C:\Users\Sencer\CascadeProjects\oyun\english-learning-channel
supabase db push --remote
```

Bu komut:
1. Yerel SQL dosyalarını alır
2. Supabase remote veritabanına gönderir
3. Tabloları ve politikaları oluşturur

### Yöntem 2: SQL Dosyasını Doğrudan Çalıştırma

```bash
cd C:\Users\Sencer\CascadeProjects\oyun\english-learning-channel
supabase db execute --remote supabase_setup.sql
```

### Yöntem 3: SQL İçeriğini Doğrudan Gönderme

```bash
cd C:\Users\Sencer\CascadeProjects\oyun\english-learning-channel
type supabase_setup.sql | supabase db execute --remote
```

## 🔍 Alternatif: curl ile API üzerinden SQL Çalıştırma

Supabase REST API kullanarak da SQL çalıştırabilirsiniz:

### 1. API Bilgilerini Alın

Supabase dashboard'dan:
- **Project URL**: `https://your-project.supabase.co`
- **Service Role Key**: Settings > API > service_role (bunu dikkatli kullanın!)

### 2. curl Komutu ile SQL Çalıştırma

```bash
curl -X POST 'https://your-project.supabase.co/rest/v1/rpc/execute_sql' \
  -H 'apikey: YOUR_SERVICE_ROLE_KEY' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "CREATE TABLE IF NOT EXISTS user_progress (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, completed_stories INTEGER[] DEFAULT '\''{}'\'', quiz_results JSONB DEFAULT '\''[]'\'', learned_words TEXT[] DEFAULT '\''{}'\'', last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(), created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());"
  }'
```

## 📋 VS Code Terminal'de Adım Adım İşlem

### Adım 1: VS Code Terminal'i Açın

1. VS Code'da projenizi açın
2. `Ctrl + ~` tuşuna basın veya View > Terminal
3. Terminal altta açılacak

### Adım 2: Supabase CLI Kurun (Yüklü değilse)

```bash
npm install -g supabase
```

### Adım 3: Supabase'e Login Olun

```bash
supabase login
```

Tarayıcı açılacak, giriş yapın.

### Adım 4: Projenizi Linkleyin

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### Adım 5: SQL Dosyasını Çalıştırın

```bash
cd C:\Users\Sencer\CascadeProjects\oyun\english-learning-channel
supabase db execute --remote supabase_setup.sql
```

## ✅ Sonuçları Doğrulama

### Terminal ile Tabloları Kontrol Etme

```bash
supabase db execute --remote "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

### Tablo Yapılarını Kontrol Etme

```bash
supabase db execute --remote "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_progress';"
```

## 🛠️ Hata Giderme

### Hata: "supabase command not found"

**Çözüm:**
```bash
npm install -g supabase
# veya
npm cache clean --force
npm install -g supabase
```

### Hata: "Not logged in"

**Çözüm:**
```bash
supabase login
```

### Hata: "Project not linked"

**Çözüm:**
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### Hata: "Permission denied"

**Çözüm:**
1. Project ref'in doğru olduğundan emin olun
2. Service role key kullanın (daha yüksek yetki)
3. Projenin active olduğunu kontrol edin

## 🎯 En Basit Yöntem

Eğer Supabase CLI kurmak istemiyorsanız, VS Code terminalinden curl kullanabilirsiniz:

```bash
# Önce supabase_setup.sql dosyasının içeriğini bir değişkene atın
# Sonra curl ile gönderin

# Windows PowerShell için:
$sql = Get-Content supabase_setup.sql -Raw
curl -X POST 'https://your-project.supabase.co/rest/v1/rpc/execute_sql' `
  -H 'apikey: YOUR_SERVICE_ROLE_KEY' `
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' `
  -H 'Content-Type: application/json' `
  -d "{\`"query\`": \`"$sql\`"}"
```

## 📚 Ek Kaynaklar

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Supabase REST API](https://supabase.com/docs/guides/api)

---

**İşlem tamamlandıktan sonra veritabanınız kullanıma hazır! 🎉**