import { EstadoEvaluacion, Role } from "@/types";

export const WORKFLOW_STEPS: EstadoEvaluacion[] = [
  "configuracion",
  "autocalificacion",
  "calificacion_lider",
  "pares",
  "revision_th",
  "cerrada",
];

export const WORKFLOW_LABELS: Record<EstadoEvaluacion, string> = {
  configuracion: "Configuración",
  autocalificacion: "Autocalificación",
  calificacion_lider: "Calificación Líder",
  pares: "Evaluación 360°",
  revision_th: "Revisión TH",
  cerrada: "Cerrada",
};

export const WORKFLOW_ROLES: Record<EstadoEvaluacion, Role[]> = {
  configuracion: ["admin", "th"],
  autocalificacion: ["evaluado"],
  calificacion_lider: ["lider"],
  pares: ["evaluado"],
  revision_th: ["admin", "th"],
  cerrada: [],
};

export const getStepIndex = (estado: EstadoEvaluacion) =>
  WORKFLOW_STEPS.indexOf(estado);

export const canAdvance = (estado: EstadoEvaluacion, role: Role): boolean => {
  return WORKFLOW_ROLES[estado]?.includes(role) ?? false;
};

export const getNextState = (current: EstadoEvaluacion): EstadoEvaluacion | null => {
  const idx = WORKFLOW_STEPS.indexOf(current);
  return idx < WORKFLOW_STEPS.length - 1 ? WORKFLOW_STEPS[idx + 1] : null;
};

export const getStatusColor = (estado: EstadoEvaluacion) => {
  const colors: Record<EstadoEvaluacion, string> = {
    configuracion: "bg-slate-100 text-slate-700",
    autocalificacion: "bg-blue-100 text-blue-700",
    calificacion_lider: "bg-amber-100 text-amber-700",
    pares: "bg-purple-100 text-purple-700",
    revision_th: "bg-orange-100 text-orange-700",
    cerrada: "bg-green-100 text-green-700",
  };
  return colors[estado];
};
