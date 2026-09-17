import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "STAFF";

export interface AuthUser {
  id: string;
  username?: string;
  email: string;
  fullName: string;
  role: UserRole;
  permissions?: Record<string, "none" | "view" | "edit">;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  requiresPasswordChange: boolean;
  tempToken: string | null;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  setAuth: (token: string, user: AuthUser) => void;
  setTempAuth: (tempToken: string, requiresPasswordChange: boolean) => void;
  clearTempToken: () => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      requiresPasswordChange: false,
      tempToken: null,
      hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
      setAuth: (token: string, user: AuthUser) => {
        // No marker cookie needed — backend sets HttpOnly access_token cookie
        set({
          token,
          user,
          isAuthenticated: true,
          requiresPasswordChange: false,
          tempToken: null,
        });
      },
      setTempAuth: (tempToken: string, requiresPasswordChange: boolean) => {
        set({ tempToken, requiresPasswordChange });
      },
      clearTempToken: () => {
        set({ tempToken: null, requiresPasswordChange: false });
      },
      setToken: (token: string) => {
        set({
          token,
          isAuthenticated: true,
        });
      },
      clearAuth: () => {
        // HttpOnly cookies are cleared by the backend /auth/logout endpoint
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "taleemone-auth-session",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
