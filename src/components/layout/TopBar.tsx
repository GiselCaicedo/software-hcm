"use client";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Role } from "@/types";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, BriefcaseBusiness, ChevronDown, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  th: "Talento Humano",
  lider: "Líder",
  evaluado: "Evaluado",
};

const ROLE_COLORS: Record<Role, string> = {
  admin: "bg-purple-100 text-purple-800",
  th: "bg-blue-100 text-blue-800",
  lider: "bg-amber-100 text-amber-800",
  evaluado: "bg-green-100 text-green-800",
};

export function TopBar({ title }: { title?: string }) {
  const { currentUser, activeRole, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!currentUser) return null;

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {title && <h1 className="text-sm font-semibold text-gray-700">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4.5 w-4.5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
          <BriefcaseBusiness className="h-3.5 w-3.5 text-gray-400" />
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Cargo</p>
            <p className="text-sm font-medium text-gray-700">{currentUser.cargo}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 text-gray-400" />
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Perfil activo</p>
            <Badge className={`border-0 ${activeRole ? ROLE_COLORS[activeRole] : "bg-gray-100 text-gray-600"}`}>
              {activeRole ? ROLE_LABELS[activeRole] : "—"}
            </Badge>
          </div>
        </div>

        {/* Avatar + logout */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="gap-2 h-8 pl-1" />}>
              <img
                src={currentUser.avatar}
                alt={currentUser.nombre}
                className="h-7 w-7 rounded-full bg-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {currentUser.nombre.split(" ")[0]}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{currentUser.nombre}</p>
              <p className="text-xs text-gray-400 font-normal">{currentUser.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
