import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utility';
import { routing } from '@/i18n';

// for the demo this just covers the base
function getEntries() {
  return routing.locales.map((locale) => ({
    url: `${getBaseUrl()}/${locale}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, `${getBaseUrl()}/${cur}`])
      )
    }
  }));
}

// this should dynamically build a sitemap for SEO reasons but *only* for public sites,
// adding the stub here to show it's important to include for public sites and is
// important to not include for private sites
export default function sitemap(): MetadataRoute.Sitemap {
  return [...getEntries()];
}
