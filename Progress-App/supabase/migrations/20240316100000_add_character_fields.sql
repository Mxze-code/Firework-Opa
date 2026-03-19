-- Add character fields for fantasy game-style onboarding
-- profiles: goals, build_focus
-- user_preferences: build_focus, supporting_priorities, selected_tracking_systems

alter table public.profiles
  add column if not exists goals text[] default '{}',
  add column if not exists build_focus text;

alter table public.user_preferences
  add column if not exists build_focus text,
  add column if not exists supporting_priorities text[] default '{}',
  add column if not exists selected_tracking_systems text[] default '{}';
