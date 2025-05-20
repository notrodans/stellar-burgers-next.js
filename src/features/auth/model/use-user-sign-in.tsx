import { useSession } from "~/entities/session";
import { ApiError } from "~/shared/api";
import { usePostAuthLogin } from "~/shared/api/public-generated";
import { ROUTER_PATHS } from "~/shared/constants";

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
