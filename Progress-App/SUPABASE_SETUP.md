# Supabase Setup

## 1. Environment variables

`.env.local` is already configured with your project URL and key.

## 2. Run the database setup

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** → **New query**
4. Open `supabase/FULL_SETUP.sql` in this project
5. Copy the entire contents and paste into the SQL Editor
6. Click **Run**

You should see "Success. No rows returned" when it finishes.

## 3. Auth settings (optional)

In **Authentication** → **Providers**:

- **Email** is enabled by default
- If you want to skip email confirmation during development, go to **Authentication** → **Providers** → **Email** and turn off "Confirm email"

## 4. Start the app

```bash
npm run dev
```

Then open http://127.0.0.1:3000

---

**If you get auth errors:** In Supabase Dashboard → **Project Settings** → **API**, copy the **anon public** key (it usually starts with `eyJ...`). Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` with that value and restart the dev server.
