"use client";
import { ANALYTICS } from "@/lib/mock-data/analytics";
import { Download, Filter, MoreHorizontal, ArrowUpRight, TrendingUp } from "lucide-react";

const BAR_COLORS = [
  "bg-gradient-to-t from-[#1C1C1E] to-[#444]",
  "bg-gradient-to-t from-brand to-[#FF8C55]",
  "bg-gradient-to-t from-[#F5C518] to-[#FFE08A]",
  "bg-gradient-to-t from-[#6B21A8] to-brand",
  "bg-gradient-to-t from-[#F5C518] to-[#FF8C55]",
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Analytics y Reportes</h1>
            <p className="text-sm text-[#6B6B6B]">Métricas de desempeño y tendencias según cargos y áreas</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8E7E2] text-[#6B6B6B] rounded-xl text-sm font-medium hover:bg-[#F7F6F2] shadow-card">
              <Download className="w-3.5 h-3.5" /> Exportar PDF
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black shadow-card">
              <Filter className="w-3.5 h-3.5" /> Filtros
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: "Promedio General", value: `${ANALYTICS.promedioGeneral}`, sub: "Sobre 5 puntos", badge: "+9.8%", badgeColor: "bg-[#E8F5E9] text-[#2E7D32]" },
            { label: "Tasa de Completitud", value: `${ANALYTICS.tasaCompletitud}%`, sub: "Evaluaciones completadas", badge: "+4.6%", badgeColor: "bg-[#E3F2FD] text-[#1565C0]" },
            { label: "Objetivos Logrados", value: `${ANALYTICS.objetivosLogrados}%`, sub: "Del objetivo en ciclo", badge: "Sin cambio", badgeColor: "bg-[#F7F6F2] text-[#6B6B6B]" },
          ].map((kpi, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-[#6B6B6B]">{kpi.label}</p>
                <span className={`tag ${kpi.badgeColor}`}>{kpi.badge}</span>
              </div>
              <p className="text-4xl font-black text-[#1A1A1A] mb-1">{kpi.value}</p>
              <p className="text-xs text-[#A0A0A0]">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Bar chart */}
          <div className="col-span-2 card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">Desempeño por Departamento</h3>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]"><ArrowUpRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex items-end gap-5 h-44 px-2">
              {ANALYTICS.departamentos.map((dep, i) => {
                const heightPct = (dep.promedio / 5) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A]">{dep.promedio}</span>
                    <div className="w-full relative" style={{ height: "120px" }}>
                      <div
                        className={`absolute bottom-0 w-full rounded-t-xl ${BAR_COLORS[i]}`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#6B6B6B] text-center leading-tight">{dep.nombre}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top performers */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">Top Performers</h3>
              <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {ANALYTICS.topPerformers.map((performer, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F6F2] transition-colors cursor-pointer">
                  <span className="text-xs text-[#A0A0A0] w-4 font-bold">{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {performer.nombre.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A] truncate">{performer.nombre}</p>
                    <p className="text-xs text-[#A0A0A0]">{performer.cargo}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#1A1A1A]">{performer.promedio}</span>
                    <TrendingUp className="w-3 h-3 text-[#2E7D32]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#E8E7E2]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#6B6B6B]">Promedio del ciclo</span>
                <span className="font-bold text-[#1A1A1A]">{ANALYTICS.promedioGeneral} / 5.0</span>
              </div>
              <div className="h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full" style={{ width: `${(ANALYTICS.promedioGeneral / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
