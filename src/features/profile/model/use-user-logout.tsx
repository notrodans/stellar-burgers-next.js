"use client";

import { useSWRConfig } from "swr";
import { useSession } from "~/entities/session";
import { getGetAuthUserKey } from "~/shared/api/private-generated";
import { usePostAuthLogout } from "~/shared/api/public-generated";

export function useUserLogout() {
  const { mutate } = useSWRConfig();
  const { removeSession } = useSession();
  const { trigger, isMutating } = usePostAuthLogout({
    swr: {
      async onSuccess() {
        await mutate(getGetAuthUserKey(), undefined, { revalidate: false });
        await removeSession();
      },
    },
  });

  return {
    isLoading: isMutating,
    trigger,
  };
}
