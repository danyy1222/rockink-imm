create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  category text not null default 'Otros',
  image text not null,
  images text[] not null default '{}',
  specifications text[] not null default '{}',
  youtube_id text not null default 'dQw4w9WgXcQ',
  in_stock boolean not null default true,
  in_offer boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();
