"use client";

import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { ApiError } from "~/shared/api";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthLogin } from "~/shared/api/public-generated";
import { commitSession } from "~/shared/model";

export function useUserSignIn() {
  const { trigger: setCurrentSession } = useSWRMutation(
    "session/commit",
    (url, { arg }) => commitSession(arg),
  );
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePostAuthLogin<ApiError>({
    swr: {
      async onSuccess(res) {
        await setCurrentSession({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          ...res.user,
        }).then(() => {
          mutate(getGetAuthUserKey(), {
            success: true,
            user: res.user,
          });
        });
      },
    },
  });

  return {
    trigger,
    data,
    error,
    isSuccess: data?.success,
    isLoading: isMutating,
  };
}
