"use server";

import { createCookieSessionStorage } from "~/shared/lib";
import { Session } from "./types";

const sessionStorage = await createCookieSessionStorage<Session | undefined>({
  name: "__session",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  secure: process.env.NODE_ENV === "production",
  secret: process.env.SESSION_SECRET as string,
});

const { getSession, commitSession, destroySession } = sessionStorage;

export { commitSession, destroySession, getSession };
