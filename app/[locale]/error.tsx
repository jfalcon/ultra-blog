'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({error, reset}: ErrorProps) {
  const t = useTranslations('ErrorPage');

  return (
    <main>
      <h1>{t('title')}</h1>
      {/* note, don't do this for production, messages should be logged
      via a server-side logging system get gets reported against */}
      <p>{error.message}</p>
      <button onClick={reset}>{t('try')}</button>
      <Link href="/">{t('home')}</Link>
    </main>
  );
}
