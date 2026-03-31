"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CICLOS_MOCK, EVALUACIONES_MOCK } from "@/mock/evaluaciones";
import type { CicloEvaluacion, EstadoCiclo, EvaluacionDetalle } from "@/types/evaluaciones";
import {
  BarChart3, CheckCircle2, Clock, AlertCircle, Plus,
  ChevronRight, X,
} from "lucide-react";

// ── Helpers visuales ──────────────────────────────────────────────────────

const glass = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";

const ESTADO_CICLO: Record<EstadoCiclo, { cls: string; label: string }> = {
  borrador:   { cls: "bg-gray-100 text-gray-500",                               label: "Borrador"   },
  activo:     { cls: "bg-blue-50 text-blue-700 border border-blue-200/60",      label: "Activo"     },
  en_cierre:  { cls: "bg-amber-50 text-amber-700 border border-amber-200/60",   label: "En cierre"  },
  cerrado:    { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200/60", label: "Cerrado" },
};

const TIPO_BADGE: Record<string, string> = {
  "90":  "bg-slate-100 text-slate-600",
  "180": "bg-blue-50 text-blue-700",
  "360": "bg-violet-50 text-violet-700",
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
  const key =
    ev.estado === "en_progreso" && ev.par && !ev.par.completado
      ? "pendiente_par"
      : ev.estado;
  return ESTADO_EVAL_BADGE[key] ?? ESTADO_EVAL_BADGE.borrador;
}

// ── Avatar ─────────────────────────────────────────────────────────────────

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
      <div className={`rounded-full absolute inset-0 bg-gradient-to-br ${COLORS[ci]} items-center justify-center text-white font-bold hidden text-xs`}>
        {nombre.charAt(0)}
      </div>
    </div>
  );
}

// ── Barra de progreso delgada ─────────────────────────────────────────────

