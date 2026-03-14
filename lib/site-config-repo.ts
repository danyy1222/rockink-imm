import { Brand, HeroSlide } from '@/lib/data';
import {
  getDefaultSiteConfig,
  readSiteConfig,
  SiteConfig,
  writeSiteConfig,
} from '@/lib/site-config-db';

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
  return readSiteConfig();
}

export async function updateSiteConfig(patch: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await readSiteConfig();
  const next = normalizeConfig({
    ...current,
    ...patch,
  });
  await writeSiteConfig(next);
  return next;
}
