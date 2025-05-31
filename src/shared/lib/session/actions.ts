"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt, Payload, SecretKey } from "../jwt";
import { CookieConfig } from "./types";

async function setCookie(
  name: string,
  value: string,
  config?: Omit<CookieConfig, "name">,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    ...config,
  });
}

async function getSessionAction<T>(
  name: string,
  secret: SecretKey,
): Promise<Payload<T> | undefined> {
  const cookiesStore = await cookies();
  const session = cookiesStore.get(name)?.value;
  return await decrypt<T>(session, secret);
}

async function updateSessionAction<T>(
  data: T,
  config: CookieConfig & { maxAge: number },
): Promise<Payload<T> | undefined> {
  const cookiesStore = await cookies();
  const session = cookiesStore.get(config.name)?.value;
  const secret = config.secret;
  const payload = await decrypt<T>(session, secret);

  const newSessionData = { ...payload, ...data };

  const newSession = await encrypt<T>(newSessionData, {
    secret: config.secret,
    maxAge: config.maxAge,
  });

  await setCookie(config.name, newSession, {
    ...config,
  });

  return newSessionData;
}

async function destroySessionAction(name: string): Promise<void> {
  const cookiesStore = await cookies();
  cookiesStore.delete(name);
}

export { destroySessionAction, getSessionAction, updateSessionAction };
