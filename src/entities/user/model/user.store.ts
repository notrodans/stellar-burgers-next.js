import { create } from "zustand";
import { User } from "./types";

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | undefined) => void;
};

export const useUser = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
}));
