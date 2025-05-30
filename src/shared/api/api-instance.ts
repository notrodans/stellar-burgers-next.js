import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { decode, isClient } from "../lib";
import { getSession, updateCurrentSession } from "../model";
import { postAuthToken } from "./public-generated";

const baseURL = isClient() ? "/api" : process.env.BASE_API_URL + "/api";
let refreshPromise: Promise<void> | null = null;

export const publicApiInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApiInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApiInstance.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (!session) return request;

  const { accessToken, refreshToken } = session;
  request.headers.set("Authorization", accessToken, true);

  const decodedAccessToken = decode(accessToken);
  const tokenExpiresAt = decodedAccessToken.exp!;
  const isExpired = Date.now() / 1000 > tokenExpiresAt - 10;

  if (!isExpired) return request;

  if (!refreshPromise) {
    refreshPromise = postAuthToken({ token: refreshToken })
      .then(async (res) => {
        const { accessToken, refreshToken } = res;
        await updateCurrentSession({
          accessToken,
          refreshToken,
        });
        request.headers.set("Authorization", accessToken, true);
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  await refreshPromise;

  return request;
});

export const createInstancePublic = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return publicApiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export const createInstancePrivate = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return privateApiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
