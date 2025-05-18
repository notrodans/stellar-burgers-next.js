"use client";

import { create } from "zustand";
import { Session } from "./types";
import { createStoreContext } from "~/shared/lib/zustand";
import { destroySession, commitSessionFn } from "./session.storage.server";

export type SessionStore = {
  currentSession: Session | undefined;
  setCurrentSession: (
    session: Session | undefined,
    revalidateParams?: { path: string; type?: "layout" | "page" },
  ) => Promise<void>;
  removeSession: () => Promise<void>;
};

export const { useStore: useSession, Provider: SessionProvider } =
  createStoreContext(({ session }: { session: Session | undefined }) =>
    create<SessionStore>((set) => ({
      currentSession: session,
      setCurrentSession: async (session, revalidateParams) => {
        if (!session) {
          throw new Error("Session is undefined");
        }
        return await commitSessionFn(session, revalidateParams).then(() => {
          set({ currentSession: session });
        });
      },
      removeSession: async () => {
        return await destroySession().finally(() => {
          set({ currentSession: undefined });
        });
      },
    })),
  );
