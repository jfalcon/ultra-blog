'use client';

import Error from 'next/error';
import { routing } from '@/i18n';

// this page renders when a route without locale such as `/unknown.txt` is requested
export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <Error statusCode={404} />;
      </body>
    </html>
  );
}
