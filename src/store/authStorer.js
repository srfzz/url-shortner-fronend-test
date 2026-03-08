import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Action to log in
      login: (userData, userToken) => {
        set({
          user: userData,
          token: userToken,
          isAuthenticated: true,
        });
      },

      // Action to log out
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        // Clear storage manually if needed, though persist handles it
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
