import useSWRSubscription from "swr/subscription";

export function useGetStreamingOrders() {
  const { data, error } = useSWRSubscription(
    "wss://norma.nomoreparties.space/orders/all",
    (key, { next }) => {
      const socket = new WebSocket(key);
      socket.addEventListener("message", (event) =>
        next(null, JSON.parse(event.data)),
      );
      socket.addEventListener("error", (event) => next(event.error));
      return () => socket.close();
    },
  );

  return { data, isLoading: !data && !error, isSuccess: data && !error, error };
}
