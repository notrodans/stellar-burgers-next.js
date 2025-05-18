"use client";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrivateLoader({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const session = useSession((s) => s.currentSession);
  const routerPush = useEventCallback(router.push);

  useEffect(() => {
    if (!session) {
      routerPush(ROUTER_PATHS.SIGN_IN);
      return;
    }
  }, [session, routerPush]);

  return <>{children}</>;
}
