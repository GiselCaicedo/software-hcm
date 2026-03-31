"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { calcularProgresoParticipantes, calcularPuntajeFinal, colorProgreso } from "@/lib/calculos";
import { EVALUACIONES_MOCK } from "@/mock/evaluaciones";
import type { EvaluacionDetalle, EstadoEvaluacion } from "@/types/evaluaciones";
import {
  MoreHorizontal, Search, ChevronRight, AlertCircle,
  BarChart3, CheckCircle2, Clock, Users,
} from "lucide-react";

const glass = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";

const ESTADO_BADGE: Record<EstadoEvaluacion, { cls: string; label: string }> = {
  borrador:      { cls: "bg-gray-100 text-gray-500",                                  label: "Borrador"      },
  en_progreso:   { cls: "bg-blue-50 text-blue-700 border border-blue-200/60",         label: "En progreso"   },
  consolidado:   { cls: "bg-amber-50 text-amber-700 border border-amber-200/60",      label: "Consolidado"   },
  firmado_lider: { cls: "bg-orange-50 text-orange-700 border border-orange-200/60",   label: "Firmado líder" },
  cerrado:       { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",label: "Cerrado"       },
};

const TIPO_BADGE: Record<string, string> = {
  "90":  "bg-slate-100 text-slate-600",
  "180": "bg-blue-50 text-blue-700",
  "360": "bg-violet-50 text-violet-700",
};

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600", "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",  "from-orange-400 to-pink-500",
  "from-rose-400 to-pink-500",
];

