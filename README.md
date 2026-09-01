# Tasting Notes — setup guide

A from-zero walkthrough. Follow it top to bottom; each step assumes only the one before it.

## 1. Install Node.js

This is the program that lets your computer run JavaScript/TypeScript projects outside a browser.

1. Go to https://nodejs.org
2. Download the **LTS** version (not "Current") for your OS and install it like any normal app.
3. Check it worked: open a terminal (in VS Code: `Terminal` menu → `New Terminal`) and run:
   ```
   node -v
   npm -v
   ```
   You should see version numbers, not an error.

## 2. Open this project

1. Unzip the folder you downloaded.
2. In VS Code: `File` → `Open Folder…` → select the unzipped `drink-reviews` folder.
3. Open the built-in terminal (`Terminal` → `New Terminal`) — it should already be inside the project folder.

## 3. Install the project's dependencies

In the terminal:
```
npm install
```
This downloads all the libraries the project uses (Next.js, React, Supabase's client, etc.) into a `node_modules` folder. It's normal for this to take a minute and print a lot of text.

## 4. Create your database (Supabase)

Supabase is a free hosted database — this is where your reviews and comments actually get stored.

1. Go to https://supabase.com and sign up (free).
2. Click **New project**. Pick any name and password (save the password somewhere — you likely won't need it again, but keep it safe).
3. Once it's created, go to the **SQL Editor** (left sidebar) → **New query**.
4. Open `supabase/schema.sql` from this project, copy all of it, paste it into the SQL editor, and click **Run**.
   This creates your two tables: `reviews` and `comments`.
5. Go to **Project Settings** → **API**. You'll need two values from this page in the next step:
   - **Project URL**
   - **anon public** key

## 5. Connect the project to your database

1. In the project folder, duplicate `.env.example` and rename the copy to `.env.local`.
2. Open `.env.local` and paste in your values from step 4:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Save the file. (`.env.local` is already in `.gitignore` so it won't accidentally get shared or uploaded anywhere.)

## 6. Run it locally

```
npm run dev
```
Then open http://localhost:3000 in your browser. You should see the homepage. Click **Log a drink** to add your first review.

Leave this terminal running while you work — the site live-reloads as you edit files.

## 7. Put it on the internet (optional, whenever you're ready)

1. Create a free account at https://github.com and https://vercel.com.
2. Push this project to a new GitHub repository (VS Code has a built-in `Source Control` panel that can do this — it'll prompt you to sign in and create the repo).
3. In Vercel: **Add New… → Project**, import that GitHub repo.
4. Vercel will detect it's a Next.js app automatically. Before deploying, add your two env vars from step 5 under **Environment Variables**.
5. Click **Deploy**. A few minutes later you'll have a live URL.

## What's here so far

- `/` — list of all reviews
- `/reviews/[id]` — a single review, plus a public comment form
- `/reviews/new` — form to log a new drink (currently open to anyone — see the note below)

## Known gaps / good next steps

- **No login system yet.** Right now anyone who finds `/reviews/new` can post a review, not just you. The database policies (in `supabase/schema.sql`) are intentionally left open for this first version so you can get something working end to end. Adding Supabase Auth so only you can log in and post is the natural next step.
- **No image upload yet** — the `image_url` column exists but nothing writes to it yet. Supabase Storage handles this well when you're ready.
- **No pagination** — fine for a personal site with a modest number of reviews, but worth adding once the list grows long.

## Authentication (login)

This project now includes a simple email/password login flow powered by Supabase. To enable it:

1. In your Supabase project, go to **Authentication → Settings → External OAuth Providers** and ensure Email auth is enabled (this is the default).
2. Confirm your `.env.local` contains the two vars from earlier:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Start the app (`npm run dev`) and visit `/login` to create an account or sign in.

Once signed in, your email will appear in the header and you can sign out. The `Log a drink` link remains visible; you can restrict access later with Supabase Row Level Security policies if you want only authenticated users to create reviews.
