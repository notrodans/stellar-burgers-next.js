import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CONSTANTS_MAP, ROUTER_PATHS } from "~/shared/constants";

export function middleware(request: NextRequest) {
  const isHasSession = request.cookies.has(
    process.env.NEXT_PUBLIC_URL.startsWith("https://") &&
      process.env.NODE_ENV === "production"
      ? `__Secure-${CONSTANTS_MAP.shared.config.cookieSessionName}`
      : CONSTANTS_MAP.shared.config.cookieSessionName,
  );

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (isHasSession)
      return NextResponse.redirect(new URL(ROUTER_PATHS.HOME, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (!isHasSession)
      return NextResponse.redirect(new URL(ROUTER_PATHS.SIGN_IN, request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/profile/:path*"],
};
