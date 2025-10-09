
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const getIsAdmin = async () => {
  // For development, we will grant admin access.
  // This should be replaced with real auth logic in production.
  return Promise.resolve(true);
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      // Redirect non-admin users to the home page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
