import { promises as fs } from 'fs';
import path from 'path';
import { PRODUCTS, Product } from '@/lib/data';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'products-db.json');

async function ensureDbFile() {
  await fs.mkdir(DB_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE);
  } catch {
    const initial = PRODUCTS.map((p) => ({
      ...p,
      images: p.images && p.images.length > 0 ? p.images : [p.image],
    }));
    await fs.writeFile(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

export async function readProducts(): Promise<Product[]> {
  await ensureDbFile();
  const raw = await fs.readFile(DB_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as Product[];
  return parsed.map((p) => ({
    ...p,
    images: p.images && p.images.length > 0 ? p.images : [p.image],
  }));
}

export async function writeProducts(products: Product[]) {
  await ensureDbFile();
  await fs.writeFile(DB_FILE, JSON.stringify(products, null, 2), 'utf-8');
}
