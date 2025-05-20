"use client";

import {
  publicApiInstance,
  privateApiInstance,
} from "~/shared/api/api-instance";
import { ROUTER_PATHS } from "~/shared/constants";
import { decode, useEventCallback } from "~/shared/lib";
import { useRouter } from "next/navigation";
import { commitSession, Session } from "~/entities/session";
import { postAuthToken } from "~/shared/api/public-generated";
import { useIsomorphicLayoutEffect } from "swr/_internal";

let refreshPromise: Promise<{ accessToken: string } | void> | null = null;

export function useApplayAppInterceptor({
  session,
}: {
  session: Session | undefined;
}) {
  const router = useRouter();
  const routerReplace = useEventCallback(router.replace);

  useIsomorphicLayoutEffect(() => {
    publicApiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403) {
          routerReplace(ROUTER_PATHS.SIGN_IN);
        }
      },
    );

    privateApiInstance.interceptors.request.use(async (request) => {
      if (!session) return request;

      const accessToken = session.accessToken;
      const refreshToken = session.refreshToken;
      request.headers.Authorization = accessToken;
      const decodedAccessToken = decode(session.accessToken);
      const tokenExpiresAt = decodedAccessToken.exp!;

      if (tokenExpiresAt < Date.now() / 1000 + 10) {
        if (!refreshPromise) {
          refreshPromise = postAuthToken({ token: refreshToken })
            .then(async (res) => {
              const { accessToken, refreshToken } = res;
              await commitSession({
                ...session,
                accessToken,
                refreshToken,
              });
              return { accessToken };
            })
            .finally(async () => {
              return await Promise.resolve(() => (refreshPromise = null));
            });
        }

        const response = await refreshPromise;
        request.headers.Authorization = response?.accessToken;
      }

      return request;
    });
  }, [routerReplace, session]);
}
