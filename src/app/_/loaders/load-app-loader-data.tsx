import { getSession, Session } from "~/shared/model";

export const loadAppLoaderData = async (): Promise<Session | undefined> => {
  try {
    const session = await getSession();
    return session;
  } catch {
    return undefined;
  }
};
