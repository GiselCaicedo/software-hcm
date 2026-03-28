"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Role } from "@/types";
import { MOCK_USERS } from "@/lib/mock-data/users";

interface AuthState {
  currentUser: User | null;
  activeRole: Role | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const getDefaultRole = (user: User): Role => user.roles[0] ?? "evaluado";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      activeRole: null,
      isAuthenticated: false,
      login: (userId) => {
        const user = MOCK_USERS.find((u) => u.id === userId);
        if (user) {
          set({
            currentUser: user,
            activeRole: getDefaultRole(user),
            isAuthenticated: true,
          });
        }
      },
      logout: () => set({ currentUser: null, activeRole: null, isAuthenticated: false }),
    }),
    { name: "inmov-auth" }
  )
);
