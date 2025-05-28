"use client";

import { SessionProvider } from "~/entities/session";
import { Session } from "~/shared/model";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({
  session,
  children,
}: {
  session: Session | undefined;
  children: React.ReactNode;
}) {
  useApplayAppInterceptor();

  return <SessionProvider value={{ session }}>{children}</SessionProvider>;
}
