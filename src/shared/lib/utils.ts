import { ApiError } from "../api/generated";
import { CONSTANTS_MAP } from "../constants";

export const getApiError = (error: ApiError) => {
  const { defaultError } = CONSTANTS_MAP.shared.config;
  return error?.message || defaultError;
};
