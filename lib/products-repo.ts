import { Product } from '@/lib/data';
import { readProducts, writeProducts } from '@/lib/products-db';

export async function getProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.id === id) || null;
}

export async function createProduct(input: Product): Promise<Product> {
  const normalizedStock =
    typeof input.stockQuantity === 'number'
      ? Math.max(0, Math.floor(input.stockQuantity))
      : input.inStock !== false
      ? 1
      : 0;
  const prepared: Product = {
    ...input,
    id: input.id || Date.now().toString(),
    images: input.images && input.images.length > 0 ? input.images : [input.image],
    specifications: input.specifications || [],
    stockQuantity: normalizedStock,
    inStock: normalizedStock > 0,
    inOffer: input.inOffer || false,
  };
  const products = await readProducts();
  await writeProducts([...products, prepared]);
  return prepared;
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
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
  if (typeof input.stockQuantity === 'number') {
    next.stockQuantity = Math.max(0, Math.floor(input.stockQuantity));
    next.inStock = next.stockQuantity > 0;
  }
  products[index] = next;
  await writeProducts(products);
  return next;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readProducts();
  const updated = products.filter((p) => p.id !== id);
  if (updated.length === products.length) return false;
  await writeProducts(updated);
  return true;
}
