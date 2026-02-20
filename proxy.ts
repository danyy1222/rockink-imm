import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_access_ok';
const ACCESS_PARAM = 'access';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isAdminRoute = url.pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const hasAccessCookie = request.cookies.get(ADMIN_COOKIE)?.value === '1';
  if (hasAccessCookie) {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_ACCESS_KEY;
  const keyFromUrl = url.searchParams.get(ACCESS_PARAM);

  if (secret && keyFromUrl === secret) {
    url.searchParams.delete(ACCESS_PARAM);
    const response = NextResponse.redirect(url);
    response.cookies.set(ADMIN_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return response;
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/admin/:path*'],
};
