"use client";

import { create } from "zustand";
import { User } from "./types";
import { createStoreContext } from "~/shared/lib/zustand";

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | undefined) => void;
};

export const { useStore: useUser, Provider: UserProvider } = createStoreContext(
  ({ user }: { user: User | null }) =>
    create<UserStore>((set) => ({
      currentUser: user,
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },
    })),
);
