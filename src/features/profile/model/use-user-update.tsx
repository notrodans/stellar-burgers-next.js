"use client";
import { useSWRConfig } from "swr";
import { ApiError } from "~/shared/api";
import {
  getGetAuthUserKey,
  usePatchAuthUser,
} from "~/shared/api/private-generated";
import { updateCurrentSession } from "~/shared/model";

export function useUserUpdate() {
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      async onSuccess(res) {
        await updateCurrentSession({
          ...res.user,
        });
        await mutate(
          getGetAuthUserKey(),
          {
            success: true,
            user: res.user,
          },
          { revalidate: false },
        );
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
