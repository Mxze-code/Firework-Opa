# Ascend — Health & Performance Tracking

A serious health tracking app with game-inspired UI. Real data, real progress, no fake stats.

## Features

- **Authentication** — Sign up, sign in, email verification, forgot/reset password
- **Onboarding** — Profile setup, goals, daily targets, nutrition targets
- **Daily targets** — User-defined habits (workout, protein, water, sleep, etc.)
- **Nutrition** — Log meals, track macros
- **Training** — Log workouts
- **Recovery** — Log sleep, hydration, meditation, etc.
- **Progress** — XP, levels, streaks (from real actions only)
- **Empty states** — Motivating prompts when no data yet

## Tech Stack

- Next.js 16, TypeScript, Tailwind CSS v4
- Supabase (Auth + PostgreSQL)
- Framer Motion, Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run `supabase/schema.sql` in the Supabase SQL Editor
5. In Supabase Auth settings, configure:
   - Email confirmation: enable if you want users to verify email
   - Site URL: `http://localhost:3000` (or your production URL)
   - Redirect URLs: add `http://localhost:3000/auth/callback`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design

- **Colors:** Black background, red accent (#dc2626)
- **Tone:** Premium, serious, performance-oriented
- **No fake data:** New users start with 0 XP, 0 streak, empty logs

## Project Structure

```
src/
├── app/
│   ├── (auth)/     # Login, register, forgot-password, reset-password
│   ├── (app)/      # Dashboard, targets, nutrition, training, recovery, profile, progress
│   ├── auth/       # Callback route for email verification
│   └── onboarding/ # First-time setup
├── components/
├── contexts/       # AuthContext
├── hooks/          # useUserData
├── lib/
│   ├── db.ts       # Supabase queries
│   ├── supabase/
│   └── constants.ts
└── types/
```

## License

MIT
