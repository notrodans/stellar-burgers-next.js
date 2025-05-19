import { useSession } from "~/entities/session";
import { ApiError, usePostAuthLogin } from "~/shared/api/generated";

export function useUserSignIn() {
  const { setCurrentSession } = useSession();

  const { trigger, data, error, isMutating } = usePostAuthLogin<ApiError>({
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
