"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetAuthUser } from "~/shared/api/private-generated";
import { ROUTER_PATHS } from "~/shared/constants";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useGetAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    router.replace(ROUTER_PATHS.HOME);
  }, [session, router]);

  return <>{children}</>;
}
