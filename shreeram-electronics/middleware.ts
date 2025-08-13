import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/owner") && !pathname.startsWith("/owner/login")) {
    const auth = request.cookies.get("owner_auth")?.value;
    if (auth !== "yes") {
      const url = new URL("/owner/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*"],
};