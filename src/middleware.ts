import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTER_PATHS } from "~/shared/constants";
import { getSession } from "./shared/model";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (session)
      return NextResponse.redirect(new URL(ROUTER_PATHS.HOME, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (!session)
      return NextResponse.redirect(new URL(ROUTER_PATHS.SIGN_IN, request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/profile/:path*"],
};
