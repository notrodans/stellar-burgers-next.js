import { useSession } from "~/entities/session";
import { ApiError, useGetOrders } from "~/shared/api/generated";

export function useGetStreamingOrdersProfile() {
  const { currentSession } = useSession();
  const { data, isLoading, error } = useGetOrders<ApiError>({
    request: {
      headers: {
        Authorization: currentSession?.accessToken,
      },
    },
  });

  return { data, isLoading, isSuccess: data?.success, error };
}
