import { ApiError } from "~/shared/api";
import { useGetOrdersId } from "~/shared/api/public-generated";

export function useGetOrderById(id: string) {
  const { data, error, isLoading } = useGetOrdersId<ApiError>(id);

  return { data: data?.orders[0], error, isLoading, isSuccess: data?.success };
}
