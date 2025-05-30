import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import CustomProvider from '@/context/Custom';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import '@/app/globals.css';

// see the readme about using CSS variables
const font = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  description: 'Ultra Mobile Home Demo',
  icons: {
    icon: '/favicon.ico', // public path
  },
  title: 'Ultra Mobile Home',
};

export default async function LocaleLayout({children, params}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={font.variable}>
        <NextIntlClientProvider messages={messages}>
          <CustomProvider>
            {children}
          </CustomProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
