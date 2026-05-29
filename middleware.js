import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const response = intlMiddleware(request);
  // Clear NEXT_LOCALE cookie so it never overrides URL-based locale
  const res = response || NextResponse.next();
  res.cookies.delete('NEXT_LOCALE');
  return res;
}

export const config = {
  matcher: ['/', '/(ko|en|ja|zh|fr|es|hi)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
