export const DEFAULT_CATEGORIES = [
  'Semillas',
  'Fertilizantes',
  'Pesticidas',
  'Herramientas',
  'Equipos',
  'Otros',
];

export function getCategories(): string[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const stored = localStorage.getItem('agro_categories');
  if (!stored) return DEFAULT_CATEGORIES;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function addCategory(category: string): string[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const current = getCategories();
  if (!current.includes(category)) {
    current.push(category);
    localStorage.setItem('agro_categories', JSON.stringify(current));
  }
  return current;
}

export function removeCategory(category: string): string[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const current = getCategories();
  const filtered = current.filter((c) => !DEFAULT_CATEGORIES.includes(c) && c !== category);
  localStorage.setItem('agro_categories', JSON.stringify(filtered));
  return filtered;
}
