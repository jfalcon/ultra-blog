import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header>{t('title')}</header>
  );
}

export default Header;
