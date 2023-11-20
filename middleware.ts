import { NextRequest, NextResponse } from 'next/server'
export default async function middleware(req: NextRequest ) {
    const { pathname } = req.nextUrl

  
    //const token = req.cookies.get("erp.token")?.value

 
       
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
     
   /* if (token === undefined  && pathname !== '/' && pathname !== '/login' ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (pathname === '/' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }*/
    return NextResponse.next();
  }

  export const config = {
    matcher: ['/', '/login', '/dashboard','/register/:path*'] 
  }