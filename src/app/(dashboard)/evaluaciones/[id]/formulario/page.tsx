"use client";
import { use, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getEvaluacionParticipante, MOCK_EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { MOCK_COMPETENCIAS, getCompetenciasPorNivel, getComportamientosPorNivel } from "@/lib/mock-data/competencias";
import { getUserById } from "@/lib/mock-data/users";
import { useAuthStore } from "@/stores/authStore";
import { ButtonLink } from "@/components/ui/button-link";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send, Lock, Info, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ObjetivoEvaluado, Competencia } from "@/types";

// ─── Tipos locales ────────────────────────────────────────────────────────────
type Rol = "lider" | "evaluado" | "th";

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
  { key: "config",    label: "Objetivos cargados por TH" },
  { key: "autocalif", label: "Autocalificación evaluado" },
  { key: "lider",     label: "Calificación líder" },
  { key: "comentarios", label: "Comentarios y firma" },
  { key: "cierre",    label: "Cierre TH" },
];
const ESTADO_TO_STEP: Record<string, number> = {
  configuracion: 0,
  autocalificacion: 1,
  calificacion_lider: 2,
  pares: 2,
  revision_th: 3,
  cerrada: 4,
};

function FormStepper({ estadoEv }: { estadoEv: string }) {
  const current = ESTADO_TO_STEP[estadoEv] ?? 0;
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-200 mb-6">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={step.key}
            className={cn(
              "flex-1 px-3 py-2 text-center text-xs border-r border-gray-200 last:border-r-0 flex items-center justify-center gap-1.5",
              done && "bg-green-50 text-green-700 font-medium",
              active && "bg-white text-gray-900 font-medium",
              !done && !active && "bg-gray-50 text-gray-400"
            )}
          >
            {done && <CheckCircle className="h-3 w-3 shrink-0" />}
            {active && <ChevronRight className="h-3 w-3 shrink-0 text-blue-500" />}
            {!done && !active && <Clock className="h-3 w-3 shrink-0" />}
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Estrellas ────────────────────────────────────────────────────────────────
function Stars({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange?: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(n)}
          className={cn(
            "w-6 h-6 rounded text-base leading-none flex items-center justify-center transition-colors",
            disabled && "cursor-default",
            n <= value ? "text-amber-500" : "text-gray-200",
            !disabled && n > value && "hover:text-amber-300"
          )}
        >
          ★
        </button>
      ))}
      {value > 0 && (
        <span className="text-xs text-gray-500 ml-1 tabular-nums">{value}.0</span>
      )}
    </div>
  );
}

