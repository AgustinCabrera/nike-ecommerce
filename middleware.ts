import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin") && !token.role) {
    return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
