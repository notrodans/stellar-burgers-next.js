"use client";

import { isEqual } from "lodash-es";
import { useEffect, useRef, useState } from "react";

type WebSocketIdleState = {
  status: "idle";
  data: null;
  error: null;
};

type WebSocketConnectingState = {
  status: "connecting";
  data: null;
  error: null;
};

type WebSocketConnectedState<T> = {
  status: "connected";
  data: T | null;
  error: null;
};

type WebSocketErrorState = {
  status: "error";
  data: null;
  error: Error;
};

type WebSocketClosedState = {
  status: "closed";
  data: null;
  error: null;
};

export type WebSocketState<T> =
  | WebSocketIdleState
  | WebSocketConnectingState
  | WebSocketConnectedState<T>
  | WebSocketErrorState
  | WebSocketClosedState;

export type WebSocketOptions<T> = {
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: Event) => void;
  onMessage?: (data: T) => void;
};

export function useWebSocket<T>(
  url: string,
  options?: WebSocketOptions<T>,
): WebSocketState<T> {
  const [state, setState] = useState<WebSocketState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setState({ status: "connecting", data: null, error: null });

    const ws = new WebSocket(url);
    wsRef.current = ws;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as T;
        setState((prev) => {
          if (prev.status === "connected" && isEqual(prev.data, data)) {
            return prev;
          }
          return { status: "connected", data, error: null };
        });
        options?.onMessage?.(data);
      } catch (err) {
        setState({
          status: "error",
          data: null,
          error:
            err instanceof Error ? err : new Error("Failed to parse message"),
        });
      }
    };

    const handleOpen = () => {
      setState({ status: "connected", data: null, error: null });
      options?.onOpen?.();
    };

    const handleError = (event: Event) => {
      setState({
        status: "error",
        data: null,
        error: new Error("WebSocket error"),
      });
      options?.onError?.(event);
    };

    const handleClose = (event: CloseEvent) => {
      setState({ status: "closed", data: null, error: null });
      options?.onClose?.(event);
    };

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("open", handleOpen);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("error", handleError);
      ws.removeEventListener("close", handleClose);
      ws.close();
    };
  }, [url, options]);

  return state;
}
