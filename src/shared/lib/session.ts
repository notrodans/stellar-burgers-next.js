"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { decrypt, encrypt, type Payload, type SecretKey } from "./jwt";

type CookieConfig = Omit<ResponseCookie, "value"> & {
  secret: SecretKey;
};

type CreateSessionStorageConfig = CookieConfig & {
  maxAge: number;
  secret: string;
};

export async function setCookie(
  name: string,
  value: string,
  config?: Omit<CookieConfig, "name">,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    ...config,
  });
}

export async function createSession<T extends object = object>(
  data: Payload<T>,
  config: CookieConfig,
): Promise<void> {
  const session = await encrypt<T>({ ...data }, config.secret);
  await setCookie(config.name, session, config);
}

export async function updateSession<T extends object = object>(
  data: Payload<T>,
  config: CookieConfig & { maxAge: number },
): Promise<void | undefined> {
  const cookiesStore = await cookies();
  const session = cookiesStore.get(config.name)?.value;
  const payload = await decrypt<T>(session, config.secret);

  const newSession = await encrypt<T>({ ...payload, ...data }, config.secret);

  await setCookie(config.name, newSession, {
    ...config,
  });
}

async function createCookieStorageFactory<T>(
  config: CreateSessionStorageConfig,
) {
  const sessionName = config.name;
  const encodedSecret = new TextEncoder().encode(config.secret);

  const getSession = async (): Promise<T | undefined> => {
    const cookiesStore = await cookies();
    const session = cookiesStore.get(sessionName);
    return session
      ? ((await decrypt(session.value, encodedSecret)) as T)
      : undefined;
  };

  const commitSession = async (data: Payload<T>): Promise<void> => {
    await updateSession(data, {
      ...config,
      secret: encodedSecret,
    });
  };

  const destroySession = async (): Promise<void> => {
    const cookiesStore = await cookies();
    cookiesStore.delete(sessionName);
  };

  return {
    getSession,
    commitSession,
    destroySession,
  };
}

const createCookieSessionStorage = createCookieStorageFactory;

export { createCookieSessionStorage };
