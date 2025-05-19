import { useSession } from "~/entities/session";
import { ApiError, usePatchAuthUser } from "~/shared/api/generated";

export function useUserUpdate() {
  const { setCurrentSession } = useSession();

  const { trigger, data, error, isMutating } = usePatchAuthUser<ApiError>({
    swr: {
      onSuccess(res) {
        setCurrentSession({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
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
