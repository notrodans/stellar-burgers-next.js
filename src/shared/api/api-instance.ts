import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { isClient } from "../lib/next";

export const publicApiInstance = axios.create({
  baseURL: isClient() ? "/api" : process.env.BASE_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApiInstance = axios.create({
  baseURL: isClient() ? "/api" : process.env.BASE_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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
