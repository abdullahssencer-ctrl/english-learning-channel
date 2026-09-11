-- Kelime Listesi / Hikaye okundu / Quiz sonucu kaydetme sorununu duzeltir
-- Sorun: user_progress tablosunda user_id uzerinde UNIQUE constraint yoktu,
-- bu yuzden upsert() cagrilari her seferinde yeni bir satir olusturuyordu
-- (ya da satir hic yoksa .update() sessizce hicbir sey yapmiyordu).
-- Bu script once olasi kopya satirlari temizler, sonra UNIQUE constraint ekler.

-- 1) Ayni user_id'ye ait birden fazla satir varsa, en son guncellenen haric digerlerini sil
DELETE FROM user_progress a
USING user_progress b
WHERE a.user_id = b.user_id
  AND (
    a.last_updated < b.last_updated
    OR (a.last_updated = b.last_updated AND a.id > b.id)
  );

-- 2) user_id uzerine UNIQUE constraint ekle (yoksa)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_progress_user_id_key'
  ) THEN
    ALTER TABLE user_progress ADD CONSTRAINT user_progress_user_id_key UNIQUE (user_id);
  END IF;
END $$;
