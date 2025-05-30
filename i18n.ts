import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

////////////////////////////////////////////////////////////////////////////////////////////////////

// with no locale provided, we default to english
export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
});

////////////////////////////////////////////////////////////////////////////////////////////////////

export const {Link, getPathname, redirect, usePathname, useRouter} = createNavigation(routing);

////////////////////////////////////////////////////////////////////////////////////////////////////

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
   locale,
   messages: (await import(`./locales/${locale}.json`)).default,
  };
});

////////////////////////////////////////////////////////////////////////////////////////////////////
