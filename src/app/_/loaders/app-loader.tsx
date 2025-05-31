"use client";

import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({ children }: { children: React.ReactNode }) {
  useApplayAppInterceptor();

  return <>{children}</>;
}
