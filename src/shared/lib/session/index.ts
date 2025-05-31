import { Payload } from "../jwt";
import {
  destroySessionAction,
  getSessionAction,
  updateSessionAction,
} from "./actions";
import { CreateSessionStorageConfig } from "./types";

function createCookieSessionStorageFactory<T>(
  config: CreateSessionStorageConfig,
) {
  let cachedSession: Payload<T> | undefined = undefined;
  const encodedSecret = new TextEncoder().encode(config.secret);

  const getSession = async (): Promise<Payload<T> | undefined> => {
    cachedSession = await getSessionAction<T>(config.name, encodedSecret);
    return cachedSession;
  };

  const commitSession = async (data: Payload<T>): Promise<void> => {
    cachedSession = await updateSessionAction(data, {
      ...config,
      secret: encodedSecret,
    });
  };

  const updateCurrentSession = async (data: Partial<T>): Promise<void> => {
    const session = cachedSession;
    if (!session) return;
    const newData = { ...session, ...data };
    cachedSession = await updateSessionAction(newData, {
      ...config,
      secret: encodedSecret,
    });
  };

  const destroySession = async (): Promise<void> => {
    await destroySessionAction(config.name);
  };

  return {
    getSession,
    commitSession,
    updateCurrentSession,
    destroySession,
  };
}

const createCookieSessionStorage = createCookieSessionStorageFactory;

export { createCookieSessionStorage };
