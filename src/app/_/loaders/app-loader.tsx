"use client";

import { SessionProvider } from "~/entities/session";
import { Session } from "~/shared/model";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { AppProvider } from "../providers/app-provider";

export function AppLoader({
  session,
  children,
}: {
  session: Session | undefined;
  children: React.ReactNode;
}) {
  useApplayAppInterceptor();

  return (
    <SessionProvider value={{ session }}>
      <AppProvider>{children}</AppProvider>
    </SessionProvider>
  );
}
