"use client";
import { useState } from "react";
import Link from "next/link";
import { EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import {
  MoreHorizontal, List, LayoutGrid, Plus,
  Search, ChevronDown, Clock, ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Estilos de estado ──────────────────────────────────────
const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  "En Curso":  { pill: "bg-[#f0f4ff] text-[#4A7FE5] border border-[#4A7FE5]/20", dot: "#4A7FE5" },
  "Enviada":   { pill: "bg-[#f5f0ff] text-[#8B5CF6] border border-[#8B5CF6]/20", dot: "#8B5CF6" },
  "Calificada":{ pill: "bg-[#f0fdf4] text-[#16a34a] border border-[#16a34a]/20", dot: "#16a34a" },
  "Firmada":   { pill: "bg-[#f5f5f5] text-[#6B6B6B] border border-black/10",     dot: "#A0A0A0" },
  "Pendiente": { pill: "bg-[#fff7ed] text-[#ea580c] border border-[#ea580c]/20",  dot: "#ea580c" },
};

const FUENTE_STYLE: Record<string, string> = {
  "Autoevaluación":      "bg-[#f5f5f5] text-[#555]",
  "Evaluación 360°":     "bg-[#edf4ff] text-[#4A7FE5]",
  "Evaluación de pares": "bg-[#f5f0ff] text-[#8B5CF6]",
};

function UserAvatar({ name, seed, size = 8 }: { name: string; seed?: string; size?: number }) {
  const AVATAR_COLORS = [
    "from-[#FF6A1A] to-[#6B0080]",
    "from-violet-500 to-purple-600",
    "from-blue-400 to-cyan-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-pink-500",
    "from-amber-400 to-orange-500",
  ];
  const colorIdx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_COLORS.length;
  const s = seed || name;
  return (
    <div className="relative flex-shrink-0" style={{ width: size * 4, height: size * 4 }}>
      <img
        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(s)}&backgroundColor=FF6A1A,FF4500,C03000,6B0080&backgroundType=gradientLinear`}
        alt={name}
        className="rounded-full object-cover w-full h-full border border-white shadow-sm"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const fb = el.nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div className={`rounded-full absolute inset-0 bg-gradient-to-br ${AVATAR_COLORS[colorIdx]} items-center justify-center text-white font-bold hidden`}
        style={{ fontSize: size * 1.4 }}>
        {name.charAt(0)}
      </div>
    </div>
  );
}

function AvatarStack({ users }: { users: { name: string }[] }) {
  return (
    <div className="flex items-center">
      {users.slice(0, 3).map((u, i) => (
        <div key={i} className="relative" style={{ marginLeft: i === 0 ? 0 : -8, zIndex: users.length - i }}>
          <UserAvatar name={u.name} size={6} />
        </div>
      ))}
      {users.length > 3 && (
        <div className="w-6 h-6 rounded-full bg-[#F0F0F0] border border-white flex items-center justify-center text-[9px] font-bold text-[#888]" style={{ marginLeft: -8, zIndex: 0 }}>
          +{users.length - 3}
        </div>
      )}
    </div>
  );
}

const PAGE_SIZE = 8;

export default function EvaluacionesPage() {
  const [view, setView]           = useState<"list" | "cards">("list");
  const [search, setSearch]       = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [filterFuente, setFilterFuente] = useState("Todas");
  const [page, setPage]           = useState(1);

  const estados = ["Todos", "En Curso", "Pendiente", "Calificada", "Enviada", "Firmada"];
  const fuentes = ["Todas", "Autoevaluación", "Evaluación 360°", "Evaluación de pares"];

  const filtered = EVALUACIONES.filter((ev) => {
    const matchSearch = ev.empleado.name.toLowerCase().includes(search.toLowerCase()) ||
                        ev.empleado.cargo.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado === "Todos" || ev.estado === filterEstado;
    const matchFuente = filterFuente === "Todas" || ev.fuente === filterFuente;
    return matchSearch && matchEstado && matchFuente;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const COLS = [
    { label: "Empleado",             key: "empleado" },
    { label: "Líder del proceso",    key: "lider"    },
    { label: "Pares",                key: "pares"    },
    { label: "Eval. activas",        key: "activas"  },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A] mb-0.5">Evaluaciones de Empleados</h1>
            <p className="text-sm text-[#6B6B6B]">Ciclo activo Q1 2026 · {filtered.length} registros</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-1 shadow-sm">
              <button onClick={() => setView("list")} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", view === "list" ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]")}>
                <List className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setView("cards")} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", view === "cards" ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]")}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link href="/formulario" className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Nueva
            </Link>
          </div>
        </div>

        {/* ── Filtros ── */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[200px] max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A0A0A0]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Buscar empleado..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl focus:outline-none focus:border-white/80 transition-colors"
            />
          </div>

          {/* Filtro estado */}
          <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl px-1 py-1 shadow-sm">
            {estados.map((e) => (
              <button
                key={e}
                onClick={() => { setFilterEstado(e); setPage(1); }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap",
                  filterEstado === e
                    ? "bg-[#1C1C1E] text-white"
                    : "text-[#6B6B6B] hover:bg-[#F5F5F5]"
                )}
              >
                {e}
              </button>
            ))}
          </div>

          {/* Filtro fuente */}
          <div className="relative">
            <select
              value={filterFuente}
              onChange={(e) => { setFilterFuente(e.target.value); setPage(1); }}
              className="appearance-none pl-3 pr-7 py-2 text-xs bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl focus:outline-none cursor-pointer text-[#555]"
            >
              {fuentes.map((f) => <option key={f}>{f}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#A0A0A0] pointer-events-none" />
          </div>
        </div>

        {view === "list" ? (
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* fade inferior */}
            <div className="relative">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.04]">
                    {COLS.map((col) => (
                      <th key={col.key} className="text-left px-5 py-3">
                        <button className="flex items-center gap-1 text-[11px] font-semibold text-[#A0A0A0] uppercase tracking-wide hover:text-[#555] transition-colors whitespace-nowrap">
                          {col.label} <ChevronsUpDown className="w-3 h-3" />
                        </button>
                      </th>
                    ))}
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {paged.map((ev, idx) => (
                    <tr key={ev.id} className={cn("group transition-colors", idx % 2 === 0 ? "bg-transparent" : "bg-black/[0.02]", "hover:bg-white/40")}>
                    {/* Empleado */}
                    <td className="px-5 py-3.5">
                      <Link href={`/evaluaciones/${ev.id}`} className="flex items-center gap-3 min-w-[160px]">
                        <UserAvatar name={ev.empleado.name} size={9} />
                        <div>
                          <p className="text-[13px] font-semibold text-[#1A1A1A] leading-tight">{ev.empleado.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-[#C0C0C0]" />
                            <p className="text-[10px] text-[#A0A0A0]">{ev.fecha}</p>
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Líder */}
                    <td className="px-5 py-3.5">
                      {ev.lider ? (
                        <div className="flex items-center gap-2">
                          <UserAvatar name={ev.lider.name} size={7} />
                          <div>
                            <p className="text-[11px] font-semibold text-[#1A1A1A] leading-tight whitespace-nowrap">{ev.lider.name}</p>
                            <p className="text-[10px] text-[#A0A0A0]">{ev.lider.cargo}</p>
                          </div>
                        </div>
                      ) : <span className="text-[#C0C0C0] text-xs">—</span>}
                    </td>

                    {/* Pares */}
                    <td className="px-5 py-3.5">
                      {ev.pares && ev.pares.length > 0
                        ? <AvatarStack users={ev.pares} />
                        : <span className="text-[#C0C0C0] text-xs">—</span>
                      }
                    </td>

                    {/* Evaluaciones activas */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-black/8 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(((ev.evaluacionesActivas || 0) / 6) * 100, 100)}%`,
                              background: "#4A7FE5",
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-[#1A1A1A]">{ev.evaluacionesActivas ?? 0}</span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-3 py-3.5">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#C0C0C0] hover:text-[#555] hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* gradiente fade inferior */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />
            </div>

            {/* ── Paginación ── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-black/6 bg-white/20">
              <p className="text-[11px] text-[#A0A0A0]">{filtered.length} resultados</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#6B6B6B] hover:bg-[#F0F0F0] rounded-lg disabled:opacity-30 transition-colors"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-7 h-7 text-[11px] rounded-lg font-medium transition-all",
                      p === page ? "bg-[#1C1C1E] text-white" : "text-[#6B6B6B] hover:bg-[#F0F0F0]"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#6B6B6B] hover:bg-[#F0F0F0] rounded-lg disabled:opacity-30 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Cards view */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ev) => (
              <Link key={ev.id} href={`/evaluaciones/${ev.id}`}
                className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl p-5 hover:bg-white/55 transition-all cursor-pointer block">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={ev.empleado.name} size={10} />
                    <div>
                      <p className="font-semibold text-sm text-[#1A1A1A]">{ev.empleado.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{ev.empleado.cargo}</p>
                    </div>
                  </div>
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold", STATUS_STYLES[ev.estado]?.pill)}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_STYLES[ev.estado]?.dot }} />
                    {ev.estado}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[#6B6B6B] mb-3">
                  <p>Fuente: <span className="text-[#1A1A1A] font-medium">{ev.fuente}</span></p>
                  {ev.lider && <p>Líder: <span className="text-[#1A1A1A] font-medium">{ev.lider.name}</span></p>}
                </div>
                {ev.pares && ev.pares.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-[#A0A0A0]">Pares:</span>
                    <AvatarStack users={ev.pares} />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4A7FE5] rounded-full" style={{ width: `${ev.calificacion}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">{ev.calificacion}%</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
