-- FutureMinds content pipeline
-- Run this in the Supabase SQL editor (or via supabase db push).
-- After running, create a single admin user under Authentication > Users.

-- ---------------------------------------------------------------------------
-- Table: content_items
-- ---------------------------------------------------------------------------
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  module text not null,
  tags text[] not null default '{}',
  order_index int not null default 0,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists content_items_module_order_idx
  on public.content_items (module, order_index);

alter table public.content_items enable row level security;

-- Students (anon) may only read. Writes require a signed-in admin.
drop policy if exists "Public can read content" on public.content_items;
create policy "Public can read content"
  on public.content_items
  for select
  using (true);

drop policy if exists "Authenticated can insert content" on public.content_items;
create policy "Authenticated can insert content"
  on public.content_items
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update content" on public.content_items;
create policy "Authenticated can update content"
  on public.content_items
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete content" on public.content_items;
create policy "Authenticated can delete content"
  on public.content_items
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket: content-assets (PDFs, mindmap images, thumbnails)
-- Videos are external URLs — they are not stored here.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('content-assets', 'content-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read content-assets" on storage.objects;
create policy "Public read content-assets"
  on storage.objects
  for select
  using (bucket_id = 'content-assets');

drop policy if exists "Authenticated upload content-assets" on storage.objects;
create policy "Authenticated upload content-assets"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'content-assets');

drop policy if exists "Authenticated update content-assets" on storage.objects;
create policy "Authenticated update content-assets"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'content-assets')
  with check (bucket_id = 'content-assets');

drop policy if exists "Authenticated delete content-assets" on storage.objects;
create policy "Authenticated delete content-assets"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'content-assets');
