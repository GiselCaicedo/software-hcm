"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NIVEL_LABELS } from "@/lib/calculos";
import type { EvaluacionDetalle } from "@/types/evaluaciones";

interface Props {
  evaluacion: EvaluacionDetalle;
  onEnviar: (calificaciones: Record<string, number>) => void;
}

function RatingSelector({ value, onChange, disabled }: {
  value?: number; onChange: (v: number) => void; disabled?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = (hovered ?? value ?? 0) >= n;
          return (
            <button
              key={n}
              disabled={disabled}
              onClick={() => !disabled && onChange(n)}
              onMouseEnter={() => !disabled && setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "w-10 h-10 rounded-xl border text-sm font-bold transition-all",
                active
                  ? "bg-[#8B5CF6] text-white border-[#8B5CF6]"
                  : "bg-white/50 text-[#C0C0C0] border-black/10",
                !disabled && !active && "hover:border-[#8B5CF6]/40 hover:text-[#8B5CF6]",
                disabled && "cursor-default opacity-60"
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      {(hovered ?? value) != null && (
        <p className="text-[11px] text-[#6B6B6B] h-4">
          {NIVEL_LABELS[hovered ?? value ?? 0]}
        </p>
      )}
    </div>
  );
}

export function VistaDelPar({ evaluacion, onEnviar }: Props) {
  const [califs, setCalifs] = useState<Record<string, number>>(
    Object.fromEntries(
      evaluacion.competencias.map((c) => [c.id, c.calificaciones.par ?? 0])
    )
  );
  const [confirmando, setConfirmando]  = useState(false);
  const [enviado, setEnviado]          = useState(evaluacion.par?.completado ?? false);

  const todas = evaluacion.competencias.every((c) => (califs[c.id] ?? 0) > 0);

  const handleEnviar = () => {
    setEnviado(true);
    onEnviar(califs);
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#F5F0EB" }}>
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">¡Gracias por tu evaluación!</h2>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Tus calificaciones sobre <strong>{evaluacion.colaborador.nombre}</strong> han sido registradas. Tu aporte es fundamental para el desarrollo del equipo.
          </p>
          <p className="text-[10px] text-[#A0A0A0] mt-4">
            Tus respuestas son confidenciales y solo el responsable de TH podrá ver la fuente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: "#F5F0EB" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header — solo nombre de pila por privacidad */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-1">Evaluación de competencias</p>
          <h1 className="text-xl font-bold text-[#1A1A1A]">
            Estás evaluando a {evaluacion.colaborador.nombre.split(" ")[0]}
          </h1>
          <p className="text-sm text-[#6B6B6B]">{evaluacion.colaborador.cargo} · {evaluacion.cicloNombre}</p>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl px-5 py-4 mb-5">
          <p className="text-xs text-blue-800 leading-relaxed">
            Califica cada competencia según tu experiencia trabajando con esta persona. Tus respuestas son <strong>confidenciales</strong> — solo el líder verá el promedio, no tu calificación individual. Una vez enviado no podrás editar.
          </p>
        </div>

        {/* Competencias */}
        <div className="flex flex-col gap-4 mb-6">
          {evaluacion.competencias.map((comp) => (
            <div key={comp.id} className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[13px] font-bold text-[#1A1A1A]">{comp.nombre}</p>
                  <p className="text-[10px] text-[#A0A0A0] mt-0.5">
                    Nivel esperado para el cargo: <strong>{comp.nivelEsperado}/5</strong>
                  </p>
                </div>
                {califs[comp.id] > 0 && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                )}
              </div>
              <RatingSelector
                value={califs[comp.id] || undefined}
                onChange={(v) => setCalifs((prev) => ({ ...prev, [comp.id]: v }))}
              />
            </div>
          ))}
        </div>

        {/* Progreso */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#A0A0A0]">Progreso</span>
            <span className="text-[11px] font-bold text-[#1A1A1A]">
              {evaluacion.competencias.filter((c) => (califs[c.id] ?? 0) > 0).length} / {evaluacion.competencias.length}
            </span>
          </div>
          <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#8B5CF6] transition-all duration-300"
              style={{
                width: `${(evaluacion.competencias.filter((c) => (califs[c.id] ?? 0) > 0).length / evaluacion.competencias.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* CTA */}
        {!confirmando ? (
          <button
            onClick={() => setConfirmando(true)}
            disabled={!todas}
            className={cn(
              "w-full py-3 rounded-xl text-sm font-semibold transition-all",
              todas
                ? "bg-[#1C1C1E] text-white hover:bg-black"
                : "bg-black/10 text-[#A0A0A0] cursor-not-allowed"
            )}
          >
            {todas ? "Enviar evaluación" : `Califica todas las competencias para continuar`}
          </button>
        ) : (
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 font-medium">
                Una vez enviada, no podrás modificar tus respuestas. ¿Confirmas que deseas enviar?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmando(false)}
                className="flex-1 py-2 text-xs font-semibold text-[#5A5A5A] bg-white border border-black/10 rounded-xl hover:bg-white/90"
              >
                Volver
              </button>
              <button
                onClick={handleEnviar}
                className="flex-1 py-2 text-xs font-semibold text-white bg-[#1D9E75] rounded-xl hover:bg-emerald-700"
              >
                Sí, enviar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
