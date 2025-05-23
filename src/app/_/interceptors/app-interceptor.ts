"use client";

import { useRouter } from "next/navigation";
import { useIsomorphicLayoutEffect } from "swr/_internal";
import { useSession } from "~/entities/session";
import { privateApiInstance } from "~/shared/api/api-instance";
import { postAuthToken } from "~/shared/api/public-generated";
import { ROUTER_PATHS } from "~/shared/constants";
import { decode, useEventCallback } from "~/shared/lib";

let refreshPromise: Promise<{ accessToken?: string }> | null = null;

export function useApplayAppInterceptor() {
  const { currentSession: session, updateSession } = useSession();
  const router = useRouter();
  const routerReplace = useEventCallback(router.replace);

  useIsomorphicLayoutEffect(() => {
    const responseInterceptor = privateApiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          routerReplace(ROUTER_PATHS.SIGN_IN);
        }
        return Promise.reject(error);
      },
    );

    const requestInterceptor = privateApiInstance.interceptors.request.use(
      async (request) => {
        if (!session) return request;

        const { accessToken, refreshToken } = session;
        request.headers.Authorization = accessToken;

        const decodedAccessToken = decode(accessToken);
        const tokenExpiresAt = decodedAccessToken.exp!;
        const isExpired = Date.now() / 1000 > tokenExpiresAt - 10;

        if (!isExpired) return request;

        if (!refreshPromise) {
          refreshPromise = postAuthToken({ token: refreshToken })
            .then(async (res) => {
              const { accessToken, refreshToken } = res;
              await updateSession({
                accessToken,
                refreshToken,
              });
              request.headers.Authorization = accessToken;
              return { accessToken };
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;

        return request;
      },
    );

    return () => {
      privateApiInstance.interceptors.response.eject(responseInterceptor);
      privateApiInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [routerReplace, session, updateSession]);
}
