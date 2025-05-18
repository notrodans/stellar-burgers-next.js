"use client";

import { ApiError } from "next/dist/server/api-utils";
import { useCallback, useState } from "react";
import { useSession } from "~/entities/session";
import { useUser } from "~/entities/user";
import { api } from "~/shared/api";
import {
  UserObjectDto,
  UserObjectWithPasswordDto,
} from "~/shared/api/generated";

type UserFnParams = [
  (params: UserObjectWithPasswordDto) => Promise<UserObjectDto | void>,
  {
    data: UserObjectDto | null;
    error: ApiError | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
  },
];

export function useUpdateUser(): UserFnParams {
  const [data, setData] = useState<UserObjectDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const currentSession = useSession((s) => s.currentSession);
  const setCurrentUser = useUser((s) => s.setCurrentUser);

  const update = useCallback(
    async (params: UserObjectWithPasswordDto) => {
      setIsLoading(true);

      return await api
        .patchAuthUser(params, {
          headers: {
            Authorization: currentSession?.accessToken,
          },
        })
        .then((res) => {
          setCurrentUser(res.user);
          setIsSuccess(true);
          setData(res.user);
        })
        .catch((err: ApiError) => {
          setIsError(true);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setCurrentUser, currentSession?.accessToken],
  );

  return [
    update,
    {
      data,
      error,
      isError,
      isLoading,
      isSuccess,
    },
  ];
}
