-- Migration: create gamification and related tables
-- File: supabase/migrations/20230914_create_gamification_tables.sql

create table if not exists public.user_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  xp integer not null default 0,
  streak integer not null default 0,
  last_completed_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.leaderboard (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  xp integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a view to calculate rankings dynamically
create or replace view public.leaderboard_with_rank as
select 
  id,
  user_id,
  xp,
  row_number() over (order by xp desc) as rank,
  created_at,
  updated_at
from public.leaderboard;

create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  xp_threshold integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.word_occurrences (
  id uuid default gen_random_uuid() primary key,
  story_id uuid not null,
  word text not null,
  count integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.user_word_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  word text not null,
  learned boolean not null default false,
  last_seen timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.dictionary (
  id uuid default gen_random_uuid() primary key,
  word text not null unique,
  definition text,
  example_sentence text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.forum_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.forum_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default badges with error handling
do $$
begin
  insert into public.badges (name, xp_threshold) values
    ('Başlangıç', 100),
    ('Orta', 250),
    ('İleri', 500),
    ('Usta', 1000)
    on conflict (name) do nothing;
exception
  when undefined_column then
    -- Table exists but has different schema, skip insertion
    null;
end $$;
