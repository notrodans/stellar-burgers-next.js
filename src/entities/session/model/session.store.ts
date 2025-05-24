"use client";

import { create } from "zustand";
import { createStoreContext } from "~/shared/lib/zustand";
import {
  commitSession,
  destroySession,
  Session,
  updateCurrentSession,
} from "~/shared/model";

export type SessionPartial = Partial<Session>;

export type SessionStore = {
  currentSession?: Session;
  setCurrentSession: (session: Session) => Promise<void>;
  updateSession: (session: SessionPartial) => Promise<void>;
  removeSession: () => Promise<void>;
};

export const { useStore: useSession, Provider: SessionProvider } =
  createStoreContext(({ session }: { session: Session | undefined }) =>
    create<SessionStore>((set, get) => ({
      currentSession: session,
      setCurrentSession: async (session) => {
        commitSession(session).then(() => {
          set({ currentSession: session });
        });
      },
      updateSession: async (session) => {
        const currentSession = get().currentSession;
        if (!currentSession) return;
        updateCurrentSession(session).then(() => {
          set({
            currentSession: {
              ...currentSession,
              ...session,
            },
          });
        });
      },
      removeSession: async () => {
        return destroySession().finally(() => {
          set({ currentSession: undefined });
        });
      },
    })),
  );
