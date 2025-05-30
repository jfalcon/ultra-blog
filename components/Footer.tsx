import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer>
      {t('copyright')} &copy;{new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
