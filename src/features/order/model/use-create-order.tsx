import { ApiError } from "~/shared/api";
import { usePostOrders } from "~/shared/api/private-generated";

export function useCreateOrder() {
  const { trigger, data, error, isMutating } = usePostOrders<ApiError>();

  return {
    trigger,
    data,
    error,
    isSuccess: data?.success,
    isLoading: isMutating,
  };
}
