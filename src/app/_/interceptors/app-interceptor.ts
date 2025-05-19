import { apiInstance } from "~/shared/api/api-instance";
import { ROUTER_PATHS } from "~/shared/constants";
import { useEventCallback } from "~/shared/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/shared/api";
import { commitSession, Session } from "~/entities/session";
import { API_MESSAGES } from "~/shared/constants";

export function useApplayAppInterceptor({
  session,
}: {
  session: Session | undefined;
}) {
  const router = useRouter();

  const routerReplace = useEventCallback(router.replace);
  useEffect(() => {
    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // 403 handler
        if (error.response.status === 403) {
          if (error.response.data.message !== API_MESSAGES.TOKEN_ERROR) return;
          let isRetry = false;
          if (!session) return routerReplace(ROUTER_PATHS["403"]);

          if (!isRetry) {
            const token = session.refreshToken;
            if (!token) throw error;

            await api
              .postAuthToken(
                { token },
                {
                  headers: {
                    Authorization: session.accessToken,
                  },
                },
              )
              .then(async (res) => {
                commitSession({
                  ...session,
                  accessToken: res.accessToken,
                  refreshToken: res.refreshToken,
                });
              })
              .finally(() => {
                isRetry = true;
              });
          }
        }
      },
    );

    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 401 handler
        if (error.response.status === 401) {
          routerReplace(ROUTER_PATHS.SIGN_IN);
        }
      },
    );
  }, [routerReplace, session]);
}
