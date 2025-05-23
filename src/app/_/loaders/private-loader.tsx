"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib";
import { Loader } from "~/shared/ui";

export function PrivateLoader({ children }: { children?: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const session = useSession((s) => s.currentSession);
  const routerPush = useEventCallback(router.push);

  useEffect(() => {
    if (session) return setIsLoading(false);

    routerPush(ROUTER_PATHS.SIGN_IN);
  }, [session, routerPush]);

  return <>{isLoading ? <Loader screen /> : children}</>;
}
