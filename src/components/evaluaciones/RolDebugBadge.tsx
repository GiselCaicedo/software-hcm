"use client";
import { useRolActual } from "@/hooks/useRolActual";
import type { UserRole } from "@/types";

const ROLES: { value: UserRole; label: string }[] = [
  { value: "admin",       label: "Admin" },
  { value: "lider",       label: "Líder" },
  { value: "colaborador", label: "Colaborador" },
];

/** Badge flotante solo en desarrollo para cambiar de rol sin re-login */
export function RolDebugBadge() {
  const { rol, setRolDebug } = useRolActual();
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[300] flex items-center gap-1.5 bg-[#1C1C1E]/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-2xl border border-white/10">
      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider mr-1">rol</span>
      {ROLES.map((r) => (
        <button
          key={r.value}
          onClick={() => setRolDebug(r.value)}
          className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
            rol === r.value
              ? "bg-white text-[#1C1C1E]"
              : "text-white/50 hover:text-white hover:bg-white/10"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
