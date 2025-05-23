"use client";

import { useRouter } from "next/navigation";
import { ApiError } from "~/shared/api";
import { usePostPasswordResetReset } from "~/shared/api/public-generated";
import { ROUTER_PATHS } from "~/shared/constants";

export function useResetPassword() {
  const router = useRouter();

  const { trigger, data, error, isMutating } =
    usePostPasswordResetReset<ApiError>({
      swr: {
        onSuccess() {
          router.replace(ROUTER_PATHS.SIGN_IN);
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
