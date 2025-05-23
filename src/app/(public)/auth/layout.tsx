"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession((s) => s.currentSession);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    router.replace(ROUTER_PATHS.HOME);
  }, [session, router]);

  return <>{children}</>;
}