function Avatar({ nombre, size = 9 }: { nombre: string; size?: number }) {
  const colorIdx = (nombre.charCodeAt(0) + (nombre.charCodeAt(1) || 0)) % AVATAR_COLORS.length;
  const seed = encodeURIComponent(nombre);
  return (
    <div className="relative flex-shrink-0" style={{ width: size * 4, height: size * 4 }}>
      <img
        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=FF6A1A,FF4500,C03000,6B0080&backgroundType=gradientLinear`}
        alt={nombre}
        className="rounded-full object-cover w-full h-full border border-white shadow-sm"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div className={`rounded-full absolute inset-0 bg-gradient-to-br ${AVATAR_COLORS[colorIdx]} items-center justify-center text-white font-bold hidden text-xs`}>
        {nombre.charAt(0)}
      </div>
    </div>
  );
}

function BarraProgreso({ pct }: { pct: number }) {
  const color = colorProgreso(pct);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-semibold text-[#1A1A1A]">{pct}%</span>
    </div>
  );
}

const TABS = ["Mis evaluaciones", "Mi equipo", "Todos los ciclos", "Historial"] as const;

interface Props {
  esLider: boolean;
  esColaborador: boolean;
  esAdmin: boolean;
  userId?: string;
}

export function ListaEvaluaciones({ esLider, esColaborador, esAdmin, userId }: Props) {
  const [tabIdx, setTabIdx] = useState(0);
  const [search, setSearch] = useState("");

  // Filtrar por tab
  const filterByTab = (ev: EvaluacionDetalle): boolean => {
    if (tabIdx === 0) return ev.estado !== "cerrado"; // activas
    if (tabIdx === 1) return esLider || esAdmin;       // equipo
    if (tabIdx === 2) return esAdmin;                  // todos
    if (tabIdx === 3) return ev.estado === "cerrado";  // historial
    return true;
  };

  const filtered = EVALUACIONES_MOCK
    .filter(filterByTab)
    .filter((ev) => {
      if (!search) return true;
      return (
        ev.colaborador.nombre.toLowerCase().includes(search.toLowerCase()) ||
        ev.colaborador.cargo.toLowerCase().includes(search.toLowerCase()) ||
        ev.cicloNombre.toLowerCase().includes(search.toLowerCase())
      );
    });

  // Stat cards
  const activas    = EVALUACIONES_MOCK.filter((e) => e.estado === "en_progreso").length;
  const cerradas   = EVALUACIONES_MOCK.filter((e) => e.estado === "cerrado").length;
  const pendFirma  = EVALUACIONES_MOCK.filter((e) => e.estado === "consolidado" || e.estado === "firmado_lider").length;
  const puntajes   = EVALUACIONES_MOCK.filter((e) => e.puntajeFinal).map((e) => e.puntajeFinal!);
  const promedio   = puntajes.length ? (puntajes.reduce((a, b) => a + b, 0) / puntajes.length).toFixed(2) : "—";

  const STATS = [
    { icon: BarChart3,    label: "Activas este ciclo",  value: String(activas),  badge: "Q1 2026",           badgeCls: "bg-blue-100 text-blue-700" },
    { icon: CheckCircle2, label: "Cerradas / firmadas",  value: String(cerradas), badge: "Este año",          badgeCls: "bg-emerald-100 text-emerald-700" },
    { icon: Clock,        label: "Pendientes de firma",  value: String(pendFirma),badge: "Requieren acción",  badgeCls: "bg-amber-100 text-amber-700" },
    { icon: Users,        label: "Promedio del ciclo",   value: String(promedio), badge: "Sobre 5.0",         badgeCls: "bg-violet-100 text-violet-700" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 gap-5 scrollbar-hide">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Evaluaciones de Desempeño</h1>
          <p className="text-sm text-[#6B6B6B] mt-0.5">Ciclo activo: Q1 2026 · {filtered.length} registros</p>
        </div>
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

      {/* Tabs + buscador */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-1 shadow-sm gap-0.5">
          {TABS.map((t, i) => {
            if ((t === "Mi equipo" || t === "Todos los ciclos") && esColaborador) return null;
            if (t === "Todos los ciclos" && !esAdmin) return null;
            return (
              <button key={i} onClick={() => setTabIdx(i)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                  tabIdx === i ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                )}>
                {t}
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A0A0A0]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar colaborador o ciclo..."
            className="pl-8 pr-4 py-2 text-xs bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl w-60 focus:outline-none" />
        </div>
      </div>

      {/* Tabla */}
      <div className={`${glass} rounded-2xl overflow-hidden`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.04]">
              {["Colaborador", "Tipo", "Ciclo", "Estado", "Progreso", "Fecha límite", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3">
                  <span className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wide">{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-[12px] text-[#A0A0A0]">
                  No hay evaluaciones para mostrar en esta vista.
                </td>
              </tr>
            )}
            {filtered.map((ev, i) => {
              const progreso      = calcularProgresoParticipantes(ev);
              const estadoBadge   = ESTADO_BADGE[ev.estado];
              const diasRestantes = Math.ceil(
                (new Date(ev.fechaLimite).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              const urgente = diasRestantes <= 7 && ev.estado !== "cerrado";

              return (
                <tr key={ev.id} className={cn("group transition-colors hover:bg-white/40", i % 2 !== 0 && "bg-black/[0.015]")}>
                  {/* Colaborador */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar nombre={ev.colaborador.nombre} size={9} />
                      <div>
                        <p className="text-[13px] font-semibold text-[#1A1A1A]">{ev.colaborador.nombre}</p>
                        <p className="text-[10px] text-[#A0A0A0]">{ev.colaborador.cargo}</p>
                      </div>
                    </div>
                  </td>

                  {/* Tipo */}
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${TIPO_BADGE[ev.tipo]}`}>
                      {ev.tipo}°
                    </span>
                  </td>

                  {/* Ciclo */}
                  <td className="px-5 py-3.5 text-[11px] text-[#6B6B6B] max-w-[160px] truncate">{ev.cicloNombre}</td>

                  {/* Estado */}
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${estadoBadge.cls}`}>
                      {estadoBadge.label}
                    </span>
                  </td>

                  {/* Progreso */}
                  <td className="px-5 py-3.5">
                    <BarraProgreso pct={progreso} />
                  </td>

                  {/* Fecha límite */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {urgente && <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />}
                      <div>
                        <p className={cn("text-[11px] font-medium", urgente ? "text-red-500" : "text-[#5A5A5A]")}>
                          {ev.fechaLimite}
                        </p>
                        {urgente && (
                          <p className="text-[9px] text-red-400">{diasRestantes}d restantes</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="px-3 py-3.5">
                    <Link
                      href={`/evaluaciones/${ev.cicloId}/${ev.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1C1C1E] text-white rounded-lg text-[11px] font-medium hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {ev.estado === "en_progreso" ? "Continuar" : "Ver detalle"}
                      <ChevronRight className="w-3 h-3" />
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
