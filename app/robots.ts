import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utility';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/', // TODO: should pull from metadata for a real site
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
