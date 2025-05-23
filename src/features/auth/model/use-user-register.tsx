"use client";

import { useSWRConfig } from "swr";
import { useSession } from "~/entities/session";
import { ApiError } from "~/shared/api";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthRegister } from "~/shared/api/public-generated";

export function useUserRegister() {
  const { setCurrentSession } = useSession();
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePostAuthRegister<ApiError>({
    swr: {
      async onSuccess(res) {
        await mutate(getGetAuthUserKey(), {
          success: true,
          user: res.user,
        });
        await setCurrentSession({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          ...res.user,
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
