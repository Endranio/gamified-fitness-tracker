import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { UserLogin } from "@/dto/dto";

type useAuthStore = {
  user: UserLogin;
  setUser: (payload: UserLogin) => void;
  logout: () => void;
};

export const useAuthStore = create<useAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: {} as UserLogin,
        setUser: (payload: UserLogin) =>
          set((state) => ({ user: { ...state.user, ...payload } })),
        logout: () => set(() => ({ user: {} as UserLogin })),
      }),
      {
        name: "token",
        partialize: (state) => ({ user: state.user }),
      },
    ),
  ),
);