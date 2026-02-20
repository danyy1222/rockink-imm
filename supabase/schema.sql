create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  category text not null default 'Otros',
  image text not null,
  model_3d_embed_url text,
  images text[] not null default '{}',
  specifications text[] not null default '{}',
  youtube_id text not null default 'dQw4w9WgXcQ',
  in_stock boolean not null default true,
  in_offer boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products
add column if not exists model_3d_embed_url text;

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

create table if not exists public.app_config (
  key text primary key,
  value jsonb not null
);

insert into public.products (
  id,
  name,
  description,
  category,
  image,
  model_3d_embed_url,
  images,
  specifications,
  youtube_id,
  in_stock,
  in_offer
)
values (
  'demo-tripo-3d-1',
  'Toro Ganadero 3D (Demo)',
  'Producto demo con modelo 3D integrado desde Tripo Studio para pruebas de visualizacion.',
  'Ganaderia',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&h=800&fit=crop',
  'https://sabqkcbdvkqqrazmaeys.supabase.co/storage/v1/object/public/modelos-3d/modelo_final_rockink.glb',
  array[
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&h=800&fit=crop'
  ]::text[],
  array[
    'Modelo 3D integrado para demo',
    'Categoria: Ganaderia',
    'Uso: prueba de visor 3D'
  ]::text[],
  'dQw4w9WgXcQ',
  true,
  true
)
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  image = excluded.image,
  model_3d_embed_url = excluded.model_3d_embed_url,
  images = excluded.images,
  specifications = excluded.specifications,
  youtube_id = excluded.youtube_id,
  in_stock = excluded.in_stock,
  in_offer = excluded.in_offer;
