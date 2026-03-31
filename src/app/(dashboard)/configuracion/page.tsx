"use client";
import { CICLOS_MOCK } from "@/mock/evaluaciones";
import { Plus, Edit2, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cicloRaw = CICLOS_MOCK.find((c) => c.estado === "activo") ?? CICLOS_MOCK[0];
// Adaptar al formato esperado por esta vista
const ciclo = {
  nombre: cicloRaw.nombre,
  fechaInicio: `${cicloRaw.fechaInicio} → ${cicloRaw.fechaLimite}`,
  totalEmpleados: cicloRaw.totalEvaluaciones,
  calificadas: cicloRaw.completadas,
  pendientes: cicloRaw.totalEvaluaciones - cicloRaw.completadas,
  sinEvaluar: cicloRaw.totalEvaluaciones - cicloRaw.firmadas,
  escala: `${cicloRaw.tipo}°`,
  pesoObjetivos: cicloRaw.pesoObjetivos,
  pesoCompetencias: cicloRaw.pesoCompetencias,
  fases: [
    { nombre: "Autoevaluación colaborador", fechaInicio: cicloRaw.fechaInicio, fechaFin: cicloRaw.fechaLimite, estado: "completada" as const },
    { nombre: "Evaluación del líder", fechaInicio: cicloRaw.fechaInicio, fechaFin: cicloRaw.fechaLimite, estado: "activa" as const },
    { nombre: "Evaluación del par", fechaInicio: cicloRaw.fechaInicio, fechaFin: cicloRaw.fechaLimite, estado: "activa" as const },
    { nombre: "Cierre y firmas", fechaInicio: cicloRaw.fechaLimite, fechaFin: cicloRaw.fechaCierre, estado: "pendiente" as const },
  ],
};

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Configuración de Ciclo</h1>
            <p className="text-sm text-[#6B6B6B]">Gestiona los parámetros del ciclo activo de evaluación</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-card">
            <Plus className="w-3.5 h-3.5" /> Nuevo Ciclo
          </button>
        </div>

        {/* Active cycle card */}
        <div className="card p-6 mb-5">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-[#8B5CF6] flex items-center justify-center">
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A] text-lg">{ciclo.nombre}</p>
                <p className="text-sm text-[#6B6B6B]">{ciclo.fechaInicio}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="tag bg-[#E8F5E9] text-[#2E7D32]">En Ciclo</span>
              <button className="w-8 h-8 rounded-xl bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B] hover:bg-[#E8E7E2]">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-xl bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B] hover:bg-[#E8E7E2]">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-xs text-[#6B6B6B] mb-1.5 font-medium">
              <span>Progreso del ciclo</span>
              <span className="text-[#1A1A1A] font-semibold">68%</span>
            </div>
            <div className="h-2 bg-[#F0EFE9] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand to-[#8B5CF6] rounded-full" style={{ width: "68%" }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Indicadores en Acción", value: ciclo.totalEmpleados, color: "text-[#1A1A1A]" },
              { label: "Calificados", value: ciclo.calificadas, color: "text-brand" },
              { label: "Pendientes", value: ciclo.pendientes, color: "text-[#1A1A1A]" },
              { label: "Sin evaluación", value: ciclo.sinEvaluar, color: "text-[#6B6B6B]" },
            ].map((s, i) => (
              <div key={i} className="bg-[#F7F6F2] rounded-2xl p-4">
                <p className={cn("text-3xl font-black mb-1", s.color)}>{s.value}</p>
                <p className="text-xs text-[#6B6B6B]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Parámetros */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">Parámetros del Ciclo</h3>
              <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-0">
              {[
                { label: "Tipo de evaluación", value: ciclo.escala },
                { label: "Escala de calificación", value: "1 – 5" },
                { label: "Peso objetivos", value: `${ciclo.pesoObjetivos}%` },
                { label: "Peso competencias", value: `${ciclo.pesoCompetencias}%` },
              ].map((field, i) => (
                <div key={i} className="flex items-center justify-between py-3.5 border-b border-[#E8E7E2] last:border-0">
                  <span className="text-sm text-[#6B6B6B]">{field.label}</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]">{field.value}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 bg-[#F7F6F2] border border-[#E8E7E2] rounded-xl text-sm text-[#6B6B6B] font-medium hover:bg-[#E8E7E2] transition-colors">
              Editar Parámetros
            </button>
          </div>

          {/* Fases */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">Fases del Ciclo</h3>
              <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {ciclo.fases.map((fase, i) => (
                <div key={i} className={cn("rounded-xl p-3.5", fase.estado === "activa" ? "bg-[#1C1C1E]" : "bg-[#F7F6F2]")}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={cn("text-sm font-semibold", fase.estado === "activa" ? "text-white" : "text-[#1A1A1A]")}>
                      {fase.nombre}
                    </p>
                    <span className={cn("tag text-xs",
                      fase.estado === "completada" ? "bg-[#E8F5E9] text-[#2E7D32]" :
                        fase.estado === "activa" ? "bg-white/20 text-white" :
                          "bg-[#E8E7E2] text-[#6B6B6B]"
                    )}>
                      {fase.estado === "completada" ? "Completada" : fase.estado === "activa" ? "En Curso" : "Pendiente"}
                    </span>
                  </div>
                  <p className={cn("text-xs", fase.estado === "activa" ? "text-white/60" : "text-[#A0A0A0]")}>
                    {fase.fechaInicio} – {fase.fechaFin}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
