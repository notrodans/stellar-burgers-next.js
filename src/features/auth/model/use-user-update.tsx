import { useSession } from "~/entities/session";
import { ApiError } from "~/shared/api";
import { usePatchAuthUser } from "~/shared/api/private-generated";

export function useUserUpdate() {
  const { currentSession, setCurrentSession } = useSession();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      async onSuccess(res) {
        if (!currentSession) return;
        await setCurrentSession({
          ...currentSession,
          ...res.user,
        });
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
