"use client";
import { useState } from "react";
import Link from "next/link";
import { EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { MoreHorizontal, ArrowUpRight, List, LayoutGrid, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  "En Curso": "bg-[#E3F2FD] text-[#1565C0]",
  "Enviada": "bg-[#F3E5F5] text-[#6A1B9A]",
  "Calificada": "bg-[#E8F5E9] text-[#2E7D32]",
  "Firmada": "bg-[#F7F6F2] text-[#6B6B6B]",
  "Pendiente": "bg-[#FFF3E0] text-[#E65100]",
};

export default function EvaluacionesPage() {
  const [view, setView] = useState<"list" | "cards">("list");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Evaluaciones de Empleados</h1>
            <p className="text-sm text-[#6B6B6B]">Gestiona y monitorea todas las evaluaciones del ciclo activo</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-[#E8E7E2] rounded-xl p-1 shadow-card">
              <button onClick={() => setView("list")} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", view === "list" ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]")}>
                <List className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setView("cards")} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", view === "cards" ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]")}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link href="/formulario" className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-card">
              <Plus className="w-3.5 h-3.5" /> Nueva
            </Link>
          </div>
        </div>

        {view === "list" ? (
          /* Table */
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E7E2] bg-[#F7F6F2]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Empleado</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Fuente</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Departamento</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Estado</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Calificación</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {EVALUACIONES.map((ev) => (
                  <tr key={ev.id} className="border-b border-[#E8E7E2] hover:bg-[#F7F6F2] cursor-pointer transition-colors">
                    <td className="px-5 py-3.5">
                      <Link href={`/evaluaciones/${ev.id}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {ev.empleado.name.charAt(0)}
                        </div>
                        <span className="font-medium text-[#1A1A1A]">{ev.empleado.name}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-[#6B6B6B] text-sm">{ev.fuente}</td>
                    <td className="px-5 py-3.5 text-[#6B6B6B] text-sm">{ev.departamento}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("tag", STATUS_STYLES[ev.estado])}>{ev.estado}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-20 h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
                          <div className="h-full bg-brand rounded-full" style={{ width: `${ev.calificacion}%` }} />
                        </div>
                        <span className="text-xs font-medium text-[#6B6B6B]">{ev.calificacion}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#A0A0A0] hover:text-[#1A1A1A] transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#E8E7E2] bg-[#F7F6F2]">
              <p className="text-xs text-[#A0A0A0]">{EVALUACIONES.length} resultados</p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((p) => (
                  <button key={p} className={cn("w-7 h-7 text-xs rounded-lg font-medium transition-all", p === 1 ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:bg-[#E8E7E2]")}>{p}</button>
                ))}
                <span className="text-[#A0A0A0] text-xs px-1">...</span>
              </div>
            </div>
          </div>
        ) : (
          /* Cards view */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {EVALUACIONES.map((ev) => (
              <Link key={ev.id} href={`/evaluaciones/${ev.id}`} className="card p-5 hover:shadow-card-md transition-shadow cursor-pointer block">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white font-bold">
                      {ev.empleado.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1A1A1A]">{ev.empleado.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{ev.empleado.cargo}</p>
                    </div>
                  </div>
                  <span className={cn("tag", STATUS_STYLES[ev.estado])}>{ev.estado}</span>
                </div>
                <div className="space-y-1 text-xs text-[#6B6B6B] mb-4">
                  <p>Fuente: <span className="text-[#1A1A1A] font-medium">{ev.fuente}</span></p>
                  <p>Depto: <span className="text-[#1A1A1A] font-medium">{ev.departamento}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${ev.calificacion}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">{ev.calificacion}%</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
