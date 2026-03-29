"use client";
import { useState } from "react";
import { COMPETENCIAS } from "@/lib/mock-data/competencias";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPO_STYLES: Record<string, { tag: string; card: string }> = {
  "Organizacional": { tag: "bg-[#E8F5E9] text-[#2E7D32]", card: "bg-[#E8F5E9]" },
  "Por nivel": { tag: "bg-[#E3F2FD] text-[#1565C0]", card: "bg-[#E3F2FD]" },
  "De la tarea": { tag: "bg-[#F3E5F5] text-[#6A1B9A]", card: "bg-[#F3E5F5]" },
};

const CARD_TOPS = [
  "bg-[#4A90D9]", "bg-[#F5C518]", "bg-[#2DD4BF]",
  "bg-[#1C1C1E]", "bg-brand", "bg-[#8B5CF6]",
];

const TABS = ["Todas", "Organizacionales", "Por nivel", "De la tarea"];

export default function CompetenciasPage() {
  const [activeTab, setActiveTab] = useState("Todas");

  const filtered = activeTab === "Todas"
    ? COMPETENCIAS
    : COMPETENCIAS.filter((c) =>
        activeTab === "Organizacionales" ? c.tipo === "Organizacional"
        : c.tipo === activeTab
      );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Competencias</h1>
            <p className="text-sm text-[#6B6B6B]">Catálogo de competencias organizacionales, individuales y técnicas</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-card">
            <Plus className="w-3.5 h-3.5" /> Nueva Competencia
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white border border-[#E8E7E2] rounded-xl p-1 w-fit shadow-card">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((comp, i) => (
            <div key={comp.id} className="card overflow-hidden hover:shadow-card-md transition-shadow cursor-pointer">
              {/* Colored top */}
              <div className={cn("h-2", CARD_TOPS[i % CARD_TOPS.length])} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={cn("tag", TIPO_STYLES[comp.tipo]?.tag)}>{comp.tipo}</span>
                  <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#A0A0A0] hover:text-[#1A1A1A]">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-bold text-[#1A1A1A] mb-1.5">{comp.nombre}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3 mb-4">{comp.descripcion}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <div key={star} className={cn("w-5 h-1.5 rounded-full", star <= comp.nivelActual ? CARD_TOPS[i % CARD_TOPS.length] : "bg-[#E8E7E2]")} />
                      ))}
                    </div>
                    <p className="text-xs text-[#A0A0A0]">{comp.nivel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1A1A1A]">{comp.evaluados}</p>
                    <p className="text-xs text-[#A0A0A0]">evaluados</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
