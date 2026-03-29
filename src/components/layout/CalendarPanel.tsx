"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, Bell } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

const MONTHS_ES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const DAYS_ES   = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const DAYS_COL  = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

// ── Eventos con hora ────────────────────────────────────────
type CalEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  accent: string;
  day: number;
};

const EVENTS: CalEvent[] = [
  { id:"e1", day: 10, title: "Inicio ciclo Q2",           start:"08:30", end:"09:30", color:"#e0f7f4", accent:"#2DD4BF" },
  { id:"e2", day: 29, title: "Evaluación 360°",           start:"09:00", end:"10:00", color:"#e8f0fe", accent:"#4A7FE5" },
  { id:"e3", day: 29, title: "Revisión OKRs equipo",      start:"11:00", end:"12:30", color:"#fff8e1", accent:"#F5C518" },
  { id:"e4", day: 29, title: "Town Hall — Resultados Q1", start:"12:00", end:"13:30", color:"#fce8e6", accent:"#FF6B35" },
  { id:"e5", day: 14, title: "Cierre evaluaciones Q1",    start:"09:00", end:"09:30", color:"#fce8e6", accent:"#FF6B35" },
  { id:"e6", day: 21, title: "Training: Dar Feedback",    start:"10:00", end:"11:30", color:"#f3edff", accent:"#8B5CF6" },
];

// Días con punto de evento
const EVENT_DOTS: Record<number, string> = {
  3: "#FF6B35", 7: "#2DD4BF", 10: "#2DD4BF",
  14: "#FF6B35", 16: "#FF6B35", 20: "#FF6B35",
  21: "#8B5CF6", 24: "#8B5CF6", 29: "#4A7FE5",
};

// Días con color de fondo especial
const DAY_BG: Record<number, { bg: string; text: string }> = {
  10: { bg: "#2DD4BF", text: "#fff" },
  12: { bg: "#2DD4BF", text: "#fff" },
  20: { bg: "#FF6B35", text: "#fff" },
  21: { bg: "#F5C518", text: "#1A1A1A" },
};

// Timeline slots
const SLOTS = [
  "08:00","08:30","09:00","09:30","10:00","10:30",
  "11:00","11:30","12:00","12:30","13:00","13:30",
];
const SLOT_H = 48; // px por slot

function timeToSlotOffset(time: string): number {
  const [h, m] = time.split(":").map(Number);
  const base = 8 * 60; // 08:00
  return ((h * 60 + m - base) / 30) * SLOT_H;
}
function eventHeight(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const mins = (eh * 60 + em) - (sh * 60 + sm);
  return Math.max((mins / 30) * SLOT_H, SLOT_H);
}