function BarraProgreso({ value, total }: { value: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const color = pct >= 80 ? "#1D9E75" : pct >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-semibold text-[#1A1A1A]">{pct}%</span>
    </div>
  );
}

// ── Slider visual para pesos ──────────────────────────────────────────────

function PesoBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[11px] text-[#6B6B6B]">{label}</span>
        <span className="text-[11px] font-bold text-[#1A1A1A]">{pct}%</span>
      </div>
      <div className="h-2 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Sheet "Nuevo ciclo" ────────────────────────────────────────────────────

function SheetNuevoCiclo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tipo, setTipo] = useState<"90" | "180" | "360">("180");
  const [pesoObj, setPesoObj] = useState(60);
  const pesoComp = 100 - pesoObj;

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[420px] bg-[#F5F0EB] border-l border-black/8 shadow-2xl z-[210] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/8 bg-white/40">
          <div>
            <h2 className="text-base font-bold text-[#1A1A1A]">Nuevo ciclo de evaluación</h2>
            <p className="text-[11px] text-[#6B6B6B]">El ciclo genera las evaluaciones individuales al activarse.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/60 border border-white/80 flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-hide">

          {/* Nombre */}
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">
              Nombre del ciclo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Evaluación Desempeño Q2 2026"
              className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">
              Tipo de evaluación <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {(["90", "180", "360"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-sm font-bold border transition-all",
                    tipo === t
                      ? "bg-[#1C1C1E] text-white border-[#1C1C1E]"
                      : "bg-white/60 text-[#6B6B6B] border-black/10 hover:border-black/20"
                  )}
                >
                  {t}°
                </button>
              ))}
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">Fecha inicio <span className="text-red-500">*</span></label>
              <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">Fecha límite eval. <span className="text-red-500">*</span></label>
              <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">Fecha cierre administrativo</label>
              <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/70 border border-black/10 rounded-xl focus:outline-none focus:border-black/30" />
            </div>
          </div>

          {/* Población */}
          <div>
            <label className="text-xs font-semibold text-[#5A5A5A] block mb-1.5">Nivel jerárquico</label>
            <div className="flex gap-2 flex-wrap">
              {["Operativo", "Táctico", "Estratégico"].map((n) => (
                <label key={n} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked={n === "Operativo"} />
                  <span className="text-xs text-[#5A5A5A]">{n}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pesos */}
          <div className={`${glass} rounded-2xl p-4 flex flex-col gap-3`}>
            <p className="text-xs font-semibold text-[#5A5A5A]">Ponderación</p>
            <PesoBar label="Objetivos" pct={pesoObj} color="#4A7FE5" />
            <input
              type="range" min={40} max={80} step={5}
              value={pesoObj}
              onChange={(e) => setPesoObj(Number(e.target.value))}
              className="w-full accent-[#1C1C1E]"
            />
            <PesoBar label="Competencias" pct={pesoComp} color="#8B5CF6" />

            {(tipo === "180" || tipo === "360") && (
              <div className="mt-1 pl-3 border-l-2 border-violet-200 flex flex-col gap-2">
                <p className="text-[10px] text-[#A0A0A0]">Dentro del bloque competencias:</p>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#6B6B6B]">Líder</span>
                  <span className="font-bold text-[#1A1A1A]">70%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#6B6B6B]">Par</span>
                  <span className="font-bold text-[#1A1A1A]">30%</span>
                </div>
              </div>
            )}
          </div>

          {/* Secciones del formulario */}
          <div>
            <p className="text-xs font-semibold text-[#5A5A5A] mb-2">Secciones del formulario</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Autoevaluación del colaborador en objetivos", def: true },
                { label: "Evaluación del líder en objetivos", def: true },
                { label: "Evaluación del líder en competencias", def: true },
                { label: "Evaluación del par en competencias", def: tipo !== "90" },
                { label: "Evaluación de cliente externo (solo 360°)", def: tipo === "360" },
                { label: "Observaciones por competencia", def: true },
                { label: "Observaciones de cierre", def: true },
                { label: "Firmas obligatorias para cerrar", def: true },
              ].map((s) => (
                <label key={s.label} className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={s.def} className="mt-0.5 rounded" />
                  <span className="text-xs text-[#5A5A5A] leading-relaxed">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl px-4 py-3">
            <p className="text-[11px] text-blue-800 leading-relaxed">
              <strong>Al activar:</strong> el sistema generará automáticamente una evaluación individual por cada colaborador de la población seleccionada.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-black/8 bg-white/40">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-[#5A5A5A] bg-white border border-black/10 rounded-xl hover:bg-white/90 transition-colors"
          >
            Guardar borrador
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#1C1C1E] rounded-xl hover:bg-black transition-colors"
          >
            Activar ciclo
          </button>
        </div>
      </div>
    </>
  );
}

// ── Vista Admin/Líder: tabla de ciclos ─────────────────────────────────────

function VistaCiclos() {
  const [tab, setTab] = useState<EstadoCiclo | "todos">("activo");
  const [sheetOpen, setSheetOpen] = useState(false);

  const ciclosFiltrados = CICLOS_MOCK.filter((c) =>
    tab === "todos" ? true : c.estado === tab
  );

  // Stats del ciclo activo
  const cicloActivo = CICLOS_MOCK.find((c) => c.estado === "activo");
  const evsActivas = EVALUACIONES_MOCK.filter(
    (e) => e.cicloId === cicloActivo?.id && e.estado !== "cerrado"
  ).length;
  const evsCerradas = EVALUACIONES_MOCK.filter(
    (e) => e.cicloId === cicloActivo?.id && e.estado === "cerrado"
  ).length;
  const pendienteAccion = EVALUACIONES_MOCK.filter(
    (e) => e.cicloId === cicloActivo?.id &&
      (e.estado === "consolidado" || e.estado === "firmado_lider")
  ).length;

  const STATS = [
    { icon: BarChart3,    label: "Ciclos activos",      value: String(CICLOS_MOCK.filter((c) => c.estado === "activo").length), badge: "Ahora", badgeCls: "bg-blue-100 text-blue-700" },
    { icon: CheckCircle2, label: "Eval. totales (Q1)",  value: String(cicloActivo?.totalEvaluaciones ?? 0), badge: "Ciclo activo", badgeCls: "bg-slate-100 text-slate-600" },
    { icon: CheckCircle2, label: "Firmadas / cerradas", value: String(evsCerradas), badge: "Q1 2026", badgeCls: "bg-emerald-100 text-emerald-700" },
    { icon: AlertCircle,  label: "Requieren acción",    value: String(pendienteAccion), badge: "Pendientes", badgeCls: "bg-amber-100 text-amber-700" },
  ];

  const TABS: { key: EstadoCiclo | "todos"; label: string }[] = [
    { key: "activo",    label: "Activos"   },
    { key: "borrador",  label: "Borrador"  },
    { key: "cerrado",   label: "Cerrados"  },
    { key: "todos",     label: "Todos"     },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 gap-5 scrollbar-hide">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Evaluaciones de Desempeño</h1>
          <p className="text-sm text-[#6B6B6B] mt-0.5">Gestión de ciclos y evaluaciones individuales</p>
        </div>
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Nuevo ciclo
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s, i) => (
          <div key={i} className={`${glass} rounded-2xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/70 border border-white/80 flex items-center justify-center">
                <s.icon className="w-3.5 h-3.5 text-[#6B6B6B]" strokeWidth={1.6} />
              </div>
              <span className="text-[11px] text-[#A0A0A0]">{s.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1A1A1A]">{s.value}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${s.badgeCls}`}>{s.badge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-1 w-fit shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              tab === t.key ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tabla de ciclos */}
      <div className={`${glass} rounded-2xl overflow-hidden`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.04]">
              {["Nombre del ciclo", "Tipo", "Período", "Población", "Progreso", "Estado", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3">
                  <span className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wide whitespace-nowrap">{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ciclosFiltrados.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-[12px] text-[#A0A0A0]">
                  No hay ciclos en esta categoría.
                </td>
              </tr>
            )}
            {ciclosFiltrados.map((ciclo, i) => {
              const badge = ESTADO_CICLO[ciclo.estado];
              return (
                <tr
                  key={ciclo.id}
                  className={cn("group transition-colors hover:bg-white/40", i % 2 !== 0 && "bg-black/[0.015]")}
                >
                  {/* Nombre */}
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">{ciclo.nombre}</p>
                    <p className="text-[10px] text-[#A0A0A0] mt-0.5">{ciclo.firmadas} firmadas</p>
                  </td>

                  {/* Tipo */}
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${TIPO_BADGE[ciclo.tipo]}`}>
                      {ciclo.tipo}°
                    </span>
                  </td>

                  {/* Período */}
                  <td className="px-5 py-3.5 text-[11px] text-[#6B6B6B] whitespace-nowrap">
                    {ciclo.fechaInicio} → {ciclo.fechaLimite}
                  </td>

                  {/* Población */}
                  <td className="px-5 py-3.5">
                    <p className="text-[11px] text-[#6B6B6B]">
                      {ciclo.poblacion.niveles.map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(" · ")}
                    </p>
                    <p className="text-[10px] text-[#A0A0A0]">{ciclo.poblacion.areas.join(", ")}</p>
                  </td>

                  {/* Progreso */}
                  <td className="px-5 py-3.5">
                    <BarraProgreso value={ciclo.firmadas} total={ciclo.totalEvaluaciones} />
                    <p className="text-[9px] text-[#A0A0A0] mt-0.5">{ciclo.firmadas} / {ciclo.totalEvaluaciones} firmadas</p>
                  </td>

                  {/* Estado */}
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>

                  {/* Acción */}
                  <td className="px-3 py-3.5">
                    <Link
                      href={`/evaluaciones/${ciclo.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1C1C1E] text-white rounded-lg text-[11px] font-medium hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Ver ciclo <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <SheetNuevoCiclo open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}

// ── Vista Colaborador: mis evaluaciones ────────────────────────────────────

function VistaColaborador() {
  // Agrupa TODAS las evaluaciones del colaborador por ciclo (activas + cerradas)
  const evsPorCiclo = EVALUACIONES_MOCK
    .reduce<Record<string, EvaluacionDetalle[]>>((acc, ev) => {
      if (!acc[ev.cicloId]) acc[ev.cicloId] = [];
      acc[ev.cicloId].push(ev);
      return acc;
    }, {});

  // Ordenar: ciclos activos primero, cerrados al final
  const ciclosConEvs = Object.entries(evsPorCiclo).sort(([, aEvs], [, bEvs]) => {
    const aActivo = aEvs.some((e) => e.estado !== "cerrado");
    const bActivo = bEvs.some((e) => e.estado !== "cerrado");
    return aActivo === bActivo ? 0 : aActivo ? -1 : 1;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 gap-5 scrollbar-hide">
      <div>
        <h1 className="text-xl font-bold text-[#1A1A1A]">Mis evaluaciones</h1>
        <p className="text-sm text-[#6B6B6B] mt-0.5">Activas y cerradas · Ordenadas por urgencia</p>
      </div>

      {ciclosConEvs.length === 0 && (
        <div className={`${glass} rounded-2xl p-10 text-center`}>
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#1A1A1A]">No tienes evaluaciones pendientes</p>
          <p className="text-xs text-[#A0A0A0] mt-1">Cuando se abra un nuevo ciclo aparecerán aquí.</p>
        </div>
      )}

      {ciclosConEvs.map(([cicloId, evs]) => {
        const cicloNombre = evs[0].cicloNombre;
        const cicloActivo = evs.some((e) => e.estado !== "cerrado");
        const evsSorted = [...evs].sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));

        return (
          <div key={cicloId}>
            {/* Separador ciclo con badge de estado */}
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wider">{cicloNombre}</p>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                cicloActivo
                  ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              }`}>
                {cicloActivo ? "Activo" : "Cerrado"}
              </span>
              <div className="flex-1 h-px bg-black/6" />
            </div>

            <div className="flex flex-col gap-2">
              {evsSorted.map((ev) => {
                const badge = getBadgeEval(ev);
                const cerrado = ev.estado === "cerrado";
                const diasRestantes = Math.ceil(
                  (new Date(ev.fechaLimite).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                const urgente = diasRestantes <= 7 && !cerrado;

                return (
                  <div
                    key={ev.id}
                    className={cn(
                      `${glass} rounded-2xl p-4 flex items-center gap-4`,
                      cerrado && "opacity-70"
                    )}
                  >
                    <Avatar nombre={ev.colaborador.nombre} size={10} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[13px] font-semibold text-[#1A1A1A]">{ev.colaborador.nombre}</p>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${TIPO_BADGE[ev.tipo]}`}>
                          {ev.tipo}°
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B]">{ev.colaborador.cargo}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${badge.cls}`}>
                          {badge.label}
                        </span>
                        {cerrado && ev.puntajeFinal != null ? (
                          <span className="text-[10px] font-semibold text-[#1D9E75]">
                            {ev.puntajeFinal.toFixed(2)} / 5.00
                          </span>
                        ) : (
                          <div className={cn("flex items-center gap-1 text-[10px]", urgente ? "text-red-500" : "text-[#A0A0A0]")}>
                            {urgente && <AlertCircle className="w-3 h-3" />}
                            <Clock className="w-3 h-3" />
                            <span>Vence: {ev.fechaLimite}</span>
                            {urgente && <span className="font-bold">({diasRestantes}d)</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/evaluaciones/${ev.cicloId}/${ev.id}`}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex-shrink-0",
                        cerrado
                          ? "bg-white/60 border border-white/80 text-[#5A5A5A] hover:bg-white/80"
                          : "bg-[#1C1C1E] text-white hover:bg-black"
                      )}
                    >
                      {cerrado ? "Ver resultado" : ev.estado === "firmado_lider" ? "Firmar" : "Continuar"}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Export principal ───────────────────────────────────────────────────────

interface Props {
  esAdmin: boolean;
  esLider: boolean;
  esColaborador: boolean;
}

export function NivelCiclos({ esAdmin, esLider, esColaborador }: Props) {
  if (esColaborador && !esAdmin && !esLider) {
    return <VistaColaborador />;
  }
  return <VistaCiclos />;
}
