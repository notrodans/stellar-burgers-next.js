"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetAuthUser } from "~/shared/api/private-generated";
import { ROUTER_PATHS } from "~/shared/constants";
import { Loader } from "~/shared/ui";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isLoading } = useGetAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || session) return;
    router.replace(ROUTER_PATHS.SIGN_IN);
  }, [router, isLoading, session]);

  if (isLoading) return <Loader screen />;

  return <>{children}</>;
}
