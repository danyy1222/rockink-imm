import { promises as fs } from 'fs';
import path from 'path';
import { Brand, DEFAULT_BRANDS, DEFAULT_HERO_SLIDES, HeroSlide } from '@/lib/data';

export interface SiteConfig {
  offersProducts: string[];
  brands: Brand[];
  heroSlides: HeroSlide[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'site-config.json');

const DEFAULT_SITE_CONFIG: SiteConfig = {
  offersProducts: [],
  brands: DEFAULT_BRANDS,
  heroSlides: DEFAULT_HERO_SLIDES,
};

async function ensureConfigFile() {
  await fs.mkdir(DB_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify(DEFAULT_SITE_CONFIG, null, 2), 'utf-8');
  }
}

export function getDefaultSiteConfig(): SiteConfig {
  return DEFAULT_SITE_CONFIG;
}

export async function readSiteConfig(): Promise<SiteConfig> {
  await ensureConfigFile();
  const raw = await fs.readFile(DB_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as Partial<SiteConfig>;
  return {
    offersProducts: Array.isArray(parsed.offersProducts) ? parsed.offersProducts : [],
    brands: Array.isArray(parsed.brands) && parsed.brands.length > 0 ? parsed.brands : DEFAULT_BRANDS,
    heroSlides:
      Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0
        ? parsed.heroSlides
        : DEFAULT_HERO_SLIDES,
  };
}

export async function writeSiteConfig(config: SiteConfig) {
  await ensureConfigFile();
  await fs.writeFile(DB_FILE, JSON.stringify(config, null, 2), 'utf-8');
}
