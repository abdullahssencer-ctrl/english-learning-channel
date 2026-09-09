-- Önce mevcut politikaları düşür
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

DROP POLICY IF EXISTS "Users can view own daily progress" ON daily_progress;
DROP POLICY IF EXISTS "Users can insert own daily progress" ON daily_progress;
DROP POLICY IF EXISTS "Users can update own daily progress" ON daily_progress;

DROP POLICY IF EXISTS "Users can view own badges" ON badges;
DROP POLICY IF EXISTS "Users can insert own badges" ON badges;

-- Trigger'ı düşür
DROP TRIGGER IF EXISTS update_daily_progress_updated_at ON daily_progress;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Tabloları düşür (isteğe bağlı - veri kaybeder!)
-- DROP TABLE IF EXISTS badges;
-- DROP TABLE IF EXISTS daily_progress;
-- DROP TABLE IF EXISTS user_progress;