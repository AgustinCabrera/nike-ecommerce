import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('next-auth.session-token');

  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  const response = await fetch(`${req.nextUrl.origin}/api/users?email=${session.email}`);
  const data = await response.json();

  if (data.role === 'ADMIN') {
    return NextResponse.next(); 
  }

  return NextResponse.redirect(new URL('/', req.url)); 
}

export const config = {
  matcher: ['/admin/:path*'],
};