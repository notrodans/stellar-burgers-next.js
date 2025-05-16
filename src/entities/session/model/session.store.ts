"use client";

import { create } from "zustand";
import { Session } from "./types";
import { createStoreContext } from "~/shared/lib/zustand";
import { commitSession, destroySession } from "./session.storage.server";

export type SessionStore = {
  currentSession: Session | undefined;
  setCurrentSession: (session: Session | undefined) => Promise<void>;
  removeSession: () => Promise<void>;
};

export const { useStore: useSession, Provider: SessionProvider } =
  createStoreContext(({ session }: { session: Session | undefined }) =>
    create<SessionStore>((set) => ({
      currentSession: session,
      setCurrentSession: async (session) => {
        if (!session) {
          throw new Error("Session is undefined");
        }
        return await commitSession(session).finally(() => {
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
