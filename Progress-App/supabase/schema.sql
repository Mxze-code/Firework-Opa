-- Ascend: Health & Fitness Tracking - Database Schema
-- Run in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  username text unique,
  age integer,
  weight numeric,
  height numeric,
  gender text,
  activity_level text,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User preferences (goals, targets, habit categories)
create table public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  protein_target_g integer default 150,
  water_target_glasses integer default 8,
  sleep_target_hours numeric default 7,
  steps_target integer default 10000,
  selected_habit_categories text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progression (starts at 0 for new users)
create table public.progression (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  level integer default 1,
  total_xp integer default 0,
  streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Stats (derived from actions, start at 0)
create table public.player_stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  strength integer default 0,
  endurance integer default 0,
  recovery integer default 0,
  discipline integer default 0,
  energy integer default 0,
  sleep integer default 0,
  nutrition integer default 0,
  focus integer default 0,
  metabolism integer default 0,
  vision integer default 0,
  wellness integer default 0,
  updated_at timestamptz default now()
);

-- Daily targets (user-defined habits)
create table public.daily_targets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_type text not null,
  title text not null,
  description text,
  target_value numeric,
  unit text,
  xp_reward integer default 25,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Target completions (real completions only)
create table public.target_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_id uuid references public.daily_targets(id) on delete cascade not null,
  completed_at timestamptz default now(),
  xp_earned integer not null,
  value_logged numeric
);

-- Meals
create table public.meals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  meal_type text not null,
  foods jsonb not null default '[]',
  total_protein numeric,
  total_carbs numeric,
  total_fats numeric,
  total_calories numeric,
  logged_at timestamptz default now()
);

-- Workouts
create table public.workouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  duration_minutes integer not null,
  intensity text not null,
  notes text,
  sets integer,
  reps integer,
  xp_earned integer,
  logged_at timestamptz default now()
);

-- Recovery logs
create table public.recovery_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  duration_minutes integer,
  value numeric,
  unit text,
  xp_earned integer,
  logged_at timestamptz default now()
);

-- XP events (audit trail for every XP earned)
create table public.xp_events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  source_type text not null,
  source_id text,
  xp_amount integer not null,
  description text,
  created_at timestamptz default now()
);

-- Achievements (only real unlocks)
create table public.achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_id text not null,
  unlocked_at timestamptz default now()
);

-- Personal goals
create table public.personal_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  target text,
  progress numeric default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Indexes
create index idx_target_completions_user_date on public.target_completions(user_id, completed_at desc);
create index idx_meals_user_date on public.meals(user_id, logged_at desc);
create index idx_workouts_user_date on public.workouts(user_id, logged_at desc);
create index idx_recovery_user_date on public.recovery_logs(user_id, logged_at desc);
create index idx_xp_events_user on public.xp_events(user_id, created_at desc);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.progression enable row level security;
alter table public.player_stats enable row level security;
alter table public.daily_targets enable row level security;
alter table public.target_completions enable row level security;
alter table public.meals enable row level security;
alter table public.workouts enable row level security;
alter table public.recovery_logs enable row level security;
alter table public.xp_events enable row level security;
alter table public.achievements enable row level security;
alter table public.personal_goals enable row level security;

create policy "profiles_select" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);

create policy "user_preferences_all" on public.user_preferences for all using (auth.uid() = user_id);
create policy "progression_all" on public.progression for all using (auth.uid() = user_id);
create policy "player_stats_all" on public.player_stats for all using (auth.uid() = user_id);
create policy "daily_targets_all" on public.daily_targets for all using (auth.uid() = user_id);
create policy "target_completions_all" on public.target_completions for all using (auth.uid() = user_id);
create policy "meals_all" on public.meals for all using (auth.uid() = user_id);
create policy "workouts_all" on public.workouts for all using (auth.uid() = user_id);
create policy "recovery_logs_all" on public.recovery_logs for all using (auth.uid() = user_id);
create policy "xp_events_all" on public.xp_events for all using (auth.uid() = user_id);
create policy "achievements_all" on public.achievements for all using (auth.uid() = user_id);
create policy "personal_goals_all" on public.personal_goals for all using (auth.uid() = user_id);

-- Trigger: create profile, progression, stats, preferences on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  insert into public.progression (user_id) values (new.id);
  insert into public.player_stats (user_id) values (new.id);
  insert into public.user_preferences (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
