"use client";
import { useSWRConfig } from "swr";
import { useSession } from "~/entities/session";
import { ApiError } from "~/shared/api";
import {
  getGetAuthUserKey,
  usePatchAuthUser,
} from "~/shared/api/private-generated";

export function useUserUpdate() {
  const { updateSession } = useSession();
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      async onSuccess(res) {
        await mutate(
          getGetAuthUserKey(),
          {
            success: true,
            user: res.user,
          },
          { revalidate: false },
        );
        await updateSession({
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
