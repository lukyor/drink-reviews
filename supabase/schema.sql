-- Run this in Supabase: Project -> SQL Editor -> New query -> paste -> Run

create extension if not exists "pgcrypto";

create table reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  score numeric(2,1) not null check (score >= 1 and score <= 5),
  notes text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references reviews(id) on delete cascade,
  author_name text not null,
  body text not null,
  score numeric(2,1) check (score >= 1 and score <= 5),
  created_at timestamptz not null default now()
);

-- Row Level Security: on by default in Supabase. These policies make
-- reviews/comments publicly readable, and (for now, while there's no
-- login system yet) publicly writable too. Tighten the write policies
-- once you add authentication so only you can post reviews.

alter table reviews enable row level security;
alter table comments enable row level security;

create policy "Public can read reviews" on reviews
  for select using (true);

create policy "Public can insert reviews" on reviews
  for insert with check (true);

create policy "Public can read comments" on comments
  for select using (true);

create policy "Public can insert comments" on comments
  for insert with check (true);
