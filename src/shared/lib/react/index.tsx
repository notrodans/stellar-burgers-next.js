"use client";

import {
  Context,
  createContext,
  useContext,
  startTransition,
  useEffect,
  useState,
  ReactNode,
  Children,
  isValidElement,
  createElement,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { ApiError } from "../../api/generated";
import {
  Fn,
  MutationFn,
  MutationState,
  QueryState,
  UseMutationResult,
} from "./types";

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);
  if (value === null) throw new Error("Strict context not passed");
  return value as T;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

export function useAppearanceDelay(
  show?: boolean,
  options = {} as {
    defaultValue?: boolean;
    appearenceDelay?: number;
    minDisplay?: number;
  },
) {
  const {
    minDisplay = 500,
    defaultValue = false,
    appearenceDelay = 500,
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearenceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearenceDelay, show, minDisplay]);

  return delayedShow;
}

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children);
  const last = array.pop();

  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  );
}

// eslint-disable-next-line
export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  const ref = useRef<Fn<A, R>>(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref;
        return current(...args);
      },
    [],
  );
}

export function useForm<FormData>(inputValues: FormData) {
  const [values, setValues] = useState<FormData>(inputValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export function useMutation<TParams, TData, TError = ApiError>(
  mutationFn: MutationFn<TParams, TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
  },
): UseMutationResult<TParams, TData, TError> {
  const [state, setState] = useState<MutationState<TData, TError>>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
  });

  const mutate = useCallback(
    async (params: TParams) => {
      setState({
        data: null,
        error: null,
        isError: false,
        isLoading: true,
        isSuccess: false,
      });

      try {
        const data = await mutationFn(params);
        setState({
          data,
          error: null,
          isError: false,
          isLoading: false,
          isSuccess: true,
        });
        options?.onSuccess?.(data);
      } catch (error) {
        setState({
          data: null,
          error: error as TError,
          isError: true,
          isLoading: false,
          isSuccess: false,
        });
        options?.onError?.(error as TError);
      }
    },
    [mutationFn, options],
  );

  return [mutate, state];
}

export function useQuery<TData, TError = Error>(
  queryFn: () => Promise<TData>,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
  },
): QueryState<TData, TError> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<QueryState<TData, TError>>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
  });

  const fetchData = useCallback(async () => {
    setState({
      data: null,
      error: null,
      isError: false,
      isLoading: true,
      isSuccess: false,
    });

    try {
      const data = await queryFn();
      setState({
        data,
        error: null,
        isError: false,
        isLoading: false,
        isSuccess: true,
      });
      options?.onSuccess?.(data);
    } catch (error) {
      setState({
        data: null,
        error: error as TError,
        isError: true,
        isLoading: false,
        isSuccess: false,
      });
      options?.onError?.(error as TError);
    }
  }, [queryFn, options]);

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData();
    }
  }, [fetchData, options?.enabled]);

  return {
    ...state,
    refetch: fetchData,
  };
}
