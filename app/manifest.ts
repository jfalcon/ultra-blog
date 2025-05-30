import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'Manifest'
  });

  // theme color is used for icons when saving the site
  return {
    name: t('name'),
    start_url: '/',
    theme_color: '#101E33'
  };
}
