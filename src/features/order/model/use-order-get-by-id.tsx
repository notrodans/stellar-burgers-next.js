import { useGetOrdersId } from "~/shared/api/generated";

export function useOrderGetById(id: string) {
  const { data, error, isLoading } = useGetOrdersId(id);

  return { data: data?.orders[0], error, isLoading, isSuccess: data?.success };
}
