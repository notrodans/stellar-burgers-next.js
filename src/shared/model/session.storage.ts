"use server";

import { CONSTANTS_MAP } from "~/shared/constants";
import { createCookieSessionStorage } from "~/shared/lib";

export type Session = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

const isSecured =
  process.env.NEXT_PUBLIC_URL.startsWith("https://") &&
  process.env.NODE_ENV === "production";

function getSessioName(name: string, isSecured: boolean) {
  return isSecured ? `__Secure-${name}` : name;
}

const sessionStorage = await createCookieSessionStorage<Session>({
  name: getSessioName(CONSTANTS_MAP.shared.config.cookieSessionName, isSecured),
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: isSecured,
  secret: process.env.SESSION_SECRET,
});

const { getSession, commitSession, updateCurrentSession, destroySession } =
  sessionStorage;

export { commitSession, destroySession, getSession, updateCurrentSession };
