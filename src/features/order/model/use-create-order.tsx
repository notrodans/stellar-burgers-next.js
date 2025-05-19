"use client";

import { useEffect } from "react";
import { useSession } from "~/entities/session";
import { ApiError, usePostOrders } from "~/shared/api/generated";

export function useCreateOrder() {
  const { currentSession } = useSession();

  useEffect(() => {
    console.log(currentSession);
  }, [currentSession]);

  const { trigger, data, error, isMutating } = usePostOrders<ApiError>({
    request: {
      headers: {
        Authorization: currentSession?.accessToken,
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
