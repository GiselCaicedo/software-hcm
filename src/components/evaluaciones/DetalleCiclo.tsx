"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { calcularProgresoParticipantes, colorProgreso } from "@/lib/calculos";
import { esPendientePar } from "@/types/evaluaciones";
import type { CicloEvaluacion, EvaluacionDetalle, EstadoCiclo } from "@/types/evaluaciones";
import {
  ChevronLeft, CheckCircle2, Clock, AlertCircle,
  Users, BarChart3, ChevronRight, Lock,
} from "lucide-react";

// ── Estilos ────────────────────────────────────────────────────────────────

const glass = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";

const ESTADO_CICLO_CLS: Record<EstadoCiclo, string> = {
  borrador:  "bg-gray-100 text-gray-500",
  activo:    "bg-blue-50 text-blue-700 border border-blue-200/60",
  en_cierre: "bg-amber-50 text-amber-700 border border-amber-200/60",
  cerrado:   "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
};
const ESTADO_CICLO_LABEL: Record<EstadoCiclo, string> = {
  borrador: "Borrador", activo: "Activo", en_cierre: "En cierre", cerrado: "Cerrado",
};

const ESTADO_EVAL_BADGE: Record<string, { cls: string; label: string }> = {
  borrador:      { cls: "bg-gray-100 text-gray-500",                                  label: "Borrador"      },
  en_progreso:   { cls: "bg-blue-50 text-blue-700 border border-blue-200/60",         label: "En progreso"   },
  pendiente_par: { cls: "bg-amber-50 text-amber-700 border border-amber-200/60",      label: "Pendiente par" },
  consolidado:   { cls: "bg-yellow-50 text-yellow-700 border border-yellow-200/60",   label: "Consolidado"   },
  firmado_lider: { cls: "bg-orange-50 text-orange-700 border border-orange-200/60",   label: "Firmado líder" },
  cerrado:       { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",label: "Cerrado"       },
};

function getBadgeEval(ev: EvaluacionDetalle) {
  const key = esPendientePar(ev) ? "pendiente_par" : ev.estado;
  return ESTADO_EVAL_BADGE[key] ?? ESTADO_EVAL_BADGE.borrador;
}

const TIPO_BADGE: Record<string, string> = {
  "90":  "bg-slate-100 text-slate-600",
  "180": "bg-blue-50 text-blue-700",
  "360": "bg-violet-50 text-violet-700",
};

// ── Subcomponentes ─────────────────────────────────────────────────────────

const COLORS = [
  "from-violet-500 to-purple-600", "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",  "from-orange-400 to-pink-500",
];

function Avatar({ nombre, size = 8 }: { nombre: string; size?: number }) {
  const ci = (nombre.charCodeAt(0) + (nombre.charCodeAt(1) || 0)) % COLORS.length;
  return (
    <div className="relative flex-shrink-0" style={{ width: size * 4, height: size * 4 }}>
      <img
        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(nombre)}&backgroundColor=FF6A1A,6B0080&backgroundType=gradientLinear`}
        alt={nombre}
        className="rounded-full object-cover w-full h-full border border-white shadow-sm"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div className={`rounded-full absolute inset-0 bg-gradient-to-br ${COLORS[ci]} items-center justify-center text-white font-bold hidden text-[10px]`}>
        {nombre.charAt(0)}
      </div>
    </div>
  );
}

function MiniProgreso({ pct }: { pct: number }) {
  const color = colorProgreso(pct);
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-14 h-1.5 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[10px] font-semibold" style={{ color }}>{pct}%</span>
    </div>
  );
}

// ── Tab: Evaluaciones ──────────────────────────────────────────────────────

function TabEvaluaciones({
  ciclo,
  evaluaciones,
  esAdmin,
}: {
  ciclo: CicloEvaluacion;
  evaluaciones: EvaluacionDetalle[];
  esAdmin: boolean;
}) {
  const total      = evaluaciones.length;
  const completadas = evaluaciones.filter((e) => e.colaborador.completado && e.lider.completado).length;
  const pendPar    = evaluaciones.filter(esPendientePar).length;
  const cerradas   = evaluaciones.filter((e) => e.estado === "cerrado").length;

  const STATS = [
    { icon: BarChart3,    label: "Total generadas",       value: total,       cls: "bg-blue-100 text-blue-700" },
    { icon: CheckCircle2, label: "Colabs + líder listos", value: completadas, cls: "bg-emerald-100 text-emerald-700" },
    { icon: Clock,        label: "Pendiente par",          value: pendPar,    cls: "bg-amber-100 text-amber-700" },
    { icon: CheckCircle2, label: "Cerradas y firmadas",   value: cerradas,    cls: "bg-teal-100 text-teal-700" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s, i) => (
          <div key={i} className={`${glass} rounded-2xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-white/70 border border-white/80 flex items-center justify-center">
                <s.icon className="w-3 h-3 text-[#6B6B6B]" strokeWidth={1.6} />
              </div>
              <span className="text-[10px] text-[#A0A0A0]">{s.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#1A1A1A]">{s.value}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${s.cls}`}>
                {Math.round((s.value / (total || 1)) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className={`${glass} rounded-2xl overflow-hidden`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.04]">
              {["Colaborador", "Líder", "Par", "Tipo", "Estado", "Progreso", "Fecha límite", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3">
                  <span className="text-[10px] font-semibold text-[#A0A0A0] uppercase tracking-wide whitespace-nowrap">{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {evaluaciones.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-[12px] text-[#A0A0A0]">
                  No hay evaluaciones en este ciclo.
                </td>
              </tr>
            )}
            {evaluaciones.map((ev, i) => {
              const badge    = getBadgeEval(ev);
              const progreso = calcularProgresoParticipantes(ev);
              const dias     = Math.ceil((new Date(ev.fechaLimite).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const vencida  = dias < 0 && ev.estado !== "cerrado";
              const urgente  = dias >= 0 && dias <= 7 && ev.estado !== "cerrado";

              return (
                <tr
                  key={ev.id}
                  className={cn("group transition-colors hover:bg-white/40", i % 2 !== 0 && "bg-black/[0.015]")}
                >
                  {/* Colaborador */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar nombre={ev.colaborador.nombre} size={7} />
                      <div>
                        <p className="text-[12px] font-semibold text-[#1A1A1A] whitespace-nowrap">{ev.colaborador.nombre}</p>
                        <p className="text-[10px] text-[#A0A0A0] truncate max-w-[120px]">{ev.colaborador.cargo}</p>
                      </div>
                    </div>
                  </td>

                  {/* Líder */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Avatar nombre={ev.lider.nombre} size={6} />
                      <div>
                        <p className="text-[11px] font-medium text-[#1A1A1A] whitespace-nowrap">{ev.lider.nombre}</p>
                        <div className={cn("w-1.5 h-1.5 rounded-full inline-block mt-0.5", ev.lider.completado ? "bg-emerald-400" : "bg-gray-300")} />
                      </div>
                    </div>
                  </td>

                  {/* Par */}
                  <td className="px-4 py-3">
                    {ev.par ? (
                      <div className="flex items-center gap-1.5">
                        <Avatar nombre={ev.par.nombre} size={6} />
                        <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", ev.par.completado ? "bg-emerald-400" : "bg-amber-400")} />
                        <span className="text-[10px] text-[#6B6B6B] whitespace-nowrap">{ev.par.nombre.split(" ")[0]}</span>
                      </div>
                    ) : (
                      <span className="text-[#C0C0C0] text-xs">—</span>
                    )}
                  </td>

                  {/* Tipo */}
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${TIPO_BADGE[ev.tipo]}`}>
                      {ev.tipo}°
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>

                  {/* Progreso */}
                  <td className="px-4 py-3">
                    <MiniProgreso pct={progreso} />
                  </td>

                  {/* Fecha límite */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {(vencida || urgente) && <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />}
                      <div>
                        <p className={cn("text-[11px] font-medium", vencida || urgente ? "text-red-500" : "text-[#5A5A5A]")}>
                          {ev.fechaLimite}
                        </p>
                        {urgente && <p className="text-[9px] text-red-400">{dias}d</p>}
                        {vencida && <p className="text-[9px] text-red-400">Vencida</p>}
                      </div>
                    </div>
                  </td>

                  {/* Acción */}
                  <td className="px-3 py-3">
                    <Link
                      href={`/evaluaciones/${ev.cicloId}/${ev.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#1C1C1E] text-white rounded-lg text-[10px] font-medium hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Ver <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Tab: Configuración ─────────────────────────────────────────────────────

function TabConfiguracion({ ciclo, esAdmin }: { ciclo: CicloEvaluacion; esAdmin: boolean }) {
  const editable = ciclo.estado === "borrador" && esAdmin;

  const seccionesForms = [
    "Autoevaluación del colaborador en objetivos",
    "Evaluación del líder en objetivos",
    "Evaluación del líder en competencias",
    ...(ciclo.tipo !== "90" ? ["Evaluación del par en competencias"] : []),
    ...(ciclo.tipo === "360" ? ["Evaluación de cliente externo"] : []),
    "Observaciones por competencia",
    "Observaciones de cierre",
    "Firmas obligatorias para cerrar",
  ];

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {!editable && (
        <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-100 rounded-xl px-4 py-3">
          <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            El ciclo está <strong>{ESTADO_CICLO_LABEL[ciclo.estado].toLowerCase()}</strong> — la configuración es de solo lectura.
          </p>
        </div>
      )}

      {/* Datos generales */}
      <div className={`${glass} rounded-2xl p-5 flex flex-col gap-4`}>
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">Datos generales</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1">Nombre</label>
            <input
              disabled={!editable}
              defaultValue={ciclo.nombre}
              className="w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1">Tipo</label>
            <input
              disabled
              defaultValue={`${ciclo.tipo}°`}
              className="w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl opacity-60 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1">Fecha inicio</label>
            <input disabled={!editable} type="date" defaultValue={ciclo.fechaInicio}
              className="w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1">Fecha límite evaluación</label>
            <input disabled={!editable} type="date" defaultValue={ciclo.fechaLimite}
              className="w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1">Fecha cierre administrativo</label>
            <input disabled={!editable} type="date" defaultValue={ciclo.fechaCierre}
              className="w-full px-3 py-2 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Población */}
      <div className={`${glass} rounded-2xl p-5 flex flex-col gap-4`}>
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">Población</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-2">Niveles jerárquicos</label>
            <div className="flex flex-col gap-1.5">
              {([
                { label: "Operativo",   key: "operativo"   },
                { label: "Táctico",     key: "tactico"     },
                { label: "Estratégico", key: "estrategico" },
              ] as { label: string; key: "operativo" | "tactico" | "estrategico" }[]).map(({ label, key }) => {
                const checked = ciclo.poblacion.niveles.includes(key);
                return (
                  <label key={key} className={cn("flex items-center gap-2 cursor-pointer", !editable && "cursor-not-allowed")}>
                    <input type="checkbox" defaultChecked={checked} disabled={!editable} className="rounded" />
                    <span className="text-xs text-[#5A5A5A]">{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-2">Áreas</label>
            <div className="flex flex-col gap-1.5">
              {ciclo.poblacion.areas.includes("todas") ? (
                <label className={cn("flex items-center gap-2", !editable && "cursor-not-allowed")}>
                  <input type="checkbox" defaultChecked disabled={!editable} className="rounded" />
                  <span className="text-xs text-[#5A5A5A]">Todas las áreas</span>
                </label>
              ) : (
                ciclo.poblacion.areas.map((area) => (
                  <label key={area} className={cn("flex items-center gap-2", !editable && "cursor-not-allowed")}>
                    <input type="checkbox" defaultChecked disabled={!editable} className="rounded" />
                    <span className="text-xs text-[#5A5A5A]">{area}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ponderación */}
      <div className={`${glass} rounded-2xl p-5`}>
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-4">Ponderación</p>

        {/* Barra visual objetivos/competencias */}
        <div className="h-6 rounded-xl overflow-hidden flex mb-2">
          <div className="flex items-center justify-center text-[10px] font-bold text-white"
            style={{ width: `${ciclo.pesoObjetivos}%`, background: "#4A7FE5" }}>
            Obj. {ciclo.pesoObjetivos}%
          </div>
          <div className="flex items-center justify-center text-[10px] font-bold text-white"
            style={{ width: `${ciclo.pesoCompetencias}%`, background: "#8B5CF6" }}>
            Comp. {ciclo.pesoCompetencias}%
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-[#A0A0A0] mb-4">
          <span>Objetivos</span><span>Competencias</span>
        </div>

        {ciclo.tipo !== "90" && (
          <div className="border-t border-black/5 pt-4">
            <p className="text-[10px] text-[#A0A0A0] mb-2">Dentro del bloque de competencias ({ciclo.pesoCompetencias}%):</p>
            <div className="h-5 rounded-lg overflow-hidden flex mb-1">
              <div className="flex items-center justify-center text-[9px] font-bold text-white"
                style={{ width: `${ciclo.pesoLider}%`, background: "#1D9E75" }}>
                Líder {ciclo.pesoLider}%
              </div>
              <div className="flex items-center justify-center text-[9px] font-bold text-white"
                style={{ width: `${ciclo.pesoPar}%`, background: "#8B5CF6" }}>
                Par {ciclo.pesoPar}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secciones del formulario */}
      <div className={`${glass} rounded-2xl p-5`}>
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Secciones del formulario</p>
        <div className="flex flex-col gap-2.5">
          {seccionesForms.map((s) => (
            <label key={s} className={cn("flex items-center gap-2.5", !editable && "cursor-not-allowed opacity-70")}>
              <input type="checkbox" defaultChecked disabled={!editable} className="rounded" />
              <span className="text-xs text-[#5A5A5A]">{s}</span>
            </label>
          ))}
        </div>
      </div>

      {editable && (
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 text-sm font-semibold text-[#5A5A5A] bg-white border border-black/10 rounded-xl hover:bg-white/90">
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
}

// ── Tab: Progreso ──────────────────────────────────────────────────────────

function TabProgreso({ evaluaciones }: { evaluaciones: EvaluacionDetalle[] }) {
  const estados = [
    { key: "borrador",      label: "Borrador",      color: "#9CA3AF" },
    { key: "en_progreso",   label: "En progreso",   color: "#4A7FE5" },
    { key: "pendiente_par", label: "Pendiente par", color: "#F59E0B" },
    { key: "consolidado",   label: "Consolidado",   color: "#EAB308" },
    { key: "firmado_lider", label: "Firmado líder", color: "#F97316" },
    { key: "cerrado",       label: "Cerrado",       color: "#1D9E75" },
  ] as const;

  const counts = estados.map((e) => ({
    ...e,
    count: e.key === "pendiente_par"
      ? evaluaciones.filter(esPendientePar).length
      : evaluaciones.filter((ev) => ev.estado === e.key && !esPendientePar(ev)).length,
  }));

  const maxCount = Math.max(...counts.map((c) => c.count), 1);

  const sinIniciar = evaluaciones.filter(
    (e) => e.estado === "borrador" || (e.estado === "en_progreso" && !e.colaborador.completado)
  );

  const puntajes = evaluaciones
    .filter((e) => e.puntajeFinal != null)
    .map((e) => e.puntajeFinal!);

  const promedio = puntajes.length
    ? (puntajes.reduce((a, b) => a + b, 0) / puntajes.length).toFixed(2)
    : null;

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {/* Gráfica de barras */}
      <div className={`${glass} rounded-2xl p-5`}>
        <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider mb-4">Distribución por estado</p>
        <div className="flex items-end gap-3 h-32">
          {counts.map((c) => (
            <div key={c.key} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[11px] font-bold text-[#1A1A1A]">{c.count}</span>
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${Math.max((c.count / maxCount) * 80, c.count > 0 ? 8 : 0)}px`,
                  background: c.color,
                  opacity: c.count === 0 ? 0.2 : 1,
                }}
              />
              <span className="text-[9px] text-[#A0A0A0] text-center leading-tight">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Puntajes preliminares */}
      {puntajes.length > 0 && (
        <div className={`${glass} rounded-2xl p-5`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">Puntajes preliminares</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#1A1A1A]">{promedio}</span>
              <span className="text-[10px] text-[#A0A0A0]">/ 5.00 promedio</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {evaluaciones
              .filter((e) => e.puntajeFinal != null)
              .map((e) => (
                <div key={e.id} className="flex flex-col items-center gap-1 bg-white/60 border border-white/80 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-[#1A1A1A]">{e.puntajeFinal!.toFixed(2)}</span>
                  <span className="text-[9px] text-[#A0A0A0] text-center max-w-[80px] leading-tight">
                    {e.colaborador.nombre.split(" ")[0]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Sin iniciar */}
      {sinIniciar.length > 0 && (
        <div className={`${glass} rounded-2xl p-5`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">
              Sin iniciar ({sinIniciar.length})
            </p>
            <button className="text-[11px] text-[#4A7FE5] font-medium hover:underline">
              Reenviar recordatorio a todos
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {sinIniciar.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-[12px] text-[#1A1A1A]">{ev.colaborador.nombre}</span>
                  <span className="text-[10px] text-[#A0A0A0]">{ev.colaborador.cargo}</span>
                </div>
                <button className="text-[10px] text-[#4A7FE5] font-medium hover:underline">
                  Recordatorio
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────

interface Props {
  ciclo: CicloEvaluacion;
  evaluaciones: EvaluacionDetalle[];
  esAdmin: boolean;
  esLider: boolean;
}

export function DetalleCiclo({ ciclo, evaluaciones, esAdmin, esLider }: Props) {
  const [tab, setTab] = useState<"evaluaciones" | "configuracion" | "progreso">("evaluaciones");

  const TABS = [
    { key: "evaluaciones"  as const, label: "Evaluaciones"   },
    { key: "configuracion" as const, label: "Configuración"  },
    { key: "progreso"      as const, label: "Progreso"       },
  ];

  const todasFirmadas = evaluaciones.length > 0 && evaluaciones.every((e) => e.estado === "cerrado");

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 gap-4 scrollbar-hide">

      {/* Header con breadcrumb */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Link
            href="/evaluaciones"
            className="w-8 h-8 rounded-xl bg-white/60 border border-white/80 flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors flex-shrink-0 mt-0.5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-1">
              <Link href="/evaluaciones" className="text-[11px] text-[#A0A0A0] hover:text-[#5A5A5A] transition-colors">
                Evaluaciones
              </Link>
              <ChevronRight className="w-3 h-3 text-[#C0C0C0]" />
              <span className="text-[11px] text-[#5A5A5A] font-medium">{ciclo.nombre}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1A1A1A]">{ciclo.nombre}</h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${ESTADO_CICLO_CLS[ciclo.estado]}`}>
                {ESTADO_CICLO_LABEL[ciclo.estado]}
              </span>
            </div>
            <p className="text-[11px] text-[#6B6B6B] mt-0.5">
              {ciclo.tipo}° · {ciclo.fechaInicio} → {ciclo.fechaLimite}
            </p>
          </div>
        </div>

        {esAdmin && todasFirmadas && ciclo.estado !== "cerrado" && (
          <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" /> Cerrar ciclo
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-1 w-fit shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              tab === t.key ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab */}
      {tab === "evaluaciones"  && <TabEvaluaciones ciclo={ciclo} evaluaciones={evaluaciones} esAdmin={esAdmin} />}
      {tab === "configuracion" && <TabConfiguracion ciclo={ciclo} esAdmin={esAdmin} />}
      {tab === "progreso"      && <TabProgreso evaluaciones={evaluaciones} />}
    </div>
  );
}
