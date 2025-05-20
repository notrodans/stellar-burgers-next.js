"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib";
import { Loader } from "~/shared/ui";

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session = useSession((s) => s.currentSession);

  const router = useRouter();
  // const routerPush = useEventCallback(router.push);

  useEffect(() => {
    if (!session) return setIsLoading(false);

    window.location.href = ROUTER_PATHS.HOME;
  }, [session]);

  return <>{isLoading ? <Loader screen /> : children}</>;
}
