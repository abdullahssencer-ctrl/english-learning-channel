-- Merge sonrasi eklenen yeni ozellikler (son okunan hikaye, XP/streak, kelime kartlari)
-- icin eksik olan tabloyu ve guvenlik (RLS) politikalarini tamamlar.

-- 1) "Kaldigin yerden devam et" (son okunan hikaye + scroll pozisyonu) icin tablo
create table if not exists public.user_last_story (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id integer not null,
  last_scroll_position integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id)
);

alter table public.user_last_story enable row level security;

drop policy if exists "Users can view own last story" on public.user_last_story;
drop policy if exists "Users can upsert own last story" on public.user_last_story;
drop policy if exists "Users can update own last story" on public.user_last_story;

create policy "Users can view own last story" on public.user_last_story
  for select using (auth.uid() = user_id);
create policy "Users can upsert own last story" on public.user_last_story
  for insert with check (auth.uid() = user_id);
create policy "Users can update own last story" on public.user_last_story
  for update using (auth.uid() = user_id);

-- 2) XP / streak tablosu icin RLS (kullanicilar sadece kendi kaydini gorebilir/yazabilir)
alter table public.user_stats enable row level security;

drop policy if exists "Users can view own stats" on public.user_stats;
drop policy if exists "Users can insert own stats" on public.user_stats;
drop policy if exists "Users can update own stats" on public.user_stats;

create policy "Users can view own stats" on public.user_stats
  for select using (auth.uid() = user_id);
create policy "Users can insert own stats" on public.user_stats
  for insert with check (auth.uid() = user_id);
create policy "Users can update own stats" on public.user_stats
  for update using (auth.uid() = user_id);

-- 3) Liderlik tablosu: herkes okuyabilir, sadece kendi satirini yazabilir
alter table public.leaderboard enable row level security;

drop policy if exists "Anyone can view leaderboard" on public.leaderboard;
drop policy if exists "Users can insert own leaderboard row" on public.leaderboard;
drop policy if exists "Users can update own leaderboard row" on public.leaderboard;

create policy "Anyone can view leaderboard" on public.leaderboard
  for select using (true);
create policy "Users can insert own leaderboard row" on public.leaderboard
  for insert with check (auth.uid() = user_id);
create policy "Users can update own leaderboard row" on public.leaderboard
  for update using (auth.uid() = user_id);

-- 4) Kelime bazli ilerleme: sadece kendi kaydi
alter table public.user_word_progress enable row level security;

drop policy if exists "Users can view own word progress" on public.user_word_progress;
drop policy if exists "Users can insert own word progress" on public.user_word_progress;
drop policy if exists "Users can update own word progress" on public.user_word_progress;

create policy "Users can view own word progress" on public.user_word_progress
  for select using (auth.uid() = user_id);
create policy "Users can insert own word progress" on public.user_word_progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own word progress" on public.user_word_progress
  for update using (auth.uid() = user_id);

-- 5) Forum: herkes okuyabilir, sadece kendi adina yazabilir
alter table public.forum_posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists "Anyone can view forum posts" on public.forum_posts;
drop policy if exists "Users can insert own forum posts" on public.forum_posts;
drop policy if exists "Anyone can view comments" on public.comments;
drop policy if exists "Users can insert own comments" on public.comments;

create policy "Anyone can view forum posts" on public.forum_posts
  for select using (true);
create policy "Users can insert own forum posts" on public.forum_posts
  for insert with check (auth.uid() = user_id);
create policy "Anyone can view comments" on public.comments
  for select using (true);
create policy "Users can insert own comments" on public.comments
  for insert with check (auth.uid() = user_id);
