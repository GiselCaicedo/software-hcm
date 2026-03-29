"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

const WEEKS = [
  [null,null,null,null,null,null,1],
  [2,3,4,5,6,7,8],
  [9,10,11,12,13,14,15],
  [16,17,18,19,20,21,22],
  [23,24,25,26,27,28,29],
  [30,31,null,null,null,null,null],
];

const EVENT_SECTIONS = [
  {
    title: "Gestión del desempeño",
    accent: "#FF6B35",
    cardBg: "bg-[#fff1eb]",
    border: "border-[#FF6B35]/30",
    text: "text-[#c2410c]",
  },
  {
    title: "Gestión de objetivos",
    accent: "#2DD4BF",
    cardBg: "bg-[#ebfbf8]",
    border: "border-[#2DD4BF]/30",
    text: "text-[#0f766e]",
  },
  {
    title: "Aprendizaje",
    accent: "#4A7FE5",
    cardBg: "bg-[#edf4ff]",
    border: "border-[#4A7FE5]/30",
    text: "text-[#1d4ed8]",
  },
  {
    title: "Tiempo, trabajo y ausencias",
    accent: "#F5C518",
    cardBg: "bg-[#fff8db]",
    border: "border-[#F5C518]/35",
    text: "text-[#8a6500]",
  },
  {
    title: "Seguimientos",
    accent: "#8B5CF6",
    cardBg: "bg-[#f3edff]",
    border: "border-[#8B5CF6]/30",
    text: "text-[#6d28d9]",
  },
];

export function CalendarPanel() {
  const user = useAuthStore((s) => s.user);
  const calendarOpen = useUIStore((s) => s.calendarOpen);
  const toggleCalendar = useUIStore((s) => s.toggleCalendar);

  if (!calendarOpen) return null;

  return (
    /* Overlay real — flota sobre header y contenido */
    <div className="fixed inset-y-0 right-0 w-[360px] z-[60] pointer-events-none">
      <div className="h-full w-full bg-white/60 backdrop-blur-2xl  pointer-events-auto flex flex-col overflow-hidden">
        <div className="h-14 flex items-center justify-end gap-2 px-5 pl-4 bg-transparent flex-shrink-0">
            <div className="min-w-0 mr-1 text-right">
              <p className="text-[12px] font-semibold text-[#1A1A1A] leading-tight truncate">
                {user?.name || "Sindy Caicedo"}
              </p>
              <p className="text-[10px] text-[#6B6B6B] leading-tight truncate">
                {user?.cargo || "HR Manager"}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full ring-[1.5px] ring-black/12 shadow-sm cursor-pointer ml-0.5 flex-shrink-0 bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="w-px h-5 bg-black/10 mx-1" />
            <button
              onClick={toggleCalendar}
              title="Cerrar calendario"
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 bg-[#1C1C1E] text-white hover:bg-[#1C1C1E]"
              )}
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-5 pb-4 flex flex-col gap-3">

          {/* Fecha + flechas */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-[#1A1A1A]">Mar, 28</p>
              <p className="text-xs text-[#6B6B6B]">Sábado</p>
            </div>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-[#6B6B6B] hover:bg-black/10 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-[#6B6B6B] hover:bg-black/10 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grid del mes */}
          <div className="rounded-2xl p-3 border border-white/45 bg-white/24 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            {/* Headers días */}
            <div className="grid grid-cols-7 text-center mb-2">
              {["D","L","M","M","J","V","S"].map((d, i) => (
                <div key={i} className="text-[10px] text-[#A0A0A0] font-semibold">{d}</div>
              ))}
            </div>
            {/* Semanas */}
            {WEEKS.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 mb-0.5">
                {week.map((day, di) => {
                  const today  = day === 28;
                  const teal   = day === 10;
                  const orange = day === 20;
                  const yellow = day === 21;
                  const dot    = day === 16 || day === 25;
                  return (
                    <div key={di} className="relative flex items-center justify-center h-7">
                      <div className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-medium cursor-pointer transition-colors
                        ${today  ? "bg-[#1C1C1E] text-white font-bold" :
                          teal   ? "bg-[#2DD4BF] text-white font-bold" :
                          orange ? "bg-[#FF6B35] text-white font-bold" :
                          yellow ? "bg-[#F5C518] text-[#1A1A1A] font-bold" :
                          day    ? "text-[#6B6B6B] hover:bg-black/6" :
                                   "text-[#D0D0D0]"}`}>
                        {day || ""}
                      </div>
                      {dot && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6B35]" />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Eventos HCM */}
          <div className="flex flex-col gap-2">
            <div className="pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">
                Eventos y seguimientos
              </p>
            </div>
            {EVENT_SECTIONS.map((section) => (
              <div
                key={section.title}
                className={cn(
                  "rounded-2xl border px-3 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
                  section.cardBg,
                  section.border
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center border-[1.5px]"
                    style={{ background: `${section.accent}20`, borderColor: section.accent }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: section.accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-[11px] font-semibold leading-tight", section.text)}>
                      {section.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
