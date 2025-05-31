"use client";

import { useSWRConfig } from "swr";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthLogout } from "~/shared/api/public-generated";
import { destroySession } from "~/shared/model";

export function useUserLogout() {
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = usePostAuthLogout({
    swr: {
      async onSuccess() {
        await destroySession();
        await mutate(getGetAuthUserKey(), undefined, { revalidate: false });
      },
    },
  });

  return {
    isLoading: isMutating,
    trigger,
  };
}
