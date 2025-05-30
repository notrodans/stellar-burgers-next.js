"use client";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { ApiError } from "~/shared/api";
import {
  getGetAuthUserKey,
  usePatchAuthUser,
} from "~/shared/api/private-generated";
import { updateCurrentSession } from "~/shared/model";

export function useUserUpdate() {
  const { trigger: updateSession } = useSWRMutation(
    "session/set",
    (url, { arg }) => updateCurrentSession(arg),
  );
  const { mutate } = useSWRConfig();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      async onSuccess(res) {
        await updateSession({
          ...res.user,
        }).then(() => {
          mutate(
            getGetAuthUserKey(),
            {
              success: true,
              user: res.user,
            },
            { revalidate: false },
          );
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
