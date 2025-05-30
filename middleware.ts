import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n';

const i18nMiddleware = createMiddleware(routing);

////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function middleware(request: NextRequest) {
  // this is where you'd perform A/B (split) testing, let's say
  // split testing is IP-based, the request object has that info
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
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
