import { useSession } from "~/entities/session";
import { ApiError } from "~/shared/api";
import { usePostAuthRegister } from "~/shared/api/public-generated";
import { ROUTER_PATHS } from "~/shared/constants";

export function useUserRegister() {
  const { setCurrentSession } = useSession();

  const { trigger, data, error, isMutating } = usePostAuthRegister<ApiError>({
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
