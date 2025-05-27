import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SecretKey } from "../jwt";

export type CreateSessionStorageConfig = CookieConfig & {
  maxAge: number;
  secret: string;
};

export type CookieConfig = Omit<ResponseCookie, "value" | "maxAge"> & {
  maxAge: number;
  secret: SecretKey;
};
