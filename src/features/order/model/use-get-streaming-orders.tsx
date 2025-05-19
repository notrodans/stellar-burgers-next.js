import { API_ENTRYPOINTS, CONSTANTS_MAP } from "~/shared/constants";
import { OrderList } from "./types";
import { useWebSocket } from "~/shared/lib";

export function useGetStreamingOrders() {
  const socket = useWebSocket<OrderList>(
    CONSTANTS_MAP.shared.config.wsUrl + API_ENTRYPOINTS.GET_STREAMING_ORDERS,
  );

  return { ...socket };
}
