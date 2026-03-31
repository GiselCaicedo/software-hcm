"use client";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { calcularProgresoParticipantes, colorProgreso } from "@/lib/calculos";
import type { EvaluacionDetalle, EstadoEvaluacion } from "@/types/evaluaciones";

const PASOS: { key: EstadoEvaluacion; label: string; sub?: string }[] = [
  { key: "borrador",      label: "Borrador"                              },
  { key: "en_progreso",   label: "En progreso",  sub: "Participantes llenando" },
  { key: "consolidado",   label: "Consolidado",  sub: "Listo para firma del líder" },
  { key: "firmado_lider", label: "Firmado líder",sub: "Esperando firma del colaborador" },
  { key: "cerrado",       label: "Cerrado"                              },
];

const ORDEN: Record<EstadoEvaluacion, number> = {
  borrador: 0, en_progreso: 1, consolidado: 2, firmado_lider: 3, cerrado: 4,
};

const ROL_LABEL: Record<string, string> = {
  colaborador:    "Colaborador",
  lider:          "Líder",
  par:            "Par",
  cliente_externo:"Cliente externo",
};

interface Props {
  evaluacion: EvaluacionDetalle;
  esLider: boolean;
  esAdmin: boolean;
  esColaborador: boolean;
  accionPrincipal?: React.ReactNode;
}

export function PanelEstado({ evaluacion, esLider, esAdmin, esColaborador, accionPrincipal }: Props) {
  const { estado, fechaLimite } = evaluacion;
  const ordenActual = ORDEN[estado];
  const progreso    = calcularProgresoParticipantes(evaluacion);

  const diasRestantes = Math.ceil(
    (new Date(fechaLimite).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const participantes = [
    evaluacion.colaborador,
    evaluacion.lider,
    evaluacion.par,
    evaluacion.clienteExterno,
  ].filter(Boolean) as EvaluacionDetalle["colaborador"][];

  return (
    <div className="flex flex-col gap-4">

      {/* Stepper */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4">
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Estado del proceso</p>
        <div className="flex flex-col gap-0">
          {PASOS.map((paso, i) => {
            const done    = ORDEN[paso.key] < ordenActual;
            const active  = paso.key === estado;
            const pending = ORDEN[paso.key] > ordenActual;
            const isLast  = i === PASOS.length - 1;

            return (
              <div key={paso.key} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                    done    && "bg-[#1D9E75] text-white",
                    active  && "bg-[#1C1C1E] text-white ring-2 ring-[#1C1C1E]/20",
                    pending && "bg-white border-2 border-black/10 text-[#C0C0C0]",
                  )}>
                    {done
                      ? <CheckCircle2 className="w-3.5 h-3.5" />
                      : active
                        ? <div className="w-2 h-2 rounded-full bg-white" />
                        : <Circle className="w-3 h-3" />
                    }
                  </div>
                  {!isLast && (
                    <div
                      className={cn("w-px my-0.5", done ? "bg-[#1D9E75]" : "bg-black/8")}
                      style={{ minHeight: 16 }}
                    />
                  )}
                </div>
                <div className="pb-2">
                  <p className={cn("text-[11px] font-semibold leading-tight",
                    active  ? "text-[#1A1A1A]"  : "",
                    done    ? "text-[#1D9E75]"   : "",
                    pending ? "text-[#C0C0C0]"   : "",
                  )}>
                    {paso.label}
                  </p>
                  {active && paso.sub && (
                    <p className="text-[9px] text-[#A0A0A0] mt-0.5">{paso.sub}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fecha límite */}
      <div className={cn(
        "rounded-2xl p-4 flex items-start gap-3",
        diasRestantes <= 5
          ? "bg-red-50/80 border border-red-100"
          : diasRestantes <= 14
            ? "bg-amber-50/80 border border-amber-100"
            : "bg-white/40 backdrop-blur-xl border border-white/60"
      )}>
        {diasRestantes <= 5
          ? <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          : <Clock className="w-4 h-4 text-[#6B6B6B] flex-shrink-0 mt-0.5" />
        }
        <div>
          <p className="text-[11px] font-semibold text-[#1A1A1A]">Fecha límite</p>
          <p className="text-[11px] text-[#6B6B6B]">{evaluacion.fechaLimite}</p>
          {estado !== "cerrado" && (
            <p className={cn("text-[10px] font-bold mt-0.5",
              diasRestantes <= 5  ? "text-red-500"
              : diasRestantes <= 14 ? "text-amber-600"
              : "text-[#A0A0A0]"
            )}>
              {diasRestantes > 0 ? `${diasRestantes} días restantes` : "Vencida"}
            </p>
          )}
        </div>
      </div>

      {/* Participantes */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">Participantes</p>
          <span className="text-[11px] font-bold text-[#1A1A1A]">{progreso}%</span>
        </div>
        <div className="h-1.5 bg-black/8 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progreso}%`, background: colorProgreso(progreso) }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {participantes.map((p) => (
            <div key={p.id} className="flex items-center gap-2.5">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                p.completado ? "bg-[#1D9E75]" : "bg-black/8"
              )}>
                {p.completado
                  ? <CheckCircle2 className="w-3 h-3 text-white" />
                  : <Circle className="w-2.5 h-2.5 text-[#C0C0C0]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#1A1A1A] truncate">{p.nombre}</p>
                <p className="text-[10px] text-[#A0A0A0]">{ROL_LABEL[p.rol]}</p>
              </div>
              {p.completado && p.fechaCompletado && (
                <p className="text-[9px] text-[#A0A0A0] flex-shrink-0">{p.fechaCompletado}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ponderación — solo líder/admin */}
      {(esLider || esAdmin) && (
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4">
          <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Ponderación</p>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Objetivos</span>
              <span className="font-bold text-[#1A1A1A]">{evaluacion.pesoObjetivos}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Competencias</span>
              <span className="font-bold text-[#1A1A1A]">{evaluacion.pesoCompetencias}%</span>
            </div>
            {evaluacion.tipo !== "90" && (
              <>
                <div className="w-full h-px bg-black/5 my-0.5" />
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#A0A0A0]">  Líder en comp.</span>
                  <span className="text-[#6B6B6B]">{evaluacion.pesoLiderEnCompetencias}%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#A0A0A0]">  Par en comp.</span>
                  <span className="text-[#6B6B6B]">{evaluacion.pesoParEnCompetencias}%</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Botón de acción principal si se pasa */}
      {accionPrincipal}
    </div>
  );
}
