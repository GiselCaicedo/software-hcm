"use client";
import { useState } from "react";
import Link from "next/link";
import { USERS } from "@/lib/mock-data/users";
import { cn } from "@/lib/utils";
import { Plus, MoreHorizontal } from "lucide-react";

const CARDS = [
  { user: USERS[2], nivel: "40%", progreso: 40 },
  { user: USERS[3], nivel: "70%", progreso: 70 },
  { user: USERS[2], nivel: "40%", progreso: 40 },
  { user: USERS[3], nivel: "70%", progreso: 70 },
  { user: USERS[2], nivel: "40%", progreso: 40 },
  { user: USERS[3], nivel: "80%", progreso: 80 },
  { user: USERS[2], nivel: "40%", progreso: 40 },
  { user: USERS[3], nivel: "70%", progreso: 70 },
];

export default function VistaDualPage() {
  const [activeTab, setActiveTab] = useState<"cards" | "lista">("cards");
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col p-6 gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Evaluaciones de Empleados</h1>
            <p className="text-sm text-[#6B6B6B]">Selecciona una vista via tarjeta o lista para usar el elemento de tarjeta.</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black shadow-card">
            + Asignar evaluación
          </button>
        </div>

        {/* Tabs + toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white border border-[#E8E7E2] rounded-xl p-1 shadow-card w-fit">
            {["Vista Cards", "Vista Lista"].map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i === 0 ? "cards" : "lista")}
                className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  (i === 0 ? activeTab === "cards" : activeTab === "lista")
                    ? "bg-[#1C1C1E] text-white"
                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                )}>
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A]">
            + Asignar desde aquí
          </button>
        </div>

        <div className="flex flex-1 gap-5 overflow-hidden">
          {/* Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-3">
              {CARDS.map((card, i) => (
                <div key={i}
                  onClick={() => setSelected(i)}
                  className={cn("card p-4 cursor-pointer transition-all", selected === i ? "ring-2 ring-[#1C1C1E]" : "hover:shadow-card-md")}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                      {card.user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#1A1A1A] truncate">{card.user.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{card.user.cargo}</p>
                    </div>
                    <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#A0A0A0]">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-[#A0A0A0] mb-2">Meta horizontal: {card.nivel}</p>
                  <div className="h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2DD4BF] rounded-full" style={{ width: `${card.progreso}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="w-72 card p-5 overflow-y-auto flex-shrink-0 scrollbar-hide">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold">
                {CARDS[selected]?.user.name.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-bold text-sm text-[#1A1A1A]">{CARDS[selected]?.user.name}</p>
                <p className="text-xs text-[#6B6B6B]">@{CARDS[selected]?.user.email?.split("@")[0]}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1.5">Bio</p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Especialista en calidad y calzado aspelia por 8 años de experiencia. Excelente trato indirecto y trabajo que alcpetian.
                </p>
              </div>

              <div className="h-px bg-[#E8E7E2]" />

              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">Escuelas de hoy</p>
                <div className="space-y-1 text-xs text-[#6B6B6B]">
                  <p>10:00 – 11:00 Webinar EDU</p>
                  <p>13:30 – 14:45 Mat Ger</p>
                  <p>16:00 – 18:00 Ciencias</p>
                  <p>19:00 – 19:30 Clases de agenda</p>
                </div>
              </div>

              <div className="h-px bg-[#E8E7E2]" />

              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">Horario</p>
                <div className="space-y-1 text-xs text-[#6B6B6B]">
                  <p>Vie – Sáb 8:30 AM – 9:00 PM</p>
                  <p>Lun – Mié 8:30 AM – 3:00 PM</p>
                </div>
              </div>

              <div className="h-px bg-[#E8E7E2]" />

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F7F6F2] rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-[#1A1A1A]">{CARDS[selected]?.progreso}%</p>
                  <p className="text-xs text-[#6B6B6B]">Avance</p>
                </div>
                <div className="bg-brand rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">4.2</p>
                  <p className="text-xs text-white/70">Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
