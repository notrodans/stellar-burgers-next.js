import { ApiError } from "~/shared/api";
import { useGetOrders } from "~/shared/api/private-generated";

export function useGetOrdersProfile() {
  const { data, isLoading, error } = useGetOrders<ApiError>();

  return { data, isLoading, isSuccess: data?.success, error };
}
