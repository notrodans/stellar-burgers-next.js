"use client";

import { useSWRConfig } from "swr";
import { ApiError } from "~/shared/api";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthRegister } from "~/shared/api/public-generated";
import { commitSession } from "~/shared/model";

export function useUserRegister() {
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePostAuthRegister<ApiError>({
    swr: {
      async onSuccess(res) {
        await commitSession({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          ...res.user,
        });
        await mutate(getGetAuthUserKey(), {
          success: true,
          user: res.user,
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
