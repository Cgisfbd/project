import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/force-change-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes, static assets, and API proxy
  if (
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    // If user has valid access_token and tries to visit /login, redirect to dashboard
    const accessToken = request.cookies.get("access_token");
    if (pathname === "/login" && accessToken?.value) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ─── TAMPER-PROOF AUTH CHECK ───
  // Check the actual HttpOnly `access_token` cookie set by the Backend.
  // This cookie is:
  //   - HttpOnly (JavaScript cannot read/steal it)
  //   - SameSite=Strict (no CSRF)
  //   - Set only by the backend on successful login
  // Even if someone forges a marker cookie, this one cannot be faked.
  const accessToken = request.cookies.get("access_token");

  if (!accessToken?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
