"use client";

import { useRouter } from "next/navigation";
import { useSession } from "~/entities/session";
import { ROUTER_PATHS } from "~/shared/constants";
import { usePostPasswordResetReset } from "~/shared/api/public-generated";
import { ApiError } from "~/shared/api";

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
    mutate: trigger,
    data,
    error,
    isSuccess: data?.success,
    isLoading: isMutating,
  };
}
