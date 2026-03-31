"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Brain, Network,
  Settings2, ClipboardCheck, Target, TrendingUp, BarChart3, GitCompare,
  Moon, Sun, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

// Capa 0 — Siempre visible
const LAYER_0 = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];

// Capa 1 — Maestros (Admin / TH)
// Nota: Los ciclos de evaluación viven dentro de /evaluaciones (Nivel 2),
// no como ítem separado en el sidebar.
const LAYER_1 = [
  { href: "/cargos",        icon: Briefcase,  label: "Perfiles de cargo" },
  { href: "/organigrama",   icon: Network,    label: "Organigrama"       },
  { href: "/competencias",  icon: Brain,      label: "Competencias"      },
  { href: "/configuracion", icon: Settings2,  label: "Configuración"     },
];

// Capa 2 — Ejecución
const LAYER_2 = [
  { href: "/evaluaciones", icon: ClipboardCheck, label: "Evaluaciones" },
  { href: "/objetivos",    icon: Target,         label: "Objetivos"    },
  { href: "/pdi",          icon: TrendingUp,     label: "Plan de Desarrollo Individual" },
];

// Capa 3 — Análisis
const LAYER_3 = [
  { href: "/analytics", icon: BarChart3,  label: "Analytics"             },
  { href: "/brechas",   icon: GitCompare, label: "Brechas de competencia" },
];

function NavItem({ href, icon: Icon, label, active, themeColor = "white" }: {
  href: string; icon: React.ElementType; label: string; active: boolean; themeColor?: string;
}) {
  const themes: Record<string, { active: string; hover: string; text: string; bg: string }> = {
    white:  { active: "bg-white text-[#1C1C1E]", hover: "hover:bg-white/10 text-[#6B6B6B] hover:text-white", text: "text-[#6B6B6B]", bg: "bg-white" },
    brand1: { active: "bg-[#FFBB99] text-[#4A2616]",  hover: "hover:bg-[#FFBB99]/20 text-[#FFBB99]/80 hover:text-[#FFBB99]", text: "text-[#FFBB99]/70", bg: "bg-[#FFBB99]" },
    brand2: { active: "bg-[#FFB3C1] text-[#4A161E]",  hover: "hover:bg-[#FFB3C1]/20 text-[#FFB3C1]/80 hover:text-[#FFB3C1]", text: "text-[#FFB3C1]/70", bg: "bg-[#FFB3C1]" },
    brand3: { active: "bg-[#C4B5FD] text-[#1E164A]",  hover: "hover:bg-[#C4B5FD]/20 text-[#C4B5FD]/80 hover:text-[#C4B5FD]", text: "text-[#C4B5FD]/70", bg: "bg-[#C4B5FD]" },
  };

  const theme = themes[themeColor] || themes.white;

  return (
    <Link
      href={href}
      className={cn(
        "group relative w-full flex items-center justify-center h-9 rounded-[14px] transition-all duration-300",
        active ? theme.active : theme.hover
      )}
    >
      <Icon className="w-4 h-4 z-10" strokeWidth={active ? 2.2 : 1.8} />
      
      {/* Indicador de color lateral cuando está activo */}
      {active && (
        <div className={cn("absolute -left-1.5 w-1 h-5 rounded-full", theme.bg)} 
             style={{ boxShadow: `0 0 12px ${theme.bg === "bg-white" ? "rgba(255,255,255,0.4)" : "currentColor"}` }} />
      )}

      {/* Floating Hover Label / Tag */}
      <div className="absolute left-[calc(100%+12px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-[100]">
        <div className="relative flex items-center">
          {/* Triangulito flecha */}
          <div className="absolute -left-1 w-2 h-2 bg-[#1C1C1E] border-l border-t border-white/10 rotate-[-45deg]" />
          <div className="bg-[#1C1C1E] border border-white/10 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap backdrop-blur-xl">
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
}

function Divider() {
  return <div className="w-6 h-px bg-white/5 my-1.5 flex-shrink-0" />;
}

export function Sidebar() {
  const pathname = usePathname();
  const logout   = useAuthStore((s) => s.logout);
  const router   = useRouter();
  const [dark, setDark] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────── */}
      <aside className="fixed left-4 top-1/2 -translate-y-1/2 h-auto w-[52px] bg-[#1C1C1E]/95 backdrop-blur-md flex flex-col items-center py-5 z-50 rounded-[26px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-md:hidden">
        {/* Logo */}
        <div className="mb-4 w-9 h-9 flex items-center justify-center flex-shrink-0 bg-white/5 rounded-2xl border border-white/10">
          <Image src="/logo-sidebar.png" alt="INMOV" width={22} height={22} className="object-contain opacity-90" />
        </div>

        {/* Capa 0 — Inicio */}
        <nav className="flex flex-col items-center gap-1.5 w-full px-2">
          {LAYER_0.map((item) => (
            <NavItem key={item.href} {...item} active={isActive(item.href)} themeColor="white" />
          ))}
        </nav>

        <Divider />

        {/* Capa 1 — Maestros (Orange) */}
        <nav className="flex flex-col items-center gap-1.5 w-full px-2">
          {LAYER_1.map((item) => (
            <NavItem key={item.href} {...item} active={isActive(item.href)} themeColor="brand1" />
          ))}
        </nav>

        <Divider />

        {/* Capa 2 — Ejecución (Red) */}
        <nav className="flex flex-col items-center gap-1.5 w-full px-2">
          {LAYER_2.map((item) => (
            <NavItem key={item.href} {...item} active={isActive(item.href)} themeColor="brand2" />
          ))}
        </nav>

        <Divider />

        {/* Capa 3 — Análisis (Purple) */}
        <nav className="flex flex-col items-center gap-1.5 w-full px-2">
          {LAYER_3.map((item) => (
            <NavItem key={item.href} {...item} active={isActive(item.href)} themeColor="brand3" />
          ))}
        </nav>

        {/* Espaciador flexible */}
        <div className="flex-1 min-h-[20px]" />

        {/* Bottom: tema + logout */}
        <div className="flex flex-col items-center px-2 w-full gap-1.5">
          <div className="w-6 h-px bg-white/5 mb-1.5" />

          <button
            title={dark ? "Modo claro" : "Modo oscuro"}
            onClick={() => setDark((d) => !d)}
            className="group relative w-full flex items-center justify-center h-9 rounded-[14px] text-[#6B6B6B] hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {/* Tooltip manual para botones extra */}
            <div className="absolute left-[calc(100%+12px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-[100]">
              <div className="bg-[#1C1C1E] border border-white/10 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap">
                {dark ? "Modo claro" : "Modo oscuro"}
              </div>
            </div>
          </button>

          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="group relative w-full flex items-center justify-center h-9 rounded-[14px] text-[#6B6B6B] hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <div className="absolute left-[calc(100%+12px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-[100]">
              <div className="bg-[#1C1C1E] border border-white/10 text-rose-400 text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap">
                Cerrar sesión
              </div>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1C1C1E] flex items-center justify-around px-2 z-50 md:hidden">
        {[...LAYER_0, ...LAYER_2, ...LAYER_3.slice(0, 1)].map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
                active ? "bg-white/10 text-white" : "text-[#6B6B6B]"
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.8} />
            </Link>
          );
        })}
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-[#6B6B6B]"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.8} />
        </button>
      </nav>
    </>
  );
}
