"use client";

import { useRouter } from "next/navigation";
import { useSession } from "~/entities/session";
import { ApiError, usePostPasswordReset } from "~/shared/api/generated";
import { ROUTER_PATHS } from "~/shared/constants";

export function useForgotPassword() {
  const router = useRouter();
  const { currentSession } = useSession();

  const { trigger, data, error, isMutating } = usePostPasswordReset<ApiError>({
    swr: {
      onSuccess() {
        router.replace(ROUTER_PATHS.RESET_PASSWORD);
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
