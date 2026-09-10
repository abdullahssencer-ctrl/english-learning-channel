import { createClient } from '@supabase/supabase-js';

// Supabase konfigürasyonu
// Environment variables'dan alıyoruz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL ve Anon Key gereklidir. .env dosyasını kontrol edin.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
