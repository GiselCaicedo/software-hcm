"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { calcularPuntajeObjetivos } from "@/lib/calculos";
import type { ObjetivoEval } from "@/types/evaluaciones";

interface Props {
  objetivos: ObjetivoEval[];
  esLider: boolean;
  esColaborador: boolean;
  esAdmin: boolean;
  editable: boolean;
  onChange?: (id: string, campo: "calificacionLider" | "calificacionColaborador" | "observacion", valor: number | string) => void;
}

function RatingInput({ value, onChange, disabled }: {
  value?: number; onChange: (v: number) => void; disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          disabled={disabled}
          onClick={() => !disabled && onChange(n)}
          className={cn(
            "w-7 h-7 rounded-lg text-[11px] font-bold transition-all border",
            value === n
              ? "bg-[#1C1C1E] text-white border-[#1C1C1E]"
              : "bg-white/50 text-[#C0C0C0] border-black/10 hover:border-[#1C1C1E]/30 hover:text-[#555]",
            disabled && "cursor-default opacity-60"
          )}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export function SeccionObjetivos({ objetivos, esLider, esColaborador, esAdmin, editable, onChange }: Props) {
  const [localObjs, setLocalObjs] = useState<ObjetivoEval[]>(objetivos);

  const handleChange = (
    id: string,
    campo: "calificacionLider" | "calificacionColaborador" | "observacion",
    valor: number | string
  ) => {
    setLocalObjs((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [campo]: valor } : o))
    );
    onChange?.(id, campo, valor);
  };

  const puntaje = calcularPuntajeObjetivos(localObjs);
  const puedeVerLider = esLider || esAdmin;

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/5">
        <div>
          <h3 className="text-sm font-bold text-[#1A1A1A]">Objetivos</h3>
          <p className="text-[10px] text-[#A0A0A0] mt-0.5">Peso total: 60% de la calificación final</p>
        </div>
        {puntaje != null && puedeVerLider && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#A0A0A0]">Puntaje parcial</span>
            <span className="text-base font-bold text-[#1A1A1A]">{puntaje.toFixed(2)}</span>
            <span className="text-[10px] text-[#A0A0A0]">/ 5</span>
          </div>
        )}
      </div>

      {/* Tabla header */}
      <div className="grid text-[10px] font-semibold text-[#A0A0A0] uppercase tracking-wide px-5 py-2 border-b border-black/5"
           style={{ gridTemplateColumns: "1fr 60px 120px 110px 110px" }}>
        <span>Descripción</span>
        <span className="text-center">Peso</span>
        <span>Meta cuantitativa</span>
        <span className="text-center">Cal. colaborador</span>
        {puedeVerLider && <span className="text-center">Cal. líder</span>}
      </div>

      {/* Filas */}
      {localObjs.map((obj, i) => (
        <div
          key={obj.id}
          className={cn(
            "grid gap-3 px-5 py-4 items-start border-b border-black/[0.04] last:border-0",
            i % 2 !== 0 && "bg-black/[0.015]"
          )}
          style={{ gridTemplateColumns: "1fr 60px 120px 110px 110px" }}
        >
          {/* Descripción */}
          <div>
            <p className="text-[12px] font-semibold text-[#1A1A1A] leading-snug">{obj.descripcion}</p>
            {obj.observacion !== undefined && (esLider || esAdmin) && (
              <input
                className="mt-2 w-full text-[11px] bg-white/50 border border-black/8 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-black/20 text-[#5A5A5A] placeholder:text-[#C0C0C0]"
                placeholder="Observación..."
                value={obj.observacion || ""}
                onChange={(e) => handleChange(obj.id, "observacion", e.target.value)}
                disabled={!editable || !esLider}
              />
            )}
          </div>

          {/* Peso */}
          <div className="text-center">
            <span className="text-[13px] font-bold text-[#1A1A1A]">{obj.peso}%</span>
          </div>

          {/* Meta */}
          <div>
            <p className="text-[10px] text-[#6B6B6B] leading-snug">{obj.metaCuantitativa || "—"}</p>
          </div>

          {/* Cal. colaborador */}
          <div className="flex justify-center">
            <RatingInput
              value={obj.calificacionColaborador}
              onChange={(v) => handleChange(obj.id, "calificacionColaborador", v)}
              disabled={!editable || !esColaborador}
            />
          </div>

          {/* Cal. líder (solo visible para líder/admin) */}
          {puedeVerLider && (
            <div className="flex justify-center">
              <RatingInput
                value={obj.calificacionLider}
                onChange={(v) => handleChange(obj.id, "calificacionLider", v)}
                disabled={!editable || !esLider}
              />
            </div>
          )}
        </div>
      ))}

      {/* Footer — total ponderado */}
      {puedeVerLider && (
        <div className="flex items-center justify-end gap-3 px-5 py-3 bg-black/[0.02] border-t border-black/5">
          <span className="text-[11px] text-[#6B6B6B]">Total ponderado (líder)</span>
          <span className="text-sm font-bold text-[#1A1A1A]">
            {puntaje != null ? `${puntaje.toFixed(2)} / 5` : "—"}
          </span>
        </div>
      )}
    </div>
  );
}
