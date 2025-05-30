"use client";

import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthLogout } from "~/shared/api/public-generated";
import { destroySession } from "~/shared/model";

export function useUserLogout() {
  const { mutate } = useSWRConfig();
  const { trigger: removeSession } = useSWRMutation("session/logout", () => {
    destroySession();
  });

  const { trigger, isMutating } = usePostAuthLogout({
    swr: {
      async onSuccess() {
        await removeSession().then(() => {
          mutate(getGetAuthUserKey(), undefined, { revalidate: false });
        });
      },
    },
  });

  return {
    isLoading: isMutating,
    trigger,
  };
}
