"use client";
import { useState } from "react";
import { BRECHAS, COLABORADORES_EN_BRECHA } from "@/lib/mock-data/brechas";
import { cn } from "@/lib/utils";
import {
  GitCompare, AlertTriangle, TrendingDown, TrendingUp, Minus,
  MoreHorizontal, ChevronRight, Users,
} from "lucide-react";

const glass = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";

const CATEGORIA_STYLE: Record<string, string> = {
  "Técnica":     "bg-blue-50   text-blue-700",
  "Conductual":  "bg-violet-50 text-violet-700",
  "Liderazgo":   "bg-[#1C1C1E] text-white",
};

const TENDENCIA_ICON = {
  mejorando:   { icon: TrendingUp,   cls: "text-emerald-600", label: "Mejorando" },
  estable:     { icon: Minus,        cls: "text-amber-600",   label: "Estable"   },
  empeorando:  { icon: TrendingDown, cls: "text-red-500",     label: "Empeorando"},
};

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-pink-500",
  "from-rose-400 to-pink-500",
];

function Avatar({ seed, name, size = 9 }: { seed: string; name: string; size?: number }) {
  const colorIdx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_COLORS.length;
  return (
    <div className="relative flex-shrink-0" style={{ width: size * 4, height: size * 4 }}>
      <img
        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=FF6A1A,FF4500,C03000,6B0080&backgroundType=gradientLinear`}
        alt={name}
        className="rounded-full object-cover w-full h-full border border-white shadow-sm"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const fb = el.nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div className={`rounded-full absolute inset-0 bg-gradient-to-br ${AVATAR_COLORS[colorIdx]} items-center justify-center text-white font-bold hidden text-xs`}>
        {name.charAt(0)}
      </div>
    </div>
  );
}

function NivelDots({ nivel, max = 5 }: { nivel: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={cn("w-2 h-2 rounded-full", i < Math.round(nivel) ? "bg-[#8B5CF6]" : "bg-black/10")} />
      ))}
    </div>
  );
}

const TABS = ["Todas las brechas", "Técnicas", "Conductuales", "Liderazgo"];
const STATS = [
  { icon: GitCompare,    label: "Brechas identificadas", value: "8",   badge: "Total",          badgeCls: "bg-blue-100 text-blue-700" },
  { icon: AlertTriangle, label: "Críticas (>1.2)",       value: "4",   badge: "Requieren PDI",  badgeCls: "bg-red-100 text-red-600" },
  { icon: Users,         label: "Colaboradores afect.",  value: "47",  badge: "Q1 2026",        badgeCls: "bg-violet-100 text-violet-700" },
  { icon: TrendingDown,  label: "Brecha promedio",       value: "1.1", badge: "En 5 pts",       badgeCls: "bg-amber-100 text-amber-700" },
];

export default function BrechasPage() {
  const [tab, setTab] = useState(0);

  const filtered = BRECHAS.filter((b) =>
    tab === 0 ? true
    : tab === 1 ? b.categoria === "Técnica"
    : tab === 2 ? b.categoria === "Conductual"
    : b.categoria === "Liderazgo"
  ).sort((a, b) => b.brecha - a.brecha);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Brechas de Competencia</h1>
            <p className="text-sm text-[#6B6B6B] mt-0.5">Análisis de déficit · Ciclo Q1 2026</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-sm">
            Exportar reporte
          </button>
        </div>

        {/* Stats */}
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

        {/* Layout: tabla izq + colaboradores der */}
        <div className="grid grid-cols-[1fr_280px] gap-4 items-start">

          {/* Tabla de brechas */}
          <div className="flex flex-col gap-3">
            {/* Tabs */}
            <div className="flex bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-1 shadow-sm w-fit gap-0.5">
              {TABS.map((t, i) => (
                <button key={i} onClick={() => setTab(i)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                    tab === i ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                  )}>
                  {t}
                </button>
              ))}
            </div>

            <div className={`${glass} rounded-2xl overflow-hidden`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.04]">
                    {["Competencia", "Categoría", "Nivel req.", "Nivel actual", "Brecha", "Afectados", "Tendencia"].map((h) => (
                      <th key={h} className="text-left px-4 py-3">
                        <span className="text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wide whitespace-nowrap">{h}</span>
                      </th>
                    ))}
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => {
                    const tend = TENDENCIA_ICON[b.tendencia];
                    const TendIcon = tend.icon;
                    const escritic = b.brecha >= 1.2;
                    return (
                      <tr key={b.id} className={cn("group transition-colors hover:bg-white/40", i % 2 !== 0 && "bg-black/[0.015]")}>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            {escritic && <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />}
                            <span className="text-[12px] font-semibold text-[#1A1A1A]">{b.competencia}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${CATEGORIA_STYLE[b.categoria]}`}>{b.categoria}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <NivelDots nivel={b.nivelRequerido} />
                        </td>
                        <td className="px-4 py-3.5">
                          <NivelDots nivel={b.nivelPromedio} />
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={cn("text-[13px] font-bold", escritic ? "text-red-500" : "text-amber-600")}>
                            -{b.brecha.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#A0A0A0]" />
                            <span className="text-[12px] font-semibold text-[#1A1A1A]">{b.colaboradoresAfectados}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className={`flex items-center gap-1 ${tend.cls}`}>
                            <TendIcon className="w-3.5 h-3.5" strokeWidth={2} />
                            <span className="text-[10px] font-semibold">{tend.label}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3.5">
                          <button className="w-6 h-6 flex items-center justify-center text-[#C0C0C0] hover:text-[#555] opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel lateral: colaboradores con brechas */}
          <div className={`${glass} rounded-2xl p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-semibold text-[#1A1A1A]">Colaboradores con mayor déficit</h3>
              <button className="text-[10px] text-[#8B5CF6] font-medium">Ver todos</button>
            </div>
            <div className="flex flex-col gap-3">
              {COLABORADORES_EN_BRECHA.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-black/5 last:border-0 last:pb-0">
                  <Avatar seed={c.seed} name={c.name} size={8} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1A1A1A] truncate">{c.name}</p>
                    <p className="text-[10px] text-[#A0A0A0] truncate mb-1.5">{c.cargo}</p>
                    {c.brechas.map((b, bi) => (
                      <div key={bi} className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#5A5A5A] truncate max-w-[130px]">{b.competencia}</span>
                        <span className="text-[10px] font-bold text-red-500 flex-shrink-0 ml-1">
                          {b.nivel}/{b.requerido}
                        </span>
                      </div>
                    ))}
                    <button className="flex items-center gap-0.5 text-[10px] text-[#8B5CF6] font-medium mt-1">
                      Crear PDI <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
