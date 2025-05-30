import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// another HOC example
const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n.ts',
  experimental: {
    createMessagesDeclaration: './locales/en.json'
  }
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
