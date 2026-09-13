# --------------------------------------------------------------
# setup_supabase.ps1
# Supabase CLI oturum açma, proje linkleme ve migration çalıştırma
# --------------------------------------------------------------

# 1️⃣ Supabase CLI yüklü mü değilse kur.
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host Supabase CLI bulunamadı – yükleniyor... -ForegroundColor Yellow
    npm install -g supabase
    if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
        Write-Error Supabase CLI hâlâ bulunamıyor. npm kurulumunu kontrol edin.
        exit 1
    }
}

# 2️⃣ Önceki oturumu sıfırla (her zaman temiz bir başlangıç)
Write-Host `nMevcut Supabase oturumunu sonlandırıyorum... -ForegroundColor Cyan
supabase logout  Out-Null

# 3️⃣ Manuel (tarayıcı açılmadan) login isteği gönder
Write-Host `nSupabase oturum açma isteği gönderiliyor... -ForegroundColor Cyan
$loginOutput = supabase login --no-browser 2&1

# 4️⃣ Çıktıdan URL ve doğrulama kodunu (device_code) ayıkla
#    Supabase çıktısı şu formatta olur
#    httpssupabase.comdashboardclilogin...   (URL satırı)
#    ◇  8 karakterli kod

$loginUrl  = ($loginOutput  Where-Object { $_ -match '^https.login' }) -replace '`r',''
$deviceCode = ($loginOutput  Where-Object { $_ -match '^s◇s+([0-9a-fA-F]{8})' }) -replace '^s◇s+',''

if (-not $loginUrl -or -not $deviceCode) {
    Write-Error Supabase login çıktısından URL ya da kod alınamadı. Çıktıyı kontrol edin`n$loginOutput
    exit 1
}

# 5️⃣ Kullanıcıyı tarayıcıda linki açması için yönlendir
Write-Host `nTarayıcınızda aşağıdaki linki açın ve Supabase hesabınıza giriş yapın -ForegroundColor Green
Write-Host $loginUrl -ForegroundColor Yellow

# Otomatik açma (tarayıcı kurulumu varsa çalışır). Hata alınırsa sadece linki gösterir.
try {
    Start-Process $loginUrl -ErrorAction Stop
}
catch {
    Write-Warning Tarayıcı otomatik açılamadı – lütfen linki manuel olarak kopyalayıp bir sekmede açın.
}

# 6️⃣ Kullanıcıdan doğrulama kodunu (device code) girmesini iste
Write-Host `nSupabase hesabınıza giriş yaptıktan ve “Authorize” butonuna bastıktan sonra
Write-Host ekranda 8 karakterli bir kod (ör. 1c970bb3) göreceksiniz.
$code = Read-Host -Prompt 'Lütfen bu kodu buraya yazın (tam 8 karakter)'

if ($code.Length -ne 8) {
    Write-Error Kod 8 karakter olmalı! Tekrar çalıştırıp doğru kodu girin.
    exit 1
}

# 7️⃣ CLI’ya kodu gönder (doğrulama)
Write-Host `nDoğrulama kodu gönderiliyor... -ForegroundColor Cyan
supabase login --device-code $code 2$null

if ($LASTEXITCODE -ne 0) {
    Write-Error Kod geçersiz veya oturum oluşturulamadı. Tekrar deneyin.
    exit 1
}
Write-Host ✓ Supabase CLI oturumu başarıyla açıldı. -ForegroundColor Green

# --------------------------------------------------------------
# 8️⃣ Projeyi CLI’ya bağla
#    PROJECT_REF kısmını Supabase URL’nizin .supabase.co öncesinden alın.
#    Örnek URL httpslqtefxclkvsucoswxifx.supabase.co   -  project‑ref = lqtefxclkvsucoswxifx
# --------------------------------------------------------------
$projectRef = lqtefxclkvsucoswxifx   # -- burayı kendi proje‑ref’inizle değiştirin

Write-Host `nProje linkleniyor $projectRef -ForegroundColor Cyan
supabase link --project-ref $projectRef

if ($LASTEXITCODE -ne 0) {
    Write-Error Proje linkleme başarısız. Project‑ref doğru mu Supabase CLI çıktısını kontrol edin.
    exit 1
}
Write-Host ✓ Proje başarıyla linklendi. -ForegroundColor Green

# --------------------------------------------------------------
# 9️⃣ Migration (SQL) dosyalarını veritabanına uygula
# --------------------------------------------------------------
Write-Host `nMigration dosyaları veritabanına uygulanıyor... -ForegroundColor Cyan
supabase db push

if ($LASTEXITCODE -ne 0) {
    Write-Error Migration çalıştırılırken bir hata oluştu. Çıktıyı inceleyin.
    exit 1
}
Write-Host ✓ Migration başarıyla tamamlandı. Tablolar oluşturuldu. -ForegroundColor Green

# --------------------------------------------------------------
# 10️⃣ Son mesaj
# --------------------------------------------------------------
Write-Host `n--- Tüm işlemler tamamlandı! --- -ForegroundColor Magenta
Write-Host Artık uygulamanızda Supabase veritabanı tablolarını kullanabilirsiniz.
Write-Host Gerekirse .env dosyasına SUPABASE_URL ve SUPABASE_ANON_KEY ekleyin.
