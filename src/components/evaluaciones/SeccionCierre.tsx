"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  calcularPuntajeFinal,
  calcularPuntajeObjetivos,
  calcularPuntajeCompetencias,
} from "@/lib/calculos";
import type { EvaluacionDetalle } from "@/types/evaluaciones";
import { CheckCircle2, AlertCircle } from "lucide-react";

const RESULTADO_LABEL = (p: number) => {
  if (p >= 4.5) return { texto: "Sobresaliente",     color: "#1D9E75" };
  if (p >= 3.5) return { texto: "Buen desempeño",    color: "#4A7FE5" };
  if (p >= 2.5) return { texto: "En lo esperado",    color: "#8B5CF6" };
  if (p >= 1.5) return { texto: "En desarrollo",     color: "#F59E0B" };
  return              { texto: "Desempeño crítico",   color: "#EF4444" };
};

interface Props {
  evaluacion: EvaluacionDetalle;
  esLider: boolean;
  esColaborador: boolean;
  esAdmin: boolean;
  onFirmarLider: (obs: string, checkbox: boolean) => void;
  onFirmarColaborador: (obs: string) => void;
}

export function SeccionCierre({
  evaluacion,
  esLider,
  esColaborador,
  esAdmin,
  onFirmarLider,
  onFirmarColaborador,
}: Props) {
  const [obsLider, setObsLider]       = useState(evaluacion.observacionesLider || "");
  const [obsColab, setObsColab]       = useState(evaluacion.observacionesColaborador || "");
  const [checkbox, setCheckbox]       = useState(evaluacion.checkboxLider ?? false);
  const [confirmando, setConfirmando] = useState(false);

  const puntaje = calcularPuntajeFinal(evaluacion) ?? evaluacion.puntajeFinal;
  if (puntaje == null) return null;

  const pObj  = calcularPuntajeObjetivos(evaluacion.objetivos);
  const pComp = calcularPuntajeCompetencias(
    evaluacion.competencias, evaluacion.tipo,
    evaluacion.pesoLiderEnCompetencias, evaluacion.pesoParEnCompetencias,
  );
  const cat = RESULTADO_LABEL(puntaje);
  const pct = ((puntaje - 1) / 4) * 100;

  // ── Paso 1: Líder firma (estado = consolidado) ─────────────────────────
  const paso1Visible = (esLider || esAdmin) && evaluacion.estado === "consolidado";
  const paso1Listo   = obsLider.trim().length > 0 && checkbox;

  // ── Paso 2: Colaborador firma (estado = firmado_lider) ─────────────────
  const paso2Visible =
    (esColaborador || esAdmin) && evaluacion.estado === "firmado_lider";
  const paso2Listo   = obsColab.trim().length > 0;

  // ── Lectura para cerrado ───────────────────────────────────────────────
  const soloLectura = evaluacion.estado === "cerrado";

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-black/5">
        <h3 className="text-sm font-bold text-[#1A1A1A]">Resultado y cierre</h3>
        <p className="text-[10px] text-[#A0A0A0] mt-0.5">
          {evaluacion.estado === "consolidado" && "Paso 1 de 2 — El líder firma primero."}
          {evaluacion.estado === "firmado_lider" && "Paso 2 de 2 — El colaborador confirma y firma."}
          {soloLectura && "Evaluación cerrada — resultados definitivos."}
        </p>
      </div>

      <div className="p-5 flex flex-col gap-5">

        {/* ── Resultado ────────────────────────────────────────────── */}
        <div className="flex items-center gap-5">
          <div
            className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-4 flex-shrink-0"
            style={{ borderColor: cat.color }}
          >
            <span className="text-2xl font-bold" style={{ color: cat.color }}>{puntaje.toFixed(2)}</span>
            <span className="text-[9px] text-[#A0A0A0]">de 5.00</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-1" style={{ color: cat.color }}>{cat.texto}</p>
            <div className="h-3 bg-black/8 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: cat.color }} />
            </div>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="text-[9px] text-[#C0C0C0]">{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Desglose (líder/admin ven siempre; colaborador solo cuando cerrado) ── */}
        {(esLider || esAdmin || soloLectura) && (
          <div className={`${(esLider || esAdmin) ? "grid grid-cols-2" : "grid grid-cols-1"} gap-3`}>
            {[
              { label: "Objetivos",    valor: pObj,  peso: evaluacion.pesoObjetivos,    color: "#4A7FE5" },
              { label: "Competencias", valor: pComp, peso: evaluacion.pesoCompetencias, color: "#8B5CF6" },
            ].map((d) => (
              <div key={d.label} className="bg-white/60 border border-white/80 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] text-[#6B6B6B]">{d.label}</p>
                  <span className="text-[10px] text-[#A0A0A0]">{d.peso}%</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-base font-bold" style={{ color: d.color }}>
                    {d.valor != null ? d.valor.toFixed(2) : "—"}
                  </p>
                  {d.valor != null && (
                    <span className="text-[10px] text-[#A0A0A0]">
                      × {d.peso}% = {((d.valor * d.peso) / 100).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {(esLider || esAdmin) && pObj != null && pComp != null && (
              <div className="col-span-2 flex items-center justify-end gap-2 px-1">
                <span className="text-[10px] text-[#A0A0A0]">Total:</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{puntaje.toFixed(2)} / 5.00</span>
              </div>
            )}
          </div>
        )}

        {/* ── Observaciones del líder ─────────────────────────────── */}
        {(esLider || esAdmin || esColaborador) && (
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] flex items-center gap-1 mb-1.5">
              Observaciones del líder
              {paso1Visible && <span className="text-red-500">*</span>}
            </label>
            {soloLectura || evaluacion.estado === "firmado_lider" ? (
              <div className="px-3 py-2.5 bg-white/50 border border-black/8 rounded-xl text-sm text-[#5A5A5A] leading-relaxed min-h-[60px]">
                {evaluacion.observacionesLider || <span className="text-[#C0C0C0]">Sin observaciones</span>}
              </div>
            ) : (
              <textarea
                value={obsLider}
                onChange={(e) => setObsLider(e.target.value)}
                disabled={!paso1Visible || !esLider}
                rows={3}
                placeholder="Escribe tus observaciones sobre el desempeño del colaborador..."
                className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30 resize-none placeholder:text-[#C0C0C0] disabled:opacity-70 disabled:cursor-not-allowed"
              />
            )}
          </div>
        )}

        {/* ── Observaciones del colaborador ───────────────────────── */}
        {(esColaborador || esAdmin || esLider) && (evaluacion.estado === "firmado_lider" || soloLectura) && (
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] flex items-center gap-1 mb-1.5">
              Observaciones del colaborador
              {paso2Visible && <span className="text-red-500">*</span>}
            </label>
            {soloLectura ? (
              <div className="px-3 py-2.5 bg-white/50 border border-black/8 rounded-xl text-sm text-[#5A5A5A] leading-relaxed min-h-[60px]">
                {evaluacion.observacionesColaborador || <span className="text-[#C0C0C0]">Sin observaciones</span>}
              </div>
            ) : (
              <textarea
                value={obsColab}
                onChange={(e) => setObsColab(e.target.value)}
                disabled={!esColaborador}
                rows={3}
                placeholder="Comparte tu perspectiva sobre tu desempeño en este ciclo..."
                className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30 resize-none placeholder:text-[#C0C0C0] disabled:opacity-70 disabled:cursor-not-allowed"
              />
            )}
          </div>
        )}

        {/* ── CTA Paso 1: Líder firma ──────────────────────────────── */}
        {paso1Visible && esLider && (
          <div className="flex flex-col gap-3">
            {/* Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
                className="mt-0.5 rounded"
              />
              <span className="text-xs text-[#5A5A5A] leading-relaxed">
                Declaro que revisé y discutí estos resultados con el colaborador.
              </span>
            </label>

            {!confirmando ? (
              <button
                onClick={() => setConfirmando(true)}
                disabled={!paso1Listo}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                  paso1Listo
                    ? "bg-[#1C1C1E] text-white hover:bg-black"
                    : "bg-black/10 text-[#A0A0A0] cursor-not-allowed"
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
                Firmar — pasar al colaborador
              </button>
            ) : (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium">
                    Tu firma quedará registrada y el colaborador recibirá acceso a la pantalla de cierre. ¿Confirmas?
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmando(false)}
                    className="flex-1 py-2 text-xs font-semibold text-[#5A5A5A] bg-white border border-black/10 rounded-xl hover:bg-white/90"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => { onFirmarLider(obsLider, checkbox); setConfirmando(false); }}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-[#1D9E75] rounded-xl hover:bg-emerald-700"
                  >
                    Sí, firmar
                  </button>
                </div>
              </div>
            )}

            {!paso1Listo && (
              <p className="text-[10px] text-[#A0A0A0] text-center">
                Completa las observaciones y marca el checkbox para firmar.
              </p>
            )}
          </div>
        )}

        {/* ── Estado intermedio: esperando colaborador ─────────────── */}
        {evaluacion.estado === "firmado_lider" && (esLider || esAdmin) && !esColaborador && (
          <div className="flex items-center gap-2 bg-blue-50/60 border border-blue-100 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-800 font-medium">
              Firmado por el líder. Esperando firma del colaborador para cerrar.
            </p>
          </div>
        )}

        {/* ── CTA Paso 2: Colaborador firma ───────────────────────── */}
        {paso2Visible && esColaborador && (
          <div className="flex flex-col gap-3">
            {!confirmando ? (
              <button
                onClick={() => setConfirmando(true)}
                disabled={!paso2Listo}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                  paso2Listo
                    ? "bg-[#1C1C1E] text-white hover:bg-black"
                    : "bg-black/10 text-[#A0A0A0] cursor-not-allowed"
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
                Firmar y cerrar evaluación
              </button>
            ) : (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium">
                    Esta acción es irreversible. La evaluación quedará cerrada. ¿Confirmas?
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmando(false)}
                    className="flex-1 py-2 text-xs font-semibold text-[#5A5A5A] bg-white border border-black/10 rounded-xl hover:bg-white/90"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => { onFirmarColaborador(obsColab); setConfirmando(false); }}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-[#1D9E75] rounded-xl hover:bg-emerald-700"
                  >
                    Sí, firmar y cerrar
                  </button>
                </div>
              </div>
            )}
            {!paso2Listo && (
              <p className="text-[10px] text-[#A0A0A0] text-center">
                Completa tus observaciones para poder firmar.
              </p>
            )}
          </div>
        )}

        {/* ── Estado cerrado ───────────────────────────────────────── */}
        {soloLectura && (
          <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[12px] font-semibold text-emerald-800">Evaluación cerrada</p>
              {evaluacion.fechaCierre && (
                <p className="text-[10px] text-emerald-600">Firmada el {evaluacion.fechaCierre}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
