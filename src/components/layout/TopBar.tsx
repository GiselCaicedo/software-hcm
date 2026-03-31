"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Upload, Sparkles } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { useTopBarActions } from "@/stores/topBarActionsStore";
import { cn } from "@/lib/utils";

const HEADER_NAV = [
  { label: "Resumen",  href: "/dashboard"         },
  { label: "Equipo",   href: "/analytics"          },
  { label: "Ciclos",   href: "/evaluaciones"       },
  { label: "Reportes", href: "/analytics/reportes" },
  { label: "Noticias", href: "/configuracion"      },
];

export function TopBar() {
  const pathname       = usePathname();
  const calendarOpen   = useUIStore((s) => s.calendarOpen);
  const toggleCalendar = useUIStore((s) => s.toggleCalendar);
  const topBarActions  = useTopBarActions((s) => s.actions);

  const esDashboard = pathname === "/dashboard";
  const esCargos    = pathname === "/cargos" || pathname.startsWith("/cargos");

  return (
    <header className={cn("h-14 flex items-center w-full relative transition-[padding] duration-300", calendarOpen ? "pr-[340px]" : "")}>
      {/* Logo */}
      <div className="flex items-center pl-5 flex-shrink-0">
        <Image
          src="/logo-header.png"
          alt="INMOV Global Network"
          width={130}
          height={44}
          className="object-contain h-9 w-auto"
        />
      </div>

      {/* Nav — centro */}
      <nav className="flex-1 flex items-center justify-center gap-0.5">
        {esCargos && topBarActions ? (
          // Acciones contextuales — distintas según si estamos en lista o detalle
          pathname === "/cargos" ? (
            <>
              <button
                onClick={topBarActions.openImport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-black/6 transition-all duration-200"
              >
                <Upload className="w-3.5 h-3.5" strokeWidth={2} />
                Importar desde Excel
              </button>
              <button
                onClick={topBarActions.openIA}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-black/6 transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                Crear con IA
              </button>
            </>
          ) : (
            <>
              <button
                onClick={topBarActions.openImport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-black/6 transition-all duration-200"
              >
                Ver evaluaciones
              </button>
              <button
                onClick={topBarActions.openIA}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-black/6 transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                Editar perfil
              </button>
            </>
          )
        ) : esDashboard ? (
          // Nav estándar — Solo se muestra en el dashboard central
          HEADER_NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[#1C1C1E] text-white"
                    : "text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-black/6"
                )}
              >
                {item.label}
              </Link>
            );
          })
        ) : null}
      </nav>

      {/* Right — botón toggle calendario (solo en dashboard) */}
      {esDashboard && (
        <div className="flex items-center pr-5 pl-4 self-stretch">
          <button
            onClick={toggleCalendar}
            title={calendarOpen ? "Cerrar calendario" : "Abrir calendario"}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 text-[#555] hover:bg-black/5",
              calendarOpen ? "bg-[#1C1C1E] text-white hover:bg-[#1C1C1E]" : ""
            )}
          >
            {calendarOpen ? (
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            ) : (
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        </div>
      )}
    </header>
  );
}
