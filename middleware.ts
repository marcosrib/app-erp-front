import { NextRequest, NextResponse } from 'next/server'
export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    console.log(  pathname  );
    const token = req.cookies.get("erp.token")?.value
    console.log(  token );

   
    if (pathname === '/' && token === undefined ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
     
    if (token === undefined  && pathname !== '/' && pathname !== '/login' ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (pathname === '/' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  
  }

  export const config = {
    matcher: ['/', '/login', '/dashboard','/registre']
  }