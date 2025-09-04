import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' https://elwiaaugvavnjllatrlh.supabase.co; script-src 'self' 'unsafe-inline';"
  );
  return response;
}

export const config = {
  matcher: '/:path*',
};