function buildWeeks(year: number, month: number) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Prev month tail
  const prevDays = new Date(year, month, 0).getDate();
  const weeks: { day: number; cur: boolean }[][] = [];
  let week: { day: number; cur: boolean }[] = [];

  for (let i = 0; i < firstDay; i++) {
    week.push({ day: prevDays - firstDay + 1 + i, cur: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push({ day: d, cur: true });
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  let next = 1;
  while (week.length > 0 && week.length < 7) {
    week.push({ day: next++, cur: false });
  }
  if (week.length) weeks.push(week);
  return weeks;
}

export function CalendarPanel() {
  const user           = useAuthStore((s) => s.user);
  const calendarOpen   = useUIStore((s) => s.calendarOpen);
  const toggleCalendar = useUIStore((s) => s.toggleCalendar);

  const realToday = new Date();
  const [viewYear,  setViewYear]  = useState(realToday.getFullYear());
  const [viewMonth, setViewMonth] = useState(realToday.getMonth());
  const [selected,  setSelected]  = useState<number>(realToday.getDate());

  const isCurrentMonth = viewYear === realToday.getFullYear() && viewMonth === realToday.getMonth();
  const todayNum       = isCurrentMonth ? realToday.getDate() : -1;
  const weeks          = buildWeeks(viewYear, viewMonth);

  const selectedDate   = new Date(viewYear, viewMonth, selected);
  const dayEvents      = EVENTS.filter(e => e.day === selected);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelected(1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelected(1);
  }

  if (!calendarOpen) return null;

  const totalTimeline = SLOTS.length * SLOT_H;

  return (
    <div className="fixed inset-y-0 right-0 w-[340px] z-[60] pointer-events-none">
      <div className="h-full w-full bg-white/80 pointer-events-auto flex flex-col overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          {/* Iconos izquierda */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#EBEBEB] transition-colors relative">
              <Mail className="w-4 h-4 text-[#555]" strokeWidth={1.8} />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#EBEBEB] transition-colors relative">
              <Bell className="w-4 h-4 text-[#555]" strokeWidth={1.8} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF6B35] border-[1.5px] border-white" />
            </button>
          </div>

          {/* Usuario + avatar + cerrar */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[12px] font-semibold text-[#1A1A1A] leading-tight">{user?.name || "Sindy Caicedo"}</p>
              <p className="text-[10px] text-[#8A8A8A] leading-tight">{user?.cargo || "HR Manager"}</p>
            </div>
            <button onClick={toggleCalendar} className="relative w-9 h-9 flex-shrink-0">
              <img
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(user?.name || "Sindy")}&backgroundColor=FF6A1A,FF4500,C03000,6B0080&backgroundType=gradientLinear`}
                alt={user?.name || "U"}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FF6B35]/30 shadow-sm"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const fb = el.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "flex";
                }}
              />
              <div className="w-9 h-9 rounded-full absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 items-center justify-center text-white text-sm font-bold hidden">
                {user?.name?.charAt(0) || "U"}
              </div>
            </button>
          </div>
        </div>

        {/* ── Fecha seleccionada + flechas ── */}
        <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
          <p className="text-xl font-bold text-[#1A1A1A]">
            {MONTHS_ES[viewMonth]}, {selected}{" "}
            <span className="font-normal text-[#1A1A1A]">{DAYS_ES[selectedDate.getDay()]}</span>
          </p>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#888] hover:bg-[#F5F5F5] transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button onClick={nextMonth} className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#888] hover:bg-[#F5F5F5] transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Grid del mes ── */}
        <div className="px-4 pb-3 flex-shrink-0">
          {/* Cabecera días */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_COL.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-[#B0B0B0]">{d}</div>
            ))}
          </div>
          {/* Semanas */}
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 mb-0.5">
              {week.map(({ day, cur }, di) => {
                const isToday    = cur && day === todayNum;
                const isSelected = cur && day === selected;
                const special    = cur ? DAY_BG[day] : null;
                const hasDot     = cur && !!EVENT_DOTS[day];

                return (
                  <div key={di} className="relative flex flex-col items-center justify-center h-8">
                    <div
                      onClick={() => cur && setSelected(day)}
                      className={cn(
                        "w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-medium transition-all",
                        !cur ? "text-[#D0D0D0]" : "cursor-pointer",
                        cur && isSelected && !special
                          ? "bg-[#1C1C1E] text-white font-bold"
                          : cur && isToday && !special && !isSelected
                            ? "ring-2 ring-[#1C1C1E] text-[#1C1C1E] font-bold"
                            : cur && special
                              ? "text-white font-bold"
                              : cur
                                ? "text-[#3A3A3A] hover:bg-[#F5F5F5]"
                                : ""
                      )}
                      style={cur && special ? { background: special.bg, color: special.text } : undefined}
                    >
                      {day}
                    </div>
                    {hasDot && !isSelected && !special && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: EVENT_DOTS[day] }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Separador */}
        <div className="h-px bg-[#F0F0F0] mx-4 flex-shrink-0" />

        {/* ── Timeline ── */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="relative mx-4 mt-2 mb-4" style={{ height: totalTimeline }}>

            {/* Líneas de hora */}
            {SLOTS.map((slot, i) => (
              <div
                key={slot}
                className="absolute left-0 right-0 flex items-start"
                style={{ top: i * SLOT_H }}
              >
                <span className="text-[10px] text-[#C0C0C0] w-10 flex-shrink-0 leading-none pt-0">{slot}</span>
                <div className="flex-1 h-px bg-[#F0F0F0] mt-[5px]" />
              </div>
            ))}

            {/* Eventos */}
            {dayEvents.map((ev) => {
              const top    = timeToSlotOffset(ev.start);
              const height = eventHeight(ev.start, ev.end);
              return (
                <div
                  key={ev.id}
                  className="absolute left-12 right-0 rounded-xl px-3 py-2 cursor-pointer hover:brightness-95 transition-all flex flex-col justify-center"
                  style={{
                    top,
                    height,
                    background: ev.color,
                    borderLeft: `3px solid ${ev.accent}`,
                  }}
                >
                  <p className="text-[11px] font-bold leading-tight truncate" style={{ color: ev.accent }}>{ev.title}</p>
                  <p className="text-[10px] text-[#888] mt-0.5">{ev.start} — {ev.end}</p>
                </div>
              );
            })}

            {/* Sin eventos */}
            {dayEvents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[11px] text-[#C0C0C0]">Sin eventos este día</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
