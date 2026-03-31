"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calcularPuntajeFinal } from "@/lib/calculos";
import { PanelEstado } from "./PanelEstado";
import { SeccionObjetivos } from "./SeccionObjetivos";
import { SeccionCompetencias } from "./SeccionCompetencias";
import { SeccionCierre } from "./SeccionCierre";
import type { EvaluacionDetalle, EstadoEvaluacion } from "@/types/evaluaciones";

const TIPO_BADGE: Record<string, string> = {
  "90":  "bg-slate-100 text-slate-700",
  "180": "bg-blue-50 text-blue-700",
  "360": "bg-violet-50 text-violet-700",
};

const ESTADO_BADGE: Record<EstadoEvaluacion, string> = {
  borrador:      "bg-gray-100 text-gray-500",
  en_progreso:   "bg-blue-50 text-blue-700 border border-blue-200/60",
  consolidado:   "bg-amber-50 text-amber-700 border border-amber-200/60",
  firmado_lider: "bg-orange-50 text-orange-700 border border-orange-200/60",
  cerrado:       "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
};

const ESTADO_LABEL: Record<EstadoEvaluacion, string> = {
  borrador:      "Borrador",
  en_progreso:   "En progreso",
  consolidado:   "Consolidado",
  firmado_lider: "Firmado por líder",
  cerrado:       "Cerrado",
};

type Tab = "objetivos" | "competencias" | "cierre";

interface Props {
  evaluacion: EvaluacionDetalle;
  esLider: boolean;
  esColaborador: boolean;
  esAdmin: boolean;
}

export function DetalleEvaluacion({ evaluacion: inicial, esLider, esColaborador, esAdmin }: Props) {
  const router = useRouter();
  const [ev, setEv] = useState<EvaluacionDetalle>(inicial);
  const [tab, setTab] = useState<Tab>("objetivos");

  // Tabs visibles según estado y rol
  const tabCierreVisible =
    (esLider && (ev.estado === "consolidado")) ||
    (esColaborador && ev.estado === "firmado_lider") ||
    ((esLider || esColaborador || esAdmin) && ev.estado === "cerrado");

  const TABS: { key: Tab; label: string; peso?: string }[] = [
    { key: "objetivos",    label: "Objetivos",    peso: `${ev.pesoObjetivos}%`    },
    { key: "competencias", label: "Competencias", peso: `${ev.pesoCompetencias}%` },
    ...(tabCierreVisible ? [{ key: "cierre" as Tab, label: "Cierre y firma" }] : []),
  ];

  const editable =
    ev.estado === "en_progreso" ||
    ev.estado === "consolidado" ||
    ev.estado === "firmado_lider";

  // ── Handlers de firma ────────────────────────────────────────────────────

  const handleFirmarLider = (obsLider: string, checkbox: boolean) => {
    setEv((prev) => ({
      ...prev,
      estado: "firmado_lider" as EstadoEvaluacion,
      observacionesLider: obsLider,
      firmadoLider: true,
      checkboxLider: checkbox,
      lider: { ...prev.lider, completado: true, fechaCompletado: new Date().toLocaleDateString("es-CO") },
    }));
    setTab("cierre");
  };

  const handleFirmarColaborador = (obsColaborador: string) => {
    const puntajeFinal = calcularPuntajeFinal(ev) ?? undefined;
    setEv((prev) => ({
      ...prev,
      estado: "cerrado" as EstadoEvaluacion,
      observacionesColaborador: obsColaborador,
      firmadoColaborador: true,
      fechaCierre: new Date().toLocaleDateString("es-CO"),
      puntajeFinal,
      colaborador: { ...prev.colaborador, completado: true, fechaCompletado: new Date().toLocaleDateString("es-CO") },
    }));
    // En producción: redirigir a /pdi/[evalId]
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Topbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-black/5 bg-white/20 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-xl bg-white/60 border border-white/80 flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Breadcrumb */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Link href="/evaluaciones" className="text-[10px] text-[#A0A0A0] hover:text-[#5A5A5A] transition-colors">
                Evaluaciones
              </Link>
              <ChevronRight className="w-3 h-3 text-[#C0C0C0]" />
              <Link
                href={`/evaluaciones/${ev.cicloId}`}
                className="text-[10px] text-[#A0A0A0] hover:text-[#5A5A5A] transition-colors max-w-[140px] truncate"
              >
                {ev.cicloNombre}
              </Link>
              <ChevronRight className="w-3 h-3 text-[#C0C0C0]" />
              <span className="text-[10px] text-[#5A5A5A] font-medium">{ev.colaborador.nombre} · {ev.tipo}°</span>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1A1A1A]">{ev.colaborador.nombre}</h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TIPO_BADGE[ev.tipo]}`}>
                {ev.tipo}°
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${ESTADO_BADGE[ev.estado]}`}>
                {ESTADO_LABEL[ev.estado]}
              </span>
            </div>
            <p className="text-[11px] text-[#6B6B6B]">{ev.colaborador.cargo}</p>
          </div>
        </div>

        {(esLider || esAdmin) && ev.estado === "cerrado" && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1E] text-white rounded-xl text-xs font-medium hover:bg-black transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Compartir resultado
          </button>
        )}
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 px-6 py-2.5 border-b border-black/[0.04] bg-white/10 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all",
              tab === t.key
                ? "bg-[#1C1C1E] text-white"
                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-white/40"
            )}
          >
            {t.label}
            {t.peso && (
              <span className={cn(
                "text-[9px] px-1 py-0.5 rounded font-bold",
                tab === t.key ? "bg-white/20 text-white/70" : "bg-black/5 text-[#A0A0A0]"
              )}>
                {t.peso}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Cuerpo 70/30 ────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Columna principal */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 min-w-0 scrollbar-hide">

          {tab === "objetivos" && (
            <SeccionObjetivos
              objetivos={ev.objetivos}
              esLider={esLider}
              esColaborador={esColaborador}
              esAdmin={esAdmin}
              editable={editable}
            />
          )}

          {tab === "competencias" && (
            <SeccionCompetencias
              competencias={ev.competencias}
              tipo={ev.tipo}
              estado={ev.estado}
              esLider={esLider}
              esColaborador={esColaborador}
              esPar={false}
              esAdmin={esAdmin}
              editable={editable}
            />
          )}

          {tab === "cierre" && tabCierreVisible && (
            <SeccionCierre
              evaluacion={ev}
              esLider={esLider}
              esColaborador={esColaborador}
              esAdmin={esAdmin}
              onFirmarLider={handleFirmarLider}
              onFirmarColaborador={handleFirmarColaborador}
            />
          )}

          {/* Barra de progreso de la sección al pie */}
          {tab !== "cierre" && (
            <div className="text-[10px] text-[#A0A0A0] text-center py-2">
              {tab === "objetivos"
                ? `${ev.objetivos.filter((o) => o.calificacionLider != null || o.calificacionColaborador != null).length} / ${ev.objetivos.length} objetivos con calificación`
                : `${ev.competencias.filter((c) => (esLider ? c.calificaciones.lider : c.calificaciones.par) != null).length} / ${ev.competencias.length} competencias calificadas`
              }
            </div>
          )}
        </div>

        {/* Panel derecho */}
        <div className="w-[272px] flex-shrink-0 overflow-y-auto p-4 border-l border-black/5 scrollbar-hide">
          <PanelEstado
            evaluacion={ev}
            esLider={esLider}
            esAdmin={esAdmin}
            esColaborador={esColaborador}
          />
        </div>
      </div>
    </div>
  );
}
