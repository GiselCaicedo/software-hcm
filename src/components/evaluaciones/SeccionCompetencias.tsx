"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { calcularPuntajeCompetenciasLider, calcularPuntajeCompetenciasPar, NIVEL_LABELS } from "@/lib/calculos";
import type { CompetenciaEval, TipoEvaluacion } from "@/types/evaluaciones";

const TIPO_LABEL: Record<string, string> = {
  organizacional: "Organizacional",
  por_nivel:      "Por nivel",
  tecnica:        "Técnica",
};

const TIPO_COLOR: Record<string, string> = {
  organizacional: "bg-emerald-50 text-emerald-700",
  por_nivel:      "bg-violet-50 text-violet-700",
  tecnica:        "bg-blue-50 text-blue-700",
};

/** Mini rating de solo lectura */
function NivelDots({ nivel, max = 5, color = "#1C1C1E" }: { nivel?: number; max?: number; color?: string }) {
  if (nivel == null) return <span className="text-[#C0C0C0] text-xs">—</span>;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < nivel ? color : "#E5E7EB" }} />
      ))}
      <span className="text-[11px] font-bold text-[#1A1A1A] ml-1">{nivel}</span>
    </div>
  );
}

/** Rating interactivo para calificar */
function RatingInput({ value, onChange, disabled, color = "#1C1C1E" }: {
  value?: number; onChange: (v: number) => void; disabled?: boolean; color?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hovered ?? value ?? 0) >= n;
        return (
          <button
            key={n}
            disabled={disabled}
            onClick={() => !disabled && onChange(n)}
            onMouseEnter={() => !disabled && setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            title={NIVEL_LABELS[n]}
            className={cn(
              "w-6 h-6 rounded-md border transition-all text-[10px] font-bold",
              filled
                ? "text-white border-transparent"
                : "text-[#C0C0C0] bg-white/50 border-black/10 hover:border-black/20",
              disabled && "cursor-default"
            )}
            style={filled ? { background: color, borderColor: color } : {}}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  competencias: CompetenciaEval[];
  tipo: TipoEvaluacion;
  estado: string;
  esLider: boolean;
  esColaborador: boolean;
  esPar: boolean;
  esAdmin: boolean;
  editable: boolean;
  onChange?: (id: string, rol: keyof CompetenciaEval["calificaciones"], valor: number) => void;
}

export function SeccionCompetencias({ competencias, tipo, estado, esLider, esColaborador, esPar, esAdmin, editable, onChange }: Props) {
  const [localComps, setLocalComps] = useState<CompetenciaEval[]>(competencias);

  const handleChange = (id: string, rol: keyof CompetenciaEval["calificaciones"], valor: number) => {
    setLocalComps((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, calificaciones: { ...c.calificaciones, [rol]: valor } } : c
      )
    );
    onChange?.(id, rol, valor);
  };

  const puntajeLider = calcularPuntajeCompetenciasLider(localComps);
  const puntajePar   = calcularPuntajeCompetenciasPar(localComps);

  // El par ve calificaciones del líder SOLO si estado = consolidado
  const parVeLider = esPar && estado === "consolidado";
  // El líder ve calificaciones del par SOLO si estado = consolidado
  const liderVePar = esLider && estado === "consolidado";

  // Agrupar por tipo
  const grupos = ["organizacional", "por_nivel", "tecnica"] as const;
  const porGrupo = grupos
    .map((g) => ({ tipo: g, items: localComps.filter((c) => c.tipo === g) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/5">
        <div>
          <h3 className="text-sm font-bold text-[#1A1A1A]">Competencias</h3>
          <p className="text-[10px] text-[#A0A0A0] mt-0.5">Peso total: 40% de la calificación final</p>
        </div>
        {(esLider || esAdmin) && (
          <div className="flex items-center gap-4">
            {puntajeLider != null && (
              <div className="text-right">
                <p className="text-[9px] text-[#A0A0A0]">Prom. líder</p>
                <p className="text-sm font-bold text-[#1A1A1A]">{puntajeLider.toFixed(2)}</p>
              </div>
            )}
            {tipo !== "90" && puntajePar != null && (
              <div className="text-right">
                <p className="text-[9px] text-[#A0A0A0]">Prom. par</p>
                <p className="text-sm font-bold text-[#8B5CF6]">{puntajePar.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grupos */}
      {porGrupo.map(({ tipo: grupoTipo, items }) => (
        <div key={grupoTipo}>
          {/* Subheader de grupo */}
          <div className="flex items-center gap-2 px-5 py-2 bg-black/[0.015] border-b border-black/[0.04]">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${TIPO_COLOR[grupoTipo]}`}>
              {TIPO_LABEL[grupoTipo]}
            </span>
          </div>

          {/* Columnas header */}
          <div
            className="grid text-[10px] font-semibold text-[#A0A0A0] uppercase tracking-wide px-5 py-1.5 border-b border-black/[0.04]"
            style={{
              gridTemplateColumns: esPar
                ? "1fr 90px 130px"
                : esColaborador
                  ? "1fr 90px"
                  : tipo === "90"
                    ? "1fr 90px 130px 130px"
                    : "1fr 90px 130px 130px 90px"
            }}
          >
            <span>Competencia</span>
            <span className="text-center">Nivel req.</span>
            {esPar
              ? <span className="text-center">Tu calificación</span>
              : esColaborador
                ? null   // colaborador ve solo nombre + nivel req. en competencias
                : <>
                    <span className="text-center">Cal. líder</span>
                    {tipo !== "90" && <span className="text-center">Cal. par</span>}
                  </>
            }
          </div>

          {/* Filas */}
          {items.map((comp, i) => (
            <div
              key={comp.id}
              className={cn(
                "grid gap-4 px-5 py-3.5 items-center border-b border-black/[0.04] last:border-0",
                i % 2 !== 0 && "bg-black/[0.015]"
              )}
              style={{
                gridTemplateColumns: esPar
                  ? "1fr 90px 130px"
                  : esColaborador
                    ? "1fr 90px 130px"
                    : tipo === "90"
                      ? "1fr 90px 130px 130px"
                      : "1fr 90px 130px 130px 90px"
              }}
            >
              {/* Nombre */}
              <div>
                <p className="text-[12px] font-semibold text-[#1A1A1A]">{comp.nombre}</p>
                {comp.observacion && (esLider || esAdmin) && (
                  <p className="text-[10px] text-[#6B6B6B] mt-0.5 italic">{comp.observacion}</p>
                )}
              </div>

              {/* Nivel esperado */}
              <div className="flex justify-center">
                <NivelDots nivel={comp.nivelEsperado} color="#8B5CF6" />
              </div>

              {/* Calificación del colaborador — solo lectura (el colaborador no califica competencias) */}
              {!esPar && (esLider || esAdmin) && (
                <div className="flex justify-center">
                  <span className="text-[10px] text-[#C0C0C0] italic">N/A</span>
                </div>
              )}

              {/* Calificación del líder */}
              {!esPar && (esLider || esAdmin) && (
                <div className="flex justify-center">
                  {esLider && editable
                    ? <RatingInput
                        value={comp.calificaciones.lider}
                        onChange={(v) => handleChange(comp.id, "lider", v)}
                        color="#1D9E75"
                      />
                    : <NivelDots nivel={comp.calificaciones.lider} color="#1D9E75" />
                  }
                </div>
              )}

              {/* Vista del par: su calificación editable */}
              {esPar && (
                <div className="flex justify-center">
                  <RatingInput
                    value={comp.calificaciones.par}
                    onChange={(v) => handleChange(comp.id, "par", v)}
                    disabled={!editable}
                    color="#8B5CF6"
                  />
                </div>
              )}

              {/* Calificación del par (líder la ve solo en consolidado) */}
              {!esPar && tipo !== "90" && (esLider || esAdmin) && (
                <div className="flex justify-center">
                  {liderVePar || esAdmin
                    ? <NivelDots nivel={comp.calificaciones.par} color="#8B5CF6" />
                    : <span className="text-[10px] text-[#C0C0C0] italic">Pendiente</span>
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
