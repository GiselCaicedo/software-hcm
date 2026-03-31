"use client";
import { useState } from "react";
import { USERS } from "@/lib/mock-data/users";
import type { User } from "@/types";
import { cn } from "@/lib/utils";

const NIVEL_BADGE: Record<string, string> = {
  operativo: "bg-blue-100 text-blue-700",
  tactico: "bg-purple-100 text-purple-700",
  estrategico: "bg-amber-100 text-amber-700",
};

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };
  return (
    <div
      className={cn(
        "rounded-full bg-[#1C1C1E] text-white flex items-center justify-center font-semibold flex-shrink-0",
        sizes[size]
      )}
    >
      {initials}
    </div>
  );
}

function UserNode({ user, onSelect, selected }: { user: User; onSelect: (u: User) => void; selected: boolean }) {
  const children = USERS.filter((u) => u.liderDirectoId === user.id);
  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <button
        onClick={() => onSelect(user)}
        className={cn(
          "flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all hover:shadow-md min-w-[140px] max-w-[160px]",
          selected ? "border-[#1C1C1E] bg-[#1C1C1E] text-white" : "border-gray-200 bg-white hover:border-gray-300"
        )}
      >
        <Avatar name={user.name} />
        <span className={cn("text-xs font-semibold text-center leading-tight", selected ? "text-white" : "text-[#1C1C1E]")}>
          {user.name.split(" ").slice(0, 2).join(" ")}
        </span>
        <span className={cn("text-[10px] text-center leading-tight", selected ? "text-white/70" : "text-gray-500")}>
          {user.cargo}
        </span>
        <span
          className={cn(
            "text-[9px] px-2 py-0.5 rounded-full font-medium capitalize",
            selected ? "bg-white/20 text-white" : NIVEL_BADGE[user.nivel]
          )}
        >
          {user.nivel}
        </span>
      </button>

      {/* Children */}
      {children.length > 0 && (
        <div className="relative flex flex-col items-center">
          {/* Vertical line from node */}
          <div className="w-px h-6 bg-gray-300" />
          {/* Horizontal line across children */}
          <div className="relative flex gap-6 items-start">
            {children.length > 1 && (
              <div
                className="absolute top-0 left-[50%] h-px bg-gray-300"
                style={{ width: `calc(100% - ${100 / children.length}%)`, transform: "translateX(-50%)" }}
              />
            )}
            {children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-gray-300" />
                <UserNode user={child} onSelect={onSelect} selected={selected && false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PanelUsuario({ user, onClose }: { user: User; onClose: () => void }) {
  const lider = user.liderDirectoId ? USERS.find((u) => u.id === user.liderDirectoId) : null;
  const reportes = USERS.filter((u) => u.liderDirectoId === user.id);

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-[#1C1C1E]">Perfil</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Avatar name={user.name} size="lg" />
          <div className="text-center">
            <p className="font-semibold text-[#1C1C1E]">{user.name}</p>
            <p className="text-sm text-gray-500">{user.cargo}</p>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize", NIVEL_BADGE[user.nivel])}>
              {user.nivel}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Área</p>
            <p className="text-[#1C1C1E]">{user.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Sede</p>
            <p className="text-[#1C1C1E]">{user.sede}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Banda salarial</p>
            <p className="text-[#1C1C1E]">{user.bandaSalarial}</p>
          </div>
          {lider && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Reporta a</p>
              <div className="flex items-center gap-2">
                <Avatar name={lider.name} size="sm" />
                <div>
                  <p className="text-[#1C1C1E] font-medium text-xs">{lider.name}</p>
                  <p className="text-gray-500 text-[11px]">{lider.cargo}</p>
                </div>
              </div>
            </div>
          )}
          {reportes.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Equipo directo ({reportes.length})</p>
              <div className="space-y-2">
                {reportes.map((r) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <Avatar name={r.name} size="sm" />
                    <div>
                      <p className="text-[#1C1C1E] font-medium text-xs">{r.name}</p>
                      <p className="text-gray-500 text-[11px]">{r.cargo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrganigramaPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const roots = USERS.filter((u) => u.liderDirectoId === null);

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1C1C1E]">Organigrama</h1>
          <p className="text-gray-500 text-sm mt-1">
            Estructura jerárquica de la organización · {USERS.length} personas
          </p>
        </div>

        <div className="flex justify-center">
          {roots.map((root) => (
            <UserNode
              key={root.id}
              user={root}
              onSelect={(u) => setSelectedUser(u)}
              selected={selectedUser?.id === root.id}
            />
          ))}
        </div>
      </div>

      {selectedUser && (
        <PanelUsuario user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
