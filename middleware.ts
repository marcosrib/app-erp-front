import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest ) {
    const { pathname } = req.nextUrl

    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  export const config = {
    matcher: ['/', '/login', '/dashboard','/register/:path*'] 
  }