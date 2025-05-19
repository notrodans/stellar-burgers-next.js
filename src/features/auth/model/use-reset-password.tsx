"use client";

import { useRouter } from "next/navigation";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { ApiError, usePostPasswordResetReset } from "~/shared/api/generated";

export function useResetPassword() {
  const router = useRouter();
  const { currentSession } = useSession();

  const { trigger, data, error, isMutating } =
    usePostPasswordResetReset<ApiError>({
      swr: {
        onSuccess() {
          router.replace(ROUTER_PATHS.SIGN_IN);
        },
      },
      request: {
        headers: {
          Authorization: currentSession!.accessToken,
        },
      },
    });

  return {
    mutate: trigger,
    data,
    error,
    isSuccess: data?.success,
    isLoading: isMutating,
  };
}
