// eslint-disable-next-line
export type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

type SuccessState<TData> = {
  data: TData;
  error: null;
  isError: false;
  isLoading: boolean;
  isSuccess: true;
};

type ErrorState<TError> = {
  data: null;
  error: TError;
  isError: true;
  isLoading: boolean;
  isSuccess: false;
};

type LoadingState = {
  data: null;
  error: null;
  isError: false;
  isLoading: true;
  isSuccess: false;
};

type IdleState = {
  data: null;
  error: null;
  isError: false;
  isLoading: false;
  isSuccess: false;
};

export type MutationState<TData, TError> =
  | SuccessState<TData>
  | ErrorState<TError>
  | LoadingState
  | IdleState;

export type MutationFn<TParams, TData> = (params: TParams) => Promise<TData>;

export type UseMutationResult<TParams, TData, TError> = [
  (params: TParams) => Promise<void>,
  MutationState<TData, TError>,
];

type SuccessQueryState<TData> = {
  data: TData;
  error: null;
  isError: false;
  isLoading: false;
  isSuccess: true;
};

type ErrorQueryState<TError> = {
  data: null;
  error: TError;
  isError: true;
  isLoading: false;
  isSuccess: false;
};

type LoadingQueryState = {
  data: null;
  error: null;
  isError: false;
  isLoading: true;
  isSuccess: false;
};

type IdleQueryState = {
  data: null;
  error: null;
  isError: false;
  isLoading: false;
  isSuccess: false;
};

export type QueryState<TData, TError> =
  | SuccessQueryState<TData>
  | ErrorQueryState<TError>
  | LoadingQueryState
  | IdleQueryState;
