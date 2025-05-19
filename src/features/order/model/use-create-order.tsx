"use client";

import { useSession } from "~/entities/session";
import { ApiError, usePostOrders } from "~/shared/api/generated";

export function useCreateOrder() {
  const { currentSession } = useSession();

  const { trigger, data, error, isMutating } = usePostOrders<ApiError>({
    request: {
      headers: {
        Authorization: currentSession?.accessToken,
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
