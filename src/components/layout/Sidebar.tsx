"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { SIDEBAR_ITEMS, canAccess } from "@/lib/utils/permissions";
import {
  LayoutDashboard, ClipboardList, Target, Award,
  PenLine, Users, TrendingUp, BarChart2, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, ClipboardList, Target, Award,
  PenLine, Users, TrendingUp, BarChart2,
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  th: "Talento Humano",
  lider: "Líder",
  evaluado: "Evaluado",
};

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-500",
  th: "bg-blue-500",
  lider: "bg-amber-500",
  evaluado: "bg-green-500",
};

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, activeRole } = useAuthStore();

  const visibleItems = SIDEBAR_ITEMS.filter(
    (item) => canAccess(item.permission, activeRole)
  );

  return (
    <aside className="flex h-screen w-60 flex-col bg-sidebar text-sidebar-foreground fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-white tracking-wide">INMOV</p>
          <p className="text-xs text-sidebar-foreground/60">Evaluación Desempeño</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {visibleItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-white"
              )}
            >
              {Icon && <Icon className="h-4.5 w-4.5 shrink-0" />}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      {currentUser && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.nombre}
              className="h-9 w-9 rounded-full bg-sidebar-accent"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{currentUser.nombre}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{currentUser.cargo}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={cn("h-2 w-2 rounded-full", activeRole ? ROLE_COLORS[activeRole] : "bg-gray-400")} />
                <span className="text-xs text-sidebar-foreground/60">
                  {activeRole ? ROLE_LABELS[activeRole] : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
