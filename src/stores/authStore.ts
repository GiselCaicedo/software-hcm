"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Sindy Caicedo",
    email: "admin@inmov.com",
    role: "admin",
    cargo: "HR Manager",
    cargoId: "cargo-hr-manager",
    departamento: "Recursos Humanos",
    area: "Talento Humano",
    sede: "Bogotá",
    nivel: "estrategico",
    bandaSalarial: "B1",
    liderDirectoId: null,
    diasEnEmpresa: 697,
  },
  {
    id: "2",
    name: "Kevin Nunez",
    email: "lider@inmov.com",
    role: "lider",
    cargo: "Mobile UI Designer",
    cargoId: "cargo-ui-designer",
    departamento: "Tecnología",
    area: "Diseño y Producto",
    sede: "Medellín",
    nivel: "tactico",
    bandaSalarial: "B2",
    liderDirectoId: "1",
    diasEnEmpresa: 697,
  },
  {
    id: "3",
    name: "Emily Luna",
    email: "user@inmov.com",
    role: "colaborador",
    cargo: "Product Designer",
    cargoId: "cargo-product-designer",
    departamento: "Diseño",
    area: "Diseño y Producto",
    sede: "Cali",
    nivel: "operativo",
    bandaSalarial: "B2",
    liderDirectoId: "2",
    diasEnEmpresa: 365,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const found = MOCK_USERS.find((u) => u.email === email);
        if (found && password.length >= 4) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) => {
        const current = get().user;
        if (current) set({ user: { ...current, role } });
      },
    }),
    { name: "inmov-auth" }
  )
);
