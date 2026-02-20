export const DEFAULT_CATEGORIES = [
  'Semillas',
  'Fertilizantes',
  'Pesticidas',
  'Herramientas',
  'Estructuras',
  'Riego',
  'Insumos',
  'Equipos',
  'Otros',
];

function normalizeCategory(category: string) {
  return category
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function uniqueNormalized(categories: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];

  for (const raw of categories) {
    const normalized = normalizeCategory(raw);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
  }

  return out;
}

function sortByDefaultPriority(categories: string[]) {
  const defaults = DEFAULT_CATEGORIES.map((c) => normalizeCategory(c));
  const defaultSet = new Set(defaults.map((c) => c.toLowerCase()));

  const fixed = defaults.filter((c) => categories.some((x) => x.toLowerCase() === c.toLowerCase()));
  const extras = categories
    .filter((c) => !defaultSet.has(c.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'es'));

  return [...fixed, ...extras];
}

export function mergeCategoriesWithProducts(
  productCategories: string[],
  storedCategories: string[] = []
) {
  const merged = uniqueNormalized([
    ...DEFAULT_CATEGORIES,
    ...storedCategories,
    ...productCategories,
  ]);
  return sortByDefaultPriority(merged);
}

export function getCategories(): string[] {
  if (typeof window === 'undefined') return mergeCategoriesWithProducts([]);
  const stored = localStorage.getItem('agro_categories');
  if (!stored) return mergeCategoriesWithProducts([]);
  try {
    const parsed = JSON.parse(stored) as string[];
    return mergeCategoriesWithProducts([], parsed);
  } catch {
    return mergeCategoriesWithProducts([]);
  }
}

export function addCategory(category: string): string[] {
  if (typeof window === 'undefined') return mergeCategoriesWithProducts([]);
  const current = getCategories();
  const next = mergeCategoriesWithProducts([], [...current, category]);
  if (typeof window !== 'undefined') {
    localStorage.setItem('agro_categories', JSON.stringify(next));
  }
  return next;
}

export function removeCategory(category: string): string[] {
  if (typeof window === 'undefined') return mergeCategoriesWithProducts([]);
  const normalized = normalizeCategory(category).toLowerCase();
  const defaultSet = new Set(DEFAULT_CATEGORIES.map((c) => normalizeCategory(c).toLowerCase()));
  const current = getCategories().filter((c) => !defaultSet.has(c.toLowerCase()) && c.toLowerCase() !== normalized);
  const filtered = mergeCategoriesWithProducts([], current);
  localStorage.setItem('agro_categories', JSON.stringify(filtered));
  return filtered;
}
