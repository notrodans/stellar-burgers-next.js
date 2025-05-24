"use client";

import { useRouter } from "next/navigation";
import { useIsomorphicLayoutEffect } from "swr/_internal";
import { privateApiInstance } from "~/shared/api/api-instance";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib";

export function useApplayAppInterceptor() {
  const router = useRouter();
  const routerReplace = useEventCallback(router.replace);

  useIsomorphicLayoutEffect(() => {
    const responseInterceptor = privateApiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          routerReplace(ROUTER_PATHS["403"]);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      privateApiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [routerReplace]);
}
