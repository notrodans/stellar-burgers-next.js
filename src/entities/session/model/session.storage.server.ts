"use server";

import { createCookieSessionStorage } from "~/shared/lib/session";
import { Session } from "./types";
import { revalidatePath } from "next/cache";

const sessionStorage = await createCookieSessionStorage<Session>({
  name: "__session",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  secure: process.env.NODE_ENV === "production",
  secret: process.env.SESSION_SECRET as string,
});

const { getSession, commitSession, destroySession } = sessionStorage;

async function commitSessionFn(
  session: Session,
  revalidateParams?: { path: string; type?: "layout" | "page" },
) {
  return commitSession(session).then(() => {
    if (!revalidateParams) {
      return;
    }

    revalidatePath(revalidateParams.path, revalidateParams.type);
  });
}

export { getSession, commitSessionFn, destroySession };
