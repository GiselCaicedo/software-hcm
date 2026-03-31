"use client";
import { useState } from "react";
import { COMPETENCIAS_OPERATIVO, COMPETENCIAS_TACTICO, COMPETENCIAS_ESTRATEGICO } from "@/lib/mock-data/competencias";
import type { CompetenciaBiblioteca } from "@/lib/mock-data/competencias";
import { cn } from "@/lib/utils";

type Tab = "operativo" | "tactico" | "estrategico";

const TAB_LABELS: Record<Tab, string> = {
  operativo: "Operativo",
  tactico: "Táctico",
  estrategico: "Estratégico",
};

const TAB_DATA: Record<Tab, CompetenciaBiblioteca[]> = {
  operativo: COMPETENCIAS_OPERATIVO,
  tactico: COMPETENCIAS_TACTICO,
  estrategico: COMPETENCIAS_ESTRATEGICO,
};

const NIVEL_BADGE: Record<Tab, string> = {
  operativo: "bg-blue-100 text-blue-700",
  tactico: "bg-purple-100 text-purple-700",
  estrategico: "bg-amber-100 text-amber-700",
};

function CompetenciaCard({ comp }: { comp: CompetenciaBiblioteca }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-[#1C1C1E]">{comp.nombre}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", NIVEL_BADGE[comp.nivel])}>
              {comp.nivel}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{comp.definicion}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-400">Peso default</p>
          <p className="text-lg font-bold text-[#1C1C1E]">{comp.peso}%</p>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-gray-400 hover:text-gray-600 mt-1 flex items-center gap-1"
      >
        {open ? "▲" : "▼"} {comp.comportamientos.length} comportamientos observables
      </button>

      {open && (
        <ul className="mt-3 space-y-1.5">
          {comp.comportamientos.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-gray-300 flex-shrink-0">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CompetenciasPage() {
  const [tab, setTab] = useState<Tab>("operativo");
  const competencias = TAB_DATA[tab];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E]">Biblioteca de Competencias</h1>
          <p className="text-gray-500 text-sm mt-1">
            Competencias organizacionales por nivel jerárquico
          </p>
        </div>
        <button
          onClick={() => alert("Funcionalidad en desarrollo")}
          className="px-4 py-2 text-sm border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Editar biblioteca
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
              tab === t ? "bg-white text-[#1C1C1E] shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {TAB_LABELS[t]}
            <span className="ml-1.5 text-xs text-gray-400">({TAB_DATA[t].length})</span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {competencias.map((comp) => (
          <CompetenciaCard key={comp.id} comp={comp} />
        ))}
      </div>
    </div>
  );
}
