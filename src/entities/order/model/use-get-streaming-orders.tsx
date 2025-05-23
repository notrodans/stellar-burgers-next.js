"use client";

import useSWRSubscription from "swr/subscription";
import { ApiError } from "~/shared/api";
import { CONSTANTS_MAP } from "~/shared/constants";
import { OrderList } from "./types";

const socketUrl = CONSTANTS_MAP.shared.config.websocketUrl + "/orders/all";
export function useGetStreamingOrders() {
  const { data, error } = useSWRSubscription<OrderList, ApiError, string>(
    socketUrl,
    (key, { next }) => {
      const socket = new WebSocket(key);
      socket.addEventListener("message", (event) =>
        next(null, JSON.parse(event.data)),
      );
      // @ts-expect-error ts(2349)
      socket.addEventListener("error", (event) => next(event.error));
      return () => socket.close();
    },
  );

  return { data, isLoading: !data && !error, isSuccess: data && !error, error };
}
