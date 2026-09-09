import { createClient } from '@supabase/supabase-js';

// Supabase konfigürasyonu
// Lütfen gerçek Supabase URL ve key bilgilerini environment variables'dan alın
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://symddidzknwobamspssi.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YGUZdvjEV5bmi4z8d97t2Q_0HSbXwEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
