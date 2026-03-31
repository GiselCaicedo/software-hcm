"use client";
import { useState } from "react";
import { PLANES_DESARROLLO } from "@/lib/mock-data/pdi";
import { cn } from "@/lib/utils";
import {
  TrendingUp, Plus, MoreHorizontal, ChevronRight,
  CheckCircle2, Clock, AlertCircle, Users,
} from "lucide-react";
import { Modal, FormField, inputCls, selectCls, ModalActions } from "@/components/ui/Modal";

const glass = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]";

const ESTADO_STYLE: Record<string, { pill: string; dot: string }> = {
  "En curso":    { pill: "bg-blue-50   text-blue-700   border border-blue-200/60",   dot: "#4A7FE5" },
  "Completado":  { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200/60", dot: "#1D9E75" },
  "Atrasado":    { pill: "bg-red-50    text-red-600    border border-red-200/60",    dot: "#ef4444" },
  "Sin iniciar": { pill: "bg-gray-50   text-gray-500   border border-gray-200/60",   dot: "#A0A0A0" },
};

const NIVEL_LABELS = ["", "Básico", "En desarrollo", "Competente", "Avanzado", "Experto"];

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

const TABS = ["Todos los PDI", "En curso", "Completados", "Atrasados"];

const STATS = [
  { icon: Users,        label: "PDI activos",    value: "5",  badge: "+1 esta semana", badgeCls: "bg-blue-100 text-blue-700" },
  { icon: CheckCircle2, label: "Completados",    value: "1",  badge: "20% de avance",  badgeCls: "bg-emerald-100 text-emerald-700" },
  { icon: AlertCircle,  label: "Con retraso",   value: "1",  badge: "Requieren acción",badgeCls: "bg-red-100 text-red-600" },
  { icon: TrendingUp,   label: "Avance promedio",value: "54%",badge: "+8% vs mes ant.", badgeCls: "bg-violet-100 text-violet-700" },
];

export default function PDIPage() {
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = PLANES_DESARROLLO.filter((p) =>
    tab === 0 ? true
    : tab === 1 ? p.estado === "En curso"
    : tab === 2 ? p.estado === "Completado"
    : p.estado === "Atrasado"
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Plan de Desarrollo Individual</h1>
            <p className="text-sm text-[#6B6B6B] mt-0.5">Rutas de crecimiento · {PLANES_DESARROLLO.length} planes activos</p>
          </div>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Nuevo PDI
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

        {/* Lista PDI */}
        <div className="flex flex-col gap-3">
          {filtered.map((plan) => {
            const estilo = ESTADO_STYLE[plan.estado];
            return (
              <div key={plan.id} className={`${glass} rounded-2xl p-5 hover:bg-white/55 transition-all cursor-pointer`}>
                <div className="flex items-start gap-4">
                  <Avatar seed={plan.colaborador.seed} name={plan.colaborador.name} size={10} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[14px] font-semibold text-[#1A1A1A]">{plan.colaborador.name}</p>
                        <p className="text-[11px] text-[#6B6B6B]">{plan.colaborador.cargo} · {plan.colaborador.area}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${estilo.pill}`}>
                          <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: estilo.dot }} />
                          {plan.estado}
                        </span>
                        <button className="text-[#C0C0C0] hover:text-[#555]"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    {/* Competencia objetivo */}
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-3 h-3 text-[#8B5CF6]" strokeWidth={2} />
                      <span className="text-[12px] font-medium text-[#1A1A1A]">{plan.competenciaObjetivo}</span>
                      <span className="text-[10px] text-[#A0A0A0]">·</span>
                      <span className="text-[10px] text-[#A0A0A0]">
                        Nivel {plan.nivelActual} ({NIVEL_LABELS[plan.nivelActual]}) → {plan.nivelMeta} ({NIVEL_LABELS[plan.nivelMeta]})
                      </span>
                    </div>

                    {/* Barra de avance */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#A0A0A0]">Avance general</span>
                        <span className="text-[11px] font-bold text-[#1A1A1A]">{plan.porcentajeAvance}%</span>
                      </div>
                      <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${plan.porcentajeAvance}%`,
                            background: plan.estado === "Atrasado" ? "#ef4444" : plan.estado === "Completado" ? "#1D9E75" : "#8B5CF6",
                          }}
                        />
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {plan.acciones.map((a, ai) => {
                        const aEstilo = ESTADO_STYLE[a.estado] || ESTADO_STYLE["Sin iniciar"];
                        return (
                          <div key={ai} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 border border-white/70 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: aEstilo.dot }} />
                            <span className="text-[10px] text-[#5A5A5A] truncate max-w-[140px]">{a.descripcion}</span>
                            <span className="text-[9px] text-[#A0A0A0]">· {a.fechaLimite}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                  <p className="text-[10px] text-[#A0A0A0]">
                    Líder: <span className="font-semibold text-[#5A5A5A]">{plan.lider}</span>
                    &nbsp;·&nbsp;{plan.fechaInicio} → {plan.fechaFin}
                  </p>
                  <button className="flex items-center gap-1 text-[11px] font-medium text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors">
                    Ver detalle <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Modal Nuevo PDI ── */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo Plan de Desarrollo Individual"
        description="Define la brecha a cerrar, las acciones y el responsable de seguimiento."
        size="lg"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Colaborador" required>
              <select className={selectCls}>
                <option value="">Seleccionar colaborador</option>
                {["Valentina Morales","Sebastián Cárdenas","Daniela Forero","Andrés Mosquera","Luisa Pinzón","Carolina Nieto"].map(n => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Líder de seguimiento" required>
              <select className={selectCls}>
                <option value="">Seleccionar líder</option>
                {["Alejandra Ríos","Jorge Palacios","Patricia Suárez","Ricardo Bermúdez"].map(l => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Competencia objetivo" required>
            <select className={selectCls}>
              <option value="">Seleccionar competencia</option>
              {["Liderazgo de equipos","Gestión de proyectos ágiles","Análisis financiero avanzado","Negociación avanzada","Comunicación asertiva","Manejo de herramientas digitales"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Nivel actual (1-5)">
              <select className={selectCls}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {["","Básico","En desarrollo","Competente","Avanzado","Experto"][n]}</option>)}
              </select>
            </FormField>
            <FormField label="Nivel meta (1-5)">
              <select className={selectCls}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {["","Básico","En desarrollo","Competente","Avanzado","Experto"][n]}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Fecha de inicio" required>
              <input type="date" className={inputCls} />
            </FormField>
            <FormField label="Fecha de cierre" required>
              <input type="date" className={inputCls} />
            </FormField>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-[#1A1A1A]">Acciones de desarrollo</p>
            {["Acción 1"].map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 bg-white/60 border border-white/80 rounded-xl p-3">
                <input className={inputCls} placeholder="Descripción de la acción (Ej. Curso de liderazgo)" />
                <select className={`${selectCls} w-32`}>
                  <option>Formación</option>
                  <option>Mentoría</option>
                  <option>Proyecto</option>
                  <option>Lectura</option>
                </select>
                <input type="date" className={`${inputCls} w-36`} />
              </div>
            ))}
            <button className="flex items-center gap-1.5 text-xs text-[#8B5CF6] font-medium hover:underline w-fit">
              <Plus className="w-3 h-3" /> Agregar acción
            </button>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
            <strong>¿Por qué crear un PDI?</strong> Los PDIs surgen de las brechas detectadas en las evaluaciones. Cerrar una brecha de competencia requiere acciones concretas y un responsable de seguimiento.
          </div>
        </div>
        <ModalActions onClose={() => setModalOpen(false)} submitLabel="Crear PDI" />
      </Modal>

    </div>
  );
}
