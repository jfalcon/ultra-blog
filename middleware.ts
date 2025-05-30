import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n';

const i18nMiddleware = createMiddleware(routing);

////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const config = {
  // match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

////////////////////////////////////////////////////////////////////////////////////////////////////
