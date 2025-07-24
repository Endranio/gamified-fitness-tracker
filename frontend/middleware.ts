import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('✅ Middleware running on:', request.nextUrl.pathname);
  const token = request.cookies.get('token')?.value;

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/workouts');
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/workouts/:path*', '/login', '/register'],
};
