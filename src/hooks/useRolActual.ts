"use client";
import { useAuthStore } from "@/stores/authStore";
import type { UserRole } from "@/types";

// En producción este hook simplemente lee el rol del usuario autenticado.
// En desarrollo expone setRolDebug() para cambiar el rol sin re-login.
export function useRolActual() {
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);

  const rol: UserRole = user?.role ?? "colaborador";

  // Helpers de visibilidad ─────────────────────────────────────────────
  const esAdmin       = rol === "admin";
  const esLider       = rol === "lider" || rol === "admin";
  const esColaborador = rol === "colaborador";
  const esPar         = false; // el par accede por ruta /evaluaciones/[id]/par, no por login

  // En evaluaciones, el par es un caso especial:
  // la ruta /par expone su vista directamente sin cambio de rol.

  return {
    rol,
    esAdmin,
    esLider,
    esColaborador,
    esPar,
    // Para cambiar rol en desarrollo sin re-login:
    setRolDebug: setRole,
  };
}
