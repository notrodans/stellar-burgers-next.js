"use server";

import { CONSTANTS_MAP } from "~/shared/constants";
import { createCookieSessionStorage } from "~/shared/lib";
import { Session } from "./types";

const sessionStorage = await createCookieSessionStorage<Session | undefined>({
  name: CONSTANTS_MAP.shared.config.cookieSessionName,
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  secure:
    process.env.NEXT_PUBLIC_URL.startsWith("https://") &&
    process.env.NODE_ENV === "production",
  secret: process.env.SESSION_SECRET,
});

const { getSession, commitSession, destroySession } = sessionStorage;

export { commitSession, destroySession, getSession };
