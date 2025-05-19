import { useSession } from "~/entities/session";
import { ApiError, usePatchAuthUser } from "~/shared/api/generated";

export function useUserUpdate() {
  const { currentSession, setCurrentSession } = useSession();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      onSuccess(res) {
        if (!currentSession) return;
        setCurrentSession({
          ...currentSession,
          ...res.user,
        });
      },
    },
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
