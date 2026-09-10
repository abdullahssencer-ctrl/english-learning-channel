import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase config
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('HATA: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY environment variables gereklidir.');
  console.error('Önce .env dosyasını oluşturun veya Supabase Dashboard\'dan değerleri alın.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Supabase Database Setup Başlatılıyor...\n');

  try {
    // SQL dosyasını oku
    const sqlFile = join(__dirname, '../supabase_setup.sql');
    const sqlContent = readFileSync(sqlFile, 'utf-8');

    console.log('📄 SQL dosyası okundu:', sqlFile);
    console.log('📊 SQL komutları çalıştırılıyor...\n');

    // SQL komutlarını böl ve çalıştır
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.length < 10) continue;

      try {
        console.log(`[${i + 1}/${statements.length}] SQL komutu çalıştırılıyor...`);
        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          // Eğer exec_sql yoksa, doğrudan SQL Editor'a yönlendir
          console.log('⚠️  exec_sql fonksiyonu bulunamadı.');
          console.log('💡 SQL komutlarını Supabase Dashboard > SQL Editor\'da manuel çalıştırın.');
          console.log('\n📋 Çalıştırılacak SQL komutları:\n');
          console.log(sqlContent);
          return;
        }

        console.log('✅ Başarılı');
      } catch (err) {
        console.log('⚠️  Hata:', err.message);
      }
    }

    console.log('\n✅ Database setup tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    console.error('\n💡 Alternatif: Supabase Dashboard > SQL Editor\'a gidin ve supabase_setup.sql dosyasını manuel çalıştırın.');
  }
}

setupDatabase();
