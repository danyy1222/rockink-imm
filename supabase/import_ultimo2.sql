-- Importa productos desde tabla staging `stg_ultimo2` con stock numerico real.
-- Espera columnas: activo, codigo, marca, linea, nombre, unidad, stock

begin;

create table if not exists public.stg_ultimo2 (
  activo text,
  codigo text,
  marca text,
  linea text,
  nombre text,
  unidad text,
  stock text
);

alter table public.products
add column if not exists stock_quantity integer not null default 0;

create or replace function public.norm_categoria(linea text)
returns text
language sql
immutable
as $$
  select case upper(trim(coalesce(linea,'')))
    when 'ORDEÑO' then 'Ordeño'
    when 'ORDENO' then 'Ordeño'
    when 'INSTRUMENTAL' then 'Instrumental'
    when 'IA' then 'Inseminación Artificial'
    when 'ESQUILA' then 'Esquila'
    when 'IDENTIFICACION' then 'Identificación Animal'
    when 'COMPLEMENTOS' then 'Complementos'
    when 'LIMPIEZA' then 'Limpieza'
    when 'CONSERVACION' then 'Conservación'
    when 'FUMIGACION' then 'Fumigación'
    when 'SEGURIDAD' then 'Seguridad'
    when 'CRIOGENIA' then 'Criogenia'
    when 'ILUMINACION' then 'Iluminación'
    else 'Otros'
  end
$$;

-- Limpia importaciones previas de este mismo origen
delete from public.products where id like 'csv-%';

insert into public.products (
  id,
  name,
  description,
  category,
  image,
  images,
  specifications,
  youtube_id,
  model_3d_embed_url,
  in_stock,
  stock_quantity,
  in_offer
)
select
  'csv-' || trim(codigo) as id,
  trim(nombre) as name,
  'Producto importado desde archivo ultimo2.csv' as description,
  public.norm_categoria(linea) as category,
  'https://picsum.photos/seed/' || trim(codigo) || '/1200/900' as image,
  array['https://picsum.photos/seed/' || trim(codigo) || '/1200/900']::text[] as images,
  array[
    'Marca: ' || coalesce(nullif(trim(marca), ''), 'N/A'),
    'Línea: ' || coalesce(nullif(trim(linea), ''), 'N/A'),
    'Unidad: ' || coalesce(nullif(trim(unidad), ''), 'N/A'),
    'Código: ' || trim(codigo)
  ]::text[] as specifications,
  'dQw4w9WgXcQ' as youtube_id,
  null as model_3d_embed_url,
  (
    coalesce(
      nullif(regexp_replace(coalesce(stock, '0'), '[^0-9\.\-]', '', 'g'), ''),
      '0'
    )::numeric > 0
  ) as in_stock,
  greatest(
    0,
    floor(
      coalesce(
        nullif(regexp_replace(coalesce(stock, '0'), '[^0-9\.\-]', '', 'g'), ''),
        '0'
      )::numeric
    )::int
  ) as stock_quantity,
  false as in_offer
from public.stg_ultimo2
where upper(trim(coalesce(activo, 'SI'))) = 'SI'
  and trim(coalesce(codigo, '')) <> ''
  and trim(coalesce(nombre, '')) <> ''
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  image = excluded.image,
  images = excluded.images,
  specifications = excluded.specifications,
  youtube_id = excluded.youtube_id,
  model_3d_embed_url = excluded.model_3d_embed_url,
  in_stock = excluded.in_stock,
  stock_quantity = excluded.stock_quantity,
  in_offer = excluded.in_offer;

commit;

-- Validación sugerida:
-- select count(*) from public.products where id like 'csv-%';
-- select count(*) from public.products where id like 'csv-%' and stock_quantity <= 5;
