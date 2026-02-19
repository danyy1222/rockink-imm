import { Product } from '@/lib/data';
import { readProducts, writeProducts } from '@/lib/products-db';

type ProductRow = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  model_3d_embed_url: string | null;
  images: string[] | null;
  specifications: string[] | null;
  youtube_id: string;
  in_stock: boolean;
  in_offer: boolean;
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    image: row.image,
    model3dEmbedUrl: row.model_3d_embed_url || undefined,
    images: row.images && row.images.length > 0 ? row.images : [row.image],
    specifications: row.specifications || [],
    youtubeId: row.youtube_id,
    inStock: row.in_stock,
    inOffer: row.in_offer,
  };
}

function toRow(product: Partial<Product>, options?: { includeId?: boolean }) {
  const row = {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image,
    model_3d_embed_url:
      product.model3dEmbedUrl === ''
        ? null
        : product.model3dEmbedUrl,
    images: product.images,
    specifications: product.specifications,
    youtube_id: product.youtubeId,
    in_stock: product.inStock,
    in_offer: product.inOffer,
  } as Record<string, unknown>;

  if (!options?.includeId) {
    delete row.id;
  }

  Object.keys(row).forEach((key) => {
    if (row[key] === undefined) {
      delete row[key];
    }
  });

  return row;
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY as string}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  return response;
}

export async function getProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) {
    return readProducts();
  }

  const response = await supabaseFetch('/rest/v1/products?select=*&order=id.asc');
  if (!response.ok) {
    throw new Error('No se pudieron leer productos en Supabase');
  }
  const rows = (await response.json()) as ProductRow[];
  return rows.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!hasSupabaseConfig()) {
    const products = await readProducts();
    return products.find((p) => p.id === id) || null;
  }

  const response = await supabaseFetch(
    `/rest/v1/products?select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  if (!response.ok) {
    throw new Error('No se pudo leer producto en Supabase');
  }

  const rows = (await response.json()) as ProductRow[];
  if (!rows[0]) return null;
  return toProduct(rows[0]);
}

export async function createProduct(input: Product): Promise<Product> {
  const prepared: Product = {
    ...input,
    id: input.id || Date.now().toString(),
    images: input.images && input.images.length > 0 ? input.images : [input.image],
    specifications: input.specifications || [],
    inStock: input.inStock !== false,
    inOffer: input.inOffer || false,
  };

  if (!hasSupabaseConfig()) {
    const products = await readProducts();
    await writeProducts([...products, prepared]);
    return prepared;
  }

  const response = await supabaseFetch('/rest/v1/products', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(toRow(prepared, { includeId: true })),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`No se pudo crear producto en Supabase: ${details}`);
  }

  const rows = (await response.json()) as ProductRow[];
  return toProduct(rows[0]);
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
  if (!hasSupabaseConfig()) {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index < 0) return null;

    const current = products[index];
    const next: Product = {
      ...current,
      ...input,
      id: current.id,
      image: input.image || current.image,
      images:
        input.images && input.images.length > 0
          ? input.images
          : input.image
          ? [input.image]
          : current.images,
      specifications: input.specifications || current.specifications,
    };
    products[index] = next;
    await writeProducts(products);
    return next;
  }

  const patchUrl = `/rest/v1/products?id=eq.${encodeURIComponent(id)}`;
  const rowPayload = toRow(input, { includeId: false });

  let response = await supabaseFetch(patchUrl, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(rowPayload),
  });

  if (!response.ok) {
    const details = await response.text();

    // Backward-compatible retry when DB still lacks the optional 3D column.
    if (
      details.includes('model_3d_embed_url') &&
      Object.prototype.hasOwnProperty.call(rowPayload, 'model_3d_embed_url')
    ) {
      delete rowPayload.model_3d_embed_url;
      response = await supabaseFetch(patchUrl, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(rowPayload),
      });
    }

    if (!response.ok) {
      const retryDetails = await response.text();
      throw new Error(`No se pudo actualizar producto en Supabase: ${retryDetails || details}`);
    }
  }

  const rows = (await response.json()) as ProductRow[];
  if (!rows[0]) return null;
  return toProduct(rows[0]);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!hasSupabaseConfig()) {
    const products = await readProducts();
    const updated = products.filter((p) => p.id !== id);
    if (updated.length === products.length) return false;
    await writeProducts(updated);
    return true;
  }

  const response = await supabaseFetch(`/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar producto en Supabase');
  }
  return true;
}
