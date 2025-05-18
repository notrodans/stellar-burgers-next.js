"use client";

import { ApiError } from "next/dist/server/api-utils";
import { useCallback, useState } from "react";
import { useSession } from "~/entities/session";
import { api } from "~/shared/api";
import { OrderObjectDto } from "~/shared/api/generated";

type OrderFnParams = [
  (params: { ingredients: Array<string> }) => Promise<OrderObjectDto | void>,
  {
    data: OrderObjectDto | null;
    error: ApiError | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
  },
];

export function useCreateOrder(): OrderFnParams {
  const [data, setData] = useState<OrderObjectDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const currentSession = useSession((s) => s.currentSession);

  const create = useCallback(
    async (params: { ingredients: Array<string> }) => {
      setIsLoading(true);

      return await api
        .postOrders(params, {
          headers: {
            Authorization: currentSession?.accessToken,
          },
        })
        .then((res) => {
          setIsSuccess(true);
          setData(res);
        })
        .catch((err: ApiError) => {
          setIsError(true);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [currentSession?.accessToken],
  );

  return [
    create,
    {
      data,
      error,
      isError,
      isLoading,
      isSuccess,
    },
  ];
}
