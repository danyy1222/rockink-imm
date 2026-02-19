import { Brand, HeroSlide } from '@/lib/data';
import {
  getDefaultSiteConfig,
  readSiteConfig,
  SiteConfig,
  writeSiteConfig,
} from '@/lib/site-config-db';

type AppConfigRow = {
  key: string;
  value: unknown;
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseFetch(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY as string}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
}

function normalizeConfig(input: Partial<SiteConfig>): SiteConfig {
  const defaults = getDefaultSiteConfig();
  return {
    offersProducts: Array.isArray(input.offersProducts) ? input.offersProducts : defaults.offersProducts,
    brands:
      Array.isArray(input.brands) && input.brands.length > 0
        ? (input.brands as Brand[])
        : defaults.brands,
    heroSlides:
      Array.isArray(input.heroSlides) && input.heroSlides.length > 0
        ? (input.heroSlides as HeroSlide[])
        : defaults.heroSlides,
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!hasSupabaseConfig()) {
    return readSiteConfig();
  }

  const response = await supabaseFetch('/rest/v1/app_config?select=key,value');
  if (!response.ok) {
    throw new Error('No se pudo leer app_config en Supabase');
  }

  const rows = (await response.json()) as AppConfigRow[];
  const mapped: Partial<SiteConfig> = {};
  for (const row of rows) {
    if (row.key === 'offersProducts') mapped.offersProducts = row.value as string[];
    if (row.key === 'brands') mapped.brands = row.value as Brand[];
    if (row.key === 'heroSlides') mapped.heroSlides = row.value as HeroSlide[];
  }

  return normalizeConfig(mapped);
}

export async function updateSiteConfig(patch: Partial<SiteConfig>): Promise<SiteConfig> {
  if (!hasSupabaseConfig()) {
    const current = await readSiteConfig();
    const next = normalizeConfig({
      ...current,
      ...patch,
    });
    await writeSiteConfig(next);
    return next;
  }

  const entries: AppConfigRow[] = [];
  if (patch.offersProducts !== undefined) {
    entries.push({ key: 'offersProducts', value: patch.offersProducts });
  }
  if (patch.brands !== undefined) {
    entries.push({ key: 'brands', value: patch.brands });
  }
  if (patch.heroSlides !== undefined) {
    entries.push({ key: 'heroSlides', value: patch.heroSlides });
  }

  if (entries.length > 0) {
    const response = await supabaseFetch('/rest/v1/app_config?on_conflict=key', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify(entries),
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar app_config en Supabase');
    }
  }

  return getSiteConfig();
}
