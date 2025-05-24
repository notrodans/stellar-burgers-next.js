"use server";

import { CONSTANTS_MAP } from "~/shared/constants";
import { createCookieSessionStorage } from "~/shared/lib";

export type Session = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

const sessionStorage = await createCookieSessionStorage<Session | undefined>({
  name: CONSTANTS_MAP.shared.config.cookieSessionName,
  maxAge: 60 * 60 * 24 * 7,
  secure:
    process.env.NEXT_PUBLIC_URL.startsWith("https://") &&
    process.env.NODE_ENV === "production",
  secret: process.env.SESSION_SECRET,
});

const { getSession, commitSession, updateCurrentSession, destroySession } =
  sessionStorage;

export { commitSession, destroySession, getSession, updateCurrentSession };
