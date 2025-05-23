"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib";
import { Loader } from "~/shared/ui";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession((s) => s.currentSession);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const routerPush = useEventCallback(router.push);

  useEffect(() => {
    if (!session) return setIsLoading(false);

    routerPush(ROUTER_PATHS.HOME);
  }, [routerPush, session]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
