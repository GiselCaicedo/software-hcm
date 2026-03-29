"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid, ClipboardList, Target, Award, BarChart2, FileText,
  LogOut, Settings, Sun, Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard",    icon: LayoutGrid,   label: "Dashboard"    },
  { href: "/evaluaciones", icon: ClipboardList, label: "Evaluaciones" },
  { href: "/objetivos",    icon: Target,        label: "Objetivos"    },
  { href: "/competencias", icon: Award,         label: "Competencias" },
  { href: "/analytics",    icon: BarChart2,     label: "Analytics"    },
  { href: "/formulario",   icon: FileText,      label: "Formulario"   },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout   = useAuthStore((s) => s.logout);
  const router   = useRouter();
  const [dark, setDark] = useState(false);

  return (
    <aside className="fixed left-3 top-1/2 -translate-y-1/2 h-auto w-12 bg-[#1C1C1E] flex flex-col items-center py-4 z-50 rounded-[22px] shadow-2xl">
      {/* Logo */}
      <div className="mb-4 w-8 h-8 flex items-center justify-center flex-shrink-0">
        <Image src="/logo-sidebar.png" alt="INMOV" width={20} height={20} className="object-contain" />
      </div>

      {/* Nav principal */}
      <nav className="flex flex-col items-center gap-0.5 w-full px-1.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "w-full flex items-center justify-center h-9 rounded-[14px] transition-all duration-200",
                active
                  ? "bg-white text-[#1C1C1E]"
                  : "text-[#6B6B6B] hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="w-4 h-4" strokeWidth={active ? 2.2 : 1.8} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom: separador + configuración + tema + logout */}
      <div className="flex flex-col items-center px-1.5 w-full gap-0.5 mt-2">
        <div className="w-6 h-px bg-white/10 mb-1" />

        {/* Configuración */}
        <Link
          href="/configuracion"
          title="Configuración"
          className={cn(
            "w-full flex items-center justify-center h-9 rounded-[14px] transition-all duration-200",
            pathname.startsWith("/configuracion")
              ? "bg-white text-[#1C1C1E]"
              : "text-[#6B6B6B] hover:text-white hover:bg-white/10"
          )}
        >
          <Settings className="w-4 h-4" strokeWidth={1.8} />
        </Link>

        {/* Toggle tema */}
        <button
          title={dark ? "Modo claro" : "Modo oscuro"}
          onClick={() => setDark((d) => !d)}
          className="w-full flex items-center justify-center h-9 rounded-[14px] text-[#6B6B6B] hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          {dark
            ? <Sun  className="w-4 h-4" strokeWidth={1.8} />
            : <Moon className="w-4 h-4" strokeWidth={1.8} />}
        </button>

        {/* Logout */}
        <button
          onClick={() => { logout(); router.push("/login"); }}
          title="Cerrar sesión"
          className="w-full flex items-center justify-center h-9 rounded-[14px] text-[#6B6B6B] hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
    </aside>
  );
}
