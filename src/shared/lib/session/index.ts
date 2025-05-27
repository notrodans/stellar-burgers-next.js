import { Payload } from "../jwt";
import {
  destroySession as destroySessionFn,
  getSession as getSessionFn,
  updateSession as updateSessionFn,
} from "./actions";
import { CreateSessionStorageConfig } from "./types";

function createCookieSessionStorageFactory<T>(
  config: CreateSessionStorageConfig,
) {
  const encodedSecret = new TextEncoder().encode(config.secret);

  const getSession = async (): Promise<Payload<T> | undefined> => {
    return getSessionFn<T>(config.name, encodedSecret);
  };

  const commitSession = async (data: Payload<T>): Promise<void> => {
    await updateSessionFn(data, {
      ...config,
      secret: encodedSecret,
    });
  };

  const updateCurrentSession = async (
    data: Partial<Payload<T>>,
  ): Promise<void> => {
    const session = await getSession();
    if (!session) return;
    const newData = { ...session, ...data };
    await updateSessionFn(newData, {
      ...config,
      secret: encodedSecret,
    });
  };

  const destroySession = async (): Promise<void> => {
    destroySessionFn(config.name);
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
