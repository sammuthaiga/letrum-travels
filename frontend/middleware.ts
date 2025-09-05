import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authPaths = ['/login', '/register']
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPath) {
    const token = request.cookies.get('letrum_access_token')
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/bookings/:path*',
    '/login',
    '/register'
  ]
}