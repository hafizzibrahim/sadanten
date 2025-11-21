import { NextRequest, NextResponse } from 'next/server';

// Protect admin routes
export function middleware(request: NextRequest) {
  // Check if the requested path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the token from cookies
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login page
    if (!token) {
      // Store the attempted URL for redirect after login
      const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', redirectUrl);
      
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to admin routes only
export const config = {
  matcher: [
    // Protect all admin routes including the root admin page
    '/admin',
    '/admin/:path*',
  ],
};