// ─── Badge de rol ─────────────────────────────────────────────────────────────
function RolBadge({ rol }: { rol: "lider" | "evaluado" | "th" }) {
  return (
    <span
      className={cn(
        "text-xs font-medium px-2 py-0.5 rounded-full",
        rol === "lider" && "bg-blue-100 text-blue-700",
        rol === "evaluado" && "bg-green-100 text-green-700",
        rol === "th" && "bg-purple-100 text-purple-700"
      )}
    >
      {rol === "lider" ? "Líder" : rol === "evaluado" ? "Evaluado" : "TH"}
    </span>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function FormularioEvaluacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const { currentUser, activeRole } = useAuthStore();

  const ev = MOCK_EVALUACIONES.find((e) => e.id === id);
  const usuarioIdParam = searchParams.get("usuarioId");

  // Para demo: el evaluado seleccionado (el primer participante)
  // En producción vendría del contexto del usuario actual o del parámetro de URL
  const participanteDemo =
    (usuarioIdParam ? getEvaluacionParticipante(id, usuarioIdParam) : null)
    ?? (activeRole === "evaluado" && currentUser ? getEvaluacionParticipante(id, currentUser.id) : null)
    ?? ev?.participantes[0]
    ?? null;
  const evaluadoId = participanteDemo?.usuarioId ?? "";
  const evaluadoUser = getUserById(evaluadoId);
  const liderUser = evaluadoUser?.liderId ? getUserById(evaluadoUser.liderId) : null;

  // Los objetivos ya están en el participante — no hay colección global
  const objetivos = participanteDemo?.objetivos ?? [];

  const nivel = evaluadoUser?.nivel ?? "operativo";
  const competencias = getCompetenciasPorNivel(nivel);

  // ── Estado del formulario ──────────────────────────────────────────────────
  // Rol activo para demo (permite cambiar vista)
  const [rolVista, setRolVista] = useState<Rol>(
    (activeRole === "th" || activeRole === "admin") ? "th" :
    activeRole === "lider" ? "lider" : "evaluado"
  );

  // Calificaciones de objetivos
  const [autocalifObj, setAutocalifObj] = useState<Record<string, number>>(
    Object.fromEntries(objetivos.map((o) => [o.id, o.autocalificacion ?? 0]))
  );
  const [califLiderObj, setCalifLiderObj] = useState<Record<string, number>>(
    Object.fromEntries(objetivos.map((o) => [o.id, o.calificacionLider ?? 0]))
  );

  // Calificaciones de comportamientos (ci = índice competencia, bi = índice comportamiento)
  const [compScores, setCompScores] = useState<Record<string, Record<number, number>>>({});

  const getCompScore = (compId: string, bi: number) => compScores[compId]?.[bi] ?? 0;
  const setCompScore = (compId: string, bi: number, val: number) => {
    setCompScores((prev) => ({
      ...prev,
      [compId]: { ...(prev[compId] ?? {}), [bi]: val },
    }));
  };

  // Necesidades de mejoramiento por competencia
  const [mejoras, setMejoras] = useState<Record<string, string>>({});
  // Observaciones de objetivos
  const [obsObj, setObsObj] = useState<Record<string, string>>(
    Object.fromEntries(objetivos.map((o) => [o.id, o.observacionEvaluado ?? ""]))
  );

  // Comentarios de cierre
  const [comJefe, setComJefe] = useState(
    ev?.participantes.find((r) => r.usuarioId === evaluadoId)?.comentarioJefe ?? ""
  );
  const [comColab, setComColab] = useState(
    ev?.participantes.find((r) => r.usuarioId === evaluadoId)?.comentarioColaborador ?? ""
  );
  const [planes, setPlanes] = useState(
    ev?.participantes.find((r) => r.usuarioId === evaluadoId)?.planesAccionCompromisos ?? ""
  );

  // ── Cálculos ───────────────────────────────────────────────────────────────
  const calcTotalObj = useCallback(() => {
    let total = 0;
    let allFilled = true;
    for (const obj of objetivos) {
      const jc = califLiderObj[obj.id];
      const ac = autocalifObj[obj.id];
      if (!jc || !ac) { allFilled = false; continue; }
      const mix = (ac + jc) / 2;
      total += mix * (obj.peso / 100);
    }
    return allFilled ? total : null;
  }, [objetivos, autocalifObj, califLiderObj]);

  const calcTotalComp = useCallback(() => {
    let total = 0;
    let allFilled = true;
    for (const comp of competencias) {
      const comportamientos = getComportamientosPorNivel(comp, nivel);
      const scores = comportamientos.map((_, bi) => getCompScore(comp.id, bi));
      if (scores.some((s) => s === 0)) { allFilled = false; continue; }
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      total += avg * (comp.pesoPorDefecto / 100);
    }
    return allFilled ? total : null;
  }, [competencias, compScores, nivel]);

  const totalObj = calcTotalObj();
  const totalComp = calcTotalComp();
  const pesoObj = (ev?.pesoObjetivos ?? 60) / 100;
  const pesoComp = (ev?.pesoCompetencias ?? 40) / 100;
  const final =
    totalObj != null && totalComp != null
      ? totalObj * pesoObj + totalComp * pesoComp
      : null;
  const finalPct = final != null ? (final / 5) * 100 : null;

  const nivelDesempeno = (pct: number) => {
    if (pct >= 90) return "Excepcional";
    if (pct >= 76) return "Cumple todo";
    if (pct >= 60) return "Cumple mayoría";
    if (pct >= 40) return "Cumple algunas";
    return "No cumple";
  };

  // ── Permisos por rol ───────────────────────────────────────────────────────
  const canEditAutocalif = rolVista === "evaluado" || rolVista === "th";
  const canEditLiderObj = rolVista === "lider" || rolVista === "th";
  const canEditComp = rolVista === "lider" || rolVista === "th";
  const canEditComJefe = rolVista === "lider" || rolVista === "th";
  const canEditComColab = rolVista === "evaluado" || rolVista === "th";

  const bannerText = {
    evaluado: "Como evaluado: registra tu autocalificación en los objetivos. Las competencias las califica tu jefe.",
    lider: "Como líder: calificas los objetivos y todas las competencias. La autocalificación del evaluado ya está ingresada.",
    th: "Como Talento Humano: tienes acceso total. Puedes editar, reabrir etapas y cerrar el ciclo.",
  }[rolVista];

  if (!ev || !evaluadoUser) return null;

  return (
    <div className="max-w-4xl space-y-0">

      {/* ── Encabezado de página ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <ButtonLink href={`/evaluaciones/${id}/participantes/${evaluadoId}`} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </ButtonLink>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{ev.nombre}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {evaluadoUser.nombre} · Nivel {nivel} · Período {ev.anio}
            </p>
          </div>
        </div>
        {/* Selector de rol (solo para demo) */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Viendo como:</span>
          <select
            value={rolVista}
            onChange={(e) => setRolVista(e.target.value as Rol)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="lider">Líder / Jefe inmediato</option>
            <option value="evaluado">Evaluado (colaborador)</option>
            <option value="th">Talento Humano</option>
          </select>
        </div>
      </div>

      {/* ── Stepper ── */}
      <FormStepper estadoEv={ev.estado} />

      {/* ── Banner de rol ── */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-5 text-xs text-blue-700">
        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>{bannerText}</span>
      </div>

      {/* ── Header del empleado ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">Nombre</span>
            <span className="font-medium text-gray-900">{evaluadoUser.nombre}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">No. documento</span>
            <span className="font-medium text-gray-900">{evaluadoUser.cedula ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">Cargo</span>
            <span className="font-medium text-gray-900">{evaluadoUser.cargo}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">Fecha aplicación</span>
            <span className="font-medium text-gray-900">Diciembre {ev.anio}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">Jefe inmediato</span>
            <span className="font-medium text-gray-900">{liderUser?.nombre ?? "—"}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-400 block mb-0.5">Cargo jefe</span>
            <span className="font-medium text-gray-900">{liderUser?.cargo ?? "—"}</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECCIÓN 1: OBJETIVOS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          1. Evaluación de objetivos
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
          {ev.pesoObjetivos}% del total
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[30%]">
                Función / Objetivo
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[24%]">
                Fórmula de medición
              </th>
              <th className="text-center px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[7%]">
                Peso
              </th>
              <th className="text-center px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[13%]">
                <div>Autocalif.</div>
                <RolBadge rol="evaluado" />
              </th>
              <th className="text-center px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[13%]">
                <div>Calif. jefe</div>
                <RolBadge rol="lider" />
              </th>
              <th className="text-center px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 w-[13%]">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {objetivos.map((obj) => {
              const ac = autocalifObj[obj.id] ?? 0;
              const jc = califLiderObj[obj.id] ?? 0;
              const mix = ac > 0 && jc > 0 ? ((ac + jc) / 2).toFixed(2) : "—";
              return (
                <tr key={obj.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-3 py-3 align-top">
                    <p className="text-xs text-gray-600 leading-snug">{obj.funcion}</p>
                    <p className="text-xs text-blue-600 mt-1">{obj.objetivoSmart.split(".")[0]}.</p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <p className="text-xs text-gray-500 italic leading-snug">{obj.formulaMedicion}</p>
                  </td>
                  <td className="px-3 py-3 text-center align-middle">
                    <span className="text-sm font-medium text-blue-600">{obj.peso}%</span>
                  </td>
                  <td className="px-3 py-3 text-center align-middle">
                    {canEditAutocalif ? (
                      <input
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        value={ac || ""}
                        onChange={(e) =>
                          setAutocalifObj((s) => ({
                            ...s,
                            [obj.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="1–5"
                        className="w-14 text-center text-sm border border-gray-200 rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                      />
                    ) : (
                      <span
                        className={cn(
                          "text-sm font-medium",
                          ac > 0 ? "text-gray-900" : "text-gray-300"
                        )}
                      >
                        {ac > 0 ? ac.toFixed(1) : "—"}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center align-middle">
                    {canEditLiderObj ? (
                      <input
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        value={jc || ""}
                        onChange={(e) =>
                          setCalifLiderObj((s) => ({
                            ...s,
                            [obj.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="1–5"
                        className="w-14 text-center text-sm border border-gray-200 rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                      />
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3 text-gray-300" />
                        <span className="text-sm text-gray-300">—</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center align-middle">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        mix !== "—" ? "text-blue-600" : "text-gray-300"
                      )}
                    >
                      {mix}
                    </span>
                  </td>
                </tr>
              );
            })}
            {/* Fila de totales */}
            <tr className="bg-gray-50 border-t border-gray-200">
              <td
                colSpan={2}
                className="px-3 py-2 text-right text-xs text-gray-500"
              >
                Total evaluación objetivos
              </td>
              <td className="px-3 py-2 text-center text-xs font-medium text-blue-600">
                100%
              </td>
              <td className="px-3 py-2 text-center text-sm font-medium text-gray-900">
                {Object.values(autocalifObj).some((v) => v > 0)
                  ? objetivos
                      .reduce((sum, o) => sum + (autocalifObj[o.id] ?? 0) * (o.peso / 100), 0)
                      .toFixed(2)
                  : "—"}
              </td>
              <td className="px-3 py-2 text-center text-sm font-medium text-gray-900">
                {Object.values(califLiderObj).some((v) => v > 0)
                  ? objetivos
                      .reduce((sum, o) => sum + (califLiderObj[o.id] ?? 0) * (o.peso / 100), 0)
                      .toFixed(2)
                  : "—"}
              </td>
              <td className="px-3 py-2 text-center text-sm font-semibold text-blue-600">
                {totalObj != null ? totalObj.toFixed(2) : "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECCIÓN 2: COMPETENCIAS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          2. Evaluación de competencias
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
          {ev.pesoCompetencias}% del total
        </span>
        <RolBadge rol="lider" />
      </div>

      <div className="space-y-3 mb-6">
        {competencias.map((comp) => {
          const comportamientos = getComportamientosPorNivel(comp, nivel);
          const scores = comportamientos.map((_, bi) => getCompScore(comp.id, bi));
          const filled = scores.filter((s) => s > 0);
          const avg = filled.length > 0 ? filled.reduce((a, b) => a + b, 0) / filled.length : 0;
          const contrib = avg * (comp.pesoPorDefecto / 100);

          return (
            <div
              key={comp.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Header de competencia */}
              <div className="flex items-start justify-between gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{comp.nombre}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{comp.descripcion}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">
                    Peso:{" "}
                    <span className="font-semibold text-gray-700">
                      {comp.pesoPorDefecto}%
                    </span>
                  </p>
                  <p
                    className={cn(
                      "text-xl font-medium mt-0.5",
                      avg > 0 ? "text-gray-900" : "text-gray-300"
                    )}
                  >
                    {avg > 0 ? avg.toFixed(2) : "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Aporte:{" "}
                    <span className="text-gray-600">
                      {contrib > 0 ? contrib.toFixed(3) : "—"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Tabla de comportamientos */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-400 w-[55%]">
                      Comportamiento observable
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-400 w-[30%]">
                      Calificación (1–5)
                    </th>
                    <th className="text-center px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-400 w-[15%]">
                      Puntaje
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comportamientos.map((comp_b, bi) => {
                    const val = getCompScore(comp.id, bi);
                    return (
                      <tr key={comp_b.id} className="border-b border-gray-50 last:border-0">
                        <td className="px-4 py-2.5 text-gray-700 leading-snug">
                          {comp_b.descripcion}
                        </td>
                        <td className="px-4 py-2.5">
                          {canEditComp ? (
                            <Stars
                              value={val}
                              onChange={(v) => setCompScore(comp.id, bi, v)}
                            />
                          ) : (
                            <div className="flex items-center gap-1 text-gray-300">
                              <Lock className="h-3 w-3" />
                              <span className="text-xs">Solo líder</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span
                            className={cn(
                              "font-medium",
                              val > 0 ? "text-gray-900" : "text-gray-300"
                            )}
                          >
                            {val > 0 ? val.toFixed(1) : "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Necesidades de mejoramiento */}
              <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-100">
                <label className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                  Necesidades de mejoramiento:
                </label>
                <input
                  type="text"
                  disabled={!canEditComp}
                  value={mejoras[comp.id] ?? ""}
                  onChange={(e) =>
                    setMejoras((s) => ({ ...s, [comp.id]: e.target.value }))
                  }
                  placeholder={
                    canEditComp
                      ? "Escribe aquí las necesidades de mejoramiento para esta competencia..."
                      : ""
                  }
                  className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECCIÓN 3: COMENTARIOS DE CIERRE
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          3. Comentarios de cierre
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-700">Comentarios jefe inmediato</span>
            <RolBadge rol="lider" />
          </div>
          <Textarea
            disabled={!canEditComJefe}
            value={comJefe}
            onChange={(e) => setComJefe(e.target.value)}
            placeholder="Escribe aquí los comentarios de cierre del jefe inmediato..."
            className="text-xs resize-none min-h-[80px]"
            rows={3}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-700">Comentarios colaborador</span>
            <RolBadge rol="evaluado" />
          </div>
          <Textarea
            disabled={!canEditComColab}
            value={comColab}
            onChange={(e) => setComColab(e.target.value)}
            placeholder="Escribe aquí los comentarios del colaborador..."
            className="text-xs resize-none min-h-[80px]"
            rows={3}
          />
        </div>
      </div>
      <div className="mb-6">
        <div className="text-xs font-medium text-gray-700 mb-2">
          Planes de acción / compromisos
        </div>
        <Textarea
          disabled={!canEditComJefe && !canEditComColab}
          value={planes}
          onChange={(e) => setPlanes(e.target.value)}
          placeholder="Planes de acción acordados entre jefe y colaborador..."
          className="text-xs resize-none min-h-[60px]"
          rows={2}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECCIÓN 4: CALIFICACIÓN DEFINITIVA
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          4. Calificación definitiva
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">
              Objetivos ({ev.pesoObjetivos}%)
            </p>
            <p
              className={cn(
                "text-2xl font-medium",
                totalObj != null ? "text-gray-900" : "text-gray-300"
              )}
            >
              {totalObj != null ? totalObj.toFixed(2) : "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalObj != null ? ((totalObj / 5) * 100).toFixed(1) + "%" : "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">
              Competencias ({ev.pesoCompetencias}%)
            </p>
            <p
              className={cn(
                "text-2xl font-medium",
                totalComp != null ? "text-gray-900" : "text-gray-300"
              )}
            >
              {totalComp != null ? totalComp.toFixed(2) : "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalComp != null ? ((totalComp / 5) * 100).toFixed(1) + "%" : "—"}
            </p>
          </div>
          <div
            className={cn(
              "rounded-lg p-3 text-center border",
              final != null
                ? "bg-blue-50 border-blue-100"
                : "bg-gray-50 border-transparent"
            )}
          >
            <p
              className={cn(
                "text-xs mb-1",
                final != null ? "text-blue-500" : "text-gray-400"
              )}
            >
              Calificación definitiva
            </p>
            <p
              className={cn(
                "text-2xl font-medium",
                final != null ? "text-blue-600" : "text-gray-300"
              )}
            >
              {final != null ? final.toFixed(2) : "—"}
            </p>
            <p
              className={cn(
                "text-xs mt-0.5",
                final != null ? "text-blue-400" : "text-gray-300"
              )}
            >
              {finalPct != null ? finalPct.toFixed(1) + "%" : "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Nivel de desempeño</p>
            <p
              className={cn(
                "text-sm font-medium mt-1",
                finalPct != null ? "text-gray-900" : "text-gray-300"
              )}
            >
              {finalPct != null ? nivelDesempeno(finalPct) : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECCIÓN 5: FIRMAS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          5. Firmas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Firma jefe */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-700">Firma jefe inmediato</span>
            <RolBadge rol="lider" />
          </div>
          <div className="border-b border-gray-300 my-6 w-4/5" />
          <p className="text-xs text-gray-700 font-medium">{liderUser?.nombre ?? "—"}</p>
          <p className="text-xs text-gray-400">{liderUser?.cargo ?? "—"}</p>
          <button
            onClick={() => toast.success("Firma del jefe registrada")}
            disabled={rolVista !== "lider" && rolVista !== "th"}
            className="mt-3 flex items-center gap-1.5 text-xs border border-gray-200 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Firmar digitalmente ✓
          </button>
        </div>
        {/* Firma colaborador */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-700">Firma colaborador</span>
            <RolBadge rol="evaluado" />
          </div>
          <div className="border-b border-gray-300 my-6 w-4/5" />
          <p className="text-xs text-gray-700 font-medium">{evaluadoUser.nombre}</p>
          <p className="text-xs text-gray-400">{evaluadoUser.cargo}</p>
          <button
            onClick={() => toast.success("Firma del colaborador registrada")}
            disabled={rolVista !== "evaluado" && rolVista !== "th"}
            className="mt-3 flex items-center gap-1.5 text-xs border border-gray-200 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Firmar digitalmente ✓
          </button>
        </div>
      </div>

      {/* ── Acciones ── */}
      <div className="flex items-center justify-between pb-10">
        <button
          onClick={() => toast.success("Borrador guardado")}
          className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition-colors"
        >
          <Save className="h-4 w-4 text-gray-500" />
          Guardar borrador
        </button>
        <button
          onClick={() => {
            if (final == null) {
              toast.error("Completa todas las calificaciones antes de enviar");
              return;
            }
            toast.success("Formulario enviado para cierre TH →");
          }}
          className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-medium transition-colors"
        >
          Enviar para cierre TH
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
