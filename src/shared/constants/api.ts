export const API_ENTRYPOINTS = {
  GET_INGREDIENTS: "ingredients",
  GET_USER: "auth/user",
  PATCH_USER: "auth/user",
  POST_LOGIN: "auth/login",
  POST_REGISTER: "auth/register",
  POST_TOKEN_REFRESH: "auth/token",
  POST_LOGOUT: "auth/logout",
  POST_FORGOT_PASSWORD: "password-reset",
  POST_RESET_PASSWORD: "password-reset/reset",
  POST_ORDER: "orders",
  GET_STREAMING_ORDERS: "orders/all",
  GET_STREAMING_USER_ORDERS: "orders",
};

export const API_MESSAGES = {
  TOKEN_ERROR: "jwt expired",
};
