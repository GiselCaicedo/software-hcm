"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getCargoById } from "@/lib/mock-data/cargos";
import { getCompetenciasPorNivel } from "@/lib/mock-data/competencias";
import { useTopBarActions } from "@/stores/topBarActionsStore";
import { cn } from "@/lib/utils";

const NIVEL_BADGE: Record<string, { pill: string; dot: string }> = {
  operativo: { pill: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  tactico: { pill: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
  estrategico: { pill: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
};

const SECCIONES = [
  { id: "mision", label: "Misión" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "formacion", label: "Formación" },
  { id: "responsabilidades", label: "Responsabilidades" },
  { id: "autonomia", label: "Autonomía" },
  { id: "relaciones", label: "Relaciones" },
  { id: "competencias", label: "Competencias" },
];

export default function CargoDetallePage() {
  const { cargoId } = useParams<{ cargoId: string }>();
  const router = useRouter();
  const cargo = getCargoById(cargoId);
  const setActions = useTopBarActions((s) => s.setActions);
  const [activeSection, setActiveSection] = useState("mision");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Registrar acciones contextuales en el TopBar (Editar / Ver evaluaciones)
  useEffect(() => {
    setActions({
      openImport: () => router.push("/evaluaciones"),
      openIA: () => alert("Funcionalidad en desarrollo"),
    });
    return () => setActions(null);
  }, [setActions, router]);

  // Scroll spy
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECCIONES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [cargo]);

  if (!cargo) {
    return (
      <div className="pl-20 pr-8 pt-8 text-center">
        <p className="text-gray-500">Cargo no encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-blue-600 hover:underline">← Volver</button>
      </div>
    );
  }

  const badge = NIVEL_BADGE[cargo.nivel];
  const competenciasOrg = getCompetenciasPorNivel(cargo.nivel);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pr-0 pt-6 pb-8 flex gap-0">

      {/* ── Sidebar de navegación fijo ─────────────────────────────────── */}
      <aside className="w-52 flex-shrink-0 sticky top-6 self-start pl-4 pr-2">
        {/* Identidad del cargo */}
        <div className="mb-5">
          <button
            onClick={() => router.back()}
            className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-3 transition-colors"
          >
            ← Perfiles de cargo
          </button>
          <h2 className="text-sm font-bold text-[#1C1C1E] leading-snug">{cargo.denominacion}</h2>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", badge.pill)}>
              {cargo.nivel}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">{cargo.codigo}</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{cargo.area} · Banda {cargo.bandaSalarial}</p>
        </div>

        {/* Nav por secciones */}
        <nav className="space-y-0.5">
          {SECCIONES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all",
                activeSection === id
                  ? "bg-[#1C1C1E] text-white font-medium"
                  : "text-gray-500 hover:text-[#1C1C1E] hover:bg-black/5"
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Acciones */}
        <div className="mt-6 space-y-2">
          <button
            onClick={() => alert("Funcionalidad en desarrollo")}
            className="w-full py-2 text-xs border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
          >
            Editar perfil
          </button>
          <button
            onClick={() => router.push("/evaluaciones")}
            className="w-full py-2 text-xs bg-[#1C1C1E] text-white rounded-xl hover:bg-black/80 transition-colors"
          >
            Ver evaluaciones
          </button>
        </div>
      </aside>

      {/* ── Contenido principal ───────────────────────────────────────── */}
      <main className="flex-1 min-w-0 pr-8 space-y-10 overflow-y-auto">

        {/* ── MISIÓN ─────────────────────────────────────────────────── */}
        <section id="mision" className="scroll-mt-6">
          <SectionLabel>Misión del cargo</SectionLabel>
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
          >
            <p className="text-[#1C1C1E] leading-relaxed text-sm">{cargo.mision}</p>
          </div>
        </section>

        {/* ── NATURALEZA + FORMACIÓN + EXPERIENCIA + DIMENSIÓN en grid 2x2 */}
        <section id="naturaleza" className="scroll-mt-6">
          <SectionLabel>Naturaleza del cargo</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <GlassCard>
              <FieldStack label="Nivel jerárquico">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize", badge.pill)}>
                  {cargo.nivel}
                </span>
              </FieldStack>
            </GlassCard>
            <GlassCard>
              <FieldStack label="Área" value={cargo.area} />
            </GlassCard>
            <GlassCard>
              <FieldStack label="Banda salarial" value={cargo.bandaSalarial} />
            </GlassCard>
            <GlassCard>
              <FieldStack label="Personas a cargo">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-[#1C1C1E]">{cargo.personasACargo}</span>
                  <span className="text-xs text-gray-400 mb-0.5">personas</span>
                </div>
              </FieldStack>
            </GlassCard>
          </div>
        </section>

        {/* ── FORMACIÓN + EXPERIENCIA side-by-side ──────────────────── */}
        <section id="formacion" className="scroll-mt-6">
          <SectionLabel>Formación y experiencia</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Nivel académico</p>
              <p className="text-sm text-[#1C1C1E] font-medium">{cargo.nivelAcademico}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-3 mb-1">Carreras afines</p>
              <p className="text-xs text-gray-600">{cargo.carrerasAfines}</p>
            </GlassCard>
            <GlassCard>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Experiencia requerida</p>
              <p className="text-2xl font-bold text-[#1C1C1E]">{cargo.tiempoExperiencia}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-3 mb-1">Áreas de experiencia</p>
              <p className="text-xs text-gray-600">{cargo.areasExperiencia}</p>
            </GlassCard>
          </div>
        </section>

        {/* ── RESPONSABILIDADES — cards en columna, una por resp. ───── */}
        <section id="responsabilidades" className="scroll-mt-6">
          <SectionLabel>Responsabilidades clave</SectionLabel>
          <div className="space-y-4">
            {cargo.responsabilidades.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
              >
                {/* Cabecera de la responsabilidad */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0", badge.dot)}>
                      {i + 1}
                    </div>
                    <p className="font-semibold text-[#1C1C1E] text-sm">{r.que}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{r.tipoFuncion}</span>
                    <span className="text-lg font-bold text-[#1C1C1E]">{(r.ponderacion * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Grid de detalles 3 columnas */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Cómo</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.como}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Cuándo</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.cuando}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Para qué</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.paraQue}</p>
                  </div>
                </div>

                {/* Objetivo SMART — destacado */}
                <div className="bg-black/[0.03] rounded-xl p-3 mb-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Objetivo SMART</p>
                  <p className="text-xs text-[#1C1C1E] leading-relaxed font-medium">{r.objetivoSMART}</p>
                </div>

                {/* KPI + Fórmula */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Indicador</p>
                    <p className="text-xs text-gray-600">{r.indicador}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Fórmula de medición</p>
                    <p className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">{r.formulaMedicion}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Barra de ponderación total */}
            <div className="flex items-center gap-2 px-1">
              {cargo.responsabilidades.map((r, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={cn("h-1.5 w-full rounded-full", badge.dot)}
                    style={{ opacity: 0.4 + i * 0.2 }}
                  />
                  <span className="text-[10px] text-gray-400">{(r.ponderacion * 100).toFixed(0)}%</span>
                </div>
              ))}
              <div className="text-xs font-bold text-[#1C1C1E] ml-2">100%</div>
            </div>
          </div>
        </section>

        {/* ── AUTONOMÍA ─────────────────────────────────────────────── */}
        <section id="autonomia" className="scroll-mt-6">
          <SectionLabel>Autonomía en decisiones</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard>
              <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wide mb-3">Decide de forma autónoma</p>
              <ul className="space-y-2">
                {cargo.autonomia.autonoma.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide mb-3">Consulta antes de decidir</p>
              <ul className="space-y-2">
                {cargo.autonomia.consultada.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">↗</span>
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </section>

        {/* ── RELACIONES ────────────────────────────────────────────── */}
        <section id="relaciones" className="scroll-mt-6">
          <SectionLabel>Relaciones del cargo</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard>
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-3">Internas</p>
              <div className="space-y-3">
                {cargo.relaciones.internas.map((r, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-[#1C1C1E]">{r.con}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{r.proposito}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-3">Externas</p>
              <div className="space-y-3">
                {cargo.relaciones.externas.map((r, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-[#1C1C1E]">{r.con}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{r.proposito}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── COMPETENCIAS ──────────────────────────────────────────── */}
        <section id="competencias" className="scroll-mt-6 pb-16">
          <SectionLabel>Competencias esperadas</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {competenciasOrg.map((comp) => (
              <div
                key={comp.id}
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <p className="text-sm font-semibold text-[#1C1C1E] leading-snug">{comp.nombre}</p>
                  <span className="text-sm font-bold text-gray-400 flex-shrink-0 ml-2">{comp.peso}%</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{comp.definicion}</p>
                <div className="mt-3 space-y-1">
                  {comp.comportamientos.slice(0, 2).map((b, i) => (
                    <p key={i} className="text-[10px] text-gray-400 flex items-start gap-1">
                      <span className="flex-shrink-0 mt-0.5">·</span>{b}
                    </p>
                  ))}
                  {comp.comportamientos.length > 2 && (
                    <p className="text-[10px] text-gray-300">+{comp.comportamientos.length - 2} más</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {cargo.competenciasAdicionales.length > 0 && (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {cargo.competenciasAdicionales.map((comp, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 border-dashed"
                  style={{ background: "rgba(255,255,255,0.35)", border: "1px dashed rgba(0,0,0,0.12)" }}
                >
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Específica del cargo</p>
                  <p className="text-sm font-semibold text-[#1C1C1E]">{comp.nombre}</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{comp.definicion}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

// ── Componentes auxiliares ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold text-black-400 uppercase tracking-widest mb-3">
      {children}
    </h2>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.80)",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function FieldStack({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      {children ?? <p className="text-sm text-[#1C1C1E] font-medium">{value}</p>}
    </div>
  );
}
